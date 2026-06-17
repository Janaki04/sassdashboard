import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; // Injected to trigger sidebar open state on mobile
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


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    const cachedProfile = localStorage.getItem('userProfile');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (cachedProfile && isLoggedIn === 'true') {
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

  const viewRegistry = {
    dashboard: <Dashboard />,
    analytics: <AnalyticsView />,
    invoice: <InvoiceView />,
    schedule: <ScheduleView />,
    calendar: <ScheduleCalendarView />, 
    messages: <ChatView />,
    settings: <SettingsScreen />,
  };

  // --- LOADING / INITIAL CHECK GATEWAY ---
  if (authStatus === 'checking') {
    return (
      <div className="h-screen w-screen bg-[#FAFAFB] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#5551ff] rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Verifying Credentials...</span>
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

  // --- SECURED ROOT CORE SHELL (HEADER-LESS) ---
  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans antialiased animate-in fade-in duration-300 relative">
      {/* Responsive Left Navigation Side-Column Drawer */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogOut={handleLogOut} 
      />

      {/* FLOATING HAMBURGER TRIGGER BUTTON */}
      {/* This renders only on mobile viewports (md:hidden), floating gracefully over your pages */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2.5 rounded-xl border border-slate-100 shadow-md shadow-slate-200/50 text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
        aria-label="Open Navigation Menu"
      >
        <Menu size={18} className="stroke-[2.5]" />
      </button>

      {/* Main Content Workspace viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 bg-[#FAFAFB]">
          {viewRegistry[activeTab] || <Dashboard />}
        </main>
      </div>
    </div>
  );
}