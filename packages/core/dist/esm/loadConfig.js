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
function mergeArrays(objValue, srcValue) {
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
export default function loadConfig(...paths) {
    const files = [];
    const config = {};
    for (const path of paths) {
        files.push(yaml.load(fs.readFileSync(path, 'utf8')));
    }
    files.forEach((file) => {
        merge(config, file, mergeArrays);
    });
    return config;
}
