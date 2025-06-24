import React from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getStyles } from "../styles/component/NeuronPagination.styles";

interface CustomPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onReload?: (flag:boolean) => void;
}

const NeuronPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onReload,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = (): number[] => {
    const maxPages = 10;
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 4);
    let end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const renderPageButtons = () =>
    getPageNumbers().map((page) => (
      <Box
        key={page}
        onClick={() => onPageChange(page)}
        sx={styles.pageButton(page === currentPage)}
      >
        {page}
      </Box>
    ));

  const renderIconButton = (
    icon: React.ReactElement,
    disabled: boolean,
    onClick: () => void
  ) => (
    <IconButton size="small" disabled={disabled} onClick={onClick}>
      {icon}
    </IconButton>
  );

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <Box sx={styles.container}>
      {/* Left: Pagination buttons */}
      <Stack direction="row" spacing={1} alignItems="center">
        {renderIconButton(<FirstPageIcon sx={styles.icon} />, currentPage === 1, () =>
          onPageChange(1)
        )}
        {renderIconButton(
          <ChevronLeftIcon sx={styles.icon} />,
          currentPage === 1,
          () => onPageChange(currentPage - 1)
        )}

        <Box sx={{ display: "flex", gap: 0.5 }}>
          {renderPageButtons()}
          {currentPage + 9 < totalPages && <Box sx={styles.ellipsis}>...</Box>}
        </Box>

        {renderIconButton(
          <ChevronRightIcon sx={styles.icon} />,
          currentPage >= totalPages,
          () => onPageChange(currentPage + 1)
        )}
        {renderIconButton(
          <LastPageIcon sx={styles.icon} />,
          currentPage >= totalPages,
          () => onPageChange(totalPages)
        )}
      </Stack>

      {/* Right: Page size & info */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Select
          size="small"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          sx={styles.select}
        >
          {[10, 20, 50, 100].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>

        <Typography sx={styles.itemsText}>items per page</Typography>
        <Typography sx={styles.itemsText}>
          {startItem} - {endItem} of {totalItems} items
        </Typography>

        <IconButton onClick={() => onReload && onReload(true)}>
          <RefreshIcon sx={styles.refreshIcon} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default React.memo(NeuronPagination);
