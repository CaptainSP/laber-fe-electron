/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/face-api.js@0.22.2/build/es6/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import * as t from "/npm/@tensorflow/tfjs-core@1.7.0/+esm";
export { t as tf };
import {
  __extends as e,
  __spreadArrays as n,
  __assign as r,
  __awaiter as o,
  __generator as i,
} from "/npm/tslib@1.14.1/+esm";
function a(t, e, n) {
  if (
    (void 0 === n && (n = !1),
    t.beginPath(),
    e.slice(1).forEach(function (n, r) {
      var o = n.x,
        i = n.y,
        a = e[r];
      t.moveTo(a.x, a.y), t.lineTo(o, i);
    }),
    n)
  ) {
    var r = e[e.length - 1],
      o = e[0];
    if (!r || !o) return;
    t.moveTo(r.x, r.y), t.lineTo(o.x, o.y);
  }
  t.stroke();
}
var s = (function () {
  function t(t, e) {
    if (!w(t) || !w(e))
      throw new Error(
        "Dimensions.constructor - expected width and height to be valid numbers, instead have " +
          JSON.stringify({ width: t, height: e })
      );
    (this._width = t), (this._height = e);
  }
  return (
    Object.defineProperty(t.prototype, "width", {
      get: function () {
        return this._width;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "height", {
      get: function () {
        return this._height;
      },
      enumerable: !0,
      configurable: !0,
    }),
    (t.prototype.reverse = function () {
      return new t(1 / this.width, 1 / this.height);
    }),
    t
  );
})();
function c(e, n) {
  return e instanceof t.Tensor && e.shape.length === n;
}
function u(t) {
  return c(t, 2);
}
function h(t) {
  return c(t, 3);
}
function f(t) {
  return c(t, 4);
}
function p(t) {
  return t % 1 != 0;
}
function l(t) {
  return t % 2 == 0;
}
function d(t, e) {
  void 0 === e && (e = 2);
  var n = Math.pow(10, e);
  return Math.floor(t * n) / n;
}
function v(t) {
  return t && t.width && t.height;
}
function m(t, e) {
  var n = t.width,
    r = t.height,
    o = e / Math.max(r, n);
  return new s(Math.round(n * o), Math.round(r * o));
}
function g(t) {
  return t
    .reduce(function (t, e) {
      return t.add(e);
    }, new x(0, 0))
    .div(new x(t.length, t.length));
}
function b(t, e, n) {
  return Array(t)
    .fill(0)
    .map(function (t, r) {
      return e + r * n;
    });
}
function w(t) {
  return (!!t && t !== 1 / 0 && t !== -1 / 0 && !isNaN(t)) || 0 === t;
}
function y(t) {
  return w(t) && 0 <= t && t <= 1;
}
var _ = Object.freeze({
    __proto__: null,
    isTensor: c,
    isTensor1D: function (t) {
      return c(t, 1);
    },
    isTensor2D: u,
    isTensor3D: h,
    isTensor4D: f,
    isFloat: p,
    isEven: l,
    round: d,
    isDimensions: v,
    computeReshapedDimensions: m,
    getCenterPoint: g,
    range: b,
    isValidNumber: w,
    isValidProbablitiy: y,
  }),
  x = (function () {
    function t(t, e) {
      (this._x = t), (this._y = e);
    }
    return (
      Object.defineProperty(t.prototype, "x", {
        get: function () {
          return this._x;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "y", {
        get: function () {
          return this._y;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.add = function (e) {
        return new t(this.x + e.x, this.y + e.y);
      }),
      (t.prototype.sub = function (e) {
        return new t(this.x - e.x, this.y - e.y);
      }),
      (t.prototype.mul = function (e) {
        return new t(this.x * e.x, this.y * e.y);
      }),
      (t.prototype.div = function (e) {
        return new t(this.x / e.x, this.y / e.y);
      }),
      (t.prototype.abs = function () {
        return new t(Math.abs(this.x), Math.abs(this.y));
      }),
      (t.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
      }),
      (t.prototype.floor = function () {
        return new t(Math.floor(this.x), Math.floor(this.y));
      }),
      t
    );
  })(),
  P = (function () {
    function t(e, n) {
      void 0 === n && (n = !0);
      var r = e || {},
        o = [r.left, r.top, r.right, r.bottom].every(w),
        i = [r.x, r.y, r.width, r.height].every(w);
      if (!i && !o)
        throw new Error(
          "Box.constructor - expected box to be IBoundingBox | IRect, instead have " +
            JSON.stringify(r)
        );
      var a = i
          ? [r.x, r.y, r.width, r.height]
          : [r.left, r.top, r.right - r.left, r.bottom - r.top],
        s = a[0],
        c = a[1],
        u = a[2],
        h = a[3];
      t.assertIsValidBox(
        { x: s, y: c, width: u, height: h },
        "Box.constructor",
        n
      ),
        (this._x = s),
        (this._y = c),
        (this._width = u),
        (this._height = h);
    }
    return (
      (t.isRect = function (t) {
        return !!t && [t.x, t.y, t.width, t.height].every(w);
      }),
      (t.assertIsValidBox = function (e, n, r) {
        if ((void 0 === r && (r = !1), !t.isRect(e)))
          throw new Error(
            n +
              " - invalid box: " +
              JSON.stringify(e) +
              ", expected object with properties x, y, width, height"
          );
        if (!r && (e.width < 0 || e.height < 0))
          throw new Error(
            n +
              " - width (" +
              e.width +
              ") and height (" +
              e.height +
              ") must be positive numbers"
          );
      }),
      Object.defineProperty(t.prototype, "x", {
        get: function () {
          return this._x;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "y", {
        get: function () {
          return this._y;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "width", {
        get: function () {
          return this._width;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "height", {
        get: function () {
          return this._height;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "left", {
        get: function () {
          return this.x;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "top", {
        get: function () {
          return this.y;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "right", {
        get: function () {
          return this.x + this.width;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "bottom", {
        get: function () {
          return this.y + this.height;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "area", {
        get: function () {
          return this.width * this.height;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "topLeft", {
        get: function () {
          return new x(this.left, this.top);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "topRight", {
        get: function () {
          return new x(this.right, this.top);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "bottomLeft", {
        get: function () {
          return new x(this.left, this.bottom);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "bottomRight", {
        get: function () {
          return new x(this.right, this.bottom);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.round = function () {
        var e = [this.x, this.y, this.width, this.height].map(function (t) {
          return Math.round(t);
        });
        return new t({ x: e[0], y: e[1], width: e[2], height: e[3] });
      }),
      (t.prototype.floor = function () {
        var e = [this.x, this.y, this.width, this.height].map(function (t) {
          return Math.floor(t);
        });
        return new t({ x: e[0], y: e[1], width: e[2], height: e[3] });
      }),
      (t.prototype.toSquare = function () {
        var e = this,
          n = e.x,
          r = e.y,
          o = e.width,
          i = e.height,
          a = Math.abs(o - i);
        return (
          o < i && ((n -= a / 2), (o += a)),
          i < o && ((r -= a / 2), (i += a)),
          new t({ x: n, y: r, width: o, height: i })
        );
      }),
      (t.prototype.rescale = function (e) {
        var n = v(e) ? e.width : e,
          r = v(e) ? e.height : e;
        return new t({
          x: this.x * n,
          y: this.y * r,
          width: this.width * n,
          height: this.height * r,
        });
      }),
      (t.prototype.pad = function (e, n) {
        var r = [
          this.x - e / 2,
          this.y - n / 2,
          this.width + e,
          this.height + n,
        ];
        return new t({ x: r[0], y: r[1], width: r[2], height: r[3] });
      }),
      (t.prototype.clipAtImageBorders = function (e, n) {
        var r = this,
          o = r.x,
          i = r.y,
          a = r.right,
          s = r.bottom,
          c = Math.max(o, 0),
          u = Math.max(i, 0),
          h = a - c,
          f = s - u;
        return new t({
          x: c,
          y: u,
          width: Math.min(h, e - c),
          height: Math.min(f, n - u),
        }).floor();
      }),
      (t.prototype.shift = function (e, n) {
        var r = this.width,
          o = this.height;
        return new t({ x: this.x + e, y: this.y + n, width: r, height: o });
      }),
      (t.prototype.padAtBorders = function (t, e) {
        var n = this.width + 1,
          r = this.height + 1,
          o = n,
          i = r,
          a = this.left,
          s = this.top,
          c = this.right,
          u = this.bottom;
        return (
          c > e && ((o = -c + e + n), (c = e)),
          u > t && ((i = -u + t + r), (u = t)),
          a < 1 && ((i = 2 - a), (a = 1)),
          s < 1 && ((i = 2 - s), (s = 1)),
          { dy: 1, edy: i, dx: 1, edx: o, y: s, ey: u, x: a, ex: c, w: n, h: r }
        );
      }),
      (t.prototype.calibrate = function (e) {
        return new t({
          left: this.left + e.left * this.width,
          top: this.top + e.top * this.height,
          right: this.right + e.right * this.width,
          bottom: this.bottom + e.bottom * this.height,
        })
          .toSquare()
          .round();
      }),
      t
    );
  })(),
  E = (function (t) {
    function n(e, n, r, o, i) {
      return (
        void 0 === i && (i = !1),
        t.call(this, { left: e, top: n, right: r, bottom: o }, i) || this
      );
    }
    return e(n, t), n;
  })(P),
  M = (function () {
    function t(t, e, n, r, o) {
      (this._imageDims = new s(o.width, o.height)),
        (this._score = t),
        (this._classScore = e),
        (this._className = n),
        (this._box = new P(r).rescale(this._imageDims));
    }
    return (
      Object.defineProperty(t.prototype, "score", {
        get: function () {
          return this._score;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "classScore", {
        get: function () {
          return this._classScore;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "className", {
        get: function () {
          return this._className;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "box", {
        get: function () {
          return this._box;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "imageDims", {
        get: function () {
          return this._imageDims;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "imageWidth", {
        get: function () {
          return this.imageDims.width;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "imageHeight", {
        get: function () {
          return this.imageDims.height;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "relativeBox", {
        get: function () {
          return new P(this._box).rescale(this.imageDims.reverse());
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.forSize = function (e, n) {
        return new t(
          this.score,
          this.classScore,
          this.className,
          this.relativeBox,
          { width: e, height: n }
        );
      }),
      t
    );
  })(),
  F = (function (t) {
    function n(e, n, r) {
      return t.call(this, e, e, "", n, r) || this;
    }
    return (
      e(n, t),
      (n.prototype.forSize = function (e, r) {
        var o = t.prototype.forSize.call(this, e, r);
        return new n(o.score, o.relativeBox, o.imageDims);
      }),
      n
    );
  })(M);
function T(t, e, n) {
  void 0 === n && (n = !0);
  var r =
    Math.max(0, Math.min(t.right, e.right) - Math.max(t.left, e.left)) *
    Math.max(0, Math.min(t.bottom, e.bottom) - Math.max(t.top, e.top));
  return n ? r / (t.area + e.area - r) : r / Math.min(t.area, e.area);
}
function D(t) {
  var e = t.map(function (t) {
      return t.x;
    }),
    n = t.map(function (t) {
      return t.y;
    }),
    r = e.reduce(function (t, e) {
      return e < t ? e : t;
    }, 1 / 0),
    o = n.reduce(function (t, e) {
      return e < t ? e : t;
    }, 1 / 0),
    i = e.reduce(function (t, e) {
      return t < e ? e : t;
    }, 0),
    a = n.reduce(function (t, e) {
      return t < e ? e : t;
    }, 0);
  return new E(r, o, i, a);
}
function S(t, e, n, r) {
  void 0 === r && (r = !0);
  for (
    var o = e
        .map(function (t, e) {
          return { score: t, boxIndex: e };
        })
        .sort(function (t, e) {
          return t.score - e.score;
        })
        .map(function (t) {
          return t.boxIndex;
        }),
      i = [],
      a = function () {
        var e = o.pop();
        i.push(e);
        for (var a = o, s = [], c = 0; c < a.length; c++) {
          var u = a[c],
            h = t[e],
            f = t[u];
          s.push(T(h, f, r));
        }
        o = o.filter(function (t, e) {
          return s[e] <= n;
        });
      };
    o.length > 0;

  )
    a();
  return i;
}
function C(e, r) {
  return t.tidy(function () {
    var o = r[0],
      i = r[1],
      a = r[2],
      s = t.fill(n(e.shape.slice(0, 3), [1]), o),
      c = t.fill(n(e.shape.slice(0, 3), [1]), i),
      u = t.fill(n(e.shape.slice(0, 3), [1]), a),
      h = t.concat([s, c, u], 3);
    return t.sub(e, h);
  });
}
function k(e, n) {
  return (
    void 0 === n && (n = !1),
    t.tidy(function () {
      var r = e.shape.slice(1),
        o = r[0],
        i = r[1];
      if (o === i) return e;
      var a = Math.abs(o - i),
        s = Math.round(a * (n ? 0.5 : 1)),
        c = o > i ? 2 : 1,
        u = function (n) {
          var r = e.shape.slice();
          return (r[c] = n), t.fill(r, 0);
        },
        h = u(s),
        f = a - h.shape[c],
        p = [n && f ? u(f) : null, e, h]
          .filter(function (t) {
            return !!t;
          })
          .map(function (t) {
            return t.toFloat();
          });
      return t.concat(p, c);
    })
  );
}
function O(t) {
  for (var e = t.slice(), n = e.length - 1; n > 0; n--) {
    var r = Math.floor(Math.random() * (n + 1)),
      o = e[n];
    (e[n] = e[r]), (e[r] = o);
  }
  return e;
}
function I(t) {
  return 1 / (1 + Math.exp(-t));
}
function L(t) {
  return Math.log(t / (1 - t));
}
var A = (function (t) {
    function n(e, n, r, o, i) {
      return (
        void 0 === i && (i = !1),
        t.call(this, { x: e, y: n, width: r, height: o }, i) || this
      );
    }
    return e(n, t), n;
  })(P),
  N = (function () {
    function t(t, e, n) {
      void 0 === n && (n = new x(0, 0));
      var r = e.width,
        o = e.height;
      (this._imgDims = new s(r, o)),
        (this._shift = n),
        (this._positions = t.map(function (t) {
          return t.mul(new x(r, o)).add(n);
        }));
    }
    return (
      Object.defineProperty(t.prototype, "shift", {
        get: function () {
          return new x(this._shift.x, this._shift.y);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "imageWidth", {
        get: function () {
          return this._imgDims.width;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "imageHeight", {
        get: function () {
          return this._imgDims.height;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "positions", {
        get: function () {
          return this._positions;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "relativePositions", {
        get: function () {
          var t = this;
          return this._positions.map(function (e) {
            return e.sub(t._shift).div(new x(t.imageWidth, t.imageHeight));
          });
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.forSize = function (t, e) {
        return new this.constructor(this.relativePositions, {
          width: t,
          height: e,
        });
      }),
      (t.prototype.shiftBy = function (t, e) {
        return new this.constructor(
          this.relativePositions,
          this._imgDims,
          new x(t, e)
        );
      }),
      (t.prototype.shiftByPoint = function (t) {
        return this.shiftBy(t.x, t.y);
      }),
      (t.prototype.align = function (t, e) {
        if ((void 0 === e && (e = {}), t)) {
          var n = t instanceof F ? t.box.floor() : new P(t);
          return this.shiftBy(n.x, n.y).align(null, e);
        }
        var r = Object.assign(
            {},
            { useDlibAlignment: !1, minBoxPadding: 0.2 },
            e
          ),
          o = r.useDlibAlignment,
          i = r.minBoxPadding;
        return o ? this.alignDlib() : this.alignMinBbox(i);
      }),
      (t.prototype.alignDlib = function () {
        var t = this.getRefPointsForAlignment(),
          e = t[0],
          n = t[1],
          r = t[2],
          o = function (t) {
            return r.sub(t).magnitude();
          },
          i = (o(e) + o(n)) / 2,
          a = Math.floor(i / 0.45),
          s = g(t),
          c = Math.floor(Math.max(0, s.x - 0.5 * a)),
          u = Math.floor(Math.max(0, s.y - 0.43 * a));
        return new A(
          c,
          u,
          Math.min(a, this.imageWidth + c),
          Math.min(a, this.imageHeight + u)
        );
      }),
      (t.prototype.alignMinBbox = function (t) {
        var e = D(this.positions);
        return e.pad(e.width * t, e.height * t);
      }),
      (t.prototype.getRefPointsForAlignment = function () {
        throw new Error(
          "getRefPointsForAlignment not implemented by base class"
        );
      }),
      t
    );
  })(),
  j = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.getRefPointsForAlignment = function () {
        var t = this.positions;
        return [t[0], t[1], g([t[3], t[4]])];
      }),
      n
    );
  })(N),
  B = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.getJawOutline = function () {
        return this.positions.slice(0, 17);
      }),
      (n.prototype.getLeftEyeBrow = function () {
        return this.positions.slice(17, 22);
      }),
      (n.prototype.getRightEyeBrow = function () {
        return this.positions.slice(22, 27);
      }),
      (n.prototype.getNose = function () {
        return this.positions.slice(27, 36);
      }),
      (n.prototype.getLeftEye = function () {
        return this.positions.slice(36, 42);
      }),
      (n.prototype.getRightEye = function () {
        return this.positions.slice(42, 48);
      }),
      (n.prototype.getMouth = function () {
        return this.positions.slice(48, 68);
      }),
      (n.prototype.getRefPointsForAlignment = function () {
        return [this.getLeftEye(), this.getRightEye(), this.getMouth()].map(g);
      }),
      n
    );
  })(N),
  W = (function () {
    function t(t, e) {
      (this._label = t), (this._distance = e);
    }
    return (
      Object.defineProperty(t.prototype, "label", {
        get: function () {
          return this._label;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "distance", {
        get: function () {
          return this._distance;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.toString = function (t) {
        return (
          void 0 === t && (t = !0),
          this.label + (t ? " (" + d(this.distance) + ")" : "")
        );
      }),
      t
    );
  })(),
  R = (function (t) {
    function n(e, n) {
      var r = t.call(this, e) || this;
      return (r._label = n), r;
    }
    return (
      e(n, t),
      (n.assertIsValidLabeledBox = function (t, e) {
        if ((P.assertIsValidBox(t, e), !w(t.label)))
          throw new Error(
            e + " - expected property label (" + t.label + ") to be a number"
          );
      }),
      Object.defineProperty(n.prototype, "label", {
        get: function () {
          return this._label;
        },
        enumerable: !0,
        configurable: !0,
      }),
      n
    );
  })(P),
  z = (function () {
    function t(t, e) {
      if ("string" != typeof t)
        throw new Error(
          "LabeledFaceDescriptors - constructor expected label to be a string"
        );
      if (
        !Array.isArray(e) ||
        e.some(function (t) {
          return !(t instanceof Float32Array);
        })
      )
        throw new Error(
          "LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array"
        );
      (this._label = t), (this._descriptors = e);
    }
    return (
      Object.defineProperty(t.prototype, "label", {
        get: function () {
          return this._label;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "descriptors", {
        get: function () {
          return this._descriptors;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.toJSON = function () {
        return {
          label: this.label,
          descriptors: this.descriptors.map(function (t) {
            return Array.from(t);
          }),
        };
      }),
      (t.fromJSON = function (e) {
        var n = e.descriptors.map(function (t) {
          return new Float32Array(t);
        });
        return new t(e.label, n);
      }),
      t
    );
  })(),
  H = (function (t) {
    function n(e, n, r, o) {
      var i = t.call(this, e, n) || this;
      return (i._score = r), (i._classScore = o), i;
    }
    return (
      e(n, t),
      (n.assertIsValidPredictedBox = function (t, e) {
        if ((R.assertIsValidLabeledBox(t, e), !y(t.score) || !y(t.classScore)))
          throw new Error(
            e +
              " - expected properties score (" +
              t.score +
              ") and (" +
              t.classScore +
              ") to be a number between [0, 1]"
          );
      }),
      Object.defineProperty(n.prototype, "score", {
        get: function () {
          return this._score;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "classScore", {
        get: function () {
          return this._classScore;
        },
        enumerable: !0,
        configurable: !0,
      }),
      n
    );
  })(R);
function V(t) {
  return t.detection instanceof F;
}
function G(t, e) {
  var n = { detection: e };
  return Object.assign({}, t, n);
}
function U() {
  var t =
    window.fetch ||
    function () {
      throw new Error(
        "fetch - missing fetch implementation for browser environment"
      );
    };
  return {
    Canvas: HTMLCanvasElement,
    CanvasRenderingContext2D: CanvasRenderingContext2D,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: function () {
      return document.createElement("canvas");
    },
    createImageElement: function () {
      return document.createElement("img");
    },
    fetch: t,
    readFile: function () {
      throw new Error(
        "readFile - filesystem not available for browser environment"
      );
    },
  };
}
function J(t) {
  var e = "";
  if (!t)
    try {
      t = require("fs");
    } catch (t) {
      e = t.toString();
    }
  return {
    readFile: t
      ? function (e) {
          return new Promise(function (n, r) {
            t.readFile(e, function (t, e) {
              return t ? r(t) : n(e);
            });
          });
        }
      : function () {
          throw new Error(
            "readFile - failed to require fs in nodejs environment with error: " +
              e
          );
        },
  };
}
var Y =
  "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : "undefined" != typeof window
    ? window
    : {};
function q() {
  var t = Y.Canvas || Y.HTMLCanvasElement,
    e = Y.Image || Y.HTMLImageElement,
    n =
      Y.fetch ||
      function () {
        throw new Error(
          "fetch - missing fetch implementation for nodejs environment"
        );
      },
    o = J();
  return r(
    {
      Canvas: t || function () {},
      CanvasRenderingContext2D: Y.CanvasRenderingContext2D || function () {},
      Image: e || function () {},
      ImageData: Y.ImageData || function () {},
      Video: Y.HTMLVideoElement || function () {},
      createCanvasElement: function () {
        if (t) return new t();
        throw new Error(
          "createCanvasElement - missing Canvas implementation for nodejs environment"
        );
      },
      createImageElement: function () {
        if (e) return new e();
        throw new Error(
          "createImageElement - missing Image implementation for nodejs environment"
        );
      },
      fetch: n,
    },
    o
  );
}
function X() {
  return (
    "object" == typeof window &&
    "undefined" != typeof document &&
    "undefined" != typeof HTMLImageElement &&
    "undefined" != typeof HTMLCanvasElement &&
    "undefined" != typeof HTMLVideoElement &&
    "undefined" != typeof ImageData &&
    "undefined" != typeof CanvasRenderingContext2D
  );
}
function Z() {
  throw new Error("setTimeout has not been defined");
}
function K() {
  throw new Error("clearTimeout has not been defined");
}
var Q = Z,
  $ = K;
function tt(t) {
  if (Q === setTimeout) return setTimeout(t, 0);
  if ((Q === Z || !Q) && setTimeout) return (Q = setTimeout), setTimeout(t, 0);
  try {
    return Q(t, 0);
  } catch (e) {
    try {
      return Q.call(null, t, 0);
    } catch (e) {
      return Q.call(this, t, 0);
    }
  }
}
"function" == typeof Y.setTimeout && (Q = setTimeout),
  "function" == typeof Y.clearTimeout && ($ = clearTimeout);
var et,
  nt = [],
  rt = !1,
  ot = -1;
function it() {
  rt &&
    et &&
    ((rt = !1),
    et.length ? (nt = et.concat(nt)) : (ot = -1),
    nt.length && at());
}
function at() {
  if (!rt) {
    var t = tt(it);
    rt = !0;
    for (var e = nt.length; e; ) {
      for (et = nt, nt = []; ++ot < e; ) et && et[ot].run();
      (ot = -1), (e = nt.length);
    }
    (et = null),
      (rt = !1),
      (function (t) {
        if ($ === clearTimeout) return clearTimeout(t);
        if (($ === K || !$) && clearTimeout)
          return ($ = clearTimeout), clearTimeout(t);
        try {
          return $(t);
        } catch (e) {
          try {
            return $.call(null, t);
          } catch (e) {
            return $.call(this, t);
          }
        }
      })(t);
  }
}
function st(t, e) {
  (this.fun = t), (this.array = e);
}
st.prototype.run = function () {
  this.fun.apply(null, this.array);
};
function ct() {}
var ut = ct,
  ht = ct,
  ft = ct,
  pt = ct,
  lt = ct,
  dt = ct,
  vt = ct;
var mt = Y.performance || {},
  gt =
    mt.now ||
    mt.mozNow ||
    mt.msNow ||
    mt.oNow ||
    mt.webkitNow ||
    function () {
      return new Date().getTime();
    };
var bt = new Date();
var wt,
  yt = {
    nextTick: function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      nt.push(new st(t, e)), 1 !== nt.length || rt || tt(at);
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: ut,
    addListener: ht,
    once: ft,
    off: pt,
    removeListener: lt,
    removeAllListeners: dt,
    emit: vt,
    binding: function (t) {
      throw new Error("process.binding is not supported");
    },
    cwd: function () {
      return "/";
    },
    chdir: function (t) {
      throw new Error("process.chdir is not supported");
    },
    umask: function () {
      return 0;
    },
    hrtime: function (t) {
      var e = 0.001 * gt.call(mt),
        n = Math.floor(e),
        r = Math.floor((e % 1) * 1e9);
      return t && ((n -= t[0]), (r -= t[1]) < 0 && (n--, (r += 1e9))), [n, r];
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
      return (new Date() - bt) / 1e3;
    },
  };
function _t() {
  return (
    "object" == typeof Y &&
    "function" == typeof require &&
    "undefined" != typeof module &&
    void 0 !== yt &&
    !!yt.version
  );
}
function xt(t) {
  wt = t;
}
function Pt() {
  X() && xt(U()), _t() && xt(q());
}
var Et,
  Mt = {
    getEnv: function () {
      if (!wt)
        throw new Error(
          "getEnv - environment is not defined, check isNodejs() and isBrowser()"
        );
      return wt;
    },
    setEnv: xt,
    initialize: Pt,
    createBrowserEnv: U,
    createFileSystem: J,
    createNodejsEnv: q,
    monkeyPatch: function (t) {
      if ((wt || Pt(), !wt))
        throw new Error(
          "monkeyPatch - environment is not defined, check isNodejs() and isBrowser()"
        );
      var e = t.Canvas,
        n = void 0 === e ? wt.Canvas : e,
        r = t.Image,
        o = void 0 === r ? wt.Image : r;
      (wt.Canvas = n),
        (wt.Image = o),
        (wt.createCanvasElement =
          t.createCanvasElement ||
          function () {
            return new n();
          }),
        (wt.createImageElement =
          t.createImageElement ||
          function () {
            return new o();
          }),
        (wt.ImageData = t.ImageData || wt.ImageData),
        (wt.Video = t.Video || wt.Video),
        (wt.fetch = t.fetch || wt.fetch),
        (wt.readFile = t.readFile || wt.readFile);
    },
    isBrowser: X,
    isNodejs: _t,
  };
function Ft(t) {
  return Mt.isNodejs() || "string" != typeof t ? t : document.getElementById(t);
}
function Tt(t) {
  var e = Mt.getEnv(),
    n = e.Canvas;
  if (t instanceof e.CanvasRenderingContext2D) return t;
  var r = Ft(t);
  if (!(r instanceof n))
    throw new Error(
      "resolveContext2d - expected canvas to be of instance of Canvas"
    );
  var o = r.getContext("2d");
  if (!o) throw new Error("resolveContext2d - canvas 2d context is null");
  return o;
}
Pt(),
  (function (t) {
    (t.TOP_LEFT = "TOP_LEFT"),
      (t.TOP_RIGHT = "TOP_RIGHT"),
      (t.BOTTOM_LEFT = "BOTTOM_LEFT"),
      (t.BOTTOM_RIGHT = "BOTTOM_RIGHT");
  })(Et || (Et = {}));
var Dt = function (t) {
    void 0 === t && (t = {});
    var e = t.anchorPosition,
      n = t.backgroundColor,
      r = t.fontColor,
      o = t.fontSize,
      i = t.fontStyle,
      a = t.padding;
    (this.anchorPosition = e || Et.TOP_LEFT),
      (this.backgroundColor = n || "rgba(0, 0, 0, 0.5)"),
      (this.fontColor = r || "rgba(255, 255, 255, 1)"),
      (this.fontSize = o || 14),
      (this.fontStyle = i || "Georgia"),
      (this.padding = a || 4);
  },
  St = (function () {
    function t(e, n, r) {
      void 0 === r && (r = {}),
        (this.text = "string" == typeof e ? [e] : e instanceof t ? e.text : e),
        (this.anchor = n),
        (this.options = new Dt(r));
    }
    return (
      (t.prototype.measureWidth = function (t) {
        var e = this.options.padding;
        return (
          this.text
            .map(function (e) {
              return t.measureText(e).width;
            })
            .reduce(function (t, e) {
              return t < e ? e : t;
            }, 0) +
          2 * e
        );
      }),
      (t.prototype.measureHeight = function () {
        var t = this.options,
          e = t.fontSize,
          n = t.padding;
        return this.text.length * e + 2 * n;
      }),
      (t.prototype.getUpperLeft = function (t, e) {
        var n = this.options.anchorPosition,
          r = n === Et.BOTTOM_RIGHT || n === Et.TOP_RIGHT,
          o = n === Et.BOTTOM_LEFT || n === Et.BOTTOM_RIGHT,
          i = this.measureWidth(t),
          a = this.measureHeight(),
          s = r ? this.anchor.x - i : this.anchor.x,
          c = o ? this.anchor.y - a : this.anchor.y;
        if (e) {
          var u = e.width,
            h = e.height;
          return {
            x: Math.max(Math.min(s, u - i), 0),
            y: Math.max(Math.min(c, h - a), 0),
          };
        }
        return { x: s, y: c };
      }),
      (t.prototype.draw = function (t) {
        var e = Ft(t),
          n = Tt(e),
          r = this.options,
          o = r.backgroundColor,
          i = r.fontColor,
          a = r.fontSize,
          s = r.fontStyle,
          c = r.padding;
        n.font = a + "px " + s;
        var u = this.measureWidth(n),
          h = this.measureHeight();
        n.fillStyle = o;
        var f = this.getUpperLeft(n, e);
        n.fillRect(f.x, f.y, u, h),
          (n.fillStyle = i),
          this.text.forEach(function (t, e) {
            var r = c + f.x,
              o = c + f.y + (e + 1) * a;
            n.fillText(t, r, o);
          });
      }),
      t
    );
  })(),
  Ct = function (t) {
    void 0 === t && (t = {});
    var e = t.boxColor,
      n = t.lineWidth,
      r = t.label,
      o = t.drawLabelOptions;
    (this.boxColor = e || "rgba(0, 0, 255, 1)"),
      (this.lineWidth = n || 2),
      (this.label = r);
    var i = { anchorPosition: Et.BOTTOM_LEFT, backgroundColor: this.boxColor };
    this.drawLabelOptions = new Dt(Object.assign({}, i, o));
  },
  kt = (function () {
    function t(t, e) {
      void 0 === e && (e = {}),
        (this.box = new P(t)),
        (this.options = new Ct(e));
    }
    return (
      (t.prototype.draw = function (t) {
        var e = Tt(t),
          n = this.options,
          r = n.boxColor,
          o = n.lineWidth,
          i = this.box,
          a = i.x,
          s = i.y,
          c = i.width,
          u = i.height;
        (e.strokeStyle = r), (e.lineWidth = o), e.strokeRect(a, s, c, u);
        var h = this.options.label;
        h &&
          new St(
            [h],
            { x: a - o / 2, y: s },
            this.options.drawLabelOptions
          ).draw(t);
      }),
      t
    );
  })();
function Ot(t) {
  var e = Mt.getEnv(),
    n = e.Image,
    r = e.Video;
  return (
    (t instanceof n && t.complete) || (t instanceof r && t.readyState >= 3)
  );
}
function It(t) {
  return new Promise(function (e, n) {
    if (t instanceof Mt.getEnv().Canvas || Ot(t)) return e();
    function r(t) {
      t.currentTarget &&
        (t.currentTarget.removeEventListener("load", r),
        t.currentTarget.removeEventListener("error", o),
        e(t));
    }
    function o(t) {
      t.currentTarget &&
        (t.currentTarget.removeEventListener("load", r),
        t.currentTarget.removeEventListener("error", o),
        n(t));
    }
    t.addEventListener("load", r), t.addEventListener("error", o);
  });
}
function Lt(t) {
  return new Promise(function (e, n) {
    if (!(t instanceof Blob))
      return n("bufferToImage - expected buf to be of type: Blob");
    var r = new FileReader();
    (r.onload = function () {
      if ("string" != typeof r.result)
        return n(
          "bufferToImage - expected reader.result to be a string, in onload"
        );
      var t = Mt.getEnv().createImageElement();
      (t.onload = function () {
        return e(t);
      }),
        (t.onerror = n),
        (t.src = r.result);
    }),
      (r.onerror = n),
      r.readAsDataURL(t);
  });
}
function At(t) {
  var e = Mt.getEnv(),
    n = e.Image,
    r = e.Video;
  return t instanceof n
    ? new s(t.naturalWidth, t.naturalHeight)
    : t instanceof r
    ? new s(t.videoWidth, t.videoHeight)
    : new s(t.width, t.height);
}
function Nt(t) {
  var e = t.width,
    n = t.height,
    r = (0, Mt.getEnv().createCanvasElement)();
  return (r.width = e), (r.height = n), r;
}
function jt(t, e) {
  var n = Mt.getEnv().ImageData;
  if (!(t instanceof n || Ot(t)))
    throw new Error(
      "createCanvasFromMedia - media has not finished loading yet"
    );
  var r = e || At(t),
    o = r.width,
    i = r.height,
    a = Nt({ width: o, height: i });
  return (
    t instanceof n
      ? Tt(a).putImageData(t, 0, 0)
      : Tt(a).drawImage(t, 0, 0, o, i),
    a
  );
}
function Bt(e, n) {
  return o(this, void 0, void 0, function () {
    var r, o, a, s, c, u;
    return i(this, function (i) {
      switch (i.label) {
        case 0:
          return (
            (r = n || Mt.getEnv().createCanvasElement()),
            (o = e.shape.slice(f(e) ? 1 : 0)),
            (a = o[0]),
            (s = o[1]),
            (c = o[2]),
            (u = t.tidy(function () {
              return e.as3D(a, s, c).toInt();
            })),
            [4, t.browser.toPixels(u, r)]
          );
        case 1:
          return i.sent(), u.dispose(), [2, r];
      }
    });
  });
}
function Wt(t) {
  var e = Mt.getEnv(),
    n = e.Image,
    r = e.Canvas,
    o = e.Video;
  return t instanceof n || t instanceof r || t instanceof o;
}
function Rt(t, e, n) {
  void 0 === n && (n = !1);
  var r = Mt.getEnv(),
    o = r.Image,
    i = r.Canvas;
  if (!(t instanceof o || t instanceof i))
    throw new Error(
      "imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement"
    );
  var a = At(t),
    s = e / Math.max(a.height, a.width),
    c = s * a.width,
    u = s * a.height,
    h = Nt({ width: e, height: e }),
    f = t instanceof i ? t : jt(t),
    p = Math.abs(c - u) / 2,
    l = n && c < u ? p : 0,
    d = n && u < c ? p : 0;
  return Tt(h).drawImage(f, l, d, c, u), h;
}
var zt = (function () {
  function e(t, e) {
    var n = this;
    if (
      (void 0 === e && (e = !1),
      (this._imageTensors = []),
      (this._canvases = []),
      (this._treatAsBatchInput = !1),
      (this._inputDimensions = []),
      !Array.isArray(t))
    )
      throw new Error(
        "NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have " +
          t
      );
    (this._treatAsBatchInput = e),
      (this._batchSize = t.length),
      t.forEach(function (t, e) {
        if (h(t))
          return (
            (n._imageTensors[e] = t), void (n._inputDimensions[e] = t.shape)
          );
        if (f(t)) {
          var r = t.shape[0];
          if (1 !== r)
            throw new Error(
              "NetInput - tf.Tensor4D with batchSize " +
                r +
                " passed, but not supported in input array"
            );
          return (
            (n._imageTensors[e] = t),
            void (n._inputDimensions[e] = t.shape.slice(1))
          );
        }
        var o = t instanceof Mt.getEnv().Canvas ? t : jt(t);
        (n._canvases[e] = o), (n._inputDimensions[e] = [o.height, o.width, 3]);
      });
  }
  return (
    Object.defineProperty(e.prototype, "imageTensors", {
      get: function () {
        return this._imageTensors;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "canvases", {
      get: function () {
        return this._canvases;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "isBatchInput", {
      get: function () {
        return this.batchSize > 1 || this._treatAsBatchInput;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "batchSize", {
      get: function () {
        return this._batchSize;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "inputDimensions", {
      get: function () {
        return this._inputDimensions;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "inputSize", {
      get: function () {
        return this._inputSize;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "reshapedInputDimensions", {
      get: function () {
        var t = this;
        return b(this.batchSize, 0, 1).map(function (e, n) {
          return t.getReshapedInputDimensions(n);
        });
      },
      enumerable: !0,
      configurable: !0,
    }),
    (e.prototype.getInput = function (t) {
      return this.canvases[t] || this.imageTensors[t];
    }),
    (e.prototype.getInputDimensions = function (t) {
      return this._inputDimensions[t];
    }),
    (e.prototype.getInputHeight = function (t) {
      return this._inputDimensions[t][0];
    }),
    (e.prototype.getInputWidth = function (t) {
      return this._inputDimensions[t][1];
    }),
    (e.prototype.getReshapedInputDimensions = function (t) {
      if ("number" != typeof this.inputSize)
        throw new Error(
          "getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet"
        );
      return m(
        { width: this.getInputWidth(t), height: this.getInputHeight(t) },
        this.inputSize
      );
    }),
    (e.prototype.toBatchTensor = function (e, n) {
      var r = this;
      return (
        void 0 === n && (n = !0),
        (this._inputSize = e),
        t.tidy(function () {
          var o = b(r.batchSize, 0, 1).map(function (o) {
            var i = r.getInput(o);
            if (i instanceof t.Tensor) {
              var a = f(i) ? i : i.expandDims();
              return (
                ((a = k(a, n)).shape[1] === e && a.shape[2] === e) ||
                  (a = t.image.resizeBilinear(a, [e, e])),
                a.as3D(e, e, 3)
              );
            }
            if (i instanceof Mt.getEnv().Canvas)
              return t.browser.fromPixels(Rt(i, e, n));
            throw new Error(
              "toBatchTensor - at batchIdx " +
                o +
                ", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have " +
                i
            );
          });
          return t
            .stack(
              o.map(function (t) {
                return t.toFloat();
              })
            )
            .as4D(r.batchSize, e, e, 3);
        })
      );
    }),
    e
  );
})();
function Ht(t) {
  return o(this, void 0, void 0, function () {
    var e, n, r;
    return i(this, function (o) {
      switch (o.label) {
        case 0:
          if (t instanceof zt) return [2, t];
          if (!(e = Array.isArray(t) ? t : [t]).length)
            throw new Error("toNetInput - empty array passed as input");
          return (
            (n = function (e) {
              return Array.isArray(t) ? " at input index " + e + ":" : "";
            }),
            (r = e.map(Ft)).forEach(function (t, r) {
              if (!Wt(t) && !h(t) && !f(t)) {
                if ("string" == typeof e[r])
                  throw new Error(
                    "toNetInput -" +
                      n(r) +
                      " string passed, but could not resolve HTMLElement for element id " +
                      e[r]
                  );
                throw new Error(
                  "toNetInput -" +
                    n(r) +
                    " expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id"
                );
              }
              if (f(t)) {
                var o = t.shape[0];
                if (1 !== o)
                  throw new Error(
                    "toNetInput -" +
                      n(r) +
                      " tf.Tensor4D with batchSize " +
                      o +
                      " passed, but not supported in input array"
                  );
              }
            }),
            [
              4,
              Promise.all(
                r.map(function (t) {
                  return Wt(t) && It(t);
                })
              ),
            ]
          );
        case 1:
          return o.sent(), [2, new zt(r, Array.isArray(t))];
      }
    });
  });
}
function Vt(t, e) {
  return o(this, void 0, void 0, function () {
    var n, r, o, a, s, c;
    return i(this, function (i) {
      switch (i.label) {
        case 0:
          return (
            (n = Mt.getEnv().Canvas),
            (r = t),
            t instanceof n ? [3, 5] : [4, Ht(t)]
          );
        case 1:
          if ((o = i.sent()).batchSize > 1)
            throw new Error("extractFaces - batchSize > 1 not supported");
          return (a = o.getInput(0)) instanceof n ? ((s = a), [3, 4]) : [3, 2];
        case 2:
          return [4, Bt(a)];
        case 3:
          (s = i.sent()), (i.label = 4);
        case 4:
          (r = s), (i.label = 5);
        case 5:
          return (
            (c = Tt(r)),
            [
              2,
              e
                .map(function (t) {
                  return t instanceof F
                    ? t.forSize(r.width, r.height).box.floor()
                    : t;
                })
                .map(function (t) {
                  return t.clipAtImageBorders(r.width, r.height);
                })
                .map(function (t) {
                  var e = t.x,
                    n = t.y,
                    r = t.width,
                    o = t.height,
                    i = Nt({ width: r, height: o });
                  return (
                    Tt(i).putImageData(c.getImageData(e, n, r, o), 0, 0), i
                  );
                }),
            ]
          );
      }
    });
  });
}
function Gt(e, n) {
  return o(this, void 0, void 0, function () {
    return i(this, function (r) {
      if (!h(e) && !f(e))
        throw new Error(
          "extractFaceTensors - expected image tensor to be 3D or 4D"
        );
      if (f(e) && e.shape[0] > 1)
        throw new Error("extractFaceTensors - batchSize > 1 not supported");
      return [
        2,
        t.tidy(function () {
          var r = e.shape.slice(f(e) ? 1 : 0),
            o = r[0],
            i = r[1],
            a = r[2],
            s = n
              .map(function (t) {
                return t instanceof F ? t.forSize(i, o).box : t;
              })
              .map(function (t) {
                return t.clipAtImageBorders(i, o);
              })
              .map(function (n) {
                var r = n.x,
                  s = n.y,
                  c = n.width,
                  u = n.height;
                return t.slice3d(e.as3D(o, i, a), [s, r, 0], [u, c, a]);
              });
          return s;
        }),
      ];
    });
  });
}
function Ut(t, e) {
  return o(this, void 0, void 0, function () {
    var n;
    return i(this, function (r) {
      switch (r.label) {
        case 0:
          return [4, (0, Mt.getEnv().fetch)(t, e)];
        case 1:
          if (!((n = r.sent()).status < 400))
            throw new Error(
              "failed to fetch: (" +
                n.status +
                ") " +
                n.statusText +
                ", from url: " +
                n.url
            );
          return [2, n];
      }
    });
  });
}
function Jt(t) {
  return o(this, void 0, void 0, function () {
    var e, n;
    return i(this, function (r) {
      switch (r.label) {
        case 0:
          return [4, Ut(t)];
        case 1:
          return [4, (e = r.sent()).blob()];
        case 2:
          if (!(n = r.sent()).type.startsWith("image/"))
            throw new Error(
              "fetchImage - expected blob type to be of type image/*, instead have: " +
                n.type +
                ", for url: " +
                e.url
            );
          return [2, Lt(n)];
      }
    });
  });
}
function Yt(t) {
  return o(this, void 0, void 0, function () {
    return i(this, function (e) {
      switch (e.label) {
        case 0:
          return [4, Ut(t)];
        case 1:
          return [2, e.sent().json()];
      }
    });
  });
}
function qt(t) {
  return o(this, void 0, void 0, function () {
    var e;
    return i(this, function (n) {
      switch (n.label) {
        case 0:
          return (e = Float32Array.bind), [4, Ut(t)];
        case 1:
          return [4, n.sent().arrayBuffer()];
        case 2:
          return [2, new (e.apply(Float32Array, [void 0, n.sent()]))()];
      }
    });
  });
}
function Xt(t, e) {
  var n = e + "-weights_manifest.json";
  if (!t) return { modelBaseUri: "", manifestUri: n };
  if ("/" === t) return { modelBaseUri: "/", manifestUri: "/" + n };
  var r = t.startsWith("http://")
      ? "http://"
      : t.startsWith("https://")
      ? "https://"
      : "",
    o = (t = t.replace(r, "")).split("/").filter(function (t) {
      return t;
    }),
    i = t.endsWith(".json") ? o[o.length - 1] : n,
    a = r + (t.endsWith(".json") ? o.slice(0, o.length - 1) : o).join("/");
  return {
    modelBaseUri: (a = t.startsWith("/") ? "/" + a : a),
    manifestUri: "/" === a ? "/" + i : a + "/" + i,
  };
}
function Zt(e, n) {
  return o(this, void 0, void 0, function () {
    var r, o, a, s;
    return i(this, function (i) {
      switch (i.label) {
        case 0:
          return (
            (r = Xt(e, n)),
            (o = r.manifestUri),
            (a = r.modelBaseUri),
            [4, Yt(o)]
          );
        case 1:
          return (s = i.sent()), [2, t.io.loadWeights(s, a)];
      }
    });
  });
}
function Kt(t, e, n) {
  void 0 === n && (n = !1);
  var r = n ? At(e) : e,
    o = r.width,
    i = r.height;
  return (t.width = o), (t.height = i), { width: o, height: i };
}
var Qt = (function () {
  function e(t) {
    (this._name = t), (this._params = void 0), (this._paramMappings = []);
  }
  return (
    Object.defineProperty(e.prototype, "params", {
      get: function () {
        return this._params;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "paramMappings", {
      get: function () {
        return this._paramMappings;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "isLoaded", {
      get: function () {
        return !!this.params;
      },
      enumerable: !0,
      configurable: !0,
    }),
    (e.prototype.getParamFromPath = function (t) {
      var e = this.traversePropertyPath(t);
      return e.obj[e.objProp];
    }),
    (e.prototype.reassignParamFromPath = function (t, e) {
      var n = this.traversePropertyPath(t),
        r = n.obj,
        o = n.objProp;
      r[o].dispose(), (r[o] = e);
    }),
    (e.prototype.getParamList = function () {
      var t = this;
      return this._paramMappings.map(function (e) {
        var n = e.paramPath;
        return { path: n, tensor: t.getParamFromPath(n) };
      });
    }),
    (e.prototype.getTrainableParams = function () {
      return this.getParamList().filter(function (e) {
        return e.tensor instanceof t.Variable;
      });
    }),
    (e.prototype.getFrozenParams = function () {
      return this.getParamList().filter(function (e) {
        return !(e.tensor instanceof t.Variable);
      });
    }),
    (e.prototype.variable = function () {
      var t = this;
      this.getFrozenParams().forEach(function (e) {
        var n = e.path,
          r = e.tensor;
        t.reassignParamFromPath(n, r.variable());
      });
    }),
    (e.prototype.freeze = function () {
      var e = this;
      this.getTrainableParams().forEach(function (n) {
        var r = n.path,
          o = n.tensor,
          i = t.tensor(o.dataSync());
        o.dispose(), e.reassignParamFromPath(r, i);
      });
    }),
    (e.prototype.dispose = function (t) {
      void 0 === t && (t = !0),
        this.getParamList().forEach(function (e) {
          if (t && e.tensor.isDisposed)
            throw new Error(
              "param tensor has already been disposed for path " + e.path
            );
          e.tensor.dispose();
        }),
        (this._params = void 0);
    }),
    (e.prototype.serializeParams = function () {
      return new Float32Array(
        this.getParamList()
          .map(function (t) {
            var e = t.tensor;
            return Array.from(e.dataSync());
          })
          .reduce(function (t, e) {
            return t.concat(e);
          })
      );
    }),
    (e.prototype.load = function (t) {
      return o(this, void 0, void 0, function () {
        return i(this, function (e) {
          switch (e.label) {
            case 0:
              return t instanceof Float32Array
                ? (this.extractWeights(t), [2])
                : [4, this.loadFromUri(t)];
            case 1:
              return e.sent(), [2];
          }
        });
      });
    }),
    (e.prototype.loadFromUri = function (t) {
      return o(this, void 0, void 0, function () {
        var e;
        return i(this, function (n) {
          switch (n.label) {
            case 0:
              if (t && "string" != typeof t)
                throw new Error(
                  this._name + ".loadFromUri - expected model uri"
                );
              return [4, Zt(t, this.getDefaultModelName())];
            case 1:
              return (e = n.sent()), this.loadFromWeightMap(e), [2];
          }
        });
      });
    }),
    (e.prototype.loadFromDisk = function (e) {
      return o(this, void 0, void 0, function () {
        var n, r, o, a, s, c, u, h, f, p;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              if (e && "string" != typeof e)
                throw new Error(
                  this._name + ".loadFromDisk - expected model file path"
                );
              return (
                (n = Mt.getEnv().readFile),
                (r = Xt(e, this.getDefaultModelName())),
                (o = r.manifestUri),
                (a = r.modelBaseUri),
                (s = function (t) {
                  return Promise.all(
                    t.map(function (t) {
                      return n(t).then(function (t) {
                        return t.buffer;
                      });
                    })
                  );
                }),
                (c = t.io.weightsLoaderFactory(s)),
                (f = (h = JSON).parse),
                [4, n(o)]
              );
            case 1:
              return (u = f.apply(h, [i.sent().toString()])), [4, c(u, a)];
            case 2:
              return (p = i.sent()), this.loadFromWeightMap(p), [2];
          }
        });
      });
    }),
    (e.prototype.loadFromWeightMap = function (t) {
      var e = this.extractParamsFromWeigthMap(t),
        n = e.paramMappings,
        r = e.params;
      (this._paramMappings = n), (this._params = r);
    }),
    (e.prototype.extractWeights = function (t) {
      var e = this.extractParams(t),
        n = e.paramMappings,
        r = e.params;
      (this._paramMappings = n), (this._params = r);
    }),
    (e.prototype.traversePropertyPath = function (e) {
      if (!this.params)
        throw new Error("traversePropertyPath - model has no loaded params");
      var n = e.split("/").reduce(
          function (t, n) {
            if (!t.nextObj.hasOwnProperty(n))
              throw new Error(
                "traversePropertyPath - object does not have property " +
                  n +
                  ", for path " +
                  e
              );
            return { obj: t.nextObj, objProp: n, nextObj: t.nextObj[n] };
          },
          { nextObj: this.params }
        ),
        r = n.obj,
        o = n.objProp;
      if (!(r && o && r[o] instanceof t.Tensor))
        throw new Error(
          "traversePropertyPath - parameter is not a tensor, for path " + e
        );
      return { obj: r, objProp: o };
    }),
    e
  );
})();
function $t(e, n, r) {
  return t.tidy(function () {
    var o = t.separableConv2d(
      e,
      n.depthwise_filter,
      n.pointwise_filter,
      r,
      "same"
    );
    return (o = t.add(o, n.bias));
  });
}
function te(e, n, r) {
  return (
    void 0 === r && (r = !1),
    t.tidy(function () {
      var o = t.relu(
          r
            ? t.add(t.conv2d(e, n.conv0.filters, [2, 2], "same"), n.conv0.bias)
            : $t(e, n.conv0, [2, 2])
        ),
        i = $t(o, n.conv1, [1, 1]),
        a = $t(t.relu(t.add(o, i)), n.conv2, [1, 1]);
      return t.relu(t.add(o, t.add(i, a)));
    })
  );
}
function ee(e, n, r, o) {
  return (
    void 0 === r && (r = !1),
    void 0 === o && (o = !0),
    t.tidy(function () {
      var i = t.relu(
          r
            ? t.add(
                t.conv2d(e, n.conv0.filters, o ? [2, 2] : [1, 1], "same"),
                n.conv0.bias
              )
            : $t(e, n.conv0, o ? [2, 2] : [1, 1])
        ),
        a = $t(i, n.conv1, [1, 1]),
        s = $t(t.relu(t.add(i, a)), n.conv2, [1, 1]),
        c = $t(t.relu(t.add(i, t.add(a, s))), n.conv3, [1, 1]);
      return t.relu(t.add(i, t.add(a, t.add(s, c))));
    })
  );
}
function ne(e, n, r, o) {
  return (
    void 0 === r && (r = "same"),
    void 0 === o && (o = !1),
    t.tidy(function () {
      var i = t.add(t.conv2d(e, n.filters, [1, 1], r), n.bias);
      return o ? t.relu(i) : i;
    })
  );
}
function re(t, e) {
  Object.keys(t).forEach(function (n) {
    e.some(function (t) {
      return t.originalPath === n;
    }) || t[n].dispose();
  });
}
function oe(e, n) {
  return function (r, o, i, a) {
    var s = t.tensor4d(e(r * o * i * i), [i, i, r, o]),
      c = t.tensor1d(e(o));
    return (
      n.push({ paramPath: a + "/filters" }, { paramPath: a + "/bias" }),
      { filters: s, bias: c }
    );
  };
}
function ie(e, n) {
  return function (r, o, i) {
    var a = t.tensor2d(e(r * o), [r, o]),
      s = t.tensor1d(e(o));
    return (
      n.push({ paramPath: i + "/weights" }, { paramPath: i + "/bias" }),
      { weights: a, bias: s }
    );
  };
}
var ae = function (t, e, n) {
  (this.depthwise_filter = t), (this.pointwise_filter = e), (this.bias = n);
};
function se(e, n) {
  return function (r, o, i) {
    var a = t.tensor4d(e(9 * r), [3, 3, r, 1]),
      s = t.tensor4d(e(r * o), [1, 1, r, o]),
      c = t.tensor1d(e(o));
    return (
      n.push(
        { paramPath: i + "/depthwise_filter" },
        { paramPath: i + "/pointwise_filter" },
        { paramPath: i + "/bias" }
      ),
      new ae(a, s, c)
    );
  };
}
function ce(t) {
  return function (e) {
    var n = t(e + "/depthwise_filter", 4),
      r = t(e + "/pointwise_filter", 4),
      o = t(e + "/bias", 1);
    return new ae(n, r, o);
  };
}
function ue(t, e) {
  return function (n, r, o) {
    var i = t[n];
    if (!c(i, r))
      throw new Error(
        "expected weightMap[" +
          n +
          "] to be a Tensor" +
          r +
          "D, instead have " +
          i
      );
    return e.push({ originalPath: n, paramPath: o || n }), i;
  };
}
function he(t) {
  var e = t;
  return {
    extractWeights: function (t) {
      var n = e.slice(0, t);
      return (e = e.slice(t)), n;
    },
    getRemainingWeights: function () {
      return e;
    },
  };
}
function fe(t, e) {
  var n = oe(t, e),
    r = se(t, e);
  function o(t, e, o, i) {
    return (
      void 0 === i && (i = !1),
      {
        conv0: i ? n(t, e, 3, o + "/conv0") : r(t, e, o + "/conv0"),
        conv1: r(e, e, o + "/conv1"),
        conv2: r(e, e, o + "/conv2"),
      }
    );
  }
  return {
    extractDenseBlock3Params: o,
    extractDenseBlock4Params: function (t, e, n, i) {
      void 0 === i && (i = !1);
      var a = o(t, e, n, i);
      return {
        conv0: a.conv0,
        conv1: a.conv1,
        conv2: a.conv2,
        conv3: r(e, e, n + "/conv3"),
      };
    },
  };
}
function pe(t) {
  return function (e) {
    return { filters: t(e + "/filters", 4), bias: t(e + "/bias", 1) };
  };
}
function le(t, e) {
  var n = ue(t, e),
    r = pe(n),
    o = ce(n);
  return {
    extractDenseBlock3Params: function (t, e) {
      return (
        void 0 === e && (e = !1),
        {
          conv0: e ? r(t + "/conv0") : o(t + "/conv0"),
          conv1: o(t + "/conv1"),
          conv2: o(t + "/conv2"),
        }
      );
    },
    extractDenseBlock4Params: function (t, e) {
      return (
        void 0 === e && (e = !1),
        {
          conv0: e ? r(t + "/conv0") : o(t + "/conv0"),
          conv1: o(t + "/conv1"),
          conv2: o(t + "/conv2"),
          conv3: o(t + "/conv3"),
        }
      );
    },
  };
}
var de = (function (n) {
  function r() {
    return n.call(this, "FaceFeatureExtractor") || this;
  }
  return (
    e(r, n),
    (r.prototype.forwardInput = function (e) {
      var n = this.params;
      if (!n)
        throw new Error("FaceFeatureExtractor - load model before inference");
      return t.tidy(function () {
        var r = ee(
          C(e.toBatchTensor(112, !0), [122.782, 117.001, 104.298]).div(
            t.scalar(255)
          ),
          n.dense0,
          !0
        );
        return (
          (r = ee(r, n.dense1)),
          (r = ee(r, n.dense2)),
          (r = ee(r, n.dense3)),
          (r = t.avgPool(r, [7, 7], [2, 2], "valid"))
        );
      });
    }),
    (r.prototype.forward = function (t) {
      return o(this, void 0, void 0, function () {
        var e;
        return i(this, function (n) {
          switch (n.label) {
            case 0:
              return (e = this.forwardInput), [4, Ht(t)];
            case 1:
              return [2, e.apply(this, [n.sent()])];
          }
        });
      });
    }),
    (r.prototype.getDefaultModelName = function () {
      return "face_feature_extractor_model";
    }),
    (r.prototype.extractParamsFromWeigthMap = function (t) {
      return (function (t) {
        var e = [],
          n = le(t, e).extractDenseBlock4Params,
          r = {
            dense0: n("dense0", !0),
            dense1: n("dense1"),
            dense2: n("dense2"),
            dense3: n("dense3"),
          };
        return re(t, e), { params: r, paramMappings: e };
      })(t);
    }),
    (r.prototype.extractParams = function (t) {
      return (function (t) {
        var e = [],
          n = he(t),
          r = n.extractWeights,
          o = n.getRemainingWeights,
          i = fe(r, e).extractDenseBlock4Params,
          a = i(3, 32, "dense0", !0),
          s = i(32, 64, "dense1"),
          c = i(64, 128, "dense2"),
          u = i(128, 256, "dense3");
        if (0 !== o().length)
          throw new Error("weights remaing after extract: " + o().length);
        return {
          paramMappings: e,
          params: { dense0: a, dense1: s, dense2: c, dense3: u },
        };
      })(t);
    }),
    r
  );
})(Qt);
function ve(e, n) {
  return t.tidy(function () {
    return t.add(t.matMul(e, n.weights), n.bias);
  });
}
function me(t) {
  var e = {},
    n = {};
  return (
    Object.keys(t).forEach(function (r) {
      (r.startsWith("fc") ? n : e)[r] = t[r];
    }),
    { featureExtractorMap: e, classifierMap: n }
  );
}
var ge = (function (n) {
    function r(t, e) {
      var r = n.call(this, t) || this;
      return (r._faceFeatureExtractor = e), r;
    }
    return (
      e(r, n),
      Object.defineProperty(r.prototype, "faceFeatureExtractor", {
        get: function () {
          return this._faceFeatureExtractor;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (r.prototype.runNet = function (e) {
        var n = this,
          r = this.params;
        if (!r) throw new Error(this._name + " - load model before inference");
        return t.tidy(function () {
          var t = e instanceof zt ? n.faceFeatureExtractor.forwardInput(e) : e;
          return ve(t.as2D(t.shape[0], -1), r.fc);
        });
      }),
      (r.prototype.dispose = function (t) {
        void 0 === t && (t = !0),
          this.faceFeatureExtractor.dispose(t),
          n.prototype.dispose.call(this, t);
      }),
      (r.prototype.loadClassifierParams = function (t) {
        var e = this.extractClassifierParams(t),
          n = e.params,
          r = e.paramMappings;
        (this._params = n), (this._paramMappings = r);
      }),
      (r.prototype.extractClassifierParams = function (t) {
        return (function (t, e, n) {
          var r = [],
            o = he(t),
            i = o.extractWeights,
            a = o.getRemainingWeights,
            s = ie(i, r)(e, n, "fc");
          if (0 !== a().length)
            throw new Error("weights remaing after extract: " + a().length);
          return { paramMappings: r, params: { fc: s } };
        })(t, this.getClassifierChannelsIn(), this.getClassifierChannelsOut());
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        var e = me(t),
          n = e.featureExtractorMap,
          r = e.classifierMap;
        return (
          this.faceFeatureExtractor.loadFromWeightMap(n),
          (function (t) {
            var e,
              n = [],
              r = ue(t, n),
              o = {
                fc:
                  ((e = "fc"),
                  { weights: r(e + "/weights", 2), bias: r(e + "/bias", 1) }),
              };
            return re(t, n), { params: o, paramMappings: n };
          })(r)
        );
      }),
      (r.prototype.extractParams = function (t) {
        var e = this.getClassifierChannelsIn(),
          n = this.getClassifierChannelsOut(),
          r = n * e + n,
          o = t.slice(0, t.length - r),
          i = t.slice(t.length - r);
        return (
          this.faceFeatureExtractor.extractWeights(o),
          this.extractClassifierParams(i)
        );
      }),
      r
    );
  })(Qt),
  be = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
  ],
  we = (function () {
    function t(t) {
      var e = this;
      if (7 !== t.length)
        throw new Error(
          "FaceExpressions.constructor - expected probabilities.length to be 7, have: " +
            t.length
        );
      be.forEach(function (n, r) {
        e[n] = t[r];
      });
    }
    return (
      (t.prototype.asSortedArray = function () {
        var t = this;
        return be
          .map(function (e) {
            return { expression: e, probability: t[e] };
          })
          .sort(function (t, e) {
            return e.probability - t.probability;
          });
      }),
      t
    );
  })(),
  ye = (function (n) {
    function r(t) {
      return (
        void 0 === t && (t = new de()),
        n.call(this, "FaceExpressionNet", t) || this
      );
    }
    return (
      e(r, n),
      (r.prototype.forwardInput = function (e) {
        var n = this;
        return t.tidy(function () {
          return t.softmax(n.runNet(e));
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.predictExpressions = function (e) {
        return o(this, void 0, void 0, function () {
          var n,
            r,
            a,
            s,
            c = this;
          return i(this, function (u) {
            switch (u.label) {
              case 0:
                return [4, Ht(e)];
              case 1:
                return (n = u.sent()), [4, this.forwardInput(n)];
              case 2:
                return (
                  (r = u.sent()),
                  [
                    4,
                    Promise.all(
                      t.unstack(r).map(function (t) {
                        return o(c, void 0, void 0, function () {
                          var e;
                          return i(this, function (n) {
                            switch (n.label) {
                              case 0:
                                return [4, t.data()];
                              case 1:
                                return (e = n.sent()), t.dispose(), [2, e];
                            }
                          });
                        });
                      })
                    ),
                  ]
                );
              case 3:
                return (
                  (a = u.sent()),
                  r.dispose(),
                  (s = a.map(function (t) {
                    return new we(t);
                  })),
                  [2, n.isBatchInput ? s : s[0]]
                );
            }
          });
        });
      }),
      (r.prototype.getDefaultModelName = function () {
        return "face_expression_model";
      }),
      (r.prototype.getClassifierChannelsIn = function () {
        return 256;
      }),
      (r.prototype.getClassifierChannelsOut = function () {
        return 7;
      }),
      r
    );
  })(ge);
function _e(t) {
  return t.expressions instanceof we;
}
function xe(t, e) {
  var n = { expressions: e };
  return Object.assign({}, t, n);
}
function Pe(t) {
  return (
    V(t) &&
    t.landmarks instanceof N &&
    t.unshiftedLandmarks instanceof N &&
    t.alignedRect instanceof F
  );
}
function Ee(t, e) {
  var n = t.detection.box,
    r = e.shiftBy(n.x, n.y),
    o = r.align(),
    i = t.detection.imageDims,
    a = {
      landmarks: r,
      unshiftedLandmarks: e,
      alignedRect: new F(t.detection.score, o.rescale(i.reverse()), i),
    };
  return Object.assign({}, t, a);
}
var Me = function (t) {
    void 0 === t && (t = {});
    var e = t.drawLines,
      n = void 0 === e || e,
      r = t.drawPoints,
      o = void 0 === r || r,
      i = t.lineWidth,
      a = t.lineColor,
      s = t.pointSize,
      c = t.pointColor;
    (this.drawLines = n),
      (this.drawPoints = o),
      (this.lineWidth = i || 1),
      (this.pointSize = s || 2),
      (this.lineColor = a || "rgba(0, 255, 255, 1)"),
      (this.pointColor = c || "rgba(255, 0, 255, 1)");
  },
  Fe = (function () {
    function t(t, e) {
      void 0 === e && (e = {}),
        (this.faceLandmarks = t),
        (this.options = new Me(e));
    }
    return (
      (t.prototype.draw = function (t) {
        var e = Tt(t),
          n = this.options,
          r = n.drawLines,
          o = n.drawPoints,
          i = n.lineWidth,
          s = n.lineColor,
          c = n.pointSize,
          u = n.pointColor;
        if (
          (r &&
            this.faceLandmarks instanceof B &&
            ((e.strokeStyle = s),
            (e.lineWidth = i),
            a(e, this.faceLandmarks.getJawOutline()),
            a(e, this.faceLandmarks.getLeftEyeBrow()),
            a(e, this.faceLandmarks.getRightEyeBrow()),
            a(e, this.faceLandmarks.getNose()),
            a(e, this.faceLandmarks.getLeftEye(), !0),
            a(e, this.faceLandmarks.getRightEye(), !0),
            a(e, this.faceLandmarks.getMouth(), !0)),
          o)
        ) {
          (e.strokeStyle = u), (e.fillStyle = u);
          this.faceLandmarks.positions.forEach(function (t) {
            e.beginPath(), e.arc(t.x, t.y, c, 0, 2 * Math.PI), e.fill();
          });
        }
      }),
      t
    );
  })();
var Te = Object.freeze({
  __proto__: null,
  drawContour: a,
  drawDetections: function (t, e) {
    (Array.isArray(e) ? e : [e]).forEach(function (e) {
      var n = e instanceof F ? e.score : V(e) ? e.detection.score : void 0,
        r = e instanceof F ? e.box : V(e) ? e.detection.box : new P(e),
        o = n ? "" + d(n) : void 0;
      new kt(r, { label: o }).draw(t);
    });
  },
  drawFaceExpressions: function (t, e, n, r) {
    void 0 === n && (n = 0.1),
      (Array.isArray(e) ? e : [e]).forEach(function (e) {
        var o = e instanceof we ? e : _e(e) ? e.expressions : void 0;
        if (!o)
          throw new Error(
            "drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof"
          );
        var i = o.asSortedArray().filter(function (t) {
            return t.probability > n;
          }),
          a = V(e) ? e.detection.box.bottomLeft : r || new x(0, 0),
          s = new St(
            i.map(function (t) {
              return t.expression + " (" + d(t.probability) + ")";
            }),
            a
          );
        s.draw(t);
      });
  },
  DrawBoxOptions: Ct,
  DrawBox: kt,
  DrawFaceLandmarksOptions: Me,
  DrawFaceLandmarks: Fe,
  drawFaceLandmarks: function (t, e) {
    (Array.isArray(e) ? e : [e]).forEach(function (e) {
      var n = e instanceof N ? e : Pe(e) ? e.landmarks : void 0;
      if (!n)
        throw new Error(
          "drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof"
        );
      new Fe(n).draw(t);
    });
  },
  get AnchorPosition() {
    return Et;
  },
  DrawTextFieldOptions: Dt,
  DrawTextField: St,
});
function De(t, e) {
  var n = [],
    r = he(t),
    o = r.extractWeights,
    i = r.getRemainingWeights,
    a = (function (t, e) {
      var n = oe(t, e),
        r = se(t, e);
      return {
        extractConvParams: n,
        extractSeparableConvParams: r,
        extractReductionBlockParams: function (t, e, o) {
          return {
            separable_conv0: r(t, e, o + "/separable_conv0"),
            separable_conv1: r(e, e, o + "/separable_conv1"),
            expansion_conv: n(t, e, 1, o + "/expansion_conv"),
          };
        },
        extractMainBlockParams: function (t, e) {
          return {
            separable_conv0: r(t, t, e + "/separable_conv0"),
            separable_conv1: r(t, t, e + "/separable_conv1"),
            separable_conv2: r(t, t, e + "/separable_conv2"),
          };
        },
      };
    })(o, n),
    s = a.extractConvParams,
    c = a.extractSeparableConvParams,
    u = a.extractReductionBlockParams,
    h = a.extractMainBlockParams,
    f = {
      conv_in: s(3, 32, 3, "entry_flow/conv_in"),
      reduction_block_0: u(32, 64, "entry_flow/reduction_block_0"),
      reduction_block_1: u(64, 128, "entry_flow/reduction_block_1"),
    },
    p = {};
  b(e, 0, 1).forEach(function (t) {
    p["main_block_" + t] = h(128, "middle_flow/main_block_" + t);
  });
  var l = {
    reduction_block: u(128, 256, "exit_flow/reduction_block"),
    separable_conv: c(256, 512, "exit_flow/separable_conv"),
  };
  if (0 !== i().length)
    throw new Error("weights remaing after extract: " + i().length);
  return {
    paramMappings: n,
    params: { entry_flow: f, middle_flow: p, exit_flow: l },
  };
}
function Se(t, e) {
  var n = [],
    r = (function (t, e) {
      var n = ue(t, e),
        r = pe(n),
        o = ce(n);
      return {
        extractConvParams: r,
        extractSeparableConvParams: o,
        extractReductionBlockParams: function (t) {
          return {
            separable_conv0: o(t + "/separable_conv0"),
            separable_conv1: o(t + "/separable_conv1"),
            expansion_conv: r(t + "/expansion_conv"),
          };
        },
        extractMainBlockParams: function (t) {
          return {
            separable_conv0: o(t + "/separable_conv0"),
            separable_conv1: o(t + "/separable_conv1"),
            separable_conv2: o(t + "/separable_conv2"),
          };
        },
      };
    })(t, n),
    o = r.extractConvParams,
    i = r.extractSeparableConvParams,
    a = r.extractReductionBlockParams,
    s = r.extractMainBlockParams,
    c = {
      conv_in: o("entry_flow/conv_in"),
      reduction_block_0: a("entry_flow/reduction_block_0"),
      reduction_block_1: a("entry_flow/reduction_block_1"),
    },
    u = {};
  b(e, 0, 1).forEach(function (t) {
    u["main_block_" + t] = s("middle_flow/main_block_" + t);
  });
  var h = {
    reduction_block: a("exit_flow/reduction_block"),
    separable_conv: i("exit_flow/separable_conv"),
  };
  return (
    re(t, n),
    {
      params: { entry_flow: c, middle_flow: u, exit_flow: h },
      paramMappings: n,
    }
  );
}
function Ce(e, n, r) {
  return t.add(t.conv2d(e, n.filters, r, "same"), n.bias);
}
function ke(e, n, r) {
  void 0 === r && (r = !0);
  var o = r ? t.relu(e) : e;
  return (
    (o = $t(o, n.separable_conv0, [1, 1])),
    (o = $t(t.relu(o), n.separable_conv1, [1, 1])),
    (o = t.maxPool(o, [3, 3], [2, 2], "same")),
    (o = t.add(o, Ce(e, n.expansion_conv, [2, 2])))
  );
}
var Oe,
  Ie = (function (n) {
    function r(t) {
      var e = n.call(this, "TinyXception") || this;
      return (e._numMainBlocks = t), e;
    }
    return (
      e(r, n),
      (r.prototype.forwardInput = function (e) {
        var n = this,
          r = this.params;
        if (!r) throw new Error("TinyXception - load model before inference");
        return t.tidy(function () {
          var o = C(e.toBatchTensor(112, !0), [122.782, 117.001, 104.298]).div(
              t.scalar(256)
            ),
            i = t.relu(Ce(o, r.entry_flow.conv_in, [2, 2]));
          return (
            (i = ke(i, r.entry_flow.reduction_block_0, !1)),
            (i = ke(i, r.entry_flow.reduction_block_1)),
            b(n._numMainBlocks, 0, 1).forEach(function (e) {
              i = (function (e, n) {
                var r = $t(t.relu(e), n.separable_conv0, [1, 1]);
                return (
                  (r = $t(t.relu(r), n.separable_conv1, [1, 1])),
                  (r = $t(t.relu(r), n.separable_conv2, [1, 1])),
                  t.add(r, e)
                );
              })(i, r.middle_flow["main_block_" + e]);
            }),
            (i = ke(i, r.exit_flow.reduction_block)),
            (i = t.relu($t(i, r.exit_flow.separable_conv, [1, 1])))
          );
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.getDefaultModelName = function () {
        return "tiny_xception_model";
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        return Se(t, this._numMainBlocks);
      }),
      (r.prototype.extractParams = function (t) {
        return De(t, this._numMainBlocks);
      }),
      r
    );
  })(Qt);
!(function (t) {
  (t.FEMALE = "female"), (t.MALE = "male");
})(Oe || (Oe = {}));
var Le = (function (n) {
    function r(t) {
      void 0 === t && (t = new Ie(2));
      var e = n.call(this, "AgeGenderNet") || this;
      return (e._faceFeatureExtractor = t), e;
    }
    return (
      e(r, n),
      Object.defineProperty(r.prototype, "faceFeatureExtractor", {
        get: function () {
          return this._faceFeatureExtractor;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (r.prototype.runNet = function (e) {
        var n = this,
          r = this.params;
        if (!r) throw new Error(this._name + " - load model before inference");
        return t.tidy(function () {
          var o = e instanceof zt ? n.faceFeatureExtractor.forwardInput(e) : e,
            i = t.avgPool(o, [7, 7], [2, 2], "valid").as2D(o.shape[0], -1);
          return { age: ve(i, r.fc.age).as1D(), gender: ve(i, r.fc.gender) };
        });
      }),
      (r.prototype.forwardInput = function (e) {
        var n = this;
        return t.tidy(function () {
          var r = n.runNet(e),
            o = r.age,
            i = r.gender;
          return { age: o, gender: t.softmax(i) };
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.predictAgeAndGender = function (e) {
        return o(this, void 0, void 0, function () {
          var n,
            r,
            a,
            s,
            c,
            u,
            h = this;
          return i(this, function (f) {
            switch (f.label) {
              case 0:
                return [4, Ht(e)];
              case 1:
                return (n = f.sent()), [4, this.forwardInput(n)];
              case 2:
                return (
                  (r = f.sent()),
                  (a = t.unstack(r.age)),
                  (s = t.unstack(r.gender)),
                  (c = a.map(function (t, e) {
                    return { ageTensor: t, genderTensor: s[e] };
                  })),
                  [
                    4,
                    Promise.all(
                      c.map(function (t) {
                        var e = t.ageTensor,
                          n = t.genderTensor;
                        return o(h, void 0, void 0, function () {
                          var t, r, o, a, s;
                          return i(this, function (i) {
                            switch (i.label) {
                              case 0:
                                return [4, e.data()];
                              case 1:
                                return (t = i.sent()[0]), [4, n.data()];
                              case 2:
                                return (
                                  (r = i.sent()[0]),
                                  (a = (o = r > 0.5) ? Oe.MALE : Oe.FEMALE),
                                  (s = o ? r : 1 - r),
                                  e.dispose(),
                                  n.dispose(),
                                  [
                                    2,
                                    { age: t, gender: a, genderProbability: s },
                                  ]
                                );
                            }
                          });
                        });
                      })
                    ),
                  ]
                );
              case 3:
                return (
                  (u = f.sent()),
                  r.age.dispose(),
                  r.gender.dispose(),
                  [2, n.isBatchInput ? u : u[0]]
                );
            }
          });
        });
      }),
      (r.prototype.getDefaultModelName = function () {
        return "age_gender_model";
      }),
      (r.prototype.dispose = function (t) {
        void 0 === t && (t = !0),
          this.faceFeatureExtractor.dispose(t),
          n.prototype.dispose.call(this, t);
      }),
      (r.prototype.loadClassifierParams = function (t) {
        var e = this.extractClassifierParams(t),
          n = e.params,
          r = e.paramMappings;
        (this._params = n), (this._paramMappings = r);
      }),
      (r.prototype.extractClassifierParams = function (t) {
        return (function (t) {
          var e = [],
            n = he(t),
            r = n.extractWeights,
            o = n.getRemainingWeights,
            i = ie(r, e),
            a = i(512, 1, "fc/age"),
            s = i(512, 2, "fc/gender");
          if (0 !== o().length)
            throw new Error("weights remaing after extract: " + o().length);
          return { paramMappings: e, params: { fc: { age: a, gender: s } } };
        })(t);
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        var e = me(t),
          n = e.featureExtractorMap,
          r = e.classifierMap;
        return (
          this.faceFeatureExtractor.loadFromWeightMap(n),
          (function (t) {
            var e = [],
              n = ue(t, e);
            function r(t) {
              return { weights: n(t + "/weights", 2), bias: n(t + "/bias", 1) };
            }
            var o = { fc: { age: r("fc/age"), gender: r("fc/gender") } };
            return re(t, e), { params: o, paramMappings: e };
          })(r)
        );
      }),
      (r.prototype.extractParams = function (t) {
        var e = t.slice(0, t.length - 1539),
          n = t.slice(t.length - 1539);
        return (
          this.faceFeatureExtractor.extractWeights(e),
          this.extractClassifierParams(n)
        );
      }),
      r
    );
  })(Qt),
  Ae = (function (n) {
    function r() {
      return (null !== n && n.apply(this, arguments)) || this;
    }
    return (
      e(r, n),
      (r.prototype.postProcess = function (e, n, r) {
        var o = r.map(function (t) {
            var e = t.width,
              r = t.height,
              o = n / Math.max(r, e);
            return { width: e * o, height: r * o };
          }),
          i = o.length;
        return t.tidy(function () {
          var r = function (e, n) {
              return t
                .stack([t.fill([68], e), t.fill([68], n)], 1)
                .as2D(1, 136)
                .as1D();
            },
            a = function (t, e) {
              var n = o[t],
                r = n.width,
                i = n.height;
              return e(r, i) ? Math.abs(r - i) / 2 : 0;
            };
          return e
            .mul(t.fill([i, 136], n))
            .sub(
              t.stack(
                Array.from(Array(i), function (t, e) {
                  return r(
                    (function (t) {
                      return a(t, function (t, e) {
                        return t < e;
                      });
                    })(e),
                    (function (t) {
                      return a(t, function (t, e) {
                        return e < t;
                      });
                    })(e)
                  );
                })
              )
            )
            .div(
              t.stack(
                Array.from(Array(i), function (t, e) {
                  return r(o[e].width, o[e].height);
                })
              )
            );
        });
      }),
      (r.prototype.forwardInput = function (e) {
        var n = this;
        return t.tidy(function () {
          var t = n.runNet(e);
          return n.postProcess(
            t,
            e.inputSize,
            e.inputDimensions.map(function (t) {
              return { height: t[0], width: t[1] };
            })
          );
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.detectLandmarks = function (e) {
        return o(this, void 0, void 0, function () {
          var n,
            r,
            a,
            s = this;
          return i(this, function (c) {
            switch (c.label) {
              case 0:
                return [4, Ht(e)];
              case 1:
                return (
                  (n = c.sent()),
                  (r = t.tidy(function () {
                    return t.unstack(s.forwardInput(n));
                  })),
                  [
                    4,
                    Promise.all(
                      r.map(function (t, e) {
                        return o(s, void 0, void 0, function () {
                          var r, o, a, s, c;
                          return i(this, function (i) {
                            switch (i.label) {
                              case 0:
                                return (a = (o = Array).from), [4, t.data()];
                              case 1:
                                return (
                                  (r = a.apply(o, [i.sent()])),
                                  (s = r.filter(function (t, e) {
                                    return l(e);
                                  })),
                                  (c = r.filter(function (t, e) {
                                    return !l(e);
                                  })),
                                  [
                                    2,
                                    new B(
                                      Array(68)
                                        .fill(0)
                                        .map(function (t, e) {
                                          return new x(s[e], c[e]);
                                        }),
                                      {
                                        height: n.getInputHeight(e),
                                        width: n.getInputWidth(e),
                                      }
                                    ),
                                  ]
                                );
                            }
                          });
                        });
                      })
                    ),
                  ]
                );
              case 2:
                return (
                  (a = c.sent()),
                  r.forEach(function (t) {
                    return t.dispose();
                  }),
                  [2, n.isBatchInput ? a : a[0]]
                );
            }
          });
        });
      }),
      (r.prototype.getClassifierChannelsOut = function () {
        return 136;
      }),
      r
    );
  })(ge),
  Ne = (function (t) {
    function n(e) {
      return (
        void 0 === e && (e = new de()),
        t.call(this, "FaceLandmark68Net", e) || this
      );
    }
    return (
      e(n, t),
      (n.prototype.getDefaultModelName = function () {
        return "face_landmark_68_model";
      }),
      (n.prototype.getClassifierChannelsIn = function () {
        return 256;
      }),
      n
    );
  })(Ae);
var je = (function (n) {
    function r() {
      return n.call(this, "TinyFaceFeatureExtractor") || this;
    }
    return (
      e(r, n),
      (r.prototype.forwardInput = function (e) {
        var n = this.params;
        if (!n)
          throw new Error(
            "TinyFaceFeatureExtractor - load model before inference"
          );
        return t.tidy(function () {
          var r = te(
            C(e.toBatchTensor(112, !0), [122.782, 117.001, 104.298]).div(
              t.scalar(255)
            ),
            n.dense0,
            !0
          );
          return (
            (r = te(r, n.dense1)),
            (r = te(r, n.dense2)),
            (r = t.avgPool(r, [14, 14], [2, 2], "valid"))
          );
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.getDefaultModelName = function () {
        return "face_feature_extractor_tiny_model";
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        return (function (t) {
          var e = [],
            n = le(t, e).extractDenseBlock3Params,
            r = {
              dense0: n("dense0", !0),
              dense1: n("dense1"),
              dense2: n("dense2"),
            };
          return re(t, e), { params: r, paramMappings: e };
        })(t);
      }),
      (r.prototype.extractParams = function (t) {
        return (function (t) {
          var e = [],
            n = he(t),
            r = n.extractWeights,
            o = n.getRemainingWeights,
            i = fe(r, e).extractDenseBlock3Params,
            a = i(3, 32, "dense0", !0),
            s = i(32, 64, "dense1"),
            c = i(64, 128, "dense2");
          if (0 !== o().length)
            throw new Error("weights remaing after extract: " + o().length);
          return {
            paramMappings: e,
            params: { dense0: a, dense1: s, dense2: c },
          };
        })(t);
      }),
      r
    );
  })(Qt),
  Be = (function (t) {
    function n(e) {
      return (
        void 0 === e && (e = new je()),
        t.call(this, "FaceLandmark68TinyNet", e) || this
      );
    }
    return (
      e(n, t),
      (n.prototype.getDefaultModelName = function () {
        return "face_landmark_68_tiny_model";
      }),
      (n.prototype.getClassifierChannelsIn = function () {
        return 128;
      }),
      n
    );
  })(Ae),
  We = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return e(n, t), n;
  })(Ne);
function Re(e, n, r, o, i) {
  void 0 === i && (i = "same");
  var a = n.conv,
    s = a.filters,
    c = a.bias,
    u = t.conv2d(e, s, r, i);
  return (
    (u = (function (e, n) {
      return t.add(t.mul(e, n.weights), n.biases);
    })((u = t.add(u, c)), n.scale)),
    o ? t.relu(u) : u
  );
}
function ze(t, e) {
  return Re(t, e, [1, 1], !1);
}
function He(t, e) {
  return Re(t, e, [2, 2], !0, "valid");
}
function Ve(e, n) {
  function r(r, o, i, a) {
    var s = (function (n, r, o) {
        var i = e(n),
          a = i.length / (r * o * o);
        if (p(a))
          throw new Error(
            "depth has to be an integer: " +
              a +
              ", weights.length: " +
              i.length +
              ", numFilters: " +
              r +
              ", filterSize: " +
              o
          );
        return t.tidy(function () {
          return t.transpose(t.tensor4d(i, [r, a, o, o]), [2, 3, 1, 0]);
        });
      })(r, o, i),
      c = t.tensor1d(e(o));
    return (
      n.push({ paramPath: a + "/filters" }, { paramPath: a + "/bias" }),
      { filters: s, bias: c }
    );
  }
  function o(o, i, a, s) {
    var c = r(o, i, a, s + "/conv"),
      u = (function (r, o) {
        var i = t.tensor1d(e(r)),
          a = t.tensor1d(e(r));
        return (
          n.push({ paramPath: o + "/weights" }, { paramPath: o + "/biases" }),
          { weights: i, biases: a }
        );
      })(i, s + "/scale");
    return { conv: c, scale: u };
  }
  return {
    extractConvLayerParams: o,
    extractResidualLayerParams: function (t, e, n, r, i) {
      return (
        void 0 === i && (i = !1),
        {
          conv1: o((i ? 0.5 : 1) * t, e, n, r + "/conv1"),
          conv2: o(t, e, n, r + "/conv2"),
        }
      );
    },
  };
}
function Ge(t, e) {
  var n = ue(t, e);
  function r(t) {
    var e = n(t + "/conv/filters", 4),
      r = n(t + "/conv/bias", 1),
      o = (function (t) {
        return {
          weights: n(t + "/scale/weights", 1),
          biases: n(t + "/scale/biases", 1),
        };
      })(t);
    return { conv: { filters: e, bias: r }, scale: o };
  }
  return {
    extractConvLayerParams: r,
    extractResidualLayerParams: function (t) {
      return { conv1: r(t + "/conv1"), conv2: r(t + "/conv2") };
    },
  };
}
function Ue(e, n) {
  var r = (function (t, e) {
    return Re(t, e, [1, 1], !0);
  })(e, n.conv1);
  return (r = ze(r, n.conv2)), (r = t.add(r, e)), (r = t.relu(r));
}
function Je(e, r) {
  var o = He(e, r.conv1);
  o = ze(o, r.conv2);
  var i = t.avgPool(e, 2, 2, "valid"),
    a = t.zeros(i.shape),
    s = i.shape[3] !== o.shape[3];
  if (i.shape[1] !== o.shape[1] || i.shape[2] !== o.shape[2]) {
    var c = n(o.shape);
    c[1] = 1;
    var u = t.zeros(c);
    o = t.concat([o, u], 1);
    var h = n(o.shape);
    h[2] = 1;
    var f = t.zeros(h);
    o = t.concat([o, f], 2);
  }
  return (i = s ? t.concat([i, a], 3) : i), (o = t.add(i, o)), (o = t.relu(o));
}
var Ye = (function (n) {
  function r() {
    return n.call(this, "FaceRecognitionNet") || this;
  }
  return (
    e(r, n),
    (r.prototype.forwardInput = function (e) {
      var n = this.params;
      if (!n)
        throw new Error("FaceRecognitionNet - load model before inference");
      return t.tidy(function () {
        var r = He(
          C(
            e.toBatchTensor(150, !0).toFloat(),
            [122.782, 117.001, 104.298]
          ).div(t.scalar(256)),
          n.conv32_down
        );
        (r = Ue((r = t.maxPool(r, 3, 2, "valid")), n.conv32_1)),
          (r = Ue(r, n.conv32_2)),
          (r = Ue(r, n.conv32_3)),
          (r = Ue((r = Je(r, n.conv64_down)), n.conv64_1)),
          (r = Ue(r, n.conv64_2)),
          (r = Ue(r, n.conv64_3)),
          (r = Ue((r = Je(r, n.conv128_down)), n.conv128_1)),
          (r = Ue(r, n.conv128_2)),
          (r = Ue((r = Je(r, n.conv256_down)), n.conv256_1));
        var o = (r = Je((r = Ue(r, n.conv256_2)), n.conv256_down_out)).mean([
          1, 2,
        ]);
        return t.matMul(o, n.fc);
      });
    }),
    (r.prototype.forward = function (t) {
      return o(this, void 0, void 0, function () {
        var e;
        return i(this, function (n) {
          switch (n.label) {
            case 0:
              return (e = this.forwardInput), [4, Ht(t)];
            case 1:
              return [2, e.apply(this, [n.sent()])];
          }
        });
      });
    }),
    (r.prototype.computeFaceDescriptor = function (e) {
      return o(this, void 0, void 0, function () {
        var n,
          r,
          o,
          a = this;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              return [4, Ht(e)];
            case 1:
              return (
                (n = i.sent()),
                (r = t.tidy(function () {
                  return t.unstack(a.forwardInput(n));
                })),
                [
                  4,
                  Promise.all(
                    r.map(function (t) {
                      return t.data();
                    })
                  ),
                ]
              );
            case 2:
              return (
                (o = i.sent()),
                r.forEach(function (t) {
                  return t.dispose();
                }),
                [2, n.isBatchInput ? o : o[0]]
              );
          }
        });
      });
    }),
    (r.prototype.getDefaultModelName = function () {
      return "face_recognition_model";
    }),
    (r.prototype.extractParamsFromWeigthMap = function (t) {
      return (function (t) {
        var e = [],
          n = Ge(t, e),
          r = n.extractConvLayerParams,
          o = n.extractResidualLayerParams,
          i = r("conv32_down"),
          a = o("conv32_1"),
          s = o("conv32_2"),
          c = o("conv32_3"),
          h = o("conv64_down"),
          f = o("conv64_1"),
          p = o("conv64_2"),
          l = o("conv64_3"),
          d = o("conv128_down"),
          v = o("conv128_1"),
          m = o("conv128_2"),
          g = o("conv256_down"),
          b = o("conv256_1"),
          w = o("conv256_2"),
          y = o("conv256_down_out"),
          _ = t.fc;
        if ((e.push({ originalPath: "fc", paramPath: "fc" }), !u(_)))
          throw new Error(
            "expected weightMap[fc] to be a Tensor2D, instead have " + _
          );
        var x = {
          conv32_down: i,
          conv32_1: a,
          conv32_2: s,
          conv32_3: c,
          conv64_down: h,
          conv64_1: f,
          conv64_2: p,
          conv64_3: l,
          conv128_down: d,
          conv128_1: v,
          conv128_2: m,
          conv256_down: g,
          conv256_1: b,
          conv256_2: w,
          conv256_down_out: y,
          fc: _,
        };
        return re(t, e), { params: x, paramMappings: e };
      })(t);
    }),
    (r.prototype.extractParams = function (e) {
      return (function (e) {
        var n = he(e),
          r = n.extractWeights,
          o = n.getRemainingWeights,
          i = [],
          a = Ve(r, i),
          s = a.extractConvLayerParams,
          c = a.extractResidualLayerParams,
          u = s(4704, 32, 7, "conv32_down"),
          h = c(9216, 32, 3, "conv32_1"),
          f = c(9216, 32, 3, "conv32_2"),
          p = c(9216, 32, 3, "conv32_3"),
          l = c(36864, 64, 3, "conv64_down", !0),
          d = c(36864, 64, 3, "conv64_1"),
          v = c(36864, 64, 3, "conv64_2"),
          m = c(36864, 64, 3, "conv64_3"),
          g = c(147456, 128, 3, "conv128_down", !0),
          b = c(147456, 128, 3, "conv128_1"),
          w = c(147456, 128, 3, "conv128_2"),
          y = c(589824, 256, 3, "conv256_down", !0),
          _ = c(589824, 256, 3, "conv256_1"),
          x = c(589824, 256, 3, "conv256_2"),
          P = c(589824, 256, 3, "conv256_down_out"),
          E = t.tidy(function () {
            return t.transpose(t.tensor2d(r(32768), [128, 256]), [1, 0]);
          });
        if ((i.push({ paramPath: "fc" }), 0 !== o().length))
          throw new Error("weights remaing after extract: " + o().length);
        return {
          params: {
            conv32_down: u,
            conv32_1: h,
            conv32_2: f,
            conv32_3: p,
            conv64_down: l,
            conv64_1: d,
            conv64_2: v,
            conv64_3: m,
            conv128_down: g,
            conv128_1: b,
            conv128_2: w,
            conv256_down: y,
            conv256_1: _,
            conv256_2: x,
            conv256_down_out: P,
            fc: E,
          },
          paramMappings: i,
        };
      })(e);
    }),
    r
  );
})(Qt);
function qe(t) {
  var e = new Ye();
  return e.extractWeights(t), e;
}
function Xe(t, e) {
  var n = { descriptor: e };
  return Object.assign({}, t, n);
}
function Ze(t) {
  return "number" == typeof t.age;
}
function Ke(t, e) {
  var n = { age: e };
  return Object.assign({}, t, n);
}
function Qe(t) {
  return (
    (t.gender === Oe.MALE || t.gender === Oe.FEMALE) && y(t.genderProbability)
  );
}
function $e(t, e, n) {
  var r = { gender: e, genderProbability: n };
  return Object.assign({}, t, r);
}
var tn = (function () {
  function t(t) {
    var e = void 0 === t ? {} : t,
      n = e.minFaceSize,
      r = e.scaleFactor,
      o = e.maxNumScales,
      i = e.scoreThresholds,
      a = e.scaleSteps;
    if (
      ((this._name = "MtcnnOptions"),
      (this._minFaceSize = n || 20),
      (this._scaleFactor = r || 0.709),
      (this._maxNumScales = o || 10),
      (this._scoreThresholds = i || [0.6, 0.7, 0.7]),
      (this._scaleSteps = a),
      "number" != typeof this._minFaceSize || this._minFaceSize < 0)
    )
      throw new Error(
        this._name + " - expected minFaceSize to be a number > 0"
      );
    if (
      "number" != typeof this._scaleFactor ||
      this._scaleFactor <= 0 ||
      this._scaleFactor >= 1
    )
      throw new Error(
        this._name + " - expected scaleFactor to be a number between 0 and 1"
      );
    if ("number" != typeof this._maxNumScales || this._maxNumScales < 0)
      throw new Error(
        this._name + " - expected maxNumScales to be a number > 0"
      );
    if (
      !Array.isArray(this._scoreThresholds) ||
      3 !== this._scoreThresholds.length ||
      this._scoreThresholds.some(function (t) {
        return "number" != typeof t;
      })
    )
      throw new Error(
        this._name +
          " - expected scoreThresholds to be an array of numbers of length 3"
      );
    if (
      this._scaleSteps &&
      (!Array.isArray(this._scaleSteps) ||
        this._scaleSteps.some(function (t) {
          return "number" != typeof t;
        }))
    )
      throw new Error(
        this._name + " - expected scaleSteps to be an array of numbers"
      );
  }
  return (
    Object.defineProperty(t.prototype, "minFaceSize", {
      get: function () {
        return this._minFaceSize;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "scaleFactor", {
      get: function () {
        return this._scaleFactor;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "maxNumScales", {
      get: function () {
        return this._maxNumScales;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "scoreThresholds", {
      get: function () {
        return this._scoreThresholds;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "scaleSteps", {
      get: function () {
        return this._scaleSteps;
      },
      enumerable: !0,
      configurable: !0,
    }),
    t
  );
})();
function en(e, n) {
  function r(r, o, i, a, s) {
    var c = t.tensor4d(e(r * o * i * i), [i, i, r, o]),
      u = t.tensor1d(e(o));
    return (
      n.push(
        { paramPath: a + "/filters" },
        { paramPath: a + "/" + (s ? "batch_norm_offset" : "bias") }
      ),
      { filters: c, bias: u }
    );
  }
  function o(t, e, n, o) {
    var i = r(t, e, n, o, !0);
    return { filters: i.filters, batch_norm_offset: i.bias };
  }
  function i(r, i, a) {
    var s = (function (r, o) {
      var i = t.tensor4d(e(9 * r), [3, 3, r, 1]),
        a = t.tensor1d(e(r)),
        s = t.tensor1d(e(r)),
        c = t.tensor1d(e(r)),
        u = t.tensor1d(e(r));
      return (
        n.push(
          { paramPath: o + "/filters" },
          { paramPath: o + "/batch_norm_scale" },
          { paramPath: o + "/batch_norm_offset" },
          { paramPath: o + "/batch_norm_mean" },
          { paramPath: o + "/batch_norm_variance" }
        ),
        {
          filters: i,
          batch_norm_scale: a,
          batch_norm_offset: s,
          batch_norm_mean: c,
          batch_norm_variance: u,
        }
      );
    })(r, a + "/depthwise_conv");
    return {
      depthwise_conv: s,
      pointwise_conv: o(r, i, 1, a + "/pointwise_conv"),
    };
  }
  return {
    extractMobilenetV1Params: function () {
      return {
        conv_0: o(3, 32, 3, "mobilenetv1/conv_0"),
        conv_1: i(32, 64, "mobilenetv1/conv_1"),
        conv_2: i(64, 128, "mobilenetv1/conv_2"),
        conv_3: i(128, 128, "mobilenetv1/conv_3"),
        conv_4: i(128, 256, "mobilenetv1/conv_4"),
        conv_5: i(256, 256, "mobilenetv1/conv_5"),
        conv_6: i(256, 512, "mobilenetv1/conv_6"),
        conv_7: i(512, 512, "mobilenetv1/conv_7"),
        conv_8: i(512, 512, "mobilenetv1/conv_8"),
        conv_9: i(512, 512, "mobilenetv1/conv_9"),
        conv_10: i(512, 512, "mobilenetv1/conv_10"),
        conv_11: i(512, 512, "mobilenetv1/conv_11"),
        conv_12: i(512, 1024, "mobilenetv1/conv_12"),
        conv_13: i(1024, 1024, "mobilenetv1/conv_13"),
      };
    },
    extractPredictionLayerParams: function () {
      return {
        conv_0: o(1024, 256, 1, "prediction_layer/conv_0"),
        conv_1: o(256, 512, 3, "prediction_layer/conv_1"),
        conv_2: o(512, 128, 1, "prediction_layer/conv_2"),
        conv_3: o(128, 256, 3, "prediction_layer/conv_3"),
        conv_4: o(256, 128, 1, "prediction_layer/conv_4"),
        conv_5: o(128, 256, 3, "prediction_layer/conv_5"),
        conv_6: o(256, 64, 1, "prediction_layer/conv_6"),
        conv_7: o(64, 128, 3, "prediction_layer/conv_7"),
        box_predictor_0: {
          box_encoding_predictor: r(
            512,
            12,
            1,
            "prediction_layer/box_predictor_0/box_encoding_predictor"
          ),
          class_predictor: r(
            512,
            9,
            1,
            "prediction_layer/box_predictor_0/class_predictor"
          ),
        },
        box_predictor_1: {
          box_encoding_predictor: r(
            1024,
            24,
            1,
            "prediction_layer/box_predictor_1/box_encoding_predictor"
          ),
          class_predictor: r(
            1024,
            18,
            1,
            "prediction_layer/box_predictor_1/class_predictor"
          ),
        },
        box_predictor_2: {
          box_encoding_predictor: r(
            512,
            24,
            1,
            "prediction_layer/box_predictor_2/box_encoding_predictor"
          ),
          class_predictor: r(
            512,
            18,
            1,
            "prediction_layer/box_predictor_2/class_predictor"
          ),
        },
        box_predictor_3: {
          box_encoding_predictor: r(
            256,
            24,
            1,
            "prediction_layer/box_predictor_3/box_encoding_predictor"
          ),
          class_predictor: r(
            256,
            18,
            1,
            "prediction_layer/box_predictor_3/class_predictor"
          ),
        },
        box_predictor_4: {
          box_encoding_predictor: r(
            256,
            24,
            1,
            "prediction_layer/box_predictor_4/box_encoding_predictor"
          ),
          class_predictor: r(
            256,
            18,
            1,
            "prediction_layer/box_predictor_4/class_predictor"
          ),
        },
        box_predictor_5: {
          box_encoding_predictor: r(
            128,
            24,
            1,
            "prediction_layer/box_predictor_5/box_encoding_predictor"
          ),
          class_predictor: r(
            128,
            18,
            1,
            "prediction_layer/box_predictor_5/class_predictor"
          ),
        },
      };
    },
  };
}
function nn(t) {
  var e = [],
    n = (function (t, e) {
      var n = ue(t, e);
      function r(t, e, r) {
        return {
          filters: n(
            t + "/Conv2d_" + e + "_pointwise/weights",
            4,
            r + "/filters"
          ),
          batch_norm_offset: n(
            t + "/Conv2d_" + e + "_pointwise/convolution_bn_offset",
            1,
            r + "/batch_norm_offset"
          ),
        };
      }
      function o(t) {
        var e = "mobilenetv1/conv_" + t,
          o = "MobilenetV1/Conv2d_" + t + "_depthwise",
          i = e + "/depthwise_conv",
          a = e + "/pointwise_conv";
        return {
          depthwise_conv: {
            filters: n(o + "/depthwise_weights", 4, i + "/filters"),
            batch_norm_scale: n(
              o + "/BatchNorm/gamma",
              1,
              i + "/batch_norm_scale"
            ),
            batch_norm_offset: n(
              o + "/BatchNorm/beta",
              1,
              i + "/batch_norm_offset"
            ),
            batch_norm_mean: n(
              o + "/BatchNorm/moving_mean",
              1,
              i + "/batch_norm_mean"
            ),
            batch_norm_variance: n(
              o + "/BatchNorm/moving_variance",
              1,
              i + "/batch_norm_variance"
            ),
          },
          pointwise_conv: r("MobilenetV1", t, a),
        };
      }
      function i(t, e) {
        return {
          filters: n(t + "/weights", 4, e + "/filters"),
          bias: n(t + "/biases", 1, e + "/bias"),
        };
      }
      function a(t) {
        return {
          box_encoding_predictor: i(
            "Prediction/BoxPredictor_" + t + "/BoxEncodingPredictor",
            "prediction_layer/box_predictor_" + t + "/box_encoding_predictor"
          ),
          class_predictor: i(
            "Prediction/BoxPredictor_" + t + "/ClassPredictor",
            "prediction_layer/box_predictor_" + t + "/class_predictor"
          ),
        };
      }
      return {
        extractMobilenetV1Params: function () {
          return {
            conv_0: r("MobilenetV1", 0, "mobilenetv1/conv_0"),
            conv_1: o(1),
            conv_2: o(2),
            conv_3: o(3),
            conv_4: o(4),
            conv_5: o(5),
            conv_6: o(6),
            conv_7: o(7),
            conv_8: o(8),
            conv_9: o(9),
            conv_10: o(10),
            conv_11: o(11),
            conv_12: o(12),
            conv_13: o(13),
          };
        },
        extractPredictionLayerParams: function () {
          return {
            conv_0: r("Prediction", 0, "prediction_layer/conv_0"),
            conv_1: r("Prediction", 1, "prediction_layer/conv_1"),
            conv_2: r("Prediction", 2, "prediction_layer/conv_2"),
            conv_3: r("Prediction", 3, "prediction_layer/conv_3"),
            conv_4: r("Prediction", 4, "prediction_layer/conv_4"),
            conv_5: r("Prediction", 5, "prediction_layer/conv_5"),
            conv_6: r("Prediction", 6, "prediction_layer/conv_6"),
            conv_7: r("Prediction", 7, "prediction_layer/conv_7"),
            box_predictor_0: a(0),
            box_predictor_1: a(1),
            box_predictor_2: a(2),
            box_predictor_3: a(3),
            box_predictor_4: a(4),
            box_predictor_5: a(5),
          };
        },
      };
    })(t, e),
    r = n.extractMobilenetV1Params,
    o = n.extractPredictionLayerParams,
    i = t["Output/extra_dim"];
  if (
    (e.push({
      originalPath: "Output/extra_dim",
      paramPath: "output_layer/extra_dim",
    }),
    !h(i))
  )
    throw new Error(
      "expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have " +
        i
    );
  var a = {
    mobilenetv1: r(),
    prediction_layer: o(),
    output_layer: { extra_dim: i },
  };
  return re(t, e), { params: a, paramMappings: e };
}
function rn(e, n, r) {
  return t.tidy(function () {
    var o = t.conv2d(e, n.filters, r, "same");
    return (o = t.add(o, n.batch_norm_offset)), t.clipByValue(o, 0, 6);
  });
}
var on = 0.0010000000474974513;
function an(e, n) {
  return t.tidy(function () {
    var r = null,
      o = rn(e, n.conv_0, [2, 2]);
    if (
      ([
        n.conv_1,
        n.conv_2,
        n.conv_3,
        n.conv_4,
        n.conv_5,
        n.conv_6,
        n.conv_7,
        n.conv_8,
        n.conv_9,
        n.conv_10,
        n.conv_11,
        n.conv_12,
        n.conv_13,
      ].forEach(function (e, n) {
        var i = n + 1,
          a = (function (t) {
            return [2, 4, 6, 12].some(function (e) {
              return e === t;
            })
              ? [2, 2]
              : [1, 1];
          })(i);
        (o = (function (e, n, r) {
          return t.tidy(function () {
            var o = t.depthwiseConv2d(e, n.filters, r, "same");
            return (
              (o = t.batchNorm(
                o,
                n.batch_norm_mean,
                n.batch_norm_variance,
                n.batch_norm_offset,
                n.batch_norm_scale,
                on
              )),
              t.clipByValue(o, 0, 6)
            );
          });
        })(o, e.depthwise_conv, a)),
          (o = rn(o, e.pointwise_conv, [1, 1])),
          11 === i && (r = o);
      }),
      null === r)
    )
      throw new Error("mobileNetV1 - output of conv layer 11 is null");
    return { out: o, conv11: r };
  });
}
function sn(t, e, n) {
  var r = t.arraySync(),
    o = Math.min(r[e][0], r[e][2]),
    i = Math.min(r[e][1], r[e][3]),
    a = Math.max(r[e][0], r[e][2]),
    s = Math.max(r[e][1], r[e][3]),
    c = Math.min(r[n][0], r[n][2]),
    u = Math.min(r[n][1], r[n][3]),
    h = Math.max(r[n][0], r[n][2]),
    f = Math.max(r[n][1], r[n][3]),
    p = (a - o) * (s - i),
    l = (h - c) * (f - u);
  if (p <= 0 || l <= 0) return 0;
  var d = Math.max(o, c),
    v = Math.max(i, u),
    m = Math.min(a, h),
    g = Math.min(s, f),
    b = Math.max(m - d, 0) * Math.max(g - v, 0);
  return b / (p + l - b);
}
function cn(e, n) {
  var r = (function (e) {
      var n = t.unstack(t.transpose(e, [1, 0])),
        r = [t.sub(n[2], n[0]), t.sub(n[3], n[1])];
      return {
        sizes: r,
        centers: [
          t.add(n[0], t.div(r[0], t.scalar(2))),
          t.add(n[1], t.div(r[1], t.scalar(2))),
        ],
      };
    })(e),
    o = r.sizes,
    i = r.centers,
    a = t.unstack(t.transpose(n, [1, 0])),
    s = t.div(t.mul(t.exp(t.div(a[2], t.scalar(5))), o[0]), t.scalar(2)),
    c = t.add(t.mul(t.div(a[0], t.scalar(10)), o[0]), i[0]),
    u = t.div(t.mul(t.exp(t.div(a[3], t.scalar(5))), o[1]), t.scalar(2)),
    h = t.add(t.mul(t.div(a[1], t.scalar(10)), o[1]), i[1]);
  return t.transpose(
    t.stack([t.sub(c, s), t.sub(h, u), t.add(c, s), t.add(h, u)]),
    [1, 0]
  );
}
function un(e, n) {
  return t.tidy(function () {
    var r = e.shape[0];
    return {
      boxPredictionEncoding: t.reshape(ne(e, n.box_encoding_predictor), [
        r,
        -1,
        1,
        4,
      ]),
      classPrediction: t.reshape(ne(e, n.class_predictor), [r, -1, 3]),
    };
  });
}
var hn = (function () {
    function t(t) {
      var e = void 0 === t ? {} : t,
        n = e.minConfidence,
        r = e.maxResults;
      if (
        ((this._name = "SsdMobilenetv1Options"),
        (this._minConfidence = n || 0.5),
        (this._maxResults = r || 100),
        "number" != typeof this._minConfidence ||
          this._minConfidence <= 0 ||
          this._minConfidence >= 1)
      )
        throw new Error(
          this._name +
            " - expected minConfidence to be a number between 0 and 1"
        );
      if ("number" != typeof this._maxResults)
        throw new Error(this._name + " - expected maxResults to be a number");
    }
    return (
      Object.defineProperty(t.prototype, "minConfidence", {
        get: function () {
          return this._minConfidence;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "maxResults", {
        get: function () {
          return this._maxResults;
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    );
  })(),
  fn = (function (n) {
    function r() {
      return n.call(this, "SsdMobilenetv1") || this;
    }
    return (
      e(r, n),
      (r.prototype.forwardInput = function (e) {
        var n = this.params;
        if (!n) throw new Error("SsdMobilenetv1 - load model before inference");
        return t.tidy(function () {
          var r = e.toBatchTensor(512, !1).toFloat(),
            o = an(
              t.sub(t.mul(r, t.scalar(0.007843137718737125)), t.scalar(1)),
              n.mobilenetv1
            ),
            i = (function (e, n, r) {
              return t.tidy(function () {
                var o = rn(e, r.conv_0, [1, 1]),
                  i = rn(o, r.conv_1, [2, 2]),
                  a = rn(i, r.conv_2, [1, 1]),
                  s = rn(a, r.conv_3, [2, 2]),
                  c = rn(s, r.conv_4, [1, 1]),
                  u = rn(c, r.conv_5, [2, 2]),
                  h = rn(u, r.conv_6, [1, 1]),
                  f = rn(h, r.conv_7, [2, 2]),
                  p = un(n, r.box_predictor_0),
                  l = un(e, r.box_predictor_1),
                  d = un(i, r.box_predictor_2),
                  v = un(s, r.box_predictor_3),
                  m = un(u, r.box_predictor_4),
                  g = un(f, r.box_predictor_5);
                return {
                  boxPredictions: t.concat(
                    [
                      p.boxPredictionEncoding,
                      l.boxPredictionEncoding,
                      d.boxPredictionEncoding,
                      v.boxPredictionEncoding,
                      m.boxPredictionEncoding,
                      g.boxPredictionEncoding,
                    ],
                    1
                  ),
                  classPredictions: t.concat(
                    [
                      p.classPrediction,
                      l.classPrediction,
                      d.classPrediction,
                      v.classPrediction,
                      m.classPrediction,
                      g.classPrediction,
                    ],
                    1
                  ),
                };
              });
            })(o.out, o.conv11, n.prediction_layer);
          return (function (e, n, r) {
            return t.tidy(function () {
              var o = e.shape[0],
                i = cn(
                  t.reshape(t.tile(r.extra_dim, [o, 1, 1]), [-1, 4]),
                  t.reshape(e, [-1, 4])
                );
              i = t.reshape(i, [o, i.shape[0] / o, 4]);
              var a = t.sigmoid(t.slice(n, [0, 0, 1], [-1, -1, -1])),
                s = t.slice(a, [0, 0, 0], [-1, -1, 1]);
              return (
                (s = t.reshape(s, [o, s.shape[1]])),
                { boxes: t.unstack(i), scores: t.unstack(s) }
              );
            });
          })(i.boxPredictions, i.classPredictions, n.output_layer);
        });
      }),
      (r.prototype.forward = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = this.forwardInput), [4, Ht(t)];
              case 1:
                return [2, e.apply(this, [n.sent()])];
            }
          });
        });
      }),
      (r.prototype.locateFaces = function (t, e) {
        return (
          void 0 === e && (e = {}),
          o(this, void 0, void 0, function () {
            var n, r, o, a, s, c, u, h, f, p, l, d, v, m, g, b, w, y, _, x;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (n = new hn(e)),
                    (r = n.maxResults),
                    (o = n.minConfidence),
                    [4, Ht(t)]
                  );
                case 1:
                  for (
                    a = i.sent(),
                      s = this.forwardInput(a),
                      c = s.boxes,
                      u = s.scores,
                      h = c[0],
                      f = u[0],
                      p = 1;
                    p < c.length;
                    p++
                  )
                    c[p].dispose(), u[p].dispose();
                  return (v = (d = Array).from), [4, f.data()];
                case 2:
                  return (
                    (l = v.apply(d, [i.sent()])),
                    0.5,
                    (m = (function (t, e, n, r, o) {
                      var i = t.shape[0],
                        a = Math.min(n, i),
                        s = e
                          .map(function (t, e) {
                            return { score: t, boxIndex: e };
                          })
                          .filter(function (t) {
                            return t.score > o;
                          })
                          .sort(function (t, e) {
                            return e.score - t.score;
                          }),
                        c = [];
                      return (
                        s.forEach(function (e) {
                          if (!(c.length >= a)) {
                            for (
                              var n = e.score, i = c.length - 1;
                              i >= 0;
                              --i
                            ) {
                              var s = sn(t, e.boxIndex, c[i]);
                              if (
                                0 !== s &&
                                ((e.score *= s <= r ? 1 : 0), e.score <= o)
                              )
                                break;
                            }
                            n === e.score && c.push(e.boxIndex);
                          }
                        }),
                        c
                      );
                    })(h, l, r, 0.5, o)),
                    (g = a.getReshapedInputDimensions(0)),
                    (b = a.inputSize),
                    (w = b / g.width),
                    (y = b / g.height),
                    (_ = h.arraySync()),
                    (x = m.map(function (t) {
                      var e = [Math.max(0, _[t][0]), Math.min(1, _[t][2])].map(
                          function (t) {
                            return t * y;
                          }
                        ),
                        n = e[0],
                        r = e[1],
                        o = [Math.max(0, _[t][1]), Math.min(1, _[t][3])].map(
                          function (t) {
                            return t * w;
                          }
                        ),
                        i = o[0],
                        s = o[1];
                      return new F(l[t], new A(i, n, s - i, r - n), {
                        height: a.getInputHeight(0),
                        width: a.getInputWidth(0),
                      });
                    })),
                    h.dispose(),
                    f.dispose(),
                    [2, x]
                  );
              }
            });
          })
        );
      }),
      (r.prototype.getDefaultModelName = function () {
        return "ssd_mobilenetv1_model";
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        return nn(t);
      }),
      (r.prototype.extractParams = function (e) {
        return (function (e) {
          var n = [],
            r = he(e),
            o = r.extractWeights,
            i = r.getRemainingWeights,
            a = en(o, n),
            s = a.extractMobilenetV1Params,
            c = a.extractPredictionLayerParams,
            u = s(),
            h = c(),
            f = { extra_dim: t.tensor3d(o(20472), [1, 5118, 4]) };
          if (
            (n.push({ paramPath: "output_layer/extra_dim" }), 0 !== i().length)
          )
            throw new Error("weights remaing after extract: " + i().length);
          return {
            params: { mobilenetv1: u, prediction_layer: h, output_layer: f },
            paramMappings: n,
          };
        })(e);
      }),
      r
    );
  })(Qt);
function pn(t) {
  var e = new fn();
  return e.extractWeights(t), e;
}
function ln(t) {
  return pn(t);
}
var dn,
  vn = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return e(n, t), n;
  })(fn),
  mn = [
    new x(0.738768, 0.874946),
    new x(2.42204, 2.65704),
    new x(4.30971, 7.04493),
    new x(10.246, 4.59428),
    new x(12.6868, 11.8741),
  ],
  gn = [
    new x(1.603231, 2.094468),
    new x(6.041143, 7.080126),
    new x(2.882459, 3.518061),
    new x(4.266906, 5.178857),
    new x(9.041765, 10.66308),
  ],
  bn = [117.001, 114.697, 97.404],
  wn = function (t) {
    return "number" == typeof t;
  };
function yn(t) {
  if (!t) throw new Error("invalid config: " + t);
  if ("boolean" != typeof t.withSeparableConvs)
    throw new Error(
      "config.withSeparableConvs has to be a boolean, have: " +
        t.withSeparableConvs
    );
  if (!wn(t.iouThreshold) || t.iouThreshold < 0 || t.iouThreshold > 1)
    throw new Error(
      "config.iouThreshold has to be a number between [0, 1], have: " +
        t.iouThreshold
    );
  if (
    !Array.isArray(t.classes) ||
    !t.classes.length ||
    !t.classes.every(function (t) {
      return "string" == typeof t;
    })
  )
    throw new Error(
      "config.classes has to be an array class names: string[], have: " +
        JSON.stringify(t.classes)
    );
  if (
    !Array.isArray(t.anchors) ||
    !t.anchors.length ||
    !t.anchors
      .map(function (t) {
        return t || {};
      })
      .every(function (t) {
        return wn(t.x) && wn(t.y);
      })
  )
    throw new Error(
      "config.anchors has to be an array of { x: number, y: number }, have: " +
        JSON.stringify(t.anchors)
    );
  if (
    t.meanRgb &&
    (!Array.isArray(t.meanRgb) ||
      3 !== t.meanRgb.length ||
      !t.meanRgb.every(wn))
  )
    throw new Error(
      "config.meanRgb has to be an array of shape [number, number, number], have: " +
        JSON.stringify(t.meanRgb)
    );
}
function _n(e) {
  return t.tidy(function () {
    var n = t.mul(e, t.scalar(0.10000000149011612));
    return t.add(t.relu(t.sub(e, n)), n);
  });
}
function xn(e, n) {
  return t.tidy(function () {
    var r = t.pad(e, [
      [0, 0],
      [1, 1],
      [1, 1],
      [0, 0],
    ]);
    return (
      (r = t.conv2d(r, n.conv.filters, [1, 1], "valid")),
      (r = t.sub(r, n.bn.sub)),
      (r = t.mul(r, n.bn.truediv)),
      _n((r = t.add(r, n.conv.bias)))
    );
  });
}
function Pn(e, n) {
  return t.tidy(function () {
    var r = t.pad(e, [
      [0, 0],
      [1, 1],
      [1, 1],
      [0, 0],
    ]);
    return (
      (r = t.separableConv2d(
        r,
        n.depthwise_filter,
        n.pointwise_filter,
        [1, 1],
        "valid"
      )),
      _n((r = t.add(r, n.bias)))
    );
  });
}
function En(e, n) {
  var r = oe(e, n);
  var o = se(e, n);
  return {
    extractConvParams: r,
    extractConvWithBatchNormParams: function (o, i, a) {
      var s = r(o, i, 3, a + "/conv"),
        c = (function (r, o) {
          var i = t.tensor1d(e(r)),
            a = t.tensor1d(e(r));
          return (
            n.push({ paramPath: o + "/sub" }, { paramPath: o + "/truediv" }),
            { sub: i, truediv: a }
          );
        })(i, a + "/bn");
      return { conv: s, bn: c };
    },
    extractSeparableConvParams: o,
  };
}
function Mn(t, e) {
  var n = ue(t, e);
  function r(t) {
    return { filters: n(t + "/filters", 4), bias: n(t + "/bias", 1) };
  }
  return {
    extractConvParams: r,
    extractConvWithBatchNormParams: function (t) {
      var e = r(t + "/conv"),
        o = (function (t) {
          return { sub: n(t + "/sub", 1), truediv: n(t + "/truediv", 1) };
        })(t + "/bn");
      return { conv: e, bn: o };
    },
    extractSeparableConvParams: ce(n),
  };
}
!(function (t) {
  (t[(t.XS = 224)] = "XS"),
    (t[(t.SM = 320)] = "SM"),
    (t[(t.MD = 416)] = "MD"),
    (t[(t.LG = 608)] = "LG");
})(dn || (dn = {}));
var Fn = (function () {
    function t(t) {
      var e = void 0 === t ? {} : t,
        n = e.inputSize,
        r = e.scoreThreshold;
      if (
        ((this._name = "TinyYolov2Options"),
        (this._inputSize = n || 416),
        (this._scoreThreshold = r || 0.5),
        "number" != typeof this._inputSize || this._inputSize % 32 != 0)
      )
        throw new Error(
          this._name + " - expected inputSize to be a number divisible by 32"
        );
      if (
        "number" != typeof this._scoreThreshold ||
        this._scoreThreshold <= 0 ||
        this._scoreThreshold >= 1
      )
        throw new Error(
          this._name +
            " - expected scoreThreshold to be a number between 0 and 1"
        );
    }
    return (
      Object.defineProperty(t.prototype, "inputSize", {
        get: function () {
          return this._inputSize;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "scoreThreshold", {
        get: function () {
          return this._scoreThreshold;
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    );
  })(),
  Tn = (function (n) {
    function a(t) {
      var e = n.call(this, "TinyYolov2") || this;
      return yn(t), (e._config = t), e;
    }
    return (
      e(a, n),
      Object.defineProperty(a.prototype, "config", {
        get: function () {
          return this._config;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(a.prototype, "withClassScores", {
        get: function () {
          return this.config.withClassScores || this.config.classes.length > 1;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(a.prototype, "boxEncodingSize", {
        get: function () {
          return 5 + (this.withClassScores ? this.config.classes.length : 0);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (a.prototype.runTinyYolov2 = function (e, n) {
        var r = xn(e, n.conv0);
        return (
          (r = xn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv1)),
          (r = xn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv2)),
          (r = xn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv3)),
          (r = xn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv4)),
          (r = xn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv5)),
          (r = xn((r = t.maxPool(r, [2, 2], [1, 1], "same")), n.conv6)),
          ne((r = xn(r, n.conv7)), n.conv8, "valid", !1)
        );
      }),
      (a.prototype.runMobilenet = function (e, n) {
        var r = this.config.isFirstLayerConv2d
          ? _n(ne(e, n.conv0, "valid", !1))
          : Pn(e, n.conv0);
        return (
          (r = Pn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv1)),
          (r = Pn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv2)),
          (r = Pn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv3)),
          (r = Pn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv4)),
          (r = Pn((r = t.maxPool(r, [2, 2], [2, 2], "same")), n.conv5)),
          (r = t.maxPool(r, [2, 2], [1, 1], "same")),
          (r = n.conv6 ? Pn(r, n.conv6) : r),
          ne((r = n.conv7 ? Pn(r, n.conv7) : r), n.conv8, "valid", !1)
        );
      }),
      (a.prototype.forwardInput = function (e, n) {
        var r = this,
          o = this.params;
        if (!o) throw new Error("TinyYolov2 - load model before inference");
        return t.tidy(function () {
          var i = e.toBatchTensor(n, !1).toFloat();
          return (
            (i = (i = r.config.meanRgb ? C(i, r.config.meanRgb) : i).div(
              t.scalar(256)
            )),
            r.config.withSeparableConvs
              ? r.runMobilenet(i, o)
              : r.runTinyYolov2(i, o)
          );
        });
      }),
      (a.prototype.forward = function (t, e) {
        return o(this, void 0, void 0, function () {
          var n;
          return i(this, function (r) {
            switch (r.label) {
              case 0:
                return (n = this.forwardInput), [4, Ht(t)];
              case 1:
                return [4, n.apply(this, [r.sent(), e])];
              case 2:
                return [2, r.sent()];
            }
          });
        });
      }),
      (a.prototype.detect = function (e, n) {
        return (
          void 0 === n && (n = {}),
          o(this, void 0, void 0, function () {
            var r,
              o,
              a,
              s,
              c,
              u,
              h,
              f,
              p,
              l,
              d,
              v,
              m,
              g = this;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (r = new Fn(n)),
                    (o = r.inputSize),
                    (a = r.scoreThreshold),
                    [4, Ht(e)]
                  );
                case 1:
                  return (s = i.sent()), [4, this.forwardInput(s, o)];
                case 2:
                  return (
                    (c = i.sent()),
                    (u = t.tidy(function () {
                      return t.unstack(c)[0].expandDims();
                    })),
                    (h = {
                      width: s.getInputWidth(0),
                      height: s.getInputHeight(0),
                    }),
                    [
                      4,
                      this.extractBoxes(u, s.getReshapedInputDimensions(0), a),
                    ]
                  );
                case 3:
                  return (
                    (f = i.sent()),
                    c.dispose(),
                    u.dispose(),
                    (p = f.map(function (t) {
                      return t.box;
                    })),
                    (l = f.map(function (t) {
                      return t.score;
                    })),
                    (d = f.map(function (t) {
                      return t.classScore;
                    })),
                    (v = f.map(function (t) {
                      return g.config.classes[t.label];
                    })),
                    (m = S(
                      p.map(function (t) {
                        return t.rescale(o);
                      }),
                      l,
                      this.config.iouThreshold,
                      !0
                    )),
                    [
                      2,
                      m.map(function (t) {
                        return new M(l[t], d[t], v[t], p[t], h);
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (a.prototype.getDefaultModelName = function () {
        return "";
      }),
      (a.prototype.extractParamsFromWeigthMap = function (t) {
        return (function (t, e) {
          var n,
            r = [],
            o = Mn(t, r),
            i = o.extractConvParams,
            a = o.extractConvWithBatchNormParams,
            s = o.extractSeparableConvParams;
          if (e.withSeparableConvs) {
            var c = (e.filterSizes && e.filterSizes.length) || 9;
            n = {
              conv0: e.isFirstLayerConv2d ? i("conv0") : s("conv0"),
              conv1: s("conv1"),
              conv2: s("conv2"),
              conv3: s("conv3"),
              conv4: s("conv4"),
              conv5: s("conv5"),
              conv6: c > 7 ? s("conv6") : void 0,
              conv7: c > 8 ? s("conv7") : void 0,
              conv8: i("conv8"),
            };
          } else
            n = {
              conv0: a("conv0"),
              conv1: a("conv1"),
              conv2: a("conv2"),
              conv3: a("conv3"),
              conv4: a("conv4"),
              conv5: a("conv5"),
              conv6: a("conv6"),
              conv7: a("conv7"),
              conv8: i("conv8"),
            };
          return re(t, r), { params: n, paramMappings: r };
        })(t, this.config);
      }),
      (a.prototype.extractParams = function (t) {
        var e = this.config.filterSizes || a.DEFAULT_FILTER_SIZES,
          n = e ? e.length : void 0;
        if (7 !== n && 8 !== n && 9 !== n)
          throw new Error(
            "TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found " +
              n +
              " filterSizes in config"
          );
        return (function (t, e, n, r) {
          var o,
            i = he(t),
            a = i.extractWeights,
            s = i.getRemainingWeights,
            c = [],
            u = En(a, c),
            h = u.extractConvParams,
            f = u.extractConvWithBatchNormParams,
            p = u.extractSeparableConvParams;
          if (e.withSeparableConvs) {
            var l = r[0],
              d = r[1],
              v = r[2],
              m = r[3],
              g = r[4],
              b = r[5],
              w = r[6],
              y = r[7],
              _ = r[8];
            o = {
              conv0: e.isFirstLayerConv2d
                ? h(l, d, 3, "conv0")
                : p(l, d, "conv0"),
              conv1: p(d, v, "conv1"),
              conv2: p(v, m, "conv2"),
              conv3: p(m, g, "conv3"),
              conv4: p(g, b, "conv4"),
              conv5: p(b, w, "conv5"),
              conv6: y ? p(w, y, "conv6") : void 0,
              conv7: _ ? p(y, _, "conv7") : void 0,
              conv8: h(_ || y || w, 5 * n, 1, "conv8"),
            };
          } else
            (l = r[0]),
              (d = r[1]),
              (v = r[2]),
              (m = r[3]),
              (g = r[4]),
              (b = r[5]),
              (w = r[6]),
              (y = r[7]),
              (_ = r[8]),
              (o = {
                conv0: f(l, d, "conv0"),
                conv1: f(d, v, "conv1"),
                conv2: f(v, m, "conv2"),
                conv3: f(m, g, "conv3"),
                conv4: f(g, b, "conv4"),
                conv5: f(b, w, "conv5"),
                conv6: f(w, y, "conv6"),
                conv7: f(y, _, "conv7"),
                conv8: h(_, 5 * n, 1, "conv8"),
              });
          if (0 !== s().length)
            throw new Error("weights remaing after extract: " + s().length);
          return { params: o, paramMappings: c };
        })(t, this.config, this.boxEncodingSize, e);
      }),
      (a.prototype.extractBoxes = function (e, n, a) {
        return o(this, void 0, void 0, function () {
          var o,
            s,
            c,
            u,
            h,
            f,
            p,
            l,
            d,
            v,
            m,
            g,
            b,
            w,
            y,
            _,
            x,
            P,
            M,
            F,
            T,
            D,
            S,
            C,
            k,
            O,
            L,
            A,
            N,
            j = this;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (o = n.width),
                  (s = n.height),
                  (c = Math.max(o, s)),
                  (u = c / o),
                  (h = c / s),
                  (f = e.shape[1]),
                  (p = this.config.anchors.length),
                  (l = t.tidy(function () {
                    var n = e.reshape([f, f, p, j.boxEncodingSize]);
                    return [
                      n.slice([0, 0, 0, 0], [f, f, p, 4]),
                      n.slice([0, 0, 0, 4], [f, f, p, 1]),
                      j.withClassScores
                        ? t.softmax(
                            n.slice(
                              [0, 0, 0, 5],
                              [f, f, p, j.config.classes.length]
                            ),
                            3
                          )
                        : t.scalar(0),
                    ];
                  })),
                  (d = l[0]),
                  (v = l[1]),
                  (m = l[2]),
                  (g = []),
                  [4, v.array()]
                );
              case 1:
                return (b = i.sent()), [4, d.array()];
              case 2:
                (w = i.sent()), (y = 0), (i.label = 3);
              case 3:
                if (!(y < f)) return [3, 12];
                (_ = 0), (i.label = 4);
              case 4:
                if (!(_ < f)) return [3, 11];
                (x = 0), (i.label = 5);
              case 5:
                return x < p
                  ? ((P = I(b[y][_][x][0])),
                    !a || P > a
                      ? ((M = ((_ + I(w[y][_][x][0])) / f) * u),
                        (F = ((y + I(w[y][_][x][1])) / f) * h),
                        (T =
                          ((Math.exp(w[y][_][x][2]) *
                            this.config.anchors[x].x) /
                            f) *
                          u),
                        (D =
                          ((Math.exp(w[y][_][x][3]) *
                            this.config.anchors[x].y) /
                            f) *
                          h),
                        (S = M - T / 2),
                        (C = F - D / 2),
                        (k = { row: y, col: _, anchor: x }),
                        this.withClassScores
                          ? [4, this.extractPredictedClass(m, k)]
                          : [3, 7])
                      : [3, 9])
                  : [3, 10];
              case 6:
                return (N = i.sent()), [3, 8];
              case 7:
                (N = { classScore: 1, label: 0 }), (i.label = 8);
              case 8:
                (L = (O = N).classScore),
                  (A = O.label),
                  g.push(
                    r(
                      {
                        box: new E(S, C, S + T, C + D),
                        score: P,
                        classScore: P * L,
                        label: A,
                      },
                      k
                    )
                  ),
                  (i.label = 9);
              case 9:
                return x++, [3, 5];
              case 10:
                return _++, [3, 4];
              case 11:
                return y++, [3, 3];
              case 12:
                return d.dispose(), v.dispose(), m.dispose(), [2, g];
            }
          });
        });
      }),
      (a.prototype.extractPredictedClass = function (t, e) {
        return o(this, void 0, void 0, function () {
          var n, r, o, a;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return (n = e.row), (r = e.col), (o = e.anchor), [4, t.array()];
              case 1:
                return (
                  (a = i.sent()),
                  [
                    2,
                    Array(this.config.classes.length)
                      .fill(0)
                      .map(function (t, e) {
                        return a[n][r][o][e];
                      })
                      .map(function (t, e) {
                        return { classScore: t, label: e };
                      })
                      .reduce(function (t, e) {
                        return t.classScore > e.classScore ? t : e;
                      }),
                  ]
                );
            }
          });
        });
      }),
      (a.DEFAULT_FILTER_SIZES = [3, 16, 32, 64, 128, 256, 512, 1024, 1024]),
      a
    );
  })(Qt),
  Dn = (function (t) {
    function n(e) {
      void 0 === e && (e = !0);
      var n = Object.assign(
        {},
        { withSeparableConvs: e, iouThreshold: 0.4, classes: ["face"] },
        e ? { anchors: gn, meanRgb: bn } : { anchors: mn, withClassScores: !0 }
      );
      return t.call(this, n) || this;
    }
    return (
      e(n, t),
      Object.defineProperty(n.prototype, "withSeparableConvs", {
        get: function () {
          return this.config.withSeparableConvs;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "anchors", {
        get: function () {
          return this.config.anchors;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (n.prototype.locateFaces = function (t, e) {
        return o(this, void 0, void 0, function () {
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.detect(t, e)];
              case 1:
                return [
                  2,
                  n.sent().map(function (t) {
                    return new F(t.score, t.relativeBox, {
                      width: t.imageWidth,
                      height: t.imageHeight,
                    });
                  }),
                ];
            }
          });
        });
      }),
      (n.prototype.getDefaultModelName = function () {
        return this.withSeparableConvs
          ? "tiny_yolov2_separable_conv_model"
          : "tiny_yolov2_model";
      }),
      (n.prototype.extractParamsFromWeigthMap = function (e) {
        return t.prototype.extractParamsFromWeigthMap.call(this, e);
      }),
      n
    );
  })(Tn);
function Sn(t, e) {
  void 0 === e && (e = !0);
  var n = new Dn(e);
  return n.extractWeights(t), n;
}
var Cn = (function (t) {
    function n() {
      var e = (null !== t && t.apply(this, arguments)) || this;
      return (e._name = "TinyFaceDetectorOptions"), e;
    }
    return e(n, t), n;
  })(Fn),
  kn = (function () {
    function t() {}
    return (
      (t.prototype.then = function (t) {
        return o(this, void 0, void 0, function () {
          var e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = t), [4, this.run()];
              case 1:
                return [2, e.apply(void 0, [n.sent()])];
            }
          });
        });
      }),
      (t.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          return i(this, function (t) {
            throw new Error("ComposableTask - run is not implemented");
          });
        });
      }),
      t
    );
  })();
function On(e, n, r, a, s) {
  return (
    void 0 === s &&
      (s = function (t) {
        return t.alignedRect;
      }),
    o(this, void 0, void 0, function () {
      var o, c, u, h, f;
      return i(this, function (i) {
        switch (i.label) {
          case 0:
            return (
              (o = e.map(function (t) {
                return Pe(t) ? s(t) : t.detection;
              })),
              (u = a) ? [3, 5] : n instanceof t.Tensor ? [4, Gt(n, o)] : [3, 2]
            );
          case 1:
            return (h = i.sent()), [3, 4];
          case 2:
            return [4, Vt(n, o)];
          case 3:
            (h = i.sent()), (i.label = 4);
          case 4:
            (u = h), (i.label = 5);
          case 5:
            return [4, r((c = u))];
          case 6:
            return (
              (f = i.sent()),
              c.forEach(function (e) {
                return e instanceof t.Tensor && e.dispose();
              }),
              [2, f]
            );
        }
      });
    })
  );
}
function In(t, e, n, r, a) {
  return o(this, void 0, void 0, function () {
    var s = this;
    return i(this, function (c) {
      return [
        2,
        On(
          [t],
          e,
          function (t) {
            return o(s, void 0, void 0, function () {
              return i(this, function (e) {
                return [2, n(t[0])];
              });
            });
          },
          r,
          a
        ),
      ];
    });
  });
}
var Ln = 2,
  An = 12;
function Nn(e) {
  var n = he(e),
    o = n.extractWeights,
    i = n.getRemainingWeights,
    a = [],
    s = (function (e, n) {
      var o = oe(e, n),
        i = ie(e, n);
      function a(r, o) {
        var i = t.tensor1d(e(r));
        return n.push({ paramPath: o }), i;
      }
      function s(t, e, n) {
        return (
          void 0 === n && (n = !1),
          {
            conv1: o(t[0], t[1], 3, e + "/conv1"),
            prelu1_alpha: a(t[1], e + "/prelu1_alpha"),
            conv2: o(t[1], t[2], 3, e + "/conv2"),
            prelu2_alpha: a(t[2], e + "/prelu2_alpha"),
            conv3: o(t[2], t[3], n ? 2 : 3, e + "/conv3"),
            prelu3_alpha: a(t[3], e + "/prelu3_alpha"),
          }
        );
      }
      return {
        extractPNetParams: function () {
          var t = s([3, 10, 16, 32], "pnet"),
            e = o(32, 2, 1, "pnet/conv4_1"),
            n = o(32, 4, 1, "pnet/conv4_2");
          return r(r({}, t), { conv4_1: e, conv4_2: n });
        },
        extractRNetParams: function () {
          var t = s([3, 28, 48, 64], "rnet", !0),
            e = i(576, 128, "rnet/fc1"),
            n = a(128, "rnet/prelu4_alpha"),
            o = i(128, 2, "rnet/fc2_1"),
            c = i(128, 4, "rnet/fc2_2");
          return r(r({}, t), { fc1: e, prelu4_alpha: n, fc2_1: o, fc2_2: c });
        },
        extractONetParams: function () {
          var t = s([3, 32, 64, 64], "onet"),
            e = o(64, 128, 2, "onet/conv4"),
            n = a(128, "onet/prelu4_alpha"),
            c = i(1152, 256, "onet/fc1"),
            u = a(256, "onet/prelu5_alpha"),
            h = i(256, 2, "onet/fc2_1"),
            f = i(256, 4, "onet/fc2_2"),
            p = i(256, 10, "onet/fc2_3");
          return r(r({}, t), {
            conv4: e,
            prelu4_alpha: n,
            fc1: c,
            prelu5_alpha: u,
            fc2_1: h,
            fc2_2: f,
            fc2_3: p,
          });
        },
      };
    })(o, a),
    c = s.extractPNetParams,
    u = s.extractRNetParams,
    h = s.extractONetParams,
    f = c(),
    p = u(),
    l = h();
  if (0 !== i().length)
    throw new Error("weights remaing after extract: " + i().length);
  return { params: { pnet: f, rnet: p, onet: l }, paramMappings: a };
}
function jn(t) {
  var e = [],
    n = (function (t, e) {
      var n = ue(t, e);
      function o(t) {
        return {
          filters: n(t + "/weights", 4, t + "/filters"),
          bias: n(t + "/bias", 1),
        };
      }
      function i(t) {
        return { weights: n(t + "/weights", 2), bias: n(t + "/bias", 1) };
      }
      function a(t) {
        return n(t, 1);
      }
      function s(t) {
        return {
          conv1: o(t + "/conv1"),
          prelu1_alpha: a(t + "/prelu1_alpha"),
          conv2: o(t + "/conv2"),
          prelu2_alpha: a(t + "/prelu2_alpha"),
          conv3: o(t + "/conv3"),
          prelu3_alpha: a(t + "/prelu3_alpha"),
        };
      }
      return {
        extractPNetParams: function () {
          var t = s("pnet"),
            e = o("pnet/conv4_1"),
            n = o("pnet/conv4_2");
          return r(r({}, t), { conv4_1: e, conv4_2: n });
        },
        extractRNetParams: function () {
          var t = s("rnet"),
            e = i("rnet/fc1"),
            n = a("rnet/prelu4_alpha"),
            o = i("rnet/fc2_1"),
            c = i("rnet/fc2_2");
          return r(r({}, t), { fc1: e, prelu4_alpha: n, fc2_1: o, fc2_2: c });
        },
        extractONetParams: function () {
          var t = s("onet"),
            e = o("onet/conv4"),
            n = a("onet/prelu4_alpha"),
            c = i("onet/fc1"),
            u = a("onet/prelu5_alpha"),
            h = i("onet/fc2_1"),
            f = i("onet/fc2_2"),
            p = i("onet/fc2_3");
          return r(r({}, t), {
            conv4: e,
            prelu4_alpha: n,
            fc1: c,
            prelu5_alpha: u,
            fc2_1: h,
            fc2_2: f,
            fc2_3: p,
          });
        },
      };
    })(t, e),
    o = n.extractPNetParams,
    i = n.extractRNetParams,
    a = n.extractONetParams,
    s = o(),
    c = i(),
    u = a();
  return re(t, e), { params: { pnet: s, rnet: c, onet: u }, paramMappings: e };
}
function Bn(t, e) {
  var n = e[0],
    r = e[1];
  return { height: Math.floor(n * t), width: Math.floor(r * t) };
}
var Wn = (function (t) {
  function n(e, n, r, o) {
    return t.call(this, { left: e, top: n, right: r, bottom: o }, !0) || this;
  }
  return e(n, t), n;
})(P);
function Rn(e) {
  return t.tidy(function () {
    return t.mul(t.sub(e, t.scalar(127.5)), t.scalar(0.0078125));
  });
}
function zn(e, n) {
  return t.tidy(function () {
    return t.add(t.relu(e), t.mul(n, t.neg(t.relu(t.neg(e)))));
  });
}
function Hn(e, n, r) {
  return (
    void 0 === r && (r = !1),
    t.tidy(function () {
      var o = ne(e, n.conv1, "valid");
      return (
        (o = zn(o, n.prelu1_alpha)),
        (o = zn(
          (o = ne(
            (o = t.maxPool(o, r ? [2, 2] : [3, 3], [2, 2], "same")),
            n.conv2,
            "valid"
          )),
          n.prelu2_alpha
        )),
        (o = zn(
          (o = ne(
            (o = r ? o : t.maxPool(o, [3, 3], [2, 2], "valid")),
            n.conv3,
            "valid"
          )),
          n.prelu3_alpha
        ))
      );
    })
  );
}
function Vn(e, n, r, o, i) {
  i.stage1 = [];
  var a = n.map(function (n) {
      return t.tidy(function () {
        var r = { scale: n },
          i = (function (e, n) {
            return t.tidy(function () {
              var r = Bn(n, e.shape.slice(1)),
                o = r.height,
                i = r.width,
                a = Rn(t.image.resizeBilinear(e, [o, i]));
              return t.transpose(a, [0, 2, 1, 3]);
            });
          })(e, n),
          a = Date.now(),
          s = (function (e, n) {
            return t.tidy(function () {
              var r = Hn(e, n, !0),
                o = ne(r, n.conv4_1, "valid"),
                i = t.expandDims(t.max(o, 3), 3);
              return {
                prob: t.softmax(t.sub(o, i), 3),
                regions: ne(r, n.conv4_2, "valid"),
              };
            });
          })(i, o),
          c = s.prob,
          u = s.regions;
        return (
          (r.pnet = Date.now() - a),
          {
            scoresTensor: t.unstack(t.unstack(c, 3)[1])[0],
            regionsTensor: t.unstack(u)[0],
            scale: n,
            statsForScale: r,
          }
        );
      });
    }),
    s = a.map(function (t) {
      var e = t.scoresTensor,
        n = t.regionsTensor,
        o = t.scale,
        a = t.statsForScale,
        s = (function (t, e, n, r) {
          for (var o = [], i = t.arraySync(), a = 0; a < t.shape[0]; a++)
            for (var s = 0; s < t.shape[1]; s++)
              i[a][s] >= r && o.push(new x(s, a));
          return o.map(function (t) {
            var r = new E(
                Math.round((t.y * Ln + 1) / n),
                Math.round((t.x * Ln + 1) / n),
                Math.round((t.y * Ln + An) / n),
                Math.round((t.x * Ln + An) / n)
              ),
              o = i[t.y][t.x],
              a = e.arraySync();
            return {
              cell: r,
              score: o,
              region: new Wn(
                a[t.y][t.x][0],
                a[t.y][t.x][1],
                a[t.y][t.x][2],
                a[t.y][t.x][3]
              ),
            };
          });
        })(e, n, o, r);
      if ((e.dispose(), n.dispose(), !s.length)) return i.stage1.push(a), [];
      var c = Date.now(),
        u = S(
          s.map(function (t) {
            return t.cell;
          }),
          s.map(function (t) {
            return t.score;
          }),
          0.5
        );
      return (
        (a.nms = Date.now() - c),
        (a.numBoxes = u.length),
        i.stage1.push(a),
        u.map(function (t) {
          return s[t];
        })
      );
    }),
    c = s.reduce(function (t, e) {
      return t.concat(e);
    }, []),
    u = [],
    h = [];
  if (c.length > 0) {
    var f = Date.now(),
      p = S(
        c.map(function (t) {
          return t.cell;
        }),
        c.map(function (t) {
          return t.score;
        }),
        0.7
      );
    (i.stage1_nms = Date.now() - f),
      (h = p.map(function (t) {
        return c[t].score;
      })),
      (u = p
        .map(function (t) {
          return c[t];
        })
        .map(function (t) {
          var e = t.cell,
            n = t.region;
          return new E(
            e.left + n.left * e.width,
            e.top + n.top * e.height,
            e.right + n.right * e.width,
            e.bottom + n.bottom * e.height
          )
            .toSquare()
            .round();
        }));
  }
  return { boxes: u, scores: h };
}
function Gn(e, n, r) {
  var a = r.width,
    s = r.height;
  return o(this, void 0, void 0, function () {
    var r,
      c,
      u,
      h = this;
    return i(this, function (f) {
      switch (f.label) {
        case 0:
          return (
            (r = Tt(e)),
            [
              4,
              Promise.all(
                n.map(function (t) {
                  return o(h, void 0, void 0, function () {
                    var n, o, a, s, c, u, h, f;
                    return i(this, function (i) {
                      return (
                        (n = t.padAtBorders(e.height, e.width)),
                        (o = n.y),
                        (a = n.ey),
                        (s = n.x),
                        (c = n.ex),
                        (u = s - 1),
                        (h = o - 1),
                        (f = r.getImageData(u, h, c - u, a - h)),
                        [2, Mt.isNodejs() ? jt(f) : createImageBitmap(f)]
                      );
                    });
                  });
                })
              ),
            ]
          );
        case 1:
          return (
            (c = f.sent()),
            (u = []),
            c.forEach(function (t) {
              var e = Tt(Nt({ width: a, height: s }));
              e.drawImage(t, 0, 0, a, s);
              for (
                var n = e.getImageData(0, 0, a, s).data, r = [], o = 0;
                o < n.length;
                o += 4
              )
                r.push(n[o + 2]), r.push(n[o + 1]), r.push(n[o]);
              u.push(r);
            }),
            [
              2,
              u.map(function (e) {
                return t.tidy(function () {
                  return Rn(
                    t
                      .transpose(t.tensor4d(e, [1, a, s, 3]), [0, 2, 1, 3])
                      .toFloat()
                  );
                });
              }),
            ]
          );
      }
    });
  });
}
function Un(e, n, r, a, s) {
  return o(this, void 0, void 0, function () {
    var o, c, u, h, f, p, l, d, v, m, g, b, w, y;
    return i(this, function (i) {
      switch (i.label) {
        case 0:
          return (o = Date.now()), [4, Gn(e, n, { width: 24, height: 24 })];
        case 1:
          return (
            (c = i.sent()),
            (s.stage2_extractImagePatches = Date.now() - o),
            (o = Date.now()),
            (u = c.map(function (e) {
              var n = (function (e, n) {
                return t.tidy(function () {
                  var r = Hn(e, n),
                    o = zn(
                      ve(
                        t.reshape(r, [r.shape[0], n.fc1.weights.shape[0]]),
                        n.fc1
                      ),
                      n.prelu4_alpha
                    ),
                    i = ve(o, n.fc2_1),
                    a = t.expandDims(t.max(i, 1), 1),
                    s = t.softmax(t.sub(i, a), 1),
                    c = ve(o, n.fc2_2);
                  return { scores: t.unstack(s, 1)[1], regions: c };
                });
              })(e, a);
              return e.dispose(), n;
            })),
            (s.stage2_rnet = Date.now() - o),
            (h =
              u.length > 1
                ? t.concat(
                    u.map(function (t) {
                      return t.scores;
                    })
                  )
                : u[0].scores),
            (l = (p = Array).from),
            [4, h.data()]
          );
        case 2:
          return (
            (f = l.apply(p, [i.sent()])),
            h.dispose(),
            (d = f
              .map(function (t, e) {
                return { score: t, idx: e };
              })
              .filter(function (t) {
                return t.score > r;
              })
              .map(function (t) {
                return t.idx;
              })),
            (v = d.map(function (t) {
              return n[t];
            })),
            (m = d.map(function (t) {
              return f[t];
            })),
            (g = []),
            (b = []),
            v.length > 0 &&
              ((o = Date.now()),
              (w = S(v, m, 0.7)),
              (s.stage2_nms = Date.now() - o),
              (y = w.map(function (t) {
                var e = u[d[t]].regions.arraySync();
                return new Wn(e[0][0], e[0][1], e[0][2], e[0][3]);
              })),
              (b = w.map(function (t) {
                return m[t];
              })),
              (g = w.map(function (t, e) {
                return v[t].calibrate(y[e]);
              }))),
            u.forEach(function (t) {
              t.regions.dispose(), t.scores.dispose();
            }),
            [2, { boxes: g, scores: b }]
          );
      }
    });
  });
}
function Jn(e, n, r, a, s) {
  return o(this, void 0, void 0, function () {
    var o, c, u, h, f, p, l, d, v, m, g, b, w, y, _;
    return i(this, function (i) {
      switch (i.label) {
        case 0:
          return (o = Date.now()), [4, Gn(e, n, { width: 48, height: 48 })];
        case 1:
          return (
            (c = i.sent()),
            (s.stage3_extractImagePatches = Date.now() - o),
            (o = Date.now()),
            (u = c.map(function (e) {
              var n = (function (e, n) {
                return t.tidy(function () {
                  var r = Hn(e, n);
                  r = zn(
                    (r = ne(
                      (r = t.maxPool(r, [2, 2], [2, 2], "same")),
                      n.conv4,
                      "valid"
                    )),
                    n.prelu4_alpha
                  );
                  var o = zn(
                      ve(
                        t.reshape(r, [r.shape[0], n.fc1.weights.shape[0]]),
                        n.fc1
                      ),
                      n.prelu5_alpha
                    ),
                    i = ve(o, n.fc2_1),
                    a = t.expandDims(t.max(i, 1), 1),
                    s = t.softmax(t.sub(i, a), 1),
                    c = ve(o, n.fc2_2),
                    u = ve(o, n.fc2_3);
                  return { scores: t.unstack(s, 1)[1], regions: c, points: u };
                });
              })(e, a);
              return e.dispose(), n;
            })),
            (s.stage3_onet = Date.now() - o),
            (h =
              u.length > 1
                ? t.concat(
                    u.map(function (t) {
                      return t.scores;
                    })
                  )
                : u[0].scores),
            (l = (p = Array).from),
            [4, h.data()]
          );
        case 2:
          return (
            (f = l.apply(p, [i.sent()])),
            h.dispose(),
            (d = f
              .map(function (t, e) {
                return { score: t, idx: e };
              })
              .filter(function (t) {
                return t.score > r;
              })
              .map(function (t) {
                return t.idx;
              })),
            (v = d.map(function (t) {
              var e = u[t].regions.arraySync();
              return new Wn(e[0][0], e[0][1], e[0][2], e[0][3]);
            })),
            (m = d.map(function (t, e) {
              return n[t].calibrate(v[e]);
            })),
            (g = d.map(function (t) {
              return f[t];
            })),
            (b = []),
            (w = []),
            (y = []),
            m.length > 0 &&
              ((o = Date.now()),
              (_ = S(m, g, 0.7, !1)),
              (s.stage3_nms = Date.now() - o),
              (b = _.map(function (t) {
                return m[t];
              })),
              (w = _.map(function (t) {
                return g[t];
              })),
              (y = _.map(function (t, e) {
                return Array(5)
                  .fill(0)
                  .map(function (n, r) {
                    var o = u[t].points.arraySync();
                    return new x(
                      o[0][r] * (b[e].width + 1) + b[e].left,
                      o[0][r + 5] * (b[e].height + 1) + b[e].top
                    );
                  });
              }))),
            u.forEach(function (t) {
              t.regions.dispose(), t.scores.dispose(), t.points.dispose();
            }),
            [2, { boxes: b, scores: w, points: y }]
          );
      }
    });
  });
}
var Yn = (function (n) {
    function r() {
      return n.call(this, "Mtcnn") || this;
    }
    return (
      e(r, n),
      (r.prototype.load = function (t) {
        return o(this, void 0, void 0, function () {
          return i(this, function (e) {
            return (
              console.warn("mtcnn is deprecated and will be removed soon"),
              [2, n.prototype.load.call(this, t)]
            );
          });
        });
      }),
      (r.prototype.loadFromDisk = function (t) {
        return o(this, void 0, void 0, function () {
          return i(this, function (e) {
            return (
              console.warn("mtcnn is deprecated and will be removed soon"),
              [2, n.prototype.loadFromDisk.call(this, t)]
            );
          });
        });
      }),
      (r.prototype.forwardInput = function (e, n) {
        return (
          void 0 === n && (n = {}),
          o(this, void 0, void 0, function () {
            var r, o, a, s, c, u, h, f, p, l, d, v, m, g, b, w, y, _, P, E, M;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  if (!(r = this.params))
                    throw new Error("Mtcnn - load model before inference");
                  if (!(o = e.canvases[0]))
                    throw new Error(
                      "Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet."
                    );
                  return (
                    (a = {}),
                    (s = Date.now()),
                    (c = t.tidy(function () {
                      return (
                        (e = t.expandDims(t.browser.fromPixels(o)).toFloat()),
                        t.tidy(function () {
                          return t.stack(t.unstack(e, 3).reverse(), 3);
                        })
                      );
                      var e;
                    })),
                    (u = function (t) {
                      return c.dispose(), (a.total = Date.now() - s), t;
                    }),
                    (h = c.shape.slice(1)),
                    (f = h[0]),
                    (p = h[1]),
                    (l = new tn(n)),
                    (d = l.minFaceSize),
                    (v = l.scaleFactor),
                    (m = l.maxNumScales),
                    (g = l.scoreThresholds),
                    (b = l.scaleSteps),
                    (w = (
                      b ||
                      (function (t, e, n) {
                        for (
                          var r = n[0],
                            o = n[1],
                            i = An / t,
                            a = [],
                            s = Math.min(r, o) * i,
                            c = 0;
                          s >= 12;

                        )
                          a.push(i * Math.pow(e, c)), (s *= e), (c += 1);
                        return a;
                      })(d, v, [f, p])
                    )
                      .filter(function (t) {
                        var e = Bn(t, [f, p]);
                        return Math.min(e.width, e.height) > An;
                      })
                      .slice(0, m)),
                    (a.scales = w),
                    (a.pyramid = w.map(function (t) {
                      return Bn(t, [f, p]);
                    })),
                    (y = Date.now()),
                    [4, Vn(c, w, g[0], r.pnet, a)]
                  );
                case 1:
                  return (
                    (_ = i.sent()),
                    (a.total_stage1 = Date.now() - y),
                    _.boxes.length
                      ? ((a.stage2_numInputBoxes = _.boxes.length),
                        (y = Date.now()),
                        [4, Un(o, _.boxes, g[1], r.rnet, a)])
                      : [2, u({ results: [], stats: a })]
                  );
                case 2:
                  return (
                    (P = i.sent()),
                    (a.total_stage2 = Date.now() - y),
                    P.boxes.length
                      ? ((a.stage3_numInputBoxes = P.boxes.length),
                        (y = Date.now()),
                        [4, Jn(o, P.boxes, g[2], r.onet, a)])
                      : [2, u({ results: [], stats: a })]
                  );
                case 3:
                  return (
                    (E = i.sent()),
                    (a.total_stage3 = Date.now() - y),
                    (M = E.boxes.map(function (t, e) {
                      return Ee(
                        G(
                          {},
                          new F(
                            E.scores[e],
                            new A(
                              t.left / p,
                              t.top / f,
                              t.width / p,
                              t.height / f
                            ),
                            { height: f, width: p }
                          )
                        ),
                        new j(
                          E.points[e].map(function (e) {
                            return e
                              .sub(new x(t.left, t.top))
                              .div(new x(t.width, t.height));
                          }),
                          { width: t.width, height: t.height }
                        )
                      );
                    })),
                    [2, u({ results: M, stats: a })]
                  );
              }
            });
          })
        );
      }),
      (r.prototype.forward = function (t, e) {
        return (
          void 0 === e && (e = {}),
          o(this, void 0, void 0, function () {
            var n;
            return i(this, function (r) {
              switch (r.label) {
                case 0:
                  return (n = this.forwardInput), [4, Ht(t)];
                case 1:
                  return [4, n.apply(this, [r.sent(), e])];
                case 2:
                  return [2, r.sent().results];
              }
            });
          })
        );
      }),
      (r.prototype.forwardWithStats = function (t, e) {
        return (
          void 0 === e && (e = {}),
          o(this, void 0, void 0, function () {
            var n;
            return i(this, function (r) {
              switch (r.label) {
                case 0:
                  return (n = this.forwardInput), [4, Ht(t)];
                case 1:
                  return [2, n.apply(this, [r.sent(), e])];
              }
            });
          })
        );
      }),
      (r.prototype.getDefaultModelName = function () {
        return "mtcnn_model";
      }),
      (r.prototype.extractParamsFromWeigthMap = function (t) {
        return jn(t);
      }),
      (r.prototype.extractParams = function (t) {
        return Nn(t);
      }),
      r
    );
  })(Qt),
  qn = [
    new x(1.603231, 2.094468),
    new x(6.041143, 7.080126),
    new x(2.882459, 3.518061),
    new x(4.266906, 5.178857),
    new x(9.041765, 10.66308),
  ],
  Xn = [117.001, 114.697, 97.404],
  Zn = (function (t) {
    function n() {
      var e = {
        withSeparableConvs: !0,
        iouThreshold: 0.4,
        classes: ["face"],
        anchors: qn,
        meanRgb: Xn,
        isFirstLayerConv2d: !0,
        filterSizes: [3, 16, 32, 64, 128, 256, 512],
      };
      return t.call(this, e) || this;
    }
    return (
      e(n, t),
      Object.defineProperty(n.prototype, "anchors", {
        get: function () {
          return this.config.anchors;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (n.prototype.locateFaces = function (t, e) {
        return o(this, void 0, void 0, function () {
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.detect(t, e)];
              case 1:
                return [
                  2,
                  n.sent().map(function (t) {
                    return new F(t.score, t.relativeBox, {
                      width: t.imageWidth,
                      height: t.imageHeight,
                    });
                  }),
                ];
            }
          });
        });
      }),
      (n.prototype.getDefaultModelName = function () {
        return "tiny_face_detector_model";
      }),
      (n.prototype.extractParamsFromWeigthMap = function (e) {
        return t.prototype.extractParamsFromWeigthMap.call(this, e);
      }),
      n
    );
  })(Tn),
  Kn = {
    ssdMobilenetv1: new fn(),
    tinyFaceDetector: new Zn(),
    tinyYolov2: new Dn(),
    mtcnn: new Yn(),
    faceLandmark68Net: new Ne(),
    faceLandmark68TinyNet: new Be(),
    faceRecognitionNet: new Ye(),
    faceExpressionNet: new ye(),
    ageGenderNet: new Le(),
  },
  Qn = function (t, e) {
    return Kn.ssdMobilenetv1.locateFaces(t, e);
  },
  $n = function (t, e) {
    return Kn.tinyFaceDetector.locateFaces(t, e);
  },
  tr = function (t, e) {
    return Kn.tinyYolov2.locateFaces(t, e);
  },
  er = function (t, e) {
    return Kn.mtcnn.forward(t, e);
  },
  nr = function (t) {
    return Kn.faceLandmark68Net.detectLandmarks(t);
  },
  rr = function (t) {
    return Kn.faceLandmark68TinyNet.detectLandmarks(t);
  },
  or = function (t) {
    return Kn.faceRecognitionNet.computeFaceDescriptor(t);
  },
  ir = function (t) {
    return Kn.faceExpressionNet.predictExpressions(t);
  },
  ar = function (t) {
    return Kn.ageGenderNet.predictAgeAndGender(t);
  },
  sr = function (t) {
    return Kn.ssdMobilenetv1.load(t);
  },
  cr = function (t) {
    return Kn.tinyFaceDetector.load(t);
  },
  ur = function (t) {
    return Kn.mtcnn.load(t);
  },
  hr = function (t) {
    return Kn.tinyYolov2.load(t);
  },
  fr = function (t) {
    return Kn.faceLandmark68Net.load(t);
  },
  pr = function (t) {
    return Kn.faceLandmark68TinyNet.load(t);
  },
  lr = function (t) {
    return Kn.faceRecognitionNet.load(t);
  },
  dr = function (t) {
    return Kn.faceExpressionNet.load(t);
  },
  vr = function (t) {
    return Kn.ageGenderNet.load(t);
  },
  mr = sr,
  gr = Qn,
  br = nr,
  wr = (function (t) {
    function n(e, n, r) {
      var o = t.call(this) || this;
      return (o.parentTask = e), (o.input = n), (o.extractedFaces = r), o;
    }
    return e(n, t), n;
  })(kn),
  yr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t,
            e,
            n = this;
          return i(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return [
                  4,
                  On(
                    (t = r.sent()),
                    this.input,
                    function (t) {
                      return o(n, void 0, void 0, function () {
                        return i(this, function (e) {
                          switch (e.label) {
                            case 0:
                              return [
                                4,
                                Promise.all(
                                  t.map(function (t) {
                                    return Kn.faceExpressionNet.predictExpressions(
                                      t
                                    );
                                  })
                                ),
                              ];
                            case 1:
                              return [2, e.sent()];
                          }
                        });
                      });
                    },
                    this.extractedFaces
                  ),
                ];
              case 2:
                return (
                  (e = r.sent()),
                  [
                    2,
                    t.map(function (t, n) {
                      return xe(t, e[n]);
                    }),
                  ]
                );
            }
          });
        });
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Mr(this, this.input);
      }),
      n
    );
  })(wr),
  _r = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t, e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return (t = n.sent())
                  ? [
                      4,
                      In(
                        t,
                        this.input,
                        function (t) {
                          return Kn.faceExpressionNet.predictExpressions(t);
                        },
                        this.extractedFaces
                      ),
                    ]
                  : [2];
              case 2:
                return (e = n.sent()), [2, xe(t, e)];
            }
          });
        });
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Fr(this, this.input);
      }),
      n
    );
  })(wr),
  xr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.withAgeAndGender = function () {
        return new Tr(this, this.input);
      }),
      (n.prototype.withFaceDescriptors = function () {
        return new Cr(this, this.input);
      }),
      n
    );
  })(yr),
  Pr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.withAgeAndGender = function () {
        return new Dr(this, this.input);
      }),
      (n.prototype.withFaceDescriptor = function () {
        return new kr(this, this.input);
      }),
      n
    );
  })(_r),
  Er = (function (t) {
    function n(e, n, r) {
      var o = t.call(this) || this;
      return (o.parentTask = e), (o.input = n), (o.extractedFaces = r), o;
    }
    return e(n, t), n;
  })(kn),
  Mr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t,
            e,
            n = this;
          return i(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return [
                  4,
                  On(
                    (t = r.sent()),
                    this.input,
                    function (t) {
                      return o(n, void 0, void 0, function () {
                        return i(this, function (e) {
                          switch (e.label) {
                            case 0:
                              return [
                                4,
                                Promise.all(
                                  t.map(function (t) {
                                    return Kn.ageGenderNet.predictAgeAndGender(
                                      t
                                    );
                                  })
                                ),
                              ];
                            case 1:
                              return [2, e.sent()];
                          }
                        });
                      });
                    },
                    this.extractedFaces
                  ),
                ];
              case 2:
                return (
                  (e = r.sent()),
                  [
                    2,
                    t.map(function (t, n) {
                      var r = e[n],
                        o = r.age;
                      return Ke($e(t, r.gender, r.genderProbability), o);
                    }),
                  ]
                );
            }
          });
        });
      }),
      (n.prototype.withFaceExpressions = function () {
        return new yr(this, this.input);
      }),
      n
    );
  })(Er),
  Fr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t, e, n, r, o;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return (t = i.sent())
                  ? [
                      4,
                      In(
                        t,
                        this.input,
                        function (t) {
                          return Kn.ageGenderNet.predictAgeAndGender(t);
                        },
                        this.extractedFaces
                      ),
                    ]
                  : [2];
              case 2:
                return (
                  (e = i.sent()),
                  (n = e.age),
                  (r = e.gender),
                  (o = e.genderProbability),
                  [2, Ke($e(t, r, o), n)]
                );
            }
          });
        });
      }),
      (n.prototype.withFaceExpressions = function () {
        return new _r(this, this.input);
      }),
      n
    );
  })(Er),
  Tr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.withFaceExpressions = function () {
        return new xr(this, this.input);
      }),
      (n.prototype.withFaceDescriptors = function () {
        return new Cr(this, this.input);
      }),
      n
    );
  })(Mr),
  Dr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.withFaceExpressions = function () {
        return new Pr(this, this.input);
      }),
      (n.prototype.withFaceDescriptor = function () {
        return new kr(this, this.input);
      }),
      n
    );
  })(Fr),
  Sr = (function (t) {
    function n(e, n) {
      var r = t.call(this) || this;
      return (r.parentTask = e), (r.input = n), r;
    }
    return e(n, t), n;
  })(kn),
  Cr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t;
          return i(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return [
                  4,
                  On(
                    (t = e.sent()),
                    this.input,
                    function (t) {
                      return Promise.all(
                        t.map(function (t) {
                          return Kn.faceRecognitionNet.computeFaceDescriptor(t);
                        })
                      );
                    },
                    null,
                    function (t) {
                      return t.landmarks.align(null, { useDlibAlignment: !0 });
                    }
                  ),
                ];
              case 2:
                return [
                  2,
                  e.sent().map(function (e, n) {
                    return Xe(t[n], e);
                  }),
                ];
            }
          });
        });
      }),
      (n.prototype.withFaceExpressions = function () {
        return new xr(this, this.input);
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Tr(this, this.input);
      }),
      n
    );
  })(Sr),
  kr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t, e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return (t = n.sent())
                  ? [
                      4,
                      In(
                        t,
                        this.input,
                        function (t) {
                          return Kn.faceRecognitionNet.computeFaceDescriptor(t);
                        },
                        null,
                        function (t) {
                          return t.landmarks.align(null, {
                            useDlibAlignment: !0,
                          });
                        }
                      ),
                    ]
                  : [2];
              case 2:
                return (e = n.sent()), [2, Xe(t, e)];
            }
          });
        });
      }),
      (n.prototype.withFaceExpressions = function () {
        return new Pr(this, this.input);
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Dr(this, this.input);
      }),
      n
    );
  })(Sr),
  Or = (function (t) {
    function n(e, n, r) {
      var o = t.call(this) || this;
      return (o.parentTask = e), (o.input = n), (o.useTinyLandmarkNet = r), o;
    }
    return (
      e(n, t),
      Object.defineProperty(n.prototype, "landmarkNet", {
        get: function () {
          return this.useTinyLandmarkNet
            ? Kn.faceLandmark68TinyNet
            : Kn.faceLandmark68Net;
        },
        enumerable: !0,
        configurable: !0,
      }),
      n
    );
  })(kn),
  Ir = (function (n) {
    function r() {
      return (null !== n && n.apply(this, arguments)) || this;
    }
    return (
      e(r, n),
      (r.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var e,
            n,
            r,
            o,
            a,
            s = this;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return (
                  (e = i.sent()),
                  (n = e.map(function (t) {
                    return t.detection;
                  })),
                  this.input instanceof t.Tensor
                    ? [4, Gt(this.input, n)]
                    : [3, 3]
                );
              case 2:
                return (o = i.sent()), [3, 5];
              case 3:
                return [4, Vt(this.input, n)];
              case 4:
                (o = i.sent()), (i.label = 5);
              case 5:
                return (
                  (r = o),
                  [
                    4,
                    Promise.all(
                      r.map(function (t) {
                        return s.landmarkNet.detectLandmarks(t);
                      })
                    ),
                  ]
                );
              case 6:
                return (
                  (a = i.sent()),
                  r.forEach(function (e) {
                    return e instanceof t.Tensor && e.dispose();
                  }),
                  [
                    2,
                    e.map(function (t, e) {
                      return Ee(t, a[e]);
                    }),
                  ]
                );
            }
          });
        });
      }),
      (r.prototype.withFaceExpressions = function () {
        return new xr(this, this.input);
      }),
      (r.prototype.withAgeAndGender = function () {
        return new Tr(this, this.input);
      }),
      (r.prototype.withFaceDescriptors = function () {
        return new Cr(this, this.input);
      }),
      r
    );
  })(Or),
  Lr = (function (n) {
    function r() {
      return (null !== n && n.apply(this, arguments)) || this;
    }
    return (
      e(r, n),
      (r.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var e, n, r, o, a;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.parentTask];
              case 1:
                return (e = i.sent())
                  ? ((n = e.detection),
                    this.input instanceof t.Tensor
                      ? [4, Gt(this.input, [n])]
                      : [3, 3])
                  : [2];
              case 2:
                return (o = i.sent()), [3, 5];
              case 3:
                return [4, Vt(this.input, [n])];
              case 4:
                (o = i.sent()), (i.label = 5);
              case 5:
                return (r = o), [4, this.landmarkNet.detectLandmarks(r[0])];
              case 6:
                return (
                  (a = i.sent()),
                  r.forEach(function (e) {
                    return e instanceof t.Tensor && e.dispose();
                  }),
                  [2, Ee(e, a)]
                );
            }
          });
        });
      }),
      (r.prototype.withFaceExpressions = function () {
        return new Pr(this, this.input);
      }),
      (r.prototype.withAgeAndGender = function () {
        return new Dr(this, this.input);
      }),
      (r.prototype.withFaceDescriptor = function () {
        return new kr(this, this.input);
      }),
      r
    );
  })(Or),
  Ar = (function (t) {
    function n(e, n) {
      void 0 === n && (n = new hn());
      var r = t.call(this) || this;
      return (r.input = e), (r.options = n), r;
    }
    return e(n, t), n;
  })(kn),
  Nr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t, e, n, r;
          return i(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (e = (t = this).input),
                  (n = t.options) instanceof tn
                    ? [4, Kn.mtcnn.forward(e, n)]
                    : [3, 2]
                );
              case 1:
                return [
                  2,
                  o.sent().map(function (t) {
                    return t.detection;
                  }),
                ];
              case 2:
                if (
                  ((r =
                    n instanceof Cn
                      ? function (t) {
                          return Kn.tinyFaceDetector.locateFaces(t, n);
                        }
                      : n instanceof hn
                      ? function (t) {
                          return Kn.ssdMobilenetv1.locateFaces(t, n);
                        }
                      : n instanceof Fn
                      ? function (t) {
                          return Kn.tinyYolov2.locateFaces(t, n);
                        }
                      : null),
                  !r)
                )
                  throw new Error(
                    "detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options"
                  );
                return [2, r(e)];
            }
          });
        });
      }),
      (n.prototype.runAndExtendWithFaceDetections = function () {
        var t = this;
        return new Promise(function (e) {
          return o(t, void 0, void 0, function () {
            var t;
            return i(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, this.run()];
                case 1:
                  return (
                    (t = n.sent()),
                    [
                      2,
                      e(
                        t.map(function (t) {
                          return G({}, t);
                        })
                      ),
                    ]
                  );
              }
            });
          });
        });
      }),
      (n.prototype.withFaceLandmarks = function (t) {
        return (
          void 0 === t && (t = !1),
          new Ir(this.runAndExtendWithFaceDetections(), this.input, t)
        );
      }),
      (n.prototype.withFaceExpressions = function () {
        return new yr(this.runAndExtendWithFaceDetections(), this.input);
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Mr(this.runAndExtendWithFaceDetections(), this.input);
      }),
      n
    );
  })(Ar),
  jr = (function (t) {
    function n() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      e(n, t),
      (n.prototype.run = function () {
        return o(this, void 0, void 0, function () {
          var t, e;
          return i(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, new Nr(this.input, this.options)];
              case 1:
                return (
                  (t = n.sent()),
                  (e = t[0]),
                  t.forEach(function (t) {
                    t.score > e.score && (e = t);
                  }),
                  [2, e]
                );
            }
          });
        });
      }),
      (n.prototype.runAndExtendWithFaceDetection = function () {
        var t = this;
        return new Promise(function (e) {
          return o(t, void 0, void 0, function () {
            var t;
            return i(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, this.run()];
                case 1:
                  return (t = n.sent()), [2, e(t ? G({}, t) : void 0)];
              }
            });
          });
        });
      }),
      (n.prototype.withFaceLandmarks = function (t) {
        return (
          void 0 === t && (t = !1),
          new Lr(this.runAndExtendWithFaceDetection(), this.input, t)
        );
      }),
      (n.prototype.withFaceExpressions = function () {
        return new _r(this.runAndExtendWithFaceDetection(), this.input);
      }),
      (n.prototype.withAgeAndGender = function () {
        return new Fr(this.runAndExtendWithFaceDetection(), this.input);
      }),
      n
    );
  })(Ar);
