import React from "react";
import { useGetDashboardMetricsQuery } from "../redux/api";
import Ratings from "../(components)/Ratings";
import { ShoppingBag } from "lucide-react";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const roundNumber = (num: number) => {
    const digitsToKeep = 3;
    const totalDigits = num.toString().length;
    if (totalDigits <= digitsToKeep) return num;
    const scalingFactor = Math.pow(10, totalDigits - digitsToKeep);
    const roundedNum = Math.round(num / scalingFactor);

    return roundedNum;
  };

  return (
    <div className="bg-white shadow-md rounded-2xl pb-16 row-span-3 xl:row-span-6">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold pt-5 px-7 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div>img</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Ratings rating={product.rating || 0} />
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div className="flex items-center text-xs">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <span className="font-medium">
                    {roundNumber(product.stockQuantity)}k Sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
