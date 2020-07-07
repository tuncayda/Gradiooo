const Color = require('../models/colorModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getColors = async (req, res) => {
    try {
        // Execute query
        const features = new APIFeatures(Color.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate(req.query.limit, req.query.page);
        const colors = await features.query;

        if(req.query.limit || req.query.page) {
            // let numberOfColors = await Color.estimatedDocumentCount();
            res.status(200).json({
                colors,
                // numberOfColors
            })
        } else {
            res.status(200).render('colors', {
                colors
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}