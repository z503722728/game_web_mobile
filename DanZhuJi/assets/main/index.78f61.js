System.register("chunks:///_virtual/AnimatedWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, tween, Window;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      Window = module.Window;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1a050RGPYZIa54BWep5bcEC", "AnimatedWindow", undefined);
      var AnimatedWindow = exports('AnimatedWindow', /*#__PURE__*/function (_Window) {
        _inheritsLoose(AnimatedWindow, _Window);
        function AnimatedWindow() {
          return _Window.apply(this, arguments) || this;
        }
        var _proto = AnimatedWindow.prototype;
        _proto.onInit = function onInit() {
          // 在 GRoot 上居中对齐
          this.center();
        }

        /**
         * 显示动画
         * 从0.5倍缩放到原始大小，带回弹效果
         */;
        _proto.doShowAnimation = function doShowAnimation() {
          var _this = this;
          var originalScale = {
            x: 1,
            y: 1
          };
          this.contentPane.setScale(0.5, 0.5);
          this.contentPane.alpha = 1; // 确保可见

          tween(this.contentPane).to(0.3, {
            scaleX: originalScale.x,
            scaleY: originalScale.y
          }, {
            easing: 'backOut'
          }).call(function () {
            _this.onShown();
          }).start();
        }

        /**
         * 隐藏动画
         * 缩小到0.5倍并淡出
         */;
        _proto.doHideAnimation = function doHideAnimation() {
          var _this2 = this;
          tween(this.contentPane).to(0.2, {
            scaleX: 0.5,
            scaleY: 0.5,
            alpha: 0
          }, {
            easing: 'backIn'
          }).call(function () {
            _this2.hideImmediately();
          }).start();
        };
        return AnimatedWindow;
      }(Window));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AutoTester.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, Label, Contact2DType, log;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Contact2DType = module.Contact2DType;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c296dPfzONAFJx2eNhkJe9N", "AutoTester", undefined);

      /**
       * 测试记录接口
       */

      /**
       * 自动测试系统
       * 负责自动化测试发射参数，为每个赛道收集有效配置
       */
      var AutoTester = exports('AutoTester', /*#__PURE__*/function () {
        function AutoTester(gameView, ball, rewardColliders, trackCount) {
          // 测试配置
          this.TARGET_CONFIGS_PER_TRACK = 10;
          this.TEST_FORCE_MIN = 400;
          this.TEST_FORCE_MAX = 600;
          this.TEST_ANGLE_MIN = -10;
          this.TEST_ANGLE_MAX = 10;
          // 测试数据
          this.testRecords = new Map();
          this.totalTestCount = 0;
          this.successTestCount = 0;
          this.isRunning = false;
          // 当前测试状态
          this.currentTestParams = null;
          // 引用
          this.gameView = void 0;
          // GameView 实例（用于调用 resetGame）
          this.ball = void 0;
          this.rewardColliders = void 0;
          // 奖励区域碰撞体数组
          this.trackCount = void 0;
          this.testButton = null;
          // 测试时的碰撞监听
          this.testCollisionHandlers = new Map();
          this.currentHitTrackIndex = -1;
          // 当前测试命中的赛道
          // 回调函数
          this.onTestComplete = null;
          this.gameView = gameView;
          this.ball = ball;
          this.rewardColliders = rewardColliders;
          this.trackCount = trackCount;
          this.initTestRecords();
        }

        /**
         * 设置测试按钮
         */
        var _proto = AutoTester.prototype;
        _proto.setButton = function setButton(button) {
          this.testButton = button;
        }

        /**
         * 设置测试完成回调
         */;
        _proto.setOnTestComplete = function setOnTestComplete(callback) {
          this.onTestComplete = callback;
        }

        /**
         * 初始化测试记录
         */;
        _proto.initTestRecords = function initTestRecords() {
          for (var i = 0; i < this.trackCount; i++) {
            this.testRecords.set(i, []);
          }
          log('[AutoTester] 测试记录已初始化，赛道数:', this.trackCount);
        }

        /**
         * 开始/停止测试（切换）
         */;
        _proto.toggle = function toggle() {
          if (this.isRunning) {
            this.stop();
          } else {
            this.start();
          }
        }

        /**
         * 开始自动测试
         */;
        _proto.start = function start() {
          var _this = this;
          log('[AutoTester] ==================== 开始自动测试 ====================');
          this.isRunning = true;
          this.totalTestCount = 0;
          this.successTestCount = 0;

          // 清空之前的测试记录
          this.initTestRecords();

          // 注册测试用的碰撞监听
          this.registerTestCollisionListeners();
          this.updateButtonText('停止测试');

          // 延迟启动第一个测试
          this.gameView.scheduleOnce(function () {
            _this.runNextTest();
          }, 0.5);
        }

        /**
         * 停止测试
         */;
        _proto.stop = function stop() {
          log('[AutoTester] ==================== 停止自动测试 ====================');
          this.isRunning = false;

          // 移除测试用的碰撞监听
          this.unregisterTestCollisionListeners();
          this.updateButtonText('开始自动测试');
          this.printProgress();

          // 手动停止时也导出当前已收集的配置
          if (this.successTestCount > 0) {
            this.exportResults();
          }
          log('[AutoTester] 测试已手动停止');
        }

        /**
         * 是否正在运行
         */;
        _proto.isActive = function isActive() {
          return this.isRunning;
        }

        /**
         * 运行下一次测试（随机发射，看命中哪个赛道）
         */;
        _proto.runNextTest = function runNextTest() {
          if (!this.isRunning) {
            return;
          }
          if (this.isTestComplete()) {
            this.complete();
            return;
          }

          // 重置命中记录
          this.currentHitTrackIndex = -1;
          this.currentTestParams = this.generateRandomParams();
          this.totalTestCount++;
          log("[AutoTester] \u6D4B\u8BD5 #" + this.totalTestCount + " - \u529B\u5EA6:" + this.currentTestParams.force.toFixed(2) + ", \u89D2\u5EA6:" + this.currentTestParams.angleOffset.toFixed(2) + "\xB0");

          // 触发 GameView 的测试流程
          this.gameView.runAutoTest();
        }

        /**
         * 获取当前测试参数（供外部发射使用）
         */;
        _proto.getCurrentTestParams = function getCurrentTestParams() {
          if (!this.currentTestParams) {
            return null;
          }
          return {
            params: this.currentTestParams
          };
        }

        /**
         * 处理测试结果（命中赛道时立即调用）
         */;
        _proto.handleTestResult = function handleTestResult() {
          if (!this.currentTestParams || !this.isRunning) {
            return;
          }

          // currentHitTrackIndex 在碰撞监听器中已设置
          if (this.currentHitTrackIndex >= 0 && this.currentHitTrackIndex < this.trackCount) {
            var records = this.testRecords.get(this.currentHitTrackIndex);

            // 只有该赛道配置未满时才记录
            if (records && records.length < this.TARGET_CONFIGS_PER_TRACK) {
              this.successTestCount++;
              var record = {
                force: this.currentTestParams.force,
                angleOffset: this.currentTestParams.angleOffset,
                targetTrack: this.currentHitTrackIndex,
                timestamp: Date.now()
              };
              records.push(record);
              log("[AutoTester] \u2713 \u547D\u4E2D\u8D5B\u9053" + this.currentHitTrackIndex + "\uFF0C\u8BE5\u8D5B\u9053\u5DF2\u6536\u96C6 " + records.length + "/" + this.TARGET_CONFIGS_PER_TRACK + " \u4E2A\u914D\u7F6E");
            } else {
              log("[AutoTester] \u25CB \u547D\u4E2D\u8D5B\u9053" + this.currentHitTrackIndex + "\uFF0C\u4F46\u8BE5\u8D5B\u9053\u914D\u7F6E\u5DF2\u6EE1\uFF0C\u8DF3\u8FC7");
            }
          }

          // 每10次测试打印一次进度
          if (this.totalTestCount % 10 === 0) {
            this.printProgress();
          }

          // 延迟后继续下一个测试（给小球一点时间减速，避免物理引擎混乱）
          this.scheduleNextTest();
        }

        /**
         * 处理小球弹回初始位置的情况
         */;
        _proto.handleBounceback = function handleBounceback() {
          if (!this.isRunning) {
            return;
          }
          log('[AutoTester] ⚠ 小球被弹回，不计入统计，重新发射');

          // 弹回不算成功也不算失败，直接重新发射
          this.scheduleNextTest();
        }

        /**
         * 调度下一个测试
         */;
        _proto.scheduleNextTest = function scheduleNextTest() {
          var _this2 = this;
          this.gameView.scheduleOnce(function () {
            _this2.runNextTest();
          }, 0.5);
        }

        /**
         * 生成随机测试参数（保留2位小数）
         */;
        _proto.generateRandomParams = function generateRandomParams() {
          var force = Math.random() * (this.TEST_FORCE_MAX - this.TEST_FORCE_MIN) + this.TEST_FORCE_MIN;
          var angleOffset = Math.random() * (this.TEST_ANGLE_MAX - this.TEST_ANGLE_MIN) + this.TEST_ANGLE_MIN;

          // 保留2位小数，防止数值差距太大
          return {
            force: parseFloat(force.toFixed(2)),
            angleOffset: parseFloat(angleOffset.toFixed(2))
          };
        }

        /**
         * 检查是否完成
         */;
        _proto.isTestComplete = function isTestComplete() {
          var _this3 = this;
          var allComplete = true;
          this.testRecords.forEach(function (records) {
            if (records.length < _this3.TARGET_CONFIGS_PER_TRACK) {
              allComplete = false;
            }
          });
          return allComplete;
        }

        /**
         * 完成测试
         */;
        _proto.complete = function complete() {
          log('[AutoTester] ==================== 测试完成 ====================');
          this.isRunning = false;

          // 移除测试用的碰撞监听
          this.unregisterTestCollisionListeners();
          this.updateButtonText('开始自动测试');
          this.printProgress();
          this.exportResults();
          if (this.onTestComplete) {
            this.onTestComplete(this.testRecords);
          }
        }

        /**
         * 打印进度
         */;
        _proto.printProgress = function printProgress() {
          var _this4 = this;
          var progressStr = '[AutoTester] 测试进度: ';
          this.testRecords.forEach(function (records, trackId) {
            progressStr += "\u8D5B\u9053" + trackId + "(" + records.length + "/" + _this4.TARGET_CONFIGS_PER_TRACK + ") ";
          });
          log(progressStr);
          var successRate = this.totalTestCount > 0 ? (this.successTestCount / this.totalTestCount * 100).toFixed(1) : '0.0';
          log("[AutoTester] \u603B\u6D4B\u8BD5:" + this.totalTestCount + " \u6B21, \u6210\u529F:" + this.successTestCount + " \u6B21, \u6210\u529F\u7387:" + successRate + "%");
        }

        /**
         * 导出结果到控制台（TypeScript格式 - 二维数组）
         */;
        _proto.exportResults = function exportResults() {
          var _this5 = this;
          log('[AutoTester] ==================== 导出结果 ====================');
          var now = new Date();
          var timeStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0') + " " + String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');
          var successRate = (this.successTestCount / this.totalTestCount * 100).toFixed(1);
          var output = '\n// ========== 自动测试生成的配置 ==========\n';
          output += "// \u6D4B\u8BD5\u7EDF\u8BA1: \u603B\u6D4B\u8BD5 " + this.totalTestCount + " \u6B21, \u6210\u529F " + this.successTestCount + " \u6B21, \u6210\u529F\u7387 " + successRate + "%\n";
          output += "// \u751F\u6210\u65F6\u95F4: " + timeStr + "\n";
          output += "// \u6BCF\u4E2A\u8D5B\u9053\u914D\u7F6E\u6570: " + this.TARGET_CONFIGS_PER_TRACK + " \u7EC4\n";
          output += "// \u4F7F\u7528\u65F6\u4F1A\u4ECE\u6BCF\u4E2A\u8D5B\u9053\u7684\u914D\u7F6E\u4E2D\u968F\u673A\u9009\u62E9\u4E00\u7EC4\n\n";
          output += 'private static readonly PRESETS: LaunchPreset[][] = [\n';
          var sortedTracks = Array.from(this.testRecords.keys()).sort(function (a, b) {
            return a - b;
          });
          sortedTracks.forEach(function (trackId, trackIndex) {
            var records = _this5.testRecords.get(trackId) || [];
            output += "    // \u8D5B\u9053" + trackId + " - " + records.length + "\u7EC4\u914D\u7F6E\n";
            output += '    [\n';
            records.forEach(function (record, index) {
              var comma = index === records.length - 1 ? '' : ',';
              output += "        { force: " + record.force.toFixed(2) + ", angleOffset: " + record.angleOffset.toFixed(2) + " }" + comma + "\n";
            });
            var trackComma = trackIndex === sortedTracks.length - 1 ? '' : ',';
            output += "    ]" + trackComma + "\n";
            if (trackIndex !== sortedTracks.length - 1) {
              output += '\n';
            }
          });
          output += '];\n';
          output += '\n// ========== 复制上面的代码替换 LaunchConfig.ts 中的 PRESETS 数组 ==========\n';
          console.log(output);
          log('[AutoTester] 配置已导出到控制台，请复制到 LaunchConfig.ts');
        }

        /**
         * 更新按钮文字
         */;
        _proto.updateButtonText = function updateButtonText(text) {
          if (!this.testButton) return;
          var btnLabel = this.testButton.node.getComponentInChildren(Label);
          if (btnLabel) {
            btnLabel.string = text;
          }
        }

        /**
         * 重置游戏（用于测试）
         * 直接调用 GameView 的 resetGame，避免代码重复
         */;
        _proto.resetGameForTest = function resetGameForTest() {
          this.gameView.resetGameForAutoTest();
        }

        /**
         * 注册测试用的碰撞监听（直接在奖励区域碰撞体上）
         */;
        _proto.registerTestCollisionListeners = function registerTestCollisionListeners() {
          var _this6 = this;
          this.rewardColliders.forEach(function (collider, trackIndex) {
            if (!collider || !collider.isValid) {
              return;
            }
            var handler = function handler(selfCollider, otherCollider) {
              // 只在测试运行时且尚未记录命中时生效
              if (_this6.isRunning && _this6.currentHitTrackIndex === -1) {
                _this6.currentHitTrackIndex = trackIndex;
                log("[AutoTester] [\u78B0\u649E\u68C0\u6D4B] \u547D\u4E2D\u8D5B\u9053" + trackIndex);

                // 立即处理测试结果，不等小球停止
                _this6.handleTestResult();
              }
            };
            collider.on(Contact2DType.BEGIN_CONTACT, handler, _this6);
            _this6.testCollisionHandlers.set(collider, handler);
          });
          log('[AutoTester] 测试用碰撞监听已注册');
        }

        /**
         * 移除测试用的碰撞监听
         */;
        _proto.unregisterTestCollisionListeners = function unregisterTestCollisionListeners() {
          var _this7 = this;
          this.testCollisionHandlers.forEach(function (handler, collider) {
            if (collider && collider.isValid) {
              collider.off(Contact2DType.BEGIN_CONTACT, handler, _this7);
            }
          });
          this.testCollisionHandlers.clear();
          log('[AutoTester] 测试用碰撞监听已移除');
        };
        return AutoTester;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BallPhysicsConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ConfigBase.ts'], function (exports) {
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
      cclegacy._RF.push({}, "72f16Hyvz5DiYYOO0dKupgn", "BallPhysicsConfig", undefined);

      /**
       * 小球物理参数配置
       * 用于在测试面板中动态调整小球手感
       * 
       * 注意：滑动条只支持整数，所以存储的值需要乘以10
       * 使用时需要除以10得到真实值
       */
      var BallPhysicsConfig = exports('BallPhysicsConfig', /*#__PURE__*/function (_ConfigBase) {
        _inheritsLoose(BallPhysicsConfig, _ConfigBase);
        function BallPhysicsConfig() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ConfigBase.call.apply(_ConfigBase, [this].concat(args)) || this;
          /**
           * 小球初始摩擦系数 (x10)
           * 真实值范围: 0.0 - 2.0
           * 滑动条范围: 0 - 20
           */
          _this.friction = 1;
          // 默认 0.2
          /**
           * 小球初始线性阻尼 (x10)
           * 真实值范围: 0.0 - 5.0
           * 滑动条范围: 0 - 50
           */
          _this.linearDamping = 5;
          // 默认 0.0
          /**
           * 小球初始角阻尼 (x10)
           * 真实值范围: 0.0 - 5.0
           * 滑动条范围: 0 - 50
           */
          _this.angularDamping = 0;
          // 默认 0.0
          /**
           * 小球发射后的弹性系数 (x10)
           * 真实值范围: 0.0 - 1.0
           * 滑动条范围: 0 - 10
           */
          _this.restitution = 5;
          // 默认 0.9
          /**
           * 重力Y的绝对值 (x10)
           * 真实值范围: 0 - 2000 (使用时会转为负数)
           * 滑动条范围: 0 - 20000
           */
          _this.gravityY = 13000;
          // 默认 980（使用时为 -980）
          /**
           * 进入奖励区域后的减速系数 (x10)
           * 真实值范围: 0.0 - 1.0
           * 滑动条范围: 0 - 10
           */
          _this.rewardSlowdownFactor = 5;
          // 默认 0.3
          /**
           * 进入奖励区域后的弹跳系数 (x10)
           * 真实值范围: 0.0 - 1.0
           * 滑动条范围: 0 - 10
           */
          _this.rewardRestitution = 1;
          // 默认 0.0（不再弹跳）
          /**
           * 进入奖励区域后的摩擦力 (x10)
           * 真实值范围: 0.0 - 10.0
           * 滑动条范围: 0 - 100
           */
          _this.rewardFriction = 50;
          // 默认 5.0
          /**
           * 进入奖励区域后的线性阻尼 (x10)
           * 真实值范围: 0.0 - 20.0
           * 滑动条范围: 0 - 200
           */
          _this.rewardLinearDamping = 150;
          // 默认 10.0
          /**
           * 进入奖励区域后的角阻尼 (x10)
           * 真实值范围: 0.0 - 20.0
           * 滑动条范围: 0 - 200
           */
          _this.rewardAngularDamping = 150;
          // 默认 10.0
          /**
           * 停止速度阈值 (x10)
           * 真实值范围: 0.0 - 50.0
           * 滑动条范围: 0 - 500
           */
          _this.stopVelocityThreshold = 50;
          // 默认 5.0
          /**
           * 小球质量 (x10)
           * 真实值范围: 0.1 - 10.0
           * 滑动条范围: 1 - 100
           * 质量越大，相同的力产生的速度越小
           */
          _this.ballMass = 50;
          // 默认 5.0
          /**
           * 蓄力最小值（自然蓄力模式）
           * 真实值范围: 0 - 1000
           * 滑动条范围: 0 - 1000
           */
          _this.minChargePower = 150;
          // 默认 400
          /**
           * 蓄力最大值（自然蓄力模式）
           * 真实值范围: 0 - 1000
           * 滑动条范围: 0 - 1000
           */
          _this.maxChargePower = 600;
          // 默认 600
          /**
           * 自定义发射力度（测试用）
           * -1 表示不使用自定义力度，使用蓄力计算
           * >= 0 表示使用固定力度发射
           */
          _this.customLaunchForce = -1;
          return _this;
        }
        var _proto = BallPhysicsConfig.prototype;
        // 默认 -1（不使用）
        // ========== 辅助方法 ==========
        /**
         * 获取真实的摩擦系数
         */
        _proto.getFriction = function getFriction() {
          return this.friction / 10;
        }

        /**
         * 获取真实的线性阻尼
         */;
        _proto.getLinearDamping = function getLinearDamping() {
          return this.linearDamping / 10;
        }

        /**
         * 获取真实的角阻尼
         */;
        _proto.getAngularDamping = function getAngularDamping() {
          return this.angularDamping / 10;
        }

        /**
         * 获取真实的弹性系数
         */;
        _proto.getRestitution = function getRestitution() {
          return this.restitution / 10;
        }

        /**
         * 获取真实的重力Y（转为负数）
         */;
        _proto.getGravityY = function getGravityY() {
          return -(this.gravityY / 10);
        }

        /**
         * 获取真实的减速系数
         */;
        _proto.getRewardSlowdownFactor = function getRewardSlowdownFactor() {
          return this.rewardSlowdownFactor / 10;
        }

        /**
         * 获取真实的奖励弹跳系数
         */;
        _proto.getRewardRestitution = function getRewardRestitution() {
          return this.rewardRestitution / 10;
        }

        /**
         * 获取真实的奖励摩擦力
         */;
        _proto.getRewardFriction = function getRewardFriction() {
          return this.rewardFriction / 10;
        }

        /**
         * 获取真实的奖励线性阻尼
         */;
        _proto.getRewardLinearDamping = function getRewardLinearDamping() {
          return this.rewardLinearDamping / 10;
        }

        /**
         * 获取真实的奖励角阻尼
         */;
        _proto.getRewardAngularDamping = function getRewardAngularDamping() {
          return this.rewardAngularDamping / 10;
        }

        /**
         * 获取真实的停止速度阈值
         */;
        _proto.getStopVelocityThreshold = function getStopVelocityThreshold() {
          return this.stopVelocityThreshold / 10;
        }

        /**
         * 获取小球质量
         */;
        _proto.getBallMass = function getBallMass() {
          return this.ballMass / 10;
        }

        /**
         * 获取蓄力最小值
         */;
        _proto.getMinChargePower = function getMinChargePower() {
          return this.minChargePower;
        }

        /**
         * 获取蓄力最大值
         */;
        _proto.getMaxChargePower = function getMaxChargePower() {
          return this.maxChargePower;
        }

        /**
         * 获取自定义发射力度
         */;
        _proto.getCustomLaunchForce = function getCustomLaunchForce() {
          return this.customLaunchForce;
        }

        /**
         * 设置自定义发射力度
         */;
        _proto.setCustomLaunchForce = function setCustomLaunchForce(force) {
          this.customLaunchForce = force;
        }

        /**
         * 清除自定义发射力度（恢复使用蓄力计算）
         */;
        _proto.clearCustomLaunchForce = function clearCustomLaunchForce() {
          this.customLaunchForce = -1;
        };
        return BallPhysicsConfig;
      }(ConfigBase));

      // 导出单例
      var ballPhysicsConfig = exports('ballPhysicsConfig', new BallPhysicsConfig());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CenteredWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, Window;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Window = module.Window;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8cf1b8kvQhAS7wDO0DIAKbm", "CenteredWindow", undefined);
      var CenteredWindow = exports('CenteredWindow', /*#__PURE__*/function (_Window) {
        _inheritsLoose(CenteredWindow, _Window);
        function CenteredWindow() {
          return _Window.apply(this, arguments) || this;
        }
        var _proto = CenteredWindow.prototype;
        _proto.onInit = function onInit() {
          // 在 GRoot 上居中对齐
          this.center();

          // 设置轴心为中心（方便后续动画）
          // this.contentPane.setPivot(0.5, 0.5);
        };

        return CenteredWindow;
      }(Window));
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

