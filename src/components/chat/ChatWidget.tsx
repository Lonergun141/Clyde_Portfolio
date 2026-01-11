'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Kal.ai. Ask me anything about Clyde's skills, projects, or experience." }
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
    }, [messages, isOpen]);

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
                setError('Setup Required: Please add your key');
            } else {
                setError('Sorry, something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[350px] md:w-[400px] h-[500px] bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mb-4 pointer-events-auto flex flex-col overflow-hidden"
                    >

                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-accent/5">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-accent/10">
                                    <Sparkles className="w-4 h-4 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground">Ask About Me</h3>
                                    <p className="text-[10px] text-muted-foreground">Powered by Kal.ai</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto" : "items-start"
                                    )}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Bot className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            "p-3 text-sm rounded-2xl",
                                            msg.role === 'user'
                                                ? "bg-accent text-accent-foreground rounded-br-none"
                                                : "bg-white/5 text-foreground border border-white/5 rounded-tl-none"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Bot className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 border border-white/5">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce delay-75" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="p-3 mx-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-xs">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p>{error}</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 bg-background/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about my experience..."
                                    className="w-full bg-white/5 border border-white/5 rounded-xl pl-4 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20 flex items-center justify-center pointer-events-auto border border-white/10"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
