import React, { useState } from 'react';
import { 
  Plus, ChevronDown, Award, MoreHorizontal, ShoppingCart, 
  Box, TrendingUp, Mail, Phone, MapPin, Edit2, Trash2, X, Camera 
} from 'lucide-react';
import { toast } from 'react-toastify';
import AddProductDrawer from '../components/AddProductDrawer';

export default function AnalyticsView() {

   const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male'
  });

  const [topProducts, setTopProducts] = useState([
    { sn: 1, name: 'Blutooth Devices', price: '$10', order: '34,666 Piece', sales: '$3,46,660', icon: '🎧', isTopThree: true },
    { sn: 2, name: 'Airdot', price: '$15', order: '20,000 Piece', sales: '$3,00,000', icon: '🎛️', isTopThree: true },
    { sn: 3, name: 'Shoes', price: '$10', order: '15,000 Piece', sales: '$1,50,000', icon: '👟', isTopThree: true },
    { sn: 4, name: 'Kids T-Shirt', price: '$12', order: '10,000 Piece', sales: '$1,20,000', icon: '👕', isTopThree: false },
    { sn: 5, name: 'Smart Watch', price: '$12', order: '10,000 Piece', sales: '$1,20,000', icon: '⌚', isTopThree: false },
    { sn: 6, name: 'Girls Top', price: '$12', order: '10,000 Piece', sales: '$1,20,000', icon: '👗', isTopThree: false },
  ]);

  const [customers, setCustomers] = useState([
    { name: 'John Deo', email: 'johndoe2211@gmail.com', phone: '+33757005467', gender: 'Male', role: 'UI/UX Designer', address: '2239 Hog Camp Road Schaumburg', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: 'Shelby Goode', email: 'shelbygoode481@gmail.com', phone: '+33757005467', gender: 'Female', role: 'Frontend Engineer', address: '104 Vista Del Mar, California', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
    { name: 'Robert Bacins', email: 'robertbacins4182@gmail.com', phone: '+33757005467', gender: 'Male', role: 'Product Strategist', address: '494 Walnut Street, New York', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
    { name: 'John Carilo', email: 'johncarilo182@gmail.com', phone: '+33757805467', gender: 'Male', role: 'Data Analyst', address: '772 Spruce Ave, Illinois', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Adriene Watson', email: 'adrienewatson82@gmail.com', phone: '+83757305467', gender: 'Female', role: 'QA Lead', address: '198 Fox Run Lane, Texas', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
    { name: 'Jhon Deo', email: 'jhondeo24823@gmail.com', phone: '+634757005466', gender: 'Male', role: 'Solutions Architect', address: '883 Boundary St, Florida', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { name: 'Mark Ruffalo', email: 'markruffalo3735@gmail.com', phone: '+33757005467', gender: 'Male', role: 'DevOps Engineer', address: '611 Rock Creek Rd, Ohio', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80' },
    { name: 'Bethany Jackson', email: 'bethanyjackson5@gmail.com', phone: '+33757005467', gender: 'Female', role: 'Creative Director', address: '332 Pine Needle Dr, Georgia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    { name: 'Christine Huston', email: 'christineuston4@gmail.com', phone: '+33757005467', gender: 'Male', role: 'HR Operations', address: '202 Oak Ridge Dr, Virginia', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80' },
    { name: 'Anne Jacob', email: 'annejacob2@ummoh.com', phone: '+33757005467', gender: 'Male', role: 'Business Developer', address: '455 Maple Wood Court, Oregon', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=120&q=80' },
  ]);

  const monthlyAdditions = [
    { month: 'Jan', count: 23400, color: 'bg-orange-400', width: 'w-[78%]' },
    { month: 'Feb', count: 15000, color: 'bg-[#5551ff]', width: 'w-[50%]' },
    { month: 'Mar', count: 30000, color: 'bg-orange-400', width: 'w-[100%]' },
    { month: 'Apr', count: 22000, color: 'bg-[#5551ff]', width: 'w-[73%]' },
    { month: 'May', count: 10000, color: 'bg-[#5551ff]', width: 'w-[33%]' },
    { month: 'Jun', count: 23400, color: 'bg-orange-400', width: 'w-[78%]' },
    { month: 'Jul', count: 5000, color: 'bg-[#5551ff]', width: 'w-[16%]' },
  ];

    const [activeSegment, setActiveSegment] = useState('Product');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(0); 
  const [activeMenuIdx, setActiveMenuIdx] = useState(null); 

  const handleAppendProduct = (newProduct) => {
    setTopProducts((prev) => [...prev, { ...newProduct, sn: prev.length + 1 }]);
    toast.success("Product successfully tracked and appended.");
  };

  const handleDeleteCustomer = (idxToDelete) => {
    setCustomers(prev => prev.filter((_, idx) => idx !== idxToDelete));
    setActiveMenuIdx(null);
    if (selectedCustomer === idxToDelete) {
      setSelectedCustomer(0);
    } else if (selectedCustomer > idxToDelete) {
      setSelectedCustomer(prev => prev - 1);
    }
    toast.info("Customer registration record removed.");
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    
    const trimmedFirstName = newCustomer.firstName.trim();
    const trimmedLastName = newCustomer.lastName.trim();
    const trimmedEmail = newCustomer.email.trim();

    // Explicit Form String Field Valuations
    if (!trimmedFirstName) {
      toast.error("First Name field input is required.");
      return;
    }

    if (!trimmedLastName) {
      toast.error("Last Name field input is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid structure email address.");
      return;
    }

    const formattedCustomer = {
      name: `${trimmedFirstName} ${trimmedLastName}`,
      email: trimmedEmail,
      phone: newCustomer.phone.trim() || '+33757005467',
      gender: newCustomer.gender,
      role: 'New Client Member',
      address: 'Not Provided Yet Office Block',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    };

    setCustomers([formattedCustomer, ...customers]);
    setIsCustomerModalOpen(false);
    setSelectedCustomer(0); 
    setNewCustomer({ firstName: '', lastName: '', email: '', phone: '', gender: 'Male' });
    toast.success("Customer registry compiled successfully!");
  };

  const currentCustomer = customers[selectedCustomer] || customers[0];

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 w-full min-h-screen text-slate-600 dark:text-gray-300 font-nunito antialiased relative overflow-x-hidden">
      
      {/* VIEWPORT CONTROLS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 md:mt-0">
        <h1 className="text-2xl font-black text-[#0B0E1F] tracking-tight dark:text-white">
          {activeSegment === 'Product' ? 'Product Analytics' : 'Customer List'}
        </h1>
        
        <div className="flex items-center gap-3">
          {activeSegment === 'Product' ? (
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2.5 px-5 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-100 dark:shadow-none"
            >
              <Plus size={15} className="stroke-[3]" />
              <span>Add Product</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsCustomerModalOpen(true)}
              className="flex items-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2.5 px-5 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-100 dark:shadow-none animate-in fade-in duration-200"
            >
              <Plus size={15} className="stroke-[3]" />
              <span>Add Customer</span>
            </button>
          )}
        </div>
      </div>

      {/* SEGMENTATION SUBNAVIGATION TABS */}
      <div className="flex bg-[#EEEDFD]/50 dark:bg-slate-900 border border-transparent dark:border-slate-800 p-1 rounded-xl w-fit">
        {['Product', 'Customer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSegment(tab)}
            className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${
              activeSegment === tab 
                ? 'bg-[#5551ff] dark:bg-indigo-500 text-white shadow-md shadow-indigo-100/50 dark:shadow-none' 
                : 'text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSegment === 'Product' ? (
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in duration-150">
          <div className="xl:col-span-2 space-y-8 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* METRIC BOX A */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/80 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[150px]">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-500 rounded-2xl"><Box size={20} className="fill-blue-100 dark:fill-blue-950/40" /></div>
                  <span className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">+1400 New Added</span>
                </div>
                <div className="mt-4 z-10">
                  <p className="text-xs font-bold text-slate-400 dark:text-gray-500">Total Product</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">5,00,874</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 dark:opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none"><path d="M0,10 Q25,3 50,13 T100,7 L100,20 L0,20 Z" fill="#5551ff" /></svg>
                </div>
              </div>

              {/* METRIC BOX B */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/80 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[150px]">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/40 text-orange-400 rounded-2xl"><ShoppingCart size={20} /></div>
                  <span className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">+1000 Sales Today</span>
                </div>
                <div className="mt-4 z-10">
                  <p className="text-xs font-bold text-slate-400 dark:text-gray-500">Total Sales</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">2,34,888</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 dark:opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none"><path d="M0,13 Q30,18 60,8 T100,12 L100,20 L0,20 Z" fill="#fb923c" /></svg>
                </div>
              </div>
            </div>

            {/* TOP PRODUCTS MATRIX GRID */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/80 p-6 shadow-2xs flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/60">
                <h2 className="text-sm font-black text-slate-800 dark:text-slate-200">Top Selling Products</h2>
                <button className="text-[11px] font-black text-[#5551ff] dark:text-indigo-400 hover:underline">See More</button>
              </div>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                      <th className="py-3 px-2">SN</th>
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Total Order</th>
                      <th className="py-3 px-2">Total Sales</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/60 dark:divide-slate-800/60 text-xs font-bold text-slate-600 dark:text-gray-300">
                    {(topProducts || []).map((product, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="py-4 px-2 text-slate-400 dark:text-gray-500">
                          {product.isTopThree ? <Award size={15} className="text-amber-500 inline fill-amber-100 dark:fill-amber-950/40" /> : product.sn}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-base shadow-3xs">{product.icon}</span>
                            <span className="font-black text-[#5551ff] dark:text-indigo-400 hover:underline cursor-pointer">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-slate-700 dark:text-slate-300">{product.price}</td>
                        <td className="py-4 px-2 text-slate-500 dark:text-gray-400 font-medium">{product.order}</td>
                        <td className="py-4 px-2 text-emerald-500 dark:text-emerald-400 font-black">{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* PER-MONTH SCALE STATISTICS */}
          <div className="space-y-8 flex flex-col">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/80 p-6 shadow-2xs">
              <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 mb-6">Product Add by Month</h4>
              <div className="space-y-4">
                {(monthlyAdditions || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-gray-500">
                    <span className="w-6 shrink-0">{item.month}</span>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.width} rounded-full`} />
                    </div>
                    <span className="w-10 text-right text-slate-700 dark:text-gray-300 font-black">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ANALYTICS RADIAL SHEET PIE CHART */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/60 dark:border-slate-800/80 p-6 shadow-2xs flex-1 flex flex-col justify-between min-h-[320px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">Product Sales Analytics</h4>
                <button className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-400"><MoreHorizontal size={16} /></button>
              </div>
              <div className="relative flex items-center justify-center py-6 flex-1">
                <div className="w-40 h-40 rounded-full border-[15px] border-[#5551ff] dark:border-indigo-500 border-t-amber-400 dark:border-t-amber-500 border-l-orange-400 dark:border-l-orange-500 flex items-center justify-center relative">
                  <div className="w-[106px] h-[106px] bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xs">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-[#5551ff] dark:text-indigo-400 rounded-full"><TrendingUp size={18} /></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/60 text-[10px] font-black text-slate-400 dark:text-gray-500">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#5551ff] dark:bg-indigo-500" /><span className="text-slate-600 dark:text-slate-400">Total Sales</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-500" /><span className="text-slate-600 dark:text-slate-400">Total Order</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400 dark:bg-orange-500" /><span className="text-slate-600 dark:text-slate-400">Order Cancel</span></div>
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* ======================== CUSTOMER ARCHIVE MODULE WRAPPER ======================== */
        <div className="grid grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* PRIMARY RECORDS TABLE SHEET */}
          <div className="col-span-12 lg:col-span-8 space-y-3 max-h-[820px] overflow-y-auto pr-2">
            
            <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] font-black text-[#8A94A6] dark:text-gray-500 tracking-wide uppercase">
              <div className="col-span-4 flex items-center gap-1.5 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300">
                <span>Name</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-4 flex items-center gap-1.5 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300">
                <span>Email</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-2.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300">
                <span>Phone number</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-1.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300">
                <span>Gender</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
            </div>

            {(customers || []).map((customer, idx) => {
              const isSelected = selectedCustomer === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedCustomer(idx)}
                  className={`grid grid-cols-12 items-center px-6 py-3.5 bg-white dark:bg-slate-900 border rounded-2xl transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'border-[#5551ff] dark:border-indigo-500 shadow-sm shadow-indigo-100/30' 
                      : 'border-slate-100/70 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 shadow-3xs'
                  }`}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <img src={customer.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-3xs shrink-0" />
                    <span className="text-xs font-extrabold text-[#1E293B] dark:text-slate-200 group-hover:text-[#5551ff] dark:group-hover:text-indigo-400 transition-colors truncate">
                      {customer.name}
                    </span>
                  </div>

                  <div className="col-span-4 text-xs font-bold text-slate-500 dark:text-gray-400 truncate pr-2">
                    {customer.email}
                  </div>

                  <div className="col-span-2.5 text-xs font-bold text-slate-500 dark:text-gray-400 truncate">
                    {customer.phone}
                  </div>

                  <div className="col-span-1.5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide ${
                      customer.gender === 'Male' 
                        ? 'bg-[#EEEDFD] dark:bg-indigo-950/40 text-[#5551ff] dark:text-indigo-400' 
                        : 'bg-[#FFF0F2] dark:bg-rose-950/30 text-[#FF5A79]'
                    }`}>
                      {customer.gender}
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-end relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setActiveMenuIdx(activeMenuIdx === idx ? null : idx)}
                      className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeMenuIdx === idx && (
                      <div className="absolute right-0 top-7 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-lg rounded-xl py-1.5 w-24 z-30 animate-in fade-in slide-in-from-top-1 duration-100">
                        <button className="w-full text-left px-3 py-1.5 text-[10px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-1.5">
                          <Edit2 size={10} className="text-[#5551ff] dark:text-indigo-400" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCustomer(idx)}
                          className="w-full text-left px-3 py-1.5 text-[10px] font-black text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 flex items-center gap-1.5"
                        >
                          <Trash2 size={10} className="text-rose-500" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {(!customers || customers.length === 0) && (
              <div className="text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-gray-500 font-bold text-xs uppercase tracking-wider">
                No active records.
              </div>
            )}
          </div>

          {/* DYNAMIC FOCUS PROFILE PANEL SIDEBAR */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 space-y-6 shadow-2xs lg:sticky lg:top-6">
            {customers && customers.length > 0 && currentCustomer ? (
              <>
                <div className="flex flex-col items-center text-center pb-2">
                  <img src={currentCustomer.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-900 ring-4 ring-[#EEEDFD] dark:ring-indigo-950/50 shadow-md mb-3" />
                  <h3 className="text-start text-base font-black text-[#0B0E1F] dark:text-slate-200 tracking-tight">{currentCustomer.name}</h3>
                  <p className="text-start text-[11px] font-bold text-slate-400 dark:text-gray-500 mt-0.5">{currentCustomer.role}</p>
                </div>

                <hr className="border-slate-50 dark:border-slate-800/60" />

                <div className="space-y-4">
                  <h4 className="text-start text-xs font-black text-slate-800 dark:text-slate-400 tracking-wide uppercase">Contact Info</h4>
                  <div className="space-y-3.5 text-xs font-bold text-slate-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-slate-400 dark:text-gray-500"><Mail size={14} /></div>
                      <span className="text-start truncate">{currentCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex p-2 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-slate-400 dark:text-gray-500"><Phone size={14} /></div>
                      <span>{currentCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 items-start">
                      <div className="p-2 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-slate-400 dark:text-gray-500 mt-0.5"><MapPin size={14} /></div>
                      <span className="text-start leading-relaxed text-slate-500/90 dark:text-gray-400">{currentCustomer.address}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-50 dark:border-slate-800/60" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-400 tracking-wide uppercase">Performance</h4>
                    <button className="text-slate-400 dark:text-gray-500 hover:text-slate-600"><MoreHorizontal size={15} /></button>
                  </div>

                  {/* BAR CHART CONFIG BOX */}
                  <div className="bg-[#FBFBFC] dark:bg-slate-950 rounded-2xl p-4 border border-slate-50 dark:border-slate-900/40">
                    <div className="h-28 flex items-end justify-between px-2 relative">
                      <div className="absolute left-[18%] bottom-[68px] bg-orange-500 text-white font-black text-[9px] px-2 py-0.5 rounded-md shadow-xs z-10">
                        2.33k
                      </div>

                      {[
                        { m: 'Jan', h: 'h-10', active: false },
                        { m: 'Feb', h: 'h-20 bg-orange-400', active: true },
                        { m: 'Mar', h: 'h-16', active: false },
                        { m: 'Apr', h: 'h-12', active: false },
                        { m: 'May', h: 'h-24', active: false },
                        { m: 'Jun', h: 'h-28', active: false },
                      ].map((bar, bIdx) => (
                        <div key={bIdx} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="w-2.5 bg-[#FFE6EB] dark:bg-rose-950/20 rounded-full h-28 flex items-end overflow-hidden cursor-pointer">
                            <div className={`w-full ${bar.active ? 'bg-orange-500' : 'bg-[#FF9EB0]/50 dark:bg-rose-400/20 group-hover:bg-[#FF9EB0] dark:group-hover:bg-rose-400/40'} ${bar.h} rounded-full transition-all`} />
                          </div>
                          <span className={`text-[9px] font-black ${bar.active ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-gray-500'}`}>{bar.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG PROGRESS RINGS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FBFBFC] dark:bg-slate-950 border border-slate-50 dark:border-slate-900/40 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-amber-400" strokeDasharray="70, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute text-[11px] font-black text-slate-800 dark:text-slate-200">70%</div>
                    </div>

                    <div className="bg-[#FBFBFC] dark:bg-slate-950 border border-slate-50 dark:border-slate-900/40 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#5551ff] dark:text-indigo-500" strokeDasharray="60, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute text-[11px] font-black text-slate-800 dark:text-slate-200">60%</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400 dark:text-gray-500 font-bold text-xs uppercase tracking-wider">
                No customer selected.
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPONENT COMPLEMENTARY DRAWERS */}
      <AddProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSaveProduct={handleAppendProduct}
      />

      {/* FIXED SLIDE-OUT ADD CUSTOMER MODAL */}
      <div 
        className={`fixed inset-0 bg-slate-950/20 dark:bg-slate-950/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isCustomerModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCustomerModalOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 bottom-0 bg-white dark:bg-slate-900 w-full max-w-[480px] h-full shadow-2xl border-l border-slate-100 dark:border-slate-800 p-8 overflow-y-auto transition-transform duration-300 ease-out transform ${
            isCustomerModalOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#0B0E1F] dark:text-slate-200 tracking-tight">Add Customer</h2>
            <button 
              onClick={() => setIsCustomerModalOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 transition-colors"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>
          </div>

          <form onSubmit={handleAddCustomerSubmit} className="space-y-6">
            
            <div className="flex justify-center pb-2">
              <div className="w-28 h-28 rounded-full bg-[#F3F4F6] dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400 dark:text-gray-500 border border-dashed border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group">
                <Camera size={26} className="text-slate-500 dark:text-gray-400 group-hover:scale-105 transition-transform" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="flex text-[11px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-wide">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="John"
                  value={newCustomer?.firstName || ''}
                  onChange={(e) => setNewCustomer({...newCustomer, firstName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="flex text-[11px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-wide">Last Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="Deo"
                  value={newCustomer?.lastName || ''}
                  onChange={(e) => setNewCustomer({...newCustomer, lastName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex text-[11px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-wide">Email *</label>
              <input 
                type="email" 
                required
                placeholder="Example@gmail.com"
                value={newCustomer?.email || ''}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex text-[11px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</label>
              <input 
                type="text" 
                placeholder="33757005467"
                value={newCustomer?.phone || ''}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex text-[11px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-wide">Gender</label>
              <div className="relative">
                <select
                  value={newCustomer?.gender || 'Male'}
                  onChange={(e) => setNewCustomer({...newCustomer, gender: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-transparent appearance-none focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-200 dark:focus:border-slate-800 transition-all cursor-pointer"
                >
                  <option value="Male" className="dark:bg-slate-900">Male</option>
                  <option value="Female" className="dark:bg-slate-900">Female</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 pointer-events-none" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-[#5551ff] hover:bg-[#4440ef] dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-black py-4 px-4 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              Add Customer
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}