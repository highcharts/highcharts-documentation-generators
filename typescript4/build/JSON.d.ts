/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
export declare namespace JSON {
    type Array = globalThis.Array<(Collection | Primitive)>;
    type Collection = (Array | Object);
    interface Object extends Record<string, (Collection | Primitive)> {
        [key: string]: (Collection | Primitive);
    }
    type Primitive = (bigint | boolean | null | number | string | undefined);
    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    function stringify(obj: unknown): string;
}
export default JSON;
