import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Search, Edit2, Trash2, ChevronLeft, ChevronRight, X, Camera, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ScheduleView() {
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
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Office Meeting',
    type: 'office'
  });

  const [people] = useState([
    { id: 1, name: 'Eddie Lobanovskiy', email: 'laboanovskiy@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Alexey Stave', email: 'alexeyst@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
  ]);

  const [peopleSearch, setPeopleSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredPeople = people.filter(p => 
    p.name.toLowerCase().includes(peopleSearch.toLowerCase()) || 
    p.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

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
    toast.info("Schedule item removed configuration pipeline.");
  };

  const handleCreateScheduleSubmit = (e) => {
    e.preventDefault();

    if (!newSchedule.title.trim()) {
      toast.error("Please provide a valid Schedule Title or target context.");
      return;
    }

    if (!newSchedule.date) {
      toast.error("An event selection date is explicitly required.");
      return;
    }

    if (!newSchedule.time) {
      toast.error("An event runtime execution timestamp is required.");
      return;
    }

    const dateObj = new Date(newSchedule.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    const [hours, minutes] = newSchedule.time.split(':');
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours) % 12 || 12;
    const formattedTime = `${formattedHours}.${minutes}${ampm}`;

    const newlyCreatedNode = {
      id: Date.now(),
      date: formattedDate,
      time: formattedTime,
      location: newSchedule.title.trim(),
      type: newSchedule.type
    };

    setSchedules([newlyCreatedNode, ...schedules]);
    setIsDrawerOpen(false); 
    
    setNewSchedule({ title: '', date: '', time: '', location: 'Office Meeting', type: 'office' }); 
    toast.success("Schedule created successfully");
  };

  const locationStyles = {
    office: 'bg-[#eeedff] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400',
    home: 'bg-[#eeedff] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400',
    friends: 'bg-[#eeedff] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400',
    outside: 'bg-[#eeedff] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400'
  };

  return (
    <div className="min-h-screen w-full text-slate-600 dark:text-slate-300 antialiased font-nunito flex flex-col p-4 sm:p-6 lg:p-10 relative overflow-x-hidden">
      
      {/* VIEWPORT CONTROLLER TOP HEADER */}
      <div className="flex items-center justify-between mb-1 mt-12 md:mt-0">
        <h1 className="text-2xl font-black text-[#0B0E1F] dark:text-white tracking-tight">
          Schedule List
        </h1>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 dark:shadow-none"
        >
          <Plus size={15} className="stroke-[3]" />
          <span>Add New</span>
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 items-start">
        
        {/* ASIDE MINI-CALENDAR AND ASSIGNED TEAM PANEL */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-100/60 dark:border-slate-800/80 rounded-3xl p-6 space-y-6 shadow-xs dark:shadow-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200">December 2, 2021</h3>
              <div className="flex items-center gap-2 text-slate-300 dark:text-slate-600">
                <button className="p-0.5 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"><ChevronLeft size={16} className="stroke-[2.5]" /></button>
                <button className="p-0.5 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"><ChevronRight size={16} className="stroke-[2.5]" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-slate-400">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-slate-400/80 dark:text-slate-500">{d}</div>
              ))}
              {Array.from({ length: 2 }, (_, i) => (
                <div key={`prev-${i}`} className="text-slate-300/60 dark:text-slate-700 font-normal">{(29 + i)}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isSelected = day === 3;
                return (
                  <div key={i} className="relative flex justify-center items-center h-6">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      isSelected 
                        ? 'bg-[#5551ff] text-white shadow-xs' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
                    }`}>
                      {day}
                    </span>
                  </div>
                );
              })}
              {Array.from({ length: 2 }, (_, i) => (
                <div key={`next-${i}`} className="text-slate-300/60 dark:text-slate-700 font-normal">{(i + 1)}</div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 px-1">People</h3>
            
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={13} />
              <input 
                type="text"
                placeholder="Search for People"
                value={peopleSearch}
                onChange={e => setPeopleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FB] dark:bg-slate-950 border border-transparent dark:border-slate-800/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-100 dark:focus:border-slate-800 transition-all placeholder:text-slate-400/80 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
              {filteredPeople.map(person => (
                <div key={person.id} className="flex items-center gap-3">
                  <img src={person.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-2xs" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate leading-tight">{person.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5 font-medium">{person.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-2 py-3 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-black text-[#5551ff] dark:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all text-center">
              My Schedule
            </button>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col space-y-3.5 overflow-x-auto">
          
          <div className="grid grid-cols-12 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest items-center pb-2 select-none min-w-[640px]">
            <div className="col-span-1 flex items-center">
              <input 
                type="checkbox"
                checked={schedules.length > 0 && selectedIds.length === schedules.length}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#5551ff] focus:ring-[#5551ff]/20 transition-all bg-white dark:bg-slate-950 cursor-pointer"
              />
            </div>
            <div className="col-span-3 flex items-center gap-1 cursor-pointer">Date <span className="text-[8px]">▼</span></div>
            <div className="col-span-3 flex items-center gap-1 cursor-pointer">Time <span className="text-[8px]">▼</span></div>
            <div className="col-span-3 flex items-center gap-1 cursor-pointer">Location <span className="text-[8px]">▼</span></div>
            <div className="col-span-2"></div>
          </div>

          <div className="space-y-3 min-w-[640px]">
            {schedules.map((row) => {
              const isChecked = selectedIds.includes(row.id);
              return (
                <div 
                  key={row.id} 
                  className={`grid grid-cols-12 px-6 py-3.5 bg-white dark:bg-slate-900 rounded-2xl border items-center transition-all duration-150 ${
                    isChecked 
                      ? 'border-[#5551ff]/30 dark:border-indigo-500/30 bg-indigo-50/5 dark:bg-indigo-950/10' 
                      : 'border-slate-100/80 dark:border-slate-800/60'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-4 h-4 rounded border-slate-200 dark:border-slate-700 text-[#5551ff] focus:ring-[#5551ff]/20 transition-all cursor-pointer bg-white dark:bg-slate-950"
                    />
                  </div>

                  <div className="col-span-3 flex items-center gap-3 text-xs font-extrabold text-[#111625] dark:text-slate-200">
                    <CalendarIcon size={14} className="text-[#5551ff] dark:text-indigo-400 shrink-0" />
                    <span>{row.date}</span>
                  </div>

                  <div className="col-span-3 flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-400">
                    <Clock size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>{row.time}</span>
                  </div>

                  <div className="col-span-3">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold tracking-wide min-w-[140px] ${locationStyles[row.type] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                      <MapPin size={12} className="shrink-0 stroke-[2.5]" />
                      <span className="truncate max-w-[110px]">{row.location}</span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-3">
                    <button className="p-2 bg-[#FFFBF0] dark:bg-amber-950/30 hover:bg-[#FFF4D4] dark:hover:bg-amber-900/40 text-[#FFC42D] rounded-full transition-all">
                      <Edit2 size={13} className="stroke-[2.5]" />
                    </button>
                    <button onClick={() => deleteRow(row.id)} className="p-2 bg-[#FFF2F4] dark:bg-rose-950/30 hover:bg-[#FFE3E7] dark:hover:bg-rose-900/40 text-[#FF4C61] rounded-full transition-all">
                      <Trash2 size={13} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}

            {schedules.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">
                No active records.
              </div>
            )}
          </div>
        </main>
      </div>

      <div 
        className={`fixed inset-0 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-3xs z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 bottom-0 bg-white dark:bg-slate-900 w-full max-w-[460px] h-full shadow-2xl p-8 overflow-y-auto transition-transform duration-300 ease-out transform ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-[#0B0E1F] dark:text-white tracking-tight">Add Schedule</h2>
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF2F4] dark:bg-rose-950/50 text-[#FF4C61] hover:bg-[#FFE3E7] dark:hover:bg-rose-900/40 transition-colors"
            >
              <X size={15} className="stroke-[2.5]" />
            </button>
          </div>

          <form onSubmit={handleCreateScheduleSubmit} className="space-y-6">
            
            <div className="flex justify-center py-2 mb-2">
              <div className="w-28 h-28 bg-[#F4F5F7] dark:bg-slate-950 rounded-full flex items-center justify-center relative border border-slate-100 dark:border-slate-800/80">
                <Camera size={26} className="text-[#475569] dark:text-slate-400" />
                <div className="absolute bottom-1 right-1 p-1.5 bg-[#5551ff] text-white rounded-full shadow-xs">
                  <Plus size={12} className="stroke-[3]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex text-xs font-bold text-slate-700 dark:text-slate-300">Schedule Title / Target Name *</label>
              <input 
                type="text"
                placeholder="e.g., Client Review Meeting"
                value={newSchedule.title}
                onChange={e => setNewSchedule({...newSchedule, title: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F4F5F7] dark:bg-slate-950 border border-transparent dark:border-slate-800/60 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-700 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex text-xs font-bold text-slate-700 dark:text-slate-300">Event Date *</label>
              <input 
                type="date"
                value={newSchedule.date}
                onChange={e => setNewSchedule({...newSchedule, date: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F4F5F7] dark:bg-slate-950 border border-transparent dark:border-slate-800/60 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-700 transition-all cursor-pointer colored-scheme"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex text-xs font-bold text-slate-700 dark:text-slate-300">Event Time *</label>
              <input 
                type="time"
                value={newSchedule.time}
                onChange={e => setNewSchedule({...newSchedule, time: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F4F5F7] dark:bg-slate-950 border border-transparent dark:border-slate-800/60 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-700 transition-all cursor-pointer colored-scheme"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex text-xs font-bold text-slate-700 dark:text-slate-300">Location Type Select *</label>
              <div className="relative">
                <select
                  value={newSchedule.type}
                  onChange={e => {
                    const locations = { office: 'Office Meeting', home: 'Home', friends: 'Friends Zone', outside: 'Meeting Outside' };
                    setNewSchedule({...newSchedule, type: e.target.value, location: locations[e.target.value]});
                  }}
                  className="w-full px-4 py-3.5 bg-[#F4F5F7] dark:bg-slate-950 border border-transparent dark:border-slate-800/60 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 appearance-none focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-700 transition-all cursor-pointer"
                >
                  <option value="office" className="dark:bg-slate-900">Office Meeting</option>
                  <option value="home" className="dark:bg-slate-900">Home</option>
                  <option value="friends" className="dark:bg-slate-900">Friends Zone</option>
                  <option value="outside" className="dark:bg-slate-900">Meeting Outside</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-4 bg-[#5551ff] hover:bg-[#4440ef] text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
              >
                Add Schedule
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}