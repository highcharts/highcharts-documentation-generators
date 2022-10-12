/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';
import U from '../Utilities';

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

    public toJSON(): UnknownMember.JSON {
        const unknownMember = this,
            comment = unknownMember.getComment(),
            debug = unknownMember.getDebug(),
            meta = unknownMember.getMeta();

        return {
            kind: `unknown:${TypeScript.SyntaxKind[debug.kind]}`,
            comment,
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
        kind: string;
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
