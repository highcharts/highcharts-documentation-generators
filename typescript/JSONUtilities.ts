/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

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
            return JSON.stringify(
                obj,
                jsonUtilities.filter,
                '\t'
            );
        }
        finally {
            jsonUtilities.dispose();
        }
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

    private filter<T>(key: string, member: T): (T|undefined) {

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
