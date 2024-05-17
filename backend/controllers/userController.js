const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/setEmail");
const crypto = require("crypto");
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
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Email verification link",
        text: `hello,\n\n please verify your email by click in the below link:\n\n,
                  http:\/\/${req.headers.host}\/api\/confirmation\/${mytoken.token}`,

        //http:localhost:8000/api/confirmation/3457777
        
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
  