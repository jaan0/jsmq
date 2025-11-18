import PortfolioCard from '../PortfolioCard';
import projectImage from '@assets/generated_images/E-commerce_website_portfolio_project_d9fee8dd.png';

export default function PortfolioCardExample() {
  const mockProject = {
    id: 'ecommerce-store',
    title: 'Modern E-Commerce Store',
    category: 'E-Commerce',
    description: 'Full-featured online shopping platform with payment integration',
    image: projectImage,
  };

  return (
    <div className="p-8 bg-background">
      <PortfolioCard project={mockProject} />
    </div>
  );
}
