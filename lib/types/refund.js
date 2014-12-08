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
        "chargeId": "charge",
        "currencyCode": "currency",
        "reasonCode": "reason",
        "receiptNumber": "receipt_number",
        "refundedAmount": "amount_refunded"
    }
};

/**
 * Refund Type Constructor
 * @extends Type
 * @constructor {Object} options, object with properties
 * @api public
 */

function Refund(options, brand) {

	Refund.super_.call(this, options);

	if (brand && typeof brand === 'string' && brand.length > 0) {
	    this.brand = brand;
	}

	Object.defineProperty(this, 'id', {
	    get: function () {
	        if (this.get('id')) {
	            return this.get('id');
	        }
	        else {
	            this.set('id', this._options[mapping[this.brand].id] ||this._options.id);
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
	            this.set('amount', this._options[mapping[this.brand].amount] ||this._options.amount);
	            return this.get('amount');
	        }
	    }
        , set: function (value) { this.set('amount', value) }
	})

	Object.defineProperty(this, 'chargeId', {
	    get: function () {
	        if (this.get('chargeId')) {
	            return this.get('chargeId');
	        }
	        else {
	            this.set('chargeId', this._options[mapping[this.brand].chargeId] ||this._options.chargeId);
	            return this.get('chargeId');
	        }
	    }
        , set: function (value) { this.set('chargeId', value) }
	})

	Object.defineProperty(this, 'currencyCode', {
	    get: function () {
	        if (this.get('currencyCode')) {
	            return this.get('currencyCode');
	        }
	        else {
	            this.set('currencyCode', this._options[mapping[this.brand].currencyCode] ||this._options.currencyCode);
	            return this.get('currencyCode');
	        }
	    }
        , set: function (value) { this.set('currencyCode', value) }
	})

	Object.defineProperty(this, 'reasonCode', {
	    get: function () {
	        if (this.get('reasonCode')) {
	            return this.get('reasonCode');
	        }
	        else {
	            this.set('reasonCode', this._options[mapping[this.brand].reasonCode] ||this._options.reasonCode);
	            return this.get('reasonCode');
	        }
	    }
        , set: function (value) { this.set('reasonCode', value) }
	})

	Object.defineProperty(this, 'receiptNumber', {
	    get: function () {
	        if (this.get('receiptNumber')) {
	            return this.get('receiptNumber');
	        }
	        else {
	            this.set('receiptNumber', this._options[mapping[this.brand].receiptNumber] ||this._options.receiptNumber);
	            return this.get('receiptNumber');
	        }
	    }
        , set: function (value) { this.set('receiptNumber', value) }
	})

	Object.defineProperty(this, 'refundedAmount', {
	    get: function () {
	        if (this.get('refundedAmount')) {
	            return this.get('refundedAmount');
	        }
	        else {
	            this.set('refundedAmount', this._options[mapping[this.brand].refundedAmount] ||this._options.refundedAmount);
	            return this.get('refundedAmount');
	        }
	    }
        , set: function (value) { this.set('refundedAmount', value) }
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
	            req.refund = {};
	            req.refund.id = this.chargeId;
	            if (this.refundedAmount) req.refund.amount = this.refundedAmount;
				if (this.reasonCode) req.refund.reason = this.reasonCode;

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

util.inherits(Refund, super_);


/*!
 * Export class
 */

exports = module.exports = Refund;
