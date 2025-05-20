import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Stack, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import { getProjectDetails } from "../../api"; 
import {ethers} from "ethers";
import contractData from "../../api/abi.json";

const FreelancerInProgressProjectDetails = () => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [markedTrue, setMarkedTrue] = useState(false);

    useEffect(() => {
        const gettingProjectDetails = async () => {
            try {
                const projectDetails = await getProjectDetails(projectId);
                setProjectData(projectDetails.data);
                console.log(projectDetails.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }

             try{
            const provider= new ethers.BrowserProvider(window.ethereum);
            const signer= await provider.getSigner();
            const contract= new ethers.Contract(
                contractData.contractAddress,
                contractData.abi,
                signer
            )

                        const projectIdBytes32= ethers.keccak256(ethers.toUtf8Bytes(projectId));
                        console.log(projectIdBytes32)
                        const projectStruct= await contract.projects(projectIdBytes32);
                        const val= projectStruct.freelancerCompleted
                        setMarkedTrue(val);

        }catch(err){
            alert("Failed to fetch: " + err.message);
        }
        };

        gettingProjectDetails();
    }, [projectId]);

    const freelancerMarkProjectDone = async () => {
        try{
            const provider= new ethers.BrowserProvider(window.ethereum);
            const signer= await provider.getSigner();
            const contract= new ethers.Contract(
                contractData.contractAddress,
                contractData.abi,
                signer
            )

            const projectIdBytes32= ethers.keccak256(ethers.toUtf8Bytes(projectId));
            console.log(projectIdBytes32)
            const tx= await contract.freelancerMarked(projectIdBytes32)
            
            await tx.wait();
            setMarkedTrue(true);
            alert("Project marked as done successfully.");
        }catch(err){
            console.log("Error marking project as done:", err);
            alert("Transaction failed: " + err.message);
        }
    }


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
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Paper
                    elevation={4}
                    style={{
                        padding: "32px",
                        maxWidth: "800px",
                        width: "100%",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
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
                                Amount you get for this work
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
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    padding: "12px 24px",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                }}
                                disabled={projectData.status === "completed"}
                                onClick={freelancerMarkProjectDone}
                            >
                                {markedTrue?"Project Marked As Done":"Mark Project As Done"}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default FreelancerInProgressProjectDetails;