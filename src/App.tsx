import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import Upload from "./pages/Upload";
import StoryView from "./pages/StoryView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/chat/:matchId" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/story/:storyId" element={<StoryView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
