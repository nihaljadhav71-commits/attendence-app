// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create authentication context
const AuthContext = createContext();

// Dummy user data for different roles
const dummyUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@attendance.com",
    role: "Admin",
    avatar: "/avatars/admin.png",
    permissions: ["manage_users", "view_reports", "system_settings"]
  },
  {
    id: 2,
    name: "Teacher Smith",
    email: "teacher@attendance.com",
    role: "Teacher",
    avatar: "/avatars/teacher.png",
    permissions: ["take_attendance", "view_class_reports"]
  },
  {
    id: 3,
    name: "Student Johnson",
    email: "student@attendance.com",
    role: "Student",
    avatar: "/avatars/student.png",
    permissions: ["view_attendance"]
  }
];

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('attendanceUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // In a real app, this would be an API call
    const foundUser = dummyUsers.find(
      (u) => u.email === email && password === "password123"
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('attendanceUser', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('attendanceUser');
  };

  // Check user permissions
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission,
    // Role-based helpers
    isAdmin: user?.role === "Admin",
    isTeacher: user?.role === "Teacher",
    isStudent: user?.role === "Student"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};