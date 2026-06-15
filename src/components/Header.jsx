import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Header({ onMenuClick, currentTitle }) {
  const [dateRange, setDateRange] = useState('10-06-2021 - 10-10-2021');

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
          <Menu size={24} />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-gray-50 border border-gray-200 text-gray-600 text-xs lg:text-sm rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="10-06-2021 - 10-10-2021">10-06-2021 — 10-10-2021</option>
          <option value="11-06-2021 - 15-10-2021">11-06-2021 — 15-10-2021</option>
        </select>
      </div>
    </header>
  );
}