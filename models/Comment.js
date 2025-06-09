const mongoose=require("mongoose")
const CommentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blogs",
        required:true
    },
    userId:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("comment",CommentSchema)