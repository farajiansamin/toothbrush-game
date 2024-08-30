import React from "react";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <p style={{ color:"black", marginBottom: "20px", textAlign: "center" }}>{message}</p>
        <div style={buttonContainerStyle}>
          <button onClick={onConfirm} style={confirmButtonStyle}>
            Yes, Restart
          </button>
          <button onClick={onCancel} style={cancelButtonStyle}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Darkened background for better contrast
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Add a shadow for a more elevated look
  maxWidth: "400px",
  textAlign: "center",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
};

const confirmButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Modal;
