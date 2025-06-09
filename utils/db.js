const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const DBconnection=async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected to mongoose");
    }).catch((err)=>console.log(err)
    )
}
module.exports=DBconnection