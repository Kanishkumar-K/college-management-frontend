import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import backgroundImage from "./images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

// View all the assigned students of a faculty
const AssignedStudentFaculty = () => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const facultyId = decodedToken.user_id;

    if (!facultyId) {
      setError("Faculty ID not found in token");
      setLoading(false);
      return;
    }

    const fetchAssignedStudents = async () => {
      try {
        const response = await fetch(
          `https://college-management-backend-wz9p.onrender.com/api/faculty/${facultyId}/students/`,
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
        setStudents(data.student_ids);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedStudents();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Assigned Students to Faculty</h1>
        {students && students.length > 0 ? (
          <>
            <TableContainer component={Paper} style={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={styles.tableCell}>Student ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((studentId, index) => (
                      <TableRow key={index}>
                        <TableCell style={styles.tableCell}>
                          {studentId}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              style={{ color: "white" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <div>No students assigned to this faculty</div>
        )}

        <Link to="/dashboard/faculty">
          <Button variant="contained" style={styles.button}>
            Go to Dashboard
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
    maxWidth: "800px",
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
  tableContainer: {
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  tableCell: {
    fontSize: "18px",
    color: "white",
    backgroundColor: "#333",
    fontWeight: "bold",
  },
  button: {
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

export default AssignedStudentFaculty;
