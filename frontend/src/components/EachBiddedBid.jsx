import React from "react";
import {Typography, Paper, Avatar, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import { bidSelected } from "../../api";
import {useNavigate} from "react-router-dom";
import contractData from "../../api/abi.json"
import { ethers } from "ethers";

const EachBiddedBid = ({ eachBid }) => {

    const navigate= useNavigate()


const bidForProjectSelected = async (eachBid) => {
    try {
        const isConfirmed = confirm("Are you sure to select this bid for your project?");
        if (!isConfirmed) return;


        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            contractData.contractAddress, 
            contractData.abi,
            signer
        );

        if(signer.address.toLowerCase() !== eachBid.client.walletAddress){
            console.log(signer.address, eachBid.client.walletAddress)
            alert("Pay the amount from registered wallet address")
            return;
        }

        const projectIdBytes32 = ethers.keccak256(ethers.toUtf8Bytes(eachBid.project));// Convert projectId to bytes32
         console.log(projectIdBytes32)
        const amountInWei = ethers.parseEther(eachBid.amount.toString()); //convert in wei then in string 

        const tx = await contract.lockMoney(
            projectIdBytes32,
            eachBid.freelancer.walletAddress,
            eachBid.client.walletAddress,
            amountInWei,
            { value: amountInWei }
        );

        await tx.wait();

        const checker= await contract.projects(projectIdBytes32);
        console.log("checking project is present or not", checker)
        console.log("Funds locked successfully.");

        const res = await bidSelected(eachBid._id);
        console.log("Bid saved in DB:", res.data);

        
        navigate("/manageProjects");

    } catch (error) {
        console.error("Error locking funds:", error);
        alert("Transaction failed: " + error.message);
    }
};

    
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