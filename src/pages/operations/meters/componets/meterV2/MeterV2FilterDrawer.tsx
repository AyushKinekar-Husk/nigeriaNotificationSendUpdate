import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getStyles } from "../../../../../styles/component/MeterV2FilterDrawer.styles";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchDate: string;
  setSearchDate: (value: string) => void;
  onSearch: () => void;
  onExport?: () => void;
}

const MeterV2FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  searchQuery,
  setSearchQuery,
  searchDate,
  setSearchDate,
  onSearch,
  onExport,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: styles.drawerPaper }}
    >
      <Box sx={styles.headerBox}>
        <Typography sx={styles.headerTitle}>Filters</Typography>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2}>
        <TextField
          placeholder="Search here..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ sx: styles.textFieldInput }}
        />

        <TextField
          placeholder="Select date"
          fullWidth
          size="small"
          type="date"
          sx={styles.dateInput}
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          InputProps={{ sx: styles.textFieldInput }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={onSearch}
          sx={styles.searchButton}
        >
          Search
        </Button>

        <Divider sx={styles.divider} />

        <Button
          variant="outlined"
          fullWidth
          onClick={onExport}
          sx={styles.exportButton}
        >
          Export
        </Button>
      </Stack>
    </Drawer>
  );
};

export default React.memo(MeterV2FilterDrawer);
