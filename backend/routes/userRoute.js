const express=require('express')
const { postUser, postEmailConfirmation, signIn, signOut, requireSignin, userList, forgetPassword, resetPassword } = require('../controllers/userController')
const { userValidation, validation, passwordValidation } = require('../validation/validator')
const router=express.Router()

router.post('/register',userValidation,passwordValidation,validation,postUser)
router.put('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/signout',signOut)
router.post('/forgetpassword',forgetPassword)
router.put('/resetpassword/:token',passwordValidation,validation,resetPassword)
router.get('/userlist',requireSignin,userList)
module.exports=router 