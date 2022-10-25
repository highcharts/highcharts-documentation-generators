/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
export declare class ModifiersUtilities {
    static getModifierArray(modifiers: (ReadonlyArray<TS.Modifier> | undefined)): Array<string>;
    static getModifierString(modifier: TS.Modifier): (string | undefined);
}
export default ModifiersUtilities;
