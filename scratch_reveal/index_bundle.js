!(function (t) {
  var e = {};
  function i(n) {
    if (e[n]) return e[n].exports;
    var r = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, n) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          i.d(
            n,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return n;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 2));
})([
  function (t, e, i) {
    "use strict";
    t.exports = function (t, e, i) {
      if ("function" == typeof Array.prototype.find) return t.find(e, i);
      i = i || this;
      var n,
        r = t.length;
      if ("function" != typeof e) throw new TypeError(e + " is not a function");
      for (n = 0; n < r; n++) if (e.call(i, t[n], n, t)) return t[n];
    };
  },
  function (t, e) {
    !(function () {
      "use strict";
      if ("object" == typeof window)
        if (
          "IntersectionObserver" in window &&
          "IntersectionObserverEntry" in window &&
          "intersectionRatio" in window.IntersectionObserverEntry.prototype
        )
          "isIntersecting" in window.IntersectionObserverEntry.prototype ||
            Object.defineProperty(
              window.IntersectionObserverEntry.prototype,
              "isIntersecting",
              {
                get: function () {
                  return this.intersectionRatio > 0;
                },
              }
            );
        else {
          var t = window.document,
            e = [];
          (n.prototype.THROTTLE_TIMEOUT = 100),
            (n.prototype.POLL_INTERVAL = null),
            (n.prototype.USE_MUTATION_OBSERVER = !0),
            (n.prototype.observe = function (t) {
              if (
                !this._observationTargets.some(function (e) {
                  return e.element == t;
                })
              ) {
                if (!t || 1 != t.nodeType)
                  throw new Error("target must be an Element");
                this._registerInstance(),
                  this._observationTargets.push({ element: t, entry: null }),
                  this._monitorIntersections(),
                  this._checkForIntersections();
              }
            }),
            (n.prototype.unobserve = function (t) {
              (this._observationTargets = this._observationTargets.filter(
                function (e) {
                  return e.element != t;
                }
              )),
                this._observationTargets.length ||
                  (this._unmonitorIntersections(), this._unregisterInstance());
            }),
            (n.prototype.disconnect = function () {
              (this._observationTargets = []),
                this._unmonitorIntersections(),
                this._unregisterInstance();
            }),
            (n.prototype.takeRecords = function () {
              var t = this._queuedEntries.slice();
              return (this._queuedEntries = []), t;
            }),
            (n.prototype._initThresholds = function (t) {
              var e = t || [0];
              return (
                Array.isArray(e) || (e = [e]),
                e.sort().filter(function (t, e, i) {
                  if ("number" != typeof t || isNaN(t) || t < 0 || t > 1)
                    throw new Error(
                      "threshold must be a number between 0 and 1 inclusively"
                    );
                  return t !== i[e - 1];
                })
              );
            }),
            (n.prototype._parseRootMargin = function (t) {
              var e = (t || "0px").split(/\s+/).map(function (t) {
                var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                if (!e)
                  throw new Error(
                    "rootMargin must be specified in pixels or percent"
                  );
                return { value: parseFloat(e[1]), unit: e[2] };
              });
              return (
                (e[1] = e[1] || e[0]),
                (e[2] = e[2] || e[0]),
                (e[3] = e[3] || e[1]),
                e
              );
            }),
            (n.prototype._monitorIntersections = function () {
              this._monitoringIntersections ||
                ((this._monitoringIntersections = !0),
                this.POLL_INTERVAL
                  ? (this._monitoringInterval = setInterval(
                      this._checkForIntersections,
                      this.POLL_INTERVAL
                    ))
                  : (r(window, "resize", this._checkForIntersections, !0),
                    r(t, "scroll", this._checkForIntersections, !0),
                    this.USE_MUTATION_OBSERVER &&
                      "MutationObserver" in window &&
                      ((this._domObserver = new MutationObserver(
                        this._checkForIntersections
                      )),
                      this._domObserver.observe(t, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                      }))));
            }),
            (n.prototype._unmonitorIntersections = function () {
              this._monitoringIntersections &&
                ((this._monitoringIntersections = !1),
                clearInterval(this._monitoringInterval),
                (this._monitoringInterval = null),
                o(window, "resize", this._checkForIntersections, !0),
                o(t, "scroll", this._checkForIntersections, !0),
                this._domObserver &&
                  (this._domObserver.disconnect(), (this._domObserver = null)));
            }),
            (n.prototype._checkForIntersections = function () {
              var t = this._rootIsInDom(),
                e = t
                  ? this._getRootRect()
                  : {
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                    };
              this._observationTargets.forEach(function (n) {
                var r = n.element,
                  o = s(r),
                  h = this._rootContainsTarget(r),
                  a = n.entry,
                  c = t && h && this._computeTargetAndRootIntersection(r, e),
                  u = (n.entry = new i({
                    time:
                      window.performance &&
                      performance.now &&
                      performance.now(),
                    target: r,
                    boundingClientRect: o,
                    rootBounds: e,
                    intersectionRect: c,
                  }));
                a
                  ? t && h
                    ? this._hasCrossedThreshold(a, u) &&
                      this._queuedEntries.push(u)
                    : a && a.isIntersecting && this._queuedEntries.push(u)
                  : this._queuedEntries.push(u);
              }, this),
                this._queuedEntries.length &&
                  this._callback(this.takeRecords(), this);
            }),
            (n.prototype._computeTargetAndRootIntersection = function (e, i) {
              if ("none" != window.getComputedStyle(e).display) {
                for (
                  var n, r, o, h, c, u, l, d, f = s(e), p = a(e), m = !1;
                  !m;

                ) {
                  var b = null,
                    _ = 1 == p.nodeType ? window.getComputedStyle(p) : {};
                  if ("none" == _.display) return;
                  if (
                    (p == this.root || p == t
                      ? ((m = !0), (b = i))
                      : p != t.body &&
                        p != t.documentElement &&
                        "visible" != _.overflow &&
                        (b = s(p)),
                    b &&
                      ((n = b),
                      (r = f),
                      (o = void 0),
                      (h = void 0),
                      (c = void 0),
                      (u = void 0),
                      (l = void 0),
                      (d = void 0),
                      (o = Math.max(n.top, r.top)),
                      (h = Math.min(n.bottom, r.bottom)),
                      (c = Math.max(n.left, r.left)),
                      (u = Math.min(n.right, r.right)),
                      (d = h - o),
                      !(f = (l = u - c) >= 0 &&
                        d >= 0 && {
                          top: o,
                          bottom: h,
                          left: c,
                          right: u,
                          width: l,
                          height: d,
                        })))
                  )
                    break;
                  p = a(p);
                }
                return f;
              }
            }),
            (n.prototype._getRootRect = function () {
              var e;
              if (this.root) e = s(this.root);
              else {
                var i = t.documentElement,
                  n = t.body;
                e = {
                  top: 0,
                  left: 0,
                  right: i.clientWidth || n.clientWidth,
                  width: i.clientWidth || n.clientWidth,
                  bottom: i.clientHeight || n.clientHeight,
                  height: i.clientHeight || n.clientHeight,
                };
              }
              return this._expandRectByRootMargin(e);
            }),
            (n.prototype._expandRectByRootMargin = function (t) {
              var e = this._rootMarginValues.map(function (e, i) {
                  return "px" == e.unit
                    ? e.value
                    : (e.value * (i % 2 ? t.width : t.height)) / 100;
                }),
                i = {
                  top: t.top - e[0],
                  right: t.right + e[1],
                  bottom: t.bottom + e[2],
                  left: t.left - e[3],
                };
              return (
                (i.width = i.right - i.left), (i.height = i.bottom - i.top), i
              );
            }),
            (n.prototype._hasCrossedThreshold = function (t, e) {
              var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
              if (i !== n)
                for (var r = 0; r < this.thresholds.length; r++) {
                  var o = this.thresholds[r];
                  if (o == i || o == n || o < i != o < n) return !0;
                }
            }),
            (n.prototype._rootIsInDom = function () {
              return !this.root || h(t, this.root);
            }),
            (n.prototype._rootContainsTarget = function (e) {
              return h(this.root || t, e);
            }),
            (n.prototype._registerInstance = function () {
              e.indexOf(this) < 0 && e.push(this);
            }),
            (n.prototype._unregisterInstance = function () {
              var t = e.indexOf(this);
              -1 != t && e.splice(t, 1);
            }),
            (window.IntersectionObserver = n),
            (window.IntersectionObserverEntry = i);
        }
      function i(t) {
        (this.time = t.time),
          (this.target = t.target),
          (this.rootBounds = t.rootBounds),
          (this.boundingClientRect = t.boundingClientRect),
          (this.intersectionRect = t.intersectionRect || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
          }),
          (this.isIntersecting = !!t.intersectionRect);
        var e = this.boundingClientRect,
          i = e.width * e.height,
          n = this.intersectionRect,
          r = n.width * n.height;
        this.intersectionRatio = i
          ? Number((r / i).toFixed(4))
          : this.isIntersecting
          ? 1
          : 0;
      }
      function n(t, e) {
        var i,
          n,
          r,
          o = e || {};
        if ("function" != typeof t)
          throw new Error("callback must be a function");
        if (o.root && 1 != o.root.nodeType)
          throw new Error("root must be an Element");
        (this._checkForIntersections =
          ((i = this._checkForIntersections.bind(this)),
          (n = this.THROTTLE_TIMEOUT),
          (r = null),
          function () {
            r ||
              (r = setTimeout(function () {
                i(), (r = null);
              }, n));
          })),
          (this._callback = t),
          (this._observationTargets = []),
          (this._queuedEntries = []),
          (this._rootMarginValues = this._parseRootMargin(o.rootMargin)),
          (this.thresholds = this._initThresholds(o.threshold)),
          (this.root = o.root || null),
          (this.rootMargin = this._rootMarginValues
            .map(function (t) {
              return t.value + t.unit;
            })
            .join(" "));
      }
      function r(t, e, i, n) {
        "function" == typeof t.addEventListener
          ? t.addEventListener(e, i, n || !1)
          : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i);
      }
      function o(t, e, i, n) {
        "function" == typeof t.removeEventListener
          ? t.removeEventListener(e, i, n || !1)
          : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, i);
      }
      function s(t) {
        var e;
        try {
          e = t.getBoundingClientRect();
        } catch (t) {}
        return e
          ? ((e.width && e.height) ||
              (e = {
                top: e.top,
                right: e.right,
                bottom: e.bottom,
                left: e.left,
                width: e.right - e.left,
                height: e.bottom - e.top,
              }),
            e)
          : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
      }
      function h(t, e) {
        for (var i = e; i; ) {
          if (i == t) return !0;
          i = a(i);
        }
        return !1;
      }
      function a(t) {
        var e = t.parentNode;
        return e && 11 == e.nodeType && e.host
          ? e.host
          : e && e.assignedSlot
          ? e.assignedSlot.parentNode
          : e;
      }
    })();
  },
  function (t, e, i) {
    "use strict";
    i.r(e);
    var n = {};
    i.r(n),
      i.d(n, "START", function () {
        return h;
      }),
      i.d(n, "STOP", function () {
        return a;
      }),
      i.d(n, "CHANGE", function () {
        return c;
      }),
      i.d(n, "COMPLETE", function () {
        return u;
      }),
      i.d(n, "UNMEASUREABLE", function () {
        return l;
      }),
      i.d(n, "INVIEW", function () {
        return d;
      }),
      i.d(n, "OUTVIEW", function () {
        return f;
      });
    var r = {};
    i.r(r),
      i.d(r, "IntersectionObserver", function () {
        return g;
      }),
      i.d(r, "IntersectionObserverPolyfill", function () {
        return T;
      }),
      i.d(r, "BaseTechnique", function () {
        return m;
      });
    var o = {};
    i.r(o),
      i.d(o, "MRC_VIDEO", function () {
        return O;
      }),
      i.d(o, "MRC_DISPLAY", function () {
        return V;
      }),
      i.d(o, "customCriteria", function () {
        return R;
      });
    var s = {};
    i.r(s),
      i.d(s, "DEFAULT_STRATEGY", function () {
        return M;
      }),
      i.d(s, "StrategyFactory", function () {
        return C;
      });
    i(0);
    const h = "start",
      a = "stop",
      c = "change",
      u = "complete",
      l = "unmeasureable",
      d = "inview",
      f = "outview";
    class p {
      constructor(t) {
        (this.duration = t), (this.listeners = []), (this.completed = !1);
      }
      timerComplete() {
        (this.completed = !0), this.listeners.forEach((t) => t());
      }
      elapsed(t) {
        "function" == typeof t && this.listeners.push(t);
      }
      start() {
        this.endTimer(),
          (this.timer = setTimeout(
            this.timerComplete.bind(this),
            this.duration
          ));
      }
      stop() {
        this.endTimer();
      }
      endTimer() {
        this.timer && (clearTimeout(this.timer), (this.listeners.length = 0));
      }
      dispose() {
        this.endTimer();
      }
    }
    class m {
      constructor() {
        (this.listeners = { inView: [], outView: [], changeView: [] }),
          (this.percentViewable = 0);
      }
      onInView(t) {
        return this.addCallback(t, "inView");
      }
      onChangeView(t) {
        return this.addCallback(t, "changeView");
      }
      onOutView(t) {
        return this.addCallback(t, "outView");
      }
      addCallback(t, e) {
        if ("function" == typeof t && this.listeners[e])
          this.listeners[e].push(t);
        else if ("function" != typeof t) throw "callback must be function";
        return this;
      }
      start() {}
      dispose() {}
      get unmeasureable() {
        return !1;
      }
      get viewable() {
        return !1;
      }
      get techniqueName() {
        return "BaseTechnique";
      }
    }
    const b = (t) => {
        return (
          "function" == typeof t &&
          Object.getOwnPropertyNames(m).reduce(
            (e, i) => i && typeof t[e] == typeof m[e],
            !0
          )
        );
      },
      _ = (t) => t && t.toString().indexOf("Element") > -1,
      w = ({ autostart: t, techniques: e, criteria: i }) => {
        let n = !1,
          r = [];
        "boolean" != typeof t &&
          ((n = !0), r.push("autostart must be boolean")),
          (Array.isArray(e) && 0 !== e.length) ||
            ((n = !0),
            r.push(
              "techniques must be an array containing atleast on measurement techniques"
            ));
        const o = (({ inViewThreshold: t, timeInView: e }) => {
          let i = !1,
            n = [];
          return (
            ("number" != typeof t || t > 1) &&
              ((i = !0),
              n.push(
                "inViewThreshold must be a number equal to or less than 1"
              )),
            ("number" != typeof e || e < 0) &&
              ((i = !0),
              n.push("timeInView must be a number greater to or equal 0")),
            { invalid: i, reasons: n.join(" | ") }
          );
        })(i);
        return (
          o.invalid && ((n = !0), r.push(o.reasons)),
          { invalid: n, reasons: r.join(" | ") }
        );
      };
    class g extends m {
      constructor(t, e = M.criteria) {
        if ((super(t, e), void 0 !== e && t))
          (this.element = t),
            (this.criteria = e),
            (this.inView = !1),
            (this.started = !1),
            (this.notificationLevels = [
              0,
              0.1,
              0.2,
              0.3,
              0.4,
              0.5,
              0.6,
              0.7,
              0.8,
              0.9,
              1,
            ]),
            -1 ===
              this.notificationLevels.indexOf(this.criteria.inViewThreshold) &&
              this.notificationLevels.push(this.criteria.inViewThreshold);
        else if (!t) throw "element not provided";
      }
      start() {
        (this.observer = new window.IntersectionObserver(
          this.viewableChange.bind(this),
          { threshold: this.notificationLevels }
        )),
          this.observer.observe(this.element);
      }
      dispose() {
        this.observer &&
          (this.observer.unobserve(element), this.observer.disconnect(element));
      }
      get unmeasureable() {
        return (
          !window.IntersectionObserver || this.usesPolyfill || !_(this.element)
        );
      }
      get viewable() {
        return this.inView;
      }
      get techniqueName() {
        return "IntersectionObserver";
      }
      get usesPolyfill() {
        return (
          "number" ==
          typeof window.IntersectionObserver.prototype.THROTTLE_TIMEOUT
        );
      }
      viewableChange(t) {
        t &&
          t.length &&
          void 0 !== t[0].intersectionRatio &&
          ((this.percentViewable = t[0].intersectionRatio),
          t[0].intersectionRatio < this.criteria.inViewThreshold &&
            this.started &&
            this.inView &&
            ((this.inView = !1), this.listeners.outView.forEach((t) => t())),
          t[0].intersectionRatio >= this.criteria.inViewThreshold &&
            !this.inView &&
            ((this.started = !0),
            (this.inView = !0),
            this.listeners.inView.forEach((t) => t())),
          this.listeners.changeView.forEach((t) => t()));
      }
    }
    i(1);
    const v = (t = {}) => ({
        viewportWidth:
          Math.max(document.body.clientWidth, window.innerWidth) || -1,
        viewportHeight:
          Math.max(document.body.clientHeight, window.innerHeight) || -1,
        elementWidth: t.clientWidth || -1,
        elementHeight: t.clientHeight || -1,
        iframeContext: I(),
        focus: y(),
      }),
      y = () =>
        ("undefined" === document.hidden || !0 !== document.hidden) &&
        (I() === E.CROSS_DOMAIN_IFRAME ||
          !window.document.hasFocus ||
          window.top.document.hasFocus()),
      I = () => {
        try {
          if (window.top === window) return E.ON_PAGE;
          let t = window,
            e = 0;
          for (; t.parent !== t && e < 1e3; ) {
            if (t.parent.document.domain !== t.document.domain)
              return E.CROSS_DOMAIN_IFRAME;
            t = t.parent;
          }
          E.SAME_DOMAIN_IFRAME;
        } catch (t) {
          return E.CROSS_DOMAIN_IFRAME;
        }
      },
      E = {
        ON_PAGE: "on page",
        SAME_DOMAIN_IFRAME: "same domain iframe",
        CROSS_DOMAIN_IFRAME: "cross domain iframe",
      };
    class T extends g {
      get unmeasureable() {
        return I() === E.CROSS_DOMAIN_IFRAME;
      }
      get techniqueName() {
        return "IntersectionObserverPolyFill";
      }
    }
    const O = { inViewThreshold: 0.5, timeInView: 2e3 },
      V = { inViewThreshold: 0.5, timeInView: 1e3 },
      R = (t = 0.5, e = 2e3) => ({ inViewThreshold: t, timeInView: e }),
      M = { autostart: !0, techniques: [g, T], criteria: O },
      C = (t = M.autostart, e = M.techniques, i = M.criteria) => {
        const n = { autostart: t, techniques: e, criteria: i },
          r = w(n);
        if (r.invalid) throw r.reasons;
        return n;
      };
    class q {
      constructor(t, e = {}) {
        (this._listeners = {
          start: [],
          stop: [],
          change: [],
          complete: [],
          unmeasureable: [],
        }),
          (this._element = t),
          (this._strategy = Object.assign({}, M, e)),
          (this._criteriaMet = !1);
        const i = w(this._strategy);
        if (i.invalid) throw i.reasons;
        (this._technique = this._selectTechnique(this._strategy.techniques)),
          this._technique && this._addSubscriptions(this._technique),
          this.unmeasureable
            ? setTimeout(() => this._publish(l, v(this._element)), 0)
            : this._strategy.autostart && this._technique.start();
      }
      start() {
        this._technique.start();
      }
      dispose() {
        this._technique && this._technique.dispose(),
          this.timer && this.timer.dispose();
      }
      onViewableStart(t) {
        return this._addCallback(t, h);
      }
      onViewableStop(t) {
        return this._addCallback(t, a);
      }
      onViewableChange(t) {
        return this._addCallback(t, c);
      }
      onViewableComplete(t) {
        return (
          this._addCallback(t, u),
          this.criteriaMet && this._techniqueChange(u, this._technique),
          this
        );
      }
      onUnmeasureable(t) {
        return (
          this._addCallback(t, l),
          this.unmeasureable && this._techniqueChange(l),
          this
        );
      }
      get unmeasureable() {
        return !this._technique || this._technique.unmeasureable;
      }
      _selectTechnique(t) {
        return t
          .filter(b)
          .map(this._instantiateTechnique.bind(this))
          .find((t) => !t.unmeasureable);
      }
      _instantiateTechnique(t) {
        return new t(this._element, this._strategy.criteria);
      }
      _addSubscriptions(t) {
        t &&
          (t.onInView(this._techniqueChange.bind(this, d, t)),
          t.onChangeView(this._techniqueChange.bind(this, c, t)),
          t.onOutView(this._techniqueChange.bind(this, f, t)));
      }
      _techniqueChange(t, e = {}) {
        let i;
        const n = this._appendEnvironment(e);
        switch (t) {
          case d:
            this._criteriaMet ||
              ((this.timer = new p(this._strategy.criteria.timeInView)),
              this.timer.elapsed(this._timerElapsed.bind(this, e)),
              this.timer.start(),
              (i = h));
            break;
          case c:
            i = t;
            break;
          case u:
            this._criteriaMet || ((this._criteriaMet = !0), (i = t));
            break;
          case f:
            this._criteriaMet ||
              (this.timer && (this.timer.stop(), delete this.timer), (i = a));
            break;
          case l:
            i = l;
        }
        i && this._publish(i, n);
      }
      _publish(t, e) {
        Array.isArray(this._listeners[t]) &&
          this._listeners[t].forEach((t) => t(e));
      }
      _timerElapsed(t) {
        this._techniqueChange(u, t);
      }
      _addCallback(t, e) {
        if (this._listeners[e] && "function" == typeof t)
          this._listeners[e].push(t);
        else if ("function" != typeof t) throw "Callback must be a function";
        return this;
      }
      _appendEnvironment(t) {
        return Object.assign(
          {},
          {
            percentViewable:
              void 0 === t.percentViewable ? -1 : t.percentViewable,
            technique: t.techniqueName || -1,
            viewable: void 0 === t.viewable ? -1 : t.viewable,
          },
          v(this._element)
        );
      }
    }
    i.d(e, "default", function () {
      return A;
    });
    class A {
      constructor() {
        this.executors = [];
      }
      measureElement(t, e) {
        const i = new q(t, e);
        return this.executors.push(i), i;
      }
      dispose() {
        this.executors.forEach((t) => t.dispose());
      }
    }
    (A.ViewabilityCriteria = o),
      (A.MeasurementExecutor = q),
      (A.MeasurementTechniques = r),
      (A.InViewTimer = p),
      (A.Strategies = s),
      (A.Events = n);
    var S = { percVal: 100, unmeasureable: !1, focus: !1 },
      k = new A(),
      x = document.getElementById("box");
    k.measureElement(x)
      .onViewableChange(function (t) {
        S.percVal = (100 * t.percentViewable).toFixed(2);
      })
      .onUnmeasureable(function () {
        S.unmeasureable = !0;
      });
    var N = !1,
      L = document.getElementById("video-1");
    function F() {
      if (isPauseDraw) {
        window.initAni();
      }
      isPauseDraw = false;

      L.play();
    }

    function Paa() {
      if (Object.keys(window).indexOf("drawReset") !== -1) {
        // window.ani = window.requestAnimationFrame(window.drawAni);
        isPauseDraw = true;
      }
      L.pause();
    }

    var counter = 0;

    L.addEventListener("ended", function () {
      if (counter > 5) {
        N = !0;
      }

      counter++;
    });
    setInterval(function () {
      S.unmeasureable
        ? F()
        : S.percVal >= 50 && !N && !Performics.settings.is_clicked
        ? F()
        : S.percVal < 50 &&
          !N &&
          !Performics.settings.is_clicked &&
          (() => {
            return Paa();
          })();
    }, 500);
  },
]);
