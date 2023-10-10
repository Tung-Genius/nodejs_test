
const Category = require('../models/categoryModel');

const getCategories = async ( req, res ) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success: true,
            message: "Get all categories success",
            categories: categories
        });
        return;
    } catch (error) {
        res.status(500).send('Error');
    }
}

const createCategory = async ( req, res ) => {
    try {
         const category = new Category(req.body);
         category.save();
         res.status(200).json({
            success: true,
            message: "Create Category success"
         });
         return;
    } catch (error) {
        res.status(500).send('Error');
    }
}

module.exports = { getCategories, createCategory};