System.register("chunks:///_virtual/Game_Button1_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Button1.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Game_Button1;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_Button1 = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "4aad1cgWUdM1ZavtU36SpjC", "Game_Button1_Logic", undefined);
      var Game_Button1_Logic = exports('default', (_dec = addLogic(Game_Button1), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_Button1_Logic, _GUILogicBase);
        function Game_Button1_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_Button1_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Game_Button1_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Button1.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "b75d4LUaD9HhqzbhxMAg1rq", "Game_Button1", undefined);
      var Game_Button1 = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GButton) {
        _inheritsLoose(Game_Button1, _fgui$GButton);
        function Game_Button1() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GButton.call.apply(_fgui$GButton, [this].concat(args)) || this;
          _this.m_bg = void 0;
          return _this;
        }
        Game_Button1.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Button1");
        };
        var _proto = Game_Button1.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_bg = this.getChild("bg");
        };
        return Game_Button1;
      }(GButton), _class2.URL = "ui://6gpz43l1rrit4", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Component1.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, UIPackage, GLabel, vm;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPackage = module.UIPackage;
      GLabel = module.GLabel;
    }, function (module) {
      vm = module.vm;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "51db9iBev9O7pQAX9MyH1/v", "Game_Component1", undefined);
      var Game_Component1 = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GLabel) {
        _inheritsLoose(Game_Component1, _fgui$GLabel);
        function Game_Component1() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GLabel.call.apply(_fgui$GLabel, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          return _this;
        }
        Game_Component1.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Component1");
        };
        var _proto = Game_Component1.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
        };
        return Game_Component1;
      }(GLabel), _class2.URL = "ui://6gpz43l1s4l6w", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_GamePage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_GamePage.ts', './GameDataMgr.ts', './drongo-cc.mjs', './Game_RulePage.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GBind, GUIManager, addLogic, GUILogicBase, Game_GamePage, gameDataMgr, log, Game_RulePage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GBind = module.GBind;
      GUIManager = module.GUIManager;
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      gameDataMgr = module.gameDataMgr;
    }, function (module) {
      log = module.log;
    }, function (module) {
      Game_RulePage = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a3b4fr3dmVDJrKzBu9AkVDv", "Game_GamePage_Logic", undefined);
      var Game_GamePage_Logic = exports('default', (_dec = addLogic(Game_GamePage), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_GamePage_Logic, _GUILogicBase);
        function Game_GamePage_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_GamePage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          log('[Game_GamePage_Logic] 初始化游戏页面UI');

          // 绑定体力显示（Game_Component1继承自GLabel，可以直接绑定text）
          GBind(this.UI.m_tili, gameDataMgr.dLocalData, function (k) {
            return k.energy;
          }).setFormatFunc(function () {
            return gameDataMgr.dLocalData.energy + "/" + gameDataMgr.dLocalData.energyDaily;
          }).bindTarget(this);

          // 绑定积分显示
          GBind(this.UI.m_jifen, gameDataMgr.dLocalData, function (k) {
            return k.currentPoints;
          }).bindTarget(this);

          // 规则按钮
          this.UI.m_rule.onClick(function () {
            log('[Game_GamePage_Logic] 打开规则页面');
            GUIManager.open(Game_RulePage);
          });
          log('[Game_GamePage_Logic] UI绑定完成');
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
      cclegacy._RF.push({}, "3c5e6BDAL9NpIh6Ie90IOcm", "Game_GamePage", undefined);
      var Game_GamePage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_GamePage, _fgui$GComponent);
        function Game_GamePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_tili = void 0;
          _this.m_jifen = void 0;
          _this.m_rule = void 0;
          return _this;
        }
        Game_GamePage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "GamePage");
        };
        var _proto = Game_GamePage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_tili = this.getChild("tili");
          this.m_jifen = this.getChild("jifen");
          this.m_rule = this.getChild("rule");
        };
        return Game_GamePage;
      }(GComponent), _class2.URL = "ui://6gpz43l1s4l6v", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RewardPage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_RewardPage.ts', './drongo-cc.mjs', './AnimatedWindow.ts'], function (exports) {
  var _inheritsLoose, cclegacy, tween, director, addLogic, GUIManager, GUILogicBase, Game_RewardPage, log, AnimatedWindow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      director = module.director;
    }, function (module) {
      addLogic = module.addLogic;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_RewardPage = module.default;
    }, function (module) {
      log = module.log;
    }, function (module) {
      AnimatedWindow = module.AnimatedWindow;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "a03e4giReBLgqcGNXbypdos", "Game_RewardPage_Logic", undefined);

      /**
       * 奖励弹框关闭事件
       * 避免循环依赖：不直接导入GameView，而是通过事件通知
       */
      var REWARD_PAGE_CLOSED_EVENT = exports('REWARD_PAGE_CLOSED_EVENT', 'reward-page-closed');
      var Game_RewardPage_Logic = exports('default', (_dec = addLogic(Game_RewardPage), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_RewardPage_Logic, _GUILogicBase);
        function Game_RewardPage_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.rewardPoints = '0';
          return _this;
        }
        var _proto = Game_RewardPage_Logic.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          // 绑定关闭按钮
          this.UI.m_btn.onClick(function () {
            return _this2.onClose();
          });
        }

        /**
         * 显示奖励信息
         * @param winPoints 赢得的积分
         * @param isWin 是否胜利
         */;
        _proto.show = function show(winPoints, isWin) {
          this.rewardPoints = winPoints;
          if (isWin) {
            this.UI.m_num.text = "+" + winPoints;
            log('[Game_RewardPage_Logic] 显示胜利奖励:', winPoints);
          } else {
            this.UI.m_num.text = "0";
            log('[Game_RewardPage_Logic] 显示失败结果');
          }

          // 播放数字跳动放大动画
          this.playNumberAnimation();
        }

        /**
         * 播放数字跳动放大动画
         */;
        _proto.playNumberAnimation = function playNumberAnimation() {
          var numField = this.UI.m_num;
          var originalScale = {
            x: numField.scaleX,
            y: numField.scaleY
          };

          // 重置缩放
          numField.setScale(0, 0);

          // 动画序列：快速放大 → 超过原大小 → 回弹到正常大小
          tween(numField).to(0.2, {
            scaleX: originalScale.x * 1.3,
            scaleY: originalScale.y * 1.3
          }, {
            easing: 'backOut'
          }).to(0.15, {
            scaleX: originalScale.x * 0.9,
            scaleY: originalScale.y * 0.9
          }, {
            easing: 'sineIn'
          }).to(0.1, {
            scaleX: originalScale.x,
            scaleY: originalScale.y
          }, {
            easing: 'sineOut'
          }).start();
          log('[Game_RewardPage_Logic] 播放数字跳动动画');
        }

        /**
         * 关闭弹框
         */;
        _proto.onClose = function onClose() {
          log('[Game_RewardPage_Logic] 关闭奖励弹框');

          // 关闭弹框（动画由 CenteredWindow 处理）
          GUIManager.close(Game_RewardPage);

          // 发送事件通知游戏重置（避免循环依赖）
          var scene = director.getScene();
          if (scene) {
            scene.emit(REWARD_PAGE_CLOSED_EVENT);
            log('[Game_RewardPage_Logic] 已发送游戏重置事件');
          }
        };
        return Game_RewardPage_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: AnimatedWindow
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RewardPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "263f6b79s5ES4STyOIqrS8q", "Game_RewardPage", undefined);
      var Game_RewardPage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_RewardPage, _fgui$GComponent);
        function Game_RewardPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_btn = void 0;
          _this.m_num = void 0;
          return _this;
        }
        Game_RewardPage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "RewardPage");
        };
        var _proto = Game_RewardPage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_btn = this.getChild("btn");
          this.m_num = this.getChild("num");
        };
        return Game_RewardPage;
      }(GComponent), _class2.URL = "ui://6gpz43l1s4l61k", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RulePage_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_RulePage.ts', './drongo-cc.mjs', './CenteredWindow.ts', './Game_GamePage.ts', './GameView.ts'], function (exports) {
  var _inheritsLoose, cclegacy, director, addLogic, GUIManager, GUILogicBase, Game_RulePage, log, CenteredWindow, Game_GamePage, GameView;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      addLogic = module.addLogic;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_RulePage = module.default;
    }, function (module) {
      log = module.log;
    }, function (module) {
      CenteredWindow = module.CenteredWindow;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      GameView = module.GameView;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "c775do6Pj1Lv4/yrM4iku4y", "Game_RulePage_Logic", undefined);
      var Game_RulePage_Logic = exports('default', (_dec = addLogic(Game_RulePage), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_RulePage_Logic, _GUILogicBase);
        function Game_RulePage_Logic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          _this.gameViewNode = null;
          _this.gamePageUI = null;
          return _this;
        }
        var _proto = Game_RulePage_Logic.prototype;
        _proto.start = function start() {
          // 隐藏 GameView 节点
          var scene = director.getScene();
          if (scene) {
            var _scene$getChildByName;
            var gameViewNode = (_scene$getChildByName = scene.getChildByName('Canvas')) == null || (_scene$getChildByName = _scene$getChildByName.getComponentInChildren(GameView)) == null ? void 0 : _scene$getChildByName.node;
            if (gameViewNode) {
              this.gameViewNode = gameViewNode;
              gameViewNode.active = false;
              log('[Game_RulePage_Logic] 已隐藏 GameView 节点');
            }
          }

          // 隐藏 Game_GamePage 界面
          var gamePageUI = GUIManager.getUI(Game_GamePage);
          if (gamePageUI) {
            this.gamePageUI = gamePageUI;
            gamePageUI.visible = false;
            log('[Game_RulePage_Logic] 已隐藏 Game_GamePage 界面');
          }
        };
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          // 返回按钮 - 关闭规则页面
          this.UI.m_back.onClick(function () {
            log('[Game_RulePage_Logic] 关闭规则页面');
            _this2.restoreHiddenUI();
            GUIManager.close(Game_RulePage);
          });

          // 去玩按钮 - 关闭规则页面
          this.UI.m_goplay.onClick(function () {
            log('[Game_RulePage_Logic] 关闭规则页面并开始游戏');
            _this2.restoreHiddenUI();
            GUIManager.close(Game_RulePage);
          });
        };
        _proto.restoreHiddenUI = function restoreHiddenUI() {
          // 恢复 GameView 节点
          if (this.gameViewNode) {
            this.gameViewNode.active = true;
            log('[Game_RulePage_Logic] 已恢复 GameView 节点');
          }

          // 恢复 Game_GamePage 界面
          if (this.gamePageUI) {
            this.gamePageUI.visible = true;
            log('[Game_RulePage_Logic] 已恢复 Game_GamePage 界面');
          }
        };
        return Game_RulePage_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: CenteredWindow
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_RulePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "2945euFmzNKjIoWf1eI2uDE", "Game_RulePage", undefined);
      var Game_RulePage = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_RulePage, _fgui$GComponent);
        function Game_RulePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_c1 = void 0;
          _this.m_c2 = void 0;
          _this.m_back = void 0;
          _this.m_goplay = void 0;
          return _this;
        }
        Game_RulePage.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "RulePage");
        };
        var _proto = Game_RulePage.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_c1 = this.getController("c1");
          this.m_c2 = this.getController("c2");
          this.m_back = this.getChild("back");
          this.m_goplay = this.getChild("goplay");
        };
        return Game_RulePage;
      }(GComponent), _class2.URL = "ui://6gpz43l1s4l6y", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_TestBtnView_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_TestBtnView.ts', './CenteredWindow.ts'], function (exports) {
  var _inheritsLoose, cclegacy, addLogic, GUILogicBase, Game_TestBtnView, CenteredWindow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_TestBtnView = module.default;
    }, function (module) {
      CenteredWindow = module.CenteredWindow;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "71b78roO39Bzr0r+aqRcJly", "Game_TestBtnView_Logic", undefined);
      var Game_TestBtnView_Logic = exports('default', (_dec = addLogic(Game_TestBtnView), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_TestBtnView_Logic, _GUILogicBase);
        function Game_TestBtnView_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_TestBtnView_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // Add your logic here
        };
        return Game_TestBtnView_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: CenteredWindow // 使用自定义窗口类实现居中
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_TestBtnView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "fe5649sVwtN85QV/IP54OPH", "Game_TestBtnView", undefined);
      var Game_TestBtnView = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_TestBtnView, _fgui$GComponent);
        function Game_TestBtnView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_title = void 0;
          return _this;
        }
        Game_TestBtnView.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "TestBtnView");
        };
        var _proto = Game_TestBtnView.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_title = this.getChild("title");
        };
        return Game_TestBtnView;
      }(GComponent), _class2.URL = "ui://6gpz43l1kqie5", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_TestView_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_TestView.ts', './CenteredWindow.ts', './BallPhysicsConfig.ts', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, PhysicsSystem2D, v2, addLogic, GBind, GUIManager, GUILogicBase, Game_TestView, CenteredWindow, ballPhysicsConfig, log;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      PhysicsSystem2D = module.PhysicsSystem2D;
      v2 = module.v2;
    }, function (module) {
      addLogic = module.addLogic;
      GBind = module.GBind;
      GUIManager = module.GUIManager;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_TestView = module.default;
    }, function (module) {
      CenteredWindow = module.CenteredWindow;
    }, function (module) {
      ballPhysicsConfig = module.ballPhysicsConfig;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "ab2da1RIshCX4+om21UWjgm", "Game_TestView_Logic", undefined);
      var Game_TestView_Logic = exports('default', (_dec = addLogic(Game_TestView), _dec(_class = (_class2 = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_TestView_Logic, _GUILogicBase);
        function Game_TestView_Logic() {
          return _GUILogicBase.apply(this, arguments) || this;
        }
        var _proto = Game_TestView_Logic.prototype;
        _proto.onLoad = function onLoad() {
          var _this = this;
          // GSlider 自动双向绑定：滑动条 ↔ 配置数据
          // 注意：滑动条只支持整数，配置存储的是 x10 后的值

          // 重力Y绝对值 (0 ~ 20000, 真实值 0 ~ 2000, 使用时转为负数)
          // 使用 reformatFunc 在数据更新时同步物理引擎
          GBind(this.UI.m_zhonglishiliang, ballPhysicsConfig, function (k) {
            return k.gravityY;
          }).setReformatFunc(function (sliderValue) {
            // 同步更新物理引擎的重力
            var newGravityY = -(sliderValue / 10);
            PhysicsSystem2D.instance.gravity = v2(0, newGravityY);
            log("[TestView] \u91CD\u529B\u5DF2\u66F4\u65B0: " + newGravityY);
            // 返回值用于更新配置对象
            return sliderValue;
          }).bindTarget(this);

          // 小球质量（密度）(1 ~ 100, 真实值 0.1 ~ 10.0)
          // 注意：修改质量需要重启游戏才能完全生效（影响小球的物理行为）
          GBind(this.UI.m_xiaoqiuzhiliang, ballPhysicsConfig, function (k) {
            return k.ballMass;
          }).setReformatFunc(function (sliderValue) {
            var newMass = sliderValue / 10;
            log("[TestView] \u5C0F\u7403\u8D28\u91CF\u5DF2\u66F4\u65B0: " + newMass + "\uFF08\u91CD\u7F6E\u6E38\u620F\u540E\u751F\u6548\uFF09");
            // 返回值用于更新配置对象
            return sliderValue;
          }).bindTarget(this);

          // 初始摩擦系数 (0 ~ 20, 真实值 0.0 ~ 2.0)
          GBind(this.UI.m_xishu, ballPhysicsConfig, function (k) {
            return k.friction;
          }).bindTarget(this);

          // 发射后弹性系数 (0 ~ 10, 真实值 0.0 ~ 1.0)
          GBind(this.UI.m_tantiaoxishu, ballPhysicsConfig, function (k) {
            return k.restitution;
          }).bindTarget(this);

          // 停止速度阈值 (0 ~ 500, 真实值 0.0 ~ 50.0)
          GBind(this.UI.m_tingzhisuduyuzhi, ballPhysicsConfig, function (k) {
            return k.stopVelocityThreshold;
          }).bindTarget(this);

          // 初始线性阻尼 (0 ~ 50, 真实值 0.0 ~ 5.0)
          GBind(this.UI.m_xianxingzhuni, ballPhysicsConfig, function (k) {
            return k.linearDamping;
          }).bindTarget(this);

          // 奖励减速系数 (0 ~ 10, 真实值 0.0 ~ 1.0)
          GBind(this.UI.m_jiangliJiansuxishu, ballPhysicsConfig, function (k) {
            return k.rewardSlowdownFactor;
          }).bindTarget(this);

          // 奖励摩擦力 (0 ~ 100, 真实值 0.0 ~ 10.0)
          GBind(this.UI.m_jiangliMochali, ballPhysicsConfig, function (k) {
            return k.rewardFriction;
          }).bindTarget(this);

          // 进入奖励区域后的弹跳系数 (0 ~ 10, 真实值 0.0 ~ 1.0)
          GBind(this.UI.m_stop_tantiaoxishu, ballPhysicsConfig, function (k) {
            return k.rewardRestitution;
          }).bindTarget(this);

          // 蓄力最小值 (0 ~ 1000)
          GBind(this.UI.m_xulizuixiaozhi, ballPhysicsConfig, function (k) {
            return k.minChargePower;
          }).bindTarget(this);

          // 蓄力最大值 (0 ~ 1000)
          GBind(this.UI.m_xulizhuidazhi, ballPhysicsConfig, function (k) {
            return k.maxChargePower;
          }).bindTarget(this);

          // 自定义发射力度输入框初始化
          this.updateForceInputDisplay();

          // 应用按钮
          this.UI.m_apply.onClick(function () {
            _this.applyCustomForce();
          }, this);

          // 关闭按钮
          this.UI.m_close.onClick(function () {
            GUIManager.close(Game_TestView);
          }, this);
        }

        /**
         * 更新力度输入框显示
         */;
        _proto.updateForceInputDisplay = function updateForceInputDisplay() {
          var currentForce = ballPhysicsConfig.getCustomLaunchForce();
          if (currentForce >= 0) {
            this.UI.m_fashelidu.text = currentForce.toString();
          } else {
            this.UI.m_fashelidu.text = "";
          }
        }

        /**
         * 应用自定义力度
         */;
        _proto.applyCustomForce = function applyCustomForce() {
          var inputText = this.UI.m_fashelidu.text.trim();
          if (inputText === "" || inputText === "0") {
            // 输入为空或0，清除自定义力度
            ballPhysicsConfig.clearCustomLaunchForce();
            log('[TestView] 已清除自定义力度，恢复使用蓄力计算');
            this.UI.m_fashelidu.text = "";
            return;
          }
          var force = parseFloat(inputText);

          // 验证输入
          if (isNaN(force)) {
            log('[TestView] 错误：输入的力度不是有效数字');
            return;
          }
          if (force < 0) {
            log('[TestView] 错误：力度不能为负数');
            return;
          }
          if (force > 1000) {
            log('[TestView] 警告：力度过大，已限制为1000');
            ballPhysicsConfig.setCustomLaunchForce(1000);
            this.UI.m_fashelidu.text = "1000";
          } else {
            // 四舍五入到2位小数
            var roundedForce = Math.round(force * 100) / 100;
            ballPhysicsConfig.setCustomLaunchForce(roundedForce);
            this.UI.m_fashelidu.text = roundedForce.toString();
            log('[TestView] 已设置自定义发射力度:', roundedForce);
          }
        };
        return Game_TestView_Logic;
      }(GUILogicBase), _class2.uiOptions = {
        modal: true,
        windowCls: CenteredWindow // 使用自定义窗口类实现居中
      }, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_TestView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "0a3ca8FJulAe5ZMu7vKbAAu", "Game_TestView", undefined);
      var Game_TestView = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_TestView, _fgui$GComponent);
        function Game_TestView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_zhonglishiliang = void 0;
          _this.m_xishu = void 0;
          _this.m_tantiaoxishu = void 0;
          _this.m_close = void 0;
          _this.m_stop_tantiaoxishu = void 0;
          _this.m_xianxingzhuni = void 0;
          _this.m_jiangliJiansuxishu = void 0;
          _this.m_jiangliMochali = void 0;
          _this.m_tingzhisuduyuzhi = void 0;
          _this.m_xulizuixiaozhi = void 0;
          _this.m_xulizhuidazhi = void 0;
          _this.m_xiaoqiuzhiliang = void 0;
          _this.m_fashelidu = void 0;
          _this.m_apply = void 0;
          return _this;
        }
        Game_TestView.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "TestView");
        };
        var _proto = Game_TestView.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_zhonglishiliang = this.getChild("zhonglishiliang");
          this.m_xishu = this.getChild("xishu");
          this.m_tantiaoxishu = this.getChild("tantiaoxishu");
          this.m_close = this.getChild("close");
          this.m_stop_tantiaoxishu = this.getChild("stop_tantiaoxishu");
          this.m_xianxingzhuni = this.getChild("xianxingzhuni");
          this.m_jiangliJiansuxishu = this.getChild("jiangliJiansuxishu");
          this.m_jiangliMochali = this.getChild("jiangliMochali");
          this.m_tingzhisuduyuzhi = this.getChild("tingzhisuduyuzhi");
          this.m_xulizuixiaozhi = this.getChild("xulizuixiaozhi");
          this.m_xulizhuidazhi = this.getChild("xulizhuidazhi");
          this.m_xiaoqiuzhiliang = this.getChild("xiaoqiuzhiliang");
          this.m_fashelidu = this.getChild("fashelidu");
          this.m_apply = this.getChild("apply");
        };
        return Game_TestView;
      }(GComponent), _class2.URL = "ui://6gpz43l1rrit0", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Tooltips_Logic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Tooltips.ts', './drongo-cc.mjs'], function (exports) {
  var _inheritsLoose, cclegacy, tween, Color, GUIManager, addLogic, GUILogicBase, Game_Tooltips, log;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Color = module.Color;
    }, function (module) {
      GUIManager = module.GUIManager;
      addLogic = module.addLogic;
      GUILogicBase = module.GUILogicBase;
    }, function (module) {
      Game_Tooltips = module.default;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "3a674ey0JVDNLJy/KvrodL3", "Game_Tooltips_Logic", undefined);

      /**
       * 提示消息类型
       */
      var ToastType = exports('ToastType', /*#__PURE__*/function (ToastType) {
        ToastType["Info"] = "info";
        ToastType["Success"] = "success";
        ToastType["Warning"] = "warning";
        ToastType["Error"] = "error";
        return ToastType;
      }({}));
      var Game_Tooltips_Logic = exports('default', (_dec = addLogic(Game_Tooltips), _dec(_class = /*#__PURE__*/function (_GUILogicBase) {
        _inheritsLoose(Game_Tooltips_Logic, _GUILogicBase);
        function Game_Tooltips_Logic() {
          var _this$COLOR_MAP;
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GUILogicBase.call.apply(_GUILogicBase, [this].concat(args)) || this;
          /** 向上浮动距离 */
          _this.FLOAT_DISTANCE = 80;
          /** 停留时间(秒) - 让用户看清内容 */
          _this.STAY_DURATION = 1.5;
          /** 动画持续时间(秒) - 浮动和淡出 */
          _this.ANIMATION_DURATION = 1.5;
          /** 消息类型对应的颜色配置 */
          _this.COLOR_MAP = (_this$COLOR_MAP = {}, _this$COLOR_MAP[ToastType.Info] = new Color(255, 255, 255, 255), _this$COLOR_MAP[ToastType.Success] = new Color(76, 217, 100, 255), _this$COLOR_MAP[ToastType.Warning] = new Color(255, 204, 0, 255), _this$COLOR_MAP[ToastType.Error] = new Color(255, 59, 48, 255), _this$COLOR_MAP);
          /** UI初始位置（用于重置） */
          _this.initialY = 0;
          _this.initialX = 0;
          return _this;
        }
        var _proto = Game_Tooltips_Logic.prototype;
        _proto.onLoad = function onLoad() {
          // 设置Toast显示在合适的位置（屏幕中上部）
          if (this.UI) {
            // 获取舞台尺寸
            var stage = this.UI.parent;
            if (stage) {
              // 水平居中
              this.initialX = (stage.width - this.UI.width) / 2;
              // 垂直位置：屏幕上方1/4处
              this.initialY = stage.height * 0.25;

              // 立即应用位置
              this.UI.x = this.initialX;
              this.UI.y = this.initialY;
              log('[Game_Tooltips_Logic] Toast位置已设置 - X:', this.initialX, 'Y:', this.initialY, '舞台尺寸:', stage.width, 'x', stage.height);
            } else {
              // 降级：使用默认位置
              this.initialX = this.UI.x;
              this.initialY = this.UI.y;
              log('[Game_Tooltips_Logic] ⚠️ 无法获取舞台尺寸，使用默认位置');
            }
          }
        }

        /**
         * 显示提示消息并播放动画
         * @param message 提示消息内容
         * @param type 消息类型（默认为Info）
         */;
        _proto.show = function show(message, type) {
          if (type === void 0) {
            type = ToastType.Info;
          }
          if (!this.UI || !this.UI.m_title) {
            log('[Game_Tooltips_Logic] ❌ UI组件未初始化');
            return;
          }

          // 重置UI位置和状态（因为GUIManager会缓存UI）
          this.UI.x = this.initialX;
          this.UI.y = this.initialY;
          this.UI.alpha = 1;

          // 设置文本内容
          this.UI.m_title.text = message;

          // 设置文本颜色
          var color = this.COLOR_MAP[type] || this.COLOR_MAP[ToastType.Info];
          this.UI.m_title.color = color;
          log('[Game_Tooltips_Logic] 显示提示:', message, '类型:', type, '初始位置:', this.initialY);

          // 分阶段动画：先停留，再浮动淡出
          tween(this.UI)
          // 阶段1: 停留 - 让用户看清内容
          .delay(this.STAY_DURATION)
          // 阶段2: 向上浮动 + 淡出
          .to(this.ANIMATION_DURATION, {
            y: this.initialY - this.FLOAT_DISTANCE,
            // 向上浮动（使用初始Y坐标）
            alpha: 0 // 淡出
          }, {
            // 使用缓动函数，开始快后面慢
            easing: 'sineOut'
          }).call(function () {
            // 动画完成后关闭UI
            log('[Game_Tooltips_Logic] 提示动画完成，关闭UI');
            GUIManager.close(Game_Tooltips);
          }).start();
        }

        /**
         * 组件销毁时清理
         */;
        _proto.onDestroy = function onDestroy() {
          // 停止所有动画，防止内存泄漏
          if (this.UI) {
            tween(this.UI).stop();
          }
        };
        return Game_Tooltips_Logic;
      }(GUILogicBase)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game_Tooltips.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs', './drongo-gui.mjs'], function (exports) {
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
      cclegacy._RF.push({}, "a1013OOR6RMtolUeQzCZxwG", "Game_Tooltips", undefined);
      var Game_Tooltips = exports('default', vm(_class = (_class2 = /*#__PURE__*/function (_fgui$GComponent) {
        _inheritsLoose(Game_Tooltips, _fgui$GComponent);
        function Game_Tooltips() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _fgui$GComponent.call.apply(_fgui$GComponent, [this].concat(args)) || this;
          _this.m_title = void 0;
          return _this;
        }
        Game_Tooltips.createInstance = function createInstance() {
          return UIPackage.createObject("Game", "Tooltips");
        };
        var _proto = Game_Tooltips.prototype;
        _proto.onConstruct = function onConstruct() {
          this.m_title = this.getChild("title");
        };
        return Game_Tooltips;
      }(GComponent), _class2.URL = "ui://6gpz43l1s4l620", _class2.Dependencies = ["Game"], _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Game_TestBtnView.ts', './Game_TestView.ts', './Game_Button1.ts', './Game_RewardPage.ts', './Game_Tooltips.ts', './Game_GamePage.ts', './Game_Component1.ts', './Game_RulePage.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Game_TestBtnView, Game_TestView, Game_Button1, Game_RewardPage, Game_Tooltips, Game_GamePage, Game_Component1, Game_RulePage;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Game_TestBtnView = module.default;
    }, function (module) {
      Game_TestView = module.default;
    }, function (module) {
      Game_Button1 = module.default;
    }, function (module) {
      Game_RewardPage = module.default;
    }, function (module) {
      Game_Tooltips = module.default;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      Game_Component1 = module.default;
    }, function (module) {
      Game_RulePage = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "712ef7P9UFHk6bljEa7Hf4F", "GameBinder", undefined);
      var GameBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function GameBinder() {}
        var _proto = GameBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Game_TestBtnView.URL, Game_TestBtnView);
          UIObjectFactory.setExtension(Game_TestView.URL, Game_TestView);
          UIObjectFactory.setExtension(Game_Button1.URL, Game_Button1);
          UIObjectFactory.setExtension(Game_RewardPage.URL, Game_RewardPage);
          UIObjectFactory.setExtension(Game_Tooltips.URL, Game_Tooltips);
          UIObjectFactory.setExtension(Game_GamePage.URL, Game_GamePage);
          UIObjectFactory.setExtension(Game_Component1.URL, Game_Component1);
          UIObjectFactory.setExtension(Game_RulePage.URL, Game_RulePage);
        };
        return GameBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        getCurrentGameMode: getCurrentGameMode,
        setGameMode: setGameMode,
        shouldUseMock: shouldUseMock
      });
      cclegacy._RF.push({}, "23423tnshFK3pPzTWEKrLra", "GameConfig", undefined);
      /**
       * 游戏全局配置
       * 所有需要在多处使用的配置都应该定义在这里
       */

      /**
       * 游戏模式枚举
       */
      var GameMode = exports('GameMode', /*#__PURE__*/function (GameMode) {
        GameMode[GameMode["PLAYBACK"] = 0] = "PLAYBACK";
        GameMode[GameMode["RECORDING"] = 1] = "RECORDING";
        return GameMode;
      }({}));

      /**
       * 当前游戏模式（可通过 setGameMode 动态设置）
       * 修改这里会同时影响：
       * - GameView的默认模式
       * - StartView的Mock判断
       * - 网络请求行为
       * 
       * 生产环境：GameMode.PLAYBACK
       * 开发/录制：GameMode.RECORDING
       */
      var CURRENT_GAME_MODE = exports('CURRENT_GAME_MODE', GameMode.PLAYBACK);

      /**
       * 设置游戏模式
       * @param mode 游戏模式
       */
      function setGameMode(mode) {
        CURRENT_GAME_MODE = exports('CURRENT_GAME_MODE', mode);
        console.log('[GameConfig] 游戏模式已设置为:', GameMode[mode]);
      }

      /**
       * 获取当前游戏模式
       */
      function getCurrentGameMode() {
        return CURRENT_GAME_MODE;
      }

      /**
       * 是否使用Mock数据
       * 录制模式自动使用Mock，无需网络请求
       */
      function shouldUseMock() {
        return getCurrentGameMode() === GameMode.RECORDING;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameDataMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './NetMgr.ts', './GameConfig.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, autoBindToWindow, log, mk_instance_base, netMgr, shouldUseMock;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
      log = module.log;
      mk_instance_base = module.instance_base;
    }, function (module) {
      netMgr = module.netMgr;
    }, function (module) {
      shouldUseMock = module.shouldUseMock;
    }],
    execute: function () {
      var _class2;
      cclegacy._RF.push({}, "535f7nBgplA3oy5yp0L8+rO", "GameDataMgr", undefined);

      /**
       * 游戏状态枚举
       */
      var GameState = exports('GameState', /*#__PURE__*/function (GameState) {
        GameState["IDLE"] = "IDLE";
        GameState["READY"] = "READY";
        GameState["PLAYING"] = "PLAYING";
        GameState["REWARD"] = "REWARD";
        return GameState;
      }({}));

      /**
       * 游戏数据模型（用于MVVM绑定）
       */
      var GameData = function GameData() {
        /** 当前积分 */
        this.currentPoints = '0';
        /** 当前能量 */
        this.energy = '0';
        /** 每日能量上限 */
        this.energyDaily = '0';
      };
      var GameDataMgr = autoBindToWindow(_class2 = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(GameDataMgr, _instance_base);
        function GameDataMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          /** 游戏配置数据 */
          _this.config = null;
          /** 当前倍率索引 */
          _this.currentMultiplierIndex = 0;
          /** 游戏状态 */
          _this.gameState = GameState.IDLE;
          /** 游戏数据（用于MVVM绑定） */
          _this.dLocalData = new GameData();
          return _this;
        }
        var _proto = GameDataMgr.prototype;
        /**
         * 加载游戏配置
         * 自动根据游戏模式判断是否使用Mock数据
         * @returns 是否加载成功
         */
        _proto.loadConfig = /*#__PURE__*/
        function () {
          var _loadConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var response;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  log('[GameDataMgr] 开始加载游戏配置...');

                  // ========== Mock模式：使用本地数据 ==========
                  if (!shouldUseMock()) {
                    _context.next = 13;
                    break;
                  }
                  log('[GameDataMgr] [Mock模式] 使用本地Mock配置');

                  // Mock配置数据
                  this.config = {
                    current_points: '9999',
                    base_points_per_round: '5',
                    total_energy: '999',
                    current_energy: '999',
                    multiplier_list: [1, 3, 5, 10],
                    trac_list: [{
                      id: 1,
                      rate: 0
                    }, {
                      id: 2,
                      rate: 4
                    }, {
                      id: 3,
                      rate: 3
                    }, {
                      id: 4,
                      rate: 4
                    }, {
                      id: 5,
                      rate: 5
                    }, {
                      id: 6,
                      rate: 6
                    }, {
                      id: 7,
                      rate: 7
                    }]
                  };

                  // 更新本地数据
                  this.dLocalData.currentPoints = this.config.current_points;
                  this.dLocalData.energy = this.config.current_energy;
                  this.dLocalData.energyDaily = this.config.total_energy;

                  // 默认选择第一个倍率
                  this.currentMultiplierIndex = 0;
                  log('[GameDataMgr] ✅ [Mock模式] 配置加载成功');
                  log('[GameDataMgr] Mock积分:', this.config.current_points);
                  log('[GameDataMgr] Mock能量:', this.config.current_energy, '/', this.config.total_energy);
                  log('[GameDataMgr] Mock倍率:', this.config.multiplier_list);
                  return _context.abrupt("return", true);
                case 13:
                  _context.next = 15;
                  return netMgr.getGameConfig();
                case 15:
                  response = _context.sent;
                  if (!(response.code === 0)) {
                    _context.next = 29;
                    break;
                  }
                  this.config = response.data;

                  // 更新本地数据
                  this.dLocalData.currentPoints = this.config.current_points;
                  this.dLocalData.energy = this.config.current_energy;
                  this.dLocalData.energyDaily = this.config.total_energy;

                  // 默认选择第一个倍率
                  this.currentMultiplierIndex = 0;
                  log('[GameDataMgr] ✅ 配置加载成功');
                  log('[GameDataMgr] 当前积分:', this.config.current_points);
                  log('[GameDataMgr] 当前能量:', this.config.current_energy);
                  log('[GameDataMgr] 支持倍率:', this.config.multiplier_list);
                  return _context.abrupt("return", true);
                case 29:
                  log('[GameDataMgr] ❌ 配置加载失败:', response.msg);
                  log('[GameDataMgr] ⚠️ 使用Mock配置作为降级方案');

                  // 降级：返回false，让上层处理
                  // Mock模式会在shouldUseMock()=true时自动启用
                  return _context.abrupt("return", false);
                case 32:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function loadConfig() {
            return _loadConfig.apply(this, arguments);
          }
          return loadConfig;
        }()
        /**
         * 获取游戏配置
         */;

        _proto.getConfig = function getConfig() {
          return this.config;
        }

        /**
         * 获取当前积分数值
         */;
        _proto.getCurrentPointsNumber = function getCurrentPointsNumber() {
          return parseInt(this.dLocalData.currentPoints) || 0;
        }

        /**
         * 获取当前倍率
         */;
        _proto.getCurrentMultiplier = function getCurrentMultiplier() {
          if (!this.config || this.config.multiplier_list.length === 0) {
            return 1;
          }
          return this.config.multiplier_list[this.currentMultiplierIndex];
        }

        /**
         * 是否可以增加倍率
         */;
        _proto.canIncreaseMultiplier = function canIncreaseMultiplier() {
          if (!this.config) {
            return false;
          }
          return this.currentMultiplierIndex < this.config.multiplier_list.length - 1;
        }

        /**
         * 是否可以减少倍率
         */;
        _proto.canDecreaseMultiplier = function canDecreaseMultiplier() {
          return this.currentMultiplierIndex > 0;
        }

        /**
         * 增加倍率
         */;
        _proto.increaseMultiplier = function increaseMultiplier() {
          if (this.canIncreaseMultiplier()) {
            this.currentMultiplierIndex++;
            log('[GameDataMgr] 倍率增加至:', this.getCurrentMultiplier());
          }
        }

        /**
         * 减少倍率
         */;
        _proto.decreaseMultiplier = function decreaseMultiplier() {
          if (this.canDecreaseMultiplier()) {
            this.currentMultiplierIndex--;
            log('[GameDataMgr] 倍率减少至:', this.getCurrentMultiplier());
          }
        }

        /**
         * 获取当前倍率索引
         */;
        _proto.getCurrentMultiplierIndex = function getCurrentMultiplierIndex() {
          return this.currentMultiplierIndex;
        }

        /**
         * 获取消耗积分
         */;
        _proto.getCostPoints = function getCostPoints() {
          if (!this.config) {
            return 0;
          }
          var basePoints = parseInt(this.config.base_points_per_round);
          var multiplier = this.getCurrentMultiplier();
          return basePoints * multiplier;
        }

        /**
         * 是否可以开始游戏（投币）
         * 需要满足：
         * 1. 能量 > 0
         * 2. 当前积分 >= 消耗积分
         * 3. 游戏状态为 IDLE
         */;
        _proto.canStartGame = function canStartGame() {
          if (!this.config) {
            return false;
          }

          // 检查游戏状态
          if (this.gameState !== GameState.IDLE) {
            return false;
          }

          // 检查能量
          var energy = parseInt(this.dLocalData.energy);
          if (energy <= 0) {
            log('[GameDataMgr] 能量不足，无法开始游戏');
            return false;
          }

          // 检查积分
          var currentPoints = parseInt(this.dLocalData.currentPoints);
          var costPoints = this.getCostPoints();
          if (currentPoints < costPoints) {
            log('[GameDataMgr] 积分不足，无法开始游戏');
            return false;
          }
          return true;
        }

        /**
         * 更新游戏结果后的数据
         * @param result 游戏结果数据
         */;
        _proto.updateAfterGameResult = function updateAfterGameResult(result) {
          if (!result) {
            return;
          }

          // 更新积分（使用服务器返回的数据）
          this.dLocalData.currentPoints = result.current_points;

          // 更新能量（使用服务器返回的数据）
          this.dLocalData.energy = result.current_energy.toString();
          this.dLocalData.energyDaily = result.total_energy.toString();
          log('[GameDataMgr] 游戏结果更新:');
          log('  - 游戏前积分:', result.before_points);
          log('  - 游戏后积分:', result.current_points);
          log('  - 消耗积分:', result.deducted_points);
          log('  - 剩余能量:', this.dLocalData.energy, '/', this.dLocalData.energyDaily);
          log('  - 进入赛道:', result.round_result);
          log('  - 赢得积分:', result.win_points, '(', result.win_points === '0' ? '失败' : '胜利', ')');
        }

        /**
         * 重置到初始状态
         */;
        _proto.resetToIdle = function resetToIdle() {
          this.gameState = GameState.IDLE;
          log('[GameDataMgr] 状态重置为 IDLE');
        };
        return GameDataMgr;
      }(mk_instance_base)) || _class2;
      var gameDataMgr = exports('gameDataMgr', GameDataMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './AutoTester.ts', './BallPhysicsConfig.ts', './drongo-gui.mjs', './Game_TestView.ts', './TrajectoryRecorder.ts', './TrajectoryPlayer.ts', './TrajectoryData.ts', './GameDataMgr.ts', './NetMgr.ts', './MultiplierControl.ts', './Game_RewardPage.ts', './Game_RewardPage_Logic.ts', './Game_GamePage.ts', './GameConfig.ts', './UIUtil.ts', './RewardScoreAnimator.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, RigidBody2D, Button, UITransform, Collider2D, Node, Label, Vec3, director, Input, Contact2DType, input, v2, PhysicsSystem2D, tween, Sprite, UIOpacity, KeyCode, Tween, Component, log, AutoTester, ballPhysicsConfig, BackgroundAdapter, GUIManager, AudioUtil, Game_TestView, TrajectoryRecorder, TrajectoryPlayer, TrajectoryConfig, gameDataMgr, GameState, netMgr, MultiplierControl, Game_RewardPage, REWARD_PAGE_CLOSED_EVENT, Game_RewardPage_Logic, Game_GamePage, CURRENT_GAME_MODE, GameMode, setButtonInteractable, RewardScoreAnimator;
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
      RigidBody2D = module.RigidBody2D;
      Button = module.Button;
      UITransform = module.UITransform;
      Collider2D = module.Collider2D;
      Node = module.Node;
      Label = module.Label;
      Vec3 = module.Vec3;
      director = module.director;
      Input = module.Input;
      Contact2DType = module.Contact2DType;
      input = module.input;
      v2 = module.v2;
      PhysicsSystem2D = module.PhysicsSystem2D;
      tween = module.tween;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      KeyCode = module.KeyCode;
      Tween = module.Tween;
      Component = module.Component;
    }, function (module) {
      log = module.log;
    }, function (module) {
      AutoTester = module.AutoTester;
    }, function (module) {
      ballPhysicsConfig = module.ballPhysicsConfig;
    }, function (module) {
      BackgroundAdapter = module.BackgroundAdapter;
      GUIManager = module.GUIManager;
      AudioUtil = module.AudioUtil;
    }, function (module) {
      Game_TestView = module.default;
    }, function (module) {
      TrajectoryRecorder = module.TrajectoryRecorder;
    }, function (module) {
      TrajectoryPlayer = module.TrajectoryPlayer;
    }, function (module) {
      TrajectoryConfig = module.TrajectoryConfig;
    }, function (module) {
      gameDataMgr = module.gameDataMgr;
      GameState = module.GameState;
    }, function (module) {
      netMgr = module.netMgr;
    }, function (module) {
      MultiplierControl = module.MultiplierControl;
    }, function (module) {
      Game_RewardPage = module.default;
    }, function (module) {
      REWARD_PAGE_CLOSED_EVENT = module.REWARD_PAGE_CLOSED_EVENT;
      Game_RewardPage_Logic = module.default;
    }, function (module) {
      Game_GamePage = module.default;
    }, function (module) {
      CURRENT_GAME_MODE = module.CURRENT_GAME_MODE;
      GameMode = module.GameMode;
    }, function (module) {
      setButtonInteractable = module.setButtonInteractable;
    }, function (module) {
      RewardScoreAnimator = module.RewardScoreAnimator;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19;
      cclegacy._RF.push({}, "d57e3ArPSBD/Irqo5u90c1c", "GameView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 小球状态枚举
      var BallState = /*#__PURE__*/function (BallState) {
        BallState[BallState["IDLE"] = 0] = "IDLE";
        BallState[BallState["CHARGING"] = 1] = "CHARGING";
        BallState[BallState["FLYING"] = 2] = "FLYING";
        return BallState;
      }(BallState || {});
      var GameView = exports('GameView', (_dec = ccclass('GameView'), _dec2 = property(RigidBody2D), _dec3 = property(Button), _dec4 = property(UITransform), _dec5 = property([Collider2D]), _dec6 = property([Collider2D]), _dec7 = property([Collider2D]), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Button), _dec11 = property(Label), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(Label), _dec15 = property(Label), _dec16 = property(Label), _dec17 = property([Label]), _dec18 = property(Button), _dec19 = property(Button), _dec20 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameView, _Component);
        function GameView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Ball", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PressBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "XuLiNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "JiangLiColliders", _descriptor4, _assertThisInitialized(_this));
          // 碰撞到这些碰撞体的时候 让它们的父节点播放一下放大缩小的动画
          _initializerDefineProperty(_this, "AnimaColliders", _descriptor5, _assertThisInitialized(_this));
          //碰撞到这些组件的时候需要把它上面的sprite 组件启用 展示为亮起效果
          _initializerDefineProperty(_this, "DropWayColliders", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ArrawNode", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TouBiBtn", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PayScoreLabel", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "AddScoreBtn", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ReduceScoreBtn", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ScoreLabel", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "BallNumLabel", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "RewardNumLabel", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "SaiDaoLabels", _descriptor16, _assertThisInitialized(_this));
          // test
          _initializerDefineProperty(_this, "ResetGameBtn", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "AutoTestBtn", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "CanshuBtn", _descriptor19, _assertThisInitialized(_this));
          // ========== 状态管理 ==========
          _this.ballState = BallState.IDLE;
          // ========== 蓄力系统参数 ==========
          _this.chargeValue = 0;
          // 当前蓄力值 (0-1)
          _this.maxChargeValue = 1.0;
          // 最大蓄力值
          _this.chargeSpeed = 0.8;
          // 每秒蓄力速度
          _this.minXuLiScale = 0.7;
          // 蓄力节点最小缩放（完全蓄满）
          // ========== 发射系统参数 ==========
          // 发射参数由 LaunchConfig 管理
          // ========== 碰撞系统参数（从配置读取） ==========
          _this.hasEnteredRewardZone = false;
          // 是否已经进入奖励区域（防止重复触发）
          // ========== 小球初始物理属性（用于重置） ==========
          _this.initialBallRestitution = 0;
          _this.initialBallFriction = 0;
          _this.initialBallLinearDamping = 0;
          _this.initialBallAngularDamping = 0;
          _this.initialBallPosition = new Vec3();
          _this.initialBallRotation = new Vec3();
          // ========== 调试相关 ==========
          _this.debugTargetTrack = -1;
          // 强制目标赛道 (-1表示随机)
          // ========== 停止检测相关 ==========
          _this.lowSpeedFrameCount = 0;
          // 低速帧计数器
          _this.STOP_CONFIRM_FRAMES = 30;
          // 需要连续30帧低速才确认停止（0.5秒）
          // ========== 自动测试系统 ==========
          _this.autoTester = null;
          // 自动测试
          _this.lastHitTrackIndex = -1;
          // 最后命中的赛道索引
          // ========== 轨迹录播系统 ==========
          // 游戏模式统一使用 GameConfig.CURRENT_GAME_MODE，不再使用实例属性
          // 修改游戏模式请到 assets/script/Game/GameConfig.ts
          _this.trajectoryRecorder = null;
          // 轨迹录制器
          _this.trajectoryPlayer = null;
          // 轨迹播放器
          _this.isReadyToRecord = false;
          // 是否准备录制（按下R键后，等待发射）
          _this.lastRecordedTrajectory = null;
          // 最近录制的轨迹（用于T键复播）
          // ========== 游戏数据管理 ==========
          _this.multiplierControl = null;
          // 倍率控制器
          _this.serverResult = null;
          // 服务器返回的游戏结果
          // ========== 视觉效果管理 ==========
          _this.rewardScoreAnimator = null;
          // 计分板动画器
          _this.arrowFlowTweens = [];
          return _this;
        }
        var _proto = GameView.prototype;
        // 箭头流动动画的 tween 数组
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          log('[GameView] 初始化弹珠机游戏');

          // 监听奖励弹框关闭事件（避免循环依赖）
          var scene = director.getScene();
          if (scene) {
            scene.on(REWARD_PAGE_CLOSED_EVENT, this.resetToInitial, this);
            log('[GameView] 已注册奖励弹框关闭事件监听');
          }
          BackgroundAdapter.adaptBackground(this.bg);

          // ========== 配置物理引擎确定性 ==========
          this.setupPhysicsDeterminism();

          // 应用物理配置（重力）
          this.applyPhysicsConfig();

          // 保存小球的初始物理属性
          this.saveInitialBallPhysics();

          // ========== 初始化所有视觉效果 ==========
          this.initVisualEffects();

          // ========== 初始化倍率控制器 ==========
          if (this.AddScoreBtn && this.ReduceScoreBtn && this.PayScoreLabel && this.ScoreLabel) {
            this.multiplierControl = new MultiplierControl();
            this.multiplierControl.init(this.AddScoreBtn, this.ReduceScoreBtn, this.PayScoreLabel, this.ScoreLabel);
          }

          // ========== 注册按钮事件 ==========
          // 投币按钮
          if (this.TouBiBtn) {
            this.TouBiBtn.node.on(Button.EventType.CLICK, this.onCoinInsert, this);
          }

          // 注册按钮事件
          this.PressBtn.node.on(Input.EventType.TOUCH_START, this.onBtnDown, this);
          this.PressBtn.node.on(Input.EventType.TOUCH_END, this.onBtnUp, this);
          this.PressBtn.node.on(Input.EventType.TOUCH_CANCEL, this.onBtnUp, this);

          // 注册测试重置按钮
          if (this.ResetGameBtn) {
            this.ResetGameBtn.node.on(Button.EventType.CLICK, this.onResetBtnClick, this);
          }

          // 注册自动测试按钮
          if (this.AutoTestBtn) {
            this.AutoTestBtn.node.on(Button.EventType.CLICK, this.onAutoTestBtnClick, this);
          }

          // 注册参数设置按钮
          if (this.CanshuBtn) {
            this.CanshuBtn.node.on(Button.EventType.CLICK, this.onCanshuBtnClick, this);
          }

          // 注册碰撞监听 - 直接在目标碰撞体上监听
          this.registerRewardCollisionListeners();
          this.registerAnimaCollisionListeners();
          this.registerDropWayCollisionListeners();

          // 初始化自动测试器
          this.autoTester = new AutoTester(this, this.Ball, this.JiangLiColliders,
          // 传入奖励碰撞体数组
          this.JiangLiColliders.length);
          if (this.AutoTestBtn) {
            this.autoTester.setButton(this.AutoTestBtn);
          }

          // ========== 初始化轨迹录播系统 ==========
          this.trajectoryRecorder = new TrajectoryRecorder(this.Ball);
          this.trajectoryPlayer = new TrajectoryPlayer(this.Ball);

          // 根据模式初始化
          if (CURRENT_GAME_MODE === GameMode.PLAYBACK) {
            log('[GameView] 游戏模式启动：播放预制轨迹');
          } else {
            log('[GameView] 录制模式启动：启用物理引擎录制');
            // 延迟注册碰撞监听（避免在初始化时立即触发碰撞）
            this.scheduleOnce(function () {
              var ballCollider = _this2.Ball.getComponent(Collider2D);
              if (ballCollider) {
                ballCollider.on(Contact2DType.BEGIN_CONTACT, _this2.onBallCollision, _this2);
                log('[GameView] 已注册碰撞监听用于标记关键帧');
              } else {
                log('[GameView] 警告：未找到 Collider2D 组件');
              }
            }, 0);
          }

          // 注册调试按键（1-7选择赛道）
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          log('[GameView] 初始化完成');
        };
        _proto.onDestroy = function onDestroy() {
          // 移除场景事件监听
          var scene = director.getScene();
          if (scene) {
            scene.off(REWARD_PAGE_CLOSED_EVENT, this.resetToInitial, this);
          }

          // 清理按钮事件监听
          this.PressBtn.node.off(Input.EventType.TOUCH_START, this.onBtnDown, this);
          this.PressBtn.node.off(Input.EventType.TOUCH_END, this.onBtnUp, this);
          this.PressBtn.node.off(Input.EventType.TOUCH_CANCEL, this.onBtnUp, this);
          if (this.TouBiBtn) {
            this.TouBiBtn.node.off(Button.EventType.CLICK, this.onCoinInsert, this);
          }
          if (this.ResetGameBtn) {
            this.ResetGameBtn.node.off(Button.EventType.CLICK, this.onResetBtnClick, this);
          }
          if (this.AutoTestBtn) {
            this.AutoTestBtn.node.off(Button.EventType.CLICK, this.onAutoTestBtnClick, this);
          }
          if (this.CanshuBtn) {
            this.CanshuBtn.node.off(Button.EventType.CLICK, this.onCanshuBtnClick, this);
          }

          // 销毁倍率控制器
          if (this.multiplierControl) {
            this.multiplierControl.destroy();
          }

          // 销毁视觉效果
          this.stopArrowFlowAnimation();
          if (this.rewardScoreAnimator) {
            this.rewardScoreAnimator.destroy();
          }
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 加载轨迹数据（两种模式都需要，用于测试和播放）
                  log('[GameView] 开始加载轨迹数据...');
                  _context.prev = 1;
                  _context.next = 4;
                  return TrajectoryConfig.loadTrajectories();
                case 4:
                  log('[GameView] ✅ 轨迹数据加载完成');
                  log('[GameView] 💡 按 1-7 键可测试播放对应赛道的随机轨迹');
                  _context.next = 12;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  log('[GameView] ⚠️ 轨迹数据加载失败:', _context.t0);
                  log('[GameView] 💡 提示：请先录制轨迹数据');
                case 12:
                  // 初始化赛道倍率标签
                  this.updateTrackLabels();

                  // 打开游戏UI页面
                  GUIManager.open(Game_GamePage);
                  log('[GameView] ✅ 游戏UI已打开');

                  // 每次UI打开时执行的初始化
                  this.resetToInitial();
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 8]]);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.update = function update(deltaTime) {
          // 蓄力累积
          if (this.ballState === BallState.CHARGING) {
            this.chargeValue = Math.min(this.chargeValue + this.chargeSpeed * deltaTime, this.maxChargeValue);
            this.updateXuLiUI();
          }

          // ========== 轨迹录播系统更新 ==========
          if (this.trajectoryRecorder && this.trajectoryRecorder.isActive()) {
            this.trajectoryRecorder.update();
          }
          if (this.trajectoryPlayer && this.trajectoryPlayer.isActive()) {
            this.trajectoryPlayer.update();
            return; // 播放期间跳过物理检测
          }

          // 停止检测（物理模式）- 必须进入奖励区后才检测停止
          if (this.ballState === BallState.FLYING && this.hasEnteredRewardZone) {
            var velocity = this.Ball.linearVelocity;
            var speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

            // 从配置读取停止速度阈值
            var stopThreshold = ballPhysicsConfig.getStopVelocityThreshold();
            if (speed < stopThreshold) {
              // 低速帧计数
              this.lowSpeedFrameCount++;

              // 需要连续N帧低速才确认真正停止（避免误判）
              if (this.lowSpeedFrameCount >= this.STOP_CONFIRM_FRAMES) {
                log('[GameView] 小球已在奖励区停止，速度:', speed.toFixed(2), '低速帧数:', this.lowSpeedFrameCount);

                // 录制模式下，先标记最后一个关键帧，然后停止录制
                if (CURRENT_GAME_MODE === GameMode.RECORDING && this.trajectoryRecorder && this.trajectoryRecorder.isActive()) {
                  this.trajectoryRecorder.markCurrentFrameAsKeyframe('final_stop'); // 标记终点关键帧（不去重）
                  // stop事件可以省略（因为播放到最后一帧自动停止）
                  // this.trajectoryRecorder.recordEvent('stop');

                  var trajectoryData = this.trajectoryRecorder.stopRecording();
                  if (trajectoryData) {
                    // 保存最近录制的轨迹
                    this.lastRecordedTrajectory = trajectoryData;
                    // 自动添加到配置中
                    TrajectoryConfig.addTrajectory(trajectoryData);
                    log('[GameView] ✅ 录制完成！赛道:', trajectoryData.trackId);
                    log('[GameView] 💡 按 T 键可立即测试播放刚录制的轨迹');
                  }
                }
                this.ballState = BallState.IDLE;
                this.lowSpeedFrameCount = 0; // 重置计数器
                log('[GameView] 状态切换: FLYING -> IDLE，小球已停止');

                // 显示奖励弹框（如果有服务器结果）
                if (this.serverResult && gameDataMgr.gameState === GameState.PLAYING) {
                  this.showRewardPopup(this.serverResult);
                }

                // 自动测试模式下，检查是否弹回到初始位置（可能被挡板弹回）
                if (this.autoTester && this.autoTester.isActive()) {
                  this.checkAndHandleBounceback();
                }
              }
            } else {
              // 速度恢复，重置计数器
              this.lowSpeedFrameCount = 0;
            }
          }
        }

        // ========== 按钮事件处理 ==========

        /**
         * 投币按钮点击
         */;
        _proto.onCoinInsert = /*#__PURE__*/
        function () {
          var _onCoinInsert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var multiplier, response;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  log('[GameView] 点击投币按钮');

                  // 检查是否可以开始游戏
                  if (gameDataMgr.canStartGame()) {
                    _context2.next = 4;
                    break;
                  }
                  log('[GameView] 无法开始游戏（能量不足或积分不足）');
                  return _context2.abrupt("return");
                case 4:
                  multiplier = gameDataMgr.getCurrentMultiplier().toString(); // ========== 录制模式：跳过服务器请求，直接启用发射 ==========
                  if (!(CURRENT_GAME_MODE === GameMode.RECORDING)) {
                    _context2.next = 20;
                    break;
                  }
                  log('[GameView] [录制模式] 跳过服务器请求，直接启用发射');

                  // 清空服务器结果（录制模式不需要服务器结果来决定赛道）
                  this.serverResult = null;

                  // 更新游戏状态
                  gameDataMgr.gameState = GameState.READY;

                  // 更新UI
                  if (this.BallNumLabel) {
                    this.BallNumLabel.string = '1';
                  }

                  // 启用发射按钮，禁用投币按钮和倍率按钮
                  setButtonInteractable(this.PressBtn, true);
                  setButtonInteractable(this.TouBiBtn, false);
                  setButtonInteractable(this.AddScoreBtn, false);
                  setButtonInteractable(this.ReduceScoreBtn, false);

                  // ========== 启动所有视觉反馈效果 ==========
                  this.playAnimaIconsFlash(); // 图标闪烁2次
                  this.playArrowFlowAnimation(); // 箭头流动动画
                  this.playBallFlashIn(); // 小球闪烁渐显
                  if (this.rewardScoreAnimator) {
                    this.rewardScoreAnimator.activate(); // 激活计分板
                  }

                  log('[GameView] ✅ [录制模式] 投币成功，可以发射（等待小球进入赛道后自动录制）');
                  return _context2.abrupt("return");
                case 20:
                  // ========== 游戏模式：请求服务器获取游戏结果 ==========
                  log('[GameView] [游戏模式] 请求开始游戏，倍率:', multiplier);
                  _context2.next = 23;
                  return netMgr.startGame(multiplier);
                case 23:
                  response = _context2.sent;
                  if (response.code === 0) {
                    // 保存服务器结果
                    this.serverResult = response.data;

                    // 更新游戏状态
                    gameDataMgr.gameState = GameState.READY;

                    // 更新UI
                    if (this.BallNumLabel) {
                      this.BallNumLabel.string = '1';
                    }

                    // 启用发射按钮，禁用投币按钮和倍率按钮
                    setButtonInteractable(this.PressBtn, true);
                    setButtonInteractable(this.TouBiBtn, false);
                    setButtonInteractable(this.AddScoreBtn, false);
                    setButtonInteractable(this.ReduceScoreBtn, false);

                    // ========== 启动所有视觉反馈效果 ==========
                    this.playAnimaIconsFlash(); // 图标闪烁2次
                    this.playArrowFlowAnimation(); // 箭头流动动画
                    this.playBallFlashIn(); // 小球闪烁渐显
                    if (this.rewardScoreAnimator) {
                      this.rewardScoreAnimator.activate(); // 激活计分板
                    }

                    log('[GameView] ✅ [游戏模式] 投币成功，可以发射');
                    log('[GameView] 目标赛道:', response.data.round_result);
                  } else {
                    log('[GameView] ❌ [游戏模式] 投币失败:', response.msg);
                  }
                case 25:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onCoinInsert() {
            return _onCoinInsert.apply(this, arguments);
          }
          return onCoinInsert;
        }();
        _proto.onBtnDown = function onBtnDown() {
          // 必须处于READY状态才能蓄力（已投币）
          if (gameDataMgr.gameState !== GameState.READY || this.ballState !== BallState.IDLE) {
            log('[GameView] 当前状态不允许蓄力，游戏状态:', gameDataMgr.gameState, '小球状态:', BallState[this.ballState]);
            return;
          }
          log('[GameView] 开始蓄力');
          this.ballState = BallState.CHARGING;
          this.chargeValue = 0;
        };
        _proto.onBtnUp = function onBtnUp() {
          if (this.ballState !== BallState.CHARGING) {
            return;
          }
          log('[GameView] 松开按钮，蓄力值:', this.chargeValue.toFixed(2));
          this.launchBall();
        };
        _proto.onResetBtnClick = function onResetBtnClick() {
          log('[GameView] [测试] 点击重置按钮');
          this.resetGame();
        };
        _proto.onAutoTestBtnClick = function onAutoTestBtnClick() {
          if (!this.autoTester) {
            log('[GameView] 自动测试器未初始化');
            return;
          }
          if (this.autoTester.isActive()) {
            this.autoTester.stop();
          } else {
            this.autoTester.start();
          }
        };
        _proto.onCanshuBtnClick = function onCanshuBtnClick() {
          log('[GameView] 打开参数设置面板');
          GUIManager.open(Game_TestView);
        };
        _proto.runAutoTest = function runAutoTest() {
          // AutoTester 已废弃，改用轨迹录播系统
          // 请使用: 按键1-7选择赛道 → 按键R准备录制 → 发射小球
          log('[GameView] ⚠️ AutoTester 已废弃');
          log('[GameView] 💡 请使用轨迹录播系统：');
          log('[GameView]    1. 按键P切换到物理模式');
          log('[GameView]    2. 按键1-7选择目标赛道');
          log('[GameView]    3. 按键R准备录制');
          log('[GameView]    4. 发射小球开始录制');
          log('[GameView]    5. 小球停止后自动保存轨迹');
        }

        /**
         * 供 AutoTester 调用的同步重置方法
         */;
        _proto.resetGameForAutoTest = function resetGameForAutoTest() {
          log('[GameView] [AutoTest] 重置游戏');

          // 切换状态
          this.ballState = BallState.IDLE;
          this.chargeValue = 0;
          this.lowSpeedFrameCount = 0; // 重置低速帧计数
          this.resetXuLiUI();
          this.hasEnteredRewardZone = false;
          this.lastHitTrackIndex = -1;

          // 立即重置小球
          if (this.Ball && this.Ball.isValid) {
            this.Ball.linearVelocity = v2(0, 0);
            this.Ball.angularVelocity = 0;
            this.Ball.node.setPosition(this.initialBallPosition);
            this.Ball.node.setRotationFromEuler(this.initialBallRotation);
            this.restoreBallPhysics();
          }
        }

        // ========== 蓄力UI更新 ==========
        ;

        _proto.updateXuLiUI = function updateXuLiUI() {
          // 高度随蓄力值线性缩小
          var scaleY = 1.0 - this.chargeValue * (1.0 - this.minXuLiScale);
          this.XuLiNode.node.setScale(this.XuLiNode.node.scale.x, scaleY, this.XuLiNode.node.scale.z);
        };
        _proto.resetXuLiUI = function resetXuLiUI() {
          this.XuLiNode.node.setScale(1, 1, 1);
        }

        // ========== 发射系统 ==========
        ;

        _proto.launchBall = /*#__PURE__*/
        function () {
          var _launchBall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _this3 = this;
            var targetTrackId, actualForce, customForce, minPower, maxPower, trajectory;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  log('[GameView] 准备发射小球');

                  // 更新游戏状态为PLAYING
                  gameDataMgr.gameState = GameState.PLAYING;

                  // 重置小球数量显示
                  if (this.BallNumLabel) {
                    this.BallNumLabel.string = '0';
                  }

                  // 禁用发射按钮（防止重复发射）
                  setButtonInteractable(this.PressBtn, false);

                  // 重置碰撞标志
                  this.hasEnteredRewardZone = false;

                  // ========== 请求服务器结果（获取目标赛道）==========
                  _context3.next = 7;
                  return this.requestServerResult();
                case 7:
                  targetTrackId = _context3.sent;
                  log('[GameView] 服务器指定目标赛道:', targetTrackId);

                  // ========== 计算发射力度 ==========
                  customForce = ballPhysicsConfig.getCustomLaunchForce();
                  if (customForce >= 0) {
                    actualForce = customForce;
                    log('[GameView] [自定义力度]', actualForce);
                  } else {
                    minPower = ballPhysicsConfig.getMinChargePower();
                    maxPower = ballPhysicsConfig.getMaxChargePower();
                    actualForce = minPower + (maxPower - minPower) * this.chargeValue;
                    log('[GameView] [自然蓄力] 蓄力:', (this.chargeValue * 100).toFixed(1) + '%', '力度:', actualForce.toFixed(2));
                  }

                  // ========== 判断游戏模式 ==========
                  if (CURRENT_GAME_MODE === GameMode.PLAYBACK) {
                    // ========== 游戏模式：播放预制轨迹 ==========
                    trajectory = TrajectoryConfig.getRandomTrajectory(targetTrackId);
                    if (trajectory) {
                      log('[GameView] [游戏模式] 播放赛道', targetTrackId, '的预录轨迹');
                      this.ballState = BallState.FLYING;
                      this.trajectoryPlayer.play(trajectory, function () {
                        // 播放完成
                        log('[GameView] [游戏模式] 播放完成');
                        _this3.ballState = BallState.IDLE;

                        // 显示奖励弹框（如果有服务器结果）
                        if (_this3.serverResult && gameDataMgr.gameState === GameState.PLAYING) {
                          _this3.showRewardPopup(_this3.serverResult);
                        }
                      }, function (event) {
                        // 事件回调：触发动画
                        _this3.handleTrajectoryEvent(event);
                      });
                    } else {
                      log('[GameView] [警告] 赛道', targetTrackId, '没有预录轨迹，无法播放');
                      this.ballState = BallState.IDLE;
                      this.chargeValue = 0;
                      this.resetXuLiUI();

                      // 完全重置游戏状态和UI（没有轨迹时）
                      this.resetToInitial();
                    }
                  } else {
                    // ========== 录制模式：物理引擎 + 录制 ==========
                    log('[GameView] [录制模式] 物理发射');

                    // 启动录制器（trackId 待定，等小球进入奖励区时再确定）
                    if (this.trajectoryRecorder) {
                      this.trajectoryRecorder.startRecording(actualForce, 0, -1);
                      log('[GameView] [录制] 已启动录制（赛道ID待定，进入奖励区后确定）');
                    }
                    this.launchBallWithPhysics(actualForce);
                  }
                case 12:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function launchBall() {
            return _launchBall.apply(this, arguments);
          }
          return launchBall;
        }()
        /**
         * 使用物理引擎发射小球
         * @param force 发射力度
         */;

        _proto.launchBallWithPhysics = function launchBallWithPhysics(force) {
          // ========== 重置小球到初始状态 ==========
          this.Ball.node.setPosition(this.initialBallPosition);
          this.Ball.node.setRotationFromEuler(this.initialBallRotation);
          this.Ball.linearVelocity = v2(0, 0);
          this.Ball.angularVelocity = 0;

          // 同步到物理引擎
          var physicsSystem = PhysicsSystem2D.instance;
          var world = physicsSystem.physicsWorld;
          if (world && world.syncSceneToPhysics) {
            world.syncSceneToPhysics();
          }

          // 设置小球弹性
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            var restitution = ballPhysicsConfig.getRestitution();
            ballCollider.restitution = restitution;
            ballCollider.apply();
          }

          // 应用向上的冲量（垂直发射）
          var impulse = v2(0, force);
          this.Ball.applyLinearImpulseToCenter(impulse, true);

          // 切换状态
          this.ballState = BallState.FLYING;
          this.chargeValue = 0;
          this.resetXuLiUI();
          log('[GameView] 物理发射完成，力度:', force);
        }

        // ========== 服务器交互 ==========

        /**
         * 获取服务器结果（从已保存的结果中获取）
         * @returns 目标赛道ID (0-6)
         */;
        _proto.requestServerResult = /*#__PURE__*/
        function () {
          var _requestServerResult = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _trackId, trackId;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (!this.serverResult) {
                    _context4.next = 4;
                    break;
                  }
                  _trackId = parseInt(this.serverResult.round_result);
                  log('[GameView] 使用服务器指定赛道:', _trackId, '(round_result:', this.serverResult.round_result + ')');
                  return _context4.abrupt("return", _trackId);
                case 4:
                  if (!(this.debugTargetTrack >= 0 && this.debugTargetTrack < this.JiangLiColliders.length)) {
                    _context4.next = 7;
                    break;
                  }
                  log('[GameView] [调试模式] 使用强制赛道:', this.debugTargetTrack);
                  return _context4.abrupt("return", this.debugTargetTrack);
                case 7:
                  // 回退：随机选择赛道（不应该到这里）
                  log('[GameView] ⚠️ 警告：没有服务器结果，使用随机赛道');
                  trackId = Math.floor(Math.random() * this.JiangLiColliders.length);
                  return _context4.abrupt("return", trackId);
                case 10:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function requestServerResult() {
            return _requestServerResult.apply(this, arguments);
          }
          return requestServerResult;
        }() // ========== 碰撞检测 ==========
        ;

        _proto.registerRewardCollisionListeners = function registerRewardCollisionListeners() {
          var _this4 = this;
          // 在每个奖励区域碰撞体上注册监听
          this.JiangLiColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            collider.on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider) {
              _this4.onHitRewardZone(index);
            }, _this4);
          });
          log('[GameView] 奖励区域碰撞监听注册完成，共', this.JiangLiColliders.length, '个');
        }

        /**
         * 注册DropWayColliders碰撞监听
         * 小球经过时启用Sprite并播放闪烁动画
         */;
        _proto.registerDropWayCollisionListeners = function registerDropWayCollisionListeners() {
          var _this5 = this;
          this.DropWayColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            collider.on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider) {
              // 检查是否与小球碰撞
              if (otherCollider.node === _this5.Ball.node) {
                _this5.onHitDropWay(collider, index);
              }
            }, _this5);
          });
          log('[GameView] DropWay碰撞监听注册完成，共', this.DropWayColliders.length, '个');
        };
        _proto.registerAnimaCollisionListeners = function registerAnimaCollisionListeners() {
          var _this6 = this;
          // 在每个动画区域碰撞体上注册监听
          this.AnimaColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            collider.on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider) {
              // 检查是否与球发生碰撞
              if (otherCollider.node === _this6.Ball.node) {
                // 触发动画
                _this6.onHitAnimaZone(collider);

                // 录制模式：记录事件（只保留索引，最小化数据）
                if (CURRENT_GAME_MODE === GameMode.RECORDING && _this6.trajectoryRecorder && _this6.trajectoryRecorder.isActive()) {
                  _this6.trajectoryRecorder.markCurrentFrameAsKeyframe("anima_" + index);
                  _this6.trajectoryRecorder.recordEvent('collision', {
                    idx: index // ← 简化字段名，只保留索引
                  });

                  log('[GameView] [AnimaCollider录制] 碰撞索引:', index, '名字:', collider.node.name);
                }
              }
            }, _this6);
          });
          log('[GameView] 动画区域碰撞监听注册完成，共', this.AnimaColliders.length, '个');
        }

        /**
         * 小球碰撞回调（录制模式专用）
         * 用于标记普通碰撞的关键帧
         * 注意：AnimaColliders 的碰撞由 registerAnimaCollisionListeners 直接处理
         */;
        _proto.onBallCollision = function onBallCollision(selfCollider, otherCollider, contact) {
          if (CURRENT_GAME_MODE === GameMode.RECORDING && this.trajectoryRecorder && this.trajectoryRecorder.isActive()) {
            var colliderName = otherCollider.node.name;

            // 检查是否是AnimaCollider（AnimaColliders由自己的监听器处理，这里跳过）
            var isAnimaCollider = this.AnimaColliders.some(function (ac) {
              return ac.node.name === colliderName;
            });
            if (isAnimaCollider) {
              return; // AnimaColliders 由 registerAnimaCollisionListeners 处理
            }

            // 记录普通碰撞（可选：如果不需要回放普通碰撞，可以不记录事件）
            this.trajectoryRecorder.markCurrentFrameAsKeyframe(colliderName);
            // 普通碰撞不记录事件（减少数据量，因为播放时不需要触发）
            // this.trajectoryRecorder.recordEvent('collision', { name: colliderName });

            log('[GameView] [普通碰撞录制]:', colliderName);
          }
        }

        /**
         * 重新注册球的碰撞监听器
         * 在重置或恢复物理引擎后调用
         */;
        _proto.reRegisterBallCollisionListener = function reRegisterBallCollisionListener() {
          if (CURRENT_GAME_MODE !== GameMode.RECORDING) {
            return;
          }
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            // 先移除旧监听器（避免重复注册）
            ballCollider.off(Contact2DType.BEGIN_CONTACT, this.onBallCollision, this);
            // 重新注册
            ballCollider.on(Contact2DType.BEGIN_CONTACT, this.onBallCollision, this);
            log('[GameView] ✅ 重新注册球碰撞监听器');
          }
        }

        /**
         * 处理轨迹事件（播放模式专用）
         */;
        _proto.handleTrajectoryEvent = function handleTrajectoryEvent(event) {
          log('[GameView] [播放] 收到事件:', event.type, 'frame:', event.frame, 'data:', event.data);
          if (event.type === 'collision') {
            // 检查是否有数据
            if (!event.data) {
              log('[GameView] [播放] ⚠️ 碰撞事件缺少data');
              return;
            }

            // 检查是否有索引字段（简化后的格式）
            var animaColliderIndex = event.data.idx;
            if (animaColliderIndex !== undefined) {
              // 根据索引直接获取 AnimaCollider
              if (animaColliderIndex >= 0 && animaColliderIndex < this.AnimaColliders.length) {
                var animaCollider = this.AnimaColliders[animaColliderIndex];
                if (animaCollider && animaCollider.isValid) {
                  this.onHitAnimaZone(animaCollider);
                  log('[GameView] [播放] ✅ 触发动画碰撞 - 索引:', animaColliderIndex);
                } else {
                  log('[GameView] [播放] ⚠️ AnimaCollider无效 - 索引:', animaColliderIndex);
                }
              } else {
                log('[GameView] [播放] ⚠️ AnimaCollider索引超出范围:', animaColliderIndex, '/', this.AnimaColliders.length);
              }
            }
          } else if (event.type === 'reward') {
            var _event$data;
            log('[GameView] [播放] 进入奖励区事件 - 赛道:', (_event$data = event.data) == null ? void 0 : _event$data.t);
            // 可以在这里添加播放模式下进入奖励区的特殊效果
          } else if (event.type === 'dropway') {
            var _event$data2;
            // DropWay碰撞事件回放
            var index = (_event$data2 = event.data) == null ? void 0 : _event$data2.idx;
            if (index !== undefined && index >= 0 && index < this.DropWayColliders.length) {
              var collider = this.DropWayColliders[index];
              if (collider && collider.isValid) {
                this.onHitDropWay(collider, index);
                log('[GameView] [播放] ✅ 触发DropWay碰撞 - 索引:', index);
              }
            }
          }
        };
        _proto.onHitRewardZone = function onHitRewardZone(trackIndex) {
          // 如果不在飞行状态或已经进入过奖励区域，不处理
          if (this.ballState !== BallState.FLYING || this.hasEnteredRewardZone) {
            return;
          }
          this.hasEnteredRewardZone = true;
          this.lastHitTrackIndex = trackIndex; // 记录命中的赛道
          log('[GameView] 进入奖励区域，赛道索引:', trackIndex);

          // 显示对应的奖励光柱
          this.showRewardLight(trackIndex);

          // 录制模式：设置赛道ID + 标记关键帧 + 记录事件 + 构建Mock服务器结果
          if (CURRENT_GAME_MODE === GameMode.RECORDING && this.trajectoryRecorder && this.trajectoryRecorder.isActive()) {
            // ✨ 关键：在这里确定并设置赛道ID
            this.trajectoryRecorder.setTargetTrackId(trackIndex);
            this.trajectoryRecorder.markCurrentFrameAsKeyframe('reward_zone'); // 标记关键帧（不去重）
            this.trajectoryRecorder.recordEvent('reward', {
              t: trackIndex
            }); // 简化字段名
            log('[GameView] [录制] 进入奖励区：设置赛道ID + 标记关键帧 + 记录事件');

            // ✨ 构建Mock服务器结果（用于后续展示奖励弹框）
            if (!this.serverResult) {
              var costPoints = gameDataMgr.getCostPoints();
              var currentPoints = gameDataMgr.getCurrentPointsNumber();
              var config = gameDataMgr.getConfig();

              // 根据赛道ID计算赢得的积分（trackIndex: 0-6 对应赛道1-7）
              var winPoints = 0;
              if (config && config.trac_list && config.trac_list[trackIndex]) {
                var trackRate = config.trac_list[trackIndex].rate;
                winPoints = costPoints * trackRate;
              }
              this.serverResult = {
                before_points: currentPoints.toString(),
                current_points: (currentPoints - costPoints + winPoints).toString(),
                deducted_points: costPoints.toString(),
                round_result: trackIndex.toString(),
                // 赛道1-7
                win_points: winPoints.toString(),
                total_energy: parseInt(gameDataMgr.dLocalData.energyDaily),
                current_energy: parseInt(gameDataMgr.dLocalData.energy) - 1 // 消耗1点能量
              };

              log('[GameView] [录制] 构建Mock服务器结果:', this.serverResult);
            }
          }

          // 减速（从配置读取）
          var slowdownFactor = ballPhysicsConfig.getRewardSlowdownFactor();
          var currentVelocity = this.Ball.linearVelocity;
          this.Ball.linearVelocity = v2(currentVelocity.x * slowdownFactor, currentVelocity.y * slowdownFactor);

          // 停止弹跳：设置弹性、增加阻尼快速停下（从配置读取）
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            ballCollider.restitution = ballPhysicsConfig.getRewardRestitution(); // 弹性系数（一般设为0不再弹跳）
            ballCollider.friction = ballPhysicsConfig.getRewardFriction(); // 增加摩擦力
            this.scheduleOnce(function () {
              ballCollider.apply();
            }, 0.1);
          }
          this.Ball.linearDamping = ballPhysicsConfig.getRewardLinearDamping(); // 增加线性阻尼，快速衰减速度
          this.Ball.angularDamping = ballPhysicsConfig.getRewardAngularDamping(); // 增加角阻尼，快速停止旋转

          log('[GameView] 小球减速并停止弹跳，新速度:', this.Ball.linearVelocity.length().toFixed(2));
        };
        _proto.onHitAnimaZone = function onHitAnimaZone(collider) {
          // 如果不在飞行状态，不处理
          if (this.ballState !== BallState.FLYING) {
            return;
          }

          // 防御性检查
          if (!collider || !collider.isValid || !collider.node || !collider.node.parent) {
            return;
          }
          var parentNode = collider.node.parent;

          // 获取父节点的第一个子节点
          if (parentNode.children.length === 0) {
            return;
          }
          var firstChild = parentNode.children[0];
          if (!firstChild || !firstChild.isValid) {
            return;
          }
          log('[GameView] 碰撞动画区域:', parentNode.name, '-> 播放子节点动画:', firstChild.name);
          this.playBounceAnim(firstChild);

          // 播放音效
          AudioUtil.playSound("Game", "collide");
        };
        _proto.playBounceAnim = function playBounceAnim(node) {
          // 停止之前的动画
          tween(node).stop();

          // 播放弹跳动画（放大->缩小）
          var originalScale = new Vec3(1, 1, 1);
          tween(node).to(0.1, {
            scale: new Vec3(originalScale.x * 1.2, originalScale.y * 1.2, originalScale.z)
          }).to(0.1, {
            scale: originalScale
          }).start();
        }

        /**
         * DropWay碰撞处理
         * 启用Sprite并播放闪烁动画
         * @param collider 碰撞体
         * @param index 索引
         */;
        _proto.onHitDropWay = function onHitDropWay(collider, index) {
          if (!collider || !collider.isValid || !collider.node) {
            return;
          }
          var sprite = collider.node.getComponent(Sprite);
          if (!sprite) {
            log('[GameView] ⚠️ DropWay节点', index, '没有Sprite组件');
            return;
          }

          // 启用Sprite
          sprite.enabled = true;

          // 获取或添加 UIOpacity 组件
          var uiOpacity = collider.node.getComponent(UIOpacity);
          if (!uiOpacity) {
            uiOpacity = collider.node.addComponent(UIOpacity);
          }

          // 播放闪烁动画：50% → 100% → 50%（持续0.3秒）
          uiOpacity.opacity = 127; // 从50%开始

          tween(uiOpacity).to(0.15, {
            opacity: 255
          }) // 亮起到100%
          .to(0.15, {
            opacity: 127
          }) // 暗下到50%
          .to(0.15, {
            opacity: 255
          }) // 亮起到100%
          .start();

          // 录制模式：记录事件
          if (CURRENT_GAME_MODE === GameMode.RECORDING && this.trajectoryRecorder && this.trajectoryRecorder.isActive()) {
            this.trajectoryRecorder.recordEvent('dropway', {
              idx: index
            });
            log('[GameView] [DropWay录制] 索引:', index);
          }
          log('[GameView] DropWay碰撞:', index, '播放闪烁动画');
        }

        // ========== 调试功能 ==========
        ;

        _proto.onKeyDown = function onKeyDown(event) {
          var _this7 = this;
          var keyCode = event.keyCode;

          // 按键1-7：播放对应赛道的随机轨迹
          if (keyCode >= KeyCode.DIGIT_1 && keyCode <= KeyCode.DIGIT_7) {
            var trackId = keyCode - KeyCode.DIGIT_1;
            if (this.ballState === BallState.IDLE) {
              // 从录制数据随机选择一条轨迹播放
              var trajectory = TrajectoryConfig.getRandomTrajectory(trackId);
              if (trajectory) {
                log('[GameView] [调试播放] 赛道', trackId, '随机轨迹');
                this.ballState = BallState.FLYING;
                this.trajectoryPlayer.play(trajectory, function () {
                  log('[GameView] [调试播放] 播放完成');
                  _this7.ballState = BallState.IDLE;
                }, function (event) {
                  _this7.handleTrajectoryEvent(event);
                });
              } else {
                log('[GameView] ⚠️ [调试播放] 赛道', trackId, '没有录制数据');
                log('[GameView] 💡 提示：请先录制该赛道的轨迹（录制模式 + 发射球）');
              }
            } else {
              log('[GameView] [调试播放] ⚠️ 小球正在运动中，无法播放');
            }
          }
          // 按键0取消强制赛道（录制模式专用）
          else if (keyCode === KeyCode.DIGIT_0) {
            this.debugTargetTrack = -1;
            log('[GameView] [调试] 取消强制赛道，恢复随机');
          }
          // 按键T：测试播放最近录制的轨迹
          else if (keyCode === KeyCode.KEY_T) {
            if (this.ballState === BallState.IDLE) {
              // 尝试播放最近录制的轨迹
              if (this.lastRecordedTrajectory) {
                log('[GameView] [测试播放] 开始播放最近录制的轨迹，赛道:', this.lastRecordedTrajectory.trackId);
                this.ballState = BallState.FLYING;
                this.trajectoryPlayer.play(this.lastRecordedTrajectory, function () {
                  log('[GameView] [测试播放] 播放完成');
                  _this7.ballState = BallState.IDLE;
                }, function (event) {
                  // 测试播放时也触发事件
                  _this7.handleTrajectoryEvent(event);
                });
              } else {
                log('[GameView] ⚠️ [测试播放] 警告：没有可播放的录制数据');
                log('[GameView] 💡 提示：请先录制一次轨迹（弹球 → 进入奖励区 → 停止）');
              }
            } else {
              log('[GameView] [测试播放] ⚠️ 小球正在运动中，无法播放');
            }
          }
        }

        /**
         * 检查并处理小球弹回初始位置的情况
         */;
        _proto.checkAndHandleBounceback = function checkAndHandleBounceback() {
          var _this8 = this;
          var currentPos = this.Ball.node.position;
          var distance = Vec3.distance(currentPos, this.initialBallPosition);

          // 如果距离初始位置很近（50单位内），说明被弹回来了
          var bouncebackThreshold = 50;
          if (distance < bouncebackThreshold) {
            log('[GameView] [警告] 小球弹回初始位置，距离:', distance.toFixed(2), '重新发射');

            // 延迟后重新触发自动测试
            this.scheduleOnce(function () {
              if (_this8.autoTester && _this8.autoTester.isActive()) {
                _this8.autoTester.handleBounceback();
              }
            }, 0.3);
          }
        }

        // ========== 物理配置应用 ==========

        /**
         * 配置物理引擎确定性
         * 确保相同输入产生相同输出
         */;
        _proto.setupPhysicsDeterminism = function setupPhysicsDeterminism() {
          var physicsSystem = PhysicsSystem2D.instance;

          // ========== 第1层：固定时间步长（最关键！）==========
          // 固定时间步长确保每次物理模拟的时间间隔相同
          physicsSystem.fixedTimeStep = 1 / 60; // 60 FPS，约 0.01667 秒
          physicsSystem.maxSubSteps = 1; // 每帧最多执行1次物理步进

          // ========== 第2层：禁用休眠（避免状态不一致）==========
          // 关闭自动休眠，确保小球始终处于相同的激活状态
          var world = physicsSystem.physicsWorld;
          if (world && world.setAllowSleep) {
            world.setAllowSleep(false);
            log('[GameView] 已禁用物理休眠');
          }

          // ========== 第3层：确保物理引擎激活 ==========
          physicsSystem.enable = true;

          // ========== 迭代次数说明 ==========
          // velocityIterations 和 positionIterations 在 step() 方法中传递
          // Cocos Creator 会自动调用，默认值通常为：
          // - velocityIterations: 8
          // - positionIterations: 3
          // 这些是 Box2D 的标准值，已经能保证确定性

          log('[GameView] 物理确定性配置完成');
          log('  - 固定时间步长:', physicsSystem.fixedTimeStep);
          log('  - 最大子步数:', physicsSystem.maxSubSteps);
          log('  - 物理引擎状态:', physicsSystem.enable ? '已启用' : '已禁用');
        }

        /**
         * 应用物理配置（重力等全局参数）
         */;
        _proto.applyPhysicsConfig = function applyPhysicsConfig() {
          var gravity = PhysicsSystem2D.instance.gravity;
          gravity.y = ballPhysicsConfig.getGravityY();
          PhysicsSystem2D.instance.gravity = gravity;
          log('[GameView] 应用物理配置 - 重力Y:', gravity.y);
        }

        // ========== 奖励显示 ==========

        /**
         * 显示奖励弹框
         * @param result 游戏结果数据
         */;
        _proto.showRewardPopup = /*#__PURE__*/
        function () {
          var _showRewardPopup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(result) {
            var _this9 = this;
            var _config$trac_list, basePoints, finalPoints, trackId, config, multiplier, ui, logic, isWin;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  // 更新游戏状态
                  gameDataMgr.gameState = GameState.REWARD;

                  // 播放计分板积分翻倍动画，并等待动画完成
                  if (!this.rewardScoreAnimator) {
                    _context5.next = 12;
                    break;
                  }
                  basePoints = parseInt(result.deducted_points) || 0;
                  finalPoints = parseInt(result.win_points) || 0; // 获取赛道的倍率
                  trackId = parseInt(result.round_result);
                  config = gameDataMgr.getConfig();
                  multiplier = (config == null || (_config$trac_list = config.trac_list) == null || (_config$trac_list = _config$trac_list[trackId]) == null ? void 0 : _config$trac_list.rate) || 1; // 使用 Promise 等待动画完成
                  _context5.next = 9;
                  return new Promise(function (resolve) {
                    _this9.rewardScoreAnimator.playMultiplyAnimation(basePoints, multiplier, finalPoints, function () {
                      log('[GameView] 计分板动画已完成，准备显示弹框');
                      resolve();
                    });
                  });
                case 9:
                  log('[GameView] 开始播放计分板动画:', basePoints, 'x', multiplier, '=', finalPoints);

                  // 动画完成后延时0.5秒
                  _context5.next = 12;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 500);
                  });
                case 12:
                  _context5.next = 14;
                  return GUIManager.open(Game_RewardPage);
                case 14:
                  ui = _context5.sent;
                  logic = ui.contentPane.Get(Game_RewardPage_Logic);
                  if (logic) {
                    // 胜利/失败判断：win_points > 0 表示胜利
                    isWin = parseInt(result.win_points) > 0;
                    logic.show(result.win_points, isWin);
                    log('[GameView] 显示奖励弹框，进入赛道:', result.round_result, '是否胜利:', isWin, '奖励:', result.win_points);
                  }

                  // 更新游戏数据
                  gameDataMgr.updateAfterGameResult(result);
                case 18:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function showRewardPopup(_x) {
            return _showRewardPopup.apply(this, arguments);
          }
          return showRewardPopup;
        }()
        /**
         * 重置到初始状态（供奖励弹框关闭后调用）
         */;

        _proto.resetToInitial = function resetToInitial() {
          log('[GameView] 重置到初始状态');

          // 1. 重置游戏数据状态
          gameDataMgr.resetToIdle();
          this.serverResult = null;

          // 2. 重置UI状态
          if (this.BallNumLabel) {
            this.BallNumLabel.string = '0';
          }

          // 3. 禁用发射按钮
          setButtonInteractable(this.PressBtn, false);

          // 4. 更新投币按钮状态（根据能量和积分判断）
          setButtonInteractable(this.TouBiBtn, gameDataMgr.canStartGame());

          // 5. 启用倍率按钮
          setButtonInteractable(this.AddScoreBtn, gameDataMgr.canIncreaseMultiplier());
          setButtonInteractable(this.ReduceScoreBtn, gameDataMgr.canDecreaseMultiplier());

          // 6. 更新倍率显示
          if (this.multiplierControl) {
            this.multiplierControl.updateUI();
          }

          // 7. 重置所有视觉效果
          this.initRewardLights(); // 隐藏光柱
          this.initAnimaIcons(); // 图标透明度恢复50%
          this.stopArrowFlowAnimation(); // 停止箭头动画
          this.initArrows(); // 重置箭头状态（确保完全初始化）
          this.resetBallOpacity(); // 小球透明度恢复0
          this.initDropWayColliders(); // 重置DropWay碰撞体状态
          if (this.rewardScoreAnimator) {
            this.rewardScoreAnimator.reset(); // 重置计分板
          }

          // 8. 重置物理
          this.resetGame();
        }

        // ========== 游戏重置 ==========
        ;

        _proto.saveInitialBallPhysics = function saveInitialBallPhysics() {
          if (!this.Ball) return;
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            // 从配置读取初始物理属性
            this.initialBallRestitution = 0; // 初始弹性为0
            this.initialBallFriction = ballPhysicsConfig.getFriction();

            // 设置初始值
            ballCollider.restitution = 0; // 初始时设置弹性为0，避免发射前弹跳
            ballCollider.friction = this.initialBallFriction;

            // 设置密度（影响质量）
            var density = ballPhysicsConfig.getBallMass();
            ballCollider.density = density;
            this.scheduleOnce(function () {
              ballCollider.apply();
            }, 0.1); // 应用密度变化，重新计算质量

            log('[GameView] 设置小球密度:', density, '实际质量:', this.Ball.getMass());
          }
          this.initialBallLinearDamping = ballPhysicsConfig.getLinearDamping();
          this.initialBallAngularDamping = ballPhysicsConfig.getAngularDamping();

          // 应用到小球
          this.Ball.linearDamping = this.initialBallLinearDamping;
          this.Ball.angularDamping = this.initialBallAngularDamping;

          // 保存小球初始位置和旋转
          this.initialBallPosition = this.Ball.node.position.clone();
          this.initialBallRotation = this.Ball.node.eulerAngles.clone();
          log('[GameView] 保存初始属性 - 初始弹性:', this.initialBallRestitution, '位置:', this.initialBallPosition);
        };
        _proto.restoreBallPhysics = function restoreBallPhysics() {
          var _this10 = this;
          if (!this.Ball) return;

          // 延迟重置，避免在碰撞回调中操作物理引擎导致空引用
          this.scheduleOnce(function () {
            if (!_this10.Ball || !_this10.Ball.isValid) {
              return;
            }

            // ========== 方案1：激进重置（推荐）==========
            // 先禁用再启用，清除物理引擎内部状态
            _this10.Ball.enabled = false;
            var ballCollider = _this10.Ball.getComponent(Collider2D);
            if (ballCollider) {
              // 恢复为0，等待下次发射时再设置为0.9
              ballCollider.restitution = 0;
              ballCollider.friction = _this10.initialBallFriction;

              // 恢复密度（影响质量）
              var density = ballPhysicsConfig.getBallMass();
              ballCollider.density = density;
              ballCollider.apply(); // 立即应用
            }

            _this10.Ball.linearDamping = _this10.initialBallLinearDamping;
            _this10.Ball.angularDamping = _this10.initialBallAngularDamping;

            // ⚠️ 确保完全停止（确定性关键）
            _this10.Ball.linearVelocity = v2(0, 0);
            _this10.Ball.angularVelocity = 0;

            // 重新启用（这会重新初始化物理状态）
            _this10.Ball.enabled = true;

            // 重新注册碰撞监听器（因为禁用/启用会清除监听器）
            _this10.reRegisterBallCollisionListener();
            log('[GameView] 恢复初始物理属性（完全重置）');
          }, 0);
        };
        _proto.resetGame = function resetGame() {
          var _this11 = this;
          log('[GameView] 重置游戏');

          // 先切换状态，避免碰撞回调处理
          this.ballState = BallState.IDLE;
          this.chargeValue = 0;
          this.resetXuLiUI();
          this.debugTargetTrack = -1;
          this.hasEnteredRewardZone = false;
          this.lastHitTrackIndex = -1; // 重置赛道记录

          // 重置小球
          if (this.Ball) {
            // 先清除速度，避免物理引擎继续计算碰撞
            this.Ball.linearVelocity = v2(0, 0);
            this.Ball.angularVelocity = 0;

            // ========== 延迟重置：让物理引擎完全稳定 ==========
            // 延迟3帧再重置位置，确保物理引擎完全稳定
            this.scheduleOnce(function () {
              if (_this11.Ball && _this11.Ball.isValid) {
                // 重置位置和旋转
                _this11.Ball.node.setPosition(_this11.initialBallPosition);
                _this11.Ball.node.setRotationFromEuler(_this11.initialBallRotation);

                // 再次清除速度（确保位置重置后速度为0）
                _this11.Ball.linearVelocity = v2(0, 0);
                _this11.Ball.angularVelocity = 0;

                // 恢复初始物理属性（会禁用再启用 RigidBody）
                _this11.restoreBallPhysics();

                // ========== 最后一步：等待物理引擎同步 ==========
                // 再等待2帧，让物理引擎完全同步新状态
                _this11.scheduleOnce(function () {
                  if (_this11.Ball && _this11.Ball.isValid) {
                    // 最后一次确保速度为0
                    _this11.Ball.linearVelocity = v2(0, 0);
                    _this11.Ball.angularVelocity = 0;
                    log('[GameView] 游戏已重置，物理状态已稳定');
                  }
                }, 0.05); // 等待3帧（约50ms）
              }
            }, 0.05); // 等待3帧（约50ms）
          }
        }

        // ========== 赛道标签更新 ==========

        /**
         * 更新赛道倍率标签
         * 根据配置中的 trac_list 设置标签文本为 "x倍率"
         */;
        _proto.updateTrackLabels = function updateTrackLabels() {
          var config = gameDataMgr.getConfig();
          if (!config || !config.trac_list) {
            log('[GameView] ⚠️ 游戏配置未加载，无法更新赛道标签');
            return;
          }

          // 遍历赛道标签数组
          for (var i = 0; i < this.SaiDaoLabels.length; i++) {
            var label = this.SaiDaoLabels[i];
            if (!label || !label.isValid) {
              continue;
            }

            // 检查配置中是否有对应的赛道数据
            if (i < config.trac_list.length) {
              var trackInfo = config.trac_list[i];
              var rate = trackInfo.rate;

              // 设置标签文本：0倍率 或 3倍率 等
              label.string = "x" + rate;
              log('[GameView] 赛道标签', i + 1, '设置为:', label.string, '(rate:', rate + ')');
            } else {
              log('[GameView] ⚠️ 赛道标签', i + 1, '超出配置范围，配置中只有', config.trac_list.length, '个赛道');
            }
          }
          log('[GameView] ✅ 赛道倍率标签更新完成，共', this.SaiDaoLabels.length, '个标签');
        }

        // ========== 视觉效果初始化 ==========

        /**
         * 初始化所有视觉效果
         */;
        _proto.initVisualEffects = function initVisualEffects() {
          this.initRewardLights();
          this.initAnimaIcons();
          this.initArrows();
          this.initBallOpacity();
          this.initDropWayColliders(); // 新增：初始化DropWay碰撞体

          // 初始化计分板动画器
          if (this.RewardNumLabel) {
            this.rewardScoreAnimator = new RewardScoreAnimator();
            this.rewardScoreAnimator.init(this.RewardNumLabel);
          }
          log('[GameView] ✅ 所有视觉效果已初始化');
        }

        /**
         * 初始化奖励光柱（JiangLiColliders）
         * 隐藏所有光柱的子节点
         */;
        _proto.initRewardLights = function initRewardLights() {
          this.JiangLiColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid || !collider.node) {
              return;
            }
            var parent = collider.node;
            // 隐藏所有子节点（光柱）
            if (parent.children.length >= 2) {
              parent.children[0].active = false; // 大奖光柱
              parent.children[1].active = false; // 普通光柱
              log('[GameView] 初始化赛道', index + 1, '光柱（已隐藏）');
            }
          });
          log('[GameView] ✅ 奖励光柱初始化完成');
        }

        /**
         * 显示奖励光柱
         * 根据赛道倍率显示不同的光柱
         * @param trackIndex 赛道索引(0-6)
         */;
        _proto.showRewardLight = function showRewardLight(trackIndex) {
          if (trackIndex < 0 || trackIndex >= this.JiangLiColliders.length) {
            log('[GameView] ⚠️ 赛道索引超出范围:', trackIndex);
            return;
          }
          var collider = this.JiangLiColliders[trackIndex];
          if (!collider || !collider.isValid || !collider.node) {
            log('[GameView] ⚠️ 赛道', trackIndex + 1, '碰撞体无效');
            return;
          }
          var parent = collider.node;
          if (parent.children.length < 2) {
            log('[GameView] ⚠️ 赛道', trackIndex + 1, '光柱节点不足（需要2个子节点）');
            log('[GameView] 当前子节点数量:', parent.children.length);
            return;
          }

          // 获取赛道倍率
          var config = gameDataMgr.getConfig();
          if (!config || !config.trac_list || !config.trac_list[trackIndex]) {
            log('[GameView] ⚠️ 无法获取赛道', trackIndex + 1, '的配置');
            return;
          }
          var rate = config.trac_list[trackIndex].rate;

          // 根据倍率显示对应光柱
          if (rate >= 5) {
            // 大奖光柱（索引0）
            parent.children[0].active = true;
            parent.children[1].active = false;
            log('[GameView] 🎉 显示大奖光柱！赛道:', trackIndex + 1, '倍率:', rate);
          } else {
            // 普通光柱（索引1）
            parent.children[0].active = false;
            parent.children[1].active = true;
            log('[GameView] ✨ 显示普通光柱，赛道:', trackIndex + 1, '倍率:', rate);
          }
        }

        /**
         * 初始化AnimaColliders图标透明度
         * 设置所有图标透明度为50%
         */;
        _proto.initAnimaIcons = function initAnimaIcons() {
          this.AnimaColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            var parent = collider.node.parent;
            if (!parent || parent.children.length === 0) {
              return;
            }
            var icon = parent.children[0];
            if (!icon || !icon.isValid) {
              return;
            }

            // 获取或添加 UIOpacity 组件
            var uiOpacity = icon.getComponent(UIOpacity);
            if (!uiOpacity) {
              uiOpacity = icon.addComponent(UIOpacity);
            }
            uiOpacity.opacity = 127; // 50%透明度 (0-255)

            log('[GameView] 初始化图标', index + 1, '透明度: 50%');
          });
          log('[GameView] ✅ AnimaColliders图标初始化完成');
        }

        /**
         * 播放AnimaColliders图标闪烁动画（投币后）
         * 闪烁2次：50% → 100% → 50% → 100% → 保持100%
         * 放慢速度，让用户有明确感知
         */;
        _proto.playAnimaIconsFlash = function playAnimaIconsFlash() {
          this.AnimaColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            var parent = collider.node.parent;
            if (!parent || parent.children.length === 0) {
              return;
            }
            var icon = parent.children[0];
            if (!icon || !icon.isValid) {
              return;
            }

            // 获取或添加 UIOpacity 组件
            var uiOpacity = icon.getComponent(UIOpacity);
            if (!uiOpacity) {
              uiOpacity = icon.addComponent(UIOpacity);
            }

            // 闪烁动画：50% → 100% → 50% → 100% → 保持100%
            // 放慢速度：每段0.5秒，总时长2.0秒
            tween(uiOpacity).to(0.5, {
              opacity: 255
            }) // 第1次亮起
            .to(0.5, {
              opacity: 127
            }) // 暗下
            .to(0.5, {
              opacity: 255
            }) // 第2次亮起
            .to(0.5, {
              opacity: 255
            }) // 保持亮起
            .start();
          });
          log('[GameView] ✅ AnimaColliders图标闪烁动画已启动（放慢版）');
        }

        /**
         * 初始化箭头（ArrawNode）
         * 设置所有箭头透明度为0（隐藏）
         */;
        _proto.initArrows = function initArrows() {
          if (!this.ArrawNode || !this.ArrawNode.isValid) {
            return;
          }
          this.ArrawNode.children.forEach(function (arrow, index) {
            if (!arrow || !arrow.isValid) {
              return;
            }

            // 获取或添加 UIOpacity 组件
            var uiOpacity = arrow.getComponent(UIOpacity);
            if (!uiOpacity) {
              uiOpacity = arrow.addComponent(UIOpacity);
            }
            uiOpacity.opacity = 0; // 完全透明
          });

          log('[GameView] ✅ 箭头初始化完成，共', this.ArrawNode.children.length, '个箭头');
        }

        /**
         * 播放箭头流动动画（高连贯版）
         * 针对 6 个箭头优化：消除首尾等待感，实现首尾相接的无缝流动
         */;
        _proto.playArrowFlowAnimation = function playArrowFlowAnimation() {
          var _this12 = this;
          if (!this.ArrawNode || !this.ArrawNode.isValid) return;
          this.stopArrowFlowAnimation();

          // 1. 获取并排序 (假设从下往上亮)
          var arrows = [].concat(this.ArrawNode.children);
          if (arrows.length === 0) return;
          arrows.sort(function (a, b) {
            return a.position.y - b.position.y;
          });

          // --- 核心参数调优 (6个箭头的黄金比例) ---
          // 间隔：决定流动的速度。越小越快。
          var interval = 0.15;

          // 总周期：必须严格等于 数量 * 间隔，保证首尾无缝衔接
          var cycleDuration = arrows.length * interval; // 6 * 0.15 = 0.9秒

          // 亮起时间：短一点，产生冲击感
          var fadeInTime = 0.1;

          // 熄灭时间：关键！设置为 (总周期 - 亮起时间)，填满整个周期
          // 这样每个箭头会在下一次轮到它亮起的前一瞬间才刚刚熄灭，绝无空档
          var fadeOutTime = cycleDuration - fadeInTime;

          // 2. 执行动画
          arrows.forEach(function (arrow, index) {
            if (!arrow || !arrow.isValid) return;
            var uiOpacity = arrow.getComponent(UIOpacity);
            if (!uiOpacity) uiOpacity = arrow.addComponent(UIOpacity);

            // 初始设置：为了不闪烁，先设为0
            uiOpacity.opacity = 0;
            Tween.stopAllByTarget(uiOpacity);

            // 构建单次循环：瞬间亮起 -> 漫长的熄灭
            // 使用 smooth 曲线让光感更柔和
            var oneLoop = tween(uiOpacity).to(fadeInTime, {
              opacity: 255
            }, {
              easing: 'smooth'
            }).to(fadeOutTime, {
              opacity: 0
            }, {
              easing: 'quadOut'
            }); // quadOut 让高亮停留久一点，尾巴拖得长
            // 这里不需要 .delay 了，因为 fadeIn + fadeOut 刚好等于 cycleDuration

            // 3. 错峰启动
            // 使用 sequence 包装，确保初始延迟只执行一次，后面无限循环 oneLoop
            var mainTween = tween(uiOpacity).delay(index * interval) // 0s, 0.15s, 0.3s ...
            .sequence(oneLoop) // 播放第一次
            .repeatForever() // 无限重复
            .start();
            _this12.arrowFlowTweens.push(mainTween);
          });
          console.log("[GameView] \uD83C\uDF0A \u8FDE\u8D2F\u6D41\u5149\u542F\u52A8: \u5468\u671F" + cycleDuration.toFixed(2) + "s");
        }

        /**
         * 停止箭头流动动画
         */;
        _proto.stopArrowFlowAnimation = function stopArrowFlowAnimation() {
          // 停止所有记录的 tween
          if (this.arrowFlowTweens.length > 0) {
            this.arrowFlowTweens.forEach(function (tweenObj) {
              if (tweenObj) {
                tweenObj.stop();
              }
            });
            log('[GameView] 已停止', this.arrowFlowTweens.length, '个箭头动画');
            // 清空数组
            this.arrowFlowTweens = [];
          }
          if (!this.ArrawNode || !this.ArrawNode.isValid) {
            return;
          }

          // 重置所有箭头的透明度
          this.ArrawNode.children.forEach(function (arrow) {
            if (!arrow || !arrow.isValid) {
              return;
            }

            // 获取 UIOpacity 组件
            var uiOpacity = arrow.getComponent(UIOpacity);
            if (uiOpacity) {
              // 重置透明度为0
              uiOpacity.opacity = 0;
            }
          });
          log('[GameView] 箭头流动动画已完全停止并重置');
        }

        /**
         * 初始化小球透明度
         * 设置小球透明度为0（隐藏）
         */;
        _proto.initBallOpacity = function initBallOpacity() {
          if (!this.Ball || !this.Ball.isValid) {
            return;
          }

          // 获取或添加 UIOpacity 组件
          var uiOpacity = this.Ball.node.getComponent(UIOpacity);
          if (!uiOpacity) {
            uiOpacity = this.Ball.node.addComponent(UIOpacity);
          }
          uiOpacity.opacity = 0; // 完全透明

          log('[GameView] ✅ 小球初始化（隐藏）');
        }

        /**
         * 初始化DropWayColliders
         * 重置Sprite状态和透明度
         */;
        _proto.initDropWayColliders = function initDropWayColliders() {
          this.DropWayColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid || !collider.node) {
              return;
            }
            var sprite = collider.node.getComponent(Sprite);
            if (sprite) {
              // 禁用Sprite（初始状态不显示）
              sprite.enabled = false;
            }

            // 获取或添加 UIOpacity 组件，设置为50%（为后续动画准备）
            var uiOpacity = collider.node.getComponent(UIOpacity);
            if (!uiOpacity) {
              uiOpacity = collider.node.addComponent(UIOpacity);
            }
            uiOpacity.opacity = 127; // 50%透明度
          });

          log('[GameView] ✅ DropWayColliders初始化完成');
        }

        /**
         * 播放小球闪烁渐显动画（投币后）
         * 闪烁效果：0 → 255 → 127 → 255
         * 放慢速度，让用户有明确感知
         */;
        _proto.playBallFlashIn = function playBallFlashIn() {
          if (!this.Ball || !this.Ball.isValid) {
            return;
          }

          // 获取或添加 UIOpacity 组件
          var uiOpacity = this.Ball.node.getComponent(UIOpacity);
          if (!uiOpacity) {
            uiOpacity = this.Ball.node.addComponent(UIOpacity);
          }

          // 放慢速度：每段0.3秒，总时长0.75秒
          tween(uiOpacity).to(0.3, {
            opacity: 255
          }) // 渐显
          .to(0.15, {
            opacity: 127
          }) // 暗下
          .to(0.3, {
            opacity: 255
          }) // 再次亮起
          .start();
          log('[GameView] ✅ 小球闪烁渐显动画已启动（放慢版）');
        }

        /**
         * 重置小球透明度为0（隐藏）
         */;
        _proto.resetBallOpacity = function resetBallOpacity() {
          if (!this.Ball || !this.Ball.isValid) {
            return;
          }

          // 获取 UIOpacity 组件
          var uiOpacity = this.Ball.node.getComponent(UIOpacity);
          if (uiOpacity) {
            uiOpacity.opacity = 0;
          }
        };
        return GameView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Ball", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "PressBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "XuLiNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "JiangLiColliders", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "AnimaColliders", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "DropWayColliders", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ArrawNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "TouBiBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "PayScoreLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "AddScoreBtn", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "ReduceScoreBtn", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "ScoreLabel", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "BallNumLabel", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "RewardNumLabel", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "SaiDaoLabels", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "ResetGameBtn", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "AutoTestBtn", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "CanshuBtn", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CommonExport.ts', './ConfigBase.ts', './AutoTester.ts', './BallPhysicsConfig.ts', './GameConfig.ts', './GameView.ts', './ConfigMgr.ts', './GameDataMgr.ts', './NetMgr.ts', './PoolMgr.ts', './ToastUtil.ts', './MultiplierControl.ts', './NetTypes.ts', './RewardScoreAnimator.ts', './TrajectoryCompressor.ts', './TrajectoryData.ts', './TrajectoryPlayer.ts', './TrajectoryRecorder.ts', './UIUtil.ts', './StartView.ts', './GameBinder.ts', './Game_Component1.ts', './Game_GamePage.ts', './Game_GamePage_Logic.ts', './Game_RewardPage.ts', './Game_RewardPage_Logic.ts', './Game_RulePage.ts', './Game_RulePage_Logic.ts', './Game_Tooltips.ts', './Game_Tooltips_Logic.ts', './AnimatedWindow.ts', './CenteredWindow.ts', './Game_Button1.ts', './Game_Button1_Logic.ts', './Game_TestBtnView.ts', './Game_TestBtnView_Logic.ts', './Game_TestView.ts', './Game_TestView_Logic.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MultiplierControl.ts", ['cc', './drongo-cc.mjs', './GameDataMgr.ts', './UIUtil.ts'], function (exports) {
  var cclegacy, Button, log, gameDataMgr, setButtonInteractable;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
    }, function (module) {
      log = module.log;
    }, function (module) {
      gameDataMgr = module.gameDataMgr;
    }, function (module) {
      setButtonInteractable = module.setButtonInteractable;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ffed1n8b6pBR4VA5+hpM8p5", "MultiplierControl", undefined);
      var MultiplierControl = exports('MultiplierControl', /*#__PURE__*/function () {
        function MultiplierControl() {
          this.addBtn = void 0;
          this.reduceBtn = void 0;
          this.payScoreLabel = void 0;
          this.scoreLabel = void 0;
        }
        var _proto = MultiplierControl.prototype;
        /**
         * 初始化倍率控制器
         * @param addBtn 增加倍率按钮
         * @param reduceBtn 减少倍率按钮
         * @param payScoreLabel 消耗积分显示（负数）
         * @param scoreLabel 倍率积分显示
         */
        _proto.init = function init(addBtn, reduceBtn, payScoreLabel, scoreLabel) {
          // 验证输入参数
          if (!addBtn || !reduceBtn || !payScoreLabel || !scoreLabel) {
            log('[MultiplierControl] ❌ 初始化失败：缺少必要的UI组件');
            return;
          }
          this.addBtn = addBtn;
          this.reduceBtn = reduceBtn;
          this.payScoreLabel = payScoreLabel;
          this.scoreLabel = scoreLabel;

          // 绑定按钮事件
          this.addBtn.node.on(Button.EventType.CLICK, this.onIncrease, this);
          this.reduceBtn.node.on(Button.EventType.CLICK, this.onDecrease, this);

          // 初始化显示
          this.updateUI();
          log('[MultiplierControl] 倍率控制器已初始化');
        }

        /**
         * 增加倍率
         */;
        _proto.onIncrease = function onIncrease() {
          gameDataMgr.increaseMultiplier();
          this.updateUI();
        }

        /**
         * 减少倍率
         */;
        _proto.onDecrease = function onDecrease() {
          gameDataMgr.decreaseMultiplier();
          this.updateUI();
        }

        /**
         * 更新UI显示
         */;
        _proto.updateUI = function updateUI() {
          var costPoints = gameDataMgr.getCostPoints();

          // 更新显示
          if (this.payScoreLabel) {
            this.payScoreLabel.string = "-" + costPoints;
          }
          if (this.scoreLabel) {
            this.scoreLabel.string = "" + costPoints;
          }

          // 更新按钮状态（自动处理灰化）
          setButtonInteractable(this.addBtn, gameDataMgr.canIncreaseMultiplier());
          setButtonInteractable(this.reduceBtn, gameDataMgr.canDecreaseMultiplier());
          log('[MultiplierControl] UI更新 - 倍率:', gameDataMgr.getCurrentMultiplier(), '消耗:', costPoints);
        }

        /**
         * 销毁控制器
         */;
        _proto.destroy = function destroy() {
          if (this.addBtn) {
            this.addBtn.node.off(Button.EventType.CLICK, this.onIncrease, this);
          }
          if (this.reduceBtn) {
            this.reduceBtn.node.off(Button.EventType.CLICK, this.onDecrease, this);
          }
        };
        return MultiplierControl;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './NetTypes.ts', './ToastUtil.ts', './Game_Tooltips_Logic.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, autoBindToWindow, log, mk_instance_base, Environment, showToast, ToastType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      autoBindToWindow = module.autoBindToWindow;
      log = module.log;
      mk_instance_base = module.instance_base;
    }, function (module) {
      Environment = module.Environment;
    }, function (module) {
      showToast = module.showToast;
    }, function (module) {
      ToastType = module.ToastType;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "cb14akqzPhM6byk3/V6Tap6", "NetMgr", undefined);
      var NetMgr = autoBindToWindow(_class = /*#__PURE__*/function (_instance_base) {
        _inheritsLoose(NetMgr, _instance_base);
        function NetMgr() {
          var _this$API_CONFIG;
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _instance_base.call.apply(_instance_base, [this].concat(args)) || this;
          /** 环境配置表 */
          _this.API_CONFIG = (_this$API_CONFIG = {}, _this$API_CONFIG[Environment.Test] = 'http://communitytest.best-envision.com/', _this$API_CONFIG[Environment.PreRelease] = 'https://community-api2.joyhub.net/', _this$API_CONFIG[Environment.Production] = 'https://community-api.joyhub.net/', _this$API_CONFIG);
          /** 当前环境 */
          _this.currentEnv = Environment.Test;
          /** 
           * 认证Token
           * 默认为测试Token，生产环境应由APP透传后调用setToken设置
           */
          _this.token = 'uPo+dxh6eeTOyN+4wMSZUBRUZngS3s9tKWY8qKLc+fKBY5K3co9GPpAMJJO/QVMmEh9XFxx2AEYSEE6NxF1UuMy41gQzC8p/DEANfPQ6Gw8ISCFBhtTBLQwsGMr5faddvIh+Zq6Z1EKCuw==';
          return _this;
        }
        var _proto = NetMgr.prototype;
        /**
         * 设置认证Token
         * @param token 认证Token
         */
        _proto.setToken = function setToken(token) {
          this.token = token;
          log('NetMgr: Token已更新');
        }

        /**
         * 获取当前Token
         */;
        _proto.getToken = function getToken() {
          return this.token;
        }

        /**
         * 设置当前环境
         * @param env 环境枚举
         */;
        _proto.setEnvironment = function setEnvironment(env) {
          this.currentEnv = env;
          log("NetMgr: \u73AF\u5883\u5DF2\u5207\u6362\u81F3 " + env + " (" + this.API_CONFIG[env] + ")");
        }

        /**
         * 获取当前环境
         */;
        _proto.getEnvironment = function getEnvironment() {
          return this.currentEnv;
        }

        /**
         * 获取当前环境的BaseURL
         */;
        _proto.getBaseURL = function getBaseURL() {
          return this.API_CONFIG[this.currentEnv];
        }

        /**
         * 统一请求方法
         * @param path API路径
         * @param body 请求体
         * @returns 响应数据
         */;
        _proto.request = /*#__PURE__*/
        function () {
          var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(path, body) {
            var url, response, result, errorMsg;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  url = this.getBaseURL() + path;
                  _context.prev = 1;
                  log("NetMgr: \u8BF7\u6C42 " + url, body);

                  // 使用原生 fetch API
                  _context.next = 5;
                  return fetch(url, {
                    method: 'POST',
                    headers: {
                      'Accept': '*/*',
                      'Content-Type': 'application/json',
                      'External-Authorization': this.token
                    },
                    body: body ? JSON.stringify(body) : undefined
                  });
                case 5:
                  response = _context.sent;
                  _context.next = 8;
                  return response.json();
                case 8:
                  result = _context.sent;
                  log("NetMgr: \u54CD\u5E94 " + url, result);

                  // 错误处理：code不为0时自动显示Toast
                  if (result.code !== 0) {
                    this.showToastInternal(result.msg || '请求失败');
                  }
                  return _context.abrupt("return", result);
                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](1);
                  log("NetMgr: \u8BF7\u6C42\u5F02\u5E38 " + url, _context.t0);

                  // 网络异常处理
                  errorMsg = _context.t0 instanceof Error ? _context.t0.message : '网络请求失败';
                  this.showToastInternal(errorMsg);

                  // 返回标准格式的错误响应
                  return _context.abrupt("return", {
                    code: -1,
                    msg: errorMsg,
                    data: null
                  });
                case 20:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 14]]);
          }));
          function request(_x, _x2) {
            return _request.apply(this, arguments);
          }
          return request;
        }()
        /**
         * 显示Toast提示（调用全局工具方法）
         * @param msg 提示消息
         * @param type 消息类型（默认为错误）
         */;

        _proto.showToastInternal = /*#__PURE__*/
        function () {
          var _showToastInternal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(msg, type) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (type === void 0) {
                    type = ToastType.Error;
                  }
                  _context2.next = 3;
                  return showToast(msg, type);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function showToastInternal(_x3, _x4) {
            return _showToastInternal.apply(this, arguments);
          }
          return showToastInternal;
        }()
        /**
         * 获取游戏配置
         * @returns 游戏配置数据
         */;

        _proto.getGameConfig = /*#__PURE__*/
        function () {
          var _getGameConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", this.request('api/marble/config'));
                case 1:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function getGameConfig() {
            return _getGameConfig.apply(this, arguments);
          }
          return getGameConfig;
        }()
        /**
         * 开始游戏（返回游戏结果）
         * @param multiplier 玩家选择的倍率，必须为正整数
         * @returns 游戏结果数据
         */;

        _proto.startGame = /*#__PURE__*/
        function () {
          var _startGame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(multiplier) {
            var requestData;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  requestData = {
                    multiplier: multiplier
                  };
                  return _context4.abrupt("return", this.request('api/marble/run', requestData));
                case 2:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function startGame(_x5) {
            return _startGame.apply(this, arguments);
          }
          return startGame;
        }();
        return NetMgr;
      }(mk_instance_base)) || _class;
      var netMgr = exports('netMgr', NetMgr.instance());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetTypes.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "00000AAAAAAAAAAAAAAAAAA", "NetTypes", undefined);
      /**
       * 网络请求相关类型定义
       */

      /**
       * 环境枚举
       */
      var Environment = exports('Environment', /*#__PURE__*/function (Environment) {
        Environment["Test"] = "test";
        Environment["PreRelease"] = "prerelease";
        Environment["Production"] = "production";
        return Environment;
      }({}));

      /**
       * API配置接口
       */

      /**
       * 通用响应格式
       * @template T 响应数据类型
       */

      /**
       * 赛道配置信息
       */

      /**
       * 游戏配置响应数据
       */

      /**
       * 开始游戏请求数据
       */

      /**
       * 开始游戏响应数据
       */
      cclegacy._RF.pop();
    }
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

