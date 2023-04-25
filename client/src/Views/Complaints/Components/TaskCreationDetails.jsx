import React, { useContext } from "react";

// Mui
import {
  Stack,
  Divider,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import { CalendarMonth, Storage } from "@mui/icons-material";
import { styled } from "@mui/system";

// Project Imports
import { FlexBetween } from "../../../Common/Components/FlexBetween";

// Context
import TaskCreationContext from "../../TaskCreation/Context/TaskCreationContext";
import { DateFormatterEn } from "../../../Common/Utils/DateFormatter";

const MuiAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  "& .MuiAvatar-root": {
    width: "1.5rem",
    height: "1.5rem",
    fontSize: "0.75rem",
    color: theme.palette.grey[500],
  },
}));

const TaskCreationDetails = ({ setStep }) => {
  const theme = useTheme();
  const { task, members, leader } = useContext(TaskCreationContext);
  return (
    <Box>
      <Stack spacing={2}>
        <Box width="25rem">
          <Typography variant="h2">{task.taskType.strName}</Typography>
          <Typography variant="h6" color={theme.palette.grey[500]}>
            Al Jama'a Street 10, Amman
          </Typography>
        </Box>
        <Divider variant="middle" />
        <FlexBetween>
          <Typography variant="h4">Details</Typography>
          <Typography
            variant="h5"
            color={theme.palette.grey[500]}
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <Storage />
            {task.id}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Status
          </Typography>
          <Chip label={task.status} color="primary" variant="outlined" />
        </FlexBetween>
        <FlexBetween>
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Members
          </Typography>
          <Box>
            <MuiAvatarGroup max={4}>
              {members.map((member) => (
                <Avatar key={member.intId}>{member.strName[0]}</Avatar>
              ))}
            </MuiAvatarGroup>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Team Leader
          </Typography>
          <Chip
            variant="outlined"
            avatar={<Avatar>{leader.strName[0]}</Avatar>}
            label={leader.strName}
            sx={{
              "& .MuiChip-label": { color: theme.palette.grey[500] },
            }}
          />
        </FlexBetween>
        <FlexBetween>
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Start Date
          </Typography>
          <Chip
            variant="outlined"
            icon={<CalendarMonth color="primary" />}
            label={DateFormatterEn(task.startDate)}
            color="primary"
          />
        </FlexBetween>
        <FlexBetween>
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Due Date
          </Typography>
          <Chip
            variant="outlined"
            icon={<CalendarMonth color="primary" />}
            label={DateFormatterEn(task.dueDate)}
            color="primary"
          />
        </FlexBetween>
        <TextField
          label="Comment"
          multiline
          rows={4}
          readOnly
          value={task.comment}
        />
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => setStep(2)}
            variant="outlined"
            color="warning"
            sx={{
              flex: "1 1 auto",
              borderRadius: "1rem",
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{
              flex: "1 1 auto",
              borderRadius: "1rem",
            }}
          >
            Create Task
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TaskCreationDetails;
