const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    table: { type: String, required: true },
    contactNumber: { type: String, required: true, match: /^\d{10}$/ },
    order: { type: String, required: true },
    total: { type: Number, required: true },
    deliveryCost: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    orderNumber: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Delivered', 'Running', 'Not Acceptable'], default: 'Running' }
}, { collection: 'thaliorder' }); // Specify the collection name

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
