import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, ChevronDown, Camera, Check, ShieldCheck, Mail, Eye } from 'lucide-react';
import { toast } from "react-toastify";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
];

export default function SettingsScreen({ externalProfile, setExternalProfile }) {
  const [innerTab, setInnerTab] = useState('Profile'); 
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const [profile, setProfile] = useState({ ...externalProfile });
  
  useEffect(() => {
    setProfile({ ...externalProfile });
  }, [externalProfile]);

  const [errors, setErrors] = useState({});

  const [security, setSecurity] = useState({
    twoFactor: true,
    metadataTracking: false,
  });

  const [notifications, setNotifications] = useState([
    { id: 'inventory', title: 'Email dispatch notifications upon inventory alerts', state: true },
    { id: 'weekly', title: 'Weekly summary metric analytics insight updates', state: true },
    { id: 'push', title: 'Push notification warning alerts on client structural edits', state: false }
  ]);

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profile.firstName?.trim()) {
      tempErrors.firstName = 'First name is required';
    }
    if (!profile.lastName?.trim()) {
      tempErrors.lastName = 'Last name is required';
    }
    if (!profile.email?.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(profile.email)) {
      tempErrors.email = 'Please provide a valid email structure';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (setExternalProfile) {
        setExternalProfile(profile);
      }
      toast.success('Profile credentials synchronized successfully!');
    } else {
      toast.error('Please correct the validation items below.');
    }
  };

  const handleResetSettings = () => {
    setProfile({ ...externalProfile });
    setErrors({});
    setShowAvatarPicker(false);
    toast.info('Profile changes discarded.');
  };

  const handleSelectAvatar = (url) => {
    setProfile({ ...profile, avatarUrl: url });
    setShowAvatarPicker(false);
    toast.info("Avatar updated! Save changes to sync profile layout.");
  };

  const toggleSecuritySetting = (key) => {
    setSecurity(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.success(`${key === 'twoFactor' ? 'Two-Factor Auth' : 'Metadata Tracking'} updated!`);
      return updated;
    });
  };

  const toggleNotificationSetting = (index) => {
    setNotifications(prev => {
      const updated = [...prev];
      updated[index].state = !updated[index].state;
      return updated;
    });
  };

  return (
    <div className="p-6 lg:p-4 space-y-6 font-nunito animate-fadeIn text-gray-600 dark:text-gray-300">
      <div className="flex flex-col pt-10 sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
        
        {/* SIDE BAR SELECTION PANEL */}
        <div className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 space-y-1.5 shadow-3xs">
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
                    ? 'bg-[#EEEDFD] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400' 
                    : 'text-slate-500 dark:text-gray-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span className={isActive ? 'text-[#5551ff] dark:text-indigo-400' : 'text-slate-400 dark:text-gray-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* DETAILS WORKSPACE HUB */}
        <div className="col-span-12 lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xs">
          
          {/* PROFILE VIEW WORKSPACE */}
          {innerTab === 'Profile' && (
            <div className="animate-in fade-in duration-150 space-y-6">
              <div>
                <h3 className="text-start text-sm font-black text-[#0B0E1F] dark:text-slate-200 tracking-tight">Profile Setup</h3>
                <p className="text-start text-xs text-slate-400 dark:text-gray-500 mt-1">Configure identity profile attributes distributed across dashboard analytics.</p>
              </div>
              
              <hr className="border-slate-50 dark:border-slate-800/60" />

              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-5">
                    <div 
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className="relative group cursor-pointer shrink-0"
                    >
                      <img 
                        src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-[#EEEDFD] dark:ring-indigo-950/50 border-2 border-white dark:border-slate-900 shadow-sm transition-transform group-hover:scale-102"
                        alt="Current Avatar Identity" 
                      />
                      <div className="absolute bottom-0 right-0 p-2 bg-[#5551ff] dark:bg-indigo-500 rounded-full text-white shadow-md hover:bg-[#4440ef] dark:hover:bg-indigo-600 transition-colors">
                        <Camera size={11} className="stroke-[2.5]" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-700 dark:text-slate-300">Profile Asset Cover</h4>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 mt-0.5">Click your photo avatar to pick defaults or link an external image.</p>
                    </div>
                  </div>

                  {showAvatarPicker && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100/70 dark:border-slate-800/60 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div>
                        <p className="text-left text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">Select Profile Avatar</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          {PRESET_AVATARS.map((avatar, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectAvatar(avatar)}
                              className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-150 p-0.5 ${
                                profile.avatarUrl === avatar ? 'ring-2 ring-[#5551ff] dark:ring-indigo-500 scale-105' : 'hover:scale-105 opacity-75 hover:opacity-100'
                              }`}
                            >
                              <img src={avatar} alt="Preset Option" className="w-full h-full rounded-full object-cover" />
                              {profile.avatarUrl === avatar && (
                                <div className="absolute inset-0 bg-[#5551ff]/30 dark:bg-indigo-500/30 flex items-center justify-center text-white rounded-full">
                                  <Check size={14} className="stroke-[3]" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                        <label className="flex text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">Or Use Custom External Image URL</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="https://example.com/your-photo.jpg"
                            value={profile.avatarUrl || ''}
                            onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                            className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#5551ff] dark:focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowAvatarPicker(false);
                              toast.info("External link attached! Click Save Changes to synchronize profile.");
                            }}
                            className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[11px] font-black px-4 py-2.5 rounded-xl transition-all"
                          >
                            Apply Link
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">First Name</label>
                    <input 
                      type="text" 
                      value={profile.firstName || ''}
                      onChange={(e) => {
                        setProfile({...profile, firstName: e.target.value});
                        if (errors.firstName) setErrors({...errors, firstName: ''});
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all ${
                        errors.firstName ? 'border-red-400 focus:border-red-500 bg-red-50/20 dark:bg-red-950/10' : 'border-transparent focus:border-slate-200 dark:focus:border-slate-800'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 dark:text-red-400 text-[10px] font-bold text-left">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">Last Name</label>
                    <input 
                      type="text" 
                      value={profile.lastName || ''}
                      onChange={(e) => {
                        setProfile({...profile, lastName: e.target.value});
                        if (errors.lastName) setErrors({...errors, lastName: ''});
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all ${
                        errors.lastName ? 'border-red-400 focus:border-red-500 bg-red-50/20 dark:bg-red-950/10' : 'border-transparent focus:border-slate-200 dark:focus:border-slate-800'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 dark:text-red-400 text-[10px] font-bold text-left">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="flex text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">Primary Account Contact Email</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={profile.email || ''}
                      onChange={(e) => {
                        setProfile({...profile, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: ''});
                      }}
                      className={`w-full pl-11 pr-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-500 bg-red-50/20 dark:bg-red-950/10' : 'border-transparent focus:border-slate-200 dark:focus:border-slate-800'
                      }`}
                    />
                    <Mail size={14} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${errors.email ? 'text-red-400 dark:text-red-400' : 'text-slate-400 dark:text-gray-500'}`} />
                  </div>
                  {errors.email && <p className="text-red-500 dark:text-red-400 text-[10px] font-bold text-left">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">Language preference</label>
                    <div className="relative">
                      <select 
                        value={profile.language || 'English (US)'}
                        onChange={(e) => setProfile({...profile, language: e.target.value})}
                        className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent appearance-none focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all cursor-pointer"
                      >
                        <option className="dark:bg-slate-900">English (US)</option>
                        <option className="dark:bg-slate-900">Spanish (ES)</option>
                        <option className="dark:bg-slate-900">German (DE)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-wide">System Regional Timezone</label>
                    <div className="relative">
                      <select 
                        value={profile.timezone || 'GMT -05:00'}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                        className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent appearance-none focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all cursor-pointer"
                      >
                        <option className="dark:bg-slate-900">GMT -05:00</option>
                        <option className="dark:bg-slate-900">GMT +01:00</option>
                        <option className="dark:bg-slate-900">GMT +05:30</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-50 dark:border-slate-800/60 pt-2" />

                <div className="flex items-center justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={handleResetSettings}
                    className="px-5 py-3 rounded-xl text-xs font-black text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-300 transition-all"
                  >
                    Reset Changes
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#5551ff] hover:bg-[#4440ef] dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3.5 rounded-xl text-xs font-black shadow-md shadow-indigo-100 dark:shadow-none transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY VIEW WORKSPACE */}
          {innerTab === 'Security' && (
            <div className="animate-in fade-in duration-150 space-y-6">
              <div>
                <h3 className="text-start text-sm font-black text-[#0B0E1F] dark:text-slate-200 tracking-tight">Security Credentials</h3>
                <p className="text-start text-xs text-slate-400 dark:text-gray-500 mt-1">Manage network data protection layers, passcode sequences and access keys.</p>
              </div>
              
              <hr className="border-slate-50 dark:border-slate-800/60" />

              <div className="space-y-4">
                <div className="p-4 bg-[#F8F9FB] dark:bg-slate-950 border border-slate-100/70 dark:border-slate-800/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-[#5551ff] dark:text-indigo-400 rounded-xl"><ShieldCheck size={16} /></div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-300">Two-Factor Mobile Authentication</h4>
                      <p className="text-[11px] font-bold text-slate-400 dark:text-gray-500 mt-0.5">Enforces protective secondary confirmation checks on account logs.</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => toggleSecuritySetting('twoFactor')}
                    className={`w-10 h-6 rounded-full p-1 flex items-center transition-all duration-200 ${security.twoFactor ? 'bg-[#5551ff] dark:bg-indigo-500 justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'}`}
                  >
                    <div className="w-4 h-4 bg-white dark:bg-slate-300 rounded-full shadow-xs" />
                  </button>
                </div>

                <div className="p-4 bg-[#F8F9FB] dark:bg-slate-950 border border-slate-100/70 dark:border-slate-800/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-gray-400 rounded-xl"><Eye size={16} /></div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-300">In-Session Metadata Tracking</h4>
                      <p className="text-[11px] font-bold text-slate-400 dark:text-gray-500 mt-0.5">Records precise timestamps across connected terminal locations.</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => toggleSecuritySetting('metadataTracking')}
                    className={`w-10 h-6 rounded-full p-1 flex items-center transition-all duration-200 ${security.metadataTracking ? 'bg-[#5551ff] dark:bg-indigo-500 justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'}`}
                  >
                    <div className="w-4 h-4 bg-white dark:bg-slate-300 rounded-full shadow-xs" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION VIEW WORKSPACE */}
          {innerTab === 'Notification' && (
            <div className="animate-in fade-in duration-150 space-y-6">
              <div>
                <h3 className="text-start text-sm font-black text-[#0B0E1F] dark:text-slate-200 tracking-tight">Notification Channels</h3>
                <p className="text-start text-xs text-slate-400 dark:text-gray-500 mt-1">Isolate and direct automated pipeline alert streams to preferred addresses.</p>
              </div>
              
              <hr className="border-slate-50 dark:border-slate-800/60" />

              <div className="space-y-3.5">
                {notifications.map((notif, nIdx) => (
                  <button
                    key={notif.id}
                    type="button"
                    onClick={() => toggleNotificationSetting(nIdx)}
                    className="w-full flex items-start gap-3.5 py-1.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 rounded-xl transition-colors text-left"
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${notif.state ? 'bg-[#5551ff] dark:bg-indigo-500 border-transparent text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-transparent'}`}>
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-start text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{notif.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}