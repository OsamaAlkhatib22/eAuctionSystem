import axios from "../../Common/Utils/AxiosAgent";
import React, { useState, useEffect } from "react";
import Popup from "../viewComplaints/Popup";
import index from "./index.css";
const ViewComplaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("api/complaints");
        setComplaints(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComplaints();
  }, []);

  const handleOpenPopup = (complaint) => {
    setSelectedComplaint(complaint);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Complaint ID</th>
          <th>Citizen Name</th>
          <th>Complaint Type</th>
          <th>Created Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint.intComplaintId}>
            <td>{complaint.intComplaintId}</td>
            <td>{complaint.strUserName}</td>
            <td>{complaint.strComplaintTypeEn}</td>
            <td>{complaint.dtmDateCreated}</td>
            <td>
              <button onClick={() => handleOpenPopup(complaint)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
      {showPopup && (
        <Popup handleClose={handleClosePopup} complaint={selectedComplaint} />
      )}
    </table>
  );
};

export default ViewComplaints;
