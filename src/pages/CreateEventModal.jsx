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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      {/* Modal Wrapper Box */}
      <div className="bg-white rounded-[28px] w-full max-w-lg shadow-2xl p-6 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button Cross Icon */}
        <button 
          onClick={onClose} 
          className="absolute right-5 top-5 p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-full transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-bold text-slate-900 mb-5">Create an Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pill Selector Menu Category Tabs */}
          <div className="flex bg-slate-50 p-1 rounded-xl w-fit border border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-[#ef4444]/10 text-[#ef4444] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Core Title input element row */}
          <div>
            <input
              type="text"
              placeholder="Add title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/80 border border-slate-100 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#5551ff]/20 focus:border-[#5551ff] transition-all"
              autoFocus
            />
          </div>

          {/* Meta Info Section Rows */}
          <div className="space-y-4 text-xs font-medium text-slate-600">
            {/* Time Slot Row Line item */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 text-orange-500 rounded-full mt-0.5">
                <Clock size={16} fill="currentColor" className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-800 font-bold text-xs">
                  Thursday, December 5 <span className="ml-3 font-medium text-slate-700">12:00pm  -  1:00pm</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Time zone <span className="text-slate-300">•</span> Does not repeat
                </p>
                <button type="button" className="text-orange-400 hover:text-orange-500 font-bold text-[11px] pt-1 block">
                  Find a time
                </button>
              </div>
            </div>

            {/* People Profile dynamic tagging option item */}
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                className="flex items-center gap-2 bg-[#5551ff] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#4440ef] transition-colors shadow-sm shadow-indigo-100"
              >
                <Users size={14} />
                <span>Add People</span>
              </button>
              <button 
                type="button" 
                className="flex items-center gap-2 bg-white border border-slate-100 text-slate-500 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <MapPin size={14} className="text-[#5551ff]" />
                <span>Add location</span>
              </button>
            </div>

            {/* Account Visibility details element block info */}
            <div className="flex items-start gap-4 pt-2">
              <div className="p-2 bg-orange-50 text-orange-400 rounded-full mt-0.5">
                <Globe size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800">John Deo</h4>
                <p className="text-[11px] text-slate-400">Busy <span className="text-slate-300">•</span> Default visibility <span className="text-slate-300">•</span> notify 30 minutes before</p>
              </div>
            </div>
          </div>

          {/* Action Ribbon Form Submission buttons block footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!eventTitle.trim()}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#5551ff] hover:bg-[#4440ef] rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-[#5551ff] shadow-md shadow-indigo-100"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CreateEventModal