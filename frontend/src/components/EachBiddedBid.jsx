import React from "react";
import { Box, Typography, Paper, Avatar, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import { bidSelected } from "../../api";
import {useNavigate} from "react-router-dom";


const EachBiddedBid = ({ eachBid }) => {

    const navigate= useNavigate()

    const bidForProjectSelected = async(eachBid) => {
        console.log("Bid selected:", eachBid);
        const isConfirmed= confirm("Are you sure to select this bid for your project")
        if(isConfirmed){
            const res= await bidSelected(eachBid._id)
            console.log(res.data,"this select")
            navigate("/manageProjects")
        }
    }
    
    return (
        <Paper
            elevation={5}
            style={{
                margin: "10px",
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
            }}
            component={motion.div}
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
        >
            <Stack direction="row" spacing={3} alignItems="center">
                {/* Freelancer Avatar */}
                <Avatar
                    alt={eachBid.freelancer.username}
                    src={eachBid.freelancerAvatar || ""}
                    style={{
                        width: "60px",
                        height: "60px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "2px solid #1e88e5", 
                    }}
                />
                <Typography
                    variant="h6"
                    style={{
                        color: "#1565c0", 
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                    }}
                >
                    {eachBid.freelancer.username}
                </Typography>
               
                <Typography
                    variant="h6"
                    style={{
                        color: "#2e7d32", 
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginLeft: "auto", 
                    }}
                >
                     <span style={{ color: "#3c3c3d", fontSize: "20px" }}>⧫</span> {eachBid.amount}
                </Typography>
                <Button variant="contained" sx={{mt:"30px"}} onClick={()=>bidForProjectSelected(eachBid)}>Select this bid</Button>
            </Stack>
        </Paper>
    );
};

export default EachBiddedBid;