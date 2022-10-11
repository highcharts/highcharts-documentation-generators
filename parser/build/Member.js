"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
/* *
 *
 *  Class
 *
 * */
class Member {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(project, node) {
        this.project = project;
        this.node = node;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static register(MemberClass) {
        Member.types[MemberClass.name] = MemberClass;
    }
    static parse(_node) {
        return;
    }
    /* *
     *
     *  Functions
     *
     * */
    getTypeReflection() {
        return this.project.typeChecker.getTypeAtLocation(this.node);
    }
}
exports.Member = Member;
/* *
 *
 *  Static Properties
 *
 * */
Member.types = {};
/* *
 *
 *  Default Export
 *
 * */
exports.default = Member;
//# sourceMappingURL=Member.js.map