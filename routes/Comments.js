const express=require("express")
const { isLogin } = require("../middleware/isAdmin")
const { AddComment } = require("../controllers/Comment")
const CommentRoute=express.Router()
CommentRoute.post("/addcomment",isLogin,AddComment)
module.exports=CommentRoute