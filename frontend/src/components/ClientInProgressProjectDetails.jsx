import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Stack, Chip, Button } from "@mui/material";
import { getProjectDetails } from "../../api"; // Replace with your actual API functions

const ClientInProgressProjectDetails = () => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const gettingProjectDetails = async () => {
            try {
                const projectDetails = await getProjectDetails(projectId);
                setProjectData(projectDetails.data);
                console.log(projectDetails.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        gettingProjectDetails();
    }, [projectId]);

    if (!projectData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="textSecondary">
                    Loading project details...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            padding={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="#f9f9f9"
            minHeight="100vh"
        >
            <Paper
                elevation={4}
                style={{
                    padding: "32px",
                    maxWidth: "800px",
                    width: "100%",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#1565c0",
                        marginBottom: "24px",
                    }}
                >
                    {projectData.title}
                </Typography>
                <Stack spacing={4}>
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#555" }}
                        >
                            Status
                        </Typography>
                        <Chip
                            label={projectData.status}
                            style={{
                                backgroundColor:
                                    projectData.status === "open"
                                        ? "#4caf50"
                                        : projectData.status === "inProgress"
                                        ? "#2196f3"
                                        : projectData.status === "cancelled"
                                        ? "#f44336"
                                        : "#9c27b0",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                padding: "8px 16px",
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#555" }}
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: "#777",
                                lineHeight: "1.8",
                                fontSize: "1rem",
                            }}
                        >
                            {projectData.description}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#555" }}
                        >
                            Client
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: "#333",
                                fontSize: "1rem",
                            }}
                        >
                            {projectData.client?.username || "N/A"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#555" }}
                        >
                            Freelancer
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: "#333",
                                fontSize: "1rem",
                            }}
                        >
                            {projectData.selectedBid?.freelancer.username || "N/A"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#555" }}
                        >
                            Amount Paid
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: "#333",
                                fontSize: "1rem",
                            }}
                        >
                            Ξ{projectData.selectedBid?.amount || "N/A"}
                        </Typography>
                    </Box>
                </Stack>
                <Box
                    marginTop={4}
                    display="flex"
                    justifyContent="center"
                    style={{ marginTop: "32px" }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            padding: "12px 24px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                        disabled={projectData.status === "completed"}
                    >
                        Mark Project Done
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ClientInProgressProjectDetails;