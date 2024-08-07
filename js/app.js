(() => {
  "use strict";
  (() => {
    class e {
      constructor(e) {
        let t = {
          logging: !0,
          init: !0,
          attributeOpenButton: "data-popup",
          attributeCloseButton: "data-close",
          fixElementSelector: "[data-lp]",
          youtubeAttribute: "data-youtube",
          youtubePlaceAttribute: "data-youtube-place",
          setAutoplayYoutube: !0,
          classes: {
            popup: "popup",
            popupWrapper: "popup__wrapper",
            popupContent: "popup__content",
            popupActive: "popup_show",
            bodyActive: "popup-show",
          },
          focusCatch: !1,
          closeEsc: !0,
          bodyLock: !0,
          bodyLockDelay: 500,
          on: {
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {
              let e = document.querySelectorAll("._video-yt-link"),
                t = document.querySelectorAll("._video-yt-btn");
              const s = document.querySelector("#youtube-slide");
              s &&
                (t.forEach((e) => {
                  e.style.display = "block";
                }),
                e.forEach((e) => {
                  e.style.display = "block";
                }),
                s.remove());
            },
            afterClose: function () {},
          },
        };
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = {
            ...t,
            ...e,
            classes: { ...t.classes, ...e?.classes },
            hashSettings: { ...t.hashSettings, ...e?.hashSettings },
            on: { ...t.on, ...e?.on },
          }),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton,
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void 0
              );
            const s = e.target.closest(
              `[${this.options.attributeCloseButton}]`,
            );
            return (
              console.log(),
              s ||
              (!e.target.closest(".submitted__slider-navigation-next") &&
                !e.target.closest(".submitted__slider-navigation-prev") &&
                !e.target.closest(".popup-reels__slide") &&
                !e.target.closest(".popup-video__slide") &&
                this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0
            );
          }.bind(this),
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this),
          ),
          document.querySelector("form[data-ajax],form[data-dev]") &&
            document.addEventListener(
              "formSent",
              function (e) {
                const t = e.detail.form.dataset.popupMessage;
                t && this.open(t);
              }.bind(this),
            ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this),
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this),
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector,
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(this.options.youtubeAttribute)}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${s}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ) &&
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive,
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
            );
        }
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            n &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute,
            ) &&
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ) &&
              (this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive,
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              o(),
              (this.isOpen = !1)),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this));
      }
    }
    let t = (e, t = 500, s = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !s),
              !s && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !s && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      s = (e, t = 500, s = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            s && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t);
        }
      },
      i = (e, i = 500) => (e.hidden ? s(e, i) : t(e, i)),
      n = !0,
      o = (e = 1) => {
        document.documentElement.classList.contains("lock") ? l(e) : r(e);
      },
      l = (e = 1) => {
        let t = document.querySelector("body");
        if (n) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (n = !1),
            setTimeout(function () {
              n = !0;
            }, e);
        }
      },
      r = (e = 1) => {
        let t = document.querySelector("body");
        if (n) {
          let s = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector("body").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (n = !1),
            setTimeout(function () {
              n = !0;
            }, e);
        }
      };
    const a = (e, s) => {
      const i = document.querySelectorAll(s);
      0 !== i.length &&
        i.forEach((s) => {
          s.parentElement.classList.contains("_showmore-active") &&
            (t(s, 500, e),
            s.parentElement.classList.remove("_showmore-active"));
        });
    };
    function c() {
      const e = document.querySelectorAll("[data-showmore]");
      let i;
      function n(e, i) {
        e.forEach((e) => {
          !(function (e, i = !1) {
            e = i ? e.item : e;
            const n = e.querySelector("[data-showmore-content]"),
              r = e.querySelector("[data-showmore-button]"),
              a = o(e, n);
            (i.matches || !i) && a < l(n)
              ? (t(n, 0, a), (r.hidden = !1))
              : (s(n, 0, a), (r.hidden = !0));
          })(e, i);
        });
      }
      function o(e, t) {
        let s = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            i = t.children;
          for (let t = 1; t < i.length; t++) {
            if (((s += i[t - 1].offsetHeight), t === e)) break;
          }
        } else {
          s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        }
        return s;
      }
      function l(e) {
        let t = e.offsetHeight;
        e.style.removeProperty("height");
        let s = e.offsetHeight;
        return (e.style.height = `${t}px`), s;
      }
      function r(e) {
        const r = e.target,
          c = e.type;
        if ("click" === c) {
          if (r.closest("[data-showmore-button]")) {
            const i = r
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              n = i.querySelector("[data-showmore-content]");
            l(n);
            const c = i.dataset.showmoreButton
                ? i.dataset.showmoreButton
                : "500",
              d = o(i, n);
            n.classList.contains("_slide") ||
              (e.target.closest("._showmore-active") ||
                a(d, ".stages-work__content"),
              i.classList.contains("_showmore-active")
                ? t(n, c, d)
                : s(n, c, d),
              i.classList.toggle("_showmore-active"));
          }
        } else "resize" === c && i.length && n(i);
        document.querySelector(".ya-map__tab") &&
          "click" === c &&
          (e.target.matches(".ya-map__tab") || e.stopImmediatePropagation());
      }
      e.length &&
        ((i = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.showmoreMedia;
        })),
        i.length && n(i),
        document.querySelectorAll("[data-showmore-button]").forEach((e) => {
          e.addEventListener("click", r, !0);
        }));
    }
    var d, u;
    function p(e) {
      return "object" == typeof e && "function" == typeof e.to;
    }
    function m(e) {
      e.parentElement.removeChild(e);
    }
    function h(e) {
      return null != e;
    }
    function f(e) {
      e.preventDefault();
    }
    function v(e) {
      return "number" == typeof e && !isNaN(e) && isFinite(e);
    }
    function g(e, t, s) {
      s > 0 &&
        (_(e, t),
        setTimeout(function () {
          w(e, t);
        }, s));
    }
    function y(e) {
      return Math.max(Math.min(e, 100), 0);
    }
    function S(e) {
      return Array.isArray(e) ? e : [e];
    }
    function b(e) {
      var t = (e = String(e)).split(".");
      return t.length > 1 ? t[1].length : 0;
    }
    function _(e, t) {
      e.classList && !/\s/.test(t)
        ? e.classList.add(t)
        : (e.className += " " + t);
    }
    function w(e, t) {
      e.classList && !/\s/.test(t)
        ? e.classList.remove(t)
        : (e.className = e.className.replace(
            new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
            " ",
          ));
    }
    function k(e) {
      var t = void 0 !== window.pageXOffset,
        s = "CSS1Compat" === (e.compatMode || "");
      return {
        x: t
          ? window.pageXOffset
          : s
            ? e.documentElement.scrollLeft
            : e.body.scrollLeft,
        y: t
          ? window.pageYOffset
          : s
            ? e.documentElement.scrollTop
            : e.body.scrollTop,
      };
    }
    function E(e, t) {
      return 100 / (t - e);
    }
    function x(e, t, s) {
      return (100 * t) / (e[s + 1] - e[s]);
    }
    function V(e, t) {
      for (var s = 1; e >= t[s]; ) s += 1;
      return s;
    }
    function C(e, t, s) {
      if (s >= e.slice(-1)[0]) return 100;
      var i = V(s, e),
        n = e[i - 1],
        o = e[i],
        l = t[i - 1],
        r = t[i];
      return (
        l +
        (function (e, t) {
          return x(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0], 0);
        })([n, o], s) /
          E(l, r)
      );
    }
    function P(e, t, s, i) {
      if (100 === i) return i;
      var n = V(i, e),
        o = e[n - 1],
        l = e[n];
      return s
        ? i - o > (l - o) / 2
          ? l
          : o
        : t[n - 1]
          ? e[n - 1] +
            (function (e, t) {
              return Math.round(e / t) * t;
            })(i - e[n - 1], t[n - 1])
          : i;
    }
    !(function (e) {
      (e.Range = "range"),
        (e.Steps = "steps"),
        (e.Positions = "positions"),
        (e.Count = "count"),
        (e.Values = "values");
    })(d || (d = {})),
      (function (e) {
        (e[(e.None = -1)] = "None"),
          (e[(e.NoValue = 0)] = "NoValue"),
          (e[(e.LargeValue = 1)] = "LargeValue"),
          (e[(e.SmallValue = 2)] = "SmallValue");
      })(u || (u = {}));
    var L = (function () {
        function e(e, t, s) {
          var i;
          (this.xPct = []),
            (this.xVal = []),
            (this.xSteps = []),
            (this.xNumSteps = []),
            (this.xHighestCompleteStep = []),
            (this.xSteps = [s || !1]),
            (this.xNumSteps = [!1]),
            (this.snap = t);
          var n = [];
          for (
            Object.keys(e).forEach(function (t) {
              n.push([S(e[t]), t]);
            }),
              n.sort(function (e, t) {
                return e[0][0] - t[0][0];
              }),
              i = 0;
            i < n.length;
            i++
          )
            this.handleEntryPoint(n[i][1], n[i][0]);
          for (
            this.xNumSteps = this.xSteps.slice(0), i = 0;
            i < this.xNumSteps.length;
            i++
          )
            this.handleStepPoint(i, this.xNumSteps[i]);
        }
        return (
          (e.prototype.getDistance = function (e) {
            for (var t = [], s = 0; s < this.xNumSteps.length - 1; s++)
              t[s] = x(this.xVal, e, s);
            return t;
          }),
          (e.prototype.getAbsoluteDistance = function (e, t, s) {
            var i,
              n = 0;
            if (e < this.xPct[this.xPct.length - 1])
              for (; e > this.xPct[n + 1]; ) n++;
            else
              e === this.xPct[this.xPct.length - 1] &&
                (n = this.xPct.length - 2);
            s || e !== this.xPct[n + 1] || n++, null === t && (t = []);
            var o = 1,
              l = t[n],
              r = 0,
              a = 0,
              c = 0,
              d = 0;
            for (
              i = s
                ? (e - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n])
                : (this.xPct[n + 1] - e) / (this.xPct[n + 1] - this.xPct[n]);
              l > 0;

            )
              (r = this.xPct[n + 1 + d] - this.xPct[n + d]),
                t[n + d] * o + 100 - 100 * i > 100
                  ? ((a = r * i), (o = (l - 100 * i) / t[n + d]), (i = 1))
                  : ((a = ((t[n + d] * r) / 100) * o), (o = 0)),
                s
                  ? ((c -= a), this.xPct.length + d >= 1 && d--)
                  : ((c += a), this.xPct.length - d >= 1 && d++),
                (l = t[n + d] * o);
            return e + c;
          }),
          (e.prototype.toStepping = function (e) {
            return (e = C(this.xVal, this.xPct, e));
          }),
          (e.prototype.fromStepping = function (e) {
            return (function (e, t, s) {
              if (s >= 100) return e.slice(-1)[0];
              var i = V(s, t),
                n = e[i - 1],
                o = e[i],
                l = t[i - 1];
              return (function (e, t) {
                return (t * (e[1] - e[0])) / 100 + e[0];
              })([n, o], (s - l) * E(l, t[i]));
            })(this.xVal, this.xPct, e);
          }),
          (e.prototype.getStep = function (e) {
            return (e = P(this.xPct, this.xSteps, this.snap, e));
          }),
          (e.prototype.getDefaultStep = function (e, t, s) {
            var i = V(e, this.xPct);
            return (
              (100 === e || (t && e === this.xPct[i - 1])) &&
                (i = Math.max(i - 1, 1)),
              (this.xVal[i] - this.xVal[i - 1]) / s
            );
          }),
          (e.prototype.getNearbySteps = function (e) {
            var t = V(e, this.xPct);
            return {
              stepBefore: {
                startValue: this.xVal[t - 2],
                step: this.xNumSteps[t - 2],
                highestStep: this.xHighestCompleteStep[t - 2],
              },
              thisStep: {
                startValue: this.xVal[t - 1],
                step: this.xNumSteps[t - 1],
                highestStep: this.xHighestCompleteStep[t - 1],
              },
              stepAfter: {
                startValue: this.xVal[t],
                step: this.xNumSteps[t],
                highestStep: this.xHighestCompleteStep[t],
              },
            };
          }),
          (e.prototype.countStepDecimals = function () {
            var e = this.xNumSteps.map(b);
            return Math.max.apply(null, e);
          }),
          (e.prototype.hasNoSize = function () {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
          }),
          (e.prototype.convert = function (e) {
            return this.getStep(this.toStepping(e));
          }),
          (e.prototype.handleEntryPoint = function (e, t) {
            var s;
            if (
              !v((s = "min" === e ? 0 : "max" === e ? 100 : parseFloat(e))) ||
              !v(t[0])
            )
              throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(s), this.xVal.push(t[0]);
            var i = Number(t[1]);
            s
              ? this.xSteps.push(!isNaN(i) && i)
              : isNaN(i) || (this.xSteps[0] = i),
              this.xHighestCompleteStep.push(0);
          }),
          (e.prototype.handleStepPoint = function (e, t) {
            if (t)
              if (this.xVal[e] !== this.xVal[e + 1]) {
                this.xSteps[e] =
                  x([this.xVal[e], this.xVal[e + 1]], t, 0) /
                  E(this.xPct[e], this.xPct[e + 1]);
                var s = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e],
                  i = Math.ceil(Number(s.toFixed(3)) - 1),
                  n = this.xVal[e] + this.xNumSteps[e] * i;
                this.xHighestCompleteStep[e] = n;
              } else
                this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
          }),
          e
        );
      })(),
      q = {
        to: function (e) {
          return void 0 === e ? "" : e.toFixed(2);
        },
        from: Number,
      },
      A = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub",
      },
      O = { tooltips: ".__tooltips", aria: ".__aria" };
    function B(e, t) {
      if (!v(t)) throw new Error("noUiSlider: 'step' is not numeric.");
      e.singleStep = t;
    }
    function D(e, t) {
      if (!v(t))
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      e.keyboardPageMultiplier = t;
    }
    function T(e, t) {
      if (!v(t))
        throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
      e.keyboardMultiplier = t;
    }
    function N(e, t) {
      if (!v(t))
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      e.keyboardDefaultStep = t;
    }
    function H(e, t) {
      if ("object" != typeof t || Array.isArray(t))
        throw new Error("noUiSlider: 'range' is not an object.");
      if (void 0 === t.min || void 0 === t.max)
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      e.spectrum = new L(t, e.snap || !1, e.singleStep);
    }
    function z(e, t) {
      if (((t = S(t)), !Array.isArray(t) || !t.length))
        throw new Error("noUiSlider: 'start' option is incorrect.");
      (e.handles = t.length), (e.start = t);
    }
    function M(e, t) {
      if ("boolean" != typeof t)
        throw new Error("noUiSlider: 'snap' option must be a boolean.");
      e.snap = t;
    }
    function R(e, t) {
      if ("boolean" != typeof t)
        throw new Error("noUiSlider: 'animate' option must be a boolean.");
      e.animate = t;
    }
    function j(e, t) {
      if ("number" != typeof t)
        throw new Error(
          "noUiSlider: 'animationDuration' option must be a number.",
        );
      e.animationDuration = t;
    }
    function U(e, t) {
      var s,
        i = [!1];
      if (
        ("lower" === t ? (t = [!0, !1]) : "upper" === t && (t = [!1, !0]),
        !0 === t || !1 === t)
      ) {
        for (s = 1; s < e.handles; s++) i.push(t);
        i.push(!1);
      } else {
        if (!Array.isArray(t) || !t.length || t.length !== e.handles + 1)
          throw new Error(
            "noUiSlider: 'connect' option doesn't match handle count.",
          );
        i = t;
      }
      e.connect = i;
    }
    function I(e, t) {
      switch (t) {
        case "horizontal":
          e.ort = 0;
          break;
        case "vertical":
          e.ort = 1;
          break;
        default:
          throw new Error("noUiSlider: 'orientation' option is invalid.");
      }
    }
    function F(e, t) {
      if (!v(t))
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      0 !== t && (e.margin = e.spectrum.getDistance(t));
    }
    function W(e, t) {
      if (!v(t)) throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (((e.limit = e.spectrum.getDistance(t)), !e.limit || e.handles < 2))
        throw new Error(
          "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.",
        );
    }
    function X(e, t) {
      var s;
      if (!v(t) && !Array.isArray(t))
        throw new Error(
          "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
        );
      if (Array.isArray(t) && 2 !== t.length && !v(t[0]) && !v(t[1]))
        throw new Error(
          "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
        );
      if (0 !== t) {
        for (
          Array.isArray(t) || (t = [t, t]),
            e.padding = [
              e.spectrum.getDistance(t[0]),
              e.spectrum.getDistance(t[1]),
            ],
            s = 0;
          s < e.spectrum.xNumSteps.length - 1;
          s++
        )
          if (e.padding[0][s] < 0 || e.padding[1][s] < 0)
            throw new Error(
              "noUiSlider: 'padding' option must be a positive number(s).",
            );
        var i = t[0] + t[1],
          n = e.spectrum.xVal[0];
        if (i / (e.spectrum.xVal[e.spectrum.xVal.length - 1] - n) > 1)
          throw new Error(
            "noUiSlider: 'padding' option must not exceed 100% of the range.",
          );
      }
    }
    function Y(e, t) {
      switch (t) {
        case "ltr":
          e.dir = 0;
          break;
        case "rtl":
          e.dir = 1;
          break;
        default:
          throw new Error("noUiSlider: 'direction' option was not recognized.");
      }
    }
    function Q(e, t) {
      if ("string" != typeof t)
        throw new Error(
          "noUiSlider: 'behaviour' must be a string containing options.",
        );
      var s = t.indexOf("tap") >= 0,
        i = t.indexOf("drag") >= 0,
        n = t.indexOf("fixed") >= 0,
        o = t.indexOf("snap") >= 0,
        l = t.indexOf("hover") >= 0,
        r = t.indexOf("unconstrained") >= 0,
        a = t.indexOf("drag-all") >= 0,
        c = t.indexOf("smooth-steps") >= 0;
      if (n) {
        if (2 !== e.handles)
          throw new Error(
            "noUiSlider: 'fixed' behaviour must be used with 2 handles",
          );
        F(e, e.start[1] - e.start[0]);
      }
      if (r && (e.margin || e.limit))
        throw new Error(
          "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit",
        );
      e.events = {
        tap: s || o,
        drag: i,
        dragAll: a,
        smoothSteps: c,
        fixed: n,
        snap: o,
        hover: l,
        unconstrained: r,
      };
    }
    function Z(e, t) {
      if (!1 !== t)
        if (!0 === t || p(t)) {
          e.tooltips = [];
          for (var s = 0; s < e.handles; s++) e.tooltips.push(t);
        } else {
          if ((t = S(t)).length !== e.handles)
            throw new Error(
              "noUiSlider: must pass a formatter for all handles.",
            );
          t.forEach(function (e) {
            if ("boolean" != typeof e && !p(e))
              throw new Error(
                "noUiSlider: 'tooltips' must be passed a formatter or 'false'.",
              );
          }),
            (e.tooltips = t);
        }
    }
    function G(e, t) {
      if (t.length !== e.handles)
        throw new Error("noUiSlider: must pass a attributes for all handles.");
      e.handleAttributes = t;
    }
    function J(e, t) {
      if (!p(t))
        throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
      e.ariaFormat = t;
    }
    function K(e, t) {
      if (
        !(function (e) {
          return p(e) && "function" == typeof e.from;
        })(t)
      )
        throw new Error(
          "noUiSlider: 'format' requires 'to' and 'from' methods.",
        );
      e.format = t;
    }
    function ee(e, t) {
      if ("boolean" != typeof t)
        throw new Error(
          "noUiSlider: 'keyboardSupport' option must be a boolean.",
        );
      e.keyboardSupport = t;
    }
    function te(e, t) {
      e.documentElement = t;
    }
    function se(e, t) {
      if ("string" != typeof t && !1 !== t)
        throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
      e.cssPrefix = t;
    }
    function ie(e, t) {
      if ("object" != typeof t)
        throw new Error("noUiSlider: 'cssClasses' must be an object.");
      "string" == typeof e.cssPrefix
        ? ((e.cssClasses = {}),
          Object.keys(t).forEach(function (s) {
            e.cssClasses[s] = e.cssPrefix + t[s];
          }))
        : (e.cssClasses = t);
    }
    function ne(e) {
      var t = {
          margin: null,
          limit: null,
          padding: null,
          animate: !0,
          animationDuration: 300,
          ariaFormat: q,
          format: q,
        },
        s = {
          step: { r: !1, t: B },
          keyboardPageMultiplier: { r: !1, t: D },
          keyboardMultiplier: { r: !1, t: T },
          keyboardDefaultStep: { r: !1, t: N },
          start: { r: !0, t: z },
          connect: { r: !0, t: U },
          direction: { r: !0, t: Y },
          snap: { r: !1, t: M },
          animate: { r: !1, t: R },
          animationDuration: { r: !1, t: j },
          range: { r: !0, t: H },
          orientation: { r: !1, t: I },
          margin: { r: !1, t: F },
          limit: { r: !1, t: W },
          padding: { r: !1, t: X },
          behaviour: { r: !0, t: Q },
          ariaFormat: { r: !1, t: J },
          format: { r: !1, t: K },
          tooltips: { r: !1, t: Z },
          keyboardSupport: { r: !0, t: ee },
          documentElement: { r: !1, t: te },
          cssPrefix: { r: !0, t: se },
          cssClasses: { r: !0, t: ie },
          handleAttributes: { r: !1, t: G },
        },
        i = {
          connect: !1,
          direction: "ltr",
          behaviour: "tap",
          orientation: "horizontal",
          keyboardSupport: !0,
          cssPrefix: "noUi-",
          cssClasses: A,
          keyboardPageMultiplier: 5,
          keyboardMultiplier: 1,
          keyboardDefaultStep: 10,
        };
      e.format && !e.ariaFormat && (e.ariaFormat = e.format),
        Object.keys(s).forEach(function (n) {
          if (h(e[n]) || void 0 !== i[n]) s[n].t(t, h(e[n]) ? e[n] : i[n]);
          else if (s[n].r)
            throw new Error("noUiSlider: '" + n + "' is required.");
        }),
        (t.pips = e.pips);
      var n = document.createElement("div"),
        o = void 0 !== n.style.msTransform,
        l = void 0 !== n.style.transform;
      t.transformRule = l ? "transform" : o ? "msTransform" : "webkitTransform";
      return (
        (t.style = [
          ["left", "top"],
          ["right", "bottom"],
        ][t.dir][t.ort]),
        t
      );
    }
    function oe(e, t, s) {
      var i,
        n,
        o,
        l,
        r,
        a,
        c,
        p = window.navigator.pointerEnabled
          ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
          : window.navigator.msPointerEnabled
            ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp",
              }
            : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend",
              },
        v =
          window.CSS &&
          CSS.supports &&
          CSS.supports("touch-action", "none") &&
          (function () {
            var e = !1;
            try {
              var t = Object.defineProperty({}, "passive", {
                get: function () {
                  e = !0;
                },
              });
              window.addEventListener("test", null, t);
            } catch (e) {}
            return e;
          })(),
        b = e,
        E = t.spectrum,
        x = [],
        V = [],
        C = [],
        P = 0,
        L = {},
        q = e.ownerDocument,
        A = t.documentElement || q.documentElement,
        B = q.body,
        D = "rtl" === q.dir || 1 === t.ort ? 0 : 100;
      function $(e, t) {
        var s = q.createElement("div");
        return t && _(s, t), e.appendChild(s), s;
      }
      function T(e, s) {
        var i = $(e, t.cssClasses.origin),
          n = $(i, t.cssClasses.handle);
        if (
          ($(n, t.cssClasses.touchArea),
          n.setAttribute("data-handle", String(s)),
          t.keyboardSupport &&
            (n.setAttribute("tabindex", "0"),
            n.addEventListener("keydown", function (e) {
              return (function (e, s) {
                if (z() || M(s)) return !1;
                var i = ["Left", "Right"],
                  n = ["Down", "Up"],
                  o = ["PageDown", "PageUp"],
                  l = ["Home", "End"];
                t.dir && !t.ort
                  ? i.reverse()
                  : t.ort && !t.dir && (n.reverse(), o.reverse());
                var r,
                  a = e.key.replace("Arrow", ""),
                  c = a === o[0],
                  d = a === o[1],
                  u = a === n[0] || a === i[0] || c,
                  p = a === n[1] || a === i[1] || d,
                  m = a === l[0],
                  h = a === l[1];
                if (!(u || p || m || h)) return !0;
                if ((e.preventDefault(), p || u)) {
                  var f = u ? 0 : 1,
                    v = ge(s)[f];
                  if (null === v) return !1;
                  !1 === v &&
                    (v = E.getDefaultStep(V[s], u, t.keyboardDefaultStep)),
                    (v *=
                      d || c ? t.keyboardPageMultiplier : t.keyboardMultiplier),
                    (v = Math.max(v, 1e-7)),
                    (v *= u ? -1 : 1),
                    (r = x[s] + v);
                } else
                  r = h
                    ? t.spectrum.xVal[t.spectrum.xVal.length - 1]
                    : t.spectrum.xVal[0];
                return (
                  pe(s, E.toStepping(r), !0, !0),
                  le("slide", s),
                  le("update", s),
                  le("change", s),
                  le("set", s),
                  !1
                );
              })(e, s);
            })),
          void 0 !== t.handleAttributes)
        ) {
          var o = t.handleAttributes[s];
          Object.keys(o).forEach(function (e) {
            n.setAttribute(e, o[e]);
          });
        }
        return (
          n.setAttribute("role", "slider"),
          n.setAttribute("aria-orientation", t.ort ? "vertical" : "horizontal"),
          0 === s
            ? _(n, t.cssClasses.handleLower)
            : s === t.handles - 1 && _(n, t.cssClasses.handleUpper),
          (i.handle = n),
          i
        );
      }
      function N(e, s) {
        return !!s && $(e, t.cssClasses.connect);
      }
      function H(e, s) {
        return (
          !(!t.tooltips || !t.tooltips[s]) &&
          $(e.firstChild, t.cssClasses.tooltip)
        );
      }
      function z() {
        return b.hasAttribute("disabled");
      }
      function M(e) {
        return n[e].hasAttribute("disabled");
      }
      function R() {
        r &&
          (oe("update" + O.tooltips),
          r.forEach(function (e) {
            e && m(e);
          }),
          (r = null));
      }
      function j() {
        R(),
          (r = n.map(H)),
          ie("update" + O.tooltips, function (e, s, i) {
            if (r && t.tooltips && !1 !== r[s]) {
              var n = e[s];
              !0 !== t.tooltips[s] && (n = t.tooltips[s].to(i[s])),
                (r[s].innerHTML = n);
            }
          });
      }
      function U(e, t) {
        return e.map(function (e) {
          return E.fromStepping(t ? E.getStep(e) : e);
        });
      }
      function I(e) {
        var t,
          s = (function (e) {
            if (e.mode === d.Range || e.mode === d.Steps) return E.xVal;
            if (e.mode === d.Count) {
              if (e.values < 2)
                throw new Error(
                  "noUiSlider: 'values' (>= 2) required for mode 'count'.",
                );
              for (var t = e.values - 1, s = 100 / t, i = []; t--; )
                i[t] = t * s;
              return i.push(100), U(i, e.stepped);
            }
            return e.mode === d.Positions
              ? U(e.values, e.stepped)
              : e.mode === d.Values
                ? e.stepped
                  ? e.values.map(function (e) {
                      return E.fromStepping(E.getStep(E.toStepping(e)));
                    })
                  : e.values
                : [];
          })(e),
          i = {},
          n = E.xVal[0],
          o = E.xVal[E.xVal.length - 1],
          l = !1,
          r = !1,
          a = 0;
        return (
          (t = s.slice().sort(function (e, t) {
            return e - t;
          })),
          (s = t.filter(function (e) {
            return !this[e] && (this[e] = !0);
          }, {}))[0] !== n && (s.unshift(n), (l = !0)),
          s[s.length - 1] !== o && (s.push(o), (r = !0)),
          s.forEach(function (t, n) {
            var o,
              c,
              p,
              m,
              h,
              f,
              v,
              g,
              y,
              S,
              b = t,
              _ = s[n + 1],
              w = e.mode === d.Steps;
            for (
              w && (o = E.xNumSteps[n]),
                o || (o = _ - b),
                void 0 === _ && (_ = b),
                o = Math.max(o, 1e-7),
                c = b;
              c <= _;
              c = Number((c + o).toFixed(7))
            ) {
              for (
                g = (h = (m = E.toStepping(c)) - a) / (e.density || 1),
                  S = h / (y = Math.round(g)),
                  p = 1;
                p <= y;
                p += 1
              )
                i[(f = a + p * S).toFixed(5)] = [E.fromStepping(f), 0];
              (v =
                s.indexOf(c) > -1
                  ? u.LargeValue
                  : w
                    ? u.SmallValue
                    : u.NoValue),
                !n && l && c !== _ && (v = 0),
                (c === _ && r) || (i[m.toFixed(5)] = [c, v]),
                (a = m);
            }
          }),
          i
        );
      }
      function F(e, s, i) {
        var n,
          o,
          l = q.createElement("div"),
          r =
            (((n = {})[u.None] = ""),
            (n[u.NoValue] = t.cssClasses.valueNormal),
            (n[u.LargeValue] = t.cssClasses.valueLarge),
            (n[u.SmallValue] = t.cssClasses.valueSub),
            n),
          a =
            (((o = {})[u.None] = ""),
            (o[u.NoValue] = t.cssClasses.markerNormal),
            (o[u.LargeValue] = t.cssClasses.markerLarge),
            (o[u.SmallValue] = t.cssClasses.markerSub),
            o),
          c = [t.cssClasses.valueHorizontal, t.cssClasses.valueVertical],
          d = [t.cssClasses.markerHorizontal, t.cssClasses.markerVertical];
        function p(e, s) {
          var i = s === t.cssClasses.value,
            n = i ? r : a;
          return s + " " + (i ? c : d)[t.ort] + " " + n[e];
        }
        return (
          _(l, t.cssClasses.pips),
          _(
            l,
            0 === t.ort
              ? t.cssClasses.pipsHorizontal
              : t.cssClasses.pipsVertical,
          ),
          Object.keys(e).forEach(function (n) {
            !(function (e, n, o) {
              if ((o = s ? s(n, o) : o) !== u.None) {
                var r = $(l, !1);
                (r.className = p(o, t.cssClasses.marker)),
                  (r.style[t.style] = e + "%"),
                  o > u.NoValue &&
                    (((r = $(l, !1)).className = p(o, t.cssClasses.value)),
                    r.setAttribute("data-value", String(n)),
                    (r.style[t.style] = e + "%"),
                    (r.innerHTML = String(i.to(n))));
              }
            })(n, e[n][0], e[n][1]);
          }),
          l
        );
      }
      function W() {
        l && (m(l), (l = null));
      }
      function X(e) {
        W();
        var t = I(e),
          s = e.filter,
          i = e.format || {
            to: function (e) {
              return String(Math.round(e));
            },
          };
        return (l = b.appendChild(F(t, s, i)));
      }
      function Y() {
        var e = i.getBoundingClientRect(),
          s = "offset" + ["Width", "Height"][t.ort];
        return 0 === t.ort ? e.width || i[s] : e.height || i[s];
      }
      function Q(e, s, i, n) {
        var o = function (o) {
            var l,
              r,
              a = (function (e, t, s) {
                var i = 0 === e.type.indexOf("touch"),
                  n = 0 === e.type.indexOf("mouse"),
                  o = 0 === e.type.indexOf("pointer"),
                  l = 0,
                  r = 0;
                0 === e.type.indexOf("MSPointer") && (o = !0);
                if ("mousedown" === e.type && !e.buttons && !e.touches)
                  return !1;
                if (i) {
                  var a = function (t) {
                    var i = t.target;
                    return (
                      i === s ||
                      s.contains(i) ||
                      (e.composed && e.composedPath().shift() === s)
                    );
                  };
                  if ("touchstart" === e.type) {
                    var c = Array.prototype.filter.call(e.touches, a);
                    if (c.length > 1) return !1;
                    (l = c[0].pageX), (r = c[0].pageY);
                  } else {
                    var d = Array.prototype.find.call(e.changedTouches, a);
                    if (!d) return !1;
                    (l = d.pageX), (r = d.pageY);
                  }
                }
                (t = t || k(q)),
                  (n || o) && ((l = e.clientX + t.x), (r = e.clientY + t.y));
                return (
                  (e.pageOffset = t),
                  (e.points = [l, r]),
                  (e.cursor = n || o),
                  e
                );
              })(o, n.pageOffset, n.target || s);
            return (
              !!a &&
              !(z() && !n.doNotReject) &&
              ((l = b),
              (r = t.cssClasses.tap),
              !(
                (l.classList
                  ? l.classList.contains(r)
                  : new RegExp("\\b" + r + "\\b").test(l.className)) &&
                !n.doNotReject
              ) &&
                !(e === p.start && void 0 !== a.buttons && a.buttons > 1) &&
                (!n.hover || !a.buttons) &&
                (v || a.preventDefault(),
                (a.calcPoint = a.points[t.ort]),
                void i(a, n)))
            );
          },
          l = [];
        return (
          e.split(" ").forEach(function (e) {
            s.addEventListener(e, o, !!v && { passive: !0 }), l.push([e, o]);
          }),
          l
        );
      }
      function Z(e) {
        var s,
          n,
          o,
          l,
          r,
          a,
          c =
            (100 *
              (e -
                ((s = i),
                (n = t.ort),
                (o = s.getBoundingClientRect()),
                (l = s.ownerDocument),
                (r = l.documentElement),
                (a = k(l)),
                /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) &&
                  (a.x = 0),
                n ? o.top + a.y - r.clientTop : o.left + a.x - r.clientLeft))) /
            Y();
        return (c = y(c)), t.dir ? 100 - c : c;
      }
      function G(e, t) {
        "mouseout" === e.type &&
          "HTML" === e.target.nodeName &&
          null === e.relatedTarget &&
          K(e, t);
      }
      function J(e, s) {
        if (
          -1 === navigator.appVersion.indexOf("MSIE 9") &&
          0 === e.buttons &&
          0 !== s.buttonsProperty
        )
          return K(e, s);
        var i = (t.dir ? -1 : 1) * (e.calcPoint - s.startCalcPoint);
        ce(
          i > 0,
          (100 * i) / s.baseSize,
          s.locations,
          s.handleNumbers,
          s.connect,
        );
      }
      function K(e, s) {
        s.handle && (w(s.handle, t.cssClasses.active), (P -= 1)),
          s.listeners.forEach(function (e) {
            A.removeEventListener(e[0], e[1]);
          }),
          0 === P &&
            (w(b, t.cssClasses.drag),
            ue(),
            e.cursor &&
              ((B.style.cursor = ""), B.removeEventListener("selectstart", f))),
          t.events.smoothSteps &&
            (s.handleNumbers.forEach(function (e) {
              pe(e, V[e], !0, !0, !1, !1);
            }),
            s.handleNumbers.forEach(function (e) {
              le("update", e);
            })),
          s.handleNumbers.forEach(function (e) {
            le("change", e), le("set", e), le("end", e);
          });
      }
      function ee(e, s) {
        if (!s.handleNumbers.some(M)) {
          var i;
          if (1 === s.handleNumbers.length)
            (i = n[s.handleNumbers[0]].children[0]),
              (P += 1),
              _(i, t.cssClasses.active);
          e.stopPropagation();
          var o = [],
            l = Q(p.move, A, J, {
              target: e.target,
              handle: i,
              connect: s.connect,
              listeners: o,
              startCalcPoint: e.calcPoint,
              baseSize: Y(),
              pageOffset: e.pageOffset,
              handleNumbers: s.handleNumbers,
              buttonsProperty: e.buttons,
              locations: V.slice(),
            }),
            r = Q(p.end, A, K, {
              target: e.target,
              handle: i,
              listeners: o,
              doNotReject: !0,
              handleNumbers: s.handleNumbers,
            }),
            a = Q("mouseout", A, G, {
              target: e.target,
              handle: i,
              listeners: o,
              doNotReject: !0,
              handleNumbers: s.handleNumbers,
            });
          o.push.apply(o, l.concat(r, a)),
            e.cursor &&
              ((B.style.cursor = getComputedStyle(e.target).cursor),
              n.length > 1 && _(b, t.cssClasses.drag),
              B.addEventListener("selectstart", f, !1)),
            s.handleNumbers.forEach(function (e) {
              le("start", e);
            });
        }
      }
      function te(e) {
        e.stopPropagation();
        var s = Z(e.calcPoint),
          i = (function (e) {
            var t = 100,
              s = !1;
            return (
              n.forEach(function (i, n) {
                if (!M(n)) {
                  var o = V[n],
                    l = Math.abs(o - e);
                  (l < t || (l <= t && e > o) || (100 === l && 100 === t)) &&
                    ((s = n), (t = l));
                }
              }),
              s
            );
          })(s);
        !1 !== i &&
          (t.events.snap || g(b, t.cssClasses.tap, t.animationDuration),
          pe(i, s, !0, !0),
          ue(),
          le("slide", i, !0),
          le("update", i, !0),
          t.events.snap
            ? ee(e, { handleNumbers: [i] })
            : (le("change", i, !0), le("set", i, !0)));
      }
      function se(e) {
        var t = Z(e.calcPoint),
          s = E.getStep(t),
          i = E.fromStepping(s);
        Object.keys(L).forEach(function (e) {
          "hover" === e.split(".")[0] &&
            L[e].forEach(function (e) {
              e.call(ye, i);
            });
        });
      }
      function ie(e, t) {
        (L[e] = L[e] || []),
          L[e].push(t),
          "update" === e.split(".")[0] &&
            n.forEach(function (e, t) {
              le("update", t);
            });
      }
      function oe(e) {
        var t = e && e.split(".")[0],
          s = t ? e.substring(t.length) : e;
        Object.keys(L).forEach(function (e) {
          var i = e.split(".")[0],
            n = e.substring(i.length);
          (t && t !== i) ||
            (s && s !== n) ||
            ((function (e) {
              return e === O.aria || e === O.tooltips;
            })(n) &&
              s !== n) ||
            delete L[e];
        });
      }
      function le(e, s, i) {
        Object.keys(L).forEach(function (n) {
          var o = n.split(".")[0];
          e === o &&
            L[n].forEach(function (e) {
              e.call(
                ye,
                x.map(t.format.to),
                s,
                x.slice(),
                i || !1,
                V.slice(),
                ye,
              );
            });
        });
      }
      function re(e, s, i, o, l, r, a) {
        var c;
        return (
          n.length > 1 &&
            !t.events.unconstrained &&
            (o &&
              s > 0 &&
              ((c = E.getAbsoluteDistance(e[s - 1], t.margin, !1)),
              (i = Math.max(i, c))),
            l &&
              s < n.length - 1 &&
              ((c = E.getAbsoluteDistance(e[s + 1], t.margin, !0)),
              (i = Math.min(i, c)))),
          n.length > 1 &&
            t.limit &&
            (o &&
              s > 0 &&
              ((c = E.getAbsoluteDistance(e[s - 1], t.limit, !1)),
              (i = Math.min(i, c))),
            l &&
              s < n.length - 1 &&
              ((c = E.getAbsoluteDistance(e[s + 1], t.limit, !0)),
              (i = Math.max(i, c)))),
          t.padding &&
            (0 === s &&
              ((c = E.getAbsoluteDistance(0, t.padding[0], !1)),
              (i = Math.max(i, c))),
            s === n.length - 1 &&
              ((c = E.getAbsoluteDistance(100, t.padding[1], !0)),
              (i = Math.min(i, c)))),
          a || (i = E.getStep(i)),
          !((i = y(i)) === e[s] && !r) && i
        );
      }
      function ae(e, s) {
        var i = t.ort;
        return (i ? s : e) + ", " + (i ? e : s);
      }
      function ce(e, s, i, n, o) {
        var l = i.slice(),
          r = n[0],
          a = t.events.smoothSteps,
          c = [!e, e],
          d = [e, !e];
        (n = n.slice()),
          e && n.reverse(),
          n.length > 1
            ? n.forEach(function (e, t) {
                var i = re(l, e, l[e] + s, c[t], d[t], !1, a);
                !1 === i ? (s = 0) : ((s = i - l[e]), (l[e] = i));
              })
            : (c = d = [!0]);
        var u = !1;
        n.forEach(function (e, t) {
          u = pe(e, i[e] + s, c[t], d[t], !1, a) || u;
        }),
          u &&
            (n.forEach(function (e) {
              le("update", e), le("slide", e);
            }),
            null != o && le("drag", r));
      }
      function de(e, s) {
        return t.dir ? 100 - e - s : e;
      }
      function ue() {
        C.forEach(function (e) {
          var t = V[e] > 50 ? -1 : 1,
            s = 3 + (n.length + t * e);
          n[e].style.zIndex = String(s);
        });
      }
      function pe(e, s, i, o, l, r) {
        return (
          l || (s = re(V, e, s, i, o, !1, r)),
          !1 !== s &&
            ((function (e, s) {
              (V[e] = s), (x[e] = E.fromStepping(s));
              var i = "translate(" + ae(de(s, 0) - D + "%", "0") + ")";
              (n[e].style[t.transformRule] = i), me(e), me(e + 1);
            })(e, s),
            !0)
        );
      }
      function me(e) {
        if (o[e]) {
          var s = 0,
            i = 100;
          0 !== e && (s = V[e - 1]), e !== o.length - 1 && (i = V[e]);
          var n = i - s,
            l = "translate(" + ae(de(s, n) + "%", "0") + ")",
            r = "scale(" + ae(n / 100, "1") + ")";
          o[e].style[t.transformRule] = l + " " + r;
        }
      }
      function he(e, s) {
        return null === e || !1 === e || void 0 === e
          ? V[s]
          : ("number" == typeof e && (e = String(e)),
            !1 !== (e = t.format.from(e)) && (e = E.toStepping(e)),
            !1 === e || isNaN(e) ? V[s] : e);
      }
      function fe(e, s, i) {
        var n = S(e),
          o = void 0 === V[0];
        (s = void 0 === s || s),
          t.animate && !o && g(b, t.cssClasses.tap, t.animationDuration),
          C.forEach(function (e) {
            pe(e, he(n[e], e), !0, !1, i);
          });
        var l = 1 === C.length ? 0 : 1;
        if (o && E.hasNoSize() && ((i = !0), (V[0] = 0), C.length > 1)) {
          var r = 100 / (C.length - 1);
          C.forEach(function (e) {
            V[e] = e * r;
          });
        }
        for (; l < C.length; ++l)
          C.forEach(function (e) {
            pe(e, V[e], !0, !0, i);
          });
        ue(),
          C.forEach(function (e) {
            le("update", e), null !== n[e] && s && le("set", e);
          });
      }
      function ve(e) {
        if ((void 0 === e && (e = !1), e))
          return 1 === x.length ? x[0] : x.slice(0);
        var s = x.map(t.format.to);
        return 1 === s.length ? s[0] : s;
      }
      function ge(e) {
        var s = V[e],
          i = E.getNearbySteps(s),
          n = x[e],
          o = i.thisStep.step,
          l = null;
        if (t.snap)
          return [
            n - i.stepBefore.startValue || null,
            i.stepAfter.startValue - n || null,
          ];
        !1 !== o &&
          n + o > i.stepAfter.startValue &&
          (o = i.stepAfter.startValue - n),
          (l =
            n > i.thisStep.startValue
              ? i.thisStep.step
              : !1 !== i.stepBefore.step && n - i.stepBefore.highestStep),
          100 === s ? (o = null) : 0 === s && (l = null);
        var r = E.countStepDecimals();
        return (
          null !== o && !1 !== o && (o = Number(o.toFixed(r))),
          null !== l && !1 !== l && (l = Number(l.toFixed(r))),
          [l, o]
        );
      }
      _((a = b), t.cssClasses.target),
        0 === t.dir ? _(a, t.cssClasses.ltr) : _(a, t.cssClasses.rtl),
        0 === t.ort
          ? _(a, t.cssClasses.horizontal)
          : _(a, t.cssClasses.vertical),
        _(
          a,
          "rtl" === getComputedStyle(a).direction
            ? t.cssClasses.textDirectionRtl
            : t.cssClasses.textDirectionLtr,
        ),
        (i = $(a, t.cssClasses.base)),
        (function (e, s) {
          var i = $(s, t.cssClasses.connects);
          (n = []), (o = []).push(N(i, e[0]));
          for (var l = 0; l < t.handles; l++)
            n.push(T(s, l)), (C[l] = l), o.push(N(i, e[l + 1]));
        })(t.connect, i),
        (c = t.events).fixed ||
          n.forEach(function (e, t) {
            Q(p.start, e.children[0], ee, { handleNumbers: [t] });
          }),
        c.tap && Q(p.start, i, te, {}),
        c.hover && Q(p.move, i, se, { hover: !0 }),
        c.drag &&
          o.forEach(function (e, s) {
            if (!1 !== e && 0 !== s && s !== o.length - 1) {
              var i = n[s - 1],
                l = n[s],
                r = [e],
                a = [i, l],
                d = [s - 1, s];
              _(e, t.cssClasses.draggable),
                c.fixed && (r.push(i.children[0]), r.push(l.children[0])),
                c.dragAll && ((a = n), (d = C)),
                r.forEach(function (t) {
                  Q(p.start, t, ee, {
                    handles: a,
                    handleNumbers: d,
                    connect: e,
                  });
                });
            }
          }),
        fe(t.start),
        t.pips && X(t.pips),
        t.tooltips && j(),
        oe("update" + O.aria),
        ie("update" + O.aria, function (e, s, i, o, l) {
          C.forEach(function (e) {
            var s = n[e],
              o = re(V, e, 0, !0, !0, !0),
              r = re(V, e, 100, !0, !0, !0),
              a = l[e],
              c = String(t.ariaFormat.to(i[e]));
            (o = E.fromStepping(o).toFixed(1)),
              (r = E.fromStepping(r).toFixed(1)),
              (a = E.fromStepping(a).toFixed(1)),
              s.children[0].setAttribute("aria-valuemin", o),
              s.children[0].setAttribute("aria-valuemax", r),
              s.children[0].setAttribute("aria-valuenow", a),
              s.children[0].setAttribute("aria-valuetext", c);
          });
        });
      var ye = {
        destroy: function () {
          for (
            oe(O.aria),
              oe(O.tooltips),
              Object.keys(t.cssClasses).forEach(function (e) {
                w(b, t.cssClasses[e]);
              });
            b.firstChild;

          )
            b.removeChild(b.firstChild);
          delete b.noUiSlider;
        },
        steps: function () {
          return C.map(ge);
        },
        on: ie,
        off: oe,
        get: ve,
        set: fe,
        setHandle: function (e, t, s, i) {
          if (!((e = Number(e)) >= 0 && e < C.length))
            throw new Error("noUiSlider: invalid handle number, got: " + e);
          pe(e, he(t, e), !0, !0, i), le("update", e), s && le("set", e);
        },
        reset: function (e) {
          fe(t.start, e);
        },
        disable: function (e) {
          null != e
            ? (n[e].setAttribute("disabled", ""),
              n[e].handle.removeAttribute("tabindex"))
            : (b.setAttribute("disabled", ""),
              n.forEach(function (e) {
                e.handle.removeAttribute("tabindex");
              }));
        },
        enable: function (e) {
          null != e
            ? (n[e].removeAttribute("disabled"),
              n[e].handle.setAttribute("tabindex", "0"))
            : (b.removeAttribute("disabled"),
              n.forEach(function (e) {
                e.removeAttribute("disabled"),
                  e.handle.setAttribute("tabindex", "0");
              }));
        },
        __moveHandles: function (e, t, s) {
          ce(e, t, V, s);
        },
        options: s,
        updateOptions: function (e, i) {
          var n = ve(),
            o = [
              "margin",
              "limit",
              "padding",
              "range",
              "animate",
              "snap",
              "step",
              "format",
              "pips",
              "tooltips",
            ];
          o.forEach(function (t) {
            void 0 !== e[t] && (s[t] = e[t]);
          });
          var l = ne(s);
          o.forEach(function (s) {
            void 0 !== e[s] && (t[s] = l[s]);
          }),
            (E = l.spectrum),
            (t.margin = l.margin),
            (t.limit = l.limit),
            (t.padding = l.padding),
            t.pips ? X(t.pips) : W(),
            t.tooltips ? j() : R(),
            (V = []),
            fe(h(e.start) ? e.start : n, i);
        },
        target: b,
        removePips: W,
        removeTooltips: R,
        getPositions: function () {
          return V.slice();
        },
        getTooltips: function () {
          return r;
        },
        getOrigins: function () {
          return n;
        },
        pips: X,
      };
      return ye;
    }
    function le(e, t) {
      if (!e || !e.nodeName)
        throw new Error(
          "noUiSlider: create requires a single element, got: " + e,
        );
      if (e.noUiSlider)
        throw new Error("noUiSlider: Slider was already initialized.");
      var s = oe(e, ne(t), t);
      return (e.noUiSlider = s), s;
    }
    function re(e) {
      let t = !1;
      return (
        e.forEach((e) => {
          e.checked && (t = !0);
        }),
        t
      );
    }
    document.addEventListener("DOMContentLoaded", () => {
      !(function () {
        if (
          ((function () {
            let e = document.querySelectorAll(
              '[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)',
            );
            e &&
              e.forEach((e) => {
                if (
                  !e.querySelector(".swiper-wrapper") &&
                  !e.querySelector(".swiper")
                ) {
                  e.parentElement.classList.add("swiper"),
                    e.classList.add("swiper-wrapper");
                  for (const t of e.children) t.classList.add("swiper-slide");
                }
              });
          })(),
          document.querySelector(".slider-type-service__slider") &&
            new Swiper(".slider-type-service__slider", {
              slidesPerView: 1,
              spaceBetween: 30,
              speed: 300,
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              autoHeight: !0,
              navigation: {
                nextEl: ".slider-type-service__nav .slider-type-service__next",
                prevEl: ".slider-type-service__nav .slider-type-service__prev",
              },
              breakpoints: {
                319.98: {
                  slidesPerView: 1.15,
                  spaceBetween: 15,
                  autoHeight: !1,
                },
                767.98: {
                  slidesPerView: 1.1,
                  spaceBetween: 15,
                  autoHeight: !1,
                },
                1023.98: { slidesPerView: 1, spaceBetween: 30, autoHeight: !0 },
              },
              on: {},
            }),
          document.querySelector(".carousel-gallery__slider") &&
            new Swiper(".carousel-gallery__slider", {
              slidesPerView: 4.5,
              spaceBetween: 15,
              speed: 300,
              autoHeight: !1,
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              navigation: {
                nextEl: ".carousel-gallery__nav .carousel-gallery__next",
                prevEl: ".carousel-gallery__nav .carousel-gallery__prev",
              },
              breakpoints: {
                319.98: { slidesPerView: 1.3, spaceBetween: 10 },
                429.98: { slidesPerView: 1.5, spaceBetween: 10 },
                529.98: { slidesPerView: 2.5, spaceBetween: 10 },
                767.98: { slidesPerView: 3.2, spaceBetween: 10 },
                1023.98: { slidesPerView: 3.5, spaceBetween: 15 },
                1279.98: { slidesPerView: 4.5, spaceBetween: 15 },
              },
              on: {},
            }),
          document.querySelector(".inside-slider__slider_1"))
        ) {
          const e = new Swiper(".inside-slider__slider_1", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: !1,
            effect: "fade",
            observer: !0,
            observeParents: !0,
            pagination: { el: ".inside-slider__pagination ", clickable: !0 },
            breakpoints: {
              319.98: { loop: !0 },
              429.98: { spaceBetween: 0 },
              1023.98: { loop: !1 },
            },
            on: {},
          });
          document.querySelectorAll('[data-indx="1"] span').forEach((t, s) => {
            t.addEventListener("mouseover", (t) => {
              e.slideTo(s, 300, !0);
            });
          });
        }
        if (document.querySelector(".inside-slider__slider_2")) {
          const t = new Swiper(".inside-slider__slider_2", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: !1,
            effect: "fade",
            observer: !0,
            observeParents: !0,
            pagination: { el: ".inside-slider__pagination ", clickable: !0 },
            breakpoints: {
              319.98: { loop: !0 },
              429.98: { spaceBetween: 0 },
              1023.98: { loop: !1 },
            },
            on: {},
          });
          document.querySelectorAll('[data-indx="2"] span').forEach((e, s) => {
            e.addEventListener("mouseover", (e) => {
              t.slideTo(s, 300, !0);
            });
          });
        }
        if (document.querySelector(".inside-slider__slider_3")) {
          const s = new Swiper(".inside-slider__slider_3", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: !1,
            effect: "fade",
            observer: !0,
            observeParents: !0,
            pagination: { el: ".inside-slider__pagination ", clickable: !0 },
            breakpoints: {
              319.98: { loop: !0 },
              429.98: { spaceBetween: 0 },
              1023.98: { loop: !1 },
            },
            on: {},
          });
          document.querySelectorAll('[data-indx="3"] span').forEach((e, t) => {
            e.addEventListener("mouseover", (e) => {
              s.slideTo(t, 300, !0);
            });
          });
        }
        if (document.querySelector(".inside-slider__slider_4")) {
          const i = new Swiper(".inside-slider__slider_4", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: !1,
            effect: "fade",
            observer: !0,
            observeParents: !0,
            pagination: { el: ".inside-slider__pagination ", clickable: !0 },
            breakpoints: {
              319.98: { loop: !0 },
              429.98: { spaceBetween: 0 },
              1023.98: { loop: !1 },
            },
            on: {},
          });
          document.querySelectorAll('[data-indx="4"] span').forEach((e, t) => {
            e.addEventListener("mouseover", (e) => {
              i.slideTo(t, 300, !0);
            });
          });
        }
        if (document.querySelector(".inside-slider__slider_5")) {
          const n = new Swiper(".inside-slider__slider_5", {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: !1,
            effect: "fade",
            observer: !0,
            observeParents: !0,
            pagination: { el: ".inside-slider__pagination ", clickable: !0 },
            breakpoints: {
              319.98: { loop: !0 },
              429.98: { spaceBetween: 0 },
              1023.98: { loop: !1 },
            },
            on: {},
          });
          document.querySelectorAll('[data-indx="5"] span').forEach((e, t) => {
            e.addEventListener("mouseover", (e) => {
              n.slideTo(t, 300, !0);
            });
          });
        }
        if (
          (document.querySelector(".popolar-services__slider") &&
            new Swiper(".popolar-services__slider", {
              slidesPerView: 3,
              spaceBetween: 30,
              speed: 300,
              autoHeight: !1,
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              navigation: {
                nextEl: ".popolar-services__nav .popolar-services__next",
                prevEl: ".popolar-services__nav .popolar-services__prev",
              },
              breakpoints: {
                319.98: { slidesPerView: 1.15, spaceBetween: 15 },
                767.98: { slidesPerView: 1.7, spaceBetween: 15 },
                1023.98: { slidesPerView: 3, spaceBetween: 30 },
              },
              on: {},
            }),
          document.querySelector(".stories__wrapper"))
        ) {
          function o() {
            const e = document.querySelectorAll(".stories__link"),
              t = document.querySelector(".video-modal"),
              s = document.querySelector(".video-modal__close"),
              i = document.querySelector(".video-block__player"),
              n = document.querySelector(".video-modal__sound"),
              o = document.querySelector(".video-modal__icon-muted"),
              l = document.querySelector(".video-modal__icon-loud"),
              r = document.querySelector(".video-block__button"),
              a = document.querySelector(
                ".video-modal__navigation-line-progress",
              );
            function c() {
              t.classList.toggle("open");
            }
            function d() {
              i.play();
            }
            function u() {
              i.pause();
            }
            function p() {
              let e = this.dataset.video;
              c(),
                (function (e) {
                  i.src = e;
                })(e),
                d();
            }
            function m() {
              u(),
                (i.muted = !0),
                (o.style.display = "block"),
                (l.style.display = "none"),
                (i.currentTime = 0),
                (a.style.flexBasis = "0%"),
                c();
            }
            e.forEach((e) => e.addEventListener("click", p)),
              i.addEventListener("timeupdate", function () {
                const e = (i.currentTime / i.duration) * 100;
                a.style.flexBasis = `${e}%`;
              }),
              s.addEventListener("click", m),
              n.addEventListener("click", function () {
                !0 === i.muted
                  ? ((i.muted = !1),
                    (o.style.display = "none"),
                    (l.style.display = "block"))
                  : ((i.muted = !0),
                    (o.style.display = "block"),
                    (l.style.display = "none"));
              }),
              i.addEventListener("ended", m),
              r.addEventListener("mousedown", u),
              r.addEventListener("touchstart", u),
              r.addEventListener("mouseup", d),
              r.addEventListener("touchend", d),
              document.addEventListener("keydown", (e) => {
                "Space" == e.code &&
                  t.classList.contains("open") &&
                  (!0 !== i.paused ? u() : d());
              }),
              document.addEventListener("keydown", (e) => {
                "Escape" == e.code && t.classList.contains("open") && m();
              });
          }
          document.querySelectorAll(".stories__wrapper").forEach((e) => {
            new Swiper(e.querySelector(".swiper:not(.swiper-initialized)"), {
              loop: !1,
              allowTouchMove: !1,
              breakpoints: {
                319.98: { allowTouchMove: !0, slidesPerView: 1.2 },
                429.98: { slidesPerView: 1.2, allowTouchMove: !1 },
                1023.98: { slidesPerView: 1 },
                320: {},
                577: {},
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction",
                renderFraction: function (e, t) {
                  return `<span class="${e}"></span> из <span class="${t}"></span>`;
                },
              },
              navigation: {
                nextEl: e.querySelector(".stories__nav-btn.next"),
                prevEl: e.querySelector(".stories__nav-btn.prev"),
              },
            });
          }),
            o();
        }
        if (document.querySelector("#slider-stories")) {
          new Swiper("#slider-stories", {
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 300,
            autoHeight: !1,
            navigation: {
              nextEl: ".stories__nav .stories__next",
              prevEl: ".stories__nav .stories__prev",
            },
            breakpoints: {
              319.98: { slidesPerView: 1.2 },
              429.98: { slidesPerView: 1.2 },
              1023.98: { slidesPerView: 1 },
            },
            on: {},
          }).on("slideChange", function () {
            a(66, ".stories__sh-content");
          });
        }
        if (
          (document.querySelector(".offer-services__slider") &&
            new Swiper(".offer-services__slider", {
              slidesPerView: 3,
              spaceBetween: 15,
              speed: 300,
              autoHeight: !1,
              breakpoints: {
                319.98: { slidesPerView: 1.15 },
                429.98: { slidesPerView: 1.17, spaceBetween: 15 },
              },
              on: {},
            }),
          document.querySelector(".stages-work__slider"))
        ) {
          new Swiper(".stages-work__slider", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 300,
            autoHeight: !1,
            navigation: {
              nextEl: ".stages-work__nav .stages-work__next",
              prevEl: ".stages-work__nav .stages-work__prev",
            },
            breakpoints: {
              319.98: { slidesPerView: 1.3 },
              429.98: { slidesPerView: 1.3, spaceBetween: 15 },
              767.98: { autoplay: !1, slidesPerView: 2.2, spaceBetween: 15 },
              1023.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
            },
            on: {},
          }).on("slideChange", function () {
            a(70, ".stages-work__content");
          });
        }
        if (
          (document.querySelector("#types-wells__slider-one") &&
            new Swiper("#types-wells__slider-one", {
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 20,
              speed: 300,
              autoHeight: !1,
              breakpoints: {
                319.98: { slidesPerView: 1.3, spaceBetween: 15 },
                429.98: { slidesPerView: 1.3, spaceBetween: 10 },
                767.98: { autoplay: !1, slidesPerView: 1.6 },
                1023.98: { slidesPerView: 2, spaceBetween: 20, autoplay: !1 },
                1279.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
              },
              on: {},
            }),
          document.querySelector("#types-wells__slider") &&
            new Swiper("#types-wells__slider", {
              slidesPerView: 2,
              spaceBetween: 20,
              speed: 300,
              autoHeight: !1,
              breakpoints: {
                319.98: { slidesPerView: 1.3, spaceBetween: 15 },
                429.98: { slidesPerView: 1.3, spaceBetween: 10 },
                767.98: { autoplay: !1, slidesPerView: 1.4 },
                1023.98: { slidesPerView: 2, spaceBetween: 20, autoplay: !1 },
              },
              on: {},
            }),
          document.querySelector(".popular-models-obsrtv__slider") &&
            new Swiper(".popular-models-obsrtv__slider", {
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 300,
              loop: !1,
              navigation: {
                nextEl: ".popular-models__nav .popular-models__next",
                prevEl: ".popular-models__nav .popular-models__prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.2, centeredSlides: !1 },
                374.98: { slidesPerView: 1.4 },
                768: { centeredSlides: !1, slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4, initialSlide: 0 },
              },
              on: {},
            }),
          document.querySelector(".types-arrangement__slider") &&
            new Swiper(".types-arrangement__slider", {
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              slidesPerView: 2,
              spaceBetween: 20,
              speed: 300,
              autoHeight: !1,
              breakpoints: {
                319.98: { slidesPerView: 1.2, spaceBetween: 15 },
                429.98: { slidesPerView: 1.2, spaceBetween: 10 },
                529.98: { slidesPerView: 1.6, spaceBetween: 10 },
                767.98: { autoplay: !1, slidesPerView: 2.1 },
                1023.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
                1279.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
              },
              on: {},
            }),
          document.querySelector(".completed-work__slider") &&
            new Swiper(".completed-work__slider", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 2,
              spaceBetween: 30,
              speed: 300,
              navigation: {
                nextEl: ".completed-work__nav .completed-work__next",
                prevEl: ".completed-work__nav .completed-work__prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                430: { slidesPerView: 1.3, spaceBetween: 15 },
                768: { slidesPerView: 1, spaceBetween: 30 },
                1023.98: { slidesPerView: 1 },
                1279.98: { slidesPerView: 2 },
              },
              on: {},
            }),
          document.querySelector(".brand-carusel__slider") &&
            new Swiper(".brand-carusel__slider", {
              observer: !0,
              watchSlidesProgress: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 30,
              speed: 300,
              autoHeight: !1,
              navigation: {
                nextEl: ".brand-carusel__nav .brand-carusel__next",
                prevEl: ".brand-carusel__nav .brand-carusel__prev",
              },
              breakpoints: {
                319.98: { slidesPerView: 1.3, spaceBetween: 15 },
                767.98: { autoplay: !1, slidesPerView: 2.2 },
                1023.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
                1279.98: { slidesPerView: 3, spaceBetween: 20, autoplay: !1 },
              },
              on: {},
            }),
          document.querySelector(".popular-models__slider"))
        ) {
          new Swiper(".popular-models__slider", {
            watchSlidesProgress: !0,
            slidesPerView: 4,
            spaceBetween: 0,
            speed: 300,
            loop: !1,
            navigation: {
              nextEl: ".popular-models__nav .popular-models__next",
              prevEl: ".popular-models__nav .popular-models__prev",
            },
            breakpoints: {
              320: { slidesPerView: 1.2 },
              374.98: { slidesPerView: 1.4 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4, initialSlide: 0 },
            },
            on: {},
          });
        }
        document.querySelector(".submitted__slider-post") &&
          new Swiper(".submitted__slider-post", {
            observer: !0,
            observeParents: !0,
            slidesPerView: 3,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 300,
            navigation: {
              nextEl: ".submitted__nav .submitted__next",
              prevEl: ".submitted__nav .submitted__prev",
            },
            breakpoints: {
              320: { slidesPerView: 1.4, spaceBetween: 15 },
              430: { slidesPerView: 1.4, spaceBetween: 15 },
              768: { slidesPerView: "2.5" },
              1023.98: { spaceBetween: 30, slidesPerView: "3" },
            },
            on: {},
          }),
          document.querySelector("#slider-video") &&
            new Swiper("#slider-video", {
              observer: !0,
              observeParents: !0,
              slidesPerView: "2",
              spaceBetween: 30,
              autoHeight: !1,
              speed: 300,
              navigation: {
                nextEl: ".submitted__youtube-nav .submitted__youtube-next",
                prevEl: ".submitted__youtube-nav .submitted__youtube-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.5, spaceBetween: 15 },
                430: {
                  centeredSlides: !1,
                  slidesPerView: 1.6,
                  spaceBetween: 15,
                },
                768: { centeredSlides: !1, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 30 },
              },
              on: {},
            }),
          document.querySelector("#magazine-slide") &&
            new Swiper("#magazine-slide", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 3,
              speed: 300,
              navigation: {
                nextEl: ".submitted__magazine-nav .submitted__magazine-next",
                prevEl: ".submitted__magazine-nav .submitted__magazine-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.3, spaceBetween: 15 },
                430: {
                  centeredSlides: !1,
                  slidesPerView: 1.6,
                  spaceBetween: 20,
                },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              },
              on: {},
            }),
          document.querySelector(".water-analysis__slider") &&
            new Swiper(".water-analysis__slider", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 30,
              autoHeight: !1,
              speed: 300,
              breakpoints: {
                319.98: { slidesPerView: 1.2, spaceBetween: 20 },
                767.98: { slidesPerView: 1.2, spaceBetween: 30 },
                1023.98: { slidesPerView: 2 },
              },
              on: {},
            }),
          document.querySelector("#we-doing") &&
            new Swiper("#we-doing", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 4,
              spaceBetween: 25,
              autoHeight: !1,
              speed: 300,
              loop: !0,
              autoplay: { delay: 3e3 },
              navigation: {
                nextEl: ".we-doing__nav .we-doing__next",
                prevEl: ".we-doing__nav .we-doing__prev",
              },
              breakpoints: {
                319.98: {
                  slidesPerView: 1.1,
                  spaceBetween: 15,
                  loop: !0,
                  autoplay: { delay: 3e3 },
                  centeredSlides: !0,
                },
                429.98: { slidesPerView: 1.1 },
                767.98: { slidesPerView: 2.3, spaceBetween: 15 },
                1023.98: { slidesPerView: 3, spaceBetween: 20 },
                1439.98: { spaceBetween: 24 },
              },
              on: {},
            }),
          document.querySelector("#work-examples") &&
            new Swiper("#work-examples", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 4,
              spaceBetween: 25,
              autoHeight: !1,
              speed: 300,
              loop: !0,
              autoplay: { delay: 4e3 },
              navigation: {
                nextEl: ".work-examples__nav .work-examples__next",
                prevEl: ".work-examples__nav .work-examples__prev",
              },
              breakpoints: {
                319.98: {
                  slidesPerView: 1.1,
                  spaceBetween: 15,
                  loop: !0,
                  autoplay: { delay: 3e3 },
                  centeredSlides: !0,
                },
                429.98: { slidesPerView: 1.2 },
                529.98: { slidesPerView: 1.8 },
                767.98: { slidesPerView: 2.3, spaceBetween: 15 },
                1023.98: { slidesPerView: 3, spaceBetween: 20 },
                1439.98: { spaceBetween: 24 },
              },
              on: {},
            }),
          document.querySelector(".lawn-options__slider") &&
            new Swiper(".lawn-options__slider", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 30,
              autoHeight: !1,
              speed: 300,
              pagination: { el: ".so-discount__pagging", clickable: !0 },
              breakpoints: {
                319.98: { slidesPerView: 1.1, spaceBetween: 30 },
                429.98: { slidesPerView: 1.28 },
                767.98: { slidesPerView: 2.25, spaceBetween: 30 },
                1023.98: { slidesPerView: 3 },
              },
              on: {},
            }),
          document.querySelector(".so-discount__slider") &&
            new Swiper(".so-discount__slider", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 30,
              autoHeight: !1,
              speed: 300,
              pagination: { el: ".so-discount__pagging", clickable: !0 },
              breakpoints: {
                319.98: { slidesPerView: 1.1, spaceBetween: 30 },
                429.98: { slidesPerView: 1.28 },
                767.98: { slidesPerView: 2.25, spaceBetween: 30 },
                1023.98: { slidesPerView: 3 },
              },
              on: {},
            }),
          document.querySelector(
            ".banner-gallery__slider:not(.swiper-initialized)",
          ) &&
            new Swiper(".banner-gallery__slider:not(.swiper-initialized)", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 1,
              spaceBetween: 0,
              autoHeight: !1,
              speed: 300,
              autoplay: { delay: 3e3 },
              loop: !0,
              navigation: {
                prevEl: ".banner-gallery__navigation .banner-gallery__btn_prev",
                nextEl: ".banner-gallery__navigation .banner-gallery__btn_next",
              },
              pagination: { el: ".banner-gallery__pagination", clickable: !0 },
              breakpoints: {},
              on: {},
            }),
          document.querySelector(".drilling-price__slider") &&
            new Swiper(".drilling-price__slider", {
              observer: !0,
              observeParents: !0,
              slidesPerView: 2,
              spaceBetween: 30,
              autoHeight: !1,
              speed: 300,
              breakpoints: {
                319.98: { slidesPerView: 1.1, spaceBetween: 15 },
                429.98: { slidesPerView: 1.3 },
                767.98: { slidesPerView: 1.5, spaceBetween: 15 },
                1023.98: { slidesPerView: 2 },
              },
              on: {},
            });
      })(),
        (function () {
          const e = document.querySelectorAll(".inside-slider__pagination");
          0 !== e.length &&
            e.forEach((e) => {
              if (1 === e.children.length) return void (e.hidden = !0);
              let t = 100 / +e.children.length;
              Array.from(e.children).forEach((e) => {
                e.style.flex = `0 1 ${t}%`;
              });
            });
        })();
    }),
      ymaps.ready(function () {
        const e = [
            {
              city: "москва",
              center: [55.73, 37.6],
              zoom: 8,
              polygon: [
                [54.80831947994278, 38.18433433925412],
                [54.87945876925923, 38.52995859405644],
                [55.122011885673516, 38.67767483903884],
                [55.37773639221365, 38.95005546337981],
                [55.69101620830514, 39.06854923170738],
                [55.962220037403114, 39.09331426601756],
                [56.118493229997256, 38.83962697728742],
                [56.38328535103986, 38.538312268742686],
                [56.72694946754399, 38.84094055277811],
                [56.54218234666476, 37.45911829335503],
                [56.484269925944716, 36.55340126947627],
                [56.082994973012944, 35.26044765213379],
                [55.528582146509564, 35.79574540554199],
                [54.886906159423376, 36.2751232506904],
                [54.80831947994278, 38.18433433925412],
              ],
            },
            {
              city: "питер",
              center: [59.93, 30.31],
              zoom: 7,
              polygon: [
                [61.106088074302846, 28.84990729821095],
                [60.54048161644306, 27.852634950925818],
                [60.75790210590904, 28.70283621526761],
                [60.71577485205364, 28.815934690349366],
                [60.36998777034415, 28.591678325406576],
                [60.16918067335956, 29.40829044088855],
                [60.211534546111665, 29.565211415079403],
                [60.187888023113686, 29.76919931592809],
                [60.15288724263536, 29.946358034169208],
                [60.12523238261545, 30.01739461918757],
                [60.0423242615806, 29.96706282242633],
                [59.98493140629839, 30.238787111520338],
                [59.93232002134522, 30.232711129552428],
                [59.84017052918489, 30.131823462708525],
                [59.885551817464716, 29.780468838045408],
                [59.93961408752628, 29.49723475289224],
                [59.964616467662836, 29.19559571694552],
                [59.91991225984697, 29.093497700881187],
                [59.83296746003299, 29.087954398797308],
                [59.78396907811887, 28.914027896498567],
                [59.75631501176312, 28.72500164979357],
                [59.800093425856545, 28.60943866524633],
                [59.80224973132346, 28.510190763084665],
                [59.73798583871411, 28.485433522283643],
                [59.66933873971914, 28.443601343301964],
                [59.6455402380044, 28.376395134689574],
                [59.65854803135656, 28.293968754917074],
                [59.69130561691546, 28.200415788977097],
                [59.74283516453832, 28.176907105205913],
                [59.767886802293845, 28.119769460495604],
                [59.671623961424615, 28.052389391540657],
                [59.53828823226743, 28.139961089731088],
                [59.35798953936603, 28.280648261698502],
                [59.02248117220134, 27.802166784452368],
                [59.00045046566632, 28.16716353323224],
                [58.90325564969078, 28.305782371843577],
                [58.892541977172385, 28.547145432234146],
                [58.839964234623864, 28.845593925558575],
                [58.81921766186278, 29.117229752723944],
                [58.71702324975635, 29.25362211337176],
                [58.61141214319082, 29.417761707109804],
                [58.52810610714258, 29.61583387713702],
                [58.45004102025334, 29.77698972302713],
                [58.47175326366724, 30.057070714286084],
                [58.528177693429086, 30.078493270758997],
                [58.670382603306024, 30.045047415771506],
                [58.784750929872246, 30.172568775367296],
                [58.77110172497413, 30.343612119793363],
                [58.74393741340788, 30.50480117892272],
                [58.76087846060315, 30.64903410782111],
                [58.89266306882436, 30.720318055999343],
                [58.931775319679105, 30.87541133018749],
                [59.08920426528445, 31.001107474298152],
                [59.05199909544481, 31.247310598952225],
                [59.16120182948734, 31.46040108683397],
                [59.24601344328124, 31.51924861119312],
                [59.3841107762172, 31.519650608045566],
                [59.37453535197764, 31.743859355535903],
                [59.41319939652709, 31.895892426683588],
                [59.4229337327242, 32.06818148171814],
                [59.35859553485514, 32.20693837199164],
                [59.28307118884456, 32.32414465705074],
                [59.17916450331086, 32.39505501883892],
                [59.15220746691128, 32.516090367786234],
                [59.16411241403188, 32.67707713805814],
                [59.25209559211132, 32.704493920109],
                [59.34898953782607, 32.772563410771056],
                [59.396925101876036, 32.86750784159898],
                [59.44235324548666, 33.07951705642466],
                [59.413053844884786, 33.23037247596619],
                [59.42351502348515, 33.46150882912565],
                [59.3621493877059, 33.71617224039184],
                [59.28076198027452, 33.85555732820072],
                [59.18093545333778, 34.07927365350611],
                [59.218446738264504, 34.31479262566086],
                [59.18449031867098, 34.46167119790215],
                [59.15756557610953, 34.569028458632886],
                [59.134213013591875, 34.74295902207777],
                [59.19477306563164, 34.801078803116695],
                [59.2564359565597, 34.97977799727809],
                [59.2912162694453, 35.12579135405289],
                [59.32989570283232, 35.26304437874467],
                [59.394126305198824, 35.282047170349756],
                [59.44494765499957, 35.336190323574385],
                [59.527887428452004, 35.279241905261756],
                [59.55491865313289, 35.38593012930545],
                [59.56172289354441, 35.45519752319393],
                [59.63727521994343, 35.448287025471046],
                [59.65468260646398, 35.555353868864756],
                [59.686264326387004, 35.562483180192146],
                [59.703950761999664, 35.42163323598487],
                [59.76838546078838, 35.34683149778368],
                [59.85256037133368, 35.3567480923831],
                [59.92369691755857, 35.406137191942264],
                [59.9805250889039, 35.28730686193509],
                [60.017895388841026, 35.10473292452272],
                [60.08351447005737, 35.16532530607367],
                [60.18264270143564, 35.12041199589066],
                [60.25167418889458, 35.135359361852636],
                [60.33731700421731, 35.225018017333184],
                [60.599637668599655, 35.24198481129656],
                [60.66614517771396, 35.19836887519892],
                [60.73404500750823, 35.14189036348486],
                [60.860688754947546, 35.23361484311272],
                [60.88857627351911, 35.38923417605841],
                [60.93444654114589, 35.52607157330945],
                [61.02021458655281, 35.63697856871454],
                [61.1083074214377, 35.66627786728151],
                [61.15697755043698, 35.65753483388153],
                [61.138111449137995, 35.513698102849844],
                [61.12318207774868, 35.36526337298682],
                [61.1832439172974, 35.335165607609014],
                [61.23909327326484, 35.34306604636703],
                [61.228582198408304, 35.19403076257794],
                [61.22860626645772, 35.028774374516416],
                [61.26035502030351, 34.80014854115669],
                [61.228371912248804, 34.62740677860907],
                [61.16914050333483],
                34.521057796999315,
                [61.1381625782991, 34.375724845099],
                [61.193136211572295, 34.274744102545526],
                [61.207127022717884, 34.01546202975132],
                [61.203757474773255, 33.698387119373336],
                [61.16566629145257, 33.56353423301232],
                [61.15193178960703, 33.495864964454626],
                [61.10094639830956, 33.57979779688657],
                [61.14509680547397, 33.76467751366431],
                [61.12465903378748, 33.91802782223414],
                [61.008016691462956, 33.941252627795365],
                [60.9144170484949, 33.816468775562356],
                [60.92079313266953, 33.67582168857538],
                [60.95277608109717, 33.57544502404991],
                [60.99486230036612, 33.50047914244152],
                [60.9656518934932, 33.47746318511602],
                [60.920762010627215, 33.49682021768072],
                [60.88595190808354, 33.39188123480494],
                [60.8360574570367, 33.341192219070024],
                [60.753586881331614, 33.26077873445362],
                [60.696863877704004, 33.128608162644554],
                [60.66744942292257, 33.013157521200924],
                [60.47643160894205, 32.82599005653793],
                [60.50472927233986, 32.65483755366424],
                [60.396308853622884, 32.74780061241211],
                [60.31819019883031, 32.66598898975374],
                [60.245199187531796, 32.65909996699057],
                [60.161066458141306, 32.61444214580604],
                [60.12614806592467, 32.495855101856904],
                [60.09471699316654, 32.301778825749864],
                [60.11039252448461, 32.18459263609901],
                [60.16749132430087, 32.070916239492675],
                [60.18998264893045, 31.889161919783447],
                [60.18675966797986, 31.73410743459536],
                [60.119836209160354, 31.65017367415598],
                [60.0605217394008, 31.6046419601648],
                [59.99324259600215, 31.610785530865854],
                [59.93335651991168, 31.59401443688691],
                [59.880472446391366, 31.50763516198711],
                [59.886351135496454, 31.27940617403553],
                [59.90097354234132, 31.142684758149613],
                [59.91566408008279, 30.99993686742772],
                [59.95660389144942, 30.951398418986003],
                [60.00105689222647, 31.02619414415352],
                [60.07363677987078, 31.053152954550058],
                [60.151108957508114, 30.981435482398467],
                [60.22734836046297, 30.91402784967906],
                [60.375430876166945, 30.82185987239356],
                [60.49908511402646, 30.692137455248258],
                [60.58062586990846, 30.57597504845583],
                [60.64945709096361, 30.443091178705856],
                [60.73859746306803, 30.47682683528842],
                [60.806970681028275, 30.462987825587703],
                [61.00722789319536, 30.257720710362037],
                [61.0946869940374, 30.081598200023848],
                [61.151348903426424, 29.830549834254754],
                [61.15529478015222, 29.613444318104058],
                [61.212959857671194, 29.516226783570488],
                [61.263060270690886, 29.348334364957054],
                [61.25454458553398, 29.24086735976627],
                [61.106088074302846, 28.84990729821095],
              ],
            },
          ],
          t = document.querySelectorAll("button[data-city-map]"),
          s = document.querySelector(
            "nav[data-tabs-titles].ya-map__navigation",
          );
        if (
          ((function () {
            const e = document.querySelectorAll(".ya-map__tab");
            e &&
              e.forEach((t) => {
                t.addEventListener("click", (s) => {
                  t.closest("._active-tab-map") ||
                    (e.forEach((e) => e.classList.remove("_active-tab-map")),
                    t.classList.add("_active-tab-map"));
                });
              });
          })(),
          document.getElementById("map"))
        ) {
          var i = new ymaps.Map(
            "map",
            { center: e[0].center, zoom: 8 },
            { searchControlProvider: "yandex#search" },
          );
          if (
            (0 !== t.length &&
              t.forEach((t) => {
                const s = t.dataset.cityMap;
                let n = e.find((e) => s === e.city),
                  o = new ymaps.Polygon(
                    [n.polygon],
                    { hintContent: "Многоугольник" },
                    {
                      fillColor: "#009CD9",
                      strokeWidth: 1,
                      strokeColor: "#0067A0",
                      strokeOpacity: 1,
                      fillOpacity: 0.2,
                    },
                  );
                i.geoObjects.add(o),
                  i.geoObjects.add(new ymaps.Placemark(n.center, {})),
                  t.addEventListener("click", (e) => {
                    i.setCenter(n.center, n.zoom);
                  });
              }),
            !s && 0 === t.length)
          ) {
            i.geoObjects.add(new ymaps.Placemark([55.73, 37.6], {}));
            let e = new ymaps.Polygon(
              [
                [
                  [54.80831947994278, 38.18433433925412],
                  [54.87945876925923, 38.52995859405644],
                  [55.122011885673516, 38.67767483903884],
                  [55.37773639221365, 38.95005546337981],
                  [55.69101620830514, 39.06854923170738],
                  [55.962220037403114, 39.09331426601756],
                  [56.118493229997256, 38.83962697728742],
                  [56.38328535103986, 38.538312268742686],
                  [56.72694946754399, 38.84094055277811],
                  [56.54218234666476, 37.45911829335503],
                  [56.484269925944716, 36.55340126947627],
                  [56.082994973012944, 35.26044765213379],
                  [55.528582146509564, 35.79574540554199],
                  [54.886906159423376, 36.2751232506904],
                  [54.80831947994278, 38.18433433925412],
                ],
              ],
              { hintContent: "Многоугольник" },
              {
                fillColor: "#009CD9",
                strokeWidth: 1,
                strokeColor: "#0067A0",
                strokeOpacity: 1,
                fillOpacity: 0.2,
              },
            );
            i.geoObjects.add(e);
          }
          i.controls.remove("geolocationControl"),
            i.controls.remove("searchControl"),
            i.controls.remove("trafficControl"),
            i.controls.remove("typeSelector"),
            i.controls.remove("fullscreenControl"),
            i.controls.remove("rulerControl"),
            i.behaviors.disable(["scrollZoom"]);
        }
      }),
      (function () {
        const e = document.querySelectorAll(".card-model__info-btn");
        e &&
          e.forEach((e) => {
            e.addEventListener("click", function (t) {
              e.classList.toggle("_show");
            }),
              document.addEventListener("click", (t) => {
                let s = t.target;
                e.contains(s) ||
                  e.firstChild.contains(s) ||
                  e.classList.remove("_show");
              });
          });
        const t = document.querySelector(".popular-models__swiper");
        function s(e, t) {
          e.closest(t) &&
            !e.closest("._active-btn") &&
            (Array.from(e.parentElement.children).forEach((e, t) => {
              e.classList.remove("_active-btn");
            }),
            e.classList.add("_active-btn"));
        }
        t &&
          t.addEventListener("click", function (e) {
            let t = e.target;
            s(t, ".card-model__top-btn"), s(t, ".card-model__bottom-btn");
            const i = document.querySelectorAll(".popular-models__slide");
            if (t.closest("[data-slide-id]")) {
              let n = t.closest("[data-slide-id]").dataset.slideId;
              const o = i[n].querySelector(".card-model__name"),
                l = i[n].querySelectorAll(".card-model__list li"),
                r = i[n].querySelector(".card-model__current-price"),
                a = i[n].querySelector(".card-model__discount-price"),
                c = i[n].querySelector(".card-model__btn"),
                d = i[n].querySelector(".card-model__img img"),
                u = i[n].querySelector(".card-model__top-btns"),
                p = i[n].querySelector(".card-model__bottom-btns");
              if (t.closest("[data-top-sm]")) {
                let v;
                t.hasAttribute("data-top-sm") &&
                  (v = Object.assign(t.closest("[data-top-sm]").dataset)),
                  p && (v = m(u, p)),
                  f(v);
              }
              if (t.closest("[data-top-pr]")) {
                let g;
                t.hasAttribute("data-top-pr") &&
                  (g = Object.assign(t.closest("[data-top-pr]").dataset)),
                  p && (g = m(u, p)),
                  f(g);
              }
              if (t.closest("[data-bottom-btn]")) {
                f(m(u, p));
              }
              function m(e, t = "") {
                let s, i;
                return (
                  Array.from(e.children).forEach((e) => {
                    e.closest("._active-btn") &&
                      (i = Object.keys(e.dataset)[0]);
                  }),
                  t &&
                    Array.from(t.children).forEach((e) => {
                      e.closest("._active-btn") && (s = e.dataset);
                    }),
                  h(i, s)
                );
              }
              function h(e, t) {
                let s = {};
                for (const i in t)
                  if (Object.hasOwnProperty.call(t, i)) {
                    const n = t[i];
                    if (n) {
                      let t = n.split("|");
                      if (1 == t.length) {
                        s[i] = t[0];
                        continue;
                      }
                      (t = "topSm" === e ? t[0] : t[1]), (s[i] = t);
                    }
                  }
                return s;
              }
              function f(e) {
                o.setAttribute("href", `https://sewera.ru/products/${e.link}`),
                  i[n]
                    .querySelector(".card-model__top")
                    .setAttribute(
                      "href",
                      `https://sewera.ru/products/${e.link}`,
                    ),
                  e.img &&
                    (function (e, t) {
                      if (t) {
                        const s = e.src.lastIndexOf("/");
                        e.src = e.src.slice(0, s + 1) + t + ".webp";
                      }
                    })(d, e.img),
                  (o.innerHTML = e.name ? e.name : ""),
                  (l[0].firstElementChild.innerHTML = e.prop1
                    ? e.prop1
                    : l[1].firstElementChild.innerHTML),
                  (l[1].firstElementChild.innerHTML = e.prop2
                    ? e.prop2
                    : l[1].firstElementChild.innerHTML),
                  (l[2].firstElementChild.innerHTML = e.prop3
                    ? e.prop3
                    : l[2].firstElementChild.innerHTML),
                  (l[3].firstElementChild.innerHTML = e.prop4
                    ? e.prop4
                    : l[3].firstElementChild.innerHTML),
                  (r.firstElementChild.innerHTML = e.priceCrnt
                    ? e.priceCrnt
                    : r.firstElementChild.innerHTML),
                  a &&
                    (e.priceDisc
                      ? ((a.style.display = "inline"),
                        (i[n].querySelector(
                          ".card-model__dicount",
                        ).style.display = "inline"))
                      : ((a.style.display = "none"),
                        (i[n].querySelector(
                          ".card-model__dicount",
                        ).style.display = "none")),
                    (a.firstElementChild.innerHTML = ""),
                    (a.firstElementChild.innerHTML = e.priceDisc)),
                  (c.dataset.form = o.innerText),
                  (c.dataset.price = `${r.firstElementChild.innerText} руб.`);
              }
            }
          });
      })(),
      (function () {
        const e = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"];
        var t = {
          to: function (t) {
            return e[Math.round(t)];
          },
          from: function (t) {
            return e.indexOf(t);
          },
        };
        const s = document.querySelector("#range");
        s &&
          (le(s, {
            start: 3,
            step: 1,
            range: { min: [0], max: [e.length - 1] },
            tooltips: !0,
            format: t,
            connect: [!0, !1],
            pips: { mode: "count", stepped: !0, values: 11, format: t },
          }),
          s.noUiSlider.on("change", function () {
            const e = document.querySelector(".noUi-handle"),
              t = document.querySelector(".form-qwiz__input-number");
            "10+" === e.ariaValueText
              ? (t.classList.add("_show"),
                document
                  .querySelector(".qwiz-section__next-btn")
                  .classList.add("_disabled"),
                (document.querySelector(".qwiz-section__next-btn").disabled =
                  !0))
              : (t.classList.remove("_show"),
                document
                  .querySelector(".qwiz-section__next-btn")
                  .classList.remove("_disabled"),
                (document.querySelector(".qwiz-section__next-btn").disabled =
                  !1));
            const s = document.getElementById("range_input");
            s && ((s.value = this.get()), "10+" == s.value && (s.value = ""));
          }));
      })(),
      (function () {
        const e = document.querySelector("#services_quiz_form"),
          t = document.querySelector("#calc-septik");
        if (e) {
          const s = document.querySelector(".form-qwiz"),
            i = document.querySelectorAll(".form-qwiz__input"),
            n = document.querySelectorAll(".form-qwiz__step"),
            o = document.querySelector(".qwiz-section__prev-btn"),
            l = document.querySelector(".qwiz-section__next-btn"),
            r = document.querySelector(".qwiz-section__bottom"),
            a = document.querySelector(".qwiz-section__current-step"),
            c = document.querySelector(".form-qwiz__restart-btn"),
            d = document.querySelector(".qwiz-section__finish-step");
          let u = 0,
            p = !1;
          function m(e) {
            e.target.classList.contains("form-qwiz__input") &&
              (v(),
              p ||
                u !== n.length - 3 ||
                (l.classList.add("_disabled"), (l.disabled = !0)),
              p && (l.classList.remove("_disabled"), (l.disabled = !1)));
          }
          function h(e) {
            ++u,
              v(),
              console.log(u),
              p && u === n.length - 2 && a.parentNode.classList.add("_ready"),
              p ||
                u !== n.length - 3 ||
                (l.classList.add("_disabled"), (l.disabled = !0)),
              n.length - 1 === u && (a.parentNode.style.display = "none"),
              n.length - 2 === u && (r.style.display = "none"),
              n.length !== u
                ? ((a.innerHTML = u + 1),
                  o.classList.remove("_disabled"),
                  (o.disabled = !1),
                  n[u - 1].classList.remove("_current"),
                  n[u].classList.add("_current"))
                : (n[u - 1].style.display = "none");
          }
          function f(e) {
            u === n.length - 2 && a.parentNode.classList.remove("_ready"),
              u === n.length - 3 && l.classList.remove("_disabled"),
              o.classList.contains("_disabled") ||
                (u--,
                (a.innerHTML = u + 1),
                0 === u && (o.classList.add("_disabled"), (o.disabled = !0)),
                (l.disabled = !1),
                n[u + 1].classList.remove("_current"),
                n[u].classList.add("_current"));
          }
          function v() {
            for (let e = 0; e < i.length; e++) {
              if (i[e].checked) return void (p = !0);
            }
            p = !1;
          }
          l.addEventListener("click", h),
            o.addEventListener("click", f),
            s.addEventListener("click", m),
            d && (d.innerHTML = "/" + (n.length - 1)),
            c &&
              c.addEventListener("click", function (e) {
                (u = 0),
                  (p = !1),
                  (a.innerHTML = 1),
                  o.classList.add("_disabled"),
                  (o.disabled = !0),
                  n[0].classList.add("_current"),
                  n[n.length - 1].classList.remove("_current"),
                  (r.style.display = "flex"),
                  (a.parentNode.style.display = "flex"),
                  a.parentNode.classList.remove("_ready"),
                  i.forEach((e) => (e.checked = !1));
              }),
            e.addEventListener("submit", function (e) {
              e.preventDefault();
              var t = $("#services_quiz_form");
              return (
                $(".load__preloader").fadeIn("", function () {
                  $.ajax({
                    type: "POST",
                    url: "/index.php?route=common/footer/quiz_submit",
                    data: t.serialize(),
                    dataType: "json",
                  }).done(function (e) {
                    e.success && ($(".load__preloader").fadeOut("slow"), h());
                  });
                }),
                !1
              );
            });
        }
        if (t) {
          const g = document.querySelector(".form-qwiz"),
            y = document.querySelectorAll(".form-qwiz__input"),
            S = document.querySelectorAll(".form-qwiz__step"),
            b = document.querySelector(".qwiz-section__prev-btn"),
            _ = document.querySelector(".qwiz-section__next-btn"),
            w = document.querySelector(".qwiz-section__bottom"),
            k = document.querySelector(".qwiz-section__navigate"),
            E = document.querySelector(".qwiz-section__progress-text"),
            x = document.querySelector(".qwiz-section__current-step"),
            V = document.querySelector(".form-qwiz__btn-finish"),
            C = document.querySelector(".form-qwiz__restart-btn");
          let P = 0,
            L = !1,
            q = "";
          function A(e) {
            e.target.classList.contains("form-qwiz__input") &&
              (j(),
              L ||
                P !== S.length - 3 ||
                (_.classList.add("_disabled"), (_.disabled = !0)),
              L && (_.classList.remove("_disabled"), (_.disabled = !1)));
          }
          V.addEventListener("click", function (e) {
            M();
          }),
            _.addEventListener("click", M),
            b.addEventListener("click", R),
            g.addEventListener("click", A),
            document.querySelector(".qwiz-section__finish-step") &&
              (document.querySelector(".qwiz-section__finish-step").innerHTML =
                "/" + (S.length - 1));
          const O = document.querySelectorAll(
              'input[name="Место отвода воды из септика"]',
            ),
            B = document.querySelectorAll(
              'input[name="Глубина залегания трубы"]',
            ),
            D = document.querySelectorAll(
              'input[name="Место отвода воды из септика"]',
            ),
            T = document.querySelectorAll('input[name="Количество колец"]');
          function N(e) {
            e.forEach((e) => {
              e.checked = !1;
            });
          }
          function H(e) {
            e &&
              e.forEach((t) => {
                t.addEventListener("click", () => z(e));
              });
          }
          function z(e) {
            re(e), _.classList.remove("_disabled");
          }
          function M() {
            let e = re(B),
              t = re(D),
              s = re(T);
            if (
              (2 == P && q && _.classList.add("_disabled"),
              2 === P && s && q && _.classList.add("_disabled"),
              (3 !== P || s) &&
                (1 !== P || t || _.classList.add("_disabled"),
                (2 !== P || t) &&
                  (0 !== P || e || _.classList.add("_disabled"), 1 !== P || e)))
            ) {
              if (
                (++P,
                E && (E.style.display = "flex"),
                j(),
                1 === P &&
                  ((b.style.display = "flex"),
                  (k.style.justifyContent = "space-between")),
                L && P === S.length - 2 && x.parentNode.classList.add("_ready"),
                L ||
                  P !== S.length - 3 ||
                  (_.classList.add("_disabled"), (_.disabled = !0)),
                S.length - 3 === P && (k.style.display = "none"),
                S.length - 2 === P &&
                  (document.querySelector(
                    ".qwiz-section__progress-step ",
                  ).style.display = "none"),
                w && S.length - 2 === P && (w.style.display = "none"),
                S[P].closest("._additional-question") && !q)
              )
                return I(P - 1, P + 1), (P += 1), void U(`${P}`);
              if (
                (b.classList.remove("_disabled"),
                (b.disabled = !1),
                U(q ? P : P + 1),
                S.length === P + 3 &&
                  (!(function () {
                    const e = [
                        {
                          linkSeptik: "septik-akvalos-2",
                          nameSeptik: "Септик Аквалос 2",
                          pipeDepth: "30",
                          userValue: "2",
                          salvoReleaseVolume: "120",
                          energyConsumption: "1,37",
                          productivity: "0.4",
                          price: "82 800",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-3",
                          nameSeptik: "Аквалос 3",
                          pipeDepth: "50",
                          userValue: "2",
                          salvoReleaseVolume: "220",
                          energyConsumption: "1,37",
                          productivity: "0.6",
                          price: "93 150",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-4",
                          nameSeptik: "Аквалос 4",
                          pipeDepth: "60",
                          userValue: "4",
                          salvoReleaseVolume: "250",
                          energyConsumption: "1,37",
                          productivity: "0.8",
                          price: "106 200",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-4-gorizontalnij",
                          nameSeptik: "Аквалос 4 Гориз.",
                          pipeDepth: "30",
                          userValue: "4",
                          salvoReleaseVolume: "250",
                          energyConsumption: "0,9",
                          productivity: "0.8",
                          price: "120 600",
                          mounting: "32 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-5",
                          nameSeptik: "Аквалос 5",
                          pipeDepth: "60",
                          userValue: "5",
                          salvoReleaseVolume: "390",
                          energyConsumption: "1,37",
                          productivity: "0.9",
                          price: "116 100",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-5-gorizontalnij",
                          nameSeptik: "Аквалос 5 Гориз.",
                          pipeDepth: "30",
                          userValue: "5",
                          salvoReleaseVolume: "300",
                          energyConsumption: "0,9",
                          productivity: "0.9",
                          price: "130 050",
                        },
                        {
                          linkSeptik: "septik-akvalos-7",
                          nameSeptik: "Аквалос 7",
                          pipeDepth: "60",
                          userValue: "7",
                          salvoReleaseVolume: "550",
                          energyConsumption: "1,37",
                          productivity: "1.2",
                          price: "140 400",
                          mounting: "38 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-7-gorizontalnij",
                          nameSeptik: "Аквалос 7 Гориз.",
                          pipeDepth: "30",
                          userValue: "7",
                          salvoReleaseVolume: "550",
                          energyConsumption: "0,9",
                          productivity: "1.2",
                          price: "158 400",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-8",
                          nameSeptik: "Аквалос 8",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "700",
                          energyConsumption: "1,57",
                          productivity: "1.6",
                          price: "148 500",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-10",
                          nameSeptik: "Аквалос 10",
                          pipeDepth: "60",
                          userValue: "10",
                          salvoReleaseVolume: "900",
                          energyConsumption: "2,57",
                          productivity: "2.0",
                          price: "194 400",
                          mounting: "49 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-10-gorizontalnij",
                          nameSeptik: "Аквалос 10 Гориз.",
                          pipeDepth: "30",
                          userValue: "10",
                          salvoReleaseVolume: "800",
                          energyConsumption: "0,9",
                          productivity: "2.0",
                          price: "201 600",
                          mounting: "51 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-15",
                          nameSeptik: "Аквалос 15",
                          pipeDepth: "60",
                          userValue: "15",
                          salvoReleaseVolume: "1125",
                          energyConsumption: "2,57",
                          productivity: "3.0",
                          price: "253 800",
                          mounting: "55 000",
                        },
                        {
                          linkSeptik: "septik-akvalos-20",
                          nameSeptik: "Аквалос 20",
                          pipeDepth: "60",
                          userValue: "20",
                          salvoReleaseVolume: "1350",
                          energyConsumption: "1,5",
                          productivity: "4.0",
                          price: "323 100",
                          mounting: "60 000",
                        },
                        {
                          linkSeptik: "septik-topas-4",
                          nameSeptik: "Топас 4",
                          pipeDepth: "60",
                          userValue: "4",
                          salvoReleaseVolume: "175",
                          energyConsumption: "1",
                          productivity: "0.8",
                          price: "122 310",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-topas-5",
                          nameSeptik: "Топас 5",
                          pipeDepth: "60",
                          userValue: "5",
                          salvoReleaseVolume: "220",
                          energyConsumption: "1",
                          productivity: "1",
                          price: "143 550",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-topas-6",
                          nameSeptik: "Топас 6",
                          pipeDepth: "60",
                          userValue: "6",
                          salvoReleaseVolume: "250",
                          energyConsumption: "1",
                          productivity: "1.15",
                          price: "144 810",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-topas-8",
                          nameSeptik: "Топас 8",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "440",
                          energyConsumption: "1",
                          productivity: "1.5",
                          price: "166 410",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-topas-9",
                          nameSeptik: "Топас 9",
                          pipeDepth: "60",
                          userValue: "9",
                          salvoReleaseVolume: "510",
                          energyConsumption: "1",
                          productivity: "1.7",
                          price: "168 390",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-topas-10",
                          nameSeptik: "Топас 10",
                          pipeDepth: "60",
                          userValue: "10",
                          salvoReleaseVolume: "760",
                          energyConsumption: "2",
                          productivity: "2",
                          price: "226 710",
                          mounting: "49 000",
                        },
                        {
                          linkSeptik: "septik-topas-12",
                          nameSeptik: "Топас 12",
                          pipeDepth: "60",
                          userValue: "12",
                          salvoReleaseVolume: "830",
                          energyConsumption: "2",
                          productivity: "2.2",
                          price: "228 870",
                          mounting: "55 000",
                        },
                        {
                          linkSeptik: "septik-astra-3",
                          nameSeptik: "Астра 3",
                          pipeDepth: "60",
                          userValue: "3",
                          salvoReleaseVolume: "130",
                          energyConsumption: "1",
                          productivity: "0.6",
                          price: "102 000",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-astra-4",
                          nameSeptik: "Астра 4",
                          pipeDepth: "60",
                          userValue: "4",
                          salvoReleaseVolume: "150",
                          energyConsumption: "1",
                          productivity: "0.8",
                          price: "106 250",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-astra-5",
                          nameSeptik: "Астра 5",
                          pipeDepth: "60",
                          userValue: "5",
                          salvoReleaseVolume: "250",
                          energyConsumption: "1.5",
                          productivity: "1",
                          price: "123 250",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-astra-6",
                          nameSeptik: "Астра 6",
                          pipeDepth: "60",
                          userValue: "6",
                          salvoReleaseVolume: "280",
                          energyConsumption: "1.5",
                          productivity: "1.2",
                          price: "130 050",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-astra-7",
                          nameSeptik: "Астра 7",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "300",
                          energyConsumption: "1.5",
                          productivity: "1.4",
                          price: "136 850",
                          mounting: "38 000",
                        },
                        {
                          linkSeptik: "septik-astra-8",
                          nameSeptik: "Астра 8",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "350",
                          energyConsumption: "1.5",
                          productivity: "1.6",
                          price: "148 699",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-astra-9",
                          nameSeptik: "Астра 9",
                          pipeDepth: "60",
                          userValue: "9",
                          salvoReleaseVolume: "450",
                          energyConsumption: "1.5",
                          productivity: "1.8",
                          price: "169 150",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-astra-10",
                          nameSeptik: "Астра 10",
                          pipeDepth: "60",
                          userValue: "10",
                          salvoReleaseVolume: "550",
                          energyConsumption: "1.5",
                          productivity: "2",
                          price: "196 350",
                          mounting: "49 000",
                        },
                        {
                          linkSeptik: "septik-astra-15",
                          nameSeptik: "Астра 15",
                          pipeDepth: "60",
                          userValue: "15",
                          salvoReleaseVolume: "600",
                          energyConsumption: "2.4",
                          productivity: "3",
                          price: "255 000",
                          mounting: "55 000",
                        },
                        {
                          linkSeptik: "septik-malahit-4",
                          nameSeptik: "Малахит 4",
                          pipeDepth: "60",
                          userValue: "4",
                          salvoReleaseVolume: "220",
                          energyConsumption: "1.2",
                          productivity: "0.9",
                          price: "116 494",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-malahit-5",
                          nameSeptik: "Малахит 5",
                          pipeDepth: "60",
                          userValue: "5",
                          salvoReleaseVolume: "263",
                          energyConsumption: "1.5",
                          productivity: "1",
                          price: "137 694",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-malahit-6",
                          nameSeptik: "Малахит 6",
                          pipeDepth: "60",
                          userValue: "6",
                          salvoReleaseVolume: "290",
                          energyConsumption: "1.5",
                          productivity: "1.2",
                          price: "153 594",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-malahit-8",
                          nameSeptik: "Малахит 8",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "420",
                          energyConsumption: "1.7",
                          productivity: "1.6",
                          price: "185 394",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-malahit-10",
                          nameSeptik: "Малахит 10",
                          pipeDepth: "60",
                          userValue: "10",
                          salvoReleaseVolume: "500",
                          energyConsumption: "1.7",
                          productivity: "2",
                          price: "222 494",
                          mounting: "49 000",
                        },
                        {
                          linkSeptik: "septik-malahit-12",
                          nameSeptik: "Малахит 12",
                          pipeDepth: "60",
                          userValue: "12",
                          salvoReleaseVolume: "645",
                          energyConsumption: "1.7",
                          productivity: "2.5",
                          price: "243 694",
                          mounting: "55 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-3",
                          nameSeptik: "Евролос БИО 3",
                          pipeDepth: "60",
                          userValue: "3",
                          salvoReleaseVolume: "150",
                          energyConsumption: "1",
                          productivity: "0.6",
                          price: "116 900",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-4",
                          nameSeptik: "Евролос БИО 4",
                          pipeDepth: "60",
                          userValue: "4",
                          salvoReleaseVolume: "180",
                          energyConsumption: "1.2",
                          productivity: "0.8",
                          price: "122 300",
                          mounting: "27 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-5",
                          nameSeptik: "Евролос БИО 5",
                          pipeDepth: "60",
                          userValue: "5",
                          salvoReleaseVolume: "210",
                          energyConsumption: "1.5",
                          productivity: "1",
                          price: "129 400",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-6",
                          nameSeptik: "Евролос БИО 6",
                          pipeDepth: "60",
                          userValue: "6",
                          salvoReleaseVolume: "270",
                          energyConsumption: "1.5",
                          productivity: "1.3",
                          price: "142 500",
                          mounting: "34 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-8",
                          nameSeptik: "Евролос БИО 8",
                          pipeDepth: "60",
                          userValue: "8",
                          salvoReleaseVolume: "370",
                          energyConsumption: "1.5",
                          productivity: "1.6",
                          price: "166 800",
                          mounting: "40 000",
                        },
                        {
                          linkSeptik: "septik-evrolos-bio-10",
                          nameSeptik: "Евролос БИО 10",
                          pipeDepth: "60",
                          userValue: "10",
                          salvoReleaseVolume: "550",
                          energyConsumption: "1.7",
                          productivity: "2",
                          price: "208 700",
                          mounting: "49 000",
                        },
                        {
                          linkSeptik: "septik-malahit-12",
                          nameSeptik: "Евролос БИО 12",
                          pipeDepth: "60",
                          userValue: "12",
                          salvoReleaseVolume: "680",
                          energyConsumption: "1.7",
                          productivity: "2.4",
                          price: "228 600",
                          mounting: "55 000",
                        },
                      ],
                      t = document.querySelector(
                        ".form-qwiz__input-number  input",
                      );
                    function s() {
                      let e = (150 * Number(i()) * 1.2) / 1e3;
                      return e <= 0.4 && (e = 0.4), e;
                    }
                    function i() {
                      const e = document.querySelector(".noUi-handle");
                      return "10+" === e.ariaValueText
                        ? t.value
                        : e.ariaValueText;
                    }
                    function n() {
                      const e = document.querySelectorAll(
                        ".form-qwiz__count-plumbing",
                      );
                      let t = 0,
                        s = 0;
                      return (
                        e.forEach((e) => {
                          let i = e.dataset.plumbingValue;
                          (s = i * e.value), (t += s);
                        }),
                        t
                      );
                    }
                    function o() {
                      let t = (s() + n() / 1e3 / 2).toFixed(1);
                      t >= 4 && (t = 4);
                      r(l(e, +t, +t, []).slice(0, 3));
                    }
                    function l(e, t, s, i) {
                      for (let n = 0; n < e.length; n++)
                        t <= e[n].productivity &&
                          e[n].productivity <= s &&
                          (i.push(e[n]), e.splice(n, 1));
                      return s >= 4 ? i : l(e, t, s + 0.1, i);
                    }
                    function r(e) {
                      const t = document.querySelectorAll(
                          ".form-qwiz__content-finish",
                        ),
                        s = document.querySelector(".form-qwiz__sum-finish");
                      let i = a(e);
                      const [n, o] = i;
                      s.innerHTML = o;
                      const l = document.getElementById("finish-sum_input");
                      if ((l && (l.value = o), i))
                        for (let s = 0; s < t.length; s++) {
                          const i = t[s];
                          0 !== s
                            ? (i.innerHTML =
                                n[s] +
                                '<input type="hidden" name="' +
                                i.previousElementSibling.innerText +
                                '" value="' +
                                n[s] +
                                '">')
                            : c(i, e);
                        }
                    }
                    function a(e) {
                      if (0 === e.length) return;
                      const t = { link: "" };
                      (t.userValue = i()),
                        (t.plannedSalvoRelease = `${n()} л`),
                        (t.salvoReleaseVolume = `${e[0].salvoReleaseVolume} л`),
                        (t.price = `~${e[0].price} р.`),
                        (t.pipeDepth = `от ${e[0].pipeDepth} см`),
                        (t.deliveryPrice = "9100 р."),
                        (t.productivity = `${e[0].productivity} м3`),
                        (t.mounting = `${e[0].mounting} р.`),
                        (t.energyConsumption = `${e[0].energyConsumption} кВт/сутки`);
                      const s = document.querySelectorAll(
                        'input[name="Количество колец"]',
                      );
                      let o = 0,
                        l = document.querySelector(
                          'input[name="Количество колец"]:checked',
                        );
                      l && (o = l.dataset.price);
                      let r = new Intl.NumberFormat("ru", {}).format(
                        Number(e[0].price.replace(/\s+/g, "")) +
                          Number(e[0].mounting.replace(/\s+/g, "")) +
                          9100 +
                          Number(o),
                      );
                      return (
                        console.log(
                          (function (e) {
                            let t = 0;
                            return (
                              e.forEach((e) => {
                                e.checked && (t = e.value);
                              }),
                              Number(t)
                            );
                          })(s),
                        ),
                        [Object.values(t), `${r} р.`]
                      );
                    }
                    function c(e, t) {
                      let s = "",
                        i = e.previousElementSibling.innerText,
                        n = e.firstChild;
                      for (let i = 0; i < 3; i++) {
                        let o = document.createElement("a");
                        t[i] &&
                          (o.setAttribute(
                            "href",
                            `https://sewera.ru/products/${t[i].linkSeptik}`,
                          ),
                          o.setAttribute("target", "_blank"),
                          i < 2
                            ? ((s += `${t[i].nameSeptik}, `),
                              (o.innerHTML = `${t[i].nameSeptik}, `))
                            : ((s += `${t[i].nameSeptik}`),
                              (o.innerHTML = `${t[i].nameSeptik}`)),
                          e.insertBefore(o, n));
                      }
                      e.insertAdjacentHTML(
                        "beforeend",
                        '<input type="hidden" name="' +
                          i +
                          '" value="' +
                          s +
                          '">',
                      );
                    }
                    o();
                  })(),
                  (E.style.display = "none"),
                  U("Итоги")),
                S[P].closest("._additional-question") && q)
              )
                return (
                  (E.style.display = "none"),
                  U("Дополнительный вопрос"),
                  void I(P - 1, P)
                );
              I(P - 1, P);
            }
          }
          function R() {
            let e = re(D);
            return (
              3 == P && e && _.classList.remove("_disabled"),
              1 == P && _.classList.remove("_disabled"),
              E && (E.style.display = "flex"),
              P === S.length - 2 && x.parentNode.classList.remove("_ready"),
              P === S.length - 3 && _.classList.remove("_disabled"),
              P--,
              S[P].closest("._additional-question") && !q
                ? (I(P + 1, P - 1), (P = 2), void U(` ${P + 1}`))
                : S[P].closest("._additional-question") && q
                  ? ((E.style.display = "none"),
                    U("Дополнительный вопрос"),
                    void I(P + 1, P))
                  : (U(P + 1),
                    0 === P &&
                      ((b.style.display = "none"),
                      (k.style.justifyContent = "flex-end"),
                      b.classList.add("_disabled"),
                      (b.disabled = !0)),
                    (_.disabled = !1),
                    void I(P + 1, P))
            );
          }
          function j() {
            for (let e = 0; e < y.length; e++) {
              if (y[e].checked) return void (L = !0);
            }
            L = !1;
          }
          function U(e) {
            x.innerHTML = e;
          }
          function I(e, t) {
            S[e].classList.remove("_current"), S[t].classList.add("_current");
          }
          O.forEach((e) => {
            e.addEventListener("change", () => {
              q = "Дренажный колодец" === e.value;
            });
          }),
            H(B),
            H(D),
            H(T),
            C &&
              C.addEventListener("click", function (e) {
                (P = 0),
                  (x.innerHTML = "Шаг 1"),
                  b.classList.add("_disabled"),
                  S[0].classList.add("_current"),
                  S[S.length - 1].classList.remove("_current"),
                  (k.style.display = "flex"),
                  (b.style.display = "none"),
                  (document.querySelector(
                    ".qwiz-section__progress-step",
                  ).style.display = "flex"),
                  (k.style.justifyContent = "flex-end"),
                  N(B),
                  N(D),
                  N(T);
              }),
            t &&
              t.addEventListener("submit", function (e) {
                e.preventDefault();
                var s = $(t);
                return (
                  $(".load__preloader").fadeIn("", function () {
                    $.ajax({
                      type: "POST",
                      url: "/index.php?route=common/footer/quiz_submit",
                      data: s.serialize(),
                      dataType: "json",
                    }).done(function (e) {
                      e.success && ($(".load__preloader").fadeOut("slow"), M());
                    });
                  }),
                  !1
                );
              });
        }
      })(),
      (function () {
        const e = document.querySelector(".form-qwiz__input-number  input");
        e &&
          (e.addEventListener("keydown", (e) => {
            "Enter" === e.key && e.preventDefault();
          }),
          e.addEventListener("input", (t) => {
            const s = document.querySelector(".qwiz-section__next-btn");
            t.target.value > 50 && ((t.target.value = 50), (t.target.max = 50)),
              (e.value = e.value.replace(/[^0-9]/g, "")),
              0 !== e.value.length
                ? (s.classList.remove("_disabled"), (s.disabled = !1))
                : (s.classList.add("_disabled"), (s.disabled = !0));
          }));
      })(),
      (function (e) {
        const t = document.querySelectorAll(".form-qwiz__btns-plumbing");
        t &&
          t.forEach((e) => {
            e.addEventListener("click", function (t) {
              let s = t.target;
              if (s.closest("._plus-plumbing")) {
                if (e.children[1].value >= 5) return;
                e.children[1].value++;
              }
              if (s.closest("._minus-plumbing")) {
                if (e.children[1].value <= 0) return;
                e.children[1].value--;
              }
            });
          });
      })();
    new (class {
      constructor(e, t = null) {
        if (
          ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
          (this.selectClasses = {
            classSelect: "select",
            classSelectBody: "select__body",
            classSelectTitle: "select__title",
            classSelectValue: "select__value",
            classSelectLabel: "select__label",
            classSelectInput: "select__input",
            classSelectText: "select__text",
            classSelectLink: "select__link",
            classSelectOptions: "select__options",
            classSelectOptionsScroll: "select__scroll",
            classSelectOption: "select__option",
            classSelectContent: "select__content",
            classSelectRow: "select__row",
            classSelectData: "select__asset",
            classSelectDisabled: "_select-disabled",
            classSelectTag: "_select-tag",
            classSelectOpen: "_select-open",
            classSelectActive: "_select-active",
            classSelectFocus: "_select-focus",
            classSelectMultiple: "_select-multiple",
            classSelectCheckBox: "_select-checkbox",
            classSelectOptionSelected: "_select-selected",
          }),
          (this._this = this),
          this.config.init)
        ) {
          const e = t
            ? document.querySelectorAll(t)
            : document.querySelectorAll("select");
          e.length && this.selectsInit(e);
        }
      }
      getSelectClass(e) {
        return `.${e}`;
      }
      getSelectElement(e, t) {
        return {
          originalSelect: e.querySelector("select"),
          selectElement: e.querySelector(this.getSelectClass(t)),
        };
      }
      selectsInit(e) {
        e.forEach((e, t) => {
          this.selectInit(e, t + 1);
        }),
          document.addEventListener(
            "click",
            function (e) {
              this.selectsActions(e);
            }.bind(this),
          ),
          document.addEventListener(
            "keydown",
            function (e) {
              this.selectsActions(e);
            }.bind(this),
          ),
          document.addEventListener(
            "focusin",
            function (e) {
              this.selectsActions(e);
            }.bind(this),
          ),
          document.addEventListener(
            "focusout",
            function (e) {
              this.selectsActions(e);
            }.bind(this),
          ),
          document.addEventListener(
            "input",
            function (e) {
              this.selectsActions(e);
            }.bind(this),
          );
      }
      selectInit(e, t) {
        const s = this;
        let i = document.createElement("div");
        if (
          (i.classList.add(this.selectClasses.classSelect),
          e.parentNode.insertBefore(i, e),
          i.appendChild(e),
          (e.hidden = !0),
          t && (e.dataset.id = t),
          i.insertAdjacentHTML(
            "beforeend",
            `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
          ),
          this.selectBuild(e),
          this.getSelectPlaceholder(e) &&
            ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
            this.getSelectPlaceholder(e).label.show))
        ) {
          this.getSelectElement(
            i,
            this.selectClasses.classSelectTitle,
          ).selectElement.insertAdjacentHTML(
            "afterbegin",
            `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(e).label.text ? this.getSelectPlaceholder(e).label.text : this.getSelectPlaceholder(e).value}</span>`,
          );
        }
        (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
          e.addEventListener("change", function (e) {
            s.selectChange(e);
          });
      }
      selectBuild(e) {
        const t = e.parentElement;
        (t.dataset.id = e.dataset.id),
          t.classList.add(
            e.getAttribute("class") ? `select_${e.getAttribute("class")}` : "",
          ),
          e.multiple
            ? t.classList.add(this.selectClasses.classSelectMultiple)
            : t.classList.remove(this.selectClasses.classSelectMultiple),
          e.hasAttribute("data-checkbox") && e.multiple
            ? t.classList.add(this.selectClasses.classSelectCheckBox)
            : t.classList.remove(this.selectClasses.classSelectCheckBox),
          this.setSelectTitleValue(t, e),
          this.setOptions(t, e),
          e.hasAttribute("data-search") && this.searchActions(t),
          e.hasAttribute("data-open") && this.selectAction(t),
          this.selectDisabled(t, e);
      }
      selectsActions(e) {
        const t = e.target,
          s = e.type;
        if (
          t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
          t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
        ) {
          const i = t.closest(".select")
              ? t.closest(".select")
              : document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${t.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`,
                ),
            n = this.getSelectElement(i).originalSelect;
          if ("click" === s) {
            if (!n.disabled)
              if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag),
                )
              ) {
                const e = t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag),
                  ),
                  s = document.querySelector(
                    `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`,
                  );
                this.optionAction(i, n, s);
              } else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTitle),
                )
              )
                this.selectAction(i);
              else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption),
                )
              ) {
                const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption),
                );
                this.optionAction(i, n, e);
              }
          } else if ("focusin" === s) {
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelect))
            ) {
              this.getSelectElement(
                i,
                this.selectClasses.classSelectOptions,
              ).selectElement.querySelectorAll(
                `.${this.selectClasses.classSelectOption}`,
              );
              i.classList.add(this.selectClasses.classSelectFocus);
            }
          } else
            "focusout" === s
              ? t.closest(
                  this.getSelectClass(this.selectClasses.classSelect),
                ) && i.classList.remove(this.selectClasses.classSelectFocus)
              : "keydown" === s && "Escape" === e.code
                ? this.selectsСlose()
                : "input" === s && this.searchActions(i);
        } else this.selectsСlose();
      }
      selectsСlose() {
        const e = document.querySelectorAll(
          `${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
        );
        e.length &&
          e.forEach((e) => {
            this.selectAction(e);
          });
      }
      selectAction(e) {
        const t = this.getSelectElement(e).originalSelect,
          s = this.getSelectElement(
            e,
            this.selectClasses.classSelectOptions,
          ).selectElement;
        s.classList.contains("_slide") ||
          (e.classList.toggle(this.selectClasses.classSelectOpen),
          i(s, t.dataset.speed));
      }
      setSelectTitleValue(e, t) {
        const s = this.getSelectElement(
            e,
            this.selectClasses.classSelectBody,
          ).selectElement,
          i = this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement;
        i && i.remove(),
          s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
      }
      getSelectTitleValue(e, t) {
        let s = this.getSelectedOptionsData(t, 2).html;
        if (
          (t.multiple &&
            t.hasAttribute("data-tags") &&
            ((s = this.getSelectedOptionsData(t)
              .elements.map(
                (t) =>
                  `<span role="button" data-select-id="${e.dataset.id}" data-value="${t.value}" class="_select-tag">${this.getSelectElementContent(t)}</span>`,
              )
              .join("")),
            t.dataset.tags &&
              document.querySelector(t.dataset.tags) &&
              ((document.querySelector(t.dataset.tags).innerHTML = s),
              t.hasAttribute("data-search") && (s = !1))),
          (s = s.length ? s : t.dataset.placeholder),
          this.getSelectedOptionsData(t).values.length
            ? e.classList.add(this.selectClasses.classSelectActive)
            : e.classList.remove(this.selectClasses.classSelectActive),
          t.hasAttribute("data-search"))
        )
          return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input  autocomplete="off" type="text" placeholder="${s}"  data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
        {
          const e =
            this.getSelectedOptionsData(t).elements.length &&
            this.getSelectedOptionsData(t).elements[0].dataset.class
              ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
              : "";
          return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
        }
      }
      getSelectElementContent(e) {
        const t = e.dataset.asset ? `${e.dataset.asset}` : "",
          s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
        let i = "";
        return (
          (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
          (i += t
            ? `<span class="${this.selectClasses.classSelectData}">`
            : ""),
          (i += t ? s : ""),
          (i += t ? "</span>" : ""),
          (i += t
            ? `<span class="${this.selectClasses.classSelectText}">`
            : ""),
          (i += e.textContent),
          (i += t ? "</span>" : ""),
          (i += t ? "</span>" : ""),
          i
        );
      }
      getSelectPlaceholder(e) {
        const t = Array.from(e.options).find((e) => !e.value);
        if (t)
          return {
            value: t.textContent,
            show: t.hasAttribute("data-show"),
            label: {
              show: t.hasAttribute("data-label"),
              text: t.dataset.label,
            },
          };
      }
      getSelectedOptionsData(e, t) {
        let s = [];
        return (
          e.multiple
            ? (s = Array.from(e.options)
                .filter((e) => e.value)
                .filter((e) => e.selected))
            : s.push(e.options[e.selectedIndex]),
          {
            elements: s.map((e) => e),
            values: s.filter((e) => e.value).map((e) => e.value),
            html: s.map((e) => this.getSelectElementContent(e)),
          }
        );
      }
      getOptions(e) {
        let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
          s = e.dataset.scroll
            ? `style="max-height:${e.dataset.scroll}px"`
            : "",
          i = Array.from(e.options);
        if (i.length > 0) {
          let n = "";
          return (
            ((this.getSelectPlaceholder(e) &&
              !this.getSelectPlaceholder(e).show) ||
              e.multiple) &&
              (i = i.filter((e) => e.value)),
            (n += t
              ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
              : ""),
            i.forEach((t) => {
              n += this.getOption(t, e);
            }),
            (n += t ? "</div>" : ""),
            n
          );
        }
      }
      getOption(e, t) {
        const s =
            e.selected && t.multiple
              ? ` ${this.selectClasses.classSelectOptionSelected}`
              : "",
          i =
            e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
          n = e.dataset.class ? ` ${e.dataset.class}` : "",
          o = !!e.dataset.href && e.dataset.href,
          l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
        let r = "";
        return (
          (r += o
            ? `<a ${l} ${i} href="${o}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
            : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
          (r += this.getSelectElementContent(e)),
          (r += o ? "</a>" : "</button>"),
          r
        );
      }
      setOptions(e, t) {
        this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement.innerHTML = this.getOptions(t);
      }
      optionAction(e, t, s) {
        if (t.multiple) {
          s.classList.toggle(this.selectClasses.classSelectOptionSelected);
          this.getSelectedOptionsData(t).elements.forEach((e) => {
            e.removeAttribute("selected");
          });
          e.querySelectorAll(
            this.getSelectClass(this.selectClasses.classSelectOptionSelected),
          ).forEach((e) => {
            t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
              "selected",
              "selected",
            );
          });
        } else
          t.hasAttribute("data-show-selected") ||
            (e.querySelector(
              `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
            ) &&
              (e.querySelector(
                `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
              ).hidden = !1),
            (s.hidden = !0)),
            (t.value = s.hasAttribute("data-value")
              ? s.dataset.value
              : s.textContent),
            this.selectAction(e);
        this.setSelectTitleValue(e, t), this.setSelectChange(t);
      }
      selectChange(e) {
        const t = e.target;
        this.selectBuild(t), this.setSelectChange(t);
      }
      setSelectChange(e) {
        const t = document.querySelector(".calc-wells__btn"),
          s = document.querySelector('select[data-id="1"]'),
          i = document.getElementById("obustroystva-calc");
        let n;
        if (
          (document.querySelector(".select__input") &&
            document.querySelector(".calc-wells__inpt") &&
            (n =
              document.querySelector(".calc-wells__inpt").value ||
              document.querySelector(".select__input").dataset.placeholder),
          !i &&
            1 == e.dataset.id &&
            s.value &&
            n &&
            (t.classList.remove("_disable"), (t.disabled = !1)),
          i &&
            2 == e.dataset.id &&
            t &&
            document.querySelector(".calc-wells__inpt").value &&
            (t.classList.remove("_disable"), (t.disabled = !1)),
          !i &&
            3 == e.dataset.id &&
            t &&
            document.querySelector(".select__input").dataset.placeholder &&
            s.value &&
            (t.classList.remove("_disable"), (t.disabled = !1)),
          e.hasAttribute("data-validate"),
          e.hasAttribute("data-submit") && e.value)
        ) {
          let t = document.createElement("button");
          (t.type = "submit"),
            e.closest("form").append(t),
            t.click(),
            t.remove();
        }
        const o = e.parentElement;
        this.selectCallback(o, e);
      }
      selectDisabled(e, t) {
        t.disabled
          ? (e.classList.add(this.selectClasses.classSelectDisabled),
            (this.getSelectElement(
              e,
              this.selectClasses.classSelectTitle,
            ).selectElement.disabled = !0))
          : (e.classList.remove(this.selectClasses.classSelectDisabled),
            (this.getSelectElement(
              e,
              this.selectClasses.classSelectTitle,
            ).selectElement.disabled = !1));
      }
      searchActions(e) {
        this.getSelectElement(e).originalSelect;
        const t = this.getSelectElement(
            e,
            this.selectClasses.classSelectInput,
          ).selectElement,
          s = this.getSelectElement(
            e,
            this.selectClasses.classSelectOptions,
          ).selectElement;
        s
          .querySelectorAll(`.${this.selectClasses.classSelectOption}`)
          .forEach((e) => {
            e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
              ? (e.hidden = !1)
              : (e.hidden = !0);
          }),
          !0 === s.hidden && this.selectAction(e);
      }
      selectCallback(e, t) {
        document.dispatchEvent(
          new CustomEvent("selectCallback", { detail: { select: t } }),
        );
      }
    })();
    function ae() {
      return (
        !!window.matchMedia("(min-width: 1023.98px)").matches ||
        ((function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const s = t.closest("[data-goto]"),
                  i = s.dataset.goto ? s.dataset.goto : "",
                  n = !!s.hasAttribute("data-goto-header"),
                  o = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                ce(i, n, o), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                s = t.target;
              if ("navigator" === s.dataset.watch) {
                const e = s.id,
                  i =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${e}"]`));
                t.isIntersecting
                  ? i && i.classList.add("_navigator-active")
                  : i && i.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })(),
        !1)
      );
    }
    window.addEventListener("resize", ae),
      (function () {
        if (document.querySelector(".calc-wells")) {
          const e = document.querySelector('select[data-id="1"]'),
            t = document.querySelector('select[name="Вид обустройства"]'),
            s = document.querySelector('select[name="Район бурения"]'),
            i = document.querySelector(".calc-wells__inpt"),
            n = document.querySelector(".calc-wells__select"),
            o = document.querySelector("#int"),
            l = document.querySelector("#calc"),
            r = document.querySelector(".calc-wells__btn"),
            a = document.querySelector(".calc-wells__bg-img"),
            c = document.querySelector(".calc-wells__finish"),
            d = document.getElementById("obustroystva-calc"),
            u = document.getElementById("mgbu"),
            p = document.querySelector(".calc-wells__sum");
          let m = !0,
            h = 0;
          function f() {
            function e(e, t, s, n, o) {
              e.classList.remove("_active"),
                t.classList.add("_active"),
                (n.hidden = !0),
                (s.hidden = !1),
                (m = o),
                (i.value = ""),
                r.classList.add("_disable"),
                (r.disabled = !0),
                document.querySelector(".select__input") &&
                  ((document.querySelector(".select__input").placeholder =
                    "Район бурения"),
                  (document.querySelector(
                    ".select__input",
                  ).dataset.placeholder = ""));
            }
            o && o.addEventListener("click", (t) => e(l, o, i, n, !0)),
              l && l.addEventListener("click", (t) => e(o, l, n, i, !1));
          }
          function v(e) {
            let t = m ? i.value : g(s),
              n = u ? 4e3 : 3650;
            if ((t < 40 && (t = 40), d)) {
              let e = 570,
                s = document.querySelector(
                  'select[name="Вид обустройства"] option:checked',
                ),
                i = 0;
              s && (i = s.dataset.price),
                (t = +t / 2),
                t > 70 && (e = 740),
                (h = String(+t * +e + +i));
            } else {
              let e = document.querySelector(
                  'select[name="Вид обустройства"] option:checked',
                ),
                s = e.dataset.price ? e.dataset.price : 0;
              t > 80 && (n += 100), (h = String(+n * +t + +s));
            }
            const o = h
              .split("")
              .reverse()
              .map((e, t) => (0 == t ? e : t % 3 == 0 ? `${e} ` : e))
              .reverse()
              .join("");
            o &&
              (ae() ? y() : c.classList.add("_animat-mob"),
              (c.hidden = !1),
              (p.innerHTML = `${o} р.`),
              (document.getElementById("calc-wells__sum").value = o));
          }
          function g(e) {
            return e.querySelector(`option[value="${e.value}"]`).dataset
              .valueDepth;
          }
          function y() {
            a.classList.add("_animat"), c.classList.add("_animat");
          }
          document.querySelector(".select__input") &&
            (document.querySelector(".select__input").dataset.placeholder = ""),
            f(),
            r.addEventListener("click", v),
            i.addEventListener("input", (s) => {
              const n = u ? 150 : 250;
              if (
                (s.target.value > n &&
                  ((s.target.value = n), (s.target.max = n)),
                d &&
                  t.value &&
                  ((r.disabled = 0 === i.value.trim().length),
                  r.classList.remove("_disable")),
                "" !== i.value && e.value)
              )
                return (r.disabled = !1), void r.classList.remove("_disable");
              "" === i.value &&
                ((r.disabled = !0), r.classList.add("_disable"));
            });
          const S = document.getElementById("calc-wells__finish");
          S &&
            S.addEventListener("submit", function (e) {
              e.preventDefault();
              var t = $(S);
              return (
                $(".load__preloader").fadeIn("", function () {
                  $.ajax({
                    type: "POST",
                    url: "/index.php?route=common/footer/quiz_submit",
                    data: t.serialize(),
                    dataType: "json",
                  }).done(function (e) {
                    e.success &&
                      ((window.location.href = "https://sewera.ru/sent/"),
                      $(".load__preloader").fadeOut("slow"));
                  });
                }),
                !1
              );
            });
        }
      })();
    let ce = (e, t = !1, s = 500, i = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let e = "",
          o = 0;
        t &&
          ((e = "header.header"), (o = document.querySelector(e).offsetHeight));
        let l = {
          speedAsDuration: !0,
          speed: s,
          header: e,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            menuClose(),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", l);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: o ? e - o : e, behavior: "smooth" });
        }
      }
    };
    document.querySelectorAll(".popolar-services__btn").forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const s = Array.from(e).filter(function (e, t, s) {
            return !e.dataset.spollers.split(",")[0];
          });
          function n(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    o(e),
                    e.addEventListener("click", l))
                  : (e.classList.remove("_spoller-init"),
                    o(e, !1),
                    e.removeEventListener("click", l));
            });
          }
          function o(e, t = !0) {
            const s = e.querySelectorAll("[data-spoller]");
            s.length > 0 &&
              s.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              });
          }
          function l(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const s = t.closest("[data-spoller]"),
                n = s.closest("[data-spollers]"),
                o = !!n.hasAttribute("data-one-spoller");
              n.querySelectorAll("._slide").length ||
                (o && !s.classList.contains("_spoller-active") && r(n),
                s.classList.toggle("_spoller-active"),
                i(s.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function r(e) {
            const s = e.querySelector("[data-spoller]._spoller-active");
            s &&
              (s.classList.remove("_spoller-active"),
              t(s.nextElementSibling, 500));
          }
          s.length && n(s);
        }
      })(),
      (function () {
        const e = document.querySelectorAll("[data-tabs]");
        let i = [""];
        if (e.length > 0) {
          "#tab-0-1".startsWith("tab-") && (i = "#tab-0-1"),
            setTimeout(() => {
              e.forEach((e, t) => {
                e.classList.add("_tab-init"),
                  e.setAttribute("data-tabs-index", t),
                  e.addEventListener("click", n),
                  (function (e) {
                    const t = e.querySelectorAll("[data-tabs-titles]>*"),
                      s = e.querySelectorAll("[data-tabs-body]>*"),
                      n = e.dataset.tabsIndex,
                      o = i[0] == n;
                    if (o) {
                      e.querySelector(
                        "[data-tabs-titles]>._tab-active",
                      ).classList.remove("_tab-active");
                    }
                    s.length > 0 &&
                      s.forEach((e, s) => {
                        t[s].setAttribute("data-tabs-title", ""),
                          e.setAttribute("data-tabs-item", ""),
                          o && s == i[1] && t[s].classList.add("_tab-active"),
                          (e.hidden = !t[s].classList.contains("_tab-active"));
                      });
                  })(e);
              });
            }, 30);
        }
        function n(e) {
          const i = e.target;
          if (!i.closest(".block__more") && i.closest("[data-tabs-title]")) {
            setTimeout(() => {
              c();
            }, 10);
            const n = i.closest("[data-tabs-title]"),
              o = n.closest("[data-tabs]");
            if (
              !n.classList.contains("_tab-active") &&
              !o.querySelectorAll("._slide").length
            ) {
              const e = o.querySelector("[data-tabs-title]._tab-active");
              e && e.classList.remove("_tab-active"),
                n.classList.add("_tab-active"),
                (function (e) {
                  const i = e.querySelectorAll("[data-tabs-title]"),
                    n = e.querySelectorAll("[data-tabs-item]"),
                    o = e.dataset.tabsIndex,
                    l = (function (e) {
                      if (e.hasAttribute("data-tabs-animate"))
                        return e.dataset.tabsAnimate > 0
                          ? e.dataset.tabsAnimate
                          : 500;
                    })(e);
                  n.length > 0 &&
                    n.forEach((e, n) => {
                      i[n].classList.contains("_tab-active")
                        ? (l ? s(e, l) : (e.hidden = !1),
                          e.closest(".popup") ||
                            (location.hash = `tab-${o}-${n}`))
                        : l
                          ? t(e, l)
                          : (e.hidden = !0);
                    });
                })(o);
            }
            e.preventDefault();
          }
        }
      })(),
      c(),
      new e({}),
      $(window).on("load", function () {
        !(function (e) {
          function t(e) {
            var t = $(e),
              s = $(".splitpic-left-image", t),
              i = ($(".splitpic-right-image", t), $(".splitpic-bar", t)),
              n = !1;
            function o(e, n) {
              var o;
              n ? (o = e) : (o = e - t.offset().left);
              s.css("clip", "rect(0px, " + o + "px, auto, 0px)"),
                i.css("left", o - i.width() / 2 + "px");
            }
            var l = parseInt(t.attr("data-start-percent"));
            isNaN(l) && (l = 50), (l /= 100), o(t.width() * l, !0);
            var r = !1,
              a = 0,
              c = 0;
            t.on("touchmove touchstart", function (e) {
              var s;
              if (
                (n || ($(".splitpic-info", t).fadeOut(200), (n = !0)),
                e.touches
                  ? (s = e.touches)
                  : e.originalEvent &&
                    e.originalEvent.touches &&
                    (s = e.originalEvent.touches),
                s)
              ) {
                var i = s[0],
                  l = 0,
                  d = 0;
                r ? ((l = i.pageX - a), (d = i.pageY - c)) : (r = !0),
                  Math.abs(l) > Math.abs(d) &&
                    (e.preventDefault(), o(s[0].pageX)),
                  (a = i.pageX),
                  (c = i.pageY);
              }
            }),
              t.on("touchend", function (e) {
                r = !1;
              }),
              t.on("mouseenter mousemove mouseleave", function (e) {
                n || ($(".splitpic-info", t).fadeOut(200), (n = !0)),
                  o(e.pageX);
              });
          }
          (e.SplitPic = t), (e.SplitPic = t);
        })(window),
          $(".splitpic-horizontal .splitpic-images").each(function (e, t) {
            new SplitPic(t);
          });
      });
  })();
})();
