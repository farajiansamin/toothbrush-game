import React from "react";

const Instructions = () => {
  return (
    <div
      style={{
        marginTop: "80px",
        padding: "15px",
        
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "2px solid white",
        borderRadius: "10px",
        maxWidth: "300px",
      }}
    >
      <h4 style={{ marginBottom: "10px", textAlign: "center" }}>Instructions:</h4>
      <p style={{ lineHeight: "1.5", textAlign: "center" }}>
        Welcome to the Teeth Cleaning Game! The goal is to clean all the brown teeth by clicking on them before the time runs out. Each tooth turns white when clicked. If all teeth are white before the timer reaches zero, you win! Good luck!
      </p>
    </div>
  );
};

export default Instructions;
