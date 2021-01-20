/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type ImportedJSON from './JSON';
import type ProjectDoc from './ProjectDoc';
declare class OptionDoc {
    constructor(project: ProjectDoc);
    project: ProjectDoc;
    options: OptionDoc.OptionCollectionJSON;
    private getOptions;
    toJSON(): OptionDoc.JSON;
}
declare namespace OptionDoc {
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
    type JSONValueType = (string | Array<string> | OptionCollectionJSON | undefined);
    interface OptionJSON extends ImportedJSON.Object {
        [key: string]: JSONValueType;
        name: string;
        children?: OptionCollectionJSON;
    }
    interface OptionCollectionJSON extends ImportedJSON.Object {
        [key: string]: OptionJSON;
    }
}
export default OptionDoc;
