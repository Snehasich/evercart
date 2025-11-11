import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(interval);
          navigate("/");
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds, navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Inter', sans-serif", // Added a default font
      }}
    >
      <h1 style={{ marginBottom: "30px", fontSize: "2.5rem" }}>Order Confirmed!</h1>
      <div
        style={{
          backgroundColor: "#2a2a2a",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "0 auto",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Added a subtle shadow
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "#eee" }}>Estimated Delivery Time:</h2>
        <div
          style={{
            fontSize: "4rem", // Increased size
            margin: "20px 0",
            fontWeight: "bold",
            color: "#ffb703",
          }}
        >
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <p style={{ fontSize: "1.1rem", color: "#ddd" }}>🚚 Your order is being prepared</p>
        <p style={{ fontSize: "1.1rem", color: "#ddd", marginTop: "10px" }}>
          📍 Delivery to: {localStorage.getItem("address")}
        </p>
      </div>
    </div>
  );
};

export default Timer;