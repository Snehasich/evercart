import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let endTime = localStorage.getItem("orderEndTime");

    // 🟡 No orderEndTime means no timer to show
    if (!endTime) {
      setIsActive(false);
      return;
    }

    endTime = parseInt(endTime, 10);
    setIsActive(true);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.floor((endTime - now) / 1000);

      if (diff <= 0) {
        // ✅ Timer expired
        // clearInterval(interval);
        localStorage.removeItem("orderEndTime");
        setIsActive(false);
        setRemainingTime(0);
        navigate("/"); // optional redirect
      } else {
        setRemainingTime(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  // 🟢 Don’t render anything if timer isn’t active
  if (!isActive) return null;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const address = localStorage.getItem("address") || "Not available";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "100px",
        height: "100px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        zIndex: 9999,
      }}
      title={`Delivery to: ${address}`}
    >
      <div style={{ fontSize: "0.9rem", color: "#ccc" }}>ETA</div>
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          color: "#ffb703",
          marginTop: "4px",
        }}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
