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
    function extractMeta(node, sourceFile) {
        const start = node.getStart(sourceFile), end = node.getEnd(), sourceText = sourceFile.getFullText(), startLines = sourceText.substr(0, start).split('\n'), startLine = startLines.length, startColumn = (startLines.pop() || '').length + 1, endLines = sourceText.substr(0, end).split('\n'), endLine = endLines.length, endColumn = (endLines.pop() || '').length + 1;
        return {
            start,
            startLine,
            startColumn,
            end,
            endLine,
            endColumn
        };
    }
    Utilities.extractMeta = extractMeta;
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
