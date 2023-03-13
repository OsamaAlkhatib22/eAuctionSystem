import React from "react";

// Mui
import { Typography, Box, Stack } from "@mui/material";

// Mui Icons
import PinDropIcon from "@mui/icons-material/PinDrop";
import MapIcon from "@mui/icons-material/Map";
import PushPinIcon from "@mui/icons-material/PushPin";

const LocationSection = (props) => {
  let icon;
  if (props.type === "origin") {
    icon = <PinDropIcon />;
  } else if (props.type === "intermediate") {
    icon = <MapIcon />;
  } else if (props.type === "destination") {
    icon = <PushPinIcon />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack direction="row">
        <Typography variant="subtitle">{`${props.distance} KM`}</Typography>

        <Box
          sx={{
            display: "flex",
            backgroundColor: "primary.main",
            borderRadius: "50%",
            height: "2rem",
            width: "2rem",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          {icon}
        </Box>
        <Stack>
          <Typography variant="h5">{props.location}</Typography>
          <Typography variant="h6">{props.type}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LocationSection;
