import { useServices } from "@/hooks/useServices.ts";
import { Button } from "@/components/ui/button.tsx";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ServicesProps {
    onContactClick: (serviceTitle?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
    const { data: services, isLoading } = useServices();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Helper to get icon component from string name
    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent || Icons.Box;
    };

    if (isLoading) {
        return (
            <section id="services" className="py-24 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
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
                            Services
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        What We Build
                    </h2>
                    <p className="text-xl text-slate-400 font-light">
                        End-to-end solutions for modern digital products
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    {services?.map((service, index) => {
                        const IconComponent = getIcon(service.icon);

                        // Bento Grid sizing logic (first 2 are larger)
                        const isLarge = index < 2;
                        const gridClass = isLarge
                            ? "md:col-span-2 lg:col-span-1"
                            : "md:col-span-1";

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`${gridClass} group relative`}
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
                                <div className="relative h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-300">
                                    {/* Icon */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                            <IconComponent className="w-6 h-6 text-purple-400" />
                                        </div>
                                        {service.badge && (
                                            <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                                                {service.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
                                        {service.features.slice(0, 3).map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-white">{service.price}</span>
                                            {!service.price.toLowerCase().includes('custom') && (
                                                <span className="text-slate-500 text-sm ml-1">/ project</span>
                                            )}
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => onContactClick(service.title)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full group/btn"
                                        >
                                            Start
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {services?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No services available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
