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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionMember = void 0;
const M = __importStar(require("./"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
function parameterJSONMapper(child) {
    return child.toJSON();
}
class FunctionMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    getParameterNodes() {
        return (this.node.parameters || []).slice();
    }
    getParameters() {
        const parameterNodes = this.getParameterNodes();
        const parameters = [];
        const sourceFile = this.sourceFile;
        for (let parameterNode of parameterNodes) {
            parameters.push(new M.ParameterMember(sourceFile, parameterNode));
        }
        return parameters;
    }
    getParametersJSON() {
        return this
            .getParameters()
            .map(parameterJSONMapper);
    }
    toJSON() {
        const node = this.node;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();
        return {
            children: superJSON.children,
            kind: 'function',
            kindID: superJSON.kindID,
            modifiers: node.modifiers,
            name: (node.name && node.name.toString() || ''),
            parameters: this.getParametersJSON(),
            returnType: TypesUtilities_1.default
                .loadFromTypeNode(sourceFile, node.type)
                .toJSON()
        };
    }
}
exports.FunctionMember = FunctionMember;
exports.default = FunctionMember;
