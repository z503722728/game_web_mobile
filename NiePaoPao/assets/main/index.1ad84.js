System.register("chunks:///_virtual/CommonExport.ts", ['cc', './drongo-cc.mjs', './fairygui.mjs', './drongo-gui.mjs', './VibrationManager.ts', './ToyControlInterface.ts'], function (exports) {
  var cclegacy, cc, drongoCc, fairygui, drongoGui;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      cc = module;
      exports('cc', module);
    }, function (module) {
      drongoCc = module;
      exports('drongoCC', module);
    }, function (module) {
      fairygui = module;
      exports('fgui', module);
    }, function (module) {
      drongoGui = module;
      exports('drongoGui', module);
    }, function (module) {
      exports('VibrationManager', module.VibrationManager);
    }, function (module) {
      exports('ToyControlInterface', module.ToyControlInterface);
    }],
    execute: function () {
      cclegacy._RF.push({}, "2a54bPglDFEaKMITwv2aDNG", "CommonExport", undefined);
      {
        self["_cc"] = cc;
        self["fgui"] = fairygui;
        self["drongoCC"] = drongoCc;
        self["drongoGui"] = drongoGui;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ConfigBase.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6aa16Nf6rJP87ezxWaLdhoO", "ConfigBase", undefined);
      var ConfigBase = exports('default', /*#__PURE__*/function () {
        function ConfigBase() {}
        var _proto = ConfigBase.prototype;
        // 自动初始化数据
        _proto.init = function init(data) {
          var _this = this;
          if (data && typeof data === 'object') {
            Object.keys(data).forEach(function (key) {
              if (_this.hasOwnProperty(key)) {
                _this[key] = data[key];
              }
            });
          }
        };
        return ConfigBase;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ConfigMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, JsonAsset, autoBindToWindow, mk_instance_base, mk_asset$1;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
      mk_instance_base = module.instance_base;
      mk_asset$1 = module.asset;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "ab49fwHf11ArqXDrPGKAbkd", "ConfigMgr", undefined);
      var ConfigMgr = autoBindToWindow(_class = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(ConfigMgr, _instance_base);
        function ConfigMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          _this.configs = new Map();
          _this.configAssets = new Map();
          return _this;
        }
        var _proto = ConfigMgr.prototype;
        _proto.loadConfig = /*#__PURE__*/function () {
          var _loadConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(configCls) {
            var configName, config;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  configName = configCls.name;
                  if (!this.configs.has(configName)) {
                    _context.next = 3;
                    break;
                  }
                  return _context.abrupt("return");
                case 3:
                  _context.next = 5;
                  return mk_asset$1.get("Config/" + configName, JsonAsset, null);
                case 5:
                  config = _context.sent;
                  this.initConfig(configCls, config);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function loadConfig(_x) {
            return _loadConfig.apply(this, arguments);
          }
          return loadConfig;
        }();
        _proto.initConfig = function initConfig(configCls, config) {
          var configName = configCls.name;
          var configMap = new Map();
          for (var key in config.json) {
            var value = config.json[key];
            var configInstance = new configCls();
            configInstance.init(value);
            configMap.set(parseInt(key), configInstance);
          }
          config.decRef();
          this.configs.set(configName, configMap);
        };
        _proto.initConfigs = /*#__PURE__*/function () {
          var _initConfigs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dir) {
            var configs, _iterator, _step, config, configName;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return mk_asset$1.get_dir(dir, JsonAsset, null);
                case 2:
                  configs = _context2.sent;
                  for (_iterator = _createForOfIteratorHelperLoose(configs); !(_step = _iterator()).done;) {
                    config = _step.value;
                    configName = config.name.replace(".json", "");
                    this.configAssets.set(configName, config);
                  }
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function initConfigs(_x2) {
            return _initConfigs.apply(this, arguments);
          }
          return initConfigs;
        }();
        _proto.getConfig = function getConfig(configCls, id) {
          var configName = configCls.name;
          // 检查configAssets里是否存在
          var configAsset = this.configAssets.get(configName);
          if (configAsset) {
            this.initConfig(configCls, configAsset);
            this.configAssets["delete"](configName);
          }
          var configMap = this.configs.get(configName);
          if (configMap) {
            return configMap.get(id);
          }
          return null;
        };
        _proto.getAllConfigs = function getAllConfigs(configCls) {
          var configName = configCls.name;
          // 检查configAssets里是否存在
          var configAsset = this.configAssets.get(configName);
          if (configAsset) {
            this.initConfig(configCls, configAsset);
            this.configAssets["delete"](configName);
          }
          var configMap = this.configs.get(configName);
          if (configMap) {
            return configMap;
          }
          return null;
        };
        _proto.queryOne = function queryOne(configCls, query) {
          var confs = this.getAllConfigs(configCls);
          for (var _iterator2 = _createForOfIteratorHelperLoose(confs.values()), _step2; !(_step2 = _iterator2()).done;) {
            var _conf = _step2.value;
            if (query(_conf)) {
              return _conf;
            }
          }
          return null;
        };
        _proto.queryAll = function queryAll(configCls, query) {
          var confs = this.getAllConfigs(configCls);
          var ret = [];
          for (var _iterator3 = _createForOfIteratorHelperLoose(confs.values()), _step3; !(_step3 = _iterator3()).done;) {
            var _conf2 = _step3.value;
            if (query(_conf2)) {
              ret.push(_conf2);
            }
          }
          return ret;
        };
        return ConfigMgr;
      }(mk_instance_base)) || _class;
      var configMgr = exports('configMgr', ConfigMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Area_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Area.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Game_Area;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_Area = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "2719erLKBNHOIOaqt72NNEV", "Game_Area_Logic", undefined);
      var Game_Area_Logic = exports('default', (_dec = addLogic(Game_Area), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_Area_Logic, _GUILogicBase);
        function Game_Area_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_Area_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Game_Area_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Area.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GComponent, vm;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "14282Nu/MlOFKSnZ1ZP2DnK", "Game_Area", undefined);
      var Game_Area = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_Area, _fgui$GComponent);
        function Game_Area() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_bg = void 0;
          return _this;
        }
        Game_Area.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Area");
        };
        var _proto = Game_Area.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChild("bg");
        };
        return Game_Area;
      }(GComponent), _class2.URL = "ui://6gpz43l1e0zeq", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Bubbble_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Bubbble.ts'], function (exports) {
  var _inheritsLoose, cclegacy, tween, Vec3, GUILogicBase, addLogic, Game_Bubbble;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      GUILogicBase = module.GUILogicBase;
      addLogic = module.addLogic;
    }, function (module) {
      Game_Bubbble = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "308c3grMC5EQZ9pIORNHPY8", "Game_Bubbble_Logic", undefined);
      var Game_Bubbble_Logic = exports('default', (_dec = addLogic(Game_Bubbble), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_Bubbble_Logic, _GUILogicBase);
        function Game_Bubbble_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.lastState = 0;
          return _this;
        }
        var _proto = Game_Bubbble_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 初始化时隐藏爆炸效果
          this.UI.m_baoZha.visible = false;
          this.lastState = this.UI.m_c1.selectedIndex;

          // 使用 Controller 官方的 onChanged 方法监听状态变化
          this.UI.m_c1.onChanged(this.onStateChanged, this);
        };
        _proto.onDestroy = function onDestroy() {
          _GUILogicBase.prototype.onDestroy.call(this);
          this.UI.m_c1.offChanged(this.onStateChanged, this);
        }

        /**
         * 状态变化监听
         */;
        _proto.onStateChanged = function onStateChanged() {
          var currentState = this.UI.m_c1.selectedIndex;
          // 从未戳破(0)变为戳破(1-3)时播放动画
          if (this.lastState === 0 && currentState > 0) {
            this.playPopAnimation();
          }
          this.lastState = currentState;
        }

        /**
         * 播放泡泡爆炸动画
         * 爆炸效果：从小放大，然后快速缩小消失
         */;
        _proto.playPopAnimation = function playPopAnimation() {
          var _this2 = this;
          // 显示爆炸图片
          this.UI.m_baoZha.visible = true;
          this.UI.m_baoZha.alpha = 1;

          // 获取爆炸图片的节点
          var baoZhaNode = this.UI.m_baoZha.node;

          // 爆炸动画：从0.5倍放大到1.2倍，然后快速缩小到0
          baoZhaNode.setScale(0.5, 0.5, 1);
          tween(baoZhaNode).to(0.15, {
            scale: new Vec3(1.2, 1.2, 1)
          }, {
            easing: "sineOut"
          }).to(0.1, {
            scale: new Vec3(0, 0, 1)
          }, {
            easing: "sineIn"
          }).call(function () {
            // 动画结束后隐藏
            _this2.UI.m_baoZha.visible = false;
          }).start();
        };
        return Game_Bubbble_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Bubbble.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GComponent, vm;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "a37d3oxQ5NFRLxjx9QM0o88", "Game_Bubbble", undefined);
      var Game_Bubbble = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_Bubbble, _fgui$GComponent);
        function Game_Bubbble() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          _this.m_baoZha = void 0;
          return _this;
        }
        Game_Bubbble.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Bubbble");
        };
        var _proto = Game_Bubbble.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
          this.m_baoZha = this.getChild("baoZha");
        };
        return Game_Bubbble;
      }(GComponent), _class2.URL = "ui://6gpz43l1e0zeo", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GamePage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_GamePage.ts', './Game_Bubbble.ts', './VibrationManager.ts', './ToyControlInterface.ts', './fairygui.mjs', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, tween, Vec3, view, Node, AudioSource, addLogic, GUILogicBase, Game_GamePage, Game_Bubbble, VibrationManager, ToyControlInterface, GRoot, Event, UIPackage, TickerManager, log, Timer;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Vec3 = module.Vec3;
      view = module.view;
      Node = module.Node;
      AudioSource = module.AudioSource;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      Game_Bubbble = module.default;
    }, function (module) {
      VibrationManager = module.VibrationManager;
    }, function (module) {
      ToyControlInterface = module.ToyControlInterface;
    }, function (module) {
      GRoot = module.GRoot;
      Event = module.Event;
      UIPackage = module.UIPackage;
    }, function (module) {
      TickerManager = module.TickerManager;
      log = module.log;
      Timer = module.Timer;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "02252IqFLxL2LbHXhLw4tqp", "Game_GamePage_Logic", undefined);
      var Game_GamePage_Logic = exports('default', (_dec = addLogic(Game_GamePage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_GamePage_Logic, _GUILogicBase);
        function Game_GamePage_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          // 泡泡网格配置
          _this.COLS = 9;
          // 列数
          _this.ROWS = 10;
          // 行数
          _this.PADDING = 20;
          // 容器内间距（padding）
          _this.SPACING = 5;
          // 泡泡之间的间距
          _this.COMBO_TIMEOUT = 1.0;
          // 连击超时时间（秒）- 调整为1秒更合理
          // 动态计算的气泡尺寸
          _this.bubbleWidth = 0;
          _this.bubbleHeight = 0;
          // 游戏状态
          _this.bubbles = [];
          // 当前区域的90个泡泡实例
          _this.poppedCount = 0;
          // 已戳破数量
          _this.comboCount = 0;
          // 连击次数
          _this.lastClickTime = 0;
          // 上次点击时间（秒，使用 Timer.currentTime）
          _this.comboActive = false;
          // 连击是否激活
          _this.goInitialY = 0;
          // GO 图标的初始 Y 坐标
          _this.progressObj = {
            value: 0
          };
          // 进度条缓动对象
          _this.touchedBubbles = new Set();
          // 本次触摸已处理的泡泡
          _this.bubblePopSound = null;
          // 缓存音效资源
          _this.audioSourcePool = [];
          // 音效源池（限制同时播放数量）
          _this.audioSourceIndex = 0;
          // 当前使用的音效源索引
          _this.MAX_AUDIO_INSTANCES = 10;
          return _this;
        }
        var _proto = Game_GamePage_Logic.prototype;
        // 最大同时播放音效数量（防止炸音）
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          // 初始化震动管理器
          VibrationManager.init();

          // 适配背景尺寸
          this.adaptBackgroundSize();

          // 初始化UI状态
          this.UI.m_tiShi.selectedIndex = 0; // 默认显示 GO 图标
          this.UI.m_progress.value = 0; // 进度条归零
          this.UI.m_num.visible = false; // 隐藏连击数字

          // 初始化表情图标的显示状态
          this.UI.m_Go.visible = true;
          this.UI.m_Go.alpha = 1;
          this.UI.m_tishiImg.visible = false;
          this.UI.m_tishiImg.alpha = 0;

          // 启动 GO 图标的循环跳动动画
          TickerManager.callNextFrame(function () {
            _this2.startGoIdleAnimation();
          }, this);

          // 初始化泡泡网格
          this.initBubbleGrid();

          // 添加触摸滑动支持
          this.setupTouchEvents();

          // 初始化音效系统
          this.initAudioSystem();
          this._log.log('游戏初始化完成');
        }

        /**
         * GO 图标的常态循环跳动动画
         */;
        _proto.startGoIdleAnimation = function startGoIdleAnimation() {
          var goNode = this.UI.m_Go.node;

          // 停止之前的动画
          tween(goNode).stop();

          // 保存初始位置（第一次调用时）
          if (this.goInitialY === 0) {
            this.goInitialY = goNode.position.y;
          }

          // 缓慢的上下浮动 + 缩放循环动画
          goNode.setScale(1, 1, 1);
          var initialX = goNode.position.x;
          tween(goNode).to(1.2, {
            scale: new Vec3(1.05, 1.05, 1),
            position: new Vec3(initialX, this.goInitialY + 5, 0)
          }, {
            easing: "sineInOut"
          }).to(1.2, {
            scale: new Vec3(1, 1, 1),
            position: new Vec3(initialX, this.goInitialY, 0)
          }, {
            easing: "sineInOut"
          }).union() // 组合成一个循环
          .repeatForever() // 永久循环
          .start();
        }

        /**
         * 停止 GO 图标的循环动画
         */;
        _proto.stopGoIdleAnimation = function stopGoIdleAnimation() {
          var goNode = this.UI.m_Go.node;
          tween(goNode).stop();
          // 恢复初始状态
          goNode.setScale(1, 1, 1);
        }

        /**
         * 根据FairyGUI的UI缩放系统适配背景大小
         */;
        _proto.adaptBackgroundSize = function adaptBackgroundSize() {
          if (!this.UI.m_bg) {
            this._log.log("m_bg未设置，跳过背景适配");
            return;
          }
          try {
            // 获取FairyGUI的根节点尺寸（已经考虑了缩放）
            var fguiRoot = GRoot.inst;
            var rootWidth = fguiRoot.width;
            var rootHeight = fguiRoot.height;

            // 获取设计分辨率作为参考
            var designSize = view.getDesignResolutionSize();

            // 获取屏幕窗口大小
            var screenSize = view.getVisibleSize();
            log("[\u80CC\u666F\u9002\u914D] FairyGUI\u4FE1\u606F:\n\t\t\t\tFGUI\u6839\u8282\u70B9\u5C3A\u5BF8: " + rootWidth + " x " + rootHeight + "\n\t\t\t\t\u8BBE\u8BA1\u5206\u8FA8\u7387: " + designSize.width + " x " + designSize.height + "\n\t\t\t\t\u5C4F\u5E55\u5C3A\u5BF8: " + screenSize.width + " x " + screenSize.height);

            // 使用FairyGUI的根节点尺寸来计算缩放比例
            var widthScale = rootWidth / designSize.width;
            var heightScale = rootHeight / designSize.height;

            // 直接按照FGUI根节点尺寸设置背景的缩放，分别拉满宽度和高度
            this.UI.m_bg.setScale(widthScale, heightScale);
            log("[\u80CC\u666F\u9002\u914D] \u5B8C\u6210:\n\t\t\t\t\u5BBD\u5EA6\u7F29\u653E: " + widthScale.toFixed(3) + "\n\t\t\t\t\u9AD8\u5EA6\u7F29\u653E: " + heightScale.toFixed(3) + "\n\t\t\t\t\u6700\u7EC8\u80CC\u666F\u5C3A\u5BF8: " + (designSize.width * widthScale).toFixed(1) + " x " + (designSize.height * heightScale).toFixed(1));
          } catch (error) {
            this._log.log("背景适配失败，回退到基础适配:", error);

            // 回退方案：使用基础的视图尺寸
            var visibleSize = view.getVisibleSize();
            var _designSize = view.getDesignResolutionSize();
            var _widthScale = visibleSize.width / _designSize.width;
            var _heightScale = visibleSize.height / _designSize.height;
            this.UI.m_bg.setScale(_widthScale, _heightScale);
          }
        }

        /**
         * 初始化泡泡网格（9列 x 10行 = 90个泡泡）
         */;
        _proto.initBubbleGrid = function initBubbleGrid() {
          var _this3 = this;
          // 清空容器
          this.UI.m_BubbleArea.removeChildren();
          this.bubbles = [];

          // 根据容器尺寸自适应计算气泡大小
          this.calculateBubbleSize();

          // 生成90个泡泡
          for (var row = 0; row < this.ROWS; row++) {
            for (var col = 0; col < this.COLS; col++) {
              var bubble = Game_Bubbble.createInstance();

              // 计算位置（考虑 padding 和 spacing）
              var x = this.PADDING + col * (this.bubbleWidth + this.SPACING);
              var y = this.PADDING + row * (this.bubbleHeight + this.SPACING);
              bubble.setPosition(x, y);

              // 设置气泡大小（确保显示正确）
              bubble.setSize(this.bubbleWidth, this.bubbleHeight);

              // 添加到容器
              this.UI.m_BubbleArea.addChild(bubble);
              this.bubbles.push(bubble);

              // 绑定点击事件
              // bubble.onClick(() => this.onBubbleClick(bubble), this);
            }
          }

          // 气泡区域左右居中
          TickerManager.callNextFrame(function () {
            _this3.centerBubbleArea();
          }, this);
          this._log.log("\u6CE1\u6CE1\u7F51\u683C\u521D\u59CB\u5316\u5B8C\u6210: " + this.COLS + "x" + this.ROWS + " = " + this.bubbles.length + "\u4E2A, \u6C14\u6CE1\u5C3A\u5BF8: " + this.bubbleWidth.toFixed(1) + "x" + this.bubbleHeight.toFixed(1));
        }

        /**
         * 根据容器尺寸自适应计算气泡大小
         */;
        _proto.calculateBubbleSize = function calculateBubbleSize() {
          var area = this.UI.m_BubbleArea;

          // 获取容器的可用空间（减去 padding）
          var availableWidth = area.width - this.PADDING * 2;
          var availableHeight = area.height - this.PADDING * 2;

          // 计算单个气泡的尺寸（减去间距）
          // 宽度 = (可用宽度 - (列数-1)*间距) / 列数
          this.bubbleWidth = (availableWidth - (this.COLS - 1) * this.SPACING) / this.COLS;

          // 高度 = (可用高度 - (行数-1)*间距) / 行数
          this.bubbleHeight = (availableHeight - (this.ROWS - 1) * this.SPACING) / this.ROWS;
          log("[\u6C14\u6CE1\u5E03\u5C40] \u81EA\u9002\u5E94\u8BA1\u7B97:\n\t\t\t\u5BB9\u5668\u5C3A\u5BF8: " + area.width + "x" + area.height + "\n\t\t\t\u53EF\u7528\u7A7A\u95F4: " + availableWidth + "x" + availableHeight + "\n\t\t\t\u5185\u95F4\u8DDD(padding): " + this.PADDING + "\n\t\t\t\u6C14\u6CE1\u95F4\u8DDD(spacing): " + this.SPACING + "\n\t\t\t\u6C14\u6CE1\u5C3A\u5BF8: " + this.bubbleWidth.toFixed(1) + "x" + this.bubbleHeight.toFixed(1));
        }

        /**
         * 将气泡区域在屏幕左右居中
         */;
        _proto.centerBubbleArea = function centerBubbleArea() {
          // 使用 FairyGUI 的 center 方法，只居中水平方向
          // restraint 参数为 false 表示不限制在父容器内，可以完全居中
          var area = this.UI.m_BubbleArea;
          var parent = area.parent;
          if (parent) {
            // 计算居中位置（只调整 x 坐标）
            var centerX = (parent.width - area.width) / 2;
            area.x = centerX;
            log("[\u6C14\u6CE1\u533A\u57DF] \u5DE6\u53F3\u5C45\u4E2D: x=" + centerX.toFixed(1) + ", \u7236\u5BB9\u5668\u5BBD\u5EA6=" + parent.width + ", \u533A\u57DF\u5BBD\u5EA6=" + area.width);
          }
        }

        /**
         * 设置触摸滑动事件
         */;
        _proto.setupTouchEvents = function setupTouchEvents() {
          var _this4 = this;
          var area = this.UI.m_BubbleArea;

          // 触摸开始：清空已触摸泡泡记录
          area.on(Event.TOUCH_BEGIN, function (evt) {
            _this4.touchedBubbles.clear();
            _this4.handleTouchMove(evt);
            evt.captureTouch();
          }, this);

          // 触摸移动：检测经过的泡泡
          area.on(Event.TOUCH_MOVE, function (evt) {
            _this4.handleTouchMove(evt);
          }, this);

          // 触摸结束：清空已触摸泡泡记录
          area.on(Event.TOUCH_END, function () {
            _this4.touchedBubbles.clear();
          }, this);
          this._log.log('触摸滑动事件已设置');
        }

        /**
         * 处理触摸移动事件
         */;
        _proto.handleTouchMove = function handleTouchMove(evt) {
          // 获取触摸位置（全局坐标）
          var touchPos = GRoot.inst.inputProcessor.getTouchPosition();

          // 转换为 BubbleArea 中的本地坐标
          var localPos = this.UI.m_BubbleArea.globalToLocal(touchPos.x, touchPos.y);

          // 遍历所有泡泡，检查触摸点是否在泡泡范围内
          for (var _iterator = _createForOfIteratorHelperLoose(this.bubbles), _step; !(_step = _iterator()).done;) {
            var bubble = _step.value;
            // 如果泡泡已经被本次触摸处理过，跳过
            if (this.touchedBubbles.has(bubble)) continue;

            // 如果泡泡已戳破，跳过
            if (bubble.m_c1.selectedIndex !== 0) continue;

            // 检查触摸点是否在泡泡范围内
            if (this.isTouchInBubble(localPos.x, localPos.y, bubble)) {
              // 标记为已处理
              this.touchedBubbles.add(bubble);

              // 触发泡泡点击处理
              this.onBubbleClick(bubble);
              break;
            }
          }
        }

        /**
         * 检查触摸点是否在泡泡范围内
         */;
        _proto.isTouchInBubble = function isTouchInBubble(touchX, touchY, bubble) {
          var bubbleX = bubble.x;
          var bubbleY = bubble.y;
          var bubbleWidth = bubble.width;
          var bubbleHeight = bubble.height;
          return touchX >= bubbleX && touchX <= bubbleX + bubbleWidth && touchY >= bubbleY && touchY <= bubbleY + bubbleHeight;
        }

        /**
         * 泡泡点击处理
         */;
        _proto.onBubbleClick = function onBubbleClick(bubble) {
          var _this5 = this;
          // 如果已经戳破，忽略
          if (bubble.m_c1.selectedIndex !== 0) return;

          // 1. 随机切换到戳破状态（1-3）
          // Logic 会自动监听状态变化并播放爆炸动画
          var randomState = Math.floor(Math.random() * 3) + 1;
          bubble.m_c1.selectedIndex = randomState;

          // 2. 播放音效
          this.playBubblePopSound();

          // 3. 触发震动
          VibrationManager.vibrate(50); // 震动50ms

          // 4. 更新进度（带缓动动画）
          this.poppedCount++;
          this.updateProgress();

          // 5. 处理连击逻辑
          this.handleCombo();

          // 6. 检查是否全部戳破
          if (this.poppedCount >= this.bubbles.length) {
            this.scheduleOnce(function () {
              _this5.refreshPage();
            }, 0.5); // 延迟0.5秒再刷新页面
          }

          // 7. 预留：通知玩具控制器
          ToyControlInterface.onComboChange(this.comboCount, this.getComboSpeed());
        }

        /**
         * 初始化音效系统（创建受限音效池，防止炸音）
         */;
        _proto.initAudioSystem = function initAudioSystem() {
          try {
            // 加载音效资源
            var uiPackage = UIPackage.getByName("Game");
            this.bubblePopSound = uiPackage.getItemAssetByName("bubble-pop");
            if (!this.bubblePopSound) {
              this._log.log('音效资源未找到');
              return;
            }

            // 创建音效容器节点
            var audioContainer = new Node('AudioSourcePool');
            audioContainer.setParent(this.UI.node);

            // 创建固定数量的 AudioSource 实例（防止同时播放过多导致炸音）
            for (var i = 0; i < this.MAX_AUDIO_INSTANCES; i++) {
              var audioSource = audioContainer.addComponent(AudioSource);
              audioSource.clip = this.bubblePopSound;
              audioSource.loop = false;
              audioSource.playOnAwake = false;
              audioSource.volume = 1.0;
              this.audioSourcePool.push(audioSource);
            }
            this._log.log("\u97F3\u6548\u7CFB\u7EDF\u521D\u59CB\u5316\u6210\u529F\uFF0C\u521B\u5EFA\u4E86 " + this.MAX_AUDIO_INSTANCES + " \u4E2A\u97F3\u6548\u5B9E\u4F8B\uFF08\u9632\u70B8\u97F3\uFF09");
          } catch (e) {
            this._log.log('音效系统初始化失败:', e);
          }
        }

        /**
         * 播放泡泡爆破音效（轮询使用音效池，达到上限时停止旧音效）
         */;
        _proto.playBubblePopSound = function playBubblePopSound() {
          if (this.audioSourcePool.length === 0) return;
          try {
            // 轮询获取下一个音效源
            var audioSource = this.audioSourcePool[this.audioSourceIndex];

            // 如果当前音效源正在播放，先停止（达到上限时替换最旧的音效）
            if (audioSource.playing) {
              audioSource.stop();
            }

            // 播放新音效
            audioSource.play();

            // 移动到下一个音效源索引（循环使用）
            this.audioSourceIndex = (this.audioSourceIndex + 1) % this.audioSourcePool.length;
          } catch (e) {
            this._log.log('播放音效失败:', e);
          }
        }

        /**
         * 更新进度条（带平滑缓动效果）
         */;
        _proto.updateProgress = function updateProgress() {
          var _this6 = this;
          // 计算目标进度（0-100）
          var targetProgress = this.poppedCount / this.bubbles.length * 100;

          // 停止之前的缓动动画
          tween(this.progressObj).stop();

          // 使用缓动动画平滑过渡到目标进度
          tween(this.progressObj).to(0.3, {
            value: targetProgress
          }, {
            easing: "sineOut",
            onUpdate: function onUpdate() {
              _this6.UI.m_progress.value = _this6.progressObj.value;
            }
          }).start();
        }

        /**
         * 每帧检测连击超时
         */;
        _proto.update = function update(dt) {
          if (!this.comboActive) return;
          var now = Timer.currentTime;
          var timeDiff = now - this.lastClickTime;

          // 超过500ms，连击超时
          if (timeDiff > this.COMBO_TIMEOUT) {
            this.hideComboUI();
            this.comboActive = false;
            ToyControlInterface.onComboStop();
          }
        }

        /**
         * 处理连击逻辑
         */;
        _proto.handleCombo = function handleCombo() {
          var now = Timer.currentTime;
          var timeDiff = now - this.lastClickTime;

          // 如果间隔小于500ms，增加连击
          if (timeDiff < this.COMBO_TIMEOUT && this.lastClickTime > 0) {
            this.comboCount++;
          } else {
            this.comboCount = 1; // 重新开始
            this.showComboUI(); // 显示连击UI
          }

          this.lastClickTime = now;
          this.comboActive = true;

          // 更新连击显示
          this.updateComboDisplay();
        }

        /**
         * 更新连击显示（带放大回弹动画）
         */;
        _proto.updateComboDisplay = function updateComboDisplay() {
          // 更新连击数字（x 前缀 + 数字）
          this.UI.m_num.text = "x" + this.comboCount;
          this.UI.m_num.visible = true;

          // 数字放大回弹动画
          var numNode = this.UI.m_num.node;
          numNode.setScale(1.5, 1.5, 1);
          tween(numNode).to(0.2, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "backOut"
          }).start();

          // 表情图标节奏动画
          this.playTishiAnimation();

          // 根据连击速度切换表情（预留扩展）
          var speed = this.getComboSpeed();
        }

        /**
         * 播放表情图标的节奏动画
         * 根据连击数创造不同的节奏感
         */;
        _proto.playTishiAnimation = function playTishiAnimation() {
          var tishiNode = this.UI.m_tishiImg.node;

          // 停止之前的所有 tween 动画
          tween(tishiNode).stop();

          // 根据连击数调整动画强度
          var speed = this.getComboSpeed();
          var scaleAmount = 1.2; // 默认缩放倍数
          var duration = 0.15; // 默认动画时长

          if (speed >= 10) {
            // 高速连击：更夸张的动画
            scaleAmount = 1.4;
            duration = 0.12;
          } else if (speed >= 5) {
            // 中速连击：适中动画
            scaleAmount = 1.3;
            duration = 0.13;
          }

          // 弹跳动画 + 旋转
          tishiNode.setScale(1, 1, 1);
          tween(tishiNode).to(duration, {
            scale: new Vec3(scaleAmount, scaleAmount, 1),
            eulerAngles: new Vec3(0, 0, 5) // 轻微旋转
          }, {
            easing: "sineOut"
          }).to(duration, {
            scale: new Vec3(1, 1, 1),
            eulerAngles: new Vec3(0, 0, -5) // 反向旋转
          }, {
            easing: "sineIn"
          }).to(duration * 0.5, {
            eulerAngles: new Vec3(0, 0, 0) // 恢复
          }, {
            easing: "sineOut"
          }).start();
        }

        /**
         * 获取连击速度（简化计算：用连击数估算）
         */;
        _proto.getComboSpeed = function getComboSpeed() {
          // TODO: 可以更精确计算最近1秒的点击速度
          return this.comboCount;
        }

        /**
         * 显示连击UI（带过渡动画）
         */;
        _proto.showComboUI = function showComboUI() {
          var _this7 = this;
          this.UI.m_tiShi.selectedIndex = 1; // 切换到表情
          this.UI.m_num.visible = true;

          // 停止 GO 图标的循环动画
          this.stopGoIdleAnimation();

          // GO 淡出 + 缩小
          var goNode = this.UI.m_Go.node;
          tween(goNode).stop();
          tween(goNode).to(0.2, {
            scale: new Vec3(0.8, 0.8, 1)
          }, {
            easing: "sineIn"
          }).call(function () {
            _this7.UI.m_Go.visible = false;
          }).start();
          tween(this.UI.m_Go).to(0.2, {
            alpha: 0
          }, {
            easing: "sineIn"
          }).start();

          // 表情图标淡入 + 放大
          this.UI.m_tishiImg.visible = true;
          this.UI.m_tishiImg.alpha = 0;
          var tishiNode = this.UI.m_tishiImg.node;
          tishiNode.setScale(0.8, 0.8, 1);
          tween(this.UI.m_tishiImg).to(0.3, {
            alpha: 1
          }, {
            easing: "sineOut"
          }).start();
          tween(tishiNode).to(0.3, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "backOut"
          }).start();
        }

        /**
         * 隐藏连击UI（带过渡动画）
         */;
        _proto.hideComboUI = function hideComboUI() {
          var _this8 = this;
          this.UI.m_tiShi.selectedIndex = 0; // 切换到GO
          this.UI.m_num.visible = false;
          this.comboCount = 0;

          // 表情图标淡出 + 缩小
          var tishiNode = this.UI.m_tishiImg.node;
          tween(tishiNode).stop();
          tween(this.UI.m_tishiImg).to(0.2, {
            alpha: 0
          }, {
            easing: "sineIn"
          }).call(function () {
            _this8.UI.m_tishiImg.visible = false;
          }).start();
          tween(tishiNode).to(0.2, {
            scale: new Vec3(0.8, 0.8, 1)
          }, {
            easing: "sineIn"
          }).start();

          // GO 图标淡入 + 放大
          this.UI.m_Go.visible = true;
          this.UI.m_Go.alpha = 0;
          var goNode = this.UI.m_Go.node;
          goNode.setScale(0.8, 0.8, 1);
          tween(this.UI.m_Go).to(0.3, {
            alpha: 1
          }, {
            easing: "sineOut"
          }).start();
          tween(goNode).to(0.3, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "backOut"
          }).call(function () {
            // 淡入完成后，重新启动循环跳动动画
            _this8.startGoIdleAnimation();
          }).start();
        }

        /**
         * 页面刷新动画（左滑消失，右滑飞入）
         */;
        _proto.refreshPage = function refreshPage() {
          var _this9 = this;
          var area = this.UI.m_BubbleArea;
          var areaNode = area.node;

          // 记录当前居中的 x 位置
          var originalX = area.x;

          // 旧页面左滑消失
          tween(areaNode).to(0.3, {
            position: new Vec3(-area.width, areaNode.position.y, 0)
          }, {
            easing: "sineIn"
          }).call(function () {
            // 重置所有泡泡状态
            _this9.resetAllBubbles();
            _this9.poppedCount = 0;

            // 重置进度条（直接设置，不需要动画）
            _this9.progressObj.value = 0;
            _this9.UI.m_progress.value = 0;

            // 确保居中位置（可能因为屏幕旋转等原因需要重新计算）
            _this9.centerBubbleArea();
            var centeredX = area.x;

            // 新页面从右侧飞入
            areaNode.setPosition(area.width, areaNode.position.y, 0);
            tween(areaNode).to(0.3, {
              position: new Vec3(centeredX, areaNode.position.y, 0)
            }, {
              easing: "sineOut"
            }).start();
          }).start();
          this._log.log('页面刷新');
        }

        /**
         * 重置所有泡泡状态
         */;
        _proto.resetAllBubbles = function resetAllBubbles() {
          this.bubbles.forEach(function (bubble) {
            bubble.m_c1.selectedIndex = 0; // 恢复未戳破状态
          });
        };

        return Game_GamePage_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GamePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GComponent, vm;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "8b539gX39lFDYSug9u4/3P9", "Game_GamePage", undefined);
      var Game_GamePage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_GamePage, _fgui$GComponent);
        function Game_GamePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_tiShi = void 0;
          _this.m_bg = void 0;
          _this.m_BubbleArea = void 0;
          _this.m_progress = void 0;
          _this.m_num = void 0;
          _this.m_Go = void 0;
          _this.m_tishiImg = void 0;
          return _this;
        }
        Game_GamePage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "GamePage");
        };
        var _proto = Game_GamePage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_tiShi = this.getController("tiShi");
          this.m_bg = this.getChild("bg");
          this.m_BubbleArea = this.getChild("BubbleArea");
          this.m_progress = this.getChild("progress");
          this.m_num = this.getChild("num");
          this.m_Go = this.getChild("Go");
          this.m_tishiImg = this.getChild("tishiImg");
        };
        return Game_GamePage;
      }(GComponent), _class2.URL = "ui://6gpz43l1e0zek", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Game_GamePage.ts', './Game_Bubbble.ts', './Game_Area.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Game_GamePage, Game_Bubbble, Game_Area;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      Game_Bubbble = module.default;
    }, function (module) {
      Game_Area = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "602edeDLsJKn6uC1dZlW7SH", "GameBinder", undefined);
      var GameBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function GameBinder() {}
        var _proto = GameBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Game_GamePage.URL, Game_GamePage);
          UIObjectFactory.setExtension(Game_Bubbble.URL, Game_Bubbble);
          UIObjectFactory.setExtension(Game_Area.URL, Game_Area);
        };
        return GameBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CommonExport.ts', './ConfigBase.ts', './ConfigMgr.ts', './PoolMgr.ts', './ToyControlInterface.ts', './VibrationManager.ts', './StartView.ts', './GameBinder.ts', './Game_GamePage.ts', './Game_GamePage_Logic.ts', './Game_Area.ts', './Game_Area_Logic.ts', './Game_Bubbble.ts', './Game_Bubbble_Logic.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PoolMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, instantiate, Prefab, mk_obj_pool_new, mk_instance_base, mk_asset$1, error, GTextField, AutoSizeType, UIPackage, GUIManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
      Prefab = module.Prefab;
    }, function (module) {
      mk_obj_pool_new = module.PoolBuilder;
      mk_instance_base = module.instance_base;
      mk_asset$1 = module.asset;
      error = module.error;
    }, function (module) {
      GTextField = module.GTextField;
      AutoSizeType = module.AutoSizeType;
      UIPackage = module.UIPackage;
    }, function (module) {
      GUIManager = module.GUIManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04672eWqVFIKJiVK6TVkrA3", "PoolMgr", undefined);
      var ObjPoolMgr = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(ObjPoolMgr, _instance_base);
        function ObjPoolMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          _this._prefabpools = new Map();
          _this._gobjpools = new Map();
          _this._txtPool = null;
          return _this;
        }
        var _proto = ObjPoolMgr.prototype;
        _proto.getPrefabPool = /*#__PURE__*/function () {
          var _getPrefabPool = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path, bundle) {
            var key, prefab, pool;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  key = "" + bundle + path;
                  if (this._prefabpools.has(key)) {
                    _context2.next = 7;
                    break;
                  }
                  prefab = null;
                  _context2.next = 5;
                  return mk_obj_pool_new().create( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (prefab) {
                            _context.next = 4;
                            break;
                          }
                          _context.next = 3;
                          return mk_asset$1.get(path, Prefab, null, {
                            bundle_s: bundle
                          });
                        case 3:
                          prefab = _context.sent;
                        case 4:
                          return _context.abrupt("return", instantiate(prefab));
                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }))).reset(function (obj) {
                    obj.parent = null;
                    obj.active = true;
                    return obj;
                  }).clear(function (obj_as) {
                    var _prefab;
                    obj_as.forEach(function (obj) {
                      obj.destroy();
                    });
                    (_prefab = prefab) == null || _prefab.decRef();
                    prefab = null;
                  }).initialSize(5).maxSize(50).buildAsync();
                case 5:
                  pool = _context2.sent;
                  this._prefabpools.set(key, pool);
                case 7:
                  return _context2.abrupt("return", this._prefabpools.get(key));
                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function getPrefabPool(_x, _x2) {
            return _getPrefabPool.apply(this, arguments);
          }
          return getPrefabPool;
        }();
        _proto.getGobjPool = /*#__PURE__*/function () {
          var _getGobjPool = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(packageName, itemName) {
            var key, uiPackage, pool;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  key = "" + packageName + itemName;
                  if (this._gobjpools.has(key)) {
                    _context4.next = 7;
                    break;
                  }
                  uiPackage = null;
                  _context4.next = 5;
                  return mk_obj_pool_new().create( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                    var gobj;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          if (uiPackage) {
                            _context3.next = 7;
                            break;
                          }
                          uiPackage = UIPackage.getByName(packageName);
                          if (uiPackage) {
                            _context3.next = 6;
                            break;
                          }
                          _context3.next = 5;
                          return GUIManager.loadPackage(packageName);
                        case 5:
                          uiPackage = _context3.sent;
                        case 6:
                          GUIManager.setPackageRefCount(packageName);
                        case 7:
                          gobj = uiPackage.createObject(itemName);
                          if (!gobj) {
                            error("create gobj " + packageName + "/" + itemName + " failed,\u8BF7\u68C0\u67E5\u8D44\u6E90\u662F\u5426\u5B58\u5728");
                          }
                          return _context3.abrupt("return", gobj);
                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }))).reset(function (obj) {
                    if (obj.parent) {
                      obj.removeFromParent();
                    } else {
                      obj.node.parent = null;
                    }
                    obj.visible = true;
                    return obj;
                  }).clear(function (obj_as) {
                    obj_as.forEach(function (obj) {
                      obj.dispose();
                    });
                    GUIManager.setPackageRefCount(packageName, -1);
                    uiPackage = null;
                  }).initialSize(5).maxSize(50).buildAsync();
                case 5:
                  pool = _context4.sent;
                  this._gobjpools.set(key, pool);
                case 7:
                  return _context4.abrupt("return", this._gobjpools.get(key));
                case 8:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function getGobjPool(_x3, _x4) {
            return _getGobjPool.apply(this, arguments);
          }
          return getGobjPool;
        }();
        _proto.getTxtPool = function getTxtPool() {
          if (!this._txtPool) {
            this._txtPool = mk_obj_pool_new().create(function () {
              var label = new GTextField();
              return label;
            }).reset(function (obj) {
              obj.fontSize = 20;
              obj.text = "";
              obj.setPivot(0.5, 1, true);
              obj.autoSize = AutoSizeType.Both;
              if (obj.parent) {
                obj.removeFromParent();
              } else {
                obj.node.parent = null;
              }
              obj.visible = true;
              return obj;
            }).clear(function (obj_as) {
              obj_as.forEach(function (obj) {
                obj.dispose();
              });
            }).initialSize(5).maxSize(100).buildSync();
          }
          return this._txtPool;
        };
        _proto.clear = function clear() {
          this._prefabpools.forEach(function (pool) {
            pool.clear();
            pool.destroy();
          });
          this._prefabpools.clear();
          this._gobjpools.forEach(function (pool) {
            pool.clear();
            pool.destroy();
          });
          this._gobjpools.clear();
          if (this._txtPool) {
            this._txtPool.clear();
            this._txtPool.destroy();
            this._txtPool = null;
          }
        };
        return ObjPoolMgr;
      }(mk_instance_base);
      var objPoolMgr = exports('objPoolMgr', ObjPoolMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './CommonExport.ts', './fairygui.mjs', './drongo-cc.mjs', './Game_GamePage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, ProgressBar, Node, color, view, AudioSourceComponent, tween, Component, GUIManager, AllBinder, UIConfig, registerFont, GRoot, UIPackage, log, Game_GamePage;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
      Node = module.Node;
      color = module.color;
      view = module.view;
      AudioSourceComponent = module.AudioSourceComponent;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      GUIManager = module.GUIManager;
      AllBinder = module.AllBinder;
    }, null, function (module) {
      UIConfig = module.UIConfig;
      registerFont = module.registerFont;
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
    }, function (module) {
      log = module.log;
    }, function (module) {
      Game_GamePage = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b717ey19TVBBpBqTI0xPCo1", "StartView", undefined);
      // import Game_Main from './fgui/Game/Game_Main';
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var StartView = exports('default', (_dec = property(Label), _dec2 = property(ProgressBar), _dec3 = property(Node), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StartView, _Component);
        function StartView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "progressBar", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor3, _assertThisInitialized(_this));
          _this.progressObj = {
            value: 0
          };
          return _this;
        }
        var _proto = StartView.prototype;
        // 用于缓动的进度对象
        _proto.onLoad = function onLoad() {
          // fgui.GRoot.create();

          // fgui.UIConfig.buttonSound = "ui://MainMenu/click";
          UIConfig.buttonSoundVolumeScale = 1;
          UIConfig.bringWindowToFrontOnClick = false;
          registerFont("Inter-BoldItalic");
          UIConfig.defaultFont = "Inter-BoldItalic";
          UIConfig.modalLayerColor = color(0, 0, 0, 100);

          // 初始化进度条和标签
          this.progressBar.progress = 0;
          this.label.string = "0%";
          this.progressObj.value = 0;
        }

        /**
         * 根据FairyGUI的UI缩放系统适配背景大小
         */;
        _proto.adaptBackgroundSize = function adaptBackgroundSize() {
          if (!this.bg) {
            console.warn("bg节点未设置，跳过背景适配");
            return;
          }
          try {
            // 获取FairyGUI的根节点尺寸（已经考虑了缩放）
            var fguiRoot = GRoot.inst;
            var rootWidth = fguiRoot.width;
            var rootHeight = fguiRoot.height;

            // 获取设计分辨率作为参考
            var designSize = view.getDesignResolutionSize();

            // 获取屏幕窗口大小
            var screenSize = view.getVisibleSize();
            log("FairyGUI\u9002\u914D\u4FE1\u606F:\n                FGUI\u6839\u8282\u70B9\u5C3A\u5BF8: " + rootWidth + " x " + rootHeight + "\n                \u8BBE\u8BA1\u5206\u8FA8\u7387: " + designSize.width + " x " + designSize.height + "\n                \u5C4F\u5E55\u5C3A\u5BF8: " + screenSize.width + " x " + screenSize.height);

            // 使用FairyGUI的根节点尺寸来计算缩放比例
            var widthScale = rootWidth / designSize.width;
            var heightScale = rootHeight / designSize.height;

            // 直接按照FGUI根节点尺寸设置背景的缩放，分别拉满宽度和高度
            this.bg.setScale(widthScale, heightScale);
            log("\u80CC\u666F\u9002\u914D\u5B8C\u6210:\n                \u5BBD\u5EA6\u7F29\u653E: " + widthScale.toFixed(3) + "\n                \u9AD8\u5EA6\u7F29\u653E: " + heightScale.toFixed(3) + "\n                \u6700\u7EC8\u80CC\u666F\u5C3A\u5BF8: " + (designSize.width * widthScale).toFixed(1) + " x " + (designSize.height * heightScale).toFixed(1));
          } catch (error) {
            console.error("背景适配失败，回退到基础适配:", error);

            // 回退方案：使用基础的视图尺寸
            var visibleSize = view.getVisibleSize();
            var _designSize = view.getDesignResolutionSize();
            var _widthScale = visibleSize.width / _designSize.width;
            var _heightScale = visibleSize.height / _designSize.height;
            this.bg.setScale(_widthScale, _heightScale);
          }
        }

        /**
         * 播放背景音乐
         */;
        _proto.playBGM = function playBGM(node, packageName, soundName) {
          var uipackage = UIPackage.getByName(packageName);
          var sound = uipackage.getItemAssetByName(soundName);
          var audioEngine = node.addComponent(AudioSourceComponent);
          if (audioEngine.isValid) {
            audioEngine.clip = sound;
            audioEngine.volume = 0.7;
            audioEngine.loop = true;
            audioEngine.play();
          }
          return audioEngine;
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  AllBinder.bindAll();
                  _context.prev = 1;
                  this.adaptBackgroundSize();
                  // 加载Game包依赖
                  log("开始加载UI包...");
                  _context.next = 6;
                  return GUIManager.loadPackage("Game", function (finish, total) {
                    var packageProgress = finish / total;
                    var targetProgress = packageProgress;
                    _this2.updateProgress(targetProgress, "加载UI资源");
                  });
                case 6:
                  log("所有资源加载完成！");

                  // 资源加载完毕后立即播放BGM
                  try {
                    this.playBGM(this.node, "Game", "bgm");
                    log("BGM播放成功");
                  } catch (error) {
                    console.warn("BGM播放失败:", error);
                  }

                  // 加载完成后打开角色选择界面
                  GUIManager.open(Game_GamePage);
                  _context.next = 15;
                  break;
                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  console.error("资源加载失败:", _context.t0);
                  // 即使加载失败也要继续游戏流程
                  GUIManager.open(Game_GamePage);
                case 15:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 11]]);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }()
        /**
         * 更新进度显示
         * @param targetProgress 目标进度（0-1）
         * @param loadingText 加载提示文本（可选）
         */;

        _proto.updateProgress = function updateProgress(targetProgress, loadingText) {
          var _this3 = this;
          // 停止之前的缓动动画
          tween(this.progressObj).stop();

          // 使用缓动动画平滑过渡到目标进度
          tween(this.progressObj).to(0.3, {
            value: targetProgress
          }, {
            onUpdate: function onUpdate() {
              _this3.progressBar.progress = _this3.progressObj.value;
              var percentage = Math.floor(_this3.progressObj.value * 100);

              // 如果有加载文本提示，显示详细信息
              // if (loadingText) {
              //     this.label.string = `${loadingText} ${percentage}%`;
              // } else {
              _this3.label.string = percentage + "%";
              // }
            }
          }).start();
        };
        return StartView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToyControlInterface.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f2b3cTV5vdIqZq83vEjRWeJ", "ToyControlInterface", undefined);
      /**
       * 情趣玩具控制接口
       * 预留接口，用于接入第三方SDK控制设备振动强度
       */
      var ToyControlInterface = exports('ToyControlInterface', /*#__PURE__*/function () {
        function ToyControlInterface() {}
        /**
         * 初始化玩具控制SDK
         * @param sdk 第三方SDK实例
         */
        ToyControlInterface.init = function init(sdk) {
          this.sdk = sdk;
          this.isEnabled = !!sdk;
          if (this.isEnabled) {
            console.log('[ToyControlInterface] 玩具控制SDK已初始化');
          }
        }

        /**
         * 连击变化时调用，根据连击速度映射振动强度
         * @param comboCount 当前连击次数
         * @param speed 连击速度（个/秒）
         */;
        ToyControlInterface.onComboChange = function onComboChange(comboCount, speed) {
          if (!this.isEnabled || !this.sdk) return;
          var intensity = 0;

          // 根据连击速度映射振动强度
          if (speed >= 6) {
            intensity = 100; // 高速连击(6个以上/秒): 100%振动强度
          } else if (speed >= 3) {
            intensity = 80; // 中速连击(3-5个/秒): 80%振动强度
          } else if (speed > 0) {
            intensity = 60; // 低速连击(0-2个/秒): 60%振动强度
          }

          console.log("[ToyControlInterface] \u8FDE\u51FB" + comboCount + "\u6B21\uFF0C\u901F\u5EA6" + speed + "/\u79D2\uFF0C\u5F3A\u5EA6" + intensity + "%");

          // TODO: 接入SDK后取消注释
          // if (this.sdk.setVibration) {
          //     this.sdk.setVibration(intensity);
          // }
        }

        /**
         * 连击中断时调用，停止设备振动
         */;
        ToyControlInterface.onComboStop = function onComboStop() {
          if (!this.isEnabled || !this.sdk) return;
          console.log('[ToyControlInterface] 连击中断，停止振动');

          // TODO: 接入SDK后取消注释
          // if (this.sdk.stopVibration) {
          //     this.sdk.stopVibration();
          // }
        }

        /**
         * 启用/禁用玩具控制
         */;
        ToyControlInterface.setEnabled = function setEnabled(enabled) {
          this.isEnabled = enabled && !!this.sdk;
        }

        /**
         * 检查是否已启用
         */;
        _createClass(ToyControlInterface, null, [{
          key: "enabled",
          get: function get() {
            return this.isEnabled;
          }
        }]);
        return ToyControlInterface;
      }());
      ToyControlInterface.sdk = null;
      // 预留SDK引用
      ToyControlInterface.isEnabled = false;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VibrationManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e1a2bPE1eZH+Imrze8BI0Vn", "VibrationManager", undefined);
      /**
       * 震动管理器
       * 封装浏览器震动API，提供降级处理
       */
      var VibrationManager = exports('VibrationManager', /*#__PURE__*/function () {
        function VibrationManager() {}
        /**
         * 初始化震动管理器，检测浏览器支持
         */
        VibrationManager.init = function init() {
          if (this.initialized) return;

          // 检测浏览器对震动API的支持
          var nav = navigator;
          nav.vibrate = nav.vibrate || nav.webkitVibrate || nav.mozVibrate || nav.msVibrate;
          this.isSupported = !!nav.vibrate;
          this.initialized = true;
          if (this.isSupported) {
            console.log('[VibrationManager] 浏览器支持震动API');
          } else {
            console.warn('[VibrationManager] 浏览器不支持震动API，震动功能将被禁用');
          }
        }

        /**
         * 触发震动
         * @param duration 震动持续时间（毫秒）
         */;
        VibrationManager.vibrate = function vibrate(duration) {
          if (!this.initialized) {
            this.init();
          }
          if (!this.isSupported) return;
          try {
            var result = navigator.vibrate(duration);
            console.log('[VibrationManager] 震动结果:', result);
          } catch (e) {
            console.error('[VibrationManager] 震动失败:', e);
          }
        }

        /**
         * 停止震动
         */;
        VibrationManager.stop = function stop() {
          if (!this.initialized) {
            this.init();
          }
          if (!this.isSupported) return;
          try {
            navigator.vibrate(0);
          } catch (e) {
            console.error('[VibrationManager] 停止震动失败:', e);
          }
        }

        /**
         * 检查是否支持震动
         */;
        _createClass(VibrationManager, null, [{
          key: "supported",
          get: function get() {
            if (!this.initialized) {
              this.init();
            }
            return this.isSupported;
          }
        }]);
        return VibrationManager;
      }());
      VibrationManager.isSupported = false;
      VibrationManager.initialized = false;
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});