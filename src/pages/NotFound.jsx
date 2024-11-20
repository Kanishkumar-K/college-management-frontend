import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.errorContainer}>
          <div style={styles.errorCode}>404</div>
          <div style={styles.errorMessage}>
            Oops! The page you're looking for doesn't exist.
          </div>
          <div style={styles.suggestion}>
            But don't worry, you can go back to the homepage or explore other
            options below.
          </div>
        </div>
        <div style={styles.navigation}>
          <Link to="/" style={styles.link}>
            <button style={styles.button}>Go to Homepage</button>
          </Link>
          <Link to="/login/student" style={styles.link}>
            <button style={styles.button}>Login as Student</button>
          </Link>
          <Link to="/login/faculty" style={styles.link}>
            <button style={styles.button}>Login as Faculty</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    color: "white",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  errorContainer: {
    marginBottom: "30px",
  },
  errorCode: {
    fontSize: "120px",
    fontWeight: "bold",
    color: "#ff5757",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
  },
  errorMessage: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  suggestion: {
    fontSize: "18px",
    color: "#f0f0f0",
    marginBottom: "20px",
  },
  navigation: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#77ef14",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  link: {
    textDecoration: "none",
  },
  buttonHover: {
    transform: "scale(1.05)",
    backgroundColor: "#66d012",
  },
};

export default NotFound;
