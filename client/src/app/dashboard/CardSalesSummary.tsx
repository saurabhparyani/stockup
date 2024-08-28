import React, { useState } from "react";
import { useGetDashboardMetricsQuery } from "../redux/api";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];
  const [timeframe, setTimeFrame] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, cur) => {
      return acc + cur.totalValue;
    }, 0) || 0;

  const changedPercentageAvg =
    salesData.reduce((acc, cur, _, arr) => {
      return acc + cur.changePercentage! / arr.length;
    }, 0) || 0;

  const highestSales =
    salesData.reduce((acc, cur) => {
      return cur.totalValue > acc.totalValue ? cur : acc;
    }, salesData[0]) || 0;

  const highestSalesDate = highestSales.date
    ? new Date(highestSales.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) return <div className="m-5">Error fetching Sales Summary</div>;

  return (
    <div className="bg-white shadow-md rounded-2xl flex flex-col justify-between row-span-3 xl:row-span-6">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="mt-[-4px]">
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  $
                  {(totalValueSum / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-sm text-green-500 ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {changedPercentageAvg.toFixed(2)}%
                </span>
              </div>
              <select
                className="rounded p-2 bg-white border border-gray-300 shadow-sm"
                value={timeframe}
                onChange={(e) => setTimeFrame(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* BAR CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`; // MM/DD
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`; // $8m
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString("en")}`]}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* FOOTER */}
          <div className="mt-[-4px]">
            <hr />
            <div className="flex justify-between items-center text-sm px-7 mb-4">
              <p>{salesData.length || 0} Days</p>
              <p>
                Highest Sales Date:{" "}
                <span className="font-bold">{highestSalesDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
