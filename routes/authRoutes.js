const {Router} = require('express');
const authController = require('../controllers/authController')
const router = Router();
//auth routes
router.get('/singup',authController.singup_get);
router.post('/singup',authController.singup_post);
router.get('/login',authController.login_get);
router.get('/logout',authController.logout_get);
router.post('/login',authController.login_post);
module.exports =router;