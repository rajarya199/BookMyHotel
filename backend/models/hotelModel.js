const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const hotelSchema=new mongoose.Schema({
    htl_name:{
        type:String,
        required:true
    },
    htl_city:{
        type:String,
        required:true
    },
    htl_location:{
        type: String,
        required: true
    },
    htl_description:{
        type: String,
        required: true
    },
    htl_image:[{
        type: String,
        required: true
    }  
    ],
    htl_amenities: [{
        type: String
      }],
    htl_rating:{
        type:Number,
        default:0,
        max:5 
    },
   
},{timestamps:true})

module.exports=mongoose.model('Hotel',hotelSchema)