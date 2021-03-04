const express = require('express');
const { createProducts, getProducts } = require('../controller/product');
const { requiresignin } = require('../Middlewares/auth');
const multer = require("multer");
const router = express.Router();
const shortId = require("shortid");
const path = require('path');


//Destination to Upload for now
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + "-" + file.originalname)
    }
  })
const upload = multer({storage});


router.post('/product/create', requiresignin, upload.array("productPicture"), createProducts);
router.get('/product/getProduct', requiresignin, getProducts);


module.exports = router;