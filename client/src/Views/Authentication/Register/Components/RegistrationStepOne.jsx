import { FormProvider, useForm } from "react-hook-form";

// Mui
import {
  Button,
  Stack,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

// Third Party
import { yupResolver } from "@hookform/resolvers/yup";

// Project Imports
import FormTextField from "../../../../Common/Components/UI/FormFields/FormTextField";
import { RegisterStepOne } from "../../Utils/Schemas";

const RegistrationStepOne = ({
  selectedOption,
  setSelectedOption,
  setRequest,
  request,
  setStep,
}) => {
  const methods = useForm({
    resolver: yupResolver(RegisterStepOne),
    defaultValues: {
      firstname: request?.strFirstName,
      lastname: request?.strLastName,
      username: request?.strUsername,
    },
  });
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          setRequest({
            ...request,
            strFirstName: data.firstname,
            strLastName: data.lastname,
            strUsername: data.username,
            strPassword: data.password,
          });
          setStep(2);
        })}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <FormTextField name="firstname" label="First Name" />
            <FormTextField name="lastname" label="Last Name" />
          </Stack>
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
          <FormTextField name="username" label="Username" />
          <FormTextField name="password" label="Password" type="password" />
          <FormTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ borderRadius: "1rem" }}
          >
            Next
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default RegistrationStepOne;
