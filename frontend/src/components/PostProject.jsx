import React, { useState } from "react";
import { Input, InputLabel, Typography, Button, Box, TextField } from "@mui/material"
import { postProject } from "../../api";
const PostProject = () => {

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        description: "",
        client: localStorage.getItem("userId"),
        budget: 0,
        deadline: ""
    });
    
    const handleChange = (e) => {
        setProjectDetails({
            ...projectDetails,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!projectDetails.title.trim() || !projectDetails.description.trim() || !projectDetails.client) {
            console.log("Empty Field");
            return;
        }
    
        if (!(Number(projectDetails.budget))) {
            console.log("Budget must be in numeric form");
            return;
        }

        if (projectDetails.budget <= 0.00001) {
            console.log("Budget must be greater than 0.00001");
            return;            
        }
    
        let formattedDate = new Date(projectDetails.deadline);
        let currentDate = new Date();
    
        if (formattedDate <= currentDate) {
            console.log("Deadline must be in the future");
            return;
        }
    
        const res = await postProject(
            projectDetails.title,
            projectDetails.description,
            projectDetails.client,
            projectDetails.budget,
            projectDetails.deadline
        );
    
        if (!res) {
            console.log("Project not posted");
            return;
        }
    
        console.log(res.data);
         
    };
    

    return (
        <>
            <Typography variant="h2" align="center" color='textSecondary'>Complete your project Details</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
            }}>
                <form onSubmit={handleSubmit} method='POST'>
                    <InputLabel htmlFor="title">Project Title:</InputLabel>
                    <Input type="text" name="title" required onChange={handleChange} />

                    <InputLabel htmlFor="description" sx={{ paddingTop: "20px" }}>Project Description:</InputLabel>
                    <TextField name="description" multiline rows={9} required onChange={handleChange}  />

                    <InputLabel htmlFor="budget" sx={{ paddingTop: "20px" }}>Project Budget:</InputLabel>
                    <Input type="text" name="budget" required onChange={handleChange}/>

                    <InputLabel htmlFor="deadline" sx={{ paddingTop: "20px" }}>Deadline:</InputLabel>
                    <Input type="date" name="deadline"required onChange={handleChange} />

                    <br />

                    <Button variant="contained" sx={{ mt: "30px" }} type="submit">Post</Button>
                </form>
            </Box>
        </>
    )
}

export default PostProject