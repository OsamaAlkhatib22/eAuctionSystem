import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Slider,
  Autocomplete,
  TextField,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import FreeLancerHomeHeader from "../Home/FreeLancerHomeHeader";
import TaskDetails from "../Home/TaskDetails";
import { fetchTasks, fetchTaskDetails } from "../Home/Service/Auth";
import "../Home/Styling/FreeLancerHome.css";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FreeLancerTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [selectedCategories, selectedSkills, selectedBudget, selectedDate, selectedDateTo]);

  const loadData = async () => {
    try {
      const data = await fetchTasks();
      const filteredData = (selectedCategories.length > 0
        ? data.filter((task) =>
            selectedCategories.some((category) => category.id === task.intCategoryId)
          )
        : data
      )
        .filter((task) =>
          selectedSkills.length > 0
            ? selectedSkills.every((skill) => task.intSkillIds.includes(skill.id))
            : true
        )
        .filter((task) => (selectedBudget > 0 ? task.budget >= selectedBudget : true))
        .filter((task) => (selectedDate ? new Date(task.creationDate) >= selectedDate : true))
        .filter((task) => (selectedDateTo ? new Date(task.creationDate) <= selectedDateTo : true));
      setTasks(filteredData);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const handleTaskClick = (ServiceId) => {
    // Use navigate to go to the TaskDetails page
    console.log("Task clicked. Navigating to:", `/task/${ServiceId}`);
    navigate(`/task/${ServiceId}`);
  };

  //filter

  const categoryOptions = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Frontend Development" },
    { id: 3, name: "Backend Development" },
    { id: 4, name: "Database Administration" },
    { id: 5, name: "DevOps" },
    { id: 6, name: "Mobile App Development" },
    { id: 7, name: "Game Development" },
    { id: 8, name: "Data Science" },
    { id: 9, name: "Machine Learning" },
    { id: 10, name: "Other Programming Services" },
  ];

  const FilterTaskskillsOptions = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React.js' },
    { id: 5, name: 'Angular' },
    { id: 6, name: 'Vue.js' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'Express.js' },
    { id: 9, name: 'Python' },
    { id: 10, name: 'Django' },
    { id: 11, name: 'Flask' },
    { id: 12, name: 'Java' },
    { id: 13, name: 'Spring Framework' },
    { id: 14, name: 'OOP' },
    { id: 15, name: '.NET' },
    { id: 16, name: 'SQL' },
    { id: 17, name: 'MySQL' },
    { id: 18, name: 'PostgreSQL' },
    { id: 19, name: 'MongoDB' },
    { id: 20, name: 'Git' },
    { id: 21, name: 'DevOps' },
    { id: 22, name: 'Mobile App Development' },
    { id: 23, name: 'iOS Development' },
    { id: 24, name: 'Android Development' },
    { id: 25, name: 'Unity' },
    { id: 26, name: 'Data Science' },
    { id: 27, name: 'Machine Learning' },
    { id: 28, name: 'TensorFlow' },
    { id: 29, name: 'PyTorch' },
    { id: 30, name: 'Game Development' },
    { id: 31, name: 'C++' },
    {id: 32, name: 'c#'},
    { id: 33, name: 'Unity3D' },
    
];
  

return (
  <div>
    <FreeLancerHomeHeader />
    <Box
      sx={{
        display: "flex",
        gap: 2,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Tasks Grid */}
      <Box
        sx={{
          flex: 2,
          display: "grid",
          gap: 2,
          fontFamily: "Roboto, sans-serif",
          placeItems: "left",
        }}
      >
        {tasks.map((task) => (
          <Card
            key={task.serviceId}
            sx={{
              borderRadius: "15px",
              cursor: "pointer",
              backgroundColor: "#F5F5F5",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              width: "100%", // Full width
              margin: "10px", // Add margin for spacing between cards
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => handleTaskClick(task.serviceId)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {task.title || "No Title"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`${task.firstName || "Unknown"} ${task.lastName || "Unknown"}`}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {`Created on: ${new Date(task.creationDate).toLocaleString() || "Unknown Date"}`}
              </Typography>
              <Typography variant="body1">
                {task.description.length > 10
                  ? `${task.description.substring(0, 10)}...`
                  : task.description}
              </Typography>
              <Typography variant="body1">
                Category: {task.strCategoryName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Task Skills:</strong> {task?.strSkills?.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ flex: 1, marginLeft: 2 }}>
  <Typography variant="h5" gutterBottom>
    <FilterAltIcon sx={{ fontSize: 20, marginRight: 1 }} />
    Filtering
  </Typography>

  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">Category </Typography>
      <Autocomplete
        multiple
        id="category-filter"
        options={categoryOptions}
        getOptionLabel={(option) => option.name}
        value={selectedCategories}
        onChange={(event, newValue) => setSelectedCategories(newValue)}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
    </CardContent>
  </Card>

  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">Skills </Typography>
      <Autocomplete
        multiple
        id="skills-filter"
        options={FilterTaskskillsOptions}
        getOptionLabel={(option) => option.name}
        value={selectedSkills}
        onChange={(event, newValue) => setSelectedSkills(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Skills" />
        )}
      />
    </CardContent>
  </Card>

  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">Budget </Typography>
      <Slider
        value={selectedBudget}
        onChange={(event, newValue) => setSelectedBudget(newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={1000}
      />
    </CardContent>
  </Card>

  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">Date Range </Typography>
      <FormControl fullWidth>
        <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
          From
        </Typography>
        <Input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(event) => {
            const newDate = event.target.value ? new Date(event.target.value) : null;
            setSelectedDate(newDate);
          }}
        />
      </FormControl>

      <FormControl fullWidth mt={2}>
        <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
          To
        </Typography>
        <Input
          type="date"
          value={selectedDateTo ? selectedDateTo.toISOString().split("T")[0] : ""}
          onChange={(event) => {
            const newDate = event.target.value ? new Date(event.target.value) : null;
            setSelectedDateTo(newDate);
          }}
        />
      </FormControl>
    </CardContent>
  </Card>
</Box>
    </Box>
  </div>
);
};

export default FreeLancerTask;
