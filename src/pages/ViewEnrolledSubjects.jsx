import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

// Student can view thier enrolled subjects and associated faculty
const ViewEnrolledSubjects = () => {
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const subjectsPerPage = 4;

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1])).user_id;

      try {
        const response = await fetch(
          `https://college-management-backend-wz9p.onrender.com/api/view-enrolled-subjects/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setEnrolledSubjects(data);
        } else {
          setError("Failed to fetch enrolled subjects");
        }
      } catch (err) {
        setError("An error occurred while fetching enrolled subjects.");
      }
    };

    fetchEnrolledSubjects();
  }, []);

  const totalPages = Math.ceil(enrolledSubjects.length / subjectsPerPage);
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const currentSubjects = enrolledSubjects.slice(
    startIndex,
    startIndex + subjectsPerPage,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Enrolled Subjects</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}

        {currentSubjects.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Subject Name</th>
                <th style={styles.tableHeader}>Faculty Name</th>
                <th style={styles.tableHeader}>Faculty Email</th>
              </tr>
            </thead>
            <tbody>
              {currentSubjects.map((subject, index) => (
                <tr key={index}>
                  <td style={styles.tableData}>{subject.name}</td>
                  <td style={styles.tableData}>
                    {subject.faculty && subject.faculty.faculty_name
                      ? subject.faculty.faculty_name
                      : "N/A"}
                  </td>
                  <td style={styles.tableData}>
                    {subject.faculty && subject.faculty.email
                      ? subject.faculty.email
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
            <br />
          </table>
        ) : (
          <p style={styles.noDataMessage}>
            You have not enrolled in any subjects yet.
          </p>
        )}

        <div style={styles.pagination}>
          <button
            style={styles.paginationButton}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={styles.paginationButton}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <br />

        <Link to="/dashboard/student">
          <button style={styles.backButton}>Go to Dashboard</button>
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
    minWidth: "100vw",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableData: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    opacity: "1",
  },
  pageIndicator: {
    color: "white",
    fontSize: "18px",
  },
  backButton: {
    width: "30%",
    padding: "12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  errorMessage: {
    color: "#f44336",
    textAlign: "center",
    marginBottom: "15px",
  },
  noDataMessage: {
    color: "white",
  },
};

export default ViewEnrolledSubjects;
