var assert = require('assert'),
    payomatic = require('../lib/');

describe('pay-o-matic', function ()
{

  describe('test customer types', function ()
  {

    it('create new customer', function ()
    {
        var customer = new payomatic.Types.customer({ email: 'trent.millar@gmail.com' });
        assert.equal(customer.email, 'trent.millar@gmail.com');
    });

    it('strip customer from stripe response', function () {
        var response = {
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

        var customer = new payomatic.Types.customer(response);
        customer.brand = 'stripe';

        var request = customer.toRequest();
    });

  });

});
