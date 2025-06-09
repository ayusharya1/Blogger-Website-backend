const PostModel=require("../models/Blogs")
//ab hum chate hn ki jb  post delete ho th image folder mein image h wh bhi delete hojaye,import below
const fs=require("fs")
const path=require("path")
const createBlog=async(req,res)=>{
    try {
        const {title,description}=req.body
        console.log(req.file.filename);
        
        if(!title || !description){
           return res.status(401).json({
            success:false,
            message:"Required Fields are missing"
        })}
        const post=await PostModel.create({
            title,
            description,
            postimage:req.file.filename,
            message:"post created sucsessfully"
        })
        res.status(200).json({
            success:true,
            messgae:"post added successfully",
            blog:post
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const getposts=async(req,res)=>{
    try {
        const Allposts=await PostModel.find()
        if(!Allposts){
            return res.status(403).json({
            success:false,
            message:"No posts found"
        })
        }
        res.status(200).json(Allposts)
    } catch (error) {
       console.log(error);
         res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const deleteBlog=async(req,res)=>{
    try {
        const id=req.params.id
        const FindPost=await PostModel.findOne({_id:id})
        if(!FindPost){
            return res.status(403).json({
            success:false,
            message:"No such post exist"
        })
        }
        //public/image folder seh bhi image delete k liye
        if(FindPost.postimage){
            const profilepath=path.join("public/images",FindPost.postimage)
            fs.promises.unlink(profilepath)
            .then(()=>console.log("Post image deleted")).catch(()=>console.log("error in deleting the post image "))
        }
        await PostModel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Post deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const updatepost=async(req,res)=>{
    try {
        const id=req.params.id
        const {title,description}=req.body
        const FindPost=await PostModel.findOne({_id:id})
        if(!FindPost){
            return res.status(403).json({
            success:false,
            message:"No such post exist"
        })
        }
        if(title){
        await PostModel.findOneAndUpdate({_id:id},{
            title})
      }
      if(description){
        await PostModel.findOneAndUpdate({_id:id},{
            description})
      }
      if(req.file){
         await PostModel.findOneAndUpdate({_id:id},{
            postimage:req.file.filename})
      }
         res.status(200).json({
            success:true,
            messgae:"post updated successfully"
        })
    } catch (error) {
          console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports={createBlog,getposts,deleteBlog,updatepost}