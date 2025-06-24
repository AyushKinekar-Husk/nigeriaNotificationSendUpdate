import { ThemedLayoutV2 } from "@refinedev/mui";
import { Outlet, Route, Routes } from "react-router";
import { NeuronAddMeter } from "../pages/operations/meters/NeuronAddMeter";
import EditMeterPage from "../pages/operations/meters/EditMeterPage";
import { ErrorComponent } from "@refinedev/core";
import { useState } from "react";
import { ROUTES } from "./RouteConstant";
import GuestCustomerList from "../pages/customer/GuestCustomerList";
import NeuronSideBar from "../components/NeuronSideBar";
import { Header } from "../components/header/Header";
import ForbiddenPage from "../pages/403-Forbidden";
import Meters from "../pages/operations/Meters";
import NigeriaSmsDashboard from "../pages/operations/meters/componets/meterV2/NigeriaSmsDashboard";


export default function AppRoutes() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <Routes>
      <Route
        element={
          <ThemedLayoutV2
            Header={() => <Header onToggleSidebar={toggleDrawer} />}
            Sider={() => (
              <NeuronSideBar
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
              />
            )}
          >
            <Outlet />
          </ThemedLayoutV2>
        }
      >
        <Route
          path={ROUTES.OPERATIONS_CUSTOMERS}
          element={<GuestCustomerList />}
        />
        <Route path={ROUTES.OPERATIONS_METERS} element={<Meters />} />
        <Route path={ROUTES.ADD_METER} element={<NeuronAddMeter />} />
        <Route path={ROUTES.EDIT_METER} element={<EditMeterPage />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.OPERATIONS_NigeriaSmsDashboard} element={<NigeriaSmsDashboard />} />

        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
}
