import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import ContactDialog from '@/components/ContactDialog';
import PaymentDialog from '@/components/PaymentDialog';
import Footer from '@/components/Footer';
import type { Service } from '@/components/ServiceCard';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleContactClick = () => {
    setContactOpen(true);
  };

  const handleGetStartedClick = () => {
    setContactOpen(true);
  };

  const handleViewServicesClick = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePurchaseClick = (service: Service) => {
    setSelectedService(service);
    setPaymentOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onContactClick={handleContactClick} />
      <HeroSection
        onGetStartedClick={handleGetStartedClick}
        onViewServicesClick={handleViewServicesClick}
      />
      <ServicesSection onPurchaseClick={handlePurchaseClick} />
      <PortfolioSection />
      <AboutSection />
      <Footer onContactClick={handleContactClick} />
      
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        service={selectedService}
      />
    </div>
  );
}
