import express from "express";
import {authenticate,restrict} from "../auth/verifyToken.js"

import {createReview,getReview,getAllReview, deleteReview} from "../controllers/review.controller.js";

const router=express.Router()

router.post("/createReview/:tourId",authenticate,createReview)
router.get("/getreview/:tourId",authenticate,getReview)
router.get("/getallreview/:userId",authenticate,getAllReview)
router.delete("/deletereview/:reviewId", authenticate, restrict(["admin"]), deleteReview);
export default router
