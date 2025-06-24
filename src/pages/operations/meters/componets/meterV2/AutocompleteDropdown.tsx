import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

type OptionType = {
  id: number | string;
  name: string;
};

interface Props {
  name: string;
  label: string;
  control: any;
  options: OptionType[];
  onChangeCallback?: (id: any, name: string) => void;
  sx?: any;
}

const ControlledAutocompleteDropdown = ({
  name,
  label,
  control,
  options,
  onChangeCallback,
  sx = {},
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption =
          options.find((option) => option.name === field.value) || null;

        return (
          <Autocomplete
            fullWidth
            options={Array.isArray(options) ? options : []}
            getOptionLabel={(option: any) =>
              typeof option === "string" ? option : option?.name
            }
            value={selectedOption}
            onChange={(_, value) => {
              const id = value?.id || "";
              const name = value?.name || "";
              field.onChange(name); // Update form field with meter name
              onChangeCallback?.(id, name);
            }}
            renderInput={(params) => (
              <TextField {...params} label={label} sx={sx} />
            )}
          />
        );
      }}
    />
  );
};

export default ControlledAutocompleteDropdown;
