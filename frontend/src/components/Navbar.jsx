// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Icon components
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
  </svg>
);

const CogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);

// Dummy user data for different roles
const dummyUsers = {
  admin: {
    name: 'Admin User',
    email: 'admin@attendanceapp.com',
    role: 'Administrator',
    avatar: 'A',
    initials: 'AU'
  },
  teacher: {
    name: 'Jane Smith',
    email: 'jane.smith@school.edu',
    role: 'Math Teacher',
    avatar: 'JS',
    initials: 'JS'
  },
  student: {
    name: 'John Doe',
    email: 'john.doe@school.edu',
    role: 'Student',
    avatar: 'JD',
    initials: 'JD'
  }
};

const Navbar = ({ role = 'student' }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Initialize user data
  useEffect(() => {
    // In a real app, this would come from authentication context
    setUserData(dummyUsers[role]);
  }, [role]);

  // Initialize dark mode based on system preference or saved setting
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // In a real app, this would call logout API
    router.push('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and App Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                AttendanceApp
              </span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href={`/${role}`}>
                <a className="border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white">
                  Dashboard
                </a>
              </Link>
              {role === 'admin' && (
                <>
                  <Link href="/admin/students">
                    <a className="border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Students
                    </a>
                  </Link>
                  <Link href="/admin/teachers">
                    <a className="border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Teachers
                    </a>
                  </Link>
                </>
              )}
              {role === 'teacher' && (
                <Link href="/teacher/classes">
                  <a className="border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    My Classes
                  </a>
                </Link>
              )}
              {role === 'student' && (
                <Link href="/student/attendance">
                  <a className="border-transparent hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    My Attendance
                  </a>
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Dark mode toggle and User dropdown */}
          <div className="flex items-center">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* User dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {userData ? (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {userData.initials}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
                  )}
                </button>
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {userData && (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">{userData.role}</p>
                      </div>
                      <Link href={`/${role}/profile`}>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <div className="flex items-center">
                            <UserCircleIcon className="mr-3" />
                            Your Profile
                          </div>
                        </a>
                      </Link>
                      <Link href={`/${role}/settings`}>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <div className="flex items-center">
                            <CogIcon className="mr-3" />
                            Settings
                          </div>
                        </a>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <LogoutIcon className="mr-3" />
                          Sign out
                        </div>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link href={`/${role}`}>
            <a className="bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 text-blue-700 dark:text-white block pl-3 pr-4 py-2 text-base font-medium">
              Dashboard
            </a>
          </Link>
          {role === 'admin' && (
            <>
              <Link href="/admin/students">
                <a className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Students
                </a>
              </Link>
              <Link href="/admin/teachers">
                <a className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Teachers
                </a>
              </Link>
            </>
          )}
          {role === 'teacher' && (
            <Link href="/teacher/classes">
              <a className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                My Classes
              </a>
            </Link>
          )}
          {role === 'student' && (
            <Link href="/student/attendance">
              <a className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                My Attendance
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;