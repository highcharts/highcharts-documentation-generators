"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUtilities = void 0;
class JSONUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(str) {
        return JSON.parse(str);
    }
    static stringify(obj) {
        const jsonUtilities = new JSONUtilities();
        try {
            return JSON.stringify(obj, jsonUtilities.filter, '\t');
        }
        finally {
            jsonUtilities.dispose();
        }
    }
    static toJSONArray(obj) {
        const jsonArray = [];
        let json;
        for (let node of obj) {
            json = node.toJSON();
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
    constructor() {
        this._memberReferences = [];
        this.filter = this.filter.bind(this);
    }
    /* *
     *
     *  Functions
     *
     * */
    dispose() {
        this._memberReferences.length = 0;
    }
    filter(_key, member) {
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
exports.JSONUtilities = JSONUtilities;
exports.default = JSONUtilities;
