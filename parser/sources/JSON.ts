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

    export interface PrimitiveMap {
        bigint: bigint;
        boolean: boolean;
        null: null;
        number: number;
        string: string;
        undefined: undefined;
    }

    /* *
     *
     *  Constants
     *
     * */

    export const parse = global.JSON.parse;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Retrieves a value as a specific primitive type and falls back to a
     * default value, if not successfull.
     */
    export function get<T extends keyof PrimitiveMap>(
        type: T,
        value: unknown,
        defaultValue: PrimitiveMap[T]
    ): PrimitiveMap[T] {
        if (typeof value === type) {
            return value as PrimitiveMap[T];
        } else {
            return defaultValue;
        }
    }

    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    export function stringify(
        obj: unknown
    ): string {
        const references: globalThis.Array<unknown> = [];

        return globalThis.JSON.stringify(
            obj,
            (_key: string, item: unknown): unknown => {
                if (
                    typeof item === 'object' &&
                    item
                ) {
                    if (
                        references.includes(item) ||
                        item instanceof Array &&
                        !item.length
                    ) {
                        return void 0;
                    }
                    else {
                        references.push(item);
                    }
                }
                return item;
            },
            '\t'
        );
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default JSON;
