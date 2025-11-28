import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ShoppingCart, 
  Package, 
  MessageSquare, 
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  status: string;
  servicePrice: string;
  createdAt: Date | null;
}

interface ContactMessage {
  id: string;
  read: boolean | null;
}

interface Service {
  id: string;
}

interface PortfolioProject {
  id: string;
}

export default function AdminDashboard() {
  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const { data: portfolio, isLoading: portfolioLoading } = useQuery<PortfolioProject[]>({
    queryKey: ['/api/portfolio'],
  });

  const isLoading = ordersLoading || messagesLoading || servicesLoading || portfolioLoading;

  // Calculate statistics
  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;
  const cancelledOrders = orders?.filter(o => o.status === 'cancelled').length || 0;
  const unreadMessages = messages?.filter(m => !m.read).length || 0;
  const totalMessages = messages?.length || 0;
  const totalServices = services?.length || 0;
  const totalPortfolio = portfolio?.length || 0;

  // Calculate revenue (remove PKR and commas, then sum)
  const totalRevenue = orders?.reduce((sum, order) => {
    const price = order.servicePrice.replace(/PKR\s*/i, '').replace(/,/g, '');
    return sum + (parseFloat(price) || 0);
  }, 0) || 0;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      description: 'All time orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: Clock,
      description: 'Awaiting confirmation',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed Orders',
      value: completedOrders,
      icon: CheckCircle,
      description: 'Successfully delivered',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Revenue',
      value: `PKR ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: 'From all orders',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Unread Messages',
      value: unreadMessages,
      icon: MessageSquare,
      description: `${totalMessages} total messages`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Active Services',
      value: totalServices,
      icon: Briefcase,
      description: 'Services offered',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Portfolio Projects',
      value: totalPortfolio,
      icon: Package,
      description: 'Showcase projects',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Cancelled Orders',
      value: cancelledOrders,
      icon: XCircle,
      description: 'Cancelled by client',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  // Recent orders
  const recentOrders = orders?.slice(0, 5) || [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", color: string }> = {
      pending: { variant: "secondary", color: "text-yellow-600" },
      confirmed: { variant: "default", color: "text-blue-600" },
      'in-progress': { variant: "default", color: "text-purple-600" },
      completed: { variant: "default", color: "text-green-600" },
      cancelled: { variant: "destructive", color: "text-red-600" },
    };
    return variants[status] || variants.pending;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's your business overview
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>

        {/* Statistics Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          Order #{order.id.substring(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm">{order.servicePrice}</span>
                        <Badge variant={getStatusBadge(order.status).variant}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Quick Overview</CardTitle>
                  <CardDescription>Key metrics at a glance</CardDescription>
                </div>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Active Orders</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    {orders?.filter(o => o.status === 'in-progress').length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Messages</p>
                      <p className="text-xs text-muted-foreground">Requires attention</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{unreadMessages}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Completion Rate</p>
                      <p className="text-xs text-muted-foreground">Success ratio</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    {totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-100">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pending Review</p>
                      <p className="text-xs text-muted-foreground">Needs action</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{pendingOrders}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
