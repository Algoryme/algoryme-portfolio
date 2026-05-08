import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
        }

        const safeName = file.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-_.]/g, '');
        const objectPath = `projects/${Date.now()}-${safeName}`;
        const fileData = new Uint8Array(await file.arrayBuffer());

        const { error } = await supabaseAdmin.storage
            .from('project-images')
            .upload(objectPath, fileData, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type || 'application/octet-stream',
            });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ imagePath: objectPath });
    } catch (err) {
        console.error('Upload route error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown upload error' },
            { status: 500 }
        );
    }
}
