import React, { useEffect, useContext } from "react";

// Mui
import { Stack, IconButton, Button, Switch } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material/";
import { DataGrid } from "@mui/x-data-grid";

// Project Imports
import { GetWorkersApi } from "../../../Common/Services/GetWorkersApi";

// Context
import TaskCreationContext from "../Context/TaskCreationContext";

const TaskTeamInput = ({ step, setStep }) => {
  const { workers, setWorkers, leader, setLeader, members, setMembers } =
    useContext(TaskCreationContext);

  useEffect(() => {
    const GetWorkers = async () => {
      setWorkers(await GetWorkersApi());
    };
    GetWorkers();
    setLeader(null);
    setMembers([]);
  }, [setWorkers, setLeader, setMembers]);

  useEffect(() => {
    if (!leader && members.length > 0) {
      setLeader(members[0]);
    }
  }, [leader, members, setLeader]);

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
    { field: "strName", headerName: "Full Name", flex: 0.5 },
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
    <Stack>
      <div style={{ height: "80vh" }}>
        <div style={{ height: "65%", marginBottom: "1rem" }}>
          <DataGrid
            hideFooterSelectedRowCount
            sx={gridStyle}
            rows={workers}
            columns={WorkersTable}
            getRowId={(row) => row.intId}
            density="compact"
          />
        </div>
        <div style={{ height: "30%" }}>
          <DataGrid
            hideFooter
            sx={gridStyle}
            rows={members}
            columns={MembersTable}
            getRowId={(row) => row.intId}
            density="compact"
          />
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: "1rem" }}
        onClick={() => setStep(3)}
      >
        Next
      </Button>
    </Stack>
  );
};

export default TaskTeamInput;
