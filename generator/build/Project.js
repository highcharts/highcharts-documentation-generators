"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const FS = require("fs");
/* *
 *
 *  Class
 *
 * */
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(ast, path, template) {
        this.ast = ast;
        this.path = path;
        this.template = template;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path, template) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield FS.promises.readFile(path), ast = JSON.parse(file.toString());
            if (ast.files instanceof Array &&
                typeof ast.name === 'string') {
                return new Project(ast, path, template);
            }
            throw new Error('Project tree invalid.');
        });
    }
}
exports.Project = Project;
/* *
 *
 *  Default Export
 *
 * */
exports.default = Project;
//# sourceMappingURL=Project.js.map