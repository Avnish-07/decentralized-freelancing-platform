import mongoose from "mongoose";
const bidSchema= new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})
export const Bid= mongoose.model('Bid',bidSchema)