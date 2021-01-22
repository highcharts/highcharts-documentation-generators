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
exports.OptionUtilities = void 0;
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
                    name: nodePath.slice(0, i + 1).join('.')
                });
        }
        return node;
    }
    OptionUtilities.getOption = getOption;
    function mergeOption(sourceOption, targetOption) {
        Utilities_1.default.mergeObjects(sourceOption, targetOption, ['children', 'name']);
        if (sourceOption.children) {
            if (!targetOption.children) {
                targetOption.children = {};
            }
            mergeOptions(sourceOption.children, targetOption.children);
        }
        return targetOption;
    }
    OptionUtilities.mergeOption = mergeOption;
    function mergeOptions(sourceOptions, targetOptions) {
        const names = Object.keys(sourceOptions);
        let name, sourceOption, targetOption;
        for (let i = 0, iEnd = names.length; i < iEnd; ++i) {
            name = names[i];
            sourceOption = sourceOptions[name];
            targetOption = getOption(name, targetOptions);
            mergeOption(sourceOption, targetOption);
        }
    }
    OptionUtilities.mergeOptions = mergeOptions;
})(OptionUtilities = exports.OptionUtilities || (exports.OptionUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = OptionUtilities;
