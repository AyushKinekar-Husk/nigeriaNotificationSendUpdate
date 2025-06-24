import { Theme } from "@mui/material";

export const getStyles = (theme: Theme) => {
  const baseText = {
    fontWeight: 100,
    fontSize: "11px",
    color: theme.palette.text.primary,
  };

  return {
    card: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: "10px",
      marginBottom: 2,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: "none",
    },
    cardContent: {
      paddingY: 1,
    },
    collapseContent: {
      paddingTop: 0,
    },
    clickableRow: {
      cursor: "pointer",
    },
    rowLabel: {
      ...baseText,
      fontSize: "12px",
    },
    rowValue: {
      ...baseText,
      color: theme.palette.text.secondary,
    },
    colLabel: {
      ...baseText,
      fontSize: "12px",
    },
    colValue: {
      ...baseText,
      wordBreak: "break-word",
      overflowWrap: "break-word",
      maxWidth: 160,
    },
    colContainer: {
      maxWidth: 160,
    },
    expandIcon: {
      color: theme.palette.success.main,
    },
  };
};
