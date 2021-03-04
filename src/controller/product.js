const { default: slugify } = require('slugify');
const Product = require('../models/product');

exports.createProducts = (req, res)=>{
        
    const {
        name, price, remarks, category,categoryName
    } = req.body;

    let productPictures = [];
    if(req.files.length>0){
        productPictures = req.files.map(file => {
            return {img: file.filename}
        });
    }

    const product = new Product({
        userName: req.user.userName,
        createdBy: req.user._id,
        category,
        categoryName,
        name:name,
        slug: slugify(req.body.name),
        price,
        remarks,
        productPictures,
    });

    product.save((err, product) => {
        if(err){
            res.status(400).json(err);
        }
        if(product){
            res.status(400).json({product});
        }
    })

};



exports.getProducts = (req, res)=>{
    res.status(200).json({
        msg:"Working",
    })
}