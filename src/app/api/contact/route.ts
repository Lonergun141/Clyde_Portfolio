import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // Send email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        try {
            await transporter.sendMail({
                from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER, // Send to Owner
                replyTo: email,
                subject: `Portfolio Contact: ${name}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>New Message from Portfolio</title>
                        <style>
                            body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                            .header { background-color: #18181b; padding: 32px; text-align: center; }
                            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em; }
                            .content { padding: 32px; color: #3f3f46; line-height: 1.6; }
                            .field { margin-bottom: 24px; }
                            .label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 8px; }
                            .value { font-size: 16px; color: #18181b; font-weight: 500; }
                            .message-box { background-color: #f4f4f5; padding: 20px; border-radius: 8px; border-left: 4px solid #18181b; }
                            .message-text { white-space: pre-wrap; margin: 0; color: #27272a; }
                            .footer { background-color: #f4f4f5; padding: 24px; text-align: center; border-top: 1px solid #e4e4e7; }
                            .footer p { margin: 0; font-size: 12px; color: #71717a; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>New Portfolio Inquiry</h1>
                            </div>
                            <div class="content">
                                <div class="field">
                                    <span class="label">From</span>
                                    <div class="value">${name}</div>
                                </div>
                                <div class="field">
                                    <span class="label">Email</span>
                                    <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                                </div>
                                <div class="field">
                                    <span class="label">Message</span>
                                    <div class="message-box">
                                        <p class="message-text">${message}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="footer">
                                <p>Sent from your portfolio contact form</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            });

            return NextResponse.json({ success: true, message: 'Message sent successfully' });
        } catch (emailError) {
            console.error('Nodemailer sending error:', emailError);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
