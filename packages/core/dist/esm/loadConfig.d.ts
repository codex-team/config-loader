/**
 * Parse yaml file to object by path
 *
 * @template Config - the type describing structure of yaml file
 * @param paths - yaml file path
 */
export default function loadConfig<Config>(...paths: Array<string>): Config;
