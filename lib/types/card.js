/*!
 * Module dependencies.
 */

var util = require('util'),
    payomatic = require('../'),
	super_ = require('../core/type');

/**
 * card Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Card(options) {

	Card.super_.call(this, options);
    

	Object.defineProperty(this, 'id', {
	    get: function () { return this.get('id') || this.set('id', options.email) }
        , set: function (value) { this.set('id', value) }
	})

	Object.defineProperty(this, 'number', {
	    get: function () { return this.get('number') || this.set('number', options.email) }
        , set: function (value) { this.set('number', value) }
	})

	Object.defineProperty(this, 'exp_month', {
	    get: function () { return this.get('exp_month') || this.set('exp_month', options.email) }
        , set: function (value) { this.set('exp_month', value) }
	})

    // 2 or 4 digit
	Object.defineProperty(this, 'exp_year', {
	    get: function () { return this.get('exp_year') || this.set('exp_year', options.email) }
        , set: function (value) { this.set('exp_year', value) }
	})

	Object.defineProperty(this, 'cvc', {
	    get: function () { return this.get('cvc') || this.set('cvc', options.email) }
        , set: function (value) { this.set('cvc', value) }
	})

	Object.defineProperty(this, 'name', {
	    get: function () { return this.get('name') || this.set('name', options.email) }
        , set: function (value) { this.set('name', value) }
	})

	Object.defineProperty(this, 'address_line1', {
	    get: function () { return this.get('address_line1') || this.set('address_line1', options.email) }
        , set: function (value) { this.set('address_line1', value) }
	})

	Object.defineProperty(this, 'address_line2', {
	    get: function () { return this.get('address_line2') || this.set('address_line2', options.email) }
        , set: function (value) { this.set('address_line2', value) }
	})

	Object.defineProperty(this, 'address_city', {
	    get: function () { return this.get('address_city') || this.set('address_city', options.email) }
        , set: function (value) { this.set('address_city', value) }
	})

	Object.defineProperty(this, 'address_zip', {
	    get: function () { return this.get('address_zip') || this.set('address_zip', options.email) }
        , set: function (value) { this.set('address_zip', value) }
	})

	Object.defineProperty(this, 'address_state', {
	    get: function () { return this.get('address_state') || this.set('address_state', options.email) }
        , set: function (value) { this.set('address_state', value) }
	})

	Object.defineProperty(this, 'address_country', {
	    get: function () { return this.get('address_country') || this.set('address_country', options.email) }
        , set: function (value) { this.set('address_country', value) }
	})

    // Stripe returns 'id' to identify the customer after it is successfully created
	

	return this;
}

/*!
 * Inherit from type
 */

util.inherits(Card, super_);


/*!
 * Export class
 */

exports = module.exports = Card;
