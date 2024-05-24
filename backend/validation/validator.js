const{check,validationResult} =require('express-validator')
exports.userValidation=[
    check('name',"name is required ").notEmpty()
    .isLength({min:3})
    .withMessage('name must be of at least 3 character'),
    check('email','email is required').notEmpty()
    .isEmail().withMessage('email format incorrect'),
    check('gender', 'Gender is required')
    .notEmpty()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be either male, female, or other'),

  check('phone', 'Phone number is required')
    .notEmpty()
    .isMobilePhone()
    .withMessage('Phone number format is incorrect'),
]

exports.passwordValidation=[
    check('password','password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must contain atleast one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain at least one numeric value')
    .matches(/[@#$_?!]/).withMessage('passord must contain at least one special character')
    .isLength({min:8}).withMessage('password must be minium of 8 character')
]

exports.hotelValidation=[
    check('htl_name','hotel name is required').notEmpty()
    .isLength({ min: 3 })
    .withMessage('Hotel name must be at least 3 characters long'),
    check('htl_city','city id required').notEmpty(),
    check('htl_location','address id required').notEmpty(),
    check('htl_description','Description is required')
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
    // check('htl_image','hotel image is required').notEmpty(),
    //  check('htl_amenities','At least one amenity is required')
    // .isArray({ min: 1 })
]
exports.roomvalidation=[
    check('room_title','Room title is required').notEmpty()
    .isLength({ min: 3 })
    .withMessage('Room name must be at least 3 characters long'),

    check('room_number', "Room number is required")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Room number must be a positive integer'),

  check('room_type', 'Room type is required')
    .notEmpty()
    .isIn(['single', 'double', 'deluxe', 'standard', 'suite', 'family', 'classic'])
    .withMessage('Room type must be one of single, double, deluxe, standard, suite, family, classic'),

  check('room_price', "Room price is required")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage('Room price must be a positive number'),

  check('room_description', "Room description is required")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Room description must be at least 10 characters long'),

  check('hotel', "Hotel is required")
    .notEmpty()
    .isMongoId()
    .withMessage('Hotel must be a valid ID'),

  check('room_facility', "Room facility is required").notEmpty(),
 
   check('maxguest', "Max guest is required")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Max guest must be a positive integer')
]

//next middleware -if correct then push to next,coming fn 
exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        //no error next
        next()
    }
    else{
        //errors.array()-multiple errors ,[0]-index0 ist error at a time
        return res.status(400).json({error:errors.array()[0].msg})
    }
}