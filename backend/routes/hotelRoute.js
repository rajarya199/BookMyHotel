const express=require('express')
const { postHotel, hotelList, hotelDetails, deleteHotel } = require('../controllers/hotelController')
const router=express.Router()
const upload=require('../middleware/fileUpload')

router.post('/posthotel',upload.single('htl_image'),postHotel)
router.get('/hotellist',hotelList)
router.get('/hoteldetails/:id',hotelDetails)
router.delete('/deletehotel/:id',deleteHotel)

module.exports=router