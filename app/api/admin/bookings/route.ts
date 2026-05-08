import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const isStats = url.searchParams.get('stats') === 'true';

        if (isStats) {
            const [{ count: totalBookings, error: totalError }, { count: pendingBookings, error: pendingError }] = await Promise.all([
                supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
                supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
            ]);

            if (totalError || pendingError) {
                return NextResponse.json(
                    { error: totalError?.message || pendingError?.message || 'Failed to fetch booking stats.' },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                totalBookings: totalBookings || 0,
                pendingBookings: pendingBookings || 0,
            });
        }

        let query = supabaseAdmin.from('bookings').select('*').order('created_at', { ascending: false });
        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ bookings: data || [] });
    } catch (err) {
        console.error('Admin bookings GET error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Booking id is required' }, { status: 400 });
        }

        const body = await request.json();
        const { status } = body as { status: string };

        const { error } = await supabaseAdmin
            .from('bookings')
            .update({ status })
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Admin bookings PUT error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Booking id is required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from('bookings').delete().eq('id', id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Admin bookings DELETE error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
