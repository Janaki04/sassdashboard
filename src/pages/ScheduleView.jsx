import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Search, Edit2, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export default function ScheduleView() {
  // Main data state representing rows
  const [schedules, setSchedules] = useState([
    { id: 1, date: '12 Dec, 2021', time: '10.15AM', location: 'Office Meeting', type: 'office' },
    { id: 2, date: '10 Dec, 2021', time: '11.20AM', location: 'Home', type: 'home' },
    { id: 3, date: '09 Dec, 2021', time: '11.45AM', location: 'Friends Zone', type: 'friends' },
    { id: 4, date: '08 Dec, 2021', time: '12.15PM', location: 'Office Meeting', type: 'office' },
    { id: 5, date: '07 Dec, 2021', time: '01.20PM', location: 'Home', type: 'home' },
    { id: 6, date: '05 Dec, 2021', time: '10.15AM', location: 'Meeting Outside', type: 'outside' },
    { id: 7, date: '04 Dec, 2021', time: '11.15AM', location: 'Office Meeting', type: 'office' },
    { id: 8, date: '04 Dec, 2021', time: '01.25PM', location: 'Home', type: 'home' },
    { id: 9, date: '02 Dec, 2021', time: '10.15AM', location: 'Friends', type: 'friends' },
    { id: 10, date: '01 Dec, 2021', time: '04.30PM', location: 'Meeting Outside', type: 'outside' }
  ]);

  // Sidebar mock users data
  const [people] = useState([
    { id: 1, name: 'Eddie Lobanovskiy', email: 'lobanovskiy@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Alexey Stave', email: 'alexeyst@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
  ]);

  // Interactive States
  const [peopleSearch, setPeopleSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtered people listing based on sidebar input box
  const filteredPeople = people.filter(p => 
    p.name.toLowerCase().includes(peopleSearch.toLowerCase()) || 
    p.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  // Sorting mechanics for schedule list rows
  const toggleSort = () => {
    setSortAsc(!sortAsc);
    const sorted = [...schedules].sort((a, b) => {
      return sortAsc 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setSchedules(sorted);
  };

  // Row selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(schedules.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const deleteRow = (id) => {
    setSchedules(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  // Badges map reflecting your context interface colors
  const locationStyles = {
    office: 'bg-indigo-50 text-indigo-600 border border-indigo-100/40',
    home: 'bg-purple-50 text-purple-600 border border-purple-100/40',
    friends: 'bg-amber-50/70 text-amber-600 border border-amber-100/30',
    outside: 'bg-emerald-50 text-emerald-600 border border-emerald-100/40'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] w-full text-slate-600 antialiased font-sans flex flex-col">
      
      {/* Mobile Top Header App Bar */}
      <header className="lg:hidden bg-white border-b border-slate-100 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-slate-500 hover:bg-slate-50 rounded-lg">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Schedule List</h1>
        </div>
        <button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-indigo-100">
          <Plus size={14} />
          Add New
        </button>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6 overflow-hidden">
        
        {/* SIDEBAR CONTAINER: Controlled drawer on mobile, static card column on desktop */}
        <aside className={`
          fixed inset-y-0 left-0 w-72 bg-white lg:bg-transparent z-40 p-6 lg:p-0 border-r border-slate-100 lg:border-none shadow-xl lg:shadow-none transition-transform duration-300 transform lg:transform-none lg:static flex flex-col gap-6 shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Mobile drawer header alignment */}
          <div className="flex lg:hidden items-center justify-between border-b border-slate-50 pb-3">
            <span className="font-bold text-slate-900">Workspace Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 bg-slate-50 rounded-lg text-slate-500">
              <X size={18} />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-[#5551ff] hover:bg-indigo-700 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100/60 shrink-0">
            <Plus size={16} />
            <span>Create Schedule</span>
          </button>

          {/* Miniature Calendar UI Card Box Widget */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-800">December 2, 2021</h3>
              <div className="flex items-center gap-1 text-slate-300">
                <button className="p-1 hover:text-slate-600 transition-colors"><ChevronLeft size={16} /></button>
                <button className="p-1 hover:text-slate-600 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2.5 text-center text-[11px] font-medium text-slate-400">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="font-bold text-slate-400 text-[10px]">{d}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isSelected = day === 3; // Mocking specific highlight choice from snapshot
                return (
                  <div key={i} className="relative flex justify-center items-center h-6">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs transition-all ${
                      isSelected 
                        ? 'bg-[#5551ff] text-white font-bold shadow-md shadow-indigo-100' 
                        : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                    }`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* People Filter Roster Module Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex-1 flex flex-col min-h-[280px]">
            <h3 className="text-xs font-bold text-slate-800 mb-3 px-1">People</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text"
                placeholder="Search for People"
                value={peopleSearch}
                onChange={e => setPeopleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50/60 border border-transparent rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-slate-200/80 transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {filteredPeople.map(person => (
                <div key={person.id} className="flex items-center gap-3 group">
                  <img src={person.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-xs" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{person.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{person.email}</p>
                  </div>
                </div>
              ))}
              {filteredPeople.length === 0 && (
                <div className="text-center py-6 text-[11px] text-slate-400 font-medium">No records found.</div>
              )}
            </div>

            <button className="w-full mt-4 py-2.5 border border-slate-100 rounded-xl text-xs font-bold text-[#5551ff] bg-white hover:bg-slate-50/80 transition-all text-center">
              My Schedule
            </button>
          </div>
        </aside>

        {/* BACKDROP: Modal backdrop mask displayed only during mobile interactive active drawer views */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-30 lg:hidden" />
        )}

        {/* WORKSPACE CONTENT AREA: Schedule Dashboard Data Rows List */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* Top Panel Desktop Action Title Row */}
          <div className="hidden lg:flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Schedule List</h2>
            <button className="flex items-center gap-2 bg-[#5551ff] hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100">
              <Plus size={16} />
              <span>Add New</span>
            </button>
          </div>

          {/* Table Matrix Component Frame */}
          <div className="flex-1 flex flex-col bg-transparent rounded-2xl overflow-hidden">
            
            {/* Header Columns Configuration Panel Row */}
            <div className="grid grid-cols-12 px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider items-center gap-4 border-b border-transparent select-none shrink-0">
              <div className="col-span-1 flex items-center">
                <input 
                  type="checkbox"
                  checked={schedules.length > 0 && selectedIds.length === schedules.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all bg-white cursor-pointer"
                />
              </div>
              <div onClick={toggleSort} className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
                Date <ArrowUpDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-3 flex items-center gap-1">
                Time <ArrowUpDown size={12} className="text-slate-300" />
              </div>
              <div className="col-span-3 flex items-center gap-1">
                Location <ArrowUpDown size={12} className="text-slate-300" />
              </div>
              <div className="col-span-2 text-right"></div>
            </div>

            {/* Dynamic Data Content Rows List Stack */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1">
              {schedules.map((row) => {
                const isChecked = selectedIds.includes(row.id);
                return (
                  <div 
                    key={row.id} 
                    className={`grid grid-cols-12 px-6 py-4 bg-white rounded-2xl border items-center gap-4 transition-all duration-200 ${
                      isChecked 
                        ? 'border-indigo-200 shadow-xs bg-indigo-50/10' 
                        : 'border-slate-100/70 hover:border-slate-200/80 hover:shadow-xs shadow-200'
                    }`}
                  >
                    {/* Checkbox item */}
                    <div className="col-span-1 flex items-center">
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer"
                      />
                    </div>

                    {/* Date Item field */}
                    <div className="col-span-11 md:col-span-3 flex items-center gap-2.5 text-xs font-bold text-slate-800">
                      <CalendarIcon size={14} className="text-indigo-500 shrink-0" />
                      <span>{row.date}</span>
                    </div>

                    {/* Time Item field */}
                    <div className="col-span-6 md:col-span-3 flex items-center gap-2.5 text-xs font-medium text-slate-700">
                      <Clock size={14} className="text-slate-400 shrink-0" />
                      <span>{row.time}</span>
                    </div>

                    {/* Location Badge container row field */}
                    <div className="col-span-6 md:col-span-3">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold leading-none ${locationStyles[row.type] || 'bg-slate-50 text-slate-600'}`}>
                        <MapPin size={12} className="shrink-0 opacity-80" />
                        <span>{row.location}</span>
                      </div>
                    </div>

                    {/* Row Item Action Elements Panel Tool buttons */}
                    <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2.5 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-dashed border-slate-50 md:border-none">
                      <button className="p-2 bg-amber-50/60 hover:bg-amber-100/80 text-amber-500 hover:text-amber-600 rounded-xl transition-all shadow-3xs border border-amber-100/20">
                        <Edit2 size={13} fill="currentColor" className="opacity-90" />
                      </button>
                      <button 
                        onClick={() => deleteRow(row.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100/80 text-rose-500 hover:text-rose-600 rounded-xl transition-all shadow-3xs border border-rose-100/20"
                      >
                        <Trash2 size={13} fill="currentColor" className="opacity-90" />
                      </button>
                    </div>

                  </div>
                );
              })}

              {schedules.length === 0 && (
                <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium text-sm">
                  No upcoming events or schedules configured inside the list tracker.
                </div>
              )}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}