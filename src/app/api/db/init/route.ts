import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                technologies TEXT[] NOT NULL,
                links JSONB DEFAULT '{}',
                categories TEXT[] NOT NULL,
                image TEXT,
                year TEXT,
                period TEXT CHECK (period IN ('current', 'university', 'creative', 'personal')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        return NextResponse.json({
            success: true,
            message: 'Database initialized successfully'
        });
    } catch (error) {
        console.error('Database initialization error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to initialize database' },
            { status: 500 }
        );
    }
}
