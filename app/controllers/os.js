/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    OS = mongoose.model('OS'),
    _ = require('underscore');


/**
 * Find os by id
 */
exports.os = function(req, res, next, id) {
    OS.load(id, function(err, system) {
        if (err) return next(err);
        if (!system) return next(new Error('Failed to load os ' + id));
        req.system = system;
        next();
    });
};

/**
 * Create a os
 */
exports.create = function(req, res) {
    var os = new OS(req.body);
    os.user = req.user;

    os.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                os: os
            });
        } else {
            res.jsonp(os);
        }
    });
};

/**
 * Update a os
 */
exports.update = function(req, res) {
    var os = req.os;

    os = _.extend(os, req.body);

    os.save(function(err) {
        res.jsonp(os);
    });
};

/**
 * Delete an os
 * TODO: Only admins?
 */
exports.destroy = function(req, res) {
    var os = req.os;

    os.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(os);
        }
    });
};

/**
 * Show an os
 */
exports.show = function(req, res) {
    res.jsonp(req.os);
};

/**
 * List of Systems
 */
exports.all = function(req, res) {
//    OS.find().sort('-created').populate('user', 'name username').exec(function(err, oss) {
    OS.find().sort('-created').exec(function(err, oss) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(oss);
        }
    });
};
