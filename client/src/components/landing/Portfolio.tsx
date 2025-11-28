import { usePortfolio } from "@/hooks/usePortfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";

export default function Portfolio() {
    const { data: projects, isLoading } = usePortfolio();

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
        <section id="portfolio" className="py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Our Work
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Portfolio Showcase
                    </h2>
                    <p className="text-xl text-white/70">
                        Explore our recent projects and see the quality of work we deliver
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project, index) => (
                        <Card
                            key={project.id}
                            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group card-hover-lift scroll-reveal cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => project.projectUrl && window.open(project.projectUrl, '_blank')}
                        >
                            {/* Project Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover scale-on-hover"
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

                            <CardContent className="p-6">
                                <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
                                    {project.category}
                                </Badge>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-white/70 text-sm line-clamp-2">
                                    {project.description}
                                </p>
                                {project.projectUrl && (
                                    <div className="mt-4 pt-4 border-t border-slate-700">
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
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {projects?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/60 text-lg">No portfolio projects available yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
