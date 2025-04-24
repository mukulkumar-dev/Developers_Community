
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/projects/CreateProject";
import Blogs from "./pages/blogs/Blogs";
import CreateBlog from "./pages/blogs/CreateBlog";
import Questions from "./pages/questions/Questions";
import CreateQuestion from "./pages/questions/CreateQuestion";
import QuestionDetail from "./pages/questions/QuestionDetail";
import Events from "./pages/events/Events";
import CreateEvent from "./pages/events/CreateEvent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./pages/user/UserProfile";
import ProjectDetail from "./pages/projects/ProjectDetail";
import BlogDetail from "./pages/blogs/BlogDetail";
import EventDetail from "./pages/events/EventDetail";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
            <Route path="/blogs/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="/blogs/:id" element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
            <Route path="/questions/create" element={<ProtectedRoute><CreateQuestion /></ProtectedRoute>} />
            <Route path="/questions/:id" element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
            <Route path="/events/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            
            {/* Public Routes */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/events" element={<Events />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
