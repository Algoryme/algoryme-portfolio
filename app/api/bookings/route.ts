import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            full_name,
            email,
            company,
            phone,
            service_type,
            preferred_date,
            notes,
        } = body as {
            full_name: string;
            email: string;
            company?: string;
            phone?: string;
            service_type: string;
            preferred_date?: string;
            notes?: string;
        };

        if (!full_name || !email || !service_type) {
            return NextResponse.json(
                { error: 'Name, email, and service type are required.' },
                { status: 400 }
            );
        }

        const preferredDateValue = preferred_date ? new Date(preferred_date).toISOString() : null;

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .insert([
                {
                    full_name,
                    email,
                    company: company || null,
                    phone: phone || null,
                    service_type,
                    preferred_date: preferredDateValue,
                    notes: notes || null,
                    status: 'pending',
                },
            ]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ booking: data?.[0] || null });
    } catch (err) {
        console.error('Booking route error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unexpected error' },
            { status: 500 }
        );
    }
}
