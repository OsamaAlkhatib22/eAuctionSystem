import { Box, Button, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";
import ComplaintsTypesApi from "../Service/ComplaintTypesApi";

const ComplaintsTypeForm = () => {
  const methods = useForm();

  const onSubmit = async (data) => {
    try {
      await ComplaintsTypesApi(data);
      console.log("Conn...");
      console.log("Done.. OK");
    } catch (error) {
      console.log("Error While Connect.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextField name="intDepartmentId" label="Department ID" />
        <br />
        <br />
        <FormTextField name="strNameAr" label="Arabic Name" />
        <br />
        <br />
        <FormTextField name="strNameEn" label="English Name" />
        <br />
        <br />

        <FormTextField name="intPrivacyId" label="Privacy" />
        <br />
        <br />

        <FormTextField name="decGrade" label="Grade" />
        <br />
        <br />

        <Button type="submit" sx={{ width: "100%" }} variant="contained">
          Add
        </Button>
      </form>
    </FormProvider>
  );
};

export default ComplaintsTypeForm;