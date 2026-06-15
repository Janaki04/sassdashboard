import React, { useState } from 'react';
import { Search, Plus, Calendar, Mail, Trash2, Star, MoreHorizontal, ArrowUpDown } from 'lucide-react';

export default function InvoiceView() {
  const [invoices, setInvoices] = useState([
    { id: '#876364', name: 'Arrora gaur', email: 'arroragaur@gmail.com', date: '12 Dec, 2020', status: 'Complete', star: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { id: '#876123', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Pending', star: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { id: '#876213', name: 'Robert Bacins', email: 'robertbacins@gmail.com', date: '09 Dec, 2020', status: 'Complete', star: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { id: '#876987', name: 'Bethany Jackson', email: 'bethanyjackson@gmail.com', date: '09 Dec, 2020', status: 'Cancel', star: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
    { id: '#871345', name: 'Anne Jacob', email: 'annejacob@gmail.com', date: '10 Dec, 2020', status: 'Complete', star: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80' },
    { id: '#872345', name: 'Bethany jackson', email: 'bethanyjackson@gmail.com', date: '10 Dec, 2020', status: 'Pending', star: true, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80' },
    { id: '#872346', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Complete', star: false, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80' },
    { id: '#873245', name: 'Jhon Deo', email: 'jhondeo32@gmail.com', date: '08 Dec, 2020', status: 'Complete', star: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80' },
    { id: '#876364', name: 'Bethany jackson', email: 'bethanyjackson@gmail.com', date: '02 Dec, 2020', status: 'Cancel', star: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
    { id: '#878769', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '01 Dec, 2020', status: 'Pending', star: false, avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=80&q=80' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredInvoices = invoices.filter(invoice => 
    invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.includes(searchTerm) ||
    invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const toggleStar = (index) => {
    const updated = [...invoices];
    updated[index].star = !updated[index].star;
    setInvoices(updated);
  };

  const deleteSelected = () => {
    setInvoices(prev => prev.filter(inv => !selectedIds.includes(inv.id)));
    setSelectedIds([]);
  };

  const statusStyles = {
    Complete: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    Cancel: 'bg-rose-50 text-rose-600 border border-rose-100'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Invoice List</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700"
            />
          </div>
          
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-indigo-100 shrink-0">
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-50 p-4 shadow-sm overflow-hidden">
        
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-indigo-50/50 px-4 py-3 rounded-xl mb-4 animate-fadeIn">
            <span className="text-xs font-semibold text-indigo-900">
              {selectedIds.length} invoices selected
            </span>
            <button 
              onClick={deleteSelected}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
            >
              <Trash2 size={15} />
              Delete Selected
            </button>
          </div>
        )}

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-xs text-gray-400 font-semibold border-b border-gray-50">
                <th className="p-4 w-12">
                  <input 
                    type="checkbox"
                    checked={filteredInvoices.length > 0 && selectedIds.length === filteredInvoices.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="p-4 cursor-pointer hover:text-gray-600">
                  <div className="flex items-center gap-1">Invoice Id <ArrowUpDown size={12} /></div>
                </th>
                <th className="p-4 cursor-pointer hover:text-gray-600">
                  <div className="flex items-center gap-1">Name <ArrowUpDown size={12} /></div>
                </th>
                <th className="p-4 cursor-pointer hover:text-gray-600">
                  <div className="flex items-center gap-1">Email <ArrowUpDown size={12} /></div>
                </th>
                <th className="p-4 cursor-pointer hover:text-gray-600">
                  <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
                </th>
                <th className="p-4 cursor-pointer hover:text-gray-600">
                  <div className="flex items-center gap-1">Status <ArrowUpDown size={12} /></div>
                </th>
                <th className="p-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50/60 text-sm text-gray-600">
              {filteredInvoices.map((invoice, idx) => {
                const isChecked = selectedIds.includes(invoice.id);
                return (
                  <tr 
                    key={idx} 
                    className={`hover:bg-gray-50/40 transition-colors ${isChecked ? 'bg-indigo-50/20' : ''}`}
                  >
                    <td className="p-4">
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectRow(invoice.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-400">{invoice.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 font-semibold text-gray-900">
                        <img src={invoice.avatar} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                        {invoice.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mail size={14} className="text-emerald-500 shrink-0" />
                        {invoice.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} className="text-indigo-400 shrink-0" />
                        {invoice.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => toggleStar(idx)}
                          className={`transition-colors ${invoice.star ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}
                        >
                          <Star size={16} fill={invoice.star ? 'currentColor' : 'none'} />
                        </button>
                        <button className="text-gray-300 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredInvoices.map((invoice, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border border-gray-100 flex flex-col gap-3 relative ${
                selectedIds.includes(invoice.id) ? 'bg-indigo-50/20 border-indigo-100' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    checked={selectedIds.includes(invoice.id)}
                    onChange={() => toggleSelectRow(invoice.id)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <img src={invoice.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{invoice.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono">{invoice.id}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => toggleStar(idx)} className={invoice.star ? 'text-amber-400' : 'text-gray-300'}>
                    <Star size={16} fill={invoice.star ? 'currentColor' : 'none'} />
                  </button>
                  <button className="text-gray-400">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs border-t border-dashed border-gray-100 pt-2.5">
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail size={13} className="text-emerald-500" />
                  <span>{invoice.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={13} className="text-indigo-400" />
                  <span>{invoice.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full ${statusStyles[invoice.status]}`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium">
            No invoices found matching your criteria.
          </div>
        )}

      </div>
    </div>
  );
}