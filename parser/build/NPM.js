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
exports.NPM = void 0;
const FS = require("fs");
const JSON_js_1 = require("./JSON.js");
/* *
 *
 *  Namespace
 *
 * */
var NPM;
(function (NPM) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    NPM.defaults = {
        name: 'Project',
        version: '0.0.0'
    };
    /* *
     *
     *  Functions
     *
     * */
    function load(path) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = JSON_js_1.default.parse(`${yield FS.promises.readFile(path)}`);
                if (json &&
                    typeof json === 'object' &&
                    !(json instanceof Array)) {
                    return {
                        description: (JSON_js_1.default.get('string', json.description, '') ||
                            undefined),
                        name: JSON_js_1.default.get('string', json.name, NPM.defaults.name),
                        repository: (JSON_js_1.default.get('string', (_a = json.repository) === null || _a === void 0 ? void 0 : _a.url, '') ||
                            JSON_js_1.default.get('string', json.repository, '') ||
                            undefined),
                        version: JSON_js_1.default.get('string', json.version, NPM.defaults.version)
                    };
                }
            }
            catch (e) {
                console.error(e);
            }
            return NPM.defaults;
        });
    }
    NPM.load = load;
})(NPM = exports.NPM || (exports.NPM = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = NPM;
//# sourceMappingURL=NPM.js.map