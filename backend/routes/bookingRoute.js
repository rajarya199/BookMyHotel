const express=require('express')
const { createBooking, bookingDetails, updateBookStatus } = require('../controllers/bookingController')
const router=express.Router()


router.post('/booking',createBooking)
router.get('/bookingdetail/:id',bookingDetails)
router.put('/updatebookingstatus/:id',updateBookStatus)
module.exports=router ;