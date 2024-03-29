/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';

import JSON from './JSON.js';

/* *
 *
 *  Namespace
 *
 * */

export namespace NPM {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends JSON.Object {
        description?: string;
        name: string;
        repository?: string;
        version: string;
    }

    /* *
     *
     *  Constants
     *
     * */

    export const defaults: NPM.JSON = {
        name: 'Project',
        version: '0.0.0'
    };

    /* *
     *
     *  Functions
     *
     * */

    export async function load(
        path: string
    ): Promise<NPM.JSON> {
        try {
            const json = JSON.parse(`${await FS.promises.readFile(path)}`);

            if (
                json &&
                typeof json === 'object' &&
                !(json instanceof Array)
            ) {
                return {
                    description: (
                        JSON.get('string', json.description, '') ||
                        undefined
                    ),
                    name: JSON.get('string', json.name, defaults.name),
                    repository: (
                        JSON.get('string', json.repository?.url, '') ||
                        JSON.get('string', json.repository, '') ||
                        undefined
                    ),
                    version: JSON.get('string', json.version, defaults.version)
                }
            }
        }
        catch (e) {
            console.error(e);
        }

        return defaults;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default NPM;
