const express=require('express')
const { createBooking, bookingDetails, updateBookStatus, bookingList, userBooking } = require('../controllers/bookingController')
const router=express.Router()


router.post('/booking',createBooking)
router.get('/bookingdetail/:id',bookingDetails)
router.put('/updatebookingstatus/:id',updateBookStatus)
router.get('/bookinglist',bookingList)
router.get('/userbooking/:id',userBooking)
module.exports=router ;