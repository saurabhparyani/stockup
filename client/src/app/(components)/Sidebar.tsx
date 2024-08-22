"use client";

import { Menu } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsSidebarCollapsed } from "../redux/features/globalSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-extrabold text-2xl">StockUp</h1>
      </div>
      <button
        className="md:hidden p-3 rounded-full bg-gray-100 hover:bg-blue-100"
        onClick={toggleSidebar}
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
