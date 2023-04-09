import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

export const RegisterJoSchema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.string().min(10).max(10).required(),
  password: yup.string().min(8).max(32).required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  national: yup.string().required(),
  registrationnumber: yup.string().required(),
  NationalIdNumber: yup.string().required(),
});

export const RegisterNonJoSchema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.string().min(10).max(10).required(),
  password: yup.string().min(8).max(32).required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  passport: yup.string().required(),
});
