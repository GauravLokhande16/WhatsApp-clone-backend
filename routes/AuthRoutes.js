import {Router} from "express"
import { checkuser, getAllUsers, onBoardUser } from "../controllers/AuthController.js"

const router = Router()

router.post("/check-user", checkuser)
router.post("/onboard-user", onBoardUser)
router.get("/get-contacts", getAllUsers)


export default router