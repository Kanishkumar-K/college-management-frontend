import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "./images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// Edit student data by a faculty member
const UpdateStudent = () => {
  const [student, setStudent] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "male",
    blood_group: "",
    contact_number: "",
    address: "",
    profile_picture: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setStudent({
      ...student,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const fetchStudentDetails = (id) => {
    setIsLoading(true);
    axios
      .get(`https://college-management-backend-wz9p.onrender.com/api/student/details/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setStudent(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Keep filling the details, after entering student id");
        setIsLoading(false);
      });
  };

  const handleStudentIdChange = (e) => {
    const { value } = e.target;
    setStudent({ ...student, student_id: value });

    if (value) {
      fetchStudentDetails(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(student).forEach((key) => {
      formData.append(key, student[key]);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found.");
      return;
    }

    axios
      .put(
        `https://college-management-backend-wz9p.onrender.com/api/student/update/${student.student_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setSuccessMessage("Student updated successfully!");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Update Student Information</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          {successMessage && <div style={styles.success}>{successMessage}</div>}

          <div style={styles.inputGroup}>
            <label htmlFor="student_id" style={styles.label}>
              Student ID
            </label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={student.student_id}
              onChange={handleStudentIdChange}
              style={styles.input}
              required
            />
          </div>

          {isLoading ? (
            <div>Loading student details...</div>
          ) : (
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label htmlFor="first_name" style={styles.label}>
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={student.first_name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="last_name" style={styles.label}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={student.last_name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="date_of_birth" style={styles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={student.date_of_birth}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="gender" style={styles.label}>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={student.gender}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="blood_group" style={styles.label}>
                  Blood Group
                </label>
                <input
                  type="text"
                  id="blood_group"
                  name="blood_group"
                  value={student.blood_group}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="contact_number" style={styles.label}>
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  value={student.contact_number}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="address" style={styles.label}>
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={student.address}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" style={styles.submitButton}>
            Update Student
          </button>

          <Link to="/dashboard/faculty">
            <Button
              variant="contained"
              style={{ marginLeft: "10px", backgroundColor: "red" }}
            >
              Go to Dashboard
            </Button>
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
    width: "105vw",
    padding: "20px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    textAlign: "center",
    padding: "2px",
    paddingLeft: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
    maxWidth: "900px",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "white",
    textShadow:
      "0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)",
  },
  label: {
    color: "white",
    fontSize: "14px",
    textAlign: "left",
    display: "block",
    marginBottom: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  input: {
    width: "80%",
    padding: "5px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
  submitButton: {
    marginTop: "10px",
    padding: "12px 10px",
    fontSize: "18px",
    backgroundColor: "#77ef14",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default UpdateStudent;
