import { GoogleGenAI } from "@google/genai";
import { generateResumeContext } from '@/lib/gemini';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
    if (!apiKey) {
        return NextResponse.json({ error: 'Gemini API Key is missing.' }, { status: 500 });
    }

    try {
        const { message } = await req.json();

        const resumeContext = generateResumeContext();
        const systemPrompt = `You are an AI assistant for Clyde Gevero's portfolio. 
        Your goal is to answer questions about Clyde based ONLY on the following context. 
        Be helpful, professional, and concise. If the answer is not in the context, say you don't know but suggest contacting him directly.
        
        IMPORTANT: Format your response using Markdown. Use bullet points for lists, bold text for key terms, and keep paragraphs short.

        CONTEXT:
        ${resumeContext}`;

        const prompt = `${systemPrompt}\n\nUser Question: ${message}`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            });

            const text = response.text || '';
            return NextResponse.json({ message: text });

        } catch (genError: unknown) {
            console.error('Generation Error:', genError);
            const errorMessage = genError instanceof Error ? genError.message : String(genError);
            return NextResponse.json({
                error: `AI Model Error: ${errorMessage}.`
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error generating AI response:', error);
        return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
    }
}
