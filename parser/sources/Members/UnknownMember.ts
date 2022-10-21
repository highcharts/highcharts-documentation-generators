/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as TypeScript from 'typescript';

import Member from '../Member';
import ProjectFile from '../ProjectFile';

/* *
 *
 *  Class
 *
 * */

export class UnknownMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (UnknownMember|undefined) {

        if (!file.project.options.debug) {
            return;
        }

        return new UnknownMember(file, node);
    }

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): UnknownMember.JSON {
        const unknownMember = this;
        const commentTags = unknownMember.getCommentTags();
        const debug = unknownMember.getDebug();
        const meta = unknownMember.getMeta();

        return {
            kind: `[unknown ${TypeScript.SyntaxKind[debug.kind]}]`,
            commentTags,
            meta,
            debug
        };
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace UnknownMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        debug?: Member.Debug;
    }

}

/* *
 *
 *  Registry
 *
 * */

Member.register(UnknownMember);

/* *
 *
 *  Default Export
 *
 * */

export default UnknownMember;
