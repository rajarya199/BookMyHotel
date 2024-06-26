 const Hotel=require('../models/hotelModel')
 const Room=require('../models/roomModel')

 //to post hotel
 exports.postHotel=async(req,res)=>{
    let hotel= new Hotel({
        htl_name:req.body.htl_name,
        htl_city:req.body.htl_city,
        htl_location:req.body.htl_location ,
        htl_description:req.body.htl_description ,
        // htl_image:req.files.path ,
        htl_image: req.files.map(file => file.path), // multer has stored the file paths in 'path' property
        htl_amenities: JSON.parse(req.body.htl_amenities) ,
        
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
 

 // to list all the room associate with a particular hotel

 exports.listHotelRooms=async(req,res)=>{
    try {
        // Find the hotel by ID
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }

        // Find all rooms associated with the hotel
        const rooms = await Room.find({ hotel: req.params.id })
        .populate('hotel','htl_name htl_city htl_location')
        if (!rooms) {
            return res.status(404).json({ error: 'No rooms found for this hotel' });
        }
        res.send({hotel,rooms})
        // res.status(200).json({ hotel, rooms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 //update hotels
 exports.updateHotel=async(req,res)=>{
    const hotel=await Hotel.findByIdAndUpdate(
        req.params.id,
        {
            htl_name:req.body.htl_name,
            htl_city:req.body.htl_city,
            htl_location:req.body.htl_location ,
            htl_description:req.body.htl_description ,
            htl_image: req.files.map(file => file.path), 
            htl_amenities: JSON.parse(req.body.htl_amenities) ,
        },
        {new:true}
    )
    if(!hotel){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(hotel)
    
 }
 