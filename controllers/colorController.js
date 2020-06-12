const Color = require('./../models/colorModel');

// Handlers
exports.getAllColors = async (req, res) => {
    try {
        const colors = await Color.find();
        res.status(200).json({
            status: 'success',
            data: {
                colors
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

exports.getColor = async (req, res) => {
    try {
        const color = await Color.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                color
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
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

exports.updateColor = async (req, res) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'Success',
            data: {
                color
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

exports.deleteColor = async (req, res) => {
    try {
        await Color.findByIdAndDelete(req.params.id);
        res.send(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};