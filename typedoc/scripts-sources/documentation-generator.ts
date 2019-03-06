/*
 * Copyright (C) Highsoft AS
 */

import * as Library from './library';
import * as Path from 'path';

/* *
 *
 *  Functions
 *
 * */

export function generate (
    tsConfigPath: string,
    outputDirectoryPath: string,
    outputJsonPath: string
): Promise<void> {

    Library.debug(__filename, ':generator', arguments);

    const tdConfigPath = Path.relative(
        Library.CWD, Path.join(__dirname, '../typedoc.json')
    );

    const themeDirectoryPath = Path.relative(
        Library.CWD, Path.join(__dirname, '../theme')
    );

    return Library
        .exec([
            'npx',
            'typedoc',
            '--json', '"' + outputJsonPath + '"',
            '--options', '"' + tdConfigPath + '"',
            '--out', '"' + outputDirectoryPath + '"',
            '--readme', '"README.md"',
            '--theme', '"' + themeDirectoryPath + '"',
            '--tsconfig', '"' + tsConfigPath + '"'
        ].join(' '))
        .then(() => undefined);
}
