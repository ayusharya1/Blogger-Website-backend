const express=require("express")
const { GetsinglePost, Updateuser } = require("../controllers/Public")
const upload = require("../middleware/Multer")
const PublicRoutes=express.Router()
PublicRoutes.get("/singlepost/:id",GetsinglePost)
PublicRoutes.patch("/updateuser/:id",upload.single("profile"),Updateuser)
module.exports=PublicRoutes