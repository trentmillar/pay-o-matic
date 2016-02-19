pay-o-matic
============

A unified facade to multiple payment gateways using a common interface. What pay-o-matic will do is allow one or more processing gateways to be configured, allowing round-robining, fail-over, or whatever prioritization you want. Currently contains the Stripe API but will include others as I incorporate them.

## Installation

	npm install pay-o-matic
	
## Usage

	/* look at the unit tests for more examples */
	
	var payomatic = require('pay-o-matic');	
		
Make sure you have a .env file or add the your PATH and set the following to use Stripe

	STRIPE_API_KEY=pk_test_4123432454356
	STRIPE_ENABLED=true
    
## Tests

	mocha test/*.js

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
