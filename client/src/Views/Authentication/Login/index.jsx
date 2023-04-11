import { useLocation, useNavigate, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// Mui
import { Typography, Button, Stack, Box } from "@mui/material";

// Third Party
import { yupResolver } from "@hookform/resolvers/yup";

// Project Imports
import { Authorize } from "../Service/Auth";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";
import Colors from "../../../Assets/Styles/_themes-vars.module.scss";
import Logo from "../../../Assets/Images/AmmanLogo.png";
import { IdentityHelper } from "../../../Common/Utils/IdentityHelper";

// Schema
import { LoginSchema as schema } from "../Utils/Schemas";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onInvalid = (errors) => {
    console.log(errors);
  };

  const onSubmit = async (data) => {
    const request = {
      strLogin: data.login,
      strPassword: data.password,
    };
    await Authorize.Login(request);

    if (IdentityHelper.isTokenValid())
      navigate({
        pathname: "/dashboard",
      });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Stack spacing={2} sx={{ width: "25vw" }}>
          <Box position="absolute" right="3rem" top="3rem">
            <img
              src={Logo}
              style={{
                width: "5rem",
              }}
              alt="Logo"
            />
          </Box>

          <Typography variant="h2">Log in</Typography>
          <Typography style={{ color: Colors.grey500 }}>
            Don't have an account?{" "}
            <Link
              style={{ textDecoration: "none", color: Colors.primary800 }}
              to={location.pathname + "/register"}
            >
              Register
            </Link>
          </Typography>
          <FormTextField name="login" label="Username/Phonenumber" />
          <FormTextField name="password" label="Password" type="password" />

          <Button
            onClick={handleSubmit(onSubmit, onInvalid)}
            color="primary"
            variant="contained"
            sx={{ borderRadius: "1rem" }}
          >
            Continue
          </Button>
          <Link
            style={{ textDecoration: "none", color: Colors.primary800 }}
            to={location.pathname + ""}
          >
            Forgot password?
          </Link>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default Login;
