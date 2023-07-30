System.register("chunks:///_virtual/Actor.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts', './MathUtil.ts', './ActorProperty.ts', './PhysicsGroup.ts', './Projectile.ts', './StateDefine.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, v3, SkeletalAnimation, CCFloat, RigidBody, Collider, Animation, Vec3, math, Component, Events, MathUtil, ActorProperty, PhysicsGroup, Projectile, StateDefine;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      SkeletalAnimation = module.SkeletalAnimation;
      CCFloat = module.CCFloat;
      RigidBody = module.RigidBody;
      Collider = module.Collider;
      Animation = module.Animation;
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      MathUtil = module.MathUtil;
    }, function (module) {
      ActorProperty = module.ActorProperty;
    }, function (module) {
      PhysicsGroup = module.PhysicsGroup;
    }, function (module) {
      Projectile = module.Projectile;
    }, function (module) {
      StateDefine = module.StateDefine;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "5c5e9gBnQhJW7/a+5S0DRAd", "Actor", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var tempVelocity = v3();
      /**
       * 角色和怪物的移动、状态管理器
       */

      var Actor = exports('Actor', (_dec = ccclass('Actor'), _dec2 = property(SkeletalAnimation), _dec3 = property(CCFloat), _dec4 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Actor, _Component);

        function Actor() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "skeletalAnimation", _descriptor, _assertThisInitialized(_this));

          _this.currState = StateDefine.Idle;
          _this.collider = null;
          _this.destForward = v3();

          _initializerDefineProperty(_this, "linearSpeed", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "angularSpeed", _descriptor3, _assertThisInitialized(_this));

          _this.rigidbody = null;
          _this.actorProperty = new ActorProperty();
          return _this;
        }

        var _proto = Actor.prototype;

        _proto.start = function start() {
          var _this$skeletalAnimati, _this$collider;

          this.rigidbody = this.node.getComponent(RigidBody);
          this.collider = this.node.getComponent(Collider);
          (_this$skeletalAnimati = this.skeletalAnimation) == null ? void 0 : _this$skeletalAnimati.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
          (_this$collider = this.collider) == null ? void 0 : _this$collider.on("onTriggerEnter", this.onTriggerEnter, this);
        };

        _proto.onDestroy = function onDestroy() {
          var _this$skeletalAnimati2, _this$collider2;

          (_this$skeletalAnimati2 = this.skeletalAnimation) == null ? void 0 : _this$skeletalAnimati2.off(Animation.EventType.FINISHED, this.onAnimationFinished, this);
          (_this$collider2 = this.collider) == null ? void 0 : _this$collider2.off("onTriggerEnter", this.onTriggerEnter, this);
        };

        _proto.update = function update(deltaTime) {
          if (this.currState == StateDefine.Die) {
            return;
          } // let f = v3();
          // MathUtil.rotateToward(f, this.node.forward, this.forward, math.toRadian(this.angularSpeed) * deltaTime);
          // this.node.forward = f;


          var a = MathUtil.signAngle(this.node.forward, this.destForward, Vec3.UP);
          var as = v3(0, a * 20, 0);
          this.rigidbody.setAngularVelocity(as);

          switch (this.currState) {
            case StateDefine.Run:
              this.doMove();
              break;
          }
        };

        _proto.doMove = function doMove() {
          var _this$rigidbody;

          var speed = this.linearSpeed * this.destForward.length();
          tempVelocity.x = math.clamp(this.node.forward.x, -1, 1) * speed;
          tempVelocity.z = math.clamp(this.node.forward.z, -1, 1) * speed;
          tempVelocity.y = 0;
          (_this$rigidbody = this.rigidbody) == null ? void 0 : _this$rigidbody.setLinearVelocity(tempVelocity);
        };

        _proto.stopMove = function stopMove() {
          var _this$rigidbody2;

          (_this$rigidbody2 = this.rigidbody) == null ? void 0 : _this$rigidbody2.setLinearVelocity(Vec3.ZERO);
        };

        _proto.changeState = function changeState(state) {
          var _this$skeletalAnimati3;

          if (state == this.currState && state != StateDefine.Hit) {
            return;
          }

          if (this.currState == StateDefine.Die) {
            return;
          }

          if (this.currState == StateDefine.Run) {
            this.stopMove();
          }

          (_this$skeletalAnimati3 = this.skeletalAnimation) == null ? void 0 : _this$skeletalAnimati3.crossFade(state, 0.1);
          this.currState = state; // console.log(state)
        };

        _proto.onAnimationFinished = function onAnimationFinished(eventType, state) {
          if (state.name == StateDefine.Attack) {
            this.changeState(StateDefine.Idle);
          }

          if (state.name == StateDefine.Hit) {
            this.changeState(StateDefine.Idle);
          }
        };

        _proto.hurt = function hurt(dam, hurtSource, hurtDirection) {
          this.changeState(StateDefine.Hit);
          this.node.emit(Events.onHurt, this.actorProperty);

          if (this.currState != StateDefine.Die) {
            var _this$rigidbody3;

            var force = -1.0;
            hurtDirection.multiplyScalar(force);
            (_this$rigidbody3 = this.rigidbody) == null ? void 0 : _this$rigidbody3.applyImpulse(hurtDirection);
            this.actorProperty.hp -= dam;

            if (this.actorProperty.hp <= 0) {
              this.onDie();
              hurtSource == null ? void 0 : hurtSource.node.emit(Events.onEnemyKilled, this);
            }
          }
        };

        _proto.onDie = function onDie() {
          if (this.currState == StateDefine.Die) {
            return;
          }

          this.changeState(StateDefine.Die);
          this.node.emit(Events.onDead, this.node);
        };

        _proto.attack = function attack() {
          this.changeState(StateDefine.Attack);
        };

        _proto.respawn = function respawn() {
          var _this$skeletalAnimati4;

          (_this$skeletalAnimati4 = this.skeletalAnimation) == null ? void 0 : _this$skeletalAnimati4.crossFade(StateDefine.Idle, 0.1);
          this.currState = StateDefine.Idle;
        };

        _proto.onTriggerEnter = function onTriggerEnter(event) {
          var _host;

          if (!PhysicsGroup.isHurtable(event.otherCollider.getGroup(), this.collider.getGroup())) {
            return;
          }

          var projectile = event.otherCollider.getComponent(Projectile);
          var hostActor = (_host = projectile.host) == null ? void 0 : _host.getComponent(Actor);
          var hurtDirection = v3();
          Vec3.subtract(hurtDirection, event.otherCollider.node.worldPosition, event.selfCollider.node.worldPosition);
          hurtDirection.normalize();
          this.hurt(hostActor.actorProperty.attack, hostActor, hurtDirection);
        };

        _createClass(Actor, [{
          key: "dead",
          get: function get() {
            return this.currState == StateDefine.Die;
          }
        }]);

        return Actor;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "skeletalAnimation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "linearSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "angularSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActorManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Actor.ts', './StateDefine.ts', './EffectManager.ts', './Events.ts', './ResourceDefine.ts'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Animation, math, Actor, StateDefine, EffectManager, Events, GameBundleMgr, DynamicResourceDefine;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      math = module.math;
    }, function (module) {
      Actor = module.Actor;
    }, function (module) {
      StateDefine = module.StateDefine;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
      DynamicResourceDefine = module.DynamicResourceDefine;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "d4d0b0QOmNBVohHI8EIqwQh", "ActorManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 角色管理器
       */

      var ActorManager = exports('ActorManager', (_dec = ccclass('ActorManager'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function ActorManager() {
          this.enemyNames = [];
          this.enemies = [];
          this._playerActor = null;
        }

        var _proto = ActorManager.prototype;

        _proto.init = /*#__PURE__*/function () {
          var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // const enemyPath = DynamicResourceDefine.Actor.Enemy.Path;
                  //todo 通过配置加载
                  // GameBundleMgr.loadDir
                  this.enemyNames.push("Aula");
                  this.enemyNames.push("MagicianAll");

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function init() {
            return _init.apply(this, arguments);
          }

          return init;
        }();

        _proto.clear = function clear() {
          this.enemyNames = [];
          this.enemies = [];
        };

        _proto.createRandomEnemy = /*#__PURE__*/function () {
          var _createRandomEnemy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var name, node;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  name = this.enemyNames[math.randomRangeInt(0, this.enemyNames.length)];
                  _context2.next = 3;
                  return GameBundleMgr.getPrefabNode(name, GameBundleMgr.key.Enemy);

                case 3:
                  node = _context2.sent;
                  node.active = true;
                  this.enemies.push(node);
                  node.once(Events.onDead, this.onEnemyDead, this);
                  return _context2.abrupt("return", node);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function createRandomEnemy() {
            return _createRandomEnemy.apply(this, arguments);
          }

          return createRandomEnemy;
        }();

        _proto.onEnemyDead = function onEnemyDead(node) {
          var _this = this;

          var skeletonAnimation = node.getComponent(Actor).skeletalAnimation;
          skeletonAnimation.once(Animation.EventType.FINISHED, function (type, state) {
            if (state.name == StateDefine.Die) {
              var _EffectManager$instan;

              GameBundleMgr.recoverNode(node);

              var index = _this.enemies.indexOf(node);

              _this.enemies.splice(index, 1);

              (_EffectManager$instan = EffectManager.instance) == null ? void 0 : _EffectManager$instan.play(DynamicResourceDefine.Effect.EffDie, node.worldPosition);
              node.active = false;
            }
          }, this);
        };

        _createClass(ActorManager, [{
          key: "playerActor",
          get: function get() {
            return this._playerActor;
          },
          set: function set(actor) {
            this._playerActor = actor;
          }
        }, {
          key: "randomEnemy",
          get: function get() {
            return this.enemies[math.randomRangeInt(0, this.enemies.length)];
          }
        }], [{
          key: "instance",
          get: function get() {
            if (this._instance == null) {
              this._instance = new ActorManager();
            }

            return this._instance;
          }
        }]);

        return ActorManager;
      }(), _class2._instance = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActorProperty.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, math;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4bb48QIQq9E8IUxPkfpvwkV", "ActorProperty", undefined);
      /**
       * Actor 属性
       */


      var ActorProperty = exports('ActorProperty', /*#__PURE__*/function () {
        function ActorProperty() {
          /**
           * 最大生命值
           */
          this.maxHp = 100;
          /**
           * 生命
           */

          this.hp = this.maxHp;
          /**
           * 攻击力
          */

          this.attack = 10;
          /**
           * 等级
           */

          this.level = 1; //#region 投射物属性

          /**
           * 跟踪几率
           */

          this.chaseRate = 0;
          /**
           * 穿透次数
           */

          this.penetration = 0;
          /**
           * 投射物数量
           */

          this.projectileCount = 1; //#region 经验

          /**
           * 当前经验
           */

          this.exp = 0;
          /**
           * 本级最大经验
           */

          this.maxExp = 20;
        }

        _createClass(ActorProperty, [{
          key: "hpPercent",
          get:
          /**
           * 获取血量百分比
           */
          function get() {
            return math.clamp01(this.hp / this.maxHp);
          }
        }]);

        return ActorProperty;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimationEventListener.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "34d72yFhTZESaEyNkCs0A0r", "AnimationEventListener", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 动画监听器
       */

      var AnimationEventListener = exports('AnimationEventListener', (_dec = ccclass('AnimationEventListener'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimationEventListener, _Component);

        function AnimationEventListener() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = AnimationEventListener.prototype;

        _proto.onFrameAttackLoose = function onFrameAttackLoose() {
          var _this$node$parent;

          (_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.emit("onFrameAttackLoose");
        };

        _proto.onFrameAttack = function onFrameAttack() {
          var _this$node$parent2;

          (_this$node$parent2 = this.node.parent) == null ? void 0 : _this$node$parent2.emit("onFrameAttack");
        };

        return AnimationEventListener;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BloodBarCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts', './DmgAnimCtrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, SpriteComponent, Font, Prefab, LabelComponent, UIOpacity, Component, skillBundleMgr, DmgAnimCtrl;

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
      Node = module.Node;
      SpriteComponent = module.SpriteComponent;
      Font = module.Font;
      Prefab = module.Prefab;
      LabelComponent = module.LabelComponent;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      skillBundleMgr = module.skillBundleMgr;
    }, function (module) {
      DmgAnimCtrl = module.DmgAnimCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

      cclegacy._RF.push({}, "f079b6mrXhA1Y/155IH9axl", "BloodBarCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BloodBarCtrl = exports('BloodBarCtrl', (_dec = ccclass("BloodBarCtrl"), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: SpriteComponent
      }), _dec4 = property({
        type: SpriteComponent
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Font
      }), _dec8 = property({
        type: Prefab
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BloodBarCtrl, _Component);

        function BloodBarCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "nodeNick", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "hpProgress", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "blankhp", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "BloodbarBG", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "DmgPop", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "DmgFont", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "Player", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dmgpfb", _descriptor8, _assertThisInitialized(_this));

          _this.percent = 1;
          _this.hp = void 0;
          _this.isDied = false;
          return _this;
        }

        var _proto = BloodBarCtrl.prototype;

        _proto.initBloodBar = function initBloodBar(hp, show) {
          if (show === void 0) {
            show = true;
          } // this.DmgPop.setPosition(18,)
          // this.BloodbarBG.setPosition(18,)


          this.percent = this.hpProgress.fillRange = this.blankhp.fillRange = 1;
          this.hp = hp;
          this.nodeNick.getComponent(LabelComponent).string = "" + hp;
          this.node.getComponent(UIOpacity).opacity = show ? 255 : 0;
          this.isDied = false; // this.schedule(()=>{
          //     this.onDmgBlood(50,10,true)
          // },0.2,100)
        };

        _proto.recycleSelf = function recycleSelf() {
          this.isDied = true;
          this.unscheduleAllCallbacks();

          for (var i = this.DmgPop.children.length - 1; i >= 0; i--) {
            skillBundleMgr.recoverNode(this.DmgPop.children[0]);
          }

          this.hpProgress.fillRange = 1;
          this.blankhp.fillRange = 1;
          skillBundleMgr.recoverNode(this.node);
        };

        _proto.getDmgpopNode = /*#__PURE__*/function () {
          var _getDmgpopNode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var dmgpop;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return skillBundleMgr.getPrefabNode(this.dmgpfb.name);

                case 2:
                  dmgpop = _context.sent;
                  dmgpop.parent = this.DmgPop;
                  dmgpop.active = true;
                  return _context.abrupt("return", dmgpop);

                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function getDmgpopNode() {
            return _getDmgpopNode.apply(this, arguments);
          }

          return getDmgpopNode;
        }();

        _proto.onMiss = /*#__PURE__*/function () {
          var _onMiss = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var dmgpop;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.getDmgpopNode();

                case 2:
                  dmgpop = _context2.sent;
                  dmgpop.getComponent(DmgAnimCtrl).init("miss", this.DmgFont[3]);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function onMiss() {
            return _onMiss.apply(this, arguments);
          }

          return onMiss;
        }();

        _proto.onBlankReduce = function onBlankReduce() {
          if (this.isDied) return;
          this.blankhp.fillRange = this.percent;

          if (this.percent == 0) {
            this.isDied = true;
            this.unscheduleAllCallbacks();
          }
        }
        /**
         * 被攻击或者升级后，血条变化回调
         * @param percent 
         */
        ;

        _proto.onDmgBlood = /*#__PURE__*/function () {
          var _onDmgBlood = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(hp, dmg, crit) {
            var type, dmgpop, percent;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.isDied) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt("return");

                case 2:
                  type = crit ? 1 : 0;
                  _context3.next = 5;
                  return this.getDmgpopNode();

                case 5:
                  dmgpop = _context3.sent;
                  dmgpop.getComponent(DmgAnimCtrl).init(dmg, this.DmgFont[type]);
                  percent = hp / this.hp;

                  if (percent < 0) {
                    percent = 0;
                  } // this.unschedule(this.onBlankReduce)


                  this.hpProgress.fillRange = this.percent = percent;
                  this.scheduleOnce(this.onBlankReduce, 0.15);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));

          function onDmgBlood(_x, _x2, _x3) {
            return _onDmgBlood.apply(this, arguments);
          }

          return onDmgBlood;
        }();

        return BloodBarCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeNick", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hpProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "blankhp", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "BloodbarBG", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "DmgPop", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "DmgFont", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "Player", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dmgpfb", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BulletCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RoleCtrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Collider, Component, RoleCtrl;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Collider = module.Collider;
      Component = module.Component;
    }, function (module) {
      RoleCtrl = module.RoleCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "169ae3xmg9Mn7XpDh4xQzsb", "BulletCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BulletCtrl = exports('BulletCtrl', (_dec = ccclass('BulletCtrl'), _dec2 = property(Collider), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BulletCtrl, _Component);

        function BulletCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "collider", _descriptor, _assertThisInitialized(_this));

          _this._atk = void 0;
          _this._bonus = void 0;
          return _this;
        }

        var _proto = BulletCtrl.prototype;

        _proto.init = function init(atk, bonus) {
          this._atk = atk;
          this._bonus = bonus;
          this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
        };

        _proto.onDisable = function onDisable() {
          this._atk = null;
          this._bonus = null;
          this.collider.off('onTriggerEnter', this.onTriggerEnter, this);
        };

        _proto.onTriggerEnter = function onTriggerEnter(event) {
          var role = event.otherCollider.getComponent(RoleCtrl);
          role && role.beHit(this._atk, this._bonus);
        };

        return BulletCtrl;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "collider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DmgAnimCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AnimationComponent, LabelComponent, Component, skillBundleMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AnimationComponent = module.AnimationComponent;
      LabelComponent = module.LabelComponent;
      Component = module.Component;
    }, function (module) {
      skillBundleMgr = module.skillBundleMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "9decaUyHXFFk5a/4U3rMDzQ", "DmgAnimCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 伤害动画控制器
       */

      var DmgAnimCtrl = exports('DmgAnimCtrl', (_dec = ccclass("DmgAnimCtrl"), _dec2 = property(AnimationComponent), _dec3 = property(LabelComponent), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DmgAnimCtrl, _Component);

        function DmgAnimCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "anim", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "text", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DmgAnimCtrl.prototype;

        _proto.init = function init(dmg, font) {
          this.text.font = font;
          this.text.fontSize = 56 + 16 * Math.random();
          this.text.string = "" + dmg;
          this.node.setPosition(-40 + 80 * Math.random(), 0);
          this.anim.play();
          this.scheduleOnce(this.recycleSelf, 0.9);
        };

        _proto.recycleSelf = function recycleSelf() {
          this.anim.stop();
          this.text.node.setPosition(0, 20);
          this.text.string = null;
          skillBundleMgr.recoverNode(this.node);
        };

        return DmgAnimCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ParticleSystem, Animation, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem = module.ParticleSystem;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "9cb5244onFParfqK2Z/dUGw", "EffectCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = EffectCtrl
       * DateTime = Mon Dec 27 2021 00:05:33 GMT+0800 (中国标准时间)
       * Author = iwae
       * FileBasename = EffectCtrl.ts
       * FileBasenameNoExtension = EffectCtrl
       * URL = db://assets/Scripts/Ctrl/EffectCtrl.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var EffectCtrl = exports('EffectCtrl', (_dec = ccclass('EffectCtrl'), _dec2 = property(ParticleSystem), _dec3 = property(Animation), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectCtrl, _Component);

        function EffectCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this; // [1]
          // dummy = '';
          // [2]

          _initializerDefineProperty(_this, "eff", _descriptor, _assertThisInitialized(_this)); // [2]


          _initializerDefineProperty(_this, "anm", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EffectCtrl.prototype;

        _proto.stop = function stop() {
          if (this.eff) {
            for (var i = 0; i < this.eff.length; i++) {
              this.eff[i].stop();
              this.eff[i].clear();
            }
          }

          if (this.anm) {
            this.anm.stop();
          }
        };

        _proto.play = function play() {
          if (this.eff) {
            for (var i = 0; i < this.eff.length; i++) {
              this.eff[i].play();
            }
          }

          if (this.anm) {
            this.anm.play();
          }
        };

        _proto.clear = function clear() {
          if (this.eff) {
            for (var i = 0; i < this.eff.length; i++) {
              this.eff[i].clear();
            }
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return EffectCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "eff", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "anm", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResourceDefine.ts', './Pools.ts', './Level.ts'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, ParticleSystem, GameBundleMgr, Pools, Level;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem = module.ParticleSystem;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
    }, function (module) {
      Pools = module.Pools;
    }, function (module) {
      Level = module.Level;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "901e1SR5zhM843v1DlhiRxy", "EffectManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 特效管理器
       */

      var EffectManager = exports('EffectManager', (_dec = ccclass('EffectManager'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function EffectManager() {
          this.pools = new Pools();
        }

        var _proto = EffectManager.prototype;

        _proto.destory = function destory() {
          EffectManager._instance = null;
        };

        _proto.play = /*#__PURE__*/function () {
          var _play = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key, worldPosition) {
            var node;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (key) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  _context.next = 4;
                  return GameBundleMgr.getPrefabNode(key, GameBundleMgr.key.Effect);

                case 4:
                  node = _context.sent;
                  this.playEffect(node, worldPosition);

                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function play(_x, _x2) {
            return _play.apply(this, arguments);
          }

          return play;
        }();

        _proto.playEffect = function playEffect(node, worldPosition) {
          Level.instance.effectLayer.addChild(node);
          node.worldPosition = worldPosition;
          node.active = true;
          var ps = node.getComponent(ParticleSystem);
          ps.scheduleOnce(function () {
            node.active = false;
            GameBundleMgr.recoverNode(node);
          }, ps.duration);
          ps.play();
        };

        _createClass(EffectManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance == null) {
              this._instance = new EffectManager();
            }

            return this._instance;
          }
        }]);

        return EffectManager;
      }(), _class2._instance = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnemyController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ActorManager.ts', './Actor.ts', './ProjectileEmiter.ts', './StateDefine.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, v3, ccenum, CCFloat, Node, CCInteger, macro, Collider, game, Vec3, math, Component, ActorManager, Actor, ProjectileEmitter, StateDefine;

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
      v3 = module.v3;
      ccenum = module.ccenum;
      CCFloat = module.CCFloat;
      Node = module.Node;
      CCInteger = module.CCInteger;
      macro = module.macro;
      Collider = module.Collider;
      game = module.game;
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      ActorManager = module.ActorManager;
    }, function (module) {
      Actor = module.Actor;
    }, function (module) {
      ProjectileEmitter = module.ProjectileEmitter;
    }, function (module) {
      StateDefine = module.StateDefine;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "681881DCN5DU4xiS1Y6Y56i", "EnemyController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var temp = v3();

      var AIType = function AIType() {};

      AIType.Chase = "chase";
      AIType.Attack = "attack";
      AIType.Idle = "idle";
      var EnemyCareer = exports('EnemyCareer', /*#__PURE__*/function (EnemyCareer) {
        EnemyCareer[EnemyCareer["Melee"] = 0] = "Melee";
        EnemyCareer[EnemyCareer["Range"] = 1] = "Range";
        return EnemyCareer;
      }({}));
      ccenum(EnemyCareer);
      /** 
       * 敌人控制器 
      */

      var EnemyController = exports('EnemyController', (_dec = ccclass('EnemyController'), _dec2 = requireComponent(Actor), _dec3 = property(CCFloat), _dec4 = property({
        type: EnemyCareer
      }), _dec5 = property(Node), _dec6 = property(CCInteger), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EnemyController, _Component);

        function EnemyController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.actor = null;

          _initializerDefineProperty(_this, "attackRange", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "career", _descriptor2, _assertThisInitialized(_this));

          _this.target = null;
          _this.aiType = AIType.Chase;
          _this.projectileEmitter = void 0;

          _initializerDefineProperty(_this, "projectileStart", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "attackInterval", _descriptor4, _assertThisInitialized(_this));

          _this.lastAttackTime = 0;
          return _this;
        }

        var _proto = EnemyController.prototype;

        _proto.start = function start() {
          this.actor = this.node.getComponent(Actor);

          if (this.career == EnemyCareer.Range) {
            this.projectileEmitter = this.node.getComponent(ProjectileEmitter);
          }

          this.schedule(this.executeAI, 1.0, macro.REPEAT_FOREVER, 1.0);
          this.node.on("onFrameAttack", this.onFrameAttack, this);
          this.target = ActorManager.instance.playerActor;
        };

        _proto.onDestroy = function onDestroy() {
          this.unschedule(this.executeAI);
          var collider = this.node.getComponent(Collider);
          this.node.off("onFrameAttack", this.onFrameAttack, this);
        };

        _proto.onEnable = function onEnable() {
          this.target = ActorManager.instance.playerActor;
        };

        _proto.onDisable = function onDisable() {
          this.target = null;
        };

        _proto.executeAI = function executeAI() {
          // 找不到目标
          if (this.target == null) {
            return;
          } // 我不处于 Run/Idle 状态


          if (this.actor.currState != StateDefine.Idle && this.actor.currState != StateDefine.Run) {
            return;
          }

          var canAttack = game.totalTime - this.lastAttackTime >= this.attackInterval; // 目标已死或我不能攻击

          if (this.target.currState == StateDefine.Die || !canAttack) {
            this.aiType = AIType.Idle;
            this.actor.changeState(AIType.Idle);
            return;
          } // 判断是否在攻击范围内


          var distance = Vec3.distance(this.node.worldPosition, this.target.node.worldPosition);

          if (distance > this.attackRange) {
            this.aiType = AIType.Chase;
            this.actor.changeState(StateDefine.Run);
            Vec3.subtract(temp, this.target.node.worldPosition, this.node.worldPosition);
            temp.normalize();
            this.actor.destForward.set(temp.x, 0, temp.z);
            return;
          }

          this.aiType = AIType.Attack;
          Vec3.subtract(temp, this.target.node.worldPosition, this.node.worldPosition);
          temp.normalize();
          this.actor.destForward.set(temp.x, 0, temp.z);
          this.actor.node.forward.set(temp.x, 0, temp.z);
          this.actor.changeState(StateDefine.Attack);
          this.lastAttackTime = game.totalTime;
        };

        _proto.isFaceTarget = function isFaceTarget() {
          Vec3.subtract(temp, this.target.node.worldPosition, this.node.worldPosition);
          temp.y = 0;
          temp.normalize();
          return Vec3.angle(this.node.forward, temp) < math.toRadian(60);
        };

        _proto.onFrameAttack = /*#__PURE__*/function () {
          var _onFrameAttack = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var dir, angle, distance, projectile;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (this.target) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  if (!(this.career == EnemyCareer.Melee)) {
                    _context.next = 9;
                    break;
                  }

                  dir = v3();
                  Vec3.subtract(dir, this.target.node.worldPosition, this.node.worldPosition);
                  angle = Vec3.angle(this.node.forward, dir);

                  if (angle < Math.PI * 0.5) {
                    distance = dir.length();

                    if (distance < this.attackRange) {
                      this.target.hurt(this.actor.actorProperty.attack, this.actor, dir);
                    }
                  }

                  _context.next = 19;
                  break;

                case 9:
                  _context.next = 11;
                  return this.projectileEmitter.create();

                case 11:
                  projectile = _context.sent;
                  projectile.node.worldPosition = this.projectileStart.worldPosition;
                  projectile.target = this.target.node;
                  projectile.host = this.node;
                  Vec3.subtract(temp, this.target.node.worldPosition, this.node.worldPosition);
                  temp.normalize();
                  projectile.node.forward = temp;
                  projectile.fire();

                case 19:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function onFrameAttack() {
            return _onFrameAttack.apply(this, arguments);
          }

          return onFrameAttack;
        }();

        return EnemyController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "career", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EnemyCareer.Melee;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "projectileStart", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "attackInterval", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5000;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Events.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "315ab77QEhFqbdFITtTVlBT", "Events", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 全局事件定义
       */

      var Events = exports('Events', (_dec = ccclass('Events'), _dec(_class = (_class2 = function Events() {}, _class2.onDead = "onDead", _class2.onEnemyKilled = "onKilled", _class2.onHurt = "onHurt", _class2.onProjectileDead = "onProjectileDead", _class2.onExpGain = "onExpGain", _class2.onPlayerUpgrade = "onPlayerUpgrade", _class2.onBgmVolumeChanged = "onBgmVolumeChanged", _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FollowCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, v3, Vec3, Node, Camera, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      Vec3 = module.Vec3;
      Node = module.Node;
      Camera = module.Camera;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "07f08km4ihDK7jVxMA9Bg+E", "FollowCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var tempPos = v3();
      var smoothPos = new Vec3();
      var t = 0.1; // 插值系数，越小越平滑

      /**
       * 固定跟随相机
       */

      var FollowCamera = exports('FollowCamera', (_dec = ccclass('FollowCamera'), _dec2 = property(Node), _dec3 = property(Camera), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FollowCamera, _Component);

        function FollowCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "camera", _descriptor2, _assertThisInitialized(_this));

          _this.initialDirection = v3();
          _this.speed = 0.0;
          return _this;
        }

        var _proto = FollowCamera.prototype;

        _proto.start = function start() {
          Vec3.subtract(this.initialDirection, this.node.worldPosition, this.target.worldPosition);
          this.camera.node.lookAt(this.target.worldPosition, Vec3.UP);
        };

        _proto.update = function update(deltaTime) {
          Vec3.add(tempPos, this.target.worldPosition, this.initialDirection);
          Vec3.lerp(smoothPos, this.node.worldPosition, tempPos, t);
          this.node.setWorldPosition(smoothPos);
        };

        return FollowCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      // import { PREVIEW } from "cc/env";
      cclegacy._RF.push({}, "1704dLRX0ZKHY6mgO3AXOYR", "GameData", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameEnum.ts", ['cc'], function (exports) {
  var cclegacy, Enum, Prefab, JsonAsset, AudioClip, SpriteAtlas, Material;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      Prefab = module.Prefab;
      JsonAsset = module.JsonAsset;
      AudioClip = module.AudioClip;
      SpriteAtlas = module.SpriteAtlas;
      Material = module.Material;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ef751jkLjlMAZoPbJBGbZ/m", "GameEnum", undefined);

      var ColliderGroup = exports('ColliderGroup', {
        Monster: {
          group: 1 << 0,
          mask: 1 << 2
        },
        Player: {
          group: 1 << 1,
          mask: 1 << 3
        },
        Bullet: {
          group: 1 << 2,
          mask: 1 << 0
        },
        MonsterBullet: {
          group: 1 << 3,
          mask: 1 << 1
        }
      });
      /**
       * 节点类型，组要是用来碰撞时判断子弹打中的是boss还是普通怪
       */

      var PoolType = exports('PoolType', Enum({
        HPBAR: 0,
        Player: 1,
        Chest: 2,
        Monster: 3
      }));
      var CharactorType = exports('CharactorType', Enum({
        None: 0,
        Player: 1,
        Chest: 2,
        Monster: 3
      }));
      var PHY_GROUP = exports('PHY_GROUP', {
        DEFAULT: 1 << 0,
        BULLET: 1 << 1,
        PLAYER: 1 << 2,
        ENEMEY: 1 << 2
      });
      var PHY_MASK = exports('PHY_MASK', {
        BULLET: PHY_GROUP.ENEMEY | PHY_GROUP.PLAYER,
        PLAYER: PHY_GROUP.BULLET,
        ENEMEY: PHY_GROUP.BULLET
      });
      /**
       * 游戏相关的自定义事件
       */

      var EventType = exports('EventType', Enum({
        TweenCam: 'TweenCam',
        PlayerRevive: 'PlayerRevive',
        SkillTip: 'SkillTip',
        PlayAnm: 'PlayAnm',
        ScreenShake: 'ScreenShake',
        GamePause: 'GamePause',
        DmgBlood: 'DmgBlood'
      }));
      /**
       * assettypes and paths
       */

      var Assets = exports('Assets', {
        Skills: {
          type: Prefab,
          path: "skills/"
        },
        Json: {
          type: JsonAsset,
          path: "jsons/"
        },
        Clips: {
          type: AudioClip,
          path: "clips/"
        },
        Atlas: {
          type: SpriteAtlas,
          path: "Atlas"
        },
        Material: {
          type: Material,
          path: "Materials"
        },
        Prefabs: {
          type: Prefab,
          path: "prefabs/"
        }
      });
      /**
      * 音乐路径
      */

      var Clip = exports('Clip', Enum({
        die: "die",
        btn: "btn",
        sword: "feijian",
        wave: "wave",
        reward: "reward",
        win: "win",
        lose: "lose",
        slash1: "slash1",
        slash2: "slash2",
        hurt: "hurt",
        bgm: "bgm",
        gold: "gold",
        equip: "equip",
        buy: "buy",
        recycle: "recycle",
        merge: "merge",
        tick: "tick",
        teleport: "teleport",
        footstep: "footstep",
        buff: "buff"
      }));
      /**
       * 子弹debuff类型
       */

      var DebuffEffect = exports('DebuffEffect', Enum({
        None: 0,
        Fire: 1,
        Ice: 2,
        Poison: 3,
        Lighting: 4
      }));
      /**
       * 怪物被攻击后动画类型
       */

      var BeAtkEffect = exports('BeAtkEffect', Enum({
        None: 0,
        Boom: 1,
        Fire: 2
      }));
      /**
       * debuff类型
       */

      var DmgType = exports('DmgType', Enum({
        Normal: 0,
        Crit: 1,
        Buff: 2,
        Miss: 3,
        AddBlood: 4
      }));
      /**
       * 其它自定义事件
       */

      var CustomEvent = exports('CustomEvent', Enum({
        TtRecord: 'TtRecord',
        TtShareRecord: 'TtShareRecord'
      }));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './wuxian_GameUI.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component, GRoot, AllBinder, GUIManager, wuxian_GameUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      GRoot = module.GRoot;
    }, function (module) {
      AllBinder = module.AllBinder;
      GUIManager = module.GUIManager;
    }, function (module) {
      wuxian_GameUI = module.default;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "489ecVSxE1Cf4/CJw2SeLB7", "GameView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var skip = 1;
      var GameView = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameView, _Component);

        function GameView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.skyBox = void 0;
          _this._dt = 0;
          return _this;
        }

        var _proto = GameView.prototype;

        _proto.onLoad = function onLoad() {
          AllBinder.bindAll(); //初始化配置

          var groot = GRoot.create();
        };

        _proto.start = function start() {
          GUIManager.open(wuxian_GameUI);
          this.skyBox = director.getScene().globals.skybox;
        };

        _proto.update = function update(dt) {
          this._dt++;

          if (this._dt > skip) {
            this._dt = 0;
            this.skyBox.rotationAngle -= dt * 1;
          }
        };

        return GameView;
      }(Component)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Global.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEnum.ts', './drongo-cc.mjs', './EffectCtrl.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, director, Assets, EventType, BundleMgrImpl, EffectCtrl;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      Assets = module.Assets;
      EventType = module.EventType;
    }, function (module) {
      BundleMgrImpl = module.BundleMgrImpl;
    }, function (module) {
      EffectCtrl = module.EffectCtrl;
    }],
    execute: function () {
      cclegacy._RF.push({}, "01369zwurNGq4mcOCP4pjfi", "Global", undefined);

      var Global = exports('default', /*#__PURE__*/function () {
        function Global() {} //本次启动小游戏后，是否提示了从进度开始

        /**0环境节点,1是角色，2是怪物，3是子弹,4是回收 */

        /**抽奖关卡 */


        Global.freeze = function freeze(scale, time) {
          var _this = this;

          if (this.isFreeze) return;
          this.isFreeze = true;
          this.freezescale = scale;
          Global.timeScale = scale;
          setTimeout(function () {
            _this.isFreeze = false;
            Global.timeScale = 1;
          }, time * 1000);
        };

        Global.tweenCam = function tweenCam(num, time, speed) {
          if (speed === void 0) {
            speed = 5;
          }

          director.emit(EventType.TweenCam, num, time, speed);
        }
        /**
        * @name: 
        * @msg: 
        * @param {Prefab} prefab 预制体名
        * @param {true} play 是否播放
        * @param {Vec3} pos 位置
        * @param {*} time 回收时间，不回收不填
        * @return {*}
        */
        ;

        Global.playSkill = /*#__PURE__*/function () {
          var _playSkill = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prefab, play, pos, time, eulerY, parent) {
            var node, skillCtrl;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (play === void 0) {
                    play = true;
                  }

                  _context.next = 3;
                  return skillBundleMgr.getPrefabNode(prefab);

                case 3:
                  node = _context.sent;
                  node.parent = parent ? parent : Global.stage[3];
                  pos && node.setPosition(pos.x, pos.y, pos.z);

                  if (play) {
                    node.getComponent(EffectCtrl).play();
                  }

                  if (time) {
                    skillCtrl = node.getComponent(EffectCtrl);
                    skillCtrl.scheduleOnce(function () {
                      if (play) {
                        node.getComponent(EffectCtrl).stop();
                      }

                      skillBundleMgr.recoverNode(node);
                    }, time);
                  }

                  if (eulerY) {
                    node.setRotationFromEuler(0, eulerY);
                  }

                  return _context.abrupt("return", node);

                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function playSkill(_x, _x2, _x3, _x4, _x5, _x6) {
            return _playSkill.apply(this, arguments);
          }

          return playSkill;
        }();

        return Global;
      }()); //资源管理器 配置

      Global.timeScale = 1;
      Global.LoadingRate = 0;
      Global.cam = null;
      Global.layer = [];
      Global.stage = [];
      Global.GamePause = true;
      Global.DrawLevel = 4;
      Global.firstLoad = true;
      Global.BoxVideo = false;
      Global.Speed = 1;
      Global.homeload = false;
      Global.gameload = false;
      Global.subload = false;
      Global.isLoading = false;
      Global.atkBuff = 1;
      Global.comboPoint = 0;
      Global.itemDrop = 0;
      Global.chapter = 1;
      Global.realLevel = 1;
      Global.camRadius = 7.5;
      Global.playerAtk = {
        dmg: 50,
        crit: 0.1
      };
      Global.currLevel = 0;
      Global.Debug = false;
      Global.isGame = true;
      Global.isFreeze = false;
      Global.freezescale = 0;
      var skillBundleMgr = exports('skillBundleMgr', new BundleMgrImpl('SkillBundle', {
        assetsPathConf: Assets,
        preLoadDir: ['Json']
      }, ['game'])); //覆写 director.tick 实现暂停

      var originalTick = director.tick;

      director.tick = function (dt) {
        dt *= Global.timeScale;
        originalTick.call(director, dt);
      };

      self['Global'] = Global;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Hero.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Actor.ts', './HeroProperty.ts', './drongo-gui.mjs', './wuxian_GameOver.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Actor, HeroProperty, GUIManager, wuxian_GameOver;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Actor = module.Actor;
    }, function (module) {
      HeroProperty = module.HeroProperty;
    }, function (module) {
      GUIManager = module.GUIManager;
    }, function (module) {
      wuxian_GameOver = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "1d460x0YKtFY41gMV7kanpi", "Hero", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      /**英雄类 */

      var Hero = exports('Hero', (_dec = ccclass('Hero'), _dec(_class = /*#__PURE__*/function (_Actor) {
        _inheritsLoose(Hero, _Actor);

        function Hero() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Actor.call.apply(_Actor, [this].concat(args)) || this;
          _this.autoAtk = false;
          _this.actorProperty = new HeroProperty();
          return _this;
        }

        var _proto = Hero.prototype;

        _proto.onDie = function onDie() {
          _Actor.prototype.onDie.call(this);

          GUIManager.open(wuxian_GameOver);
        };

        return Hero;
      }(Actor)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroProjectileEmitter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ProjectileEmiter.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ProjectileEmitter;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ProjectileEmitter = module.ProjectileEmitter;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "b5c6eqJ/N1Jc6Y2hUY16EJr", "HeroProjectileEmitter", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var HeroProjectileEmitter = exports('HeroProjectileEmitter', (_dec = ccclass('HeroProjectileEmitter'), _dec(_class = /*#__PURE__*/function (_ProjectileEmitter) {
        _inheritsLoose(HeroProjectileEmitter, _ProjectileEmitter);

        function HeroProjectileEmitter() {
          return _ProjectileEmitter.apply(this, arguments) || this;
        }

        return HeroProjectileEmitter;
      }(ProjectileEmitter)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroProperty.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ActorProperty.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ActorProperty;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ActorProperty = module.ActorProperty;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fd685N/QBlMvrs5uHQYyDVV", "HeroProperty", undefined);
      /**英雄的属性 */


      var HeroProperty = exports('HeroProperty', /*#__PURE__*/function (_ActorProperty) {
        _inheritsLoose(HeroProperty, _ActorProperty);

        function HeroProperty() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ActorProperty.call.apply(_ActorProperty, [this].concat(args)) || this;
          _this.skillArr = [];
          return _this;
        }

        return HeroProperty;
      }(ActorProperty));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroSkillProjectile.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Projectile.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Projectile;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Projectile = module.Projectile;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "decb9W2IZRIY4nu7WuudSSP", "HeroSkillProjectile", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var HeroSkillProjectile = exports('HeroSkillProjectile', (_dec = ccclass('HeroSkillProjectile'), _dec(_class = /*#__PURE__*/function (_Projectile) {
        _inheritsLoose(HeroSkillProjectile, _Projectile);

        function HeroSkillProjectile() {
          return _Projectile.apply(this, arguments) || this;
        }

        return HeroSkillProjectile;
      }(Projectile)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Level.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './wuxian_GameUI.ts', './Actor.ts', './EffectManager.ts', './ActorManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, BoxCollider, Node, Rect, v3, macro, math, Component, Size, v2, randomRange, RigidBody, GRoot, GUIManager, wuxian_GameUI, Actor, EffectManager, ActorManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BoxCollider = module.BoxCollider;
      Node = module.Node;
      Rect = module.Rect;
      v3 = module.v3;
      macro = module.macro;
      math = module.math;
      Component = module.Component;
      Size = module.Size;
      v2 = module.v2;
      randomRange = module.randomRange;
      RigidBody = module.RigidBody;
    }, function (module) {
      GRoot = module.GRoot;
    }, function (module) {
      GUIManager = module.GUIManager;
    }, function (module) {
      wuxian_GameUI = module.default;
    }, function (module) {
      Actor = module.Actor;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      ActorManager = module.ActorManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3;

      cclegacy._RF.push({}, "7b1eeT+QbtCLaYVJWPeAOmh", "Level", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 关卡脚本
       */

      var Level = exports('Level', (_dec = ccclass('Level'), _dec2 = property(BoxCollider), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Level, _Component);

        function Level() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /**
           * 出声点
           */

          _initializerDefineProperty(_this, "spawnCollider", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enemyLayer", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "effectLayer", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "skillLayer", _descriptor4, _assertThisInitialized(_this));
          /** 
           * 出生范围 
          */


          _this.spawnRect = new Rect();
          /**
           * 本次出生的出生点
           */

          _this.spawnPos = v3();
          /**
           * 出生时的血量
           */

          _this.spawnHp = 10;
          /**
           * 最大可存活的敌人数量
           */

          _this.maxAlive = 100;
          return _this;
        }

        var _proto = Level.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var wp, size;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  Level._instance = this;
                  wp = this.spawnCollider.node.worldPosition;
                  size = this.spawnCollider.size;
                  this.spawnRect.size = new Size(size.x, size.z);
                  this.spawnRect.center = v2(wp.x, wp.z);
                  _context.next = 7;
                  return ActorManager.instance.init();

                case 7:
                  GUIManager.open(wuxian_GameUI);
                  GRoot.inst.closeModalWait();
                  this.startSpawnTimer();

                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }();

        _proto.startSpawnTimer = function startSpawnTimer() {
          var _this2 = this;

          this.schedule(function () {
            _this2.randomSpawn();
          }, 1.0, 15, 3);
          this.schedule(function () {
            _this2.randomSpawn();
          }, 1.0, macro.REPEAT_FOREVER, 10);
          this.schedule(function () {
            _this2.spawnHp *= 1.2;
          }, 20, macro.REPEAT_FOREVER);
        };

        _proto.onDestroy = function onDestroy() {
          this.unscheduleAllCallbacks();
          Level._instance = null;
          GUIManager.closeAll();
          ActorManager.instance.clear();
          EffectManager.instance.destory();
        };

        _proto.randomSpawn = function randomSpawn() {
          if (ActorManager.instance.enemies.length >= this.maxAlive) {
            return;
          }

          if (ActorManager.instance.playerActor.dead) {
            return;
          } // this.spawnPos.x = math.randomRange(this.spawnRect.xMin, this.spawnRect.xMax);
          // this.spawnPos.z = math.randomRange(this.spawnRect.yMin, this.spawnRect.yMax);


          var actor = ActorManager.instance.playerActor;
          var pos = actor.node.worldPosition;
          this.spawnPos.x = math.randomRange(pos.x - 5, pos.x + 5);
          this.spawnPos.z = math.randomRange(pos.z - 5, pos.z + 5);
          this.doSpawn(this.spawnPos);
        };

        _proto.doSpawn = /*#__PURE__*/function () {
          var _doSpawn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(spawnPoint) {
            var enemy, actor;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return ActorManager.instance.createRandomEnemy();

                case 2:
                  enemy = _context2.sent;
                  enemy.setPosition(spawnPoint);
                  this.enemyLayer.addChild(enemy);
                  randomRange(1.0, 2.0);
                  actor = enemy.getComponent(Actor);
                  actor.actorProperty.hp = this.spawnHp;
                  actor.actorProperty.maxHp = this.spawnHp;
                  actor.respawn();
                  enemy.getComponent(RigidBody);
                // rigid.mass = rand;
                // enemy.scale = v3(rigid.mass, rigid.mass, rigid.mass);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function doSpawn(_x) {
            return _doSpawn.apply(this, arguments);
          }

          return doSpawn;
        }();

        _createClass(Level, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);

        return Level;
      }(Component), _class3._instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spawnCollider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enemyLayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "effectLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "skillLayer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./GameView.ts', './StartView.ts', './wuxianBinder.ts', './wuxian_Button5.ts', './wuxian_GameOver.ts', './wuxian_GameUI.ts', './wuxian_SkillChoose.ts', './wuxian_StartGame.ts', './wuxian_WindowModalWaiting.ts', './wuxian_chooseItem.ts', './wuxian_circle.ts', './wuxian_joystick.ts', './Actor.ts', './ActorProperty.ts', './AnimationEventListener.ts', './EnemyController.ts', './Hero.ts', './HeroProjectileEmitter.ts', './HeroProperty.ts', './HeroSkillProjectile.ts', './PhysicsGroup.ts', './PlayerController.ts', './Projectile.ts', './ProjectileEmiter.ts', './ProjectileProperty.ts', './StateDefine.ts', './FollowCamera.ts', './PlayerPreference.ts', './Setting.ts', './GameData.ts', './EffectManager.ts', './Events.ts', './VirtualInput.ts', './ActorManager.ts', './Level.ts', './ResourceDefine.ts', './MathUtil.ts', './Pools.ts', './MeshCtrl.ts', './RoleCtrl.ts', './StatusCtrl.ts', './BloodBarCtrl.ts', './BulletCtrl.ts', './DmgAnimCtrl.ts', './EffectCtrl.ts', './SkillCtrl.ts', './GameEnum.ts', './Global.ts', './orbit-camera.ts', './debug-view-runtime-control.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  var cclegacy, v3, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      v3 = module.v3;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fffb9OhrEREyaBiNJ+p7SAC", "MathUtil", undefined);

      var tempVec = v3();
      var tempVec2 = v3();
      var tempVec3 = v3();
      var up = v3();
      /**
       * 通用数学库
       */

      var MathUtil = exports('MathUtil', /*#__PURE__*/function () {
        function MathUtil() {}
        /**
         * Rodrigues’ Rotation Formula
         * 使 v 绕 u 轴旋转 maxAngleDelta （弧度）
         * @param out 
         * @param v 
         * @param u 
         * @param maxAngleDelta 
         */


        MathUtil.rotateAround = function rotateAround(out, v, u, maxAngleDelta) {
          //out = v*cos + uxv*sin  + (u*v)*u*(1- cos);
          var cos = Math.cos(maxAngleDelta);
          var sin = Math.sin(maxAngleDelta); // v * cos 

          Vec3.multiplyScalar(tempVec, v, cos); // u x v 

          Vec3.cross(tempVec2, u, v); // v*cos + uxv*sin

          Vec3.scaleAndAdd(tempVec3, tempVec, tempVec2, sin);
          var dot = Vec3.dot(u, v); // + (u*v)*u*(1-cos)

          Vec3.scaleAndAdd(out, tempVec3, u, dot * (1.0 - cos));
        }
        /**
         * 将 from 向 to 旋转 maxAngleDelta 弧度
         * @param out 
         * @param from 
         * @param to 
         * @param maxAngleDelta 
         */
        ;

        MathUtil.rotateToward = function rotateToward(out, from, to, maxAngleDelta) {
          Vec3.cross(up, from, to);
          this.rotateAround(out, from, up, maxAngleDelta);
        }
        /**
         * 求两个向量间的夹角（带符号）
         * @param from 
         * @param to 
         * @param axis 
         * @returns 
         */
        ;

        MathUtil.signAngle = function signAngle(from, to, axis) {
          var angle = Vec3.angle(from, to);
          Vec3.cross(tempVec, from, to);
          var sign = Math.sign(axis.x * tempVec.x + axis.y * tempVec.y + axis.z * tempVec.z);
          return angle * sign;
        };

        return MathUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MeshCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7f779GQidpN+ZAYnEjFqKMa", "MeshCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var hurtColor = [[0, 0, 0, 0], [1, 1, 0, 0.7], [1, 1, 0, 0.7], [0.25, 0.1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]];
      var MeshCtrl = exports('MeshCtrl', (_dec = ccclass('MeshCtrl'), _dec(_class = /*#__PURE__*/function () {
        function MeshCtrl(mesh) {
          this._range = 0;
          this.mesh = void 0;
          this.mesh = mesh;
        }

        _createClass(MeshCtrl, [{
          key: "disRange",
          get: function get() {
            return this._range;
          },
          set: function set(v) {
            this._range = v;
            this.mesh.setInstancedAttribute('a_disRange', [v]);
          }
        }, {
          key: "colorType",
          set: function set(type) {
            this.mesh.setInstancedAttribute('a_rimColor', hurtColor[type]);
          }
        }]);

        return MeshCtrl;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/orbit-camera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEnum.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, Quat, Vec2, Node, macro, director, input, Input, tween, lerp, Component, EventType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Vec2 = module.Vec2;
      Node = module.Node;
      macro = module.macro;
      director = module.director;
      input = module.input;
      Input = module.Input;
      tween = module.tween;
      lerp = module.lerp;
      Component = module.Component;
    }, function (module) {
      EventType = module.EventType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "6be7d8BhlpJFobtMkxMXvVa", "orbit-camera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          type = _decorator.type,
          executeInEditMode = _decorator.executeInEditMode;
      var tempVec3 = new Vec3();
      var tempVec3_2 = new Vec3();
      var tempQuat = new Quat();
      var tempVec2 = new Vec2();
      var tempVec2_2 = new Vec2();
      var DeltaFactor = 1 / 200;
      var OrbitCamera = exports('default', (_dec = ccclass('OrbitCamera'), _dec2 = executeInEditMode(true), _dec3 = type(Node), _dec4 = type(Node), _dec5 = property({
        visible: false
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OrbitCamera, _Component);

        function OrbitCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "enableTouch", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableScaleRadius", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotate", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSpeed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followSpeed", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "xRotationRange", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radiusScaleSpeed", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "minRadius", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxRadius", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followTargetRotationY", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startRotation", _descriptor13, _assertThisInitialized(_this));

          _this._center = new Vec3();
          _this._targetCenter = new Vec3();
          _this._touched = false;
          _this._targetRotation = new Vec3();
          _this._rotation = new Quat();

          _initializerDefineProperty(_this, "_targetRadius", _descriptor14, _assertThisInitialized(_this));

          _this._radius = 10;
          _this.dis = 0;
          _this.shakeRange = 0;
          _this.self = void 0;
          return _this;
        }

        var _proto = OrbitCamera.prototype;

        _proto.start = function start() {
          this.self = this.getComponent(OrbitCamera);
          macro.ENABLE_MULTI_TOUCH = true;
          director.on(EventType.ScreenShake, this.shakeScreen, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

          if (this.enableScaleRadius) {
            input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          }

          this.resetTargetRotation();
          Quat.fromEuler(this._rotation, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);

          if (this.target) {
            this._targetCenter.set(this.target.worldPosition);

            this._center.set(this._targetCenter);
          }

          this._radius = this.radius;
          this.limitRotation();
        };

        _proto.resetTargetRotation = function resetTargetRotation() {
          var targetRotation = this._targetRotation.set(this._startRotation);

          if (this.followTargetRotationY) {
            targetRotation = tempVec3_2.set(targetRotation);
            Quat.toEuler(tempVec3, this.target.worldRotation);
            targetRotation.y += tempVec3.y;
          }
        };

        _proto.onTouchStart = function onTouchStart(event) {
          this._touched = true;
        };

        _proto.shakeScreen = function shakeScreen(range) {
          if (range === void 0) {
            range = 0.5;
          }

          var t = range * 0.1;
          tween(this.self).to(t, {
            shake: -range
          }, {
            easing: 'elasticIn'
          }).to(t, {
            shake: range
          }, {
            easing: 'elasticOut'
          }).to(t, {
            shake: 0
          }).start();
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (!this._touched) return;
          var touch = event.touch;
          var touches = event.getAllTouches();
          /* scale radius for mobile multi touch */

          if (touches.length > 1) {
            var changedTouches = event.getTouches();
            var touch1 = null;
            var touch2 = null;

            if (changedTouches.length > 1) {
              touch1 = touches[0];
              touch2 = touches[1];
            } else {
              touch1 = touch;
              var diffID = touch1.getID();

              for (var i = 0; i < touches.length; i++) {
                var element = touches[i];

                if (element.getID() !== diffID) {
                  touch2 = element;
                  break;
                }
              }
            }

            touch1.getLocation(tempVec2);
            touch2.getLocation(tempVec2_2);
            var dis = Vec2.distance(tempVec2, tempVec2_2);
            var delta = dis - this.dis;
            this._targetRadius += this.radiusScaleSpeed * -Math.sign(delta) * 0.3;
            this._targetRadius = Math.min(this.maxRadius, Math.max(this.minRadius, this._targetRadius));
            this.dis = dis;
          }

          tempVec2 = touch.getDelta();
          this.setRotate(tempVec2);
        };

        _proto.onTouchEnd = function onTouchEnd() {
          this._touched = false;
        };

        _proto.setRotate = function setRotate(v2) {
          Quat.fromEuler(tempQuat, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);
          Quat.rotateX(tempQuat, tempQuat, -v2.y * DeltaFactor);
          Quat.rotateAround(tempQuat, tempQuat, Vec3.UP, -v2.x * DeltaFactor);
          Quat.toEuler(this._targetRotation, tempQuat);
          this.limitRotation();
        };

        _proto.onMouseWheel = function onMouseWheel(event) {
          var scrollY = event.getScrollY();
          this._targetRadius += this.radiusScaleSpeed * -Math.sign(scrollY);
          this._targetRadius = Math.min(this.maxRadius, Math.max(this.minRadius, this._targetRadius));
        };

        _proto.limitRotation = function limitRotation() {
          var rotation = this._targetRotation;

          if (rotation.x < this.xRotationRange.x) {
            rotation.x = this.xRotationRange.x;
          } else if (rotation.x > this.xRotationRange.y) {
            rotation.x = this.xRotationRange.y;
          }

          rotation.z = 0;
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          this.resetCam(dt);
        };

        _proto.resetCam = function resetCam(dt) {
          var targetRotation = this._targetRotation;

          if (this.autoRotate && !this._touched) {
            targetRotation.y += this.autoRotateSpeed * dt;
          }

          this._targetCenter.set(this.target.worldPosition);

          if (this.followTargetRotationY) {
            targetRotation = tempVec3_2.set(targetRotation);
            Quat.toEuler(tempVec3, this.target.worldRotation);
            targetRotation.y += tempVec3.y;
          }

          Quat.fromEuler(tempQuat, targetRotation.x, targetRotation.y, targetRotation.z);
          Quat.slerp(this._rotation, this._rotation, tempQuat, dt * 7 * this.rotateSpeed);
          Vec3.lerp(this._center, this._center, this._targetCenter, dt * 5 * this.followSpeed);
          var radius = this._targetRadius + this.shake;
          this._radius = lerp(this._radius, radius, dt * 10);
          Vec3.transformQuat(tempVec3, Vec3.FORWARD, this._rotation);
          Vec3.multiplyScalar(tempVec3, tempVec3, this._radius);
          tempVec3.add(this._center);
          this.node.position = tempVec3;
          this.node.lookAt(this._center);
        };

        _createClass(OrbitCamera, [{
          key: "radius",
          get: function get() {
            return this._targetRadius;
          },
          set: function set(v) {
            this._targetRadius = v;
          }
        }, {
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(v) {
            this._target = v;

            this._targetRotation.set(this._startRotation);

            this._targetCenter.set(v.worldPosition);
          }
        }, {
          key: "preview",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.resetCam(1);
          }
        }, {
          key: "targetRotation",
          get: function get() {
            return this._startRotation;
          },
          set: function set(v) {
            this._targetRotation.set(v);

            this._startRotation.set(v);
          }
        }, {
          key: "shake",
          get: function get() {
            return this.shakeRange;
          },
          set: function set(v) {
            this.shakeRange = v;
          }
        }]);

        return OrbitCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enableTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableScaleRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "autoRotate", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "autoRotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "xRotationRange", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(5, 70);
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "radius", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "radiusScaleSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "minRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "target", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preview", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "preview"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "targetRotation", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "targetRotation"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "followTargetRotationY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_startRotation", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_targetRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsGroup.ts", ['cc'], function (exports) {
  var cclegacy, PhysicsSystem;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      PhysicsSystem = module.PhysicsSystem;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6b4573dmDRNPpgISAoTURvS", "PhysicsGroup", undefined);
      /**
       * 物理分组定义
       */


      var PhysicsGroup = exports('PhysicsGroup', /*#__PURE__*/function () {
        function PhysicsGroup() {}
        /**玩家的子弹 */

        /**敌人 */

        /**玩家 */

        /**敌人的子弹 */


        PhysicsGroup.isHurtable = function isHurtable(srcGroup, destGroup) {
          if (srcGroup == this.Enemy) {
            return destGroup == this.Player;
          }

          if (srcGroup == this.Bullet) {
            return destGroup == this.Enemy;
          }

          if (srcGroup == this.EnemyBullet) {
            return destGroup == this.Player;
          }

          return false;
        };

        return PhysicsGroup;
      }());
      PhysicsGroup.Default = PhysicsSystem.PhysicsGroup.DEFAULT;
      PhysicsGroup.Bullet = 1 << 1;
      PhysicsGroup.Enemy = 1 << 2;
      PhysicsGroup.Player = 1 << 3;
      PhysicsGroup.EnemyBullet = 1 << 4;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts', './VirtualInput.ts', './ActorManager.ts', './ResourceDefine.ts', './MathUtil.ts', './Hero.ts', './HeroProjectileEmitter.ts', './StateDefine.ts', './Actor.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, v3, Node, Vec3, math, Component, randomRange, Events, VirtualInput, ActorManager, GameBundleMgr, DynamicResourceDefine, MathUtil, Hero, HeroProjectileEmitter, StateDefine, Actor;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      Node = module.Node;
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
      randomRange = module.randomRange;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      VirtualInput = module.VirtualInput;
    }, function (module) {
      ActorManager = module.ActorManager;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
      DynamicResourceDefine = module.DynamicResourceDefine;
    }, function (module) {
      MathUtil = module.MathUtil;
    }, function (module) {
      Hero = module.Hero;
    }, function (module) {
      HeroProjectileEmitter = module.HeroProjectileEmitter;
    }, function (module) {
      StateDefine = module.StateDefine;
    }, function (module) {
      Actor = module.Actor;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "dccdbMnHTpOeoXNijGFHRCt", "PlayerController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var tempForward = v3();
      /**
       * 玩家控制器
       */

      var PlayerController = exports('PlayerController', (_dec = ccclass('PlayerController'), _dec2 = requireComponent(Hero), _dec3 = requireComponent(HeroProjectileEmitter), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerController, _Component);

        function PlayerController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bow", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bowstring", _descriptor2, _assertThisInitialized(_this));

          _this.HeroProjectileEmitter = void 0;
          _this.shootDirection = v3();
          _this._splitAngle = [0];
          _this.actor = null;
          return _this;
        }

        var _proto = PlayerController.prototype;

        _proto.start = function start() {
          this.actor = this.node.getComponent(Hero);
          ActorManager.instance.playerActor = this.actor;
          this.HeroProjectileEmitter = this.node.getComponent(HeroProjectileEmitter);
          this.node.on("onFrameAttackLoose", this.onFrameAttackLoose, this);
          this.node.on(Events.onEnemyKilled, this.onKilled, this);
          this.projectileCount = 10;
        };

        _proto.onDestroy = function onDestroy() {
          ActorManager.instance.playerActor = null;
          this.node.off("onFrameAttackLoose", this.onFrameAttackLoose, this);
          this.node.off(Events.onEnemyKilled, this.onKilled, this);
        };

        _proto.update = function update(dt) {
          if (this.actor.currState == StateDefine.Die || this.actor.currState == StateDefine.Hit) {
            return;
          }

          var len = this.handleInput();

          if (len > 0.1) {
            this.actor.changeState(StateDefine.Run);
          } else if (this.actor.autoAtk) {
            // 查找面前是否有怪物
            var enemy = this.getNeareastEnemy();

            if (enemy) {
              Vec3.subtract(this.actor.destForward, enemy.worldPosition, this.node.worldPosition);
              this.actor.destForward.normalize(); // 如果有射击

              this.actor.changeState(StateDefine.Attack);
            } else if (this.actor.currState != StateDefine.Attack) {
              this.actor.changeState(StateDefine.Idle);
            }
          } else {
            if (this.actor.currState != StateDefine.Attack) {
              this.actor.changeState(StateDefine.Idle);
            }
          }
        };

        _proto.handleInput = function handleInput() {
          var x = VirtualInput.horizontal;
          var y = VirtualInput.vertical;
          this.actor.destForward.x = x;
          this.actor.destForward.z = -y;
          this.actor.destForward.y = 0;
          this.actor.destForward.normalize();
          return this.actor.destForward.length();
        };

        _proto.onFrameAttackLoose = /*#__PURE__*/function () {
          var _onFrameAttackLoose = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var arrowStartPos, i, projectile, _property, willChase;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  GameBundleMgr.play(DynamicResourceDefine.audio.SfxShoot);
                  arrowStartPos = this.bowstring.worldPosition;
                  Vec3.subtract(this.shootDirection, this.bow.worldPosition, arrowStartPos);
                  this.shootDirection.normalize();
                  i = 0;

                case 5:
                  if (!(i < this.projectileCount)) {
                    _context.next = 21;
                    break;
                  }

                  _context.next = 8;
                  return this.HeroProjectileEmitter.create();

                case 8:
                  projectile = _context.sent;
                  MathUtil.rotateAround(tempForward, this.node.forward, Vec3.UP, this._splitAngle[i]);
                  projectile.node.forward = tempForward.clone();
                  projectile.node.worldPosition = arrowStartPos;
                  projectile.host = this.node;
                  _property = projectile.projectProperty;
                  _property.penetration = this.actor.actorProperty.penetration;
                  willChase = randomRange(0, 100) < this.actor.actorProperty.chaseRate;

                  if (willChase) {
                    projectile.target = ActorManager.instance.randomEnemy;
                    _property.chase = willChase && projectile.target != null;
                  }

                  projectile == null ? void 0 : projectile.fire();

                case 18:
                  i++;
                  _context.next = 5;
                  break;

                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function onFrameAttackLoose() {
            return _onFrameAttackLoose.apply(this, arguments);
          }

          return onFrameAttackLoose;
        }();

        _proto.onKilled = function onKilled(actor) {
          var acotrProperty = this.actor.actorProperty;
          acotrProperty.exp++;
          this.node.emit(Events.onExpGain);

          if (acotrProperty.exp >= acotrProperty.maxExp) {
            acotrProperty.exp -= acotrProperty.maxExp;
            acotrProperty.maxExp *= 1.1;
            acotrProperty.level++;
            acotrProperty.maxHp += 10;
            acotrProperty.hp = acotrProperty.maxHp;
            this.onUpgradeLevel();
          }
        };

        _proto.onUpgradeLevel = function onUpgradeLevel() {
          this.node.emit(Events.onPlayerUpgrade);
        };

        _proto.getNeareastEnemy = function getNeareastEnemy() {
          var enemies = ActorManager.instance.enemies;

          if (!enemies || (enemies == null ? void 0 : enemies.length) == 0) {
            return null;
          }

          var nearDistance = 99999;
          var nearastEnemy = null;

          for (var _iterator = _createForOfIteratorHelperLoose(enemies), _step; !(_step = _iterator()).done;) {
            var enemy = _step.value;
            var actor = enemy.getComponent(Actor);

            if (actor.dead) {
              continue;
            }

            var distance = Vec3.distance(this.node.worldPosition, enemy.worldPosition);

            if (distance < nearDistance) {
              nearDistance = distance;
              nearastEnemy = enemy;
            }
          }

          return nearastEnemy;
        };

        _createClass(PlayerController, [{
          key: "projectileCount",
          get: function get() {
            return this.actor.actorProperty.projectileCount;
          },
          set: function set(count) {
            var actorProperty = this.actor.actorProperty;

            if (count <= 0) {
              actorProperty.projectileCount = 1;
            }

            actorProperty.projectileCount = count;
            this._splitAngle = [];
            var a = math.toRadian(10);
            var even = count % 2 != 0;
            var len = Math.floor(actorProperty.projectileCount / 2);

            for (var i = 0; i < len; i++) {
              this._splitAngle.push(-a * (i + 1));

              this._splitAngle.push(a * (i + 1));
            }

            if (even) {
              this._splitAngle.push(0);
            }
          }
        }, {
          key: "chaseRate",
          get: function get() {
            return this.actor.actorProperty.chaseRate;
          },
          set: function set(val) {
            this.actor.actorProperty.chaseRate = math.clamp(this.actor.actorProperty.chaseRate + val, 0, 100);
          }
        }, {
          key: "penetraion",
          set: function set(val) {
            this.actor.actorProperty.penetration = math.clamp(this.actor.actorProperty.penetration + val, 0, 100);
          }
        }]);

        return PlayerController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bow", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bowstring", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerPreference.ts", ['cc'], function (exports) {
  var cclegacy, _decorator, sys;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f3a38Xq7u5H5pMw7NZcYTeR", "PlayerPreference", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 用户数据类
       */

      var PlayerPreference = exports('PlayerPreference', (_dec = ccclass('PlayerPreference'), _dec(_class = /*#__PURE__*/function () {
        function PlayerPreference() {}
        /**
         * 保存浮点数
         * @param key 
         * @param number 
         */


        PlayerPreference.setFloat = function setFloat(key, number) {
          sys.localStorage.setItem(key, number.toString());
        }
        /**
         * 读取浮点数
         * @param key 
         * @returns 
         */
        ;

        PlayerPreference.getFloat = function getFloat(key) {
          var n = sys.localStorage.getItem(key);
          return Number.parseFloat(n);
        };

        return PlayerPreference;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Pools.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, _decorator, Pool;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Pool = module.Pool;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d02211hwWxKIofIC1Wt9tUE", "Pools", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 内存池
       */

      var Pools = exports('Pools', (_dec = ccclass('Pools'), _dec(_class = /*#__PURE__*/function () {
        function Pools() {
          this.pools = new Map();
        }

        var _proto = Pools.prototype;

        _proto.pool = function pool(key) {
          return this.pools.get(key);
        };

        _proto.newPool = function newPool(key, ctor, elementsPerBatch, dtor) {
          var pool = new Pool(ctor, elementsPerBatch, dtor);
          this.pools.set(key, pool);
        };

        _proto.allocc = function allocc(key) {
          return this.pool(key).alloc();
        };

        _proto.free = function free(key, node) {
          this.pool(key).free(node);
        };

        _proto.destory = function destory(key) {
          this.pool(key).destroy();
        };

        _proto.destroyAll = function destroyAll() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.pools.values()), _step; !(_step = _iterator()).done;) {
            var pool = _step.value;
            pool.destroy();
          }

          this.pools.clear();
        };

        return Pools;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Projectile.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EffectManager.ts', './Events.ts', './ResourceDefine.ts', './MathUtil.ts', './ProjectileProperty.ts', './Actor.ts', './StateDefine.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, v3, Collider, CCFloat, ParticleSystem, Vec3, math, Component, EffectManager, Events, GameBundleMgr, MathUtil, ProjectileProperty, Actor, StateDefine;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      Collider = module.Collider;
      CCFloat = module.CCFloat;
      ParticleSystem = module.ParticleSystem;
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
    }, function (module) {
      MathUtil = module.MathUtil;
    }, function (module) {
      ProjectileProperty = module.ProjectileProperty;
    }, function (module) {
      Actor = module.Actor;
    }, function (module) {
      StateDefine = module.StateDefine;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "833cdo40JJKyKEEQFf6FFDv", "Projectile", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var temp = v3();
      /**
       * 投射物
       */

      var Projectile = exports('Projectile', (_dec = ccclass('Projectile'), _dec2 = property(Collider), _dec3 = property(ProjectileProperty), _dec4 = property(CCFloat), _dec5 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Projectile, _Component);

        function Projectile() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "collider", _descriptor, _assertThisInitialized(_this));

          _this.startTime = 0;
          _this.position = v3();

          _initializerDefineProperty(_this, "projectProperty", _descriptor2, _assertThisInitialized(_this));

          _this.host = null;
          _this.target = null;
          _this.forward = v3();

          _initializerDefineProperty(_this, "angularSpeed", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "linearSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "effectName", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sound", _descriptor6, _assertThisInitialized(_this));

          _this.particleSystems = [];
          return _this;
        }

        var _proto = Projectile.prototype;

        _proto.start = function start() {
          var _this$collider;

          (_this$collider = this.collider) == null ? void 0 : _this$collider.on("onTriggerEnter", this.onTriggerEnter, this);
          this.particleSystems = this.node.getComponentsInChildren(ParticleSystem);
        };

        _proto.onDisable = function onDisable() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.particleSystems), _step; !(_step = _iterator()).done;) {
            var particleSystem = _step.value;
            particleSystem.stop();
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.collider.off("onTriggerEnter", this.onTriggerEnter, this);
        };

        _proto.fire = function fire() {
          this.startTime = 0;

          for (var _iterator2 = _createForOfIteratorHelperLoose(this.particleSystems), _step2; !(_step2 = _iterator2()).done;) {
            var particleSystem = _step2.value;
            particleSystem.play();
          }
        };

        _proto.update = function update(deltaTime) {
          var _this$projectProperty;

          this.startTime += deltaTime;

          if (this.startTime >= this.projectProperty.liftTime) {
            this.node.emit(Events.onProjectileDead, this);
          }

          if ((_this$projectProperty = this.projectProperty) != null && _this$projectProperty.chase) {
            Vec3.subtract(this.forward, this.target.worldPosition, this.node.worldPosition);
            this.forward.y = 0;
            this.forward.normalize();
            var maxAngle = this.angularSpeed * deltaTime;
            MathUtil.rotateToward(temp, this.node.forward, this.forward, math.toRadian(maxAngle));
            this.node.forward = temp;
          }

          Vec3.scaleAndAdd(this.position, this.node.worldPosition, this.node.forward, this.linearSpeed * deltaTime);
          this.node.worldPosition = this.position;
        };

        _proto.onTriggerEnter = function onTriggerEnter(event) {
          var _EffectManager$instan;

          var actor = event.otherCollider.getComponent(Actor);

          if (actor == null || actor.currState == StateDefine.Die) {
            return;
          }

          this.projectProperty.penetration--;

          if (this.projectProperty.penetration <= 0) {
            this.node.emit(Events.onProjectileDead, this);
          }

          (_EffectManager$instan = EffectManager.instance) == null ? void 0 : _EffectManager$instan.play(this.effectName, event.selfCollider.node.worldPosition);
          GameBundleMgr.play(this.sound);
        };

        return Projectile;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "collider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "projectProperty", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new ProjectileProperty();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "angularSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 180;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "linearSpeed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "effectName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sound", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProjectileEmiter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts', './Projectile.ts', './Level.ts', './ResourceDefine.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, Events, Projectile, Level, GameBundleMgr;

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
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      Projectile = module.Projectile;
    }, function (module) {
      Level = module.Level;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "a6734z3l21OnqOZbjwsAUWp", "ProjectileEmiter", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 投射物发射器
       */

      var ProjectileEmitter = exports('ProjectileEmitter', (_dec = ccclass('ProjectileEmitter'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ProjectileEmitter, _Component);

        function ProjectileEmitter() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /**
           * 投射物预制体
           */

          _initializerDefineProperty(_this, "projectile", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ProjectileEmitter.prototype;

        _proto.start = function start() {// const poolCount = 5;
          // this.prefabPool = new Pool(() => {
          //     return instantiate(this.projectile!);
          // }, poolCount, (node: Node) => {
          //     node.removeFromParent();
          // });
        };

        _proto.onDestroy = function onDestroy() {};

        _proto.create = /*#__PURE__*/function () {
          var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var node, projectile;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return GameBundleMgr.getPrefabNode(this.projectile, GameBundleMgr.key.Skill);

                case 2:
                  node = _context.sent;
                  if (node.parent == null) Level.instance.skillLayer.addChild(node);
                  node.active = true;
                  node.once(Events.onProjectileDead, this.onProjectileDead, this);
                  projectile = node.getComponent(Projectile);
                  return _context.abrupt("return", projectile);

                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function create() {
            return _create.apply(this, arguments);
          }

          return create;
        }();

        _proto.onProjectileDead = function onProjectileDead(projectile) {
          projectile.node.active = false;
          GameBundleMgr.recoverNode(projectile.node);
        };

        return ProjectileEmitter;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "projectile", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "Arrow";
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProjectileProperty.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "cfa67X3sY5LTY4WlphZqAZR", "ProjectileProperty", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 投射物属性
       */

      var ProjectileProperty = exports('ProjectileProperty', (_dec = ccclass('ProjectileProperty'), _dec(_class = (_class2 = function ProjectileProperty() {
        /**
         * 穿透
         */
        _initializerDefineProperty(this, "penetration", _descriptor, this);
        /**
         * 时长
         */


        _initializerDefineProperty(this, "liftTime", _descriptor2, this);
        /**
         * 追踪
         */


        _initializerDefineProperty(this, "chase", _descriptor3, this);
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "penetration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "liftTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "chase", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResourceDefine.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, AudioClip, Prefab, BundleMgrImpl;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      AudioClip = module.AudioClip;
      Prefab = module.Prefab;
    }, function (module) {
      BundleMgrImpl = module.BundleMgrImpl;
    }],
    execute: function () {
      cclegacy._RF.push({}, "584deKf/w5ArZ+2GBmhjMt0", "ResourceDefine", undefined);

      var DynamicResourceDefine = exports('DynamicResourceDefine', {
        directory: ["effect", "audio", "actor", "ui"],
        Actor: {
          Enemy: {
            Path: "actor/prefab/enemy/"
          }
        },
        Effect: {
          // Path: "effect/prefab/",
          EffExplore: "EffExplore",
          EffDie: "EffDie"
        },
        audio: {
          Bgm: "bgSound",
          SfxHit: "Shot_4",
          SfxShoot: "footstep"
        }
      });
      var Assets = {
        // Skills: { type: Prefab, path: "skills/" },
        // Json: { type: JsonAsset, path: "jsons/" },
        Clips: {
          type: AudioClip,
          path: "audio/"
        },
        // Atlas: { type: SpriteAtlas, path: "Atlas" },
        // Material: { type: Material, path: "Materials" },
        Prefabs: {
          type: Prefab,
          path: ""
        },
        Enemy: {
          type: Prefab,
          path: "actor/prefab/enemy/"
        },
        Effect: {
          type: Prefab,
          path: "effect/prefab/"
        },
        Skill: {
          type: Prefab,
          path: "Skill/prefab/"
        }
      };
      var AudioDefine = exports('AudioDefine', {});
      var GameBundleMgr = exports('GameBundleMgr', new BundleMgrImpl('resources', {
        assetsPathConf: Assets,
        preLoadDir: []
      }));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoleCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BloodBarCtrl.ts', './GameEnum.ts', './Global.ts', './MeshCtrl.ts', './StatusCtrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Animation, MeshRenderer, director, tween, BloodBarCtrl, CharactorType, EventType, Clip, Global, skillBundleMgr, MeshCtrl, StatusCtrl;

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
      Animation = module.Animation;
      MeshRenderer = module.MeshRenderer;
      director = module.director;
      tween = module.tween;
    }, function (module) {
      BloodBarCtrl = module.BloodBarCtrl;
    }, function (module) {
      CharactorType = module.CharactorType;
      EventType = module.EventType;
      Clip = module.Clip;
    }, function (module) {
      Global = module.default;
      skillBundleMgr = module.skillBundleMgr;
    }, function (module) {
      MeshCtrl = module.MeshCtrl;
    }, function (module) {
      StatusCtrl = module.StatusCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "822d1Lz6xNErbFhYM6aJCER", "RoleCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var idle = "idle";
      var hit = "hit";
      var die = "die";
      var attack = "attack";
      var RoleCtrl = exports('RoleCtrl', (_dec = ccclass('RoleCtrl'), _dec2 = property(Animation), _dec3 = property({
        type: MeshRenderer,
        tooltip: '角色mesh材质'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_StatusCtrl) {
        _inheritsLoose(RoleCtrl, _StatusCtrl);

        function RoleCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _StatusCtrl.call.apply(_StatusCtrl, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "anim", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "mesh", _descriptor2, _assertThisInitialized(_this));

          _this.meshCtrl = null;
          _this.isHurt = false;
          _this.isInit = false;
          /**新动画之前的动画 */

          _this.animType = null;
          _this.boomTime = 0;
          return _this;
        }

        var _proto = RoleCtrl.prototype;

        _proto.onEnable = function onEnable() {
          this.anim.node.setPosition(0, -180);
        };

        _proto.init = function init() {
          var _this2 = this;

          if (!this.isInit) {
            this.initStatus();
            this.meshCtrl = new MeshCtrl(this.mesh);
            this.isInit = true;
          } else {
            this.initStatus();
          }

          if (this.charactor == CharactorType.Player) {
            director.on(EventType.PlayAnm, this.playAnim, this);
          }

          this.anim.play(idle);
          tween(this.meshCtrl).set({
            disRange: -1
          }).call(function () {
            _this2.anim.node.setPosition(0, 0);
          }).to(1., {
            disRange: 0
          }).call(function () {
            _this2.isDie = false;

            _this2.initBloodBar(true);
          }).start();
        }
        /**
        * 收到伤害
        * @param crit
        * @param atk 
        * @param debuff
        */
        ;

        _proto.beHit = function beHit(baseAtk, bonusAtk) {
          var _this3 = this;

          if (this.isDie) return;

          if (this.Shield) {
            this.bloodBarNode.getComponent(BloodBarCtrl).onMiss();
            return;
          }

          if (this.currAttribue.get('shield') > Math.random()) {
            this.unschedule(this.closeShield);
            this.Shield = true;
            this.schedule(this.closeShield, 2, 0);
            this.bloodBarNode.getComponent(BloodBarCtrl).onMiss();
            return;
          }

          var atk = baseAtk.dmg * bonusAtk.scale;
          var crit = baseAtk.crit;
          this.onHurt(atk, crit);

          if (bonusAtk.repeat) {
            this.schedule(function () {
              _this3.onHurt(atk, crit);
            }, 0.22, bonusAtk.repeat - 1);
          } //飞剑


          if (bonusAtk.sword && bonusAtk.sword > Math.random()) {
            Global.playSkill("Sword", true, this.node.position, 0.5);
            skillBundleMgr.play(Clip.sword);
            this.schedule(function () {
              _this3.onHurt(atk * 0.25, 0, 1);
            }, 0.25, 3, 0.2);
          } //剧毒buff


          if (bonusAtk.veno && bonusAtk.veno > Math.random()) {
            this.onHurt(atk, 0);
            this.schedule(function () {
              _this3.onHurt(atk, 0, 2);
            }, 0.6, 1);
          } //剑刃buff


          if (bonusAtk.wave && bonusAtk.wave > Math.random()) {
            skillBundleMgr.play(Clip.wave);
            Global.playSkill("bladewave", true, baseAtk.node.position, 0.75).then(function (wave) {
              wave.setRotationFromEuler(0, baseAtk.node.eulerAngles.y);

              _this3.schedule(function () {
                _this3.onHurt(atk * 0.65, 0, 3);
              }, 0.1, 0);
            });
          } //火焰buff


          if (bonusAtk.fire && bonusAtk.fire > Math.random()) {
            this.schedule(function () {
              _this3.onHurt(atk * 0.7, 0, 4);
            }, 0.55, 0);
          } //闪电buff


          if (bonusAtk.thunder && bonusAtk.thunder > Math.random()) {
            Global.playSkill("lighteffect", true, this.node.position, 0.65);
            this.schedule(function () {
              _this3.onHurt(atk * 0.4, 5);
            }, 0.26, 0, 0.2);
          }
        } // private addPulse(rad, speed) {
        //     // if(this._skill) return
        //     rad = rad * Math.PI / 180;
        //     this.hitSpeed.x = 0.1 * Math.sin(rad);
        //     this.hitSpeed.z = 0.1 * Math.cos(rad);
        //     this.pulse = true;
        //     this.unschedule(this.stopPulse);
        //     this.scheduleOnce(this.stopPulse, speed);
        // }
        // private stopPulse() {
        //     this.pulse = false
        // }
        ;

        _proto.stopHit = function stopHit() {
          this.hurt = false;
        }
        /**
        * 伤害计算公式
        * @param atk 基础伤害
        */
        ;

        _proto.reallyDmg = function reallyDmg(atk) {
          //真实伤害
          atk = atk * (1 - 0.1) * (1 + 0.05 * Math.random()) + 8 * Math.random();
          return Math.floor(atk);
        };

        _proto.onHurt = function onHurt(dmg, crit, type) {
          if (type === void 0) {
            type = 0;
          }

          if (this.isDie) {
            return;
          }

          var _miss = Math.random() <= this.currAttribue.get('miss');

          if (_miss) {
            this.bloodBarNode.getComponent(BloodBarCtrl).onMiss();
            return;
          }

          this.bitAnim(type);

          var _crit = crit > Math.random() ? true : false;

          if (_crit) {
            dmg *= 2;
            director.emit(EventType.ScreenShake, 0.3);
            Global.freeze(0.1, 0.02);
          }

          dmg = this.reallyDmg(dmg);
          var hp = this.currAttribue.get('hp') - dmg;

          if (hp <= 0) {
            this.currAttribue.set('hp', 0);
            this.death();
          } else {
            this.currAttribue.set('hp', hp);
          }

          this.updateBloodBar(dmg, _crit);
        }
        /**
         * 死亡
         */
        ;

        _proto.death = /*#__PURE__*/function () {
          var _death = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this4 = this;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.isDie) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  this.isDie = true;
                  this.hurt = false;
                  /** 避免一起播放死亡声音*/

                  this.unscheduleAllCallbacks();
                  this.returnNormal();
                  this.bloodBarNode && this.bloodBarNode.getComponent(BloodBarCtrl).recycleSelf();
                  this.scheduleOnce(function () {
                    _this4.playAnim(die);

                    skillBundleMgr.play(Clip.die);
                    director.emit(EventType.ScreenShake, 0.5);
                    Global.freeze(0.3, 0.15);
                  }, Math.random() * 0.25);
                  this.node.parent = Global.stage[4]; // this.playAnim(this.deathAnim);

                  tween(this.meshCtrl).to(1.5, {
                    disRange: -1
                  }).call(function () {
                    _this4.recycleSelf();
                  }).start();

                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function death() {
            return _death.apply(this, arguments);
          }

          return death;
        }()
        /**怪或者任务 死亡后，系统回收到对象池 */
        ;

        _proto.recycleSelf = function recycleSelf() {
          var _this5 = this;

          if (!this.isDie) return;
          this.anim.stop();

          if (Global.Debug) {
            this.anim.node.setPosition(0, -180);
            var t = Math.random() * 0.5 + 1;
            this.scheduleOnce(function () {
              _this5.init();
            }, t);
          } else {
            skillBundleMgr.recoverNode(this.node);
          }
        };

        _proto.playNormalAnim = function playNormalAnim(animType) {
          this.anim.play(animType);
          this.animType = animType;
        }
        /**
         * 播放被攻击变色
         */
        ;

        _proto.bitAnim = function bitAnim(type) {
          if (type === void 0) {
            type = 0;
          }

          if (!this.isHurt) {
            skillBundleMgr.play(Clip.hurt);
            Global.playSkill("Boom", true, this.node.position, 0.25);
            this.playAnim(hit);
            this.meshCtrl.colorType = type + 1;
            this.unschedule(this.returnNormal);
            this.scheduleOnce(this.returnNormal, 0.2);
            this.isHurt = true;
          }
        };

        _proto.returnNormal = function returnNormal() {
          this.playAnim(idle);
          this.isHurt = false;
          this.meshCtrl.colorType = 0;
        }
        /**
         * 播放指定的角色动作
         * @param animType 
         * @param isLoop 
         */
        ;

        _proto.playAnim = function playAnim(animType) {
          if (this.animType == animType && this.animType != hit && this.animType != attack) {
            return;
          } else {
            this.anim.play(animType);
            this.animType = animType;
          }
        };

        return RoleCtrl;
      }(StatusCtrl), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Setting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts', './PlayerPreference.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, math, EventTarget, Events, PlayerPreference;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      EventTarget = module.EventTarget;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      PlayerPreference = module.PlayerPreference;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "d4963rXtYVBXJF2S69IR6OU", "Setting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 配置
       */

      var Setting = exports('Setting', (_dec = ccclass('Setting'), _dec(_class = (_class2 = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Setting, _EventTarget);

        function Setting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          /**
           * 背景音量
           */

          _this._bgmVolume = 1.0;
          /**
           * 音效音量
           */

          _this._sfxVolume = 1.0;
          return _this;
        }

        var _proto = Setting.prototype;

        _proto.load = function load() {
          this._bgmVolume = PlayerPreference.getFloat("bgmVolume");

          if (isNaN(this._bgmVolume)) {
            this._bgmVolume = 1.0;
          }

          this._sfxVolume = PlayerPreference.getFloat("sfxVolume");

          if (isNaN(this._sfxVolume)) {
            this._sfxVolume = 1.0;
          }
        };

        _createClass(Setting, [{
          key: "bgmVolume",
          get: function get() {
            return this._bgmVolume;
          },
          set: function set(value) {
            this._bgmVolume = math.clamp01(value);
            PlayerPreference.setFloat("bgmVolume", value);
            this.emit(Events.onBgmVolumeChanged, this._bgmVolume);
          }
        }, {
          key: "sfxVolume",
          get: function get() {
            return this._sfxVolume;
          },
          set: function set(value) {
            this._sfxVolume = math.clamp01(value);
            PlayerPreference.setFloat("sfxVolume", value);
          }
        }], [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);

        return Setting;
      }(EventTarget), _class2._instance = new _class2(), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkillCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEnum.ts', './Global.ts', './BulletCtrl.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Vec3, Sprite, SpriteFrame, Node, tween, director, Component, EventType, Global, skillBundleMgr, BulletCtrl;

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
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      tween = module.tween;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      Global = module.default;
      skillBundleMgr = module.skillBundleMgr;
    }, function (module) {
      BulletCtrl = module.BulletCtrl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "1efb263/KxEv4YpvPiVDpKo", "SkillCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var btnScale = new Vec3(1.15, 1.15, 1.15);
      var btnNormal = new Vec3(1, 1, 1);
      var skillPos = new Vec3(0, 1.5);
      var SkillCtrl = exports('SkillCtrl', (_dec = ccclass('SkillCtrl'), _dec2 = property({
        type: Sprite
      }), _dec3 = property({
        type: Sprite
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SkillCtrl, _Component);

        function SkillCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "cdSP", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iconSP", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iconSFs", _descriptor3, _assertThisInitialized(_this));

          _this._cd = false;
          _this._config = void 0;
          return _this;
        }

        var _proto = SkillCtrl.prototype;

        _proto.init = function init(config) {
          this.node.on(Node.EventType.TOUCH_START, this._onTouchBegan, this);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchDown, this);
          this._config = config;
          var sf = this.iconSFs[this._config.conf.id];

          if (sf) {
            this.iconSP.spriteFrame = sf;
          }
        };

        _proto._onTouchBegan = function _onTouchBegan(event) {
          if (!this._cd) {
            tween(this.node).to(0.15, {
              scale: btnScale
            }).start();
          }
        };

        _proto._onTouchDown = function _onTouchDown(event) {
          if (!this._cd) {
            tween(this.node).to(0.15, {
              scale: btnNormal
            }).start();
            this.castSkill();
            var cd = this._config.conf.cd;
            var repeat = this._config.repeat + 1;
            var str = this._config.conf.name + "  " + this._config.conf.des + "  \u51B7\u5374\uFF1A" + cd + "S \u4F24\u5BB3\uFF1A\u653B\u51FB\u529Bx" + this._config.scale + "  \u6BB5\u6570\uFF1A" + repeat + "  \u7279\u6548\uFF1A\u8FD8\u6CA1\u505A";
            director.emit(EventType.SkillTip, str);
          }
        };

        _proto.castSkill = /*#__PURE__*/function () {
          var _castSkill = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;

            var time, name, clip, clipdelay, player, rad, offset, freeze, eulerY, skill;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this._cd = true;
                  time = this._config.conf.time | 2;
                  name = "skill" + this._config.conf.id;
                  clip = this._config.clip;

                  if (clip) {
                    clipdelay = this._config.clipdelay | 0;
                    this.scheduleOnce(function () {
                      skillBundleMgr.play(clip);
                      var shake = _this2._config.shake;

                      if (shake > 0) {
                        director.emit(EventType.ScreenShake, shake);
                      }
                    }, clipdelay);
                  }

                  player = Global.playerAtk.node;
                  /* just for demo,some skill's pos could be enemies' postions! */

                  skillPos.set(player.position);
                  director.emit(EventType.PlayAnm, "attack");
                  rad = player.eulerAngles.y * Math.PI / 180;
                  offset = this._config.conf.offset;

                  if (offset != 0) {
                    skillPos.x += offset * Math.sin(rad);
                    skillPos.z += offset * Math.cos(rad);
                  }

                  freeze = this._config.freeze;

                  if (freeze > 0) {
                    Global.freeze(0.2, freeze);
                  }

                  eulerY = player.eulerAngles.y;
                  /* you could pass player node here, if the skill is aligned to player */

                  _context.next = 16;
                  return Global.playSkill(name, true, skillPos, time, eulerY);

                case 16:
                  skill = _context.sent;
                  skill.getComponent(BulletCtrl).init(Global.playerAtk, this._config);
                // const cd = this._config.conf.cd;
                // tween(this.cdSP).set({ fillRange: 1 }).to(cd, { fillRange: 0 }).call(() => {
                //     this._cd = false;
                // }).start();

                case 18:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function castSkill() {
            return _castSkill.apply(this, arguments);
          }

          return castSkill;
        }();

        return SkillCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cdSP", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "iconSP", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iconSFs", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './fairygui.mjs', './drongo-gui.mjs', './wuxian_StartGame.ts', './wuxian_WindowModalWaiting.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, Component, global_config$1, drongoCc, fairygui, UIConfig, GRoot, GUIManager, drongoGui, AllBinder, wuxian_StartGame, wuxian_WindowModalWaiting;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      global_config$1 = module.global_config;
      drongoCc = module;
    }, function (module) {
      fairygui = module;
      UIConfig = module.UIConfig;
      GRoot = module.GRoot;
    }, function (module) {
      GUIManager = module.GUIManager;
      drongoGui = module;
      AllBinder = module.AllBinder;
    }, function (module) {
      wuxian_StartGame = module.default;
    }, function (module) {
      wuxian_WindowModalWaiting = module.default;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "284ebS0bzdKxbJSoAEoTQO1", "StartView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; //@ts-ignore

      global_config$1.log.output_position_b = true;
      var skip = 1;
      var StartView = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StartView, _Component);

        function StartView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.skyBox = void 0;
          _this._dt = 0;
          return _this;
        }

        var _proto = StartView.prototype;

        _proto.onLoad = /*#__PURE__*/function () {
          var _onLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var groot, waitUI;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  //初始化配置
                  groot = GRoot.create(); // director.addPersistRootNode(groot.node);

                  AllBinder.bindAll(); // fgui.UIConfig.buttonSound = "ui://MainMenu/click";
                  // fgui.UIConfig.buttonSoundVolumeScale = 1;

                  _context.next = 4;
                  return GUIManager.loadUI(wuxian_WindowModalWaiting);

                case 4:
                  waitUI = _context.sent;
                  UIConfig.globalModalWaiting = wuxian_WindowModalWaiting.URL; //@ts-ignore

                  groot._modalWaitPane = waitUI;

                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function onLoad() {
            return _onLoad.apply(this, arguments);
          }

          return onLoad;
        }();

        _proto.start = function start() {
          GUIManager.open(wuxian_StartGame);
          this.skyBox = director.getScene().globals.skybox;
        };

        _proto.update = function update(dt) {
          this._dt++;

          if (this._dt > skip) {
            this._dt = 0;
            this.skyBox.rotationAngle -= dt * 1;
          }
        };

        return StartView;
      }(Component)) || _class);
      {
        //@ts-ignore
        self["fgui"] = fairygui; //@ts-ignore

        self["drongoCC"] = drongoCc; //@ts-ignore

        self["drongoGui"] = drongoGui;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StateDefine.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "693b4+FMaVCmaylNs+Ipawl", "StateDefine", undefined);
      /**
       * 角色状态
       */


      var StateDefine = exports('StateDefine', /*#__PURE__*/function (StateDefine) {
        StateDefine["Idle"] = "idle";
        StateDefine["Attack"] = "attack";
        StateDefine["Hit"] = "hit";
        StateDefine["Run"] = "run";
        StateDefine["Die"] = "die";
        return StateDefine;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StatusCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './BloodBarCtrl.ts', './GameEnum.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Vec3, director, Component, Key, BloodBarCtrl, CharactorType, Global, skillBundleMgr;

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
      Vec3 = module.Vec3;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Key = module.Key;
    }, function (module) {
      BloodBarCtrl = module.BloodBarCtrl;
    }, function (module) {
      CharactorType = module.CharactorType;
    }, function (module) {
      Global = module.default;
      skillBundleMgr = module.skillBundleMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "53f0eOiDoJB5oKusqSMShrs", "StatusCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StatusCtrl = exports('StatusCtrl', (_dec = ccclass('StatusCtrl'), _dec2 = property({
        displayOrder: 0,
        tooltip: '怪物序号，和json配置一样'
      }), _dec3 = property({
        type: CharactorType,
        displayOrder: 1,
        tooltip: '场景角色的类型'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StatusCtrl, _Component);

        function StatusCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "height", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "id", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "charactor", _descriptor3, _assertThisInitialized(_this));

          _this.isDie = true; //存储角色当前动态计算出来的各项数值，对象回收后，清除掉

          _this.currAttribue = new Map();
          _this.bloodbarpos = new Vec3();
          _this.bloodBarNode = null;
          _this.initted = false;
          _this.Dash = false;
          _this.pulse = false;
          _this.hurt = false;
          _this._atk = false;
          _this._skill = false;
          /**是否被缠绕 */

          _this.webbed = false;
          /**是否有盾 */

          _this.Shield = false; //是否冰冻，冰冻减速

          _this.freeze = false;
          return _this;
        }

        var _proto = StatusCtrl.prototype;

        _proto.onDisable = function onDisable() {
          this.initted = false;

          if (this.bloodBarNode) {
            this.bloodBarNode.getComponent(BloodBarCtrl).recycleSelf();
          }

          this.currAttribue.clear();
          this.node.setRotationFromEuler(0, 0, 0);
          this.unschedule(this.regHP);
        };

        _proto.initStatus = /*#__PURE__*/function () {
          var _initStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var json, config, key;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // this.returnNormal()
                  this._atk = false;
                  _context.next = 3;
                  return skillBundleMgr.getAsset("character", skillBundleMgr.key.Json);

                case 3:
                  json = _context.sent;
                  config = json.json[this.id];
                  key = Key();
                  this.currAttribue.set(key.id, config.id);
                  this.currAttribue.set(key.hp, config.hp);
                  this.currAttribue.set(key.def, config.def);
                  this.currAttribue.set(key.atk, config.atk);
                  this.currAttribue.set(key.crit, config.crit);
                  this.currAttribue.set(key.miss, config.miss);

                  if (this.charactor == CharactorType.Player) {
                    Global.playerAtk.node = this.node;
                    Global.playerAtk.dmg = config.atk;
                    Global.playerAtk.crit = config.crit;
                  }

                case 13:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function initStatus() {
            return _initStatus.apply(this, arguments);
          }

          return initStatus;
        }();

        _proto.regHP = function regHP() {
          var reg = this.currAttribue.get("hpreg");
          if (reg <= 0) return;
          this.currAttribue.set('hp', this.currAttribue.get('hp') + reg);
          if (this.currAttribue.get('hp') > this.currAttribue.get('hptotal')) this.currAttribue.set('hp', this.currAttribue.get('hptotal'));
          this.updateBloodBar(reg, 1);

          if (this.charactor === CharactorType.Player) {
            director.emit("playerhp", this.currAttribue.get('hp'), this.currAttribue.get('hptotal'), true);
          }
        };

        _proto.lsHp = function lsHp(reg) {
          if (reg <= 0) return;
          reg = Math.floor(reg);
          this.currAttribue.set('hp', this.currAttribue.get('hp') + reg);
          if (this.currAttribue.get('hp') > this.currAttribue.get('hptotal')) this.currAttribue.set('hp', this.currAttribue.get('hptotal'));
          this.updateBloodBar(reg, 1);

          if (this.charactor === CharactorType.Player) {
            director.emit("playerhp", this.currAttribue.get('hp'), this.currAttribue.get('hptotal'), true);
          }
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          // if (Global.GamePause) return
          if (this.initted) {
            this.bloodbarpos.set(this.node.position);
            this.bloodbarpos.y += 2;
            Global.cam.convertToUINode(this.bloodbarpos, Global.layer[3], this.bloodbarpos);
            this.bloodBarNode.setPosition(this.bloodbarpos);
          }
        }
        /**
        * 初始化血条
        */
        ;

        _proto.initBloodBar = /*#__PURE__*/function () {
          var _initBloodBar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(show) {
            var _this$bloodBarNode$ge;

            var hp;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (show === void 0) {
                    show = true;
                  }

                  _context2.next = 3;
                  return skillBundleMgr.getPrefabNode("BloodBar");

                case 3:
                  this.bloodBarNode = _context2.sent;
                  this.bloodBarNode.parent = Global.layer[3];
                  hp = this.currAttribue.get('hptotal');
                  (_this$bloodBarNode$ge = this.bloodBarNode.getComponent(BloodBarCtrl)) == null ? void 0 : _this$bloodBarNode$ge.initBloodBar(hp, show);
                  this.initted = true;
                // if (this.charactor === CharactorType.Player) {
                //     director.emit("playerhp", this.currAttribue.get('hp'), this.currAttribue.get('hptotal'))
                // }

                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function initBloodBar(_x) {
            return _initBloodBar.apply(this, arguments);
          }

          return initBloodBar;
        }();

        _proto.closeShield = function closeShield() {
          this.Shield = false;
        };

        _proto.updateBloodBar = function updateBloodBar(dmg, crit) {
          if (dmg === void 0) {
            dmg = 0;
          }

          this.bloodBarNode.getComponent(BloodBarCtrl).onDmgBlood(this.currAttribue.get('hp'), dmg, crit);
        };

        return StatusCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "height", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "charactor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CharactorType.None;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VirtualInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "cf9f2aePtlNWa0BC7ltrhAm", "VirtualInput", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * 虚拟摇杆的输入
       * 避免和 `input` 重名使用 VirtualInput
       */

      var VirtualInput = exports('VirtualInput', (_dec = ccclass('VirtualInput'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function VirtualInput() {}

        _createClass(VirtualInput, null, [{
          key: "horizontal",
          get: function get() {
            return this._horizontal;
          },
          set: function set(val) {
            this._horizontal = val;
          }
        }, {
          key: "vertical",
          get: function get() {
            return this._vertical;
          },
          set: function set(val) {
            this._vertical = val;
          }
        }]);

        return VirtualInput;
      }(), _class2._horizontal = 0, _class2._vertical = 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_Button5.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GButton, vm;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GButton = module.GButton;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "358e3h96mJACKbqQ+z0Bj6y", "wuxian_Button5", undefined);

      var wuxian_Button5 = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GButton) {
        _inheritsLoose(wuxian_Button5, _fgui$GButton);

        function wuxian_Button5() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GButton.call.apply(_fgui$GButton, [this].concat(args)) || this;
          _this.m_bg = void 0;
          return _this;
        }

        wuxian_Button5.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "Button5");
        };

        var _proto = wuxian_Button5.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChildAt(0);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return wuxian_Button5;
      }(GButton), _class2.URL = "ui://wdfzb5jikt1j9", _class2.Dependencies = ["wuxian"], _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_chooseItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GButton, vm;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GButton = module.GButton;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "18979fhUlFIJJjXuGgbA27j", "wuxian_chooseItem", undefined);

      var wuxian_chooseItem = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GButton) {
        _inheritsLoose(wuxian_chooseItem, _fgui$GButton);

        function wuxian_chooseItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GButton.call.apply(_fgui$GButton, [this].concat(args)) || this;
          _this.m_des = void 0;
          return _this;
        }

        wuxian_chooseItem.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "chooseItem");
        };

        var _proto = wuxian_chooseItem.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_des = this.getChildAt(3);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return wuxian_chooseItem;
      }(GButton), _class2.URL = "ui://wdfzb5jikt1jf", _class2.Dependencies = ["wuxian"], _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_circle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GButton, vm;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GButton = module.GButton;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "f4f21DndXZGxZse8NoMmtyN", "wuxian_circle", undefined);

      var wuxian_circle = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GButton) {
        _inheritsLoose(wuxian_circle, _fgui$GButton);

        function wuxian_circle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GButton.call.apply(_fgui$GButton, [this].concat(args)) || this;
          _this.m_thumb = void 0;
          return _this;
        }

        wuxian_circle.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "circle");
        };

        var _proto = wuxian_circle.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_thumb = this.getChildAt(0);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return wuxian_circle;
      }(GButton), _class2.URL = "ui://wdfzb5jikt1j3", _class2.Dependencies = ["wuxian"], _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_GameOver.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './ResourceDefine.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vclick, VClickType, vm, GUIWindow, GameBundleMgr, Global;

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
      vclick = module.vclick;
      VClickType = module.VClickType;
      vm = module.vm;
      GUIWindow = module.GUIWindow;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
    }, function (module) {
      Global = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "558312oMyBDq6Tj206HNPmg", "wuxian_GameOver", undefined);

      var PauseWindow = /*#__PURE__*/function (_GUIWindow) {
        _inheritsLoose(PauseWindow, _GUIWindow);

        function PauseWindow() {
          return _GUIWindow.apply(this, arguments) || this;
        }

        var _proto = PauseWindow.prototype;

        _proto.onShown = function onShown() {
          _GUIWindow.prototype.onShown.call(this);

          Global.timeScale = 0;
        };

        _proto.doHideAnimation = function doHideAnimation() {
          Global.timeScale = 1;

          _GUIWindow.prototype.doHideAnimation.call(this);
        };

        _proto.onHide = function onHide() {
          GameBundleMgr.loadScene("start");
        };

        return PauseWindow;
      }(GUIWindow);

      var wuxian_GameOver = exports('default', (_dec = vclick(VClickType.CLOSE), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_GameOver, _fgui$GComponent);

        function wuxian_GameOver() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "m_btn", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        wuxian_GameOver.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "GameOver");
        };

        var _proto2 = wuxian_GameOver.prototype;

        _proto2.onConstruct = function onConstruct() {
          this.m_btn = this.getChildAt(2);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return wuxian_GameOver;
      }(GComponent), _class3.URL = "ui://wdfzb5jivm1x5c", _class3.Dependencies = ["wuxian"], _class3.uiOptins = {
        modal: true,
        windowCls: PauseWindow
      }, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_btn", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_GameUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './ActorManager.ts', './Events.ts', './wuxian_SkillChoose.ts', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, director, UIPackage, GComponent, vm, UILayer, GUIManager, ActorManager, Events, wuxian_SkillChoose, Timer;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      UIPackage = module.UIPackage;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
      UILayer = module.UILayer;
      GUIManager = module.GUIManager;
    }, function (module) {
      ActorManager = module.ActorManager;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      wuxian_SkillChoose = module.default;
    }, function (module) {
      Timer = module.Timer;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "eda60HUxXtJvpyYaOH14sBX", "wuxian_GameUI", undefined);

      var wuxian_GameUI = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_GameUI, _fgui$GComponent);

        function wuxian_GameUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_lv = void 0;
          _this.m_joystick = void 0;
          _this.m_progress = void 0;
          _this.m_attack = void 0;
          _this.m_hp = void 0; // data = ActorManager.instance.playerActor.actorProperty;

          _this.autoAtkTime = 0;
          return _this;
        }

        wuxian_GameUI.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "GameUI");
        };

        var _proto = wuxian_GameUI.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_lv = this.getChildAt(2);
          this.m_joystick = this.getChildAt(3);
          this.m_progress = this.getChildAt(4);
          this.m_attack = this.getChildAt(6);
          this.m_hp = this.getChildAt(7);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto.initView = function initView() {
          var player = ActorManager.instance.playerActor;
          player.node.on(Events.onExpGain, this.onExpGain, this);
          player.node.on(Events.onPlayerUpgrade, this.onUpgrade, this);
          player.node.on(Events.onHurt, this.onHurt, this);
          player.node.on(Events.onPlayerUpgrade, this.onPlayerUpgrade, this);
          this.m_lv.text = player.actorProperty.level.toString();
          this.m_attack.onClick(this.onAttack, this);
          this.onExpGain();
          this.onPlayerUpgrade();
          this.onHurt();
        };

        _proto.onEnable = function onEnable() {
          _fgui$GComponent.prototype.onEnable.call(this);

          this.initView();
        };

        _proto.onDisable = function onDisable() {
          _fgui$GComponent.prototype.onDisable.call(this);

          var player = ActorManager.instance.playerActor;
          player.node.off(Events.onExpGain, this.onExpGain, this);
          player.node.off(Events.onPlayerUpgrade, this.onUpgrade, this);
          player.node.off(Events.onHurt, this.onHurt, this);
          player.node.off(Events.onPlayerUpgrade, this.onPlayerUpgrade, this);
          this.m_attack.offClick(this.onAttack, this);
        };

        _proto.onAttack = function onAttack() {
          var hero = ActorManager.instance.playerActor;
          hero.attack();
          hero.autoAtk = true;
          this.autoAtkTime = Timer.currentTime;
        };

        _proto.onOpenSetting = function onOpenSetting() {// UIManager.instance.showDialog(DialogDefine.UISetting);
        };

        _proto.onUpgrade = function onUpgrade() {
          GUIManager.open(wuxian_SkillChoose);
        };

        _proto.onExpGain = function onExpGain() {
          if (ActorManager.instance.playerActor) {
            var actorProperty = ActorManager.instance.playerActor.actorProperty;
            this.m_progress.max = actorProperty.maxExp;
            this.m_progress.value = actorProperty.exp;
          }
        };

        _proto.onHurt = function onHurt() {
          if (ActorManager.instance.playerActor) {
            var actorProperty = ActorManager.instance.playerActor.actorProperty;
            this.m_hp.value = actorProperty.hp;
            this.m_hp.max = actorProperty.maxHp;
          }
        };

        _proto.onExitGame = function onExitGame() {
          // resources.releaseUnusedAssets()
          director.loadScene("startup");
        };

        _proto.onPlayerUpgrade = function onPlayerUpgrade() {
          var player = ActorManager.instance.playerActor;
          this.m_lv.text = "等级" + player.actorProperty.level.toString();
        } // onPauseGame() {
        //     if (director.isPaused()) {
        //         director.resume();
        //     } else {
        //         director.pause();
        //     }
        // }
        ;

        _proto.onUpdate = function onUpdate() {
          if (Timer.currentTime - this.autoAtkTime > 5) {
            var hero = ActorManager.instance.playerActor;
            hero.autoAtk = false;
          }
        };

        return wuxian_GameUI;
      }(GComponent), _class2.URL = "ui://wdfzb5jikt1j0", _class2.Dependencies = ["wuxian"], _class2.uiOptins = {
        layer: UILayer.STAGE
      }, _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_joystick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './VirtualInput.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Vec2, input, Input, v2, KeyCode, UIPackage, Event, GTween, EaseType, GComponent, vm, VirtualInput;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      input = module.input;
      Input = module.Input;
      v2 = module.v2;
      KeyCode = module.KeyCode;
    }, function (module) {
      UIPackage = module.UIPackage;
      Event = module.Event;
      GTween = module.GTween;
      EaseType = module.EaseType;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
    }, function (module) {
      VirtualInput = module.VirtualInput;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "35073BGXBBGFoujeBGzLyCf", "wuxian_joystick", undefined);

      var wuxian_joystick = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_joystick, _fgui$GComponent);

        function wuxian_joystick() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_joystick_center = void 0;
          _this.m_joystick = void 0;
          _this.m_joystick_touch = void 0;
          _this.m_debug = void 0;
          /** user code write here ... Please do not modify the tip. **/

          _this._InitX = void 0;
          _this._InitY = void 0;
          _this._startStageX = 0;
          _this._startStageY = 0;
          _this._lastStageX = 0;
          _this._lastStageY = 0;
          _this._touchId = void 0;
          _this._tweener = null;
          _this._curPos = void 0;
          _this.radius = void 0;
          _this.keys = {};
          return _this;
        }

        wuxian_joystick.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "joystick");
        };

        var _proto = wuxian_joystick.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_joystick_center = this.getChildAt(0);
          this.m_joystick = this.getChildAt(1);
          this.m_joystick_touch = this.getChildAt(2);
          this.m_debug = this.getChildAt(3);
        };

        _proto.initView = function initView() {
          var _this2 = this;

          this._InitX = this.m_joystick_center.x + this.m_joystick_center.width / 2;
          this._InitY = this.m_joystick_center.y + this.m_joystick_center.height / 2;
          this._touchId = -1;
          this.radius = 150;
          this._curPos = new Vec2();
          this.m_joystick_touch.on(Event.TOUCH_BEGIN, this.onTouchDown, this);
          this.m_joystick_touch.on(Event.TOUCH_MOVE, this.onTouchMove, this);
          this.m_joystick_touch.on(Event.TOUCH_END, this.onTouchEnd, this);
          var keys = this.keys;
          input.on(Input.EventType.KEY_DOWN, function (event) {
            keys[event.keyCode] = true;

            _this2.setInput();
          });
          input.on(Input.EventType.KEY_UP, function (event) {
            keys[event.keyCode] = false;

            _this2.setInput();
          });
        };

        _proto.setInput = function setInput() {
          var keys = this.keys;
          var direction = v2(0, 0);

          if (keys[KeyCode.KEY_A]) {
            direction.x = -1;
          } else if (keys[KeyCode.KEY_D]) {
            direction.x = 1;
          }

          if (keys[KeyCode.KEY_W]) {
            direction.y = 1;
          } else if (keys[KeyCode.KEY_S]) {
            direction.y = -1;
          } // 将方向传递给移动逻辑
          // movePlayer(direction);


          VirtualInput.horizontal = direction.x;
          VirtualInput.vertical = direction.y;
        };

        _proto.trigger = function trigger(evt) {
          this.onTouchDown(evt);
        };

        _proto.onTouchDown = function onTouchDown(evt) {
          if (this._touchId == -1) {
            //First touch
            this._touchId = evt.touchId;

            if (this._tweener) {
              this._tweener.kill();

              this._tweener = null;
            }

            this.globalToLocal(evt.pos.x, evt.pos.y, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            this.m_joystick.selected = true;
            if (bx < 0) bx = 0;else if (bx > this.m_joystick_touch.width) bx = this.m_joystick_touch.width;
            if (by > this.height) by = this.height;else if (by < this.m_joystick_touch.y) by = this.m_joystick_touch.y;
            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;
            this.m_joystick_center.visible = true;
            this.m_joystick_center._uiOpacity.opacity = 125;
            this.m_joystick_center.x = bx;
            this.m_joystick_center.y = by;
            this.m_joystick.x = bx;
            this.m_joystick.y = by;
            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this.m_joystick.m_thumb.rotation = degrees + 90;
            evt.captureTouch();
          }
        };

        _proto.onTouchMove = function onTouchMove(evt) {
          if (this._touchId != -1 && evt.touchId == this._touchId) {
            var bx = evt.pos.x;
            var by = evt.pos.y;
            var moveX = bx - this._lastStageX;
            var moveY = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX = this.m_joystick.x + moveX;
            var buttonY = this.m_joystick.y + moveY;
            var offsetX = buttonX - this._startStageX;
            var offsetY = buttonY - this._startStageY;
            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this.m_joystick.m_thumb.rotation = degree + 90;
            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX)) offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY)) offsetY = maxY;
            buttonX = this._startStageX + offsetX;
            buttonY = this._startStageY + offsetY;
            if (buttonX < 0) buttonX = 0;
            if (buttonY > this.height) buttonY = this.height;
            this.m_joystick.x = buttonX;
            this.m_joystick.y = buttonY;
            this.m_debug.text = "\u89D2\u5EA6:" + degree.toFixed(2); // 将计算的结果赋予给 Input

            VirtualInput.horizontal = Math.cos(rad);
            VirtualInput.vertical = -Math.sin(rad);
          }
        };

        _proto.onTouchEnd = function onTouchEnd(evt) {
          if (this._touchId != -1 && evt.touchId == this._touchId) {
            this._touchId = -1;
            this.m_joystick.m_thumb.rotation = this.m_joystick.m_thumb.rotation + 180;
            this.m_joystick_center.visible = false;
            this._tweener = GTween.to2(this.m_joystick.x, this.m_joystick.y, this._InitX, this._InitY, 0.3).setTarget(this.m_joystick, this.m_joystick.setPosition).setEase(EaseType.CircOut).onComplete(this.onTweenComplete, this);
            this.m_debug.text = "";
            VirtualInput.horizontal = 0;
            VirtualInput.vertical = 0;
          }
        };

        _proto.onTweenComplete = function onTweenComplete() {
          this._tweener = null;
          this.m_joystick.selected = false;
          this.m_joystick.m_thumb.rotation = 0;
          this.m_joystick_center.visible = true;
          this.m_joystick_center.x = this._InitX;
          this.m_joystick_center.y = this._InitY;
          this.m_joystick_center._uiOpacity.opacity = 255;
        };

        return wuxian_joystick;
      }(GComponent), _class2.URL = "ui://wdfzb5jikt1j8", _class2.Dependencies = ["wuxian"], _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_SkillChoose.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './PlayerController.ts', './ActorManager.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, UIPackage, GComponent, vclick, VClickType, vm, GUIWindow, PlayerController, ActorManager, Global;

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
      vclick = module.vclick;
      VClickType = module.VClickType;
      vm = module.vm;
      GUIWindow = module.GUIWindow;
    }, function (module) {
      PlayerController = module.PlayerController;
    }, function (module) {
      ActorManager = module.ActorManager;
    }, function (module) {
      Global = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "e96aauPmlxNArwAbbPa/gtQ", "wuxian_SkillChoose", undefined);

      var PauseWindow = /*#__PURE__*/function (_GUIWindow) {
        _inheritsLoose(PauseWindow, _GUIWindow);

        function PauseWindow() {
          return _GUIWindow.apply(this, arguments) || this;
        }

        var _proto = PauseWindow.prototype;

        _proto.onShown = function onShown() {
          _GUIWindow.prototype.onShown.call(this);

          Global.timeScale = 0;
        };

        _proto.doHideAnimation = function doHideAnimation() {
          Global.timeScale = 1;

          _GUIWindow.prototype.doHideAnimation.call(this);
        };

        return PauseWindow;
      }(GUIWindow);

      var wuxian_SkillChoose = exports('default', (_dec = vclick(VClickType.CLOSE), vm(_class = (_class2 = (_class3 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_SkillChoose, _fgui$GComponent);

        function wuxian_SkillChoose() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          _this.m_skill_0 = void 0;
          _this.m_skill_1 = void 0;
          _this.m_skill_2 = void 0;

          _initializerDefineProperty(_this, "m_ok", _descriptor, _assertThisInitialized(_this));

          _this.playerController = null;
          return _this;
        }

        wuxian_SkillChoose.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "SkillChoose");
        };

        var _proto2 = wuxian_SkillChoose.prototype;

        _proto2.onConstruct = function onConstruct() {
          this.m_c1 = this.getControllerAt(0);
          this.m_skill_0 = this.getChildAt(0);
          this.m_skill_1 = this.getChildAt(1);
          this.m_skill_2 = this.getChildAt(2);
          this.m_ok = this.getChildAt(3);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto2.initView = function initView() {
          var _this2 = this;

          this.m_ok.onClick(function () {
            if (_this2.m_c1.selectedIndex == 0) {
              _this2.onUpgradePenetration();
            } else if (_this2.m_c1.selectedIndex == 1) {
              _this2.onUpgradeProjectileCount();
            } else {
              _this2.onUpgradeChaseRate();
            }
          }, this);
          this.playerController = ActorManager.instance.playerActor.getComponent(PlayerController);
        };

        _proto2.onUpgradePenetration = function onUpgradePenetration() {
          this.playerController.penetraion += 10;
        };

        _proto2.onUpgradeProjectileCount = function onUpgradeProjectileCount() {
          this.playerController.projectileCount++;
        };

        _proto2.onUpgradeChaseRate = function onUpgradeChaseRate() {
          this.playerController.chaseRate += 10;
        };

        return wuxian_SkillChoose;
      }(GComponent), _class3.URL = "ui://wdfzb5jikt1jb", _class3.Dependencies = ["wuxian"], _class3.uiOptins = {
        modal: true,
        windowCls: PauseWindow
      }, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_ok", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_StartGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs', './Setting.ts', './ResourceDefine.ts'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GRoot, GComponent, vm, UILayer, GUIManager, Setting, GameBundleMgr;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GRoot = module.GRoot;
      GComponent = module.GComponent;
    }, function (module) {
      vm = module.vm;
      UILayer = module.UILayer;
      GUIManager = module.GUIManager;
    }, function (module) {
      Setting = module.Setting;
    }, function (module) {
      GameBundleMgr = module.GameBundleMgr;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "e8a1dh8uGRLRJSYoKTtOyYU", "wuxian_StartGame", undefined);

      var wuxian_StartGame = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_StartGame, _fgui$GComponent);

        function wuxian_StartGame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_start = void 0;
          return _this;
        }

        wuxian_StartGame.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "StartGame");
        };

        var _proto = wuxian_StartGame.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_start = this.getChildAt(0);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        _proto.initView = function initView() {
          Setting.instance.load();
          this.m_start.onClick(this.onClickStart, this);
        };

        _proto.onClickStart = function onClickStart() {
          GRoot.inst.showModalWait();
          GameBundleMgr.loadScene("game");
          GUIManager.close(this);
        };

        return wuxian_StartGame;
      }(GComponent), _class2.URL = "ui://wdfzb5jikt1jh", _class2.Dependencies = ["wuxian"], _class2.uiOptins = {
        layer: UILayer.STAGE
      }, _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxian_WindowModalWaiting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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

      cclegacy._RF.push({}, "ce602IqPc1DDI61S/lB7JaT", "wuxian_WindowModalWaiting", undefined);

      var wuxian_WindowModalWaiting = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(wuxian_WindowModalWaiting, _fgui$GComponent);

        function wuxian_WindowModalWaiting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_bg = void 0;
          return _this;
        }

        wuxian_WindowModalWaiting.createInstance = function createInstance() {
          return UIPackage.createObject("wuxian", "WindowModalWaiting");
        };

        var _proto = wuxian_WindowModalWaiting.prototype;

        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChildAt(1);
        }
        /** user code write here ... Please do not modify the tip. **/
        ;

        return wuxian_WindowModalWaiting;
      }(GComponent), _class2.URL = "ui://wdfzb5jikt1ji", _class2.Dependencies = ["wuxian"], _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wuxianBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './wuxian_GameUI.ts', './wuxian_circle.ts', './wuxian_joystick.ts', './wuxian_Button5.ts', './wuxian_SkillChoose.ts', './wuxian_chooseItem.ts', './wuxian_StartGame.ts', './wuxian_WindowModalWaiting.ts', './wuxian_GameOver.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, wuxian_GameUI, wuxian_circle, wuxian_joystick, wuxian_Button5, wuxian_SkillChoose, wuxian_chooseItem, wuxian_StartGame, wuxian_WindowModalWaiting, wuxian_GameOver;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      wuxian_GameUI = module.default;
    }, function (module) {
      wuxian_circle = module.default;
    }, function (module) {
      wuxian_joystick = module.default;
    }, function (module) {
      wuxian_Button5 = module.default;
    }, function (module) {
      wuxian_SkillChoose = module.default;
    }, function (module) {
      wuxian_chooseItem = module.default;
    }, function (module) {
      wuxian_StartGame = module.default;
    }, function (module) {
      wuxian_WindowModalWaiting = module.default;
    }, function (module) {
      wuxian_GameOver = module.default;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "e2b2dJP6YBDFIY1zgTgjWI5", "wuxianBinder", undefined);

      var wuxianBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function wuxianBinder() {}

        var _proto = wuxianBinder.prototype;

        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(wuxian_GameUI.URL, wuxian_GameUI);
          UIObjectFactory.setExtension(wuxian_circle.URL, wuxian_circle);
          UIObjectFactory.setExtension(wuxian_joystick.URL, wuxian_joystick);
          UIObjectFactory.setExtension(wuxian_Button5.URL, wuxian_Button5);
          UIObjectFactory.setExtension(wuxian_SkillChoose.URL, wuxian_SkillChoose);
          UIObjectFactory.setExtension(wuxian_chooseItem.URL, wuxian_chooseItem);
          UIObjectFactory.setExtension(wuxian_StartGame.URL, wuxian_StartGame);
          UIObjectFactory.setExtension(wuxian_WindowModalWaiting.URL, wuxian_WindowModalWaiting);
          UIObjectFactory.setExtension(wuxian_GameOver.URL, wuxian_GameOver);
        };

        return wuxianBinder;
      }()) || _class);

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
//# sourceMappingURL=index.js.map