import Tours from '../models/tours.model.js'

export const createTours=async(req,res,next)=>{
    const {title,city,address,distance,price,maxGroupSize,desc,
        // reviews,
        photo,featured}=req.body;

   try {
    let tours=new Tours({
        title,
        city,
        address,
        distance,
        price,
        maxGroupSize,
        desc,
        // reviews,
        photo,
        featured
    })
    await tours.save()
    return res.status(200).json({success:true,message:"sucessfully created"})
   } catch (error) {
    return res.staus(500).json({success:false,message:"Internal server error"})
   }
}

export const editTours=async(req,res,next)=>{
    const toursId=req.params.id

    try{
        const tours=await Tours.findById(toursId)
        // console.log(tours)

        if(!tours){
            res.status(404).json({success:false,message:"tours not found.."})
        }
        const updateTour=await Tours.findByIdAndUpdate(toursId,{$set:req.body},{new:true})
        return res.status(200).json({success:true,message:"tours updated",data:updateTour})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const getSingletourbyId=async(req,res,next)=>{
    const toursId=req.params.id
    try {
        const tour=await Tours.findById(toursId)
        if(!tour){
            return res.status(404).json({success:false,message:"blog not found"})
        }
        return res.status(200).json({success:true,message:"got single Id",data:tour})
    } catch (error) {
        return res.staus(500).json({success:false,message:"Internal server error"})
    }
}
export const getAllTours=async(req,res,next)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) ||10;
    const skip=(page-1)*limit

    try{
        const totalTours=await Tours.countDocuments();
        const tours=await Tours.find({}).skip(skip).limit(limit);

        if(!tours.length){
            return res.status(404).json({success:false,message:"tours not found..."})
        }
       return res.status(200).json({success:true,count:tours.length,totalPages:Math.ceil(totalTours/limit),currentPage:page,data:tours})
    }catch(error){
        console.log(error,"errorr...")
        return res.status(500).json({success:false,message:"Internal server error.."})
    }
}
export const deleteAllTours=async(req,res,next)=>{
    const allTours=req.params

    try {
        const tour=await Tours.find(allTours)
        if(!tour){
            return res.status(404).json({success:false,message:"tour not found.."})
        }
        await Tours.deleteMany(allTours)
        return res.status(200).json({success:true,message:"deletedAlltours successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const deleteById=async(req,res,next)=>{
    const toursId=req.params.id

    try {
        const tour=await Tours.findById(toursId)
        if(!tour){
            return res.status(404).json({success:false,message:"tours not found.."})
        }
        await Tours.findByIdAndDelete(toursId)
        return res.status(200).json({success:true,message:"deleted by Id successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export const search=async(req,res,next)=>{
    try {
        const {title,city,address,distance}=req.query;
        console.log(req.query)
        if(!title && !city && !address && !distance){
            return res.status(400).json({success:false,message:"Please provide atleast once parameter"})
        }
        const query={}
        if(title) query.title={$regex:title,$options:"i"};
        if(city) query.city={$regex:city,$options:"i"};
        if(address) query.address={$regex:address,$options:"i"};
        if(distance) query.distance={$lte:Number(distance)}
        console.log(query,"query..")

        const tours=await Tours.find(query)
        console.log(tours,"tours...")
        if(!tours.length){
            return res.status(404).send("no tour found")
        }
        return res.status(200).json({success:true,message:"found data",data:tours})

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}