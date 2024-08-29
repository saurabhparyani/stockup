import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProductMutation } from "../redux/api";

const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  stockQuantity: z
    .number()
    .min(1, { message: "Stock quantity must be at least 1" }),
  rating: z.number().min(1).max(5).optional(),
});

type ProductFormInputs = z.infer<typeof productSchema>;

const ProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [createProduct] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      await createProduct(data).unwrap();
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 mb-24 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-5">Create Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              {...register("stockQuantity", { valueAsNumber: true })}
              type="number"
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.stockQuantity ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.stockQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stockQuantity.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className={`mt-1 block w-full px-3 py-2 border bg-white  ${
                errors.rating ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="mr-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
