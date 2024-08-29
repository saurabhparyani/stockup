import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string,
    name: string,
    price: number,
    rating?: number,
    stockQuantity: number,
}
export interface NewProduct {
    name: string,
    price: number,
    rating?: number,
    stockQuantity: number,
}

export interface SalesSummary {
    salesSummaryId: string,
    totalValue: number,
    changePercentage?: number,
    date: string
}

export interface PurchaseSummary {
    purchaseSummaryId: string,
    totalPurchased: number,
    changePercentage?: number,
    date: string
}

export interface ExpenseSummary {
    expenseSummaryId: string,
    totalExpenses: number,
    date: string
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string,
    category: string,
    amount: string,
    date: string
}

export interface DashboardMetrics {
    popularProducts: Product[],
    salesSummary: SalesSummary[],
    purchaseSummary: PurchaseSummary[],
    expenseSummary: ExpenseSummary[],
    expenseByCategorySummary: ExpenseByCategorySummary[]
}

export interface ProductMetrics {
    products: Product[]
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products"],
    endpoints: (builder) => ({
        getDashboardMetrics: builder.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: builder.query<Product[], string | void>({
            query: (search) => ({
                url: "/products",
                method: "GET",
                params: search ? { search } : {}
            }),
            providesTags: ["Products"]
        }),
        createProduct: builder.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        })
    })
})

export const { useGetDashboardMetricsQuery, useGetProductsQuery, useCreateProductMutation } = api;