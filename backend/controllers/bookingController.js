const Booking=require('../models/bookingModel')
const Room =require('../models/roomModel')
exports.createBooking=async(req,res)=>{
const {hotel,room,user,checkin_date,checkout_date,guest_num}=req.body
    const roomDetails=await Room.findById(room)
    if(!roomDetails){
        return res.status(404).json({ message: "Room not found" });
    }
    const inDate = new Date(checkin_date);
    const checkinDate=inDate.getTime()
    const outDate = new Date(checkout_date);
    const checkoutDate=outDate.getTime()
    const totalDays = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    // Calculate the total price
    const totalSum = roomDetails.room_price * totalDays;

    let booking=new Booking({
        hotel,
        room,
        user,
        checkin_date:checkinDate,
        checkout_date:checkoutDate,
        guest_num,
        totalPrice:totalSum,
    })

    booking=await booking.save()
    if(!booking){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(booking)
}
exports.bookingList=async(req,res)=>{
    const booking=await Booking.find()
    .populate('user','name phone email')
    .populate('room','room_price room_type room_title maxguest room_image room_avilable room_number')
    .populate('hotel','htl_name htl_location htl_city')
    .sort({createdAt:-1})
    if(!booking){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(booking)
}
exports.bookingDetails=async(req,res)=>{
    const booking=await Booking.findById(req.params.id)
    .populate('user','name phone email')
    .populate('room','room_price room_type room_title maxguest room_image room_avilable')
    .populate('hotel','htl_name htl_location htl_city')
    
    if(!booking){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(booking)
}

//update status
exports.updateBookStatus=async(req,res)=>{
    const booking=await Booking.findByIdAndUpdate( req.params.id,
        {
            booking_status:req.body.booking_status 
        },
        {new:true}
    )
       
    if(!booking){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(booking)
}


exports.userBooking=async(req,res)=>{
    const userBookingList=await Booking.find({user:req.params.id})
    .populate('room hotel user')
    .sort({createdAt:-1})
    if(!userBookingList){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(userBookingList)
}