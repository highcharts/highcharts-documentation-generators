"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
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
            kind: `unknown:${TypeScript.SyntaxKind[debug.kind]}`,
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