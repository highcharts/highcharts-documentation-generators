/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
export declare class ModifiersUtilities {
    static getModifierArray(modifiers: (TS.ModifiersArray | undefined)): Array<string>;
    static getModifierString(modifier: TS.Modifier): (string | undefined);
}
export default ModifiersUtilities;
