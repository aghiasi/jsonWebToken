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
const Url='mongodb+srv://Authpassword:Authpassword@cluster0.1uw84.mongodb.net/auth-db?retryWrites=true&w=majority'
mongoose.connect(Url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then((result) => {
 app.listen(3000)
}).catch(err => {
  console.log(err)
})

// routes
app.use(routes);
app.use(authRoutes);

