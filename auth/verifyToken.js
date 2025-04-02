import jwt from "jsonwebtoken";
import User from "../models/users.model.js"

export const authenticate=async(req,res,next)=>{
    const authToken=req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer")){
        return res.status(401).json({success:false,message:"Authrization denied"})
    }
    try {
        const token=authToken.split(" ")[1]
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        //  console.log(verifyToken,"verifytoken.....")
        // console.log(process.env.JWT_SECRET_KEY)

        req.userId=verifyToken.id;
        req.role=verifyToken.role;
        req.email=verifyToken.email
        req.name=verifyToken.name;
 
        next()
    } catch (error) {
        if(error.name==="TokenExiredError"){
            return res.status(401).json({message:"Token expired"})
        }
        return res.status(401).json({success:false, message:"Invalid token"})
    }
}

export const restrict=(roles)=>async(req,res,next)=>{
    try {
        const userId=req.userId;
        console.log(userId)
        const user=await User.findById(userId)
        console.log(user,"user...")
        const userRole=user.role;

        if(userRole==="user" && roles.includes("user")){
            next();
        }else if(userRole==="admin" && roles.includes("admin")){
            next()
        }else{
            return res.status(404).json({success:false,message:`${userRole} is not allowed to access this API`})
        }
    } catch (error) {
        return res.status(401).json({success:false, message:"Invalid token"})
    }
}



