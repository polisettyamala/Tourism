import express from "express";
import {authenticate} from "../auth/verifyToken.js"

import {createbooking,getSingleBooking,getAllBookings,deleteBookingId,cancelBooking} from "../controllers/booking.controller.js"

const router=express.Router()

router.post("/createBook",authenticate,createbooking)
router.get("/getsigleboking",authenticate,getSingleBooking);
router.get("/getallbookings",authenticate,getAllBookings);
router.delete("/deleteId/:id",authenticate,deleteBookingId);
router.put("/booking/:bookingId",authenticate,cancelBooking)
export default router