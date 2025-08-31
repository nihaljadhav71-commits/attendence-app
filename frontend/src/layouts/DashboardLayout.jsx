// src/layouts/DashboardLayout.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Icon components (using Heroicons SVG paths)
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const StudentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const TeachersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
  </svg>
);

const ClassesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
);

const AttendanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const ReportsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);

// Role-based menu items
const menuItems = {
  admin: [
    { name: 'Dashboard', href: '/admin', icon: <DashboardIcon /> },
    { name: 'Students', href: '/admin/students', icon: <StudentsIcon /> },
    { name: 'Teachers', href: '/admin/teachers', icon: <TeachersIcon /> },
    { name: 'Classes', href: '/admin/classes', icon: <ClassesIcon /> },
    { name: 'Attendance', href: '/admin/attendance', icon: <AttendanceIcon /> },
    { name: 'Reports', href: '/admin/reports', icon: <ReportsIcon /> },
    { name: 'Settings', href: '/admin/settings', icon: <SettingsIcon /> },
  ],
  teacher: [
    { name: 'Dashboard', href: '/teacher', icon: <DashboardIcon /> },
    { name: 'My Classes', href: '/teacher/classes', icon: <ClassesIcon /> },
    { name: 'Take Attendance', href: '/teacher/attendance', icon: <AttendanceIcon /> },
    { name: 'Attendance History', href: '/teacher/history', icon: <ReportsIcon /> },
    { name: 'Reports', href: '/teacher/reports', icon: <ReportsIcon /> },
  ],
  student: [
    { name: 'Dashboard', href: '/student', icon: <DashboardIcon /> },
    { name: 'My Attendance', href: '/student/attendance', icon: <AttendanceIcon /> },
    { name: 'Schedule', href: '/student/schedule', icon: <ClassesIcon /> },
    { name: 'Leave Requests', href: '/student/leave', icon: <ReportsIcon /> },
  ],
};

// Dummy user data
const dummyUsers = {
  admin: { name: 'Admin User', role: 'Administrator', avatar: 'A' },
  teacher: { name: 'Jane Smith', role: 'Math Teacher', avatar: 'JS' },
  student: { name: 'John Doe', role: 'Student', avatar: 'JD' },
};

const DashboardLayout = ({ children, role = 'student' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, this would be an API call
    setUserData(dummyUsers[role]);
  }, [role]);

  // Close sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => setSidebarOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Hidden on mobile by default */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Attendance App</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul>
              {menuItems[role].map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a 
                      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                        router.pathname === item.href 
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Link href="/logout">
              <a className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <span className="mr-3 text-gray-500"><LogoutIcon /></span>
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile menu button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page Title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">{role} Dashboard</h2>
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              {userData ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-800">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {userData.avatar}
                  </div>
                </div>
              ) : (
                <div className="animate-pulse flex space-x-2">
                  <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                  <div className="hidden md:flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;