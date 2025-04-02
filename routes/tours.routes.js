import express from "express";

import {createTours,editTours,getSingletourbyId,getAllTours,deleteAllTours,deleteById,search} from "../controllers/tour.controllers.js"
import { authenticate } from "../auth/verifyToken.js";

const router=express.Router()

router.post("/createTours",createTours)
router.put("/editTours/:id",editTours)
router.get("/getsingletour/:id",authenticate,getSingletourbyId)
router.get("/alltours",getAllTours)
router.delete("/deleteAllTours",deleteAllTours)
router.delete("/deleteById/:id",deleteById)
router.get("/search",search)

export default router