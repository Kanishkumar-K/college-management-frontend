import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import {
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import backgroundImage from "./images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";

// Faculty can create a student
const StudentCreate = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    contact_number: "",
    address: "",
    email: "",
    profile_picture: null,
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "https://college-management-backend-wz9p.onrender.com/api/student/create/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const { email, password, first_name } = response.data;

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // send password via email, so that student can login
      // pls provide valid existing email for student profile creation, or else email wont be received.

      const emailResponse = await emailjs.send(
        "service_4wqjidi",
        "template_k2scxu8",
        {
          first_name: first_name,
          to_email: email,
          password: password,
        },
        "cWcWJdKk9kDMkeYb1",
      );

      if (emailResponse.status === 200) {
        alert("Student created successfully and email sent!");
      } else {
        alert("Student created, but failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred while creating the student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Typography variant="h6" style={{ ...styles.title, fontSize: "24px" }}>
          CREATE A STUDENT DATA
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <InputLabel htmlFor="profile_picture">
                  Profile Picture
                </InputLabel>
                <input
                  accept="image/*"
                  type="file"
                  name="profile_picture"
                  id="profile_picture"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                />
                {formData.profile_picture && (
                  <Box mt={2}>
                    <img
                      src={URL.createObjectURL(formData.profile_picture)}
                      alt="Profile Preview"
                      style={styles.profilePreview}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Create Student"}
              </Button>

              <Link to="/dashboard/faculty">
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px", backgroundColor: "red" }}
                >
                  Go to Dashboard
                </Button>
              </Link>
            </Grid>
          </Grid>
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
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
    color: "black",
  },
  content: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    maxWidth: "900px",
    width: "100%",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "black",
    textShadow:
      "0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  profilePreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid #fff",
  },

  input: {
    color: "#00000",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000000",
      },
      "&:hover fieldset": {
        borderColor: "#222",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#111",
      },
    },
  },
  label: {
    color: "#000",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};

export default StudentCreate;
