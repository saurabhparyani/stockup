import { Package, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  icon: JSX.Element;
  firstRow: {
    name: string;
    value: number;
    percentage: string;
  };
  secondRow: {
    name: string;
    value: number;
    percentage: string;
  };
}

const StatCard = (data: StatCardProps) => {
  return (
    <div className="bg-white flex flex-col shadow-md rounded-2xl md:row-span-1 xl:row-span-2">
      {/* HEADER */}
      <div className="flex justify-between items-center px-7 pt-5 pb-2">
        <p className="text-xl font-semibold">{data.title}</p>
        <p className="text-xs text-gray-400">22 - 29 October 2023</p>
      </div>
      <hr />

      {/* BODY */}
      <div className="flex items-center mt-4 pr-4 pb-8">
        <div className="bg-blue-300/30 border border-blue-400 rounded-full mx-4 mt-4">
          <div className="w-14 h-14 flex justify-center items-center">
            {data.icon}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between py-2 text-sm">
            <p className="text-gray-400 basis-1/2">{data.firstRow.name}</p>
            <p className="font-semibold basis-1/4">
              {data.firstRow.value.toFixed(2)}
            </p>
            <span className="flex items-center text-green-500 gap-2 basis-1/4">
              <TrendingUp className="w-4 h-4" />
              <p>{data.firstRow.percentage}</p>
            </span>
          </div>
          <hr />
          <div className="flex flex-row justify-between py-2 text-sm">
            <p className="text-gray-400 basis-1/2">{data.secondRow.name}</p>
            <p className="font-semibold basis-1/4">
              {data.secondRow.value.toFixed(2)}
            </p>
            <span className="flex items-center text-red-500 gap-2 basis-1/4">
              <TrendingDown className="w-4 h-4" />
              <p>{data.secondRow.percentage}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
