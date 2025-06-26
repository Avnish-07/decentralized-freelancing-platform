import Router from "express"
import { getUserDetails, completeUserProfile} from "../controllers/user.controller.js"
const router= Router()

router.get("/getUserDetails/:userId", getUserDetails)
router.put("/completeUserProfile/:userId", completeUserProfile);


export default router