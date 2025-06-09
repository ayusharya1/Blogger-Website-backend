const userModel = require("../models/user")
const PostModel=require("../models/Blogs")
const commentModel=require("../models/Comment")
const fs=require("fs")
const path=require("path")
const Getalldata=async(req,res)=>{
    try {
        const Users=await userModel.find()
        const Posts=await PostModel.find()
        const Comments=await commentModel.find()
        if(!Users || !Posts){
            return res.status(404).json({success:false,message:"No Data Found"})
        }
        res.status(200).json({success:true,Users,Posts,Comments:Comments})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const GetallUsers=async(req,res)=>{
    try {
        const Users=await userModel.find()
        if(!Users){
            return res.status(404).json({success:false,message:"No Data Found"})
        }
        res.status(200).json({success:true,Users})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const DeleteUser=async(req,res)=>{
    try {
        const id=req.params.id
        // console.log(id);
        
        const Finduser=await userModel.findOne({_id:id})
        if(!Finduser){
            return res.status(404).json({success:false,message:"No such User Found"})
        }
        if(Finduser.role==="admin"){
             return res.status(404).json({success:false,message:"Sorry you are admin,you can not delete your account"})
        }
        if(Finduser.profile){
            const userpath=path.join("public/images",Finduser.profile)
                    fs.promises.unlink(userpath)
                    .then(()=>console.log("user image deleted")).catch(()=>console.log("error in deleting the user image "))
        }
        await userModel.findByIdAndDelete(id)
         res.status(200).json({success:true,message:"User deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports={Getalldata,GetallUsers,DeleteUser}