const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qty: { type: Number, default: 1 }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;