var payomatic = require('../'),
    Types = require('../types/'),
    stripe = require('stripe')(payomatic.get('stripe api key'));

/**
 * Stripe Processor
 * =============
 */

var Stripe = new payomatic.Processor('Stripe', {
    priority: 0
});


/**
 * Methods
 * =======
 */

Stripe.methods.createCustomer = function (customer, cb) {

    var _customer = customer || {};

    stripe.customers.create(_customer,
     function (err, cust) {
        if(err) return callback(err);

        return cb(err, cust);
    });

}


Stripe.methods.createCard = function (card, customer, cb) {

    var _card = card || {};

/*    stripe.customers.createCard({CUSTOMER_ID}, {
        card: {TOKEN_ID}
    });
    var stripe = require("stripe")(
      "sk_test_xzjL62O9kWxMQPQGpM53jo2S"
    );

    stripe.customers.createCard(
      "cus_553Ge9OCV5wxSX",
      {card: "tok_14utQpBJRUPmYwRPNkzZ6oER"},
      function(err, card) {
          // asynchronously called
      }
    );*/

}


/**
 * Registration
 * ============
 */

Stripe.register();
