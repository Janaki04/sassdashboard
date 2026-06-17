import React, { useState } from 'react';
import { User, Lock, Bell, ChevronDown, Camera, Check, ShieldCheck, Mail, Eye } from 'lucide-react';

export default function SettingsScreen() {
  const [innerTab, setInnerTab] = useState('Profile'); 
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Deo',
    email: 'johndoe2211@gmail.com',
    phone: '+33 757 005 467',
    language: 'English (US)',
    timezone: 'GMT -05:00'
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Global dashboard configuration updated successfully!');
  };

  return (
    <div className="p-6 lg:p-4 space-y-6 animate-fadeIn">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Settings</h2>
            </div>
    <div className="grid grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
        
      <div className="col-span-12 lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-4 space-y-1.5 shadow-3xs">
        {[
          { id: 'Profile', label: 'My Profile', icon: <User size={15} /> },
          { id: 'Security', label: 'Security', icon: <Lock size={15} /> },
          { id: 'Notification', label: 'Notification', icon: <Bell size={15} /> },
        ].map((item) => {
          const isActive = innerTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setInnerTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-black transition-all ${
                isActive 
                  ? 'bg-[#EEEDFD] text-[#5551ff]' 
                  : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800'
              }`}
            >
              <span className={isActive ? 'text-[#5551ff]' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="col-span-12 lg:col-span-9 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs">
        
        {innerTab === 'Profile' && (
          <div className="animate-in fade-in duration-150 space-y-6">
            <div>
              <h3 className="text-sm font-black text-[#0B0E1F] tracking-tight">Profile Setup</h3>
              <p className="text-xs text-slate-400 mt-1">Configure identity profile attributes distributed across dashboard analytics.</p>
            </div>
            
            <hr className="border-slate-50" />

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="relative group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-[#EEEDFD] border-2 border-white shadow-sm"
                    alt="Current Avatar Identity" 
                  />
                  <div className="absolute bottom-0 right-0 p-2 bg-[#5551ff] rounded-full text-white shadow-md hover:bg-[#4440ef] transition-colors">
                    <Camera size={11} className="stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-700">Profile Asset Cover</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Supports PNG, JPG, or GIF formats. Maximum file threshold 4MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">First Name</label>
                  <input 
                    type="text" 
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Last Name</label>
                  <input 
                    type="text" 
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Primary Account Contact Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
                  />
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Language preference</label>
                  <div className="relative">
                    <select 
                      value={profile.language}
                      onChange={(e) => setProfile({...profile, language: e.target.value})}
                      className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent appearance-none focus:outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer"
                    >
                      <option>English (US)</option>
                      <option>Spanish (ES)</option>
                      <option>German (DE)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wide">System Regional Timezone</label>
                  <div className="relative">
                    <select 
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent appearance-none focus:outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer"
                    >
                      <option>GMT -05:00</option>
                      <option>GMT +01:00</option>
                      <option>GMT +05:30</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <hr className="border-slate-50 pt-2" />

              <div className="flex items-center justify-end gap-3">
                <button type="button" className="px-5 py-3 rounded-xl text-xs font-black text-slate-400 hover:text-slate-700 transition-all">
                  Reset Changes
                </button>
                <button type="submit" className="bg-[#5551ff] hover:bg-[#4440ef] text-white px-6 py-3.5 rounded-xl text-xs font-black shadow-md shadow-indigo-100 transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {innerTab === 'Security' && (
          <div className="animate-in fade-in duration-150 space-y-6">
            <div>
              <h3 className="text-sm font-black text-[#0B0E1F] tracking-tight">Security Credentials</h3>
              <p className="text-xs text-slate-400 mt-1">Manage network data protection layers, passcode sequences and access keys.</p>
            </div>
            
            <hr className="border-slate-50" />

            <div className="space-y-4">
              <div className="p-4 bg-[#F8F9FB] border border-slate-100/70 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-indigo-50 text-[#5551ff] rounded-xl"><ShieldCheck size={16} /></div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Two-Factor Mobile Authentication</h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">Enforces protective secondary confirmation checks on account logs.</p>
                  </div>
                </div>
                <div className="w-10 h-6 bg-[#5551ff] rounded-full p-1 cursor-pointer flex justify-end items-center transition-all">
                  <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FB] border border-slate-100/70 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-slate-100 text-slate-500 rounded-xl"><Eye size={16} /></div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">In-Session Metadata Tracking</h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">Records precise timestamps across connected terminal locations.</p>
                  </div>
                </div>
                <div className="w-10 h-6 bg-slate-200 rounded-full p-1 cursor-pointer flex justify-start items-center transition-all">
                  <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {innerTab === 'Notification' && (
          <div className="animate-in fade-in duration-150 space-y-6">
            <div>
              <h3 className="text-sm font-black text-[#0B0E1F] tracking-tight">Notification Channels</h3>
              <p className="text-xs text-slate-400 mt-1">Isolate and direct automated pipeline alert streams to preferred addresses.</p>
            </div>
            
            <hr className="border-slate-50" />

            <div className="space-y-3.5">
              {[
                { title: 'Email dispatch notifications upon inventory alerts', state: true },
                { title: 'Weekly summary metric analytics insight updates', state: true },
                { title: 'Push notification warning alerts on client structural edits', state: false }
              ].map((notif, nIdx) => (
                <div key={nIdx} className="flex items-start gap-3.5 py-1.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer border transition-colors ${notif.state ? 'bg-[#5551ff] border-transparent text-white' : 'bg-white border-slate-200 text-transparent'}`}>
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 leading-tight">{notif.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}