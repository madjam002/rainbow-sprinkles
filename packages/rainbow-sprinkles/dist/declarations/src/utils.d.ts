import { CreateStylesOutput } from './types';
/**
 * Parses a string for things with '$'
 *
 * (-)? -> optionally captures '-', names it "negated"
 * \B\$           -> capture '$' when preceded by a "non-word" (whitespace, punctuation)
 * ([\w\-.]+)  -> capture the "word" following the '$', including hyphen and period characters
 * /g             -> capture all instances
 */
export declare const VALUE_REGEX: RegExp;
export declare function mapValues<Value, Obj extends Record<string, Value>, Result = Value>(obj: Obj & Record<string, Value>, callback: (value: Value, key: string, object: typeof obj) => Result): Record<keyof Obj, Result>;
/**
 * Takes a value and replaces all '$' values with the
 * values in the scale, if available
 *
 * Returns false if parsed value is in staticScale
 */
export declare function replaceVarsInValue(propValue: string, dynamicScale: CreateStylesOutput['dynamicScale'], staticScale?: CreateStylesOutput['staticScale']): string | false;
/**
 * Takes a value and replaces all '$' values with the
 * values in the scale, if available
 */
export declare function getValueConfig(propValue: string, scale: CreateStylesOutput['values']): CreateStylesOutput['values'][keyof CreateStylesOutput['values']] | null;
