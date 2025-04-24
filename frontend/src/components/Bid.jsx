import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { bidOnProject } from "../../api";

const Bid = ({ projectData }) => {
    const [bidAmount, setBidAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setBidAmount(e.target.value);
        setError(""); 
        setSuccess(""); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bidAmount) {
            setError("Please enter a bid amount.");
            return;
        }

        try {
            const freelancer = localStorage.getItem("userId");
            if (!freelancer) {
                throw new Error("Not able to get your ID. Please log in.");
            }

            const res = await bidOnProject(projectData._id, freelancer, projectData.client, bidAmount);
            console.log(res.data);

            if (!res.data.client || !res.data.freelancer || !res.data.project || !res.data.amount) {
                throw new Error("Bid not submitted");
            }

            setSuccess("Your bid has been successfully submitted!");
            setBidAmount(""); 
        } catch (err) {
            setError(err.message || "An error occurred while submitting your bid.");
        }
    };

    return (
        <Box sx={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            {error && <Alert severity="error" sx={{ marginBottom: "10px" }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ marginBottom: "10px" }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Bid Amount"
                    variant="outlined"
                    fullWidth
                    value={bidAmount}
                    onChange={handleChange}
                    placeholder="Enter your bid amount"
                    type="text" 
                    sx={{ marginBottom: "20px" }}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                    Submit Bid
                </Button>
            </form>
        </Box>
    );
};

export default Bid;