const Item = require('../Models/Item');

const getAllItems = async ( req, res ) => {
    try {
        const items = await Item.find({});

        return res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve items from database',
        });
    }
}

const getItemById = async ( req, res ) => {
    try {
        const item = await Item.find({ _id: req.params.id });

        return res.status(200).json({
            success: true,
            data: item,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: 'Couldn\'t retrieve item from database',
        });
    }
}

const addNewItem = async ( req, res ) => {
    try {
        const createdItem = await Item.create(req.body);

        return res.status(200).json({
            success: true,
            data: createdItem,
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
                error: 'Error creating new item', 
            });
        }
    }
}

const deleteItem = async ( req, res ) => {

    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'No item found with this id',
            });
        }

        await item.remove();

        return res.status(200).json({
            success: true,
            data: 'Item deleted',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
}

module.exports = {
    getAllItems,
    getItemById,
    addNewItem,
    deleteItem,
}