import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const appUrl = process.env.APP_URL || 'http://localhost:3000';

        const secretKey = process.env.EMAIL_PASS || 'fallback-secret';
        const approvalLink = `${appUrl}/api/resume/approve?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&secret=${secretKey.substring(0, 8)}`;

        const mailOptions = {
            from: `"Resume Request" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Resume Request: ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="margin-top: 0;">New Resume Request</h2>
                    <p><strong>${name}</strong> (${email}) has requested access to your resume.</p>
                    ${message ? `<p><strong>Reason:</strong><br/>${message}</p>` : ''}
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <a href="${approvalLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                            Approve & Send Resume
                        </a>
                        <p style="font-size: 12px; color: #666; margin-top: 10px;">
                            Clicking this will immediately email your resume to ${name}.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Resume request error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
