import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Calendar, Mail, Trash2, Star, MoreHorizontal, Edit, Trash } from 'lucide-react';
import CreateInvoiceModal from './CreateInvoiceModal';

export default function InvoiceView() {
  const [invoices, setInvoices] = useState([
    { id: '#876364', name: 'Arrora gaur', email: 'arroragaur@gmail.com', date: '12 Dec, 2020', status: 'Complete', star: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { id: '#876123', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Pending', star: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { id: '#876213', name: 'Robert Bacins', email: 'robertbacins@gmail.com', date: '09 Dec, 2020', status: 'Complete', star: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { id: '#876365', name: 'Arrora gaur', email: 'arroragaur@gmail.com', date: '12 Dec, 2020', status: 'Complete', star: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { id: '#876124', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Pending', star: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { id: '#876214', name: 'Robert Bacins', email: 'robertbacins@gmail.com', date: '09 Dec, 2020', status: 'Complete', star: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopoverId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddInvoice = (newInvoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.includes(searchTerm) ||
    invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const toggleStar = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, star: !inv.star } : inv));
  };

  const deleteSingleInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    setActivePopoverId(null);
  };

  const deleteSelected = () => {
    setInvoices(prev => prev.filter(inv => !selectedIds.includes(inv.id)));
    setSelectedIds([]);
  };

  const statusStyles = {
    Complete: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50',
    Pending: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50',
    Cancel: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-nunito max-w-7xl mx-auto w-full text-gray-600 dark:text-gray-300">
      
      {/* HEADER BAR AND SEARCH ACTIONS */}
      <div className="flex flex-col pt-10 sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight dark:text-white">Invoice List</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input 
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-100 dark:shadow-none shrink-0"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* CORE DATA COMPONENT CONTAINER Shell */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100/80 dark:border-slate-800/80 p-2 sm:p-4 shadow-xs overflow-visible">
        
        {/* MASS ACTION FLOATING TOOLBAR */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-950/20 px-4 py-3 rounded-xl mb-4 transition-all animate-in fade-in duration-150">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">{selectedIds.length} selected</span>
            <button onClick={deleteSelected} className="flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300">
              <Trash2 size={14} /> Delete Selected
            </button>
          </div>
        )}

        {/* RESPONSIVE CARD VIEW GRID (MOBILE BREAKPOINT) */}
        <div className="block md:hidden space-y-3">
          <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={filteredInvoices.length > 0 && selectedIds.length === filteredInvoices.length} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-950" />
              <span>Select All</span>
            </div>
            <span>{filteredInvoices.length} Records</span>
          </div>

          {filteredInvoices.map((invoice) => {
            const isChecked = selectedIds.includes(invoice.id);
            return (
              <div 
                key={invoice.id} 
                className={`p-4 rounded-xl border transition-all flex flex-col space-y-3 relative overflow-visible ${
                  isChecked 
                    ? 'bg-indigo-50/20 dark:bg-indigo-950/10 border-indigo-200 dark:border-indigo-500/30' 
                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => toggleSelectRow(invoice.id)} 
                      className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 mt-0.5 bg-white dark:bg-slate-950" 
                    />
                    <div>
                      <div className="font-mono text-[10px] font-bold text-gray-400 dark:text-gray-500">{invoice.id}</div>
                      <h4 className="text-sm font-black text-gray-900 dark:text-slate-200 mt-0.5">{invoice.name}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{invoice.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => toggleStar(invoice.id)} className={invoice.star ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}>
                      <Star size={16} fill={invoice.star ? 'currentColor' : 'none'} />
                    </button>
                    <div className="relative">
                      <button onClick={() => setActivePopoverId(activePopoverId === invoice.id ? null : invoice.id)} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1">
                        <MoreHorizontal size={18} />
                      </button>
                      {activePopoverId === invoice.id && (
                        <div ref={popoverRef} className="absolute right-0 top-7 w-32 bg-white dark:bg-slate-950 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 p-1.5 z-50 text-left">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 rounded-lg"><Edit size={14} /> Edit</button>
                          <button onClick={() => deleteSingleInvoice(invoice.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-rose-950/40 rounded-lg"><Trash size={14} /> Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-800/60 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={13} className="text-gray-400 dark:text-gray-500" /> {invoice.date}</span>
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${statusStyles[invoice.status]}`}>{invoice.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULL TABULAR MATRIX VIEW (TABLE LAYOUT FOR DESKTOP MONITORS) */}
        <div className="hidden md:block overflow-x-auto overflow-y-visible">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider border-b border-gray-50 dark:border-slate-800 select-none">
                <th className="p-4 w-12">
                  <input type="checkbox" checked={filteredInvoices.length > 0 && selectedIds.length === filteredInvoices.length} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-950" />
                </th>
                <th className="p-4">Invoice Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/60 dark:divide-slate-800/60 text-xs font-bold text-gray-600 dark:text-gray-300">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className={`hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors ${selectedIds.includes(invoice.id) ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''}`}>
                  <td className="p-4">
                    <input type="checkbox" checked={selectedIds.includes(invoice.id)} onChange={() => toggleSelectRow(invoice.id)} className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-950" />
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-400 dark:text-gray-500">{invoice.id}</td>
                  <td className="p-4 font-black text-gray-900 dark:text-slate-200">{invoice.name}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 font-medium">{invoice.email}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 font-medium">{invoice.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-[11px] font-black rounded-full ${statusStyles[invoice.status]}`}>{invoice.status}</span>
                  </td>
                  <td className="p-4 text-right relative overflow-visible">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => toggleStar(invoice.id)} className={invoice.star ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}>
                        <Star size={16} fill={invoice.star ? 'currentColor' : 'none'} />
                      </button>
                      <div className="relative">
                        <button onClick={() => setActivePopoverId(activePopoverId === invoice.id ? null : invoice.id)} className="text-gray-300 dark:text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 p-1">
                          <MoreHorizontal size={18} />
                        </button>
                        {activePopoverId === invoice.id && (
                          <div ref={popoverRef} className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-950 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 p-1.5 z-50 text-left">
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 rounded-lg"><Edit size={14} /> Edit</button>
                            <button onClick={() => deleteSingleInvoice(invoice.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-rose-950/40 rounded-lg"><Trash size={14} /> Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY PLACEHOLDER RECORDBOX */}
        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            No matching invoices discovered.
          </div>
        )}
      </div>

      <CreateInvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddInvoice} 
      />
    </div>
  );
}