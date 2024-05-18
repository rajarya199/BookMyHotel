const express=require('express')
const { postUser, postEmailConfirmation, signIn, signOut } = require('../controllers/userController')
const { userValidation, validation, passwordValidation } = require('../validation/validator')
const router=express.Router()

router.post('/register',userValidation,passwordValidation,validation,postUser)
router.put('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/signout',signOut)
module.exports=router 