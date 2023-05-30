# config-loader
Config loader for Cloud Native applications

## Features

- Configuration via YAML files
- Combining and inheriting a configuration from multiple files
- Override configuration values with environment variables
- Provide default values for configuration

## What's not included

- Reading command line arguments with config files locations
- Configuration validation

## Installation

```bash
npm install @codex-team/config-loader

yarn add @codex-team/config-loader
```

## Usage

In this example we will load configuration from `app-config.yaml` and `app-config.local.yaml` files.
[Zod](https://zod.dev/) is used for configuration validation, but you can use any other library.

```ts
import {loadConfig} from '@codex-team/config-loader';
import {z} from 'zod';

const AppConfig = z.object({
    host: z.string(),
    port: z.number(),
});

export type AppConfig = z.infer<typeof AppConfig>;

const defaultConfig: AppConfig = {
    host: '0.0.0.0',
    port: 3000,
};

const paths = [
    `./app-config.yaml`,
    `./app-config.local.yaml`,
];

const loadedConfig = loadConfig(...[defaultConfig, ...paths]);

const appConfig = AppConfig.parse(loadedConfig);

export default appConfig;
```
