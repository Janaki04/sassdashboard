import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import CreateEventModal from './CreateEventModal';

export default function ScheduleCalendarView() {
  const [currentView, setCurrentView] = useState('Month'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState('');

  const [events, setEvents] = useState([
    { day: 2, title: 'Free day', type: 'free' },
    { day: 2, title: 'Party Time', type: 'party' },
    { day: 16, title: 'Victory day', type: 'victory' },
    { day: 25, title: 'Christmas Day', type: 'holiday' }
  ]);

  const peopleList = [
    { name: 'Eddie Lobanovskiy', email: 'lobanovskiy@gmail.com', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { name: 'Alexey Stave', email: 'alexeyst@gmail.com', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' }
  ];

  const monthsData = [
    { name: 'January', year: 2021, totalDays: 31, offset: 5 },
    { name: 'February', year: 2021, totalDays: 28, offset: 1 },
    { name: 'March', year: 2021, totalDays: 31, offset: 1 },
    { name: 'April', year: 2021, totalDays: 30, offset: 4 },
    { name: 'May', year: 2021, totalDays: 31, offset: 6 },
    { name: 'Jun', year: 2021, totalDays: 30, offset: 2 },
    { name: 'July', year: 2021, totalDays: 31, offset: 4 },
    { name: 'August', year: 2021, totalDays: 31, offset: 0 },
    { name: 'September', year: 2021, totalDays: 30, offset: 3 },
    { name: 'October', year: 2021, totalDays: 31, offset: 5 },
    { name: 'November', year: 2021, totalDays: 30, offset: 1 },
    { name: 'December', year: 2021, totalDays: 31, offset: 3 },
  ];

  const handleSaveEvent = (newEvent) => {
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
    <div className="min-h-screen bg-[#FAFAFB] w-full text-slate-600 antialiased font-sans flex flex-col p-4 sm:p-6 lg:p-10">
      
      <div className="flex items-center justify-between mb-10 mt-12 md:mt-0">
        <h1 className="text-2xl font-black text-[#0B0E1F] tracking-tight">
          Calendar
        </h1>
        
        <div className="flex items-center bg-[#EEEDFD]/60 p-1 rounded-xl text-[11px] font-bold text-[#8A94A6]">
          {['Month', 'Year'].map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`px-5 py-2 rounded-xl transition-all ${
                currentView === v 
                  ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-100/50 font-black' 
                  : 'hover:text-slate-800'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 items-start">
        
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 bg-white border border-slate-100/40 rounded-3xl p-6 space-y-6 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.06)] shrink-0">
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] text-white py-3.5 px-4 rounded-2xl text-xs font-black transition-all shadow-md shadow-indigo-100"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Create Schedule</span>
          </button>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-[#1A1C29]">December 2, 2021</h3>
              <div className="flex items-center gap-2 text-slate-300">
                <button className="p-0.5 hover:text-slate-600 transition-colors"><ChevronLeft size={16} className="stroke-[2.5]" /></button>
                <button className="p-0.5 hover:text-slate-600 transition-colors"><ChevronRight size={16} className="stroke-[2.5]" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-slate-400">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <span key={idx} className="text-slate-400/80">{day}</span>
              ))}
              {Array.from({ length: 2 }, (_, i) => (
                <div key={`prev-${i}`} className="text-slate-300/40 font-normal">{(29 + i)}</div>
              ))}
              {Array.from({ length: 31 }, (_, idx) => {
                const dayNum = idx + 1;
                const isSelected = dayNum === 3;
                return (
                  <div key={idx} className="relative flex justify-center items-center h-6">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      isSelected ? 'bg-[#5551ff] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                    }`}>{dayNum}</span>
                  </div>
                );
              })}
              {Array.from({ length: 2 }, (_, i) => (
                <div key={`next-${i}`} className="text-slate-300/40 font-normal">{(i + 1)}</div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#1A1C29] px-1">People</h3>
            
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search for People"
                value={peopleSearch}
                onChange={e => setPeopleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FB] border border-transparent rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-slate-100 transition-all placeholder:text-slate-400/80"
              />
            </div>

            <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
              {peopleList.filter(p => p.name.toLowerCase().includes(peopleSearch.toLowerCase())).map((person, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={person.img} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-2xs" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-slate-800 truncate leading-tight">{person.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">{person.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-2 py-3 border border-slate-100 rounded-xl text-xs font-black text-[#5551ff] bg-white hover:bg-slate-50/50 transition-all text-center">
              My Schedule
            </button>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-8 xl:col-span-9 bg-white rounded-3xl border border-slate-100/50 p-8 shadow-[0_4px_25px_-6px_rgba(148,163,184,0.05)] overflow-hidden">
          
          {currentView === 'Year' ? (
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 overflow-y-auto max-h-[750px] pr-1 animate-in fade-in duration-200">
              {monthsData.map((month, mIdx) => (
                <div key={mIdx} className="space-y-4">
                  <h4 className="text-xs font-black text-[#0B0E1F] tracking-wide px-0.5 flex items-center gap-1">
                    <span>{month.name}</span>
                    <span className="text-slate-400/80 font-medium">{month.year}</span>
                  </h4>

                  <div className="grid grid-cols-7 text-center gap-y-2 text-[10px] font-bold">
                    {/* Weekly column indicator strings */}
                    {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((d, dIdx) => (
                      <div key={dIdx} className="text-slate-400/60 font-black">{d}</div>
                    ))}
                    
                    {Array.from({ length: month.offset }, (_, i) => (
                      <div key={`offset-${i}`} className="text-slate-300/30 font-normal">
                        {28 + i}
                      </div>
                    ))}

                    {Array.from({ length: month.totalDays }, (_, dIdx) => {
                      const dayNumber = dIdx + 1;
                      
                      const isSpecialDecemberNode = month.name === 'December' && dayNumber === 2;

                      return (
                        <div key={dIdx} className="relative flex items-center justify-center h-5">
                          <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-extrabold transition-all ${
                            isSpecialDecemberNode 
                              ? 'bg-[#5551ff] text-white rounded-full font-black shadow-md shadow-indigo-100 scale-110' 
                              : 'text-[#4A5568]/90 hover:bg-slate-50 rounded-md cursor-pointer'
                          }`}>
                            {dayNumber}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          ) : (

            <div className="flex-1 flex flex-col animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="text-sm font-black text-slate-800">December 2, 2021</span>
                <div className="flex items-center gap-1 bg-[#F8F9FB] border border-slate-100 rounded-lg p-0.5 text-slate-400">
                  <button className="p-1 hover:text-slate-600"><ChevronLeft size={14} className="stroke-[2.5]" /></button>
                  <button className="p-1 hover:text-slate-600"><ChevronRight size={14} className="stroke-[2.5]" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-slate-100 bg-[#F8F9FB]/50 text-center py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className={d === 'Wed' ? 'text-slate-800' : ''}>{d}</div>
                ))}
              </div>

              <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-100 bg-slate-50/10">
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
                      className={`p-3 flex flex-col justify-between min-h-[90px] lg:min-h-[120px] bg-white transition-colors cursor-pointer group relative ${!isCurrentMonth ? 'bg-[#F8F9FB]/40 select-none pointer-events-none' : 'hover:bg-slate-50/30'}`}
                    >
                      <span className={`text-xs font-extrabold block ${dayVal === 2 && isCurrentMonth ? 'text-[#5551ff] font-black underline decoration-2 underline-offset-4' : isCurrentMonth ? 'text-slate-800' : 'text-slate-300'}`}>
                        {displayNum}
                      </span>
                      <div className="space-y-1 mt-2 flex-1 flex flex-col justify-end">
                        {matchedBadges.map((badge, bIdx) => (
                          <div key={bIdx} className={`text-[9px] font-black px-2 py-1 rounded-md truncate max-w-full tracking-wide shadow-3xs ${getBadgeStyle(badge.type)}`}>
                            {badge.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveEvent} />
    </div>
  );
}