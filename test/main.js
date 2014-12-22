var assert = require('assert'),
    payomatic = require('../lib/');

var stripeCustomerResponse = {
    "object": "customer",
    "created": 1415053113,
    "id": "cus_357Ge9OCV5wxAB",
    "livemode": false,
    "description": "Trent Millar",
    "email": "trent.millar@gmail.com",
    "delinquent": false,
    "metadata": {
    },
    "subscriptions": {
        "object": "list",
        "total_count": 0,
        "has_more": false,
        "url": "/v1/customers/cus_357Ge9OCV5wxAB/subscriptions",
        "data": [

        ]
    },
    "discount": null,
    "account_balance": 0,
    "currency": "cad",
    "cards": {
        "object": "list",
        "total_count": 1,
        "has_more": false,
        "url": "/v1/customers/cus_357Ge9OCV5wxAB/cards",
        "data": [
            {
                "id": "card_60utA6BJRUPmYwRPYDQ2M7WG",
                "object": "card",
                "last4": "4242",
                "brand": "Visa",
                "funding": "credit",
                "exp_month": 12,
                "exp_year": 2015,
                "fingerprint": "K1yzLsHAEIHuiqlF",
                "country": "US",
                "name": null,
                "address_line1": null,
                "address_line2": null,
                "address_city": null,
                "address_state": null,
                "address_zip": null,
                "address_country": null,
                "cvc_check": "pass",
                "address_line1_check": null,
                "address_zip_check": null,
                "dynamic_last4": null,
                "customer": "cus_357Ge9OCV5wxAB"
            }
        ]
    },
    "default_card": "card_60utA6BJRUPmYwRPYDQ2M7WG"
};

var stripeCardReq = {
    "number": "4242424242424242",
    "exp_month": 12,
    "exp_year": 2020,
    "address_country": "US",
    "name": "Trent Millar",
    "address_line1": "1234 McCarty Ave",
    "address_line2": null,
    "address_city": "Mountain View",
    "address_state": "CA",
    "address_zip": "94041"
};

var stripeCharge = {
    amount: 400,
    currency: "cad",
    description: "test charge"
};

describe('pay-o-matic', function ()
{

  describe('test customer types', function ()
  {

    it('create new customer', function ()
    {
        var customer = new payomatic.Types.Customer({ email: 'trent.millar@gmail.com' });
        assert.equal(customer.email, 'trent.millar@gmail.com');
    });

      it('strip customer from stripe response', function () {

          var customer = new payomatic.Types.Customer(stripeCustomerResponse);
          customer.brand = 'stripe';

          var request = customer.toRequest();
      });

      it('strip customer and brand from stripe response', function () {

          var customer = new payomatic.Types.Customer(stripeCustomerResponse, 'stripe');
          var request = customer.toRequest();
      });

  });

});

describe('Card tests', function(){

    it('create stripe from request', function(){

        var card = new payomatic.Types.Card(stripeCardReq, 'stripe');
        var req = card.toRequest();
    });

    it('create stripe from properties', function () {

        var card = new payomatic.Types.Card({}, 'stripe');
        card.cardNumber = "4001000000000000";
        card.expiryMonth = "12";
        card.expiryYear = "2020";
        card.cardholderName = "Trent Millar";
        card.addressLine1 = "111 McCarty Ave";
        var req = card.toRequest();
    });
});

describe('Processor tests', function () {

    it('create then delete new stripe customer', function (done) {

        var stripe = payomatic.mediator.processors['stripe'];

        var customer = new payomatic.Types.Customer(stripeCustomerResponse, 'stripe');

        stripe.createCustomer(customer, function (err, cust) {

            stripe.deleteCustomer(cust.id, function (err, confirmation) {

                done();

            });
        });

    });


    it('create then, add a card, then delete new stripe customer', function (done) {

        var stripe = payomatic.mediator.processors['stripe'];

        var customer = new payomatic.Types.Customer(stripeCustomerResponse);
        var card = new payomatic.Types.Card(stripeCardReq);

        stripe.createCustomer(customer, function (err, cust) {

            stripe.createCard(cust, card, function (err, card) {

                stripe.deleteCard(cust.id, card.id, function(err, confirmation) {

                    stripe.deleteCustomer(cust.id, function (err, confirmation) {

                        done();

                    });

                });
            });
        });

    });


    it('create then, add a card, then charge, then refund, then delete new stripe customer', function (done) {

        var stripe = payomatic.mediator.processors['stripe'];

        var customer = new payomatic.Types.Customer(stripeCustomerResponse);
        var card = new payomatic.Types.Card(stripeCardReq);
        var charge = new payomatic.Types.Charge(stripeCharge);
        var refund = new payomatic.Types.Refund();

        stripe.createCustomer(customer, function (err, cust) {

            stripe.createCard(cust, card, function (err, card) {

                stripe.createCharge_NoCapture(charge, card, cust, function (err, charge) {

                    stripe.createRefund_Full(refund, charge, function (err, refund) {

                        stripe.deleteCard(cust.id, card.id, function (err, confirmation) {

                            stripe.deleteCustomer(cust.id, function (err, confirmation) {

                                done();

                            });

                        });
                    });
                });
            });

        });
    });


    it('create then, add a card, then charge with capture, then refund, then delete new stripe customer', function (done) {

        var stripe = payomatic.mediator.processors['stripe'];

        var customer = new payomatic.Types.Customer(stripeCustomerResponse);
        var card = new payomatic.Types.Card(stripeCardReq);
        var charge = new payomatic.Types.Charge(stripeCharge);
        var refund = new payomatic.Types.Refund();

        stripe.createCustomer(customer, function (err, cust) {

            stripe.createCard(cust, card, function (err, card) {

                stripe.createCharge_Capture(charge, card, cust, function (err, charge) {

                    stripe.createRefund_Full(refund, charge, function (err, refund) {

                        stripe.deleteCard(cust.id, card.id, function (err, confirmation) {

                            stripe.deleteCustomer(cust.id, function (err, confirmation) {

                                done();

                            });

                        });
                    });
                });
            });

        });
    });

    
});
