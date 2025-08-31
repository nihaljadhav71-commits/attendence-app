import { useState } from 'react';
import Head from 'next/head';
import { DashboardLayout } from './dashboard'; // Reusing the layout from dashboard

// Dummy student data
const dummyStudents = [
  { id: 1, name: 'John Doe', studentId: 'STU001', email: 'john.doe@school.edu' },
  { id: 2, name: 'Jane Smith', studentId: 'STU002', email: 'jane.smith@school.edu' },
  { id: 3, name: 'Robert Johnson', studentId: 'STU003', email: 'robert.johnson@school.edu' },
  { id: 4, name: 'Emily Davis', studentId: 'STU004', email: 'emily.davis@school.edu' },
  { id: 5, name: 'Michael Wilson', studentId: 'STU005', email: 'michael.wilson@school.edu' },
  { id: 6, name: 'Sarah Brown', studentId: 'STU006', email: 'sarah.brown@school.edu' },
  { id: 7, name: 'David Miller', studentId: 'STU007', email: 'david.miller@school.edu' },
  { id: 8, name: 'Lisa Taylor', studentId: 'STU008', email: 'lisa.taylor@school.edu' },
  { id: 9, name: 'James Anderson', studentId: 'STU009', email: 'james.anderson@school.edu' },
  { id: 10, name: 'Jennifer Thomas', studentId: 'STU010', email: 'jennifer.thomas@school.edu' }
];

// Dummy class data
const dummyClasses = [
  { id: 1, name: 'Mathematics 101', teacher: 'Mr. Johnson' },
  { id: 2, name: 'Science 201', teacher: 'Dr. Smith' },
  { id: 3, name: 'History 301', teacher: 'Ms. Williams' },
  { id: 4, name: 'English 101', teacher: 'Mrs. Davis' }
];

export default function AttendancePage() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState(dummyClasses[0].id);
  const [students, setStudents] = useState(dummyStudents.map(student => ({ ...student, present: false })));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userRole, setUserRole] = useState('Teacher'); // Default role, can be changed

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Reset attendance status when date changes
    setStudents(students.map(student => ({ ...student, present: false })));
    setSaveSuccess(false);
  };

  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(parseInt(e.target.value));
    // Reset attendance status when class changes
    setStudents(students.map(student => ({ ...student, present: false })));
    setSaveSuccess(false);
  };

  // Toggle individual student attendance
  const toggleAttendance = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, present: !student.present } : student
    ));
    setSaveSuccess(false);
  };

  // Mark all students as present
  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, present: true })));
    setSaveSuccess(false);
  };

  // Save attendance
  const saveAttendance = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving attendance:', {
        date: selectedDate,
        classId: selectedClass,
        attendance: students.map(({ id, name, present }) => ({ id, name, present }))
      });
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Get selected class name
  const getSelectedClassName = () => {
    const classObj = dummyClasses.find(cls => cls.id === selectedClass);
    return classObj ? classObj.name : '';
  };

  // Count present students
  const presentCount = students.filter(student => student.present).length;
  const totalCount = students.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <DashboardLayout userRole={userRole}>
      <Head>
        <title>Attendance | Attendify</title>
        <meta name="description" content="Take and manage class attendance" />
      </Head>

      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Record and manage student attendance for your classes
          </p>
        </div>

        {/* Role selector (for demo purposes) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Current Role: {userRole}</h2>
              <p className="text-sm text-gray-500">Switch role to see different attendance views</p>
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

        {/* Filters and actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {dummyClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={markAllPresent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mark All Present
              </button>
              
              <button
                onClick={saveAttendance}
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  isSaving ? 'bg-indigo-400' : 'bg-green-600 hover:bg-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Attendance'
                )}
              </button>
            </div>
          </div>
          
          {saveSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Attendance saved successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attendance summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {getSelectedClassName()} - {new Date(selectedDate).toLocaleDateString()}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {presentCount} of {totalCount} students present ({attendancePercentage}%)
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex rounded-md shadow-sm">
                <div className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Present: {presentCount}
                </div>
                <div className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Absent: {totalCount - presentCount}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Attendance table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
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
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={student.present}
                          onChange={() => toggleAttendance(student.id)}
                          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-gray-700">
                          {student.present ? 'Present' : 'Absent'}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role-based information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Role Information</h3>
          <div className="prose prose-indigo">
            {userRole === 'Admin' && (
              <p>
                As an administrator, you can view and manage attendance for all classes. 
                You can also generate reports and analyze attendance trends across the institution.
              </p>
            )}
            {userRole === 'Teacher' && (
              <p>
                As a teacher, you can take attendance for your assigned classes. 
                The attendance records will be automatically saved and made available to students and administrators.
              </p>
            )}
            {userRole === 'Student' && (
              <p>
                As a student, you can view your own attendance records for each class. 
                You cannot modify attendance records - only teachers and administrators can do that.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}