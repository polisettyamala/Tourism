import mongoose from "mongoose";

const ToursSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    city:{
       type:String,
       required:true,
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    maxGroupSize:{
      type:Number,
      required:true,
    },
    desc:{
      type:String,
      required:true
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"review"}],
    photo:{
      type:String,
      required:true,
    },
    featured:{
        type:Boolean,
        required:true,
    }
})

export default mongoose.model("Tours",ToursSchema)