const express=require("express");
const app=express();
const {connection}=require("./Config/db");
const {userRoute}=require("./Routes/user.route");
const {doctorRouter}=require("./Routes/doctor.route");
const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors")

app.use(express.json());
app.use(cors());
app.use("/",userRoute);
app.use("/",doctorRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
         console.log(`Server is listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
    
})