var payomatic = require('../'),
    Types = require('../types/'),
    _ = require('underscore'),
    stripe = require('stripe')(payomatic.get('stripe api key'));

/**
 * Stripe Processor
 * =============
 */

var Stripe = new payomatic.Processor('stripe', {
    priority: 0
});


/**
 * Methods
 * =======
 */

Stripe.methods.createCustomer = function (customer, cb) {

    if (!customer || !(customer instanceof payomatic.Types.Customer)) {
        return cb('customer object missing');
    }

    customer.brand = 'stripe';

    stripe.customers.create(customer.toRequest(),
        function (err, cust) {
            if (err) return cb(err);

            var saved = _.extend(customer, cust);
            return cb(err, saved);
        });

}

Stripe.methods.deleteCustomer = function (customerId, cb) {

    if(!customerId){
        return cb('customerId missing');
    }

    stripe.customers.del(customerId,
        function (err, confirmation) {
            if(err) return cb(err);

            return cb(err, confirmation);
        });

}

Stripe.methods.createCard = function (customer, card, cb) {

    if(!customer || !(customer instanceof payomatic.Types.Customer)){
        return cb('customer missing');
    }

    if(!card || !(card instanceof payomatic.Types.Card)){
        return cb('card missing');
    }

    card.brand = 'stripe';

    stripe.customers.createCard(customer.id, card.toRequest(),
        function (err, result) {

            if (err) return cb(err);

            var saved = _.extend(card, result);
            return cb(err, saved);


    });
}

Stripe.methods.deleteCard = function(customerId, cardId, cb) {

    if (!customerId) {
        return cb('customerId missing');
    }

    if (!cardId) {
        return cb('cardId missing');
    }

    stripe.customers.deleteCard(customerId, cardId,
        function (err, confirmation) {

            if (err) return cb(err);

            return cb(err, confirmation);

        });

}

Stripe.methods.createCharge_NoCapture = function (charge, card, customer, cb) {

    if(!charge || !(charge instanceof payomatic.Types.Charge)){
        return cb('charge missing');
    }

    if(!card || !(card instanceof payomatic.Types.Card)){
        return cb('card missing');
    }

    if(!customer || !(customer instanceof payomatic.Types.Customer)){
        return cb('customer missing');
    }

    charge.brand = 'stripe';
    charge.capture = false;
    charge.cardId = card.id;
    charge.customerId = customer.id;

    if (!charge.customerId) {
        return cb('customer.id required');
    }

    if (!charge.cardId) {
        return cb('card.id required');
    }

    if (!charge.amount) {
        return cb('amount required');
    }

    if (charge.amount < 50) {
        return cb('amount must be more than 50 cents');
    }

    if (!charge.currencyCode) {
        return cb('currencyCode required');
    }

    if (charge.currencyCode.length !== 3) {
        return cb('currencyCode must be a 3-letter ISO code');
    }

    var req = charge.toRequest();

    stripe.charges.create(req.charge, function (err, result) {

        if (err) return cb(err);

        var saved = _.extend(charge, result);
        return cb(err, saved);

    });
}

Stripe.methods.createRefund_Full = function (refund, charge, cb) {

    refund.amount = null;

    Stripe.methods.createRefund(refund, charge, cb);

}


Stripe.methods.createRefund = function (refund, charge, cb) {

    if(!charge || !(charge instanceof payomatic.Types.Charge)){
        return cb('charge missing');
    }

    if(!refund || !(refund instanceof payomatic.Types.Refund)){
        return cb('refund missing');
    }

    refund.brand = 'stripe';
    refund.chargeId = charge.id;

    if (!refund.chargeId) {
        return cb('charge.id required');
    }

    var req = refund.toRequest();

    var id = req.refund.id;
    delete req.refund.id;

    stripe.charges.createRefund(id, req.refund, function (err, result) {

        if (err) return cb(err);

        var saved = _.extend(refund, result);
        return cb(err, saved);
    });
}


/**
 * Registration
 * ============
 */

Stripe.register();
