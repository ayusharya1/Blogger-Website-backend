const express=require("express")
const app=express();
const dotenv=require("dotenv")
const path=require("path")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const corsOption={//to send cookies to frontend
    origin:"https://fantastic-gumption-c8cb50.netlify.app",
    credentials:true
}
app.use(cors(corsOption))
app.use(cookieParser())
dotenv.config()
const PORT=process.env.PORT || 6010;
const Authroutes=require("./routes/Auth")
const BlogsRoutes=require("./routes/Blogs")
const DBconnection=require("./utils/db");
const DashboardRoutes = require("./routes/Dashboard");
const CommentRoute = require("./routes/Comments");
const PublicRoutes = require("./routes/Public");
DBconnection()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
//routes
app.use("/auth",Authroutes)
app.use("/blog",BlogsRoutes)
app.use("/dashboard",DashboardRoutes)
app.use("/comment",CommentRoute)
app.use("/public",PublicRoutes)
app.get("/",(req,res)=>{
    res.send("hello ji")
})
app.listen(PORT,()=>{
    console.log("started server");
    
})