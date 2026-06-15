import React from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Calendar, 
  MessageSquare, Bell, Settings, X, TrendingUp, LogOut
} from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar, activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'messages', name: 'Messages', icon: MessageSquare, badge: 49 },
    { id: 'notification', name: 'Notification', icon: Bell },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Dynamic Responsive Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100 p-4 transition-all duration-300 ease-in-out
        md:static md:translate-x-0
        /* Width shifts contextually across media breakpoints */
        w-64 md:w-20 xl:w-64 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Brand Logo Header Block */}
        <div className="flex flex-col xl:flex-row items-center justify-between mb-8 px-2">
          <div className="flex flex-col xl:flex-row items-center gap-2 xl:gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-md shadow-indigo-100">
              <TrendingUp size={22} />
            </div>
            {/* Hides label text on tablet mid-breaks, shows on desktop/mobile */}
            <span className="text-sm xl:text-xl font-bold text-gray-900 md:block xl:inline">
              Base
            </span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Routes Mapping */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) toggleSidebar(); 
                }}
                title={item.name}
                className={`w-full flex items-center justify-center xl:justify-between p-3 xl:px-4 xl:py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={22} className="shrink-0" />
                  <span className="md:hidden xl:inline">{item.name}</span>
                </div>

                {/* Badge Notification Count display layout logic */}
                {item.badge && (
                  <>
                    {/* Full standard text badge */}
                    <span className="hidden xl:inline-block bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                    {/* Small visual dot placeholder on mid-sized screen buttons */}
                    <span className="absolute top-2 right-2 md:block xl:hidden w-2 h-2 bg-red-500 rounded-full border border-white" />
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Custom Upgrade widget CTA layout block */}
        <div className="hidden xl:block mt-auto bg-indigo-50/60 p-4 rounded-2xl relative overflow-hidden text-center border border-indigo-50">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-100 rounded-full blur-xl" />
          <p className="text-sm font-bold text-indigo-950 z-10 relative">Upgrade to Pro</p>
          <p className="text-[11px] text-indigo-500 mt-0.5 mb-3 z-10 relative leading-snug">Get access to all metrics</p>
          <button className="w-full bg-indigo-600 text-white text-xs py-2 px-4 rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-colors z-10 relative">
            Upgrade Now
          </button>
        </div>

        {/* User Account / Profile Details footer footer frame */}
        <div className="flex flex-col xl:flex-row items-center gap-3 mt-auto md:mt-4 xl:mt-6 pt-4 border-t border-gray-100 px-1">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="User Profile Pic" 
            className="w-10 h-10 rounded-2xl object-cover bg-rose-200 border-2 border-white ring-1 ring-gray-100"
          />
          <div className="hidden xl:block flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">Easin Arafat</p>
            <p className="text-[10px] text-gray-400 font-medium truncate">Free Account</p>
          </div>
          <button className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-gray-50 transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>

      </aside>
    </>
  );
}