import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings,
  MonetizationOn,
  ShoppingCart,
  People,
  Receipt,
  GridView,
  FiberManualRecord,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "../route/RouteConstant";
import { getStyles } from "../styles/component/NeuronSideBar.styles";
import { EXTERNAL_ROUTES } from "../api/routeUrls";

interface SectionItem {
  label: string;
  path: string;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children: SectionItem[];
}

interface CustomSiderProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const NeuronSideBar = ({ isDrawerOpen, toggleDrawer }: CustomSiderProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isActive = useCallback(
    (path: string) =>
      path && !path.startsWith("http") && location.pathname === path,
    [location.pathname]
  );

  const handleSectionClick = (
    title: string,
    hasChildren: boolean,
    path?: string
  ) => {
    if (hasChildren) {
      setActiveSection((prev) => (prev === title ? null : title));
    } else if (path) {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        window.location.href = path; // External link
      } else {
        navigate(path); // Internal route
      }
      toggleDrawer();
    }
  };

  const handleChildClick = (path: string) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    toggleDrawer();
  };


 const sections: Section[] = useMemo(
  () => [
    {
      title: "Overview",
      icon: <DashboardIcon />,
      children: [],
      path: EXTERNAL_ROUTES.OVERVIEW,
    },
    {
      title: "Dashboard",
      icon: <GridView />,
      children: [
        { label: "Dashboard Summary", path: EXTERNAL_ROUTES.DASHBOARD_SUMMARY },
        { label: "Noc Dashboard", path: EXTERNAL_ROUTES.NOC_DASHBOARD },
        { label: "Plant Dashboard", path: EXTERNAL_ROUTES.PLANT_DASHBOARD },
      ],
    },
    {
      title: "Report",
      icon: <Receipt />,
      children: [],
      path: EXTERNAL_ROUTES.GENERATE_REPORT,
    },
    {
      title: "Operations",
      icon: <Settings />,
      children: [
        { label: "Customers", path: EXTERNAL_ROUTES.CUSTOMER_LIST },
        { label: "Customers 360", path: EXTERNAL_ROUTES.CUSTOMER_DETAILS },
        { label: "Plant 360", path: EXTERNAL_ROUTES.PLANT_360 },
        { label: "Tariffs", path: EXTERNAL_ROUTES.TARIFFS },
        { label: "Plant Health", path: EXTERNAL_ROUTES.PLANT_HEALTH },
        { label: "Recharge", path: EXTERNAL_ROUTES.RECHARGE },
        { label: "Meters", path: ROUTES.OPERATIONS_METERS },
        { label: "IoT Remote Management", path: EXTERNAL_ROUTES.IOT_MANAGEMENT },
        { label: "Executive Transactions", path: EXTERNAL_ROUTES.EXEC_TRANS },
        { label: "Maintenance", path: EXTERNAL_ROUTES.MAINTENANCE },
        { label: "Electrician Complaint Management", path: EXTERNAL_ROUTES.ELECTRICIAN_CM },
        { label: "DG Tracking", path: EXTERNAL_ROUTES.DG_TRACKING },
        { label: "New Customer Revenue Target", path: EXTERNAL_ROUTES.REVENUE_TARGET },
        { label: "Inventory", path: EXTERNAL_ROUTES.INVENTORY },
        { label: "Biomass Maintenance", path: EXTERNAL_ROUTES.BIOMASS_MAINT },
      ],
    },
    {
      title: "Finance",
      icon: <MonetizationOn />,
      children: [
        { label: "In-progress Payment", path: EXTERNAL_ROUTES.CASH_PAYMENTS },
        { label: "Transactions", path: EXTERNAL_ROUTES.TRANSACTIONS },
        { label: "Bank Deposit", path: EXTERNAL_ROUTES.BANK_DEPOSIT },
        { label: "Expenses", path: EXTERNAL_ROUTES.EXPENSES },
        { label: "Budget", path: EXTERNAL_ROUTES.BUDGET },
        { label: "Offline Meter Details", path: EXTERNAL_ROUTES.OFFLINE_METER },
      ],
    },
    {
      title: "Sales",
      icon: <ShoppingCart />,
      children: [
        { label: "Products", path: EXTERNAL_ROUTES.PRODUCTS },
        { label: "Discounts", path: EXTERNAL_ROUTES.DISCOUNTS },
        { label: "Agents", path: EXTERNAL_ROUTES.AGENTS },
        { label: "Commission Schemes", path: EXTERNAL_ROUTES.COMMISSION_SCHEMES },
        { label: "Product Pipeline", path: EXTERNAL_ROUTES.PRODUCT_PIPELINE },
        { label: "Customer Pipeline", path: EXTERNAL_ROUTES.CUSTOMER_PIPELINE },
        { label: "Sales Executive Visit Tracking", path: EXTERNAL_ROUTES.VISIT_TRACKING },
      ],
    },
    {
      title: "Agents",
      icon: <People />,
      children: [
        { label: "Customers", path: EXTERNAL_ROUTES.AGENT_CUSTOMERS },
        { label: "Customers Recharge", path: EXTERNAL_ROUTES.AGENT_RECHARGE },
        { label: "Tariff Plan Change", path: EXTERNAL_ROUTES.PLAN_CHANGE },
        { label: "Agent Dashboard", path: EXTERNAL_ROUTES.AGENT_DASHBOARD },
        { label: "Agent Credit", path: EXTERNAL_ROUTES.AGENT_CREDIT },
      ],
    },
    {
      title: "Admin",
      icon: <Settings />,
      children: [
        { label: "Generation Potential", path: EXTERNAL_ROUTES.GENERATION_POTENTIAL },
        { label: "Plants", path: EXTERNAL_ROUTES.PLANTS },
        { label: "Plant Pipeline", path: EXTERNAL_ROUTES.PLANT_PIPELINE },
        { label: "Pole Management", path: EXTERNAL_ROUTES.POLE_MANAGEMENT },
        { label: "Country", path: EXTERNAL_ROUTES.COUNTRY },
        { label: "States", path: EXTERNAL_ROUTES.STATES },
        { label: "NOC", path: EXTERNAL_ROUTES.NOC },
        { label: "Block Rate Definition", path: EXTERNAL_ROUTES.BLOCK_RATE },
        { label: "TOU Period Definition", path: ROUTES.ADMIN_TOU },
        { label: "Template", path: EXTERNAL_ROUTES.TEMPLATE },
        { label: "Campaign", path: EXTERNAL_ROUTES.CAMPAIGN },
        { label: "Manual Cash Payments", path: EXTERNAL_ROUTES.MANUAL_PAYMENTS },
        { label: "Ticket(PDT)", path: EXTERNAL_ROUTES.TICKET_PDT },
        { label: "Operation Dashboard Monthly Summary", path: EXTERNAL_ROUTES.OPS_DASHBOARD_SUMMARY },
        { label: "Customer Dashboard Monthly Summary", path: EXTERNAL_ROUTES.CUSTOMER_DASHBOARD_SUMMARY },
        { label: "Finance Dashboard Monthly Summary", path: EXTERNAL_ROUTES.FINANCE_DASHBOARD_SUMMARY },
        { label: "Employee Info", path: EXTERNAL_ROUTES.EMPLOYEE_INFO },
        { label: "Inventory Configuration", path: EXTERNAL_ROUTES.INVENTORY_CONFIG },
        { label: "Setting", path: EXTERNAL_ROUTES.SETTING },
        { label: "Report Scheduler", path: EXTERNAL_ROUTES.REPORT_SCHEDULER },
        { label: "Customer Rewards", path: EXTERNAL_ROUTES.CUSTOMER_REWARDS },
      ],
    },
    {
      title: "CRM",
      icon: <People />,
      children: [
        { label: "Customer KYC Details", path: EXTERNAL_ROUTES.KYC_DETAILS },
        { label: "Customer Complaints", path: EXTERNAL_ROUTES.CUSTOMER_COMPLAINTS },
        { label: "Customer Survey", path: EXTERNAL_ROUTES.CUSTOMER_SURVEY },
      ],
    },
    {
      title: "Paystack",
      icon: <People />,
      children: [
        { label: "Paystack Transaction", path: ROUTES.PAYSTACK_TRANSACTIONS },
      ],
    },
    {
      title: "Access Control",
      icon: <Settings />,
      children: [
        { label: "Users", path: EXTERNAL_ROUTES.USERS },
        { label: "User Roles", path: EXTERNAL_ROUTES.USER_ROLES },
        { label: "Permissions", path: EXTERNAL_ROUTES.PERMISSIONS },
        { label: "Permission Categories", path: EXTERNAL_ROUTES.PERMISSION_CATEGORIES },
        { label: "Access Control List", path: EXTERNAL_ROUTES.ACL },
      ],
    },
    {
      title: "Logs",
      icon: <Settings />,
      children: [
        { label: "System Logs", path: EXTERNAL_ROUTES.SYSTEM_LOGS },
        { label: "Api Logs", path: EXTERNAL_ROUTES.API_LOGS },
        { label: "User Activity", path: EXTERNAL_ROUTES.USER_ACTIVITY },
        { label: "User Log Time", path: EXTERNAL_ROUTES.USER_LOG_TIME },
      ],
    },
  ],
  []
);


  const renderSections = () =>
    sections.map(({ title, icon, children, path }) => {
      const isOpen = activeSection === title;
      const hasChildren = children.length > 0;

      return (
        <Box key={title}>
          <ListItemButton
            onClick={() => handleSectionClick(title, hasChildren, path)}
            sx={{
              ...styles.listItem,
              ...(isOpen ? styles.listItemActive : {}),
            }}
          >
            <ListItemIcon sx={styles.listItemIcon}>{icon}</ListItemIcon>
            <ListItemText
              primary={title}
              primaryTypographyProps={{ fontSize: 14, fontWeight: 300 }}
            />
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {children.map(({ label, path }) => (
                  <ListItemButton
                    key={label}
                    onClick={() => handleChildClick(path)}
                    sx={{
                      ...styles.childItem,
                      ...(isActive(path) ? styles.childItemActive : {}),
                    }}
                  >
                    <ListItemIcon>
                      <FiberManualRecord sx={styles.childIcon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": styles.drawerPaper }}
    >
      <Box sx={styles.drawerHeader}>
        <Typography variant="h6" fontWeight={700}>
          Husk Neuron
        </Typography>
        <IconButton onClick={toggleDrawer} sx={styles.iconButton}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={styles.listContainer}>
        <List disablePadding>{renderSections()}</List>
      </Box>

      <Divider sx={styles.divider} />
      <Box sx={styles.versionBox}>v1.0.0.0</Box>
    </Drawer>
  );
};

export default React.memo(NeuronSideBar);