import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import AdminLayout from '@/components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  badge: string | null;
  icon: string;
}

type ServiceFormData = {
  title: string;
  description: string;
  price: string;
  features: string;
  badge: string;
  icon: string;
};

export default function AdminServices() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    price: '',
    features: '',
    badge: '',
    icon: 'code',
  });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', price: '', features: '', badge: '', icon: 'code' });
  };

  const createMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      return apiRequest('/api/services', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          features: data.features.split('\n').filter(f => f.trim()),
          badge: data.badge || null,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsAddDialogOpen(false);
      resetForm();
      toast({ title: 'Service Created', description: 'Service has been added successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create service', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceFormData }) => {
      return apiRequest(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          features: data.features.split('\n').filter(f => f.trim()),
          badge: data.badge || null,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setEditingService(null);
      resetForm();
      toast({ title: 'Service Updated', description: 'Service has been updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update service', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/services/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({ title: 'Service Deleted', description: 'Service has been removed successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete service', variant: 'destructive' });
    },
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features.join('\n'),
      badge: service.badge || '',
      icon: service.icon,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingService(null);
      setIsAddDialogOpen(false);
      resetForm();
    } else if (!editingService) {
      setIsAddDialogOpen(true);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services Management</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>
          <Dialog open={isAddDialogOpen || !!editingService} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-service">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    data-testid="input-description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="PKR 25,000"
                    required
                    data-testid="input-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Features (one per line)</Label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={5}
                    required
                    data-testid="input-features"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Badge (optional)</Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Popular, Best Value, etc."
                    data-testid="input-badge"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="code, shopping-cart, building, etc."
                    required
                    data-testid="input-icon"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit-service"
                >
                  {(createMutation.isPending || updateMutation.isPending) 
                    ? 'Saving...' 
                    : editingService ? 'Update Service' : 'Create Service'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 relative">
                {service.badge && (
                  <Badge className="absolute -top-2 right-4 bg-primary">{service.badge}</Badge>
                )}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                <ul className="space-y-1 mb-4">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-sm">• {feature}</li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-muted-foreground">
                      +{service.features.length - 3} more
                    </li>
                  )}
                </ul>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                    data-testid={`button-edit-${service.id}`}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(service.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${service.id}`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center text-muted-foreground">
            No services yet. Add your first service.
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
