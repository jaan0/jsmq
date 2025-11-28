import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Users, TrendingUp, Code, Headphones } from "lucide-react";

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

export default function Features() {
    return (
        <section id="features" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Why Choose Us
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Built for Success
                    </h2>
                    <p className="text-xl text-white/70">
                        We combine cutting-edge technology with proven strategies to deliver exceptional results
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm card-hover-lift scroll-reveal"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="mb-6 p-4 bg-purple-500/20 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="w-8 h-8 text-purple-400" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-white/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center scroll-reveal">
                    <div className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-xl text-white/80 mb-6 max-w-2xl">
                            Join hundreds of satisfied clients who have transformed their digital presence with our services
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">500+</div>
                                <div className="text-white/70 text-sm">Happy Clients</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">1000+</div>
                                <div className="text-white/70 text-sm">Projects Done</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-white/70 text-sm">Team Members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
