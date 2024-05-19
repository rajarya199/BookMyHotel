 const Hotel=require('../models/hotelModel')

 //to post hotel
 exports.postHotel=async(req,res)=>{
    let hotel= new Hotel({
        htl_name:req.body.htl_name,
        htl_city:req.body.htl_city,
        htl_location:req.body.htl_location ,
        htl_description:req.body.htl_description ,
        htl_image:req.file.path ,
        htl_amenities:req.body.htl_amenities ,
        rooms:req.body.rooms
    })


    hotel=await hotel.save()
    if(!hotel){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(hotel)
 }

 //show all hotel
 exports.hotelList=async(req,res)=>{
    const hotel= await Hotel.find()
    if(!hotel){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(hotel)

 }
 //hotel details
 exports.hotelDetails=async(req,res)=>{
    const hotel= await Hotel.findById(req.params.id)
    .populate('rooms')
    if(!hotel){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(hotel)
 }

 //to delete hotel
 exports.deleteHotel=(req,res)=>{
    Hotel.findByIdAndDelete(req.params.id)
    .then(hotel=>{
        if(!hotel){
            return res.status(400).json({error:"hotel with that id is not found"})
        }
        else{
            return res.status(200).json({message:"hotel deleted"})

        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})

    })
 }
 