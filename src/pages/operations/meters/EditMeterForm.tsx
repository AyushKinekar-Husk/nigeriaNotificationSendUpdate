// components/EditMeterForm.tsx
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { getEditMeterFormStyles } from "../../../styles/pages/meters/EditMeterForm.styles";

const meterStates = ["SPARE", "DEFECTIVE", "REPEATER"];

type EditMeterFormProps = {
  initialData: string;
  onSubmit: (data: { MeterSerial: string; MeterState: string }) => void;
  onCancel: () => void;
};

const EditMeterForm: React.FC<EditMeterFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const theme = useTheme();
  const styles = getEditMeterFormStyles(theme);
  const [meterState, setMeterState] = useState<any>(initialData || "");

  const handleSubmit = () => {
    onSubmit({
      MeterSerial: initialData,
      MeterState: meterState,
    });
  };

  return (
 <Box sx={styles.container}>
  <Box sx={styles.headerRow}>
    <Typography variant="h6" sx={styles.heading}>
      SparkMeterV2 – Edit Meter
    </Typography>

    <Box sx={styles.buttonGroup}>
      <Button onClick={onCancel} variant="outlined" color="secondary">
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ backgroundColor: "#28a745" }}
      >
        Save
      </Button>
    </Box>
  </Box>

  <Box sx={styles.formGrid}>
    <TextField
      fullWidth
      label="Meter Serial"
      value={initialData}
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

export default React.memo(EditMeterForm);
