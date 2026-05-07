import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('projects')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const projects = (data || []) as Array<Record<string, any>>;

        const signedProjects = await Promise.all(
            projects.map(async (project) => {
                if (project.image_url && typeof project.image_url === 'string' && !project.image_url.startsWith('http')) {
                    const { data: signedData, error: signedUrlError } = await supabaseAdmin.storage
                        .from('project-images')
                        .createSignedUrl(project.image_url, 60 * 60);

                    if (signedUrlError) {
                        console.error('Signed URL error:', signedUrlError);
                    } else if (signedData?.signedUrl) {
                        project.image_url = signedData.signedUrl;
                    }
                }

                return project;
            })
        );

        return NextResponse.json(signedProjects);
    } catch (err) {
        console.error('Public projects route error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
