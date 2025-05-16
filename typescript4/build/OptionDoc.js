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
exports.OptionDoc = void 0;
const JSDoc_1 = __importDefault(require("./JSDoc"));
const OptionUtilities_1 = __importDefault(require("./OptionUtilities"));
const ProjectDoc_1 = __importDefault(require("./ProjectDoc"));
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
     *  Static Functions
     *
     * */
    static load(path, optionTag = 'option', collectionTag = 'option-collection') {
        return new OptionDoc(ProjectDoc_1.default.load(path), optionTag, collectionTag);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(project, optionTag, collectionTag) {
        this.options = {};
        this.collectionTag = collectionTag;
        this.optionTag = optionTag;
        this.project = project;
    }
    /* *
     *
     *  Functions
     *
     * */
    getMeta(node, sourceFile) {
        return Object.assign({ source: this.project.normalizePath(sourceFile.fileName) }, Utilities_1.default.extractMeta(node, sourceFile));
    }
    getOptions() {
        const optionDoc = this, options = optionDoc.options;
        if (!Object.keys(options).length) {
            const projectFiles = optionDoc.project.getFiles();
            let projectFile;
            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                projectFile = projectFiles[i];
                optionDoc.parseOptions(projectFile, projectFile);
            }
        }
        return options;
    }
    parseOption(node, sourceFile) {
        const optionDoc = this, optionTag = JSDoc_1.default.extractTags(node, sourceFile, [optionDoc.optionTag, optionDoc.collectionTag])[0], optionName = (typeof optionTag.comment === 'string' && optionTag.comment);
        if (!optionTag || !optionName) {
            return;
        }
        const option = {
            name: optionName
        }, optionTags = {}, tags = JSDoc_1.default.extractTags(node, sourceFile, void 0, [optionDoc.optionTag, optionDoc.collectionTag]);
        if (typeof node.comment === 'string') {
            option.description = node.comment;
        }
        let tag, tagName, tagValue, optionValue;
        for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
            tag = tags[i];
            tagName = tag.tagName.text;
            tagValue = (typeof tag.comment === 'string' ?
                tag.comment :
                tag.getText(sourceFile).split(/\s+/)[1]);
            optionValue = optionTags[tagName];
            if (typeof optionValue === 'string') {
                optionTags[tagName] = [optionValue, tagValue];
            }
            else if (optionValue instanceof Array) {
                optionValue.push(tagValue);
            }
            else {
                optionTags[tagName] = tagValue;
            }
        }
        if (Object.keys(optionTags).length) {
            option.tags = optionTags;
        }
        option.meta = optionDoc.getMeta(node, sourceFile);
        if (optionTag.tagName.getText(sourceFile) === optionDoc.collectionTag) {
            console.log(optionName, node.parent.getChildren(sourceFile).map(child => typescript_1.default.SyntaxKind[child.kind]));
        }
        return option;
    }
    parseOptions(node, sourceFile) {
        const optionDoc = this, options = optionDoc.options, children = node.getChildren(sourceFile);
        if (typescript_1.default.isJSDoc(node)) {
            const option = optionDoc.parseOption(node, sourceFile);
            if (option) {
                OptionUtilities_1.default.mergeOption(option, OptionUtilities_1.default.getOption(option.name, options));
            }
        }
        let child;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            child = children[i];
            if (child) {
                optionDoc.parseOptions(child, sourceFile);
            }
        }
        return options;
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
exports.OptionDoc = OptionDoc;
/* *
 *
 *  Default Export
 *
 * */
exports.default = OptionDoc;
