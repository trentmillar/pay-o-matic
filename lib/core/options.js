var _ = require('underscore');

function options() {
	
	var exports = {};

	/**
	 * This file contains methods specific to options.
	 * All exports are added to the payOmatic.prototype
	 */

	// Deprecated options that have been mapped to new keys
	var remappedOptions = {
		'i m depricated': 'i m new'
	};

	/**
	 * Sets pay-o-matic options
	 *
	 * ####Example:
	 *
	 *     payomatic.set('stripe api key', '123abc') // sets the 'stripe api key'
	 *
	 * @param {String} key
	 * @param {String} value
	 * @api public
	 */
	exports.set = function(key, value) {
	 	
		if (arguments.length === 1) {
			return this._options[key];
		}
		
		if (remappedOptions[key]) {
			if (this.get('logger')) {
				console.log('\nWarning: the `' + key + '` option has been deprecated. Please use `' + remappedOptions[key] + '` instead.\n\n' +
					'Support for `' + key + '` will be removed in a future version.');
			}
			key = remappedOptions[key];
		}
		
		// handle special settings
		switch (key) {
			case 'stripe api key':
				if (_.isString(value)) {
				}
			break;
		}
		
		this._options[key] = value;
		return this;
	};


	/**
	 * Sets multiple options.
	 *
	 * ####Example:
	 *
	 *     payomatic.set({test: value}) // sets the 'test' option to `value`
	 *
	 * @param {Object} options
	 * @api public
	 */

	exports.options = function(options) {
		if (!arguments.length)
			return this._options;
		if (utils.isObject(options)) {
			var keys = Object.keys(options),
				i = keys.length,
				k;
			while (i--) {
				k = keys[i];
				this.set(k, options[k]);
			}
		}
		return this._options;
	};


	/**
	 * Gets options
	 *
	 * ####Example:
	 *
	 *     payomatic.get('test') // returns the 'test' value
	 *
	 * @param {String} key
	 * @api public
	 */

	exports.get = exports.set;
	
	return exports;
	
}

module.exports = options;
