// src/components/Card.jsx
import React from 'react';

// Reusable Card Component
const Card = ({
  title,
  children,
  headerActions,
  className = '',
  roles = [],
  userRole = 'admin',
  padding = 'normal',
  ...props
}) => {
  // Role-based visibility check
  if (roles.length > 0 && !roles.includes(userRole)) {
    return null;
  }

  // Padding options
  const paddingClasses = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8',
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {/* Card Header */}
      {(title || headerActions) && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
          {headerActions && (
            <div className="flex space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      {/* Card Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

// Example usage with dummy data
const CardExamples = () => {
  // Dummy user role (would come from auth context in real app)
  const userRole = 'admin'; // Change to 'teacher' or 'student' to test role visibility
  
  // Dummy attendance statistics
  const attendanceStats = {
    present: 85,
    absent: 10,
    late: 5,
    totalStudents: 120,
  };
  
  // Dummy recent activities
  const recentActivities = [
    { id: 1, action: 'Marked attendance', user: 'Mr. Smith', time: '10:30 AM' },
    { id: 2, action: 'Generated report', user: 'Ms. Davis', time: '9:15 AM' },
    { id: 3, action: 'Added new student', user: 'Admin', time: 'Yesterday' },
  ];
  
  // Dummy upcoming classes
  const upcomingClasses = [
    { id: 1, name: 'Math 101', time: '10:00 AM - 11:30 AM', teacher: 'Mr. Smith' },
    { id: 2, name: 'History 201', time: '1:00 PM - 2:30 PM', teacher: 'Ms. Davis' },
    { id: 3, name: 'Science 301', time: '3:00 PM - 4:30 PM', teacher: 'Dr. Wilson' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Cards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Stats Card */}
        <Card 
          title="Attendance Overview" 
          roles={['admin', 'teacher']}
          userRole={userRole}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Present</span>
              <span className="font-medium">{attendanceStats.present}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${attendanceStats.present}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Absent</span>
              <span className="font-medium">{attendanceStats.absent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-600 h-2.5 rounded-full" 
                style={{ width: `${attendanceStats.absent}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Late</span>
              <span className="font-medium">{attendanceStats.late}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full" 
                style={{ width: `${attendanceStats.late}%` }}
              ></div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Students</span>
                <span className="font-medium">{attendanceStats.totalStudents}</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Recent Activities Card */}
        <Card 
          title="Recent Activities" 
          roles={['admin']}
          userRole={userRole}
        >
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span className="mx-2">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Upcoming Classes Card */}
        <Card 
          title="Upcoming Classes" 
          roles={['teacher', 'student']}
          userRole={userRole}
          headerActions={
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          }
        >
          <div className="space-y-4">
            {upcomingClasses.map(classItem => (
              <div key={classItem.id} className="border-l-4 border-indigo-500 pl-4 py-1">
                <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                <p className="text-sm text-gray-600">{classItem.time}</p>
                <p className="text-xs text-gray-500">{classItem.teacher}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Quick Actions Card */}
      <Card 
        title="Quick Actions" 
        roles={['admin', 'teacher']}
        userRole={userRole}
        padding="large"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
              <span className="text-indigo-600 text-xl">📋</span>
            </div>
            <span className="font-medium text-gray-800">Mark Attendance</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <span className="text-green-600 text-xl">📊</span>
            </div>
            <span className="font-medium text-gray-800">Generate Report</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <span className="font-medium text-gray-800">Manage Students</span>
          </button>
        </div>
      </Card>
      
      {/* Role Visibility Info */}
      <Card className="bg-blue-50 border border-blue-200">
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-2">Role Visibility Demo</p>
          <p>Current user role: <span className="font-semibold capitalize">{userRole}</span></p>
          <p className="mt-2">Cards are shown based on user role permissions. Change the userRole variable to see different views.</p>
        </div>
      </Card>
    </div>
  );
};

export default Card;
export { CardExamples };