import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LayoutDashboard,
    Briefcase,
    FolderKanban,
    ShoppingCart,
    MessageSquare,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [location] = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="bg-slate-900 border-slate-700"
                >
                    {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-800">
                        <h1 className="text-2xl font-bold text-white">JSMQ Admin</h1>
                        <p className="text-sm text-white/60 mt-1">Management Panel</p>
                    </div>

                    {/* Navigation */}
                    <ScrollArea className="flex-1 py-6">
                        <nav className="space-y-1 px-3">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = location === item.href;

                                return (
                                    <Link key={item.name} href={item.href}>
                                        <a
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                isActive
                                                    ? "bg-purple-600 text-white"
                                                    : "text-white/70 hover:bg-slate-800 hover:text-white"
                                            )}
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </a>
                                    </Link>
                                );
                            })}
                        </nav>
                    </ScrollArea>

                    {/* User Section */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                                <span className="text-white font-semibold">A</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Admin User</p>
                                <p className="text-xs text-white/60 truncate">admin@jsmq.com</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full border-slate-700 text-white/70 hover:text-white hover:bg-slate-800"
                            onClick={() => window.location.href = "/"}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
