/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type OptionDoc from './OptionDoc';
import TypeScript from 'typescript';
declare namespace OptionUtilities {
    function getOption(name: string, options: OptionDoc.OptionCollectionJSON): OptionDoc.OptionJSON;
    function mergeOptions(sourceOptions: OptionDoc.OptionCollectionJSON, targetOptions: OptionDoc.OptionCollectionJSON): void;
    function produceOption(node: TypeScript.JSDoc, sourceFile: TypeScript.SourceFile): (OptionDoc.OptionJSON | undefined);
    function produceOptions(node: TypeScript.SourceFile): OptionDoc.OptionCollectionJSON;
}
export default OptionUtilities;
