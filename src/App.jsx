import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; 
import { ReactLenis } from 'lenis/react'; // 👈 Imported Lenis smooth scroll component wrapper
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import InvoiceView from "./pages/InvoiceView";
import ChatView from "./pages/ChatView";
import ScheduleView from "./pages/ScheduleView";
import ScheduleCalendarView from "./pages/ScheduleCalendarView";
import AnalyticsView from "./pages/AnalyticsView";
import SettingsScreen from "./pages/SettingsScreen"

import LogInView from './pages/LogInView';
import SignUpView from './pages/SignUpView';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Default Profile Fallback configuration
const DEFAULT_PROFILE = {
  firstName: 'John',
  lastName: 'Deo',
  email: 'johndoe2211@gmail.com',
  phone: '+33 757 005 467',
  language: 'English (US)',
  timezone: 'GMT -05:00',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authStatus, setAuthStatus] = useState('checking');
  const [globalUnreadCount, setGlobalUnreadCount] = useState(8);
  
  // Initialize Dark Mode State from localStorage or System Defaults
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Single Global Source of Truth Profile Object State
  const [globalProfile, setGlobalProfile] = useState(() => {
    const cached = localStorage.getItem('userProfile');
    return cached ? JSON.parse(cached) : DEFAULT_PROFILE;
  });

  // Dynamic DOM Class Modifier Sync for Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const cachedProfile = localStorage.getItem('userProfile');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      if (cachedProfile) {
        setGlobalProfile(JSON.parse(cachedProfile));
      }
      setAuthStatus('authenticated');
    } else {
      localStorage.removeItem('isLoggedIn');
      setAuthStatus('login');
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthStatus('authenticated');
    setActiveTab('dashboard');
  };

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    setAuthStatus('login');
  };

  // Dynamic content viewport rendering function matching your view registry
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsView />;
      case 'invoice':
        return <InvoiceView />;
      case 'schedule':
        return <ScheduleView />;
      case 'calendar':
        return <ScheduleCalendarView />; 
      case 'messages':
        return (
          <ChatView onUpdateTotalUnreadCount={setGlobalUnreadCount} />
        );
      case 'settings':
        return (
          <SettingsScreen 
            externalProfile={globalProfile} 
            setExternalProfile={(updatedProfile) => {
              setGlobalProfile(updatedProfile);
              localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            }} 
          />
        );
      default:
        return <Dashboard />;
    }
  };

  // --- LOADING / INITIAL CHECK GATEWAY ---
  if (authStatus === 'checking') {
    return (
      <div className="h-screen w-screen bg-[#FAFAFB] dark:bg-slate-950 flex flex-col items-center justify-center gap-3 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-[#5551ff] rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Verifying Credentials...</span>
      </div>
    );
  }

  // --- PUBLIC SECURITY ROUTES ---
  if (authStatus === 'login') {
    return (
      <LogInView 
        onNavigateToSignup={() => setAuthStatus('signup')} 
        onAuthSuccess={handleLoginSuccess}
      />
    );
  }

  if (authStatus === 'signup') {
    return (
      <SignUpView 
        onNavigateToLogin={() => setAuthStatus('login')} 
        onAuthSuccess={handleLoginSuccess}
      />
    );
  }

  // --- SECURED ROOT CORE SHELL ---
  return (
    <div className="flex h-screen bg-gray-50/50 dark:bg-slate-950 overflow-hidden font-sans antialiased animate-in fade-in duration-300 relative transition-colors duration-300">
      
      {/* Responsive Left Navigation Sidebar mapped with core credentials */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogOut={handleLogOut} 
        userProfile={globalProfile} 
        unreadMessagesCount={globalUnreadCount}
        darkMode={darkMode}       
        setDarkMode={setDarkMode} 
      />

      {/* FLOATING HAMBURGER TRIGGER BUTTON */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-md shadow-slate-200/50 dark:shadow-none text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 active:scale-95 transition-all"
        aria-label="Open Navigation Menu"
      >
        <Menu size={18} className="stroke-[2.5]" />
      </button>

      {/* Main Content Workspace viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 bg-[#FAFAFB] dark:bg-slate-950 transition-colors duration-300">
            {renderActiveView()}
          </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"} 
      />
    </div>
  );
}