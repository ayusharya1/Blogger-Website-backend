const jwt=require("jsonwebtoken");
const userModel = require("../models/user");
const isAdmin=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        console.log("token",token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unathourization:No token provided"
            })
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        // console.log(decode);
        let user=await userModel.findById({_id:decode.userId})
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Unathourized:User not found"
            }) 
        }
        if(user.role !=="admin"){
           return res.status(403).json({
                success:false,
                message:"Unathourized:User is not an admin"
            })  
        }
        next()
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const isLogin=async(req,res,next)=>{
   try {
     const token=req.cookies.token
    if(!token){
        return res.status(404).json({
            success:false,
            message:"You need to login first"
        })
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    const user=await userModel.findById(decoded.userId)
    if(!user){
            return res.status(403).json({
                success:false,
                message:"Unathourized:User not found"
            }) 
        }
    req.user=user//yhn ph jh user h wh next middleware access karsakta h addcomment wala
    next()
    
   } catch (error) {
    console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
   }
}
module.exports={isAdmin,isLogin}