import { Theme } from "@mui/material";

export const getEditMeterFormStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper, // e.g., "#1E2A38"
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1.5),
    margin: "0 auto",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  heading: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },

  textField: {
    "& .MuiInputBase-root": {
      backgroundColor: theme.palette.background.default, 
      color: theme.palette.text.primary,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },
  },

  buttonGroup: {
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
  },
});
