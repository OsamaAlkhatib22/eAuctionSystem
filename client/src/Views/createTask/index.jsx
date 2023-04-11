import React, { useState } from "react";
import App from "./index.css";
import FormDatePicker from "../../Common/Components/UI/FormFields/FormDatePicker";
import { useForm, FormProvider } from "react-hook-form";
import CustomizedHook from "../../Common/Components/UI/FormFields/CustomizedHook";
import { Button, TextField, Snackbar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import axios from "../../Common/Utils/AxiosAgent";
import FormTextField from "../../Common/Components/UI/FormFields/FormTextField";

const CreateTask = (complaint) => {
  const { intComplaintId } = useParams();

  const methods = useForm();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [names, setNames] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleNameChange = (e) => {
    setNames(e.target.value);
  };

  const onSubmit = async (data) => {
    const taskData = {
      decCost: data.cost,
      scheduledDate: data.startDate,
      deadlineDate: data.endDate,
      strComment: data.comment,
      workersList: data.Employees.map((emp) => ({
        intId: emp.id,
        isLeader: emp.name === data.Leader[0].name,
      })),
    };

    try {
      var request = await axios.post(`api/tasks/${intComplaintId}`, taskData);
    } catch (error) {
      console.log(request);
    }

    /*
      .then((response) => {
        // handle successful response here
        setSnackbarMessage("Task created successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        // handle error here
        setSnackbarMessage("Failed to create task.");
        setSnackbarOpen(true);
      });
      console.log(request);
      */
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App">
      <h1>Create task</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          <br />
          <br />
          <CustomizedHook name="Employees" label="Select Employees" />
          <br />
          {/* Leader */}
          <CustomizedHook name="Leader" label="Select Leader" />
          <br />
          <br />
          <FormDatePicker name="startDate" label="Select a Start Date" />
          <FormDatePicker name="endDate" label="Select an End Date" />
          <br />
          <br />
          <FormTextField label="Cost" onChange={handleNameChange} name="cost" />
          <br />
          <br />
          <FormTextField
            label="Task Type"
            onChange={handleNameChange}
            name="taskType"
          />
          <br />
          <br />
          {/* editied + task type */}
          <FormTextField
            label="Comment"
            onChange={handleNameChange}
            name="comment"
          />
          <Button type="submit">Create Task</Button>
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
