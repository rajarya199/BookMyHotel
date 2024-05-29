const express=require('express')
const { createBooking, bookingDetails } = require('../controllers/bookingController')
const router=express.Router()


router.post('/booking',createBooking)
router.get('/bookingdetail/:id',bookingDetails)
module.exports=router ;