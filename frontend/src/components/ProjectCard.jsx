import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

const ProjectCard = ({ project, redirectTo }) => {
   const navigate= useNavigate()
// change all this to links and directly pass that and change it tobutton to link
   const viewProjectDetails=()=>{
    if(redirectTo==="allProjects"){
        
        navigate(`/projectDetails/${project._id}`)
    }else if(redirectTo==="clientPostedProjects"){
        navigate(`/yourProjectDetails/${project._id}`)
    }else if(redirectTo==="manageProjects"){
        console.log(project)
        navigate(`/inProgressProjectDetails/${project._id}`)
    }else{
        navigate(`/projectToComplete/${project._id}`)
    }
   }


    return (
        <Card
            style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <CardContent style={{ padding: "20px" }}>
                <Typography
                    variant="h5"
                    style={{
                        fontWeight: "bold",
                        color: "#01579b",
                        marginBottom: "10px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {project.title}
                </Typography>
                <Typography
                    variant="body1"
                    style={{
                        color: "#757575",
                        marginBottom: "15px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {project.description}
                </Typography>
                <Typography
                    variant="body1"
                    style={{ color: "#424242", marginBottom: "10px", fontSize: "1.1rem" }}
                >
                    <strong>Budget:</strong> {project.budget}
                </Typography>
                <Typography
                    variant="body1"
                    style={{ color: "#424242", marginBottom: "20px", fontSize: "1.1rem" }}
                >
                    <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
                </Typography>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "#01579b",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: "bold",
                    }}
                    fullWidth
                    onClick={viewProjectDetails}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
