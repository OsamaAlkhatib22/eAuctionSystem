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
  TextField,
  Snackbar,
} from "@mui/material";
import FreeLancerHomeHeader from "./FreeLancerHomeHeader";
import { fetchTaskDetails, addBid } from "./Service/Auth";
import { useParams, useNavigate ,Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../Components/Context";




const TaskDetails = () => {
  const { ServiceId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);
  const { token } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);





  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchTaskDetails(ServiceId);
        setTaskDetails(details);
       
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchData();
  }, [ServiceId, bidAmount]);


  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handleAddBidButtonClick = () => {
    setOpenBidModal(true);
  };

  const handleCloseBidModal = () => {
    setOpenBidModal(false);
  };

  const handleAddBid = async () => {
    try {
      if (!isNaN(parseFloat(bidAmount)) && isFinite(bidAmount)) {
        const newBid = await addBid(ServiceId, parseFloat(bidAmount), token);

        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          bids: [...prevDetails.bids, newBid],
        }));

        setBidAmount('');
        setSnackbarOpen(true);
        handleCloseBidModal();
      } else {
        console.error('Invalid bid amount');
      }
    } catch (error) {
      console.error('Error adding bid:', error.message);
    }
  };

  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          <Typography>
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

                  <Dialog open={openImageModal} onClose={handleCloseImageModal}>
                    <DialogTitle>Full Image</DialogTitle>
                    <DialogContent>
                      {selectedImage && (
                        <img
                          alt="Full Image"
                          src={`data:image/png;base64,${selectedImage}`}
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseImageModal} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom>
                Task Details
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    Budget: {taskDetails.starting_bid || "No Starting Bid"}
                  </Typography>
                  <Typography variant="body1">
                    Bid Duration: {taskDetails.bidDuration || "No Bid Duration"}
                  </Typography>
                  <Typography variant="body1">
                    Category: {taskDetails.category_name || "No Category"}
                  </Typography>
                  <Typography variant="body1">
                    Rating: {taskDetails.rating || "No Rating"}
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
            
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" onClick={handleAddBidButtonClick}>
                Add Bid
              </Button>
            </Grid>
          </Grid>
          <Dialog open={openBidModal} onClose={handleCloseBidModal}>
            <DialogTitle>Add Bid</DialogTitle>
            <DialogContent>
              <TextField
                label="Bid Amount"
                variant="outlined"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                type="number"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBidModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddBid} color="primary">
                Add Bid
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Bid added successfully!"
          />
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Received Bids
            </Typography>
            {taskDetails.bids && taskDetails.bids.length > 0 ? (
              taskDetails.bids.map((bid) => (
                <Card key={bid.bidId}>
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
                        <Typography variant="body1">
                          Rating: {bid.bidder.rating || 'No Rating'}
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

export default TaskDetails;
