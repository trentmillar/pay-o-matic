'use strict';

require('dotenv').load();

var _ = require('underscore'),
    mediator = require('./strategy/mediator');

var Payomatic = function () {

  //this.processors = {};
  this._options = {
    'name': 'Pay-O-Matic'
  };


  // init environment defaults

  this.set('stripe api key', process.env.STRIPE_API_KEY);
  this.set('stripe enabled', process.env.STRIPE_ENABLED);


  this.mediator = mediator;
};

_.extend(Payomatic.prototype, require('./core/options')());


Payomatic.prototype.util = require('./core/utils');

Payomatic.prototype.processor = function (arg) {
  if (arg && arg.constructor === this.Processor) {
    this.mediator.processors[arg.brand] = arg;
    return arg;
  }
  return this.mediator.processors[arg];
};

/**
 * Pay-o-Matic version
 *
 * @api public
 */

Payomatic.version = require('../package.json').version;


var payomatic = module.exports = new Payomatic();

payomatic.Type = require('./core/type');
payomatic.Types = require('./types');
payomatic.Processor = require('./core/processor');

require('./processors');
