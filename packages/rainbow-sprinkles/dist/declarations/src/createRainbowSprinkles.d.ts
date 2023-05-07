import type { DefinePropertiesReturn } from './types';
import { SprinklesFn } from './createRuntimeFn';
export declare function createRainbowSprinkles<Configs extends ReadonlyArray<DefinePropertiesReturn>>(...configs: Configs): SprinklesFn<Configs>;
