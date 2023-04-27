import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// Mui
import {
  Button,
  Snackbar,
  Stack,
  Typography,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";

// Project Imports
import { EvaluateTaskApi } from "./Service/EvaluateTaskApi";
import { GetTaskDetailsApi } from "./Service/GetTaskDetailsApi";
import TaskDetails from "./Components/TaskDetails";
import MediaGallery from "../../Common/Components/MediaGallery";
import FormTextFieldMulti from "../../Common/Components/UI/FormFields/FormTextFieldMulti";
import FormRatingGroup from "../../Common/Components/UI/FormFields/FormRatingGroup";
import FormRowRadioGroup from "../../Common/Components/UI/FormFields/FormRadioGroup";
import TasksDataGrid from "./Components/TasksDataGrid";
import ScrollableContent from "../../Common/Components/ScrollableContent";

const testPhotos = [
  {
    media: "https://picsum.photos/id/10/800",
    title: "Test 1",
  },
  {
    media: "https://picsum.photos/id/13/800",
    title: "Test 2",
  },
  {
    media: "https://picsum.photos/id/14/800",
    title: "Test 3",
  },
];
const radioOptions = ["Failed", "Incomplete", "Completed"];

const CreateTask = () => {
  const methods = useForm();
  const theme = useTheme();
  const [taskId, setTaskId] = useState(0);
  const [task, setTask] = useState(testPhotos);

  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <div>
      <Typography variant="h1">Evaluate task</Typography>
      <TasksDataGrid
        EvaluateTask={(params) => {
          setTaskId(params);
          setDrawerOpen(true);
        }}
      />
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <ScrollableContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Stack spacing={2} width="32.5vw">
                <MediaGallery
                  items={task}
                  height="25rem"
                  width="auto"
                  borderRadius="1rem"
                />
                <TaskDetails theme={theme} taskId={taskId} />
                <FormRatingGroup name="rating" />
                <FormTextFieldMulti label="Comment" name="comment" />
                <FormRowRadioGroup
                  name="status"
                  radioLabel="Status"
                  labels={radioOptions}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ borderRadius: "1rem" }}
                >
                  Next
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </ScrollableContent>
      </SwipeableDrawer>
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
