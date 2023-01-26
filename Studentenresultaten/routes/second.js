const express = require('express');
const router = express.Router();

const secondController = require('../controllers/secondController');

router.get('/', secondController.index);


router.post('/', secondController.findStudent);

module.exports = router;