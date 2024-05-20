const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const roomSchema= new mongoose.Schema({
    room_title:{
        type:String,
        required:true,
    },
    room_number:{
        type:Number,
        required:true,
    },
    room_type:{
        type: String,
        required: true
    },
    room_price:{
        type:Number,
        required:true
    },
    room_description:{
        type:String,
    },
    hotel:{
        type:ObjectId,
        ref:'Hotel',
        required:true
    },
    room_available:{
        type:Boolean,
        default:true
    },
    room_facility: [{
        type: String
      }],
      room_image:[{
        type:String,
        required:true
      }],
      room_rating:{
        type:Number,
        default:0,
        max:5 
    },
      maxguest:{
        type:Number,
        required:true
      } 
}
,{timestamps:true});

module.exports=mongoose.model('Room',roomSchema)