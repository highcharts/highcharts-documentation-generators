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
const OptionUtilities_1 = __importDefault(require("./OptionUtilities"));
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
    getOptions() {
        const optionDoc = this, targetOptions = optionDoc.options;
        if (!Object.keys(targetOptions).length) {
            const projectFiles = optionDoc.project.getFiles();
            let sourceOptions;
            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptions = OptionUtilities_1.default.produceOptions(projectFiles[i]);
                OptionUtilities_1.default.mergeOptions(sourceOptions, targetOptions);
            }
        }
        return targetOptions;
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
