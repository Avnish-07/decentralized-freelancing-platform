import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api";
import { Typography } from "@mui/material";
import ProjectCard from "../components/ProjectCard"; 

const GetAllProjects = () => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const handleProjects = async () => {
            const projectsData = await getAllProjects();
            setAllProjects(projectsData.data);
        };

        handleProjects();
    }, []);

    console.log(allProjects);
    if(allProjects.length===0){
        return (
            <div style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#01579b" }}>
                    Freelancing Projects
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                    No projects found
                </Typography>
            </div>
        );
    }
     

         return (
             <div style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                 <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#01579b" }}>
                     Freelancing Projects
                 </Typography>
                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                     {allProjects?.map((project) => (
                         <ProjectCard key={project._id} project={project} redirectTo= "allProjects" /> // Use ProjectCard component
                     ))}
                 </div>
             </div>
         );
        //  `JFDOSIJFOSJEFOI/{project._id}`
        
};

export default GetAllProjects;
