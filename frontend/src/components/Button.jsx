// src/components/Button.jsx
import React from 'react';

// Button variants configuration
const buttonVariants = {
  primary: {
    base: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    disabled: 'bg-indigo-300 cursor-not-allowed',
    focus: 'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
  },
  secondary: {
    base: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    disabled: 'bg-gray-100 cursor-not-allowed text-gray-400',
    focus: 'focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
  },
  danger: {
    base: 'bg-red-600 hover:bg-red-700 text-white',
    disabled: 'bg-red-300 cursor-not-allowed',
    focus: 'focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
  },
  outline: {
    base: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    disabled: 'border-gray-300 text-gray-400 cursor-not-allowed',
    focus: 'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
  },
};

// Button sizes configuration
const buttonSizes = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-sm',
  large: 'px-6 py-3 text-base',
};

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Reusable Button Component
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  roles = [],
  userRole = 'admin',
  ...props
}) => {
  // Role-based visibility check
  if (roles.length > 0 && !roles.includes(userRole)) {
    return null;
  }

  // Get variant styles
  const variantStyles = buttonVariants[variant] || buttonVariants.primary;
  
  // Get size styles
  const sizeStyles = buttonSizes[size] || buttonSizes.medium;
  
  // Combine all styles
  const buttonClasses = `
    inline-flex items-center justify-center rounded-md font-medium transition-colors
    ${variantStyles.base} ${variantStyles.focus} ${sizeStyles}
    ${disabled || loading ? variantStyles.disabled : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

// Example usage with role-based buttons
const ButtonExamples = () => {
  // Dummy user role (would come from auth context in real app)
  const userRole = 'admin'; // Change to 'teacher' or 'student' to test role visibility

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Button Examples</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Role-Based Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button roles={['admin', 'teacher']}>Admin/Teacher Only</Button>
          <Button roles={['admin']}>Admin Only</Button>
          <Button roles={['student']}>Student Only</Button>
          <Button roles={['teacher']}>Teacher Only</Button>
        </div>
        <p className="text-sm text-gray-500">
          Current user role: <span className="font-medium capitalize">{userRole}</span>
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Usage Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="primary" 
            onClick={() => alert('Primary button clicked!')}
          >
            Save Attendance
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => alert('Secondary button clicked!')}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            roles={['admin']}
            onClick={() => alert('Danger button clicked!')}
          >
            Delete Record
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => alert('Outline button clicked!')}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Button;
export { ButtonExamples };