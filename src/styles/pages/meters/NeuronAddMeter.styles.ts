// components/NeuronAddMeter.styles.ts
import { Theme } from "@mui/material";

export const getNeuronAddMeterStyles = (theme: Theme) => ({
  root: {
    padding: "32px",
    background: theme.palette.background.paper,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  headerTitle: {
    color: theme.palette.text.primary,
    fontWeight: 300,
    fontSize: "18px",
  },
  saveButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    textTransform: "none",
    fontSize: "13px",
    fontWeight: 200,
    borderRadius: "6px",
    minWidth: "100px",
    height: "35px",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  formContainer: {
    background: theme.palette.background.default,
    borderRadius: "8px",
    padding: "20px",
  },
  dropdown: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "6px",
    maxWidth: "100%",
    "& .MuiInputBase-root": {
      height: 48,
      color: theme.palette.text.primary,
      fontSize: "13px",
      fontWeight: 200,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.primary,
      fontSize: "13px",
      fontWeight: 200,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primary,
    },
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.grey[600],
    },
  },
});
