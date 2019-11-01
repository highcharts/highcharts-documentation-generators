/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as JS from "./JSON/index";

export class JSONUtilities {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse (str: string): object {
        return JSON.parse(str);
    }

    public static stringify (obj: object): string {

        const jsonUtilities = new JSONUtilities();

        try {
            return JSON.stringify(obj, jsonUtilities.filter, '\t');
        }
        finally {
            jsonUtilities.dispose();
        }
    }

    public static toJSONArray<T extends JS.JSONExporter>(
        obj: Array<T>
    ): Array<ReturnType<T['toJSON']>> {
        
        const jsonArray: Array<ReturnType<T['toJSON']>> = [];
        
        let json: ReturnType<T['toJSON']>;

        for (let node of obj) {

            json = node.toJSON() as ReturnType<T['toJSON']>;

            if (typeof json !== 'undefined') {
                jsonArray.push(json);
            }
        }

        return jsonArray;
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor () {

        this._memberReferences = [];

        this.filter = this.filter.bind(this);
    }

    /* *
     *
     *  Properties
     *
     * */

    private _memberReferences: Array<unknown>;

    /* *
     *
     *  Functions
     *
     * */

    private dispose(): void {
        this._memberReferences.length = 0;
    }

    private filter<T>(_key: string, member: T): (T|undefined) {

        if (!member) {
            return member;
        }

        switch (typeof member) {
            default:
                break;
            case 'object':
                const memberReferences = this._memberReferences;
                if (memberReferences.includes(member)) {
                    return;
                }
                memberReferences.push(member);
        }

        return member;
    }
}

export default JSONUtilities;
