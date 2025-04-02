import Review from "../models/review.model.js"
import User from "../models/users.model.js";
import Tours from "../models/tours.model.js"
import mongoose from "mongoose";


export const createReview = async (req, res, next) => {
    try {
        const { reviewText, rating } = req.body; 
        const { tourId } = req.params;
        const userId=req.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }
        const user=await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userName=user.name
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(400).json({ success: false, message: "Invalid Tour ID" });
        }

        const tour = await Tours.findById(tourId);
        if (!tour) {
            return res.status(404).json({ success: false, message: "Tour not found" });
        }

        const reviews = new Review({
            userName:userName,
            userId,
            tourId,
            reviewText,
            rating
        });

        await reviews.save();

        await Tours.findByIdAndUpdate(tourId, { $push: { reviews: reviews._id } });

        return res.status(201).json({ success: true, message: "Review submitted successfully" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getReview=async(req,res,next)=>{
    try {
        const{tourId}=req.params
        if(!mongoose.Types.ObjectId.isValid(tourId)){
            return res.status(400).json({success:false,message:"Invalid Tour ID"})
        }
        const tour=await Tours.findById(tourId)
        if(!tour){
            return res.status(404).json({success:false,message:"Tour not found"})
        }
        const reviews=await Review.find({tourId}).populate("userId","name email")
        console.log(reviews,"reviews....")
        return res.status(200).json({ success: true, message: "successfully received",data:reviews })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const  getAllReview=async(req,res,next)=>{
    try {
        const userId=req.userId;
        console.log(userId,"userid...")
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"Invalid user id"})
        }
        const userDetails=await User.findById(userId)
        if(!userDetails){
            return res.status(404).json({success:false,message:"User not found"})
        }

        const reviews=await Review.find({userId}).populate("tourId","title")
        return res.status(200).json({success:true,message:"These are all reviews",data:reviews})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}

export const deleteReview=async(req,res,next)=>{
    try {
        const reviewId=req.params.reviewId;
        console.log(reviewId,"reviewId...")
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            return res.status(404).json({success:false,message:"wrong Id"})
        }
        const deleteReview=await Review.findByIdAndDelete(reviewId)
        if(!deleteReview){
            return res.status(404).json({success:false,message:"review not found"})
        }
        return res.status(200).json({success:true,message:"Review deleted successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"server Error"})
    }
}