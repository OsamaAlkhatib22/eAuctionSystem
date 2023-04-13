import React, { useState, useEffect } from "react";

// Mui
import {
  useTheme,
  Button,
  Stack,
  Typography,
  Box,
  SwipeableDrawer,
} from "@mui/material";

// Project Imports
import { GetComplaintsApi } from "./Service/GetComplaintsApi";
import ComplaintDetails from "./Components/ComplaintDetails";
import ComplaintsDataGrid from "./Components/ComplaintsDataGrid";
import ScrollableContent from "../../Common/Components/ScrollableContent";
import PhotoGallery from "../../Common/Components/UI/PhotoGallery";
import { GetComplaintByidApi } from "./Service/GetComplaintByidApi";

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

const ViewComplaints = () => {
  const theme = useTheme();
  const [complaint, setComplaint] = useState({});
  const [complaints, setComplaints] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const setComplaintsView = async () => {
      const response = await GetComplaintsApi();
      setComplaints(response.data);
    };
    setComplaintsView();
  }, []);

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
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <ScrollableContent>
          <Stack spacing={2} width="22.5vw">
            <PhotoGallery items={testPhotos} height="25rem" width="auto" />
            <ComplaintDetails theme={theme} complaint={complaint} />
            <Box display="flex" gap="1rem" justifyContent="center">
              <Button
                variant="outlined"
                color="error"
                sx={{
                  borderRadius: "0.75rem",
                }}
              >
                Reject
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="success"
                sx={{ borderRadius: "0.75rem" }}
              >
                Approve
              </Button>
            </Box>
          </Stack>
        </ScrollableContent>
      </SwipeableDrawer>
    </div>
  );
};

export default ViewComplaints;
