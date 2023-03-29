import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Authorize } from "../Service/Auth";
import "../Style/Auth.css";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedOption, setSelectedOption] = useState("option1");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    ...(selectedOption === "option1"
      ? {
          resolver: yupResolver(joSchema),
        }
      : {
          resolver: yupResolver(nonJoSchema),
        }),
  });

  const onSubmitHandler = async (data) => {
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
    await Authorize.Login(request);
    console.log("Done");
  };
  //<Typography variant="h1">Login Page (prototype)</Typography>
  function getInputs(selectedOption) {
    if (selectedOption === "option1") {
      return (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              {...register("username")}
              variant="filled"
              type="username"
              name="username"
              label="User Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 2",
              }}
              required
            />
            <TextField
              {...register("phone")}
              variant="filled"
              type="number" // check-------------------------
              name="phone"
              label="Phone Number"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 2",
              }}
              required
            />
            <TextField
              {...register("password")}
              variant="filled"
              type="password"
              name="password"
              label="Password"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("firstname")}
              variant="filled"
              type="name"
              name="firstname"
              label="First Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("lastname")}
              variant="filled"
              type="text"
              name="lastname"
              label="Last Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
            />
            <TextField
              {...register("email")}
              variant="filled"
              type="text"
              name="email"
              label="Email"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
            />
            <TextField
              {...register("national")}
              variant="filled"
              type="number"
              name="national"
              label="National ID"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("registrationnumber")}
              variant="filled"
              type="number"
              name="registrationnumber"
              label="Registration Number"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("NationalIdNumber")}
              variant="filled"
              type="number"
              name="NationalIdNumber"
              label="National ID Number"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
          </Box>
        </>
      );
    } else if (selectedOption === "option2") {
      return (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              {...register("username")}
              variant="filled"
              type="username"
              name="username"
              label="User Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 2",
              }}
              required
            />
            <TextField
              {...register("phone")}
              variant="filled"
              type="number" // check-------------------------
              name="phone"
              label="Phone Number"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 2",
              }}
              required
            />
            <TextField
              {...register("password")}
              variant="filled"
              type="password"
              name="password"
              label="Password"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("firstname")}
              variant="filled"
              type="name"
              name="firstname"
              label="First Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
            <TextField
              {...register("lastname")}
              variant="filled"
              type="text"
              name="lastname"
              label="Last Name"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
            />
            <TextField
              {...register("email")}
              variant="filled"
              type="text"
              name="email"
              label="Email"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
            />
            <TextField
              {...register("passport")}
              variant="filled"
              type="number"
              name="passport"
              label="Passport"
              className="email"
              sx={{
                "& .MuiInputBase-input": {
                  height: "10px",
                  fontSize: "large",
                },
                gridColumn: "span 4",
              }}
              required
            />
          </Box>
        </>
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          اردني
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          غير اردني
        </label>
      </div>
      {getInputs(selectedOption)}
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" className="sbmt-color" variant="contained">
          Create New User
        </Button>
      </Box>
      <br />
    </form>
  );
};

//Schema for Jordanian

const joSchema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.string().min(10).max(10),
  password: yup.string().min(8).max(32).required(),
  firstname: yup.string().required(),
  lastname: yup.string(),
  email: yup.string().email(),
  national: yup.string().required(),
  registrationnumber: yup.string().required(),
  NationalIdNumber: yup.string().required(),
});

//schemaJor for Non-Jordanian

const nonJoSchema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.string().min(10).max(10),
  password: yup.string().min(8).max(32).required(),
  firstname: yup.string().required(),
  lastname: yup.string(),
  email: yup.string().email(),
  passport: yup.string().required(),
});

export default Register;
