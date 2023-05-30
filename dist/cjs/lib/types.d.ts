/**
 * A type representing all allowed JSON primitive values.
 */
export declare type JsonPrimitive = number | string | boolean | null;
/**
 * A type representing all allowed JSON object values.
 */
export declare type JsonObject = {
    [key in string]?: JsonValue;
};
/**
 * A type representing all allowed JSON array values.
 */
export interface JsonArray extends Array<JsonValue> {
}
/**
 * A type representing all allowed JSON values.
 */
export declare type JsonValue = JsonObject | JsonArray | JsonPrimitive;
