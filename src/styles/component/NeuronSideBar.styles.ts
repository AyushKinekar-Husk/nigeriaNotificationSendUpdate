import { Theme } from "@mui/material";

export const getStyles = (theme: Theme) => ({
  drawerPaper: {
    width: 260,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxSizing: "border-box",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 2,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  iconButton: {
    color: theme.palette.text.primary,
  },
  listContainer: {
    flex: 1,
    overflowY: "auto",
    px: 1.2,
  },
  listItem: {
    pl: 3,
    py: 1.2,
    color: theme.palette.text.primary,
    borderRadius: "6px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listItemActive: {
    backgroundColor: theme.palette.action.selected,
  },
  childItem: {
    pl: 5.5,
    py: 0.8,
    color: theme.palette.text.primary,
    fontSize: "13px",
    "& .MuiListItemIcon-root": {
      minWidth: 20,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  childItemActive: {
    backgroundColor: theme.palette.action.selected,
  },
  listItemIcon: {
    color: theme.palette.text.primary,
    minWidth: 40,
  },
  childIcon: {
    color: theme.palette.success.main,
    fontSize: 8,
  },
  versionBox: {
    p: 2,
    textAlign: "center",
    fontSize: "11px",
    fontWeight: 400,
    opacity: 0.6,
  },
  divider: {
    borderColor: theme.palette.divider,
    mt: 1,
  },
});
