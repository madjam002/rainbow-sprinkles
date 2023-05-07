import type { CreateStylesOutput } from './types';
export declare function createStyles(property: string, scale: true | Record<string, string>, conditions: Record<string, Record<string, string>>, defaultCondition: string): CreateStylesOutput;
export declare type CreateStyles = typeof createStyles;
