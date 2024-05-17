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
