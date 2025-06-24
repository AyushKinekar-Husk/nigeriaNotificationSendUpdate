import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { NeuronAddMeterViewModel } from "../../../viewmodel/NeuronAddMeterViewModel";
import { getNeuronAddMeterStyles } from "../../../styles/pages/meters/NeuronAddMeter.styles";
import ControlledSelectDropdown from "./componets/meterV2/SelectDropdown";
import ControlledAutocompleteDropdown from "./componets/meterV2/AutocompleteDropdown";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../route/RouteConstant";

export const NeuronAddMeter = () => {
  const theme = useTheme();
  const styles = getNeuronAddMeterStyles(theme);
  const { control, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const {
    plants,
    poles,
    servers,
    meterSerial,
    selectedPlant,
    selectedPole,
    selectedServer,
    setMeterSerial,
    setSelectedPlant,
    setSelectedPole,
    setSelectedServer,
    setSelectedMeter,
    handleSave,
    isLoading,
  } = NeuronAddMeterViewModel();

  const onSubmit = () => handleSave();

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.headerTitle}>SparkMeterV2 – Add New</Typography>
        <Box>
          <Button
            onClick={() => {
              navigate(ROUTES.OPERATIONS_METERS);
            }}
            variant="outlined"
            color="secondary"
            sx={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            sx={styles.saveButton}
            loading={isLoading}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>

      <Box sx={styles.formContainer}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ width: "100%" }}
        >
          {/* Left Section */}
          <Stack spacing={3} sx={{ flex: 1 }}>
            <ControlledSelectDropdown
              name="plantId"
              label="Select Plant Details"
              control={control}
              defaultValue={selectedPlant}
              options={plants}
              onChangeCallback={(value) => {
                const plantId = Number(value);
                setSelectedPlant(plantId);

                // Reset all dependent dropdowns
                setSelectedPole(null);
                setSelectedServer(null);
                setSelectedMeter(null);
                setMeterSerial([]);

                setValue("poleId", "");
                setValue("serverId", "");
                setValue("meterSerial", "");
              }}
              sx={styles.dropdown}
            />

            <ControlledSelectDropdown
              name="serverId"
              label="Select Plant Server Type"
              control={control}
              defaultValue={selectedServer}
              options={servers}
              disabled={!selectedPole}
              onChangeCallback={(value) => setSelectedServer(Number(value))}
              sx={styles.dropdown}
            />
          </Stack>

          {/* Right Section */}
          <Stack spacing={3} sx={{ flex: 1 }}>
            <ControlledSelectDropdown
              name="poleId"
              label="Select Pole Number"
              control={control}
              defaultValue={selectedPole?.id || ""}
              options={poles}
              disabled={!selectedPlant}
              onChangeCallback={(value) => {
                const pole = poles.find((p) => p.id === value);
                setSelectedPole(pole || null);

                // Reset meter selection when pole changes
                setSelectedMeter(null);
                setValue("meterSerial", "");
              }}
              sx={styles.dropdown}
            />

            <ControlledAutocompleteDropdown
              name="meterSerial"
              label="Select Meter Serial"
              control={control}
              options={meterSerial}
              onChangeCallback={(id, name) => {
                setSelectedMeter(name); // only update selected meter
              }}
              sx={styles.dropdown}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
