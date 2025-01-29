import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        required: true,
    },
    shift:{
        type: String,
        required: true,
    },
    shiftTimings: { type: String, required: true },
   
    Purpose:{
        type: String,
        required: true,
    },
    staffRequired:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
   acceptedGuards:[
    {
        name:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number,
            required:true
        }
    }
   ]
});

const Requirement = mongoose.models.Requirement || mongoose.model("Requirement", requirementSchema);
export default Requirement;