import React from "react";

// Third party
import { Controller, useFormContext } from "react-hook-form";

// Mui
import { TextField } from "@mui/material";

// Date picker
import dayjs from "dayjs";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormDatePicker = (props) => {
  const { control } = useFormContext();
  const [date, setDate] = React.useState(null);

  return (
    <Controller
      name={props.name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={props.label}
            value={date}
            minDate={dayjs()}
            onChange={(newDate) => {
              onChange(newDate);
              setDate(newDate);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={error ? true : false}
                helperText={error ? error.message : null}
                sx={{ width: "100%" }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormDatePicker;
