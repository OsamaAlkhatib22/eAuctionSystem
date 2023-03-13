import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

// Form resolvers
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Mui
import { Button, Paper, Stack, Snackbar, Alert } from "@mui/material";

// Mui Icons
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

// Project imports
import FormAutocompleteBox from "../../../Components/UI/FormFields/FormAutocompleteBox";
import FormDatePicker from "../../../Components/UI/FormFields/FormDatePicker";
import FormTextField from "../../../Components/UI/FormFields/FormTextField";

// Form schema
const schema = yup.object({
  origin: yup.string().required("This field is required"),
  destination: yup.string().required("This field is required"),
  date: yup
    .date()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be in the past."
    )
    .required("This field is required")
    .typeError("This field is required"),
  passengers: yup
    .number()
    .positive("Number must be positive")
    .integer("Number must be an integer")
    .required("This field is required")
    .typeError("This field is required"),
  intermediateCities: yup
    .array()
    .of(yup.object({ value: yup.string().required("This field is required") })),
});

// Component Function
const TripForm = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = React.useState(false);

  // Form Methods
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "intermediateCities",
  });
  const onInvalid = (errors) => {
    console.log(errors);
  };
  const onSubmit = (data) => {
    if (
      [
        data.origin,
        data.destination,
        ...data.intermediateCities.map((city) => city.value),
      ].includes("Dijon")
    ) {
      setShowError(true);
      return null;
    }

    navigate({
      pathname: "/trip",
      search: `?${createSearchParams(data)}`,
    });
  };

  // Render
  return (
    <FormProvider {...methods}>
      <Stack spacing={5}>
        <Paper sx={{ width: "72rem", height: "8rem" }}>
          <Stack spacing={3.5} sx={{ alignItems: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-around", marginTop: "1.5rem" }}
            >
              <FormAutocompleteBox
                label="City of Origin"
                name="origin"
                endIcon={<LocationOnIcon />}
              />
              <FormAutocompleteBox
                label="City of Destination"
                name="destination"
                endIcon={<LocationOnIcon />}
              />
              <FormDatePicker label="Date of Trip" name="date" />
              <FormTextField
                name="passengers"
                label="Number of Passengers"
                endIcon={<PersonIcon />}
              />
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Button
                onClick={handleSubmit(onSubmit, onInvalid)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "1rem" }}
              >
                Search
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => append({ value: "" })}
                sx={{ borderRadius: "1rem" }}
              >
                Add Intermediate City
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ width: "72rem" }}>
          <Stack direction="row" spacing={2} sx={{ padding: "1.5rem" }}>
            {fields.map(({ id }, index) => (
              <FormAutocompleteBox
                key={id}
                name={`intermediateCities.[${index}].value`}
                iconButton={<DeleteIcon />}
                label="Intermediate City"
                onClickIcon={() => remove(index)}
              />
            ))}
          </Stack>
        </Paper>
      </Stack>
      <Snackbar
        open={showError}
        autoHideDuration={1000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setShowError(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }

            setShowError(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          Unknown Error!
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default TripForm;
