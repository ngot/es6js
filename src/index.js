(function(){
	'use strict';

	/**
	 * Array
	 */

	//isArray
	if(!Array.isArray) {
		Array.isArray = function (vArg) {
			var isArray;
			isArray = vArg instanceof Array;
			return isArray;
		};
	}

	//every
	if (!Array.prototype.every){
		Array.prototype.every = function(fun /*, thisArg */){
			if (this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function')
				throw new TypeError();
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
				if (i in t && !fun.call(thisArg, t[i], i, t))
					return false;
			}
			return true;
		};
	}

	//filter
	if (!Array.prototype.filter){
		Array.prototype.filter = function(fun /*, thisArg */){
			if (this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun != "function")
				throw new TypeError();
			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
				if (i in t){
					var val = t[i];
	        // NOTE: Technically this should Object.defineProperty at
	        //       the next index, as push can be affected by
	        //       properties on Object.prototype and Array.prototype.
	        //       But that method's new, and collisions should be
	        //       rare, so use the more-compatible alternative.
	        if (fun.call(thisArg, val, i, t))
	        	res.push(val);
	      }
	    }
	    return res;
	  };
	}


	//forEach
	if (!Array.prototype.forEach){
		Array.prototype.forEach = function(fun /*, thisArg */){
			if (this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function")
				throw new TypeError();
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
				if (i in t)
					fun.call(thisArg, t[i], i, t);
			}
		};
	}

	//lastIndexOf
	if (!Array.prototype.lastIndexOf) {
		Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
			if (this == null) {
				throw new TypeError();
			}
			var n, k,
			t = Object(this),
			len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			n = len;

			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) {
					n = 0;
				}
				else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}

			for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		};
	}

	//indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement, fromIndex) {
			if ( this === undefined || this === null ) {
				throw new TypeError( '"this" is null or not defined' );
			}
      var length = this.length >>> 0; // Hack to convert object.length to a UInt32
      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
      	fromIndex = 0;
      }

      if (fromIndex < 0) {
      	fromIndex += length;
      	if (fromIndex < 0) {
      		fromIndex = 0;
      	}
      }

      for (;fromIndex < length; fromIndex++) {
      	if (this[fromIndex] === searchElement) {
      		return fromIndex;
      	}
      }
      return -1;
    };
  }

	//map
	if (!Array.prototype.map){
		Array.prototype.map = function(fun /*, thisArg */){
			if (this === void 0 || this === null)
				throw new TypeError();

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function")
				throw new TypeError();

			var res = new Array(len);
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
	      // NOTE: Absolute correctness would demand Object.defineProperty
	      //       be used.  But this method is fairly new, and failure is
	      //       possible only if Object.prototype or Array.prototype
	      //       has a property |i| (very unlikely), so use a less-correct
	      //       but more portable alternative.
	      if (i in t)
	      	res[i] = fun.call(thisArg, t[i], i, t);
	    }
	    return res;
	  };
	}

	//reduce
	if ('function' !== typeof Array.prototype.reduce) {
		Array.prototype.reduce = function(callback, opt_initialValue){
			if (null === this || 'undefined' === typeof this) {
	      // At the moment all modern browsers, that support strict mode, have
	      // native implementation of Array.prototype.reduce. For instance, IE8
	      // does not support strict mode, so this check is actually useless.
	      throw new TypeError('Array.prototype.reduce called on null or undefined');
	    }
	    if ('function' !== typeof callback) {
	    	throw new TypeError(callback + ' is not a function');
	    }
	    var index, value,
	    length = this.length >>> 0,
	    isValueSet = false;
	    if (1 < arguments.length) {
	    	value = opt_initialValue;
	    	isValueSet = true;
	    }
	    for (index = 0; length > index; ++index) {
	    	if (this.hasOwnProperty(index)) {
	    		if (isValueSet) {
	    			value = callback(value, this[index], index, this);
	    		}else {
	    			value = this[index];
	    			isValueSet = true;
	    		}
	    	}
	    }
	    if (!isValueSet) {
	    	throw new TypeError('Reduce of empty array with no initial value');
	    }
	    return value;
	  };
	}

	//reduceRight
	if ('function' !== typeof Array.prototype.reduceRight) {
		Array.prototype.reduceRight = function(callback, opt_initialValue) {
			if (null === this || 'undefined' === typeof this) {
	      // At the moment all modern browsers, that support strict mode, have
	      // native implementation of Array.prototype.reduceRight. For instance,
	      // IE8 does not support strict mode, so this check is actually useless.
	      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
	    }
	    if ('function' !== typeof callback) {
	    	throw new TypeError(callback + ' is not a function');
	    }
	    var index, value,
	    length = this.length >>> 0,
	    isValueSet = false;
	    if (1 < arguments.length) {
	    	value = opt_initialValue;
	    	isValueSet = true;
	    }
	    for (index = length - 1; -1 < index; --index) {
	    	if (this.hasOwnProperty(index)) {
	    		if (isValueSet) {
	    			value = callback(value, this[index], index, this);
	    		}else {
	    			value = this[index];
	    			isValueSet = true;
	    		}
	    	}
	    }
	    if (!isValueSet) {
	    	throw new TypeError('Reduce of empty array with no initial value');
	    }
	    return value;
	  };
	}

	//some
	if (!Array.prototype.some){
		Array.prototype.some = function(fun /*, thisArg */){
			if (this === void 0 || this === null)
				throw new TypeError();

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function')
				throw new TypeError();

			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
				if (i in t && fun.call(thisArg, t[i], i, t))
					return true;
			}
			return false;
		};
	}

	/**
	 * Date
	 */

	//now
	if (!Date.now) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

	//toISOString
	if(!Date.prototype.toISOString) {
		( function() {
			function pad(number) {
				if ( number < 10 ) {
					return '0' + number;
				}
				return number;
			}

			Date.prototype.toISOString = function() {
				return this.getUTCFullYear() +
				'-' + pad( this.getUTCMonth() + 1 ) +
				'-' + pad( this.getUTCDate() ) +
				'T' + pad( this.getUTCHours() ) +
				':' + pad( this.getUTCMinutes() ) +
				':' + pad( this.getUTCSeconds() ) +
				'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice( 2, 5 ) +
				'Z';
			};
		}());
	}

	

})();