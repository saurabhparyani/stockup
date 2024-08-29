"use client";

import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../redux/api";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 90,
    headerClassName: "bg-white font-bold",
  },
  {
    field: "name",
    headerName: "User Name",
    width: 200,
    headerClassName: "bg-white font-bold",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    headerClassName: "bg-white font-bold",
  },
];

const Users = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex-grow">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
