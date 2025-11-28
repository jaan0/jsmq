import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import AdminLayout from '@/components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  read: boolean | null;
  createdAt: Date | null;
}

export default function AdminMessages() {
  const { toast } = useToast();
  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('PATCH', `/api/contact-messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
      toast({ title: 'Marked as Read', description: 'Message has been marked as read' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to mark message as read', variant: 'destructive' });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Contact Messages</h1>
          <p className="text-muted-foreground mt-1">View and manage customer inquiries</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={`p-6 border-2 hover:shadow-lg transition-all ${message.read ? 'opacity-60' : 'border-purple-200'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.read ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge variant="default">New</Badge>
                    )}
                    <Badge variant="secondary">{message.service}</Badge>
                  </div>
                </div>
                <p className="text-sm mb-4">{message.message}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {message.createdAt ? new Date(message.createdAt).toLocaleString() : 'N/A'}
                  </span>
                  {!message.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsReadMutation.mutate(message.id)}
                      disabled={markAsReadMutation.isPending}
                      data-testid={`button-mark-read-${message.id}`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center text-muted-foreground">
            No messages yet
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
