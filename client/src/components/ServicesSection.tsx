import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ServiceCard, { type Service } from './ServiceCard';
import { Code, ShoppingCart, Building2, Smartphone, Palette, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServicesSectionProps {
  onPurchaseClick: (service: Service) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-6 h-6" />,
  'shopping-cart': <ShoppingCart className="w-6 h-6" />,
  building: <Building2 className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
};

// todo: remove mock functionality - fallback data for demo
const mockServices: Service[] = [
    {
      id: 'landing-page',
      title: 'Landing Page',
      description: 'Professional single-page website perfect for showcasing your business with modern design',
      price: 'PKR 25,000',
      features: [
        'Responsive Design',
        'SEO Optimized',
        'Fast Loading Speed',
        'Contact Form Integration',
        'Social Media Links',
      ],
      badge: 'Popular',
      icon: <Code className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/landing-page.png',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Website',
      description: 'Full-featured online store with payment integration and inventory management',
      price: 'PKR 75,000',
      features: [
        'Product Catalog',
        'Shopping Cart',
        'Payment Gateway',
        'Order Management',
        'Admin Dashboard',
      ],
      badge: 'Best Value',
      icon: <ShoppingCart className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/ecommerce-store.png',
    },
    {
      id: 'corporate',
      title: 'Corporate Website',
      description: 'Professional multi-page website for established businesses and organizations',
      price: 'PKR 50,000',
      features: [
        'Multiple Pages',
        'Content Management',
        'Team Profiles',
        'Blog Section',
        'Newsletter Integration',
      ],
      icon: <Building2 className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/corporate-site.png',
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications for iOS and Android',
      price: 'PKR 150,000',
      features: [
        'iOS & Android',
        'Push Notifications',
        'Offline Support',
        'API Integration',
        'App Store Submission',
      ],
      icon: <Smartphone className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/mobile-app.png',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Beautiful, user-centered design services for web and mobile applications',
      price: 'PKR 35,000',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Design System',
        'Usability Testing',
      ],
      icon: <Palette className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/ui-ux.png',
    },
    {
      id: 'web-app',
      title: 'Custom Web Application',
      description: 'Tailored web applications with advanced functionality and features',
      price: 'PKR 100,000',
      features: [
        'Custom Features',
        'Database Design',
        'API Development',
        'User Authentication',
        'Real-time Updates',
      ],
      badge: 'Premium',
      icon: <Zap className="w-6 h-6" />,
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq/web-app.png',
    },
  ];

export default function ServicesSection({ onPurchaseClick }: ServicesSectionProps) {
  const { data: apiServices, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const { ref: sectionRef, isInView } = useScrollAnimation({ threshold: 0.1 });

  // todo: remove mock functionality - use fallback data if API fails
  const displayServices = apiServices && apiServices.length > 0 
    ? apiServices.map(service => ({
        ...service,
        icon: typeof service.icon === 'string' 
          ? (iconMap[service.icon] || iconMap.code)
          : service.icon
      }))
    : mockServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ring rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={sectionRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose from our range of professional web development services tailored to your needs
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {displayServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <ServiceCard
                  service={service}
                  onPurchaseClick={onPurchaseClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
