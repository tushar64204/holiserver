require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const formSubmissionRoutes = require('./routes/formSubmissions.js');

const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/submit', formSubmissionRoutes);

app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log('Routes configured:', app._router.stack.filter(r => r.route).map(r => r.route.path));
});
