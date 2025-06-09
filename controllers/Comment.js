const PostModel = require("../models/Blogs")
const commentModel=require("../models/Comment")
const AddComment=async(req,res)=>{
try {
    const {postId,userId,comment}=req.body
    const newComment=await commentModel.create({
        postId,userId,comment
    })
    const FindPost=await PostModel.findById(postId)
    if(!FindPost){
        return res.status(404).json({
            success:false,
            message:"Blog post not found"
        })
    }
    FindPost.comments.push(newComment._id)
    await FindPost.save()
    res.status(200).json({success:true,message:"Comment added successfully",comment:newComment})
} catch (error) {
    console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
}
}
module.exports={AddComment}