import mongoose from "mongoose";

const userModel=new mongoose.Schema({
    name:{type:String,requied:true},
    email:{type:String,requied:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    // ref:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("User",userModel)