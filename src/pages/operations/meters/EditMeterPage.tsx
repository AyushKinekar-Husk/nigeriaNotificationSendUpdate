
import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getEditMeterFormStyles } from "../../../styles/pages/meters/EditMeterForm.styles";
import { EditMeterViewModel } from "../../../viewmodel/EditMeterViewModel";

const meterStates = ["SPARE", "DEFECTIVE", "REPEATER"];

const EditMeterPage = () => {
  const theme = useTheme();
  const styles = getEditMeterFormStyles(theme);
  const {
    meterSerial,
    meterState,
    setMeterState,
    handleSave,
    handleCancel,
    isSaving,
  } = EditMeterViewModel();

  if (!meterSerial) return null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerRow}>
        <Typography variant="h6" sx={styles.heading}>
          SparkMeterV2 – Edit Meter
        </Typography>

        <Box sx={styles.buttonGroup}>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSave}
            variant="contained"
            loading={isSaving}
            sx={{ backgroundColor: "#28a745" }}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>

      <Box sx={styles.formGrid}>
        <TextField
          fullWidth
          label="Meter Serial"
          value={meterSerial}
          disabled
          sx={styles.textField}
        />
        <TextField
          fullWidth
          select
          label="Meter State"
          value={meterState}
          onChange={(e) => setMeterState(e.target.value)}
          sx={styles.textField}
        >
          {meterStates.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default React.memo(EditMeterPage);
