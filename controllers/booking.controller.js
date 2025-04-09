import express, { response } from "express";
import booking from "../models/booking.model.js"
import User from "../models/users.model.js";
import mongoose from "mongoose";

export const createbooking=async(req,res)=>{
    const {tourName,guestSize,phone}=req.body
    const userId=req.userId
    const user=await User.findById(userId)
    const userEmail=user.email
    const fullName=req.name
    
    try {
        let bookings=new booking({
            tourName,
            userId,
            userEmail,
            fullName,
            guestSize,
            phone
        })
        await bookings.save()
        return res.status(200).json({success:true,message:"sucessfully booked"})
    } catch (error) {
        if(error.name==="ValidationError"){
            return res.status(400).json({success:false,message:"validation failed",error:error.errors})
        }
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const getSingleBooking=async(req,res,next)=>{
    const userId=req.userId
    try {
        if(!userId){
            return res.status(400).json({success:false,message:"User ID is required "})
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"Invalid User ID format"})
        }
        const Booking=await booking.findById(userId)
        // const bookingIds=booking.map((booking)=>booking._id)
        return res.status(200).json({success:true,message:"got single Id",data:Booking})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}

export const getAllBookings=async(req,res,next)=>{
    const userId=req.userId
    console.log(userId,"bookingss...")
    try {
        if(!userId){
            return res.status(400).json({success:false,message:"User ID is required "})
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"Invalid User ID format"})
        }
        const book=await booking.find({userId})
        if (book.length === 0) {
            return res.status(404).json({ success: false, message: "No bookings found for this user." });
        }
        return res.status(200).json({success:true,message:"successfully got all id",data:book})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}

export const deleteBookingId=async(req,res,next)=>{
    const bookingId=req.params.id
   
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return res.status(400).json({
                success:false,
                message:"Invalid booking ID format"
            })
        }
    try {
        const book=await booking.findById(bookingId)
        if(!book){
           return res.status(404).json({
            success:false,message:"Booking not found",
           })
        }
        await booking.findByIdAndDelete(bookingId)

        return res.status(200).json({success:true,message:"deleted successfully",data:book})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}
 

export const cancelBooking=async(req,res,next)=>{
    const cancelId=req.params.bookingId
    if(!mongoose.Types.ObjectId.isValid(cancelId)){
        return res.status(400).json({success:false,message:"Invalid booking ID"})
    }

    try {
        const cancelBookingId=await booking.findById(cancelId)
        if(!cancelBookingId){
            return res.status(404).json({success:false,message:"Booking not found"})
        }
       await booking.findByIdAndUpdate(cancelId,{$set:{status:"canceld"}},{new:true})
        return res.status(200).json({success:true,message:"Booking canceled successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}
