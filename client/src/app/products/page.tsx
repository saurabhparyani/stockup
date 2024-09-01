"use client";

import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/api";
import { Product } from "../redux/api";
import Ratings from "../(components)/Ratings";
import ProductModal from "./ProductModal";
import Image from "next/image";

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchQuery);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-5">
      {/* SEARCH BAR */}
      <div className="relative">
        <input
          type="search"
          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 outline-none rounded-md overflow-hidden text-ellipsis"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-500" size={20} />
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between pr-5 mt-7 gap-5">
        <p className="text-2xl font-bold">Products</p>
        <button
          className="flex bg-blue-600 text-white items-center font-semibold pl-7 pr-8 py-2 rounded-md"
          onClick={toggleModal}
        >
          <span className="border-2 border-white rounded-full text-white mr-2 p-1 text-xl">
            <Plus className="w-4 h-4" />
          </span>
          Create Product
        </button>
      </div>

      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-5">
          {products?.map((product: Product) => (
            <div
              key={product.productId}
              className="border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-stockup.s3.ap-south-1.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </p>
                {product.rating && (
                  <div className="flex items-center">
                    <Ratings rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal Component */}
      <ProductModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default ProductPage;
