const express=require('express')
const router=express.Router()
const upload=require('../middleware/roomFileUpload')
const { postRoom, roomList, roomDetails, deleteRoom, updateRoom } = require('../controllers/roomController')
const { roomvalidation, validation } = require('../validation/validator')
const { requireSignin, requireAdmin } = require('../controllers/userController')

router.post('/postroom',requireSignin,requireAdmin,upload.array('room_image',10),roomvalidation,validation,postRoom)
router.get('/roomlist',roomList)
router.get('/roomdetails/:id',roomDetails)
router.delete('/deleteroom/:id',deleteRoom)
router.put('/updateroom/:id',requireSignin,requireAdmin,upload.array('room_image',10),roomvalidation,validation,updateRoom)
module.exports=router
