import { useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Features from "@/components/landing/Features";
import Portfolio from "@/components/landing/Portfolio";
import Footer from "@/components/landing/Footer";
import ContactFormPopup from "@/components/landing/ContactFormPopup";

export default function Landing() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<string | undefined>();

    const handleContactClick = (serviceTitle?: string) => {
        setSelectedService(serviceTitle);
        setIsContactOpen(true);
    };

    const handleContactClose = () => {
        setIsContactOpen(false);
        setSelectedService(undefined);
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header onContactClick={() => handleContactClick()} />
            <div id="home">
                <Hero onContactClick={() => handleContactClick()} />
            </div>
            <div id="services">
                <Services onContactClick={handleContactClick} />
            </div>
            <div id="features">
                <Features onContactClick={() => handleContactClick()} />
            </div>
            <div id="portfolio">
                <Portfolio />
            </div>
            <Footer onContactClick={() => handleContactClick()} />

            <ContactFormPopup
                isOpen={isContactOpen}
                onClose={handleContactClose}
                preSelectedService={selectedService}
            />
        </div>
    );
}
