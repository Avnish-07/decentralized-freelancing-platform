import Router from "express"
import {postProject, getAllProjects, getProjectDetails, getClientPostedProjects, getClientInProgressProjects, getFreelancerInProgressProjects} from "../controllers/project.controller.js"
const router= Router()

router.post("/postProject",postProject)
router.get("/getAllProjects",getAllProjects)
router.get("/getProjectDetails/:projectId",getProjectDetails)
router.get("/getClientPostedProjects/:clientId",getClientPostedProjects)
router.get("/getClientInProgressProjects/:clientId",getClientInProgressProjects)
router.get("/getFreelancerInProgressProjects/:freelancerId",getFreelancerInProgressProjects)

export default router