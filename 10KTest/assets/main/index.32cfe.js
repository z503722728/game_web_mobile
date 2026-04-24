System.register("chunks:///_virtual/Agent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Maths.ts'], function (exports) {
  var _createClass, cclegacy, Vec3, Vector2, RVOMath, Line;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
    }, function (module) {
      Vector2 = module.Vector2;
      RVOMath = module.RVOMath;
      Line = module.Line;
    }],
    execute: function () {
      cclegacy._RF.push({}, "27880uNZi9CTLwDzDTO1CDR", "Agent", undefined);
      var ObserverObj = exports('ObserverObj', function ObserverObj(val) {
        this.value = void 0;
        if (val) this.value = val;
      });
      var KeyValuePair = exports('KeyValuePair', function KeyValuePair(key, value) {
        this.Key = void 0;
        this.Value = void 0;
        this.Key = key;
        this.Value = value;
      });
      var RVOConfig = exports('RVOConfig', function RVOConfig() {});
      /**代理对象总数 */
      RVOConfig.agentCount = 10;
      /**代理对象之间的距离 */
      RVOConfig.neighborDist = 0.75;
      //25;
      /**代理对象的半径 */
      RVOConfig.radius = 0.5;
      //10;
      /**代理对象的最大移动速度 */
      RVOConfig.maxSpeed = 1;
      /**代理对象的初始速度 */
      RVOConfig.velocity = new Vec3();
      /**最大邻居数 */
      RVOConfig.maxNeighbors = 10;
      /**安全单位时间，值越大，就会越早做出避让行为 */
      RVOConfig.timeHorizon = 5;
      //25;
      /**与timeHorizon类似，只针对障碍物 */
      RVOConfig.timeHorizonObst = 0;
      /**步骤帧 */
      RVOConfig.timeStep = 0.05;
      var Agent = exports('Agent', /*#__PURE__*/function () {
        function Agent() {}
        var _proto = Agent.prototype;
        _proto.check = function check(a, b) {
          var invTimeHorizon = 1.0 / RVOConfig.timeHorizon;
          var relativePosition = Vector2.subtract(b.getCenter(), a.getCenter());
          var relativeVelocity = Vector2.subtract(a.newVelocity, b.newVelocity);
          var combinedRadius = a.neighborDist + b.neighborDist;
          var combinedRadiusSq = RVOMath.sqr(combinedRadius);
          var distSq = RVOMath.absSq(relativePosition);
          var u = new Vector2();
          var direction = new Vector2();
          if (distSq > combinedRadiusSq) {
            var w = Vector2.subtract(relativeVelocity, Vector2.multiply2(invTimeHorizon, relativePosition));
            var wLengthSq = RVOMath.absSq(w);
            var dotProduct1 = Vector2.multiply(w, relativePosition);
            if (dotProduct1 < 0 && RVOMath.sqr(dotProduct1) > combinedRadiusSq * wLengthSq) {
              var wLength = RVOMath.sqrt(wLengthSq);
              var unitW = Vector2.division(w, wLength);
              direction = new Vector2(unitW.y, -unitW.x);
              u = Vector2.multiply2(combinedRadius * invTimeHorizon - wLength, unitW);
            } else {
              var leg = RVOMath.sqrt(distSq - combinedRadiusSq);
              if (RVOMath.det(relativePosition, w) > 0) {
                direction = Vector2.division(new Vector2(relativePosition.x * leg - relativePosition.y * combinedRadius, relativePosition.x * combinedRadius + relativePosition.y * leg), distSq);
              } else {
                direction = Vector2.division(new Vector2(relativePosition.x * leg + relativePosition.y * combinedRadius, -relativePosition.x * combinedRadius + relativePosition.y * leg), -distSq);
              }
              var dotProduct2 = Vector2.multiply(relativeVelocity, direction);
              u = Vector2.subtract(Vector2.multiply2(dotProduct2, direction), relativeVelocity);
            }
          } else {
            var invTimeStep = 1.0 / RVOConfig.timeStep;
            var _w = Vector2.subtract(relativeVelocity, Vector2.multiply2(invTimeStep, relativePosition));
            var _wLength = RVOMath.abs(_w);
            var _unitW = Vector2.division(_w, _wLength);
            direction = new Vector2(_unitW.y, -_unitW.x);
            u = Vector2.multiply2(combinedRadius * invTimeStep - _wLength, _unitW);
          }
          var lineA = new Line();
          var weight = a.weight / (a.weight + b.weight); //0.5
          lineA.direction = new Vector2(direction.x, direction.y);
          lineA.point = Vector2.addition(a.newVelocity, Vector2.multiply2(weight, u));
          a.orcaLines.push(lineA);
        };
        _proto.process = function process(bodys) {
          for (var i = 0, j = bodys.length; i < j; i++) {
            var body = bodys[i];
            if (body.isAgent && body.orcaLines.length > 0) {
              if (!body.isRemove && body.object) {
                var numObstLines = 0; //默认0wh
                var tempVelocity_ = new ObserverObj(new Vector2(body.newVelocity.x, body.newVelocity.y));
                var lineFail = this.linearProgram2(body.orcaLines, body.maxVelocity, body.prefVelocity, false, tempVelocity_);
                if (lineFail < body.orcaLines.length) {
                  this.linearProgram3(body.orcaLines, body.weight, numObstLines, lineFail, body.maxVelocity, tempVelocity_);
                }
                if (body.object) {
                  //更新物体速度
                  var value = tempVelocity_.value;
                  var v = body.object.velocity;
                  v.x = value.x;
                  v.y = value.y;
                  v.z = 0;
                }
              }
              body.orcaLines.length = 0;
            }
          }
        };
        _proto.linearProgram1 = function linearProgram1(lines, lineNo, radius, optVelocity, directionOpt, result) {
          var dotProduct = Vector2.multiply(lines[lineNo].point, lines[lineNo].direction);
          var discriminant = RVOMath.sqr(dotProduct) + RVOMath.sqr(radius) - RVOMath.absSq(lines[lineNo].point);
          if (discriminant < 0) {
            return false;
          }
          var sqrtDiscriminant = RVOMath.sqrt(discriminant);
          var tLeft = -dotProduct - sqrtDiscriminant;
          var tRight = -dotProduct + sqrtDiscriminant;
          for (var i = 0; i < lineNo; ++i) {
            var denominator = RVOMath.det(lines[lineNo].direction, lines[i].direction);
            var numerator = RVOMath.det(lines[i].direction, Vector2.subtract(lines[lineNo].point, lines[i].point));
            if (RVOMath.fabs(denominator) <= RVOMath.RVO_EPSILON) {
              if (numerator < 0) {
                return false;
              }
              continue;
            }
            var t = numerator / denominator;
            if (denominator > 0) {
              tRight = Math.min(tRight, t);
            } else {
              tLeft = Math.max(tLeft, t);
            }
            if (tLeft > tRight) {
              return false;
            }
          }
          if (directionOpt) {
            if (Vector2.multiply(optVelocity, lines[lineNo].direction) > 0) {
              result.value = Vector2.addition(lines[lineNo].point, Vector2.multiply2(tRight, lines[lineNo].direction));
            } else {
              result.value = Vector2.addition(lines[lineNo].point, Vector2.multiply2(tLeft, lines[lineNo].direction));
            }
          } else {
            var _t = Vector2.multiply(lines[lineNo].direction, Vector2.subtract(optVelocity, lines[lineNo].point));
            if (_t < tLeft) {
              result.value = Vector2.addition(lines[lineNo].point, Vector2.multiply2(tLeft, lines[lineNo].direction));
            } else if (_t > tRight) {
              result.value = Vector2.addition(lines[lineNo].point, Vector2.multiply2(tRight, lines[lineNo].direction));
            } else {
              result.value = Vector2.addition(lines[lineNo].point, Vector2.multiply2(_t, lines[lineNo].direction));
            }
          }
          return true;
        };
        _proto.linearProgram2 = function linearProgram2(lines, radius, optVelocity, directionOpt, result) {
          if (directionOpt) {
            result.value = Vector2.multiply2(radius, optVelocity);
          } else if (RVOMath.absSq(optVelocity) > RVOMath.sqr(radius)) {
            result.value = Vector2.multiply2(radius, RVOMath.normalize(optVelocity));
          } else {
            result.value = optVelocity;
          }
          for (var i = 0; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, Vector2.subtract(lines[i].point, result.value)) > 0) {
              var tempResult = new Vector2(result.value.x, result.value.y);
              if (!this.linearProgram1(lines, i, radius, optVelocity, directionOpt, result)) {
                result.value = tempResult;
                return i;
              }
            }
          }
          return lines.length;
        };
        _proto.linearProgram3 = function linearProgram3(lines, agentWeight, numObstLines, beginLine, radius, result) {
          var distance = 0;
          for (var i = beginLine; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, Vector2.subtract(lines[i].point, result.value)) > distance) {
              var projLines = [];
              for (var ii = 0; ii < numObstLines; ++ii) {
                projLines[projLines.length] = lines[ii];
              }
              for (var j = numObstLines; j < i; ++j) {
                var line = new Line();
                var determinant = RVOMath.det(lines[i].direction, lines[j].direction);
                if (RVOMath.fabs(determinant) <= RVOMath.RVO_EPSILON) {
                  if (Vector2.multiply(lines[i].direction, lines[j].direction) > 0.0) {
                    continue;
                  } else {
                    line.point = Vector2.multiply2(agentWeight /*0.5 =*/, Vector2.addition(lines[i].point, lines[j].point));
                  }
                } else {
                  line.point = Vector2.addition(lines[i].point, Vector2.multiply2(RVOMath.det(lines[j].direction, Vector2.subtract(lines[i].point, lines[j].point)) / determinant, lines[i].direction));
                }

                // line.direction = RVOMath.normalize(Vector2.subtract(lines[j].direction, lines[i].direction));
                // projLines[projLines.length] = line;

                var d = Vector2.subtract(lines[j].direction, lines[i].direction);
                if (RVOMath.absSq(d) > 0) {
                  line.direction = RVOMath.normalize(d);
                  projLines[projLines.length] = line;
                }
              }
              var tempResult = new Vector2(result.value.x, result.value.y);
              if (this.linearProgram2(projLines, radius, new Vector2(-lines[i].direction.y, lines[i].direction.x), true, result) < projLines.length) {
                result.value = tempResult;
              }
              distance = RVOMath.det(lines[i].direction, Vector2.subtract(lines[i].point, result.value));
            }
          }
        };
        _createClass(Agent, null, [{
          key: "inst",
          get: function get() {
            if (this._inst == null) {
              this._inst = new Agent();
            }
            return this._inst;
          }
        }]);
        return Agent;
      }());
      Agent._inst = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AILib.ts", ['cc'], function (exports) {
  var cclegacy, Vec3, Quat, Vec2;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      exports({
        sphereAABBDistance: sphereAABBDistance,
        sphereOBBDistance: sphereOBBDistance
      });
      cclegacy._RF.push({}, "e200arLWgRK2aEVd3mb65un", "AILib", undefined);
      var localP = {
        x: 0,
        y: 0,
        z: 0
      };
      var maxDist = {
        x: 0,
        y: 0,
        z: 0
      };
      var localCenter = {
        x: 0,
        y: 0,
        z: 0
      };
      var obbToLocal = {
        x: 0,
        y: 0,
        z: 0,
        w: 1.0
      };

      // 计算球体到 AABB 的 SDF 距离
      function sphereAABBDistance(center, radius, size) {
        // 计算离包围盒最近的点
        maxDist.x = Math.max(-size.x, Math.min(center.x, size.x));
        maxDist.y = Math.max(-size.y, Math.min(center.y, size.y));
        maxDist.z = Math.max(-size.z, Math.min(center.z, size.z));
        Vec3.subtract(maxDist, maxDist, center);
        var distSqr = Vec3.dot(maxDist, maxDist);
        return distSqr <= radius * radius;
      }

      // 计算球体到 OBB 的 SDF 距离
      function sphereOBBDistance(sphereCenter,
      // 球体中心点坐标
      radius,
      // 球体半径
      obbCenter,
      // OBB 中心点坐标
      obbQuaternion,
      // OBB 旋转四元数
      obbHalfExtents) {
        Vec3.subtract(localCenter, sphereCenter, obbCenter);
        Quat.conjugate(obbToLocal, obbQuaternion);
        Vec3.transformQuat(localP, localCenter, obbToLocal);
        return sphereAABBDistance(localP, radius, obbHalfExtents);
      }
      var obbIntersect = exports('obbIntersect', function obbIntersect(centerA, halfA, rotA, centerB, halfB, rotB) {
        var ae0 = halfA.x,
          ae1 = halfA.y,
          ae2 = halfA.z,
          au00 = rotA.m00,
          au01 = rotA.m01,
          au02 = rotA.m02,
          au10 = rotA.m03,
          au11 = rotA.m04,
          au12 = rotA.m05,
          au20 = rotA.m06,
          au21 = rotA.m07,
          au22 = rotA.m08;
        var be0 = halfB.x,
          be1 = halfB.y,
          be2 = halfB.z,
          bu00 = rotB.m00,
          bu01 = rotB.m01,
          bu02 = rotB.m02,
          bu10 = rotB.m03,
          bu11 = rotB.m04,
          bu12 = rotB.m05,
          bu20 = rotB.m06,
          bu21 = rotB.m07,
          bu22 = rotB.m08;
        var R00 = au00 * bu00 + au01 * bu01 + au02 * bu02;
        var R01 = au00 * bu10 + au01 * bu11 + au02 * bu12;
        var R02 = au00 * bu20 + au01 * bu21 + au02 * bu22;
        var R10 = au10 * bu00 + au11 * bu01 + au12 * bu02;
        var R11 = au10 * bu10 + au11 * bu11 + au12 * bu12;
        var R12 = au10 * bu20 + au11 * bu21 + au12 * bu22;
        var R20 = au20 * bu00 + au21 * bu01 + au22 * bu02;
        var R21 = au20 * bu10 + au21 * bu11 + au22 * bu12;
        var R22 = au20 * bu20 + au21 * bu21 + au22 * bu22;
        var v0 = centerB.x - centerA.x,
          v1 = centerB.y - centerA.y,
          v2 = centerB.z - centerA.z;
        var t0 = v0 * au00 + v1 * au01 + v2 * au02;
        var t1 = v0 * au10 + v1 * au11 + v2 * au12;
        var t2 = v0 * au20 + v1 * au21 + v2 * au22;
        var ra, rb, abs;
        var epsilon = Number.EPSILON;
        var A00 = (R00 >= 0 ? R00 : -R00) + epsilon,
          A01 = (R01 >= 0 ? R01 : -R01) + epsilon,
          A02 = (R02 >= 0 ? R02 : -R02) + epsilon;
        var A10 = (R10 >= 0 ? R10 : -R10) + epsilon,
          A11 = (R11 >= 0 ? R11 : -R11) + epsilon,
          A12 = (R12 >= 0 ? R12 : -R12) + epsilon;
        var A20 = (R20 >= 0 ? R20 : -R20) + epsilon,
          A21 = (R21 >= 0 ? R21 : -R21) + epsilon,
          A22 = (R22 >= 0 ? R22 : -R22) + epsilon;
        ra = ae0;
        rb = be0 * A00 + be1 * A01 + be2 * A02;
        if ((t0 >= 0 ? t0 : -t0) > ra + rb) return false;
        ra = ae1;
        rb = be0 * A10 + be1 * A11 + be2 * A12;
        if ((t1 >= 0 ? t1 : -t1) > ra + rb) return false;
        ra = ae2;
        rb = be0 * A20 + be1 * A21 + be2 * A22;
        if ((t2 >= 0 ? t2 : -t2) > ra + rb) return false;
        rb = be0;
        ra = ae0 * A00 + ae1 * A10 + ae2 * A20;
        abs = t0 * R00 + t1 * R10 + t2 * R20;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;
        rb = be1;
        ra = ae0 * A01 + ae1 * A11 + ae2 * A21;
        abs = t0 * R01 + t1 * R11 + t2 * R21;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;
        rb = be2;
        ra = ae0 * A02 + ae1 * A12 + ae2 * A22;
        abs = t0 * R02 + t1 * R12 + t2 * R22;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A0 x B0
        ra = ae1 * A20 + ae2 * A10;
        rb = be1 * A02 + be2 * A01;
        abs = t2 * R10 - t1 * R20;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A0 x B1
        ra = ae1 * A21 + ae2 * A11;
        rb = be0 * A02 + be2 * A00;
        abs = t2 * R11 - t1 * R21;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A0 x B2
        ra = ae1 * A22 + ae2 * A12;
        rb = be0 * A01 + be1 * A00;
        abs = t2 * R12 - t1 * R22;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A1 x B0
        ra = ae0 * A20 + ae2 * A00;
        rb = be1 * A12 + be2 * A11;
        abs = t0 * R20 - t2 * R00;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A1 x B1
        ra = ae0 * A21 + ae2 * A01;
        rb = be0 * A12 + be2 * A10;
        abs = t0 * R21 - t2 * R01;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A1 x B2
        ra = ae0 * A22 + ae2 * A02;
        rb = be0 * A11 + be1 * A10;
        abs = t0 * R22 - t2 * R02;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A2 x B0

        ra = ae0 * A10 + ae1 * A00;
        rb = be1 * A22 + be2 * A21;
        abs = t1 * R00 - t0 * R10;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A2 x B1
        ra = ae0 * A11 + ae1 * A01;
        rb = be0 * A22 + be2 * A20;
        abs = t1 * R01 - t0 * R11;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

        // test axis L = A2 x B2
        ra = ae0 * A12 + ae1 * A02;
        rb = be0 * A21 + be1 * A20;
        abs = t1 * R02 - t0 * R12;
        if ((abs >= 0 ? abs : -abs) > ra + rb) return false;
        return true;
      });

      /**
       * @en Test line and line
       * @zh 测试线段与线段是否相交
       */
      function lineLine(a1, a2, b1, b2) {
        // jshint camelcase:false

        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
        if (u_b !== 0) {
          var ua = ua_t / u_b;
          var ub = ub_t / u_b;
          if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return true;
          }
        }
        return false;
      }
      var tempR1 = new Vec2();
      var tempR2 = new Vec2();
      var tempR3 = new Vec2();
      var tempR4 = new Vec2();

      /**
       * @en Test line and rect
       * @zh 测试线段与矩形是否相交
       */
      function lineRect(a1, a2, b) {
        var r0 = tempR1.set(b.x, b.y);
        var r1 = tempR2.set(b.x, b.yMax);
        var r2 = tempR3.set(b.xMax, b.yMax);
        var r3 = tempR4.set(b.xMax, b.y);
        if (lineLine(a1, a2, r0, r1)) return true;
        if (lineLine(a1, a2, r1, r2)) return true;
        if (lineLine(a1, a2, r2, r3)) return true;
        if (lineLine(a1, a2, r3, r0)) return true;
        return false;
      }

      /**
       * @en Test line and polygon
       * @zh 测试线段与多边形是否相交
       */
      function linePolygon(a1, a2, b) {
        var length = b.length;
        for (var i = 0; i < length; ++i) {
          var b1 = b[i];
          var b2 = b[(i + 1) % length];
          if (lineLine(a1, a2, b1, b2)) return true;
        }
        return false;
      }

      /**
       * @en Test rect and rect
       * @zh 测试矩形与矩形是否相交
       */
      function rectRect(a, b) {
        // jshint camelcase:false

        var a_min_x = a.x;
        var a_min_y = a.y;
        var a_max_x = a.x + a.width;
        var a_max_y = a.y + a.height;
        var b_min_x = b.x;
        var b_min_y = b.y;
        var b_max_x = b.x + b.width;
        var b_max_y = b.y + b.height;
        return a_min_x <= b_max_x && a_max_x >= b_min_x && a_min_y <= b_max_y && a_max_y >= b_min_y;
      }

      /**
       * @en Test rect and polygon
       * @zh 测试矩形与多边形是否相交
       */
      function rectPolygon(a, b) {
        var r0 = tempR1.set(a.x, a.y);
        var r1 = tempR2.set(a.x, a.yMax);
        var r2 = tempR3.set(a.xMax, a.yMax);
        var r3 = tempR4.set(a.xMax, a.y);

        // intersection check
        if (linePolygon(r0, r1, b)) return true;
        if (linePolygon(r1, r2, b)) return true;
        if (linePolygon(r2, r3, b)) return true;
        if (linePolygon(r3, r0, b)) return true;

        // check if a contains b
        for (var i = 0, l = b.length; i < l; ++i) {
          if (a.contains(b[i])) return true;
        }

        // check if b contains a
        if (pointInPolygon(r0, b)) return true;
        if (pointInPolygon(r1, b)) return true;
        if (pointInPolygon(r2, b)) return true;
        if (pointInPolygon(r3, b)) return true;
        return false;
      }

      /**
       * @en Test polygon and polygon
       * @zh 测试多边形与多边形是否相交
       */
      function polygonPolygon(a, b) {
        var i;
        var l;

        // check if a intersects b
        for (i = 0, l = a.length; i < l; ++i) {
          var a1 = a[i];
          var a2 = a[(i + 1) % l];
          if (linePolygon(a1, a2, b)) return true;
        }

        // check if a contains b
        for (i = 0, l = b.length; i < l; ++i) {
          if (pointInPolygon(b[i], a)) return true;
        }

        // check if b contains a
        for (i = 0, l = a.length; i < l; ++i) {
          if (pointInPolygon(a[i], b)) return true;
        }
        return false;
      }

      /**
       * @en Test circle and circle
       * @zh 测试圆形与圆形是否相交
       */
      function circleCircle(c1p, c1r, c2p, c2r) {
        var distance = Vec2.distance(c1p, c2p);
        return distance < c1r + c2r;
      }

      /**
       * @en Test polygon and circle
       * @zh 测试多边形与圆形是否相交
       */
      function polygonCircle(polygon, cp, cr) {
        var position = cp;
        if (pointInPolygon(position, polygon)) {
          return true;
        }
        for (var i = 0, l = polygon.length; i < l; i++) {
          var start = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1];
          var end = polygon[i];
          if (pointLineDistance(position, start, end, true) < cr) {
            return true;
          }
        }
        return false;
      }

      /**
       * @en Test rect and circle
       * @zh 测试矩形与圆形是否相交
       */
      function rectCircle(rect, cp, cr) {
        var cx = cp.x;
        var cy = cp.y;
        var rx = rect.x;
        var ry = rect.y;
        var rw = rect.width;
        var rh = rect.height;

        // temporary variables to set edges for testing
        var testX = cx;
        var testY = cy;

        // which edge is closest?
        if (cx < rx) testX = rx; // test left edge
        else if (cx > rx + rw) testX = rx + rw; // right edge
        if (cy < ry) testY = ry; // top edge
        else if (cy > ry + rh) testY = ry + rh; // bottom edge

        // get distance from closest edges
        var distX = cx - testX;
        var distY = cy - testY;
        var distance = Math.sqrt(distX * distX + distY * distY);

        // if the distance is less than the radius, collision!
        if (distance <= cr) {
          return true;
        }
        return false;
      }

      /**
       * @en Test whether the point is in the polygon
       * @zh 测试一个点是否在一个多边形中
       */
      function pointInPolygon(point, polygon) {
        var inside = false;
        var x = point.x;
        var y = point.y;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = polygon.length;
        for (var i = 0, j = length - 1; i < length; j = i++) {
          var xi = polygon[i].x;
          var yi = polygon[i].y;
          var xj = polygon[j].x;
          var yj = polygon[j].y;
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      }

      /**
       * @en Calculate the distance of point to line.
       * @zh 计算点到直线的距离。如果这是一条线段并且垂足不在线段内，则会计算点到线段端点的距离。
       */
      function pointLineDistance(point, start, end, isSegment) {
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var d = dx * dx + dy * dy;
        var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
        var p;
        if (!isSegment) {
          p = tempR1.set(start.x + t * dx, start.y + t * dy);
        } else if (d) {
          if (t < 0) p = start;else if (t > 1) p = end;else p = tempR1.set(start.x + t * dx, start.y + t * dy);
        } else {
          p = start;
        }
        dx = point.x - p.x;
        dy = point.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
      }

      /**
       * @en Intersection2D helper class
       * @zh 辅助类，用于测试形状与形状是否相交
       * @class Intersection2D
       */
      var Intersection2D = exports('default', function Intersection2D() {});
      Intersection2D.lineLine = lineLine;
      Intersection2D.lineRect = lineRect;
      Intersection2D.linePolygon = linePolygon;
      Intersection2D.rectRect = rectRect;
      Intersection2D.rectPolygon = rectPolygon;
      Intersection2D.rectCircle = rectCircle;
      Intersection2D.polygonPolygon = polygonPolygon;
      Intersection2D.circleCircle = circleCircle;
      Intersection2D.polygonCircle = polygonCircle;
      Intersection2D.pointInPolygon = pointInPolygon;
      Intersection2D.pointLineDistance = pointLineDistance;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BatchRenderer2D.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, CCFloat, Material, MeshRenderer, utils, Node, Component, Config;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      CCFloat = module.CCFloat;
      Material = module.Material;
      MeshRenderer = module.MeshRenderer;
      utils = module.utils;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Config = module.Config;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _dec6, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _class6;
      cclegacy._RF.push({}, "677f2td+uNEoZb56VXvzvlX", "BatchRenderer2D", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 默认 UV（无贴图时占位），顺序对应 position：左下→右下→右上→左上
      var DEFAULT_UV = [0, 1, 1, 1, 1, 0, 0, 0];

      /** 每个 SpriteFrame 的配置：贴图 + 独立缩放 */
      var FrameConfig = exports('FrameConfig', (_dec = ccclass('FrameConfig'), _dec2 = property(SpriteFrame), _dec3 = property({
        type: CCFloat,
        min: 0.01,
        step: 0.01
      }), _dec(_class = (_class2 = function FrameConfig() {
        _initializerDefineProperty(this, "frame", _descriptor, this);
        /** 渲染与碰撞的统一缩放（相对于 SpriteFrame.originalSize） */
        _initializerDefineProperty(this, "scale", _descriptor2, this);
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scale", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class));

      /**
       * 单 Node + 动态 Mesh 渲染器。
       *
       * 贴图支持：
       *   1. 把需要的 SpriteFrame 拖入 frames 数组（需来自同一张 texture）
       *   2. 调用 getFrameUV(index) 获取 uv，赋给 PhysBody.uv
       *   3. 渲染器自动用 frames[0] 的 texture 作为材质贴图
       *
       * Debug 模式：
       *   勾选 debugCollider，会用第二个 MeshRenderer（LINE_LIST）画出每个物体的碰撞框。
       *   拖入 debugMaterial（使用 batchUnlit.effect，颜色设红色即可）。
       */
      var BatchRenderer2D = exports('BatchRenderer2D', (_dec4 = ccclass('BatchRenderer2D'), _dec5 = property({
        type: [FrameConfig]
      }), _dec6 = property(Material), _dec4(_class4 = (_class5 = (_class6 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BatchRenderer2D, _Component);
        function BatchRenderer2D() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.maxCount = Config.maxNum;
          _initializerDefineProperty(_this, "frames", _descriptor3, _assertThisInitialized(_this));
          /** 开启碰撞框可视化 */
          _initializerDefineProperty(_this, "debugCollider", _descriptor4, _assertThisInitialized(_this));
          /** debug 线框材质（batchUnlit.effect，建议红色）*/
          _initializerDefineProperty(_this, "debugMaterial", _descriptor5, _assertThisInitialized(_this));
          // ── 主渲染 ──────────────────────────────────────────────
          _this.renderer = null;
          _this.mesh = null;
          _this.posBuf = null;
          _this.colorBuf = null;
          _this.uvBuf = null;
          _this.idxBuf = null;
          _this.lastCount = 0;
          // 上一帧渲染数量，用于清理多余顶点
          // ── Debug 线框渲染 ───────────────────────────────────────
          _this.debugRenderer = null;
          _this.debugMesh = null;
          // 每个碰撞框：4 条边，每条边 4 顶点（细长四边形）= 16 顶点，24 索引
          _this.dbgPosBuf = null;
          _this.dbgColorBuf = null;
          _this.dbgIdxBuf = null;
          _this.dbgLastCount = 0;
          return _this;
        }
        var _proto = BatchRenderer2D.prototype;
        // 线框宽度
        _proto.onLoad = function onLoad() {
          var _this$frames$,
            _this2 = this;
          var max = this.maxCount;

          // ── 主 buffer ──────────────────────────────────────
          this.posBuf = new Float32Array(max * 4 * 3);
          this.colorBuf = new Float32Array(max * 4 * 4);
          this.uvBuf = new Float32Array(max * 4 * 2);
          this.idxBuf = new Uint16Array(max * 6);
          for (var i = 0; i < max; i++) {
            var vi = i * 4,
              ii = i * 6;
            this.idxBuf[ii + 0] = vi;
            this.idxBuf[ii + 1] = vi + 1;
            this.idxBuf[ii + 2] = vi + 2;
            this.idxBuf[ii + 3] = vi;
            this.idxBuf[ii + 4] = vi + 2;
            this.idxBuf[ii + 5] = vi + 3;
          }
          this.mesh = this._buildMesh();
          this.renderer = this.node.getComponent(MeshRenderer);
          if (!this.renderer) this.renderer = this.node.addComponent(MeshRenderer);
          this.renderer.mesh = this.mesh;
          if (this.frames.length > 0 && (_this$frames$ = this.frames[0]) != null && _this$frames$.frame) {
            var tex = this.frames[0].frame.texture;
            var mat = this.renderer.getMaterial(0);
            if (mat && tex) mat.setProperty('mainTexture', tex);
          }

          // ── Debug 线框 ────────────────────────────────────
          if (this.debugCollider) {
            this._initDebug(max);
          }
          this.scheduleOnce(function () {
            var _this2$debugRenderer;
            if (_this2.renderer.model) _this2.renderer.model['_worldBounds'] = null;
            if ((_this2$debugRenderer = _this2.debugRenderer) != null && _this2$debugRenderer.model) _this2.debugRenderer.model['_worldBounds'] = null;
          }, 0);
        };
        _proto.getFrameUV = function getFrameUV(index) {
          var cfg = this.frames[index];
          return cfg != null && cfg.frame ? cfg.frame.uv : null;
        }

        /**
         * 返回第 index 个 FrameConfig 的实际渲染/碰撞尺寸（originalSize × scale）。
         * 用于 demo2dBatch.addObjects() 计算 shape 大小和 PhysBody.scale。
         */;
        _proto.getFrameSize = function getFrameSize(index) {
          var cfg = this.frames[index];
          if (!(cfg != null && cfg.frame)) return null;
          return {
            w: cfg.frame.originalSize.width * cfg.scale,
            h: cfg.frame.originalSize.height * cfg.scale
          };
        };
        _proto.flush = function flush(bodies, count) {
          if (!this.mesh) return;
          if (count === 0) {
            this._upload(0);
            if (this.debugCollider && this.debugMesh) this._uploadDebug(bodies, 0);
            return;
          }
          var posBuf = this.posBuf;
          var colorBuf = this.colorBuf;
          var uvBuf = this.uvBuf;
          for (var i = 0; i < count; i++) {
            var _b$body, _b$body2, _b$uv;
            var b = bodies[i];
            var px = b.position.x;
            var py = b.position.y;
            var sx = b.shape.size.x * 0.5 * b.scale.x;
            var sy = b.shape.size.y * 0.5 * b.scale.y;
            var pi = i * 4 * 3;
            var m = (_b$body = b.body) == null ? void 0 : _b$body.rotMat3;
            if (m && !((_b$body2 = b.body) != null && _b$body2.isIdentity)) {
              var lx0 = -sx,
                ly0 = -sy;
              var lx1 = sx,
                ly1 = -sy;
              var lx2 = sx,
                ly2 = sy;
              var lx3 = -sx,
                ly3 = sy;
              posBuf[pi + 0] = lx0 * m.m00 + ly0 * m.m03 + px;
              posBuf[pi + 1] = lx0 * m.m01 + ly0 * m.m04 + py;
              posBuf[pi + 2] = 0;
              posBuf[pi + 3] = lx1 * m.m00 + ly1 * m.m03 + px;
              posBuf[pi + 4] = lx1 * m.m01 + ly1 * m.m04 + py;
              posBuf[pi + 5] = 0;
              posBuf[pi + 6] = lx2 * m.m00 + ly2 * m.m03 + px;
              posBuf[pi + 7] = lx2 * m.m01 + ly2 * m.m04 + py;
              posBuf[pi + 8] = 0;
              posBuf[pi + 9] = lx3 * m.m00 + ly3 * m.m03 + px;
              posBuf[pi + 10] = lx3 * m.m01 + ly3 * m.m04 + py;
              posBuf[pi + 11] = 0;
            } else {
              posBuf[pi + 0] = px - sx;
              posBuf[pi + 1] = py - sy;
              posBuf[pi + 2] = 0;
              posBuf[pi + 3] = px + sx;
              posBuf[pi + 4] = py - sy;
              posBuf[pi + 5] = 0;
              posBuf[pi + 6] = px + sx;
              posBuf[pi + 7] = py + sy;
              posBuf[pi + 8] = 0;
              posBuf[pi + 9] = px - sx;
              posBuf[pi + 10] = py + sy;
              posBuf[pi + 11] = 0;
            }
            var ui = i * 4 * 2;
            var uv = (_b$uv = b.uv) != null ? _b$uv : DEFAULT_UV;
            uvBuf[ui + 0] = uv[0];
            uvBuf[ui + 1] = uv[1];
            uvBuf[ui + 2] = uv[2];
            uvBuf[ui + 3] = uv[3];
            uvBuf[ui + 4] = uv[6];
            uvBuf[ui + 5] = uv[7];
            uvBuf[ui + 6] = uv[4];
            uvBuf[ui + 7] = uv[5];
            var ci = i * 4 * 4;
            var r = b.isHit ? 0 : 1;
            var g = 1;
            var bl = b.isHit ? 0 : 1;
            b.isHit = false;
            for (var v = 0; v < 4; v++) {
              colorBuf[ci + v * 4 + 0] = r;
              colorBuf[ci + v * 4 + 1] = g;
              colorBuf[ci + v * 4 + 2] = bl;
              colorBuf[ci + v * 4 + 3] = 1;
            }
          }
          this._upload(count);
          if (this.debugCollider && this.debugMesh) {
            this._uploadDebug(bodies, count);
          }
        }

        // ─── 私有：主 Mesh ──────────────────────────────────────
        ;

        _proto._buildMesh = function _buildMesh() {
          var max = this.maxCount;
          var initGeo = {
            positions: this.posBuf,
            colors: this.colorBuf,
            uvs: this.uvBuf,
            indices16: this.idxBuf
          };
          var options = {
            maxSubMeshes: 1,
            maxSubMeshVertices: max * 4,
            maxSubMeshIndices: max * 6
          };
          return utils.MeshUtils.createDynamicMesh(0, initGeo, undefined, options);
        };
        _proto._upload = function _upload(count) {
          // updateSubMesh 不会缩减 GPU 端绘制数量，必须手动处理
          if (count === 0) {
            // 完全没有物体时直接禁用渲染器，彻底跳过渲染
            this.renderer.enabled = false;
            this.lastCount = 0;
            return;
          }
          this.renderer.enabled = true;

          // 数量减少时，把多余物体的顶点位置归零，并扩大提交范围覆盖归零区域
          var uploadCount = Math.max(count, this.lastCount);
          if (count < this.lastCount) {
            this.posBuf.fill(0, count * 4 * 3, this.lastCount * 4 * 3);
          }
          this.lastCount = count;
          var vertCount = uploadCount * 4;
          var dynGeo = {
            positions: this.posBuf.subarray(0, vertCount * 3),
            colors: this.colorBuf.subarray(0, vertCount * 4),
            uvs: this.uvBuf.subarray(0, vertCount * 2),
            indices16: this.idxBuf.subarray(0, uploadCount * 6)
          };
          this.mesh.updateSubMesh(0, dynGeo);
        }

        // ─── 私有：Debug 线框 ───────────────────────────────────
        ;

        _proto._initDebug = function _initDebug(max) {
          // 每个碰撞框 4 条边，每条边是细长四边形（4 顶点，2 三角形）
          // 总计：16 顶点，24 索引
          var verts = max * 16;
          var idxs = max * 24;
          this.dbgPosBuf = new Float32Array(verts * 3);
          this.dbgColorBuf = new Float32Array(verts * 4);
          // 颜色固定红色
          for (var i = 0; i < verts; i++) {
            this.dbgColorBuf[i * 4 + 0] = 1;
            this.dbgColorBuf[i * 4 + 3] = 1;
          }

          // 索引：每条边 4 顶点（v0,v1,v2,v3），两个三角形 v0,v1,v2 和 v0,v2,v3
          this.dbgIdxBuf = new Uint16Array(idxs);
          for (var _i = 0; _i < max * 4; _i++) {
            // max * 4 条边
            var vi = _i * 4,
              ii = _i * 6;
            this.dbgIdxBuf[ii + 0] = vi;
            this.dbgIdxBuf[ii + 1] = vi + 1;
            this.dbgIdxBuf[ii + 2] = vi + 2;
            this.dbgIdxBuf[ii + 3] = vi;
            this.dbgIdxBuf[ii + 4] = vi + 2;
            this.dbgIdxBuf[ii + 5] = vi + 3;
          }
          var initGeo = {
            positions: this.dbgPosBuf,
            colors: this.dbgColorBuf,
            indices16: this.dbgIdxBuf
          };
          var options = {
            maxSubMeshes: 1,
            maxSubMeshVertices: verts,
            maxSubMeshIndices: idxs
          };
          this.debugMesh = utils.MeshUtils.createDynamicMesh(0, initGeo, undefined, options);
          var dbgNode = new Node('DebugCollider');
          this.node.addChild(dbgNode);
          this.debugRenderer = dbgNode.addComponent(MeshRenderer);
          this.debugRenderer.mesh = this.debugMesh;
          if (this.debugMaterial) {
            this.debugRenderer.setMaterial(this.debugMaterial, 0);
          }
        };
        _proto._uploadDebug = function _uploadDebug(bodies, count) {
          var buf = this.dbgPosBuf;
          var w = BatchRenderer2D.DBG_LINE_W * 0.5;
          if (count === 0) {
            this.debugRenderer.enabled = false;
            this.dbgLastCount = 0;
            return;
          }
          this.debugRenderer.enabled = true;
          for (var i = 0; i < count; i++) {
            var _b$body3;
            var b = bodies[i];
            var aabb = (_b$body3 = b.body) == null ? void 0 : _b$body3.aabb;
            var x0 = void 0,
              y0 = void 0,
              x1 = void 0,
              y1 = void 0;
            if (aabb) {
              x0 = aabb[0];
              y0 = aabb[1];
              x1 = aabb[3];
              y1 = aabb[4];
            } else {
              var px = b.position.x,
                py = b.position.y;
              var sx = b.shape.size.x * 0.5,
                sy = b.shape.size.y * 0.5;
              x0 = px - sx;
              y0 = py - sy;
              x1 = px + sx;
              y1 = py + sy;
            }

            // 每个框 4 条边，每条边写 4 个顶点（细长四边形），z=1 确保在渲染层上方
            var base = i * 16 * 3;

            // 边0：底边 (x0,y0)→(x1,y0)，向上偏移 w
            this._writeLine(buf, base + 0, x0, y0, x1, y0, 0, w);
            // 边1：右边 (x1,y0)→(x1,y1)，向左偏移 w
            this._writeLine(buf, base + 12, x1, y0, x1, y1, -w, 0);
            // 边2：顶边 (x1,y1)→(x0,y1)，向下偏移 w
            this._writeLine(buf, base + 24, x1, y1, x0, y1, 0, -w);
            // 边3：左边 (x0,y1)→(x0,y0)，向右偏移 w
            this._writeLine(buf, base + 36, x0, y1, x0, y0, w, 0);
          }
          var dbgUploadCount = Math.max(count, this.dbgLastCount);
          if (count < this.dbgLastCount) {
            this.dbgPosBuf.fill(0, count * 16 * 3, this.dbgLastCount * 16 * 3);
          }
          this.dbgLastCount = count;
          var dynGeo = {
            positions: buf.subarray(0, dbgUploadCount * 16 * 3),
            colors: this.dbgColorBuf.subarray(0, dbgUploadCount * 16 * 4),
            indices16: this.dbgIdxBuf.subarray(0, dbgUploadCount * 24)
          };
          this.debugMesh.updateSubMesh(0, dynGeo);
        }

        /**
         * 把一条从 (ax,ay)→(bx,by) 的线段写成细长四边形（4 顶点），写入 buf[offset] 起始
         * nx,ny 是垂直方向的偏移（线宽的一半）
         */;
        _proto._writeLine = function _writeLine(buf, offset, ax, ay, bx, by, nx, ny) {
          // v0: 起点 - 偏移
          buf[offset + 0] = ax - nx;
          buf[offset + 1] = ay - ny;
          buf[offset + 2] = 1;
          // v1: 起点 + 偏移
          buf[offset + 3] = ax + nx;
          buf[offset + 4] = ay + ny;
          buf[offset + 5] = 1;
          // v2: 终点 + 偏移
          buf[offset + 6] = bx + nx;
          buf[offset + 7] = by + ny;
          buf[offset + 8] = 1;
          // v3: 终点 - 偏移
          buf[offset + 9] = bx - nx;
          buf[offset + 10] = by - ny;
          buf[offset + 11] = 1;
        };
        return BatchRenderer2D;
      }(Component), _class6.DBG_LINE_W = 1.5, _class6), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "frames", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "debugCollider", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "debugMaterial", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class5)) || _class4));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Body.ts", ['cc', './Object.ts'], function (exports) {
  var cclegacy, Quat, Vec2, Vec3, Mat3, Dirty;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      Mat3 = module.Mat3;
    }, function (module) {
      Dirty = module.Dirty;
    }],
    execute: function () {
      cclegacy._RF.push({}, "35d5eaYM9dJwrqPskERJ5FA", "Body", undefined);
      var cBody = exports('cBody', /*#__PURE__*/function () {
        function cBody(obj) {
          this.id = 0;
          this.fid = -1;
          this.mask = 0;
          this.group = 0;
          this.shape = null;
          this.object = null;
          this.weight = 0;
          //脏区更新标记
          this.isDirty = 1 | 2 | 4;
          //缓存
          this.lower = 0;
          this.upper = 0;
          this.aabb = [0, 0, 0, 0, 0, 0];
          //状态
          this.isRemove = false;
          this.isRetrieve = true;
          this.isIdentity = true;
          this.inCollider = false;
          //缓存
          this.raidus = 0;
          this.points = [];
          this.center = new Vec3();
          this.rotMat3 = new Mat3();
          this.halfSize = new Vec3();
          this.scale = new Vec3(1, 1, 1);
          //Agent
          this.isAgent = false;
          //Agent 开关
          this.maxNeighbors = 0;
          this.neighborDist = 0;
          //物体半径
          this.maxVelocity = 0;
          //最大速度
          this.newVelocity = new Vec3();
          this.prefVelocity = new Vec3();
          this.orcaLines = [];
          this.object = obj;
        }
        var _proto = cBody.prototype;
        _proto.updateBound = function updateBound(isDirty) {
          if (isDirty === void 0) {
            isDirty = Dirty.NON;
          }
          var object = this.object;
          isDirty |= object.hasChangeDirty();
          if (this.isAgent) {
            this.newVelocity.set(object.velocity); //当前速度
            this.prefVelocity.set(object.tryVelocity); //期望速度

            //强制跟随，在Agent没碰撞情况下，保证全速跟随
            object.velocity.set(object.tryVelocity);
          }
          if (isDirty > 0) {
            var aabbChange = false;
            var shape = this.shape;
            if (isDirty & Dirty.S) {
              aabbChange = true;
              var s = this.getScale();
              this.scale.x = s.x >= 0 ? s.x : -s.x;
              this.scale.y = s.y >= 0 ? s.y : -s.y;
              this.scale.z = s.z >= 0 ? s.z : -s.z;
            }
            if (isDirty & Dirty.R) {
              //旋转更新aabb
              this.isIdentity = false;
              var rot = this.getRotation();
              this.rotMat3.fromQuat(rot); //计算缓存Mat3

              if (rot.equals(Quat.IDENTITY, 0.0001)) {
                this.isIdentity = true;
              }
              aabbChange = true;
            }
            if (aabbChange) shape.updateAABB(this.getScale(), this.getRotMat3(), this.isIdentity);
            var AABB = this.aabb; // world aabb
            var aabb = shape.aabb; //local aabb
            var p = this.getPosition(); //world postion

            AABB[0] = aabb[0] + p.x;
            AABB[1] = aabb[1] + p.y;
            AABB[2] = aabb[2] + p.z;
            AABB[3] = aabb[3] + p.x;
            AABB[4] = aabb[4] + p.y;
            AABB[5] = aabb[5] + p.z;
            this.isDirty = 1 | 2 | 4 | 8; //设置脏区标记

            return true;
          }
          return false;
        };
        _proto.clear = function clear() {
          this.shape = null;
          this.object = null;
          this.isRemove = false;
          this.inCollider = false;
          this.orcaLines.length = 0;
        }

        //body 坐标统一使用世界数据进行计算
        ;

        _proto.getRotMat3 = function getRotMat3() {
          return this.rotMat3;
        } //world rotate mat3
        ;

        _proto.getScale = function getScale() {
          return this.object.getScale();
        } // world scale
        ;

        _proto.getPosition = function getPosition() {
          return this.object.getPosition();
        } //world position
        ;

        _proto.getRotation = function getRotation() {
          return this.object.getRotation();
        } //world rotation
        ;

        _proto.getCenter = function getCenter() {
          if (this.isDirty & 1) {
            this.isDirty &= ~1;
            var aabb = this.aabb;
            var center = this.center;
            center.x = (aabb[0] + aabb[3]) * 0.5;
            center.y = (aabb[1] + aabb[4]) * 0.5;
            center.z = (aabb[2] + aabb[5]) * 0.5;
          }
          return this.center; //world center
        };

        _proto.getRaidus = function getRaidus() {
          if (this.isDirty & 2) {
            this.isDirty &= ~2;
            var scale = this.scale;
            var raidus = this.shape.radius;
            this.raidus = Math.max(scale.x, scale.y, scale.z) * raidus;
          }
          return this.raidus; //world raidus
        };

        _proto.getHalfSize = function getHalfSize() {
          if (this.isDirty & 4) {
            this.isDirty &= ~4;
            var scale = this.scale;
            var size = this.shape.size;
            var halfSize = this.halfSize;
            halfSize.x = scale.x * size.x * 0.5;
            halfSize.y = scale.y * size.y * 0.5;
            halfSize.z = scale.z * size.z * 0.5;
          }
          return this.halfSize; //world halfsize
        };

        _proto.getPoints = function getPoints() {
          if (this.isDirty & 8) {
            this.isDirty &= ~8;
            var scale = this.scale;
            var m = this.getRotMat3();
            var center = this.getCenter();
            var points = this.points;
            var sp = this.shape.point2Ds;
            var length = sp.length;
            for (var i = 0; i < length; i++) {
              var x = sp[i].x * scale.x;
              var y = sp[i].y * scale.y;
              var z = 0;
              if (points[i] == undefined) {
                points[i] = new Vec2();
              }
              points[i].x = x * m.m00 + y * m.m03 + z * m.m06 + center.x;
              points[i].y = x * m.m01 + y * m.m04 + z * m.m07 + center.y;
              // out.z = x * m.m02 + y * m.m05 + z * m.m08;
            }

            points.length = length;
          }
          return this.points; //world points
        };

        return cBody;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bullet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, instantiate, Trigger, cObject;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      instantiate = module.instantiate;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "10c41wzOQZNApJbN8KIuhYr", "bullet", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Bullet = exports('Bullet', (_dec = ccclass('Bullet'), _dec(_class = (_class2 = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Bullet, _cObject);
        function Bullet() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          //生命周期，回收时间
          _this.lifeTime = 0;
          return _this;
        }
        Bullet.get = function get(prefab) {
          var bullet = this.pools.pop();
          if (!bullet) {
            var node = instantiate(prefab);
            bullet = node.getComponent(Bullet);
          }
          return bullet;
        };
        Bullet.put = function put(bullet) {
          //压入缓存池管理节点
          this.pools.push(bullet);
          //移除node不回收body
          bullet.remove(false);
        };
        var _proto = Bullet.prototype;
        //attack: number = 0;
        _proto.update = function update(dt) {
          this.lifeTime -= dt;
          if (this.lifeTime < 0) {
            //生命周期回收
            Bullet.put(this);
            return;
          }

          //计算新位置
          var pos = this.getPosition();
          var velocity = this.velocity;
          tempPos.x = pos.x + velocity.x * dt;
          tempPos.y = pos.y + velocity.y * dt;
          tempPos.z = pos.z + velocity.z * dt;
          this.setPosition(tempPos);
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          //击中回收子弹
          Bullet.put(this);

          //播放爆炸特效
          //.........
        };

        return Bullet;
      }(cObject), _class2.pools = [], _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bulletHell.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collider.ts', './Joystick.ts', './bullet.ts', './ghost.ts', './player.ts', './snailTail.ts', './skill.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, Quat, Prefab, Node, CCInteger, instantiate, Sprite, Vec2, Component, cCollider, Joystick, Bullet, Ghost, Player, SnailTail, Skill;
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
      Prefab = module.Prefab;
      Node = module.Node;
      CCInteger = module.CCInteger;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      cCollider = module.cCollider;
    }, function (module) {
      Joystick = module.Joystick;
    }, function (module) {
      Bullet = module.Bullet;
    }, function (module) {
      Ghost = module.Ghost;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      SnailTail = module.SnailTail;
    }, function (module) {
      Skill = module.Skill;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3;
      cclegacy._RF.push({}, "14305yAyJ1MjZu4r7sFo1Ka", "bulletHell", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var BulletHell = exports('BulletHell', (_dec = ccclass('BulletHell'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Joystick), _dec9 = property({
        type: CCInteger,
        group: "Enemy Config"
      }), _dec10 = property({
        group: "Enemy Config"
      }), _dec11 = property({
        group: "Enemy Config"
      }), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BulletHell, _Component);
        function BulletHell() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "ghost", _descriptor, _assertThisInitialized(_this));
          //敌人
          _initializerDefineProperty(_this, "snailTail", _descriptor2, _assertThisInitialized(_this));
          //敌人
          _initializerDefineProperty(_this, "player", _descriptor3, _assertThisInitialized(_this));
          //主角
          _initializerDefineProperty(_this, "objects", _descriptor4, _assertThisInitialized(_this));
          //enemy 显示挂载点
          _initializerDefineProperty(_this, "bullets", _descriptor5, _assertThisInitialized(_this));
          //bullet 显示挂载点
          _initializerDefineProperty(_this, "camera", _descriptor6, _assertThisInitialized(_this));
          //跟随相机
          _initializerDefineProperty(_this, "joystick", _descriptor7, _assertThisInitialized(_this));
          //主角摇杆
          //简单模拟在周期时间内，以主角为中心的半径内产生敌人
          _initializerDefineProperty(_this, "max", _descriptor8, _assertThisInitialized(_this));
          //多敌人同屏数
          _initializerDefineProperty(_this, "raidus", _descriptor9, _assertThisInitialized(_this));
          //刷怪最大半径 
          _initializerDefineProperty(_this, "cyclTime", _descriptor10, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = BulletHell.prototype;
        _proto.onLoad = function onLoad() {
          BulletHell._inst = this;
        };
        _proto.onDestroy = function onDestroy() {
          cCollider.inst.clear();
          Ghost.pools.length = 0;
          Skill.pools.length = 0;
          Bullet.pools.length = 0;
          SnailTail.pools.length = 0;
        };
        _proto.start = function start() {
          var _this2 = this;
          //创建主角直接挂在场景下
          var node = instantiate(this.player);
          this.node.addChild(node);
          var phi2 = 1.3247179572447458;
          var a1 = 1.0 / (phi2 * phi2);
          var a2 = 1.0 / phi2;

          //定时刷怪
          var i = 1;
          this.schedule(function () {
            if (_this2.objects.children.length < _this2.max) {
              var x = (0.5 + a2 * i) % 1;
              var y = (0.5 + a1 * i) % 1;
              var center = Player.inst.getPosition();
              x = (x - 0.5) * _this2.raidus + center.x;
              y = (y - 0.5) * _this2.raidus + center.y;
              _this2.createEnemy(x, y);
              i++;
            }
          }, this.cyclTime);
        };
        _proto.createEnemy = function createEnemy(x, y) {
          var enemy = null;

          //随机产生两种
          if (Math.random() > 0.5) enemy = Ghost.get(this.ghost);else enemy = SnailTail.get(this.snailTail);
          enemy.insert(this.objects);
          tempPos.set(x, y, 0);
          enemy.setPosition(tempPos);
          enemy.init(); //初始化
        };

        _proto.update = function update(dt) {
          //运行碰撞检测
          cCollider.inst.update(dt);
        };
        _proto.lateUpdate = function lateUpdate(dt) {
          //相机跟随
          var position = Player.inst.getPosition();
          Vec3.lerp(tempPos, this.camera.position, position, 0.25);
          this.camera.position = tempPos;

          //背景跟随
          var bg = this.node.getChildByName("bg");
          var sprite = bg.getComponent(Sprite);
          var material = sprite.getSharedMaterial(0);
          var uvOffset = new Vec2(position.x / 512.0, -position.y / 512.0);
          material.setProperty("tilingOffset", uvOffset);
          bg.position = position;
        };
        _createClass(BulletHell, null, [{
          key: "inst",
          get: function get() {
            return this._inst;
          }
        }]);
        return BulletHell;
      }(Component), _class3._inst = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ghost", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "snailTail", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "objects", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bullets", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "joystick", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "raidus", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2000;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cyclTime", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.03;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Camera3D.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Quat, Vec2, Camera, toRadian, Vec3, input, Input, clamp, Component;
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
      Quat = module.Quat;
      Vec2 = module.Vec2;
      Camera = module.Camera;
      toRadian = module.toRadian;
      Vec3 = module.Vec3;
      input = module.input;
      Input = module.Input;
      clamp = module.clamp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "449d7ylCR5NjpZiA2yOF6Nk", "Camera3D", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Camera3D = exports('Camera3D', (_dec = ccclass('Camera3D'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Camera3D, _Component);
        function Camera3D() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "distance", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vertical", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "horizontal", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "target", _descriptor4, _assertThisInitialized(_this));
          _this.camera = null;
          _this.rot = new Quat();
          _this.curXY = new Vec2();
          _this.curScale = 1;
          _this.touchCount = 0;
          _this.touchs = [{
            id: -1,
            pre: new Vec2(),
            cur: new Vec2()
          }, {
            id: -1,
            pre: new Vec2(),
            cur: new Vec2()
          }];
          _this.rotTemp = new Quat();
          return _this;
        }
        var _proto = Camera3D.prototype;
        _proto.start = function start() {
          this.camera = this.getComponentInChildren(Camera);
          this.curXY.set(toRadian(this.horizontal), -toRadian(this.vertical));
          if (this.camera) {
            this.camera.node.position = new Vec3(0, 0, this.distance);
          }
        };
        _proto.onEnable = function onEnable() {
          input.on(Input.EventType.MOUSE_WHEEL, this.onMouseScale, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.onDisable = function onDisable() {
          input.off(Input.EventType.MOUSE_WHEEL, this.onMouseScale, this);
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.updateRotate = function updateRotate() {
          var node = this.node;
          var rotation = this.rot;
          this.curXY.y = clamp(this.curXY.y, toRadian(-60), toRadian(30));
          Quat.rotateY(rotation, Quat.IDENTITY, -this.curXY.x);
          Quat.rotateX(rotation, rotation, this.curXY.y);
          Quat.slerp(rotation, node.rotation, rotation, 0.25);
          node.rotation = rotation;
          if (this.target) {
            var rotate = this.target.rotation;
            node.position.lerp(this.target.position, 0.25);
            Quat.fromAxisAngle(this.rotTemp, Vec3.UNIT_Y, -this.curXY.x);
            this.target.rotation = rotate.lerp(this.rotTemp, 0.25);
          }
        };
        _proto.onMouseScale = function onMouseScale(event) {
          var scale = event.getScrollY() > 0 ? 1 : -1;
          this.curScale = clamp(this.curScale - scale * 0.1, 0.25, 1.5);
          this.node.scale = new Vec3(this.curScale, this.curScale, this.curScale);
        };
        _proto.onTouchStart = function onTouchStart(event) {
          var id = event.getID();
          var pos = event.getUILocation();
          for (var i = 0; i < 2; i++) {
            var t = this.touchs[i];
            if (t.id == -1) {
              t.id = id;
              t.pre.set(pos);
              t.cur.set(pos);
              this.touchCount++;
              break;
            }
          }
        };
        _proto.onTouchMove = function onTouchMove(event) {
          var curTouch = null;
          var id = event.getID();
          var pos = event.getUILocation();
          for (var i = 0; i < 2; i++) {
            var t = this.touchs[i];
            if (t.id == id) {
              t.cur.set(pos);
              curTouch = t;
            }
          }
          if (this.touchCount == 1) {
            var scale = 0.008;
            var cur = event.getUIDelta();
            this.curXY.x += cur.x * scale;
            this.curXY.y += cur.y * scale;

            // this.updateRotate();
          } else if (this.touchCount == 2) {
            var p0 = this.touchs[0];
            var p1 = this.touchs[1];
            var curLen = Vec2.distance(p0.cur, p1.cur);
            var oldLen = Vec2.distance(p0.pre, p1.pre);
            this.curScale = clamp(this.curScale - (curLen - oldLen) * 0.002, 0.25, 1.5);
            this.node.scale = new Vec3(this.curScale, this.curScale, this.curScale);
          }
          if (curTouch) {
            curTouch.pre.set(curTouch.cur);
          }
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          var id = event.getID();
          for (var i = 0; i < 2; i++) {
            var t = this.touchs[i];
            if (t.id == id) {
              t.id = -1;
              this.touchCount--;
            }
          }
        };
        _proto.update = function update(dt) {
          this.updateRotate();
        };
        return Camera3D;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "distance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 25;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vertical", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "horizontal", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 45;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Collider.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Agent.ts', './Body.ts', './Object.ts', './Shape.ts', './SAPBroadPhase.ts'], function (exports) {
  var _createClass, cclegacy, Agent, cBody, Dirty, Trigger, ShapeSupport, SAPBroadPhase;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Agent = module.Agent;
    }, function (module) {
      cBody = module.cBody;
    }, function (module) {
      Dirty = module.Dirty;
      Trigger = module.Trigger;
    }, function (module) {
      ShapeSupport = module.ShapeSupport;
    }, function (module) {
      SAPBroadPhase = module.SAPBroadPhase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e9918lPZAlNEZGC1kb/9cqo", "Collider", undefined);
      var cCollider = exports('cCollider', /*#__PURE__*/function () {
        function cCollider() {
          this.id = 0;
          this.pools = [];
          this.frameID = 0;
          this.insertID = 0;
          this.bodys = [];
          this.pairs = new Map();
          this.bpPairs = [];
          // Broad Phase 候选对缓冲区，避免每帧分配
          /** 当前 Broad Phase 策略，默认 SAP */
          this.broadPhase = new SAPBroadPhase();
        }
        var _proto = cCollider.prototype;
        /**
         * 切换 Broad Phase 策略。
         *
         * 示例：
         *   // 切换到空间网格（SLG / 大规模场景）
         *   import { GridBroadPhase } from './GridBroadPhase';
         *   cCollider.inst.setBroadPhase(new GridBroadPhase({
         *       cellSize: 100, worldMinX: 0, worldMinY: 0, worldW: 5000, worldH: 5000
         *   }));
         *
         *   // 切回 SAP（默认）
         *   import { SAPBroadPhase } from './SAPBroadPhase';
         *   cCollider.inst.setBroadPhase(new SAPBroadPhase());
         */
        _proto.setBroadPhase = function setBroadPhase(bp) {
          this.broadPhase = bp;
          this.broadPhase.reset();
        };
        _proto.create = function create(obj) {
          var body = this.pools.pop();
          if (!body) {
            body = new cBody(obj);
          }
          body.id = this.id++;
          body.object = obj;
          return body;
        }

        //插入 body, force 强制更新数据
        ;

        _proto.insert = function insert(body, force) {
          if (force === void 0) {
            force = false;
          }
          if (!body) return;
          if (!body.inCollider) {
            //不在列表,重新插入
            this.bodys.push(body);
            body.inCollider = true;
          }

          //复位状态
          body.isRemove = false;
          body.isRetrieve = false;
          body.fid = this.insertID++;

          //强制刷新body数据
          if (force && body.object) {
            body.object.isDirty = Dirty.RTS;
          }
        }

        //删除 body: 提前标记删除 , update中执行移除
        ;

        _proto.remove = function remove(body, retrieve) {
          if (retrieve === void 0) {
            retrieve = false;
          }
          if (!body) return;
          body.isRemove = true;
          body.isRetrieve = retrieve;
        }

        //重置回收bodys
        ;

        _proto.reset = function reset() {
          this.id = 0; // 重置 id 计数，pool 中的 body 复用时会重新分配
          this.frameID = 0;
          this.pairs.clear();
          this.broadPhase.reset();
          var bodys = this.bodys;
          for (var i = bodys.length - 1; i >= 0; i--) {
            var body = bodys[i];
            this.pools.push(body);
            body.clear();
          }
          bodys.length = 0;
        }

        //退出释放bodys
        ;

        _proto.clear = function clear() {
          this.id = 0;
          this.frameID = 0;
          this.pairs.clear();
          this.broadPhase.reset();
          this.pools.length = 0;
          var bodys = this.bodys;
          for (var i = bodys.length - 1; i >= 0; i--) {
            bodys[i].clear();
          }
          bodys.length = 0;
        };
        _proto.update = function update(dt) {
          this._removeMarked();
          // Broad Phase：填充候选对到 bpPairs，复用数组避免 GC
          var bpPairs = this.bpPairs;
          bpPairs.length = 0;
          this.broadPhase.update(this.bodys, bpPairs);
          this._triggers(bpPairs);
          Agent.inst.process(this.bodys);
        }

        // ─── 私有：移除标记删除的 body ───────────────────────────
        ;

        _proto._removeMarked = function _removeMarked() {
          var bodys = this.bodys;
          var length = 0;
          for (var i = 0, N = bodys.length; i < N; i++) {
            var body = bodys[i];
            if (body.isRemove) {
              if (body.isRetrieve) {
                this.pools.push(body);
                body.clear();
              }
              body.inCollider = false;
              continue;
            }
            if (++length <= i) bodys[length - 1] = body;
          }
          bodys.length = length;
        }

        // ─── 私有：碰撞检测 + Trigger ────────────────────────────
        ;

        _proto._triggers = function _triggers(bpPairs) {
          ++this.frameID;
          var agentMgr = Agent.inst;
          var N = bpPairs.length; // 每对占 2 个槽

          for (var k = 0; k < N; k += 2) {
            var bi = bpPairs[k];
            var bj = bpPairs[k + 1];
            var objA = bi.object;
            var objB = bj.object;
            var a2b = bi.mask & bj.group;
            var b2a = bj.mask & bi.group;

            // Agent 避让检测
            if (bi.isAgent && bj.isAgent) {
              agentMgr.check(bi, bj);
              agentMgr.check(bj, bi);
            }
            if (!(a2b || b2a)) continue;

            // 两个物体都不需要 trigger 回调 → 跳过 Narrow Phase
            var needA = a2b && objA && objA.trigger;
            var needB = b2a && objB && objB.trigger;
            if (!needA && !needB && !bi.isAgent && !bj.isAgent) continue;

            // Narrow Phase
            var at = objA.shape.type;
            var bt = objB.shape.type;
            var hit = void 0;
            if (at > bt) hit = ShapeSupport[bt | at](bj, bi);else hit = ShapeSupport[at | bt](bi, bj);
            if (!hit) continue;
            this._onTrigger(bi, bj, (a2b ? 2 : 0) | (b2a ? 1 : 0));
          }
          this._endTrigger();
        };
        _proto._onTrigger = function _onTrigger(bi, bj, state) {
          var trigger = 0;
          var id = (bi.id * (bi.id + 1) >> 1) + bj.id - 1;
          var pairs = this.pairs;
          var data = pairs.get(id);
          if (data !== undefined) {
            trigger = Trigger.stay;
            if (data.fida !== bi.fid || data.fidb !== bj.fid) {
              trigger = Trigger.enter;
              data.fida = bi.fid;
              data.fidb = bj.fid;
            }
            data.frameID = this.frameID;
            data.state = state;
          } else {
            trigger = Trigger.enter;
            pairs.set(id, {
              id: id,
              a: bi,
              b: bj,
              fida: bi.fid,
              fidb: bj.fid,
              frameID: this.frameID,
              state: state
            });
          }
          var objA = bi.object;
          if (state & 2 && objA && objA.trigger && !bi.isRemove) {
            objA.onTrigger(bj, trigger);
          }
          var objB = bj.object;
          if (state & 1 && objB && objB.trigger && !bj.isRemove) {
            objB.onTrigger(bi, trigger);
          }
        };
        _proto._endTrigger = function _endTrigger() {
          var deletes = [];
          var pairs = this.pairs;
          var frameID = this.frameID;
          var entries = pairs.values();
          var length = pairs.size;
          for (var i = 0; i < length; i++) {
            var data = entries.next().value;
            var bi = data.a;
            var bj = data.b;
            if (data.frameID !== frameID || bi.isRemove || bj.isRemove) {
              if (data.fida === bi.fid && data.fidb === bj.fid) {
                var objA = bi.object;
                if (objA && objA.trigger && !bi.isRemove) objA.onTrigger(bj, Trigger.exit);
                var objB = bj.object;
                if (objB && objB.trigger && !bj.isRemove) objB.onTrigger(bi, Trigger.exit);
              }
              deletes.push(data.id);
            }
          }
          for (var _i = deletes.length - 1; _i >= 0; _i--) {
            pairs["delete"](deletes[_i]);
          }
        };
        _createClass(cCollider, null, [{
          key: "inst",
          get: function get() {
            if (this._inst == null) {
              this._inst = new cCollider();
            }
            return this._inst;
          }
        }]);
        return cCollider;
      }());
      cCollider._inst = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "30590MX/qJKgaC8t0Gc5xmh", "Config", undefined);
      var Config = exports('Config', {
        demoIdx: 0,
        totalNum: 0,
        isRotate: false,
        //开启旋转(精确碰撞)
        maxSpeed: 1.0,
        //模拟世界速度
        maxNum: 10000,
        //最大总个数
        sphere: 0.0,
        //shpere 比例
        box: 0.5 //box 比例
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/demo2d.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts', './Collider.ts', './Object.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Quat, Prefab, CCInteger, Vec2, instantiate, clamp, Component, Config, cCollider, cObject;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Prefab = module.Prefab;
      CCInteger = module.CCInteger;
      Vec2 = module.Vec2;
      instantiate = module.instantiate;
      clamp = module.clamp;
      Component = module.Component;
    }, function (module) {
      Config = module.Config;
    }, function (module) {
      cCollider = module.cCollider;
    }, function (module) {
      cObject = module.cObject;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "aec98DdhcRAY77R6c3kpLNa", "demo2d", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var demo2d = exports('demo2d', (_dec = ccclass('demo2d'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(Vec2), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(demo2d, _Component);
        function demo2d() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "box", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sphere", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "capacity", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speed", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "world", _descriptor5, _assertThisInitialized(_this));
          _this.objects = [];
          _this.boxNum = 0;
          _this.sphereNum = 0;
          return _this;
        }
        var _proto = demo2d.prototype;
        _proto.resetRotation = function resetRotation() {
          var objects = this.objects;
          var length = objects.length;
          for (var i = 0; i < length; i++) {
            var obj = objects[i];
            obj.setRotation(Quat.IDENTITY);
          }
        };
        _proto.randomRotation = function randomRotation() {
          var objects = this.objects;
          var length = objects.length;
          for (var i = 0; i < length; i++) {
            var obj = objects[i];
            Quat.fromEuler(tempRot, 0, 0, Math.random() * 360);
            obj.setRotation(tempRot); //更新节点旋转
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.boxNum = 0;
          this.sphereNum = 0;
          this.objects.length = 0;
          cCollider.inst.reset(); //重置复用
        };

        _proto.addObjects = function addObjects(num, prefab, type) {
          for (var i = 0; i < num; i++) {
            var node = instantiate(prefab);
            this.node.addChild(node);
            tempPos.x = (Math.random() - 0.5) * this.world.x;
            tempPos.y = (Math.random() - 0.5) * this.world.y;
            tempPos.z = 0;
            node.position = tempPos; //更新位置

            var object = node.getComponent(cObject);
            var angle = Math.random() * Math.PI * 2;
            var speed = this.speed * (Math.random() * 0.9 + 0.1);
            object.velocity.x = Math.cos(angle) * speed;
            object.velocity.y = Math.sin(angle) * speed;
            object.velocity.z = 0;
            object.name = type;
            if (Config.isRotate) {
              //开启旋转检测
              Quat.fromEuler(tempRot, 0, 0, Math.random() * 360);
              object.setRotation(tempRot); //更新节点旋转
            }

            this.objects.push(object);
          }
        };
        _proto.worldManager = function worldManager(dt) {
          //控制全局速度      
          dt *= Config.maxSpeed;

          //动态增加 box 
          var boxNum = Math.round(Config.box * Config.maxNum);
          if (boxNum > this.boxNum) {
            var max = clamp(boxNum - this.boxNum, 0, 20); //分帧
            this.addObjects(max, this.box, '1');
            this.boxNum += max;
          }

          //动态增加 sphere
          var sphereNum = Math.round(Config.sphere * Config.maxNum);
          if (sphereNum > this.sphereNum) {
            var _max = clamp(sphereNum - this.sphereNum, 0, 20); //分帧
            this.addObjects(_max, this.sphere, '2');
            this.sphereNum += _max;
          }
          var objects = this.objects;
          for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            var velocity = obj.velocity;
            tempPos.set(obj.getPosition());
            if (Math.abs(tempPos.x + velocity.x * dt) > this.world.x / 2) {
              velocity.x = -velocity.x;
            }
            if (Math.abs(tempPos.y + velocity.y * dt) > this.world.y / 2) {
              velocity.y = -velocity.y;
            }

            // if (Math.abs(tempPos.z + velocity.z * dt) > HEIGHT / 2) {
            //     velocity.z = -velocity.z;
            // }    

            tempPos.x += velocity.x * dt;
            tempPos.y += velocity.y * dt;
            tempPos.z += velocity.z * dt;

            //更新节点位置
            obj.setPosition(tempPos);

            //动态删除box
            if (boxNum < this.boxNum) {
              if (obj.name == '1') {
                //回收body删除node
                obj.remove(true).destroy();
                objects.splice(i--, 1);
                this.boxNum--;
              }
            }

            //动态删除Sphere
            if (sphereNum < this.sphereNum) {
              if (obj.name == '2') {
                //回收body删除node
                obj.remove(true).destroy();
                objects.splice(i--, 1);
                this.sphereNum--;
              }
            }
          }
        };
        _proto.update = function update(dt) {
          this.worldManager(dt);
          cCollider.inst.update(dt);
        };
        return demo2d;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "box", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sphere", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1024;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "world", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(960, 640);
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/demo2dBatch.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collider.ts', './GridBroadPhase.ts', './Object.ts', './Shape.ts', './Config.ts', './BatchRenderer2D.ts', './PhysBody.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Vec3, Quat, CCInteger, Vec2, clamp, Component, cCollider, GridBroadPhase, Dirty, cBox, Config, BatchRenderer2D, PhysBody;
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
      Vec3 = module.Vec3;
      Quat = module.Quat;
      CCInteger = module.CCInteger;
      Vec2 = module.Vec2;
      clamp = module.clamp;
      Component = module.Component;
    }, function (module) {
      cCollider = module.cCollider;
    }, function (module) {
      GridBroadPhase = module.GridBroadPhase;
    }, function (module) {
      Dirty = module.Dirty;
    }, function (module) {
      cBox = module.cBox;
    }, function (module) {
      Config = module.Config;
    }, function (module) {
      BatchRenderer2D = module.BatchRenderer2D;
    }, function (module) {
      PhysBody = module.PhysBody;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "dcce65t8gVAGLrxcVM2mJtK", "demo2dBatch", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();

      /**
       * demo2dBatch —— 脱离 Node 的 2D 碰撞演示。
       *
       * 与 demo2d.ts 逻辑一致，但每个物体使用 PhysBody（纯 TS 对象）
       * 替代 Cocos Node + cObject，所有渲染通过 BatchRenderer2D 统一
       * 写入一个动态 Mesh，实现 1 Draw Call。
       */
      var demo2dBatch = exports('demo2dBatch', (_dec = ccclass('demo2dBatch'), _dec2 = property(BatchRenderer2D), _dec3 = property({
        type: CCInteger
      }), _dec4 = property(Vec2), _dec5 = property(Vec2), _dec6 = property({
        type: CCInteger
      }), _dec7 = property({
        type: CCInteger
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(demo2dBatch, _Component);
        function demo2dBatch() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "batchRenderer", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speed", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "world", _descriptor3, _assertThisInitialized(_this));
          /** 物体尺寸 fallback（有 SpriteFrame 时自动使用 originalSize，无 SpriteFrame 时生效）*/
          _initializerDefineProperty(_this, "objectSize", _descriptor4, _assertThisInitialized(_this));
          /** 球体半径 fallback（有 SpriteFrame 时自动使用 originalSize 的短边/2，无 SpriteFrame 时生效）*/
          _initializerDefineProperty(_this, "sphereRadius", _descriptor5, _assertThisInitialized(_this));
          /** Box 对应 frames 里的索引（-1 则纯色）*/
          _initializerDefineProperty(_this, "boxFrameIndex", _descriptor6, _assertThisInitialized(_this));
          /** Sphere 对应 frames 里的索引（-1 则纯色）*/
          _initializerDefineProperty(_this, "sphereFrameIndex", _descriptor7, _assertThisInitialized(_this));
          _this.objects = [];
          _this.boxNum = 0;
          _this.sphereNum = 0;
          // batchRenderer 节点的世界坐标，用于把物理坐标对齐到相机视野中心
          _this.originX = 0;
          _this.originY = 0;
          return _this;
        }
        var _proto = demo2dBatch.prototype;
        // ─── 生命周期 ────────────────────────────────────────────
        _proto.onLoad = function onLoad() {
          // 清理上一次 Play 遗留的碰撞数据
          cCollider.inst.reset();
          if (this.batchRenderer) {
            var wp = this.batchRenderer.node.worldPosition;
            this.originX = wp.x;
            this.originY = wp.y;
          }

          // 切换到空间网格 Broad Phase
          // cellSize = 物体尺寸的 1.5 倍，让每格平均 3~5 个物体
          var cellSize = Math.min(this.objectSize.x, this.objectSize.y) * 1.5;
          cCollider.inst.setBroadPhase(new GridBroadPhase({
            cellSize: cellSize,
            worldMinX: this.originX - this.world.x * 0.5,
            worldMinY: this.originY - this.world.y * 0.5,
            worldW: this.world.x,
            worldH: this.world.y
          }));
        };
        _proto.onDestroy = function onDestroy() {
          this.boxNum = 0;
          this.sphereNum = 0;
          this.objects.length = 0;
          cCollider.inst.reset();
        };
        _proto.update = function update(dt) {
          this.worldManager(dt);
          cCollider.inst.update(dt);
          if (this.batchRenderer) {
            this.batchRenderer.flush(this.objects, this.objects.length);
          }
        }

        // ─── 公共接口（供 main.ts 调用，与 demo2d 保持一致）──────
        ;

        _proto.resetRotation = function resetRotation() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.objects), _step; !(_step = _iterator()).done;) {
            var obj = _step.value;
            obj.setRotation(Quat.IDENTITY);
          }
        };
        _proto.randomRotation = function randomRotation() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.objects), _step2; !(_step2 = _iterator2()).done;) {
            var obj = _step2.value;
            Quat.fromEuler(tempRot, 0, 0, Math.random() * 360);
            obj.setRotation(tempRot);
          }
        }

        // ─── 内部逻辑 ────────────────────────────────────────────
        ;

        _proto.addObjects = function addObjects(num, isBox) {
          var group = 2;
          var mask = 2; // 只与同 group=2 的物体碰撞，排除场景中的 cObject 节点
          var frameIndex = isBox ? this.boxFrameIndex : this.sphereFrameIndex;

          // 优先从 FrameConfig 读实际尺寸（originalSize × scale），没有则用 Inspector 手动值
          var br = this.batchRenderer;
          var frameSize = br && frameIndex >= 0 ? br.getFrameSize(frameIndex) : null;
          var sprW = frameSize ? frameSize.w : this.objectSize.x;
          var sprH = frameSize ? frameSize.h : this.objectSize.y;
          for (var i = 0; i < num; i++) {
            var phys = new PhysBody();
            phys.type = isBox ? 0 : 1;
            phys.scale.set(1, 1, 1);

            // 碰撞 shape 直接用实际尺寸（已含 FrameConfig.scale），PhysBody.scale 保持 1
            var center = new Vec3();
            var size = new Vec3(sprW, sprH, sprW);
            phys.shape = new cBox(center, size);

            // 随机初始位置（以 batchRenderer 节点世界坐标为中心）
            phys.position.set(this.originX + (Math.random() - 0.5) * this.world.x, this.originY + (Math.random() - 0.5) * this.world.y, 0);
            phys.isDirty = Dirty.RTS;

            // 随机速度
            var angle = Math.random() * Math.PI * 2;
            var spd = this.speed * (Math.random() * 0.9 + 0.1);
            phys.velocity.set(Math.cos(angle) * spd, Math.sin(angle) * spd, 0);
            if (Config.isRotate) {
              Quat.fromEuler(tempRot, 0, 0, Math.random() * 360);
              phys.setRotation(tempRot);
            }

            // 从 frames 数组取 UV，index < 0 则 null（纯色）
            var frameIdx = isBox ? this.boxFrameIndex : this.sphereFrameIndex;
            if (frameIdx >= 0 && this.batchRenderer) {
              phys.uv = this.batchRenderer.getFrameUV(frameIdx);
            }

            // 注册进碰撞系统
            var body = cCollider.inst.create(phys);
            body.shape = phys.shape;
            body.group = group;
            body.mask = mask;
            phys.body = body;
            cCollider.inst.insert(body);
            this.objects.push(phys);
          }
        };
        _proto.removeObject = function removeObject(index) {
          var phys = this.objects[index];
          cCollider.inst.remove(phys.body, true);
          this.objects.splice(index, 1);
        };
        _proto.worldManager = function worldManager(dt) {
          dt *= Config.maxSpeed;

          // 动态增加 box
          var boxNum = Math.round(Config.box * Config.maxNum);
          if (boxNum > this.boxNum) {
            var max = clamp(boxNum - this.boxNum, 0, 20);
            this.addObjects(max, true);
            this.boxNum += max;
          }

          // 动态增加 sphere
          var sphereNum = Math.round(Config.sphere * Config.maxNum);
          if (sphereNum > this.sphereNum) {
            var _max = clamp(sphereNum - this.sphereNum, 0, 20);
            this.addObjects(_max, false);
            this.sphereNum += _max;
          }
          var objects = this.objects;
          var halfW = this.world.x / 2;
          var halfH = this.world.y / 2;
          var ox = this.originX;
          var oy = this.originY;
          for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            var velocity = obj.velocity;
            tempPos.set(obj.position);

            // 边界检测：把世界坐标换算成相对 origin 的偏移再比较
            if (Math.abs(tempPos.x - ox + velocity.x * dt) > halfW) velocity.x = -velocity.x;
            if (Math.abs(tempPos.y - oy + velocity.y * dt) > halfH) velocity.y = -velocity.y;
            tempPos.x += velocity.x * dt;
            tempPos.y += velocity.y * dt;
            obj.setPosition(tempPos);

            // 动态删除 box
            if (boxNum < this.boxNum && obj.type === 0) {
              this.removeObject(i--);
              this.boxNum--;
            }

            // 动态删除 sphere
            if (sphereNum < this.sphereNum && obj.type === 1) {
              this.removeObject(i--);
              this.sphereNum--;
            }
          }
        };
        return demo2dBatch;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "batchRenderer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "world", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(960, 640);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "objectSize", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(30, 30);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sphereRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "boxFrameIndex", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sphereFrameIndex", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/demo3d.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collider.ts', './Object.ts', './Shape.ts', './Config.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Quat, utils, primitives, Prefab, CCInteger, instantiate, MeshRenderer, clamp, Component, cCollider, cObject, ShapeType, Config;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      utils = module.utils;
      primitives = module.primitives;
      Prefab = module.Prefab;
      CCInteger = module.CCInteger;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      clamp = module.clamp;
      Component = module.Component;
    }, function (module) {
      cCollider = module.cCollider;
    }, function (module) {
      cObject = module.cObject;
    }, function (module) {
      ShapeType = module.ShapeType;
    }, function (module) {
      Config = module.Config;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "66d84cnnQ1L/JC3OW0bDZP/", "demo3d", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var boxMesh = utils.createMesh(primitives.box());
      var sphereMesh = utils.createMesh(primitives.sphere(0.5, {
        segments: 12
      }));
      var demo3d = exports('demo3d', (_dec = ccclass('demo3d'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(Vec3), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(demo3d, _Component);
        function demo3d() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "box", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sphere", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "capacity", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speed", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "world", _descriptor5, _assertThisInitialized(_this));
          _this.objects = [];
          _this.boxNum = 0;
          _this.sphereNum = 0;
          return _this;
        }
        var _proto = demo3d.prototype;
        _proto.resetRotation = function resetRotation() {
          var objects = this.objects;
          var length = objects.length;
          for (var i = 0; i < length; i++) {
            var obj = objects[i];
            obj.setRotation(Quat.IDENTITY);
          }
        };
        _proto.randomRotation = function randomRotation() {
          var objects = this.objects;
          var length = objects.length;
          for (var i = 0; i < length; i++) {
            var obj = objects[i];
            Quat.fromEuler(tempRot, Math.random() * 360, Math.random() * 360, Math.random() * 360);
            obj.setRotation(tempRot); //更新节点旋转
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.boxNum = 0;
          this.sphereNum = 0;
          this.objects.length = 0;
          cCollider.inst.reset(); //重置复用
        };

        _proto.addObjects = function addObjects(num, prefab, mesh) {
          if (mesh === void 0) {
            mesh = null;
          }
          for (var i = 0; i < num; i++) {
            var node = instantiate(prefab);
            this.node.addChild(node);
            if (mesh != null) {
              var render = node.getComponent(MeshRenderer);
              render.mesh = mesh;
            }
            tempPos.x = (Math.random() - 0.5) * this.world.x;
            tempPos.y = (Math.random() - 0.5) * this.world.y;
            tempPos.z = (Math.random() - 0.5) * this.world.z;
            node.position = tempPos; //更新位置

            var object = node.getComponent(cObject);
            var speed = this.speed * (Math.random() * 0.9 + 0.1);
            tempPos.normalize().multiplyScalar(speed);
            object.velocity.set(tempPos);
            if (Config.isRotate) {
              //开启旋转检测
              Quat.fromEuler(tempRot, Math.random() * 360, Math.random() * 360, Math.random() * 360);
              object.setRotation(tempRot);
            }
            this.objects.push(object);
          }
        };
        _proto.worldManager = function worldManager(dt) {
          //控制全局速度      
          dt *= Config.maxSpeed;

          //动态增加 box 
          var boxNum = Math.round(Config.box * Config.maxNum);
          if (boxNum > this.boxNum) {
            var max = clamp(boxNum - this.boxNum, 0, 20); //分帧
            this.addObjects(max, this.box, boxMesh);
            this.boxNum += max;
          }

          //动态增加 sphere
          var sphereNum = Math.round(Config.sphere * Config.maxNum);
          if (sphereNum > this.sphereNum) {
            var _max = clamp(sphereNum - this.sphereNum, 0, 20); //分帧
            this.addObjects(_max, this.sphere, sphereMesh);
            this.sphereNum += _max;
          }
          var objects = this.objects;
          for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            var velocity = obj.velocity;
            tempPos.set(obj.node.position);
            if (Math.abs(tempPos.x + velocity.x * dt) > this.world.x / 2) {
              velocity.x = -velocity.x;
            }
            if (Math.abs(tempPos.y + velocity.y * dt) > this.world.y / 2) {
              velocity.y = -velocity.y;
            }
            if (Math.abs(tempPos.z + velocity.z * dt) > this.world.z / 2) {
              velocity.z = -velocity.z;
            }
            tempPos.x += velocity.x * dt;
            tempPos.y += velocity.y * dt;
            tempPos.z += velocity.z * dt;

            //更新节点位置
            obj.setPosition(tempPos);

            //动态删除box
            if (boxNum < this.boxNum) {
              if (obj.type == ShapeType.Box) {
                //回收body删除node
                obj.remove().destroy();
                objects.splice(i--, 1);
                this.boxNum--;
              }
            }

            //动态删除Sphere
            if (sphereNum < this.sphereNum) {
              if (obj.type == ShapeType.Sphere) {
                //回收body删除node
                obj.remove().destroy();
                objects.splice(i--, 1);
                this.sphereNum--;
              }
            }
          }
        };
        _proto.update = function update(dt) {
          this.worldManager(dt);
          cCollider.inst.update(dt);
        };
        return demo3d;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "box", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sphere", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1024;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "world", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(10, 10, 10);
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/detector.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts', './player.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, PhysicsSystem, Vec3, Dirty, Trigger, cObject, Player;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PhysicsSystem = module.PhysicsSystem;
      Vec3 = module.Vec3;
    }, function (module) {
      Dirty = module.Dirty;
      Trigger = module.Trigger;
      cObject = module.cObject;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "d96b6StHElCqLiLQGDzzA38", "detector", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      //Payer 探测触发器
      var detector = exports('detector', (_dec = ccclass('detector'), _dec(_class = (_class2 = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(detector, _cObject);
        function detector() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "attackRaidus", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "collectRaidus", _descriptor2, _assertThisInitialized(_this));
          //获取默认物理控制面板的分组信息
          _this.GOODS = PhysicsSystem.PhysicsGroup["goods"];
          _this.ENEMY = PhysicsSystem.PhysicsGroup["enemy"];
          return _this;
        }
        var _proto = detector.prototype;
        _proto.start = function start() {
          //自定义设置掩码,收集范围内的敌人和物品
          this.body.group = 0; //不接受任何掩码
          this.body.mask = this.ENEMY | this.GOODS;
        };
        _proto.update = function update(dt) {
          //需要实时，同步更新 player 位置
          this.isDirty |= Dirty.T;
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;

          //世界中心坐标
          var cb = b.getCenter(); // b.getPosition()
          var ca = this.body.getCenter(); // this.body.getPosition();
          var lengthSqr = Vec3.squaredDistance(ca, cb);

          //攻击半径
          if (lengthSqr < this.attackRaidus * this.attackRaidus) {
            if (b.group == this.ENEMY) {
              Player.inst.onAttack(b);
            }
          }

          //收集半径
          if (lengthSqr < this.collectRaidus * this.collectRaidus) {
            if (b.group == this.GOODS) {
              Player.inst.onCollect(b);
            }
          }
        };
        return detector;
      }(cObject), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "attackRaidus", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "collectRaidus", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/enemy.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts', './player.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, PhysicsSystem, Trigger, cObject, Player;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      PhysicsSystem = module.PhysicsSystem;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ab37babyJFDhI5irIYLsBtw", "enemy", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Enemy = exports('Enemy', (_dec = ccclass('Enemy'), _dec(_class = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Enemy, _cObject);
        function Enemy() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          //获取默认物理控制面板的分组信息
          _this.PLAYER = PhysicsSystem.PhysicsGroup["player"];
          _this.BULLET = PhysicsSystem.PhysicsGroup["bullet"];
          return _this;
        }
        var _proto = Enemy.prototype;
        _proto.init = function init() {
          //重置状态
          this.follow(); //跟随速度和方向
          this.velocity.set(this.tryVelocity);
        };
        _proto.update = function update(dt) {
          //计算新位置
          var pos = this.getPosition();
          var velocity = this.velocity;
          tempPos.x = pos.x + velocity.x * dt;
          tempPos.y = pos.y + velocity.y * dt;
          tempPos.z = pos.z + velocity.z * dt;
          this.setPosition(tempPos);
          this.follow();
        }

        //跟随主角
        ;

        _proto.follow = function follow() {
          var scale = this.node.worldScale;
          var pos = this.node.worldPosition;
          var tartet = Player.inst.node.worldPosition;
          Vec3.subtract(this.tryVelocity, tartet, pos).normalize();

          //尝试最大跟随速度(有需要，可以自己设置)
          var maxVelocity = this.body.maxVelocity;
          this.tryVelocity.multiplyScalar(maxVelocity);

          //调整转向
          var x = Math.abs(scale.x),
            y = scale.y,
            z = scale.z;
          scale.set(x * (this.tryVelocity.x < 0 ? -1 : 1), y, z);
          this.setScale(scale);
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          switch (b.group) {
            case this.BULLET:
              //碰到子弹
              break;
            case this.PLAYER:
              //碰到player
              break;
          }
        };
        return Enemy;
      }(cObject)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ghost.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts', './enemy.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, instantiate, Trigger, Enemy;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      instantiate = module.instantiate;
    }, function (module) {
      Trigger = module.Trigger;
    }, function (module) {
      Enemy = module.Enemy;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "a6edbJLuWBGk7VWehz3M+o2", "ghost", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Ghost = exports('Ghost', (_dec = ccclass('Ghost'), _dec(_class = (_class2 = /*#__PURE__*/function (_Enemy) {
        _inheritsLoose(Ghost, _Enemy);
        function Ghost() {
          return _Enemy.apply(this, arguments) || this;
        }
        Ghost.get = function get(prefab) {
          var ghost = this.pools.pop();
          if (!ghost) {
            var node = instantiate(prefab);
            ghost = node.getComponent(Ghost);
          }
          return ghost;
        };
        Ghost.put = function put(ghost) {
          //压入缓存池管理节点
          this.pools.push(ghost);
          //移除node不回收body
          ghost.remove(false);
        };
        var _proto = Ghost.prototype;
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          switch (b.group) {
            case this.BULLET:
              //碰到子弹
              break;
            case this.PLAYER:
              //碰到player
              break;
          }

          //碰撞自我加收
          Ghost.put(this);

          //播放死亡特效
          //.........
        };

        return Ghost;
      }(Enemy), _class2.pools = [], _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GridBroadPhase.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dfc32laC2lF1bVRIUMmjP/2", "GridBroadPhase", undefined);
      /**
       * 固定空间网格 Broad Phase。
       *
       * 性能关键：
       *   - aabbCache: Float32Array  连续存储所有 body 的 AABB（按 body.id 索引）
       *     内层比较循环直接读 Float32Array，避免对象指针跳转，CPU 缓存友好
       *   - locals/guests 分列，外循环只走 locals，段1 j>i 天然去重，段2 过客无需去重
       *   - pairsOut 直接写入数组，避免回调开销
       */
      var GridBroadPhase = exports('GridBroadPhase', /*#__PURE__*/function () {
        function GridBroadPhase(options) {
          this.cellSize = 100;
          this.worldMinX = 0;
          this.worldMinY = 0;
          this.cols = 0;
          this.rows = 0;
          // body.id → 格子内索引（Int32Array）
          this.cellLocals = [];
          this.cellGuests = [];
          this.usedCells = [];
          // body.id → aabb 连续缓存，每个 body 占 4 个 float（x0,y0,x1,y1）
          // 只存 2D 用到的 4 个分量，减少内存占用
          this.aabbCache = new Float32Array(8192 * 4);
          // body.id → 主格子索引
          this.mainCell = new Int32Array(8192);
          this._init(options);
        }
        var _proto = GridBroadPhase.prototype;
        _proto.configure = function configure(options) {
          this._init(options);
        };
        _proto.update = function update(bodys, pairsOut) {
          this._clearCells();

          // 更新 AABB 并注册到格子，同时写入 aabbCache
          var cache = this.aabbCache;
          for (var i = 0, N = bodys.length; i < N; i++) {
            var body = bodys[i];
            var id = body.id;

            // 扩容
            if (id >= this.mainCell.length) {
              this._grow(id);
            }
            var changed = body.updateBound();
            if (changed) {
              // AABB 有变化才更新缓存
              var aabb = body.aabb;
              var base = id << 2;
              cache[base] = aabb[0];
              cache[base + 1] = aabb[1];
              cache[base + 2] = aabb[3];
              cache[base + 3] = aabb[4];
            }
            this._register(body);
          }

          // 生成候选对
          var cellLocals = this.cellLocals;
          var cellGuests = this.cellGuests;
          var usedCells = this.usedCells;
          var p = pairsOut.length;
          for (var ci = 0, len = usedCells.length; ci < len; ci++) {
            var cellIdx = usedCells[ci];
            var locals = cellLocals[cellIdx];
            var guests = cellGuests[cellIdx];
            var NL = locals.length;
            var NG = guests.length;
            if (NL === 0) continue;
            for (var _i = 0; _i < NL; _i++) {
              var bi = locals[_i];
              var biId = bi.id;
              var _base = biId << 2;
              var Ax = cache[_base];
              var Ay = cache[_base + 1];
              var Ax2 = cache[_base + 2];
              var Ay2 = cache[_base + 3];

              // 段1：locals[j > i]，两个主人，j>i 天然去重
              for (var j = _i + 1; j < NL; j++) {
                var bj = locals[j];
                var bjB = bj.id << 2;
                if (Ax > cache[bjB + 2] || cache[bjB] > Ax2 || Ay > cache[bjB + 3] || cache[bjB + 1] > Ay2) continue;
                if (biId > bj.id) {
                  pairsOut[p++] = bi;
                  pairsOut[p++] = bj;
                } else {
                  pairsOut[p++] = bj;
                  pairsOut[p++] = bi;
                }
              }

              // 段2：guests，过客无需去重
              for (var _j = 0; _j < NG; _j++) {
                var _bj = guests[_j];
                var _bjB = _bj.id << 2;
                if (Ax > cache[_bjB + 2] || cache[_bjB] > Ax2 || Ay > cache[_bjB + 3] || cache[_bjB + 1] > Ay2) continue;
                if (biId > _bj.id) {
                  pairsOut[p++] = bi;
                  pairsOut[p++] = _bj;
                } else {
                  pairsOut[p++] = _bj;
                  pairsOut[p++] = bi;
                }
              }
            }
          }
        };
        _proto.reset = function reset() {
          this._clearCells();
        }

        // ─── 私有 ────────────────────────────────────────────────
        ;

        _proto._init = function _init(opt) {
          this.cellSize = opt.cellSize;
          this.worldMinX = opt.worldMinX;
          this.worldMinY = opt.worldMinY;
          this.cols = Math.ceil(opt.worldW / opt.cellSize) + 1;
          this.rows = Math.ceil(opt.worldH / opt.cellSize) + 1;
          var total = this.cols * this.rows;
          this.cellLocals = new Array(total);
          this.cellGuests = new Array(total);
          for (var i = 0; i < total; i++) {
            this.cellLocals[i] = [];
            this.cellGuests[i] = [];
          }
          this.usedCells = [];
        };
        _proto._grow = function _grow(id) {
          var newSize = (id + 1) * 2;
          var newMain = new Int32Array(newSize);
          newMain.set(this.mainCell);
          this.mainCell = newMain;
          var newCache = new Float32Array(newSize * 4);
          newCache.set(this.aabbCache);
          this.aabbCache = newCache;
        };
        _proto._clearCells = function _clearCells() {
          var used = this.usedCells;
          for (var i = 0, len = used.length; i < len; i++) {
            this.cellLocals[used[i]].length = 0;
            this.cellGuests[used[i]].length = 0;
          }
          used.length = 0;
        };
        _proto._register = function _register(body) {
          var cs = this.cellSize;
          var aabb = body.aabb;
          var minX = this.worldMinX;
          var minY = this.worldMinY;
          var cols = this.cols;
          var rows = this.rows;
          var c0 = Math.max(0, Math.min(cols - 1, (aabb[0] - minX) / cs | 0));
          var r0 = Math.max(0, Math.min(rows - 1, (aabb[1] - minY) / cs | 0));
          var c1 = Math.max(0, Math.min(cols - 1, (aabb[3] - minX) / cs | 0));
          var r1 = Math.max(0, Math.min(rows - 1, (aabb[4] - minY) / cs | 0));
          var mc = Math.max(0, Math.min(cols - 1, ((aabb[0] + aabb[3]) * 0.5 - minX) / cs | 0));
          var mr = Math.max(0, Math.min(rows - 1, ((aabb[1] + aabb[4]) * 0.5 - minY) / cs | 0));
          var mainIdx = mr * cols + mc;
          this.mainCell[body.id] = mainIdx;
          var cellLocals = this.cellLocals;
          var cellGuests = this.cellGuests;
          var used = this.usedCells;
          for (var r = r0; r <= r1; r++) {
            for (var c = c0; c <= c1; c++) {
              var idx = r * cols + c;
              if (cellLocals[idx].length === 0 && cellGuests[idx].length === 0) {
                used.push(idx);
              }
              if (idx === mainIdx) cellLocals[idx].push(body);else cellGuests[idx].push(body);
            }
          }
        };
        return GridBroadPhase;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gun.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './bullet.ts', './bulletHell.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Quat, Prefab, Node, Component, Bullet, BulletHell;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Prefab = module.Prefab;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Bullet = module.Bullet;
    }, function (module) {
      BulletHell = module.BulletHell;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "fe09d6P9R9NZ7Zg2YZ/bJ5g", "gun", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Gun = exports('Gun', (_dec = ccclass('Gun'), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Gun, _Component);
        function Gun() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "bullet", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "point", _descriptor2, _assertThisInitialized(_this));
          //子弹射锚点
          _initializerDefineProperty(_this, "speed", _descriptor3, _assertThisInitialized(_this));
          //子弹飞行最大速度
          _initializerDefineProperty(_this, "lifeTime", _descriptor4, _assertThisInitialized(_this));
          //子弹飞行最长时间
          _initializerDefineProperty(_this, "cycleTime", _descriptor5, _assertThisInitialized(_this));
          //子弹发射间隔
          _this.minDist = 0;
          //最近发射位置
          _this.nextCycle = 0;
          //下次发射时间
          _this.isShoot = false;
          //是否上弹
          _this.direction = new Vec3();
          return _this;
        }
        var _proto = Gun.prototype;
        //发射方向 
        _proto.shoot = function shoot(targetWorldPos) {
          //是否可以上弹
          if (this.nextCycle > 0) return;
          Vec3.subtract(tempPos, targetWorldPos, this.node.worldPosition);

          //计算与怪的距离
          var lengthSqr = tempPos.lengthSqr();
          if (!this.isShoot) {
            //首次上弹记录
            this.isShoot = true;
            this.minDist = lengthSqr;
            this.direction.set(tempPos);
            return;
          }

          //保留最近的怪
          if (lengthSqr < this.minDist) {
            this.minDist = lengthSqr;
            this.direction.set(tempPos);
          }
        };
        _proto.update = function update(dt) {
          this.nextCycle -= dt;
          if (this.isShoot) {
            this.isShoot = false;
            this.nextCycle = this.cycleTime;
            var parent = BulletHell.inst.bullets;
            var bullet = Bullet.get(this.bullet);
            bullet.insert(parent); //添加到显示父节点
            bullet.init();

            //parent.getComponent(UITransform).convertToNodeSpaceAR(this.point.worldPosition,tempPos);
            //枪管挂点世界坐标和子弹父亲节点世界坐标的偏移坐标，就是实际当前的子坐标，其实和上面转换是等价的
            Vec3.subtract(tempPos, this.point.worldPosition, parent.worldPosition);
            bullet.setPosition(tempPos); //计算发射的起点

            //计算发射角度
            var dir = this.direction.normalize();
            var angle = Math.atan2(dir.y, dir.x);
            Quat.rotateZ(tempRot, Quat.IDENTITY, angle);
            bullet.setRotation(tempRot);

            //发射速度和生命时长
            bullet.velocity.set(dir).multiplyScalar(this.speed);
            bullet.lifeTime = this.lifeTime;

            //调整枪管瞄准方向
            this.node.rotation = tempRot;
          }
        };
        return Gun;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bullet", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "point", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cycleTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBroadPhase.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eaca5e5UXBMrZOQvQjjnq3C", "IBroadPhase", undefined);
      /**
       * Broad Phase 接口 —— 负责从所有 body 中快速筛选出"可能相交"的候选对。
       *
       * 实现类只做粗筛，不保证候选对真的相交（由 Narrow Phase 精确判断）。
       * 通过 cCollider.setBroadPhase() 在运行时切换。
       *
       * 内置实现：
       *   SAPBroadPhase  —— 扫描轴排序，适合中小规模（< 2000）或分布稀疏的场景
       *   GridBroadPhase —— 固定空间网格，适合大规模（> 2000）或需要范围查询的场景
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Joystick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, input, Input, UITransform, Vec3, Component;
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
      input = module.input;
      Input = module.Input;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "69083fUaChAwY0BY0dL7eJL", "Joystick", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Joystick = exports('Joystick', (_dec = ccclass('Joystick'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Joystick, _Component);
        function Joystick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "round", _descriptor, _assertThisInitialized(_this));
          //摇杆背景
          _initializerDefineProperty(_this, "inner", _descriptor2, _assertThisInitialized(_this));
          //摇杆 也就是中心点
          _initializerDefineProperty(_this, "isStatic", _descriptor3, _assertThisInitialized(_this));
          //固定罗盘不隐藏
          _initializerDefineProperty(_this, "isDiretion", _descriptor4, _assertThisInitialized(_this));
          //是否为方向模式(中心指示点拉尽)
          _initializerDefineProperty(_this, "maxRadius", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "activeRange", _descriptor6, _assertThisInitialized(_this));
          //摇杆触发范围比例（0-1）
          _this.joystickCB = null;
          _this.touchID = -1;
          return _this;
        }
        var _proto = Joystick.prototype;
        _proto.onLoad = function onLoad() {
          this.show(this.isStatic);
          if (this.isStatic) {
            this.round.on(Node.EventType.TOUCH_START, this.touchStart, this);
            this.round.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
            this.round.on(Node.EventType.TOUCH_END, this.touchEnd, this);
            this.round.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
          } else {
            input.on(Input.EventType.TOUCH_START, this.touchStart, this);
            input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.touchEnd, this);
            input.on(Input.EventType.TOUCH_END, this.touchEnd, this);
          }
        };
        _proto.init = function init(cb) {
          this.joystickCB = cb;
        };
        _proto.show = function show(flag) {
          this.round.active = flag;
        };
        _proto.innerPosition = function innerPosition(pos) {
          var data = {
            type: null,
            active: true,
            angle: 0,
            ratio: 0
          };
          var ui = this.round.getComponent(UITransform);
          var s = ui.convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
          s.z = 0;

          //触发范围
          if (s.length() <= this.maxRadius * this.activeRange) {
            this.inner.position = new Vec3();
            data.active = false;
            return data;
          }

          //限制范围
          if (s.length() > this.maxRadius || this.isDiretion) {
            s = s.normalize();
            s = s.multiplyScalar(this.maxRadius);
          }
          this.inner.position = new Vec3(s); //修正位置

          //实际数据
          data.active = true;
          data.angle = Math.atan2(s.y, s.x);
          data.ratio = s.length() / this.maxRadius; // (s.length()-this.maxRadius*this.activeRange)/(this.maxRadius*(1.0 - this.activeRange)); //

          return data;
        };
        _proto.touchStart = function touchStart(event) {
          if (this.touchID == -1) {
            this.touchID = event.getID();
            if (!this.isStatic) {
              this.show(true);
              var pos = event.getUILocation();
              this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
            }
          }
          if (this.touchID != event.getID()) return false;
          var data = this.innerPosition(event.getUILocation());
          data.type = Input.EventType.TOUCH_START;
          this.joystickCB && this.joystickCB(data);
          return true;
        };
        _proto.touchMove = function touchMove(event) {
          if (this.touchID != event.getID()) return false;
          var data = this.innerPosition(event.getUILocation());
          data.type = Input.EventType.TOUCH_MOVE;
          this.joystickCB && this.joystickCB(data);
          return true;
        };
        _proto.touchEnd = function touchEnd(event) {
          //摇杆弹回原位置
          if (this.touchID != event.getID()) return false;
          this.touchID = -1;
          this.show(this.isStatic);
          this.inner.position = new Vec3();
          var data = {
            type: Input.EventType.TOUCH_END,
            active: false,
            angle: 0,
            ratio: 0
          };
          this.joystickCB && this.joystickCB(data);
          return true;
        };
        return Joystick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "round", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "inner", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isStatic", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isDiretion", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 128;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "activeRange", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Joystick.ts', './AILib.ts', './Agent.ts', './Body.ts', './Collider.ts', './GridBroadPhase.ts', './IBroadPhase.ts', './Maths.ts', './Object.ts', './SAPBroadPhase.ts', './Shape.ts', './bullet.ts', './bulletHell.ts', './detector.ts', './enemy.ts', './ghost.ts', './gun.ts', './player.ts', './skill.ts', './snailTail.ts', './BatchRenderer2D.ts', './Camera3D.ts', './Config.ts', './PhysBody.ts', './demo2d.ts', './demo2dBatch.ts', './demo3d.ts', './main.ts', './mainBatch.ts', './Sprite2d.ts', './Sprite3d.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './bulletHell.ts', './player.ts', './Config.ts', './demo2d.ts', './demo3d.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, Slider, Label, setDisplayStats, instantiate, Component, BulletHell, Player, Config, demo2d, demo3d;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Slider = module.Slider;
      Label = module.Label;
      setDisplayStats = module.setDisplayStats;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      BulletHell = module.BulletHell;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      Config = module.Config;
    }, function (module) {
      demo2d = module.demo2d;
    }, function (module) {
      demo3d = module.demo3d;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "70f4fBQ365GaohfCZx0VPZN", "main", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var main = exports('main', (_dec = ccclass('main'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Node), _dec6 = property(Slider), _dec7 = property(Slider), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Label), _dec11 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(main, _Component);
        function main() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "demo2d", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "demo3d", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "demoBullet", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "demosNode", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sbox", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sSphere", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxTxt", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sphereTxt", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speedTxt", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalTxt", _descriptor10, _assertThisInitialized(_this));
          _this.currScense = null;
          return _this;
        }
        var _proto = main.prototype;
        _proto.start = function start() {
          var _this2 = this;
          setDisplayStats(true);
          this.changeDemos();

          //刷新物体个数
          this.schedule(function () {
            var length = 0;
            switch (Config.demoIdx) {
              case 0:
                length = _this2.currScense.getComponentInChildren(demo2d).objects.length;
                break;
              case 1:
                length = _this2.currScense.getComponentInChildren(demo3d).objects.length;
                break;
              case 2:
                length = _this2.currScense.getComponentInChildren(BulletHell).objects.children.length;
                break;
            }
            _this2.totalTxt.string = "" + length;
          }, 0.1);
        };
        _proto.changeDemos = function changeDemos() {
          var _this3 = this;
          if (this.currScense) {
            //释放旧场景
            this.currScense.removeFromParent();
            this.currScense.destroy();
            this.currScense = null;
          }
          switch (Config.demoIdx) {
            case 0:
              this.currScense = instantiate(this.demo2d);
              this.node.getChildByName("Left").active = true;
              this.node.getChildByName("Skill").active = false;
              break;
            case 1:
              this.currScense = instantiate(this.demo3d);
              this.node.getChildByName("Left").active = true;
              this.node.getChildByName("Skill").active = false;
              break;
            case 2:
              this.currScense = instantiate(this.demoBullet);
              this.node.getChildByName("Left").active = false;
              this.node.getChildByName("Skill").active = true;
              break;
          }

          //下一帧加载新场景
          this.scheduleOnce(function () {
            _this3.demosNode.addChild(_this3.currScense);
          });
        };
        _proto.onDemos = function onDemos(event) {
          var idx = event.target.getSiblingIndex();
          if (idx != Config.demoIdx) {
            Config.demoIdx = idx;
            this.changeDemos();
          }
        };
        _proto.onSpeed = function onSpeed(event) {
          Config.maxSpeed = event.progress;
          this.speedTxt.string = "speed:" + Math.round(Config.maxSpeed * 100);
        };
        _proto.onRotation = function onRotation(event) {
          if (Config.isRotate == event.isChecked) return;
          Config.isRotate = event.isChecked;
          // if (!Config.isRotate) {
          switch (Config.demoIdx) {
            case 0:
              if (!Config.isRotate) this.currScense.getComponentInChildren(demo2d).resetRotation();else this.currScense.getComponentInChildren(demo2d).randomRotation();
              break;
            case 1:
              if (!Config.isRotate) this.currScense.getComponentInChildren(demo3d).resetRotation();else this.currScense.getComponentInChildren(demo3d).randomRotation();
              break;
          }
          // }
        };

        _proto.onSphere = function onSphere(event) {
          var max = Config.maxNum;
          var progress = event.progress;
          if (progress + Config.box >= 1) {
            this.boxTxt.string = "box:" + Math.round((1 - progress) * max);
            this.sbox.progress = 1 - progress;
            Config.box = 1 - progress;
          }
          this.sphereTxt.string = "sphere:" + Math.round(progress * max);
          event.progress = progress;
          Config.sphere = progress;
        };
        _proto.onBox = function onBox(event) {
          var max = Config.maxNum;
          var progress = event.progress;
          if (progress + Config.sphere >= 1) {
            this.sphereTxt.string = "sphere:" + Math.round((1 - progress) * max);
            this.sSphere.progress = 1 - progress;
            Config.sphere = 1 - progress;
          }
          this.boxTxt.string = "box:" + Math.round(progress * max);
          event.progress = progress;
          Config.box = progress;
        };
        _proto.onSkill = function onSkill(event) {
          Player.inst.onSkill();

          //示范做了个定时
          event.target.active = false;
          this.scheduleOnce(function () {
            if (Config.demoIdx == 2) {
              event.target.active = true;
            }
          }, 5);
        };
        return main;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "demo2d", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "demo3d", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "demoBullet", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "demosNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sbox", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sSphere", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "boxTxt", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sphereTxt", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "speedTxt", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "totalTxt", [_dec11], {
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

System.register("chunks:///_virtual/mainBatch.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts', './BatchRenderer2D.ts', './demo2dBatch.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, Slider, Label, setDisplayStats, instantiate, Component, Config, BatchRenderer2D, demo2dBatch;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Slider = module.Slider;
      Label = module.Label;
      setDisplayStats = module.setDisplayStats;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Config = module.Config;
    }, function (module) {
      BatchRenderer2D = module.BatchRenderer2D;
    }, function (module) {
      demo2dBatch = module.demo2dBatch;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "7f986tVp8hL6bWdUIia+NWl", "mainBatch", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * mainBatch —— demo2dBatch 的入口脚本，使用方式与 main.ts 一致。
       *
       * 预制体搭建方式（在编辑器里新建 Prefab，内部结构如下）：
       *
       *   demo2dBatch (根节点)
       *   ├── Camera          ← 添加 Camera 组件，正交投影，orthoHeight=360，位置 (0,0,1000)
       *   ├── BatchRender     ← 添加 MeshRenderer + BatchRenderer2D 组件，拖入 batchUnlit 材质
       *   └── demo            ← 添加 demo2dBatch 组件，将 BatchRender 节点拖入 batchRenderer 属性
       *
       * 然后把做好的 Prefab 拖入本脚本的 demoBatch 属性即可。
       */
      var mainBatch = exports('mainBatch', (_dec = ccclass('mainBatch'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Slider), _dec5 = property(Slider), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(mainBatch, _Component);
        function mainBatch() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // ─── 核心：批量渲染 Demo 的 Prefab ───────────────────────
          _initializerDefineProperty(_this, "demoBatch", _descriptor, _assertThisInitialized(_this));
          /** 与 main.ts 一致：Demo 挂载的目标节点 */
          _initializerDefineProperty(_this, "demosNode", _descriptor2, _assertThisInitialized(_this));
          // ─── UI 控件 ──────────────────────────────────────────────
          _initializerDefineProperty(_this, "sbox", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sSphere", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxTxt", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sphereTxt", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speedTxt", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "totalTxt", _descriptor8, _assertThisInitialized(_this));
          // ─── 内部引用 ─────────────────────────────────────────────
          _this.currScene = null;
          _this.batchDemo = null;
          return _this;
        }
        var _proto = mainBatch.prototype;
        // ─── 生命周期 ─────────────────────────────────────────────
        _proto.start = function start() {
          var _this2 = this;
          setDisplayStats(true);
          Config.box = 0;
          Config.sphere = 0;
          Config.maxSpeed = 1.0;
          this._syncUI();
          this._loadDemo();

          // 定时刷新物体数量
          this.schedule(function () {
            if (_this2.totalTxt && _this2.batchDemo) {
              _this2.totalTxt.string = '' + _this2.batchDemo.objects.length;
            }
          }, 0.1);
        }

        // ─── UI 回调 ──────────────────────────────────────────────
        ;

        _proto.onBox = function onBox(event) {
          var max = Config.maxNum;
          var progress = event.progress;
          if (progress + Config.sphere >= 1) {
            Config.sphere = 1 - progress;
            if (this.sSphere) this.sSphere.progress = Config.sphere;
            if (this.sphereTxt) this.sphereTxt.string = 'sphere:' + Math.round(Config.sphere * max);
          }
          Config.box = progress;
          if (this.boxTxt) this.boxTxt.string = 'box:' + Math.round(progress * max);
        };
        _proto.onSphere = function onSphere(event) {
          var max = Config.maxNum;
          var progress = event.progress;
          if (progress + Config.box >= 1) {
            Config.box = 1 - progress;
            if (this.sbox) this.sbox.progress = Config.box;
            if (this.boxTxt) this.boxTxt.string = 'box:' + Math.round(Config.box * max);
          }
          Config.sphere = progress;
          if (this.sphereTxt) this.sphereTxt.string = 'sphere:' + Math.round(progress * max);
        };
        _proto.onSpeed = function onSpeed(event) {
          Config.maxSpeed = event.progress;
          if (this.speedTxt) this.speedTxt.string = 'speed:' + Math.round(event.progress * 100);
        };
        _proto.onRotation = function onRotation(event) {
          if (Config.isRotate === event.isChecked) return;
          Config.isRotate = event.isChecked;
          if (!this.batchDemo) return;
          if (Config.isRotate) this.batchDemo.randomRotation();else this.batchDemo.resetRotation();
        }

        // ─── 私有 ─────────────────────────────────────────────────
        ;

        _proto._loadDemo = function _loadDemo() {
          var _this3 = this;
          if (this.currScene) {
            this.currScene.removeFromParent();
            this.currScene.destroy();
            this.currScene = null;
            this.batchDemo = null;
          }
          if (!this.demoBatch) {
            console.warn('[mainBatch] demoBatch prefab is not set!');
            return;
          }
          this.currScene = instantiate(this.demoBatch);

          // 下一帧挂载，与 main.ts 保持一致
          this.scheduleOnce(function () {
            var _this3$demosNode;
            var target = (_this3$demosNode = _this3.demosNode) != null ? _this3$demosNode : _this3.node;
            target.addChild(_this3.currScene);

            // 找到 demo2dBatch 组件
            _this3.batchDemo = _this3.currScene.getComponentInChildren(demo2dBatch);
            if (!_this3.batchDemo) {
              console.warn('[mainBatch] demo2dBatch component not found in prefab!');
              return;
            }

            // 如果 Prefab 里的 demo2dBatch 没有手动绑定 batchRenderer，尝试自动查找
            if (!_this3.batchDemo.batchRenderer) {
              var br = _this3.currScene.getComponentInChildren(BatchRenderer2D);
              if (br) _this3.batchDemo.batchRenderer = br;
            }
          });
        };
        _proto._syncUI = function _syncUI() {
          var max = Config.maxNum;
          if (this.boxTxt) this.boxTxt.string = 'box:' + Math.round(Config.box * max);
          if (this.sphereTxt) this.sphereTxt.string = 'sphere:' + Math.round(Config.sphere * max);
          if (this.speedTxt) this.speedTxt.string = 'speed:' + Math.round(Config.maxSpeed * 100);
          if (this.sbox) this.sbox.progress = Config.box;
          if (this.sSphere) this.sSphere.progress = Config.sphere;
        };
        return mainBatch;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "demoBatch", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "demosNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sbox", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sSphere", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boxTxt", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sphereTxt", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "speedTxt", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "totalTxt", [_dec9], {
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

System.register("chunks:///_virtual/Maths.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "82bedpBhDZGm7EUB0uAnjUn", "Maths", undefined);
      var Line = exports('Line', function Line() {
        this.weight = 0.5;
        this.direction = void 0;
        this.point = void 0;
      });
      var Vector2 = exports('Vector2', /*#__PURE__*/function () {
        function Vector2(x, y) {
          if (x === void 0) {
            x = 0;
          }
          if (y === void 0) {
            y = 0;
          }
          this.x = void 0;
          this.y = void 0;
          this.x = x;
          this.y = y;
        }
        Vector2.multiply = function multiply(vector1, vector2) {
          return vector1.x * vector2.x + vector1.y * vector2.y;
        };
        Vector2.multiply2 = function multiply2(scalar, vector) {
          return new Vector2(vector.x * scalar, vector.y * scalar);
        };
        Vector2.division = function division(vector, scalar) {
          if (scalar == 0) scalar = 1;
          return new Vector2(vector.x / scalar, vector.y / scalar);
        };
        Vector2.subtract = function subtract(vector1, vector2) {
          return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
        };
        Vector2.addition = function addition(vector1, vector2) {
          return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
        };
        return Vector2;
      }());
      var RVOMath = exports('RVOMath', /*#__PURE__*/function () {
        function RVOMath() {}
        RVOMath.abs = function abs(vector) {
          return this.sqrt(this.absSq(vector));
        };
        RVOMath.absSq = function absSq(vector) {
          return Vector2.multiply(vector, vector);
        };
        RVOMath.normalize = function normalize(vector) {
          return Vector2.division(vector, this.abs(vector));
        };
        RVOMath.det = function det(vector1, vector2) {
          return vector1.x * vector2.y - vector1.y * vector2.x;
        };
        RVOMath.distSqPointLineSegment = function distSqPointLineSegment(vector1, vector2, vector3) {
          var r = Vector2.multiply(Vector2.subtract(vector3, vector1), Vector2.subtract(vector2, vector1)) / this.absSq(Vector2.subtract(vector2, vector1));
          if (r < 0) {
            return this.absSq(Vector2.subtract(vector3, vector1));
          }
          if (r > 1) {
            return this.absSq(Vector2.subtract(vector3, vector2));
          }
          return this.absSq(Vector2.subtract(vector3, Vector2.addition(vector1, Vector2.multiply2(r, Vector2.subtract(vector2, vector1)))));
        };
        RVOMath.fabs = function fabs(scalar) {
          return Math.abs(scalar);
        };
        RVOMath.leftOf = function leftOf(a, b, c) {
          return this.det(Vector2.subtract(a, c), Vector2.subtract(b, a));
        };
        RVOMath.sqr = function sqr(scalar) {
          return scalar * scalar;
        };
        RVOMath.sqrt = function sqrt(scalar) {
          return Math.sqrt(scalar);
        };
        RVOMath.transfromFloat = function transfromFloat(value) {
          return Math.floor(value * 10) / 10;
        };
        return RVOMath;
      }());
      RVOMath.RVO_EPSILON = 0.00001;
      RVOMath.RVO_POSITIVEINFINITY = 10000000000000;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Object.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collider.ts', './Shape.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ccenum, PhysicsSystem, Vec2, Vec3, UITransform, Node, Component, cCollider, ShapeType, cPolygon, cSphere, cBox;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ccenum = module.ccenum;
      PhysicsSystem = module.PhysicsSystem;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      cCollider = module.cCollider;
    }, function (module) {
      ShapeType = module.ShapeType;
      cPolygon = module.cPolygon;
      cSphere = module.cSphere;
      cBox = module.cBox;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
      cclegacy._RF.push({}, "f834eM8pElOqJ717Yz/Xt9+", "Object", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Trigger = exports('Trigger', /*#__PURE__*/function (Trigger) {
        Trigger[Trigger["default"] = 0] = "default";
        Trigger[Trigger["enter"] = 1] = "enter";
        Trigger[Trigger["stay"] = 2] = "stay";
        Trigger[Trigger["exit"] = 3] = "exit";
        return Trigger;
      }({}));
      var Dirty = exports('Dirty', /*#__PURE__*/function (Dirty) {
        Dirty[Dirty["R"] = 1] = "R";
        Dirty[Dirty["T"] = 2] = "T";
        Dirty[Dirty["S"] = 4] = "S";
        Dirty[Dirty["RTS"] = 7] = "RTS";
        Dirty[Dirty["RS"] = 5] = "RS";
        Dirty[Dirty["NON"] = 0] = "NON";
        return Dirty;
      }({}));

      // 物理对象接口，允许脱离 Node 的纯数据对象接入碰撞系统

      ccenum(ShapeType);
      var cObject = exports('cObject', (_dec = ccclass('cObject'), _dec2 = property({
        group: "Body"
      }), _dec3 = property({
        type: PhysicsSystem.PhysicsGroup,
        group: "Body"
      }), _dec4 = property({
        type: ShapeType,
        group: "Shape"
      }), _dec5 = property({
        group: "Shape"
      }), _dec6 = property({
        group: "Shape",
        visible: function visible() {
          return this.type == ShapeType.Box;
        }
      }), _dec7 = property({
        group: "Shape",
        visible: function visible() {
          return this.type == ShapeType.Sphere;
        }
      }), _dec8 = property({
        type: [Vec2],
        group: "Shape",
        visible: function visible() {
          return this.type == ShapeType.Polygon;
        }
      }), _dec9 = property({
        group: "Agent"
      }), _dec10 = property({
        min: 0.01,
        max: 1.0,
        step: 0.01,
        group: "Agent",
        visible: function visible() {
          return this.agent;
        }
      }), _dec11 = property({
        group: "Agent",
        visible: function visible() {
          return this.agent;
        }
      }), _dec12 = property({
        group: "Agent",
        visible: function visible() {
          return this.agent;
        }
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(cObject, _Component);
        function cObject() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "trigger", _descriptor, _assertThisInitialized(_this));
          //碰撞开关
          _initializerDefineProperty(_this, "group", _descriptor2, _assertThisInitialized(_this));
          //碰撞分组
          _initializerDefineProperty(_this, "type", _descriptor3, _assertThisInitialized(_this));
          //相交形状类型
          _initializerDefineProperty(_this, "center", _descriptor4, _assertThisInitialized(_this));
          //偏移位置，是shape相对node节点的中心偏移
          _initializerDefineProperty(_this, "size", _descriptor5, _assertThisInitialized(_this));
          //方块的长宽高
          _initializerDefineProperty(_this, "radius", _descriptor6, _assertThisInitialized(_this));
          //半径，sphere 或者 capsule
          _initializerDefineProperty(_this, "points", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "agent", _descriptor8, _assertThisInitialized(_this));
          //Agent开关
          _initializerDefineProperty(_this, "weight", _descriptor9, _assertThisInitialized(_this));
          //Agent 权值越小，穿透力越强
          _initializerDefineProperty(_this, "maxRadius", _descriptor10, _assertThisInitialized(_this));
          //Agent碰撞半径,小于等于物体体积
          _initializerDefineProperty(_this, "maxVelocity", _descriptor11, _assertThisInitialized(_this));
          //Agent 最大速度上限
          _this.tryVelocity = new Vec3();
          //最大期望速度
          _this.velocity = new Vec3();
          //当前实际速度
          _this.isDirty = Dirty.RTS;
          _this.shape = null;
          _this.body = null;
          return _this;
        }
        var _proto = cObject.prototype;
        _proto.onLoad = function onLoad() {
          //创建碰撞形状
          switch (this.type) {
            case ShapeType.Box:
              this.shape = new cBox(this.center, this.size);
              break;
            case ShapeType.Sphere:
              this.shape = new cSphere(this.center, this.radius);
              break;
            case ShapeType.Polygon:
              this.shape = new cPolygon(this.center, this.points);
              break;
          }

          //创建碰撞body容器
          this.body = cCollider.inst.create(this);
          this.body.shape = this.shape; //绑定碰撞形状
          this.body.group = this.group; //碰撞分组掩码
          this.body.isAgent = this.agent; // agent 检测开关
          this.body.weight = this.weight; // agent 避让优先级
          this.body.neighborDist = this.maxRadius; // agent 体积半径
          this.body.maxVelocity = this.maxVelocity; // agent 最大速度
          this.body.mask = PhysicsSystem.instance.collisionMatrix[this.group];

          //把body加入碰撞管理
          cCollider.inst.insert(this.body);
          this.isDirty = Dirty.RTS; //首次更新标记
        }

        //同步位置到body
        ;

        _proto.setPosition = function setPosition(position) {
          this.node.position = position;
          this.isDirty |= Dirty.T;
        }

        //同步旋转到body
        ;

        _proto.setRotation = function setRotation(rotation) {
          this.node.rotation = rotation;
          this.isDirty |= Dirty.R;
        }

        //同步缩放到body
        ;

        _proto.setScale = function setScale(scale) {
          this.node.scale = scale;
          this.isDirty |= Dirty.S;
        }

        //设置瞄点，2D专用
        ;

        _proto.setAnchor = function setAnchor(anchor) {
          var c0 = this.center;
          var c1 = this.shape.center;
          var uts = this.node.getComponent(UITransform);
          if (uts) {
            uts.anchorPoint = anchor;
            var s = uts.contentSize;
            c1.x = (0.5 - anchor.x) * s.width + c0.x;
            c1.y = (0.5 - anchor.y) * s.height + c0.y;
            this.isDirty |= Dirty.T;
          }
        };
        _proto.getRotation = function getRotation() {
          return this.node.worldRotation;
        };
        _proto.getPosition = function getPosition() {
          return this.node.worldPosition;
        };
        _proto.getScale = function getScale() {
          return this.node.worldScale;
        }

        //删除当前节点
        ;

        _proto.remove = function remove(retrieve) {
          if (retrieve === void 0) {
            retrieve = true;
          }
          //移除body, retrieve: 是否回收body ？
          cCollider.inst.remove(this.body, retrieve);

          //从父节点移除
          this.node.removeFromParent();

          //最后node用户自己控制回收和释放
          //this.remove().destroy() // 回收body，释放node
          //pool.push(this.remove(false)); //不回收body , 回收node

          return this.node;
        }

        //重新添加到父节点
        ;

        _proto.insert = function insert(parent) {
          //插入body, 强制更新body数据
          cCollider.inst.insert(this.body, true);

          //添加到父节点
          if (this.node.parent != parent) parent.addChild(this.node);
        };
        _proto.setAnimation = function setAnimation(name) {};
        _proto.setColor = function setColor(color) {};
        _proto.init = function init() {}

        //trigger 回调 enter,stay exit
        ;

        _proto.onTrigger = function onTrigger(b, trigger) {
          switch (trigger) {
            case Trigger.enter:
              //onTriggerEnter();
              break;
            case Trigger.stay:
              //onTriggerStay();
              break;
            case Trigger.exit:
              //onTriggerExit();
              break;
          }
        };
        _proto.hasChangeDirty = function hasChangeDirty() {
          var isDirty = this.isDirty;
          var flag = this.node.hasChangedFlags;
          if (flag) {
            if (flag & Node.TransformBit.POSITION) isDirty |= Dirty.T;
            if (flag & Node.TransformBit.ROTATION) isDirty |= Dirty.R;
            if (flag & Node.TransformBit.SCALE) isDirty |= Dirty.S;
          }
          this.isDirty = Dirty.NON;
          return isDirty;
        };
        _proto.onDestroy = function onDestroy() {
          cCollider.inst.remove(this.body, true);
          this.unscheduleAllCallbacks();
          this.shape = null;
          this.body = null;
        };
        return cObject;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "trigger", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "group", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PhysicsSystem.PhysicsGroup.DEFAULT;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ShapeType.Box;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "center", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "points", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "agent", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "weight", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "maxVelocity", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysBody.ts", ['cc', './Object.ts'], function (exports) {
  var cclegacy, Vec3, Quat, Dirty, Trigger;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Quat = module.Quat;
    }, function (module) {
      Dirty = module.Dirty;
      Trigger = module.Trigger;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e8f8f2+2VxFtYYgrdOXVZBp", "PhysBody", undefined);
      /**
       * 脱离 Cocos Node 的纯数据物理对象，实现 IPhysObject 接口，
       * 可直接注册进 cCollider 参与碰撞检测。
       */
      var PhysBody = exports('PhysBody', /*#__PURE__*/function () {
        function PhysBody() {
          this.position = new Vec3();
          this.rotation = new Quat();
          this.scale = new Vec3(1, 1, 1);
          this.velocity = new Vec3();
          this.tryVelocity = new Vec3();
          this.shape = null;
          this.trigger = true;
          this.isDirty = Dirty.RTS;
          this.body = null;
          /** 0 = box, 1 = sphere */
          this.type = 0;
          this.isHit = false;
          /**
           * 直接存 SpriteFrame.uv（8个浮点，4顶点×uv）。
           * 调用 BatchRenderer2D.getFrameUV(name) 赋值。
           * 为 null 时显示纯顶点色（无贴图）。
           */
          this.uv = null;
        }
        var _proto = PhysBody.prototype;
        _proto.getPosition = function getPosition() {
          return this.position;
        };
        _proto.getRotation = function getRotation() {
          return this.rotation;
        };
        _proto.getScale = function getScale() {
          return this.scale;
        };
        _proto.hasChangeDirty = function hasChangeDirty() {
          var d = this.isDirty;
          this.isDirty = Dirty.NON;
          return d;
        };
        _proto.setPosition = function setPosition(p) {
          this.position.set(p);
          this.isDirty |= Dirty.T;
        };
        _proto.setRotation = function setRotation(q) {
          this.rotation.set(q);
          this.isDirty |= Dirty.R;
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger !== Trigger.exit) {
            this.isHit = true;
          }
        };
        return PhysBody;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts', './bulletHell.ts', './gun.ts', './skill.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, Quat, Prefab, Input, Trigger, cObject, BulletHell, Gun, Skill;
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
      Prefab = module.Prefab;
      Input = module.Input;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }, function (module) {
      BulletHell = module.BulletHell;
    }, function (module) {
      Gun = module.Gun;
    }, function (module) {
      Skill = module.Skill;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "069bfPViMNIZohyngFLLVnE", "player", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Player = exports('Player', (_dec = ccclass('Player'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Player, _cObject);
        function Player() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "skill", _descriptor, _assertThisInitialized(_this));
          _this.guns = [];
          _this.velocity = new Vec3();
          return _this;
        }
        var _proto = Player.prototype;
        _proto.onLoad = function onLoad() {
          _cObject.prototype.onLoad.call(this);
          Player._inst = this;
        };
        _proto.start = function start() {
          var _this2 = this;
          //获取当前枪枝
          this.guns = this.node.getComponentsInChildren(Gun);

          //绑定摇杆回调
          var joystick = BulletHell.inst.joystick;
          if (joystick) {
            joystick.init(function (event) {
              var angle = event.angle;
              var ratio = event.ratio;
              switch (event.type) {
                case Input.EventType.TOUCH_START:
                  _this2.velocity.set(Vec3.ZERO);
                  break;
                case Input.EventType.TOUCH_MOVE:
                  _this2.velocity.set(Math.cos(angle), Math.sin(angle), 0);
                  _this2.velocity.multiplyScalar(_this2.maxVelocity * ratio);
                  break;
                case Input.EventType.TOUCH_END:
                  _this2.velocity.set(Vec3.ZERO);
                  break;
              }
            });
          }
        };
        _proto.update = function update(dt) {
          //计算新位置
          var pos = this.getPosition();
          var velocity = this.velocity;
          tempPos.x = pos.x + velocity.x * dt;
          tempPos.y = pos.y + velocity.y * dt;
          tempPos.z = pos.z + velocity.z * dt;
          this.setPosition(tempPos);
        };
        _proto.onAttack = function onAttack(b) {
          //进入攻击范围
          var guns = this.guns;
          var length = guns.length;
          for (var i = 0; i < length; i++) {
            var postion = b.getCenter();
            guns[i].shoot(postion);
          }
        };
        _proto.onSkill = function onSkill() {
          var angle = Math.random() * Math.PI * 2;
          for (var i = 0; i < 3; i++) {
            var parent = BulletHell.inst.bullets;
            var skill = Skill.get(this.skill);
            skill.insert(parent);
            skill.init();
            Vec3.subtract(tempPos, this.node.worldPosition, parent.worldPosition);
            skill.setPosition(tempPos);

            //发射速度和生命时长
            var speed = 300;
            angle += Math.PI * 2 / 3;
            var x = Math.cos(angle),
              y = Math.sin(angle);
            skill.velocity.set(x, y, 0).multiplyScalar(speed);
            skill.angle = 0;
            skill.lifeTime = 3;
          }
        };
        _proto.onCollect = function onCollect(b) {
          //进入拾取范围
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          //碰撞到敌方
          //自行扣血或者死亡
        };

        _createClass(Player, null, [{
          key: "inst",
          get: function get() {
            return this._inst;
          }
        }]);
        return Player;
      }(cObject), _class3._inst = null, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "skill", [_dec2], {
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

System.register("chunks:///_virtual/SAPBroadPhase.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2bbd0+toU9LMJ7gKq+up7WT", "SAPBroadPhase", undefined);
      var SAPBroadPhase = exports('SAPBroadPhase', /*#__PURE__*/function () {
        function SAPBroadPhase() {
          this.axis = -1;
          this.isDirty = false;
          this.sorted = [];
        }
        var _proto = SAPBroadPhase.prototype;
        _proto.update = function update(bodys, pairsOut) {
          this.sorted = bodys;
          this._rebuild();
          var axis = this.axis;
          var n = axis >> 2 & 0x3;
          var m = axis >> 4 & 0x3;
          var N = bodys.length;
          var p = pairsOut.length; // 追加到已有内容之后

          for (var i = 0; i < N; i++) {
            var bi = bodys[i];
            var A = bi.aabb;
            var an = A[n];
            var am = A[m];
            var upper = bi.upper;
            for (var j = i + 1; j < N; j++) {
              var bj = bodys[j];
              if (upper <= bj.lower) break;
              var B = bj.aabb;
              if (an > B[n + 3] || B[n] > A[n + 3] || am > B[m + 3] || B[m] > A[m + 3]) continue;

              // 约定 id 大的在前
              if (bi.id > bj.id) {
                pairsOut[p++] = bi;
                pairsOut[p++] = bj;
              } else {
                pairsOut[p++] = bj;
                pairsOut[p++] = bi;
              }
            }
          }
        };
        _proto.reset = function reset() {
          this.axis = -1;
          this.isDirty = false;
          this.sorted = [];
        };
        _proto._rebuild = function _rebuild() {
          var newAxis = this._calcAxis();
          var change = (newAxis & 0x3) !== (this.axis & 0x3) || this.axis < 0;
          if (change) this.axis = newAxis;
          if (change || this.isDirty) {
            this.isDirty = false;
            var axis = this.axis & 0x3;
            var bodys = this.sorted;
            for (var i = 0, N = bodys.length; i < N; i++) {
              var b = bodys[i];
              b.lower = b.aabb[axis];
              b.upper = b.aabb[axis + 3];
            }
            if (change) bodys.sort(function (a, b) {
              return a.lower - b.lower;
            });else this._insertSort(bodys);
          }
        };
        _proto._insertSort = function _insertSort(a) {
          for (var i = 1, l = a.length; i < l; i++) {
            var v = a[i];
            var lower = v.lower;
            var j = i - 1;
            for (; j >= 0; j--) {
              if (a[j].lower <= lower) break;
              a[j + 1] = a[j];
            }
            if (j + 1 !== i) a[j + 1] = v;
          }
        };
        _proto._calcAxis = function _calcAxis() {
          var bodys = this.sorted;
          var N = bodys.length;
          if (N === 0) return 0;
          var sumX = 0,
            sumX2 = 0,
            sumY = 0,
            sumY2 = 0,
            sumZ = 0,
            sumZ2 = 0;
          var x = 0,
            y = 0,
            z = 0;
          var dirty = false;
          for (var i = 0; i < N; i++) {
            var body = bodys[i];
            if (body.updateBound()) dirty = true;
            var s = body.aabb;
            var sx = s[3] - s[0],
              sy = s[4] - s[1],
              sz = s[5] - s[2];
            x += sx * sx;
            y += sy * sy;
            z += sz * sz;
            var cX = (s[3] + s[0]) * 0.5;
            sumX += cX;
            sumX2 += cX * cX;
            var cY = (s[4] + s[1]) * 0.5;
            sumY += cY;
            sumY2 += cY * cY;
            var cZ = (s[5] + s[2]) * 0.5;
            sumZ += cZ;
            sumZ2 += cZ * cZ;
          }
          this.isDirty = dirty;
          var inv = 1.0 / N;
          x = x > 0 ? N / x : 0;
          y = y > 0 ? N / y : 0;
          z = z > 0 ? N / z : 0;
          var X = (sumX2 - sumX * sumX * inv) * x;
          var Y = (sumY2 - sumY * sumY * inv) * y;
          var Z = (sumZ2 - sumZ * sumZ * inv) * z;
          if (X === 0) X = x;
          if (Y === 0) Y = y;
          if (Z === 0) Z = z;
          var axis = 0;
          if (X > Y) {
            if (X > Z) {
              axis = 0;
              axis |= Y > Z ? 1 << 2 | 2 << 4 : 1 << 4 | 2 << 2;
            } else {
              axis = 2;
              axis |= X > Y ? 0 << 2 | 1 << 4 : 0 << 4 | 1 << 2;
            }
          } else if (Y > Z) {
            axis = 1;
            axis |= X > Z ? 0 << 2 | 2 << 4 : 0 << 4 | 2 << 2;
          } else {
            axis = 2;
            axis |= X > Y ? 0 << 2 | 1 << 4 : 0 << 4 | 1 << 2;
          }
          return axis;
        };
        return SAPBroadPhase;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Shape.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AILib.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Vec3, Vec2, obbIntersect, sphereAABBDistance, sphereOBBDistance, Intersection2D;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
    }, function (module) {
      obbIntersect = module.obbIntersect;
      sphereAABBDistance = module.sphereAABBDistance;
      sphereOBBDistance = module.sphereOBBDistance;
      Intersection2D = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "83d94jbLnZF7oVs2WQ1jJK+", "Shape", undefined);
      var ShapeType = exports('ShapeType', /*#__PURE__*/function (ShapeType) {
        ShapeType[ShapeType["Box"] = 1] = "Box";
        ShapeType[ShapeType["Sphere"] = 2] = "Sphere";
        ShapeType[ShapeType["Polygon"] = 4] = "Polygon";
        return ShapeType;
      }({})); //AI TODO
      var cShape = exports('cShape', /*#__PURE__*/function () {
        function cShape(center, type) {
          this.radius = 0;
          this.height = 0;
          this.type = ShapeType.Box;
          this.point2Ds = [];
          this.size = {
            x: 0,
            y: 0,
            z: 0
          };
          this.scale = {
            x: 1,
            y: 1,
            z: 1
          };
          this.center = {
            x: 0,
            y: 0,
            z: 0
          };
          this.aabb = [0, 0, 0, 0, 0, 0];
          this.type = type;
          // this.isDirty = true;
          this.center.x = center.x;
          this.center.y = center.y;
          this.center.z = center.z;
        }
        var _proto = cShape.prototype;
        _proto.updateAABB = function updateAABB(scale, world, isIdentity) {
          if (isIdentity === void 0) {
            isIdentity = true;
          }
          var size = this.size;
          var center = this.center;
          var sx = scale.x,
            sy = scale.y,
            sz = scale.z;
          var cx = center.x,
            cy = center.y,
            cz = center.z;
          var x = size.x * 0.5,
            y = size.y * 0.5,
            z = size.z * 0.5;
          var aabb = this.aabb;
          if (!isIdentity) {
            var uX = world.m00 * sx,
              uY = world.m01 * sx,
              uZ = world.m02 * sx;
            var vX = world.m03 * sy,
              vY = world.m04 * sy,
              vZ = world.m05 * sy;
            var wX = world.m06 * sz,
              wY = world.m07 * sz,
              wZ = world.m08 * sz;

            // 计算新的中心点
            var cX = uX * cx + vX * cy + wX * cz;
            var cY = uY * cx + vY * cy + wY * cz;
            var cZ = uZ * cx + vZ * cy + wZ * cz;

            // 计算新的包围盒宽度、高度和深度
            var absU = Math.abs(uX) * x + Math.abs(vX) * y + Math.abs(wX) * z;
            var absV = Math.abs(uY) * x + Math.abs(vY) * y + Math.abs(wY) * z;
            var absW = Math.abs(uZ) * x + Math.abs(vZ) * y + Math.abs(wZ) * z;

            // 计算新的最小和最大顶点
            aabb[0] = cX - absU, aabb[1] = cY - absV, aabb[2] = cZ - absW;
            aabb[3] = cX + absU, aabb[4] = cY + absV, aabb[5] = cZ + absW;
          } else {
            x = Math.abs(x * sx);
            y = Math.abs(y * sy);
            z = Math.abs(z * sz);
            aabb[0] = cx * sx - x;
            aabb[1] = cy * sy - y;
            aabb[2] = cz * sz - z;
            aabb[3] = cx * sx + x;
            aabb[4] = cy * sy + y;
            aabb[5] = cz * sz + z;
          }
          return aabb;
        };
        return cShape;
      }());
      var cBox = exports('cBox', /*#__PURE__*/function (_cShape) {
        _inheritsLoose(cBox, _cShape);
        function cBox(center, size) {
          var _this;
          _this = _cShape.call(this, center, ShapeType.Box) || this;
          _this.size.x = size.x;
          _this.size.y = size.y;
          _this.size.z = size.z;

          //2d 多边形, 点队列
          var points = _this.point2Ds;
          points[0] = new Vec2(-size.x / 2, size.y / 2);
          points[1] = new Vec2(size.x / 2, size.y / 2);
          points[2] = new Vec2(size.x / 2, -size.y / 2);
          points[3] = new Vec2(-size.x / 2, -size.y / 2);
          return _this;
        }
        return cBox;
      }(cShape));
      var cSphere = exports('cSphere', /*#__PURE__*/function (_cShape2) {
        _inheritsLoose(cSphere, _cShape2);
        function cSphere(center, radius) {
          var _this2;
          _this2 = _cShape2.call(this, center, ShapeType.Sphere) || this;
          _this2.radius = radius;
          _this2.size.x = radius * 2;
          _this2.size.y = radius * 2;
          _this2.size.z = radius * 2;
          return _this2;
        }
        return cSphere;
      }(cShape));

      //默认y轴竖向
      var cPolygon = exports('cPolygon', /*#__PURE__*/function (_cShape3) {
        _inheritsLoose(cPolygon, _cShape3);
        function cPolygon(center, points) {
          var _this3;
          _this3 = _cShape3.call(this, center, ShapeType.Polygon) || this;

          //2d 多边形, 点队列
          _this3.point2Ds = points;
          var minX = points[0].x;
          var minY = points[0].y;
          var maxX = minX,
            maxY = minY;
          var length = points.length;
          for (var i = 1; i < length; i++) {
            var x = points[i].x;
            var y = points[i].y;
            if (minX >= x) minX = x;else if (maxX <= x) maxX = x;
            if (minY >= y) minY = y;else if (maxY <= y) maxY = y;
          }
          _this3.size.x = maxX - minX;
          _this3.size.y = maxY - minY;
          _this3.size.z = 0;
          return _this3;
        }
        return cPolygon;
      }(cShape));
      var center = new Vec3();
      var center2 = new Vec2();
      var ShapeSupport = exports('ShapeSupport', []);
      ShapeSupport[ShapeType.Box | ShapeType.Box] = function (a, b) {
        //a,b 没有旋转,已进行AABB处理 , 直接返回 true
        if (a.isIdentity && b.isIdentity) return true;
        return obbIntersect(a.getCenter(), a.getHalfSize(), a.getRotMat3(), b.getCenter(), b.getHalfSize(), b.getRotMat3());
      };
      ShapeSupport[ShapeType.Box | ShapeType.Sphere] = function (a, b) {
        //a没有旋转当AABB处理 
        if (a.isIdentity) {
          // 转换到 aabb 坐标系下
          Vec3.subtract(center, b.getCenter(), a.getCenter());
          return sphereAABBDistance(center, b.getRaidus(), a.getHalfSize());
        }
        return sphereOBBDistance(b.getCenter(), b.getRaidus(), a.getCenter(), a.getRotation(), a.getHalfSize());
      };
      ShapeSupport[ShapeType.Sphere | ShapeType.Sphere] = function (a, b) {
        var ca = a.getCenter();
        var cb = b.getCenter();
        Vec3.subtract(center, ca, cb);
        var lengthSqr = center.lengthSqr();
        var radii = a.getRaidus() + b.getRaidus();
        return lengthSqr <= radii * radii;
      };
      ShapeSupport[ShapeType.Box | ShapeType.Polygon] = function (a, b) {
        //AI TODO
        return Intersection2D.polygonPolygon(a.getPoints(), b.getPoints());
      };
      ShapeSupport[ShapeType.Sphere | ShapeType.Polygon] = function (a, b) {
        //AI TODO
        var ca = a.getCenter();
        var radius = a.getRaidus();
        center2.x = ca.x, center2.y = ca.y;
        return Intersection2D.polygonCircle(b.getPoints(), center2, radius);
      };
      ShapeSupport[ShapeType.Polygon | ShapeType.Polygon] = function (a, b) {
        //AI TODO
        return Intersection2D.polygonPolygon(a.getPoints(), b.getPoints());
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/skill.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, instantiate, Trigger, cObject;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      instantiate = module.instantiate;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "2fedeWZKpxDbopwo7jBz3Ko", "skill", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var Skill = exports('Skill', (_dec = ccclass('Skill'), _dec(_class = (_class2 = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Skill, _cObject);
        function Skill() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          //生命周期，回收时间
          _this.lifeTime = 0;
          //attack: number = 0;
          _this.angle = 0;
          return _this;
        }
        Skill.get = function get(prefab) {
          var skill = this.pools.pop();
          if (!skill) {
            var node = instantiate(prefab);
            skill = node.getComponent(Skill);
          }
          return skill;
        };
        Skill.put = function put(skill) {
          //压入缓存池管理节点
          this.pools.push(skill);
          //移除node不回收body
          skill.remove(false);
        };
        var _proto = Skill.prototype;
        _proto.update = function update(dt) {
          this.lifeTime -= dt;
          if (this.lifeTime < 0) {
            //生命周期回收
            Skill.put(this);
            return;
          }

          //计算新位置
          var pos = this.getPosition();
          var velocity = this.velocity;
          tempPos.x = pos.x + velocity.x * dt;
          tempPos.y = pos.y + velocity.y * dt;
          tempPos.z = pos.z + velocity.z * dt;
          this.angle += dt * 60 * 60;
          Quat.fromEuler(tempRot, 0, 0, this.angle);
          this.setRotation(tempRot); //更新节点旋转

          this.setPosition(tempPos);
        };
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          //击中回收子弹
          //Skill.put(this);
          //播放爆炸特效
          //.........
        };

        return Skill;
      }(cObject), _class2.pools = [], _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/snailTail.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts', './enemy.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, instantiate, Trigger, Enemy;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      instantiate = module.instantiate;
    }, function (module) {
      Trigger = module.Trigger;
    }, function (module) {
      Enemy = module.Enemy;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "d2a8aUstylHNbyhzHGRhhbK", "snailTail", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tempPos = new Vec3();
      var tempRot = new Quat();
      var SnailTail = exports('SnailTail', (_dec = ccclass('SnailTail'), _dec(_class = (_class2 = /*#__PURE__*/function (_Enemy) {
        _inheritsLoose(SnailTail, _Enemy);
        function SnailTail() {
          return _Enemy.apply(this, arguments) || this;
        }
        SnailTail.get = function get(prefab) {
          var snailtail = this.pools.pop();
          if (!snailtail) {
            var node = instantiate(prefab);
            snailtail = node.getComponent(SnailTail);
          }
          return snailtail;
        };
        SnailTail.put = function put(snailtail) {
          //压入缓存池管理节点
          this.pools.push(snailtail);
          //移除node不回收body
          snailtail.remove(false);
        };
        var _proto = SnailTail.prototype;
        _proto.onTrigger = function onTrigger(b, trigger) {
          if (trigger == Trigger.exit) return;
          switch (b.group) {
            case this.BULLET:
              //碰到子弹
              break;
            case this.PLAYER:
              //碰到player
              break;
          }

          //碰撞自我加收
          SnailTail.put(this);

          //播放死亡特效
          //.........
        };

        return SnailTail;
      }(Enemy), _class2.pools = [], _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Sprite2d.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, Color, Trigger, cObject;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Color = module.Color;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a1d56boT3VNfoNbbf/ozJuZ", "Sprite2d", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Sprite2d = exports('Sprite2d', (_dec = ccclass('Sprite2d'), _dec(_class = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Sprite2d, _cObject);
        function Sprite2d() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          _this.sprite = null;
          _this.isHit = false;
          return _this;
        }
        var _proto = Sprite2d.prototype;
        _proto.start = function start() {
          this.sprite = this.node.getComponent(Sprite);
        };
        _proto.setColor = function setColor(color) {
          if (this.sprite) this.sprite.color = color;
        };
        _proto.update = function update(dt) {
          this.setColor(this.isHit ? Color.GREEN : Color.WHITE);
          this.isHit = false;
        }

        // remove(): void {
        //     super.remove();
        //     //如需要改善性能，自行回收到内存池
        //     this.node.removeFromParent();
        //     this.node.destroy();
        // }
        ;

        _proto.onTrigger = function onTrigger(b, trigger) {
          var isHit = trigger != Trigger.exit;
          if (isHit && !this.isHit) {
            this.isHit = isHit;
          }
        };
        return Sprite2d;
      }(cObject)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Sprite3d.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Object.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, MeshRenderer, Color, Trigger, cObject;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      MeshRenderer = module.MeshRenderer;
      Color = module.Color;
    }, function (module) {
      Trigger = module.Trigger;
      cObject = module.cObject;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "56ae8Cu2nlC9o6PKDYcYpcB", "Sprite3d", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Sprite3d = exports('Sprite3d', (_dec = ccclass('Sprite3d'), _dec(_class = /*#__PURE__*/function (_cObject) {
        _inheritsLoose(Sprite3d, _cObject);
        function Sprite3d() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _cObject.call.apply(_cObject, [this].concat(args)) || this;
          _this.isHit = false;
          _this.color = new Color();
          _this.sprite = null;
          _this.colorData = new Float32Array(4);
          return _this;
        }
        var _proto = Sprite3d.prototype;
        _proto.start = function start() {
          this.sprite = this.node.getComponent(MeshRenderer);
          this.sprite.model["_worldBounds"] = null;
          this.setColor(Color.WHITE);
        };
        _proto.setColor = function setColor(color) {
          if (this.sprite) {
            if (!this.color.equals(color)) {
              var data = this.colorData;
              data[0] = color.r / 255.0;
              data[1] = color.g / 255.0;
              data[2] = color.b / 255.0;
              data[3] = color.a / 255.0;
              this.sprite.setInstancedAttribute("i_color", this.colorData);
            }
          }
        };
        _proto.update = function update(dt) {
          this.setColor(this.isHit ? Color.GREEN : Color.WHITE);
          this.isHit = false;
        }

        // remove(): void {
        //     super.remove();
        //     //如需要改善性能，自行回收到内存池
        //     this.node.removeFromParent();
        //     this.node.destroy();
        // }
        ;

        _proto.onTrigger = function onTrigger(b, trigger) {
          var isHit = trigger != Trigger.exit;
          if (isHit && !this.isHit) {
            this.isHit = isHit;
          }
        };
        return Sprite3d;
      }(cObject)) || _class));
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