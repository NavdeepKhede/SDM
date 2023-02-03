import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  options: PropTypes.array,
};

export default function RHFAutocomplete({
  name,
  label,
  helperText,
  options,
  isDisabled,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          {...other}
          options={options}
          disabled={isDisabled}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) =>
            typeof option.key === "string" || option instanceof String
              ? option.key
              : ""
          }
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              disabled={isDisabled}
              sx={{
                bgcolor: (theme) => theme.palette.primary.light,
              }}
            />
          )}
          onChange={(_, data) => {
            onChange(data);
          }}
        />
      )}
    />
  );
}
