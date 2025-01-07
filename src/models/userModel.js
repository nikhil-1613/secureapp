import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
    email:{
        type:string,
        required:true,
        unique:true
    },
    password:{
        type:string,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;