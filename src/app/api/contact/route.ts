import { NextResponse } from 'next/server';

interface ContactRequest {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: Request) {
    try {
        const body: ContactRequest = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // For now, just log the message (you can integrate with email service later)
        // Options: Resend, SendGrid, Nodemailer, or save to database
        console.log('Contact form submission:', { name, email, message, timestamp: new Date().toISOString() });

        // TODO: Integrate with email service
        // Example with Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //     from: 'contact@yourdomain.com',
        //     to: 'clydegevero14@gmail.com',
        //     subject: `Portfolio Contact: ${name}`,
        //     html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
        // });

        return NextResponse.json({ success: true, message: 'Message received' });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
