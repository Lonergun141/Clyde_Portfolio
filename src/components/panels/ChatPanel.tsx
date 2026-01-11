'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import WorkspacePanel from '@/components/spatial/WorkspacePanel';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPanel() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Kal.ai, ask me anything about Clyde's skills, projects, or experience." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history: messages }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error && data.error.includes('Key is missing')) {
                    throw new Error('MISSING_KEY');
                }
                throw new Error(data.error || 'Failed to get response');
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error && err.message === 'MISSING_KEY') {
                setError('Setup Required: Please add the key');
            } else {
                setError('Sorry, something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <WorkspacePanel panelId="chat" title="AI Assistant">
            <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full">


                <div className="flex items-center gap-3 p-4 sm:p-6 pb-2">
                    <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
                        <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground">Chat with Kal.AI</h3>
                        <p className="text-sm text-muted-foreground">Powered by Kal.AI - Ask about Clyde&apos;s background, skills, or projects</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex gap-4 max-w-[85%] sm:max-w-[75%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                                msg.role === 'user' ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                            )}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 px-1">
                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                </span>
                                <div
                                    className={cn(
                                        "p-4 text-sm sm:text-base rounded-2xl shadow-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-accent text-accent-foreground rounded-tr-none"
                                            : "bg-card border border-border text-card-foreground rounded-tl-none"
                                    )}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none text-card-foreground">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                                    li: ({ children }) => <li className="mb-0.5">{children}</li>,
                                                    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                                    a: ({ children, href }) => (
                                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                                            {children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                <Bot size={16} />
                            </div>
                            <div className="bg-card rounded-2xl rounded-tl-none p-4 border border-border shadow-sm">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce" />
                                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce delay-75" />
                                    <span className="w-2 h-2 rounded-full bg-accent/50 animate-bounce delay-150" />
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive text-sm max-w-md mx-auto">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>


                <div className="p-4 sm:p-6 pt-2">
                    <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything..."
                            className="w-full bg-secondary/50 border border-border hover:border-accent/50 focus:border-accent rounded-xl pl-6 pr-14 py-4 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 shadow-md transition-all active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-muted-foreground mt-3 font-mono opacity-60">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </div>
            </div>
        </WorkspacePanel>
    );
}
