System.register("chunks:///_virtual/GameData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env', './drongo-cc.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, _extends, _createForOfIteratorHelperLoose, cclegacy, PREVIEW, mk_tool, IDataModel;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PREVIEW = module.PREVIEW;
    }, function (module) {
      mk_tool = module.tool;
      IDataModel = module.IDataModel;
    }],
    execute: function () {
      exports({
        DotType: void 0,
        GameState: void 0
      });

      cclegacy._RF.push({}, "1704dLRX0ZKHY6mgO3AXOYR", "GameData", undefined);

      var GameDataImpl = /*#__PURE__*/function (_IDataModel) {
        _inheritsLoose(GameDataImpl, _IDataModel);

        function GameDataImpl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _IDataModel.call.apply(_IDataModel, [this].concat(args)) || this;
          _this.enableUpdate = false;
          _this.mapConf = MapData;
          _this.dRunData = {
            /**连线的点的数量 */
            // targetDotNum: 0,

            /**是否连成了方形 */
            isSquare: false,
            targetDotType: DotType["null"],
            maxProbability: 0
          };
          _this.isDebug = PREVIEW;
          return _this;
        }

        var _proto = GameDataImpl.prototype;

        _proto.initMapData = function initMapData(mapConf) {
          if (mapConf) this.mapConf = mapConf;
          this.dLocalData.moveTimes = this.mapConf.moveTimes;
          this.dLocalData.targets = this.mapConf.targets.map(function (item) {
            var rItem = _extends({}, item, {
              now: 0
            });

            return rItem;
          });
          this.dLocalData.dotlDatas = mk_tool.object.clone(this.mapConf.initialData);
          this.dRunData.maxProbability = this.mapConf.generateDot.reduce(function (total, item) {
            if (item.type === DotType.barrier) return total;
            return total + item.probability;
          }, 0);
        };

        _proto.generateDot = function generateDot() {
          var random = Math.floor(Math.random() * this.dRunData.maxProbability);
          var now = 0;

          for (var _iterator = _createForOfIteratorHelperLoose(this.mapConf.generateDot), _step; !(_step = _iterator()).done;) {
            var iterator = _step.value;
            now += iterator.probability;

            if (random < now) {
              return iterator.type;
            }
          }

          return DotType.yellow;
        };

        _proto.addTargetDotNum = function addTargetDotNum(num, type) {
          var target = this.dLocalData.targets.find(function (item) {
            return item.type === type;
          });
          if (!target) return;
          var added = target.now + num;
          target.now = added > target.count ? target.count : added;
        };

        _proto.decMoveTime = function decMoveTime(num) {
          if (num === void 0) {
            num = 1;
          }

          this.dLocalData.moveTimes -= num;
        };

        _proto.getGameState = function getGameState() {
          var gameState = GameState.win;

          for (var _iterator2 = _createForOfIteratorHelperLoose(this.dLocalData.targets), _step2; !(_step2 = _iterator2()).done;) {
            var target = _step2.value;

            if (target.now < target.count) {
              gameState = GameState.playing;
              break;
            }
          }

          if (this.dLocalData.moveTimes <= 0) {
            gameState = GameState.lose;
          }

          return gameState;
        };

        return GameDataImpl;
      }(IDataModel);

      var GameState;

      (function (GameState) {
        GameState[GameState["playing"] = 0] = "playing";
        GameState[GameState["win"] = 1] = "win";
        GameState[GameState["lose"] = 2] = "lose";
      })(GameState || (GameState = exports('GameState', {})));

      var DotType;

      (function (DotType) {
        DotType[DotType["null"] = 0] = "null";
        DotType[DotType["yellow"] = 1] = "yellow";
        DotType[DotType["blue"] = 2] = "blue";
        DotType[DotType["green"] = 3] = "green";
        DotType[DotType["purple"] = 4] = "purple";
        DotType[DotType["barrier"] = 5] = "barrier";
      })(DotType || (DotType = exports('DotType', {})));

      var MapData = {
        /**移动次数 */
        moveTimes: 30,

        /**目标 */
        targets: [{
          type: DotType.yellow,
          count: 10
        }, {
          type: DotType.blue,
          count: 10
        }],

        /**生成dot的配置 */
        generateDot: [{
          type: DotType.yellow,
          probability: 10
        }, {
          type: DotType.blue,
          probability: 10
        }, {
          type: DotType.green,
          probability: 10
        }, {
          type: DotType.barrier,
          probability: 2
        }],

        /**行数 */
        row: 8,

        /**列数 */
        col: 8,
        initialData: []
      };
      var max = MapData.generateDot.reduce(function (total, item) {
        return total + item.probability;
      }, 0);

      function generateDot() {
        var random = Math.floor(Math.random() * max);
        var now = 0;

        for (var _iterator3 = _createForOfIteratorHelperLoose(MapData.generateDot), _step3; !(_step3 = _iterator3()).done;) {
          var iterator = _step3.value;
          now += iterator.probability;

          if (random < now) {
            return iterator.type;
          }
        }

        return DotType.yellow;
      }

      for (var i = 0; i < MapData.col; i++) {
        var arr = [];

        for (var j = 0; j < MapData.row; j++) {
          arr.push({
            type: generateDot()
          });
        }

        MapData.initialData.push(arr);
      } //初始化数据


      var initDatas = {
        /**移动次数 */
        moveTimes: 30,

        /**目标 */
        targets: [{
          type: DotType.yellow,
          count: 10,
          now: 0
        }, {
          type: DotType.blue,
          count: 10,
          now: 0
        }],

        /**dot的数据 */
        dotlDatas: []
      };
      var GameData = exports('GameData', new GameDataImpl("GameData", initDatas));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./StartView.ts', './TwoDotsBinder.ts', './TwoDots_GameStage.ts', './TwoDots_level.ts', './TwoDots_move_time.ts', './TwoDots_panel.ts', './TwoDots_panel_item.ts', './TwoDots_star.ts', './TwoDots_target.ts', './TwoDots_target_item.ts', './GameData.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './fairygui.mjs', './drongo-gui.mjs', './TwoDots_GameStage.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, global_config$1, drongoCc, GRoot, fairygui, AllBinder, GUIManager, drongoGui, TwoDots_GameStage;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      global_config$1 = module.global_config;
      drongoCc = module;
    }, function (module) {
      GRoot = module.GRoot;
      fairygui = module;
    }, function (module) {
      AllBinder = module.AllBinder;
      GUIManager = module.GUIManager;
      drongoGui = module;
    }, function (module) {
      TwoDots_GameStage = module.default;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "284ebS0bzdKxbJSoAEoTQO1", "StartView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; //@ts-ignore

      global_config$1.log.output_position_b = true;
      var StartView = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StartView, _Component);

        function StartView() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = StartView.prototype;

        _proto.onLoad = function onLoad() {
          //初始化配置
          GRoot.create();
          AllBinder.bindAll(); // fgui.UIConfig.buttonSound = "ui://MainMenu/click";
          // fgui.UIConfig.buttonSoundVolumeScale = 1;
        };

        _proto.start = function start() {
          GUIManager.open(TwoDots_GameStage);
        };

        return StartView;
      }(Component)) || _class);
      {
        self["fgui"] = fairygui;
        self["drongoCC"] = drongoCc;
        self["drongoGui"] = drongoGui;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_GameStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './GameData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vbind, vm, vshow, GameData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vbind = module.vbind;
      vm = module.vm;
      vshow = module.vshow;
    }, function (module) {
      GameData = module.GameData;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _class3;

      cclegacy._RF.push({}, "9286f4wFK1PHID0zugJ1WBI", "TwoDots_GameStage", undefined);

      var TwoDots_GameStage = exports('default', (_dec = vbind("dRunData.targetDotType"), _dec2 = vshow("dRunData.isSquare==true"), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_GameStage, _fgui$GComponent);

        function TwoDots_GameStage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_color", _descriptor, _assertThisInitialized(_this));

          _this.m_panel = void 0;
          _this.m_move_time = void 0;
          _this.m_target = void 0;

          _initializerDefineProperty(_this, "m_mask", _descriptor2, _assertThisInitialized(_this));

          _this.m_progress_top_0 = void 0;
          _this.m_progress_top_1 = void 0;
          _this.m_progress_buttom_0 = void 0;
          _this.m_progress_buttom_1 = void 0;
          _this.m_progress_lest_0 = void 0;
          _this.m_progress_lest_1 = void 0;
          _this.m_progress_right_0 = void 0;
          _this.m_progress_right_1 = void 0;
          _this.data = GameData;
          return _this;
        }

        TwoDots_GameStage.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "GameStage");
        };

        var _proto = TwoDots_GameStage.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_color = this.getController("color");
          this.m_panel = this.getChild("panel");
          this.m_move_time = this.getChild("move_time");
          this.m_target = this.getChild("target");
          this.m_mask = this.getChild("mask");
          this.m_progress_top_0 = this.getChild("progress_top_0");
          this.m_progress_top_1 = this.getChild("progress_top_1");
          this.m_progress_buttom_0 = this.getChild("progress_buttom_0");
          this.m_progress_buttom_1 = this.getChild("progress_buttom_1");
          this.m_progress_lest_0 = this.getChild("progress_lest_0");
          this.m_progress_lest_1 = this.getChild("progress_lest_1");
          this.m_progress_right_0 = this.getChild("progress_right_0");
          this.m_progress_right_1 = this.getChild("progress_right_1");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto.initView = function initView() {
          GameData.initMapData();
          this.m_panel.initDots();
        };

        return TwoDots_GameStage;
      }(GComponent), _class3.URL = "ui://jguk0yckqs5d0", _class3.Dependencies = ["TwoDots"], _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_color", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "m_mask", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_level.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIPackage, GComponent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "93ef6xzrcNMzYDf7jReIBkE", "TwoDots_level", undefined);
      /** user import write here ... Please do not modify the tip. **/


      var TwoDots_level = exports('default', /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_level, _fgui$GComponent);

        function TwoDots_level() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_title = void 0;
          _this.m_lv = void 0;
          return _this;
        }

        TwoDots_level.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "level");
        };

        var _proto = TwoDots_level.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_title = this.getChild("title");
          this.m_lv = this.getChild("lv");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return TwoDots_level;
      }(GComponent));
      TwoDots_level.URL = "ui://jguk0yckqs5dm";
      TwoDots_level.Dependencies = ["TwoDots"];

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_move_time.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './GameData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vbind, vm, GameData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vbind = module.vbind;
      vm = module.vm;
    }, function (module) {
      GameData = module.GameData;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "362efQey4ZDxL2Kwu7dX6sb", "TwoDots_move_time", undefined);

      var TwoDots_move_time = exports('default', (_dec = vbind("moveTimes"), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_move_time, _fgui$GComponent);

        function TwoDots_move_time() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_title", _descriptor, _assertThisInitialized(_this));

          _this.data = GameData.dLocalData;
          return _this;
        }

        TwoDots_move_time.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "move_time");
        };

        var _proto = TwoDots_move_time.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_title = this.getChild("title");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return TwoDots_move_time;
      }(GComponent), _class3.URL = "ui://jguk0yckqs5dh", _class3.Dependencies = ["TwoDots"], _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_title", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_panel_item.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './GameData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, Vec2, Graphics, Node, UIPackage, GRoot, GComponent, vbind, VBindType, vm, DotType, GameData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      Graphics = module.Graphics;
      Node = module.Node;
    }, function (module) {
      UIPackage = module.UIPackage;
      GRoot = module.GRoot;
      GComponent = module.GComponent;
    }, function (module) {
      vbind = module.vbind;
      VBindType = module.VBindType;
      vm = module.vm;
    }, function (module) {
      DotType = module.DotType;
      GameData = module.GameData;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _class3;

      cclegacy._RF.push({}, "a8c00aGPJJAt6WkU8S2XBoJ", "TwoDots_panel_item", undefined);

      var TwoDots_panel_item = exports('default', (_dec = vbind("type"), _dec2 = vbind(VBindType.TEMP_LABLE, {
        x: "$pos.x",
        y: "$pos.y"
      }), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_panel_item, _fgui$GComponent);

        function TwoDots_panel_item() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_color", _descriptor, _assertThisInitialized(_this));

          _this.m_color_di = void 0;
          _this.m_color_2 = void 0;

          _initializerDefineProperty(_this, "m_debug", _descriptor2, _assertThisInitialized(_this));

          _this.m_t0 = void 0;
          _this.m_t1 = void 0;
          _this.data = {
            type: DotType["null"]
          };
          _this.isTarget = false;
          _this.pos = new Vec2();
          _this.graph = _this.node.addComponent(Graphics);
          _this.isChanged = false;
          return _this;
        }

        TwoDots_panel_item.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "panel_item");
        };

        var _proto = TwoDots_panel_item.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_color = this.getController("color");
          this.m_color_di = this.getChild("color_di");
          this.m_color_2 = this.getChild("color");
          this.m_debug = this.getChild("debug");
          this.m_t0 = this.getTransition("t0");
          this.m_t1 = this.getTransition("t1");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto.init = function init(x, y, type) {
          this.pos.x = x;
          this.pos.y = y;
          this.data.type = type;
          this.isTarget = false;
          this.m_t0.stop();
          this.m_t1.stop();
          this.m_color_2.setScale(1, 1);
        };

        _proto.setSelfPos = function setSelfPos() {
          var pos = this.getShouldPos();
          this.setPosition(pos.x, pos.y);
          this.isChanged = true;
        };

        _proto.getShouldPos = function getShouldPos(vec) {
          if (vec === void 0) {
            vec = new Vec2();
          }

          var conf = GameData.mapConf;
          var col = conf.col;
          var row = conf.row;
          vec.x = (this.pos.x - col / 2 + 0.5) * spaceX + GRoot.inst.width / 2;
          vec.y = (this.pos.y - row / 2 + 0.5) * spaceY + GRoot.inst.width / 2;
          return vec;
        };

        _proto.setTarget = function setTarget(istarget) {
          if (istarget && !this.isTarget) this.m_t0.play();
          this.isTarget = istarget;
        };

        _proto.clear = function clear() {
          this.setTarget(false);
          this.data.type = DotType["null"];
          this.graph.clear();
        } //引擎有BUG位移了节点 Graphics的中心点没变
        ;

        _proto.fixGraphics = function fixGraphics() {
          this.node.invalidateChildren(Node.TransformBit.POSITION);
        };

        return TwoDots_panel_item;
      }(GComponent), _class3.URL = "ui://jguk0yckqs5do", _class3.Dependencies = ["TwoDots"], _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_color", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "m_debug", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      var spaceY = 34 + 32;
      var spaceX = 34 + 32;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_panel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-cc.mjs', './drongo-gui.mjs', './GameData.ts', './TwoDots_panel_item.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, Vec2, UIPackage, Event, GTween, GComponent, EaseType, _mk_obj_pool, mk_obj_pool$1, log, vm, GameData, DotType, TwoDots_panel_item;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
    }, function (module) {
      UIPackage = module.UIPackage;
      Event = module.Event;
      GTween = module.GTween;
      GComponent = module.GComponent;
      EaseType = module.EaseType;
    }, function (module) {
      _mk_obj_pool = module.pool_conf;
      mk_obj_pool$1 = module.obj_pool;
      log = module.log;
    }, function (module) {
      vm = module.vm;
    }, function (module) {
      GameData = module.GameData;
      DotType = module.DotType;
    }, function (module) {
      TwoDots_panel_item = module.default;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "dd9d5JuGz9ORYFwTfG+avgy", "TwoDots_panel", undefined);

      var TwoDots_panel = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_panel, _fgui$GComponent);

        function TwoDots_panel() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this2.m_c1 = void 0;
          _this2.data = GameData.dLocalData.dotlDatas;
          _this2.pool = new mk_obj_pool$1(new PoolConf());
          _this2._dotArr = [];
          _this2._touchId = -1;
          _this2.targetedDots = [];
          _this2._posNow = new Vec2();
          return _this2;
        }

        TwoDots_panel.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "panel");
        };

        var _proto = TwoDots_panel.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto.initDots = /*#__PURE__*/function () {
          var _initDots = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var i, dotArr, j, dotData, item;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.data = GameData.dLocalData.dotlDatas;
                  i = 0;

                case 2:
                  if (!(i < this.data.length)) {
                    _context.next = 21;
                    break;
                  }

                  dotArr = this.data[i];
                  j = 0;

                case 5:
                  if (!(j < dotArr.length)) {
                    _context.next = 18;
                    break;
                  }

                  dotData = dotArr[j];
                  _context.next = 9;
                  return this.pool.get();

                case 9:
                  item = _context.sent;
                  item.init(i, j, dotData.type);
                  item.setSelfPos();

                  if (dotData.type === DotType.barrier) {
                    this.addChildAt(item, 0);
                  } else {
                    this.addChild(item);
                  }

                  if (!this._dotArr[i]) this._dotArr[i] = [];
                  this._dotArr[i][j] = item;

                case 15:
                  j++;
                  _context.next = 5;
                  break;

                case 18:
                  i++;
                  _context.next = 2;
                  break;

                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function initDots() {
            return _initDots.apply(this, arguments);
          }

          return initDots;
        }();

        _proto.initView = function initView() {
          this.on(Event.TOUCH_BEGIN, this.onTouchBegin, this);
          this.on(Event.TOUCH_MOVE, this.onTouchMove, this);
          this.on(Event.TOUCH_END, this.onTouchEnd, this);
        };

        _proto.onTouchBegin = function onTouchBegin(evt) {
          if (this._touchId !== -1) return;
          this._touchId = evt.touchId;
          var dot = this.gettouchDot(evt);

          if (dot) {
            this.pushDot(dot);
            log("onTouchBegin", dot.pos.x, dot.pos.y);
          }

          evt.captureTouch();
        };

        _proto.onTouchMove = function onTouchMove(evt) {
          if (this._touchId !== evt.touchId) {
            return;
          }

          var dot = this.gettouchDot(evt);

          if (!dot || !this.onTouchDotCheck(dot)) {
            if (!GameData.dRunData.isSquare) {
              this.drawLine2(evt);
            }

            return;
          }

          if (this.targetedDots.indexOf(dot) !== -1) {
            if (GameData.dRunData.isSquare) {
              if (this.lastDot === dot) {
                this.popDot();
              }
            } else {
              if (this.lastLastDot === dot) {
                this.popDot();
              } else if (this.lastDot !== dot) {
                GameData.dRunData.isSquare = true;
                this.playAllAnim(dot.data.type);
                this.drawLine(dot);
              } else {
                this.drawLine2(evt);
              }
            }
          } else if (!GameData.dRunData.isSquare) {
            this.drawLine(dot);
            this.pushDot(dot);
          }
        };

        _proto.onTouchEnd = function onTouchEnd(evt) {
          var _this$targetedDots$,
              _this3 = this;

          if (this._touchId == -1 || this._touchId !== evt.touchId) return;
          this._touchId = -1;
          log("onTouchEnd");
          var clearDotNum = 0; //@ts-ignore

          var totalDuration = ((_this$targetedDots$ = this.targetedDots[0]) == null ? void 0 : _this$targetedDots$.m_t1._totalDuration) || 0;

          if (this.targetedDots.length == 1) {
            this.popDot();
          } else if (GameData.dRunData.isSquare) {
            this._dotArr.forEach(function (arr) {
              arr.forEach(function (dot) {
                if (dot.data.type === GameData.dRunData.targetDotType) {
                  //播放消除动画
                  _this3._dotArr[dot.pos.x][dot.pos.y] = null;
                  clearDotNum++;
                  dot.graph.clear();
                  dot.m_t1.play(function () {
                    dot.removeFromParent();
                    dot.clear();

                    _this3.pool.put(dot);
                  });
                }
              });
            });
          } else {
            this.targetedDots.forEach(function (dot) {
              _this3._dotArr[dot.pos.x][dot.pos.y] = null;
              dot.graph.clear();
              dot.m_t1.play(function () {
                dot.removeFromParent();
                dot.clear();

                _this3.pool.put(dot);
              });
            });
            clearDotNum = this.targetedDots.length;
          }

          this.targetedDots.length = 0;
          GameData.dRunData.isSquare = false;
          GameData.dRunData.targetDotType = DotType["null"];

          if (clearDotNum > 0) {
            GameData.addTargetDotNum(clearDotNum, GameData.dRunData.targetDotType);
            GTween.delayedCall(totalDuration).onComplete(function () {
              _this3.fillEmptyDots();
            });
            GameData.decMoveTime();
          }
        };

        _proto.fillEmptyDots = /*#__PURE__*/function () {
          var _fillEmptyDots = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var conf, col, row, vec, getEmptyRow, i, emptyRow, j, dot, dotY, _j, _dot2, _dot, dotType;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  getEmptyRow = function _getEmptyRow(emptyRowLast, arr) {
                    var lastDot = arr[emptyRowLast - 1];
                    if (lastDot && lastDot.data.type == DotType.barrier) return getEmptyRow(emptyRowLast - 1, arr);
                    return emptyRowLast - 1;
                  };

                  conf = GameData.mapConf;
                  col = conf.col;
                  row = conf.row;
                  vec = new Vec2();
                  i = 0;

                case 6:
                  if (!(i < col)) {
                    _context2.next = 32;
                    break;
                  }

                  emptyRow = -1;

                  for (j = row - 1; j >= 0; j--) {
                    dot = this._dotArr[i][j];

                    if (!dot) {
                      if (emptyRow === -1) {
                        emptyRow = j;
                      }
                    } else if (emptyRow !== -1 && dot.data.type !== DotType.barrier) {
                      dotY = emptyRow;
                      this._dotArr[i][dotY] = dot;
                      dot.pos.y = dotY;
                      emptyRow = getEmptyRow(dotY, this._dotArr[i]);
                      dot.getShouldPos(vec);
                      GTween.to(dot.y, vec.y, moveTime).setTarget(dot, "y").setEase(EaseType.BounceOut);
                    }
                  }

                  if (!(emptyRow !== -1)) {
                    _context2.next = 29;
                    break;
                  }

                  _j = emptyRow;

                case 11:
                  if (!(_j >= 0)) {
                    _context2.next = 29;
                    break;
                  }

                  _dot = this._dotArr[i][_j];

                  if (!(((_dot2 = _dot) == null ? void 0 : _dot2.data.type) == DotType.barrier)) {
                    _context2.next = 15;
                    break;
                  }

                  return _context2.abrupt("continue", 26);

                case 15:
                  dotType = GameData.generateDot();
                  _context2.next = 18;
                  return this.pool.get();

                case 18:
                  _dot = _context2.sent;

                  _dot.init(i, _j, dotType);

                  this._dotArr[i][_j] = _dot;

                  _dot.getShouldPos(vec);

                  _dot.x = vec.x;
                  _dot.y = -34;
                  this.addChild(_dot);
                  GTween.to(_dot.y, vec.y, moveTime).setTarget(_dot, "y").setEase(EaseType.BounceOut);

                case 26:
                  _j--;
                  _context2.next = 11;
                  break;

                case 29:
                  i++;
                  _context2.next = 6;
                  break;

                case 32:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function fillEmptyDots() {
            return _fillEmptyDots.apply(this, arguments);
          }

          return fillEmptyDots;
        }();

        _proto.gettouchDot = function gettouchDot(evt) {
          this.globalToLocal(evt.pos.x, evt.pos.y, this._posNow);
          var touchX = this._posNow.x;
          var touchY = this._posNow.y;
          var conf = GameData.mapConf;
          var col = conf.col;
          var row = conf.row;
          var dotSize = diameter + space;
          var panelWidth = col * dotSize - diameter;
          var panelHeight = row * dotSize - diameter;
          var panelX = (this.width - panelWidth) / 2;
          var panelY = (this.height - panelHeight) / 2;
          var dotX = Math.floor((touchX - panelX) / dotSize);
          var dotY = Math.floor((touchY - panelY) / dotSize);
          if (dotX < 0 || dotX >= col || dotY < 0 || dotY >= row) return null;
          var dot = this._dotArr[dotX][dotY];
          var distance = Math.sqrt(Math.pow(this._posNow.x - dot.x, 2) + Math.pow(this._posNow.y - dot.y, 2));

          if (distance <= diameter / 2 + 10 && dot.data.type !== DotType.barrier) {
            return dot;
          }

          return null;
        }
        /**检查能否放进去target */
        ;

        _proto.onTouchDotCheck = function onTouchDotCheck(dot) {
          var lastDot = this.lastDot;

          if (lastDot) {
            if (lastDot.data.type !== dot.data.type) {
              return false;
            }

            if (lastDot.pos.x !== dot.pos.x && lastDot.pos.y !== dot.pos.y) {
              return false;
            }

            if (Math.abs(lastDot.pos.x - dot.pos.x) > 1 || Math.abs(lastDot.pos.y - dot.pos.y) > 1) {
              return false;
            }
          }

          return true;
        };

        _proto.pushDot = function pushDot(dot) {
          dot.setTarget(true);
          this.targetedDots.push(dot);

          if (this.targetedDots.length == 1) {
            GameData.dRunData.targetDotType = dot.data.type;
          }
        };

        _proto.popDot = function popDot() {
          var _this$lastDot;

          var dot = this.targetedDots.pop();
          dot.graph.clear();
          dot.setTarget(false);
          (_this$lastDot = this.lastDot) == null ? void 0 : _this$lastDot.graph.clear();

          if (GameData.dRunData.isSquare) {
            GameData.dRunData.isSquare = false;
          }
        };

        _proto.drawLine = function drawLine(dot) {
          var lastDot = this.lastDot;
          if (!lastDot) return;
          lastDot.graph.clear();
          lastDot.graph.lineWidth = 10;
          lastDot.graph.strokeColor = lastDot.m_color_2.color;
          lastDot.graph.moveTo(0, 0);
          lastDot.graph.lineTo(dot.x - lastDot.x, -(dot.y - lastDot.y));
          lastDot.graph.stroke();
          lastDot.graph.fill(); //把节点放最上面

          if (this.getChildAt(this.numChildren - 1) !== lastDot) this.setChildIndex(lastDot, this.numChildren - 1);
        };

        _proto.drawLine2 = function drawLine2(evt) {
          var lastDot = this.lastDot;
          if (!lastDot) return;
          lastDot.graph.clear();
          lastDot.graph.lineWidth = 10;
          lastDot.graph.strokeColor = lastDot.m_color_2.color;
          lastDot.globalToLocal(evt.pos.x, evt.pos.y, this._posNow);
          lastDot.graph.moveTo(0, 0);
          lastDot.graph.lineTo(this._posNow.x, -this._posNow.y);
          lastDot.graph.stroke();
          lastDot.graph.fill();
          lastDot.fixGraphics(); //把节点放最上面

          if (this.getChildAt(this.numChildren - 1) !== lastDot) this.setChildIndex(lastDot, this.numChildren - 1);
        };

        _proto.playAllAnim = function playAllAnim(type) {
          this._dotArr.forEach(function (arr) {
            arr.forEach(function (dot) {
              if (dot.data.type === type) {
                dot.m_t0.play();
              }
            });
          });
        };

        _createClass(TwoDots_panel, [{
          key: "lastDot",
          get:
          /**能否添加 删除连线的点 */
          // private _bCanPopAndPush: boolean = true;
          function get() {
            if (this.targetedDots.length < 1) return null;
            return this.targetedDots[this.targetedDots.length - 1];
          }
        }, {
          key: "lastLastDot",
          get: function get() {
            if (this.targetedDots.length < 2) return null;
            return this.targetedDots[this.targetedDots.length - 2];
          }
        }]);

        return TwoDots_panel;
      }(GComponent), _class2.URL = "ui://jguk0yckqs5dn", _class2.Dependencies = ["TwoDots"], _class2)) || _class);
      /**点的直径径 */

      var diameter = 34;
      /**点的间距 */

      var space = 32;
      /**点的移动时间 */

      var moveTime = 0.2;

      var PoolConf = /*#__PURE__*/function (_pool_conf$sync$confi) {
        _inheritsLoose(PoolConf, _pool_conf$sync$confi);

        function PoolConf() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _pool_conf$sync$confi.call.apply(_pool_conf$sync$confi, [this].concat(args)) || this;
          _this.create_f = TwoDots_panel_item.createInstance;

          _this.clear_f = function (items) {
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              item.dispose();
            }
          };

          return _this;
        }

        return PoolConf;
      }(_mk_obj_pool.sync.config);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_star.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIPackage, GComponent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e8823e83TxNJKoE27EA/g9I", "TwoDots_star", undefined);
      /** user import write here ... Please do not modify the tip. **/


      var TwoDots_star = exports('default', /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_star, _fgui$GComponent);

        function TwoDots_star() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_title = void 0;
          return _this;
        }

        TwoDots_star.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "star");
        };

        var _proto = TwoDots_star.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_title = this.getChild("title");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return TwoDots_star;
      }(GComponent));
      TwoDots_star.URL = "ui://jguk0yckqs5dl";
      TwoDots_star.Dependencies = ["TwoDots"];

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_target_item.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vbind, VBindType, vm;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vbind = module.vbind;
      VBindType = module.VBindType;
      vm = module.vm;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _class3;

      cclegacy._RF.push({}, "229b1SDiXxIV63kpQeu/nZL", "TwoDots_target_item", undefined);

      var TwoDots_target_item = exports('default', (_dec = vbind("type"), _dec2 = vbind(VBindType.TEMP_LABLE, {
        now: "now",
        target: "count"
      }), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_target_item, _fgui$GComponent);

        function TwoDots_target_item() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_color", _descriptor, _assertThisInitialized(_this));

          _this.m_color_2 = void 0;

          _initializerDefineProperty(_this, "m_target_num", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        TwoDots_target_item.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "target_item");
        };

        var _proto = TwoDots_target_item.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_color = this.getController("color");
          this.m_color_2 = this.getChild("color");
          this.m_target_num = this.getChild("target_num");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return TwoDots_target_item;
      }(GComponent), _class3.URL = "ui://jguk0yckqs5dk", _class3.Dependencies = ["TwoDots"], _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_color", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "m_target_num", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDots_target.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './GameData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vm, vdata, GameData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
      vdata = module.vdata;
    }, function (module) {
      GameData = module.GameData;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "a05832TBJ9A0puMNVRDdMfH", "TwoDots_target", undefined);

      var TwoDots_target = exports('default', (_dec = vdata("targets"), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(TwoDots_target, _fgui$GComponent);

        function TwoDots_target() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_list", _descriptor, _assertThisInitialized(_this));

          _this.data = GameData.dLocalData;
          return _this;
        }

        TwoDots_target.createInstance = function createInstance() {
          return UIPackage.createObject("TwoDots", "target");
        };

        var _proto = TwoDots_target.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_list = this.getChild("list");
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return TwoDots_target;
      }(GComponent), _class3.URL = "ui://jguk0yckqs5di", _class3.Dependencies = ["TwoDots"], _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_list", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TwoDotsBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './TwoDots_GameStage.ts', './TwoDots_move_time.ts', './TwoDots_target.ts', './TwoDots_target_item.ts', './TwoDots_star.ts', './TwoDots_level.ts', './TwoDots_panel.ts', './TwoDots_panel_item.ts'], function (exports) {
  'use strict';

  var cclegacy, registerBinder, UIObjectFactory, TwoDots_GameStage, TwoDots_move_time, TwoDots_target, TwoDots_target_item, TwoDots_star, TwoDots_level, TwoDots_panel, TwoDots_panel_item;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      TwoDots_GameStage = module.default;
    }, function (module) {
      TwoDots_move_time = module.default;
    }, function (module) {
      TwoDots_target = module.default;
    }, function (module) {
      TwoDots_target_item = module.default;
    }, function (module) {
      TwoDots_star = module.default;
    }, function (module) {
      TwoDots_level = module.default;
    }, function (module) {
      TwoDots_panel = module.default;
    }, function (module) {
      TwoDots_panel_item = module.default;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "4ac34enewlJI7IxI+RIfe7Q", "TwoDotsBinder", undefined);

      var TwoDotsBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function TwoDotsBinder() {}

        var _proto = TwoDotsBinder.prototype;

        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(TwoDots_GameStage.URL, TwoDots_GameStage);
          UIObjectFactory.setExtension(TwoDots_move_time.URL, TwoDots_move_time);
          UIObjectFactory.setExtension(TwoDots_target.URL, TwoDots_target);
          UIObjectFactory.setExtension(TwoDots_target_item.URL, TwoDots_target_item);
          UIObjectFactory.setExtension(TwoDots_star.URL, TwoDots_star);
          UIObjectFactory.setExtension(TwoDots_level.URL, TwoDots_level);
          UIObjectFactory.setExtension(TwoDots_panel.URL, TwoDots_panel);
          UIObjectFactory.setExtension(TwoDots_panel_item.URL, TwoDots_panel_item);
        };

        return TwoDotsBinder;
      }()) || _class);

      cclegacy._RF.pop();
    }
  };
});
