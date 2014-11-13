var _ = require('underscore'),
	utils = require('./utils'),
	payomatic = require('../');


/**
 * Processor Class
 *
 * @param {String} brand
 * @param {Object} options
 * @api public
 */

function Processor(brand, options) {
    if (!(this instanceof Processor)) return new Processor(brand, options);

	this.options = utils.options({
		brand: brand
	}, options);

	this.brand = brand;
	this.methods = {};

	this.mappings = {
		name: null,
		createdBy: null,
		createdOn: null,
		modifiedBy: null,
		modifiedOn: null
	};

	// set mappings
	_.each(this.options.map, function(val, key) { this.map(key, val); }, this);

	Object.defineProperty(this, 'brand', {
	    get: function () {
	        return this.get('brand') || this.set('brand', brand);
	    }
	});


}

/**
 * Sets processor options
 *
 * ####Example:
 *
 *     proc.set('test', value) // sets the 'test' option to `value`
 *
 * @param {String} key
 * @param {String} value
 * @api public
 */

Processor.prototype.set = function(key, value) {
	if (arguments.length === 1) {
		return this.options[key];
	}
	this.options[key] = value;
	return value;
};


/**
 * Gets processor options
 *
 * ####Example:
 *
 *     proc.get('test') // returns the 'test' value
 *
 * @param {String} key
 * @method get
 * @api public
 */

Processor.prototype.get = Processor.prototype.set;


/**
 * Maps a built-in field (e.g. name) to a specific path
 *
 * @api public
 */

Processor.prototype.map = function(field, path) {
	if (path) {
		this.mappings[field] = path;
	}
	return this.mappings[field];
};


/**
 * Adds an instance method to processors.
 *
 * @param {String|Object} method name
 * @param {Function} [fn]
 * @api public
 */

Processor.prototype.method = function (name, fn) {
    if ('string' != typeof name)
        for (var i in name)
            this.methods[i] = name[i];
    else
        this.methods[name] = fn;
    return this;
};


/**
 * Registers the Processor with Pay-O-Matic
 *
 * @api public
 */

Processor.prototype.register = function () {

    // apply methods
    for (var i in this.methods)
        this.__proto__[i] = this.methods[i];

    require('../').processor(this);

    return this;
};




/*!
 * Export class
 */

exports = module.exports = Processor;
