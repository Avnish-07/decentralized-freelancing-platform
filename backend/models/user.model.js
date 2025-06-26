import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        unique:true,
        required:true
    },
    fullName:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    linkedin:{
        type:String,
        default:""
    },
    portfolio:{
        type:String,
        default:""
    }
},{timestamps:true})


export const User= mongoose.model('User',userSchema)