const User = require('../models/User');
const jwt = require('jsonwebtoken');
//error handler
const handleError =(err) => {
  let errors = {email:'',password:''};
  // incoreect email 
  if(err.message.includes('incorrect email')){
    errors.email = 'email or password is not corect'
    return errors;
  }
  // incorect password
  if(err.message.includes('incorrect password')){
    errors.email = 'email or password is not corect'
    return errors;
  }
  //duplicate error code 
  if(err.code === 11000 ){
    errors.email='email allready exist';
    return errors;
  }
  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path]=properties.message
    })
    return errors;
  }

}
// token midleware
const maxAge=3*24*60*60;

const createToken = (id) => {
  return jwt.sign({id},'some secret so secret',{
    expiresIn:maxAge
  })
}
//get requests
module.exports.singup_get =(req,res) => {
  res.render('signup')
}
module.exports.login_get =(req,res) => {
  res.render('login')
}
//post requests
module.exports.singup_post = async (req,res) => {
  const {email, password} = req.body;
  try{
   const user=await User.create({email, password});
   const token =createToken(user._id);
   res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
   res.status(201).json({user:user._id});

  }catch(err){
    const errors = handleError(err)
    res.status(400).json({errors})


  }
}
module.exports.login_post =async(req,res) => {
  const {email,password} = req.body;
  try{
    const user = await User.login(email, password);
    const token =createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
    res.status(200).json({ user: user._id });
  }catch(err){
    const errors = handleError(err)

    res.status(400).json({errors})
  }

}
module.exports.logout_get= (req,res) => {
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
}