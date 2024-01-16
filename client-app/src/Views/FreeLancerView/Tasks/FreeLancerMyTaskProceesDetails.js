import React, { useEffect, useState } from "react";
import { useParams, useNavigate ,Link} from "react-router-dom";
import { fetchFreeLancerTaskProcessDetails } from "./Service/Auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../Components/Context";
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
import FreeLancerHomeHeader from '../Home/FreeLancerHomeHeader'

const FreeLancerMyTaskProceesDetails= () => {


  const { ServiceId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [submissionComment, setSubmissionComment] = useState("");
const [submissionAttachments, setSubmissionAttachments] = useState([]);


  const { token } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchFreeLancerTaskProcessDetails(ServiceId);
        setTaskDetails(details);
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchData();
  }, [ServiceId]);

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
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    const attachments = Array.from(files).map((file) => ({
      fileMedia: file,
      blnIsVideo: false,
    }));
    setSubmissionAttachments([...submissionAttachments, ...attachments]);
  };

  
  <input
    type="file"
    onChange={handleFileInputChange}
    multiple
  />
  

  const handleSubmitTask = async () => {
    try {
      const commentToSubmit = submissionComment !== null ? submissionComment : "No comment was provided by the freelancer";

      console.log("Comment to submit:", commentToSubmit);
      const formData = new FormData();
      formData.append("ServiceId", ServiceId);
      formData.append("comment", commentToSubmit);
      submissionAttachments.forEach((attachment, index) => {
        formData.append(`lstMedia[${index}].fileMedia`, attachment.fileMedia);
        formData.append(`lstMedia[${index}].blnIsVideo`, attachment.blnIsVideo);
      });
  
      // Make the API request to submit the task
      await fetch("https://localhost:5000/api/Task/InsertTaskSubmission", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      handleCloseModal();

      setTimeout(() => {
        navigate('/FreeLancerMyTask');
      }, 1000);

    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };
  

  

  return (
    <div>
      <FreeLancerHomeHeader />
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
                  Client: 
                   <Link to={`/SelectedProfileUserNameInfo/${taskDetails.clientUserName}`}>
                     {taskDetails.clientUserName}
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    Category: {taskDetails.category_name || "No Category"}
                  </Typography>
                  
                  <Typography variant="body1">
                   DeadLine: {calculateTimeLeft(taskDetails.taskSubmissionTime) || "No specific DeadLine"}
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

          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
               Submit Task
          </Button>
          <Dialog open={openModal} onClose={handleCloseModal}>
  <DialogTitle>Submit Task</DialogTitle>
  <DialogContent>
    <Box mb={2}>
      <Typography variant="body1">Comment:</Typography>
      <textarea
        rows="4"
        cols="50"
        value={submissionComment}
        onChange={(e) => setSubmissionComment(e.target.value)}
      />
    </Box>
    <Box>
      <Typography variant="body1">Attachments:</Typography>
      <input
        type="file"
        onChange={handleFileInputChange}
        multiple
        accept="image/*"
      />
      {submissionAttachments.map((file, index) => (
        <div key={index}>{file.name}</div>
      ))}
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSubmitTask} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>




          
        </Box>
      )}
    </div>
  );
};

export default FreeLancerMyTaskProceesDetails