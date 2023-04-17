import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// Third Party
import dayjs from "dayjs";

// Mui
import {
  Button,
  TextField,
  Snackbar,
  Stack,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material/";
import useMediaQuery from "@mui/material/useMediaQuery";

// Project Imports
import { CreateTaskApi } from "../Service/CreateTaskApi";
import FormDatePicker from "../../../Common/Components/UI/FormFields/FormDatePicker";
import FormTextFieldMulti from "../../../Common/Components/UI/FormFields/FormTextFieldMulti";
import FormMultiDropDown from "../../../Common/Components/UI/FormFields/FormMultiDropDown";
import FormTextField from "../../../Common/Components/UI/FormFields/FormTextField";
import FormAutocompleteBox from "../../../Common/Components/UI/FormFields/FormAutocompleteBox";
import { GetWorkersApi } from "../../../Common/Services/GetWorkersApi";
import ScrollableContent from "../../../Common/Components/ScrollableContent";
import { FlexBetween } from "../../../Common/Components/FlexBetween";
import { DataGrid } from "@mui/x-data-grid";

const TaskCreationSlider = ({ complaint }) => {
  const methods = useForm();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [workers, setWorkers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const GetWorkers = async () => {
      setWorkers(await GetWorkersApi());
    };
    GetWorkers();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // if (CreateTaskApi(data, complaint.intId)) {
    //   setSnackbarMessage("Task created successfully!");
    //   setSnackbarOpen(true);
    // } else {
    //   setSnackbarMessage("Failed to create task.");
    //   setSnackbarOpen(true);
    // }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h1">Create task</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ScrollableContent>
            <FlexBetween>
              <VisualInputs
                complaint={complaint}
                isNonMobile={isNonMobile}
                methods={methods}
                workers={workers}
              />
              <FiledsInput
                complaint={complaint}
                isNonMobile={isNonMobile}
                methods={methods}
                workers={workers}
              />
            </FlexBetween>
          </ScrollableContent>
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

const FiledsInput = ({ complaint, isNonMobile, methods, workers }) => {
  return (
    <Stack spacing={2} width="22.5vw">
      <TextField
        name="complaintId"
        label="Complaint ID"
        fullWidth
        defaultValue={complaint.intId}
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
        disabled
      />
      <FormMultiDropDown
        name="workers"
        label="Select Workers"
        items={workers}
      />
      <FormAutocompleteBox
        multiple
        name="leader"
        label="Select Leader"
        items={methods.watch("workers")}
      />
      <FormDatePicker
        name="startDate"
        label="Select a Start Date"
        minDate={dayjs()}
        maxDate={methods.watch("endDate")}
      />
      <FormDatePicker
        name="endDate"
        label="Select an End Date"
        minDate={methods.watch("startDate") || dayjs()}
      />
      <FormTextField name="cost" label="Cost" />
      <FormAutocompleteBox name="taskType" label="Task Type" items={[]} />
      <FormTextFieldMulti name="comment" label="Comment" />
      <Button type="submit">Create Task</Button>
    </Stack>
  );
};

const VisualInputs = ({ complaint, isNonMobile, methods, workers }) => {
  return (
    <Stack spacing={2} width="31.5vw">
      <Box width="35rem" height="25rem">
        <DataGrid
          sx={{
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              width: "0.4rem",
              borderRadius: "0.4rem",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "0.4rem",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "0.4rem",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
              background: "#555",
              borderRadius: "0.4rem",
            },
          }}
          rows={workers}
          columns={[
            {
              field: "button",
              headerName: "Add To Team",
              flex: 0.2,
              renderCell: (params) => (
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => params.row.strName}
                >
                  <AddCircleOutline />
                </IconButton>
              ),
            },
            { field: "intId", headerName: "ID", flex: 0.15 },
            { field: "strName", headerName: "Full Name", flex: 0.65 },
          ]}
          getRowId={(row) => row.intId}
          density="compact"
        />
      </Box>
    </Stack>
  );
};

export default TaskCreationSlider;
