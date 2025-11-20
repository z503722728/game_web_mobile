System.register("chunks:///_virtual/CommonExport.ts", ['cc', './drongo-cc.mjs', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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

System.register("chunks:///_virtual/FormatUtils.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ab706W0bE1FA4RMRfDRblr4", "FormatUtils", undefined);
      /**
       * 格式化工具类
       */
      var FormatUtils = exports('FormatUtils', /*#__PURE__*/function () {
        function FormatUtils() {}
        /**
         * 数字补零格式化
         * @param num 数字
         * @param minDigits 最小位数，默认2位
         * @returns 格式化后的字符串
         * @example
         * padZero(5) => "05"
         * padZero(15) => "15"
         * padZero(5, 3) => "005"
         */
        FormatUtils.padZero = function padZero(num, minDigits) {
          if (minDigits === void 0) {
            minDigits = 2;
          }
          return num.toString().padStart(minDigits, '0');
        };
        return FormatUtils;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Card_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Card.ts', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, tween, addLogic, GUILogicBase, Game_Card, UIPackage, GRoot;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_Card = module.default;
    }, function (module) {
      UIPackage = module.UIPackage;
      GRoot = module.GRoot;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9c47c9XjKBPdoA4fh0FDVfb", "Game_Card_Logic", undefined);
      var Game_Card_Logic = exports('default', (_dec = addLogic(Game_Card), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_Card_Logic, _GUILogicBase);
        function Game_Card_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.cardData = null;
          _this.onClickCallback = null;
          return _this;
        }
        var _proto = Game_Card_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 绑定点击事件
          this.UI.onClick(this.onCardClick, this);
        };
        _proto.start = function start() {
          // 每次打开时重置为背面
          this.setCardType(0);
        }

        /**
         * 设置卡牌数据
         */;
        _proto.setCardData = function setCardData(data) {
          this.cardData = data;
          this.setCardType(data.isFlipped ? data.type : 0);
        }

        /**
         * 设置卡牌类型（切换控制器）
         * @param type 0=背面，1-11=正面
         */;
        _proto.setCardType = function setCardType(type) {
          this.UI.m_cardType.selectedIndex = type;
        }

        /**
         * 设置点击回调
         */;
        _proto.setClickCallback = function setClickCallback(callback) {
          this.onClickCallback = callback;
        }

        /**
         * 卡牌点击事件
         */;
        _proto.onCardClick = function onCardClick() {
          if (this.cardData && this.onClickCallback) {
            this.onClickCallback(this.cardData.id);
          }
        }

        /**
         * 播放翻牌音效
         */;
        _proto.playFlopSound = function playFlopSound() {
          try {
            var uiPackage = UIPackage.getByName("Game");
            if (!uiPackage) {
              this._log.log("警告：无法找到 Game UI包");
              return;
            }
            var sound = uiPackage.getItemAssetByName("Flop");
            if (sound) {
              GRoot.inst.playOneShotSound(sound);
            } else {
              this._log.log("警告：无法加载 Flop 音效");
            }
          } catch (error) {
            this._log.log("播放翻牌音效失败:", error);
          }
        }

        /**
         * 播放翻牌动画（3D效果）
         * @param toType 目标类型
         * @param duration 动画时长（秒）
         */;
        _proto.playFlipAnimation = function playFlipAnimation(toType, duration) {
          var _this2 = this;
          if (duration === void 0) {
            duration = 0.3;
          }
          return new Promise(function (resolve) {
            var halfDuration = duration / 2;

            // 播放翻牌音效
            _this2.playFlopSound();

            // 停止之前的动画
            tween(_this2.UI).stop();

            // 第一阶段：缩小到0（模拟翻转到侧面）
            tween(_this2.UI).to(halfDuration, {
              scaleX: 0
            }, {
              easing: 'sineOut'
            }).call(function () {
              // 中间点切换牌面
              _this2.setCardType(toType);
            })
            // 第二阶段：放大回1（翻转到正面）
            .to(halfDuration, {
              scaleX: 1
            }, {
              easing: 'sineIn'
            }).call(function () {
              // 翻牌完成后，如果翻到正面则显示选择框
              if (toType > 0) {
                _this2.showSelectFrame();
              } else {
                _this2.hideSelectFrame();
              }
              resolve();
            }).start();
          });
        }

        /**
         * 显示选择框
         */;
        _proto.showSelectFrame = function showSelectFrame() {
          this.UI.m_seleted.selectedIndex = 1;
        }

        /**
         * 隐藏选择框
         */;
        _proto.hideSelectFrame = function hideSelectFrame() {
          this.UI.m_seleted.selectedIndex = 0;
        }

        /**
         * 播放配对失败抖动动画
         */;
        _proto.playShakeAnimation = function playShakeAnimation() {
          var _this3 = this;
          return new Promise(function (resolve) {
            var originalX = _this3.UI.x;
            tween(_this3.UI).stop();
            tween(_this3.UI).to(0.05, {
              x: originalX - 5
            }).to(0.05, {
              x: originalX + 5
            }).to(0.05, {
              x: originalX - 5
            }).to(0.05, {
              x: originalX + 5
            }).to(0.05, {
              x: originalX
            }).call(function () {
              resolve();
            }).start();
          });
        }

        /**
         * 隐藏卡牌（配对成功后）
         */;
        _proto.hide = function hide() {
          this.UI.visible = false;
        }

        /**
         * 显示卡牌
         */;
        _proto.show = function show() {
          this.UI.visible = true;
        }

        /**
         * 获取卡牌数据
         */;
        _proto.getCardData = function getCardData() {
          return this.cardData;
        };
        return Game_Card_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Card.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "efd8aEUDshIw6pvNHhisb2t", "Game_Card", undefined);
      var Game_Card = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_Card, _fgui$GComponent);
        function Game_Card() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_cardType = void 0;
          _this.m_seleted = void 0;
          return _this;
        }
        Game_Card.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Card");
        };
        var _proto = Game_Card.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_cardType = this.getController("cardType");
          this.m_seleted = this.getController("seleted");
        };
        return Game_Card;
      }(GComponent), _class2.URL = "ui://6gpz43l1g1kk25", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ChuChangBlue_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_ChuChangBlue.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, addLogic, GUILogicBase, Game_ChuChangBlue;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_ChuChangBlue = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "4671crXjRRDhrTJ39QbX3T/", "Game_ChuChangBlue_Logic", undefined);
      var Game_ChuChangBlue_Logic = exports('default', (_dec = addLogic(Game_ChuChangBlue), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_ChuChangBlue_Logic, _GUILogicBase);
        function Game_ChuChangBlue_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_ChuChangBlue_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        }

        /**
         * 播放从屏幕外进入的动画
         * @param targetX 目标X坐标
         * @param duration 动画时长
         */;
        _proto.playEnterAnimation = /*#__PURE__*/
        function () {
          var _playEnterAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(targetX, duration) {
            var _this = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (duration === void 0) {
                    duration = 0.5;
                  }
                  return _context.abrupt("return", new Promise(function (resolve) {
                    tween(_this.UI).to(duration, {
                      x: targetX
                    }, {
                      easing: 'sineOut'
                    }).call(function () {
                      return resolve();
                    }).start();
                  }));
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function playEnterAnimation(_x, _x2) {
            return _playEnterAnimation.apply(this, arguments);
          }
          return playEnterAnimation;
        }()
        /**
         * 播放淡出动画
         * @param duration 动画时长
         */;

        _proto.playFadeOutAnimation = /*#__PURE__*/
        function () {
          var _playFadeOutAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(duration) {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (duration === void 0) {
                    duration = 0.3;
                  }
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    tween(_this2.UI).to(duration, {
                      alpha: 0
                    }).call(function () {
                      return resolve();
                    }).start();
                  }));
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function playFadeOutAnimation(_x3) {
            return _playFadeOutAnimation.apply(this, arguments);
          }
          return playFadeOutAnimation;
        }()
        /**
         * 播放 VS 图标出场动画
         */;

        _proto.playVSAnimation = /*#__PURE__*/
        function () {
          var _playVSAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _this3 = this;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", new Promise(function (resolve) {
                    var vs = _this3.UI.m_vs;

                    // 显示VS图标
                    vs.visible = true;

                    // 设置初始状态：从中心放大开始
                    vs.setPivot(0.5, 0.5, true);
                    vs.setScale(3.0, 3.0); // 初始放大3倍
                    vs.alpha = 0; // 初始透明

                    // 播放动画：淡入+缩小到正常大小
                    tween(vs)
                    // 阶段1：淡入+缩小到正常大小
                    .to(0.3, {
                      scaleX: 1.0,
                      scaleY: 1.0,
                      alpha: 1.0
                    }, {
                      easing: 'backOut'
                    })
                    // 阶段2：轻微弹跳效果
                    .to(0.1, {
                      scaleX: 1.2,
                      scaleY: 1.2
                    }, {
                      easing: 'sineOut'
                    }).to(0.1, {
                      scaleX: 1.0,
                      scaleY: 1.0
                    }, {
                      easing: 'sineIn'
                    }).call(function () {
                      return resolve();
                    }).start();
                  }));
                case 1:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          function playVSAnimation() {
            return _playVSAnimation.apply(this, arguments);
          }
          return playVSAnimation;
        }();
        return Game_ChuChangBlue_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ChuChangBlue.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "f860f6dzcVGMYSd2OTAH6sy", "Game_ChuChangBlue", undefined);
      var Game_ChuChangBlue = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_ChuChangBlue, _fgui$GComponent);
        function Game_ChuChangBlue() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_isAI = void 0;
          _this.m_img = void 0;
          _this.m_name = void 0;
          _this.m_vs = void 0;
          return _this;
        }
        Game_ChuChangBlue.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "ChuChangBlue");
        };
        var _proto = Game_ChuChangBlue.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_isAI = this.getController("isAI");
          this.m_img = this.getChild("img");
          this.m_name = this.getChild("name");
          this.m_vs = this.getChild("vs");
        };
        return Game_ChuChangBlue;
      }(GComponent), _class2.URL = "ui://6gpz43l1g1kk1a", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ChuChangRed_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_ChuChangRed.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, addLogic, GUILogicBase, Game_ChuChangRed;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_ChuChangRed = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "4acacYgAU5MZ5jY14K/266Q", "Game_ChuChangRed_Logic", undefined);
      var Game_ChuChangRed_Logic = exports('default', (_dec = addLogic(Game_ChuChangRed), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_ChuChangRed_Logic, _GUILogicBase);
        function Game_ChuChangRed_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_ChuChangRed_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        }

        /**
         * 播放从屏幕外进入的动画
         * @param targetX 目标X坐标
         * @param duration 动画时长
         */;
        _proto.playEnterAnimation = /*#__PURE__*/
        function () {
          var _playEnterAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(targetX, duration) {
            var _this = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (duration === void 0) {
                    duration = 0.5;
                  }
                  return _context.abrupt("return", new Promise(function (resolve) {
                    tween(_this.UI).to(duration, {
                      x: targetX
                    }, {
                      easing: 'sineOut'
                    }).call(function () {
                      return resolve();
                    }).start();
                  }));
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function playEnterAnimation(_x, _x2) {
            return _playEnterAnimation.apply(this, arguments);
          }
          return playEnterAnimation;
        }()
        /**
         * 播放淡出动画
         * @param duration 动画时长
         */;

        _proto.playFadeOutAnimation = /*#__PURE__*/
        function () {
          var _playFadeOutAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(duration) {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (duration === void 0) {
                    duration = 0.3;
                  }
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    tween(_this2.UI).to(duration, {
                      alpha: 0
                    }).call(function () {
                      return resolve();
                    }).start();
                  }));
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function playFadeOutAnimation(_x3) {
            return _playFadeOutAnimation.apply(this, arguments);
          }
          return playFadeOutAnimation;
        }();
        return Game_ChuChangRed_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ChuChangRed.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "afa28Cboc1HUrLGNuHHaKN3", "Game_ChuChangRed", undefined);
      var Game_ChuChangRed = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_ChuChangRed, _fgui$GComponent);
        function Game_ChuChangRed() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_isAI = void 0;
          return _this;
        }
        Game_ChuChangRed.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "ChuChangRed");
        };
        var _proto = Game_ChuChangRed.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_isAI = this.getController("isAI");
        };
        return Game_ChuChangRed;
      }(GComponent), _class2.URL = "ui://6gpz43l1g1kk17", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Component1.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "b3324riBLtLd7piO5ptb5au", "Game_Component1", undefined);
      var Game_Component1 = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_Component1, _fgui$GComponent);
        function Game_Component1() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_CardArea = void 0;
          return _this;
        }
        Game_Component1.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Component1");
        };
        var _proto = Game_Component1.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_CardArea = this.getChild("CardArea");
        };
        return Game_Component1;
      }(GComponent), _class2.URL = "ui://6gpz43l1od3a2w", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_DialogWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, tween, GUIWindow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      GUIWindow = module.GUIWindow;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d0b77ZtPKdKZo0x35vhMw65", "Game_DialogWindow", undefined);

      /**
       * 自定义弹窗窗口类
       * 实现自定义的弹出和关闭动画
       */
      var GameDialogWindow = exports('GameDialogWindow', /*#__PURE__*/function (_GUIWindow) {
        _inheritsLoose(GameDialogWindow, _GUIWindow);
        function GameDialogWindow() {
          return _GUIWindow.apply(this, arguments) || this;
        }
        var _proto = GameDialogWindow.prototype;
        _proto.onInit = function onInit() {
          // 确保窗口居中并设置动画锚点
          // this.makeFullScreen();
          this.center();
          this.contentPane.setPivot(0.5, 0.5, true);
          this.contentPane.x += this.contentPane.width / 2;
          this.contentPane.y += this.contentPane.height / 2;
        };
        _proto.doShowAnimation = function doShowAnimation() {
          var _this = this;
          // 设置初始状态：0.8倍大小，透明
          this.contentPane.setScale(0.8, 0.8);
          this.contentPane.alpha = 0;

          // 弹出动画：从0.8倍缩放到正常大小
          tween(this.contentPane).to(0.3, {
            scaleX: 1.0,
            scaleY: 1.0,
            alpha: 1.0
          }, {
            easing: 'backOut'
          }).call(function () {
            return _GUIWindow.prototype.doShowAnimation.call(_this);
          }) // 调用父类方法完成显示
          .start();
        };
        _proto.doHideAnimation = function doHideAnimation() {
          var _this2 = this;
          // 关闭动画：缩小并淡出
          tween(this.contentPane).to(0.2, {
            scaleX: 0.8,
            scaleY: 0.8,
            alpha: 0
          }, {
            easing: 'backIn'
          }).call(function () {
            return _GUIWindow.prototype.doHideAnimation.call(_this2);
          }) // 调用父类方法完成隐藏
          .start();
        };
        return GameDialogWindow;
      }(GUIWindow));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GanmePage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_GanmePage.ts', './Game_Card.ts', './Game_Card_Logic.ts', './Game_StartPage.ts', './Game_ResultPage.ts', './Game_ResultTwoPlayerPage.ts', './Game_ChuChangRed.ts', './Game_ChuChangBlue.ts', './Game_ChuChangRed_Logic.ts', './Game_ChuChangBlue_Logic.ts', './Game_GuideView.ts', './Game_GuideView_Logic.ts', './GameMgr.ts', './FormatUtils.ts', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, Color, addLogic, GUILogicBase, GBind, GUIManager, Game_GanmePage, Game_Card, Game_Card_Logic, Game_StartPage, Game_ResultPage, Game_ResultTwoPlayerPage, Game_ChuChangRed, Game_ChuChangBlue, Game_ChuChangRed_Logic, Game_ChuChangBlue_Logic, Game_GuideView, Game_GuideView_Logic, gameMgr, FormatUtils, GGraph;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Color = module.Color;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
      GBind = module.GBind;
      GUIManager = module.GUIManager;
    }, function (module) {
      Game_GanmePage = module.default;
    }, function (module) {
      Game_Card = module.default;
    }, function (module) {
      Game_Card_Logic = module.default;
    }, function (module) {
      Game_StartPage = module.default;
    }, function (module) {
      Game_ResultPage = module.default;
    }, function (module) {
      Game_ResultTwoPlayerPage = module.default;
    }, function (module) {
      Game_ChuChangRed = module.default;
    }, function (module) {
      Game_ChuChangBlue = module.default;
    }, function (module) {
      Game_ChuChangRed_Logic = module.default;
    }, function (module) {
      Game_ChuChangBlue_Logic = module.default;
    }, function (module) {
      Game_GuideView = module.default;
    }, function (module) {
      Game_GuideView_Logic = module.default;
    }, function (module) {
      gameMgr = module.gameMgr;
    }, function (module) {
      FormatUtils = module.FormatUtils;
    }, function (module) {
      GGraph = module.GGraph;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "6cb2cmmLExBIqdbgbBU/cFV", "Game_GanmePage_Logic", undefined);
      var Game_GanmePage_Logic = exports('default', (_dec = addLogic(Game_GanmePage), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_GanmePage_Logic, _GUILogicBase);
        function Game_GanmePage_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.cardUIMap = new Map();
          // cardId -> UI组件
          _this.isAIProcessing = false;
          return _this;
        }
        var _proto = Game_GanmePage_Logic.prototype;
        // 是否已显示过引导（游戏会话期间）
        _proto.onLoad = function onLoad() {
          // 绑定退出按钮
          this.UI.m_exitBtn.onClick(this.onExitClick, this);

          // 创建22张卡牌UI
          this.createCardUIs();

          // 设置UI排序
          GUILogicBase.setUISorting(this.UI.m_redValue.node, false);
          GUILogicBase.setUISorting(this.UI.m_blueValue.node, false);
          GUILogicBase.setUISorting(this.UI.m_fipsNum.node, false);
          GUILogicBase.setUISorting(this.UI.m_username.node, false);

          // 绑定数据到UI（自动更新）
          GBind(this.UI.m_redValue, gameMgr.observableData, function (k) {
            return k.redScore;
          }).setFormatFunc(function (value) {
            return FormatUtils.padZero(value);
          }).bindTarget(this);
          GBind(this.UI.m_blueValue, gameMgr.observableData, function (k) {
            return k.blueScore;
          }).setFormatFunc(function (value) {
            return FormatUtils.padZero(value);
          }).bindTarget(this);
          GBind(this.UI.m_fipsNum, gameMgr.observableData, function (k) {
            return k.flipsCount;
          }).setFormatFunc(function (value) {
            return FormatUtils.padZero(value);
          }).bindTarget(this);
        };
        _proto.start = function start() {
          var _this2 = this;
          // 每次打开时重置游戏
          this.resetGame();

          // 延迟播放开场动画（等待UI完全显示）
          setTimeout(function () {
            _this2.playStartAnimation();
          }, 100);
        }

        /**
         * 创建卡牌UI（只执行一次）
         * 按行排列：6行，每行卡牌数量不同，行内水平居中
         */;
        _proto.createCardUIs = function createCardUIs() {
          // 创建22张卡牌UI
          for (var cardId = 0; cardId < 22; cardId++) {
            var cardUI = Game_Card.createInstance();
            var cardLogic = cardUI.Get(Game_Card_Logic);

            // 设置锚点为中心
            cardUI.setPivot(0.5, 0.5, true);

            // 添加到卡牌区域
            this.UI.m_CardArea.addChild(cardUI);

            // 设置点击回调
            cardLogic.setClickCallback(this.onCardClick.bind(this));

            // 保存映射
            this.cardUIMap.set(cardId, cardLogic);
          }
          this._log.log("\u521B\u5EFA\u4E86 " + this.cardUIMap.size + " \u5F20\u5361\u724CUI");
        }

        /**
         * 根据游戏状态重新布局卡牌
         * 每次游戏开始时调用，因为 cards 数据被重新随机打乱
         */;
        _proto.layoutCards = function layoutCards() {
          var _this3 = this;
          var gameState = gameMgr.getGameState();
          if (!gameState) {
            return;
          }
          var layoutConfig = gameMgr.getLayoutConfig();
          var areaWidth = this.UI.m_CardArea.width;
          var areaHeight = this.UI.m_CardArea.height;

          // 从配置中计算行数和最大列数
          var rowCount = Math.max.apply(Math, layoutConfig.map(function (c) {
            return c.row;
          })) + 1;
          var maxColCount = Math.max.apply(Math, layoutConfig.map(function (c) {
            return c.cols;
          }));
          var cardWidth = areaWidth / maxColCount;
          var cardHeight = areaHeight / rowCount;

          // 遍历所有卡牌数据，根据其 row 和 col 信息布局
          var _loop = function _loop() {
              var card = _step.value;
              var cardUI = _this3.cardUIMap.get(card.id);
              if (!cardUI) {
                return 0; // continue
              }

              // 确保卡牌在 CardArea 中
              if (cardUI.UI.parent !== _this3.UI.m_CardArea) {
                _this3.UI.m_CardArea.addChild(cardUI.UI);
              }

              // 找到该卡牌所在行的配置
              var rowConfig = layoutConfig.find(function (c) {
                return c.row === card.row;
              });
              if (!rowConfig) {
                return 0; // continue
              }

              // 计算该行的水平偏移（让卡牌居中）
              var horizontalOffset = (maxColCount - rowConfig.cols) * cardWidth / 2;

              // 计算卡牌中心位置
              var centerX = horizontalOffset + card.col * cardWidth + cardWidth / 2;
              var centerY = card.row * cardHeight + cardHeight / 2;
              cardUI.UI.setPosition(centerX, centerY);
            },
            _ret;
          for (var _iterator = _createForOfIteratorHelperLoose(gameState.cards), _step; !(_step = _iterator()).done;) {
            _ret = _loop();
            if (_ret === 0) continue;
          }
          this._log.log("卡牌布局完成");
        }

        /**
         * 重置游戏（每次打开时执行）
         */;
        _proto.resetGame = function resetGame() {
          var gameState = gameMgr.getGameState();
          if (!gameState) {
            return;
          }

          // 重新布局卡牌（根据新的随机 cards 数据）
          this.layoutCards();

          // 重置卡牌UI状态
          for (var _iterator2 = _createForOfIteratorHelperLoose(gameState.cards), _step2; !(_step2 = _iterator2()).done;) {
            var card = _step2.value;
            var cardUI = this.cardUIMap.get(card.id);
            if (cardUI) {
              cardUI.setCardData(card);
              cardUI.show();
              cardUI.UI.scaleX = 1; // 重置缩放
              cardUI.UI.scaleY = 1; // 重置缩放
              cardUI.UI.alpha = 1; // 重置透明度
              cardUI.hideSelectFrame(); // 重置选择框状态
            }
          }

          // 设置AI模式控制器
          this.UI.m_isAI.selectedIndex = gameState.mode === 'single' ? 1 : 0;

          // 高亮当前玩家
          this.highlightCurrentPlayer();
          this._log.log("游戏重置完成");

          // 注意：分数和翻牌数通过 GBind 自动更新，无需手动设置
        }

        /**
         * 卡牌点击事件
         */;
        _proto.onCardClick = /*#__PURE__*/
        function () {
          var _onCardClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cardId) {
            var gameState;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  gameState = gameMgr.getGameState();
                  if (!(!gameState || gameState.isProcessing || this.isAIProcessing)) {
                    _context.next = 3;
                    break;
                  }
                  return _context.abrupt("return");
                case 3:
                  if (!gameMgr.isAITurn()) {
                    _context.next = 6;
                    break;
                  }
                  this._log.log("AI回合，玩家不能操作");
                  return _context.abrupt("return");
                case 6:
                  _context.next = 8;
                  return this.handleFlipCard(cardId);
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onCardClick(_x) {
            return _onCardClick.apply(this, arguments);
          }
          return onCardClick;
        }()
        /**
         * 处理翻牌逻辑
         */;

        _proto.handleFlipCard = /*#__PURE__*/
        function () {
          var _handleFlipCard = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cardId) {
            var success, gameState, card, cardUI;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // 尝试翻牌
                  success = gameMgr.flipCard(cardId);
                  if (success) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  // 锁定操作
                  gameMgr.setProcessing(true);
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    _context2.next = 8;
                    break;
                  }
                  gameMgr.setProcessing(false);
                  return _context2.abrupt("return");
                case 8:
                  // 播放翻牌动画（翻牌数会通过 GBind 自动更新）
                  card = gameState.cards.find(function (c) {
                    return c.id === cardId;
                  });
                  cardUI = this.cardUIMap.get(cardId);
                  if (!(card && cardUI)) {
                    _context2.next = 13;
                    break;
                  }
                  _context2.next = 13;
                  return cardUI.playFlipAnimation(card.type);
                case 13:
                  if (!(gameState.selectedCards.length === 2)) {
                    _context2.next = 20;
                    break;
                  }
                  _context2.next = 16;
                  return this.delay(500);
                case 16:
                  _context2.next = 18;
                  return this.checkAndHandleMatch();
                case 18:
                  _context2.next = 26;
                  break;
                case 20:
                  // 解锁操作
                  gameMgr.setProcessing(false);

                  // 如果是AI回合，继续AI操作
                  if (!gameMgr.isAITurn()) {
                    _context2.next = 26;
                    break;
                  }
                  _context2.next = 24;
                  return this.delay(800);
                case 24:
                  _context2.next = 26;
                  return this.aiTurn();
                case 26:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function handleFlipCard(_x2) {
            return _handleFlipCard.apply(this, arguments);
          }
          return handleFlipCard;
        }()
        /**
         * 检查并处理配对结果
         */;

        _proto.checkAndHandleMatch = /*#__PURE__*/
        function () {
          var _checkAndHandleMatch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var gameState, _iterator3, _step3, card, cardUI, matchResult;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    // 隐藏已选卡片的选择框
                    for (_iterator3 = _createForOfIteratorHelperLoose(gameState.selectedCards); !(_step3 = _iterator3()).done;) {
                      card = _step3.value;
                      cardUI = this.cardUIMap.get(card.id);
                      if (cardUI) {
                        cardUI.hideSelectFrame();
                      }
                    }
                  }
                  matchResult = gameMgr.checkMatch();
                  if (!(matchResult === true)) {
                    _context3.next = 8;
                    break;
                  }
                  _context3.next = 6;
                  return this.handleMatchSuccess();
                case 6:
                  _context3.next = 11;
                  break;
                case 8:
                  if (!(matchResult === false)) {
                    _context3.next = 11;
                    break;
                  }
                  _context3.next = 11;
                  return this.handleMatchFail();
                case 11:
                  if (!gameMgr.isGameOver()) {
                    _context3.next = 16;
                    break;
                  }
                  _context3.next = 14;
                  return this.delay(500);
                case 14:
                  this.showResult();
                  return _context3.abrupt("return");
                case 16:
                  // 解锁操作
                  gameMgr.setProcessing(false);

                  // 如果是AI回合，继续
                  if (!gameMgr.isAITurn()) {
                    _context3.next = 22;
                    break;
                  }
                  _context3.next = 20;
                  return this.delay(1000);
                case 20:
                  _context3.next = 22;
                  return this.aiTurn();
                case 22:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function checkAndHandleMatch() {
            return _checkAndHandleMatch.apply(this, arguments);
          }
          return checkAndHandleMatch;
        }()
        /**
         * 处理配对成功
         */;

        _proto.handleMatchSuccess = /*#__PURE__*/
        function () {
          var _handleMatchSuccess = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _this$cardUIMap$get, _this$cardUIMap$get2;
            var gameState, _gameState$selectedCa, card1, card2;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    _context4.next = 3;
                    break;
                  }
                  return _context4.abrupt("return");
                case 3:
                  _gameState$selectedCa = gameState.selectedCards, card1 = _gameState$selectedCa[0], card2 = _gameState$selectedCa[1];
                  this._log.log("\u914D\u5BF9\u6210\u529F\uFF01Type: " + card1.type);

                  // 播放出场动画
                  _context4.next = 7;
                  return this.playMatchSuccessAnimation(card1, card2);
                case 7:
                  // 隐藏配对成功的卡牌
                  (_this$cardUIMap$get = this.cardUIMap.get(card1.id)) == null || _this$cardUIMap$get.hide();
                  (_this$cardUIMap$get2 = this.cardUIMap.get(card2.id)) == null || _this$cardUIMap$get2.hide();

                  // 清空选择
                  gameMgr.clearSelection();

                  // 不切换回合，当前玩家继续
                  this._log.log("配对成功，当前玩家继续回合");
                case 11:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function handleMatchSuccess() {
            return _handleMatchSuccess.apply(this, arguments);
          }
          return handleMatchSuccess;
        }()
        /**
         * 处理配对失败
         */;

        _proto.handleMatchFail = /*#__PURE__*/
        function () {
          var _handleMatchFail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var gameState, _gameState$selectedCa2, card1, card2, card1UI, card2UI;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    _context5.next = 3;
                    break;
                  }
                  return _context5.abrupt("return");
                case 3:
                  _gameState$selectedCa2 = gameState.selectedCards, card1 = _gameState$selectedCa2[0], card2 = _gameState$selectedCa2[1];
                  this._log.log("\u914D\u5BF9\u5931\u8D25\uFF01" + card1.type + " vs " + card2.type);

                  // 播放抖动动画
                  card1UI = this.cardUIMap.get(card1.id);
                  card2UI = this.cardUIMap.get(card2.id);
                  if (!(card1UI && card2UI)) {
                    _context5.next = 10;
                    break;
                  }
                  _context5.next = 10;
                  return Promise.all([card1UI.playShakeAnimation(), card2UI.playShakeAnimation()]);
                case 10:
                  _context5.next = 12;
                  return this.delay(800);
                case 12:
                  if (!(card1UI && card2UI)) {
                    _context5.next = 15;
                    break;
                  }
                  _context5.next = 15;
                  return Promise.all([card1UI.playFlipAnimation(0), card2UI.playFlipAnimation(0)]);
                case 15:
                  // 重置选择
                  gameMgr.resetSelection();

                  // 切换回合
                  gameMgr.switchPlayer();
                  this.highlightCurrentPlayer();
                  this._log.log("配对失败，切换回合");
                case 19:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function handleMatchFail() {
            return _handleMatchFail.apply(this, arguments);
          }
          return handleMatchFail;
        }()
        /**
         * AI回合
         */;

        _proto.aiTurn = /*#__PURE__*/
        function () {
          var _aiTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var cardId;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (gameMgr.isAITurn()) {
                    _context6.next = 2;
                    break;
                  }
                  return _context6.abrupt("return");
                case 2:
                  this.isAIProcessing = true;

                  // AI延迟思考
                  _context6.next = 5;
                  return this.delay(400 + Math.random() * 300);
                case 5:
                  // 0.4-0.7秒
                  // AI选择卡牌
                  cardId = gameMgr.aiSelectCard();
                  if (!(cardId !== null)) {
                    _context6.next = 9;
                    break;
                  }
                  _context6.next = 9;
                  return this.handleFlipCard(cardId);
                case 9:
                  this.isAIProcessing = false;
                case 10:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function aiTurn() {
            return _aiTurn.apply(this, arguments);
          }
          return aiTurn;
        }()
        /**
         * 播放配对成功动画
         * 移动到屏幕中间并列，放大展示，等待，然后移动到获胜方向消失
         */;

        _proto.playMatchSuccessAnimation = /*#__PURE__*/
        function () {
          var _playMatchSuccessAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(card1, card2) {
            var card1UI, card2UI, gameState, card1LocalPos, card2LocalPos, card1GlobalPos, card2GlobalPos, centerX, centerY, cardWidth, gap, centerDistance, card1CenterX, card2CenterX, targetY, shrinkGap, card1TargetX, card2TargetX;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  card1UI = this.cardUIMap.get(card1.id);
                  card2UI = this.cardUIMap.get(card2.id);
                  if (!(!card1UI || !card2UI)) {
                    _context7.next = 4;
                    break;
                  }
                  return _context7.abrupt("return");
                case 4:
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    _context7.next = 7;
                    break;
                  }
                  return _context7.abrupt("return");
                case 7:
                  // 获取卡牌在CardArea中的当前坐标
                  card1LocalPos = card1UI.UI.localToGlobal(0, 0);
                  card2LocalPos = card2UI.UI.localToGlobal(0, 0); // 将卡牌从CardArea移动到游戏界面根节点，保持视觉位置不变
                  card1GlobalPos = this.UI.globalToLocal(card1LocalPos.x, card1LocalPos.y);
                  card2GlobalPos = this.UI.globalToLocal(card2LocalPos.x, card2LocalPos.y);
                  this.UI.addChild(card1UI.UI);
                  this.UI.addChild(card2UI.UI);
                  card1UI.UI.setPosition(card1GlobalPos.x, card1GlobalPos.y);
                  card2UI.UI.setPosition(card2GlobalPos.x, card2GlobalPos.y);

                  // 计算屏幕中间位置（两张卡牌并列，间距40像素）
                  centerX = this.UI.width / 2;
                  centerY = this.UI.height / 2;
                  cardWidth = card1UI.UI.width; // 卡牌原始宽度
                  gap = 40; // 两张卡牌边缘间距40像素
                  // 放大2倍后，卡牌半径为cardWidth，所以两个中心点的距离 = 2 * cardWidth + gap
                  centerDistance = cardWidth * 2 + gap;
                  card1CenterX = centerX - centerDistance / 2; // 左侧卡牌中心
                  card2CenterX = centerX + centerDistance / 2; // 右侧卡牌中心
                  // 目标位置：根据当前玩家决定收起方向（红方=上，蓝方=下）
                  targetY = gameState.currentPlayer === 0 ? 30 : this.UI.height - 30; // 收起时的水平位置：向中心靠拢（缩小后两张卡片间距15像素）
                  shrinkGap = 15;
                  card1TargetX = centerX - shrinkGap / 2;
                  card2TargetX = centerX + shrinkGap / 2; // 播放动画：移动到中间 → 放大2倍 → 等待 → 移动到获胜方向并靠拢 → 缩小渐隐
                  return _context7.abrupt("return", new Promise(function (resolve) {
                    // 卡牌1动画
                    var anim1 = tween(card1UI.UI)
                    // 阶段1：移动到中间（左侧）
                    .to(0.3, {
                      x: card1CenterX,
                      y: centerY
                    }, {
                      easing: 'sineOut'
                    })
                    // 阶段2：放大2倍展示
                    .to(0.3, {
                      scaleX: 2.0,
                      scaleY: 2.0
                    }, {
                      easing: 'backOut'
                    })
                    // 阶段3：停留展示
                    .delay(1)
                    // 阶段4：移动到目标位置 + 向中心靠拢 + 缩小
                    .to(0.4, {
                      x: card1TargetX,
                      y: targetY,
                      scaleX: 0.3,
                      scaleY: 0.3
                    }, {
                      easing: 'sineIn'
                    })
                    // 阶段5：淡出
                    .to(0.2, {
                      alpha: 0
                    });

                    // 卡牌2动画（与卡牌1同步）
                    var anim2 = tween(card2UI.UI)
                    // 阶段1：移动到中间（右侧）
                    .to(0.3, {
                      x: card2CenterX,
                      y: centerY
                    }, {
                      easing: 'sineOut'
                    })
                    // 阶段2：放大2倍展示
                    .to(0.3, {
                      scaleX: 2.0,
                      scaleY: 2.0
                    }, {
                      easing: 'backOut'
                    })
                    // 阶段3：停留展示
                    .delay(1)
                    // 阶段4：移动到目标位置 + 向中心靠拢 + 缩小
                    .to(0.4, {
                      x: card2TargetX,
                      y: targetY,
                      scaleX: 0.3,
                      scaleY: 0.3
                    }, {
                      easing: 'sineIn'
                    })
                    // 阶段5：淡出
                    .to(0.2, {
                      alpha: 0
                    }).call(function () {
                      resolve();
                    });
                    anim1.start();
                    anim2.start();
                  }));
                case 27:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function playMatchSuccessAnimation(_x3, _x4) {
            return _playMatchSuccessAnimation.apply(this, arguments);
          }
          return playMatchSuccessAnimation;
        }()
        /**
         * 播放开场动画
         */;

        _proto.playStartAnimation = /*#__PURE__*/
        function () {
          var _playStartAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            var _gameMgr$getGameState;
            var gameState, mask, redUI, blueUI, redLogic, blueLogic, isAI, centerY, redTargetX, blueTargetX, guideUI, guideLogic;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  gameState = gameMgr.getGameState();
                  if (gameState) {
                    _context8.next = 3;
                    break;
                  }
                  return _context8.abrupt("return");
                case 3:
                  this._log.log("播放开场动画");

                  // 创建半透明黑色遮罩
                  mask = new GGraph();
                  mask.setSize(this.UI.width, this.UI.height);
                  mask.drawRect(0, Color.TRANSPARENT, new Color(0, 0, 0, 150)); // 黑色，透明度150/255
                  this.UI.addChild(mask); // 添加到最底层

                  // 创建红蓝出场组件
                  redUI = Game_ChuChangRed.createInstance();
                  blueUI = Game_ChuChangBlue.createInstance();
                  redLogic = redUI.Get(Game_ChuChangRed_Logic);
                  blueLogic = blueUI.Get(Game_ChuChangBlue_Logic);
                  isAI = ((_gameMgr$getGameState = gameMgr.getGameState()) == null ? void 0 : _gameMgr$getGameState.mode) === 'single' ? 1 : 0;
                  redUI.m_isAI.selectedIndex = isAI;
                  blueUI.m_isAI.selectedIndex = isAI;
                  centerY = this.UI.height / 2; // 红方从左侧进入
                  redUI.setPosition(-200, centerY);
                  redUI.setPivot(0.5, 0.5, true);

                  // 蓝方从右侧进入
                  blueUI.setPosition(this.UI.width + 200, centerY);
                  blueUI.setPivot(0.5, 0.5, true);

                  // 初始化VS图标（隐藏）
                  blueUI.m_vs.visible = false;
                  this.UI.addChild(redUI);
                  this.UI.addChild(blueUI);

                  // 计算目标位置（屏幕边缘）
                  redTargetX = redUI.width / 2;
                  blueTargetX = this.UI.width - blueUI.width / 2; // 播放进入动画
                  _context8.next = 27;
                  return Promise.all([redLogic.playEnterAnimation(redTargetX), blueLogic.playEnterAnimation(blueTargetX)]);
                case 27:
                  _context8.next = 29;
                  return blueLogic.playVSAnimation();
                case 29:
                  _context8.next = 31;
                  return this.delay(500);
                case 31:
                  _context8.next = 33;
                  return Promise.all([redLogic.playFadeOutAnimation(), blueLogic.playFadeOutAnimation()]);
                case 33:
                  // 清理
                  redUI.removeFromParent();
                  blueUI.removeFromParent();
                  redUI.dispose();
                  blueUI.dispose();

                  // 移除遮罩
                  mask.removeFromParent();
                  mask.dispose();

                  // 如果是AI模式且未显示过引导，显示引导弹窗
                  if (!(gameState.mode === 'single' && !Game_GanmePage_Logic.hasShownGuide)) {
                    _context8.next = 49;
                    break;
                  }
                  this._log.log("显示引导弹窗");
                  _context8.next = 43;
                  return GUIManager.open(Game_GuideView);
                case 43:
                  guideUI = _context8.sent;
                  guideLogic = guideUI.contentPane.Get(Game_GuideView_Logic); // 等待引导弹窗完成
                  _context8.next = 47;
                  return guideLogic.waitForComplete();
                case 47:
                  this._log.log("引导弹窗已完成");

                  // 标记为已显示
                  Game_GanmePage_Logic.hasShownGuide = true;
                case 49:
                  if (!gameMgr.isAITurn()) {
                    _context8.next = 54;
                    break;
                  }
                  _context8.next = 52;
                  return this.delay(500);
                case 52:
                  _context8.next = 54;
                  return this.aiTurn();
                case 54:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this);
          }));
          function playStartAnimation() {
            return _playStartAnimation.apply(this, arguments);
          }
          return playStartAnimation;
        }()
        /**
         * 高亮当前玩家
         */;

        _proto.highlightCurrentPlayer = function highlightCurrentPlayer() {
          var gameState = gameMgr.getGameState();
          if (!gameState) {
            return;
          }
          var currentPlayer = gameState.currentPlayer;

          // 设置红蓝图标的透明度
          if (currentPlayer === 0) {
            // 红方回合
            this.UI.m_red.grayed = false;
            this.UI.m_blue.grayed = true;
            this.UI.m_ai.grayed = false;
            this.UI.m_user.grayed = true;
            this.UI.m_img.grayed = true;
            this.UI.m_touxiangkuang.grayed = false;
            // AI回合时播放头像框旋转动画
            if (gameState.mode === 'single') {
              this.playAvatarRotateAnimation();
            }
          } else {
            // 蓝方回合
            this.UI.m_red.grayed = true;
            this.UI.m_blue.grayed = false;
            this.UI.m_ai.grayed = true;
            this.UI.m_user.grayed = false;
            this.UI.m_img.grayed = false;
            this.UI.m_touxiangkuang.grayed = true;
          }
          this._log.log("\u9AD8\u4EAE\u73A9\u5BB6: " + (currentPlayer === 0 ? '红方' : '蓝方'));
        }

        /**
         * 播放头像框旋转动画
         */;
        _proto.playAvatarRotateAnimation = function playAvatarRotateAnimation() {
          var _this4 = this;
          // 停止之前的动画
          tween(this.UI.m_touxiangkuang).stop();

          // 重置旋转角度
          this.UI.m_touxiangkuang.rotation = 0;

          // 播放360度旋转动画
          tween(this.UI.m_touxiangkuang).to(0.5, {
            rotation: 360
          }, {
            easing: 'backOut'
          }).call(function () {
            // 重置旋转角度，避免累积
            _this4.UI.m_touxiangkuang.rotation = 0;
          }).start();
        }

        /**
         * 显示结算界面
         */;
        _proto.showResult = function showResult() {
          var result = gameMgr.getGameResult();
          if (!result) {
            return;
          }
          this._log.log("\u6E38\u620F\u7ED3\u675F\uFF01\u83B7\u80DC\u65B9: " + result.winner.side + ", \u8BC4\u7EA7: " + result.rank);

          // 关闭游戏界面
          // GUIManager.close(Game_GanmePage);

          // 根据模式打开对应结算界面
          var gameState = gameMgr.getGameState();
          if ((gameState == null ? void 0 : gameState.mode) === 'single') {
            GUIManager.open(Game_ResultPage);
          } else {
            GUIManager.open(Game_ResultTwoPlayerPage);
          }
        }

        /**
         * 退出按钮点击
         */;
        _proto.onExitClick = function onExitClick() {
          this._log.log("退出游戏");

          // 重置游戏状态
          gameMgr.resetGame();

          // // 重置引导显示标志（返回主页时重置）
          // Game_GanmePage_Logic.hasShownGuide = false;

          // 关闭游戏界面
          GUIManager.close(Game_GanmePage);

          // 返回开始界面
          GUIManager.open(Game_StartPage);
        }

        /**
         * 延迟辅助函数
         */;
        _proto.delay = function delay(ms) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
          });
        };
        return Game_GanmePage_Logic;
      }(GUILogicBase), _class2.hasShownGuide = false, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GanmePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "dee41/IGZlDa66PrG1YMViV", "Game_GanmePage", undefined);
      var Game_GanmePage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_GanmePage, _fgui$GComponent);
        function Game_GanmePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_isAI = void 0;
          _this.m_red = void 0;
          _this.m_blue = void 0;
          _this.m_CardArea = void 0;
          _this.m_fipsNum = void 0;
          _this.m_user = void 0;
          _this.m_username = void 0;
          _this.m_img = void 0;
          _this.m_ai = void 0;
          _this.m_touxiangkuang = void 0;
          _this.m_exitBtn = void 0;
          _this.m_blueValue = void 0;
          _this.m_redValue = void 0;
          return _this;
        }
        Game_GanmePage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "GanmePage");
        };
        var _proto = Game_GanmePage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_isAI = this.getController("isAI");
          this.m_red = this.getChild("red");
          this.m_blue = this.getChild("blue");
          this.m_CardArea = this.getChild("CardArea");
          this.m_fipsNum = this.getChild("fipsNum");
          this.m_user = this.getChild("user");
          this.m_username = this.getChild("username");
          this.m_img = this.getChild("img");
          this.m_ai = this.getChild("ai");
          this.m_touxiangkuang = this.getChild("touxiangkuang");
          this.m_exitBtn = this.getChild("exitBtn");
          this.m_blueValue = this.getChild("blueValue");
          this.m_redValue = this.getChild("redValue");
        };
        return Game_GanmePage;
      }(GComponent), _class2.URL = "ui://6gpz43l1g1kk1c", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GuideView_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_GuideView.ts', './Game_SimpleWindow.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUIManager, GUILogicBase, Game_GuideView, GameSimpleWindow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_GuideView = module.default;
    }, function (module) {
      GameSimpleWindow = module.GameSimpleWindow;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "49fb5LbghNPzY69id9C+mNP", "Game_GuideView_Logic", undefined);
      var Game_GuideView_Logic = exports('default', (_dec = addLogic(Game_GuideView), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_GuideView_Logic, _GUILogicBase);
        function Game_GuideView_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.currentStage = 1;
          // 当前阶段：1 或 2
          _this.resolveCallback = null;
          return _this;
        }
        var _proto = Game_GuideView_Logic.prototype;
        // 用于Promise的resolve回调
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          // 点击弹窗切换到阶段2
          this.UI.onClick(function () {
            if (_this2.currentStage === 1) {
              _this2.showStage2();
            }
          }, this);

          // 关闭按钮点击关闭弹窗
          this.UI.m_close.onClick(function () {
            _this2.closeGuide();
          }, this);
        };
        _proto.start = function start() {
          // 阶段1：显示欢迎文案
          this.showStage1();
        }

        /**
         * 显示阶段1文案
         */;
        _proto.showStage1 = function showStage1() {
          this.currentStage = 1;
          // Hi, user（user为黄色FFBC14）let's have a competition
          this.UI.m_content.text = "Hi, [color=#FFBC14]user[/color]\nlet's have a competition";
          this.UI.m_c1.selectedIndex = 0; // 阶段1状态
          this.UI.m_close.visible = false; // 隐藏关闭按钮
        }

        /**
         * 显示阶段2文案
         */;
        _proto.showStage2 = function showStage2() {
          this.currentStage = 2;
          // Click on the card, and the same\ncard will earn points
          this.UI.m_content.text = "Click on the card, and the same\ncard will earn points";
          this.UI.m_c1.selectedIndex = 1; // 阶段2状态
          this.UI.m_close.visible = true; // 显示关闭按钮
        }

        /**
         * 关闭引导弹窗
         */;
        _proto.closeGuide = function closeGuide() {
          GUIManager.close(Game_GuideView);
          // 触发Promise的resolve，通知外部引导已完成
          if (this.resolveCallback) {
            this.resolveCallback();
            this.resolveCallback = null;
          }
        }

        /**
         * 等待引导完成的Promise
         */;
        _proto.waitForComplete = function waitForComplete() {
          var _this3 = this;
          return new Promise(function (resolve) {
            _this3.resolveCallback = resolve;
          });
        };
        return Game_GuideView_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: GameSimpleWindow
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GuideView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "3aed43FEDNDrY4Mc4FEE5AV", "Game_GuideView", undefined);
      var Game_GuideView = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_GuideView, _fgui$GComponent);
        function Game_GuideView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          _this.m_content = void 0;
          _this.m_close = void 0;
          return _this;
        }
        Game_GuideView.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "GuideView");
        };
        var _proto = Game_GuideView.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
          this.m_content = this.getChild("content");
          this.m_close = this.getChild("close");
        };
        return Game_GuideView;
      }(GComponent), _class2.URL = "ui://6gpz43l1wntw33", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ResultPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_ResultPage.ts', './Game_GanmePage.ts', './Game_StartPage.ts', './GameMgr.ts', './FormatUtils.ts', './Game_DialogWindow.ts', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, addLogic, GUIManager, GUILogicBase, Game_ResultPage, Game_GanmePage, Game_StartPage, gameMgr, FormatUtils, GameDialogWindow, UIPackage, GRoot;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      addLogic = module.addLogic;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_ResultPage = module.default;
    }, function (module) {
      Game_GanmePage = module.default;
    }, function (module) {
      Game_StartPage = module.default;
    }, function (module) {
      gameMgr = module.gameMgr;
    }, function (module) {
      FormatUtils = module.FormatUtils;
    }, function (module) {
      GameDialogWindow = module.GameDialogWindow;
    }, function (module) {
      UIPackage = module.UIPackage;
      GRoot = module.GRoot;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "a3c181TufVA6Z+nUsDXww7y", "Game_ResultPage_Logic", undefined);
      var Game_ResultPage_Logic = exports('default', (_dec = addLogic(Game_ResultPage), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_ResultPage_Logic, _GUILogicBase);
        function Game_ResultPage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_ResultPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 绑定按钮点击事件
          this.UI.m_playAgainBtn.onClick(this.onPlayAgain, this);
          this.UI.m_homeBtn.onClick(this.onBackHome, this);
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 显示结算数据
                  this.displayResult();

                  // 播放音效
                  this.playResultSound();

                  // 延迟后播放评分动画
                  _context.next = 4;
                  return this.delay(300);
                case 4:
                  _context.next = 6;
                  return this.playRankAnimation();
                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }()
        /**
         * 显示结算数据
         */;

        _proto.displayResult = function displayResult() {
          var result = gameMgr.getGameResult();
          if (!result) {
            console.error("无法获取游戏结果");
            return;
          }
          var winner = result.winner,
            loser = result.loser,
            flipsCount = result.flipsCount,
            rank = result.rank,
            efficiency = result.efficiency;

          // 设置获胜方标记（0=红方，1=蓝方）
          this.UI.m_winner.selectedIndex = winner.side === 'red' ? 0 : 1;

          // 显示分数（补零格式化）
          var redScore = result.winner.side === 'red' ? winner.score : loser.score;
          var blueScore = result.winner.side === 'blue' ? winner.score : loser.score;
          this.UI.m_redValue.text = FormatUtils.padZero(redScore);
          this.UI.m_blueValue.text = FormatUtils.padZero(blueScore);

          // 显示翻牌数（补零格式化）
          this.UI.m_flipsValue.setVar("value", FormatUtils.padZero(flipsCount)).flushVars();

          // 显示评级和描述
          // const rankDescription = gameMgr.getRankDescription(rank);
          // this.UI.m_name.text = `${rank} - ${rankDescription}`;

          // 设置评分控制器索引（UI顺序：SSS, SS, S, A, B）
          var rankIndexMap = {
            'SSS': 0,
            // 完美记忆
            'SS': 1,
            // 超凡
            'S': 2,
            // 大师
            'A': 3,
            // 高手
            'B': 4 // 新手
          };

          this.UI.m_pingfen.selectedIndex = rankIndexMap[rank] || 4;

          // 如果UI有头像，显示获胜方头像
          if (this.UI.m_img) ;
          this._log.log("\u7ED3\u7B97\u663E\u793A - \u83B7\u80DC: " + winner.side + ", \u8BC4\u7EA7: " + rank + ", \u6548\u7387: " + efficiency.toFixed(2) + ", \u7FFB\u724C\u6570: " + flipsCount);
        }

        /**
         * 再玩一局
         */;
        _proto.onPlayAgain = function onPlayAgain() {
          this._log.log("再玩一局");

          // 重新初始化游戏（保持单人模式）
          gameMgr.initGame('single');

          // 关闭结算界面
          GUIManager.close(Game_ResultPage);

          // 打开游戏界面
          GUIManager.open(Game_GanmePage);
        }

        /**
         * 返回首页
         */;
        _proto.onBackHome = function onBackHome() {
          this._log.log("返回首页");

          // 关闭结算界面
          GUIManager.close(Game_ResultPage);
          GUIManager.close(Game_GanmePage);

          // 返回开始界面
          GUIManager.open(Game_StartPage);
        }

        /**
         * 播放结算音效
         */;
        _proto.playResultSound = function playResultSound() {
          var result = gameMgr.getGameResult();
          if (!result) {
            return;
          }
          try {
            var uiPackage = UIPackage.getByName("Game");
            if (!uiPackage) {
              this._log.log("警告：无法找到 Game UI包");
              return;
            }

            // 根据玩家胜负播放音效
            // winner.isAI === false 表示玩家胜利，否则AI胜利（玩家失败）
            var soundName = result.winner.isAI ? "fail" : "Win";
            var sound = uiPackage.getItemAssetByName(soundName);
            if (sound) {
              GRoot.inst.playOneShotSound(sound);
              this._log.log("\u64AD\u653E" + soundName + "\u97F3\u6548");
            } else {
              this._log.log("\u8B66\u544A\uFF1A\u65E0\u6CD5\u52A0\u8F7D " + soundName + " \u97F3\u6548");
            }
          } catch (error) {
            this._log.log("播放结算音效失败:", error);
          }
        }

        /**
         * 播放评分图标飞入动画
         */;
        _proto.playRankAnimation = /*#__PURE__*/
        function () {
          var _playRankAnimation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this = this;
            var icon, originalY;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  icon = this.UI.m_pinfenIcon;
                  if (icon) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  // 记录原始位置
                  originalY = icon.y; // 设置初始状态：上方200px，透明，缩小
                  icon.y = originalY - 200;
                  icon.alpha = 0;
                  icon.scaleX = 0.5;
                  icon.scaleY = 0.5;

                  // 播放飞入动画：从上方飞入 + 弹性缩放 + 渐显
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    tween(icon).to(0.6, {
                      y: originalY,
                      alpha: 1,
                      scaleX: 1,
                      scaleY: 1
                    }, {
                      easing: 'backOut'
                    }).call(function () {
                      _this._log.log("评分图标动画播放完成");
                      resolve();
                    }).start();
                  }));
                case 9:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function playRankAnimation() {
            return _playRankAnimation.apply(this, arguments);
          }
          return playRankAnimation;
        }()
        /**
         * 延迟辅助函数
         */;

        _proto.delay = function delay(ms) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
          });
        };
        return Game_ResultPage_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: GameDialogWindow
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ResultPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "1ae219s0glIspTQ5DiYE5Vd", "Game_ResultPage", undefined);
      var Game_ResultPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_ResultPage, _fgui$GComponent);
        function Game_ResultPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_winner = void 0;
          _this.m_pingfen = void 0;
          _this.m_blueValue = void 0;
          _this.m_redValue = void 0;
          _this.m_playAgainBtn = void 0;
          _this.m_homeBtn = void 0;
          _this.m_flipsValue = void 0;
          _this.m_img = void 0;
          _this.m_name = void 0;
          _this.m_pinfenIcon = void 0;
          return _this;
        }
        Game_ResultPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "ResultPage");
        };
        var _proto = Game_ResultPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_winner = this.getController("winner");
          this.m_pingfen = this.getController("pingfen");
          this.m_blueValue = this.getChild("blueValue");
          this.m_redValue = this.getChild("redValue");
          this.m_playAgainBtn = this.getChild("playAgainBtn");
          this.m_homeBtn = this.getChild("homeBtn");
          this.m_flipsValue = this.getChild("flipsValue");
          this.m_img = this.getChild("img");
          this.m_name = this.getChild("name");
          this.m_pinfenIcon = this.getChild("pinfenIcon");
        };
        return Game_ResultPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1l2hm2k", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ResultTwoPlayerPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_ResultTwoPlayerPage.ts', './Game_GanmePage.ts', './Game_StartPage.ts', './GameMgr.ts', './FormatUtils.ts', './Game_DialogWindow.ts', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUIManager, GUILogicBase, Game_ResultTwoPlayerPage, Game_GanmePage, Game_StartPage, gameMgr, FormatUtils, GameDialogWindow, UIPackage, GRoot;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_ResultTwoPlayerPage = module.default;
    }, function (module) {
      Game_GanmePage = module.default;
    }, function (module) {
      Game_StartPage = module.default;
    }, function (module) {
      gameMgr = module.gameMgr;
    }, function (module) {
      FormatUtils = module.FormatUtils;
    }, function (module) {
      GameDialogWindow = module.GameDialogWindow;
    }, function (module) {
      UIPackage = module.UIPackage;
      GRoot = module.GRoot;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "b909amDWtlHQ7JFbCXtUlSk", "Game_ResultTwoPlayerPage_Logic", undefined);
      var Game_ResultTwoPlayerPage_Logic = exports('default', (_dec = addLogic(Game_ResultTwoPlayerPage), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_ResultTwoPlayerPage_Logic, _GUILogicBase);
        function Game_ResultTwoPlayerPage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_ResultTwoPlayerPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 绑定按钮点击事件
          this.UI.m_playAgainBtn.onClick(this.onPlayAgain, this);
          this.UI.m_homeBtn.onClick(this.onBackHome, this);
        };
        _proto.start = function start() {
          // 显示结算数据
          this.displayResult();

          // 播放胜利音效
          this.playWinSound();
        }

        /**
         * 显示结算数据
         */;
        _proto.displayResult = function displayResult() {
          var result = gameMgr.getGameResult();
          if (!result) {
            console.error("无法获取游戏结果");
            return;
          }
          var winner = result.winner,
            loser = result.loser;

          // 设置获胜方标记（0=红方，1=蓝方）
          this.UI.m_winner.selectedIndex = winner.side === 'red' ? 0 : 1;

          // 显示分数（补零格式化）
          var redScore = winner.side === 'red' ? winner.score : loser.score;
          var blueScore = winner.side === 'blue' ? winner.score : loser.score;
          this.UI.m_redValue.text = FormatUtils.padZero(redScore);
          this.UI.m_blueValue.text = FormatUtils.padZero(blueScore);
          this._log.log("\u53CC\u4EBA\u7ED3\u7B97 - \u83B7\u80DC: " + winner.side + ", \u7EA2\u65B9: " + this.UI.m_redValue.text + ", \u84DD\u65B9: " + this.UI.m_blueValue.text);
        }

        /**
         * 再玩一局
         */;
        _proto.onPlayAgain = function onPlayAgain() {
          this._log.log("再玩一局（双人模式）");

          // 重新初始化游戏（保持双人模式）
          gameMgr.initGame('double');

          // 关闭结算界面
          GUIManager.close(Game_ResultTwoPlayerPage);

          // 打开游戏界面
          GUIManager.open(Game_GanmePage);
        }

        /**
         * 返回首页
         */;
        _proto.onBackHome = function onBackHome() {
          this._log.log("返回首页");

          // 关闭结算界面
          GUIManager.close(Game_ResultTwoPlayerPage);
          GUIManager.close(Game_GanmePage);

          // 返回开始界面
          GUIManager.open(Game_StartPage);
        }

        /**
         * 播放胜利音效
         */;
        _proto.playWinSound = function playWinSound() {
          try {
            var uiPackage = UIPackage.getByName("Game");
            if (!uiPackage) {
              this._log.log("警告：无法找到 Game UI包");
              return;
            }
            var sound = uiPackage.getItemAssetByName("Win");
            if (sound) {
              GRoot.inst.playOneShotSound(sound);
              this._log.log("播放Win音效");
            } else {
              this._log.log("警告：无法加载 Win 音效");
            }
          } catch (error) {
            this._log.log("播放胜利音效失败:", error);
          }
        };
        return Game_ResultTwoPlayerPage_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: GameDialogWindow
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_ResultTwoPlayerPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "faada9AmvxCXIyGQ5W6qC9+", "Game_ResultTwoPlayerPage", undefined);
      var Game_ResultTwoPlayerPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_ResultTwoPlayerPage, _fgui$GComponent);
        function Game_ResultTwoPlayerPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_winner = void 0;
          _this.m_blueValue = void 0;
          _this.m_redValue = void 0;
          _this.m_playAgainBtn = void 0;
          _this.m_homeBtn = void 0;
          return _this;
        }
        Game_ResultTwoPlayerPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "ResultTwoPlayerPage");
        };
        var _proto = Game_ResultTwoPlayerPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_winner = this.getController("winner");
          this.m_blueValue = this.getChild("blueValue");
          this.m_redValue = this.getChild("redValue");
          this.m_playAgainBtn = this.getChild("playAgainBtn");
          this.m_homeBtn = this.getChild("homeBtn");
        };
        return Game_ResultTwoPlayerPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1l2hm2q", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_SimpleWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, GUIWindow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GUIWindow = module.GUIWindow;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0c5f4lgqvtD75xvbCHmoeKr", "Game_SimpleWindow", undefined);

      /**
       * 简单窗口类 - 仅居中对齐，无动画
       */
      var GameSimpleWindow = exports('GameSimpleWindow', /*#__PURE__*/function (_GUIWindow) {
        _inheritsLoose(GameSimpleWindow, _GUIWindow);
        function GameSimpleWindow() {
          return _GUIWindow.apply(this, arguments) || this;
        }
        var _proto = GameSimpleWindow.prototype;
        _proto.onInit = function onInit() {
          // 居中显示
          this.center();
        };
        return GameSimpleWindow;
      }(GUIWindow));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_StartPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_StartPage.ts', './Game_GanmePage.ts', './GameMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GUIManager, addLogic, GUILogicBase, Game_StartPage, Game_GanmePage, gameMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GUIManager = module.GUIManager;
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_StartPage = module.default;
    }, function (module) {
      Game_GanmePage = module.default;
    }, function (module) {
      gameMgr = module.gameMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a2ad6HnnrBMGLzWRJYmJWwV", "Game_StartPage_Logic", undefined);
      var Game_StartPage_Logic = exports('default', (_dec = addLogic(Game_StartPage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_StartPage_Logic, _GUILogicBase);
        function Game_StartPage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_StartPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 绑定按钮点击事件
          this.UI.m_OnePlayerBtn.onClick(this.onOnePlayerClick, this);
          this.UI.m_TwoPlayerBtn.onClick(this.onTwoPlayerClick, this);
        }

        /**
         * 单人模式按钮点击
         */;
        _proto.onOnePlayerClick = function onOnePlayerClick() {
          this._log.log("开始单人游戏");

          // 初始化单人游戏
          gameMgr.initGame('single');

          // 关闭当前界面
          GUIManager.close(Game_StartPage);

          // 打开游戏界面
          GUIManager.open(Game_GanmePage);
        }

        /**
         * 双人模式按钮点击
         */;
        _proto.onTwoPlayerClick = function onTwoPlayerClick() {
          this._log.log("开始双人游戏");

          // 初始化双人游戏
          gameMgr.initGame('double');

          // 关闭当前界面
          GUIManager.close(Game_StartPage);

          // 打开游戏界面
          GUIManager.open(Game_GanmePage);
        };
        return Game_StartPage_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_StartPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "0b8f3Ash9pDFpvP0/oF/VlW", "Game_StartPage", undefined);
      var Game_StartPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_StartPage, _fgui$GComponent);
        function Game_StartPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_OnePlayerBtn = void 0;
          _this.m_TwoPlayerBtn = void 0;
          return _this;
        }
        Game_StartPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "StartPage");
        };
        var _proto = Game_StartPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_OnePlayerBtn = this.getChild("OnePlayerBtn");
          this.m_TwoPlayerBtn = this.getChild("TwoPlayerBtn");
        };
        return Game_StartPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1g1kko", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Game_ChuChangRed.ts', './Game_ChuChangBlue.ts', './Game_GanmePage.ts', './Game_Card.ts', './Game_StartPage.ts', './Game_ResultPage.ts', './Game_ResultTwoPlayerPage.ts', './Game_Component1.ts', './Game_GuideView.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Game_ChuChangRed, Game_ChuChangBlue, Game_GanmePage, Game_Card, Game_StartPage, Game_ResultPage, Game_ResultTwoPlayerPage, Game_Component1, Game_GuideView;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Game_ChuChangRed = module.default;
    }, function (module) {
      Game_ChuChangBlue = module.default;
    }, function (module) {
      Game_GanmePage = module.default;
    }, function (module) {
      Game_Card = module.default;
    }, function (module) {
      Game_StartPage = module.default;
    }, function (module) {
      Game_ResultPage = module.default;
    }, function (module) {
      Game_ResultTwoPlayerPage = module.default;
    }, function (module) {
      Game_Component1 = module.default;
    }, function (module) {
      Game_GuideView = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "ae88b+X2utK0o1r28DEi0ak", "GameBinder", undefined);
      var GameBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function GameBinder() {}
        var _proto = GameBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Game_ChuChangRed.URL, Game_ChuChangRed);
          UIObjectFactory.setExtension(Game_ChuChangBlue.URL, Game_ChuChangBlue);
          UIObjectFactory.setExtension(Game_GanmePage.URL, Game_GanmePage);
          UIObjectFactory.setExtension(Game_Card.URL, Game_Card);
          UIObjectFactory.setExtension(Game_StartPage.URL, Game_StartPage);
          UIObjectFactory.setExtension(Game_ResultPage.URL, Game_ResultPage);
          UIObjectFactory.setExtension(Game_ResultTwoPlayerPage.URL, Game_ResultTwoPlayerPage);
          UIObjectFactory.setExtension(Game_Component1.URL, Game_Component1);
          UIObjectFactory.setExtension(Game_GuideView.URL, Game_GuideView);
        };
        return GameBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, autoBindToWindow, log, mk_instance_base;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
      log = module.log;
      mk_instance_base = module.instance_base;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "7b9f8w+XSxOGo9ObH2Onxor", "GameMgr", undefined);

      /**
       * 可观察的游戏数据（用于UI绑定）
       */
      var GameMgr = autoBindToWindow(_class = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(GameMgr, _instance_base);
        function GameMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          _this.gameState = null;
          /**
           * 可观察的游戏数据（用于UI自动绑定）
           */
          _this.observableData = {
            redScore: 0,
            blueScore: 0,
            flipsCount: 0
          };
          // 卡牌布局配置：6行，每行卡牌数量不同
          _this.LAYOUT_CONFIG = [{
            row: 0,
            cols: 4
          },
          // 第1行：4张
          {
            row: 1,
            cols: 3
          },
          // 第2行：3张
          {
            row: 2,
            cols: 4
          },
          // 第3行：4张
          {
            row: 3,
            cols: 4
          },
          // 第4行：4张
          {
            row: 4,
            cols: 3
          },
          // 第5行：3张
          {
            row: 5,
            cols: 4
          } // 第6行：4张
          ];
          // 评级规则（效率值 = 翻牌数 / 牌对数）
          _this.RANK_RULES = [{
            rank: 'SSS',
            maxEfficiency: 2.1,
            description: '完美记忆'
          }, {
            rank: 'SS',
            maxEfficiency: 2.3,
            description: '超凡'
          }, {
            rank: 'S',
            maxEfficiency: 2.5,
            description: '大师'
          }, {
            rank: 'A',
            maxEfficiency: 3.0,
            description: '高手'
          }, {
            rank: 'B',
            maxEfficiency: Infinity,
            description: '新手'
          }];
          return _this;
        }
        var _proto = GameMgr.prototype;
        /**
         * 初始化游戏
         * @param mode 游戏模式（单人/双人）
         */
        _proto.initGame = function initGame(mode) {
          // 随机AI概率（60-80%）
          var aiProbability = 0.6 + Math.random() * 0.2;
          this.gameState = {
            mode: mode,
            cards: this.generateCards(),
            players: [{
              isAI: mode === 'single',
              score: 0,
              side: 'red'
            },
            // 红方（单人模式下为AI）
            {
              isAI: false,
              score: 0,
              side: 'blue'
            } // 蓝方（始终为玩家）
            ],

            currentPlayer: 0,
            // 默认红方先手
            flipsCount: 0,
            selectedCards: [],
            aiMemory: new Map(),
            aiProbability: aiProbability,
            isProcessing: false
          };

          // 同步可观察数据
          this.syncObservableData();
          log("\u6E38\u620F\u521D\u59CB\u5316\u5B8C\u6210 - \u6A21\u5F0F: " + mode + ", \u5148\u624B: \u7EA2\u65B9, AI\u6982\u7387: " + (aiProbability * 100).toFixed(1) + "%");
        }

        /**
         * 重置游戏状态
         */;
        _proto.resetGame = function resetGame() {
          this.gameState = null;

          // 重置可观察数据
          this.observableData.redScore = 0;
          this.observableData.blueScore = 0;
          this.observableData.flipsCount = 0;
          log("游戏状态已重置");
        }

        /**
         * 同步游戏状态到可观察数据
         * @private
         */;
        _proto.syncObservableData = function syncObservableData() {
          if (!this.gameState) {
            return;
          }
          this.observableData.redScore = this.gameState.players[0].score;
          this.observableData.blueScore = this.gameState.players[1].score;
          this.observableData.flipsCount = this.gameState.flipsCount;
        }

        /**
         * 生成22张卡牌（11种类型x2）
         * 布局：6行，每行卡牌数量不同
         * 按行排列：从上到下，每行从左到右
         */;
        _proto.generateCards = function generateCards() {
          // 创建11对牌（type 1-11）
          var types = [];
          for (var i = 1; i <= 11; i++) {
            types.push(i, i); // 每种类型2张
          }

          // Fisher-Yates 洗牌算法
          for (var _i = types.length - 1; _i > 0; _i--) {
            var j = Math.floor(Math.random() * (_i + 1));
            var _ref = [types[j], types[_i]];
            types[_i] = _ref[0];
            types[j] = _ref[1];
          }

          // 根据布局配置分配卡牌（按行排列）
          var cards = [];
          var typeIndex = 0;

          // 按行遍历（从上到下）
          for (var _iterator = _createForOfIteratorHelperLoose(this.LAYOUT_CONFIG), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              row = _step$value.row,
              cols = _step$value.cols;
            // 每行内从左到右创建卡牌
            for (var col = 0; col < cols; col++) {
              cards.push({
                id: cards.length,
                type: types[typeIndex++],
                col: col,
                row: row,
                isFlipped: false,
                isMatched: false
              });
            }
          }
          return cards;
        }

        /**
         * 翻牌
         * @param cardId 卡牌ID
         * @returns 是否成功翻牌
         */;
        _proto.flipCard = function flipCard(cardId) {
          if (!this.gameState || this.gameState.isProcessing) {
            return false;
          }
          var card = this.gameState.cards.find(function (c) {
            return c.id === cardId;
          });
          if (!card || card.isFlipped || card.isMatched) {
            return false;
          }

          // 已选择2张卡牌，不能再选
          if (this.gameState.selectedCards.length >= 2) {
            return false;
          }

          // 翻开卡牌
          card.isFlipped = true;
          this.gameState.selectedCards.push(card);
          this.gameState.flipsCount++;

          // 同步可观察数据
          this.syncObservableData();

          // AI记录翻开的牌（无论是否AI回合）
          this.gameState.aiMemory.set(card.id, card.type);
          log("\u7FFB\u724C - ID: " + cardId + ", Type: " + card.type + ", \u5DF2\u9009: " + this.gameState.selectedCards.length + "/2");
          return true;
        }

        /**
         * 检查配对
         * @returns 配对结果：true=成功，false=失败，null=未选够2张
         */;
        _proto.checkMatch = function checkMatch() {
          if (!this.gameState) {
            return null;
          }
          var selectedCards = this.gameState.selectedCards;
          if (selectedCards.length !== 2) {
            return null;
          }
          var card1 = selectedCards[0],
            card2 = selectedCards[1];
          var isMatch = card1.type === card2.type;
          if (isMatch) {
            // 配对成功
            card1.isMatched = true;
            card2.isMatched = true;
            this.gameState.players[this.gameState.currentPlayer].score++;

            // 同步可观察数据
            this.syncObservableData();
            log("\u914D\u5BF9\u6210\u529F - Type: " + card1.type + ", \u5F53\u524D\u73A9\u5BB6\u5F97\u5206: " + this.gameState.players[this.gameState.currentPlayer].score);
          } else {
            // 配对失败，翻回背面
            log("\u914D\u5BF9\u5931\u8D25 - Type: " + card1.type + " vs " + card2.type);
          }
          return isMatch;
        }

        /**
         * 重置当前选择（配对失败后调用）
         */;
        _proto.resetSelection = function resetSelection() {
          if (!this.gameState) {
            return;
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.gameState.selectedCards), _step2; !(_step2 = _iterator2()).done;) {
            var card = _step2.value;
            if (!card.isMatched) {
              card.isFlipped = false;
            }
          }
          this.gameState.selectedCards = [];
        }

        /**
         * 清空当前选择（配对成功后调用）
         */;
        _proto.clearSelection = function clearSelection() {
          if (!this.gameState) {
            return;
          }
          this.gameState.selectedCards = [];
        }

        /**
         * 切换回合
         */;
        _proto.switchPlayer = function switchPlayer() {
          if (!this.gameState) {
            return;
          }
          this.gameState.currentPlayer = this.gameState.currentPlayer === 0 ? 1 : 0;
          log("\u56DE\u5408\u5207\u6362 - \u5F53\u524D\u73A9\u5BB6: " + (this.gameState.currentPlayer === 0 ? '红方' : '蓝方'));
        }

        /**
         * 判断游戏是否结束
         */;
        _proto.isGameOver = function isGameOver() {
          if (!this.gameState) {
            return false;
          }
          return this.gameState.cards.every(function (card) {
            return card.isMatched;
          });
        }

        /**
         * 获取游戏结果
         */;
        _proto.getGameResult = function getGameResult() {
          if (!this.gameState || !this.isGameOver()) {
            return null;
          }
          var _this$gameState$playe = this.gameState.players,
            player1 = _this$gameState$playe[0],
            player2 = _this$gameState$playe[1];
          var winner = player1.score > player2.score ? player1 : player2;
          var loser = player1.score > player2.score ? player2 : player1;
          var efficiency = this.gameState.flipsCount / 11; // 11对牌
          var rank = this.calculateRank(efficiency);
          return {
            winner: winner,
            loser: loser,
            flipsCount: this.gameState.flipsCount,
            rank: rank,
            efficiency: efficiency
          };
        }

        /**
         * 计算评级
         * @param efficiency 效率值（翻牌数/牌对数）
         */;
        _proto.calculateRank = function calculateRank(efficiency) {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.RANK_RULES), _step3; !(_step3 = _iterator3()).done;) {
            var rule = _step3.value;
            if (efficiency <= rule.maxEfficiency) {
              return rule.rank;
            }
          }
          return 'B';
        }

        /**
         * 获取评级描述
         */;
        _proto.getRankDescription = function getRankDescription(rank) {
          var rule = this.RANK_RULES.find(function (r) {
            return r.rank === rank;
          });
          return rule ? rule.description : '新手';
        }

        /**
         * 判断当前是否为AI回合
         */;
        _proto.isAITurn = function isAITurn() {
          if (!this.gameState) {
            return false;
          }
          return this.gameState.players[this.gameState.currentPlayer].isAI;
        }

        /**
         * AI选择卡牌
         * @returns 选择的卡牌ID
         */;
        _proto.aiSelectCard = function aiSelectCard() {
          if (!this.gameState) {
            return null;
          }
          var _this$gameState = this.gameState,
            cards = _this$gameState.cards,
            selectedCards = _this$gameState.selectedCards,
            aiMemory = _this$gameState.aiMemory,
            aiProbability = _this$gameState.aiProbability;
          var availableCards = cards.filter(function (c) {
            return !c.isFlipped && !c.isMatched;
          });
          if (availableCards.length === 0) {
            return null;
          }

          // 第一张：随机选择或使用记忆
          if (selectedCards.length === 0) {
            // 尝试使用记忆
            if (Math.random() < aiProbability && aiMemory.size > 0) {
              var _loop = function _loop() {
                  var card = _step4.value;
                  var knownType = aiMemory.get(card.id);
                  if (knownType !== undefined) {
                    // 检查是否有记忆中的配对牌
                    var pairCard = availableCards.find(function (c) {
                      return c.id !== card.id && aiMemory.get(c.id) === knownType;
                    });
                    if (pairCard) {
                      log("AI\u4F7F\u7528\u8BB0\u5FC6 - \u9009\u62E9\u5361\u724C " + card.id + ", Type: " + knownType);
                      return {
                        v: card.id
                      };
                    }
                  }
                },
                _ret;
              // 从记忆中找到有配对的牌
              for (var _iterator4 = _createForOfIteratorHelperLoose(availableCards), _step4; !(_step4 = _iterator4()).done;) {
                _ret = _loop();
                if (_ret) return _ret.v;
              }
            }

            // 随机选择
            var _randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
            log("AI\u968F\u673A\u9009\u62E9 - \u5361\u724C " + _randomCard.id);
            return _randomCard.id;
          }

          // 第二张：优先使用记忆
          var firstCard = selectedCards[0];
          var firstType = firstCard.type;

          // 尝试使用记忆找配对
          if (Math.random() < aiProbability) {
            var pairCard = availableCards.find(function (c) {
              return aiMemory.get(c.id) === firstType;
            });
            if (pairCard) {
              log("AI\u4F7F\u7528\u8BB0\u5FC6\u914D\u5BF9 - \u5361\u724C " + pairCard.id + ", Type: " + firstType);
              return pairCard.id;
            }
          }

          // 随机选择
          var randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
          log("AI\u968F\u673A\u9009\u62E9\u7B2C\u4E8C\u5F20 - \u5361\u724C " + randomCard.id);
          return randomCard.id;
        }

        /**
         * 设置处理状态（动画播放时锁定操作）
         */;
        _proto.setProcessing = function setProcessing(isProcessing) {
          if (this.gameState) {
            this.gameState.isProcessing = isProcessing;
          }
        }

        /**
         * 获取游戏状态（只读）
         */;
        _proto.getGameState = function getGameState() {
          return this.gameState;
        }

        /**
         * 获取卡牌布局配置
         */;
        _proto.getLayoutConfig = function getLayoutConfig() {
          return this.LAYOUT_CONFIG;
        };
        return GameMgr;
      }(mk_instance_base)) || _class;
      var gameMgr = exports('gameMgr', GameMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameTypes.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8a3f9wtThtNKp8+e2xdTj8q", "GameTypes", undefined);
      /**
       * 记忆卡牌游戏核心类型定义
       * 设计原则：数据结构驱动，消除特殊情况
       */
      // 卡牌数据
      // 玩家数据
      // 游戏模式
      // 游戏状态
      // 评级类型
      // 评级规则
      // 游戏结果
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CommonExport.ts', './ConfigBase.ts', './ConfigMgr.ts', './GameMgr.ts', './PoolMgr.ts', './GameTypes.ts', './FormatUtils.ts', './StartView.ts', './Game_Card.ts', './Game_Card_Logic.ts', './GameBinder.ts', './Game_ChuChangBlue.ts', './Game_ChuChangBlue_Logic.ts', './Game_ChuChangRed.ts', './Game_ChuChangRed_Logic.ts', './Game_Component1.ts', './Game_DialogWindow.ts', './Game_GanmePage.ts', './Game_GanmePage_Logic.ts', './Game_ResultPage.ts', './Game_ResultPage_Logic.ts', './Game_ResultTwoPlayerPage.ts', './Game_ResultTwoPlayerPage_Logic.ts', './Game_SimpleWindow.ts', './Game_StartPage.ts', './Game_StartPage_Logic.ts', './Game_GuideView.ts', './Game_GuideView_Logic.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './CommonExport.ts', './fairygui.mjs', './drongo-cc.mjs', './Game_StartPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, ProgressBar, Node, color, view, AudioSourceComponent, tween, Component, GUIManager, AllBinder, UIConfig, registerFont, GRoot, UIPackage, logConfig, LogLevel, log, Game_StartPage;
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
      logConfig = module.logConfig;
      LogLevel = module.LogLevel;
      log = module.log;
    }, function (module) {
      Game_StartPage = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b717ey19TVBBpBqTI0xPCo1", "StartView", undefined);
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
          {
            logConfig.level_n = LogLevel.none;
          }
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
                    this.playBGM(this.node, "Game", "Flop_bgm");
                    log("BGM播放成功");
                  } catch (error) {
                    console.warn("BGM播放失败:", error);
                  }

                  // 加载完成后打开角色选择界面
                  GUIManager.open(Game_StartPage);
                  _context.next = 15;
                  break;
                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  console.error("资源加载失败:", _context.t0);
                  // 即使加载失败也要继续游戏流程
                  GUIManager.open(Game_StartPage);
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