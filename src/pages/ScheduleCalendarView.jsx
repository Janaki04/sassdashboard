import React, { useState } from 'react';
import { LayoutDashboard, BarChart2, FileText, Calendar as CalIcon, MessageSquare, Bell, Settings, LogOut, ChevronLeft, ChevronRight, Search, Menu, X, Sparkles } from 'lucide-react';
import CreateEventModal from './CreateEventModal';

export default function ScheduleCalendarView() {
  const [currentView, setCurrentView] = useState('Month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState('');

  // Sample active calendar matrix timeline markers
  const [events, setEvents] = useState([
    { day: 2, title: 'Free day', type: 'free' },
    { day: 2, title: 'Party Time', type: 'party' },
    { day: 16, title: 'Victory day', type: 'victory' },
    { day: 25, title: 'Christmas Day', type: 'holiday' }
  ]);

  const navigationItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { icon: <BarChart2 size={18} />, label: 'Analytics' },
    { icon: <FileText size={18} />, label: 'Invoice' },
    { icon: <CalIcon size={18} />, label: 'Schedule' },
    { icon: <CalIcon size={18} />, label: 'Calendar', active: true },
    { icon: <MessageSquare size={18} />, label: 'Messages', badge: '49' },
    { icon: <Bell size={18} />, label: 'Notification' },
    { icon: <Settings size={18} />, label: 'Settings' }
  ];

  const peopleList = [
    { name: 'Eddie Lobanovskiy', email: 'lobanovskiy@gmail.com', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { name: 'Alexey Stave', email: 'alexeyst@gmail.com', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' }
  ];

  const handleSaveEvent = (newEvent) => {
    // Appends new dynamic node specifically onto grid cell box 5 matching image placeholder choice choice
    setEvents([...events, { day: 5, title: newEvent.title, type: 'custom' }]);
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'free': return 'bg-emerald-500 text-white';
      case 'party': return 'bg-purple-500 text-white';
      case 'victory': return 'bg-orange-500 text-white';
      case 'holiday': return 'bg-teal-500 text-white';
      default: return 'bg-[#5551ff] text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f9] text-slate-600 font-sans antialiased flex overflow-hidden h-screen">
      
    

      <div className="flex-1 flex flex-col min-w-0 pt-14 xl:pt-0 overflow-hidden">
        <div className="flex-1 flex overflow-hidden p-4 sm:p-6 lg:p-8 gap-6 max-w-[1600px] w-full mx-auto">
          
          <div className="w-64 shrink-0 hidden lg:flex flex-col gap-5 overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] text-white py-3.5 px-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100/40 shrink-0"
            >
              <span>+ Create Schedule</span>
            </button>

            <div className="bg-white rounded-2xl border border-white/60 p-4 shadow-2xs">
              <div className="flex items-center justify-between px-1 mb-3">
                <h4 className="text-[10px] font-extrabold text-slate-800">December 2, 2021</h4>
                <div className="flex items-center gap-1 text-slate-300">
                  <button className="hover:text-slate-600"><ChevronLeft size={14} /></button>
                  <button className="hover:text-slate-600"><ChevronRight size={14} /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-semibold text-slate-400">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <span key={idx} className="font-bold text-[9px]">{day}</span>
                ))}
                {Array.from({ length: 31 }, (_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = dayNum === 3;
                  return (
                    <span key={idx} className={`h-5 w-5 mx-auto flex items-center justify-center rounded-md ${
                      isSelected ? 'bg-[#5551ff] text-white font-bold' : 'text-slate-700'
                    }`}>{dayNum}</span>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-white/60 p-4 shadow-2xs flex-1 flex flex-col min-h-[220px]">
              <h4 className="text-[11px] font-extrabold text-slate-800 mb-2.5 px-0.5">People</h4>
              <div className="relative mb-3.5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                <input
                  type="text"
                  placeholder="Search for People"
                  value={peopleSearch}
                  onChange={e => setPeopleSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-transparent rounded-xl py-2 pl-8 pr-3 text-[11px] focus:outline-none focus:bg-white focus:border-slate-100 transition-all placeholder-slate-400"
                />
              </div>
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-0.5">
                {peopleList.filter(p => p.name.toLowerCase().includes(peopleSearch.toLowerCase())).map((person, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <img src={person.img} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div className="min-w-0">
                      <h5 className="text-[10px] font-bold text-slate-800 truncate leading-tight">{person.name}</h5>
                      <p className="text-[9px] text-slate-400 truncate mt-0.5">{person.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center py-2.5 text-[10px] font-bold bg-slate-50 hover:bg-slate-100/70 border border-slate-100 text-[#5551ff] rounded-xl mt-3 transition-colors">
                My Schedule
              </button>
            </div>
          </div>

          <main className="flex-1 bg-white rounded-3xl border border-white/80 shadow-xs flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Calendar</h2>
                <div className="flex items-center bg-slate-50 p-0.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-400">
                  {['Day', 'Week', 'Month', 'Year'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setCurrentView(v)}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        currentView === v ? 'bg-white text-[#5551ff] shadow-2xs font-extrabold' : 'hover:text-slate-600'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <span>December 2, 2021</span>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-lg p-0.5 text-slate-400">
                  <button className="p-1 hover:text-slate-600 transition-colors"><ChevronLeft size={14} /></button>
                  <button className="p-1 hover:text-slate-600 transition-colors"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className={d === 'Wed' ? 'text-slate-700' : ''}>{d}</div>
              ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-100/80 bg-slate-50/20 overflow-y-auto">
              {Array.from({ length: 35 }, (_, idx) => {
                const dayVal = idx + 1;
                const paddedDay = dayVal > 31 ? dayVal - 31 : dayVal;
                const displayNum = paddedDay < 10 ? `0${paddedDay}` : `${paddedDay}`;
                const isCurrentMonth = dayVal <= 31;
                
                const matchedBadges = events.filter((e) => e.day === dayVal && isCurrentMonth);

                return (
                  <div 
                    key={idx} 
                    onClick={() => { if (isCurrentMonth) setIsModalOpen(true); }}
                    className={`p-2 flex flex-col justify-between min-h-[80px] lg:min-h-[110px] bg-white transition-colors cursor-pointer group ${
                      !isCurrentMonth ? 'text-slate-300 bg-slate-50/40 select-none pointer-events-none' : 'hover:bg-slate-50/40'
                    }`}
                  >
                    {/* Day string marker label text node */}
                    <span className={`text-xs font-bold block transition-all ${
                      dayVal === 2 && isCurrentMonth 
                        ? 'text-[#5551ff] font-extrabold underline decoration-2 underline-offset-4' 
                        : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {displayNum}
                    </span>

                    {/* Stacked tags container box inside daily table cells row */}
                    <div className="space-y-1 mt-1 flex-1 flex flex-col justify-end">
                      {matchedBadges.map((badge, bIdx) => (
                        <div 
                          key={bIdx} 
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md truncate max-w-full shadow-3xs border border-white/10 animate-in fade-in slide-in-from-bottom-1 duration-150 ${getBadgeStyle(badge.type)}`}
                        >
                          {badge.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </main>
        </div>
      </div>

      {/* Floating Modal Trigger Context Mask Injection Point */}
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveEvent} 
      />

      {/* Mobile Drawer Overlay Backdrop click blocker element row node mask panel */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-30 xl:hidden" />
      )}

    </div>
  );
}