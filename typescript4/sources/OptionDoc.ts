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

import OptionUtilities from './OptionUtilities';

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


    private getOptions(): OptionDoc.OptionCollectionJSON {
        const optionDoc = this,
            targetOptions = optionDoc.options;

        if (!Object.keys(targetOptions).length) {
            const projectFiles = optionDoc.project.getFiles();

            let sourceOptions: OptionDoc.OptionCollectionJSON;

            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                sourceOptions = OptionUtilities.produceOptions(projectFiles[i]);
                OptionUtilities.mergeOptions(sourceOptions, targetOptions);
            }
        }

        return targetOptions;
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

    export type JSONValueType = (
        string|
        Array<string>|
        OptionCollectionJSON|
        undefined
    );

    export interface OptionJSON extends ImportedJSON.Object {
        [key: string]: JSONValueType;
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
