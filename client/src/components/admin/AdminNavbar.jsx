import { HiMenu } from 'react-icons/hi';

const AdminNavbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={onMenuClick}>
        <HiMenu size={24} />
      </button>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Welcome, Admin</span>
        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
