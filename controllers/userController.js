const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

// Handlers
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
    
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

exports.updateMe = async (req, res, next) => {
    // Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        res.status(400).json({
            status: 'failed',
            message: 'This route is not for password updates. Please use updateMyPassword'
        });
    }

    // Filter out fields that should not be allowed to changed
    const filteredBody = filterObj(req.body, 'name', 'email');
    
    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { 
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'succesfull',
        data: {
            user: updatedUser
        }
    });
}

exports.deleteMe = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
}

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};