import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../api";
import { Box, Typography, CircularProgress, Paper, Stack, Divider, Chip } from "@mui/material";
import GetEachProjectAllBids from "./GetEachProjectAllBids";

const PostedProjectDetails = () => {
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
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box padding={4} display="flex" flexDirection="column" alignItems="center" bgcolor="#f9f9f9" minHeight="100vh">
            {/* Project Details Section */}
            <Paper elevation={3} style={{ padding: "24px", maxWidth: "800px", width: "100%" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
                >
                    {projectData.title}
                </Typography>
                <Divider style={{ margin: "16px 0" }} />

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="body1" gutterBottom style={{ fontWeight: "bold", color: "#555" }}>
                            Description
                        </Typography>
                        <Typography variant="body2" style={{ color: "#777", lineHeight: "1.6" }}>
                            {projectData.description}
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="body1" gutterBottom style={{ fontWeight: "bold", color: "#555" }}>
                                Status
                            </Typography>
                            <Chip
                                label={projectData.status}
                                style={{
                                    backgroundColor:
                                        projectData.status === "open"
                                            ? "#4caf50" // Green for "open"
                                            : projectData.status === "inProgress"
                                            ? "#2196f3" // Blue for "inProgress"
                                            : projectData.status === "cancelled"
                                            ? "#f44336" // Red for "cancelled"
                                            : "#9c27b0", // Purple for "completed"
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1" gutterBottom style={{ fontWeight: "bold", color: "#555" }}>
                                Budget
                            </Typography>
                            <Typography variant="body2" style={{ color: "#333", fontSize: "1.2rem" }}>
                                Ξ{projectData.budget} {/* Changed to Ethereum symbol */}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="body1" gutterBottom style={{ fontWeight: "bold", color: "#555" }}>
                            Deadline
                        </Typography>
                        <Typography variant="body2" style={{ color: "#777" }}>
                            {new Date(projectData.deadline).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* Bids Section */}
            {projectData.status === "open" && (
    <Box marginTop={4} width="100%">
        <Typography
            variant="h5"
            gutterBottom
            style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
        >
            Bids for this Project
        </Typography>
        <GetEachProjectAllBids project={projectData} />
    </Box>
)}
        </Box>
    );
};

export default PostedProjectDetails;