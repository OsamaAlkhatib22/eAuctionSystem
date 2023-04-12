import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";

// Mui
import { Button, TextField, Snackbar, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Project Imports
import { CreateTaskApi } from "./Service/CreateTaskApi";
import FormDatePicker from "../../Common/Components/UI/FormFields/FormDatePicker";
import WorkersDropDown from "./Components/WorkersDropDown";
import FormTextField from "../../Common/Components/UI/FormFields/FormTextField";

const CreateTask = () => {
  const { intComplaintId } = useParams();
  const methods = useForm();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (data) => {
    if (CreateTaskApi(data, intComplaintId)) {
      setSnackbarMessage("Task created successfully!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Failed to create task.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App">
      <h1>Create task</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Complaint ID"
              name="complaintId"
              fullWidth
              defaultValue={intComplaintId}
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              disabled
            />
            <WorkersDropDown name="Employees" label="Select Employees" />
            <WorkersDropDown name="Leader" label="Select Leader" />
            <FormDatePicker name="startDate" label="Select a Start Date" />
            <FormDatePicker name="endDate" label="Select an End Date" />
            <FormTextField label="Cost" name="cost" />
            <FormTextField label="Task Type" name="taskType" />
            <FormTextField label="Comment" name="comment" />
            <Button type="submit">Create Task</Button>
          </Stack>
        </form>
      </FormProvider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CreateTask;
