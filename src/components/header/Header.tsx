import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { getStyles } from "../../styles/component/Header.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import logo from "../../../public/logo.png"; 

type HeaderProps = {
  sticky?: boolean;
  onToggleSidebar: () => void;
};
  type UserDetails = {
    firstName?: string;
    lastName?: string;
    // add other fields if needed
  };


export const Header: React.FC<HeaderProps> = ({
  sticky = true,
  onToggleSidebar,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = getStyles(theme, isXs);
  const { mode, setMode } = useContext(ColorModeContext);
  const userDetails = useSelector<RootState, UserDetails | undefined>(
    (state) => state.user.userDetails
  );

  

  const CountrySelector = () =>
    !isXs && (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <img
          src="https://flagcdn.com/w40/in.png"
          width="20"
          height="14"
          alt="India"
          style={styles.flag}
        />
        <Typography variant="body2" color="text.primary">
          India
        </Typography>
        <ArrowDropDownIcon sx={styles.arrowDown} />
      </Stack>
    );

  const UserAvatar = () => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Avatar sx={styles.personAvatar}>
        <PersonIcon sx={styles.personIcon} />
      </Avatar>
      {!isXs && (
        <>
          <Typography variant="body2" color="text.primary">
            {(userDetails?.firstName ?? "") +" "+ (userDetails?.lastName ?? "") || "User"}
          </Typography>
          <ArrowDropDownIcon sx={styles.arrowDown} />
        </>
      )}
    </Stack>
  );

  const ThemeToggle = () => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Switch
        checked={mode === "dark"}
        onChange={setMode}
        size="small"
        sx={styles.switch}
      />
      {!isXs && (
        <Typography variant="body2" color="text.primary">
          {mode === "dark" ? "D" : "L"}
        </Typography>
      )}
    </Stack>
  );

  return (
    <AppBar position={sticky ? "sticky" : "relative"} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Left: Menu + Logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton color="inherit" onClick={onToggleSidebar} sx={{ p: 0.5 }}>
            <MenuIcon sx={styles.menuIcon} />
          </IconButton>
         <Box component="img" src={logo} alt="Husk Logo" sx={{ height: 33, ...styles.logoText }} />
        </Stack>

        {/* Center Title */}
        {!isXs && (
          <Typography sx={styles.centerTitle}>Husk Power Systems</Typography>
        )}

        {/* Right Controls */}
        <Stack direction="row" spacing={isXs ? 1 : 2} alignItems="center">
          <CountrySelector />
          <UserAvatar />
          <ThemeToggle />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
