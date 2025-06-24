import { Theme } from "@mui/material";

export const getStyles = (theme: Theme) => ({
  container: {
    bgcolor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 200px)",
  },
  dataGridWrapper: {
    flexGrow: 1,
    overflowY: "auto",
  },
  dataGrid: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: "none",
    fontSize: "12px",
    fontFamily: "Roboto, sans-serif",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.success.main,
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
  },
  editButton: {
    color: theme.palette.success.main,
    textAlign: "center",
    minWidth: 0,
    padding: "4px",
  },
  paginationContainer: {
    padding: 0,
  },
});
