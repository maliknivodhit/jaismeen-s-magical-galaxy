import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LockedIntro from "@/components/LockedIntro";

const queryClient = new QueryClient();

const App = () => {
  const [locked, setLocked] = useState(() => {
    // Check localStorage for unlock
    return localStorage.getItem('jaismeen_unlocked') !== 'true';
  });
  const handleUnlock = useCallback(() => setLocked(false), []);

  return (
    <div className="relative">
      {locked && (
        <div className="fixed inset-0 z-50">
          <LockedIntro onUnlock={handleUnlock} />
        </div>
      )}
      <div className={locked ? 'filter blur-lg pointer-events-none select-none' : ''}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default App;
