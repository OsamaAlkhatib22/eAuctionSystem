import { Link } from "react-router-dom";
import axios from "../../Common/Utils/AxiosAgent";
import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup({ complaint, handleClose, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-close" onClick={handleClose}>
          &times;
        </div>
        {/* Gallery */}

        <table>
          <thead>
            <tr>
              <th>Complaint</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Complaint ID</td>
              <td>{complaint.intComplaintId}</td>
            </tr>
            <tr>
              <td>User Name</td>
              <td>{complaint.strUserName}</td>
            </tr>
            <tr>
              <td>Create Date</td>
              <td>{complaint.dtmDateCreated}</td>
            </tr>
            <tr>
              <td>Complaint Type</td>
              <td>{complaint.strComplaintTypeEn}</td>
            </tr>
            <tr>
              <td>نوع المشكلة</td>
              <td>{complaint.strComplaintTypeAr}</td>
            </tr>
          </tbody>
        </table>

        <Link className="btn" to={`/create-task/${complaint.intComplaintId}`}>
          <button>Create Task</button>
        </Link>
      </div>
    </div>
  );
}

export default Popup;
