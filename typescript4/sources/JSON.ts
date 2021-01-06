/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Namespace
 *
 * */

export namespace JSON {

    /* *
    *
    *  Declarations
    *
    * */

    export type Array = globalThis.Array<(Collection|Primitive)>;

    export type Collection = (Array|Object);

    export interface Object extends Record<string, (Collection|Primitive)> {
        [key: string]: (Collection|Primitive);
    }

    export type Primitive = (bigint|boolean|null|number|string|undefined);

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    export function stringify(obj: unknown): string {
        const references: globalThis.Array<unknown> = [];

        return global.JSON.stringify(
            obj,
            (_key: string, item: unknown): unknown => {
                if (typeof item === 'object' && item) {
                    if (references.includes(item)) {
                        return void 0;
                    } else {
                        references.push(item);
                    }
                }
                return item;
            },
            4
        );
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default JSON;
