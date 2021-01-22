/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type ImportedJSON from './JSON';
import ProjectDoc from './ProjectDoc';
import Utilities from './Utilities';
export declare class OptionDoc {
    static load(path: string, optionTag?: string, collectionTag?: string): OptionDoc;
    constructor(project: ProjectDoc, optionTag: string, collectionTag: string);
    readonly collectionTag: string;
    readonly project: ProjectDoc;
    readonly options: OptionDoc.OptionCollectionJSON;
    readonly optionTag: string;
    private getMeta;
    getOptions(): OptionDoc.OptionCollectionJSON;
    private parseOption;
    private parseOptions;
    toJSON(): OptionDoc.JSON;
}
export declare namespace OptionDoc {
    interface JSON extends ImportedJSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        name?: string;
        options: OptionCollectionJSON;
        repository?: string;
        version?: string;
    }
    interface OptionCollectionJSON extends ImportedJSON.Object {
        [key: string]: OptionJSON;
    }
    interface OptionJSON extends ImportedJSON.Object {
        name: string;
        description?: string;
        tags?: OptionTagsJSON;
        meta?: OptionMetaJSON;
        children?: OptionCollectionJSON;
    }
    interface OptionMetaJSON extends Utilities.Meta {
        source: string;
    }
    interface OptionTagsJSON extends ImportedJSON.Object {
        [key: string]: (string | Array<string>);
    }
}
export default OptionDoc;
