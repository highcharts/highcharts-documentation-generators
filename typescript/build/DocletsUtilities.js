"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const D = __importStar(require("./Doclets"));
const typescript_1 = __importDefault(require("typescript"));
class DocletsUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromNode(sourceFile, node) {
        if (typescript_1.default.isJSDoc(node)) {
            return new D.Doclet(sourceFile, node);
        }
        return new D.Doclet(sourceFile, node, true);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor() { }
    ;
}
exports.DocletsUtilities = DocletsUtilities;
exports.default = DocletsUtilities;
