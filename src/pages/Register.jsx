import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

const Registration = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Registration Information</h2>
        <p style={styles.text}>
          To register as a faculty member, please contact the admin.
        </p>
        <p style={styles.text}>
          Students must reach out to faculty members for registration.
        </p>
        <div style={styles.contactInfo}>
          <p style={styles.text}>
            If you have any queries, contact <strong>admin@gmail.com</strong>
          </p>
        </div>

        <Link to="/login">
          <button style={styles.backButton}>Back to Login</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "white",
    textShadow:
      "0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)",
  },
  text: {
    fontSize: "18px",
    color: "white",
    lineHeight: "1.6",
  },
  contactInfo: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    marginTop: "30px",
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#77ef14",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Registration;
