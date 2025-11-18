import { useState } from 'react';
import PaymentDialog from '../PaymentDialog';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function PaymentDialogExample() {
  const [open, setOpen] = useState(false);

  const mockService = {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Professional single-page website',
    price: 'PKR 25,000',
    features: ['Responsive Design', 'SEO Optimized'],
    icon: <Code className="w-6 h-6" />,
  };

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Payment Dialog</Button>
      <PaymentDialog open={open} onOpenChange={setOpen} service={mockService} />
    </div>
  );
}
