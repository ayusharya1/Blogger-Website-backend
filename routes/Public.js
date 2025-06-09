const express=require("express")
const { GetsinglePost, Updateuser } = require("../controllers/Public")
const upload = require("../middleware/Multer")
const { isLogin } = require("../middleware/isAdmin")
const PublicRoutes=express.Router()
PublicRoutes.get("/singlepost/:id",isLogin,GetsinglePost)
PublicRoutes.patch("/updateuser/:id",upload.single("profile"),Updateuser)
module.exports=PublicRoutes