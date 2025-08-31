import { useState } from 'react';
import Head from 'next/head';

// Dummy data for features section
const featuresData = [
  {
    id: 1,
    title: 'Automated Attendance Tracking',
    description: 'Effortlessly track attendance with facial recognition and geolocation features.',
    icon: '📸',
    role: 'Admin'
  },
  {
    id: 2,
    title: 'Real-time Classroom Monitoring',
    description: 'Monitor student participation and engagement during live sessions.',
    icon: '👁️',
    role: 'Teacher'
  },
  {
    id: 3,
    title: 'Personalized Attendance Reports',
    description: 'Access detailed attendance history and analytics for students.',
    icon: '📊',
    role: 'Student'
  },
  {
    id: 4,
    title: 'Customizable Attendance Policies',
    description: 'Set flexible attendance rules based on institutional requirements.',
    icon: '⚙️',
    role: 'Admin'
  },
  {
    id: 5,
    title: 'Seamless LMS Integration',
    description: 'Connect with popular learning management systems effortlessly.',
    icon: '🔗',
    role: 'Teacher'
  },
  {
    id: 6,
    title: 'Mobile Accessibility',
    description: 'Mark attendance and check records from any device, anywhere.',
    icon: '📱',
    role: 'Student'
  }
];

// Dummy user roles for CTA buttons
const userRoles = ['Admin', 'Teacher', 'Student'];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('Admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Attendify - Smart Attendance Management</title>
        <meta name="description" content="Modern attendance tracking solution for educational institutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Attendify</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
            Login
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Modern Attendance <span className="text-indigo-600">Tracking</span> for Education
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Streamline attendance management with our AI-powered solution designed for schools, colleges, and universities.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {userRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow">
              View Demo
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-4 bg-indigo-200 rounded-2xl rotate-3 opacity-50"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Dashboard Preview</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {selectedRole} View
                </span>
              </div>
              
              {/* Dashboard placeholder */}
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">Attendance Analytics</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-blue-800 font-medium">Class List</span>
                  </div>
                  <div className="h-24 bg-green-50 rounded-lg flex items-center justify-center">
                    <span className="text-green-800 font-medium">Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for <span className="text-indigo-600">Every Role</span>
            </h2>
            <p className="text-gray-600">
              Our platform provides specialized tools to meet the unique needs of administrators, teachers, and students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <div 
                key={feature.id} 
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                    {feature.role}
                  </span>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Attendance Management?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of educational institutions already using Attendify to save time and improve accuracy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-indigo-600 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold text-white">Attendify</span>
              </div>
              <p className="mt-2 text-sm">© {new Date().getFullYear()} Attendify. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}