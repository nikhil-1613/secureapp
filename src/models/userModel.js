    import mongoose from "mongoose";


    const userSchema = new mongoose.Schema({
        email:{
        type:String,
        required:true,
        unique:true,
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        userName: {
            type: String,
            required: true,
        },
        joiningDate:{
            type:Date,
            
        },
        workingLocation:{
            type:String,
            required:true,
        },
        shiftTimings:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }
    })
    const User = mongoose.models.users || mongoose.model("users", userSchema);
    export default User;