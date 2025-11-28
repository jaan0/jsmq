import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface PortfolioCardProps {
  project: Project;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-500 hover:-translate-y-3 cursor-pointer will-change-transform hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" data-testid={`title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-sm text-white/90 mb-2">
                  {project.description}
                </p>
                <span className="text-xs text-white/80" data-testid={`category-${project.id}`}>
                  {project.category}
                </span>
              </div>
              <ExternalLink className="w-5 h-5 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
