"use client";

import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetProductsQuery } from "../redux/api";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 90,
    headerClassName: "bg-white font-bold",
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
    headerClassName: "bg-white font-bold",
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
    headerClassName: "bg-white font-bold",
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    headerClassName: "bg-white font-bold",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
    headerClassName: "bg-white font-bold",
  },
];

const Inventory = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: products, isError, isLoading } = useGetProductsQuery();

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
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="flex-grow">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              marginBottom: "0px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Inventory;
