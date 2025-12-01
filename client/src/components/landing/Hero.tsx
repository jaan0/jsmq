import { Button } from "@/components/ui/button.tsx";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
    onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />

            {/* Glowing Orb/Gradient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orb-glow opacity-30 animate-pulse-subtle" />

            {/* Floating Elements (Abstract Code/Tech) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 text-purple-500/20"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Code2 size={120} />
                </motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-1/4 text-green-500/20"
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Terminal size={100} />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-colors cursor-default"
                    >
                        <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
                        <span className="text-white/80 text-sm font-medium tracking-wide">
                            Next-Gen Web Development
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                        Build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 text-glow">
                            Impossible
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        We craft high-performance digital experiences with cutting-edge technology and pixel-perfect precision.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                    >
                        <Button
                            size="lg"
                            onClick={onContactClick}
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] transition-all duration-300 group"
                        >
                            Start Project
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 px-10 py-7 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Services
                        </Button>
                    </motion.div>

                    {/* Tech Stack / Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="pt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Simple text representation of tech stack for clean look */}
                        {['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB'].map((tech) => (
                            <span key={tech} className="text-slate-500 font-semibold text-sm tracking-widest uppercase">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-50" />
            </motion.div>
        </section>
    );
}
