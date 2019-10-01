/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Members/index';
import Project from './Project';
import TS from 'typescript';
export declare class MembersUtilities {
    static loadFromArguments(args: Array<string>): Project;
    static loadFromDirectory(directoryPath: string): Project;
    static loadFromNode(node: TS.Node): M.Member;
}
export default MembersUtilities;
