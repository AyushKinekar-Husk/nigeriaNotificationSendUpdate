import { Theme } from "@mui/material";

export const getStyles = (theme: Theme) => ({
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    width: 320,
    padding: 2,
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  closeButton: {
    color: theme.palette.text.primary,
  },
  textFieldInput: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 14,
  },
  dateInput: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 14,
    '& input': {
      color: theme.palette.text.primary,
    },
  },
  searchButton: {
    textTransform: "none",
    backgroundColor: theme.palette.primary.main,
    fontWeight: 600,
    borderRadius: 1,
    marginTop: 1,
    ":hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  divider: {
    borderColor: theme.palette.divider,
    marginTop: 1,
  },
  exportButton: {
    textTransform: "none",
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderColor: theme.palette.primary.main,
    ":hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main + "10",
    },
  },
});
