const express = require('express');
const colorController = require('./../controllers/colorController');
const authController = require('./../controllers/authController');

// Routes
const router = express.Router();

// Router with parameter
router.param('id', (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    next();
});

router
    .route('/')
    .get(authController.protect, colorController.getAllColors)
    .post(colorController.createColor);

router
    .route('/:id')
    .get(colorController.getColor)
    .patch(colorController.updateColor)
    .delete(colorController.deleteColor);

module.exports = router;