import * as yaml from 'js-yaml';
import * as fs from 'fs';
import merge from 'lodash.merge';
import isArray from 'lodash.isarray';

/**
 * Merge arrays, if there are arrays in objects
 *
 * @template Config - the type describing structure of yaml file
 * @param objValue - object to merge with source
 * @param srcValue - source object
 */
function mergeArrays<Config>(objValue: Config, srcValue: Config): unknown {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * Parse yaml file to object by path
 *
 * @template Config - the type describing structure of yaml file
 * @param paths - yaml file path
 */
export default function loadConfig<Config>(...paths: Array<string>): Config {
  const files: Array<Config> = [];
  const config = {} as Config;

  for (const path of paths) {
    files.push(yaml.load(fs.readFileSync(path, 'utf8')) as Config);
  }

  files.forEach((file) => {
    merge(config, file, mergeArrays);
  });

  return config;
}