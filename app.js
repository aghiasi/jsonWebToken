//imports
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes')
//constants
const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');
// database connection
// routes
app.use(routes);
app.use(authRoutes);

app.listen(3000)