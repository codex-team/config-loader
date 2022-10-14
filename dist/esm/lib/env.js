const ENV_PREFIX = 'APP_CONFIG_';
// Update the same pattern in config package if this is changed
const CONFIG_KEY_PART_PATTERN = /^[a-z][a-z0-9]*(?:[-_][a-z][a-z0-9]*)*$/i;
/**
 * Safely parse a JSON string without throwing.
 *
 * @param str - string to parse
 */
function safeJsonParse(str) {
    try {
        return [null, JSON.parse(str)];
    }
    catch (err) {
        return [err, str];
    }
}
/**
 * Read runtime configuration from the environment.
 *
 * Only environment variables prefixed with APP_CONFIG_ will be considered.
 *
 * For each variable, the prefix will be removed, and rest of the key will
 * be split by '_'. Each part will then be used as keys to build up a nested
 * config object structure. The treatment of the entire environment variable
 * is case-sensitive.
 *
 * The value of the variable should be JSON serialized, as it will be parsed
 * and the type will be kept intact. For example "true" and true are treated
 * differently, as well as "42" and 42.
 *
 * For example, to set the config app.title to "My Title", use the following:
 *
 * APP_CONFIG_app_title='"My Title"'
 *
 * @param env - dict of environment variables
 */
export function readEnvConfig(env) {
    let data;
    for (const [name, value] of Object.entries(env)) {
        if (!value) {
            continue;
        }
        if (name.startsWith(ENV_PREFIX)) {
            const key = name.replace(ENV_PREFIX, '');
            const keyParts = key.split('_');
            let obj = (data = data ?? {});
            for (const [index, part] of keyParts.entries()) {
                if (!CONFIG_KEY_PART_PATTERN.test(part)) {
                    throw new TypeError(`Invalid env config key '${key}'`);
                }
                if (index < keyParts.length - 1) {
                    obj = (obj[part] = obj[part] ?? {});
                    if (typeof obj !== 'object' || Array.isArray(obj)) {
                        const subKey = keyParts.slice(0, index + 1).join('_');
                        throw new TypeError(`Could not nest config for key '${key}' under existing value '${subKey}'`);
                    }
                }
                else {
                    if (part in obj) {
                        throw new TypeError(`Refusing to override existing config at key '${key}'`);
                    }
                    try {
                        const [, parsedValue] = safeJsonParse(value);
                        if (parsedValue === null) {
                            throw new Error('value may not be null');
                        }
                        obj[part] = parsedValue;
                    }
                    catch (error) {
                        throw new TypeError(`Failed to parse JSON-serialized config value for key '${key}', ${error}`);
                    }
                }
            }
        }
    }
    return data ?? {};
}
