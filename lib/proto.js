'use strict';


/**
 * Chaining
 * ========
 *
 * `_` can be used to create a wrapped value (object, function, array, etc.) to allow chaining of Proto functions.
 * To unwrap, `_` method of a wrapped value should be used.
 * Usage:
 * ```
 * var arr = _({ 0: 3, 1: 4, 2: 5, length: 3})
 *              .toArray()
 *              .prependArray([1, 2])
 *              .appendArray([6, 7, 8])
 *              ._();
 * ```
 * A wrapped object is an instance of `_` (`Proto` class).
 *
 * Chaining is implemented for development convenience, but it has performance overhead, not only to wrap and unwrap values but in each function call.
 * Although all Proto functions are implemented as methods operating on this and the overhead to redefine them as functions is very small, the overhead to redefine them as methods of wrapped value is slightly higher - chaining is 15-25% slower than using functions (properties of _ that take the first parameter).
 * In cases when performance is critical, you may want to avoid using chaining.
 *
 * @param {Any} self A value to be wrapped
 * @return {Proto}
 */
function Proto(self) {
    // wrap passed parameter in _ object
    var wrapped = Object.create(Proto.prototype);
    wrapped.self = self;
    return wrapped;
};

var _ = Proto;

module.exports = Proto;
var funcs, methods, name;

funcs = require('./dotjs/functions/object');
methods = require('./dotjs/methods/object');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}
for (name in funcs._constants)
    Proto[name] = funcs._constants[name];


funcs = require('./dotjs/functions/array');
methods = require('./dotjs/methods/array');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


funcs = require('./dotjs/functions/function');
methods = require('./dotjs/methods/function');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


funcs = require('./dotjs/functions/prototype');
methods = require('./dotjs/methods/prototype');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


funcs = require('./dotjs/functions/string');
methods = require('./dotjs/methods/string');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


funcs = require('./dotjs/functions/utils');
methods = require('./dotjs/methods/utils');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


funcs = require('./dotjs/functions/number');
methods = require('./dotjs/methods/number');
for (name in funcs) {
    Proto[name] = funcs[name];
    Proto.prototype[name] = methods[name];
}


// var libs = ['object', 'array', 'function', 'prototype', 'string', 'utils', 'number'];

// for (var i=0; i<libs.length; i++) {
//     var lib = libs[i];
//     var funcs = require('./dotjs/functions/' + lib);
//     var methods = require('./dotjs/methods/' + lib);
//     var name;
//     for (name in funcs) {
//         Proto[name] = funcs[name];
//         Proto.prototype[name] = methods[name];
//     }

//     // add constants
//     if (lib == 'object')
//         for (name in funcs._constants)
//             Proto[name] = funcs._constants[name];
// }


Proto.prototype._ = function() {
    return this.self;
};
