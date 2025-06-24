import { Theme } from "@mui/material";

export const getStyles = (theme: Theme, isSmallScreen: boolean) => {
  const borderColor = theme.palette.divider;
  const primaryButtonBorder = theme.palette.primary.main;
  const buttonHoverColor = theme.palette.success.main;

  return {
    toolbarContainer: {
      display: "flex",
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isSmallScreen ? "flex-start" : "center",
      gap: isSmallScreen ? 2 : 0,
      padding: "10px 16px",
      borderBottom: `1px solid ${borderColor}`,
      backgroundColor: theme.palette.background.default,
    },

    leftStack: {
      direction: isSmallScreen ? "column" : "row",
      spacing: 1,
      flexWrap: "wrap",
    },

    textField: {
      maxWidth: 180,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      input: {
        color: theme.palette.text.primary,
        fontSize: "13px",
      },
      "& fieldset": {
        borderColor: borderColor,
      },
    },

    customButton: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.primary,
      fontSize: "13px",
      fontWeight: 200,
      textTransform: "none" as const,
      border: `2px solid ${primaryButtonBorder}`,
      px: 1.5,
      py: 0.5,
      "&:hover": {
        borderColor: buttonHoverColor,
        backgroundColor: theme.palette.primary.light,
      },
    },

    rightStack: {
      direction: "row",
      spacing: 1.5,
      mt: isSmallScreen ? 1 : 0,
      alignSelf: isSmallScreen ? "flex-end" : "center",
    },
  };
};
