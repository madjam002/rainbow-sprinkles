import { assignInlineVars } from '@vanilla-extract/dynamic';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

/**
 * Parses a string for things with '$'
 *
 * (-)? -> optionally captures '-', names it "negated"
 * \B\$           -> capture '$' when preceded by a "non-word" (whitespace, punctuation)
 * ([\w\-.]+)  -> capture the "word" following the '$', including hyphen and period characters
 * /g             -> capture all instances
 */
var VALUE_REGEX = /(-)?\$?([\w\-.]+)/g;
function mapValues(obj, callback) {
  var result = {};
  for (var _key in obj) {
    Object.assign(result, _defineProperty({}, _key, callback(obj[_key], _key, obj)));
  }
  return result;
}

/**
 * Takes a value and replaces all '$' values with the
 * values in the scale, if available
 *
 * Returns false if parsed value is in staticScale
 */
function replaceVarsInValue(propValue, dynamicScale, staticScale) {
  if (Array.isArray(staticScale) && staticScale.indexOf(propValue) > -1) {
    return false;
  }
  var foundStatic = false;
  var parsed = propValue.replace(VALUE_REGEX, function (match) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var negated = args[0],
      token = args[1];
    var v = "".concat(negated ? '-' : '').concat(token);
    if (staticScale !== null && staticScale !== void 0 && staticScale[v]) {
      foundStatic = true;
      return match;
    }
    if (dynamicScale !== null && dynamicScale !== void 0 && dynamicScale[v]) {
      return dynamicScale[v];
    }
    return match;
  });
  return foundStatic ? false : parsed;
}

/**
 * Takes a value and replaces all '$' values with the
 * values in the scale, if available
 */
function getValueConfig(propValue, scale) {
  var match;
  var parsed = [];
  while (match = VALUE_REGEX.exec(propValue)) {
    parsed.push.apply(parsed, _toConsumableArray(match.slice(1)));
  }
  if (parsed.length === 2) {
    var negated = parsed[0],
      token = parsed[1];
    var v = "".concat(negated ? '-' : '').concat(token);
    if (v in scale) {
      return scale[v];
    }
  }
  return null;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

function assignClasses(propertyConfig, propValue, cache) {
  if (!propValue && propValue !== 0) {
    return '';
  }

  // Value is a string or number, ie not responsive
  if (typeof propValue === 'string' || typeof propValue === 'number') {
    return handleEntry(propertyConfig, "".concat(propValue), cache);
  }
  var keys = Object.keys(propValue);

  // If no entries, exit gracefully
  if (keys.length < 1) {
    return '';
  }
  var className = keys.map(function (condition) {
    var rawValueAtCondition = "".concat(propValue[condition]);
    return handleEntry(propertyConfig, rawValueAtCondition, cache, condition);
  }).filter(Boolean);
  return className.join(' ').trim();
}
function handleEntry(propertyConfig, propValue, cache, condition) {
  var dynamic = propertyConfig.dynamic,
    values = propertyConfig.values,
    propName = propertyConfig.name,
    staticScale = propertyConfig.staticScale;
  var cacheKey = condition ? "".concat(condition).concat(propValue) : propValue;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Check for static value first
  if (values) {
    if (Array.isArray(staticScale) && staticScale.includes(propValue)) {
      var result = condition ? values[propValue].conditions[condition] : values[propValue]["default"];
      cache.set(cacheKey, result);
      return result;
    }
    var parsedValue = getValueConfig(propValue, values);
    if (parsedValue) {
      var _result = condition ? parsedValue.conditions[condition] : parsedValue["default"];
      cache.set(cacheKey, _result);
      return _result;
    }
  }
  if (dynamic) {
    var _result2 = condition ? dynamic.conditions[condition] : dynamic["default"];
    cache.set(cacheKey, _result2);
    return _result2;
  }

  // If the property is not dynamic, and unrecognized value is provided
  // Quietly warn
  // eslint-disable-next-line no-console
  console.error("Rainbow Sprinkles: invalid value provided to prop '".concat(propName, "'. Expected one of ").concat(Object.keys(values).map(function (className) {
    return "\"".concat(className, "\"");
  }).join(', '), ". Received: ").concat(JSON.stringify(propValue), "."));
  return '';
}

function createAssignVars(varsToAssign, cache) {
  return function assignVars(propertyConfig, propValue) {
    var vars = propertyConfig.vars,
      dynamicScale = propertyConfig.dynamicScale,
      staticScale = propertyConfig.staticScale;
      propertyConfig.values;
      var dynamic = propertyConfig.dynamic;
    if (!dynamic) {
      return varsToAssign;
    }

    // Value is a string, ie not responsive
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      var parsedValue;
      if (cache.has(propValue)) {
        parsedValue = cache.get(propValue);
      } else {
        parsedValue = replaceVarsInValue("".concat(propValue), dynamicScale, staticScale);
        cache.set(propValue, parsedValue);
      }

      // If the propValue matches a static value,
      // don't assign any variables
      if (!parsedValue) {
        return varsToAssign;
      }
      varsToAssign[vars["default"]] = parsedValue;
      return varsToAssign;
    }

    // If no entries, exit gracefully
    if (propValue && Object.keys(propValue).length < 1 || propValue == null) {
      return varsToAssign;
    }
    for (var condition in propValue) {
      var value = propValue[condition];
      if (typeof value === 'string' || typeof value === 'number') {
        var _parsedValue = void 0;
        if (cache.has(value)) {
          _parsedValue = cache.get(value);
        } else {
          _parsedValue = replaceVarsInValue("".concat(value), dynamicScale, staticScale);
          cache.set(value, _parsedValue);
        }
        if (!_parsedValue) {
          continue;
        }
        varsToAssign[vars.conditions[condition]] = _parsedValue;
      }
    }
    return varsToAssign;
  };
}

