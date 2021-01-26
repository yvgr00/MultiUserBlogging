const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');





exports.signup = (req,res) => {
    console.log("venu");
    
    User.findOne({email: req.body.email}).exec((err,user) => {
        if(user){
           return res.status(400).json({
               error: "Email is taken"
           })
        }

        const {name,email,password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({name,email,password,profile,username});
        newUser.save((err,Success) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            
            // return res.json({
            //     user:Success
            // });
            return res.json({
                message: "Signup success! please signin"
            });
        })
    })


}

exports.signin = (req,res) => {

    const {email, password} = req.body;

    User.findOne({email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "email does not exist, please signup"
            });
        }

       if(!user.authenticate(password)){
        return res.status(400).json({
            error: "email and password do not match"
        });
       }
      
       const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: '1d'});

       res.cookie('token',token, {expiresIn: '1d'});

       const {_id, username, name, email, role} = user;

       return res.json({
           token,
           user: {_id, username, name, email, role}
       });

    })
}


exports.signout = (req,res) => {

    res.clearCookie('token');
    res.json({
        message: "signout successful"
    });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  })

  exports.authMiddleware = (req,res,next) => {
      const authUserId = req.auth._id;
      User.findById({_id:authUserId}).exec((err,user) => {
          if(err || !user){
              return res.status(400).json({
                  error:'User not found'
              })
          }
          req.profile = user;
          next();
      })
  }

  exports.adminMiddleware = (req,res,next) => {
    const adminUserId = req.auth._id;
    User.findById({_id:adminUserId}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:'User not found'
            });
        }
        
        if(user.role !== 1){
            return res.status(400).json({
                error:'Admin resource. Access denied'
        });
    }
        req.profile = user;
        next();
    })

  }