/*
 * Copyright (C) Highsoft AS
 */

import * as Library from './library';

/* *
 *
 *  Functions
 *
 * */

function cli () {

    Library.debug(__filename, ':cli', arguments);

    process.stderr.write('\nnot implemented\n');
    process.exit(-1);
}

cli();
