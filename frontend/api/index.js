import axios from "axios"
const URL= "http://localhost:3000/"

const registerUser=(username, email, password, walletAddress)=>{
    return (axios.post(`${URL}authenticate/register`,{username:username, email:email, password:password, walletAddress:walletAddress}))
}

const loginUser=(identifier, password)=>{
    return axios.post(`${URL}authenticate/login`,{identifier:identifier,password:password})
}

const postProject=(title, description, client, budget, deadline)=>{
   return axios.post(`${URL}projects/postProject`,{title:title , description:description, client:client, budget:budget, deadline:deadline})
}

const getAllProjects=()=>{
    return axios.get(`${URL}projects/getAllProjects`);
}

const getProjectDetails=(projectId)=>{
    return axios.get(`${URL}projects/getProjectDetails/${projectId}`);
}

const bidOnProject=(projectId, freelancerId, clientId, bidAmount )=>{
    return axios.post(`${URL}bids/bidOnProject`,{projectId:projectId, clientId:clientId, freelancerId:freelancerId, bidAmount:bidAmount});
}

const getClientPostedProjects=(clientId)=>{
    return axios.get(`${URL}projects/getClientPostedProjects/${clientId}`);
}

const getAllBidsOfAProject=(projectId)=>{
    return axios.get(`${URL}bids/getAllBidsOfAProject/${projectId}`);
}

const getClientInProgressProjects=(clientId)=>{
    return axios.get(`${URL}projects/getClientInProgressProjects/${clientId}`);
}

const bidSelected=(bidId)=>{
    return axios.get(`${URL}bids/bidSelected/${bidId}`);
}

const getFreelancerInProgressProjects=(freelancerId)=>{
    return axios.get(`${URL}projects/getFreelancerInProgressProjects/${freelancerId}`);
}

export {registerUser, loginUser, postProject, getAllProjects, getProjectDetails, bidOnProject, getClientPostedProjects, getAllBidsOfAProject, getClientInProgressProjects, bidSelected, getFreelancerInProgressProjects}
