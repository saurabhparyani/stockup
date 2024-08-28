"use client";

import CardPopularProducts from "./CardPopularProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StatCard from "./StatCard";
import { CircleCheckBig, Package, Tag } from "lucide-react";

const Dashboard = () => {
  const customerAndExpensesData = {
    title: "Customer & Expenses",
    icon: <Package />,
    firstRow: {
      name: "Customer Growth",
      value: 175.0,
      percentage: "+131%",
    },
    secondRow: {
      name: "Expenses",
      value: 10.0,
      percentage: "-56%",
    },
  };
  const duesAndPendingData = {
    title: "Dues & Pending Orders",
    icon: <CircleCheckBig />,
    firstRow: {
      name: "Dues",
      value: 250.0,
      percentage: "+131%",
    },
    secondRow: {
      name: "Pending Orders",
      value: 147,
      percentage: "-56%",
    },
  };
  const salesAndDiscountData = {
    title: "Sales & Discount",
    icon: <Tag />,
    firstRow: {
      name: "Sales",
      value: 1000.0,
      percentage: "+20%",
    },
    secondRow: {
      name: "Discount",
      value: 200.0,
      percentage: "-10%",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto pb-4 gap-10 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard {...customerAndExpensesData} />
      <StatCard {...duesAndPendingData} />
      <StatCard {...salesAndDiscountData} />
    </div>
  );
};

export default Dashboard;
