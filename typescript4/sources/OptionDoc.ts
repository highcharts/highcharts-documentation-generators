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

import TypeScript from 'typescript';

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

    public optionTree: OptionDoc.OptionTreeJSON = {};

    /* *
     *
     *  Functions
     *
     * */

    private getOption(
        name: string,
        tree: OptionDoc.OptionTreeJSON
    ): OptionDoc.OptionJSON {
        const optionDoc = this,
            nodePath = name.split('.');

        let node: OptionDoc.OptionJSON = {
                name: '',
                children: tree
            };

        for (let i = 0, iEnd = (nodePath.length - 1); i <= iEnd; ++i) {
            if (!node.children) {
                node.children = {};
            }

            node = (
                node.children[nodePath[i]] ||
                {
                    name: nodePath.slice(0, i).join('.')
                }
            );
        }

        return node;
    }

    private getOptionsTree(): OptionDoc.OptionTreeJSON {
        const optionDoc = this,
            optionTree = optionDoc.optionTree;

        if (!Object.keys(optionTree).length) {
            const projectFiles = optionDoc.project.getFiles();

            let sourceOptionTree: OptionDoc.OptionTreeJSON;

            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptionTree = optionDoc.produceOptions(projectFiles[i]);
                Object
                    .values(sourceOptionTree)
                    .forEach(sourceOption => optionDoc.mergeOptions(
                        sourceOption,
                        optionTree
                    ));
            }
        }

        return optionTree;
    }

    private mergeOptions(
        option: OptionDoc.OptionJSON,
        tree: OptionDoc.OptionTreeJSON
    ): void {

    }


    private produceOptions(
        node: TypeScript.Node
    ): OptionDoc.OptionTreeJSON {
        const optionTree: OptionDoc.OptionTreeJSON = {};

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
            options: optionDoc.getOptionsTree()
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
        options: OptionTreeJSON;
        repository?: string;
        version?: string;
    }

    export interface OptionJSON extends ImportedJSON.Object {
        name: string;
        children?: OptionTreeJSON;
    }

    export interface OptionTreeJSON extends ImportedJSON.Object {
        [key: string]: OptionJSON;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default OptionDoc;
