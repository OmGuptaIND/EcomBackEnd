const express = require('express');
const { signup, signin } = require('../controller/auth');
const { requiresignin } = require('../Middlewares/auth');
const User = require('../models/user');
const { isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../Validators/auth');
const router = express.Router();

router.post('/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/signup', validateSignUpRequest, isRequestValidated, signup);


router.post('/profile', requiresignin, (req,res)=>{
    User.findById(req.user._id).exec((err, _user)=>{
        if(err){
            res.status(400).json({
                error:err,
            })
        }else{
            res.status(200).json({
                user:_user,
            })
        }
    })
});

module.exports = router;