import { useState } from 'react';
import Head from 'next/head';
import { DashboardLayout } from './dashboard'; // Reusing the layout from dashboard
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy data for attendance trends
const attendanceTrendData = [
  { month: 'Jan', attendance: 85, target: 90 },
  { month: 'Feb', attendance: 88, target: 90 },
  { month: 'Mar', attendance: 82, target: 90 },
  { month: 'Apr', attendance: 90, target: 90 },
  { month: 'May', attendance: 87, target: 90 },
  { month: 'Jun', attendance: 92, target: 90 },
  { month: 'Jul', attendance: 89, target: 90 },
  { month: 'Aug', attendance: 91, target: 90 },
  { month: 'Sep', attendance: 86, target: 90 },
  { month: 'Oct', attendance: 88, target: 90 },
  { month: 'Nov', attendance: 90, target: 90 },
  { month: 'Dec', attendance: 93, target: 90 }
];

// Dummy data for class-wise attendance
const classAttendanceData = [
  { name: 'Mathematics', attendance: 92, students: 32 },
  { name: 'Science', attendance: 88, students: 28 },
  { name: 'History', attendance: 85, students: 30 },
  { name: 'English', attendance: 90, students: 35 },
  { name: 'Geography', attendance: 87, students: 25 }
];

// Dummy data for attendance distribution
const attendanceDistributionData = [
  { name: 'Present', value: 85 },
  { name: 'Absent', value: 10 },
  { name: 'Late', value: 5 }
];

// Colors for charts
const COLORS = ['#4f46e5', '#ef4444', '#f59e0b'];

// Dummy data for student attendance records
const studentAttendanceData = [
  { id: 1, name: 'John Doe', present: 28, absent: 2, late: 1, percentage: 90 },
  { id: 2, name: 'Jane Smith', present: 29, absent: 1, late: 0, percentage: 97 },
  { id: 3, name: 'Robert Johnson', present: 25, absent: 4, late: 2, percentage: 83 },
  { id: 4, name: 'Emily Davis', present: 30, absent: 0, late: 1, percentage: 100 },
  { id: 5, name: 'Michael Wilson', present: 27, absent: 2, late: 2, percentage: 90 },
  { id: 6, name: 'Sarah Brown', present: 26, absent: 3, late: 2, percentage: 87 },
  { id: 7, name: 'David Miller', present: 28, absent: 1, late: 2, percentage: 93 },
  { id: 8, name: 'Lisa Taylor', present: 29, absent: 0, late: 2, percentage: 97 },
  { id: 9, name: 'James Anderson', present: 24, absent: 5, late: 2, percentage: 80 },
  { id: 10, name: 'Jennifer Thomas', present: 27, absent: 2, late: 2, percentage: 90 }
];

export default function ReportsPage() {
  const [userRole, setUserRole] = useState('Admin'); // Default role
  const [timeRange, setTimeRange] = useState('monthly'); // weekly, monthly, yearly
  const [selectedClass, setSelectedClass] = useState('all'); // all, specific class

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Handle class change
  const handleClassChange = (classId) => {
    setSelectedClass(classId);
  };

  // Get chart title based on time range
  const getChartTitle = () => {
    switch (timeRange) {
      case 'weekly':
        return 'Weekly Attendance Trends';
      case 'monthly':
        return 'Monthly Attendance Trends';
      case 'yearly':
        return 'Yearly Attendance Trends';
      default:
        return 'Attendance Trends';
    }
  };

  // Get role-specific description
  const getRoleDescription = () => {
    switch (userRole) {
      case 'Admin':
        return 'Comprehensive attendance reports across all classes and time periods';
      case 'Teacher':
        return 'Attendance reports for your classes and students';
      case 'Student':
        return 'Your personal attendance history and statistics';
      default:
        return 'Attendance reports and analytics';
    }
  };

  return (
    <DashboardLayout userRole={userRole}>
      <Head>
        <title>Reports | Attendify</title>
        <meta name="description" content="Attendance reports and analytics" />
      </Head>

      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            {getRoleDescription()}
          </p>
        </div>

        {/* Role selector (for demo purposes) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Current Role: {userRole}</h2>
              <p className="text-sm text-gray-500">Switch role to see different report views</p>
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

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
              <p className="text-sm text-gray-500">Customize your report view</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <div className="inline-flex rounded-md shadow-sm">
                  {['weekly', 'monthly', 'yearly'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => handleTimeRangeChange(range)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        timeRange === range
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      } ${
                        range === 'weekly' ? 'rounded-l-md' : ''
                      } ${
                        range === 'yearly' ? 'rounded-r-md' : ''
                      } border border-gray-300`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {userRole !== 'Student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Classes</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="english">English</option>
                  </select>
                </div>
              )}
              
              <div className="flex items-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <span className="text-indigo-600 text-xl">📊</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Overall Attendance</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">89%</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg className="self-center flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Increased by</span>
                        3.2%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Present</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">85%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <span className="text-red-600 text-xl">❌</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Absent</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">10%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <span className="text-yellow-600 text-xl">⏱️</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Late</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">5%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance trend chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{getChartTitle()}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={attendanceTrendData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#4f46e5" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class attendance chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Class-wise Attendance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classAttendanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance distribution chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Attendance Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student attendance table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Student Attendance Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Late
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance %
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentAttendanceData.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-bold">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.present}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.absent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.late}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.percentage >= 90 ? 'bg-green-100 text-green-800' : 
                          student.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export options */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Export Options</h2>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export as PDF
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export as Excel
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}