import React, { useState } from 'react';
import { X, Clock, Users, MapPin, Globe } from 'lucide-react';

function CreateEventModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('Event');
  const [eventTitle, setEventTitle] = useState('');

  const tabs = ['Event', 'Reminder', 'Task'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    
    onSave({
      title: eventTitle,
      type: activeTab,
      date: 'Thursday, December 5',
      time: '12:00pm - 1:00pm'
    });
    setEventTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-[2px] font-nunito z-50 flex items-center justify-center p-4">
      {/* OVERLAY FIXED BACKDROP COMMENT MOVED HERE */}
      
      {/* MODAL WRAPPER CONTAINER */}
      <div className="bg-white dark:bg-slate-900 rounded-[28px] w-full max-w-lg shadow-2xl p-6 relative border border-slate-100 dark:border-slate-800/80 animate-in fade-in zoom-in-95 duration-150">
        
        {/* CLOSE CONTROLLER ACTION BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute right-5 top-5 p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/80 rounded-full transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-200 mb-5">Create an Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CATEGORY TAB TOGGLE SELECTOR */}
          <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl w-fit border border-slate-100 dark:border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] dark:text-rose-400 shadow-2xs'
                    : 'text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* MAIN INPUT TEXT ENTRY */}
          <div>
            <input
              type="text"
              placeholder="Add title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#5551ff]/20 dark:focus:ring-indigo-500/20 focus:border-[#5551ff] dark:focus:border-indigo-500 transition-all"
              autoFocus
            />
          </div>

          {/* EVENT META METRICS SHEET */}
          <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-gray-400">
            
            {/* TIME SHEET ROW */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 rounded-full mt-0.5">
                <Clock size={16} fill="currentColor" className="text-white dark:text-slate-900" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-800 dark:text-slate-200 font-bold text-xs">
                  Thursday, December 5 <span className="ml-3 font-medium text-slate-700 dark:text-gray-400">12:00pm  -  1:00pm</span>
                </p>
                <p className="text-[11px] text-slate-400 dark:text-gray-500 flex items-center gap-1">
                  Time zone <span className="text-slate-300 dark:text-gray-700">•</span> Does not repeat
                </p>
                <button type="button" className="text-orange-400 dark:text-orange-500 hover:text-orange-500 font-bold text-[11px] pt-1 block">
                  Find a time
                </button>
              </div>
            </div>

            {/* ACTION TRIGGERS SUBSECTION */}
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                className="flex items-center gap-2 bg-[#5551ff] dark:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#4440ef] dark:hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-100 dark:shadow-none"
              >
                <Users size={14} />
                <span>Add People</span>
              </button>
              <button 
                type="button" 
                className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-gray-400 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <MapPin size={14} className="text-[#5551ff] dark:text-indigo-400" />
                <span>Add location</span>
              </button>
            </div>

            {/* VISIBILITY DETAILS ELEMENT */}
            <div className="flex items-start gap-4 pt-2">
              <div className="p-2 bg-orange-50 dark:bg-orange-950/40 text-orange-400 dark:text-orange-500 rounded-full mt-0.5">
                <Globe size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">John Deo</h4>
                <p className="text-[11px] text-slate-400 dark:text-gray-500">
                  Busy <span className="text-slate-300 dark:text-gray-700">•</span> Default visibility <span className="text-slate-300 dark:text-gray-700">•</span> notify 30 minutes before
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON CONTROL FOOTER */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800/60">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!eventTitle.trim()}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#5551ff] dark:bg-indigo-500 hover:bg-[#4440ef] dark:hover:bg-indigo-600 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-[#5551ff] dark:disabled:hover:bg-indigo-500 shadow-md shadow-indigo-100 dark:shadow-none"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CreateEventModal;