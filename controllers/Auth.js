const UserModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const Register=async(req,res)=>{
    try {
        const { FullName,email,password}=req.body
        const existuser=await UserModel.findOne({email})
        if(existuser){
            return res.status(303).json({
                success:false,
                message:"User already exist Please Login"
            })
        }
        const imagePath=req.file.filename
        const hashpassword=await bcrypt.hash(password,10)
        const NewUser=await UserModel.create({
            FullName,
            email,
            password:hashpassword,
            profile:imagePath
        })
        return res.status(200).json({
            success:true,
            user:NewUser,
            message:"User Created Succesfully"
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false
            ,message:"Internal Server Error"
        })
    }
}
const Login=async(req,res)=>{
    try {
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const checkUser=await UserModel.findOne({email})
    if(!checkUser){
        return res.status(400).json({
            success:false,
            message:"email not registered,kindly Register"
        })
    }
    const comparepass=await bcrypt.compare(password,checkUser.password)
    if(!comparepass){
          return res.status(401).json({
            success:false,
            message:"Invalid password"
        })
    }
    const token=jwt.sign({userId:checkUser._id},process.env.SECRET_KEY)
    res.cookie("token",token,{
        //for secure purpose
            httpOnly:true,
           secure:false,
           maxAge:3 * 24 * 60 * 60 * 1000//after 3 days token will be expired
    })
    res.status(200).json({
        success:true,
        message:"Loged in successfully",
        user:checkUser,
        token
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}
const Logout=async(req,res)=>{
try {
    res.clearCookie("token")
    res.status(200).json({
        success:true,
        message:"Loged out successfully",
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}
module.exports={Register,Login,Logout}