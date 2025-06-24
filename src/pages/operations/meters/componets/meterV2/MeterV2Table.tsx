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
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { toast } from "react-toastify";

const MeterV2Table = ({
  data,
  isLoading,
  current,
  pageSize,
  setCurrent,
  setPageSize,
  triggerExport,
  searchQuery,
  setSearchQuery,
  fetchData,
  onSearch,
}: any) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const { ManageEditMeterV2 } = useSelector(
    (state: RootState) => state.permissions
  );

  const handleEditClick = (row: Meter) => {
    if (ManageEditMeterV2) {
      navigate(`/edit-meter/${row.MeterSerial}`);
    } else {
      toast.warn("You do not have permission to edit this meter.");
    }
  };

  const columns: GridColDef<Customer>[] = [
    {
      field: "MeterSerial",
      headerName: "Meter Serial",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
       disableColumnMenu: true,
    },
    {
      field: "MeterGUID",
      headerName: "MeterGUID",
      flex: 1,
      align: "center",
      headerAlign: "center",
       disableColumnMenu: true,
    },
    {
      field: "MeterState",
      headerName: "Meter State",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
       disableColumnMenu: true,
    },
    {
      field: "PoleId",
      headerName: "Pole Id",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
       disableColumnMenu: true,
    },
    {
      field: "CustomerId",
      headerName: "Customer ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
       disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Edit",
      sortable: false,
      flex: 0.5,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <EditButton
            hideText
            recordItemId={row.Id}
            onClick={() => handleEditClick(row as any)}
            sx={styles.editButton}
          >
            <EditIcon fontSize="small" />
          </EditButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={styles.container}>
      <CustomToolbar
        onUpload={triggerExport}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />

      <Box sx={styles.dataGridWrapper}>
        <DataGrid
          hideFooterPagination
          disableColumnResize 
          hideFooterSelectedRowCount
          rows={data?.data ?? []}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => `${row?.CustomerId}-${row?.NOC}-${row?.PlantName}`}
          sx={styles.dataGrid}
        />
      </Box>

      <Box sx={styles.paginationContainer}>
        <NeuronPagination
          currentPage={current}
          totalItems={data?.total || 0}
          pageSize={pageSize}
          onPageChange={(page) => setCurrent(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrent(1);
          }}
          onReload={fetchData}
        />
      </Box>
    </Box>
  );
};

export default React.memo(MeterV2Table);
