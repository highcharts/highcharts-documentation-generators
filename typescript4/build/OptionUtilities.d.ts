/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type OptionDoc from './OptionDoc';
export declare namespace OptionUtilities {
    function getOption(name: string, options: OptionDoc.OptionCollectionJSON): OptionDoc.OptionJSON;
    function mergeOption(sourceOption: OptionDoc.OptionJSON, targetOption: OptionDoc.OptionJSON): OptionDoc.OptionJSON;
    function mergeOptions(sourceOptions: OptionDoc.OptionCollectionJSON, targetOptions: OptionDoc.OptionCollectionJSON): void;
}
export default OptionUtilities;