System.register("chunks:///_virtual/RewardScoreAnimator.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, tween, log;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8e83aF0zHFDGZsmMiYVyBmO", "RewardScoreAnimator", undefined);
      var RewardScoreAnimator = exports('RewardScoreAnimator', /*#__PURE__*/function () {
        function RewardScoreAnimator() {
          this.label = null;
          this.lightSprite = null;
        }
        var _proto = RewardScoreAnimator.prototype;
        // 亮起图片（父节点的第一个子节点）
        /**
         * 初始化动画器
         * @param label 计分板Label组件
         */
        _proto.init = function init(label) {
          if (!label || !label.isValid) {
            log('[RewardScoreAnimator] ❌ Label无效');
            return;
          }
          this.label = label;

          // 获取父节点的第一个子节点作为亮起图片
          if (label.node.parent && label.node.parent.children.length > 0) {
            this.lightSprite = label.node.parent.children[0];
          }
          this.reset();
          log('[RewardScoreAnimator] ✅ 初始化完成');
        }

        /**
         * 重置到初始状态
         * - 亮起图片隐藏
         * - Label透明度15%
         * - 显示"——"
         */;
        _proto.reset = function reset() {
          if (!this.label || !this.label.isValid) {
            return;
          }

          // 隐藏亮起图片
          if (this.lightSprite && this.lightSprite.isValid) {
            this.lightSprite.active = false;
          }

          // 设置Label透明度为15%
          var color = this.label.color.clone();
          color.a = 38; // 15% * 255 ≈ 38
          this.label.color = color;

          // 显示占位符
          this.label.string = '——';
          log('[RewardScoreAnimator] 重置为初始状态');
        }

        /**
         * 激活计分板（投币后调用）
         * - 亮起图片显示
         * - Label透明度100%
         */;
        _proto.activate = function activate() {
          if (!this.label || !this.label.isValid) {
            return;
          }

          // 显示亮起图片
          if (this.lightSprite && this.lightSprite.isValid) {
            this.lightSprite.active = true;
          }

          // 设置Label透明度为100%
          var color = this.label.color.clone();
          color.a = 255;
          this.label.color = color;
          log('[RewardScoreAnimator] 计分板已激活');
        }

        /**
         * 播放积分翻倍动画（中等方案）
         * 阶段1：显示基础积分（0.5秒）
         * 阶段2：显示倍率标记 x倍率（0.3秒）
         * 阶段3：数字逐步增加到最终积分（0.8秒）
         * 
         * @param basePoints 基础积分（消耗的积分）
         * @param multiplier 倍率
         * @param finalPoints 最终赢得的积分
         * @param onComplete 动画完成回调
         */;
        _proto.playMultiplyAnimation = function playMultiplyAnimation(basePoints, multiplier, finalPoints, onComplete) {
          var _this = this;
          if (!this.label || !this.label.isValid) {
            log('[RewardScoreAnimator] ⚠️ Label无效，无法播放动画');
            if (onComplete) onComplete();
            return;
          }

          // 停止之前的动画
          tween(this.label.node).stop();
          log('[RewardScoreAnimator] 开始积分翻倍动画:', basePoints, 'x', multiplier, '=', finalPoints);

          // 阶段1：显示基础积分
          this.label.string = basePoints.toString();
          tween(this.label.node)
          // 等待0.5秒
          .delay(0.5)
          // 阶段2：显示倍率标记
          .call(function () {
            if (_this.label && _this.label.isValid) {
              _this.label.string = basePoints + " x" + multiplier;
              log('[RewardScoreAnimator] 显示倍率标记:', _this.label.string);
            }
          })
          // 等待0.3秒
          .delay(0.3)
          // 阶段3：数字递增动画
          .call(function () {
            if (_this.label && _this.label.isValid) {
              _this.animateCountUp(basePoints, finalPoints, 0.8, onComplete);
            }
          }).start();
        }

        /**
         * 数字递增动画
         * @param from 起始数值
         * @param to 目标数值
         * @param duration 动画时长（秒）
         * @param onComplete 完成回调
         */;
        _proto.animateCountUp = function animateCountUp(from, to, duration, onComplete) {
          var _this2 = this;
          if (!this.label || !this.label.isValid) {
            if (onComplete) onComplete();
            return;
          }
          var steps = 20; // 分20步递增
          var stepDuration = duration / steps;
          var increment = (to - from) / steps;
          var current = from;
          log('[RewardScoreAnimator] 数字递增:', from, '→', to);

          // 创建递增动画
          var node = this.label.node;
          var stepCount = 0;
          tween(node).repeat(steps, tween().delay(stepDuration).call(function () {
            if (_this2.label && _this2.label.isValid) {
              current += increment;
              stepCount++;

              // 最后一步直接设置为目标值，避免浮点误差
              if (stepCount >= steps) {
                _this2.label.string = to.toString();
              } else {
                _this2.label.string = Math.floor(current).toString();
              }
            }
          }))
          // 确保最终显示目标值并调用回调
          .call(function () {
            if (_this2.label && _this2.label.isValid) {
              _this2.label.string = to.toString();
              log('[RewardScoreAnimator] ✅ 动画完成，最终积分:', to);
            }
            // 调用完成回调
            if (onComplete) {
              onComplete();
            }
          }).start();
        }

        /**
         * 停止所有动画
         */;
        _proto.stop = function stop() {
          if (this.label && this.label.isValid) {
            tween(this.label.node).stop();
          }
        }

        /**
         * 销毁
         */;
        _proto.destroy = function destroy() {
          this.stop();
          this.label = null;
          this.lightSprite = null;
        };
        return RewardScoreAnimator;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './CommonExport.ts', './fairygui.mjs', './drongo-cc.mjs', './TrajectoryData.ts', './GameDataMgr.ts', './GameConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, ProgressBar, Node, color, director, tween, Component, AudioUtil, AllBinder, BackgroundAdapter, GUIManager, UIConfig, registerFont, GRoot, log, TrajectoryConfig, gameDataMgr, setGameMode, GameMode, getCurrentGameMode;
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
      director = module.director;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      AudioUtil = module.AudioUtil;
      AllBinder = module.AllBinder;
      BackgroundAdapter = module.BackgroundAdapter;
      GUIManager = module.GUIManager;
    }, null, function (module) {
      UIConfig = module.UIConfig;
      registerFont = module.registerFont;
      GRoot = module.GRoot;
    }, function (module) {
      log = module.log;
    }, function (module) {
      TrajectoryConfig = module.TrajectoryConfig;
    }, function (module) {
      gameDataMgr = module.gameDataMgr;
    }, function (module) {
      setGameMode = module.setGameMode;
      GameMode = module.GameMode;
      getCurrentGameMode = module.getCurrentGameMode;
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
          // 读取并设置游戏模式（从URL参数）
          this.parseAndSetGameMode();

          // fgui.GRoot.create();

          // fgui.UIConfig.buttonSound = "ui://MainMenu/click";
          UIConfig.buttonSoundVolumeScale = 1;
          UIConfig.bringWindowToFrontOnClick = false;
          registerFont("GILROY-BLACK");
          UIConfig.defaultFont = "GILROY-BLACK";
          UIConfig.modalLayerColor = color(0, 0, 0, 100);

          // 初始化进度条和标签
          this.progressBar.progress = 0;
          this.label.string = "0%";
          this.progressObj.value = 0;
          director.addPersistRootNode(this.node);
        }

        /**
         * 解析URL参数并设置游戏模式
         * 例如: ?GameMode=PLAYBACK 或 ?GameMode=RECORDING
         */;
        _proto.parseAndSetGameMode = function parseAndSetGameMode() {
          if (typeof window === 'undefined') {
            log('[StartView] 非浏览器环境，使用默认游戏模式');
            return;
          }
          try {
            var urlParams = new URLSearchParams(window.location.search);
            var gameModeParam = urlParams.get('GameMode');
            if (gameModeParam) {
              var upperParam = gameModeParam.toUpperCase();
              if (upperParam === 'PLAYBACK') {
                setGameMode(GameMode.PLAYBACK);
                log('[StartView] ✅ 从URL设置游戏模式为: PLAYBACK');
              } else if (upperParam === 'RECORDING') {
                setGameMode(GameMode.RECORDING);
                log('[StartView] ✅ 从URL设置游戏模式为: RECORDING');
              } else {
                log('[StartView] ⚠️ 无效的GameMode参数:', gameModeParam, '使用默认模式');
              }
            } else {
              log('[StartView] 未指定GameMode参数，使用默认模式:', getCurrentGameMode());
            }
          } catch (error) {
            log('[StartView] ⚠️ 解析URL参数失败:', error);
          }
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _this2 = this;
            var configProgress, sceneProgress, updateParallelProgress, _yield$Promise$all, loadSuccess;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  AllBinder.bindAll();
                  _context3.prev = 1;
                  GRoot.create();
                  BackgroundAdapter.adaptBackground(this.bg);

                  // ==================== 阶段1: 加载UI包 (0% - 40%) ====================
                  log('[StartView] 开始加载UI包...');
                  _context3.next = 7;
                  return GUIManager.loadPackage("Game", function (finish, total) {
                    var packageProgress = finish / total;
                    // UI包占总进度的 0-40%
                    var targetProgress = packageProgress * 0.4;
                    _this2.updateProgress(targetProgress, "加载UI资源");
                  });
                case 7:
                  log('[StartView] ✅ UI包加载完成');

                  // ==================== 阶段2: 并行加载游戏配置和预加载场景 (40% - 80%) ====================
                  log('[StartView] 开始并行加载游戏配置和场景...');

                  // 并行任务的进度跟踪
                  configProgress = 0; // 配置加载进度 (0-1)
                  sceneProgress = 0; // 场景加载进度 (0-1)
                  // 更新并行阶段总进度的函数
                  updateParallelProgress = function updateParallelProgress() {
                    // 阶段2总共占40%的空间 (40%-80%)
                    // 配置占前半部分 20%: 40%-60%
                    // 场景占后半部分 20%: 60%-80%
                    var totalProgress = 0.4 + configProgress * 0.2 + sceneProgress * 0.2;
                    _this2.updateProgress(totalProgress, "加载中");
                  };
                  _context3.next = 14;
                  return Promise.all([
                  // 任务1: 加载游戏配置（自动判断Mock）
                  _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    var success;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          log('[StartView] → 加载游戏配置...');
                          configProgress = 0;
                          updateParallelProgress();
                          _context.next = 5;
                          return gameDataMgr.loadConfig();
                        case 5:
                          success = _context.sent;
                          if (success) {
                            log('[StartView] ✅ 游戏配置加载成功');
                            configProgress = 1;
                            updateParallelProgress();
                          } else {
                            log('[StartView] ❌ 游戏配置加载失败');
                          }
                          return _context.abrupt("return", success);
                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }))(),
                  // 任务2: 预加载Game场景（资源加载）
                  _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          log('[StartView] → 预加载Game场景...');
                          sceneProgress = 0;
                          updateParallelProgress();
                          _context2.next = 5;
                          return new Promise(function (resolve, reject) {
                            director.preloadScene("game",
                            // 进度回调
                            function (completedCount, totalCount) {
                              sceneProgress = completedCount / totalCount;
                              updateParallelProgress();
                            },
                            // 完成回调
                            function (error) {
                              if (error) {
                                console.error("场景预加载失败:", error);
                                reject(error);
                              } else {
                                log('[StartView] ✅ 场景预加载完成');
                                sceneProgress = 1;
                                updateParallelProgress();
                                resolve();
                              }
                            });
                          });
                        case 5:
                          return _context2.abrupt("return", true);
                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }))()]);
                case 14:
                  _yield$Promise$all = _context3.sent;
                  loadSuccess = _yield$Promise$all[0];
                  if (loadSuccess) {
                    _context3.next = 19;
                    break;
                  }
                  log('[StartView] ❌ 游戏配置加载失败，无法启动游戏');
                  return _context3.abrupt("return");
                case 19:
                  log('[StartView] ✅ 游戏配置和场景预加载完成');
                  log('[StartView] 💡 游戏UI将在GameView.start()中打开');

                  // ==================== 阶段3: 预加载轨迹数据 (80% - 100%) ====================
                  log("开始加载轨迹数据...");
                  this.updateProgress(0.8, "加载轨迹数据");
                  _context3.prev = 23;
                  _context3.next = 26;
                  return TrajectoryConfig.loadTrajectories();
                case 26:
                  log("轨迹数据加载完成！");
                  this.updateProgress(1.0, "加载完成");
                  _context3.next = 35;
                  break;
                case 30:
                  _context3.prev = 30;
                  _context3.t0 = _context3["catch"](23);
                  console.warn("轨迹数据加载失败:", _context3.t0);
                  log("⚠️ 轨迹数据加载失败，游戏将以录制模式启动");
                  this.updateProgress(1.0, "加载完成");
                case 35:
                  // ==================== 播放BGM ====================
                  try {
                    AudioUtil.playBGM(this.node, "Game", "bgm");
                    log("BGM播放成功");
                  } catch (error) {
                    console.warn("BGM播放失败:", error);
                  }

                  // ==================== 所有资源加载完成，自动切换场景 ====================
                  log("所有资源加载完成，准备切换到Game场景...");
                  this.updateProgress(1.0, "加载完成");

                  // 短暂延迟后切换场景，让用户看到100%
                  this.scheduleOnce(function () {
                    director.loadScene("game", function (error) {
                      if (error) {
                        console.error("场景切换失败:", error);
                      } else {
                        log("成功切换到Game场景");
                      }
                    });
                  }, 0.5);
                  _context3.next = 46;
                  break;
                case 41:
                  _context3.prev = 41;
                  _context3.t1 = _context3["catch"](1);
                  console.error("资源加载失败:", _context3.t1);
                  // 即使预加载失败，也尝试直接切换场景
                  log("预加载失败，尝试直接切换场景...");
                  this.scheduleOnce(function () {
                    director.loadScene("game");
                  }, 1.0);
                case 46:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this, [[1, 41], [23, 30]]);
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

