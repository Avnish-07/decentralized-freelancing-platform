import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";



const postProject= async(req, res)=>{

    try{
        const{title, description, client, budget, deadline }= req.body;
        if(!title.trim() || !description.trim() || !client.trim() || !budget || !deadline){
            throw new Error("Project Field is Empty")
        }

        const clientExist= await User.findOne({_id:client})

        if(!clientExist){
            throw new Error("Unauthorized access");
        }

        const savedProject= await Project.create({
            title:title,
            description:description,
            client:client,
            budget:budget,
            deadline: new Date (deadline)
        })

        if(!savedProject){
            throw new Error("Project not saved");
        }

        return res.json(savedProject)


    }catch(err){
        return res.json(err.message)
    }

}

const getAllProjects= async(req,res)=>{
    try{
        const currentDate= new Date();
        const allProjects= await Project.find({
            deadline:{$gt: currentDate},
            status:"open"
        });

        if(allProjects.length===0){
            return res.json([]);
        }

        res.json(allProjects);
    }catch(err){
        return res.json(err.message)
    }
}

const getProjectDetails= async(req,res)=>{
    try{
        const {projectId}= req.params
        const projectDetails= await Project.findById({_id:projectId}).populate({
            path: 'selectedBid',
            populate: {
                path: 'freelancer',
                select: 'username'
            }
        }).populate('client', 'username');
        if(!projectDetails){
            throw new Error("No project of this id");
        }
        
        
        return res.json(projectDetails)
    }catch(err){
        return res.json(err.message)
    }
}

const getClientPostedProjects= async(req,res)=>{
   try{
    const {clientId}= req.params;
    const currentDate= new Date();

    if(!clientId){
        console.log(clientId);
        
        throw new Error("Problem in finding client Id")
    }
    
    const clientCurrentProjects= await Project.find({
        client:clientId,
    })

    for(let i=0; i<clientCurrentProjects.length; i++){
        if (clientCurrentProjects[i].deadline<currentDate && (clientCurrentProjects[i].status!=="completed" && clientCurrentProjects[i].status!=="inProgress")){ 
            await Project.findByIdAndUpdate({
                _id:clientCurrentProjects[i]._id
            },{status:"cancelled"})

        }
    }      



    if(clientCurrentProjects.length===0){
        return res.json([]);
    }

    return res.json(clientCurrentProjects);

   }catch(err){
    return res.json(err.message || "not able to find client projects")
   }

}

const getClientInProgressProjects= async(req, res)=>{
    try{
        const {clientId}= req.params;
        
        if(!clientId){
            throw new Error("Problem in finding client Id")
        }

        const clientCurrentProjects= await Project.find({
            client:clientId,
            status:"inProgress"
        })

        if(clientCurrentProjects.length===0){
            return res.json([]);
        }

        return res.json(clientCurrentProjects);
    }catch(err){
        return res.json(err.message || "not able to find client In progress projects")
    }
}

const getFreelancerInProgressProjects= async(req,res)=>{
    try{
        const {freelancerId}= req.params
        const InProgressProjects= await Project.find({
            status:"inProgress"
        }).populate("selectedBid")

        const freelancerInProgressProjects= InProgressProjects.filter((project)=>{
            return (project.selectedBid.freelancer.toString()===freelancerId)
        })

        if(freelancerInProgressProjects.length===0){
            return res.json([]);
        }

        return res.json(freelancerInProgressProjects);
    }catch(err){
        return res.json(err.message || "not able to find freelancer In progress projects")
    }
}



export {postProject, getAllProjects, getProjectDetails, getClientPostedProjects, getClientInProgressProjects, getFreelancerInProgressProjects}