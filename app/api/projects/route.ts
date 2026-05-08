import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (err) {
        console.error('Projects GET error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, technologies, link, demo_link, image_url, status } = body;

        const { error } = await supabaseAdmin
            .from('projects')
            .insert([{ title, description, technologies, link, demo_link, image_url, status }]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Projects POST error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
        }

        const body = await req.json();
        const { title, description, technologies, link, demo_link, image_url, status } = body;

        const { error } = await supabaseAdmin
            .from('projects')
            .update({ title, description, technologies, link, demo_link, image_url, status })
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Projects PUT error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Projects DELETE error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
