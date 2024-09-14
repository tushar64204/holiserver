const router = require('express').Router();
const { Order } = require('../models/order');
const Joi = require('joi');
const mongoose = require('mongoose');

// POST route to handle order submissions
router.post('/', async (req, res) => {
    try {
        const { error } = validateOrder(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const newOrder = new Order({ ...req.body });

        await newOrder.save();
        res.status(201).send({ message: 'Order submitted successfully' });
    } catch (error) {
        console.error('Error submitting order:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// GET route to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// DELETE route to delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const result = await Order.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

// PUT route to update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const { error } = validateOrderUpdate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedOrder) return res.status(404).send({ message: 'Order not found' });

        res.status(200).send({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Function to validate incoming order data
const validateOrder = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        table: Joi.string().required().label('Table Number'),
        contactNumber: Joi.string().pattern(/^\d{10}$/).required().label('Contact Number'),
        order: Joi.string().required().label('Order Details'),
        total: Joi.number().required().label('Total Amount'),
        deliveryCost: Joi.number().required().label('Delivery Cost'),
        grandTotal: Joi.number().required().label('Grand Total'),
        paymentMethod: Joi.string().valid('Cash', 'Card', 'UPI').required().label('Payment Method'),
        orderNumber: Joi.string().required().label('Order Number'),
        date: Joi.string().required().label('Date'),
        time: Joi.string().required().label('Time'),
        status: Joi.string().valid('Delivered', 'Running', 'Not Acceptable').label('Status')
    });
    return schema.validate(data);
};

// Function to validate order updates
const validateOrderUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string().label('Name'),
        table: Joi.string().label('Table Number'),
        contactNumber: Joi.string().pattern(/^\d{10}$/).label('Contact Number'),
        order: Joi.string().label('Order Details'),
        total: Joi.number().label('Total Amount'),
        deliveryCost: Joi.number().label('Delivery Cost'),
        grandTotal: Joi.number().label('Grand Total'),
        paymentMethod: Joi.string().valid('Cash', 'Card', 'UPI').label('Payment Method'),
        orderNumber: Joi.string().label('Order Number'),
        date: Joi.string().label('Date'),
        time: Joi.string().label('Time'),
        status: Joi.string().valid('Delivered', 'Running', 'Not Acceptable').label('Status')
    });
    return schema.validate(data);
};

module.exports = router;
