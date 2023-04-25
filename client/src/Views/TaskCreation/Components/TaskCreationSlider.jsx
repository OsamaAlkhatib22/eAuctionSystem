import React, { useState } from "react";

// Mui
import { Stack, Typography, IconButton } from "@mui/material";
import { ChevronLeftOutlined } from "@mui/icons-material/";

// Project Imports
import TaskDetailsInput from "./TaskDetailsInput";
import TaskTeamInput from "./TaskTeamInput";

const TaskCreationSlider = ({ photos, complaint, step, setStep }) => {
  const [next, setNext] = useState(false);

  return (
    <Stack spacing={2}>
      <Typography
        variant="h2"
        sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <IconButton onClick={() => setStep(step - 1)}>
          <ChevronLeftOutlined />
        </IconButton>
        Create Task
      </Typography>

      {next ? (
        <TaskTeamInput step={step} setStep={setStep} />
      ) : (
        <TaskDetailsInput
          photos={photos}
          complaint={complaint}
          setNext={setNext}
          step={step}
          setStep={setStep}
        />
      )}
    </Stack>
  );
};

export default TaskCreationSlider;
