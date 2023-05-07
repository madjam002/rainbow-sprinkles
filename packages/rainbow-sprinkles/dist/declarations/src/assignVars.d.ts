import { CreateStylesOutput } from './types';
export declare function createAssignVars(varsToAssign: Record<string, string>, cache: Map<number | string, string | false>): (propertyConfig: CreateStylesOutput, propValue: unknown) => Record<string, string>;
