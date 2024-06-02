const express=require('express')
const { postHotel, hotelList, hotelDetails, deleteHotel, listHotelRooms, updateHotel } = require('../controllers/hotelController')
const router=express.Router()
const upload=require('../middleware/fileUpload')
const {hotelValidation,validation}=require('../validation/validator')
const { requireSignin, requireAdmin } = require('../controllers/userController')
router.post('/posthotel',requireSignin,requireAdmin,upload.array('htl_image','20'),hotelValidation,validation,postHotel)
router.get('/hotellist',hotelList)
router.get('/hoteldetails/:id',hotelDetails)
router.delete('/deletehotel/:id',requireSignin,requireAdmin,deleteHotel)
router.put('/updatehotel/:id',requireSignin,requireAdmin,upload.array('htl_image','20'),hotelValidation,validation,updateHotel)
router.get('/listhotelrooms/:id',listHotelRooms)

module.exports=router