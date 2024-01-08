import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Components/Context';
import { fetchFreeLancerTaskList, fetchFreeLancerCompletedTaskList } from './Service/Auth';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  styled,
} from '@mui/material';
import FreeLancerHomeHeader from '../Home/FreeLancerHomeHeader';

const StyledDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
});

const TaskBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  whiteSpace: 'pre-wrap',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  width: '100%',
  margin: '10px',

  "&:hover": {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 5, // Adjust the number of lines to display
}));

function FreeLancerMyTask() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const processTasks = await fetchFreeLancerTaskList(token);
          const completedTasks = await fetchFreeLancerCompletedTaskList(token);
          setTasks(processTasks);
          setCompletedTasks(completedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Separate tasks based on status
  const inAuctionTasks = tasks.filter((task) => task.status === 'In Auction');
  const inProcessTasks = tasks.filter((task) => task.status === 'In Process');

  const HandleTaskInAuctionClick = (ServiceId) => {
    navigate(`/FreeLancerMyTaskDetails/${ServiceId}`)
  };

  const HandleTaskProcessClick = (ServiceId) => {
    navigate(`/FreeLancerTaskInProcessDetails/${ServiceId}`);
   
  };
  const HandleTaskCompletedClick = (ServiceId) => {
    console.log('Task clicked. Navigating to:', `/task/${ServiceId}`);
    navigate(`/FreeLancerTaskCompletedDetails/${ServiceId}`);
  };

  return (
    <div>
      <FreeLancerHomeHeader />

      <Box m={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              My Tasks
            </Typography>
            <Divider />

            {loading ? (
              <StyledDiv>
                <CircularProgress />
              </StyledDiv>
            ) : (
              <Grid container spacing={2}>
                {inAuctionTasks.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          In Auction Status
                        </Typography>
                        {inAuctionTasks.map((task) => (
                          // Use a div instead of Link
                          <div
                            key={task.ServiceId}
                            
                            onClick={() => HandleTaskInAuctionClick(task.serviceId) }
                          >
                            <TaskBox>
                              <Typography variant="body1">
                                Title: {task.title}{'\n'}
                                Created by: {task.firstName} {task.lastName}{'\n'}
                                Creation Date: {task.creationDate ? new Date(task.creationDate).toLocaleDateString() : 'Invalid Date'}{'\n'}
                                Description: {task.description.length > 100
                                              ? `${task.description.substring(0, 100)}...`
                                               : task.description}{'\n'}             
                                Status: {task.status}
                              </Typography>
                            </TaskBox>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                {inProcessTasks.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          In Process Status
                        </Typography>
                        {inProcessTasks.map((task) => (
                          <div
                            key={task.ServiceId}
                            onClick={() => {
                              HandleTaskProcessClick(task.serviceId);
                            }}
                          >
                            <TaskBox>
                              <Typography variant="body1">
                                Title: {task.title}{'\n'}
                                Created by: {task.firstName} {task.lastName}{'\n'}
                                Creation Date:{' '}
                                {task.creationDate
                                  ? new Date(task.creationDate).toLocaleDateString()
                                  : 'Invalid Date'}
                                {'\n'}
                                Description: {task.description}{'\n'}
                                Status: {task.status}
                              </Typography>
                            </TaskBox>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                {completedTasks.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Completed Tasks
                        </Typography>
                        {completedTasks.map((task) => (
                          <div
                            key={task.ServiceId}
                            onClick={() => {
                              HandleTaskCompletedClick(task.serviceId);
                            }}
                          >
                            <TaskBox>
                              <Typography variant="body1">
                                Title: {task.title}{'\n'}
                                Created by: {task.firstName} {task.lastName}{'\n'}
                                Creation Date:{' '}
                                {task.creationDate
                                  ? new Date(task.creationDate).toLocaleDateString()
                                  : 'Invalid Date'}
                                {'\n'}
                                Description: {task.description}{'\n'}
                                Status: {task.status}
                              </Typography>
                            </TaskBox>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                )}

                {inAuctionTasks.length === 0 &&
                  inProcessTasks.length === 0 &&
                  completedTasks.length === 0 && (
                    <Grid item xs={12}>
                      <Typography variant="body1">No tasks available.</Typography>
                    </Grid>
                  )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default FreeLancerMyTask;
