"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMember = void 0;
const M = __importStar(require("./"));
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
    getChildNodes() {
        return this.node.getChildren(this.sourceFile)[0].getChildren(this.sourceFile);
    }
    toJSON() {
        const superJSON = super.toJSON();
        return {
            children: superJSON.children || [],
            kind: 'file',
            kindID: superJSON.kindID,
            path: typescript_1.default.sys.resolvePath(this.node.fileName)
        };
    }
}
exports.FileMember = FileMember;
exports.default = FileMember;
