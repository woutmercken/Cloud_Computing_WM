const express = require('express');
const router = express.Router();

const firstController = require('../controllers/firstController');

router.get('/', firstController.index);

router.post('/', firstController.findStudent);

module.exports = router;
