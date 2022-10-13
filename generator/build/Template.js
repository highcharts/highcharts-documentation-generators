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
/* *
 *
 *  Class
 *
 * */
class Template {
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
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield FS.promises.readFile(path), name = Path.basename(path, Path.extname(path)), compile = Handlebars.compile(file.toString()), template = new Template(name, path, compile);
            Template.types[name] = template;
            Handlebars.registerPartial(name, compile);
            return template;
        });
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