import React, { useState } from 'react';
import { 
  Plus, ChevronDown, Award, MoreHorizontal, ShoppingCart, 
  Box, TrendingUp, Mail, Phone, MapPin, Edit2, Trash2, X, Camera 
} from 'lucide-react';
import AddProductDrawer from '../components/AddProductDrawer';

export default function AnalyticsView() {
  const [activeSegment, setActiveSegment] = useState('Product');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(0); 
  const [activeMenuIdx, setActiveMenuIdx] = useState(null); 

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
    { name: 'Robert Bacins', email: 'robertbacins4182@com', phone: '+33757005467', gender: 'Male', role: 'Product Strategist', address: '494 Walnut Street, New York', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
    { name: 'John Carilo', email: 'johncarilo182@.com', phone: '+33757805467', gender: 'Male', role: 'Data Analyst', address: '772 Spruce Ave, Illinois', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Adriene Watson', email: 'adrienewatson82@.com', phone: '+83757305467', gender: 'Female', role: 'QA Lead', address: '198 Fox Run Lane, Texas', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
    { name: 'Jhon Deo', email: 'jhondeo24823@.com', phone: '+634757005466', gender: 'Male', role: 'Solutions Architect', address: '883 Boundary St, Florida', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { name: 'Mark Ruffalo', email: 'markruffalo3735@.com', phone: '+33757005467', gender: 'Male', role: 'DevOps Engineer', address: '611 Rock Creek Rd, Ohio', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80' },
    { name: 'Bethany Jackson', email: 'bethanyjackson5@.com', phone: '+33757005467', gender: 'Female', role: 'Creative Director', address: '332 Pine Needle Dr, Georgia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    { name: 'Christine Huston', email: 'christineuston4@.com', phone: '+33757005467', gender: 'Male', role: 'HR Operations', address: '202 Oak Ridge Dr, Virginia', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80' },
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

  const handleAppendProduct = (newProduct) => {
    setTopProducts((prev) => [...prev, { ...newProduct, sn: prev.length + 1 }]);
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustomer.firstName || !newCustomer.email) return;

    const formattedCustomer = {
      name: `${newCustomer.firstName} ${newCustomer.lastName}`,
      email: newCustomer.email,
      phone: newCustomer.phone || '+33757005467',
      gender: newCustomer.gender,
      role: 'New Client Member',
      address: 'Not Provided Yet Office Block',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    };

    setCustomers([formattedCustomer, ...customers]);
    setIsCustomerModalOpen(false);
    setSelectedCustomer(0); 
    setNewCustomer({ firstName: '', lastName: '', email: '', phone: '', gender: 'Male' });
  };

  const currentCustomer = customers[selectedCustomer] || customers[0];

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 w-full min-h-screen bg-[#F8F9FB] text-slate-600 font-sans antialiased relative overflow-x-hidden">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 md:mt-0">
        <h1 className="text-2xl font-black text-[#0B0E1F] tracking-tight">
          {activeSegment === 'Product' ? 'Product Analytics' : 'Customer List'}
        </h1>
        
        <div className="flex items-center gap-3">
          {activeSegment === 'Product' ? (
            <>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-3xs text-xs font-bold text-slate-600 cursor-pointer">
                <span>10-06-2021</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-3xs text-xs font-bold text-slate-600 cursor-pointer">
                <span>10-10-2021</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] text-white py-2.5 px-5 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-100"
              >
                <Plus size={15} className="stroke-[3]" />
                <span>Add Product</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsCustomerModalOpen(true)}
              className="flex items-center gap-2 bg-[#5551ff] hover:bg-[#4440ef] text-white py-2.5 px-5 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-100 animate-in fade-in duration-200"
            >
              <Plus size={15} className="stroke-[3]" />
              <span>Add Customer</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex bg-[#EEEDFD]/50 p-1 rounded-xl w-fit">
        {['Product', 'Customer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSegment(tab)}
            className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${
              activeSegment === tab 
                ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-100/50' 
                : 'text-slate-400 hover:text-slate-700'
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
              <div className="bg-white rounded-3xl border border-slate-100/60 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[150px]">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Box size={20} className="fill-blue-100" /></div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+1400 New Added</span>
                </div>
                <div className="mt-4 z-10">
                  <p className="text-xs font-bold text-slate-400">Total Product</p>
                  <h3 className="text-2xl font-black text-slate-800 mt-1">5,00,874</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 pointer-events-none">
                  <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none"><path d="M0,10 Q25,3 50,13 T100,7 L100,20 L0,20 Z" fill="#5551ff" /></svg>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100/60 p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[150px]">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-orange-50 text-orange-400 rounded-2xl"><ShoppingCart size={20} /></div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+1000 Sales Today</span>
                </div>
                <div className="mt-4 z-10">
                  <p className="text-xs font-bold text-slate-400">Total Sales</p>
                  <h3 className="text-2xl font-black text-slate-800 mt-1">2,34,888</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 pointer-events-none">
                  <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none"><path d="M0,13 Q30,18 60,8 T100,12 L100,20 L0,20 Z" fill="#fb923c" /></svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100/60 p-6 shadow-2xs flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                <h2 className="text-sm font-black text-slate-800">Top Selling Products</h2>
                <button className="text-[11px] font-black text-[#5551ff] hover:underline">See More</button>
              </div>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                      <th className="py-3 px-2">SN</th>
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Total Order</th>
                      <th className="py-3 px-2">Total Sales</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/60 text-xs font-bold text-slate-600">
                    {topProducts.map((product, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-2 text-slate-400">
                          {product.isTopThree ? <Award size={15} className="text-amber-500 inline fill-amber-100" /> : product.sn}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-base shadow-3xs">{product.icon}</span>
                            <span className="font-black text-[#5551ff] hover:underline cursor-pointer">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-slate-700">{product.price}</td>
                        <td className="py-4 px-2 text-slate-500/90 font-medium">{product.order}</td>
                        <td className="py-4 px-2 text-emerald-500 font-black">{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="bg-white rounded-3xl border border-slate-100/60 p-6 shadow-2xs">
              <h4 className="text-xs font-black text-slate-800 mb-6">Product Add by Month</h4>
              <div className="space-y-4">
                {monthlyAdditions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-400">
                    <span className="w-6 shrink-0">{item.month}</span>
                    <div className="flex-1 bg-slate-50 h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.width} rounded-full`} />
                    </div>
                    <span className="w-10 text-right text-slate-700 font-black">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100/60 p-6 shadow-2xs flex-1 flex flex-col justify-between min-h-[320px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-slate-800">Product Sales Analytics</h4>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
              </div>
              <div className="relative flex items-center justify-center py-6 flex-1">
                <div className="w-40 h-40 rounded-full border-[15px] border-[#5551ff] border-t-amber-400 border-l-orange-400 flex items-center justify-center relative">
                  <div className="w-[106px] h-[106px] bg-white rounded-full flex items-center justify-center shadow-2xs">
                    <div className="p-2.5 bg-blue-50 text-[#5551ff] rounded-full"><TrendingUp size={18} /></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-50 text-[10px] font-black text-slate-400">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#5551ff]" /><span className="text-slate-600">Total Sales</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-slate-600">Total Order</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-slate-600">Order Cancel</span></div>
              </div>
            </div>
          </div>
        </div>

      ) : (

        <div className="grid grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          <div className="col-span-12 lg:col-span-8 space-y-3 max-h-[820px] overflow-y-auto pr-2">
            
            <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] font-black text-[#8A94A6] tracking-wide uppercase">
              <div className="col-span-4 flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                <span>Name</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-4 flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                <span>Email</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-2.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                <span>Phone number</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="col-span-1.5 flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                <span>Gender</span> <ChevronDown size={12} className="text-slate-400" />
              </div>
            </div>

            {customers.map((customer, idx) => {
              const isSelected = selectedCustomer === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedCustomer(idx)}
                  className={`grid grid-cols-12 items-center px-6 py-3.5 bg-white border rounded-2xl transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'border-[#5551ff] shadow-sm shadow-indigo-100/30' 
                      : 'border-slate-100/70 hover:border-slate-200 shadow-3xs'
                  }`}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <img src={customer.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-3xs shrink-0" />
                    <span className="text-xs font-extrabold text-[#1E293B] group-hover:text-[#5551ff] transition-colors truncate">
                      {customer.name}
                    </span>
                  </div>

                  <div className="col-span-4 text-xs font-bold text-slate-500 truncate pr-2">
                    {customer.email}
                  </div>

                  <div className="col-span-2.5 text-xs font-bold text-slate-500 truncate">
                    {customer.phone}
                  </div>

                  <div className="col-span-1.5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide ${
                      customer.gender === 'Male' ? 'bg-[#EEEDFD] text-[#5551ff]' : 'bg-[#FFF0F2] text-[#FF5A79]'
                    }`}>
                      {customer.gender}
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-end relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setActiveMenuIdx(activeMenuIdx === idx ? null : idx)}
                      className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeMenuIdx === idx && (
                      <div className="absolute right-0 top-7 bg-white border border-slate-100 shadow-lg rounded-xl py-1.5 w-24 z-30 animate-in fade-in slide-in-from-top-1 duration-100">
                        <button className="w-full text-left px-3 py-1.5 text-[10px] font-black text-slate-600 hover:bg-slate-50 flex items-center gap-1.5">
                          <Edit2 size={10} className="text-[#5551ff]" /> Edit
                        </button>
                        <button className="w-full text-left px-3 py-1.5 text-[10px] font-black text-rose-500 hover:bg-rose-50/50 flex items-center gap-1.5">
                          <Trash2 size={10} className="text-rose-500" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 space-y-6 shadow-2xs position-sticky top-6">
            <div className="flex flex-col items-center text-center pb-2">
              <img src={currentCustomer.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white ring-4 ring-[#EEEDFD] shadow-md mb-3" />
              <h3 className="text-base font-black text-[#0B0E1F] tracking-tight">{currentCustomer.name}</h3>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">{currentCustomer.role}</p>
            </div>

            <hr className="border-slate-50" />

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-800 tracking-wide uppercase">Contact Info</h4>
              <div className="space-y-3.5 text-xs font-bold text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F8F9FB] rounded-xl text-slate-400"><Mail size={14} /></div>
                  <span className="truncate">{currentCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F8F9FB] rounded-xl text-slate-400"><Phone size={14} /></div>
                  <span>{currentCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 items-start">
                  <div className="p-2 bg-[#F8F9FB] rounded-xl text-slate-400 mt-0.5"><MapPin size={14} /></div>
                  <span className="leading-relaxed text-slate-500/90">{currentCustomer.address}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-50" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-800 tracking-wide uppercase">Performance</h4>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={15} /></button>
              </div>

              <div className="bg-[#FBFBFC] rounded-2xl p-4 border border-slate-50">
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
                      <div className="w-2.5 bg-[#FFE6EB] rounded-full h-28 flex items-end overflow-hidden cursor-pointer">
                        <div className={`w-full ${bar.active ? 'bg-orange-500' : 'bg-[#FF9EB0]/50 group-hover:bg-[#FF9EB0]'} ${bar.h} rounded-full transition-all`} />
                      </div>
                      <span className={`text-[9px] font-black ${bar.active ? 'text-slate-800' : 'text-slate-400'}`}>{bar.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FBFBFC] border border-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-amber-400" strokeDasharray="70, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute text-[11px] font-black text-slate-800">70%</div>
                </div>

                <div className="bg-[#FBFBFC] border border-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[#5551ff]" strokeDasharray="60, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute text-[11px] font-black text-slate-800">60%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSaveProduct={handleAppendProduct}
      />

      <div 
        className={`fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isCustomerModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCustomerModalOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 bottom-0 bg-white w-full max-w-[480px] h-full shadow-2xl border-l border-slate-100 p-8 overflow-y-auto transition-transform duration-300 ease-out transform ${
            isCustomerModalOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#0B0E1F] tracking-tight">Add Customer</h2>
            <button 
              onClick={() => setIsCustomerModalOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>
          </div>

          <form onSubmit={handleAddCustomerSubmit} className="space-y-6">
            
            <div className="flex justify-center pb-2">
              <div className="w-28 h-28 rounded-full bg-[#F3F4F6] flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors group">
                <Camera size={26} className="text-slate-500 group-hover:scale-105 transition-transform" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide">First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John"
                  value={newCustomer.firstName}
                  onChange={(e) => setNewCustomer({...newCustomer, firstName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Last Name</label>
                <input 
                  type="text"
                  placeholder="Deo"
                  value={newCustomer.lastName}
                  onChange={(e) => setNewCustomer({...newCustomer, lastName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                required
                placeholder="Example@gmail.com"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Phone Number</label>
              <input 
                type="text" 
                placeholder="33757005467"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Gender</label>
              <div className="relative">
                <select
                  value={newCustomer.gender}
                  onChange={(e) => setNewCustomer({...newCustomer, gender: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#F8F9FB] rounded-xl text-xs font-bold text-slate-800 border border-transparent appearance-none focus:outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-[#5551ff] hover:bg-[#4440ef] text-white font-black py-4 px-4 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-100"
            >
              Add Customer
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}