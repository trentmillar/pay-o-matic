/*!
 * Module dependencies.
 */

var util = require('util'),
    payomatic = require('../'),
	super_ = require('../core/type');

var mapping = [


];

/**
 * customer Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Customer(options) {

    Customer.super_.call(this, options);


    Object.defineProperty(this, 'id', {
        get: function () { return this.get('id') || this.set('id', options.id) }
        , set: function (value) { this.set('id', value) }
    })

  Object.defineProperty(this, 'email', {
      get: function () { return this.get('email') || this.set('email', options.email) }
      , set: function (value) { this.set('email', value) }
  })

	Object.defineProperty(this, 'description', {
	    get: function () { return this.get('description') || this.set('description', options.description) }
        , set: function (value) { this.set('description', value) }
	})

	Object.defineProperty(this, 'created', {
	    get: function () { return this.get('created') || this.set('created', options.created) }
        , set: function (value) { this.set('created', value) }
	})

	Object.defineProperty(this, 'currency', {
	    get: function () { return this.get('currency') || this.set('currency', options.currency) }
        , set: function (value) { this.set('currency', value) }
	})

	Object.defineProperty(this, 'default_card', {
	    get: function () { return this.get('default_card') || this.set('default_card', options.default_card) }
        , set: function (value) { this.set('default_card', value) }
	})

	Object.defineProperty(this, 'delinquent', {
	    get: function () { return this.get('delinquent') || this.set('delinquent', options.delinquent) }
        , set: function (value) { this.set('delinquent', value) }
	})

	Object.defineProperty(this, 'metadata', {
	    get: function () { return this.get('metadata') || this.set('metadata', options.metadata) }
        , set: function (value) { this.set('metadata', value) }
	})

    // Stripe returns 'id' to identify the customer after it is successfully created


    /**
     * returns the brand specific request object
     *
     * @api public
     */
	this.toRequest = function () {

	    var req = {};

	    switch (this.brand) {
	        case 'stripe':
	            req.account_balance = this.accountBalance;
	            break;
	        case 'none':
	            break;
	        default:
	            throw new Error('Types must have a brand defined');
	    }

	    return req;
	};


	return this;
}



/*!
 * Inherit from type
 */

util.inherits(Customer, super_);


/*!
 * Export class
 */

exports = module.exports = Customer;
