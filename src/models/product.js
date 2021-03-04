const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    userName:{type:String, required:true, trim:true},
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
    },
    remarks:{
        type:String,
        trim: true,
        max:1000,
    },
    productPictures:[
        {img :{
                type:String
            }
        }
    ],
    category:{type: mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    categoryName:{type: String, required:true, trim:true},
    updateAt:Date,
}, {timestamps: true} );

module.exports = mongoose.model("Product", productSchema);