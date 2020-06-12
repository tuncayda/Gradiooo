const Color = require('./../models/colorModel');

// Handlers
exports.getAllColors = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Color route is not yet defined'
    });
};

exports.getColor = (req, res) => {
};

exports.createColor = async (req, res) => {
    try {
        const newColor = await Color.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: {
                color: newColor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

exports.updateColor = (req, res) => {
};

exports.deleteColor = (req, res) => {
};