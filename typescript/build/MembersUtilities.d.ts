/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Members/index';
import TS from 'typescript';
export declare class MembersUtilities {
    static loadFromNode(sourceFile: TS.SourceFile, node: TS.Node): M.Member;
    private constructor();
}
export default MembersUtilities;
