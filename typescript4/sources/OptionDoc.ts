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

import type ImportedJSON from './JSON';
import type ProjectDoc from './ProjectDoc';

import JSDoc from './JSDoc';
import TypeScript from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Class
 *
 * */

class OptionDoc {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (project: ProjectDoc) {
        this.project = project;
    }

    /* *
     *
     *  Properties
     *
     * */

    public project: ProjectDoc;

    public options: OptionDoc.OptionCollectionJSON = {};

    /* *
     *
     *  Functions
     *
     * */

    private getOption(
        name: string,
        options: OptionDoc.OptionCollectionJSON = this.options
    ): OptionDoc.OptionJSON {
        const optionDoc = this,
            nodePath = name.split('.');

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

    private getOptions(): OptionDoc.OptionCollectionJSON {
        const optionDoc = this,
            targetOptions = optionDoc.options;

        if (!Object.keys(targetOptions).length) {
            const projectFiles = optionDoc.project.getFiles();

            let sourceOptions: OptionDoc.OptionCollectionJSON;

            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptions = optionDoc.produceOptions(projectFiles[i]);
                optionDoc.mergeOptions(sourceOptions, targetOptions);
            }
        }

        return targetOptions;
    }

    private mergeOptions(
        sourceOptions: OptionDoc.OptionCollectionJSON,
        targetOptions: OptionDoc.OptionCollectionJSON
    ): void {
        const optionDoc = this,
            names = Object.keys(sourceOptions);

        let name: string,
            sourceOption: OptionDoc.OptionJSON,
            targetOption: OptionDoc.OptionJSON;

        for (let i = 0, iEnd = names.length; i < iEnd; ++i) {
            name = names[i];
            sourceOption = sourceOptions[name];
            targetOption = optionDoc.getOption(name, targetOptions);
            Utilities.mergeObjects(
                sourceOption,
                targetOption,
                [ 'children', 'name' ]
            );
            if (sourceOption.children) {
                if (!targetOption.children) {
                    targetOption.children = {};
                }
                optionDoc.mergeOptions(
                    sourceOption.children,
                    targetOption.children
                );
            }
        }
    }

    private produceOptions(
        node: TypeScript.Node
    ): OptionDoc.OptionCollectionJSON {
        const optionTree: OptionDoc.OptionCollectionJSON = {};

        if (TypeScript.isJSDoc(node)) {

        }

        return optionTree;
    }

    public toJSON(): OptionDoc.JSON {
        const optionDoc = this,
            {
                branch,
                commit,
                date,
                description,
                name,
                repository,
                version
            } = optionDoc.project;

        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            options: optionDoc.getOptions()
        };
    }
}

/* *
 *
 *  Class Namespace
 *
 * */

namespace OptionDoc {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends ImportedJSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        name?: string;
        options: OptionCollectionJSON;
        repository?: string;
        version?: string;
    }

    export interface OptionJSON extends ImportedJSON.Object {
        name: string;
        children?: OptionCollectionJSON;
    }

    export interface OptionCollectionJSON extends ImportedJSON.Object {
        [key: string]: OptionJSON;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default OptionDoc;
