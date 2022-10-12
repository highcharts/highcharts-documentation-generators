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
    interface PrimitiveMap {
        bigint: bigint;
        boolean: boolean;
        null: null;
        number: number;
        string: string;
        undefined: undefined;
    }
    const parse: (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any;
    /**
     * Retrieves a value as a specific primitive type and falls back to a
     * default value, if not successfull.
     */
    function get<T extends keyof PrimitiveMap>(type: T, value: unknown, defaultValue: PrimitiveMap[T]): PrimitiveMap[T];
    /**
     * Converts a JavaScript object to JSON notation and filters circular
     * references by removing them.
     */
    function stringify(obj: unknown): string;
}
export default JSON;
