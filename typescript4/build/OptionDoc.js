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
const Utilities_1 = __importDefault(require("./Utilities"));
/* *
 *
 *  Class
 *
 * */
class OptionDoc {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(project) {
        this.options = {};
        this.project = project;
    }
    /* *
     *
     *  Functions
     *
     * */
    getOption(name, options = this.options) {
        const optionDoc = this, nodePath = name.split('.');
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
    getOptions() {
        const optionDoc = this, targetOptions = optionDoc.options;
        if (!Object.keys(targetOptions).length) {
            const projectFiles = optionDoc.project.getFiles();
            let sourceOptions;
            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptions = optionDoc.produceOptions(projectFiles[i]);
                optionDoc.mergeOptions(sourceOptions, targetOptions);
            }
        }
        return targetOptions;
    }
    mergeOptions(sourceOptions, targetOptions) {
        const optionDoc = this, names = Object.keys(sourceOptions);
        let name, sourceOption, targetOption;
        for (let i = 0, iEnd = names.length; i < iEnd; ++i) {
            name = names[i];
            sourceOption = sourceOptions[name];
            targetOption = optionDoc.getOption(name, targetOptions);
            Utilities_1.default.mergeObjects(sourceOption, targetOption, ['children', 'name']);
            if (sourceOption.children) {
                if (!targetOption.children) {
                    targetOption.children = {};
                }
                optionDoc.mergeOptions(sourceOption.children, targetOption.children);
            }
        }
    }
    produceOptions(node) {
        const optionTree = {};
        if (typescript_1.default.isJSDoc(node)) {
        }
        return optionTree;
    }
    toJSON() {
        const optionDoc = this, { branch, commit, date, description, name, repository, version } = optionDoc.project;
        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            options: optionDoc.getOptions()
        };
    }
}
/* *
 *
 *  Default Export
 *
 * */
exports.default = OptionDoc;
