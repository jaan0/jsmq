import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";

interface ServicesProps {
    onContactClick: (serviceTitle?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
    const { data: services, isLoading } = useServices();

    // Helper to get icon component from string name
    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent || Icons.Box;
    };

    if (isLoading) {
        return (
            <section id="services" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Our Services
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What We Offer
                    </h2>
                    <p className="text-xl text-white/70">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services?.map((service, index) => {
                        const IconComponent = getIcon(service.icon);

                        return (
                            <Card
                                key={service.id}
                                className="bg-slate-800/50 border-slate-700 backdrop-blur-sm card-hover-lift scroll-reveal overflow-hidden group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Service Image */}
                                {service.imageUrl && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="w-full h-full object-cover scale-on-hover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
                                    </div>
                                )}

                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 bg-purple-500/20 rounded-lg">
                                            <IconComponent className="w-6 h-6 text-purple-400" />
                                        </div>
                                        {service.badge && (
                                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                                                {service.badge}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-2xl text-white mt-4">
                                        {service.title}
                                    </CardTitle>
                                    <CardDescription className="text-white/70 text-base">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-white/80 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-700">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-white">{service.price}</span>
                                            {!service.price.toLowerCase().includes('custom') && (
                                                <span className="text-white/60 text-sm">/ project</span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white glow-on-hover"
                                        onClick={() => onContactClick(service.title)}
                                    >
                                        Get Started
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {services?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/60 text-lg">No services available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
