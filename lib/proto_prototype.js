'use strict';

/**
 * - [extendProto](#extendProto)
 * - [createSubclass](#createSubclass)
 * - [makeSubclass](#makeSubclass)
 *
 * These methods can be [chained](_.js.html#Proto)
 */
var prototypeFunctions = module.exports = {
	extendProto: extendProto,
	createSubclass: createSubclass,
	makeSubclass: makeSubclass
};


var _ = require('./proto_object');
_.extend(_, prototypeFunctions);


/**
 * Adds non-enumerable, non-configurable and non-writable properties to the prototype of constructor function.
 * Usage:
 * ```
 * function MyClass() {}
 * _.extendProto(MyClass, {
 *     method1: function() {},
 *     method2: function() {}
 * });
 * ```
 * To extend class via object:
 * ```
 * _.extendProto(obj.constructor, methods);
 * ```
 * Returns passed constructor, so functions _.extendProto, [_.extend](object.js.html#extend) and _.makeSubclass can be [chained](_.js.html). 
 *
 * @param {Function} self constructor function
 * @param {Object} methods a map of functions, keys will be instance methods (properties of the constructor prototype)
 * @return {Function}
 */
function extendProto(self, methods) {
	var propDescriptors = {};

	_.eachKey(methods, function(method, name) {
		propDescriptors[name] = {
			enumerable: false,
			configurable: false,
			writable: false,
			value: method
		};
	});

	Object.defineProperties(self.prototype, propDescriptors);
	return self;
}


/**
 * Makes a subclass of class `thisClass`.
 * The returned function will have specified `name` if supplied.
 * The constructor of superclass will be called in subclass constructor by default unless `applyConstructor === false` (not just falsy).
 * Copies `thisClass` class methods to created subclass. For them to work correctly they should use `this` to refer to the class rather than explicit superclass name.
 *
 * @param {Function} thisClass A class to make subclass of
 * @param {String} name Optional name of subclass constructor function
 * @param {Boolean} applyConstructor Optional false value (not falsy) to prevent call of inherited constructor in the constructor of subclass
 * @return {Function}
 */
function createSubclass(thisClass, name, applyConstructor) {
	var subclass;

	// name is optional
	name = name || '';

	// apply superclass constructor
	var constructorCode = applyConstructor === false
			? ''
			: 'thisClass.apply(this, arguments);';

	eval('subclass = function ' + name + '(){ ' + constructorCode + ' }');

	_.makeSubclass(subclass, thisClass);

	// copy class methods
	// - for them to work correctly they should not explictly use superclass name
	// and use "this" instead
	_.extend(subclass, thisClass, true);

	return subclass;
}


/**
 * Sets up prototype chain to change `thisClass` (a constructor function) so that it becomes a subclass of `Superclass`.
 * Returns `thisClass` so it can be [chained](_.js.html) with _.extendProto and [_.extend](object.js.html#extend).
 *
 * @param {Function} thisClass A class that will become a subclass of Superclass
 * @param {Function} Superclass A class that will become a superclass of thisClass
 * @return {Function}
 */
function makeSubclass(thisClass, Superclass) {
	// prototype chain
	thisClass.prototype = Object.create(Superclass.prototype);
	
	// subclass identity
	_.extendProto(thisClass, {
		constructor: thisClass
	});
	return thisClass;
}
