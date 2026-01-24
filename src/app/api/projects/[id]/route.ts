import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const adminSecret = request.headers.get('x-admin-secret');

        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const id = params.id;
        const body = await request.json();
        const {
            title,
            description,
            technologies,
            links,
            categories,
            image,
            year,
            period,
        } = body;

        const result = await sql`
            UPDATE projects 
            SET 
                title = ${title},
                description = ${description},
                technologies = ${technologies},
                links = ${JSON.stringify(links)},
                categories = ${categories},
                image = ${image || null},
                year = ${year},
                period = ${period}
            WHERE id = ${id}
            RETURNING *
        `;

        if (result.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            project: result[0],
            message: 'Project updated successfully'
        });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const adminSecret = request.headers.get('x-admin-secret');

        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const id = params.id;

        const result = await sql`
            DELETE FROM projects 
            WHERE id = ${id}
            RETURNING *
        `;

        if (result.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
