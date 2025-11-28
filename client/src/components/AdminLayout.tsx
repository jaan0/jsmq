import { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingBag, Briefcase, FolderKanban, MessageSquare, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

import { useAdminAuth, logout } from '@/hooks/useAdminAuth';

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  useAdminAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/aj-admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Orders',
      url: '/aj-admin/orders',
      icon: ShoppingBag,
    },
    {
      title: 'Services',
      url: '/aj-admin/services',
      icon: Briefcase,
    },
    {
      title: 'Portfolio',
      url: '/aj-admin/portfolio',
      icon: FolderKanban,
    },
    {
      title: 'Messages',
      url: '/aj-admin/messages',
      icon: MessageSquare,
    },
  ];

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent className="bg-gradient-to-b from-background to-accent/20">
            <SidebarGroup>
              <div className="p-4 mb-2">
                <SidebarGroupLabel className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JSMQ Admin
                </SidebarGroupLabel>
                <p className="text-xs text-muted-foreground mt-1">Business Management</p>
              </div>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location === item.url}>
                        <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-background via-accent/10 to-background shadow-sm">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="text-sm text-muted-foreground">
              Welcome, Admin
            </div>
          </header>
          <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-background via-accent/5 to-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
