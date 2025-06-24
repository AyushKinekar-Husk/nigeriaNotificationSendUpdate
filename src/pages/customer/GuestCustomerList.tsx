import {
  Box,
  Button,
  Card,
  CardContent,
  GlobalStyles,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List, EditButton, ShowButton } from "@refinedev/mui";
import { Data } from "../../dummyResponse";
import NeuronPagination from "../../components/NeuronPagination";
import logger from "../../utils/logger";
import { Customer } from "../../interface/Customer";


// Global scrollbar styles
const ScrollbarStyles = (
  <GlobalStyles
    styles={{
      body: {
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        backgroundColor: "#0F1523",
        color: "#FFFFFF",
      },
      "::-webkit-scrollbar": { width: "8px", height: "8px" },
      "::-webkit-scrollbar-track": { background: "#1C2334" },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#2A2F45",
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": { backgroundColor: "#3a3f5c" },
    }}
  />
);

// Row for CustomerCard
const Row = ({ label, value }: { label: string; value: any }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body2" sx={{ fontWeight: 100, fontSize: "12px" }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 100, fontSize: "11px" }}>
      {value ?? "-"}
    </Typography>
  </Stack>
);

// Mobile Card View
const CustomerCard = ({ customer }: { customer: Customer }) => (
  <Card
    sx={{
      backgroundColor: "#1C2334",
      color: "#fff",
      borderRadius: "10px",
      mb: 2,
      border: "1px solid #2A2F45",
      boxShadow: "none",
    }}
  >
    <CardContent>
      <Stack spacing={1}>
        <Row label="NOC" value={customer.NOC} />
        <Row label="Plant Name" value={customer.PlantName} />
        <Row label="Pole" value={customer.CustomerName} />
        <Row label="Distance From Pole" value={customer.PhoneNumber} />
        <Row label="Customer Name" value={customer.CustomerName} />
        <Row label="Phone Number" value={customer.PhoneNumber} />
        <Row label="Referred By" value={customer.ReferredBy} />
        <Row label="Status" value={customer.Status} />
        <Row label="Operation Status" value="New" />
        <Row label="Requested On" value={customer.RequestedOnLocalTime} />
        <Row label="Created Name" value={customer.CreatedName} />
      </Stack>
      <Box mt={1}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            px: 3,
            fontSize: "13px",
            "&:hover": { backgroundColor: "green" },
          }}
        >
          View
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// Toolbar with filters, date pickers, search, etc.
const CustomToolbar = ({ onExport }: { onExport: () => void }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const sharedStyles = {
    minWidth: 120,
    backgroundColor: "#131A26",
    "& .MuiInputLabel-root": { color: "#9DA8C1", fontSize: "13px" },
    "& .MuiSelect-select, input": { color: "#fff", fontSize: "13px" },
    "& fieldset": { borderColor: "#2A2F45" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isSmallScreen ? "flex-start" : "center",
        gap: isSmallScreen ? 2 : 0,
        p: "10px 16px",
        borderBottom: "1px solid #2A2F45",
      }}
    >
      <Stack direction={isSmallScreen ? "column" : "row"} spacing={1} flexWrap="wrap">
        <TextField
          placeholder="Search here...."
          size="small"
          variant="outlined"
          sx={{
            maxWidth: 180,
            flexGrow: 1,
            backgroundColor: "#131A26",
            input: { color: "#fff", fontSize: "13px" },
            "& fieldset": { borderColor: "#2A2F45" },
          }}
        />
        <TextField type="date" size="small" label="From Date" InputLabelProps={{ shrink: true }} sx={sharedStyles} />
        <TextField type="date" size="small" label="To Date" InputLabelProps={{ shrink: true }} sx={sharedStyles} />
        <TextField select size="small" label="Select" sx={sharedStyles}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Self">Self</MenuItem>
          <MenuItem value="Internal User">Internal User</MenuItem>
          <MenuItem value="Referred">Referred</MenuItem>
        </TextField>
        <TextField select size="small" label="Ops.Filter" sx={sharedStyles}>
          <MenuItem value="TNF">TNF</MenuItem>
          <MenuItem value="Duplicate">Duplicate</MenuItem>
        </TextField>
        <TextField select size="small" label="Status Filter" sx={sharedStyles}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Verified">Verified</MenuItem>
          <MenuItem value="Converted">Converted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Appointment">Appointment</MenuItem>
        </TextField>
        <TextField select size="small" label="Date Filter" sx={sharedStyles}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Register On:">Register On:</MenuItem>
          <MenuItem value="Verified On:">Verified On:</MenuItem>
          <MenuItem value="Converted On:">Converted On:</MenuItem>
          <MenuItem value="Rejected On:">Rejected On:</MenuItem>
          <MenuItem value="Appointment On:">Appointment On:</MenuItem>
        </TextField>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(50, 145, 202, 0.4)",
            color: "#fff",
            fontSize: "13px",
            textTransform: "none",
            border: "2px solid #3291CA",
            height: "34px",
            mt: isSmallScreen ? 0.5 : "10px",
            "&:hover": {
              borderColor: "green",
              backgroundColor: "rgba(50, 145, 202, 0.4)",
            },
          }}
        >
          Search
        </Button>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ mt: isSmallScreen ? 1 : 0 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(50, 145, 202, 0.4)",
            color: "#fff",
            fontSize: "13px",
            textTransform: "none",
            border: "2px solid #3291CA",
            px: 1.5,
            py: 0.5,
            "&:hover": { borderColor: "green" },
          }}
        >
          + Add
        </Button>
        <Button
          variant="outlined"
          onClick={onExport}
          sx={{
            backgroundColor: "rgba(50, 145, 202, 0.4)",
            color: "white",
            fontSize: "13px",
            textTransform: "none",
            border: "2px solid #3291CA",
            px: 1.5,
            py: 0.5,
            "&:hover": { borderColor: "green" },
          }}
        >
          Export
        </Button>
      </Stack>
    </Box>
  );
};

