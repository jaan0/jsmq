import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminOrders from "@/pages/AdminOrders";
import AdminServices from "@/pages/AdminServices";
import AdminPortfolio from "@/pages/AdminPortfolio";
import AdminMessages from "@/pages/AdminMessages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin/messages" component={AdminMessages} />
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
