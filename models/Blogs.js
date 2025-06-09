const mongoose=require("mongoose")
const BlogSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    postimage:{
        type:String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
},{timestamps:true})
module.exports=mongoose.model("Blogs",BlogSchema)