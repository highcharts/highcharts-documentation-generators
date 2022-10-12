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
     *  Constants
     *
     * */
    JSON.parse = global.JSON.parse;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Retrieves a value as a specific primitive type and falls back to a
     * default value, if not successfull.
     */
    function get(type, value, defaultValue) {
        if (typeof value === type) {
            return value;
        }
        else {
            return defaultValue;
        }
    }
    JSON.get = get;
    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    function stringify(obj) {
        const references = [];
        return globalThis.JSON.stringify(obj, (_key, item) => {
            if (typeof item === 'object' &&
                item) {
                if (references.includes(item) ||
                    item instanceof Array &&
                        !item.length) {
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
//# sourceMappingURL=JSON.js.map