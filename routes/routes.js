const {Router} = require('express');
const routesController = require('../controllers/routesController')
const router = Router();
//home page routing
router.get('/',routesController.home_page_get)
router.get('/smoothies',routesController.smoothies_page_get)
module.exports=router;