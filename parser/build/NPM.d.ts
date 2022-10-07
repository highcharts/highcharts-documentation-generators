/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON.js';
export declare namespace NPM {
    interface JSON extends JSON.Object {
        description?: string;
        name: string;
        repository?: string;
        version: string;
    }
    const defaults: NPM.JSON;
    function load(path: string): Promise<NPM.JSON>;
}
export default NPM;
