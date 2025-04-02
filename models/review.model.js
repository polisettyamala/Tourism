import mongoose from "mongoose"

const reviewSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    tourId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tours", 
        required: true 
    },
    reviewText:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("Review",reviewSchema)