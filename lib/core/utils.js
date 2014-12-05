

/**
 * Copies and merges options with defaults.
 *
 * @param {Object} defaults
 * @param {Object} options
 * @return {Object} the options argument merged with defaults
 * @api public
 */

exports.options = function (defaults, options) {

    options = options || {};

    if (!defaults)
        return options;

    var keys = Object.keys(defaults), i = keys.length, k;

    while (i--) {
        k = keys[i];
        if (!(k in options)) {
            options[k] = defaults[k];
        }
    }

    return options;

}