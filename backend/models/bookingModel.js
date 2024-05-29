const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const bookingSchema=new mongoose.Schema({
    hotel:{
        type:ObjectId,
        ref:'Hotel',
        required:true
    },
    room:{
        type:ObjectId,
        ref:'Room',
        required:true
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    checkin_date:{
        type:Date,
        required:true,
    },
    checkout_date:{
        type:Date,
        required:true,
    },
    guest_num:{
        type:Number,
        required:true
    },
    booking_status:{
        type:String,
        default:'pending',
        required:true

    }
},{timestamps:true})
module.exports=mongoose.model('Booking',bookingSchema)
