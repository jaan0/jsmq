import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminServices from "@/pages/AdminServices";
import AdminPortfolio from "@/pages/AdminPortfolio";
import AdminMessages from "@/pages/AdminMessages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/aj-admin/login" component={AdminLogin} />
      <Route path="/aj-admin" component={AdminDashboard} />
      <Route path="/aj-admin/orders" component={AdminOrders} />
      <Route path="/aj-admin/services" component={AdminServices} />
      <Route path="/aj-admin/portfolio" component={AdminPortfolio} />
      <Route path="/aj-admin/messages" component={AdminMessages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
