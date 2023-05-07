import type { CreateStylesOutput } from './types';
export declare function createStaticStyles(property: string, scale: ReadonlyArray<string> | Record<string, string>, conditions: Record<string, Record<string, string>>, defaultCondition: string): CreateStylesOutput;
