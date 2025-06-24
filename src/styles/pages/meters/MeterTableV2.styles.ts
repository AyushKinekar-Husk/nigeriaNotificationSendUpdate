import { Theme } from "@mui/material";

export const getMeterTableV2Styles = (theme: Theme) => ({
  rootContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    alignSelf: "center",
  },
  title: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(-20),
    color: theme.palette.text.primary,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  filterToggle: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  filterButton: {
    alignItems: "center",
    gap: 1,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    paddingX: 2,
    paddingY: 1.5,
    marginBottom: 2,
    cursor: "pointer",
  },
  filterText: {
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: 500,
  },
  pagination: {
    marginTop: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumber: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    paddingX: 2,
    paddingY: 0.5,
    borderRadius: "4px",
  },
});
