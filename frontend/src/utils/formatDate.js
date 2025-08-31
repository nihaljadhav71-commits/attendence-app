// src/utils/formatDate.js

/**
 * Date formatting utility for the Attendance App
 * Provides consistent date formatting across attendance and reports pages
 */

// Format configuration for different roles
const roleFormats = {
  admin: {
    date: 'DD-MM-YYYY',
    time: 'HH:mm',
    full: 'DD-MM-YYYY HH:mm',
    relative: true // Show relative dates for admin
  },
  teacher: {
    date: 'DD-MM-YYYY',
    time: 'HH:mm',
    full: 'DD-MM-YYYY HH:mm',
    relative: false
  },
  student: {
    date: 'DD-MM-YYYY',
    time: 'hh:mm A',
    full: 'DD-MM-YYYY hh:mm A',
    relative: true
  }
};

// Helper function to pad numbers with leading zeros
const padZero = (num) => num.toString().padStart(2, '0');

/**
 * Format date according to specified format and role
 * @param {Date|string|number} date - Date to format
 * @param {string} [format='date'] - Format type ('date', 'time', 'full')
 * @param {string} [role='student'] - User role ('admin', 'teacher', 'student')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'date', role = 'student') => {
  // Create date object if input isn't already one
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Validate date
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Get role-specific format configuration
  const roleConfig = roleFormats[role] || roleFormats.student;
  
  // Extract date components
  const day = padZero(dateObj.getDate());
  const month = padZero(dateObj.getMonth() + 1); // Months are 0-indexed
  const year = dateObj.getFullYear();
  
  // Extract time components
  const hours24 = dateObj.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = padZero(dateObj.getMinutes());
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  // Format based on requested type
  switch (format) {
    case 'date':
      return `${day}-${month}-${year}`;
    
    case 'time':
      if (roleConfig.time === 'HH:mm') {
        return `${padZero(hours24)}:${minutes}`;
      } else {
        return `${padZero(hours12)}:${minutes} ${ampm}`;
      }
    
    case 'full':
      if (roleConfig.full === 'DD-MM-YYYY HH:mm') {
        return `${day}-${month}-${year} ${padZero(hours24)}:${minutes}`;
      } else {
        return `${day}-${month}-${year} ${padZero(hours12)}:${minutes} ${ampm}`;
      }
    
    default:
      return `${day}-${month}-${year}`;
  }
};

/**
 * Get relative date string (Today, Yesterday, etc.)
 * @param {Date|string|number} date - Date to format
 * @param {string} [role='student'] - User role
 * @returns {string} Relative date or formatted date
 */
export const getRelativeDate = (date, role = 'student') => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if role supports relative dates
  if (!roleFormats[role]?.relative) {
    return formatDate(date, 'date', role);
  }
  
  // Reset time parts for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  const compareDate = new Date(dateObj);
  compareDate.setHours(0, 0, 0, 0);
  
  // Return relative date if applicable
  if (compareDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  
  // Otherwise return formatted date
  return formatDate(date, 'date', role);
};

/**
 * Format date range for attendance reports
 * @param {Date|string|number} startDate - Start date
 * @param {Date|string|number} endDate - End date
 * @param {string} [role='admin'] - User role
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, role = 'admin') => {
  const start = formatDate(startDate, 'date', role);
  const end = formatDate(endDate, 'date', role);
  
  return `${start} to ${end}`;
};

// Dummy data for demonstration
export const dummyAttendanceData = [
  {
    id: 1,
    studentId: "STU001",
    studentName: "John Doe",
    date: new Date(),
    timeIn: "08:45",
    timeOut: "15:30",
    status: "Present",
    role: "student"
  },
  {
    id: 2,
    studentId: "STU002",
    studentName: "Jane Smith",
    date: new Date(Date.now() - 86400000), // Yesterday
    timeIn: "09:15",
    timeOut: "15:45",
    status: "Late",
    role: "student"
  },
  {
    id: 3,
    teacherId: "TCH001",
    teacherName: "Mr. Johnson",
    date: new Date(Date.now() - 172800000), // 2 days ago
    class: "Mathematics",
    startTime: "10:00",
    endTime: "11:30",
    status: "Conducted",
    role: "teacher"
  }
];

// Example usage for different roles
export const roleExamples = {
  admin: {
    date: new Date(),
    formatted: formatDate(new Date(), 'full', 'admin'),
    relative: getRelativeDate(new Date(), 'admin')
  },
  teacher: {
    date: new Date(),
    formatted: formatDate(new Date(), 'full', 'teacher'),
    relative: getRelativeDate(new Date(), 'teacher')
  },
  student: {
    date: new Date(),
    formatted: formatDate(new Date(), 'full', 'student'),
    relative: getRelativeDate(new Date(), 'student')
  }
};