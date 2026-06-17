import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Calendar, 
  MessageSquare, Settings, X, LogOut, CheckCircle2, AlertTriangle
} from 'lucide-react';
import logo from "../assets/Subtract.png";
import { toast } from 'react-toastify';

export default function Sidebar({ isOpen, toggleSidebar, activeTab, setActiveTab, onLogOut }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'messages', name: 'Messages', icon: MessageSquare, badge: 4 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleConfirmLogout = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleupdate=()=>{
    toast.success("New version upgrade sucessfully")
  }

  const handleFinalRedirect = () => {
    setShowSuccessModal(false);
    if (onLogOut) onLogOut();
  };

  return (
    <>
      <div 
        onClick={toggleSidebar}
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-100/80 p-4 transition-all duration-300 ease-in-out
        md:static md:translate-x-0 w-64 md:w-24 xl:w-64 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3 mx-auto xl:mx-0">
            <div className="p-2.5 rounded-2xl">
              <img src={logo} className="w-5 h-5 object-contain" alt="Logo" />
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tight md:hidden xl:inline-block">
              Base
            </span>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1 -mr-1">
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
                className={`w-full flex items-center justify-center xl:justify-between p-3 xl:px-4 xl:py-3 rounded-xl text-xs font-bold transition-all group relative ${
                  isActive 
                    ? 'bg-indigo-50/80 text-[#5551ff]' 
                    : 'text-slate-400 hover:bg-slate-50/60 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={18} 
                    className={`shrink-0 transition-transform group-hover:scale-102 ${
                      isActive ? 'stroke-[2.5]' : 'stroke-[2]'
                    }`} 
                  />
                  <span className="md:hidden xl:inline-block tracking-wide">{item.name}</span>
                </div>

                {item.badge && (
                  <>
                    <span className="hidden xl:inline-block bg-rose-50 text-rose-500 text-[10px] px-1.5 py-0.5 rounded-md font-black min-w-[20px] text-center">
                      {item.badge}
                    </span>
                    <span className="absolute top-2.5 right-2.5 md:block xl:hidden w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-xs" />
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden xl:block mt-auto mb-6 bg-gradient-to-b from-blue-50/50 to-indigo-50/80 p-5 rounded-2xl relative overflow-hidden text-center border border-indigo-50/40">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-t from-indigo-500/20 to-transparent blur-xs opacity-80 pointer-events-none" />
          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md shadow-indigo-200 relative z-10">
            <img src={logo} className="w-5 h-5 object-contain" alt="Upgrade" />
          </div>
          <button onClick={handleupdate} className="w-full bg-[#5551ff] hover:bg-[#4440ef] text-white text-[11px] font-extrabold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100 z-10 relative">
            Upgrade Now
          </button>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-3 mt-auto md:mt-4 xl:mt-0 pt-4 border-t border-slate-100 px-1">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Portrait" 
            className="w-9 h-9 rounded-xl object-cover bg-slate-100 ring-2 ring-white shadow-xs"
          />
          <div className="hidden xl:block flex-1 min-w-0 text-left">
            <p className="text-xs font-black text-slate-800 truncate leading-none">Easin Arafat</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 leading-none">Free Account</p>
          </div>
          
          <button 
            onClick={() => setShowConfirmModal(true)}
            className="text-slate-400 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50/50 transition-colors md:mt-2 xl:mt-0" 
            title="Log Out Session"
          >
            <LogOut size={16} className="stroke-[2]" />
          </button>
        </div>
      </aside>


      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-xl text-center space-y-5 transform scale-in duration-200">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-800">Log Out</h3>
              <p className="text-xs text-slate-400 font-medium">Are you sure you want to logout?</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border border-slate-100 hover:bg-slate-50 rounded-xl text-xs font-black text-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="flex-1 py-3 bg-[#5551ff] hover:bg-[#4440ef] text-white rounded-xl text-xs font-black shadow-md shadow-indigo-100 transition-all"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-10 max-w-[420px] w-full border border-slate-100 shadow-2xl text-center flex flex-col items-center justify-center min-h-[340px]">
            
            <div className="w-24 h-24 bg-[#F2F1FF] rounded-full flex items-center justify-center relative mb-6">
              <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-60" />
              <div className="absolute top-4 right-5 w-2 h-2 bg-purple-400 rounded-full opacity-40" />
              <div className="absolute bottom-4 left-6 w-2 h-1 bg-amber-400 rounded-full opacity-50" />
              
              <div className="w-14 h-14 bg-[#5551ff] text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-200">
                <CheckCircle2 size={24} className="stroke-[2.5]" />
              </div>
            </div>

            <h3 className="text-base font-black text-slate-800 tracking-tight mb-6">
              Your account successfully logged out.
            </h3>

            <button 
              onClick={handleFinalRedirect}
              className="bg-[#5551ff] hover:bg-[#4440ef] text-white text-xs font-black px-8 py-3 rounded-xl transition-all shadow-md shadow-indigo-100 min-w-[140px]"
            >
              Login
            </button>

          </div>
        </div>
      )}
    </>
  );
}