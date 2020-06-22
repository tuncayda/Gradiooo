const Color = require('../models/colorModel');

exports.getColors = async (req, res) => {
    // Get colors data
    const colors = await Color.find();

    // Build template
    

    // Render that template using colors data
    res.status(200).render('colors', {
        colors
    });
}