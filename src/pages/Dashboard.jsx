import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowUpRight, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import { Plus, ChevronDown, Award, MoreHorizontal, ShoppingCart, Box, TrendingUp } from 'lucide-react';


export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = [
    { title: "Save Products", value: "178+", icon: Heart, bg: "bg-blue-50 text-blue-500" },
    { title: "Stock Products", value: "20+", icon: ShoppingBag, bg: "bg-amber-50 text-amber-500" },
    { title: "Sales Products", value: "190+", icon: ArrowUpRight, bg: "bg-orange-50 text-orange-500" },
    { title: "Job Application", value: "12+", icon: Briefcase, bg: "bg-purple-50 text-purple-500" },
  ];

  const orders = [
    { id: "#876364", name: "Camera Lens", price: "$178", orders: 325, amount: "$1,46,660", img: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=80&q=80" },
    { id: "#876368", name: "Black Sleep Dress", price: "$14", orders: 53, amount: "$46,660", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=80&q=80" },
    { id: "#876412", name: "Argan Oil", price: "$21", orders: 78, amount: "$3,46,676", img: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=80&q=80" },
    { id: "#876621", name: "EAU DE Parfum", price: "$32", orders: 98, amount: "$3,46,981", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=80&q=80" },
  ];

  const topProducts = [
    { name: "NIKE Shoes Black Pattern", price: "$87", rating: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80" },
    { name: "iPhone 12", price: "$987", rating: 5, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80" }
  ];

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-4 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-3xs text-xs font-semibold text-slate-600">
            <span>10-06-2021</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-3xs text-xs font-semibold text-slate-600">
            <span>10-10-2021</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
      </div>
          </div>
          
        
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
              <div className={`p-3.5 rounded-xl ${stat.bg}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Reports</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="h-64 flex flex-col justify-between pt-4 relative">
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-gray-100"></div>
            <div className="w-full h-40 flex items-end relative">
              <svg className="w-full h-full text-indigo-400 overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                <path d="M0,50 Q60,10 120,40 T240,60 T360,20 T480,70 T600,10" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="260" cy="55" r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />
              </svg>
              <div className="absolute left-[39%] bottom-[50px] bg-gray-900 text-white px-3 py-1.5 rounded-lg text-center shadow-lg">
                <p className="text-[10px] text-gray-400">Sales</p>
                <p className="text-xs font-bold">2,678</p>
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 px-2 mt-2">
              <span>10am</span><span>11am</span><span>12am</span><span>01am</span><span>02am</span><span>03am</span><span>04am</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Analytics</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="relative flex justify-center items-center my-6">
            <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{
              background: 'conic-gradient(#4f46e5 0% 60%, #fcd34d 60% 85%, #f97316 85% 100%)'
            }}>
              <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold text-gray-900">80%</span>
                <span className="text-[11px] text-gray-400 font-medium">Transactions</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span><span className="text-gray-500">Sale</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-gray-500">Distribute</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span><span className="text-gray-500">Return</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <input 
              type="text" 
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-50">
                  <th className="pb-3 font-semibold">Tracking no</th>
                  <th className="pb-3 font-semibold">Product Name</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Total Order</th>
                  <th className="pb-3 font-semibold text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-3.5 text-xs text-gray-400 font-mono">{order.id}</td>
                    <td className="py-3.5 font-medium text-gray-900">
                      <div className="flex items-center gap-2.5">
                        <img src={order.img} alt={order.name} className="w-8 h-8 rounded-lg object-cover" />
                        {order.name}
                      </div>
                    </td>
                    <td className="py-3.5">{order.price}</td>
                    <td className="py-3.5">
                      <span className="bg-cyan-50 text-cyan-600 text-xs px-2.5 py-1 rounded-md font-semibold">
                        {order.orders}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-semibold text-gray-900">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Top Selling Products</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <img src={product.img} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 leading-tight">{product.name}</h4>
                  <div className="flex items-center gap-0.5 my-1 text-amber-400 text-xs">
                    {'★'.repeat(product.rating)}
                  </div>
                  <p className="text-sm font-bold text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}