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
        this.optionTree = {};
        this.project = project;
    }
    /* *
     *
     *  Functions
     *
     * */
    getOption(name, tree) {
        const optionDoc = this, nodePath = name.split('.');
        let node = {
            name: '',
            children: tree
        };
        for (let i = 0, iEnd = (nodePath.length - 1); i <= iEnd; ++i) {
            if (!node.children) {
                node.children = {};
            }
            node = (node.children[nodePath[i]] ||
                {
                    name: nodePath.slice(0, i).join('.')
                });
        }
        return node;
    }
    getOptionsTree() {
        const optionDoc = this, optionTree = optionDoc.optionTree;
        if (!Object.keys(optionTree).length) {
            const projectFiles = optionDoc.project.getFiles();
            let sourceOptionTree;
            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptionTree = optionDoc.produceOptions(projectFiles[i]);
                Object
                    .values(sourceOptionTree)
                    .forEach(sourceOption => optionDoc.mergeOptions(sourceOption, optionTree));
            }
        }
        return optionTree;
    }
    mergeOptions(option, tree) {
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
            options: optionDoc.getOptionsTree()
        };
    }
}
/* *
 *
 *  Default Export
 *
 * */
exports.default = OptionDoc;
