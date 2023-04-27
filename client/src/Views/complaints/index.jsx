import React, { useState, useEffect } from "react";

// Mui
import { Typography, SwipeableDrawer } from "@mui/material";

// Project Imports
import { GetComplaintsApi } from "./Service/GetComplaintsApi";
import ComplaintsDataGrid from "./Components/ComplaintsDataGrid";
import { GetComplaintByidApi } from "./Service/GetComplaintByidApi";
import ComplaintEvaluation from "./Components/ComplaintEvaluation";
import TaskCreation from "../TaskCreation";
import ScrollableContent from "../../Common/Components/ScrollableContent";
import { DateFormatterEn } from "../../Common/Utils/DateFormatter";

const ViewComplaints = () => {
  const [complaint, setComplaint] = useState({ lstMedia: [] });
  const [complaints, setComplaints] = useState([]);

  const [approved, setApproved] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const setComplaintsView = async () => {
      const response = await GetComplaintsApi();
      setComplaints(response.data);
    };
    setComplaintsView();
  }, []);

  const FormatDate = () => {
    const rows = [...complaints];
    rows.forEach((c) => (c.dtmDateCreated = DateFormatterEn(c.dtmDateCreated)));
    return rows;
  };

  const photos = complaint.lstMedia.map((media, index) => ({
    media: `data:image/jpg;base64, ${media}`,
    title: complaint.intComplaintId + "-" + index,
  }));

  return (
    <div>
      <Typography variant="h1">View Complaints</Typography>
      <ComplaintsDataGrid
        data={FormatDate()}
        AddComplaint={async (params) => {
          const response = await GetComplaintByidApi(params);
          setComplaint(response.data);
          setApproved(false);
          setDrawerOpen(true);
        }}
      />
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        PaperProps={{ style: { width: "65%" } }}
      >
        <ScrollableContent>
          {approved ? (
            <TaskCreation
              photos={photos}
              complaint={complaint}
              CloseDrawer={() => setDrawerOpen(false)}
            />
          ) : (
            <ComplaintEvaluation
              photos={photos}
              complaint={complaint}
              setApproved={setApproved}
            />
          )}
        </ScrollableContent>
      </SwipeableDrawer>
    </div>
  );
};

export default ViewComplaints;
