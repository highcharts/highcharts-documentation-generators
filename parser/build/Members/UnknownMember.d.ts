/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';
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
