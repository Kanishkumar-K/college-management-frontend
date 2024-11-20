import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import backgroundImage from "./images/login_bg.jpg";

// View All students details in college

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://college-management-backend-wz9p.onrender.com/api/students/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch(() => {
        setError("Failed to load students. Please try again.");
      });
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
        <Typography variant="h4" gutterBottom style={styles.title}>
          Students List
        </Typography>
        {error && <Typography style={styles.errorText}>{error}</Typography>}
        {students.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {currentStudents.map((student) => (
                <Grid item xs={12} sm={6} md={4} key={student.id}>
                  <Card style={styles.card} elevation={5}>
                    <CardContent>
                      <Typography variant="h6" style={styles.studentName}>
                        {student.first_name} {student.last_name}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        Student Id: {student.id}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        Email: {student.email}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        DOB: {student.date_of_birth}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        Gender: {student.gender}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        Blood Group: {student.blood_group}
                      </Typography>
                      <Typography variant="body2" style={styles.infoText}>
                        Contact: {student.contact_number}, {student.address}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(students.length / studentsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  style={{ color: "white", fontWeight: 900 }}
                  components={{
                    previous: ArrowBackIosNewIcon,
                    next: ArrowForwardIosIcon,
                  }}
                  {...item}
                />
              )}
              style={styles.pagination}
            />
          </>
        ) : (
          <Typography style={styles.text}>No students found.</Typography>
        )}
        <Link to="/dashboard/faculty" style={{ textDecoration: "none" }}>
          <Button variant="contained" style={styles.backButton}>
            Back to Dashboard
          </Button>
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
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "8px",
    maxWidth: "1200px",
    width: "100%",
    color: "black",
  },
  title: {
    color: "#ffeb3b",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "0 0 10px rgba(255, 235, 59, 0.8)",
  },
  errorText: {
    color: "#ff5722",
    marginBottom: "20px",
  },
  card: {
    borderRadius: "12px",
    fontWeight: "900",
    background: "linear-gradient(135deg, #f6f6f6 0%, #e2e2e2 100%)",
  },

  studentName: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  infoText: {
    color: "black",
    marginBottom: "5px",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  backButton: {
    marginTop: "20px",
    backgroundColor: "#4caf50",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
  },
};

export default ViewStudents;
