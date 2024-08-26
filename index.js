require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const path = require('path');
const Order = require('./models/order'); // Import the Order model

const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
const orderRoutes = require('./routes/orders.js');
app.use('/api/orders', orderRoutes);

// Custom delete route (optional, if not included in orders.js)
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Serve static files from the 'publicdata' directory
app.use(express.static(path.join(__dirname, 'publicdata')));

// Default route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicdata', 'index.html'));
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log('Routes configured:', app._router.stack.filter(r => r.route).map(r => r.route.path));
});
