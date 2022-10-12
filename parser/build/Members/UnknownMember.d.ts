/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class UnknownMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (UnknownMember | undefined);
    toJSON(): UnknownMember.JSON;
}
export declare namespace UnknownMember {
    interface JSON extends Member.JSON {
        kind: string;
        debug?: Member.Debug;
    }
}
export default UnknownMember;
