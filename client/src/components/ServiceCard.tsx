import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  badge?: string;
  icon: React.ReactNode;
}

interface ServiceCardProps {
  service: Service;
  onPurchaseClick: (service: Service) => void;
}

export default function ServiceCard({ service, onPurchaseClick }: ServiceCardProps) {
  return (
    <Card className="relative hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2 group overflow-visible">
      {service.badge && (
        <div className="absolute -top-3 right-4 z-10">
          <Badge
            variant="default"
            className="bg-gradient-to-r from-primary to-ring text-white border-0 px-3 py-1"
            data-testid={`badge-${service.id}`}
          >
            {service.badge}
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-ring/20 rounded-lg flex items-center justify-center text-primary">
          {service.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2" data-testid={`title-${service.id}`}>
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary" data-testid={`price-${service.id}`}>
            {service.price}
          </span>
        </div>

        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onPurchaseClick(service)}
          className="w-full"
          variant="default"
          data-testid={`button-purchase-${service.id}`}
        >
          Purchase Now
        </Button>
      </CardFooter>
    </Card>
  );
}
