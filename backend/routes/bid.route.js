import Router from "express"
import { bidOnProject, getAllBidsOfAProject,bidSelected } from "../controllers/bid.controller.js";
const router= Router();

router.post("/bidOnProject",bidOnProject)
router.get("/getAllBidsOfAProject/:projectId",getAllBidsOfAProject)
router.get("/bidSelected/:bidId",bidSelected)

export default router