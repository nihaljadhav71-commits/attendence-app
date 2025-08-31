import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy user data for role-based rendering
const dummyUser = {
  name: 'John Doe',
  role: 'Admin', // Can be 'Admin', 'Teacher', or 'Student'
  email: 'john.doe@school.edu',
  institution: 'Springfield High School'
};

// Dummy data for summary cards based on role
const getSummaryData = (role) => {
  const baseData = {
    attendanceRate: 87,
    classesToday: 4,
    weeklyTrend: '+2.3%'
  };

  switch (role) {
    case 'Admin':
      return {
        ...baseData,
        totalStudents: 1248,
        totalTeachers: 76,
        pendingReports: 12
      };
    case 'Teacher':
      return {
        ...baseData,
        myClasses: 5,
        studentsToday: 142,
        pendingReports: 3
      };
    case 'Student':
      return {
        ...baseData,
        myAttendance: 92,
        missedClasses: 2,
        gpa: 3.7
      };
    default:
      return baseData;
  }
};

// Dummy data for attendance chart
const attendanceData = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 88, absent: 12 },
  { day: 'Wed', present: 82, absent: 18 },
  { day: 'Thu', present: 90, absent: 10 },
  { day: 'Fri', present: 87, absent: 13 },
  { day: 'Sat', present: 70, absent: 30 },
  { day: 'Sun', present: 0, absent: 0 }
];

// Dashboard Layout Component
const DashboardLayout = ({ children, userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊', current: true },
    { name: 'Classes', href: '/classes', icon: '👥' },
    { name: 'Attendance', href: '/attendance', icon: '📋' },
    { name: 'Reports', href: '/reports', icon: '📈' },
    { name: 'Calendar', href: '/calendar', icon: '📅' },
    { name: 'Settings', href: '/settings', icon: '⚙️' }
  ];

  // Role-specific navigation items
  const roleNavigation = {
    Admin: [
      { name: 'Users', href: '/users', icon: '👤' },
      { name: 'Institutions', href: '/institutions', icon: '🏫' }
    ],
    Teacher: [
      { name: 'My Classes', href: '/my-classes', icon: '📚' },
      { name: 'Gradebook', href: '/gradebook', icon: '📝' }
    ],
    Student: [
      { name: 'My Schedule', href: '/my-schedule', icon: '🗓️' },
      { name: 'Grades', href: '/grades', icon: '🎓' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-white">Attendify</span>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center px-4 py-3 border-b">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-800 font-bold">{userRole.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{dummyUser.name}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
          
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  item.current
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            
            {/* Role-specific navigation */}
            {roleNavigation[userRole]?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  
                  <div className="relative">
                    <button className="flex items-center text-sm rounded-full focus:outline-none">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-800 font-bold">{userRole.charAt(0)}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
            <span className="text-indigo-600 text-xl">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${trendValue.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    <svg className="self-center flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">{trendValue.startsWith('+') ? 'Increased' : 'Decreased'} by</span>
                    {trendValue}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page Component
export default function Dashboard() {
  const [userRole, setUserRole] = useState(dummyUser.role);
  const summaryData = getSummaryData(userRole);

  // Role-specific summary cards
  const getSummaryCards = () => {
    switch (userRole) {
      case 'Admin':
        return (
          <>
            <SummaryCard title="Total Students" value={summaryData.totalStudents} icon="👨‍🎓" trend={true} trendValue="+5.2%" />
            <SummaryCard title="Total Teachers" value={summaryData.totalTeachers} icon="👩‍🏫" trend={true} trendValue="+1.3%" />
            <SummaryCard title="Attendance Rate" value={`${summaryData.attendanceRate}%`} icon="📊" trend={true} trendValue={summaryData.weeklyTrend} />
            <SummaryCard title="Pending Reports" value={summaryData.pendingReports} icon="📋" />
          </>
        );
      case 'Teacher':
        return (
          <>
            <SummaryCard title="My Classes" value={summaryData.myClasses} icon="📚" />
            <SummaryCard title="Students Today" value={summaryData.studentsToday} icon="👥" trend={true} trendValue="+3.1%" />
            <SummaryCard title="Attendance Rate" value={`${summaryData.attendanceRate}%`} icon="📊" trend={true} trendValue={summaryData.weeklyTrend} />
            <SummaryCard title="Pending Reports" value={summaryData.pendingReports} icon="📋" />
          </>
        );
      case 'Student':
        return (
          <>
            <SummaryCard title="My Attendance" value={`${summaryData.myAttendance}%`} icon="📊" trend={true} trendValue={summaryData.weeklyTrend} />
            <SummaryCard title="Classes Today" value={summaryData.classesToday} icon="📅" />
            <SummaryCard title="Missed Classes" value={summaryData.missedClasses} icon="❌" trend={true} trendValue="-1.2%" />
            <SummaryCard title="GPA" value={summaryData.gpa.toFixed(1)} icon="🎓" trend={true} trendValue="+0.2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole={userRole}>
      <Head>
        <title>Dashboard | Attendify</title>
        <meta name="description" content="Attendance management dashboard" />
      </Head>

      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {dummyUser.name}. Here's what's happening today.
          </p>
        </div>

        {/* Role selector (for demo purposes) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Current Role: {userRole}</h2>
              <p className="text-sm text-gray-500">Switch role to see different dashboard views</p>
            </div>
            <div className="flex space-x-2">
              {['Admin', 'Teacher', 'Student'].map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    userRole === role
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {getSummaryCards()}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Attendance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={attendanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#4f46e5" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {[
                  { id: 1, action: 'Attendance recorded', time: '10 mins ago', user: 'Mr. Johnson' },
                  { id: 2, action: 'New student added', time: '1 hour ago', user: 'Admin' },
                  { id: 3, action: 'Report generated', time: '3 hours ago', user: 'You' },
                  { id: 4, action: 'Class schedule updated', time: 'Yesterday', user: 'Ms. Williams' },
                ].map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== 3 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-indigo-600 text-sm font-bold">A</span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">by {activity.user}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <span className="text-2xl mb-2">📋</span>
              <span className="text-sm font-medium text-indigo-700">Take Attendance</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-green-700">Generate Report</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-2xl mb-2">👥</span>
              <span className="text-sm font-medium text-blue-700">Manage Classes</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="text-2xl mb-2">📅</span>
              <span className="text-sm font-medium text-purple-700">View Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}