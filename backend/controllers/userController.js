const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/setEmail");
const crypto = require("crypto");
const jwt=require('jsonwebtoken')
const {expressjwt}=require('express-jwt')
//to register user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    phone: req.body.phone,
  });
  // check if email register
  User.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      res
        .status(400)
        .json({ error: "email is already registered try with new one" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "unablr to create an account" });
      }
      //create token and save to model
      let mytoken = new Token({
        // key token of db
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id,
      });
      mytoken = await mytoken.save();
      if (!mytoken) {
        return res.status(400).json({ error: "failed to create a token" });
      }

      //send email process
      const url=process.env.FRONTEND_URL+'\/email\/confirmation\/'+mytoken.token
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Email verification link",
        text: `hello,\n\n please verify your email by click in the below link:\n\n,
                  http:\/\/${req.headers.host}\/api\/confirmation\/${mytoken.token}`,

        //http:localhost:8000/api/confirmation/3457777
        html:`
        <h3> Hello User,</h3> <br/>
        <h3> Thank for joining </h3> 
        <h1> To finished Registration ,Verify Your Email Account</h1>
        <button >  <a href=${url}> Click to verify </a> </button>
        `
      });
      res.send(user);
    }
  });
};


////post email confirmation
exports.postEmailConfirmation = (req, res) => {
    //at first find the valid/matching token
    Token.findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        return res
          .status(400)
          .json({ error: "invalid token or token may have expired" });
      }
        //if found valid then find the valid user for that token
        User.findOne({ _id: token.userId })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              error: "we are unable to find the valid user for this token",
            })
          }
          // check if user is already verified or not
          if (user.isVerified) {
            return res
              .status(400)
              .json({ error: "email is already verified,please login to continue" });
          }
          //save verified user
          user.isVerified=true;
          user.save()
          .then(user=>{
            if(!user){
              return res
              .status(400)
              .json({ error: "failed to verify the email" });
            }
            res.json({message:'congrats,your email has been verified successfully'})  
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          })
        })
  
        .catch((err) => {
          return res.status(400).json({ error: err });
        })
    })
   .catch((err) => {
    return res.status(400).json({ error: err });
  });
  };
  
  //signin 
exports.signIn=async(req,res)=>{
    const {email,password}=req.body 

    //check email is register/not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(503)
        .json({
          error:
            "sorry,the email you provided is not found in our system ,register first and try again" });
    }

    //if email found check password
    
    if(!user.authenticate(password)){
      return res.status(400).json({ error: "email and password doesnot match" });
    }  
    //check if user is verified or not
    if (!user.isVerified) {
      return res.status(400).json({ error: "verify email first to continue" });
    }
    //generate token with user id and jwt secret
    const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET)
      //store token in the cookie
      res.cookie("mycookie", token, { expire: Date.now()+ 99999 });
       //return user information to frontend
    const { _id, name, role,phone } = user;
    return res.json({ token, user: { name, role, email, _id,phone } });
    //to acess name--> .user.name
    
  }

  ////signout
exports.signOut=(req,res)=>{
    res.clearCookie('mycookie')
    res.json({message:'signout sucessfully'})
  }


  //require signin

exports.requireSignin=expressjwt({
    secret:process.env.Jwt_SECRET,
    algorithms:['HS256'],
    userProperty:'auth'
  })

  //middleware for user role
exports.requireUser=(req,res,next)=>{
    //verify jwt
     expressjwt({
      secret:process.env.Jwt_SECRET,
    algorithms:['HS256'],
    userProperty:'auth'
     })(req,res,(err)=>{
      if(err){
        return res.status(400).json({error:'Unauthorized'})
      }
      //check the role
      if(req.auth.role===0){
        //grant access
        next()
      } else{
        //unauthorize role
        return res.status(403).json({error:'forbidden'})
      }
     })
  }
  
  //middleware for admin role
  exports.requireAdmin=(req,res,next)=>{
    //verify jwt
     expressjwt({
      secret:process.env.Jwt_SECRET,
    algorithms:['HS256'],
    userProperty:'auth'
     })(req,res,(err)=>{
      if(err){
        return res.status(400).json({error:'Unauthorized'})
      }
      //check the role
      if(req.auth.role===1){
        //grant access
        next()
      } else{
        //unauthorize role
        return res.status(403).json({error:'forbidden'})
      }
     })
  }