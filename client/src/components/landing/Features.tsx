import { Button } from "@/components/ui/button.tsx";
import { Zap, Shield, Users, TrendingUp, Code, Headphones, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Optimized performance ensures your website loads in milliseconds, providing the best user experience."
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description: "Enterprise-grade security measures protect your data and ensure 99.9% uptime for your business."
    },
    {
        icon: Users,
        title: "User-Centric Design",
        description: "Beautiful, intuitive interfaces designed with your users in mind, maximizing engagement and conversions."
    },
    {
        icon: TrendingUp,
        title: "SEO Optimized",
        description: "Built-in SEO best practices help your website rank higher and attract more organic traffic."
    },
    {
        icon: Code,
        title: "Clean Code",
        description: "Well-structured, maintainable code following industry best practices and modern standards."
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Round-the-clock customer support to help you whenever you need assistance."
    }
];

interface FeaturesProps {
    onContactClick: () => void;
}

export default function Features({ onContactClick }: FeaturesProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    return (
        <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
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
                            Why Choose Us
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Built for Success
                    </h2>
                    <p className="text-xl text-slate-400 font-light">
                        We combine cutting-edge technology with proven strategies to deliver exceptional results
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative"
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
                                <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all duration-300">
                                    <div className="mb-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 w-fit group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-8 h-8 text-purple-400" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                            Join hundreds of satisfied clients who have transformed their digital presence with our services
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 justify-center mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">500+</div>
                                <div className="text-slate-400 text-sm">Happy Clients</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">1000+</div>
                                <div className="text-slate-400 text-sm">Projects Done</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-slate-400 text-sm">Team Members</div>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <Button
                            size="lg"
                            onClick={onContactClick}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] transition-all duration-300 group"
                        >
                            Start Your Project
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
