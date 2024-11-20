import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

// View all student details including profile, if no profile is updated by user, student's first letter will be displayed as image.
const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://college-management-backend-wz9p.onrender.com/api/student/details/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>Loading...</h2>
          <p style={styles.text}>Fetching student data, please wait.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>Error</h2>
          <p style={styles.text}>{error}</p>
          <Link to="/login">
            <button style={styles.backButton}>Back to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  const profileUrl = student?.profile_picture
    ? `https://college-management-backend-wz9p.onrender.com/${student.profile_picture}`
    : null;
  console.log(profileUrl);
  return (
    <div style={styles.container}>
      <br />
      <div style={styles.profileContainer}>
        {student?.profile_picture ? (
          <img
            src={profileUrl}
            alt="Profile not available"
            style={styles.profilePicture}
          />
        ) : (
          <div style={styles.placeholderPicture}>
            <span style={styles.initials}>
              {student?.first_name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>Student Profile</h2>
        <br />
        <div style={styles.details}>
          <div style={styles.leftColumn}>
            <p>
              <strong>First Name:</strong> {student.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {student.last_name}
            </p>
            <p>
              <strong>Date of Birth:</strong> {student.date_of_birth}
            </p>
            <p>
              <strong>Gender:</strong> {student.gender}
            </p>
          </div>
          <div style={styles.rightColumn}>
            <p>
              <strong>Blood Group:</strong> {student.blood_group}
            </p>
            <p>
              <strong>Contact Number:</strong> {student.contact_number}
            </p>
            <p>
              <strong>Address:</strong> {student.address}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
          </div>
        </div>
        <Link to="/dashboard/student">
          <br />
          <button style={styles.backButton}>Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  },
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  placeholderPicture: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#434",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: "48px",
    color: "#fff",
  },
  content: {
    width: "90%",
    maxWidth: "800px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "8px",
    padding: "20px",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "45%",
  },
  rightColumn: {
    width: "45%",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "10px",
  },
  backButton: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#77ef14",
    color: "black",
    border: "none",
    marginLeft: "38%",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
document.body.style.margin = 0;
document.body.style.overflow = "hidden";

export default StudentProfile;
