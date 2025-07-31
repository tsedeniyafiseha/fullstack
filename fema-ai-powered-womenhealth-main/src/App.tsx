import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import BreastCancerScreening from "./pages/BreastCancerScreening";
import PCOSScreening from "./pages/PCOSScreening";
import EndometriosisScreening from "./pages/EndometriosisScreening";
import CervicalCancerScreening from "./pages/CervicalCancerScreening";
import ScreeningResults from "./pages/ScreeningResults";
import DoctorsPage from "./pages/DoctorsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/screening/breast-cancer" element={<BreastCancerScreening />} />
          <Route path="/screening/pcos" element={<PCOSScreening />} />
          <Route path="/screening/endometriosis" element={<EndometriosisScreening />} />
          <Route path="/screening/cervical-cancer" element={<CervicalCancerScreening />} />
          <Route path="/screening-results" element={<ScreeningResults />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
