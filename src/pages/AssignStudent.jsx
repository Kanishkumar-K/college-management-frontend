import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import backgroundImage from "./images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

// Faculty can assign a student to self
const AssignStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleAssignStudent = async () => {
    try {
      const response = await axios.post(
        `https://college-management-backend-wz9p.onrender.com/api/assign-student/${studentId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (
        response.data &&
        response.data.message === "Student already assigned"
      ) {
        setAlertMessage("This student has already been assigned to a faculty!");
        setAlertSeverity("warning");
        setButtonDisabled(true);
      } else {
        setAlertMessage("Student successfully assigned to faculty!");
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.error || "An error occurred!");
      setAlertSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Enroll Student to Faculty</h2>
        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.textField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssignStudent}
          style={
            buttonDisabled
              ? { ...styles.button, backgroundColor: "#d32f2f" }
              : styles.button
          }
          disabled={buttonDisabled}
        >
          Assign
        </Button>

        <Link to="/dashboard/faculty">
          <Button
            variant="contained"
            style={{ marginLeft: "10px", backgroundColor: "red" }}
          >
            Go to Dashboard
          </Button>
        </Link>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    color: "whie",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "0 0 10px rgba(255, 235, 59, 0.8)",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
    color: "white",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "8px",
  },
};

export default AssignStudent;
