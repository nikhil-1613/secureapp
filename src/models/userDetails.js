import mongoose from "mongoose";


const userDetails = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    joiningDate:{
        type:Date,
        default:Date.now,
    },
    workingLocation:{
        type:String,
        required:true,
    },
    shiftTimings:{
        type:String,
        required:true,
    }
})

const Details = mongoose.models.userDetails|| mongoose.model("useDetails",userDetails);
export default Details