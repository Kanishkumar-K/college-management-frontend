import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./images/login_bg.jpg";

// Student can login,, and enrol in subject

const EnrollInSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 3;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("https://college-management-backend-wz9p.onrender.com/api/subjects/");
        const data = await response.json();
        if (response.ok) {
          setSubjects(data);
        } else {
          setError("Failed to fetch subjects");
        }
      } catch (err) {
        setError("An error occurred while fetching subjects.");
      }
    };

    fetchSubjects();
  }, []);

  const handleCheckboxChange = (subjectName) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectName)
        ? prevSelected.filter((name) => name !== subjectName)
        : [...prevSelected, subjectName],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://college-management-backend-wz9p.onrender.com/api/enroll-in-subject/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjects: selectedSubjects }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSelectedSubjects([]);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const totalPages = Math.ceil(subjects.length / subjectsPerPage);
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const displayedSubjects = subjects.slice(
    startIndex,
    startIndex + subjectsPerPage,
  );

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Enroll in Subjects</h2>

        {message && <p style={styles.successMessage}>{message}</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Subjects</label>
            <div style={styles.checkboxContainer}>
              {displayedSubjects.map((subject) => (
                <label key={subject.id} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={subject.name}
                    checked={selectedSubjects.includes(subject.name)}
                    onChange={() => handleCheckboxChange(subject.name)}
                    style={styles.checkbox}
                  />
                  {subject.name}
                </label>
              ))}
            </div>
          </div>

          <div style={styles.pagination}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={styles.paginationButton}
            >
              Previous
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={styles.paginationButton}
            >
              Next
            </button>
          </div>
          <br />
          <br />

          <button type="submit" style={styles.submitButton}>
            Enroll
          </button>
          <Link to="/dashboard/student">
            <br />
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
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "600",
    color: "white",
  },
  checkboxContainer: {
    textAlign: "left",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontSize: "16px",
  },
  checkbox: {
    marginRight: "8px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
  },
  paginationButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  pageInfo: {
    color: "white",
    fontSize: "16px",
  },
  submitButton: {
    width: "50%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  backButton: {
    width: "50%",
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

export default EnrollInSubjects;