// Desktop table
const DesktopTable = ({ data, isLoading, current, pageSize, setCurrent, setPageSize, triggerExport }: any) => {
  const columns: GridColDef<Customer>[] = [
    { field: "NOC", headerName: "NOC", flex: 1 },
    { field: "PlantName", headerName: "Plant Name", flex: 1 },
    { field: "CustomerName", headerName: "Customer Name", flex: 1.5 },
    { field: "PhoneNumber", headerName: "Phone Number", flex: 1.5 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "RequestedOnLocalTime", headerName: "Requested On", flex: 1.5 },
    { field: "CreatedName", headerName: "Created Name", flex: 1 },
    { field: "AppointmentRemarks", headerName: "Appointment Remarks", flex: 2 },
    { field: "VerifiedOn", headerName: "Verified On", flex: 1.5 },
    { field: "AppointmentOn", headerName: "Appointment On", flex: 1.5 },
    {
      field: "actions",
      headerName: "Edit",
      sortable: false,
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <EditButton hideText sx={{ color: "green" }} recordItemId={row.Id}>
            <EditIcon />
          </EditButton>
          <ShowButton hideText sx={{ color: "green" }} recordItemId={row.Id}>
            <VisibilityIcon />
          </ShowButton>
        </Stack>
      ),
    },
  ];

  return (
    <List>
      <Box sx={{ bgcolor: "#131A26", borderRadius: 2, height: "calc(100vh - 200px)", display: "flex", flexDirection: "column" }}>
        <CustomToolbar onExport={triggerExport} />
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <DataGrid
            hideFooterPagination
            hideFooterSelectedRowCount
            getRowId={(row) => row.Id}
            rows={data.data}
            rowCount={data.total}
            columns={columns}
            loading={isLoading}
            sx={{
              backgroundColor: "#2A2F45",
              color: "#fff",
              border: "none",
              fontSize: "12px",
              fontFamily: "Roboto, sans-serif",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#2A2F45",
                color: "green",
                position: "sticky",
                top: 0,
                zIndex: 1,
              },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#2A2F45" },
              "& .MuiDataGrid-footerContainer": { display: "none" },
            }}
          />
        </Box>
        <Box sx={{ p: 0 }}>
          <NeuronPagination
            currentPage={current}
            totalItems={data.total}
            pageSize={pageSize}
            onPageChange={setCurrent}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrent(1);
            }}
          />
        </Box>
      </Box>
    </List>
  );
};

// Entry Component
const GuestCustomerList = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(isTablet ? 3 : 10);

  const paginatedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return Data?.Data.slice(start, end);
  }, [current, pageSize]);

  const total = Data?.Data.length;
  const totalPages = Math.ceil(total / pageSize);
  const isLoading = false;

  const triggerExport = () => logger.log("Export clicked");

  return (
    <>
      {ScrollbarStyles}
      <Box sx={{ height: "100vh", overflowY: "auto", backgroundColor: "#131A26" }}>
        {isTablet ? (
          <>
            {paginatedData.map((item:any) => (
              <CustomerCard key={item.Id} customer={item} />
            ))}
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
              <IconButton onClick={() => setCurrent(1)} disabled={current === 1} sx={{ color: "green" }}>
                <FirstPageIcon />
              </IconButton>
              <IconButton onClick={() => setCurrent(current - 1)} disabled={current === 1} sx={{ color: "green" }}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "green",
                  color: "#fff",
                  px: 2,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                {current}
              </Typography>
              <IconButton onClick={() => setCurrent(current + 1)} disabled={current >= totalPages} sx={{ color: "green" }}>
                <ChevronRightIcon />
              </IconButton>
              <IconButton onClick={() => setCurrent(totalPages)} disabled={current >= totalPages} sx={{ color: "green" }}>
                <LastPageIcon />
              </IconButton>
              <IconButton onClick={() => {}} sx={{ color: "green" }} title="Refresh">
                <RefreshIcon />
              </IconButton>
            </Stack>
          </>
        ) : (
          <DesktopTable
            data={{ data: paginatedData, total }}
            isLoading={isLoading}
            current={current}
            pageSize={pageSize}
            setCurrent={setCurrent}
            setPageSize={setPageSize}
            triggerExport={triggerExport}
          />
        )}
      </Box>
    </>
  );
};

export default GuestCustomerList;
