import { Theme } from "@mui/material";

export const getStyles = (theme: Theme, isXs: boolean) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
    height: "48px",
    justifyContent: "center",
    zIndex: 1101,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "48px !important",
    paddingX: 1,
    position: "relative",
  },
  menuIcon: {
    color: theme.palette.text.primary,
    fontSize: 22,
  },
  logoText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: isXs ? "14px" : "18px",
    letterSpacing: 1,
  },
  centerTitle: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: "14px",
    textTransform: "capitalize",
    display: { xs: "none", sm: "block" },
  },
  flag: {
    borderRadius: 2,
  },
  personAvatar: {
    width: 24,
    height: 24,
    bgcolor: theme.palette.container.main,
  },
  personIcon: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  arrowDown: {
    color: theme.palette.text.primary,
    fontSize: 18,
  },
  switch: {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: theme.palette.primary.main,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.common.white,
    },
  },
});
