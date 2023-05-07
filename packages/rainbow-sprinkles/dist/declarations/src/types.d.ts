import type { Properties } from './css';
export interface CSSProperties extends Properties {
}
declare type PropertyCssValue<T> = T extends keyof CSSProperties ? CSSProperties[T] : never;
export declare type ConfigStaticProperties = {
    [k in keyof CSSProperties]?: ReadonlyArray<CSSProperties[k]> | Record<string, CSSProperties[k]>;
};
export declare type ConfigDynamicProperties = {
    [k in keyof CSSProperties]?: Record<string, CSSProperties[k]> | true;
};
export declare type ConfigConditions = {
    [conditionName: string]: {
        '@media'?: string;
        '@supports'?: string;
        '@container'?: string;
        selector?: string;
    };
};
export declare type ConfigShorthands<DynamicProperties, StaticProperties> = {
    [shorthandName: string]: Array<keyof DynamicProperties | keyof StaticProperties>;
};
export declare type ConditionalPropertyValue = {
    default: string;
    conditions: {
        [conditionName: string]: string;
    };
};
declare type NonConditionalPropertyValue = {
    default: string;
};
export declare type DynamicProperty = {
    dynamic: NonConditionalPropertyValue;
    vars: NonConditionalPropertyValue;
    dynamicScale: {
        [token: string]: string;
    } | true;
    name: string;
};
export declare type DynamicConditionalProperty = {
    dynamic: ConditionalPropertyValue;
    vars: ConditionalPropertyValue;
    dynamicScale: {
        [token: string]: string;
    } | true;
    name: string;
};
export declare type StaticPropertyArray = {
    values: {
        [value: string]: NonConditionalPropertyValue;
    };
    staticScale: string[];
    name: string;
};
export declare type StaticConditionalPropertyArray = {
    values: {
        [value: string]: ConditionalPropertyValue;
    };
    staticScale: string[];
    name: string;
};
export declare type StaticProperty = {
    values: {
        [value: string]: NonConditionalPropertyValue;
    };
    staticScale: {
        [token: string]: string;
    };
    name: string;
};
export declare type StaticConditionalProperty = {
    values: {
        [value: string]: ConditionalPropertyValue;
    };
    staticScale: {
        [token: string]: string;
    };
    name: string;
};
export declare type StaticDynamicPropertyArray = {
    dynamic: NonConditionalPropertyValue;
    values: {
        [value: string]: NonConditionalPropertyValue;
    };
    name: string;
    staticScale: string[];
    dynamicScale: true;
    vars: NonConditionalPropertyValue;
};
export declare type StaticDynamicConditionalPropertyArray = {
    dynamic: ConditionalPropertyValue;
    values: {
        [value: string]: ConditionalPropertyValue;
    };
    name: string;
    staticScale: string[];
    dynamicScale: true;
    vars: ConditionalPropertyValue;
};
export declare type StaticDynamicProperty = {
    dynamic: NonConditionalPropertyValue;
    values: {
        [value: string]: NonConditionalPropertyValue;
    };
    name: string;
    vars: NonConditionalPropertyValue;
    staticScale: {
        [token: string]: string;
    };
    dynamicScale: true;
};
export declare type StaticDynamicConditionalProperty = {
    dynamic: ConditionalPropertyValue;
    values: {
        [value: string]: ConditionalPropertyValue;
    };
    name: string;
    vars: ConditionalPropertyValue;
    staticScale: {
        [token: string]: string;
    };
    dynamicScale: true;
};
export declare type ShorthandProperty = {
    mappings: string[];
};
export declare type SprinkleProperties = {
    [k: string]: DynamicProperty | StaticProperty | StaticPropertyArray | StaticDynamicPropertyArray | StaticDynamicProperty | DynamicConditionalProperty | StaticConditionalProperty | StaticConditionalPropertyArray | StaticDynamicConditionalPropertyArray | StaticDynamicConditionalProperty | ShorthandProperty;
};
/**
 * All of the possible permutations of a Sprinkle Property, combined
 * together and made conditional
 */
