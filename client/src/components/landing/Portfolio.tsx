import { usePortfolio } from "@/hooks/usePortfolio.ts";
import { Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Portfolio() {
    const { data: projects, isLoading } = usePortfolio();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    if (isLoading) {
        return (
            <section id="portfolio" className="py-24 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <span className="text-purple-400 text-sm font-medium tracking-wide uppercase">
                            Our Work
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Portfolio Showcase
                    </h2>
                    <p className="text-xl text-slate-400 font-light">
                        Explore our recent projects and see the quality of work we deliver
                    </p>
                </motion.div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    {projects?.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative cursor-pointer"
                            onClick={() => project.projectUrl && window.open(project.projectUrl, '_blank')}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMousePosition({
                                    x: e.clientX - rect.left,
                                    y: e.clientY - rect.top,
                                });
                            }}
                        >
                            {/* Spotlight Effect */}
                            <div
                                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                style={{
                                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
                                }}
                            />

                            {/* Card */}
                            <div className="relative h-full bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-slate-700 transition-all duration-300">
                                {/* Project Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-center">
                                            <ExternalLink className="w-8 h-8 text-white mx-auto mb-2" />
                                            {project.projectUrl && (
                                                <p className="text-white text-sm font-medium">View Project</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full mb-3">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                    {project.projectUrl && (
                                        <div className="mt-4 pt-4 border-t border-slate-800">
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Visit Project
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {projects?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No portfolio projects available yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
