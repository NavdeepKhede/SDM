import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, helperText, isDisabled, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      disabled={isDisabled}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          disabled={isDisabled}
          value={
            typeof field.value === "number" && field.value === "string" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
          sx={{
            bgcolor: (theme) => theme.palette.primary.light
          }}
        />
      )}
    />
  );
}
