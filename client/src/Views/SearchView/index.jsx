import React from "react";

// Mui
import { Stack, Box } from "@mui/material";

// Project imports
import TripForm from "./Components/TripForm";

export default function SearchView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="1.5rem"
    >
      <Stack spacing={1}>
        {/* Map Box */}
        <Box
          sx={{
            width: "72rem",
            height: "24rem",
            borderRadius: "0.5rem 0.5rem 0 0",
            backgroundColor: "primary.main",
          }}
        ></Box>
        {/* Form Box */}
        <Box
          sx={{
            display: "flex",
            width: "72rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TripForm />
        </Box>
      </Stack>
    </Box>
  );
}
