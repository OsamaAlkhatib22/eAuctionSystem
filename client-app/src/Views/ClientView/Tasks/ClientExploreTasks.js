import React, { useState, useEffect } from "react";
import { 
Box, 
IconButton,
Typography, 
Card, 
CardContent, 
Divider,
Slider,
Autocomplete,
TextField ,
FormControl,
InputLabel,
Input, 
} from "@mui/material";
import { useTheme } from "@emotion/react";
import HomeHeader from '../Home/HomeHeader';
import { fetchTasks } from "../../FreeLancerView/Home/Service/Auth";
import '../../FreeLancerView/Home/Styling/FreeLancerHome.css';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ExploreTasks = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTasks();
        const filteredData =
        (selectedCategories.length > 0
          ? data.filter((task) =>
              selectedCategories.some(
                (category) => category.id === task.intCategoryId
              )
            )
          : data
        ).filter((task) =>
          selectedSkills.length > 0
            ? selectedSkills.every((skill) =>
                task.intSkillIds.includes(skill.id)
              )
            : true
        ) .filter((task) =>
        selectedBudget > 0 ? task.budget >= selectedBudget : true
      ).filter((task) =>
      selectedDate
        ? new Date(task.creationDate) >= selectedDate
        : true
    ) .filter((task) =>
    selectedDateTo
      ? new Date(task.creationDate) <= selectedDateTo
      : true
  );
    setTasks(filteredData);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    loadData();
  }, [selectedCategories, selectedSkills, selectedBudget, selectedDate, selectedDateTo]);

  const handleTaskClick = (ServiceId) => {
    console.log("Task clicked. Navigating to:", `/ctask/${ServiceId}`);
    navigate(`/ctask/${ServiceId}`);
  };

  const handleGoBack = () => {
    navigate("/ClientHome");
  };

  //filtering

  const ClientcategoryOptions = [
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

  const FilterTaskClientskillsOptions = [
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
    <HomeHeader />
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Task Cards Section */}
      <Box sx={{ flex: 2, display: "grid", gap: 2 }}>
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
              width: "1000px",
              margin: "10px",
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
                {task.description.length > 150
                  ? `${task.description.substring(0, 150)}...`
                  : task.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Filter Section */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          backgroundColor: "#F0F0F0", // Set your desired background color
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Card>
            <CardContent>
              <Typography variant="h6">Category </Typography>
              <Autocomplete
                multiple
                id="category-filter"
                options={ClientcategoryOptions}
                getOptionLabel={(option) => option.name}
                value={selectedCategories}
                onChange={(event, newValue) => setSelectedCategories(newValue)}
                renderInput={(params) => <TextField {...params} label="Categories" />}
              />
            </CardContent>
          </Card>

          <Card>
          <CardContent>
            <Typography variant="h6">Skills </Typography>
            <Autocomplete
              multiple
              id="skills-filter"
              options={FilterTaskClientskillsOptions}
              getOptionLabel={(option) => option.name}
              value={selectedSkills}
              onChange={(event, newValue) => setSelectedSkills(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Skills" />
              )}
            />
          </CardContent>
        </Card>
        <Card>
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

           <Card>
            <CardContent>
              <Typography variant="h6">Date Created </Typography>

              <FormControl fullWidth>
                <InputLabel></InputLabel>
                <Input
                  type="date"
                  value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                  onChange={(event) => {
                    const newDate = event.target.value ? new Date(event.target.value) : null;
                    setSelectedDate(newDate);
                  }}
                />
              </FormControl>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Date To </Typography>

              <FormControl fullWidth>
                <InputLabel></InputLabel>
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

export default ExploreTasks;