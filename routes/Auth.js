const express=require("express")
const { Register, Login, Logout } = require("../controllers/Auth")
const upload = require("../middleware/Multer")
const AuthRoutes=express.Router()
AuthRoutes.post("/register",upload.single("profile"),Register)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/logout",Logout)
module.exports=AuthRoutes