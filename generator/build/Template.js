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
exports.Template = void 0;
const FS = require("fs");
const Handlebars = require("handlebars");
const Path = require("path");
const Utilities_1 = require("./Utilities");
/* *
 *
 *  Class
 *
 * */
class Template {
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path, relativeTo) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield FS.promises.readFile(path);
            const name = Path.relative(relativeTo || Path.dirname(path), path.substring(0, path.length - Path.extname(path).length));
            const compile = Handlebars.compile(buffer.toString());
            const template = new Template(name, path, compile);
            Template.types[name] = template;
            Handlebars.registerPartial(name, compile);
            return template;
        });
    }
    static loadFolder(path, recursive) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = Utilities_1.default.getFilePaths(path, recursive);
            const promises = [];
            for (const file of files) {
                promises.push(Template.load(file, path));
            }
            return Promise.all(promises);
        });
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(name, path, compile) {
        this.name = name;
        this.path = path;
        this.compile = compile;
    }
    write(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = this, file = template.compile(data, {});
            yield FS.promises.writeFile(path, file);
        });
    }
}
exports.Template = Template;
/* *
 *
 *  Static Properties
 *
 * */
Template.types = {};
exports.default = Template;
//# sourceMappingURL=Template.js.map