System.register("chunks:///_virtual/ToastUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './Game_Tooltips.ts', './Game_Tooltips_Logic.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, GUIManager, Game_Tooltips, Game_Tooltips_Logic, ToastType;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GUIManager = module.GUIManager;
    }, function (module) {
      Game_Tooltips = module.default;
    }, function (module) {
      Game_Tooltips_Logic = module.default;
      ToastType = module.ToastType;
    }],
    execute: function () {
      exports('showToast', showToast);
      cclegacy._RF.push({}, "92e47j6p8hCmbxdBhzqe1Yk", "ToastUtil", undefined);

      /**
       * 显示Toast提示
       * @param message 提示消息内容
       * @param type 消息类型（默认为Info）
       */
      function showToast(_x, _x2) {
        return _showToast.apply(this, arguments);
      }
      function _showToast() {
        _showToast = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message, type) {
          var ui, logic, tooltips;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (type === void 0) {
                  type = ToastType.Info;
                }
                _context.prev = 1;
                _context.next = 4;
                return GUIManager.open(Game_Tooltips);
              case 4:
                ui = _context.sent;
                // 获取Logic并播放动画
                logic = ui.contentPane.Get(Game_Tooltips_Logic);
                if (logic) {
                  logic.show(message, type);
                } else {
                  console.warn('ToastUtil: 无法获取Game_Tooltips_Logic');
                  // 降级处理：直接显示文本
                  tooltips = ui.contentPane;
                  if (tooltips && tooltips.m_title) {
                    tooltips.m_title.text = message;
                  }
                }
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.error('ToastUtil: 显示Toast失败', _context.t0);
              case 12:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 9]]);
        }));
        return _showToast.apply(this, arguments);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrajectoryCompressor.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "36f6eKRqGFDIrpJw2MarGcE", "TrajectoryCompressor", undefined);
      /**
       * 轨迹数据压缩工具（可选）
       * 提供 GZIP + Base64 压缩方案
       */
      var TrajectoryCompressor = exports('TrajectoryCompressor', /*#__PURE__*/function () {
        function TrajectoryCompressor() {}
        /**
         * 压缩轨迹数据为 Base64 字符串
         * 注意：浏览器端需要 pako 库支持 GZIP
         * 
         * 使用方法：
         * 1. npm install pako
         * 2. import pako from 'pako';
         * 3. const compressed = TrajectoryCompressor.compress(data);
         */
        TrajectoryCompressor.compress = function compress(data) {
          try {
            // 将数据转为JSON字符串
            var jsonStr = JSON.stringify(data);

            // 方案1：直接Base64（无GZIP，兼容性最好）
            // 压缩率约30%
            var base64 = btoa(encodeURIComponent(jsonStr));
            return base64;

            // 方案2：GZIP + Base64（需要 pako 库）
            // 压缩率约70%
            // const uint8array = new TextEncoder().encode(jsonStr);
            // const compressed = pako.gzip(uint8array);
            // const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
            // return base64;
          } catch (err) {
            console.error('[TrajectoryCompressor] 压缩失败:', err);
            return '';
          }
        }

        /**
         * 解压轨迹数据
         */;
        TrajectoryCompressor.decompress = function decompress(compressedStr) {
          try {
            // 方案1：Base64解码
            var jsonStr = decodeURIComponent(atob(compressedStr));

            // 方案2：GZIP解压（需要 pako 库）
            // const compressed = Uint8Array.from(atob(compressedStr), c => c.charCodeAt(0));
            // const decompressed = pako.ungzip(compressed);
            // const jsonStr = new TextDecoder().decode(decompressed);

            return JSON.parse(jsonStr);
          } catch (err) {
            console.error('[TrajectoryCompressor] 解压失败:', err);
            return null;
          }
        }

        /**
         * 计算压缩率
         */;
        TrajectoryCompressor.getCompressionRatio = function getCompressionRatio(original, compressed) {
          var originalSize = JSON.stringify(original).length;
          var compressedSize = compressed.length;
          return (1 - compressedSize / originalSize) * 100;
        };
        return TrajectoryCompressor;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrajectoryData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, JsonAsset, mk_asset$1;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      mk_asset$1 = module.asset;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3c3225SUyVAaawsMfBzWyB+", "TrajectoryData", undefined);

      /**
       * 压缩轨迹数据（列式存储 + 差分编码）
       * 
       * 压缩原理：
       * 1. 列式存储：相同类型数据聚集，Gzip 压缩率极高
       * 2. 差分编码：只存储相对于上一帧的变化量，数值更小
       * 
       * 例如：X坐标 [32315, 32315, 32317] → 差分 [32315, 0, 2]
       * 
       * 预期压缩率：60-80%（26KB → 8-10KB）
       */

      /**
       * 轨迹事件
       * 用于记录碰撞、进入奖励区等场景交互
       */

      /**
       * 轨迹编解码工具
       * 用于定点数转换和数组格式处理
       */
      var TrajectoryCodec = exports('TrajectoryCodec', /*#__PURE__*/function () {
        function TrajectoryCodec() {}
        /**
         * 转换为定点数（乘以100存储）
         * 例如：123.45 → 12345
         */
        TrajectoryCodec.toFixed = function toFixed(value) {
          return Math.round(value * 100);
        }

        /**
         * 从定点数还原（除以100）
         * 例如：12345 → 123.45
         */;
        TrajectoryCodec.fromFixed = function fromFixed(value) {
          return value / 100;
        };
        return TrajectoryCodec;
      }());

      /**
       * 轨迹配置管理
       * 支持从 resources/trajectories/ 目录动态加载轨迹数据
       */
      var TrajectoryConfig = exports('TrajectoryConfig', /*#__PURE__*/function () {
        function TrajectoryConfig() {}
        /**
         * 根据服务器结果精确选择轨迹
         * @param trackId 赛道ID
         * @param trajectoryIndex 轨迹索引（服务器指定）
         * @returns 压缩轨迹数据
         */
        TrajectoryConfig.getTrajectoryByResult = function getTrajectoryByResult(trackId, trajectoryIndex) {
          var trajectories = this.TRAJECTORIES.get(trackId);
          if (!trajectories || trajectoryIndex < 0 || trajectoryIndex >= trajectories.length) {
            return null;
          }
          return trajectories[trajectoryIndex];
        }

        /**
         * 获取随机轨迹（测试用）
         * @param trackId 赛道ID
         * @returns 随机轨迹数据
         */;
        TrajectoryConfig.getRandomTrajectory = function getRandomTrajectory(trackId) {
          var trajectories = this.TRAJECTORIES.get(trackId);
          if (!trajectories || trajectories.length === 0) {
            return null;
          }
          var randomIndex = Math.floor(Math.random() * trajectories.length);
          return trajectories[randomIndex];
        }

        /**
         * 获取指定赛道的所有轨迹
         * @param trackId 赛道ID
         * @returns 轨迹数组
         */;
        TrajectoryConfig.getTrajectories = function getTrajectories(trackId) {
          return this.TRAJECTORIES.get(trackId) || [];
        }

        /**
         * 添加轨迹（录制后动态添加）
         * @param trajectory 压缩轨迹数据
         */;
        TrajectoryConfig.addTrajectory = function addTrajectory(trajectory) {
          if (!this.TRAJECTORIES.has(trajectory.trackId)) {
            this.TRAJECTORIES.set(trajectory.trackId, []);
          }
          this.TRAJECTORIES.get(trajectory.trackId).push(trajectory);
        }

        /**
         * 获取所有轨迹数据（用于导出）
         */;
        TrajectoryConfig.getAllTrajectories = function getAllTrajectories() {
          return this.TRAJECTORIES;
        }

        /**
         * 导入轨迹数据（从外部JSON加载）
         */;
        TrajectoryConfig.importTrajectories = function importTrajectories(data) {
          var _this = this;
          this.TRAJECTORIES.clear();
          data.forEach(function (item) {
            _this.TRAJECTORIES.set(item.trackId, item.trajectories);
          });
        }

        /**
         * 清空所有轨迹（调试用）
         */;
        TrajectoryConfig.clearAll = function clearAll() {
          this.TRAJECTORIES.clear();
          this.isLoaded = false;
        }

        /**
         * 从 resources 目录异步加载轨迹数据
         * 路径: resources/trajectories/track_{trackId}.json
         * 
         * @param trackIds 要加载的赛道ID数组，默认加载全部（0-6）
         * @returns Promise<void>
         */;
        TrajectoryConfig.loadTrajectories = /*#__PURE__*/
        function () {
          var _loadTrajectories = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(trackIds) {
            var ids, _iterator, _step, trackId, path, jsonAsset, trajectories;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.isLoaded) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  if (!this.isLoading) {
                    _context.next = 9;
                    break;
                  }
                case 3:
                  if (!this.isLoading) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 6;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 100);
                  });
                case 6:
                  _context.next = 3;
                  break;
                case 8:
                  return _context.abrupt("return");
                case 9:
                  this.isLoading = true;
                  _context.prev = 10;
                  // 默认加载赛道0-6
                  ids = trackIds || [0, 1, 2, 3, 4, 5, 6];
                  _iterator = _createForOfIteratorHelperLoose(ids);
                case 13:
                  if ((_step = _iterator()).done) {
                    _context.next = 28;
                    break;
                  }
                  trackId = _step.value;
                  path = "trajectories/track_" + trackId + "-min";
                  _context.prev = 16;
                  _context.next = 19;
                  return mk_asset$1.get(path, JsonAsset, null);
                case 19:
                  jsonAsset = _context.sent;
                  if (jsonAsset && jsonAsset.json) {
                    trajectories = jsonAsset.json;
                    if (Array.isArray(trajectories) && trajectories.length > 0) {
                      this.TRAJECTORIES.set(trackId, trajectories);
                      console.log("[TrajectoryConfig] \u52A0\u8F7D\u8D5B\u9053 " + trackId + " \u6210\u529F\uFF0C\u8F68\u8FF9\u6570: " + trajectories.length);
                    }
                  }
                  _context.next = 26;
                  break;
                case 23:
                  _context.prev = 23;
                  _context.t0 = _context["catch"](16);
                  console.warn("[TrajectoryConfig] \u8D5B\u9053 " + trackId + " \u8F68\u8FF9\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u5931\u8D25:", _context.t0);
                case 26:
                  _context.next = 13;
                  break;
                case 28:
                  this.isLoaded = true;
                  console.log('[TrajectoryConfig] 轨迹数据加载完成，总赛道数:', this.TRAJECTORIES.size);
                  _context.next = 35;
                  break;
                case 32:
                  _context.prev = 32;
                  _context.t1 = _context["catch"](10);
                  console.error('[TrajectoryConfig] 加载轨迹数据失败:', _context.t1);
                case 35:
                  _context.prev = 35;
                  this.isLoading = false;
                  return _context.finish(35);
                case 38:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[10, 32, 35, 38], [16, 23]]);
          }));
          function loadTrajectories(_x) {
            return _loadTrajectories.apply(this, arguments);
          }
          return loadTrajectories;
        }()
        /**
         * 检查轨迹是否已加载
         */;

        TrajectoryConfig.isTrajectoryLoaded = function isTrajectoryLoaded() {
          return this.isLoaded;
        };
        return TrajectoryConfig;
      }());
      /**
       * 轨迹数据库（运行时缓存）
       * 结构：Map<赛道ID, 轨迹数组>
       */
      TrajectoryConfig.TRAJECTORIES = new Map();
      /**
       * 加载状态
       */
      TrajectoryConfig.isLoading = false;
      TrajectoryConfig.isLoaded = false;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrajectoryPlayer.ts", ['cc', './drongo-cc.mjs', './TrajectoryData.ts'], function (exports) {
  var cclegacy, log, TrajectoryCodec;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      log = module.log;
    }, function (module) {
      TrajectoryCodec = module.TrajectoryCodec;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3fdcaNpwDpKboowcbmI9Xxj", "TrajectoryPlayer", undefined);

      /**
       * 运行时关键帧结构（解压后使用）
       */

      var TrajectoryPlayer = exports('TrajectoryPlayer', /*#__PURE__*/function () {
        function TrajectoryPlayer(ball) {
          this.isPlaying = false;
          this.currentFrame = 0;
          this.trajectoryData = null;
          this.ball = void 0;
          this.onComplete = null;
          this.onEvent = null;
          this.eventIndex = 0;
          this.needDisablePhysics = false;
          // 标志位：是否需要禁用物理引擎
          // 运行时缓存：解压后的关键帧
          this.runtimeKeyframes = [];
          this.ball = ball;
        }

        /**
         * 开始播放轨迹
         * @param trajectoryData 压缩轨迹数据
         * @param onComplete 播放完成回调
         * @param onEvent 事件回调（可选）
         */
        var _proto = TrajectoryPlayer.prototype;
        _proto.play = function play(trajectoryData, onComplete, onEvent) {
          if (this.isPlaying) {
            log('[TrajectoryPlayer] 警告：已在播放中');
            return;
          }
          this.isPlaying = true;
          this.currentFrame = 0;
          this.trajectoryData = trajectoryData;
          this.onComplete = onComplete || null;
          this.onEvent = onEvent || null;
          this.eventIndex = 0;
          this.needDisablePhysics = true; // 标记需要禁用物理引擎

          // ========== 解压差分数据为运行时格式 ==========
          this.decompressKeyframes(trajectoryData);
          log('[TrajectoryPlayer] ========== 开始播放轨迹 ==========');
          log('[TrajectoryPlayer] 赛道ID:', trajectoryData.trackId);
          log('[TrajectoryPlayer] 总帧数:', trajectoryData.totalFrames);
          log('[TrajectoryPlayer] 关键帧数:', this.runtimeKeyframes.length);
        }

        /**
         * 停止播放
         */;
        _proto.stop = function stop() {
          if (!this.isPlaying) {
            return;
          }
          this.isPlaying = false;
          this.currentFrame = 0;
          this.trajectoryData = null;
          this.eventIndex = 0;
          log('[TrajectoryPlayer] 播放已停止');
        }

        /**
         * 每帧更新（播放模式）
         */;
        _proto.update = function update() {
          if (!this.isPlaying || !this.trajectoryData || !this.ball) {
            return;
          }

          // 0. 首次更新时禁用物理引擎（避免在碰撞回调中操作）
          if (this.needDisablePhysics) {
            this.needDisablePhysics = false;
            if (this.ball && this.ball.isValid) {
              this.ball.enabled = false;
              this.ball.enabledContactListener = false;
              log('[TrajectoryPlayer] 已禁用物理引擎');
            }
          }

          // 1. 检查事件
          this.checkEvents();

          // 2. 获取当前帧的插值数据
          var frameData = this.interpolateFrame(this.currentFrame);
          if (!frameData) {
            // 播放完成
            this.completePlayback();
            return;
          }

          // 3. 应用到小球
          this.ball.node.setPosition(frameData.x, frameData.y, 0);
          this.ball.node.setRotationFromEuler(0, 0, frameData.rot);

          // 4. 下一帧
          this.currentFrame++;

          // 每30帧打印一次进度
          if (this.currentFrame % 30 === 0) {
            var progress = (this.currentFrame / this.trajectoryData.totalFrames * 100).toFixed(1);
            log('[TrajectoryPlayer] 播放进度:', progress + '%');
          }
        }

        /**
         * 是否正在播放
         */;
        _proto.isActive = function isActive() {
          return this.isPlaying;
        }

        /**
         * 解压差分数据为运行时绝对值格式
         * 一次性累加还原，避免每帧都计算
         */;
        _proto.decompressKeyframes = function decompressKeyframes(data) {
          this.runtimeKeyframes = [];
          var k = data.keys;
          var count = k.f.length;
          var accF = 0; // 累加帧序号
          var accX = 0; // 累加X坐标
          var accY = 0; // 累加Y坐标
          var accR = 0; // 累加旋转

          for (var i = 0; i < count; i++) {
            accF += k.f[i];
            accX += k.x[i];
            accY += k.y[i];
            accR += k.r[i];
            this.runtimeKeyframes.push({
              f: accF,
              x: accX,
              y: accY,
              r: accR
            });
          }
          log('[TrajectoryPlayer] 解压完成，关键帧数:', count);
        }

        /**
         * 插值计算（使用解压后的运行时数据）
         */;
        _proto.interpolateFrame = function interpolateFrame(frameIndex) {
          if (!this.trajectoryData || this.runtimeKeyframes.length === 0) {
            return null;
          }
          var keyframes = this.runtimeKeyframes;

          // 超出范围
          if (frameIndex >= this.trajectoryData.totalFrames) {
            return null;
          }

          // 查找前后关键帧（使用解压后的运行时数据）
          var prev = null;
          var next = null;
          for (var i = 0; i < keyframes.length; i++) {
            if (keyframes[i].f <= frameIndex) {
              prev = keyframes[i];
            }
            if (keyframes[i].f >= frameIndex && !next) {
              next = keyframes[i];
              break;
            }
          }

          // 命中关键帧（精确匹配）
          if (prev && prev.f === frameIndex) {
            return {
              x: TrajectoryCodec.fromFixed(prev.x),
              y: TrajectoryCodec.fromFixed(prev.y),
              rot: TrajectoryCodec.fromFixed(prev.r)
            };
          }

          // 线性插值
          if (prev && next && prev.f !== next.f) {
            var t = (frameIndex - prev.f) / (next.f - prev.f);
            return {
              x: TrajectoryCodec.fromFixed(this.lerpInt(prev.x, next.x, t)),
              y: TrajectoryCodec.fromFixed(this.lerpInt(prev.y, next.y, t)),
              rot: TrajectoryCodec.fromFixed(this.lerpInt(prev.r, next.r, t))
            };
          }

          // 边界情况：只有一个关键帧或没有下一帧
          if (prev) {
            return {
              x: TrajectoryCodec.fromFixed(prev.x),
              y: TrajectoryCodec.fromFixed(prev.y),
              rot: TrajectoryCodec.fromFixed(prev.r)
            };
          }
          return null;
        }

        /**
         * 整数线性插值
         * （在定点数域内插值，保持精度）
         */;
        _proto.lerpInt = function lerpInt(a, b, t) {
          return Math.round(a + (b - a) * t);
        }

        /**
         * 检查并触发事件
         */;
        _proto.checkEvents = function checkEvents() {
          if (!this.trajectoryData || !this.trajectoryData.events || !this.onEvent) {
            return;
          }
          var events = this.trajectoryData.events;

          // 检查是否有事件在当前帧触发
          while (this.eventIndex < events.length && events[this.eventIndex].frame <= this.currentFrame) {
            var _event = events[this.eventIndex];
            this.onEvent(_event);
            log('[TrajectoryPlayer] 触发事件:', _event.type, '帧:', _event.frame);
            this.eventIndex++;
          }
        }

        /**
         * 完成播放
         */;
        _proto.completePlayback = function completePlayback() {
          log('[TrajectoryPlayer] ========== 播放完成 ==========');

          // 注意：游戏模式下不需要恢复物理引擎
          // 物理引擎始终保持禁用状态

          this.isPlaying = false;
          this.currentFrame = 0;
          this.trajectoryData = null;
          this.eventIndex = 0;

          // 调用完成回调
          if (this.onComplete) {
            this.onComplete();
            this.onComplete = null;
          }
        };
        return TrajectoryPlayer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrajectoryRecorder.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './TrajectoryData.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, log, TrajectoryCodec;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      log = module.log;
    }, function (module) {
      TrajectoryCodec = module.TrajectoryCodec;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ad199E+JfpEar3qyzhDD2ST", "TrajectoryRecorder", undefined);

      /**
       * 原始帧数据（临时存储）
       */

      var TrajectoryRecorder = exports('TrajectoryRecorder', /*#__PURE__*/function () {
        // 固定60FPS

        function TrajectoryRecorder(ball) {
          this.isRecording = false;
          this.rawFrames = [];
          // 原始帧数据
          this.keyframeIndices = new Set();
          // 关键帧索引（碰撞标记）
          this.events = [];
          // 事件记录
          this.frameCount = 0;
          this.startTime = 0;
          this.lastCollisionFrame = -1;
          // 上次碰撞帧（用于去重）
          this.lastCollisionName = '';
          // 上次碰撞对象名
          this.targetTrackId = -1;
          this.recordForce = 0;
          this.recordAngleOffset = 0;
          this.ball = void 0;
          this.fps = 60;
          this.ball = ball;
        }

        /**
         * 开始录制
         * @param force 发射力度
         * @param angleOffset 角度偏移
         * @param targetTrackId 目标赛道ID（可选，录制时可能还不知道）
         */
        var _proto = TrajectoryRecorder.prototype;
        _proto.startRecording = function startRecording(force, angleOffset, targetTrackId) {
          if (angleOffset === void 0) {
            angleOffset = 0;
          }
          if (targetTrackId === void 0) {
            targetTrackId = -1;
          }
          if (this.isRecording) {
            log('[TrajectoryRecorder] 警告：已在录制中，请先停止');
            return;
          }
          this.isRecording = true;
          this.rawFrames = [];
          this.keyframeIndices.clear();
          this.events = [];
          this.frameCount = 0;
          this.startTime = Date.now();
          this.lastCollisionFrame = -1;
          this.lastCollisionName = '';
          this.targetTrackId = targetTrackId;
          this.recordForce = force;
          this.recordAngleOffset = angleOffset;
          log('[TrajectoryRecorder] ========== 开始录制 ==========');
          log('[TrajectoryRecorder] 目标赛道:', targetTrackId === -1 ? '待定（进入奖励区后确定）' : targetTrackId);
          log('[TrajectoryRecorder] 发射力度:', force);
          log('[TrajectoryRecorder] 角度偏移:', angleOffset);
        }

        /**
         * 设置目标赛道ID（在录制过程中确定）
         * @param trackId 赛道ID
         */;
        _proto.setTargetTrackId = function setTargetTrackId(trackId) {
          if (!this.isRecording) {
            log('[TrajectoryRecorder] 警告：未在录制中，无法设置赛道ID');
            return;
          }
          this.targetTrackId = trackId;
          log('[TrajectoryRecorder] ✅ 确定目标赛道:', trackId);
        }

        /**
         * 停止录制并导出压缩数据
         */;
        _proto.stopRecording = function stopRecording() {
          if (!this.isRecording) {
            return null;
          }
          this.isRecording = false;
          var duration = Date.now() - this.startTime;

          // 1. 选择关键帧
          var keyframeIndices = this.selectKeyframes();

          // 2. 编码为列式存储 + 差分格式（极致压缩）
          var fs = [];
          var xs = [];
          var ys = [];
          var rs = [];
          var lastFrame = 0;
          var lastX = 0;
          var lastY = 0;
          var lastRot = 0;
          for (var _iterator = _createForOfIteratorHelperLoose(keyframeIndices), _step; !(_step = _iterator()).done;) {
            var idx = _step.value;
            var raw = this.rawFrames[idx];

            // 转换为定点数
            var currX = TrajectoryCodec.toFixed(raw.x);
            var currY = TrajectoryCodec.toFixed(raw.y);
            var currRot = TrajectoryCodec.toFixed(raw.rot);

            // 存储差值（第一帧存绝对值）
            fs.push(idx - lastFrame); // 帧间隔
            xs.push(currX - lastX); // X差值
            ys.push(currY - lastY); // Y差值
            rs.push(currRot - lastRot); // 旋转差值

            // 更新累加基准
            lastFrame = idx;
            lastX = currX;
            lastY = currY;
            lastRot = currRot;
          }
          var result = {
            trackId: this.targetTrackId,
            totalFrames: this.rawFrames.length,
            fps: this.fps,
            keys: {
              f: fs,
              x: xs,
              y: ys,
              r: rs
            },
            events: this.events.length > 0 ? this.events : undefined,
            // 可选字段（仅调试时需要）
            force: this.recordForce,
            angleOffset: this.recordAngleOffset,
            recordTime: new Date().toISOString()
          };

          // 3. 输出统计信息
          this.logCompressionStats(result, duration);

          // 4. 导出为标准 JSON 格式
          this.exportAsTypeScript(result);

          // 5. 自动添加到配置中（用于立即测试播放）
          log('[TrajectoryRecorder] ✅ 轨迹数据已缓存到内存，可立即测试播放');
          return result;
        }

        /**
         * 取消录制
         */;
        _proto.cancelRecording = function cancelRecording() {
          if (this.isRecording) {
            this.isRecording = false;
            this.rawFrames = [];
            this.keyframeIndices.clear();
            this.events = [];
            log('[TrajectoryRecorder] 录制已取消');
          }
        }

        /**
         * 每帧更新（录制原始数据）
         */;
        _proto.update = function update() {
          if (!this.isRecording || !this.ball) {
            return;
          }

          // 记录原始帧数据
          var position = this.ball.node.position;
          var rotation = this.ball.node.eulerAngles.z;
          var velocity = this.ball.linearVelocity;
          this.rawFrames.push({
            x: position.x,
            y: position.y,
            rot: rotation,
            vx: velocity.x,
            vy: velocity.y
          });
          this.frameCount++;

          // 每30帧打印一次进度
          if (this.frameCount % 30 === 0) {
            log('[TrajectoryRecorder] 录制中...帧数:', this.frameCount);
          }
        }

        /**
         * 标记当前帧为关键帧（碰撞时调用）
         * @param colliderName 碰撞对象名称（可选，用于去重）
         */;
        _proto.markCurrentFrameAsKeyframe = function markCurrentFrameAsKeyframe(colliderName) {
          if (!this.isRecording || this.frameCount === 0) {
            return;
          }
          var currentFrame = this.frameCount - 1; // 标记上一帧（因为碰撞发生在update之后）

          // 碰撞去重：如果与上次碰撞间隔 < 5帧（约0.08秒）且碰撞同一物体，跳过
          if (colliderName) {
            if (currentFrame - this.lastCollisionFrame < 5 && this.lastCollisionName === colliderName) {
              return; // 跳过重复碰撞
            }

            this.lastCollisionFrame = currentFrame;
            this.lastCollisionName = colliderName;
          }
          this.keyframeIndices.add(currentFrame);
          log('[TrajectoryRecorder] 标记关键帧:', currentFrame, colliderName ? "(" + colliderName + ")" : '');
        }

        /**
         * 记录事件
         * @param type 事件类型
         * @param data 事件数据
         */;
        _proto.recordEvent = function recordEvent(type, data) {
          if (this.isRecording) {
            this.events.push({
              frame: this.frameCount - 1,
              type: type,
              data: data
            });
            log('[TrajectoryRecorder] 记录事件:', type, '帧:', this.frameCount - 1);
          }
        }

        /**
         * 是否正在录制
         */;
        _proto.isActive = function isActive() {
          return this.isRecording;
        }

        /**
         * 选择关键帧（平衡优化版）
         * 规则（按优先级）：
         * 1. 碰撞标记的关键帧（必保留）
         * 2. 旋转突变 > 30度（保留细节）
         * 3. 速度突变 > 30%（保留弹跳）
         * 4. 碰撞后5帧（保留碰撞细节）
         * 5. 强制关键帧（每60帧 = 1秒）
         * 6. 插值误差 > 20px
         * 7. 起点和终点（必保留）
         */;
        _proto.selectKeyframes = function selectKeyframes() {
          var _this = this;
          if (this.rawFrames.length === 0) {
            return [];
          }
          var selected = [0]; // 起点必保留
          var collisionFrames = Array.from(this.keyframeIndices); // 碰撞帧列表
          var _loop = function _loop(i) {
              var lastSelected = selected[selected.length - 1];

              // 1. 碰撞标记 - 必须保留
              if (_this.keyframeIndices.has(i)) {
                selected.push(i);
                return 0; // continue
              }

              // 2. 旋转突变检测（细节保护）
              if (_this.hasRotationChange(lastSelected, i)) {
                selected.push(i);
                return 0; // continue
              }

              // 3. 速度突变检测（弹跳保护）
              if (_this.hasVelocityChange(lastSelected, i)) {
                selected.push(i);
                return 0; // continue
              }

              // 4. 碰撞后5帧强制采样（保留碰撞后细节）
              var nearCollision = collisionFrames.some(function (cf) {
                return i > cf && i <= cf + 5;
              });
              if (nearCollision) {
                selected.push(i);
                return 0; // continue
              }

              // 5. 强制关键帧（每1秒）
              if (i - lastSelected >= 60) {
                selected.push(i);
                return 0; // continue
              }

              // 6. 插值误差检测
              if (_this.hasInterpolationError(lastSelected, i)) {
                selected.push(i);
              }
            },
            _ret;
          for (var i = 1; i < this.rawFrames.length - 1; i++) {
            _ret = _loop(i);
            if (_ret === 0) continue;
          }
          selected.push(this.rawFrames.length - 1); // 终点必保留
          return selected;
        }

        /**
         * 检测插值误差（平衡版）
         * 用线性插值预测当前位置，如果误差 > 20px 则保留该帧
         */;
        _proto.hasInterpolationError = function hasInterpolationError(prevIdx, currIdx) {
          // 需要有下一帧才能判断
          if (currIdx >= this.rawFrames.length - 1) {
            return false;
          }
          var prev = this.rawFrames[prevIdx];
          var curr = this.rawFrames[currIdx];
          var next = this.rawFrames[currIdx + 1];

          // 线性插值预测
          var t = (currIdx - prevIdx) / (next.x - prevIdx);
          var predictedX = prev.x + t * (next.x - prev.x);
          var predictedY = prev.y + t * (next.y - prev.y);

          // 计算误差
          var error = Math.sqrt(Math.pow(curr.x - predictedX, 2) + Math.pow(curr.y - predictedY, 2));
          return error > 20; // 误差阈值：20像素（平衡压缩率和精度）
        }

        /**
         * 检测旋转突变（细节保护）
         * 保留旋转变化 > 30度的帧
         */;
        _proto.hasRotationChange = function hasRotationChange(prevIdx, currIdx) {
          var prev = this.rawFrames[prevIdx];
          var curr = this.rawFrames[currIdx];

          // 计算旋转差值（考虑角度循环）
          var rotDiff = Math.abs(curr.rot - prev.rot);
          if (rotDiff > 180) {
            rotDiff = 360 - rotDiff;
          }

          // 旋转变化 > 30度
          return rotDiff > 30;
        }

        /**
         * 检测速度突变（弹跳保护）
         * 保留速度变化 > 30% 或方向突变的帧
         */;
        _proto.hasVelocityChange = function hasVelocityChange(prevIdx, currIdx) {
          var prev = this.rawFrames[prevIdx];
          var curr = this.rawFrames[currIdx];

          // 计算速度
          var prevSpeed = Math.sqrt(prev.vx * prev.vx + prev.vy * prev.vy);
          var currSpeed = Math.sqrt(curr.vx * curr.vx + curr.vy * curr.vy);

          // 速度变化率
          var speedChange = Math.abs(currSpeed - prevSpeed) / (prevSpeed + 0.1);

          // 方向变化（点积）
          var directionDot = (prev.vx * curr.vx + prev.vy * curr.vy) / ((prevSpeed + 0.1) * (currSpeed + 0.1));

          // 速度突变：变化 > 30% 或方向变化明显（点积 < 0.9）
          return speedChange > 0.3 || directionDot < 0.9;
        }

        /**
         * 输出压缩统计信息
         */;
        _proto.logCompressionStats = function logCompressionStats(data, duration) {
          var originalFrames = data.totalFrames;
          var keyframeCount = data.keys.f.length; // 使用新的 keys 结构
          var compressionRatio = ((1 - keyframeCount / originalFrames) * 100).toFixed(1);
          var originalSize = originalFrames * 100; // 估算原始字节（每帧约100字节）
          var compressedSize = keyframeCount * 16; // 压缩后字节（每关键帧4个整数，差分后更小）
          var sizeRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
          log('[TrajectoryRecorder] ========== 录制完成 ==========');
          log('[TrajectoryRecorder] 录制时长:', (duration / 1000).toFixed(2), '秒');
          log('[TrajectoryRecorder] 原始帧数:', originalFrames);
          log('[TrajectoryRecorder] 关键帧数:', keyframeCount);
          log('[TrajectoryRecorder] 帧压缩率:', compressionRatio + '%');
          log('[TrajectoryRecorder] 估算原始大小:', (originalSize / 1024).toFixed(2), 'KB');
          log('[TrajectoryRecorder] 估算压缩大小:', (compressedSize / 1024).toFixed(2), 'KB');
          log('[TrajectoryRecorder] 大小压缩率:', sizeRatio + '%');
          log('[TrajectoryRecorder] 碰撞标记数:', this.keyframeIndices.size);
          log('[TrajectoryRecorder] 事件记录数:', this.events.length);
        }

        /**
         * 导出为标准 JSON 格式（可直接复制到 .json 文件）
         */;
        _proto.exportAsTypeScript = function exportAsTypeScript(data) {
          log('[TrajectoryRecorder] ========== 列式+差分压缩数据（JSON格式）==========');

          // 输出标准 JSON 格式（单个对象放在数组中）
          var jsonData = [data];
          var jsonStr = JSON.stringify(jsonData, null, 2);
          console.log(jsonStr);
          log('[TrajectoryRecorder] ========================================');
          log('[TrajectoryRecorder] 💡 复制上面的 JSON 数据到：');
          log("[TrajectoryRecorder]    resources/trajectories/track_" + data.trackId + ".json");
          log('[TrajectoryRecorder] 📦 新格式：列式存储 + 差分编码');
          log('[TrajectoryRecorder] 🚀 预期体积：8-10KB（比旧格式减少 60-70%）');
        };
        return TrajectoryRecorder;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIUtil.ts", ['cc', './drongo-cc.mjs'], function (exports) {
  var cclegacy, Sprite, Label, Color, log;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      Color = module.Color;
    }, function (module) {
      log = module.log;
    }],
    execute: function () {
      exports({
        setButtonInteractable: setButtonInteractable,
        setButtonsInteractable: setButtonsInteractable
      });
      cclegacy._RF.push({}, "95c1d4t1uFPI5ydANrONcX7", "UIUtil", undefined);

      // 存储按钮的原始颜色，用于恢复
      var originalColors = new WeakMap();

      /**
       * 设置按钮的可交互状态
       * 自动处理灰化效果：
       * - Sprite 组件：使用 grayscale 属性
       * - Label 组件：保存并恢复原始颜色，禁用时设为灰色
       * 
       * @param button 按钮组件
       * @param interactable 是否可交互（true: 可点击, false: 禁用+灰化）
       * @param logEnabled 是否打印日志（默认false）
       * 
       * @example
       * // 禁用按钮并灰化
       * setButtonInteractable(this.PressBtn, false);
       * 
       * // 启用按钮并恢复颜色
       * setButtonInteractable(this.TouBiBtn, true);
       */
      function setButtonInteractable(button, interactable, logEnabled) {
        if (logEnabled === void 0) {
          logEnabled = false;
        }
        if (!button || !button.isValid) {
          return;
        }

        // 设置交互状态
        button.interactable = interactable;
        var hasEffect = false;

        // 1. 处理 Sprite 组件（背景图片等）
        var sprite = button.node.getComponent(Sprite);
        if (sprite) {
          sprite.grayscale = !interactable; // 禁用时灰化，启用时恢复
          hasEffect = true;
        }

        // 2. 处理 Label 组件（文字和描边）
        var label = button.node.getComponentInChildren(Label);
        if (label) {
          if (!interactable) {
            // 禁用时：保存原始颜色并设为灰色
            if (!originalColors.has(label)) {
              originalColors.set(label, {
                label: label.color.clone(),
                outline: label.enableOutline ? label.outlineColor.clone() : null
              });
            }

            // 设置文字为灰色
            label.color = new Color(150, 150, 150, 255);

            // 如果有描边，也设为灰色
            if (label.enableOutline) {
              label.outlineColor = new Color(80, 80, 80, 255);
            }
          } else {
            // 启用时：恢复原始颜色
            var colors = originalColors.get(label);
            if (colors) {
              label.color = colors.label.clone();
              if (label.enableOutline && colors.outline) {
                label.outlineColor = colors.outline.clone();
              }
            }
          }
          hasEffect = true;
        }
        if (logEnabled) {
          if (hasEffect) {
            log('[UIUtil] 按钮', button.node.name, '交互:', interactable, '已应用灰化效果');
          } else {
            log('[UIUtil] ⚠️ 按钮', button.node.name, '没有Sprite或Label组件，无法设置灰化');
          }
        }
      }

      /**
       * 批量设置多个按钮的可交互状态
       * 
       * @param buttons 按钮数组
       * @param interactable 是否可交互
       * @param logEnabled 是否打印日志（默认false）
       * 
       * @example
       * setButtonsInteractable([this.AddScoreBtn, this.ReduceScoreBtn], false);
       */
      function setButtonsInteractable(buttons, interactable, logEnabled) {
        if (logEnabled === void 0) {
          logEnabled = false;
        }
        buttons.forEach(function (button) {
          setButtonInteractable(button, interactable, logEnabled);
        });
      }
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