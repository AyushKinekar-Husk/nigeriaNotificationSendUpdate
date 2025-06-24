import { Theme } from "@mui/material";

export const getStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    px: 1,
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "10px",
  },
  pageButton: (isActive: boolean) => ({
    px: 0,
    py: 0.5,
    borderRadius: 1,
    cursor: "pointer",
    bgcolor: isActive ? theme.palette.text.secondary : theme.palette.background.default,
    color: isActive ? theme.palette.common.white : theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    fontWeight: 300,
    minWidth: "28px",
    textAlign: "center",
  }),
  ellipsis: {
    color: theme.palette.text.secondary,
    px: 1,
  },
  select: {
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    fontSize: "12px",
    borderRadius: "4px",
    "& .MuiSelect-icon": {
      color: theme.palette.text.secondary,
    },
  },
  itemsText: {
    color: theme.palette.text.secondary,
    fontSize: "13px",
  },
  icon: {
    color: theme.palette.text.primary,
  },
  refreshIcon: {
    color: theme.palette.text.secondary,
  },
});
