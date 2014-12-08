/*!
 * Module dependencies.
 */

var util = require('util'),
    payomatic = require('../'),
	super_ = require('../core/type');


var mapping = {
    "stripe": {
        "id": "id",
        "amount": "amount",
        "captured": "captured",
        "currencyCode": "currency",
        "paid": "paid",
        "refunded": "refunded",
        "refundedAmount": "amount_refunded",
        "cardId": "card",
        "customerId": "customer",
        "description": "description",
        "errorCode": "failure_code",
        "errorMessage": "failure_message"
    }
};

/**
 * Charge Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Charge(options, brand) {

	Charge.super_.call(this, options);

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

	Object.defineProperty(this, 'amount', {
	    get: function () {
	        if (this.get('amount')) {
	            return this.get('amount');
	        }
	        else {
	            this.set('amount', this._options[mapping[this.brand].amount] || this._options.amount);
	            return this.get('amount');
	        }
	    }
        , set: function (value) { this.set('amount', value) }
	})

	Object.defineProperty(this, 'captured', {
	    get: function () {
	        if (this.get('captured')) {
	            return this.get('captured');
	        }
	        else {
	            this.set('captured', this._options[mapping[this.brand].captured] || this._options.captured);
	            return this.get('captured');
	        }
	    }
        , set: function (value) { this.set('captured', value) }
	})

	Object.defineProperty(this, 'currencyCode', {
	    get: function () {
	        if (this.get('currencyCode')) {
	            return this.get('currencyCode');
	        }
	        else {
	            this.set('currencyCode', this._options[mapping[this.brand].currencyCode] || this._options.currencyCode);
	            return this.get('currencyCode');
	        }
	    }
        , set: function (value) { this.set('currencyCode', value) }
	})

	Object.defineProperty(this, 'paid', {
	    get: function () {
	        if (this.get('paid')) {
	            return this.get('paid');
	        }
	        else {
	            this.set('paid', this._options[mapping[this.brand].paid] || this._options.paid);
	            return this.get('paid');
	        }
	    }
        , set: function (value) { this.set('paid', value) }
	})

	Object.defineProperty(this, 'refunded', {
	    get: function () {
	        if (this.get('refunded')) {
	            return this.get('refunded');
	        }
	        else {
	            this.set('refunded', this._options[mapping[this.brand].refunded] || this._options.refunded);
	            return this.get('refunded');
	        }
	    }
        , set: function (value) { this.set('refunded', value) }
	})

	Object.defineProperty(this, 'refundedAmount', {
	    get: function () {
	        if (this.get('refundedAmount')) {
	            return this.get('refundedAmount');
	        }
	        else {
	            this.set('refundedAmount', this._options[mapping[this.brand].refundedAmount] || this._options.refundedAmount);
	            return this.get('refundedAmount');
	        }
	    }
        , set: function (value) { this.set('refundedAmount', value) }
	})

	Object.defineProperty(this, 'cardId', {
	    get: function () {
	        if (this.get('cardId')) {
	            return this.get('cardId');
	        }
	        else {
	            this.set('cardId', this._options[mapping[this.brand].cardId] || this._options.cardId);
	            return this.get('cardId');
	        }
	    }
        , set: function (value) { this.set('cardId', value) }
	})

	Object.defineProperty(this, 'customerId', {
	    get: function () {
	        if (this.get('customerId')) {
	            return this.get('customerId');
	        }
	        else {
	            this.set('customerId', this._options[mapping[this.brand].customerId] || this._options.customerId);
	            return this.get('customerId');
	        }
	    }
        , set: function (value) { this.set('customerId', value) }
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

	Object.defineProperty(this, 'errorCode', {
	    get: function () {
	        if (this.get('errorCode')) {
	            return this.get('errorCode');
	        }
	        else {
	            this.set('errorCode', this._options[mapping[this.brand].errorCode] || this._options.errorCode);
	            return this.get('errorCode');
	        }
	    }
        , set: function (value) { this.set('errorCode', value) }
	})

	Object.defineProperty(this, 'errorMessage', {
	    get: function () {
	        if (this.get('errorMessage')) {
	            return this.get('errorMessage');
	        }
	        else {
	            this.set('errorMessage', this._options[mapping[this.brand].errorMessage] || this._options.errorMessage);
	            return this.get('errorMessage');
	        }
	    }
        , set: function (value) { this.set('errorMessage', value) }
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
	            req.charge = {};
	            req.charge.amount = this.amount;
	            req.charge.currency = this.currencyCode;
				req.charge.card = this.cardId;
				req.charge.customer = this.customerId;
				//req.charge.customer = this.customerId;
	            if (this.description) req.charge.description = this.description;
	            if (this.capture) req.charge.capture = this.capture;

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

util.inherits(Charge, super_);


/*!
 * Export class
 */

exports = module.exports = Charge;
