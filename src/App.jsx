import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import InvoiceView from "./pages/InvoiceView"

const AnalyticsView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">Analytics System Metrics Dashboard Panels.</div>;
// const InvoiceView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">Invoice statements, tracking ledgers, and history charts.</div>;
const ScheduleView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">Calendar events workflows and task schedules.</div>;
const CalendarView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">System schedule calendar grids view space.</div>;
const MessagesView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">Inbox, messages streams, and text channels panel.</div>;
const NotificationView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">System triggers logs and operations notifications feed.</div>;
const SettingsView = () => <div className="p-8 text-gray-500 font-medium animate-fadeIn">User accounts, themes settings, and security profiles.</div>;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const viewRegistry = {
    dashboard: <Dashboard />,
    analytics: <AnalyticsView />,
    invoice: <InvoiceView />,
    schedule: <ScheduleView />,
    calendar: <CalendarView />,
    messages: <MessagesView />,
    notification: <NotificationView />,
    settings: <SettingsView />,
  };

  const renderChildrenRouteView = () => {
    return viewRegistry[activeTab] || <DashboardContent />;
  };

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans antialiased">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 bg-[#FAFAFB]">
          {renderChildrenRouteView()}
        </main>
      </div>
    </div>
  );
}