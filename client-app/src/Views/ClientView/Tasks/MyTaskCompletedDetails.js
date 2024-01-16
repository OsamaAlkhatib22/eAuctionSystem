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
import { fetchTaskCompletedDetails } from "./Service/Auth";
import { useParams, useNavigate,Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../Components/Context";

const MyTaskCompletedDetails = () => {

  const { ServiceId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  const [freelancerSubmission, setFreelancerSubmission] = useState({
    comment: "",
    lstMedia: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchTaskCompletedDetails(ServiceId);
        setTaskDetails(details);

        //freelancer task submission
        const freelancerSubmissionData = {
          comment: details?.freeLancerComment || "",
          lstMedia: details?.freeLancerSubmittedlstMedia || [],
        };
        setFreelancerSubmission(freelancerSubmissionData);
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchData();
  }, [ServiceId]);

  const handleGoBack = () => {
    navigate("/MyTasks"); 
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
                    Accepted Bid: {taskDetails.accepted_Bid || "No Bid was Accepted"}
                  </Typography>
                  <Typography variant="body1">
                    Completed by: <Link to={`/SelectedProfileUserNameInfo/${taskDetails.freeLancerUserName}`}>{taskDetails.freeLancerUserName}</Link>
                  </Typography>
                  <Typography variant="body1">
                    Category: {taskDetails.category_name || "No Category"}
                  </Typography>
                  
                  <Typography variant="body1">
                   Status: {(taskDetails.status) || "No specific status"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
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
          <Typography variant="h6" gutterBottom>
            Freelancer Submissions
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">Comment: {freelancerSubmission.comment || "No comment"}</Typography>
              {freelancerSubmission.lstMedia.map((media, index) => (
                <img
                  key={index}
                  alt={`Freelancer Submission ${index + 1}`}
                  src={`data:image/png;base64,${media}`}
                  style={{
                    width: "20%",
                    height: "20%",
                    marginBottom: 10,
                  }}
                  onClick={() => handleImageClick(media)}
                />
              ))}
            </CardContent>
          </Card>


          
        </Box>
      )}
    </div>
  );
};



 


export default MyTaskCompletedDetails