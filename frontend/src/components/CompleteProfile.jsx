import { completeUserProfile } from "../../api";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    linkedin: "",
    portfolio: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await completeUserProfile(userId, formData);

    if (res.status === 200) {
      alert("Profile updated successfully!");
      navigate("/profile");
    } else {
      alert("Failed to update profile.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
};

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Complete Your Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <InputLabel>Full Name</InputLabel>
        <TextField
          fullWidth
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          margin="normal"
        />

        <InputLabel>Bio</InputLabel>
        <TextField
          fullWidth
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
          multiline
          rows={3}
          margin="normal"
        />

        <InputLabel>LinkedIn Profile</InputLabel>
        <TextField
          fullWidth
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          required
          type="url"
          margin="normal"
        />

        <InputLabel>Portfolio Link</InputLabel>
        <TextField
          fullWidth
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          required
          type="url"
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CompleteProfile;
