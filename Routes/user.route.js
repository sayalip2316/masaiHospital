const express=require("express");
const userRoute=express.Router();
const {UserModel}=require("../Model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


userRoute.post("/signup",async(req,res)=>{
    const {Email,Password,ConfirmPassword}=req.body;
    try {
        if(Password===ConfirmPassword){
            bcrypt.hash(Password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({msg:"Something went wrong"})
                }
                if(hash){
                    const user=new UserModel({Email,Password:hash,ConfirmPassword:hash});
                    await user.save();
                    res.status(200).send({"msg":"Registration has been done!"})
                }
            })
        }else{
            res.status(400).send({msg:"Password dosent match"}) 
        }
       
    } catch (error) {
        res.status(400).send(error)
    }
})


userRoute.post("/login",async(req,res)=>{
    const{Email,Password}=req.body
    try {
        const user=await UserModel.findOne({Email})
       if(user){
        bcrypt.compare(Password, user.Password,async(err, result)=> {
            if(result){
                res.status(200).send({"msg":"Login Successful","token":jwt.sign({"userID":user._id},"masai")})
            }else{
                res.status(400).send({"msg":"Invalid Credentials"})
            }
          
        });
       
       }
    } catch (error) {
        res.status(400).send("Wrong Credentials")
    }
    })
    
module.exports={userRoute}