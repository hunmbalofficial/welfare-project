import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import useAuth from '../hooks/useAuth';
import { getPublicSetting } from '../services/settingsService';
import MaintenancePage from '../pages/public/MaintenancePage';
import Loader from '../components/ui/Loader';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Projects from '../pages/public/Projects';
import ProjectDetail from '../pages/public/ProjectDetail';
import Donate from '../pages/public/Donate';
import Contact from '../pages/public/Contact';
import NotFound from '../pages/public/NotFound';

import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import BeneficiariesPage from '../pages/admin/BeneficiariesPage';
import ManagePrograms from '../pages/admin/ManagePrograms';
import ManageDonations from '../pages/admin/ManageDonations';
import ManageNews from '../pages/admin/ManageNews';
import ManageMessages from '../pages/admin/ManageMessages';
import ReportsPage from '../pages/admin/ReportsPage';
import WebsiteSettingsPage from '../pages/admin/WebsiteSettingsPage';
import StaffManagementPage from '../pages/admin/StaffManagementPage';
import AnnouncementsPage from '../pages/admin/AnnouncementsPage';

const AppRoutes = () => {
  const { admin } = useAuth();
  const [maintenance, setMaintenance] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await getPublicSetting('underMaintenance');
        setMaintenance(res.data.value === true);
      } catch {
        setMaintenance(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-900">
        <Loader size="lg" />
      </div>
    );
  }

  const isAdminLogin = location.pathname === '/admin/login';

  if (maintenance && !admin && !isAdminLogin) {
    return <MaintenancePage />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="beneficiaries" element={<BeneficiariesPage />} />
        <Route path="programs" element={<ManagePrograms />} />
        <Route path="donations" element={<ManageDonations />} />
        <Route path="news" element={<ManageNews />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<WebsiteSettingsPage />} />
        <Route path="staff" element={<StaffManagementPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
