import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import backgroundImage from "./images/login_bg.jpg";
import { PersonAdd, ViewList, Edit, GroupAdd } from "@mui/icons-material";

// Student can view his/her dashboard after login

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); 
        return; 
      }

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
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Button
          variant="contained"
          style={styles.logoutButton}
          onClick={() => {
            alert("You have been logged out.");
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>

        <Typography variant="h3" style={styles.title}>
          Hello, Student {student.first_name}
        </Typography>
        <Typography variant="body1" style={styles.welcomeText}>
          Welcome to your dashboard. You can view your details, manage your
          courses and view faculty!
        </Typography>

        <Card style={styles.profileCard}>
          <CardContent>
            <Typography variant="h6" style={styles.cardTitle}>
              Student Profile
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Student Name:</strong> {student.first_name}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Email:</strong> {student.email}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Date of Birth:</strong> {student.date_of_birth}
            </Typography>
            <br />
          </CardContent>
        </Card>

        <Grid container spacing={3} style={styles.dashboardGrid}>
          <Grid item xs={12} sm={4} md={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <PersonAdd style={styles.icon} />
                <br />
                <Typography variant="h6" style={styles.cardTitle}>
                  View My Profile details
                </Typography>
                <Link to="/student/view" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    View My Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <ViewList style={styles.icon} />
                <br />
                <Typography variant="h6" style={styles.cardTitle}>
                  Edit My Profile Details
                </Typography>
                <Link to="/student/edit" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Edit My Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <Edit style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  Change Password
                </Typography>
                <Link to="/student/password/change" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Change Password
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <GroupAdd style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  Enroll to Subject
                </Typography>
                <Link to="/student/enroll" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Enroll Subject
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <GroupAdd style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  View Enrolled Subject
                </Typography>
                <Link to="/student/view-enroll" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Enrolled Info
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
    position: "relative",
  },
  content: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "12px",
    maxWidth: "1000px",
    width: "100%",
    margin: "20px",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    textShadow:
      "0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.4)",
    marginBottom: "20px",
    fontSize: "2.5rem",
  },
  welcomeText: {
    fontSize: "18px",
    color: "white",
    marginBottom: "30px",
    fontWeight: "300",
  },
  profileCard: {
    marginBottom: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  dashboardGrid: {
    marginBottom: "30px",
  },
  dashboardCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  cardButton: {
    backgroundColor: "#77ef14",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#66d112",
    },
  },
  link: {
    textDecoration: "none",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#ff4c4c",
    color: "white",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "5px",
    width: "auto",
    "&:hover": {
      backgroundColor: "#ff2e2e",
    },
  },
  icon: {
    fontSize: "2rem",
    color: "#77ef14",
    marginBottom: "10px",
  },
};

export default StudentDashboard;
