(() => {
  var e = {
      144: function (e) {
        e.exports = (function () {
          "use strict";
          const e = "undefined" != typeof window,
            t =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = e && window.devicePixelRatio > 1,
            o = {
              elements_selector: ".lazy",
              container: t || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            n = (e) => Object.assign({}, o, e),
            s = function (e, t) {
              let i;
              const o = "LazyLoad::Initialized",
                n = new e(t);
              try {
                i = new CustomEvent(o, { detail: { instance: n } });
              } catch (e) {
                (i = document.createEvent("CustomEvent")),
                  i.initCustomEvent(o, !1, !1, { instance: n });
              }
              window.dispatchEvent(i);
            },
            r = "src",
            a = "srcset",
            l = "sizes",
            c = "poster",
            d = "llOriginalAttrs",
            m = "data",
            p = "loading",
            u = "loaded",
            h = "applied",
            g = "error",
            _ = "native",
            L = "data-",
            f = "ll-status",
            v = (e, t) => e.getAttribute(L + t),
            y = (e) => v(e, f),
            P = (e, t) =>
              ((e, t, i) => {
                const o = L + t;
                null !== i ? e.setAttribute(o, i) : e.removeAttribute(o);
              })(e, f, t),
            b = (e) => P(e, null),
            w = (e) => null === y(e),
            E = (e) => y(e) === _,
            A = [p, u, h, g],
            k = (e, t, i, o) => {
              e &&
                "function" == typeof e &&
                (void 0 === o ? (void 0 === i ? e(t) : e(t, i)) : e(t, i, o));
            },
            T = (t, i) => {
              e && "" !== i && t.classList.add(i);
            },
            x = (t, i) => {
              e && "" !== i && t.classList.remove(i);
            },
            C = (e) => e.llTempImage,
            S = (e, t) => {
              if (!t) return;
              const i = t._observer;
              i && i.unobserve(e);
            },
            I = (e, t) => {
              e && (e.loadingCount += t);
            },
            M = (e, t) => {
              e && (e.toLoadCount = t);
            },
            B = (e) => {
              let t = [];
              for (let i, o = 0; (i = e.children[o]); o += 1)
                "SOURCE" === i.tagName && t.push(i);
              return t;
            },
            H = (e, t) => {
              const i = e.parentNode;
              i && "PICTURE" === i.tagName && B(i).forEach(t);
            },
            q = (e, t) => {
              B(e).forEach(t);
            },
            O = [r],
            V = [r, c],
            z = [r, a, l],
            N = [m],
            R = (e) => !!e[d],
            D = (e) => e[d],
            G = (e) => delete e[d],
            j = (e, t) => {
              if (R(e)) return;
              const i = {};
              t.forEach((t) => {
                i[t] = e.getAttribute(t);
              }),
                (e[d] = i);
            },
            $ = (e, t) => {
              if (!R(e)) return;
              const i = D(e);
              t.forEach((t) => {
                ((e, t, i) => {
                  i ? e.setAttribute(t, i) : e.removeAttribute(t);
                })(e, t, i[t]);
              });
            },
            F = (e, t, i) => {
              T(e, t.class_applied),
                P(e, h),
                i &&
                  (t.unobserve_completed && S(e, t),
                  k(t.callback_applied, e, i));
            },
            J = (e, t, i) => {
              T(e, t.class_loading),
                P(e, p),
                i && (I(i, 1), k(t.callback_loading, e, i));
            },
            U = (e, t, i) => {
              i && e.setAttribute(t, i);
            },
            W = (e, t) => {
              U(e, l, v(e, t.data_sizes)),
                U(e, a, v(e, t.data_srcset)),
                U(e, r, v(e, t.data_src));
            },
            Q = {
              IMG: (e, t) => {
                H(e, (e) => {
                  j(e, z), W(e, t);
                }),
                  j(e, z),
                  W(e, t);
              },
              IFRAME: (e, t) => {
                j(e, O), U(e, r, v(e, t.data_src));
              },
              VIDEO: (e, t) => {
                q(e, (e) => {
                  j(e, O), U(e, r, v(e, t.data_src));
                }),
                  j(e, V),
                  U(e, c, v(e, t.data_poster)),
                  U(e, r, v(e, t.data_src)),
                  e.load();
              },
              OBJECT: (e, t) => {
                j(e, N), U(e, m, v(e, t.data_src));
              },
            },
            X = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            Y = (e, t) => {
              !t ||
                ((e) => e.loadingCount > 0)(t) ||
                ((e) => e.toLoadCount > 0)(t) ||
                k(e.callback_finish, t);
            },
            Z = (e, t, i) => {
              e.addEventListener(t, i), (e.llEvLisnrs[t] = i);
            },
            K = (e, t, i) => {
              e.removeEventListener(t, i);
            },
            ee = (e) => !!e.llEvLisnrs,
            te = (e) => {
              if (!ee(e)) return;
              const t = e.llEvLisnrs;
              for (let i in t) {
                const o = t[i];
                K(e, i, o);
              }
              delete e.llEvLisnrs;
            },
            ie = (e, t, i) => {
              ((e) => {
                delete e.llTempImage;
              })(e),
                I(i, -1),
                ((e) => {
                  e && (e.toLoadCount -= 1);
                })(i),
                x(e, t.class_loading),
                t.unobserve_completed && S(e, i);
            },
            oe = (e, t, i) => {
              const o = C(e) || e;
              ee(o) ||
                ((e, t, i) => {
                  ee(e) || (e.llEvLisnrs = {});
                  const o = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  Z(e, o, t), Z(e, "error", i);
                })(
                  o,
                  (n) => {
                    ((e, t, i, o) => {
                      const n = E(t);
                      ie(t, i, o),
                        T(t, i.class_loaded),
                        P(t, u),
                        k(i.callback_loaded, t, o),
                        n || Y(i, o);
                    })(0, e, t, i),
                      te(o);
                  },
                  (n) => {
                    ((e, t, i, o) => {
                      const n = E(t);
                      ie(t, i, o),
                        T(t, i.class_error),
                        P(t, g),
                        k(i.callback_error, t, o),
                        i.restore_on_error && $(t, z),
                        n || Y(i, o);
                    })(0, e, t, i),
                      te(o);
                  },
                );
            },
            ne = (e, t, o) => {
              ((e) => X.indexOf(e.tagName) > -1)(e)
                ? ((e, t, i) => {
                    oe(e, t, i),
                      ((e, t, i) => {
                        const o = Q[e.tagName];
                        o && (o(e, t), J(e, t, i));
                      })(e, t, i);
                  })(e, t, o)
                : ((e, t, o) => {
                    ((e) => {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      oe(e, t, o),
                      ((e) => {
                        R(e) ||
                          (e[d] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      ((e, t, o) => {
                        const n = v(e, t.data_bg),
                          s = v(e, t.data_bg_hidpi),
                          a = i && s ? s : n;
                        a &&
                          ((e.style.backgroundImage = `url("${a}")`),
                          C(e).setAttribute(r, a),
                          J(e, t, o));
                      })(e, t, o),
                      ((e, t, o) => {
                        const n = v(e, t.data_bg_multi),
                          s = v(e, t.data_bg_multi_hidpi),
                          r = i && s ? s : n;
                        r && ((e.style.backgroundImage = r), F(e, t, o));
                      })(e, t, o),
                      ((e, t, i) => {
                        const o = v(e, t.data_bg_set);
                        if (!o) return;
                        let n = o.split("|").map((e) => `image-set(${e})`);
                        (e.style.backgroundImage = n.join()), F(e, t, i);
                      })(e, t, o);
                  })(e, t, o);
            },
            se = (e) => {
              e.removeAttribute(r), e.removeAttribute(a), e.removeAttribute(l);
            },
            re = (e) => {
              H(e, (e) => {
                $(e, z);
              }),
                $(e, z);
            },
            ae = {
              IMG: re,
              IFRAME: (e) => {
                $(e, O);
              },
              VIDEO: (e) => {
                q(e, (e) => {
                  $(e, O);
                }),
                  $(e, V),
                  e.load();
              },
              OBJECT: (e) => {
                $(e, N);
              },
            },
            le = (e, t) => {
              ((e) => {
                const t = ae[e.tagName];
                t
                  ? t(e)
                  : ((e) => {
                      if (!R(e)) return;
                      const t = D(e);
                      e.style.backgroundImage = t.backgroundImage;
                    })(e);
              })(e),
                ((e, t) => {
                  w(e) ||
                    E(e) ||
                    (x(e, t.class_entered),
                    x(e, t.class_exited),
                    x(e, t.class_applied),
                    x(e, t.class_loading),
                    x(e, t.class_loaded),
                    x(e, t.class_error));
                })(e, t),
                b(e),
                G(e);
            },
            ce = ["IMG", "IFRAME", "VIDEO"],
            de = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
            me = (e, t, i) => {
              e.forEach((e) =>
                ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                  ? ((e, t, i, o) => {
                      const n = ((e) => A.indexOf(y(e)) >= 0)(e);
                      P(e, "entered"),
                        T(e, i.class_entered),
                        x(e, i.class_exited),
                        ((e, t, i) => {
                          t.unobserve_entered && S(e, i);
                        })(e, i, o),
                        k(i.callback_enter, e, t, o),
                        n || ne(e, i, o);
                    })(e.target, e, t, i)
                  : ((e, t, i, o) => {
                      w(e) ||
                        (T(e, i.class_exited),
                        ((e, t, i, o) => {
                          i.cancel_on_exit &&
                            ((e) => y(e) === p)(e) &&
                            "IMG" === e.tagName &&
                            (te(e),
                            ((e) => {
                              H(e, (e) => {
                                se(e);
                              }),
                                se(e);
                            })(e),
                            re(e),
                            x(e, i.class_loading),
                            I(o, -1),
                            b(e),
                            k(i.callback_cancel, e, t, o));
                        })(e, t, i, o),
                        k(i.callback_exit, e, t, o));
                    })(e.target, e, t, i),
              );
            },
            pe = (e) => Array.prototype.slice.call(e),
            ue = (e) => e.container.querySelectorAll(e.elements_selector),
            he = (e) => ((e) => y(e) === g)(e),
            ge = (e, t) => ((e) => pe(e).filter(w))(e || ue(t)),
            _e = function (t, i) {
              const o = n(t);
              (this._settings = o),
                (this.loadingCount = 0),
                ((e, t) => {
                  de(e) ||
                    (t._observer = new IntersectionObserver(
                      (i) => {
                        me(i, e, t);
                      },
                      ((e) => ({
                        root: e.container === document ? null : e.container,
                        rootMargin: e.thresholds || e.threshold + "px",
                      }))(e),
                    ));
                })(o, this),
                ((t, i) => {
                  e &&
                    ((i._onlineHandler = () => {
                      ((e, t) => {
                        var i;
                        ((i = ue(e)), pe(i).filter(he)).forEach((t) => {
                          x(t, e.class_error), b(t);
                        }),
                          t.update();
                      })(t, i);
                    }),
                    window.addEventListener("online", i._onlineHandler));
                })(o, this),
                this.update(i);
            };
          return (
            (_e.prototype = {
              update: function (e) {
                const i = this._settings,
                  o = ge(e, i);
                var n, s;
                M(this, o.length),
                  t
                    ? this.loadAll(o)
                    : de(i)
                      ? ((e, t, i) => {
                          e.forEach((e) => {
                            -1 !== ce.indexOf(e.tagName) &&
                              ((e, t, i) => {
                                e.setAttribute("loading", "lazy"),
                                  oe(e, t, i),
                                  ((e, t) => {
                                    const i = Q[e.tagName];
                                    i && i(e, t);
                                  })(e, t),
                                  P(e, _);
                              })(e, t, i);
                          }),
                            M(i, 0);
                        })(o, i, this)
                      : ((s = o),
                        ((e) => {
                          e.disconnect();
                        })((n = this._observer)),
                        ((e, t) => {
                          t.forEach((t) => {
                            e.observe(t);
                          });
                        })(n, s));
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  e &&
                    window.removeEventListener("online", this._onlineHandler),
                  ue(this._settings).forEach((e) => {
                    G(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                const t = this._settings;
                ge(e, t).forEach((e) => {
                  S(e, this), ne(e, t, this);
                });
              },
              restoreAll: function () {
                const e = this._settings;
                ue(e).forEach((t) => {
                  le(t, e);
                });
              },
            }),
            (_e.load = (e, t) => {
              const i = n(t);
              ne(e, i);
            }),
            (_e.resetStatus = (e) => {
              b(e);
            }),
            e &&
              ((e, t) => {
                if (t)
                  if (t.length) for (let i, o = 0; (i = t[o]); o += 1) s(e, i);
                  else s(e, t);
              })(_e, window.lazyLoadOptions),
            _e
          );
        })();
      },
    },
    t = {};
  function i(o) {
    var n = t[o];
    if (void 0 !== n) return n.exports;
    var s = (t[o] = { exports: {} });
    return e[o].call(s.exports, s, s.exports, i), s.exports;
  }
  (() => {
    "use strict";
    let e = (e, t = 500, i = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !i),
              !i && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !i && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      t = (e, t = 500, i = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            i && e.style.removeProperty("height");
          let o = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = i ? `${i}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = o + "px"),
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
      };
    function o(e, t) {
      const i = Array.from(e).filter(function (e, i, o) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (i.length) {
        const e = [];
        i.forEach((i) => {
          const o = {},
            n = i.dataset[t].split(",");
          (o.value = n[0]),
            (o.type = n[1] ? n[1].trim() : "max"),
            (o.item = i),
            e.push(o);
        });
        let o = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        o = (function (e) {
          return e.filter(function (e, t, i) {
            return i.indexOf(e) === t;
          });
        })(o);
        const n = [];
        if (o.length)
          return (
            o.forEach((t) => {
              const i = t.split(","),
                o = i[1],
                s = i[2],
                r = window.matchMedia(i[0]),
                a = e.filter(function (e) {
                  if (e.value === o && e.type === s) return !0;
                });
              n.push({ itemsArray: a, matchMedia: r });
            }),
            n
          );
      }
    }
    new (i(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    let n = !1;
    setTimeout(() => {
      if (n) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0),
      (function () {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)',
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      })(),
      document.querySelector(".completed-work__slider") &&
        new Swiper(".completed-work__slider", {
          observer: !0,
          observeParents: !0,
          slidesPerView: 2,
          spaceBetween: 30,
          speed: 800,
          autoplay: !0,
          navigation: {
            nextEl: ".completed-work__nav .completed-work__next",
            prevEl: ".completed-work__nav .completed-work__prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.2 },
            430: { slidesPerView: 1.4, autoplay: { delay: 3e3 } },
            768: { autoplay: !1 },
            992: { slidesPerView: 2, autoplay: !1 },
          },
          on: {},
        }),
      document.querySelector(".brand-carusel__slider") &&
        new Swiper(".brand-carusel__slider", {
          observer: !0,
          observeParents: !0,
          slidesPerView: 3,
          spaceBetween: 30,
          speed: 800,
          autoHeight: !1,
          navigation: {
            nextEl: ".brand-carusel__nav .brand-carusel__next",
            prevEl: ".brand-carusel__nav .brand-carusel__prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.2 },
            430: { slidesPerView: 1.4, autoplay: { delay: 3e3 } },
            768: { autoplay: !1 },
            992: { slidesPerView: 3, autoplay: !1 },
          },
          on: {},
        }),
      document.querySelector(".popular-models__slider") &&
        new Swiper(".popular-models__slider", {
          observer: !0,
          observeParents: !0,
          watchSlidesProgress: !0,
          slidesPerView: 4,
          spaceBetween: 0,
          speed: 800,
          loop: !0,
          navigation: {
            nextEl: ".popular-models__nav .popular-models__next",
            prevEl: ".popular-models__nav .popular-models__prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.2 },
            430: { slidesPerView: 1.4, autoplay: { delay: 3e3 } },
            768: {},
            992: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          },
          on: {},
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
              zoom: 10,
              polygon: [
                [59.91451244953035, 29.67590880347055],
                [59.82950054701618, 29.784738553817334],
                [59.73740150910916, 30.150876711061073],
                [59.789726474221965, 30.568925284545998],
                [59.9374544493777, 30.688872823430103],
                [60.06228622321896, 30.50018768261063],
                [60.09373976227138, 30.115462035517567],
                [60.013123983875914, 29.729527694210844],
                [59.91451244953035, 29.67590880347055],
              ],
            },
          ],
          t = document.querySelectorAll(".ya-map__tab");
        var i = new ymaps.Map(
          "map",
          { center: e[0].center, zoom: 8 },
          { searchControlProvider: "yandex#search" },
        );
        t &&
          t.forEach((o) => {
            const n = o.dataset.cityMap;
            let s = e.find((e) => n === e.city),
              r = new ymaps.Polygon(
                [s.polygon],
                { hintContent: "Многоугольник" },
                {
                  fillColor: "#009CD9",
                  strokeWidth: 1,
                  strokeColor: "#0067A0",
                  strokeOpacity: 1,
                  fillOpacity: 0.2,
                },
              );
            i.geoObjects.add(r),
              i.geoObjects.add(new ymaps.Placemark(s.center, {})),
              o.addEventListener("click", (e) => {
                i.setCenter(s.center, s.zoom),
                  o.closest("._active-tab-map") ||
                    (t.forEach((e) => e.classList.remove("_active-tab-map")),
                    o.classList.add("_active-tab-map"));
              });
          }),
          i.controls.remove("zoomControl"),
          i.controls.remove("geolocationControl"),
          i.controls.remove("searchControl"),
          i.controls.remove("trafficControl"),
          i.controls.remove("typeSelector"),
          i.controls.remove("fullscreenControl"),
          i.controls.remove("rulerControl"),
          i.behaviors.disable(["scrollZoom"]);
      });
    const s = document.querySelectorAll(".card-model__info-btn");
    s &&
      s.forEach((e) => {
        e.addEventListener("click", function (t) {
          e.classList.toggle("_show");
        }),
          document.addEventListener("click", (t) => {
            let i = t.target;
            e.contains(i) ||
              e.firstChild.contains(i) ||
              e.classList.remove("_show");
          });
      });
    const r = [
        {
          oneTopBtn: [
            {
              id: "1",
              img: "1",
              name: "Септик Аквалос 4",
              onePointList: "60",
              threePointList: "250",
              price: "106 200 ₽",
              discount: "118 000 ₽",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "1",
              name: "Септик Аквалос 4 ПР",
              onePointList: "60",
              threePointList: "230",
              price: "106 200 ₽",
              discount: "118 000 ₽",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "2-с",
              name: "Септик Тверь 0,35 П",
              onePointList: "30",
              threePointList: "120",
              price: "108 900 ₽",
              discount: "",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "2-п",
              name: "Септик Тверь 0,35 ПН",
              onePointList: "30",
              threePointList: "110",
              price: "118 800 ₽",
              discount: "",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "3-c",
              name: "Септик Тверь 0,5 П",
              onePointList: "30",
              threePointList: "120",
              price: "118 800 ₽",
              discount: "",
            },
            {
              id: "2",
              img: "3-с-пм",
              name: "Септик Тверь 0,5 ПМ",
              onePointList: "60",
              threePointList: "110",
              price: "136 900 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "3-c",
              name: "Септик Тверь 0,5 НП",
              onePointList: "60",
              threePointList: "120",
              price: "131 800 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "3-с-пм",
              name: "Септик Тверь 0,5 НПМ",
              onePointList: "60",
              threePointList: "120",
              price: "151 600 ₽",
              discount: "",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "3-п",
              name: "Септик Тверь 0,5 ПН",
              onePointList: "30",
              threePointList: "120",
              price: "118 800 ₽",
              discount: "",
            },
            {
              id: "2",
              img: "3-п-пм",
              name: "Септик Тверь 0,5 ПНМ",
              onePointList: "60",
              threePointList: "120",
              price: "151 600 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "3-п",
              name: "Септик Тверь 0,5 НПН",
              onePointList: "30",
              threePointList: "120",
              price: "142 700 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "3-п-пмн",
              name: "Септик Тверь 0,8 НПНМ",
              onePointList: "60",
              threePointList: "120",
              price: "164 900 ₽",
              discount: "",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "4",
              name: "Септик Юнилос Астра 5",
              onePointList: "85",
              threePointList: "250",
              price: "123 250 ₽",
              discount: "145 000 ₽",
            },
            {
              id: "2",
              img: "4-м",
              name: "Септик Юнилос Астра 5 Миди",
              onePointList: "100",
              threePointList: "250",
              price: "125 800 ₽",
              discount: "148 000 ₽",
            },
            {
              id: "3",
              img: "4-л",
              name: "Септик Юнилос Астра 5 Лонг",
              onePointList: "150",
              threePointList: "250",
              price: "141 950 ₽",
              discount: "167 000 ₽",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "4",
              name: "Септик Юнилос Астра 5 Пр",
              onePointList: "85",
              threePointList: "250",
              price: "127 500 ₽",
              discount: "150 000 ₽",
            },
            {
              id: "2",
              img: "4-м",
              name: "Септик Юнилос Астра 5 Миди Пр",
              onePointList: "100",
              threePointList: "250",
              price: "130 050 ₽",
              discount: "153 000 ₽",
            },
            {
              id: "3",
              img: "4-л",
              name: "Септик Юнилос Астра 5 Лонг Пр",
              onePointList: "150",
              threePointList: "250",
              price: "146 200 ₽",
              discount: "172 000",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "5",
              name: "Септик Тополь 6",
              onePointList: "85",
              threePointList: "270",
              price: "129 420 ₽",
              discount: "143 800 ₽",
            },
            {
              id: "2",
              img: "5-п",
              name: "Септик Тополь 6 Плюс",
              onePointList: " 135",
              threePointList: "270",
              price: "145 440 ₽",
              discount: "161 600 ₽",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "5-п",
              name: "Септик Тополь 6 Пр",
              onePointList: "85",
              threePointList: "270",
              price: "139 500 ₽",
              discount: "155 000 ₽",
            },
            {
              id: "2",
              img: "5-п",
              name: "Септик Тополь 6 Пр Плюс",
              onePointList: "135",
              threePointList: "270",
              price: "157 320 ₽",
              discount: "174 800 ₽",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "6-с",
              name: "Септик Тверь 0,8 П",
              onePointList: "30",
              threePointList: "120",
              price: "135 900 ₽",
              discount: "",
            },
            {
              id: "2",
              img: "6-с-пм",
              name: "Септик Тверь 0,8 ПМ",
              onePointList: "60",
              threePointList: "225",
              price: "159 600 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "6-с",
              name: "Септик Тверь 0,8 НП",
              onePointList: "102",
              threePointList: "225",
              price: "150 900 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "6-с-пм",
              name: "Септик Тверь 0,8 НПМ",
              onePointList: "132",
              threePointList: "225",
              price: "178 400 ₽",
              discount: "",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "6-п",
              name: "Септик Тверь 0,8 ПН",
              onePointList: "30",
              threePointList: "630",
              price: "150 700 ₽",
              discount: "",
            },
            {
              id: "2",
              img: "6-п-пм",
              name: "Септик Тверь 0,8 ПНМ",
              onePointList: "60",
              threePointList: "225",
              price: "178 400 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "6-п",
              name: "Септик Тверь 0,8 НПН",
              onePointList: "102",
              threePointList: "225",
              price: "163 900 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "6-п-пм",
              name: "Септик Тверь 0,8 НП",
              onePointList: "132",
              threePointList: "225",
              price: "192 600 ₽",
              discount: "",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "7",
              name: "Септик Аквалос 8",
              onePointList: "60",
              threePointList: "700",
              price: "148 500 ₽",
              discount: "165 000 ₽",
            },
            {
              id: "2",
              img: "7-м",
              name: "Септик Аквалос 8 Миди",
              onePointList: "85",
              threePointList: "700",
              price: "153 900 ₽",
              discount: "171 000 ₽",
            },
            {
              id: "3",
              img: "7-л",
              name: "Септик Аквалос 8 Лонг",
              onePointList: "120",
              threePointList: "700",
              price: "167 400 ₽",
              discount: "186 000 ₽",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "7",
              name: "Септик Аквалос 8 Пр",
              onePointList: "60",
              threePointList: "630",
              price: "148 500 ₽",
              discount: "165 000 ₽",
            },
            {
              id: "2",
              img: "7-м",
              name: "Септик Аквалос 8 Миди Пр",
              onePointList: "85",
              threePointList: "630",
              price: "153 900 ₽",
              discount: "171 000 ₽",
            },
            {
              id: "3",
              img: "7-л",
              name: "Септик Аквалос 8 Лонг Пр",
              onePointList: "120",
              threePointList: "700",
              price: "167 400 ₽",
              discount: "186 000",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "4",
              name: "Септик Юнилос Астра 8",
              onePointList: "85",
              threePointList: "350",
              price: "149 600 ₽",
              discount: "176 000 ₽",
            },
            {
              id: "2",
              img: "4-м",
              name: "Септик Юнилос Астра 8 Миди",
              onePointList: "100",
              threePointList: "350",
              price: "152 150 ₽",
              discount: "179 000 ₽",
            },
            {
              id: "3",
              img: "4-л",
              name: "Септик Юнилос Астра 8 Лонг",
              onePointList: "150",
              threePointList: "350",
              price: "173 400 ₽",
              discount: "204 000 ₽",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "4",
              name: "Септик Юнилос Астра 8 Пр",
              onePointList: "85",
              threePointList: "350",
              price: "153 850 ₽",
              discount: "181 850 ₽",
            },
            {
              id: "2",
              img: "4-м",
              name: "Септик Юнилос Астра 8 Миди Пр",
              onePointList: "100",
              threePointList: "350",
              price: "156 400 ₽",
              discount: "184 000 ₽",
            },
            {
              id: "3",
              img: "4-л",
              name: "Септик Юнилос Астра 8 Лонг Пр",
              onePointList: "150",
              threePointList: "350",
              price: "167 400 ₽",
              discount: "177 650 ₽",
            },
          ],
        },
        {
          oneTopBtn: [
            {
              id: "1",
              img: "9-с",
              name: "Септик Тверь 1,1 П",
              onePointList: "30",
              threePointList: "330",
              price: "152 475 руб",
              discount: "160 500 ₽",
            },
            {
              id: "2",
              img: "9-с-пм",
              name: "Септик Тверь 1,1 ПМ",
              onePointList: " 60",
              threePointList: "330",
              price: "184 300 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "9-с",
              name: "Септик Тверь 1,1 НП",
              onePointList: "102",
              threePointList: "330",
              price: "174 900 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "9-с-пм",
              name: "Септик Тверь 1,1 НПМ",
              onePointList: "132",
              threePointList: "225",
              price: "199 800 ₽",
              discount: "",
            },
          ],
          twoTopBtn: [
            {
              id: "1",
              img: "9-п",
              name: "Септик Тверь 1,1 ПН",
              onePointList: "30",
              threePointList: "330",
              price: "174 900 ₽",
              discount: "",
            },
            {
              id: "2",
              img: "9-п-пм",
              name: "Септик Тверь 1,1 ПНМ",
              onePointList: "60",
              threePointList: "330",
              price: "199 800 ₽",
              discount: "",
            },
            {
              id: "3",
              img: "9-п",
              name: "Септик Тверь 1,1 НПН",
              onePointList: "102",
              threePointList: "330",
              price: "189 400 ₽",
              discount: "",
            },
            {
              id: "4",
              img: "9-п-пм",
              name: "Септик Тверь 1,1 НП",
              onePointList: "132",
              threePointList: "330",
              price: "251 900 ₽",
              discount: "",
            },
          ],
        },
      ],
      a = document.querySelectorAll(".popular-models__slide");
    function l(e, t) {
      e.closest(t) &&
        !e.closest("._active-btn") &&
        (Array.from(e.parentElement.children).forEach((e, t) => {
          e.classList.remove("_active-btn");
        }),
        e.classList.add("_active-btn"));
    }
    function c(e) {
      let t;
      return (
        Array.from(e.children).forEach((e) => {
          if (e.closest("._active-btn")) {
            let i = Object.keys(e.dataset);
            t = e.dataset[i[0]];
          }
        }),
        t
      );
    }
    a &&
      a.forEach((e) => {
        e.addEventListener("click", function (t) {
          const i = e.querySelector(".card-model__name"),
            o = e.querySelector(".card-model__current-price"),
            n = e.querySelector(".card-model__discount-price"),
            s = e.querySelector(".card-model__img img"),
            a = e.querySelector(".card-model__list"),
            d = e.querySelector(".card-model__top-btns"),
            m = e.querySelector(".card-model__bottom-btns"),
            p = e.querySelector(".card-model__favorite");
          let u = t.target,
            h = "1";
          console.log(u),
            l(u, ".card-model__top-btn"),
            l(u, ".card-model__bottom-btn"),
            u.closest(".card-model__favorite") && p.classList.toggle("_active");
          let g = c(d);
          m && (h = c(m));
          let _ = r[e.dataset.swiperSlideIndex][g].find((e) => e.id == h);
          _.name && i && ((i.innerHTML = ""), (i.innerHTML = _.name)),
            _.price && o && ((o.innerHTML = ""), (o.innerHTML = _.price)),
            _.discount && n
              ? ((n.innerHTML = ""), (n.innerHTML = _.discount))
              : n && (n.innerHTML = ""),
            _.onePointList &&
              a &&
              ((a.children[0].firstElementChild.innerHTML = ""),
              (a.children[0].firstElementChild.innerHTML = _.onePointList)),
            _.threePointList &&
              a &&
              ((a.children[2].firstElementChild.innerHTML = ""),
              (a.children[2].firstElementChild.innerHTML = _.threePointList)),
            _.img &&
              s &&
              (function (e, t) {
                if (t) {
                  const i = e.src.lastIndexOf("/");
                  e.src = e.src.slice(0, i + 1) + t + ".webp";
                }
              })(s, _.img),
            (a.children[3].firstElementChild.innerHTML = ""),
            (a.children[3].firstElementChild.innerHTML =
              "oneTopBtn" === g ? "Самотеком" : "Принудительный");
        });
      }),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        const i = document.querySelectorAll("[data-spollers]");
        if (i.length > 0) {
          const n = Array.from(i).filter(function (e, t, i) {
            return !e.dataset.spollers.split(",")[0];
          });
          n.length && r(n);
          let s = o(i, "spollers");
          function r(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    a(e),
                    e.addEventListener("click", l))
                  : (e.classList.remove("_spoller-init"),
                    a(e, !1),
                    e.removeEventListener("click", l));
            });
          }
          function a(e, t = !0) {
            const i = e.querySelectorAll("[data-spoller]");
            i.length > 0 &&
              i.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              });
          }
          function l(i) {
            const o = i.target;
            if (o.closest("[data-spoller]")) {
              const n = o.closest("[data-spoller]"),
                s = n.closest("[data-spollers]"),
                r = !!s.hasAttribute("data-one-spoller");
              s.querySelectorAll("._slide").length ||
                (r && !n.classList.contains("_spoller-active") && c(s),
                n.classList.toggle("_spoller-active"),
                ((i, o = 500) => {
                  i.hidden ? t(i, o) : e(i, o);
                })(n.nextElementSibling, 300)),
                i.preventDefault();
            }
          }
          function c(t) {
            const i = t.querySelector("[data-spoller]._spoller-active");
            i &&
              (i.classList.remove("_spoller-active"),
              e(i.nextElementSibling, 300));
          }
          s &&
            s.length &&
            s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              }),
                r(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      (function () {
        const i = document.querySelectorAll("[data-showmore]");
        let n, s;
        function r(i, o) {
          i.forEach((i) => {
            !(function (i, o = !1) {
              i = o ? i.item : i;
              const n = i.querySelector("[data-showmore-content]"),
                s = i.querySelector("[data-showmore-button]"),
                r = a(i, n);
              (o.matches || !o) &&
              r <
                (function (e) {
                  let t = e.offsetHeight;
                  e.style.removeProperty("height");
                  let i = e.offsetHeight;
                  return (e.style.height = `${t}px`), i;
                })(n)
                ? (e(n, 0, r), (s.hidden = !1))
                : (t(n, 0, r), (s.hidden = !0));
            })(i, o);
          });
        }
        function a(e, t) {
          let i = 0;
          if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
            const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
              o = t.children;
            for (let t = 1; t < o.length; t++) {
              if (((i += o[t - 1].offsetHeight), t === e)) break;
            }
          } else {
            i = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
          }
          return i;
        }
        function l(i) {
          const o = i.target,
            s = i.type;
          if ("click" === s) {
            if (o.closest("[data-showmore-button]")) {
              const i = o
                  .closest("[data-showmore-button]")
                  .closest("[data-showmore]"),
                n = i.querySelector("[data-showmore-content]"),
                s = i.dataset.showmoreButton ? i.dataset.showmoreButton : "500",
                r = a(i, n);
              n.classList.contains("_slide") ||
                (i.classList.contains("_showmore-active")
                  ? e(n, s, r)
                  : t(n, s, r),
                i.classList.toggle("_showmore-active"));
            }
          } else "resize" === s && n.length && r(n);
        }
        i.length &&
          ((n = Array.from(i).filter(function (e, t, i) {
            return !e.dataset.showmoreMedia;
          })),
          n.length && r(n),
          document.addEventListener("click", l),
          window.addEventListener("resize", l),
          (s = o(i, "showmoreMedia")),
          s &&
            s.length &&
            (s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              });
            }),
            (function (e) {
              e.forEach((e) => {
                r(e.itemsArray, e.matchMedia);
              });
            })(s)));
      })();
  })();
})();
