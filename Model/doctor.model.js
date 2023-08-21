const mongoose=require("mongoose");

const doctorSchema=mongoose.Schema({
    Name:{type:String, required:true},
    Image:{type:String, required:true},
    Specialization: {type:String, enum:["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"], required:true},
    Experience:{type:Number, required:true},
    Location:{type:String, required:true},
    Date :{ type: Date, default: Date.now },
    Slots :{type:Number, required:true},
    Fee:{type:Number, required:true}
})

const DoctorModel=mongoose.model("doctor",doctorSchema);

module.exports={DoctorModel};