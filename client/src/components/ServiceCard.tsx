import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  badge?: string;
  icon: React.ReactNode;
  imageUrl?: string | null;
}

interface ServiceCardProps {
  service: Service;
  onPurchaseClick: (service: Service) => void;
}

export default function ServiceCard({ service, onPurchaseClick }: ServiceCardProps) {
  return (
    <Card className="relative hover-elevate active-elevate-2 transition-all duration-500 hover:-translate-y-3 group overflow-visible h-full flex flex-col will-change-transform hover:shadow-2xl">
      {service.badge && (
        <div className="absolute -top-3 right-4 z-10">
          <Badge
            variant="default"
            className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 px-3 py-1"
            data-testid={`badge-${service.id}`}
          >
            {service.badge}
          </Badge>
        </div>
      )}

      {service.imageUrl && (
        <div className="h-40 w-full overflow-hidden rounded-t-xl">
          <img
            src={service.imageUrl}
            alt={`${service.title} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}

      <CardHeader className="space-y-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
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
            {formatPrice(service.price)}
          </span>
        </div>        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          onClick={() => onPurchaseClick(service)}
          className="w-full transition-all duration-300 hover:scale-105"
          variant="default"
          data-testid={`button-purchase-${service.id}`}
        >
          Purchase Now
        </Button>
      </CardFooter>
    </Card>
  );
}
