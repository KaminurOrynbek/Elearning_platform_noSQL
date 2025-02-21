import React from "react";
import "./confirmationDialog.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{message}</p>
        <div className="confirmation-dialog-actions">
          <button onClick={onConfirm} className="common-btn">Yes</button>
          <button onClick={onCancel} className="common-btn" style={{ background: "red" }}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;