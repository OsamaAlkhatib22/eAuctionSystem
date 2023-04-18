import React, { useState, useEffect } from "react";

// Mui
import { useTheme, Typography, SwipeableDrawer } from "@mui/material";

// Project Imports
import { GetComplaintsApi } from "./Service/GetComplaintsApi";
import ComplaintsDataGrid from "./Components/ComplaintsDataGrid";
import { GetComplaintByidApi } from "./Service/GetComplaintByidApi";
import ComplaintEvaluationSlider from "./Components/ComplaintEvaluationSlider";
import TaskCreationSlider from "./Components/TaskCreationSlider";

const ViewComplaints = () => {
  const theme = useTheme();
  const [complaint, setComplaint] = useState({ lstMedia: [] });
  const [complaints, setComplaints] = useState([]);
  const [next, setNext] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const setComplaintsView = async () => {
      const response = await GetComplaintsApi();
      setComplaints(response.data);
    };
    setComplaintsView();
  }, []);

  const photos = complaint.lstMedia.map((media) => ({
    media: `data:image/jpg;base64, ${media}`,
    title: complaint.intComplaintId,
  }));

  return (
    <div>
      <Typography variant="h1">View Complaints</Typography>
      <ComplaintsDataGrid
        data={complaints}
        AddComplaint={async (params) => {
          const response = await GetComplaintByidApi(params);
          setComplaint(response.data);
          setDrawerOpen(true);
        }}
      />
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setNext(false);
        }}
        onOpen={() => setDrawerOpen(true)}
      >
        {next ? (
          <TaskCreationSlider photos={photos} complaint={complaint} />
        ) : (
          <ComplaintEvaluationSlider
            photos={photos}
            theme={theme}
            complaint={complaint}
            setNext={setNext}
          />
        )}
      </SwipeableDrawer>
    </div>
  );
};

export default ViewComplaints;
