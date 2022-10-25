"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
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
        const isSourceFile = typescript_1.default.isSourceFile(node), start = (isSourceFile ?
            node.getFullStart() :
            node.getStart(sourceFile)), end = (isSourceFile ?
            node.getFullWidth() :
            node.getEnd()), sourceText = sourceFile.getFullText(), startLines = sourceText.substr(0, start).split('\n'), startLine = startLines.length, startColumn = (startLines.pop() || '').length + 1, endLines = sourceText.substr(0, end).split('\n'), endLine = endLines.length, endColumn = (endLines.pop() || '').length + 1;
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
    function mergeObjects(source, target, propertiesToSkip) {
        const properties = Object.keys(source);
        let property, value, targetValue;
        for (let i = 0, iEnd = properties.length; i < iEnd; ++i) {
            property = properties[i];
            if (propertiesToSkip &&
                propertiesToSkip.includes(property)) {
                continue;
            }
            value = source[property];
            targetValue = target[property];
            if (value instanceof Array) {
                if (targetValue instanceof Array) {
                    targetValue.push(...value);
                }
                else {
                    target[property] = value.slice();
                }
            }
            else if (typeof value === 'object' &&
                typeof targetValue === 'object' &&
                value !== null &&
                targetValue !== null &&
                !(targetValue instanceof Array)) {
                mergeObjects(value, targetValue, propertiesToSkip);
            }
            else if (typeof value === 'string' &&
                typeof targetValue === 'string') {
                target[property] = targetValue + '\n' + value;
            }
            else if (typeof target[property] === 'undefined') {
                target[property] = value;
            }
        }
    }
    Utilities.mergeObjects = mergeObjects;
})(Utilities || (Utilities = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = Utilities;
