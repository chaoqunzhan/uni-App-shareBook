(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = 'onLoad';
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
  return MPPage(options);
};

var behavior = Behavior({
  created: function created() {
    initTriggerEvent(this);
  } });


Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (options.behaviors || (options.behaviors = [])).unshift(behavior);
  return MPComponent(options);
};

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getBehaviors(vueOptions) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    Behavior({
      properties: getProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        Behavior({
          properties: getProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function getProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handler = _this.$vm[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(_this.$vm, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

var hooks = [
'onHide',
'onError',
'onPageNotFound',
'onUniNViewMessage'];


function initVm(vm) {
  if (this.$vm) {// 百度竟然 onShow 在 onLaunch 之前？
    return;
  }
  {
    if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
      console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
    }
  }

  this.$vm = vm;

  this.$vm.$mp = {
    app: this };

}

function createApp(vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        {// 头条的 selectComponent 竟然是异步的
          initRefs(this);
        }
        initMocks(this, mocks);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      initVm.call(this, vm);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    },
    onShow: function onShow(args) {
      initVm.call(this, vm);

      this.$vm.__call_hook('onShow', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function initVm$1(VueComponent) {// 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return;
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this });


  this.$vm.__call_hook('created');
  this.$vm.$mount();
}

function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {
        initVm$1.call(this, VueComponent);
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        initVm$1.call(this, VueComponent);
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  return Component(pageOptions);
}

function initVm$2(VueComponent) {
  if (this.$vm) {
    return;
  }

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: this.properties };

  // 初始化 vue 实例
  this.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = this.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    this.$vm.$scopedSlots = this.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var behaviors = getBehaviors(vueOptions);

  var properties = getProperties(vueOptions.props, false, vueOptions.__file);

  var VueComponent = _vue.default.extend(vueOptions);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    behaviors: behaviors,
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVm$2.call(this, VueComponent);
      },
      ready: function ready() {
        initVm$2.call(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  return Component(componentOptions);
}

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$mp && vm.$mp[vm.mpType]){
        return vm.$mp[vm.mpType].is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          !vm._getFormData && warn(//fixed by xxxxxx uni://form-field 时不告警
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$mp[this.mpType];
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$mp && event) {
            this.$mp[this.mpType]['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$mp) {
                return this.$mp[this.mpType][method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\main.js":
/*!**********************************************!*\
  !*** E:/uni-App-shareBook/shareBook/main.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "E:\\uni-App-shareBook\\shareBook\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "E:\\uni-App-shareBook\\shareBook\\App.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\main.js?{\"page\":\"pages%2Fhome%2Fhome\"}":
/*!*****************************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/main.js?{"page":"pages%2Fhome%2Fhome"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\uni-App-shareBook\\shareBook\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _home = _interopRequireDefault(__webpack_require__(/*! ./pages/home/home.vue */ "E:\\uni-App-shareBook\\shareBook\\pages\\home\\home.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_home.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!*******************************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\uni-App-shareBook\\shareBook\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "E:\\uni-App-shareBook\\shareBook\\pages\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\main.js?{\"page\":\"pages%2Fupload%2Fupload\"}":
/*!*********************************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/main.js?{"page":"pages%2Fupload%2Fupload"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "E:\\uni-App-shareBook\\shareBook\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./pages/upload/upload.vue */ "E:\\uni-App-shareBook\\shareBook\\pages\\upload\\upload.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_upload.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\pages.json":
/*!*************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\static\\image\\bonner\\qqBg.jpg":
/*!*******************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/static/image/bonner/qqBg.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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b3ViQG/gAAAAAAAAAAAAQnJkVFVudEYjUmx0AAAAAAAAAAAAAAAAQmxkIFVudEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgAJOEJJTQQCAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4QklNBDAAAAAAAA0BAQEBAQEBAQEBAQEBADhCSU0ELQAAAAAABgABAAAAFjhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM/AAAABgAAAAAAAAAAAAAAyAAAAZAAAAAFZypoB5iYAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABkAAAAMgAAAAAAAAAAAAA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5DciOQ3IhaUbkNyI5DcnBYUTkNyI5DcnBaWDkMqblApwWlgVAqZUCihgVEqRUSitf//ZADhCSU0EIQAAAAAAUwAAAAEBAAAADwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAAABIAQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAIABDAEMAAAABADhCSU0EBgAAAAAABwABAQEAAQEA/+ERfmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4NCgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDctMTJUMTI6NDI6NDgrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDctMTJUMTM6NDA6MTkrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA3LTEyVDEzOjQwOjE5KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjZlNDM1YTUtZGYwYS00ZDRlLWJiOWMtNGQ0ZmViZGU1MTQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4NCgkJCTx4bXBNTTpIaXN0b3J5Pg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZjFmNTg4ZS1jZDU2LTBhNDItYjI3Mi1hMjA2NjQ2NWI0MTAiIHN0RXZ0OndoZW49IjIwMTgtMDctMTJUMTI6NDI6NDgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4NCgkJCQkJPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQxNGU5ZDZlLTcwNWItMjM0NS1iMDMxLWJhZDk0YWE5OGFmYiIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMzo0MDoxOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPg0KCQkJCQk8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPg0KCQkJCQk8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+DQoJCQkJCTxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNmU0MzVhNS1kZjBhLTRkNGUtYmI5Yy00ZDRmZWJkZTUxNDciIHN0RXZ0OndoZW49IjIwMTgtMDctMTJUMTM6NDA6MTkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4NCgkJCQk8L3JkZjpTZXE+DQoJCQk8L3htcE1NOkhpc3Rvcnk+DQoJCQk8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMTRlOWQ2ZS03MDViLTIzNDUtYjAzMS1iYWQ5NGFhOThhZmIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIi8+DQoJCQk8cGhvdG9zaG9wOlRleHRMYXllcnM+DQoJCQkJPHJkZjpCYWc+DQoJCQkJCTxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0i6IGU57O7UVEiIHBob3Rvc2hvcDpMYXllclRleHQ9IuiBlOezu1FRIi8+DQoJCQkJCTxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iMTEyOTYxOTk1OSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iMTEyOTYxOTk1OSIvPg0KCQkJCTwvcmRmOkJhZz4NCgkJCTwvcGhvdG9zaG9wOlRleHRMYXllcnM+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCTwvcmRmOlJERj4NCjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg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"

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\static\\image\\bonner\\weiboBg.jpg":
/*!**********************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/static/image/bonner/weiboBg.jpg ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QnzRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAdAAAAcgEyAAIAAAAUAAAAj4dpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKQAyMDE4OjA3OjEyIDEzOjM5OjIwAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABkKADAAQAAAABAAAAyAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAi9AAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAUACgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A7RMU6Yqm6YWTFOQYmNDwfgmKBSGJTKUE8CfgoppXBiUxTlMQfA6iRpyPFBcGJTFOU0EmAJJMAd5KC4MSmKk4OaYcC0+BEeXdRKauDEpk5USklYpk6C/JxmP9N9zGv42lwmUEgM0xTlRIdPKbIkbRMv7tf90lSZKTMOSQjISGnTQg7hL/AP/Q7RO1jnuDGCXHgfxP8lMn3uFZrEBp+kQNXfyXO/d/kqm6WvRsOYx9NdFbhtkip/G6wfzm/wDkWbv0LlTcC1xa4Frhy06EI1g/VaZ/es/76oW5F9rQ2x5eBwDHPHYJSI/AIgCPEWd990mA1xzKy0Ts3OIGnA2/9U5VdfzhDvzhxB/O0R3/AKGp1R0utj1P5DB7m1/8Y/6T07635LPtFTd9g9t7GjXd+ba1o/0n5yBGldRquBqXEdjUb8v++4lsJrfUNhLdzA4ta76Iga3X/u0s/wDBHq9XVj1hha4EYu81nfo3dvd+kf8AQ2fmqljPsNd9DGwTTYTA9zn/AEa939Td7Gq6++uxzmvew1Vuc28OknaNrPcd22rdc32f6T/B/wCFUmOq/ixZeIy614fy/S4pOTbjPrtFDnsNnDoMNaf3XOcGrQ+y02ODrjXY9lNJG17pn6Lnu2FjXbv8HZvWfkNtbdZ6w22Fzi7w1M+3+SrtcC1lQsfVfZj1NaGtE+wertbY5zdrn7XVqOFWRXXY/gy5OLhieLpdx/weL5f0V+rBraDoHH1iGkyS3cPUfsd6j9v0f/USyStPqGRRZTWHsvDnmyxocQC10mrbY1+/2t/crWYU3NXFp4L+XBEKN7liVFxa0FziGtaJc46AAdypFZXVry54xmn2Nh1nm46sb/Y+ko2zjhxyA+0oM3qVl5NdJNdHE8Od/W/cZ/IVEt9pAHyWpT0r2+plP9NoEloIBA8bLHe1iF9q+rQd6frNJ43E2bf+3f5pGidgT5Nn7xhxVEfb3/6Kc9Ux662MaH3FrGgn6IkAD8/3f9FExsyrLLmhrq7GiYJkRxLSFG3peO9s0uNZIBbruYZ/6Xu/rKpjvOFe8WVySA10HUCd0t/NfuTJRjIURfmsEccongvjGuu7pnVgJTpmvZawPYZY7g8J1HGBjKyb9MY+MpRv1Fif/9HtExTpiqbpqL3FrWE+1pJaPCfpKIJBBBgjUEchSLXbN8e2ds+cboUUCkUxKaSOCR8DCKaL5LRW4lrtrto3QR29qG4FpLXCHAwR5hAgpBB6qZbZU4urcWOILSRzB5UHPcaxUT+jaSQ3tJ/Od+87+spenYWl+x21urnQYAHmouY9rtpadxAIHJgjc3hDVcKvpaz7LXx6j3Pj6O4kx8JUXkvA3ndADRP7o+i1O5rhy1w8yCPyqKaV4rovZbZYGCxxd6bdrZ5iZQynKYoFIFbMSs9tUdTLn/vlzZ8SJrWgUK2ptkHhw4cEGSEqv+sDFodYotyjjYYdsqvefUJ4JbGxrv3v3tn+kWdmdJx8Qmtu617wCx5O0sg+/exvts9X8xb1jBYzZcwPbzI8f3kEYeMDJDneRThOhTFLFZJ3vqh6PW+rAax/Ac70x4Nn/qd+9RzWh90j81oaT56q6S4iGjaOBHh5KAoaDLtfJMJsk92bFUK8BSPDrNdAB/OJcB5H/cjJymQUTZJ7v//S7RJrHPcGMEvcYaPNJIOc2YMbhtPwPZU3S8k7jjip4bJp9Vrd/f6DgbWj+t7tiEKHNtdW9gs2iT79jdv5tvqfuJOsrOOKw3a/eHOI4IDS3dr9F/uQhtLh6jS9vBEwY49p/kpEjRUQdd/2+bqRW19pZscfULyBPLPph0i92/3N+hWz/g1nloGbtdrufIne2HO9zeAy72uRLM0eo/02H0X7pnR8v+m9ljf5v91Ae9jHE47ny5pbvsA3CdPYWn6W3270ZyBquhW44SF3fqDqP3m1jCxzq/Ugue2x35oq9sPf9JvqfpHs9FZ+Y7IqyPWDNjntLGODSxx/M9rd9j/U2+2t6Z+WH5LLNgrrZYLCGTJkt379ff8AQQaLa6Mj1jX6kElonbqT7XcO+ilOYOm2u6ceOUdTr6a4e/8AV4kuXbbXU3DdY6xw995c4u9x+jUN35taplGfZSWPDa3b7Imx795Gu9xHsZ7noKikbO7PjFCqrv4nvoxKYpymKYyMSolSKiUkrFMnKiglZMU6YoJWTJ0ySX//0+0TFOmKpumFkxTqJTUhYpk5TILgxTFOmKBXBiUycpimrgxKYpymKC5iVEqRUSklYqKkVEoJWTFOUxQSsmTpkkv/2f/tEfZQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAANcAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABJbWcgAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAABWghaDeLvn9uAAAAAAAKcHJvb2ZTZXR1cAAAAAEAAAAAQmx0bmVudW0AAAAMYnVpbHRpblByb29mAAAACXByb29mQ01ZSwA4QklNBDsAAAAAAi0AAAAQAAAAAQAAAAAAEnByaW50T3V0cHV0T3B0aW9ucwAAABcAAAAAQ3B0bmJvb2wAAAAAAENsYnJib29sAAAAAABSZ3NNYm9vbAAAAAAAQ3JuQ2Jvb2wAAAAAAENudENib29sAAAAAABMYmxzYm9vbAAAAAAATmd0dmJvb2wAAAAAAEVtbERib29sAAAAAABJbnRyYm9vbAAAAAAAQmNrZ09iamMAAAABAAAAAAAAUkdCQwAAAAMAAAAAUmQgIGRvdWJAb+AAAAAAAAAAAABHcm4gZG91YkBv4AAAAAAAAAAAAEJsICBkb3ViQG/gAAAAAAAAAAAAQnJkVFVudEYjUmx0AAAAAAAAAAAAAAAAQmxkIFVudEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgAIOEJJTQQCAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4QklNBDAAAAAAAA0BAQEBAQEBAQEBAQEBADhCSU0ELQAAAAAABgABAAAAFzhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM/AAAABgAAAAAAAAAAAAAAyAAAAZAAAAAFZypoB5iYAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABkAAAAMgAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAMgAAAAAUmdodGxvbmcAAAGQAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAADIAAAAAFJnaHRsb25nAAABkAAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51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Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xMlQxMjo0Mjo0OCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNy0xMlQxMzozOToyMCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDctMTJUMTM6Mzk6MjArMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NzVhNDUxMC0wM2VkLTQ3NGEtYmU0Ny04OGM1YzMwMmQ0MGYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMjo0Mjo0OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTI3NzA3ZDMtYzNmOS0xYzRhLTg4ZDUtYzYxMzU4NDk4NWUyIiBzdEV2dDp3aGVuPSIyMDE4LTA3LTEyVDEzOjM5OjIwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3NWE0NTEwLTAzZWQtNDc0YS1iZTQ3LTg4YzVjMzAyZDQwZiIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMzozOToyMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTI3NzA3ZDMtYzNmOS0xYzRhLTg4ZDUtYzYxMzU4NDk4NWUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIvPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IuS4quS6uuW+ruWNmiIgcGhvdG9zaG9wOkxheWVyVGV4dD0i5Liq5Lq65b6u5Y2aIi8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0i5bCP5o+Q576kWiIgcGhvdG9zaG9wOkxheWVyVGV4dD0i5bCP5o+Q576kWiIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNG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"

/***/ }),

/***/ "E:\\uni-App-shareBook\\shareBook\\static\\image\\bonner\\wxBg.jpg":
/*!*******************************************************************!*\
  !*** E:/uni-App-shareBook/shareBook/static/image/bonner/wxBg.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xMlQxMjo0Mjo0OCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNy0xMlQxMzozODoxMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDctMTJUMTM6Mzg6MTIrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YjZiYWU4Yi1hM2IwLTdiNDctYTM4OC1hMWM4MDJlYzNjMjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MmYxZjU4OGUtY2Q1Ni0wYTQyLWIyNzItYTIwNjY0NjViNDEwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMjo0Mjo0OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2EzMWI1NTMtNzgzNy0zZjQ4LTlmOTMtNDYzMTRiZDM2M2MxIiBzdEV2dDp3aGVuPSIyMDE4LTA3LTEyVDEzOjM4OjEyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjliNmJhZThiLWEzYjAtN2I0Ny1hMzg4LWExYzgwMmVjM2MyOCIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMzozODoxMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2EzMWI1NTMtNzgzNy0zZjQ4LTlmOTMtNDYzMTRiZDM2M2MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJmMWY1ODhlLWNkNTYtMGE0Mi1iMjcyLWEyMDY2NDY1YjQxMCIvPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IuW+ruS/oeWFrOS8l+WPtyIgcGhvdG9zaG9wOkxheWVyVGV4dD0i5b6u5L+h5YWs5LyX5Y+3Ii8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iY3F6MjF0b3AiIHBob3Rvc2hvcDpMYXllclRleHQ9ImNxejIxdG9wIi8+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6VGV4dExheWVycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAAAAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJA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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map