const PostModel = require("../models/Blogs")
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const GetsinglePost = async (req, res) => {
    try {
        const id = req.params.id
        const checkPost = await PostModel.findById(id).populate({//for showing comment complete data
            path: "comments",
            populate: {
                path: "userId"//jitna bhi data h user ka wh return hojayega
            }
        })
        if (!checkPost) {
            return res.status(403).json({
                success: false,
                message: "Post not available"
            })
        }
        res.status(200).json({
            success: true,
            post: checkPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const Updateuser = async (req, res) => {
    try {
        const id = req.params.id
        const Finduser = await userModel.findById(id)
        if (!Finduser) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            })
        }
        const { FullName, oldpassword, newpassword } = req.body;
        if (FullName) {
            await userModel.findByIdAndUpdate({ _id: id }, { FullName })
        }
        if (oldpassword && newpassword) {
            const comparepass = await bcrypt.compare(oldpassword, Finduser.password)
            if (!comparepass) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid old password"
                })
            }
            const hashpassword = await bcrypt.hash(newpassword, 10)
            await userModel.findByIdAndUpdate({ _id: id }, {password:hashpassword})
        }
        if(req.file){
            await userModel.findByIdAndUpdate({_id:id},{profile:req.file.filename})
        }
        const updatedUser = await userModel.findById(id);
         res.status(200).json({
            success:true,
            message:"user updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = { GetsinglePost ,Updateuser}