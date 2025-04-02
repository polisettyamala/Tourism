import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator'

//user registration
export const registerUser=async(req,res,next)=>{
    const {name,email,password,phone,role}=req.body;

    try {
        if(!name || !email || !password || !phone || role){
            return res.status(400).json({success:false,message:"All fieldsa are required"})
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Invalid email format"})
        }

        if(!validator.isStrongPassword(password,{minLength:6,minNumbers:1,minLowercase:1})){
            return res.status(400).json({success:false,message:"password must be atleast 6 character long and atleast 1 number and 1 letter"})
        }
        let user=await User.findOne({email:email})
        if(user){
            return res.status(400).json({success: false, message: "user already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const encryptedPassword=await bcrypt.hash(password,salt)

        user=new User({
            name,
            email,
            password:encryptedPassword,
            phone,
            role,
        })
        await user.save()

        return res.status(200).json({ success: true, message: "User register successfull" })
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server issue"})
    }
}

const createToken=(user)=>{
    return jwt.sign({id:user._id,name:user.name,email:user.email},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"2d"
        }
    )
}

export const login=async(req,res,next)=>{
      const {email,password}=req.body;
      try {
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false,message:"Invalid email"})
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        // console.log(req.body.password)
        // console.log(user.password)

        if(!isPasswordMatch){
            return res.status(404).json({success:false,message:"wrong password"})
            
        }
        // console.log(isPasswordMatch)
        const token=createToken(user)

        const {password:userPassword,role,...rest}=user._doc;
        // console.log(user._doc)

        
        return res.status(200).json({success:true,message:"login successfully",
            token,
            data:{...rest},
            role
      })
      } catch (error) {
        return res.status(500).json({success:false,message:"server error"})
      }
}

export const userProfileEdit=async(req,res,next)=>{
    const editUserId=req.params.id

    try {
        const userEdit=await User.findById(editUserId)
        if(!userEdit){
            return res.status(204).json({success:false,message:"no content"})
        }
        const updateUser=await User.findByIdAndUpdate(editUserId,{$set:req.body},{new:true})
        return res.status(200).json({success:true,message:"user updated",data:updateUser})
    } catch (error) {
        return res.status(500).json({success:false,message:"server error"})
    }
}

export const logout=async(req,res,next)=>{
    
   try {
    const authToken=req.headers.authorization

    if(!authToken || !authToken.startsWith("Bearer")){
        return res.status(401).json({success:false,message:"token expired"})
    }

    const token=authToken.split(" ")[1]
    return res.status(200).json({message:"Logout successfully"})
   } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
   }
}

