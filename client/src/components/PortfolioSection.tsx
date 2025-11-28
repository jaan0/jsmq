import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import PortfolioCard, { type Project } from './PortfolioCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const cloudinaryBase = 'https://res.cloudinary.com/demo/image/upload/v1699999999/jsmq';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  createdAt?: Date | null;
}

// todo: remove mock functionality - fallback data for demo
const mockProjects: Project[] = [
    {
      id: 'ecommerce',
      title: 'Modern E-Commerce Store',
      category: 'E-Commerce',
      description: 'Full-featured online shopping platform with payment integration and inventory management',
      image: `${cloudinaryBase}/ecommerce-store.png`,
    },
    {
      id: 'dashboard',
      title: 'Business Analytics Dashboard',
      category: 'Web Application',
      description: 'Real-time analytics dashboard with data visualization and reporting tools',
      image: `${cloudinaryBase}/business-dashboard.png`,
    },
    {
      id: 'restaurant',
      title: 'Restaurant Website & Ordering',
      category: 'Food & Beverage',
      description: 'Elegant restaurant website with online ordering and reservation system',
      image: `${cloudinaryBase}/restaurant.png`,
    },
    {
      id: 'realestate',
      title: 'Real Estate Platform',
      category: 'Real Estate',
      description: 'Property listing and search platform with advanced filtering capabilities',
      image: `${cloudinaryBase}/real-estate.png`,
    },
    {
      id: 'fitness',
      title: 'Fitness & Wellness App',
      category: 'Health & Fitness',
      description: 'Mobile fitness application with workout tracking and nutrition planning',
      image: `${cloudinaryBase}/fitness-app.png`,
    },
    {
      id: 'corporate',
      title: 'Corporate Services Website',
      category: 'Corporate',
      description: 'Professional corporate website showcasing services and team expertise',
      image: `${cloudinaryBase}/corporate.png`,
    },
  ];

export default function PortfolioSection() {
  const { data: portfolioProjects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ['/api/portfolio'],
  });

  const { ref: sectionRef, isInView } = useScrollAnimation({ threshold: 0.1 });

  // todo: remove mock functionality - convert API data to Project format or use fallback
  const displayProjects: Project[] = portfolioProjects && portfolioProjects.length > 0
    ? portfolioProjects.map(p => ({ ...p, image: p.imageUrl }))
    : mockProjects;

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
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="portfolio" className="py-24 bg-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-ring rounded-full blur-3xl" />
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
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our recent projects and see how we've helped businesses transform their digital presence
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {displayProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <PortfolioCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