function Br(t, e) {
  return void 0 === e && (e = new hn()), new jr(t, e);
}
function Wr(t, e) {
  return void 0 === e && (e = new hn()), new Nr(t, e);
}
function Rr(t, e) {
  return o(this, void 0, void 0, function () {
    return i(this, function (n) {
      switch (n.label) {
        case 0:
          return (
            console.warn(
              "allFacesSsdMobilenetv1 is deprecated and will be removed soon, use the high level api instead"
            ),
            [
              4,
              Wr(t, new hn(e ? { minConfidence: e } : {}))
                .withFaceLandmarks()
                .withFaceDescriptors(),
            ]
          );
        case 1:
          return [2, n.sent()];
      }
    });
  });
}
function zr(t, e) {
  return (
    void 0 === e && (e = {}),
    o(this, void 0, void 0, function () {
      return i(this, function (n) {
        switch (n.label) {
          case 0:
            return (
              console.warn(
                "allFacesTinyYolov2 is deprecated and will be removed soon, use the high level api instead"
              ),
              [4, Wr(t, new Fn(e)).withFaceLandmarks().withFaceDescriptors()]
            );
          case 1:
            return [2, n.sent()];
        }
      });
    })
  );
}
function Hr(t, e) {
  return (
    void 0 === e && (e = {}),
    o(this, void 0, void 0, function () {
      return i(this, function (n) {
        switch (n.label) {
          case 0:
            return (
              console.warn(
                "allFacesMtcnn is deprecated and will be removed soon, use the high level api instead"
              ),
              [4, Wr(t, new tn(e)).withFaceLandmarks().withFaceDescriptors()]
            );
          case 1:
            return [2, n.sent()];
        }
      });
    })
  );
}
var Vr = Rr;
function Gr(t, e) {
  if (t.length !== e.length)
    throw new Error("euclideanDistance: arr1.length !== arr2.length");
  var n = Array.from(t),
    r = Array.from(e);
  return Math.sqrt(
    n
      .map(function (t, e) {
        return t - r[e];
      })
      .reduce(function (t, e) {
        return t + Math.pow(e, 2);
      }, 0)
  );
}
var Ur = (function () {
  function t(t, e) {
    void 0 === e && (e = 0.6), (this._distanceThreshold = e);
    var n = Array.isArray(t) ? t : [t];
    if (!n.length)
      throw new Error(
        "FaceRecognizer.constructor - expected atleast one input"
      );
    var r = 1,
      o = function () {
        return "person " + r++;
      };
    this._labeledDescriptors = n.map(function (t) {
      if (t instanceof z) return t;
      if (t instanceof Float32Array) return new z(o(), [t]);
      if (t.descriptor && t.descriptor instanceof Float32Array)
        return new z(o(), [t.descriptor]);
      throw new Error(
        "FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>"
      );
    });
  }
  return (
    Object.defineProperty(t.prototype, "labeledDescriptors", {
      get: function () {
        return this._labeledDescriptors;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "distanceThreshold", {
      get: function () {
        return this._distanceThreshold;
      },
      enumerable: !0,
      configurable: !0,
    }),
    (t.prototype.computeMeanDistance = function (t, e) {
      return (
        e
          .map(function (e) {
            return Gr(e, t);
          })
          .reduce(function (t, e) {
            return t + e;
          }, 0) / (e.length || 1)
      );
    }),
    (t.prototype.matchDescriptor = function (t) {
      var e = this;
      return this.labeledDescriptors
        .map(function (n) {
          var r = n.descriptors,
            o = n.label;
          return new W(o, e.computeMeanDistance(t, r));
        })
        .reduce(function (t, e) {
          return t.distance < e.distance ? t : e;
        });
    }),
    (t.prototype.findBestMatch = function (t) {
      var e = this.matchDescriptor(t);
      return e.distance < this.distanceThreshold
        ? e
        : new W("unknown", e.distance);
    }),
    (t.prototype.toJSON = function () {
      return {
        distanceThreshold: this.distanceThreshold,
        labeledDescriptors: this.labeledDescriptors.map(function (t) {
          return t.toJSON();
        }),
      };
    }),
    (t.fromJSON = function (e) {
      return new t(
        e.labeledDescriptors.map(function (t) {
          return z.fromJSON(t);
        }),
        e.distanceThreshold
      );
    }),
    t
  );
})();
function Jr(t) {
  var e = new Yn();
  return e.extractWeights(t), e;
}
function Yr(t) {
  var e = new Zn();
  return e.extractWeights(t), e;
}
function qr(t, e) {
  var n = new s(e.width, e.height),
    r = n.width,
    o = n.height;
  if (r <= 0 || o <= 0)
    throw new Error(
      "resizeResults - invalid dimensions: " +
        JSON.stringify({ width: r, height: o })
    );
  if (Array.isArray(t))
    return t.map(function (t) {
      return qr(t, { width: r, height: o });
    });
  if (Pe(t)) {
    var i = t.detection.forSize(r, o),
      a = t.unshiftedLandmarks.forSize(i.box.width, i.box.height);
    return Ee(G(t, i), a);
  }
  return V(t)
    ? G(t, t.detection.forSize(r, o))
    : t instanceof N || t instanceof F
    ? t.forSize(r, o)
    : t;
}
export {
  Le as AgeGenderNet,
  E as BoundingBox,
  P as Box,
  kn as ComposableTask,
  Cr as ComputeAllFaceDescriptorsTask,
  Sr as ComputeFaceDescriptorsTaskBase,
  kr as ComputeSingleFaceDescriptorTask,
  Ir as DetectAllFaceLandmarksTask,
  Nr as DetectAllFacesTask,
  Or as DetectFaceLandmarksTaskBase,
  Ar as DetectFacesTaskBase,
  Lr as DetectSingleFaceLandmarksTask,
  jr as DetectSingleFaceTask,
  s as Dimensions,
  be as FACE_EXPRESSION_LABELS,
  F as FaceDetection,
  vn as FaceDetectionNet,
  ye as FaceExpressionNet,
  we as FaceExpressions,
  Ne as FaceLandmark68Net,
  Be as FaceLandmark68TinyNet,
  We as FaceLandmarkNet,
  N as FaceLandmarks,
  j as FaceLandmarks5,
  B as FaceLandmarks68,
  W as FaceMatch,
  Ur as FaceMatcher,
  Ye as FaceRecognitionNet,
  Oe as Gender,
  R as LabeledBox,
  z as LabeledFaceDescriptors,
  Yn as Mtcnn,
  tn as MtcnnOptions,
  zt as NetInput,
  Qt as NeuralNetwork,
  M as ObjectDetection,
  x as Point,
  H as PredictedBox,
  A as Rect,
  fn as SsdMobilenetv1,
  hn as SsdMobilenetv1Options,
  Zn as TinyFaceDetector,
  Cn as TinyFaceDetectorOptions,
  Dn as TinyYolov2,
  Fn as TinyYolov2Options,
  dn as TinyYolov2SizeType,
  Vr as allFaces,
  Hr as allFacesMtcnn,
  Rr as allFacesSsdMobilenetv1,
  zr as allFacesTinyYolov2,
  It as awaitMediaLoaded,
  Lt as bufferToImage,
  or as computeFaceDescriptor,
  Nt as createCanvas,
  jt as createCanvasFromMedia,
  ln as createFaceDetectionNet,
  qe as createFaceRecognitionNet,
  Jr as createMtcnn,
  pn as createSsdMobilenetv1,
  Yr as createTinyFaceDetector,
  Sn as createTinyYolov2,
  Wr as detectAllFaces,
  nr as detectFaceLandmarks,
  rr as detectFaceLandmarksTiny,
  br as detectLandmarks,
  Br as detectSingleFace,
  Te as draw,
  Mt as env,
  Gr as euclideanDistance,
  Ke as extendWithAge,
  Xe as extendWithFaceDescriptor,
  G as extendWithFaceDetection,
  xe as extendWithFaceExpressions,
  Ee as extendWithFaceLandmarks,
  $e as extendWithGender,
  Gt as extractFaceTensors,
  Vt as extractFaces,
  Jt as fetchImage,
  Yt as fetchJson,
  qt as fetchNetWeights,
  Ut as fetchOrThrow,
  Tt as getContext2dOrThrow,
  At as getMediaDimensions,
  Bt as imageTensorToCanvas,
  Rt as imageToSquare,
  L as inverseSigmoid,
  T as iou,
  Wt as isMediaElement,
  Ot as isMediaLoaded,
  Ze as isWithAge,
  V as isWithFaceDetection,
  _e as isWithFaceExpressions,
  Pe as isWithFaceLandmarks,
  Qe as isWithGender,
  vr as loadAgeGenderModel,
  mr as loadFaceDetectionModel,
  dr as loadFaceExpressionModel,
  fr as loadFaceLandmarkModel,
  pr as loadFaceLandmarkTinyModel,
  lr as loadFaceRecognitionModel,
  ur as loadMtcnnModel,
  sr as loadSsdMobilenetv1Model,
  cr as loadTinyFaceDetectorModel,
  hr as loadTinyYolov2Model,
  Zt as loadWeightMap,
  gr as locateFaces,
  Kt as matchDimensions,
  D as minBbox,
  er as mtcnn,
  Kn as nets,
  S as nonMaxSuppression,
  C as normalize,
  k as padToSquare,
  ar as predictAgeAndGender,
  ir as recognizeFaceExpressions,
  qr as resizeResults,
  Ft as resolveInput,
  O as shuffleArray,
  I as sigmoid,
  Qn as ssdMobilenetv1,
  $n as tinyFaceDetector,
  tr as tinyYolov2,
  Ht as toNetInput,
  _ as utils,
  yn as validateConfig,
};
export default null;
//# sourceMappingURL=/sm/66082300fc3b0c174e359a566b8256541c1dacdf23fbe012919f5b3e2d5c4736.map
