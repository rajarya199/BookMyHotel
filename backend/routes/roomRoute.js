const express=require('express')
const router=express.Router()
const upload=require('../middleware/roomFileUpload')
const { postRoom, roomList, roomDetails, deleteRoom } = require('../controllers/roomController')

router.post('/postroom',upload.array('room_image',10),postRoom)
router.get('/roomlist',roomList)
router.get('/roomdetails/:id',roomDetails)
router.delete('/deleteroom/:id',deleteRoom)
module.exports=router
