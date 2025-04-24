import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../api";
import Bid from "./Bid.jsx";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Chip,
    Divider,
} from "@mui/material";
import { AccessTime, AttachMoney, CheckCircle } from "@mui/icons-material";

const GetProjectDetails = () => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const gettingProjectDetails = async () => {
            try {
                const projectDetails = await getProjectDetails(projectId);
                console.log(projectDetails);
                setProjectData(projectDetails.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        gettingProjectDetails();
    }, []);

    if (!projectData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: "20px", maxWidth: "900px", margin: "20px auto" }}>
            <Card
                variant="outlined"
                sx={{
                    borderRadius: "12px",
                    boxShadow: 3,
                    backgroundColor: "#f9f9f9",
                    overflow: "hidden",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                        {projectData.title}
                    </Typography>
                    <Chip
                        label={projectData.status === "open" ? "Open for Bids" : "Closed"}
                        color={projectData.status === "open" ? "success" : "error"}
                        icon={<CheckCircle />}
                        sx={{ marginBottom: "20px" }}
                    />
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Box>
                            <Typography variant="body1" sx={{ color: "#555" }}>
                                {projectData.description}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography
                                variant="body1"
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <AttachMoney sx={{ marginRight: "5px", color: "#1976d2" }} />
                                <strong>Budget:</strong> ${projectData.budget}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <AccessTime sx={{ marginRight: "5px", color: "#1976d2" }} />
                                <strong>Deadline:</strong>{" "}
                                {new Date(projectData.deadline).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box>
                            <Bid projectData={projectData} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default GetProjectDetails;