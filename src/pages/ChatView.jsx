import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';

export default function ChatView() {
  // Mock Data for Chat Threads
  const [threads, setThreads] = useState([
    { id: 1, name: 'Shelby Goode', text: 'Lorem Ipsum is simply dummy text of the printing', time: '1 min ago', online: true, category: 'Personal', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Robert Bacins', text: 'Lorem Ipsum is simply dummy text of the printing', time: '9 min ago', online: false, category: 'Personal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'John Carlio', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '15 min ago', online: true, category: 'Personal', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Adriene Watson', text: 'Lorem Ipsum is simply dummy text of the printing', time: '21 min ago', online: true, category: 'Teams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Jhon Deo', text: 'Lorem Ipsum is simply dummy text of the printing', time: '29 min ago', online: false, category: 'Personal', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
    { id: 6, name: 'Mark Ruffalo', text: 'Lorem Ipsum is simply dummy text of the printing', time: '45 min ago', online: true, category: 'Teams', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
    { id: 7, name: 'Bethany Jackson', text: 'Lorem Ipsum is simply dummy text of the printing', time: '1h ago', online: false, category: 'All', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' }
  ]);

  const [activeThreadId, setActiveThreadId] = useState(3); // Defaulting to John Carlio
  const [activeTab, setActiveTab] = useState('Personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  
  // Chat Conversation State keyed by Thread ID
  const [conversations, setConversations] = useState({
    3: [
      { id: 1, type: 'incoming', text: 'Lorem Ipsum is simply', time: null },
      { id: 2, type: 'incoming', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '09:02 PM' },
      { id: 3, type: 'media', images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
      ]},
      { id: 4, type: 'incoming', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '09:04 PM' }
    ]
  });

  const chatEndRef = useRef(null);

  // Auto scroll to bottom when messages or active thread updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeThreadId]);

  const currentThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const currentMessages = conversations[activeThreadId] || [];

  // Filter threads based on category tabs and search inputs
  const filteredThreads = threads.filter(t => {
    const matchesTab = activeTab === 'All' || t.category === activeTab;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      type: 'outgoing',
      text: typedMessage,
      time: timestamp
    };

    setConversations(prev => ({
      ...prev,
      [activeThreadId]: [...(prev[activeThreadId] || []), newMessage]
    }));

    // Mock response trigger for UX feel
    setTypedMessage('');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] p-2 sm:p-4 lg:p-6 gap-4 font-sans text-gray-600 antialiased overflow-hidden">
      
      {/* SIDEBAR: Messages List */}
      <div className={`w-full md:w-[360px] bg-white rounded-3xl border border-gray-100/70 shadow-sm flex flex-col shrink-0 transition-all duration-300 ${activeThreadId && 'hidden md:flex'}`}>
        
        {/* Header Search Panel */}
        <div className="p-5 pb-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Message</h2>
            <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-100">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex px-5 border-b border-gray-100 text-xs font-semibold text-gray-400">
          {['All', 'Personal', 'Teams'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 relative border-b-2 transition-all ${
                activeTab === tab ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Thread Feed Stack */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredThreads.map(thread => {
            const isActive = thread.id === activeThreadId;
            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all select-none ${
                  isActive ? 'bg-indigo-50/40 border border-indigo-100/20' : 'hover:bg-slate-50/80 border border-transparent'
                }`}
              >
                <div className="relative shrink-0 mt-0.5">
                  <img src={thread.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                  {thread.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold truncate ${isActive ? 'text-indigo-950' : 'text-gray-900'}`}>{thread.name}</h4>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">{thread.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-medium">
                    {thread.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WINDOW PANEL: Active Channel view */}
      <div className={`flex-1 bg-white rounded-3xl border border-gray-100/70 shadow-sm flex flex-col overflow-hidden relative ${!activeThreadId && 'hidden md:flex'}`}>
        
        {/* Profile Chat Toolbar Context */}
        <div className="px-6 py-4 border-b border-gray-100/80 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            {/* Back button visible only on Mobile screens */}
            <button onClick={() => setActiveThreadId(null)} className="md:hidden p-1.5 hover:bg-slate-100 rounded-lg text-gray-500 mr-1">
              ←
            </button>
            <div className="relative shrink-0">
              <img src={currentThread.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              {currentThread.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 leading-tight">{currentThread.name}</h3>
              <p className="text-[10px] font-medium text-slate-400">{currentThread.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-gray-500"><Phone size={16} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-gray-500"><Video size={16} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-gray-500"><MoreVertical size={16} /></button>
          </div>
        </div>

        {/* Chat History Flow Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {currentMessages.map((msg) => {
            const isOutgoing = msg.type === 'outgoing';

            if (msg.type === 'media') {
              return (
                <div key={msg.id} className="flex justify-end gap-3 max-w-[85%] ml-auto mt-2">
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    {msg.images.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm group cursor-pointer aspect-[4/3] bg-slate-50">
                        <img src={img} alt="Shared asset preview" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex items-end gap-3 max-w-[75%] ${isOutgoing ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                {!isOutgoing && (
                  <img src={currentThread.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mb-1" />
                )}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm/50 ${
                    isOutgoing 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-indigo-50/60 text-slate-700 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.time && (
                    <p className={`text-[9px] text-gray-400 font-medium ${isOutgoing ? 'text-right' : 'text-left pl-1'}`}>
                      {msg.time}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input Ribbon Block */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100/50 rounded-2xl px-4 py-2">
            <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={typedMessage}
              onChange={e => setTypedMessage(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs font-medium text-gray-700 focus:outline-none placeholder-gray-400 py-2 pl-1"
            />
            <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Smile size={18} />
            </button>
            <button 
              type="submit" 
              disabled={!typedMessage.trim()}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:hover:bg-indigo-600 shadow-md shadow-indigo-100/50 shrink-0"
            >
              <Send size={14} fill="currentColor" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}