import React, { useState } from 'react';
import { ChevronLeft, Camera, Briefcase, CheckSquare, Square } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AddProductDrawer({ isOpen, onClose, onSaveProduct }) {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('Apple'); 
  const [price, setPrice] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [description, setDescription] = useState(
    'This the New creation Of apple. This the New creation Of apple This the New creation Of apple This the New creation Of apple.'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedName = productName.trim();
    const trimmedDesc = description.trim();

    if (!trimmedName) {
      toast.error("Product name is required.");
      return;
    }

    if (!brand) {
      toast.error("Please select a valid brand.");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price greater than 0.");
      return;
    }

    if (!trimmedDesc) {
      toast.error("Please provide a product description.");
      return;
    }

    onSaveProduct({
      name: trimmedName,
      brand,
      price: `$${parseFloat(price).toFixed(2)}`,
      order: '0 Piece',
      sales: '$0',
      icon: brand === 'Apple' ? '💻' : brand === 'Samsung' ? '📱' : '🎧',
      isTopThree: false
    });

    setProductName('');
    setBrand('Apple');
    setPrice('');
    setIsNegotiable(true);
    setDescription('');
    
    onClose();
  };

  return (
    <>
      {/* DRAWER BACKDROP LAYER */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/30 dark:bg-slate-950/60 backdrop-blur-[1px] font-nunito z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* DRAWER MAIN BODY WRAPPER */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-100 dark:border-slate-800/80 z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* INTERACTIVE COMPONENT FORMS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="flex items-center gap-4 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-start text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Add a New Product</h2>
          </div>

          {/* AVATAR/CAMERA INTERACTIVE WRAPPER */}
          <div className="flex justify-center py-4">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-800/60 relative group">
              <Camera size={20} className="stroke-[1.5]" />
              <div className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <form id="drawer-product-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* INPUT ELEMENT: PRODUCT NAME */}
            <div className="space-y-1.5">
              <label className="flex text-[11px] font-bold text-slate-500 dark:text-gray-400">Product Name *</label>
              <input 
                type="text" 
                placeholder="e.g. MacBook Pro"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-100 dark:focus:border-slate-800 transition-all"
              />
            </div>

            {/* SELECTION DROPDOWN: BRAND METRICS */}
            <div className="space-y-1.5">
              <label className="flex text-[11px] font-bold text-slate-500 dark:text-gray-400">Brand *</label>
              <div className="relative">
                <select 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 appearance-none focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-100 dark:focus:border-slate-800 transition-all cursor-pointer"
                >
                  <option value="Apple" className="dark:bg-slate-900">Apple</option>
                  <option value="Samsung" className="dark:bg-slate-900">Samsung</option>
                  <option value="Sony" className="dark:bg-slate-900">Sony</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 dark:text-gray-500">
                  <ChevronLeft size={14} className="-rotate-90" />
                </div>
              </div>
            </div>

            {/* COMPOSED INPUT: PRICE CONFIG + CUSTOM CHECKBOX */}
            <div className="space-y-1.5">
              <label className="flex text-[11px] font-bold text-slate-500 dark:text-gray-400">Price *</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 font-bold text-xs">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-100 dark:focus:border-slate-800 transition-all"
                  />
                </div>
                
                <div 
                  onClick={() => setIsNegotiable(!isNegotiable)}
                  className="flex items-center gap-2 cursor-pointer select-none text-[11px] font-bold text-slate-600 dark:text-gray-400 shrink-0"
                >
                  {isNegotiable ? (
                    <CheckSquare size={16} className="text-[#5551ff] dark:text-indigo-400 fill-indigo-50 dark:fill-indigo-950/30" />
                  ) : (
                    <Square size={16} className="text-slate-300 dark:text-gray-700" />
                  )}
                  <span>Negotiable</span>
                </div>
              </div>
            </div>

            {/* MULTILINE ENTRY FIELD: PRODUCT DESCRIPTIONS */}
            <div className="space-y-1.5">
              <label className="flex text-[11px] font-bold text-slate-500 dark:text-gray-400">Descriptions *</label>
              <textarea 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-transparent rounded-xl text-xs font-medium text-slate-600 dark:text-gray-300 leading-relaxed placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-100 dark:focus:border-slate-800 transition-all resize-none"
              />
            </div>

          </form>
        </div>

        {/* CONTAINER STICKY FOOTER ACTION BAR */}
        <div className="p-4 border-t border-slate-50 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <button 
            type="submit"
            form="drawer-product-form"
            className="w-full bg-[#5551ff] hover:bg-[#4440ef] dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100 dark:shadow-none"
          >
            <Briefcase size={14} fill="currentColor" className="text-white/20 dark:text-white/10" />
            <span>Save Product</span>
          </button>
        </div>

      </div>
    </>
  );
}