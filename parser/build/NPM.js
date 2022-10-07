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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPM = void 0;
const fs_1 = __importDefault(require("fs"));
const JSON_js_1 = __importDefault(require("./JSON.js"));
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
            const json = JSON_js_1.default.parse(yield fs_1.default.promises.readFile(path).toString());
            if (!json ||
                typeof json !== 'object' ||
                json instanceof Array) {
                return NPM.defaults;
            }
            return {
                description: JSON_js_1.default.get('string', json.description, '') || undefined,
                name: JSON_js_1.default.get('string', json.name, NPM.defaults.name),
                repository: (JSON_js_1.default.get('string', (_a = json.repository) === null || _a === void 0 ? void 0 : _a.url, '') ||
                    JSON_js_1.default.get('string', json.repository, '') ||
                    undefined),
                version: JSON_js_1.default.get('string', json.version, NPM.defaults.version)
            };
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