'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, Lock, Eye, Code, X } from 'lucide-react';
import { Project } from '@/lib/types/types';
import ProjectForm from '@/components/admin/ProjectForm';
import { useAdminKey } from '@/context/AdminContext';

export default function ProjectsListPage() {
    const adminKey = useAdminKey();
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        technologies: string;
        categories: string;
        github: string;
        figma: string;
        live: string;
        other: string;
        image: string;
        year: string;
        period: 'current' | 'personal' | 'university' | 'creative';
        isNDA: boolean;
    }>({
        title: '', description: '', technologies: '', categories: '',
        github: '', figma: '', live: '', other: '', image: '', year: '', period: 'current', isNDA: false
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects.reverse());
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stripNDAPrefix = (t: string) => t.replace(/^\(Signed NDA\)\s*/i, '').trim();

    const handleEdit = (project: Project) => {
        const isNDA = project.title.includes('(Signed NDA)');
        setFormData({
            title: isNDA ? stripNDAPrefix(project.title) : project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            categories: project.categories.join(', '),
            github: project.links?.github || '',
            figma: project.links?.figma || '',
            live: project.links?.live || '',
            other: project.links?.other || '',
            image: project.image || '',
            year: project.year || '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            period: (project.period as any) || 'current',
            isNDA,
        });
        setEditingId(project.id!);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this project?')) return;
        await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'x-admin-secret': adminKey },
        });
        fetchProjects();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const technologies = Array.isArray(formData.technologies)
                ? formData.technologies
                : (formData.technologies as unknown as string).split(',').map((t: string) => t.trim()).filter(Boolean);

            const categories = Array.isArray(formData.categories)
                ? formData.categories
                : (formData.categories as unknown as string).split(',').map((c: string) => c.trim()).filter(Boolean);

            const links: Record<string, string> = {};
            if (formData.github) links.github = formData.github;
            if (formData.figma) links.figma = formData.figma;
            if (formData.live) links.live = formData.live;
            if (formData.other) links.other = formData.other;

            const displayTitle = stripNDAPrefix(formData.title);
            const title = formData.isNDA ? `(Signed NDA) ${displayTitle}` : displayTitle;

            const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
            const method = editingId ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-secret': adminKey,
                },
                body: JSON.stringify({
                    title,
                    description: formData.description,
                    technologies,
                    links,
                    categories,
                    image: formData.image || null,
                    year: formData.year,
                    period: formData.period,
                })
            });
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', description: '', technologies: '', categories: '', github: '', figma: '', live: '', other: '', image: '', year: '', period: 'current', isNDA: false });
            fetchProjects();
        } catch (e) { console.error(e); }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 pt-12 custom-scrollbar flex flex-col h-full relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Projects Database</h1>
                    <p className="text-zinc-500 text-sm">Manage entries ({projects.length})</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="bg-[#181818] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm min-w-[240px] focus:outline-none focus:border-zinc-700 transition-colors"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setShowForm(true); }}
                        className="bg-[#FF6B35] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#ff8555] transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> New Entry
                    </button>
                </div>
            </div>

            {/* Always Visible Table */}
            <div className="bg-[#181818] rounded-[2rem] border border-white/5 overflow-hidden flex-1 flex flex-col">
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#181818] sticky top-0 z-10 border-b border-white/5 text-zinc-500 uppercase tracking-wider text-[10px] font-bold shadow-sm shadow-black/20">
                            <tr>
                                <th className="px-6 py-4 bg-[#181818]">Status</th>
                                <th className="px-6 py-4 bg-[#181818]">Project Name</th>
                                <th className="px-6 py-4 bg-[#181818]">Category</th>
                                <th className="px-6 py-4 bg-[#181818]">Year</th>
                                <th className="px-6 py-4 bg-[#181818]">Links</th>
                                <th className="px-6 py-4 bg-[#181818] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className={`w-2 h-2 rounded-full ${project.period === 'current' ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-zinc-200">{project.title.replace('(Signed NDA)', '')}</div>
                                        {project.title.includes('NDA') && <span className="text-[10px] text-[#FF6B35] font-bold tracking-wider inline-flex items-center gap-1"><Lock size={8} /> NDA</span>}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">
                                        {Array.isArray(project.categories) ? project.categories[0] : project.categories}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-zinc-500">
                                        {project.year}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {project.links?.github && <div className="p-1.5 bg-white/5 rounded-md text-zinc-500"><Code size={12} /></div>}
                                            {project.links?.live && <div className="p-1.5 bg-white/5 rounded-md text-zinc-500"><Eye size={12} /></div>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(project)} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                                <Edit2 size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id!)} className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FULL SCREEN MODAL FORM */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#181818] w-full max-w-5xl h-full max-h-full rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col relative"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-[#181818] z-10">
                                <div>
                                    <h2 className="text-2xl font-bold">{editingId ? 'Edit Project' : 'Initialize Project'}</h2>
                                    <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">System Entry Protocol</p>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Form Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                                <ProjectForm showForm={true} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
