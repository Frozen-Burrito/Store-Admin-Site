const Category = require('../Models/Category');

const getAllCategories = async ( req, res ) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve categories from database',
        });
    }
}

const getCategoryById = async ( req, res ) => {
    
    try {
        const category = await Category.find({ _id: req.params.id });
        
        return res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve category from database',
        });
    }
}

const addNewCategory = async ( req, res ) => {

    try {
        const createdCategory = await Category.create(req.body);

        return res.status(200).json({
            success: true,
            data: createdCategory,
        });

    } catch (error) {
        if (error.name === 'Validation Error') {
            const messages = Object.values(error.errors).map(value => value.message);

            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Error creating new category', 
            });
        }
    }
}

const deleteCategory = async ( req, res ) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'No category found with this id',
            });
        }

        await category.remove();

        return res.status(200).json({
            success: true,
            data: 'Category deleted',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addNewCategory,
    deleteCategory,
}