/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    System = mongoose.model('System'),
    _ = require('underscore');


/**
 * Find system by id
 */
exports.system = function(req, res, next, id) {
    System.load(id, function(err, system) {
        if (err) return next(err);
        if (!system) return next(new Error('Failed to load system ' + id));
        req.system = system;
        next();
    });
};

/**
 * Create a system
 */
exports.create = function(req, res) {
    var system = new System(req.body);
    system.user = req.user;

    system.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                system: system
            });
        } else {
            res.jsonp(system);
        }
    });
};

/**
 * Update a system
 */
exports.update = function(req, res) {
    var system = req.system;

    system = _.extend(system, req.body);

    system.save(function(err) {
        res.jsonp(system);
    });
};

/**
 * Delete an system
 * TODO: Only admins?
 */
exports.destroy = function(req, res) {
    var system = req.system;

    system.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(system);
        }
    });
};

/**
 * Show an system
 */
exports.show = function(req, res) {
    res.jsonp(req.system);
};

/**
 * List of Systems
 */
exports.all = function(req, res) {
    System.find().sort('-created').populate('user', 'name username').exec(function(err, systems) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(systems);
        }
    });
};
