/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as D from './Doclets';
import TS from 'typescript';
export declare class DocletsUtilities {
    static loadFromNode(sourceFile: TS.SourceFile, node: TS.Node): D.Doclet;
    private constructor();
}
export default DocletsUtilities;
