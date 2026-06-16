import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import InvoiceView from "./pages/InvoiceView";
import ChatView from "./pages/ChatView";
import ScheduleView from "./pages/ScheduleView";
import ScheduleCalendarView from "./pages/ScheduleCalendarView";

import LogInView from './pages/LogInView';
import SignUpView from './pages/SignUpView';

const AnalyticsView = () => <div className="p-8 text-gray-500 font-medium">Analytics Metrics Control Panels.</div>;
const NotificationView = () => <div className="p-8 text-gray-500 font-medium">System operational activity feeds.</div>;
const SettingsView = () => <div className="p-8 text-gray-500 font-medium">User profile security configurations.</div>;

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
    notification: <NotificationView />,
    settings: <SettingsView />,
  };

  if (authStatus === 'checking') {
    return (
      <div className="h-screen w-screen bg-[#FAFAFB] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#5551ff] rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Verifying Credentials...</span>
      </div>
    );
  }

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

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans antialiased animate-in fade-in duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogOut={handleLogOut} 
      />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} activeTab={activeTab} />
        
        <main className="flex-1 bg-[#FAFAFB]">
          {viewRegistry[activeTab] || <Dashboard />}
        </main>
      </div>
    </div>
  );
}