import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

const Login = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>College Management System</div>
      <div style={styles.optionsContainer}>
        <div style={styles.option}>
          <h2>Student</h2>
          <Link to="/login/student">
            <button style={styles.button}>Login as Student</button>
          </Link>
        </div>
        <div style={styles.option}>
          <h2>Faculty</h2>
          <Link to="/login/faculty">
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
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    color: "white",
  },
  title: {
    fontSize: "60px",
    fontWeight: "bold",
    marginBottom: "40px",
    textAlign: "center",
    zIndex: 1,
    color: "white",
    padding: "10px",
    textShadow:
      "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 255, 255, 0.2)", // Black outline + glowing text shadow
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
  },
  option: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "40vh",
    margin: "20px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#77ef14",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Login;
