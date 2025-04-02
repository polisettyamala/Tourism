import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    tourName:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    guestSize:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    phone:{
        type:Number,
        required:true,
    },
    bookAt:{
        type:Date,
        default:Date.now(),
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"active"
    }
})

export default mongoose.model("booking",bookingSchema)