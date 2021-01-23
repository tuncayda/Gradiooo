const express = require('express');
const colorController = require('./../controllers/colorController');

// Router obj
const router = express.Router();

// Router with parameter
router.param('id', (req, res, next, val) => {
    next();
});

// Endpoint for fetching all colors on initial page load
router
    .route('/')
    .get(colorController.getAllColors)
    // .get(authController.protect, colorController.getAllColors)
    .post(colorController.createColor);

// Endpoint for fetching a specific color
router
    .route('/:id')
    .get(colorController.getColor)
    .patch(colorController.updateColor)
    .delete(
        authController.protect, 
        authController.restrictTo('admin'), 
        colorController.deleteColor);

// Endpoint to count the likes for a specific color
router
    .route('/like')
    .post(colorController.likeColor);

module.exports = router;