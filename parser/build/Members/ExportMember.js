"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
/* *
 *
 *  Class
 *
 * */
class ExportMember extends Member_1.default {
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        var _a;
        if (!((_a = file.project.options) === null || _a === void 0 ? void 0 : _a.includeExport) ||
            (!TypeScript.isExportAssignment(node) &&
                !TypeScript.isExportDeclaration(node))) {
            return;
        }
        return new ExportMember(file, node);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        super(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const exportMember = this, children = exportMember
            .getChildren()
            .map(child => child.toJSON()), commentTags = exportMember.getCommentTags(), meta = exportMember.getMeta();
        return {
            kind: `export`,
            commentTags,
            meta,
            children
        };
    }
}
exports.ExportMember = ExportMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(ExportMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = ExportMember;
//# sourceMappingURL=ExportMember.js.map