import React, { useState } from 'react';
import { ChevronLeft, Camera, Briefcase, DollarSign, FileText, CheckSquare, Square } from 'lucide-react';

export default function AddProductDrawer({ isOpen, onClose, onSaveProduct }) {
  const [productName, setProductName] = useState('MacBook Pro 2021 14"');
  const [brand, setBrand] = useState('Apple');
  const [price, setPrice] = useState('1200');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [description, setDescription] = useState(
    'This the New creation Of apple. This the New creation Of apple This the New creation Of apple This the New creation Of apple.'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) return;

    onSaveProduct({
      name: productName,
      brand,
      price: `$${price}`,
      order: '0 Piece',
      sales: '$0',
      icon: '💻',
      isTopThree: false
    });
    onClose();
  };

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-[1px] z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl border-l border-slate-100 z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Add a New Product</h2>
          </div>

          <div className="flex justify-center py-4">
            <div className="w-20 h-20 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-all hover:bg-slate-100 relative group">
              <Camera size={20} className="stroke-[1.5]" />
              <div className="absolute inset-0 rounded-full bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <form id="drawer-product-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500">Product Name</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-100 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500">Brand</label>
              <div className="relative">
                <select 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-slate-100 transition-all"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Sony">Sony</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <ChevronLeft size={14} className="-rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500">Price</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 pr-3.5 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:border-slate-100 transition-all"
                  />
                </div>
                
                <div 
                  onClick={() => setIsNegotiable(!isNegotiable)}
                  className="flex items-center gap-2 cursor-pointer select-none text-[11px] font-bold text-slate-600 shrink-0"
                >
                  {isNegotiable ? (
                    <CheckSquare size={16} className="text-[#5551ff] fill-indigo-50" />
                  ) : (
                    <Square size={16} className="text-slate-300" />
                  )}
                  <span>Negotiable</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500">Descriptions</label>
              <textarea 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-slate-600 leading-relaxed placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-100 transition-all resize-none"
              />
            </div>

          </form>
        </div>

        <div className="p-4 border-t border-slate-50 bg-white">
          <button 
            type="submit"
            form="drawer-product-form"
            className="w-full bg-[#5551ff] hover:bg-[#4440ef] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100"
          >
            <Briefcase size={14} fill="currentColor" className="text-white/20" />
            <span>Save Product</span>
          </button>
        </div>

      </div>
    </>
  );
}