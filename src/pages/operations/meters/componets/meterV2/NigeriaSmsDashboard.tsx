import { Box, Stack, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EditButton } from "@refinedev/mui";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import NeuronPagination from "../../../../../components/NeuronPagination";
import CustomToolbar from "./CustomToolbar";
import { Meter } from "../../../../../interface/meterTypes";
import { getStyles } from "../../../../../styles/component/MeterV2Table.styles";
import { Customer } from "../../../../../interface/Customer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { toast } from "react-toastify";
import { fetchFileData } from "./fileData";

const NigeriaSmsDashboard = ({
  data,
  isLoading,
  current,
  pageSize,
  setCurrent,
  setPageSize,
  triggerUpload,
  fetchData,
  onSearch,
}: any) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const { ManageEditMeterV2 } = useSelector(
    (state: RootState) => state.permissions
  );

  // Add local state for searchQuery
  const [searchQuery, setSearchQuery] = useState("");

  type FileRow = {
    id: string;
    name: string;
    fileName: string;
    status: string;
    date: string;
    SuccessCount: number;
    FailureCount: number;
    TotalRecords: number;
    FileURL: string;
  };

  const columns: GridColDef<FileRow>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "fileName",
      headerName: "File Name",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "SuccessCount",
      headerName: "Success Count",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "FailureCount",
      headerName: "Failure Count",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "TotalRecords",
      headerName: "Total Records",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Download",
      sortable: false,
      flex: 0.5,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <a href={row.FileURL} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </Stack>
      ),
    },
  ];

  // Filter data based on searchQuery (case-insensitive, on name and fileName)
  const filteredRows = (fetchFileData ?? []).filter((row) => {
    const query = searchQuery?.toLowerCase() || "";
    return (
      row.name.toLowerCase().includes(query) ||
      row.fileName.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={styles.container}>
      <CustomToolbar
        onUpload={triggerUpload}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />

      <Box sx={styles.dataGridWrapper}>
        <DataGrid
          hideFooterPagination
          disableColumnResize
          hideFooterSelectedRowCount
          rows={filteredRows}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
          sx={styles.dataGrid}
        />
      </Box>

      <Box sx={styles.paginationContainer}>
  <NeuronPagination
    currentPage={current || 1}  // Default to 1 if current is undefined or NaN
    totalItems={filteredRows.length || 0}  // Use the length of the filteredRows array
    pageSize={pageSize || 10}  // Default to 10 if pageSize is undefined or NaN
    onPageChange={(page) => setCurrent(page)}
    onPageSizeChange={(size) => {
      setPageSize(size);
      setCurrent(1); // Reset to the first page when page size changes
    }}
    onReload={fetchData}
  />
</Box>
    </Box>
  );
};

export default React.memo(NigeriaSmsDashboard);
