import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

// Once, student receives a random generated password via email, they can login and change/ update it.
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://college-management-backend-wz9p.onrender.com/api/student/change-password/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: oldPassword,
            new_password: newPassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Change Password</h2>

        {message && <p style={styles.successMessage}>{message}</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="oldPassword" style={styles.label}>
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Change Password
          </button>
          <Link to="/dashboard/student">
            <button style={styles.backButton}>Go to Dashboard</button>
          </Link>
        </form>
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
    textAlign: "center",
  },
  content: {
    textAlign: "left",
    padding: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "white",
    textAlign: "center",
    textShadow:
      "0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "600",
    color: "white",
  },
  input: {
    width: "90%",
    padding: "15px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
  },
  submitButton: {
    width: "30%",
    padding: "12px",
    backgroundColor: "#77ef14",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "100px",
  },
  backButton: {
    width: "30%",
    marginLeft: "15px",
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  successMessage: {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: "15px",
  },
  errorMessage: {
    color: "#f44336",
    textAlign: "center",
    marginBottom: "15px",
  },
};

export default ChangePassword;
