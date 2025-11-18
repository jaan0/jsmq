import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Building2, Wallet, Check } from 'lucide-react';
import type { Service } from './ServiceCard';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

type PaymentMethod = 'bank' | 'nayapay' | 'sadapay';

export default function PaymentDialog({ open, onOpenChange, service }: PaymentDialogProps) {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (!service) return null;

  const paymentMethods = [
    {
      id: 'bank' as PaymentMethod,
      name: 'Bank Transfer',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Meezan Bank transfer',
    },
    {
      id: 'nayapay' as PaymentMethod,
      name: 'NayaPay',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Pay with NayaPay wallet',
    },
    {
      id: 'sadapay' as PaymentMethod,
      name: 'SadaPay',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay with SadaPay wallet',
    },
  ];

  const handleProceed = async () => {
    if (!selectedMethod) {
      toast({
        title: 'Select Payment Method',
        description: 'Please select a payment method to continue.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceTitle: service.title,
          servicePrice: service.price,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          paymentMethod: selectedMethod,
        }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      toast({
        title: 'Order Placed Successfully!',
        description: `We'll send payment instructions to ${customerInfo.email}`,
      });

      onOpenChange(false);
      setSelectedMethod(null);
      setCustomerInfo({ name: '', email: '', phone: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Order</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method and enter your details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card className="p-4 bg-accent">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold" data-testid="text-service-title">{service.title}</h3>
                <p className="text-sm text-muted-foreground">Web Development Service</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary" data-testid="text-service-price">
                  {service.price}
                </div>
              </div>
            </div>
          </Card>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Your Information</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Full Name</Label>
                <Input
                  id="customer-name"
                  placeholder="John Doe"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  required
                  data-testid="input-customer-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="john@example.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  required
                  data-testid="input-customer-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone Number</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  required
                  data-testid="input-customer-phone"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Select Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                    selectedMethod === method.id ? 'border-primary border-2' : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                  data-testid={`payment-method-${method.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{method.name}</h4>
                        {selectedMethod === method.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {selectedMethod && (
            <Card className="p-4 bg-accent">
              <p className="text-sm">
                {selectedMethod === 'bank' && (
                  <span>Bank transfer details will be sent to your email. Please complete the transfer and send proof of payment.</span>
                )}
                {selectedMethod === 'nayapay' && (
                  <span>NayaPay payment details will be sent to your email.</span>
                )}
                {selectedMethod === 'sadapay' && (
                  <span>SadaPay payment details will be sent to your email.</span>
                )}
              </p>
            </Card>
          )}

          <Button
            onClick={handleProceed}
            className="w-full"
            size="lg"
            disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
            data-testid="button-proceed-payment"
          >
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
