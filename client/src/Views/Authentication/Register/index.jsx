import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// Mui
import {
  Typography,
  Button,
  Stack,
  Paper,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";

// Third Party
import { yupResolver } from "@hookform/resolvers/yup";

// Project Imports
import { Authorize } from "../Service/Auth";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";

import {
  RegisterJoSchema as schemaJo,
  RegisterNonJoSchema as schemaNonJo,
} from "../Utils/Schemas";

const Register = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Jordanian");

  const schema = selectedOption === "Jordanian" ? schemaJo : schemaNonJo;

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const onInvalid = (errors) => {
    console.log(errors);
  };

  const onSubmit = async (data) => {
    const request = {
      strUsername: data.username,
      strPhonenumber: data.phone,
      strFirstName: data.password,
      strLastName: data.firstname,
      strPassword: data.lastname,
      strEmail: data.email,
      strNationalId: data.national,
      strPassportNumber: data.passport,
      strRegistrationNumber: data.registrationnumber,
      strNationalIdNumber: data.NationalIdNumber,
    };
    await Authorize.Register(request);

    navigate({
      pathname: "/dashboard",
    });
  };

  //<Typography variant="h1">Login Page (prototype)</Typography>
  function getInputs(selectedOption) {
    if (selectedOption === "Jordanian") {
      return (
        <>
          <FormTextField name="national" label="National ID" />
          <FormTextField
            name="registrationnumber"
            label="Registration Number"
          />
          <FormTextField name="NationalIdNumber" label="National ID Number" />
        </>
      );
    } else if (selectedOption === "Non-Jordanian") {
      return (
        <>
          <FormTextField name="passport" label="Passport" />
        </>
      );
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper
        sx={{
          width: "25%",
          minWidth: "30rem",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Nationality</FormLabel>
            <RadioGroup
              row
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <FormControlLabel
                value="Jordanian"
                control={<Radio />}
                label="Jordanian"
              />
              <FormControlLabel
                value="Non-Jordanian"
                control={<Radio />}
                label="Non-Jordanian"
              />
            </RadioGroup>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Stack spacing={2}>
              <FormTextField name="username" label="Username" />
              <FormTextField name="phone" label="Phonenumber" />
              <FormTextField name="password" label="Password" type="password" />
              <FormTextField name="firstname" label="First Name" />
              <FormTextField name="lastname" label="Last Name" />
              <FormTextField name="email" label="Email" />
            </Stack>
            <Stack spacing={2}>{getInputs(selectedOption)}</Stack>
          </Stack>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              onClick={handleSubmit(onSubmit, onInvalid)}
              color="primary"
              variant="contained"
              sx={{ borderRadius: "1rem" }}
            >
              Create New User
            </Button>
          </Box>
        </Stack>
      </Paper>
    </FormProvider>
  );
};

export default Register;
