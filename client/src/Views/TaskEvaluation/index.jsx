import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// Mui
import { Button, Paper, Snackbar, Stack } from "@mui/material";

// Project Imports
import { EvaluateTaskApi } from "./Service/EvaluateTaskApi";
import { GetTaskDetailsApi } from "./Service/GetTaskDetailsApi";
import PhotoGallery from "./Components/PhotoGallery";
import FormTextFieldMulti from "../../Common/Components/UI/FormFields/FormTextFieldMulti";
import FormRatingGroup from "../../Common/Components/UI/FormFields/FormRatingGroup";
import FormRowRadioGroup from "../../Common/Components/UI/FormFields/FormRadioGroup";

const testPhotos = [
  {
    image: "https://picsum.photos/id/10/800",
    title: "Test 1",
  },
  {
    image: "https://picsum.photos/id/13/800",
    title: "Test 2",
  },
  {
    image: "https://picsum.photos/id/14/800",
    title: "Test 3",
  },
];
const radioOptions = ["Failed", "Incomplete", "Completed"];

const CreateTask = () => {
  const methods = useForm();

  const [task, setTask] = useState(testPhotos);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const setTaskDetails = async () => {
      var response = await GetTaskDetailsApi();
      // setTask(response.data);
    };
    setTaskDetails();
  }, []);

  const onSubmit = (data) => {
    if (EvaluateTaskApi(data)) {
      setSnackbarMessage("Task evaluated successfully!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Failed to evaluate task.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App">
      <h1>Evaluate task</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Paper sx={{ padding: "2rem", width: "28rem" }}>
            <Stack spacing={2}>
              <PhotoGallery items={task} height="25rem" width="25rem" />
              <FormRatingGroup name="rating" />
              <FormTextFieldMulti label="Comment" name="comment" />
              <FormRowRadioGroup
                name="status"
                radioLabel="Status"
                labels={radioOptions}
              />
              <Button type="submit">Next</Button>
            </Stack>
          </Paper>
        </form>
      </FormProvider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CreateTask;
