const {Router} = require('express');

const routesController = require('../controllers/routesController');
const { requireAuth } = require('../middlerware.js/authMiddleware');
const router = Router();
//home page routing
router.get('/',routesController.home_page_get)
router.get('/smoothies',requireAuth,routesController.smoothies_page_get)
module.exports=router;