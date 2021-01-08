"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
/* *
 *
 *  Namespace
 *
 * */
var Utilities;
(function (Utilities) {
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
    function extractInChildren(node, sourceFile, extractor) {
        const children = node.getChildren(sourceFile);
        let result;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            result = extractor(children[i], sourceFile, true);
            if (result) {
                return result;
            }
        }
        return void 0;
    }
    Utilities.extractInChildren = extractInChildren;
})(Utilities || (Utilities = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = Utilities;
