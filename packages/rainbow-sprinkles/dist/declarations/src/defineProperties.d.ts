import type { ConfigConditions, ConfigStaticProperties, ConfigDynamicProperties, ConfigShorthands } from './types';
declare type ConditionalMap<Conditions> = {
    default: string;
    conditions: Record<keyof Conditions, string>;
};
declare type ReturnConditionalDynamic<DynamicProperties extends ConfigDynamicProperties, Conditions extends ConfigConditions> = {
    config: {
        [Property in keyof DynamicProperties]: {
            dynamic: ConditionalMap<Conditions>;
            dynamicScale: DynamicProperties[Property];
            name: Property;
            vars: ConditionalMap<Conditions>;
        };
    };
};
declare type ReturnDynamic<DynamicProperties extends ConfigDynamicProperties> = {
    config: {
        [Property in keyof DynamicProperties]: {
            dynamic: {
                default: string;
            };
            dynamicScale: DynamicProperties[Property];
            name: Property;
            vars: {
                default: string;
            };
        };
    };
};
declare type Values<Property, Result> = {
    [Value in Property extends ReadonlyArray<any> ? Property[number] : Property extends Array<any> ? Property[number] : keyof Property]: Result;
};
declare type ReturnConditionalStatic<StaticProperties extends ConfigStaticProperties, Conditions extends ConfigConditions> = {
    config: {
        [Property in keyof StaticProperties]: {
            values: Values<StaticProperties[Property], ConditionalMap<Conditions>>;
            staticScale: StaticProperties[Property];
            name: Property;
        };
    };
};
declare type ReturnStatic<StaticProperties extends ConfigStaticProperties> = {
    config: {
        [Property in keyof StaticProperties]: {
            values: Values<StaticProperties[Property], {
                default: string;
            }>;
            staticScale: StaticProperties[Property];
            name: Property;
        };
    };
};
declare type ReturnShorthands<Shorthands extends {
    [k: string]: Array<string | number | symbol>;
}> = {
    config: {
        [Shorthand in keyof Shorthands]: {
            mappings: Shorthands[Shorthand];
        };
    };
};
export declare type OptionsConditionalDynamic<DynamicProperties extends ConfigDynamicProperties, Conditions extends ConfigConditions, Shorthands extends {
    [k: string]: Array<keyof DynamicProperties>;
}> = {
    dynamicProperties: DynamicProperties;
    conditions: Conditions;
    defaultCondition: keyof Conditions;
    shorthands?: Shorthands;
};
export declare type OptionsConditionalStatic<StaticProperties extends ConfigStaticProperties, Conditions extends ConfigConditions, Shorthands extends {
    [k: string]: Array<keyof StaticProperties>;
}> = {
    staticProperties: StaticProperties;
    conditions: Conditions;
    defaultCondition: keyof Conditions;
    shorthands?: Shorthands;
};
export declare type OptionsConditionalBoth<DynamicProperties extends ConfigDynamicProperties, StaticProperties extends ConfigStaticProperties, Conditions extends ConfigConditions, Shorthands extends ConfigShorthands<DynamicProperties, StaticProperties>> = {
    dynamicProperties: DynamicProperties;
    staticProperties: StaticProperties;
    conditions: Conditions;
    defaultCondition: keyof Conditions;
    shorthands?: Shorthands;
};
export declare type OptionsDynamic<DynamicProperties extends ConfigDynamicProperties, Shorthands extends {
    [k: string]: Array<keyof DynamicProperties>;
}> = {
    dynamicProperties: DynamicProperties;
    shorthands?: Shorthands;
};
export declare type OptionsStatic<StaticProperties extends ConfigStaticProperties, Shorthands extends {
    [k: string]: Array<keyof StaticProperties>;
}> = {
    staticProperties: StaticProperties;
    shorthands?: Shorthands;
};
export declare type OptionsBoth<DynamicProperties extends ConfigDynamicProperties, StaticProperties extends ConfigStaticProperties, Shorthands extends ConfigShorthands<DynamicProperties, StaticProperties>> = {
    dynamicProperties: DynamicProperties;
    staticProperties: StaticProperties;
    shorthands?: Shorthands;
};
export declare function defineProperties<DynamicProperties extends ConfigDynamicProperties, Conditions extends ConfigConditions, Shorthands extends {
    [k: string]: Array<keyof DynamicProperties>;
}>(options: OptionsConditionalDynamic<DynamicProperties, Conditions, Shorthands>): ReturnConditionalDynamic<DynamicProperties, Conditions> & ReturnShorthands<Shorthands>;
export declare function defineProperties<StaticProperties extends ConfigStaticProperties, Conditions extends ConfigConditions, Shorthands extends {
    [k: string]: Array<keyof StaticProperties>;
}>(options: OptionsConditionalStatic<StaticProperties, Conditions, Shorthands>): ReturnConditionalStatic<StaticProperties, Conditions> & ReturnShorthands<Shorthands>;
export declare function defineProperties<DynamicProperties extends ConfigDynamicProperties, StaticProperties extends ConfigStaticProperties, Conditions extends ConfigConditions, Shorthands extends ConfigShorthands<DynamicProperties, StaticProperties>>(options: OptionsConditionalBoth<DynamicProperties, StaticProperties, Conditions, Shorthands>): ReturnConditionalStatic<StaticProperties, Conditions> & ReturnConditionalDynamic<DynamicProperties, Conditions> & ReturnShorthands<Shorthands>;
export declare function defineProperties<DynamicProperties extends ConfigDynamicProperties, Shorthands extends {
    [k: string]: Array<keyof DynamicProperties>;
}>(options: OptionsDynamic<DynamicProperties, Shorthands>): ReturnDynamic<DynamicProperties> & ReturnShorthands<Shorthands>;
export declare function defineProperties<StaticProperties extends ConfigStaticProperties, Shorthands extends {
    [k: string]: Array<keyof StaticProperties>;
}>(options: OptionsStatic<StaticProperties, Shorthands>): ReturnStatic<StaticProperties> & ReturnShorthands<Shorthands>;
export declare function defineProperties<DynamicProperties extends ConfigDynamicProperties, StaticProperties extends ConfigStaticProperties, Shorthands extends ConfigShorthands<DynamicProperties, StaticProperties>>(options: OptionsBoth<DynamicProperties, StaticProperties, Shorthands>): ReturnStatic<StaticProperties> & ReturnDynamic<DynamicProperties> & ReturnShorthands<Shorthands>;
export {};
