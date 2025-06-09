const express=require("express")
const { isAdmin } = require("../middleware/isAdmin")
const { Getalldata, GetallUsers, DeleteUser } = require("../controllers/Dashboard")
const DashboardRoutes=express.Router()
DashboardRoutes.get("/",isAdmin,Getalldata)
DashboardRoutes.get("/users",isAdmin,GetallUsers)
DashboardRoutes.delete("/deleteuser/:id",isAdmin,DeleteUser)
module.exports=DashboardRoutes