import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { projects } from '@/lib/constants/projects';

export async function POST() {
    try {
        let successCount = 0;
        let errorCount = 0;

        for (const project of projects) {
            try {
                let imageUrl = project.image;
                if (imageUrl && imageUrl.startsWith('/')) {
                    imageUrl = `https://placehold.co/600x400/1a1a1a/FF6B35?text=${encodeURIComponent(project.title.substring(0, 20))}`;
                }

                await sql`
                    INSERT INTO projects (
                        title, description, technologies, links, categories, image, year, period
                    )
                    VALUES (
                        ${project.title}, 
                        ${project.description}, 
                        ${project.technologies}, 
                        ${JSON.stringify(project.links)}, 
                        ${project.categories}, 
                        ${imageUrl || null}, 
                        ${project.year || null}, 
                        ${project.period || 'university'}
                    )
                `;
                successCount++;
            } catch (error) {
                console.error(`Error migrating project: ${project.title}`, error);
                errorCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Migration completed. Success: ${successCount}, Errors: ${errorCount}`,
            successCount,
            errorCount
        });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json(
            { success: false, error: 'Migration failed' },
            { status: 500 }
        );
    }
}
