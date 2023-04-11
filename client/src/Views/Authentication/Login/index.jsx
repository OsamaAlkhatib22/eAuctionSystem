import { useNavigate, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// Mui
import { Typography, Button, Stack, Paper } from "@mui/material";

// Third Party
import { yupResolver } from "@hookform/resolvers/yup";

// Project Imports
import { Authorize } from "../Service/Auth";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";
import Colors from "../../../Assets/Styles/_themes-vars.module.scss";

// Schema
import { LoginSchema as schema } from "../Utils/Schemas";

function Login() {
  const navigate = useNavigate();
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

    navigate({
      pathname: "/dashboard",
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <FormProvider {...methods}>
        <Paper
          sx={{
            width: "20%",
            minWidth: "25rem",
            margin: "auto",
            padding: "2rem",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h2">ادخل بياناتك</Typography>
            <FormTextField name="login" label="Username/Phonenumber" />
            <FormTextField name="password" label="Password" type="password" />

            <Button
              onClick={handleSubmit(onSubmit, onInvalid)}
              color="primary"
              variant="contained"
              sx={{ borderRadius: "1rem" }}
            >
              Sign in
            </Button>
            <Typography>
              Don't have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: Colors.primary800 }}
                to={"/Register"}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </FormProvider>
    </div>
  );
}

export default Login;
