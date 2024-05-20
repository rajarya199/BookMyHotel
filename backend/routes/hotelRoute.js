const express=require('express')
const { postHotel, hotelList, hotelDetails, deleteHotel, listHotelRooms } = require('../controllers/hotelController')
const router=express.Router()
const upload=require('../middleware/fileUpload')

router.post('/posthotel',upload.single('htl_image'),postHotel)
router.get('/hotellist',hotelList)
router.get('/hoteldetails/:id',hotelDetails)
router.delete('/deletehotel/:id',deleteHotel)

// Route to list all rooms of a particular hotel
// router.get('/hotel/:hotelId/rooms', listHotelRooms)
router.get('/listhotelrooms/:id',listHotelRooms)

module.exports=router