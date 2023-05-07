'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn = require('./createRuntimeFn-69aa68ae.cjs.dev.js');
var css = require('@vanilla-extract/css');
var functionSerializer = require('@vanilla-extract/css/functionSerializer');
require('@vanilla-extract/dynamic');

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function createStyles(property, scale, conditions, defaultCondition) {
  if (!conditions) {
    var cssVar = css.createVar(property);
    var className = css.style(createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, property, cssVar), property);
    return {
      vars: {
        "default": cssVar
      },
      dynamic: {
        "default": className
      },
      dynamicScale: scale,
      name: property
    };
  }
  var vars = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn.mapValues(conditions, function (_, conditionName) {
    return css.createVar("".concat(property, "-").concat(conditionName));
  });
  var classes = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn.mapValues(conditions, function (conditionValue, conditionName) {
    var styleValue = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, property, vars[conditionName]);
    if (conditionValue['@media']) {
      styleValue = {
        '@media': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@media'], styleValue)
      };
    }
    if (conditionValue['@supports']) {
      styleValue = {
        '@supports': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@supports'], styleValue)
      };
    }
    if (conditionValue['@container']) {
      styleValue = {
        '@container': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@container'], styleValue)
      };
    }
    if (conditionValue['selector']) {
      styleValue = {
        selectors: createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['selector'], styleValue)
      };
    }
    return css.style(styleValue, "".concat(property, "-").concat(conditionName));
  });
  return {
    dynamic: {
      "default": classes[defaultCondition],
      conditions: classes
    },
    name: property,
    vars: {
      conditions: vars,
      "default": vars[defaultCondition]
    },
    dynamicScale: scale
  };
}

function createStaticStyles(property, scale, conditions, defaultCondition) {
  var scaleObj = Array.isArray(scale) ? Object.assign.apply(Object, [{}].concat(createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._toConsumableArray(scale.map(function (s) {
    return createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, s, s);
  })))) : scale;
  var values = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn.mapValues(scaleObj, function (scaleValue, scaleKey) {
    if (!conditions) {
      return {
        "default": css.style(createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, property, scaleValue), "".concat(property, "-").concat(scaleKey))
      };
    }
    var classes = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn.mapValues(conditions, function (conditionValue, conditionName) {
      var styleValue = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, property, scaleValue);
      if (conditionValue['@media']) {
        styleValue = {
          '@media': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@media'], styleValue)
        };
      }
      if (conditionValue['@supports']) {
        styleValue = {
          '@supports': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@supports'], styleValue)
        };
      }
      if (conditionValue['@container']) {
        styleValue = {
          '@container': createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['@container'], styleValue)
        };
      }
      if (conditionValue['selector']) {
        styleValue = {
          selectors: createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn._defineProperty({}, conditionValue['selector'], styleValue)
        };
      }
      return css.style(styleValue, "".concat(property, "-").concat(scaleKey, "-").concat(conditionName));
    });
    return {
      conditions: classes,
      "default": classes[defaultCondition]
    };
  });
  return {
    values: values,
    name: property,
    staticScale: scale
  };
}

// Conditional Dynamic Properties + Shorthands

// Conditional Static Properties + Shorthands

// Conditional Dynamic Properties + Conditional Static Properties + Shorthands

// Dynamic Properties + Shorthands

// Static Properties + Shorthands

// Dynamic Properties + Static Properties + Shorthands

function defineProperties(options) {
  var conditions = options.conditions,
    dynamicProperties = options.dynamicProperties,
    staticProperties = options.staticProperties,
    shorthands = options.shorthands,
    defaultCondition = options.defaultCondition;
  var config = shorthands ? Object.fromEntries(Object.entries(options.shorthands).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      prop = _ref2[0],
      mappings = _ref2[1];
    return [prop, {
      mappings: mappings
    }];
  })) : {};
  for (var dynamicProp in dynamicProperties) {
    config[dynamicProp] = createStyles(dynamicProp, dynamicProperties[dynamicProp], conditions, defaultCondition);
  }
  for (var staticProp in staticProperties) {
    var style = createStaticStyles(staticProp, staticProperties[staticProp], conditions, defaultCondition);
    config[staticProp] = Object.assign({}, config === null || config === void 0 ? void 0 : config[staticProp], style);
  }
  return {
    config: config
  };
}

function createRainbowSprinkles() {
  for (var _len = arguments.length, configs = new Array(_len), _key = 0; _key < _len; _key++) {
    configs[_key] = arguments[_key];
  }
  var sprinkles = createRuntimeFn_dist_rainbowSprinklesCreateRuntimeFn.createRuntimeFn.apply(void 0, configs);
  return functionSerializer.addFunctionSerializer(sprinkles, {
    importPath: 'rainbow-sprinkles/createRuntimeFn',
    importName: 'createRuntimeFn',
    args: configs
  });
}

exports.createRainbowSprinkles = createRainbowSprinkles;
exports.defineProperties = defineProperties;
