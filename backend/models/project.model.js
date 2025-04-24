import mongoose from 'mongoose';
const projectSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true
    },

    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    status:{
        type:String,
        enum: ["open", "inProgress", "cancelled", "completed"],
        default: "open"
    },

    budget:{
        type:Number,
        required:true
    },

    deadline:{
        type:Date,
        required:true
    },

    selectedBid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bid'
    },

}, {timestamps: true})
export const Project= mongoose.model('Project',projectSchema)