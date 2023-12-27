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
import { fetchTaskDetails, addBidAcceptance } from "../../FreeLancerView/Home/Service/Auth"; // Make sure to import addBidAcceptance
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../Components/Context";

const ClientTaskDetails = () => {
  const { ServiceId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const { token } = useAuth();
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
  }, [ServiceId]);

  const handleAcceptConfirmation = async () => {
    try {
      // Make the API call to accept the bid using selectedBid
      const response = await addBidAcceptance(ServiceId, selectedBid.bidAmount, selectedBid.bidId, token);

      // Handle the response or update the UI as needed
      console.log('Bid accepted successfully:', response);

      // Close the confirmation dialog
      setOpenAcceptDialog(false);
    } catch (error) {
      console.error('Error accepting bid:', error.message);
      // Handle the error or show an error message
    }
  };

  const handleAcceptBid = (bid) => {
    setSelectedBid(bid);
    setOpenAcceptDialog(true);
  };

  const handleGoBack = () => {
    navigate("/ClientExploreTasks"); // Change the route to the desired client page
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
                    Starting Bid: {taskDetails.starting_bid || "No Starting Bid"}
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
                        <Typography variant="body1">
                          Rating: {bid.bidder.rating || 'No Rating'}
                        </Typography>
                      </>
                    )}
                    <Button onClick={() => handleAcceptBid(bid)}>Accept Bid</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2">No bids received for this task.</Typography>
            )}
          </Box>

          <Dialog open={openAcceptDialog} onClose={() => setOpenAcceptDialog(false)}>
            <DialogTitle>Accept Bid Confirmation</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to accept this bid?
              </Typography>
              <Typography variant="body1">
                Bid Amount: {selectedBid?.bidAmount}
              </Typography>
              {/* Add more bid details as needed */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAcceptDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAcceptConfirmation} color="primary">
                Accept Bid
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default ClientTaskDetails;
