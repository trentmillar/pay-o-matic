/*!
 * Module dependencies.
 */

var util = require('util'),
    payomatic = require('../'),
	super_ = require('../core/type');


var mapping = {
    "stripe": {
        "id": "id",
        "cardNumber": "number",
        "expiryMonth": "exp_month",
        "expiryYear": "exp_year",
        "cvc": "cvc",
        "cardholderName": "name",
        "addressLine1": "address_line1",
        "addressLine2": "address_line2",
        "city": "address_city",
        "state": "address_state",
        "zipCode": "address_zip",
        "country": "address_country"
    }
};

/**
 * card Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Card(options, brand) {

	Card.super_.call(this, options);

	if (brand && typeof brand === 'string' && brand.length > 0) {
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

	Object.defineProperty(this, 'cardNumber', {
	    get: function () {
	        if (this.get('cardNumber')) {
	            return this.get('cardNumber');
	        }
	        else {
	            this.set('cardNumber', this._options[mapping[this.brand].cardNumber] || this._options.cardNumber);
	            return this.get('cardNumber');
	        }
	    }
        , set: function (value) { this.set('cardNumber', value) }
	})

	Object.defineProperty(this, 'expiryMonth', {
	    get: function () {
	        if (this.get('expiryMonth')) {
	            return this.get('expiryMonth');
	        }
	        else {
	            this.set('expiryMonth', this._options[mapping[this.brand].expiryMonth] || this._options.expiryMonth);
	            return this.get('expiryMonth');
	        }
	    }
        , set: function (value) { this.set('expiryMonth', value) }
	})

    // 2 or 4 digit
	Object.defineProperty(this, 'expiryYear', {
	    get: function () {
	        if (this.get('expiryYear')) {
	            return this.get('expiryYear');
	        }
	        else {
	            this.set('expiryYear', this._options[mapping[this.brand].expiryYear] || this._options.expiryYear);
	            return this.get('expiryYear');
	        }
	    }
        , set: function (value) { this.set('expiryYear', value) }
	})

	Object.defineProperty(this, 'cvc', {
	    get: function () {
	        if (this.get('cvc')) {
	            return this.get('cvc');
	        }
	        else {
	            this.set('cvc', this._options[mapping[this.brand].cvc] || this._options.cvc);
	            return this.get('cvc');
	        }
	    }
        , set: function (value) { this.set('cvc', value) }
	})

	Object.defineProperty(this, 'cardholderName', {
	    get: function () {
	        if (this.get('cardholderName')) {
	            return this.get('cardholderName');
	        }
	        else {
	            this.set('cardholderName', this._options[mapping[this.brand].cardholderName] || this._options.cardholderName);
	            return this.get('cardholderName');
	        }
	    }
        , set: function (value) { this.set('cardholderName', value) }
	})

	Object.defineProperty(this, 'addressLine1', {
	    get: function () {
	        if (this.get('addressLine1')) {
	            return this.get('addressLine1');
	        }
	        else {
	            this.set('addressLine1', this._options[mapping[this.brand].addressLine1] || this._options.addressLine1);
	            return this.get('addressLine1');
	        }
	    }
        , set: function (value) { this.set('addressLine1', value) }
	})

	Object.defineProperty(this, 'addressLine2', {
	    get: function () {
	        if (this.get('addressLine2')) {
	            return this.get('addressLine2');
	        }
	        else {
	            this.set('addressLine2', this._options[mapping[this.brand].addressLine2] || this._options.addressLine2);
	            return this.get('addressLine2');
	        }
	    }
        , set: function (value) { this.set('addressLine2', value) }
	})

	Object.defineProperty(this, 'zipCode', {
	    get: function () {
	        if (this.get('zipCode')) {
	            return this.get('zipCode');
	        }
	        else {
	            this.set('zipCode', this._options[mapping[this.brand].zipCode] || this._options.zipCode);
	            return this.get('zipCode');
	        }
	    }
        , set: function (value) { this.set('zipCode', value) }
	})

	Object.defineProperty(this, 'city', {
	    get: function () {
	        if (this.get('city')) {
	            return this.get('city');
	        }
	        else {
	            this.set('city', this._options[mapping[this.brand].city] || this._options.city);
	            return this.get('city');
	        }
	    }
        , set: function (value) { this.set('city', value) }
	})

	Object.defineProperty(this, 'state', {
	    get: function () {
	        if (this.get('state')) {
	            return this.get('state');
	        }
	        else {
	            this.set('state', this._options[mapping[this.brand].state] || this._options.state);
	            return this.get('state');
	        }
	    }
        , set: function (value) { this.set('state', value) }
	})

	Object.defineProperty(this, 'country', {
	    get: function () {
	        if (this.get('country')) {
	            return this.get('country');
	        }
	        else {
	            this.set('country', this._options[mapping[this.brand].country] || this._options.country);
	            return this.get('country');
	        }
	    }
        , set: function (value) { this.set('country', value) }
	})

    
    /**
     * returns the brand specific request object
     *
     * @api public
     */
	this.toRequest = function () {

	    var req = {};

	    switch (this.brand) {
	        case 'stripe':
	            req.card = {};
	            req.card.number = this.cardNumber;
	            req.card.exp_month = this.expiryMonth;
	            req.card.exp_year = this.expiryYear;
	            if (this.cvc) req.card.cvc = this.cvc;
	            if (this.cardholderName) req.card.name = this.cardholderName;
	            if (this.addressLine1) req.card.address_line1 = this.addressLine1;
	            if (this.addressLine2) req.card.address_line2 = this.addressLine2;
	            if (this.city) req.card.address_city = this.city;
	            if (this.state) req.card.address_state = this.state;
	            if (this.country) req.card.address_country = this.country;
	            if (this.zipCode) req.card.address_zip = this.zipCode;
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

util.inherits(Card, super_);


/*!
 * Export class
 */

exports = module.exports = Card;
