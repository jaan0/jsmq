import { Switch, Route, useLocation } from "wouter";
import * as React from "react";
import { queryClient } from "./lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Landing from "@/pages/Landing.tsx";
import AdminLogin from "@/pages/AdminLogin.tsx";
import AdminDashboard from "@/pages/AdminDashboard.tsx";
import AdminOrders from "@/pages/AdminOrders.tsx";
import AdminServices from "@/pages/AdminServices.tsx";
import AdminPortfolio from "@/pages/AdminPortfolio.tsx";
import AdminMessages from "@/pages/AdminMessages.tsx";
import AdminSiteSettings from "@/pages/AdminSiteSettings.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import TermsOfService from "@/pages/TermsOfService.tsx";
import CookiePolicy from "@/pages/CookiePolicy.tsx";
import NotFound from "@/pages/not-found.tsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/aj-admin/login" component={AdminLogin} />
      <Route path="/aj-admin" component={AdminDashboard} />
      <Route path="/aj-admin/orders" component={AdminOrders} />
      <Route path="/aj-admin/services" component={AdminServices} />
      <Route path="/aj-admin/portfolio" component={AdminPortfolio} />
      <Route path="/aj-admin/messages" component={AdminMessages} />
      <Route path="/aj-admin/site-settings" component={AdminSiteSettings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  function ScrollToTopOnRouteChange() {
    const [location] = useLocation();
    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTopOnRouteChange />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
