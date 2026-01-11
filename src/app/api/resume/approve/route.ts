import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const secret = searchParams.get('secret');

        const expectedSecret = process.env.RESEND_API_KEY?.substring(0, 8);
        if (secret !== expectedSecret) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!name || !email) {
            return new NextResponse('Missing parameters', { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const appUrl = process.env.APP_URL || 'http://localhost:3000';

        await transporter.sendMail({
            from: `"Clyde Gevero" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Resume Access Granted - Clyde Gevero',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2>Resume Access Granted</h2>
                    <p>Hi ${name},</p>
                    <p>Thanks for your interest. You can download my resume below:</p>
                    
                    <div style="margin: 30px 0;">
                        <a href="${appUrl}/GEVERO_RESUME.pdf" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                            Download Resume (PDF)
                        </a>
                    </div>

                    <p style="font-size: 14px; color: #666;">
                        Best regards,<br/>
                        Clyde Gevero
                    </p>
                </div>
            `,
        });

        // Return a sleek HTML success page for the Owner
        return new NextResponse(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Resume Sent</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { 
                            background: #09090b; 
                            color: #e4e4e7; 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            height: 100vh; 
                            margin: 0; 
                        }
                        .card { 
                            background: #18181b; 
                            padding: 48px; 
                            border-radius: 16px; 
                            text-align: center; 
                            border: 1px solid #27272a; 
                            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                            max-width: 400px;
                            width: 90%;
                        }
                        .icon {
                            width: 64px;
                            height: 64px;
                            background: rgba(34, 197, 94, 0.1);
                            color: #22c55e;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 24px auto;
                            font-size: 32px;
                        }
                        h1 { 
                            margin: 0 0 12px 0; 
                            color: #fff; 
                            font-size: 24px;
                            font-weight: 600;
                        }
                        p {
                            margin: 0;
                            line-height: 1.5;
                        }
                        .recipient {
                            color: #a1a1aa;
                            margin-bottom: 24px;
                        }
                        .footer {
                            color: #52525b; 
                            font-size: 13px;
                            border-top: 1px solid #27272a;
                            padding-top: 24px;
                            margin-top: 24px;
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="icon">✓</div>
                        <h1>Sent Successfully</h1>
                        <p class="recipient">Resume has been emailed to<br><strong style="color: #fff">${name}</strong></p>
                        <div class="footer">
                            You can close this window now.
                        </div>
                    </div>
                </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });

    } catch (error) {
        console.error('Resume approval error:', error);
        return new NextResponse('Failed to send resume', { status: 500 });
    }
}
