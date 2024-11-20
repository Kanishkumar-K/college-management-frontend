import React, { useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import backgroundImage from "./images/login_bg.jpg";
import { PersonAdd, ViewList, Edit, GroupAdd } from "@mui/icons-material";

// Faculty dashboard to perform all the operations 
const FacultyDashboard = () => {
  const facultyName = localStorage.getItem("Faculty Name");
  const email = localStorage.getItem("Email");
  const subject = localStorage.getItem("Subject");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


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
          Hello, Professor {facultyName}
        </Typography>
        <Typography variant="body1" style={styles.welcomeText}>
          Welcome to your dashboard. You can view your course, manage your
          students, and add students!
        </Typography>

        <Card style={styles.profileCard}>
          <CardContent>
            <Typography variant="h6" style={styles.cardTitle}>
              Faculty Profile
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Faculty Name:</strong> {facultyName}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Email:</strong> {email}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "left" }}>
              <strong>Subject:</strong> {subject}
            </Typography>
            <br />
          </CardContent>
        </Card>

        <Grid container spacing={3} style={styles.dashboardGrid}>
          <Grid item xs={12} md={6} lg={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <PersonAdd style={styles.icon} />
                <br />
                <Typography variant="h6" style={styles.cardTitle}>
                  Register Student
                </Typography>
                <Link to="/student/create" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Register Student
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <ViewList style={styles.icon} />
                <br />
                <Typography variant="h6" style={styles.cardTitle}>
                  Display All Students
                </Typography>
                <Link to="/faculty/students" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    View All Students
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <Edit style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  Update Student Data
                </Typography>
                <Link to="/faculty/edit" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Update Student
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <GroupAdd style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  Enroll to Classroom
                </Typography>
                <Link to="/faculty/student/mystudent" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    Enroll Student
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={2.4}>
            <Card style={styles.dashboardCard}>
              <CardContent>
                <GroupAdd style={styles.icon} />
                <Typography variant="h6" style={styles.cardTitle}>
                  Assigned Students
                </Typography>
                <Link to="/faculty/assigned-students" style={styles.link}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={styles.cardButton}
                  >
                    View My Students
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

export default FacultyDashboard;
