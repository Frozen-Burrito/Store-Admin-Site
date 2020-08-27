const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    amountInStock: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Item', ItemSchema);