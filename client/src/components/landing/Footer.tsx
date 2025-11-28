import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

interface FooterProps {
    onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">JSMQ</h3>
                        <p className="text-white/70 leading-relaxed">
                            Creating exceptional digital experiences that drive business growth and success.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#services" className="text-white/70 hover:text-purple-400 transition-colors">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio" className="text-white/70 hover:text-purple-400 transition-colors">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="text-white/70 hover:text-purple-400 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={onContactClick}
                                    className="text-white/70 hover:text-purple-400 transition-colors"
                                >
                                    Contact Us
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li className="text-white/70">Web Development</li>
                            <li className="text-white/70">Mobile Apps</li>
                            <li className="text-white/70">UI/UX Design</li>
                            <li className="text-white/70">Digital Marketing</li>
                            <li className="text-white/70">SEO Optimization</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/70">
                                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
                                <span>contact@jsmqwebflow.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
                                <span>123 Business St, Suite 100<br />New York, NY 10001</span>
                            </li>
                        </ul>
                        <Button
                            onClick={onContactClick}
                            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white glow-on-hover"
                        >
                            Get In Touch
                        </Button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-sm">
                            © {currentYear} JSMQ. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-white/60 hover:text-purple-400 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
