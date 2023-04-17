import React from "react";

// Mui
import { Button, Stack, Box } from "@mui/material";

// Project Imports
import ComplaintDetails from "./ComplaintDetails";
import ScrollableContent from "../../../Common/Components/ScrollableContent";
import PhotoGallery from "../../../Common/Components/PhotoGallery";

const ComplaintEvaluationSlider = ({ photos, theme, complaint, setNext }) => {
  return (
    <ScrollableContent>
      <Stack spacing={2} width="22.5vw">
        <PhotoGallery items={photos} height="25rem" width="auto" />
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
            onClick={setNext}
            variant="outlined"
            color="success"
            sx={{ borderRadius: "0.75rem" }}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </ScrollableContent>
  );
};

export default ComplaintEvaluationSlider;
