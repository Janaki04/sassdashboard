import React, { useState } from 'react';
import { X, Calendar, MapPin, Trash2, Camera, Download, Printer, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateInvoiceModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    id: '#876370',
    date: '2021-12-01',
    name: 'Alison G.',
    email: 'Example@gmail.com',
    address: 'Street'
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'ipod 2021', rate: 1000, qty: 10 },
    { id: 2, name: 'Apple Mackbook', rate: 1500, qty: 10 },
    { id: 3, name: 'i phone 12', rate: 885, qty: 10 }
  ]);

  const handleProductChange = (id, field, value) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [field]: field === 'name' ? value : Number(value) || 0 };
      }
      return p;
    }));
  };
  const handlesend=(text)=>{
    toast.success(text)
    onClose() 

  }

  const addRow = () => {
    setProducts([...products, { id: Date.now(), name: '', rate: 0, qty: 1 }]);
  };

  const removeRow = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const subtotal = products.reduce((acc, curr) => acc + (curr.rate * curr.qty), 0);
  const discount = subtotal * 0.05; // 5% discount matching design
  const total = subtotal - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: form.id,
      name: form.name,
      email: form.email,
      date: new Date(form.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
      star: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f8fafc] rounded-3xl w-full max-w-6xl shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-hidden relative border border-white">
        
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10 p-1 bg-white rounded-full shadow-sm">
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto bg-white space-y-6">
          <h2 className="text-start text-xl font-bold text-[#0d1424]">Create New Invoice</h2>

          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-slate-100/80 cursor-pointer transition-colors">
              <Camera size={24} className="text-slate-400 mb-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex text-sm font-semibold text-[#0d1424]">Invoice Id</label>
              <input type="text" value={form.id} onChange={e => setForm({...form, id: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1.5 relative">
              <label className="flex text-sm font-semibold text-[#0d1424]">Date</label>
              <div className="relative">
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex text-sm font-semibold text-[#0d1424]">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex text-sm font-semibold text-[#0d1424]">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1.5 relative">
              <label className="flex text-sm font-semibold text-[#0d1424]">Address</label>
              <div className="relative">
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <MapPin size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-start text-sm font-bold text-[#0d1424]">Product Description</h3>
              <button type="button" onClick={addRow} className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-400 px-1">
                <div className="flex col-span-5">Product Name</div>
                <div className="flex col-span-3">Rate</div>
                <div className="flex col-span-2">QTY</div>
                <div className="flex col-span-2 text-right">Amount</div>
              </div>

              {products.map(product => (
                <div key={product.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input type="text" value={product.name} onChange={e => handleProductChange(product.id, 'name', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 rounded-lg text-xs font-semibold text-indigo-600 focus:outline-none" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" value={product.rate} onChange={e => handleProductChange(product.id, 'rate', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-gray-700 focus:outline-none" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={product.qty} onChange={e => handleProductChange(product.id, 'qty', e.target.value)} className="w-full px-2.5 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-gray-700 focus:outline-none" />
                  </div>
                  <div className="col-span-2 flex items-center justify-between pl-1">
                    <span className="text-xs font-bold text-emerald-600">${product.rate * product.qty}</span>
                    <button type="button" onClick={() => removeRow(product.id)} className="text-rose-400 hover:text-rose-600 p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
            <button type="button" 
            onClick ={()=>{handlesend("Send Created Sucessfully")}}
            className="flex-1 py-3 text-sm font-bold text-indigo-600 bg-white border border-gray-100 rounded-xl hover:bg-slate-50 transition-colors text-center">
              Send Invoice
            </button>
            <button 
            onClick ={()=>{handlesend("Invoice Created Sucessfully")}}
            type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 text-center">
              Create Invoice
            </button>
          </div>
        </form>

        <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-[#f8fafc] overflow-y-auto space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-start text-lg font-bold text-[#0d1424]">Preview</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-600 hover:text-indigo-700">
                <Download size={16} />
              </button>
              <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-600 hover:text-indigo-700">
                <Printer size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-[11px] text-slate-500 space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-base">J</div>
                <div className="text-right space-y-0.5 text-[9px]">
                  <p className='text-start'>your.mail@gmail.com</p>
                  <p className='text-start'>+386 989 271 3115</p>
                </div>
              </div>

              <div className="flex justify-between items-end mt-6">
                <div className="space-y-1">
                  <p className="text-start text-[9px] uppercase tracking-wider font-bold text-slate-400">Recipient</p>
                  <p className="text-start font-bold text-slate-800">{form.name || 'John Smith'}</p>
                  <p className="text-start text-[10px] leading-relaxed">4304 Liberty Avenue<br/>92680 Tustin, CA<br/>VAT no.: 12345678</p>
                  <p className="text-start pt-1 text-[9px] text-indigo-500">{form.email}</p>
                </div>
                <div className="text-right space-y-1">
                  <h3 className="text-start text-lg font-bold text-slate-800 tracking-tight leading-none mb-1">Invoice</h3>
                  <p><span className="text-start font-semibold text-slate-400 text-[9px]">INVOICE NO.</span> <br/>{form.id || '001/2021'}</p>
                  <p><span className="text-start font-semibold text-slate-400 text-[9px]">INVOICE DATE</span> <br/>{form.date || 'January 1, 2021'}</p>
                </div>
              </div>

              <table className="w-full mt-8 border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2 text-left">Task Description</th>
                    <th className="py-2 text-center">Hours</th>
                    <th className="py-2 text-center">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="py-2 text-left text-slate-800">{product.name || 'Untitled item'}</td>
                      <td className="py-2 text-center">{product.qty}</td>
                      <td className="py-2 text-center">{product.rate} USD</td>
                      <td className="py-2 text-right font-bold">{product.rate * product.qty},00 USD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div className="w-1/2 ml-auto space-y-1.5 border-t border-slate-100 pt-3 text-[10px]">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-slate-800">{subtotal},00 USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>DISCOUNT 5%</span>
                  <span className="font-bold">{discount},00 USD</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-800 pt-1 border-t border-dashed border-slate-100">
                  <span>TOTAL</span>
                  <span className="text-indigo-600">${total},00 USD</span>
                </div>
              </div>

              <div className="text-center text-[8px] text-slate-400 border-t border-slate-100 pt-4 space-y-1">
                <p>Transfer the amount to the business account below. Please include invoice number on your check.</p>
                <p className="font-medium text-slate-600">BANK: <span className="font-bold text-slate-800">FTSBUS33</span> • IBAN: <span className="font-bold text-slate-800">GB82-1111-2222-3333</span></p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}