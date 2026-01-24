import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';


export async function GET() {
    try {
        const projects = await sql`
            SELECT * FROM projects
            ORDER BY created_at DESC
        `;

        return NextResponse.json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const adminSecret = request.headers.get('x-admin-secret');

        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

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
            INSERT INTO projects (
                title, description, technologies, links, categories, image, year, period
            )
            VALUES (
                ${title}, ${description}, ${technologies}, ${JSON.stringify(links)}, 
                ${categories}, ${image || null}, ${year}, ${period}
            )
            RETURNING *
        `;

        return NextResponse.json({
            success: true,
            project: result[0],
            message: 'Project created successfully'
        });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