var createRuntimeFn = function createRuntimeFn() {
  for (var _len = arguments.length, configs = new Array(_len), _key = 0; _key < _len; _key++) {
    configs[_key] = arguments[_key];
  }
  var cssConfig = Object.assign.apply(Object, [{}].concat(_toConsumableArray(configs.map(function (c) {
    return c.config;
  }))));
  var properties = Object.keys(cssConfig);
  var propertiesSet = new Set(properties);
  var shorthandNames = properties.filter(function (property) {
    return 'mappings' in cssConfig[property];
  });

  /**
   * Cache the inline styles and classes for properties and their values
   *
   * Structure in object notation would look like:
   * cache: {
   *   propName: {
   *      class: {
   *        propValue: 'className'
   *      },
   *      style: {
   *        propValue: 'inline style value'
   *      }
   *   }
   * }
   */
  var cache = new Map();
  var fn = function fn(props) {
    var style = {};
    var className = [];
    var otherProps = {};
    var shorthands = {};
    var nonShorthands = _objectSpread2({}, props);
    var hasShorthands = false;
    var _iterator = _createForOfIteratorHelper(shorthandNames),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var shorthand = _step.value;
        var value = props[shorthand];
        if (value != null) {
          var sprinkle = cssConfig[shorthand];
          hasShorthands = true;
          var _iterator2 = _createForOfIteratorHelper(sprinkle.mappings),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var propMapping = _step2.value;
              shorthands[propMapping] = value;
              if (nonShorthands[propMapping] == null) {
                delete nonShorthands[propMapping];
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var finalProps = hasShorthands ? _objectSpread2(_objectSpread2({}, shorthands), nonShorthands) : props;
    for (var property in finalProps) {
      if (!propertiesSet.has(property)) {
        otherProps[property] = props[property];
        continue;
      }
      var propertyConfig = cssConfig[property];
      var propValue = finalProps[property];
      if ('mappings' in propertyConfig) {
        continue;
      }
      var classCache = void 0;
      var styleCache = void 0;
      if (propertyConfig) {
        if (cache.has(property)) {
          var c = cache.get(property);
          classCache = c.get('class');
          styleCache = c.get('style');
        } else {
          var propCache = new Map();
          classCache = new Map();
          styleCache = new Map();
          propCache.set('class', classCache);
          propCache.set('style', styleCache);
          cache.set(property, propCache);
        }
        var assignVars = createAssignVars(style, styleCache);
        className.push(assignClasses(propertyConfig, propValue, classCache));
        assignVars(propertyConfig, propValue);
      }
    }
    return {
      className: className.join(' ').trim(),
      style: assignInlineVars(style),
      otherProps: otherProps
    };
  };
  return Object.assign(fn, {
    properties: propertiesSet
  });
};

export { _unsupportedIterableToArray as _, _defineProperty as a, _toConsumableArray as b, createRuntimeFn as c, mapValues as m };
