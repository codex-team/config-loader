"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = __importStar(require("js-yaml"));
const fs = __importStar(require("fs"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const lodash_isarray_1 = __importDefault(require("lodash.isarray"));
/**
 * Merge arrays, if there are arrays in objects
 *
 * @template Config - the type describing structure of yaml file
 *
 * @param objValue - object to merge with source
 * @param srcValue - source object
 */
function mergeArrays(objValue, srcValue) {
    if ((0, lodash_isarray_1.default)(objValue)) {
        return objValue.concat(srcValue);
    }
}
/**
 * Parse yaml file to object by path
 *
 * @template Config - the type describing structure of yaml file
 *
 * @param paths - yaml file path
 */
function default_1(...paths) {
    const files = [];
    const config = {};
    for (const path of paths) {
        files.push(yaml.load(fs.readFileSync(path, 'utf8')));
    }
    files.forEach((file) => {
        (0, lodash_merge_1.default)(config, file, mergeArrays);
    });
    return config;
}
exports.default = default_1;
