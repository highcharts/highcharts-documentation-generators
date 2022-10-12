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
exports.UnknownMember = void 0;
const Member_1 = __importDefault(require("../Member"));
const typescript_1 = __importDefault(require("typescript"));
/* *
 *
 *  Class
 *
 * */
class UnknownMember extends Member_1.default {
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!file.project.debug) {
            return;
        }
        return new UnknownMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const unknownMember = this, comment = unknownMember.getComment(), debug = unknownMember.getDebug(), meta = unknownMember.getMeta();
        return {
            kind: `unknown:${typescript_1.default.SyntaxKind[debug.kind]}`,
            comment,
            meta,
            debug
        };
    }
}
exports.UnknownMember = UnknownMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(UnknownMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = UnknownMember;
//# sourceMappingURL=UnknownMember.js.map