import { useTheme } from "@mui/material";

export const UseForbiddenStyle = () => {
  const theme = useTheme();
  return {
    margin: 0,
    minHeight: "85vh",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const ForbiddenImgStyle = {
  display: "block",
  margin: "auto",
  backgroundColor: "hsl(0, 0%, 90%)",
  transition: "background-color 300ms",
  maxWidth: "90vw",
  maxHeight: "60vh",
  height: "100%",
  userSelect: "none",
  pointerEvents: "none",
};