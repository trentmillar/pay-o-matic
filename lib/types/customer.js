/*!
 * Module dependencies.
 */

var util = require('util'),
    payomatic = require('../'),
	super_ = require('../core/type');

var mapping = {
    "stripe": {
        "id": "id",
        "accountBalance": "account_balance",
        "coupon": "coupon",
        "description": "description",
        "email": "email",
        "plan": "plan",
        "quantity": "quantity",
        "trialEnd": "trialEnd"
    }
};

/**
 * customer Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Customer(options, brand) {

    Customer.super_.call(this, options);

	if(brand && typeof brand === 'string' && brand.length > 0){
		this.brand = brand;
	}

	Object.defineProperty(this, 'id', {
	    get: function () {
	        if (this.get('id')) {
	            return this.get('id');
	        }
	        else {
	            this.set('id', this._options[mapping[this.brand].id] || this._options.id);
	            return this.get('id');
	        }
	    }
        , set: function (value) { this.set('id', value) }
	})

	Object.defineProperty(this, 'description', {
	    get: function () {
	        if (this.get('description')) {
	            return this.get('description');
	        }
	        else {
	            this.set('description', this._options[mapping[this.brand].description] || this._options.description);
	            return this.get('description');
	        }
	    }
        , set: function (value) { this.set('description', value) }
	})

	Object.defineProperty(this, 'email', {
	    get: function () {
	        if (this.get('email')) {
	            return this.get('email');
	        }
	        else {
	            this.set('email', this._options[mapping[this.brand].email] || this._options.email);
	            return this.get('email');
	        }
	    }
        , set: function (value) { this.set('email', value) }
	})

	Object.defineProperty(this, 'accountBalance', {
	    get: function () {
	        if (this.get('accountBalance')) {
	            return this.get('accountBalance');
	        }
	        else {
	            this.set('accountBalance', this._options[mapping[this.brand].accountBalance] || this._options.accountBalance);
	            return this.get('accountBalance');
	        }
	    }
        , set: function (value) { this.set('accountBalance', value) }
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
	            if (this.accountBalance) req.account_balance = this.accountBalance;
	            if (this.coupon) req.coupon = this.coupon;
	            if (this.description) req.description = this.description;
	            if (this.email) req.email = this.email;
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
