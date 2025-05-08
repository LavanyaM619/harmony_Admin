import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the Navbar
import Navbar from "@/components/Navbar";

// Import the pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import BranchDetails from "./pages/BranchDetails";
import Admin from "./pages/Admin";
import Admincontactus from "./pages/admincontactus";
import Adminbranch from "./pages/adminbranch";
import Adminevent from "./pages/adminevent";
import Branchadd from "./pages/branchadd";
import Eventadd from "./pages/eventadd";
import AdminLogin from "./pages/AdminLogin";
import AdminRoot from './pages/AdminRoot';
import RootAdd from './pages/RootAdd';
import AdminSettings from './pages/AdminSettings';

import NotFound from "./pages/NotFound";
import Logout from "./pages/logout";  // Match case exactly
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute component
import PublicRoute from "./components/PublicRoute";
import AdminRegister from "./pages/AdminRegister";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/index" element={<><Navbar /><Index /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /></>} />
          <Route path="/branches/:location" element={<><Navbar /><BranchDetails /></>} />
          <Route path="/" element={<PublicRoute element={<AdminLogin />} />} />
          {/* Protected Admin Routes */}
          <Route path="/Admin/Admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/Admin/admincontactus" element={<ProtectedRoute element={<Admincontactus />} />} />
          <Route path="/Admin/adminbranch" element={<ProtectedRoute element={<Adminbranch />} />} />
          <Route path="/Admin/adminevent" element={<ProtectedRoute element={<Adminevent />} />} />
          <Route path="/Admin/branchadd" element={<ProtectedRoute element={<Branchadd />} />} />
          <Route path="/Admin/AdminRoot" element={<ProtectedRoute element={<AdminRoot/>} />} />
          <Route path="/Admin/RootAdd" element={<ProtectedRoute element={<RootAdd/>} />} />
          <Route path="/Admin/eventadd" element={<ProtectedRoute element={<Eventadd />} />} />
          <Route path="/Admin/adminsettings" element={<ProtectedRoute element={<AdminSettings />} />} />
          <Route path="/Admin/Logout" element={<Logout />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


