import { useLocation, useNavigate, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// Mui
import { Typography, Button, Stack } from "@mui/material";

// Third Party
import { yupResolver } from "@hookform/resolvers/yup";

// Project Imports
import { Authorize } from "../Service/Auth";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";
import Colors from "../../../Assets/Styles/_themes-vars.module.scss";

// Schema
import { LoginSchema as schema } from "../Utils/Schemas";

function Login({ setNewUser }) {
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
    if (await Authorize.Login(request))
      navigate({
        pathname: "/auth/dashboard",
      });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <Stack spacing={2} sx={{ width: "25vw" }}>
            <Typography variant="h2">Log in</Typography>
            <Typography style={{ color: Colors.grey500 }}>
              Don't have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: Colors.primary800 }}
                onClick={() => setNewUser(true)}
              >
                Register
              </Link>
            </Typography>
            <FormTextField name="login" label="Username/Phonenumber" />
            <FormTextField name="password" label="Password" type="password" />

            <Button
              type="submit"
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
        </form>
      </FormProvider>
    </div>
  );
}

export default Login;
