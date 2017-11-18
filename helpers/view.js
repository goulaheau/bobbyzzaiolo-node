'use strict';

/**
 * All the helpers to use in the views html.
 */
(function (exports) {

	/**
	 * Get the port to use for NodeJS.
	 */
	exports.port = typeof process !== 'undefined' ? (process.env.PORT || 3000) : 3000;

})(typeof exports === 'undefined' ? this['helperView'] = {} : exports);