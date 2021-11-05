//imports
const express = require('express');
const { get } = require('mongoose');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middlerware.js/authMiddleware');
//constants
const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
// database connection
const Url='mongodb+srv://Authpassword:Authpassword@cluster0.1uw84.mongodb.net/auth-db?retryWrites=true&w=majority'
mongoose.connect(Url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then((result) => {
 app.listen(3000,() => {
   console.log('server is up')
 })
}).catch(err => {
  console.log(err)
})

// routes
app.get('*',checkUser);
app.use(routes);
app.use(authRoutes);