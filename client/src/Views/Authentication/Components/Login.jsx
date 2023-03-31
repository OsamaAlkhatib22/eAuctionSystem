import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Authorize } from "../Service/Auth";
import "../Style/Auth.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    const request = {
      strLogin: data.email,
      strPassword: data.password,
    };
    await Authorize.Login(request);
  };

  return (
    <div className="Login">
      <Typography variant="h1">Login Page (prototype)</Typography>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="login-wrap">
        <br />
        <Typography variant="h2">ادخل بياناتك</Typography>
        <br />
        <TextField
          {...register("email")}
          variant="filled"
          type="email"
          name="email"
          label="Email"
          className="email"
          sx={{
            "& .MuiInputBase-input": {
              height: "10px",
              fontSize: "large",
            },
          }}
          required
        />
        <p>{errors.email?.message}</p>
        <br />
        <br />
        <TextField
          {...register("password")}
          variant="filled"
          type="password"
          name="password"
          label="Password"
          className="password"
          sx={{
            "& .MuiInputBase-input": {
              height: "10px",
              fontSize: "large",
            },
          }}
          required
        />
        <p>{errors.password?.message}</p>
        <div className="log-sign">
          <button className="sbmt-btn" type="submit">
            Sign in
          </button>
          <br />
          <br />
          <Link className="newUser" to={"/Register"}>
            New User
          </Link>
        </div>
      </form>
    </div>
  );
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

export default Login;
