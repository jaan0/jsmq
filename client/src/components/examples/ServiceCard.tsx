import ServiceCard from '../ServiceCard';
import { Code } from 'lucide-react';

export default function ServiceCardExample() {
  const mockService = {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Professional single-page website perfect for showcasing your business',
    price: 'PKR 25,000',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'Fast Loading Speed',
      'Contact Form Integration',
    ],
    badge: 'Popular',
    icon: <Code className="w-6 h-6" />,
  };

  return (
    <div className="p-8 bg-background">
      <ServiceCard
        service={mockService}
        onPurchaseClick={(service) => console.log('Purchase clicked:', service.title)}
      />
    </div>
  );
}
