const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
const Employee = require('../models/EmployeeModel');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role === 'Employee') {
            req.user = await Employee.findByPk(decoded.id);
        } else {
            req.user = await SuperAdmin.findByPk(decoded.id);
        }

        if (!req.user) {
            return res.status(401).json({ success: false, error: 'User no longer exists' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: `User role ${req.user.role} is not authorized` });
        }
        next();
    };
};

exports.trialCheck = (req, res, next) => {
    // Only Managers have trials to check
    if (req.user && req.user.role === 'Manager') {
        const trialEndDate = req.user.trial_end_date;
        if (trialEndDate && new Date(trialEndDate) < new Date()) {
            return res.status(403).json({ 
                success: false, 
                error: 'Your 15-day trial has expired. Please upgrade your plan to restore full access to manager features.',
                trial_expired: true 
            });
        }
    }
    next();
};
