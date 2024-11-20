import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "./images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

// Faculty login api, upon successful credentials, redirects to dashboard page. Input validation is there.

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

  const navigate = useNavigate();

  const validateEmail = (input) => {
    const value = input.trim();
    if (!value) {
      setEmailError("Email is required");
      setEmailValid(false);
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
      setEmailValid(false);
    } else {
      setEmailError("");
      setEmailValid(true);
    }
  };

  const validatePassword = (input) => {
    const value = input.trim();
    if (!value) {
      setPasswordError("Password is required");
      setPasswordValid(false);
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 6 characters, including at least one uppercase letter, one lowercase letter, and one number",
      );
      setPasswordValid(false);
    } else {
      setPasswordError("");
      setPasswordValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    validateEmail(email);
    validatePassword(password);

    if (!emailValid || !passwordValid) {
      return;
    }

    const loginUrl = "http://localhost:8000/api/faculty/login/";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setEmailError(errorData.error || "Invalid email or password");
        return;
      }

      const data = await response.json();
      const { access_token, faculty } = data;

      const { faculty_name } = faculty;

      localStorage.setItem("token", access_token);
      localStorage.setItem("Faculty Name", faculty_name);
      localStorage.setItem("Email", faculty.email);
      localStorage.setItem("Subject", faculty.subject_name);
      localStorage.setItem("role", "faculty");

      alert(`Welcome, Professor ${faculty_name}!`);

      navigate("/dashboard/faculty");
    } catch (error) {
      setEmailError("An error occurred while logging in. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          marginTop: "60px",
          marginBottom: "60px",
          marginLeft: "900px",
          marginRight: "100px",
          position: "relative",
          border: "2px solid #000",
          padding: "40px",
          borderRadius: "5px",
          width: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(5px)",
          fontSize: "16px",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Faculty Login
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              style={{
                border: emailValid
                  ? "3px solid green"
                  : emailError
                    ? "3px solid red"
                    : "3px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                marginBottom: "10px",
                width: "100%",
              }}
            />
            {emailValid && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "green",
                }}
              />
            )}
          </div>
          {emailError && (
            <p style={{ color: "red", marginBottom: "10px" }}>{emailError}</p>
          )}

          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              border: passwordValid
                ? "3px solid green"
                : passwordError
                  ? "3px solid red"
                  : "3px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              width: "100%",
            }}
          />
          {passwordError && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {passwordError}
            </p>
          )}
          <br />
          <br />
          <div className="btn-container">
            <button
              type="submit"
              style={{
                backgroundColor: "#77ef14",
                padding: "14px 20px",
                color: "black",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Login
            </button>
          </div>
          <br />
          <p
            style={{
              fontSize: "14px",
              textDecoration: "none",
              color: "#000",
              fontWeight: "bolder",
            }}
          >
            Don't Have an Account?&nbsp;
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;
