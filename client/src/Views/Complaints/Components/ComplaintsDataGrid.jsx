import {
  Box,
  IconButton,
  Avatar,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddCircleOutline, ArrowCircleUp } from "@mui/icons-material/";

function StatusColor(status) {
  switch (status) {
    case "pending":
      return "info";
    case "rejected":
      return "error";
    case "approved":
      return "primary";
    case "in progress":
      return "secondary";
    case "waiting evaluation":
      return "primary";
    case "completed":
      return "success";
    case "re-filed":
      return "default";
    default:
      return "primary";
  }
}

const ComplaintsDataGrid = ({ AddComplaint, data }) => {
  const theme = useTheme();
  const columns = [
    {
      field: "button",
      headerName: "Action",
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => AddComplaint(params.row.intComplaintId)}
        >
          <AddCircleOutline />
        </IconButton>
      ),
    },
    { field: "intComplaintId", headerName: "ID", flex: 0.5 },
    {
      field: "strUserName",
      headerName: "User",
      flex: 1,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          avatar={<Avatar>{params.row.strUserName[0]}</Avatar>}
          label={params.row.strUserName}
          sx={{
            "& .MuiChip-label": { color: theme.palette.grey[500] },
          }}
        />
      ),
    },
    { field: "strComplaintTypeEn", headerName: "Type", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="h5"
          display="flex"
          alignItems="center"
          gap="0.5rem"
        >
          <ArrowCircleUp />
          {params.row.priority}
        </Typography>
      ),
    },
    { field: "dtmDateCreated", headerName: "Date Created", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={StatusColor(params.row.status)}
          variant="outlined"
          sx={{
            width: "7rem",
            height: "1.5rem",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        />
      ),
    },
  ];

  return (
    <Box margin="2rem 0 0 0" height="75vh">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.intComplaintId}
        components={{ Toolbar: GridToolbar }}
        density="compact"
      />
    </Box>
  );
};

export default ComplaintsDataGrid;
