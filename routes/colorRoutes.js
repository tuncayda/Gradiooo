const express = require('express');
const colorController = require('./../controllers/colorController');

// Router obj
const router = express.Router();

router
    .route('/')
    .get(colorController.getAllColors);

router
    .route('/like')
    .post(colorController.likeColor);

module.exports = router;