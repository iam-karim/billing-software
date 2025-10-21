import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SuperAdminRoute } from "./components/SuperAdminRoute";
import Layout from "./components/Layout";
import SuperAdminLayout from "./components/super-admin/SuperAdminLayout";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/403";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import SuperAdminUsers from "./pages/super-admin/Users";
import SuperAdminOrganizations from "./pages/super-admin/Organizations";
import SuperAdminPlans from "./pages/super-admin/Plans";
import SuperAdminAnalytics from "./pages/super-admin/Analytics";
import SuperAdminLogs from "./pages/super-admin/Logs";
import SuperAdminSettings from "./pages/super-admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LocaleProvider>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <Layout><Invoices /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <Layout><Clients /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Layout><Products /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Layout><Reports /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout><Settings /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              }
            />

            {/* Super Admin Routes */}
            <Route
              path="/super-admin"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/users"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminUsers /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/organizations"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminOrganizations /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/plans"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminPlans /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/analytics"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminAnalytics /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/logs"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminLogs /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />
            <Route
              path="/super-admin/settings"
              element={
                <SuperAdminRoute>
                  <SuperAdminLayout><SuperAdminSettings /></SuperAdminLayout>
                </SuperAdminRoute>
              }
            />

            {/* Access Denied */}
            <Route path="/403" element={<AccessDenied />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </LocaleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
