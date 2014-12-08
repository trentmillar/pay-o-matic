/*!
 * Module dependencies.
 */

var _ = require('underscore'),
    utils = require('./utils'),
	payomatic = require('../');


/**
 * Type Constructor
 * =================
 *
 * Extended by Type Classes, should not be used directly.
 *
 * @api public
 */

function Type(options) {

	// Set field properties and options

	this.type = this.constructor.name;
	this._options = utils.options(this.defaults, options || {});
	this.typeDescription = this.typeDescription || this.type;
	this.brand = this._options.brand || 'none';
    
}


exports = module.exports = Type;


_.extend(Type.prototype, require('./options')());


/**
 * Validates that a value for this field has been provided in a data object
 * Overridden by some fieldType Classes
 *
 * @api public
 */

Type.prototype.validateInput = function (data, required, item) {
	if (!required) return true;
	if (!(this.path in data) && item && item.get(this.path)) return true;
	if ('string' === typeof data[this.path]) {
		return (data[this.path].trim()) ? true : false;
	} else {
		return (data[this.path]) ? true : false;
	}
};

Type.prototype.clone = function(obj) {
	if(obj == null || typeof(obj) != 'object')
		return obj;

	var temp = {};//obj.constructor(); // changed

	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			temp[key] = this.clone(obj[key]);
		}
	}
	return temp;
};



