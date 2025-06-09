const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    email:{
         type:String,
        required:true 
    },
    profile:{
        type:String
    },
    password:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})
module.exports=mongoose.model("Users",UserSchema)