import { useSiteSettings } from "@/hooks/useSiteSettings.ts";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Header from "@/components/landing/Header.tsx";
import Footer from "@/components/landing/Footer.tsx";

export default function CookiePolicy() {
    const { data: settings, isLoading } = useSiteSettings();
    const [, setLocation] = useLocation();
    const onContactClick = () => setLocation("/");

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <Header onContactClick={onContactClick} />

            {/* Content */}
            <main className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">
                <div className="prose prose-invert prose-purple max-w-none">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {(() => {
                            const raw = settings?.cookiePolicy || "# Cookie Policy\n\nContent not available.";
                            const fence = raw.match(/^```(html)?[\s\S]*```$/);
                            if (fence) {
                                return raw.replace(/^```(html)?/, "").replace(/```$/, "");
                            }
                            return raw;
                        })()}
                    </ReactMarkdown>
                </div>
            </main>

            <Footer onContactClick={onContactClick} />
        </div>
    );
}
