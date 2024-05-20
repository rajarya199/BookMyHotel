const express=require('express')
const router=express.Router()
const uploadRoom=require('../middleware/roomFileUpload')
const { postRoom, roomList, roomDetails, deleteRoom } = require('../controllers/roomController')

router.post('/postroom',uploadRoom.single('room_image'),postRoom)
router.get('/roomlist',roomList)
router.get('/roomdetails/:id',roomDetails)
router.delete('/deleteroom/:id',deleteRoom)
module.exports=router
