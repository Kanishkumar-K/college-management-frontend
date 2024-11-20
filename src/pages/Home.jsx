import React from "react";
import backgroundImage from "./images/login_bg.jpg";
import { Link } from "react-router-dom";

// Home page - entrance
const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>College Management System</h1>
        <p style={styles.description}>
          View, Manage and handle courses for students and
          faculty.
        </p>
        <div style={styles.navigation}>
          <Link to="/login" style={styles.link}>
            <button style={styles.button}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",  
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", 
    borderRadius: "10px",
    padding: "40px 20px",
    textAlign: "center",
    color: "#333",  
    maxWidth: "600px",
    padding:'200px',
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "none",  
  },
  title: {
    fontSize: "42px",  
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333", 
    letterSpacing: "1px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555", 
    fontWeight: "400",
  },
  navigation: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",  
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",  
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonHover: {
    backgroundColor: "#0056b3",  
    transform: "scale(1.05)",  
  }
};

export default Home;