export declare type CreateStylesOutput = {
    dynamic?: {
        default: string;
        conditions?: {
            [condition: string]: string;
        };
    };
    values?: {
        [value: string]: {
            default: string;
            conditions?: {
                [condition: string]: string;
            };
        };
    };
    name: string;
    vars?: {
        default: string;
        conditions?: {
            [condition: string]: string;
        };
    };
    staticScale?: ReadonlyArray<string> | Record<string, string>;
    dynamicScale?: true | Record<string, string>;
};
export declare type DefinePropertiesReturn = {
    config: SprinkleProperties;
};
declare type ValueOrConditionObject<T, Conditions extends ConditionalPropertyValue> = T | null | Partial<Record<keyof Conditions['conditions'], T | null>>;
declare type ValueOrConditionObjectStatic<T, Values extends {
    [k: string]: ConditionalPropertyValue;
}> = T | null | {
    [Condition in keyof Values[keyof Values]['conditions']]?: T | null;
};
export declare type PrefixValue<T> = T extends `-${infer Root}` ? `-$${Root}` : `$${(string | number) & T}`;
export declare type ChildSprinkle<Sprinkle extends SprinkleProperties[keyof SprinkleProperties]> = Sprinkle extends StaticDynamicConditionalProperty ? ValueOrConditionObject<PropertyCssValue<Sprinkle['name']> | PrefixValue<keyof Sprinkle['staticScale']> | keyof Sprinkle['staticScale'], Sprinkle['vars']> : Sprinkle extends StaticDynamicConditionalPropertyArray ? ValueOrConditionObject<PropertyCssValue<Sprinkle['name']>, Sprinkle['vars']> : Sprinkle extends DynamicConditionalProperty ? Sprinkle['dynamicScale'] extends boolean ? ValueOrConditionObject<PropertyCssValue<Sprinkle['name']>, Sprinkle['vars']> : ValueOrConditionObject<PropertyCssValue<Sprinkle['name']> | PrefixValue<keyof Sprinkle['dynamicScale']>, Sprinkle['vars']> : Sprinkle extends StaticDynamicConditionalPropertyArray ? ValueOrConditionObject<Sprinkle['staticScale'][number], Sprinkle['dynamic']> : Sprinkle extends StaticDynamicConditionalProperty ? ValueOrConditionObjectStatic<PrefixValue<keyof Sprinkle['staticScale']>, Sprinkle['values']> : Sprinkle extends StaticConditionalProperty ? ValueOrConditionObjectStatic<PrefixValue<keyof Sprinkle['staticScale']> | keyof Sprinkle['staticScale'], Sprinkle['values']> : Sprinkle extends StaticConditionalPropertyArray ? ValueOrConditionObjectStatic<Sprinkle['staticScale'][number], Sprinkle['values']> : Sprinkle extends DynamicProperty ? PropertyCssValue<Sprinkle['name']> | (Sprinkle['dynamicScale'] extends boolean ? never : PrefixValue<keyof Sprinkle['dynamicScale']>) : Sprinkle extends StaticProperty ? PrefixValue<keyof Sprinkle['staticScale']> | keyof Sprinkle['staticScale'] : Sprinkle extends StaticPropertyArray ? Sprinkle['staticScale'][number] : Sprinkle extends StaticDynamicProperty ? PrefixValue<keyof Sprinkle['staticScale']> | PropertyCssValue<Sprinkle['name']> : Sprinkle extends StaticDynamicPropertyArray ? PropertyCssValue<Sprinkle['name']> : never;
export declare type ChildSprinkles<Sprinkles extends SprinkleProperties> = {
    [Prop in keyof Sprinkles]?: Sprinkles[Prop] extends ShorthandProperty ? ChildSprinkle<Sprinkles[Sprinkles[Prop]['mappings'][number]]> : ChildSprinkle<Sprinkles[Prop]>;
};
export declare type SprinklesProps<Args extends ReadonlyArray<any>> = Args extends [
    infer L,
    ...infer R
] ? (L extends DefinePropertiesReturn ? ChildSprinkles<L['config']> : never) & SprinklesProps<R> : {};
export declare type RuntimeFnReturn = {
    style: Record<string, string>;
    className: string;
    otherProps: Record<string, any>;
};
export {};
