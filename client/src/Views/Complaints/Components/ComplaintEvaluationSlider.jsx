import React from "react";

// Mui
import { Button, Stack, Box, Typography, IconButton } from "@mui/material";
import { ChevronLeftOutlined } from "@mui/icons-material/";

// Project Imports
import ComplaintDetails from "./ComplaintDetails";
import ScrollableContent from "../../../Common/Components/ScrollableContent";
import MediaGallery from "../../../Common/Components/MediaGallery";

const ComplaintEvaluationSlider = ({ photos, theme, complaint, setNext }) => {
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
          Evaluate Complaint
        </Typography>
        <MediaGallery
          items={photos}
          height="25rem"
          width="auto"
          borderRadius="1rem"
        />
        <ComplaintDetails theme={theme} complaint={complaint} />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              flex: "1 1 auto",
              borderRadius: "1rem",
            }}
          >
            Reject
          </Button>
          <Button
            onClick={setNext}
            variant="contained"
            color="success"
            sx={{
              flex: "1 1 auto",
              borderRadius: "1rem",
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </ScrollableContent>
  );
};

export default ComplaintEvaluationSlider;
