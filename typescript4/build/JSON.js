"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON = void 0;
/* *
 *
 *  Namespace
 *
 * */
var JSON;
(function (JSON) {
    /* *
    *
    *  Declarations
    *
    * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    function stringify(obj) {
        const references = [];
        return global.JSON.stringify(obj, (_key, item) => {
            if (typeof item === 'object' && item) {
                if (references.includes(item)) {
                    return void 0;
                }
                else {
                    references.push(item);
                }
            }
            return item;
        }, '\t');
    }
    JSON.stringify = stringify;
})(JSON = exports.JSON || (exports.JSON = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = JSON;
