/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type OptionDoc from './OptionDoc';

import TypeScript from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Namespace
 *
 * */

export namespace OptionUtilities {

    /* *
     *
     *  Functions
     *
     * */

    export function getOption(
        name: string,
        options: OptionDoc.OptionCollectionJSON
    ): OptionDoc.OptionJSON {
        const nodePath = name.split('.');

        let node: OptionDoc.OptionJSON = {
            name: '',
            children: options
        };

        for (let i = 0, iEnd = (nodePath.length - 1); i <= iEnd; ++i) {
            if (!node.children) {
                node.children = {};
            }

            node = node.children[nodePath[i]] = (
                node.children[nodePath[i]] ||
                {
                    name: nodePath.slice(0, i + 1).join('.')
                }
            );
        }

        return node;
    }

    export function mergeOption(
        sourceOption: OptionDoc.OptionJSON,
        targetOption: OptionDoc.OptionJSON
    ): OptionDoc.OptionJSON {
        Utilities.mergeObjects(
            sourceOption,
            targetOption,
            [ 'children', 'name' ]
        );

        if (sourceOption.children) {
            if (!targetOption.children) {
                targetOption.children = {};
            }
            mergeOptions(
                sourceOption.children,
                targetOption.children
            );
        }

        return targetOption;
    }

    export function mergeOptions(
        sourceOptions: OptionDoc.OptionCollectionJSON,
        targetOptions: OptionDoc.OptionCollectionJSON
    ): void {
        const names = Object.keys(sourceOptions);

        let name: string,
            sourceOption: OptionDoc.OptionJSON,
            targetOption: OptionDoc.OptionJSON;

        for (let i = 0, iEnd = names.length; i < iEnd; ++i) {
            name = names[i];
            sourceOption = sourceOptions[name];
            targetOption = getOption(name, targetOptions);
            mergeOption(sourceOption, targetOption);
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default OptionUtilities;
