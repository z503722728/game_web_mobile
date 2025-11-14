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

System.register("chunks:///_virtual/GameBinder.ts", ['cc', './drongo-gui.mjs', './fairygui.mjs', './Game_TestView.ts'], function (exports) {
  var cclegacy, registerBinder, UIObjectFactory, Game_TestView;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      registerBinder = module.registerBinder;
    }, function (module) {
      UIObjectFactory = module.UIObjectFactory;
    }, function (module) {
      Game_TestView = module.default;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "712ef7P9UFHk6bljEa7Hf4F", "GameBinder", undefined);
      var GameBinder = exports('default', registerBinder(_class = /*#__PURE__*/function () {
        function GameBinder() {}
        var _proto = GameBinder.prototype;
        _proto.bindAll = function bindAll() {
          UIObjectFactory.setExtension(Game_TestView.URL, Game_TestView);
        };
        return GameBinder;
      }()) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-cc.mjs', './LaunchConfig.ts', './AutoTester.ts', './BallPhysicsConfig.ts', './drongo-gui.mjs', './Game_TestView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, RigidBody2D, Button, UITransform, Collider2D, Node, Vec3, Input, input, v2, PhysicsSystem2D, Contact2DType, tween, KeyCode, Component, log, LaunchConfig, AutoTester, ballPhysicsConfig, BackgroundAdapter, GUIManager, Game_TestView;
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
      Vec3 = module.Vec3;
      Input = module.Input;
      input = module.input;
      v2 = module.v2;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Contact2DType = module.Contact2DType;
      tween = module.tween;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      log = module.log;
    }, function (module) {
      LaunchConfig = module.LaunchConfig;
    }, function (module) {
      AutoTester = module.AutoTester;
    }, function (module) {
      ballPhysicsConfig = module.ballPhysicsConfig;
    }, function (module) {
      BackgroundAdapter = module.BackgroundAdapter;
      GUIManager = module.GUIManager;
    }, function (module) {
      Game_TestView = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
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
      var GameView = exports('GameView', (_dec = ccclass('GameView'), _dec2 = property(RigidBody2D), _dec3 = property(Button), _dec4 = property(UITransform), _dec5 = property([Collider2D]), _dec6 = property([Collider2D]), _dec7 = property(Node), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
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
          _initializerDefineProperty(_this, "bg", _descriptor6, _assertThisInitialized(_this));
          // test
          _initializerDefineProperty(_this, "ResetGameBtn", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "AutoTestBtn", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "CanshuBtn", _descriptor9, _assertThisInitialized(_this));
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
          // ========== 自动测试系统 ==========
          _this.autoTester = null;
          // 自动测试
          _this.lastHitTrackIndex = -1;
          return _this;
        }
        var _proto = GameView.prototype;
        // 最后命中的赛道索引
        _proto.onLoad = function onLoad() {
          log('[GameView] 初始化弹珠机游戏');
          BackgroundAdapter.adaptBackground(this.bg);

          // ========== 配置物理引擎确定性 ==========
          this.setupPhysicsDeterminism();

          // 应用物理配置（重力）
          this.applyPhysicsConfig();

          // 保存小球的初始物理属性
          this.saveInitialBallPhysics();

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

          // 初始化自动测试器
          this.autoTester = new AutoTester(this, this.Ball, this.JiangLiColliders,
          // 传入奖励碰撞体数组
          this.JiangLiColliders.length);
          if (this.AutoTestBtn) {
            this.autoTester.setButton(this.AutoTestBtn);
          }

          // 注册调试按键（1-7选择赛道）
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          log('[GameView] 初始化完成');
        };
        _proto.onDestroy = function onDestroy() {
          // 清理事件监听
          this.PressBtn.node.off(Input.EventType.TOUCH_START, this.onBtnDown, this);
          this.PressBtn.node.off(Input.EventType.TOUCH_END, this.onBtnUp, this);
          this.PressBtn.node.off(Input.EventType.TOUCH_CANCEL, this.onBtnUp, this);
          if (this.ResetGameBtn) {
            this.ResetGameBtn.node.off(Button.EventType.CLICK, this.onResetBtnClick, this);
          }
          if (this.AutoTestBtn) {
            this.AutoTestBtn.node.off(Button.EventType.CLICK, this.onAutoTestBtnClick, this);
          }
          if (this.CanshuBtn) {
            this.CanshuBtn.node.off(Button.EventType.CLICK, this.onCanshuBtnClick, this);
          }
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        };
        _proto.start = function start() {
          // 每次UI打开时执行的初始化
          this.resetGame();
        };
        _proto.update = function update(deltaTime) {
          // 蓄力累积
          if (this.ballState === BallState.CHARGING) {
            this.chargeValue = Math.min(this.chargeValue + this.chargeSpeed * deltaTime, this.maxChargeValue);
            this.updateXuLiUI();
          }

          // 停止检测
          if (this.ballState === BallState.FLYING) {
            var velocity = this.Ball.linearVelocity;
            var speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

            // 从配置读取停止速度阈值
            var stopThreshold = ballPhysicsConfig.getStopVelocityThreshold();
            if (speed < stopThreshold) {
              log('[GameView] 小球已停止，速度:', speed.toFixed(2));
              this.ballState = BallState.IDLE;
              log('[GameView] 状态切换: FLYING -> IDLE，可以再次发射');

              // 自动测试模式下，检查是否弹回到初始位置（可能被挡板弹回）
              if (this.autoTester && this.autoTester.isActive()) {
                this.checkAndHandleBounceback();
              }
            }
          }
        }

        // ========== 按钮事件处理 ==========
        ;

        _proto.onBtnDown = function onBtnDown() {
          if (this.ballState !== BallState.IDLE) {
            log('[GameView] 当前状态不允许蓄力:', BallState[this.ballState]);
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
          var _this2 = this;
          if (!this.autoTester || !this.autoTester.isActive()) {
            return;
          }

          // 重置游戏状态
          this.autoTester.resetGameForTest();

          // 等待物理引擎稳定后发射
          this.scheduleOnce(function () {
            var testData = _this2.autoTester.getCurrentTestParams();
            if (testData) {
              _this2.launchBallWithParams(testData.params);
            }
          }, 0.3);
        }

        /**
         * 供 AutoTester 调用的同步重置方法
         */;
        _proto.resetGameForAutoTest = function resetGameForAutoTest() {
          log('[GameView] [AutoTest] 重置游戏');

          // 切换状态
          this.ballState = BallState.IDLE;
          this.chargeValue = 0;
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
          var _launchBall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var targetTrackId, preset, customForce, actualForce, minPower, maxPower;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  log('[GameView] 准备发射小球');

                  // 重置碰撞标志
                  this.hasEnteredRewardZone = false;

                  // 判断是调试模式还是自然蓄力模式
                  if (!(this.debugTargetTrack >= 0)) {
                    _context.next = 17;
                    break;
                  }
                  // ========== 调试模式：使用预设配置 ==========
                  log('[GameView] [调试模式] 使用预设配置发射');

                  // 1. 请求服务器结果（模拟）
                  _context.next = 6;
                  return this.requestServerResult();
                case 6:
                  targetTrackId = _context.sent;
                  log('[GameView] 目标赛道:', targetTrackId);

                  // 2. 查表获取发射参数
                  preset = LaunchConfig.getPreset(targetTrackId);
                  if (preset) {
                    _context.next = 14;
                    break;
                  }
                  log('[GameView] 错误：无效的赛道ID:', targetTrackId);
                  this.ballState = BallState.IDLE;
                  this.resetXuLiUI();
                  return _context.abrupt("return");
                case 14:
                  this.launchBallWithParams(preset);
                  _context.next = 20;
                  break;
                case 17:
                  // ========== 自然蓄力模式：使用玩家蓄力值或自定义力度 ==========
                  // 检查是否有自定义力度
                  customForce = ballPhysicsConfig.getCustomLaunchForce();
                  if (customForce >= 0) {
                    // 使用自定义力度
                    actualForce = customForce;
                    log('[GameView] [自定义力度] 使用固定力度发射:', actualForce);
                  } else {
                    // 使用蓄力值计算
                    minPower = ballPhysicsConfig.getMinChargePower();
                    maxPower = ballPhysicsConfig.getMaxChargePower();
                    actualForce = minPower + (maxPower - minPower) * this.chargeValue;
                    log('[GameView] [自然蓄力] 蓄力进度:', (this.chargeValue * 100).toFixed(1) + '%', '实际力度:', actualForce.toFixed(2), '(范围:', minPower, '-', maxPower + ')');
                  }

                  // 使用计算出的力度发射（无角度偏移）
                  this.launchBallWithParams({
                    force: actualForce,
                    angleOffset: 0 // 自然蓄力模式下垂直发射
                  });

                case 20:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function launchBall() {
            return _launchBall.apply(this, arguments);
          }
          return launchBall;
        }();
        _proto.launchBallWithParams = function launchBallWithParams(preset) {
          // ========== 第0步：发射前强制对齐（确保绝对精确）==========
          // 强制设置到初始位置，消除浮点数累积误差
          this.Ball.node.setPosition(this.initialBallPosition);
          this.Ball.node.setRotationFromEuler(this.initialBallRotation);

          // 确保速度为0
          this.Ball.linearVelocity = v2(0, 0);
          this.Ball.angularVelocity = 0;

          // 强制同步场景到物理引擎
          var physicsSystem = PhysicsSystem2D.instance;
          var world = physicsSystem.physicsWorld;
          if (world && world.syncSceneToPhysics) {
            world.syncSceneToPhysics();
          }

          // ========== 发射前状态检查（确定性调试）==========
          log('========== 发射前物理状态 ==========');
          log('  位置:', this.Ball.node.position.x.toFixed(4), this.Ball.node.position.y.toFixed(4));
          log('  旋转:', this.Ball.node.eulerAngles.z.toFixed(4));
          log('  线速度:', this.Ball.linearVelocity.x.toFixed(4), this.Ball.linearVelocity.y.toFixed(4));
          log('  角速度:', this.Ball.angularVelocity.toFixed(4));
          log('  质量:', this.Ball.getMass().toFixed(4));

          // 设置小球弹性（发射后才有弹性，从配置读取）
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            log('  当前弹性:', ballCollider.restitution.toFixed(4));
            log('  当前摩擦:', ballCollider.friction.toFixed(4));
            log('  当前密度:', ballCollider.density.toFixed(4));
            var restitution = ballPhysicsConfig.getRestitution();
            ballCollider.restitution = restitution;
            ballCollider.apply(); // ⚠️ 立即应用，不要延迟！延迟会导致不确定性
            log('[GameView] 设置小球弹性为', restitution);
          }
          log('=====================================');

          // 四舍五入到小数点后2位（保持数值精度一致）
          var force = Math.round(preset.force * 100) / 100;
          var angleOffset = Math.round(preset.angleOffset * 100) / 100;

          // 计算发射冲量（向上为主，带微小角度偏移）
          var angleRad = angleOffset * Math.PI / 180;
          var impulse = v2(force * Math.sin(angleRad), force * Math.cos(angleRad));
          log('[GameView] 应用冲量 - 力度:', force, '角度偏移:', angleOffset, '°');
          log('  冲量向量: X=', impulse.x.toFixed(4), 'Y=', impulse.y.toFixed(4));

          // 应用冲量
          this.Ball.applyLinearImpulseToCenter(impulse, true);

          // 切换状态
          this.ballState = BallState.FLYING;
          this.chargeValue = 0;
          this.resetXuLiUI();
          log('[GameView] 发射完成，状态切换: CHARGING -> FLYING');
        }

        // ========== 服务器交互（模拟） ==========
        ;

        _proto.requestServerResult = /*#__PURE__*/
        function () {
          var _requestServerResult = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var trackId;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 50);
                  });
                case 2:
                  if (!(this.debugTargetTrack >= 0 && this.debugTargetTrack < LaunchConfig.getTrackCount())) {
                    _context2.next = 5;
                    break;
                  }
                  log('[GameView] [调试模式] 使用强制赛道:', this.debugTargetTrack);
                  return _context2.abrupt("return", this.debugTargetTrack);
                case 5:
                  // 否则随机选择赛道
                  trackId = Math.floor(Math.random() * LaunchConfig.getTrackCount());
                  return _context2.abrupt("return", trackId);
                case 7:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function requestServerResult() {
            return _requestServerResult.apply(this, arguments);
          }
          return requestServerResult;
        }() // ========== 碰撞检测 ==========
        ;

        _proto.registerRewardCollisionListeners = function registerRewardCollisionListeners() {
          var _this3 = this;
          // 在每个奖励区域碰撞体上注册监听
          this.JiangLiColliders.forEach(function (collider, index) {
            if (!collider || !collider.isValid) {
              return;
            }
            collider.on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider) {
              _this3.onHitRewardZone(index);
            }, _this3);
          });
          log('[GameView] 奖励区域碰撞监听注册完成，共', this.JiangLiColliders.length, '个');
        };
        _proto.registerAnimaCollisionListeners = function registerAnimaCollisionListeners() {
          var _this4 = this;
          // 在每个动画区域碰撞体上注册监听
          this.AnimaColliders.forEach(function (collider) {
            if (!collider || !collider.isValid) {
              return;
            }
            collider.on(Contact2DType.BEGIN_CONTACT, function (selfCollider, otherCollider) {
              _this4.onHitAnimaZone(collider);
            }, _this4);
          });
          log('[GameView] 动画区域碰撞监听注册完成，共', this.AnimaColliders.length, '个');
        };
        _proto.onHitRewardZone = function onHitRewardZone(trackIndex) {
          // 如果不在飞行状态或已经进入过奖励区域，不处理
          if (this.ballState !== BallState.FLYING || this.hasEnteredRewardZone) {
            return;
          }
          this.hasEnteredRewardZone = true;
          this.lastHitTrackIndex = trackIndex; // 记录命中的赛道
          log('[GameView] 进入奖励区域，赛道索引:', trackIndex);

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

        // ========== 调试功能 ==========
        ;

        _proto.onKeyDown = function onKeyDown(event) {
          var keyCode = event.keyCode;

          // 按键1-7设置目标赛道
          if (keyCode >= KeyCode.DIGIT_1 && keyCode <= KeyCode.DIGIT_7) {
            this.debugTargetTrack = keyCode - KeyCode.DIGIT_1;
            log('[GameView] [调试] 设置目标赛道:', this.debugTargetTrack);
          }
          // 按键0取消强制赛道
          else if (keyCode === KeyCode.DIGIT_0) {
            this.debugTargetTrack = -1;
            log('[GameView] [调试] 取消强制赛道，恢复随机');
          }
        }

        /**
         * 检查并处理小球弹回初始位置的情况
         */;
        _proto.checkAndHandleBounceback = function checkAndHandleBounceback() {
          var _this5 = this;
          var currentPos = this.Ball.node.position;
          var distance = Vec3.distance(currentPos, this.initialBallPosition);

          // 如果距离初始位置很近（50单位内），说明被弹回来了
          var bouncebackThreshold = 50;
          if (distance < bouncebackThreshold) {
            log('[GameView] [警告] 小球弹回初始位置，距离:', distance.toFixed(2), '重新发射');

            // 延迟后重新触发自动测试
            this.scheduleOnce(function () {
              if (_this5.autoTester && _this5.autoTester.isActive()) {
                _this5.autoTester.handleBounceback();
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
          if (!this.Ball) return;

          // ========== 方案1：激进重置（推荐）==========
          // 先禁用再启用，清除物理引擎内部状态
          this.Ball.enabled = false;
          var ballCollider = this.Ball.getComponent(Collider2D);
          if (ballCollider) {
            // 恢复为0，等待下次发射时再设置为0.9
            ballCollider.restitution = 0;
            ballCollider.friction = this.initialBallFriction;

            // 恢复密度（影响质量）
            var density = ballPhysicsConfig.getBallMass();
            ballCollider.density = density;
            ballCollider.apply(); // 立即应用
          }

          this.Ball.linearDamping = this.initialBallLinearDamping;
          this.Ball.angularDamping = this.initialBallAngularDamping;

          // ⚠️ 确保完全停止（确定性关键）
          this.Ball.linearVelocity = v2(0, 0);
          this.Ball.angularVelocity = 0;

          // 重新启用（这会重新初始化物理状态）
          this.Ball.enabled = true;
          log('[GameView] 恢复初始物理属性（完全重置）');
        };
        _proto.resetGame = function resetGame() {
          var _this6 = this;
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
              if (_this6.Ball && _this6.Ball.isValid) {
                // 重置位置和旋转
                _this6.Ball.node.setPosition(_this6.initialBallPosition);
                _this6.Ball.node.setRotationFromEuler(_this6.initialBallRotation);

                // 再次清除速度（确保位置重置后速度为0）
                _this6.Ball.linearVelocity = v2(0, 0);
                _this6.Ball.angularVelocity = 0;

                // 恢复初始物理属性（会禁用再启用 RigidBody）
                _this6.restoreBallPhysics();

                // ========== 最后一步：等待物理引擎同步 ==========
                // 再等待2帧，让物理引擎完全同步新状态
                _this6.scheduleOnce(function () {
                  if (_this6.Ball && _this6.Ball.isValid) {
                    // 最后一次确保速度为0
                    _this6.Ball.linearVelocity = v2(0, 0);
                    _this6.Ball.angularVelocity = 0;
                    log('[GameView] 游戏已重置，物理状态已稳定');
                  }
                }, 0.05); // 等待3帧（约50ms）
              }
            }, 0.05); // 等待3帧（约50ms）
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
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ResetGameBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "AutoTestBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "CanshuBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LaunchConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a6ddaHHTOVJIo0AolhyltnD", "LaunchConfig", undefined); // 发射预设参数接口
      /**
       * 发射参数配置类
       * 每个赛道存储多组参数，发射时随机选择
       */
      var LaunchConfig = exports('LaunchConfig', /*#__PURE__*/function () {
        function LaunchConfig() {}
        /**
         * 获取指定赛道的发射参数（随机从该赛道的多组配置中选择）
         */
        LaunchConfig.getPreset = function getPreset(trackId) {
          if (trackId < 0 || trackId >= this.PRESETS.length) {
            return null;
          }
          var trackPresets = this.PRESETS[trackId];
          if (!trackPresets || trackPresets.length === 0) {
            return null;
          }

          // 随机选择该赛道的一组配置
          var randomIndex = Math.floor(Math.random() * trackPresets.length);
          return trackPresets[randomIndex];
        }

        /**
         * 获取指定赛道的所有配置
         */;
        LaunchConfig.getTrackPresets = function getTrackPresets(trackId) {
          if (trackId < 0 || trackId >= this.PRESETS.length) {
            return [];
          }
          return [].concat(this.PRESETS[trackId]);
        }

        /**
         * 获取所有配置
         */;
        LaunchConfig.getAllPresets = function getAllPresets() {
          return this.PRESETS.map(function (track) {
            return [].concat(track);
          });
        }

        /**
         * 获取赛道总数
         */;
        LaunchConfig.getTrackCount = function getTrackCount() {
          return this.PRESETS.length;
        }

        /**
         * 获取指定赛道的配置数量
         */;
        LaunchConfig.getTrackPresetCount = function getTrackPresetCount(trackId) {
          if (trackId < 0 || trackId >= this.PRESETS.length) {
            return 0;
          }
          return this.PRESETS[trackId].length;
        }

        /**
         * 更新配置（用于自动测试系统导入新配置）
         * 注意：这只是运行时更新，需要手动复制到代码中才能永久保存
         */;
        LaunchConfig.updatePresets = function updatePresets(newPresets) {
          var _this$PRESETS;
          this.PRESETS.length = 0;
          (_this$PRESETS = this.PRESETS).push.apply(_this$PRESETS, newPresets);
        };
        return LaunchConfig;
      }());
      // ========== 自动测试生成的配置 ==========
      // 测试统计: 总测试 51 次, 成功 44 次, 成功率 86.3%
      // 生成时间: 2025-11-13 16:18:32
      // 每个赛道配置数: 10 组
      // 使用时会从每个赛道的配置中随机选择一组
      LaunchConfig.PRESETS = [
      // 赛道0 - 8组配置
      [{
        force: 502.36,
        angleOffset: -2.45
      }, {
        force: 511.68,
        angleOffset: 9.72
      }, {
        force: 580.57,
        angleOffset: -2.00
      }, {
        force: 522.08,
        angleOffset: -9.15
      }, {
        force: 534.40,
        angleOffset: 2.05
      }, {
        force: 505.51,
        angleOffset: 3.64
      }, {
        force: 542.82,
        angleOffset: -7.21
      }, {
        force: 443.42,
        angleOffset: 1.66
      }],
      // 赛道1 - 10组配置
      [{
        force: 543.31,
        angleOffset: 8.80
      }, {
        force: 577.43,
        angleOffset: 5.24
      }, {
        force: 461.99,
        angleOffset: -1.62
      }, {
        force: 424.04,
        angleOffset: -1.13
      }, {
        force: 593.74,
        angleOffset: -3.23
      }, {
        force: 511.74,
        angleOffset: -3.65
      }, {
        force: 535.67,
        angleOffset: -5.83
      }, {
        force: 478.24,
        angleOffset: 9.61
      }, {
        force: 539.22,
        angleOffset: -3.30
      }, {
        force: 519.76,
        angleOffset: 5.47
      }],
      // 赛道2 - 9组配置
      [{
        force: 555.26,
        angleOffset: -0.17
      }, {
        force: 478.91,
        angleOffset: 6.43
      }, {
        force: 403.90,
        angleOffset: 9.85
      }, {
        force: 520.74,
        angleOffset: -5.29
      }, {
        force: 565.63,
        angleOffset: -4.60
      }, {
        force: 466.17,
        angleOffset: 6.77
      }, {
        force: 554.71,
        angleOffset: 0.03
      }, {
        force: 516.25,
        angleOffset: -2.46
      }, {
        force: 404.36,
        angleOffset: 2.26
      }],
      // 赛道3 - 8组配置
      [{
        force: 494.32,
        angleOffset: 9.31
      }, {
        force: 455.36,
        angleOffset: 2.45
      }, {
        force: 527.93,
        angleOffset: -9.68
      }, {
        force: 486.41,
        angleOffset: -6.07
      }, {
        force: 493.31,
        angleOffset: -6.12
      }, {
        force: 406.67,
        angleOffset: 5.50
      }, {
        force: 407.11,
        angleOffset: -3.34
      }, {
        force: 426.69,
        angleOffset: -2.93
      }],
      // 赛道4 - 5组配置
      [{
        force: 496.52,
        angleOffset: -6.00
      }, {
        force: 473.97,
        angleOffset: -6.59
      }, {
        force: 465.09,
        angleOffset: 9.81
      }, {
        force: 598.20,
        angleOffset: -0.90
      }, {
        force: 543.77,
        angleOffset: 0.74
      }],
      // 赛道5 - 3组配置
      [{
        force: 545.49,
        angleOffset: -3.16
      }, {
        force: 469.68,
        angleOffset: -4.11
      }, {
        force: 476.27,
        angleOffset: 2.01
      }],
      // 赛道6 - 1组配置
      [{
        force: 179.92,
        angleOffset: 0
      }]];
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CommonExport.ts', './ConfigBase.ts', './AutoTester.ts', './BallPhysicsConfig.ts', './GameView.ts', './LaunchConfig.ts', './ConfigMgr.ts', './PoolMgr.ts', './StartView.ts', './GameBinder.ts', './CenteredWindow.ts', './Game_TestView.ts', './Game_TestView_Logic.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null],
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

System.register("chunks:///_virtual/StartView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drongo-gui.mjs', './CommonExport.ts', './fairygui.mjs', './drongo-cc.mjs'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, ProgressBar, Node, color, director, view, tween, Component, AudioUtil, AllBinder, BackgroundAdapter, GUIManager, UIConfig, registerFont, GRoot, log;
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
      view = module.view;
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
          director.addPersistRootNode(this.node);
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

                  // ==================== 阶段1: 加载UI包 (0% - 50%) ====================
                  log("开始加载UI包...");
                  _context.next = 6;
                  return GUIManager.loadPackage("Game", function (finish, total) {
                    var packageProgress = finish / total;
                    // UI包占总进度的 0-50%
                    var targetProgress = packageProgress * 0.5;
                    _this2.updateProgress(targetProgress, "加载UI资源");
                  });
                case 6:
                  log("UI包加载完成！");

                  // ==================== 阶段2: 预加载Game场景 (50% - 100%) ====================
                  log("开始预加载Game场景...");
                  _context.next = 10;
                  return new Promise(function (resolve, reject) {
                    director.preloadScene("game",
                    // 进度回调
                    function (completedCount, totalCount) {
                      var sceneProgress = completedCount / totalCount;
                      // 场景加载占总进度的 50-100%
                      var targetProgress = 0.5 + sceneProgress * 0.5;
                      _this2.updateProgress(targetProgress, "加载游戏场景");
                      // log(`场景加载进度: ${(sceneProgress * 100).toFixed(1)}%`);
                    },
                    // 完成回调
                    function (error) {
                      if (error) {
                        console.error("场景预加载失败:", error);
                        reject(error);
                      } else {
                        log("场景预加载完成！");
                        resolve();
                      }
                    });
                  });
                case 10:
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
                  _context.next = 21;
                  break;
                case 16:
                  _context.prev = 16;
                  _context.t0 = _context["catch"](1);
                  console.error("资源加载失败:", _context.t0);
                  // 即使预加载失败，也尝试直接切换场景
                  log("预加载失败，尝试直接切换场景...");
                  this.scheduleOnce(function () {
                    director.loadScene("game");
                  }, 1.0);
                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 16]]);
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