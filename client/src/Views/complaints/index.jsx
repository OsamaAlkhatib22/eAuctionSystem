import React, { useState, useEffect } from "react";

// Project Imports
import { GetComplaintsApi } from "./Service/GetComplaintsApi";
import Popup from "./Components/ViewComplaintPopup";
import index from "./index.css";

const ViewComplaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const setComplaintsView = async () => {
      var response = await GetComplaintsApi();
      setComplaints(response.data);
    };
    setComplaintsView();
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
