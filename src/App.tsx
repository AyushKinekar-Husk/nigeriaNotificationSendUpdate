import { Refine } from "@refinedev/core";
import { RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings from "@refinedev/react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import AppRoutes from "./route/AppRoutes";
import { ToastContainer } from "react-toastify";
import { AppViewModel } from "./viewmodel/AppViewModel";
import { BrowserRouter } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { COLORS } from "./constant/color";

function App() {
  const { allowed, appReady, userData ,userId} = AppViewModel();
  const userReady = allowed && appReady && userData && Object.keys(userData).length;

  // if (!userReady) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       height="100vh"
  //       bgcolor={COLORS.dark.backgroundDefault}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  
console.log(userReady, "userReady");

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine routerProvider={routerBindings}>
            <AppRoutes />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
