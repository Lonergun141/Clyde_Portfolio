'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, User, MessageSquare, Loader2, CheckCircle, AlertCircle, Github, Linkedin, ExternalLink } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPanel() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (status === 'error') setStatus('idle');
    };

    return (
        <WorkspacePanel panelId="contact" title="Contact">
            <div className="h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 p-4 sm:p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col"
                    >

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-[1px] bg-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                    Connect
                                </span>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                                Get in Touch
                            </h1>
                            <p className="text-sm text-muted-foreground font-mono">
                                Let&apos;s build something together
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 mb-auto">

                            <a
                                href="https://github.com/Lonergun141"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm group py-2"
                            >
                                <Github size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                                <span className="font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                    @Lonergun141
                                </span>
                                <ExternalLink size={10} className="opacity-50" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm group py-2"
                            >
                                <Linkedin size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                                <span className="font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                    LinkedIn
                                </span>
                                <ExternalLink size={10} className="opacity-50" />
                            </a>
                        </div>

                        {/* Note */}
                        <div className="pt-8 border-t border-border mt-8">
                            <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                                Available for freelance projects and full-time opportunities.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-lg"
                        >
                            {/* Form Header */}
                            <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    01
                                </span>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                    Send a Message
                                </h2>
                            </div>

                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <CheckCircle size={48} className="text-accent mb-4" />
                                    <h3 className="text-lg font-bold text-foreground mb-2">Message Sent!</h3>
                                    <p className="text-sm text-muted-foreground font-mono mb-6">
                                        I&apos;ll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-sm font-mono text-accent hover:text-primary transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name Input */}
                                    <div>
                                        <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                                            <User size={12} />
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none font-mono text-foreground transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                                            <Mail size={12} />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none font-mono text-foreground transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    {/* Message Input */}
                                    <div>
                                        <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                                            <MessageSquare size={12} />
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent focus:outline-none font-mono text-foreground transition-colors resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-sm text-red-500 font-mono"
                                        >
                                            <AlertCircle size={14} />
                                            {errorMessage}
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-border bg-transparent hover:bg-accent hover:border-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed font-mono uppercase tracking-widest text-sm transition-all duration-300"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </WorkspacePanel>
    );
}
