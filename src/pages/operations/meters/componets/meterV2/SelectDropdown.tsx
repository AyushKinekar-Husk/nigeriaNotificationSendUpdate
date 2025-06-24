
import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

type OptionType = {
  id: number | string;
  name: string;
};

interface Props {
  name: string;
  label: string;
  control: any;
  options: OptionType[];
  defaultValue?: any;
  onChangeCallback?: (value: any) => void;
  disabled?: boolean;
  sx?: any;
}

const ControlledSelectDropdown = ({
  name,
  label,
  control,
  options,
  defaultValue,
  onChangeCallback,
  disabled = false,
  sx = {},
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          select
          label={label}
          onChange={(e) => {
            field.onChange(e);
            onChangeCallback?.(e.target.value);
          }}
          disabled={disabled}
          sx={sx}
        >
          {options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default ControlledSelectDropdown;
