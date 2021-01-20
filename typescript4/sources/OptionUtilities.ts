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

import JSDoc from './JSDoc';
import TypeScript from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Namespace
 *
 * */

namespace OptionUtilities {

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
                    name: nodePath.slice(0, i).join('.')
                }
            );
        }

        return node;
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
        }
    }

    export function produceOption(
        node: TypeScript.JSDoc,
        sourceFile: TypeScript.SourceFile
    ): (OptionDoc.OptionJSON|undefined) {
        const optionTag =  (
            JSDoc.extractTag('option', node, sourceFile) ||
            JSDoc.extractTag('optionCollection', node, sourceFile)
        );

        if (
            optionTag &&
            optionTag.comment
        ) {
            const tags = JSDoc.extractTags(node, sourceFile),
                option: OptionDoc.OptionJSON = {
                    name: optionTag.comment
                };

            let tag: TypeScript.JSDocTag,
                tagName: string,
                tagValue: string,
                value: OptionDoc.JSONValueType;

            for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
                tag = tags[i];
                tagName = tag.tagName.text;
                tagValue = tag.comment || '';
                value = option[tagName];
                if (typeof value === 'string') {
                    option[tagName] = [ value, tagValue ];
                } else if (
                    value instanceof Array
                ) {
                    value.push(tagValue);
                } else if (
                    tagName !== 'children'
                ) {
                    option[tagName] = tagValue;
                }
            }

            return option;
        }

        return;
    }

    export function produceOptions(
        node: TypeScript.SourceFile
    ): OptionDoc.OptionCollectionJSON {
        const options: OptionDoc.OptionCollectionJSON = {};

        if (TypeScript.isJSDoc(node)) {
            
        }

        return options;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default OptionUtilities;
