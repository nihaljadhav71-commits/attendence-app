// src/components/Table.jsx
import React from 'react';

// Dummy attendance data (will be replaced with API data later)
const dummyAttendanceData = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    date: '2023-10-15',
    timeIn: '08:45 AM',
    timeOut: '03:30 PM',
    status: 'Present',
    teacher: 'Mr. Smith',
    class: 'Math 101'
  },
  {
    id: 2,
    studentName: 'Bob Williams',
    date: '2023-10-15',
    timeIn: '09:15 AM',
    timeOut: '03:45 PM',
    status: 'Late',
    teacher: 'Ms. Davis',
    class: 'History 201'
  },
  {
    id: 3,
    studentName: 'Charlie Brown',
    date: '2023-10-15',
    timeIn: null,
    timeOut: null,
    status: 'Absent',
    teacher: 'Mr. Smith',
    class: 'Math 101'
  },
  {
    id: 4,
    studentName: 'Diana Miller',
    date: '2023-10-15',
    timeIn: '08:30 AM',
    timeOut: '04:00 PM',
    status: 'Present',
    teacher: 'Dr. Wilson',
    class: 'Science 301'
  },
  {
    id: 5,
    studentName: 'Ethan Davis',
    date: '2023-10-15',
    timeIn: '08:50 AM',
    timeOut: '03:20 PM',
    status: 'Present',
    teacher: 'Ms. Davis',
    class: 'History 201'
  }
];

// Status badge component for consistent styling
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Present: 'bg-green-100 text-green-800',
    Absent: 'bg-red-100 text-red-800',
    Late: 'bg-yellow-100 text-yellow-800',
    'Early Leave': 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// Reusable Table Component
const Table = ({ columns, data, userRole = 'admin' }) => {
  // Filter columns based on user role if needed
  const filteredColumns = columns.filter(column => 
    !column.roles || column.roles.includes(userRole)
  );

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {filteredColumns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {filteredColumns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    <div className="text-sm text-gray-900">
                      {row[column.key] || '-'}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage with different column configurations based on role
const AttendanceTable = ({ userRole = 'admin' }) => {
  // Column definitions for different roles
  const adminColumns = [
    { key: 'id', label: 'ID' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'date', label: 'Date' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    { key: 'teacher', label: 'Teacher' },
    { key: 'class', label: 'Class' }
  ];

  const teacherColumns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'date', label: 'Date' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    { key: 'class', label: 'Class' }
  ];

  const studentColumns = [
    { key: 'date', label: 'Date' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    }
  ];

  // Select columns based on user role
  let columns;
  switch (userRole) {
    case 'teacher':
      columns = teacherColumns;
      break;
    case 'student':
      columns = studentColumns;
      break;
    default:
      columns = adminColumns;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Attendance Records</h2>
        <div className="text-sm text-gray-500">
          Showing {dummyAttendanceData.length} records
        </div>
      </div>
      
      <Table 
        columns={columns} 
        data={dummyAttendanceData} 
        userRole={userRole}
      />
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Page 1 of 1
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;