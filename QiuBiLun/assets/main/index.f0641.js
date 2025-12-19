System.register("chunks:///_virtual/Attac_AttactPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './drongo-cc.mjs', './Attac_AttactPage.ts', './Attac_Joystick_Logic.ts', './BattleDemoHelper.ts', './RoomMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GBind, GUILogicBase, addLogic, autoBindToWindow, Attac_AttactPage, Attac_Joystick_Logic, BattleDemoHelper, roomMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GBind = module.GBind;
      GUILogicBase = module.GUILogicBase;
      addLogic = module.addLogic;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
    }, function (module) {
      Attac_AttactPage = module.default;
    }, function (module) {
      Attac_Joystick_Logic = module.default;
    }, function (module) {
      BattleDemoHelper = module.BattleDemoHelper;
    }, function (module) {
      roomMgr = module.roomMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "be4beisZMpA/K08V7ZIx65c", "Attac_AttactPage_Logic", undefined);
      var Attac_AttactPage_Logic = exports('default', (_dec = addLogic(Attac_AttactPage), _dec(_class = autoBindToWindow(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Attac_AttactPage_Logic, _GUILogicBase);
        function Attac_AttactPage_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this._leftJoy = null;
          _this._rightJoy = null;
          // Demo Helper
          _this._demoHelper = null;
          return _this;
        }
        var _proto = Attac_AttactPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Initialize Joysticks
          if (this.UI.m_leftJoystick) {
            this._leftJoy = this.UI.m_leftJoystick.Get(Attac_Joystick_Logic);
            this._leftJoy.evt.on(this._leftJoy.evt.key.JoystickMoving, this.onLeftJoystickMove, this);
            this._leftJoy.evt.on(this._leftJoy.evt.key.JoystickUp, this.onLeftJoystickUp, this);
          }
          if (this.UI.m_rightJoystick) {
            this._rightJoy = this.UI.m_rightJoystick.Get(Attac_Joystick_Logic);
            this._rightJoy.evt.on(this._rightJoy.evt.key.JoystickMoving, this.onRightJoystickMove, this);
            this._rightJoy.evt.on(this._rightJoy.evt.key.JoystickUp, this.onRightJoystickUp, this);
          }

          // Initialize Battle Demo
          this._demoHelper = new BattleDemoHelper(this.UI);
          this._demoHelper.init();

          // Latency Reactive Binding
          GBind(this.UI.m_yanshi, roomMgr.frameSync, function (k) {
            return k.latency;
          }).setFormatFunc(function (v) {
            return v >= 0 ? v + " ms" : "-- ms";
          }).bindTarget(this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$_demoHelper;
          (_this$_demoHelper = this._demoHelper) == null || _this$_demoHelper.destroy();
          this._demoHelper = null;
          if (this._leftJoy && this._leftJoy.isValid) {
            this._leftJoy.evt.off(this._leftJoy.evt.key.JoystickMoving, this.onLeftJoystickMove, this);
            this._leftJoy.evt.off(this._leftJoy.evt.key.JoystickUp, this.onLeftJoystickUp, this);
          }
          if (this._rightJoy && this._rightJoy.isValid) {
            this._rightJoy.evt.off(this._rightJoy.evt.key.JoystickMoving, this.onRightJoystickMove, this);
            this._rightJoy.evt.off(this._rightJoy.evt.key.JoystickUp, this.onRightJoystickUp, this);
          }
          _GUILogicBase.prototype.onDestroy.call(this);
        }

        // Joystick -> Demo Helper
        ;

        _proto.onLeftJoystickMove = function onLeftJoystickMove(data) {
          var _this$_demoHelper2;
          (_this$_demoHelper2 = this._demoHelper) == null || _this$_demoHelper2.setMoveInput(data.axis.x, -data.axis.y);
        };
        _proto.onLeftJoystickUp = function onLeftJoystickUp() {
          var _this$_demoHelper3;
          (_this$_demoHelper3 = this._demoHelper) == null || _this$_demoHelper3.setMoveInput(0, 0);
        };
        _proto.onRightJoystickMove = function onRightJoystickMove(data) {
          var _this$_demoHelper4;
          (_this$_demoHelper4 = this._demoHelper) == null || _this$_demoHelper4.setShootInput(data.axis.x, -data.axis.y);
        };
        _proto.onRightJoystickUp = function onRightJoystickUp() {
          var _this$_demoHelper5;
          (_this$_demoHelper5 = this._demoHelper) == null || _this$_demoHelper5.setShootInput(0, 0);
        };
        return Attac_AttactPage_Logic;
      }(GUILogicBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_AttactPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "97c7dgaDMVCQamQreeot89W", "Attac_AttactPage", undefined);
      var Attac_AttactPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Attac_AttactPage, _fgui$GComponent);
        function Attac_AttactPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_zhanTingBtn = void 0;
          _this.m_beiSuBtn = void 0;
          _this.m_playerList = void 0;
          _this.m_stageProgress = void 0;
          _this.m_leftJoystick = void 0;
          _this.m_rightJoystick = void 0;
          _this.m_yanshi = void 0;
          return _this;
        }
        Attac_AttactPage.createInstance = function createInstance() {
          return UIPackage.createObject("Attac", "AttactPage");
        };
        var _proto = Attac_AttactPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_zhanTingBtn = this.getChild("zhanTingBtn");
          this.m_beiSuBtn = this.getChild("beiSuBtn");
          this.m_playerList = this.getChild("playerList");
          this.m_stageProgress = this.getChild("stageProgress");
          this.m_leftJoystick = this.getChild("leftJoystick");
          this.m_rightJoystick = this.getChild("rightJoystick");
          this.m_yanshi = this.getChild("yanshi");
        };
        return Attac_AttactPage;
      }(GComponent), _class2.URL = "ui://gphmworanaeq0", _class2.Dependencies = ["Attac"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_Joystick_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './drongo-cc.mjs', './fairygui.mjs', './Attac_Joystick.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Vec2, addLogic, GUILogicBase, mk_event_target, Event, Attac_Joystick;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      mk_event_target = module.event_target;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      Attac_Joystick = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6e84fqUMepCq7P2i67FRI0Y", "Attac_Joystick_Logic", undefined);
      var Attac_Joystick_Logic = exports('default', (_dec = addLogic(Attac_Joystick), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Attac_Joystick_Logic, _GUILogicBase);
        function Attac_Joystick_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.evt = new mk_event_target();
          _this.radius = 100;
          _this._touchId = -1;
          _this._initX = 0;
          _this._initY = 0;
          _this._output = {
            angle: 0,
            power: 0,
            axis: new Vec2()
          };
          return _this;
        }
        var _proto = Attac_Joystick_Logic.prototype;
        _proto.onLoad = function onLoad() {
          if (!this.UI) return;
          this._initX = this.UI.m_thumb.x;
          this._initY = this.UI.m_thumb.y;
          this.UI.on(Event.TOUCH_BEGIN, this.onTouchBegin, this);
          this.UI.on(Event.TOUCH_MOVE, this.onTouchMove, this);
          this.UI.on(Event.TOUCH_END, this.onTouchEnd, this);
          this.reset();
        };
        _proto.setVisualVisible = function setVisualVisible(visible) {
          // Override visibility control if needed, or remove if specific logic prevails
          // Keeping it generic for external control, but internal logic will override during interaction
          if (this.UI && this.UI.m_thumb) {
            this.UI.m_thumb.visible = visible;
          }
          if (this.UI && this.UI.m_center) {
            this.UI.m_center.visible = visible;
          }
        };
        _proto.onTouchBegin = function onTouchBegin(evt) {
          if (this._touchId !== -1) return;
          this._touchId = evt.touchId;

          // Dragging state: Hide Center, Show Thumb
          this.UI.m_center.visible = false;
          this.UI.m_thumb.visible = true;
          this.updateJoystick(evt.pos.x, evt.pos.y);
          evt.captureTouch();
        };
        _proto.onTouchMove = function onTouchMove(evt) {
          if (this._touchId !== evt.touchId) return;
          this.updateJoystick(evt.pos.x, evt.pos.y);
        };
        _proto.onTouchEnd = function onTouchEnd(evt) {
          if (this._touchId !== evt.touchId) return;
          this._touchId = -1;
          this.reset();
          this.evt.emit(this.evt.key.JoystickUp);
        };
        _proto.reset = function reset() {
          this.UI.m_thumb.setPosition(this._initX, this._initY);
          this.UI.m_thumb.rotation = 0;

          // Idle state: Show Center, Hide Thumb
          this.UI.m_center.visible = true;
          this.UI.m_thumb.visible = false;
          this.evt.emit(this.evt.key.JoystickMoving, {
            angle: 0,
            power: 0,
            axis: Vec2.ZERO
          });
        };
        _proto.updateJoystick = function updateJoystick(stageX, stageY) {
          var localPos = this.UI.globalToLocal(stageX, stageY);
          var deltaX = localPos.x - this._initX;
          var deltaY = localPos.y - this._initY;
          var rad = Math.atan2(deltaY, deltaX);
          var degree = rad * 180 / Math.PI;
          var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          var clampedDist = Math.min(dist, this.radius);
          var thumbX = this._initX + Math.cos(rad) * clampedDist;
          var thumbY = this._initY + Math.sin(rad) * clampedDist;
          this.UI.m_thumb.setPosition(thumbX, thumbY);
          this.UI.m_thumb.rotation = degree + 90;
          this._output.angle = degree;
          this._output.power = clampedDist / this.radius;
          this._output.axis.set(Math.cos(rad), Math.sin(rad));
          this.evt.emit(this.evt.key.JoystickMoving, this._output);
        };
        return Attac_Joystick_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_Joystick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "26b803KLGxPJ4ZH0IOO9krk", "Attac_Joystick", undefined);
      var Attac_Joystick = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Attac_Joystick, _fgui$GComponent);
        function Attac_Joystick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_thumb = void 0;
          _this.m_center = void 0;
          return _this;
        }
        Attac_Joystick.createInstance = function createInstance() {
          return UIPackage.createObject("Attac", "Joystick");
        };
        var _proto = Attac_Joystick.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_thumb = this.getChild("thumb");
          this.m_center = this.getChild("center");
        };
        return Attac_Joystick;
      }(GComponent), _class2.URL = "ui://gphmworaq9do18", _class2.Dependencies = ["Attac"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_PlayerList_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Attac_PlayerList.ts', './RoomMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GUILogicBase, addLogic, Attac_PlayerList, roomMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GUILogicBase = module.GUILogicBase;
      addLogic = module.addLogic;
    }, function (module) {
      Attac_PlayerList = module.default;
    }, function (module) {
      roomMgr = module.roomMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1db00AJgAdOlbbjBCOg7mSe", "Attac_PlayerList_Logic", undefined);
      var Attac_PlayerList_Logic = exports('default', (_dec = addLogic(Attac_PlayerList), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Attac_PlayerList_Logic, _GUILogicBase);
        function Attac_PlayerList_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Attac_PlayerList_Logic.prototype;
        _proto.onLoad = function onLoad() {
          this.updatePlayerList();
          roomMgr.evt.on(roomMgr.evt.key.RoomUpdate, this.updatePlayerList, this);
        };
        _proto.onDestroy = function onDestroy() {
          roomMgr.evt.off(roomMgr.evt.key.RoomUpdate, this.updatePlayerList, this);
          _GUILogicBase.prototype.onDestroy.call(this);
        };
        _proto.updatePlayerList = function updatePlayerList() {
          var players = roomMgr.players;
          var isHost = roomMgr.isHost;

          // Map players correctly
          var host = players.find(function (p) {
            return p.id === roomMgr.roomHostId;
          }) || (isHost && players.length > 0 ? players[0] : null);
          var otherPlayers = players.filter(function (p) {
            return p.id !== roomMgr.roomHostId;
          });
          this.updateSlot(this.UI.m_P1, host);
          this.updateSlot(this.UI.m_P2, otherPlayers[0]);
          this.updateSlot(this.UI.m_P3, otherPlayers[1]);
          this.updateSlot(this.UI.m_P4, otherPlayers[2]);
        };
        _proto.updateSlot = function updateSlot(slot, info) {
          if (slot) {
            slot.visible = !!info;
            if (info && slot.m_id) {
              slot.m_id.text = info.name || info.id.substring(0, 4);
            }
          }
        };
        return Attac_PlayerList_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_PlayerList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "3dc4atsqUZMW4eMo5KHA5s6", "Attac_PlayerList", undefined);
      var Attac_PlayerList = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Attac_PlayerList, _fgui$GComponent);
        function Attac_PlayerList() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_P1 = void 0;
          _this.m_P2 = void 0;
          _this.m_P3 = void 0;
          _this.m_P4 = void 0;
          return _this;
        }
        Attac_PlayerList.createInstance = function createInstance() {
          return UIPackage.createObject("Attac", "PlayerList");
        };
        var _proto = Attac_PlayerList.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_P1 = this.getChild("P1");
          this.m_P2 = this.getChild("P2");
          this.m_P3 = this.getChild("P3");
          this.m_P4 = this.getChild("P4");
        };
        return Attac_PlayerList;
      }(GComponent), _class2.URL = "ui://gphmworanaeq6", _class2.Dependencies = ["Attac"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_PlayerStatues_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Attac_PlayerStatues.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Attac_PlayerStatues;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Attac_PlayerStatues = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fa84160JmpFP6T0132Prvdu", "Attac_PlayerStatues_Logic", undefined);
      var Attac_PlayerStatues_Logic = exports('default', (_dec = addLogic(Attac_PlayerStatues), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Attac_PlayerStatues_Logic, _GUILogicBase);
        function Attac_PlayerStatues_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Attac_PlayerStatues_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Attac_PlayerStatues_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_PlayerStatues.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "75b16k2BTdJTZXNkyQ3mTNg", "Attac_PlayerStatues", undefined);
      var Attac_PlayerStatues = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Attac_PlayerStatues, _fgui$GComponent);
        function Attac_PlayerStatues() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_id = void 0;
          _this.m_hp = void 0;
          _this.m_mp = void 0;
          return _this;
        }
        Attac_PlayerStatues.createInstance = function createInstance() {
          return UIPackage.createObject("Attac", "PlayerStatues");
        };
        var _proto = Attac_PlayerStatues.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_id = this.getChild("id");
          this.m_hp = this.getChild("hp");
          this.m_mp = this.getChild("mp");
        };
        return Attac_PlayerStatues;
      }(GComponent), _class2.URL = "ui://gphmworanaeq5", _class2.Dependencies = ["Attac"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_ProgressBar3_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Attac_ProgressBar3.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Attac_ProgressBar3;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Attac_ProgressBar3 = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "de0cd59Co1FKLeHKCXhbkZm", "Attac_ProgressBar3_Logic", undefined);
      var Attac_ProgressBar3_Logic = exports('default', (_dec = addLogic(Attac_ProgressBar3), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Attac_ProgressBar3_Logic, _GUILogicBase);
        function Attac_ProgressBar3_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Attac_ProgressBar3_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Attac_ProgressBar3_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Attac_ProgressBar3.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GProgressBar, vm;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GProgressBar = module.GProgressBar;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "22b23F5PdxEGajLAcnLn9mW", "Attac_ProgressBar3", undefined);
      var Attac_ProgressBar3 = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GProgressBar) {
        _inheritsLoose(Attac_ProgressBar3, _fgui$GProgressBar);
        function Attac_ProgressBar3() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GProgressBar.call.apply(_fgui$GProgressBar, [this].concat(args)) || this;
          _this.m_stage1 = void 0;
          _this.m_stage2 = void 0;
          return _this;
        }
        Attac_ProgressBar3.createInstance = function createInstance() {
          return UIPackage.createObject("Attac", "ProgressBar3");
        };
        var _proto = Attac_ProgressBar3.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_stage1 = this.getChild("stage1");
          this.m_stage2 = this.getChild("stage2");
        };
        return Attac_ProgressBar3;
      }(GProgressBar), _class2.URL = "ui://gphmworanaeq7", _class2.Dependencies = ["Attac"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AttacBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Attac_AttactPage.ts', './Attac_PlayerStatues.ts', './Attac_PlayerList.ts', './Attac_ProgressBar3.ts', './Attac_Joystick.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Attac_AttactPage, Attac_PlayerStatues, Attac_PlayerList, Attac_ProgressBar3, Attac_Joystick;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Attac_AttactPage = module.default;
    }, function (module) {
      Attac_PlayerStatues = module.default;
    }, function (module) {
      Attac_PlayerList = module.default;
    }, function (module) {
      Attac_ProgressBar3 = module.default;
    }, function (module) {
      Attac_Joystick = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "4d74byr4zBFNpypuyQO0vVd", "AttacBinder", undefined);
      var AttacBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function AttacBinder() {}
        var _proto = AttacBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Attac_AttactPage.URL, Attac_AttactPage);
          UIObjectFactory.setExtension(Attac_PlayerStatues.URL, Attac_PlayerStatues);
          UIObjectFactory.setExtension(Attac_PlayerList.URL, Attac_PlayerList);
          UIObjectFactory.setExtension(Attac_ProgressBar3.URL, Attac_ProgressBar3);
          UIObjectFactory.setExtension(Attac_Joystick.URL, Attac_Joystick);
        };
        return AttacBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BallEntity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './FPVector2.ts', './Entity.ts', './EntityType.ts', './IBallModifier.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, FixedPoint, FPVector2, Entity, EntityType, runOnHitEnemy, runOnHitWall, runOnBounce;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      Entity = module.Entity;
    }, function (module) {
      EntityType = module.EntityType;
    }, function (module) {
      runOnHitEnemy = module.runOnHitEnemy;
      runOnHitWall = module.runOnHitWall;
      runOnBounce = module.runOnBounce;
    }],
    execute: function () {
      cclegacy._RF.push({}, "33cf5SS2gBBfZrmgF7KL17y", "BallEntity", undefined);
      var BallEntity = exports('BallEntity', /*#__PURE__*/function (_Entity) {
        _inheritsLoose(BallEntity, _Entity);
        function BallEntity(id, config, x, y, ownerId) {
          var _this;
          _this = _Entity.call(this, id, x, y) || this;
          _this.type = EntityType.Ball;
          /** 弹珠配置ID */
          _this.defId = void 0;
          /** 配置引用 */
          _this.config = void 0;
          /** 伤害（计算后） */
          _this.damage = void 0;
          /** 反弹次数 */
          _this.bounceCount = 0;
          /** 速度倍率 */
          _this.speedMult = void 0;
          /** 是否穿透（配置） */
          _this.piercing = void 0;
          /** 是否穿过（幽灵） */
          _this.passThrough = void 0;
          /** 是否命中后销毁 */
          _this.destructible = void 0;
          /** 冷却剩余（销毁后） */
          _this.cooldownRemaining = 0;
          /** 命中施加的状态 */
          _this.onHitStatus = void 0;
          /** 状态层数 */
          _this.onHitStatusStacks = void 0;
          /** 特殊行为标识 */
          _this.specialBehavior = void 0;
          /** 是否为小弹珠（无特效） */
          _this.isBabyBall = false;
          /** 是否正在返回玩家（回收状态） */
          _this.isReturning = false;
          /** 返回目标玩家ID */
          _this.returnTargetId = '';
          /** 行为修饰器列表 */
          _this._modifiers = [];
          /** 当前正在重叠的敌人（防止同一次穿越重复计算） */
          _this._currentlyHitting = new Set();
          _this.ownerId = ownerId;
          _this.defId = config.id;
          _this.config = config;

          // 从配置初始化
          _this.damage = FixedPoint.fromInt(config.base_dmg);
          _this.speedMult = FixedPoint.fromFloat(config.speed_mult || 1);
          _this.piercing = config.piercing === 1;
          _this.passThrough = config.pass_through === 1;
          _this.destructible = config.destructible === 1;
          _this.onHitStatus = config.on_hit_status || '';
          _this.onHitStatusStacks = config.on_hit_status_stacks || 1;
          _this.specialBehavior = config.special_behavior || '';
          return _this;
        }

        // ==================== 修饰器管理 ====================

        /** 添加修饰器 */
        var _proto = BallEntity.prototype;
        _proto.addModifier = function addModifier(mod) {
          this._modifiers.push(mod);
        }

        /** 添加多个修饰器 */;
        _proto.addModifiers = function addModifiers(mods) {
          var _this$_modifiers;
          (_this$_modifiers = this._modifiers).push.apply(_this$_modifiers, mods);
        }

        /** 获取所有修饰器 */;
        /** 清除所有修饰器 */
        _proto.clearModifiers = function clearModifiers() {
          this._modifiers = [];
        }

        // ==================== 修饰器钩子 ====================

        /** 执行命中敌人钩子，返回是否穿透 */;
        _proto.runOnHitEnemy = function runOnHitEnemy$1(enemy) {
          // 配置优先
          if (this.piercing) return true;
          // 然后检查修饰器
          return runOnHitEnemy(this._modifiers, this, enemy);
        }

        /** 执行命中墙壁钩子，返回碰撞行为 */;
        _proto.runOnHitWall = function runOnHitWall$1(wall) {
          return runOnHitWall(this._modifiers, this, wall);
        }

        /** 执行反弹钩子 */;
        _proto.runOnBounce = function runOnBounce$1(wall) {
          runOnBounce(this._modifiers, this, wall);
        }

        // ==================== 敌人碰撞追踪 ====================

        /** 检查是否正在与该敌人重叠（已处理过此次接触） */;
        _proto.isHittingEnemy = function isHittingEnemy(enemyId) {
          return this._currentlyHitting.has(enemyId);
        }

        /** 标记开始与敌人重叠（本次接触已处理） */;
        _proto.startHittingEnemy = function startHittingEnemy(enemyId) {
          this._currentlyHitting.add(enemyId);
        }

        /** 标记结束与敌人重叠（允许再次命中） */;
        _proto.stopHittingEnemy = function stopHittingEnemy(enemyId) {
          this._currentlyHitting["delete"](enemyId);
        }

        /** 清除所有命中记录（如反弹后） */;
        _proto.clearHitTracking = function clearHitTracking() {
          this._currentlyHitting.clear();
        }

        // ==================== 更新与状态 ====================
        ;

        _proto.update = function update(tick) {
          // 冷却中不更新
          if (this.cooldownRemaining > 0) {
            this.cooldownRemaining--;
            return;
          }

          // 执行修饰器的 onUpdate
          for (var _iterator = _createForOfIteratorHelperLoose(this._modifiers), _step; !(_step = _iterator()).done;) {
            var mod = _step.value;
            mod.onUpdate == null || mod.onUpdate(this, tick);
          }

          // 位置更新
          this.position.add_(this.velocity);

          // 边界约束 + 反弹（比碰撞检测更可靠，高速也不会穿墙）
          this._applyBoundaryBounce();
        }

        /** 边界约束和反弹 */;
        _proto._applyBoundaryBounce = function _applyBoundaryBounce() {
          // 返回中的弹珠跳过边界约束
          if (this.isReturning) return;

          // 屏幕边界（Y-Up）
          var minX = FixedPoint.fromInt(20);
          var maxX = FixedPoint.fromInt(730);
          var minY = FixedPoint.fromInt(10); // 底部 (Floor)
          var maxY = FixedPoint.fromInt(1614); // 顶部 (Ceiling) - Leave margin

          // 左墙：越界 + 正在向左移动时才反弹
          if (this.position.x.lt(minX) && this.velocity.x.ltI(0)) {
            this.position.x.set(minX);
            this.velocity.x.neg_();
            this.addBounce();
          }
          // 右墙：越界 + 正在向右移动时才反弹
          if (this.position.x.gt(maxX) && this.velocity.x.gtI(0)) {
            this.position.x.set(maxX);
            this.velocity.x.neg_();
            this.addBounce();
          }
          // 底墙 (Floor)：越界 + 正在向下移动时才反弹 (Actually LogicV2 checks recycle, but we can bounce here if we want floor bounce)
          // Note: BattleLogicV2 负责回收掉出底部的球。如果这里反弹了，就不会掉出去了。
          // 通常弹珠台底部是"死区"。所以底部不反弹，让Logic回收。
          // But if user wants walls everywhere... let's stick to LogicV2's bottom wall recycle logic for now.
          // Or if this ball is NOT dead, maybe we let it fall?
          // Let's Comment out Bottom Bounce to allow Recycle.

          // 顶墙 (Ceiling): 越界 + 正在向上移动时才反弹
          if (this.position.y.gt(maxY) && this.velocity.y.gtI(0)) {
            this.position.y.set(maxY);
            this.velocity.y.neg_();
            this.addBounce();
          }
        }

        /** 触发销毁（带冷却） */;
        _proto.triggerDestroy = function triggerDestroy() {
          if (this.destructible) {
            this.cooldownRemaining = this.config.cooldown;
            // 移出屏幕或设为不可见
            this.velocity = FPVector2.zero();
          }
        }

        /** 是否在冷却中 */;
        /** 增加反弹次数 */
        _proto.addBounce = function addBounce() {
          this.bounceCount++;
        };
        _createClass(BallEntity, [{
          key: "modifiers",
          get: function get() {
            return this._modifiers;
          }
        }, {
          key: "isOnCooldown",
          get: function get() {
            return this.cooldownRemaining > 0;
          }
        }]);
        return BallEntity;
      }(Entity));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleCommand.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "61245LN7GdPpaGgicnlPBNI", "BattleCommand", undefined);
      /**
       * 战斗指令定义
       * 
       * 逻辑层 -> 表现层 单向通信
       * 逻辑层产生指令，表现层消费指令进行渲染
       */

      /**
       * 指令类型枚举
       */
      var BattleCmdType = exports('BattleCmdType', /*#__PURE__*/function (BattleCmdType) {
        BattleCmdType["BattleStart"] = "BattleStart";
        BattleCmdType["BattleEnd"] = "BattleEnd";
        BattleCmdType["BattlePause"] = "BattlePause";
        BattleCmdType["BattleResume"] = "BattleResume";
        BattleCmdType["EntityCreate"] = "EntityCreate";
        BattleCmdType["EntityDestroy"] = "EntityDestroy";
        BattleCmdType["EntityMove"] = "EntityMove";
        BattleCmdType["EntityRotate"] = "EntityRotate";
        BattleCmdType["DamageDealt"] = "DamageDealt";
        BattleCmdType["HealReceived"] = "HealReceived";
        BattleCmdType["SkillCast"] = "SkillCast";
        BattleCmdType["BuffApply"] = "BuffApply";
        BattleCmdType["BuffRemove"] = "BuffRemove";
        BattleCmdType["PlayerDeath"] = "PlayerDeath";
        BattleCmdType["PlayerRevive"] = "PlayerRevive";
        BattleCmdType["BossSpawn"] = "BossSpawn";
        BattleCmdType["BossPhaseChange"] = "BossPhaseChange";
        BattleCmdType["BossDefeated"] = "BossDefeated";
        BattleCmdType["Collision"] = "Collision";
        BattleCmdType["BallRecycle"] = "BallRecycle";
        return BattleCmdType;
      }({}));

      /**
       * 基础指令接口
       */

      // ==================== 战斗生命周期指令 ====================

      // ==================== 实体指令 ====================

      // ==================== 战斗事件指令 ====================

      // ==================== 玩家指令 ====================

      // ==================== Boss 指令 ====================

      // ==================== 物理碰撞指令 ====================

      /**
       * 所有指令类型联合
       */

      /**
       * 指令队列 - 用于逻辑层向表现层传递指令
       */
      var BattleCmdQueue = exports('BattleCmdQueue', /*#__PURE__*/function () {
        function BattleCmdQueue() {
          this._commands = [];
        }
        var _proto = BattleCmdQueue.prototype;
        /** 推入指令 */
        _proto.push = function push(cmd) {
          this._commands.push(cmd);
        }

        /** 批量推入 */;
        _proto.pushAll = function pushAll(cmds) {
          var _this$_commands;
          (_this$_commands = this._commands).push.apply(_this$_commands, cmds);
        }

        /** 取出所有指令并清空 */;
        _proto.flush = function flush() {
          var cmds = this._commands;
          this._commands = [];
          return cmds;
        }

        /** 获取当前指令数量 */;
        /** 清空 */
        _proto.clear = function clear() {
          this._commands = [];
        };
        _createClass(BattleCmdQueue, [{
          key: "length",
          get: function get() {
            return this._commands.length;
          }
        }]);
        return BattleCmdQueue;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleDemoHelper.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './BattleManager.ts', './FrameSyncManager.ts', './NetworkConfig.ts', './EntityViewPool.ts', './RoomMgr.ts', './BattleLauncher.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, Node, UITransform, DebugMode, log, BattleManager, FrameSyncManager, TransportType, entityViewPool, RoomMgr, BattleLauncher;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      UITransform = module.UITransform;
      DebugMode = module.DebugMode;
    }, function (module) {
      log = module.log;
    }, function (module) {
      BattleManager = module.BattleManager;
    }, function (module) {
      FrameSyncManager = module.FrameSyncManager;
    }, function (module) {
      TransportType = module.TransportType;
    }, function (module) {
      entityViewPool = module.entityViewPool;
    }, function (module) {
      RoomMgr = module.RoomMgr;
    }, function (module) {
      BattleLauncher = module.BattleLauncher;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7d9e6M9vLFAxKm5x77SQx6m", "BattleDemoHelper", undefined);

      /**
       * 战斗演示助手
       * 
       * 职责：
       * - 负责 UI 与 战斗系统的连接
       * - 处理演示环境下的网络初始化和启动
       */
      var BattleDemoHelper = exports('BattleDemoHelper', /*#__PURE__*/function () {
        function BattleDemoHelper(ui) {
          this._ui = void 0;
          this._battleMgr = null;
          this._frameSync = null;
          this._battleContainer = null;
          this._ui = ui;
          if (DebugMode) {
            window['BattleDemoHelper'] = this;
          }
        }
        var _proto = BattleDemoHelper.prototype;
        _proto.init = function init() {
          log("[BattleDemoHelper] Initializing Battle Demo...");

          // 1. 获取网络单例
          this._frameSync = FrameSyncManager.instance();
          var roomMgr = RoomMgr.instance();
          var hasPlayers = roomMgr.players.length > 0;

          // 2. 初始化网络传输（如果尚未初始化）
          if (!this._frameSync.transport) {
            this._frameSync.initialize({
              type: TransportType.PeerJS
            });
          }

          // 3. 创建战斗管理器
          this._battleMgr = new BattleManager({
            localPlayerId: roomMgr.localPlayerId || "Player_Guest",
            frameSync: this._frameSync,
            // 传入网络引用，BattleManager 内部会自动桥接输入
            viewConfig: {
              interpolation: true,
              screenWidth: 750,
              screenHeight: 1624
            }
          });

          // 4. 连接表现层工厂
          this._wireView();

          // 5. 判断是立即开始还是等待连接
          if (hasPlayers) {
            log("[Demo] Room already active. Starting Battle directly...");
            this.startBattle();
          } else {
            this._setupNetworkCallbacks();
          }

          // 6. 暴露全局工具方便调试
          window['BattleDemo'] = this;
          log("[Demo] Use 'BattleDemo.connectTo(targetId)' in console to connect.");

          // 注意：不要在这里提前启动 FrameSync
          // 启动顺序由 BattleLauncher 统一控制：init() -> frameSync.start() -> battleMgr.start()
        };

        _proto._wireView = function _wireView() {
          if (!this._battleMgr || !this._battleMgr.view) return;

          // 创建战斗层容器 (Native Cocos Node)
          // 使用原生 Node 以利用 Cocos 默认的 Y-Up 坐标系
          this._battleContainer = new Node("BattleContainer");
          this._battleContainer.layer = this._ui.node.layer;

          // 添加 UITransform 组件
          var trans = this._battleContainer.addComponent(UITransform);
          trans.setAnchorPoint(0, 0); // Anchor Bottom-Left
          trans.setContentSize(this._ui.width, this._ui.height);

          // 挂载到 UI 节点
          // FGUI Node Origin (0,0) is Top-Left. +Y is UP.
          // Screen Bottom-Left is at (0, -Height).
          this._battleContainer.setPosition(0, -this._ui.height);
          this._ui.node.addChild(this._battleContainer);

          // 设置池容器
          entityViewPool.setContainer(this._battleContainer);

          // 使用池化工厂
          this._battleMgr.view.entityFactory = function (cmd) {
            return entityViewPool.createEntityView(cmd);
          };
        };
        _proto._setupNetworkCallbacks = function _setupNetworkCallbacks() {
          var _this = this;
          if (!this._frameSync) return;
          this._frameSync.onTransportOpen = function (id) {
            log("[Demo] My Peer ID: " + id);
          };
          this._frameSync.onPlayerConnected = function (pid) {
            log("[Demo] Player Connected: " + pid);
          };
          this._frameSync.onReady = function () {
            log("[Demo] All Players Ready. Starting Battle...");
            _this.startBattle();
          };
        };
        _proto.startBattle = /*#__PURE__*/function () {
          var _startBattle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(!this._battleMgr || !this._frameSync)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  _context.next = 4;
                  return BattleLauncher.launch(this._battleMgr, this._frameSync);
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function startBattle() {
            return _startBattle.apply(this, arguments);
          }
          return startBattle;
        }();
        _proto.connectTo = function connectTo(targetId) {
          var _this$_frameSync;
          (_this$_frameSync = this._frameSync) == null || _this$_frameSync.connect(targetId);
        };
        _proto.setMoveInput = function setMoveInput(x, y) {
          var _this$_battleMgr;
          (_this$_battleMgr = this._battleMgr) == null || _this$_battleMgr.setMoveInput(x, y);
        };
        _proto.setShootInput = function setShootInput(x, y) {
          var _this$_battleMgr2;
          (_this$_battleMgr2 = this._battleMgr) == null || _this$_battleMgr2.setShootInput(x, y);
        };
        _proto.destroy = function destroy() {
          if (this._battleMgr) {
            this._battleMgr.destroy();
            this._battleMgr = null;
          }
          if (this._battleContainer) {
            this._battleContainer.removeFromParent();
            this._battleContainer.destroy();
            this._battleContainer = null;
          }
          if (this._frameSync) {
            this._frameSync.stop();
            this._frameSync = null;
          }
          window['BattleDemo'] = null;
        };
        return BattleDemoHelper;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleLauncher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BattleLogger.ts', './RoomMgr.ts', './ConfigMgr.ts', './DB_Roles.ts', './DB_Balls.ts', './DB_Stage.ts', './DB_Wave.ts', './DB_Enemy.ts', './DB_WavePattern.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _extends, cclegacy, battleLog, RoomMgr, configMgr, DB_Roles, DB_Balls, DB_Stage, DB_Wave, DB_Enemy, DB_WavePattern;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      RoomMgr = module.RoomMgr;
    }, function (module) {
      configMgr = module.configMgr;
    }, function (module) {
      DB_Roles = module.default;
    }, function (module) {
      DB_Balls = module.default;
    }, function (module) {
      DB_Stage = module.default;
    }, function (module) {
      DB_Wave = module.default;
    }, function (module) {
      DB_Enemy = module.default;
    }, function (module) {
      DB_WavePattern = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ea212sX/DFCRJgK1sWcFZ+5", "BattleLauncher", undefined);

      /** 战斗启动配置 */

      /** 默认启动配置 */
      var DEFAULT_CONFIG = {
        screenWidth: 750,
        screenHeight: 1624,
        spawnOffsetY: 250
      };

      /**
       * 战斗启动器
       * 
       * 职责：
       * - 协调 BattleManager 和 FrameSyncManager
       * - 根据 Room 状态初始化战斗数据
       * - 从 ConfigMgr 加载配置并注册到 BattleLogicV2
       */
      var BattleLauncher = exports('BattleLauncher', /*#__PURE__*/function () {
        function BattleLauncher() {}
        /**
         * 启动战斗
         * @param battleMgr 战斗管理器
         * @param frameSync 帧同步管理器
         * @param config 可选的启动配置
         */
        BattleLauncher.launch = /*#__PURE__*/
        function () {
          var _launch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(battleMgr, frameSync, config) {
            var launchConfig, roomMgr, initData, isHost;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (config === void 0) {
                    config = {};
                  }
                  launchConfig = _extends({}, DEFAULT_CONFIG, config);
                  roomMgr = RoomMgr.instance();
                  _context.next = 5;
                  return this._loadAndRegisterConfigs(battleMgr);
                case 5:
                  // 1. 准备初始化数据 (V2 使用 stageId 和 roleId)
                  if (roomMgr.players.length > 0) {
                    initData = {
                      stageId: "TEST",
                      // 使用测试关卡
                      players: roomMgr.players.map(function (p) {
                        return {
                          id: p.id,
                          roleId: "RTEST",
                          // 使用测试角色
                          name: p.name
                        };
                      }),
                      randomSeed: roomMgr.randomSeed,
                      screenWidth: launchConfig.screenWidth,
                      screenHeight: launchConfig.screenHeight
                    };
                  } else {
                    // 单机/测试模式
                    initData = {
                      stageId: "TEST",
                      players: [{
                        id: roomMgr.localPlayerId || "Player_Guest",
                        roleId: "RTEST",
                        name: "Guest"
                      }],
                      randomSeed: Date.now(),
                      screenWidth: launchConfig.screenWidth,
                      screenHeight: launchConfig.screenHeight
                    };
                  }
                  battleLog.log("[BattleLauncher] Launching battle with " + initData.players.length + " players. Seed: " + initData.randomSeed);

                  // 2. 初始化并启动系统
                  battleMgr.init(initData);
                  frameSync.start();
                  battleMgr.start();

                  // 3. 宿主驱动初始逻辑
                  // 注意: V2 中玩家实体由 BattleLogicV2._createPlayers() 自动创建
                  isHost = roomMgr.isHost || roomMgr.players.length === 0;
                  if (isHost) {
                    battleLog.log("[BattleLauncher] Host mode: players will be created by BattleLogicV2");
                  }
                case 12:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function launch(_x, _x2, _x3) {
            return _launch.apply(this, arguments);
          }
          return launch;
        }()
        /**
         * 从 ConfigMgr 加载配置并注册到 BattleLogicV2
         */;

        BattleLauncher._loadAndRegisterConfigs = /*#__PURE__*/
        function () {
          var _loadAndRegisterConfigs2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(battleMgr) {
            var logic, roles, roleCount, balls, ballCount, enemies, enemyCount, stages, stageCount, wavePatterns, patternCount, waves, waveCount;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  logic = battleMgr.logic; // 1. 预加载 Config 目录下所有配置 JSON
                  _context2.next = 3;
                  return configMgr.initConfigs("Config");
                case 3:
                  // 2. 同步获取并注册
                  // 加载角色配置
                  roles = configMgr.getAllConfigs(DB_Roles);
                  roleCount = 0;
                  roles.forEach(function (role) {
                    logic.registerRoleConfig(role);
                    roleCount++;
                  });

                  // 加载弹珠配置  
                  balls = configMgr.getAllConfigs(DB_Balls);
                  ballCount = 0;
                  balls.forEach(function (ball) {
                    logic.registerBallConfig(ball);
                    ballCount++;
                  });

                  // 加载敌人配置
                  enemies = configMgr.getAllConfigs(DB_Enemy);
                  enemyCount = 0;
                  enemies.forEach(function (enemy) {
                    logic.registerEnemyConfig(enemy);
                    enemyCount++;
                  });

                  // 加载关卡配置
                  stages = configMgr.getAllConfigs(DB_Stage);
                  stageCount = 0;
                  stages.forEach(function (stage) {
                    logic.registerStageConfig(stage);
                    stageCount++;
                  });

                  // 加载波次阵型配置
                  wavePatterns = configMgr.getAllConfigs(DB_WavePattern);
                  patternCount = 0;
                  wavePatterns.forEach(function (pattern) {
                    logic.registerWavePatternConfig(pattern);
                    patternCount++;
                  });

                  // 加载波次配置
                  waves = configMgr.getAllConfigs(DB_Wave);
                  waveCount = 0;
                  waves.forEach(function (wave) {
                    logic.registerWaveConfig(wave);
                    waveCount++;
                  });
                  battleLog.log("[BattleLauncher] Configs loaded: " + roleCount + " roles, " + ballCount + " balls, " + enemyCount + " enemies, " + stageCount + " stages, " + patternCount + " patterns, " + waveCount + " waves");
                case 22:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function _loadAndRegisterConfigs(_x4) {
            return _loadAndRegisterConfigs2.apply(this, arguments);
          }
          return _loadAndRegisterConfigs;
        }();
        return BattleLauncher;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleLogger.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, mk_logger;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      mk_logger = module.logger;
    }],
    execute: function () {
      cclegacy._RF.push({}, "119b2QhBuhB04kE4WLMEPqO", "BattleLogger", undefined);

      /** 日志级别 */
      var LogLevel = exports('LogLevel', /*#__PURE__*/function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["INFO"] = 1] = "INFO";
        LogLevel[LogLevel["WARN"] = 2] = "WARN";
        LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
        LogLevel[LogLevel["NONE"] = 4] = "NONE";
        return LogLevel;
      }({}));

      /** 战斗日志管理器 */
      var BattleLogger = exports('BattleLogger', /*#__PURE__*/function () {
        function BattleLogger() {}
        /** 设置日志级别 */
        BattleLogger.setLevel = function setLevel(level) {
          this._level = level;
        }

        /** 启用/禁用日志 */;
        BattleLogger.setEnabled = function setEnabled(enabled) {
          this._enabled = enabled;
        }

        /** 调试日志（仅开发模式） */;
        BattleLogger.debug = function debug() {
          var _this$_logger;
          if (!this._enabled || this._level > LogLevel.DEBUG) return;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          (_this$_logger = this._logger).log.apply(_this$_logger, ['[DEBUG]'].concat(args));
        }

        /** 信息日志 */;
        BattleLogger.log = function log() {
          var _this$_logger2;
          if (!this._enabled || this._level > LogLevel.INFO) return;
          (_this$_logger2 = this._logger).log.apply(_this$_logger2, arguments);
        }

        /** 警告日志 */;
        BattleLogger.warn = function warn() {
          var _this$_logger3;
          if (!this._enabled || this._level > LogLevel.WARN) return;
          (_this$_logger3 = this._logger).warn.apply(_this$_logger3, arguments);
        }

        /** 错误日志 */;
        BattleLogger.error = function error() {
          var _this$_logger4;
          if (!this._enabled || this._level > LogLevel.ERROR) return;
          (_this$_logger4 = this._logger).error.apply(_this$_logger4, arguments);
        };
        return BattleLogger;
      }());

      /** 兼容旧代码的日志对象 */
      BattleLogger._level = LogLevel.DEBUG;
      BattleLogger._enabled = true;
      BattleLogger._logger = new mk_logger('Battle');
      var battleLog = exports('battleLog', {
        log: function log() {
          return BattleLogger.log.apply(BattleLogger, arguments);
        },
        warn: function warn() {
          return BattleLogger.warn.apply(BattleLogger, arguments);
        },
        error: function error() {
          return BattleLogger.error.apply(BattleLogger, arguments);
        },
        debug: function debug() {
          return BattleLogger.debug.apply(BattleLogger, arguments);
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleLogicV2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BattleLogger.ts', './FrameBuffer.ts', './BattleCommand.ts', './InputCommand.ts', './FixedPoint.ts', './FPVector2.ts', './index3.ts', './index.ts', './StatusSystem.ts', './DamageSystem.ts', './LaunchSystem.ts', './WaveSystem.ts', './CollisionHandler.ts', './DefaultModifier.ts', './index2.ts', './PhysicsConfig.ts', './Collider.ts', './PhysicsConstants.ts', './CharacterAbilities.ts', './EntityManager.ts', './CollisionSystem.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, _createClass, cclegacy, battleLog, FrameBuffer, BattleCmdType, BattleCmdQueue, InputCmdType, FixedPoint, FPVector2, registerStatusConfig, StatusSystem, DamageSystem, DEFAULT_LAUNCH_CONFIG, LaunchSystem, registerEnemy, registerStage, registerWave, registerWavePattern, WaveSystem, CollisionHandler, createDefaultModifier, DEFAULT_BALL_RADIUS, ColliderType, createCircleCollider, createRectCollider, DEFAULT_ENEMY_HITBOX, getAbilityForRole, EntityManager, CollisionSystem;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      FrameBuffer = module.FrameBuffer;
    }, function (module) {
      BattleCmdType = module.BattleCmdType;
      BattleCmdQueue = module.BattleCmdQueue;
    }, function (module) {
      InputCmdType = module.InputCmdType;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, null, null, function (module) {
      registerStatusConfig = module.registerStatusConfig;
      StatusSystem = module.StatusSystem;
    }, function (module) {
      DamageSystem = module.DamageSystem;
    }, function (module) {
      DEFAULT_LAUNCH_CONFIG = module.DEFAULT_LAUNCH_CONFIG;
      LaunchSystem = module.LaunchSystem;
    }, function (module) {
      registerEnemy = module.registerEnemy;
      registerStage = module.registerStage;
      registerWave = module.registerWave;
      registerWavePattern = module.registerWavePattern;
      WaveSystem = module.WaveSystem;
    }, function (module) {
      CollisionHandler = module.CollisionHandler;
    }, function (module) {
      createDefaultModifier = module.createDefaultModifier;
    }, null, function (module) {
      DEFAULT_BALL_RADIUS = module.DEFAULT_BALL_RADIUS;
      ColliderType = module.ColliderType;
    }, function (module) {
      createCircleCollider = module.createCircleCollider;
      createRectCollider = module.createRectCollider;
    }, function (module) {
      DEFAULT_ENEMY_HITBOX = module.DEFAULT_ENEMY_HITBOX;
    }, function (module) {
      getAbilityForRole = module.getAbilityForRole;
    }, function (module) {
      EntityManager = module.EntityManager;
    }, function (module) {
      CollisionSystem = module.CollisionSystem;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d5e828zSL5JKr9TMEXlayOT", "BattleLogicV2", undefined);

      // Config Types

      /**
       * 战斗初始化数据
       */

      /**
       * 玩家初始数据
       */

      /**
       * 战斗状态
       */
      var BattleStateV2 = exports('BattleStateV2', /*#__PURE__*/function (BattleStateV2) {
        BattleStateV2[BattleStateV2["None"] = 0] = "None";
        BattleStateV2[BattleStateV2["Running"] = 1] = "Running";
        BattleStateV2[BattleStateV2["Paused"] = 2] = "Paused";
        BattleStateV2[BattleStateV2["Ended"] = 3] = "Ended";
        return BattleStateV2;
      }({}));

      /**
       * 战斗结果
       */

      /**
       * 战斗逻辑 V2
       */
      var BattleLogicV2 = exports('BattleLogicV2', /*#__PURE__*/function () {
        function BattleLogicV2(config) {
          // ==================== 核心组件 ====================
          this._frameBuffer = void 0;
          this._cmdQueue = new BattleCmdQueue();
          this._state = BattleStateV2.None;
          this._initData = null;
          this._randomSeed = 0;
          // ==================== 实体与物理 ====================
          this._entityManager = new EntityManager();
          this._collisionSystem = new CollisionSystem();
          // ==================== 系统 ====================
          this._statusSystem = new StatusSystem();
          this._damageSystem = void 0;
          this._launchSystem = void 0;
          this._waveSystem = void 0;
          this._collisionHandler = void 0;
          // ==================== 配置缓存 ====================
          this._ballConfigs = new Map();
          this._roleConfigs = new Map();
          this._playerAbilities = new Map();
          // playerId -> ability
          // ==================== 状态追踪 ====================
          this._isChasing = false;
          this._stats = {
            enemiesKilled: 0
          };
          // ==================== 自动发射（按住摇杆自动发射） ====================
          /** 自动发射间隔（帧） */
          this.autoFireInterval = 30;
          // 每0.5秒发射一次
          /** 玩家瞄准状态（playerId -> isAiming） */
          this._playerAiming = new Map();
          /** 玩家自动发射计时器（playerId -> timer） */
          this._playerFireTimers = new Map();
          // ==================== 回调 ====================
          this.onBattleEnd = null;
          this.onTick = null;
          // ==================== 屏幕边界 ====================
          this._screenWidth = 750;
          this._screenHeight = 1624;
          this._frameBuffer = new FrameBuffer(config);
          this._frameBuffer.onFrame = this._onFrame.bind(this);

          // 初始化系统
          this._damageSystem = new DamageSystem(this._statusSystem);
          this._launchSystem = new LaunchSystem(this._entityManager);
          this._waveSystem = new WaveSystem(this._entityManager);
          this._collisionHandler = new CollisionHandler(this._entityManager, this._damageSystem, this._collisionSystem);

          // 创建屏幕边界墙
          this._createBoundaryWalls();
        }

        // ==================== 配置注册 ====================

        /** 注册弹珠配置 */
        var _proto = BattleLogicV2.prototype;
        _proto.registerBallConfig = function registerBallConfig(config) {
          this._ballConfigs.set(config.id, config);
        }

        /** 注册角色配置 */;
        _proto.registerRoleConfig = function registerRoleConfig(config) {
          this._roleConfigs.set(config.id, config);
        }

        /** 注册状态配置 */;
        _proto.registerStatusConfig = function registerStatusConfig$1(config) {
          registerStatusConfig(config);
        }

        /** 注册敌人配置 */;
        _proto.registerEnemyConfig = function registerEnemyConfig(config) {
          registerEnemy(config);
        }

        /** 注册关卡配置 */;
        _proto.registerStageConfig = function registerStageConfig(config) {
          registerStage(config);
        }

        /** 注册波次配置 */;
        _proto.registerWaveConfig = function registerWaveConfig(config) {
          registerWave(config);
        }

        /** 注册波次阵型配置 */;
        _proto.registerWavePatternConfig = function registerWavePatternConfig(config) {
          registerWavePattern(config);
        }

        // ==================== Getters ====================
        ;
        // ==================== 战斗控制 ====================
        /** 初始化战斗 */
        _proto.init = function init(data) {
          this._initData = data;
          this._state = BattleStateV2.None;
          this._randomSeed = data.randomSeed;
          this._frameBuffer.reset();
          this._frameBuffer.setExpectedPlayers(data.players.map(function (p) {
            return p.id;
          }));
          this._cmdQueue.clear();
          this._entityManager.reset();
          this._collisionSystem.clear();
          this._launchSystem.reset();
          this._waveSystem.reset();
          this._stats.enemiesKilled = 0;

          // 重建边界墙
          this._createBoundaryWalls();

          // 初始化波次系统
          this._waveSystem.setScreenSize(data.screenWidth || 750, data.screenHeight || 1624);
          this._waveSystem.initStage(data.stageId, data.randomSeed);
          battleLog.log("[BattleLogicV2] Initialized: stage=" + data.stageId + ", players=" + data.players.length);
        }

        /** 开始战斗 */;
        _proto.start = function start() {
          if (!this._initData) {
            battleLog.log('[BattleLogicV2] Cannot start: not initialized');
            return;
          }
          if (this._state !== BattleStateV2.None) {
            battleLog.log('[BattleLogicV2] Cannot start: already started');
            return;
          }
          this._state = BattleStateV2.Running;

          // 发送战斗开始指令
          this._cmdQueue.push({
            type: BattleCmdType.BattleStart,
            tick: 0,
            mapId: this._initData.stageId,
            players: this._initData.players.map(function (p) {
              return {
                id: p.id,
                heroId: p.roleId
              };
            })
          });

          // 创建玩家实体
          this._createPlayers();

          // 启动帧驱动
          this._frameBuffer.start();
          battleLog.log('[BattleLogicV2] Battle started');
        }

        /** 暂停战斗 */;
        _proto.pause = function pause() {
          if (this._state !== BattleStateV2.Running) return;
          this._state = BattleStateV2.Paused;
          this._frameBuffer.stop();
          this._cmdQueue.push({
            type: BattleCmdType.BattlePause,
            tick: this.currentTick
          });
          battleLog.log('[BattleLogicV2] Battle paused');
        }

        /** 恢复战斗 */;
        _proto.resume = function resume() {
          if (this._state !== BattleStateV2.Paused) return;
          this._state = BattleStateV2.Running;
          this._frameBuffer.start();
          this._cmdQueue.push({
            type: BattleCmdType.BattleResume,
            tick: this.currentTick
          });
          battleLog.log('[BattleLogicV2] Battle resumed');
        }

        /** 结束战斗 */;
        _proto.end = function end(victory) {
          if (this._state === BattleStateV2.Ended) return;
          this._state = BattleStateV2.Ended;
          this._frameBuffer.stop();
          var result = {
            victory: victory,
            duration: this.currentTick,
            waveReached: this._waveSystem.state.currentWaveIndex,
            enemiesKilled: this._stats.enemiesKilled
          };
          this._cmdQueue.push({
            type: BattleCmdType.BattleEnd,
            tick: this.currentTick,
            result: victory ? 'victory' : 'defeat'
          });
          if (this.onBattleEnd) this.onBattleEnd(result);
          battleLog.log("[BattleLogicV2] Battle ended: " + (victory ? 'Victory' : 'Defeat'));
        }

        /** 销毁战斗 */;
        _proto.destroy = function destroy() {
          this._frameBuffer.stop();
          this._frameBuffer.reset();
          this._cmdQueue.clear();
          this._entityManager.reset();
          this._collisionSystem.clear();
          this._state = BattleStateV2.None;
          this._initData = null;
          battleLog.log('[BattleLogicV2] Battle destroyed');
        }

        /** 推入玩家输入 */;
        _proto.pushInput = function pushInput(tick, playerId, commands) {
          this._frameBuffer.pushInput({
            tick: tick,
            playerId: playerId,
            commands: commands
          });
        }

        // ==================== 帧回调 ====================
        ;

        _proto._onFrame = function _onFrame(tick, inputs, isChasing) {
          this._isChasing = isChasing;

          // 1. 处理玩家输入（会设置 _playerAiming 状态）
          this._processInputs(tick, inputs);

          // 2. 更新发射系统冷却
          this._launchSystem.update();

          // 3. 处理按住摇杆自动发射
          this._processAutoFire(tick);

          // 4. 更新波次系统（从配置表生成敌人）
          var newEnemies = this._waveSystem.update(tick);
          for (var _iterator = _createForOfIteratorHelperLoose(newEnemies), _step; !(_step = _iterator()).done;) {
            var enemy = _step.value;
            this._onEnemyCreated(enemy);
          }

          // 5. 更新所有实体
          // 5a. 先快照碰撞体位置（用于 CCD）
          this._snapshotColliderPositions();
          this._entityManager.update(tick);

          // 5.5 检查返回中的弹珠是否到达玩家
          this._checkReturningBalls(tick);

          // 5.6 检查弹珠是否越过底墙（触发回收）
          this._checkBottomWallCrossing(tick);

          // 6. 同步到物理系统并检测碰撞
          this._processCollisions(tick);

          // 7. 更新状态效果
          var statusEvents = this._statusSystem.updateAll(this._entityManager.enemies, tick);
          for (var _iterator2 = _createForOfIteratorHelperLoose(statusEvents), _step2; !(_step2 = _iterator2()).done;) {
            var event = _step2.value;
            this._onStatusDamage(event, tick);
          }

          // 8. 发送实体移动指令
          this._sendEntityUpdates(tick);

          // 9. 检查战斗结束
          this._checkBattleEnd(tick);

          // 10. 外部回调
          if (this.onTick) this.onTick(tick);
        }

        // ==================== 按住摇杆自动发射 ====================
        ;

        _proto._processAutoFire = function _processAutoFire(tick) {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._entityManager.players), _step3; !(_step3 = _iterator3()).done;) {
            var player = _step3.value;
            if (!player.alive) continue;
            var playerId = player.playerId;
            var isAiming = this._playerAiming.get(playerId) || false;
            if (isAiming) {
              // 玩家正在瞄准，更新计时器
              var timer = (this._playerFireTimers.get(playerId) || 0) + 1;
              if (timer >= this.autoFireInterval) {
                timer = 0;
                this._fireForPlayer(player, tick);
              }
              this._playerFireTimers.set(playerId, timer);
            } else {
              // 玩家停止瞄准，重置计时器（下次按住立即发射）
              this._playerFireTimers.set(playerId, this.autoFireInterval);
            }
          }

          // 重置所有玩家的瞄准状态（需要每帧通过 Aim 输入保持）
          this._playerAiming.clear();
        };
        _proto._fireForPlayer = function _fireForPlayer(player, tick) {
          // 使用玩家当前瞄准方向发射
          var ballConfig = this._ballConfigs.get(player.startBallId);
          if (!ballConfig) {
            battleLog.log("[BattleLogicV2] No ball config for player " + player.playerId + ", ballId=" + player.startBallId);
            return;
          }
          var ability = this._playerAbilities.get(player.playerId);
          var launchConfig = _extends({}, DEFAULT_LAUNCH_CONFIG);
          if (ability != null && ability.getLaunchConfig) {
            Object.assign(launchConfig, ability.getLaunchConfig());
          }
          var balls = this._launchSystem.tryLaunch(player, ballConfig, launchConfig);
          for (var _iterator4 = _createForOfIteratorHelperLoose(balls), _step4; !(_step4 = _iterator4()).done;) {
            var ball = _step4.value;
            if (ability != null && ability.onBallLaunched) {
              ball.addModifiers(ability.onBallLaunched(ball));
            } else {
              ball.addModifier(createDefaultModifier());
            }
            this._onBallCreated(ball, tick);
          }
        }

        // ==================== 输入处理 ====================
        ;

        _proto._processInputs = function _processInputs(tick, inputs) {
          var _this = this;
          inputs.forEach(function (cmds, playerId) {
            if (!cmds || !Array.isArray(cmds)) return;
            var player = _this._entityManager.getPlayerByPlayerId(playerId);
            if (!player) return;
            for (var _iterator5 = _createForOfIteratorHelperLoose(cmds), _step5; !(_step5 = _iterator5()).done;) {
              var cmd = _step5.value;
              switch (cmd.type) {
                case InputCmdType.Move:
                  _this._handleMoveInput(player, cmd);
                  break;
                case InputCmdType.Aim:
                  _this._handleAimInput(player, cmd);
                  break;
                case InputCmdType.Shoot:
                  _this._handleShootInput(player, cmd, tick);
                  break;
              }
            }
          });
        };
        _proto._handleMoveInput = function _handleMoveInput(player, cmd) {
          // 设置玩家速度
          player.velocity.setF(cmd.x * player.moveSpeed.toFloat(), cmd.y * player.moveSpeed.toFloat());
        };
        _proto._handleAimInput = function _handleAimInput(player, cmd) {
          // 设置瞄准方向
          player.setAimDirection(FixedPoint.fromFloat(cmd.targetX), FixedPoint.fromFloat(cmd.targetY));

          // 标记玩家正在瞄准（用于自动发射）
          this._playerAiming.set(player.playerId, true);
        };
        _proto._handleShootInput = function _handleShootInput(player, cmd, tick) {
          // 获取弹珠配置
          var ballConfig = this._ballConfigs.get(player.startBallId);
          if (!ballConfig) {
            battleLog.log("[BattleLogicV2] Unknown ball: " + player.startBallId);
            return;
          }

          // 获取角色能力
          var ability = this._playerAbilities.get(player.playerId);

          // 使用能力的发射配置（如果有）
          var launchConfig = _extends({}, DEFAULT_LAUNCH_CONFIG);
          if (ability != null && ability.getLaunchConfig) {
            Object.assign(launchConfig, ability.getLaunchConfig());
          }

          // 尝试发射
          var balls = this._launchSystem.tryLaunch(player, ballConfig, launchConfig);

          // 为每个弹珠应用修饰器并创建碰撞体
          for (var _iterator6 = _createForOfIteratorHelperLoose(balls), _step6; !(_step6 = _iterator6()).done;) {
            var ball = _step6.value;
            // 应用能力提供的修饰器
            if (ability != null && ability.onBallLaunched) {
              var modifiers = ability.onBallLaunched(ball);
              ball.addModifiers(modifiers);
            } else {
              // 默认修饰器
              ball.addModifier(createDefaultModifier());
            }
            this._onBallCreated(ball, tick);
          }
        }

        // ==================== 实体创建回调 ====================
        ;

        _proto._onBallCreated = function _onBallCreated(ball, tick) {
          var _this2 = this;
          // 从配置读取碰撞半径，使用默认值作为回退
          var collisionRadius = ball.config.collision_radius ? FixedPoint.fromInt(ball.config.collision_radius) : DEFAULT_BALL_RADIUS;

          // 创建碰撞体
          var collider = createCircleCollider(ball.id, ColliderType.Ball, collisionRadius, ball.position, false);
          this._collisionSystem.addCollider(collider);

          // 注册销毁回调：自动移除碰撞体
          ball.onDestroy(function () {
            _this2._collisionSystem.removeColliderByEntityId(ball.id);
          });

          // 发送创建指令
          this._cmdQueue.push({
            type: BattleCmdType.EntityCreate,
            tick: tick,
            entityId: ball.id,
            entityType: 'ball',
            x: ball.position.x.toFloat(),
            y: ball.position.y.toFloat(),
            data: {
              ballId: ball.defId,
              ownerId: ball.ownerId
            }
          });
        };
        _proto._onEnemyCreated = function _onEnemyCreated(enemy) {
          var _this3 = this;
          // 从配置读取碰撞盒尺寸，使用默认值作为回退
          var halfWidth = FixedPoint.fromInt(enemy.config.hitbox_half_width || DEFAULT_ENEMY_HITBOX.halfWidth);
          var halfHeight = FixedPoint.fromInt(enemy.config.hitbox_half_height || DEFAULT_ENEMY_HITBOX.halfHeight);

          // 创建矩形碰撞体
          var collider = createRectCollider(enemy.id, ColliderType.Target, halfWidth, halfHeight, enemy.position, false // 动态 (Enemies move down, so they must be dynamic for Grid update)
          );

          this._collisionSystem.addCollider(collider);

          // 注册销毁回调：自动移除碰撞体
          enemy.onDestroy(function () {
            _this3._collisionSystem.removeColliderByEntityId(enemy.id);
          });

          // 发送创建指令
          this._cmdQueue.push({
            type: BattleCmdType.EntityCreate,
            tick: this.currentTick,
            entityId: enemy.id,
            entityType: 'enemy',
            x: enemy.position.x.toFloat(),
            y: enemy.position.y.toFloat(),
            data: {
              enemyId: enemy.defId
            }
          });
        }

        // ==================== 碰撞处理 ====================
        ;

        _proto._snapshotColliderPositions = function _snapshotColliderPositions() {
          // 快照所有动态实体的当前位置作为上一帧位置
          for (var _iterator7 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step7; !(_step7 = _iterator7()).done;) {
            var ball = _step7.value;
            var collider = this._collisionSystem.getColliderByEntityId(ball.id);
            if (collider) {
              collider.previousPosition.set(ball.position);
            }
          }
          for (var _iterator8 = _createForOfIteratorHelperLoose(this._entityManager.enemies), _step8; !(_step8 = _iterator8()).done;) {
            var enemy = _step8.value;
            var _collider = this._collisionSystem.getColliderByEntityId(enemy.id);
            if (_collider) {
              _collider.previousPosition.set(enemy.position);
            }
          }
        };
        _proto._processCollisions = function _processCollisions(tick) {
          // 同步弹珠位置到碰撞系统
          for (var _iterator9 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step9; !(_step9 = _iterator9()).done;) {
            var ball = _step9.value;
            var collider = this._collisionSystem.getColliderByEntityId(ball.id);
            if (collider) {
              collider.position.set(ball.position);
              collider.velocity.set(ball.velocity);
            }
          }

          // 同步敌人位置到碰撞系统（敌人会向下移动）
          for (var _iterator10 = _createForOfIteratorHelperLoose(this._entityManager.enemies), _step10; !(_step10 = _iterator10()).done;) {
            var enemy = _step10.value;
            var _collider2 = this._collisionSystem.getColliderByEntityId(enemy.id);
            if (_collider2) {
              _collider2.position.set(enemy.position);
            }
          }

          // 执行碰撞检测
          var events = this._collisionSystem.update();

          // 处理碰撞事件
          for (var _iterator11 = _createForOfIteratorHelperLoose(events), _step11; !(_step11 = _iterator11()).done;) {
            var event = _step11.value;
            this._handleCollision(event, tick);
          }

          // 同步位置回弹珠（反弹后的位置）
          for (var _iterator12 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step12; !(_step12 = _iterator12()).done;) {
            var _ball = _step12.value;
            var _collider3 = this._collisionSystem.getColliderByEntityId(_ball.id);
            if (_collider3) {
              _ball.position.set(_collider3.position);
              _ball.velocity.set(_collider3.velocity);
            }
          }
        };
        _proto._handleCollision = function _handleCollision(event, tick) {
          var colliderA = event.colliderA;
          var colliderB = event.colliderB;

          // 弹珠 vs 敌人
          if (colliderA.colliderType === ColliderType.Ball && colliderB.colliderType === ColliderType.Target) {
            this._handleBallHitEnemy(colliderA.entityId, colliderB.entityId, event, tick);
          } else if (colliderA.colliderType === ColliderType.Target && colliderB.colliderType === ColliderType.Ball) {
            this._handleBallHitEnemy(colliderB.entityId, colliderA.entityId, event, tick);
          }

          // 弹珠 vs 墙壁
          if (colliderA.colliderType === ColliderType.Wall || colliderB.colliderType === ColliderType.Wall) {
            var isBallA = colliderA.colliderType === ColliderType.Ball;
            var isBallB = colliderB.colliderType === ColliderType.Ball;
            if (isBallA || isBallB) {
              var ballId = isBallA ? colliderA.entityId : colliderB.entityId;
              var wallId = isBallA ? colliderB.entityId : colliderA.entityId;
              this._handleBallHitWall(ballId, wallId, tick);
            }
          }

          // 发送碰撞指令
          this._cmdQueue.push({
            type: BattleCmdType.Collision,
            tick: tick,
            entityA: colliderA.entityId,
            entityB: colliderB.entityId,
            pointX: event.point.x.toFloat(),
            pointY: event.point.y.toFloat()
          });
        };
        _proto._handleBallHitEnemy = function _handleBallHitEnemy(ballId, enemyId, event, tick) {
          var enemy = this._entityManager.getEnemy(enemyId);

          // 使用 CollisionHandler 处理碰撞
          var result = this._collisionHandler.handleBallHitEnemy(ballId, enemyId, tick);

          // 发送伤害指令
          if (result.damaged && result.damageEvent) {
            this._cmdQueue.push({
              type: BattleCmdType.DamageDealt,
              tick: tick,
              attackerId: ballId,
              targetId: enemyId,
              damage: result.damageEvent.damage.toInt(),
              isCrit: result.damageEvent.isCrit
            });
          }

          // 检查击杀
          if (result.killed && enemy) {
            this._onEnemyKilled(enemy, tick);
          }
        };
        _proto._onEnemyKilled = function _onEnemyKilled(enemy, tick) {
          this._stats.enemiesKilled++;

          // 销毁敌人（onDestroy 回调会自动移除碰撞体）
          enemy.destroy();

          // 发送销毁指令
          this._cmdQueue.push({
            type: BattleCmdType.EntityDestroy,
            tick: tick,
            entityId: enemy.id,
            reason: 'killed'
          });
        };
        _proto._handleBallHitWall = function _handleBallHitWall(ballId, wallId, tick) {
          var ball = this._entityManager.getBall(ballId);
          if (!ball) return;

          // 使用 CollisionHandler 处理墙壁碰撞
          var result = this._collisionHandler.handleBallHitWall(ballId, wallId);

          // 处理回收
          if (result.recycled) {
            this._recycleBall(ball, tick);
            return;
          }

          // 处理销毁
          if (result.destroyed) {
            // ball.destroy() 会自动触发 onDestroy 回调移除碰撞体
            this._cmdQueue.push({
              type: BattleCmdType.EntityDestroy,
              tick: tick,
              entityId: ball.id,
              reason: 'destroyed'
            });
          }
        };
        _proto._recycleBall = function _recycleBall(ball, tick) {
          // 找到弹珠所属玩家
          var player = this._entityManager.getPlayerByPlayerId(ball.ownerId);
          if (!player) {
            ball.destroy(); // onDestroy 回调会自动移除碰撞体
            return;
          }

          // 开始飞回玩家
          ball.isReturning = true;
          ball.returnTargetId = player.playerId;

          // 禁用碰撞体，防止物理系统干扰回收轨迹（销毁时自动移除）
          this._collisionSystem.setColliderEnabledByEntityId(ball.id, false);

          // 计算飞回方向和速度
          var dx = player.position.x.sub(ball.position.x);
          var dy = player.position.y.sub(ball.position.y);

          // 当距离很大时（>1400），distSq 会溢出 32 位整数变成负数
          // 屏幕高度 1624，这种溢出很容易发生
          var hugeDistance = FixedPoint.fromInt(1000);
          var isFar = false;
          if (dx.abs().gt(hugeDistance) || dy.abs().gt(hugeDistance)) {
            isFar = true; // 单轴距离就超过1000，肯定很远
          } else {
            var distSq = dx.mul(dx).add(dy.mul(dy));
            // 如果计算结果为负（溢出）或者足够大，都认为很远
            if (distSq.ltI(0) || distSq.gtI(2500)) {
              isFar = true;
            }
          }

          // 设置回收速度
          var returnSpeed = FixedPoint.fromInt(25);
          if (isFar) {
            // 计算单位向量需要开方，如果溢出可能有问题
            // 这里简单处理：如果溢出，使用近似的单位向量
            var dirX, dirY;

            // 重新计算 distSq 用于开方（如果未溢出）
            var _distSq = dx.mul(dx).add(dy.mul(dy));
            if (_distSq.gtI(0)) {
              var dist = FixedPoint.fromFloat(Math.sqrt(_distSq.toFloat()));
              dirX = dx.div(dist);
              dirY = dy.div(dist);
            } else {
              // 溢出情况，使用浮点数计算方向（反正已经在逻辑层了）
              var fdx = dx.toFloat();
              var fdy = dy.toFloat();
              var fdist = Math.sqrt(fdx * fdx + fdy * fdy);
              dirX = FixedPoint.fromFloat(fdx / fdist);
              dirY = FixedPoint.fromFloat(fdy / fdist);
            }
            ball.velocity = new FPVector2(dirX.mul(returnSpeed), dirY.mul(returnSpeed));
            battleLog.debug("[BattleLogicV2] Ball#" + ball.id + " returning, vel=(" + ball.velocity.x.toFloat() + ", " + ball.velocity.y.toFloat() + ")");
          } else {
            battleLog.debug("[BattleLogicV2] Ball#" + ball.id + " too close, instant recycle");
            player.returnBall();
            ball.destroy();
            // collider 已经移除了
            this._cmdQueue.push({
              type: BattleCmdType.BallRecycle,
              tick: tick,
              entityId: ball.id,
              playerId: player.playerId
            });
          }

          // 清除命中记录
          ball.clearHitTracking();
        }

        /** 检查返回中的弹珠是否到达玩家 */;
        _proto._checkReturningBalls = function _checkReturningBalls(tick) {
          var arrivalThreshold = FixedPoint.fromInt(50); // 到达阈值
          var arrivalThresholdSq = arrivalThreshold.mul(arrivalThreshold);
          for (var _iterator13 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step13; !(_step13 = _iterator13()).done;) {
            var ball = _step13.value;
            if (!ball.isReturning) continue;
            if (!ball.alive) continue; // 跳过已销毁的弹珠

            var player = this._entityManager.getPlayerByPlayerId(ball.returnTargetId);
            if (!player) {
              // 玩家不存在，直接销毁弹珠（onDestroy 会自动移除碰撞体）
              ball.destroy();
              continue;
            }

            // 检查距离
            var dx = player.position.x.sub(ball.position.x);
            var dy = player.position.y.sub(ball.position.y);
            var distSq = dx.mul(dx).add(dy.mul(dy));

            // 距离足够近，完成回收
            if (distSq.lt(arrivalThresholdSq) || distSq.eqI(0)) {
              // 到达玩家，完成回收
              player.returnBall(); // 恢复弹珠库存

              // 销毁弹珠实体（回收时碰撞体已在 _recycleBall 中移除）
              ball.destroy();

              // 发送回收命令（表现层隐藏/返池）
              this._cmdQueue.push({
                type: BattleCmdType.BallRecycle,
                tick: tick,
                entityId: ball.id,
                playerId: player.playerId
              });
              battleLog.debug("[BattleLogicV2] Ball#" + ball.id + " returned to " + player.playerId + " (stock: " + player.ballStock + "/" + player.maxBallStock + ")");
            } else {
              // 更新飞行方向（追踪玩家位置）
              var dist = FixedPoint.fromFloat(Math.sqrt(distSq.toFloat()));
              // 防止除零（虽然上面已经检查了 distSq.eqI(0)，但保险起见）
              if (dist.eqI(0)) {
                ball.velocity = FPVector2.zero();
              } else {
                var returnSpeed = FixedPoint.fromInt(15);
                ball.velocity.x.set(dx.div(dist).mul(returnSpeed));
                ball.velocity.y.set(dy.div(dist).mul(returnSpeed));
              }
            }
          }
        }

        /** 检查弹珠是否越过底墙（屏幕底部），触发回收 */;
        _proto._checkBottomWallCrossing = function _checkBottomWallCrossing(tick) {
          // Y-Up: Bottom is 0
          var bottomThreshold = FixedPoint.fromInt(-10); // Allow slight tolerance

          for (var _iterator14 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step14; !(_step14 = _iterator14()).done;) {
            var ball = _step14.value;
            // 跳过返回中或已销毁的弹珠
            if (ball.isReturning || !ball.alive) continue;

            // 弹珠越过屏幕底部 (Y < Threshold)
            if (ball.position.y.lt(bottomThreshold)) {
              battleLog.debug("[BattleLogicV2] Ball#" + ball.id + " crossed bottom wall, triggering recycle");
              this._recycleBall(ball, tick);
            }
          }
        };
        _proto._onStatusDamage = function _onStatusDamage(event, tick) {
          var enemy = this._entityManager.getEnemy(event.targetId);
          if (!enemy) return;

          // 检查击杀
          if (!enemy.alive) {
            this._onEnemyKilled(enemy, tick);
          }
        }

        // ==================== 发送实体更新 ====================
        ;

        _proto._sendEntityUpdates = function _sendEntityUpdates(tick) {
          // 弹珠位置更新
          for (var _iterator15 = _createForOfIteratorHelperLoose(this._entityManager.balls), _step15; !(_step15 = _iterator15()).done;) {
            var ball = _step15.value;
            if (!ball.alive) continue;
            this._cmdQueue.push({
              type: BattleCmdType.EntityMove,
              tick: tick,
              entityId: ball.id,
              x: ball.position.x.toFloat(),
              y: ball.position.y.toFloat()
            });
          }

          // 玩家位置更新
          for (var _iterator16 = _createForOfIteratorHelperLoose(this._entityManager.players), _step16; !(_step16 = _iterator16()).done;) {
            var player = _step16.value;
            if (!player.alive) continue;
            this._cmdQueue.push({
              type: BattleCmdType.EntityMove,
              tick: tick,
              entityId: player.id,
              x: player.position.x.toFloat(),
              y: player.position.y.toFloat()
            });
          }

          // 敌人位置更新
          for (var _iterator17 = _createForOfIteratorHelperLoose(this._entityManager.enemies), _step17; !(_step17 = _iterator17()).done;) {
            var enemy = _step17.value;
            if (!enemy.alive) continue;
            this._cmdQueue.push({
              type: BattleCmdType.EntityMove,
              tick: tick,
              entityId: enemy.id,
              x: enemy.position.x.toFloat(),
              y: enemy.position.y.toFloat()
            });
          }
        }

        // ==================== 战斗结束检查 ====================
        ;

        _proto._checkBattleEnd = function _checkBattleEnd(tick) {
          // 检查所有玩家是否死亡
          var allPlayersDead = true;
          for (var _iterator18 = _createForOfIteratorHelperLoose(this._entityManager.players), _step18; !(_step18 = _iterator18()).done;) {
            var player = _step18.value;
            if (player.alive) {
              allPlayersDead = false;
              break;
            }
          }
          if (allPlayersDead && this._entityManager.playerCount > 0) {
            this.end(false);
            return;
          }

          // 检查波次是否完成且没有剩余敌人
          if (this._waveSystem.state.allWavesComplete && this._entityManager.enemyCount === 0) {
            this.end(true);
            return;
          }
        }

        // ==================== 初始化辅助 ====================
        ;

        _proto._createPlayers = function _createPlayers() {
          if (!this._initData) return;
          var count = this._initData.players.length;
          var step = this._screenWidth / (count + 1);
          for (var i = 0; i < count; i++) {
            var pData = this._initData.players[i];
            var roleConfig = this._roleConfigs.get(pData.roleId);
            if (!roleConfig) {
              battleLog.log("[BattleLogicV2] Unknown role: " + pData.roleId);
              continue;
            }
            var x = step * (i + 1);
            // 角色在底部：逻辑坐标 Y-up，所以 Y 较小（如 250），对应表现层 VisualY = 1624 - 250 = 1374（底部）
            var y = 250;
            var player = this._entityManager.createPlayer(pData.id, roleConfig, x, y);

            // 获取角色能力
            var ability = getAbilityForRole(pData.roleId);
            this._playerAbilities.set(pData.id, ability);
            battleLog.log("[BattleLogicV2] Player " + pData.id + " ability: " + ability.name);

            // 发送创建指令
            this._cmdQueue.push({
              type: BattleCmdType.EntityCreate,
              tick: 0,
              entityId: player.id,
              entityType: 'player',
              x: x,
              y: y,
              data: {
                playerId: pData.id,
                roleId: pData.roleId
              }
            });
          }
        };
        _proto._createBoundaryWalls = function _createBoundaryWalls() {
          var wallThickness = FixedPoint.fromInt(10);

          // 左墙
          var leftWall = createRectCollider(-1, ColliderType.Wall, wallThickness, FixedPoint.fromInt(this._screenHeight / 2), FPVector2.fromFloat(-10, this._screenHeight / 2), true);
          this._collisionSystem.addCollider(leftWall);

          // 右墙
          var rightWall = createRectCollider(-2, ColliderType.Wall, wallThickness, FixedPoint.fromInt(this._screenHeight / 2), FPVector2.fromFloat(this._screenWidth + 10, this._screenHeight / 2), true);
          this._collisionSystem.addCollider(rightWall);

          // 上墙 (Y-Up: Top is at ScreenHeight)
          var topWall = createRectCollider(-3, ColliderType.Wall, FixedPoint.fromInt(this._screenWidth / 2), wallThickness, FPVector2.fromFloat(this._screenWidth / 2, this._screenHeight + 10), true);
          this._collisionSystem.addCollider(topWall);

          // 下墙 (Y-Up: Bottom is at 0)
          var bottomWall = createRectCollider(-4, ColliderType.Wall, FixedPoint.fromInt(this._screenWidth / 2), wallThickness, FPVector2.fromFloat(this._screenWidth / 2, -10), true);
          this._collisionSystem.addCollider(bottomWall);
        }

        // ==================== 确定性随机 ====================
        ;

        _proto.random = function random() {
          this._randomSeed = this._randomSeed * 1103515245 + 12345 & 0x7fffffff;
          return this._randomSeed / 0x7fffffff;
        };
        _createClass(BattleLogicV2, [{
          key: "currentTick",
          get: function get() {
            return this._frameBuffer.currentTick;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "isRunning",
          get: function get() {
            return this._state === BattleStateV2.Running;
          }
        }, {
          key: "isChasing",
          get: function get() {
            return this._isChasing;
          }
        }, {
          key: "cmdQueue",
          get: function get() {
            return this._cmdQueue;
          }
        }, {
          key: "frameBuffer",
          get: function get() {
            return this._frameBuffer;
          }
        }, {
          key: "entityManager",
          get: function get() {
            return this._entityManager;
          }
        }]);
        return BattleLogicV2;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BattleLogger.ts', './BattleLogicV2.ts', './BattleView.ts', './InputCommand.ts'], function (exports) {
  var _createClass, cclegacy, battleLog, BattleLogicV2, BattleView, InputCmdType, createMoveCmd, createAimCmd, createShootCmd;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      BattleLogicV2 = module.BattleLogicV2;
    }, function (module) {
      BattleView = module.BattleView;
    }, function (module) {
      InputCmdType = module.InputCmdType;
      createMoveCmd = module.createMoveCmd;
      createAimCmd = module.createAimCmd;
      createShootCmd = module.createShootCmd;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9fc42/XnEVNc4eN+Q98bWj9", "BattleManager", undefined);

      /**
       * 战斗管理器
       */

      var BattleManager = exports('BattleManager', /*#__PURE__*/function () {
        function BattleManager(config) {
          var _this = this;
          // 逻辑层
          this._logic = void 0;
          // 表现层
          this._view = void 0;
          // 网络层引用
          this._frameSync = null;
          // 本地玩家ID
          this._localPlayerId = '';
          // 当前帧待发送的指令
          this._pendingInputs = [];
          // 回调
          this.onBattleStart = null;
          this.onBattleEnd = null;
          this._localPlayerId = config.localPlayerId;
          this._frameSync = config.frameSync || null;

          // 创建逻辑层
          this._logic = new BattleLogicV2({
            lockstep: true
          });
          this._view = new BattleView(config.viewConfig);

          // 绑定表现层到逻辑层
          this._view.bind(this._logic);

          // 注册回调
          this._logic.onBattleEnd = function (result) {
            if (_this.onBattleEnd) _this.onBattleEnd(result);
          };
          this._view.onBattleStart = function () {
            if (_this.onBattleStart) _this.onBattleStart();
          };

          // 关键桥接：帧同步网络输入 -> 逻辑层 Buffer
          if (this._frameSync) {
            // Ensure SyncManager knows who we are logically
            this._frameSync.setLocalPlayerId(this._localPlayerId);
            this._frameSync.onInputReceived = function (input) {
              _this._logic.pushInput(input.tick, input.playerId, input.commands);
            };

            // 背压控制：让生产者知道消费者的进度
            this._frameSync.getConsumerTick = function () {
              return _this._logic.currentTick;
            };
          }

          // 逻辑帧心跳回调：提交本地输入
          this._logic.onTick = function (tick) {
            return _this._onLogicFrame(tick);
          };
        }

        // ==================== Getters ====================

        /** 逻辑层 */
        var _proto = BattleManager.prototype;
        // ==================== 战斗生命周期 ====================
        /**
         * 初始化战斗
         */
        _proto.init = function init(data) {
          this._logic.init(data);
          battleLog.log('[BattleManager] Initialized');
        }

        /**
         * 开始战斗
         */;
        _proto.start = function start() {
          this._logic.start();
          this._view.start();
          battleLog.log('[BattleManager] Started');
        }

        /**
         * 暂停战斗
         */;
        _proto.pause = function pause() {
          this._logic.pause();
          battleLog.log('[BattleManager] Paused');
        }

        /**
         * 恢复战斗
         */;
        _proto.resume = function resume() {
          this._logic.resume();
          battleLog.log('[BattleManager] Resumed');
        }

        /**
         * 结束战斗
         */;
        _proto.end = function end(victory) {
          this._logic.end(victory);
          this._view.stop();
          battleLog.log('[BattleManager] Ended');
        }

        /**
         * 销毁战斗
         */;
        _proto.destroy = function destroy() {
          this._logic.destroy();
          this._view.destroy();
          if (this._frameSync) {
            this._frameSync.onInputReceived = null;
          }
          this._pendingInputs = [];
          battleLog.log('[BattleManager] Destroyed');
        }

        // ==================== 摇杆输入接口 ====================
        ;

        _proto.setMoveInput = function setMoveInput(x, y) {
          this._pendingInputs = this._pendingInputs.filter(function (cmd) {
            return cmd.type !== InputCmdType.Move;
          });
          this._pendingInputs.push(createMoveCmd(x, y));
        };
        _proto.setShootInput = function setShootInput(x, y) {
          // 先设置瞄准方向
          this._pendingInputs = this._pendingInputs.filter(function (cmd) {
            return cmd.type !== InputCmdType.Shoot && cmd.type !== InputCmdType.Aim;
          });
          this._pendingInputs.push(createAimCmd(x, y));
          this._pendingInputs.push(createShootCmd());
        }

        // ==================== 内部逻辑 ====================

        /**
         * 逻辑帧回调 - 提交本地产生的指令到网络层
         */;
        _proto._onLogicFrame = function _onLogicFrame(tick) {
          if (this._pendingInputs.length > 0) {
            if (this._frameSync) {
              // 发送给网络管理器（它会负责心跳、广播和回调通知）
              this._frameSync.sendInput([].concat(this._pendingInputs));
            } else {
              // 单机模式直接推入
              this._logic.pushInput(tick + 1, this._localPlayerId, [].concat(this._pendingInputs));
            }
            this._pendingInputs = [];
          }
        };
        _createClass(BattleManager, [{
          key: "logic",
          get: function get() {
            return this._logic;
          }

          /** 表现层 */
        }, {
          key: "view",
          get: function get() {
            return this._view;
          }

          /** 当前帧号 */
        }, {
          key: "currentTick",
          get: function get() {
            return this._logic.currentTick;
          }

          /** 战斗状态 */
        }, {
          key: "state",
          get: function get() {
            return this._logic.state;
          }

          /** 是否运行中 */
        }, {
          key: "isRunning",
          get: function get() {
            return this._logic.isRunning;
          }
        }]);
        return BattleManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BattleView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './BattleLogger.ts', './BattleCommand.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, TickerManager, battleLog, BattleCmdType;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TickerManager = module.TickerManager;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      BattleCmdType = module.BattleCmdType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0386byzpmFCN5wZMc6KEa0b", "BattleView", undefined);

      /**
       * 战斗表现层入口
       * 
       * 职责：
       * - 由渲染帧（requestAnimationFrame / update）驱动
       * - 消费逻辑层发送的指令队列
       * - 管理所有可视化实体（Cocos Node）
       * - 执行插值、动画、特效等表现逻辑
       */

      var BattleView = exports('BattleView', /*#__PURE__*/function () {
        function BattleView(config) {
          // 关联的逻辑层
          this._logic = null;
          // 配置
          this._interpolation = true;
          this._screenWidth = 750;
          this._screenHeight = 1624;
          // 实体视图管理
          this._entityViews = new Map();
          // 运行状态
          this._running = false;
          this._lastTime = 0;
          // 指令处理器
          this._cmdHandlers = new Map();
          // 回调
          this.onBattleStart = null;
          this.onBattleEnd = null;
          this.onCollision = null;
          // 实体工厂（由外部注入）
          this.entityFactory = null;
          if (config) {
            if (config.interpolation !== undefined) {
              this._interpolation = config.interpolation;
            }
            if (config.screenWidth) this._screenWidth = config.screenWidth;
            if (config.screenHeight) this._screenHeight = config.screenHeight;
          }
          this._registerCmdHandlers();
        }

        // ==================== Getters ====================

        /** 是否运行中 */
        var _proto = BattleView.prototype;
        // ==================== 生命周期 ====================
        /**
         * 绑定逻辑层
         */
        _proto.bind = function bind(logic) {
          this._logic = logic;
          battleLog.log('[BattleView] Bound to BattleLogicV2');
        }

        /**
         * 启动表现层循环
         */;
        _proto.start = function start() {
          if (this._running) return;
          this._running = true;

          // Use TickerManager
          TickerManager.addTicker(this);
          battleLog.log('[BattleView] Started');
        }

        /**
         * 停止表现层循环
         */;
        _proto.stop = function stop() {
          if (this._running) {
            TickerManager.removeTicker(this);
            this._running = false;
          }
          battleLog.log('[BattleView] Stopped');
        }

        /**
         * 销毁
         */;
        _proto.destroy = function destroy() {
          this.stop();

          // 销毁所有实体视图
          this._entityViews.forEach(function (view) {
            return view.destroy();
          });
          this._entityViews.clear();
          this._logic = null;
          battleLog.log('[BattleView] Destroyed');
        }

        // ==================== 渲染循环 ====================

        // ==================== 渲染循环 ====================

        /**
         * Ticker update
         * @param dt Delta time in seconds
         */;
        _proto.tick = function tick(dt) {
          if (!this._running) return;
          this._update(dt);
        }

        /**
         * 每帧更新（由渲染帧驱动）
         * 
         * 也可以由 Cocos 的 update 方法外部调用
         */;
        _proto.update = function update(dt) {
          this._update(dt);
        };
        _proto._update = function _update(dt) {
          // 1. 消费逻辑层指令
          this._processCommands();

          // 2. 更新所有实体视图（插值、动画等）
          this._updateEntityViews(dt);
        }

        // ==================== 指令处理 ====================

        /**
         * 消费逻辑层指令队列
         */;
        _proto._processCommands = function _processCommands() {
          if (!this._logic) return;
          var commands = this._logic.cmdQueue.flush();
          for (var _iterator = _createForOfIteratorHelperLoose(commands), _step; !(_step = _iterator()).done;) {
            var _cmd = _step.value;
            this._handleCommand(_cmd);
          }
        }

        /**
         * 处理单条指令
         */;
        _proto._handleCommand = function _handleCommand(cmd) {
          var handler = this._cmdHandlers.get(cmd.type);
          if (handler) {
            handler(cmd);
          } else {
            battleLog.log("[BattleView] Unhandled command: " + cmd.type);
          }
        }

        /**
         * 注册指令处理器
         */;
        _proto._registerCmdHandlers = function _registerCmdHandlers() {
          // 战斗生命周期
          this._cmdHandlers.set(BattleCmdType.BattleStart, this._onBattleStart.bind(this));
          this._cmdHandlers.set(BattleCmdType.BattleEnd, this._onBattleEnd.bind(this));
          this._cmdHandlers.set(BattleCmdType.BattlePause, this._onBattlePause.bind(this));
          this._cmdHandlers.set(BattleCmdType.BattleResume, this._onBattleResume.bind(this));

          // 实体
          this._cmdHandlers.set(BattleCmdType.EntityCreate, this._onEntityCreate.bind(this));
          this._cmdHandlers.set(BattleCmdType.EntityDestroy, this._onEntityDestroy.bind(this));
          this._cmdHandlers.set(BattleCmdType.EntityMove, this._onEntityMove.bind(this));
          this._cmdHandlers.set(BattleCmdType.EntityRotate, this._onEntityRotate.bind(this));

          // 战斗事件
          this._cmdHandlers.set(BattleCmdType.DamageDealt, this._onDamageDealt.bind(this));
          this._cmdHandlers.set(BattleCmdType.Collision, this._onCollision.bind(this));
          this._cmdHandlers.set(BattleCmdType.HealReceived, this._onHealReceived.bind(this));
          this._cmdHandlers.set(BattleCmdType.SkillCast, this._onSkillCast.bind(this));
          this._cmdHandlers.set(BattleCmdType.BuffApply, this._onBuffApply.bind(this));
          this._cmdHandlers.set(BattleCmdType.BuffRemove, this._onBuffRemove.bind(this));

          // 玩家
          this._cmdHandlers.set(BattleCmdType.PlayerDeath, this._onPlayerDeath.bind(this));
          this._cmdHandlers.set(BattleCmdType.PlayerRevive, this._onPlayerRevive.bind(this));

          // Boss
          this._cmdHandlers.set(BattleCmdType.BossSpawn, this._onBossSpawn.bind(this));
          this._cmdHandlers.set(BattleCmdType.BossPhaseChange, this._onBossPhaseChange.bind(this));
          this._cmdHandlers.set(BattleCmdType.BossDefeated, this._onBossDefeated.bind(this));

          // 弹珠回收
          this._cmdHandlers.set(BattleCmdType.BallRecycle, this._onBallRecycle.bind(this));
        }

        // ==================== 指令处理实现 ====================
        ;

        _proto._onBattleStart = function _onBattleStart(cmd) {
          battleLog.log('[BattleView] Battle Start');
          if (this.onBattleStart) this.onBattleStart();
        };
        _proto._onBattleEnd = function _onBattleEnd(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Battle End: " + c.result);
          if (this.onBattleEnd) this.onBattleEnd(c.result);
        };
        _proto._onBattlePause = function _onBattlePause(cmd) {
          battleLog.log('[BattleView] Battle Paused');
          // 可以暂停动画等
        };

        _proto._onBattleResume = function _onBattleResume(cmd) {
          battleLog.log('[BattleView] Battle Resumed');
        };
        _proto._onEntityCreate = function _onEntityCreate(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Entity Create: id=" + c.entityId + ", type=" + c.entityType);
          var view = null;
          if (this.entityFactory) {
            view = this.entityFactory(c);
          }
          if (view) {
            // 坐标转换：Direct Logic Y (Y-Up) -> View Y (Y-Up Container)
            view.setPosition(c.x, c.y);
            this._entityViews.set(c.entityId, view);
          }
        };
        _proto._onEntityDestroy = function _onEntityDestroy(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Entity Destroy: id=" + c.entityId);
          var view = this._entityViews.get(c.entityId);
          if (view) {
            view.destroy();
            this._entityViews["delete"](c.entityId);
          }
        };
        _proto._onEntityMove = function _onEntityMove(cmd) {
          var c = cmd;
          var view = this._entityViews.get(c.entityId);
          if (view) {
            // 坐标转换：Direct Logic Y (Y-Up)
            view.setPosition(c.x, c.y);
          }
        };
        _proto._onEntityRotate = function _onEntityRotate(cmd) {
          var c = cmd;
          var view = this._entityViews.get(c.entityId);
        };
        _proto._onDamageDealt = function _onDamageDealt(cmd) {
          var c = cmd;
          // 显示伤害数字、受击特效等
          battleLog.log("[BattleView] Damage: " + c.attackerId + " -> " + c.targetId + ", dmg=" + c.damage);

          // 通知实体视图显示受伤效果
          var view = this._entityViews.get(c.targetId);
          if (view && 'onDamage' in view) {
            view.onDamage(c.damage, c.isCrit);
          }
        };
        _proto._onCollision = function _onCollision(cmd) {
          var c = cmd;
          // 碰撞特效（可选）
          if (this.onCollision) {
            this.onCollision(c.entityA, c.entityB, c.pointX, c.pointY);
          }
        };
        _proto._onHealReceived = function _onHealReceived(cmd) {
          var c = cmd;
          // 显示治疗数字、治疗特效
          battleLog.log("[BattleView] Heal: target=" + c.targetId + ", heal=" + c.heal);
        };
        _proto._onSkillCast = function _onSkillCast(cmd) {
          var c = cmd;
          // 播放技能特效
          battleLog.log("[BattleView] Skill Cast: " + c.casterId + " casts " + c.skillId);
        };
        _proto._onBuffApply = function _onBuffApply(cmd) {
          var c = cmd;
          // 显示 Buff 图标
          battleLog.log("[BattleView] Buff Apply: " + c.buffId + " on " + c.targetId);
        };
        _proto._onBuffRemove = function _onBuffRemove(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Buff Remove: " + c.buffId + " from " + c.targetId);
        };
        _proto._onPlayerDeath = function _onPlayerDeath(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Player Death: " + c.playerId);
          // 播放死亡动画
        };

        _proto._onPlayerRevive = function _onPlayerRevive(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Player Revive: " + c.playerId);
          // 播放复活特效
        };

        _proto._onBossSpawn = function _onBossSpawn(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Boss Spawn: " + c.bossId);
          // 播放 Boss 登场动画
        };

        _proto._onBossPhaseChange = function _onBossPhaseChange(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Boss Phase Change: phase=" + c.phase);
          // 播放阶段转换特效
        };

        _proto._onBossDefeated = function _onBossDefeated(cmd) {
          var c = cmd;
          battleLog.log("[BattleView] Boss Defeated: " + c.bossId);
          // 播放 Boss 击败动画
        };

        _proto._onBallRecycle = function _onBallRecycle(cmd) {
          var c = cmd;
          var entityId = c.entityId;

          // 获取实体视图
          var view = this._entityViews.get(entityId);
          if (!view) return;

          // 隐藏并返还池（destroy 会调用 pool.returnLoader）
          view.destroy();
          this._entityViews["delete"](entityId);
          battleLog.log("[BattleView] Ball#" + entityId + " recycled to pool");
        }

        // ==================== 实体视图管理 ====================

        /**
         * 更新所有实体视图
         */;
        _proto._updateEntityViews = function _updateEntityViews(dt) {
          this._entityViews.forEach(function (view) {
            view.update(dt);
          });
        }

        /**
         * 获取实体视图
         */;
        _proto.getEntityView = function getEntityView(entityId) {
          return this._entityViews.get(entityId);
        }

        /**
         * 遍历所有实体视图
         */;
        _proto.forEachEntity = function forEachEntity(callback) {
          this._entityViews.forEach(callback);
        };
        _createClass(BattleView, [{
          key: "running",
          get: function get() {
            return this._running;
          }

          /** 实体视图数量 */
        }, {
          key: "entityCount",
          get: function get() {
            return this._entityViews.size;
          }
        }]);
        return BattleView;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BulletEntity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './FPVector2.ts', './Entity.ts', './EntityType.ts'], function (exports) {
  var _inheritsLoose, cclegacy, FixedPoint, FPVector2, Entity, EntityType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      Entity = module.Entity;
    }, function (module) {
      EntityType = module.EntityType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "98f94+bPwFDHZU4PqaybBJ8", "BulletEntity", undefined);
      var BulletEntity = exports('BulletEntity', /*#__PURE__*/function (_Entity) {
        _inheritsLoose(BulletEntity, _Entity);
        function BulletEntity(id, shooterId, x, y, damage, lifetime // 默认10秒
        ) {
          var _this;
          if (lifetime === void 0) {
            lifetime = 600;
          }
          _this = _Entity.call(this, id, x, y) || this;
          _this.type = EntityType.Bullet;
          /** 发射者ID */
          _this.shooterId = void 0;
          /** 伤害 */
          _this.damage = void 0;
          /** 生存时间（帧） */
          _this.lifetime = void 0;
          /** 已存在时间 */
          _this.age = 0;
          /** 是否穿透玩家 */
          _this.piercing = false;
          _this.shooterId = shooterId;
          _this.damage = damage;
          _this.lifetime = lifetime;
          return _this;
        }
        var _proto = BulletEntity.prototype;
        _proto.update = function update(tick) {
          // 位置更新
          this.position.add_(this.velocity);

          // 生存时间
          this.age++;
          if (this.age >= this.lifetime) {
            this.destroy();
          }
        }

        /** 设置速度（根据方向和速度大小） */;
        _proto.setVelocity = function setVelocity(direction, speed) {
          this.velocity = direction.normalize().mul(speed);
        }

        /** 设置速度（根据角度和速度大小） */;
        _proto.setVelocityFromAngle = function setVelocityFromAngle(angleRad, speed) {
          var cos = FixedPoint.fromFloat(Math.cos(angleRad.toFloat()));
          var sin = FixedPoint.fromFloat(Math.sin(angleRad.toFloat()));
          this.velocity = new FPVector2(cos.mul(speed), sin.mul(speed));
        };
        return BulletEntity;
      }(Entity));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterAbilities.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ICharacterAbility.ts', './DefaultModifier.ts', './PierceModifiers.ts', './RecycleModifiers.ts', './LaunchSystem.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BaseCharacterAbility, createDefaultModifier, PierceEnemyModifier, GhostModifier, TopWallReturnModifier, BottomBounceModifier, LaunchPattern;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BaseCharacterAbility = module.BaseCharacterAbility;
    }, function (module) {
      createDefaultModifier = module.createDefaultModifier;
    }, function (module) {
      PierceEnemyModifier = module.PierceEnemyModifier;
      GhostModifier = module.GhostModifier;
    }, function (module) {
      TopWallReturnModifier = module.TopWallReturnModifier;
      BottomBounceModifier = module.BottomBounceModifier;
    }, function (module) {
      LaunchPattern = module.LaunchPattern;
    }],
    execute: function () {
      exports({
        getAbilityForRole: getAbilityForRole,
        registerAbility: registerAbility
      });
      cclegacy._RF.push({}, "3a2b4/bTNJOLq/1A40n+wM9", "CharacterAbilities", undefined);
      // ==================== 基础角色 ====================
      /**
       * 战士能力（默认）
       * 出血球 + 标准行为
       */
      var WarriorAbility = exports('WarriorAbility', /*#__PURE__*/function (_BaseCharacterAbility) {
        _inheritsLoose(WarriorAbility, _BaseCharacterAbility);
        function WarriorAbility() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseCharacterAbility.call.apply(_BaseCharacterAbility, [this].concat(args)) || this;
          _this.name = 'Warrior';
          _this.roleId = 'R01';
          return _this;
        }
        var _proto = WarriorAbility.prototype;
        _proto.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier()];
        };
        return WarriorAbility;
      }(BaseCharacterAbility));

      // ==================== 穿透类角色 ====================

      /**
       * 嵌入者能力
       * 弹珠永久穿透敌人
       */
      var EmbeddedAbility = exports('EmbeddedAbility', /*#__PURE__*/function (_BaseCharacterAbility2) {
        _inheritsLoose(EmbeddedAbility, _BaseCharacterAbility2);
        function EmbeddedAbility() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _BaseCharacterAbility2.call.apply(_BaseCharacterAbility2, [this].concat(args)) || this;
          _this2.name = 'Embedded';
          _this2.roleId = 'R06';
          return _this2;
        }
        var _proto2 = EmbeddedAbility.prototype;
        _proto2.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier(), new PierceEnemyModifier()];
        };
        return EmbeddedAbility;
      }(BaseCharacterAbility));

      /**
       * 空巢者能力
       * 每次发射多个相同特殊球
       */
      var EmptyNesterAbility = exports('EmptyNesterAbility', /*#__PURE__*/function (_BaseCharacterAbility3) {
        _inheritsLoose(EmptyNesterAbility, _BaseCharacterAbility3);
        function EmptyNesterAbility() {
          var _this3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this3 = _BaseCharacterAbility3.call.apply(_BaseCharacterAbility3, [this].concat(args)) || this;
          _this3.name = 'EmptyNester';
          _this3.roleId = 'R11';
          return _this3;
        }
        var _proto3 = EmptyNesterAbility.prototype;
        _proto3.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier(), new GhostModifier()];
        };
        return EmptyNesterAbility;
      }(BaseCharacterAbility));

      // ==================== 回收类角色 ====================

      /**
       * 悔罪者能力
       * 弹珠碰顶墙返回，途中穿透敌人
       * 伤害随反弹次数增加
       */
      var RepentantAbility = exports('RepentantAbility', /*#__PURE__*/function (_BaseCharacterAbility4) {
        _inheritsLoose(RepentantAbility, _BaseCharacterAbility4);
        function RepentantAbility() {
          var _this4;
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          _this4 = _BaseCharacterAbility4.call.apply(_BaseCharacterAbility4, [this].concat(args)) || this;
          _this4.name = 'Repentant';
          _this4.roleId = 'R03';
          return _this4;
        }
        var _proto4 = RepentantAbility.prototype;
        _proto4.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier(), new TopWallReturnModifier()];
        };
        return RepentantAbility;
      }(BaseCharacterAbility));

      /**
       * 苦修者能力
       * 弹珠碰底墙反弹而非回收
       */
      var FlagellantAbility = exports('FlagellantAbility', /*#__PURE__*/function (_BaseCharacterAbility5) {
        _inheritsLoose(FlagellantAbility, _BaseCharacterAbility5);
        function FlagellantAbility() {
          var _this5;
          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }
          _this5 = _BaseCharacterAbility5.call.apply(_BaseCharacterAbility5, [this].concat(args)) || this;
          _this5.name = 'Flagellant';
          _this5.roleId = 'R12';
          return _this5;
        }
        var _proto5 = FlagellantAbility.prototype;
        // 假设ID
        _proto5.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier(), new BottomBounceModifier()];
        };
        return FlagellantAbility;
      }(BaseCharacterAbility));

      // ==================== 发射类角色 ====================

      /**
       * 同居者能力
       * 镜像发射，伤害减半
       */
      var CohabitantsAbility = exports('CohabitantsAbility', /*#__PURE__*/function (_BaseCharacterAbility6) {
        _inheritsLoose(CohabitantsAbility, _BaseCharacterAbility6);
        function CohabitantsAbility() {
          var _this6;
          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }
          _this6 = _BaseCharacterAbility6.call.apply(_BaseCharacterAbility6, [this].concat(args)) || this;
          _this6.name = 'Cohabitants';
          _this6.roleId = 'R04';
          return _this6;
        }
        var _proto6 = CohabitantsAbility.prototype;
        _proto6.getLaunchConfig = function getLaunchConfig() {
          return {
            pattern: LaunchPattern.MIRROR
          };
        };
        _proto6.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier()];
        };
        return CohabitantsAbility;
      }(BaseCharacterAbility));

      /**
       * 挥霍者能力
       * 扇形同时发射所有球
       */
      var SpendthriftAbility = exports('SpendthriftAbility', /*#__PURE__*/function (_BaseCharacterAbility7) {
        _inheritsLoose(SpendthriftAbility, _BaseCharacterAbility7);
        function SpendthriftAbility() {
          var _this7;
          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }
          _this7 = _BaseCharacterAbility7.call.apply(_BaseCharacterAbility7, [this].concat(args)) || this;
          _this7.name = 'Spendthrift';
          _this7.roleId = 'R09';
          return _this7;
        }
        var _proto7 = SpendthriftAbility.prototype;
        // 假设ID
        _proto7.getLaunchConfig = function getLaunchConfig() {
          return {
            pattern: LaunchPattern.ALL_AT_ONCE
          };
        };
        _proto7.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier()];
        };
        return SpendthriftAbility;
      }(BaseCharacterAbility));

      /**
       * 板机指能力
       * 射速翻倍，散射瞄准
       */
      var ItchyFingerAbility = exports('ItchyFingerAbility', /*#__PURE__*/function (_BaseCharacterAbility8) {
        _inheritsLoose(ItchyFingerAbility, _BaseCharacterAbility8);
        function ItchyFingerAbility() {
          var _this8;
          for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }
          _this8 = _BaseCharacterAbility8.call.apply(_BaseCharacterAbility8, [this].concat(args)) || this;
          _this8.name = 'ItchyFinger';
          _this8.roleId = 'R02';
          return _this8;
        }
        var _proto8 = ItchyFingerAbility.prototype;
        _proto8.getLaunchConfig = function getLaunchConfig() {
          return {
            interval: 5,
            // 射速翻倍
            pattern: LaunchPattern.SCATTER,
            spreadAngle: Math.PI / 8,
            spreadCount: 2
          };
        };
        _proto8.onBallLaunched = function onBallLaunched(ball) {
          return [createDefaultModifier()];
        };
        return ItchyFingerAbility;
      }(BaseCharacterAbility));

      // ==================== 能力注册表 ====================

      var ABILITY_REGISTRY = new Map();
      ABILITY_REGISTRY.set('R01', function () {
        return new WarriorAbility();
      });
      ABILITY_REGISTRY.set('R02', function () {
        return new ItchyFingerAbility();
      });
      ABILITY_REGISTRY.set('R03', function () {
        return new RepentantAbility();
      });
      ABILITY_REGISTRY.set('R04', function () {
        return new CohabitantsAbility();
      });
      ABILITY_REGISTRY.set('R06', function () {
        return new EmbeddedAbility();
      });
      ABILITY_REGISTRY.set('R11', function () {
        return new EmptyNesterAbility();
      });

      /**
       * 根据角色ID获取能力实例
       */
      function getAbilityForRole(roleId) {
        var factory = ABILITY_REGISTRY.get(roleId);
        if (factory) {
          return factory();
        }
        // 默认返回战士能力
        return new WarriorAbility();
      }

      /**
       * 注册自定义能力
       */
      function registerAbility(roleId, factory) {
        ABILITY_REGISTRY.set(roleId, factory);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Collider.ts", ['cc', './FPVector2.ts', './PhysicsConfig.ts'], function (exports) {
  var cclegacy, FPVector2, DEFAULT_RESTITUTION, CollisionLayer, ColliderType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      DEFAULT_RESTITUTION = module.DEFAULT_RESTITUTION;
      CollisionLayer = module.CollisionLayer;
      ColliderType = module.ColliderType;
    }],
    execute: function () {
      exports({
        createCircleCollider: createCircleCollider,
        createRectCollider: createRectCollider,
        resetColliderIdGenerator: resetColliderIdGenerator
      });
      cclegacy._RF.push({}, "967beqxHrRAOZTggRR98fL+", "Collider", undefined);

      // ==================== 碰撞形状 ====================

      /** 圆形碰撞体形状 */
      /** 矩形碰撞体形状（AABB） */
      /** 碰撞形状联合类型 */
      // ==================== 碰撞体 ====================
      /** 碰撞体 */
      // ==================== 工厂方法 ====================

      var _nextColliderId = 1;

      /** 创建圆形碰撞体 */
      function createCircleCollider(entityId, colliderType, radius, position, isStatic) {
        if (isStatic === void 0) {
          isStatic = false;
        }
        return {
          id: _nextColliderId++,
          entityId: entityId,
          colliderType: colliderType,
          layer: typeToLayer(colliderType),
          shape: {
            type: 'circle',
            radius: radius
          },
          position: position.clone(),
          previousPosition: position.clone(),
          velocity: FPVector2.zero(),
          restitution: DEFAULT_RESTITUTION,
          isStatic: isStatic,
          enabled: true
        };
      }

      /** 创建矩形碰撞体 */
      function createRectCollider(entityId, colliderType, halfWidth, halfHeight, position, isStatic) {
        if (isStatic === void 0) {
          isStatic = true;
        }
        return {
          id: _nextColliderId++,
          entityId: entityId,
          colliderType: colliderType,
          layer: typeToLayer(colliderType),
          shape: {
            type: 'rect',
            halfWidth: halfWidth,
            halfHeight: halfHeight
          },
          position: position.clone(),
          previousPosition: position.clone(),
          velocity: FPVector2.zero(),
          restitution: DEFAULT_RESTITUTION,
          isStatic: isStatic,
          enabled: true
        };
      }

      /** 重置碰撞体ID生成器 */
      function resetColliderIdGenerator() {
        _nextColliderId = 1;
      }

      // ==================== 辅助函数 ====================

      function typeToLayer(type) {
        switch (type) {
          case ColliderType.Ball:
            return CollisionLayer.Ball;
          case ColliderType.Wall:
            return CollisionLayer.Wall;
          case ColliderType.Bumper:
            return CollisionLayer.Bumper;
          case ColliderType.Flipper:
            return CollisionLayer.Flipper;
          case ColliderType.Target:
            return CollisionLayer.Target;
          default:
            return CollisionLayer.None;
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollisionDetection.ts", ['cc', './FixedPoint.ts', './FPVector2.ts', './FPMath.ts'], function (exports) {
  var cclegacy, FixedPoint, FPVector2, FPMath;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      FPMath = module.FPMath;
    }],
    execute: function () {
      exports({
        detectCollision: detectCollision,
        sweepCircleVsCircle: sweepCircleVsCircle
      });
      cclegacy._RF.push({}, "9a107YDzVFNXrmq78GbOVBS", "CollisionDetection", undefined);

      // ==================== 碰撞结果 ====================
      /** 碰撞事件 */
      // ==================== 碰撞检测函数 ====================
      /**
       * 检测两个碰撞体是否碰撞
       * @returns 碰撞事件，如果没有碰撞返回 null
       */
      function detectCollision(a, b) {
        var shapeA = a.shape;
        var shapeB = b.shape;
        if (shapeA.type === 'circle' && shapeB.type === 'circle') {
          return circleVsCircle(a, b);
        } else if (shapeA.type === 'circle' && shapeB.type === 'rect') {
          return circleVsRect(a, b);
        } else if (shapeA.type === 'rect' && shapeB.type === 'circle') {
          var result = circleVsRect(b, a);
          if (result) {
            // 交换 A/B，反转法线
            return {
              colliderA: a,
              colliderB: b,
              normal: result.normal.neg(),
              depth: result.depth,
              point: result.point
            };
          }
          return null;
        } else {
          // rect vs rect（可以后续实现）
          return rectVsRect(a, b);
        }
      }

      /**
       * 圆形 vs 圆形碰撞检测
       */
      function circleVsCircle(a, b) {
        var shapeA = a.shape;
        var shapeB = b.shape;
        var delta = b.position.sub(a.position);
        var distSq = delta.lengthSq();
        var radiusSum = shapeA.radius.add(shapeB.radius);
        var radiusSumSq = radiusSum.mul(radiusSum);
        if (distSq.gt(radiusSumSq)) {
          return null; // 没有碰撞
        }

        var dist = FPMath.sqrt(distSq);
        var depth = radiusSum.sub(dist);

        // 计算法线（从 A 指向 B）
        var normal;
        if (dist.eqI(0)) {
          // 完全重叠，使用默认方向
          normal = FPVector2.up();
        } else {
          normal = delta.div(dist);
        }

        // 碰撞点：A 表面上最接近 B 的点
        var point = a.position.add(normal.mul(shapeA.radius));
        return {
          colliderA: a,
          colliderB: b,
          normal: normal,
          depth: depth,
          point: point
        };
      }

      /**
       * 圆形 vs 矩形碰撞检测（AABB）
       */
      function circleVsRect(circle, rect) {
        var circleShape = circle.shape;
        var rectShape = rect.shape;
        var circlePos = circle.position;
        var rectPos = rect.position;

        // 找到矩形上离圆心最近的点
        var halfW = rectShape.halfWidth;
        var halfH = rectShape.halfHeight;

        // 将圆心转换到矩形局部坐标
        var localX = circlePos.x.sub(rectPos.x);
        var localY = circlePos.y.sub(rectPos.y);

        // Clamp 到矩形边界
        var closestX = FPMath.clamp(localX, halfW.neg(), halfW);
        var closestY = FPMath.clamp(localY, halfH.neg(), halfH);

        // 计算距离
        var dx = closestX.sub(localX);
        var dy = closestY.sub(localY);
        var distSq = dx.mul(dx).add(dy.mul(dy));
        var radius = circleShape.radius;
        var radiusSq = radius.mul(radius);
        if (distSq.gt(radiusSq)) {
          return null; // 没有碰撞
        }

        var dist = FPMath.sqrt(distSq);
        var depth = radius.sub(dist);

        // 计算法线
        var normal;
        if (dist.eqI(0)) {
          // 圆心在矩形内部，需要特殊处理
          // 找出最近的边
          var distToLeft = localX.add(halfW);
          var distToRight = halfW.sub(localX);
          var distToBottom = localY.add(halfH);
          var distToTop = halfH.sub(localY);
          var minDist = FPMath.min(FPMath.min(distToLeft, distToRight), FPMath.min(distToBottom, distToTop));
          if (minDist.eq(distToLeft)) {
            normal = FPVector2.right();
          } else if (minDist.eq(distToRight)) {
            normal = FPVector2.left();
          } else if (minDist.eq(distToBottom)) {
            normal = FPVector2.up();
          } else {
            normal = FPVector2.down();
          }
        } else {
          normal = new FPVector2(dx, dy).div(dist);
        }

        // 碰撞点：矩形上最近的点
        var point = new FPVector2(rectPos.x.add(closestX), rectPos.y.add(closestY));
        return {
          colliderA: circle,
          colliderB: rect,
          normal: normal,
          depth: depth,
          point: point
        };
      }

      /**
       * 矩形 vs 矩形碰撞检测（AABB）
       */
      function rectVsRect(a, b) {
        var shapeA = a.shape;
        var shapeB = b.shape;
        var delta = b.position.sub(a.position);
        var overlapX = shapeA.halfWidth.add(shapeB.halfWidth).sub(FPMath.abs(delta.x));
        if (overlapX.lteI(0)) return null;
        var overlapY = shapeA.halfHeight.add(shapeB.halfHeight).sub(FPMath.abs(delta.y));
        if (overlapY.lteI(0)) return null;

        // 使用最小重叠轴
        var normal;
        var depth;
        if (overlapX.lt(overlapY)) {
          depth = overlapX;
          normal = delta.x.ltI(0) ? FPVector2.left() : FPVector2.right();
        } else {
          depth = overlapY;
          normal = delta.y.ltI(0) ? FPVector2.down() : FPVector2.up();
        }

        // 碰撞点（简化：使用中点）
        var point = a.position.add(b.position).divI(2);
        return {
          colliderA: a,
          colliderB: b,
          normal: normal,
          depth: depth,
          point: point
        };
      }

      // ==================== CCD（连续碰撞检测） ====================

      /**
       * 圆形 vs 圆形的 CCD
       * @returns 碰撞时间 (0-1)，如果无碰撞返回 null
       */
      function sweepCircleVsCircle(posA, velA, radiusA, posB, velB, radiusB) {
        // 相对运动
        var relVel = velA.sub(velB);
        var relPos = posA.sub(posB);
        var radiusSum = radiusA.add(radiusB);

        // 二次方程：|relPos + t*relVel|^2 = radiusSum^2
        // 展开：(relVel·relVel)t^2 + 2(relPos·relVel)t + (relPos·relPos - radiusSum^2) = 0
        var a = relVel.dot(relVel);
        var b = relPos.dot(relVel).mulI(2);
        var c = relPos.dot(relPos).sub(radiusSum.mul(radiusSum));

        // 如果 a = 0，相对静止
        if (a.eqI(0)) {
          return c.lteI(0) ? FixedPoint.zero() : null;
        }

        // 判别式：b^2 - 4ac
        var discriminant = b.mul(b).sub(a.mul(c).mulI(4));
        if (discriminant.ltI(0)) {
          return null; // 无解
        }

        var sqrtD = FPMath.sqrt(discriminant);
        var twoA = a.mulI(2);

        // t = (-b - sqrt(D)) / (2a)
        var t1 = b.neg().sub(sqrtD).div(twoA);
        // t2 = (-b + sqrt(D)) / (2a)
        var t2 = b.neg().add(sqrtD).div(twoA);

        // 取最小的正值
        if (t1.gteI(0) && t1.lteI(1)) {
          return t1;
        }
        if (t2.gteI(0) && t2.lteI(1)) {
          return t2;
        }
        return null;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollisionHandler.ts", ['cc', './FixedPoint.ts', './IBallModifier.ts', './BattleLogger.ts', './PhysicsConfig.ts', './PhysicsConstants.ts'], function (exports) {
  var cclegacy, FixedPoint, WallSide, battleLog, DEFAULT_BALL_RADIUS, WALL_IDS, DEFAULT_ENEMY_HITBOX, BOUNCE_SEPARATION;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      WallSide = module.WallSide;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      DEFAULT_BALL_RADIUS = module.DEFAULT_BALL_RADIUS;
    }, function (module) {
      WALL_IDS = module.WALL_IDS;
      DEFAULT_ENEMY_HITBOX = module.DEFAULT_ENEMY_HITBOX;
      BOUNCE_SEPARATION = module.BOUNCE_SEPARATION;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d7709b2yHhO3JreT/3KgIBj", "CollisionHandler", undefined);

      /** 碰撞处理结果 */

      /** 碰撞业务处理器 */
      var CollisionHandler = exports('CollisionHandler', /*#__PURE__*/function () {
        function CollisionHandler(entityManager, damageSystem, collisionSystem) {
          this._entityManager = void 0;
          this._damageSystem = void 0;
          this._collisionSystem = void 0;
          this._entityManager = entityManager;
          this._damageSystem = damageSystem;
          this._collisionSystem = collisionSystem;
        }

        /**
         * 处理弹珠命中敌人
         * @returns 碰撞处理结果
         */
        var _proto = CollisionHandler.prototype;
        _proto.handleBallHitEnemy = function handleBallHitEnemy(ballId, enemyId, tick) {
          var ball = this._entityManager.getBall(ballId);
          var enemy = this._entityManager.getEnemy(enemyId);
          var result = {
            damaged: false,
            killed: false,
            bounced: false,
            recycled: false,
            destroyed: false
          };
          if (!ball || !enemy) return result;

          // 返回中的弹珠不触发敌人碰撞
          if (ball.isReturning) return result;

          // 检查是否已经在处理这次重叠
          if (ball.isHittingEnemy(enemyId)) return result;

          // 标记开始与此敌人重叠
          ball.startHittingEnemy(enemyId);

          // 执行修饰器钩子：是否穿透敌人
          var shouldPierce = ball.runOnHitEnemy(enemy);

          // 计算伤害
          var damageEvent = this._damageSystem.ballHitEnemy(ball, enemy);
          result.damaged = true;
          result.damageEvent = damageEvent;
          result.killed = damageEvent.killed;
          battleLog.debug("[CollisionHandler] Ball#" + ballId + " vs Enemy#" + enemyId + ": shouldPierce=" + shouldPierce);

          // 如果不穿透，执行反弹
          if (!shouldPierce) {
            this._bounceOffRect(ball, enemy.position);
            result.bounced = true;
          }

          // 检查击杀
          if (damageEvent.killed) {
            ball.stopHittingEnemy(enemyId);
          }
          return result;
        }

        /**
         * 弹珠从矩形碰撞体反弹
         */;
        _proto._bounceOffRect = function _bounceOffRect(ball, rectCenter) {
          var halfW = DEFAULT_ENEMY_HITBOX.halfWidth;
          var halfH = DEFAULT_ENEMY_HITBOX.halfHeight;
          var ballRadius = DEFAULT_BALL_RADIUS.toFloat();

          // 计算球相对于敌人中心的位置
          var relX = ball.position.x.toFloat() - rectCenter.x.toFloat();
          var relY = ball.position.y.toFloat() - rectCenter.y.toFloat();

          // 找到矩形上离球最近的点
          var closestX = Math.max(-halfW, Math.min(halfW, relX));
          var closestY = Math.max(-halfH, Math.min(halfH, relY));

          // 计算球心到最近点的距离
          var distX = relX - closestX;
          var distY = relY - closestY;
          var distSq = distX * distX + distY * distY;

          // 分离处理
          if (distSq < ballRadius * ballRadius) {
            var dist = Math.sqrt(distSq);
            var pushX = 0,
              pushY = 0;
            if (dist > 0.1) {
              var pushDist = ballRadius - dist + BOUNCE_SEPARATION;
              pushX = distX / dist * pushDist;
              pushY = distY / dist * pushDist;
            } else {
              var overlapX = halfW + ballRadius - Math.abs(relX);
              var overlapY = halfH + ballRadius - Math.abs(relY);
              if (overlapX < overlapY) {
                pushX = (relX >= 0 ? 1 : -1) * (overlapX + BOUNCE_SEPARATION);
              } else {
                pushY = (relY >= 0 ? 1 : -1) * (overlapY + BOUNCE_SEPARATION);
              }
            }

            // 推开球
            ball.position.x.add_(FixedPoint.fromFloat(pushX));
            ball.position.y.add_(FixedPoint.fromFloat(pushY));

            // 同步位置到 collider
            var _collider = this._collisionSystem.getColliderByEntityId(ball.id);
            if (_collider) {
              _collider.position.set(ball.position);
            }
          }

          // 根据碰撞面反弹速度
          var velX = ball.velocity.x.toFloat();
          var velY = ball.velocity.y.toFloat();
          if (Math.abs(relX) > Math.abs(relY) * (halfW / halfH)) {
            // 球在矩形左右两侧
            if (relX > 0 && velX < 0 || relX < 0 && velX > 0) {
              ball.velocity.x.neg_();
            }
          } else {
            // 球在矩形上下两侧
            if (relY > 0 && velY < 0 || relY < 0 && velY > 0) {
              ball.velocity.y.neg_();
            }
          }
          ball.addBounce();

          // 同步速度到 collider
          var collider = this._collisionSystem.getColliderByEntityId(ball.id);
          if (collider) {
            collider.velocity.set(ball.velocity);
          }

          // 清除命中记录
          ball.clearHitTracking();
        }

        /**
         * 处理弹珠命中墙壁
         * @returns 碰撞处理结果
         */;
        _proto.handleBallHitWall = function handleBallHitWall(ballId, wallId) {
          var ball = this._entityManager.getBall(ballId);
          var result = {
            damaged: false,
            killed: false,
            bounced: false,
            recycled: false,
            destroyed: false
          };
          if (!ball) return result;

          // 根据墙壁ID判断方向
          var wallSide;
          switch (wallId) {
            case WALL_IDS.LEFT:
              wallSide = WallSide.LEFT;
              break;
            case WALL_IDS.RIGHT:
              wallSide = WallSide.RIGHT;
              break;
            case WALL_IDS.TOP:
              wallSide = WallSide.TOP;
              break;
            case WALL_IDS.BOTTOM:
              wallSide = WallSide.BOTTOM;
              break;
            default:
              return result;
          }

          // 左/右/上墙由 BallEntity.update() 边界约束处理
          if (wallSide !== WallSide.BOTTOM) {
            return result;
          }

          // 执行修饰器钩子
          var action = ball.runOnHitWall(wallSide);
          if (action.recycle) {
            result.recycled = true;
            return result;
          }
          if (action.destroy) {
            ball.destroy();
            result.destroyed = true;
            return result;
          }

          // 底墙反弹
          ball.velocity.y.neg_();
          ball.addBounce();
          ball.runOnBounce(wallSide);
          result.bounced = true;
          return result;
        };
        return CollisionHandler;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollisionResolver.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './FPVector2.ts', './FPMath.ts', './PhysicsConfig.ts'], function (exports) {
  var _extends, cclegacy, FixedPoint, FPVector2, FPMath, ColliderType, BUMPER_FORCE_MULTIPLIER;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      FPMath = module.FPMath;
    }, function (module) {
      ColliderType = module.ColliderType;
      BUMPER_FORCE_MULTIPLIER = module.BUMPER_FORCE_MULTIPLIER;
    }],
    execute: function () {
      exports({
        applyBounce: applyBounce,
        applyBumperForce: applyBumperForce,
        resolveCollision: resolveCollision,
        separateColliders: separateColliders
      });
      cclegacy._RF.push({}, "73d95L/xChKI6WUzjQrf++d", "CollisionResolver", undefined);

      // ==================== 碰撞响应 ====================

      /**
       * 分离两个重叠的碰撞体
       * 静态物体不移动，动态物体移动
       */
      function separateColliders(event) {
        var colliderA = event.colliderA,
          colliderB = event.colliderB,
          normal = event.normal,
          depth = event.depth;
        if (colliderA.isStatic && colliderB.isStatic) {
          return; // 两个静态物体不处理
        }

        if (colliderA.isStatic) {
          // 只移动 B
          colliderB.position.add_(normal.mul(depth));
        } else if (colliderB.isStatic) {
          // 只移动 A
          colliderA.position.sub_(normal.mul(depth));
        } else {
          // 两个都是动态，各移动一半
          var halfDepth = depth.divI(2);
          colliderA.position.sub_(normal.mul(halfDepth));
          colliderB.position.add_(normal.mul(halfDepth));
        }
      }

      /**
       * 计算并应用反弹速度
       * 基于碰撞法线和弹性系数
       */
      function applyBounce(event) {
        var colliderA = event.colliderA,
          colliderB = event.colliderB,
          normal = event.normal;

        // 静态物体速度为零
        var velA = colliderA.isStatic ? FPVector2.zero() : colliderA.velocity;
        var velB = colliderB.isStatic ? FPVector2.zero() : colliderB.velocity;

        // 相对速度
        var relVel = velA.sub(velB);

        // 沿法线方向的相对速度分量
        var velAlongNormal = relVel.dot(normal);

        // 如果物体正在远离，不处理
        if (velAlongNormal.ltI(0)) {
          return;
        }

        // 使用较小的弹性系数
        var restitution = FPMath.min(colliderA.restitution, colliderB.restitution);

        // 冲量大小 j = -(1 + e) * Vn / (1/mA + 1/mB)
        // 简化：假设质量相等，且静态物体质量无穷大
        var j;
        if (colliderA.isStatic || colliderB.isStatic) {
          // 一个静态：j = -(1 + e) * Vn
          j = velAlongNormal.neg().mul(FixedPoint.one().add(restitution));
        } else {
          // 两个动态：j = -(1 + e) * Vn / 2
          j = velAlongNormal.neg().mul(FixedPoint.one().add(restitution)).divI(2);
        }

        // 应用冲量
        var impulse = normal.mul(j);
        if (!colliderA.isStatic) {
          colliderA.velocity.add_(impulse);
        }
        if (!colliderB.isStatic) {
          colliderB.velocity.sub_(impulse);
        }
      }

      /**
       * 应用 Bumper 推力
       * Bumper 会给弹珠一个额外的向外推力
       */
      function applyBumperForce(ball, bumper, event) {
        if (bumper.colliderType !== ColliderType.Bumper) return;
        var normal = event.normal;

        // 获取当前速度大小
        var speed = ball.velocity.length();

        // 新速度方向沿法线（反弹），大小乘以推力倍数
        var newSpeed = speed.mul(BUMPER_FORCE_MULTIPLIER);

        // 设置新速度
        ball.velocity.set(normal.neg().mul(newSpeed));
      }

      /**
       * 综合处理碰撞响应
       */
      function resolveCollision(event) {
        // 1. 分离重叠
        separateColliders(event);

        // 2. 计算反弹
        applyBounce(event);

        // 3. 特殊处理：Bumper
        var colliderA = event.colliderA,
          colliderB = event.colliderB;
        if (colliderB.colliderType === ColliderType.Bumper) {
          applyBumperForce(colliderA, colliderB, event);
        } else if (colliderA.colliderType === ColliderType.Bumper) {
          // 交换视角
          var reversedEvent = _extends({}, event, {
            colliderA: colliderB,
            colliderB: colliderA,
            normal: event.normal.neg()
          });
          applyBumperForce(colliderB, colliderA, reversedEvent);
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollisionSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './SpatialGrid.ts', './CollisionDetection.ts', './CollisionResolver.ts', './PhysicsConfig.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, FixedPoint, SpatialGrid, sweepCircleVsCircle, detectCollision, resolveCollision, ColliderType, COLLISION_MATRIX, CCD_VELOCITY_THRESHOLD;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      SpatialGrid = module.SpatialGrid;
    }, function (module) {
      sweepCircleVsCircle = module.sweepCircleVsCircle;
      detectCollision = module.detectCollision;
    }, function (module) {
      resolveCollision = module.resolveCollision;
    }, function (module) {
      ColliderType = module.ColliderType;
      COLLISION_MATRIX = module.COLLISION_MATRIX;
      CCD_VELOCITY_THRESHOLD = module.CCD_VELOCITY_THRESHOLD;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5e0f7Tqt+tEz7JoJSN0iPaG", "CollisionSystem", undefined);
      var CollisionSystem = exports('CollisionSystem', /*#__PURE__*/function () {
        function CollisionSystem() {
          this._grid = void 0;
          this._colliders = new Map();
          this._events = [];
          this._grid = new SpatialGrid();
        }

        // ==================== 碰撞体管理 ====================

        /** 添加碰撞体 */
        var _proto = CollisionSystem.prototype;
        _proto.addCollider = function addCollider(collider) {
          this._colliders.set(collider.id, collider);
          this._grid.insert(collider);
        }

        /** 移除碰撞体 */;
        _proto.removeCollider = function removeCollider(colliderId) {
          this._grid.remove(colliderId);
          this._colliders["delete"](colliderId);
        }

        /** 获取碰撞体 */;
        _proto.getCollider = function getCollider(colliderId) {
          return this._colliders.get(colliderId);
        }

        /** 根据实体ID获取碰撞体 */;
        _proto.getColliderByEntityId = function getColliderByEntityId(entityId) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._colliders.values()), _step; !(_step = _iterator()).done;) {
            var collider = _step.value;
            if (collider.entityId === entityId) {
              return collider;
            }
          }
          return undefined;
        }

        /** 根据实体ID移除碰撞体 */;
        _proto.removeColliderByEntityId = function removeColliderByEntityId(entityId) {
          var collider = this.getColliderByEntityId(entityId);
          if (collider) {
            this.removeCollider(collider.id);
            return true;
          }
          return false;
        }

        /** 清空所有碰撞体 */;
        _proto.clear = function clear() {
          this._colliders.clear();
          this._grid.clear();
          this._events = [];
        }

        /** 设置碰撞体启用状态（通过实体ID） */;
        _proto.setColliderEnabledByEntityId = function setColliderEnabledByEntityId(entityId, enabled) {
          var collider = this.getColliderByEntityId(entityId);
          if (collider) {
            collider.enabled = enabled;
            return true;
          }
          return false;
        }

        // ==================== 每帧更新 ====================

        /**
         * 更新碰撞系统
         * @returns 本帧发生的碰撞事件
         */;
        _proto.update = function update() {
          this._events = [];

          // 1. 更新空间网格
          this._updateGrid();

          // 2. 粗筛（Broadphase）
          var pairs = this._broadphase();

          // 3. 精检（Narrowphase）+ 响应
          this._narrowphaseAndResolve(pairs);
          return this._events;
        }

        /** 更新空间网格中的动态物体 */;
        _proto._updateGrid = function _updateGrid() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._colliders.values()), _step2; !(_step2 = _iterator2()).done;) {
            var collider = _step2.value;
            if (!collider.isStatic) {
              this._grid.update(collider);
            }
          }
        }

        /** 粗筛阶段：使用空间网格找出潜在碰撞对 */;
        _proto._broadphase = function _broadphase() {
          var pairs = [];
          var checked = new Set();
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._colliders.values()), _step3; !(_step3 = _iterator3()).done;) {
            var collider = _step3.value;
            // 跳过禁用的碰撞体
            if (!collider.enabled) continue;

            // 只从动态物体发起检测
            if (collider.isStatic) continue;
            var candidates = this._grid.query(collider);
            for (var _iterator4 = _createForOfIteratorHelperLoose(candidates), _step4; !(_step4 = _iterator4()).done;) {
              var candidateId = _step4.value;
              // 避免重复检测
              var pairKey = collider.id < candidateId ? collider.id + "_" + candidateId : candidateId + "_" + collider.id;
              if (checked.has(pairKey)) continue;
              checked.add(pairKey);
              var other = this._colliders.get(candidateId);
              if (!other || !other.enabled) continue;

              // 检查碰撞层
              if (!this._canCollide(collider, other)) continue;
              pairs.push([collider, other]);
            }
          }
          return pairs;
        }

        /** 精检阶段：检测碰撞并处理响应 */;
        _proto._narrowphaseAndResolve = function _narrowphaseAndResolve(pairs) {
          for (var _iterator5 = _createForOfIteratorHelperLoose(pairs), _step5; !(_step5 = _iterator5()).done;) {
            var _step5$value = _step5.value,
              a = _step5$value[0],
              b = _step5$value[1];
            // 检查是否需要 CCD
            var needCCD = this._needsCCD(a) || this._needsCCD(b);
            if (needCCD && a.shape.type === 'circle' && b.shape.type === 'circle') {
              // 使用 CCD
              // 注意：此时 position 是当前帧更新后的位置（End of Frame）
              // 使用 explicit previousPosition 进行回溯，避免因 velocity 在帧内改变（反弹）导致的回溯错误
              var startPosA = a.previousPosition.clone();
              var startPosB = b.previousPosition.clone();
              var time = sweepCircleVsCircle(startPosA, a.velocity, a.shape.radius, startPosB, b.velocity, b.shape.radius);
              if (time !== null) {
                // 将物体移动到碰撞时刻: Start + Vel * t
                var posA = startPosA.add(a.velocity.mul(time));
                var posB = startPosB.add(b.velocity.mul(time));

                // 临时设置位置
                var oldPosA = a.position.clone();
                var oldPosB = b.position.clone();
                a.position.set(posA);
                b.position.set(posB);

                // 检测碰撞
                var event = detectCollision(a, b);
                if (event) {
                  event.time = time;
                  // 检查是否需要跳过物理响应（Ball vs 非 BOTTOM Wall）
                  if (!this._shouldSkipPhysicsResponse(a, b)) {
                    resolveCollision(event);
                  }
                  this._events.push(event);
                }

                // 恢复位置并应用剩余时间的运动
                // 实际上碰撞响应已经修改了速度，我们可以直接应用新速度
                var remaining = FixedPoint.one().sub(time);
                if (!a.isStatic) a.position.add_(a.velocity.mul(remaining));
                if (!b.isStatic) b.position.add_(b.velocity.mul(remaining));
              }
            } else {
              // 常规检测
              var _event = detectCollision(a, b);
              if (_event) {
                // 检查是否需要跳过物理响应（Ball vs 非 BOTTOM Wall）
                if (!this._shouldSkipPhysicsResponse(a, b)) {
                  resolveCollision(_event);
                }
                this._events.push(_event);
              }
            }
          }
        }

        /**
         * 判断是否应跳过物理响应
         * - Ball vs Wall：由 BallEntity._applyBoundaryBounce() 和逻辑层处理
         * - Ball vs Ball：弹珠互相穿过，不需要物理反弹
         */;
        _proto._shouldSkipPhysicsResponse = function _shouldSkipPhysicsResponse(a, b) {
          var isBallA = a.colliderType === ColliderType.Ball;
          var isBallB = b.colliderType === ColliderType.Ball;
          var isWallA = a.colliderType === ColliderType.Wall;
          var isWallB = b.colliderType === ColliderType.Wall;

          // Ball vs Wall：跳过物理响应
          if (isBallA && isWallB || isBallB && isWallA) {
            return true;
          }

          // Ball vs Ball：跳过物理响应（弹珠互相穿过）
          if (isBallA && isBallB) {
            return true;
          }
          return false;
        }

        /** 检查两个碰撞体是否可以碰撞 */;
        _proto._canCollide = function _canCollide(a, b) {
          var _COLLISION_MATRIX$a$c, _COLLISION_MATRIX$b$c;
          var maskA = (_COLLISION_MATRIX$a$c = COLLISION_MATRIX[a.colliderType]) != null ? _COLLISION_MATRIX$a$c : 0;
          var maskB = (_COLLISION_MATRIX$b$c = COLLISION_MATRIX[b.colliderType]) != null ? _COLLISION_MATRIX$b$c : 0;
          return (maskA & b.layer) !== 0 && (maskB & a.layer) !== 0;
        }

        /** 检查是否需要 CCD */;
        _proto._needsCCD = function _needsCCD(collider) {
          if (collider.isStatic) return false;
          var speedSq = collider.velocity.lengthSq();
          var thresholdSq = CCD_VELOCITY_THRESHOLD.mul(CCD_VELOCITY_THRESHOLD);
          return speedSq.gt(thresholdSq);
        }

        // ==================== 调试 ====================

        /** 获取碰撞体数量 */;
        /** 获取所有碰撞体（调试用） */
        _proto.getAllColliders = function getAllColliders() {
          return Array.from(this._colliders.values());
        };
        _createClass(CollisionSystem, [{
          key: "colliderCount",
          get: function get() {
            return this._colliders.size;
          }
        }]);
        return CollisionSystem;
      }());
      cclegacy._RF.pop();
    }
  };
});

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
      cclegacy._RF.push({}, "95dc07s3oNKUYmeAglWUyTM", "ConfigBase", undefined);
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

System.register("chunks:///_virtual/ConfigMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './DB_Balls_Custom.ts', './DB_Evolution_Custom.ts', './DB_Roles_Custom.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, JsonAsset, autoBindToWindow, mk_instance_base, mk_asset$1, DB_Balls_Custom, DB_Evolution_Custom, DB_Roles_Custom;
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
    }, function (module) {
      DB_Balls_Custom = module.DB_Balls_Custom;
    }, function (module) {
      DB_Evolution_Custom = module.DB_Evolution_Custom;
    }, function (module) {
      DB_Roles_Custom = module.DB_Roles_Custom;
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
                  configName = configCls.name.replace("_Custom", ""); // Support Custom classes loading base JSON
                  if (!this.configs.has(configCls.name)) {
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
            // Check if key is a pure number string, parse it? 
            // Our project uses mixed IDs now. Better keep as string or try parse if needed.
            // For safety with existing number-based configs, we can try to see if it was treated as number before.
            // However, "B001" clearly isn't. Let's use string keys for versatility.
            // But strict backward compat: if the key is numeric string, existing code might expect number.

            // NOTE: Changing this to string-only might break existing code doing configMgr.get(Class, 123).
            // So we should support both.
            var numericKey = parseInt(key);
            if (!isNaN(numericKey) && key.trim() === numericKey.toString()) {
              configMap.set(numericKey, configInstance);
            } else {
              configMap.set(key, configInstance);
            }
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
        _proto.getConfig = function getConfig(configCls, id, customId) {
          var configName = configCls.name;

          // Only load if not cached (check configAssets wrapper)
          // Note: Logic here is a bit mixed in original code (cache check inside getter).
          var configAsset = this.configAssets.get(configName.replace("_Custom", ""));
          if (configAsset) {
            this.initConfig(configCls, configAsset);
            // Don't delete from configAssets immediately if multiple classes use it? 
            // Actually original code deletes it. We should assume 1-1 mapping mostly or careful loading.
            this.configAssets["delete"](configName.replace("_Custom", ""));
          }
          var configMap = this.configs.get(configName);
          if (configMap) {
            // Handle dual-lookup if customId is passed (hacky fix for previous signature issue)
            var result = configMap.get(customId || id);
            if (result) return result;

            // Fallback for "1" vs 1 mismatch
            if (typeof id === 'string') {
              return configMap.get(parseInt(id));
            } else {
              return configMap.get(id.toString());
            }
          }
          return null;
        };
        _proto.getAllConfigs = function getAllConfigs(configCls) {
          var configName = configCls.name;
          // 检查configAssets里是否存在
          var configAsset = this.configAssets.get(configName.replace("_Custom", ""));
          if (configAsset) {
            this.initConfig(configCls, configAsset);
            this.configAssets["delete"](configName.replace("_Custom", ""));
          }
          var configMap = this.configs.get(configName);
          if (configMap) {
            return configMap;
          }
          return new Map();
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
        }

        // --- Custom Helper Accessors ---
        ;

        _proto.getBall = function getBall(id) {
          return this.getConfig(DB_Balls_Custom, 0, id);
        };
        _proto.getRole = function getRole(id) {
          return this.getConfig(DB_Roles_Custom, 0, id);
        };
        _proto.getEvolution = function getEvolution(id) {
          return this.getConfig(DB_Evolution_Custom, 0, id);
        }

        /**
         * Get evolution recipe by materials
         */;
        _proto.getEvolutionByMats = function getEvolutionByMats(matA, matB) {
          // Construct the key used in our design (Sorted or Direct depend on logic)
          // For now, assuming direct match logic or iteration.
          // Since we removed lookup_key from CSV, we must iterate or build an index.
          // But ConfigMgr structure (Map<number, T>) is designed for ID-based lookup.
          // It does NOT support String keys natively in `getConfig(cls, id)`.
          // Wait, ConfigMgr.getConfig signature is `getConfig<T>(configCls, id: number)`.
          // But our IDs are Strings ("B001"). 
          // REVIEW: ConfigMgr only supports access by `number` ID in current implementation!

          // CRITICAL FIX: The base ConfigMgr implementation parses keys as integers: `parseInt(key)`.
          // Our IDs are strings ("B001").
          // We MUST Refactor ConfigMgr to support String keys.
          return this.queryOne(DB_Evolution_Custom, function (conf) {
            return conf.key == matA + "_" + matB || conf.key == matB + "_" + matA;
          });
        };
        return ConfigMgr;
      }(mk_instance_base)) || _class;
      var configMgr = exports('configMgr', ConfigMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DamageSystem.ts", ['cc', './FixedPoint.ts', './BattleLogger.ts'], function (exports) {
  var cclegacy, FixedPoint, battleLog;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      battleLog = module.battleLog;
    }],
    execute: function () {
      cclegacy._RF.push({}, "284257g54hNirYIqnShYBY9", "DamageSystem", undefined);

      /** 伤害事件 */

      /** 伤害系统 */
      var DamageSystem = exports('DamageSystem', /*#__PURE__*/function () {
        function DamageSystem(statusSystem) {
          this.name = 'DamageSystem';
          this._statusSystem = void 0;
          this._statusSystem = statusSystem;
        }

        /**
         * 弹珠命中敌人
         */
        var _proto = DamageSystem.prototype;
        _proto.ballHitEnemy = function ballHitEnemy(ball, enemy) {
          // 1. 基础伤害
          var damage = ball.damage.clone();

          // 2. 状态易伤加成
          var vulnMult = this._statusSystem.getVulnerabilityMultiplier(enemy);
          damage.mul_(vulnMult);

          // 3. ON_HIT 状态触发（如流血）
          var statusDamage = this._statusSystem.triggerOnHit(enemy, damage);
          damage.add_(statusDamage);

          // 4. 暴击计算（TODO：基于角色属性）
          var isCrit = false;

          // 5. 造成伤害
          var actualDamage = enemy.takeDamage(damage);
          var killed = !enemy.alive;

          // 6. 施加状态效果
          var statusApplied;
          if (ball.onHitStatus && ball.onHitStatus.length > 0) {
            this._statusSystem.applyStatus(enemy, ball.onHitStatus, ball.onHitStatusStacks, ball.id);
            statusApplied = ball.onHitStatus;
          }

          // 7. 弹珠特殊处理
          if (ball.destructible) {
            ball.triggerDestroy();
          }
          battleLog.log("[DamageSystem] Ball #" + ball.id + " hit Enemy #" + enemy.id + ": " + actualDamage.toFloat() + " dmg" + (killed ? ' (KILLED)' : ''));
          return {
            attackerId: ball.id,
            targetId: enemy.id,
            damage: actualDamage,
            isCrit: isCrit,
            killed: killed,
            statusApplied: statusApplied
          };
        }

        /**
         * 弹幕命中玩家
         */;
        _proto.bulletHitPlayer = function bulletHitPlayer(bullet, player) {
          var damage = bullet.damage.clone();
          player.takeDamage(damage);
          var killed = !player.alive;

          // 非穿透弹幕销毁
          if (!bullet.piercing) {
            bullet.destroy();
          }
          battleLog.log("[DamageSystem] Bullet #" + bullet.id + " hit Player #" + player.id + ": " + damage.toFloat() + " dmg" + (killed ? ' (KILLED)' : ''));
          return {
            attackerId: bullet.shooterId,
            targetId: player.id,
            damage: damage,
            isCrit: false,
            killed: killed
          };
        }

        /**
         * 敌人近战攻击玩家
         */;
        _proto.enemyMeleePlayer = function enemyMeleePlayer(enemy, player) {
          var damage = enemy.attackDamage.clone();
          player.takeDamage(damage);
          var killed = !player.alive;
          enemy.triggerAttack();
          battleLog.log("[DamageSystem] Enemy #" + enemy.id + " melee Player #" + player.id + ": " + damage.toFloat() + " dmg");
          return {
            attackerId: enemy.id,
            targetId: player.id,
            damage: damage,
            isCrit: false,
            killed: killed
          };
        }

        /**
         * 计算属性加成后的伤害
         */;
        _proto.calculateScaledDamage = function calculateScaledDamage(baseDamage, scalingAttr, player) {
          var attrValue;
          switch (scalingAttr) {
            case 'STR':
              attrValue = player.str;
              break;
            case 'DEX':
              attrValue = player.dex;
              break;
            case 'INT':
              attrValue = player["int"];
              break;
            default:
              attrValue = FixedPoint.zero();
          }

          // 简单的线性加成：每点属性 +5% 伤害
          var bonus = attrValue.mul(FixedPoint.fromFloat(0.05));
          return baseDamage.mul(FixedPoint.one().add(bonus));
        };
        return DamageSystem;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Balls_Custom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DB_Balls.ts', './GameConfigEnums.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, DB_Balls, E_BallType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DB_Balls = module.default;
    }, function (module) {
      E_BallType = module.E_BallType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ef98cLqrFFu7sOaWoGUeLP", "DB_Balls_Custom", undefined);
      var DB_Balls_Custom = exports('DB_Balls_Custom', /*#__PURE__*/function (_DB_Balls) {
        _inheritsLoose(DB_Balls_Custom, _DB_Balls);
        function DB_Balls_Custom() {
          return _DB_Balls.apply(this, arguments) || this;
        }
        _createClass(DB_Balls_Custom, [{
          key: "TypeEnum",
          get: function get() {
            return this.type;
          }
        }, {
          key: "ScalingAttrEnum",
          get: function get() {
            return this.scaling_attr;
          }
        }, {
          key: "isPhysics",
          get: function get() {
            return this.TypeEnum === E_BallType.PHYSICS;
          }
        }, {
          key: "isMagic",
          get: function get() {
            return this.TypeEnum === E_BallType.MAGIC;
          }
        }]);
        return DB_Balls_Custom;
      }(DB_Balls));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Balls.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e2de3uFZBFCJJuebOeCEVUe", "DB_Balls", undefined);
      var DB_Balls = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Balls, _ConfigBase);
        function DB_Balls() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 编号 */
          _this.id = "";
          /** 名称 */
          _this.name = "";
          /** 图标名 */
          _this.res_icon = "";
          /** 预制体名 */
          _this.res_prefab = "";
          /** 类型(枚举) */
          _this.type = "";
          /** 基础伤害 */
          _this.base_dmg = 0;
          /** 缩放属性 */
          _this.scaling_attr = "";
          /** 碰撞半径（像素） */
          _this.collision_radius = 0;
          /** 速度倍率 */
          _this.speed_mult = 0;
          /** 是否穿透 */
          _this.piercing = 0;
          /** 是否穿过 */
          _this.pass_through = 0;
          /** 命中销毁 */
          _this.destructible = 0;
          /** 冷却帧数 */
          _this.cooldown = 0;
          /** 命中状态 */
          _this.on_hit_status = "";
          /** 状态层数 */
          _this.on_hit_status_stacks = 0;
          /** 反弹效果 */
          _this.on_bounce_effect = "";
          /** 特殊行为 */
          _this.special_behavior = "";
          /** 效果描述 */
          _this.desc = "";
          return _this;
        }
        return DB_Balls;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_EndlessPool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c1636jCfnZHyKzl1BtLXXJ1", "DB_EndlessPool", undefined);
      var DB_EndlessPool = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_EndlessPool, _ConfigBase);
        function DB_EndlessPool() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 池ID */
          _this.id = "";
          /** 最小难度 */
          _this.difficulty_min = 0;
          /** 最大难度 */
          _this.difficulty_max = 0;
          /** 怪物ID */
          _this.enemy_id = "";
          /** 基础数量 */
          _this.count_base = 0;
          /** 数量增长 */
          _this.count_scale = 0;
          /** 阵型 */
          _this.formation = "";
          /** 权重 */
          _this.weight = 0;
          /** 血量缩放 */
          _this.scale_hp = 0;
          /** 伤害缩放 */
          _this.scale_dmg = 0;
          return _this;
        }
        return DB_EndlessPool;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Enemy.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f9d3aFyzQ1As5v1St7OmAMP", "DB_Enemy", undefined);
      var DB_Enemy = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Enemy, _ConfigBase);
        function DB_Enemy() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 怪物ID */
          _this.id = "";
          /** 名称 */
          _this.name = "";
          /** 类型 */
          _this.type = "";
          /** 血量 */
          _this.hp = 0;
          /** 移动速度 */
          _this.move_speed = 0;
          /** 护甲 */
          _this.armor = 0;
          /** 攻击伤害 */
          _this.attack_dmg = 0;
          /** 攻击范围 */
          _this.attack_range = 0;
          /** 攻击CD(帧) */
          _this.attack_cd = 0;
          /** 攻击模式 */
          _this.attack_pattern = "";
          /** 碰撞盒半宽（像素） */
          _this.hitbox_half_width = 0;
          /** 碰撞盒半高（像素） */
          _this.hitbox_half_height = 0;
          /** 掉落经验 */
          _this.drop_exp = 0;
          /** 掉落金币 */
          _this.drop_gold = 0;
          /** 贴图 */
          _this.res_sprite = "";
          /** 预制体 */
          _this.res_prefab = "";
          return _this;
        }
        return DB_Enemy;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Evolution_Custom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DB_Evolution.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, DB_Evolution;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DB_Evolution = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bc528Dc1zNCJ4lplJItmnKi", "DB_Evolution_Custom", undefined);
      var DB_Evolution_Custom = exports('DB_Evolution_Custom', /*#__PURE__*/function (_DB_Evolution) {
        _inheritsLoose(DB_Evolution_Custom, _DB_Evolution);
        function DB_Evolution_Custom() {
          return _DB_Evolution.apply(this, arguments) || this;
        }
        _createClass(DB_Evolution_Custom, [{
          key: "key",
          get:
          /**
           * Get the unique lookup key for this evolution recipe.
           * Algorithm: mat_a + "_" + mat_b
           * Ensure mat_a and mat_b are sorted alphabetically to prevent "A+B" vs "B+A" issues if the game treats order as irrelevant.
           * Note: Current design implies order matters or strictly follows key generation. 
           * If user logic requires unordered matching, we should sort them here.
           * For now, strict as per plan.
           */
          function get() {
            return this.mat_a + "_" + this.mat_b;
          }

          /**
           * Alternative key getter if order shouldn't matter
           */
        }, {
          key: "unorderedKey",
          get: function get() {
            var sorted = [this.mat_a, this.mat_b].sort();
            return sorted[0] + "_" + sorted[1];
          }
        }]);
        return DB_Evolution_Custom;
      }(DB_Evolution));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Evolution.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ab67dJIhchHyr+8wLH+0E/O", "DB_Evolution", undefined);
      var DB_Evolution = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Evolution, _ConfigBase);
        function DB_Evolution() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 配方ID */
          _this.id = "";
          /** 素材A */
          _this.mat_a = "";
          /** 素材B */
          _this.mat_b = "";
          /** 产物ID */
          _this.result_id = "";
          /** 合成特效 */
          _this.res_fx = "";
          /** 强度评级 */
          _this.tier = "";
          return _this;
        }
        return DB_Evolution;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Roles_Custom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DB_Roles.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, DB_Roles;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DB_Roles = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7f675qgGspNQ7Y6SOr2PJjM", "DB_Roles_Custom", undefined);
      var DB_Roles_Custom = exports('DB_Roles_Custom', /*#__PURE__*/function (_DB_Roles) {
        _inheritsLoose(DB_Roles_Custom, _DB_Roles);
        function DB_Roles_Custom() {
          return _DB_Roles.apply(this, arguments) || this;
        }
        _createClass(DB_Roles_Custom, [{
          key: "StartBallEnum",
          get: function get() {
            return this.start_ball;
          }
        }]);
        return DB_Roles_Custom;
      }(DB_Roles));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Roles.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a694kzxlZPCaS3Vs4KJTpk", "DB_Roles", undefined);
      var DB_Roles = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Roles, _ConfigBase);
        function DB_Roles() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 编号 */
          _this.id = "";
          /** 角色名 */
          _this.name = "";
          /** 立绘 */
          _this.res_portrait = "";
          /** Spine */
          _this.res_spine = "";
          /** 解锁条件 */
          _this.unlock_cond = "";
          /** 初始球ID */
          _this.start_ball = "";
          /** 基础力量 */
          _this.base_str = 0;
          /** 基础敏捷 */
          _this.base_dex = 0;
          /** 基础智力 */
          _this.base_int = 0;
          return _this;
        }
        return DB_Roles;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Stage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "665d0m6VAVGrIOSkKPQIazw", "DB_Stage", undefined);
      var DB_Stage = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Stage, _ConfigBase);
        function DB_Stage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 关卡ID */
          _this.id = "";
          /** 关卡名 */
          _this.name = "";
          /** 类型 */
          _this.stage_type = "";
          /** 地形 */
          _this.biome = "";
          /** 滚动速度 */
          _this.scroll_speed = 0;
          /** 波次数量 */
          _this.wave_count = 0;
          /** BOSS_ID */
          _this.boss_id = "";
          /** 解锁条件 */
          _this.unlock_cond = "";
          /** 奖励经验 */
          _this.reward_exp = 0;
          /** 奖励金币 */
          _this.reward_gold = 0;
          /** 背景资源 */
          _this.bg_res = "";
          /** 背景音乐 */
          _this.bgm = "";
          return _this;
        }
        return DB_Stage;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Status.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fb7d1Eb4QBNrJNBh36Noy14", "DB_Status", undefined);
      var DB_Status = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Status, _ConfigBase);
        function DB_Status() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 状态ID */
          _this.id = "";
          /** 名称 */
          _this.name = "";
          /** 是否可叠加 */
          _this.stackable = 0;
          /** 最大层数 */
          _this.max_stacks = 0;
          /** 持续时间(帧) */
          _this.duration = 0;
          /** 伤害间隔(帧) */
          _this.tick_interval = 0;
          /** 每层伤害 */
          _this.dmg_per_stack = 0;
          /** 触发时机 */
          _this.trigger = "";
          return _this;
        }
        return DB_Status;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_Wave.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "431a8BfvRNGL5qsEgQ5AVdk", "DB_Wave", undefined);
      var DB_Wave = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_Wave, _ConfigBase);
        function DB_Wave() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 波次ID */
          _this.id = "";
          /** 关卡ID */
          _this.stage_id = "";
          /** 波次序号 */
          _this.wave_index = 0;
          /** 延迟帧数（距离上一波） */
          _this.spawn_delay = 0;
          /** 阵型模板ID（引用 DB_WavePattern） */
          _this.pattern_id = "";
          /** X偏移（覆盖阵型模板的 offset_x） */
          _this.offset_x = 0;
          /** Y偏移（覆盖阵型模板的 offset_y，负值在屏幕上方） */
          _this.offset_y = 0;
          /** Y偏移 */
          _this.spawn_y = 0;
          /** 特殊规则 */
          _this.special = "";
          return _this;
        }
        return DB_Wave;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DB_WavePattern.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f96c6aFooJHvrO7EpYbtBwq", "DB_WavePattern", undefined);
      var DB_WavePattern = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(DB_WavePattern, _ConfigBase);
        function DB_WavePattern() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 阵型ID */
          _this.id = "";
          /** 阵型名称 */
          _this.name = "";
          /** 行数 */
          _this.rows = 0;
          /** 列数 */
          _this.cols = 0;
          /** 格子宽 */
          _this.cell_width = 0;
          /** 格子高 */
          _this.cell_height = 0;
          /** X偏移 */
          _this.offset_x = 0;
          /** Y偏移 */
          _this.offset_y = 0;
          /** 怪物分布模式 */
          _this.pattern = "";
          return _this;
        }
        return DB_WavePattern;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DefaultModifier.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IBallModifier.ts'], function (exports) {
  var _inheritsLoose, cclegacy, WallSide, BaseBallModifier;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      WallSide = module.WallSide;
      BaseBallModifier = module.BaseBallModifier;
    }],
    execute: function () {
      exports('createDefaultModifier', createDefaultModifier);
      cclegacy._RF.push({}, "e5af3Xyvu5AqKocJ4zPsd1q", "DefaultModifier", undefined);
      var DefaultModifier = exports('DefaultModifier', /*#__PURE__*/function (_BaseBallModifier) {
        _inheritsLoose(DefaultModifier, _BaseBallModifier);
        function DefaultModifier() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseBallModifier.call.apply(_BaseBallModifier, [this].concat(args)) || this;
          _this.name = 'Default';
          _this.priority = 1000;
          return _this;
        }
        var _proto = DefaultModifier.prototype;
        // 最低优先级，作为兜底
        _proto.onHitEnemy = function onHitEnemy(ball, enemy) {
          return false; // 不穿透，触发反弹
        };

        _proto.onHitWall = function onHitWall(ball, wall) {
          if (wall === WallSide.BOTTOM) {
            return {
              recycle: true
            }; // 底墙回收
          }

          return {}; // 其他墙反弹（不穿透、不回收）
        };

        return DefaultModifier;
      }(BaseBallModifier));

      /** 创建默认修饰器实例 */
      function createDefaultModifier() {
        return new DefaultModifier();
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnemyEntity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './Entity.ts', './EntityType.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, FixedPoint, Entity, EntityType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      Entity = module.Entity;
    }, function (module) {
      EntityType = module.EntityType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ef86fIxJ85NdatNRJSoRx1E", "EnemyEntity", undefined);
      var EnemyEntity = exports('EnemyEntity', /*#__PURE__*/function (_Entity) {
        _inheritsLoose(EnemyEntity, _Entity);
        function EnemyEntity(id, config, x, y, hpScale, dmgScale) {
          var _this;
          if (hpScale === void 0) {
            hpScale = 1;
          }
          if (dmgScale === void 0) {
            dmgScale = 1;
          }
          _this = _Entity.call(this, id, x, y) || this;
          _this.type = EntityType.Enemy;
          /** 敌人配置ID */
          _this.defId = void 0;
          /** 配置引用 */
          _this.config = void 0;
          /** 敌人类型 */
          _this.enemyType = void 0;
          /** 当前血量 */
          _this.hp = void 0;
          /** 最大血量 */
          _this.maxHp = void 0;
          /** 护甲 */
          _this.armor = void 0;
          /** 基础移动速度（不可变，来自配置） */
          _this.baseMoveSpeed = void 0;
          /** 移动速度倍率（受状态影响：1.0=正常，0=冰冻，0.5=减速50%） */
          _this.moveSpeedMult = FixedPoint.one();
          /** 攻击伤害 */
          _this.attackDamage = void 0;
          /** 攻击模式 */
          _this.attackPattern = void 0;
          /** 攻击冷却 */
          _this.attackCooldown = void 0;
          /** 攻击冷却剩余 */
          _this.attackCooldownRemaining = 0;
          /** 攻击范围 */
          _this.attackRange = void 0;
          /** 状态效果列表 */
          _this.statuses = [];
          /** 地图Y偏移（视觉滚动用） */
          _this.mapOffsetY = FixedPoint.zero();
          _this.defId = config.id;
          _this.config = config;
          _this.enemyType = config.type;

          // 从配置初始化（支持难度缩放）
          _this.maxHp = FixedPoint.fromFloat(config.hp * hpScale);
          _this.hp = _this.maxHp.clone();
          _this.armor = FixedPoint.fromInt(config.armor);
          _this.baseMoveSpeed = FixedPoint.fromFloat(config.move_speed);
          _this.attackDamage = FixedPoint.fromFloat(config.attack_dmg * dmgScale);
          _this.attackPattern = config.attack_pattern;
          _this.attackCooldown = config.attack_cd;
          _this.attackRange = FixedPoint.fromInt(config.attack_range);
          return _this;
        }

        /** 获取当前实际移动速度 */
        var _proto = EnemyEntity.prototype;
        _proto.update = function update(tick) {
          // 攻击冷却
          if (this.attackCooldownRemaining > 0) {
            this.attackCooldownRemaining--;
          }

          // 向下移动（基础速度 × 倍率）
          var actualSpeed = this.moveSpeed;
          if (actualSpeed.gtI(0)) {
            this.position.y.sub_(actualSpeed);
          }

          // 状态效果更新（由 StatusSystem 处理）
        }

        /** 受到伤害 */;
        _proto.takeDamage = function takeDamage(damage, ignoreArmor) {
          if (ignoreArmor === void 0) {
            ignoreArmor = false;
          }
          var actualDamage = damage;

          // 护甲减伤
          if (!ignoreArmor && this.armor.gtI(0)) {
            actualDamage = damage.sub(this.armor);
            if (actualDamage.ltI(1)) {
              actualDamage = FixedPoint.one(); // 最少1点伤害
            }
          }

          this.hp.sub_(actualDamage);
          if (this.hp.lteI(0)) {
            this.hp = FixedPoint.zero();
            this.destroy();
          }
          return actualDamage;
        }

        /** 治疗 */;
        _proto.heal = function heal(amount) {
          this.hp.add_(amount);
          if (this.hp.gt(this.maxHp)) {
            this.hp.set(this.maxHp);
          }
        }

        /** 是否可以攻击 */;
        _proto.canAttack = function canAttack() {
          return this.attackCooldownRemaining <= 0 && this.alive;
        }

        /** 触发攻击（重置冷却） */;
        _proto.triggerAttack = function triggerAttack() {
          this.attackCooldownRemaining = this.attackCooldown;
        }

        /** 获取HP百分比 */;
        _proto.getHpPercent = function getHpPercent() {
          if (this.maxHp.eqI(0)) return 0;
          return this.hp.toFloat() / this.maxHp.toFloat();
        }

        /** 添加状态效果 */;
        _proto.addStatus = function addStatus(status) {
          // 查找已有的同类型状态
          var existing = this.statuses.find(function (s) {
            return s.defId === status.defId;
          });
          if (existing) {
            // 叠加或刷新
            existing.stacks = Math.min(existing.stacks + status.stacks, status.maxStacks);
            existing.remainingDuration = Math.max(existing.remainingDuration, status.remainingDuration);
          } else {
            this.statuses.push(status);
          }
        }

        /** 移除状态效果 */;
        _proto.removeStatus = function removeStatus(defId) {
          var index = this.statuses.findIndex(function (s) {
            return s.defId === defId;
          });
          if (index >= 0) {
            this.statuses.splice(index, 1);
          }
        };
        _createClass(EnemyEntity, [{
          key: "moveSpeed",
          get: function get() {
            return this.baseMoveSpeed.mul(this.moveSpeedMult);
          }
        }]);
        return EnemyEntity;
      }(Entity));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnemyView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IEntityView.ts', './EntityType.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, BaseEntityView, EnemyType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BaseEntityView = module.BaseEntityView;
    }, function (module) {
      EnemyType = module.EnemyType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "89dccW9yW9EUIh80QSnLdS/", "EnemyView", undefined);
      var EnemyView = exports('EnemyView', /*#__PURE__*/function (_BaseEntityView) {
        _inheritsLoose(EnemyView, _BaseEntityView);
        function EnemyView(entityId, x, y, enemyId, enemyType, loader, callbacks) {
          var _this;
          _this = _BaseEntityView.call(this, entityId, x, y) || this;
          _this.entityType = 'enemy';
          /** 敌人配置ID */
          _this.enemyId = void 0;
          /** 敌人类型 */
          _this.enemyType = void 0;
          /** 是否为 BOSS */
          _this.isBoss = void 0;
          /** 显示对象 */
          _this._loader = void 0;
          /** 回调 */
          _this._callbacks = void 0;
          /** 当前 HP（从外部同步） */
          _this._hp = 0;
          _this._maxHp = 0;
          _this.enemyId = enemyId;
          _this.enemyType = enemyType;
          _this.isBoss = enemyType === EnemyType.BOSS;
          _this._loader = loader;
          _this._displayObject = loader;
          _this._callbacks = callbacks || {};

          // 敌人使用较慢的插值
          _this._interpolation = true;
          _this._lerpSpeed = 10;
          _this._updateDisplayPosition();
          return _this;
        }
        var _proto = EnemyView.prototype;
        _proto._updateDisplayPosition = function _updateDisplayPosition() {
          if (this._loader) {
            this._loader.x = this._currentX;
            this._loader.y = this._currentY;
          }
        }

        /** 设置 HP（用于外部血条显示） */;
        _proto.setHp = function setHp(hp, maxHp) {
          this._hp = hp;
          this._maxHp = maxHp;
          if (this._callbacks.onHpChange) {
            this._callbacks.onHpChange(this.entityId, hp, maxHp);
          }
        }

        /** 受到伤害 */;
        _proto.onDamage = function onDamage(damage, isCrit) {
          if (this._callbacks.onDamage) {
            this._callbacks.onDamage(this.entityId, damage, isCrit);
          }

          // 可以添加受击闪烁效果
          // this._flashHit();
        };

        _proto.destroy = function destroy() {
          if (this._callbacks.onDestroy) {
            this._callbacks.onDestroy(this.entityId);
          }
          if (this._loader) {
            this._loader.dispose();
            this._loader = null;
          }
        }

        /** 获取 GLoader */;
        _createClass(EnemyView, [{
          key: "hp",
          get: function get() {
            return this._hp;
          }
        }, {
          key: "maxHp",
          get: function get() {
            return this._maxHp;
          }
        }, {
          key: "hpPercent",
          get: function get() {
            return this._maxHp > 0 ? this._hp / this._maxHp : 0;
          }
        }, {
          key: "loader",
          get: function get() {
            return this._loader;
          }
        }]);
        return EnemyView;
      }(BaseEntityView));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Entity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FPVector2.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, FPVector2;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c2667PDhHhFKY9xW+BZombb", "Entity", undefined);

      /** 实体销毁回调 */

      /** 实体基类 */
      var Entity = exports('Entity', /*#__PURE__*/function () {
        function Entity(id, x, y) {
          /** 实体唯一ID */
          this.id = void 0;
          /** 位置 */
          this.position = void 0;
          /** 速度 */
          this.velocity = void 0;
          /** 是否存活 */
          this.alive = true;
          /** 所属玩家ID（可选） */
          this.ownerId = void 0;
          /** 销毁回调列表 */
          this._onDestroyCallbacks = [];
          this.id = id;
          this.position = new FPVector2(x, y);
          this.velocity = FPVector2.zero();
        }

        /** 每帧更新（子类实现） */
        var _proto = Entity.prototype;
        /** 
         * 注册销毁回调
         * 当实体销毁时自动触发（用于清理碰撞体等关联组件）
         */
        _proto.onDestroy = function onDestroy(callback) {
          this._onDestroyCallbacks.push(callback);
        }

        /** 销毁实体（会触发所有 onDestroy 回调） */;
        _proto.destroy = function destroy() {
          if (!this.alive) return; // 防止重复销毁

          this.alive = false;

          // 触发所有销毁回调
          for (var _iterator = _createForOfIteratorHelperLoose(this._onDestroyCallbacks), _step; !(_step = _iterator()).done;) {
            var callback = _step.value;
            callback(this);
          }
          this._onDestroyCallbacks = [];
        }

        /** 获取位置的浮点数表示（用于表现层） */;
        _proto.getFloatPosition = function getFloatPosition() {
          return {
            x: this.position.x.toFloat(),
            y: this.position.y.toFloat()
          };
        };
        return Entity;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntityManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './BallEntity.ts', './EnemyEntity.ts', './BulletEntity.ts', './PlayerEntity.ts', './BattleLogger.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, FixedPoint, BallEntity, EnemyEntity, BulletEntity, PlayerEntity, battleLog;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      BallEntity = module.BallEntity;
    }, function (module) {
      EnemyEntity = module.EnemyEntity;
    }, function (module) {
      BulletEntity = module.BulletEntity;
    }, function (module) {
      PlayerEntity = module.PlayerEntity;
    }, function (module) {
      battleLog = module.battleLog;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5c4e7S4OmZGG58GyEp0MJu3", "EntityManager", undefined);
      var EntityManager = exports('EntityManager', /*#__PURE__*/function () {
        function EntityManager() {
          /** 下一个实体ID */
          this._nextId = 1;
          /** 弹珠列表 */
          this._balls = new Map();
          /** 敌人列表 */
          this._enemies = new Map();
          /** 弹幕列表 */
          this._bullets = new Map();
          /** 玩家列表 */
          this._players = new Map();
          /** 玩家ID到实体ID的映射 */
          this._playerIdMap = new Map();
        }
        var _proto = EntityManager.prototype;
        // ==================== 创建实体 ====================
        /** 创建弹珠 */
        _proto.createBall = function createBall(config, x, y, ownerId) {
          var id = this._nextId++;
          var ball = new BallEntity(id, config, FixedPoint.fromFloat(x), FixedPoint.fromFloat(y), ownerId);
          this._balls.set(id, ball);
          battleLog.log("[EntityManager] Created Ball #" + id + ": " + config.name);
          return ball;
        }

        /** 创建敌人 */;
        _proto.createEnemy = function createEnemy(config, x, y, hpScale, dmgScale) {
          if (hpScale === void 0) {
            hpScale = 1;
          }
          if (dmgScale === void 0) {
            dmgScale = 1;
          }
          var id = this._nextId++;
          var enemy = new EnemyEntity(id, config, FixedPoint.fromFloat(x), FixedPoint.fromFloat(y), hpScale, dmgScale);
          this._enemies.set(id, enemy);
          battleLog.log("[EntityManager] Created Enemy #" + id + ": " + config.name);
          return enemy;
        }

        /** 创建弹幕 */;
        _proto.createBullet = function createBullet(shooterId, x, y, damage, lifetime) {
          var id = this._nextId++;
          var bullet = new BulletEntity(id, shooterId, FixedPoint.fromFloat(x), FixedPoint.fromFloat(y), FixedPoint.fromFloat(damage), lifetime);
          this._bullets.set(id, bullet);
          return bullet;
        }

        /** 创建玩家 */;
        _proto.createPlayer = function createPlayer(playerId, config, x, y) {
          var id = this._nextId++;
          var player = new PlayerEntity(id, playerId, config, FixedPoint.fromFloat(x), FixedPoint.fromFloat(y));
          this._players.set(id, player);
          this._playerIdMap.set(playerId, id);
          battleLog.log("[EntityManager] Created Player #" + id + ": " + playerId);
          return player;
        }

        // ==================== 获取实体 ====================
        ;

        _proto.getBall = function getBall(id) {
          return this._balls.get(id);
        };
        _proto.getEnemy = function getEnemy(id) {
          return this._enemies.get(id);
        };
        _proto.getBullet = function getBullet(id) {
          return this._bullets.get(id);
        };
        _proto.getPlayer = function getPlayer(id) {
          return this._players.get(id);
        };
        _proto.getPlayerByPlayerId = function getPlayerByPlayerId(playerId) {
          var id = this._playerIdMap.get(playerId);
          return id !== undefined ? this._players.get(id) : undefined;
        };
        _proto.getEntity = function getEntity(id) {
          return this._balls.get(id) || this._enemies.get(id) || this._bullets.get(id) || this._players.get(id);
        }

        // ==================== 迭代器 ====================
        ;
        // ==================== 更新与清理 ====================
        /** 更新所有实体 */
        _proto.update = function update(tick) {
          // 更新弹珠
          for (var _iterator = _createForOfIteratorHelperLoose(this._balls.values()), _step; !(_step = _iterator()).done;) {
            var ball = _step.value;
            if (ball.alive) ball.update(tick);
          }

          // 更新敌人
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._enemies.values()), _step2; !(_step2 = _iterator2()).done;) {
            var enemy = _step2.value;
            if (enemy.alive) enemy.update(tick);
          }

          // 更新弹幕
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._bullets.values()), _step3; !(_step3 = _iterator3()).done;) {
            var bullet = _step3.value;
            if (bullet.alive) bullet.update(tick);
          }

          // 更新玩家
          for (var _iterator4 = _createForOfIteratorHelperLoose(this._players.values()), _step4; !(_step4 = _iterator4()).done;) {
            var player = _step4.value;
            if (player.alive) player.update(tick);
          }

          // 清理死亡实体
          this._cleanup();
        }

        /** 清理死亡实体 */;
        _proto._cleanup = function _cleanup() {
          for (var _iterator5 = _createForOfIteratorHelperLoose(this._balls), _step5; !(_step5 = _iterator5()).done;) {
            var _step5$value = _step5.value,
              id = _step5$value[0],
              ball = _step5$value[1];
            if (!ball.alive) this._balls["delete"](id);
          }
          for (var _iterator6 = _createForOfIteratorHelperLoose(this._enemies), _step6; !(_step6 = _iterator6()).done;) {
            var _step6$value = _step6.value,
              _id = _step6$value[0],
              enemy = _step6$value[1];
            if (!enemy.alive) this._enemies["delete"](_id);
          }
          for (var _iterator7 = _createForOfIteratorHelperLoose(this._bullets), _step7; !(_step7 = _iterator7()).done;) {
            var _step7$value = _step7.value,
              _id2 = _step7$value[0],
              bullet = _step7$value[1];
            if (!bullet.alive) this._bullets["delete"](_id2);
          }
          for (var _iterator8 = _createForOfIteratorHelperLoose(this._players), _step8; !(_step8 = _iterator8()).done;) {
            var _step8$value = _step8.value,
              _id3 = _step8$value[0],
              player = _step8$value[1];
            if (!player.alive) {
              this._playerIdMap["delete"](player.playerId);
              this._players["delete"](_id3);
            }
          }
        }

        /** 重置所有实体 */;
        _proto.reset = function reset() {
          this._balls.clear();
          this._enemies.clear();
          this._bullets.clear();
          this._players.clear();
          this._playerIdMap.clear();
          this._nextId = 1;
        };
        _createClass(EntityManager, [{
          key: "balls",
          get: function get() {
            return this._balls.values();
          }
        }, {
          key: "enemies",
          get: function get() {
            return this._enemies.values();
          }
        }, {
          key: "bullets",
          get: function get() {
            return this._bullets.values();
          }
        }, {
          key: "players",
          get: function get() {
            return this._players.values();
          }

          // ==================== 统计 ====================
        }, {
          key: "ballCount",
          get: function get() {
            return this._balls.size;
          }
        }, {
          key: "enemyCount",
          get: function get() {
            return this._enemies.size;
          }
        }, {
          key: "bulletCount",
          get: function get() {
            return this._bullets.size;
          }
        }, {
          key: "playerCount",
          get: function get() {
            return this._players.size;
          }
        }]);
        return EntityManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntityType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cfc5cWv7CFMdJU0bh2sTjSE", "EntityType", undefined);
      /**
       * 实体类型枚举
       */

      /** 实体类型 */
      var EntityType = exports('EntityType', /*#__PURE__*/function (EntityType) {
        EntityType["Ball"] = "Ball";
        EntityType["Bullet"] = "Bullet";
        EntityType["Enemy"] = "Enemy";
        EntityType["Player"] = "Player";
        return EntityType;
      }({}));

      /** 敌人类型 */
      var EnemyType = exports('EnemyType', /*#__PURE__*/function (EnemyType) {
        EnemyType["BRICK"] = "BRICK";
        EnemyType["SHOOTER"] = "SHOOTER";
        EnemyType["TANK"] = "TANK";
        EnemyType["SUPPORT"] = "SUPPORT";
        EnemyType["BOSS"] = "BOSS";
        return EnemyType;
      }({}));

      /** 攻击模式 */
      var AttackPattern = exports('AttackPattern', /*#__PURE__*/function (AttackPattern) {
        AttackPattern["MELEE"] = "MELEE";
        AttackPattern["BULLET_SINGLE"] = "BULLET_SINGLE";
        AttackPattern["BULLET_SPREAD"] = "BULLET_SPREAD";
        AttackPattern["HEAL_NEARBY"] = "HEAL_NEARBY";
        AttackPattern["BOSS_PATTERN_A"] = "BOSS_PATTERN_A";
        AttackPattern["BOSS_PATTERN_B"] = "BOSS_PATTERN_B";
        return AttackPattern;
      }({}));

      /** 阵型 */
      var Formation = exports('Formation', /*#__PURE__*/function (Formation) {
        Formation["LINE"] = "LINE";
        Formation["V"] = "V";
        Formation["RANDOM"] = "RANDOM";
        Formation["CIRCLE"] = "CIRCLE";
        Formation["CENTER"] = "CENTER";
        Formation["CUSTOM"] = "CUSTOM";
        return Formation;
      }({}));

      /** 关卡类型 */
      var StageType = exports('StageType', /*#__PURE__*/function (StageType) {
        StageType["NORMAL"] = "NORMAL";
        StageType["BOSS"] = "BOSS";
        StageType["ENDLESS"] = "ENDLESS";
        return StageType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntityViewPool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './drongo-cc.mjs'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Graphics, Color, UIPackage, GLoader, LoaderFillType, AlignType, VertAlignType, Pool, log;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Graphics = module.Graphics;
      Color = module.Color;
    }, function (module) {
      UIPackage = module.UIPackage;
      GLoader = module.GLoader;
      LoaderFillType = module.LoaderFillType;
      AlignType = module.AlignType;
      VertAlignType = module.VertAlignType;
    }, function (module) {
      Pool = module.Pool;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "28d63bHfHRGtIWdBzEmKbTI", "EntityViewPool", undefined);

      /** 实体类型对应的资源配置 */

      var ENTITY_CONFIGS = {
        player: {
          size: {
            width: 100,
            height: 100
          },
          defaultUrl: "ui://gphmworapce522"
        },
        hero: {
          size: {
            width: 100,
            height: 100
          },
          defaultUrl: "ui://gphmworapce522"
        },
        ball: {
          size: {
            width: 30,
            height: 30
          },
          defaultUrl: "ui://gphmworapce53h"
        },
        projectile: {
          size: {
            width: 30,
            height: 30
          },
          defaultUrl: "ui://gphmworapce53h"
        },
        enemy: {
          size: {
            width: 100,
            height: 100
          },
          defaultUrl: "ui://gphmworapce522"
        }
      };

      // 碰撞体配置

      var HITBOX_CONFIGS = {
        ball: {
          type: 'circle',
          radius: 15
        },
        projectile: {
          type: 'circle',
          radius: 15
        },
        enemy: {
          type: 'rect',
          halfWidth: 50,
          halfHeight: 50
        } // 100x100 矩形
      };

      /** 池化实体视图 */
      var PooledEntityView = exports('PooledEntityView', /*#__PURE__*/function () {
        function PooledEntityView(entityId, entityType, ui, pool) {
          this.entityId = void 0;
          this.entityType = void 0;
          this.ui = void 0;
          this._x = 0;
          this._y = 0;
          this._pool = void 0;
          this._debugGraphics = null;
          this.entityId = entityId;
          this.entityType = entityType;
          this.ui = ui;
          this._pool = pool;
        }

        /** 配置实体（从池中取出后调用） */
        var _proto = PooledEntityView.prototype;
        _proto.configure = function configure(cmd) {
          var _cmd$data;
          var config = ENTITY_CONFIGS[cmd.entityType] || ENTITY_CONFIGS.enemy;
          this.ui.setSize(config.size.width, config.size.height);

          // 根据类型设置图片
          var url = config.defaultUrl;
          if (cmd.entityType === 'enemy' && (_cmd$data = cmd.data) != null && _cmd$data.res_sprite) {
            url = UIPackage.getItemURL("Attac", cmd.data.res_sprite) || config.defaultUrl;
          }
          this.ui.url = url;

          // 设置位置
          this._x = cmd.x;
          this._y = cmd.y;
          this.ui.x = this._x;
          this.ui.y = this._y;
          this.ui.visible = true;

          // 创建调试碰撞体
          {
            this._createDebugHitbox(cmd.entityType);
          }
        }

        /** 创建调试碰撞体 */;
        _proto._createDebugHitbox = function _createDebugHitbox(entityType) {
          var hitbox = HITBOX_CONFIGS[entityType];
          if (!hitbox) return;

          // 获取 GLoader 的节点
          var node = this.ui.node;
          if (!node) return;

          // 复用或创建 Graphics 组件
          var graphics = node.getComponent(Graphics);
          if (!graphics) {
            graphics = node.addComponent(Graphics);
          }

          // 清除旧绘制
          graphics.clear();

          // 设置颜色
          var color = entityType === 'ball' ? new Color(0, 255, 0, 200) // 绿色=球
          : new Color(255, 0, 0, 200); // 红色=敌人

          graphics.strokeColor = color;
          graphics.lineWidth = 5;

          // 根据形状绘制
          if (hitbox.type === 'circle' && hitbox.radius) {
            graphics.circle(0, 0, hitbox.radius);
          } else if (hitbox.type === 'rect' && hitbox.halfWidth && hitbox.halfHeight) {
            // 矩形：从左上角开始，中心在 (0, 0)
            var w = hitbox.halfWidth;
            var h = hitbox.halfHeight;
            graphics.rect(-w, -h, w * 2, h * 2);
          }
          graphics.stroke();
          this._debugGraphics = graphics;
        };
        _proto.update = function update(dt) {
          // 插值逻辑可在此添加
        };
        _proto.setPosition = function setPosition(x, y) {
          this._x = x;
          this._y = y;
          // 直接设置 Node 坐标 (Y-Up)
          this.ui.node.setPosition(this._x, this._y);
        };
        _proto.destroy = function destroy() {
          // 清除调试绘制
          if (this._debugGraphics) {
            this._debugGraphics.clear();
            this._debugGraphics = null;
          }

          // 不销毁，而是归还池
          this.ui.visible = false;
          this._pool.returnLoader(this.entityType, this.ui);
        };
        return PooledEntityView;
      }());

      /**
       * 实体视图对象池
       * 
       * 单例管理器，为不同实体类型维护独立的 GLoader 池
       */
      var EntityViewPool = exports('EntityViewPool', /*#__PURE__*/function () {
        function EntityViewPool() {
          /** 按类型分池 */
          this._pools = new Map();
          /** 容器（添加 GLoader 的父节点） */
          this._container = null;
        }
        EntityViewPool.instance = function instance() {
          if (!this._instance) {
            this._instance = new EntityViewPool();
          }
          return this._instance;
        }

        /** 设置容器 */;
        var _proto2 = EntityViewPool.prototype;
        _proto2.setContainer = function setContainer(container) {
          this._container = container;
        }

        /** 获取或创建指定类型的池 */;
        _proto2._getPool = function _getPool(entityType) {
          var _this = this;
          if (!this._pools.has(entityType)) {
            var config = ENTITY_CONFIGS[entityType] || ENTITY_CONFIGS.enemy;
            var pool = new Pool(
            // creator
            function () {
              var loader = new GLoader();
              loader.autoSize = false;
              loader.fill = LoaderFillType.Scale;
              loader.align = AlignType.Center;
              loader.verticalAlign = VertAlignType.Middle;
              loader.setPivot(0.5, 0.5, true);
              loader.setSize(config.size.width, config.size.height);
              loader.visible = false;

              // 添加到容器
              if (_this._container) {
                _this._container.addChild(loader.node);
              }
              return loader;
            },
            // destroyer
            function (loader) {
              loader.dispose();
            });

            // 预热
            pool.fill(entityType === 'ball' ? 20 : 10);
            this._pools.set(entityType, pool);
            log("[EntityViewPool] Created pool for '" + entityType + "', pre-filled: " + pool.count);
          }
          return this._pools.get(entityType);
        }

        /** 从池中获取 GLoader */;
        _proto2.getLoader = function getLoader(entityType) {
          return this._getPool(entityType).get();
        }

        /** 归还 GLoader 到池 */;
        _proto2.returnLoader = function returnLoader(entityType, loader) {
          loader.visible = false;
          this._getPool(entityType).put(loader);
        }

        /** 创建池化实体视图 */;
        _proto2.createEntityView = function createEntityView(cmd) {
          var loader = this.getLoader(cmd.entityType);
          var view = new PooledEntityView(cmd.entityId, cmd.entityType, loader, this);
          view.configure(cmd);
          return view;
        }

        /** 清理所有池 */;
        _proto2.clear = function clear() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._pools.values()), _step; !(_step = _iterator()).done;) {
            var pool = _step.value;
            pool.clear();
          }
          this._pools.clear();
        }

        /** 获取池统计信息 */;
        _proto2.getStats = function getStats() {
          var stats = {};
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._pools), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              type = _step2$value[0],
              pool = _step2$value[1];
            stats[type] = pool.count;
          }
          return stats;
        };
        return EntityViewPool;
      }());

      /** 便捷导出 */
      EntityViewPool._instance = null;
      var entityViewPool = exports('entityViewPool', EntityViewPool.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FixedPoint.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "c3c51xElIhFSp/Q4avnUJgl", "FixedPoint", undefined);
      /**
       * 定点数类
       * 
       * 使用 int32 存储，格式：
       * - 低10位：小数位（精度 1/1024）
       * - 高21位：整数位（范围 -1048576 到 1048575）
       * - 最高位：符号位
       * 
       * 乘除法使用移位操作，避免浮点运算
       */
      var FixedPoint = exports('FixedPoint', /*#__PURE__*/function () {
        // int32 存储的定点数值

        /**
         * 从 int32 原始值创建定点数
         */
        function FixedPoint(value) {
          this._value = void 0;
          this._value = value | 0; // 确保是 int32
        }

        /**
         * 从浮点数创建定点数
         */
        FixedPoint.fromFloat = function fromFloat(f) {
          var scaled = Math.round(f * FixedPoint.FRACTION_SCALE);
          return new FixedPoint(scaled | 0);
        }

        /**
         * 从整数创建定点数
         */;
        FixedPoint.fromInt = function fromInt(i) {
          return new FixedPoint((i | 0) << FixedPoint.FRACTION_BITS);
        }

        /**
         * 从原始 int32 值创建定点数
         */;
        FixedPoint.fromRaw = function fromRaw(raw) {
          return new FixedPoint(raw | 0);
        }

        /**
         * 零值
         */;
        FixedPoint.zero = function zero() {
          return new FixedPoint(0);
        }

        /**
         * 单位值（1.0）
         */;
        FixedPoint.one = function one() {
          return FixedPoint.fromInt(1);
        }

        /**
         * 转换为浮点数
         */;
        var _proto = FixedPoint.prototype;
        _proto.toFloat = function toFloat() {
          return this._value / FixedPoint.FRACTION_SCALE;
        }

        /**
         * 转换为整数（向下取整）
         */;
        _proto.toInt = function toInt() {
          return this._value >> FixedPoint.FRACTION_BITS;
        }

        /**
         * 获取原始 int32 值
         */;
        _proto.getRaw = function getRaw() {
          return this._value;
        }

        /**
         * 加法
         */;
        _proto.add = function add(other) {
          return new FixedPoint(this._value + other._value | 0);
        }

        /**
         * 减法
         */;
        _proto.sub = function sub(other) {
          return new FixedPoint(this._value - other._value | 0);
        }

        /**
         * 乘法（使用移位优化）
         * (a * b) / SCALE = (a * b) >> FRACTION_BITS
         */;
        _proto.mul = function mul(other) {
          // 乘法：先乘后除以 SCALE
          // 注意：不要使用位移操作符 (>>)，因为它们会先将操作数转换为 32 位整数
          // 而 (this._value * other._value) 很可能超过 32 位
          // JavaScript 的 number 是 double (53位精度)，可以安全容纳约 2^53
          // 我们的定点数最大值约 2^31，平方约 2^62，可能会丢失低位精度，但在 2^43 (4e12) 范围内绝对安全
          // 屏幕坐标 1000 * 1024 ≈ 1e6，平方 1e12 < 2^53，安全

          var product = this._value * other._value;
          var result = product / FixedPoint.FRACTION_SCALE | 0;
          return new FixedPoint(result);
        }

        /**
         * 除法（使用移位优化）
         * (a / b) * SCALE = (a << FRACTION_BITS) / b
         */;
        _proto.div = function div(other) {
          if (other._value === 0) {
            throw new Error("Division by zero");
          }
          // 除法：先左移 10 位再除，相当于乘以 SCALE
          // 注意：左移可能导致溢出，但这是定点数的限制
          var result = (this._value << FixedPoint.FRACTION_BITS) / other._value | 0;
          return new FixedPoint(result);
        }

        // ==================== 整数运算（避免创建临时对象） ====================

        /** 加整数 */;
        _proto.addI = function addI(i) {
          return new FixedPoint(this._value + ((i | 0) << FixedPoint.FRACTION_BITS) | 0);
        }

        /** 减整数 */;
        _proto.subI = function subI(i) {
          return new FixedPoint(this._value - ((i | 0) << FixedPoint.FRACTION_BITS) | 0);
        }

        /** 乘整数（标量乘法，无需移位） */;
        _proto.mulI = function mulI(i) {
          return new FixedPoint(this._value * (i | 0) | 0);
        }

        /** 除整数（标量除法，无需移位） */;
        _proto.divI = function divI(i) {
          if (i === 0) throw new Error("Division by zero");
          return new FixedPoint(this._value / (i | 0) | 0);
        }

        // ==================== 整数比较 ====================

        /** 小于整数 */;
        _proto.ltI = function ltI(i) {
          return this._value < (i | 0) << FixedPoint.FRACTION_BITS;
        }

        /** 小于等于整数 */;
        _proto.lteI = function lteI(i) {
          return this._value <= (i | 0) << FixedPoint.FRACTION_BITS;
        }

        /** 大于整数 */;
        _proto.gtI = function gtI(i) {
          return this._value > (i | 0) << FixedPoint.FRACTION_BITS;
        }

        /** 大于等于整数 */;
        _proto.gteI = function gteI(i) {
          return this._value >= (i | 0) << FixedPoint.FRACTION_BITS;
        }

        /** 等于整数 */;
        _proto.eqI = function eqI(i) {
          return this._value === (i | 0) << FixedPoint.FRACTION_BITS;
        }

        /** 不等于整数 */;
        _proto.neI = function neI(i) {
          return this._value !== (i | 0) << FixedPoint.FRACTION_BITS;
        }

        // ==================== 就地修改（不创建新对象） ====================

        /** 就地加法 */;
        _proto.add_ = function add_(other) {
          this._value = this._value + other._value | 0;
          return this;
        }

        /** 就地减法 */;
        _proto.sub_ = function sub_(other) {
          this._value = this._value - other._value | 0;
          return this;
        }

        /** 就地乘法 */;
        _proto.mul_ = function mul_(other) {
          this._value = (this._value * other._value | 0) >> FixedPoint.FRACTION_BITS;
          return this;
        }

        /** 就地除法 */;
        _proto.div_ = function div_(other) {
          if (other._value === 0) throw new Error("Division by zero");
          this._value = (this._value << FixedPoint.FRACTION_BITS) / other._value | 0;
          return this;
        }

        /** 就地加整数 */;
        _proto.addI_ = function addI_(i) {
          this._value = this._value + ((i | 0) << FixedPoint.FRACTION_BITS) | 0;
          return this;
        }

        /** 就地减整数 */;
        _proto.subI_ = function subI_(i) {
          this._value = this._value - ((i | 0) << FixedPoint.FRACTION_BITS) | 0;
          return this;
        }

        /** 就地乘整数 */;
        _proto.mulI_ = function mulI_(i) {
          this._value = this._value * (i | 0) | 0;
          return this;
        }

        /** 就地除整数 */;
        _proto.divI_ = function divI_(i) {
          if (i === 0) throw new Error("Division by zero");
          this._value = this._value / (i | 0) | 0;
          return this;
        }

        /** 就地取反 */;
        _proto.neg_ = function neg_() {
          this._value = -this._value | 0;
          return this;
        }

        /** 就地绝对值 */;
        _proto.abs_ = function abs_() {
          if (this._value < 0) this._value = -this._value | 0;
          return this;
        }

        /** 就地设置值（从 FixedPoint） */;
        _proto.set = function set(other) {
          this._value = other._value;
          return this;
        }

        /** 就地设置值（从整数） */;
        _proto.setI = function setI(i) {
          this._value = (i | 0) << FixedPoint.FRACTION_BITS;
          return this;
        }

        /** 就地设置值（从浮点数） */;
        _proto.setF = function setF(f) {
          this._value = Math.round(f * FixedPoint.FRACTION_SCALE) | 0;
          return this;
        }

        /**
         * 取反
         */;
        _proto.neg = function neg() {
          return new FixedPoint(-this._value | 0);
        }

        /**
         * 绝对值
         */;
        _proto.abs = function abs() {
          return this._value < 0 ? this.neg() : this;
        }

        /**
         * 比较：小于
         */;
        _proto.lt = function lt(other) {
          return this._value < other._value;
        }

        /**
         * 比较：小于等于
         */;
        _proto.lte = function lte(other) {
          return this._value <= other._value;
        }

        /**
         * 比较：大于
         */;
        _proto.gt = function gt(other) {
          return this._value > other._value;
        }

        /**
         * 比较：大于等于
         */;
        _proto.gte = function gte(other) {
          return this._value >= other._value;
        }

        /**
         * 比较：等于
         */;
        _proto.eq = function eq(other) {
          return this._value === other._value;
        }

        /**
         * 比较：不等于
         */;
        _proto.ne = function ne(other) {
          return this._value !== other._value;
        }

        /**
         * 取最小值
         */;
        FixedPoint.min = function min(a, b) {
          return a.lt(b) ? a : b;
        }

        /**
         * 取最大值
         */;
        FixedPoint.max = function max(a, b) {
          return a.gt(b) ? a : b;
        }

        /**
         * 限制在范围内
         */;
        _proto.clamp = function clamp(min, max) {
          if (this.lt(min)) return min;
          if (this.gt(max)) return max;
          return this;
        }

        /**
         * 线性插值
         */;
        FixedPoint.lerp = function lerp(a, b, t) {
          // lerp = a + (b - a) * t
          return a.add(b.sub(a).mul(t));
        }

        /**
         * 克隆
         */;
        _proto.clone = function clone() {
          return FixedPoint.fromRaw(this._value);
        }

        /**
         * 转换为字符串（用于调试）
         */;
        _proto.toString = function toString() {
          return this.toFloat().toString();
        }

        /**
         * 获取常量：精度（小数位精度）
         */;
        _createClass(FixedPoint, null, [{
          key: "PRECISION",
          get: function get() {
            return 1.0 / FixedPoint.FRACTION_SCALE;
          }

          /**
           * 获取常量：整数最大值
           */
        }, {
          key: "MAX_INTEGER",
          get: function get() {
            return FixedPoint.INTEGER_MAX;
          }

          /**
           * 获取常量：整数最小值
           */
        }, {
          key: "MIN_INTEGER",
          get: function get() {
            return FixedPoint.INTEGER_MIN;
          }
        }]);
        return FixedPoint;
      }());
      _class = FixedPoint;
      FixedPoint.FRACTION_BITS = 10;
      FixedPoint.FRACTION_MASK = (1 << 10) - 1;
      // 0x3FF
      FixedPoint.FRACTION_SCALE = 1 << 10;
      // 1024
      FixedPoint.INTEGER_BITS = 21;
      FixedPoint.INTEGER_MAX = (1 << 20) - 1;
      // 1048575
      FixedPoint.INTEGER_MIN = -(1 << 20);
      // -1048576
      FixedPoint.MAX_VALUE = _class.INTEGER_MAX << _class.FRACTION_BITS | _class.FRACTION_MASK;
      FixedPoint.MIN_VALUE = _class.INTEGER_MIN << _class.FRACTION_BITS;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FPMath.ts", ['cc', './FixedPoint.ts', './FPMathTables.ts'], function (exports) {
  var cclegacy, FixedPoint, FP_PI_RAW, FP_PI2_RAW, FP_PI_HALF_RAW, FP_SCALE, SIN_TABLE, ASIN_TABLE, TABLE_SIZE;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FP_PI_RAW = module.FP_PI_RAW;
      FP_PI2_RAW = module.FP_PI2_RAW;
      FP_PI_HALF_RAW = module.FP_PI_HALF_RAW;
      FP_SCALE = module.FP_SCALE;
      SIN_TABLE = module.SIN_TABLE;
      ASIN_TABLE = module.ASIN_TABLE;
      TABLE_SIZE = module.TABLE_SIZE;
    }],
    execute: function () {
      cclegacy._RF.push({}, "daa72dDRFxEWrQslFQQolrA", "FPMath", undefined);

      /**
       * 定点数数学库（纯整数运算，无浮点）
       * - 稳定随机数生成器（基于整数种子）
       * - 快速平方根算法（整数牛顿迭代）
       * - 查表法三角函数（四象限压缩）
       */
      var FPMath = exports('FPMath', /*#__PURE__*/function () {
        function FPMath() {}
        /** 设置随机种子 */
        FPMath.setSeed = function setSeed(seed) {
          FPMath._seed = seed | 0 || 1;
        }

        /** 获取当前种子 */;
        FPMath.getSeed = function getSeed() {
          return FPMath._seed;
        }

        /**
         * 生成下一个随机整数（LCG 线性同余算法）
         * 范围：0 到 2^31 - 1
         */;
        FPMath.randomInt = function randomInt() {
          // LCG 参数（来自 Numerical Recipes）
          FPMath._seed = FPMath._seed * 1103515245 + 12345 & 0x7FFFFFFF | 0;
          return FPMath._seed;
        }

        /**
         * 生成 [0, max) 范围的随机整数
         */;
        FPMath.randomIntRange = function randomIntRange(max) {
          return FPMath.randomInt() % max | 0;
        }

        /**
         * 生成 [min, max) 范围的随机整数
         */;
        FPMath.randomIntBetween = function randomIntBetween(min, max) {
          return min + FPMath.randomIntRange(max - min) | 0;
        }

        /**
         * 生成 [0, 1) 范围的随机定点数
         */;
        FPMath.random = function random() {
          // raw = randomInt * 1024 / 0x7FFFFFFF
          // 简化为 raw = randomInt >> 21（近似）
          return FixedPoint.fromRaw(FPMath.randomInt() >> 21 | 0);
        }

        /**
         * 生成 [min, max) 范围的随机定点数
         */;
        FPMath.randomRange = function randomRange(min, max) {
          return min.add(max.sub(min).mul(FPMath.random()));
        }

        // ==================== 基础数学 ====================

        /** 平方 */;
        FPMath.square = function square(x) {
          return x.mul(x);
        }

        /**
         * 快速平方根（纯整数运算，确定性）
         * 
         * 算法：sqrt(x) = sqrt(raw / SCALE) * SCALE
         *            = sqrt(raw) / sqrt(SCALE) * SCALE
         *            = sqrt(raw) * sqrt(SCALE)
         *            = sqrt(raw) * 32  (因为 sqrt(1024) = 32)
         * 
         * 这避免了 raw * SCALE 可能导致的溢出
         */;
        FPMath.sqrt = function sqrt(x) {
          var raw = x.getRaw();
          if (raw <= 0) return FixedPoint.zero();

          // 使用整数牛顿迭代求 sqrt(raw)
          var guess = raw >> 1;
          if (guess === 0) guess = 1;

          // 牛顿迭代：guess = (guess + raw / guess) / 2
          for (var i = 0; i < 16; i++) {
            var newGuess = guess + (raw / guess | 0) >> 1 | 0;
            if (newGuess >= guess) break;
            guess = newGuess;
          }

          // 乘以 sqrt(SCALE) = sqrt(1024) = 32
          return FixedPoint.fromRaw(guess * 32 | 0);
        }

        /**
         * 快速倒数平方根（用于归一化向量）
         * rsqrt(x) = 1 / sqrt(x)
         */;
        FPMath.rsqrt = function rsqrt(x) {
          var sqrtX = FPMath.sqrt(x);
          if (sqrtX.getRaw() === 0) return FixedPoint.zero();
          return FixedPoint.one().div(sqrtX);
        }

        // ==================== 三角函数（查表法，纯整数） ====================

        /**
         * 正弦函数（查表 + 线性插值）
         * @param angle 弧度（FixedPoint）
         */;
        FPMath.sin = function sin(angle) {
          var raw = angle.getRaw();

          // 归一化到 [0, 2π)
          var pi2Raw = FP_PI2_RAW;
          raw = raw % pi2Raw;
          if (raw < 0) raw += pi2Raw;

          // 确定象限（0-3）
          var piHalfRaw = FP_PI_HALF_RAW;
          var quadrant = raw / piHalfRaw | 0;
          var normalized = raw % piHalfRaw;

          // 第二、四象限需要镜像
          if (quadrant === 1 || quadrant === 3) {
            normalized = piHalfRaw - normalized;
          }

          // 计算表索引：index = normalized / (π/2) * TABLE_SIZE
          // = normalized * TABLE_SIZE / piHalfRaw
          var indexScaled = normalized * TABLE_SIZE | 0;
          var i0 = indexScaled / piHalfRaw | 0;
          var i1 = Math.min(i0 + 1, TABLE_SIZE);

          // 线性插值（整数运算）
          // t = (indexScaled % piHalfRaw) / piHalfRaw
          var tNum = indexScaled % piHalfRaw;
          // result = table[i0] + (table[i1] - table[i0]) * t
          // result = table[i0] + (table[i1] - table[i0]) * tNum / piHalfRaw
          var result = SIN_TABLE[i0] + ((SIN_TABLE[i1] - SIN_TABLE[i0]) * tNum / piHalfRaw | 0);

          // 第三、四象限为负
          if (quadrant >= 2) {
            result = -result;
          }
          return FixedPoint.fromRaw(result);
        }

        /**
         * 余弦函数
         * @param angle 弧度
         */;
        FPMath.cos = function cos(angle) {
          // cos(x) = sin(x + π/2)
          return FPMath.sin(FixedPoint.fromRaw(angle.getRaw() + FP_PI_HALF_RAW));
        }

        /**
         * 正切函数
         * @param angle 弧度
         */;
        FPMath.tan = function tan(angle) {
          var cosVal = FPMath.cos(angle);
          if (cosVal.getRaw() === 0) {
            // 接近无穷，返回最大值
            return FixedPoint.fromInt(FixedPoint.MAX_INTEGER);
          }
          return FPMath.sin(angle).div(cosVal);
        }

        /**
         * 反正弦函数（查表 + 插值）
         * @param x 值域 [-1, 1]（FixedPoint）
         * @returns 弧度 [-π/2, π/2]
         */;
        FPMath.asin = function asin(x) {
          var raw = x.getRaw();

          // 限制范围 [-1, 1]，即 raw 在 [-1024, 1024]
          if (raw < -FP_SCALE) raw = -FP_SCALE;
          if (raw > FP_SCALE) raw = FP_SCALE;
          var sign = raw < 0 ? -1 : 1;
          raw = raw < 0 ? -raw : raw;

          // 计算表索引：index = (raw / SCALE) * TABLE_SIZE = raw * TABLE_SIZE / SCALE
          var indexScaled = raw * TABLE_SIZE | 0;
          var i0 = indexScaled / FP_SCALE | 0;
          var i1 = Math.min(i0 + 1, TABLE_SIZE);

          // 线性插值
          var tNum = indexScaled % FP_SCALE;
          var result = ASIN_TABLE[i0] + ((ASIN_TABLE[i1] - ASIN_TABLE[i0]) * tNum / FP_SCALE | 0);
          return FixedPoint.fromRaw(result * sign);
        }

        /**
         * 反余弦函数
         * @param x 值域 [-1, 1]
         * @returns 弧度 [0, π]
         */;
        FPMath.acos = function acos(x) {
          // acos(x) = π/2 - asin(x)
          return FixedPoint.fromRaw(FP_PI_HALF_RAW - FPMath.asin(x).getRaw());
        }

        /**
         * 反正切函数
         * @returns 弧度 [-π/2, π/2]
         */;
        FPMath.atan = function atan(x) {
          // 使用恒等式: atan(x) = asin(x / sqrt(1 + x^2))
          var xSq = x.mul(x);
          var denom = FPMath.sqrt(FixedPoint.one().add(xSq));
          if (denom.getRaw() === 0) return FixedPoint.zero();
          return FPMath.asin(x.div(denom));
        }

        /**
         * 反正切函数（双参数版本，纯整数实现）
         * @returns 弧度 [-π, π]
         */;
        FPMath.atan2 = function atan2(y, x) {
          var xRaw = x.getRaw();
          var yRaw = y.getRaw();
          if (xRaw === 0 && yRaw === 0) {
            return FixedPoint.zero();
          }

          // 计算 atan(y/x)，然后根据象限调整
          if (xRaw > 0) {
            return FPMath.atan(y.div(x));
          } else if (xRaw < 0) {
            if (yRaw >= 0) {
              return FPMath.atan(y.div(x)).add(FPMath.PI);
            } else {
              return FPMath.atan(y.div(x)).sub(FPMath.PI);
            }
          } else {
            // x === 0
            if (yRaw > 0) {
              return FPMath.PI_HALF;
            } else {
              return FixedPoint.fromRaw(-FP_PI_HALF_RAW);
            }
          }
        }

        // ==================== 角度弧度转换 ====================

        /** 角度转弧度 */;
        FPMath.degToRad = function degToRad(deg) {
          return deg.mul(FPMath.DEG2RAD);
        }

        /** 弧度转角度 */;
        FPMath.radToDeg = function radToDeg(rad) {
          return rad.mul(FPMath.RAD2DEG);
        }

        // ==================== 工具函数 ====================

        /** 绝对值 */;
        FPMath.abs = function abs(x) {
          return x.abs();
        }

        /** 取符号 */;
        FPMath.sign = function sign(x) {
          var raw = x.getRaw();
          if (raw > 0) return FixedPoint.one();
          if (raw < 0) return FixedPoint.fromInt(-1);
          return FixedPoint.zero();
        }

        /** 向下取整 */;
        FPMath.floor = function floor(x) {
          return FixedPoint.fromInt(x.toInt());
        }

        /** 向上取整 */;
        FPMath.ceil = function ceil(x) {
          var raw = x.getRaw();
          var intPart = raw >> 10 | 0;
          var fracPart = raw & 0x3FF;
          if (fracPart > 0) {
            return FixedPoint.fromInt(intPart + 1);
          }
          return FixedPoint.fromInt(intPart);
        }

        /** 四舍五入 */;
        FPMath.round = function round(x) {
          // 加 0.5 然后向下取整
          var raw = x.getRaw();
          return FixedPoint.fromInt(raw + 512 >> 10 | 0);
        }

        /** 限制范围 */;
        FPMath.clamp = function clamp(x, min, max) {
          return x.clamp(min, max);
        }

        /** 线性插值 */;
        FPMath.lerp = function lerp(a, b, t) {
          return FixedPoint.lerp(a, b, t);
        }

        /** 最小值 */;
        FPMath.min = function min(a, b) {
          return FixedPoint.min(a, b);
        }

        /** 最大值 */;
        FPMath.max = function max(a, b) {
          return FixedPoint.max(a, b);
        };
        return FPMath;
      }());
      // ==================== 常量（使用预计算 raw 值） ====================
      /** 圆周率 π */
      FPMath.PI = FixedPoint.fromRaw(FP_PI_RAW);
      /** 圆周率 * 2 */
      FPMath.PI2 = FixedPoint.fromRaw(FP_PI2_RAW);
      /** 圆周率 / 2 */
      FPMath.PI_HALF = FixedPoint.fromRaw(FP_PI_HALF_RAW);
      /** 角度转弧度系数 π/180 ≈ 0.01745 → raw = 18 */
      FPMath.DEG2RAD = FixedPoint.fromRaw(18);
      /** 弧度转角度系数 180/π ≈ 57.2958 → raw = 58671 */
      FPMath.RAD2DEG = FixedPoint.fromRaw(58671);
      // ==================== 随机数生成器 ====================
      FPMath._seed = 1;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FPMathTables.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1eabaXtPNRA5LHsXiOfiiX6", "FPMathTables", undefined);
      /**
       * FPMath 查找表（预计算 FixedPoint raw 值）
       * 
       * - SIN_TABLE: sin(0° ~ 90°)，257 个采样点，存储 FixedPoint raw int 值
       * - ASIN_TABLE: asin(0 ~ 1)，257 个采样点，存储 FixedPoint raw int 值
       * 
       * raw 值 = Math.round(float * 1024)，其中 1024 = 2^10 是 FixedPoint 的精度
       * 利用四象限对称性，只需存储第一象限数据
       */

      /** 表大小 */
      var TABLE_SIZE = exports('TABLE_SIZE', 256);

      /** FixedPoint 精度位数 */
      var FP_FRACTION_BITS = exports('FP_FRACTION_BITS', 10);

      /** FixedPoint 精度 */
      var FP_SCALE = exports('FP_SCALE', 1 << FP_FRACTION_BITS); // 1024

      /** π 的 raw 值 */
      var FP_PI_RAW = exports('FP_PI_RAW', 3217); // Math.round(Math.PI * 1024)

      /** π/2 的 raw 值 */
      var FP_PI_HALF_RAW = exports('FP_PI_HALF_RAW', 1608); // Math.round(Math.PI / 2 * 1024)

      /** 2π 的 raw 值 */
      var FP_PI2_RAW = exports('FP_PI2_RAW', 6434); // Math.round(Math.PI * 2 * 1024)

      /**
       * 正弦查找表（0° ~ 90°）
       * 索引 i 对应角度 = i / 256 * 90°
       * 值 = round(sin(角度) * 1024)
       */
      var SIN_TABLE = exports('SIN_TABLE', [0, 6, 13, 19, 25, 31, 38, 44, 50, 57, 63, 69, 75, 82, 88, 94, 100, 107, 113, 119, 125, 132, 138, 144, 150, 156, 163, 169, 175, 181, 187, 194, 200, 206, 212, 218, 224, 230, 237, 243, 249, 255, 261, 267, 273, 279, 285, 291, 297, 303, 309, 315, 321, 327, 333, 339, 345, 351, 357, 363, 368, 374, 380, 386, 392, 398, 403, 409, 415, 421, 426, 432, 438, 443, 449, 455, 460, 466, 471, 477, 483, 488, 494, 499, 505, 510, 516, 521, 527, 532, 537, 543, 548, 553, 559, 564, 569, 574, 580, 585, 590, 595, 600, 605, 610, 615, 620, 625, 630, 635, 640, 645, 650, 655, 659, 664, 669, 674, 678, 683, 688, 692, 697, 701, 706, 710, 715, 719, 724, 728, 733, 737, 741, 746, 750, 754, 759, 763, 767, 771, 775, 779, 784, 788, 792, 796, 800, 804, 807, 811, 815, 819, 823, 827, 830, 834, 838, 841, 845, 849, 852, 856, 859, 863, 866, 870, 873, 876, 880, 883, 886, 890, 893, 896, 899, 903, 906, 909, 912, 915, 918, 921, 924, 927, 930, 933, 936, 939, 941, 944, 947, 950, 952, 955, 958, 960, 963, 965, 968, 970, 973, 975, 978, 980, 982, 985, 987, 989, 992, 994, 996, 998, 1000, 1002, 1004, 1006, 1008, 1010, 1012, 1014, 1016, 1018, 1020, 1022, 1023, 1023, 1023, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024]);

      /**
       * 反正弦查找表（输入 0 ~ 1，输出 0 ~ π/2 弧度）
       * 索引 i 对应输入值 = i / 256
       * 值 = round(asin(输入值) * 1024)
       */
      var ASIN_TABLE = exports('ASIN_TABLE', [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 221, 225, 229, 233, 237, 241, 245, 249, 253, 257, 261, 265, 270, 274, 278, 282, 286, 290, 295, 299, 303, 307, 312, 316, 320, 324, 329, 333, 337, 342, 346, 350, 355, 359, 363, 368, 372, 377, 381, 386, 390, 395, 399, 404, 408, 413, 418, 422, 427, 432, 436, 441, 446, 451, 455, 460, 465, 470, 475, 480, 485, 490, 495, 500, 505, 510, 515, 520, 525, 531, 536, 541, 547, 552, 558, 563, 569, 574, 580, 586, 592, 597, 603, 609, 615, 621, 628, 634, 640, 647, 653, 660, 666, 673, 680, 687, 694, 701, 709, 716, 724, 731, 739, 747, 755, 764, 772, 781, 790, 799, 808, 818, 828, 838, 848, 859, 870, 882, 894, 906, 919, 933, 947, 962, 978, 995, 1013, 1032, 1053, 1076, 1102, 1131, 1165, 1207, 1265, 1363, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FPVector2.ts", ['cc', './FixedPoint.ts', './FPMath.ts'], function (exports) {
  var cclegacy, FixedPoint, FPMath;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPMath = module.FPMath;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d731dqQnbJGop8jZkf9LT6N", "FPVector2", undefined);

      /**
       * 基于定点数的二维向量类
       */
      var FPVector2 = exports('FPVector2', /*#__PURE__*/function () {
        function FPVector2(x, y) {
          this.x = void 0;
          this.y = void 0;
          this.x = x;
          this.y = y;
        }

        // ==================== 静态工厂方法 ====================

        /** 从浮点数创建 */
        FPVector2.fromFloat = function fromFloat(x, y) {
          return new FPVector2(FixedPoint.fromFloat(x), FixedPoint.fromFloat(y));
        }

        /** 从整数创建 */;
        FPVector2.fromInt = function fromInt(x, y) {
          return new FPVector2(FixedPoint.fromInt(x), FixedPoint.fromInt(y));
        }

        /** 从原始 int32 值创建 */;
        FPVector2.fromRaw = function fromRaw(rawX, rawY) {
          return new FPVector2(FixedPoint.fromRaw(rawX), FixedPoint.fromRaw(rawY));
        }

        /** 零向量 */;
        FPVector2.zero = function zero() {
          return new FPVector2(FixedPoint.zero(), FixedPoint.zero());
        }

        /** 单位向量 (1, 1) */;
        FPVector2.one = function one() {
          return new FPVector2(FixedPoint.one(), FixedPoint.one());
        }

        /** 向上 (0, 1) */;
        FPVector2.up = function up() {
          return new FPVector2(FixedPoint.zero(), FixedPoint.one());
        }

        /** 向下 (0, -1) */;
        FPVector2.down = function down() {
          return new FPVector2(FixedPoint.zero(), FixedPoint.fromInt(-1));
        }

        /** 向左 (-1, 0) */;
        FPVector2.left = function left() {
          return new FPVector2(FixedPoint.fromInt(-1), FixedPoint.zero());
        }

        /** 向右 (1, 0) */;
        FPVector2.right = function right() {
          return new FPVector2(FixedPoint.one(), FixedPoint.zero());
        }

        // ==================== 向量运算（返回新对象） ====================

        /** 向量加法 */;
        var _proto = FPVector2.prototype;
        _proto.add = function add(other) {
          return new FPVector2(this.x.add(other.x), this.y.add(other.y));
        }

        /** 向量减法 */;
        _proto.sub = function sub(other) {
          return new FPVector2(this.x.sub(other.x), this.y.sub(other.y));
        }

        /** 标量乘法 */;
        _proto.mul = function mul(scalar) {
          return new FPVector2(this.x.mul(scalar), this.y.mul(scalar));
        }

        /** 标量除法 */;
        _proto.div = function div(scalar) {
          return new FPVector2(this.x.div(scalar), this.y.div(scalar));
        }

        /** 整数标量乘法 */;
        _proto.mulI = function mulI(i) {
          return new FPVector2(this.x.mulI(i), this.y.mulI(i));
        }

        /** 整数标量除法 */;
        _proto.divI = function divI(i) {
          return new FPVector2(this.x.divI(i), this.y.divI(i));
        }

        /** 取反 */;
        _proto.neg = function neg() {
          return new FPVector2(this.x.neg(), this.y.neg());
        }

        // ==================== 就地修改（不创建新对象） ====================

        /** 就地加法 */;
        _proto.add_ = function add_(other) {
          this.x.add_(other.x);
          this.y.add_(other.y);
          return this;
        }

        /** 就地减法 */;
        _proto.sub_ = function sub_(other) {
          this.x.sub_(other.x);
          this.y.sub_(other.y);
          return this;
        }

        /** 就地标量乘法 */;
        _proto.mul_ = function mul_(scalar) {
          this.x.mul_(scalar);
          this.y.mul_(scalar);
          return this;
        }

        /** 就地标量除法 */;
        _proto.div_ = function div_(scalar) {
          this.x.div_(scalar);
          this.y.div_(scalar);
          return this;
        }

        /** 就地整数标量乘法 */;
        _proto.mulI_ = function mulI_(i) {
          this.x.mulI_(i);
          this.y.mulI_(i);
          return this;
        }

        /** 就地整数标量除法 */;
        _proto.divI_ = function divI_(i) {
          this.x.divI_(i);
          this.y.divI_(i);
          return this;
        }

        /** 就地取反 */;
        _proto.neg_ = function neg_() {
          this.x.neg_();
          this.y.neg_();
          return this;
        }

        /** 就地设置值 */;
        _proto.set = function set(other) {
          this.x.set(other.x);
          this.y.set(other.y);
          return this;
        }

        /** 就地设置值（从两个 FixedPoint） */;
        _proto.setXY = function setXY(x, y) {
          this.x.set(x);
          this.y.set(y);
          return this;
        }

        /** 就地设置值（从整数） */;
        _proto.setI = function setI(x, y) {
          this.x.setI(x);
          this.y.setI(y);
          return this;
        }

        /** 就地设置值（从浮点数） */;
        _proto.setF = function setF(x, y) {
          this.x.setF(x);
          this.y.setF(y);
          return this;
        }

        // ==================== 向量运算 ====================

        /** 点积 */;
        _proto.dot = function dot(other) {
          return this.x.mul(other.x).add(this.y.mul(other.y));
        }

        /** 叉积（2D 返回标量，即 z 分量） */;
        _proto.cross = function cross(other) {
          return this.x.mul(other.y).sub(this.y.mul(other.x));
        }

        /** 长度平方（避免开方） */;
        _proto.lengthSq = function lengthSq() {
          return this.x.mul(this.x).add(this.y.mul(this.y));
        }

        /** 长度（纯定点数运算，使用 FPMath.sqrt） */;
        _proto.length = function length() {
          return FPMath.sqrt(this.lengthSq());
        }

        /** 归一化（返回新向量） */;
        _proto.normalize = function normalize() {
          var len = this.length();
          if (len.eqI(0)) return FPVector2.zero();
          return this.div(len);
        }

        /** 就地归一化 */;
        _proto.normalize_ = function normalize_() {
          var len = this.length();
          if (!len.eqI(0)) {
            this.div_(len);
          }
          return this;
        }

        /** 两点间距离平方 */;
        _proto.distanceSq = function distanceSq(other) {
          var dx = this.x.sub(other.x);
          var dy = this.y.sub(other.y);
          return dx.mul(dx).add(dy.mul(dy));
        }

        /** 两点间距离（纯定点数运算，使用 FPMath.sqrt） */;
        _proto.distance = function distance(other) {
          return FPMath.sqrt(this.distanceSq(other));
        }

        // ==================== 比较 ====================

        /** 相等 */;
        _proto.eq = function eq(other) {
          return this.x.eq(other.x) && this.y.eq(other.y);
        }

        /** 不相等 */;
        _proto.ne = function ne(other) {
          return !this.eq(other);
        }

        // ==================== 静态方法 ====================

        /** 线性插值 */;
        FPVector2.lerp = function lerp(a, b, t) {
          return new FPVector2(FixedPoint.lerp(a.x, b.x, t), FixedPoint.lerp(a.y, b.y, t));
        }

        /** 取最小分量 */;
        FPVector2.min = function min(a, b) {
          return new FPVector2(FixedPoint.min(a.x, b.x), FixedPoint.min(a.y, b.y));
        }

        /** 取最大分量 */;
        FPVector2.max = function max(a, b) {
          return new FPVector2(FixedPoint.max(a.x, b.x), FixedPoint.max(a.y, b.y));
        }

        // ==================== 工具方法 ====================

        /** 克隆 */;
        _proto.clone = function clone() {
          return new FPVector2(FixedPoint.fromRaw(this.x.getRaw()), FixedPoint.fromRaw(this.y.getRaw()));
        }

        /** 转换为字符串 */;
        _proto.toString = function toString() {
          return "(" + this.x.toFloat() + ", " + this.y.toFloat() + ")";
        };
        return FPVector2;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FrameBuffer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './BattleLogger.ts', './SyncConfig.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, TickerManager, battleLog, DEFAULT_TICK_RATE, DEFAULT_TICK_INTERVAL, DEFAULT_CHASE_THRESHOLD, DEFAULT_MAX_CHASE_PER_TICK, DEFAULT_MAX_DT_MS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TickerManager = module.TickerManager;
    }, function (module) {
      battleLog = module.battleLog;
    }, function (module) {
      DEFAULT_TICK_RATE = module.DEFAULT_TICK_RATE;
      DEFAULT_TICK_INTERVAL = module.DEFAULT_TICK_INTERVAL;
      DEFAULT_CHASE_THRESHOLD = module.DEFAULT_CHASE_THRESHOLD;
      DEFAULT_MAX_CHASE_PER_TICK = module.DEFAULT_MAX_CHASE_PER_TICK;
      DEFAULT_MAX_DT_MS = module.DEFAULT_MAX_DT_MS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "40f05QiojhCPKwD+bH33z2F", "FrameBuffer", undefined);

      /**
       * 单帧输入数据
       */

      /**
       * 单帧所有玩家输入
       */

      /**
       * FrameBuffer 配置
       */

      var FrameBuffer = exports('FrameBuffer', /*#__PURE__*/function () {
        function FrameBuffer(config) {
          // 配置（使用 SyncConfig 默认值）
          this._tickRate = DEFAULT_TICK_RATE;
          this._tickInterval = DEFAULT_TICK_INTERVAL;
          this._chaseThreshold = DEFAULT_CHASE_THRESHOLD;
          this._skipViewThreshold = 5;
          // 跳过表现阈值
          this._maxChasePerTick = DEFAULT_MAX_CHASE_PER_TICK;
          this._maxDtMs = DEFAULT_MAX_DT_MS;
          this._lockstep = false;
          this._expectedPlayers = new Set();
          // 状态
          this._currentTick = 0;
          // 当前已执行帧
          this._latestTick = 0;
          // 收到的最新帧号
          this._inputBuffer = new Map();
          // tick -> (playerId -> commands)
          this._isChasing = false;
          // 当前是否处于追帧状态
          // 循环相关
          this._running = false;
          this._accumulator = 0;
          // 回调
          /** 帧执行回调，isChasing=true时表现层应跳过动画 */
          this.onFrame = null;
          if (config) {
            if (config.tickRate !== undefined) {
              this._tickRate = config.tickRate;
              this._tickInterval = 1000 / config.tickRate;
            }
            if (config.chaseThreshold !== undefined) {
              this._chaseThreshold = config.chaseThreshold;
            }
            if (config.maxChasePerTick !== undefined) {
              this._maxChasePerTick = config.maxChasePerTick;
            }
            if (config.lockstep !== undefined) {
              this._lockstep = config.lockstep;
            }
          }
        }

        // ==================== Getters ====================

        /** 当前已执行帧号 */
        var _proto = FrameBuffer.prototype;
        /** 设置期待的玩家ID列表（用于强同步） */
        _proto.setExpectedPlayers = function setExpectedPlayers(pids) {
          this._expectedPlayers = new Set(pids);
        }

        // ==================== 输入管理 ====================

        /**
         * 推入单个输入
         */;
        _proto.pushInput = function pushInput(input) {
          var tick = input.tick,
            playerId = input.playerId,
            commands = input.commands;
          if (input.commands.length > 0) battleLog.debug("[FrameBuffer] Received Input for Tick: " + tick + " from " + playerId);
          if (!this._inputBuffer.has(tick)) {
            this._inputBuffer.set(tick, new Map());
          }
          this._inputBuffer.get(tick).set(playerId, commands);

          // 更新最新帧号
          if (tick > this._latestTick) {
            this._latestTick = tick;
          }
        }

        /**
         * 推入整帧数据
         */;
        _proto.pushFrame = function pushFrame(frameData) {
          var tick = frameData.tick,
            inputs = frameData.inputs;
          if (!this._inputBuffer.has(tick)) {
            this._inputBuffer.set(tick, new Map());
          }
          var frameInputs = this._inputBuffer.get(tick);
          inputs.forEach(function (commands, playerId) {
            frameInputs.set(playerId, commands);
          });
          if (tick > this._latestTick) {
            this._latestTick = tick;
          }
        }

        /**
         * 获取 Buffer 深度（待执行帧数）
         */;
        _proto.getBufferDepth = function getBufferDepth() {
          return this._latestTick - this._currentTick;
        }

        /**
         * 检查指定帧是否有数据
         */;
        _proto.hasFrame = function hasFrame(tick) {
          return this._inputBuffer.has(tick);
        }

        /**
         * 获取指定帧的输入数据
         */;
        _proto.getFrame = function getFrame(tick) {
          return this._inputBuffer.get(tick);
        }

        // ==================== 执行控制 ====================

        /**
         * 启动循环
         */;
        _proto.start = function start() {
          if (this._running) return;
          this._running = true;
          this._accumulator = 0;
          TickerManager.addTicker(this);
        }

        /**
         * 停止循环
         */;
        _proto.stop = function stop() {
          if (this._running) {
            TickerManager.removeTicker(this);
            this._running = false;
          }
        }

        /**
         * 重置状态
         */;
        _proto.reset = function reset() {
          this.stop();
          this._currentTick = 0;
          this._latestTick = 0;
          this._inputBuffer.clear();
          this._accumulator = 0;
        }

        /**
         * 手动执行一帧（不依赖循环）
         * 返回是否执行成功
         */;
        _proto.manualTick = function manualTick() {
          return this._executeOneTick();
        }

        // ==================== 内部逻辑 ====================
        ;

        _proto.tick = function tick(dt) {
          if (!this._running) return;

          // dt 转毫秒，并限制最大值（防止暂停后巨大 dt 冲击）
          var dtMs = Math.min(dt * 1000, this._maxDtMs);
          this._accumulator += dtMs;

          // 累加器上限：防止无限堆积
          this._accumulator = Math.min(this._accumulator, this._tickInterval * 3);
          var bufferDepth = this.getBufferDepth();

          // 没有可执行帧，等待输入
          if (bufferDepth <= 0) {
            return;
          }

          // 计算本次要执行的帧数
          var framesToExecute = 0;

          // 正常节奏：累加器够一帧，就执行一帧
          if (this._accumulator >= this._tickInterval) {
            framesToExecute = 1;
            this._accumulator -= this._tickInterval;
          }

          // 追帧逻辑：Buffer 深度超标时，额外执行（不消耗累加器）
          if (bufferDepth > this._chaseThreshold) {
            var extraFrames = Math.min(bufferDepth - this._chaseThreshold, this._maxChasePerTick - framesToExecute);
            framesToExecute += extraFrames;
            battleLog.debug("[FrameBuffer] Chasing: depth=" + bufferDepth + ", executing=" + framesToExecute);
          }

          // 判断是否需要跳过表现层
          this._isChasing = bufferDepth > this._skipViewThreshold;

          // 执行帧
          for (var i = 0; i < framesToExecute; i++) {
            if (!this._executeOneTick()) break;
          }
        }

        /**
         * 执行单帧逻辑
         * 返回是否成功执行
         */;
        _proto._executeOneTick = function _executeOneTick() {
          var nextTick = this._currentTick + 1;
          if (!this._inputBuffer.has(nextTick)) {
            return false;
          }
          var inputs = this._inputBuffer.get(nextTick);

          // 强同步模式检查：是否收齐了所有玩家的输入
          if (this._lockstep) {
            for (var _iterator = _createForOfIteratorHelperLoose(this._expectedPlayers), _step; !(_step = _iterator()).done;) {
              var pid = _step.value;
              if (!inputs.has(pid)) {
                return false; // 等待输入
              }
            }
          }

          this._currentTick = nextTick;

          // 回调执行，传递 isChasing 标志
          if (this.onFrame) {
            this.onFrame(nextTick, inputs, this._isChasing);
          }

          // 调试日志（仅有实际指令时打印）
          var hasCommands = false;
          inputs.forEach(function (cmds) {
            if (Array.isArray(cmds) && cmds.length > 0) hasCommands = true;
          });
          if (hasCommands) {
            battleLog.debug("[FrameBuffer] Executed Frame: " + nextTick + (this._isChasing ? ' (chasing)' : ''), inputs);
          }

          // 清理旧帧
          this._inputBuffer["delete"](nextTick - 100);
          return true;
        }

        // ==================== 调试工具 ====================

        /**
         * 获取 Buffer 状态快照（调试用）
         */;
        _proto.getDebugInfo = function getDebugInfo() {
          return {
            currentTick: this._currentTick,
            latestTick: this._latestTick,
            bufferDepth: this.getBufferDepth(),
            bufferedFrames: Array.from(this._inputBuffer.keys()).sort(function (a, b) {
              return a - b;
            })
          };
        };
        _createClass(FrameBuffer, [{
          key: "currentTick",
          get: function get() {
            return this._currentTick;
          }

          /** 收到的最新帧号 */
        }, {
          key: "latestTick",
          get: function get() {
            return this._latestTick;
          }

          /** 帧率 */
        }, {
          key: "tickRate",
          get: function get() {
            return this._tickRate;
          }

          /** 帧间隔（ms） */
        }, {
          key: "tickInterval",
          get: function get() {
            return this._tickInterval;
          }

          /** 是否运行中 */
        }, {
          key: "running",
          get: function get() {
            return this._running;
          }
        }]);
        return FrameBuffer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FrameSyncManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './NetworkLogger.ts', './TransportFactory.ts', './SyncConfig.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, TickerManager, Timer, mk_instance_base, networkLog, TransportFactory, DEFAULT_TICK_INTERVAL, DEFAULT_PING_INTERVAL, DEFAULT_MAX_DT_MS, DEFAULT_MAX_PRODUCER_LEAD;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TickerManager = module.TickerManager;
      Timer = module.Timer;
      mk_instance_base = module.instance_base;
    }, function (module) {
      networkLog = module.networkLog;
    }, function (module) {
      TransportFactory = module.TransportFactory;
    }, function (module) {
      DEFAULT_TICK_INTERVAL = module.DEFAULT_TICK_INTERVAL;
      DEFAULT_PING_INTERVAL = module.DEFAULT_PING_INTERVAL;
      DEFAULT_MAX_DT_MS = module.DEFAULT_MAX_DT_MS;
      DEFAULT_MAX_PRODUCER_LEAD = module.DEFAULT_MAX_PRODUCER_LEAD;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bf98fGfp9JLR7GH+NsSSSyy", "FrameSyncManager", undefined);

      /** 网络数据包类型 */
      var PacketType = /*#__PURE__*/function (PacketType) {
        PacketType["Input"] = "input";
        PacketType["Ping"] = "ping";
        PacketType["Pong"] = "pong";
        return PacketType;
      }(PacketType || {});
      /**
       * 帧同步网络管理器
       * 
       * 职责：
       * - 管理网络传输层（Transport）生命周期
       * - 生成本地输入心跳
       * - 广播本地输入 & 转发远程输入
       */
      var FrameSyncManager = exports('FrameSyncManager', /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(FrameSyncManager, _instance_base);
        function FrameSyncManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          _this._transport = null;
          _this._isHost = false;
          // Input Production (using SyncConfig defaults)
          _this._tickInterval = DEFAULT_TICK_INTERVAL;
          _this._inputAcc = 0;
          _this._nextInputTick = 1;
          _this._pendingCommands = [];
          _this._running = false;
          _this._localPlayerId = "";
          _this.latency = -1;
          _this._lastPingTime = 0;
          _this._pingInterval = DEFAULT_PING_INTERVAL;
          // Callbacks
          /** 
           * 收到任何输入时的回调（包括本地和远程）
           * 外部（如 BattleLogic）应通过此回调接收数据并推入自己的 Buffer
           */
          _this.onInputReceived = null;
          /** 
           * 获取消费者当前 tick 的回调（用于背压控制）
           * 由外部设置，返回 FrameBuffer.currentTick
           */
          _this.getConsumerTick = null;
          _this.onReady = null;
          _this.onMessage = null;
          // Network Lifecycle Callbacks
          _this.onTransportOpen = null;
          _this.onPlayerConnected = null;
          _this.onPlayerDisconnected = null;
          _this.onTransportError = null;
          // Maximum dt limit (ms) to prevent spike after pause
          _this._maxDtMs = DEFAULT_MAX_DT_MS;
          // Maximum producer lead over consumer (backpressure)
          _this._maxProducerLead = DEFAULT_MAX_PRODUCER_LEAD;
          return _this;
        }
        var _proto = FrameSyncManager.prototype;
        /** 设置逻辑玩家ID（用于心跳包标识） */
        _proto.setLocalPlayerId = function setLocalPlayerId(id) {
          this._localPlayerId = id;
        };
        _proto.initialize = function initialize(config) {
          var _this2 = this;
          this._isHost = !!config.isHost;
          this._transport = TransportFactory.create(config.type);
          this._transport.onOpen = function (id) {
            networkLog.log("[FrameSync] Transport Open. Local ID: " + id);
            if (_this2.onTransportOpen) _this2.onTransportOpen(id);
          };
          this._transport.onConnection = function (peerId) {
            networkLog.log("[FrameSync] Connected to " + peerId);
            if (_this2.onPlayerConnected) _this2.onPlayerConnected(peerId);
            _this2._checkReady();
          };
          this._transport.onData = function (peerId, data) {
            _this2._handleData(peerId, data);
          };
          this._transport.onClose = function (peerId) {
            if (peerId !== 'all') {
              if (_this2.onPlayerDisconnected) _this2.onPlayerDisconnected(peerId);
            }
          };
          this._transport.onError = function (err) {
            if (_this2.onTransportError) _this2.onTransportError(err);
          };
          this._transport.initialize(config);
        };
        _proto.send = function send(msg) {
          if (!this._transport) return;
          this._transport.send(msg);
        };
        _proto.sendTo = function sendTo(peerId, msg) {
          if (!this._transport) return;
          this._transport.sendTo(peerId, msg);
        };
        _proto.connect = function connect(target) {
          if (!this._transport) return;
          this._transport.connect(target);
        };
        _proto.start = function start() {
          if (this._running) {
            networkLog.log("[FrameSync] Heartbeat already running. Skipping reset.");
            return;
          }
          this._running = true;

          // Reset Input State only when STARTING
          this._inputAcc = 0;
          this._nextInputTick = 1;
          this._pendingCommands = [];

          // Start heartbeat ticker
          TickerManager.addTicker(this);
          networkLog.log("[FrameSync] Started heartbeat.");
        };
        _proto.stop = function stop() {
          if (!this._running) return;
          this._running = false;
          TickerManager.removeTicker(this);
          if (this._transport) {
            this._transport.close();
          }
        }

        /**
         * 排队本地指令，将在下一个心跳帧发送
         */;
        _proto.sendInput = function sendInput(commands) {
          if (!this._running) return;
          if (Array.isArray(commands)) {
            var _this$_pendingCommand;
            (_this$_pendingCommand = this._pendingCommands).push.apply(_this$_pendingCommand, commands);
          } else {
            this._pendingCommands.push(commands);
          }
        };
        /** 检查是否处于背压状态（生产者领先消费者太多） */
        _proto._isBackpressured = function _isBackpressured() {
          if (!this.getConsumerTick) return false;
          var consumerTick = this.getConsumerTick();
          var producerLead = this._nextInputTick - consumerTick - 1;
          return producerLead >= this._maxProducerLead;
        };
        _proto.tick = function tick(dt) {
          if (!this._running) return;

          // Backpressure: Check if producer is too far ahead of consumer
          if (this._isBackpressured()) return;

          // Periodic Ping (Latency Tracking)
          var nowSec = Timer.currentTime;
          if (nowSec - this._lastPingTime >= this._pingInterval) {
            this._lastPingTime = nowSec;
            this.send({
              type: PacketType.Ping,
              timestamp: nowSec
            });
          }

          // Input Production (Heartbeat)
          var dtMs = Math.min(dt * 1000, this._maxDtMs);
          this._inputAcc += dtMs;

          // Cap accumulator to prevent infinite loop (max 3 frames worth)
          var tickInterval = this._tickInterval;
          this._inputAcc = Math.min(this._inputAcc, tickInterval * 3);
          while (this._inputAcc >= tickInterval) {
            if (this._isBackpressured()) break;
            this._publishLocalInput();
            this._inputAcc -= tickInterval;
          }
        };
        _proto._publishLocalInput = function _publishLocalInput() {
          var targetTick = this._nextInputTick;
          var cmds = this._pendingCommands.length > 0 ? [].concat(this._pendingCommands) : [];

          // Use logical ID if set, otherwise fallback to transport ID
          var pId = this._localPlayerId || this.myId;
          var input = {
            tick: targetTick,
            playerId: pId,
            commands: cmds
          };
          this._pendingCommands = [];
          this._nextInputTick++;

          // networkLog.log(`[FrameSync] Publishing Tick ${targetTick} as ${pId}`);

          // Notify local listener (e.g. BattleLogic)
          if (this.onInputReceived) {
            this.onInputReceived(input);
          }

          // Broadcast to others
          if (this._transport) {
            this._transport.send({
              type: PacketType.Input,
              data: input
            });
          }
        };
        _proto._handleData = function _handleData(peerId, packet) {
          try {
            switch (packet.type) {
              case PacketType.Input:
                this._handleInputPacket(peerId, packet.data);
                break;
              case PacketType.Ping:
                this.sendTo(peerId, {
                  type: PacketType.Pong,
                  timestamp: packet.timestamp
                });
                break;
              case PacketType.Pong:
                this.latency = Math.round((Timer.currentTime - packet.timestamp) * 1000);
                break;
              default:
                if (this.onMessage) this.onMessage(peerId, packet);
            }
          } catch (e) {
            networkLog.log("[FrameSync] Error handling data", e);
          }
        };
        _proto._handleInputPacket = function _handleInputPacket(peerId, input) {
          var _input$commands;
          // 忽略自己的输入（本地输入已在 _publishLocalInput 中处理）
          var myPlayerId = this._localPlayerId || this.myId;
          if (input.playerId === myPlayerId) return;

          // Notify local listener
          if (this.onInputReceived) {
            this.onInputReceived(input);
          }

          // Debug log for real commands
          if (((_input$commands = input.commands) == null ? void 0 : _input$commands.length) > 0) {
            networkLog.log("[FrameSync] Received Remote commands for tick " + input.tick + " from " + input.playerId);
          }

          // HOST RELAY: forward to everyone except sender
          if (this._isHost && this._transport) {
            this._transport.send({
              type: PacketType.Input,
              data: input
            }, peerId);
          }
        };
        _proto._checkReady = function _checkReady() {
          if (this.onReady) this.onReady();
        };
        _createClass(FrameSyncManager, [{
          key: "transport",
          get: function get() {
            return this._transport;
          }
        }, {
          key: "myId",
          get: function get() {
            return this._transport ? this._transport.id : "";
          }
        }, {
          key: "isRunning",
          get: function get() {
            return this._running;
          }
        }, {
          key: "nextInputTick",
          get: function get() {
            return this._nextInputTick;
          }
        }]);
        return FrameSyncManager;
      }(mk_instance_base));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_CreatePage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_CreatePage.ts', './RoomMgr.ts', './Game_RoomPage.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, BackgroundAdapter, addLogic, GUILogicBase, GUIManager, Toast, Game_CreatePage, roomMgr, Game_RoomPage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BackgroundAdapter = module.BackgroundAdapter;
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
      GUIManager = module.GUIManager;
      Toast = module.Toast;
    }, function (module) {
      Game_CreatePage = module.default;
    }, function (module) {
      roomMgr = module.roomMgr;
    }, function (module) {
      Game_RoomPage = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6c12bDirWZKOKJ7cW2d9mhh", "Game_CreatePage_Logic", undefined);
      var Game_CreatePage_Logic = exports('default', (_dec = addLogic(Game_CreatePage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_CreatePage_Logic, _GUILogicBase);
        function Game_CreatePage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_CreatePage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
          BackgroundAdapter.adaptBackground(this.UI.m_bg.node);
        };
        _proto.onEnable = function onEnable() {
          this.UI.m_createRoomBtn.onClick(this.onCreateRoom, this);
          this.UI.m_joinRoomBtn.onClick(this.onJoinRoom, this);
        };
        _proto.onDisable = function onDisable() {
          this.UI.m_createRoomBtn.offClick(this.onCreateRoom, this);
          this.UI.m_joinRoomBtn.offClick(this.onJoinRoom, this);
        };
        _proto.onCreateRoom = /*#__PURE__*/function () {
          var _onCreateRoom = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  Toast.show("创建房间中...");
                  _context.next = 4;
                  return roomMgr.createRoom();
                case 4:
                  GUIManager.close(this.UI);
                  GUIManager.open(Game_RoomPage);
                  _context.next = 11;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);
                  console.error("Create Room Failed", _context.t0);
                case 11:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[0, 8]]);
          }));
          function onCreateRoom() {
            return _onCreateRoom.apply(this, arguments);
          }
          return onCreateRoom;
        }();
        _proto.onJoinRoom = /*#__PURE__*/function () {
          var _onJoinRoom = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var code;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  code = this.UI.m_roomCodeInput.text;
                  if (code) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  _context2.prev = 3;
                  Toast.show("加入房间中...");
                  _context2.next = 7;
                  return roomMgr.joinRoom(code);
                case 7:
                  GUIManager.close(this.UI);
                  GUIManager.open(Game_RoomPage);
                  _context2.next = 15;
                  break;
                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2["catch"](3);
                  console.error("Join Room Failed", _context2.t0);
                  this.UI.m_roomCodeInput.text = "";
                // Show Toast?
                case 15:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[3, 11]]);
          }));
          function onJoinRoom() {
            return _onJoinRoom.apply(this, arguments);
          }
          return onJoinRoom;
        }();
        return Game_CreatePage_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_CreatePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "17977AgEs5H+4d2pJWB2l8H", "Game_CreatePage", undefined);
      var Game_CreatePage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_CreatePage, _fgui$GComponent);
        function Game_CreatePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_bg = void 0;
          _this.m_createRoomBtn = void 0;
          _this.m_title = void 0;
          _this.m_title2 = void 0;
          _this.m_roomCodeInput = void 0;
          _this.m_joinRoomBtn = void 0;
          return _this;
        }
        Game_CreatePage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "CreatePage");
        };
        var _proto = Game_CreatePage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChild("bg");
          this.m_createRoomBtn = this.getChild("createRoomBtn");
          this.m_title = this.getChild("title");
          this.m_title2 = this.getChild("title2");
          this.m_roomCodeInput = this.getChild("roomCodeInput");
          this.m_joinRoomBtn = this.getChild("joinRoomBtn");
        };
        return Game_CreatePage;
      }(GComponent), _class2.URL = "ui://6gpz43l1naeq10", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RoomPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_RoomPage.ts', './RoomMgr.ts', './Attac_AttactPage.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BackgroundAdapter, GUIManager, Toast, ToastType, GUILogicBase, addLogic, Game_RoomPage, roomMgr, RoomState, Attac_AttactPage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BackgroundAdapter = module.BackgroundAdapter;
      GUIManager = module.GUIManager;
      Toast = module.Toast;
      ToastType = module.ToastType;
      GUILogicBase = module.GUILogicBase;
      addLogic = module.addLogic;
    }, function (module) {
      Game_RoomPage = module.default;
    }, function (module) {
      roomMgr = module.roomMgr;
      RoomState = module.RoomState;
    }, function (module) {
      Attac_AttactPage = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "3c192jB9NNPgr8csQv0Ojmm", "Game_RoomPage_Logic", undefined);
      var Game_RoomPage_Logic = exports('default', (_dec = addLogic(Game_RoomPage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_RoomPage_Logic, _GUILogicBase);
        function Game_RoomPage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_RoomPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          BackgroundAdapter.adaptBackground(this.UI.m_bg.node);
          this.updateRoomInfo();
          roomMgr.evt.on(roomMgr.evt.key.RoomUpdate, this.updateRoomInfo, this);
          roomMgr.evt.on(roomMgr.evt.key.Left, this.onLeftRoom, this);
        };
        _proto.onEnable = function onEnable() {
          this.UI.m_stateBtn.onClick(this.onStateBtnClick, this);
          this.UI.m_RoomId.onClick(this.onCopyRoomId, this);

          // Add click listeners for player slots to copy ID (Invite)
          this.UI.m_P2.onClick(this.onInviteClick, this);
          this.UI.m_P3.onClick(this.onInviteClick, this);
          this.UI.m_P4.onClick(this.onInviteClick, this);
        };
        _proto.onDisable = function onDisable() {
          this.UI.m_stateBtn.offClick(this.onStateBtnClick, this);
          this.UI.m_RoomId.offClick(this.onCopyRoomId, this);
          this.UI.m_P2.offClick(this.onInviteClick, this);
          this.UI.m_P3.offClick(this.onInviteClick, this);
          this.UI.m_P4.offClick(this.onInviteClick, this);

          // Don't remove RoomMgr events here if logic persists, but GUILogicBase lifecycle suggests we should if the UI is closing.
          // However, Drongo might reuse Logic? Assuming standard open/close lifecycle.
        };

        _proto.onDestroy = function onDestroy() {
          roomMgr.evt.off(roomMgr.evt.key.RoomUpdate, this.updateRoomInfo, this);
          roomMgr.evt.off(roomMgr.evt.key.Left, this.onLeftRoom, this);
          _GUILogicBase.prototype.onDestroy.call(this);
        };
        _proto.updateRoomInfo = function updateRoomInfo() {
          var players = roomMgr.players;
          var isHost = roomMgr.isHost;
          var roomId = roomMgr.roomCode;

          // Check if game started
          if (roomMgr.roomState === RoomState.Playing) {
            GUIManager.close(this.UI);
            GUIManager.open(Attac_AttactPage);
            // Verify if we should close this page? GUIManager usually manages stack or hides previous.
            // If we don't close, this updateRoomInfo might run again? 
            // But once AttacPage is open, it might cover this.
            // Better to close self?
            // this.close(); // GUILogicBase doesn't have close, use GUIManager.close(this.UI);
            // But let's just Open for now.
            return;
          }
          this.UI.m_RoomId.text = "\u623F\u95F4\u53F7: " + roomId;

          // P1 is always Host slot in UI? Or P1 is Me? 
          // Requirement: "默认P1 是房主"

          var host = players.find(function (p) {
            return p.id === roomMgr.roomHostId;
          }) || (isHost && players.length > 0 ? players[0] : null);

          // Map players to slots P1-P4
          // P1: Host
          // P2-P4: Others

          var otherPlayers = players.filter(function (p) {
            return p.id !== roomMgr.roomHostId;
          });

          // Update P1
          this.updatePlayerSlot(this.UI.m_P1, host);

          // Update Others
          this.updatePlayerSlot(this.UI.m_P2, otherPlayers[0]);
          this.updatePlayerSlot(this.UI.m_P3, otherPlayers[1]);
          this.updatePlayerSlot(this.UI.m_P4, otherPlayers[2]);

          // Update State Button
          if (isHost) {
            // Host Button: Start Game
            this.UI.m_stateBtn.text = "开始游戏";
            // Check if all ready
            var allReady = otherPlayers.every(function (p) {
              return p.ready;
            });
            // Host is always ready presumably, or allow Host to be not ready? 
            // Requirement: "房主默认已准备"
            this.UI.m_stateBtn.enabled = allReady;
          } else {
            // Guest Button: Ready / Cancel Ready
            var me = players.find(function (p) {
              return p.id === roomMgr.myId;
            });
            var isReady = me ? me.ready : false;
            this.UI.m_stateBtn.text = isReady ? "取消准备" : "准备";
            this.UI.m_stateBtn.enabled = true;
          }
        };
        _proto.updatePlayerSlot = function updatePlayerSlot(slot, info) {
          if (info) {
            slot.m_c1.selectedIndex = info.ready ? 2 : 1;
            slot.m_ID.text = info.name || info.id.substring(0, 4);
            // If occupied, maybe disable simple click to copy? 
            // The handler will check logic.
          } else {
            slot.m_c1.selectedIndex = 0; // Empty
            slot.m_ID.text = "Waiting...";
          }
          // Store info data in slot for click handler? Or just check index in click handler
          slot.data = info; // GObject has data property usually
        };

        _proto.onStateBtnClick = function onStateBtnClick() {
          if (roomMgr.isHost) {
            var players = roomMgr.players;
            var otherPlayers = players.filter(function (p) {
              return p.id !== roomMgr.roomHostId;
            });
            if (otherPlayers.length > 0 && !otherPlayers.every(function (p) {
              return p.ready;
            })) {
              Toast.show("Wait for players to accept", ToastType.Info);
              return;
            }
            roomMgr.startGame();
            // Navigate handled by RoomEvent.RoomUpdate -> Playing state check?
            // Or direct? 
            GUIManager.open(Attac_AttactPage);
          } else {
            var me = roomMgr.players.find(function (p) {
              return p.id === roomMgr.myId;
            });
            if (me) {
              roomMgr.setReady(!me.ready);
            }
          }
        };
        _proto.onInviteClick = function onInviteClick(evt) {
          var slot = evt.sender;
          // Only copy if empty? User instruction implies "Invite component", which is the empty state.
          // If slot has player, clicking might mean "Kick" or "Profile", but for now, let's assume empty state is the "Invite Button".
          if (slot.m_c1.selectedIndex === 0) {
            this.onCopyRoomId();
          }
        };
        _proto.onCopyRoomId = function onCopyRoomId() {
          if (roomMgr.roomCode) {
            // Copy to clipboard? 
            var input = document.createElement('input');
            input.setAttribute('value', roomMgr.roomCode);
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            Toast.show("房间号已复制: " + roomMgr.roomCode, ToastType.Success);
          }
        };
        _proto.onLeftRoom = function onLeftRoom() {
          // Go back to CreatePage or StartPage
          GUIManager.close(this.UI);
          // GUIManager.open(Game_CreatePage); 
        };

        return Game_RoomPage_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RoomPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "e6a74nn/GRMpaP0VDkh239l", "Game_RoomPage", undefined);
      var Game_RoomPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_RoomPage, _fgui$GComponent);
        function Game_RoomPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_bg = void 0;
          _this.m_RoomId = void 0;
          _this.m_stateBtn = void 0;
          _this.m_P1 = void 0;
          _this.m_P2 = void 0;
          _this.m_P3 = void 0;
          _this.m_P4 = void 0;
          return _this;
        }
        Game_RoomPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "RoomPage");
        };
        var _proto = Game_RoomPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChild("bg");
          this.m_RoomId = this.getChild("RoomId");
          this.m_stateBtn = this.getChild("stateBtn");
          this.m_P1 = this.getChild("P1");
          this.m_P2 = this.getChild("P2");
          this.m_P3 = this.getChild("P3");
          this.m_P4 = this.getChild("P4");
        };
        return Game_RoomPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1naeq13", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RoomPlayer_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_RoomPlayer.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Game_RoomPlayer;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_RoomPlayer = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1c537NKRp5Ke6MySTzS4iau", "Game_RoomPlayer_Logic", undefined);
      var Game_RoomPlayer_Logic = exports('default', (_dec = addLogic(Game_RoomPlayer), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_RoomPlayer_Logic, _GUILogicBase);
        function Game_RoomPlayer_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_RoomPlayer_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Game_RoomPlayer_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RoomPlayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "fada9e7sPdNyY1mtDH8T4Zj", "Game_RoomPlayer", undefined);
      var Game_RoomPlayer = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_RoomPlayer, _fgui$GComponent);
        function Game_RoomPlayer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          _this.m_ID = void 0;
          return _this;
        }
        Game_RoomPlayer.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "RoomPlayer");
        };
        var _proto = Game_RoomPlayer.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
          this.m_ID = this.getChild("ID");
        };
        return Game_RoomPlayer;
      }(GComponent), _class2.URL = "ui://6gpz43l1naeq15", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_StartPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_StartPage.ts', './Game_CreatePage.ts', './RoomMgr.ts', './Attac_AttactPage.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GUIManager, addLogic, GUILogicBase, Game_StartPage, Game_CreatePage, roomMgr, Attac_AttactPage;
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
      Game_CreatePage = module.default;
    }, function (module) {
      roomMgr = module.roomMgr;
    }, function (module) {
      Attac_AttactPage = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "729a7ILd9JG1LqLnXuHCzgn", "Game_StartPage_Logic", undefined);
      var Game_StartPage_Logic = exports('default', (_dec = addLogic(Game_StartPage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_StartPage_Logic, _GUILogicBase);
        function Game_StartPage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_StartPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        _proto.onEnable = function onEnable() {
          this.UI.m_startGameBtn.onClick(this.onStartGameBtnClick, this);
          this.UI.m_multiPlayerBtn.onClick(this.onMultiPlayerBtnClick, this);
        };
        _proto.onDisable = function onDisable() {
          this.UI.m_startGameBtn.offClick(this.onStartGameBtnClick, this);
          this.UI.m_multiPlayerBtn.offClick(this.onMultiPlayerBtnClick, this);
        };
        _proto.onStartGameBtnClick = function onStartGameBtnClick() {
          // 单人模式：使用本地传输层，直接进入战斗
          roomMgr.startSinglePlayer();
          GUIManager.close(this.UI);
          GUIManager.open(Attac_AttactPage);
        };
        _proto.onMultiPlayerBtnClick = function onMultiPlayerBtnClick() {
          GUIManager.close(this.UI);
          GUIManager.open(Game_CreatePage);
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
      cclegacy._RF.push({}, "1f7deK2/chKk7z+UR2CstqF", "Game_StartPage", undefined);
      var Game_StartPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_StartPage, _fgui$GComponent);
        function Game_StartPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_startGameBtn = void 0;
          _this.m_multiPlayerBtn = void 0;
          _this.m_collectionBtn = void 0;
          _this.m_optionsBtn = void 0;
          return _this;
        }
        Game_StartPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "StartPage");
        };
        var _proto = Game_StartPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_startGameBtn = this.getChild("startGameBtn");
          this.m_multiPlayerBtn = this.getChild("multiPlayerBtn");
          this.m_collectionBtn = this.getChild("collectionBtn");
          this.m_optionsBtn = this.getChild("optionsBtn");
        };
        return Game_StartPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1naeq9", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Game_CreatePage.ts', './Game_RoomPage.ts', './Game_RoomPlayer.ts', './Game_StartPage.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Game_CreatePage, Game_RoomPage, Game_RoomPlayer, Game_StartPage;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Game_CreatePage = module.default;
    }, function (module) {
      Game_RoomPage = module.default;
    }, function (module) {
      Game_RoomPlayer = module.default;
    }, function (module) {
      Game_StartPage = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "23898cgBTFGc6duDFUWdnm/", "GameBinder", undefined);
      var GameBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function GameBinder() {}
        var _proto = GameBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Game_CreatePage.URL, Game_CreatePage);
          UIObjectFactory.setExtension(Game_RoomPage.URL, Game_RoomPage);
          UIObjectFactory.setExtension(Game_RoomPlayer.URL, Game_RoomPlayer);
          UIObjectFactory.setExtension(Game_StartPage.URL, Game_StartPage);
        };
        return GameBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfigEnums.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "933b8ItUPFD95IDijaQumm/", "GameConfigEnums", undefined);
      /**
       * Game Configuration Enums
       * Auto-generated from configuration tables.
       */

      var E_BallId = exports('E_BallId', /*#__PURE__*/function (E_BallId) {
        E_BallId["Iron"] = "B001";
        E_BallId["Burn"] = "B002";
        E_BallId["Wind"] = "B003";
        E_BallId["Poison"] = "B004";
        E_BallId["Freeze"] = "B005";
        E_BallId["Ghost"] = "B006";
        E_BallId["BroodMother"] = "B007";
        E_BallId["Vampire"] = "B008";
        E_BallId["Bleed"] = "B009";
        E_BallId["Dark"] = "B010";
        E_BallId["Charm"] = "B011";
        E_BallId["Lightning"] = "B012";
        E_BallId["LaserV"] = "B013";
        E_BallId["Light"] = "B014";
        E_BallId["Cell"] = "B015";
        E_BallId["Inferno"] = "E001";
        E_BallId["Hemorrhage"] = "E002";
        E_BallId["Nuclear"] = "E003";
        return E_BallId;
      }({})); // 核弹
      var E_RoleId = exports('E_RoleId', /*#__PURE__*/function (E_RoleId) {
        E_RoleId["Warrior"] = "R01";
        E_RoleId["ItchyFinger"] = "R02";
        E_RoleId["Repentant"] = "R03";
        E_RoleId["Cohabitants"] = "R04";
        E_RoleId["Cogitator"] = "R05";
        E_RoleId["Embedded"] = "R06";
        E_RoleId["Shade"] = "R07";
        E_RoleId["Shield"] = "R08";
        E_RoleId["EmptyNester"] = "R11";
        E_RoleId["Tactician"] = "R15";
        return E_RoleId;
      }({})); // 战术家
      var E_BallType = exports('E_BallType', /*#__PURE__*/function (E_BallType) {
        E_BallType["PHYSICS"] = "PHYSICS";
        E_BallType["MAGIC"] = "MAGIC";
        E_BallType["SUMMON"] = "SUMMON";
        E_BallType["SPECIAL"] = "SPECIAL";
        return E_BallType;
      }({}));
      var E_Attribute = exports('E_Attribute', /*#__PURE__*/function (E_Attribute) {
        E_Attribute["STR"] = "STR";
        E_Attribute["DEX"] = "DEX";
        E_Attribute["INT"] = "INT";
        E_Attribute["LDR"] = "LDR";
        return E_Attribute;
      }({}));
      var E_ScalingGrade = exports('E_ScalingGrade', /*#__PURE__*/function (E_ScalingGrade) {
        E_ScalingGrade["E"] = "E";
        E_ScalingGrade["D"] = "D";
        E_ScalingGrade["C"] = "C";
        E_ScalingGrade["B"] = "B";
        E_ScalingGrade["A"] = "A";
        E_ScalingGrade["S"] = "S";
        return E_ScalingGrade;
      }({}));
      var E_EvolutionId = exports('E_EvolutionId', /*#__PURE__*/function (E_EvolutionId) {
        E_EvolutionId["EVO01"] = "EVO01";
        E_EvolutionId["EVO02"] = "EVO02";
        E_EvolutionId["EVO03"] = "EVO03";
        E_EvolutionId["EVO04"] = "EVO04";
        E_EvolutionId["EVO05"] = "EVO05";
        E_EvolutionId["EVO06"] = "EVO06";
        E_EvolutionId["EVO07"] = "EVO07";
        E_EvolutionId["EVO08"] = "EVO08";
        E_EvolutionId["EVO09"] = "EVO09";
        E_EvolutionId["EVO10"] = "EVO10";
        return E_EvolutionId;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBallModifier.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        mergeCollisionAction: mergeCollisionAction,
        runOnBounce: runOnBounce,
        runOnHitEnemy: runOnHitEnemy,
        runOnHitWall: runOnHitWall
      });
      cclegacy._RF.push({}, "0479bCTpbxGLalIHO/cJxaw", "IBallModifier", undefined);
      /**
       * 弹珠行为修饰器接口
       * 
       * 修饰器模式：通过组合多个修饰器来定义弹珠的碰撞行为
       */
      // 前向声明
      /** 墙壁方向 */
      var WallSide = exports('WallSide', /*#__PURE__*/function (WallSide) {
        WallSide["TOP"] = "TOP";
        WallSide["BOTTOM"] = "BOTTOM";
        WallSide["LEFT"] = "LEFT";
        WallSide["RIGHT"] = "RIGHT";
        return WallSide;
      }({}));

      /** 碰撞结果 */

      /** 默认碰撞结果 */
      var DEFAULT_COLLISION_ACTION = exports('DEFAULT_COLLISION_ACTION', {
        pierce: false,
        recycle: false,
        destroy: false
      });

      /**
       * 弹珠行为修饰器接口
       * 
       * 修饰器按优先级顺序执行，数字越小优先级越高
       */

      /**
       * 修饰器基类
       */
      var BaseBallModifier = exports('BaseBallModifier', function BaseBallModifier() {
        this.priority = 100;
      });

      /**
       * 合并碰撞行为
       * 规则：任一修饰器返回 true，则结果为 true
       */
      function mergeCollisionAction(base, partial) {
        var _partial$pierce, _partial$recycle, _partial$destroy;
        return {
          pierce: base.pierce || ((_partial$pierce = partial.pierce) != null ? _partial$pierce : false),
          recycle: base.recycle || ((_partial$recycle = partial.recycle) != null ? _partial$recycle : false),
          destroy: base.destroy || ((_partial$destroy = partial.destroy) != null ? _partial$destroy : false)
        };
      }

      /**
       * 执行所有修饰器的 onHitEnemy 钩子
       */
      function runOnHitEnemy(modifiers, ball, enemy) {
        var sorted = [].concat(modifiers).sort(function (a, b) {
          return a.priority - b.priority;
        });
        for (var _iterator = _createForOfIteratorHelperLoose(sorted), _step; !(_step = _iterator()).done;) {
          var mod = _step.value;
          if (mod.onHitEnemy != null && mod.onHitEnemy(ball, enemy)) {
            return true; // 穿透
          }
        }

        return false; // 不穿透
      }

      /**
       * 执行所有修饰器的 onHitWall 钩子
       */
      function runOnHitWall(modifiers, ball, wall) {
        var sorted = [].concat(modifiers).sort(function (a, b) {
          return a.priority - b.priority;
        });
        var action = _extends({}, DEFAULT_COLLISION_ACTION);
        for (var _iterator2 = _createForOfIteratorHelperLoose(sorted), _step2; !(_step2 = _iterator2()).done;) {
          var mod = _step2.value;
          var partial = mod.onHitWall == null ? void 0 : mod.onHitWall(ball, wall);
          if (partial) {
            action = mergeCollisionAction(action, partial);
          }
        }
        return action;
      }

      /**
       * 执行所有修饰器的 onBounce 钩子
       */
      function runOnBounce(modifiers, ball, wall) {
        var sorted = [].concat(modifiers).sort(function (a, b) {
          return a.priority - b.priority;
        });
        for (var _iterator3 = _createForOfIteratorHelperLoose(sorted), _step3; !(_step3 = _iterator3()).done;) {
          var mod = _step3.value;
          mod.onBounce == null || mod.onBounce(ball, wall);
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBattleSystem.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "148fej8dUVPbLWsnxawW2cc", "IBattleSystem", undefined);
      /**
       * 战斗子系统接口
       * 
       * 所有战斗子系统的统一接口，便于管理和扩展
       */
      /**
       * 战斗子系统接口
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICharacterAbility.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "798efmjOK1KC73o0jOqjdOo", "ICharacterAbility", undefined);
      /**
       * 角色能力接口
       * 
       * 角色能力决定：
       * - 给弹珠添加什么修饰器
       * - 使用什么发射模式
       * - 其他特殊行为
       */
      /**
       * 角色能力接口
       */
      /**
       * 能力基类
       */
      var BaseCharacterAbility = exports('BaseCharacterAbility', function BaseCharacterAbility() {});
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IEntityView.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d56508jqddH9rYc2ecr89C0", "IEntityView", undefined);
      /**
       * 实体视图接口
       */
      /** 实体视图基础接口 */
      /** 实体视图基类 */
      var BaseEntityView = exports('BaseEntityView', /*#__PURE__*/function () {
        function BaseEntityView(entityId, x, y) {
          this.entityId = void 0;
          /** 显示对象（FGUIGLoader 或 Node） */
          this._displayObject = null;
          /** 目标位置（用于插值） */
          this._targetX = 0;
          this._targetY = 0;
          /** 当前位置 */
          this._currentX = 0;
          this._currentY = 0;
          /** 是否启用插值 */
          this._interpolation = true;
          /** 插值速度 */
          this._lerpSpeed = 20;
          this.entityId = entityId;
          this._targetX = x;
          this._targetY = y;
          this._currentX = x;
          this._currentY = y;
        }
        var _proto = BaseEntityView.prototype;
        _proto.update = function update(dt) {
          if (this._interpolation) {
            // 平滑插值
            var t = Math.min(1, this._lerpSpeed * dt);
            this._currentX += (this._targetX - this._currentX) * t;
            this._currentY += (this._targetY - this._currentY) * t;
          } else {
            this._currentX = this._targetX;
            this._currentY = this._targetY;
          }
          this._updateDisplayPosition();
        };
        _proto.setPosition = function setPosition(x, y) {
          this._targetX = x;
          this._targetY = y;
          if (!this._interpolation) {
            this._currentX = x;
            this._currentY = y;
            this._updateDisplayPosition();
          }
        };
        _proto.setRotation = function setRotation(angle) {
          // 子类实现
        };
        return BaseEntityView;
      }());

      /** 实体视图回调 */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index.ts", ['cc', './PhysicsConfig.ts', './PhysicsConstants.ts', './Collider.ts', './SpatialGrid.ts', './CollisionDetection.ts', './CollisionResolver.ts', './CollisionSystem.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      var _setter = {};
      _setter.BUMPER_FORCE_MULTIPLIER = module.BUMPER_FORCE_MULTIPLIER;
      _setter.CCD_VELOCITY_THRESHOLD = module.CCD_VELOCITY_THRESHOLD;
      _setter.COLLISION_MATRIX = module.COLLISION_MATRIX;
      _setter.ColliderType = module.ColliderType;
      _setter.CollisionLayer = module.CollisionLayer;
      _setter.DEFAULT_BALL_RADIUS = module.DEFAULT_BALL_RADIUS;
      _setter.DEFAULT_RESTITUTION = module.DEFAULT_RESTITUTION;
      _setter.GRAVITY = module.GRAVITY;
      _setter.GRID_CELL_SIZE = module.GRID_CELL_SIZE;
      _setter.MAX_BALL_SPEED = module.MAX_BALL_SPEED;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.BOUNCE_SEPARATION = module.BOUNCE_SEPARATION;
      _setter.DEFAULT_ENEMY_HITBOX = module.DEFAULT_ENEMY_HITBOX;
      _setter.DEFAULT_ENEMY_HITBOX_FP = module.DEFAULT_ENEMY_HITBOX_FP;
      _setter.WALL_IDS = module.WALL_IDS;
      _setter.WALL_THICKNESS = module.WALL_THICKNESS;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.createCircleCollider = module.createCircleCollider;
      _setter.createRectCollider = module.createRectCollider;
      _setter.resetColliderIdGenerator = module.resetColliderIdGenerator;
      exports(_setter);
    }, function (module) {
      exports('SpatialGrid', module.SpatialGrid);
    }, function (module) {
      var _setter = {};
      _setter.detectCollision = module.detectCollision;
      _setter.sweepCircleVsCircle = module.sweepCircleVsCircle;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.applyBounce = module.applyBounce;
      _setter.applyBumperForce = module.applyBumperForce;
      _setter.resolveCollision = module.resolveCollision;
      _setter.separateColliders = module.separateColliders;
      exports(_setter);
    }, function (module) {
      exports('CollisionSystem', module.CollisionSystem);
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f78dnIS0BNioVp14mqpnH+", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index2.ts", ['cc', './ICharacterAbility.ts', './CharacterAbilities.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      exports('BaseCharacterAbility', module.BaseCharacterAbility);
    }, function (module) {
      var _setter = {};
      _setter.CohabitantsAbility = module.CohabitantsAbility;
      _setter.EmbeddedAbility = module.EmbeddedAbility;
      _setter.EmptyNesterAbility = module.EmptyNesterAbility;
      _setter.FlagellantAbility = module.FlagellantAbility;
      _setter.ItchyFingerAbility = module.ItchyFingerAbility;
      _setter.RepentantAbility = module.RepentantAbility;
      _setter.SpendthriftAbility = module.SpendthriftAbility;
      _setter.WarriorAbility = module.WarriorAbility;
      _setter.getAbilityForRole = module.getAbilityForRole;
      _setter.registerAbility = module.registerAbility;
      exports(_setter);
    }],
    execute: function () {
      cclegacy._RF.push({}, "1b71f3i2WVD5oJdmSIVbncY", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index3.ts", ['cc', './EntityType.ts', './Entity.ts', './BallEntity.ts', './EnemyEntity.ts', './BulletEntity.ts', './PlayerEntity.ts', './EntityManager.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      var _setter = {};
      _setter.AttackPattern = module.AttackPattern;
      _setter.EnemyType = module.EnemyType;
      _setter.EntityType = module.EntityType;
      _setter.Formation = module.Formation;
      _setter.StageType = module.StageType;
      exports(_setter);
    }, function (module) {
      exports('Entity', module.Entity);
    }, function (module) {
      exports('BallEntity', module.BallEntity);
    }, function (module) {
      exports('EnemyEntity', module.EnemyEntity);
    }, function (module) {
      exports('BulletEntity', module.BulletEntity);
    }, function (module) {
      exports('PlayerEntity', module.PlayerEntity);
    }, function (module) {
      exports('EntityManager', module.EntityManager);
    }],
    execute: function () {
      cclegacy._RF.push({}, "247b7JX7KpCFbG//EpmIAQU", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index4.ts", ['cc', './IEntityView.ts', './BattleView.ts', './EnemyView.ts', './PlayerView.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      exports('BaseEntityView', module.BaseEntityView);
    }, function (module) {
      exports('BattleView', module.BattleView);
    }, function (module) {
      exports('EnemyView', module.EnemyView);
    }, function (module) {
      exports('PlayerView', module.PlayerView);
    }],
    execute: function () {
      cclegacy._RF.push({}, "2f9b30Qvx9MYqi+8HarKBUN", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index5.ts", ['cc', './IBallModifier.ts', './DefaultModifier.ts', './PierceModifiers.ts', './RecycleModifiers.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      var _setter = {};
      _setter.BaseBallModifier = module.BaseBallModifier;
      _setter.DEFAULT_COLLISION_ACTION = module.DEFAULT_COLLISION_ACTION;
      _setter.WallSide = module.WallSide;
      _setter.mergeCollisionAction = module.mergeCollisionAction;
      _setter.runOnBounce = module.runOnBounce;
      _setter.runOnHitEnemy = module.runOnHitEnemy;
      _setter.runOnHitWall = module.runOnHitWall;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.DefaultModifier = module.DefaultModifier;
      _setter.createDefaultModifier = module.createDefaultModifier;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.GhostModifier = module.GhostModifier;
      _setter.PierceEnemyModifier = module.PierceEnemyModifier;
      _setter.PierceThenBounceModifier = module.PierceThenBounceModifier;
      _setter.WindBallModifier = module.WindBallModifier;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.BottomBounceModifier = module.BottomBounceModifier;
      _setter.ManualRecycleModifier = module.ManualRecycleModifier;
      _setter.TopWallReturnModifier = module.TopWallReturnModifier;
      exports(_setter);
    }],
    execute: function () {
      cclegacy._RF.push({}, "49d22bHx7pICaG88mCRskSQ", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index6.ts", ['cc', './IBattleSystem.ts', './StatusSystem.ts', './DamageSystem.ts', './LaunchSystem.ts', './WaveSystem.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, null, function (module) {
      var _setter = {};
      _setter.StatusSystem = module.StatusSystem;
      _setter.StatusTrigger = module.StatusTrigger;
      _setter.getStatusConfig = module.getStatusConfig;
      _setter.registerStatusConfig = module.registerStatusConfig;
      exports(_setter);
    }, function (module) {
      exports('DamageSystem', module.DamageSystem);
    }, function (module) {
      var _setter = {};
      _setter.DEFAULT_LAUNCH_CONFIG = module.DEFAULT_LAUNCH_CONFIG;
      _setter.LaunchPattern = module.LaunchPattern;
      _setter.LaunchSystem = module.LaunchSystem;
      exports(_setter);
    }, function (module) {
      var _setter = {};
      _setter.WaveSystem = module.WaveSystem;
      _setter.registerEndlessPool = module.registerEndlessPool;
      _setter.registerEnemy = module.registerEnemy;
      _setter.registerStage = module.registerStage;
      _setter.registerWave = module.registerWave;
      _setter.registerWavePattern = module.registerWavePattern;
      exports(_setter);
    }],
    execute: function () {
      cclegacy._RF.push({}, "51b69whiFJJHo705gzkGtXF", "index", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INetworkTransport.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d62dfVO8vxAEZstT6ep/sPD", "INetworkTransport", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InputCommand.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        createAimCmd: createAimCmd,
        createMoveCmd: createMoveCmd,
        createShootCmd: createShootCmd,
        createSpawnCmd: createSpawnCmd
      });
      cclegacy._RF.push({}, "4d79aiwJZpJzq4MPaI8nHBB", "InputCommand", undefined);
      /**
       * 玩家输入指令定义
       * 
       * 用于帧同步中玩家输入的标准化定义
       */

      /**
       * 输入指令类型枚举
       */
      var InputCmdType = exports('InputCmdType', /*#__PURE__*/function (InputCmdType) {
        InputCmdType[InputCmdType["Move"] = 1] = "Move";
        InputCmdType[InputCmdType["Shoot"] = 2] = "Shoot";
        InputCmdType[InputCmdType["Spawn"] = 3] = "Spawn";
        InputCmdType[InputCmdType["Aim"] = 4] = "Aim";
        return InputCmdType;
      }({}));

      /**
       * 输入指令基础接口
       */

      /**
       * 移动输入 - 控制角色移动
       */

      /**
       * 发射输入 - 触发弹珠发射
       */

      /**
       * 瞄准输入 - 设置瞄准方向
       */

      /**
       * 生成输入 - 主机控制生成实体
       */

      /**
       * 输入指令联合类型
       */

      /**
       * 创建移动输入指令
       */
      function createMoveCmd(x, y) {
        return {
          type: InputCmdType.Move,
          x: x,
          y: y
        };
      }

      /**
       * 创建发射输入指令
       */
      function createShootCmd() {
        return {
          type: InputCmdType.Shoot
        };
      }

      /**
       * 创建瞄准输入指令
       */
      function createAimCmd(targetX, targetY) {
        return {
          type: InputCmdType.Aim,
          targetX: targetX,
          targetY: targetY
        };
      }

      /**
       * 创建生成输入指令
       */
      function createSpawnCmd(targetPlayerId, heroId, x, y) {
        return {
          type: InputCmdType.Spawn,
          targetPlayerId: targetPlayerId,
          heroId: heroId,
          x: x,
          y: y
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LaunchSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './FPVector2.ts', './BattleLogger.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, FixedPoint, FPVector2, battleLog;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      battleLog = module.battleLog;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d60e3u9w2pPfKy1OzImKTMq", "LaunchSystem", undefined);

      /** 发射模式 */
      var LaunchPattern = exports('LaunchPattern', /*#__PURE__*/function (LaunchPattern) {
        LaunchPattern["SINGLE"] = "SINGLE";
        LaunchPattern["MIRROR"] = "MIRROR";
        LaunchPattern["SCATTER"] = "SCATTER";
        LaunchPattern["ALL_AT_ONCE"] = "ALL_AT_ONCE";
        return LaunchPattern;
      }({}));

      /** 发射配置 */

      /** 默认发射配置 (STRESS TEST MODE) */
      var DEFAULT_LAUNCH_CONFIG = exports('DEFAULT_LAUNCH_CONFIG', {
        pattern: LaunchPattern.SCATTER,
        interval: 4,
        // Very fast fire rate
        baseSpeed: 60,
        // High speed (Needs MAX_BALL_SPEED > 60)
        spreadCount: 12,
        // Heavy load: 12 balls per shot
        spreadAngle: Math.PI / 1.5 // Wide spread
      });

      /** 发射系统 */
      var LaunchSystem = exports('LaunchSystem', /*#__PURE__*/function () {
        // playerId -> cooldown

        function LaunchSystem(entityManager) {
          this.name = 'LaunchSystem';
          this._entityManager = void 0;
          this._launchCooldown = new Map();
          this._entityManager = entityManager;
        }

        /**
         * 尝试发射弹珠
         * @returns 创建的弹珠实体数组
         */
        var _proto = LaunchSystem.prototype;
        _proto.tryLaunch = function tryLaunch(player, ballConfig, config) {
          var _this$_launchCooldown, _config$spreadCount;
          if (config === void 0) {
            config = DEFAULT_LAUNCH_CONFIG;
          }
          // 检查冷却
          var cooldown = (_this$_launchCooldown = this._launchCooldown.get(player.playerId)) != null ? _this$_launchCooldown : 0;
          if (cooldown > 0) {
            return [];
          }

          // 检查弹珠库存
          if (!player.canShoot()) {
            return [];
          }

          // 设置冷却
          this._launchCooldown.set(player.playerId, config.interval);

          // 根据模式发射
          var balls = [];
          switch (config.pattern) {
            case LaunchPattern.SINGLE:
              // 单发只消耗1个库存
              if (player.useBall()) {
                balls.push(this._launchSingle(player, ballConfig, config));
              }
              break;
            case LaunchPattern.MIRROR:
              // 镜像发射消耗2个库存
              if (player.ballStock >= 2) {
                player.useBall();
                player.useBall();
                balls.push.apply(balls, this._launchMirror(player, ballConfig, config));
              }
              break;
            case LaunchPattern.SCATTER:
              // 扇形散射消耗对应数量
              var scatterCount = (_config$spreadCount = config.spreadCount) != null ? _config$spreadCount : 3;
              if (player.ballStock >= scatterCount) {
                for (var i = 0; i < scatterCount; i++) player.useBall();
                balls.push.apply(balls, this._launchScatter(player, ballConfig, config));
              }
              break;
            case LaunchPattern.ALL_AT_ONCE:
              // 全部发射消耗5个
              if (player.ballStock >= 5) {
                for (var _i = 0; _i < 5; _i++) player.useBall();
                balls.push.apply(balls, this._launchAllAtOnce(player, ballConfig, config));
              }
              break;
          }
          battleLog.log("[LaunchSystem] Player " + player.playerId + " launched " + balls.length + " balls (stock: " + player.ballStock + "/" + player.maxBallStock + ")");
          return balls;
        }

        /** 更新冷却 */;
        _proto.update = function update() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._launchCooldown), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              playerId = _step$value[0],
              cooldown = _step$value[1];
            if (cooldown > 0) {
              this._launchCooldown.set(playerId, cooldown - 1);
            }
          }
        }

        /** 重置 */;
        _proto.reset = function reset() {
          this._launchCooldown.clear();
        }

        // ==================== 发射模式实现 ====================

        /** 单发 */;
        _proto._launchSingle = function _launchSingle(player, ballConfig, config) {
          var ball = this._entityManager.createBall(ballConfig, player.position.x.toFloat(), player.position.y.toFloat(), player.playerId);

          // 设置速度（根据瞄准方向）
          var dir = player.getAimDirection();
          var speed = FixedPoint.fromFloat(config.baseSpeed * (ballConfig.speed_mult || 1));
          ball.velocity = dir.mul(speed);
          return ball;
        }

        /** 镜像发射（左右对称） */;
        _proto._launchMirror = function _launchMirror(player, ballConfig, config) {
          var balls = [];
          var baseAngle = player.aimAngle.toFloat();
          var speed = config.baseSpeed * (ballConfig.speed_mult || 1);

          // 计算镜像角度（相对于垂直轴）
          // 原方向
          var ball1 = this._entityManager.createBall(ballConfig, player.position.x.toFloat(), player.position.y.toFloat(), player.playerId);
          ball1.velocity = new FPVector2(FixedPoint.fromFloat(Math.cos(baseAngle) * speed), FixedPoint.fromFloat(Math.sin(baseAngle) * speed));
          // 镜像伤害减半
          ball1.damage = ball1.damage.divI(2);
          balls.push(ball1);

          // 镜像方向（X 取反）
          var mirrorAngle = Math.PI - baseAngle;
          var ball2 = this._entityManager.createBall(ballConfig, player.position.x.toFloat(), player.position.y.toFloat(), player.playerId);
          ball2.velocity = new FPVector2(FixedPoint.fromFloat(Math.cos(mirrorAngle) * speed), FixedPoint.fromFloat(Math.sin(mirrorAngle) * speed));
          ball2.damage = ball2.damage.divI(2);
          balls.push(ball2);
          return balls;
        }

        /** 扇形散射 */;
        _proto._launchScatter = function _launchScatter(player, ballConfig, config) {
          var _config$spreadAngle, _config$spreadCount2;
          var balls = [];
          var baseAngle = player.aimAngle.toFloat();
          var speed = config.baseSpeed * (ballConfig.speed_mult || 1);
          var spreadAngle = (_config$spreadAngle = config.spreadAngle) != null ? _config$spreadAngle : Math.PI / 6; // 默认30度
          var count = (_config$spreadCount2 = config.spreadCount) != null ? _config$spreadCount2 : 3;
          var angleStep = spreadAngle / (count - 1);
          var startAngle = baseAngle - spreadAngle / 2;
          for (var i = 0; i < count; i++) {
            var angle = startAngle + angleStep * i;
            var ball = this._entityManager.createBall(ballConfig, player.position.x.toFloat(), player.position.y.toFloat(), player.playerId);
            ball.velocity = new FPVector2(FixedPoint.fromFloat(Math.cos(angle) * speed), FixedPoint.fromFloat(Math.sin(angle) * speed));
            balls.push(ball);
          }
          return balls;
        }

        /** 全部同时（宽扇形） */;
        _proto._launchAllAtOnce = function _launchAllAtOnce(player, ballConfig, config) {
          // 使用更大的扇形角度
          var wideConfig = _extends({}, config, {
            spreadAngle: Math.PI / 3,
            // 60度
            spreadCount: 5
          });
          return this._launchScatter(player, ballConfig, wideConfig);
        }

        /** 获取剩余冷却 */;
        _proto.getCooldown = function getCooldown(playerId) {
          var _this$_launchCooldown2;
          return (_this$_launchCooldown2 = this._launchCooldown.get(playerId)) != null ? _this$_launchCooldown2 : 0;
        }

        /** 检查是否可以发射 */;
        _proto.canLaunch = function canLaunch(playerId) {
          return this.getCooldown(playerId) <= 0;
        };
        return LaunchSystem;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalTransport.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './NetworkLogger.ts'], function (exports) {
  var _createClass, cclegacy, TickerManager, networkLog;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TickerManager = module.TickerManager;
    }, function (module) {
      networkLog = module.networkLog;
    }],
    execute: function () {
      cclegacy._RF.push({}, "43eceHzrU5BNJOR7WvNRfKI", "LocalTransport", undefined);
      /**
       * 本地传输层 - 单人模式专用
       * 
       * 零延迟、无网络开销，所有发送立即回环到本地
       */
      var LocalTransport = exports('LocalTransport', /*#__PURE__*/function () {
        function LocalTransport() {
          this._id = 'local-player';
          this._state = 'disconnected';
          this.onOpen = null;
          this.onConnection = null;
          this.onData = null;
          this.onClose = null;
          this.onError = null;
        }
        var _proto = LocalTransport.prototype;
        _proto.initialize = function initialize(config) {
          var _this = this;
          if (config && config.id) this._id = config.id;
          networkLog.log("[LocalTransport] Initialized: " + this._id);
          this._state = 'connected';

          // 立即触发 open 回调（下一帧）
          TickerManager.callNextFrame(function () {
            if (_this.onOpen) _this.onOpen(_this._id);
          }, this);
        };
        _proto.connect = function connect(target) {
          // 单人模式无需连接，忽略
          networkLog.log("[LocalTransport] connect() ignored in single player mode");
        };
        _proto.send = function send(data, exclude) {
          var _this2 = this;
          // 本地回环：数据直接触发 onData（下一帧）
          TickerManager.callNextFrame(function () {
            if (_this2.onData) _this2.onData(_this2._id, data);
          }, this);
        };
        _proto.sendTo = function sendTo(peerId, data) {
          this.send(data);
        };
        _proto.close = function close() {
          this._state = 'disconnected';
          if (this.onClose) this.onClose('all');
        };
        _createClass(LocalTransport, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }]);
        return LocalTransport;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CommonExport.ts', './BattleLauncher.ts', './BattleLogger.ts', './BattleManager.ts', './CharacterAbilities.ts', './ICharacterAbility.ts', './index2.ts', './BallEntity.ts', './BulletEntity.ts', './EnemyEntity.ts', './Entity.ts', './EntityManager.ts', './EntityType.ts', './PlayerEntity.ts', './index3.ts', './BattleCommand.ts', './BattleLogicV2.ts', './CollisionHandler.ts', './FrameBuffer.ts', './InputCommand.ts', './DefaultModifier.ts', './IBallModifier.ts', './PierceModifiers.ts', './RecycleModifiers.ts', './index5.ts', './Collider.ts', './CollisionDetection.ts', './CollisionResolver.ts', './CollisionSystem.ts', './PhysicsConfig.ts', './PhysicsConstants.ts', './SpatialGrid.ts', './index.ts', './DamageSystem.ts', './IBattleSystem.ts', './LaunchSystem.ts', './StatusSystem.ts', './WaveSystem.ts', './index6.ts', './BattleView.ts', './EnemyView.ts', './IEntityView.ts', './PlayerView.ts', './index4.ts', './DB_Balls_Custom.ts', './DB_Evolution_Custom.ts', './DB_Roles_Custom.ts', './GameConfigEnums.ts', './Ref_Scaling_Custom.ts', './ConfigMgr.ts', './RoomMgr.ts', './FrameSyncManager.ts', './INetworkTransport.ts', './LocalTransport.ts', './NetworkConfig.ts', './NetworkLogger.ts', './PeerTransport.ts', './SyncConfig.ts', './TransportFactory.ts', './FPMath.ts', './FPMathTables.ts', './FPVector2.ts', './FixedPoint.ts', './StartView.ts', './ConfigBase.ts', './DB_Balls.ts', './DB_EndlessPool.ts', './DB_Enemy.ts', './DB_Evolution.ts', './DB_Roles.ts', './DB_Stage.ts', './DB_Status.ts', './DB_Wave.ts', './DB_WavePattern.ts', './Ref_Scaling.ts', './AttacBinder.ts', './Attac_AttactPage.ts', './Attac_AttactPage_Logic.ts', './BattleDemoHelper.ts', './EntityViewPool.ts', './Attac_Joystick.ts', './Attac_Joystick_Logic.ts', './Attac_PlayerList.ts', './Attac_PlayerList_Logic.ts', './Attac_PlayerStatues.ts', './Attac_PlayerStatues_Logic.ts', './Attac_ProgressBar3.ts', './Attac_ProgressBar3_Logic.ts', './GameBinder.ts', './Game_CreatePage.ts', './Game_CreatePage_Logic.ts', './Game_RoomPage.ts', './Game_RoomPage_Logic.ts', './Game_StartPage.ts', './Game_StartPage_Logic.ts', './Game_RoomPlayer.ts', './Game_RoomPlayer_Logic.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/NetworkConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8d927+4ezNCcpAgNZpRM6Sa", "NetworkConfig", undefined);
      var TransportType = exports('TransportType', /*#__PURE__*/function (TransportType) {
        TransportType["PeerJS"] = "PeerJS";
        TransportType["WebSocket"] = "WebSocket";
        TransportType["Local"] = "Local";
        return TransportType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetworkLogger.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, mk_logger;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      mk_logger = module.logger;
    }],
    execute: function () {
      cclegacy._RF.push({}, "81e723UrmdBfo1RsHw31II9", "NetworkLogger", undefined);
      var networkLog = exports('networkLog', new mk_logger('Network'));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PeerTransport.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetworkLogger.ts', './bundler.mjs_cjs=&original=.cjs', './bundler.cjs'], function (exports) {
  var _createClass, cclegacy, networkLog, _cjsExports;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      networkLog = module.networkLog;
    }, null, function (module) {
      _cjsExports = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f6e85TzDnRPG7EOuzvHiKEe", "PeerTransport", undefined);
      /**
       * PeerTransport
       * Wraps PeerJS to provide a clean, "Good Taste" interface for WebRTC networking.
       * Hides the complexity of ICE candidates, connection states, and error handling.
       */
      var PeerTransport = exports('PeerTransport', /*#__PURE__*/function () {
        function PeerTransport() {
          this._peer = null;
          this._connections = new Map();
          this._myId = '';
          this._state = 'disconnected';
          // Callbacks
          this.onOpen = null;
          this.onConnection = null;
          this.onData = null;
          this.onClose = null;
          this.onError = null;
        } // No-op
        var _proto = PeerTransport.prototype;
        _proto.initialize = function initialize(config) {
          if (this._peer) {
            networkLog.log("PeerTransport: Already initialized");
            return;
          }
          networkLog.log("PeerTransport: Initializing PeerJS. Peer class:", _cjsExports);
          var options = {
            debug: 1,
            config: {
              iceServers: [{
                urls: 'stun:stun.l.google.com:19302'
              }, {
                urls: 'stun:global.stun.twilio.com:3478'
              }]
            }
          };
          var id = config == null ? void 0 : config.id;
          try {
            // 原始的构建方式有bug 必须这样构建
            // @ts-ignore
            this._peer = id ? new _cjsExports.Peer(id, options) : new _cjsExports.Peer(options);
          } catch (e) {
            networkLog.log("PeerTransport: Failed to create Peer instance", e);
            if (this.onError) this.onError(e);
            return;
          }
          this._bindPeerEvents();
        };
        _proto.connect = function connect(target) {
          if (!this._peer) {
            networkLog.log("PeerTransport: Peer not initialized");
            return;
          }

          // PeerJS expects a peerId string
          var peerId;
          if (typeof target === 'string') {
            peerId = target;
          } else if (target && typeof target.id === 'string') {
            peerId = target.id;
          } else {
            networkLog.log("PeerTransport: Invalid target address. Expected string or {id: string}", target);
            return;
          }
          if (this._connections.has(peerId)) {
            networkLog.log("PeerTransport: Already connected to " + peerId);
            return;
          }
          networkLog.log("PeerTransport: Connecting to " + peerId + "...");
          this._state = 'connecting';
          try {
            var conn = this._peer.connect(peerId, {
              reliable: true
            });
            this._setupConnection(conn);
          } catch (e) {
            networkLog.log("PeerTransport: Connect failed", e);
            if (this.onError) this.onError(e);
          }
        };
        _proto.send = function send(data, exclude) {
          this._connections.forEach(function (conn, peerId) {
            if (peerId !== exclude && conn.open) {
              conn.send(data);
            }
          });
        };
        _proto.sendTo = function sendTo(peerId, data) {
          var conn = this._connections.get(peerId);
          if (conn && conn.open) {
            conn.send(data);
          } else {
            networkLog.log("PeerTransport: Cannot send to " + peerId + ", not connected");
          }
        };
        _proto.close = function close() {
          this._connections.forEach(function (conn) {
            return conn.close();
          });
          this._connections.clear();
          if (this._peer) {
            this._peer.destroy();
            this._peer = null;
          }
          this._state = 'disconnected';
          this._myId = '';
          if (this.onClose) this.onClose('all');
        }

        // --- Internal Helpers ---
        ;

        _proto._bindPeerEvents = function _bindPeerEvents() {
          var _this = this;
          if (!this._peer) return;
          this._peer.on('open', function (id) {
            networkLog.log("PeerTransport: Peer Open. ID: " + id);
            _this._myId = id;
            if (_this.onOpen) _this.onOpen(id);
          });
          this._peer.on('connection', function (conn) {
            networkLog.log("PeerTransport: Incoming connection from " + conn.peer);
            _this._setupConnection(conn);
          });
          this._peer.on('error', function (err) {
            networkLog.log("PeerTransport: Peer Error", err);
            if (_this.onError) _this.onError(err);
          });
          this._peer.on('disconnected', function () {
            networkLog.log("PeerTransport: Peer disconnected from signaling server");
          });
          this._peer.on('close', function () {
            networkLog.log("PeerTransport: Peer destroyed");
            _this.close();
          });
        };
        _proto._setupConnection = function _setupConnection(conn) {
          var _this2 = this;
          this._connections.set(conn.peer, conn);
          conn.on('open', function () {
            networkLog.log("PeerTransport: Connection Established with " + conn.peer);
            _this2._state = 'connected'; // At least one connection
            if (_this2.onConnection) _this2.onConnection(conn.peer);
          });
          conn.on('data', function (data) {
            // networkLog.log(`PeerTransport: RX ${conn.peer}`, data); 
            if (_this2.onData) _this2.onData(conn.peer, data);
          });
          conn.on('close', function () {
            networkLog.log("PeerTransport: Connection Closed with " + conn.peer);
            _this2._connections["delete"](conn.peer);
            if (_this2._connections.size === 0) _this2._state = 'disconnected';
            if (_this2.onClose) _this2.onClose(conn.peer);
          });
          conn.on('error', function (err) {
            networkLog.log("PeerTransport: Connection Error with " + conn.peer, err);
            if (_this2.onError) _this2.onError(err);
          });
        };
        _createClass(PeerTransport, [{
          key: "id",
          get: function get() {
            return this._myId;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }]);
        return PeerTransport;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsConfig.ts", ['cc', './FixedPoint.ts'], function (exports) {
  var cclegacy, FixedPoint;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }],
    execute: function () {
      var _COLLISION_MATRIX;
      cclegacy._RF.push({}, "9c48f2UWr1OHq+xo4ZhtSOd", "PhysicsConfig", undefined);

      // ==================== 碰撞体类型 ====================

      /** 碰撞体类型 */
      var ColliderType = exports('ColliderType', /*#__PURE__*/function (ColliderType) {
        ColliderType[ColliderType["Ball"] = 0] = "Ball";
        ColliderType[ColliderType["Wall"] = 1] = "Wall";
        ColliderType[ColliderType["Bumper"] = 2] = "Bumper";
        ColliderType[ColliderType["Flipper"] = 3] = "Flipper";
        ColliderType[ColliderType["Target"] = 4] = "Target";
        return ColliderType;
      }({})); // 目标（圆形，静态+消除）

      // ==================== 碰撞层 ====================

      /** 碰撞层掩码 */
      var CollisionLayer = exports('CollisionLayer', /*#__PURE__*/function (CollisionLayer) {
        CollisionLayer[CollisionLayer["None"] = 0] = "None";
        CollisionLayer[CollisionLayer["Ball"] = 1] = "Ball";
        CollisionLayer[CollisionLayer["Wall"] = 2] = "Wall";
        CollisionLayer[CollisionLayer["Bumper"] = 4] = "Bumper";
        CollisionLayer[CollisionLayer["Flipper"] = 8] = "Flipper";
        CollisionLayer[CollisionLayer["Target"] = 16] = "Target";
        CollisionLayer[CollisionLayer["All"] = 65535] = "All";
        return CollisionLayer;
      }({}));

      /** 碰撞矩阵：定义哪些层之间可以碰撞 */
      var COLLISION_MATRIX = exports('COLLISION_MATRIX', (_COLLISION_MATRIX = {}, _COLLISION_MATRIX[ColliderType.Ball] = CollisionLayer.Wall | CollisionLayer.Bumper | CollisionLayer.Flipper | CollisionLayer.Target | CollisionLayer.Ball, _COLLISION_MATRIX[ColliderType.Wall] = CollisionLayer.Ball, _COLLISION_MATRIX[ColliderType.Bumper] = CollisionLayer.Ball, _COLLISION_MATRIX[ColliderType.Flipper] = CollisionLayer.Ball, _COLLISION_MATRIX[ColliderType.Target] = CollisionLayer.Ball, _COLLISION_MATRIX));

      // ==================== 物理常量 ====================

      /** 空间网格单元大小（像素） */
      var GRID_CELL_SIZE = exports('GRID_CELL_SIZE', 64);

      /** 默认弹珠半径（定点数） */
      var DEFAULT_BALL_RADIUS = exports('DEFAULT_BALL_RADIUS', FixedPoint.fromInt(15));

      /** 最大弹珠速度（定点数，每帧像素） */
      var MAX_BALL_SPEED = exports('MAX_BALL_SPEED', FixedPoint.fromInt(150));

      /** 默认弹性系数（1.0 = 100%能量保留，无衰减） */
      var DEFAULT_RESTITUTION = exports('DEFAULT_RESTITUTION', FixedPoint.fromFloat(1.0));

      /** Bumper 推力倍数 */
      var BUMPER_FORCE_MULTIPLIER = exports('BUMPER_FORCE_MULTIPLIER', FixedPoint.fromFloat(1.5));

      /** 重力加速度（0 = 无重力） */
      var GRAVITY = exports('GRAVITY', FixedPoint.fromFloat(0));

      /** CCD 最小速度阈值（低于此值不做 CCD） */
      var CCD_VELOCITY_THRESHOLD = exports('CCD_VELOCITY_THRESHOLD', FixedPoint.fromInt(10));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsConstants.ts", ['cc', './FixedPoint.ts'], function (exports) {
  var cclegacy, FixedPoint;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }],
    execute: function () {
      cclegacy._RF.push({}, "31152kVUpRJIrzKpLsHpuFH", "PhysicsConstants", undefined);

      // ==================== 敌人碰撞盒默认尺寸 ====================

      /** 敌人碰撞盒默认值，实际应读取 DB_Enemy.hitbox_half_width/height */
      var DEFAULT_ENEMY_HITBOX = exports('DEFAULT_ENEMY_HITBOX', {
        halfWidth: 50,
        halfHeight: 50
      });

      /** 敌人碰撞盒（定点数） */
      var DEFAULT_ENEMY_HITBOX_FP = exports('DEFAULT_ENEMY_HITBOX_FP', {
        halfWidth: FixedPoint.fromInt(DEFAULT_ENEMY_HITBOX.halfWidth),
        halfHeight: FixedPoint.fromInt(DEFAULT_ENEMY_HITBOX.halfHeight)
      });

      // ==================== 墙壁配置 ====================

      /** 墙壁厚度 */
      var WALL_THICKNESS = exports('WALL_THICKNESS', 50);

      // ==================== 分离与反弹 ====================

      /** 碰撞后额外分离距离（防止重复碰撞） */
      var BOUNCE_SEPARATION = exports('BOUNCE_SEPARATION', 5);

      // ==================== 墙壁 ID ====================

      /** 墙壁 Entity ID（负数，与普通实体区分） */
      var WALL_IDS = exports('WALL_IDS', {
        LEFT: -1,
        RIGHT: -2,
        TOP: -3,
        BOTTOM: -4
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PierceModifiers.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IBallModifier.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BaseBallModifier;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BaseBallModifier = module.BaseBallModifier;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2710c0bbVpJ2IOHxluV1LF/", "PierceModifiers", undefined);
      /**
       * 穿透敌人修饰器
       * 用于：嵌入者(Embedded)角色
       */
      var PierceEnemyModifier = exports('PierceEnemyModifier', /*#__PURE__*/function (_BaseBallModifier) {
        _inheritsLoose(PierceEnemyModifier, _BaseBallModifier);
        function PierceEnemyModifier() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseBallModifier.call.apply(_BaseBallModifier, [this].concat(args)) || this;
          _this.name = 'PierceEnemy';
          _this.priority = 50;
          return _this;
        }
        var _proto = PierceEnemyModifier.prototype;
        _proto.onHitEnemy = function onHitEnemy(ball, enemy) {
          return true; // 穿透敌人
        };

        return PierceEnemyModifier;
      }(BaseBallModifier));

      /**
       * 幽灵球修饰器（穿透怪物和障碍）
       * 用于：幽灵球(Ghost Ball)、空巢者角色
       * 
       * 注意：穿透敌人和障碍物，但不穿透墙壁
       */
      var GhostModifier = exports('GhostModifier', /*#__PURE__*/function (_BaseBallModifier2) {
        _inheritsLoose(GhostModifier, _BaseBallModifier2);
        function GhostModifier() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _BaseBallModifier2.call.apply(_BaseBallModifier2, [this].concat(args)) || this;
          _this2.name = 'Ghost';
          _this2.priority = 10;
          return _this2;
        }
        var _proto2 = GhostModifier.prototype;
        // 高优先级
        _proto2.onHitEnemy = function onHitEnemy(ball, enemy) {
          return true; // 穿透敌人
        }

        // 墙壁正常反弹，不覆盖 onHitWall
        ;

        return GhostModifier;
      }(BaseBallModifier));

      /**
       * 穿透后碰墙变反弹修饰器
       * 用于：特定角色或弹珠
       * 
       * 效果：穿透 N 次敌人后，下次不再穿透
       */
      var PierceThenBounceModifier = exports('PierceThenBounceModifier', /*#__PURE__*/function (_BaseBallModifier3) {
        _inheritsLoose(PierceThenBounceModifier, _BaseBallModifier3);
        function PierceThenBounceModifier(maxPierceCount) {
          var _this3;
          if (maxPierceCount === void 0) {
            maxPierceCount = 1;
          }
          _this3 = _BaseBallModifier3.call(this) || this;
          _this3.name = 'PierceThenBounce';
          _this3.priority = 40;
          _this3._pierceCount = 0;
          _this3._maxPierceCount = void 0;
          _this3._maxPierceCount = maxPierceCount;
          return _this3;
        }
        var _proto3 = PierceThenBounceModifier.prototype;
        _proto3.onHitEnemy = function onHitEnemy(ball, enemy) {
          if (this._pierceCount < this._maxPierceCount) {
            this._pierceCount++;
            return true; // 穿透
          }

          return false; // 不再穿透
        };

        _proto3.onBounce = function onBounce(ball, wall) {
          // 碰墙后重置穿透计数
          this._pierceCount = 0;
        };
        return PierceThenBounceModifier;
      }(BaseBallModifier));

      /**
       * 风球修饰器（穿透+减速）
       * 用于：风球(Wind Ball)
       */
      var WindBallModifier = exports('WindBallModifier', /*#__PURE__*/function (_BaseBallModifier4) {
        _inheritsLoose(WindBallModifier, _BaseBallModifier4);
        function WindBallModifier() {
          var _this4;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this4 = _BaseBallModifier4.call.apply(_BaseBallModifier4, [this].concat(args)) || this;
          _this4.name = 'WindBall';
          _this4.priority = 50;
          return _this4;
        }
        var _proto4 = WindBallModifier.prototype;
        _proto4.onHitEnemy = function onHitEnemy(ball, enemy) {
          // 风球穿透敌人（状态施加由 DamageSystem 处理）
          return true;
        };
        return WindBallModifier;
      }(BaseBallModifier));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerEntity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './FPVector2.ts', './Entity.ts', './EntityType.ts'], function (exports) {
  var _inheritsLoose, cclegacy, FixedPoint, FPVector2, Entity, EntityType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      FPVector2 = module.FPVector2;
    }, function (module) {
      Entity = module.Entity;
    }, function (module) {
      EntityType = module.EntityType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a9ce6gbm05AArNrkIjLBqnx", "PlayerEntity", undefined);
      var PlayerEntity = exports('PlayerEntity', /*#__PURE__*/function (_Entity) {
        _inheritsLoose(PlayerEntity, _Entity);
        function PlayerEntity(id, playerId, config, x, y) {
          var _this;
          _this = _Entity.call(this, id, x, y) || this;
          _this.type = EntityType.Player;
          /** 玩家ID */
          _this.playerId = void 0;
          /** 角色配置ID */
          _this.roleId = void 0;
          /** 配置引用 */
          _this.config = void 0;
          /** 当前血量 */
          _this.hp = void 0;
          /** 最大血量 */
          _this.maxHp = void 0;
          /** 移动速度 */
          _this.moveSpeed = void 0;
          /** 力量属性 */
          _this.str = void 0;
          /** 敏捷属性 */
          _this.dex = void 0;
          /** 智力属性 */
          _this["int"] = void 0;
          /** 初始弹珠ID */
          _this.startBallId = void 0;
          /** 瞄准角度（弧度） */
          _this.aimAngle = FixedPoint.fromFloat(Math.PI / 2);
          // 默认向上
          /** 是否正在发射 */
          _this.isShooting = false;
          /** 最大弹珠库存 */
          _this.maxBallStock = 100;
          /** 当前弹珠库存（可发射的弹珠数量） */
          _this.ballStock = 100;
          _this.playerId = playerId;
          _this.ownerId = playerId;
          _this.roleId = config.id;
          _this.config = config;

          // 从配置初始化
          _this.maxHp = FixedPoint.fromInt(100); // TODO: 从配置读取
          _this.hp = _this.maxHp.clone();
          _this.moveSpeed = FixedPoint.fromInt(5); // TODO: 从配置读取
          _this.str = FixedPoint.fromInt(config.base_str);
          _this.dex = FixedPoint.fromInt(config.base_dex);
          _this["int"] = FixedPoint.fromInt(config.base_int);
          _this.startBallId = config.start_ball;
          return _this;
        }
        var _proto = PlayerEntity.prototype;
        _proto.update = function update(tick) {
          // 应用移动
          this.position.add_(this.velocity);

          // 边界限制（假设屏幕宽度750）
          var minX = FixedPoint.fromInt(30);
          var maxX = FixedPoint.fromInt(720);
          var minY = FixedPoint.fromInt(30);
          var maxY = FixedPoint.fromInt(1594); // 屏幕高度 - 30

          if (this.position.x.lt(minX)) this.position.x.set(minX);
          if (this.position.x.gt(maxX)) this.position.x.set(maxX);
          if (this.position.y.lt(minY)) this.position.y.set(minY);
          if (this.position.y.gt(maxY)) this.position.y.set(maxY);
        }

        /** 受到伤害 */;
        _proto.takeDamage = function takeDamage(damage) {
          this.hp.sub_(damage);
          if (this.hp.lteI(0)) {
            this.hp = FixedPoint.zero();
            this.destroy();
          }
        }

        /** 治疗 */;
        _proto.heal = function heal(amount) {
          this.hp.add_(amount);
          if (this.hp.gt(this.maxHp)) {
            this.hp.set(this.maxHp);
          }
        }

        /** 设置瞄准方向（输入为方向向量，如摇杆输入） */;
        _proto.setAimDirection = function setAimDirection(dirX, dirY) {
          var angle = Math.atan2(dirY.toFloat(), dirX.toFloat());

          // Y-Up: Up is +PI/2 (90 degrees). Down is -PI/2.
          // Target Range: 90 ± 70 degrees (20 ~ 160 degrees)

          var minAngle = 20 * (Math.PI / 180);
          var maxAngle = 160 * (Math.PI / 180);

          // If angle is negative (pointing down), force it to Up
          if (angle < 0) {
            angle = Math.PI / 2;
          }

          // Clamp to allowed sector
          if (angle < minAngle) angle = minAngle;
          if (angle > maxAngle) angle = maxAngle;
          this.aimAngle = FixedPoint.fromFloat(angle);
        }

        /** 获取瞄准方向向量 */;
        _proto.getAimDirection = function getAimDirection() {
          var cos = FixedPoint.fromFloat(Math.cos(this.aimAngle.toFloat()));
          var sin = FixedPoint.fromFloat(Math.sin(this.aimAngle.toFloat()));
          return new FPVector2(cos, sin);
        }

        // ==================== 弹珠库存管理 ====================

        /** 检查是否有弹珠可发射 */;
        _proto.canShoot = function canShoot() {
          return this.ballStock > 0;
        }

        /** 消耗一个弹珠（发射时调用） */;
        _proto.useBall = function useBall() {
          if (this.ballStock <= 0) return false;
          this.ballStock--;
          return true;
        }

        /** 回收一个弹珠（弹珠返回时调用） */;
        _proto.returnBall = function returnBall() {
          this.ballStock++;
          if (this.ballStock > this.maxBallStock) {
            this.ballStock = this.maxBallStock;
          }
        };
        return PlayerEntity;
      }(Entity));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IEntityView.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, BaseEntityView;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BaseEntityView = module.BaseEntityView;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bc85dd+K+ZCS7BfqJ7P6bdX", "PlayerView", undefined);
      var PlayerView = exports('PlayerView', /*#__PURE__*/function (_BaseEntityView) {
        _inheritsLoose(PlayerView, _BaseEntityView);
        function PlayerView(entityId, x, y, playerId, roleId, loader, callbacks) {
          var _this;
          _this = _BaseEntityView.call(this, entityId, x, y) || this;
          _this.entityType = 'player';
          /** 玩家ID */
          _this.playerId = void 0;
          /** 角色ID */
          _this.roleId = void 0;
          /** 显示对象 */
          _this._loader = void 0;
          /** 回调 */
          _this._callbacks = void 0;
          /** 当前 HP */
          _this._hp = 0;
          _this._maxHp = 0;
          /** 瞄准角度 */
          _this._aimAngle = 0;
          _this.playerId = playerId;
          _this.roleId = roleId;
          _this._loader = loader;
          _this._displayObject = loader;
          _this._callbacks = callbacks || {};

          // 玩家使用插值
          _this._interpolation = true;
          _this._lerpSpeed = 15;
          _this._updateDisplayPosition();
          return _this;
        }
        var _proto = PlayerView.prototype;
        _proto._updateDisplayPosition = function _updateDisplayPosition() {
          if (this._loader) {
            this._loader.x = this._currentX;
            this._loader.y = this._currentY;
          }
        }

        /** 设置 HP */;
        _proto.setHp = function setHp(hp, maxHp) {
          this._hp = hp;
          this._maxHp = maxHp;
          if (this._callbacks.onHpChange) {
            this._callbacks.onHpChange(this.entityId, hp, maxHp);
          }
        }

        /** 设置瞄准角度 */;
        _proto.setAimAngle = function setAimAngle(angle) {
          this._aimAngle = angle;
          // 可用于显示瞄准线
        }

        /** 受到伤害 */;
        _proto.onDamage = function onDamage(damage, isCrit) {
          if (this._callbacks.onDamage) {
            this._callbacks.onDamage(this.entityId, damage, isCrit);
          }
        };
        _proto.destroy = function destroy() {
          if (this._callbacks.onDestroy) {
            this._callbacks.onDestroy(this.entityId);
          }
          if (this._loader) {
            this._loader.dispose();
            this._loader = null;
          }
        }

        /** 获取 GLoader */;
        _createClass(PlayerView, [{
          key: "hp",
          get: function get() {
            return this._hp;
          }
        }, {
          key: "maxHp",
          get: function get() {
            return this._maxHp;
          }
        }, {
          key: "hpPercent",
          get: function get() {
            return this._maxHp > 0 ? this._hp / this._maxHp : 0;
          }
        }, {
          key: "aimAngle",
          get: function get() {
            return this._aimAngle;
          }
        }, {
          key: "loader",
          get: function get() {
            return this._loader;
          }
        }]);
        return PlayerView;
      }(BaseEntityView));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RecycleModifiers.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IBallModifier.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, WallSide, BaseBallModifier;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      WallSide = module.WallSide;
      BaseBallModifier = module.BaseBallModifier;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9b8ddA+O4VJh75njVWYuI4Q", "RecycleModifiers", undefined);
      /**
       * 碰顶墙返回玩家修饰器
       * 用于：悔罪者(Repentant)角色
       * 
       * 效果：球碰到顶墙后，直接返回玩家（穿透途中敌人并造成伤害）
       */
      var TopWallReturnModifier = exports('TopWallReturnModifier', /*#__PURE__*/function (_BaseBallModifier) {
        _inheritsLoose(TopWallReturnModifier, _BaseBallModifier);
        function TopWallReturnModifier() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseBallModifier.call.apply(_BaseBallModifier, [this].concat(args)) || this;
          _this.name = 'TopWallReturn';
          _this.priority = 50;
          _this._isReturning = false;
          return _this;
        }
        var _proto = TopWallReturnModifier.prototype;
        _proto.onHitWall = function onHitWall(ball, wall) {
          if (wall === WallSide.TOP) {
            this._isReturning = true;
            // 不回收，但触发返回逻辑（在 onBounce 中处理）
            return {};
          }
          if (wall === WallSide.BOTTOM && this._isReturning) {
            this._isReturning = false;
            return {
              recycle: true
            }; // 返回后碰底墙回收
          }

          return {};
        };
        _proto.onBounce = function onBounce(ball, wall) {
          if (wall === WallSide.TOP && this._isReturning) {
            // 反转 Y 速度（向下）
            ball.velocity.y.neg_();
          }
        };
        _proto.onHitEnemy = function onHitEnemy(ball) {
          // 返回途中穿透敌人
          return this._isReturning;
        };
        _createClass(TopWallReturnModifier, [{
          key: "isReturning",
          get: function get() {
            return this._isReturning;
          }
        }]);
        return TopWallReturnModifier;
      }(BaseBallModifier));

      /**
       * 底墙不回收修饰器
       * 用于：苦修者(Flagellant)角色
       * 
       * 效果：球碰到底墙不回收，而是反弹
       */
      var BottomBounceModifier = exports('BottomBounceModifier', /*#__PURE__*/function (_BaseBallModifier2) {
        _inheritsLoose(BottomBounceModifier, _BaseBallModifier2);
        function BottomBounceModifier() {
          var _this2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this2 = _BaseBallModifier2.call.apply(_BaseBallModifier2, [this].concat(args)) || this;
          _this2.name = 'BottomBounce';
          _this2.priority = 50;
          return _this2;
        }
        var _proto2 = BottomBounceModifier.prototype;
        _proto2.onHitWall = function onHitWall(ball, wall) {
          if (wall === WallSide.BOTTOM) {
            return {
              recycle: false
            }; // 不回收，会触发正常反弹
          }

          return {};
        };
        return BottomBounceModifier;
      }(BaseBallModifier));

      /**
       * 玩家接触回收修饰器
       * 用于：苦修者或其他角色（需要玩家手动接球）
       * 
       * 效果：球不会自动回收，需要与玩家碰撞才回收
       */
      var ManualRecycleModifier = exports('ManualRecycleModifier', /*#__PURE__*/function (_BaseBallModifier3) {
        _inheritsLoose(ManualRecycleModifier, _BaseBallModifier3);
        function ManualRecycleModifier() {
          var _this3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this3 = _BaseBallModifier3.call.apply(_BaseBallModifier3, [this].concat(args)) || this;
          _this3.name = 'ManualRecycle';
          _this3.priority = 30;
          return _this3;
        }
        var _proto3 = ManualRecycleModifier.prototype;
        // 高优先级，覆盖默认回收
        _proto3.onHitWall = function onHitWall(ball, wall) {
          // 所有墙都不回收
          return {
            recycle: false
          };
        }

        // 注意：需要在碰撞系统中额外检测 ball vs player 碰撞
        // 当检测到时调用 recycleToPlayer
        ;

        return ManualRecycleModifier;
      }(BaseBallModifier));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Ref_Scaling_Custom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Ref_Scaling.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, Ref_Scaling;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Ref_Scaling = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9e39fCOkmJPVqSdQh4C7JCg", "Ref_Scaling_Custom", undefined);
      var Ref_Scaling_Custom = exports('Ref_Scaling_Custom', /*#__PURE__*/function (_Ref_Scaling) {
        _inheritsLoose(Ref_Scaling_Custom, _Ref_Scaling);
        function Ref_Scaling_Custom() {
          return _Ref_Scaling.apply(this, arguments) || this;
        }
        _createClass(Ref_Scaling_Custom, [{
          key: "GradeEnum",
          get: function get() {
            return this.grade;
          }
        }]);
        return Ref_Scaling_Custom;
      }(Ref_Scaling));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Ref_Scaling.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ConfigBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ConfigBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bb646pjrx9ECJo0+1zTm5BV", "Ref_Scaling", undefined);
      var Ref_Scaling = exports('default', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(Ref_Scaling, _ConfigBase);
        function Ref_Scaling() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /** 评级 */
          _this.grade = "";
          /** 数值倍率 */
          _this.multiplier = 0;
          /** 描述 */
          _this.desc = "";
          return _this;
        }
        return Ref_Scaling;
      }(ConfigBase));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoomMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './FrameSyncManager.ts', './NetworkConfig.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, autoBindToWindow, log, mk_event_target, mk_instance_base, FrameSyncManager, TransportType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
      log = module.log;
      mk_event_target = module.event_target;
      mk_instance_base = module.instance_base;
    }, function (module) {
      FrameSyncManager = module.FrameSyncManager;
    }, function (module) {
      TransportType = module.TransportType;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "4e21e6LYndO1LDl98P6SBbA", "RoomMgr", undefined);
      var RoomState = exports('RoomState', /*#__PURE__*/function (RoomState) {
        RoomState[RoomState["Idle"] = 0] = "Idle";
        RoomState[RoomState["Playing"] = 1] = "Playing";
        return RoomState;
      }({}));

      // Event Interface
      // Network Message Types
      var MsgType = /*#__PURE__*/function (MsgType) {
        MsgType["Join"] = "Join";
        MsgType["RoomState"] = "RoomState";
        MsgType["Ready"] = "Ready";
        MsgType["Start"] = "Start";
        MsgType["Kick"] = "Kick";
        return MsgType;
      }(MsgType || {});
      var RoomMgr = exports('RoomMgr', autoBindToWindow(_class = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(RoomMgr, _instance_base);
        function RoomMgr() {
          var _this;
          _this = _instance_base.call(this) || this;
          _this._frameSync = FrameSyncManager.instance();
          // Event Target
          _this.evt = new mk_event_target();
          _this._localPlayerId = "";
          _this._roomCode = "";
          // Transport ID (for connecting)
          _this._hostPlayerId = "";
          // Logical ID of the host
          _this._isHost = false;
          _this._players = [];
          _this._state = RoomState.Idle;
          _this._randomSeed = 0;
          _this._localPlayerId = "PL-" + _this.generateShortId();
          _this._bindFrameSync();
          return _this;
        }
        var _proto = RoomMgr.prototype;
        /**
         * Create a room (Host)
         */
        _proto.createRoom = function createRoom() {
          var _this2 = this;
          this.reset();
          this._randomSeed = Date.now();
          return new Promise(function (resolve, reject) {
            try {
              // Generate a short ID (6 chars)
              var shortId = _this2.generateShortId();

              // Initialize FrameSyncManager with PeerJS and custom ID
              var config = {
                type: TransportType.PeerJS,
                id: shortId,
                isHost: true
              };

              // One-time listeners for creation flow
              var onOpen = function onOpen(id) {
                log("[RoomMgr] Room Created. ID: " + id);
                _this2._isHost = true;
                _this2._roomCode = id;
                _this2._hostPlayerId = _this2._localPlayerId;

                // Use logical ID for identity
                _this2._addPlayer(_this2._localPlayerId);
                _this2.evt.emit(_this2.evt.key.Joined, id);

                // Cleanup usually handled better, but FrameSync is persistent
                _this2._frameSync.onTransportOpen = null;
                resolve(id);
              };
              _this2._frameSync.onTransportOpen = onOpen;
              _this2._frameSync.onTransportError = function (err) {
                log("[RoomMgr] Create Room Error", err);
                _this2.evt.emit(_this2.evt.key.Error, err);
                reject(err);
              };
              _this2._frameSync.initialize(config);
            } catch (e) {
              reject(e);
            }
          });
        }

        /**
         * Join a room (Guest)
         */;
        _proto.joinRoom = function joinRoom(hostId) {
          var _this3 = this;
          this.reset();
          return new Promise(function (resolve, reject) {
            try {
              var config = {
                type: TransportType.PeerJS,
                id: _this3._localPlayerId // Guests use their logical ID as Peer ID
              };

              _this3._frameSync.onTransportOpen = function (id) {
                log("[RoomMgr] Transport Ready. My ID: " + id);
                _this3._frameSync.connect(hostId);
              };
              _this3._frameSync.onPlayerConnected = function (peerId) {
                if (peerId === hostId) {
                  log("[RoomMgr] Connected to Host: " + hostId);
                  _this3._roomCode = hostId;
                  _this3._isHost = false;

                  // Send Join Message with Logical ID
                  _this3._sendToHost({
                    type: MsgType.Join,
                    payload: {
                      id: _this3._localPlayerId
                    }
                  });
                  resolve();
                }
              };
              _this3._frameSync.onTransportError = function (err) {
                log("[RoomMgr] Join Room Error", err);
                _this3.evt.emit(_this3.evt.key.Error, err);
                reject(err);
              };
              _this3._frameSync.initialize(config);
            } catch (e) {
              reject(e);
            }
          });
        };
        _proto.leaveRoom = function leaveRoom() {
          this.reset();
          this._frameSync.stop();
          this.evt.emit(this.evt.key.Left);
        };
        _proto.setReady = function setReady(ready) {
          var _this4 = this;
          var me = this._players.find(function (p) {
            return p.id === _this4._localPlayerId;
          });
          if (me) {
            me.ready = ready;
            if (this._isHost) {
              this._broadcastRoomState();
            } else {
              // Guests always send logical ID anyway because it's their peerId now
              this._sendToHost({
                type: MsgType.Ready,
                payload: {
                  ready: ready
                }
              });
            }
            this.evt.emit(this.evt.key.RoomUpdate);
          }
        };
        _proto.startGame = function startGame() {
          if (!this._isHost) return;
          this._state = RoomState.Playing;
          this._broadcast({
            type: MsgType.Start
          });
          this.evt.emit(this.evt.key.RoomUpdate);
          // Note: FrameSync.start() is called by Battle UI to ensure listeners are ready
        }

        /**
         * 开始单人游戏
         * 使用本地传输层，无网络延迟，直接进入游戏状态
         */;
        _proto.startSinglePlayer = function startSinglePlayer() {
          this.reset();
          this._isHost = true;
          this._roomCode = "local";
          this._hostPlayerId = this._localPlayerId;
          this._randomSeed = Date.now();

          // 添加本地玩家
          this._addPlayer(this._localPlayerId);

          // 使用本地传输层初始化
          this._frameSync.initialize({
            type: TransportType.Local,
            id: this._localPlayerId,
            isHost: true
          });

          // 直接进入游戏状态
          this._state = RoomState.Playing;
          this.evt.emit(this.evt.key.RoomUpdate);
        }

        // --- Internal Logic ---
        ;

        _proto._bindFrameSync = function _bindFrameSync() {
          var _this5 = this;
          this._frameSync.onMessage = function (peerId, msg) {
            _this5._handleMessage(peerId, msg);
          };
          this._frameSync.onPlayerDisconnected = function (peerId) {
            _this5._handleLeave(peerId);
          };
        };
        _proto.reset = function reset() {
          this._frameSync.stop();
          this._isHost = false;
          this._roomCode = "";
          this._hostPlayerId = "";
          this._players = [];
          this._state = RoomState.Idle;
        };
        _proto._addPlayer = function _addPlayer(id) {
          if (this._players.find(function (p) {
            return p.id === id;
          })) return;
          this._players.push({
            id: id,
            ready: true,
            name: "Player " + (this._players.length + 1)
          });
          this.evt.emit(this.evt.key.RoomUpdate);
        };
        _proto._removePlayer = function _removePlayer(id) {
          var idx = this._players.findIndex(function (p) {
            return p.id === id;
          });
          if (idx !== -1) {
            this._players.splice(idx, 1);
            this.evt.emit(this.evt.key.RoomUpdate);
          }
        };
        _proto._broadcast = function _broadcast(msg) {
          this._frameSync.send(msg);
        };
        _proto._broadcastRoomState = function _broadcastRoomState() {
          var state = {
            roomCode: this._roomCode,
            hostPlayerId: this._hostPlayerId,
            players: this._players,
            state: this._state,
            randomSeed: this._randomSeed
          };
          this._broadcast({
            type: MsgType.RoomState,
            payload: state
          });
        };
        _proto._sendToHost = function _sendToHost(msg) {
          if (this._roomCode) {
            this._frameSync.sendTo(this._roomCode, msg);
          }
        };
        _proto._handleMessage = function _handleMessage(peerId, msg) {
          if (this._isHost) {
            this._handleMessageAsHost(peerId, msg);
          } else {
            this._handleMessageAsGuest(peerId, msg);
          }
        }

        /** Host-only message handling */;
        _proto._handleMessageAsHost = function _handleMessageAsHost(peerId, msg) {
          switch (msg.type) {
            case MsgType.Join:
              this._addPlayer(msg.payload.id);
              this._broadcastRoomState();
              break;
            case MsgType.Ready:
              var p = this._players.find(function (player) {
                return player.id === peerId;
              });
              if (p) {
                p.ready = msg.payload.ready;
                this._broadcastRoomState();
                this.evt.emit(this.evt.key.RoomUpdate);
              }
              break;
          }
        }

        /** Guest-only message handling */;
        _proto._handleMessageAsGuest = function _handleMessageAsGuest(peerId, msg) {
          switch (msg.type) {
            case MsgType.RoomState:
              var data = msg.payload;
              this._roomCode = data.roomCode;
              this._hostPlayerId = data.hostPlayerId;
              this._players = data.players;
              this._state = data.state;
              this._randomSeed = data.randomSeed;
              this.evt.emit(this.evt.key.RoomUpdate);
              break;
            case MsgType.Start:
              this._state = RoomState.Playing;
              this.evt.emit(this.evt.key.RoomUpdate);
              break;
          }
        };
        _proto._handleLeave = function _handleLeave(peerId) {
          if (this._isHost) {
            log("[RoomMgr] Player " + peerId + " left");
            this._removePlayer(peerId);
            this._broadcastRoomState();
          } else if (peerId === this._roomCode) {
            log("[RoomMgr] Host disconnected");
            this.leaveRoom();
          }
        };
        _proto.generateShortId = function generateShortId() {
          // Generate 6 random digits/chars
          // Avoid similar looking chars if possible, but for now simple alphanumeric
          var chars = '0123456789';
          var result = '';
          for (var i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return result;
        };
        _createClass(RoomMgr, [{
          key: "isHost",
          get: function get() {
            return this._isHost;
          }
        }, {
          key: "myId",
          get: function get() {
            return this._frameSync.myId;
          }
        }, {
          key: "localPlayerId",
          get: function get() {
            return this._localPlayerId;
          }
        }, {
          key: "roomCode",
          get: function get() {
            return this._roomCode;
          }
        }, {
          key: "roomHostId",
          get: function get() {
            return this._hostPlayerId;
          } // Return logical ID for UI
        }, {
          key: "players",
          get: function get() {
            return this._players;
          }
        }, {
          key: "roomState",
          get: function get() {
            return this._state;
          }
        }, {
          key: "randomSeed",
          get: function get() {
            return this._randomSeed;
          }
        }, {
          key: "frameSync",
          get: function get() {
            return this._frameSync;
          }
        }]);
        return RoomMgr;
      }(mk_instance_base)) || _class);
      var roomMgr = exports('roomMgr', RoomMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpatialGrid.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PhysicsConfig.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, GRID_CELL_SIZE;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GRID_CELL_SIZE = module.GRID_CELL_SIZE;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ae79a94WbZFRIdwZPA7GOTh", "SpatialGrid", undefined);
      var SpatialGrid = exports('SpatialGrid', /*#__PURE__*/function () {
        // colliderId -> list of cellKeys

        function SpatialGrid(cellSize) {
          if (cellSize === void 0) {
            cellSize = GRID_CELL_SIZE;
          }
          this._cellSize = void 0;
          this._cells = new Map();
          // cellKey -> Set of collider IDs
          this._colliderCells = new Map();
          this._cellSize = cellSize;
        }

        /** 清空网格 */
        var _proto = SpatialGrid.prototype;
        _proto.clear = function clear() {
          this._cells.clear();
          this._colliderCells.clear();
        }

        /** 插入碰撞体到网格 */;
        _proto.insert = function insert(collider) {
          var cells = this._getCells(collider);
          this._colliderCells.set(collider.id, cells);
          for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
            var cellKey = _step.value;
            if (!this._cells.has(cellKey)) {
              this._cells.set(cellKey, new Set());
            }
            this._cells.get(cellKey).add(collider.id);
          }
        }

        /** 移除碰撞体 */;
        _proto.remove = function remove(colliderId) {
          var cells = this._colliderCells.get(colliderId);
          if (cells) {
            for (var _iterator2 = _createForOfIteratorHelperLoose(cells), _step2; !(_step2 = _iterator2()).done;) {
              var cellKey = _step2.value;
              var cell = this._cells.get(cellKey);
              if (cell) {
                cell["delete"](colliderId);
                if (cell.size === 0) {
                  this._cells["delete"](cellKey);
                }
              }
            }
            this._colliderCells["delete"](colliderId);
          }
        }

        /** 更新碰撞体位置（先移除再插入） */;
        _proto.update = function update(collider) {
          this.remove(collider.id);
          this.insert(collider);
        }

        /** 查询与指定碰撞体可能碰撞的其他碰撞体ID */;
        _proto.query = function query(collider) {
          var cells = this._getCells(collider);
          var result = new Set();
          for (var _iterator3 = _createForOfIteratorHelperLoose(cells), _step3; !(_step3 = _iterator3()).done;) {
            var cellKey = _step3.value;
            var cell = this._cells.get(cellKey);
            if (cell) {
              for (var _iterator4 = _createForOfIteratorHelperLoose(cell), _step4; !(_step4 = _iterator4()).done;) {
                var id = _step4.value;
                if (id !== collider.id) {
                  result.add(id);
                }
              }
            }
          }
          return Array.from(result);
        }

        /** 获取碰撞体覆盖的所有网格单元 */;
        _proto._getCells = function _getCells(collider) {
          var pos = collider.position;
          var shape = collider.shape;
          var cells = [];
          var minX, maxX, minY, maxY;
          if (shape.type === 'circle') {
            var r = shape.radius.toFloat();
            var cx = pos.x.toFloat();
            var cy = pos.y.toFloat();
            minX = Math.floor((cx - r) / this._cellSize);
            maxX = Math.floor((cx + r) / this._cellSize);
            minY = Math.floor((cy - r) / this._cellSize);
            maxY = Math.floor((cy + r) / this._cellSize);
          } else {
            var hw = shape.halfWidth.toFloat();
            var hh = shape.halfHeight.toFloat();
            var _cx = pos.x.toFloat();
            var _cy = pos.y.toFloat();
            minX = Math.floor((_cx - hw) / this._cellSize);
            maxX = Math.floor((_cx + hw) / this._cellSize);
            minY = Math.floor((_cy - hh) / this._cellSize);
            maxY = Math.floor((_cy + hh) / this._cellSize);
          }
          for (var x = minX; x <= maxX; x++) {
            for (var y = minY; y <= maxY; y++) {
              cells.push(this._hash(x, y));
            }
          }
          return cells;
        }

        /** 网格坐标哈希函数 */;
        _proto._hash = function _hash(cellX, cellY) {
          // 使用 Cantor pairing 或简单组合
          // 假设网格范围不超过 ±32767
          return cellX + 32768 << 16 | cellY + 32768;
        };
        return SpatialGrid;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './CommonExport.ts', './fairygui.mjs', './drongo-cc.mjs', './Game_StartPage.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, ProgressBar, Node, color, tween, Component, Toast, GUIManager, AllBinder, BackgroundAdapter, GRoot, UIConfig, registerFont, logConfig, LogLevel, mk_logger, log, Game_StartPage;
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
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Toast = module.Toast;
      GUIManager = module.GUIManager;
      AllBinder = module.AllBinder;
      BackgroundAdapter = module.BackgroundAdapter;
    }, null, function (module) {
      GRoot = module.GRoot;
      UIConfig = module.UIConfig;
      registerFont = module.registerFont;
    }, function (module) {
      logConfig = module.logConfig;
      LogLevel = module.LogLevel;
      mk_logger = module.logger;
      log = module.log;
    }, function (module) {
      Game_StartPage = module.default;
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
          GRoot.create();

          // fgui.UIConfig.buttonSound = "ui://MainMenu/click";
          UIConfig.buttonSoundVolumeScale = 1;
          UIConfig.bringWindowToFrontOnClick = false;
          registerFont("Inter-BoldItalic");
          UIConfig.defaultFont = "Inter-BoldItalic";
          UIConfig.modalLayerColor = color(0, 0, 0, 100);
          Toast.init({
            packageName: "Game",
            comName: "Tooltips"
          });

          // 初始化进度条和标签
          this.progressBar.progress = 0;
          this.label.string = "0%";
          this.progressObj.value = 0;
          {
            logConfig.level_n = LogLevel.none;
          }
          mk_logger.limit(["monitor"]);
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  AllBinder.bindAll();
                  _context.prev = 1;
                  BackgroundAdapter.adaptBackground(this.bg);
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
                  this.progressBar.node.active = false;
                  this.label.node.active = false;
                case 17:
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

System.register("chunks:///_virtual/StatusSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedPoint.ts', './BattleLogger.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, FixedPoint, battleLog;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FixedPoint = module.FixedPoint;
    }, function (module) {
      battleLog = module.battleLog;
    }],
    execute: function () {
      exports({
        getStatusConfig: getStatusConfig,
        registerStatusConfig: registerStatusConfig
      });
      cclegacy._RF.push({}, "f1d2cSQo4NJXI0nRndHDVEs", "StatusSystem", undefined);

      /** 状态触发时机 */
      var StatusTrigger = exports('StatusTrigger', /*#__PURE__*/function (StatusTrigger) {
        StatusTrigger["ON_HIT"] = "ON_HIT";
        StatusTrigger["TICK"] = "TICK";
        StatusTrigger["DEBUFF"] = "DEBUFF";
        return StatusTrigger;
      }({}));

      /** 状态实例 */

      /** 状态配置缓存 */
      var statusConfigCache = new Map();

      /** 注册状态配置 */
      function registerStatusConfig(config) {
        statusConfigCache.set(config.id, config);
      }

      /** 获取状态配置 */
      function getStatusConfig(id) {
        return statusConfigCache.get(id);
      }

      /** 状态系统 */
      var StatusSystem = exports('StatusSystem', /*#__PURE__*/function () {
        function StatusSystem() {
          this.name = 'StatusSystem';
        }
        var _proto = StatusSystem.prototype;
        /** 创建状态实例 */
        _proto.createStatus = function createStatus(defId, stacks, sourceId) {
          if (stacks === void 0) {
            stacks = 1;
          }
          var config = getStatusConfig(defId);
          if (!config) {
            battleLog.log("[StatusSystem] Unknown status: " + defId);
            return null;
          }
          return {
            defId: defId,
            stacks: Math.min(stacks, config.max_stacks),
            maxStacks: config.max_stacks,
            remainingDuration: config.duration,
            nextTickAt: config.tick_interval > 0 ? config.tick_interval : 0,
            trigger: config.trigger,
            damagePerStack: FixedPoint.fromFloat(config.dmg_per_stack),
            sourceId: sourceId
          };
        }

        /** 应用状态到敌人 */;
        _proto.applyStatus = function applyStatus(enemy, defId, stacks, sourceId) {
          if (stacks === void 0) {
            stacks = 1;
          }
          var status = this.createStatus(defId, stacks, sourceId);
          if (status) {
            enemy.addStatus(status);
            battleLog.log("[StatusSystem] Applied " + defId + " x" + stacks + " to Enemy #" + enemy.id);
          }
        }

        /** 更新所有敌人的状态效果 */;
        _proto.updateAll = function updateAll(enemies, tick) {
          var events = [];
          for (var _iterator = _createForOfIteratorHelperLoose(enemies), _step; !(_step = _iterator()).done;) {
            var enemy = _step.value;
            if (!enemy.alive) continue;
            var enemyEvents = this.updateEnemy(enemy, tick);
            events.push.apply(events, enemyEvents);
          }
          return events;
        }

        /** 更新单个敌人的状态 */;
        _proto.updateEnemy = function updateEnemy(enemy, tick) {
          var events = [];
          var expiredStatuses = [];
          for (var _iterator2 = _createForOfIteratorHelperLoose(enemy.statuses), _step2; !(_step2 = _iterator2()).done;) {
            var status = _step2.value;
            // 检查 DOT tick
            if (status.trigger === StatusTrigger.TICK && status.nextTickAt <= 0) {
              var _config$tick_interval;
              var damage = status.damagePerStack.mulI(status.stacks);
              var actualDamage = enemy.takeDamage(damage, true); // 状态伤害无视护甲

              events.push({
                targetId: enemy.id,
                statusId: status.defId,
                damage: actualDamage,
                stacks: status.stacks
              });

              // 重置 tick 计时
              var config = getStatusConfig(status.defId);
              status.nextTickAt = (_config$tick_interval = config == null ? void 0 : config.tick_interval) != null ? _config$tick_interval : 60;
            }

            // 更新计时器
            status.nextTickAt--;
            status.remainingDuration--;

            // 检查过期
            if (status.remainingDuration <= 0) {
              expiredStatuses.push(status.defId);
            }
          }

          // 移除过期状态
          for (var _i = 0, _expiredStatuses = expiredStatuses; _i < _expiredStatuses.length; _i++) {
            var defId = _expiredStatuses[_i];
            enemy.removeStatus(defId);
          }
          return events;
        }

        /** 触发 ON_HIT 类型的状态（被球击中时） */;
        _proto.triggerOnHit = function triggerOnHit(enemy, ballDamage) {
          var bonusDamage = FixedPoint.zero();
          for (var _iterator3 = _createForOfIteratorHelperLoose(enemy.statuses), _step3; !(_step3 = _iterator3()).done;) {
            var status = _step3.value;
            if (status.trigger === StatusTrigger.ON_HIT) {
              // 流血：被击中时根据层数造成额外伤害
              var damage = status.damagePerStack.mulI(status.stacks);
              bonusDamage.add_(damage);
            }
          }
          return bonusDamage;
        }

        /** 获取易伤倍率 */;
        _proto.getVulnerabilityMultiplier = function getVulnerabilityMultiplier(enemy) {
          var mult = FixedPoint.one();
          for (var _iterator4 = _createForOfIteratorHelperLoose(enemy.statuses), _step4; !(_step4 = _iterator4()).done;) {
            var status = _step4.value;
            // 冻结：25% 额外伤害
            if (status.defId === 'STATUS_FREEZE') {
              mult = mult.mul(FixedPoint.fromFloat(1.25));
            }
          }
          return mult;
        }

        /** 获取减速倍率 */;
        _proto.getSlowMultiplier = function getSlowMultiplier(enemy) {
          var mult = FixedPoint.one();
          for (var _iterator5 = _createForOfIteratorHelperLoose(enemy.statuses), _step5; !(_step5 = _iterator5()).done;) {
            var status = _step5.value;
            // 减速效果
            if (status.defId === 'STATUS_SLOW') {
              mult = mult.mul(FixedPoint.fromFloat(0.7));
            }
            // 冻结也减速
            if (status.defId === 'STATUS_FREEZE') {
              mult = FixedPoint.zero(); // 完全停止
            }
          }

          return mult;
        }

        /** 检查是否被控制 */;
        _proto.isControlled = function isControlled(enemy) {
          for (var _iterator6 = _createForOfIteratorHelperLoose(enemy.statuses), _step6; !(_step6 = _iterator6()).done;) {
            var status = _step6.value;
            if (status.defId === 'STATUS_FREEZE' || status.defId === 'STATUS_CHARM') {
              return true;
            }
          }
          return false;
        };
        return StatusSystem;
      }());

      /** 状态伤害事件 */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SyncConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "25489E2p2JFS5thnZp87ZJ4", "SyncConfig", undefined);
      /**
       * 帧同步配置常量
       * 
       * 统一 FrameSyncManager 和 FrameBuffer 的 tick 相关配置
       */

      /** 默认帧率 (FPS) */
      var DEFAULT_TICK_RATE = exports('DEFAULT_TICK_RATE', 15);

      /** 默认帧间隔 (ms) */
      var DEFAULT_TICK_INTERVAL = exports('DEFAULT_TICK_INTERVAL', 1000 / DEFAULT_TICK_RATE);

      /** 默认背压阈值：生产者领先消费者的最大帧数 */
      var DEFAULT_MAX_PRODUCER_LEAD = exports('DEFAULT_MAX_PRODUCER_LEAD', 3);

      /** 默认追帧阈值：Buffer 深度超过此值开始追帧 */
      var DEFAULT_CHASE_THRESHOLD = exports('DEFAULT_CHASE_THRESHOLD', 3);

      /** 默认单次最大追帧数 */
      var DEFAULT_MAX_CHASE_PER_TICK = exports('DEFAULT_MAX_CHASE_PER_TICK', 10);

      /** 默认 ping 间隔 (秒) */
      var DEFAULT_PING_INTERVAL = exports('DEFAULT_PING_INTERVAL', 3);

      /** 最大 dt 限制 (ms)，防止暂停后冲击 */
      var DEFAULT_MAX_DT_MS = exports('DEFAULT_MAX_DT_MS', 1000);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TransportFactory.ts", ['cc', './NetworkConfig.ts', './PeerTransport.ts', './LocalTransport.ts'], function (exports) {
  var cclegacy, TransportType, PeerTransport, LocalTransport;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TransportType = module.TransportType;
    }, function (module) {
      PeerTransport = module.PeerTransport;
    }, function (module) {
      LocalTransport = module.LocalTransport;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b408ajlpTRBx6i7x0pQH9wW", "TransportFactory", undefined);
      var TransportFactory = exports('TransportFactory', /*#__PURE__*/function () {
        function TransportFactory() {}
        TransportFactory.create = function create(type) {
          switch (type) {
            case TransportType.PeerJS:
              return new PeerTransport();
            case TransportType.Local:
              return new LocalTransport();
            default:
              throw new Error("[TransportFactory] Unsupported transport type: " + type);
          }
        };
        return TransportFactory;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WaveSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EntityType.ts', './BattleLogger.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, StageType, Formation, battleLog;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      StageType = module.StageType;
      Formation = module.Formation;
    }, function (module) {
      battleLog = module.battleLog;
    }],
    execute: function () {
      exports({
        registerEndlessPool: registerEndlessPool,
        registerEnemy: registerEnemy,
        registerStage: registerStage,
        registerWave: registerWave,
        registerWavePattern: registerWavePattern
      });
      cclegacy._RF.push({}, "89a259z8ztJLZRZLR7N1o4r", "WaveSystem", undefined);

      /** 波次状态 */

      /** 配置缓存 */
      var stageCache = new Map();
      var waveCache = new Map(); // stageId -> waves
      var enemyCache = new Map();
      var patternCache = new Map();
      var endlessPoolCache = [];

      /** 注册配置 */
      function registerStage(config) {
        stageCache.set(config.id, config);
      }
      function registerWave(config) {
        var stageId = config.stage_id;
        if (!waveCache.has(stageId)) {
          waveCache.set(stageId, []);
        }
        waveCache.get(stageId).push(config);
        // 按 wave_index 排序
        waveCache.get(stageId).sort(function (a, b) {
          return a.wave_index - b.wave_index;
        });
      }
      function registerEnemy(config) {
        enemyCache.set(config.id, config);
      }
      function registerWavePattern(config) {
        patternCache.set(config.id, config);
      }
      function registerEndlessPool(config) {
        endlessPoolCache.push(config);
      }

      /** 波次系统 */
      var WaveSystem = exports('WaveSystem', /*#__PURE__*/function () {
        function WaveSystem(entityManager) {
          this.name = 'WaveSystem';
          this._entityManager = void 0;
          this._state = void 0;
          this._stageId = '';
          this._stageType = StageType.NORMAL;
          this._randomSeed = 0;
          /** 屏幕宽度（用于生成位置） */
          this._screenWidth = 750;
          /** 屏幕高度（用于生成位置） */
          this._screenHeight = 1624;
          this._entityManager = entityManager;
          this._state = {
            currentWaveIndex: 0,
            difficulty: 1,
            nextWaveDelay: 0,
            allWavesComplete: false
          };
        }

        /** 设置屏幕尺寸 */
        var _proto = WaveSystem.prototype;
        _proto.setScreenSize = function setScreenSize(width, height) {
          this._screenWidth = width;
          this._screenHeight = height;
        }

        /** 初始化关卡 */;
        _proto.initStage = function initStage(stageId, randomSeed) {
          this._stageId = stageId;
          this._randomSeed = randomSeed;
          var stage = stageCache.get(stageId);
          if (stage) {
            this._stageType = stage.stage_type;
          }
          this._state = {
            currentWaveIndex: 0,
            difficulty: 1,
            nextWaveDelay: 60,
            // 开始前1秒延迟
            allWavesComplete: false
          };
          battleLog.log("[WaveSystem] Initialized stage: " + stageId + ", type: " + this._stageType);
        }

        /** 每帧更新 */;
        _proto.update = function update(tick) {
          if (this._state.allWavesComplete) {
            return [];
          }

          // 倒计时
          if (this._state.nextWaveDelay > 0) {
            this._state.nextWaveDelay--;
            return [];
          }

          // 生成当前波次
          var spawned = [];
          if (this._stageType === StageType.ENDLESS) {
            spawned = this._spawnEndlessWave();
          } else {
            spawned = this._spawnNormalWave();
          }
          return spawned;
        }

        /** 生成普通/BOSS关卡的波次 */;
        _proto._spawnNormalWave = function _spawnNormalWave() {
          var waves = waveCache.get(this._stageId);
          if (!waves || this._state.currentWaveIndex >= waves.length) {
            this._state.allWavesComplete = true;
            battleLog.log("[WaveSystem] All waves complete!");
            return [];
          }
          var wave = waves[this._state.currentWaveIndex];
          var spawned = this._spawnWave(wave);

          // 准备下一波
          this._state.currentWaveIndex++;
          if (this._state.currentWaveIndex < waves.length) {
            this._state.nextWaveDelay = waves[this._state.currentWaveIndex].spawn_delay;
          } else {
            this._state.allWavesComplete = true;
          }
          return spawned;
        }

        /** 生成无限模式的波次 */;
        _proto._spawnEndlessWave = function _spawnEndlessWave() {
          var difficulty = this._state.difficulty;

          // 筛选适合当前难度的波次池
          var pool = endlessPoolCache.filter(function (p) {
            return difficulty >= p.difficulty_min && difficulty <= p.difficulty_max;
          });
          if (pool.length === 0) {
            return [];
          }

          // 按权重随机选择
          var selected = this._weightedRandom(pool);
          if (!selected) return [];

          // 计算数量和缩放
          var count = Math.floor(selected.count_base + difficulty * selected.count_scale);
          var hpScale = 1 + (difficulty - 1) * selected.scale_hp * 0.1;
          var dmgScale = 1 + (difficulty - 1) * selected.scale_dmg * 0.1;
          var enemyConfig = enemyCache.get(selected.enemy_id);
          if (!enemyConfig) return [];
          var spawned = this._spawnEnemies(enemyConfig, count, selected.formation, 0, this._screenWidth, 0, hpScale, dmgScale);

          // 增加难度，设置下一波延迟
          this._state.difficulty++;
          this._state.nextWaveDelay = Math.max(60, 180 - difficulty * 5); // 随难度加快

          battleLog.log("[WaveSystem] Endless wave " + this._state.currentWaveIndex + ": " + count + "x " + enemyConfig.name + ", difficulty=" + difficulty);
          this._state.currentWaveIndex++;
          return spawned;
        }

        /** 生成一个波次的怪物 */;
        _proto._spawnWave = function _spawnWave(wave) {
          if (!wave.pattern_id) {
            battleLog.log("[WaveSystem] Wave " + wave.id + " missing pattern_id");
            return [];
          }
          return this._spawnFromPattern(wave.pattern_id, wave.offset_x, wave.offset_y);
        }

        /**
         * 根据网格阵型模式生成怪物
         * @param patternId 阵型ID
         * @param baseX 基础X偏移
         * @param baseY 基础Y偏移
         */;
        _proto._spawnFromPattern = function _spawnFromPattern(patternId, baseX, baseY) {
          var pattern = patternCache.get(patternId);
          if (!pattern) {
            battleLog.log("[WaveSystem] Unknown pattern: " + patternId);
            return [];
          }
          var enemies = [];
          var rows = pattern.rows,
            cols = pattern.cols,
            cell_width = pattern.cell_width,
            cell_height = pattern.cell_height,
            offset_x = pattern.offset_x,
            offset_y = pattern.offset_y;

          // 解析模式
          var grid = this._parsePattern(pattern.pattern, rows, cols);

          // 按网格生成
          for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
              var _grid$r;
              var enemyId = (_grid$r = grid[r]) == null ? void 0 : _grid$r[c];
              if (!enemyId || enemyId === '_') continue;
              var enemyConfig = enemyCache.get(enemyId);
              if (!enemyConfig) continue;

              // 计算位置：每个格子中心
              // X: 从左边开始，offset_x 是整体偏移
              // Y: offset_y 是起始Y（通常为负数表示屏幕上方），行数越大越往上
              // 基准点是屏幕顶部，所以 Y = screenHeight + offset_y - 行偏移
              var x = offset_x + c * cell_width + cell_width / 2;
              var y = this._screenHeight + offset_y - r * cell_height - cell_height / 2;
              battleLog.debug("[WaveSystem] Spawn enemy at (" + x + ", " + y + ")");
              var enemy = this._entityManager.createEnemy(enemyConfig, x, y);
              enemies.push(enemy);
            }
          }
          battleLog.log("[WaveSystem] Pattern " + patternId + ": spawned " + enemies.length + " enemies at offset_y=" + offset_y);
          return enemies;
        }

        /**
         * 解析阵型模式字符串
         * 
         * 支持三种格式：
         * 1. 精确布局: "E001,E002,_;E001,_,E001"
         * 2. 概率填充: "E001|0.7,E002|0.3"
         * 3. 单一填充: "E001"
         */;
        _proto._parsePattern = function _parsePattern(pattern, rows, cols) {
          var grid = [];

          // 检测模式类型
          if (pattern.includes(';')) {
            // 精确布局模式
            var rowStrs = pattern.split(';');
            for (var r = 0; r < rows; r++) {
              var rowStr = rowStrs[r] || '';
              grid[r] = rowStr.split(',').map(function (s) {
                return s.trim();
              });
            }
          } else if (pattern.includes('|')) {
            // 概率填充模式
            var weights = [];
            for (var _iterator = _createForOfIteratorHelperLoose(pattern.split(',')), _step; !(_step = _iterator()).done;) {
              var part = _step.value;
              var _part$split = part.split('|'),
                id = _part$split[0],
                weightStr = _part$split[1];
              weights.push({
                id: id.trim(),
                weight: parseFloat(weightStr) || 1
              });
            }
            for (var _r = 0; _r < rows; _r++) {
              grid[_r] = [];
              for (var c = 0; c < cols; c++) {
                grid[_r][c] = this._selectWeighted(weights);
              }
            }
          } else {
            // 单一填充模式
            var enemyId = pattern.trim();
            for (var _r2 = 0; _r2 < rows; _r2++) {
              grid[_r2] = [];
              for (var _c = 0; _c < cols; _c++) {
                grid[_r2][_c] = enemyId;
              }
            }
          }
          return grid;
        }

        /** 按权重随机选择 */;
        _proto._selectWeighted = function _selectWeighted(weights) {
          var _weights$;
          var total = weights.reduce(function (sum, w) {
            return sum + w.weight;
          }, 0);
          var rand = this._random() * total;
          for (var _iterator2 = _createForOfIteratorHelperLoose(weights), _step2; !(_step2 = _iterator2()).done;) {
            var w = _step2.value;
            rand -= w.weight;
            if (rand <= 0) return w.id;
          }
          return ((_weights$ = weights[0]) == null ? void 0 : _weights$.id) || '_';
        }

        /** 根据阵型生成怪物 */;
        _proto._spawnEnemies = function _spawnEnemies(config, count, formation, xMin, xMax, yOffset, hpScale, dmgScale) {
          if (hpScale === void 0) {
            hpScale = 1;
          }
          if (dmgScale === void 0) {
            dmgScale = 1;
          }
          var enemies = [];
          var positions = this._getFormationPositions(formation, count, xMin, xMax, yOffset);
          for (var _iterator3 = _createForOfIteratorHelperLoose(positions), _step3; !(_step3 = _iterator3()).done;) {
            var pos = _step3.value;
            var enemy = this._entityManager.createEnemy(config, pos.x, pos.y, hpScale, dmgScale);
            enemies.push(enemy);
          }
          return enemies;
        }

        /** 根据阵型计算位置 */;
        _proto._getFormationPositions = function _getFormationPositions(formation, count, xMin, xMax, yOffset) {
          var positions = [];
          var baseY = -50 + yOffset; // 屏幕上方

          switch (formation) {
            case Formation.LINE:
              var step = (xMax - xMin) / (count + 1);
              for (var i = 0; i < count; i++) {
                positions.push({
                  x: xMin + step * (i + 1),
                  y: baseY
                });
              }
              break;
            case Formation.V:
              var centerX = (xMin + xMax) / 2;
              var spreadX = (xMax - xMin) / 4;
              for (var _i = 0; _i < count; _i++) {
                var row = Math.floor(_i / 2);
                var side = _i % 2 === 0 ? -1 : 1;
                positions.push({
                  x: centerX + side * spreadX * (row + 1) / count,
                  y: baseY - row * 40
                });
              }
              break;
            case Formation.CENTER:
              var cx = (xMin + xMax) / 2;
              for (var _i2 = 0; _i2 < count; _i2++) {
                positions.push({
                  x: cx,
                  y: baseY - _i2 * 60
                });
              }
              break;
            case Formation.RANDOM:
            default:
              for (var _i3 = 0; _i3 < count; _i3++) {
                positions.push({
                  x: xMin + this._random() * (xMax - xMin),
                  y: baseY - this._random() * 100
                });
              }
              break;
          }
          return positions;
        }

        /** 带权重的随机选择 */;
        _proto._weightedRandom = function _weightedRandom(items) {
          var _items;
          var totalWeight = items.reduce(function (sum, item) {
            return sum + item.weight;
          }, 0);
          var random = this._random() * totalWeight;
          for (var _iterator4 = _createForOfIteratorHelperLoose(items), _step4; !(_step4 = _iterator4()).done;) {
            var item = _step4.value;
            random -= item.weight;
            if (random <= 0) {
              return item;
            }
          }
          return (_items = items[items.length - 1]) != null ? _items : null;
        }

        /** 确定性随机（基于种子） */;
        _proto._random = function _random() {
          this._randomSeed = this._randomSeed * 1103515245 + 12345 & 0x7fffffff;
          return this._randomSeed / 0x7fffffff;
        }

        /** 获取当前状态 */;
        /** 重置 */
        _proto.reset = function reset() {
          this._state = {
            currentWaveIndex: 0,
            difficulty: 1,
            nextWaveDelay: 0,
            allWavesComplete: false
          };
        };
        _createClass(WaveSystem, [{
          key: "state",
          get: function get() {
            return this._state;
          }
        }]);
        return WaveSystem;
      }());
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