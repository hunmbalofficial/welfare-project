import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiFolder, HiHeart, HiPhotograph, HiNewspaper, HiMail, HiCog, HiLogout } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: HiHome },
    { name: 'Projects', path: '/admin/projects', icon: HiFolder },
    { name: 'Donations', path: '/admin/donations', icon: HiHeart },
    { name: 'Gallery', path: '/admin/gallery', icon: HiPhotograph },
    { name: 'News', path: '/admin/news', icon: HiNewspaper },
    { name: 'Messages', path: '/admin/messages', icon: HiMail },
    { name: 'Settings', path: '/admin/settings', icon: HiCog },
  ];

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary-400">Hope</span>
          <span className="text-xl font-bold text-secondary-400">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all mb-2"
        >
          <HiHome size={20} />
          <span>View Website</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600/10 transition-all w-full"
        >
          <HiLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
