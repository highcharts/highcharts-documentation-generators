/*
 * Copyright (C) Highsoft AS
 */

import * as Config from './config';
import * as Library from './library';

/* *
 *
 *  Functions
 *
 * */

export function generate (): Promise<void> {

    Config.DEBUG_MODE && Library.info(
        __filename, ':generator', arguments
    );

    return new Promise((resolve, reject) => {

        Library
            .exec('typedoc --help')
            .then(() => resolve())
            .catch(reject);
    });
}
