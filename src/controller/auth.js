const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req,res)=>{
    User.findOne({ email: req.body.email }).exec((err, user)=>{
        if(user){
            return res.status(400).json({
                message:"User Exists"
            });
        }
    });

    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    const __user = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString(),
    });

    __user.save((err, data)=>{
        if(err){
            return res.status(400).json({
                message:err,
            })
        }
        if(data){
            return res.status(201).json({
                message: "User Created Successfully!" ,
            })
        }
    });
}

exports.signin = (req, res)=>{
    User.findOne({email: req.body.email})
    .exec((err, user)=>{
        if(err || !user){return res.status(400).json({message:"NO USER FOUND"});}
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, account_type: user.account_type, userName:user.fullName}, process.env.JWT_KEY, {expiresIn:"2d"});
                const {_id, firstName, lastName, email, password, account_type, fullName} = user;
                res.status(200).json({
                    token,
                    user:{
                        _id, firstName, lastName, email, password, account_type, fullName
                    }
                })
                
            }else{
                return res.status(400).json({
                    message:"Invalid Password!"
                });
            }
        }else{
            return res.status(400).json({
                message:"Something Went Wrong..."
            })
        }
    });
}
