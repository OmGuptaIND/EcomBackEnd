const category = require('../models/category');
const { default: slugify } = require('slugify');


const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            createdAt:cate.createdAt,
            updatedAt:cate.updatedAt,
            children:createCategories(categories, cate._id),
        });
    }
    return categoryList;

}


exports.addCategory = (req,res)=>{

    category.findOne({slug: slugify(req.body.name)}).exec((err, item)=>{
        if(err){
            res.status(400).json(err);
        }
        if(item){
            res.status(400).json({
                message:"Category Exists...!"
            });
        }
    })

    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name),
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new category(categoryObj);
    cat.save((err, category) =>{
        if(err){
            res.status(400).json({
                message:err,
            });
        }
        if(category){
            res.status(200).json({category});
        }
    } )
}


exports.getCategories = (req,res)=>{

    category.find({})
    .exec((err, categories)=>{
        if(err){
            res.status(400).json(err);
        }
        if(categories){

            const categoryList = createCategories(categories);

            res.status(200).json({categoryList});
        }
    })
}