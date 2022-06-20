import * as yaml from 'js-yaml';
import * as fs from 'fs';

/**
 * Parse yaml file to object by path
 *
 * @template Config - the type describing structure of yaml file
 *
 * @param path - yaml file path
 */
export default function<Config> (path: string): Config {
  const file = fs.readFileSync(path, 'utf8');

  return yaml.load(file) as Config;
}