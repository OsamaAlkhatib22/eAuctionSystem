import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import HomeHeader from '../Home/HomeHeader';
import { fetchTaskDetails } from "../../FreeLancerView/Home/Service/Auth"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../Components/Context";

const ClientTaskDetails = () => {
  const { ServiceId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const calculateBidTimeLeft = (bidDuration) => {
    const [hoursStr, minutesStr, secondsStr] = bidDuration.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
  
    const now = new Date();
    const targetDate = new Date(now.getTime() + (hours * 60 * 60 + minutes * 60 + seconds) * 1000);
  
    const timeDifference = targetDate - now;
    if (timeDifference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  
    return {
      hours,
      minutes,
      seconds,
    };
  };

  const [bidTimeLeft, setBidTimeLeft] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchTaskDetails(ServiceId);
        setTaskDetails(details);
  
        if (details && details.bidDuration) {
          // Initialize bidTimeLeft here
          setBidTimeLeft(calculateBidTimeLeft(details.bidDuration));
        }
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };
  
    fetchData();
  }, [ServiceId]);
  
  useEffect(() => {
    let intervalId;
  
    if (taskDetails && taskDetails.bidDuration) {
      intervalId = setInterval(() => {
        setBidTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft && prevTimeLeft.seconds > 0) {
            return {
              ...prevTimeLeft,
              seconds: prevTimeLeft.seconds - 1,
            };
          } else if (prevTimeLeft && prevTimeLeft.minutes > 0) {
            return {
              ...prevTimeLeft,
              minutes: prevTimeLeft.minutes - 1,
              seconds: 59,
            };
          } else if (prevTimeLeft && prevTimeLeft.hours > 0) {
            return {
              ...prevTimeLeft,
              hours: prevTimeLeft.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            clearInterval(intervalId);
            // Handle timer expiration
            return {
              hours: 0,
              minutes: 0,
              seconds: 0,
            };
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(intervalId);
  
  }, [taskDetails?.bidDuration]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const targetDate = new Date(deadline);
    const timeDifference = targetDate - now;
  
    if (timeDifference <= 0) {
      return 'Expired';
    }
  
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    return `${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`;
  };

  return (
    <div>
      <HomeHeader />
      {taskDetails && (
        <Box sx={{ p: 3, fontFamily: "Roboto, sans-serif" }}>
          <IconButton onClick={handleGoBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            {taskDetails.title || "No Title"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`${taskDetails.firstName || "Unknown"} ${
              taskDetails.lastName || "Unknown"
            }`}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <Link to={`/SelectedProfileUserNameInfo/${taskDetails.clientUserName}`}>
              {taskDetails.clientUserName}
            </Link>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom>
                Task Description
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    {taskDetails.description || "No Description"}
                  </Typography>
                </CardContent>
              </Card>
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Task Attachments
                </Typography>
                {taskDetails.lstMedia &&
                  taskDetails.lstMedia.map((media, index) => (
                    <img
                      key={index}
                      alt={`Media ${index + 1}`}
                      src={`data:image/png;base64,${media}`}
                      style={{
                        width: "20%",
                        height: "20%",
                        marginBottom: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(media)}
                    />
                  ))}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom>
                Task Details
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    Budget: {taskDetails.starting_bid || "No Starting Bid"} $
                  </Typography>
                  <Typography variant="body1">
                    Bid Duration: {bidTimeLeft ? `${bidTimeLeft.hours} hours, ${bidTimeLeft.minutes} minutes, ${bidTimeLeft.seconds} seconds left` : 'Expired'}
                  </Typography>
                  <Typography variant="body1">
                    Category: {taskDetails.category_name || "No Category"}
                  </Typography>
                  <Typography variant="body1">
                    DeadLine: {calculateTimeLeft(taskDetails.taskSubmissionTime) || "No specific DeadLine"}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {`Created on: ${new Date(
                      taskDetails.creationDate
                    ).toLocaleString() || "Unknown Date"}`}
                  </Typography>
                </CardContent>
              </Card>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Skills Required for this Task
                </Typography>
                <Card>
                  <CardContent>
                    {taskDetails.skills ? (
                      taskDetails.skills.length > 0 ? (
                        taskDetails.skills.map((skill, index) => (
                          <Typography key={index} variant="body1">
                            - {skill}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2">No skills specified for this task.</Typography>
                      )
                    ) : (
                      <Typography variant="body2">Skills information not available for this task.</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Full-size Image</DialogTitle>
            <DialogContent>
              <img
                src={`data:image/png;base64,${selectedImage}`}
                alt="Full-size Image"
                style={{ width: "100%" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Box mt={3}>
                  <Typography variant="h6" gutterBottom>
                    Received Bids
                  </Typography>
                  {taskDetails.bids && taskDetails.bids.length > 0 ? (
                    taskDetails.bids.map((bid) => (
                      <Card key={bid.bidId} style={{ marginBottom: '16px' }}>
                        <CardContent>
                          <Typography variant="body1">
                            Bid Amount: {bid.bidAmount}
                          </Typography>
                          {bid.bidder && (
                            <>
                              <Typography variant="body1">
                                Bidder: {`${bid.bidder.firstName || 'Unknown'} ${bid.bidder.lastName || 'Unknown'}`}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <Link to={`/SelectedProfileUserNameInfo/${bid.bidder.userName}`}>
                                  {bid.bidder.userName}
                                </Link>
                              </Typography>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="body2">No bids received for this task.</Typography>
                  )}
                </Box>

        </Box>
      )}
    </div>
  );
};

export default ClientTaskDetails;
