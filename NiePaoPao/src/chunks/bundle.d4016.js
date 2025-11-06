System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/drongo-cc.mjs", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env'], function (exports) {
  var _inheritsLoose, _regeneratorRuntime, _createForOfIteratorHelperLoose, _construct, _assertThisInitialized, _createClass, _decorator, size, Layout, EventTarget, Node, Asset, sys, error$1, Scheduler, director, cc, debug, log$1, warn$1, game, js, Game, Director, assetManager, dragonBones, sp, Animation, TweenSystem, SpriteFrame, Texture2D, resources, dynamicAtlasManager, NodePool, EDITOR;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _construct = module.construct;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      _decorator = module._decorator;
      size = module.size;
      Layout = module.Layout;
      EventTarget = module.EventTarget;
      Node = module.Node;
      Asset = module.Asset;
      sys = module.sys;
      error$1 = module.error;
      Scheduler = module.Scheduler;
      director = module.director;
      cc = module;
      debug = module.debug;
      log$1 = module.log;
      warn$1 = module.warn;
      game = module.game;
      js = module.js;
      Game = module.Game;
      Director = module.Director;
      assetManager = module.assetManager;
      dragonBones = module.dragonBones;
      sp = module.sp;
      Animation = module.Animation;
      TweenSystem = module.TweenSystem;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      resources = module.resources;
      dynamicAtlasManager = module.dynamicAtlasManager;
      NodePool = module.NodePool;
    }, function (module) {
      EDITOR = module.EDITOR;
    }],
    execute: function () {
      exports({
        Key: Key,
        autoBindToWindow: autoBindToWindow
      });

      /** 继承单例（类型安全） */
      var mk_instance_base = exports('instance_base', /*#__PURE__*/function () {
        function mk_instance_base() {}
        /** 单例方法 */
        mk_instance_base.instance = function instance() {
          var self = this;
          if (!self._instance) {
            for (var _len = arguments.length, args_as_ = new Array(_len), _key = 0; _key < _len; _key++) {
              args_as_[_key] = arguments[_key];
            }
            self._instance = _construct(self, args_as_);
          }
          return self._instance;
        };
        return mk_instance_base;
      }());
      /**
       * 默认的ticker管理器实现
       */
      var TickerManagerImpl = /*#__PURE__*/function (_mk_instance_base) {
        _inheritsLoose(TickerManagerImpl, _mk_instance_base);
        function TickerManagerImpl() {
          var _this;
          _this = _mk_instance_base.call(this) || this;
          //注册心跳
          _this.__tickerManager = new TickManagerComponent();
          Scheduler.enableForTarget(_this.__tickerManager);
          director.getScheduler().scheduleUpdate(_this.__tickerManager, 0, false);
          return _this;
        }
        /**
         * 添加心跳
         * @param value
         */
        var _proto = TickerManagerImpl.prototype;
        _proto.addTicker = function addTicker(value) {
          this.__tickerManager.addTicker(value);
        }
        /**
         * 删除心跳
         * @param value
         */;
        _proto.removeTicker = function removeTicker(value) {
          this.__tickerManager.removeTicker(value);
        }
        /**
         * 下一帧回调
         * @param value
         * @param caller
         */;
        _proto.callNextFrame = function callNextFrame(value, caller) {
          this.__tickerManager.callNextFrame(value, caller);
        }
        /**
         * 清理下一帧回调请求(如果存在的话)
         * @param value
         * @param caller
         */;
        _proto.clearNextFrame = function clearNextFrame(value, caller) {
          this.__tickerManager.clearNextFrame(value, caller);
        };
        return TickerManagerImpl;
      }(mk_instance_base);
      var TickManagerComponent = /*#__PURE__*/function () {
        function TickManagerComponent() {
          this.__tickerList = [];
          this.__nextFrameCallBacks = [];
        }
        var _proto2 = TickManagerComponent.prototype;
        _proto2.update = function update(dt) {
          var handler;
          while (this.__nextFrameCallBacks.length) {
            handler = this.__nextFrameCallBacks.shift();
            handler.callBack.apply(handler.caller);
          }
          for (var index = 0; index < this.__tickerList.length; index++) {
            var element = this.__tickerList[index];
            element.tick(dt);
          }
        };
        _proto2.addTicker = function addTicker(value) {
          var index = this.__tickerList.indexOf(value);
          if (index >= 0) {
            throw new Error("Ticker 重复添加！");
          }
          this.__tickerList.push(value);
        };
        _proto2.removeTicker = function removeTicker(value) {
          var index = this.__tickerList.indexOf(value);
          if (index < 0) {
            throw new Error("找不到要删除的Tick！");
          }
          this.__tickerList.splice(index, 1);
        };
        _proto2.callNextFrame = function callNextFrame(value, caller) {
          for (var index = 0; index < this.__nextFrameCallBacks.length; index++) {
            var element = this.__nextFrameCallBacks[index];
            //重复
            if (element.equal(value, caller)) {
              return;
            }
          }
          this.__nextFrameCallBacks.push(new NextFrameHandler(value, caller));
        };
        _proto2.clearNextFrame = function clearNextFrame(value, caller) {
          for (var index = 0; index < this.__nextFrameCallBacks.length; index++) {
            var element = this.__nextFrameCallBacks[index];
            //删除
            if (element.equal(value, caller)) {
              this.__nextFrameCallBacks.splice(index, 1);
            }
          }
        };
        return TickManagerComponent;
      }();
      var NextFrameHandler = /*#__PURE__*/function () {
        function NextFrameHandler(callBack, caller) {
          this.callBack = callBack;
          this.caller = caller;
        }
        var _proto3 = NextFrameHandler.prototype;
        _proto3.equal = function equal(callBack, caller) {
          if (this.caller !== caller) {
            return false;
          }
          if (this.callBack !== callBack) {
            return false;
          }
          return true;
        };
        return NextFrameHandler;
      }();
      var TickerManager = exports('TickerManager', TickerManagerImpl.instance());
      var TimerImpl = /*#__PURE__*/function (_mk_instance_base2) {
        _inheritsLoose(TimerImpl, _mk_instance_base2);
        function TimerImpl() {
          var _this2;
          _this2 = _mk_instance_base2.call(this) || this;
          _this2.__lastTime = 0;
          _this2.reset();
          TickerManager.addTicker(_assertThisInitialized(_this2));
          return _this2;
        }
        /**
         * 重新校准
         * @param time  时间起点，如果不设置则获取系统当前时间点
         */
        var _proto4 = TimerImpl.prototype;
        _proto4.reset = function reset() {
          //当前时间转秒
          this.__lastTime = Date.now() / 1000;
        };
        _proto4.tick = function tick(dt) {
          this.__lastTime += dt;
        }
        /**
         * 当前时间(推荐使用)
         */;
        _createClass(TimerImpl, [{
          key: "currentTime",
          get: function get() {
            return this.__lastTime;
          }
          /**
           * 绝对时间(注意效率较差，不推荐使用！)
           */
        }, {
          key: "absTime",
          get: function get() {
            this.reset();
            return this.currentTime;
          }
        }]);
        return TimerImpl;
      }(mk_instance_base);
      var Timer = exports('Timer', TimerImpl.instance());

      /**自动绑定到window对象 调试用 */
      function autoBindToWindow(constructor) {
        var className = constructor.name;
        self[className] = constructor;
      }
      var __decorate = function (decorators, target, key, desc) {
        var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var util = exports('util', /*#__PURE__*/function () {
        function util() {}
        /**
         * 深度拷贝
         * @param {any} sObj 拷贝的对象
         * @returns
         */
        util.clone = function clone(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }
          var s = {};
          if (sObj.constructor === Array) {
            s = [];
          }
          for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.clone(sObj[i]);
            }
          }
          return s;
        }
        /**
         * 将object转化为数组
         * @param { any} srcObj
         * @returns
         */;
        util.objectToArray = function objectToArray(srcObj) {
          var resultArr = [];
          // to array
          for (var _key2 in srcObj) {
            if (!srcObj.hasOwnProperty(_key2)) {
              continue;
            }
            resultArr.push(srcObj[_key2]);
          }
          return resultArr;
        }
        /**
         * !#zh 将数组转化为object。
         */
        /**
         * 将数组转化为object。
         * @param { any} srcObj
         * @param { string} objectKey
         * @returns
         */;
        util.arrayToObject = function arrayToObject(srcObj, objectKey) {
          var resultObj = {};
          // to object
          for (var _key3 in srcObj) {
            if (!srcObj.hasOwnProperty(_key3) || !srcObj[_key3][objectKey]) {
              continue;
            }
            resultObj[srcObj[_key3][objectKey]] = srcObj[_key3];
          }
          return resultObj;
        }
        /**
         * 根据权重,计算随机内容
         * @param {arrany} weightArr
         * @param {number} totalWeight 权重
         * @returns
         */;
        util.getWeightRandIndex = function getWeightRandIndex(weightArr, totalWeight) {
          var randWeight = Math.floor(Math.random() * totalWeight);
          var sum = 0;
          var weightIndex = 0;
          for (weightIndex = 0; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];
            if (randWeight < sum) {
              break;
            }
          }
          return weightIndex;
        }
        /**
         * 从n个数中获取m个随机数
         * @param {Number} n   总数
         * @param {Number} m    获取数
         * @returns {Array} array   获取数列
         */;
        util.getRandomNFromM = function getRandomNFromM(n, m) {
          var array = [];
          var intRd = 0;
          var count = 0;
          while (count < m) {
            if (count >= n + 1) {
              break;
            }
            intRd = this.getRandomInt(0, n);
            var flag = 0;
            for (var i = 0; i < count; i++) {
              if (array[i] === intRd) {
                flag = 1;
                break;
              }
            }
            if (flag === 0) {
              array[count] = intRd;
              count++;
            }
          }
          return array;
        }
        /**
         * 获取随机整数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns
         */;
        util.getRandomInt = function getRandomInt(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }
        /**
         * 获取随机数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns
         */;
        util.getRandom = function getRandom(min, max) {
          return Math.random() * (max - min) + min;
        }
        /**
         * 判断传入的参数是否为空的Object。数组或undefined会返回false
         * @param obj
         */;
        util.isEmptyObject = function isEmptyObject(obj) {
          var result = true;
          if (obj && obj.constructor === Object) {
            for (var _key4 in obj) {
              if (obj.hasOwnProperty(_key4)) {
                result = false;
                break;
              }
            }
          } else {
            result = false;
          }
          return result;
        }
        /**
         * 判断是否是新的一天
         * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
         * @returns {boolean}
         */;
        util.isNewDay = function isNewDay(dateValue) {
          // todo：是否需要判断时区？
          var oldDate = new Date(dateValue);
          var curDate = new Date();
          //@ts-ignore
          var oldYear = oldDate.getYear();
          var oldMonth = oldDate.getMonth();
          var oldDay = oldDate.getDate();
          //@ts-ignore
          var curYear = curDate.getYear();
          var curMonth = curDate.getMonth();
          var curDay = curDate.getDate();
          if (curYear > oldYear) {
            return true;
          } else {
            if (curMonth > oldMonth) {
              return true;
            } else {
              if (curDay > oldDay) {
                return true;
              }
            }
          }
          return false;
        }
        /**
         * 获取对象属性数量
         * @param {object}o 对象
         * @returns
         */;
        util.getPropertyCount = function getPropertyCount(o) {
          var n,
            count = 0;
          for (n in o) {
            if (o.hasOwnProperty(n)) {
              count++;
            }
          }
          return count;
        }
        /**
         * 返回一个差异化数组（将array中diff里的值去掉）
         * @param array
         * @param diff
         */;
        util.difference = function difference(array, diff) {
          var result = [];
          if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
          }
          var length = array.length;
          for (var i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
              result.push(array[i]);
            }
          }
          return result;
        }
        // 模拟传msg的uuid
        ;

        util.simulationUUID = function simulationUUID() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
        util.trim = function trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        /**
         * 判断当前时间是否在有效时间内
         * @param {String|Number} start 起始时间。带有时区信息
         * @param {String|Number} end 结束时间。带有时区信息
         */;
        util.isNowValid = function isNowValid(start, end) {
          var startTime = new Date(start);
          var endTime = new Date(end);
          var result = false;
          if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
          }
          return result;
        }
        /**
         * 返回相隔天数
         * @param start
         * @param end
         * @returns
         */;
        util.getDeltaDays = function getDeltaDays(start, end) {
          start = new Date(start);
          end = new Date(end);
          var startYear = start.getFullYear();
          var startMonth = start.getMonth() + 1;
          var startDate = start.getDate();
          var endYear = end.getFullYear();
          var endMonth = end.getMonth() + 1;
          var endDate = end.getDate();
          start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
          end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
          var deltaTime = end - start;
          return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
        }
        /**
         * 获取数组最小值
         * @param array 数组
         * @returns
         */;
        util.getMin = function getMin(array) {
          var result = null;
          if (array.constructor === Array) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
              if (i === 0) {
                result = Number(array[0]);
              } else {
                result = result > Number(array[i]) ? Number(array[i]) : result;
              }
            }
          }
          return result;
        }
        /**
         * 格式化两位小数点
         * @param time
         * @returns
         */;
        util.formatTwoDigits = function formatTwoDigits(time) {
          //@ts-ignore
          return (Array(2).join(0) + time).slice(-2);
        }
        /**
         * 根据格式返回时间
         * @param date  时间
         * @param fmt 格式
         * @returns
         */;
        util.formatDate = function formatDate(date, fmt) {
          var o = {
            "M+": date.getMonth() + 1,
            //月份
            "d+": date.getDate(),
            //日
            "h+": date.getHours(),
            //小时
            "m+": date.getMinutes(),
            //分
            "s+": date.getSeconds(),
            //秒
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //季度
            "S": date.getMilliseconds() //毫秒
          };

          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
          //@ts-ignore
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          return fmt;
        }
        /**
         * 获取格式化后的日期（不含小时分秒）
         */;
        util.getDay = function getDay() {
          var date = new Date();
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        /**
         * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
         * @param {Number} leftSec
         */;
        util.formatTimeForSecond = function formatTimeForSecond(leftSec, withoutSeconds) {
          if (withoutSeconds === void 0) {
            withoutSeconds = false;
          }
          var timeStr = '';
          var sec = leftSec % 60;
          var leftMin = Math.floor(leftSec / 60);
          leftMin = leftMin < 0 ? 0 : leftMin;
          var hour = Math.floor(leftMin / 60);
          var min = leftMin % 60;
          if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
          } else {
            timeStr += '00:';
          }
          timeStr += min > 9 ? min.toString() : '0' + min;
          if (!withoutSeconds) {
            timeStr += ':';
            timeStr += sec > 9 ? sec.toString() : '0' + sec;
          }
          return timeStr;
        }
        /**
         *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
         *
         * @param {Number} ms
         */;
        util.formatTimeForMillisecond = function formatTimeForMillisecond(ms) {
          var second = Math.floor(ms / 1000 % 60);
          var minute = Math.floor(ms / 1000 / 60 % 60);
          var hour = Math.floor(ms / 1000 / 60 / 60);
          return {
            'hour': hour,
            'minute': minute,
            'second': second
          };
        }
        /**
         * 将数组内容进行随机排列
         * @param {Array}arr 需要被随机的数组
         * @returns
         */;
        util.rand = function rand(arr) {
          var arrClone = this.clone(arr);
          // 首先从最大的数开始遍历，之后递减
          for (var i = arrClone.length - 1; i >= 0; i--) {
            // 随机索引值randomIndex是从0-arrClone.length中随机抽取的
            var randomIndex = Math.floor(Math.random() * (i + 1));
            // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
            var itemIndex = arrClone[randomIndex];
            arrClone[randomIndex] = arrClone[i];
            arrClone[i] = itemIndex;
          }
          // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
          return arrClone;
        }
        /**
         * 返回指定小数位的数值
         * @param {number} num
         * @param {number} idx
         */;
        util.formatNumToFixed = function formatNumToFixed(num, idx) {
          if (idx === void 0) {
            idx = 0;
          }
          return Number(num.toFixed(idx));
        }
        /**
         * 用于数值到达另外一个目标数值之间进行平滑过渡运动效果
         * @param {number} targetValue 目标数值
         * @param {number} curValue 当前数值
         * @param {number} ratio    过渡比率
         * @returns
         */;
        util.lerp = function lerp(targetValue, curValue, ratio) {
          if (ratio === void 0) {
            ratio = 0.25;
          }
          var v = curValue;
          if (targetValue > curValue) {
            v = curValue + (targetValue - curValue) * ratio;
          } else if (targetValue < curValue) {
            v = curValue - (curValue - targetValue) * ratio;
          }
          return v;
        }
        /**
         * 洗牌函数
         *
         * @static
         * @param {*} arr
         * @returns
         * @memberof util
         */;
        util.shuffle = function shuffle(arr) {
          if (Array.isArray(arr)) {
            var newArr = arr.concat();
            newArr.sort(function () {
              return 0.5 - Math.random();
            });
            return newArr;
          }
        }
        /**
         * 获取数组中随机一个元素
         * @param arr
         * @returns
         */;
        util.getRandomItemFromArray = function getRandomItemFromArray(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
        };
        return util;
      }());
      util = exports('util', __decorate([ccclass("util")], util));
      var key = new Proxy({}, {
        get: function get(target, key) {
          return key;
        }
      });
      function Key() {
        return key;
      }
      var __awaiter$8 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**
       * http 模块
       * @noInheritDoc
       * @remarks
       *
       * - post/get 支持
       *
       * - 支持任意类型的返回数据解析
       *
       * - 支持自定义编解码器
       */
      var mk_http = /*#__PURE__*/function (_mk_instance_base3) {
        _inheritsLoose(mk_http, _mk_instance_base3);
        function mk_http() {
          return _mk_instance_base3.apply(this, arguments) || this;
        }
        var _proto5 = mk_http.prototype;
        /* ------------------------------- 功能 ------------------------------- */
        /** GET */
        _proto5.get = function get(url_s_, config_) {
          return __awaiter$8(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this._open("GET", url_s_, config_);
                case 2:
                  return _context.abrupt("return", _context.sent);
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
        }
        /** POST */;
        _proto5.post = function post(url_s_, config_) {
          return __awaiter$8(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this._open("POST", url_s_, config_);
                case 2:
                  return _context2.abrupt("return", _context2.sent);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
        }
        /** 通用方法 */;
        _proto5._open = function _open(type_s_, url_s_, config_) {
          return __awaiter$8(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _this3 = this;
            var xml_http, config;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  xml_http = new XMLHttpRequest();
                  config = new mk_http_.config(config_); // 初始化数据
                  config = Object.assign(new mk_http_.config(), config);
                  xml_http.timeout = config.timeout_n;
                  if (config.return_type) {
                    xml_http.responseType = config.return_type;
                  }
                  _context4.next = 7;
                  return new Promise(function (resolve_f) {
                    /** 超时定时器 */
                    var timeout_timer = setTimeout(function () {
                      resolve_f(null);
                    }, config.timeout_n);
                    xml_http.onreadystatechange = function () {
                      return __awaiter$8(_this3, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                        var result, buf, data, k_n;
                        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                          while (1) switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!(xml_http.readyState === 4 && xml_http.status >= 200 && xml_http.status < 400)) {
                                _context3.next = 21;
                                break;
                              }
                              _context3.t0 = xml_http.responseType;
                              _context3.next = _context3.t0 === "" ? 4 : _context3.t0 === "text" ? 4 : _context3.t0 === "arraybuffer" ? 6 : _context3.t0 === "blob" ? 11 : _context3.t0 === "document" ? 15 : _context3.t0 === "json" ? 17 : 19;
                              break;
                            case 4:
                              result = xml_http.response;
                              return _context3.abrupt("break", 19);
                            case 6:
                              buf = new Uint8Array(xml_http.response);
                              data = "";
                              for (k_n = 0; k_n < buf.byteLength; k_n++) {
                                data += String.fromCharCode(buf[k_n]);
                              }
                              result = "data:image/png;base64," + window.btoa(data);
                              return _context3.abrupt("break", 19);
                            case 11:
                              _context3.next = 13;
                              return new Promise(function (resolve2_f) {
                                var read = new FileReader();
                                read.onload = function () {
                                  resolve2_f(result);
                                };
                                read.readAsDataURL(xml_http.response);
                              });
                            case 13:
                              result = _context3.sent;
                              return _context3.abrupt("break", 19);
                            case 15:
                              result = xml_http.response;
                              return _context3.abrupt("break", 19);
                            case 17:
                              result = xml_http.response;
                              return _context3.abrupt("break", 19);
                            case 19:
                              clearTimeout(timeout_timer);
                              resolve_f(result);
                            case 21:
                            case "end":
                              return _context3.stop();
                          }
                        }, _callee3);
                      }));
                    };
                    xml_http.open(type_s_, url_s_, true);
                    // 设置标头
                    {
                      if (sys.isNative) {
                        xml_http.setRequestHeader("Accept-Encoding", "gzip,deflate");
                      }
                      if (config.header) {
                        for (var k_s in config.header) {
                          xml_http.setRequestHeader(k_s, config.header[k_s]);
                        }
                      }
                    }
                    // open 回调
                    if (config.open_callback_f) {
                      config.open_callback_f(xml_http);
                    }
                    xml_http.send(config.body);
                  });
                case 7:
                  return _context4.abrupt("return", _context4.sent);
                case 8:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
        };
        return mk_http;
      }(mk_instance_base);
      var mk_http_;
      (function (mk_http_) {
        /** 配置信息 */
        var config = function config(init_) {
          /** 超时时间(ms) */
          this.timeout_n = 5000;
          Object.assign(this, init_);
        };
        mk_http_.config = config;
      })(mk_http_ || (mk_http_ = {}));
      var mk_http$1 = mk_http.instance();

      // import mk_config from "./mk_config";
      var _mk_logger;
      (function (_mk_logger) {
        /** 日志等级 */
        var level;
        (function (level) {
          /** 禁止所有日志输出 */
          level[level["none"] = 0] = "none";
          /** 调试 */
          level[level["debug"] = 1] = "debug";
          /** 打印 */
          level[level["log"] = 2] = "log";
          /** 警告 */
          level[level["warn"] = 4] = "warn";
          /** 错误 */
          level[level["error"] = 8] = "error";
          /** debug 及以上 */
          level[level["debug_up"] = 15] = "debug_up";
          /** log 及以上 */
          level[level["log_up"] = 14] = "log_up";
          /** warn 及以上 */
          level[level["warn_up"] = 12] = "warn_up";
        })(level = _mk_logger.level || (_mk_logger.level = {}));
        /** 打印对象类型 */
        var log_object_type;
        (function (log_object_type) {
          /** 框架，等级限制，打印模块限制 */
          log_object_type[log_object_type["mk"] = 0] = "mk";
          /** 控制台，可以跳转打印位置 */
          log_object_type[log_object_type["console"] = 1] = "console";
          /** cocos，等级限制 */
          log_object_type[log_object_type["cc"] = 2] = "cc";
        })(log_object_type = _mk_logger.log_object_type || (_mk_logger.log_object_type = {}));
        /** 日志配置 */
        _mk_logger.config = new ( /*#__PURE__*/function () {
          function _class() {
            /** 日志缓存行数 */
            this.cache_row_n = 100;
            /** 报错日志上传地址 */
            this.error_upload_addr_s = "";
            /** 输出定位(使用 console 接口) */
            this.output_position_b = true;
            /** 日志等级 */
            this.level_n = level.debug_up;
            /** 打印对象类型 */
            this.log_object_type = log_object_type.console;
            /** PREVIEW模式下是否显示调用栈（默认false，避免控制台过于冗余） */
            this.show_call_stack_in_preview = false;
          }
          return _class;
        }())();
      })(_mk_logger || (_mk_logger = {}));
      /**
       * 日志打印器
       * @noInheritDoc
       * @remarks
       * 单例对象打印名为 default
       *
       * - 支持多实例
       *
       * - 打印等级控制
       *
       * - 打印屏蔽控制
       *
       * - 报错日志 http 上传
       */
      var mk_logger = exports('logger', /*#__PURE__*/function (_mk_instance_base4) {
        _inheritsLoose(mk_logger, _mk_instance_base4);
        function mk_logger(name_s_) {
          var _this4$_log_func_tab;
          var _this4;
          _this4 = _mk_instance_base4.call(this) || this;
          /** 日志函数表 */
          _this4._log_func_tab = (_this4$_log_func_tab = {}, _this4$_log_func_tab[_mk_logger.log_object_type.mk] = {
            target: _assertThisInitialized(_this4),
            debug: _this4.debug,
            log: _this4.log,
            warn: _this4.warn,
            error: _this4.error
          }, _this4$_log_func_tab[_mk_logger.log_object_type.console] = {
            target: console,
            debug: console.debug,
            log: console.log,
            warn: console.warn,
            error: console.error
          }, _this4$_log_func_tab[_mk_logger.log_object_type.cc] = {
            target: cc,
            debug: debug,
            log: log$1,
            warn: warn$1,
            error: error$1
          }, _this4$_log_func_tab);
          /** 计时信息 */
          _this4._time_map = new Map();
          // 初始化数据
          _this4._name_s = name_s_;
          mk_logger._log_map.set(name_s_, _assertThisInitialized(_this4));
          // 错误监听
          if (!mk_logger._init_b) {
            mk_logger._init_b = true;
            var upload_f = function upload_f() {
              var _b2;
              var _a, _b;
              // 添加日志缓存
              for (var _len2 = arguments.length, args_as = new Array(_len2), _key5 = 0; _key5 < _len2; _key5++) {
                args_as[_key5] = arguments[_key5];
              }
              mk_logger._add_log_cache(_mk_logger.level.error, mk_log._get_log_head(_mk_logger.level.error, true), args_as);
              // 上传错误日志
              if (mk_logger._config.error_upload_addr_s) {
                mk_http$1.post(mk_logger._config.error_upload_addr_s, {
                  body: JSON.stringify(mk_logger._cache_ss)
                });
                // 清空日志缓存
                mk_logger._cache_ss.splice(0, mk_logger._cache_ss.length);
              }
              // 错误处理
              (_b = (_a = mk_logger._config).error_handling_f) === null || _b === void 0 ? void 0 : (_b2 = _b).call.apply(_b2, [_a].concat(args_as));
            };
            if (sys.isBrowser) {
              var old_handler;
              if (window.onerror) {
                old_handler = window.onerror;
              }
              window.onerror = function () {
                upload_f.apply(void 0, arguments);
                if (old_handler) {
                  old_handler.apply(void 0, arguments);
                }
              };
            } else if (sys.isNative) {
              var _old_handler;
              if (window["jsb"]) {
                jsb["onError"](function () {
                  upload_f.apply(void 0, arguments);
                });
              } else {
                if (window["__errorHandler"]) {
                  _old_handler = window["__errorHandler"];
                }
                window["__errorHandler"] = function () {
                  upload_f.apply(void 0, arguments);
                  if (_old_handler) {
                    _old_handler.apply(void 0, arguments);
                  }
                };
              }
            }
          }
          return _this4;
        }
        /* ------------------------------- static ------------------------------- */
        /**
         * 只限模块打印
         * @param module_ss_ 模块名列表
         * @remarks
         * 调用时会覆盖 {@link mk_logger.limit} 的规则
         */
        mk_logger.only = function only(module_ss_) {
          mk_logger._log_only_module_ss = module_ss_;
          mk_logger._limit_log_module_ss = [];
        }
        /**
         * 限制模块打印
         * @param module_ss_ 模块名列表
         * @remarks
         * 调用时会覆盖 {@link mk_logger.only} 的规则
         */;
        mk_logger.limit = function limit(module_ss_) {
          mk_logger._log_only_module_ss = [];
          mk_logger._limit_log_module_ss = module_ss_;
        }
        /**
         * 设置console方法的调用栈追踪（仅PREVIEW模式）
         */;
        mk_logger._setupStackTraceForConsole = function _setupStackTraceForConsole() {
          {
            return;
          }
        }
        /**
         * 添加日志缓存
         * @param level_ 等级
         * @param head_s_ 日志头
         * @param args_as_ 参数
         * @returns
         */;
        mk_logger._add_log_cache = function _add_log_cache(level_, head_s_) {
          for (var _len6 = arguments.length, args_as_ = new Array(_len6 > 2 ? _len6 - 2 : 0), _key9 = 2; _key9 < _len6; _key9++) {
            args_as_[_key9 - 2] = arguments[_key9];
          }
          if (!(args_as_ === null || args_as_ === void 0 ? void 0 : args_as_.length) || mk_logger._config.cache_row_n <= 0) {
            return;
          }
          /** 缓存内容 */
          var content_s = head_s_;
          // 填充参数内容
          {
            if (level_ === _mk_logger.level.error) {
              args_as_.forEach(function (v) {
                var json_s = "";
                try {
                  json_s = JSON.stringify(v);
                } catch (e) {
                  // ...
                }
                content_s += ", " + json_s;
              });
            }
            // 非错误日志跳过对象和函数类型的打印
            else {
              args_as_.forEach(function (v) {
                if (!["object", "function"].includes(typeof v)) {
                  content_s += ", " + v;
                }
              });
            }
          }
          // 更新缓存数据
          mk_logger._cache_ss.push(content_s);
          // 超出缓存删除顶部日志
          if (mk_logger._cache_ss.length > mk_logger._config.cache_row_n) {
            mk_logger._cache_ss.splice(0, 1);
          }
        }
        /* ------------------------------- 功能 ------------------------------- */;
        var _proto6 = mk_logger.prototype;
        _proto6.debug = function debug() {
          for (var _len7 = arguments.length, args_as_ = new Array(_len7), _key10 = 0; _key10 < _len7; _key10++) {
            args_as_[_key10] = arguments[_key10];
          }
          this._log.apply(this, [_mk_logger.level.debug].concat(args_as_));
        };
        _proto6.log = function log() {
          for (var _len8 = arguments.length, args_as_ = new Array(_len8), _key11 = 0; _key11 < _len8; _key11++) {
            args_as_[_key11] = arguments[_key11];
          }
          this._log.apply(this, [_mk_logger.level.log].concat(args_as_));
        };
        _proto6.warn = function warn() {
          for (var _len9 = arguments.length, args_as_ = new Array(_len9), _key12 = 0; _key12 < _len9; _key12++) {
            args_as_[_key12] = arguments[_key12];
          }
          this._log.apply(this, [_mk_logger.level.warn].concat(args_as_));
        };
        _proto6.error = function error() {
          for (var _len10 = arguments.length, args_as_ = new Array(_len10), _key13 = 0; _key13 < _len10; _key13++) {
            args_as_[_key13] = arguments[_key13];
          }
          this._log.apply(this, [_mk_logger.level.error].concat(args_as_));
        }
        /** 计时开始 */;
        _proto6.time_start = function time_start(name_s_) {
          if (!name_s_) {
            this.error("参数错误");
            return;
          }
          var time_log = Object.create(null);
          time_log.start_time_ms_n = time_log.last_time_ms_n = Date.now();
          this._time_map.set(name_s_, time_log);
          for (var _len11 = arguments.length, args_as_ = new Array(_len11 > 1 ? _len11 - 1 : 0), _key14 = 1; _key14 < _len11; _key14++) {
            args_as_[_key14 - 1] = arguments[_key14];
          }
          if (args_as_ === null || args_as_ === void 0 ? void 0 : args_as_.length) {
            this._log.apply(this, [_mk_logger.level.log, name_s_].concat(args_as_));
          }
        }
        /** 打印耗时 */;
        _proto6.time_log = function time_log(name_s_) {
          var time_log = this._time_map.get(name_s_);
          if (!time_log) {
            this.error("参数错误");
            return;
          }
          var curr_time_ms_n = Date.now();
          for (var _len12 = arguments.length, args_as_ = new Array(_len12 > 1 ? _len12 - 1 : 0), _key15 = 1; _key15 < _len12; _key15++) {
            args_as_[_key15 - 1] = arguments[_key15];
          }
          if (args_as_ === null || args_as_ === void 0 ? void 0 : args_as_.length) {
            this._log.apply(this, [_mk_logger.level.log, name_s_].concat(args_as_, ["\u8017\u65F6\uFF1A" + (curr_time_ms_n - time_log.last_time_ms_n) / 1000 + "s"]));
          }
          time_log.last_time_ms_n = curr_time_ms_n;
        }
        /** 总耗时 */;
        _proto6.time_end = function time_end(name_s_) {
          var time_log = this._time_map.get(name_s_);
          if (!time_log) {
            this.error("参数错误");
            return;
          }
          for (var _len13 = arguments.length, args_as_ = new Array(_len13 > 1 ? _len13 - 1 : 0), _key16 = 1; _key16 < _len13; _key16++) {
            args_as_[_key16 - 1] = arguments[_key16];
          }
          this._log.apply(this, [_mk_logger.level.log, name_s_].concat(args_as_, ["\u603B\u8017\u65F6\uFF1A" + (Date.now() - time_log.start_time_ms_n) / 1000 + "s"]));
          this._time_map["delete"](name_s_);
        }
        /** 日志头 */;
        _proto6._get_log_head = function _get_log_head(level_, time_b_) {
          if (time_b_ === void 0) {
            time_b_ = true;
          }
          var date = new Date();
          if (time_b_) {
            /** 当前日期时间 */
            var time_s = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
            return this._name_s + " <" + _mk_logger.level[level_] + "> [" + time_s + "]\uFF1A";
          } else {
            return this._name_s + " <" + _mk_logger.level[level_] + ">\uFF1A";
          }
        };
        _proto6._log = function _log(level_) {
          var _this$_log_func_tab$m;
          // 打印等级限制
          if (!(mk_logger._config.level_n & level_)) {
            return;
          }
          // 打印模块限制
          if (mk_logger._log_only_module_ss.length) {
            if (!mk_logger._log_only_module_ss.includes(this._name_s)) {
              return;
            }
          } else {
            if (mk_logger._limit_log_module_ss.includes(this._name_s)) {
              return;
            }
          }
          /** 日志头 */
          var head_s = this._get_log_head(level_);
          // 更新缓存
          for (var _len14 = arguments.length, args_as_ = new Array(_len14 > 1 ? _len14 - 1 : 0), _key17 = 1; _key17 < _len14; _key17++) {
            args_as_[_key17 - 1] = arguments[_key17];
          }
          mk_logger._add_log_cache.apply(mk_logger, [level_, head_s].concat(args_as_));
          // 打印日志
          (_this$_log_func_tab$m = this._log_func_tab[mk_logger._config.log_object_type])[_mk_logger.level[level_]].apply(_this$_log_func_tab$m, [head_s].concat(args_as_));
        };
        return mk_logger;
      }(mk_instance_base));
      /* --------------- static --------------- */
      /** 全局配置 */
      mk_logger._config = _mk_logger.config;
      /** 初始化状态 */
      mk_logger._init_b = false;
      /** 所有 log 对象 */
      mk_logger._log_map = new Map();
      /** 日志缓存 */
      mk_logger._cache_ss = [];
      /** 唯一日志模块 */
      mk_logger._log_only_module_ss = [];
      /** 限制日志模块 */
      mk_logger._limit_log_module_ss = [];
      /** 上一次调用的函数位置，用于简单去重 */
      mk_logger._last_caller_function = '';
      var mk_log = mk_logger.instance("default");
      // 导出日志相关的类型和配置
      var LogLevel = exports('LogLevel', _mk_logger.level);
      var LogObjectType = exports('LogObjectType', _mk_logger.log_object_type);
      var logConfig = exports('logConfig', _mk_logger.config);
      // 导出便捷的日志函数
      var log = exports('log', mk_log.log.bind(mk_log));
      var warn = exports('warn', mk_log.warn.bind(mk_log));
      var error = exports('error', mk_log.error.bind(mk_log));

      /**
       * 全局配置
       * @internal
       */
      var global_config;
      (function (global_config) {
        (function (constant) {
          /** 游戏版本 */
          constant.version_s = "1.0.0";
          /** 显示左下角调试信息 */
          constant.show_debug_info_b = false;
        })(global_config.constant || (global_config.constant = {}));
        (function (audio) {
          (function (type) {
            /** 音效 */
            type[type["effect"] = -99] = "effect";
            /** 音乐 */
            type[type["music"] = -98] = "music";
          })(audio.type || (audio.type = {}));
        })(global_config.audio || (global_config.audio = {}));
        (function (asset) {
          /** bundle 键 */
          asset.bundle = new Proxy(Object.create(null), {
            get: function get(target, key) {
              return key;
            }
          });
          asset.config = new ( /*#__PURE__*/function () {
            function _class2() {
              /** 缓存生命时长 */
              this.cache_lifetime_ms_n = 1000;
            }
            return _class2;
          }())();
        })(global_config.asset || (global_config.asset = {}));
        (function (view) {
          (function (layer_type) {
            layer_type[layer_type["\u5185\u5BB9"] = 0] = "\u5185\u5BB9";
            layer_type[layer_type["\u7A97\u53E3"] = 1] = "\u7A97\u53E3";
            layer_type[layer_type["\u63D0\u793A"] = 2] = "\u63D0\u793A";
            layer_type[layer_type["\u5F15\u5BFC"] = 3] = "\u5F15\u5BFC";
            layer_type[layer_type["\u8B66\u544A"] = 4] = "\u8B66\u544A";
            layer_type[layer_type["\u52A0\u8F7D"] = 5] = "\u52A0\u8F7D";
            layer_type[layer_type["\u9519\u8BEF"] = 6] = "\u9519\u8BEF";
          })(view.layer_type || (view.layer_type = {}));
          /** 适配模式 */
          var adaptation_mode;
          (function (adaptation_mode) {
            /** 无 */
            adaptation_mode[adaptation_mode["none"] = 0] = "none";
            /** 自适应（更宽定高，更高定宽） */
            adaptation_mode[adaptation_mode["adaptive"] = 1] = "adaptive";
            /** 固定尺寸（屏幕尺寸不同大小相同） */
            adaptation_mode[adaptation_mode["fixed_size"] = 2] = "fixed_size";
          })(adaptation_mode = view.adaptation_mode || (view.adaptation_mode = {}));
          /** 适配类型 */
          view.adaptation_type = adaptation_mode.adaptive;
          /** 初始设计尺寸 */
          view.original_design_size = size();
          /** 阻塞警告时间（毫秒，生命周期函数执行时间超出设定值时报错） */
          view.blocking_warning_time_ms_n = 5000;
          /** 默认遮罩 */
          view.mask_data_tab = {
            node_name_s: "遮罩",
            prefab_path_s: "db://assets/resources/module/@common/mask/resources_common_mask.prefab"
          };
          view.config = new ( /*#__PURE__*/function () {
            function _class3() {
              /** 层间隔 */
              this.layer_spacing_n = 100;
              /** 渲染层级刷新间隔 */
              this.layer_refresh_interval_ms_n = game.frameTime;
              /** 窗口打开动画 */
              this.window_animation_tab = {
                open: {
                  无: null
                },
                close: {
                  无: null
                }
              };
            }
            return _class3;
          }())();
        })(global_config.view || (global_config.view = {}));
        (function (language) {
          /** 语种表 */
          var private_type_tab = {
            /** 中文(中华人民共和国) */
            zh_cn: {
              dire: Layout.HorizontalDirection.LEFT_TO_RIGHT
            },
            /** 英语(美国) */
            en_us: {
              dire: Layout.HorizontalDirection.LEFT_TO_RIGHT
            }
          };
          /** 语种表 */
          language.type_tab = private_type_tab;
          /** 语种 */
          language.type = new Proxy({}, {
            get: function get(target, key) {
              return key;
            }
          });
          /** 默认语言 */
          language.default_type_s = language.type.zh_cn;
          /** 参数标识前缀 */
          language.args_head_s = "{";
          /** 参数标识后缀 */
          language.args_tail_s = "}";
        })(global_config.language || (global_config.language = {}));
        (function (log) {
          var level;
          (function (level) {
            /** 禁止所有日志输出 */
            level[level["none"] = 0] = "none";
            /** 调试 */
            level[level["debug"] = 1] = "debug";
            /** 打印 */
            level[level["log"] = 2] = "log";
            /** 警告 */
            level[level["warn"] = 4] = "warn";
            /** 错误 */
            level[level["error"] = 8] = "error";
            /** debug 及以上 */
            level[level["debug_up"] = 15] = "debug_up";
            /** log 及以上 */
            level[level["log_up"] = 14] = "log_up";
            /** warn 及以上 */
            level[level["warn_up"] = 12] = "warn_up";
          })(level = log.level || (log.level = {}));
          /** 打印对象类型 */
          var log_object_type;
          (function (log_object_type) {
            /** 框架，等级限制，打印模块限制 */
            log_object_type[log_object_type["mk"] = 0] = "mk";
            /** 控制台，可以跳转打印位置 */
            log_object_type[log_object_type["console"] = 1] = "console";
            /** cocos，等级限制 */
            log_object_type[log_object_type["cc"] = 2] = "cc";
          })(log_object_type = log.log_object_type || (log.log_object_type = {}));
          log.config = new ( /*#__PURE__*/function () {
            function _class4() {
              /** 日志缓存行数 */
              this.cache_row_n = 100;
              /** 报错日志上传地址 */
              this.error_upload_addr_s = "";
              /** 输出定位(使用 console 接口) */
              this.output_position_b = true;
              /** 日志等级 */
              this.level_n = level.debug_up;
              /** 打印对象类型 */
              this.log_object_type = log_object_type.console;
            }
            return _class4;
          }())();
        })(global_config.log || (global_config.log = {}));
        (function (network) {
          /** 消息头键 */
          network.proto_head_key_tab = new Proxy(Object.create(null), {
            get: function get(target, key) {
              return key;
            }
          });
        })(global_config.network || (global_config.network = {}));
      })(global_config || (global_config = {}));
      {
        window["global_config"] = global_config;
      }
      var global_config$1 = global_config;

      /**
       * 事件对象（类型安全）
       * @noInheritDoc
       * @remarks
       * 获取事件键使用 event_target.key.xxx
       */
      var mk_event_target = exports('event_target', /*#__PURE__*/function (_cc$EventTarget) {
        _inheritsLoose(mk_event_target, _cc$EventTarget);
        function mk_event_target() {
          var _this5;
          _this5 = _cc$EventTarget.apply(this, arguments) || this;
          /** 事件键 */
          _this5.key = new Proxy(Object.create(null), {
            get: function get(target, key) {
              return key;
            }
          });
          return _this5;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 监听事件
         * @param type_ 事件类型
         * @param callback_ 触发回调
         * @param target_ 事件目标对象
         * @param once_b_ 是否触发单次
         * @returns 触发回调
         */
        // @ts-ignore
        var _proto7 = mk_event_target.prototype;
        _proto7.on = function on(type_, callback_, target_, once_b_) {
          var _this6 = this;
          var _a;
          if (Array.isArray(type_)) {
            type_.forEach(function (v) {
              _cc$EventTarget.prototype.on.call(_this6, v, callback_, target_, once_b_);
            });
            return null;
          } else {
            // 录入事件对象
            (_a = target_ === null || target_ === void 0 ? void 0 : target_.event_target_as) === null || _a === void 0 ? void 0 : _a.add(this);
            return _cc$EventTarget.prototype.on.call(this, type_, callback_, target_, once_b_);
          }
        }
        /**
         * 监听单次事件
         * @param type_ 事件类型
         * @param callback_ 触发回调
         * @param target_ 事件目标对象
         * @returns 触发回调
         */
        // @ts-ignore
        ;

        _proto7.once = function once(type_, callback_, target_) {
          var _this7 = this;
          var _a;
          if (Array.isArray(type_)) {
            type_.forEach(function (v) {
              _cc$EventTarget.prototype.once.call(_this7, v, callback_, target_);
            });
            return null;
          } else {
            // 录入事件对象
            (_a = target_ === null || target_ === void 0 ? void 0 : target_.event_target_as) === null || _a === void 0 ? void 0 : _a.add(this);
            return _cc$EventTarget.prototype.once.call(this, type_, callback_, target_);
          }
        }
        /**
         * 取消监听事件
         * @param type_ 事件类型
         * @param callback_ 触发回调
         * @param target_ 事件目标对象
         * @returns 触发回调
         */
        // @ts-ignore
        ;

        _proto7.off = function off(type_, callback_, target_) {
          var _this8 = this;
          if (Array.isArray(type_)) {
            type_.forEach(function (v) {
              _cc$EventTarget.prototype.off.call(_this8, v, callback_, target_);
            });
          } else {
            _cc$EventTarget.prototype.off.call(this, type_, callback_, target_);
          }
        }
        /**
         * 派发事件
         * @param type_ 事件类型
         * @param args_ 事件参数
         */
        // @ts-ignore
        ;

        _proto7.emit = function emit(type_) {
          var _this9 = this;
          for (var _len15 = arguments.length, args_ = new Array(_len15 > 1 ? _len15 - 1 : 0), _key18 = 1; _key18 < _len15; _key18++) {
            args_[_key18 - 1] = arguments[_key18];
          }
          if (Array.isArray(type_)) {
            type_.forEach(function (v) {
              var _cc$EventTarget$proto;
              (_cc$EventTarget$proto = _cc$EventTarget.prototype.emit).call.apply(_cc$EventTarget$proto, [_this9, v].concat(args_));
            });
          } else {
            var _cc$EventTarget$proto2;
            (_cc$EventTarget$proto2 = _cc$EventTarget.prototype.emit).call.apply(_cc$EventTarget$proto2, [this, type_].concat(args_));
          }
        }
        /**
         * 是否存在事件
         * @param type_ 事件类型
         * @param callback_ 触发回调
         * @param target_ 事件目标对象
         * @returns
         */
        // @ts-ignore
        ;

        _proto7.has = function has(type_, callback_, target_) {
          return _cc$EventTarget.prototype.hasEventListener.call(this, type_, callback_, target_);
        }
        /** 清空所有事件 */;
        _proto7.clear = function clear() {
          return _cc$EventTarget.prototype["clear"].call(this);
        }
        /**
         * 请求事件
         * @param type_ 事件类型
         * @param args_ 事件参数
         * @remarks
         * 等待请求事件返回
         */
        // @ts-ignore
        ;

        _proto7.request = function request(type_) {
          var _this10 = this;
          for (var _len16 = arguments.length, args_ = new Array(_len16 > 1 ? _len16 - 1 : 0), _key19 = 1; _key19 < _len16; _key19++) {
            args_[_key19 - 1] = arguments[_key19];
          }
          if (Array.isArray(type_)) {
            var result_as = [];
            type_.forEach(function (v) {
              result_as.push.apply(result_as, _this10._request_single.apply(_this10, [v].concat(args_)));
            });
            return result_as;
          } else {
            return this._request_single.apply(this, [type_].concat(args_));
          }
        }
        /**
         * 请求单个事件
         * @param type_ 事件类型
         * @param args_ 事件参数
         * @returns
         */
        // @ts-ignore
        ;

        _proto7._request_single = function _request_single(type_) {
          var _a;
          /** 返回值 */
          var result_as = [];
          /** 回调列表 */
          var callback_as = (_a = this["_callbackTable"][type_]) === null || _a === void 0 ? void 0 : _a.callbackInfos;
          if (!callback_as) {
            return result_as;
          }
          callback_as.forEach(function (v) {
            var old_callback_f = v.callback;
            var target = v.target;
            v.callback = function () {
              for (var _len18 = arguments.length, args = new Array(_len18), _key21 = 0; _key21 < _len18; _key21++) {
                args[_key21] = arguments[_key21];
              }
              result_as.push(old_callback_f.call.apply(old_callback_f, [target].concat(args)));
              v.callback = old_callback_f;
            };
          });
          for (var _len17 = arguments.length, args_ = new Array(_len17 > 1 ? _len17 - 1 : 0), _key20 = 1; _key20 < _len17; _key20++) {
            args_[_key20 - 1] = arguments[_key20];
          }
          this.emit.apply(this, [type_].concat(args_));
          return result_as;
        };
        return mk_event_target;
      }(EventTarget));
      var global_event = exports('global_event', new mk_event_target());
      {
        window["global_event"] = global_event;
      }

      /**
       * 状态任务（类型安全）
       * @remarks
       * 封装 promise，防止重复调用 resolve 函数报错以及添加超时功能，可重复使用
       */
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      var mk_status_task = /*#__PURE__*/function () {
        /**
         * @param finish_b_ 完成状态
         * @param init_config_ 初始化配置
         */
        function mk_status_task(finish_b_, init_config_) {
          /* --------------- private --------------- */
          /** 完成状态 */
          this._finish_b = false;
          /** 完成回调 */
          this._finish_f = null;
          this._finish_b = finish_b_;
          this._init_config = init_config_;
          if (this._finish_b) {
            this.task = new Promise(function (resolve_f) {
              resolve_f();
            });
          } else {
            this._reset();
          }
        }
        /**
         * 完成状态
         * @remarks
         *
         * - true：任务结束
         *
         * - false：任务进行中
         */
        var _proto8 = mk_status_task.prototype;
        _proto8.finish = function finish(finish_b_, data_) {
          var _a;
          if (this._finish_b === finish_b_) {
            return;
          }
          if (finish_b_) {
            (_a = this._finish_f) === null || _a === void 0 ? void 0 : _a.call(this, data_);
          } else {
            this._reset();
          }
        }
        /** 重置 */;
        _proto8._reset = function _reset() {
          var _this11 = this;
          var _a;
          this._finish_b = false;
          this.task = new Promise(function (resolve_f) {
            _this11._finish_f = function (data) {
              resolve_f(data);
              _this11._finish_b = true;
              _this11._finish_f = null;
              // 清理定时器
              if (_this11._timeout_timer) {
                clearTimeout(_this11._timeout_timer);
                _this11._timeout_timer = null;
              }
            };
          });
          // 超时定时器
          if (((_a = this._init_config) === null || _a === void 0 ? void 0 : _a.timeout_ms_n) !== undefined) {
            this._timeout_timer = setTimeout(function () {
              _this11._timeout_timer = null;
              _this11.finish(true, _this11._init_config.timeout_return);
            }, this._init_config.timeout_ms_n);
          }
        };
        _createClass(mk_status_task, [{
          key: "finish_b",
          get: function get() {
            return this._finish_b;
          }
        }]);
        return mk_status_task;
      }();
      var __awaiter$7 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var _mk_network_base;
      (function (_mk_network_base) {
        /** 消息事件 */
        var message_event = /*#__PURE__*/function (_cc$EventTarget2) {
          _inheritsLoose(message_event, _cc$EventTarget2);
          function message_event(network_) {
            var _this12;
            _this12 = _cc$EventTarget2.call(this) || this;
            /** 日志 */
            _this12._log = new mk_logger(js.getClassName(_assertThisInitialized(_this12)));
            _this12._network = network_;
            return _this12;
          }
          /* ------------------------------- 功能 ------------------------------- */
          // @ts-ignore
          var _proto9 = message_event.prototype;
          _proto9.on = function on(type_, callback_, this_, once_b_) {
            if (typeof type_ === "function") {
              var message_id = this._network.config.parse_message_id_f(type_.prototype);
              if (message_id !== undefined) {
                return _cc$EventTarget2.prototype.on.call(this, message_id, callback_, this_, once_b_);
              }
            } else {
              return _cc$EventTarget2.prototype.on.call(this, type_, callback_, this_, once_b_);
            }
            this._log.error("消息 id 解析错误");
            return null;
          }
          // @ts-ignore
          ;

          _proto9.once = function once(type_, callback_, this_) {
            return this.on(type_, callback_, this_, true);
          }
          // @ts-ignore
          ;

          _proto9.off = function off(type_, callback_, this_) {
            if (typeof type_ === "function") {
              var message_id = this._network.config.parse_message_id_f(type_.prototype);
              if (message_id !== undefined) {
                _cc$EventTarget2.prototype.off.call(this, message_id, callback_, this_);
                return;
              }
            } else {
              _cc$EventTarget2.prototype.off.call(this, type_, callback_, this_);
            }
            this._log.error("消息 id 解析错误");
          };
          _proto9.emit = function emit(args_, data_) {
            var type_;
            // 参数转换
            if (typeof args_ === "object") {
              data_ = args_;
            } else {
              type_ = args_;
            }
            if (type_ !== undefined) {
              _cc$EventTarget2.prototype.emit.call(this, type_, data_);
            } else {
              var message_id = this._network.config.parse_message_id_f(args_);
              if (message_id === undefined) {
                this._log.error("消息 id 解析错误");
                return;
              }
              _cc$EventTarget2.prototype.emit.call(this, message_id, args_);
            }
          }
          /**
           * 发送
           * @param data_ 发送数据
           * @returns
           */;
          _proto9.send = function send(data_) {
            this._network._send(data_);
          }
          /**
           * 请求
           * @param data_ 发送数据
           * @param timeout_ms_n_ 超时时间
           * @returns
           * @remarks
           * 等待事件回调返回
           */;
          _proto9.request = function request(data_, timeout_ms_n_) {
            this._network._send(data_);
            return this._network._wait(data_, timeout_ms_n_);
          }
          // @ts-ignore
          ;

          _proto9.has = function has(type_, callback_, target_) {
            if (typeof type_ === "function") {
              var message_id = this._network.config.parse_message_id_f(type_.prototype);
              if (message_id !== undefined) {
                return _cc$EventTarget2.prototype.hasEventListener.call(this, message_id, callback_, target_);
              }
            } else {
              return _cc$EventTarget2.prototype.hasEventListener.call(this, type_, callback_, target_);
            }
            this._log.error("消息 id 解析错误");
            return false;
          };
          _proto9.clear = function clear() {
            return _cc$EventTarget2.prototype["clear"].call(this);
          };
          return message_event;
        }(EventTarget);
        _mk_network_base.message_event = message_event;
      })(_mk_network_base || (_mk_network_base = {}));
      /**
       * 网络系统基类
       * @noInheritDoc
       * @remarks
       *
       * - 支持多实例
       *
       * - (心跳/断线重连)支持
       *
       * - 网络消息接口事件化
       *
       * - 支持消息潮
       *
       * - 网络消息模拟
       */
      var mk_network_base = /*#__PURE__*/function (_mk_instance_base5) {
        _inheritsLoose(mk_network_base, _mk_instance_base5);
        function mk_network_base(init_) {
          var _this13;
          _this13 = _mk_instance_base5.call(this) || this;
          /* --------------- public --------------- */
          /** 网络事件 */
          _this13.event = new mk_event_target();
          /** 消息事件 */
          _this13.message = new _mk_network_base.message_event(_assertThisInitialized(_this13));
          /** 日志 */
          _this13._log = new mk_logger(js.getClassName(_assertThisInitialized(_this13)));
          /** socket 状态 */
          _this13._state = mk_network_base_.status.closed;
          /**
           * 写入睡眠状态
           * @internal
           */
          _this13._write_sleep2_b = true;
          /** 写入队列 */
          _this13._write_as = [];
          /* --------------- private --------------- */
          /** 重连计数 */
          _this13._reconnect_count_n = 0;
          /** 重连定时器 */
          _this13._reconnect_timer = null;
          /** 发送定时器 */
          _this13._send_timer = null;
          /** 等待任务表 */
          _this13._wait_task_map = new Map();
          _this13.config = new mk_network_base_.init_config(init_);
          // 启动心跳
          _this13._start_heartbeat();
          // 事件监听
          global_event.on(global_event.key.restart, _this13._event_restart, _assertThisInitialized(_this13));
          return _this13;
        }
        /** socket 状态 */
        var _proto10 = mk_network_base.prototype;
        /** 连接 */
        _proto10.connect = function connect(addr_s_) {
          this._state = mk_network_base_.status.connecting;
          this._addr_s = addr_s_;
          this._reset_socket();
        }
        /** 断开 */;
        _proto10.close = function close() {
          var _a;
          this._state = mk_network_base_.status.closing;
          (_a = this._socket) === null || _a === void 0 ? void 0 : _a.close();
        }
        /**
         * 发送
         * @param data_ 发送数据
         * @returns
         * @internal
         */;
        _proto10._send = function _send(data_) {
          this._write_as.push(data_);
          // 更新状态
          if (this._write_sleep_b) {
            this._write_sleep_b = false;
          }
        }
        /**
         * 等待消息
         * @param key_ 消息键
         * @param timeout_ms_n_ 超时时间
         * @returns
         * @internal
         */
        // @ts-ignore
        ;

        _proto10._wait = function _wait(key_, timeout_ms_n_
        // @ts-ignore
        ) {
          if (timeout_ms_n_ === void 0) {
            timeout_ms_n_ = this.config.wait_timeout_ms_n;
          }
          /** 消息序列号 */
          var message_sequence = this.config.parse_message_sequence_f(key_);
          if (message_sequence === undefined) {
            this._log.error("消息序列号解析错误");
            return null;
          }
          /** 指定标记的等待数据 */
          var wait_task = this._wait_task_map.get(message_sequence);
          if (wait_task) {
            return wait_task.task;
          } else {
            this._wait_task_map.set(message_sequence, wait_task = new mk_status_task(false, {
              timeout_ms_n: timeout_ms_n_
            }));
          }
          return wait_task.task;
        }
        /** socket 准备完成 */;
        _proto10._open = function _open(event_) {
          this._state = mk_network_base_.status.open;
          this._log.debug("socket 准备完成", event_);
          if (this._write_as.length) {
            this._write_sleep_b = false;
          }
          // 取消重连
          this._cancel_reconnect(true);
          // 事件通知
          this.event.emit(this.event.key.open);
        }
        /** socket 消息 */;
        _proto10._message = function _message(event_) {
          return __awaiter$7(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var data, message_id;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  if (!this.config.codec) {
                    _context5.next = 6;
                    break;
                  }
                  _context5.next = 3;
                  return this.config.codec.decode(event_.data);
                case 3:
                  _context5.t0 = _context5.sent;
                  _context5.next = 7;
                  break;
                case 6:
                  _context5.t0 = event_.data;
                case 7:
                  data = _context5.t0;
                  if (!(data === undefined)) {
                    _context5.next = 10;
                    break;
                  }
                  return _context5.abrupt("return");
                case 10:
                  this._log.debug("收到消息", data);
                  // 事件通知
                  this.event.emit(this.event.key.recv, data);
                  /** 消息 id */
                  message_id = this.config.parse_message_id_f(data);
                  if (message_id !== undefined) {
                    // 指定事件通知
                    this.message.emit(message_id, data);
                    // 触发等待消息
                    this._trigger_wait_task(data);
                  }
                case 14:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
        }
        /** socket 错误 */;
        _proto10._error = function _error(event_) {
          if (this._state === mk_network_base_.status.open) {
            this._log.error("socket 错误", event_);
          }
        }
        /** socket 关闭 */;
        _proto10._close = function _close(event_) {
          var last_status = this._state;
          this._state = mk_network_base_.status.closed;
          if (last_status !== mk_network_base_.status.closed) {
            this._log.warn("socket 关闭", event_);
            this.event.emit(this.event.key.close, event_);
          }
          // 超出最大重连次数
          if (this._reconnect_timer !== null) {
            if (++this._reconnect_count_n > this.config.max_reconnect_n) {
              this._cancel_reconnect(false);
              return;
            }
            this._log.warn("socket 重连计数", this._reconnect_count_n);
          }
          // 准备重连
          if (last_status === mk_network_base_.status.open && this._reconnect_timer === null) {
            this._log.warn("socket 开始重连");
            this._write_sleep_b = true;
            this._reconnect_timer = setInterval(this._timer_reconnect.bind(this), this.config.reconnect_interval_ms_n);
          }
        }
        /** 定时发送 */;
        _proto10._timer_send = function _timer_send() {
          return __awaiter$7(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var _this14 = this;
            var _a, data_as, _iterator, _step, v;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(((_a = this._socket) === null || _a === void 0 ? void 0 : _a.readyState) !== WebSocket.OPEN)) {
                    _context6.next = 2;
                    break;
                  }
                  return _context6.abrupt("return");
                case 2:
                  if (!(this._write_as.length === 0)) {
                    _context6.next = 5;
                    break;
                  }
                  this._write_sleep_b = true;
                  return _context6.abrupt("return");
                case 5:
                  data_as = this._write_as.splice(0, this._write_as.length);
                  if (!this.config.codec) {
                    _context6.next = 10;
                    break;
                  }
                  _context6.next = 9;
                  return Promise.all(data_as.map(function (v) {
                    return _this14.config.codec.encode(v);
                  }));
                case 9:
                  data_as = _context6.sent;
                case 10:
                  for (_iterator = _createForOfIteratorHelperLoose(data_as); !(_step = _iterator()).done;) {
                    v = _step.value;
                    if ((v !== null && v !== void 0 ? v : null) !== null) {
                      this._socket.send(v);
                    }
                  }
                case 11:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
        }
        /** 定时重连 */;
        _proto10._timer_reconnect = function _timer_reconnect() {
          if (this._socket.readyState !== WebSocket.OPEN) {
            this._reset_socket();
          }
          // 重连成功
          else if (this._reconnect_timer !== null) {
            this._cancel_reconnect(true);
          }
        }
        /**
         * 取消重连
         * @param status_b_ 成功 | 失败
         * @returns
         */;
        _proto10._cancel_reconnect = function _cancel_reconnect(status_b_) {
          if (this._reconnect_timer === null) {
            return;
          }
          this._log.warn("socket 重连" + (status_b_ ? "成功" : "失败"));
          // 事件通知
          this.event.emit(status_b_ ? this.event.key.reconnect_success : this.event.key.reconnect_fail);
          // 清理重连数据
          {
            clearInterval(this._reconnect_timer);
            this._reconnect_timer = null;
            this._reconnect_count_n = 0;
          }
        }
        /**
         * 触发等待任务
         * @param data_ 收到的消息
         * @returns
         */;
        _proto10._trigger_wait_task = function _trigger_wait_task(data_) {
          /** 消息 id */
          var message_id = this.config.parse_message_id_f(data_);
          /** 消息序列号 */
          var message_sequence = this.config.parse_message_sequence_f(data_);
          if (message_id === undefined) {
            this._log.error("消息 id 解析错误");
            return;
          }
          // 触发等待任务
          if (message_sequence !== undefined) {
            var wait_tak = this._wait_task_map.get(message_sequence);
            if (!wait_tak) {
              return;
            }
            this._wait_task_map["delete"](message_sequence);
            wait_tak.finish(true, data_);
          }
        }
        /** 初始化心跳 */;
        _proto10._start_heartbeat = function _start_heartbeat() {
          var _this15 = this;
          if (!this.config.heartbeat_config) {
            return;
          }
          /** 心跳超时定时器 */
          var timeout_timer;
          /** 接收心跳回调 */
          var recv_f = function recv_f() {
            if (timeout_timer) {
              clearTimeout(timeout_timer);
            }
            // 超时检测
            timeout_timer = setTimeout(function () {
              // 心跳超时
              if (_this15.state !== mk_network_base_.status.open) {
                _this15.event.emit(_this15.event.key.heartbeat_timeout);
              }
            }, _this15.config.heartbeat_config.timeout_ms_n);
          };
          /** 心跳数据获取函数 */
          var get_send_data_f = this.config.heartbeat_config.init_f(recv_f);
          // 服务端到客户端，清理心跳超时定时器，防止心跳期间重连导致误超时
          this.event.on(this.event.key.close, function () {
            clearTimeout(timeout_timer);
            timeout_timer = null;
          }, this);
          // 客户端到服务端
          if (get_send_data_f) {
            /** 心跳定时器 */
            var timer;
            // 启动心跳
            this.event.on(this.event.key.open, function () {
              timer = setInterval(function () {
                _this15._socket.send(get_send_data_f());
              }, _this15.config.heartbeat_config.interval_ms_n);
            }, this);
            // 关闭心跳
            this.event.on(this.event.key.close, function () {
              clearInterval(timer);
              timer = null;
            }, this);
          }
        }
        /* ------------------------------- get/set ------------------------------- */;
        _proto10._set_write_sleep_b = function _set_write_sleep_b(value_b_) {
          if (this._write_sleep2_b === value_b_) {
            return;
          }
          if (value_b_) {
            if (this._send_timer !== null) {
              clearInterval(this._send_timer);
              this._send_timer = null;
            }
          } else {
            this._send_timer = setInterval(this._timer_send.bind(this), this.config.send_interval_ms_n);
          }
          this._write_sleep2_b = value_b_;
        }
        /* ------------------------------- 全局事件 ------------------------------- */;
        _proto10._event_restart = function _event_restart() {
          // 写睡眠
          this._write_sleep_b = true;
          // 关闭网络事件
          this.event.emit(this.event.key.close, null);
          // 清理事件
          this.event.clear();
          this.message.clear();
          // 清理发送消息
          this._write_as.splice(0, this._write_as.length);
          // 清理等待消息
          {
            this._wait_task_map.forEach(function (v) {
              v.finish(true, null);
            });
            this._wait_task_map.clear();
          }
          // 取消重连
          this._cancel_reconnect(false);
          // 关闭网络
          this.close();
        };
        _createClass(mk_network_base, [{
          key: "state",
          get: function get() {
            return this._state;
          }
          /** 编解码器 */
        }, {
          key: "codec",
          get: function get() {
            return this.config.codec;
          },
          set: function set(value_) {
            this.config.codec = value_;
          }
          /** 写睡眠状态 */
        }, {
          key: "_write_sleep_b",
          get: function get() {
            return this._write_sleep2_b;
          },
          set: function set(value_b_) {
            this._set_write_sleep_b(value_b_);
          }
        }]);
        return mk_network_base;
      }(mk_instance_base);
      var mk_network_base_;
      (function (mk_network_base_) {
        (function (status) {
          /** 连接中 */
          status[status["connecting"] = 0] = "connecting";
          /** 已连接 */
          status[status["open"] = 1] = "open";
          /** 关闭中 */
          status[status["closing"] = 2] = "closing";
          /** 已关闭 */
          status[status["closed"] = 3] = "closed";
        })(mk_network_base_.status || (mk_network_base_.status = {}));
        /** 初始化配置 */
        var init_config = /*#__PURE__*/function () {
          function init_config(init_) {
            /**
             * 发送间隔
             * @remarks
             * 单位：毫秒
             */
            this.send_interval_ms_n = 0;
            /**
             * 重连间隔
             * @remarks
             * 单位：毫秒
             */
            this.reconnect_interval_ms_n = 1000;
            /** 最大重连次数 */
            this.max_reconnect_n = 5;
            /**
             * 等待消息超时时间
             * @remarks
             * 单位：毫秒
             */
            this.wait_timeout_ms_n = 5000;
            Object.assign(this, init_);
          }
          /**
           * 解析消息 id
           * @param data 接收的消息
           * @returns 消息号
           */
          var _proto11 = init_config.prototype;
          _proto11.parse_message_id_f = function parse_message_id_f(data) {
            return data === null || data === void 0 ? void 0 : data[global_config$1.network.proto_head_key_tab.__id];
          }
          /**
           * 解析消息序列号
           * @param data 接收的消息
           * @returns 消息序列号
           */;
          _proto11.parse_message_sequence_f = function parse_message_sequence_f(data) {
            if (global_config$1.network.proto_head_key_tab.__sequence !== undefined) {
              return data === null || data === void 0 ? void 0 : data[global_config$1.network.proto_head_key_tab.__sequence];
            }
          };
          return init_config;
        }();
        mk_network_base_.init_config = init_config;
        /** 发送潮 */
        var send_tide = /*#__PURE__*/function () {
          /**
           * @param network_ 网络实例
           * @param interval_ms_n_ 发送间隔
           *
           * - -1：手动触发
           *
           * - 0-n：自动发送间隔毫秒
           */
          function send_tide(network_, interval_ms_n_) {
            /** 消息列表 */
            this._mess_as = [];
            /** 发送倒计时 */
            this._send_timer = null;
            this._network = network_;
            this._send_interval_ms_n = interval_ms_n_;
            // 事件监听
            global_event.on(global_event.key.restart, this._event_restart, this);
          }
          /* ------------------------------- 功能 ------------------------------- */
          /** 发送 */
          var _proto12 = send_tide.prototype;
          _proto12.send = function send(data_) {
            var _this16 = this;
            if (this._send_interval_ms_n === 0) {
              this._network._send(data_);
              return;
            } else {
              this._mess_as.push(data_);
            }
            // 发送定时器
            if (this._send_interval_ms_n > 0 && !this._send_timer) {
              this._send_timer = setInterval(function () {
                // 没有消息取消定时任务
                if (!_this16._mess_as.length) {
                  clearInterval(_this16._send_timer);
                  _this16._send_timer = null;
                  return;
                }
                while (_this16._mess_as.length) {
                  _this16._network._send(_this16._mess_as.shift());
                }
              }, this._send_interval_ms_n);
            }
          }
          /** 触发发送 */;
          _proto12.trigger = function trigger() {
            if (this._send_interval_ms_n !== -1) {
              return;
            }
            while (this._mess_as.length) {
              this._network._send(this._mess_as.shift());
            }
          }
          /** 清理所有未发送消息 */;
          _proto12.clear = function clear() {
            this._mess_as.splice(0, this._mess_as.length);
          }
          /* ------------------------------- 全局事件 ------------------------------- */;
          _proto12._event_restart = function _event_restart() {
            clearInterval(this._send_timer);
            this._send_timer = null;
          };
          return send_tide;
        }();
        mk_network_base_.send_tide = send_tide;
      })(mk_network_base_ || (mk_network_base_ = {}));

      /**
       * 通用 websocket
       * @noInheritDoc
       */
      var mk_websocket = /*#__PURE__*/function (_mk_network_base2) {
        _inheritsLoose(mk_websocket, _mk_network_base2);
        function mk_websocket(config_) {
          var _this17;
          _this17 = _mk_network_base2.call(this, config_) || this;
          _this17.config = new mk_websocket_.init_config(config_);
          return _this17;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /** 重置socket */
        var _proto13 = mk_websocket.prototype;
        _proto13._reset_socket = function _reset_socket() {
          var _this18 = this;
          if (this._socket) {
            ["onopen", "onmessage", "onerror", "onclose"].forEach(function (v_s, k_n) {
              _this18._socket[v_s] = null;
            });
            this._socket.close();
          }
          this._socket = new WebSocket(this._addr_s, this.config.protocol_ss);
          this._socket.binaryType = this.config.binary_type;
          var func_name_ss = ["_open", "_message", "_error", "_close"];
          ["onopen", "onmessage", "onerror", "onclose"].forEach(function (v_s, k_n) {
            _this18._socket[v_s] = _this18[func_name_ss[k_n]].bind(_this18);
          });
        };
        return mk_websocket;
      }(mk_network_base);
      var mk_websocket_;
      (function (mk_websocket_) {
        var init_config = /*#__PURE__*/function (_mk_network_base_$ini) {
          _inheritsLoose(init_config, _mk_network_base_$ini);
          function init_config(init_) {
            var _this19;
            _this19 = _mk_network_base_$ini.call(this, init_) || this;
            /** 通信类型 */
            _this19.binary_type = "arraybuffer";
            /** 协议 */
            _this19.protocol_ss = [];
            Object.assign(_assertThisInitialized(_this19), init_);
            return _this19;
          }
          return init_config;
        }(mk_network_base_.init_config);
        mk_websocket_.init_config = init_config;
      })(mk_websocket_ || (mk_websocket_ = {}));

      /**
       * 微信 websocket
       * @noInheritDoc
       */
      var mk_websocket_wx = /*#__PURE__*/function (_mk_network_base3) {
        _inheritsLoose(mk_websocket_wx, _mk_network_base3);
        function mk_websocket_wx(config_) {
          var _this20;
          _this20 = _mk_network_base3.call(this, config_) || this;
          _this20.config = new mk_websocket_wx_.init_config(config_);
          return _this20;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /** 重置socket */
        var _proto14 = mk_websocket_wx.prototype;
        _proto14._reset_socket = function _reset_socket() {
          var _this21 = this;
          if (this._socket) {
            ["onOpen", "onMessage", "onError", "onClose"].forEach(function (v_s, k_n) {
              _this21._socket[v_s] = null;
            });
            this._socket.close({});
          }
          this._socket = wx.connectSocket({
            url: this._addr_s,
            protocols: this.config.protocol_ss
          });
          var func_name_ss = ["_open", "_message", "_error", "_close"];
          ["onOpen", "onMessage", "onError", "onClose"].forEach(function (v_s, k_n) {
            _this21._socket[v_s] = _this21[func_name_ss[k_n]].bind(_this21);
          });
        };
        return mk_websocket_wx;
      }(mk_network_base);
      var mk_websocket_wx_;
      (function (mk_websocket_wx_) {
        var init_config = /*#__PURE__*/function (_mk_network_base_$ini2) {
          _inheritsLoose(init_config, _mk_network_base_$ini2);
          function init_config(init_) {
            var _this22;
            _this22 = _mk_network_base_$ini2.call(this, init_) || this;
            /** 协议 */
            _this22.protocol_ss = [];
            Object.assign(_assertThisInitialized(_this22), init_);
            return _this22;
          }
          return init_config;
        }(mk_network_base_.init_config);
        mk_websocket_wx_.init_config = init_config;
      })(mk_websocket_wx_ || (mk_websocket_wx_ = {}));
      var mk_network = exports('network', /*#__PURE__*/Object.freeze({
        __proto__: null,
        base: mk_network_base,
        get base_() {
          return mk_network_base_;
        },
        http: mk_http$1,
        get http_() {
          return mk_http_;
        },
        websocket: mk_websocket,
        get websocket_() {
          return mk_websocket_;
        },
        websocket_wx: mk_websocket_wx
      }));
      var __awaiter$6 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /** 函数扩展 */
      var mk_tool_func = /*#__PURE__*/function (_mk_instance_base6) {
        _inheritsLoose(mk_tool_func, _mk_instance_base6);
        function mk_tool_func() {
          var _this23;
          _this23 = _mk_instance_base6.apply(this, arguments) || this;
          _this23._run_parent_func_mark_map = new Map();
          _this23._timeout_warning_mark_map = new Map();
          return _this23;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /** 自动执行父类函数 */
        var _proto15 = mk_tool_func.prototype;
        _proto15.run_parent_func = function run_parent_func(target_, key_) {
          var _this24 = this;
          var key_as = [];
          // 参数分类
          {
            if (Array.isArray(key_)) {
              var _key_as;
              (_key_as = key_as).push.apply(_key_as, key_);
            } else {
              key_as.push(key_);
            }
            key_as = key_as.filter(function (v) {
              return target_[v] && typeof target_[v] === "function";
            });
          }
          /** 修改标记 */
          var mark_tab = this._run_parent_func_mark_map.get(target_);
          if (!mark_tab) {
            this._run_parent_func_mark_map.set(target_, mark_tab = Object.create(null));
          }
          key_as.forEach(function (v) {
            // 跳过已修改函数
            if (mark_tab[v]) {
              return;
            }
            /** 当前类及父类函数 */
            var func_fs = _this24._get_parent_func(target_.constructor, v);
            // 标记重载
            mark_tab[v] = true;
            // 重载当前函数
            target_[v] = function () {
              for (var _len19 = arguments.length, args_as = new Array(_len19), _key22 = 0; _key22 < _len19; _key22++) {
                args_as[_key22] = arguments[_key22];
              }
              return __awaiter$6(_this24, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                var _a, result, k2_n, _a2, _func_fs;
                return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.prev = 0;
                      k2_n = 0;
                    case 2:
                      if (!(k2_n < func_fs.length - 1)) {
                        _context7.next = 10;
                        break;
                      }
                      result = (_a = func_fs[k2_n]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [target_].concat(args_as));
                      if (!(result instanceof Promise)) {
                        _context7.next = 7;
                        break;
                      }
                      _context7.next = 7;
                      return result;
                    case 7:
                      k2_n++;
                      _context7.next = 2;
                      break;
                    case 10:
                      if (!func_fs.length) {
                        _context7.next = 16;
                        break;
                      }
                      result = (_func_fs = func_fs[func_fs.length - 1]).call.apply(_func_fs, [target_].concat(args_as));
                      if (!(result instanceof Promise)) {
                        _context7.next = 16;
                        break;
                      }
                      _context7.next = 15;
                      return result;
                    case 15:
                      result = _context7.sent;
                    case 16:
                      _context7.next = 23;
                      break;
                    case 18:
                      _context7.prev = 18;
                      _context7.t0 = _context7["catch"](0);
                      if (!(_context7.t0 === "中断")) {
                        _context7.next = 22;
                        break;
                      }
                      return _context7.abrupt("return");
                    case 22:
                      mk_log.error(_context7.t0);
                    case 23:
                      return _context7.abrupt("return", result);
                    case 24:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7, null, [[0, 18]]);
              }));
            };
          });
        }
        /**
         * 超时警告
         * @param time_ms_n_ 最大执行时间
         */;
        _proto15.timeout_warning = function timeout_warning(time_ms_n_, target_, key_) {
          if (!time_ms_n_) {
            return;
          }
          var key_as = [];
          // 参数分类
          {
            if (Array.isArray(key_)) {
              var _key_as2;
              (_key_as2 = key_as).push.apply(_key_as2, key_);
            } else {
              key_as.push(key_);
            }
            key_as = key_as.filter(function (v) {
              return target_[v] && typeof target_[v] === "function";
            });
          }
          /** 修改标记 */
          var mark_tab = this._timeout_warning_mark_map.get(target_);
          if (!mark_tab) {
            this._timeout_warning_mark_map.set(target_, mark_tab = Object.create(null));
          }
          key_as.forEach(function (key_s_) {
            // 不存在或者已修改则退出
            if (!target_[key_s_] || mark_tab[key_s_]) {
              return;
            }
            mark_tab[key_s_] = true;
            var old_f = target_[key_s_];
            target_[key_s_] = function () {
              /** 定时器 */
              var timer = setTimeout(function () {
                mk_log.error(js.getClassName(target_) + ":" + key_s_ + " \u6267\u884C\u8D85\u65F6", target_);
              }, time_ms_n_);
              for (var _len20 = arguments.length, args_as = new Array(_len20), _key23 = 0; _key23 < _len20; _key23++) {
                args_as[_key23] = arguments[_key23];
              }
              var result = old_f.call.apply(old_f, [target_].concat(args_as));
              // 取消定时器
              if (result instanceof Promise) {
                result.then(function () {
                  clearTimeout(timer);
                });
              } else {
                clearTimeout(timer);
              }
              return result;
            };
          });
        }
        /** 获取当前类及父类函数 */;
        _proto15._get_parent_func = function _get_parent_func(target_, key_, old_target_, func_fs_) {
          if (func_fs_ === void 0) {
            func_fs_ = [];
          }
          if (!target_ || target_ === Object) {
            return func_fs_;
          }
          this._get_parent_func(js.getSuper(target_), key_, target_, func_fs_);
          if (target_.prototype[key_] && (old_target_ ? target_.prototype[key_] !== old_target_.prototype[key_] : true)) {
            func_fs_.push(target_.prototype[key_]);
          }
          return func_fs_;
        };
        return mk_tool_func;
      }(mk_instance_base);
      var mk_tool_func$1 = mk_tool_func.instance();
      var __awaiter$5 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**
       * 对象释放器
       * @remarks
       *
       * - 统一 (cc.Node/cc.Asset) 资源的释放逻辑
       *
       * - 可以通过 function 或继承添加自定义释放逻辑
       */
      var mk_release = exports('release', /*#__PURE__*/function () {
        function mk_release() {
          /** 节点集合 */
          this._node_set = new Set();
          /** 资源集合 */
          this._asset_set = new Set();
          /** 对象集合 */
          this._object_set = new Set();
          /** 回调集合 */
          this._callback_set = new Set();
        }
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 添加释放对象
         * @param object_ 要跟随模块释放的对象或列表
         */
        var _proto16 = mk_release.prototype;
        _proto16.add = function add(object_) {
          if (!object_) {
            mk_log.error("添加释放对象错误", object_);
            return object_;
          }
          // 添加引用数据
          if (object_ instanceof Node) {
            if (object_.isValid) {
              this._node_set.add(object_);
            }
          } else if (object_ instanceof Asset) {
            if (object_.isValid) {
              this._asset_set.add(object_);
            }
          } else if (typeof object_ === "function") {
            this._callback_set.add(object_);
          } else {
            this._object_set.add(object_);
          }
          return object_;
        }
        /**
         * 释放对象
         * @param object_ 指定对象
         */;
        _proto16.release = function release(object_) {
          return __awaiter$5(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  if (!(object_ instanceof Node)) {
                    _context8.next = 4;
                    break;
                  }
                  if (this._node_set["delete"](object_) && object_.isValid) {
                    object_.removeFromParent();
                    object_.destroy();
                  }
                  _context8.next = 17;
                  break;
                case 4:
                  if (!(object_ instanceof Asset)) {
                    _context8.next = 8;
                    break;
                  }
                  if (this._asset_set["delete"](object_) && object_.isValid) {
                    object_.decRef();
                  }
                  _context8.next = 17;
                  break;
                case 8:
                  if (!(typeof object_ === "function")) {
                    _context8.next = 14;
                    break;
                  }
                  if (!this._callback_set["delete"](object_)) {
                    _context8.next = 12;
                    break;
                  }
                  _context8.next = 12;
                  return object_();
                case 12:
                  _context8.next = 17;
                  break;
                case 14:
                  if (!this._object_set["delete"](object_)) {
                    _context8.next = 17;
                    break;
                  }
                  _context8.next = 17;
                  return object_.release();
                case 17:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this);
          }));
        }
        /** 释放所有对象 */;
        _proto16.release_all = function release_all() {
          return __awaiter$5(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
            var _iterator2, _step2, v, _iterator3, _step3, v_f;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  this._asset_set.forEach(function (v) {
                    if (v.isValid) {
                      v.decRef();
                    }
                  });
                  this._node_set.forEach(function (v) {
                    if (v.isValid) {
                      v.removeFromParent();
                      v.destroy();
                    }
                  });
                  _iterator2 = _createForOfIteratorHelperLoose(this._object_set);
                case 3:
                  if ((_step2 = _iterator2()).done) {
                    _context9.next = 9;
                    break;
                  }
                  v = _step2.value;
                  _context9.next = 7;
                  return v.release();
                case 7:
                  _context9.next = 3;
                  break;
                case 9:
                  _iterator3 = _createForOfIteratorHelperLoose(this._callback_set);
                case 10:
                  if ((_step3 = _iterator3()).done) {
                    _context9.next = 16;
                    break;
                  }
                  v_f = _step3.value;
                  _context9.next = 14;
                  return v_f();
                case 14:
                  _context9.next = 10;
                  break;
                case 16:
                  this._asset_set.clear();
                  this._node_set.clear();
                  this._object_set.clear();
                  this._callback_set.clear();
                case 20:
                case "end":
                  return _context9.stop();
              }
            }, _callee9, this);
          }));
        };
        return mk_release;
      }());
      var __awaiter$4 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**
       * bundle 管理器
       * @noInheritDoc
       * @remarks
       *
       * - 封装(加载/预加载)场景为 load_scene
       *
       * - 支持(远程/本地) bundle
       *
       * - 支持 bundle 热更
       *
       * - 封装(bundle/scene)切换事件
       *
       * - 支持 bundle 管理器，用于子游戏管理
       */
      var mk_bundle = /*#__PURE__*/function (_mk_instance_base7) {
        _inheritsLoose(mk_bundle, _mk_instance_base7);
        function mk_bundle() {
          var _this25;
          _this25 = _mk_instance_base7.call(this) || this;
          /* --------------- public --------------- */
          /** 事件 */
          _this25.event = new mk_event_target();
          /** bundle列表 */
          _this25.bundle_map = new Map();
          /** 切换场景状态 */
          _this25.switch_scene_b = false;
          /* --------------- private --------------- */
          /** 初始化任务 */
          _this25._init_task = new mk_status_task(false);
          /** 引擎初始化任务 */
          _this25._engine_init_task = new mk_status_task(false);
          /** 日志 */
          _this25._log = new mk_logger("bundle");
          // 引擎初始化事件
          game.once(Game.EVENT_GAME_INITED, function () {
            _this25._engine_init_task.finish(true);
          });
          // 模块初始化事件
          director.once(Director.EVENT_BEFORE_SCENE_LAUNCH, function (scene) {
            if (!scene.name) {
              _this25._log.warn("未选择启动场景");
              return;
            }
            _this25.bundle_s = "main";
            _this25._scene_s = scene.name;
            _this25._init_task.finish(true);
          }, _assertThisInitialized(_this25));
          return _this25;
        }
        /** 当前场景bundle */
        var _proto17 = mk_bundle.prototype;
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 设置 bundle 数据
         * @param bundle_ bundle 信息
         */
        _proto17.set = function set(bundle_) {
          var bundle_data = this.bundle_map.get(bundle_.bundle_s);
          // 更新旧数据
          if (bundle_data) {
            Object.assign(bundle_data, bundle_);
          }
          // 添加新数据
          else {
            this.bundle_map.set(bundle_.bundle_s, bundle_data = new mk_bundle_.bundle_data(bundle_));
          }
        }
        /**
         * 加载 bundle
         * @param args_ bundle 名 | 加载配置
         * @returns
         */;
        _proto17.load = function load(args_) {
          return __awaiter$4(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
            var _this26 = this;
            var _a, load_config, bundle_info, bundle;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  /** 加载配置 */
                  load_config = typeof args_ === "string" ? new mk_bundle_.load_config({
                    bundle_s: args_
                  }) : args_;
                  /** bundle 信息 */
                  bundle_info = (_a = this.bundle_map.get(load_config.bundle_s)) !== null && _a !== void 0 ? _a : new mk_bundle_.bundle_info({
                    bundle_s: load_config.bundle_s
                  });
                  _context10.next = 4;
                  return this._engine_init_task.task;
                case 4:
                  /** bundle 资源 */
                  bundle = assetManager.getBundle(bundle_info.bundle_s);
                  if (!bundle) {
                    _context10.next = 7;
                    break;
                  }
                  return _context10.abrupt("return", bundle);
                case 7:
                  return _context10.abrupt("return", new Promise(function (resolve_f) {
                    var _a;
                    if (!bundle_info) {
                      return;
                    }
                    assetManager.loadBundle((_a = bundle_info.origin_s) !== null && _a !== void 0 ? _a : bundle_info.bundle_s, {
                      version: bundle_info.version_s,
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      onFileProgress: load_config.progress_callback_f
                    }, function (error, bundle) {
                      if (error) {
                        _this26._log.error("bundle加载失败", error);
                        resolve_f(null);
                        return;
                      }
                      // 添加bundle信息
                      if (!_this26.bundle_map.has(bundle_info.bundle_s)) {
                        _this26.bundle_map.set(bundle_info.bundle_s, bundle_info);
                      }
                      resolve_f(bundle);
                    });
                  }));
                case 8:
                case "end":
                  return _context10.stop();
              }
            }, _callee10, this);
          }));
        }
        /**
         * 切换场景
         * @param scene_s_ 场景名
         * @param config_ 切换配置
         * @returns
         */;
        _proto17.load_scene = function load_scene(scene_s_, config_) {
          return __awaiter$4(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
            var _this27 = this;
            var _a, config, bundle_info, bundle, preload_b, progress_callback_f;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) switch (_context12.prev = _context12.next) {
                case 0:
                  if (scene_s_) {
                    _context12.next = 3;
                    break;
                  }
                  this._log.error("场景名错误", scene_s_);
                  return _context12.abrupt("return", false);
                case 3:
                  _context12.next = 5;
                  return this._init_task.task;
                case 5:
                  config = new mk_bundle_.switch_scene_config(config_);
                  bundle_info = (_a = this.bundle_map.get(config.bundle_s)) !== null && _a !== void 0 ? _a : new mk_bundle_.bundle_info({
                    bundle_s: config.bundle_s
                  });
                  _context12.next = 9;
                  return this.load(bundle_info);
                case 9:
                  bundle = _context12.sent;
                  if (bundle) {
                    _context12.next = 12;
                    break;
                  }
                  return _context12.abrupt("return", false);
                case 12:
                  /** 预加载状态 */
                  preload_b = false; // 预加载
                  if (!config.progress_callback_f) {
                    _context12.next = 20;
                    break;
                  }
                  progress_callback_f = config.progress_callback_f;
                  _context12.next = 17;
                  return new Promise(function (resolve_f) {
                    bundle === null || bundle === void 0 ? void 0 : bundle.preloadScene(scene_s_, progress_callback_f, function (error) {
                      if (error) {
                        _this27._log.error(error);
                      }
                      resolve_f(!error);
                    });
                  });
                case 17:
                  preload_b = _context12.sent;
                  _context12.next = 23;
                  break;
                case 20:
                  _context12.next = 22;
                  return new Promise(function (resolve_f) {
                    bundle === null || bundle === void 0 ? void 0 : bundle.preloadScene(scene_s_, function (error) {
                      if (error) {
                        _this27._log.error(error);
                      }
                      resolve_f(!error);
                    });
                  });
                case 22:
                  preload_b = _context12.sent;
                case 23:
                  if (!(config.preload_b || !preload_b)) {
                    _context12.next = 25;
                    break;
                  }
                  return _context12.abrupt("return", preload_b);
                case 25:
                  if (config.preload_b) {
                    _context12.next = 33;
                    break;
                  }
                  this.switch_scene_b = true;
                  // 切换 bundle 事件
                  if (!(bundle.name !== this._bundle_s)) {
                    _context12.next = 30;
                    break;
                  }
                  _context12.next = 30;
                  return this.event.request(this.event.key.before_bundle_switch, {
                    curr_bundle_s: this._bundle_s,
                    next_bundle_s: config.bundle_s
                  });
                case 30:
                  _context12.next = 32;
                  return Promise.all(this.event.request(this.event.key.before_scene_switch, {
                    curr_scene_s: this._scene_s,
                    next_scene_s: scene_s_
                  }));
                case 32:
                  return _context12.abrupt("return", new Promise(function (resolve_f) {
                    bundle === null || bundle === void 0 ? void 0 : bundle.loadScene(scene_s_, function (error, scene_asset) {
                      return __awaiter$4(_this27, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
                        var _this28 = this;
                        var _a, _b, manage;
                        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                          while (1) switch (_context11.prev = _context11.next) {
                            case 0:
                              if (!error) {
                                _context11.next = 4;
                                break;
                              }
                              resolve_f(false);
                              this._log.error(error);
                              return _context11.abrupt("return");
                            case 4:
                              /** 管理器 */
                              manage = (_a = this.bundle_map.get(bundle.name)) === null || _a === void 0 ? void 0 : _a.manage; // 初始化
                              if (!manage) {
                                _context11.next = 9;
                                break;
                              }
                              _context11.next = 8;
                              return (_b = manage.init) === null || _b === void 0 ? void 0 : _b.call(manage);
                            case 8:
                              manage.valid_b = true;
                            case 9:
                              // 运行场景
                              director.runScene(scene_asset, config === null || config === void 0 ? void 0 : config.before_load_callback_f, function (error, scene) {
                                var _a, _b;
                                // 更新数据
                                if (!error) {
                                  _this28.bundle_s = bundle.name;
                                  _this28.pre_scene_s = _this28.scene_s;
                                  _this28.scene_s = scene_s_;
                                } else if (manage) {
                                  manage.valid_b = false;
                                }
                                (_a = config.unloaded_callback_f) === null || _a === void 0 ? void 0 : _a.call(config);
                                (_b = config.launched_callback_f) === null || _b === void 0 ? void 0 : _b.call(config, error, scene);
                                resolve_f(!scene);
                              });
                            case 10:
                            case "end":
                              return _context11.stop();
                          }
                        }, _callee11, this);
                      }));
                    });
                  }).then(function (result_b) {
                    _this27.switch_scene_b = false;
                    return result_b;
                  }));
                case 33:
                  return _context12.abrupt("return", false);
                case 34:
                case "end":
                  return _context12.stop();
              }
            }, _callee12, this);
          }));
        }
        /** 重新加载 bundle */;
        _proto17.reload = function reload(bundle_) {
          return __awaiter$4(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
            var _a, bundle_script_tab, system_js, script_cache_tab, bundle_root, reg, bundle;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  {
                    _context13.next = 3;
                    break;
                  }
                case 3:
                  _context13.next = 5;
                  return this._engine_init_task.task;
                case 5:
                  if (!(this.bundle_s === bundle_.bundle_s)) {
                    _context13.next = 8;
                    break;
                  }
                  this._log.error("不能在重载 bundle 的场景内进行重载");
                  return _context13.abrupt("return", null);
                case 8:
                  /** bundle 脚本表 */
                  bundle_script_tab = {};
                  /** js 系统 */
                  system_js = window["System"];
                  /** 脚本缓存表 */
                  script_cache_tab = system_js[Reflect.ownKeys(system_js).find(function (v) {
                    return typeof v === "symbol";
                  })]; // 更新 bundle 信息
                  this.set(bundle_);
                  // 初始化 bundle 脚本表
                  Object.keys(script_cache_tab).forEach(function (v_s) {
                    var current = script_cache_tab[v_s];
                    var parent = script_cache_tab[v_s].p;
                    if (!(parent === null || parent === void 0 ? void 0 : parent.d) || current.id !== parent.id) {
                      return;
                    }
                    var name_s = parent.id.slice(parent.id.lastIndexOf("/") + 1);
                    bundle_script_tab[name_s] = parent;
                  });
                  // 清理脚本缓存
                  bundle_root = (_a = bundle_script_tab[bundle_.bundle_s]) === null || _a === void 0 ? void 0 : _a.d[0];
                  if (bundle_root) {
                    bundle_root.d.forEach(function (v) {
                      system_js["delete"](v.id);
                    });
                    system_js["delete"](bundle_root.id);
                    system_js["delete"](bundle_root.p.id);
                  }
                  reg = new RegExp(bundle_.bundle_s + "(_|/)");
                  Object.keys(js._nameToClass).filter(function (v_s) {
                    return v_s.match(reg) !== null;
                  }).forEach(function (v_s) {
                    js.unregisterClass(js.getClassByName(v_s));
                  });
                  bundle = assetManager.getBundle(bundle_.bundle_s);
                  if (bundle) {
                    bundle.releaseAll();
                    assetManager.removeBundle(bundle);
                  }
                  return _context13.abrupt("return", this.load(bundle_));
                case 20:
                case "end":
                  return _context13.stop();
              }
            }, _callee13, this);
          }));
        }
        /* ------------------------------- get/set ------------------------------- */;
        _proto17._set_bundle_s = function _set_bundle_s(value_s_) {
          return __awaiter$4(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
            var _a, pre_bundle_info, bundle_info;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  this.pre_bundle_s = this._bundle_s;
                  this._bundle_s = value_s_;
                  // bundle 切换事件通知
                  if (!(this._bundle_s !== this.pre_bundle_s)) {
                    _context14.next = 10;
                    break;
                  }
                  /** 上个 bundle */
                  pre_bundle_info = this.bundle_map.get(this.pre_bundle_s);
                  /** 当前 bundle */
                  bundle_info = this.bundle_map.get(this._bundle_s); // 销毁上个 bundle
                  (_a = pre_bundle_info === null || pre_bundle_info === void 0 ? void 0 : pre_bundle_info.manage) === null || _a === void 0 ? void 0 : _a.close();
                  // 加载当前 bundle
                  if (!(bundle_info === null || bundle_info === void 0 ? void 0 : bundle_info.manage)) {
                    _context14.next = 9;
                    break;
                  }
                  _context14.next = 9;
                  return bundle_info.manage.open();
                case 9:
                  this.event.emit(this.event.key.after_bundle_switch, {
                    curr_bundle_s: this._bundle_s,
                    pre_bundle_s: this.pre_bundle_s
                  });
                case 10:
                case "end":
                  return _context14.stop();
              }
            }, _callee14, this);
          }));
        };
        _proto17._set_scene_s = function _set_scene_s(value_s) {
          this.pre_scene_s = this._scene_s;
          this._scene_s = value_s;
          // 场景切换事件通知
          if (this._scene_s !== this.pre_scene_s) {
            this.event.emit(this.event.key.after_scene_switch, {
              curr_scene_s: this._scene_s,
              pre_scene_s: this.pre_scene_s
            });
          }
        };
        _createClass(mk_bundle, [{
          key: "bundle_s",
          get: function get() {
            return this._bundle_s;
          },
          set: function set(value_s_) {
            this._set_bundle_s(value_s_);
          }
          /** 当前场景名 */
        }, {
          key: "scene_s",
          get: function get() {
            return this._scene_s;
          },
          set: function set(value_s) {
            this._set_scene_s(value_s);
          }
        }]);
        return mk_bundle;
      }(mk_instance_base);
      var mk_bundle_;
      (function (mk_bundle_) {
        /** bundle 信息 */
        var bundle_info = function bundle_info(init_) {
          Object.assign(this, init_);
        };
        mk_bundle_.bundle_info = bundle_info;
        /**
         * bundle 数据
         * @noInheritDoc
         */
        var bundle_data = /*#__PURE__*/function (_bundle_info) {
          _inheritsLoose(bundle_data, _bundle_info);
          function bundle_data(init_) {
            var _this29;
            _this29 = _bundle_info.call(this, init_) || this;
            Object.assign(_assertThisInitialized(_this29), init_);
            return _this29;
          }
          return bundle_data;
        }(bundle_info);
        mk_bundle_.bundle_data = bundle_data;
        /** load 配置 */
        var load_config = function load_config(init_) {
          Object.assign(this, init_);
        };
        mk_bundle_.load_config = load_config;
        /** switch_scene 配置 */
        var switch_scene_config = function switch_scene_config(init_) {
          Object.assign(this, init_);
        };
        mk_bundle_.switch_scene_config = switch_scene_config;
        /**
         * bundle 管理器基类
         * @noInheritDoc
         * @remarks
         * 注意生命周期函数 init、open、close 会自动执行父类函数再执行子类函数，不必手动 super.xxx 调用
         */
        var bundle_manage_base = /*#__PURE__*/function () {
          function bundle_manage_base() {
            var _this30 = this;
            /** 管理器有效状态 */
            this.valid_b = false;
            /* --------------- protected --------------- */
            /** 释放管理器 */
            this._release_manage = new mk_release();
            // 添加至 bundle 数据
            setTimeout(function () {
              return __awaiter$4(_this30, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
                return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      {
                        _context15.next = 4;
                        break;
                      }
                    case 3:
                      this.open();
                    case 4:
                      mk_bundle.instance().set({
                        bundle_s: this.name_s,
                        manage: this
                      });
                    case 5:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15, this);
              }));
            }, 0);
            // 对象池
            this.node_pool_tab = new Proxy(js.createMap(true), {
              get: function get(target_, key_) {
                if (!target_[key_]) {
                  target_[key_] = new NodePool(key_);
                }
                return target_[key_];
              }
            });
            // 自动执行生命周期
            mk_tool_func$1.run_parent_func(this, ["init", "open", "close"]);
          }
          /**
           * 打开回调
           * @remarks
           * 从其他 bundle 的场景切换到此 bundle 的场景时调用
           */
          var _proto18 = bundle_manage_base.prototype;
          _proto18.open = function open() {
            if (this.valid_b) {
              mk_log.error("bundle 已经加载");
              throw "中断";
            }
            this.valid_b = true;
          }
          /**
           * 关闭回调
           * @remarks
           * 从此 bundle 的场景切换到其他 bundle 的场景时调用
           */;
          _proto18.close = function close() {
            var _a, _b;
            if (!this.valid_b) {
              mk_log.error("bundle 已经卸载");
              throw "中断";
            }
            this.valid_b = false;
            // 清理事件
            this.event.clear();
            // 清理网络事件
            (_a = this.network) === null || _a === void 0 ? void 0 : _a.event.clear();
            // 清理数据
            (_b = this.data) === null || _b === void 0 ? void 0 : _b.reset();
            // 清理对象池
            for (var k_s in this.node_pool_tab) {
              if (Object.prototype.hasOwnProperty.call(this.node_pool_tab, k_s)) {
                this.node_pool_tab[k_s].clear();
                delete this.node_pool_tab[k_s];
              }
            }
            // 释放对象
            this._release_manage.release_all();
          }
          /* ------------------------------- 功能 ------------------------------- */;
          _proto18.follow_release = function follow_release(object_) {
            if (!object_) {
              return object_;
            }
            // 添加释放对象
            this._release_manage.add(object_);
            // 如果管理器已经关闭则直接释放
            if (!this.valid_b) {
              this._release_manage.release_all();
            }
            return object_;
          };
          _proto18.cancel_release = function cancel_release(object_) {
            if (!object_) {
              return object_;
            }
            // 添加释放对象
            this._release_manage.release(object_);
            return object_;
          };
          return bundle_manage_base;
        }();
        mk_bundle_.bundle_manage_base = bundle_manage_base;
      })(mk_bundle_ || (mk_bundle_ = {}));
      var mk_bundle$1 = mk_bundle.instance();
      var __awaiter$3 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**
       * 游戏全局功能
       * @noInheritDoc
       */
      var mk_game = /*#__PURE__*/function (_mk_instance_base8) {
        _inheritsLoose(mk_game, _mk_instance_base8);
        function mk_game() {
          var _this31;
          _this31 = _mk_instance_base8.apply(this, arguments) || this;
          /* --------------- private --------------- */
          /** 重启中 */
          _this31._restarting_b = false;
          /** 暂停数据 */
          _this31._pause_data_map = new Map();
          return _this31;
        }
        /* --------------- public --------------- */
        /** 重启中 */
        var _proto19 = mk_game.prototype;
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 重启游戏
         * @remarks
         * 请不要使用 cc.game.restart()，因为这会影响框架内的数据清理以及生命周期
         */
        _proto19.restart = function restart() {
          return __awaiter$3(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
            return _regeneratorRuntime().wrap(function _callee16$(_context16) {
              while (1) switch (_context16.prev = _context16.next) {
                case 0:
                  this._restarting_b = true;
                  _context16.next = 3;
                  return Promise.all(global_event.request(global_event.key.wait_close_scene));
                case 3:
                  _context16.next = 5;
                  return Promise.all(global_event.request(global_event.key.restart));
                case 5:
                  game.restart();
                  this._restarting_b = false;
                case 7:
                case "end":
                  return _context16.stop();
              }
            }, _callee16, this);
          }));
        }
        /**
         * 暂停节点
         * @param node_ 目标节点
         * @param recursion_b_ 是否递归子节点
         */;
        _proto19.pause = function pause(node_, recursion_b_) {
          var _this32 = this;
          if (recursion_b_ === void 0) {
            recursion_b_ = false;
          }
          var _a;
          /** 龙骨 */
          var dragon_bones = !dragonBones ? null : node_.getComponent(dragonBones.ArmatureDisplay);
          /** spine */
          var spine = !sp ? null : node_.getComponent(sp.Skeleton);
          /** 暂停数据 */
          var pause_data = this._pause_data_map.get(node_);
          if (!pause_data) {
            this._pause_data_map.set(node_, pause_data = {});
          }
          // 定时器
          director.getScheduler().pauseTarget(node_);
          // 动画
          (_a = node_.getComponent(Animation)) === null || _a === void 0 ? void 0 : _a.pause();
          // 缓动
          TweenSystem.instance.ActionManager.pauseTarget(node_);
          // 龙骨
          if (dragon_bones) {
            pause_data.dragon_bones_time_scale_n = dragon_bones.timeScale;
            dragon_bones.timeScale = 0;
          }
          // spine
          if (spine) {
            pause_data.spine_time_scale_n = spine.timeScale;
            spine.timeScale = 0;
          }
          // 递归
          if (recursion_b_) {
            node_.children.forEach(function (v) {
              _this32.pause(v, recursion_b_);
            });
          }
        }
        /**
         * 恢复节点
         * @param node_ 目标节点
         * @param recursion_b_ 是否递归子节点
         */;
        _proto19.resume = function resume(node_, recursion_b_) {
          var _this33 = this;
          if (recursion_b_ === void 0) {
            recursion_b_ = false;
          }
          var _a, _b, _c;
          /** 龙骨 */
          var dragon_bones = !dragonBones ? null : node_.getComponent(dragonBones.ArmatureDisplay);
          /** spine */
          var spine = !sp ? null : node_.getComponent(sp.Skeleton);
          /** 暂停数据 */
          var pause_data = this._pause_data_map.get(node_);
          // 定时器
          director.getScheduler().resumeTarget(node_);
          // 动画
          (_a = node_.getComponent(Animation)) === null || _a === void 0 ? void 0 : _a.resume();
          // 缓动
          TweenSystem.instance.ActionManager.resumeTarget(node_);
          // 龙骨
          if (dragon_bones) {
            dragon_bones.timeScale = (_b = pause_data === null || pause_data === void 0 ? void 0 : pause_data.dragon_bones_time_scale_n) !== null && _b !== void 0 ? _b : 1;
          }
          // spine
          if (spine) {
            spine.timeScale = (_c = pause_data === null || pause_data === void 0 ? void 0 : pause_data.spine_time_scale_n) !== null && _c !== void 0 ? _c : 1;
          }
          // 递归
          if (recursion_b_) {
            node_.children.forEach(function (v) {
              _this33.resume(v, recursion_b_);
            });
          }
        };
        _createClass(mk_game, [{
          key: "restarting_b",
          get: function get() {
            return this._restarting_b;
          }
        }]);
        return mk_game;
      }(mk_instance_base);
      var mk_game$1 = exports('game', mk_game.instance());
      var __awaiter$2 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var _mk_asset;
      (function (_mk_asset) {
        /** 释放信息 */
        var release_info = function release_info(init_) {
          /** 添加时间 */
          this.join_time_ms_n = Date.now();
          Object.assign(this, init_);
        };
        _mk_asset.release_info = release_info;
      })(_mk_asset || (_mk_asset = {}));
      /**
       * 资源管理器
       * @noInheritDoc
       * @remarks
       *
       * - 统一加载接口为 get、get_dir
       *
       * - 支持 EDITOR 环境加载资源
       *
       * - 加载图片无需后缀，通过类型自动添加
       *
       * - 加载路径扩展，例：db://xxx.prefab
       *
       * - 资源默认引用为 2，引用为 1 时将在 global_config.resources.cache_lifetime_ms_n 时间后自动释放
       *
       * - 通过 cache_lifetime_ms_n 修复短时间内(释放/加载)同一资源导致加载资源是已释放后的问题
       *
       * - 解决同时加载同一资源多次导致返回的资源对象不一致（对象不一致会导致引用计数不一致）
       *
       * - 增加强制性资源跟随释放对象
       */
      var mk_asset = /*#__PURE__*/function (_mk_instance_base9) {
        _inheritsLoose(mk_asset, _mk_instance_base9);
        function mk_asset() {
          var _this34;
          _this34 = _mk_instance_base9.call(this) || this;
          /* --------------- private --------------- */
          /** 日志 */
          _this34._log = new mk_logger("asset");
          /** 管理表 */
          _this34._asset_manage_map = new Map();
          /** 释放表 */
          _this34._asset_release_map = new Map();
          // 重载 decRef 函数
          {
            /** 当前对象 */
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var _self = _assertThisInitialized(_this34);
            /** decRef 原函数 */
            var origin_f = Asset.prototype.decRef;
            Asset.prototype.decRef = function () {
              var _this35 = this;
              for (var _len21 = arguments.length, args_as = new Array(_len21), _key24 = 0; _key24 < _len21; _key24++) {
                args_as[_key24] = arguments[_key24];
              }
              var result = origin_f.call.apply(origin_f, [this].concat(args_as));
              // 跳过未纳入管理资源
              if (!_self._asset_manage_map.has(this.nativeUrl || this._uuid)) {
                return result;
              }
              // 重启期间直接销毁
              if (mk_game$1.restarting_b) {
                // 等待场景关闭后释放资源
                Promise.all(global_event.request(global_event.key.wait_close_scene)).then(function (v) {
                  mk_asset.instance().release(_this35);
                });
                return result;
              }
              // 加载后默认引用加 2 防止资源自动释放
              if (this.refCount === 1) {
                _self._asset_release_map.set(this.nativeUrl || this._uuid, new _mk_asset.release_info({
                  asset: this
                }));
              }
              return result;
            };
          }
          // 定时自动释放资源
          _this34._release_timer = setInterval(_this34._auto_release_asset.bind(_assertThisInitialized(_this34)), mk_asset._config.cache_lifetime_ms_n);
          // 事件监听
          setTimeout(function () {
            global_event.once(global_event.key.restart, _this34._event_restart, mk_asset.instance());
          }, 0);
          return _this34;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 获取资源
         * @param path_s_ 资源路径
         * @param type_ 资源类型
         * @param target_ 跟随释放对象
         * @param config_ 获取配置
         * @returns
         */
        var _proto20 = mk_asset.prototype;
        _proto20.get = function get(path_s_, type_, target_, config_) {
          var _this36 = this;
          /** 获取配置 */
          var get_config = config_ !== null && config_ !== void 0 ? config_ : {};
          /** 远程资源 */
          var remote_b = Boolean(get_config.remote_option);
          // 参数转换
          {
            // 去除无用信息
            if (path_s_.startsWith("db://assets/")) {
              path_s_ = path_s_.slice(12);
              // 补齐 bundle
              {
                var dir_s = path_s_.slice(0, path_s_.indexOf("/"));
                path_s_ = path_s_.slice(dir_s.length + 1);
                // 填充 bundle 名
                if (!get_config.bundle_s) {
                  get_config.bundle_s = dir_s;
                }
              }
            }
            // 删除路径后缀
            if (!remote_b) {
              var index_n = path_s_.lastIndexOf(".");
              if (index_n !== -1) {
                path_s_ = path_s_.slice(0, index_n);
              }
            }
            // 图片类型后缀
            if (!remote_b) {
              var asset_type = type_;
              if (asset_type === SpriteFrame && !path_s_.endsWith("/spriteFrame")) {
                path_s_ += "/spriteFrame";
              } else if (asset_type === Texture2D && !path_s_.endsWith("/texture")) {
                path_s_ += "/texture";
              }
            }
          }
          return new Promise(function (resolve_f) {
            return __awaiter$2(_this36, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
              var _this37 = this;
              var _a, _c, _d, _e, completed_f, asset_config, uuid_s, bundle_asset, asset;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    /** 完成回调 */
                    completed_f = function completed_f(error, asset) {
                      var _a, _b;
                      if (error) {
                        _this37._log.error("get " + path_s_ + " \u9519\u8BEF", error);
                      } else {
                        _this37._log.debug("get " + path_s_ + " \u5B8C\u6210");
                      }
                      if (error || EDITOR) {
                        (_a = get_config.completed_f) === null || _a === void 0 ? void 0 : _a.call(get_config, error, asset);
                        resolve_f(asset);
                        return;
                      }
                      // 资源初始化
                      asset = _this37._asset_init(asset);
                      // 执行回调
                      (_b = get_config.completed_f) === null || _b === void 0 ? void 0 : _b.call(get_config, error, asset);
                      // 跟随释放
                      target_ === null || target_ === void 0 ? void 0 : target_.follow_release(asset);
                      resolve_f(asset);
                    }; // 远程
                    if (!remote_b) {
                      _context17.next = 5;
                      break;
                    }
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    assetManager.loadRemote(path_s_, Object.assign({
                      onFileProgress: get_config.progress_f
                    }, (_a = get_config.remote_option) !== null && _a !== void 0 ? _a : {}), completed_f);
                    _context17.next = 39;
                    break;
                  case 5:
                    {
                      _context17.next = 24;
                      break;
                    }
                  case 13:
                    uuid_s = _context17.sent;
                    if (uuid_s) {
                      _context17.next = 19;
                      break;
                    }
                    this._log.error("获取 uuid 失败", path_s_);
                    (_c = get_config.completed_f) === null || _c === void 0 ? void 0 : _c.call(get_config, new Error("获取 uuid 失败，" + path_s_), null);
                    resolve_f(null);
                    return _context17.abrupt("return");
                  case 19:
                    // 如果是 spriteFrame 添加后缀
                    if (type_ === SpriteFrame) {
                      uuid_s += "@f9941";
                    }
                    asset_config.uuid = uuid_s;
                    if (get_config.progress_f) {
                      assetManager.loadAny(asset_config, get_config.progress_f, completed_f);
                    } else {
                      assetManager.loadAny(asset_config, completed_f);
                    }
                    _context17.next = 39;
                    break;
                  case 24:
                    if (!get_config.bundle_s) {
                      _context17.next = 30;
                      break;
                    }
                    _context17.next = 27;
                    return mk_bundle$1.load(get_config.bundle_s);
                  case 27:
                    _context17.t0 = _context17.sent;
                    _context17.next = 31;
                    break;
                  case 30:
                    _context17.t0 = resources;
                  case 31:
                    bundle_asset = _context17.t0;
                    if (bundle_asset) {
                      _context17.next = 37;
                      break;
                    }
                    this._log.error("未获取到 bundle 信息");
                    (_d = get_config.completed_f) === null || _d === void 0 ? void 0 : _d.call(get_config, new Error("未获取到 bundle 信息，" + get_config.bundle_s), null);
                    resolve_f(null);
                    return _context17.abrupt("return");
                  case 37:
                    // 获取资源
                    asset = bundle_asset.get(path_s_, type_); // 已加载资源
                    if (asset) {
                      // 模拟回调
                      (_e = get_config.progress_f) === null || _e === void 0 ? void 0 : _e.call(get_config, 1, 1);
                      completed_f(null, asset);
                    }
                    // 加载资源
                    else {
                      if (get_config.progress_f) {
                        bundle_asset.load(path_s_, type_, get_config.progress_f, completed_f);
                      } else {
                        bundle_asset.load(path_s_, type_, completed_f);
                      }
                    }
                  case 39:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17, this);
            }));
          });
        }
        /**
         * 获取文件夹资源
         * @param path_s_ 资源路径
         * @param type_ 资源类型
         * @param target_ 跟随释放对象
         * @param config_ 获取配置
         * @returns
         */;
        _proto20.get_dir = function get_dir(path_s_, type_, target_, config_) {
          var _this38 = this;
          var _a;
          /** 获取配置 */
          var get_config = config_ !== null && config_ !== void 0 ? config_ : {};
          /** 资源配置 */
          var asset_config;
          // 参数转换
          {
            // 去除无用信息
            if (path_s_.startsWith("db://assets/")) {
              path_s_ = path_s_.slice(12);
              // 补齐 bundle
              {
                var dir_s = path_s_.slice(0, path_s_.indexOf("/"));
                path_s_ = path_s_.slice(dir_s.length + 1);
                // 填充 bundle 名
                if (!get_config.bundle_s) {
                  get_config.bundle_s = dir_s;
                }
              }
            }
            // 补全加载配置
            {
              if (!get_config.remote_option) {
                get_config.remote_option = {};
              }
              asset_config = get_config.remote_option;
              asset_config.bundle = (_a = get_config.bundle_s) !== null && _a !== void 0 ? _a : "resources";
              asset_config.type = type_;
              asset_config.dir = path_s_;
            }
          }
          return new Promise(function (resolve_f) {
            return __awaiter$2(_this38, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
              var _this39 = this;
              var _b, _c, dir_asset_as, completed_f, bundle_asset, asset_info_as, _loop, _ret, _iterator4, _step4;
              return _regeneratorRuntime().wrap(function _callee18$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    /** 文件夹资源列表 */
                    dir_asset_as = [];
                    /** 完成回调 */
                    completed_f = function completed_f(error) {
                      var _a, _b;
                      if (error) {
                        _this39._log.error("get_dir " + path_s_ + " \u9519\u8BEF", error);
                        // 执行回调
                        (_a = get_config.completed_f) === null || _a === void 0 ? void 0 : _a.call(get_config, error, []);
                        resolve_f(null);
                      } else {
                        _this39._log.debug("get_dir " + path_s_ + " \u5B8C\u6210");
                      }
                      // 资源初始化
                      dir_asset_as.forEach(function (v, k_n) {
                        dir_asset_as[k_n] = _this39._asset_init(v);
                      });
                      // 执行回调
                      (_b = get_config.completed_f) === null || _b === void 0 ? void 0 : _b.call(get_config, error, dir_asset_as);
                      // 跟随释放
                      if (target_ === null || target_ === void 0 ? void 0 : target_.follow_release) {
                        dir_asset_as.forEach(function (v) {
                          target_.follow_release(v);
                        });
                      }
                      resolve_f(dir_asset_as);
                    }; // 编辑器
                    {
                      _context19.next = 8;
                      break;
                    }
                  case 8:
                    _context19.next = 10;
                    return mk_bundle$1.load(asset_config.bundle);
                  case 10:
                    bundle_asset = _context19.sent;
                    if (bundle_asset) {
                      _context19.next = 16;
                      break;
                    }
                    this._log.error("未获取到 bundle 信息");
                    (_b = get_config.completed_f) === null || _b === void 0 ? void 0 : _b.call(get_config, new Error("未获取到 bundle 信息，" + asset_config.bundle), null);
                    resolve_f(null);
                    return _context19.abrupt("return");
                  case 16:
                    /** 资源信息列表 */
                    asset_info_as = bundle_asset.getDirWithPath(path_s_, type_); // 加载资源
                    _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                      var _step4$value, k_n, v, asset, success_b;
                      return _regeneratorRuntime().wrap(function _loop$(_context18) {
                        while (1) switch (_context18.prev = _context18.next) {
                          case 0:
                            _step4$value = _step4.value, k_n = _step4$value[0], v = _step4$value[1];
                            asset = bundle_asset.get(v.path, type_); // 已加载资源
                            if (!asset) {
                              _context18.next = 6;
                              break;
                            }
                            dir_asset_as.push(asset);
                            _context18.next = 11;
                            break;
                          case 6:
                            _context18.next = 8;
                            return new Promise(function (resolve_f) {
                              bundle_asset.load(v.path, type_, function (error, asset) {
                                if (error) {
                                  completed_f(error);
                                  return;
                                }
                                dir_asset_as.push(asset);
                                resolve_f(!error);
                              });
                            });
                          case 8:
                            success_b = _context18.sent;
                            if (success_b) {
                              _context18.next = 11;
                              break;
                            }
                            return _context18.abrupt("return", {
                              v: void 0
                            });
                          case 11:
                            // 模拟回调
                            (_c = get_config.progress_f) === null || _c === void 0 ? void 0 : _c.call(get_config, k_n + 1, asset_info_as.length);
                          case 12:
                          case "end":
                            return _context18.stop();
                        }
                      }, _loop);
                    });
                    _iterator4 = _createForOfIteratorHelperLoose(asset_info_as.entries());
                  case 19:
                    if ((_step4 = _iterator4()).done) {
                      _context19.next = 26;
                      break;
                    }
                    return _context19.delegateYield(_loop(), "t0", 21);
                  case 21:
                    _ret = _context19.t0;
                    if (!_ret) {
                      _context19.next = 24;
                      break;
                    }
                    return _context19.abrupt("return", _ret.v);
                  case 24:
                    _context19.next = 19;
                    break;
                  case 26:
                    completed_f(null);
                  case 27:
                  case "end":
                    return _context19.stop();
                }
              }, _callee18, this);
            }));
          });
        }
        /**
         * 释放资源
         * @param asset_ 释放的资源
         */;
        _proto20.release = function release(asset_) {
          var _this40 = this;
          var asset_as = Array.isArray(asset_) ? asset_ : [asset_];
          asset_as.forEach(function (v) {
            var _a;
            if (!v.isValid) {
              return;
            }
            // 释放动态图集中的资源
            if ((_a = dynamicAtlasManager) === null || _a === void 0 ? void 0 : _a.enabled) {
              if (v instanceof SpriteFrame) {
                dynamicAtlasManager.deleteAtlasSpriteFrame(v);
              } else if (v instanceof Texture2D) {
                dynamicAtlasManager.deleteAtlasTexture(v);
              }
            }
            // 更新引用计数
            for (var k_n = 0; k_n < v.refCount; k_n++) {
              v.decRef(false);
            }
            // 释放资源，禁止自动释放，否则会出现释放后立即加载当前资源导致加载返回资源是已释放后的
            assetManager.releaseAsset(v);
            // 更新资源管理表
            _this40._asset_manage_map["delete"](v.nativeUrl || v._uuid);
            _this40._log.debug("释放资源", v.name, v.nativeUrl, v._uuid);
          });
        }
        /** 资源初始化 */;
        _proto20._asset_init = function _asset_init(asset_) {
          /** 已加载资源 */
          var loaded_asset = this._asset_manage_map.get(asset_.nativeUrl || asset_._uuid);
          // 如果资源已经加载，则返回的资源是一个新资源，此时引用计数和前一个对象不一致，需要替换
          if (loaded_asset) {
            // 引用计数更新
            loaded_asset.addRef();
            return loaded_asset;
          } else {
            // 引用计数更新
            asset_.addRef();
            asset_.addRef();
            this._asset_manage_map.set(asset_.nativeUrl || asset_._uuid, asset_);
            return asset_;
          }
        }
        /**
         * 自动释放资源
         * @param force_b_ 强制
         * @returns
         */;
        _proto20._auto_release_asset = function _auto_release_asset(force_b_) {
          if (force_b_ === void 0) {
            force_b_ = false;
          }
          /** 当前时间 */
          var current_time_ms_n = Date.now();
          if (force_b_) {
            var assets_as = [];
            this._asset_release_map.forEach(function (v) {
              // 已经被释放或增加了引用计数
              if (!v.asset.isValid || v.asset.refCount !== 1) {
                return;
              }
              assets_as.push(v.asset);
            });
            // 清理释放表
            this._asset_release_map.clear();
            // 释放资源
            this.release(assets_as);
          } else {
            for (var _iterator5 = _createForOfIteratorHelperLoose(this._asset_release_map.entries()), _step5; !(_step5 = _iterator5()).done;) {
              var _step5$value = _step5.value,
                k_s = _step5$value[0],
                v = _step5$value[1];
              // 当前及之后的资源没超过生命时长
              if (current_time_ms_n - v.join_time_ms_n < mk_asset._config.cache_lifetime_ms_n) {
                break;
              }
              this._asset_release_map["delete"](k_s);
              // 已经被释放或增加了引用计数
              if (!v.asset.isValid || v.asset.refCount !== 1) {
                return;
              }
              // 释放资源
              this.release(v.asset);
            }
          }
        }
        /* ------------------------------- 全局事件 ------------------------------- */;
        _proto20._event_restart = function _event_restart() {
          return __awaiter$2(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
            return _regeneratorRuntime().wrap(function _callee19$(_context20) {
              while (1) switch (_context20.prev = _context20.next) {
                case 0:
                  _context20.next = 2;
                  return Promise.all(global_event.request(global_event.key.wait_close_scene));
                case 2:
                  // 立即释放资源
                  this._auto_release_asset(true);
                  // 清理定时器
                  clearInterval(this._release_timer);
                  // 释放 bundle 资源
                  assetManager.bundles.forEach(function (v) {
                    if (v["releaseUnusedAssets"]) {
                      v["releaseUnusedAssets"]();
                    } else {
                      v.releaseAll();
                    }
                  });
                case 5:
                case "end":
                  return _context20.stop();
              }
            }, _callee19, this);
          }));
        };
        return mk_asset;
      }(mk_instance_base);
      /* --------------- static --------------- */
      /** 全局配置 */
      mk_asset._config = global_config$1.asset.config;
      var mk_asset$1 = exports('asset', mk_asset.instance());

      /** 位运算 */
      var mk_tool_byte = /*#__PURE__*/function (_mk_instance_base10) {
        _inheritsLoose(mk_tool_byte, _mk_instance_base10);
        function mk_tool_byte() {
          return _mk_instance_base10.apply(this, arguments) || this;
        }
        var _proto21 = mk_tool_byte.prototype;
        /** 指定位设1 */
        _proto21.set_bit = function set_bit(value_n_, index_n_) {
          return value_n_ |= index_n_;
        }
        /** 指定位清0 */;
        _proto21.clr_bit = function clr_bit(value_n_, index_n_) {
          return value_n_ &= ~index_n_;
        }
        /** 返回指定位 */;
        _proto21.get_bit = function get_bit(value_n_, index_n_) {
          return value_n_ & index_n_;
        };
        return mk_tool_byte;
      }(mk_instance_base);
      var mk_tool_byte$1 = mk_tool_byte.instance();

      /** 枚举扩展 */
      var mk_tool_enum = /*#__PURE__*/function (_mk_instance_base11) {
        _inheritsLoose(mk_tool_enum, _mk_instance_base11);
        function mk_tool_enum() {
          return _mk_instance_base11.apply(this, arguments) || this;
        }
        var _proto22 = mk_tool_enum.prototype;
        /** 转换对象为枚举 */
        _proto22.obj_to_enum = function obj_to_enum(value_) {
          var result = {};
          if (!value_) {
            return result;
          }
          if (typeof value_ === "object") {
            Object.keys(value_).forEach(function (v_s, k_n) {
              result[k_n] = v_s;
              result[v_s] = k_n;
            });
          }
          return result;
        };
        _proto22.getEnumKeyByValue = function getEnumKeyByValue(enumObj, value) {
          return Object.keys(enumObj).find(function (key) {
            return enumObj[key] === value;
          });
        };
        return mk_tool_enum;
      }(mk_instance_base);
      var mk_tool_enum$1 = mk_tool_enum.instance();
      var mk_tool_object = /*#__PURE__*/function (_mk_instance_base12) {
        _inheritsLoose(mk_tool_object, _mk_instance_base12);
        function mk_tool_object() {
          return _mk_instance_base12.apply(this, arguments) || this;
        }
        var _proto23 = mk_tool_object.prototype;
        /** 克隆对象 */
        _proto23.clone = function clone(target_, record_set) {
          if (record_set === void 0) {
            record_set = new Set();
          }
          var result;
          switch (typeof target_) {
            case "object":
              {
                // 数组：遍历拷贝
                if (Array.isArray(target_)) {
                  if (record_set.has(target_)) {
                    return target_;
                  }
                  record_set.add(target_);
                  result = [];
                  for (var k_n = 0; k_n < target_.length; ++k_n) {
                    // 递归克隆数组中的每一项
                    result.push(this.clone(target_[k_n], record_set));
                  }
                }
                // null：直接赋值
                else if (target_ === null) {
                  result = null;
                }
                // RegExp：直接赋值
                else if (target_.constructor === RegExp) {
                  result = target_;
                }
                // 普通对象：循环递归赋值对象的所有值
                else {
                  if (record_set.has(target_)) {
                    return target_;
                  }
                  record_set.add(target_);
                  result = {};
                  for (var k_s in target_) {
                    result[k_s] = this.clone(target_[k_s], record_set);
                  }
                }
                break;
              }
            case "function":
              {
                result = target_.bind({});
                break;
              }
            default:
              {
                result = target_;
              }
          }
          return result;
        }
        /**
         * 重置数据
         * @param data_ class 类型数据
         * @param assign_b_ 使用新对象覆盖属性
         * @returns
         * @remarks
         * 注意构造内的 this 对象不是 data_
         */;
        _proto23.reset = function reset(data_, assign_b_) {
          if (!(data_ === null || data_ === void 0 ? void 0 : data_.constructor)) {
            mk_log.error("数据类型错误");
            return null;
          }
          if (assign_b_) {
            Object.assign(data_, new data_.constructor());
            return null;
          } else {
            return new data_.constructor();
          }
        }
        /**
         * 遍历对象
         * @param target_ 对象
         * @param callback_f_ 回调函数
         * @returns
         */;
        _proto23.traverse = function traverse(target_, callback_f_) {
          return this._traverse(target_, callback_f_);
        }
        /** 遍历对象 */;
        _proto23._traverse = function _traverse(target_, callback_f_, path_s_, record_set) {
          var _this41 = this;
          if (path_s_ === void 0) {
            path_s_ = "";
          }
          if (record_set === void 0) {
            record_set = new Set();
          }
          switch (typeof target_) {
            case "object":
              {
                // 数组：遍历
                if (Array.isArray(target_)) {
                  if (record_set.has(target_)) {
                    return;
                  }
                  record_set.add(target_);
                  target_.forEach(function (v, k_n) {
                    // 递归数组中的每一项
                    callback_f_(target_[k_n], k_n + "", path_s_);
                    _this41._traverse(target_[k_n], callback_f_, path_s_ ? path_s_ + "/" + k_n : k_n + "", record_set);
                  });
                }
                // 普通对象：循环递归赋值对象的所有值
                else {
                  if (record_set.has(target_)) {
                    return;
                  }
                  record_set.add(target_);
                  for (var k_s in target_) {
                    callback_f_(target_[k_s], k_s, path_s_);
                    this._traverse(target_[k_s], callback_f_, path_s_ ? path_s_ + "/" + k_s : k_s, record_set);
                  }
                }
                break;
              }
          }
        };
        return mk_tool_object;
      }(mk_instance_base);
      var mk_tool_object$1 = mk_tool_object.instance();
      var mk_tool_string = /*#__PURE__*/function (_mk_instance_base13) {
        _inheritsLoose(mk_tool_string, _mk_instance_base13);
        function mk_tool_string() {
          return _mk_instance_base13.apply(this, arguments) || this;
        }
        var _proto24 = mk_tool_string.prototype;
        /**
         * 字符串相似度
         * @param v_s_ 字符集
         * @param v2_s_ 对比字符
         * @returns 0-1
         * @remarks
         * 编辑距离算法
         */
        _proto24.similarity_edit_dist = function similarity_edit_dist(v_s_, v2_s_) {
          var v_len_n = v_s_.length;
          var v2_len_n = v2_s_.length;
          // 安检
          {
            if (v_len_n == 0) {
              return v2_len_n;
            }
            if (v2_len_n == 0) {
              return v_len_n;
            }
          }
          var dist_nss = [];
          // 二维距离表格
          {
            for (var k_n = 0; k_n <= v_len_n; k_n++) {
              dist_nss[k_n] = [];
              dist_nss[k_n][0] = k_n;
            }
            for (var _k_n = 0; _k_n <= v2_len_n; _k_n++) {
              dist_nss[0][_k_n] = _k_n;
            }
          }
          // 计算每个格子距离
          {
            var v_curr_s;
            var v2_curr_s;
            for (var _k_n2 = 1; _k_n2 <= v_len_n; _k_n2++) {
              v_curr_s = v_s_.charAt(_k_n2 - 1);
              for (var k2_n = 1; k2_n <= v2_len_n; k2_n++) {
                v2_curr_s = v2_s_.charAt(k2_n - 1);
                dist_nss[_k_n2][k2_n] = Math.min(dist_nss[_k_n2 - 1][k2_n] + 1, dist_nss[_k_n2][k2_n - 1] + 1, dist_nss[_k_n2 - 1][k2_n - 1] + (v_curr_s == v2_curr_s ? 0 : 1));
              }
            }
          }
          // 返回右下角距离的比例
          return Number((1 - dist_nss[v_len_n][v2_len_n] / Math.max(v_s_.length, v2_s_.length)).toFixed(4));
        }
        /**
         * 模糊匹配
         * @param args_ 字符集
         * @param key_s_ 对比字符
         * @param min_simile_n_ 最小相似度
         * @returns
         * @remarks
         * 多个源字符串时返回相似度最高的字符串
         */;
        _proto24.fuzzy_match = function fuzzy_match(args_, key_s_, min_simile_n_) {
          var _this42 = this;
          if (min_simile_n_ === void 0) {
            min_simile_n_ = 0;
          }
          if (!key_s_) {
            return null;
          }
          var source_ss;
          if (typeof args_ === "string") {
            source_ss = [args_];
          } else {
            source_ss = args_;
          }
          var match_result_ss = [];
          var key_ss = key_s_.split("");
          var index_n;
          source_ss.forEach(function (v_s) {
            index_n = -1;
            for (var k2_n = 0; k2_n < key_ss.length; ++k2_n) {
              // 有一个关键字都没匹配到，则没有匹配到数据
              if (v_s.indexOf(key_ss[k2_n]) < 0) {
                break;
              } else {
                var reg = RegExp("" + key_ss[k2_n], "g");
                var exec_result = void 0;
                while ((exec_result = reg.exec(v_s)) !== null) {
                  if (exec_result.index > index_n) {
                    index_n = exec_result.index;
                    if (k2_n === key_ss.length - 1) {
                      match_result_ss.push(v_s);
                      return;
                    }
                    break;
                  }
                }
              }
            }
          });
          if (!match_result_ss.length) {
            return null;
          }
          // 返回相识度最高的字符串
          else {
            match_result_ss.sort(function (v_a_s, v_b_s) {
              return _this42.similarity_edit_dist(v_b_s, key_s_) - _this42.similarity_edit_dist(v_a_s, key_s_);
            });
            return this.similarity_edit_dist(match_result_ss[0], key_s_) >= min_simile_n_ ? match_result_ss[0] : key_s_;
          }
        };
        return mk_tool_string;
      }(mk_instance_base);
      var mk_tool_string$1 = mk_tool_string.instance();
      var mk_tool = exports('tool', /*#__PURE__*/Object.freeze({
        __proto__: null,
        "byte": mk_tool_byte$1,
        "enum": mk_tool_enum$1,
        func: mk_tool_func$1,
        object: mk_tool_object$1,
        string: mk_tool_string$1
      }));
      var __awaiter$1 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**
       * 数据监听器（类型安全）
       * @noInheritDoc
       * @remarks
       * 可以用以 mvvm 搭建及使用，注意：监听回调仅在下一帧被调用
       */
      var mk_monitor = /*#__PURE__*/function (_mk_instance_base14) {
        _inheritsLoose(mk_monitor, _mk_instance_base14);
        function mk_monitor() {
          var _this43;
          _this43 = _mk_instance_base14.apply(this, arguments) || this;
          /** 日志管理 */
          _this43._log = new mk_logger("monitor");
          /** 绑定数据图 */
          _this43._bind_data_map = new Map();
          /** 对象绑定数据图 */
          _this43._target_bind_data = new Map();
          return _this43;
        }
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 监听 value_ 数据修改同步到 value2_
         * @param value_ 对象
         * @param key_ 键
         * @param value2_ 对象2
         * @param key2_ 键2
         * @param target_ 绑定对象
         * @returns 监听回调
         */
        var _proto25 = mk_monitor.prototype;
        _proto25.sync = function sync(value_, key_, value2_, key2_, target_) {
          var callback_f = function callback_f(value) {
            value2_[key2_] = value;
          };
          value2_[key2_] = value_[key_];
          return this.on(value_, key_, callback_f, target_);
        }
        /**
         * 等待监听回调执行完成
         * @param value_ 对象
         * @param key_ 键
         * @returns
         */;
        _proto25.wait = function wait(value_, key_) {
          return __awaiter$1(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
            var bind_data;
            return _regeneratorRuntime().wrap(function _callee20$(_context21) {
              while (1) switch (_context21.prev = _context21.next) {
                case 0:
                  bind_data = this._get_bind_data(value_, key_, false);
                  if (bind_data === null || bind_data === void 0 ? void 0 : bind_data.task) {
                    _context21.next = 3;
                    break;
                  }
                  return _context21.abrupt("return");
                case 3:
                  if (!(bind_data.recursive_count_n > 1)) {
                    _context21.next = 6;
                    break;
                  }
                  this._log.error("递归，不能在当前对象回调内等待当前对象回调执行完成");
                  return _context21.abrupt("return");
                case 6:
                  _context21.next = 8;
                  return bind_data.task.task;
                case 8:
                case "end":
                  return _context21.stop();
              }
            }, _callee20, this);
          }));
        };
        _proto25.on_recursion = function on_recursion(value_, on_callback_f_, args3_, target_) {
          var _this44 = this;
          var target = target_ !== null && target_ !== void 0 ? target_ : typeof args3_ === "object" ? args3_ : undefined;
          var off_callback_f = typeof args3_ === "function" ? args3_ : undefined;
          mk_tool.object.traverse(value_, function (value, key_s, path_s) {
            if (!["string", "number", "boolean", "symbol"].includes(typeof value)) {
              return;
            }
            var parent = value_;
            // 更新父级对象
            if (path_s.length !== 0) {
              path_s.split("/").forEach(function (v_s) {
                parent = parent[v_s];
              });
            }
            _this44._on(parent, key_s, {
              path_s: "" + (path_s ? "/" : "") + key_s,
              on_callback_f: on_callback_f_,
              off_callback_f: off_callback_f,
              target: target
            });
          });
        };
        _proto25.on = function on(value_, key_, on_callback_f_, args4_, target_) {
          var off_callback_f = typeof args4_ === "function" ? args4_ : undefined;
          var target = target_ !== null && target_ !== void 0 ? target_ : typeof args4_ === "object" ? args4_ : undefined;
          return this._on(value_, key_, {
            on_callback_f: on_callback_f_,
            off_callback_f: off_callback_f,
            target: target
          });
        };
        _proto25.once = function once(value_, key_, on_callback_f_, off_callback_f_, target_) {
          var off_callback_f = typeof off_callback_f_ === "function" ? off_callback_f_ : undefined;
          var target = target_ || (off_callback_f ? null : off_callback_f_);
          return this._on(value_, key_, {
            on_callback_f: on_callback_f_,
            off_callback_f: off_callback_f,
            target: target,
            once_b: true
          });
        };
        _proto25.off_recursion = function off_recursion(value_, args2_, target_) {
          var _this45 = this;
          var on_callback_f = typeof args2_ === "function" ? args2_ : undefined;
          var target = target_ !== null && target_ !== void 0 ? target_ : typeof args2_ === "object" ? args2_ : undefined;
          var task_as = [];
          mk_tool.object.traverse(value_, function (value, key_s, path_s) {
            var type_s = typeof value;
            if (!["string", "number", "boolean", "symbol"].includes(type_s)) {
              return;
            }
            var parent = value_;
            // 更新父级对象
            if (path_s.length !== 0) {
              path_s.split("/").forEach(function (v_s) {
                parent = parent[v_s];
              });
            }
            task_as.push.apply(task_as, _this45._off(parent, key_s, {
              path_s_: "" + (path_s ? "/" : "") + key_s,
              on_callback_f_: on_callback_f,
              target_: target
            }));
          });
          return Promise.all(task_as);
        };
        _proto25.off = function off(value_, key_, args3_, target_) {
          var on_callback_f = typeof args3_ === "function" ? args3_ : undefined;
          var target = target_ !== null && target_ !== void 0 ? target_ : typeof args3_ === "object" ? args3_ : undefined;
          return Promise.all(this._off(value_, key_, {
            on_callback_f_: on_callback_f,
            target_: target
          }));
        }
        /**
         * 清理对象绑定的数据
         * @param target_ 绑定对象
         * @returns
         */;
        _proto25.clear = function clear(target_) {
          /** 对象绑定数据 */
          var target_bind_data = this._target_bind_data.get(target_);
          // 安检
          if (!target_ || !target_bind_data) {
            return null;
          }
          var task_as = [];
          // 清理监听数据
          if (target_bind_data.monitor_as) {
            /** 清理当前监听的所有事件 */
            var monitor_as = target_bind_data.monitor_as.slice(0);
            for (var _iterator6 = _createForOfIteratorHelperLoose(monitor_as), _step6; !(_step6 = _iterator6()).done;) {
              var v = _step6.value;
              task_as.push.apply(task_as, this._off(v.target, v.key, {
                on_callback_f_: v.monitor.on_callback_f,
                target_: v.monitor.target,
                path_s_: v.monitor.path_s
              }));
            }
          }
          return Promise.all(task_as);
        };
        _proto25.enable = function enable(args_, key_, args3_, target_) {
          this._set_listener_state(true, args_, key_, args3_, target_);
        };
        _proto25.disable = function disable(args_, key_, args3_, target_) {
          this._set_listener_state(false, args_, key_, args3_, target_);
        }
        /**
         * 获取绑定数据
         * @param value_ 数据
         * @param key_ 键
         * @param create_b_ 不存在则创建
         * @returns
         */;
        _proto25._get_bind_data = function _get_bind_data(value_, key_, create_b_) {
          var _this46 = this;
          /** 绑定数据表 */
          var bind_data_map = this._bind_data_map.get(value_);
          if (!bind_data_map) {
            this._bind_data_map.set(value_, bind_data_map = new Map());
          }
          /** 绑定数据 */
          var bind_data = bind_data_map.get(key_);
          if (bind_data) {
            return bind_data;
          }
          if (!create_b_) {
            return null;
          }
          // 添加数据
          {
            var descriptor = Object.getOwnPropertyDescriptor(value_, key_);
            if (!descriptor) {
              return null;
            }
            bind_data_map.set(key_, bind_data = Object.create({
              descriptor: descriptor,
              recursive_count_n: 0
            }));
          }
          /** 值 */
          var value = value_[key_];
          /** 可更新 */
          var can_update_b = false;
          /** 更新定时器 */
          var update_timer;
          /** 更新前的值 */
          var value_before_update;
          // 监听数据
          Object.defineProperty(value_, key_, {
            get: function get() {
              return bind_data.descriptor.get ? bind_data.descriptor.get.call(value_) : value;
            },
            set: function set(new_value) {
              var _a;
              // 安检
              {
                if (!bind_data) {
                  return;
                }
                // 更新数据
                if (bind_data.descriptor.get) {
                  value = bind_data.descriptor.get.call(value_);
                }
                // 数据相同
                if (!can_update_b && value === new_value && typeof value !== "object" && typeof value !== "function") {
                  _this46._log.debug("更新值，数据相同跳过", key_, new_value, value_);
                  return;
                }
              }
              /** 旧数据 */
              var old_value = value;
              // 更新值
              {
                _this46._log.debug("更新值", key_, new_value, value_);
                (_a = bind_data.descriptor.set) === null || _a === void 0 ? void 0 : _a.call(value_, new_value);
                value = new_value;
              }
              // 如果禁用状态或者无监听则退出
              if (bind_data.disabled_b || !bind_data.monitor_as) {
                // 更新可更新状态
                if (bind_data.disabled_b) {
                  can_update_b = true;
                }
                return;
              }
              if (update_timer) {
                // 更新后的值和更新前一致则还原
                if (typeof value !== "object" && typeof value !== "function" && value === value_before_update) {
                  // 清理定时器
                  clearTimeout(update_timer);
                  update_timer = null;
                  // 更新 set 计数
                  --bind_data.recursive_count_n;
                  // 更新任务状态
                  bind_data.task.finish(true);
                }
                return;
              }
              if (!bind_data.task) {
                bind_data.task = new mk_status_task(false);
              }
              // 防止回调内赋值导致任务状态被覆盖
              else if (bind_data.recursive_count_n === 0) {
                bind_data.task.finish(false);
              }
              // 更新 set 计数
              ++bind_data.recursive_count_n;
              // 记录更新前的值
              value_before_update = old_value;
              // 下一帧回调
              update_timer = setTimeout(function () {
                update_timer = null;
                if (!(bind_data === null || bind_data === void 0 ? void 0 : bind_data.monitor_as)) {
                  return;
                }
                /** 任务返回 */
                var on_result_as = [];
                // 更新可更新状态
                can_update_b = false;
                // 执行监听事件
                for (var k_n = 0, v; k_n < bind_data.monitor_as.length; ++k_n) {
                  v = bind_data.monitor_as[k_n];
                  var target_bind_data = !v.target ? undefined : _this46._target_bind_data.get(v.target);
                  // 安检，禁用状态
                  if (v.disabled_b || (target_bind_data === null || target_bind_data === void 0 ? void 0 : target_bind_data.disabled_b)) {
                    continue;
                  }
                  v.last_update_value = value;
                  on_result_as.push(v.on_callback_f.call(v.target, value, old_value, v.path_s));
                  // 单次执行
                  if (v.once_b) {
                    bind_data.monitor_as.splice(k_n--, 1);
                    // 删除对象绑定数据
                    if (v.target) {
                      _this46._del_target_bind_data(v.target, {
                        monitor: v,
                        target: value_,
                        key: key_
                      });
                    }
                  }
                }
                // 等待任务完成
                Promise.all(on_result_as).then(function () {
                  // 更新 set 计数，更新任务状态
                  if (--bind_data.recursive_count_n === 0) {
                    bind_data.task.finish(true);
                  }
                });
              }, 0);
            }
          });
          return bind_data;
        };
        _proto25._off = function _off(value_, key_, _ref) {
          var on_callback_f_ = _ref.on_callback_f_,
            target_ = _ref.target_,
            path_s_ = _ref.path_s_;
          /** 绑定数据 */
          var bind_data = this._get_bind_data(value_, key_, false);
          /** 任务列表 */
          var task_as = [];
          if (!(bind_data === null || bind_data === void 0 ? void 0 : bind_data.monitor_as)) {
            return task_as;
          }
          // 取消监听
          {
            var index_n;
            var del_as;
            var find_f;
            if (target_ && on_callback_f_) {
              find_f = function find_f(v) {
                return v.on_callback_f === on_callback_f_ && v.target === target_ && v.path_s === path_s_;
              };
            } else if (target_) {
              find_f = function find_f(v) {
                return v.target === target_ && v.path_s === path_s_;
              };
            } else if (on_callback_f_) {
              find_f = function find_f(v) {
                return v.on_callback_f === on_callback_f_ && v.path_s === path_s_;
              };
            } else {
              find_f = function find_f(v) {
                return v.path_s === path_s_;
              };
            }
            if (find_f) {
              var _bind_data$monitor_as;
              /** 当前的监听数据 */
              var monitor_as = bind_data.monitor_as.splice(0, bind_data.monitor_as.length);
              // eslint-disable-next-line no-constant-condition
              while (true) {
                index_n = monitor_as.findIndex(find_f);
                if (index_n === -1) {
                  break;
                }
                del_as = monitor_as.splice(index_n, 1);
                // 删除对象绑定数据
                var call_back_f = this._del_target_bind_data(target_, {
                  monitor: del_as[0],
                  target: value_,
                  key: key_
                });
                if (call_back_f) {
                  task_as.push(call_back_f);
                }
              }
              (_bind_data$monitor_as = bind_data.monitor_as).unshift.apply(_bind_data$monitor_as, monitor_as);
            }
          }
          // 数据还原
          if (!bind_data.monitor_as.length) {
            task_as.push.apply(task_as, this._del_bind_data(value_, key_));
          }
          return task_as;
        }
        /** 删除绑定数据 */;
        _proto25._del_bind_data = function _del_bind_data(value_, key_) {
          /** 绑定数据表 */
          var bind_data_map = this._bind_data_map.get(value_);
          /** 任务列表 */
          var task_as = [];
          if (!bind_data_map) {
            return task_as;
          }
          /** 绑定数据 */
          var bind_data = bind_data_map.get(key_);
          if (bind_data) {
            // 删除对象绑定数据列表
            if (bind_data.monitor_as) {
              while (bind_data.monitor_as.length) {
                var monitor = bind_data.monitor_as.pop();
                // 删除对象绑定数据
                var call_back_f = this._del_target_bind_data(monitor.target, {
                  monitor: monitor,
                  target: value_,
                  key: key_
                });
                if (call_back_f) {
                  task_as.push(call_back_f);
                }
              }
            }
            // 还原值
            if (!bind_data.descriptor.set) {
              bind_data.descriptor.value = value_[key_];
            }
            // 重置描述符
            Object.defineProperty(value_, key_, bind_data.descriptor);
            // 删除 bind_data
            bind_data_map["delete"](key_);
          }
          // 删除 bind_data_map
          if (!bind_data_map.size) {
            this._bind_data_map["delete"](value_);
          }
          return task_as;
        }
        /** 添加对象绑定数据 */;
        _proto25._add_target_bind_data = function _add_target_bind_data(target_, bind_data_) {
          // 安检
          if (!target_ || !bind_data_) {
            return;
          }
          /** 对象绑定数据 */
          var target_bind_data = this._target_bind_data.get(target_);
          if (!target_bind_data) {
            this._target_bind_data.set(target_, target_bind_data = Object.create(null));
          }
          // 添加绑定监听
          if (bind_data_.monitor) {
            if (!target_bind_data.monitor_as) {
              target_bind_data.monitor_as = [bind_data_];
            } else {
              target_bind_data.monitor_as.push(bind_data_);
            }
          }
        }
        /** 删除对象绑定数据 */;
        _proto25._del_target_bind_data = function _del_target_bind_data(target_, bind_data_) {
          var _a, _b;
          // 安检
          if (!target_ || !bind_data_) {
            return null;
          }
          /** 对象绑定数据 */
          var target_bind_data = this._target_bind_data.get(target_);
          if (!target_bind_data) {
            return null;
          }
          // 删除绑定监听
          if (bind_data_.monitor && target_bind_data.monitor_as) {
            var index_n = target_bind_data.monitor_as.findIndex(function (v) {
              return v.target === bind_data_.target && v.key === bind_data_.key && v.monitor === bind_data_.monitor;
            });
            if (index_n !== -1) {
              return (_b = (_a = target_bind_data.monitor_as.splice(index_n, 1)[0].monitor) === null || _a === void 0 ? void 0 : _a.off_callback_f) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
          }
          return null;
        }
        /** 监听数据更新 */;
        _proto25._on = function _on(value_, key_, data_) {
          var _a;
          /** 绑定数据 */
          var bind_data = this._get_bind_data(value_, key_, true);
          if (!bind_data) {
            this._log.error("获取绑定数据错误");
            return null;
          }
          // 添加回调
          {
            if (!bind_data.monitor_as) {
              bind_data.monitor_as = [];
            }
            (_a = bind_data.monitor_as) === null || _a === void 0 ? void 0 : _a.push(data_);
          }
          // 添加对象绑定数据
          if (data_.target) {
            this._add_target_bind_data(data_.target, {
              monitor: data_,
              target: value_,
              key: key_
            });
          }
          return data_.on_callback_f;
        };
        _proto25._set_listener_state = function _set_listener_state(state_b_, args_, key_, args3_, target_) {
          var target = target_;
          var value;
          var callback_f;
          // 参数转换
          {
            // target
            if (target === undefined) {
              if (key_ === undefined) {
                target = args_;
              } else if (typeof args3_ !== "function") {
                target = args3_;
              }
            }
            // value
            if (key_ !== undefined) {
              value = args_;
            }
            // callback_f_
            if (typeof args3_ === "function") {
              callback_f = args3_;
            }
          }
          if (value) {
            var bind_data = this._get_bind_data(value, key_, false);
            if (!bind_data) {
              return;
            }
            // 更新指定回调
            if (callback_f) {
              if (!bind_data.monitor_as) {
                return;
              }
              var index_n;
              if (target) {
                index_n = bind_data.monitor_as.findIndex(function (v) {
                  return v.target === target && v.on_callback_f === callback_f;
                });
              } else {
                index_n = bind_data.monitor_as.findIndex(function (v) {
                  return v.on_callback_f === callback_f;
                });
              }
              if (index_n !== -1) {
                bind_data.monitor_as[index_n].disabled_b = !state_b_;
              }
            }
            // 更新指定对象
            else if (target) {
              if (!bind_data.monitor_as) {
                return;
              }
              bind_data.monitor_as.forEach(function (v) {
                if (v.target === target) {
                  v.disabled_b = !state_b_;
                }
              });
            }
            // 更新所有回调
            else {
              bind_data.disabled_b = !state_b_;
            }
          } else if (target_) {
            var target_bind_data = this._target_bind_data.get(target_);
            if (!target_bind_data) {
              return;
            }
            target_bind_data.disabled_b = !state_b_;
          }
        }
        /**主动触发
         * @param target_ 绑定对象
         * @returns
         */;
        _proto25.trigger = function trigger(target_) {
          /** 对象绑定数据 */
          var target_bind_data = this._target_bind_data.get(target_);
          // 安检
          if (!target_ || !target_bind_data) {
            return null;
          }
          var task_as = [];
          if (target_bind_data.monitor_as) {
            var monitor_as = target_bind_data.monitor_as.slice(0);
            for (var _iterator7 = _createForOfIteratorHelperLoose(monitor_as), _step7; !(_step7 = _iterator7()).done;) {
              var data = _step7.value;
              var v = data.monitor;
              var listenData = data.target;
              if (v.last_update_value === listenData[data.key]) continue;
              var oldValue = v.last_update_value;
              v.last_update_value = listenData[data.key];
              task_as.push(v.on_callback_f.call(v.target, listenData[data.key], oldValue, data.key));
            }
          }
          return Promise.all(task_as);
        };
        return mk_monitor;
      }(mk_instance_base);
      var mk_monitor$1 = exports('monitor', mk_monitor.instance());
      var __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /** 简化的对象池构建器 */
      var PoolBuilder = /*#__PURE__*/function () {
        function PoolBuilder() {
          this.config = {
            createFactory: null,
            initialSize: 0,
            growthSize: 32,
            maxSize: -1
          };
        }
        /** 设置对象创建工厂 */
        var _proto26 = PoolBuilder.prototype;
        _proto26.create = function create(factory) {
          this.config.createFactory = factory;
          return this;
        }
        /** 设置对象重置函数 */;
        _proto26.reset = function reset(resetFn) {
          this.config.resetFunction = resetFn;
          return this;
        }
        /** 设置对象清理函数 */;
        _proto26.clear = function clear(clearFn) {
          this.config.clearFunction = clearFn;
          return this;
        }
        /** 设置销毁回调 */;
        _proto26.onDestroy = function onDestroy(destroyFn) {
          this.config.destroyCallback = destroyFn;
          return this;
        }
        /** 设置初始大小 */;
        _proto26.initialSize = function initialSize(size) {
          this.config.initialSize = size;
          return this;
        }
        /** 设置扩充大小 */;
        _proto26.growthSize = function growthSize(size) {
          this.config.growthSize = size;
          return this;
        }
        /** 设置最大大小 */;
        _proto26.maxSize = function maxSize(size) {
          this.config.maxSize = size;
          return this;
        }
        /** 构建异步对象池 */;
        _proto26.buildAsync = function buildAsync() {
          if (!this.config.createFactory) {
            throw new Error("必须设置 createFactory");
          }
          return new mk_obj_pool(this.config);
        }
        /** 构建同步对象池 */;
        _proto26.buildSync = function buildSync() {
          if (!this.config.createFactory) {
            throw new Error("必须设置 createFactory");
          }
          return new mk_obj_pool.sync(this.config);
        };
        return PoolBuilder;
      }();
      /** 异步对象池 */
      var mk_obj_pool = /*#__PURE__*/function () {
        function mk_obj_pool(config) {
          this.config = config;
          /* --------------- private --------------- */
          /** 有效状态 */
          this._valid_b = true;
          /** 对象存储列表 */
          this._obj_as = [];
          if (this.config.initialSize && this.config.initialSize > 0) {
            this._add(this.config.initialSize);
          }
        }
        /* --------------- public --------------- */
        /** 有效状态 */
        var _proto27 = mk_obj_pool.prototype;
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 导入对象
         * @param obj_ 添加对象
         */
        _proto27.put = function put(obj_) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
            var resetObj;
            return _regeneratorRuntime().wrap(function _callee21$(_context22) {
              while (1) switch (_context22.prev = _context22.next) {
                case 0:
                  if (this._valid_b) {
                    _context22.next = 3;
                    break;
                  }
                  mk_log.error("对象池失效");
                  return _context22.abrupt("return");
                case 3:
                  if (obj_) {
                    _context22.next = 5;
                    break;
                  }
                  return _context22.abrupt("return");
                case 5:
                  if (!this.config.resetFunction) {
                    _context22.next = 11;
                    break;
                  }
                  _context22.next = 8;
                  return this.config.resetFunction(obj_);
                case 8:
                  _context22.t0 = _context22.sent;
                  _context22.next = 12;
                  break;
                case 11:
                  _context22.t0 = obj_;
                case 12:
                  resetObj = _context22.t0;
                  this._obj_as.push(resetObj);
                  // 检查保留数量
                  if (this.config.maxSize !== -1 && this._obj_as.length > this.config.maxSize) {
                    this._del(0, this._obj_as.length - this.config.maxSize);
                  }
                  // 失效直接销毁
                  if (this._valid_b) {
                    _context22.next = 18;
                    break;
                  }
                  _context22.next = 18;
                  return this.clear();
                case 18:
                case "end":
                  return _context22.stop();
              }
            }, _callee21, this);
          }));
        }
        /** 获取对象 */;
        _proto27.get = function get() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
            return _regeneratorRuntime().wrap(function _callee22$(_context23) {
              while (1) switch (_context23.prev = _context23.next) {
                case 0:
                  if (this._valid_b) {
                    _context23.next = 3;
                    break;
                  }
                  mk_log.error("对象池失效");
                  return _context23.abrupt("return", null);
                case 3:
                  if (this._obj_as.length) {
                    _context23.next = 6;
                    break;
                  }
                  _context23.next = 6;
                  return this._add();
                case 6:
                  if (this._valid_b) {
                    _context23.next = 10;
                    break;
                  }
                  mk_log.error("对象池失效");
                  this.clear();
                  return _context23.abrupt("return", null);
                case 10:
                  return _context23.abrupt("return", this._obj_as.pop());
                case 11:
                case "end":
                  return _context23.stop();
              }
            }, _callee22, this);
          }));
        }
        /** 清空数据 */;
        _proto27.clear = function clear() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
            var obj_as;
            return _regeneratorRuntime().wrap(function _callee23$(_context24) {
              while (1) switch (_context24.prev = _context24.next) {
                case 0:
                  obj_as = this._obj_as.splice(0, this._obj_as.length);
                  if (!(obj_as.length && this.config.clearFunction)) {
                    _context24.next = 4;
                    break;
                  }
                  _context24.next = 4;
                  return this.config.clearFunction(obj_as);
                case 4:
                case "end":
                  return _context24.stop();
              }
            }, _callee23, this);
          }));
        }
        /**
         * 销毁对象池
         * @remarks
         * 销毁后将无法 get/put
         */;
        _proto27.destroy = function destroy() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
            return _regeneratorRuntime().wrap(function _callee24$(_context25) {
              while (1) switch (_context25.prev = _context25.next) {
                case 0:
                  this._valid_b = false;
                  _context25.next = 3;
                  return this.clear();
                case 3:
                  if (!this.config.destroyCallback) {
                    _context25.next = 6;
                    break;
                  }
                  _context25.next = 6;
                  return this.config.destroyCallback();
                case 6:
                case "end":
                  return _context25.stop();
              }
            }, _callee24, this);
          }));
        }
        /** 添加对象 */;
        _proto27._add = function _add() {
          return __awaiter(this, arguments, void 0, function (fill_n) {
            var _this47 = this;
            if (fill_n === void 0) {
              fill_n = this.config.growthSize || 32;
            }
            return /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
              var k_n, newObj, resetObj;
              return _regeneratorRuntime().wrap(function _callee25$(_context26) {
                while (1) switch (_context26.prev = _context26.next) {
                  case 0:
                    k_n = 0;
                  case 1:
                    if (!(k_n < fill_n)) {
                      _context26.next = 17;
                      break;
                    }
                    _context26.next = 4;
                    return _this47.config.createFactory();
                  case 4:
                    newObj = _context26.sent;
                    if (!_this47.config.resetFunction) {
                      _context26.next = 11;
                      break;
                    }
                    _context26.next = 8;
                    return _this47.config.resetFunction(newObj);
                  case 8:
                    _context26.t0 = _context26.sent;
                    _context26.next = 12;
                    break;
                  case 11:
                    _context26.t0 = newObj;
                  case 12:
                    resetObj = _context26.t0;
                    _this47._obj_as.push(resetObj);
                  case 14:
                    ++k_n;
                    _context26.next = 1;
                    break;
                  case 17:
                  case "end":
                    return _context26.stop();
                }
              }, _callee25);
            })();
          });
        }
        /** 删除对象 */;
        _proto27._del = function _del(start_n, end_n) {
          var obj_as = this._obj_as.splice(start_n, end_n - start_n);
          if (obj_as.length && this.config.clearFunction) {
            this.config.clearFunction(obj_as);
          }
        };
        _createClass(mk_obj_pool, [{
          key: "valid_b",
          get: function get() {
            return this._valid_b;
          }
          /** 对象池数量 */
        }, {
          key: "count",
          get: function get() {
            return this._obj_as.length;
          }
        }]);
        return mk_obj_pool;
      }();
      (function (mk_obj_pool) {
        /**
         * 创建对象池构建器
         * @example
         * ```typescript
         * // 简单用法
         * const pool = mk_obj_pool.builder<MyObject>()
         *   .create(() => new MyObject())
         *   .reset(obj => obj.reset())
         *   .initialSize(10)
         *   .buildSync();
         *
         * // 异步用法
         * const asyncPool = mk_obj_pool.builder<MyAsyncObject>()
         *   .create(async () => await createMyObject())
         *   .buildAsync();
         * ```
         */
        function builder() {
          return new PoolBuilder();
        }
        mk_obj_pool.builder = builder;
        /**
         * 快速创建同步对象池
         * @param createFactory 对象创建工厂
         * @param options 可选配置
         * @example
         * ```typescript
         * const pool = mk_obj_pool.createSync(() => new MyObject(), {
         *   initialSize: 10,
         *   resetFunction: obj => obj.reset()
         * });
         * ```
         */
        function createSync(createFactory, options) {
          var builder = new PoolBuilder().create(createFactory);
          if (options === null || options === void 0 ? void 0 : options.resetFunction) builder.reset(options.resetFunction);
          if (options === null || options === void 0 ? void 0 : options.clearFunction) builder.clear(options.clearFunction);
          if (options === null || options === void 0 ? void 0 : options.destroyCallback) builder.onDestroy(options.destroyCallback);
          if ((options === null || options === void 0 ? void 0 : options.initialSize) !== undefined) builder.initialSize(options.initialSize);
          if ((options === null || options === void 0 ? void 0 : options.growthSize) !== undefined) builder.growthSize(options.growthSize);
          if ((options === null || options === void 0 ? void 0 : options.maxSize) !== undefined) builder.maxSize(options.maxSize);
          return builder.buildSync();
        }
        mk_obj_pool.createSync = createSync;
        /**
         * 快速创建异步对象池
         * @param createFactory 对象创建工厂
         * @param options 可选配置
         * @example
         * ```typescript
         * const pool = mk_obj_pool.createAsync(async () => await loadMyObject(), {
         *   initialSize: 5,
         *   resetFunction: async obj => await obj.reset()
         * });
         * ```
         */
        function createAsync(createFactory, options) {
          var builder = new PoolBuilder().create(createFactory);
          if (options === null || options === void 0 ? void 0 : options.resetFunction) builder.reset(options.resetFunction);
          if (options === null || options === void 0 ? void 0 : options.clearFunction) builder.clear(options.clearFunction);
          if (options === null || options === void 0 ? void 0 : options.destroyCallback) builder.onDestroy(options.destroyCallback);
          if ((options === null || options === void 0 ? void 0 : options.initialSize) !== undefined) builder.initialSize(options.initialSize);
          if ((options === null || options === void 0 ? void 0 : options.growthSize) !== undefined) builder.growthSize(options.growthSize);
          if ((options === null || options === void 0 ? void 0 : options.maxSize) !== undefined) builder.maxSize(options.maxSize);
          return builder.buildAsync();
        }
        mk_obj_pool.createAsync = createAsync;
        /** 同步对象池 */
        var sync = /*#__PURE__*/function () {
          function sync(config) {
            this.config = config;
            /* --------------- private --------------- */
            /** 有效状态 */
            this._valid_b = true;
            /** 对象存储列表 */
            this._obj_as = [];
            if (this.config.initialSize && this.config.initialSize > 0) {
              this._add(this.config.initialSize);
            }
          }
          /* --------------- public --------------- */
          /** 有效状态 */
          var _proto28 = sync.prototype;
          /* ------------------------------- 功能 ------------------------------- */
          /** 导入对象 */
          _proto28.put = function put(obj_) {
            if (!this._valid_b) {
              mk_log.error("对象池失效");
              return;
            }
            if (!obj_) {
              return;
            }
            var resetObj = this.config.resetFunction ? this.config.resetFunction(obj_) : obj_;
            this._obj_as.push(resetObj);
            // 检查保留数量
            if (this.config.maxSize !== -1 && this._obj_as.length > this.config.maxSize) {
              this._del(0, this._obj_as.length - this.config.maxSize);
            }
          }
          /** 获取对象 */;
          _proto28.get = function get() {
            if (!this._valid_b) {
              mk_log.error("对象池失效");
              return null;
            }
            // 检查容量
            if (!this._obj_as.length) {
              this._add();
            }
            return this._obj_as.pop();
          }
          /** 清空数据 */;
          _proto28.clear = function clear() {
            var obj_as = this._obj_as.splice(0, this._obj_as.length);
            if (obj_as.length && this.config.clearFunction) {
              this.config.clearFunction(obj_as);
            }
          }
          /**
           * 销毁对象池
           * @remarks
           * 销毁后将无法 get/put
           */;
          _proto28.destroy = function destroy() {
            this._valid_b = false;
            this.clear();
            if (this.config.destroyCallback) {
              this.config.destroyCallback();
            }
          }
          /** 添加对象 */;
          _proto28._add = function _add(fill_n) {
            if (fill_n === void 0) {
              fill_n = this.config.growthSize || 32;
            }
            for (var k_n = 0; k_n < fill_n; ++k_n) {
              var newObj = this.config.createFactory();
              var resetObj = this.config.resetFunction ? this.config.resetFunction(newObj) : newObj;
              this._obj_as.push(resetObj);
            }
          }
          /** 删除对象 */;
          _proto28._del = function _del(start_n, end_n) {
            var obj_as = this._obj_as.splice(start_n, end_n - start_n);
            if (obj_as.length && this.config.clearFunction) {
              this.config.clearFunction(obj_as);
            }
          };
          _createClass(sync, [{
            key: "valid_b",
            get: function get() {
              return this._valid_b;
            }
            /** 对象池数量 */
          }, {
            key: "count",
            get: function get() {
              return this._obj_as.length;
            }
          }]);
          return sync;
        }();
        mk_obj_pool.sync = sync;
      })(mk_obj_pool || (mk_obj_pool = {}));
      var mk_obj_pool_new = exports('PoolBuilder', mk_obj_pool.builder);
      var localStorage = sys.localStorage;
      var GlobalData = exports('GlobalData', Object.create(null));
      var IDataModel = exports('IDataModel', /*#__PURE__*/function () {
        function IDataModel(initData, initRunData) {
          this.modelName = 'default';
          this.lastLocalData = ''; // 上次本地存储的数据
          /** 脏标记，标识数据是否已修改 */
          this.isDirty = false;
          /** 延迟保存定时器 */
          this.saveTimeout = null;
          /** 延迟保存时间间隔(毫秒) */
          this.delaySaveInterval = 1000;
          /** 是否启用自动监听 */
          this._autoMonitorEnabled = false;
          /**
           * 本地缓存的数据
           */
          this.dLocalData = Object.create(null);
          /**
           * 运行时数据
           */
          this.dRunData = Object.create(null);
          // super();
          this.modelName = this.constructor.name;
          this.dLocalData = initData;
          if (initRunData) this.dRunData = initRunData;
          this.event = new mk_event_target();
          {
            this.init();
            // 默认启用自动数据变更检测
            this.enableAutoChangeDetection();
          }
        }
        var _proto29 = IDataModel.prototype;
        _proto29.init = function init() {
          //挂载到全局数据
          GlobalData[this.modelName] = this;
          // this.registerListeners();
          var data = this.loadStorage();
          if (data) this.initLocalData(this.dLocalData, data);
          this.markDirty();
          this.save();
        }
        /**
         * 读取本地数据
         */;
        _proto29.loadStorage = function loadStorage() {
          //return;
          var data;
          try {
            this.lastLocalData = localStorage.getItem("model_" + this.modelName);
            data = JSON.parse(this.lastLocalData);
            if (data) {
              data = this.deCodeData(data);
              return data;
            }
          } catch (e) {
            error$1('LoadStorage 异常', e);
          }
        }
        /**
         * 标记数据为脏状态
         */;
        _proto29.markDirty = function markDirty() {
          this.isDirty = true;
          this.scheduleSave();
        }
        /**
         * 手动标记数据为脏状态（用于复杂数据结构的直接修改）
         * 当直接修改dLocalData的属性或嵌套对象时使用
         */;
        _proto29.markDataDirty = function markDataDirty() {
          this.markDirty();
        }
        /**
         * 延迟保存，避免频繁操作
         */;
        _proto29.scheduleSave = function scheduleSave() {
          var _this48 = this;
          if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
          }
          this.saveTimeout = setTimeout(function () {
            _this48.save();
            _this48.saveTimeout = null;
          }, this.delaySaveInterval);
        }
        /**
         * 保存数据（优化版本，使用脏标记避免不必要的序列化）
         */;
        _proto29.save = function save() {
          if (!this.isDirty) {
            return; // 数据未变化，直接返回
          }

          var dataNow = JSON.stringify(this.enCodeData(this.dLocalData));
          if (dataNow != this.lastLocalData) {
            this.lastLocalData = dataNow;
            sys.localStorage.setItem("model_" + this.modelName, dataNow);
            this.onSaved();
          }
          this.isDirty = false; // 重置脏标记
        }
        /**
         * 立即保存（用于重要操作）
         */;
        _proto29.saveImmediate = function saveImmediate() {
          if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveTimeout = null;
          }
          this.save();
        }
        /**
         * 启用自动数据变更检测（使用mk_monitor）
         * 调用此方法后，对dLocalData的任何修改都会自动触发保存
         */;
        _proto29.enableAutoChangeDetection = function enableAutoChangeDetection() {
          var _this49 = this;
          if (this._autoMonitorEnabled) {
            return;
          }
          this._autoMonitorEnabled = true;
          // 使用mk_monitor的递归监听功能
          mk_monitor$1.on_recursion(this.dLocalData, function (value, oldValue, path) {
            // 数据变更时自动标记为脏状态
            if (value != oldValue) _this49.markDirty();
          }, this // 绑定到当前实例
          );
        }
        /**
         * 禁用自动数据变更检测
         */;
        _proto29.disableAutoChangeDetection = function disableAutoChangeDetection() {
          if (!this._autoMonitorEnabled) {
            return;
          }
          this._autoMonitorEnabled = false;
          // 取消监听（通过target参数取消所有相关监听）
          mk_monitor$1.clear(this);
        }
        /**
         * 数据压缩
         * @param data
         * @returns
         */;
        _proto29.enCodeData = function enCodeData(data) {
          return data;
        }
        /**
         * 数据解压
         * @param data
         * @returns
         */;
        _proto29.deCodeData = function deCodeData(data) {
          return data;
        };
        _proto29.onSaved = function onSaved() {}
        /**
         *
         * @param data 初始化数据  本地数据没有则添加该键
         */;
        _proto29.initLocalData = function initLocalData(defaultlocalData, localData) {
          if (defaultlocalData && localData) {
            for (var _key25 in defaultlocalData) {
              if (Object.prototype.hasOwnProperty.call(defaultlocalData, _key25)) {
                if (!(_key25 in localData)) ;else if (typeof defaultlocalData[_key25] === 'object' && Array.isArray(defaultlocalData[_key25]) === false) {
                  // 如果属性是对象，则递归初始化子对象
                  this.initLocalData(defaultlocalData[_key25], localData[_key25]);
                } else {
                  defaultlocalData[_key25] = localData[_key25];
                }
              }
            }
          }
          return localData;
        }
        /**
         * 清理资源
         */;
        _proto29.clear = function clear() {
          // 清理延迟保存定时器
          if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveTimeout = null;
          }
          // 立即保存未保存的数据
          if (this.isDirty) {
            this.save();
          }
          // 禁用自动监听
          this.disableAutoChangeDetection();
          // 从全局数据中移除
          if (GlobalData[this.modelName] === this) {
            delete GlobalData[this.modelName];
          }
        };
        _proto29.getModelName = function getModelName() {
          return this.modelName;
        };
        return IDataModel;
      }());
    }
  };
});

System.register("chunks:///_virtual/drongo-gui.mjs", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, _createClass, _createForOfIteratorHelperLoose, _assertThisInitialized, _regeneratorRuntime, Color, director, Director, UITransform, gfx, clamp, UI, StencilManager, math, view, tween, Vec3, js, Component, mk_monitor$1, TickerManager, mk_release, mk_tool, mk_logger, Key, mk_event_target, Timer, log, error, GRoot, GComponent, GTextField, Window, GProgressBar, GSlider, GRichTextField, GButton, GTextInput, GLabel, Controller, EaseType, GTween, UIPackage, UIObjectFactory;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      Color = module.Color;
      director = module.director;
      Director = module.Director;
      UITransform = module.UITransform;
      gfx = module.gfx;
      clamp = module.clamp;
      UI = module.UI;
      StencilManager = module.StencilManager;
      math = module.math;
      view = module.view;
      tween = module.tween;
      Vec3 = module.Vec3;
      js = module.js;
      Component = module.Component;
    }, function (module) {
      mk_monitor$1 = module.monitor;
      TickerManager = module.TickerManager;
      mk_release = module.release;
      mk_tool = module.tool;
      mk_logger = module.logger;
      Key = module.Key;
      mk_event_target = module.event_target;
      Timer = module.Timer;
      log = module.log;
      error = module.error;
    }, function (module) {
      GRoot = module.GRoot;
      GComponent = module.GComponent;
      GTextField = module.GTextField;
      Window = module.Window;
      GProgressBar = module.GProgressBar;
      GSlider = module.GSlider;
      GRichTextField = module.GRichTextField;
      GButton = module.GButton;
      GTextInput = module.GTextInput;
      GLabel = module.GLabel;
      Controller = module.Controller;
      EaseType = module.EaseType;
      GTween = module.GTween;
      UIPackage = module.UIPackage;
      UIObjectFactory = module.UIObjectFactory;
    }],
    execute: function () {
      exports({
        GBind: GBind,
        GUIState: void 0,
        SortingLayer: void 0,
        UILayer: void 0,
        _cocos_2d_renderer_stencil_manager__Stage: void 0,
        addLogic: addLogic,
        registerBinder: registerBinder,
        updateOpacity: updateOpacity,
        vm: vm
      });
      var _UIClsMap;

      /**
       * gui界面通用配置
       */
      var GUISettings = exports('GUISettings', function GUISettings() {});
      /**UI遮罩颜色值 */
      GUISettings.mask_color = new Color(0, 0, 0, 255 * 0.5);
      var GUIState;
      (function (GUIState) {
        /**
         * 未使用状态
         */
        GUIState[GUIState["Null"] = 0] = "Null";
        /**
         * 加载中
         */
        GUIState[GUIState["Loading"] = 1] = "Loading";
        /**
         * 显示处理中
         */
        GUIState[GUIState["Showing"] = 2] = "Showing";
        /**
         * 已显示
         */
        GUIState[GUIState["Showed"] = 3] = "Showed";
        /**
         * 关闭处理中
         */
        GUIState[GUIState["Closeing"] = 4] = "Closeing";
        /**
         * 已关闭
         */
        GUIState[GUIState["Closed"] = 5] = "Closed";
        /**
         * 已销毁
         */
        GUIState[GUIState["Destroyed"] = 6] = "Destroyed";
      })(GUIState || (GUIState = exports('GUIState', {})));
      var GUIWindow = exports('GUIWindow', /*#__PURE__*/function (_fgui$Window) {
        _inheritsLoose(GUIWindow, _fgui$Window);
        function GUIWindow() {
          return _fgui$Window.apply(this, arguments) || this;
        }
        var _proto = GUIWindow.prototype;
        _proto.onInit = function onInit() {
          this.makeFullScreen();
          //弹出窗口的动效已中心为轴心
          this.setPivot(0.5, 0.5);
        }
        // protected doShowAnimation(): void {
        //     // 使用动画助手实现弹出效果
        //     UIAnimationHelper.popup(this, 0.3, () => {
        //         this.onShown();
        //     });
        // }
        // protected doHideAnimation(): void {
        //     // 使用动画助手实现收缩效果
        //     UIAnimationHelper.shrink(this, 0.3, () => {
        //         this.hideImmediately();
        //     });
        // }
        ;

        _proto.onShown = function onShown() {
          // 动画完成后的回调
        };
        _proto.onHide = function onHide() {
          // 隐藏时的回调
        };
        return GUIWindow;
      }(Window));
      var GUIStage = exports('GUIStage', /*#__PURE__*/function (_fgui$Window2) {
        _inheritsLoose(GUIStage, _fgui$Window2);
        function GUIStage() {
          return _fgui$Window2.apply(this, arguments) || this;
        }
        var _proto2 = GUIStage.prototype;
        _proto2.onInit = function onInit() {
          this.makeFullScreen();
          this.contentPane.makeFullScreen();
        };
        _proto2.onShown = function onShown() {
          //关闭其他stage windtow
          var root = GRoot.inst;
          var toClose = [];
          for (var i = 0; i < root.numChildren; i++) {
            var child = root.getChildAt(i);
            if (child instanceof GUIStage && child !== this || child instanceof GUIWindow) {
              toClose.push(child);
            }
          }
          toClose.forEach(function (child) {
            GUIManager.close(child);
          });
        };
        return GUIStage;
      }(Window));
      var GUIGuide = exports('GUIGuide', /*#__PURE__*/function (_fgui$Window3) {
        _inheritsLoose(GUIGuide, _fgui$Window3);
        function GUIGuide() {
          return _fgui$Window3.apply(this, arguments) || this;
        }
        var _proto3 = GUIGuide.prototype;
        _proto3.onInit = function onInit() {
          this.makeFullScreen();
          this.contentPane.makeFullScreen();
          // this.sortingOrder = UILayer.GUIDE;
        };

        return GUIGuide;
      }(Window));
      var GUITip = exports('GUITip', /*#__PURE__*/function (_fgui$Window4) {
        _inheritsLoose(GUITip, _fgui$Window4);
        function GUITip() {
          return _fgui$Window4.apply(this, arguments) || this;
        }
        var _proto4 = GUITip.prototype;
        _proto4.onInit = function onInit() {
          this.center();
          //弹出窗口的动效已中心为轴心
          this.contentPane.setPivot(0.5, 0.5);
          // this.sortingOrder = UILayer.TIP;
        };

        _proto4.doShowAnimation = function doShowAnimation() {
          var _this = this;
          // 使用动画助手实现弹出效果
          UIAnimationHelper.popup(this, 0.3, function () {
            _this.onShown();
          });
        };
        _proto4.doHideAnimation = function doHideAnimation() {
          var _this2 = this;
          // 使用动画助手实现收缩效果
          UIAnimationHelper.shrink(this, 0.3, function () {
            _this2.hideImmediately();
          });
        };
        return GUITip;
      }(Window));
      var UILayer;
      (function (UILayer) {
        /**舞台 */
        UILayer[UILayer["STAGE"] = 1] = "STAGE";
        /**弹窗 */
        UILayer[UILayer["WINDOW"] = 2] = "WINDOW";
        /**提示 */
        UILayer[UILayer["TIP"] = 3] = "TIP";
        /**引导 */
        UILayer[UILayer["GUIDE"] = 4] = "GUIDE";
      })(UILayer || (UILayer = exports('UILayer', {})));
      var UIClsMap = (_UIClsMap = {}, _UIClsMap[UILayer.STAGE] = GUIStage, _UIClsMap[UILayer.WINDOW] = GUIWindow, _UIClsMap[UILayer.TIP] = GUITip, _UIClsMap[UILayer.GUIDE] = GUIGuide, _UIClsMap);
      /**
       * UI动画助手类
       * 提供常用的UI动画效果
       */
      var UIAnimationHelper = exports('UIAnimationHelper', /*#__PURE__*/function () {
        function UIAnimationHelper() {}
        /**
         * 弹出动画（缩放从小到大）
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */
        UIAnimationHelper.popup = function popup(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          if (node.setScale) {
            node.setScale(0.1, 0.1);
          }
          tween(node.node || node).to(duration, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        }
        /**
         * 收缩动画（缩放从大到小）
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */;
        UIAnimationHelper.shrink = function shrink(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          tween(node.node || node).to(duration, {
            scale: new Vec3(0.1, 0.1, 1)
          }, {
            easing: 'backIn'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        }
        /**
         * 淡入动画
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */;
        UIAnimationHelper.fadeIn = function fadeIn(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          if (node.node) {
            node.node.opacity = 0;
          } else {
            node.opacity = 0;
          }
          tween(node.node || node).to(duration, {
            opacity: 255
          }, {
            easing: 'quadOut'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        }
        /**
         * 淡出动画
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */;
        UIAnimationHelper.fadeOut = function fadeOut(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          tween(node.node || node).to(duration, {
            opacity: 0
          }, {
            easing: 'quadOut'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        }
        /**
         * 从左侧滑入
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */;
        UIAnimationHelper.slideInLeft = function slideInLeft(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          var targetNode = node.node || node;
          var originalPosition = targetNode.position.clone();
          var parent = targetNode.parent;
          var uiTransform = parent === null || parent === void 0 ? void 0 : parent.getComponent(UITransform);
          if (!parent || !uiTransform) {
            console.warn('UIAnimationHelper.slideInLeft 需要父节点包含 UITransform');
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
          }
          targetNode.setPosition(new Vec3(-uiTransform.width, originalPosition.y, originalPosition.z));
          tween(targetNode).to(duration, {
            position: originalPosition
          }, {
            easing: 'quadOut'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        }
        /**
         * 向右侧滑出
         * @param node 目标节点
         * @param duration 动画时长，默认0.3秒
         * @param onComplete 完成回调
         */;
        UIAnimationHelper.slideOutRight = function slideOutRight(node, duration, onComplete) {
          if (duration === void 0) {
            duration = 0.3;
          }
          var targetNode = node.node || node;
          var originalPosition = targetNode.position.clone();
          var parent = targetNode.parent;
          var uiTransform = parent === null || parent === void 0 ? void 0 : parent.getComponent(UITransform);
          if (!parent || !uiTransform) {
            console.warn('UIAnimationHelper.slideOutRight 需要父节点包含 UITransform');
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
          }
          var targetPosition = new Vec3(uiTransform.width, originalPosition.y, originalPosition.z);
          tween(targetNode).to(duration, {
            position: targetPosition
          }, {
            easing: 'quadOut'
          }).call(function () {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
          }).start();
        };
        return UIAnimationHelper;
      }());
      var GUILogicBase = exports('GUILogicBase', /*#__PURE__*/function (_Component) {
        _inheritsLoose(GUILogicBase, _Component);
        //*******************静态函数 ***************/
        /**
         * 开启UI自定义排序 不启用会无视下面的节点自定义排序 list默认会自动开启
         * @param node
         * @param enable
         * @returns
         */
        GUILogicBase.setSortRoot = function setSortRoot(node, enable) {
          if (enable === void 0) {
            enable = true;
          }
          if (!node) return;
          node.sortRoot = enable;
        };
        GUILogicBase.setUISorting = function setUISorting(node) {
          var _a;
          if (((_a = node === null || node === void 0 ? void 0 : node._uiProps) === null || _a === void 0 ? void 0 : _a.uiTransformComp) == null) return;
          if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'boolean') {
            // 启用或禁用排序
            var enable = arguments.length <= 1 ? undefined : arguments[1];
            node._uiProps.uiTransformComp.sortingEnabled = enable;
          } else if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'number') {
            // 设置排序层级
            var layer = arguments.length <= 1 ? undefined : arguments[1];
            var priority = arguments.length <= 2 ? undefined : arguments[2];
            node._uiProps.uiTransformComp.sortingPriority = layer * 1e3 + priority;
            node._uiProps.uiTransformComp.sortingEnabled = true;
          } else {
            throw new Error('Invalid arguments');
          }
        };
        function GUILogicBase() {
          var _this3;
          _this3 = _Component.call(this) || this;
          /**
           * 事件对象列表
           * @readonly
           * @remarks
           * 模块关闭后自动清理事件
           */
          _this3.event_target_as = new Set();
          /** 释放管理器 */
          _this3._release_manage = new mk_release();
          var hockFuncs = ["onLoad", "start", "onEnable", "onDisable", "onDestroy"];
          // 设置父类自启函数
          mk_tool.func.run_parent_func(_assertThisInitialized(_this3), hockFuncs);
          // 设置函数超时警告
          // tool.func.timeout_warning<Component>(global_config.view.blocking_warning_time_ms_n, this, hockFuncs)
          return _this3;
        }
        /** 日志 */
        var _proto5 = GUILogicBase.prototype;
        /* ------------------------------- 生命周期 ------------------------------- */
        /**销毁 */
        _proto5.onDestroy = function onDestroy() {
          var _this4 = this;
          // 取消所有定时器
          this.unscheduleAllCallbacks();
          // 取消数据监听事件
          mk_monitor$1.clear(this);
          // 清理事件
          this.event_target_as.forEach(function (v) {
            if (v.targetOff) {
              v.targetOff(_this4);
            } else if (v.target_off) {
              v.target_off(_this4);
            }
          });
          // 释放资源
          this._release_manage.release();
        }
        /* ------------------------------- 功能 ------------------------------- */
        /**
         * 跟随释放
         * @param asset_ 释放资源
         */;
        _proto5.follow_release = function follow_release(object_) {
          if (!object_) {
            return object_;
          }
          // 添加释放对象
          this._release_manage.add(object_);
          // 如果模块已经关闭则直接释放
          if (!this.isValid) {
            // this._log.debug("在模块关闭后跟随释放资源会被立即释放");
            this._release_manage.release_all();
          }
          return object_;
        };
        _proto5.cancel_release = function cancel_release(object_) {
          if (!object_) {
            return object_;
          }
          // 添加释放对象
          this._release_manage.release(object_);
          return object_;
        };
        _createClass(GUILogicBase, [{
          key: "UI",
          get: function get() {
            if (this._ui == null) {
              this._ui = this.node["$gobj"];
            }
            return this._ui;
          }
        }, {
          key: "Data",
          get: function get() {
            var _a;
            return (_a = this.UI) === null || _a === void 0 ? void 0 : _a.data;
          }
        }, {
          key: "_log",
          get: function get() {
            var _a;
            return (_a = this._log2) !== null && _a !== void 0 ? _a : this._log2 = new mk_logger(js.getClassName(this));
          }
        }]);
        return GUILogicBase;
      }(Component));
      var __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      /**UI包的前缀 */
      var PackagePrefix = "UI/";
      /**没有使用等待销毁的时间 */
      var DestoryTime = 30;
      /**最大缓存UI数量 */
      var MaxWaitDestoryNum = 10;
      /**
       * GUI管理器
       */
      var GUIManagerImpl = /*#__PURE__*/function () {
        function GUIManagerImpl() {
          this.__uiMap = new Map();
          this._uiOpenNumMap = new Map();
          /**
           * 删除列表
           */
          this.__destoryList = [];
          /**
           * 添加引用计数的 Map
           */
          this.__packageRefCount = new Map();
          this.EventTarget = new mk_event_target();
          TickerManager.addTicker(this);
        }
        /**
        * 心跳
        * @param dt
        */
        /**
         * 心跳，用于处理等待销毁的UI
         * @param dt 时间间隔
         */
        var _proto6 = GUIManagerImpl.prototype;
        _proto6.tick = function tick(dt) {
          for (var i = 0; i < this.__destoryList.length; i++) {
            var uiinfo = this.__destoryList[i];
            if (uiinfo.State === GUIState.Closed) {
              // 如果窗口已经关闭超过了指定的销毁时间，则销毁它。
              if (uiinfo.CloseTime + DestoryTime < Timer.currentTime) {
                this.disposeWindow(uiinfo);
                i--;
              } else {
                break;
              }
            } else {
              // 如果窗口没有关闭，则将其从销毁列表中移除。
              this.__destoryList.splice(i, 1);
              i--;
            }
          }
        }
        /**
         * 销毁窗口
         * @param uiinfo UI信息
         */;
        _proto6.disposeWindow = function disposeWindow(uiinfo) {
          if (uiinfo.UI) {
            // 从销毁列表中移除
            var index = this.__destoryList.indexOf(uiinfo);
            if (index !== -1) {
              this.__destoryList.splice(index, 1);
            }
            if (uiinfo.State !== GUIState.Closed) {
              return;
            }
            // 移除模态遮罩点击监听器
            this.removeModalClickListener(uiinfo);
            // 从UI映射表中删除
            this.__uiMap["delete"](uiinfo.URL);
            // 销毁UI
            if (!uiinfo.UI.isDisposed) {
              uiinfo.UI.dispose();
            }
            uiinfo.UI = null;
            uiinfo.State = GUIState.Destroyed;
            // 减少引用计数并卸载包
            this.unloadPackagesIfNeeded(uiinfo);
          }
        };
        _proto6.unloadPackagesIfNeeded = function unloadPackagesIfNeeded(uiinfo) {
          var _this5 = this;
          var cls = this.getUICls(uiinfo.URL);
          cls.Dependencies.forEach(function (pkgName) {
            _this5.setPackageRefCount(pkgName, -1);
          });
        };
        _proto6.setPackageRefCount = function setPackageRefCount(pkgName, num) {
          if (num === void 0) {
            num = 1;
          }
          var count = (this.__packageRefCount.get(pkgName) || 0) + num;
          if (count > 0) {
            this.__packageRefCount.set(pkgName, count);
          } else {
            this.__packageRefCount["delete"](pkgName);
            UIPackage.removePackage(pkgName); // 卸载包
            log("unload package", pkgName);
          }
        };
        _proto6.open = function open(arg, data) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var cls;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (typeof arg === "string") {
                    cls = this.getUICls(arg);
                  } else {
                    cls = arg;
                  }
                  if (cls) {
                    _context.next = 4;
                    break;
                  }
                  error("UI不存在", arg);
                  return _context.abrupt("return", null);
                case 4:
                  if (!this.__uiMap.has(cls.URL)) {
                    _context.next = 8;
                    break;
                  }
                  return _context.abrupt("return", this.openExisting(cls, data));
                case 8:
                  return _context.abrupt("return", this.openNew(cls, data));
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
        };
        _proto6._setUISortIndex = function _setUISortIndex(uiInfo, cls) {
          var _a;
          var layer = ((_a = cls.uiOptions) === null || _a === void 0 ? void 0 : _a.layer) || UILayer.WINDOW;
          if (layer == UILayer.STAGE) {
            // 舞台层单独重置，不影响其他层
            this._uiOpenNumMap.set(layer, 0);
          }
          var num = this._uiOpenNumMap.get(layer) || 0;
          num++;
          this._uiOpenNumMap.set(layer, num);
          uiInfo.sortIndex = layer * 1e6 + num;
        }
        /**
         * 打开已存在的UI窗口
         * @param cls UI窗口类
         * @param data UI窗口数据
         * @returns 返回打开的UI窗口
         */;
        _proto6.openExisting = function openExisting(cls, data) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var uiInfo, ui, _ui;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // 获取UI信息
                  uiInfo = this.__uiMap.get(cls.URL);
                  this._setUISortIndex(uiInfo, cls);
                  if (!(uiInfo.State === GUIState.Loading && uiInfo.loadingPromise)) {
                    _context2.next = 15;
                    break;
                  }
                  _context2.prev = 3;
                  _context2.next = 6;
                  return uiInfo.loadingPromise;
                case 6:
                  ui = _context2.sent;
                  if (ui) {
                    _context2.next = 9;
                    break;
                  }
                  return _context2.abrupt("return", null);
                case 9:
                  if (data) ui.contentPane.data = data;
                  if (!ui.isDisposed) {
                    ui.sortingOrder = uiInfo.sortIndex;
                    if (!ui.isShowing) {
                      ui.show();
                      uiInfo.State = GUIState.Showed;
                    }
                  }
                  return _context2.abrupt("return", ui);
                case 12:
                  _context2.prev = 12;
                  // 加载完成后无需保留Promise引用
                  uiInfo.loadingPromise = undefined;
                  return _context2.finish(12);
                case 15:
                  if (!uiInfo.UI) {
                    _context2.next = 30;
                    break;
                  }
                  if (!uiInfo.UI.isDisposed) {
                    _context2.next = 19;
                    break;
                  }
                  this.disposeWindow(uiInfo);
                  return _context2.abrupt("return", this.openNew(cls, data));
                case 19:
                  // 如果UI已经存在
                  if (uiInfo.State === GUIState.Closed) {
                    // 如果UI已经关闭，则从销毁列表中移除
                    this.removeFromDestroyList(uiInfo);
                  }
                  // 设置UI数据并显示UI
                  if (data) uiInfo.UI.contentPane.data = data;
                  uiInfo.UI.sortingOrder = uiInfo.sortIndex;
                  uiInfo.UI.show();
                  uiInfo.State = GUIState.Showed;
                  // 重新添加模态遮罩点击监听器（如果需要）
                  this.addModalClickListener(uiInfo, cls);
                  // 触发继承自GUILogicBase的组件的start方法（仅在重新打开已存在的UI时）
                  this.triggerStartForGUILogic(uiInfo.UI.contentPane);
                  this.EventTarget.emit(this.EventTarget.key.OPEN, uiInfo);
                  return _context2.abrupt("return", uiInfo.UI);
                case 30:
                  if (uiInfo.loadingPromise) {
                    _context2.next = 32;
                    break;
                  }
                  return _context2.abrupt("return", this.openNew(cls, data));
                case 32:
                  log("加载中", cls.URL, "请稍后");
                  _context2.next = 35;
                  return uiInfo.loadingPromise;
                case 35:
                  _ui = _context2.sent;
                  if (data && _ui && !_ui.isDisposed) {
                    _ui.contentPane.data = data;
                  }
                  return _context2.abrupt("return", _ui);
                case 38:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[3,, 12, 15]]);
          }));
        }
        /**
         * 打开新的UI窗口
         * @param cls UI窗口类
         * @param data UI窗口数据
         * @returns 返回打开的UI窗口
         */;
        _proto6.openNew = function openNew(cls, data) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _this6 = this;
            var uiInfo, loadingPromise;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  // 创建UI信息
                  uiInfo = {
                    State: GUIState.Loading,
                    URL: cls.URL
                  };
                  this._setUISortIndex(uiInfo, cls);
                  this.__uiMap.set(cls.URL, uiInfo);
                  loadingPromise = function () {
                    return __awaiter(_this6, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                      var _this7 = this;
                      var _a, _b, _c, _d, gCom, layer, clsWindow, guiWindow;
                      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return this.loadUI(cls);
                          case 3:
                            gCom = _context3.sent;
                            if (gCom) {
                              _context3.next = 8;
                              break;
                            }
                            // 如果加载失败，则删除UI信息并返回null
                            this.__uiMap["delete"](cls.URL);
                            uiInfo.State = GUIState.Destroyed;
                            return _context3.abrupt("return", null);
                          case 8:
                            // 创建GUIWindow并设置数据
                            layer = ((_a = cls.uiOptions) === null || _a === void 0 ? void 0 : _a.layer) || UILayer.WINDOW;
                            clsWindow = ((_b = cls.uiOptions) === null || _b === void 0 ? void 0 : _b.windowCls) || UIClsMap[layer];
                            guiWindow = new clsWindow();
                            if ((_c = cls.uiOptions) === null || _c === void 0 ? void 0 : _c.modal) guiWindow.modal = true;
                            if (data) gCom.data = data;
                            guiWindow.contentPane = gCom;
                            uiInfo.UI = guiWindow;
                            // 设置为排序root
                            gCom.node.sortRoot = true;
                            if (!((_d = cls.uiOptions) === null || _d === void 0 ? void 0 : _d.closeAutoTextBatch)) gCom.node.autoBatchTxt = true;
                            // 添加模态遮罩点击监听器（如果需要）
                            this.addModalClickListener(uiInfo, cls);
                            // 显示UI
                            this.showIfNotClosed(uiInfo);
                            // 增加引用计数
                            cls.Dependencies.forEach(function (pkgName) {
                              _this7.setPackageRefCount(pkgName);
                            });
                            return _context3.abrupt("return", guiWindow);
                          case 23:
                            _context3.prev = 23;
                            _context3.t0 = _context3["catch"](0);
                            this.__uiMap["delete"](cls.URL);
                            uiInfo.State = GUIState.Destroyed;
                            throw _context3.t0;
                          case 28:
                          case "end":
                            return _context3.stop();
                        }
                      }, _callee3, this, [[0, 23]]);
                    }));
                  }();
                  uiInfo.loadingPromise = loadingPromise;
                  _context4.prev = 5;
                  _context4.next = 8;
                  return loadingPromise;
                case 8:
                  return _context4.abrupt("return", _context4.sent);
                case 9:
                  _context4.prev = 9;
                  uiInfo.loadingPromise = undefined;
                  return _context4.finish(9);
                case 12:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[5,, 9, 12]]);
          }));
        }
        // 从销毁列表中移除UI信息
        ;

        _proto6.removeFromDestroyList = function removeFromDestroyList(uiInfo) {
          var index = this.__destoryList.indexOf(uiInfo);
          if (index !== -1) {
            this.__destoryList.splice(index, 1);
          }
        }
        // 如果UI没有关闭，则显示UI
        ;

        _proto6.showIfNotClosed = function showIfNotClosed(uiInfo) {
          if (uiInfo.State !== GUIState.Closed) {
            uiInfo.UI.sortingOrder = uiInfo.sortIndex;
            uiInfo.UI.show();
            uiInfo.State = GUIState.Showed;
            this.EventTarget.emit(this.EventTarget.key.OPEN, uiInfo);
          }
        }
        // 加载UI
        ;

        _proto6.loadUI = function loadUI(cls) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var _this8 = this;
            var _a, hideLoadModal, needLoadPackages, ui;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  hideLoadModal = (_a = cls.uiOptions) === null || _a === void 0 ? void 0 : _a.hideLoadModal;
                  _context5.prev = 1;
                  // 检查依赖包是否已加载，如果未加载则添加到需要加载的列表中
                  needLoadPackages = [];
                  cls.Dependencies.forEach(function (pkgName) {
                    if (!UIPackage.getByName(pkgName)) {
                      needLoadPackages.push(pkgName);
                    }
                  });
                  // 如果有需要加载的依赖包，则显示等待界面并加载依赖包
                  if (!(needLoadPackages.length > 0)) {
                    _context5.next = 9;
                    break;
                  }
                  if (!hideLoadModal) GRoot.inst.showModalWait();
                  _context5.next = 8;
                  return Promise.all(needLoadPackages.map(function (pkgName) {
                    return _this8.loadPackage(pkgName);
                  }));
                case 8:
                  if (!hideLoadModal) GRoot.inst.closeModalWait();
                case 9:
                  // 创建UI实例
                  ui = cls.createInstance();
                  return _context5.abrupt("return", ui);
                case 13:
                  _context5.prev = 13;
                  _context5.t0 = _context5["catch"](1);
                  error(_context5.t0);
                  if (!hideLoadModal) GRoot.inst.closeModalWait();
                case 17:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, null, [[1, 13]]);
          }));
        }
        /**
         * 多态实现：加载UI依赖包
         */;
        _proto6.loadPackage = function loadPackage(pkgName, onProgress) {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt("return", new Promise(function (resolve, reject) {
                    var resourcePath = PackagePrefix + pkgName;
                    if (onProgress) {
                      // 从resources加载，带进度回调
                      UIPackage.loadPackage(resourcePath, onProgress, function (error, pkg) {
                        if (error) {
                          reject(error);
                        } else {
                          log("load package success", pkgName);
                          resolve(pkg);
                        }
                      });
                    } else {
                      // 从resources加载，不带进度回调（原版本）
                      UIPackage.loadPackage(resourcePath, function (error, pkg) {
                        if (error) {
                          reject(error);
                        } else {
                          log("load package success", pkgName);
                          resolve(pkg);
                        }
                      });
                    }
                  }));
                case 1:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
        };
        _proto6.close = function close(arg) {
          var cls = arg;
          if (arg instanceof Window) {
            cls = this.getUICls(arg.contentPane.resourceURL);
          } else if (arg instanceof GComponent) {
            cls = this.getUICls(arg.resourceURL);
          }
          // 获取UI信息
          var info = this.__uiMap.get(cls.URL);
          // 如果UI信息存在且UI窗口未关闭
          if (info && info.State !== GUIState.Closed) {
            // 移除模态遮罩点击监听器
            this.removeModalClickListener(info);
            // 如果UI窗口已打开，则隐藏UI窗口
            if (info.UI) {
              info.UI.hide();
            }
            // 更新UI状态为已关闭
            info.State = GUIState.Closed;
            this.EventTarget.emit(this.EventTarget.key.CLOSE, info);
            // 记录UI关闭时间
            info.CloseTime = Timer.currentTime;
            // 如果销毁列表中UI信息数量超过最大值，则销毁最早的UI信息
            if (this.__destoryList.length >= MaxWaitDestoryNum) {
              var destoryInfo = this.__destoryList.shift();
              this.disposeWindow(destoryInfo);
            }
            // 将UI信息添加到销毁列表中
            this.__destoryList.push(info);
          }
        }
        /**
         * 关闭所有UI窗口
         */;
        _proto6.closeAll = function closeAll() {
          var _this9 = this;
          // 遍历所有UI信息
          this.__uiMap.forEach(function (info, key) {
            // 获取UI窗口类
            var cls = _this9.getUICls(key);
            // 如果UI窗口类存在，则关闭UI窗口
            if (cls) {
              _this9.close(cls);
            }
          });
        }
        /**
         * 获取UI状态
         * @param cls UI窗口类
         * @returns 返回UI状态
         */;
        _proto6.getGUIState = function getGUIState(cls) {
          // 获取UI信息
          var info = this.__uiMap.get(cls.URL);
          if (info) {
            // 如果UI窗口已打开，则返回已显示状态
            if (info.UI) {
              return info.UI.isShowing ? GUIState.Showed : GUIState.Closed;
            }
            // 返回UI状态
            return info.State;
          } else {
            // 如果UI信息不存在，则返回已销毁状态
            return GUIState.Destroyed;
          }
        }
        /**
         * 获取UI窗口类
         * @param url UI窗口路径
         * @returns 返回UI窗口类
         */;
        _proto6.getUICls = function getUICls(url) {
          // 获取UI窗口类
          var cls = UIObjectFactory.extensions[url];
          return cls;
        }
        /**
         * 触发继承自GUILogicBase的组件的start方法
         * @param contentPane UI内容面板
         * @remarks 仅在重新打开已存在的UI时调用，避免与引擎自动调用的start方法冲突
         */;
        _proto6.triggerStartForGUILogic = function triggerStartForGUILogic(contentPane) {
          if (contentPane && contentPane.node) {
            // 获取节点上的所有组件
            var components = contentPane.node.getComponents('cc.Component');
            components.forEach(function (component) {
              // 检查组件是否继承自GUILogicBase
              if (component instanceof GUILogicBase) {
                try {
                  // 调用start方法，让每次显示都能执行start逻辑
                  if (typeof component.start === 'function') {
                    component.start();
                  }
                } catch (error) {
                  console.warn('调用start方法时出错:', error);
                }
              }
            });
          }
        }
        /**
         * 获取UI窗口
        */;
        _proto6.getUI = function getUI(cls) {
          var uiInfo = this.__uiMap.get(cls.URL);
          if (uiInfo && uiInfo.State === GUIState.Showed) {
            return uiInfo.UI.contentPane;
          }
        }
        /**
         * 添加模态遮罩点击监听器
         * @param uiinfo UI信息
         * @param cls UI类
         */;
        _proto6.addModalClickListener = function addModalClickListener(uiinfo, cls) {
          var _this10 = this;
          var _a, _b;
          if (((_a = cls.uiOptions) === null || _a === void 0 ? void 0 : _a.modal) && ((_b = cls.uiOptions) === null || _b === void 0 ? void 0 : _b.clickModalToClose) && uiinfo.UI) {
            // 先移除之前的监听器（如果存在）
            this.removeModalClickListener(uiinfo);
            var modalLayer = GRoot.inst.modalLayer;
            if (modalLayer) {
              // 创建点击监听器
              var clickListener = function clickListener() {
                // 检查UI是否仍然存在且处于显示状态
                if (uiinfo.State === GUIState.Showed && uiinfo.UI && !uiinfo.UI.isDisposed) {
                  // 关闭当前UI
                  _this10.close(cls);
                }
              };
              // 保存监听器引用
              uiinfo.modalClickListener = clickListener;
              // 添加点击事件监听
              modalLayer.onClick(clickListener, this);
              log("添加模态遮罩点击监听器", cls.URL);
            }
          }
        }
        /**
         * 移除模态遮罩点击监听器
         * @param uiinfo UI信息
         */;
        _proto6.removeModalClickListener = function removeModalClickListener(uiinfo) {
          if (uiinfo.modalClickListener) {
            var modalLayer = GRoot.inst.modalLayer;
            if (modalLayer) {
              modalLayer.offClick(uiinfo.modalClickListener, this);
              log("移除模态遮罩点击监听器", uiinfo.URL);
            }
            uiinfo.modalClickListener = null;
          }
        };
        return GUIManagerImpl;
      }(); // 导出GUIManager实例
      var GUIManager = exports('GUIManager', new GUIManagerImpl());
      function registerBinder(constructor) {
        AllBinder.Binders.push(new constructor());
      }
      var AllBinder = exports('AllBinder', /*#__PURE__*/function () {
        function AllBinder() {}
        AllBinder.bindAll = function bindAll() {
          this.Binders.forEach(function (binder) {
            binder.bindAll();
          });
        };
        return AllBinder;
      }());
      AllBinder.Binders = [];
      // 自动绑定 TODO 代码分包的问题以后考虑
      {
        director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, function () {
          AllBinder.bindAll();
          director.targetOff(AllBinder);
        }, AllBinder);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, function () {
          GRoot.create();
        }, GRoot);
      }
      function GBind(conmponent, obj, key, prop) {
        return new GUIBindNew(conmponent, obj, key, prop);
      }
      var AutoTriggerMap = new Map();
      var proxy = new Proxy(Object.create(null), {
        get: function get(target, key) {
          return key;
        }
      });
      var GUIBindNew = /*#__PURE__*/function () {
        function GUIBindNew(component, obj, key, prop) {
          this.keyObj = proxy;
          this.keyCom = proxy;
          this.component = component;
          this.obj = obj;
          this.key = key(this.keyObj);
          if (prop) this.prop = prop(this.keyCom);
        }
        var _proto7 = GUIBindNew.prototype;
        _proto7.setOptions = function setOptions(options) {
          this.options = options;
          return this;
        };
        _proto7.setProp = function setProp(prop) {
          this.prop = prop;
          return this;
        };
        _proto7.setFormatFunc = function setFormatFunc(func) {
          this.formatFunc = func;
          return this;
        };
        _proto7.setReformatFunc = function setReformatFunc(func) {
          this.reformatFunc = func;
          return this;
        };
        _proto7.bindTarget = function bindTarget(target) {
          this.target = target;
          bind(this);
          if (AutoTriggerMap.has(target)) {
            return;
          }
          // 绑定后下一帧自动触发一次
          var id = setTimeout(function () {
            mk_monitor$1.trigger(target);
            AutoTriggerMap["delete"](target);
          }, 0);
          AutoTriggerMap.set(target, id);
        };
        return GUIBindNew;
      }();
      function bind(bindInstance) {
        var component = bindInstance.component,
          obj = bindInstance.obj,
          key = bindInstance.key,
          target = bindInstance.target,
          prop = bindInstance.prop,
          options = bindInstance.options,
          formatFunc = bindInstance.formatFunc,
          reformatFunc = bindInstance.reformatFunc;
        var twoWayBindKey;
        if (!prop) {
          // 填充默认的prop
          if (component instanceof GProgressBar || component instanceof GSlider) {
            prop = Key().value;
            if (component instanceof GSlider) {
              twoWayBindKey = "_" + Key().value;
            }
          } else if (component instanceof GTextField || component instanceof GRichTextField || component instanceof GButton || component instanceof GTextInput || component instanceof GLabel) {
            prop = Key().text;
            if (component instanceof GTextInput) {
              twoWayBindKey = "_" + Key().text;
            }
          } else if (component instanceof Controller) {
            prop = Key().selectedIndex;
            twoWayBindKey = "_" + Key().selectedIndex;
          }
        }
        // 校验formatFunc 与 reformatFunc 没有就填充默认的
        if (!formatFunc) {
          if (typeof component[prop] != typeof obj[key]) {
            if (typeof obj[key] == "number") {
              formatFunc = default2Num;
            } else if (typeof obj[key] == "string") {
              formatFunc = default2Str;
            } else if (typeof obj[key] == "boolean") {
              formatFunc = default2Bool;
            }
          } else {
            formatFunc = defaultNoThing;
          }
        }
        if (!reformatFunc) {
          if (typeof component[prop] != typeof obj[key]) {
            if (typeof component[prop] == "number") {
              reformatFunc = default2Num;
            } else if (typeof component[prop] == "string") {
              reformatFunc = default2Str;
            } else if (typeof component[prop] == "boolean") {
              reformatFunc = default2Bool;
            }
          } else {
            reformatFunc = defaultNoThing;
          }
        }
        // 校验是否是几个特殊需要处理的
        if (component instanceof GProgressBar || component instanceof GSlider) {
          if (options) {
            // tween
            bindTweenValue(component, obj, key, target, options, formatFunc);
            return;
          }
        } else if (component instanceof GTextField || component instanceof GRichTextField) {
          if (options) {
            // tween
            bindTemplateLabel(component, obj, key, target, options, formatFunc);
            return;
          }
        }
        if (!prop) {
          throw new Error("Unsupported component type for binding.");
        }
        mk_monitor$1.on(obj, key, function (value) {
          component[prop] = formatFunc(value);
        }, target);
        if (twoWayBindKey) {
          mk_monitor$1.on(component, twoWayBindKey, function (value) {
            obj[key] = reformatFunc(value);
          }, target);
        }
      }
      function default2Num(value) {
        var num = Number(value);
        if (isNaN(num)) {
          return 0;
        }
        return num;
      }
      function default2Str(value) {
        if (value.toString) {
          return value.toString();
        }
        return "";
      }
      function default2Bool(value) {
        return !!value;
      }
      function defaultNoThing(value) {
        return value;
      }
      function bindTweenValue(component, obj, key, target, options, formatFunc) {
        var _options$duration = options.duration,
          duration = _options$duration === void 0 ? 3 : _options$duration,
          _options$ease = options.ease,
          ease = _options$ease === void 0 ? EaseType.QuartOut : _options$ease,
          _options$oneWay = options.oneWay,
          oneWay = _options$oneWay === void 0 ? false : _options$oneWay;
        var tweenValue;
        var perDuration = duration / 100;
        mk_monitor$1.on(obj, key, function (value) {
          if (component.value === value) return;
          var num = formatFunc(value);
          var dif = Math.abs(num - component.value);
          if (dif > component.max) {
            component.value = num;
            return;
          }
          var actualDuration = dif / component.max * 100 * perDuration;
          if (oneWay && num < component.value) {
            var toMaxDuration = (component.max - component.value) / component.max * perDuration;
            var toZeroDuration = num / component.max * perDuration;
            if (tweenValue && !tweenValue.completed) {
              tweenValue.kill(false);
            }
            tweenValue = GTween.to(component.value, component.max, toMaxDuration).setEase(ease).setTarget(component).onUpdate(function (tweener) {
              component.value = tweener.value.x;
            }).onComplete(function () {
              tweenValue = GTween.to(0, num, toZeroDuration).setEase(ease).setTarget(component).onUpdate(function (tweener) {
                component.value = tweener.value.x;
              });
            });
          } else {
            if (!tweenValue || tweenValue.completed) {
              if (dif * 100 < component.max) {
                component.value = num;
                return;
              }
              tweenValue = GTween.to(component.value, num, actualDuration).setEase(ease).setTarget(component).onUpdate(function (tweener) {
                component.value = tweener.value.x;
              });
            } else {
              tweenValue.setDuration(actualDuration);
              tweenValue.startValue.x = tweenValue.value.x;
              tweenValue.endValue.x = num;
            }
          }
        }, target);
      }
      /** 处理 GTextField、GRichTextField 和 GTextInput 的模板字符串绑定 */
      function bindTemplateLabel(component, obj, key, target, options, formatFunc) {
        if (!(component.setVar && component.flushVars)) {
          throw new Error("Component lacks necessary methods for template binding.");
        }
        var templateVars = component.templateVars || {};
        component.templateVars = templateVars;
        var templateKey = options.templateKey;
        var refresh = function refresh() {
          return component.flushVars();
        };
        mk_monitor$1.on(obj, key, function (value) {
          var str = formatFunc(value);
          if (templateVars[templateKey] !== str) {
            templateVars[templateKey] = str;
            TickerManager.clearNextFrame(refresh, component);
            TickerManager.callNextFrame(refresh, component);
          }
        }, target);
      }
      /**
       * 初始化vm
       *  vm绑定的数据不要单个改子对象，只能整体替换target的data
       */
      function vm(target) {
        //@ts-ignore
        var onConstruct = target.prototype.onConstruct;
        //@ts-ignore
        var onDestroy = target.prototype.onDestroy;
        //@ts-ignore
        var onEnable = target.prototype.onEnable;
        //@ts-ignore
        var onDisable = target.prototype.onDisable;
        if (!target.prototype["afterConstruct"]) target.prototype["afterConstruct"] = [];
        //@ts-ignore
        target.prototype.onConstruct = function () {
          onConstruct.call(this);
          var afterConstruct = target.prototype["afterConstruct"];
          if (!afterConstruct) return;
          for (var index = 0; index < afterConstruct.length; index++) {
            var func = afterConstruct[index];
            func(this);
          }
        };
        //@ts-ignore
        target.prototype.onDestroy = function () {
          mk_monitor$1.clear(this);
          onDestroy.call(this);
        };
        //@ts-ignore
        target.prototype.onEnable = function () {
          var _this11 = this;
          onEnable.call(this);
          mk_monitor$1.enable(this);
          TickerManager.callNextFrame(function () {
            mk_monitor$1.trigger(_this11);
          }, this);
        };
        //@ts-ignore
        target.prototype.onDisable = function () {
          onDisable.call(this);
          mk_monitor$1.disable(this);
        };
      }
      /**
       *  绑定逻辑类
       */
      function addLogic(uiCls) {
        return function (target) {
          if (!uiCls.prototype["afterConstruct"]) uiCls.prototype["afterConstruct"] = [];
          uiCls.prototype["afterConstruct"].push(function (self) {
            self.node.addComponent(target);
          });
          // 重设UI选项配置
          uiCls["uiOptions"] = target["uiOptions"];
        };
      }

      /**
       * 排序层级
       */
      var SortingLayer;
      (function (SortingLayer) {
        //-- 自定义，在此之上，小于 DEFAULT 的层级
        /**
         * 默认层级，在没有应用排序的UI渲染上的默认层级 *不要修改此枚举*
         */
        SortingLayer[SortingLayer["DEFAULT"] = 0] = "DEFAULT";
        //-- 自定义，在此之下，大于 DEFAULT 的层级
        SortingLayer[SortingLayer["UI"] = 1] = "UI";
        SortingLayer[SortingLayer["OTHER"] = 2] = "OTHER";
        SortingLayer[SortingLayer["LOADER"] = 3] = "LOADER";
        SortingLayer[SortingLayer["TEXT"] = 4] = "TEXT";
      })(SortingLayer || (SortingLayer = exports('SortingLayer', {})));
      if (!('sortingPriority' in UITransform.prototype)) {
        Object.defineProperty(UITransform.prototype, 'sortingPriority', {
          get: function get() {
            return this._sortingPriority;
          },
          set: function set(value) {
            this._sortingPriority = value;
          },
          enumerable: true
        });
        Object.defineProperty(UITransform.prototype, 'sortingEnabled', {
          get: function get() {
            return this._sortingEnabled;
          },
          set: function set(value) {
            this._sortingEnabled = value;
          },
          enumerable: true
        });
      }

      //@ts-nocheck
      var _cocos_2d_renderer_stencil_manager__Stage;
      (function (_cocos_2d_renderer_stencil_manager__Stage) {
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["DISABLED"] = 0] = "DISABLED";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["CLEAR"] = 1] = "CLEAR";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["ENTER_LEVEL"] = 2] = "ENTER_LEVEL";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["ENABLED"] = 3] = "ENABLED";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["EXIT_LEVEL"] = 4] = "EXIT_LEVEL";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["CLEAR_INVERTED"] = 5] = "CLEAR_INVERTED";
        _cocos_2d_renderer_stencil_manager__Stage[_cocos_2d_renderer_stencil_manager__Stage["ENTER_LEVEL_INVERTED"] = 6] = "ENTER_LEVEL_INVERTED";
      })(_cocos_2d_renderer_stencil_manager__Stage || (_cocos_2d_renderer_stencil_manager__Stage = exports('_cocos_2d_renderer_stencil_manager__Stage', {})));
      function updateOpacity(renderData, opacity) {
        var vfmt = renderData.vertexFormat;
        var vb = renderData.chunk.vb;
        var attr;
        var format;
        var stride;
        // Color component offset
        var offset = 0;
        for (var i = 0; i < vfmt.length; ++i) {
          attr = vfmt[i];
          format = gfx.FormatInfos[attr.format];
          if (format.hasAlpha) {
            stride = renderData.floatStride;
            if (format.size / format.count === 1) {
              var alpha = ~~clamp(Math.round(opacity * 255), 0, 255);
              // Uint color RGBA8
              for (var color = offset; color < vb.length; color += stride) {
                vb[color] = (vb[color] & 0xffffff00 | alpha) >>> 0;
              }
            } else if (format.size / format.count === 4) {
              // RGBA32 color, alpha at position 3
              for (var _alpha = offset + 3; _alpha < vb.length; _alpha += stride) {
                vb[_alpha] = opacity;
              }
            }
          }
          offset += format.size >> 2;
        }
      }
      UI.prototype.update = function () {
        var _a;
        this.rendererCache = (_a = this.rendererCache) !== null && _a !== void 0 ? _a : [];
        this.rendererOrder = false;
        var screens = this._screens;
        var offset = 0;
        for (var i = 0; i < screens.length; ++i) {
          var screen = screens[i];
          var scene = screen._getRenderScene();
          if (!screen.enabledInHierarchy || !scene) {
            continue;
          }
          // Reset state and walk
          this._opacityDirty = 0;
          this._pOpacity = 1;
          this.walk(screen.node);
          this.autoMergeBatches(this._currComponent);
          this.resetRenderStates();
          var batchPriority = 0;
          if (this._batches.length > offset) {
            for (; offset < this._batches.length; ++offset) {
              var batch = this._batches.array[offset];
              if (batch.model) {
                var subModels = batch.model.subModels;
                for (var j = 0; j < subModels.length; j++) {
                  subModels[j].priority = batchPriority++;
                }
              } else {
                batch.descriptorSet = this._descriptorSetCache.getDescriptorSet(batch);
              }
              scene.addBatch(batch);
            }
          }
        }
      };
      UI.prototype.walk = function (node, level, sortingPriority, localRendererCache, autoBatchTxt) {
        if (level === void 0) {
          level = 0;
        }
        if (sortingPriority === void 0) {
          sortingPriority = 0;
        }
        if (localRendererCache === void 0) {
          localRendererCache = null;
        }
        if (autoBatchTxt === void 0) {
          autoBatchTxt = false;
        }
        var _a, _b;
        if (!node.activeInHierarchy) {
          return;
        }
        var children = node.children;
        var uiProps = node._uiProps;
        var render = uiProps.uiComp;
        var stencilEnterLevel = render && (render.stencilStage === _cocos_2d_renderer_stencil_manager__Stage.ENTER_LEVEL || render.stencilStage === _cocos_2d_renderer_stencil_manager__Stage.ENTER_LEVEL_INVERTED);
        var transform = uiProps.uiTransformComp;
        sortingPriority = transform && transform._sortingEnabled ? transform._sortingPriority : sortingPriority;
        var sortIndex = node.sortIndex ? node.sortIndex : (_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a._sortIndex) !== null && _b !== void 0 ? _b : 0;
        node._sortIndex = sortIndex;
        // 精确的 FairyGUI Mask 组件检测逻辑
        if (node.$gobj && node.$gobj instanceof GComponent) {
          var gcomp = node.$gobj;
          // 检查自定义遮罩 - _customMask 挂载在专门的 maskNode 上
          if (gcomp._customMask && !gcomp._customMask.node.sortRoot) {
            gcomp._customMask.node.sortRoot = true;
            // console.warn(`Node "${gcomp._customMask.node.name}" (customMask) set sortRoot=true for proper clipping`);
          }
          // 检查矩形遮罩 - _rectMask 挂载在 _container 上
          if (gcomp._rectMask && !gcomp._container.sortRoot) {
            gcomp._container.sortRoot = true;
            // console.warn(`Node "${gcomp._container.name}" (rectMask) set sortRoot=true for proper clipping`);
          }
        }
        // 如果开启了autoBatchTxt 检测当前组件是否是文本 如果是检测是否指定了层级 如果没有 设置为一个默认文本层级
        if (autoBatchTxt && node.$gobj && transform && transform._sortingEnabled == null) {
          // 校验组件
          if (node.$gobj instanceof GTextField) {
            transform.sortingEnabled = true;
            transform.sortingPriority = SortingLayer.TEXT * 1e3;
            sortingPriority = transform.sortingPriority;
          }
        }
        if (transform && node.autoCulling && isOutsideScreen(node, transform)) {
          // 超出屏幕自动剔除
          return;
        }
        // Save opacity
        var parentOpacity = this._pOpacity;
        var opacity = parentOpacity;
        var selfOpacity = render && render.color ? render.color.a / 255 : 1;
        this._pOpacity = opacity *= selfOpacity * uiProps.localOpacity;
        uiProps._opacity = opacity;
        if (uiProps.colorDirty) {
          // Cascade color dirty state
          this._opacityDirty++;
        }
        if (render && render.enabledInHierarchy) {
          if (stencilEnterLevel) {
            render.fillBuffers(this);
            if (this._opacityDirty && render && !render.useVertexOpacity && render.renderData && render.renderData.vertexCount > 0) {
              // HARD COUPLING
              updateOpacity(render.renderData, opacity);
              var buffer = render.renderData.getMeshBuffer();
              if (buffer) {
                buffer.setDirty();
              }
            }
          } else {
            var cache = localRendererCache || this.rendererCache;
            cache.push(render);
            render.renderPriority = sortingPriority;
            if (sortingPriority != 0) {
              this.rendererOrder = true;
            }
            if (this._opacityDirty && render && !render.useVertexOpacity && render.renderData && render.renderData.vertexCount > 0) {
              render.renderOpacity = opacity;
            } else {
              render.renderOpacity = -1;
            }
          }
        }
        var isSortRoot = node.sortRoot;
        if (isSortRoot) {
          if (node.autoBatchTxt) autoBatchTxt = true;
          // 先渲染之前已经渲染了的 然后渲染新的sort root;
          if (localRendererCache) {
            var _cache = localRendererCache;
            _cache.sort(function (a, b) {
              var valueA = a.renderPriority + a.node._sortIndex;
              var valueB = b.renderPriority + b.node._sortIndex;
              return valueA - valueB;
            });
            for (var _iterator = _createForOfIteratorHelperLoose(_cache), _step; !(_step = _iterator()).done;) {
              var renderUI = _step.value;
              renderUI.fillBuffers(this);
              if (renderUI.renderOpacity >= 0) {
                updateOpacity(renderUI.renderData, renderUI.renderOpacity);
                var _buffer = renderUI.renderData.getMeshBuffer();
                if (_buffer) {
                  _buffer.setDirty();
                }
              }
            }
            _cache.length = 0;
          }
          var newRendererCache = [];
          for (var i = 0; i < children.length; i++) {
            this.walk(children[i], level, sortingPriority, newRendererCache, autoBatchTxt);
          }
          newRendererCache.sort(function (a, b) {
            var valueA = a.renderPriority + a.node._sortIndex;
            var valueB = b.renderPriority + b.node._sortIndex;
            return valueA - valueB;
          });
          for (var _i = 0, _newRendererCache = newRendererCache; _i < _newRendererCache.length; _i++) {
            var _render = _newRendererCache[_i];
            _render.fillBuffers(this);
            if (_render.renderOpacity >= 0) {
              updateOpacity(_render.renderData, _render.renderOpacity);
              var _buffer2 = _render.renderData.getMeshBuffer();
              if (_buffer2) {
                _buffer2.setDirty();
              }
            }
          }
        } else {
          // 检查子节点中是否有 sortRoot，如果有则需要分组处理
          var hasSortRootChild = false;
          for (var _i2 = 0; _i2 < children.length; _i2++) {
            if (children[_i2].sortRoot) {
              hasSortRootChild = true;
              break;
            }
          }
          if (hasSortRootChild) {
            // 分组处理：sortRoot之前、sortRoot及其子节点、sortRoot之后
            for (var _i3 = 0; _i3 < children.length; _i3++) {
              var child = children[_i3];
              if (child.sortRoot) {
                // 1. 先渲染当前缓存的内容（sortRoot之前的节点）
                if (localRendererCache) {
                  var _cache2 = localRendererCache;
                  _cache2.sort(function (a, b) {
                    var valueA = a.renderPriority + a.node._sortIndex;
                    var valueB = b.renderPriority + b.node._sortIndex;
                    return valueA - valueB;
                  });
                  for (var _iterator2 = _createForOfIteratorHelperLoose(_cache2), _step2; !(_step2 = _iterator2()).done;) {
                    var _renderUI = _step2.value;
                    _renderUI.fillBuffers(this);
                    if (_renderUI.renderOpacity >= 0) {
                      updateOpacity(_renderUI.renderData, _renderUI.renderOpacity);
                      var _buffer3 = _renderUI.renderData.getMeshBuffer();
                      if (_buffer3) {
                        _buffer3.setDirty();
                      }
                    }
                  }
                  _cache2.length = 0;
                } else {
                  // 如果没有局部缓存，渲染全局缓存
                  var _cache3 = this.rendererCache;
                  for (var _iterator3 = _createForOfIteratorHelperLoose(_cache3), _step3; !(_step3 = _iterator3()).done;) {
                    var _render2 = _step3.value;
                    _render2.fillBuffers(this);
                    if (_render2.renderOpacity >= 0) {
                      updateOpacity(_render2.renderData, _render2.renderOpacity);
                      var _buffer4 = _render2.renderData.getMeshBuffer();
                      if (_buffer4) {
                        _buffer4.setDirty();
                      }
                    }
                  }
                  _cache3.length = 0;
                }
                // 2. 处理 sortRoot 节点及其子节点
                this.walk(child, level, sortingPriority, null, autoBatchTxt);
              } else {
                // 3. 普通节点，继续添加到缓存
                this.walk(child, level, sortingPriority, localRendererCache, autoBatchTxt);
              }
            }
            // 4. 最后渲染剩余的缓存内容（sortRoot之后的节点）
            if (localRendererCache) {
              var _cache4 = localRendererCache;
              _cache4.sort(function (a, b) {
                var valueA = a.renderPriority + a.node._sortIndex;
                var valueB = b.renderPriority + b.node._sortIndex;
                return valueA - valueB;
              });
              for (var _iterator4 = _createForOfIteratorHelperLoose(_cache4), _step4; !(_step4 = _iterator4()).done;) {
                var _renderUI2 = _step4.value;
                _renderUI2.fillBuffers(this);
                if (_renderUI2.renderOpacity >= 0) {
                  updateOpacity(_renderUI2.renderData, _renderUI2.renderOpacity);
                  var _buffer5 = _renderUI2.renderData.getMeshBuffer();
                  if (_buffer5) {
                    _buffer5.setDirty();
                  }
                }
              }
              _cache4.length = 0;
            } else {
              // 如果没有局部缓存，渲染全局缓存
              var _cache5 = this.rendererCache;
              for (var _iterator5 = _createForOfIteratorHelperLoose(_cache5), _step5; !(_step5 = _iterator5()).done;) {
                var _render3 = _step5.value;
                _render3.fillBuffers(this);
                if (_render3.renderOpacity >= 0) {
                  updateOpacity(_render3.renderData, _render3.renderOpacity);
                  var _buffer6 = _render3.renderData.getMeshBuffer();
                  if (_buffer6) {
                    _buffer6.setDirty();
                  }
                }
              }
              _cache5.length = 0;
            }
          } else {
            // 没有 sortRoot 子节点，正常处理
            for (var _i4 = 0; _i4 < children.length; _i4++) {
              this.walk(children[_i4], level, sortingPriority, localRendererCache, autoBatchTxt);
            }
            // Ensure normal nodes are rendered in tree order if they don't have sortRoot
            if (!localRendererCache) {
              var _cache6 = this.rendererCache;
              for (var _iterator6 = _createForOfIteratorHelperLoose(_cache6), _step6; !(_step6 = _iterator6()).done;) {
                var _render4 = _step6.value;
                _render4.fillBuffers(this);
                if (_render4.renderOpacity >= 0) {
                  updateOpacity(_render4.renderData, _render4.renderOpacity);
                  var _buffer7 = _render4.renderData.getMeshBuffer();
                  if (_buffer7) {
                    _buffer7.setDirty();
                  }
                }
              }
              _cache6.length = 0;
            }
          }
        }
        if (uiProps.colorDirty) {
          // Reduce cascaded color dirty state
          this._opacityDirty--;
          // Reset color dirty
          uiProps.colorDirty = false;
        }
        // Restore opacity
        this._pOpacity = parentOpacity;
        // Post render assembler update logic
        // ATTENTION: Will also reset colorDirty inside postUpdateAssembler
        if (render && render.enabledInHierarchy) {
          render.postUpdateAssembler(this);
          if (stencilEnterLevel && StencilManager.sharedManager.getMaskStackSize() > 0) {
            this.autoMergeBatches(this._currComponent);
            this.resetRenderStates();
            StencilManager.sharedManager.exitMask();
          }
        }
        level += 1;
      };
      var tempVect3 = new math.Vec3();
      function isOutsideScreen(node, uiTransform) {
        // 获取当前可见区域尺寸
        var visibleSize = view._visibleRect;
        var camera = UI.Camera;
        // 如果没有有效摄像机，不进行剔除
        if (!camera || !camera.isValid) return false;
        // 如果节点没有有效的 UITransform 数据，不进行剔除
        if (!uiTransform || uiTransform.width <= 0 || uiTransform.height <= 0) return false;
        var worldPos = node.worldPosition;
        camera.worldToScreen(worldPos, tempVect3);
        // 增加一些边距以避免边界问题
        var margin = 50;
        var flag = tempVect3.x + uiTransform.width / 2 < -margin || tempVect3.x - uiTransform.width / 2 > visibleSize.width + margin || tempVect3.y + uiTransform.height / 2 < -margin || tempVect3.y - uiTransform.height / 2 > visibleSize.height + margin;
        return flag;
      }
    }
  };
});

System.register("chunks:///_virtual/env", [], function (exports) {
  return {
    execute: function () {
      var EDITOR = exports('EDITOR', false);
      var DEBUG = exports('DEBUG', true);
    }
  };
});

System.register("chunks:///_virtual/fairygui.mjs", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, _createClass, _regeneratorRuntime, _assertThisInitialized, gfx, Vec2, Color, Layers, Font, resources, Rect, Vec3, misc, Sprite, Size, assetManager, Texture2D, SpriteFrame, BitmapFont, sp, dragonBones, ImageAsset, AudioClip, Label, RichText, Node, UITransform, Mask, math, director, game, isValid, sys, screen, View, AudioSourceComponent, Overflow, EditBox, instantiate, Prefab, Asset, EventMouse, Event$1, UIOpacity, Component, Graphics, view, path, BufferAsset, AssetManager, SpriteAtlas, EventTarget, UIRenderer, macro, mk_asset$1, mk_release;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _regeneratorRuntime = module.regeneratorRuntime;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      gfx = module.gfx;
      Vec2 = module.Vec2;
      Color = module.Color;
      Layers = module.Layers;
      Font = module.Font;
      resources = module.resources;
      Rect = module.Rect;
      Vec3 = module.Vec3;
      misc = module.misc;
      Sprite = module.Sprite;
      Size = module.Size;
      assetManager = module.assetManager;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
      BitmapFont = module.BitmapFont;
      sp = module.sp;
      dragonBones = module.dragonBones;
      ImageAsset = module.ImageAsset;
      AudioClip = module.AudioClip;
      Label = module.Label;
      RichText = module.RichText;
      Node = module.Node;
      UITransform = module.UITransform;
      Mask = module.Mask;
      math = module.math;
      director = module.director;
      game = module.game;
      isValid = module.isValid;
      sys = module.sys;
      screen = module.screen;
      View = module.View;
      AudioSourceComponent = module.AudioSourceComponent;
      Overflow = module.Overflow;
      EditBox = module.EditBox;
      instantiate = module.instantiate;
      Prefab = module.Prefab;
      Asset = module.Asset;
      EventMouse = module.EventMouse;
      Event$1 = module.Event;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
      Graphics = module.Graphics;
      view = module.view;
      path = module.path;
      BufferAsset = module.BufferAsset;
      AssetManager = module.AssetManager;
      SpriteAtlas = module.SpriteAtlas;
      EventTarget = module.EventTarget;
      UIRenderer = module.UIRenderer;
      macro = module.macro;
    }, function (module) {
      mk_asset$1 = module.asset;
      mk_release = module.release;
    }],
    execute: function () {
      exports({
        AlignType: void 0,
        AutoSizeType: void 0,
        BlendMode: void 0,
        ButtonMode: void 0,
        ChildrenRenderOrder: void 0,
        EaseType: void 0,
        FillMethod: void 0,
        FillOrigin: void 0,
        FlipType: void 0,
        GroupLayoutType: void 0,
        ListLayoutType: void 0,
        ListSelectionMode: void 0,
        LoaderFillType: void 0,
        ObjectPropID: void 0,
        ObjectType: void 0,
        OverflowType: void 0,
        PackageItemType: void 0,
        PopupDirection: void 0,
        ProgressTitleType: void 0,
        RelationType: void 0,
        ScrollBarDisplayType: void 0,
        ScrollType: void 0,
        VertAlignType: void 0,
        registerFont: registerFont
      });
      var _ItemTypeToAssetType;
      var ButtonMode;
      (function (ButtonMode) {
        ButtonMode[ButtonMode["Common"] = 0] = "Common";
        ButtonMode[ButtonMode["Check"] = 1] = "Check";
        ButtonMode[ButtonMode["Radio"] = 2] = "Radio";
      })(ButtonMode || (ButtonMode = exports('ButtonMode', {})));
      var AutoSizeType;
      (function (AutoSizeType) {
        AutoSizeType[AutoSizeType["None"] = 0] = "None";
        AutoSizeType[AutoSizeType["Both"] = 1] = "Both";
        AutoSizeType[AutoSizeType["Height"] = 2] = "Height";
        AutoSizeType[AutoSizeType["Shrink"] = 3] = "Shrink";
      })(AutoSizeType || (AutoSizeType = exports('AutoSizeType', {})));
      var AlignType;
      (function (AlignType) {
        AlignType[AlignType["Left"] = 0] = "Left";
        AlignType[AlignType["Center"] = 1] = "Center";
        AlignType[AlignType["Right"] = 2] = "Right";
      })(AlignType || (AlignType = exports('AlignType', {})));
      var VertAlignType;
      (function (VertAlignType) {
        VertAlignType[VertAlignType["Top"] = 0] = "Top";
        VertAlignType[VertAlignType["Middle"] = 1] = "Middle";
        VertAlignType[VertAlignType["Bottom"] = 2] = "Bottom";
      })(VertAlignType || (VertAlignType = exports('VertAlignType', {})));
      var LoaderFillType;
      (function (LoaderFillType) {
        LoaderFillType[LoaderFillType["None"] = 0] = "None";
        LoaderFillType[LoaderFillType["Scale"] = 1] = "Scale";
        LoaderFillType[LoaderFillType["ScaleMatchHeight"] = 2] = "ScaleMatchHeight";
        LoaderFillType[LoaderFillType["ScaleMatchWidth"] = 3] = "ScaleMatchWidth";
        LoaderFillType[LoaderFillType["ScaleFree"] = 4] = "ScaleFree";
        LoaderFillType[LoaderFillType["ScaleNoBorder"] = 5] = "ScaleNoBorder";
      })(LoaderFillType || (LoaderFillType = exports('LoaderFillType', {})));
      var ListLayoutType;
      (function (ListLayoutType) {
        ListLayoutType[ListLayoutType["SingleColumn"] = 0] = "SingleColumn";
        ListLayoutType[ListLayoutType["SingleRow"] = 1] = "SingleRow";
        ListLayoutType[ListLayoutType["FlowHorizontal"] = 2] = "FlowHorizontal";
        ListLayoutType[ListLayoutType["FlowVertical"] = 3] = "FlowVertical";
        ListLayoutType[ListLayoutType["Pagination"] = 4] = "Pagination";
      })(ListLayoutType || (ListLayoutType = exports('ListLayoutType', {})));
      var ListSelectionMode;
      (function (ListSelectionMode) {
        ListSelectionMode[ListSelectionMode["Single"] = 0] = "Single";
        ListSelectionMode[ListSelectionMode["Multiple"] = 1] = "Multiple";
        ListSelectionMode[ListSelectionMode["Multiple_SingleClick"] = 2] = "Multiple_SingleClick";
        ListSelectionMode[ListSelectionMode["None"] = 3] = "None";
      })(ListSelectionMode || (ListSelectionMode = exports('ListSelectionMode', {})));
      var OverflowType;
      (function (OverflowType) {
        OverflowType[OverflowType["Visible"] = 0] = "Visible";
        OverflowType[OverflowType["Hidden"] = 1] = "Hidden";
        OverflowType[OverflowType["Scroll"] = 2] = "Scroll";
      })(OverflowType || (OverflowType = exports('OverflowType', {})));
      var PackageItemType;
      (function (PackageItemType) {
        PackageItemType[PackageItemType["Image"] = 0] = "Image";
        PackageItemType[PackageItemType["MovieClip"] = 1] = "MovieClip";
        PackageItemType[PackageItemType["Sound"] = 2] = "Sound";
        PackageItemType[PackageItemType["Component"] = 3] = "Component";
        PackageItemType[PackageItemType["Atlas"] = 4] = "Atlas";
        PackageItemType[PackageItemType["Font"] = 5] = "Font";
        PackageItemType[PackageItemType["Swf"] = 6] = "Swf";
        PackageItemType[PackageItemType["Misc"] = 7] = "Misc";
        PackageItemType[PackageItemType["Unknown"] = 8] = "Unknown";
        PackageItemType[PackageItemType["Spine"] = 9] = "Spine";
        PackageItemType[PackageItemType["DragonBones"] = 10] = "DragonBones";
      })(PackageItemType || (PackageItemType = exports('PackageItemType', {})));
      var ObjectType;
      (function (ObjectType) {
        ObjectType[ObjectType["Image"] = 0] = "Image";
        ObjectType[ObjectType["MovieClip"] = 1] = "MovieClip";
        ObjectType[ObjectType["Swf"] = 2] = "Swf";
        ObjectType[ObjectType["Graph"] = 3] = "Graph";
        ObjectType[ObjectType["Loader"] = 4] = "Loader";
        ObjectType[ObjectType["Group"] = 5] = "Group";
        ObjectType[ObjectType["Text"] = 6] = "Text";
        ObjectType[ObjectType["RichText"] = 7] = "RichText";
        ObjectType[ObjectType["InputText"] = 8] = "InputText";
        ObjectType[ObjectType["Component"] = 9] = "Component";
        ObjectType[ObjectType["List"] = 10] = "List";
        ObjectType[ObjectType["Label"] = 11] = "Label";
        ObjectType[ObjectType["Button"] = 12] = "Button";
        ObjectType[ObjectType["ComboBox"] = 13] = "ComboBox";
        ObjectType[ObjectType["ProgressBar"] = 14] = "ProgressBar";
        ObjectType[ObjectType["Slider"] = 15] = "Slider";
        ObjectType[ObjectType["ScrollBar"] = 16] = "ScrollBar";
        ObjectType[ObjectType["Tree"] = 17] = "Tree";
        ObjectType[ObjectType["Loader3D"] = 18] = "Loader3D";
      })(ObjectType || (ObjectType = exports('ObjectType', {})));
      var ProgressTitleType;
      (function (ProgressTitleType) {
        ProgressTitleType[ProgressTitleType["Percent"] = 0] = "Percent";
        ProgressTitleType[ProgressTitleType["ValueAndMax"] = 1] = "ValueAndMax";
        ProgressTitleType[ProgressTitleType["Value"] = 2] = "Value";
        ProgressTitleType[ProgressTitleType["Max"] = 3] = "Max";
      })(ProgressTitleType || (ProgressTitleType = exports('ProgressTitleType', {})));
      var ScrollBarDisplayType;
      (function (ScrollBarDisplayType) {
        ScrollBarDisplayType[ScrollBarDisplayType["Default"] = 0] = "Default";
        ScrollBarDisplayType[ScrollBarDisplayType["Visible"] = 1] = "Visible";
        ScrollBarDisplayType[ScrollBarDisplayType["Auto"] = 2] = "Auto";
        ScrollBarDisplayType[ScrollBarDisplayType["Hidden"] = 3] = "Hidden";
      })(ScrollBarDisplayType || (ScrollBarDisplayType = exports('ScrollBarDisplayType', {})));
      var ScrollType;
      (function (ScrollType) {
        ScrollType[ScrollType["Horizontal"] = 0] = "Horizontal";
        ScrollType[ScrollType["Vertical"] = 1] = "Vertical";
        ScrollType[ScrollType["Both"] = 2] = "Both";
      })(ScrollType || (ScrollType = exports('ScrollType', {})));
      var FlipType;
      (function (FlipType) {
        FlipType[FlipType["None"] = 0] = "None";
        FlipType[FlipType["Horizontal"] = 1] = "Horizontal";
        FlipType[FlipType["Vertical"] = 2] = "Vertical";
        FlipType[FlipType["Both"] = 3] = "Both";
      })(FlipType || (FlipType = exports('FlipType', {})));
      var ChildrenRenderOrder;
      (function (ChildrenRenderOrder) {
        ChildrenRenderOrder[ChildrenRenderOrder["Ascent"] = 0] = "Ascent";
        ChildrenRenderOrder[ChildrenRenderOrder["Descent"] = 1] = "Descent";
        ChildrenRenderOrder[ChildrenRenderOrder["Arch"] = 2] = "Arch";
      })(ChildrenRenderOrder || (ChildrenRenderOrder = exports('ChildrenRenderOrder', {})));
      var GroupLayoutType;
      (function (GroupLayoutType) {
        GroupLayoutType[GroupLayoutType["None"] = 0] = "None";
        GroupLayoutType[GroupLayoutType["Horizontal"] = 1] = "Horizontal";
        GroupLayoutType[GroupLayoutType["Vertical"] = 2] = "Vertical";
      })(GroupLayoutType || (GroupLayoutType = exports('GroupLayoutType', {})));
      var PopupDirection;
      (function (PopupDirection) {
        PopupDirection[PopupDirection["Auto"] = 0] = "Auto";
        PopupDirection[PopupDirection["Up"] = 1] = "Up";
        PopupDirection[PopupDirection["Down"] = 2] = "Down";
      })(PopupDirection || (PopupDirection = exports('PopupDirection', {})));
      var RelationType;
      (function (RelationType) {
        RelationType[RelationType["Left_Left"] = 0] = "Left_Left";
        RelationType[RelationType["Left_Center"] = 1] = "Left_Center";
        RelationType[RelationType["Left_Right"] = 2] = "Left_Right";
        RelationType[RelationType["Center_Center"] = 3] = "Center_Center";
        RelationType[RelationType["Right_Left"] = 4] = "Right_Left";
        RelationType[RelationType["Right_Center"] = 5] = "Right_Center";
        RelationType[RelationType["Right_Right"] = 6] = "Right_Right";
        RelationType[RelationType["Top_Top"] = 7] = "Top_Top";
        RelationType[RelationType["Top_Middle"] = 8] = "Top_Middle";
        RelationType[RelationType["Top_Bottom"] = 9] = "Top_Bottom";
        RelationType[RelationType["Middle_Middle"] = 10] = "Middle_Middle";
        RelationType[RelationType["Bottom_Top"] = 11] = "Bottom_Top";
        RelationType[RelationType["Bottom_Middle"] = 12] = "Bottom_Middle";
        RelationType[RelationType["Bottom_Bottom"] = 13] = "Bottom_Bottom";
        RelationType[RelationType["Width"] = 14] = "Width";
        RelationType[RelationType["Height"] = 15] = "Height";
        RelationType[RelationType["LeftExt_Left"] = 16] = "LeftExt_Left";
        RelationType[RelationType["LeftExt_Right"] = 17] = "LeftExt_Right";
        RelationType[RelationType["RightExt_Left"] = 18] = "RightExt_Left";
        RelationType[RelationType["RightExt_Right"] = 19] = "RightExt_Right";
        RelationType[RelationType["TopExt_Top"] = 20] = "TopExt_Top";
        RelationType[RelationType["TopExt_Bottom"] = 21] = "TopExt_Bottom";
        RelationType[RelationType["BottomExt_Top"] = 22] = "BottomExt_Top";
        RelationType[RelationType["BottomExt_Bottom"] = 23] = "BottomExt_Bottom";
        RelationType[RelationType["Size"] = 24] = "Size";
      })(RelationType || (RelationType = exports('RelationType', {})));
      var FillMethod;
      (function (FillMethod) {
        FillMethod[FillMethod["None"] = 0] = "None";
        FillMethod[FillMethod["Horizontal"] = 1] = "Horizontal";
        FillMethod[FillMethod["Vertical"] = 2] = "Vertical";
        FillMethod[FillMethod["Radial90"] = 3] = "Radial90";
        FillMethod[FillMethod["Radial180"] = 4] = "Radial180";
        FillMethod[FillMethod["Radial360"] = 5] = "Radial360";
      })(FillMethod || (FillMethod = exports('FillMethod', {})));
      var FillOrigin;
      (function (FillOrigin) {
        FillOrigin[FillOrigin["Top"] = 0] = "Top";
        FillOrigin[FillOrigin["Bottom"] = 1] = "Bottom";
        FillOrigin[FillOrigin["Left"] = 2] = "Left";
        FillOrigin[FillOrigin["Right"] = 3] = "Right";
      })(FillOrigin || (FillOrigin = exports('FillOrigin', {})));
      var ObjectPropID;
      (function (ObjectPropID) {
        ObjectPropID[ObjectPropID["Text"] = 0] = "Text";
        ObjectPropID[ObjectPropID["Icon"] = 1] = "Icon";
        ObjectPropID[ObjectPropID["Color"] = 2] = "Color";
        ObjectPropID[ObjectPropID["OutlineColor"] = 3] = "OutlineColor";
        ObjectPropID[ObjectPropID["Playing"] = 4] = "Playing";
        ObjectPropID[ObjectPropID["Frame"] = 5] = "Frame";
        ObjectPropID[ObjectPropID["DeltaTime"] = 6] = "DeltaTime";
        ObjectPropID[ObjectPropID["TimeScale"] = 7] = "TimeScale";
        ObjectPropID[ObjectPropID["FontSize"] = 8] = "FontSize";
        ObjectPropID[ObjectPropID["Selected"] = 9] = "Selected";
      })(ObjectPropID || (ObjectPropID = exports('ObjectPropID', {})));
      var BlendMode;
      (function (BlendMode) {
        BlendMode[BlendMode["Normal"] = 0] = "Normal";
        BlendMode[BlendMode["None"] = 1] = "None";
        BlendMode[BlendMode["Add"] = 2] = "Add";
        BlendMode[BlendMode["Multiply"] = 3] = "Multiply";
        BlendMode[BlendMode["Screen"] = 4] = "Screen";
        BlendMode[BlendMode["Erase"] = 5] = "Erase";
        BlendMode[BlendMode["Mask"] = 6] = "Mask";
        BlendMode[BlendMode["Below"] = 7] = "Below";
        BlendMode[BlendMode["Off"] = 8] = "Off";
        BlendMode[BlendMode["Custom1"] = 9] = "Custom1";
        BlendMode[BlendMode["Custom2"] = 10] = "Custom2";
        BlendMode[BlendMode["Custom3"] = 11] = "Custom3";
      })(BlendMode || (BlendMode = exports('BlendMode', {})));
      var BlendModeUtils = /*#__PURE__*/function () {
        function BlendModeUtils() {}
        BlendModeUtils.apply = function apply(node, blendMode) {
          var f = factors[blendMode];
          var renderers = node.getComponentsInChildren(UIRenderer);
          renderers.forEach(function (element) {
            element.srcBlendFactor = f[0];
            element.dstBlendFactor = f[1];
          });
        };
        BlendModeUtils.override = function override(blendMode, srcFactor, dstFactor) {
          factors[blendMode][0] = srcFactor;
          factors[blendMode][1] = dstFactor;
        };
        return BlendModeUtils;
      }();
      var factors = [[gfx.BlendFactor.SRC_ALPHA, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA],
      //normal
      [gfx.BlendFactor.ONE, gfx.BlendFactor.ONE],
      //none
      [gfx.BlendFactor.SRC_ALPHA, gfx.BlendFactor.ONE],
      //add
      [gfx.BlendFactor.DST_COLOR, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA],
      //mul
      [gfx.BlendFactor.ONE, gfx.BlendFactor.ONE_MINUS_SRC_COLOR],
      //screen
      [gfx.BlendFactor.ZERO, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA],
      //erase
      [gfx.BlendFactor.ZERO, gfx.BlendFactor.SRC_ALPHA],
      //mask
      [gfx.BlendFactor.ONE_MINUS_DST_ALPHA, gfx.BlendFactor.DST_ALPHA],
      //below
      [gfx.BlendFactor.ONE, gfx.BlendFactor.ZERO],
      //off
      [gfx.BlendFactor.SRC_ALPHA, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA],
      //custom1
      [gfx.BlendFactor.SRC_ALPHA, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA],
      //custom2
      [gfx.BlendFactor.SRC_ALPHA, gfx.BlendFactor.ONE_MINUS_SRC_ALPHA] //custom2
      ];
      var Event = exports('Event', /*#__PURE__*/function (_Event$) {
        _inheritsLoose(Event, _Event$);
        function Event(type, bubbles) {
          var _this;
          _this = _Event$.call(this, type, bubbles) || this;
          _this.pos = new Vec2();
          _this.touchId = 0;
          _this.clickCount = 0;
          _this.button = 0;
          _this.keyModifiers = 0;
          _this.mouseWheelDelta = 0;
          return _this;
        }
        var _proto = Event.prototype;
        _proto.captureTouch = function captureTouch() {
          var obj = GObject.cast(this.currentTarget);
          if (obj) this._processor.addTouchMonitor(this.touchId, obj);
        };
        _createClass(Event, [{
          key: "sender",
          get: function get() {
            return GObject.cast(this.currentTarget);
          }
        }, {
          key: "isShiftDown",
          get: function get() {
            return false;
          }
        }, {
          key: "isCtrlDown",
          get: function get() {
            return false;
          }
        }]);
        return Event;
      }(Event$1));
      Event.TOUCH_BEGIN = "fui_touch_begin";
      Event.TOUCH_MOVE = "fui_touch_move";
      Event.TOUCH_END = "fui_touch_end";
      Event.CLICK = "fui_click";
      Event.ROLL_OVER = "fui_roll_over";
      Event.ROLL_OUT = "fui_roll_out";
      Event.MOUSE_WHEEL = "fui_mouse_wheel";
      Event.DISPLAY = "fui_display";
      Event.UNDISPLAY = "fui_undisplay";
      Event.GEAR_STOP = "fui_gear_stop";
      Event.LINK = "fui_text_link";
      Event.Submit = "editing-return";
      Event.TEXT_CHANGE = "text-changed";
      Event.STATUS_CHANGED = "fui_status_changed";
      Event.XY_CHANGED = "fui_xy_changed";
      Event.SIZE_CHANGED = "fui_size_changed";
      Event.SIZE_DELAY_CHANGE = "fui_size_delay_change";
      Event.DRAG_START = "fui_drag_start";
      Event.DRAG_MOVE = "fui_drag_move";
      Event.DRAG_END = "fui_drag_end";
      Event.DROP = "fui_drop";
      Event.SCROLL = "fui_scroll";
      Event.SCROLL_END = "fui_scroll_end";
      Event.PULL_DOWN_RELEASE = "fui_pull_down_release";
      Event.PULL_UP_RELEASE = "fui_pull_up_release";
      Event.CLICK_ITEM = "fui_click_item";
      var eventPool = new Array();
      function borrowEvent(type, bubbles) {
        var evt;
        if (eventPool.length) {
          evt = eventPool.pop();
          evt.type = type;
          evt.bubbles = bubbles;
        } else {
          evt = new Event(type, bubbles);
        }
        return evt;
      }
      function returnEvent(evt) {
        evt.initiator = null;
        evt.unuse();
        eventPool.push(evt);
      }
      var EaseType;
      (function (EaseType) {
        EaseType[EaseType["Linear"] = 0] = "Linear";
        EaseType[EaseType["SineIn"] = 1] = "SineIn";
        EaseType[EaseType["SineOut"] = 2] = "SineOut";
        EaseType[EaseType["SineInOut"] = 3] = "SineInOut";
        EaseType[EaseType["QuadIn"] = 4] = "QuadIn";
        EaseType[EaseType["QuadOut"] = 5] = "QuadOut";
        EaseType[EaseType["QuadInOut"] = 6] = "QuadInOut";
        EaseType[EaseType["CubicIn"] = 7] = "CubicIn";
        EaseType[EaseType["CubicOut"] = 8] = "CubicOut";
        EaseType[EaseType["CubicInOut"] = 9] = "CubicInOut";
        EaseType[EaseType["QuartIn"] = 10] = "QuartIn";
        EaseType[EaseType["QuartOut"] = 11] = "QuartOut";
        EaseType[EaseType["QuartInOut"] = 12] = "QuartInOut";
        EaseType[EaseType["QuintIn"] = 13] = "QuintIn";
        EaseType[EaseType["QuintOut"] = 14] = "QuintOut";
        EaseType[EaseType["QuintInOut"] = 15] = "QuintInOut";
        EaseType[EaseType["ExpoIn"] = 16] = "ExpoIn";
        EaseType[EaseType["ExpoOut"] = 17] = "ExpoOut";
        EaseType[EaseType["ExpoInOut"] = 18] = "ExpoInOut";
        EaseType[EaseType["CircIn"] = 19] = "CircIn";
        EaseType[EaseType["CircOut"] = 20] = "CircOut";
        EaseType[EaseType["CircInOut"] = 21] = "CircInOut";
        EaseType[EaseType["ElasticIn"] = 22] = "ElasticIn";
        EaseType[EaseType["ElasticOut"] = 23] = "ElasticOut";
        EaseType[EaseType["ElasticInOut"] = 24] = "ElasticInOut";
        EaseType[EaseType["BackIn"] = 25] = "BackIn";
        EaseType[EaseType["BackOut"] = 26] = "BackOut";
        EaseType[EaseType["BackInOut"] = 27] = "BackInOut";
        EaseType[EaseType["BounceIn"] = 28] = "BounceIn";
        EaseType[EaseType["BounceOut"] = 29] = "BounceOut";
        EaseType[EaseType["BounceInOut"] = 30] = "BounceInOut";
        EaseType[EaseType["Custom"] = 31] = "Custom";
      })(EaseType || (EaseType = exports('EaseType', {})));
      var GearBase = exports('GearBase', /*#__PURE__*/function () {
        function GearBase() {}
        var _proto2 = GearBase.prototype;
        _proto2.dispose = function dispose() {
          if (this._tweenConfig && this._tweenConfig._tweener) {
            this._tweenConfig._tweener.kill();
            this._tweenConfig._tweener = null;
          }
        };
        _proto2.setup = function setup(buffer) {
          this._controller = this._owner.parent.getControllerAt(buffer.readShort());
          this.init();
          var i;
          var page;
          var cnt = buffer.readShort();
          if ("pages" in this) {
            this.pages = buffer.readSArray(cnt);
          } else {
            for (i = 0; i < cnt; i++) {
              page = buffer.readS();
              if (page == null) continue;
              this.addStatus(page, buffer);
            }
            if (buffer.readBool()) this.addStatus(null, buffer);
          }
          if (buffer.readBool()) {
            this._tweenConfig = new GearTweenConfig();
            this._tweenConfig.easeType = buffer.readByte();
            this._tweenConfig.duration = buffer.readFloat();
            this._tweenConfig.delay = buffer.readFloat();
          }
          if (buffer.version >= 2) {
            if ("positionsInPercent" in this) {
              if (buffer.readBool()) {
                this.positionsInPercent = true;
                for (i = 0; i < cnt; i++) {
                  page = buffer.readS();
                  if (page == null) continue;
                  this.addExtStatus(page, buffer);
                }
                if (buffer.readBool()) this.addExtStatus(null, buffer);
              }
            } else if ("condition" in this) this.condition = buffer.readByte();
          }
        };
        _proto2.updateFromRelations = function updateFromRelations(dx, dy) {};
        _proto2.addStatus = function addStatus(pageId, buffer) {};
        _proto2.init = function init() {};
        _proto2.apply = function apply() {};
        _proto2.updateState = function updateState() {};
        _createClass(GearBase, [{
          key: "controller",
          get: function get() {
            return this._controller;
          },
          set: function set(val) {
            if (val != this._controller) {
              this._controller = val;
              if (this._controller) this.init();
            }
          }
        }, {
          key: "tweenConfig",
          get: function get() {
            if (!this._tweenConfig) this._tweenConfig = new GearTweenConfig();
            return this._tweenConfig;
          }
        }, {
          key: "allowTween",
          get: function get() {
            return this._tweenConfig && this._tweenConfig.tween && constructingDepth.n == 0 && !GearBase.disableAllTweenEffect;
          }
        }]);
        return GearBase;
      }());
      var GearTweenConfig = function GearTweenConfig() {
        this.tween = true;
        this.easeType = EaseType.QuadOut;
        this.duration = 0.3;
        this.delay = 0;
      };
      var GearAnimation = exports('GearAnimation', /*#__PURE__*/function (_GearBase) {
        _inheritsLoose(GearAnimation, _GearBase);
        function GearAnimation() {
          return _GearBase.apply(this, arguments) || this;
        }
        var _proto3 = GearAnimation.prototype;
        _proto3.init = function init() {
          this._default = {
            playing: this._owner.getProp(ObjectPropID.Playing),
            frame: this._owner.getProp(ObjectPropID.Frame)
          };
          this._storage = {};
        };
        _proto3.addStatus = function addStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else {
            gv = {};
            this._storage[pageId] = gv;
          }
          gv.playing = buffer.readBool();
          gv.frame = buffer.readInt();
        };
        _proto3.apply = function apply() {
          this._owner._gearLocked = true;
          var gv = this._storage[this._controller.selectedPageId] || this._default;
          this._owner.setProp(ObjectPropID.Playing, gv.playing);
          this._owner.setProp(ObjectPropID.Frame, gv.frame);
          this._owner._gearLocked = false;
        };
        _proto3.updateState = function updateState() {
          var gv = this._storage[this._controller.selectedPageId];
          if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
          }
          gv.playing = this._owner.getProp(ObjectPropID.Playing);
          gv.frame = this._owner.getProp(ObjectPropID.Frame);
        };
        return GearAnimation;
      }(GearBase));
      var GearColor = exports('GearColor', /*#__PURE__*/function (_GearBase2) {
        _inheritsLoose(GearColor, _GearBase2);
        function GearColor() {
          return _GearBase2.apply(this, arguments) || this;
        }
        var _proto4 = GearColor.prototype;
        _proto4.init = function init() {
          this._default = {
            color: this._owner.getProp(ObjectPropID.Color),
            strokeColor: this._owner.getProp(ObjectPropID.OutlineColor)
          };
          this._storage = {};
        };
        _proto4.addStatus = function addStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else {
            gv = {};
            this._storage[pageId] = gv;
          }
          gv.color = buffer.readColor();
          gv.strokeColor = buffer.readColor();
        };
        _proto4.apply = function apply() {
          this._owner._gearLocked = true;
          var gv = this._storage[this._controller.selectedPageId] || this._default;
          this._owner.setProp(ObjectPropID.Color, gv.color);
          this._owner.setProp(ObjectPropID.OutlineColor, gv.strokeColor);
          this._owner._gearLocked = false;
        };
        _proto4.updateState = function updateState() {
          var gv = this._storage[this._controller.selectedPageId];
          if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
          }
          gv.color = this._owner.getProp(ObjectPropID.Color);
          gv.strokeColor = this._owner.getProp(ObjectPropID.OutlineColor);
        };
        return GearColor;
      }(GearBase));
      var GearDisplay = exports('GearDisplay', /*#__PURE__*/function (_GearBase3) {
        _inheritsLoose(GearDisplay, _GearBase3);
        function GearDisplay() {
          var _this2;
          _this2 = _GearBase3.apply(this, arguments) || this;
          _this2.pages = null;
          _this2._visible = 0;
          _this2._displayLockToken = 1;
          return _this2;
        }
        var _proto5 = GearDisplay.prototype;
        _proto5.init = function init() {
          this.pages = null;
        };
        _proto5.addLock = function addLock() {
          this._visible++;
          return this._displayLockToken;
        };
        _proto5.releaseLock = function releaseLock(token) {
          if (token == this._displayLockToken) this._visible--;
        };
        _proto5.apply = function apply() {
          this._displayLockToken++;
          if (this._displayLockToken <= 0) this._displayLockToken = 1;
          if (this.pages == null || this.pages.length == 0 || this.pages.indexOf(this._controller.selectedPageId) != -1) this._visible = 1;else this._visible = 0;
        };
        _createClass(GearDisplay, [{
          key: "connected",
          get: function get() {
            return this._controller == null || this._visible > 0;
          }
        }]);
        return GearDisplay;
      }(GearBase));
      var GearDisplay2 = exports('GearDisplay2', /*#__PURE__*/function (_GearBase4) {
        _inheritsLoose(GearDisplay2, _GearBase4);
        function GearDisplay2() {
          var _this3;
          _this3 = _GearBase4.apply(this, arguments) || this;
          _this3.pages = null;
          _this3.condition = 0;
          _this3._visible = 0;
          return _this3;
        }
        var _proto6 = GearDisplay2.prototype;
        _proto6.init = function init() {
          this.pages = null;
        };
        _proto6.apply = function apply() {
          if (this.pages == null || this.pages.length == 0 || this.pages.indexOf(this._controller.selectedPageId) != -1) this._visible = 1;else this._visible = 0;
        };
        _proto6.evaluate = function evaluate(connected) {
          var v = this._controller == null || this._visible > 0;
          if (this.condition == 0) v = v && connected;else v = v || connected;
          return v;
        };
        return GearDisplay2;
      }(GearBase));
      var GearFontSize = exports('GearFontSize', /*#__PURE__*/function (_GearBase5) {
        _inheritsLoose(GearFontSize, _GearBase5);
        function GearFontSize() {
          var _this4;
          _this4 = _GearBase5.apply(this, arguments) || this;
          _this4._default = 0;
          return _this4;
        }
        var _proto7 = GearFontSize.prototype;
        _proto7.init = function init() {
          this._default = this._owner.getProp(ObjectPropID.FontSize);
          this._storage = {};
        };
        _proto7.addStatus = function addStatus(pageId, buffer) {
          if (!pageId) this._default = buffer.readInt();else this._storage[pageId] = buffer.readInt();
        };
        _proto7.apply = function apply() {
          this._owner._gearLocked = true;
          var data = this._storage[this._controller.selectedPageId];
          if (data !== undefined) this._owner.setProp(ObjectPropID.FontSize, data);else this._owner.setProp(ObjectPropID.FontSize, this._default);
          this._owner._gearLocked = false;
        };
        _proto7.updateState = function updateState() {
          this._storage[this._controller.selectedPageId] = this._owner.getProp(ObjectPropID.FontSize);
        };
        return GearFontSize;
      }(GearBase));
      var GearIcon = exports('GearIcon', /*#__PURE__*/function (_GearBase6) {
        _inheritsLoose(GearIcon, _GearBase6);
        function GearIcon() {
          return _GearBase6.apply(this, arguments) || this;
        }
        var _proto8 = GearIcon.prototype;
        _proto8.init = function init() {
          this._default = this._owner.icon;
          this._storage = {};
        };
        _proto8.addStatus = function addStatus(pageId, buffer) {
          if (!pageId) this._default = buffer.readS();else this._storage[pageId] = buffer.readS();
        };
        _proto8.apply = function apply() {
          this._owner._gearLocked = true;
          var data = this._storage[this._controller.selectedPageId];
          if (data !== undefined) this._owner.icon = data;else this._owner.icon = this._default;
          this._owner._gearLocked = false;
        };
        _proto8.updateState = function updateState() {
          this._storage[this._controller.selectedPageId] = this._owner.icon;
        };
        return GearIcon;
      }(GearBase));
      var Pool = /*#__PURE__*/function () {
        function Pool(type, init, reset) {
          this.pool = [];
          this._init = init;
          this._reset = reset;
          this._ct = type;
        }
        var _proto9 = Pool.prototype;
        _proto9.borrow = function borrow() {
          var ret;
          if (this.pool.length > 0) ret = this.pool.pop();else ret = new this._ct();
          for (var _len = arguments.length, argArray = new Array(_len), _key = 0; _key < _len; _key++) {
            argArray[_key] = arguments[_key];
          }
          if (this._init) this._init.apply(this, [ret].concat(argArray));
          return ret;
        };
        _proto9.returns = function returns(element) {
          if (Array.isArray(element)) {
            var count = element.length;
            for (var i = 0; i < count; i++) {
              var element2 = element[i];
              if (this._reset) this._reset(element2);
              this.pool.push(element2);
            }
            element.length = 0;
          } else {
            if (this._reset) this._reset(element);
            this.pool.push(element);
          }
        };
        return Pool;
      }(); // Author: Daniele Giardini - http://www.demigiant.com
      // Created: 2014/07/19 14:11
      // 
      // License Copyright (c) Daniele Giardini.
      // This work is subject to the terms at http://dotween.demigiant.com/license.php
      // 
      // =============================================================
      // Contains Daniele Giardini's C# port of the easing equations created by Robert Penner
      // (all easing equations except for Flash, InFlash, OutFlash, InOutFlash,
      // which use some parts of Robert Penner's equations but were created by Daniele Giardini)
      // http://robertpenner.com/easing, see license below:
      // =============================================================
      //
      // TERMS OF USE - EASING EQUATIONS
      //
      // Open source under the BSD License.
      //
      // Copyright ? 2001 Robert Penner
      // All rights reserved.
      //
      // Redistribution and use in source and binary forms, with or without modification,
      // are permitted provided that the following conditions are met:
      //
      // - Redistributions of source code must retain the above copyright notice,
      // this list of conditions and the following disclaimer.
      // - Redistributions in binary form must reproduce the above copyright notice,
      // this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      // - Neither the name of the author nor the names of contributors may be used to endorse
      // or promote products derived} from this software without specific prior written permission.
      // - THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      // AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
      // THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
      // IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
      // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
      // LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
      // STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      // EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      var _PiOver2 = Math.PI * 0.5;
      var _TwoPi = Math.PI * 2;
      function evaluateEase(easeType, time, duration, overshootOrAmplitude, period) {
        switch (easeType) {
          case EaseType.Linear:
            return time / duration;
          case EaseType.SineIn:
            return -Math.cos(time / duration * _PiOver2) + 1;
          case EaseType.SineOut:
            return Math.sin(time / duration * _PiOver2);
          case EaseType.SineInOut:
            return -0.5 * (Math.cos(Math.PI * time / duration) - 1);
          case EaseType.QuadIn:
            return (time /= duration) * time;
          case EaseType.QuadOut:
            return -(time /= duration) * (time - 2);
          case EaseType.QuadInOut:
            if ((time /= duration * 0.5) < 1) return 0.5 * time * time;
            return -0.5 * (--time * (time - 2) - 1);
          case EaseType.CubicIn:
            return (time /= duration) * time * time;
          case EaseType.CubicOut:
            return (time = time / duration - 1) * time * time + 1;
          case EaseType.CubicInOut:
            if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time;
            return 0.5 * ((time -= 2) * time * time + 2);
          case EaseType.QuartIn:
            return (time /= duration) * time * time * time;
          case EaseType.QuartOut:
            return -((time = time / duration - 1) * time * time * time - 1);
          case EaseType.QuartInOut:
            if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time;
            return -0.5 * ((time -= 2) * time * time * time - 2);
          case EaseType.QuintIn:
            return (time /= duration) * time * time * time * time;
          case EaseType.QuintOut:
            return (time = time / duration - 1) * time * time * time * time + 1;
          case EaseType.QuintInOut:
            if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time * time;
            return 0.5 * ((time -= 2) * time * time * time * time + 2);
          case EaseType.ExpoIn:
            return time == 0 ? 0 : Math.pow(2, 10 * (time / duration - 1));
          case EaseType.ExpoOut:
            if (time == duration) return 1;
            return -Math.pow(2, -10 * time / duration) + 1;
          case EaseType.ExpoInOut:
            if (time == 0) return 0;
            if (time == duration) return 1;
            if ((time /= duration * 0.5) < 1) return 0.5 * Math.pow(2, 10 * (time - 1));
            return 0.5 * (-Math.pow(2, -10 * --time) + 2);
          case EaseType.CircIn:
            return -(Math.sqrt(1 - (time /= duration) * time) - 1);
          case EaseType.CircOut:
            return Math.sqrt(1 - (time = time / duration - 1) * time);
          case EaseType.CircInOut:
            if ((time /= duration * 0.5) < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
            return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
          case EaseType.ElasticIn:
            var s0;
            if (time == 0) return 0;
            if ((time /= duration) == 1) return 1;
            if (period == 0) period = duration * 0.3;
            if (overshootOrAmplitude < 1) {
              overshootOrAmplitude = 1;
              s0 = period / 4;
            } else s0 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            return -(overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s0) * _TwoPi / period));
          case EaseType.ElasticOut:
            var s1;
            if (time == 0) return 0;
            if ((time /= duration) == 1) return 1;
            if (period == 0) period = duration * 0.3;
            if (overshootOrAmplitude < 1) {
              overshootOrAmplitude = 1;
              s1 = period / 4;
            } else s1 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            return overshootOrAmplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - s1) * _TwoPi / period) + 1;
          case EaseType.ElasticInOut:
            var s;
            if (time == 0) return 0;
            if ((time /= duration * 0.5) == 2) return 1;
            if (period == 0) period = duration * (0.3 * 1.5);
            if (overshootOrAmplitude < 1) {
              overshootOrAmplitude = 1;
              s = period / 4;
            } else s = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            if (time < 1) return -0.5 * (overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period));
            return overshootOrAmplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period) * 0.5 + 1;
          case EaseType.BackIn:
            return (time /= duration) * time * ((overshootOrAmplitude + 1) * time - overshootOrAmplitude);
          case EaseType.BackOut:
            return (time = time / duration - 1) * time * ((overshootOrAmplitude + 1) * time + overshootOrAmplitude) + 1;
          case EaseType.BackInOut:
            if ((time /= duration * 0.5) < 1) return 0.5 * (time * time * (((overshootOrAmplitude *= 1.525) + 1) * time - overshootOrAmplitude));
            return 0.5 * ((time -= 2) * time * (((overshootOrAmplitude *= 1.525) + 1) * time + overshootOrAmplitude) + 2);
          case EaseType.BounceIn:
            return bounce_easeIn(time, duration);
          case EaseType.BounceOut:
            return bounce_easeOut(time, duration);
          case EaseType.BounceInOut:
            return bounce_easeInOut(time, duration);
          default:
            return -(time /= duration) * (time - 2);
        }
      }
      function bounce_easeIn(time, duration) {
        return 1 - bounce_easeOut(duration - time, duration);
      }
      function bounce_easeOut(time, duration) {
        if ((time /= duration) < 1 / 2.75) {
          return 7.5625 * time * time;
        }
        if (time < 2 / 2.75) {
          return 7.5625 * (time -= 1.5 / 2.75) * time + 0.75;
        }
        if (time < 2.5 / 2.75) {
          return 7.5625 * (time -= 2.25 / 2.75) * time + 0.9375;
        }
        return 7.5625 * (time -= 2.625 / 2.75) * time + 0.984375;
      }
      function bounce_easeInOut(time, duration) {
        if (time < duration * 0.5) {
          return bounce_easeIn(time * 2, duration) * 0.5;
        }
        return bounce_easeOut(time * 2 - duration, duration) * 0.5 + 0.5;
      }
      var TweenValue = /*#__PURE__*/function () {
        function TweenValue() {
          this.x = this.y = this.z = this.w = 0;
        }
        var _proto10 = TweenValue.prototype;
        _proto10.getField = function getField(index) {
          switch (index) {
            case 0:
              return this.x;
            case 1:
              return this.y;
            case 2:
              return this.z;
            case 3:
              return this.w;
            default:
              throw new Error("Index out of bounds: " + index);
          }
        };
        _proto10.setField = function setField(index, value) {
          switch (index) {
            case 0:
              this.x = value;
              break;
            case 1:
              this.y = value;
              break;
            case 2:
              this.z = value;
              break;
            case 3:
              this.w = value;
              break;
            default:
              throw new Error("Index out of bounds: " + index);
          }
        };
        _proto10.setZero = function setZero() {
          this.x = this.y = this.z = this.w = 0;
        };
        _createClass(TweenValue, [{
          key: "color",
          get: function get() {
            return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
          },
          set: function set(value) {
            this.x = (value & 0xFF0000) >> 16;
            this.y = (value & 0x00FF00) >> 8;
            this.z = value & 0x0000FF;
            this.w = (value & 0xFF000000) >> 24;
          }
        }]);
        return TweenValue;
      }();
      var s_vec2$5 = new Vec2();
      var GTweener = exports('GTweener', /*#__PURE__*/function () {
        function GTweener() {
          this._delay = 0;
          this._duration = 0;
          this._breakpoint = 0;
          this._easeType = 0;
          this._easeOvershootOrAmplitude = 0;
          this._easePeriod = 0;
          this._repeat = 0;
          this._yoyo = false;
          this._timeScale = 1;
          this._snapping = false;
          this._startValue = new TweenValue();
          this._endValue = new TweenValue();
          this._value = new TweenValue();
          this._deltaValue = new TweenValue();
          this._reset();
        }
        var _proto11 = GTweener.prototype;
        _proto11.setDelay = function setDelay(value) {
          this._delay = value;
          return this;
        };
        _proto11.setDuration = function setDuration(value) {
          this._duration = value;
          return this;
        };
        _proto11.setBreakpoint = function setBreakpoint(value) {
          this._breakpoint = value;
          return this;
        };
        _proto11.setEase = function setEase(value) {
          this._easeType = value;
          return this;
        };
        _proto11.setEasePeriod = function setEasePeriod(value) {
          this._easePeriod = value;
          return this;
        };
        _proto11.setEaseOvershootOrAmplitude = function setEaseOvershootOrAmplitude(value) {
          this._easeOvershootOrAmplitude = value;
          return this;
        };
        _proto11.setRepeat = function setRepeat(repeat, yoyo) {
          this._repeat = repeat;
          this._yoyo = yoyo;
          return this;
        };
        _proto11.setTimeScale = function setTimeScale(value) {
          this._timeScale = value;
          return this;
        };
        _proto11.setSnapping = function setSnapping(value) {
          this._snapping = value;
          return this;
        };
        _proto11.setTarget = function setTarget(value, propType) {
          this._target = value;
          this._propType = propType;
          return this;
        };
        _proto11.setPath = function setPath(value) {
          this._path = value;
          return this;
        };
        _proto11.setUserData = function setUserData(value) {
          this._userData = value;
          return this;
        };
        _proto11.onUpdate = function onUpdate(callback, target) {
          this._onUpdate = callback;
          this._onUpdateCaller = target;
          return this;
        };
        _proto11.onStart = function onStart(callback, target) {
          this._onStart = callback;
          this._onStartCaller = target;
          return this;
        };
        _proto11.onComplete = function onComplete(callback, target) {
          this._onComplete = callback;
          this._onCompleteCaller = target;
          return this;
        };
        _proto11.setPaused = function setPaused(paused) {
          this._paused = paused;
          return this;
        } /**
          * seek position of the tween, in seconds.
          */;
        _proto11.seek = function seek(time) {
          if (this._killed) return;
          this._elapsedTime = time;
          if (this._elapsedTime < this._delay) {
            if (this._started) this._elapsedTime = this._delay;else return;
          }
          this.update();
        };
        _proto11.kill = function kill(complete) {
          if (this._killed) return;
          if (complete) {
            if (this._ended == 0) {
              if (this._breakpoint >= 0) this._elapsedTime = this._delay + this._breakpoint;else if (this._repeat >= 0) this._elapsedTime = this._delay + this._duration * (this._repeat + 1);else this._elapsedTime = this._delay + this._duration * 2;
              this.update();
            }
            this.callCompleteCallback();
          }
          this._killed = true;
        };
        _proto11._to = function _to(start, end, duration) {
          this._valueSize = 1;
          this._startValue.x = start;
          this._endValue.x = end;
          this._value.x = start;
          this._duration = duration;
          return this;
        };
        _proto11._to2 = function _to2(start, start2, end, end2, duration) {
          this._valueSize = 2;
          this._startValue.x = start;
          this._endValue.x = end;
          this._startValue.y = start2;
          this._endValue.y = end2;
          this._value.x = start;
          this._value.y = start2;
          this._duration = duration;
          return this;
        };
        _proto11._to3 = function _to3(start, start2, start3, end, end2, end3, duration) {
          this._valueSize = 3;
          this._startValue.x = start;
          this._endValue.x = end;
          this._startValue.y = start2;
          this._endValue.y = end2;
          this._startValue.z = start3;
          this._endValue.z = end3;
          this._value.x = start;
          this._value.y = start2;
          this._value.z = start3;
          this._duration = duration;
          return this;
        };
        _proto11._to4 = function _to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
          this._valueSize = 4;
          this._startValue.x = start;
          this._endValue.x = end;
          this._startValue.y = start2;
          this._endValue.y = end2;
          this._startValue.z = start3;
          this._endValue.z = end3;
          this._startValue.w = start4;
          this._endValue.w = end4;
          this._value.x = start;
          this._value.y = start2;
          this._value.z = start3;
          this._value.w = start4;
          this._duration = duration;
          return this;
        };
        _proto11._toColor = function _toColor(start, end, duration) {
          this._valueSize = 5;
          this._startValue.color = start;
          this._endValue.color = end;
          this._value.color = start;
          this._duration = duration;
          return this;
        };
        _proto11._shake = function _shake(startX, startY, amplitude, duration) {
          this._valueSize = 6;
          this._startValue.x = startX;
          this._startValue.y = startY;
          this._startValue.w = amplitude;
          this._duration = duration;
          return this;
        };
        _proto11._init = function _init() {
          this._delay = 0;
          this._duration = 0;
          this._breakpoint = -1;
          this._easeType = EaseType.QuadOut;
          this._timeScale = 1;
          this._easePeriod = 0;
          this._easeOvershootOrAmplitude = 1.70158;
          this._snapping = false;
          this._repeat = 0;
          this._yoyo = false;
          this._valueSize = 0;
          this._started = false;
          this._paused = false;
          this._killed = false;
          this._elapsedTime = 0;
          this._normalizedTime = 0;
          this._ended = 0;
        };
        _proto11._reset = function _reset() {
          this._target = null;
          this._propType = null;
          this._userData = null;
          this._path = null;
          this._onStart = this._onUpdate = this._onComplete = null;
          this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
        };
        _proto11._update = function _update(dt) {
          if (this._timeScale != 1) dt *= this._timeScale;
          if (dt == 0) return;
          if (this._ended != 0)
            //Maybe completed by seek
            {
              this.callCompleteCallback();
              this._killed = true;
              return;
            }
          this._elapsedTime += dt;
          this.update();
          if (this._ended != 0) {
            if (!this._killed) {
              this.callCompleteCallback();
              this._killed = true;
            }
          }
        };
        _proto11.update = function update() {
          this._ended = 0;
          if (this._valueSize == 0)
            //DelayedCall
            {
              if (this._elapsedTime >= this._delay + this._duration) this._ended = 1;
              return;
            }
          if (!this._started) {
            if (this._elapsedTime < this._delay) return;
            this._started = true;
            this.callStartCallback();
            if (this._killed) return;
          }
          var reversed = false;
          var tt = this._elapsedTime - this._delay;
          if (this._breakpoint >= 0 && tt >= this._breakpoint) {
            tt = this._breakpoint;
            this._ended = 2;
          }
          if (this._repeat != 0) {
            var round = Math.floor(tt / this._duration);
            tt -= this._duration * round;
            if (this._yoyo) reversed = round % 2 == 1;
            if (this._repeat > 0 && this._repeat - round < 0) {
              if (this._yoyo) reversed = this._repeat % 2 == 1;
              tt = this._duration;
              this._ended = 1;
            }
          } else if (tt >= this._duration) {
            tt = this._duration;
            this._ended = 1;
          }
          this._normalizedTime = evaluateEase(this._easeType, reversed ? this._duration - tt : tt, this._duration, this._easeOvershootOrAmplitude, this._easePeriod);
          this._value.setZero();
          this._deltaValue.setZero();
          if (this._valueSize == 6) {
            if (this._ended == 0) {
              var r = this._startValue.w * (1 - this._normalizedTime);
              var rx = r * (Math.random() > 0.5 ? 1 : -1);
              var ry = r * (Math.random() > 0.5 ? 1 : -1);
              this._deltaValue.x = rx;
              this._deltaValue.y = ry;
              this._value.x = this._startValue.x + rx;
              this._value.y = this._startValue.y + ry;
            } else {
              this._value.x = this._startValue.x;
              this._value.y = this._startValue.y;
            }
          } else if (this._path) {
            var pt = this._path.getPointAt(this._normalizedTime, s_vec2$5);
            if (this._snapping) {
              pt.x = Math.round(pt.x);
              pt.y = Math.round(pt.y);
            }
            this._deltaValue.x = pt.x - this._value.x;
            this._deltaValue.y = pt.y - this._value.y;
            this._value.x = pt.x;
            this._value.y = pt.y;
          } else {
            var cnt = Math.min(this._valueSize, 4);
            for (var i = 0; i < cnt; i++) {
              var n1 = this._startValue.getField(i);
              var n2 = this._endValue.getField(i);
              var f = n1 + (n2 - n1) * this._normalizedTime;
              if (this._snapping) f = Math.round(f);
              this._deltaValue.setField(i, f - this._value.getField(i));
              this._value.setField(i, f);
            }
          }
          if (this._target && this._propType) {
            if (this._propType instanceof Function) {
              switch (this._valueSize) {
                case 1:
                  this._propType.call(this._target, this._value.x);
                  break;
                case 2:
                  this._propType.call(this._target, this._value.x, this._value.y);
                  break;
                case 3:
                  this._propType.call(this._target, this._value.x, this._value.y, this._value.z);
                  break;
                case 4:
                  this._propType.call(this._target, this._value.x, this._value.y, this._value.z, this._value.w);
                  break;
                case 5:
                  this._propType.call(this._target, this._value.color);
                  break;
                case 6:
                  this._propType.call(this._target, this._value.x, this._value.y);
                  break;
              }
            } else {
              if (this._valueSize == 5) this._target[this._propType] = this._value.color;else this._target[this._propType] = this._value.x;
            }
          }
          this.callUpdateCallback();
        };
        _proto11.callStartCallback = function callStartCallback() {
          if (this._onStart) {
            try {
              this._onStart.call(this._onStartCaller, this);
            } catch (err) {
              console.log("error in start callback > " + err);
            }
          }
        };
        _proto11.callUpdateCallback = function callUpdateCallback() {
          if (this._onUpdate) {
            try {
              this._onUpdate.call(this._onUpdateCaller, this);
            } catch (err) {
              console.log("error in update callback > " + err);
            }
          }
        };
        _proto11.callCompleteCallback = function callCompleteCallback() {
          if (this._onComplete) {
            try {
              this._onComplete.call(this._onCompleteCaller, this);
            } catch (err) {
              console.log("error in complete callback > " + err);
            }
          }
        };
        _createClass(GTweener, [{
          key: "delay",
          get: function get() {
            return this._delay;
          }
        }, {
          key: "duration",
          get: function get() {
            return this._duration;
          }
        }, {
          key: "repeat",
          get: function get() {
            return this._repeat;
          }
        }, {
          key: "target",
          get: function get() {
            return this._target;
          }
        }, {
          key: "userData",
          get: function get() {
            return this._userData;
          }
        }, {
          key: "startValue",
          get: function get() {
            return this._startValue;
          }
        }, {
          key: "endValue",
          get: function get() {
            return this._endValue;
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          }
        }, {
          key: "deltaValue",
          get: function get() {
            return this._deltaValue;
          }
        }, {
          key: "normalizedTime",
          get: function get() {
            return this._normalizedTime;
          }
        }, {
          key: "completed",
          get: function get() {
            return this._ended != 0;
          }
        }, {
          key: "allCompleted",
          get: function get() {
            return this._ended == 1;
          }
        }]);
        return GTweener;
      }());
      var TweenManager = /*#__PURE__*/function () {
        function TweenManager() {}
        TweenManager.createTween = function createTween() {
          if (!_root) {
            _root = new Node("[TweenManager]");
            game.addPersistRootNode(_root);
            director.getScheduler().schedule(TweenManager.update, _root, 0, macro.REPEAT_FOREVER, 0, false);
          }
          var tweener = _tweenerPool.borrow();
          _activeTweens[_totalActiveTweens++] = tweener;
          return tweener;
        };
        TweenManager.isTweening = function isTweening(target, propType) {
          if (target == null) return false;
          var anyType = !propType;
          for (var i = 0; i < _totalActiveTweens; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) return true;
          }
          return false;
        };
        TweenManager.killTweens = function killTweens(target, completed, propType) {
          if (target == null) return false;
          var flag = false;
          var cnt = _totalActiveTweens;
          var anyType = !propType;
          for (var i = 0; i < cnt; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) {
              tweener.kill(completed);
              flag = true;
            }
          }
          return flag;
        };
        TweenManager.getTween = function getTween(target, propType) {
          if (target == null) return null;
          var cnt = _totalActiveTweens;
          var anyType = !propType;
          for (var i = 0; i < cnt; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) {
              return tweener;
            }
          }
          return null;
        };
        TweenManager.update = function update(dt) {
          var tweens = _activeTweens;
          var cnt = _totalActiveTweens;
          var freePosStart = -1;
          for (var i = 0; i < cnt; i++) {
            var tweener = tweens[i];
            if (tweener == null) {
              if (freePosStart == -1) freePosStart = i;
            } else if (tweener._killed) {
              tweener._reset();
              _tweenerPool.returns(tweener);
              tweens[i] = null;
              if (freePosStart == -1) freePosStart = i;
            } else {
              if (tweener._target && 'isDisposed' in tweener._target && tweener._target.isDisposed) tweener._killed = true;else if (!tweener._paused) tweener._update(dt);
              if (freePosStart != -1) {
                tweens[freePosStart] = tweener;
                tweens[i] = null;
                freePosStart++;
              }
            }
          }
          if (freePosStart >= 0) {
            if (_totalActiveTweens != cnt)
              //new tweens added
              {
                var j = cnt;
                cnt = _totalActiveTweens - cnt;
                for (i = 0; i < cnt; i++) tweens[freePosStart++] = tweens[j++];
              }
            _totalActiveTweens = freePosStart;
          }
          return false;
        };
        return TweenManager;
      }();
      var _activeTweens = new Array();
      var _tweenerPool = new Pool(GTweener, function (e) {
        return e._init();
      }, function (e) {
        return e._reset();
      });
      var _totalActiveTweens = 0;
      var _root;
      var GTween = exports('GTween', /*#__PURE__*/function () {
        function GTween() {}
        GTween.to = function to(start, end, duration) {
          return TweenManager.createTween()._to(start, end, duration);
        };
        GTween.to2 = function to2(start, start2, end, end2, duration) {
          return TweenManager.createTween()._to2(start, start2, end, end2, duration);
        };
        GTween.to3 = function to3(start, start2, start3, end, end2, end3, duration) {
          return TweenManager.createTween()._to3(start, start2, start3, end, end2, end3, duration);
        };
        GTween.to4 = function to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
          return TweenManager.createTween()._to4(start, start2, start3, start4, end, end2, end3, end4, duration);
        };
        GTween.toColor = function toColor(start, end, duration) {
          return TweenManager.createTween()._toColor(start, end, duration);
        };
        GTween.delayedCall = function delayedCall(delay) {
          return TweenManager.createTween().setDelay(delay);
        };
        GTween.shake = function shake(startX, startY, amplitude, duration) {
          return TweenManager.createTween()._shake(startX, startY, amplitude, duration);
        };
        GTween.isTweening = function isTweening(target, propType) {
          return TweenManager.isTweening(target, propType);
        };
        GTween.kill = function kill(target, complete, propType) {
          TweenManager.killTweens(target, complete, propType);
        };
        GTween.getTween = function getTween(target, propType) {
          return TweenManager.getTween(target, propType);
        };
        return GTween;
      }());
      GTween.catchCallbackExceptions = true;
      var GearLook = exports('GearLook', /*#__PURE__*/function (_GearBase7) {
        _inheritsLoose(GearLook, _GearBase7);
        function GearLook() {
          return _GearBase7.apply(this, arguments) || this;
        }
        var _proto12 = GearLook.prototype;
        _proto12.init = function init() {
          this._default = {
            alpha: this._owner.alpha,
            rotation: this._owner.rotation,
            grayed: this._owner.grayed,
            touchable: this._owner.touchable
          };
          this._storage = {};
        };
        _proto12.addStatus = function addStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else {
            gv = {};
            this._storage[pageId] = gv;
          }
          gv.alpha = buffer.readFloat();
          gv.rotation = buffer.readFloat();
          gv.grayed = buffer.readBool();
          gv.touchable = buffer.readBool();
        };
        _proto12.apply = function apply() {
          var gv = this._storage[this._controller.selectedPageId] || this._default;
          if (this.allowTween) {
            this._owner._gearLocked = true;
            this._owner.grayed = gv.grayed;
            this._owner.touchable = gv.touchable;
            this._owner._gearLocked = false;
            if (this._tweenConfig._tweener) {
              if (this._tweenConfig._tweener.endValue.x != gv.alpha || this._tweenConfig._tweener.endValue.y != gv.rotation) {
                this._tweenConfig._tweener.kill(true);
                this._tweenConfig._tweener = null;
              } else return;
            }
            var a = gv.alpha != this._owner.alpha;
            var b = gv.rotation != this._owner.rotation;
            if (a || b) {
              if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
              this._tweenConfig._tweener = GTween.to2(this._owner.alpha, this._owner.rotation, gv.alpha, gv.rotation, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((a ? 1 : 0) + (b ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
            }
          } else {
            this._owner._gearLocked = true;
            this._owner.grayed = gv.grayed;
            this._owner.alpha = gv.alpha;
            this._owner.rotation = gv.rotation;
            this._owner.touchable = gv.touchable;
            this._owner._gearLocked = false;
          }
        };
        _proto12.__tweenUpdate = function __tweenUpdate(tweener) {
          var flag = tweener.userData;
          this._owner._gearLocked = true;
          if ((flag & 1) != 0) this._owner.alpha = tweener.value.x;
          if ((flag & 2) != 0) this._owner.rotation = tweener.value.y;
          this._owner._gearLocked = false;
        };
        _proto12.__tweenComplete = function __tweenComplete() {
          if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
          }
          this._tweenConfig._tweener = null;
        };
        _proto12.updateState = function updateState() {
          var gv = this._storage[this._controller.selectedPageId];
          if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
          }
          gv.alpha = this._owner.alpha;
          gv.rotation = this._owner.rotation;
          gv.grayed = this._owner.grayed;
          gv.touchable = this._owner.touchable;
        };
        return GearLook;
      }(GearBase));
      var GearSize = exports('GearSize', /*#__PURE__*/function (_GearBase8) {
        _inheritsLoose(GearSize, _GearBase8);
        function GearSize() {
          return _GearBase8.apply(this, arguments) || this;
        }
        var _proto13 = GearSize.prototype;
        _proto13.init = function init() {
          this._default = {
            width: this._owner.width,
            height: this._owner.height,
            scaleX: this._owner.scaleX,
            scaleY: this._owner.scaleY
          };
          this._storage = {};
        };
        _proto13.addStatus = function addStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else {
            gv = {};
            this._storage[pageId] = gv;
          }
          gv.width = buffer.readInt();
          gv.height = buffer.readInt();
          gv.scaleX = buffer.readFloat();
          gv.scaleY = buffer.readFloat();
        };
        _proto13.apply = function apply() {
          var gv = this._storage[this._controller.selectedPageId] || this._default;
          if (this.allowTween) {
            if (this._tweenConfig._tweener) {
              if (this._tweenConfig._tweener.endValue.x != gv.width || this._tweenConfig._tweener.endValue.y != gv.height || this._tweenConfig._tweener.endValue.z != gv.scaleX || this._tweenConfig._tweener.endValue.w != gv.scaleY) {
                this._tweenConfig._tweener.kill(true);
                this._tweenConfig._tweener = null;
              } else return;
            }
            var a = gv.width != this._owner.width || gv.height != this._owner.height;
            var b = gv.scaleX != this._owner.scaleX || gv.scaleY != this._owner.scaleY;
            if (a || b) {
              if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
              this._tweenConfig._tweener = GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, gv.width, gv.height, gv.scaleX, gv.scaleY, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((a ? 1 : 0) + (b ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
            }
          } else {
            this._owner._gearLocked = true;
            this._owner.setSize(gv.width, gv.height, this._owner.checkGearController(1, this._controller));
            this._owner.setScale(gv.scaleX, gv.scaleY);
            this._owner._gearLocked = false;
          }
        };
        _proto13.__tweenUpdate = function __tweenUpdate(tweener) {
          var flag = tweener.userData;
          this._owner._gearLocked = true;
          if ((flag & 1) != 0) this._owner.setSize(tweener.value.x, tweener.value.y, this._owner.checkGearController(1, this._controller));
          if ((flag & 2) != 0) this._owner.setScale(tweener.value.z, tweener.value.w);
          this._owner._gearLocked = false;
        };
        _proto13.__tweenComplete = function __tweenComplete() {
          if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
          }
          this._tweenConfig._tweener = null;
        };
        _proto13.updateState = function updateState() {
          var gv = this._storage[this._controller.selectedPageId];
          if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
          }
          gv.width = this._owner.width;
          gv.height = this._owner.height;
          gv.scaleX = this._owner.scaleX;
          gv.scaleY = this._owner.scaleY;
        };
        _proto13.updateFromRelations = function updateFromRelations(dx, dy) {
          if (this._controller == null || this._storage == null) return;
          for (var key in this._storage) {
            var gv = this._storage[key];
            gv.width += dx;
            gv.height += dy;
          }
          this._default.width += dx;
          this._default.height += dy;
          this.updateState();
        };
        return GearSize;
      }(GearBase));
      var GearText = exports('GearText', /*#__PURE__*/function (_GearBase9) {
        _inheritsLoose(GearText, _GearBase9);
        function GearText() {
          return _GearBase9.apply(this, arguments) || this;
        }
        var _proto14 = GearText.prototype;
        _proto14.init = function init() {
          this._default = this._owner.text;
          this._storage = {};
        };
        _proto14.addStatus = function addStatus(pageId, buffer) {
          if (pageId == null) this._default = buffer.readS();else this._storage[pageId] = buffer.readS();
        };
        _proto14.apply = function apply() {
          this._owner._gearLocked = true;
          var data = this._storage[this._controller.selectedPageId];
          if (data !== undefined) this._owner.text = data;else this._owner.text = this._default;
          this._owner._gearLocked = false;
        };
        _proto14.updateState = function updateState() {
          this._storage[this._controller.selectedPageId] = this._owner.text;
        };
        return GearText;
      }(GearBase));
      var GearXY = exports('GearXY', /*#__PURE__*/function (_GearBase10) {
        _inheritsLoose(GearXY, _GearBase10);
        function GearXY() {
          return _GearBase10.apply(this, arguments) || this;
        }
        var _proto15 = GearXY.prototype;
        _proto15.init = function init() {
          this._default = {
            x: this._owner.x,
            y: this._owner.y,
            px: this._owner.x / this._owner.parent.width,
            py: this._owner.y / this._owner.parent.height
          };
          this._storage = {};
        };
        _proto15.addStatus = function addStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else {
            gv = {};
            this._storage[pageId] = gv;
          }
          gv.x = buffer.readInt();
          gv.y = buffer.readInt();
        };
        _proto15.addExtStatus = function addExtStatus(pageId, buffer) {
          var gv;
          if (!pageId) gv = this._default;else gv = this._storage[pageId];
          gv.px = buffer.readFloat();
          gv.py = buffer.readFloat();
        };
        _proto15.apply = function apply() {
          var pt = this._storage[this._controller.selectedPageId] || this._default;
          var ex;
          var ey;
          if (this.positionsInPercent && this._owner.parent) {
            ex = pt.px * this._owner.parent.width;
            ey = pt.py * this._owner.parent.height;
          } else {
            ex = pt.x;
            ey = pt.y;
          }
          if (this.allowTween) {
            if (this._tweenConfig._tweener) {
              if (this._tweenConfig._tweener.endValue.x != ex || this._tweenConfig._tweener.endValue.y != ey) {
                this._tweenConfig._tweener.kill(true);
                this._tweenConfig._tweener = null;
              } else return;
            }
            var ox = this._owner.x;
            var oy = this._owner.y;
            if (ox != ex || oy != ey) {
              if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
              this._tweenConfig._tweener = GTween.to2(ox, oy, ex, ey, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
            }
          } else {
            this._owner._gearLocked = true;
            this._owner.setPosition(ex, ey);
            this._owner._gearLocked = false;
          }
        };
        _proto15.__tweenUpdate = function __tweenUpdate(tweener) {
          this._owner._gearLocked = true;
          this._owner.setPosition(tweener.value.x, tweener.value.y);
          this._owner._gearLocked = false;
        };
        _proto15.__tweenComplete = function __tweenComplete() {
          if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
          }
          this._tweenConfig._tweener = null;
        };
        _proto15.updateState = function updateState() {
          var pt = this._storage[this._controller.selectedPageId];
          if (!pt) {
            pt = {};
            this._storage[this._controller.selectedPageId] = pt;
          }
          pt.x = this._owner.x;
          pt.y = this._owner.y;
          pt.px = this._owner.x / this._owner.parent.width;
          pt.py = this._owner.y / this._owner.parent.height;
        };
        _proto15.updateFromRelations = function updateFromRelations(dx, dy) {
          if (this._controller == null || this._storage == null || this.positionsInPercent) return;
          for (var key in this._storage) {
            var pt = this._storage[key];
            pt.x += dx;
            pt.y += dy;
          }
          this._default.x += dx;
          this._default.y += dy;
          this.updateState();
        };
        return GearXY;
      }(GearBase));
      var RelationItem = /*#__PURE__*/function () {
        function RelationItem(owner) {
          this._owner = owner;
          this._defs = new Array();
        }
        var _proto16 = RelationItem.prototype;
        _proto16.add = function add(relationType, usePercent) {
          if (relationType == RelationType.Size) {
            this.add(RelationType.Width, usePercent);
            this.add(RelationType.Height, usePercent);
            return;
          }
          var length = this._defs.length;
          for (var i = 0; i < length; i++) {
            var def = this._defs[i];
            if (def.type == relationType) return;
          }
          this.internalAdd(relationType, usePercent);
        };
        _proto16.internalAdd = function internalAdd(relationType, usePercent) {
          if (relationType == RelationType.Size) {
            this.internalAdd(RelationType.Width, usePercent);
            this.internalAdd(RelationType.Height, usePercent);
            return;
          }
          var info = new RelationDef();
          info.percent = usePercent;
          info.type = relationType;
          info.axis = relationType <= RelationType.Right_Right || relationType == RelationType.Width || relationType >= RelationType.LeftExt_Left && relationType <= RelationType.RightExt_Right ? 0 : 1;
          this._defs.push(info);
        };
        _proto16.remove = function remove(relationType) {
          if (relationType == RelationType.Size) {
            this.remove(RelationType.Width);
            this.remove(RelationType.Height);
            return;
          }
          var dc = this._defs.length;
          for (var k = 0; k < dc; k++) {
            if (this._defs[k].type == relationType) {
              this._defs.splice(k, 1);
              break;
            }
          }
        };
        _proto16.copyFrom = function copyFrom(source) {
          this.target = source.target;
          this._defs.length = 0;
          var length = source._defs.length;
          for (var i = 0; i < length; i++) {
            var info = source._defs[i];
            var info2 = new RelationDef();
            info2.copyFrom(info);
            this._defs.push(info2);
          }
        };
        _proto16.dispose = function dispose() {
          if (this._target) {
            this.releaseRefTarget(this._target);
            this._target = null;
          }
        };
        _proto16.applyOnSelfResized = function applyOnSelfResized(dWidth, dHeight, applyPivot) {
          var ox = this._owner.x;
          var oy = this._owner.y;
          var length = this._defs.length;
          for (var i = 0; i < length; i++) {
            var info = this._defs[i];
            switch (info.type) {
              case RelationType.Center_Center:
                this._owner.x -= (0.5 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                break;
              case RelationType.Right_Center:
              case RelationType.Right_Left:
              case RelationType.Right_Right:
                this._owner.x -= (1 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                break;
              case RelationType.Middle_Middle:
                this._owner.y -= (0.5 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                break;
              case RelationType.Bottom_Middle:
              case RelationType.Bottom_Top:
              case RelationType.Bottom_Bottom:
                this._owner.y -= (1 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                break;
            }
          }
          if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent) {
              var len = this._owner.parent._transitions.length;
              if (len > 0) {
                for (var i = 0; i < len; ++i) {
                  this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                }
              }
            }
          }
        };
        _proto16.applyOnXYChanged = function applyOnXYChanged(info, dx, dy) {
          var tmp;
          switch (info.type) {
            case RelationType.Left_Left:
            case RelationType.Left_Center:
            case RelationType.Left_Right:
            case RelationType.Center_Center:
            case RelationType.Right_Left:
            case RelationType.Right_Center:
            case RelationType.Right_Right:
              this._owner.x += dx;
              break;
            case RelationType.Top_Top:
            case RelationType.Top_Middle:
            case RelationType.Top_Bottom:
            case RelationType.Middle_Middle:
            case RelationType.Bottom_Top:
            case RelationType.Bottom_Middle:
            case RelationType.Bottom_Bottom:
              this._owner.y += dy;
              break;
            case RelationType.Width:
            case RelationType.Height:
              break;
            case RelationType.LeftExt_Left:
            case RelationType.LeftExt_Right:
              if (this._owner != this._target.parent) {
                tmp = this._owner.xMin;
                this._owner.width = this._owner._rawWidth - dx;
                this._owner.xMin = tmp + dx;
              } else this._owner.width = this._owner._rawWidth - dx;
              break;
            case RelationType.RightExt_Left:
            case RelationType.RightExt_Right:
              if (this._owner != this._target.parent) {
                tmp = this._owner.xMin;
                this._owner.width = this._owner._rawWidth + dx;
                this._owner.xMin = tmp;
              } else this._owner.width = this._owner._rawWidth + dx;
              break;
            case RelationType.TopExt_Top:
            case RelationType.TopExt_Bottom:
              if (this._owner != this._target.parent) {
                tmp = this._owner.yMin;
                this._owner.height = this._owner._rawHeight - dy;
                this._owner.yMin = tmp + dy;
              } else this._owner.height = this._owner._rawHeight - dy;
              break;
            case RelationType.BottomExt_Top:
            case RelationType.BottomExt_Bottom:
              if (this._owner != this._target.parent) {
                tmp = this._owner.yMin;
                this._owner.height = this._owner._rawHeight + dy;
                this._owner.yMin = tmp;
              } else this._owner.height = this._owner._rawHeight + dy;
              break;
          }
        };
        _proto16.applyOnSizeChanged = function applyOnSizeChanged(info) {
          var pos = 0,
            pivot = 0,
            delta = 0;
          var v, tmp;
          if (info.axis == 0) {
            if (this._target != this._owner.parent) {
              pos = this._target.x;
              if (this._target.pivotAsAnchor) pivot = this._target.pivotX;
            }
            if (info.percent) {
              if (this._targetWidth != 0) delta = this._target._width / this._targetWidth;
            } else delta = this._target._width - this._targetWidth;
          } else {
            if (this._target != this._owner.parent) {
              pos = this._target.y;
              if (this._target.pivotAsAnchor) pivot = this._target.pivotY;
            }
            if (info.percent) {
              if (this._targetHeight != 0) delta = this._target._height / this._targetHeight;
            } else delta = this._target._height - this._targetHeight;
          }
          switch (info.type) {
            case RelationType.Left_Left:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else if (pivot != 0) this._owner.x += delta * -pivot;
              break;
            case RelationType.Left_Center:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else this._owner.x += delta * (0.5 - pivot);
              break;
            case RelationType.Left_Right:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else this._owner.x += delta * (1 - pivot);
              break;
            case RelationType.Center_Center:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth * 0.5 - pos) * delta - this._owner._rawWidth * 0.5;else this._owner.x += delta * (0.5 - pivot);
              break;
            case RelationType.Right_Left:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else if (pivot != 0) this._owner.x += delta * -pivot;
              break;
            case RelationType.Right_Center:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else this._owner.x += delta * (0.5 - pivot);
              break;
            case RelationType.Right_Right:
              if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else this._owner.x += delta * (1 - pivot);
              break;
            case RelationType.Top_Top:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else if (pivot != 0) this._owner.y += delta * -pivot;
              break;
            case RelationType.Top_Middle:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else this._owner.y += delta * (0.5 - pivot);
              break;
            case RelationType.Top_Bottom:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else this._owner.y += delta * (1 - pivot);
              break;
            case RelationType.Middle_Middle:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight * 0.5 - pos) * delta - this._owner._rawHeight * 0.5;else this._owner.y += delta * (0.5 - pivot);
              break;
            case RelationType.Bottom_Top:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else if (pivot != 0) this._owner.y += delta * -pivot;
              break;
            case RelationType.Bottom_Middle:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else this._owner.y += delta * (0.5 - pivot);
              break;
            case RelationType.Bottom_Bottom:
              if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else this._owner.y += delta * (1 - pivot);
              break;
            case RelationType.Width:
              if (this._owner._underConstruct && this._owner == this._target.parent) v = this._owner.sourceWidth - this._target.initWidth;else v = this._owner._rawWidth - this._targetWidth;
              if (info.percent) v = v * delta;
              if (this._target == this._owner.parent) {
                if (this._owner.pivotAsAnchor) {
                  tmp = this._owner.xMin;
                  this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
                  this._owner.xMin = tmp;
                } else this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
              } else this._owner.width = this._target._width + v;
              break;
            case RelationType.Height:
              if (this._owner._underConstruct && this._owner == this._target.parent) v = this._owner.sourceHeight - this._target.initHeight;else v = this._owner._rawHeight - this._targetHeight;
              if (info.percent) v = v * delta;
              if (this._target == this._owner.parent) {
                if (this._owner.pivotAsAnchor) {
                  tmp = this._owner.yMin;
                  this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
                  this._owner.yMin = tmp;
                } else this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
              } else this._owner.height = this._target._height + v;
              break;
            case RelationType.LeftExt_Left:
              tmp = this._owner.xMin;
              if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * -pivot;
              this._owner.width = this._owner._rawWidth - v;
              this._owner.xMin = tmp + v;
              break;
            case RelationType.LeftExt_Right:
              tmp = this._owner.xMin;
              if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * (1 - pivot);
              this._owner.width = this._owner._rawWidth - v;
              this._owner.xMin = tmp + v;
              break;
            case RelationType.RightExt_Left:
              tmp = this._owner.xMin;
              if (info.percent) v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);else v = delta * -pivot;
              this._owner.width = this._owner._rawWidth + v;
              this._owner.xMin = tmp;
              break;
            case RelationType.RightExt_Right:
              tmp = this._owner.xMin;
              if (info.percent) {
                if (this._owner == this._target.parent) {
                  if (this._owner._underConstruct) this._owner.width = pos + this._target._width - this._target._width * pivot + (this._owner.sourceWidth - pos - this._target.initWidth + this._target.initWidth * pivot) * delta;else this._owner.width = pos + (this._owner._rawWidth - pos) * delta;
                } else {
                  v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                  this._owner.width = this._owner._rawWidth + v;
                  this._owner.xMin = tmp;
                }
              } else {
                if (this._owner == this._target.parent) {
                  if (this._owner._underConstruct) this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - pivot);else this._owner.width = this._owner._rawWidth + delta * (1 - pivot);
                } else {
                  v = delta * (1 - pivot);
                  this._owner.width = this._owner._rawWidth + v;
                  this._owner.xMin = tmp;
                }
              }
              break;
            case RelationType.TopExt_Top:
              tmp = this._owner.yMin;
              if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * -pivot;
              this._owner.height = this._owner._rawHeight - v;
              this._owner.yMin = tmp + v;
              break;
            case RelationType.TopExt_Bottom:
              tmp = this._owner.yMin;
              if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * (1 - pivot);
              this._owner.height = this._owner._rawHeight - v;
              this._owner.yMin = tmp + v;
              break;
            case RelationType.BottomExt_Top:
              tmp = this._owner.yMin;
              if (info.percent) v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);else v = delta * -pivot;
              this._owner.height = this._owner._rawHeight + v;
              this._owner.yMin = tmp;
              break;
            case RelationType.BottomExt_Bottom:
              tmp = this._owner.yMin;
              if (info.percent) {
                if (this._owner == this._target.parent) {
                  if (this._owner._underConstruct) this._owner.height = pos + this._target._height - this._target._height * pivot + (this._owner.sourceHeight - pos - this._target.initHeight + this._target.initHeight * pivot) * delta;else this._owner.height = pos + (this._owner._rawHeight - pos) * delta;
                } else {
                  v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                  this._owner.height = this._owner._rawHeight + v;
                  this._owner.yMin = tmp;
                }
              } else {
                if (this._owner == this._target.parent) {
                  if (this._owner._underConstruct) this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - pivot);else this._owner.height = this._owner._rawHeight + delta * (1 - pivot);
                } else {
                  v = delta * (1 - pivot);
                  this._owner.height = this._owner._rawHeight + v;
                  this._owner.yMin = tmp;
                }
              }
              break;
          }
        };
        _proto16.addRefTarget = function addRefTarget(target) {
          if (target != this._owner.parent) target.on(Event.XY_CHANGED, this.__targetXYChanged, this);
          target.on(Event.SIZE_CHANGED, this.__targetSizeChanged, this);
          target.on(Event.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this);
          this._targetX = this._target.x;
          this._targetY = this._target.y;
          this._targetWidth = this._target._width;
          this._targetHeight = this._target._height;
        };
        _proto16.releaseRefTarget = function releaseRefTarget(target) {
          if (!target.node) return;
          target.off(Event.XY_CHANGED, this.__targetXYChanged, this);
          target.off(Event.SIZE_CHANGED, this.__targetSizeChanged, this);
          target.off(Event.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this);
        };
        _proto16.__targetXYChanged = function __targetXYChanged(evt) {
          if (this._owner.relations.handling != null || this._owner.group != null && this._owner.group._updating) {
            this._targetX = this._target.x;
            this._targetY = this._target.y;
            return;
          }
          this._owner.relations.handling = this._target;
          var ox = this._owner.x;
          var oy = this._owner.y;
          var dx = this._target.x - this._targetX;
          var dy = this._target.y - this._targetY;
          var length = this._defs.length;
          for (var i = 0; i < length; i++) {
            var info = this._defs[i];
            this.applyOnXYChanged(info, dx, dy);
          }
          this._targetX = this._target.x;
          this._targetY = this._target.y;
          if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent) {
              var len = this._owner.parent._transitions.length;
              if (len > 0) {
                for (var i = 0; i < len; ++i) {
                  this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                }
              }
            }
          }
          this._owner.relations.handling = null;
        };
        _proto16.__targetSizeChanged = function __targetSizeChanged(evt) {
          if (this._owner.relations.handling != null) return;
          this._owner.relations.handling = this._target;
          var ox = this._owner.x;
          var oy = this._owner.y;
          var ow = this._owner._rawWidth;
          var oh = this._owner._rawHeight;
          var length = this._defs.length;
          for (var i = 0; i < length; i++) {
            var info = this._defs[i];
            this.applyOnSizeChanged(info);
          }
          this._targetWidth = this._target._width;
          this._targetHeight = this._target._height;
          if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent) {
              var len = this._owner.parent._transitions.length;
              if (len > 0) {
                for (var i = 0; i < len; ++i) {
                  this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                }
              }
            }
          }
          if (ow != this._owner._rawWidth || oh != this._owner._rawHeight) {
            ow = this._owner._rawWidth - ow;
            oh = this._owner._rawHeight - oh;
            this._owner.updateGearFromRelations(2, ow, oh);
          }
          this._owner.relations.handling = null;
        };
        _proto16.__targetSizeWillChange = function __targetSizeWillChange(evt) {
          this._owner.relations.sizeDirty = true;
        };
        _createClass(RelationItem, [{
          key: "owner",
          get: function get() {
            return this._owner;
          }
        }, {
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(value) {
            if (this._target != value) {
              if (this._target) this.releaseRefTarget(this._target);
              this._target = value;
              if (this._target) this.addRefTarget(this._target);
            }
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return this._defs.length == 0;
          }
        }]);
        return RelationItem;
      }();
      var RelationDef = /*#__PURE__*/function () {
        function RelationDef() {
          this.percent = false;
          this.type = 0;
          this.axis = 0;
        }
        var _proto17 = RelationDef.prototype;
        _proto17.copyFrom = function copyFrom(source) {
          this.percent = source.percent;
          this.type = source.type;
          this.axis = source.axis;
        };
        return RelationDef;
      }();
      var Relations = /*#__PURE__*/function () {
        function Relations(owner) {
          this.sizeDirty = false;
          this._owner = owner;
          this._items = new Array();
        }
        var _proto18 = Relations.prototype;
        _proto18.add = function add(target, relationType, usePercent) {
          var length = this._items.length;
          for (var i = 0; i < length; i++) {
            var item = this._items[i];
            if (item.target == target) {
              item.add(relationType, usePercent);
              return;
            }
          }
          var newItem = new RelationItem(this._owner);
          newItem.target = target;
          newItem.add(relationType, usePercent);
          this._items.push(newItem);
        };
        _proto18.remove = function remove(target, relationType) {
          relationType = relationType || 0;
          var cnt = this._items.length;
          var i = 0;
          while (i < cnt) {
            var item = this._items[i];
            if (item.target == target) {
              item.remove(relationType);
              if (item.isEmpty) {
                item.dispose();
                this._items.splice(i, 1);
                cnt--;
              } else i++;
            } else i++;
          }
        };
        _proto18.contains = function contains(target) {
          var length = this._items.length;
          for (var i = 0; i < length; i++) {
            var item = this._items[i];
            if (item.target == target) return true;
          }
          return false;
        };
        _proto18.clearFor = function clearFor(target) {
          var cnt = this._items.length;
          var i = 0;
          while (i < cnt) {
            var item = this._items[i];
            if (item.target == target) {
              item.dispose();
              this._items.splice(i, 1);
              cnt--;
            } else i++;
          }
        };
        _proto18.clearAll = function clearAll() {
          var length = this._items.length;
          for (var i = 0; i < length; i++) {
            var item = this._items[i];
            item.dispose();
          }
          this._items.length = 0;
        };
        _proto18.copyFrom = function copyFrom(source) {
          this.clearAll();
          var arr = source._items;
          var length = arr.length;
          for (var i = 0; i < length; i++) {
            var ri = arr[i];
            var item = new RelationItem(this._owner);
            item.copyFrom(ri);
            this._items.push(item);
          }
        };
        _proto18.dispose = function dispose() {
          this.clearAll();
        };
        _proto18.onOwnerSizeChanged = function onOwnerSizeChanged(dWidth, dHeight, applyPivot) {
          if (this._items.length == 0) return;
          var length = this._items.length;
          for (var i = 0; i < length; i++) {
            var item = this._items[i];
            item.applyOnSelfResized(dWidth, dHeight, applyPivot);
          }
        };
        _proto18.ensureRelationsSizeCorrect = function ensureRelationsSizeCorrect() {
          if (this._items.length == 0) return;
          this.sizeDirty = false;
          var length = this._items.length;
          for (var i = 0; i < length; i++) {
            var item = this._items[i];
            item.target.ensureSizeCorrect();
          }
        };
        _proto18.setup = function setup(buffer, parentToChild) {
          var cnt = buffer.readByte();
          var target;
          for (var i = 0; i < cnt; i++) {
            var targetIndex = buffer.readShort();
            if (targetIndex == -1) target = this._owner.parent;else if (parentToChild) target = this._owner.getChildAt(targetIndex);else target = this._owner.parent.getChildAt(targetIndex);
            var newItem = new RelationItem(this._owner);
            newItem.target = target;
            this._items.push(newItem);
            var cnt2 = buffer.readByte();
            for (var j = 0; j < cnt2; j++) {
              var rt = buffer.readByte();
              var usePercent = buffer.readBool();
              newItem.internalAdd(rt, usePercent);
            }
          }
        };
        _createClass(Relations, [{
          key: "empty",
          get: function get() {
            return this._items.length == 0;
          }
        }]);
        return Relations;
      }();
      var UIConfig = exports('UIConfig', function UIConfig() {}); //Default font name
      UIConfig.defaultFont = "Arial"; //When a modal window is in front, the background becomes dark.
      UIConfig.modalLayerColor = new Color(0x33, 0x33, 0x33, 0x33);
      UIConfig.buttonSoundVolumeScale = 1; //Scrolling step in pixels
      UIConfig.defaultScrollStep = 25; //Deceleration ratio of scrollpane when its in touch dragging.
      UIConfig.defaultScrollDecelerationRate = 0.967; //Default scrollbar display mode. Recommened visible for Desktop and Auto for mobile.
      UIConfig.defaultScrollBarDisplay = ScrollBarDisplayType.Visible; //Allow dragging the content to scroll. Recommeded true for mobile.
      UIConfig.defaultScrollTouchEffect = true; //The "rebound" effect in the scolling container. Recommeded true for mobile.
      UIConfig.defaultScrollBounceEffect = true; //Max items displayed in combobox without scrolling.
      UIConfig.defaultComboBoxVisibleItemCount = 10; // Pixel offsets of finger to trigger scrolling.
      UIConfig.touchScrollSensitivity = 20; // Pixel offsets of finger to trigger dragging.
      UIConfig.touchDragSensitivity = 10; // Pixel offsets of mouse pointer to trigger dragging.
      UIConfig.clickDragSensitivity = 2; // When click the window, brings to front automatically.
      UIConfig.bringWindowToFrontOnClick = true;
      UIConfig.frameTimeForAsyncUIConstruction = 0.002;
      UIConfig.linkUnderline = true; //Default group name of UI node.<br/>
      UIConfig.defaultUILayer = Layers.Enum.UI_2D;
      var _fontRegistry = {};
      function registerFont(name, font, bundle) {
        if (font instanceof Font) _fontRegistry[name] = font;else {
          (bundle || resources).load(font || name, Font, function (err, asset) {
            _fontRegistry[name] = asset;
          });
        }
      }
      function getFontByName(name) {
        return _fontRegistry[name];
      }
      var GObject = exports('GObject', /*#__PURE__*/function () {
        function GObject() {
          this._x = 0;
          this._y = 0;
          this._alpha = 1;
          this._visible = true;
          this._touchable = true;
          this._skewX = 0;
          this._skewY = 0;
          this._sortingOrder = 0;
          this._internalVisible = true;
          this.sourceWidth = 0;
          this.sourceHeight = 0;
          this.initWidth = 0;
          this.initHeight = 0;
          this.minWidth = 0;
          this.minHeight = 0;
          this.maxWidth = 0;
          this.maxHeight = 0;
          this._width = 0;
          this._height = 0;
          this._rawWidth = 0;
          this._rawHeight = 0;
          this._underConstruct = false;
          this._sizePercentInGroup = 0;
          this._node = new Node();
          this._uiTrans = this._node.addComponent(UITransform);
          this._uiOpacity = this.node.addComponent(UIOpacity);
          this._node["$gobj"] = this;
          this._node.layer = UIConfig.defaultUILayer;
          this._uiTrans.setAnchorPoint(0, 1);
          this._node.on(Node.EventType.ANCHOR_CHANGED, this.handleAnchorChanged, this);
          this._id = this._node.uuid;
          this._name = "";
          this._relations = new Relations(this);
          this._gears = new Array(10);
          this._blendMode = BlendMode.Normal;
          this._partner = this._node.addComponent(GObjectPartner);
        }
        var _proto19 = GObject.prototype;
        _proto19.setPosition = function setPosition(xv, yv) {
          if (this._x != xv || this._y != yv) {
            var dx = xv - this._x;
            var dy = yv - this._y;
            this._x = xv;
            this._y = yv;
            this.handlePositionChanged();
            if (this instanceof GGroup) this.moveChildren(dx, dy);
            this.updateGear(1);
            if (this._parent && !("setVirtual" in this._parent) /*not list*/) {
              this._parent.setBoundsChangedFlag();
              if (this._group) this._group.setBoundsChangedFlag(true);
              this._node.emit(Event.XY_CHANGED, this);
            }
            if (GObject.draggingObject == this && !s_dragging) this.localToGlobalRect(0, 0, this._width, this._height, sGlobalRect);
          }
        };
        _proto19.center = function center(restraint) {
          var r;
          if (this._parent) r = this.parent;else r = Decls$1.GRoot.inst;
          this.setPosition((r.width - this._width) / 2, (r.height - this._height) / 2);
          if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
          }
        };
        _proto19.setSize = function setSize(wv, hv, ignorePivot) {
          if (this._rawWidth != wv || this._rawHeight != hv) {
            this._rawWidth = wv;
            this._rawHeight = hv;
            if (wv < this.minWidth) wv = this.minWidth;
            if (hv < this.minHeight) hv = this.minHeight;
            if (this.maxWidth > 0 && wv > this.maxWidth) wv = this.maxWidth;
            if (this.maxHeight > 0 && hv > this.maxHeight) hv = this.maxHeight;
            var dWidth = wv - this._width;
            var dHeight = hv - this._height;
            this._width = wv;
            this._height = hv;
            this.handleSizeChanged();
            if ((this._uiTrans.anchorX != 0 || this._uiTrans.anchorY != 1) && !this._pivotAsAnchor && !ignorePivot) this.setPosition(this.x - this._uiTrans.anchorX * dWidth, this.y - (1 - this._uiTrans.anchorY) * dHeight);else this.handlePositionChanged();
            if (this instanceof GGroup) this.resizeChildren(dWidth, dHeight);
            this.updateGear(2);
            if (this._parent) {
              this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);
              this._parent.setBoundsChangedFlag();
              if (this._group) this._group.setBoundsChangedFlag();
            }
            this._node.emit(Event.SIZE_CHANGED, this);
          }
        };
        _proto19.makeFullScreen = function makeFullScreen() {
          this.setSize(Decls$1.GRoot.inst.width, Decls$1.GRoot.inst.height);
        };
        _proto19.ensureSizeCorrect = function ensureSizeCorrect() {};
        _proto19.setScale = function setScale(sx, sy) {
          if (this._node.scale.x != sx || this._node.scale.y != sy) {
            this._node.setScale(sx, sy);
            this.updateGear(2);
          }
        };
        _proto19.setPivot = function setPivot(xv, yv, asAnchor) {
          if (this._uiTrans.anchorX != xv || this._uiTrans.anchorY != 1 - yv) {
            this._pivotAsAnchor = asAnchor;
            this._uiTrans.setAnchorPoint(xv, 1 - yv);
          } else if (this._pivotAsAnchor != asAnchor) {
            this._pivotAsAnchor = asAnchor;
            this.handlePositionChanged();
          }
        };
        _proto19.requestFocus = function requestFocus() {};
        _proto19.getGear = function getGear(index) {
          var gear = this._gears[index];
          if (!gear) this._gears[index] = gear = createGear(this, index);
          return gear;
        };
        _proto19.updateGear = function updateGear(index) {
          if (this._underConstruct || this._gearLocked) return;
          var gear = this._gears[index];
          if (gear && gear.controller) gear.updateState();
        };
        _proto19.checkGearController = function checkGearController(index, c) {
          return this._gears[index] && this._gears[index].controller == c;
        };
        _proto19.updateGearFromRelations = function updateGearFromRelations(index, dx, dy) {
          if (this._gears[index]) this._gears[index].updateFromRelations(dx, dy);
        };
        _proto19.addDisplayLock = function addDisplayLock() {
          var gearDisplay = this._gears[0];
          if (gearDisplay && gearDisplay.controller) {
            var ret = gearDisplay.addLock();
            this.checkGearDisplay();
            return ret;
          } else return 0;
        };
        _proto19.releaseDisplayLock = function releaseDisplayLock(token) {
          var gearDisplay = this._gears[0];
          if (gearDisplay && gearDisplay.controller) {
            gearDisplay.releaseLock(token);
            this.checkGearDisplay();
          }
        };
        _proto19.checkGearDisplay = function checkGearDisplay() {
          if (this._handlingController) return;
          var connected = this._gears[0] == null || this._gears[0].connected;
          if (this._gears[8]) connected = this._gears[8].evaluate(connected);
          if (connected != this._internalVisible) {
            this._internalVisible = connected;
            this.handleVisibleChanged();
            if (this._group && this._group.excludeInvisibles) this._group.setBoundsChangedFlag();
          }
        };
        _proto19.addRelation = function addRelation(target, relationType, usePercent) {
          this._relations.add(target, relationType, usePercent);
        };
        _proto19.removeRelation = function removeRelation(target, relationType) {
          this._relations.remove(target, relationType);
        };
        _proto19.removeFromParent = function removeFromParent() {
          if (this._parent) this._parent.removeChild(this);
        };
        _proto19.findParent = function findParent() {
          if (this._parent) return this._parent; //可能有些不直接在children里，但node挂着的
          var pn = this._node.parent;
          while (pn) {
            var gobj = pn["$gobj"];
            if (gobj) return gobj;
            pn = pn.parent;
          }
          return null;
        };
        GObject.cast = function cast(obj) {
          return obj["$gobj"];
        };
        _proto19.dispose = function dispose() {
          var n = this._node;
          if (!n) return;
          this.removeFromParent();
          this._relations.dispose();
          this._node = null;
          n.destroy();
          for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear) gear.dispose();
          }
        };
        _proto19.onEnable = function onEnable() {};
        _proto19.onDisable = function onDisable() {};
        _proto19.onUpdate = function onUpdate() {};
        _proto19.onDestroy = function onDestroy() {};
        _proto19.onClick = function onClick(listener, target) {
          this._node.on(Event.CLICK, listener, target);
        };
        _proto19.onceClick = function onceClick(listener, target) {
          this._node.once(Event.CLICK, listener, target);
        };
        _proto19.offClick = function offClick(listener, target) {
          this._node.off(Event.CLICK, listener, target);
        };
        _proto19.clearClick = function clearClick() {
          this._node.off(Event.CLICK);
        };
        _proto19.hasClickListener = function hasClickListener() {
          return this._node.hasEventListener(Event.CLICK);
        };
        _proto19.on = function on(type, listener, target) {
          if (type == Event.DISPLAY || type == Event.UNDISPLAY) this._partner._emitDisplayEvents = true;
          this._node.on(type, listener, target);
        };
        _proto19.once = function once(type, listener, target) {
          if (type == Event.DISPLAY || type == Event.UNDISPLAY) this._partner._emitDisplayEvents = true;
          this._node.once(type, listener, target);
        };
        _proto19.off = function off(type, listener, target) {
          this._node.off(type, listener, target);
        };
        _proto19.startDrag = function startDrag(touchId) {
          if (!this._node.activeInHierarchy) return;
          this.dragBegin(touchId);
        };
        _proto19.stopDrag = function stopDrag() {
          this.dragEnd();
        };
        _proto19.localToGlobal = function localToGlobal(ax, ay, result) {
          ax = ax || 0;
          ay = ay || 0;
          s_vec3$1.x = ax;
          s_vec3$1.y = -ay;
          if (!this._pivotAsAnchor) {
            s_vec3$1.x -= this._uiTrans.anchorX * this._width;
            s_vec3$1.y += (1 - this._uiTrans.anchorY) * this._height;
          }
          this._uiTrans.convertToWorldSpaceAR(s_vec3$1, s_vec3$1);
          s_vec3$1.y = Decls$1.GRoot.inst.height - s_vec3$1.y;
          result = result || new Vec2();
          result.x = s_vec3$1.x;
          result.y = s_vec3$1.y;
          return result;
        };
        _proto19.globalToLocal = function globalToLocal(ax, ay, result) {
          ax = ax || 0;
          ay = ay || 0;
          s_vec3$1.x = ax;
          s_vec3$1.y = Decls$1.GRoot.inst.height - ay;
          this._uiTrans.convertToNodeSpaceAR(s_vec3$1, s_vec3$1);
          if (!this._pivotAsAnchor) {
            s_vec3$1.x += this._uiTrans.anchorX * this._width;
            s_vec3$1.y -= (1 - this._uiTrans.anchorY) * this._height;
          }
          result = result || new Vec2();
          result.x = s_vec3$1.x;
          result.y = -s_vec3$1.y;
          return result;
        };
        _proto19.localToGlobalRect = function localToGlobalRect(ax, ay, aw, ah, result) {
          ax = ax || 0;
          ay = ay || 0;
          aw = aw || 0;
          ah = ah || 0;
          result = result || new Rect();
          var pt = this.localToGlobal(ax, ay);
          result.x = pt.x;
          result.y = pt.y;
          pt = this.localToGlobal(ax + aw, ay + ah, pt);
          result.xMax = pt.x;
          result.yMax = pt.y;
          return result;
        };
        _proto19.globalToLocalRect = function globalToLocalRect(ax, ay, aw, ah, result) {
          ax = ax || 0;
          ay = ay || 0;
          aw = aw || 0;
          ah = ah || 0;
          result = result || new Rect();
          var pt = this.globalToLocal(ax, ay);
          result.x = pt.x;
          result.y = pt.y;
          pt = this.globalToLocal(ax + aw, ay + ah, pt);
          result.xMax = pt.x;
          result.yMax = pt.y;
          return result;
        };
        _proto19.handleControllerChanged = function handleControllerChanged(c) {
          this._handlingController = true;
          for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear && gear.controller == c) gear.apply();
          }
          this._handlingController = false;
          this.checkGearDisplay();
        };
        _proto19.handleAnchorChanged = function handleAnchorChanged() {
          this.handlePositionChanged();
        };
        _proto19.handlePositionChanged = function handlePositionChanged() {
          var xv = this._x;
          var yv = -this._y;
          if (!this._pivotAsAnchor) {
            xv += this._uiTrans.anchorX * this._width;
            yv -= (1 - this._uiTrans.anchorY) * this._height;
          }
          if (this._pixelSnapping) {
            xv = Math.round(xv);
            yv = Math.round(yv);
          }
          this._node.setPosition(xv, yv);
        };
        _proto19.handleSizeChanged = function handleSizeChanged() {
          this._uiTrans.setContentSize(this._width, this._height);
        };
        _proto19.handleGrayedChanged = function handleGrayedChanged() {//nothing is base
        };
        _proto19.handleVisibleChanged = function handleVisibleChanged() {
          this._node.active = this._finalVisible;
          if (this instanceof GGroup) this.handleVisibleChanged();
          if (this._parent) this._parent.setBoundsChangedFlag();
        };
        _proto19.hitTest = function hitTest(globalPt, forTouch) {
          if (forTouch == null) forTouch = true;
          if (forTouch && (this._touchDisabled || !this._touchable || !this._node.activeInHierarchy)) return null;
          if (!this._hitTestPt) this._hitTestPt = new Vec2();
          this.globalToLocal(globalPt.x, globalPt.y, this._hitTestPt);
          if (this._pivotAsAnchor) {
            this._hitTestPt.x += this._uiTrans.anchorX * this._width;
            this._hitTestPt.y += (1 - this._uiTrans.anchorY) * this._height;
          }
          return this._hitTest(this._hitTestPt, globalPt);
        };
        _proto19._hitTest = function _hitTest(pt, globalPt) {
          if (pt.x >= 0 && pt.y >= 0 && pt.x < this._width && pt.y < this._height) return this;else return null;
        };
        _proto19.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Text:
              return this.text;
            case ObjectPropID.Icon:
              return this.icon;
            case ObjectPropID.Color:
              return null;
            case ObjectPropID.OutlineColor:
              return null;
            case ObjectPropID.Playing:
              return false;
            case ObjectPropID.Frame:
              return 0;
            case ObjectPropID.DeltaTime:
              return 0;
            case ObjectPropID.TimeScale:
              return 1;
            case ObjectPropID.FontSize:
              return 0;
            case ObjectPropID.Selected:
              return false;
            default:
              return undefined;
          }
        };
        _proto19.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Text:
              this.text = value;
              break;
            case ObjectPropID.Icon:
              this.icon = value;
              break;
          }
        };
        _proto19.constructFromResource = function constructFromResource() {};
        _proto19.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          buffer.seek(beginPos, 0);
          buffer.skip(5);
          var f1;
          var f2;
          this._id = buffer.readS();
          this.name = buffer.readS();
          f1 = buffer.readInt();
          f2 = buffer.readInt();
          this.setPosition(f1, f2);
          if (buffer.readBool()) {
            this.initWidth = buffer.readInt();
            this.initHeight = buffer.readInt();
            this.setSize(this.initWidth, this.initHeight, true);
          }
          if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
          }
          if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setScale(f1, f2);
          }
          if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat(); //this.setSkew(f1, f2);
          }
          if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
          }
          f1 = buffer.readFloat();
          if (f1 != 1) this.alpha = f1;
          f1 = buffer.readFloat();
          if (f1 != 0) this.rotation = f1;
          if (!buffer.readBool()) this.visible = false;
          if (!buffer.readBool()) this.touchable = false;
          if (buffer.readBool()) this.grayed = true;
          this.blendMode = buffer.readByte();
          buffer.readByte();
          var str = buffer.readS();
          if (str != null) this.data = str;
        };
        _proto19.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          buffer.seek(beginPos, 1);
          var str = buffer.readS();
          if (str != null) this.tooltips = str;
          var groupId = buffer.readShort();
          if (groupId >= 0) this.group = this.parent.getChildAt(groupId);
          buffer.seek(beginPos, 2);
          var cnt = buffer.readShort();
          for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.position;
            var gear = this.getGear(buffer.readByte());
            gear.setup(buffer);
            buffer.position = nextPos;
          }
        } //toolTips support
        ;
        _proto19.onRollOver = function onRollOver() {
          Decls$1.GRoot.inst.showTooltips(this.tooltips);
        };
        _proto19.onRollOut = function onRollOut() {
          Decls$1.GRoot.inst.hideTooltips();
        }; //drag support
        //-------------------------------------------------------------------
        _proto19.initDrag = function initDrag() {
          if (this._draggable) {
            this.on(Event.TOUCH_BEGIN, this.onTouchBegin_0, this);
            this.on(Event.TOUCH_MOVE, this.onTouchMove_0, this);
            this.on(Event.TOUCH_END, this.onTouchEnd_0, this);
          } else {
            this.off(Event.TOUCH_BEGIN, this.onTouchBegin_0, this);
            this.off(Event.TOUCH_MOVE, this.onTouchMove_0, this);
            this.off(Event.TOUCH_END, this.onTouchEnd_0, this);
          }
        };
        _proto19.dragBegin = function dragBegin(touchId) {
          if (GObject.draggingObject) {
            var tmp = GObject.draggingObject;
            tmp.stopDrag();
            GObject.draggingObject = null;
            tmp._node.emit(Event.DRAG_END);
          }
          if (touchId == undefined) touchId = Decls$1.GRoot.inst.inputProcessor.getAllTouches()[0];
          sGlobalDragStart.set(Decls$1.GRoot.inst.getTouchPosition(touchId));
          this.localToGlobalRect(0, 0, this._width, this._height, sGlobalRect);
          GObject.draggingObject = this;
          this._dragTesting = false;
          Decls$1.GRoot.inst.inputProcessor.addTouchMonitor(touchId, this);
          this.on(Event.TOUCH_MOVE, this.onTouchMove_0, this);
          this.on(Event.TOUCH_END, this.onTouchEnd_0, this);
        };
        _proto19.dragEnd = function dragEnd() {
          if (GObject.draggingObject == this) {
            this._dragTesting = false;
            GObject.draggingObject = null;
          }
          s_dragQuery = false;
        };
        _proto19.onTouchBegin_0 = function onTouchBegin_0(evt) {
          if (this._dragStartPos == null) this._dragStartPos = new Vec2();
          this._dragStartPos.set(evt.pos);
          this._dragTesting = true;
          evt.captureTouch();
        };
        _proto19.onTouchMove_0 = function onTouchMove_0(evt) {
          if (GObject.draggingObject != this && this._draggable && this._dragTesting) {
            var sensitivity = UIConfig.touchDragSensitivity;
            if (this._dragStartPos && Math.abs(this._dragStartPos.x - evt.pos.x) < sensitivity && Math.abs(this._dragStartPos.y - evt.pos.y) < sensitivity) return;
            this._dragTesting = false;
            s_dragQuery = true;
            this._node.emit(Event.DRAG_START, evt);
            if (s_dragQuery) this.dragBegin(evt.touchId);
          }
          if (GObject.draggingObject == this) {
            var xx = evt.pos.x - sGlobalDragStart.x + sGlobalRect.x;
            var yy = evt.pos.y - sGlobalDragStart.y + sGlobalRect.y;
            if (this._dragBounds) {
              var rect = Decls$1.GRoot.inst.localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, s_rect$1);
              if (xx < rect.x) xx = rect.x;else if (xx + sGlobalRect.width > rect.xMax) {
                xx = rect.xMax - sGlobalRect.width;
                if (xx < rect.x) xx = rect.x;
              }
              if (yy < rect.y) yy = rect.y;else if (yy + sGlobalRect.height > rect.yMax) {
                yy = rect.yMax - sGlobalRect.height;
                if (yy < rect.y) yy = rect.y;
              }
            }
            s_dragging = true;
            var pt = this.parent.globalToLocal(xx, yy, s_vec2$4);
            this.setPosition(Math.round(pt.x), Math.round(pt.y));
            s_dragging = false;
            this._node.emit(Event.DRAG_MOVE, evt);
          }
        };
        _proto19.onTouchEnd_0 = function onTouchEnd_0(evt) {
          if (GObject.draggingObject == this) {
            GObject.draggingObject = null;
            this._node.emit(Event.DRAG_END, evt);
          }
        } /**获取组件 */;
        _proto19.Get = function Get(type) {
          return this.node.getComponent(type);
        };
        _createClass(GObject, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          },
          set: function set(value) {
            this._name = value;
            this._node.name = value || "";
          }
        }, {
          key: "x",
          get: function get() {
            return this._x;
          },
          set: function set(value) {
            this.setPosition(value, this._y);
          }
        }, {
          key: "y",
          get: function get() {
            return this._y;
          },
          set: function set(value) {
            this.setPosition(this._x, value);
          }
        }, {
          key: "xMin",
          get: function get() {
            return this._pivotAsAnchor ? this._x - this._width * this._uiTrans.anchorX : this._x;
          },
          set: function set(value) {
            if (this._pivotAsAnchor) this.setPosition(value + this._width * this._uiTrans.anchorX, this._y);else this.setPosition(value, this._y);
          }
        }, {
          key: "yMin",
          get: function get() {
            return this._pivotAsAnchor ? this._y - this._height * (1 - this._uiTrans.anchorY) : this._y;
          },
          set: function set(value) {
            if (this._pivotAsAnchor) this.setPosition(this._x, value + this._height * (1 - this._uiTrans.anchorY));else this.setPosition(this._x, value);
          }
        }, {
          key: "pixelSnapping",
          get: function get() {
            return this._pixelSnapping;
          },
          set: function set(value) {
            if (this._pixelSnapping != value) {
              this._pixelSnapping = value;
              this.handlePositionChanged();
            }
          }
        }, {
          key: "width",
          get: function get() {
            this.ensureSizeCorrect();
            if (this._relations.sizeDirty) this._relations.ensureRelationsSizeCorrect();
            return this._width;
          },
          set: function set(value) {
            this.setSize(value, this._rawHeight);
          }
        }, {
          key: "height",
          get: function get() {
            this.ensureSizeCorrect();
            if (this._relations.sizeDirty) this._relations.ensureRelationsSizeCorrect();
            return this._height;
          },
          set: function set(value) {
            this.setSize(this._rawWidth, value);
          }
        }, {
          key: "actualWidth",
          get: function get() {
            return this.width * Math.abs(this._node.scale.x);
          }
        }, {
          key: "actualHeight",
          get: function get() {
            return this.height * Math.abs(this._node.scale.y);
          }
        }, {
          key: "scaleX",
          get: function get() {
            return this._node.scale.x;
          },
          set: function set(value) {
            this.setScale(value, this._node.scale.y);
          }
        }, {
          key: "scaleY",
          get: function get() {
            return this._node.scale.y;
          },
          set: function set(value) {
            this.setScale(this._node.scale.x, value);
          }
        }, {
          key: "skewX",
          get: function get() {
            return this._skewX;
          }
        }, {
          key: "pivotX",
          get: function get() {
            return this._uiTrans.anchorX;
          },
          set: function set(value) {
            this._uiTrans.anchorX = value;
          }
        }, {
          key: "pivotY",
          get: function get() {
            return 1 - this._uiTrans.anchorY;
          },
          set: function set(value) {
            this._uiTrans.anchorY = 1 - value;
          }
        }, {
          key: "pivotAsAnchor",
          get: function get() {
            return this._pivotAsAnchor;
          }
        }, {
          key: "touchable",
          get: function get() {
            return this._touchable;
          },
          set: function set(value) {
            if (this._touchable != value) {
              this._touchable = value;
              this.updateGear(3);
            }
          }
        }, {
          key: "grayed",
          get: function get() {
            return this._grayed;
          },
          set: function set(value) {
            if (this._grayed != value) {
              this._grayed = value;
              this.handleGrayedChanged();
              this.updateGear(3);
            }
          }
        }, {
          key: "enabled",
          get: function get() {
            return !this._grayed && this._touchable;
          },
          set: function set(value) {
            this.grayed = !value;
            this.touchable = value;
          }
        }, {
          key: "rotation",
          get: function get() {
            return -this._node.angle;
          },
          set: function set(value) {
            value = -value;
            if (this._node.angle != value) {
              this._node.angle = value;
              this.updateGear(3);
            }
          }
        }, {
          key: "alpha",
          get: function get() {
            return this._alpha;
          },
          set: function set(value) {
            if (this._alpha != value) {
              this._alpha = value;
              this._uiOpacity.opacity = this._alpha * 255;
              if (this instanceof GGroup) this.handleAlphaChanged();
              this.updateGear(3);
            }
          }
        }, {
          key: "visible",
          get: function get() {
            return this._visible;
          },
          set: function set(value) {
            if (this._visible != value) {
              this._visible = value;
              this.handleVisibleChanged();
              if (this._group && this._group.excludeInvisibles) this._group.setBoundsChangedFlag();
            }
          }
        }, {
          key: "_finalVisible",
          get: function get() {
            return this._visible && this._internalVisible && (!this._group || this._group._finalVisible);
          }
        }, {
          key: "internalVisible3",
          get: function get() {
            return this._visible && this._internalVisible;
          }
        }, {
          key: "sortingOrder",
          get: function get() {
            return this._sortingOrder;
          },
          set: function set(value) {
            if (value < 0) value = 0;
            if (this._sortingOrder != value) {
              var old = this._sortingOrder;
              this._sortingOrder = value;
              if (this._parent) this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
            }
          }
        }, {
          key: "tooltips",
          get: function get() {
            return this._tooltips;
          },
          set: function set(value) {
            if (this._tooltips) {
              this._node.off(Event.ROLL_OVER, this.onRollOver, this);
              this._node.off(Event.ROLL_OUT, this.onRollOut, this);
            }
            this._tooltips = value;
            if (this._tooltips) {
              this._node.on(Event.ROLL_OVER, this.onRollOver, this);
              this._node.on(Event.ROLL_OUT, this.onRollOut, this);
            }
          }
        }, {
          key: "blendMode",
          get: function get() {
            return this._blendMode;
          },
          set: function set(value) {
            if (this._blendMode != value) {
              this._blendMode = value;
              BlendModeUtils.apply(this._node, value);
            }
          }
        }, {
          key: "onStage",
          get: function get() {
            return this._node && this._node.activeInHierarchy;
          }
        }, {
          key: "resourceURL",
          get: function get() {
            if (this.packageItem) return "ui://" + this.packageItem.owner.id + this.packageItem.id;else return null;
          }
        }, {
          key: "group",
          get: function get() {
            return this._group;
          },
          set: function set(value) {
            if (this._group != value) {
              if (this._group) this._group.setBoundsChangedFlag();
              this._group = value;
              if (this._group) this._group.setBoundsChangedFlag();
            }
          }
        }, {
          key: "gearXY",
          get: function get() {
            return this.getGear(1);
          }
        }, {
          key: "gearSize",
          get: function get() {
            return this.getGear(2);
          }
        }, {
          key: "gearLook",
          get: function get() {
            return this.getGear(3);
          }
        }, {
          key: "relations",
          get: function get() {
            return this._relations;
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          }
        }, {
          key: "parent",
          get: function get() {
            return this._parent;
          }
        }, {
          key: "asCom",
          get: function get() {
            return this;
          }
        }, {
          key: "text",
          get: function get() {
            return null;
          },
          set: function set(value) {}
        }, {
          key: "icon",
          get: function get() {
            return null;
          },
          set: function set(value) {}
        }, {
          key: "treeNode",
          get: function get() {
            return this._treeNode;
          }
        }, {
          key: "isDisposed",
          get: function get() {
            return this._node == null;
          }
        }, {
          key: "draggable",
          get: function get() {
            return this._draggable;
          },
          set: function set(value) {
            if (this._draggable != value) {
              this._draggable = value;
              this.initDrag();
            }
          }
        }, {
          key: "dragBounds",
          get: function get() {
            return this._dragBounds;
          },
          set: function set(value) {
            this._dragBounds = value;
          }
        }, {
          key: "dragging",
          get: function get() {
            return GObject.draggingObject == this;
          }
        }]);
        return GObject;
      }()); //-------------------------------------------------------------------
      var GObjectPartner = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GObjectPartner, _Component);
        function GObjectPartner() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto20 = GObjectPartner.prototype;
        _proto20.callLater = function callLater(callback, delay) {
          if (!director.getScheduler().isScheduled(callback, this)) this.scheduleOnce(callback, delay);
        };
        _proto20.onClickLink = function onClickLink(evt, text) {
          this.node.emit(Event.LINK, text, evt);
        };
        _proto20.onEnable = function onEnable() {
          this.node["$gobj"].onEnable();
          if (this._emitDisplayEvents) this.node.emit(Event.DISPLAY);
        };
        _proto20.onDisable = function onDisable() {
          this.node["$gobj"].onDisable();
          if (this._emitDisplayEvents) this.node.emit(Event.UNDISPLAY);
        };
        _proto20.update = function update(dt) {
          this.node["$gobj"].onUpdate(dt);
        };
        _proto20.onDestroy = function onDestroy() {
          this.node["$gobj"].onDestroy();
        };
        return GObjectPartner;
      }(Component); //-------------------------------------------------------------------
      var GearClasses = [GearDisplay, GearXY, GearSize, GearLook, GearColor, GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize];
      function createGear(owner, index) {
        var ret = new GearClasses[index]();
        ret._owner = owner;
        return ret;
      }
      var s_vec2$4 = new Vec2();
      var s_vec3$1 = new Vec3();
      var s_rect$1 = new Rect();
      var sGlobalDragStart = new Vec2();
      var sGlobalRect = new Rect();
      var s_dragging;
      var s_dragQuery;
      var Decls$1 = {};
      var constructingDepth = {
        n: 0
      };
      var GGroup = exports('GGroup', /*#__PURE__*/function (_GObject) {
        _inheritsLoose(GGroup, _GObject);
        function GGroup() {
          var _this5;
          _this5 = _GObject.call(this) || this;
          _this5._layout = 0;
          _this5._lineGap = 0;
          _this5._columnGap = 0;
          _this5._mainGridIndex = -1;
          _this5._mainGridMinSize = 50;
          _this5._mainChildIndex = -1;
          _this5._totalSize = 0;
          _this5._numChildren = 0;
          _this5._updating = 0;
          _this5._node.name = "GGroup";
          _this5._touchDisabled = true;
          return _this5;
        }
        var _proto21 = GGroup.prototype;
        _proto21.dispose = function dispose() {
          this._boundsChanged = false;
          _GObject.prototype.dispose.call(this);
        };
        _proto21.setBoundsChangedFlag = function setBoundsChangedFlag(positionChangedOnly) {
          if (positionChangedOnly === void 0) {
            positionChangedOnly = false;
          }
          if (this._updating == 0 && this._parent) {
            if (!positionChangedOnly) this._percentReady = false;
            if (!this._boundsChanged) {
              this._boundsChanged = true;
              if (this._layout != GroupLayoutType.None) this._partner.callLater(this._ensureBoundsCorrect);
            }
          }
        };
        _proto21._ensureBoundsCorrect = function _ensureBoundsCorrect() {
          var _t = GObject.cast(this.node);
          _t.ensureBoundsCorrect();
        };
        _proto21.ensureSizeCorrect = function ensureSizeCorrect() {
          if (this._parent == null || !this._boundsChanged || this._layout == 0) return;
          this._boundsChanged = false;
          if (this._autoSizeDisabled) this.resizeChildren(0, 0);else {
            this.handleLayout();
            this.updateBounds();
          }
        };
        _proto21.ensureBoundsCorrect = function ensureBoundsCorrect() {
          if (this._parent == null || !this._boundsChanged) return;
          this._boundsChanged = false;
          if (this._layout == 0) this.updateBounds();else {
            if (this._autoSizeDisabled) this.resizeChildren(0, 0);else {
              this.handleLayout();
              this.updateBounds();
            }
          }
        };
        _proto21.updateBounds = function updateBounds() {
          this._partner.unschedule(this._ensureBoundsCorrect);
          var cnt = this._parent.numChildren;
          var i;
          var child;
          var ax = Number.POSITIVE_INFINITY,
            ay = Number.POSITIVE_INFINITY;
          var ar = Number.NEGATIVE_INFINITY,
            ab = Number.NEGATIVE_INFINITY;
          var tmp;
          var empty = true;
          for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group != this || this._excludeInvisibles && !child.internalVisible3) continue;
            tmp = child.xMin;
            if (tmp < ax) ax = tmp;
            tmp = child.yMin;
            if (tmp < ay) ay = tmp;
            tmp = child.xMin + child.width;
            if (tmp > ar) ar = tmp;
            tmp = child.yMin + child.height;
            if (tmp > ab) ab = tmp;
            empty = false;
          }
          var w = 0,
            h = 0;
          if (!empty) {
            this._updating |= 1;
            this.setPosition(ax, ay);
            this._updating &= 2;
            w = ar - ax;
            h = ab - ay;
          }
          if ((this._updating & 2) == 0) {
            this._updating |= 2;
            this.setSize(w, h);
            this._updating &= 1;
          } else {
            this._updating &= 1;
            this.resizeChildren(this._width - w, this._height - h);
          }
        };
        _proto21.handleLayout = function handleLayout() {
          this._updating |= 1;
          var child;
          var i;
          var cnt;
          if (this._layout == GroupLayoutType.Horizontal) {
            var curX = this.x;
            cnt = this._parent.numChildren;
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (this._excludeInvisibles && !child.internalVisible3) continue;
              child.xMin = curX;
              if (child.width != 0) curX += child.width + this._columnGap;
            }
          } else if (this._layout == GroupLayoutType.Vertical) {
            var curY = this.y;
            cnt = this._parent.numChildren;
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (this._excludeInvisibles && !child.internalVisible3) continue;
              child.yMin = curY;
              if (child.height != 0) curY += child.height + this._lineGap;
            }
          }
          this._updating &= 2;
        };
        _proto21.moveChildren = function moveChildren(dx, dy) {
          if ((this._updating & 1) != 0 || this._parent == null) return;
          this._updating |= 1;
          var cnt = this._parent.numChildren;
          var i;
          var child;
          for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group == this) {
              child.setPosition(child.x + dx, child.y + dy);
            }
          }
          this._updating &= 2;
        };
        _proto21.resizeChildren = function resizeChildren(dw, dh) {
          if (this._layout == GroupLayoutType.None || (this._updating & 2) != 0 || this._parent == null) return;
          this._updating |= 2;
          if (this._boundsChanged) {
            this._boundsChanged = false;
            if (!this._autoSizeDisabled) {
              this.updateBounds();
              return;
            }
          }
          var cnt = this._parent.numChildren;
          var i;
          var child;
          if (!this._percentReady) {
            this._percentReady = true;
            this._numChildren = 0;
            this._totalSize = 0;
            this._mainChildIndex = -1;
            var j = 0;
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (!this._excludeInvisibles || child.internalVisible3) {
                if (j == this._mainGridIndex) this._mainChildIndex = i;
                this._numChildren++;
                if (this._layout == 1) this._totalSize += child.width;else this._totalSize += child.height;
              }
              j++;
            }
            if (this._mainChildIndex != -1) {
              if (this._layout == 1) {
                child = this._parent.getChildAt(this._mainChildIndex);
                this._totalSize += this._mainGridMinSize - child.width;
                child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
              } else {
                child = this._parent.getChildAt(this._mainChildIndex);
                this._totalSize += this._mainGridMinSize - child.height;
                child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
              }
            }
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (i == this._mainChildIndex) continue;
              if (this._totalSize > 0) child._sizePercentInGroup = (this._layout == 1 ? child.width : child.height) / this._totalSize;else child._sizePercentInGroup = 0;
            }
          }
          var remainSize = 0;
          var remainPercent = 1;
          var priorHandled = false;
          if (this._layout == 1) {
            remainSize = this.width - (this._numChildren - 1) * this._columnGap;
            if (this._mainChildIndex != -1 && remainSize >= this._totalSize) {
              child = this._parent.getChildAt(this._mainChildIndex);
              child.setSize(remainSize - (this._totalSize - this._mainGridMinSize), child._rawHeight + dh, true);
              remainSize -= child.width;
              remainPercent -= child._sizePercentInGroup;
              priorHandled = true;
            }
            var curX = this.x;
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (this._excludeInvisibles && !child.internalVisible3) {
                child.setSize(child._rawWidth, child._rawHeight + dh, true);
                continue;
              }
              if (!priorHandled || i != this._mainChildIndex) {
                child.setSize(Math.round(child._sizePercentInGroup / remainPercent * remainSize), child._rawHeight + dh, true);
                remainPercent -= child._sizePercentInGroup;
                remainSize -= child.width;
              }
              child.xMin = curX;
              if (child.width != 0) curX += child.width + this._columnGap;
            }
          } else {
            remainSize = this.height - (this._numChildren - 1) * this._lineGap;
            if (this._mainChildIndex != -1 && remainSize >= this._totalSize) {
              child = this._parent.getChildAt(this._mainChildIndex);
              child.setSize(child._rawWidth + dw, remainSize - (this._totalSize - this._mainGridMinSize), true);
              remainSize -= child.height;
              remainPercent -= child._sizePercentInGroup;
              priorHandled = true;
            }
            var curY = this.y;
            for (i = 0; i < cnt; i++) {
              child = this._parent.getChildAt(i);
              if (child.group != this) continue;
              if (this._excludeInvisibles && !child.internalVisible3) {
                child.setSize(child._rawWidth + dw, child._rawHeight, true);
                continue;
              }
              if (!priorHandled || i != this._mainChildIndex) {
                child.setSize(child._rawWidth + dw, Math.round(child._sizePercentInGroup / remainPercent * remainSize), true);
                remainPercent -= child._sizePercentInGroup;
                remainSize -= child.height;
              }
              child.yMin = curY;
              if (child.height != 0) curY += child.height + this._lineGap;
            }
          }
          this._updating &= 1;
        };
        _proto21.handleAlphaChanged = function handleAlphaChanged() {
          if (this._underConstruct) return;
          var cnt = this._parent.numChildren;
          for (var i = 0; i < cnt; i++) {
            var child = this._parent.getChildAt(i);
            if (child.group == this) child.alpha = this.alpha;
          }
        };
        _proto21.handleVisibleChanged = function handleVisibleChanged() {
          if (!this._parent) return;
          var cnt = this._parent.numChildren;
          for (var i = 0; i < cnt; i++) {
            var child = this._parent.getChildAt(i);
            if (child.group == this) child.handleVisibleChanged();
          }
        };
        _proto21.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this._layout = buffer.readByte();
          this._lineGap = buffer.readInt();
          this._columnGap = buffer.readInt();
          if (buffer.version >= 2) {
            this._excludeInvisibles = buffer.readBool();
            this._autoSizeDisabled = buffer.readBool();
            this._mainGridIndex = buffer.readShort();
          }
        };
        _proto21.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GObject.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!this.visible) this.handleVisibleChanged();
        };
        _createClass(GGroup, [{
          key: "layout",
          get: function get() {
            return this._layout;
          },
          set: function set(value) {
            if (this._layout != value) {
              this._layout = value;
              this.setBoundsChangedFlag();
            }
          }
        }, {
          key: "lineGap",
          get: function get() {
            return this._lineGap;
          },
          set: function set(value) {
            if (this._lineGap != value) {
              this._lineGap = value;
              this.setBoundsChangedFlag(true);
            }
          }
        }, {
          key: "columnGap",
          get: function get() {
            return this._columnGap;
          },
          set: function set(value) {
            if (this._columnGap != value) {
              this._columnGap = value;
              this.setBoundsChangedFlag(true);
            }
          }
        }, {
          key: "excludeInvisibles",
          get: function get() {
            return this._excludeInvisibles;
          },
          set: function set(value) {
            if (this._excludeInvisibles != value) {
              this._excludeInvisibles = value;
              this.setBoundsChangedFlag();
            }
          }
        }, {
          key: "autoSizeDisabled",
          get: function get() {
            return this._autoSizeDisabled;
          },
          set: function set(value) {
            this._autoSizeDisabled = value;
          }
        }, {
          key: "mainGridMinSize",
          get: function get() {
            return this._mainGridMinSize;
          },
          set: function set(value) {
            if (this._mainGridMinSize != value) {
              this._mainGridMinSize = value;
              this.setBoundsChangedFlag();
            }
          }
        }, {
          key: "mainGridIndex",
          get: function get() {
            return this._mainGridIndex;
          },
          set: function set(value) {
            if (this._mainGridIndex != value) {
              this._mainGridIndex = value;
              this.setBoundsChangedFlag();
            }
          }
        }]);
        return GGroup;
      }(GObject));
      var GGraph = exports('GGraph', /*#__PURE__*/function (_GObject2) {
        _inheritsLoose(GGraph, _GObject2);
        function GGraph() {
          var _this6;
          _this6 = _GObject2.call(this) || this;
          _this6._type = 0;
          _this6._lineSize = 0;
          _this6._node.name = "GGraph";
          _this6._lineSize = 1;
          _this6._lineColor = new Color();
          _this6._fillColor = new Color(255, 255, 255, 255);
          _this6._content = _this6._node.addComponent(Graphics);
          return _this6;
        }
        var _proto22 = GGraph.prototype;
        _proto22.drawRect = function drawRect(lineSize, lineColor, fillColor, corner) {
          this._type = 1;
          this._lineSize = lineSize;
          this._lineColor.set(lineColor);
          this._fillColor.set(fillColor);
          this._cornerRadius = corner;
          this.updateGraph();
        };
        _proto22.drawEllipse = function drawEllipse(lineSize, lineColor, fillColor) {
          this._type = 2;
          this._lineSize = lineSize;
          this._lineColor.set(lineColor);
          this._fillColor.set(fillColor);
          this.updateGraph();
        };
        _proto22.drawRegularPolygon = function drawRegularPolygon(lineSize, lineColor, fillColor, sides, startAngle, distances) {
          this._type = 4;
          this._lineSize = lineSize;
          this._lineColor.set(lineColor);
          this._fillColor.set(fillColor);
          this._sides = sides;
          this._startAngle = startAngle || 0;
          this._distances = distances;
          this.updateGraph();
        };
        _proto22.drawPolygon = function drawPolygon(lineSize, lineColor, fillColor, points) {
          this._type = 3;
          this._lineSize = lineSize;
          this._lineColor.set(lineColor);
          this._fillColor.set(fillColor);
          this._polygonPoints = points;
          this.updateGraph();
        };
        _proto22.clearGraphics = function clearGraphics() {
          this._type = 0;
          if (this._hasContent) {
            this._content.clear();
            this._hasContent = false;
          }
        };
        _proto22.updateGraph = function updateGraph() {
          var ctx = this._content;
          if (this._hasContent) {
            this._hasContent = false;
            ctx.clear();
          }
          var w = this._width;
          var h = this._height;
          if (w == 0 || h == 0) return;
          var px = -this.pivotX * this._width;
          var py = this.pivotY * this._height;
          var ls = this._lineSize / 2;
          ctx.lineWidth = this._lineSize;
          ctx.strokeColor = this._lineColor;
          ctx.fillColor = this._fillColor;
          if (this._type == 1) {
            if (this._cornerRadius) {
              ctx.roundRect(px + ls, -h + py + ls, w - this._lineSize, h - this._lineSize, this._cornerRadius[0]);
            } else ctx.rect(px + ls, -h + py + ls, w - this._lineSize, h - this._lineSize);
          } else if (this._type == 2) {
            ctx.ellipse(w / 2 + px, -h / 2 + py, w / 2 - ls, h / 2 - ls);
          } else if (this._type == 3) {
            this.drawPath(ctx, this._polygonPoints, px, py);
          } else if (this._type == 4) {
            if (!this._polygonPoints) this._polygonPoints = [];
            var radius = Math.min(w, h) / 2 - ls;
            this._polygonPoints.length = 0;
            var angle = misc.degreesToRadians(this._startAngle);
            var deltaAngle = 2 * Math.PI / this._sides;
            var dist;
            for (var i = 0; i < this._sides; i++) {
              if (this._distances) {
                dist = this._distances[i];
                if (isNaN(dist)) dist = 1;
              } else dist = 1;
              var xv = radius + radius * dist * Math.cos(angle);
              var yv = radius + radius * dist * Math.sin(angle);
              this._polygonPoints.push(xv, yv);
              angle += deltaAngle;
            }
            this.drawPath(ctx, this._polygonPoints, px, py);
          }
          if (ls != 0) ctx.stroke();
          if (this._fillColor.a != 0) ctx.fill();
          this._hasContent = true;
        };
        _proto22.drawPath = function drawPath(ctx, points, px, py) {
          var cnt = points.length;
          ctx.moveTo(points[0] + px, -points[1] + py);
          for (var i = 2; i < cnt; i += 2) ctx.lineTo(points[i] + px, -points[i + 1] + py);
          ctx.lineTo(points[0] + px, -points[1] + py);
        };
        _proto22.handleSizeChanged = function handleSizeChanged() {
          _GObject2.prototype.handleSizeChanged.call(this);
          if (this._type != 0) this.updateGraph();
        };
        _proto22.handleAnchorChanged = function handleAnchorChanged() {
          _GObject2.prototype.handleAnchorChanged.call(this);
          if (this._type != 0) this.updateGraph();
        };
        _proto22.getProp = function getProp(index) {
          if (index == ObjectPropID.Color) return this.color;else return _GObject2.prototype.getProp.call(this, index);
        };
        _proto22.setProp = function setProp(index, value) {
          if (index == ObjectPropID.Color) this.color = value;else _GObject2.prototype.setProp.call(this, index, value);
        };
        _proto22._hitTest = function _hitTest(pt) {
          if (pt.x >= 0 && pt.y >= 0 && pt.x < this._width && pt.y < this._height) {
            if (this._type == 3) {
              var points = this._polygonPoints;
              var len = points.length / 2;
              var i;
              var j = len - 1;
              var oddNodes = false;
              this._width;
              this._height;
              for (i = 0; i < len; ++i) {
                var ix = points[i * 2];
                var iy = points[i * 2 + 1];
                var jx = points[j * 2];
                var jy = points[j * 2 + 1];
                if ((iy < pt.y && jy >= pt.y || jy < pt.y && iy >= pt.y) && (ix <= pt.x || jx <= pt.x)) {
                  if (ix + (pt.y - iy) / (jy - iy) * (jx - ix) < pt.x) oddNodes = !oddNodes;
                }
                j = i;
              }
              return oddNodes ? this : null;
            } else return this;
          } else return null;
        };
        _proto22.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject2.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this._type = buffer.readByte();
          if (this._type != 0) {
            var i;
            var cnt;
            this._lineSize = buffer.readInt();
            this._lineColor.set(buffer.readColor(true));
            this._fillColor.set(buffer.readColor(true));
            if (buffer.readBool()) {
              this._cornerRadius = new Array(4);
              for (i = 0; i < 4; i++) this._cornerRadius[i] = buffer.readFloat();
            }
            if (this._type == 3) {
              cnt = buffer.readShort();
              this._polygonPoints = [];
              this._polygonPoints.length = cnt;
              for (i = 0; i < cnt; i++) this._polygonPoints[i] = buffer.readFloat();
            } else if (this._type == 4) {
              this._sides = buffer.readShort();
              this._startAngle = buffer.readFloat();
              cnt = buffer.readShort();
              if (cnt > 0) {
                this._distances = [];
                for (i = 0; i < cnt; i++) this._distances[i] = buffer.readFloat();
              }
            }
            this.updateGraph();
          }
        };
        _createClass(GGraph, [{
          key: "distances",
          get: function get() {
            return this._distances;
          },
          set: function set(value) {
            this._distances = value;
            if (this._type == 3) this.updateGraph();
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
        }, {
          key: "color",
          get: function get() {
            return this._fillColor;
          },
          set: function set(value) {
            this._fillColor.set(value);
            if (this._type != 0) this.updateGraph();
          }
        }]);
        return GGraph;
      }(GObject));
      var Image$1 = exports('Image', /*#__PURE__*/function (_Sprite) {
        _inheritsLoose(Image, _Sprite);
        function Image() {
          var _this7;
          _this7 = _Sprite.call(this) || this;
          _this7._flip = FlipType.None;
          _this7._fillMethod = FillMethod.None;
          _this7._fillOrigin = FillOrigin.Left;
          _this7._fillAmount = 0;
          return _this7;
        }
        var _proto23 = Image.prototype;
        _proto23.setupFill = function setupFill() {
          if (this._fillMethod == FillMethod.Horizontal) {
            this._fillClockwise = this._fillOrigin == FillOrigin.Right || this._fillOrigin == FillOrigin.Bottom;
            this.fillStart = this._fillClockwise ? 1 : 0;
          } else if (this._fillMethod == FillMethod.Vertical) {
            this._fillClockwise = this._fillOrigin == FillOrigin.Left || this._fillOrigin == FillOrigin.Top;
            this.fillStart = this._fillClockwise ? 1 : 0;
          } else {
            switch (this._fillOrigin) {
              case FillOrigin.Right:
                this.fillOrigin = 0;
                break;
              case FillOrigin.Top:
                this.fillStart = 0.25;
                break;
              case FillOrigin.Left:
                this.fillStart = 0.5;
                break;
              case FillOrigin.Bottom:
                this.fillStart = 0.75;
                break;
            }
          }
        };
        _createClass(Image, [{
          key: "flip",
          get: function get() {
            return this._flip;
          },
          set: function set(value) {
            if (this._flip != value) {
              this._flip = value;
              var sx = 1,
                sy = 1;
              if (this._flip == FlipType.Horizontal || this._flip == FlipType.Both) sx = -1;
              if (this._flip == FlipType.Vertical || this._flip == FlipType.Both) sy = -1;
              if (sx != 1 || sy != 1) {
                var uiTrans = this.node.getComponent(UITransform);
                uiTrans.setAnchorPoint(0.5, 0.5);
              }
              this.node.setScale(sx, sy);
            }
          }
        }, {
          key: "fillMethod",
          get: function get() {
            return this._fillMethod;
          },
          set: function set(value) {
            if (this._fillMethod != value) {
              this._fillMethod = value;
              if (this._fillMethod != 0) {
                this.type = Sprite.Type.FILLED;
                if (this._fillMethod <= 3) this.fillType = this._fillMethod - 1;else this.fillType = Sprite.FillType.RADIAL;
                this.fillCenter = new Vec2(0.5, 0.5);
                this.setupFill();
              } else {
                this.type = Sprite.Type.SIMPLE;
              }
            }
          }
        }, {
          key: "fillOrigin",
          get: function get() {
            return this._fillOrigin;
          },
          set: function set(value) {
            if (this._fillOrigin != value) {
              this._fillOrigin = value;
              if (this._fillMethod != 0) this.setupFill();
            }
          }
        }, {
          key: "fillClockwise",
          get: function get() {
            return this._fillClockwise;
          },
          set: function set(value) {
            if (this._fillClockwise != value) {
              this._fillClockwise = value;
              if (this._fillMethod != 0) this.setupFill();
            }
          }
        }, {
          key: "fillAmount",
          get: function get() {
            return this._fillAmount;
          },
          set: function set(value) {
            if (this._fillAmount != value) {
              this._fillAmount = value;
              if (this._fillMethod != 0) {
                if (this._fillClockwise) this.fillRange = -this._fillAmount;else this.fillRange = this._fillAmount;
              }
            }
          }
        }]);
        return Image;
      }(Sprite));
      var GImage = exports('GImage', /*#__PURE__*/function (_GObject3) {
        _inheritsLoose(GImage, _GObject3);
        function GImage() {
          var _this8;
          _this8 = _GObject3.call(this) || this;
          _this8._node.name = "GImage";
          _this8._touchDisabled = true;
          _this8._content = _this8._node.addComponent(Image$1);
          _this8._content.sizeMode = Sprite.SizeMode.CUSTOM;
          _this8._content.trim = false;
          return _this8;
        }
        var _proto24 = GImage.prototype;
        _proto24.constructFromResource = function constructFromResource() {
          var contentItem = this.packageItem.getBranch();
          this.sourceWidth = contentItem.width;
          this.sourceHeight = contentItem.height;
          this.initWidth = this.sourceWidth;
          this.initHeight = this.sourceHeight;
          this.setSize(this.sourceWidth, this.sourceHeight);
          contentItem = contentItem.getHighResolution();
          contentItem.load();
          if (contentItem.scale9Grid) this._content.type = Sprite.Type.SLICED;else if (contentItem.scaleByTile) this._content.type = Sprite.Type.TILED;
          this._content.spriteFrame = contentItem.asset;
        };
        _proto24.handleGrayedChanged = function handleGrayedChanged() {
          this._content.grayscale = this._grayed;
        };
        _proto24.getProp = function getProp(index) {
          if (index == ObjectPropID.Color) return this.color;else return _GObject3.prototype.getProp.call(this, index);
        };
        _proto24.setProp = function setProp(index, value) {
          if (index == ObjectPropID.Color) this.color = value;else _GObject3.prototype.setProp.call(this, index, value);
        };
        _proto24.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject3.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          if (buffer.readBool()) this.color = buffer.readColor();
          this._content.flip = buffer.readByte();
          this._content.fillMethod = buffer.readByte();
          if (this._content.fillMethod != 0) {
            this._content.fillOrigin = buffer.readByte();
            this._content.fillClockwise = buffer.readBool();
            this._content.fillAmount = buffer.readFloat();
          }
        };
        _createClass(GImage, [{
          key: "color",
          get: function get() {
            return this._content.color;
          },
          set: function set(value) {
            this._content.color = value;
            this.updateGear(4);
          }
        }, {
          key: "flip",
          get: function get() {
            return this._content.flip;
          },
          set: function set(value) {
            this._content.flip = value;
          }
        }, {
          key: "fillMethod",
          get: function get() {
            return this._content.fillMethod;
          },
          set: function set(value) {
            this._content.fillMethod = value;
          }
        }, {
          key: "fillOrigin",
          get: function get() {
            return this._content.fillOrigin;
          },
          set: function set(value) {
            this._content.fillOrigin = value;
          }
        }, {
          key: "fillClockwise",
          get: function get() {
            return this._content.fillClockwise;
          },
          set: function set(value) {
            this._content.fillClockwise = value;
          }
        }, {
          key: "fillAmount",
          get: function get() {
            return this._content.fillAmount;
          },
          set: function set(value) {
            this._content.fillAmount = value;
          }
        }]);
        return GImage;
      }(GObject));
      var MovieClip = exports('MovieClip', /*#__PURE__*/function (_Image$) {
        _inheritsLoose(MovieClip, _Image$);
        function MovieClip() {
          var _this9;
          _this9 = _Image$.call(this) || this;
          _this9.interval = 0;
          _this9.swing = false;
          _this9.repeatDelay = 0;
          _this9.timeScale = 1;
          _this9._playing = true;
          _this9._frameCount = 0;
          _this9._frame = 0;
          _this9._start = 0;
          _this9._end = 0;
          _this9._times = 0;
          _this9._endAt = 0;
          _this9._status = 0; //0-none, 1-next loop, 2-ending, 3-ended
          _this9._smoothing = true;
          _this9._frameElapsed = 0; //当前帧延迟
          _this9._reversed = false;
          _this9._repeatedCount = 0;
          return _this9;
        }
        var _proto25 = MovieClip.prototype;
        _proto25.rewind = function rewind() {
          this._frame = 0;
          this._frameElapsed = 0;
          this._reversed = false;
          this._repeatedCount = 0;
          this.drawFrame();
        };
        _proto25.syncStatus = function syncStatus(anotherMc) {
          this._frame = anotherMc._frame;
          this._frameElapsed = anotherMc._frameElapsed;
          this._reversed = anotherMc._reversed;
          this._repeatedCount = anotherMc._repeatedCount;
          this.drawFrame();
        };
        _proto25.advance = function advance(timeInSeconds) {
          var beginFrame = this._frame;
          var beginReversed = this._reversed;
          var backupTime = timeInSeconds;
          while (true) {
            var tt = this.interval + this._frames[this._frame].addDelay;
            if (this._frame == 0 && this._repeatedCount > 0) tt += this.repeatDelay;
            if (timeInSeconds < tt) {
              this._frameElapsed = 0;
              break;
            }
            timeInSeconds -= tt;
            if (this.swing) {
              if (this._reversed) {
                this._frame--;
                if (this._frame <= 0) {
                  this._frame = 0;
                  this._repeatedCount++;
                  this._reversed = !this._reversed;
                }
              } else {
                this._frame++;
                if (this._frame > this._frameCount - 1) {
                  this._frame = Math.max(0, this._frameCount - 2);
                  this._repeatedCount++;
                  this._reversed = !this._reversed;
                }
              }
            } else {
              this._frame++;
              if (this._frame > this._frameCount - 1) {
                this._frame = 0;
                this._repeatedCount++;
              }
            }
            if (this._frame == beginFrame && this._reversed == beginReversed)
              //走了一轮了
              {
                var roundTime = backupTime - timeInSeconds; //这就是一轮需要的时间
                timeInSeconds -= Math.floor(timeInSeconds / roundTime) * roundTime; //跳过
              }
          }
          this.drawFrame();
        } //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        ;
        _proto25.setPlaySettings = function setPlaySettings(start, end, times, endAt, endCallback) {
          if (start == undefined) start = 0;
          if (end == undefined) end = -1;
          if (times == undefined) times = 0;
          if (endAt == undefined) endAt = -1;
          this._start = start;
          this._end = end;
          if (this._end == -1 || this._end > this._frameCount - 1) this._end = this._frameCount - 1;
          this._times = times;
          this._endAt = endAt;
          if (this._endAt == -1) this._endAt = this._end;
          this._status = 0;
          this._callback = endCallback;
          this.frame = start;
        };
        _proto25.update = function update(dt) {
          if (!this._playing || this._frameCount == 0 || this._status == 3) return;
          if (this.timeScale != 1) dt *= this.timeScale;
          this._frameElapsed += dt;
          var tt = this.interval + this._frames[this._frame].addDelay;
          if (this._frame == 0 && this._repeatedCount > 0) tt += this.repeatDelay;
          if (this._frameElapsed < tt) return;
          this._frameElapsed -= tt;
          if (this._frameElapsed > this.interval) this._frameElapsed = this.interval;
          if (this.swing) {
            if (this._reversed) {
              this._frame--;
              if (this._frame <= 0) {
                this._frame = 0;
                this._repeatedCount++;
                this._reversed = !this._reversed;
              }
            } else {
              this._frame++;
              if (this._frame > this._frameCount - 1) {
                this._frame = Math.max(0, this._frameCount - 2);
                this._repeatedCount++;
                this._reversed = !this._reversed;
              }
            }
          } else {
            this._frame++;
            if (this._frame > this._frameCount - 1) {
              this._frame = 0;
              this._repeatedCount++;
            }
          }
          if (this._status == 1)
            //new loop
            {
              this._frame = this._start;
              this._frameElapsed = 0;
              this._status = 0;
            } else if (this._status == 2)
            //ending
            {
              this._frame = this._endAt;
              this._frameElapsed = 0;
              this._status = 3; //ended
              //play end
              if (this._callback != null) {
                var callback = this._callback;
                this._callback = null;
                callback();
              }
            } else {
            if (this._frame == this._end) {
              if (this._times > 0) {
                this._times--;
                if (this._times == 0) this._status = 2; //ending
                else this._status = 1; //new loop
              } else if (this._start != 0) this._status = 1; //new loop
            }
          }
          this.drawFrame();
        };
        _proto25.drawFrame = function drawFrame() {
          if (this._frameCount > 0 && this._frame < this._frames.length) {
            var frame = this._frames[this._frame];
            this.spriteFrame = frame.texture;
          }
        };
        _createClass(MovieClip, [{
          key: "frames",
          get: function get() {
            return this._frames;
          },
          set: function set(value) {
            this._frames = value;
            if (this._frames) {
              this._frameCount = this._frames.length;
              if (this._end == -1 || this._end > this._frameCount - 1) this._end = this._frameCount - 1;
              if (this._endAt == -1 || this._endAt > this._frameCount - 1) this._endAt = this._frameCount - 1;
              if (this._frame < 0 || this._frame > this._frameCount - 1) this._frame = this._frameCount - 1;
              this.type = Sprite.Type.SIMPLE;
              this.drawFrame();
              this._frameElapsed = 0;
              this._repeatedCount = 0;
              this._reversed = false;
            } else {
              this._frameCount = 0;
            }
          }
        }, {
          key: "frameCount",
          get: function get() {
            return this._frameCount;
          }
        }, {
          key: "frame",
          get: function get() {
            return this._frame;
          },
          set: function set(value) {
            if (this._frame != value) {
              if (this._frames && value >= this._frameCount) value = this._frameCount - 1;
              this._frame = value;
              this._frameElapsed = 0;
              this.drawFrame();
            }
          }
        }, {
          key: "playing",
          get: function get() {
            return this._playing;
          },
          set: function set(value) {
            if (this._playing != value) {
              this._playing = value;
            }
          }
        }, {
          key: "smoothing",
          get: function get() {
            return this._smoothing;
          },
          set: function set(value) {
            this._smoothing = value;
          }
        }]);
        return MovieClip;
      }(Image$1));
      var GMovieClip = exports('GMovieClip', /*#__PURE__*/function (_GObject4) {
        _inheritsLoose(GMovieClip, _GObject4);
        function GMovieClip() {
          var _this10;
          _this10 = _GObject4.call(this) || this;
          _this10._node.name = "GMovieClip";
          _this10._touchDisabled = true;
          _this10._content = _this10._node.addComponent(MovieClip);
          _this10._content.sizeMode = Sprite.SizeMode.CUSTOM;
          _this10._content.trim = false;
          _this10._content.setPlaySettings();
          return _this10;
        }
        var _proto26 = GMovieClip.prototype;
        _proto26.rewind = function rewind() {
          this._content.rewind();
        };
        _proto26.syncStatus = function syncStatus(anotherMc) {
          this._content.syncStatus(anotherMc._content);
        };
        _proto26.advance = function advance(timeInSeconds) {
          this._content.advance(timeInSeconds);
        } //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        ;
        _proto26.setPlaySettings = function setPlaySettings(start, end, times, endAt, endCallback) {
          this._content.setPlaySettings(start, end, times, endAt, endCallback);
        };
        _proto26.handleGrayedChanged = function handleGrayedChanged() {
          this._content.grayscale = this._grayed;
        };
        _proto26.handleSizeChanged = function handleSizeChanged() {
          _GObject4.prototype.handleSizeChanged.call(this); //不知道原因，尺寸改变必须调用一次这个，否则大小不对
          this._content.sizeMode = Sprite.SizeMode.CUSTOM;
        };
        _proto26.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.color;
            case ObjectPropID.Playing:
              return this.playing;
            case ObjectPropID.Frame:
              return this.frame;
            case ObjectPropID.TimeScale:
              return this.timeScale;
            default:
              return _GObject4.prototype.getProp.call(this, index);
          }
        };
        _proto26.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.color = value;
              break;
            case ObjectPropID.Playing:
              this.playing = value;
              break;
            case ObjectPropID.Frame:
              this.frame = value;
              break;
            case ObjectPropID.TimeScale:
              this.timeScale = value;
              break;
            case ObjectPropID.DeltaTime:
              this.advance(value);
              break;
            default:
              _GObject4.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto26.constructFromResource = function constructFromResource() {
          var contentItem = this.packageItem.getBranch();
          this.sourceWidth = contentItem.width;
          this.sourceHeight = contentItem.height;
          this.initWidth = this.sourceWidth;
          this.initHeight = this.sourceHeight;
          this.setSize(this.sourceWidth, this.sourceHeight);
          contentItem = contentItem.getHighResolution();
          contentItem.load();
          this._content.interval = contentItem.interval;
          this._content.swing = contentItem.swing;
          this._content.repeatDelay = contentItem.repeatDelay;
          this._content.frames = contentItem.frames;
          this._content.smoothing = contentItem.smoothing;
        };
        _proto26.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject4.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          if (buffer.readBool()) this.color = buffer.readColor();
          buffer.readByte(); //flip
          this._content.frame = buffer.readInt();
          this._content.playing = buffer.readBool();
        };
        _createClass(GMovieClip, [{
          key: "color",
          get: function get() {
            return this._content.color;
          },
          set: function set(value) {
            this._content.color = value;
            this.updateGear(4);
          }
        }, {
          key: "playing",
          get: function get() {
            return this._content.playing;
          },
          set: function set(value) {
            if (this._content.playing != value) {
              this._content.playing = value;
              this.updateGear(5);
            }
          }
        }, {
          key: "frame",
          get: function get() {
            return this._content.frame;
          },
          set: function set(value) {
            if (this._content.frame != value) {
              this._content.frame = value;
              this.updateGear(5);
            }
          }
        }, {
          key: "timeScale",
          get: function get() {
            return this._content.timeScale;
          },
          set: function set(value) {
            this._content.timeScale = value;
          }
        }]);
        return GMovieClip;
      }(GObject));
      var UIContentScaler = function UIContentScaler() {};
      UIContentScaler.scaleFactor = 1;
      UIContentScaler.scaleLevel = 0;
      UIContentScaler.rootSize = new Size();
      function updateScaler() {
        var size = screen.windowSize;
        size.width /= view.getScaleX();
        size.height /= view.getScaleY();
        UIContentScaler.rootSize.set(size);
        var ss = Math.max(view.getScaleX(), view.getScaleY());
        UIContentScaler.scaleFactor = ss;
        if (ss >= 3.5) UIContentScaler.scaleLevel = 3; //x4
        else if (ss >= 2.5) UIContentScaler.scaleLevel = 2; //x3
        else if (ss >= 1.5) UIContentScaler.scaleLevel = 1; //x2
        else UIContentScaler.scaleLevel = 0;
      }
      var PackageItem = exports('PackageItem', /*#__PURE__*/function () {
        function PackageItem() {
          this.width = 0;
          this.height = 0;
        }
        var _proto27 = PackageItem.prototype;
        _proto27.load = function load() {
          return this.owner.getItemAsset(this);
        };
        _proto27.getBranch = function getBranch() {
          if (this.branches && this.owner._branchIndex != -1) {
            var itemId = this.branches[this.owner._branchIndex];
            if (itemId) return this.owner.getItemById(itemId);
          }
          return this;
        };
        _proto27.getHighResolution = function getHighResolution() {
          if (this.highResolution && UIContentScaler.scaleLevel > 0) {
            var itemId = this.highResolution[UIContentScaler.scaleLevel - 1];
            if (itemId) return this.owner.getItemById(itemId);
          }
          return this;
        };
        _proto27.toString = function toString() {
          return this.name;
        };
        return PackageItem;
      }());
      var TranslationHelper = exports('TranslationHelper', /*#__PURE__*/function () {
        function TranslationHelper() {}
        TranslationHelper.loadFromXML = function loadFromXML(source) {
          TranslationHelper.strings = {};
          var strings = TranslationHelper.strings;
          var xml = new DOMParser().parseFromString(source, "text/xml").documentElement;
          var nodes = xml.childNodes;
          var length1 = nodes.length;
          for (var i1 = 0; i1 < length1; i1++) {
            var cxml = nodes[i1];
            if (cxml.tagName == "string") {
              var key = cxml.getAttribute("name");
              var text = cxml.childNodes.length > 0 ? cxml.firstChild.nodeValue : "";
              var i = key.indexOf("-");
              if (i == -1) continue;
              var key2 = key.substring(0, i);
              var key3 = key.substring(i + 1);
              var col = strings[key2];
              if (!col) {
                col = {};
                strings[key2] = col;
              }
              col[key3] = text;
            }
          }
        };
        TranslationHelper.translateComponent = function translateComponent(item) {
          if (TranslationHelper.strings == null) return;
          var compStrings = TranslationHelper.strings[item.owner.id + item.id];
          if (compStrings == null) return;
          var elementId, value;
          var buffer = item.rawData;
          var nextPos;
          var itemCount;
          var i, j, k;
          var dataLen;
          var curPos;
          var valueCnt;
          var page;
          buffer.seek(0, 2);
          var childCount = buffer.readShort();
          for (i = 0; i < childCount; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.position;
            buffer.seek(curPos, 0);
            var baseType = buffer.readByte();
            var type = baseType;
            buffer.skip(4);
            elementId = buffer.readS();
            if (type == ObjectType.Component) {
              if (buffer.seek(curPos, 6)) type = buffer.readByte();
            }
            buffer.seek(curPos, 1);
            if ((value = compStrings[elementId + "-tips"]) != null) buffer.writeS(value);
            buffer.seek(curPos, 2);
            var gearCnt = buffer.readShort();
            for (j = 0; j < gearCnt; j++) {
              nextPos = buffer.readShort();
              nextPos += buffer.position;
              if (buffer.readByte() == 6)
                //gearText
                {
                  buffer.skip(2); //controller
                  valueCnt = buffer.readShort();
                  for (k = 0; k < valueCnt; k++) {
                    page = buffer.readS();
                    if (page != null) {
                      if ((value = compStrings[elementId + "-texts_" + k]) != null) buffer.writeS(value);else buffer.skip(2);
                    }
                  }
                  if (buffer.readBool() && (value = compStrings[elementId + "-texts_def"]) != null) buffer.writeS(value);
                }
              buffer.position = nextPos;
            }
            if (baseType == ObjectType.Component && buffer.version >= 2) {
              buffer.seek(curPos, 4);
              buffer.skip(2); //pageController
              buffer.skip(4 * buffer.readShort());
              var cpCount = buffer.readShort();
              for (var k = 0; k < cpCount; k++) {
                var target = buffer.readS();
                var propertyId = buffer.readShort();
                if (propertyId == 0 && (value = compStrings[elementId + "-cp-" + target]) != null) buffer.writeS(value);else buffer.skip(2);
              }
            }
            switch (type) {
              case ObjectType.Text:
              case ObjectType.RichText:
              case ObjectType.InputText:
                {
                  if ((value = compStrings[elementId]) != null) {
                    buffer.seek(curPos, 6);
                    buffer.writeS(value);
                  }
                  if ((value = compStrings[elementId + "-prompt"]) != null) {
                    buffer.seek(curPos, 4);
                    buffer.writeS(value);
                  }
                  break;
                }
              case ObjectType.List:
              case ObjectType.Tree:
                {
                  buffer.seek(curPos, 8);
                  buffer.skip(2);
                  itemCount = buffer.readShort();
                  for (j = 0; j < itemCount; j++) {
                    nextPos = buffer.readShort();
                    nextPos += buffer.position;
                    buffer.skip(2); //url
                    if (type == ObjectType.Tree) buffer.skip(2); //title
                    if ((value = compStrings[elementId + "-" + j]) != null) buffer.writeS(value);else buffer.skip(2); //selected title
                    if ((value = compStrings[elementId + "-" + j + "-0"]) != null) buffer.writeS(value);else buffer.skip(2);
                    if (buffer.version >= 2) {
                      buffer.skip(6);
                      buffer.skip(buffer.readUshort() * 4); //controllers
                      var cpCount = buffer.readUshort();
                      for (var k = 0; k < cpCount; k++) {
                        var target = buffer.readS();
                        var propertyId = buffer.readUshort();
                        if (propertyId == 0 && (value = compStrings[elementId + "-" + j + "-" + target]) != null) buffer.writeS(value);else buffer.skip(2);
                      }
                    }
                    buffer.position = nextPos;
                  }
                  break;
                }
              case ObjectType.Label:
                {
                  if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                    if ((value = compStrings[elementId]) != null) buffer.writeS(value);else buffer.skip(2);
                    buffer.skip(2);
                    if (buffer.readBool()) buffer.skip(4);
                    buffer.skip(4);
                    if (buffer.readBool() && (value = compStrings[elementId + "-prompt"]) != null) buffer.writeS(value);
                  }
                  break;
                }
              case ObjectType.Button:
                {
                  if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                    if ((value = compStrings[elementId]) != null) buffer.writeS(value);else buffer.skip(2);
                    if ((value = compStrings[elementId + "-0"]) != null) buffer.writeS(value);
                  }
                  break;
                }
              case ObjectType.ComboBox:
                {
                  if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                    itemCount = buffer.readShort();
                    for (j = 0; j < itemCount; j++) {
                      nextPos = buffer.readShort();
                      nextPos += buffer.position;
                      if ((value = compStrings[elementId + "-" + j]) != null) buffer.writeS(value);
                      buffer.position = nextPos;
                    }
                    if ((value = compStrings[elementId]) != null) buffer.writeS(value);
                  }
                  break;
                }
            }
            buffer.position = curPos + dataLen;
          }
        };
        return TranslationHelper;
      }());
      var ByteBuffer = exports('ByteBuffer', /*#__PURE__*/function () {
        function ByteBuffer(buffer, offset, length) {
          this.version = 0;
          offset = offset || 0;
          if (length == null || length == -1) length = buffer.byteLength - offset;
          this._bytes = new Uint8Array(buffer, offset, length);
          this._view = new DataView(this._bytes.buffer, offset, length);
          this._pos = 0;
          this._length = length;
        }
        var _proto28 = ByteBuffer.prototype;
        _proto28.skip = function skip(count) {
          this._pos += count;
        };
        _proto28.validate = function validate(forward) {
          if (this._pos + forward > this._length) throw new Error("Out of bounds");
        };
        _proto28.readByte = function readByte() {
          this.validate(1);
          return this._view.getUint8(this._pos++);
        };
        _proto28.readBool = function readBool() {
          return this.readByte() == 1;
        };
        _proto28.readShort = function readShort() {
          this.validate(2);
          var ret = this._view.getInt16(this._pos, this.littleEndian);
          this._pos += 2;
          return ret;
        };
        _proto28.readUshort = function readUshort() {
          this.validate(2);
          var ret = this._view.getUint16(this._pos, this.littleEndian);
          this._pos += 2;
          return ret;
        };
        _proto28.readInt = function readInt() {
          this.validate(4);
          var ret = this._view.getInt32(this._pos, this.littleEndian);
          this._pos += 4;
          return ret;
        };
        _proto28.readUint = function readUint() {
          this.validate(4);
          var ret = this._view.getUint32(this._pos, this.littleEndian);
          this._pos += 4;
          return ret;
        };
        _proto28.readFloat = function readFloat() {
          this.validate(4);
          var ret = this._view.getFloat32(this._pos, this.littleEndian);
          this._pos += 4;
          return ret;
        };
        _proto28.readString = function readString(len) {
          if (len == undefined) len = this.readUshort();
          this.validate(len);
          var v = "",
            max = this._pos + len,
            c = 0,
            c2 = 0,
            c3 = 0,
            f = String.fromCharCode;
          var u = this._bytes;
          var pos = this._pos;
          while (pos < max) {
            c = u[pos++];
            if (c < 0x80) {
              if (c != 0) {
                v += f(c);
              }
            } else if (c < 0xE0) {
              v += f((c & 0x3F) << 6 | u[pos++] & 0x7F);
            } else if (c < 0xF0) {
              c2 = u[pos++];
              v += f((c & 0x1F) << 12 | (c2 & 0x7F) << 6 | u[pos++] & 0x7F);
            } else {
              c2 = u[pos++];
              c3 = u[pos++];
              v += f((c & 0x0F) << 18 | (c2 & 0x7F) << 12 | c3 << 6 & 0x7F | u[pos++] & 0x7F);
            }
          }
          this._pos += len;
          return v;
        };
        _proto28.readS = function readS() {
          var index = this.readUshort();
          if (index == 65534)
            //null
            return null;else if (index == 65533) return "";else return this.stringTable[index];
        };
        _proto28.readSArray = function readSArray(cnt) {
          var ret = new Array(cnt);
          for (var i = 0; i < cnt; i++) ret[i] = this.readS();
          return ret;
        };
        _proto28.writeS = function writeS(value) {
          var index = this.readUshort();
          if (index != 65534 && index != 65533) this.stringTable[index] = value;
        };
        _proto28.readColor = function readColor(hasAlpha) {
          var r = this.readByte();
          var g = this.readByte();
          var b = this.readByte();
          var a = this.readByte();
          return new Color(r, g, b, hasAlpha ? a : 255);
        };
        _proto28.readChar = function readChar() {
          var i = this.readUshort();
          return String.fromCharCode(i);
        };
        _proto28.readBuffer = function readBuffer() {
          var count = this.readUint();
          this.validate(count);
          var ba = new ByteBuffer(this._bytes.buffer, this._bytes.byteOffset + this._pos, count);
          ba.stringTable = this.stringTable;
          ba.version = this.version;
          this._pos += count;
          return ba;
        };
        _proto28.seek = function seek(indexTablePos, blockIndex) {
          var tmp = this._pos;
          this._pos = indexTablePos;
          var segCount = this.readByte();
          if (blockIndex < segCount) {
            var useShort = this.readByte() == 1;
            var newPos;
            if (useShort) {
              this._pos += 2 * blockIndex;
              newPos = this.readUshort();
            } else {
              this._pos += 4 * blockIndex;
              newPos = this.readUint();
            }
            if (newPos > 0) {
              this._pos = indexTablePos + newPos;
              return true;
            } else {
              this._pos = tmp;
              return false;
            }
          } else {
            this._pos = tmp;
            return false;
          }
        };
        _createClass(ByteBuffer, [{
          key: "data",
          get: function get() {
            return this._bytes;
          }
        }, {
          key: "position",
          get: function get() {
            return this._pos;
          },
          set: function set(value) {
            if (value > this._length) throw new Error("Out of bounds");
            this._pos = value;
          }
        }]);
        return ByteBuffer;
      }());
      var PixelHitTest = exports('PixelHitTest', /*#__PURE__*/function () {
        function PixelHitTest(data, offsetX, offsetY) {
          this._data = data;
          this.offsetX = offsetX == undefined ? 0 : offsetX;
          this.offsetY = offsetY == undefined ? 0 : offsetY;
          this.scaleX = 1;
          this.scaleY = 1;
        }
        var _proto29 = PixelHitTest.prototype;
        _proto29.hitTest = function hitTest(pt) {
          var x = Math.floor((pt.x / this.scaleX - this.offsetX) * this._data.scale);
          var y = Math.floor((pt.y / this.scaleY - this.offsetY) * this._data.scale);
          if (x < 0 || y < 0 || x >= this._data.pixelWidth) return false;
          var pos = y * this._data.pixelWidth + x;
          var pos2 = Math.floor(pos / 8);
          var pos3 = pos % 8;
          if (pos2 >= 0 && pos2 < this._data.pixels.length) return (this._data.pixels[pos2] >> pos3 & 0x1) == 1;else return false;
        };
        return PixelHitTest;
      }());
      var PixelHitTestData = function PixelHitTestData(ba) {
        ba.readInt();
        this.pixelWidth = ba.readInt();
        this.scale = 1 / ba.readByte();
        this.pixels = ba.readBuffer().data;
      };
      var ChildHitArea = /*#__PURE__*/function () {
        function ChildHitArea(child) {
          this._child = child;
        }
        var _proto30 = ChildHitArea.prototype;
        _proto30.hitTest = function hitTest(pt, globalPt) {
          return this._child.hitTest(globalPt, false) != null;
        };
        return ChildHitArea;
      }();
      var PathUtils = path;
      var UIPackage = exports('UIPackage', /*#__PURE__*/function () {
        function UIPackage() {
          this._items = [];
          this._itemsById = {};
          this._itemsByName = {};
          this._sprites = {};
          this._dependencies = [];
          this._branches = [];
          this._branchIndex = -1;
        }
        UIPackage.getVar = function getVar(key) {
          return _vars[key];
        };
        UIPackage.setVar = function setVar(key, value) {
          _vars[key] = value;
        };
        UIPackage.getById = function getById(id) {
          return _instById[id];
        };
        UIPackage.getByName = function getByName(name) {
          return _instByName[name];
        } /**
          * 注册一个包。包的所有资源必须放在resources下，且已经预加载。
          * @param path 相对 resources 的路径。
          */;
        UIPackage.addPackage = function addPackage(path) {
          var pkg = _instById[path];
          if (pkg) return pkg;
          var asset = resources.get(path, BufferAsset);
          if (!asset) throw new Error("Resource '" + path + "' not ready");
          var buffer = asset.buffer();
          if (!buffer) throw new Error("Missing asset data.");
          pkg = new UIPackage();
          pkg._bundle = resources;
          pkg.loadPackage(new ByteBuffer(buffer), path);
          _instById[pkg.id] = pkg;
          _instByName[pkg.name] = pkg;
          _instById[pkg._path] = pkg;
          return pkg;
        };
        UIPackage.loadPackage = function loadPackage() {
          var path;
          var onProgress;
          var onComplete;
          var bundle;
          if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof AssetManager.Bundle) {
            bundle = arguments.length <= 0 ? undefined : arguments[0];
            path = arguments.length <= 1 ? undefined : arguments[1];
            if (arguments.length > 3) {
              onProgress = arguments.length <= 2 ? undefined : arguments[2];
              onComplete = arguments.length <= 3 ? undefined : arguments[3];
            } else onComplete = arguments.length <= 2 ? undefined : arguments[2];
          } else {
            path = arguments.length <= 0 ? undefined : arguments[0];
            if (arguments.length > 2) {
              onProgress = arguments.length <= 1 ? undefined : arguments[1];
              onComplete = arguments.length <= 2 ? undefined : arguments[2];
            } else onComplete = arguments.length <= 1 ? undefined : arguments[1];
          }
          bundle = bundle || resources; // 统一进度管理：主包占20%，子资源占80%
          var MAIN_PACKAGE_WEIGHT = 0.2; // 主包占总进度的20%
          var RESOURCES_WEIGHT = 0.8; // 子资源占总进度的80%
          var mainPackageProgress = {
            finish: 0,
            total: 1,
            completed: false
          };
          var resourceProgressMap = new Map();
          var resourcesInitialized = false; // 标记子资源是否已初始化
          var updateUnifiedProgress = function updateUnifiedProgress() {
            if (onProgress) {
              var mainProgress = 0;
              var resourcesProgress = 0; // 计算主包进度 (0-20%)
              if (mainPackageProgress.completed) {
                mainProgress = MAIN_PACKAGE_WEIGHT;
              } else {
                mainProgress = MAIN_PACKAGE_WEIGHT * (mainPackageProgress.finish / mainPackageProgress.total);
              } // 计算子资源进度 (0-80%)
              if (resourcesInitialized && resourceProgressMap.size > 0) {
                var resourceTotalFinish = 0;
                var resourceTotalCount = 0;
                resourceProgressMap.forEach(function (progress) {
                  if (progress.completed) {
                    resourceTotalFinish += progress.total;
                    resourceTotalCount += progress.total;
                  } else {
                    resourceTotalFinish += progress.finish;
                    resourceTotalCount += progress.total;
                  }
                });
                if (resourceTotalCount > 0) {
                  resourcesProgress = RESOURCES_WEIGHT * (resourceTotalFinish / resourceTotalCount);
                }
              } else if (mainPackageProgress.completed && resourceProgressMap.size === 0) {
                // 如果主包完成且没有子资源，子资源进度为满
                resourcesProgress = RESOURCES_WEIGHT;
              } // 总进度 = 主包进度 + 子资源进度
              var totalProgress = mainProgress + resourcesProgress; // 调用进度回调，使用百分比形式 (0-100)
              onProgress(Math.round(totalProgress * 100), 100, null);
            }
          }; // 主包加载进度回调
          var mainPackageProgressCallback = onProgress ? function (finish, total, item) {
            mainPackageProgress.finish = finish;
            mainPackageProgress.total = total;
            updateUnifiedProgress();
          } : null;
          bundle.load(path, Asset, mainPackageProgressCallback, function (err, asset) {
            if (err) {
              if (onComplete != null) onComplete(err, null);
              return;
            } // 标记主包加载完成
            mainPackageProgress.completed = true;
            mainPackageProgress.finish = mainPackageProgress.total;
            var pkg = new UIPackage();
            pkg._bundle = bundle;
            var buffer = asset.buffer ? asset.buffer() : asset._nativeAsset;
            pkg.loadPackage(new ByteBuffer(buffer), path);
            var cnt = pkg._items.length;
            var urls = [];
            for (var i = 0; i < cnt; i++) {
              var pi = pkg._items[i];
              if (pi.type == PackageItemType.Atlas || pi.type == PackageItemType.Sound) {
                ItemTypeToAssetType[pi.type];
                urls.push(pi.file);
              }
            }
            var total = urls.length;
            var lastErr;
            var loadedCount = 0; // 初始化所有子资源的进度记录
            urls.forEach(function (url) {
              resourceProgressMap.set(url, {
                finish: 0,
                total: 1,
                completed: false
              });
            }); // 标记子资源已初始化
            resourcesInitialized = true; // 更新进度（主包完成20% + 子资源初始化0%）
            updateUnifiedProgress();
            var taskComplete = function taskComplete(err, asset, url) {
              loadedCount++;
              if (err) lastErr = err; // 标记任务为已完成，但不删除记录
              if (url && resourceProgressMap.has(url)) {
                var progress = resourceProgressMap.get(url);
                progress.completed = true;
                progress.finish = progress.total; // 确保完成时进度为100%
                resourceProgressMap.set(url, progress);
                updateUnifiedProgress(); // 更新统一进度
              }
              if (loadedCount >= total) {
                _instById[pkg.id] = pkg;
                _instByName[pkg.name] = pkg;
                if (pkg._path) _instById[pkg._path] = pkg;
                if (onComplete != null) onComplete(lastErr, pkg);
              }
            };
            if (total > 0) {
              urls.forEach(function (url, index) {
                var urlProgress = function urlProgress(finish, total, item) {
                  // 更新当前URL的进度（仅在未完成时）
                  if (resourceProgressMap.has(url)) {
                    var progress = resourceProgressMap.get(url);
                    if (!progress.completed) {
                      progress.finish = finish;
                      progress.total = total;
                      resourceProgressMap.set(url, progress);
                      updateUnifiedProgress();
                    }
                  }
                };
                var urlComplete = function urlComplete(err, asset) {
                  taskComplete(err, asset, url);
                };
                bundle.load(url, Asset, onProgress ? urlProgress : null, urlComplete);
              });
            } else taskComplete(null);
          });
        };
        UIPackage.removePackage = function removePackage(packageIdOrName) {
          var pkg = _instById[packageIdOrName];
          if (!pkg) pkg = _instByName[packageIdOrName];
          if (!pkg) throw new Error("No package found: " + packageIdOrName);
          pkg.dispose();
          delete _instById[pkg.id];
          delete _instByName[pkg.name];
          if (pkg._path) delete _instById[pkg._path];
        };
        UIPackage.createObject = function createObject(pkgName, resName, userClass) {
          var pkg = UIPackage.getByName(pkgName);
          if (pkg) return pkg.createObject(resName, userClass);else return null;
        };
        UIPackage.createObjectFromURL = function createObjectFromURL(url, userClass) {
          var pi = UIPackage.getItemByURL(url);
          if (pi) return pi.owner.internalCreateObject(pi, userClass);else return null;
        };
        UIPackage.getItemURL = function getItemURL(pkgName, resName) {
          var pkg = UIPackage.getByName(pkgName);
          if (!pkg) return null;
          var pi = pkg._itemsByName[resName];
          if (!pi) return null;
          return "ui://" + pkg.id + pi.id;
        };
        UIPackage.getItemByURL = function getItemByURL(url) {
          var pos1 = url.indexOf("//");
          if (pos1 == -1) return null;
          var pos2 = url.indexOf("/", pos1 + 2);
          if (pos2 == -1) {
            if (url.length > 13) {
              var pkgId = url.substring(5, 13);
              var pkg = UIPackage.getById(pkgId);
              if (pkg != null) {
                var srcId = url.substring(13);
                return pkg.getItemById(srcId);
              }
            }
          } else {
            var pkgName = url.substring(pos1 + 2, pos2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg != null) {
              var srcName = url.substring(pos2 + 1);
              return pkg.getItemByName(srcName);
            }
          }
          return null;
        };
        UIPackage.normalizeURL = function normalizeURL(url) {
          if (url == null) return null;
          var pos1 = url.indexOf("//");
          if (pos1 == -1) return null;
          var pos2 = url.indexOf("/", pos1 + 2);
          if (pos2 == -1) return url;
          var pkgName = url.substring(pos1 + 2, pos2);
          var srcName = url.substring(pos2 + 1);
          return UIPackage.getItemURL(pkgName, srcName);
        };
        UIPackage.setStringsSource = function setStringsSource(source) {
          TranslationHelper.loadFromXML(source);
        };
        var _proto31 = UIPackage.prototype;
        _proto31.loadPackage = function loadPackage(buffer, path) {
          if (buffer.readUint() != 0x46475549) throw new Error("FairyGUI: old package format found in '" + path + "'");
          this._path = path;
          buffer.version = buffer.readInt();
          var ver2 = buffer.version >= 2;
          buffer.readBool();
          this._id = buffer.readString();
          this._name = buffer.readString();
          buffer.skip(20);
          var indexTablePos = buffer.position;
          var cnt;
          var i;
          var nextPos;
          var str;
          var branchIncluded;
          buffer.seek(indexTablePos, 4);
          cnt = buffer.readInt();
          var stringTable = new Array(cnt);
          buffer.stringTable = stringTable;
          for (i = 0; i < cnt; i++) stringTable[i] = buffer.readString();
          if (buffer.seek(indexTablePos, 5)) {
            cnt = buffer.readInt();
            for (i = 0; i < cnt; i++) {
              var index = buffer.readUshort();
              var len = buffer.readInt();
              stringTable[index] = buffer.readString(len);
            }
          }
          buffer.seek(indexTablePos, 0);
          cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) this._dependencies.push({
            id: buffer.readS(),
            name: buffer.readS()
          });
          if (ver2) {
            cnt = buffer.readShort();
            if (cnt > 0) {
              this._branches = buffer.readSArray(cnt);
              if (_branch) this._branchIndex = this._branches.indexOf(_branch);
            }
            branchIncluded = cnt > 0;
          }
          buffer.seek(indexTablePos, 1);
          var pi;
          var pos = path.lastIndexOf('/');
          var shortPath = pos == -1 ? "" : path.substring(0, pos + 1);
          path = path + "_";
          cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt();
            nextPos += buffer.position;
            pi = new PackageItem();
            pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            buffer.readS(); //path
            pi.file = buffer.readS();
            buffer.readBool(); //exported
            pi.width = buffer.readInt();
            pi.height = buffer.readInt();
            switch (pi.type) {
              case PackageItemType.Image:
                {
                  pi.objectType = ObjectType.Image;
                  var scaleOption = buffer.readByte();
                  if (scaleOption == 1) {
                    pi.scale9Grid = new Rect();
                    pi.scale9Grid.x = buffer.readInt();
                    pi.scale9Grid.y = buffer.readInt();
                    pi.scale9Grid.width = buffer.readInt();
                    pi.scale9Grid.height = buffer.readInt();
                    pi.tileGridIndice = buffer.readInt();
                  } else if (scaleOption == 2) pi.scaleByTile = true;
                  pi.smoothing = buffer.readBool();
                  break;
                }
              case PackageItemType.MovieClip:
                {
                  pi.smoothing = buffer.readBool();
                  pi.objectType = ObjectType.MovieClip;
                  pi.rawData = buffer.readBuffer();
                  break;
                }
              case PackageItemType.Font:
                {
                  pi.rawData = buffer.readBuffer();
                  break;
                }
              case PackageItemType.Component:
                {
                  var extension = buffer.readByte();
                  if (extension > 0) pi.objectType = extension;else pi.objectType = ObjectType.Component;
                  pi.rawData = buffer.readBuffer();
                  Decls.UIObjectFactory.resolveExtension(pi);
                  break;
                }
              case PackageItemType.Atlas:
              case PackageItemType.Sound:
              case PackageItemType.Misc:
                {
                  pi.file = path + PathUtils.mainFileName(pi.file);
                  break;
                }
              case PackageItemType.Spine:
              case PackageItemType.DragonBones:
                {
                  pi.file = shortPath + PathUtils.mainFileName(pi.file);
                  pi.skeletonAnchor = new Vec2();
                  pi.skeletonAnchor.x = buffer.readFloat();
                  pi.skeletonAnchor.y = buffer.readFloat();
                  break;
                }
            }
            if (ver2) {
              str = buffer.readS(); //branch
              if (str) pi.name = str + "/" + pi.name;
              var branchCnt = buffer.readByte();
              if (branchCnt > 0) {
                if (branchIncluded) pi.branches = buffer.readSArray(branchCnt);else this._itemsById[buffer.readS()] = pi;
              }
              var highResCnt = buffer.readByte();
              if (highResCnt > 0) pi.highResolution = buffer.readSArray(highResCnt);
            }
            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            if (pi.name != null) this._itemsByName[pi.name] = pi;
            buffer.position = nextPos;
          }
          buffer.seek(indexTablePos, 2);
          cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            var itemId = buffer.readS();
            pi = this._itemsById[buffer.readS()];
            var rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            var sprite = {
              atlas: pi,
              rect: rect,
              offset: new Vec2(),
              originalSize: new Size(0, 0)
            };
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
              sprite.offset.x = buffer.readInt();
              sprite.offset.y = buffer.readInt();
              sprite.originalSize.width = buffer.readInt();
              sprite.originalSize.height = buffer.readInt();
            } else {
              sprite.originalSize.width = sprite.rect.width;
              sprite.originalSize.height = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;
            buffer.position = nextPos;
          }
          if (buffer.seek(indexTablePos, 3)) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
              nextPos = buffer.readInt();
              nextPos += buffer.position;
              pi = this._itemsById[buffer.readS()];
              if (pi && pi.type == PackageItemType.Image) pi.hitTestData = new PixelHitTestData(buffer);
              buffer.position = nextPos;
            }
          }
        };
        _proto31.dispose = function dispose() {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var pi = this._items[i];
            if (pi.asset) assetManager.releaseAsset(pi.asset);
          }
        };
        _proto31.createObject = function createObject(resName, userClass) {
          var pi = this._itemsByName[resName];
          if (pi) return this.internalCreateObject(pi, userClass);else return null;
        };
        _proto31.internalCreateObject = function internalCreateObject(item, userClass) {
          var g = Decls.UIObjectFactory.newObject(item, userClass);
          if (g == null) return null;
          constructingDepth.n++;
          g.constructFromResource();
          constructingDepth.n--;
          return g;
        };
        _proto31.getItemById = function getItemById(itemId) {
          return this._itemsById[itemId];
        };
        _proto31.getItemByName = function getItemByName(resName) {
          return this._itemsByName[resName];
        };
        _proto31.getItemAssetByName = function getItemAssetByName(resName) {
          var pi = this._itemsByName[resName];
          if (pi == null) {
            throw new Error("Resource not found -" + resName);
          }
          return this.getItemAsset(pi);
        };
        _proto31.getItemAsset = function getItemAsset(item) {
          switch (item.type) {
            case PackageItemType.Image:
              if (!item.decoded) {
                item.decoded = true;
                var sprite = this._sprites[item.id];
                if (sprite) {
                  var atlasTexture = this.getItemAsset(sprite.atlas);
                  if (atlasTexture) {
                    var sf = new SpriteFrame();
                    sf.texture = atlasTexture;
                    sf.rect = sprite.rect;
                    sf.rotated = sprite.rotated;
                    sf.offset = new Vec2(sprite.offset.x - (sprite.originalSize.width - sprite.rect.width) / 2, -(sprite.offset.y - (sprite.originalSize.height - sprite.rect.height) / 2));
                    sf.originalSize = sprite.originalSize;
                    if (item.scale9Grid) {
                      sf.insetLeft = item.scale9Grid.x;
                      sf.insetTop = item.scale9Grid.y;
                      sf.insetRight = item.width - item.scale9Grid.xMax;
                      sf.insetBottom = item.height - item.scale9Grid.yMax;
                    }
                    item.asset = sf;
                  }
                }
              }
              break;
            case PackageItemType.Atlas:
            case PackageItemType.Sound:
              if (!item.decoded) {
                item.decoded = true;
                item.asset = this._bundle.get(item.file, ItemTypeToAssetType[item.type]);
                if (!item.asset) console.log("Resource '" + item.file + "' not found");else if (item.type == PackageItemType.Atlas) {
                  var _asset = item.asset;
                  var tex = _asset['_texture'];
                  if (!tex) {
                    tex = new Texture2D();
                    tex.name = _asset.nativeUrl;
                    tex.image = _asset;
                  }
                  item.asset = tex;
                } else {
                  item.asset = item.asset;
                }
              }
              break;
            case PackageItemType.Font:
              if (!item.decoded) {
                item.decoded = true;
                this.loadFont(item);
              }
              break;
            case PackageItemType.MovieClip:
              if (!item.decoded) {
                item.decoded = true;
                this.loadMovieClip(item);
              }
              break;
          }
          return item.asset;
        };
        _proto31.getItemAssetAsync = function getItemAssetAsync(item, onComplete) {
          if (item.decoded) {
            onComplete(null, item);
            return;
          }
          if (item.loading) {
            item.loading.push(onComplete);
            return;
          }
          switch (item.type) {
            case PackageItemType.Spine:
              item.loading = [onComplete];
              this.loadSpine(item);
              break;
            case PackageItemType.DragonBones:
              item.loading = [onComplete];
              this.loadDragonBones(item);
              break;
            default:
              this.getItemAsset(item);
              onComplete(null, item);
              break;
          }
        };
        _proto31.loadAllAssets = function loadAllAssets() {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var pi = this._items[i];
            this.getItemAsset(pi);
          }
        };
        _proto31.loadMovieClip = function loadMovieClip(item) {
          var buffer = item.rawData;
          buffer.seek(0, 0);
          item.interval = buffer.readInt() / 1000;
          item.swing = buffer.readBool();
          item.repeatDelay = buffer.readInt() / 1000;
          buffer.seek(0, 1);
          var frameCount = buffer.readShort();
          item.frames = Array(frameCount);
          var spriteId;
          var sprite;
          for (var i = 0; i < frameCount; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.position;
            var rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            var addDelay = buffer.readInt() / 1000;
            var frame = {
              rect: rect,
              addDelay: addDelay,
              texture: null
            };
            spriteId = buffer.readS();
            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
              var atlasTexture = this.getItemAsset(sprite.atlas);
              if (atlasTexture) {
                item.width / frame.rect.width;
                var sf = new SpriteFrame();
                sf.texture = atlasTexture;
                sf.rect = sprite.rect;
                sf.rotated = sprite.rotated;
                sf.offset = new Vec2(frame.rect.x - (item.width - frame.rect.width) / 2, -(frame.rect.y - (item.height - frame.rect.height) / 2));
                sf.originalSize = new Size(item.width, item.height);
                frame.texture = sf;
              }
            }
            item.frames[i] = frame;
            buffer.position = nextPos;
          }
        };
        _proto31.loadFont = function loadFont(item) {
          var font = new BitmapFont();
          item.asset = font;
          font.fntConfig = {
            commonHeight: 0,
            fontSize: 0,
            kerningDict: {},
            fontDefDictionary: {}
          };
          var dict = font.fntConfig.fontDefDictionary;
          var buffer = item.rawData;
          buffer.seek(0, 0);
          var ttf = buffer.readBool();
          var canTint = buffer.readBool();
          var resizable = buffer.readBool();
          buffer.readBool(); //has channel
          var fontSize = buffer.readInt();
          var xadvance = buffer.readInt();
          var lineHeight = buffer.readInt();
          var mainTexture;
          var mainSprite = this._sprites[item.id];
          if (mainSprite) mainTexture = this.getItemAsset(mainSprite.atlas);
          buffer.seek(0, 1);
          var bg;
          var cnt = buffer.readInt();
          for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.position;
            bg = {};
            var ch = buffer.readUshort();
            dict[ch] = bg;
            var rect = new Rect();
            bg.rect = rect;
            var img = buffer.readS();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            bg.xOffset = buffer.readInt();
            bg.yOffset = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            bg.xAdvance = buffer.readInt();
            bg.channel = buffer.readByte();
            if (bg.channel == 1) bg.channel = 3;else if (bg.channel == 2) bg.channel = 2;else if (bg.channel == 3) bg.channel = 1;
            if (ttf) {
              rect.x += mainSprite.rect.x;
              rect.y += mainSprite.rect.y;
            } else {
              var sprite = this._sprites[img];
              if (sprite) {
                rect.set(sprite.rect);
                bg.xOffset += sprite.offset.x;
                bg.yOffset += sprite.offset.y;
                if (fontSize == 0) fontSize = sprite.originalSize.height;
                if (!mainTexture) {
                  sprite.atlas.load();
                  mainTexture = sprite.atlas.asset;
                }
              }
              if (bg.xAdvance == 0) {
                if (xadvance == 0) bg.xAdvance = bg.xOffset + bg.rect.width;else bg.xAdvance = xadvance;
              }
            }
            buffer.position = nextPos;
          }
          font.fontSize = fontSize;
          font.fntConfig.fontSize = fontSize;
          font.fntConfig.commonHeight = lineHeight == 0 ? fontSize : lineHeight;
          font.fntConfig.resizable = resizable;
          font.fntConfig.canTint = canTint;
          var spriteFrame = new SpriteFrame();
          spriteFrame.texture = mainTexture;
          font.spriteFrame = spriteFrame;
          font.onLoaded();
        };
        _proto31.loadSpine = function loadSpine(item) {
          this._bundle.load(item.file, sp.SkeletonData, function (err, asset) {
            item.decoded = true;
            item.asset = asset;
            var arr = item.loading;
            delete item.loading;
            arr.forEach(function (e) {
              return e(err, item);
            });
          });
        };
        _proto31.loadDragonBones = function loadDragonBones(item) {
          var _this11 = this;
          this._bundle.load(item.file, dragonBones.DragonBonesAsset, function (err, asset) {
            if (err) {
              item.decoded = true;
              var arr = item.loading;
              delete item.loading;
              arr.forEach(function (e) {
                return e(err, item);
              });
              return;
            }
            item.asset = asset;
            var atlasFile = item.file.replace("_ske", "_tex");
            var pos = atlasFile.lastIndexOf('.');
            if (pos != -1) atlasFile = atlasFile.substring(0, pos + 1) + "json";
            _this11._bundle.load(atlasFile, dragonBones.DragonBonesAtlasAsset, function (err, asset) {
              item.decoded = true;
              item.atlasAsset = asset;
              var arr = item.loading;
              delete item.loading;
              arr.forEach(function (e) {
                return e(err, item);
              });
            });
          });
        };
        _createClass(UIPackage, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "path",
          get: function get() {
            return this._path;
          }
        }, {
          key: "dependencies",
          get: function get() {
            return this._dependencies;
          }
        }], [{
          key: "branch",
          get: function get() {
            return _branch;
          },
          set: function set(value) {
            _branch = value;
            for (var pkgId in _instById) {
              var pkg = _instById[pkgId];
              if (pkg._branches) {
                pkg._branchIndex = pkg._branches.indexOf(value);
              }
            }
          }
        }]);
        return UIPackage;
      }());
      var ItemTypeToAssetType = (_ItemTypeToAssetType = {}, _ItemTypeToAssetType[PackageItemType.Atlas] = ImageAsset, _ItemTypeToAssetType[PackageItemType.Sound] = AudioClip, _ItemTypeToAssetType);
      var _instById = {};
      var _instByName = {};
      var _branch = "";
      var _vars = {};
      var Decls = {};
      function toGrayedColor(c) {
        var v = c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
        return new Color(v, v, v, c.a);
      }
      var UBBParser = exports('UBBParser', /*#__PURE__*/function () {
        function UBBParser() {
          this._readPos = 0;
          this._handlers = {};
          this._handlers["url"] = this.onTag_URL;
          this._handlers["img"] = this.onTag_IMG;
          this._handlers["b"] = this.onTag_Simple;
          this._handlers["i"] = this.onTag_Simple;
          this._handlers["u"] = this.onTag_Simple; //this._handlers["sup"] = this.onTag_Simple;
          //this._handlers["sub"] = this.onTag_Simple;
          this._handlers["color"] = this.onTag_COLOR; //this._handlers["font"] = this.onTag_FONT;
          this._handlers["size"] = this.onTag_SIZE;
        }
        var _proto32 = UBBParser.prototype;
        _proto32.onTag_URL = function onTag_URL(tagName, end, attr) {
          if (!end) {
            var ret;
            if (attr != null) ret = "<on click=\"onClickLink\" param=\"" + attr + "\">";else {
              var href = this.getTagText();
              ret = "<on click=\"onClickLink\" param=\"" + href + "\">";
            }
            if (this.linkUnderline) ret += "<u>";
            if (this.linkColor) ret += "<color=" + this.linkColor + ">";
            return ret;
          } else {
            var _ret = "";
            if (this.linkColor) _ret += "</color>";
            if (this.linkUnderline) _ret += "</u>";
            _ret += "</on>";
            return _ret;
          }
        };
        _proto32.onTag_IMG = function onTag_IMG(tagName, end, attr) {
          if (!end) {
            var src = this.getTagText(true);
            if (!src) return null;
            return "<img src=\"" + src + "\"/>";
          } else return null;
        };
        _proto32.onTag_Simple = function onTag_Simple(tagName, end, attr) {
          return end ? "</" + tagName + ">" : "<" + tagName + ">";
        };
        _proto32.onTag_COLOR = function onTag_COLOR(tagName, end, attr) {
          if (!end) {
            this.lastColor = attr;
            return "<color=" + attr + ">";
          } else return "</color>";
        };
        _proto32.onTag_FONT = function onTag_FONT(tagName, end, attr) {
          if (!end) return "<font face=\"" + attr + "\">";else return "</font>";
        };
        _proto32.onTag_SIZE = function onTag_SIZE(tagName, end, attr) {
          if (!end) {
            this.lastSize = attr;
            return "<size=" + attr + ">";
          } else return "</size>";
        };
        _proto32.getTagText = function getTagText(remove) {
          var pos1 = this._readPos;
          var pos2;
          var result = "";
          while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (this._text.charCodeAt(pos2 - 1) == 92)
              //\
              {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
              } else {
              result += this._text.substring(pos1, pos2);
              break;
            }
          }
          if (pos2 == -1) return null;
          if (remove) this._readPos = pos2;
          return result;
        };
        _proto32.parse = function parse(text, remove) {
          this._text = text;
          this.lastColor = null;
          this.lastSize = null;
          var pos1 = 0,
            pos2,
            pos3;
          var end;
          var tag, attr;
          var repl;
          var func;
          var result = "";
          while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (pos2 > 0 && this._text.charCodeAt(pos2 - 1) == 92)
              //\
              {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
                continue;
              }
            result += this._text.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = this._text.indexOf("]", pos1);
            if (pos2 == -1) break;
            end = this._text.charAt(pos1 + 1) == '/';
            tag = this._text.substring(end ? pos1 + 2 : pos1 + 1, pos2);
            this._readPos = pos2 + 1;
            attr = null;
            repl = null;
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
              attr = tag.substring(pos3 + 1);
              tag = tag.substring(0, pos3);
            }
            tag = tag.toLowerCase();
            func = this._handlers[tag];
            if (func != null) {
              repl = func.call(this, tag, end, attr);
              if (repl != null && !remove) result += repl;
            } else result += this._text.substring(pos1, this._readPos);
            pos1 = this._readPos;
          }
          if (pos1 < this._text.length) result += this._text.substring(pos1);
          this._text = null;
          return result;
        };
        return UBBParser;
      }());
      var defaultParser = new UBBParser();
      var GTextField = exports('GTextField', /*#__PURE__*/function (_GObject5) {
        _inheritsLoose(GTextField, _GObject5);
        function GTextField() {
          var _this12;
          _this12 = _GObject5.call(this) || this;
          _this12._fontSize = 0;
          _this12._leading = 0;
          _this12._node.name = "GTextField";
          _this12._touchDisabled = true;
          _this12._text = "";
          _this12._color = new Color(255, 255, 255, 255);
          _this12.createRenderer();
          _this12.fontSize = 12;
          _this12.leading = 3;
          _this12.singleLine = false;
          _this12._sizeDirty = false;
          _this12._node.on(Node.EventType.SIZE_CHANGED, _this12.onLabelSizeChanged, _assertThisInitialized(_this12));
          return _this12;
        }
        var _proto33 = GTextField.prototype;
        _proto33.createRenderer = function createRenderer() {
          this._label = this._node.addComponent(Label);
          this._label.string = "";
          this.autoSize = AutoSizeType.Both;
        };
        _proto33.parseTemplate = function parseTemplate(template) {
          var pos1 = 0,
            pos2,
            pos3;
          var tag;
          var value;
          var result = "";
          while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92)
              //\
              {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
              }
            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1) break;
            if (pos2 == pos1 + 1) {
              result += template.substring(pos1, pos1 + 2);
              pos1 = pos2 + 1;
              continue;
            }
            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
              value = this._templateVars[tag.substring(0, pos3)];
              if (value == null) result += tag.substring(pos3 + 1);else result += value;
            } else {
              value = this._templateVars[tag];
              if (value != null) result += value;
            }
            pos1 = pos2 + 1;
          }
          if (pos1 < template.length) result += template.substring(pos1);
          return result;
        };
        _proto33.setVar = function setVar(name, value) {
          if (!this._templateVars) this._templateVars = {};
          this._templateVars[name] = value;
          return this;
        };
        _proto33.flushVars = function flushVars() {
          this.markSizeChanged();
          this.updateText();
        };
        _proto33.ensureSizeCorrect = function ensureSizeCorrect() {
          if (this._sizeDirty) {
            this._label.updateRenderData(true);
            this._sizeDirty = false;
          }
        };
        _proto33.updateText = function updateText() {
          var text2 = this._text;
          if (this._templateVars) text2 = this.parseTemplate(text2);
          if (this._ubbEnabled)
            //不支持同一个文本不同样式
            text2 = defaultParser.parse(text2, true);
          this._label.string = text2;
        };
        _proto33.assignFont = function assignFont(label, value) {
          if (value instanceof Font) label.font = value;else {
            var font = getFontByName(value);
            if (!font) {
              label.fontFamily = value;
              label.useSystemFont = true;
            } else label.font = font;
          }
        };
        _proto33.assignFontColor = function assignFontColor(label, value) {
          var font = label.font;
          if (font instanceof BitmapFont && !font.fntConfig.canTint) value = Color.WHITE;
          if (this._grayed) value = toGrayedColor(value);
          label.color = value;
        };
        _proto33.updateFont = function updateFont() {
          this.assignFont(this._label, this._realFont);
        };
        _proto33.updateFontColor = function updateFontColor() {
          this.assignFontColor(this._label, this._color);
        };
        _proto33.updateStrokeColor = function updateStrokeColor() {
          if (!this._label || !this._label.enableOutline) return;
          if (!this._strokeColor) this._strokeColor = new Color();
          if (this._grayed) this._label.outlineColor = toGrayedColor(this._strokeColor);else this._label.outlineColor = this._strokeColor;
        };
        _proto33.updateShadowColor = function updateShadowColor() {
          if (!this._label || !this._label.enableShadow) return;
          if (!this._shadowColor) this._shadowColor = new Color();
          if (this._grayed) this._label.shadowColor = toGrayedColor(this._shadowColor);else this._label.shadowColor = this._shadowColor;
        };
        _proto33.updateFontSize = function updateFontSize() {
          var font = this._label.font;
          if (font instanceof BitmapFont) {
            var fntConfig = font.fntConfig;
            if (fntConfig.resizable) this._label.fontSize = this._fontSize;else this._label.fontSize = fntConfig.fontSize;
            this._label.lineHeight = fntConfig.fontSize + (this._leading + 4) * fntConfig.fontSize / this._label.fontSize;
          } else {
            this._label.fontSize = this._fontSize;
            this._label.lineHeight = this._fontSize + this._leading;
          }
        };
        _proto33.updateOverflow = function updateOverflow() {
          if (this._autoSize == AutoSizeType.Both) this._label.overflow = Label.Overflow.NONE;else if (this._autoSize == AutoSizeType.Height) {
            this._label.overflow = Label.Overflow.RESIZE_HEIGHT;
            this._uiTrans.width = this._width;
          } else if (this._autoSize == AutoSizeType.Shrink) {
            this._label.overflow = Label.Overflow.SHRINK;
            this._uiTrans.setContentSize(this._width, this._height);
          } else {
            this._label.overflow = Label.Overflow.CLAMP;
            this._uiTrans.setContentSize(this._width, this._height);
          }
        };
        _proto33.markSizeChanged = function markSizeChanged() {
          if (this._underConstruct) return;
          if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
            if (!this._sizeDirty) {
              this._node.emit(Event.SIZE_DELAY_CHANGE);
              this._sizeDirty = true;
            }
          }
        };
        _proto33.onLabelSizeChanged = function onLabelSizeChanged() {
          this._sizeDirty = false;
          if (this._underConstruct) return;
          if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
            this._updatingSize = true;
            this.setSize(this._uiTrans.width, this._uiTrans.height);
            this._updatingSize = false;
          }
        };
        _proto33.handleSizeChanged = function handleSizeChanged() {
          if (this._updatingSize) return;
          if (this._autoSize == AutoSizeType.None || this._autoSize == AutoSizeType.Shrink) {
            this._uiTrans.setContentSize(this._width, this._height);
          } else if (this._autoSize == AutoSizeType.Height) this._uiTrans.width = this._width;
        };
        _proto33.handleGrayedChanged = function handleGrayedChanged() {
          this.updateFontColor();
          this.updateStrokeColor();
        };
        _proto33.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.color;
            case ObjectPropID.OutlineColor:
              return this.strokeColor;
            case ObjectPropID.FontSize:
              return this.fontSize;
            default:
              return _GObject5.prototype.getProp.call(this, index);
          }
        };
        _proto33.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.color = value;
              break;
            case ObjectPropID.OutlineColor:
              this.strokeColor = value;
              break;
            case ObjectPropID.FontSize:
              this.fontSize = value;
              break;
            default:
              _GObject5.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto33.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject5.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this.font = buffer.readS();
          this.fontSize = buffer.readShort();
          this.color = buffer.readColor();
          this.align = buffer.readByte();
          this.verticalAlign = buffer.readByte();
          this.leading = buffer.readShort();
          this.letterSpacing = buffer.readShort();
          this._ubbEnabled = buffer.readBool();
          this.autoSize = buffer.readByte();
          this.underline = buffer.readBool();
          this.italic = buffer.readBool();
          this.bold = buffer.readBool();
          this.singleLine = buffer.readBool();
          if (buffer.readBool()) {
            this.strokeColor = buffer.readColor();
            this.stroke = buffer.readFloat();
          }
          if (buffer.readBool()) {
            this.shadowColor = buffer.readColor();
            var f1 = buffer.readFloat();
            var f2 = buffer.readFloat();
            this.shadowOffset = new Vec2(f1, f2);
          }
          if (buffer.readBool()) this._templateVars = {};
        };
        _proto33.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GObject5.prototype.setup_afterAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 6);
          var str = buffer.readS();
          if (str != null) {
            this.text = str;
          } else {
            this.text = "";
          }
        };
        _createClass(GTextField, [{
          key: "text",
          get: function get() {
            return this._text;
          },
          set: function set(value) {
            this._text = value;
            if (this._text == null) this._text = "";
            this.updateGear(6);
            this.markSizeChanged();
            this.updateText();
          }
        }, {
          key: "font",
          get: function get() {
            return this._font;
          },
          set: function set(value) {
            if (this._font != value || !value) {
              this._font = value;
              this.markSizeChanged();
              var newFont = value ? value : UIConfig.defaultFont;
              if (newFont.startsWith("ui://")) {
                var pi = UIPackage.getItemByURL(newFont);
                if (pi) newFont = pi.owner.getItemAsset(pi);else newFont = UIConfig.defaultFont;
              }
              this._realFont = newFont;
              this.updateFont();
            }
          }
        }, {
          key: "fontSize",
          get: function get() {
            return this._fontSize;
          },
          set: function set(value) {
            if (value < 0) return;
            if (this._fontSize != value) {
              this._fontSize = value;
              this.markSizeChanged();
              this.updateFontSize();
            }
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            this._color.set(value);
            this.updateGear(4);
            this.updateFontColor();
          }
        }, {
          key: "align",
          get: function get() {
            return this._label ? this._label.horizontalAlign : 0;
          },
          set: function set(value) {
            if (this._label) this._label.horizontalAlign = value;
          }
        }, {
          key: "verticalAlign",
          get: function get() {
            return this._label ? this._label.verticalAlign : 0;
          },
          set: function set(value) {
            if (this._label) this._label.verticalAlign = value;
          }
        }, {
          key: "leading",
          get: function get() {
            return this._leading;
          },
          set: function set(value) {
            if (this._leading != value) {
              this._leading = value;
              this.markSizeChanged();
              this.updateFontSize();
            }
          }
        }, {
          key: "letterSpacing",
          get: function get() {
            return this._label ? this._label.spacingX : 0;
          },
          set: function set(value) {
            if (this._label && this._label.spacingX != value) {
              this.markSizeChanged();
              this._label.spacingX = value;
            }
          }
        }, {
          key: "underline",
          get: function get() {
            return this._label ? this._label.isUnderline : false;
          },
          set: function set(value) {
            if (this._label) this._label.isUnderline = value;
          }
        }, {
          key: "bold",
          get: function get() {
            return this._label ? this._label.isBold : false;
          },
          set: function set(value) {
            if (this._label) this._label.isBold = value;
          }
        }, {
          key: "italic",
          get: function get() {
            return this._label ? this._label.isItalic : false;
          },
          set: function set(value) {
            if (this._label) this._label.isItalic = value;
          }
        }, {
          key: "singleLine",
          get: function get() {
            return this._label ? !this._label.enableWrapText : false;
          },
          set: function set(value) {
            if (this._label) this._label.enableWrapText = !value;
          }
        }, {
          key: "stroke",
          get: function get() {
            return this._label ? this._label.outlineWidth : 0;
          },
          set: function set(value) {
            if (!this._label) return;
            this._label.outlineWidth = value;
            this._label.enableOutline = value > 0;
            if (value > 0) this.updateStrokeColor();
          }
        }, {
          key: "strokeColor",
          get: function get() {
            return this._strokeColor;
          },
          set: function set(value) {
            if (!this._strokeColor) this._strokeColor = new Color();
            this._strokeColor.set(value);
            this.updateGear(4);
            this.updateStrokeColor();
          }
        }, {
          key: "shadowOffset",
          get: function get() {
            return this._shadowOffset;
          },
          set: function set(value) {
            if (!this._shadowOffset) this._shadowOffset = new Vec2();
            this._shadowOffset.set(value);
            if (!this._label) return;
            this._label.shadowOffset = new Vec2(this._shadowOffset.x, -this._shadowOffset.y);
            this._label.enableShadow = value.x != 0 || value.y != 0;
            if (this._label.enableShadow) this.updateShadowColor();
          }
        }, {
          key: "shadowColor",
          get: function get() {
            return this._shadowColor;
          },
          set: function set(value) {
            if (!this._shadowColor) this._shadowColor = new Color();
            this._shadowColor.set(value);
            this.updateShadowColor();
          }
        }, {
          key: "ubbEnabled",
          get: function get() {
            return this._ubbEnabled;
          },
          set: function set(value) {
            if (this._ubbEnabled != value) {
              this._ubbEnabled = value;
              this.markSizeChanged();
              this.updateText();
            }
          }
        }, {
          key: "autoSize",
          get: function get() {
            return this._autoSize;
          },
          set: function set(value) {
            if (this._autoSize != value) {
              this._autoSize = value;
              this.markSizeChanged();
              this.updateOverflow();
            }
          }
        }, {
          key: "templateVars",
          get: function get() {
            return this._templateVars;
          },
          set: function set(value) {
            if (this._templateVars == null && value == null) return;
            this._templateVars = value;
            this.flushVars();
          }
        }, {
          key: "textWidth",
          get: function get() {
            this.ensureSizeCorrect();
            return this._uiTrans.width;
          }
        }]);
        return GTextField;
      }(GObject));
      var RichTextImageAtlas = /*#__PURE__*/function (_SpriteAtlas) {
        _inheritsLoose(RichTextImageAtlas, _SpriteAtlas);
        function RichTextImageAtlas() {
          return _SpriteAtlas.apply(this, arguments) || this;
        }
        var _proto34 = RichTextImageAtlas.prototype;
        _proto34.getSpriteFrame = function getSpriteFrame(key) {
          var pi = UIPackage.getItemByURL(key);
          if (pi) {
            pi.load();
            if (pi.type == PackageItemType.Image) return pi.asset;else if (pi.type == PackageItemType.MovieClip) return pi.frames[0].texture;
          }
          return _SpriteAtlas.prototype.getSpriteFrame.call(this, key);
        };
        return RichTextImageAtlas;
      }(SpriteAtlas);
      var imageAtlas = new RichTextImageAtlas();
      var GRichTextField = exports('GRichTextField', /*#__PURE__*/function (_GTextField) {
        _inheritsLoose(GRichTextField, _GTextField);
        function GRichTextField() {
          var _this13;
          _this13 = _GTextField.call(this) || this;
          _this13._node.name = "GRichTextField";
          _this13._touchDisabled = false;
          _this13.linkUnderline = UIConfig.linkUnderline;
          return _this13;
        }
        var _proto35 = GRichTextField.prototype;
        _proto35.createRenderer = function createRenderer() {
          this._richText = this._node.addComponent(RichText);
          this._richText.handleTouchEvent = false;
          this.autoSize = AutoSizeType.None;
          this._richText.imageAtlas = imageAtlas;
        };
        _proto35.markSizeChanged = function markSizeChanged() {//RichText貌似没有延迟重建文本，所以这里不需要
        };
        _proto35.updateText = function updateText() {
          var text2 = this._text;
          if (this._templateVars) text2 = this.parseTemplate(text2);
          if (this._ubbEnabled) {
            defaultParser.linkUnderline = this.linkUnderline;
            defaultParser.linkColor = this.linkColor;
            text2 = defaultParser.parse(text2);
          }
          if (this._bold) text2 = "<b>" + text2 + "</b>";
          if (this._italics) text2 = "<i>" + text2 + "</i>";
          if (this._underline) text2 = "<u>" + text2 + "</u>";
          var c = this._color;
          if (this._grayed) c = toGrayedColor(c);
          text2 = "<color=" + c.toHEX("#rrggbb") + ">" + text2 + "</color>";
          if (this._autoSize == AutoSizeType.Both) {
            if (this._richText.maxWidth != 0) this._richText["_maxWidth"] = 0;
            this._richText.string = text2;
            if (this.maxWidth != 0 && this._uiTrans.contentSize.width > this.maxWidth) this._richText.maxWidth = this.maxWidth;
          } else this._richText.string = text2;
        };
        _proto35.updateFont = function updateFont() {
          this.assignFont(this._richText, this._realFont);
        };
        _proto35.updateFontColor = function updateFontColor() {
          this.assignFontColor(this._richText, this._color);
        };
        _proto35.updateFontSize = function updateFontSize() {
          var fontSize = this._fontSize;
          var font = this._richText.font;
          if (font instanceof BitmapFont) {
            if (!font.fntConfig.resizable) fontSize = font.fntConfig.fontSize;
          }
          this._richText.fontSize = fontSize;
          this._richText.lineHeight = fontSize + this._leading * 2;
        };
        _proto35.updateOverflow = function updateOverflow() {
          if (this._autoSize == AutoSizeType.Both) this._richText.maxWidth = 0;else this._richText.maxWidth = this._width;
        };
        _proto35.handleSizeChanged = function handleSizeChanged() {
          if (this._updatingSize) return;
          if (this._autoSize != AutoSizeType.Both) this._richText.maxWidth = this._width;
        };
        _createClass(GRichTextField, [{
          key: "align",
          get: function get() {
            return this._richText.horizontalAlign;
          },
          set: function set(value) {
            this._richText.horizontalAlign = value;
          }
        }, {
          key: "underline",
          get: function get() {
            return this._underline;
          },
          set: function set(value) {
            if (this._underline != value) {
              this._underline = value;
              this.updateText();
            }
          }
        }, {
          key: "bold",
          get: function get() {
            return this._bold;
          },
          set: function set(value) {
            if (this._bold != value) {
              this._bold = value;
              this.updateText();
            }
          }
        }, {
          key: "italic",
          get: function get() {
            return this._italics;
          },
          set: function set(value) {
            if (this._italics != value) {
              this._italics = value;
              this.updateText();
            }
          }
        }]);
        return GRichTextField;
      }(GTextField));
      var InputProcessor = /*#__PURE__*/function (_Component2) {
        _inheritsLoose(InputProcessor, _Component2);
        function InputProcessor() {
          var _this14;
          _this14 = _Component2.call(this) || this;
          _this14._touches = new Array();
          _this14._rollOutChain = new Array();
          _this14._rollOverChain = new Array();
          _this14._touchPos = new Vec2();
          return _this14;
        }
        var _proto36 = InputProcessor.prototype;
        _proto36.onLoad = function onLoad() {
          this._owner = GObject.cast(this.node);
        };
        _proto36.onEnable = function onEnable() {
          var node = this.node;
          node.on(Node.EventType.TOUCH_START, this.touchBeginHandler, this);
          node.on(Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
          node.on(Node.EventType.TOUCH_END, this.touchEndHandler, this);
          node.on(Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this);
          node.on(Node.EventType.MOUSE_DOWN, this.mouseDownHandler, this);
          node.on(Node.EventType.MOUSE_MOVE, this.mouseMoveHandler, this);
          node.on(Node.EventType.MOUSE_UP, this.mouseUpHandler, this);
          node.on(Node.EventType.MOUSE_WHEEL, this.mouseWheelHandler, this);
          this._touchListener = this.node.eventProcessor.touchListener;
        };
        _proto36.onDisable = function onDisable() {
          var node = this.node;
          node.off(Node.EventType.TOUCH_START, this.touchBeginHandler, this);
          node.off(Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
          node.off(Node.EventType.TOUCH_END, this.touchEndHandler, this);
          node.off(Node.EventType.TOUCH_CANCEL, this.touchCancelHandler, this);
          node.off(Node.EventType.MOUSE_DOWN, this.mouseDownHandler, this);
          node.off(Node.EventType.MOUSE_MOVE, this.mouseMoveHandler, this);
          node.off(Node.EventType.MOUSE_UP, this.mouseUpHandler, this);
          node.off(Node.EventType.MOUSE_WHEEL, this.mouseWheelHandler, this);
          this._touchListener = null;
        };
        _proto36.getAllTouches = function getAllTouches(touchIds) {
          touchIds = touchIds || new Array();
          var cnt = this._touches.length;
          for (var i = 0; i < cnt; i++) {
            var ti = this._touches[i];
            if (ti.touchId != -1) touchIds.push(ti.touchId);
          }
          return touchIds;
        };
        _proto36.getTouchPosition = function getTouchPosition(touchId) {
          if (touchId === undefined) touchId = -1;
          var cnt = this._touches.length;
          for (var i = 0; i < cnt; i++) {
            var ti = this._touches[i];
            if (ti.touchId != -1 && (touchId == -1 || ti.touchId == touchId)) return ti.pos;
          }
          return Vec2.ZERO;
        };
        _proto36.getTouchTarget = function getTouchTarget() {
          var cnt = this._touches.length;
          for (var i = 0; i < cnt; i++) {
            var ti = this._touches[i];
            if (ti.touchId != -1) return ti.target;
          }
          return null;
        };
        _proto36.addTouchMonitor = function addTouchMonitor(touchId, target) {
          var ti = this.getInfo(touchId, false);
          if (!ti) return;
          var index = ti.touchMonitors.indexOf(target);
          if (index == -1) ti.touchMonitors.push(target);
        };
        _proto36.removeTouchMonitor = function removeTouchMonitor(target) {
          var cnt = this._touches.length;
          for (var i = 0; i < cnt; i++) {
            var ti = this._touches[i];
            var index = ti.touchMonitors.indexOf(target);
            if (index != -1) ti.touchMonitors.splice(index, 1);
          }
        };
        _proto36.cancelClick = function cancelClick(touchId) {
          var ti = this.getInfo(touchId, false);
          if (ti) ti.clickCancelled = true;
        };
        _proto36.simulateClick = function simulateClick(target) {
          var evt;
          evt = borrowEvent(Event.TOUCH_BEGIN, true);
          evt.initiator = target;
          evt.pos.set(target.localToGlobal());
          evt.touchId = 0;
          evt.clickCount = 1;
          evt.button = 0;
          evt._processor = this;
          if (this._captureCallback) this._captureCallback.call(this._owner, evt);
          target.node.dispatchEvent(evt);
          evt.unuse();
          evt.type = Event.TOUCH_END;
          evt.bubbles = true;
          target.node.dispatchEvent(evt);
          evt.unuse();
          evt.type = Event.CLICK;
          evt.bubbles = true;
          target.node.dispatchEvent(evt);
          returnEvent(evt);
        };
        _proto36.touchBeginHandler = function touchBeginHandler(evt) {
          var ti = this.updateInfo(evt.getID(), evt.getLocation());
          this.setBegin(ti);
          if (this._touchListener) {
            this._touchListener.setSwallowTouches(ti.target != this._owner);
          } else {
            // since cc3.4.0, setSwallowTouches removed
            var e = evt;
            e.preventSwallow = ti.target == this._owner;
          }
          var evt2 = this.getEvent(ti, ti.target, Event.TOUCH_BEGIN, true);
          if (this._captureCallback) this._captureCallback.call(this._owner, evt2);
          ti.target.node.dispatchEvent(evt2);
          this.handleRollOver(ti, ti.target);
          return true;
        };
        _proto36.touchMoveHandler = function touchMoveHandler(evt) {
          var ti = this.updateInfo(evt.getID(), evt.getLocation());
          if (!this._touchListener) {
            var e = evt;
            e.preventSwallow = ti.target == this._owner;
          }
          this.handleRollOver(ti, ti.target);
          if (ti.began) {
            var evt2 = this.getEvent(ti, ti.target, Event.TOUCH_MOVE, false);
            var done = false;
            var cnt = ti.touchMonitors.length;
            for (var i = 0; i < cnt; i++) {
              var mm = ti.touchMonitors[i];
              if (mm.node == null || !mm.node.activeInHierarchy) continue;
              evt2.unuse();
              evt2.type = Event.TOUCH_MOVE;
              mm.node.dispatchEvent(evt2);
              if (mm == this._owner) done = true;
            }
            if (!done && this.node) {
              evt2.unuse();
              evt2.type = Event.TOUCH_MOVE;
              this.node.dispatchEvent(evt2);
            }
            returnEvent(evt2);
          }
        };
        _proto36.touchEndHandler = function touchEndHandler(evt) {
          var ti = this.updateInfo(evt.getID(), evt.getLocation());
          if (!this._touchListener) {
            var e = evt;
            e.preventSwallow = ti.target == this._owner;
          }
          this.setEnd(ti);
          var evt2 = this.getEvent(ti, ti.target, Event.TOUCH_END, false);
          var cnt = ti.touchMonitors.length;
          for (var i = 0; i < cnt; i++) {
            var mm = ti.touchMonitors[i];
            if (mm == ti.target || mm.node == null || !mm.node.activeInHierarchy || 'isAncestorOf' in mm && mm.isAncestorOf(ti.target)) continue;
            evt2.unuse();
            evt2.type = Event.TOUCH_END;
            mm.node.dispatchEvent(evt2);
          }
          ti.touchMonitors.length = 0;
          if (ti.target && ti.target.node) {
            if (ti.target instanceof GRichTextField) ti.target.node.getComponent(RichText)["_onTouchEnded"](evt);
            evt2.unuse();
            evt2.type = Event.TOUCH_END;
            evt2.bubbles = true;
            ti.target.node.dispatchEvent(evt2);
          }
          returnEvent(evt2);
          ti.target = this.clickTest(ti);
          if (ti.target) {
            evt2 = this.getEvent(ti, ti.target, Event.CLICK, true);
            ti.target.node.dispatchEvent(evt2);
            returnEvent(evt2);
          }
          if (sys.isMobile)
            //on mobile platform, trigger RollOut on up event, but not on PC
            this.handleRollOver(ti, null);else this.handleRollOver(ti, ti.target);
          ti.target = null;
          ti.touchId = -1;
          ti.button = -1;
        };
        _proto36.touchCancelHandler = function touchCancelHandler(evt) {
          var ti = this.updateInfo(evt.getID(), evt.getLocation());
          if (!this._touchListener) {
            var e = evt;
            e.preventSwallow = ti.target == this._owner;
          }
          var evt2 = this.getEvent(ti, ti.target, Event.TOUCH_END, false);
          var cnt = ti.touchMonitors.length;
          for (var i = 0; i < cnt; i++) {
            var mm = ti.touchMonitors[i];
            if (mm == ti.target || mm.node == null || !mm.node.activeInHierarchy || 'isAncestorOf' in mm && mm.isAncestorOf(ti.target)) continue;
            evt2.initiator = mm;
            mm.node.dispatchEvent(evt2);
          }
          ti.touchMonitors.length = 0;
          if (ti.target && ti.target.node) {
            evt2.bubbles = true;
            ti.target.node.dispatchEvent(evt2);
          }
          returnEvent(evt2);
          this.handleRollOver(ti, null);
          ti.target = null;
          ti.touchId = -1;
          ti.button = -1;
        };
        _proto36.mouseDownHandler = function mouseDownHandler(evt) {
          var ti = this.getInfo(0, true);
          ti.button = evt.getButton();
        };
        _proto36.mouseUpHandler = function mouseUpHandler(evt) {
          var ti = this.getInfo(0, true);
          ti.button = evt.getButton();
        };
        _proto36.mouseMoveHandler = function mouseMoveHandler(evt) {
          var ti = this.getInfo(0, false);
          if (ti && Math.abs(ti.pos.x - evt.getLocationX()) < 1 && Math.abs(ti.pos.y - (UIContentScaler.rootSize.height - evt.getLocationY())) < 1) return;
          ti = this.updateInfo(0, evt.getLocation());
          this.handleRollOver(ti, ti.target);
          if (ti.began) {
            var evt2 = this.getEvent(ti, ti.target, Event.TOUCH_MOVE, false);
            var done = false;
            var cnt = ti.touchMonitors.length;
            for (var i = 0; i < cnt; i++) {
              var mm = ti.touchMonitors[i];
              if (mm.node == null || !mm.node.activeInHierarchy) continue;
              evt2.initiator = mm;
              mm.node.dispatchEvent(evt2);
              if (mm == this._owner) done = true;
            }
            if (!done && this.node) {
              evt2.initiator = this._owner;
              this.node.dispatchEvent(evt2);
              returnEvent(evt2);
            }
            returnEvent(evt2);
          }
        };
        _proto36.mouseWheelHandler = function mouseWheelHandler(evt) {
          var ti = this.updateInfo(0, evt.getLocation());
          ti.mouseWheelDelta = Math.max(evt.getScrollX(), evt.getScrollY());
          var evt2 = this.getEvent(ti, ti.target, Event.MOUSE_WHEEL, true);
          ti.target.node.dispatchEvent(evt2);
          returnEvent(evt2);
        };
        _proto36.updateInfo = function updateInfo(touchId, pos) {
          var camera = director.root.batcher2D.getFirstRenderCamera(this.node);
          if (camera) {
            s_vec3.set(pos.x, pos.y);
            camera.screenToWorld(s_vec3_2, s_vec3);
            this._touchPos.set(s_vec3_2.x, s_vec3_2.y);
          } else this._touchPos.set(pos);
          this._touchPos.y = UIContentScaler.rootSize.height - this._touchPos.y;
          var target = this._owner.hitTest(this._touchPos);
          if (!target) target = this._owner;
          var ti = this.getInfo(touchId);
          ti.target = target;
          ti.pos.set(this._touchPos);
          ti.button = EventMouse.BUTTON_LEFT;
          ti.touchId = touchId;
          return ti;
        };
        _proto36.getInfo = function getInfo(touchId, createIfNotExisits) {
          if (createIfNotExisits === undefined) createIfNotExisits = true;
          var ret = null;
          var cnt = this._touches.length;
          for (var i = 0; i < cnt; i++) {
            var ti = this._touches[i];
            if (ti.touchId == touchId) return ti;else if (ti.touchId == -1) ret = ti;
          }
          if (!ret) {
            if (!createIfNotExisits) return null;
            ret = new TouchInfo();
            this._touches.push(ret);
          }
          ret.touchId = touchId;
          return ret;
        };
        _proto36.setBegin = function setBegin(ti) {
          ti.began = true;
          ti.clickCancelled = false;
          ti.downPos.set(ti.pos);
          ti.downTargets.length = 0;
          var obj = ti.target;
          while (obj) {
            ti.downTargets.push(obj);
            obj = obj.findParent();
          }
        };
        _proto36.setEnd = function setEnd(ti) {
          ti.began = false;
          var now = game.totalTime / 1000;
          var elapsed = now - ti.lastClickTime;
          if (elapsed < 0.45) {
            if (ti.clickCount == 2) ti.clickCount = 1;else ti.clickCount++;
          } else ti.clickCount = 1;
          ti.lastClickTime = now;
        };
        _proto36.clickTest = function clickTest(ti) {
          if (ti.downTargets.length == 0 || ti.clickCancelled || Math.abs(ti.pos.x - ti.downPos.x) > 50 || Math.abs(ti.pos.y - ti.downPos.y) > 50) return null;
          var obj = ti.downTargets[0];
          if (obj && obj.node && obj.node.activeInHierarchy) return obj;
          obj = ti.target;
          while (obj) {
            var index = ti.downTargets.indexOf(obj);
            if (index != -1 && obj.node && obj.node.activeInHierarchy) break;
            obj = obj.findParent();
          }
          return obj;
        };
        _proto36.handleRollOver = function handleRollOver(ti, target) {
          if (ti.lastRollOver == target) return;
          var element = ti.lastRollOver;
          while (element && element.node) {
            this._rollOutChain.push(element);
            element = element.findParent();
          }
          element = target;
          while (element && element.node) {
            var i = this._rollOutChain.indexOf(element);
            if (i != -1) {
              this._rollOutChain.length = i;
              break;
            }
            this._rollOverChain.push(element);
            element = element.findParent();
          }
          ti.lastRollOver = target;
          var cnt = this._rollOutChain.length;
          for (var _i = 0; _i < cnt; _i++) {
            element = this._rollOutChain[_i];
            if (element.node && element.node.activeInHierarchy) {
              var evt = this.getEvent(ti, element, Event.ROLL_OUT, false);
              element.node.dispatchEvent(evt);
              returnEvent(evt);
            }
          }
          cnt = this._rollOverChain.length;
          for (var _i2 = 0; _i2 < cnt; _i2++) {
            element = this._rollOverChain[_i2];
            if (element.node && element.node.activeInHierarchy) {
              var _evt = this.getEvent(ti, element, Event.ROLL_OVER, false);
              element.node.dispatchEvent(_evt);
              returnEvent(_evt);
            }
          }
          this._rollOutChain.length = 0;
          this._rollOverChain.length = 0;
        };
        _proto36.getEvent = function getEvent(ti, target, type, bubbles) {
          var evt = borrowEvent(type, bubbles);
          evt.initiator = target;
          evt.pos.set(ti.pos);
          evt.touchId = ti.touchId;
          evt.clickCount = ti.clickCount;
          evt.button = ti.button;
          evt.mouseWheelDelta = ti.mouseWheelDelta;
          evt._processor = this;
          return evt;
        };
        return InputProcessor;
      }(Component);
      var TouchInfo = function TouchInfo() {
        this.pos = new Vec2();
        this.touchId = 0;
        this.clickCount = 0;
        this.mouseWheelDelta = 0;
        this.button = -1;
        this.downPos = new Vec2();
        this.began = false;
        this.clickCancelled = false;
        this.lastClickTime = 0;
        this.downTargets = new Array();
        this.touchMonitors = new Array();
      };
      var s_vec3 = new Vec3();
      var s_vec3_2 = new Vec3();
      var ControllerAction = /*#__PURE__*/function () {
        function ControllerAction() {}
        var _proto37 = ControllerAction.prototype;
        _proto37.run = function run(controller, prevPage, curPage) {
          if ((!this.fromPage || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1) && (!this.toPage || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1)) this.enter(controller);else this.leave(controller);
        };
        _proto37.enter = function enter(controller) {};
        _proto37.leave = function leave(controller) {};
        _proto37.setup = function setup(buffer) {
          var cnt;
          var i;
          cnt = buffer.readShort();
          this.fromPage = [];
          for (i = 0; i < cnt; i++) this.fromPage[i] = buffer.readS();
          cnt = buffer.readShort();
          this.toPage = [];
          for (i = 0; i < cnt; i++) this.toPage[i] = buffer.readS();
        };
        return ControllerAction;
      }();
      var PlayTransitionAction = /*#__PURE__*/function (_ControllerAction) {
        _inheritsLoose(PlayTransitionAction, _ControllerAction);
        function PlayTransitionAction() {
          var _this15;
          _this15 = _ControllerAction.call(this) || this;
          _this15.playTimes = 1;
          _this15.delay = 0;
          return _this15;
        }
        var _proto38 = PlayTransitionAction.prototype;
        _proto38.enter = function enter(controller) {
          var trans = controller.parent.getTransition(this.transitionName);
          if (trans) {
            if (this._currentTransition && this._currentTransition.playing) trans.changePlayTimes(this.playTimes);else trans.play(null, this.playTimes, this.delay);
            this._currentTransition = trans;
          }
        };
        _proto38.leave = function leave(controller) {
          if (this.stopOnExit && this._currentTransition) {
            this._currentTransition.stop();
            this._currentTransition = null;
          }
        };
        _proto38.setup = function setup(buffer) {
          _ControllerAction.prototype.setup.call(this, buffer);
          this.transitionName = buffer.readS();
          this.playTimes = buffer.readInt();
          this.delay = buffer.readFloat();
          this.stopOnExit = buffer.readBool();
        };
        return PlayTransitionAction;
      }(ControllerAction);
      var ChangePageAction = /*#__PURE__*/function (_ControllerAction2) {
        _inheritsLoose(ChangePageAction, _ControllerAction2);
        function ChangePageAction() {
          return _ControllerAction2.call(this) || this;
        }
        var _proto39 = ChangePageAction.prototype;
        _proto39.enter = function enter(controller) {
          if (!this.controllerName) return;
          var gcom;
          if (this.objectId) gcom = controller.parent.getChildById(this.objectId);else gcom = controller.parent;
          if (gcom) {
            var cc = gcom.getController(this.controllerName);
            if (cc && cc != controller && !cc.changing) {
              if (this.targetPage == "~1") {
                if (controller.selectedIndex < cc.pageCount) cc.selectedIndex = controller.selectedIndex;
              } else if (this.targetPage == "~2") cc.selectedPage = controller.selectedPage;else cc.selectedPageId = this.targetPage;
            }
          }
        };
        _proto39.setup = function setup(buffer) {
          _ControllerAction2.prototype.setup.call(this, buffer);
          this.objectId = buffer.readS();
          this.controllerName = buffer.readS();
          this.targetPage = buffer.readS();
        };
        return ChangePageAction;
      }(ControllerAction);
      var _nextPageId = 0;
      var Controller = exports('Controller', /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Controller, _EventTarget);
        function Controller() {
          var _this16;
          _this16 = _EventTarget.call(this) || this;
          _this16._pageIds = [];
          _this16._pageNames = [];
          _this16._selectedIndex = -1;
          _this16._previousIndex = -1;
          return _this16;
        }
        var _proto40 = Controller.prototype;
        _proto40.dispose = function dispose() {};
        _proto40.onChanged = function onChanged(callback, thisArg) {
          this.on(Event.STATUS_CHANGED, callback, thisArg);
        };
        _proto40.offChanged = function offChanged(callback, thisArg) {
          this.off(Event.STATUS_CHANGED, callback, thisArg);
        } //功能和设置selectedIndex一样，但不会触发事件
        ;
        _proto40.setSelectedIndex = function setSelectedIndex(value) {
          if (this._selectedIndex != value) {
            if (value > this._pageIds.length - 1) throw new Error("index out of bounds: " + value);
            this.changing = true;
            this._previousIndex = this._selectedIndex;
            this._selectedIndex = value;
            this.parent.applyController(this);
            this.changing = false;
          }
        }; //功能和设置selectedPage一样，但不会触发事件
        _proto40.setSelectedPage = function setSelectedPage(value) {
          var i = this._pageNames.indexOf(value);
          if (i == -1) i = 0;
          this.setSelectedIndex(i);
        };
        _proto40.getPageName = function getPageName(index) {
          return this._pageNames[index];
        };
        _proto40.addPage = function addPage(name) {
          name = name || "";
          this.addPageAt(name, this._pageIds.length);
        };
        _proto40.addPageAt = function addPageAt(name, index) {
          name = name || "";
          var nid = "" + _nextPageId++;
          if (index == null || index == this._pageIds.length) {
            this._pageIds.push(nid);
            this._pageNames.push(name);
          } else {
            this._pageIds.splice(index, 0, nid);
            this._pageNames.splice(index, 0, name);
          }
        };
        _proto40.removePage = function removePage(name) {
          var i = this._pageNames.indexOf(name);
          if (i != -1) {
            this._pageIds.splice(i, 1);
            this._pageNames.splice(i, 1);
            if (this._selectedIndex >= this._pageIds.length) this.selectedIndex = this._selectedIndex - 1;else this.parent.applyController(this);
          }
        };
        _proto40.removePageAt = function removePageAt(index) {
          this._pageIds.splice(index, 1);
          this._pageNames.splice(index, 1);
          if (this._selectedIndex >= this._pageIds.length) this.selectedIndex = this._selectedIndex - 1;else this.parent.applyController(this);
        };
        _proto40.clearPages = function clearPages() {
          this._pageIds.length = 0;
          this._pageNames.length = 0;
          if (this._selectedIndex != -1) this.selectedIndex = -1;else this.parent.applyController(this);
        };
        _proto40.hasPage = function hasPage(aName) {
          return this._pageNames.indexOf(aName) != -1;
        };
        _proto40.getPageIndexById = function getPageIndexById(aId) {
          return this._pageIds.indexOf(aId);
        };
        _proto40.getPageIdByName = function getPageIdByName(aName) {
          var i = this._pageNames.indexOf(aName);
          if (i != -1) return this._pageIds[i];else return null;
        };
        _proto40.getPageNameById = function getPageNameById(aId) {
          var i = this._pageIds.indexOf(aId);
          if (i != -1) return this._pageNames[i];else return null;
        };
        _proto40.getPageId = function getPageId(index) {
          return this._pageIds[index];
        };
        _proto40.runActions = function runActions() {
          if (this._actions) {
            var cnt = this._actions.length;
            for (var i = 0; i < cnt; i++) {
              this._actions[i].run(this, this.previousPageId, this.selectedPageId);
            }
          }
        };
        _proto40.setup = function setup(buffer) {
          var beginPos = buffer.position;
          buffer.seek(beginPos, 0);
          this.name = buffer.readS();
          if (buffer.readBool()) this.autoRadioGroupDepth = true;
          buffer.seek(beginPos, 1);
          var i;
          var nextPos;
          var cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) {
            this._pageIds.push(buffer.readS());
            this._pageNames.push(buffer.readS());
          }
          var homePageIndex = 0;
          if (buffer.version >= 2) {
            var homePageType = buffer.readByte();
            switch (homePageType) {
              case 1:
                homePageIndex = buffer.readShort();
                break;
              case 2:
                homePageIndex = this._pageNames.indexOf(UIPackage.branch);
                if (homePageIndex == -1) homePageIndex = 0;
                break;
              case 3:
                homePageIndex = this._pageNames.indexOf(UIPackage.getVar(buffer.readS()));
                if (homePageIndex == -1) homePageIndex = 0;
                break;
            }
          }
          buffer.seek(beginPos, 2);
          cnt = buffer.readShort();
          if (cnt > 0) {
            if (!this._actions) this._actions = new Array();
            for (i = 0; i < cnt; i++) {
              nextPos = buffer.readShort();
              nextPos += buffer.position;
              var action = createAction(buffer.readByte());
              action.setup(buffer);
              this._actions.push(action);
              buffer.position = nextPos;
            }
          }
          if (this.parent && this._pageIds.length > 0) this._selectedIndex = homePageIndex;else this._selectedIndex = -1;
        };
        _createClass(Controller, [{
          key: "selectedIndex",
          get: function get() {
            return this._selectedIndex;
          },
          set: function set(value) {
            if (this._selectedIndex != value) {
              if (value > this._pageIds.length - 1) throw new Error("index out of bounds: " + value);
              this.changing = true;
              this._previousIndex = this._selectedIndex;
              this._selectedIndex = value;
              this.parent.applyController(this);
              this.emit(Event.STATUS_CHANGED, this);
              this.changing = false;
            }
          }
        }, {
          key: "previsousIndex",
          get: function get() {
            return this._previousIndex;
          }
        }, {
          key: "selectedPage",
          get: function get() {
            if (this._selectedIndex == -1) return null;else return this._pageNames[this._selectedIndex];
          },
          set: function set(val) {
            var i = this._pageNames.indexOf(val);
            if (i == -1) i = 0;
            this.selectedIndex = i;
          }
        }, {
          key: "previousPage",
          get: function get() {
            if (this._previousIndex == -1) return null;else return this._pageNames[this._previousIndex];
          }
        }, {
          key: "pageCount",
          get: function get() {
            return this._pageIds.length;
          }
        }, {
          key: "selectedPageId",
          get: function get() {
            if (this._selectedIndex == -1) return null;else return this._pageIds[this._selectedIndex];
          },
          set: function set(val) {
            var i = this._pageIds.indexOf(val);
            this.selectedIndex = i;
          }
        }, {
          key: "oppositePageId",
          set: function set(val) {
            var i = this._pageIds.indexOf(val);
            if (i > 0) this.selectedIndex = 0;else if (this._pageIds.length > 1) this.selectedIndex = 1;
          }
        }, {
          key: "previousPageId",
          get: function get() {
            if (this._previousIndex == -1) return null;else return this._pageIds[this._previousIndex];
          }
        }]);
        return Controller;
      }(EventTarget));
      function createAction(type) {
        switch (type) {
          case 0:
            return new PlayTransitionAction();
          case 1:
            return new ChangePageAction();
        }
        return null;
      }
      var Margin = /*#__PURE__*/function () {
        function Margin() {
          this.left = 0;
          this.right = 0;
          this.top = 0;
          this.bottom = 0;
        }
        var _proto41 = Margin.prototype;
        _proto41.copy = function copy(source) {
          this.top = source.top;
          this.bottom = source.bottom;
          this.left = source.left;
          this.right = source.right;
        };
        _proto41.isNone = function isNone() {
          return this.left == 0 && this.right == 0 && this.top == 0 && this.bottom == 0;
        };
        return Margin;
      }();
      var ScrollPane = exports('ScrollPane', /*#__PURE__*/function (_Component3) {
        _inheritsLoose(ScrollPane, _Component3);
        function ScrollPane() {
          var _this17;
          _this17 = _Component3.apply(this, arguments) || this;
          _this17._aniFlag = 0;
          return _this17;
        }
        var _proto42 = ScrollPane.prototype;
        _proto42.setup = function setup(buffer) {
          var o = this._owner = GObject.cast(this.node);
          this._maskContainer = new Node("ScrollPane");
          this._maskContainer.layer = UIConfig.defaultUILayer;
          this._maskContainerUITrans = this._maskContainer.addComponent(UITransform);
          this._maskContainerUITrans.setAnchorPoint(0, 1);
          this._maskContainer.parent = o.node;
          this._container = o._container;
          this._container.parent = this._maskContainer;
          this._scrollBarMargin = new Margin();
          this._mouseWheelEnabled = true;
          this._xPos = 0;
          this._yPos = 0;
          this._aniFlag = 0;
          this._tweening = 0;
          this._footerLockedSize = 0;
          this._headerLockedSize = 0;
          this._viewSize = new Vec2();
          this._contentSize = new Vec2();
          this._pageSize = new Vec2(1, 1);
          this._overlapSize = new Vec2();
          this._tweenTime = new Vec2();
          this._tweenStart = new Vec2();
          this._tweenDuration = new Vec2();
          this._tweenChange = new Vec2();
          this._velocity = new Vec2();
          this._containerPos = new Vec2();
          this._beginTouchPos = new Vec2();
          this._lastTouchPos = new Vec2();
          this._lastTouchGlobalPos = new Vec2();
          this._scrollStep = UIConfig.defaultScrollStep;
          this._mouseWheelStep = this._scrollStep * 2;
          this._decelerationRate = UIConfig.defaultScrollDecelerationRate;
          this._snappingPolicy = 0;
          o.on(Event.TOUCH_BEGIN, this.onTouchBegin, this);
          o.on(Event.TOUCH_MOVE, this.onTouchMove, this);
          o.on(Event.TOUCH_END, this.onTouchEnd, this);
          o.on(Event.MOUSE_WHEEL, this.onMouseWheel, this);
          this._scrollType = buffer.readByte();
          var scrollBarDisplay = buffer.readByte();
          var flags = buffer.readInt();
          if (buffer.readBool()) {
            this._scrollBarMargin.top = buffer.readInt();
            this._scrollBarMargin.bottom = buffer.readInt();
            this._scrollBarMargin.left = buffer.readInt();
            this._scrollBarMargin.right = buffer.readInt();
          }
          var vtScrollBarRes = buffer.readS();
          var hzScrollBarRes = buffer.readS();
          var headerRes = buffer.readS();
          var footerRes = buffer.readS();
          if ((flags & 1) != 0) this._displayOnLeft = true;
          if ((flags & 2) != 0) this._snapToItem = true;
          if ((flags & 4) != 0) this._displayInDemand = true;
          if ((flags & 8) != 0) this._pageMode = true;
          if (flags & 16) this._touchEffect = true;else if (flags & 32) this._touchEffect = false;else this._touchEffect = UIConfig.defaultScrollTouchEffect;
          if (flags & 64) this._bouncebackEffect = true;else if (flags & 128) this._bouncebackEffect = false;else this._bouncebackEffect = UIConfig.defaultScrollBounceEffect;
          if ((flags & 256) != 0) this._inertiaDisabled = true;
          if ((flags & 512) != 0) this._dontClip = true;
          if ((flags & 1024) != 0) this._floating = true;
          if ((flags & 2048) != 0) this._dontClipMargin = true;
          if (!this._dontClip) this._maskContainer.addComponent(Mask);
          if (scrollBarDisplay == ScrollBarDisplayType.Default) scrollBarDisplay = UIConfig.defaultScrollBarDisplay;
          if (scrollBarDisplay != ScrollBarDisplayType.Hidden) {
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical) {
              var res = vtScrollBarRes ? vtScrollBarRes : UIConfig.verticalScrollBar;
              if (res) {
                this._vtScrollBar = UIPackage.createObjectFromURL(res);
                if (!this._vtScrollBar) throw new Error("cannot create scrollbar from " + res);
                this._vtScrollBar.setScrollPane(this, true);
                this._vtScrollBar.node.parent = o.node;
              }
            }
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Horizontal) {
              var res = hzScrollBarRes ? hzScrollBarRes : UIConfig.horizontalScrollBar;
              if (res) {
                this._hzScrollBar = UIPackage.createObjectFromURL(res);
                if (!this._hzScrollBar) throw new Error("cannot create scrollbar from " + res);
                this._hzScrollBar.setScrollPane(this, false);
                this._hzScrollBar.node.parent = o.node;
              }
            }
            if (scrollBarDisplay == ScrollBarDisplayType.Auto) this._scrollBarDisplayAuto = true;
            if (this._scrollBarDisplayAuto) {
              if (this._vtScrollBar) this._vtScrollBar.node.active = false;
              if (this._hzScrollBar) this._hzScrollBar.node.active = false;
              o.on(Event.ROLL_OVER, this.onRollOver, this);
              o.on(Event.ROLL_OUT, this.onRollOut, this);
            }
          }
          if (headerRes) {
            this._header = UIPackage.createObjectFromURL(headerRes);
            if (this._header == null) throw new Error("cannot create scrollPane header from " + headerRes);else this._maskContainer.insertChild(this._header.node, 0);
          }
          if (footerRes) {
            this._footer = UIPackage.createObjectFromURL(footerRes);
            if (this._footer == null) throw new Error("cannot create scrollPane footer from " + footerRes);else this._maskContainer.insertChild(this._footer.node, 0);
          }
          this._refreshBarAxis = this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical ? "y" : "x";
          this.setSize(o.width, o.height);
        };
        _proto42.onDestroy = function onDestroy() {
          delete this._pageController;
          if (this._hzScrollBar) this._hzScrollBar.dispose();
          if (this._vtScrollBar) this._vtScrollBar.dispose();
          if (this._header) this._header.dispose();
          if (this._footer) this._footer.dispose();
        };
        _proto42.hitTest = function hitTest(pt, globalPt) {
          var target;
          if (this._vtScrollBar) {
            target = this._vtScrollBar.hitTest(globalPt);
            if (target) return target;
          }
          if (this._hzScrollBar) {
            target = this._hzScrollBar.hitTest(globalPt);
            if (target) return target;
          }
          if (this._header && this._header.node.activeInHierarchy) {
            target = this._header.hitTest(globalPt);
            if (target) return target;
          }
          if (this._footer && this._footer.node.activeInHierarchy) {
            target = this._footer.hitTest(globalPt);
            if (target) return target;
          }
          if (this._dontClip) return this._owner;else if (this._dontClipMargin) {
            if (pt.x >= 0 && pt.y >= 0 && pt.x < this._owner.width && pt.y < this._owner.height) return this._owner;
          } else {
            if (pt.x >= this._owner.margin.left && pt.y >= this._owner.margin.top && pt.x < this._owner.margin.left + this._viewSize.x && pt.y < this._owner.margin.top + this._viewSize.y) return this._owner;
          }
          return null;
        };
        _proto42.setPercX = function setPercX(value, ani) {
          this._owner.ensureBoundsCorrect();
          this.setPosX(this._overlapSize.x * math.clamp01(value), ani);
        };
        _proto42.setPercY = function setPercY(value, ani) {
          this._owner.ensureBoundsCorrect();
          this.setPosY(this._overlapSize.y * math.clamp01(value), ani);
        };
        _proto42.setPosX = function setPosX(value, ani) {
          this._owner.ensureBoundsCorrect();
          if (this._loop == 1) value = this.loopCheckingNewPos(value, "x");
          value = math.clamp(value, 0, this._overlapSize.x);
          if (value != this._xPos) {
            this._xPos = value;
            this.posChanged(ani);
          }
        };
        _proto42.setPosY = function setPosY(value, ani) {
          this._owner.ensureBoundsCorrect();
          if (this._loop == 1) value = this.loopCheckingNewPos(value, "y");
          value = math.clamp(value, 0, this._overlapSize.y);
          if (value != this._yPos) {
            this._yPos = value;
            this.posChanged(ani);
          }
        };
        _proto42.setCurrentPageX = function setCurrentPageX(value, ani) {
          if (!this._pageMode) return;
          this._owner.ensureBoundsCorrect();
          if (this._overlapSize.x > 0) this.setPosX(value * this._pageSize.x, ani);
        };
        _proto42.setCurrentPageY = function setCurrentPageY(value, ani) {
          if (!this._pageMode) return;
          this._owner.ensureBoundsCorrect();
          if (this._overlapSize.y > 0) this.setPosY(value * this._pageSize.y, ani);
        };
        _proto42.scrollTop = function scrollTop(ani) {
          this.setPercY(0, ani);
        };
        _proto42.scrollBottom = function scrollBottom(ani) {
          this.setPercY(1, ani);
        };
        _proto42.scrollUp = function scrollUp(ratio, ani) {
          if (ratio == undefined) ratio = 1;
          if (this._pageMode) this.setPosY(this._yPos - this._pageSize.y * ratio, ani);else this.setPosY(this._yPos - this._scrollStep * ratio, ani);
        };
        _proto42.scrollDown = function scrollDown(ratio, ani) {
          if (ratio == undefined) ratio = 1;
          if (this._pageMode) this.setPosY(this._yPos + this._pageSize.y * ratio, ani);else this.setPosY(this._yPos + this._scrollStep * ratio, ani);
        };
        _proto42.scrollLeft = function scrollLeft(ratio, ani) {
          if (ratio == undefined) ratio = 1;
          if (this._pageMode) this.setPosX(this._xPos - this._pageSize.x * ratio, ani);else this.setPosX(this._xPos - this._scrollStep * ratio, ani);
        };
        _proto42.scrollRight = function scrollRight(ratio, ani) {
          if (ratio == undefined) ratio = 1;
          if (this._pageMode) this.setPosX(this._xPos + this._pageSize.x * ratio, ani);else this.setPosX(this._xPos + this._scrollStep * ratio, ani);
        };
        _proto42.scrollToView = function scrollToView(target, ani, setFirst) {
          this._owner.ensureBoundsCorrect();
          if (this._needRefresh) this.refresh();
          var rect;
          if (target instanceof GObject) {
            if (target.parent != this._owner) {
              target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, s_rect);
              rect = this._owner.globalToLocalRect(s_rect.x, s_rect.y, s_rect.width, s_rect.height, s_rect);
            } else {
              rect = s_rect;
              rect.x = target.x;
              rect.y = target.y;
              rect.width = target.width;
              rect.height = target.height;
            }
          } else rect = target;
          if (this._overlapSize.y > 0) {
            var bottom = this._yPos + this._viewSize.y;
            if (setFirst || rect.y <= this._yPos || rect.height >= this._viewSize.y) {
              if (this._pageMode) this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);else this.setPosY(rect.y, ani);
            } else if (rect.y + rect.height > bottom) {
              if (this._pageMode) this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);else if (rect.height <= this._viewSize.y / 2) this.setPosY(rect.y + rect.height * 2 - this._viewSize.y, ani);else this.setPosY(rect.y + rect.height - this._viewSize.y, ani);
            }
          }
          if (this._overlapSize.x > 0) {
            var right = this._xPos + this._viewSize.x;
            if (setFirst || rect.x <= this._xPos || rect.width >= this._viewSize.x) {
              if (this._pageMode) this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);else this.setPosX(rect.x, ani);
            } else if (rect.x + rect.width > right) {
              if (this._pageMode) this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);else if (rect.width <= this._viewSize.x / 2) this.setPosX(rect.x + rect.width * 2 - this._viewSize.x, ani);else this.setPosX(rect.x + rect.width - this._viewSize.x, ani);
            }
          }
          if (!ani && this._needRefresh) this.refresh();
        };
        _proto42.isChildInView = function isChildInView(obj) {
          if (this._overlapSize.y > 0) {
            var dist = obj.y + -this._container.position.y;
            if (dist < -obj.height || dist > this._viewSize.y) return false;
          }
          if (this._overlapSize.x > 0) {
            dist = obj.x + this._container.position.x;
            if (dist < -obj.width || dist > this._viewSize.x) return false;
          }
          return true;
        };
        _proto42.cancelDragging = function cancelDragging() {
          if (ScrollPane.draggingPane == this) ScrollPane.draggingPane = null;
          _gestureFlag = 0;
          this._dragged = false;
        };
        _proto42.lockHeader = function lockHeader(size) {
          if (this._headerLockedSize == size) return;
          var cx = this._container.position.x;
          var cy = -this._container.position.y;
          var cr = this._refreshBarAxis == "x" ? cx : cy;
          this._headerLockedSize = size;
          if (!this._refreshEventDispatching && cr >= 0) {
            this._tweenStart.x = cx;
            this._tweenStart.y = cy;
            this._tweenChange.set(Vec2.ZERO);
            this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.x = this._tweenDuration.y = TWEEN_TIME_DEFAULT;
            this.startTween(2);
          }
        };
        _proto42.lockFooter = function lockFooter(size) {
          if (this._footerLockedSize == size) return;
          var cx = this._container.position.x;
          var cy = -this._container.position.y;
          var cr = this._refreshBarAxis == "x" ? cx : cy;
          this._footerLockedSize = size;
          if (!this._refreshEventDispatching && cr <= -this._overlapSize[this._refreshBarAxis]) {
            this._tweenStart.x = cx;
            this._tweenStart.y = cy;
            this._tweenChange.set(Vec2.ZERO);
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
            this._tweenChange[this._refreshBarAxis] = -max - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.x = this._tweenDuration.y = TWEEN_TIME_DEFAULT;
            this.startTween(2);
          }
        };
        _proto42.onOwnerSizeChanged = function onOwnerSizeChanged() {
          this.setSize(this._owner.width, this._owner.height);
          this.posChanged(false);
        };
        _proto42.handleControllerChanged = function handleControllerChanged(c) {
          if (this._pageController == c) {
            if (this._scrollType == ScrollType.Horizontal) this.setCurrentPageX(c.selectedIndex, true);else this.setCurrentPageY(c.selectedIndex, true);
          }
        };
        _proto42.updatePageController = function updatePageController() {
          if (this._pageController && !this._pageController.changing) {
            var index;
            if (this._scrollType == ScrollType.Horizontal) index = this.currentPageX;else index = this.currentPageY;
            if (index < this._pageController.pageCount) {
              var c = this._pageController;
              this._pageController = null; //防止HandleControllerChanged的调用
              c.selectedIndex = index;
              this._pageController = c;
            }
          }
        };
        _proto42.adjustMaskContainer = function adjustMaskContainer() {
          var mx = 0;
          if (this._displayOnLeft && this._vtScrollBar && !this._floating) mx = this._vtScrollBar.width;
          var o = this._owner;
          if (this._dontClipMargin) this._maskContainerUITrans.setAnchorPoint((o.margin.left + o._alignOffset.x) / o.width, 1 - (o.margin.top + o._alignOffset.y) / o.height);else this._maskContainerUITrans.setAnchorPoint(o._alignOffset.x / this._viewSize.x, 1 - o._alignOffset.y / this._viewSize.y);
          if (o._customMask) this._maskContainer.setPosition(mx + o._alignOffset.x, -o._alignOffset.y);else this._maskContainer.setPosition(o._pivotCorrectX + mx + o._alignOffset.x, o._pivotCorrectY - o._alignOffset.y);
        };
        _proto42.setSize = function setSize(aWidth, aHeight) {
          if (this._hzScrollBar) {
            this._hzScrollBar.y = aHeight - this._hzScrollBar.height;
            if (this._vtScrollBar) {
              this._hzScrollBar.width = aWidth - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right;
              if (this._displayOnLeft) this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width;else this._hzScrollBar.x = this._scrollBarMargin.left;
            } else {
              this._hzScrollBar.width = aWidth - this._scrollBarMargin.left - this._scrollBarMargin.right;
              this._hzScrollBar.x = this._scrollBarMargin.left;
            }
          }
          if (this._vtScrollBar) {
            if (!this._displayOnLeft) this._vtScrollBar.x = aWidth - this._vtScrollBar.width;
            if (this._hzScrollBar) this._vtScrollBar.height = aHeight - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom;else this._vtScrollBar.height = aHeight - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
            this._vtScrollBar.y = this._scrollBarMargin.top;
          }
          this._viewSize.x = aWidth;
          this._viewSize.y = aHeight;
          if (this._hzScrollBar && !this._floating) this._viewSize.y -= this._hzScrollBar.height;
          if (this._vtScrollBar && !this._floating) this._viewSize.x -= this._vtScrollBar.width;
          this._viewSize.x -= this._owner.margin.left + this._owner.margin.right;
          this._viewSize.y -= this._owner.margin.top + this._owner.margin.bottom;
          this._viewSize.x = Math.max(1, this._viewSize.x);
          this._viewSize.y = Math.max(1, this._viewSize.y);
          this._pageSize.x = this._viewSize.x;
          this._pageSize.y = this._viewSize.y;
          this.adjustMaskContainer();
          this.handleSizeChanged();
        };
        _proto42.setContentSize = function setContentSize(aWidth, aHeight) {
          if (this._contentSize.x == aWidth && this._contentSize.y == aHeight) return;
          this._contentSize.x = aWidth;
          this._contentSize.y = aHeight;
          this.handleSizeChanged();
          if (this._snapToItem && this._snappingPolicy != 0 && this._xPos == 0 && this._yPos == 0) this.posChanged(false);
        };
        _proto42.changeContentSizeOnScrolling = function changeContentSizeOnScrolling(deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
          var isRightmost = this._xPos == this._overlapSize.x;
          var isBottom = this._yPos == this._overlapSize.y;
          this._contentSize.x += deltaWidth;
          this._contentSize.y += deltaHeight;
          this.handleSizeChanged();
          if (this._tweening == 1) {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost && this._tweenChange.x < 0) {
              this._xPos = this._overlapSize.x;
              this._tweenChange.x = -this._xPos - this._tweenStart.x;
            }
            if (deltaHeight != 0 && isBottom && this._tweenChange.y < 0) {
              this._yPos = this._overlapSize.y;
              this._tweenChange.y = -this._yPos - this._tweenStart.y;
            }
          } else if (this._tweening == 2) {
            //重新调整起始位置，确保能够顺滑滚下去
            if (deltaPosX != 0) {
              this._container.setPosition(this._container.position.x - deltaPosX, this._container.position.y);
              this._tweenStart.x -= deltaPosX;
              this._xPos = -this._container.position.x;
            }
            if (deltaPosY != 0) {
              this._container.setPosition(this._container.position.x, this._container.position.y + deltaPosY);
              this._tweenStart.y -= deltaPosY;
              this._yPos = - -this._container.position.y;
            }
          } else if (this._dragged) {
            if (deltaPosX != 0) {
              this._container.setPosition(this._container.position.x - deltaPosX, this._container.position.y);
              this._containerPos.x -= deltaPosX;
              this._xPos = -this._container.position.x;
            }
            if (deltaPosY != 0) {
              this._container.setPosition(this._container.position.x, this._container.position.y + deltaPosY);
              this._containerPos.y -= deltaPosY;
              this._yPos = - -this._container.position.y;
            }
          } else {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost) {
              this._xPos = this._overlapSize.x;
              this._container.setPosition(-this._xPos, this._container.position.y);
            }
            if (deltaHeight != 0 && isBottom) {
              this._yPos = this._overlapSize.y;
              this._container.setPosition(this._container.position.x, this._yPos);
            }
          }
          if (this._pageMode) this.updatePageController();
        };
        _proto42.handleSizeChanged = function handleSizeChanged() {
          if (this._displayInDemand) {
            this._vScrollNone = this._contentSize.y <= this._viewSize.y;
            this._hScrollNone = this._contentSize.x <= this._viewSize.x;
          }
          if (this._vtScrollBar) {
            if (this._contentSize.y == 0) this._vtScrollBar.setDisplayPerc(0);else this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y));
          }
          if (this._hzScrollBar) {
            if (this._contentSize.x == 0) this._hzScrollBar.setDisplayPerc(0);else this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x));
          }
          this.updateScrollBarVisible();
          var maskWidth = this._viewSize.x;
          var maskHeight = this._viewSize.y;
          if (this._vScrollNone && this._vtScrollBar) maskWidth += this._vtScrollBar.width;
          if (this._hScrollNone && this._hzScrollBar) maskHeight += this._hzScrollBar.height;
          if (this._dontClipMargin) {
            maskWidth += this._owner.margin.left + this._owner.margin.right;
            maskHeight += this._owner.margin.top + this._owner.margin.bottom;
          }
          this._maskContainerUITrans.setContentSize(maskWidth, maskHeight);
          if (this._vtScrollBar) this._vtScrollBar.handlePositionChanged();
          if (this._hzScrollBar) this._hzScrollBar.handlePositionChanged();
          if (this._header) this._header.handlePositionChanged();
          if (this._footer) this._footer.handlePositionChanged();
          if (this._scrollType == ScrollType.Horizontal || this._scrollType == ScrollType.Both) this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x));else this._overlapSize.x = 0;
          if (this._scrollType == ScrollType.Vertical || this._scrollType == ScrollType.Both) this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y));else this._overlapSize.y = 0; //边界检查
          this._xPos = math.clamp(this._xPos, 0, this._overlapSize.x);
          this._yPos = math.clamp(this._yPos, 0, this._overlapSize.y);
          var max = this._overlapSize[this._refreshBarAxis];
          if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
          if (this._refreshBarAxis == "x") this._container.setPosition(math.clamp(this._container.position.x, -max, this._headerLockedSize), -math.clamp(-this._container.position.y, -this._overlapSize.y, 0));else this._container.setPosition(math.clamp(this._container.position.x, -this._overlapSize.x, 0), -math.clamp(-this._container.position.y, -max, this._headerLockedSize));
          if (this._header) {
            if (this._refreshBarAxis == "x") this._header.height = this._viewSize.y;else this._header.width = this._viewSize.x;
          }
          if (this._footer) {
            if (this._refreshBarAxis == "y") this._footer.height = this._viewSize.y;else this._footer.width = this._viewSize.x;
          }
          this.updateScrollBarPos();
          if (this._pageMode) this.updatePageController();
        };
        _proto42.posChanged = function posChanged(ani) {
          if (this._aniFlag == 0) this._aniFlag = ani ? 1 : -1;else if (this._aniFlag == 1 && !ani) this._aniFlag = -1;
          this._needRefresh = true;
          if (!director.getScheduler().isScheduled(this.refresh, this)) this.scheduleOnce(this.refresh);
        };
        _proto42.refresh = function refresh(dt) {
          this._needRefresh = false;
          this.unschedule(this.refresh);
          if (this._pageMode || this._snapToItem) {
            sEndPos.x = -this._xPos;
            sEndPos.y = -this._yPos;
            this.alignPosition(sEndPos, false);
            this._xPos = -sEndPos.x;
            this._yPos = -sEndPos.y;
          }
          this.refresh2();
          this._owner.node.emit(Event.SCROLL, this._owner);
          if (this._needRefresh)
            //在onScroll事件里开发者可能修改位置，这里再刷新一次，避免闪烁
            {
              this._needRefresh = false;
              this.unschedule(this.refresh);
              this.refresh2();
            }
          this.updateScrollBarPos();
          this._aniFlag = 0;
        };
        _proto42.refresh2 = function refresh2() {
          if (this._aniFlag == 1 && !this._dragged) {
            var posX;
            var posY;
            if (this._overlapSize.x > 0) posX = -Math.floor(this._xPos);else {
              if (this._container.position.x != 0) this._container.setPosition(0, this._container.position.y);
              posX = 0;
            }
            if (this._overlapSize.y > 0) posY = -Math.floor(this._yPos);else {
              if (this._container.position.y != 0) this._container.setPosition(this._container.position.x, 0);
              posY = 0;
            }
            if (posX != this._container.position.x || posY != -this._container.position.y) {
              this._tweenDuration.x = this._tweenDuration.y = TWEEN_TIME_GO;
              this._tweenStart.x = this._container.position.x;
              this._tweenStart.y = -this._container.position.y;
              this._tweenChange.x = posX - this._tweenStart.x;
              this._tweenChange.y = posY - this._tweenStart.y;
              this.startTween(1);
            } else if (this._tweening != 0) this.killTween();
          } else {
            if (this._tweening != 0) this.killTween();
            this._container.setPosition(Math.floor(-this._xPos), -Math.floor(-this._yPos));
            this.loopCheckingCurrent();
          }
          if (this._pageMode) this.updatePageController();
        };
        _proto42.onTouchBegin = function onTouchBegin(evt) {
          if (!this._touchEffect) return;
          evt.captureTouch();
          if (this._tweening != 0) {
            this.killTween();
            Decls$1.GRoot.inst.inputProcessor.cancelClick(evt.touchId);
            this._dragged = true;
          } else this._dragged = false;
          var pt = this._owner.globalToLocal(evt.pos.x, evt.pos.y, s_vec2$3);
          this._containerPos.x = this._container.position.x;
          this._containerPos.y = -this._container.position.y;
          this._beginTouchPos.set(pt);
          this._lastTouchPos.set(pt);
          this._lastTouchGlobalPos.set(evt.pos);
          this._isHoldAreaDone = false;
          this._velocity.set(Vec2.ZERO);
          this._velocityScale = 1;
          this._lastMoveTime = game.totalTime / 1000;
        };
        _proto42.onTouchMove = function onTouchMove(evt) {
          if (!isValid(this._owner.node)) return;
          if (!this._touchEffect) return;
          if (GObject.draggingObject && GObject.draggingObject.onStage) return;
          if (ScrollPane.draggingPane && ScrollPane.draggingPane != this && ScrollPane.draggingPane._owner.onStage) return;
          var pt = this._owner.globalToLocal(evt.pos.x, evt.pos.y, s_vec2$3);
          var sensitivity = UIConfig.touchScrollSensitivity;
          var diff, diff2;
          var sv, sh;
          if (this._scrollType == ScrollType.Vertical) {
            if (!this._isHoldAreaDone) {
              //表示正在监测垂直方向的手势
              _gestureFlag |= 1;
              diff = Math.abs(this._beginTouchPos.y - pt.y);
              if (diff < sensitivity) return;
              if ((_gestureFlag & 2) != 0)
                //已经有水平方向的手势在监测，那么我们用严格的方式检查是不是按垂直方向移动，避免冲突
                {
                  diff2 = Math.abs(this._beginTouchPos.x - pt.x);
                  if (diff < diff2)
                    //不通过则不允许滚动了
                    return;
                }
            }
            sv = true;
          } else if (this._scrollType == ScrollType.Horizontal) {
            if (!this._isHoldAreaDone) {
              _gestureFlag |= 2;
              diff = Math.abs(this._beginTouchPos.x - pt.x);
              if (diff < sensitivity) return;
              if ((_gestureFlag & 1) != 0) {
                diff2 = Math.abs(this._beginTouchPos.y - pt.y);
                if (diff < diff2) return;
              }
            }
            sh = true;
          } else {
            _gestureFlag = 3;
            if (!this._isHoldAreaDone) {
              diff = Math.abs(this._beginTouchPos.y - pt.y);
              if (diff < sensitivity) {
                diff = Math.abs(this._beginTouchPos.x - pt.x);
                if (diff < sensitivity) return;
              }
            }
            sv = sh = true;
          }
          var newPosX = Math.floor(this._containerPos.x + pt.x - this._beginTouchPos.x);
          var newPosY = Math.floor(this._containerPos.y + pt.y - this._beginTouchPos.y);
          if (sv) {
            if (newPosY > 0) {
              if (!this._bouncebackEffect) this._container.setPosition(this._container.position.x, 0);else if (this._header && this._header.maxHeight != 0) this._container.setPosition(this._container.position.x, -Math.floor(Math.min(newPosY * 0.5, this._header.maxHeight)));else this._container.setPosition(this._container.position.x, -Math.floor(Math.min(newPosY * 0.5, this._viewSize.y * PULL_RATIO)));
            } else if (newPosY < -this._overlapSize.y) {
              if (!this._bouncebackEffect) this._container.setPosition(this._container.position.x, this._overlapSize.y);else if (this._footer && this._footer.maxHeight > 0) this._container.setPosition(this._container.position.x, -Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._footer.maxHeight) - this._overlapSize.y));else this._container.setPosition(this._container.position.x, -Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._viewSize.y * PULL_RATIO) - this._overlapSize.y));
            } else this._container.setPosition(this._container.position.x, -newPosY);
          }
          if (sh) {
            if (newPosX > 0) {
              if (!this._bouncebackEffect) this._container.setPosition(0, this._container.position.y);else if (this._header && this._header.maxWidth != 0) this._container.setPosition(Math.floor(Math.min(newPosX * 0.5, this._header.maxWidth)), this._container.position.y);else this._container.setPosition(Math.floor(Math.min(newPosX * 0.5, this._viewSize.x * PULL_RATIO)), this._container.position.y);
            } else if (newPosX < 0 - this._overlapSize.x) {
              if (!this._bouncebackEffect) this._container.setPosition(-this._overlapSize.x, this._container.position.y);else if (this._footer && this._footer.maxWidth > 0) this._container.setPosition(Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._footer.maxWidth) - this._overlapSize.x), this._container.position.y);else this._container.setPosition(Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._viewSize.x * PULL_RATIO) - this._overlapSize.x), this._container.position.y);
            } else this._container.setPosition(newPosX, this._container.position.y);
          } //更新速度
          var now = game.totalTime / 1000;
          var deltaTime = Math.max(now - this._lastMoveTime, 1 / 60);
          var deltaPositionX = pt.x - this._lastTouchPos.x;
          var deltaPositionY = pt.y - this._lastTouchPos.y;
          if (!sh) deltaPositionX = 0;
          if (!sv) deltaPositionY = 0;
          if (deltaTime != 0) {
            var frameRate = 60;
            var elapsed = deltaTime * frameRate - 1;
            if (elapsed > 1)
              //速度衰减
              {
                var factor = Math.pow(0.833, elapsed);
                this._velocity.x = this._velocity.x * factor;
                this._velocity.y = this._velocity.y * factor;
              }
            this._velocity.x = math.lerp(this._velocity.x, deltaPositionX * 60 / frameRate / deltaTime, deltaTime * 10);
            this._velocity.y = math.lerp(this._velocity.y, deltaPositionY * 60 / frameRate / deltaTime, deltaTime * 10);
          } /*速度计算使用的是本地位移，但在后续的惯性滚动判断中需要用到屏幕位移，所以这里要记录一个位移的比例。
            */
          var deltaGlobalPositionX = this._lastTouchGlobalPos.x - evt.pos.x;
          var deltaGlobalPositionY = this._lastTouchGlobalPos.y - evt.pos.y;
          if (deltaPositionX != 0) this._velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);else if (deltaPositionY != 0) this._velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);
          this._lastTouchPos.set(pt);
          this._lastTouchGlobalPos.set(evt.pos);
          this._lastMoveTime = now; //同步更新pos值
          if (this._overlapSize.x > 0) this._xPos = math.clamp(-this._container.position.x, 0, this._overlapSize.x);
          if (this._overlapSize.y > 0) this._yPos = math.clamp(- -this._container.position.y, 0, this._overlapSize.y); //循环滚动特别检查
          if (this._loop != 0) {
            newPosX = this._container.position.x;
            newPosY = -this._container.position.y;
            if (this.loopCheckingCurrent()) {
              this._containerPos.x += this._container.position.x - newPosX;
              this._containerPos.y += -this._container.position.y - newPosY;
            }
          }
          ScrollPane.draggingPane = this;
          this._isHoldAreaDone = true;
          this._dragged = true;
          this.updateScrollBarPos();
          this.updateScrollBarVisible();
          if (this._pageMode) this.updatePageController();
          this._owner.node.emit(Event.SCROLL);
        };
        _proto42.onTouchEnd = function onTouchEnd(evt) {
          if (ScrollPane.draggingPane == this) ScrollPane.draggingPane = null;
          _gestureFlag = 0;
          if (!this._dragged || !this._touchEffect || !this._owner.node.activeInHierarchy) {
            this._dragged = false;
            return;
          }
          this._dragged = false;
          this._tweenStart.x = this._container.position.x;
          this._tweenStart.y = -this._container.position.y;
          sEndPos.set(this._tweenStart);
          var flag = false;
          if (this._container.position.x > 0) {
            sEndPos.x = 0;
            flag = true;
          } else if (this._container.position.x < -this._overlapSize.x) {
            sEndPos.x = -this._overlapSize.x;
            flag = true;
          }
          if (-this._container.position.y > 0) {
            sEndPos.y = 0;
            flag = true;
          } else if (-this._container.position.y < -this._overlapSize.y) {
            sEndPos.y = -this._overlapSize.y;
            flag = true;
          }
          if (flag) {
            this._tweenChange.x = sEndPos.x - this._tweenStart.x;
            this._tweenChange.y = sEndPos.y - this._tweenStart.y;
            if (this._tweenChange.x < -UIConfig.touchDragSensitivity || this._tweenChange.y < -UIConfig.touchDragSensitivity) {
              this._refreshEventDispatching = true;
              this._owner.node.emit(Event.PULL_DOWN_RELEASE), this._owner;
              this._refreshEventDispatching = false;
            } else if (this._tweenChange.x > UIConfig.touchDragSensitivity || this._tweenChange.y > UIConfig.touchDragSensitivity) {
              this._refreshEventDispatching = true;
              this._owner.node.emit(Event.PULL_UP_RELEASE, this._owner);
              this._refreshEventDispatching = false;
            }
            if (this._headerLockedSize > 0 && sEndPos[this._refreshBarAxis] == 0) {
              sEndPos[this._refreshBarAxis] = this._headerLockedSize;
              this._tweenChange.x = sEndPos.x - this._tweenStart.x;
              this._tweenChange.y = sEndPos.y - this._tweenStart.y;
            } else if (this._footerLockedSize > 0 && sEndPos[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
              var max = this._overlapSize[this._refreshBarAxis];
              if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
              sEndPos[this._refreshBarAxis] = -max;
              this._tweenChange.x = sEndPos.x - this._tweenStart.x;
              this._tweenChange.y = sEndPos.y - this._tweenStart.y;
            }
            this._tweenDuration.x = this._tweenDuration.y = TWEEN_TIME_DEFAULT;
          } else {
            //更新速度
            if (!this._inertiaDisabled) {
              var frameRate = 60;
              var elapsed = (game.totalTime / 1000 - this._lastMoveTime) * frameRate - 1;
              if (elapsed > 1) {
                var factor = Math.pow(0.833, elapsed);
                this._velocity.x = this._velocity.x * factor;
                this._velocity.y = this._velocity.y * factor;
              } //根据速度计算目标位置和需要时间
              this.updateTargetAndDuration(this._tweenStart, sEndPos);
            } else this._tweenDuration.x = this._tweenDuration.y = TWEEN_TIME_DEFAULT;
            sOldChange.x = sEndPos.x - this._tweenStart.x;
            sOldChange.y = sEndPos.y - this._tweenStart.y; //调整目标位置
            this.loopCheckingTarget(sEndPos);
            if (this._pageMode || this._snapToItem) this.alignPosition(sEndPos, true);
            this._tweenChange.x = sEndPos.x - this._tweenStart.x;
            this._tweenChange.y = sEndPos.y - this._tweenStart.y;
            if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
              this.updateScrollBarVisible();
              return;
            } //如果目标位置已调整，随之调整需要时间
            if (this._pageMode || this._snapToItem) {
              this.fixDuration("x", sOldChange.x);
              this.fixDuration("y", sOldChange.y);
            }
          }
          this.startTween(2);
        };
        _proto42.onRollOver = function onRollOver() {
          this._hover = true;
          this.updateScrollBarVisible();
        };
        _proto42.onRollOut = function onRollOut() {
          this._hover = false;
          this.updateScrollBarVisible();
        };
        _proto42.onMouseWheel = function onMouseWheel(evt) {
          if (!this._mouseWheelEnabled) return;
          var delta = evt.mouseWheelDelta > 0 ? -1 : 1;
          if (this._overlapSize.x > 0 && this._overlapSize.y == 0) {
            if (this._pageMode) this.setPosX(this._xPos + this._pageSize.x * delta, false);else this.setPosX(this._xPos + this._mouseWheelStep * delta, false);
          } else {
            if (this._pageMode) this.setPosY(this._yPos + this._pageSize.y * delta, false);else this.setPosY(this._yPos + this._mouseWheelStep * delta, false);
          }
        };
        _proto42.updateScrollBarPos = function updateScrollBarPos() {
          if (this._vtScrollBar) this._vtScrollBar.setScrollPerc(this._overlapSize.y == 0 ? 0 : math.clamp(this._container.position.y, 0, this._overlapSize.y) / this._overlapSize.y);
          if (this._hzScrollBar) this._hzScrollBar.setScrollPerc(this._overlapSize.x == 0 ? 0 : math.clamp(-this._container.position.x, 0, this._overlapSize.x) / this._overlapSize.x);
          this.checkRefreshBar();
        };
        _proto42.updateScrollBarVisible = function updateScrollBarVisible() {
          if (this._vtScrollBar) {
            if (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone) this._vtScrollBar.node.active = false;else this.updateScrollBarVisible2(this._vtScrollBar);
          }
          if (this._hzScrollBar) {
            if (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone) this._hzScrollBar.node.active = false;else this.updateScrollBarVisible2(this._hzScrollBar);
          }
        };
        _proto42.updateScrollBarVisible2 = function updateScrollBarVisible2(bar) {
          if (this._scrollBarDisplayAuto) GTween.kill(bar, false, "alpha");
          if (this._scrollBarDisplayAuto && !this._hover && this._tweening == 0 && !this._dragged && !bar.gripDragging) {
            if (bar.node.active) GTween.to(1, 0, 0.5).setDelay(0.5).onComplete(this.__barTweenComplete, this).setTarget(bar, "alpha");
          } else {
            bar.alpha = 1;
            bar.node.active = true;
          }
        };
        _proto42.__barTweenComplete = function __barTweenComplete(tweener) {
          var bar = tweener.target;
          bar.alpha = 1;
          bar.node.active = false;
        };
        _proto42.getLoopPartSize = function getLoopPartSize(division, axis) {
          return (this._contentSize[axis] + (axis == "x" ? this._owner.columnGap : this._owner.lineGap)) / division;
        };
        _proto42.loopCheckingCurrent = function loopCheckingCurrent() {
          var changed = false;
          if (this._loop == 1 && this._overlapSize.x > 0) {
            if (this._xPos < 0.001) {
              this._xPos += this.getLoopPartSize(2, "x");
              changed = true;
            } else if (this._xPos >= this._overlapSize.x) {
              this._xPos -= this.getLoopPartSize(2, "x");
              changed = true;
            }
          } else if (this._loop == 2 && this._overlapSize.y > 0) {
            if (this._yPos < 0.001) {
              this._yPos += this.getLoopPartSize(2, "y");
              changed = true;
            } else if (this._yPos >= this._overlapSize.y) {
              this._yPos -= this.getLoopPartSize(2, "y");
              changed = true;
            }
          }
          if (changed) {
            this._container.setPosition(Math.floor(-this._xPos), -Math.floor(-this._yPos));
          }
          return changed;
        };
        _proto42.loopCheckingTarget = function loopCheckingTarget(endPos) {
          if (this._loop == 1) this.loopCheckingTarget2(endPos, "x");
          if (this._loop == 2) this.loopCheckingTarget2(endPos, "y");
        };
        _proto42.loopCheckingTarget2 = function loopCheckingTarget2(endPos, axis) {
          var halfSize;
          var tmp;
          if (endPos[axis] > 0) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] - halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
              endPos[axis] -= halfSize;
              this._tweenStart[axis] = tmp;
            }
          } else if (endPos[axis] < -this._overlapSize[axis]) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] + halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
              endPos[axis] += halfSize;
              this._tweenStart[axis] = tmp;
            }
          }
        };
        _proto42.loopCheckingNewPos = function loopCheckingNewPos(value, axis) {
          if (this._overlapSize[axis] == 0) return value;
          var pos = axis == "x" ? this._xPos : this._yPos;
          var changed = false;
          var v;
          if (value < 0.001) {
            value += this.getLoopPartSize(2, axis);
            if (value > pos) {
              v = this.getLoopPartSize(6, axis);
              v = Math.ceil((value - pos) / v) * v;
              pos = math.clamp(pos + v, 0, this._overlapSize[axis]);
              changed = true;
            }
          } else if (value >= this._overlapSize[axis]) {
            value -= this.getLoopPartSize(2, axis);
            if (value < pos) {
              v = this.getLoopPartSize(6, axis);
              v = Math.ceil((pos - value) / v) * v;
              pos = math.clamp(pos - v, 0, this._overlapSize[axis]);
              changed = true;
            }
          }
          if (changed) {
            if (axis == "x") this._container.setPosition(-Math.floor(pos), this._container.position.y);else this._container.setPosition(this._container.position.x, Math.floor(pos));
          }
          return value;
        };
        _proto42.alignPosition = function alignPosition(pos, inertialScrolling) {
          var ax = 0,
            ay = 0;
          if (this._snappingPolicy == 1) {
            if (this._owner.numChildren > 0) {
              //assume all children are same size
              var obj = this._owner.getChildAt(0);
              ax = Math.floor(this._viewSize.x * 0.5 - obj.width * 0.5);
              ay = Math.floor(this._viewSize.y * 0.5 - obj.height * 0.5);
            }
          } else if (this._snappingPolicy == 2) {
            if (this._owner.numChildren > 0) {
              //assume all children are same size
              var _obj = this._owner.getChildAt(0);
              ax = Math.floor(this._viewSize.x - _obj.width);
              ay = Math.floor(this._viewSize.y - _obj.height);
            }
          }
          pos.x -= ax;
          pos.y -= ay;
          if (this._pageMode) {
            pos.x = this.alignByPage(pos.x, "x", inertialScrolling);
            pos.y = this.alignByPage(pos.y, "y", inertialScrolling);
          } else if (this._snapToItem) {
            var pt = this._owner.getSnappingPosition(-pos.x, -pos.y, s_vec2$3);
            if (pos.x < 0 && pos.x > -this._overlapSize.x) pos.x = -pt.x;
            if (pos.y < 0 && pos.y > -this._overlapSize.y) pos.y = -pt.y;
          }
          pos.x += ax;
          pos.y += ay;
        };
        _proto42.alignByPage = function alignByPage(pos, axis, inertialScrolling) {
          var page;
          if (pos > 0) page = 0;else if (pos < -this._overlapSize[axis]) page = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;else {
            page = Math.floor(-pos / this._pageSize[axis]);
            var change = inertialScrolling ? pos - this._containerPos[axis] : pos - (axis == "x" ? this._container.position.x : -this._container.position.y);
            var testPageSize = Math.min(this._pageSize[axis], this._contentSize[axis] - (page + 1) * this._pageSize[axis]);
            var delta = -pos - page * this._pageSize[axis]; //页面吸附策略
            if (Math.abs(change) > this._pageSize[axis])
              //如果滚动距离超过1页,则需要超过页面的一半，才能到更下一页
              {
                if (delta > testPageSize * 0.5) page++;
              } else
              //否则只需要页面的1/3，当然，需要考虑到左移和右移的情况
              {
                if (delta > testPageSize * (change < 0 ? 0.3 : 0.7)) page++;
              } //重新计算终点
            pos = -page * this._pageSize[axis];
            if (pos < -this._overlapSize[axis])
              //最后一页未必有pageSize那么大
              pos = -this._overlapSize[axis];
          } //惯性滚动模式下，会增加判断尽量不要滚动超过一页
          if (inertialScrolling) {
            var oldPos = this._tweenStart[axis];
            var oldPage;
            if (oldPos > 0) oldPage = 0;else if (oldPos < -this._overlapSize[axis]) oldPage = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;else oldPage = Math.floor(-oldPos / this._pageSize[axis]);
            var startPage = Math.floor(-this._containerPos[axis] / this._pageSize[axis]);
            if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
              if (page > startPage) page = startPage + 1;else page = startPage - 1;
              pos = -page * this._pageSize[axis];
            }
          }
          return pos;
        };
        _proto42.updateTargetAndDuration = function updateTargetAndDuration(orignPos, resultPos) {
          resultPos.x = this.updateTargetAndDuration2(orignPos.x, "x");
          resultPos.y = this.updateTargetAndDuration2(orignPos.y, "y");
        };
        _proto42.updateTargetAndDuration2 = function updateTargetAndDuration2(pos, axis) {
          var v = this._velocity[axis];
          var duration = 0;
          if (pos > 0) pos = 0;else if (pos < -this._overlapSize[axis]) pos = -this._overlapSize[axis];else {
            //以屏幕像素为基准
            var isMobile = sys.isMobile;
            var v2 = Math.abs(v) * this._velocityScale;
            var winSize = screen.windowSize; //在移动设备上，需要对不同分辨率做一个适配，我们的速度判断以1136分辨率为基准
            if (isMobile) v2 *= 1136 / Math.max(winSize.width, winSize.height); //这里有一些阈值的处理，因为在低速内，不希望产生较大的滚动（甚至不滚动）
            var ratio = 0;
            if (this._pageMode || !isMobile) {
              if (v2 > 500) ratio = Math.pow((v2 - 500) / 500, 2);
            } else {
              if (v2 > 1000) ratio = Math.pow((v2 - 1000) / 1000, 2);
            }
            if (ratio != 0) {
              if (ratio > 1) ratio = 1;
              v2 *= ratio;
              v *= ratio;
              this._velocity[axis] = v; //算法：v*（this._decelerationRate的n次幂）= 60，即在n帧后速度降为60（假设每秒60帧）。
              duration = Math.log(60 / v2) / Math.log(this._decelerationRate) / 60; //计算距离要使用本地速度
              //理论公式貌似滚动的距离不够，改为经验公式
              //var change:number = (v/ 60 - 1) / (1 - this._decelerationRate);
              var change = Math.floor(v * duration * 0.4);
              pos += change;
            }
          }
          if (duration < TWEEN_TIME_DEFAULT) duration = TWEEN_TIME_DEFAULT;
          this._tweenDuration[axis] = duration;
          return pos;
        };
        _proto42.fixDuration = function fixDuration(axis, oldChange) {
          if (this._tweenChange[axis] == 0 || Math.abs(this._tweenChange[axis]) >= Math.abs(oldChange)) return;
          var newDuration = Math.abs(this._tweenChange[axis] / oldChange) * this._tweenDuration[axis];
          if (newDuration < TWEEN_TIME_DEFAULT) newDuration = TWEEN_TIME_DEFAULT;
          this._tweenDuration[axis] = newDuration;
        };
        _proto42.startTween = function startTween(type) {
          this._tweenTime.set(Vec2.ZERO);
          this._tweening = type;
          this.updateScrollBarVisible();
        };
        _proto42.killTween = function killTween() {
          if (this._tweening == 1)
            //取消类型为1的tween需立刻设置到终点
            {
              this._container.setPosition(this._tweenStart.x + this._tweenChange.x, -(this._tweenStart.y + this._tweenChange.y));
              this._owner.node.emit(Event.SCROLL, this._owner);
            }
          this._tweening = 0;
          this.updateScrollBarVisible();
          this._owner.node.emit(Event.SCROLL_END, this._owner);
        };
        _proto42.checkRefreshBar = function checkRefreshBar() {
          if (this._header == null && this._footer == null) return;
          var pos = this._refreshBarAxis == "x" ? this._container.position.x : -this._container.position.y;
          if (this._header) {
            if (pos > 0) {
              this._header.node.active = true;
              var pt = s_vec2$3;
              pt.x = this._header.width;
              pt.y = this._header.height;
              pt[this._refreshBarAxis] = pos;
              this._header.setSize(pt.x, pt.y);
            } else {
              this._header.node.active = false;
            }
          }
          if (this._footer) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (pos < -max || max == 0 && this._footerLockedSize > 0) {
              this._footer.node.active = true;
              pt = s_vec2$3;
              pt.x = this._footer.x;
              pt.y = this._footer.y;
              if (max > 0) pt[this._refreshBarAxis] = pos + this._contentSize[this._refreshBarAxis];else pt[this._refreshBarAxis] = Math.max(Math.min(pos + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]);
              this._footer.setPosition(pt.x, pt.y);
              pt.x = this._footer.width;
              pt.y = this._footer.height;
              if (max > 0) pt[this._refreshBarAxis] = -max - pos;else pt[this._refreshBarAxis] = this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis];
              this._footer.setSize(pt.x, pt.y);
            } else {
              this._footer.node.active = false;
            }
          }
        };
        _proto42.update = function update(dt) {
          if (this._tweening == 0) return;
          var nx = this.runTween("x", dt);
          var ny = this.runTween("y", dt);
          this._container.setPosition(nx, -ny);
          if (this._tweening == 2) {
            if (this._overlapSize.x > 0) this._xPos = math.clamp(-nx, 0, this._overlapSize.x);
            if (this._overlapSize.y > 0) this._yPos = math.clamp(-ny, 0, this._overlapSize.y);
            if (this._pageMode) this.updatePageController();
          }
          if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
            this._tweening = 0;
            this.loopCheckingCurrent();
            this.updateScrollBarPos();
            this.updateScrollBarVisible();
            this._owner.node.emit(Event.SCROLL, this._owner);
            this._owner.node.emit(Event.SCROLL_END, this._owner);
          } else {
            this.updateScrollBarPos();
            this._owner.node.emit(Event.SCROLL, this._owner);
          }
          return true;
        };
        _proto42.runTween = function runTween(axis, dt) {
          var newValue;
          if (this._tweenChange[axis] != 0) {
            this._tweenTime[axis] += dt;
            if (this._tweenTime[axis] >= this._tweenDuration[axis]) {
              newValue = this._tweenStart[axis] + this._tweenChange[axis];
              this._tweenChange[axis] = 0;
            } else {
              var ratio = easeFunc(this._tweenTime[axis], this._tweenDuration[axis]);
              newValue = this._tweenStart[axis] + Math.floor(this._tweenChange[axis] * ratio);
            }
            var threshold1 = 0;
            var threshold2 = -this._overlapSize[axis];
            if (this._headerLockedSize > 0 && this._refreshBarAxis == axis) threshold1 = this._headerLockedSize;
            if (this._footerLockedSize > 0 && this._refreshBarAxis == axis) {
              var max = this._overlapSize[this._refreshBarAxis];
              if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
              threshold2 = -max;
            }
            if (this._tweening == 2 && this._bouncebackEffect) {
              if (newValue > 20 + threshold1 && this._tweenChange[axis] > 0 || newValue > threshold1 && this._tweenChange[axis] == 0)
                //开始回弹
                {
                  this._tweenTime[axis] = 0;
                  this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                  this._tweenChange[axis] = -newValue + threshold1;
                  this._tweenStart[axis] = newValue;
                } else if (newValue < threshold2 - 20 && this._tweenChange[axis] < 0 || newValue < threshold2 && this._tweenChange[axis] == 0)
                //开始回弹
                {
                  this._tweenTime[axis] = 0;
                  this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                  this._tweenChange[axis] = threshold2 - newValue;
                  this._tweenStart[axis] = newValue;
                }
            } else {
              if (newValue > threshold1) {
                newValue = threshold1;
                this._tweenChange[axis] = 0;
              } else if (newValue < threshold2) {
                newValue = threshold2;
                this._tweenChange[axis] = 0;
              }
            }
          } else newValue = axis == "x" ? this._container.position.x : -this._container.position.y;
          return newValue;
        };
        _createClass(ScrollPane, [{
          key: "owner",
          get: function get() {
            return this._owner;
          }
        }, {
          key: "hzScrollBar",
          get: function get() {
            return this._hzScrollBar;
          }
        }, {
          key: "vtScrollBar",
          get: function get() {
            return this._vtScrollBar;
          }
        }, {
          key: "header",
          get: function get() {
            return this._header;
          }
        }, {
          key: "footer",
          get: function get() {
            return this._footer;
          }
        }, {
          key: "bouncebackEffect",
          get: function get() {
            return this._bouncebackEffect;
          },
          set: function set(sc) {
            this._bouncebackEffect = sc;
          }
        }, {
          key: "touchEffect",
          get: function get() {
            return this._touchEffect;
          },
          set: function set(sc) {
            this._touchEffect = sc;
          }
        }, {
          key: "scrollStep",
          get: function get() {
            return this._scrollStep;
          },
          set: function set(val) {
            this._scrollStep = val;
            if (this._scrollStep == 0) this._scrollStep = UIConfig.defaultScrollStep;
            this._mouseWheelStep = this._scrollStep * 2;
          }
        }, {
          key: "decelerationRate",
          get: function get() {
            return this._decelerationRate;
          },
          set: function set(val) {
            this._decelerationRate = val;
          }
        }, {
          key: "snapToItem",
          get: function get() {
            return this._snapToItem;
          },
          set: function set(value) {
            this._snapToItem = value;
          }
        }, {
          key: "snappingPolicy",
          get: function get() {
            return this._snappingPolicy;
          },
          set: function set(value) {
            this._snappingPolicy = value;
          }
        }, {
          key: "mouseWheelEnabled",
          get: function get() {
            return this._mouseWheelEnabled;
          },
          set: function set(value) {
            this._mouseWheelEnabled = value;
          }
        }, {
          key: "isDragged",
          get: function get() {
            return this._dragged;
          }
        }, {
          key: "percX",
          get: function get() {
            return this._overlapSize.x == 0 ? 0 : this._xPos / this._overlapSize.x;
          },
          set: function set(value) {
            this.setPercX(value, false);
          }
        }, {
          key: "percY",
          get: function get() {
            return this._overlapSize.y == 0 ? 0 : this._yPos / this._overlapSize.y;
          },
          set: function set(value) {
            this.setPercY(value, false);
          }
        }, {
          key: "posX",
          get: function get() {
            return this._xPos;
          },
          set: function set(value) {
            this.setPosX(value, false);
          }
        }, {
          key: "posY",
          get: function get() {
            return this._yPos;
          },
          set: function set(value) {
            this.setPosY(value, false);
          }
        }, {
          key: "contentWidth",
          get: function get() {
            return this._contentSize.x;
          }
        }, {
          key: "contentHeight",
          get: function get() {
            return this._contentSize.y;
          }
        }, {
          key: "viewWidth",
          get: function get() {
            return this._viewSize.x;
          },
          set: function set(value) {
            value = value + this._owner.margin.left + this._owner.margin.right;
            if (this._vtScrollBar && !this._floating) value += this._vtScrollBar.width;
            this._owner.width = value;
          }
        }, {
          key: "viewHeight",
          get: function get() {
            return this._viewSize.y;
          },
          set: function set(value) {
            value = value + this._owner.margin.top + this._owner.margin.bottom;
            if (this._hzScrollBar && !this._floating) value += this._hzScrollBar.height;
            this._owner.height = value;
          }
        }, {
          key: "currentPageX",
          get: function get() {
            if (!this._pageMode) return 0;
            var page = Math.floor(this._xPos / this._pageSize.x);
            if (this._xPos - page * this._pageSize.x > this._pageSize.x * 0.5) page++;
            return page;
          },
          set: function set(value) {
            this.setCurrentPageX(value, false);
          }
        }, {
          key: "currentPageY",
          get: function get() {
            if (!this._pageMode) return 0;
            var page = Math.floor(this._yPos / this._pageSize.y);
            if (this._yPos - page * this._pageSize.y > this._pageSize.y * 0.5) page++;
            return page;
          },
          set: function set(value) {
            this.setCurrentPageY(value, false);
          }
        }, {
          key: "isBottomMost",
          get: function get() {
            return this._yPos == this._overlapSize.y || this._overlapSize.y == 0;
          }
        }, {
          key: "isRightMost",
          get: function get() {
            return this._xPos == this._overlapSize.x || this._overlapSize.x == 0;
          }
        }, {
          key: "pageController",
          get: function get() {
            return this._pageController;
          },
          set: function set(value) {
            this._pageController = value;
          }
        }, {
          key: "scrollingPosX",
          get: function get() {
            return math.clamp(-this._container.position.x, 0, this._overlapSize.x);
          }
        }, {
          key: "scrollingPosY",
          get: function get() {
            return math.clamp(- -this._container.position.y, 0, this._overlapSize.y);
          }
        }]);
        return ScrollPane;
      }(Component));
      var _gestureFlag = 0;
      var TWEEN_TIME_GO = 0.5; //调用SetPos(ani)时使用的缓动时间
      var TWEEN_TIME_DEFAULT = 0.3; //惯性滚动的最小缓动时间
      var PULL_RATIO = 0.5; //下拉过顶或者上拉过底时允许超过的距离占显示区域的比例
      var s_vec2$3 = new Vec2();
      var s_rect = new Rect();
      var sEndPos = new Vec2();
      var sOldChange = new Vec2();
      function easeFunc(t, d) {
        return (t = t / d - 1) * t * t + 1; //cubicOut
      }
      var CurveType;
      (function (CurveType) {
        CurveType[CurveType["CRSpline"] = 0] = "CRSpline";
        CurveType[CurveType["Bezier"] = 1] = "Bezier";
        CurveType[CurveType["CubicBezier"] = 2] = "CubicBezier";
        CurveType[CurveType["Straight"] = 3] = "Straight";
      })(CurveType || (CurveType = {}));
      var GPathPoint = /*#__PURE__*/function () {
        function GPathPoint() {
          this.x = 0;
          this.y = 0;
          this.control1_x = 0;
          this.control1_y = 0;
          this.control2_x = 0;
          this.control2_y = 0;
          this.curveType = 0;
        }
        GPathPoint.newPoint = function newPoint(x, y, curveType) {
          var pt = new GPathPoint();
          pt.x = x || 0;
          pt.y = y || 0;
          pt.control1_x = 0;
          pt.control1_y = 0;
          pt.control2_x = 0;
          pt.control2_y = 0;
          pt.curveType = curveType || CurveType.CRSpline;
          return pt;
        };
        GPathPoint.newBezierPoint = function newBezierPoint(x, y, control1_x, control1_y) {
          var pt = new GPathPoint();
          pt.x = x || 0;
          pt.y = y || 0;
          pt.control1_x = control1_x || 0;
          pt.control1_y = control1_y || 0;
          pt.control2_x = 0;
          pt.control2_y = 0;
          pt.curveType = CurveType.Bezier;
          return pt;
        };
        GPathPoint.newCubicBezierPoint = function newCubicBezierPoint(x, y, control1_x, control1_y, control2_x, control2_y) {
          var pt = new GPathPoint();
          pt.x = x || 0;
          pt.y = y || 0;
          pt.control1_x = control1_x || 0;
          pt.control1_y = control1_y || 0;
          pt.control2_x = control2_x || 0;
          pt.control2_y = control2_y || 0;
          pt.curveType = CurveType.CubicBezier;
          return pt;
        };
        var _proto43 = GPathPoint.prototype;
        _proto43.clone = function clone() {
          var ret = new GPathPoint();
          ret.x = this.x;
          ret.y = this.y;
          ret.control1_x = this.control1_x;
          ret.control1_y = this.control1_y;
          ret.control2_x = this.control2_x;
          ret.control2_y = this.control2_y;
          ret.curveType = this.curveType;
          return ret;
        };
        return GPathPoint;
      }();
      var GPath = /*#__PURE__*/function () {
        function GPath() {
          this._segments = new Array();
          this._points = new Array();
        }
        var _proto44 = GPath.prototype;
        _proto44.create2 = function create2(pt1, pt2, pt3, pt4) {
          var points = new Array();
          points.push(pt1);
          points.push(pt2);
          if (pt3) points.push(pt3);
          if (pt4) points.push(pt4);
          this.create(points);
        };
        _proto44.create = function create(points) {
          this._segments.length = 0;
          this._points.length = 0;
          this._fullLength = 0;
          var cnt = points.length;
          if (cnt == 0) return;
          var splinePoints = [];
          var prev = points[0];
          if (prev.curveType == CurveType.CRSpline) splinePoints.push(new Vec2(prev.x, prev.y));
          for (var i = 1; i < cnt; i++) {
            var current = points[i];
            if (prev.curveType != CurveType.CRSpline) {
              var seg = {};
              seg.type = prev.curveType;
              seg.ptStart = this._points.length;
              if (prev.curveType == CurveType.Straight) {
                seg.ptCount = 2;
                this._points.push(new Vec2(prev.x, prev.y));
                this._points.push(new Vec2(current.x, current.y));
              } else if (prev.curveType == CurveType.Bezier) {
                seg.ptCount = 3;
                this._points.push(new Vec2(prev.x, prev.y));
                this._points.push(new Vec2(current.x, current.y));
                this._points.push(new Vec2(prev.control1_x, prev.control1_y));
              } else if (prev.curveType == CurveType.CubicBezier) {
                seg.ptCount = 4;
                this._points.push(new Vec2(prev.x, prev.y));
                this._points.push(new Vec2(current.x, current.y));
                this._points.push(new Vec2(prev.control1_x, prev.control1_y));
                this._points.push(new Vec2(prev.control2_x, prev.control2_y));
              }
              seg.length = distance(prev.x, prev.y, current.x, current.y);
              this._fullLength += seg.length;
              this._segments.push(seg);
            }
            if (current.curveType != CurveType.CRSpline) {
              if (splinePoints.length > 0) {
                splinePoints.push(new Vec2(current.x, current.y));
                this.createSplineSegment(splinePoints);
              }
            } else splinePoints.push(new Vec2(current.x, current.y));
            prev = current;
          }
          if (splinePoints.length > 1) this.createSplineSegment(splinePoints);
        };
        _proto44.createSplineSegment = function createSplineSegment(splinePoints) {
          var cnt = splinePoints.length;
          splinePoints.splice(0, 0, splinePoints[0]);
          splinePoints.push(splinePoints[cnt]);
          splinePoints.push(splinePoints[cnt]);
          cnt += 3;
          var seg = {};
          seg.type = CurveType.CRSpline;
          seg.ptStart = this._points.length;
          seg.ptCount = cnt;
          this._points = this._points.concat(splinePoints);
          seg.length = 0;
          for (var i = 1; i < cnt; i++) {
            seg.length += distance(splinePoints[i - 1].x, splinePoints[i - 1].y, splinePoints[i].x, splinePoints[i].y);
          }
          this._fullLength += seg.length;
          this._segments.push(seg);
          splinePoints.length = 0;
        };
        _proto44.clear = function clear() {
          this._segments.length = 0;
          this._points.length = 0;
        };
        _proto44.getPointAt = function getPointAt(t, result) {
          if (!result) result = new Vec2();else result.set(0, 0);
          t = math.clamp01(t);
          var cnt = this._segments.length;
          if (cnt == 0) {
            return result;
          }
          var seg;
          if (t == 1) {
            seg = this._segments[cnt - 1];
            if (seg.type == CurveType.Straight) {
              result.x = math.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
              result.y = math.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
              return result;
            } else if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier) return this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);else return this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);
          }
          var len = t * this._fullLength;
          for (var i = 0; i < cnt; i++) {
            seg = this._segments[i];
            len -= seg.length;
            if (len < 0) {
              t = 1 + len / seg.length;
              if (seg.type == CurveType.Straight) {
                result.x = math.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
                result.y = math.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
              } else if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier) result = this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);else result = this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);
              break;
            }
          }
          return result;
        };
        _proto44.getAnchorsInSegment = function getAnchorsInSegment(segmentIndex, points) {
          if (points == null) points = new Array();
          var seg = this._segments[segmentIndex];
          for (var i = 0; i < seg.ptCount; i++) points.push(new Vec2(this._points[seg.ptStart + i].x, this._points[seg.ptStart + i].y));
          return points;
        };
        _proto44.getPointsInSegment = function getPointsInSegment(segmentIndex, t0, t1, points, ts, pointDensity) {
          if (points == null) points = new Array();
          if (!pointDensity || isNaN(pointDensity)) pointDensity = 0.1;
          if (ts) ts.push(t0);
          var seg = this._segments[segmentIndex];
          if (seg.type == CurveType.Straight) {
            points.push(new Vec2(math.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t0), math.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t0)));
            points.push(new Vec2(math.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t1), math.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t1)));
          } else {
            var func;
            if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier) func = this.onBezierCurve;else func = this.onCRSplineCurve;
            points.push(func.call(this, seg.ptStart, seg.ptCount, t0, new Vec2()));
            var SmoothAmount = Math.min(seg.length * pointDensity, 50);
            for (var j = 0; j <= SmoothAmount; j++) {
              var t = j / SmoothAmount;
              if (t > t0 && t < t1) {
                points.push(func.call(this, seg.ptStart, seg.ptCount, t, new Vec2()));
                if (ts) ts.push(t);
              }
            }
            points.push(func.call(this, seg.ptStart, seg.ptCount, t1, new Vec2()));
          }
          if (ts) ts.push(t1);
          return points;
        };
        _proto44.getAllPoints = function getAllPoints(points, ts, pointDensity) {
          if (points == null) points = new Array();
          if (!pointDensity || isNaN(pointDensity)) pointDensity = 0.1;
          var cnt = this._segments.length;
          for (var i = 0; i < cnt; i++) this.getPointsInSegment(i, 0, 1, points, ts, pointDensity);
          return points;
        };
        _proto44.onCRSplineCurve = function onCRSplineCurve(ptStart, ptCount, t, result) {
          var adjustedIndex = Math.floor(t * (ptCount - 4)) + ptStart; //Since the equation works with 4 points, we adjust the starting point depending on t to return a point on the specific segment
          var p0x = this._points[adjustedIndex].x;
          var p0y = this._points[adjustedIndex].y;
          var p1x = this._points[adjustedIndex + 1].x;
          var p1y = this._points[adjustedIndex + 1].y;
          var p2x = this._points[adjustedIndex + 2].x;
          var p2y = this._points[adjustedIndex + 2].y;
          var p3x = this._points[adjustedIndex + 3].x;
          var p3y = this._points[adjustedIndex + 3].y;
          var adjustedT = t == 1 ? 1 : math.repeat(t * (ptCount - 4), 1); // Then we adjust t to be that value on that new piece of segment... for t == 1f don't use repeat (that would return 0f);
          var t0 = ((-adjustedT + 2) * adjustedT - 1) * adjustedT * 0.5;
          var t1 = ((3 * adjustedT - 5) * adjustedT * adjustedT + 2) * 0.5;
          var t2 = ((-3 * adjustedT + 4) * adjustedT + 1) * adjustedT * 0.5;
          var t3 = (adjustedT - 1) * adjustedT * adjustedT * 0.5;
          result.x = p0x * t0 + p1x * t1 + p2x * t2 + p3x * t3;
          result.y = p0y * t0 + p1y * t1 + p2y * t2 + p3y * t3;
          return result;
        };
        _proto44.onBezierCurve = function onBezierCurve(ptStart, ptCount, t, result) {
          var t2 = 1 - t;
          var p0x = this._points[ptStart].x;
          var p0y = this._points[ptStart].y;
          var p1x = this._points[ptStart + 1].x;
          var p1y = this._points[ptStart + 1].y;
          var cp0x = this._points[ptStart + 2].x;
          var cp0y = this._points[ptStart + 2].y;
          if (ptCount == 4) {
            var cp1x = this._points[ptStart + 3].x;
            var cp1y = this._points[ptStart + 3].y;
            result.x = t2 * t2 * t2 * p0x + 3 * t2 * t2 * t * cp0x + 3 * t2 * t * t * cp1x + t * t * t * p1x;
            result.y = t2 * t2 * t2 * p0y + 3 * t2 * t2 * t * cp0y + 3 * t2 * t * t * cp1y + t * t * t * p1y;
          } else {
            result.x = t2 * t2 * p0x + 2 * t2 * t * cp0x + t * t * p1x;
            result.y = t2 * t2 * p0y + 2 * t2 * t * cp0y + t * t * p1y;
          }
          return result;
        };
        _createClass(GPath, [{
          key: "length",
          get: function get() {
            return this._fullLength;
          }
        }, {
          key: "segmentCount",
          get: function get() {
            return this._segments.length;
          }
        }]);
        return GPath;
      }();
      function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      }
      var Transition = exports('Transition', /*#__PURE__*/function () {
        function Transition(owner) {
          this._ownerBaseX = 0;
          this._ownerBaseY = 0;
          this._totalTimes = 0;
          this._totalTasks = 0;
          this._options = 0;
          this._totalDuration = 0;
          this._autoPlayTimes = 1;
          this._autoPlayDelay = 0;
          this._timeScale = 1;
          this._startTime = 0;
          this._endTime = 0;
          this._owner = owner;
          this._items = new Array();
        }
        var _proto45 = Transition.prototype;
        _proto45.play = function play(onComplete, times, delay, startTime, endTime) {
          this._play(onComplete, times, delay, startTime, endTime, false);
        };
        _proto45.playReverse = function playReverse(onComplete, times, delay) {
          this._play(onComplete, times, delay, 0, -1, true);
        };
        _proto45.changePlayTimes = function changePlayTimes(value) {
          this._totalTimes = value;
        };
        _proto45.setAutoPlay = function setAutoPlay(value, times, delay) {
          if (times == undefined) times = -1;
          if (delay == undefined) delay = 0;
          if (this._autoPlay != value) {
            this._autoPlay = value;
            this._autoPlayTimes = times;
            this._autoPlayDelay = delay;
            if (this._autoPlay) {
              if (this._owner.onStage) this.play(null, this._autoPlayTimes, this._autoPlayDelay);
            } else {
              if (!this._owner.onStage) this.stop(false, true);
            }
          }
        };
        _proto45._play = function _play(onComplete, times, delay, startTime, endTime, reversed) {
          if (times == undefined) times = 1;
          if (delay == undefined) delay = 0;
          if (startTime == undefined) startTime = 0;
          if (endTime == undefined) endTime = -1;
          this.stop(true, true);
          this._totalTimes = times;
          this._reversed = reversed;
          this._startTime = startTime;
          this._endTime = endTime;
          this._playing = true;
          this._paused = false;
          this._onComplete = onComplete;
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.target == null) {
              if (item.targetId) item.target = this._owner.getChildById(item.targetId);else item.target = this._owner;
            } else if (item.target != this._owner && item.target.parent != this._owner) item.target = null;
            if (item.target && item.type == ActionType.Transition) {
              var trans = item.target.getTransition(item.value.transName);
              if (trans == this) trans = null;
              if (trans) {
                if (item.value.playTimes == 0)
                  //stop
                  {
                    var j;
                    for (j = i - 1; j >= 0; j--) {
                      var item2 = this._items[j];
                      if (item2.type == ActionType.Transition) {
                        if (item2.value.trans == trans) {
                          item2.value.stopTime = item.time - item2.time;
                          break;
                        }
                      }
                    }
                    if (j < 0) item.value.stopTime = 0;else trans = null; //no need to handle stop anymore
                  } else item.value.stopTime = -1;
              }
              item.value.trans = trans;
            }
          }
          if (delay == 0) this.onDelayedPlay();else GTween.delayedCall(delay).setTarget(this).onComplete(this.onDelayedPlay, this);
        };
        _proto45.stop = function stop(setToComplete, processCallback) {
          if (setToComplete == undefined) setToComplete = true;
          if (!this._playing) return;
          this._playing = false;
          this._totalTasks = 0;
          this._totalTimes = 0;
          var func = this._onComplete;
          this._onComplete = null;
          GTween.kill(this); //delay start
          var cnt = this._items.length;
          if (this._reversed) {
            for (var i = cnt - 1; i >= 0; i--) {
              var item = this._items[i];
              if (item.target == null) continue;
              this.stopItem(item, setToComplete);
            }
          } else {
            for (i = 0; i < cnt; i++) {
              item = this._items[i];
              if (item.target == null) continue;
              this.stopItem(item, setToComplete);
            }
          }
          if (processCallback && func != null) {
            func();
          }
        };
        _proto45.stopItem = function stopItem(item, setToComplete) {
          if (item.displayLockToken != 0) {
            item.target.releaseDisplayLock(item.displayLockToken);
            item.displayLockToken = 0;
          }
          if (item.tweener) {
            item.tweener.kill(setToComplete);
            item.tweener = null;
            if (item.type == ActionType.Shake && !setToComplete)
              //震动必须归位，否则下次就越震越远了。
              {
                item.target._gearLocked = true;
                item.target.setPosition(item.target.x - item.value.lastOffsetX, item.target.y - item.value.lastOffsetY);
                item.target._gearLocked = false;
              }
          }
          if (item.type == ActionType.Transition) {
            var trans = item.value.trans;
            if (trans) trans.stop(setToComplete, false);
          }
        };
        _proto45.setPaused = function setPaused(paused) {
          if (!this._playing || this._paused == paused) return;
          this._paused = paused;
          var tweener = GTween.getTween(this);
          if (tweener) tweener.setPaused(paused);
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.target == null) continue;
            if (item.type == ActionType.Transition) {
              if (item.value.trans) item.value.trans.setPaused(paused);
            } else if (item.type == ActionType.Animation) {
              if (paused) {
                item.value.flag = item.target.getProp(ObjectPropID.Playing);
                item.target.setProp(ObjectPropID.Playing, false);
              } else item.target.setProp(ObjectPropID.Playing, item.value.flag);
            }
            if (item.tweener) item.tweener.setPaused(paused);
          }
        };
        _proto45.dispose = function dispose() {
          if (this._playing) GTween.kill(this); //delay start
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.tweener) {
              item.tweener.kill();
              item.tweener = null;
            }
            item.target = null;
            item.hook = null;
            if (item.tweenConfig) item.tweenConfig.endHook = null;
          }
          this._items.length = 0;
          this._playing = false;
          this._onComplete = null;
        };
        _proto45.setValue = function setValue(label) {
          var cnt = this._items.length;
          var value;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
              if (item.tweenConfig) value = item.tweenConfig.startValue;else value = item.value;
            } else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
              value = item.tweenConfig.endValue;
            } else continue;
            switch (item.type) {
              case ActionType.XY:
              case ActionType.Size:
              case ActionType.Pivot:
              case ActionType.Scale:
              case ActionType.Skew:
                value.b1 = true;
                value.b2 = true;
                value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                value.f2 = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
                break;
              case ActionType.Alpha:
                value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                break;
              case ActionType.Rotation:
                value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                break;
              case ActionType.Color:
                value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                break;
              case ActionType.Animation:
                value.frame = parseInt(arguments.length <= 1 ? undefined : arguments[1]);
                if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.playing = arguments.length <= 2 ? undefined : arguments[2];
                break;
              case ActionType.Visible:
                value.visible = arguments.length <= 1 ? undefined : arguments[1];
                break;
              case ActionType.Sound:
                value.sound = arguments.length <= 1 ? undefined : arguments[1];
                if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.volume = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
                break;
              case ActionType.Transition:
                value.transName = arguments.length <= 1 ? undefined : arguments[1];
                if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.playTimes = parseInt(arguments.length <= 2 ? undefined : arguments[2]);
                break;
              case ActionType.Shake:
                value.amplitude = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.duration = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
                break;
              case ActionType.ColorFilter:
                value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
                value.f2 = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
                value.f3 = parseFloat(arguments.length <= 3 ? undefined : arguments[3]);
                value.f4 = parseFloat(arguments.length <= 4 ? undefined : arguments[4]);
                break;
              case ActionType.Text:
              case ActionType.Icon:
                value.text = arguments.length <= 1 ? undefined : arguments[1];
                break;
            }
          }
        };
        _proto45.setHook = function setHook(label, callback) {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
              item.hook = callback;
              break;
            } else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
              item.tweenConfig.endHook = callback;
              break;
            }
          }
        };
        _proto45.clearHooks = function clearHooks() {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            item.hook = null;
            if (item.tweenConfig) item.tweenConfig.endHook = null;
          }
        };
        _proto45.setTarget = function setTarget(label, newTarget) {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
              item.targetId = newTarget.id;
              item.target = null;
            }
          }
        };
        _proto45.setDuration = function setDuration(label, value) {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.tweenConfig && item.label == label) item.tweenConfig.duration = value;
          }
        };
        _proto45.getLabelTime = function getLabelTime(label) {
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) return item.time;else if (item.tweenConfig && item.tweenConfig.endLabel == label) return item.time + item.tweenConfig.duration;
          }
          return Number.NaN;
        };
        _proto45.updateFromRelations = function updateFromRelations(targetId, dx, dy) {
          var cnt = this._items.length;
          if (cnt == 0) return;
          for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.type == ActionType.XY && item.targetId == targetId) {
              if (item.tweenConfig) {
                item.tweenConfig.startValue.f1 += dx;
                item.tweenConfig.startValue.f2 += dy;
                item.tweenConfig.endValue.f1 += dx;
                item.tweenConfig.endValue.f2 += dy;
              } else {
                item.value.f1 += dx;
                item.value.f2 += dy;
              }
            }
          }
        };
        _proto45.onEnable = function onEnable() {
          if (this._autoPlay && !this._playing) this.play(null, this._autoPlayTimes, this._autoPlayDelay);
        };
        _proto45.onDisable = function onDisable() {
          if ((this._options & OPTION_AUTO_STOP_DISABLED) == 0) this.stop((this._options & OPTION_AUTO_STOP_AT_END) != 0 ? true : false, false);
        };
        _proto45.onDelayedPlay = function onDelayedPlay() {
          this.internalPlay();
          this._playing = this._totalTasks > 0;
          if (this._playing) {
            if ((this._options & OPTION_IGNORE_DISPLAY_CONTROLLER) != 0) {
              var cnt = this._items.length;
              for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.target && item.target != this._owner) item.displayLockToken = item.target.addDisplayLock();
              }
            }
          } else if (this._onComplete != null) {
            var func = this._onComplete;
            this._onComplete = null;
            func();
          }
        };
        _proto45.internalPlay = function internalPlay() {
          this._ownerBaseX = this._owner.x;
          this._ownerBaseY = this._owner.y;
          this._totalTasks = 1;
          var cnt = this._items.length;
          var item;
          var needSkipAnimations = false;
          var i;
          if (!this._reversed) {
            for (i = 0; i < cnt; i++) {
              item = this._items[i];
              if (item.target == null) continue;
              if (item.type == ActionType.Animation && this._startTime != 0 && item.time <= this._startTime) {
                needSkipAnimations = true;
                item.value.flag = false;
              } else this.playItem(item);
            }
          } else {
            for (i = cnt - 1; i >= 0; i--) {
              item = this._items[i];
              if (item.target == null) continue;
              this.playItem(item);
            }
          }
          if (needSkipAnimations) this.skipAnimations();
          this._totalTasks--;
        };
        _proto45.playItem = function playItem(item) {
          var time;
          if (item.tweenConfig) {
            if (this._reversed) time = this._totalDuration - item.time - item.tweenConfig.duration;else time = item.time;
            if (this._endTime == -1 || time <= this._endTime) {
              var startValue;
              var endValue;
              if (this._reversed) {
                startValue = item.tweenConfig.endValue;
                endValue = item.tweenConfig.startValue;
              } else {
                startValue = item.tweenConfig.startValue;
                endValue = item.tweenConfig.endValue;
              }
              item.value.b1 = startValue.b1 || endValue.b1;
              item.value.b2 = startValue.b2 || endValue.b2;
              switch (item.type) {
                case ActionType.XY:
                case ActionType.Size:
                case ActionType.Scale:
                case ActionType.Skew:
                  item.tweener = GTween.to2(startValue.f1, startValue.f2, endValue.f1, endValue.f2, item.tweenConfig.duration);
                  break;
                case ActionType.Alpha:
                case ActionType.Rotation:
                  item.tweener = GTween.to(startValue.f1, endValue.f1, item.tweenConfig.duration);
                  break;
                case ActionType.Color:
                  item.tweener = GTween.toColor(startValue.f1, endValue.f1, item.tweenConfig.duration);
                  break;
                case ActionType.ColorFilter:
                  item.tweener = GTween.to4(startValue.f1, startValue.f2, startValue.f3, startValue.f4, endValue.f1, endValue.f2, endValue.f3, endValue.f4, item.tweenConfig.duration);
                  break;
              }
              item.tweener.setDelay(time).setEase(item.tweenConfig.easeType).setRepeat(item.tweenConfig.repeat, item.tweenConfig.yoyo).setTimeScale(this._timeScale).setTarget(item).onStart(this.onTweenStart, this).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this);
              if (this._endTime >= 0) item.tweener.setBreakpoint(this._endTime - time);
              this._totalTasks++;
            }
          } else if (item.type == ActionType.Shake) {
            if (this._reversed) time = this._totalDuration - item.time - item.value.duration;else time = item.time;
            item.value.offsetX = item.value.offsetY = 0;
            item.value.lastOffsetX = item.value.lastOffsetY = 0;
            item.tweener = GTween.shake(0, 0, item.value.amplitude, item.value.duration).setDelay(time).setTimeScale(this._timeScale).setTarget(item).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this);
            if (this._endTime >= 0) item.tweener.setBreakpoint(this._endTime - item.time);
            this._totalTasks++;
          } else {
            if (this._reversed) time = this._totalDuration - item.time;else time = item.time;
            if (time <= this._startTime) {
              this.applyValue(item);
              this.callHook(item, false);
            } else if (this._endTime == -1 || time <= this._endTime) {
              this._totalTasks++;
              item.tweener = GTween.delayedCall(time).setTimeScale(this._timeScale).setTarget(item).onComplete(this.onDelayedPlayItem, this);
            }
          }
          if (item.tweener) item.tweener.seek(this._startTime);
        };
        _proto45.skipAnimations = function skipAnimations() {
          var frame;
          var playStartTime;
          var playTotalTime;
          var value;
          var target;
          var item;
          var cnt = this._items.length;
          for (var i = 0; i < cnt; i++) {
            item = this._items[i];
            if (item.type != ActionType.Animation || item.time > this._startTime) continue;
            value = item.value;
            if (value.flag) continue;
            target = item.target;
            frame = target.getProp(ObjectPropID.Frame);
            playStartTime = target.getProp(ObjectPropID.Playing) ? 0 : -1;
            playTotalTime = 0;
            for (var j = i; j < cnt; j++) {
              item = this._items[j];
              if (item.type != ActionType.Animation || item.target != target || item.time > this._startTime) continue;
              value = item.value;
              value.flag = true;
              if (value.frame != -1) {
                frame = value.frame;
                if (value.playing) playStartTime = item.time;else playStartTime = -1;
                playTotalTime = 0;
              } else {
                if (value.playing) {
                  if (playStartTime < 0) playStartTime = item.time;
                } else {
                  if (playStartTime >= 0) playTotalTime += item.time - playStartTime;
                  playStartTime = -1;
                }
              }
              this.callHook(item, false);
            }
            if (playStartTime >= 0) playTotalTime += this._startTime - playStartTime;
            target.setProp(ObjectPropID.Playing, playStartTime >= 0);
            target.setProp(ObjectPropID.Frame, frame);
            if (playTotalTime > 0) target.setProp(ObjectPropID.DeltaTime, playTotalTime);
          }
        };
        _proto45.onDelayedPlayItem = function onDelayedPlayItem(tweener) {
          var item = tweener.target;
          item.tweener = null;
          this._totalTasks--;
          this.applyValue(item);
          this.callHook(item, false);
          this.checkAllComplete();
        };
        _proto45.onTweenStart = function onTweenStart(tweener) {
          var item = tweener.target;
          if (item.type == ActionType.XY || item.type == ActionType.Size)
            //位置和大小要到start才最终确认起始值
            {
              var startValue;
              var endValue;
              if (this._reversed) {
                startValue = item.tweenConfig.endValue;
                endValue = item.tweenConfig.startValue;
              } else {
                startValue = item.tweenConfig.startValue;
                endValue = item.tweenConfig.endValue;
              }
              if (item.type == ActionType.XY) {
                if (item.target != this._owner) {
                  if (!startValue.b1) tweener.startValue.x = item.target.x;else if (startValue.b3)
                    //percent
                    tweener.startValue.x = startValue.f1 * this._owner.width;
                  if (!startValue.b2) tweener.startValue.y = item.target.y;else if (startValue.b3)
                    //percent
                    tweener.startValue.y = startValue.f2 * this._owner.height;
                  if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;else if (endValue.b3) tweener.endValue.x = endValue.f1 * this._owner.width;
                  if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;else if (endValue.b3) tweener.endValue.y = endValue.f2 * this._owner.height;
                } else {
                  if (!startValue.b1) tweener.startValue.x = item.target.x - this._ownerBaseX;
                  if (!startValue.b2) tweener.startValue.y = item.target.y - this._ownerBaseY;
                  if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;
                  if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;
                }
              } else {
                if (!startValue.b1) tweener.startValue.x = item.target.width;
                if (!startValue.b2) tweener.startValue.y = item.target.height;
                if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;
                if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;
              }
              if (item.tweenConfig.path) {
                item.value.b1 = item.value.b2 = true;
                tweener.setPath(item.tweenConfig.path);
              }
            }
          this.callHook(item, false);
        };
        _proto45.onTweenUpdate = function onTweenUpdate(tweener) {
          var item = tweener.target;
          switch (item.type) {
            case ActionType.XY:
            case ActionType.Size:
            case ActionType.Scale:
            case ActionType.Skew:
              item.value.f1 = tweener.value.x;
              item.value.f2 = tweener.value.y;
              if (item.tweenConfig.path) {
                item.value.f1 += tweener.startValue.x;
                item.value.f2 += tweener.startValue.y;
              }
              break;
            case ActionType.Alpha:
            case ActionType.Rotation:
              item.value.f1 = tweener.value.x;
              break;
            case ActionType.Color:
              item.value.f1 = tweener.value.color;
              break;
            case ActionType.ColorFilter:
              item.value.f1 = tweener.value.x;
              item.value.f2 = tweener.value.y;
              item.value.f3 = tweener.value.z;
              item.value.f4 = tweener.value.w;
              break;
            case ActionType.Shake:
              item.value.offsetX = tweener.deltaValue.x;
              item.value.offsetY = tweener.deltaValue.y;
              break;
          }
          this.applyValue(item);
        };
        _proto45.onTweenComplete = function onTweenComplete(tweener) {
          var item = tweener.target;
          item.tweener = null;
          this._totalTasks--;
          if (tweener.allCompleted)
            //当整体播放结束时间在这个tween的中间时不应该调用结尾钩子
            this.callHook(item, true);
          this.checkAllComplete();
        };
        _proto45.onPlayTransCompleted = function onPlayTransCompleted(item) {
          this._totalTasks--;
          this.checkAllComplete();
        };
        _proto45.callHook = function callHook(item, tweenEnd) {
          if (tweenEnd) {
            if (item.tweenConfig && item.tweenConfig.endHook != null) item.tweenConfig.endHook(item.label);
          } else {
            if (item.time >= this._startTime && item.hook != null) item.hook(item.label);
          }
        };
        _proto45.checkAllComplete = function checkAllComplete() {
          if (this._playing && this._totalTasks == 0) {
            if (this._totalTimes < 0) {
              this.internalPlay();
              if (this._totalTasks == 0) GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);
            } else {
              this._totalTimes--;
              if (this._totalTimes > 0) {
                this.internalPlay();
                if (this._totalTasks == 0) GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);
              } else {
                this._playing = false;
                var cnt = this._items.length;
                for (var i = 0; i < cnt; i++) {
                  var item = this._items[i];
                  if (item.target && item.displayLockToken != 0) {
                    item.target.releaseDisplayLock(item.displayLockToken);
                    item.displayLockToken = 0;
                  }
                }
                if (this._onComplete != null) {
                  var func = this._onComplete;
                  this._onComplete = null;
                  func();
                }
              }
            }
          }
        };
        _proto45.applyValue = function applyValue(item) {
          item.target._gearLocked = true;
          var value = item.value;
          switch (item.type) {
            case ActionType.XY:
              if (item.target == this._owner) {
                if (value.b1 && value.b2) item.target.setPosition(value.f1 + this._ownerBaseX, value.f2 + this._ownerBaseY);else if (value.b1) item.target.x = value.f1 + this._ownerBaseX;else item.target.y = value.f2 + this._ownerBaseY;
              } else {
                if (value.b3)
                  //position in percent
                  {
                    if (value.b1 && value.b2) item.target.setPosition(value.f1 * this._owner.width, value.f2 * this._owner.height);else if (value.b1) item.target.x = value.f1 * this._owner.width;else if (value.b2) item.target.y = value.f2 * this._owner.height;
                  } else {
                  if (value.b1 && value.b2) item.target.setPosition(value.f1, value.f2);else if (value.b1) item.target.x = value.f1;else if (value.b2) item.target.y = value.f2;
                }
              }
              break;
            case ActionType.Size:
              if (!value.b1) value.f1 = item.target.width;
              if (!value.b2) value.f2 = item.target.height;
              item.target.setSize(value.f1, value.f2);
              break;
            case ActionType.Pivot:
              item.target.setPivot(value.f1, value.f2, item.target.pivotAsAnchor);
              break;
            case ActionType.Alpha:
              item.target.alpha = value.f1;
              break;
            case ActionType.Rotation:
              item.target.rotation = value.f1;
              break;
            case ActionType.Scale:
              item.target.setScale(value.f1, value.f2);
              break;
            case ActionType.Skew:
              //item.target.setSkew(value.f1, value.f2);
              break;
            case ActionType.Color:
              var color = item.target.getProp(ObjectPropID.Color);
              if (color instanceof Color) {
                var i = Math.floor(value.f1);
                color.r = i >> 16 & 0xFF;
                color.g = i >> 8 & 0xFF;
                color.b = i & 0xFF;
                item.target.setProp(ObjectPropID.Color, color);
              }
              break;
            case ActionType.Animation:
              if (value.frame >= 0) item.target.setProp(ObjectPropID.Frame, value.frame);
              item.target.setProp(ObjectPropID.Playing, value.playing);
              item.target.setProp(ObjectPropID.TimeScale, this._timeScale);
              break;
            case ActionType.Visible:
              item.target.visible = value.visible;
              break;
            case ActionType.Transition:
              if (this._playing) {
                var trans = value.trans;
                if (trans) {
                  this._totalTasks++;
                  var startTime = this._startTime > item.time ? this._startTime - item.time : 0;
                  var endTime = this._endTime >= 0 ? this._endTime - item.time : -1;
                  if (value.stopTime >= 0 && (endTime < 0 || endTime > value.stopTime)) endTime = value.stopTime;
                  trans.timeScale = this._timeScale;
                  var localThis = this;
                  trans._play(function () {
                    localThis.onPlayTransCompleted(item);
                  }, value.playTimes, 0, startTime, endTime, this._reversed);
                }
              }
              break;
            case ActionType.Sound:
              if (this._playing && item.time >= this._startTime) {
                if (value.audioClip == null) {
                  var pi = UIPackage.getItemByURL(value.sound);
                  if (pi) value.audioClip = pi.owner.getItemAsset(pi);
                }
                if (value.audioClip) Decls$1.GRoot.inst.playOneShotSound(value.audioClip, value.volume);
              }
              break;
            case ActionType.Shake:
              item.target.setPosition(item.target.x - value.lastOffsetX + value.offsetX, item.target.y - value.lastOffsetY + value.offsetY);
              value.lastOffsetX = value.offsetX;
              value.lastOffsetY = value.offsetY;
              break;
            case ActionType.ColorFilter:
              {
                //TODO: filter support
                break;
              }
            case ActionType.Text:
              item.target.text = value.text;
              break;
            case ActionType.Icon:
              item.target.icon = value.text;
              break;
          }
          item.target._gearLocked = false;
        };
        _proto45.setup = function setup(buffer) {
          this.name = buffer.readS();
          this._options = buffer.readInt();
          this._autoPlay = buffer.readBool();
          this._autoPlayTimes = buffer.readInt();
          this._autoPlayDelay = buffer.readFloat();
          var cnt = buffer.readShort();
          for (var i = 0; i < cnt; i++) {
            var dataLen = buffer.readShort();
            var curPos = buffer.position;
            buffer.seek(curPos, 0);
            var item = new Item(buffer.readByte());
            this._items[i] = item;
            item.time = buffer.readFloat();
            var targetId = buffer.readShort();
            if (targetId < 0) item.targetId = "";else item.targetId = this._owner.getChildAt(targetId).id;
            item.label = buffer.readS();
            if (buffer.readBool()) {
              buffer.seek(curPos, 1);
              item.tweenConfig = new TweenConfig();
              item.tweenConfig.duration = buffer.readFloat();
              if (item.time + item.tweenConfig.duration > this._totalDuration) this._totalDuration = item.time + item.tweenConfig.duration;
              item.tweenConfig.easeType = buffer.readByte();
              item.tweenConfig.repeat = buffer.readInt();
              item.tweenConfig.yoyo = buffer.readBool();
              item.tweenConfig.endLabel = buffer.readS();
              buffer.seek(curPos, 2);
              this.decodeValue(item, buffer, item.tweenConfig.startValue);
              buffer.seek(curPos, 3);
              this.decodeValue(item, buffer, item.tweenConfig.endValue);
              if (buffer.version >= 2) {
                var pathLen = buffer.readInt();
                if (pathLen > 0) {
                  item.tweenConfig.path = new GPath();
                  var pts = new Array();
                  for (var j = 0; j < pathLen; j++) {
                    var curveType = buffer.readByte();
                    switch (curveType) {
                      case CurveType.Bezier:
                        pts.push(GPathPoint.newBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                        break;
                      case CurveType.CubicBezier:
                        pts.push(GPathPoint.newCubicBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                        break;
                      default:
                        pts.push(GPathPoint.newPoint(buffer.readFloat(), buffer.readFloat(), curveType));
                        break;
                    }
                  }
                  item.tweenConfig.path.create(pts);
                }
              }
            } else {
              if (item.time > this._totalDuration) this._totalDuration = item.time;
              buffer.seek(curPos, 2);
              this.decodeValue(item, buffer, item.value);
            }
            buffer.position = curPos + dataLen;
          }
        };
        _proto45.decodeValue = function decodeValue(item, buffer, value) {
          switch (item.type) {
            case ActionType.XY:
            case ActionType.Size:
            case ActionType.Pivot:
            case ActionType.Skew:
              value.b1 = buffer.readBool();
              value.b2 = buffer.readBool();
              value.f1 = buffer.readFloat();
              value.f2 = buffer.readFloat();
              if (buffer.version >= 2 && item.type == ActionType.XY) value.b3 = buffer.readBool(); //percent
              break;
            case ActionType.Alpha:
            case ActionType.Rotation:
              value.f1 = buffer.readFloat();
              break;
            case ActionType.Scale:
              value.f1 = buffer.readFloat();
              value.f2 = buffer.readFloat();
              break;
            case ActionType.Color:
              var color = buffer.readColor();
              value.f1 = (color.r << 16) + (color.g << 8) + color.b;
              break;
            case ActionType.Animation:
              value.playing = buffer.readBool();
              value.frame = buffer.readInt();
              break;
            case ActionType.Visible:
              value.visible = buffer.readBool();
              break;
            case ActionType.Sound:
              value.sound = buffer.readS();
              value.volume = buffer.readFloat();
              break;
            case ActionType.Transition:
              value.transName = buffer.readS();
              value.playTimes = buffer.readInt();
              break;
            case ActionType.Shake:
              value.amplitude = buffer.readFloat();
              value.duration = buffer.readFloat();
              break;
            case ActionType.ColorFilter:
              value.f1 = buffer.readFloat();
              value.f2 = buffer.readFloat();
              value.f3 = buffer.readFloat();
              value.f4 = buffer.readFloat();
              break;
            case ActionType.Text:
            case ActionType.Icon:
              value.text = buffer.readS();
              break;
          }
        };
        _createClass(Transition, [{
          key: "playing",
          get: function get() {
            return this._playing;
          }
        }, {
          key: "timeScale",
          get: function get() {
            return this._timeScale;
          },
          set: function set(value) {
            if (this._timeScale != value) {
              this._timeScale = value;
              if (this._playing) {
                var cnt = this._items.length;
                for (var i = 0; i < cnt; i++) {
                  var item = this._items[i];
                  if (item.tweener) item.tweener.setTimeScale(value);else if (item.type == ActionType.Transition) {
                    if (item.value.trans) item.value.trans.timeScale = value;
                  } else if (item.type == ActionType.Animation) {
                    if (item.target) item.target.setProp(ObjectPropID.TimeScale, value);
                  }
                }
              }
            }
          }
        }]);
        return Transition;
      }());
      var OPTION_IGNORE_DISPLAY_CONTROLLER = 1;
      var OPTION_AUTO_STOP_DISABLED = 2;
      var OPTION_AUTO_STOP_AT_END = 4;
      var ActionType;
      (function (ActionType) {
        ActionType[ActionType["XY"] = 0] = "XY";
        ActionType[ActionType["Size"] = 1] = "Size";
        ActionType[ActionType["Scale"] = 2] = "Scale";
        ActionType[ActionType["Pivot"] = 3] = "Pivot";
        ActionType[ActionType["Alpha"] = 4] = "Alpha";
        ActionType[ActionType["Rotation"] = 5] = "Rotation";
        ActionType[ActionType["Color"] = 6] = "Color";
        ActionType[ActionType["Animation"] = 7] = "Animation";
        ActionType[ActionType["Visible"] = 8] = "Visible";
        ActionType[ActionType["Sound"] = 9] = "Sound";
        ActionType[ActionType["Transition"] = 10] = "Transition";
        ActionType[ActionType["Shake"] = 11] = "Shake";
        ActionType[ActionType["ColorFilter"] = 12] = "ColorFilter";
        ActionType[ActionType["Skew"] = 13] = "Skew";
        ActionType[ActionType["Text"] = 14] = "Text";
        ActionType[ActionType["Icon"] = 15] = "Icon";
        ActionType[ActionType["Unknown"] = 16] = "Unknown";
      })(ActionType || (ActionType = {}));
      var Item = function Item(type) {
        this.type = type;
        this.value = {};
        this.displayLockToken = 0;
      };
      var TweenConfig = function TweenConfig() {
        this.easeType = EaseType.QuadOut;
        this.startValue = {
          b1: true,
          b2: true
        };
        this.endValue = {
          b1: true,
          b2: true
        };
      };
      var GComponent = exports('GComponent', /*#__PURE__*/function (_GObject6) {
        _inheritsLoose(GComponent, _GObject6);
        function GComponent() {
          var _this18;
          _this18 = _GObject6.call(this) || this;
          _this18._sortingChildCount = 0;
          _this18._invertedMask = false;
          _this18._childrenRenderOrder = ChildrenRenderOrder.Ascent;
          _this18._apexIndex = 0;
          _this18._node.name = "GComponent";
          _this18._children = new Array();
          _this18._controllers = new Array();
          _this18._transitions = new Array();
          _this18._margin = new Margin();
          _this18._alignOffset = new Vec2();
          _this18._container = new Node("Container");
          _this18._container.layer = UIConfig.defaultUILayer;
          _this18._containerUITrans = _this18._container.addComponent(UITransform);
          _this18._containerUITrans.setAnchorPoint(0, 1);
          _this18._node.addChild(_this18._container);
          return _this18;
        }
        var _proto46 = GComponent.prototype;
        _proto46.dispose = function dispose() {
          var i;
          var cnt;
          cnt = this._transitions.length;
          for (i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            trans.dispose();
          }
          cnt = this._controllers.length;
          for (i = 0; i < cnt; ++i) {
            var cc = this._controllers[i];
            cc.dispose();
          }
          if (this._scrollPane) this._scrollPane.destroy();
          cnt = this._children.length;
          for (i = cnt - 1; i >= 0; --i) {
            var obj = this._children[i];
            obj._parent = null; //avoid removeFromParent call
            obj.dispose();
          }
          this._boundsChanged = false;
          _GObject6.prototype.dispose.call(this);
        };
        _proto46.addChild = function addChild(child) {
          this.addChildAt(child, this._children.length);
          return child;
        };
        _proto46.addChildAt = function addChildAt(child, index) {
          if (!child) throw new Error("child is null");
          var numChildren = this._children.length;
          if (index >= 0 && index <= numChildren) {
            if (child.parent == this) {
              this.setChildIndex(child, index);
            } else {
              child.removeFromParent();
              child._parent = this;
              var cnt = this._children.length;
              if (child.sortingOrder != 0) {
                this._sortingChildCount++;
                index = this.getInsertPosForSortingChild(child);
              } else if (this._sortingChildCount > 0) {
                if (index > cnt - this._sortingChildCount) index = cnt - this._sortingChildCount;
              }
              if (index == cnt) this._children.push(child);else this._children.splice(index, 0, child);
              this.onChildAdd(child, index);
              this.setBoundsChangedFlag();
            }
            return child;
          } else {
            throw new Error("Invalid child index");
          }
        };
        _proto46.getInsertPosForSortingChild = function getInsertPosForSortingChild(target) {
          var cnt = this._children.length;
          var i = 0;
          for (i = 0; i < cnt; i++) {
            var child = this._children[i];
            if (child == target) continue;
            if (target.sortingOrder < child.sortingOrder) break;
          }
          return i;
        };
        _proto46.removeChild = function removeChild(child, dispose) {
          var childIndex = this._children.indexOf(child);
          if (childIndex != -1) {
            this.removeChildAt(childIndex, dispose);
          }
          return child;
        };
        _proto46.removeChildAt = function removeChildAt(index, dispose) {
          if (index >= 0 && index < this.numChildren) {
            var child = this._children[index];
            child._parent = null;
            if (child.sortingOrder != 0) this._sortingChildCount--;
            this._children.splice(index, 1);
            child.group = null;
            this._container.removeChild(child.node);
            if (this._childrenRenderOrder == ChildrenRenderOrder.Arch) this._partner.callLater(this.buildNativeDisplayList);
            if (dispose) child.dispose();else child.node.parent = null;
            this.setBoundsChangedFlag();
            return child;
          } else {
            throw new Error("Invalid child index");
          }
        };
        _proto46.removeChildren = function removeChildren(beginIndex, endIndex, dispose) {
          if (beginIndex == undefined) beginIndex = 0;
          if (endIndex == undefined) endIndex = -1;
          if (endIndex < 0 || endIndex >= this.numChildren) endIndex = this.numChildren - 1;
          for (var i = beginIndex; i <= endIndex; ++i) this.removeChildAt(beginIndex, dispose);
        };
        _proto46.getChildAt = function getChildAt(index, classType) {
          if (index >= 0 && index < this.numChildren) return this._children[index];else throw new Error("Invalid child index");
        };
        _proto46.getChild = function getChild(name, classType) {
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            if (this._children[i].name == name) return this._children[i];
          }
          return null;
        };
        _proto46.getChildByPath = function getChildByPath(path, classType) {
          var arr = path.split(".");
          var cnt = arr.length;
          var gcom = this;
          var obj;
          for (var i = 0; i < cnt; ++i) {
            obj = gcom.getChild(arr[i]);
            if (!obj) break;
            if (i != cnt - 1) {
              if (!(obj instanceof GComponent)) {
                obj = null;
                break;
              } else gcom = obj;
            }
          }
          return obj;
        };
        _proto46.getVisibleChild = function getVisibleChild(name) {
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child._finalVisible && child.name == name) return child;
          }
          return null;
        };
        _proto46.getChildInGroup = function getChildInGroup(name, group) {
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child.group == group && child.name == name) return child;
          }
          return null;
        };
        _proto46.getChildById = function getChildById(id) {
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            if (this._children[i]._id == id) return this._children[i];
          }
          return null;
        };
        _proto46.getChildIndex = function getChildIndex(child) {
          return this._children.indexOf(child);
        };
        _proto46.setChildIndex = function setChildIndex(child, index) {
          var oldIndex = this._children.indexOf(child);
          if (oldIndex == -1) throw new Error("Not a child of this container");
          if (child.sortingOrder != 0)
            //no effect
            return;
          var cnt = this._children.length;
          if (this._sortingChildCount > 0) {
            if (index > cnt - this._sortingChildCount - 1) index = cnt - this._sortingChildCount - 1;
          }
          this._setChildIndex(child, oldIndex, index);
        };
        _proto46.setChildIndexBefore = function setChildIndexBefore(child, index) {
          var oldIndex = this._children.indexOf(child);
          if (oldIndex == -1) throw new Error("Not a child of this container");
          if (child.sortingOrder != 0)
            //no effect
            return oldIndex;
          var cnt = this._children.length;
          if (this._sortingChildCount > 0) {
            if (index > cnt - this._sortingChildCount - 1) index = cnt - this._sortingChildCount - 1;
          }
          if (oldIndex < index) return this._setChildIndex(child, oldIndex, index - 1);else return this._setChildIndex(child, oldIndex, index);
        };
        _proto46._setChildIndex = function _setChildIndex(child, oldIndex, index) {
          var cnt = this._children.length;
          if (index > cnt) index = cnt;
          if (oldIndex == index) return oldIndex;
          this._children.splice(oldIndex, 1);
          this._children.splice(index, 0, child);
          if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) child.node.setSiblingIndex(index);else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) child.node.setSiblingIndex(cnt - index);else this._partner.callLater(this.buildNativeDisplayList);
          this.setBoundsChangedFlag();
          return index;
        };
        _proto46.swapChildren = function swapChildren(child1, child2) {
          var index1 = this._children.indexOf(child1);
          var index2 = this._children.indexOf(child2);
          if (index1 == -1 || index2 == -1) throw new Error("Not a child of this container");
          this.swapChildrenAt(index1, index2);
        };
        _proto46.swapChildrenAt = function swapChildrenAt(index1, index2) {
          var child1 = this._children[index1];
          var child2 = this._children[index2];
          this.setChildIndex(child1, index2);
          this.setChildIndex(child2, index1);
        };
        _proto46.isAncestorOf = function isAncestorOf(child) {
          if (child == null) return false;
          var p = child.parent;
          while (p) {
            if (p == this) return true;
            p = p.parent;
          }
          return false;
        };
        _proto46.addController = function addController(controller) {
          this._controllers.push(controller);
          controller.parent = this;
          this.applyController(controller);
        };
        _proto46.getControllerAt = function getControllerAt(index) {
          return this._controllers[index];
        };
        _proto46.getController = function getController(name) {
          var cnt = this._controllers.length;
          for (var i = 0; i < cnt; ++i) {
            var c = this._controllers[i];
            if (c.name == name) return c;
          }
          return null;
        };
        _proto46.removeController = function removeController(c) {
          var index = this._controllers.indexOf(c);
          if (index == -1) throw new Error("controller not exists");
          c.parent = null;
          this._controllers.splice(index, 1);
          var length = this._children.length;
          for (var i = 0; i < length; i++) {
            var child = this._children[i];
            child.handleControllerChanged(c);
          }
        };
        _proto46.onChildAdd = function onChildAdd(child, index) {
          child.node.parent = this._container;
          child.node.active = child._finalVisible;
          if (this._buildingDisplayList) return;
          var cnt = this._children.length;
          if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) child.node.setSiblingIndex(index);else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) child.node.setSiblingIndex(cnt - index);else this._partner.callLater(this.buildNativeDisplayList);
        };
        _proto46.buildNativeDisplayList = function buildNativeDisplayList(dt) {
          if (!isNaN(dt)) {
            var _t = GObject.cast(this.node);
            _t.buildNativeDisplayList();
            return;
          }
          var cnt = this._children.length;
          if (cnt == 0) return;
          var child;
          switch (this._childrenRenderOrder) {
            case ChildrenRenderOrder.Ascent:
              {
                var j = 0;
                for (var i = 0; i < cnt; i++) {
                  child = this._children[i];
                  child.node.setSiblingIndex(j++);
                }
              }
              break;
            case ChildrenRenderOrder.Descent:
              {
                var _j = 0;
                for (var _i3 = cnt - 1; _i3 >= 0; _i3--) {
                  child = this._children[_i3];
                  child.node.setSiblingIndex(_j++);
                }
              }
              break;
            case ChildrenRenderOrder.Arch:
              {
                var _j2 = 0;
                for (var _i4 = 0; _i4 < this._apexIndex; _i4++) {
                  child = this._children[_i4];
                  child.node.setSiblingIndex(_j2++);
                }
                for (var _i5 = cnt - 1; _i5 >= this._apexIndex; _i5--) {
                  child = this._children[_i5];
                  child.node.setSiblingIndex(_j2++);
                }
              }
              break;
          }
        };
        _proto46.applyController = function applyController(c) {
          this._applyingController = c;
          var child;
          var length = this._children.length;
          for (var i = 0; i < length; i++) {
            child = this._children[i];
            child.handleControllerChanged(c);
          }
          this._applyingController = null;
          c.runActions();
        };
        _proto46.applyAllControllers = function applyAllControllers() {
          var cnt = this._controllers.length;
          for (var i = 0; i < cnt; ++i) {
            this.applyController(this._controllers[i]);
          }
        };
        _proto46.adjustRadioGroupDepth = function adjustRadioGroupDepth(obj, c) {
          var cnt = this._children.length;
          var i;
          var child;
          var myIndex = -1,
            maxIndex = -1;
          for (i = 0; i < cnt; i++) {
            child = this._children[i];
            if (child == obj) {
              myIndex = i;
            } else if ("relatedController" in child /*is button*/ && child.relatedController == c) {
              if (i > maxIndex) maxIndex = i;
            }
          }
          if (myIndex < maxIndex) {
            if (this._applyingController) this._children[maxIndex].handleControllerChanged(this._applyingController);
            this.swapChildrenAt(myIndex, maxIndex);
          }
        };
        _proto46.getTransitionAt = function getTransitionAt(index) {
          return this._transitions[index];
        };
        _proto46.getTransition = function getTransition(transName) {
          var cnt = this._transitions.length;
          for (var i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            if (trans.name == transName) return trans;
          }
          return null;
        };
        _proto46.isChildInView = function isChildInView(child) {
          if (this._rectMask) {
            return child.x + child.width >= 0 && child.x <= this.width && child.y + child.height >= 0 && child.y <= this.height;
          } else if (this._scrollPane) {
            return this._scrollPane.isChildInView(child);
          } else return true;
        };
        _proto46.getFirstChildInView = function getFirstChildInView() {
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (this.isChildInView(child)) return i;
          }
          return -1;
        };
        _proto46.setMask = function setMask(value, inverted) {
          if (this._maskContent) {
            this._maskContent.node.off(Node.EventType.TRANSFORM_CHANGED, this.onMaskContentChanged, this);
            this._maskContent.node.off(Node.EventType.SIZE_CHANGED, this.onMaskContentChanged, this);
            this._maskContent.node.off(Node.EventType.ANCHOR_CHANGED, this.onMaskContentChanged, this);
            this._maskContent.visible = true;
          }
          this._maskContent = value;
          if (this._maskContent) {
            if (!(value instanceof GImage) && !(value instanceof GGraph)) return;
            if (!this._customMask) {
              var maskNode = new Node("Mask");
              maskNode.layer = UIConfig.defaultUILayer;
              maskNode.addComponent(UITransform);
              maskNode.parent = this._node;
              if (this._scrollPane) this._container.parent.parent = maskNode;else this._container.parent = maskNode;
              this._customMask = maskNode.addComponent(Mask);
            }
            value.visible = false;
            value.node.on(Node.EventType.TRANSFORM_CHANGED, this.onMaskContentChanged, this);
            value.node.on(Node.EventType.SIZE_CHANGED, this.onMaskContentChanged, this);
            value.node.on(Node.EventType.ANCHOR_CHANGED, this.onMaskContentChanged, this);
            this._invertedMask = inverted;
            if (this._node.activeInHierarchy) this.onMaskReady();else this.on(Event.DISPLAY, this.onMaskReady, this);
            this.onMaskContentChanged();
            if (this._scrollPane) this._scrollPane.adjustMaskContainer();else this._container.setPosition(0, 0);
          } else if (this._customMask) {
            if (this._scrollPane) this._container.parent.parent = this._node;else this._container.parent = this._node;
            this._customMask.node.destroy();
            this._customMask = null;
            if (this._scrollPane) this._scrollPane.adjustMaskContainer();else this._container.setPosition(this._pivotCorrectX, this._pivotCorrectY);
          }
        };
        _proto46.onMaskReady = function onMaskReady() {
          this.off(Event.DISPLAY, this.onMaskReady, this);
          if (this._maskContent instanceof GImage) {
            this._customMask.type = Mask.Type.SPRITE_STENCIL;
            this._customMask.alphaThreshold = 0.0001;
            this._customMask.spriteFrame = this._maskContent._content.spriteFrame;
          } else if (this._maskContent instanceof GGraph) {
            if (this._maskContent.type == 2) this._customMask.type = Mask.Type.GRAPHICS_ELLIPSE;else this._customMask.type = Mask.Type.GRAPHICS_RECT;
          }
          this._customMask.inverted = this._invertedMask;
        };
        _proto46.onMaskContentChanged = function onMaskContentChanged() {
          var maskNode = this._customMask.node;
          var maskUITrans = maskNode.getComponent(UITransform);
          var contentNode = this._maskContent.node;
          var contentUITrans = this._maskContent._uiTrans;
          var w = this._maskContent.width * this._maskContent.scaleX;
          var h = this._maskContent.height * this._maskContent.scaleY;
          maskUITrans.setContentSize(w, h);
          var left = contentNode.position.x - contentUITrans.anchorX * w;
          var top = contentNode.position.y - contentUITrans.anchorY * h;
          maskUITrans.setAnchorPoint(-left / maskUITrans.width, -top / maskUITrans.height);
          maskNode.setPosition(this._pivotCorrectX, this._pivotCorrectY);
        };
        _proto46.setupScroll = function setupScroll(buffer) {
          this._scrollPane = this._node.addComponent(ScrollPane);
          this._scrollPane.setup(buffer);
        };
        _proto46.setupOverflow = function setupOverflow(overflow) {
          if (overflow == OverflowType.Hidden) this._rectMask = this._container.addComponent(Mask);
          if (!this._margin.isNone) this.handleSizeChanged();
        };
        _proto46.handleAnchorChanged = function handleAnchorChanged() {
          _GObject6.prototype.handleAnchorChanged.call(this);
          if (this._customMask) this._customMask.node.setPosition(this._pivotCorrectX, this._pivotCorrectY);else if (this._scrollPane) this._scrollPane.adjustMaskContainer();else this._container.setPosition(this._pivotCorrectX + this._alignOffset.x, this._pivotCorrectY - this._alignOffset.y);
        };
        _proto46.handleSizeChanged = function handleSizeChanged() {
          _GObject6.prototype.handleSizeChanged.call(this);
          if (this._customMask) this._customMask.node.setPosition(this._pivotCorrectX, this._pivotCorrectY);else if (!this._scrollPane) this._container.setPosition(this._pivotCorrectX, this._pivotCorrectY);
          if (this._scrollPane) this._scrollPane.onOwnerSizeChanged();else this._containerUITrans.setContentSize(this.viewWidth, this.viewHeight);
        };
        _proto46.handleGrayedChanged = function handleGrayedChanged() {
          var c = this.getController("grayed");
          if (c) {
            c.selectedIndex = this.grayed ? 1 : 0;
            return;
          }
          var v = this.grayed;
          var cnt = this._children.length;
          for (var i = 0; i < cnt; ++i) {
            this._children[i].grayed = v;
          }
        };
        _proto46.handleControllerChanged = function handleControllerChanged(c) {
          _GObject6.prototype.handleControllerChanged.call(this, c);
          if (this._scrollPane) this._scrollPane.handleControllerChanged(c);
        };
        _proto46._hitTest = function _hitTest(pt, globalPt) {
          if (this._customMask) {
            s_vec2$2.set(globalPt);
            s_vec2$2.y = UIContentScaler.rootSize.height - globalPt.y;
            var b = this._customMask.isHit(s_vec2$2) || false;
            if (!b) return null;
          }
          if (this.hitArea) {
            if (!this.hitArea.hitTest(pt, globalPt)) return null;
          } else if (this._rectMask) {
            s_vec2$2.set(pt);
            s_vec2$2.x += this._container.position.x;
            s_vec2$2.y += this._container.position.y;
            var clippingSize = this._containerUITrans.contentSize;
            if (s_vec2$2.x < 0 || s_vec2$2.y < 0 || s_vec2$2.x >= clippingSize.width || s_vec2$2.y >= clippingSize.height) return null;
          }
          if (this._scrollPane) {
            var _target = this._scrollPane.hitTest(pt, globalPt);
            if (!_target) return null;
            if (_target != this) return _target;
          }
          var target = null;
          var cnt = this._children.length;
          for (var i = cnt - 1; i >= 0; i--) {
            var child = this._children[i];
            if (this._maskContent == child || child._touchDisabled) continue;
            target = child.hitTest(globalPt);
            if (target) break;
          }
          if (!target && this._opaque && (this.hitArea || pt.x >= 0 && pt.y >= 0 && pt.x < this._width && pt.y < this._height)) target = this;
          return target;
        };
        _proto46.setBoundsChangedFlag = function setBoundsChangedFlag() {
          if (!this._scrollPane && !this._trackBounds) return;
          if (!this._boundsChanged) {
            this._boundsChanged = true;
            this._partner.callLater(this.refresh);
          }
        };
        _proto46.refresh = function refresh(dt) {
          if (!isNaN(dt)) {
            var _t = GObject.cast(this.node);
            _t.refresh();
            return;
          }
          if (this._boundsChanged) {
            var len = this._children.length;
            if (len > 0) {
              for (var i = 0; i < len; i++) {
                var child = this._children[i];
                child.ensureSizeCorrect();
              }
            }
            this.updateBounds();
          }
        };
        _proto46.ensureBoundsCorrect = function ensureBoundsCorrect() {
          var len = this._children.length;
          if (len > 0) {
            for (var i = 0; i < len; i++) {
              var child = this._children[i];
              child.ensureSizeCorrect();
            }
          }
          if (this._boundsChanged) this.updateBounds();
        };
        _proto46.updateBounds = function updateBounds() {
          var ax = 0,
            ay = 0,
            aw = 0,
            ah = 0;
          var len = this._children.length;
          if (len > 0) {
            ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
            var ar = Number.NEGATIVE_INFINITY,
              ab = Number.NEGATIVE_INFINITY;
            var tmp = 0;
            var i = 0;
            for (var i = 0; i < len; i++) {
              var child = this._children[i];
              tmp = child.x;
              if (tmp < ax) ax = tmp;
              tmp = child.y;
              if (tmp < ay) ay = tmp;
              tmp = child.x + child.actualWidth;
              if (tmp > ar) ar = tmp;
              tmp = child.y + child.actualHeight;
              if (tmp > ab) ab = tmp;
            }
            aw = ar - ax;
            ah = ab - ay;
          }
          this.setBounds(ax, ay, aw, ah);
        };
        _proto46.setBounds = function setBounds(ax, ay, aw, ah) {
          if (ah === void 0) {
            ah = 0;
          }
          this._boundsChanged = false;
          if (this._scrollPane) this._scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
        };
        _proto46.getSnappingPosition = function getSnappingPosition(xValue, yValue, resultPoint) {
          if (!resultPoint) resultPoint = new Vec2();
          var cnt = this._children.length;
          if (cnt == 0) {
            resultPoint.x = 0;
            resultPoint.y = 0;
            return resultPoint;
          }
          this.ensureBoundsCorrect();
          var obj = null;
          var prev = null;
          var i = 0;
          if (yValue != 0) {
            for (; i < cnt; i++) {
              obj = this._children[i];
              if (yValue < obj.y) {
                if (i == 0) {
                  yValue = 0;
                  break;
                } else {
                  prev = this._children[i - 1];
                  if (yValue < prev.y + prev.actualHeight / 2)
                    //top half part
                    yValue = prev.y;else
                    //bottom half part
                    yValue = obj.y;
                  break;
                }
              }
            }
            if (i == cnt) yValue = obj.y;
          }
          if (xValue != 0) {
            if (i > 0) i--;
            for (; i < cnt; i++) {
              obj = this._children[i];
              if (xValue < obj.x) {
                if (i == 0) {
                  xValue = 0;
                  break;
                } else {
                  prev = this._children[i - 1];
                  if (xValue < prev.x + prev.actualWidth / 2)
                    //top half part
                    xValue = prev.x;else
                    //bottom half part
                    xValue = obj.x;
                  break;
                }
              }
            }
            if (i == cnt) xValue = obj.x;
          }
          resultPoint.x = xValue;
          resultPoint.y = yValue;
          return resultPoint;
        };
        _proto46.childSortingOrderChanged = function childSortingOrderChanged(child, oldValue, newValue) {
          if (newValue === void 0) {
            newValue = 0;
          }
          if (newValue == 0) {
            this._sortingChildCount--;
            this.setChildIndex(child, this._children.length);
          } else {
            if (oldValue == 0) this._sortingChildCount++;
            var oldIndex = this._children.indexOf(child);
            var index = this.getInsertPosForSortingChild(child);
            if (oldIndex < index) this._setChildIndex(child, oldIndex, index - 1);else this._setChildIndex(child, oldIndex, index);
          }
        };
        _proto46.constructFromResource = function constructFromResource() {
          this.constructFromResource2(null, 0);
        };
        _proto46.constructFromResource2 = function constructFromResource2(objectPool, poolIndex) {
          var contentItem = this.packageItem.getBranch();
          if (!contentItem.decoded) {
            contentItem.decoded = true;
            TranslationHelper.translateComponent(contentItem);
          }
          var i;
          var dataLen;
          var curPos;
          var nextPos;
          var f1;
          var f2;
          var i1;
          var i2;
          var buffer = contentItem.rawData;
          buffer.seek(0, 0);
          this._underConstruct = true;
          this.sourceWidth = buffer.readInt();
          this.sourceHeight = buffer.readInt();
          this.initWidth = this.sourceWidth;
          this.initHeight = this.sourceHeight;
          this.setSize(this.sourceWidth, this.sourceHeight);
          if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
          }
          if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
          }
          if (buffer.readBool()) {
            this._margin.top = buffer.readInt();
            this._margin.bottom = buffer.readInt();
            this._margin.left = buffer.readInt();
            this._margin.right = buffer.readInt();
          }
          var overflow = buffer.readByte();
          if (overflow == OverflowType.Scroll) {
            var savedPos = buffer.position;
            buffer.seek(0, 7);
            this.setupScroll(buffer);
            buffer.position = savedPos;
          } else this.setupOverflow(overflow);
          if (buffer.readBool()) buffer.skip(8);
          this._buildingDisplayList = true;
          buffer.seek(0, 1);
          var controllerCount = buffer.readShort();
          for (i = 0; i < controllerCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            var controller = new Controller();
            this._controllers.push(controller);
            controller.parent = this;
            controller.setup(buffer);
            buffer.position = nextPos;
          }
          buffer.seek(0, 2);
          var child;
          var childCount = buffer.readShort();
          for (i = 0; i < childCount; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.position;
            if (objectPool) child = objectPool[poolIndex + i];else {
              buffer.seek(curPos, 0);
              var type = buffer.readByte();
              var src = buffer.readS();
              var pkgId = buffer.readS();
              var pi = null;
              if (src != null) {
                var pkg;
                if (pkgId != null) pkg = UIPackage.getById(pkgId);else pkg = contentItem.owner;
                pi = pkg ? pkg.getItemById(src) : null;
              }
              if (pi) {
                child = Decls.UIObjectFactory.newObject(pi);
                child.constructFromResource();
              } else child = Decls.UIObjectFactory.newObject(type);
            }
            child._underConstruct = true;
            child.setup_beforeAdd(buffer, curPos);
            child._parent = this;
            child.node.parent = this._container;
            this._children.push(child);
            buffer.position = curPos + dataLen;
          }
          buffer.seek(0, 3);
          this.relations.setup(buffer, true);
          buffer.seek(0, 2);
          buffer.skip(2);
          for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            buffer.seek(buffer.position, 3);
            this._children[i].relations.setup(buffer, false);
            buffer.position = nextPos;
          }
          buffer.seek(0, 2);
          buffer.skip(2);
          for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            child = this._children[i];
            child.setup_afterAdd(buffer, buffer.position);
            child._underConstruct = false;
            buffer.position = nextPos;
          }
          buffer.seek(0, 4);
          buffer.skip(2); //customData
          this.opaque = buffer.readBool();
          var maskId = buffer.readShort();
          if (maskId != -1) {
            this.setMask(this.getChildAt(maskId), buffer.readBool());
          }
          var hitTestId = buffer.readS();
          i1 = buffer.readInt();
          i2 = buffer.readInt();
          if (hitTestId != null) {
            pi = contentItem.owner.getItemById(hitTestId);
            if (pi && pi.hitTestData) this.hitArea = new PixelHitTest(pi.hitTestData, i1, i2);
          } else if (i1 != 0 && i2 != -1) {
            this.hitArea = new ChildHitArea(this.getChildAt(i2));
          }
          buffer.seek(0, 5);
          var transitionCount = buffer.readShort();
          for (i = 0; i < transitionCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            var trans = new Transition(this);
            trans.setup(buffer);
            this._transitions.push(trans);
            buffer.position = nextPos;
          }
          this.applyAllControllers();
          this._buildingDisplayList = false;
          this._underConstruct = false;
          this.buildNativeDisplayList();
          this.setBoundsChangedFlag();
          if (contentItem.objectType != ObjectType.Component) this.constructExtension(buffer);
          this.onConstruct();
        };
        _proto46.constructExtension = function constructExtension(buffer) {};
        _proto46.onConstruct = function onConstruct() {};
        _proto46.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GObject6.prototype.setup_afterAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 4);
          var pageController = buffer.readShort();
          if (pageController != -1 && this._scrollPane) this._scrollPane.pageController = this._parent.getControllerAt(pageController);
          var cnt = buffer.readShort();
          for (var i = 0; i < cnt; i++) {
            var cc = this.getController(buffer.readS());
            var pageId = buffer.readS();
            if (cc) cc.selectedPageId = pageId;
          }
          if (buffer.version >= 2) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
              var target = buffer.readS();
              var propertyId = buffer.readShort();
              var value = buffer.readS();
              var obj = this.getChildByPath(target);
              if (obj) obj.setProp(propertyId, value);
            }
          }
        };
        _proto46.onEnable = function onEnable() {
          var cnt = this._transitions.length;
          for (var i = 0; i < cnt; ++i) this._transitions[i].onEnable();
        };
        _proto46.onDisable = function onDisable() {
          var cnt = this._transitions.length;
          for (var i = 0; i < cnt; ++i) this._transitions[i].onDisable();
        };
        _createClass(GComponent, [{
          key: "displayListContainer",
          get: function get() {
            return this._container;
          }
        }, {
          key: "numChildren",
          get: function get() {
            return this._children.length;
          }
        }, {
          key: "controllers",
          get: function get() {
            return this._controllers;
          }
        }, {
          key: "scrollPane",
          get: function get() {
            return this._scrollPane;
          }
        }, {
          key: "opaque",
          get: function get() {
            return this._opaque;
          },
          set: function set(value) {
            this._opaque = value;
          }
        }, {
          key: "margin",
          get: function get() {
            return this._margin;
          },
          set: function set(value) {
            this._margin.copy(value);
            this.handleSizeChanged();
          }
        }, {
          key: "childrenRenderOrder",
          get: function get() {
            return this._childrenRenderOrder;
          },
          set: function set(value) {
            if (this._childrenRenderOrder != value) {
              this._childrenRenderOrder = value;
              this.buildNativeDisplayList();
            }
          }
        }, {
          key: "apexIndex",
          get: function get() {
            return this._apexIndex;
          },
          set: function set(value) {
            if (this._apexIndex != value) {
              this._apexIndex = value;
              if (this._childrenRenderOrder == ChildrenRenderOrder.Arch) this.buildNativeDisplayList();
            }
          }
        }, {
          key: "mask",
          get: function get() {
            return this._maskContent;
          },
          set: function set(value) {
            this.setMask(value, false);
          }
        }, {
          key: "_pivotCorrectX",
          get: function get() {
            return -this.pivotX * this._width + this._margin.left;
          }
        }, {
          key: "_pivotCorrectY",
          get: function get() {
            return this.pivotY * this._height - this._margin.top;
          }
        }, {
          key: "baseUserData",
          get: function get() {
            var buffer = this.packageItem.rawData;
            buffer.seek(0, 4);
            return buffer.readS();
          }
        }, {
          key: "viewWidth",
          get: function get() {
            if (this._scrollPane) return this._scrollPane.viewWidth;else return this.width - this._margin.left - this._margin.right;
          },
          set: function set(value) {
            if (this._scrollPane) this._scrollPane.viewWidth = value;else this.width = value + this._margin.left + this._margin.right;
          }
        }, {
          key: "viewHeight",
          get: function get() {
            if (this._scrollPane) return this._scrollPane.viewHeight;else return this.height - this._margin.top - this._margin.bottom;
          },
          set: function set(value) {
            if (this._scrollPane) this._scrollPane.viewHeight = value;else this.height = value + this._margin.top + this._margin.bottom;
          }
        }]);
        return GComponent;
      }(GObject));
      var s_vec2$2 = new Vec2();
      var Window = exports('Window', /*#__PURE__*/function (_GComponent) {
        _inheritsLoose(Window, _GComponent);
        function Window() {
          var _this19;
          _this19 = _GComponent.call(this) || this;
          _this19._requestingCmd = 0; /** 释放管理器 */
          _this19.release_manage = new mk_release();
          _this19._uiSources = new Array();
          _this19.bringToFontOnClick = UIConfig.bringWindowToFrontOnClick;
          _this19._node.on(Event.TOUCH_BEGIN, _this19.onTouchBegin_1, _assertThisInitialized(_this19), true);
          return _this19;
        }
        var _proto47 = Window.prototype;
        _proto47.addUISource = function addUISource(source) {
          this._uiSources.push(source);
        };
        _proto47.show = function show() {
          GRoot.inst.showWindow(this);
        };
        _proto47.showOn = function showOn(root) {
          root.showWindow(this);
        };
        _proto47.hide = function hide() {
          if (this.isShowing) this.doHideAnimation();
        };
        _proto47.hideImmediately = function hideImmediately() {
          var r = this.parent instanceof GRoot ? this.parent : null;
          if (!r) r = GRoot.inst;
          r.hideWindowImmediately(this);
        };
        _proto47.centerOn = function centerOn(r, restraint) {
          this.setPosition(Math.round((r.width - this.width) / 2), Math.round((r.height - this.height) / 2));
          if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
          }
        };
        _proto47.toggleStatus = function toggleStatus() {
          if (this.isTop) this.hide();else this.show();
        };
        _proto47.bringToFront = function bringToFront() {
          GRoot.inst.bringToFront(this);
        };
        _proto47.showModalWait = function showModalWait(requestingCmd) {
          if (requestingCmd != null) this._requestingCmd = requestingCmd;
          if (UIConfig.windowModalWaiting) {
            if (!this._modalWaitPane) this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.windowModalWaiting);
            this.layoutModalWaitPane();
            this.addChild(this._modalWaitPane);
          }
        };
        _proto47.layoutModalWaitPane = function layoutModalWaitPane() {
          if (this._contentArea) {
            var pt = this._frame.localToGlobal();
            pt = this.globalToLocal(pt.x, pt.y, pt);
            this._modalWaitPane.setPosition(pt.x + this._contentArea.x, pt.y + this._contentArea.y);
            this._modalWaitPane.setSize(this._contentArea.width, this._contentArea.height);
          } else this._modalWaitPane.setSize(this.width, this.height);
        };
        _proto47.closeModalWait = function closeModalWait(requestingCmd) {
          if (requestingCmd != null) {
            if (this._requestingCmd != requestingCmd) return false;
          }
          this._requestingCmd = 0;
          if (this._modalWaitPane && this._modalWaitPane.parent) this.removeChild(this._modalWaitPane);
          return true;
        };
        _proto47.init = function init() {
          if (this._inited || this._loading) return;
          if (this._uiSources.length > 0) {
            this._loading = false;
            var cnt = this._uiSources.length;
            for (var i = 0; i < cnt; i++) {
              var lib = this._uiSources[i];
              if (!lib.loaded) {
                lib.load(this.__uiLoadComplete, this);
                this._loading = true;
              }
            }
            if (!this._loading) this._init();
          } else this._init();
        };
        _proto47.onInit = function onInit() {};
        _proto47.onShown = function onShown() {};
        _proto47.onHide = function onHide() {};
        _proto47.doShowAnimation = function doShowAnimation() {
          this.onShown();
        };
        _proto47.doHideAnimation = function doHideAnimation() {
          this.hideImmediately();
        };
        _proto47.__uiLoadComplete = function __uiLoadComplete() {
          var cnt = this._uiSources.length;
          for (var i = 0; i < cnt; i++) {
            var lib = this._uiSources[i];
            if (!lib.loaded) return;
          }
          this._loading = false;
          this._init();
        };
        _proto47._init = function _init() {
          this._inited = true;
          this.onInit();
          if (this.isShowing) this.doShowAnimation();
        };
        _proto47.dispose = function dispose() {
          if (this.parent) this.hideImmediately(); // 释放资源
          this.release_manage.release();
          _GComponent.prototype.dispose.call(this);
        } /**
          * 跟随释放
          * @param asset_ 释放资源
          */;
        _proto47.follow_release = function follow_release(object_) {
          if (!object_) {
            return object_;
          } // 添加释放对象
          this.release_manage.add(object_); // 如果模块已经关闭则直接释放
          if (this.isDisposed) {
            // this._log.debug("在模块关闭后跟随释放资源会被立即释放");
            this.release_manage.release_all();
          }
          return object_;
        };
        _proto47.cancel_release = function cancel_release(object_) {
          if (!object_) {
            return object_;
          } // 添加释放对象
          this.release_manage.release(object_);
          return object_;
        };
        _proto47.closeEventHandler = function closeEventHandler(evt) {
          this.hide();
        };
        _proto47.onEnable = function onEnable() {
          _GComponent.prototype.onEnable.call(this);
          if (!this._inited) this.init();else this.doShowAnimation();
        };
        _proto47.onDisable = function onDisable() {
          _GComponent.prototype.onDisable.call(this);
          this.closeModalWait();
          this.onHide();
        };
        _proto47.onTouchBegin_1 = function onTouchBegin_1(evt) {
          if (this.isShowing && this.bringToFontOnClick) this.bringToFront();
        };
        _proto47.onDragStart_1 = function onDragStart_1(evt) {
          var original = GObject.cast(evt.currentTarget);
          original.stopDrag();
          this.startDrag(evt.touchId);
        };
        _createClass(Window, [{
          key: "contentPane",
          get: function get() {
            return this._contentPane;
          },
          set: function set(val) {
            if (this._contentPane != val) {
              if (this._contentPane) this.removeChild(this._contentPane);
              this._contentPane = val;
              if (this._contentPane) {
                this.addChild(this._contentPane);
                this.setSize(this._contentPane.width, this._contentPane.height);
                this._contentPane.addRelation(this, RelationType.Size);
                this._frame = this._contentPane.getChild("frame");
                if (this._frame) {
                  this.closeButton = this._frame.getChild("closeButton");
                  this.dragArea = this._frame.getChild("dragArea");
                  this.contentArea = this._frame.getChild("contentArea");
                }
              }
            }
          }
        }, {
          key: "frame",
          get: function get() {
            return this._frame;
          }
        }, {
          key: "closeButton",
          get: function get() {
            return this._closeButton;
          },
          set: function set(value) {
            if (this._closeButton) this._closeButton.offClick(this.closeEventHandler, this);
            this._closeButton = value;
            if (this._closeButton) this._closeButton.onClick(this.closeEventHandler, this);
          }
        }, {
          key: "dragArea",
          get: function get() {
            return this._dragArea;
          },
          set: function set(value) {
            if (this._dragArea != value) {
              if (this._dragArea) {
                this._dragArea.draggable = false;
                this._dragArea.off(Event.DRAG_START, this.onDragStart_1, this);
              }
              this._dragArea = value;
              if (this._dragArea) {
                this._dragArea.draggable = true;
                this._dragArea.on(Event.DRAG_START, this.onDragStart_1, this);
              }
            }
          }
        }, {
          key: "contentArea",
          get: function get() {
            return this._contentArea;
          },
          set: function set(value) {
            this._contentArea = value;
          }
        }, {
          key: "isShowing",
          get: function get() {
            return this.parent != null;
          }
        }, {
          key: "isTop",
          get: function get() {
            return this.parent && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
          }
        }, {
          key: "modal",
          get: function get() {
            return this._modal;
          },
          set: function set(val) {
            this._modal = val;
          }
        }, {
          key: "modalWaiting",
          get: function get() {
            return this._modalWaitPane && this._modalWaitPane.parent != null;
          }
        }]);
        return Window;
      }(GComponent));
      var GRoot = exports('GRoot', /*#__PURE__*/function (_GComponent2) {
        _inheritsLoose(GRoot, _GComponent2);
        GRoot.create = function create() {
          GRoot._inst = new GRoot();
          director.getScene().getChildByName('Canvas').addChild(GRoot._inst.node);
          GRoot._inst.onWinResize();
          return GRoot._inst;
        };
        function GRoot() {
          var _this20;
          _this20 = _GComponent2.call(this) || this;
          _this20._node.name = "GRoot";
          _this20.opaque = false;
          _this20._volumeScale = 1;
          _this20._popupStack = new Array();
          _this20._justClosedPopups = new Array();
          _this20._modalLayer = new GGraph();
          _this20._modalLayer.setSize(_this20.width, _this20.height);
          _this20._modalLayer.drawRect(0, Color.TRANSPARENT, UIConfig.modalLayerColor);
          _this20._modalLayer.addRelation(_assertThisInitialized(_this20), RelationType.Size);
          _this20._thisOnResized = _this20.onWinResize.bind(_assertThisInitialized(_this20));
          _this20._inputProcessor = _this20.node.addComponent(InputProcessor);
          _this20._inputProcessor._captureCallback = _this20.onTouchBegin_1;
          View.instance.on('design-resolution-changed', _this20.onWinResize, _assertThisInitialized(_this20));
          {
            View.instance.on('canvas-resize', _this20._thisOnResized);
            window.addEventListener('orientationchange', _this20._thisOnResized);
          }
          return _this20;
        }
        var _proto48 = GRoot.prototype;
        _proto48.onDestroy = function onDestroy() {
          View.instance.off('design-resolution-changed', this.onWinResize, this);
          {
            View.instance.off('canvas-resize', this._thisOnResized);
            window.removeEventListener('orientationchange', this._thisOnResized);
          }
          if (this == GRoot._inst) GRoot._inst = null;
        };
        _proto48.getTouchPosition = function getTouchPosition(touchId) {
          return this._inputProcessor.getTouchPosition(touchId);
        };
        _proto48.showWindow = function showWindow(win) {
          this.addChild(win);
          win.requestFocus();
          if (win.x > this.width) win.x = this.width - win.width;else if (win.x + win.width < 0) win.x = 0;
          if (win.y > this.height) win.y = this.height - win.height;else if (win.y + win.height < 0) win.y = 0;
          this.adjustModalLayer();
        };
        _proto48.hideWindow = function hideWindow(win) {
          win.hide();
        };
        _proto48.hideWindowImmediately = function hideWindowImmediately(win) {
          if (win.parent == this) this.removeChild(win);
          this.adjustModalLayer();
        };
        _proto48.bringToFront = function bringToFront(win) {
          var cnt = this.numChildren;
          var i;
          if (this._modalLayer.parent && !win.modal) i = this.getChildIndex(this._modalLayer) - 1;else i = cnt - 1;
          for (; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g == win) return;
            if (g instanceof Window) break;
          }
          if (i >= 0) this.setChildIndex(win, i);
        };
        _proto48.showModalWait = function showModalWait(msg) {
          if (UIConfig.globalModalWaiting != null) {
            if (this._modalWaitPane == null) this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
            this._modalWaitPane.setSize(this.width, this.height);
            this._modalWaitPane.addRelation(this, RelationType.Size);
            this.addChild(this._modalWaitPane);
            this._modalWaitPane.text = msg;
          }
        };
        _proto48.closeModalWait = function closeModalWait() {
          if (this._modalWaitPane && this._modalWaitPane.parent) this.removeChild(this._modalWaitPane);
        };
        _proto48.closeAllExceptModals = function closeAllExceptModals() {
          var arr = this._children.slice();
          var cnt = arr.length;
          for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if (g instanceof Window && !g.modal) g.hide();
          }
        };
        _proto48.closeAllWindows = function closeAllWindows() {
          var arr = this._children.slice();
          var cnt = arr.length;
          for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if (g instanceof Window) g.hide();
          }
        };
        _proto48.getTopWindow = function getTopWindow() {
          var cnt = this.numChildren;
          for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g instanceof Window) {
              return g;
            }
          }
          return null;
        };
        _proto48.getPopupPosition = function getPopupPosition(popup, target, dir, result) {
          var pos = result || new Vec2();
          var sizeW = 0,
            sizeH = 0;
          if (target) {
            pos = target.localToGlobal();
            this.globalToLocal(pos.x, pos.y, pos);
            var pos2 = target.localToGlobal(target.width, target.height);
            this.globalToLocal(pos2.x, pos2.y, pos2);
            sizeW = pos2.x - pos.x;
            sizeH = pos2.y - pos.y;
          } else {
            pos = this.getTouchPosition();
            pos = this.globalToLocal(pos.x, pos.y);
          }
          if (pos.x + popup.width > this.width) pos.x = pos.x + sizeW - popup.width;
          pos.y += sizeH;
          if ((dir === undefined || dir === PopupDirection.Auto) && pos.y + popup.height > this.height || dir === false || dir === PopupDirection.Up) {
            pos.y = pos.y - sizeH - popup.height - 1;
            if (pos.y < 0) {
              pos.y = 0;
              pos.x += sizeW / 2;
            }
          }
          return pos;
        };
        _proto48.showPopup = function showPopup(popup, target, dir) {
          if (this._popupStack.length > 0) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
              for (var i = this._popupStack.length - 1; i >= k; i--) this.removeChild(this._popupStack.pop());
            }
          }
          this._popupStack.push(popup);
          if (target) {
            var p = target;
            while (p) {
              if (p.parent == this) {
                if (popup.sortingOrder < p.sortingOrder) {
                  popup.sortingOrder = p.sortingOrder;
                }
                break;
              }
              p = p.parent;
            }
          }
          this.addChild(popup);
          this.adjustModalLayer();
          var pt = this.getPopupPosition(popup, target, dir);
          popup.setPosition(pt.x, pt.y);
        };
        _proto48.togglePopup = function togglePopup(popup, target, dir) {
          if (this._justClosedPopups.indexOf(popup) != -1) return;
          this.showPopup(popup, target, dir);
        };
        _proto48.hidePopup = function hidePopup(popup) {
          if (popup) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
              for (var i = this._popupStack.length - 1; i >= k; i--) this.closePopup(this._popupStack.pop());
            }
          } else {
            var cnt = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--) this.closePopup(this._popupStack[i]);
            this._popupStack.length = 0;
          }
        };
        _proto48.closePopup = function closePopup(target) {
          if (target.parent) {
            if (target instanceof Window) target.hide();else this.removeChild(target);
          }
        };
        _proto48.showTooltips = function showTooltips(msg) {
          if (this._defaultTooltipWin == null) {
            var resourceURL = UIConfig.tooltipsWin;
            if (!resourceURL) {
              console.error("UIConfig.tooltipsWin not defined");
              return;
            }
            this._defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
          }
          this._defaultTooltipWin.text = msg;
          this.showTooltipsWin(this._defaultTooltipWin);
        };
        _proto48.showTooltipsWin = function showTooltipsWin(tooltipWin) {
          this.hideTooltips();
          this._tooltipWin = tooltipWin;
          var pt = this.getTouchPosition();
          pt.x += 10;
          pt.y += 20;
          this.globalToLocal(pt.x, pt.y, pt);
          if (pt.x + this._tooltipWin.width > this.width) {
            pt.x = pt.x - this._tooltipWin.width - 1;
            if (pt.x < 0) pt.x = 10;
          }
          if (pt.y + this._tooltipWin.height > this.height) {
            pt.y = pt.y - this._tooltipWin.height - 1;
            if (pt.y < 0) pt.y = 10;
          }
          this._tooltipWin.setPosition(pt.x, pt.y);
          this.addChild(this._tooltipWin);
        };
        _proto48.hideTooltips = function hideTooltips() {
          if (this._tooltipWin) {
            if (this._tooltipWin.parent) this.removeChild(this._tooltipWin);
            this._tooltipWin = null;
          }
        };
        _proto48.playOneShotSound = function playOneShotSound(clip, volumeScale) {
          if (!this.audioEngine) {
            this.audioEngine = this.node.addComponent(AudioSourceComponent);
          }
          if (volumeScale === undefined) volumeScale = 1;
          if (this.audioEngine.isValid) {
            this.audioEngine.clip = clip;
            this.audioEngine.volume = this._volumeScale * volumeScale;
            this.audioEngine.loop = false;
            this.audioEngine.play();
          }
        };
        _proto48.adjustModalLayer = function adjustModalLayer() {
          var cnt = this.numChildren;
          if (this._modalWaitPane && this._modalWaitPane.parent) this.setChildIndex(this._modalWaitPane, cnt - 1);
          for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g instanceof Window && g.modal) {
              this._modalLayer.sortingOrder = g.sortingOrder > 0 ? g.sortingOrder - 1 : 0;
              if (this._modalLayer.parent == null) this.addChildAt(this._modalLayer, i);else this.setChildIndexBefore(this._modalLayer, i);
              return;
            }
          }
          if (this._modalLayer.parent) this.removeChild(this._modalLayer);
        };
        _proto48.onTouchBegin_1 = function onTouchBegin_1(evt) {
          if (this._tooltipWin) this.hideTooltips();
          this._justClosedPopups.length = 0;
          if (this._popupStack.length > 0) {
            var mc = evt.initiator;
            while (mc && mc != this) {
              var pindex = this._popupStack.indexOf(mc);
              if (pindex != -1) {
                for (var i = this._popupStack.length - 1; i > pindex; i--) {
                  var popup = this._popupStack.pop();
                  this.closePopup(popup);
                  this._justClosedPopups.push(popup);
                }
                return;
              }
              mc = mc.findParent();
            }
            var cnt = this._popupStack.length;
            for (var _i6 = cnt - 1; _i6 >= 0; _i6--) {
              popup = this._popupStack[_i6];
              this.closePopup(popup);
              this._justClosedPopups.push(popup);
            }
            this._popupStack.length = 0;
          }
        };
        _proto48.onWinResize = function onWinResize() {
          updateScaler();
          this.setSize(UIContentScaler.rootSize.width, UIContentScaler.rootSize.height);
          var anchorPoint = this.node.getParent().getComponent(UITransform).anchorPoint;
          this.node.setPosition(-this._width * anchorPoint.x, this._height * (1 - anchorPoint.y));
        };
        _proto48.handlePositionChanged = function handlePositionChanged() {//nothing here
        };
        _createClass(GRoot, [{
          key: "touchTarget",
          get: function get() {
            return this._inputProcessor.getTouchTarget();
          }
        }, {
          key: "inputProcessor",
          get: function get() {
            return this._inputProcessor;
          }
        }, {
          key: "modalLayer",
          get: function get() {
            return this._modalLayer;
          }
        }, {
          key: "hasModalWindow",
          get: function get() {
            return this._modalLayer.parent != null;
          }
        }, {
          key: "modalWaiting",
          get: function get() {
            return this._modalWaitPane && this._modalWaitPane.node.activeInHierarchy;
          }
        }, {
          key: "hasAnyPopup",
          get: function get() {
            return this._popupStack.length != 0;
          }
        }, {
          key: "volumeScale",
          get: function get() {
            return this._volumeScale;
          },
          set: function set(value) {
            this._volumeScale = value;
          }
        }], [{
          key: "inst",
          get: function get() {
            if (!GRoot._inst) throw 'Call GRoot.create first!';
            return GRoot._inst;
          }
        }]);
        return GRoot;
      }(GComponent));
      Decls$1.GRoot = GRoot;
      var GTextInput = exports('GTextInput', /*#__PURE__*/function (_GTextField2) {
        _inheritsLoose(GTextInput, _GTextField2);
        function GTextInput() {
          var _this21;
          _this21 = _GTextField2.call(this) || this;
          _this21._node.name = "GTextInput";
          _this21._touchDisabled = false;
          return _this21;
        }
        var _proto49 = GTextInput.prototype;
        _proto49.createRenderer = function createRenderer() {
          this._editBox = this._node.addComponent(MyEditBox);
          this._editBox.maxLength = -1;
          this._editBox["_updateTextLabel"]();
          this._node.on('text-changed', this.onTextChanged, this);
          this.on(Event.TOUCH_END, this.onTouchEnd1, this);
          this.autoSize = AutoSizeType.None;
        };
        _proto49.requestFocus = function requestFocus() {
          this._editBox.focus();
        };
        _proto49.markSizeChanged = function markSizeChanged() {//不支持自动大小，所以这里空
        };
        _proto49.updateText = function updateText() {
          var text2 = this._text;
          if (this._templateVars) text2 = this.parseTemplate(text2);
          if (this._ubbEnabled)
            //不支持同一个文本不同样式
            text2 = defaultParser.parse(text2, true);
          this._editBox.string = text2;
        };
        _proto49.updateFont = function updateFont() {
          this.assignFont(this._editBox.textLabel, this._realFont);
          if (this._editBox.placeholderLabel) this.assignFont(this._editBox.placeholderLabel, this._realFont);
        };
        _proto49.updateFontColor = function updateFontColor() {
          this.assignFontColor(this._editBox.textLabel, this._color);
        };
        _proto49.updateFontSize = function updateFontSize() {
          this._editBox.textLabel.fontSize = this._fontSize;
          this._editBox.textLabel.lineHeight = this._fontSize + this._leading;
          if (this._editBox.placeholderLabel) this._editBox.placeholderLabel.fontSize = this._editBox.textLabel.fontSize;
        };
        _proto49.updateOverflow = function updateOverflow() {//not supported
        };
        _proto49.onTextChanged = function onTextChanged() {
          this._text = this._editBox.string;
        };
        _proto49.onTouchEnd1 = function onTouchEnd1(evt) {
          this._editBox.openKeyboard();
          evt.propagationStopped = true;
        };
        _proto49.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GTextField2.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 4);
          var str = buffer.readS();
          if (str != null) this.promptText = str;else if (this._editBox.placeholderLabel) this._editBox.placeholderLabel.string = "";
          str = buffer.readS();
          if (str != null) this.restrict = str;
          var iv = buffer.readInt();
          if (iv != 0) this.maxLength = iv;
          iv = buffer.readInt();
          if (buffer.readBool()) this.password = true; //同步一下对齐方式
          if (this._editBox.placeholderLabel) {
            var hAlign = this._editBox.textLabel.horizontalAlign;
            this._editBox.placeholderLabel.horizontalAlign = hAlign;
            var vAlign = this._editBox.textLabel.verticalAlign;
            this._editBox.placeholderLabel.verticalAlign = vAlign;
          }
        };
        _createClass(GTextInput, [{
          key: "editable",
          get: function get() {
            return this._editBox.enabled;
          },
          set: function set(val) {
            this._editBox.enabled = val;
          }
        }, {
          key: "maxLength",
          get: function get() {
            return this._editBox.maxLength;
          },
          set: function set(val) {
            if (val == 0) val = -1;
            this._editBox.maxLength = val;
          }
        }, {
          key: "promptText",
          get: function get() {
            return this._promptText;
          },
          set: function set(val) {
            this._promptText = val;
            var newCreate = !this._editBox.placeholderLabel;
            this._editBox["_updatePlaceholderLabel"]();
            if (newCreate) this.assignFont(this._editBox.placeholderLabel, this._realFont);
            this._editBox.placeholderLabel.string = defaultParser.parse(this._promptText, true);
            if (defaultParser.lastColor) {
              var c = this._editBox.placeholderLabel.color;
              if (!c) c = new Color();
              c.fromHEX(defaultParser.lastColor);
              this.assignFontColor(this._editBox.placeholderLabel, c);
            } else this.assignFontColor(this._editBox.placeholderLabel, this._color);
            if (defaultParser.lastSize) this._editBox.placeholderLabel.fontSize = parseInt(defaultParser.lastSize);else this._editBox.placeholderLabel.fontSize = this._fontSize;
          }
        }, {
          key: "restrict",
          get: function get() {
            return "";
          },
          set: function set(value) {//not supported
          }
        }, {
          key: "password",
          get: function get() {
            return this._editBox.inputFlag == EditBox.InputFlag.PASSWORD;
          },
          set: function set(val) {
            this._editBox.inputFlag = val ? EditBox.InputFlag.PASSWORD : EditBox.InputFlag.DEFAULT;
          }
        }, {
          key: "align",
          get: function get() {
            return this._editBox.textLabel.horizontalAlign;
          },
          set: function set(value) {
            this._editBox.textLabel.horizontalAlign = value;
            if (this._editBox.placeholderLabel) {
              this._editBox.placeholderLabel.horizontalAlign = value;
            }
          }
        }, {
          key: "verticalAlign",
          get: function get() {
            return this._editBox.textLabel.verticalAlign;
          },
          set: function set(value) {
            this._editBox.textLabel.verticalAlign = value;
            if (this._editBox.placeholderLabel) {
              this._editBox.placeholderLabel.verticalAlign = value;
            }
          }
        }, {
          key: "singleLine",
          get: function get() {
            return this._editBox.inputMode != EditBox.InputMode.ANY;
          },
          set: function set(value) {
            this._editBox.inputMode = value ? EditBox.InputMode.SINGLE_LINE : EditBox.InputMode.ANY;
          }
        }]);
        return GTextInput;
      }(GTextField));
      var MyEditBox = /*#__PURE__*/function (_EditBox) {
        _inheritsLoose(MyEditBox, _EditBox);
        function MyEditBox() {
          return _EditBox.apply(this, arguments) || this;
        }
        var _proto50 = MyEditBox.prototype;
        _proto50._init = function _init() {
          _EditBox.prototype._init.call(this);
          this.placeholderLabel.getComponent(UITransform).setAnchorPoint(0, 1);
          this.textLabel.getComponent(UITransform).setAnchorPoint(0, 1);
          this.placeholderLabel.overflow = Overflow.CLAMP;
          this.textLabel.overflow = Overflow.CLAMP;
        };
        _proto50._registerEvent = function _registerEvent() {//取消掉原来的事件处理
        };
        _proto50.openKeyboard = function openKeyboard() {
          var impl = this["_impl"];
          if (impl) {
            impl.beginEditing();
          }
        };
        return MyEditBox;
      }(EditBox);
      var GObjectPool = exports('GObjectPool', /*#__PURE__*/function () {
        function GObjectPool() {
          this._count = 0;
          this._pool = {};
        }
        var _proto51 = GObjectPool.prototype;
        _proto51.clear = function clear() {
          for (var i1 in this._pool) {
            var arr = this._pool[i1];
            var cnt = arr.length;
            for (var i = 0; i < cnt; i++) arr[i].dispose();
          }
          this._pool = {};
          this._count = 0;
        };
        _proto51.getObject = function getObject(url) {
          url = UIPackage.normalizeURL(url);
          if (url == null) return null;
          var arr = this._pool[url];
          if (arr && arr.length) {
            this._count--;
            return arr.shift();
          }
          var child = UIPackage.createObjectFromURL(url);
          return child;
        };
        _proto51.returnObject = function returnObject(obj) {
          var url = obj.resourceURL;
          if (!url) return;
          var arr = this._pool[url];
          if (arr == null) {
            arr = new Array();
            this._pool[url] = arr;
          }
          this._count++;
          arr.push(obj);
        };
        _createClass(GObjectPool, [{
          key: "count",
          get: function get() {
            return this._count;
          }
        }]);
        return GObjectPool;
      }());
      var GLoader3D = exports('GLoader3D', /*#__PURE__*/function (_GObject7) {
        _inheritsLoose(GLoader3D, _GObject7);
        function GLoader3D() {
          var _this22;
          _this22 = _GObject7.call(this) || this;
          _this22._frame = 0;
          _this22._node.name = "GLoader3D";
          _this22._playing = true;
          _this22._url = "";
          _this22._fill = LoaderFillType.None;
          _this22._align = AlignType.Left;
          _this22._verticalAlign = VertAlignType.Top;
          _this22._color = new Color(255, 255, 255, 255);
          _this22._container = new Node("Wrapper");
          _this22._container.layer = UIConfig.defaultUILayer;
          _this22._container.addComponent(UITransform).setAnchorPoint(0, 1);
          _this22._node.addChild(_this22._container);
          return _this22;
        }
        var _proto52 = GLoader3D.prototype;
        _proto52.dispose = function dispose() {
          _GObject7.prototype.dispose.call(this);
        };
        _proto52.loadContent = function loadContent() {
          this.clearContent();
          if (!this._url) return;
          if (this._url.startsWith("ui://")) this.loadFromPackage(this._url);else this.loadExternal();
        };
        _proto52.loadFromPackage = function loadFromPackage(itemURL) {
          this._contentItem = UIPackage.getItemByURL(itemURL);
          if (this._contentItem) {
            this._contentItem = this._contentItem.getBranch();
            this.sourceWidth = this._contentItem.width;
            this.sourceHeight = this._contentItem.height;
            this._contentItem = this._contentItem.getHighResolution();
            if (this._autoSize) this.setSize(this.sourceWidth, this.sourceHeight);
            if (this._contentItem.type == PackageItemType.Spine || this._contentItem.type == PackageItemType.DragonBones) this._contentItem.owner.getItemAssetAsync(this._contentItem, this.onLoaded.bind(this));
          }
        };
        _proto52.onLoaded = function onLoaded(err, item) {
          if (this._contentItem != item) return;
          if (err) console.warn(err);
          if (!this._contentItem.asset) return;
          if (this._contentItem.type == PackageItemType.Spine) this.setSpine(this._contentItem.asset, this._contentItem.skeletonAnchor);else if (this._contentItem.type == PackageItemType.DragonBones) this.setDragonBones(this._contentItem.asset, this._contentItem.atlasAsset, this._contentItem.skeletonAnchor);
        };
        _proto52.setSpine = function setSpine(asset, anchor, pma) {
          this.freeSpine();
          var node = new Node();
          this._container.addChild(node);
          node.layer = UIConfig.defaultUILayer;
          node.setPosition(anchor.x, -anchor.y);
          this._content = node.addComponent(sp.Skeleton);
          this._content.premultipliedAlpha = pma;
          this._content.skeletonData = asset;
          this._content.color = this._color;
          this.onChangeSpine();
          this.updateLayout();
        };
        _proto52.freeSpine = function freeSpine() {
          if (this._content) {
            this._content.destroy();
          }
        };
        _proto52.setDragonBones = function setDragonBones(asset, atlasAsset, anchor, pma) {
          this.freeDragonBones();
          var node = new Node();
          node.layer = UIConfig.defaultUILayer;
          this._container.addChild(node);
          node.setPosition(anchor.x, -anchor.y);
          this._content = node.addComponent(dragonBones.ArmatureDisplay);
          this._content.premultipliedAlpha = pma;
          this._content.dragonAsset = asset;
          this._content.dragonAtlasAsset = atlasAsset;
          this._content.color = this._color;
          var armatureKey = asset["init"](dragonBones.CCFactory.getInstance(), atlasAsset["_uuid"]);
          var dragonBonesData = this._content["_factory"].getDragonBonesData(armatureKey);
          this._content.armatureName = dragonBonesData.armatureNames[0];
          this.onChangeDragonBones();
          this.updateLayout();
        };
        _proto52.freeDragonBones = function freeDragonBones() {
          if (this._content) {
            this._content.destroy();
          }
        };
        _proto52.onChange = function onChange() {
          if (this._contentItem == null) return;
          if (this._contentItem.type == PackageItemType.Spine) {
            this.onChangeSpine();
          }
          if (this._contentItem.type == PackageItemType.DragonBones) {
            this.onChangeDragonBones();
          }
        };
        _proto52.onChangeSpine = function onChangeSpine() {
          var _a;
          if (!(this._content instanceof sp.Skeleton)) return;
          if (this._animationName) {
            var trackEntry = this._content.getCurrent(0);
            if (!trackEntry || trackEntry.animation.name != this._animationName || trackEntry.isComplete() && !trackEntry.loop) {
              this._content.animation = this._animationName;
              trackEntry = this._content.setAnimation(0, this._animationName, this._loop);
            }
            if (this._playing) this._content.paused = false;else {
              this._content.paused = true;
              trackEntry.trackTime = math.lerp(0, trackEntry.animationEnd - trackEntry.animationStart, this._frame / 100);
            }
          } else this._content.clearTrack(0);
          var skin = this._skinName || this._content.skeletonData.getRuntimeData().skins[0].name;
          if (((_a = this._content["_skeleton"].skin) === null || _a === void 0 ? void 0 : _a.name) != skin) this._content.setSkin(skin);
        };
        _proto52.onChangeDragonBones = function onChangeDragonBones() {
          if (!(this._content instanceof dragonBones.ArmatureDisplay)) return;
          if (this._animationName) {
            if (this._playing) this._content.playAnimation(this._animationName, this._loop ? 0 : 1);else this._content.armature().animation.gotoAndStopByFrame(this._animationName, this._frame);
          } else this._content.armature().animation.reset();
        };
        _proto52.loadExternal = function loadExternal() {
          if (this._url.startsWith("http://") || this._url.startsWith("https://") || this._url.startsWith('/')) assetManager.loadRemote(this._url, sp.SkeletonData, this.onLoaded2.bind(this));else resources.load(this._url, sp.SkeletonData, this.onLoaded2.bind(this));
        };
        _proto52.onLoaded2 = function onLoaded2(err, asset) {
          //因为是异步返回的，而这时可能url已经被改变，所以不能直接用返回的结果
          if (!this._url || !isValid(this._node)) return;
          if (err) console.warn(err);
        };
        _proto52.updateLayout = function updateLayout() {
          var cw = this.sourceWidth;
          var ch = this.sourceHeight;
          var pivotCorrectX = -this.pivotX * this._width;
          var pivotCorrectY = this.pivotY * this._height;
          if (this._autoSize) {
            this._updatingLayout = true;
            if (cw == 0) cw = 50;
            if (ch == 0) ch = 30;
            this.setSize(cw, ch);
            this._updatingLayout = false;
            if (cw == this._width && ch == this._height) {
              this._container.setScale(1, 1);
              this._container.setPosition(pivotCorrectX, pivotCorrectY);
              return;
            }
          }
          var sx = 1,
            sy = 1;
          if (this._fill != LoaderFillType.None) {
            sx = this.width / this.sourceWidth;
            sy = this.height / this.sourceHeight;
            if (sx != 1 || sy != 1) {
              if (this._fill == LoaderFillType.ScaleMatchHeight) sx = sy;else if (this._fill == LoaderFillType.ScaleMatchWidth) sy = sx;else if (this._fill == LoaderFillType.Scale) {
                if (sx > sy) sx = sy;else sy = sx;
              } else if (this._fill == LoaderFillType.ScaleNoBorder) {
                if (sx > sy) sy = sx;else sx = sy;
              }
              if (this._shrinkOnly) {
                if (sx > 1) sx = 1;
                if (sy > 1) sy = 1;
              }
              cw = this.sourceWidth * sx;
              ch = this.sourceHeight * sy;
            }
          }
          this._container.setScale(sx, sy);
          var nx, ny;
          if (this._align == AlignType.Left) nx = 0;else if (this._align == AlignType.Center) nx = Math.floor((this._width - cw) / 2);else nx = this._width - cw;
          if (this._verticalAlign == VertAlignType.Top) ny = 0;else if (this._verticalAlign == VertAlignType.Middle) ny = Math.floor((this._height - ch) / 2);else ny = this._height - ch;
          ny = -ny;
          this._container.setPosition(pivotCorrectX + nx, pivotCorrectY + ny);
        };
        _proto52.clearContent = function clearContent() {
          this._contentItem = null;
          if (this._content) {
            this._content.node.destroy();
            this._content = null;
          }
        };
        _proto52.handleSizeChanged = function handleSizeChanged() {
          _GObject7.prototype.handleSizeChanged.call(this);
          if (!this._updatingLayout) this.updateLayout();
        };
        _proto52.handleAnchorChanged = function handleAnchorChanged() {
          _GObject7.prototype.handleAnchorChanged.call(this);
          if (!this._updatingLayout) this.updateLayout();
        };
        _proto52.handleGrayedChanged = function handleGrayedChanged() {};
        _proto52.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.color;
            case ObjectPropID.Playing:
              return this.playing;
            case ObjectPropID.Frame:
              return this.frame;
            case ObjectPropID.TimeScale:
              return 1;
            default:
              return _GObject7.prototype.getProp.call(this, index);
          }
        };
        _proto52.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.color = value;
              break;
            case ObjectPropID.Playing:
              this.playing = value;
              break;
            case ObjectPropID.Frame:
              this.frame = value;
              break;
            case ObjectPropID.TimeScale:
              break;
            case ObjectPropID.DeltaTime:
              break;
            default:
              _GObject7.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto52.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject7.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this._url = buffer.readS();
          this._align = buffer.readByte();
          this._verticalAlign = buffer.readByte();
          this._fill = buffer.readByte();
          this._shrinkOnly = buffer.readBool();
          this._autoSize = buffer.readBool();
          this._animationName = buffer.readS();
          this._skinName = buffer.readS();
          this._playing = buffer.readBool();
          this._frame = buffer.readInt();
          this._loop = buffer.readBool();
          if (buffer.readBool()) this.color = buffer.readColor();
          if (this._url) this.loadContent();
        };
        _createClass(GLoader3D, [{
          key: "url",
          get: function get() {
            return this._url;
          },
          set: function set(value) {
            if (this._url == value) return;
            this._url = value;
            this.loadContent();
            this.updateGear(7);
          }
        }, {
          key: "icon",
          get: function get() {
            return this._url;
          },
          set: function set(value) {
            this.url = value;
          }
        }, {
          key: "align",
          get: function get() {
            return this._align;
          },
          set: function set(value) {
            if (this._align != value) {
              this._align = value;
              this.updateLayout();
            }
          }
        }, {
          key: "verticalAlign",
          get: function get() {
            return this._verticalAlign;
          },
          set: function set(value) {
            if (this._verticalAlign != value) {
              this._verticalAlign = value;
              this.updateLayout();
            }
          }
        }, {
          key: "fill",
          get: function get() {
            return this._fill;
          },
          set: function set(value) {
            if (this._fill != value) {
              this._fill = value;
              this.updateLayout();
            }
          }
        }, {
          key: "shrinkOnly",
          get: function get() {
            return this._shrinkOnly;
          },
          set: function set(value) {
            if (this._shrinkOnly != value) {
              this._shrinkOnly = value;
              this.updateLayout();
            }
          }
        }, {
          key: "autoSize",
          get: function get() {
            return this._autoSize;
          },
          set: function set(value) {
            if (this._autoSize != value) {
              this._autoSize = value;
              this.updateLayout();
            }
          }
        }, {
          key: "playing",
          get: function get() {
            return this._playing;
          },
          set: function set(value) {
            if (this._playing != value) {
              this._playing = value;
              this.updateGear(5);
              this.onChange();
            }
          }
        }, {
          key: "frame",
          get: function get() {
            return this._frame;
          },
          set: function set(value) {
            if (this._frame != value) {
              this._frame = value;
              this.updateGear(5);
              this.onChange();
            }
          }
        }, {
          key: "animationName",
          get: function get() {
            return this._animationName;
          },
          set: function set(value) {
            if (this._animationName != value) {
              this._animationName = value;
              this.onChange();
            }
          }
        }, {
          key: "skinName",
          get: function get() {
            return this._skinName;
          },
          set: function set(value) {
            if (this._skinName != value) {
              this._skinName = value;
              this.onChange();
            }
          }
        }, {
          key: "loop",
          get: function get() {
            return this._loop;
          },
          set: function set(value) {
            if (this._loop != value) {
              this._loop = value;
              this.onChange();
            }
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            this._color.set(value);
            this.updateGear(4);
            if (this._content) this._content.color = value;
          }
        }, {
          key: "content",
          get: function get() {
            return this._content;
          }
        }]);
        return GLoader3D;
      }(GObject));
      var __awaiter$1 = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }; // 加载预制体 显示一些spine动画什么的
      var GLoaderPrefab = exports('GloaderPrefab', /*#__PURE__*/function (_GLoader3D) {
        _inheritsLoose(GLoaderPrefab, _GLoader3D);
        function GLoaderPrefab() {
          var _this23;
          _this23 = _GLoader3D.call(this) || this;
          _this23._node.name = "GLoaderPrefab";
          return _this23;
        }
        var _proto53 = GLoaderPrefab.prototype;
        _proto53.setUrl = function setUrl(url, bundleName) {
          return __awaiter$1(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var isRemote, prefab, node;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this._url = url;
                  this._assetBundle = bundleName;
                  if (url) {
                    _context.next = 5;
                    break;
                  }
                  this.clearContent();
                  return _context.abrupt("return");
                case 5:
                  isRemote = false;
                  if (this._url.startsWith("http://") || this._url.startsWith("https://") || this._url.startsWith('/')) {
                    isRemote = true;
                  }
                  _context.next = 9;
                  return mk_asset$1.get(url, Prefab, null, {
                    bundle_s: bundleName,
                    remote_option: isRemote ? {} : null
                  });
                case 9:
                  prefab = _context.sent;
                  if (!(url != this.url)) {
                    _context.next = 13;
                    break;
                  }
                  prefab.decRef();
                  return _context.abrupt("return");
                case 13:
                  node = instantiate(prefab);
                  this._initPrefabNode(node, prefab);
                  return _context.abrupt("return", node);
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
        };
        _proto53.loadExternal = function loadExternal() {
          this.setUrl(this._url, this.bundle);
        };
        _proto53._initPrefabNode = function _initPrefabNode(node, asset) {
          this.clearContent();
          this._prefab = node;
          if (!isValid(node)) return;
          node.setPosition(0, 0);
          node.layer = UIConfig.defaultUILayer;
          this._container.addChild(node);
          var transform = node.getComponent(UITransform);
          if (transform) {
            this.sourceWidth = transform.width;
            this.sourceHeight = transform.height;
            if (this._autoSize) {
              this.setSize(this.sourceWidth, this.sourceHeight);
            } // 计算 node 的位置，使其左上角对齐到 this._container 的左上角
            var anchorOffsetX = transform.width * transform.anchorX;
            var anchorOffsetY = -transform.height * (1 - transform.anchorY);
            node.setPosition(anchorOffsetX, anchorOffsetY);
          }
          var skeleton = node.getComponent(sp.Skeleton);
          if (skeleton) {
            this._prefabType = PackageItemType.Spine;
            this.setSpine2(skeleton);
            return;
          }
          var dragonBone = node.getComponent(dragonBones.ArmatureDisplay);
          if (dragonBone) {
            this._prefabType = PackageItemType.DragonBones;
            this.setDragonBones2(dragonBone);
            return;
          }
        };
        _proto53.setSpine2 = function setSpine2(asset) {
          var _a;
          this._content = asset;
          this._color = this._content.color;
          this._playing = !this._content.paused;
          this._animationName = this._content.animation;
          this._skinName = (_a = this._content._skeleton.skin) === null || _a === void 0 ? void 0 : _a.name;
          this.updateLayout();
        };
        _proto53.setDragonBones2 = function setDragonBones2(asset) {
          this._content = asset;
          this._color = this._content.color; // @ts-ignore
          this._playing = this.content._playing;
          this._animationName = this._content.animationName; // this._skinName = this._content;
          this.updateLayout();
        };
        _proto53.dispose = function dispose() {
          _GLoader3D.prototype.dispose.call(this);
          if (this._prefabAsset) {
            this._prefabAsset.decRef();
            this._prefabAsset = null;
          }
        };
        _proto53.onChange = function onChange() {
          if (this._prefab == null) return;
          if (this._prefabType == PackageItemType.Spine) {
            this.onChangeSpine();
          }
          if (this._prefabType == PackageItemType.DragonBones) {
            this.onChangeDragonBones();
          }
        };
        _proto53.clearContent = function clearContent() {
          _GLoader3D.prototype.clearContent.call(this);
          if (this._prefabAsset) {
            this._prefabAsset.decRef();
            this._prefabAsset = null;
          }
        };
        _createClass(GLoaderPrefab, [{
          key: "prefab",
          get: function get() {
            return this._prefab;
          },
          set: function set(val) {
            this._initPrefabNode(val);
          }
        }, {
          key: "bundle",
          get: function get() {
            if (this._assetBundle) {
              return this._assetBundle;
            }
            return UIConfig.loaderAssetsBundleName;
          },
          set: function set(val) {
            this._assetBundle = val;
          }
        }]);
        return GLoaderPrefab;
      }(GLoader3D));
      var __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var GLoader = exports('GLoader', /*#__PURE__*/function (_GObject8) {
        _inheritsLoose(GLoader, _GObject8);
        function GLoader() {
          var _this24;
          _this24 = _GObject8.call(this) || this;
          _this24._frame = 0;
          _this24._node.name = "GLoader";
          _this24._playing = true;
          _this24._url = "";
          _this24._fill = LoaderFillType.None;
          _this24._align = AlignType.Left;
          _this24._verticalAlign = VertAlignType.Top;
          _this24._showErrorSign = true;
          _this24._color = new Color(255, 255, 255, 255);
          _this24._container = new Node("Image");
          _this24._container.layer = UIConfig.defaultUILayer;
          _this24._containerUITrans = _this24._container.addComponent(UITransform);
          _this24._containerUITrans.setAnchorPoint(0, 1);
          _this24._node.addChild(_this24._container);
          _this24._content = _this24._container.addComponent(MovieClip);
          _this24._content.sizeMode = Sprite.SizeMode.CUSTOM;
          _this24._content.trim = false;
          _this24._content.setPlaySettings();
          return _this24;
        }
        var _proto54 = GLoader.prototype;
        _proto54.dispose = function dispose() {
          if (this._contentItem == null) {
            if (this._content.spriteFrame) this.freeExternal(this._content.spriteFrame);
          }
          if (this._content2) this._content2.dispose();
          if (this._content3) this._content3.dispose();
          if (this._asset) {
            this._asset.decRef();
            this._asset = null;
          }
          _GObject8.prototype.dispose.call(this);
        }; /**
           * 设置图片
           * @param url
           * @param bundleStr 远程包名称
           */
        _proto54.setUrlWithBundle = function setUrlWithBundle(url, bundleStr) {
          if (bundleStr === void 0) {
            bundleStr = '';
          }
          this.bundle = bundleStr;
          this.url = url;
        };
        _proto54.loadContent = function loadContent() {
          this.clearContent();
          if (!this._url) return;
          if (this._url.startsWith("ui://")) this.loadFromPackage(this._url);else this.loadExternal2();
        };
        _proto54.loadFromPackage = function loadFromPackage(itemURL) {
          var contentItem = UIPackage.getItemByURL(itemURL);
          this._contentItem = contentItem;
          if (!contentItem) {
            this.setErrorState();
            return;
          }
          contentItem = contentItem.getBranch();
          this.sourceWidth = contentItem.width;
          this.sourceHeight = contentItem.height;
          contentItem = contentItem.getHighResolution();
          contentItem.load();
          if (this._autoSize) this.setSize(this.sourceWidth, this.sourceHeight);
          if (contentItem.type == PackageItemType.Image) {
            if (!contentItem.asset) {
              this.setErrorState();
            } else {
              this._content.spriteFrame = contentItem.asset;
              if (this._content.fillMethod == 0) {
                if (contentItem.scale9Grid) this._content.type = Sprite.Type.SLICED;else if (contentItem.scaleByTile) this._content.type = Sprite.Type.TILED;else this._content.type = Sprite.Type.SIMPLE;
              } else {
                this._content.type = Sprite.Type.FILLED;
              }
              this.updateLayout();
            }
          } else if (contentItem.type == PackageItemType.MovieClip) {
            this._content.interval = contentItem.interval;
            this._content.swing = contentItem.swing;
            this._content.repeatDelay = contentItem.repeatDelay;
            this._content.frames = contentItem.frames;
            this.updateLayout();
          } else if (contentItem.type == PackageItemType.Component) {
            var obj = UIPackage.createObjectFromURL(itemURL);
            if (!obj) this.setErrorState();else if (!(obj instanceof GComponent)) {
              obj.dispose();
              this.setErrorState();
            } else {
              this._content2 = obj;
              this._container.addChild(this._content2.node);
              this.updateLayout();
            }
          } else {
            this.setErrorState();
            return;
          }
          this.node.emit("ImgLoaded");
        };
        _proto54.loadExternal2 = function loadExternal2() {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this25 = this;
            var url, loadAsset, prefabLoader, args, prefabName, bundleName, isRemote, sf, texture, _sf;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  url = this.url;
                  if (!this._url.startsWith('data:image/')) {
                    _context2.next = 8;
                    break;
                  }
                  _context2.next = 4;
                  return new Promise(function (resolve) {
                    var img = new Image();
                    img.src = _this25._url;
                    img.onload = function () {
                      var tex = new Texture2D();
                      tex.reset({
                        width: img.width,
                        height: img.height
                      });
                      tex.uploadData(img, 0, 0);
                      loadAsset = tex;
                      resolve(tex);
                    };
                  });
                case 4:
                  loadAsset = _context2.sent;
                  loadAsset.addRef();
                  _context2.next = 32;
                  break;
                case 8:
                  if (!this._url.startsWith('prefab:')) {
                    _context2.next = 27;
                    break;
                  }
                  prefabLoader = new GLoaderPrefab();
                  this._content3 = prefabLoader;
                  prefabLoader.width = this._width;
                  prefabLoader.height = this._height;
                  prefabLoader.pivotX = this.pivotX;
                  prefabLoader.pivotY = this.pivotY;
                  prefabLoader.align = this.align;
                  prefabLoader.verticalAlign = this._verticalAlign;
                  prefabLoader.fill = this.fill;
                  prefabLoader.shrinkOnly = this.shrinkOnly;
                  prefabLoader.autoSize = this._autoSize;
                  this._container.addChild(prefabLoader.node);
                  args = this._url.split(';');
                  prefabName = args[0].split(':')[1];
                  bundleName = args[1] ? args[1].split(':')[1] : "";
                  prefabLoader.setUrl(prefabName, bundleName);
                  _context2.next = 32;
                  break;
                case 27:
                  isRemote = false;
                  if (this._url.startsWith("http://") || this._url.startsWith("https://") || this._url.startsWith('/')) {
                    isRemote = true;
                  }
                  _context2.next = 31;
                  return mk_asset$1.get(url + (isRemote ? "" : "/spriteFrame"), Asset, null, {
                    bundle_s: this.bundle,
                    remote_option: isRemote ? {} : null
                  });
                case 31:
                  loadAsset = _context2.sent;
                case 32:
                  if (loadAsset) {
                    _context2.next = 34;
                    break;
                  }
                  return _context2.abrupt("return");
                case 34:
                  if (!(this._url != url || !isValid(this._node))) {
                    _context2.next = 37;
                    break;
                  }
                  loadAsset.decRef();
                  return _context2.abrupt("return");
                case 37:
                  this._asset = loadAsset;
                  if (loadAsset instanceof SpriteFrame) this.onExternalLoadSuccess(loadAsset);else if (loadAsset instanceof Texture2D) {
                    sf = new SpriteFrame();
                    sf.texture = loadAsset;
                    this.onExternalLoadSuccess(sf);
                  } else if (loadAsset instanceof ImageAsset) {
                    texture = new Texture2D();
                    texture.image = loadAsset;
                    _sf = new SpriteFrame();
                    _sf.texture = texture;
                    this.onExternalLoadSuccess(_sf);
                  } else {
                    console.warn("GLoader:cant load", this.url);
                  }
                case 39:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
        } // 这个旧的不用了
        ;
        _proto54.loadExternal = function loadExternal() {
          var _this26 = this;
          var url = this.url;
          var callback = function callback(err, asset) {
            //因为是异步返回的，而这时可能url已经被改变，所以不能直接用返回的结果
            if (_this26._url != url || !isValid(_this26._node)) return;
            if (err) console.warn(err);
            if (asset instanceof SpriteFrame) _this26.onExternalLoadSuccess(asset);else if (asset instanceof Texture2D) {
              var sf = new SpriteFrame();
              sf.texture = asset;
              _this26.onExternalLoadSuccess(sf);
            } else if (asset instanceof ImageAsset) {
              var texture = new Texture2D();
              texture.image = asset;
              var _sf2 = new SpriteFrame();
              _sf2.texture = texture;
              _this26.onExternalLoadSuccess(_sf2);
            } else {
              console.warn("GLoader:cant load", _this26.url);
            }
          };
          if (this._url.startsWith("http://") || this._url.startsWith("https://") || this._url.startsWith('/')) assetManager.loadRemote(this._url, callback);else if (this._url.startsWith('data:image/')) {
            var img = new Image();
            img.src = this._url;
            img.onload = function () {
              var tex = new Texture2D();
              tex.reset({
                width: img.width,
                height: img.height
              });
              tex.uploadData(img, 0, 0);
              callback(null, tex);
            };
          } else {
            var bundle = resources; //如果有设置远程包 从远程包加载
            if (this.bundle && assetManager.bundles.has(this.bundle)) {
              bundle = assetManager.getBundle(this.bundle);
            }
            bundle.load(this._url + "/spriteFrame", Asset, callback);
          }
        };
        _proto54.freeExternal = function freeExternal(texture) {};
        _proto54.onExternalLoadSuccess = function onExternalLoadSuccess(texture) {
          this._content.spriteFrame = texture;
          this._content.type = Sprite.Type.SIMPLE;
          this.sourceWidth = texture.originalSize.width;
          this.sourceHeight = texture.originalSize.height;
          if (this._autoSize) this.setSize(this.sourceWidth, this.sourceHeight);
          this.updateLayout();
          this.node.emit("ImgLoaded");
        };
        _proto54.onExternalLoadFailed = function onExternalLoadFailed() {
          this.setErrorState();
        };
        _proto54.setErrorState = function setErrorState() {
          if (!this._showErrorSign) return;
          if (this._errorSign == null) {
            if (UIConfig.loaderErrorSign != null) {
              this._errorSign = GLoader._errorSignPool.getObject(UIConfig.loaderErrorSign);
            }
          }
          if (this._errorSign) {
            this._errorSign.setSize(this.width, this.height);
            this._container.addChild(this._errorSign.node);
          }
        };
        _proto54.clearErrorState = function clearErrorState() {
          if (this._errorSign) {
            this._container.removeChild(this._errorSign.node);
            GLoader._errorSignPool.returnObject(this._errorSign);
            this._errorSign = null;
          }
        };
        _proto54.updateLayout = function updateLayout() {
          if (this._content2 == null && this._content == null) {
            if (this._autoSize) {
              this._updatingLayout = true;
              this.setSize(50, 30);
              this._updatingLayout = false;
            }
            return;
          }
          var cw = this.sourceWidth;
          var ch = this.sourceHeight;
          var pivotCorrectX = -this.pivotX * this._width;
          var pivotCorrectY = this.pivotY * this._height;
          if (this._autoSize) {
            this._updatingLayout = true;
            if (cw == 0) cw = 50;
            if (ch == 0) ch = 30;
            this.setSize(cw, ch);
            this._updatingLayout = false;
            this._containerUITrans.setContentSize(this._width, this._height);
            this._container.setPosition(pivotCorrectX, pivotCorrectY);
            if (this._content2) {
              this._content2.setPosition(pivotCorrectX + this._width * this.pivotX, pivotCorrectY - this._height * this.pivotY);
              this._content2.setScale(1, 1);
            }
            if (cw == this._width && ch == this._height) return;
          }
          var sx = 1,
            sy = 1;
          if (this._fill != LoaderFillType.None) {
            sx = this.width / this.sourceWidth;
            sy = this.height / this.sourceHeight;
            if (sx != 1 || sy != 1) {
              if (this._fill == LoaderFillType.ScaleMatchHeight) sx = sy;else if (this._fill == LoaderFillType.ScaleMatchWidth) sy = sx;else if (this._fill == LoaderFillType.Scale) {
                if (sx > sy) sx = sy;else sy = sx;
              } else if (this._fill == LoaderFillType.ScaleNoBorder) {
                if (sx > sy) sy = sx;else sx = sy;
              }
              if (this._shrinkOnly) {
                if (sx > 1) sx = 1;
                if (sy > 1) sy = 1;
              }
              cw = this.sourceWidth * sx;
              ch = this.sourceHeight * sy;
            }
          }
          this._containerUITrans.setContentSize(cw, ch);
          if (this._content2) {
            this._content2.setPosition(pivotCorrectX + this._width * this.pivotX, pivotCorrectY - this._height * this.pivotY);
            this._content2.setScale(sx, sy);
          }
          var nx, ny;
          if (this._align == AlignType.Left) nx = 0;else if (this._align == AlignType.Center) nx = Math.floor((this._width - cw) / 2);else nx = this._width - cw;
          if (this._verticalAlign == VertAlignType.Top) ny = 0;else if (this._verticalAlign == VertAlignType.Middle) ny = Math.floor((this._height - ch) / 2);else ny = this._height - ch;
          ny = -ny;
          this._container.setPosition(pivotCorrectX + nx, pivotCorrectY + ny);
        };
        _proto54.clearContent = function clearContent() {
          this.clearErrorState();
          if (!this._contentItem) {
            var texture = this._content.spriteFrame;
            if (texture) this.freeExternal(texture);
          }
          if (this._content2) {
            this._container.removeChild(this._content2.node);
            this._content2.dispose();
            this._content2 = null;
          }
          if (this._content3) {
            this._container.removeChild(this._content3.node);
            this._content3.dispose();
            this._content3 = null;
          }
          this._content.frames = null;
          this._content.spriteFrame = null;
          this._contentItem = null;
          if (this._asset) {
            this._asset.decRef();
            this._asset = null;
          }
        };
        _proto54.handleSizeChanged = function handleSizeChanged() {
          _GObject8.prototype.handleSizeChanged.call(this);
          if (!this._updatingLayout) this.updateLayout();
        };
        _proto54.handleAnchorChanged = function handleAnchorChanged() {
          _GObject8.prototype.handleAnchorChanged.call(this);
          if (!this._updatingLayout) this.updateLayout();
        };
        _proto54.handleGrayedChanged = function handleGrayedChanged() {
          this._content.grayscale = this._grayed;
        };
        _proto54._hitTest = function _hitTest(pt, globalPt) {
          if (this._content2) {
            var obj = this._content2.hitTest(globalPt);
            if (obj) return obj;
          }
          if (pt.x >= 0 && pt.y >= 0 && pt.x < this._width && pt.y < this._height) return this;else return null;
        };
        _proto54.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.color;
            case ObjectPropID.Playing:
              return this.playing;
            case ObjectPropID.Frame:
              return this.frame;
            case ObjectPropID.TimeScale:
              return this._content.timeScale;
            default:
              return _GObject8.prototype.getProp.call(this, index);
          }
        };
        _proto54.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.color = value;
              break;
            case ObjectPropID.Playing:
              this.playing = value;
              break;
            case ObjectPropID.Frame:
              this.frame = value;
              break;
            case ObjectPropID.TimeScale:
              this._content.timeScale = value;
              break;
            case ObjectPropID.DeltaTime:
              this._content.advance(value);
              break;
            default:
              _GObject8.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto54.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GObject8.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this._url = buffer.readS();
          this._align = buffer.readByte();
          this._verticalAlign = buffer.readByte();
          this._fill = buffer.readByte();
          this._shrinkOnly = buffer.readBool();
          this._autoSize = buffer.readBool();
          this._showErrorSign = buffer.readBool();
          this._playing = buffer.readBool();
          this._frame = buffer.readInt();
          if (buffer.readBool()) this.color = buffer.readColor();
          this._content.fillMethod = buffer.readByte();
          if (this._content.fillMethod != 0) {
            this._content.fillOrigin = buffer.readByte();
            this._content.fillClockwise = buffer.readBool();
            this._content.fillAmount = buffer.readFloat();
          }
          if (this._url) this.loadContent();
        };
        _createClass(GLoader, [{
          key: "url",
          get: function get() {
            return this._url;
          },
          set: function set(value) {
            if (this._url == value) return;
            this._url = value;
            this.loadContent();
            this.updateGear(7);
          }
        }, {
          key: "bundle",
          get: function get() {
            if (this._assetBundle) {
              return this._assetBundle;
            }
            return UIConfig.loaderAssetsBundleName;
          },
          set: function set(val) {
            this._assetBundle = val;
          }
        }, {
          key: "icon",
          get: function get() {
            return this._url;
          },
          set: function set(value) {
            this.url = value;
          }
        }, {
          key: "align",
          get: function get() {
            return this._align;
          },
          set: function set(value) {
            if (this._align != value) {
              this._align = value;
              this.updateLayout();
            }
          }
        }, {
          key: "verticalAlign",
          get: function get() {
            return this._verticalAlign;
          },
          set: function set(value) {
            if (this._verticalAlign != value) {
              this._verticalAlign = value;
              this.updateLayout();
            }
          }
        }, {
          key: "fill",
          get: function get() {
            return this._fill;
          },
          set: function set(value) {
            if (this._fill != value) {
              this._fill = value;
              this.updateLayout();
            }
          }
        }, {
          key: "shrinkOnly",
          get: function get() {
            return this._shrinkOnly;
          },
          set: function set(value) {
            if (this._shrinkOnly != value) {
              this._shrinkOnly = value;
              this.updateLayout();
            }
          }
        }, {
          key: "autoSize",
          get: function get() {
            return this._autoSize;
          },
          set: function set(value) {
            if (this._autoSize != value) {
              this._autoSize = value;
              this.updateLayout();
            }
          }
        }, {
          key: "playing",
          get: function get() {
            return this._playing;
          },
          set: function set(value) {
            if (this._playing != value) {
              this._playing = value;
              if (this._content instanceof MovieClip) this._content.playing = value;
              this.updateGear(5);
            }
          }
        }, {
          key: "frame",
          get: function get() {
            return this._frame;
          },
          set: function set(value) {
            if (this._frame != value) {
              this._frame = value;
              if (this._content instanceof MovieClip) this._content.frame = value;
              this.updateGear(5);
            }
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            this._color.set(value);
            this.updateGear(4);
            this._content.color = value;
          }
        }, {
          key: "fillMethod",
          get: function get() {
            return this._content.fillMethod;
          },
          set: function set(value) {
            this._content.fillMethod = value;
          }
        }, {
          key: "fillOrigin",
          get: function get() {
            return this._content.fillOrigin;
          },
          set: function set(value) {
            this._content.fillOrigin = value;
          }
        }, {
          key: "fillClockwise",
          get: function get() {
            return this._content.fillClockwise;
          },
          set: function set(value) {
            this._content.fillClockwise = value;
          }
        }, {
          key: "fillAmount",
          get: function get() {
            return this._content.fillAmount;
          },
          set: function set(value) {
            this._content.fillAmount = value;
          }
        }, {
          key: "showErrorSign",
          get: function get() {
            return this._showErrorSign;
          },
          set: function set(value) {
            this._showErrorSign = value;
          }
        }, {
          key: "component",
          get: function get() {
            return this._content2;
          }
        }, {
          key: "prefabLoader",
          get: function get() {
            return this._content3;
          }
        }, {
          key: "texture",
          get: function get() {
            return this._content.spriteFrame;
          },
          set: function set(value) {
            this.url = null;
            this._content.spriteFrame = value;
            this._content.type = Sprite.Type.SIMPLE;
            if (value != null) {
              this.sourceWidth = value.rect.width;
              this.sourceHeight = value.rect.height;
            } else {
              this.sourceWidth = this.sourceHeight = 0;
            }
            this.updateLayout();
          }
        }]);
        return GLoader;
      }(GObject));
      GLoader._errorSignPool = new GObjectPool();
      var GLabel = exports('GLabel', /*#__PURE__*/function (_GComponent3) {
        _inheritsLoose(GLabel, _GComponent3);
        function GLabel() {
          var _this27;
          _this27 = _GComponent3.call(this) || this;
          _this27._node.name = "GLabel";
          return _this27;
        }
        var _proto55 = GLabel.prototype;
        _proto55.getTextField = function getTextField() {
          if (this._titleObject instanceof GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
        };
        _proto55.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.titleColor;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) return tf.strokeColor;else return 0;
              }
            case ObjectPropID.FontSize:
              return this.titleFontSize;
            default:
              return _GComponent3.prototype.getProp.call(this, index);
          }
        };
        _proto55.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.titleColor = value;
              break;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) tf.strokeColor = value;
              }
              break;
            case ObjectPropID.FontSize:
              this.titleFontSize = value;
              break;
            default:
              _GComponent3.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto55.constructExtension = function constructExtension(buffer) {
          this._titleObject = this.getChild("title");
          this._iconObject = this.getChild("icon");
        };
        _proto55.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent3.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!buffer.seek(beginPos, 6)) return;
          if (buffer.readByte() != this.packageItem.objectType) return;
          var str;
          str = buffer.readS();
          if (str != null) this.title = str;
          str = buffer.readS();
          if (str != null) this.icon = str;
          if (buffer.readBool()) this.titleColor = buffer.readColor();
          var iv = buffer.readInt();
          if (iv != 0) this.titleFontSize = iv;
          if (buffer.readBool()) {
            var input = this.getTextField();
            if (input instanceof GTextInput) {
              str = buffer.readS();
              if (str != null) input.promptText = str;
              str = buffer.readS();
              if (str != null) input.restrict = str;
              iv = buffer.readInt();
              if (iv != 0) input.maxLength = iv;
              iv = buffer.readInt();
              if (buffer.readBool()) input.password = true;
            } else buffer.skip(13);
          }
          str = buffer.readS();
          if (str != null) {
            this._sound = str;
            if (buffer.readBool()) {
              this._soundVolumeScale = buffer.readFloat();
            }
            this._node.on(Event.CLICK, this.onClick_1, this);
          }
        };
        _proto55.onClick_1 = function onClick_1() {
          if (this._sound) {
            var pi = UIPackage.getItemByURL(this._sound);
            if (pi) {
              var sound = pi.owner.getItemAsset(pi);
              if (sound) GRoot.inst.playOneShotSound(sound, this._soundVolumeScale);
            }
          }
        };
        _createClass(GLabel, [{
          key: "icon",
          get: function get() {
            if (this._iconObject) return this._iconObject.icon;
          },
          set: function set(value) {
            if (this._iconObject) this._iconObject.icon = value;
            this.updateGear(7);
          }
        }, {
          key: "title",
          get: function get() {
            if (this._titleObject) return this._titleObject.text;else return null;
          },
          set: function set(value) {
            if (this._titleObject) this._titleObject.text = value;
            this.updateGear(6);
          }
        }, {
          key: "text",
          get: function get() {
            return this.title;
          },
          set: function set(value) {
            this.title = value;
          }
        }, {
          key: "titleColor",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.color;else return Color.WHITE;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.color = value;
            this.updateGear(4);
          }
        }, {
          key: "titleFontSize",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.fontSize;else return 0;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.fontSize = value;
          }
        }, {
          key: "editable",
          get: function get() {
            if (this._titleObject && this._titleObject instanceof GTextInput) return this._titleObject.editable;else return false;
          },
          set: function set(val) {
            if (this._titleObject && this._titleObject instanceof GTextInput) this._titleObject.editable = val;
          }
        }]);
        return GLabel;
      }(GComponent));
      var GButton = exports('GButton', /*#__PURE__*/function (_GComponent4) {
        _inheritsLoose(GButton, _GComponent4);
        function GButton() {
          var _this28;
          _this28 = _GComponent4.call(this) || this;
          _this28._node.name = "GButton";
          _this28._mode = ButtonMode.Common;
          _this28._title = "";
          _this28._icon = "";
          _this28._sound = UIConfig.buttonSound;
          _this28._soundVolumeScale = UIConfig.buttonSoundVolumeScale;
          _this28._changeStateOnClick = true;
          _this28._downEffect = 0;
          _this28._downEffectValue = 0.8;
          return _this28;
        }
        var _proto56 = GButton.prototype;
        _proto56.getTextField = function getTextField() {
          if (this._titleObject instanceof GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
        };
        _proto56.fireClick = function fireClick() {
          GRoot.inst.inputProcessor.simulateClick(this);
        };
        _proto56.setState = function setState(val) {
          if (this._buttonController) this._buttonController.selectedPage = val;
          if (this._downEffect == 1) {
            var cnt = this.numChildren;
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
              if (!this._downColor) this._downColor = new Color();
              var r = this._downEffectValue * 255;
              this._downColor.r = this._downColor.g = this._downColor.b = r;
              for (var i = 0; i < cnt; i++) {
                var obj = this.getChildAt(i);
                if (!(obj instanceof GTextField)) obj.setProp(ObjectPropID.Color, this._downColor);
              }
            } else {
              for (var i = 0; i < cnt; i++) {
                var obj = this.getChildAt(i);
                if (!(obj instanceof GTextField)) obj.setProp(ObjectPropID.Color, Color.WHITE);
              }
            }
          } else if (this._downEffect == 2) {
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
              if (!this._downScaled) {
                this._downScaled = true;
                this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
              }
            } else {
              if (this._downScaled) {
                this._downScaled = false;
                this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
              }
            }
          }
        };
        _proto56.setCurrentState = function setCurrentState() {
          if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
            if (this._selected) this.setState(GButton.SELECTED_DISABLED);else this.setState(GButton.DISABLED);
          } else {
            if (this._selected) this.setState(this._over ? GButton.SELECTED_OVER : GButton.DOWN);else this.setState(this._over ? GButton.OVER : GButton.UP);
          }
        };
        _proto56.handleControllerChanged = function handleControllerChanged(c) {
          _GComponent4.prototype.handleControllerChanged.call(this, c);
          if (this._relatedController == c) this.selected = this._relatedPageId == c.selectedPageId;
        };
        _proto56.handleGrayedChanged = function handleGrayedChanged() {
          if (this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
            if (this.grayed) {
              if (this._selected && this._buttonController.hasPage(GButton.SELECTED_DISABLED)) this.setState(GButton.SELECTED_DISABLED);else this.setState(GButton.DISABLED);
            } else if (this._selected) this.setState(GButton.DOWN);else this.setState(GButton.UP);
          } else _GComponent4.prototype.handleGrayedChanged.call(this);
        };
        _proto56.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.titleColor;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) return tf.strokeColor;else return 0;
              }
            case ObjectPropID.FontSize:
              return this.titleFontSize;
            case ObjectPropID.Selected:
              return this.selected;
            default:
              return _GComponent4.prototype.getProp.call(this, index);
          }
        };
        _proto56.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.titleColor = value;
              break;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) tf.strokeColor = value;
              }
              break;
            case ObjectPropID.FontSize:
              this.titleFontSize = value;
              break;
            case ObjectPropID.Selected:
              this.selected = value;
              break;
            default:
              _GComponent4.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto56.constructExtension = function constructExtension(buffer) {
          buffer.seek(0, 6);
          this._mode = buffer.readByte();
          var str = buffer.readS();
          if (str) this._sound = str;
          this._soundVolumeScale = buffer.readFloat();
          this._downEffect = buffer.readByte();
          this._downEffectValue = buffer.readFloat();
          if (this._downEffect == 2) this.setPivot(0.5, 0.5, this.pivotAsAnchor);
          this._buttonController = this.getController("button");
          this._titleObject = this.getChild("title");
          this._iconObject = this.getChild("icon");
          if (this._titleObject) this._title = this._titleObject.text;
          if (this._iconObject) this._icon = this._iconObject.icon;
          if (this._mode == ButtonMode.Common) this.setState(GButton.UP);
          this._node.on(Event.TOUCH_BEGIN, this.onTouchBegin_1, this);
          this._node.on(Event.TOUCH_END, this.onTouchEnd_1, this);
          this._node.on(Event.ROLL_OVER, this.onRollOver_1, this);
          this._node.on(Event.ROLL_OUT, this.onRollOut_1, this);
          this._node.on(Event.CLICK, this.onClick_1, this);
        };
        _proto56.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent4.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!buffer.seek(beginPos, 6)) return;
          if (buffer.readByte() != this.packageItem.objectType) return;
          var str;
          var iv;
          str = buffer.readS();
          if (str != null) this.title = str;
          str = buffer.readS();
          if (str != null) this.selectedTitle = str;
          str = buffer.readS();
          if (str != null) this.icon = str;
          str = buffer.readS();
          if (str != null) this.selectedIcon = str;
          if (buffer.readBool()) this.titleColor = buffer.readColor();
          iv = buffer.readInt();
          if (iv != 0) this.titleFontSize = iv;
          iv = buffer.readShort();
          if (iv >= 0) this._relatedController = this.parent.getControllerAt(iv);
          this._relatedPageId = buffer.readS();
          str = buffer.readS();
          if (str != null) this._sound = str;
          if (buffer.readBool()) this._soundVolumeScale = buffer.readFloat();
          this.selected = buffer.readBool();
        };
        _proto56.onRollOver_1 = function onRollOver_1() {
          if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER)) return;
          this._over = true;
          if (this._down) return;
          if (this.grayed && this._buttonController.hasPage(GButton.DISABLED)) return;
          this.setState(this._selected ? GButton.SELECTED_OVER : GButton.OVER);
        };
        _proto56.onRollOut_1 = function onRollOut_1() {
          if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER)) return;
          this._over = false;
          if (this._down) return;
          if (this.grayed && this._buttonController.hasPage(GButton.DISABLED)) return;
          this.setState(this._selected ? GButton.DOWN : GButton.UP);
        };
        _proto56.onTouchBegin_1 = function onTouchBegin_1(evt) {
          if (evt.button != EventMouse.BUTTON_LEFT) return;
          this._down = true;
          evt.captureTouch();
          if (this._mode == ButtonMode.Common) {
            if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) this.setState(GButton.SELECTED_DISABLED);else this.setState(GButton.DOWN);
          }
          if (this._linkedPopup) {
            if (this._linkedPopup instanceof Window) this._linkedPopup.toggleStatus();else GRoot.inst.togglePopup(this._linkedPopup, this);
          }
        };
        _proto56.onTouchEnd_1 = function onTouchEnd_1(evt) {
          if (evt.button != EventMouse.BUTTON_LEFT) return;
          if (this._down) {
            this._down = false;
            if (this._node == null) return;
            if (this._mode == ButtonMode.Common) {
              if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) this.setState(GButton.DISABLED);else if (this._over) this.setState(GButton.OVER);else this.setState(GButton.UP);
            } else {
              if (!this._over && this._buttonController != null && (this._buttonController.selectedPage == GButton.OVER || this._buttonController.selectedPage == GButton.SELECTED_OVER)) {
                this.setCurrentState();
              }
            }
          }
        };
        _proto56.onClick_1 = function onClick_1() {
          if (this._sound) {
            var pi = UIPackage.getItemByURL(this._sound);
            if (pi) {
              var sound = pi.owner.getItemAsset(pi);
              if (sound) GRoot.inst.playOneShotSound(sound, this._soundVolumeScale);
            }
          }
          if (this._mode == ButtonMode.Check) {
            if (this._changeStateOnClick) {
              this.selected = !this._selected;
              this._node.emit(Event.STATUS_CHANGED, this);
            }
          } else if (this._mode == ButtonMode.Radio) {
            if (this._changeStateOnClick && !this._selected) {
              this.selected = true;
              this._node.emit(Event.STATUS_CHANGED, this);
            }
          } else {
            if (this._relatedController) this._relatedController.selectedPageId = this._relatedPageId;
          }
        };
        _createClass(GButton, [{
          key: "icon",
          get: function get() {
            return this._icon;
          },
          set: function set(value) {
            this._icon = value;
            value = this._selected && this._selectedIcon ? this._selectedIcon : this._icon;
            if (this._iconObject) this._iconObject.icon = value;
            this.updateGear(7);
          }
        }, {
          key: "selectedIcon",
          get: function get() {
            return this._selectedIcon;
          },
          set: function set(value) {
            this._selectedIcon = value;
            value = this._selected && this._selectedIcon ? this._selectedIcon : this._icon;
            if (this._iconObject) this._iconObject.icon = value;
          }
        }, {
          key: "title",
          get: function get() {
            return this._title;
          },
          set: function set(value) {
            this._title = value;
            if (this._titleObject) this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title;
            this.updateGear(6);
          }
        }, {
          key: "text",
          get: function get() {
            return this.title;
          },
          set: function set(value) {
            this.title = value;
          }
        }, {
          key: "selectedTitle",
          get: function get() {
            return this._selectedTitle;
          },
          set: function set(value) {
            this._selectedTitle = value;
            if (this._titleObject) this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title;
          }
        }, {
          key: "titleColor",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.color;else return Color.BLACK;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.color = value;
          }
        }, {
          key: "titleFontSize",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.fontSize;else return 0;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.fontSize = value;
          }
        }, {
          key: "sound",
          get: function get() {
            return this._sound;
          },
          set: function set(val) {
            this._sound = val;
          }
        }, {
          key: "soundVolumeScale",
          get: function get() {
            return this._soundVolumeScale;
          },
          set: function set(value) {
            this._soundVolumeScale = value;
          }
        }, {
          key: "selected",
          get: function get() {
            return this._selected;
          },
          set: function set(val) {
            if (this._mode == ButtonMode.Common) return;
            if (this._selected != val) {
              this._selected = val;
              this.setCurrentState();
              if (this._selectedTitle && this._titleObject) this._titleObject.text = this._selected ? this._selectedTitle : this._title;
              if (this._selectedIcon) {
                var str = this._selected ? this._selectedIcon : this._icon;
                if (this._iconObject) this._iconObject.icon = str;
              }
              if (this._relatedController && this._parent && !this._parent._buildingDisplayList) {
                if (this._selected) {
                  this._relatedController.selectedPageId = this._relatedPageId;
                  if (this._relatedController.autoRadioGroupDepth) this._parent.adjustRadioGroupDepth(this, this._relatedController);
                } else if (this._mode == ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId) this._relatedController.oppositePageId = this._relatedPageId;
              }
            }
          }
        }, {
          key: "mode",
          get: function get() {
            return this._mode;
          },
          set: function set(value) {
            if (this._mode != value) {
              if (value == ButtonMode.Common) this.selected = false;
              this._mode = value;
            }
          }
        }, {
          key: "relatedController",
          get: function get() {
            return this._relatedController;
          },
          set: function set(val) {
            this._relatedController = val;
          }
        }, {
          key: "relatedPageId",
          get: function get() {
            return this._relatedPageId;
          },
          set: function set(val) {
            this._relatedPageId = val;
          }
        }, {
          key: "changeStateOnClick",
          get: function get() {
            return this._changeStateOnClick;
          },
          set: function set(value) {
            this._changeStateOnClick = value;
          }
        }, {
          key: "linkedPopup",
          get: function get() {
            return this._linkedPopup;
          },
          set: function set(value) {
            this._linkedPopup = value;
          }
        }]);
        return GButton;
      }(GComponent));
      GButton.UP = "up";
      GButton.DOWN = "down";
      GButton.OVER = "over";
      GButton.SELECTED_OVER = "selectedOver";
      GButton.DISABLED = "disabled";
      GButton.SELECTED_DISABLED = "selectedDisabled";
      var GList = exports('GList', /*#__PURE__*/function (_GComponent5) {
        _inheritsLoose(GList, _GComponent5);
        function GList() {
          var _this29;
          _this29 = _GComponent5.call(this) || this;
          _this29.scrollItemToViewOnClick = true;
          _this29.foldInvisibleItems = false;
          _this29._lineCount = 0;
          _this29._columnCount = 0;
          _this29._lineGap = 0;
          _this29._columnGap = 0;
          _this29._lastSelectedIndex = 0;
          _this29._numItems = 0;
          _this29._realNumItems = 0;
          _this29._firstIndex = 0; //the top left index
          _this29._curLineItemCount = 0; //item count in one line
          _this29._curLineItemCount2 = 0; //只用在页面模式，表示垂直方向的项目数
          _this29._virtualListChanged = 0; //1-content changed, 2-size changed
          _this29.itemInfoVer = 0; //用来标志item是否在本次处理中已经被重用了
          _this29._node.name = "GList";
          _this29._trackBounds = true;
          _this29._pool = new GObjectPool();
          _this29._layout = ListLayoutType.SingleColumn;
          _this29._autoResizeItem = true;
          _this29._lastSelectedIndex = -1;
          _this29._selectionMode = ListSelectionMode.Single;
          _this29.opaque = true;
          _this29._align = AlignType.Left;
          _this29._verticalAlign = VertAlignType.Top;
          return _this29;
        }
        var _proto57 = GList.prototype;
        _proto57.dispose = function dispose() {
          this._partner.unschedule(this._refreshVirtualList);
          this._pool.clear();
          _GComponent5.prototype.dispose.call(this);
        };
        _proto57.getFromPool = function getFromPool(url) {
          if (!url) url = this._defaultItem;
          var obj = this._pool.getObject(url);
          if (obj) obj.visible = true;
          return obj;
        };
        _proto57.returnToPool = function returnToPool(obj) {
          this._pool.returnObject(obj);
        };
        _proto57.addChildAt = function addChildAt(child, index) {
          _GComponent5.prototype.addChildAt.call(this, child, index);
          if (child instanceof GButton) {
            child.selected = false;
            child.changeStateOnClick = false;
          }
          child.on(Event.CLICK, this.onClickItem, this);
          return child;
        };
        _proto57.addItem = function addItem(url) {
          if (!url) url = this._defaultItem;
          return this.addChild(UIPackage.createObjectFromURL(url));
        };
        _proto57.addItemFromPool = function addItemFromPool(url) {
          return this.addChild(this.getFromPool(url));
        };
        _proto57.removeChildAt = function removeChildAt(index, dispose) {
          var child = _GComponent5.prototype.removeChildAt.call(this, index, dispose);
          if (!dispose) child.off(Event.CLICK, this.onClickItem, this);
          return child;
        };
        _proto57.removeChildToPoolAt = function removeChildToPoolAt(index) {
          var child = _GComponent5.prototype.removeChildAt.call(this, index);
          this.returnToPool(child);
        };
        _proto57.removeChildToPool = function removeChildToPool(child) {
          _GComponent5.prototype.removeChild.call(this, child);
          this.returnToPool(child);
        };
        _proto57.removeChildrenToPool = function removeChildrenToPool(beginIndex, endIndex) {
          if (beginIndex == undefined) beginIndex = 0;
          if (endIndex == undefined) endIndex = -1;
          if (endIndex < 0 || endIndex >= this._children.length) endIndex = this._children.length - 1;
          for (var i = beginIndex; i <= endIndex; ++i) this.removeChildToPoolAt(beginIndex);
        };
        _proto57.getSelection = function getSelection(result) {
          if (!result) result = new Array();
          var i;
          if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
              var ii = this._virtualItems[i];
              if (ii.obj instanceof GButton && ii.obj.selected || !ii.obj && ii.selected) {
                var j = i;
                if (this._loop) {
                  j = i % this._numItems;
                  if (result.indexOf(j) != -1) continue;
                }
                result.push(j);
              }
            }
          } else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
              var obj = this._children[i];
              if (obj instanceof GButton && obj.selected) result.push(i);
            }
          }
          return result;
        };
        _proto57.addSelection = function addSelection(index, scrollItToView) {
          if (this._selectionMode == ListSelectionMode.None) return;
          this.checkVirtualList();
          if (this._selectionMode == ListSelectionMode.Single) this.clearSelection();
          if (scrollItToView) this.scrollToView(index);
          this._lastSelectedIndex = index;
          var obj;
          if (this._virtual) {
            var ii = this._virtualItems[index];
            if (ii.obj) obj = ii.obj;
            ii.selected = true;
          } else obj = this.getChildAt(index);
          if (obj instanceof GButton && !obj.selected) {
            obj.selected = true;
            this.updateSelectionController(index);
          }
        };
        _proto57.removeSelection = function removeSelection(index) {
          if (this._selectionMode == ListSelectionMode.None) return;
          var obj;
          if (this._virtual) {
            var ii = this._virtualItems[index];
            if (ii.obj) obj = ii.obj;
            ii.selected = false;
          } else obj = this.getChildAt(index);
          if (obj instanceof GButton) obj.selected = false;
        };
        _proto57.clearSelection = function clearSelection() {
          var i;
          if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
              var ii = this._virtualItems[i];
              if (ii.obj instanceof GButton) ii.obj.selected = false;
              ii.selected = false;
            }
          } else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
              var obj = this._children[i];
              if (obj instanceof GButton) obj.selected = false;
            }
          }
        };
        _proto57.clearSelectionExcept = function clearSelectionExcept(g) {
          var i;
          if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
              var ii = this._virtualItems[i];
              if (ii.obj != g) {
                if (ii.obj instanceof GButton) ii.obj.selected = false;
                ii.selected = false;
              }
            }
          } else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
              var obj = this._children[i];
              if (obj instanceof GButton && obj != g) obj.selected = false;
            }
          }
        };
        _proto57.selectAll = function selectAll() {
          this.checkVirtualList();
          var last = -1;
          var i;
          if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
              var ii = this._virtualItems[i];
              if (ii.obj instanceof GButton && !ii.obj.selected) {
                ii.obj.selected = true;
                last = i;
              }
              ii.selected = true;
            }
          } else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
              var obj = this._children[i];
              if (obj instanceof GButton && !obj.selected) {
                obj.selected = true;
                last = i;
              }
            }
          }
          if (last != -1) this.updateSelectionController(last);
        };
        _proto57.selectNone = function selectNone() {
          this.clearSelection();
        };
        _proto57.selectReverse = function selectReverse() {
          this.checkVirtualList();
          var last = -1;
          var i;
          if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
              var ii = this._virtualItems[i];
              if (ii.obj instanceof GButton) {
                ii.obj.selected = !ii.obj.selected;
                if (ii.obj.selected) last = i;
              }
              ii.selected = !ii.selected;
            }
          } else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
              var obj = this._children[i];
              if (obj instanceof GButton) {
                obj.selected = !obj.selected;
                if (obj.selected) last = i;
              }
            }
          }
          if (last != -1) this.updateSelectionController(last);
        };
        _proto57.handleArrowKey = function handleArrowKey(dir) {
          var index = this.selectedIndex;
          if (index == -1) return;
          switch (dir) {
            case 1:
              //up
              if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowVertical) {
                index--;
                if (index >= 0) {
                  this.clearSelection();
                  this.addSelection(index, true);
                }
              } else if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                var current = this._children[index];
                var k = 0;
                for (var i = index - 1; i >= 0; i--) {
                  var obj = this._children[i];
                  if (obj.y != current.y) {
                    current = obj;
                    break;
                  }
                  k++;
                }
                for (; i >= 0; i--) {
                  obj = this._children[i];
                  if (obj.y != current.y) {
                    this.clearSelection();
                    this.addSelection(i + k + 1, true);
                    break;
                  }
                }
              }
              break;
            case 3:
              //right
              if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                index++;
                if (index < this._children.length) {
                  this.clearSelection();
                  this.addSelection(index, true);
                }
              } else if (this._layout == ListLayoutType.FlowVertical) {
                current = this._children[index];
                k = 0;
                var cnt = this._children.length;
                for (i = index + 1; i < cnt; i++) {
                  obj = this._children[i];
                  if (obj.x != current.x) {
                    current = obj;
                    break;
                  }
                  k++;
                }
                for (; i < cnt; i++) {
                  obj = this._children[i];
                  if (obj.x != current.x) {
                    this.clearSelection();
                    this.addSelection(i - k - 1, true);
                    break;
                  }
                }
              }
              break;
            case 5:
              //down
              if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowVertical) {
                index++;
                if (index < this._children.length) {
                  this.clearSelection();
                  this.addSelection(index, true);
                }
              } else if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                current = this._children[index];
                k = 0;
                cnt = this._children.length;
                for (i = index + 1; i < cnt; i++) {
                  obj = this._children[i];
                  if (obj.y != current.y) {
                    current = obj;
                    break;
                  }
                  k++;
                }
                for (; i < cnt; i++) {
                  obj = this._children[i];
                  if (obj.y != current.y) {
                    this.clearSelection();
                    this.addSelection(i - k - 1, true);
                    break;
                  }
                }
              }
              break;
            case 7:
              //left
              if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                index--;
                if (index >= 0) {
                  this.clearSelection();
                  this.addSelection(index, true);
                }
              } else if (this._layout == ListLayoutType.FlowVertical) {
                current = this._children[index];
                k = 0;
                for (i = index - 1; i >= 0; i--) {
                  obj = this._children[i];
                  if (obj.x != current.x) {
                    current = obj;
                    break;
                  }
                  k++;
                }
                for (; i >= 0; i--) {
                  obj = this._children[i];
                  if (obj.x != current.x) {
                    this.clearSelection();
                    this.addSelection(i + k + 1, true);
                    break;
                  }
                }
              }
              break;
          }
        };
        _proto57.onClickItem = function onClickItem(evt) {
          if (this._scrollPane && this._scrollPane.isDragged) return;
          var item = GObject.cast(evt.currentTarget);
          this.setSelectionOnEvent(item, evt);
          if (this._scrollPane && this.scrollItemToViewOnClick) this._scrollPane.scrollToView(item, true);
          this.dispatchItemEvent(item, evt);
        };
        _proto57.dispatchItemEvent = function dispatchItemEvent(item, evt) {
          this._node.emit(Event.CLICK_ITEM, item, evt);
        };
        _proto57.setSelectionOnEvent = function setSelectionOnEvent(item, evt) {
          if (!(item instanceof GButton) || this._selectionMode == ListSelectionMode.None) return;
          var dontChangeLastIndex = false;
          var index = this.childIndexToItemIndex(this.getChildIndex(item));
          if (this._selectionMode == ListSelectionMode.Single) {
            if (!item.selected) {
              this.clearSelectionExcept(item);
              item.selected = true;
            }
          } else {
            if (evt.isShiftDown) {
              if (!item.selected) {
                if (this._lastSelectedIndex != -1) {
                  var min = Math.min(this._lastSelectedIndex, index);
                  var max = Math.max(this._lastSelectedIndex, index);
                  max = Math.min(max, this.numItems - 1);
                  var i;
                  if (this._virtual) {
                    for (i = min; i <= max; i++) {
                      var ii = this._virtualItems[i];
                      if (ii.obj instanceof GButton) ii.obj.selected = true;
                      ii.selected = true;
                    }
                  } else {
                    for (i = min; i <= max; i++) {
                      var obj = this.getChildAt(i);
                      if (obj instanceof GButton) obj.selected = true;
                    }
                  }
                  dontChangeLastIndex = true;
                } else {
                  item.selected = true;
                }
              }
            } else if (evt.isCtrlDown || this._selectionMode == ListSelectionMode.Multiple_SingleClick) {
              item.selected = !item.selected;
            } else {
              if (!item.selected) {
                this.clearSelectionExcept(item);
                item.selected = true;
              } else this.clearSelectionExcept(item);
            }
          }
          if (!dontChangeLastIndex) this._lastSelectedIndex = index;
          if (item.selected) this.updateSelectionController(index);
        };
        _proto57.resizeToFit = function resizeToFit(itemCount, minSize) {
          if (itemCount === void 0) {
            itemCount = Number.POSITIVE_INFINITY;
          }
          if (minSize === void 0) {
            minSize = 0;
          }
          this.ensureBoundsCorrect();
          var curCount = this.numItems;
          if (itemCount > curCount) itemCount = curCount;
          if (this._virtual) {
            var lineCount = Math.ceil(itemCount / this._curLineItemCount);
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) this.viewHeight = lineCount * this._itemSize.height + Math.max(0, lineCount - 1) * this._lineGap;else this.viewWidth = lineCount * this._itemSize.width + Math.max(0, lineCount - 1) * this._columnGap;
          } else if (itemCount == 0) {
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) this.viewHeight = minSize;else this.viewWidth = minSize;
          } else {
            var i = itemCount - 1;
            var obj = null;
            while (i >= 0) {
              obj = this.getChildAt(i);
              if (!this.foldInvisibleItems || obj.visible) break;
              i--;
            }
            if (i < 0) {
              if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) this.viewHeight = minSize;else this.viewWidth = minSize;
            } else {
              var size = 0;
              if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                size = obj.y + obj.height;
                if (size < minSize) size = minSize;
                this.viewHeight = size;
              } else {
                size = obj.x + obj.width;
                if (size < minSize) size = minSize;
                this.viewWidth = size;
              }
            }
          }
        };
        _proto57.getMaxItemWidth = function getMaxItemWidth() {
          var cnt = this._children.length;
          var max = 0;
          for (var i = 0; i < cnt; i++) {
            var child = this.getChildAt(i);
            if (child.width > max) max = child.width;
          }
          return max;
        };
        _proto57.handleSizeChanged = function handleSizeChanged() {
          _GComponent5.prototype.handleSizeChanged.call(this);
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        };
        _proto57.handleControllerChanged = function handleControllerChanged(c) {
          _GComponent5.prototype.handleControllerChanged.call(this, c);
          if (this._selectionController == c) this.selectedIndex = c.selectedIndex;
        };
        _proto57.updateSelectionController = function updateSelectionController(index) {
          if (this._selectionController && !this._selectionController.changing && index < this._selectionController.pageCount) {
            var c = this._selectionController;
            this._selectionController = null;
            c.selectedIndex = index;
            this._selectionController = c;
          }
        };
        _proto57.getSnappingPosition = function getSnappingPosition(xValue, yValue, resultPoint) {
          if (this._virtual) {
            resultPoint = resultPoint || new Vec2();
            var saved;
            var index;
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
              saved = yValue;
              s_n = yValue;
              index = this.getIndexOnPos1(false);
              yValue = s_n;
              if (index < this._virtualItems.length && saved - yValue > this._virtualItems[index].height / 2 && index < this._realNumItems) yValue += this._virtualItems[index].height + this._lineGap;
            } else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
              saved = xValue;
              s_n = xValue;
              index = this.getIndexOnPos2(false);
              xValue = s_n;
              if (index < this._virtualItems.length && saved - xValue > this._virtualItems[index].width / 2 && index < this._realNumItems) xValue += this._virtualItems[index].width + this._columnGap;
            } else {
              saved = xValue;
              s_n = xValue;
              index = this.getIndexOnPos3(false);
              xValue = s_n;
              if (index < this._virtualItems.length && saved - xValue > this._virtualItems[index].width / 2 && index < this._realNumItems) xValue += this._virtualItems[index].width + this._columnGap;
            }
            resultPoint.x = xValue;
            resultPoint.y = yValue;
            return resultPoint;
          } else {
            return _GComponent5.prototype.getSnappingPosition.call(this, xValue, yValue, resultPoint);
          }
        };
        _proto57.scrollToView = function scrollToView(index, ani, setFirst) {
          if (this._virtual) {
            if (this._numItems == 0) return;
            this.checkVirtualList();
            if (index >= this._virtualItems.length) throw new Error("Invalid child index: " + index + ">" + this._virtualItems.length);
            if (this._loop) index = Math.floor(this._firstIndex / this._numItems) * this._numItems + index;
            var rect;
            var ii = this._virtualItems[index];
            var pos = 0;
            var i;
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
              for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount) pos += this._virtualItems[i].height + this._lineGap;
              rect = new Rect(0, pos, this._itemSize.width, ii.height);
            } else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
              for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount) pos += this._virtualItems[i].width + this._columnGap;
              rect = new Rect(pos, 0, ii.width, this._itemSize.height);
            } else {
              var page = index / (this._curLineItemCount * this._curLineItemCount2);
              rect = new Rect(page * this.viewWidth + index % this._curLineItemCount * (ii.width + this._columnGap), index / this._curLineItemCount % this._curLineItemCount2 * (ii.height + this._lineGap), ii.width, ii.height);
            }
            if (this._scrollPane) this._scrollPane.scrollToView(rect, ani, setFirst);
          } else {
            var obj = this.getChildAt(index);
            if (obj) {
              if (this._scrollPane) this._scrollPane.scrollToView(obj, ani, setFirst);else if (this.parent && this.parent.scrollPane) this.parent.scrollPane.scrollToView(obj, ani, setFirst);
            }
          }
        };
        _proto57.getFirstChildInView = function getFirstChildInView() {
          return this.childIndexToItemIndex(_GComponent5.prototype.getFirstChildInView.call(this));
        };
        _proto57.childIndexToItemIndex = function childIndexToItemIndex(index) {
          if (!this._virtual) return index;
          if (this._layout == ListLayoutType.Pagination) {
            for (var i = this._firstIndex; i < this._realNumItems; i++) {
              if (this._virtualItems[i].obj) {
                index--;
                if (index < 0) return i;
              }
            }
            return index;
          } else {
            index += this._firstIndex;
            if (this._loop && this._numItems > 0) index = index % this._numItems;
            return index;
          }
        };
        _proto57.itemIndexToChildIndex = function itemIndexToChildIndex(index) {
          if (!this._virtual) return index;
          if (this._layout == ListLayoutType.Pagination) {
            return this.getChildIndex(this._virtualItems[index].obj);
          } else {
            if (this._loop && this._numItems > 0) {
              var j = this._firstIndex % this._numItems;
              if (index >= j) index = index - j;else index = this._numItems - j + index;
            } else index -= this._firstIndex;
            return index;
          }
        };
        _proto57.setVirtual = function setVirtual() {
          this._setVirtual(false);
        } /// <summary>
        /// Set the list to be virtual list, and has loop behavior.
        /// </summary>
        ;
        _proto57.setVirtualAndLoop = function setVirtualAndLoop() {
          this._setVirtual(true);
        } /// <summary>
        /// Set the list to be virtual list.
        /// </summary>
        ;
        _proto57._setVirtual = function _setVirtual(loop) {
          if (!this._virtual) {
            if (!this._scrollPane) throw new Error("Virtual list must be scrollable!");
            if (loop) {
              if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.FlowVertical) throw new Error("Loop list is not supported for FlowHorizontal or FlowVertical layout!");
              this._scrollPane.bouncebackEffect = false;
            }
            this._virtual = true;
            this._loop = loop;
            this._virtualItems = new Array();
            this.removeChildrenToPool();
            if (this._itemSize == null) {
              this._itemSize = new Size(0, 0);
              var obj = this.getFromPool(null);
              if (!obj) {
                throw new Error("Virtual List must have a default list item resource.");
              } else {
                this._itemSize.width = obj.width;
                this._itemSize.height = obj.height;
              }
              this.returnToPool(obj);
            }
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
              this._scrollPane.scrollStep = this._itemSize.height;
              if (this._loop) this._scrollPane._loop = 2;
            } else {
              this._scrollPane.scrollStep = this._itemSize.width;
              if (this._loop) this._scrollPane._loop = 1;
            }
            this._node.on(Event.SCROLL, this.__scrolled, this);
            this.setVirtualListChangedFlag(true);
          }
        } /// <summary>
        /// Set the list item count. 
        /// If the list is not virtual, specified number of items will be created. 
        /// If the list is virtual, only items in view will be created.
        /// </summary>
        ;
        _proto57.refreshVirtualList = function refreshVirtualList() {
          this.setVirtualListChangedFlag(false);
        };
        _proto57.checkVirtualList = function checkVirtualList() {
          if (this._virtualListChanged != 0) {
            this._refreshVirtualList();
            this._partner.unschedule(this._refreshVirtualList);
          }
        };
        _proto57.setVirtualListChangedFlag = function setVirtualListChangedFlag(layoutChanged) {
          if (layoutChanged) this._virtualListChanged = 2;else if (this._virtualListChanged == 0) this._virtualListChanged = 1;
          this._partner.callLater(this._refreshVirtualList);
        };
        _proto57._refreshVirtualList = function _refreshVirtualList(dt) {
          if (!isNaN(dt)) {
            var _t = GObject.cast(this.node);
            _t._refreshVirtualList();
            return;
          }
          var layoutChanged = this._virtualListChanged == 2;
          this._virtualListChanged = 0;
          this._eventLocked = true;
          if (layoutChanged) {
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.SingleRow) this._curLineItemCount = 1;else if (this._layout == ListLayoutType.FlowHorizontal) {
              if (this._columnCount > 0) this._curLineItemCount = this._columnCount;else {
                this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap));
                if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
              }
            } else if (this._layout == ListLayoutType.FlowVertical) {
              if (this._lineCount > 0) this._curLineItemCount = this._lineCount;else {
                this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap));
                if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
              }
            } else
              //pagination
              {
                if (this._columnCount > 0) this._curLineItemCount = this._columnCount;else {
                  this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap));
                  if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
                }
                if (this._lineCount > 0) this._curLineItemCount2 = this._lineCount;else {
                  this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap));
                  if (this._curLineItemCount2 <= 0) this._curLineItemCount2 = 1;
                }
              }
          }
          var ch = 0,
            cw = 0;
          if (this._realNumItems > 0) {
            var i;
            var len = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount;
            var len2 = Math.min(this._curLineItemCount, this._realNumItems);
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
              for (i = 0; i < len; i += this._curLineItemCount) ch += this._virtualItems[i].height + this._lineGap;
              if (ch > 0) ch -= this._lineGap;
              if (this._autoResizeItem) cw = this._scrollPane.viewWidth;else {
                for (i = 0; i < len2; i++) cw += this._virtualItems[i].width + this._columnGap;
                if (cw > 0) cw -= this._columnGap;
              }
            } else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
              for (i = 0; i < len; i += this._curLineItemCount) cw += this._virtualItems[i].width + this._columnGap;
              if (cw > 0) cw -= this._columnGap;
              if (this._autoResizeItem) ch = this._scrollPane.viewHeight;else {
                for (i = 0; i < len2; i++) ch += this._virtualItems[i].height + this._lineGap;
                if (ch > 0) ch -= this._lineGap;
              }
            } else {
              var pageCount = Math.ceil(len / (this._curLineItemCount * this._curLineItemCount2));
              cw = pageCount * this.viewWidth;
              ch = this.viewHeight;
            }
          }
          this.handleAlign(cw, ch);
          this._scrollPane.setContentSize(cw, ch);
          this._eventLocked = false;
          this.handleScroll(true);
        };
        _proto57.__scrolled = function __scrolled(evt) {
          this.handleScroll(false);
        };
        _proto57.getIndexOnPos1 = function getIndexOnPos1(forceUpdate) {
          if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
          }
          var i;
          var pos2;
          var pos3;
          if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).y;
            if (pos2 > s_n) {
              for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                pos2 -= this._virtualItems[i].height + this._lineGap;
                if (pos2 <= s_n) {
                  s_n = pos2;
                  return i;
                }
              }
              s_n = 0;
              return 0;
            } else {
              for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
                if (pos3 > s_n) {
                  s_n = pos2;
                  return i;
                }
                pos2 = pos3;
              }
              s_n = pos2;
              return this._realNumItems - this._curLineItemCount;
            }
          } else {
            pos2 = 0;
            for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
              pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
              if (pos3 > s_n) {
                s_n = pos2;
                return i;
              }
              pos2 = pos3;
            }
            s_n = pos2;
            return this._realNumItems - this._curLineItemCount;
          }
        };
        _proto57.getIndexOnPos2 = function getIndexOnPos2(forceUpdate) {
          if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
          }
          var i;
          var pos2;
          var pos3;
          if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).x;
            if (pos2 > s_n) {
              for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                pos2 -= this._virtualItems[i].width + this._columnGap;
                if (pos2 <= s_n) {
                  s_n = pos2;
                  return i;
                }
              }
              s_n = 0;
              return 0;
            } else {
              for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
                if (pos3 > s_n) {
                  s_n = pos2;
                  return i;
                }
                pos2 = pos3;
              }
              s_n = pos2;
              return this._realNumItems - this._curLineItemCount;
            }
          } else {
            pos2 = 0;
            for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
              pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
              if (pos3 > s_n) {
                s_n = pos2;
                return i;
              }
              pos2 = pos3;
            }
            s_n = pos2;
            return this._realNumItems - this._curLineItemCount;
          }
        };
        _proto57.getIndexOnPos3 = function getIndexOnPos3(forceUpdate) {
          if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
          }
          var viewWidth = this.viewWidth;
          var page = Math.floor(s_n / viewWidth);
          var startIndex = page * (this._curLineItemCount * this._curLineItemCount2);
          var pos2 = page * viewWidth;
          var i;
          var pos3;
          for (i = 0; i < this._curLineItemCount; i++) {
            pos3 = pos2 + this._virtualItems[startIndex + i].width + this._columnGap;
            if (pos3 > s_n) {
              s_n = pos2;
              return startIndex + i;
            }
            pos2 = pos3;
          }
          s_n = pos2;
          return startIndex + this._curLineItemCount - 1;
        };
        _proto57.handleScroll = function handleScroll(forceUpdate) {
          if (this._eventLocked) return;
          if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
            var enterCounter = 0;
            while (this.handleScroll1(forceUpdate)) {
              enterCounter++;
              forceUpdate = false;
              if (enterCounter > 20) {
                console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
                break;
              }
            }
            this.handleArchOrder1();
          } else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
            enterCounter = 0;
            while (this.handleScroll2(forceUpdate)) {
              enterCounter++;
              forceUpdate = false;
              if (enterCounter > 20) {
                console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
                break;
              }
            }
            this.handleArchOrder2();
          } else {
            this.handleScroll3(forceUpdate);
          }
          this._boundsChanged = false;
        };
        _proto57.handleScroll1 = function handleScroll1(forceUpdate) {
          var pos = this._scrollPane.scrollingPosY;
          var max = pos + this._scrollPane.viewHeight;
          var end = max == this._scrollPane.contentHeight; //这个标志表示当前需要滚动到最末，无论内容变化大小
          //寻找当前位置的第一条项目
          s_n = pos;
          var newFirstIndex = this.getIndexOnPos1(forceUpdate);
          pos = s_n;
          if (newFirstIndex == this._firstIndex && !forceUpdate) {
            return false;
          }
          var oldFirstIndex = this._firstIndex;
          this._firstIndex = newFirstIndex;
          var curIndex = newFirstIndex;
          var forward = oldFirstIndex > newFirstIndex;
          var childCount = this.numChildren;
          var lastIndex = oldFirstIndex + childCount - 1;
          var reuseIndex = forward ? lastIndex : oldFirstIndex;
          var curX = 0,
            curY = pos;
          var needRender;
          var deltaSize = 0;
          var firstItemDeltaSize = 0;
          var url = this._defaultItem;
          var ii, ii2;
          var i, j;
          var partSize = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
          this.itemInfoVer++;
          while (curIndex < this._realNumItems && (end || curY < max)) {
            ii = this._virtualItems[curIndex];
            if (!ii.obj || forceUpdate) {
              if (this.itemProvider != null) {
                url = this.itemProvider(curIndex % this._numItems);
                if (url == null) url = this._defaultItem;
                url = UIPackage.normalizeURL(url);
              }
              if (ii.obj && ii.obj.resourceURL != url) {
                if (ii.obj instanceof GButton) ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
              }
            }
            if (!ii.obj) {
              //搜索最适合的重用item，保证每次刷新需要新建或者重新render的item最少
              if (forward) {
                for (j = reuseIndex; j >= oldFirstIndex; j--) {
                  ii2 = this._virtualItems[j];
                  if (ii2.obj && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                    if (ii2.obj instanceof GButton) ii2.selected = ii2.obj.selected;
                    ii.obj = ii2.obj;
                    ii2.obj = null;
                    if (j == reuseIndex) reuseIndex--;
                    break;
                  }
                }
              } else {
                for (j = reuseIndex; j <= lastIndex; j++) {
                  ii2 = this._virtualItems[j];
                  if (ii2.obj && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                    if (ii2.obj instanceof GButton) ii2.selected = ii2.obj.selected;
                    ii.obj = ii2.obj;
                    ii2.obj = null;
                    if (j == reuseIndex) reuseIndex++;
                    break;
                  }
                }
              }
              if (ii.obj) {
                this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
              } else {
                ii.obj = this._pool.getObject(url);
                if (forward) this.addChildAt(ii.obj, curIndex - newFirstIndex);else this.addChild(ii.obj);
              }
              if (ii.obj instanceof GButton) ii.obj.selected = ii.selected;
              needRender = true;
            } else needRender = forceUpdate;
            if (needRender) {
              if (this._autoResizeItem && (this._layout == ListLayoutType.SingleColumn || this._columnCount > 0)) ii.obj.setSize(partSize, ii.obj.height, true);
              this.itemRenderer(curIndex % this._numItems, ii.obj);
              if (curIndex % this._curLineItemCount == 0) {
                deltaSize += Math.ceil(ii.obj.height) - ii.height;
                if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                  //当内容向下滚动时，如果新出现的项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                  firstItemDeltaSize = Math.ceil(ii.obj.height) - ii.height;
                }
              }
              ii.width = Math.ceil(ii.obj.width);
              ii.height = Math.ceil(ii.obj.height);
            }
            ii.updateFlag = this.itemInfoVer;
            ii.obj.setPosition(curX, curY);
            if (curIndex == newFirstIndex)
              //要显示多一条才不会穿帮
              max += ii.height;
            curX += ii.width + this._columnGap;
            if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
              curX = 0;
              curY += ii.height + this._lineGap;
            }
            curIndex++;
          }
          for (i = 0; i < childCount; i++) {
            ii = this._virtualItems[oldFirstIndex + i];
            if (ii.updateFlag != this.itemInfoVer && ii.obj) {
              if (ii.obj instanceof GButton) ii.selected = ii.obj.selected;
              this.removeChildToPool(ii.obj);
              ii.obj = null;
            }
          }
          childCount = this._children.length;
          for (i = 0; i < childCount; i++) {
            var obj = this._virtualItems[newFirstIndex + i].obj;
            if (this._children[i] != obj) this.setChildIndex(obj, i);
          }
          if (deltaSize != 0 || firstItemDeltaSize != 0) this._scrollPane.changeContentSizeOnScrolling(0, deltaSize, 0, firstItemDeltaSize);
          if (curIndex > 0 && this.numChildren > 0 && this._container.position.y <= 0 && this.getChildAt(0).y > -this._container.position.y)
            //最后一页没填满！
            return true;else return false;
        };
        _proto57.handleScroll2 = function handleScroll2(forceUpdate) {
          var pos = this._scrollPane.scrollingPosX;
          var max = pos + this._scrollPane.viewWidth;
          var end = pos == this._scrollPane.contentWidth; //这个标志表示当前需要滚动到最末，无论内容变化大小
          //寻找当前位置的第一条项目
          s_n = pos;
          var newFirstIndex = this.getIndexOnPos2(forceUpdate);
          pos = s_n;
          if (newFirstIndex == this._firstIndex && !forceUpdate) {
            return false;
          }
          var oldFirstIndex = this._firstIndex;
          this._firstIndex = newFirstIndex;
          var curIndex = newFirstIndex;
          var forward = oldFirstIndex > newFirstIndex;
          var childCount = this.numChildren;
          var lastIndex = oldFirstIndex + childCount - 1;
          var reuseIndex = forward ? lastIndex : oldFirstIndex;
          var curX = pos,
            curY = 0;
          var needRender;
          var deltaSize = 0;
          var firstItemDeltaSize = 0;
          var url = this._defaultItem;
          var ii, ii2;
          var i, j;
          var partSize = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
          this.itemInfoVer++;
          while (curIndex < this._realNumItems && (end || curX < max)) {
            ii = this._virtualItems[curIndex];
            if (!ii.obj || forceUpdate) {
              if (this.itemProvider != null) {
                url = this.itemProvider(curIndex % this._numItems);
                if (url == null) url = this._defaultItem;
                url = UIPackage.normalizeURL(url);
              }
              if (ii.obj && ii.obj.resourceURL != url) {
                if (ii.obj instanceof GButton) ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
              }
            }
            if (!ii.obj) {
              if (forward) {
                for (j = reuseIndex; j >= oldFirstIndex; j--) {
                  ii2 = this._virtualItems[j];
                  if (ii2.obj && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                    if (ii2.obj instanceof GButton) ii2.selected = ii2.obj.selected;
                    ii.obj = ii2.obj;
                    ii2.obj = null;
                    if (j == reuseIndex) reuseIndex--;
                    break;
                  }
                }
              } else {
                for (j = reuseIndex; j <= lastIndex; j++) {
                  ii2 = this._virtualItems[j];
                  if (ii2.obj && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                    if (ii2.obj instanceof GButton) ii2.selected = ii2.obj.selected;
                    ii.obj = ii2.obj;
                    ii2.obj = null;
                    if (j == reuseIndex) reuseIndex++;
                    break;
                  }
                }
              }
              if (ii.obj) {
                this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
              } else {
                ii.obj = this._pool.getObject(url);
                if (forward) this.addChildAt(ii.obj, curIndex - newFirstIndex);else this.addChild(ii.obj);
              }
              if (ii.obj instanceof GButton) ii.obj.selected = ii.selected;
              needRender = true;
            } else needRender = forceUpdate;
            if (needRender) {
              if (this._autoResizeItem && (this._layout == ListLayoutType.SingleRow || this._lineCount > 0)) ii.obj.setSize(ii.obj.width, partSize, true);
              this.itemRenderer(curIndex % this._numItems, ii.obj);
              if (curIndex % this._curLineItemCount == 0) {
                deltaSize += Math.ceil(ii.obj.width) - ii.width;
                if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                  //当内容向下滚动时，如果新出现的一个项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                  firstItemDeltaSize = Math.ceil(ii.obj.width) - ii.width;
                }
              }
              ii.width = Math.ceil(ii.obj.width);
              ii.height = Math.ceil(ii.obj.height);
            }
            ii.updateFlag = this.itemInfoVer;
            ii.obj.setPosition(curX, curY);
            if (curIndex == newFirstIndex)
              //要显示多一条才不会穿帮
              max += ii.width;
            curY += ii.height + this._lineGap;
            if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
              curY = 0;
              curX += ii.width + this._columnGap;
            }
            curIndex++;
          }
          for (i = 0; i < childCount; i++) {
            ii = this._virtualItems[oldFirstIndex + i];
            if (ii.updateFlag != this.itemInfoVer && ii.obj) {
              if (ii.obj instanceof GButton) ii.selected = ii.obj.selected;
              this.removeChildToPool(ii.obj);
              ii.obj = null;
            }
          }
          childCount = this._children.length;
          for (i = 0; i < childCount; i++) {
            var obj = this._virtualItems[newFirstIndex + i].obj;
            if (this._children[i] != obj) this.setChildIndex(obj, i);
          }
          if (deltaSize != 0 || firstItemDeltaSize != 0) this._scrollPane.changeContentSizeOnScrolling(deltaSize, 0, firstItemDeltaSize, 0);
          if (curIndex > 0 && this.numChildren > 0 && this._container.position.x <= 0 && this.getChildAt(0).x > -this._container.position.x)
            //最后一页没填满！
            return true;else return false;
        };
        _proto57.handleScroll3 = function handleScroll3(forceUpdate) {
          var pos = this._scrollPane.scrollingPosX; //寻找当前位置的第一条项目
          s_n = pos;
          var newFirstIndex = this.getIndexOnPos3(forceUpdate);
          pos = s_n;
          if (newFirstIndex == this._firstIndex && !forceUpdate) return;
          var oldFirstIndex = this._firstIndex;
          this._firstIndex = newFirstIndex; //分页模式不支持不等高，所以渲染满一页就好了
          var reuseIndex = oldFirstIndex;
          var virtualItemCount = this._virtualItems.length;
          var pageSize = this._curLineItemCount * this._curLineItemCount2;
          var startCol = newFirstIndex % this._curLineItemCount;
          var viewWidth = this.viewWidth;
          var page = Math.floor(newFirstIndex / pageSize);
          var startIndex = page * pageSize;
          var lastIndex = startIndex + pageSize * 2; //测试两页
          var needRender;
          var i;
          var ii, ii2;
          var col;
          var url = this._defaultItem;
          var partWidth = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
          var partHeight = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
          this.itemInfoVer++; //先标记这次要用到的项目
          for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems) continue;
            col = i % this._curLineItemCount;
            if (i - startIndex < pageSize) {
              if (col < startCol) continue;
            } else {
              if (col > startCol) continue;
            }
            ii = this._virtualItems[i];
            ii.updateFlag = this.itemInfoVer;
          }
          var lastObj = null;
          var insertIndex = 0;
          for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems) continue;
            ii = this._virtualItems[i];
            if (ii.updateFlag != this.itemInfoVer) continue;
            if (!ii.obj) {
              //寻找看有没有可重用的
              while (reuseIndex < virtualItemCount) {
                ii2 = this._virtualItems[reuseIndex];
                if (ii2.obj && ii2.updateFlag != this.itemInfoVer) {
                  if (ii2.obj instanceof GButton) ii2.selected = ii2.obj.selected;
                  ii.obj = ii2.obj;
                  ii2.obj = null;
                  break;
                }
                reuseIndex++;
              }
              if (insertIndex == -1) insertIndex = this.getChildIndex(lastObj) + 1;
              if (!ii.obj) {
                if (this.itemProvider != null) {
                  url = this.itemProvider(i % this._numItems);
                  if (url == null) url = this._defaultItem;
                  url = UIPackage.normalizeURL(url);
                }
                ii.obj = this._pool.getObject(url);
                this.addChildAt(ii.obj, insertIndex);
              } else {
                insertIndex = this.setChildIndexBefore(ii.obj, insertIndex);
              }
              insertIndex++;
              if (ii.obj instanceof GButton) ii.obj.selected = ii.selected;
              needRender = true;
            } else {
              needRender = forceUpdate;
              insertIndex = -1;
              lastObj = ii.obj;
            }
            if (needRender) {
              if (this._autoResizeItem) {
                if (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount) ii.obj.setSize(partWidth, partHeight, true);else if (this._curLineItemCount == this._columnCount) ii.obj.setSize(partWidth, ii.obj.height, true);else if (this._curLineItemCount2 == this._lineCount) ii.obj.setSize(ii.obj.width, partHeight, true);
              }
              this.itemRenderer(i % this._numItems, ii.obj);
              ii.width = Math.ceil(ii.obj.width);
              ii.height = Math.ceil(ii.obj.height);
            }
          } //排列item
          var borderX = startIndex / pageSize * viewWidth;
          var xx = borderX;
          var yy = 0;
          var lineHeight = 0;
          for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems) continue;
            ii = this._virtualItems[i];
            if (ii.updateFlag == this.itemInfoVer) ii.obj.setPosition(xx, yy);
            if (ii.height > lineHeight) lineHeight = ii.height;
            if (i % this._curLineItemCount == this._curLineItemCount - 1) {
              xx = borderX;
              yy += lineHeight + this._lineGap;
              lineHeight = 0;
              if (i == startIndex + pageSize - 1) {
                borderX += viewWidth;
                xx = borderX;
                yy = 0;
              }
            } else xx += ii.width + this._columnGap;
          } //释放未使用的
          for (i = reuseIndex; i < virtualItemCount; i++) {
            ii = this._virtualItems[i];
            if (ii.updateFlag != this.itemInfoVer && ii.obj) {
              if (ii.obj instanceof GButton) ii.selected = ii.obj.selected;
              this.removeChildToPool(ii.obj);
              ii.obj = null;
            }
          }
        };
        _proto57.handleArchOrder1 = function handleArchOrder1() {
          if (this._childrenRenderOrder == ChildrenRenderOrder.Arch) {
            var mid = this._scrollPane.posY + this.viewHeight / 2;
            var minDist = Number.POSITIVE_INFINITY;
            var dist = 0;
            var apexIndex = 0;
            var cnt = this.numChildren;
            for (var i = 0; i < cnt; i++) {
              var obj = this.getChildAt(i);
              if (!this.foldInvisibleItems || obj.visible) {
                dist = Math.abs(mid - obj.y - obj.height / 2);
                if (dist < minDist) {
                  minDist = dist;
                  apexIndex = i;
                }
              }
            }
            this.apexIndex = apexIndex;
          }
        };
        _proto57.handleArchOrder2 = function handleArchOrder2() {
          if (this._childrenRenderOrder == ChildrenRenderOrder.Arch) {
            var mid = this._scrollPane.posX + this.viewWidth / 2;
            var minDist = Number.POSITIVE_INFINITY;
            var dist = 0;
            var apexIndex = 0;
            var cnt = this.numChildren;
            for (var i = 0; i < cnt; i++) {
              var obj = this.getChildAt(i);
              if (!this.foldInvisibleItems || obj.visible) {
                dist = Math.abs(mid - obj.x - obj.width / 2);
                if (dist < minDist) {
                  minDist = dist;
                  apexIndex = i;
                }
              }
            }
            this.apexIndex = apexIndex;
          }
        };
        _proto57.handleAlign = function handleAlign(contentWidth, contentHeight) {
          var newOffsetX = 0;
          var newOffsetY = 0;
          if (contentHeight < this.viewHeight) {
            if (this._verticalAlign == VertAlignType.Middle) newOffsetY = Math.floor((this.viewHeight - contentHeight) / 2);else if (this._verticalAlign == VertAlignType.Bottom) newOffsetY = this.viewHeight - contentHeight;
          }
          if (contentWidth < this.viewWidth) {
            if (this._align == AlignType.Center) newOffsetX = Math.floor((this.viewWidth - contentWidth) / 2);else if (this._align == AlignType.Right) newOffsetX = this.viewWidth - contentWidth;
          }
          if (newOffsetX != this._alignOffset.x || newOffsetY != this._alignOffset.y) {
            this._alignOffset.x = newOffsetX;
            this._alignOffset.y = newOffsetY;
            if (this._scrollPane) this._scrollPane.adjustMaskContainer();else this._container.setPosition(this._pivotCorrectX + this._alignOffset.x, this._pivotCorrectY - this._alignOffset.y);
          }
        };
        _proto57.updateBounds = function updateBounds() {
          if (this._virtual) return;
          var i;
          var child;
          var curX = 0;
          var curY = 0;
          var maxWidth = 0;
          var maxHeight = 0;
          var cw = 0,
            ch = 0;
          var j = 0;
          var page = 0;
          var k = 0;
          var cnt = this._children.length;
          var viewWidth = this.viewWidth;
          var viewHeight = this.viewHeight;
          var lineSize = 0;
          var lineStart = 0;
          var ratio = 0;
          if (this._layout == ListLayoutType.SingleColumn) {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              if (curY != 0) curY += this._lineGap;
              child.y = curY;
              if (this._autoResizeItem) child.setSize(viewWidth, child.height, true);
              curY += Math.ceil(child.height);
              if (child.width > maxWidth) maxWidth = child.width;
            }
            ch = curY;
            if (ch <= viewHeight && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.vtScrollBar) {
              viewWidth += this._scrollPane.vtScrollBar.width;
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                child.setSize(viewWidth, child.height, true);
                if (child.width > maxWidth) maxWidth = child.width;
              }
            }
            cw = Math.ceil(maxWidth);
          } else if (this._layout == ListLayoutType.SingleRow) {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              if (curX != 0) curX += this._columnGap;
              child.x = curX;
              if (this._autoResizeItem) child.setSize(child.width, viewHeight, true);
              curX += Math.ceil(child.width);
              if (child.height > maxHeight) maxHeight = child.height;
            }
            cw = curX;
            if (cw <= viewWidth && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.hzScrollBar) {
              viewHeight += this._scrollPane.hzScrollBar.height;
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                child.setSize(child.width, viewHeight, true);
                if (child.height > maxHeight) maxHeight = child.height;
              }
            }
            ch = Math.ceil(maxHeight);
          } else if (this._layout == ListLayoutType.FlowHorizontal) {
            if (this._autoResizeItem && this._columnCount > 0) {
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                lineSize += child.sourceWidth;
                j++;
                if (j == this._columnCount || i == cnt - 1) {
                  ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                  curX = 0;
                  for (j = lineStart; j <= i; j++) {
                    child = this.getChildAt(j);
                    if (this.foldInvisibleItems && !child.visible) continue;
                    child.setPosition(curX, curY);
                    if (j < i) {
                      child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), child.height, true);
                      curX += Math.ceil(child.width) + this._columnGap;
                    } else {
                      child.setSize(viewWidth - curX, child.height, true);
                    }
                    if (child.height > maxHeight) maxHeight = child.height;
                  } //new line
                  curY += Math.ceil(maxHeight) + this._lineGap;
                  maxHeight = 0;
                  j = 0;
                  lineStart = i + 1;
                  lineSize = 0;
                }
              }
              ch = curY + Math.ceil(maxHeight);
              cw = viewWidth;
            } else {
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                if (curX != 0) curX += this._columnGap;
                if (this._columnCount != 0 && j >= this._columnCount || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                  //new line
                  curX = 0;
                  curY += Math.ceil(maxHeight) + this._lineGap;
                  maxHeight = 0;
                  j = 0;
                }
                child.setPosition(curX, curY);
                curX += Math.ceil(child.width);
                if (curX > maxWidth) maxWidth = curX;
                if (child.height > maxHeight) maxHeight = child.height;
                j++;
              }
              ch = curY + Math.ceil(maxHeight);
              cw = Math.ceil(maxWidth);
            }
          } else if (this._layout == ListLayoutType.FlowVertical) {
            if (this._autoResizeItem && this._lineCount > 0) {
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                lineSize += child.sourceHeight;
                j++;
                if (j == this._lineCount || i == cnt - 1) {
                  ratio = (viewHeight - lineSize - (j - 1) * this._lineGap) / lineSize;
                  curY = 0;
                  for (j = lineStart; j <= i; j++) {
                    child = this.getChildAt(j);
                    if (this.foldInvisibleItems && !child.visible) continue;
                    child.setPosition(curX, curY);
                    if (j < i) {
                      child.setSize(child.width, child.sourceHeight + Math.round(child.sourceHeight * ratio), true);
                      curY += Math.ceil(child.height) + this._lineGap;
                    } else {
                      child.setSize(child.width, viewHeight - curY, true);
                    }
                    if (child.width > maxWidth) maxWidth = child.width;
                  } //new line
                  curX += Math.ceil(maxWidth) + this._columnGap;
                  maxWidth = 0;
                  j = 0;
                  lineStart = i + 1;
                  lineSize = 0;
                }
              }
              cw = curX + Math.ceil(maxWidth);
              ch = viewHeight;
            } else {
              for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible) continue;
                if (curY != 0) curY += this._lineGap;
                if (this._lineCount != 0 && j >= this._lineCount || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                  curY = 0;
                  curX += Math.ceil(maxWidth) + this._columnGap;
                  maxWidth = 0;
                  j = 0;
                }
                child.setPosition(curX, curY);
                curY += Math.ceil(child.height);
                if (curY > maxHeight) maxHeight = curY;
                if (child.width > maxWidth) maxWidth = child.width;
                j++;
              }
              cw = curX + Math.ceil(maxWidth);
              ch = Math.ceil(maxHeight);
            }
          } else
            //pagination
            {
              var eachHeight;
              if (this._autoResizeItem && this._lineCount > 0) eachHeight = Math.floor((viewHeight - (this._lineCount - 1) * this._lineGap) / this._lineCount);
              if (this._autoResizeItem && this._columnCount > 0) {
                for (i = 0; i < cnt; i++) {
                  child = this.getChildAt(i);
                  if (this.foldInvisibleItems && !child.visible) continue;
                  if (j == 0 && (this._lineCount != 0 && k >= this._lineCount || this._lineCount == 0 && curY + (this._lineCount > 0 ? eachHeight : child.height) > viewHeight)) {
                    //new page
                    page++;
                    curY = 0;
                    k = 0;
                  }
                  lineSize += child.sourceWidth;
                  j++;
                  if (j == this._columnCount || i == cnt - 1) {
                    ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                    curX = 0;
                    for (j = lineStart; j <= i; j++) {
                      child = this.getChildAt(j);
                      if (this.foldInvisibleItems && !child.visible) continue;
                      child.setPosition(page * viewWidth + curX, curY);
                      if (j < i) {
                        child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), this._lineCount > 0 ? eachHeight : child.height, true);
                        curX += Math.ceil(child.width) + this._columnGap;
                      } else {
                        child.setSize(viewWidth - curX, this._lineCount > 0 ? eachHeight : child.height, true);
                      }
                      if (child.height > maxHeight) maxHeight = child.height;
                    } //new line
                    curY += Math.ceil(maxHeight) + this._lineGap;
                    maxHeight = 0;
                    j = 0;
                    lineStart = i + 1;
                    lineSize = 0;
                    k++;
                  }
                }
              } else {
                for (i = 0; i < cnt; i++) {
                  child = this.getChildAt(i);
                  if (this.foldInvisibleItems && !child.visible) continue;
                  if (curX != 0) curX += this._columnGap;
                  if (this._autoResizeItem && this._lineCount > 0) child.setSize(child.width, eachHeight, true);
                  if (this._columnCount != 0 && j >= this._columnCount || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                    //new line
                    curX = 0;
                    curY += Math.ceil(maxHeight) + this._lineGap;
                    maxHeight = 0;
                    j = 0;
                    k++;
                    if (this._lineCount != 0 && k >= this._lineCount || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0)
                      //new page
                      {
                        page++;
                        curY = 0;
                        k = 0;
                      }
                  }
                  child.setPosition(page * viewWidth + curX, curY);
                  curX += Math.ceil(child.width);
                  if (curX > maxWidth) maxWidth = curX;
                  if (child.height > maxHeight) maxHeight = child.height;
                  j++;
                }
              }
              ch = page > 0 ? viewHeight : curY + Math.ceil(maxHeight);
              cw = (page + 1) * viewWidth;
            }
          this.handleAlign(cw, ch);
          this.setBounds(0, 0, cw, ch);
        };
        _proto57.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GComponent5.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 5);
          this._layout = buffer.readByte();
          this._selectionMode = buffer.readByte();
          this._align = buffer.readByte();
          this._verticalAlign = buffer.readByte();
          this._lineGap = buffer.readShort();
          this._columnGap = buffer.readShort();
          this._lineCount = buffer.readShort();
          this._columnCount = buffer.readShort();
          this._autoResizeItem = buffer.readBool();
          this._childrenRenderOrder = buffer.readByte();
          this._apexIndex = buffer.readShort();
          if (buffer.readBool()) {
            this._margin.top = buffer.readInt();
            this._margin.bottom = buffer.readInt();
            this._margin.left = buffer.readInt();
            this._margin.right = buffer.readInt();
          }
          var overflow = buffer.readByte();
          if (overflow == OverflowType.Scroll) {
            var savedPos = buffer.position;
            buffer.seek(beginPos, 7);
            this.setupScroll(buffer);
            buffer.position = savedPos;
          } else this.setupOverflow(overflow);
          if (overflow != OverflowType.Visible) {
            // 防止被剪切 并渲染list之前的内容
            this.node["sortRoot"] = true;
            this._container["sortRoot"] = true;
          }
          if (buffer.readBool())
            //clipSoftness
            buffer.skip(8);
          if (buffer.version >= 2) {
            this.scrollItemToViewOnClick = buffer.readBool();
            this.foldInvisibleItems = buffer.readBool();
          }
          buffer.seek(beginPos, 8);
          this._defaultItem = buffer.readS();
          this.readItems(buffer);
        };
        _proto57.readItems = function readItems(buffer) {
          var cnt;
          var i;
          var nextPos;
          var str;
          cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            str = buffer.readS();
            if (str == null) {
              str = this._defaultItem;
              if (!str) {
                buffer.position = nextPos;
                continue;
              }
            }
            var obj = this.getFromPool(str);
            if (obj) {
              this.addChild(obj);
              this.setupItem(buffer, obj);
            }
            buffer.position = nextPos;
          }
        };
        _proto57.setupItem = function setupItem(buffer, obj) {
          var str;
          str = buffer.readS();
          if (str != null) obj.text = str;
          str = buffer.readS();
          if (str != null && obj instanceof GButton) obj.selectedTitle = str;
          str = buffer.readS();
          if (str != null) obj.icon = str;
          str = buffer.readS();
          if (str != null && obj instanceof GButton) obj.selectedIcon = str;
          str = buffer.readS();
          if (str != null) obj.name = str;
          var cnt;
          var i;
          if (obj instanceof GComponent) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
              var cc = obj.getController(buffer.readS());
              str = buffer.readS();
              if (cc) cc.selectedPageId = str;
            }
            if (buffer.version >= 2) {
              cnt = buffer.readShort();
              for (i = 0; i < cnt; i++) {
                var target = buffer.readS();
                var propertyId = buffer.readShort();
                var value = buffer.readS();
                var obj2 = obj.getChildByPath(target);
                if (obj2) obj2.setProp(propertyId, value);
              }
            }
          }
        };
        _proto57.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent5.prototype.setup_afterAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 6);
          var i = buffer.readShort();
          if (i != -1) this._selectionController = this.parent.getControllerAt(i);
        };
        _createClass(GList, [{
          key: "layout",
          get: function get() {
            return this._layout;
          },
          set: function set(value) {
            if (this._layout != value) {
              this._layout = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "lineCount",
          get: function get() {
            return this._lineCount;
          },
          set: function set(value) {
            if (this._lineCount != value) {
              this._lineCount = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "columnCount",
          get: function get() {
            return this._columnCount;
          },
          set: function set(value) {
            if (this._columnCount != value) {
              this._columnCount = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "lineGap",
          get: function get() {
            return this._lineGap;
          },
          set: function set(value) {
            if (this._lineGap != value) {
              this._lineGap = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "columnGap",
          get: function get() {
            return this._columnGap;
          },
          set: function set(value) {
            if (this._columnGap != value) {
              this._columnGap = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "align",
          get: function get() {
            return this._align;
          },
          set: function set(value) {
            if (this._align != value) {
              this._align = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "verticalAlign",
          get: function get() {
            return this._verticalAlign;
          },
          set: function set(value) {
            if (this._verticalAlign != value) {
              this._verticalAlign = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "virtualItemSize",
          get: function get() {
            return this._itemSize;
          },
          set: function set(value) {
            if (this._virtual) {
              if (this._itemSize == null) this._itemSize = new Size(0, 0);
              this._itemSize.width = value.width;
              this._itemSize.height = value.height;
              this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "defaultItem",
          get: function get() {
            return this._defaultItem;
          },
          set: function set(val) {
            this._defaultItem = UIPackage.normalizeURL(val);
          }
        }, {
          key: "autoResizeItem",
          get: function get() {
            return this._autoResizeItem;
          },
          set: function set(value) {
            if (this._autoResizeItem != value) {
              this._autoResizeItem = value;
              this.setBoundsChangedFlag();
              if (this._virtual) this.setVirtualListChangedFlag(true);
            }
          }
        }, {
          key: "selectionMode",
          get: function get() {
            return this._selectionMode;
          },
          set: function set(value) {
            this._selectionMode = value;
          }
        }, {
          key: "selectionController",
          get: function get() {
            return this._selectionController;
          },
          set: function set(value) {
            this._selectionController = value;
          }
        }, {
          key: "itemPool",
          get: function get() {
            return this._pool;
          }
        }, {
          key: "selectedIndex",
          get: function get() {
            var i;
            if (this._virtual) {
              for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if (ii.obj instanceof GButton && ii.obj.selected || !ii.obj && ii.selected) {
                  if (this._loop) return i % this._numItems;else return i;
                }
              }
            } else {
              var cnt = this._children.length;
              for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if (obj instanceof GButton && obj.selected) return i;
              }
            }
            return -1;
          },
          set: function set(value) {
            if (value >= 0 && value < this.numItems) {
              if (this._selectionMode != ListSelectionMode.Single) this.clearSelection();
              this.addSelection(value);
            } else this.clearSelection();
          }
        }, {
          key: "numItems",
          get: function get() {
            if (this._virtual) return this._numItems;else return this._children.length;
          },
          set: function set(value) {
            if (this._virtual) {
              if (this.itemRenderer == null) throw new Error("Set itemRenderer first!");
              this._numItems = value;
              if (this._loop) this._realNumItems = this._numItems * 6; //设置6倍数量，用于循环滚动
              else this._realNumItems = this._numItems; //_virtualItems的设计是只增不减的
              var oldCount = this._virtualItems.length;
              if (this._realNumItems > oldCount) {
                for (i = oldCount; i < this._realNumItems; i++) {
                  var ii = {
                    width: this._itemSize.width,
                    height: this._itemSize.height,
                    updateFlag: 0
                  };
                  this._virtualItems.push(ii);
                }
              } else {
                for (i = this._realNumItems; i < oldCount; i++) this._virtualItems[i].selected = false;
              }
              if (this._virtualListChanged != 0) this._partner.unschedule(this._refreshVirtualList); //立即刷新
              this._refreshVirtualList();
            } else {
              var cnt = this._children.length;
              if (value > cnt) {
                for (var i = cnt; i < value; i++) {
                  if (this.itemProvider == null) this.addItemFromPool();else this.addItemFromPool(this.itemProvider(i));
                }
              } else {
                this.removeChildrenToPool(value, cnt);
              }
              if (this.itemRenderer != null) {
                for (i = 0; i < value; i++) this.itemRenderer(i, this.getChildAt(i));
              }
            }
          }
        }]);
        return GList;
      }(GComponent));
      var s_n = 0;
      var GComboBox = exports('GComboBox', /*#__PURE__*/function (_GComponent6) {
        _inheritsLoose(GComboBox, _GComponent6);
        function GComboBox() {
          var _this30;
          _this30 = _GComponent6.call(this) || this;
          _this30._visibleItemCount = 0;
          _this30._selectedIndex = 0;
          _this30._popupDirection = PopupDirection.Auto;
          _this30._node.name = "GComboBox";
          _this30._visibleItemCount = UIConfig.defaultComboBoxVisibleItemCount;
          _this30._itemsUpdated = true;
          _this30._selectedIndex = -1;
          _this30._items = [];
          _this30._values = [];
          return _this30;
        }
        var _proto58 = GComboBox.prototype;
        _proto58.getTextField = function getTextField() {
          if (this._titleObject instanceof GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
        };
        _proto58.setState = function setState(val) {
          if (this._buttonController) this._buttonController.selectedPage = val;
        };
        _proto58.getProp = function getProp(index) {
          switch (index) {
            case ObjectPropID.Color:
              return this.titleColor;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) return tf.strokeColor;else return 0;
              }
            case ObjectPropID.FontSize:
              {
                tf = this.getTextField();
                if (tf) return tf.fontSize;else return 0;
              }
            default:
              return _GComponent6.prototype.getProp.call(this, index);
          }
        };
        _proto58.setProp = function setProp(index, value) {
          switch (index) {
            case ObjectPropID.Color:
              this.titleColor = value;
              break;
            case ObjectPropID.OutlineColor:
              {
                var tf = this.getTextField();
                if (tf) tf.strokeColor = value;
              }
              break;
            case ObjectPropID.FontSize:
              {
                tf = this.getTextField();
                if (tf) tf.fontSize = value;
              }
              break;
            default:
              _GComponent6.prototype.setProp.call(this, index, value);
              break;
          }
        };
        _proto58.constructExtension = function constructExtension(buffer) {
          var str;
          this._buttonController = this.getController("button");
          this._titleObject = this.getChild("title");
          this._iconObject = this.getChild("icon");
          str = buffer.readS();
          if (str) {
            var obj = UIPackage.createObjectFromURL(str);
            if (!(obj instanceof GComponent)) {
              console.error("下拉框必须为元件");
              return;
            }
            this.dropdown = obj;
            this.dropdown.name = "this.dropdown";
            this._list = this.dropdown.getChild("list", GList);
            if (this._list == null) {
              console.error(this.resourceURL + ": 下拉框的弹出元件里必须包含名为list的列表");
              return;
            }
            this._list.on(Event.CLICK_ITEM, this.onClickItem, this);
            this._list.addRelation(this.dropdown, RelationType.Width);
            this._list.removeRelation(this.dropdown, RelationType.Height);
            this.dropdown.addRelation(this._list, RelationType.Height);
            this.dropdown.removeRelation(this._list, RelationType.Width);
            this.dropdown.on(Event.UNDISPLAY, this.onPopupClosed, this);
          }
          this._node.on(Event.TOUCH_BEGIN, this.onTouchBegin_1, this);
          this._node.on(Event.TOUCH_END, this.onTouchEnd_1, this);
          this._node.on(Event.ROLL_OVER, this.onRollOver_1, this);
          this._node.on(Event.ROLL_OUT, this.onRollOut_1, this);
        };
        _proto58.handleControllerChanged = function handleControllerChanged(c) {
          _GComponent6.prototype.handleControllerChanged.call(this, c);
          if (this._selectionController == c) this.selectedIndex = c.selectedIndex;
        };
        _proto58.updateSelectionController = function updateSelectionController() {
          if (this._selectionController && !this._selectionController.changing && this._selectedIndex < this._selectionController.pageCount) {
            var c = this._selectionController;
            this._selectionController = null;
            c.selectedIndex = this._selectedIndex;
            this._selectionController = c;
          }
        };
        _proto58.dispose = function dispose() {
          if (this.dropdown) {
            this.dropdown.dispose();
            this.dropdown = null;
          }
          _GComponent6.prototype.dispose.call(this);
        };
        _proto58.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent6.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!buffer.seek(beginPos, 6)) return;
          if (buffer.readByte() != this.packageItem.objectType) return;
          var i;
          var iv;
          var nextPos;
          var str;
          var itemCount = buffer.readShort();
          for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            this._items[i] = buffer.readS();
            this._values[i] = buffer.readS();
            str = buffer.readS();
            if (str != null) {
              if (this._icons == null) this._icons = new Array();
              this._icons[i] = str;
            }
            buffer.position = nextPos;
          }
          str = buffer.readS();
          if (str != null) {
            this.text = str;
            this._selectedIndex = this._items.indexOf(str);
          } else if (this._items.length > 0) {
            this._selectedIndex = 0;
            this.text = this._items[0];
          } else this._selectedIndex = -1;
          str = buffer.readS();
          if (str != null) this.icon = str;
          if (buffer.readBool()) this.titleColor = buffer.readColor();
          iv = buffer.readInt();
          if (iv > 0) this._visibleItemCount = iv;
          this._popupDirection = buffer.readByte();
          iv = buffer.readShort();
          if (iv >= 0) this._selectionController = this.parent.getControllerAt(iv);
        };
        _proto58.showDropdown = function showDropdown() {
          if (this._itemsUpdated) {
            this._itemsUpdated = false;
            this._list.removeChildrenToPool();
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
              var item = this._list.addItemFromPool();
              item.name = i < this._values.length ? this._values[i] : "";
              item.text = this._items[i];
              item.icon = this._icons && i < this._icons.length ? this._icons[i] : null;
            }
            this._list.resizeToFit(this._visibleItemCount);
          }
          this._list.selectedIndex = -1;
          this.dropdown.width = this.width;
          this._list.ensureBoundsCorrect();
          GRoot.inst.togglePopup(this.dropdown, this, this._popupDirection);
          if (this.dropdown.parent) this.setState(GButton.DOWN);
        };
        _proto58.onPopupClosed = function onPopupClosed() {
          if (this._over) this.setState(GButton.OVER);else this.setState(GButton.UP);
        };
        _proto58.onClickItem = function onClickItem(itemObject) {
          var _t = this;
          var index = this._list.getChildIndex(itemObject);
          this._partner.callLater(function (dt) {
            _t.onClickItem2(index);
          }, 0.1);
        };
        _proto58.onClickItem2 = function onClickItem2(index) {
          if (this.dropdown.parent instanceof GRoot) this.dropdown.parent.hidePopup();
          this._selectedIndex = -1;
          this.selectedIndex = index;
          this._node.emit(Event.STATUS_CHANGED, this);
        };
        _proto58.onRollOver_1 = function onRollOver_1() {
          this._over = true;
          if (this._down || this.dropdown && this.dropdown.parent) return;
          this.setState(GButton.OVER);
        };
        _proto58.onRollOut_1 = function onRollOut_1() {
          this._over = false;
          if (this._down || this.dropdown && this.dropdown.parent) return;
          this.setState(GButton.UP);
        };
        _proto58.onTouchBegin_1 = function onTouchBegin_1(evt) {
          if (evt.button != EventMouse.BUTTON_LEFT) return;
          if (evt.initiator instanceof GTextInput && evt.initiator.editable) return;
          this._down = true;
          evt.captureTouch();
          if (this.dropdown) this.showDropdown();
        };
        _proto58.onTouchEnd_1 = function onTouchEnd_1(evt) {
          if (evt.button != EventMouse.BUTTON_LEFT) return;
          if (this._down) {
            this._down = false;
            if (this.dropdown && !this.dropdown.parent) {
              if (this._over) this.setState(GButton.OVER);else this.setState(GButton.UP);
            }
          }
        };
        _createClass(GComboBox, [{
          key: "text",
          get: function get() {
            if (this._titleObject) return this._titleObject.text;else return null;
          },
          set: function set(value) {
            if (this._titleObject) this._titleObject.text = value;
            this.updateGear(6);
          }
        }, {
          key: "icon",
          get: function get() {
            if (this._iconObject) return this._iconObject.icon;else return null;
          },
          set: function set(value) {
            if (this._iconObject) this._iconObject.icon = value;
            this.updateGear(7);
          }
        }, {
          key: "titleColor",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.color;else return Color.BLACK;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.color = value;
          }
        }, {
          key: "titleFontSize",
          get: function get() {
            var tf = this.getTextField();
            if (tf) return tf.fontSize;else return 0;
          },
          set: function set(value) {
            var tf = this.getTextField();
            if (tf) tf.fontSize = value;
          }
        }, {
          key: "visibleItemCount",
          get: function get() {
            return this._visibleItemCount;
          },
          set: function set(value) {
            this._visibleItemCount = value;
          }
        }, {
          key: "popupDirection",
          get: function get() {
            return this._popupDirection;
          },
          set: function set(value) {
            this._popupDirection = value;
          }
        }, {
          key: "items",
          get: function get() {
            return this._items;
          },
          set: function set(value) {
            if (!value) this._items.length = 0;else this._items = value.concat();
            if (this._items.length > 0) {
              if (this._selectedIndex >= this._items.length) this._selectedIndex = this._items.length - 1;else if (this._selectedIndex == -1) this._selectedIndex = 0;
              this.text = this._items[this._selectedIndex];
              if (this._icons && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
            } else {
              this.text = "";
              if (this._icons) this.icon = null;
              this._selectedIndex = -1;
            }
            this._itemsUpdated = true;
          }
        }, {
          key: "icons",
          get: function get() {
            return this._icons;
          },
          set: function set(value) {
            this._icons = value;
            if (this._icons && this._selectedIndex != -1 && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
          }
        }, {
          key: "values",
          get: function get() {
            return this._values;
          },
          set: function set(value) {
            if (!value) this._values.length = 0;else this._values = value.concat();
          }
        }, {
          key: "selectedIndex",
          get: function get() {
            return this._selectedIndex;
          },
          set: function set(val) {
            if (this._selectedIndex == val) return;
            this._selectedIndex = val;
            if (this._selectedIndex >= 0 && this._selectedIndex < this._items.length) {
              this.text = this._items[this._selectedIndex];
              if (this._icons && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
            } else {
              this.text = "";
              if (this._icons) this.icon = null;
            }
            this.updateSelectionController();
          }
        }, {
          key: "value",
          get: function get() {
            return this._values[this._selectedIndex];
          },
          set: function set(val) {
            var index = this._values.indexOf(val);
            if (index == -1 && val == null) index = this._values.indexOf("");
            this.selectedIndex = index;
          }
        }, {
          key: "selectionController",
          get: function get() {
            return this._selectionController;
          },
          set: function set(value) {
            this._selectionController = value;
          }
        }]);
        return GComboBox;
      }(GComponent));
      var GSlider = exports('GSlider', /*#__PURE__*/function (_GComponent7) {
        _inheritsLoose(GSlider, _GComponent7);
        function GSlider() {
          var _this31;
          _this31 = _GComponent7.call(this) || this;
          _this31._min = 0;
          _this31._max = 0;
          _this31._value = 0;
          _this31._barMaxWidth = 0;
          _this31._barMaxHeight = 0;
          _this31._barMaxWidthDelta = 0;
          _this31._barMaxHeightDelta = 0;
          _this31._clickPercent = 0;
          _this31._barStartX = 0;
          _this31._barStartY = 0;
          _this31.changeOnClick = true;
          _this31.canDrag = true;
          _this31._node.name = "GSlider";
          _this31._titleType = ProgressTitleType.Percent;
          _this31._value = 50;
          _this31._max = 100;
          _this31._clickPos = new Vec2();
          return _this31;
        }
        var _proto59 = GSlider.prototype;
        _proto59.update = function update() {
          this.updateWithPercent((this._value - this._min) / (this._max - this._min));
        };
        _proto59.updateWithPercent = function updateWithPercent(percent, manual) {
          percent = math.clamp01(percent);
          if (manual) {
            var newValue = math.clamp(this._min + (this._max - this._min) * percent, this._min, this._max);
            if (this._wholeNumbers) {
              newValue = Math.round(newValue);
              percent = math.clamp01((newValue - this._min) / (this._max - this._min));
            }
            if (newValue != this._value) {
              this._value = newValue;
              this._node.emit(Event.STATUS_CHANGED, this);
            }
          }
          if (this._titleObject) {
            switch (this._titleType) {
              case ProgressTitleType.Percent:
                this._titleObject.text = Math.floor(percent * 100) + "%";
                break;
              case ProgressTitleType.ValueAndMax:
                this._titleObject.text = this._value + "/" + this._max;
                break;
              case ProgressTitleType.Value:
                this._titleObject.text = "" + this._value;
                break;
              case ProgressTitleType.Max:
                this._titleObject.text = "" + this._max;
                break;
            }
          }
          var fullWidth = this.width - this._barMaxWidthDelta;
          var fullHeight = this.height - this._barMaxHeightDelta;
          if (!this._reverse) {
            if (this._barObjectH) this._barObjectH.width = Math.round(fullWidth * percent);
            if (this._barObjectV) this._barObjectV.height = Math.round(fullHeight * percent);
          } else {
            if (this._barObjectH) {
              this._barObjectH.width = Math.round(fullWidth * percent);
              this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
            }
            if (this._barObjectV) {
              this._barObjectV.height = Math.round(fullHeight * percent);
              this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
            }
          }
        };
        _proto59.constructExtension = function constructExtension(buffer) {
          buffer.seek(0, 6);
          this._titleType = buffer.readByte();
          this._reverse = buffer.readBool();
          if (buffer.version >= 2) {
            this._wholeNumbers = buffer.readBool();
            this.changeOnClick = buffer.readBool();
          }
          this._titleObject = this.getChild("title");
          this._barObjectH = this.getChild("bar");
          this._barObjectV = this.getChild("bar_v");
          this._gripObject = this.getChild("grip");
          if (this._barObjectH) {
            this._barMaxWidth = this._barObjectH.width;
            this._barMaxWidthDelta = this.width - this._barMaxWidth;
            this._barStartX = this._barObjectH.x;
          }
          if (this._barObjectV) {
            this._barMaxHeight = this._barObjectV.height;
            this._barMaxHeightDelta = this.height - this._barMaxHeight;
            this._barStartY = this._barObjectV.y;
          }
          if (this._gripObject) {
            this._gripObject.on(Event.TOUCH_BEGIN, this.onGripTouchBegin, this);
            this._gripObject.on(Event.TOUCH_MOVE, this.onGripTouchMove, this);
          }
          this._node.on(Event.TOUCH_BEGIN, this.onBarTouchBegin, this);
        };
        _proto59.handleSizeChanged = function handleSizeChanged() {
          _GComponent7.prototype.handleSizeChanged.call(this);
          if (this._barObjectH) this._barMaxWidth = this.width - this._barMaxWidthDelta;
          if (this._barObjectV) this._barMaxHeight = this.height - this._barMaxHeightDelta;
          if (!this._underConstruct) this.update();
        };
        _proto59.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent7.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!buffer.seek(beginPos, 6)) {
            this.update();
            return;
          }
          if (buffer.readByte() != this.packageItem.objectType) {
            this.update();
            return;
          }
          this._value = buffer.readInt();
          this._max = buffer.readInt();
          if (buffer.version >= 2) this._min = buffer.readInt();
          this.update();
        };
        _proto59.onGripTouchBegin = function onGripTouchBegin(evt) {
          this.canDrag = true;
          evt.propagationStopped = true;
          evt.captureTouch();
          this._clickPos = this.globalToLocal(evt.pos.x, evt.pos.y);
          this._clickPercent = math.clamp01((this._value - this._min) / (this._max - this._min));
        };
        _proto59.onGripTouchMove = function onGripTouchMove(evt) {
          if (!this.canDrag) {
            return;
          }
          var pt = this.globalToLocal(evt.pos.x, evt.pos.y, s_vec2$1);
          var deltaX = pt.x - this._clickPos.x;
          var deltaY = pt.y - this._clickPos.y;
          if (this._reverse) {
            deltaX = -deltaX;
            deltaY = -deltaY;
          }
          var percent;
          if (this._barObjectH) percent = this._clickPercent + deltaX / this._barMaxWidth;else percent = this._clickPercent + deltaY / this._barMaxHeight;
          this.updateWithPercent(percent, true);
        };
        _proto59.onBarTouchBegin = function onBarTouchBegin(evt) {
          if (!this.changeOnClick) return;
          var pt = this._gripObject.globalToLocal(evt.pos.x, evt.pos.y, s_vec2$1);
          var percent = math.clamp01((this._value - this._min) / (this._max - this._min));
          var delta = 0;
          if (this._barObjectH != null) delta = (pt.x - this._gripObject.width / 2) / this._barMaxWidth;
          if (this._barObjectV != null) delta = (pt.y - this._gripObject.height / 2) / this._barMaxHeight;
          if (this._reverse) percent -= delta;else percent += delta;
          this.updateWithPercent(percent, true);
        };
        _createClass(GSlider, [{
          key: "titleType",
          get: function get() {
            return this._titleType;
          },
          set: function set(value) {
            this._titleType = value;
          }
        }, {
          key: "wholeNumbers",
          get: function get() {
            return this._wholeNumbers;
          },
          set: function set(value) {
            if (this._wholeNumbers != value) {
              this._wholeNumbers = value;
              this.update();
            }
          }
        }, {
          key: "min",
          get: function get() {
            return this._min;
          },
          set: function set(value) {
            if (this._min != value) {
              this._min = value;
              this.update();
            }
          }
        }, {
          key: "max",
          get: function get() {
            return this._max;
          },
          set: function set(value) {
            if (this._max != value) {
              this._max = value;
              this.update();
            }
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            if (this._value != value) {
              this._value = value;
              this.update();
            }
          }
        }]);
        return GSlider;
      }(GComponent));
      var s_vec2$1 = new Vec2();
      var GProgressBar = exports('GProgressBar', /*#__PURE__*/function (_GComponent8) {
        _inheritsLoose(GProgressBar, _GComponent8);
        function GProgressBar() {
          var _this32;
          _this32 = _GComponent8.call(this) || this;
          _this32._min = 0;
          _this32._max = 0;
          _this32._value = 0;
          _this32._barMaxWidth = 0;
          _this32._barMaxHeight = 0;
          _this32._barMaxWidthDelta = 0;
          _this32._barMaxHeightDelta = 0;
          _this32._barStartX = 0;
          _this32._barStartY = 0;
          _this32._node.name = "GProgressBar";
          _this32._titleType = ProgressTitleType.Percent;
          _this32._value = 50;
          _this32._max = 100;
          return _this32;
        }
        var _proto60 = GProgressBar.prototype;
        _proto60.tweenValue = function tweenValue(value, duration) {
          var oldValule;
          var tweener = GTween.getTween(this, this.update);
          if (tweener) {
            oldValule = tweener.value.x;
            tweener.kill();
          } else oldValule = this._value;
          this._value = value;
          return GTween.to(oldValule, this._value, duration).setTarget(this, this.update).setEase(EaseType.Linear);
        };
        _proto60.update = function update(newValue) {
          var percent = math.clamp01((newValue - this._min) / (this._max - this._min));
          if (this._titleObject) {
            switch (this._titleType) {
              case ProgressTitleType.Percent:
                this._titleObject.text = Math.floor(percent * 100) + "%";
                break;
              case ProgressTitleType.ValueAndMax:
                this._titleObject.text = Math.floor(newValue) + "/" + Math.floor(this._max);
                break;
              case ProgressTitleType.Value:
                this._titleObject.text = "" + Math.floor(newValue);
                break;
              case ProgressTitleType.Max:
                this._titleObject.text = "" + Math.floor(this._max);
                break;
            }
          }
          var fullWidth = this.width - this._barMaxWidthDelta;
          var fullHeight = this.height - this._barMaxHeightDelta;
          if (!this._reverse) {
            if (this._barObjectH) {
              if (!this.setFillAmount(this._barObjectH, percent)) this._barObjectH.width = Math.round(fullWidth * percent);
            }
            if (this._barObjectV) {
              if (!this.setFillAmount(this._barObjectV, percent)) this._barObjectV.height = Math.round(fullHeight * percent);
            }
          } else {
            if (this._barObjectH) {
              if (!this.setFillAmount(this._barObjectH, 1 - percent)) {
                this._barObjectH.width = Math.round(fullWidth * percent);
                this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
              }
            }
            if (this._barObjectV) {
              if (!this.setFillAmount(this._barObjectV, 1 - percent)) {
                this._barObjectV.height = Math.round(fullHeight * percent);
                this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
              }
            }
          }
          if (this._aniObject) this._aniObject.setProp(ObjectPropID.Frame, Math.floor(percent * 100));
        };
        _proto60.setFillAmount = function setFillAmount(bar, percent) {
          if ((bar instanceof GImage || bar instanceof GLoader) && bar.fillMethod != FillMethod.None) {
            bar.fillAmount = percent;
            return true;
          } else return false;
        };
        _proto60.constructExtension = function constructExtension(buffer) {
          buffer.seek(0, 6);
          this._titleType = buffer.readByte();
          this._reverse = buffer.readBool();
          this._titleObject = this.getChild("title");
          this._barObjectH = this.getChild("bar");
          this._barObjectV = this.getChild("bar_v");
          this._aniObject = this.getChild("ani");
          if (this._barObjectH) {
            this._barMaxWidth = this._barObjectH.width;
            this._barMaxWidthDelta = this.width - this._barMaxWidth;
            this._barStartX = this._barObjectH.x;
          }
          if (this._barObjectV) {
            this._barMaxHeight = this._barObjectV.height;
            this._barMaxHeightDelta = this.height - this._barMaxHeight;
            this._barStartY = this._barObjectV.y;
          }
        };
        _proto60.handleSizeChanged = function handleSizeChanged() {
          _GComponent8.prototype.handleSizeChanged.call(this);
          if (this._barObjectH) this._barMaxWidth = this.width - this._barMaxWidthDelta;
          if (this._barObjectV) this._barMaxHeight = this.height - this._barMaxHeightDelta;
          if (!this._underConstruct) this.update(this._value);
        };
        _proto60.setup_afterAdd = function setup_afterAdd(buffer, beginPos) {
          _GComponent8.prototype.setup_afterAdd.call(this, buffer, beginPos);
          if (!buffer.seek(beginPos, 6)) {
            this.update(this._value);
            return;
          }
          if (buffer.readByte() != this.packageItem.objectType) {
            this.update(this._value);
            return;
          }
          this._value = buffer.readInt();
          this._max = buffer.readInt();
          if (buffer.version >= 2) this._min = buffer.readInt();
          this.update(this._value);
        };
        _createClass(GProgressBar, [{
          key: "titleType",
          get: function get() {
            return this._titleType;
          },
          set: function set(value) {
            if (this._titleType != value) {
              this._titleType = value;
              this.update(this._value);
            }
          }
        }, {
          key: "min",
          get: function get() {
            return this._min;
          },
          set: function set(value) {
            if (this._min != value) {
              this._min = value;
              this.update(this._value);
            }
          }
        }, {
          key: "max",
          get: function get() {
            return this._max;
          },
          set: function set(value) {
            if (this._max != value) {
              this._max = value;
              this.update(this._value);
            }
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            if (this._value != value) {
              GTween.kill(this, false, this.update);
              this._value = value;
              this.update(value);
            }
          }
        }]);
        return GProgressBar;
      }(GComponent));
      var GScrollBar = exports('GScrollBar', /*#__PURE__*/function (_GComponent9) {
        _inheritsLoose(GScrollBar, _GComponent9);
        function GScrollBar() {
          var _this33;
          _this33 = _GComponent9.call(this) || this;
          _this33._node.name = "GScrollBar";
          _this33._dragOffset = new Vec2();
          _this33._scrollPerc = 0;
          return _this33;
        }
        var _proto61 = GScrollBar.prototype;
        _proto61.setScrollPane = function setScrollPane(target, vertical) {
          this._target = target;
          this._vertical = vertical;
        };
        _proto61.setDisplayPerc = function setDisplayPerc(value) {
          if (this._vertical) {
            if (!this._fixedGripSize) this._grip.height = Math.floor(value * this._bar.height);
            this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
          } else {
            if (!this._fixedGripSize) this._grip.width = Math.floor(value * this._bar.width);
            this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
          }
          this._grip.visible = value != 0 && value != 1;
        };
        _proto61.setScrollPerc = function setScrollPerc(val) {
          this._scrollPerc = val;
          if (this._vertical) this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;else this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
        };
        _proto61.constructExtension = function constructExtension(buffer) {
          buffer.seek(0, 6);
          this._fixedGripSize = buffer.readBool();
          this._grip = this.getChild("grip");
          if (!this._grip) {
            console.error("需要定义grip");
            return;
          }
          this._bar = this.getChild("bar");
          if (!this._bar) {
            console.error("需要定义bar");
            return;
          }
          this._arrowButton1 = this.getChild("arrow1");
          this._arrowButton2 = this.getChild("arrow2");
          this._grip.on(Event.TOUCH_BEGIN, this.onGripTouchDown, this);
          this._grip.on(Event.TOUCH_MOVE, this.onGripTouchMove, this);
          this._grip.on(Event.TOUCH_END, this.onGripTouchEnd, this);
          if (this._arrowButton1) this._arrowButton1.on(Event.TOUCH_BEGIN, this.onClickArrow1, this);
          if (this._arrowButton2) this._arrowButton2.on(Event.TOUCH_BEGIN, this.onClickArrow2, this);
          this.on(Event.TOUCH_BEGIN, this.onBarTouchBegin, this);
        };
        _proto61.onGripTouchDown = function onGripTouchDown(evt) {
          evt.propagationStopped = true;
          evt.captureTouch();
          this._gripDragging = true;
          this._target.updateScrollBarVisible();
          this.globalToLocal(evt.pos.x, evt.pos.y, this._dragOffset);
          this._dragOffset.x -= this._grip.x;
          this._dragOffset.y -= this._grip.y;
        };
        _proto61.onGripTouchMove = function onGripTouchMove(evt) {
          if (!this.onStage) return;
          var pt = this.globalToLocal(evt.pos.x, evt.pos.y, s_vec2);
          if (this._vertical) {
            var curY = pt.y - this._dragOffset.y;
            this._target.setPercY((curY - this._bar.y) / (this._bar.height - this._grip.height), false);
          } else {
            var curX = pt.x - this._dragOffset.x;
            this._target.setPercX((curX - this._bar.x) / (this._bar.width - this._grip.width), false);
          }
        };
        _proto61.onGripTouchEnd = function onGripTouchEnd(evt) {
          if (!this.onStage) return;
          this._gripDragging = false;
          this._target.updateScrollBarVisible();
        };
        _proto61.onClickArrow1 = function onClickArrow1(evt) {
          evt.propagationStopped = true;
          if (this._vertical) this._target.scrollUp();else this._target.scrollLeft();
        };
        _proto61.onClickArrow2 = function onClickArrow2(evt) {
          evt.propagationStopped = true;
          if (this._vertical) this._target.scrollDown();else this._target.scrollRight();
        };
        _proto61.onBarTouchBegin = function onBarTouchBegin(evt) {
          evt.propagationStopped = true;
          var pt = this._grip.globalToLocal(evt.pos.x, evt.pos.y, s_vec2);
          if (this._vertical) {
            if (pt.y < 0) this._target.scrollUp(4);else this._target.scrollDown(4);
          } else {
            if (pt.x < 0) this._target.scrollLeft(4);else this._target.scrollRight(4);
          }
        };
        _createClass(GScrollBar, [{
          key: "minSize",
          get: function get() {
            if (this._vertical) return (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0);else return (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
          }
        }, {
          key: "gripDragging",
          get: function get() {
            return this._gripDragging;
          }
        }]);
        return GScrollBar;
      }(GComponent));
      var s_vec2 = new Vec2();
      var GTreeNode = exports('GTreeNode', /*#__PURE__*/function () {
        function GTreeNode(hasChild, resURL) {
          this._level = 0;
          this._resURL = resURL;
          if (hasChild) this._children = new Array();
        }
        var _proto62 = GTreeNode.prototype;
        _proto62._setLevel = function _setLevel(value) {
          this._level = value;
        };
        _proto62.addChild = function addChild(child) {
          this.addChildAt(child, this._children.length);
          return child;
        };
        _proto62.addChildAt = function addChildAt(child, index) {
          if (!child) throw new Error("child is null");
          var numChildren = this._children.length;
          if (index >= 0 && index <= numChildren) {
            if (child._parent == this) {
              this.setChildIndex(child, index);
            } else {
              if (child._parent) child._parent.removeChild(child);
              var cnt = this._children.length;
              if (index == cnt) this._children.push(child);else this._children.splice(index, 0, child);
              child._parent = this;
              child._level = this._level + 1;
              child._setTree(this._tree);
              if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) this._tree._afterInserted(child);
            }
            return child;
          } else {
            throw new RangeError("Invalid child index");
          }
        };
        _proto62.removeChild = function removeChild(child) {
          var childIndex = this._children.indexOf(child);
          if (childIndex != -1) {
            this.removeChildAt(childIndex);
          }
          return child;
        };
        _proto62.removeChildAt = function removeChildAt(index) {
          if (index >= 0 && index < this.numChildren) {
            var child = this._children[index];
            this._children.splice(index, 1);
            child._parent = null;
            if (this._tree) {
              child._setTree(null);
              this._tree._afterRemoved(child);
            }
            return child;
          } else {
            throw new Error("Invalid child index");
          }
        };
        _proto62.removeChildren = function removeChildren(beginIndex, endIndex) {
          beginIndex = beginIndex || 0;
          if (endIndex == null) endIndex = -1;
          if (endIndex < 0 || endIndex >= this.numChildren) endIndex = this.numChildren - 1;
          for (var i = beginIndex; i <= endIndex; ++i) this.removeChildAt(beginIndex);
        };
        _proto62.getChildAt = function getChildAt(index) {
          if (index >= 0 && index < this.numChildren) return this._children[index];else throw new Error("Invalid child index");
        };
        _proto62.getChildIndex = function getChildIndex(child) {
          return this._children.indexOf(child);
        };
        _proto62.getPrevSibling = function getPrevSibling() {
          if (this._parent == null) return null;
          var i = this._parent._children.indexOf(this);
          if (i <= 0) return null;
          return this._parent._children[i - 1];
        };
        _proto62.getNextSibling = function getNextSibling() {
          if (this._parent == null) return null;
          var i = this._parent._children.indexOf(this);
          if (i < 0 || i >= this._parent._children.length - 1) return null;
          return this._parent._children[i + 1];
        };
        _proto62.setChildIndex = function setChildIndex(child, index) {
          var oldIndex = this._children.indexOf(child);
          if (oldIndex == -1) throw new Error("Not a child of this container");
          var cnt = this._children.length;
          if (index < 0) index = 0;else if (index > cnt) index = cnt;
          if (oldIndex == index) return;
          this._children.splice(oldIndex, 1);
          this._children.splice(index, 0, child);
          if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) this._tree._afterMoved(child);
        };
        _proto62.swapChildren = function swapChildren(child1, child2) {
          var index1 = this._children.indexOf(child1);
          var index2 = this._children.indexOf(child2);
          if (index1 == -1 || index2 == -1) throw new Error("Not a child of this container");
          this.swapChildrenAt(index1, index2);
        };
        _proto62.swapChildrenAt = function swapChildrenAt(index1, index2) {
          var child1 = this._children[index1];
          var child2 = this._children[index2];
          this.setChildIndex(child1, index2);
          this.setChildIndex(child2, index1);
        };
        _proto62.expandToRoot = function expandToRoot() {
          var p = this;
          while (p) {
            p.expanded = true;
            p = p.parent;
          }
        };
        _proto62._setTree = function _setTree(value) {
          this._tree = value;
          if (this._tree && this._tree.treeNodeWillExpand && this._expanded) this._tree.treeNodeWillExpand(this, true);
          if (this._children) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; i++) {
              var node = this._children[i];
              node._level = this._level + 1;
              node._setTree(value);
            }
          }
        };
        _createClass(GTreeNode, [{
          key: "expanded",
          get: function get() {
            return this._expanded;
          },
          set: function set(value) {
            if (this._children == null) return;
            if (this._expanded != value) {
              this._expanded = value;
              if (this._tree) {
                if (this._expanded) this._tree._afterExpanded(this);else this._tree._afterCollapsed(this);
              }
            }
          }
        }, {
          key: "isFolder",
          get: function get() {
            return this._children != null;
          }
        }, {
          key: "parent",
          get: function get() {
            return this._parent;
          }
        }, {
          key: "text",
          get: function get() {
            if (this._cell) return this._cell.text;else return null;
          },
          set: function set(value) {
            if (this._cell) this._cell.text = value;
          }
        }, {
          key: "icon",
          get: function get() {
            if (this._cell) return this._cell.icon;else return null;
          },
          set: function set(value) {
            if (this._cell) this._cell.icon = value;
          }
        }, {
          key: "cell",
          get: function get() {
            return this._cell;
          }
        }, {
          key: "level",
          get: function get() {
            return this._level;
          }
        }, {
          key: "numChildren",
          get: function get() {
            return this._children.length;
          }
        }, {
          key: "tree",
          get: function get() {
            return this._tree;
          }
        }]);
        return GTreeNode;
      }());
      var GTree = exports('GTree', /*#__PURE__*/function (_GList) {
        _inheritsLoose(GTree, _GList);
        function GTree() {
          var _this34;
          _this34 = _GList.call(this) || this;
          _this34._indent = 15;
          _this34._rootNode = new GTreeNode(true);
          _this34._rootNode._setTree(_assertThisInitialized(_this34));
          _this34._rootNode.expanded = true;
          return _this34;
        }
        var _proto63 = GTree.prototype;
        _proto63.getSelectedNode = function getSelectedNode() {
          if (this.selectedIndex != -1) return this.getChildAt(this.selectedIndex)._treeNode;else return null;
        };
        _proto63.getSelectedNodes = function getSelectedNodes(result) {
          if (!result) result = new Array();
          s_list.length = 0;
          _GList.prototype.getSelection.call(this, s_list);
          var cnt = s_list.length;
          var ret = new Array();
          for (var i = 0; i < cnt; i++) {
            var node = this.getChildAt(s_list[i])._treeNode;
            ret.push(node);
          }
          return ret;
        };
        _proto63.selectNode = function selectNode(node, scrollItToView) {
          var parentNode = node.parent;
          while (parentNode && parentNode != this._rootNode) {
            parentNode.expanded = true;
            parentNode = parentNode.parent;
          }
          if (!node._cell) return;
          this.addSelection(this.getChildIndex(node._cell), scrollItToView);
        };
        _proto63.unselectNode = function unselectNode(node) {
          if (!node._cell) return;
          this.removeSelection(this.getChildIndex(node._cell));
        };
        _proto63.expandAll = function expandAll(folderNode) {
          if (!folderNode) folderNode = this._rootNode;
          folderNode.expanded = true;
          var cnt = folderNode.numChildren;
          for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node.isFolder) this.expandAll(node);
          }
        };
        _proto63.collapseAll = function collapseAll(folderNode) {
          if (!folderNode) folderNode = this._rootNode;
          if (folderNode != this._rootNode) folderNode.expanded = false;
          var cnt = folderNode.numChildren;
          for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node.isFolder) this.collapseAll(node);
          }
        };
        _proto63.createCell = function createCell(node) {
          var child = this.getFromPool(node._resURL);
          if (!(child instanceof GComponent)) throw new Error("cannot create tree node object.");
          child._treeNode = node;
          node._cell = child;
          var indentObj = child.getChild("indent");
          if (indentObj) indentObj.width = (node.level - 1) * this._indent;
          var cc;
          cc = child.getController("expanded");
          if (cc) {
            cc.on(Event.STATUS_CHANGED, this.__expandedStateChanged, this);
            cc.selectedIndex = node.expanded ? 1 : 0;
          }
          cc = child.getController("leaf");
          if (cc) cc.selectedIndex = node.isFolder ? 0 : 1;
          if (node.isFolder) node._cell.on(Event.TOUCH_BEGIN, this.__cellMouseDown, this);
          if (this.treeNodeRender) this.treeNodeRender(node, child);
        };
        _proto63._afterInserted = function _afterInserted(node) {
          if (!node._cell) this.createCell(node);
          var index = this.getInsertIndexForNode(node);
          this.addChildAt(node._cell, index);
          if (this.treeNodeRender) this.treeNodeRender(node, node._cell);
          if (node.isFolder && node.expanded) this.checkChildren(node, index);
        };
        _proto63.getInsertIndexForNode = function getInsertIndexForNode(node) {
          var prevNode = node.getPrevSibling();
          if (prevNode == null) prevNode = node.parent;
          var insertIndex = this.getChildIndex(prevNode._cell) + 1;
          var myLevel = node.level;
          var cnt = this.numChildren;
          for (var i = insertIndex; i < cnt; i++) {
            var testNode = this.getChildAt(i)._treeNode;
            if (testNode.level <= myLevel) break;
            insertIndex++;
          }
          return insertIndex;
        };
        _proto63._afterRemoved = function _afterRemoved(node) {
          this.removeNode(node);
        };
        _proto63._afterExpanded = function _afterExpanded(node) {
          if (node == this._rootNode) {
            this.checkChildren(this._rootNode, 0);
            return;
          }
          if (this.treeNodeWillExpand != null) this.treeNodeWillExpand(node, true);
          if (node._cell == null) return;
          if (this.treeNodeRender) this.treeNodeRender(node, node._cell);
          var cc = node._cell.getController("expanded");
          if (cc) cc.selectedIndex = 1;
          if (node._cell.parent) this.checkChildren(node, this.getChildIndex(node._cell));
        };
        _proto63._afterCollapsed = function _afterCollapsed(node) {
          if (node == this._rootNode) {
            this.checkChildren(this._rootNode, 0);
            return;
          }
          if (this.treeNodeWillExpand) this.treeNodeWillExpand(node, false);
          if (node._cell == null) return;
          if (this.treeNodeRender) this.treeNodeRender(node, node._cell);
          var cc = node._cell.getController("expanded");
          if (cc) cc.selectedIndex = 0;
          if (node._cell.parent) this.hideFolderNode(node);
        };
        _proto63._afterMoved = function _afterMoved(node) {
          var startIndex = this.getChildIndex(node._cell);
          var endIndex;
          if (node.isFolder) endIndex = this.getFolderEndIndex(startIndex, node.level);else endIndex = startIndex + 1;
          var insertIndex = this.getInsertIndexForNode(node);
          var i;
          var cnt = endIndex - startIndex;
          var obj;
          if (insertIndex < startIndex) {
            for (i = 0; i < cnt; i++) {
              obj = this.getChildAt(startIndex + i);
              this.setChildIndex(obj, insertIndex + i);
            }
          } else {
            for (i = 0; i < cnt; i++) {
              obj = this.getChildAt(startIndex);
              this.setChildIndex(obj, insertIndex);
            }
          }
        };
        _proto63.getFolderEndIndex = function getFolderEndIndex(startIndex, level) {
          var cnt = this.numChildren;
          for (var i = startIndex + 1; i < cnt; i++) {
            var node = this.getChildAt(i)._treeNode;
            if (node.level <= level) return i;
          }
          return cnt;
        };
        _proto63.checkChildren = function checkChildren(folderNode, index) {
          var cnt = folderNode.numChildren;
          for (var i = 0; i < cnt; i++) {
            index++;
            var node = folderNode.getChildAt(i);
            if (node._cell == null) this.createCell(node);
            if (!node._cell.parent) this.addChildAt(node._cell, index);
            if (node.isFolder && node.expanded) index = this.checkChildren(node, index);
          }
          return index;
        };
        _proto63.hideFolderNode = function hideFolderNode(folderNode) {
          var cnt = folderNode.numChildren;
          for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node._cell) this.removeChild(node._cell);
            if (node.isFolder && node.expanded) this.hideFolderNode(node);
          }
        };
        _proto63.removeNode = function removeNode(node) {
          if (node._cell) {
            if (node._cell.parent) this.removeChild(node._cell);
            this.returnToPool(node._cell);
            node._cell._treeNode = null;
            node._cell = null;
          }
          if (node.isFolder) {
            var cnt = node.numChildren;
            for (var i = 0; i < cnt; i++) {
              var node2 = node.getChildAt(i);
              this.removeNode(node2);
            }
          }
        };
        _proto63.__cellMouseDown = function __cellMouseDown(evt) {
          var node = GObject.cast(evt.currentTarget)._treeNode;
          this._expandedStatusInEvt = node.expanded;
        };
        _proto63.__expandedStateChanged = function __expandedStateChanged(cc) {
          var node = cc.parent._treeNode;
          node.expanded = cc.selectedIndex == 1;
        };
        _proto63.dispatchItemEvent = function dispatchItemEvent(item, evt) {
          if (this._clickToExpand != 0) {
            var node = item._treeNode;
            if (node && this._expandedStatusInEvt == node.expanded) {
              if (this._clickToExpand == 2) ;else node.expanded = !node.expanded;
            }
          }
          _GList.prototype.dispatchItemEvent.call(this, item, evt);
        };
        _proto63.setup_beforeAdd = function setup_beforeAdd(buffer, beginPos) {
          _GList.prototype.setup_beforeAdd.call(this, buffer, beginPos);
          buffer.seek(beginPos, 9);
          this._indent = buffer.readInt();
          this._clickToExpand = buffer.readByte();
        };
        _proto63.readItems = function readItems(buffer) {
          var cnt;
          var i;
          var nextPos;
          var str;
          var isFolder;
          var lastNode;
          var level;
          var prevLevel = 0;
          cnt = buffer.readShort();
          for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            str = buffer.readS();
            if (str == null) {
              str = this.defaultItem;
              if (!str) {
                buffer.position = nextPos;
                continue;
              }
            }
            isFolder = buffer.readBool();
            level = buffer.readByte();
            var node = new GTreeNode(isFolder, str);
            node.expanded = true;
            if (i == 0) this._rootNode.addChild(node);else {
              if (level > prevLevel) lastNode.addChild(node);else if (level < prevLevel) {
                for (var j = level; j <= prevLevel; j++) lastNode = lastNode.parent;
                lastNode.addChild(node);
              } else lastNode.parent.addChild(node);
            }
            lastNode = node;
            prevLevel = level;
            this.setupItem(buffer, node.cell);
            buffer.position = nextPos;
          }
        };
        _createClass(GTree, [{
          key: "rootNode",
          get: function get() {
            return this._rootNode;
          }
        }, {
          key: "indent",
          get: function get() {
            return this._indent;
          },
          set: function set(value) {
            this._indent = value;
          }
        }, {
          key: "clickToExpand",
          get: function get() {
            return this._clickToExpand;
          },
          set: function set(value) {
            this._clickToExpand = value;
          }
        }]);
        return GTree;
      }(GList));
      var s_list = new Array();
      var PopupMenu = exports('PopupMenu', /*#__PURE__*/function () {
        function PopupMenu(url) {
          if (!url) {
            url = UIConfig.popupMenu;
            if (!url) throw new Error("UIConfig.popupMenu not defined");
          }
          this._contentPane = UIPackage.createObjectFromURL(url);
          this._contentPane.on(Event.DISPLAY, this.onDisplay, this);
          this._list = this._contentPane.getChild("list");
          this._list.removeChildrenToPool();
          this._list.addRelation(this._contentPane, RelationType.Width);
          this._list.removeRelation(this._contentPane, RelationType.Height);
          this._contentPane.addRelation(this._list, RelationType.Height);
          this._list.on(Event.CLICK_ITEM, this.onClickItem, this);
        }
        var _proto64 = PopupMenu.prototype;
        _proto64.dispose = function dispose() {
          this._contentPane.dispose();
        };
        _proto64.addItem = function addItem(caption, callback) {
          var item = this._list.addItemFromPool();
          item.title = caption;
          item.data = callback;
          item.grayed = false;
          var c = item.getController("checked");
          if (c) c.selectedIndex = 0;
          return item;
        };
        _proto64.addItemAt = function addItemAt(caption, index, callback) {
          var item = this._list.getFromPool();
          this._list.addChildAt(item, index);
          item.title = caption;
          item.data = callback;
          item.grayed = false;
          var c = item.getController("checked");
          if (c) c.selectedIndex = 0;
          return item;
        };
        _proto64.addSeperator = function addSeperator() {
          if (UIConfig.popupMenu_seperator == null) throw new Error("UIConfig.popupMenu_seperator not defined");
          this.list.addItemFromPool(UIConfig.popupMenu_seperator);
        };
        _proto64.getItemName = function getItemName(index) {
          var item = this._list.getChildAt(index);
          return item.name;
        };
        _proto64.setItemText = function setItemText(name, caption) {
          var item = this._list.getChild(name);
          item.title = caption;
        };
        _proto64.setItemVisible = function setItemVisible(name, visible) {
          var item = this._list.getChild(name);
          if (item.visible != visible) {
            item.visible = visible;
            this._list.setBoundsChangedFlag();
          }
        };
        _proto64.setItemGrayed = function setItemGrayed(name, grayed) {
          var item = this._list.getChild(name);
          item.grayed = grayed;
        };
        _proto64.setItemCheckable = function setItemCheckable(name, checkable) {
          var item = this._list.getChild(name);
          var c = item.getController("checked");
          if (c) {
            if (checkable) {
              if (c.selectedIndex == 0) c.selectedIndex = 1;
            } else c.selectedIndex = 0;
          }
        };
        _proto64.setItemChecked = function setItemChecked(name, checked) {
          var item = this._list.getChild(name);
          var c = item.getController("checked");
          if (c) c.selectedIndex = checked ? 2 : 1;
        };
        _proto64.isItemChecked = function isItemChecked(name) {
          var item = this._list.getChild(name);
          var c = item.getController("checked");
          if (c) return c.selectedIndex == 2;else return false;
        };
        _proto64.removeItem = function removeItem(name) {
          var item = this._list.getChild(name);
          if (item) {
            var index = this._list.getChildIndex(item);
            this._list.removeChildToPoolAt(index);
            return true;
          } else return false;
        };
        _proto64.clearItems = function clearItems() {
          this._list.removeChildrenToPool();
        };
        _proto64.show = function show(target, dir) {
          GRoot.inst.showPopup(this.contentPane, target instanceof GRoot ? null : target, dir);
        };
        _proto64.onClickItem = function onClickItem(item, evt) {
          var _this35 = this;
          this._list._partner.callLater(function (dt) {
            _this35.onClickItem2(item, evt);
          }, 0.1);
        };
        _proto64.onClickItem2 = function onClickItem2(item, evt) {
          if (!(item instanceof GButton)) return;
          if (item.grayed) {
            this._list.selectedIndex = -1;
            return;
          }
          var c = item.getController("checked");
          if (c && c.selectedIndex != 0) {
            if (c.selectedIndex == 1) c.selectedIndex = 2;else c.selectedIndex = 1;
          }
          var r = this._contentPane.parent;
          r.hidePopup(this.contentPane);
          if (item.data instanceof Function) item.data(item, evt);
        };
        _proto64.onDisplay = function onDisplay() {
          this._list.selectedIndex = -1;
          this._list.resizeToFit(100000, 10);
        };
        _createClass(PopupMenu, [{
          key: "itemCount",
          get: function get() {
            return this._list.numChildren;
          }
        }, {
          key: "contentPane",
          get: function get() {
            return this._contentPane;
          }
        }, {
          key: "list",
          get: function get() {
            return this._list;
          }
        }]);
        return PopupMenu;
      }());
      var UIObjectFactory = exports('UIObjectFactory', /*#__PURE__*/function () {
        function UIObjectFactory() {}
        UIObjectFactory.setExtension = function setExtension(url, type) {
          if (url == null) throw new Error("Invaild url: " + url);
          var pi = UIPackage.getItemByURL(url);
          if (pi) pi.extensionType = type;
          UIObjectFactory.extensions[url] = type;
        };
        UIObjectFactory.setLoaderExtension = function setLoaderExtension(type) {
          UIObjectFactory.loaderType = type;
        };
        UIObjectFactory.resolveExtension = function resolveExtension(pi) {
          var extensionType = UIObjectFactory.extensions["ui://" + pi.owner.id + pi.id];
          if (!extensionType) extensionType = UIObjectFactory.extensions["ui://" + pi.owner.name + "/" + pi.name];
          if (extensionType) pi.extensionType = extensionType;
        };
        UIObjectFactory.newObject = function newObject(type, userClass) {
          var obj;
          UIObjectFactory.counter++;
          if (typeof type === 'number') {
            switch (type) {
              case ObjectType.Image:
                return new GImage();
              case ObjectType.MovieClip:
                return new GMovieClip();
              case ObjectType.Component:
                return new GComponent();
              case ObjectType.Text:
                return new GTextField();
              case ObjectType.RichText:
                return new GRichTextField();
              case ObjectType.InputText:
                return new GTextInput();
              case ObjectType.Group:
                return new GGroup();
              case ObjectType.List:
                return new GList();
              case ObjectType.Graph:
                return new GGraph();
              case ObjectType.Loader:
                if (UIObjectFactory.loaderType) return new UIObjectFactory.loaderType();else return new GLoader();
              case ObjectType.Button:
                return new GButton();
              case ObjectType.Label:
                return new GLabel();
              case ObjectType.ProgressBar:
                return new GProgressBar();
              case ObjectType.Slider:
                return new GSlider();
              case ObjectType.ScrollBar:
                return new GScrollBar();
              case ObjectType.ComboBox:
                return new GComboBox();
              case ObjectType.Tree:
                return new GTree();
              case ObjectType.Loader3D:
                return new GLoader3D();
              default:
                return null;
            }
          } else {
            if (type.type == PackageItemType.Component) {
              if (userClass) obj = new userClass();else if (type.extensionType) obj = new type.extensionType();else obj = UIObjectFactory.newObject(type.objectType);
            } else obj = UIObjectFactory.newObject(type.objectType);
            if (obj) obj.packageItem = type;
          }
          return obj;
        };
        return UIObjectFactory;
      }());
      UIObjectFactory.counter = 0;
      UIObjectFactory.extensions = {};
      Decls.UIObjectFactory = UIObjectFactory;
      var DragDropManager = exports('DragDropManager', /*#__PURE__*/function () {
        function DragDropManager() {
          this._agent = new GLoader();
          this._agent.draggable = true;
          this._agent.touchable = false; //important
          this._agent.setSize(100, 100);
          this._agent.setPivot(0.5, 0.5, true);
          this._agent.align = AlignType.Center;
          this._agent.verticalAlign = VertAlignType.Middle;
          this._agent.sortingOrder = 1e9;
          this._agent.on(Event.DRAG_END, this.onDragEnd, this);
        }
        var _proto65 = DragDropManager.prototype;
        _proto65.startDrag = function startDrag(source, icon, sourceData, touchId) {
          if (this._agent.parent) return;
          this._sourceData = sourceData;
          this._agent.url = icon;
          GRoot.inst.addChild(this._agent);
          var pt = GRoot.inst.getTouchPosition(touchId);
          pt = GRoot.inst.globalToLocal(pt.x, pt.y);
          this._agent.setPosition(pt.x, pt.y);
          this._agent.startDrag(touchId);
        };
        _proto65.cancel = function cancel() {
          if (this._agent.parent) {
            this._agent.stopDrag();
            GRoot.inst.removeChild(this._agent);
            this._sourceData = null;
          }
        };
        _proto65.onDragEnd = function onDragEnd() {
          if (!this._agent.parent)
            //cancelled
            return;
          GRoot.inst.removeChild(this._agent);
          var sourceData = this._sourceData;
          this._sourceData = null;
          var obj = GRoot.inst.touchTarget;
          while (obj) {
            if (obj.node.hasEventListener(Event.DROP)) {
              obj.requestFocus();
              obj.node.emit(Event.DROP, obj, sourceData);
              return;
            }
            obj = obj.parent;
          }
        };
        _createClass(DragDropManager, [{
          key: "dragAgent",
          get: function get() {
            return this._agent;
          }
        }, {
          key: "dragging",
          get: function get() {
            return this._agent.parent != null;
          }
        }], [{
          key: "inst",
          get: function get() {
            if (!DragDropManager._inst) DragDropManager._inst = new DragDropManager();
            return DragDropManager._inst;
          }
        }]);
        return DragDropManager;
      }());
      var AsyncOperation = exports('AsyncOperation', /*#__PURE__*/function () {
        function AsyncOperation() {}
        var _proto66 = AsyncOperation.prototype;
        _proto66.createObject = function createObject(pkgName, resName) {
          if (this._node) throw 'Already running';
          var pkg = UIPackage.getByName(pkgName);
          if (pkg) {
            var pi = pkg.getItemByName(resName);
            if (!pi) throw new Error("resource not found: " + resName);
            this.internalCreateObject(pi);
          } else throw new Error("package not found: " + pkgName);
        };
        _proto66.createObjectFromURL = function createObjectFromURL(url) {
          if (this._node) throw 'Already running';
          var pi = UIPackage.getItemByURL(url);
          if (pi) this.internalCreateObject(pi);else throw new Error("resource not found: " + url);
        };
        _proto66.cancel = function cancel() {
          if (this._node) {
            this._node.destroy();
            this._node = null;
          }
        };
        _proto66.internalCreateObject = function internalCreateObject(item) {
          this._node = new Node("[AsyncCreating:" + item.name + "]");
          game.addPersistRootNode(this._node);
          this._node.on("#", this.completed, this);
          this._node.addComponent(AsyncOperationRunner).init(item);
        };
        _proto66.completed = function completed(result) {
          this.cancel();
          if (this.callback) this.callback(result);
        };
        return AsyncOperation;
      }());
      var AsyncOperationRunner = /*#__PURE__*/function (_Component4) {
        _inheritsLoose(AsyncOperationRunner, _Component4);
        function AsyncOperationRunner() {
          var _this36;
          _this36 = _Component4.call(this) || this;
          _this36._itemList = new Array();
          _this36._objectPool = new Array();
          return _this36;
        }
        var _proto67 = AsyncOperationRunner.prototype;
        _proto67.init = function init(item) {
          this._itemList.length = 0;
          this._objectPool.length = 0;
          var di = {
            pi: item,
            type: item.objectType
          };
          di.childCount = this.collectComponentChildren(item);
          this._itemList.push(di);
          this._index = 0;
        };
        _proto67.onDestroy = function onDestroy() {
          this._itemList.length = 0;
          var cnt = this._objectPool.length;
          if (cnt > 0) {
            for (var i = 0; i < cnt; i++) this._objectPool[i].dispose();
            this._objectPool.length = 0;
          }
        };
        _proto67.collectComponentChildren = function collectComponentChildren(item) {
          var buffer = item.rawData;
          buffer.seek(0, 2);
          var di;
          var pi;
          var i;
          var dataLen;
          var curPos;
          var pkg;
          var dcnt = buffer.readShort();
          for (i = 0; i < dcnt; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.position;
            buffer.seek(curPos, 0);
            var type = buffer.readByte();
            var src = buffer.readS();
            var pkgId = buffer.readS();
            buffer.position = curPos;
            if (src != null) {
              if (pkgId != null) pkg = UIPackage.getById(pkgId);else pkg = item.owner;
              pi = pkg != null ? pkg.getItemById(src) : null;
              di = {
                pi: pi,
                type: type
              };
              if (pi && pi.type == PackageItemType.Component) di.childCount = this.collectComponentChildren(pi);
            } else {
              di = {
                type: type
              };
              if (type == ObjectType.List)
                //list
                di.listItemCount = this.collectListChildren(buffer);
            }
            this._itemList.push(di);
            buffer.position = curPos + dataLen;
          }
          return dcnt;
        };
        _proto67.collectListChildren = function collectListChildren(buffer) {
          buffer.seek(buffer.position, 8);
          var listItemCount = 0;
          var i;
          var nextPos;
          var url;
          var pi;
          var di;
          var defaultItem = buffer.readS();
          var itemCount = buffer.readShort();
          for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            url = buffer.readS();
            if (url == null) url = defaultItem;
            if (url) {
              pi = UIPackage.getItemByURL(url);
              if (pi) {
                di = {
                  pi: pi,
                  type: pi.objectType
                };
                if (pi.type == PackageItemType.Component) di.childCount = this.collectComponentChildren(pi);
                this._itemList.push(di);
                listItemCount++;
              }
            }
            buffer.position = nextPos;
          }
          return listItemCount;
        };
        _proto67.update = function update() {
          var obj;
          var di;
          var poolStart;
          var k;
          var t = game.totalTime / 1000;
          var frameTime = UIConfig.frameTimeForAsyncUIConstruction;
          var totalItems = this._itemList.length;
          while (this._index < totalItems) {
            di = this._itemList[this._index];
            if (di.pi) {
              obj = UIObjectFactory.newObject(di.pi);
              this._objectPool.push(obj);
              constructingDepth.n++;
              if (di.pi.type == PackageItemType.Component) {
                poolStart = this._objectPool.length - di.childCount - 1;
                obj.constructFromResource2(this._objectPool, poolStart);
                this._objectPool.splice(poolStart, di.childCount);
              } else {
                obj.constructFromResource();
              }
              constructingDepth.n--;
            } else {
              obj = UIObjectFactory.newObject(di.type);
              this._objectPool.push(obj);
              if (di.type == ObjectType.List && di.listItemCount > 0) {
                poolStart = this._objectPool.length - di.listItemCount - 1;
                for (k = 0; k < di.listItemCount; k++)
                //把他们都放到pool里，这样GList在创建时就不需要创建对象了
                obj.itemPool.returnObject(this._objectPool[k + poolStart]);
                this._objectPool.splice(poolStart, di.listItemCount);
              }
            }
            this._index++;
            if (this._index % 5 == 0 && game.totalTime / 1000 - t >= frameTime) return;
          }
          var result = this._objectPool[0];
          this._itemList.length = 0;
          this._objectPool.length = 0;
          this.node.emit("#", result);
        };
        return AsyncOperationRunner;
      }(Component);
    }
  };
});

System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        arrayLikeToArray: _arrayLikeToArray,
        assertThisInitialized: _assertThisInitialized,
        asyncToGenerator: _asyncToGenerator,
        construct: _construct,
        createClass: _createClass,
        createForOfIteratorHelperLoose: _createForOfIteratorHelperLoose,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        isNativeReflectConstruct: _isNativeReflectConstruct,
        regeneratorRuntime: _regeneratorRuntime,
        setPrototypeOf: _setPrototypeOf,
        toPrimitive: _toPrimitive,
        toPropertyKey: _toPropertyKey,
        unsupportedIterableToArray: _unsupportedIterableToArray
      });
      function _regeneratorRuntime() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        _regeneratorRuntime = exports('regeneratorRuntime', function () {
          return e;
        });
        var t,
          e = {},
          r = Object.prototype,
          n = r.hasOwnProperty,
          o = Object.defineProperty || function (t, e, r) {
            t[e] = r.value;
          },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function define(t, e, r) {
          return Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }), t[e];
        }
        try {
          define({}, "");
        } catch (t) {
          define = function (t, e, r) {
            return t[e] = r;
          };
        }
        function wrap(t, e, r, n) {
          var i = e && e.prototype instanceof Generator ? e : Generator,
            a = Object.create(i.prototype),
            c = new Context(n || []);
          return o(a, "_invoke", {
            value: makeInvokeMethod(t, r, c)
          }), a;
        }
        function tryCatch(t, e, r) {
          try {
            return {
              type: "normal",
              arg: t.call(e, r)
            };
          } catch (t) {
            return {
              type: "throw",
              arg: t
            };
          }
        }
        e.wrap = wrap;
        var h = "suspendedStart",
          l = "suspendedYield",
          f = "executing",
          s = "completed",
          y = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var p = {};
        define(p, a, function () {
          return this;
        });
        var d = Object.getPrototypeOf,
          v = d && d(d(values([])));
        v && v !== r && n.call(v, a) && (p = v);
        var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
        function defineIteratorMethods(t) {
          ["next", "throw", "return"].forEach(function (e) {
            define(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function AsyncIterator(t, e) {
          function invoke(r, o, i, a) {
            var c = tryCatch(t[r], t, o);
            if ("throw" !== c.type) {
              var u = c.arg,
                h = u.value;
              return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
                invoke("next", t, i, a);
              }, function (t) {
                invoke("throw", t, i, a);
              }) : e.resolve(h).then(function (t) {
                u.value = t, i(u);
              }, function (t) {
                return invoke("throw", t, i, a);
              });
            }
            a(c.arg);
          }
          var r;
          o(this, "_invoke", {
            value: function (t, n) {
              function callInvokeWithMethodAndArg() {
                return new e(function (e, r) {
                  invoke(t, n, e, r);
                });
              }
              return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
          });
        }
        function makeInvokeMethod(e, r, n) {
          var o = h;
          return function (i, a) {
            if (o === f) throw new Error("Generator is already running");
            if (o === s) {
              if ("throw" === i) throw a;
              return {
                value: t,
                done: !0
              };
            }
            for (n.method = i, n.arg = a;;) {
              var c = n.delegate;
              if (c) {
                var u = maybeInvokeDelegate(c, n);
                if (u) {
                  if (u === y) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
                if (o === h) throw o = s, n.arg;
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = f;
              var p = tryCatch(e, r, n);
              if ("normal" === p.type) {
                if (o = n.done ? s : l, p.arg === y) continue;
                return {
                  value: p.arg,
                  done: n.done
                };
              }
              "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
            }
          };
        }
        function maybeInvokeDelegate(e, r) {
          var n = r.method,
            o = e.iterator[n];
          if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
          var i = tryCatch(o, e.iterator, r.arg);
          if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
          var a = i.arg;
          return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
        }
        function pushTryEntry(t) {
          var e = {
            tryLoc: t[0]
          };
          1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
        }
        function resetTryEntry(t) {
          var e = t.completion || {};
          e.type = "normal", delete e.arg, t.completion = e;
        }
        function Context(t) {
          this.tryEntries = [{
            tryLoc: "root"
          }], t.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(e) {
          if (e || "" === e) {
            var r = e[a];
            if (r) return r.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var o = -1,
                i = function next() {
                  for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                  return next.value = t, next.done = !0, next;
                };
              return i.next = i;
            }
          }
          throw new TypeError(typeof e + " is not iterable");
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
          value: GeneratorFunctionPrototype,
          configurable: !0
        }), o(GeneratorFunctionPrototype, "constructor", {
          value: GeneratorFunction,
          configurable: !0
        }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
        }, e.mark = function (t) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
        }, e.awrap = function (t) {
          return {
            __await: t
          };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
          return this;
        }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new AsyncIterator(wrap(t, r, n, o), i);
          return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
        }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
          return this;
        }), define(g, "toString", function () {
          return "[object Generator]";
        }), e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return r.reverse(), function next() {
            for (; r.length;) {
              var t = r.pop();
              if (t in e) return next.value = t, next.done = !1, next;
            }
            return next.done = !0, next;
          };
        }, e.values = values, Context.prototype = {
          constructor: Context,
          reset: function (e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function handle(n, o) {
              return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var i = this.tryEntries[o],
                a = i.completion;
              if ("root" === i.tryLoc) return handle("end");
              if (i.tryLoc <= this.prev) {
                var c = n.call(i, "catchLoc"),
                  u = n.call(i, "finallyLoc");
                if (c && u) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                } else if (c) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                } else {
                  if (!u) throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
              if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                var i = o;
                break;
              }
            }
            i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
            var a = i ? i.completion : {};
            return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  resetTryEntry(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return this.delegate = {
              iterator: values(e),
              resultName: r,
              nextLoc: n
            }, "next" === this.method && (this.arg = t), y;
          }
        }, e;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
          });
        };
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = exports('construct', Reflect.construct.bind());
        } else {
          _construct = exports('construct', function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          });
        }
        return _construct.apply(null, arguments);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (it) return (it = it.call(o)).next.bind(it);
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
    }
  };
});

} }; });