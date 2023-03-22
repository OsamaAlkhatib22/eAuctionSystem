import React from "react";

// Third party
import debounce from "lodash.debounce";
import { Controller, useFormContext } from "react-hook-form";

// Mui
import { Autocomplete, TextField, IconButton } from "@mui/material";

// Mui Icons
import CircularProgress from "@mui/material/CircularProgress";

// Static Debug data
import { cities } from "../../../Data/CitiesData";

function GetOptions(query) {
  const citiesNames = cities.map((city) => city[0]);
  let filteredCities = [];

  if (query !== "") {
    filteredCities = citiesNames.filter((name) => {
      return typeof name === "string" && typeof query === "string"
        ? name.toLowerCase().includes(query.toLowerCase())
        : null;
    });
  }
  return filteredCities;
}

const FormAutocompleteBox = (props) => {
  const { control } = useFormContext();

  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const loading = open && load;

  const onChangeHandler = (event) => {
    const value = event?.target.value;
    setQuery(value);
    // move the load after the axios fetch
    setLoad(false);
  };

  const debouncedOnChangeHandler = React.useMemo(
    () => debounce(onChangeHandler, 350),
    []
  );

  React.useEffect(() => {
    if (open) {
      // here add await axios fetch
      setOptions(GetOptions(query));
    }
  }, [open, query]);

  return (
    <Controller
      name={props.name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Autocomplete
          options={options}
          onChange={(_, data) => onChange(data)}
          // freeSolo={true}
          // forcePopupIcon={true}
          onInputChange={(event) => {
            setLoad(true);
            debouncedOnChangeHandler(event);
          }}
          filterSelectedOptions={true}
          value={value || ""}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          color="primary"
          sx={{ width: "15rem" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={error ? true : false}
              helperText={error ? error.message : null}
              InputProps={{
                ...params.InputProps,
                endAdornment: props.iconButton ? (
                  <>
                    <IconButton onClick={props.onClickIcon}>
                      {props.iconButton}
                    </IconButton>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      props.endIcon
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ) : (
                  props.endIcon && (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        props.endIcon
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  )
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default FormAutocompleteBox;
