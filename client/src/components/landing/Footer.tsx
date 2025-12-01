import { Button } from "@/components/ui/button.tsx";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings.ts";
import { Link } from "wouter";

interface FooterProps {
    onContactClick: () => void;
}

const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
};

export default function Footer({ onContactClick }: FooterProps) {
    const { data: settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    const visibleSocialLinks = settings?.socialLinks?.filter(link => link.visible && link.url) || [];

    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">{settings?.companyName || "JSMQ"}</h3>
                        <p className="text-white/70 leading-relaxed">
                            {settings?.footerTagline || "Creating exceptional digital experiences that drive business growth and success."}
                        </p>
                        {visibleSocialLinks.length > 0 && (
                            <div className="flex gap-3">
                                {visibleSocialLinks.map((link) => {
                                    const Icon = socialIcons[link.platform];
                                    return (
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-white/70 hover:text-white transition-colors"
                                            aria-label={link.platform}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
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
                                <span>{settings?.contactEmail || "contact@jsmqwebflow.com"}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
                                <span>{settings?.contactPhone || "+1 (555) 123-4567"}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
                                <span style={{ whiteSpace: "pre-line" }}>
                                    {settings?.contactAddress || "123 Business St, Suite 100\nNew York, NY 10001"}
                                </span>
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
                            © {currentYear} {settings?.companyName || "JSMQ"}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy-policy">
                                <a className="text-white/60 hover:text-purple-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </Link>
                            <Link href="/terms-of-service">
                                <a className="text-white/60 hover:text-purple-400 transition-colors">
                                    Terms of Service
                                </a>
                            </Link>
                            <Link href="/cookie-policy">
                                <a className="text-white/60 hover:text-purple-400 transition-colors">
                                    Cookie Policy
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
