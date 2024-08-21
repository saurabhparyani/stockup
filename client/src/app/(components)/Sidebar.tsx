"use client";

import { Menu } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      {/* TOP LOGO */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-extrabold text-2xl">StockUp</h1>
      </div>
      <button
        className="md:hidden p-3 rounded-full bg-gray-100 hover:bg-blue-100"
        onClick={() => {}}
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* LINKS */}
      <div className="flex-grow mt-8">{/* links go here */}</div>

      {/* FOOTER */}
      <div className="">
        <p className="text-center text-xs text-gray-500">&copy; 2024 StockUp</p>
      </div>
    </div>
  );
};

export default Sidebar;
