const router = require('express').Router();
const cityController = require('../controllers/city.controller');

router.get('/', cityController.getAllCities);
router.get('/:id', cityController.cityInfo);
router.post('/add', cityController.addCity);


module.exports = router;