import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowUpRight, Briefcase, ChevronDown } from 'lucide-react';

const MASTER_DASHBOARD_DATA = {
  "2021-10-06": {
    stats: [
      { title: "Save Products", value: "178+", icon: Heart, bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-500" },
      { title: "Stock Products", value: "20+", icon: ShoppingBag, bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-500" },
      { title: "Sales Products", value: "190+", icon: ArrowUpRight, bg: "bg-orange-50 dark:bg-orange-950/40 text-orange-500" },
      { title: "Job Application", value: "12+", icon: Briefcase, bg: "bg-purple-50 dark:bg-purple-950/40 text-purple-500" },
    ],
    chartValue: "2,678",
    chartPath: "M0,50 Q60,10 120,40 T240,60 T360,20 T480,70 T600,10",
    chartCircle: { cx: "260", cy: "55" },
    analyticsPct: "80%",
    analyticsGradient: 'conic-gradient(#4f46e5 0% 60%, #fcd34d 60% 85%, #f97316 85% 100%)',
    orders: [
      { id: "#876364", name: "Camera Lens", price: "$178", orders: 325, amount: "$1,46,660", img: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=80&q=80" },
      { id: "#876368", name: "Black Sleep Dress", price: "$14", orders: 53, amount: "$46,660", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=80&q=80" },
      { id: "#876412", name: "Argan Oil", price: "$21", orders: 78, amount: "$3,46,676", img: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=80&q=80" },
      { id: "#876621", name: "EAU DE Parfum", price: "$32", orders: 98, amount: "$3,46,981", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=80&q=80" },
    ],
    topProducts: [
      { name: "NIKE Shoes Black Pattern", price: "$87", rating: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80" },
      { name: "iPhone 12", price: "$987", rating: 5, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80" },
    ]
  },
  "2021-10-10": {
    stats: [
      { title: "Save Products", value: "241+", icon: Heart, bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-500" },
      { title: "Stock Products", value: "45+", icon: ShoppingBag, bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-500" },
      { title: "Sales Products", value: "312+", icon: ArrowUpRight, bg: "bg-orange-50 dark:bg-orange-950/40 text-orange-500" },
      { title: "Job Application", value: "19+", icon: Briefcase, bg: "bg-purple-50 dark:bg-purple-950/40 text-purple-500" },
    ],
    chartValue: "4,912",
    chartPath: "M0,80 Q60,30 150,10 T300,40 T450,80 T600,30",
    chartCircle: { cx: "150", cy: "10" },
    analyticsPct: "92%",
    analyticsGradient: 'conic-gradient(#4f46e5 0% 75%, #fcd34d 75% 95%, #f97316 95% 100%)',
    orders: [
      { id: "#876901", name: "Mechanical Keyboard", price: "$120", orders: 140, amount: "$16,800", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=80&q=80" },
      { id: "#876942", name: "Wireless Gaming Mouse", price: "$89", orders: 210, amount: "$18,690", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=80&q=80" },
    ],
    topProducts: [
      { name: "Sony WH-1000XM4", price: "$348", rating: 5, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80" },
      { name: "MacBook Air M1", price: "$999", rating: 5, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80" },
    ]
  }
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2021-10-06');
  
  const currentDataset = MASTER_DASHBOARD_DATA[selectedDate] || MASTER_DASHBOARD_DATA['2021-10-06'];

  const filteredOrders = currentDataset.orders.filter(order => 
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-4 space-y-6 font-nunito animate-fadeIn">
      
      <div className="flex flex-col pt-10 sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl lg:text-2xl font-bold text-black tracking-tight dark:text-white">Dashboard</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative inline-block w-full sm:w-48">
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-slate-900 px-4 py-2 pr-10 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="2021-10-06">Oct 06, 2021 (Batch A)</option>
              <option value="2021-10-10">Oct 10, 2021 (Batch B)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentDataset.stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-4 shadow-xs">
              <div className={`p-3.5 rounded-xl ${stat.bg}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-slate-200">Reports</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="h-64 flex flex-col justify-between pt-4 relative">
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-gray-100 dark:border-slate-800"></div>
            <div className="w-full h-40 flex items-end relative">
              <svg className="w-full h-full text-indigo-400 dark:text-indigo-500 overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                <path d={currentDataset.chartPath} fill="none" stroke="currentColor" strokeWidth="3" className="transition-all duration-500" />
                <circle cx={currentDataset.chartCircle.cx} cy={currentDataset.chartCircle.cy} r="5" fill="#4f46e5" stroke="white" strokeWidth="2" className="transition-all duration-500" />
              </svg>
              <div 
                style={{ left: `${(currentDataset.chartCircle.cx / 600) * 100 - 5}%` }}
                className="absolute bottom-[65px] bg-gray-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-center shadow-lg transition-all duration-500"
              >
                <p className="text-[10px] text-gray-400">Sales</p>
                <p className="text-xs font-bold">{currentDataset.chartValue}</p>
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 dark:text-slate-500 px-2 mt-2">
              <span>10am</span><span>11am</span><span>12am</span><span>01am</span><span>02am</span><span>03am</span><span>04am</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800 dark:text-slate-200">Analytics</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="relative flex justify-center items-center my-6">
            <div className="w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500" style={{
              background: currentDataset.analyticsGradient
            }}>
              <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-xs">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{currentDataset.analyticsPct}</span>
                <span className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">Transactions</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span><span className="text-gray-500 dark:text-slate-400">Sale</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-gray-500 dark:text-slate-400">Distribute</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span><span className="text-gray-500 dark:text-slate-400">Return</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <h3 className="font-bold text-gray-800 dark:text-slate-200">Recent Orders</h3>
            <input 
              type="text" 
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48 text-gray-900 dark:text-white"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 dark:text-slate-500 border-b border-gray-50 dark:border-slate-800">
                  <th className="pb-3 font-semibold">Tracking no</th>
                  <th className="pb-3 font-semibold">Product Name</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Total Order</th>
                  <th className="pb-3 font-semibold text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800 text-sm text-gray-700 dark:text-slate-300">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 text-xs text-gray-400 dark:text-slate-500 font-mono">{order.id}</td>
                      <td className="py-3.5 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2.5">
                          <img src={order.img} alt={order.name} className="w-8 h-8 rounded-lg object-cover" />
                          {order.name}
                        </div>
                      </td>
                      <td className="py-3.5">{order.price}</td>
                      <td className="py-3.5">
                        <span className="bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 text-xs px-2.5 py-1 rounded-md font-semibold">
                          {order.orders}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-semibold text-gray-900 dark:text-white">{order.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-xs text-gray-400">No matching items found for this period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800 dark:text-slate-200">Top Selling Products</h3>
            <span className="text-gray-400 cursor-pointer">•••</span>
          </div>
          <div className="space-y-4">
            {currentDataset.topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <img src={product.img} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50 dark:bg-slate-950" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{product.name}</h4>
                  <div className="flex items-center gap-0.5 my-1 text-amber-400 text-xs">
                    {'★'.repeat(product.rating)}
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}