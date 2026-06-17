import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Plus, ChevronDown, Award, MoreHorizontal, ShoppingCart, Box, TrendingUp } from 'lucide-react';


export default function Header({ onMenuClick, currentTitle }) {
  const [dateRange, setDateRange] = useState('10-06-2021 - 10-10-2021');

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
          Dashboard
        </h1>
      </div>

     
    </header>
  );
}