const Color = require('./../models/colorModel');
const { query } = require('express');

// Handlers
exports.getAllColors = async (req, res) => {
    try {
        // Build query for filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Filter
        let query = Color.find(JSON.parse(queryStr));

        // Sorting
        if(req.query.sort) {
            query = query.sort(req.query.sort);
        } else {
            // Default
            query = query.sort('-created');
        }

        // Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            // Default (exclude mongodbs _v variable)
            query = query.select('-__v');
        }

        // Pagination

        // Covert string to number
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        // Example: page=2&limit=10 means 1-10 on page 1, 11-20 on page 20 etc
        query = query.skip(skip).limit(limit);
        
        if (req.query.page) {
            const numColors = await Color.countDocuments();
            if (skip >= numColors) {
                throw new Error('This page does not exist');
            }
        }

        // Execute query
        const colors = await query;
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