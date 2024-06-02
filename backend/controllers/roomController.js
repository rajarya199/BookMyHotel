const Room=require('../models/roomModel')

exports.postRoom=async(req,res)=>{
    // let roomImages = Array.isArray(req.files) ? req.files.map(file => file.path) : [];

    let room =new Room({
        room_title:req.body.room_title,
        room_number:req.body.room_number,
        room_type:req.body.room_type,
        room_price:req.body.room_price,
        room_description:req.body.room_description,
        room_facility: JSON.parse(req.body.room_facility),
        
        room_image: req.files.map(file => file.path), 

        hotel:req.body.hotel,
        maxguest:req.body.maxguest
    })
    room=await room.save()
    if(!room){
        return res.status(400).json({error:'something went wrong'}) 
    }
    res.send(room)
}

exports.roomList=async(req,res)=>{
    const room=await Room.find()
    .populate('hotel', 'htl_name htl_city htl_location');

    if(!room){
        return res.status(400).json({error:'something went wrong'}) 
    }
    res.send(room)
} 

exports.roomDetails=async(req,res)=>{
    const room =await Room.findById(req.params.id)
    .populate('hotel')
    if(!room){
        return res.status(400).json({error:'something went wrong'}) 
    }
    res.send(room)
}

exports.deleteRoom=(req,res)=>{
    Room.findByIdAndDelete(req.params.id)
    .then(room=>{
        if(!room){
            return res.status(400).json({error:'room with id is not found'}) 
        }
        else{
            return res.status(200).json({message:'room deleted'})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}

//update room
exports.updateRoom=async(req,res)=>{
    const room=await Room.findByIdAndUpdate(
        req.params.id,{
            room_title:req.body.room_title,
            room_number:req.body.room_number,
            room_type:req.body.room_type,
            room_price:req.body.room_price,
            room_description:req.body.room_description,
            room_facility: JSON.parse(req.body.room_facility),
            
            room_image: req.files.map(file => file.path), 
    
            hotel:req.body.hotel,
            maxguest:req.body.maxguest
        },
        {new:true}
    )
    if(!room){
        return res.status(400).json({error:'something went wrong'}) 
    }
    res.send(room)
}