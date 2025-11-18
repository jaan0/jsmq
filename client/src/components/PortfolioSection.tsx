import { useQuery } from '@tanstack/react-query';
import PortfolioCard, { type Project } from './PortfolioCard';
import { Skeleton } from '@/components/ui/skeleton';
import ecommerceImg from '@assets/generated_images/E-commerce_website_portfolio_project_d9fee8dd.png';
import dashboardImg from '@assets/generated_images/Business_dashboard_portfolio_project_e6fafc6a.png';
import restaurantImg from '@assets/generated_images/Restaurant_website_portfolio_project_b5b3c229.png';
import realEstateImg from '@assets/generated_images/Real_estate_website_portfolio_d3b0f561.png';
import fitnessImg from '@assets/generated_images/Fitness_app_portfolio_project_c25ee79b.png';
import corporateImg from '@assets/generated_images/Corporate_website_portfolio_project_0a20ad02.png';

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
      image: ecommerceImg,
    },
    {
      id: 'dashboard',
      title: 'Business Analytics Dashboard',
      category: 'Web Application',
      description: 'Real-time analytics dashboard with data visualization and reporting tools',
      image: dashboardImg,
    },
    {
      id: 'restaurant',
      title: 'Restaurant Website & Ordering',
      category: 'Food & Beverage',
      description: 'Elegant restaurant website with online ordering and reservation system',
      image: restaurantImg,
    },
    {
      id: 'realestate',
      title: 'Real Estate Platform',
      category: 'Real Estate',
      description: 'Property listing and search platform with advanced filtering capabilities',
      image: realEstateImg,
    },
    {
      id: 'fitness',
      title: 'Fitness & Wellness App',
      category: 'Health & Fitness',
      description: 'Mobile fitness application with workout tracking and nutrition planning',
      image: fitnessImg,
    },
    {
      id: 'corporate',
      title: 'Corporate Services Website',
      category: 'Corporate',
      description: 'Professional corporate website showcasing services and team expertise',
      image: corporateImg,
    },
  ];

export default function PortfolioSection() {
  const { data: portfolioProjects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ['/api/portfolio'],
  });

  // todo: remove mock functionality - convert API data to Project format or use fallback
  const displayProjects: Project[] = portfolioProjects && portfolioProjects.length > 0
    ? portfolioProjects.map(p => ({ ...p, image: p.imageUrl }))
    : mockProjects;

  return (
    <section id="portfolio" className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our recent projects and see how we've helped businesses transform their digital presence
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
