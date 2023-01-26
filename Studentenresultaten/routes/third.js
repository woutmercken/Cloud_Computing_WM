const express = require('express');
const router = express.Router();

const thirdController = require('../controllers/thirdController');

router.get('/', thirdController.index);

router.post('/', thirdController.changeScore);

module.exports = router;
