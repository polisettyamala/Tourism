import express from "express";
import cookieParse from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import tourRoutes from "./routes/tours.routes.js"
import authRoutes from "./routes/auth.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import reviews from "./routes/reveiw.routes.js"

dotenv.config()

const app=express();
const port=process.env.PORT||7000

app.use(
    cors({
        origin:true,
        Credential:true,
    })
)

app.use(cookieParse())
app.use(express.json())
app.use("/api/v1/tours",tourRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/book",bookingRouter)
app.use("/api/v1/review",reviews)


app.get("/",(req,res,next)=>{
    res.send("Testing.....!")
})

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected successfully`);
    }catch(error){
        console.log("DB connection error",error)
    }
}

connectDB()
.then(()=>{
app.listen(port)
console.log(`server is running in port ${port}`)
})
.catch((err)=>{
console.log(err)
})