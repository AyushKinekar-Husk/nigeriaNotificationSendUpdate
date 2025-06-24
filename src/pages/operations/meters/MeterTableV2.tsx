import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  GlobalStyles,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import MeterV2FilterDrawer from "./componets/meterV2/MeterV2FilterDrawer";
import MeterV2Table from "./componets/meterV2/MeterV2Table";
import MeterV2Card from "./componets/meterV2/MeterV2Card";
import React, { useState } from "react";
import { MeterTableViewModel } from "../../../viewmodel/MeterTableViewModel";
import { getMeterTableV2Styles } from "../../../styles/pages/meters/MeterTableV2.styles";

const MeterTableV2 = () => {
  const theme = useTheme();
  const styles = getMeterTableV2Styles(theme);

  const {
    current,
    pageSize,
    data,
    isLoading,
    totalPages,
    searchQuery,
    setSearchQuery,
    fetchData,
    setCurrent,
    setPageSize,
    handleExport,
    triggerSearch,
    openDrawer,
    setOpenDrawer,
    searchDate,
    setSearchDate,
    isMobile,
  } = MeterTableViewModel();

  const ScrollbarStyles = (
    <GlobalStyles
      styles={{
        body: {
          fontFamily: "Roboto, sans-serif",
          fontSize: "13px",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: theme.palette.background.paper,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[800],
          borderRadius: "4px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.grey[700],
        },
      }}
    />
  );

  return (
    <Box sx={styles.rootContainer}>
      {ScrollbarStyles}

      {/* <Typography variant="h5" sx={styles.title}>
        SparkMeterV2 Details
      </Typography> */}

      <Box sx={styles.innerContainer}>
        {isMobile ? (
          <>
            <MeterV2FilterDrawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchDate={searchDate}
              setSearchDate={setSearchDate}
              onSearch={triggerSearch}
              onExport={handleExport}
            />

            <Box sx={styles.filterToggle}>
              <Stack
                direction="row"
                sx={styles.filterButton}
                onClick={() => setOpenDrawer(true)}
              >
                <FilterListIcon sx={{ color: theme.palette.success.main }} />
                <Typography sx={styles.filterText}>Filter</Typography>
              </Stack>
            </Box>

            {(data?.data || []).map((item) => (
              <MeterV2Card key={item.CustomerId} customer={item} />
            ))}

            <Stack direction="row" spacing={2} sx={styles.pagination}>
              <IconButton
                onClick={() => setCurrent(1)}
                disabled={current === 1}
                sx={{ color: theme.palette.success.main }}
              >
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={() => setCurrent(current - 1)}
                disabled={current === 1}
                sx={{ color: theme.palette.success.main }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="body2" sx={styles.pageNumber}>
                {current}
              </Typography>
              <IconButton
                onClick={() => setCurrent(current + 1)}
                disabled={current >= totalPages}
                sx={{ color: theme.palette.success.main }}
              >
                <ChevronRightIcon />
              </IconButton>
              <IconButton
                onClick={() => setCurrent(totalPages)}
                disabled={current >= totalPages}
                sx={{ color: theme.palette.success.main }}
              >
                <LastPageIcon />
              </IconButton>
              <IconButton
                onClick={()=>fetchData(true)}
                sx={{ color: theme.palette.success.main }}
                title="Refresh"
              >
                <RefreshIcon />
              </IconButton>
            </Stack>
          </>
        ) : (
          <MeterV2Table
            data={data}
            isLoading={isLoading}
            current={current}
            pageSize={pageSize}
            setCurrent={setCurrent}
            setPageSize={setPageSize}
            triggerExport={handleExport}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={triggerSearch}
            fetchData={fetchData}
          />
        )}
      </Box>
    </Box>
  );
};

export default React.memo(MeterTableV2);
