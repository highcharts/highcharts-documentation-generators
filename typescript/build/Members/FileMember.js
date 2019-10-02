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
const M = __importStar(require("./Member"));
const typescript_1 = __importDefault(require("typescript"));
class FileMember extends M.Member {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(node) {
        super(node, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const superJSON = super.toJSON();
        return {
            children: superJSON.children,
            kind: 'file',
            kindID: superJSON.kindID,
            path: typescript_1.default.sys.resolvePath(this.node.fileName)
        };
    }
}
exports.FileMember = FileMember;
exports.default = FileMember;
