/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * System Schema
 */
var OSSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    arch: {
        type: String,
        default: '',
        trim: true
    },
    logo: {
        type: String,
        default: '',
        trim: true
    },
    website: {
        type: String,
        default: '',
        trim: true
    },
    author: {
        type: String,
        default: '',
        trim: true
    },
    version: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
OSSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
// OSSchema.statics = {
//     load: function(id, cb) {
//         this.findOne({
//             _id: id
//         }).populate('user', 'name username').exec(cb);
//     }
// };

mongoose.model('OS', OSSchema);