import * as yup from "yup";

const SearchFormSchema = yup.object({
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

export default SearchFormSchema;
