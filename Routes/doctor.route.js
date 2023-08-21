const express=require("express");
const doctorRouter=express.Router();
const {DoctorModel}=require("../Model/doctor.model");

doctorRouter.post("/appointments",async(req,res)=>{
    const {Name,Image,Specialization,Experience,Location,Date,Slots,Fee}=req.body;
    try {
        const appoinment=new DoctorModel({Name,Image,Specialization,Experience,Location,Date,Slots,Fee});
        await appoinment.save();
        res.status(200).send({msg:"Appoinment Fixed"})
    } catch (error) {
        res.status(400).send(error)
    }
})

doctorRouter.get("/",async(req,res)=>{
    const {filterBy,sortBy,Name}=req.query;
    try {
        const sortValue=(sortBy==="asc")?1:-1;
       if(filterBy && !sortBy && !Name){
        const apponments=await DoctorModel.find({Specialization:filterBy});
        return res.status(200).json(apponments)
       }
       if(!filterBy && sortBy && !Name){
        const apponments=await DoctorModel.find().sort({Date:sortValue});
        return res.status(200).json(apponments)
       }
       if(!filterBy && !sortBy && Name){
        const apponments=await DoctorModel.find({Name:{ $regex: Name, $options: 'i'}});
        return res.status(200).json(apponments)
       }
       if(filterBy && sortBy && !Name){
        const apponments=await DoctorModel.find({Specialization:filterBy}).sort({Date:sortValue});
        return res.status(200).json(apponments)
       }
       if(!filterBy && sortBy && Name){
        const apponments=await DoctorModel.find({Name:{ $regex: Name, $options: 'i'}}).sort({Date:sortValue});
        return res.status(200).json(apponments)
       }
       if(filterBy && !sortBy && Name){
        const apponments=await DoctorModel.find({Name:{ $regex: Name, $options: 'i'}, Specialization:filterBy});
        return res.status(200).json(apponments)
       }
       if(filterBy && sortBy && Name){
        const apponments=await DoctorModel.find({Name:{ $regex: Name, $options: 'i'}, Specialization:filterBy}).sort({Date:sortValue});
        return res.status(200).json(apponments)
       }
        const apponments=await DoctorModel.find();
        res.status(200).json(apponments)
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports={doctorRouter};