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
const JSDoc_1 = __importDefault(require("./JSDoc"));
const typescript_1 = __importDefault(require("typescript"));
const Utilities_1 = __importDefault(require("./Utilities"));
/* *
 *
 *  Namespace
 *
 * */
var OptionUtilities;
(function (OptionUtilities) {
    /* *
     *
     *  Functions
     *
     * */
    function getOption(name, options) {
        const nodePath = name.split('.');
        let node = {
            name: '',
            children: options
        };
        for (let i = 0, iEnd = (nodePath.length - 1); i <= iEnd; ++i) {
            if (!node.children) {
                node.children = {};
            }
            node = node.children[nodePath[i]] = (node.children[nodePath[i]] ||
                {
                    name: nodePath.slice(0, i).join('.')
                });
        }
        return node;
    }
    OptionUtilities.getOption = getOption;
    function mergeOptions(sourceOptions, targetOptions) {
        const names = Object.keys(sourceOptions);
        let name, sourceOption, targetOption;
        for (let i = 0, iEnd = names.length; i < iEnd; ++i) {
            name = names[i];
            sourceOption = sourceOptions[name];
            targetOption = getOption(name, targetOptions);
            Utilities_1.default.mergeObjects(sourceOption, targetOption, ['children', 'name']);
            if (sourceOption.children) {
                if (!targetOption.children) {
                    targetOption.children = {};
                }
                mergeOptions(sourceOption.children, targetOption.children);
            }
        }
    }
    OptionUtilities.mergeOptions = mergeOptions;
    function produceOption(node, sourceFile) {
        const optionTag = (JSDoc_1.default.extractTag('option', node, sourceFile) ||
            JSDoc_1.default.extractTag('optionCollection', node, sourceFile));
        if (optionTag &&
            optionTag.comment) {
            const tags = JSDoc_1.default.extractTags(node, sourceFile), option = {
                name: optionTag.comment
            };
            let tag, tagName, tagValue, value;
            for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
                tag = tags[i];
                tagName = tag.tagName.text;
                tagValue = tag.comment || '';
                value = option[tagName];
                if (typeof value === 'string') {
                    option[tagName] = [value, tagValue];
                }
                else if (value instanceof Array) {
                    value.push(tagValue);
                }
                else if (tagName !== 'children') {
                    option[tagName] = tagValue;
                }
            }
            return option;
        }
        return;
    }
    OptionUtilities.produceOption = produceOption;
    function produceOptions(node) {
        const options = {};
        if (typescript_1.default.isJSDoc(node)) {
        }
        return options;
    }
    OptionUtilities.produceOptions = produceOptions;
})(OptionUtilities || (OptionUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = OptionUtilities;
