import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@mui/material/styles";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { COLORS } from "../../constant/color";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

// Add `container` to palette
declare module "@mui/material/styles" {
  interface Palette {
    container: {
      main: string;
    };
  }
  interface PaletteOptions {
    container?: {
      main: string;
    };
  }
}

// Create the context
export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

// Light Theme (based on screenshot)
const customLightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: COLORS.light.backgroundDefault,
      paper: COLORS.light.backgroundPaper,
    },
    primary: {
      main: COLORS.light.primaryMain,
      contrastText: COLORS.light.primaryContrastText,
    },
    text: {
      primary: COLORS.light.textPrimary,
      secondary: COLORS.light.textSecondary,
    },
    container: {
      main: COLORS.light.containerMain,
    },
  },
});

// Dark Theme (based on screenshot)
const customDarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS.dark.backgroundDefault,
      paper: COLORS.dark.backgroundPaper,
    },
    primary: {
      main: COLORS.dark.primaryMain,
      contrastText: COLORS.dark.primaryContrastText,
    },
    text: {
      primary: COLORS.dark.textPrimary,
      secondary: COLORS.dark.textSecondary,
    },
    container: {
      main: COLORS.dark.containerMain,
    },
  },
});

// Provider with toggle + localStorage
export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(() => colorModeFromLocalStorage || "dark");

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        theme={mode === "light" ? customLightTheme : customDarkTheme}
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
