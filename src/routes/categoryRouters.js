const express = require('express');

const categoryController = require('../app/controllers/categoryController');

const router = express.Router();

//get
router.get('/getAllcategories', categoryController.getCategories);

//post
router.post('/create', categoryController.createCategory);

module.exports = router;