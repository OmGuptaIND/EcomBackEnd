const express = require('express');
const { addCategory, getCategories } = require('../controller/category');
const { requiresignin } = require('../Middlewares/auth');
const router = express.Router();

router.post('/category/create',  requiresignin, addCategory);
router.get('/category/getCategories', requiresignin, getCategories);


module.exports = router;