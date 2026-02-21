'use client';

import { motion } from 'framer-motion';

export default function ResumeContent() {
    return (
        <div className="w-full h-[calc(100vh-12rem)] overflow-y-auto pr-4 custom-scrollbar lg:pl-8">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-12 pb-24"
            >
                {/* Header / Summary */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-4 border-b border-accent/20 pb-2">
                        <span className="w-2 h-2 bg-accent/80 block" />
                        <h2>Executive Summary</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Results-driven Web Developer and Information Technology graduate (Cum Laude) with expertise in full-stack development and modern architectural patterns. Experienced in migrating complex legacy systems, including refactoring monolithic Django functions into modular microservices and contributing to the transition of frontend architectures to Micro-frontend (MFE) systems. Skilled in engineering scalable white-labeling solutions and automating enterprise workflows to enhance platform scalability.
                    </p>
                </section>

                {/* Experience */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-4 border-b border-accent/20 pb-2">
                        <span className="w-2 h-2 bg-accent/80 block" />
                        <h2>Experience</h2>
                    </div>

                    {/* CyTech */}
                    <div className="space-y-2 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">Web Developer</h3>
                            <span className="text-xs font-mono text-accent/60 uppercase">November 2025 – Present</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono mb-3 uppercase tracking-wider">CyTech Development and Operations Inc. | Cagayan de Oro City</div>
                        <ul className="space-y-2 text-sm text-muted-foreground list-none">
                            <li className="flex gap-2"><span className="text-accent">▹</span> Contributing to the strategic transition of monolithic architectures into modular Micro-frontend (MFE) systems to enhance platform scalability.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Refactored complex legacy Django monolithic god functions into streamlined, independent microservices, significantly improving code maintainability and execution speed.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Successfully decoupled the Compliance Module, establishing independent deployment pipelines that reduced system-wide downtime.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Engineered a config-based white-labeling system allowing dynamic UI themes and feature toggling via configuration files.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Reduced manual development effort for client onboarding by 40% through automated branding customization.</li>
                        </ul>
                    </div>

                    {/* CHED */}
                    <div className="space-y-2 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">IT Specialist Intern</h3>
                            <span className="text-xs font-mono text-accent/60 uppercase">February 2025 – May 2025</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono mb-3 uppercase tracking-wider">Commission on Higher Education (CHED) RO10 | Cagayan de Oro City</div>
                        <ul className="space-y-2 text-sm text-muted-foreground list-none">
                            <li className="flex gap-2"><span className="text-accent">▹</span> Developed internal web applications using Google Apps Script to automate document hierarchy and signing queues.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Streamlined administrative workflows, significantly reducing document processing delays for regional offices.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Provided on-site technical ICT support, network maintenance, and multimedia production services.</li>
                        </ul>
                    </div>

                    {/* Banog Banog */}
                    <div className="space-y-2 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">Video Editor and Broadcast Technician</h3>
                            <span className="text-xs font-mono text-accent/60 uppercase">2021 – 2023</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono mb-3 uppercase tracking-wider">Banog Banog TV (Manolo Fortich LGU) | Bukidnon</div>
                        <ul className="space-y-2 text-sm text-muted-foreground list-none">
                            <li className="flex gap-2"><span className="text-accent">▹</span> Executed high-quality video editing and post-production for promotional content and local government events, managing the end-to-end media workflow.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Technical operator for live digital broadcasts, utilizing OBS Studio to manage scene transitions, overlays, and audio-visual synchronization for community media coverage.</li>
                        </ul>
                    </div>
                </section>

                {/* Education */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-4 border-b border-accent/20 pb-2">
                        <span className="w-2 h-2 bg-accent/80 block" />
                        <h2>Education</h2>
                    </div>

                    <div className="space-y-4 group">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">Bachelor of Science in Information Technology</h3>
                                <span className="text-xs font-mono text-accent/80 uppercase">Graduation: 2025</span>
                            </div>
                            <div className="text-sm text-muted-foreground font-mono mt-1 uppercase tracking-wider">
                                University of Science and Technology of Southern Philippines | Cagayan de Oro City
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <div className="text-xs font-mono text-accent/60 uppercase tracking-widest">Honors & Academic Standing</div>
                                <div className="text-muted-foreground">Cum Laude | GPA: 1.54</div>
                                <div className="text-muted-foreground">Multi-semester Dean's Lister</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-mono text-accent/60 uppercase tracking-widest">Capstone Project</div>
                                <div className="text-muted-foreground"><span className="text-accent">QuickEase</span> — A GPT-4o powered study application utilizing Google Vision.</div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                            <div className="text-xs font-mono text-accent/60 uppercase tracking-widest mb-2">Relevant Coursework</div>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                {['Data Structures & Algorithms', 'Database Management', 'Software Engineering', 'Human-Computer Interaction', 'Web Development', 'Mobile Development'].map(course => (
                                    <span key={course} className="px-2 py-1 bg-accent/5 border border-accent/10 rounded-sm">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership & Activities */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-4 border-b border-accent/20 pb-2">
                        <span className="w-2 h-2 bg-accent/80 block" />
                        <h2>Leadership & Activities</h2>
                    </div>

                    {/* QuickEase */}
                    <div className="space-y-2 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">QuickEase: AI-Powered Study Suite</h3>
                            <span className="text-xs font-mono text-accent/60 uppercase">Aug 2024 – June 2025</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono mb-3 uppercase tracking-wider">Academic Lead, Frontend Developer & Visual UI/UX Designer</div>
                        <ul className="space-y-2 text-sm text-muted-foreground list-none">
                            <li className="flex gap-2"><span className="text-accent">▹</span> Directed the end-to-end development of a cross-platform application leveraging GPT-4o and Google Vision to generate educational materials from user documents.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Designed comprehensive wireframes and high-fidelity prototypes in Figma, ensuring a seamless user experience for study session management.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Architected a scalable system design integrating React Native with a Django backend, implementing RESTful APIs to facilitate communication between mobile clients and third-party AI services.</li>
                        </ul>
                    </div>

                    {/* CHED Repo */}
                    <div className="space-y-2 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">CHED Electronic Theses Repository</h3>
                            <span className="text-xs font-mono text-accent/60 uppercase">Sept 2024 – Jan 2025</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono mb-3 uppercase tracking-wider">Project Lead, UI/UX & Frontend Developer</div>
                        <ul className="space-y-2 text-sm text-muted-foreground list-none">
                            <li className="flex gap-2"><span className="text-accent">▹</span> Designed a web-based archive system for Region 10, improving academic document organization and access.</li>
                            <li className="flex gap-2"><span className="text-accent">▹</span> Integrated an analytics dashboard to track usage and topic trends using Figma and Google Workspace tools.</li>
                        </ul>
                    </div>
                </section>

                {/* Skills */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-4 border-b border-accent/20 pb-2">
                        <span className="w-2 h-2 bg-accent/80 block" />
                        <h2>Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                            {
                                category: "Technical Languages",
                                items: ["JavaScript (ES6+)", "SQL (PostgreSQL)", "Python", "Appscript", "HTML5", "CSS3"]
                            },
                            {
                                category: "Frameworks & Libraries",
                                items: ["React.js", "Next.js", "React Native", "Django", "Django REST Framework", "Tailwind CSS", "Bootstrap"]
                            },
                            {
                                category: "State & Data Management",
                                items: ["Zustand", "Redux", "TanStack Query (React Query)"]
                            },
                            {
                                category: "Software Architecture",
                                items: ["Micro-frontend (MFE) Orchestration", "Microservices Architecture", "Monolith Refactoring"]
                            },
                            {
                                category: "Cloud & Database",
                                items: ["Firebase", "PostgreSQL", "MongoDB", "NoSQL", "Google Workspace Automation", "RESTful API Design"]
                            },
                            {
                                category: "UI/UX & Design",
                                items: ["Figma (Prototyping/Wireframing)", "User Research", "Usability Testing", "Adobe Premiere Pro", "Canva"]
                            },
                            {
                                category: "Tools & Workflow",
                                items: ["Git", "GitHub", "GitLab", "Bitbucket", "Postman", "OpenProject", "VS Code", "Agile (Scrum)"]
                            },
                            {
                                category: "Professional Competencies",
                                items: ["Technical Communication", "Cross-functional Collaboration", "Teamwork", "Leadership", "Analytical Problem-Solving"]
                            }
                        ].map((skillBlock, idx) => (
                            <div key={idx} className="space-y-2">
                                <strong className="text-xs font-mono text-accent/60 uppercase tracking-widest block mb-2">{skillBlock.category}</strong>
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    {skillBlock.items.map(item => (
                                        <span key={item} className="px-2 py-1 bg-accent/5 border border-accent/10 rounded-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
