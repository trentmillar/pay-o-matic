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
            if(err) return callback(err);

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


/**
 * Registration
 * ============
 */

Stripe.register();
