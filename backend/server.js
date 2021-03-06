const express = require('express');

const connectDB = require('../config/db');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/artists', require('./routes/api/artists'));
app.use('/api/labels', require('./routes/api/labels'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));