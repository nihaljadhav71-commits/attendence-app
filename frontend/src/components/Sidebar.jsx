// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Dummy user data - will be replaced with actual auth context later
const dummyUser = {
  role: 'admin', // Can be 'admin', 'teacher', or 'student'
  name: 'John Doe',
  avatar: '/placeholder-avatar.png',
};

// Navigation links configuration
const navigationLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊', roles: ['admin', 'teacher', 'student'] },
  { name: 'Attendance', href: '/attendance', icon: '📋', roles: ['admin', 'teacher'] },
  { name: 'Reports', href: '/reports', icon: '📈', roles: ['admin', 'teacher'] },
  { name: 'Settings', href: '/settings', icon: '⚙️', roles: ['admin'] },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const router = useRouter();

  // Set active page based on current route
  useEffect(() => {
    setActivePage(router.pathname);
  }, [router.pathname]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filter navigation links based on user role
  const filteredLinks = navigationLinks.filter(link => 
    link.roles.includes(dummyUser.role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">AttendanceApp</h1>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* User profile section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">
                {dummyUser.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{dummyUser.name}</p>
              <p className="text-sm text-gray-500 capitalize">{dummyUser.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1">
          {filteredLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  activePage === link.href
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            </Link>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} AttendanceApp
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg lg:hidden"
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;