import express from "express"
import { authenticate } from "../auth/verifyToken.js"

import {registerUser,login,userProfileEdit,logout} from "../controllers/auth.controller.js"

const router=express.Router()

router.post("/registerUser",registerUser)
router.post("/userLogin",login)
router.put("/userEdit/:id",authenticate,userProfileEdit)
router.post("logout",authenticate,logout)

export default router