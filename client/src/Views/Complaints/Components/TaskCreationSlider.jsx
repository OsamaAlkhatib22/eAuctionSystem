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
  Switch,
  Divider,
  useTheme,
} from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  Storage,
  ChevronLeftOutlined,
} from "@mui/icons-material/";
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
import FormDateTimePicker from "../../../Common/Components/UI/FormFields/FormDateTimePicker";
import MediaGallery from "../../../Common/Components/MediaGallery";

// Consts

const TaskCreationSlider = ({ photos, complaint }) => {
  const methods = useForm();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [workers, setWorkers] = useState([]);
  const [members, setMembers] = useState([]);
  const [leader, setLeader] = useState(null);
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
    <ScrollableContent>
      <Stack spacing={2} width="32.5vw">
        <Typography
          variant="h2"
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <IconButton>
            <ChevronLeftOutlined />
          </IconButton>
          Create Task
        </Typography>
        <MediaGallery
          items={photos}
          height="25rem"
          width="auto"
          borderRadius="1rem"
        />
        <Divider variant="middle" />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* <VisualInputs
                complaint={complaint}
                isNonMobile={isNonMobile}
                methods={methods}
                setWorkers={setWorkers}
                workers={workers}
                members={members}
                setMembers={setMembers}
                leader={leader}
                setLeader={setLeader}
              /> */}
            <TaskInput
              complaint={complaint}
              isNonMobile={isNonMobile}
              methods={methods}
              workers={workers}
            />
          </form>
        </FormProvider>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
        <Button type="submit" variant="contained" sx={{ borderRadius: "1rem" }}>
          Next
        </Button>
      </Stack>
    </ScrollableContent>
  );
};

const TaskInput = ({ complaint, methods }) => {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <FlexBetween>
        <Typography variant="h4">Details</Typography>
        <Typography
          variant="h5"
          color={theme.palette.grey[500]}
          display="flex"
          alignItems="center"
          gap="0.5rem"
        >
          <Storage />
          {complaint.intComplaintId}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h5" color={theme.palette.grey[500]}>
          Start Date:
        </Typography>
        <FormDateTimePicker
          name="startDate"
          minDateTime={dayjs()}
          maxDateTime={methods.watch("deadline")}
        />
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h5" color={theme.palette.grey[500]}>
          Due Date:
        </Typography>
        <FormDateTimePicker
          name="deadline"
          minDateTime={methods.watch("startDate") || dayjs()}
        />
      </FlexBetween>
      <FormAutocompleteBox name="taskType" label="Task Type" items={[]} />
      <FormTextFieldMulti name="comment" label="Comment" />
    </Stack>
  );
};
/*
const VisualInputs = ({
  complaint,
  isNonMobile,
  methods,
  workers,
  setWorkers,
  members,
  setMembers,
  leader,
  setLeader,
}) => {
  if (!leader) {
    setLeader(members[0]);
  }

  const gridStyle = {
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
  };

  const WorkersTable = [
    {
      field: "button",
      headerName: "Add To Team",
      flex: 0.2,
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() =>
            setWorkers(
              workers.filter((worker) => {
                if (worker.intId === params.row.intId) {
                  setMembers([...members, worker]);
                  return false;
                }
                return true;
              })
            )
          }
        >
          <AddCircleOutline />
        </IconButton>
      ),
    },
    { field: "intId", headerName: "ID", flex: 0.15 },
    { field: "strName", headerName: "Full Name", flex: 0.65 },
  ];

  const MembersTable = [
    {
      field: "button",
      headerName: "Remove",
      flex: 0.2,
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() =>
            setMembers(
              members.filter((member) => {
                if (member.intId === params.row.intId) {
                  if (member.intId === leader.intId) {
                    setLeader(null);
                  }
                  setWorkers([member, ...workers]);
                  return false;
                }
                return true;
              })
            )
          }
        >
          <RemoveCircleOutline />
        </IconButton>
      ),
    },
    { field: "intId", headerName: "ID", flex: 0.15 },
    { field: "strName", headerName: "Full Name", flex: 0.65 },
    {
      field: "switch",
      headerName: "Is Leader",
      flex: 0.2,
      renderCell: (params) => (
        <Switch
          checked={leader?.intId === params.row.intId}
          onClick={() =>
            setLeader({
              intId: params.row.intId,
              strName: params.row.strName,
            })
          }
        />
      ),
    },
  ];

  return (
    <Stack spacing={2} width="35.5vw">
      <Stack spacing={2} width="35rem" height="45rem">
        <DataGrid
          sx={gridStyle}
          rows={workers}
          columns={WorkersTable}
          getRowId={(row) => row.intId}
          density="compact"
        />
        <DataGrid
          sx={gridStyle}
          rows={members}
          columns={MembersTable}
          getRowId={(row) => row.intId}
          density="compact"
        />
      </Stack>
    </Stack>
  );
};
*/
export default TaskCreationSlider;
