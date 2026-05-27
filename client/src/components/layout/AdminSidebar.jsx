import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  LayoutDashboard,
  Users,
  Package,
  HandCoins,
  BarChart3,
  Settings,
  UserCog,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Beneficiaries', path: '/admin/beneficiaries' },
  { icon: Package, label: 'Programs', path: '/admin/programs' },
  { icon: HandCoins, label: 'Donations', path: '/admin/donations' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: UserCog, label: 'Staff Management', path: '/admin/staff' },
  { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
];

const AdminSidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const { logout } = useAuth();

  const sidebarContent = (
    <div className={`h-full flex flex-col bg-primary-900 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-primary-800 shrink-0">
        <Sprout className="w-7 h-7 text-white shrink-0" strokeWidth={2} />
        {!collapsed && (
          <div className="min-w-0">
            <span className="font-display text-lg font-bold text-white block leading-tight tracking-tight">
              WelfareOrg
            </span>
            <span className="text-primary-200 text-[10px] uppercase tracking-wider font-medium">
              Admin
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border-l-[3px] ${
                  isActive
                    ? 'bg-primary-800 text-white border-l-primary-400'
                    : 'text-primary-200 hover:bg-primary-800 hover:text-white border-l-transparent'
                } ${collapsed ? 'justify-center px-0 mx-2 rounded-lg border-l-0' : ''}`
              }
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className={`border-t border-primary-800 py-3 space-y-1 ${collapsed ? 'px-2' : 'px-4'}`}>
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary-200 hover:bg-primary-800 hover:text-white transition-all duration-200 rounded-lg ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <ExternalLink size={20} className="shrink-0" />
          {!collapsed && <span>View Website</span>}
        </Link>
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-600/10 transition-all duration-200 rounded-lg w-full ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex items-center justify-center h-10 border-t border-primary-800 text-primary-200 hover:text-white hover:bg-primary-800 transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative h-full"
          >
            {sidebarContent}
          </motion.aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
