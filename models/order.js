const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    table: { type: Number, required: true },
    order: { type: String, required: true },
    total: { type: Number, required: true },
    gst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    orderNumber: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Delivered', 'Running', 'Not Acceptable'], default: 'Running' }
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
