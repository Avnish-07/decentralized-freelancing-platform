import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import PostProject from "./components/PostProject.jsx";
import GetAllProjects from "./components/GetAllProjects.jsx";
import GetProjectDetails from "./components/GetProjectDetails.jsx";
import GetClientPostedProjects from "./components/GetClientPostedProjects.jsx";
import PostedProjectDetails from "./components/PostedProjectDetails.jsx";
import ManageProjects from "./components/ManageProjects.jsx";
import GetFreelancerInProgressProjects from "./components/GetFreelancerInProgressProjects.jsx";
import ClientInProgressProjectDetails from "./components/ClientInProgressProjectDetails.jsx";
import FreelancerInProgressProjectDetails from "./components/FreelancerInProgressProjectDetails.jsx";
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="register" element={<Register/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="postProject" element={<PostProject/>}/>
       <Route path="getAllProjects" element={<GetAllProjects/>}/>
       <Route path="projectDetails/:projectId" element={<GetProjectDetails/>}/>
       <Route path="postedProjects" element={<GetClientPostedProjects/>}/>
       <Route path="manageProjects" element={<ManageProjects/>}/>
       <Route path="yourProjectDetails/:projectId" element={<PostedProjectDetails/>}/>
       <Route path="projectsToWork" element={<GetFreelancerInProgressProjects/>}/>
       <Route path="inProgressProjectDetails/:projectId" element={<ClientInProgressProjectDetails/>}/>
       <Route path="projectToComplete/:projectId" element={<FreelancerInProgressProjectDetails/>}/>
      </Routes>
     </BrowserRouter>
     

    </>
  );
}

export default App
