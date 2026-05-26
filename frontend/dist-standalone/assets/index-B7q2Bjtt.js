var Qh = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var dT = Qh((It, Mt) => {
  (function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver((o) => {
      for (const i of o)
        if (i.type === 'childList')
          for (const s of i.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(o) {
      const i = {};
      return (
        o.integrity && (i.integrity = o.integrity),
        o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === 'use-credentials'
          ? (i.credentials = 'include')
          : o.crossOrigin === 'anonymous'
            ? (i.credentials = 'omit')
            : (i.credentials = 'same-origin'),
        i
      );
    }
    function r(o) {
      if (o.ep) return;
      o.ep = !0;
      const i = n(o);
      fetch(o.href, i);
    }
  })();
  function ua(e) {
    const t = Object.create(null);
    for (const n of e.split(',')) t[n] = 1;
    return (n) => n in t;
  }
  const Ae = {},
    gr = [],
    tn = () => {},
    ju = () => !1,
    gi = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    fa = (e) => e.startsWith('onUpdate:'),
    Je = Object.assign,
    da = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    ep = Object.prototype.hasOwnProperty,
    ke = (e, t) => ep.call(e, t),
    ue = Array.isArray,
    vr = (e) => vi(e) === '[object Map]',
    zu = (e) => vi(e) === '[object Set]',
    ge = (e) => typeof e == 'function',
    Fe = (e) => typeof e == 'string',
    gn = (e) => typeof e == 'symbol',
    Le = (e) => e !== null && typeof e == 'object',
    Bu = (e) => (Le(e) || ge(e)) && ge(e.then) && ge(e.catch),
    Fu = Object.prototype.toString,
    vi = (e) => Fu.call(e),
    tp = (e) => vi(e).slice(8, -1),
    Uu = (e) => vi(e) === '[object Object]',
    ha = (e) => Fe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
    Zr = ua(
      ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
    ),
    mi = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    np = /-\w/g,
    kt = mi((e) => e.replace(np, (t) => t.slice(1).toUpperCase())),
    rp = /\B([A-Z])/g,
    $n = mi((e) => e.replace(rp, '-$1').toLowerCase()),
    yi = mi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Lo = mi((e) => (e ? `on${yi(e)}` : '')),
    _t = (e, t) => !Object.is(e, t),
    Do = (e, ...t) => {
      for (let n = 0; n < e.length; n++) e[n](...t);
    },
    Hu = (e, t, n, r = !1) => {
      Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n });
    },
    pa = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    },
    op = (e) => {
      const t = Fe(e) ? Number(e) : NaN;
      return isNaN(t) ? e : t;
    };
  let dl;
  const bi = () =>
    dl ||
    (dl =
      typeof globalThis < 'u'
        ? globalThis
        : typeof self < 'u'
          ? self
          : typeof window < 'u'
            ? window
            : typeof global < 'u'
              ? global
              : {});
  function Ft(e) {
    if (ue(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          o = Fe(r) ? lp(r) : Ft(r);
        if (o) for (const i in o) t[i] = o[i];
      }
      return t;
    } else if (Fe(e) || Le(e)) return e;
  }
  const ip = /;(?![^(]*\))/g,
    sp = /:([^]+)/,
    ap = /\/\*[^]*?\*\//g;
  function lp(e) {
    const t = {};
    return (
      e
        .replace(ap, '')
        .split(ip)
        .forEach((n) => {
          if (n) {
            const r = n.split(sp);
            r.length > 1 && (t[r[0].trim()] = r[1].trim());
          }
        }),
      t
    );
  }
  function Be(e) {
    let t = '';
    if (Fe(e)) t = e;
    else if (ue(e))
      for (let n = 0; n < e.length; n++) {
        const r = Be(e[n]);
        r && (t += r + ' ');
      }
    else if (Le(e)) for (const n in e) e[n] && (t += n + ' ');
    return t.trim();
  }
  function As(e) {
    if (!e) return null;
    let { class: t, style: n } = e;
    return (t && !Fe(t) && (e.class = Be(t)), n && (e.style = Ft(n)), e);
  }
  const cp = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    up = ua(cp);
  function Vu(e) {
    return !!e || e === '';
  }
  const Zu = (e) => !!(e && e.__v_isRef === !0),
    Wo = (e) =>
      Fe(e)
        ? e
        : e == null
          ? ''
          : ue(e) || (Le(e) && (e.toString === Fu || !ge(e.toString)))
            ? Zu(e)
              ? Wo(e.value)
              : JSON.stringify(e, Wu, 2)
            : String(e),
    Wu = (e, t) =>
      Zu(t)
        ? Wu(e, t.value)
        : vr(t)
          ? {
              [`Map(${t.size})`]: [...t.entries()].reduce(
                (n, [r, o], i) => ((n[Xi(r, i) + ' =>'] = o), n),
                {},
              ),
            }
          : zu(t)
            ? { [`Set(${t.size})`]: [...t.values()].map((n) => Xi(n)) }
            : gn(t)
              ? Xi(t)
              : Le(t) && !ue(t) && !Uu(t)
                ? String(t)
                : t,
    Xi = (e, t = '') => {
      var n;
      return gn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
  let Et;
  class fp {
    constructor(t = !1) {
      ((this.detached = t),
        (this._active = !0),
        (this._on = 0),
        (this.effects = []),
        (this.cleanups = []),
        (this._isPaused = !1),
        (this.parent = Et),
        !t && Et && (this.index = (Et.scopes || (Et.scopes = [])).push(this) - 1));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = !0;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = !1;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n = Et;
        try {
          return ((Et = this), t());
        } finally {
          Et = n;
        }
      }
    }
    on() {
      ++this._on === 1 && ((this.prevScope = Et), (Et = this));
    }
    off() {
      this._on > 0 && --this._on === 0 && ((Et = this.prevScope), (this.prevScope = void 0));
    }
    stop(t) {
      if (this._active) {
        this._active = !1;
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
          this.cleanups[n]();
        if (((this.cleanups.length = 0), this.scopes)) {
          for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const o = this.parent.scopes.pop();
          o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
        }
        this.parent = void 0;
      }
    }
  }
  function dp() {
    return Et;
  }
  let De;
  const Ji = new WeakSet();
  class Ku {
    constructor(t) {
      ((this.fn = t),
        (this.deps = void 0),
        (this.depsTail = void 0),
        (this.flags = 5),
        (this.next = void 0),
        (this.cleanup = void 0),
        (this.scheduler = void 0),
        Et && Et.active && Et.effects.push(this));
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && ((this.flags &= -65), Ji.has(this) && (Ji.delete(this), this.trigger()));
    }
    notify() {
      (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Gu(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      ((this.flags |= 2), hl(this), Xu(this));
      const t = De,
        n = Ht;
      ((De = this), (Ht = !0));
      try {
        return this.fn();
      } finally {
        (Ju(this), (De = t), (Ht = n), (this.flags &= -3));
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) ma(t);
        ((this.deps = this.depsTail = void 0),
          hl(this),
          this.onStop && this.onStop(),
          (this.flags &= -2));
      }
    }
    trigger() {
      this.flags & 64 ? Ji.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      Is(this) && this.run();
    }
    get dirty() {
      return Is(this);
    }
  }
  let qu = 0,
    Wr,
    Kr;
  function Gu(e, t = !1) {
    if (((e.flags |= 8), t)) {
      ((e.next = Kr), (Kr = e));
      return;
    }
    ((e.next = Wr), (Wr = e));
  }
  function ga() {
    qu++;
  }
  function va() {
    if (--qu > 0) return;
    if (Kr) {
      let t = Kr;
      for (Kr = void 0; t; ) {
        const n = t.next;
        ((t.next = void 0), (t.flags &= -9), (t = n));
      }
    }
    let e;
    for (; Wr; ) {
      let t = Wr;
      for (Wr = void 0; t; ) {
        const n = t.next;
        if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
          try {
            t.trigger();
          } catch (r) {
            e || (e = r);
          }
        t = n;
      }
    }
    if (e) throw e;
  }
  function Xu(e) {
    for (let t = e.deps; t; t = t.nextDep)
      ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t));
  }
  function Ju(e) {
    let t,
      n = e.depsTail,
      r = n;
    for (; r; ) {
      const o = r.prevDep;
      (r.version === -1 ? (r === n && (n = o), ma(r), hp(r)) : (t = r),
        (r.dep.activeLink = r.prevActiveLink),
        (r.prevActiveLink = void 0),
        (r = o));
    }
    ((e.deps = t), (e.depsTail = n));
  }
  function Is(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (
        t.dep.version !== t.version ||
        (t.dep.computed && (Yu(t.dep.computed) || t.dep.version !== t.version))
      )
        return !0;
    return !!e._dirty;
  }
  function Yu(e) {
    if (
      (e.flags & 4 && !(e.flags & 16)) ||
      ((e.flags &= -17), e.globalVersion === to) ||
      ((e.globalVersion = to), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Is(e)))
    )
      return;
    e.flags |= 2;
    const t = e.dep,
      n = De,
      r = Ht;
    ((De = e), (Ht = !0));
    try {
      Xu(e);
      const o = e.fn(e._value);
      (t.version === 0 || _t(o, e._value)) && ((e.flags |= 128), (e._value = o), t.version++);
    } catch (o) {
      throw (t.version++, o);
    } finally {
      ((De = n), (Ht = r), Ju(e), (e.flags &= -3));
    }
  }
  function ma(e, t = !1) {
    const { dep: n, prevSub: r, nextSub: o } = e;
    if (
      (r && ((r.nextSub = o), (e.prevSub = void 0)),
      o && ((o.prevSub = r), (e.nextSub = void 0)),
      n.subs === e && ((n.subs = r), !r && n.computed))
    ) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep) ma(i, !0);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  function hp(e) {
    const { prevDep: t, nextDep: n } = e;
    (t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)));
  }
  let Ht = !0;
  const Qu = [];
  function hn() {
    (Qu.push(Ht), (Ht = !1));
  }
  function pn() {
    const e = Qu.pop();
    Ht = e === void 0 ? !0 : e;
  }
  function hl(e) {
    const { cleanup: t } = e;
    if (((e.cleanup = void 0), t)) {
      const n = De;
      De = void 0;
      try {
        t();
      } finally {
        De = n;
      }
    }
  }
  let to = 0;
  class pp {
    constructor(t, n) {
      ((this.sub = t),
        (this.dep = n),
        (this.version = n.version),
        (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0));
    }
  }
  class wi {
    constructor(t) {
      ((this.computed = t),
        (this.version = 0),
        (this.activeLink = void 0),
        (this.subs = void 0),
        (this.map = void 0),
        (this.key = void 0),
        (this.sc = 0),
        (this.__v_skip = !0));
    }
    track(t) {
      if (!De || !Ht || De === this.computed) return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== De)
        ((n = this.activeLink = new pp(De, this)),
          De.deps
            ? ((n.prevDep = De.depsTail), (De.depsTail.nextDep = n), (De.depsTail = n))
            : (De.deps = De.depsTail = n),
          ef(n));
      else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
        const r = n.nextDep;
        ((r.prevDep = n.prevDep),
          n.prevDep && (n.prevDep.nextDep = r),
          (n.prevDep = De.depsTail),
          (n.nextDep = void 0),
          (De.depsTail.nextDep = n),
          (De.depsTail = n),
          De.deps === n && (De.deps = r));
      }
      return n;
    }
    trigger(t) {
      (this.version++, to++, this.notify(t));
    }
    notify(t) {
      ga();
      try {
        for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
      } finally {
        va();
      }
    }
  }
  function ef(e) {
    if ((e.dep.sc++, e.sub.flags & 4)) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) ef(r);
      }
      const n = e.dep.subs;
      (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
    }
  }
  const Ko = new WeakMap(),
    Kn = Symbol(''),
    Ms = Symbol(''),
    no = Symbol('');
  function dt(e, t, n) {
    if (Ht && De) {
      let r = Ko.get(e);
      r || Ko.set(e, (r = new Map()));
      let o = r.get(n);
      (o || (r.set(n, (o = new wi())), (o.map = r), (o.key = n)), o.track());
    }
  }
  function un(e, t, n, r, o, i) {
    const s = Ko.get(e);
    if (!s) {
      to++;
      return;
    }
    const a = (l) => {
      l && l.trigger();
    };
    if ((ga(), t === 'clear')) s.forEach(a);
    else {
      const l = ue(e),
        u = l && ha(n);
      if (l && n === 'length') {
        const f = Number(r);
        s.forEach((c, d) => {
          (d === 'length' || d === no || (!gn(d) && d >= f)) && a(c);
        });
      } else
        switch (((n !== void 0 || s.has(void 0)) && a(s.get(n)), u && a(s.get(no)), t)) {
          case 'add':
            l ? u && a(s.get('length')) : (a(s.get(Kn)), vr(e) && a(s.get(Ms)));
            break;
          case 'delete':
            l || (a(s.get(Kn)), vr(e) && a(s.get(Ms)));
            break;
          case 'set':
            vr(e) && a(s.get(Kn));
            break;
        }
    }
    va();
  }
  function gp(e, t) {
    const n = Ko.get(e);
    return n && n.get(t);
  }
  function ar(e) {
    const t = Ce(e);
    return t === e ? t : (dt(t, 'iterate', no), zt(e) ? t : t.map(ot));
  }
  function xi(e) {
    return (dt((e = Ce(e)), 'iterate', no), e);
  }
  const vp = {
    __proto__: null,
    [Symbol.iterator]() {
      return Yi(this, Symbol.iterator, ot);
    },
    concat(...e) {
      return ar(this).concat(...e.map((t) => (ue(t) ? ar(t) : t)));
    },
    entries() {
      return Yi(this, 'entries', (e) => ((e[1] = ot(e[1])), e));
    },
    every(e, t) {
      return an(this, 'every', e, t, void 0, arguments);
    },
    filter(e, t) {
      return an(this, 'filter', e, t, (n) => n.map(ot), arguments);
    },
    find(e, t) {
      return an(this, 'find', e, t, ot, arguments);
    },
    findIndex(e, t) {
      return an(this, 'findIndex', e, t, void 0, arguments);
    },
    findLast(e, t) {
      return an(this, 'findLast', e, t, ot, arguments);
    },
    findLastIndex(e, t) {
      return an(this, 'findLastIndex', e, t, void 0, arguments);
    },
    forEach(e, t) {
      return an(this, 'forEach', e, t, void 0, arguments);
    },
    includes(...e) {
      return Qi(this, 'includes', e);
    },
    indexOf(...e) {
      return Qi(this, 'indexOf', e);
    },
    join(e) {
      return ar(this).join(e);
    },
    lastIndexOf(...e) {
      return Qi(this, 'lastIndexOf', e);
    },
    map(e, t) {
      return an(this, 'map', e, t, void 0, arguments);
    },
    pop() {
      return Rr(this, 'pop');
    },
    push(...e) {
      return Rr(this, 'push', e);
    },
    reduce(e, ...t) {
      return pl(this, 'reduce', e, t);
    },
    reduceRight(e, ...t) {
      return pl(this, 'reduceRight', e, t);
    },
    shift() {
      return Rr(this, 'shift');
    },
    some(e, t) {
      return an(this, 'some', e, t, void 0, arguments);
    },
    splice(...e) {
      return Rr(this, 'splice', e);
    },
    toReversed() {
      return ar(this).toReversed();
    },
    toSorted(e) {
      return ar(this).toSorted(e);
    },
    toSpliced(...e) {
      return ar(this).toSpliced(...e);
    },
    unshift(...e) {
      return Rr(this, 'unshift', e);
    },
    values() {
      return Yi(this, 'values', ot);
    },
  };
  function Yi(e, t, n) {
    const r = xi(e),
      o = r[t]();
    return (
      r !== e &&
        !zt(e) &&
        ((o._next = o.next),
        (o.next = () => {
          const i = o._next();
          return (i.done || (i.value = n(i.value)), i);
        })),
      o
    );
  }
  const mp = Array.prototype;
  function an(e, t, n, r, o, i) {
    const s = xi(e),
      a = s !== e && !zt(e),
      l = s[t];
    if (l !== mp[t]) {
      const c = l.apply(e, i);
      return a ? ot(c) : c;
    }
    let u = n;
    s !== e &&
      (a
        ? (u = function (c, d) {
            return n.call(this, ot(c), d, e);
          })
        : n.length > 2 &&
          (u = function (c, d) {
            return n.call(this, c, d, e);
          }));
    const f = l.call(s, u, r);
    return a && o ? o(f) : f;
  }
  function pl(e, t, n, r) {
    const o = xi(e);
    let i = n;
    return (
      o !== e &&
        (zt(e)
          ? n.length > 3 &&
            (i = function (s, a, l) {
              return n.call(this, s, a, l, e);
            })
          : (i = function (s, a, l) {
              return n.call(this, s, ot(a), l, e);
            })),
      o[t](i, ...r)
    );
  }
  function Qi(e, t, n) {
    const r = Ce(e);
    dt(r, 'iterate', no);
    const o = r[t](...n);
    return (o === -1 || o === !1) && wa(n[0]) ? ((n[0] = Ce(n[0])), r[t](...n)) : o;
  }
  function Rr(e, t, n = []) {
    (hn(), ga());
    const r = Ce(e)[t].apply(e, n);
    return (va(), pn(), r);
  }
  const yp = ua('__proto__,__v_isRef,__isVue'),
    tf = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((e) => e !== 'arguments' && e !== 'caller')
        .map((e) => Symbol[e])
        .filter(gn),
    );
  function bp(e) {
    gn(e) || (e = String(e));
    const t = Ce(this);
    return (dt(t, 'has', e), t.hasOwnProperty(e));
  }
  class nf {
    constructor(t = !1, n = !1) {
      ((this._isReadonly = t), (this._isShallow = n));
    }
    get(t, n, r) {
      if (n === '__v_skip') return t.__v_skip;
      const o = this._isReadonly,
        i = this._isShallow;
      if (n === '__v_isReactive') return !o;
      if (n === '__v_isReadonly') return o;
      if (n === '__v_isShallow') return i;
      if (n === '__v_raw')
        return r === (o ? (i ? Ap : af) : i ? sf : of).get(t) ||
          Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
          ? t
          : void 0;
      const s = ue(t);
      if (!o) {
        let l;
        if (s && (l = vp[n])) return l;
        if (n === 'hasOwnProperty') return bp;
      }
      const a = Reflect.get(t, n, tt(t) ? t : r);
      if ((gn(n) ? tf.has(n) : yp(n)) || (o || dt(t, 'get', n), i)) return a;
      if (tt(a)) {
        const l = s && ha(n) ? a : a.value;
        return o && Le(l) ? An(l) : l;
      }
      return Le(a) ? (o ? An(a) : Ot(a)) : a;
    }
  }
  class rf extends nf {
    constructor(t = !1) {
      super(!1, t);
    }
    set(t, n, r, o) {
      let i = t[n];
      if (!this._isShallow) {
        const l = Nn(i);
        if ((!zt(r) && !Nn(r) && ((i = Ce(i)), (r = Ce(r))), !ue(t) && tt(i) && !tt(r)))
          return (l || (i.value = r), !0);
      }
      const s = ue(t) && ha(n) ? Number(n) < t.length : ke(t, n),
        a = Reflect.set(t, n, r, tt(t) ? t : o);
      return (t === Ce(o) && (s ? _t(r, i) && un(t, 'set', n, r) : un(t, 'add', n, r)), a);
    }
    deleteProperty(t, n) {
      const r = ke(t, n);
      t[n];
      const o = Reflect.deleteProperty(t, n);
      return (o && r && un(t, 'delete', n, void 0), o);
    }
    has(t, n) {
      const r = Reflect.has(t, n);
      return ((!gn(n) || !tf.has(n)) && dt(t, 'has', n), r);
    }
    ownKeys(t) {
      return (dt(t, 'iterate', ue(t) ? 'length' : Kn), Reflect.ownKeys(t));
    }
  }
  class wp extends nf {
    constructor(t = !1) {
      super(!0, t);
    }
    set(t, n) {
      return !0;
    }
    deleteProperty(t, n) {
      return !0;
    }
  }
  const xp = new rf(),
    Ep = new wp(),
    _p = new rf(!0),
    ks = (e) => e,
    To = (e) => Reflect.getPrototypeOf(e);
  function Sp(e, t, n) {
    return function (...r) {
      const o = this.__v_raw,
        i = Ce(o),
        s = vr(i),
        a = e === 'entries' || (e === Symbol.iterator && s),
        l = e === 'keys' && s,
        u = o[e](...r),
        f = n ? ks : t ? qo : ot;
      return (
        !t && dt(i, 'iterate', l ? Ms : Kn),
        {
          next() {
            const { value: c, done: d } = u.next();
            return d ? { value: c, done: d } : { value: a ? [f(c[0]), f(c[1])] : f(c), done: d };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function Oo(e) {
    return function (...t) {
      return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
    };
  }
  function Cp(e, t) {
    const n = {
      get(o) {
        const i = this.__v_raw,
          s = Ce(i),
          a = Ce(o);
        e || (_t(o, a) && dt(s, 'get', o), dt(s, 'get', a));
        const { has: l } = To(s),
          u = t ? ks : e ? qo : ot;
        if (l.call(s, o)) return u(i.get(o));
        if (l.call(s, a)) return u(i.get(a));
        i !== s && i.get(o);
      },
      get size() {
        const o = this.__v_raw;
        return (!e && dt(Ce(o), 'iterate', Kn), o.size);
      },
      has(o) {
        const i = this.__v_raw,
          s = Ce(i),
          a = Ce(o);
        return (
          e || (_t(o, a) && dt(s, 'has', o), dt(s, 'has', a)),
          o === a ? i.has(o) : i.has(o) || i.has(a)
        );
      },
      forEach(o, i) {
        const s = this,
          a = s.__v_raw,
          l = Ce(a),
          u = t ? ks : e ? qo : ot;
        return (!e && dt(l, 'iterate', Kn), a.forEach((f, c) => o.call(i, u(f), u(c), s)));
      },
    };
    return (
      Je(
        n,
        e
          ? { add: Oo('add'), set: Oo('set'), delete: Oo('delete'), clear: Oo('clear') }
          : {
              add(o) {
                !t && !zt(o) && !Nn(o) && (o = Ce(o));
                const i = Ce(this);
                return (To(i).has.call(i, o) || (i.add(o), un(i, 'add', o, o)), this);
              },
              set(o, i) {
                !t && !zt(i) && !Nn(i) && (i = Ce(i));
                const s = Ce(this),
                  { has: a, get: l } = To(s);
                let u = a.call(s, o);
                u || ((o = Ce(o)), (u = a.call(s, o)));
                const f = l.call(s, o);
                return (s.set(o, i), u ? _t(i, f) && un(s, 'set', o, i) : un(s, 'add', o, i), this);
              },
              delete(o) {
                const i = Ce(this),
                  { has: s, get: a } = To(i);
                let l = s.call(i, o);
                (l || ((o = Ce(o)), (l = s.call(i, o))), a && a.call(i, o));
                const u = i.delete(o);
                return (l && un(i, 'delete', o, void 0), u);
              },
              clear() {
                const o = Ce(this),
                  i = o.size !== 0,
                  s = o.clear();
                return (i && un(o, 'clear', void 0, void 0), s);
              },
            },
      ),
      ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
        n[o] = Sp(o, e, t);
      }),
      n
    );
  }
  function ya(e, t) {
    const n = Cp(e, t);
    return (r, o, i) =>
      o === '__v_isReactive'
        ? !e
        : o === '__v_isReadonly'
          ? e
          : o === '__v_raw'
            ? r
            : Reflect.get(ke(n, o) && o in r ? n : r, o, i);
  }
  const Tp = { get: ya(!1, !1) },
    Op = { get: ya(!1, !0) },
    Pp = { get: ya(!0, !1) },
    of = new WeakMap(),
    sf = new WeakMap(),
    af = new WeakMap(),
    Ap = new WeakMap();
  function Ip(e) {
    switch (e) {
      case 'Object':
      case 'Array':
        return 1;
      case 'Map':
      case 'Set':
      case 'WeakMap':
      case 'WeakSet':
        return 2;
      default:
        return 0;
    }
  }
  function Mp(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ip(tp(e));
  }
  function Ot(e) {
    return Nn(e) ? e : ba(e, !1, xp, Tp, of);
  }
  function lf(e) {
    return ba(e, !1, _p, Op, sf);
  }
  function An(e) {
    return ba(e, !0, Ep, Pp, af);
  }
  function ba(e, t, n, r, o) {
    if (!Le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const i = Mp(e);
    if (i === 0) return e;
    const s = o.get(e);
    if (s) return s;
    const a = new Proxy(e, i === 2 ? r : n);
    return (o.set(e, a), a);
  }
  function qn(e) {
    return Nn(e) ? qn(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Nn(e) {
    return !!(e && e.__v_isReadonly);
  }
  function zt(e) {
    return !!(e && e.__v_isShallow);
  }
  function wa(e) {
    return e ? !!e.__v_raw : !1;
  }
  function Ce(e) {
    const t = e && e.__v_raw;
    return t ? Ce(t) : e;
  }
  function kp(e) {
    return (!ke(e, '__v_skip') && Object.isExtensible(e) && Hu(e, '__v_skip', !0), e);
  }
  const ot = (e) => (Le(e) ? Ot(e) : e),
    qo = (e) => (Le(e) ? An(e) : e);
  function tt(e) {
    return e ? e.__v_isRef === !0 : !1;
  }
  function J(e) {
    return cf(e, !1);
  }
  function Rp(e) {
    return cf(e, !0);
  }
  function cf(e, t) {
    return tt(e) ? e : new Np(e, t);
  }
  class Np {
    constructor(t, n) {
      ((this.dep = new wi()),
        (this.__v_isRef = !0),
        (this.__v_isShallow = !1),
        (this._rawValue = n ? t : Ce(t)),
        (this._value = n ? t : ot(t)),
        (this.__v_isShallow = n));
    }
    get value() {
      return (this.dep.track(), this._value);
    }
    set value(t) {
      const n = this._rawValue,
        r = this.__v_isShallow || zt(t) || Nn(t);
      ((t = r ? t : Ce(t)),
        _t(t, n) && ((this._rawValue = t), (this._value = r ? t : ot(t)), this.dep.trigger()));
    }
  }
  function L(e) {
    return tt(e) ? e.value : e;
  }
  const Lp = {
    get: (e, t, n) => (t === '__v_raw' ? e : L(Reflect.get(e, t, n))),
    set: (e, t, n, r) => {
      const o = e[t];
      return tt(o) && !tt(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
    },
  };
  function uf(e) {
    return qn(e) ? e : new Proxy(e, Lp);
  }
  class Dp {
    constructor(t) {
      ((this.__v_isRef = !0), (this._value = void 0));
      const n = (this.dep = new wi()),
        { get: r, set: o } = t(n.track.bind(n), n.trigger.bind(n));
      ((this._get = r), (this._set = o));
    }
    get value() {
      return (this._value = this._get());
    }
    set value(t) {
      this._set(t);
    }
  }
  function $p(e) {
    return new Dp(e);
  }
  class jp {
    constructor(t, n, r) {
      ((this._object = t),
        (this._key = n),
        (this._defaultValue = r),
        (this.__v_isRef = !0),
        (this._value = void 0));
    }
    get value() {
      const t = this._object[this._key];
      return (this._value = t === void 0 ? this._defaultValue : t);
    }
    set value(t) {
      this._object[this._key] = t;
    }
    get dep() {
      return gp(Ce(this._object), this._key);
    }
  }
  class zp {
    constructor(t) {
      ((this._getter = t),
        (this.__v_isRef = !0),
        (this.__v_isReadonly = !0),
        (this._value = void 0));
    }
    get value() {
      return (this._value = this._getter());
    }
  }
  function en(e, t, n) {
    return tt(e) ? e : ge(e) ? new zp(e) : Le(e) && arguments.length > 1 ? Bp(e, t, n) : J(e);
  }
  function Bp(e, t, n) {
    const r = e[t];
    return tt(r) ? r : new jp(e, t, n);
  }
  class Fp {
    constructor(t, n, r) {
      ((this.fn = t),
        (this.setter = n),
        (this._value = void 0),
        (this.dep = new wi(this)),
        (this.__v_isRef = !0),
        (this.deps = void 0),
        (this.depsTail = void 0),
        (this.flags = 16),
        (this.globalVersion = to - 1),
        (this.next = void 0),
        (this.effect = this),
        (this.__v_isReadonly = !n),
        (this.isSSR = r));
    }
    notify() {
      if (((this.flags |= 16), !(this.flags & 8) && De !== this)) return (Gu(this, !0), !0);
    }
    get value() {
      const t = this.dep.track();
      return (Yu(this), t && (t.version = this.dep.version), this._value);
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  }
  function Up(e, t, n = !1) {
    let r, o;
    return (ge(e) ? (r = e) : ((r = e.get), (o = e.set)), new Fp(r, o, n));
  }
  const Po = {},
    Go = new WeakMap();
  let Un;
  function Hp(e, t = !1, n = Un) {
    if (n) {
      let r = Go.get(n);
      (r || Go.set(n, (r = [])), r.push(e));
    }
  }
  function Vp(e, t, n = Ae) {
    const { immediate: r, deep: o, once: i, scheduler: s, augmentJob: a, call: l } = n,
      u = (y) => (o ? y : zt(y) || o === !1 || o === 0 ? fn(y, 1) : fn(y));
    let f,
      c,
      d,
      h,
      p = !1,
      m = !1;
    if (
      (tt(e)
        ? ((c = () => e.value), (p = zt(e)))
        : qn(e)
          ? ((c = () => u(e)), (p = !0))
          : ue(e)
            ? ((m = !0),
              (p = e.some((y) => qn(y) || zt(y))),
              (c = () =>
                e.map((y) => {
                  if (tt(y)) return y.value;
                  if (qn(y)) return u(y);
                  if (ge(y)) return l ? l(y, 2) : y();
                })))
            : ge(e)
              ? t
                ? (c = l ? () => l(e, 2) : e)
                : (c = () => {
                    if (d) {
                      hn();
                      try {
                        d();
                      } finally {
                        pn();
                      }
                    }
                    const y = Un;
                    Un = f;
                    try {
                      return l ? l(e, 3, [h]) : e(h);
                    } finally {
                      Un = y;
                    }
                  })
              : (c = tn),
      t && o)
    ) {
      const y = c,
        x = o === !0 ? 1 / 0 : o;
      c = () => fn(y(), x);
    }
    const g = dp(),
      v = () => {
        (f.stop(), g && g.active && da(g.effects, f));
      };
    if (i && t) {
      const y = t;
      t = (...x) => {
        (y(...x), v());
      };
    }
    let b = m ? new Array(e.length).fill(Po) : Po;
    const w = (y) => {
      if (!(!(f.flags & 1) || (!f.dirty && !y)))
        if (t) {
          const x = f.run();
          if (o || p || (m ? x.some((E, C) => _t(E, b[C])) : _t(x, b))) {
            d && d();
            const E = Un;
            Un = f;
            try {
              const C = [x, b === Po ? void 0 : m && b[0] === Po ? [] : b, h];
              ((b = x), l ? l(t, 3, C) : t(...C));
            } finally {
              Un = E;
            }
          }
        } else f.run();
    };
    return (
      a && a(w),
      (f = new Ku(c)),
      (f.scheduler = s ? () => s(w, !1) : w),
      (h = (y) => Hp(y, !1, f)),
      (d = f.onStop =
        () => {
          const y = Go.get(f);
          if (y) {
            if (l) l(y, 4);
            else for (const x of y) x();
            Go.delete(f);
          }
        }),
      t ? (r ? w(!0) : (b = f.run())) : s ? s(w.bind(null, !0), !0) : f.run(),
      (v.pause = f.pause.bind(f)),
      (v.resume = f.resume.bind(f)),
      (v.stop = v),
      v
    );
  }
  function fn(e, t = 1 / 0, n) {
    if (t <= 0 || !Le(e) || e.__v_skip || ((n = n || new Map()), (n.get(e) || 0) >= t)) return e;
    if ((n.set(e, t), t--, tt(e))) fn(e.value, t, n);
    else if (ue(e)) for (let r = 0; r < e.length; r++) fn(e[r], t, n);
    else if (zu(e) || vr(e))
      e.forEach((r) => {
        fn(r, t, n);
      });
    else if (Uu(e)) {
      for (const r in e) fn(e[r], t, n);
      for (const r of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, r) && fn(e[r], t, n);
    }
    return e;
  }
  function vo(e, t, n, r) {
    try {
      return r ? e(...r) : e();
    } catch (o) {
      Ei(o, t, n);
    }
  }
  function Zt(e, t, n, r) {
    if (ge(e)) {
      const o = vo(e, t, n, r);
      return (
        o &&
          Bu(o) &&
          o.catch((i) => {
            Ei(i, t, n);
          }),
        o
      );
    }
    if (ue(e)) {
      const o = [];
      for (let i = 0; i < e.length; i++) o.push(Zt(e[i], t, n, r));
      return o;
    }
  }
  function Ei(e, t, n, r = !0) {
    const o = t ? t.vnode : null,
      { errorHandler: i, throwUnhandledErrorInProduction: s } = (t && t.appContext.config) || Ae;
    if (t) {
      let a = t.parent;
      const l = t.proxy,
        u = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; a; ) {
        const f = a.ec;
        if (f) {
          for (let c = 0; c < f.length; c++) if (f[c](e, l, u) === !1) return;
        }
        a = a.parent;
      }
      if (i) {
        (hn(), vo(i, null, 10, [e, l, u]), pn());
        return;
      }
    }
    Zp(e, n, o, r, s);
  }
  function Zp(e, t, n, r = !0, o = !1) {
    if (o) throw e;
    console.error(e);
  }
  const yt = [];
  let Jt = -1;
  const mr = [];
  let Cn = null,
    ur = 0;
  const ff = Promise.resolve();
  let Xo = null;
  function mo(e) {
    const t = Xo || ff;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function Wp(e) {
    let t = Jt + 1,
      n = yt.length;
    for (; t < n; ) {
      const r = (t + n) >>> 1,
        o = yt[r],
        i = ro(o);
      i < e || (i === e && o.flags & 2) ? (t = r + 1) : (n = r);
    }
    return t;
  }
  function xa(e) {
    if (!(e.flags & 1)) {
      const t = ro(e),
        n = yt[yt.length - 1];
      (!n || (!(e.flags & 2) && t >= ro(n)) ? yt.push(e) : yt.splice(Wp(t), 0, e),
        (e.flags |= 1),
        df());
    }
  }
  function df() {
    Xo || (Xo = ff.then(pf));
  }
  function Kp(e) {
    (ue(e)
      ? mr.push(...e)
      : Cn && e.id === -1
        ? Cn.splice(ur + 1, 0, e)
        : e.flags & 1 || (mr.push(e), (e.flags |= 1)),
      df());
  }
  function gl(e, t, n = Jt + 1) {
    for (; n < yt.length; n++) {
      const r = yt[n];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        (yt.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2));
      }
    }
  }
  function hf(e) {
    if (mr.length) {
      const t = [...new Set(mr)].sort((n, r) => ro(n) - ro(r));
      if (((mr.length = 0), Cn)) {
        Cn.push(...t);
        return;
      }
      for (Cn = t, ur = 0; ur < Cn.length; ur++) {
        const n = Cn[ur];
        (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
      }
      ((Cn = null), (ur = 0));
    }
  }
  const ro = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
  function pf(e) {
    try {
      for (Jt = 0; Jt < yt.length; Jt++) {
        const t = yt[Jt];
        t &&
          !(t.flags & 8) &&
          (t.flags & 4 && (t.flags &= -2),
          vo(t, t.i, t.i ? 15 : 14),
          t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Jt < yt.length; Jt++) {
        const t = yt[Jt];
        t && (t.flags &= -2);
      }
      ((Jt = -1), (yt.length = 0), hf(), (Xo = null), (yt.length || mr.length) && pf());
    }
  }
  let it = null,
    gf = null;
  function Jo(e) {
    const t = it;
    return ((it = e), (gf = (e && e.type.__scopeId) || null), t);
  }
  function Ze(e, t = it, n) {
    if (!t || e._n) return e;
    const r = (...o) => {
      r._d && ti(-1);
      const i = Jo(t);
      let s;
      try {
        s = e(...o);
      } finally {
        (Jo(i), r._d && ti(1));
      }
      return s;
    };
    return ((r._n = !0), (r._c = !0), (r._d = !0), r);
  }
  function Ea(e, t) {
    if (it === null) return e;
    const n = Ai(it),
      r = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
      let [i, s, a, l = Ae] = t[o];
      i &&
        (ge(i) && (i = { mounted: i, updated: i }),
        i.deep && fn(s),
        r.push({ dir: i, instance: n, value: s, oldValue: void 0, arg: a, modifiers: l }));
    }
    return e;
  }
  function zn(e, t, n, r) {
    const o = e.dirs,
      i = t && t.dirs;
    for (let s = 0; s < o.length; s++) {
      const a = o[s];
      i && (a.oldValue = i[s].value);
      let l = a.dir[r];
      l && (hn(), Zt(l, n, 8, [e.el, a, e, t]), pn());
    }
  }
  const vf = Symbol('_vte'),
    qp = (e) => e.__isTeleport,
    qr = (e) => e && (e.disabled || e.disabled === ''),
    vl = (e) => e && (e.defer || e.defer === ''),
    ml = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
    yl = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
    Rs = (e, t) => {
      const n = e && e.to;
      return Fe(n) ? (t ? t(n) : null) : n;
    },
    mf = {
      name: 'Teleport',
      __isTeleport: !0,
      process(e, t, n, r, o, i, s, a, l, u) {
        const {
            mc: f,
            pc: c,
            pbc: d,
            o: { insert: h, querySelector: p, createText: m, createComment: g },
          } = u,
          v = qr(t.props);
        let { shapeFlag: b, children: w, dynamicChildren: y } = t;
        if (e == null) {
          const x = (t.el = m('')),
            E = (t.anchor = m(''));
          (h(x, n, r), h(E, n, r));
          const C = (M, A) => {
              b & 16 && f(w, M, A, o, i, s, a, l);
            },
            P = () => {
              const M = (t.target = Rs(t.props, p)),
                A = yf(M, t, m, h);
              M &&
                (s !== 'svg' && ml(M) ? (s = 'svg') : s !== 'mathml' && yl(M) && (s = 'mathml'),
                o &&
                  o.isCE &&
                  (o.ce._teleportTargets || (o.ce._teleportTargets = new Set())).add(M),
                v || (C(M, A), $o(t, !1)));
            };
          (v && (C(n, E), $o(t, !0)),
            vl(t.props)
              ? ((t.el.__isMounted = !1),
                vt(() => {
                  (P(), delete t.el.__isMounted);
                }, i))
              : P());
        } else {
          if (vl(t.props) && e.el.__isMounted === !1) {
            vt(() => {
              mf.process(e, t, n, r, o, i, s, a, l, u);
            }, i);
            return;
          }
          ((t.el = e.el), (t.targetStart = e.targetStart));
          const x = (t.anchor = e.anchor),
            E = (t.target = e.target),
            C = (t.targetAnchor = e.targetAnchor),
            P = qr(e.props),
            M = P ? n : E,
            A = P ? x : C;
          if (
            (s === 'svg' || ml(E) ? (s = 'svg') : (s === 'mathml' || yl(E)) && (s = 'mathml'),
            y
              ? (d(e.dynamicChildren, y, M, o, i, s, a), Oa(e, t, !0))
              : l || c(e, t, M, A, o, i, s, a, !1),
            v)
          )
            P
              ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to)
              : Ao(t, n, x, u, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const j = (t.target = Rs(t.props, p));
            j && Ao(t, j, null, u, 0);
          } else P && Ao(t, E, C, u, 1);
          $o(t, v);
        }
      },
      remove(e, t, n, { um: r, o: { remove: o } }, i) {
        const {
          shapeFlag: s,
          children: a,
          anchor: l,
          targetStart: u,
          targetAnchor: f,
          target: c,
          props: d,
        } = e;
        if ((c && (o(u), o(f)), i && o(l), s & 16)) {
          const h = i || !qr(d);
          for (let p = 0; p < a.length; p++) {
            const m = a[p];
            r(m, t, n, h, !!m.dynamicChildren);
          }
        }
      },
      move: Ao,
      hydrate: Gp,
    };
  function Ao(e, t, n, { o: { insert: r }, m: o }, i = 2) {
    i === 0 && r(e.targetAnchor, t, n);
    const { el: s, anchor: a, shapeFlag: l, children: u, props: f } = e,
      c = i === 2;
    if ((c && r(s, t, n), (!c || qr(f)) && l & 16))
      for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
    c && r(a, t, n);
  }
  function Gp(
    e,
    t,
    n,
    r,
    o,
    i,
    { o: { nextSibling: s, parentNode: a, querySelector: l, insert: u, createText: f } },
    c,
  ) {
    function d(m, g, v, b) {
      ((g.anchor = c(s(m), g, a(m), n, r, o, i)), (g.targetStart = v), (g.targetAnchor = b));
    }
    const h = (t.target = Rs(t.props, l)),
      p = qr(t.props);
    if (h) {
      const m = h._lpa || h.firstChild;
      if (t.shapeFlag & 16)
        if (p) d(e, t, m, m && s(m));
        else {
          t.anchor = s(e);
          let g = m;
          for (; g; ) {
            if (g && g.nodeType === 8) {
              if (g.data === 'teleport start anchor') t.targetStart = g;
              else if (g.data === 'teleport anchor') {
                ((t.targetAnchor = g), (h._lpa = t.targetAnchor && s(t.targetAnchor)));
                break;
              }
            }
            g = s(g);
          }
          (t.targetAnchor || yf(h, t, f, u), c(m && s(m), t, h, n, r, o, i));
        }
      $o(t, p);
    } else p && t.shapeFlag & 16 && d(e, t, e, s(e));
    return t.anchor && s(t.anchor);
  }
  const _a = mf;
  function $o(e, t) {
    const n = e.ctx;
    if (n && n.ut) {
      let r, o;
      for (
        t ? ((r = e.el), (o = e.anchor)) : ((r = e.targetStart), (o = e.targetAnchor));
        r && r !== o;
      )
        (r.nodeType === 1 && r.setAttribute('data-v-owner', n.uid), (r = r.nextSibling));
      n.ut();
    }
  }
  function yf(e, t, n, r) {
    const o = (t.targetStart = n('')),
      i = (t.targetAnchor = n(''));
    return ((o[vf] = i), e && (r(o, e), r(i, e)), i);
  }
  const Hn = Symbol('_leaveCb'),
    Io = Symbol('_enterCb');
  function Xp() {
    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
    return (
      mn(() => {
        e.isMounted = !0;
      }),
      jn(() => {
        e.isUnmounting = !0;
      }),
      e
    );
  }
  const Dt = [Function, Array],
    Jp = {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Dt,
      onEnter: Dt,
      onAfterEnter: Dt,
      onEnterCancelled: Dt,
      onBeforeLeave: Dt,
      onLeave: Dt,
      onAfterLeave: Dt,
      onLeaveCancelled: Dt,
      onBeforeAppear: Dt,
      onAppear: Dt,
      onAfterAppear: Dt,
      onAppearCancelled: Dt,
    };
  function Yp(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return (r || ((r = Object.create(null)), n.set(t.type, r)), r);
  }
  function Ns(e, t, n, r, o) {
    const {
        appear: i,
        mode: s,
        persisted: a = !1,
        onBeforeEnter: l,
        onEnter: u,
        onAfterEnter: f,
        onEnterCancelled: c,
        onBeforeLeave: d,
        onLeave: h,
        onAfterLeave: p,
        onLeaveCancelled: m,
        onBeforeAppear: g,
        onAppear: v,
        onAfterAppear: b,
        onAppearCancelled: w,
      } = t,
      y = String(e.key),
      x = Yp(n, e),
      E = (M, A) => {
        M && Zt(M, r, 9, A);
      },
      C = (M, A) => {
        const j = A[1];
        (E(M, A), ue(M) ? M.every((R) => R.length <= 1) && j() : M.length <= 1 && j());
      },
      P = {
        mode: s,
        persisted: a,
        beforeEnter(M) {
          let A = l;
          if (!n.isMounted)
            if (i) A = g || l;
            else return;
          M[Hn] && M[Hn](!0);
          const j = x[y];
          (j && fr(e, j) && j.el[Hn] && j.el[Hn](), E(A, [M]));
        },
        enter(M) {
          let A = u,
            j = f,
            R = c;
          if (!n.isMounted)
            if (i) ((A = v || u), (j = b || f), (R = w || c));
            else return;
          let V = !1;
          const re = (M[Io] = (ne) => {
            V ||
              ((V = !0),
              ne ? E(R, [M]) : E(j, [M]),
              P.delayedLeave && P.delayedLeave(),
              (M[Io] = void 0));
          });
          A ? C(A, [M, re]) : re();
        },
        leave(M, A) {
          const j = String(e.key);
          if ((M[Io] && M[Io](!0), n.isUnmounting)) return A();
          E(d, [M]);
          let R = !1;
          const V = (M[Hn] = (re) => {
            R ||
              ((R = !0),
              A(),
              re ? E(m, [M]) : E(p, [M]),
              (M[Hn] = void 0),
              x[j] === e && delete x[j]);
          });
          ((x[j] = e), h ? C(h, [M, V]) : V());
        },
        clone(M) {
          return Ns(M, t, n, r);
        },
      };
    return P;
  }
  function oo(e, t) {
    e.shapeFlag & 6 && e.component
      ? ((e.transition = t), oo(e.component.subTree, t))
      : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
  }
  function bf(e, t = !1, n) {
    let r = [],
      o = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      const a = n == null ? s.key : String(n) + String(s.key != null ? s.key : i);
      s.type === he
        ? (s.patchFlag & 128 && o++, (r = r.concat(bf(s.children, t, a))))
        : (t || s.type !== nn) && r.push(a != null ? Xn(s, { key: a }) : s);
    }
    if (o > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
  }
  function pe(e, t) {
    return ge(e) ? Je({ name: e.name }, t, { setup: e }) : e;
  }
  function wf(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
  }
  const Yo = new WeakMap();
  function Gr(e, t, n, r, o = !1) {
    if (ue(e)) {
      e.forEach((p, m) => Gr(p, t && (ue(t) ? t[m] : t), n, r, o));
      return;
    }
    if (yr(r) && !o) {
      r.shapeFlag & 512 &&
        r.type.__asyncResolved &&
        r.component.subTree.component &&
        Gr(e, t, n, r.component.subTree);
      return;
    }
    const i = r.shapeFlag & 4 ? Ai(r.component) : r.el,
      s = o ? null : i,
      { i: a, r: l } = e,
      u = t && t.r,
      f = a.refs === Ae ? (a.refs = {}) : a.refs,
      c = a.setupState,
      d = Ce(c),
      h = c === Ae ? ju : (p) => ke(d, p);
    if (u != null && u !== l) {
      if ((bl(t), Fe(u))) ((f[u] = null), h(u) && (c[u] = null));
      else if (tt(u)) {
        u.value = null;
        const p = t;
        p.k && (f[p.k] = null);
      }
    }
    if (ge(l)) vo(l, a, 12, [s, f]);
    else {
      const p = Fe(l),
        m = tt(l);
      if (p || m) {
        const g = () => {
          if (e.f) {
            const v = p ? (h(l) ? c[l] : f[l]) : l.value;
            if (o) ue(v) && da(v, i);
            else if (ue(v)) v.includes(i) || v.push(i);
            else if (p) ((f[l] = [i]), h(l) && (c[l] = f[l]));
            else {
              const b = [i];
              ((l.value = b), e.k && (f[e.k] = b));
            }
          } else p ? ((f[l] = s), h(l) && (c[l] = s)) : m && ((l.value = s), e.k && (f[e.k] = s));
        };
        if (s) {
          const v = () => {
            (g(), Yo.delete(e));
          };
          ((v.id = -1), Yo.set(e, v), vt(v, n));
        } else (bl(e), g());
      }
    }
  }
  function bl(e) {
    const t = Yo.get(e);
    t && ((t.flags |= 8), Yo.delete(e));
  }
  bi().requestIdleCallback;
  bi().cancelIdleCallback;
  const yr = (e) => !!e.type.__asyncLoader,
    xf = (e) => e.type.__isKeepAlive;
  function Qp(e, t) {
    Ef(e, 'a', t);
  }
  function eg(e, t) {
    Ef(e, 'da', t);
  }
  function Ef(e, t, n = ht) {
    const r =
      e.__wdc ||
      (e.__wdc = () => {
        let o = n;
        for (; o; ) {
          if (o.isDeactivated) return;
          o = o.parent;
        }
        return e();
      });
    if ((_i(t, r, n), n)) {
      let o = n.parent;
      for (; o && o.parent; ) (xf(o.parent.vnode) && tg(r, t, n, o), (o = o.parent));
    }
  }
  function tg(e, t, n, r) {
    const o = _i(t, e, r, !0);
    tr(() => {
      da(r[t], o);
    }, n);
  }
  function _i(e, t, n = ht, r = !1) {
    if (n) {
      const o = n[e] || (n[e] = []),
        i =
          t.__weh ||
          (t.__weh = (...s) => {
            hn();
            const a = yo(n),
              l = Zt(t, n, e, s);
            return (a(), pn(), l);
          });
      return (r ? o.unshift(i) : o.push(i), i);
    }
  }
  const vn =
      (e) =>
      (t, n = ht) => {
        (!ao || e === 'sp') && _i(e, (...r) => t(...r), n);
      },
    _f = vn('bm'),
    mn = vn('m'),
    ng = vn('bu'),
    Sf = vn('u'),
    jn = vn('bum'),
    tr = vn('um'),
    rg = vn('sp'),
    og = vn('rtg'),
    ig = vn('rtc');
  function sg(e, t = ht) {
    _i('ec', e, t);
  }
  const Cf = 'components';
  function ag(e, t) {
    return Pf(Cf, e, !0, t) || e;
  }
  const Tf = Symbol.for('v-ndc');
  function Of(e) {
    return Fe(e) ? Pf(Cf, e, !1) || e : e || Tf;
  }
  function Pf(e, t, n = !0, r = !1) {
    const o = it || ht;
    if (o) {
      const i = o.type;
      {
        const a = Kg(i, !1);
        if (a && (a === t || a === kt(t) || a === yi(kt(t)))) return i;
      }
      const s = wl(o[e] || i[e], t) || wl(o.appContext[e], t);
      return !s && r ? i : s;
    }
  }
  function wl(e, t) {
    return e && (e[t] || e[kt(t)] || e[yi(kt(t))]);
  }
  function ze(e, t, n, r) {
    let o;
    const i = n,
      s = ue(e);
    if (s || Fe(e)) {
      const a = s && qn(e);
      let l = !1,
        u = !1;
      (a && ((l = !zt(e)), (u = Nn(e)), (e = xi(e))), (o = new Array(e.length)));
      for (let f = 0, c = e.length; f < c; f++)
        o[f] = t(l ? (u ? qo(ot(e[f])) : ot(e[f])) : e[f], f, void 0, i);
    } else if (typeof e == 'number') {
      o = new Array(e);
      for (let a = 0; a < e; a++) o[a] = t(a + 1, a, void 0, i);
    } else if (Le(e))
      if (e[Symbol.iterator]) o = Array.from(e, (a, l) => t(a, l, void 0, i));
      else {
        const a = Object.keys(e);
        o = new Array(a.length);
        for (let l = 0, u = a.length; l < u; l++) {
          const f = a[l];
          o[l] = t(e[f], f, l, i);
        }
      }
    else o = [];
    return o;
  }
  function Sa(e, t) {
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      if (ue(r)) for (let o = 0; o < r.length; o++) e[r[o].name] = r[o].fn;
      else
        r &&
          (e[r.name] = r.key
            ? (...o) => {
                const i = r.fn(...o);
                return (i && (i.key = r.key), i);
              }
            : r.fn);
    }
    return e;
  }
  function Ne(e, t, n = {}, r, o) {
    if (it.ce || (it.parent && yr(it.parent) && it.parent.ce)) {
      const u = Object.keys(n).length > 0;
      return (
        t !== 'default' && (n.name = t),
        N(),
        me(he, null, [Te('slot', n, r && r())], u ? -2 : 64)
      );
    }
    let i = e[t];
    (i && i._c && (i._d = !1), N());
    const s = i && Af(i(n)),
      a = n.key || (s && s.key),
      l = me(
        he,
        { key: (a && !gn(a) ? a : `_${t}`) + (!s && r ? '_fb' : '') },
        s || (r ? r() : []),
        s && e._ === 1 ? 64 : -2,
      );
    return (l.scopeId && (l.slotScopeIds = [l.scopeId + '-s']), i && i._c && (i._d = !0), l);
  }
  function Af(e) {
    return e.some((t) => (so(t) ? !(t.type === nn || (t.type === he && !Af(t.children))) : !0))
      ? e
      : null;
  }
  function lg(e, t) {
    const n = {};
    for (const r in e) n[/[A-Z]/.test(r) ? `on:${r}` : Lo(r)] = e[r];
    return n;
  }
  const Ls = (e) => (e ? (Xf(e) ? Ai(e) : Ls(e.parent)) : null),
    Xr = Je(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => Ls(e.parent),
      $root: (e) => Ls(e.root),
      $host: (e) => e.ce,
      $emit: (e) => e.emit,
      $options: (e) => kf(e),
      $forceUpdate: (e) =>
        e.f ||
        (e.f = () => {
          xa(e.update);
        }),
      $nextTick: (e) => e.n || (e.n = mo.bind(e.proxy)),
      $watch: (e) => Mg.bind(e),
    }),
    es = (e, t) => e !== Ae && !e.__isScriptSetup && ke(e, t),
    cg = {
      get({ _: e }, t) {
        if (t === '__v_skip') return !0;
        const {
          ctx: n,
          setupState: r,
          data: o,
          props: i,
          accessCache: s,
          type: a,
          appContext: l,
        } = e;
        let u;
        if (t[0] !== '$') {
          const h = s[t];
          if (h !== void 0)
            switch (h) {
              case 1:
                return r[t];
              case 2:
                return o[t];
              case 4:
                return n[t];
              case 3:
                return i[t];
            }
          else {
            if (es(r, t)) return ((s[t] = 1), r[t]);
            if (o !== Ae && ke(o, t)) return ((s[t] = 2), o[t]);
            if ((u = e.propsOptions[0]) && ke(u, t)) return ((s[t] = 3), i[t]);
            if (n !== Ae && ke(n, t)) return ((s[t] = 4), n[t]);
            Ds && (s[t] = 0);
          }
        }
        const f = Xr[t];
        let c, d;
        if (f) return (t === '$attrs' && dt(e.attrs, 'get', ''), f(e));
        if ((c = a.__cssModules) && (c = c[t])) return c;
        if (n !== Ae && ke(n, t)) return ((s[t] = 4), n[t]);
        if (((d = l.config.globalProperties), ke(d, t))) return d[t];
      },
      set({ _: e }, t, n) {
        const { data: r, setupState: o, ctx: i } = e;
        return es(o, t)
          ? ((o[t] = n), !0)
          : r !== Ae && ke(r, t)
            ? ((r[t] = n), !0)
            : ke(e.props, t) || (t[0] === '$' && t.slice(1) in e)
              ? !1
              : ((i[t] = n), !0);
      },
      has(
        {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: r,
            appContext: o,
            propsOptions: i,
            type: s,
          },
        },
        a,
      ) {
        let l, u;
        return !!(
          n[a] ||
          (e !== Ae && a[0] !== '$' && ke(e, a)) ||
          es(t, a) ||
          ((l = i[0]) && ke(l, a)) ||
          ke(r, a) ||
          ke(Xr, a) ||
          ke(o.config.globalProperties, a) ||
          ((u = s.__cssModules) && u[a])
        );
      },
      defineProperty(e, t, n) {
        return (
          n.get != null
            ? (e._.accessCache[t] = 0)
            : ke(n, 'value') && this.set(e, t, n.value, null),
          Reflect.defineProperty(e, t, n)
        );
      },
    };
  function Si() {
    return If().slots;
  }
  function ug() {
    return If().attrs;
  }
  function If(e) {
    const t = Pi();
    return t.setupContext || (t.setupContext = Yf(t));
  }
  function Qo(e) {
    return ue(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
  }
  function _r(e, t) {
    return !e || !t ? e || t : ue(e) && ue(t) ? e.concat(t) : Je({}, Qo(e), Qo(t));
  }
  let Ds = !0;
  function fg(e) {
    const t = kf(e),
      n = e.proxy,
      r = e.ctx;
    ((Ds = !1), t.beforeCreate && xl(t.beforeCreate, e, 'bc'));
    const {
      data: o,
      computed: i,
      methods: s,
      watch: a,
      provide: l,
      inject: u,
      created: f,
      beforeMount: c,
      mounted: d,
      beforeUpdate: h,
      updated: p,
      activated: m,
      deactivated: g,
      beforeDestroy: v,
      beforeUnmount: b,
      destroyed: w,
      unmounted: y,
      render: x,
      renderTracked: E,
      renderTriggered: C,
      errorCaptured: P,
      serverPrefetch: M,
      expose: A,
      inheritAttrs: j,
      components: R,
      directives: V,
      filters: re,
    } = t;
    if ((u && dg(u, r, null), s))
      for (const le in s) {
        const te = s[le];
        ge(te) && (r[le] = te.bind(n));
      }
    if (o) {
      const le = o.call(n, n);
      Le(le) && (e.data = Ot(le));
    }
    if (((Ds = !0), i))
      for (const le in i) {
        const te = i[le],
          Oe = ge(te) ? te.bind(n, n) : ge(te.get) ? te.get.bind(n, n) : tn,
          qe = !ge(te) && ge(te.set) ? te.set.bind(n) : tn,
          we = B({ get: Oe, set: qe });
        Object.defineProperty(r, le, {
          enumerable: !0,
          configurable: !0,
          get: () => we.value,
          set: (Ie) => (we.value = Ie),
        });
      }
    if (a) for (const le in a) Mf(a[le], r, n, le);
    if (l) {
      const le = ge(l) ? l.call(n) : l;
      Reflect.ownKeys(le).forEach((te) => {
        Bt(te, le[te]);
      });
    }
    f && xl(f, e, 'c');
    function X(le, te) {
      ue(te) ? te.forEach((Oe) => le(Oe.bind(n))) : te && le(te.bind(n));
    }
    if (
      (X(_f, c),
      X(mn, d),
      X(ng, h),
      X(Sf, p),
      X(Qp, m),
      X(eg, g),
      X(sg, P),
      X(ig, E),
      X(og, C),
      X(jn, b),
      X(tr, y),
      X(rg, M),
      ue(A))
    )
      if (A.length) {
        const le = e.exposed || (e.exposed = {});
        A.forEach((te) => {
          Object.defineProperty(le, te, {
            get: () => n[te],
            set: (Oe) => (n[te] = Oe),
            enumerable: !0,
          });
        });
      } else e.exposed || (e.exposed = {});
    (x && e.render === tn && (e.render = x),
      j != null && (e.inheritAttrs = j),
      R && (e.components = R),
      V && (e.directives = V),
      M && wf(e));
  }
  function dg(e, t, n = tn) {
    ue(e) && (e = $s(e));
    for (const r in e) {
      const o = e[r];
      let i;
      (Le(o)
        ? 'default' in o
          ? (i = rt(o.from || r, o.default, !0))
          : (i = rt(o.from || r))
        : (i = rt(o)),
        tt(i)
          ? Object.defineProperty(t, r, {
              enumerable: !0,
              configurable: !0,
              get: () => i.value,
              set: (s) => (i.value = s),
            })
          : (t[r] = i));
    }
  }
  function xl(e, t, n) {
    Zt(ue(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
  }
  function Mf(e, t, n, r) {
    let o = r.includes('.') ? Hf(n, r) : () => n[r];
    if (Fe(e)) {
      const i = t[e];
      ge(i) && be(o, i);
    } else if (ge(e)) be(o, e.bind(n));
    else if (Le(e))
      if (ue(e)) e.forEach((i) => Mf(i, t, n, r));
      else {
        const i = ge(e.handler) ? e.handler.bind(n) : t[e.handler];
        ge(i) && be(o, i, e);
      }
  }
  function kf(e) {
    const t = e.type,
      { mixins: n, extends: r } = t,
      {
        mixins: o,
        optionsCache: i,
        config: { optionMergeStrategies: s },
      } = e.appContext,
      a = i.get(t);
    let l;
    return (
      a
        ? (l = a)
        : !o.length && !n && !r
          ? (l = t)
          : ((l = {}), o.length && o.forEach((u) => ei(l, u, s, !0)), ei(l, t, s)),
      Le(t) && i.set(t, l),
      l
    );
  }
  function ei(e, t, n, r = !1) {
    const { mixins: o, extends: i } = t;
    (i && ei(e, i, n, !0), o && o.forEach((s) => ei(e, s, n, !0)));
    for (const s in t)
      if (!(r && s === 'expose')) {
        const a = hg[s] || (n && n[s]);
        e[s] = a ? a(e[s], t[s]) : t[s];
      }
    return e;
  }
  const hg = {
    data: El,
    props: _l,
    emits: _l,
    methods: Ur,
    computed: Ur,
    beforeCreate: gt,
    created: gt,
    beforeMount: gt,
    mounted: gt,
    beforeUpdate: gt,
    updated: gt,
    beforeDestroy: gt,
    beforeUnmount: gt,
    destroyed: gt,
    unmounted: gt,
    activated: gt,
    deactivated: gt,
    errorCaptured: gt,
    serverPrefetch: gt,
    components: Ur,
    directives: Ur,
    watch: gg,
    provide: El,
    inject: pg,
  };
  function El(e, t) {
    return t
      ? e
        ? function () {
            return Je(ge(e) ? e.call(this, this) : e, ge(t) ? t.call(this, this) : t);
          }
        : t
      : e;
  }
  function pg(e, t) {
    return Ur($s(e), $s(t));
  }
  function $s(e) {
    if (ue(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function gt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function Ur(e, t) {
    return e ? Je(Object.create(null), e, t) : t;
  }
  function _l(e, t) {
    return e
      ? ue(e) && ue(t)
        ? [...new Set([...e, ...t])]
        : Je(Object.create(null), Qo(e), Qo(t ?? {}))
      : t;
  }
  function gg(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Je(Object.create(null), e);
    for (const r in t) n[r] = gt(e[r], t[r]);
    return n;
  }
  function Rf() {
    return {
      app: null,
      config: {
        isNativeTag: ju,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
    };
  }
  let vg = 0;
  function mg(e, t) {
    return function (r, o = null) {
      (ge(r) || (r = Je({}, r)), o != null && !Le(o) && (o = null));
      const i = Rf(),
        s = new WeakSet(),
        a = [];
      let l = !1;
      const u = (i.app = {
        _uid: vg++,
        _component: r,
        _props: o,
        _container: null,
        _context: i,
        _instance: null,
        version: Gg,
        get config() {
          return i.config;
        },
        set config(f) {},
        use(f, ...c) {
          return (
            s.has(f) ||
              (f && ge(f.install)
                ? (s.add(f), f.install(u, ...c))
                : ge(f) && (s.add(f), f(u, ...c))),
            u
          );
        },
        mixin(f) {
          return (i.mixins.includes(f) || i.mixins.push(f), u);
        },
        component(f, c) {
          return c ? ((i.components[f] = c), u) : i.components[f];
        },
        directive(f, c) {
          return c ? ((i.directives[f] = c), u) : i.directives[f];
        },
        mount(f, c, d) {
          if (!l) {
            const h = u._ceVNode || Te(r, o);
            return (
              (h.appContext = i),
              d === !0 ? (d = 'svg') : d === !1 && (d = void 0),
              e(h, f, d),
              (l = !0),
              (u._container = f),
              (f.__vue_app__ = u),
              Ai(h.component)
            );
          }
        },
        onUnmount(f) {
          a.push(f);
        },
        unmount() {
          l && (Zt(a, u._instance, 16), e(null, u._container), delete u._container.__vue_app__);
        },
        provide(f, c) {
          return ((i.provides[f] = c), u);
        },
        runWithContext(f) {
          const c = br;
          br = u;
          try {
            return f();
          } finally {
            br = c;
          }
        },
      });
      return u;
    };
  }
  let br = null;
  function Bt(e, t) {
    if (ht) {
      let n = ht.provides;
      const r = ht.parent && ht.parent.provides;
      (r === n && (n = ht.provides = Object.create(r)), (n[e] = t));
    }
  }
  function rt(e, t, n = !1) {
    const r = Pi();
    if (r || br) {
      let o = br
        ? br._context.provides
        : r
          ? r.parent == null || r.ce
            ? r.vnode.appContext && r.vnode.appContext.provides
            : r.parent.provides
          : void 0;
      if (o && e in o) return o[e];
      if (arguments.length > 1) return n && ge(t) ? t.call(r && r.proxy) : t;
    }
  }
  const Nf = {},
    Lf = () => Object.create(Nf),
    Df = (e) => Object.getPrototypeOf(e) === Nf;
  function yg(e, t, n, r = !1) {
    const o = {},
      i = Lf();
    ((e.propsDefaults = Object.create(null)), $f(e, t, o, i));
    for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
    (n ? (e.props = r ? o : lf(o)) : e.type.props ? (e.props = o) : (e.props = i), (e.attrs = i));
  }
  function bg(e, t, n, r) {
    const {
        props: o,
        attrs: i,
        vnode: { patchFlag: s },
      } = e,
      a = Ce(o),
      [l] = e.propsOptions;
    let u = !1;
    if ((r || s > 0) && !(s & 16)) {
      if (s & 8) {
        const f = e.vnode.dynamicProps;
        for (let c = 0; c < f.length; c++) {
          let d = f[c];
          if (Ti(e.emitsOptions, d)) continue;
          const h = t[d];
          if (l)
            if (ke(i, d)) h !== i[d] && ((i[d] = h), (u = !0));
            else {
              const p = kt(d);
              o[p] = js(l, a, p, h, e, !1);
            }
          else h !== i[d] && ((i[d] = h), (u = !0));
        }
      }
    } else {
      $f(e, t, o, i) && (u = !0);
      let f;
      for (const c in a)
        (!t || (!ke(t, c) && ((f = $n(c)) === c || !ke(t, f)))) &&
          (l
            ? n && (n[c] !== void 0 || n[f] !== void 0) && (o[c] = js(l, a, c, void 0, e, !0))
            : delete o[c]);
      if (i !== a) for (const c in i) (!t || !ke(t, c)) && (delete i[c], (u = !0));
    }
    u && un(e.attrs, 'set', '');
  }
  function $f(e, t, n, r) {
    const [o, i] = e.propsOptions;
    let s = !1,
      a;
    if (t)
      for (let l in t) {
        if (Zr(l)) continue;
        const u = t[l];
        let f;
        o && ke(o, (f = kt(l)))
          ? !i || !i.includes(f)
            ? (n[f] = u)
            : ((a || (a = {}))[f] = u)
          : Ti(e.emitsOptions, l) || ((!(l in r) || u !== r[l]) && ((r[l] = u), (s = !0)));
      }
    if (i) {
      const l = Ce(n),
        u = a || Ae;
      for (let f = 0; f < i.length; f++) {
        const c = i[f];
        n[c] = js(o, l, c, u[c], e, !ke(u, c));
      }
    }
    return s;
  }
  function js(e, t, n, r, o, i) {
    const s = e[n];
    if (s != null) {
      const a = ke(s, 'default');
      if (a && r === void 0) {
        const l = s.default;
        if (s.type !== Function && !s.skipFactory && ge(l)) {
          const { propsDefaults: u } = o;
          if (n in u) r = u[n];
          else {
            const f = yo(o);
            ((r = u[n] = l.call(null, t)), f());
          }
        } else r = l;
        o.ce && o.ce._setProp(n, r);
      }
      s[0] && (i && !a ? (r = !1) : s[1] && (r === '' || r === $n(n)) && (r = !0));
    }
    return r;
  }
  const wg = new WeakMap();
  function jf(e, t, n = !1) {
    const r = n ? wg : t.propsCache,
      o = r.get(e);
    if (o) return o;
    const i = e.props,
      s = {},
      a = [];
    let l = !1;
    if (!ge(e)) {
      const f = (c) => {
        l = !0;
        const [d, h] = jf(c, t, !0);
        (Je(s, d), h && a.push(...h));
      };
      (!n && t.mixins.length && t.mixins.forEach(f),
        e.extends && f(e.extends),
        e.mixins && e.mixins.forEach(f));
    }
    if (!i && !l) return (Le(e) && r.set(e, gr), gr);
    if (ue(i))
      for (let f = 0; f < i.length; f++) {
        const c = kt(i[f]);
        Sl(c) && (s[c] = Ae);
      }
    else if (i)
      for (const f in i) {
        const c = kt(f);
        if (Sl(c)) {
          const d = i[f],
            h = (s[c] = ue(d) || ge(d) ? { type: d } : Je({}, d)),
            p = h.type;
          let m = !1,
            g = !0;
          if (ue(p))
            for (let v = 0; v < p.length; ++v) {
              const b = p[v],
                w = ge(b) && b.name;
              if (w === 'Boolean') {
                m = !0;
                break;
              } else w === 'String' && (g = !1);
            }
          else m = ge(p) && p.name === 'Boolean';
          ((h[0] = m), (h[1] = g), (m || ke(h, 'default')) && a.push(c));
        }
      }
    const u = [s, a];
    return (Le(e) && r.set(e, u), u);
  }
  function Sl(e) {
    return e[0] !== '$' && !Zr(e);
  }
  const Ca = (e) => e === '_' || e === '_ctx' || e === '$stable',
    Ta = (e) => (ue(e) ? e.map(Yt) : [Yt(e)]),
    xg = (e, t, n) => {
      if (t._n) return t;
      const r = Ze((...o) => Ta(t(...o)), n);
      return ((r._c = !1), r);
    },
    zf = (e, t, n) => {
      const r = e._ctx;
      for (const o in e) {
        if (Ca(o)) continue;
        const i = e[o];
        if (ge(i)) t[o] = xg(o, i, r);
        else if (i != null) {
          const s = Ta(i);
          t[o] = () => s;
        }
      }
    },
    Bf = (e, t) => {
      const n = Ta(t);
      e.slots.default = () => n;
    },
    Ff = (e, t, n) => {
      for (const r in t) (n || !Ca(r)) && (e[r] = t[r]);
    },
    Eg = (e, t, n) => {
      const r = (e.slots = Lf());
      if (e.vnode.shapeFlag & 32) {
        const o = t._;
        o ? (Ff(r, t, n), n && Hu(r, '_', o, !0)) : zf(t, r);
      } else t && Bf(e, t);
    },
    _g = (e, t, n) => {
      const { vnode: r, slots: o } = e;
      let i = !0,
        s = Ae;
      if (r.shapeFlag & 32) {
        const a = t._;
        (a ? (n && a === 1 ? (i = !1) : Ff(o, t, n)) : ((i = !t.$stable), zf(t, o)), (s = t));
      } else t && (Bf(e, t), (s = { default: 1 }));
      if (i) for (const a in o) !Ca(a) && s[a] == null && delete o[a];
    },
    vt = jg;
  function Sg(e) {
    return Cg(e);
  }
  function Cg(e, t) {
    const n = bi();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: o,
        patchProp: i,
        createElement: s,
        createText: a,
        createComment: l,
        setText: u,
        setElementText: f,
        parentNode: c,
        nextSibling: d,
        setScopeId: h = tn,
        insertStaticContent: p,
      } = e,
      m = (
        _,
        S,
        T,
        D = null,
        z = null,
        $ = null,
        G = void 0,
        q = null,
        W = !!S.dynamicChildren,
      ) => {
        if (_ === S) return;
        (_ && !fr(_, S) && ((D = O(_)), Ie(_, z, $, !0), (_ = null)),
          S.patchFlag === -2 && ((W = !1), (S.dynamicChildren = null)));
        const { type: F, ref: ce, shapeFlag: Y } = S;
        switch (F) {
          case Oi:
            g(_, S, T, D);
            break;
          case nn:
            v(_, S, T, D);
            break;
          case ns:
            _ == null && b(S, T, D, G);
            break;
          case he:
            R(_, S, T, D, z, $, G, q, W);
            break;
          default:
            Y & 1
              ? x(_, S, T, D, z, $, G, q, W)
              : Y & 6
                ? V(_, S, T, D, z, $, G, q, W)
                : (Y & 64 || Y & 128) && F.process(_, S, T, D, z, $, G, q, W, ee);
        }
        ce != null && z
          ? Gr(ce, _ && _.ref, $, S || _, !S)
          : ce == null && _ && _.ref != null && Gr(_.ref, null, $, _, !0);
      },
      g = (_, S, T, D) => {
        if (_ == null) r((S.el = a(S.children)), T, D);
        else {
          const z = (S.el = _.el);
          S.children !== _.children && u(z, S.children);
        }
      },
      v = (_, S, T, D) => {
        _ == null ? r((S.el = l(S.children || '')), T, D) : (S.el = _.el);
      },
      b = (_, S, T, D) => {
        [_.el, _.anchor] = p(_.children, S, T, D, _.el, _.anchor);
      },
      w = ({ el: _, anchor: S }, T, D) => {
        let z;
        for (; _ && _ !== S; ) ((z = d(_)), r(_, T, D), (_ = z));
        r(S, T, D);
      },
      y = ({ el: _, anchor: S }) => {
        let T;
        for (; _ && _ !== S; ) ((T = d(_)), o(_), (_ = T));
        o(S);
      },
      x = (_, S, T, D, z, $, G, q, W) => {
        if ((S.type === 'svg' ? (G = 'svg') : S.type === 'math' && (G = 'mathml'), _ == null))
          E(S, T, D, z, $, G, q, W);
        else {
          const F = _.el && _.el._isVueCE ? _.el : null;
          try {
            (F && F._beginPatch(), M(_, S, z, $, G, q, W));
          } finally {
            F && F._endPatch();
          }
        }
      },
      E = (_, S, T, D, z, $, G, q) => {
        let W, F;
        const { props: ce, shapeFlag: Y, transition: se, dirs: de } = _;
        if (
          ((W = _.el = s(_.type, $, ce && ce.is, ce)),
          Y & 8 ? f(W, _.children) : Y & 16 && P(_.children, W, null, D, z, ts(_, $), G, q),
          de && zn(_, null, D, 'created'),
          C(W, _, _.scopeId, G, D),
          ce)
        ) {
          for (const Re in ce) Re !== 'value' && !Zr(Re) && i(W, Re, null, ce[Re], $, D);
          ('value' in ce && i(W, 'value', null, ce.value, $),
            (F = ce.onVnodeBeforeMount) && qt(F, D, _));
        }
        de && zn(_, null, D, 'beforeMount');
        const _e = Tg(z, se);
        (_e && se.beforeEnter(W),
          r(W, S, T),
          ((F = ce && ce.onVnodeMounted) || _e || de) &&
            vt(() => {
              (F && qt(F, D, _), _e && se.enter(W), de && zn(_, null, D, 'mounted'));
            }, z));
      },
      C = (_, S, T, D, z) => {
        if ((T && h(_, T), D)) for (let $ = 0; $ < D.length; $++) h(_, D[$]);
        if (z) {
          let $ = z.subTree;
          if (S === $ || (Wf($.type) && ($.ssContent === S || $.ssFallback === S))) {
            const G = z.vnode;
            C(_, G, G.scopeId, G.slotScopeIds, z.parent);
          }
        }
      },
      P = (_, S, T, D, z, $, G, q, W = 0) => {
        for (let F = W; F < _.length; F++) {
          const ce = (_[F] = q ? Tn(_[F]) : Yt(_[F]));
          m(null, ce, S, T, D, z, $, G, q);
        }
      },
      M = (_, S, T, D, z, $, G) => {
        const q = (S.el = _.el);
        let { patchFlag: W, dynamicChildren: F, dirs: ce } = S;
        W |= _.patchFlag & 16;
        const Y = _.props || Ae,
          se = S.props || Ae;
        let de;
        if (
          (T && Bn(T, !1),
          (de = se.onVnodeBeforeUpdate) && qt(de, T, S, _),
          ce && zn(S, _, T, 'beforeUpdate'),
          T && Bn(T, !0),
          ((Y.innerHTML && se.innerHTML == null) || (Y.textContent && se.textContent == null)) &&
            f(q, ''),
          F
            ? A(_.dynamicChildren, F, q, T, D, ts(S, z), $)
            : G || te(_, S, q, null, T, D, ts(S, z), $, !1),
          W > 0)
        ) {
          if (W & 16) j(q, Y, se, T, z);
          else if (
            (W & 2 && Y.class !== se.class && i(q, 'class', null, se.class, z),
            W & 4 && i(q, 'style', Y.style, se.style, z),
            W & 8)
          ) {
            const _e = S.dynamicProps;
            for (let Re = 0; Re < _e.length; Re++) {
              const Pe = _e[Re],
                lt = Y[Pe],
                ct = se[Pe];
              (ct !== lt || Pe === 'value') && i(q, Pe, lt, ct, z, T);
            }
          }
          W & 1 && _.children !== S.children && f(q, S.children);
        } else !G && F == null && j(q, Y, se, T, z);
        ((de = se.onVnodeUpdated) || ce) &&
          vt(() => {
            (de && qt(de, T, S, _), ce && zn(S, _, T, 'updated'));
          }, D);
      },
      A = (_, S, T, D, z, $, G) => {
        for (let q = 0; q < S.length; q++) {
          const W = _[q],
            F = S[q],
            ce = W.el && (W.type === he || !fr(W, F) || W.shapeFlag & 198) ? c(W.el) : T;
          m(W, F, ce, null, D, z, $, G, !0);
        }
      },
      j = (_, S, T, D, z) => {
        if (S !== T) {
          if (S !== Ae) for (const $ in S) !Zr($) && !($ in T) && i(_, $, S[$], null, z, D);
          for (const $ in T) {
            if (Zr($)) continue;
            const G = T[$],
              q = S[$];
            G !== q && $ !== 'value' && i(_, $, q, G, z, D);
          }
          'value' in T && i(_, 'value', S.value, T.value, z);
        }
      },
      R = (_, S, T, D, z, $, G, q, W) => {
        const F = (S.el = _ ? _.el : a('')),
          ce = (S.anchor = _ ? _.anchor : a(''));
        let { patchFlag: Y, dynamicChildren: se, slotScopeIds: de } = S;
        (de && (q = q ? q.concat(de) : de),
          _ == null
            ? (r(F, T, D), r(ce, T, D), P(S.children || [], T, ce, z, $, G, q, W))
            : Y > 0 && Y & 64 && se && _.dynamicChildren
              ? (A(_.dynamicChildren, se, T, z, $, G, q),
                (S.key != null || (z && S === z.subTree)) && Oa(_, S, !0))
              : te(_, S, T, ce, z, $, G, q, W));
      },
      V = (_, S, T, D, z, $, G, q, W) => {
        ((S.slotScopeIds = q),
          _ == null
            ? S.shapeFlag & 512
              ? z.ctx.activate(S, T, D, G, W)
              : re(S, T, D, z, $, G, W)
            : ne(_, S, W));
      },
      re = (_, S, T, D, z, $, G) => {
        const q = (_.component = Hg(_, D, z));
        if ((xf(_) && (q.ctx.renderer = ee), Vg(q, !1, G), q.asyncDep)) {
          if ((z && z.registerDep(q, X, G), !_.el)) {
            const W = (q.subTree = Te(nn));
            (v(null, W, S, T), (_.placeholder = W.el));
          }
        } else X(q, _, S, T, z, $, G);
      },
      ne = (_, S, T) => {
        const D = (S.component = _.component);
        if (Dg(_, S, T))
          if (D.asyncDep && !D.asyncResolved) {
            le(D, S, T);
            return;
          } else ((D.next = S), D.update());
        else ((S.el = _.el), (D.vnode = S));
      },
      X = (_, S, T, D, z, $, G) => {
        const q = () => {
          if (_.isMounted) {
            let { next: Y, bu: se, u: de, parent: _e, vnode: Re } = _;
            {
              const Lt = Uf(_);
              if (Lt) {
                (Y && ((Y.el = Re.el), le(_, Y, G)),
                  Lt.asyncDep.then(() => {
                    _.isUnmounted || q();
                  }));
                return;
              }
            }
            let Pe = Y,
              lt;
            (Bn(_, !1),
              Y ? ((Y.el = Re.el), le(_, Y, G)) : (Y = Re),
              se && Do(se),
              (lt = Y.props && Y.props.onVnodeBeforeUpdate) && qt(lt, _e, Y, Re),
              Bn(_, !0));
            const ct = Tl(_),
              Pt = _.subTree;
            ((_.subTree = ct),
              m(Pt, ct, c(Pt.el), O(Pt), _, z, $),
              (Y.el = ct.el),
              Pe === null && $g(_, ct.el),
              de && vt(de, z),
              (lt = Y.props && Y.props.onVnodeUpdated) && vt(() => qt(lt, _e, Y, Re), z));
          } else {
            let Y;
            const { el: se, props: de } = S,
              { bm: _e, m: Re, parent: Pe, root: lt, type: ct } = _,
              Pt = yr(S);
            (Bn(_, !1),
              _e && Do(_e),
              !Pt && (Y = de && de.onVnodeBeforeMount) && qt(Y, Pe, S),
              Bn(_, !0));
            {
              lt.ce && lt.ce._def.shadowRoot !== !1 && lt.ce._injectChildStyle(ct);
              const Lt = (_.subTree = Tl(_));
              (m(null, Lt, T, D, _, z, $), (S.el = Lt.el));
            }
            if ((Re && vt(Re, z), !Pt && (Y = de && de.onVnodeMounted))) {
              const Lt = S;
              vt(() => qt(Y, Pe, Lt), z);
            }
            ((S.shapeFlag & 256 || (Pe && yr(Pe.vnode) && Pe.vnode.shapeFlag & 256)) &&
              _.a &&
              vt(_.a, z),
              (_.isMounted = !0),
              (S = T = D = null));
          }
        };
        _.scope.on();
        const W = (_.effect = new Ku(q));
        _.scope.off();
        const F = (_.update = W.run.bind(W)),
          ce = (_.job = W.runIfDirty.bind(W));
        ((ce.i = _), (ce.id = _.uid), (W.scheduler = () => xa(ce)), Bn(_, !0), F());
      },
      le = (_, S, T) => {
        S.component = _;
        const D = _.vnode.props;
        ((_.vnode = S),
          (_.next = null),
          bg(_, S.props, D, T),
          _g(_, S.children, T),
          hn(),
          gl(_),
          pn());
      },
      te = (_, S, T, D, z, $, G, q, W = !1) => {
        const F = _ && _.children,
          ce = _ ? _.shapeFlag : 0,
          Y = S.children,
          { patchFlag: se, shapeFlag: de } = S;
        if (se > 0) {
          if (se & 128) {
            qe(F, Y, T, D, z, $, G, q, W);
            return;
          } else if (se & 256) {
            Oe(F, Y, T, D, z, $, G, q, W);
            return;
          }
        }
        de & 8
          ? (ce & 16 && H(F, z, $), Y !== F && f(T, Y))
          : ce & 16
            ? de & 16
              ? qe(F, Y, T, D, z, $, G, q, W)
              : H(F, z, $, !0)
            : (ce & 8 && f(T, ''), de & 16 && P(Y, T, D, z, $, G, q, W));
      },
      Oe = (_, S, T, D, z, $, G, q, W) => {
        ((_ = _ || gr), (S = S || gr));
        const F = _.length,
          ce = S.length,
          Y = Math.min(F, ce);
        let se;
        for (se = 0; se < Y; se++) {
          const de = (S[se] = W ? Tn(S[se]) : Yt(S[se]));
          m(_[se], de, T, null, z, $, G, q, W);
        }
        F > ce ? H(_, z, $, !0, !1, Y) : P(S, T, D, z, $, G, q, W, Y);
      },
      qe = (_, S, T, D, z, $, G, q, W) => {
        let F = 0;
        const ce = S.length;
        let Y = _.length - 1,
          se = ce - 1;
        for (; F <= Y && F <= se; ) {
          const de = _[F],
            _e = (S[F] = W ? Tn(S[F]) : Yt(S[F]));
          if (fr(de, _e)) m(de, _e, T, null, z, $, G, q, W);
          else break;
          F++;
        }
        for (; F <= Y && F <= se; ) {
          const de = _[Y],
            _e = (S[se] = W ? Tn(S[se]) : Yt(S[se]));
          if (fr(de, _e)) m(de, _e, T, null, z, $, G, q, W);
          else break;
          (Y--, se--);
        }
        if (F > Y) {
          if (F <= se) {
            const de = se + 1,
              _e = de < ce ? S[de].el : D;
            for (; F <= se; )
              (m(null, (S[F] = W ? Tn(S[F]) : Yt(S[F])), T, _e, z, $, G, q, W), F++);
          }
        } else if (F > se) for (; F <= Y; ) (Ie(_[F], z, $, !0), F++);
        else {
          const de = F,
            _e = F,
            Re = new Map();
          for (F = _e; F <= se; F++) {
            const ut = (S[F] = W ? Tn(S[F]) : Yt(S[F]));
            ut.key != null && Re.set(ut.key, F);
          }
          let Pe,
            lt = 0;
          const ct = se - _e + 1;
          let Pt = !1,
            Lt = 0;
          const bn = new Array(ct);
          for (F = 0; F < ct; F++) bn[F] = 0;
          for (F = de; F <= Y; F++) {
            const ut = _[F];
            if (lt >= ct) {
              Ie(ut, z, $, !0);
              continue;
            }
            let k;
            if (ut.key != null) k = Re.get(ut.key);
            else
              for (Pe = _e; Pe <= se; Pe++)
                if (bn[Pe - _e] === 0 && fr(ut, S[Pe])) {
                  k = Pe;
                  break;
                }
            k === void 0
              ? Ie(ut, z, $, !0)
              : ((bn[k - _e] = F + 1),
                k >= Lt ? (Lt = k) : (Pt = !0),
                m(ut, S[k], T, null, z, $, G, q, W),
                lt++);
          }
          const sr = Pt ? Og(bn) : gr;
          for (Pe = sr.length - 1, F = ct - 1; F >= 0; F--) {
            const ut = _e + F,
              k = S[ut],
              ae = S[ut + 1],
              oe = ut + 1 < ce ? ae.el || ae.placeholder : D;
            bn[F] === 0
              ? m(null, k, T, oe, z, $, G, q, W)
              : Pt && (Pe < 0 || F !== sr[Pe] ? we(k, T, oe, 2) : Pe--);
          }
        }
      },
      we = (_, S, T, D, z = null) => {
        const { el: $, type: G, transition: q, children: W, shapeFlag: F } = _;
        if (F & 6) {
          we(_.component.subTree, S, T, D);
          return;
        }
        if (F & 128) {
          _.suspense.move(S, T, D);
          return;
        }
        if (F & 64) {
          G.move(_, S, T, ee);
          return;
        }
        if (G === he) {
          r($, S, T);
          for (let Y = 0; Y < W.length; Y++) we(W[Y], S, T, D);
          r(_.anchor, S, T);
          return;
        }
        if (G === ns) {
          w(_, S, T);
          return;
        }
        if (D !== 2 && F & 1 && q)
          if (D === 0) (q.beforeEnter($), r($, S, T), vt(() => q.enter($), z));
          else {
            const { leave: Y, delayLeave: se, afterLeave: de } = q,
              _e = () => {
                _.ctx.isUnmounted ? o($) : r($, S, T);
              },
              Re = () => {
                ($._isLeaving && $[Hn](!0),
                  Y($, () => {
                    (_e(), de && de());
                  }));
              };
            se ? se($, _e, Re) : Re();
          }
        else r($, S, T);
      },
      Ie = (_, S, T, D = !1, z = !1) => {
        const {
          type: $,
          props: G,
          ref: q,
          children: W,
          dynamicChildren: F,
          shapeFlag: ce,
          patchFlag: Y,
          dirs: se,
          cacheIndex: de,
        } = _;
        if (
          (Y === -2 && (z = !1),
          q != null && (hn(), Gr(q, null, T, _, !0), pn()),
          de != null && (S.renderCache[de] = void 0),
          ce & 256)
        ) {
          S.ctx.deactivate(_);
          return;
        }
        const _e = ce & 1 && se,
          Re = !yr(_);
        let Pe;
        if ((Re && (Pe = G && G.onVnodeBeforeUnmount) && qt(Pe, S, _), ce & 6))
          He(_.component, T, D);
        else {
          if (ce & 128) {
            _.suspense.unmount(T, D);
            return;
          }
          (_e && zn(_, null, S, 'beforeUnmount'),
            ce & 64
              ? _.type.remove(_, S, T, ee, D)
              : F && !F.hasOnce && ($ !== he || (Y > 0 && Y & 64))
                ? H(F, S, T, !1, !0)
                : (($ === he && Y & 384) || (!z && ce & 16)) && H(W, S, T),
            D && Ye(_));
        }
        ((Re && (Pe = G && G.onVnodeUnmounted)) || _e) &&
          vt(() => {
            (Pe && qt(Pe, S, _), _e && zn(_, null, S, 'unmounted'));
          }, T);
      },
      Ye = (_) => {
        const { type: S, el: T, anchor: D, transition: z } = _;
        if (S === he) {
          at(T, D);
          return;
        }
        if (S === ns) {
          y(_);
          return;
        }
        const $ = () => {
          (o(T), z && !z.persisted && z.afterLeave && z.afterLeave());
        };
        if (_.shapeFlag & 1 && z && !z.persisted) {
          const { leave: G, delayLeave: q } = z,
            W = () => G(T, $);
          q ? q(_.el, $, W) : W();
        } else $();
      },
      at = (_, S) => {
        let T;
        for (; _ !== S; ) ((T = d(_)), o(_), (_ = T));
        o(S);
      },
      He = (_, S, T) => {
        const { bum: D, scope: z, job: $, subTree: G, um: q, m: W, a: F } = _;
        (Cl(W),
          Cl(F),
          D && Do(D),
          z.stop(),
          $ && (($.flags |= 8), Ie(G, _, S, T)),
          q && vt(q, S),
          vt(() => {
            _.isUnmounted = !0;
          }, S));
      },
      H = (_, S, T, D = !1, z = !1, $ = 0) => {
        for (let G = $; G < _.length; G++) Ie(_[G], S, T, D, z);
      },
      O = (_) => {
        if (_.shapeFlag & 6) return O(_.component.subTree);
        if (_.shapeFlag & 128) return _.suspense.next();
        const S = d(_.anchor || _.el),
          T = S && S[vf];
        return T ? d(T) : S;
      };
    let Z = !1;
    const U = (_, S, T) => {
        (_ == null
          ? S._vnode && Ie(S._vnode, null, null, !0)
          : m(S._vnode || null, _, S, null, null, null, T),
          (S._vnode = _),
          Z || ((Z = !0), gl(), hf(), (Z = !1)));
      },
      ee = { p: m, um: Ie, m: we, r: Ye, mt: re, mc: P, pc: te, pbc: A, n: O, o: e };
    return { render: U, hydrate: void 0, createApp: mg(U) };
  }
  function ts({ type: e, props: t }, n) {
    return (n === 'svg' && e === 'foreignObject') ||
      (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
      ? void 0
      : n;
  }
  function Bn({ effect: e, job: t }, n) {
    n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
  }
  function Tg(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
  }
  function Oa(e, t, n = !1) {
    const r = e.children,
      o = t.children;
    if (ue(r) && ue(o))
      for (let i = 0; i < r.length; i++) {
        const s = r[i];
        let a = o[i];
        (a.shapeFlag & 1 &&
          !a.dynamicChildren &&
          ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = o[i] = Tn(o[i])), (a.el = s.el)),
          !n && a.patchFlag !== -2 && Oa(s, a)),
          a.type === Oi && a.patchFlag !== -1 && (a.el = s.el),
          a.type === nn && !a.el && (a.el = s.el));
      }
  }
  function Og(e) {
    const t = e.slice(),
      n = [0];
    let r, o, i, s, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
      const u = e[r];
      if (u !== 0) {
        if (((o = n[n.length - 1]), e[o] < u)) {
          ((t[r] = o), n.push(r));
          continue;
        }
        for (i = 0, s = n.length - 1; i < s; )
          ((a = (i + s) >> 1), e[n[a]] < u ? (i = a + 1) : (s = a));
        u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
      }
    }
    for (i = n.length, s = n[i - 1]; i-- > 0; ) ((n[i] = s), (s = t[s]));
    return n;
  }
  function Uf(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Uf(t);
  }
  function Cl(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  const Pg = Symbol.for('v-scx'),
    Ag = () => rt(Pg);
  function Rt(e, t) {
    return Ci(e, null, t);
  }
  function Ig(e, t) {
    return Ci(e, null, { flush: 'sync' });
  }
  function be(e, t, n) {
    return Ci(e, t, n);
  }
  function Ci(e, t, n = Ae) {
    const { immediate: r, deep: o, flush: i, once: s } = n,
      a = Je({}, n),
      l = (t && r) || (!t && i !== 'post');
    let u;
    if (ao) {
      if (i === 'sync') {
        const h = Ag();
        u = h.__watcherHandles || (h.__watcherHandles = []);
      } else if (!l) {
        const h = () => {};
        return ((h.stop = tn), (h.resume = tn), (h.pause = tn), h);
      }
    }
    const f = ht;
    a.call = (h, p, m) => Zt(h, f, p, m);
    let c = !1;
    (i === 'post'
      ? (a.scheduler = (h) => {
          vt(h, f && f.suspense);
        })
      : i !== 'sync' &&
        ((c = !0),
        (a.scheduler = (h, p) => {
          p ? h() : xa(h);
        })),
      (a.augmentJob = (h) => {
        (t && (h.flags |= 4), c && ((h.flags |= 2), f && ((h.id = f.uid), (h.i = f))));
      }));
    const d = Vp(e, t, a);
    return (ao && (u ? u.push(d) : l && d()), d);
  }
  function Mg(e, t, n) {
    const r = this.proxy,
      o = Fe(e) ? (e.includes('.') ? Hf(r, e) : () => r[e]) : e.bind(r, r);
    let i;
    ge(t) ? (i = t) : ((i = t.handler), (n = t));
    const s = yo(this),
      a = Ci(o, i.bind(r), n);
    return (s(), a);
  }
  function Hf(e, t) {
    const n = t.split('.');
    return () => {
      let r = e;
      for (let o = 0; o < n.length && r; o++) r = r[n[o]];
      return r;
    };
  }
  function Pa(e, t, n = Ae) {
    const r = Pi(),
      o = kt(t),
      i = $n(t),
      s = Vf(e, o),
      a = $p((l, u) => {
        let f,
          c = Ae,
          d;
        return (
          Ig(() => {
            const h = e[o];
            _t(f, h) && ((f = h), u());
          }),
          {
            get() {
              return (l(), n.get ? n.get(f) : f);
            },
            set(h) {
              const p = n.set ? n.set(h) : h;
              if (!_t(p, f) && !(c !== Ae && _t(h, c))) return;
              const m = r.vnode.props;
              ((m &&
                (t in m || o in m || i in m) &&
                (`onUpdate:${t}` in m || `onUpdate:${o}` in m || `onUpdate:${i}` in m)) ||
                ((f = h), u()),
                r.emit(`update:${t}`, p),
                _t(h, p) && _t(h, c) && !_t(p, d) && u(),
                (c = h),
                (d = p));
            },
          }
        );
      });
    return (
      (a[Symbol.iterator] = () => {
        let l = 0;
        return {
          next() {
            return l < 2 ? { value: l++ ? s || Ae : a, done: !1 } : { done: !0 };
          },
        };
      }),
      a
    );
  }
  const Vf = (e, t) =>
    t === 'modelValue' || t === 'model-value'
      ? e.modelModifiers
      : e[`${t}Modifiers`] || e[`${kt(t)}Modifiers`] || e[`${$n(t)}Modifiers`];
  function kg(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || Ae;
    let o = n;
    const i = t.startsWith('update:'),
      s = i && Vf(r, t.slice(7));
    s && (s.trim && (o = n.map((f) => (Fe(f) ? f.trim() : f))), s.number && (o = n.map(pa)));
    let a,
      l = r[(a = Lo(t))] || r[(a = Lo(kt(t)))];
    (!l && i && (l = r[(a = Lo($n(t)))]), l && Zt(l, e, 6, o));
    const u = r[a + 'Once'];
    if (u) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[a]) return;
      ((e.emitted[a] = !0), Zt(u, e, 6, o));
    }
  }
  const Rg = new WeakMap();
  function Zf(e, t, n = !1) {
    const r = n ? Rg : t.emitsCache,
      o = r.get(e);
    if (o !== void 0) return o;
    const i = e.emits;
    let s = {},
      a = !1;
    if (!ge(e)) {
      const l = (u) => {
        const f = Zf(u, t, !0);
        f && ((a = !0), Je(s, f));
      };
      (!n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l));
    }
    return !i && !a
      ? (Le(e) && r.set(e, null), null)
      : (ue(i) ? i.forEach((l) => (s[l] = null)) : Je(s, i), Le(e) && r.set(e, s), s);
  }
  function Ti(e, t) {
    return !e || !gi(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, '')),
        ke(e, t[0].toLowerCase() + t.slice(1)) || ke(e, $n(t)) || ke(e, t));
  }
  function Tl(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: o,
        propsOptions: [i],
        slots: s,
        attrs: a,
        emit: l,
        render: u,
        renderCache: f,
        props: c,
        data: d,
        setupState: h,
        ctx: p,
        inheritAttrs: m,
      } = e,
      g = Jo(e);
    let v, b;
    try {
      if (n.shapeFlag & 4) {
        const y = o || r,
          x = y;
        ((v = Yt(u.call(x, y, f, c, h, d, p))), (b = a));
      } else {
        const y = t;
        ((v = Yt(y.length > 1 ? y(c, { attrs: a, slots: s, emit: l }) : y(c, null))),
          (b = t.props ? a : Ng(a)));
      }
    } catch (y) {
      ((Jr.length = 0), Ei(y, e, 1), (v = Te(nn)));
    }
    let w = v;
    if (b && m !== !1) {
      const y = Object.keys(b),
        { shapeFlag: x } = w;
      y.length && x & 7 && (i && y.some(fa) && (b = Lg(b, i)), (w = Xn(w, b, !1, !0)));
    }
    return (
      n.dirs && ((w = Xn(w, null, !1, !0)), (w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs)),
      n.transition && oo(w, n.transition),
      (v = w),
      Jo(g),
      v
    );
  }
  const Ng = (e) => {
      let t;
      for (const n in e) (n === 'class' || n === 'style' || gi(n)) && ((t || (t = {}))[n] = e[n]);
      return t;
    },
    Lg = (e, t) => {
      const n = {};
      for (const r in e) (!fa(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
      return n;
    };
  function Dg(e, t, n) {
    const { props: r, children: o, component: i } = e,
      { props: s, children: a, patchFlag: l } = t,
      u = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
      if (l & 1024) return !0;
      if (l & 16) return r ? Ol(r, s, u) : !!s;
      if (l & 8) {
        const f = t.dynamicProps;
        for (let c = 0; c < f.length; c++) {
          const d = f[c];
          if (s[d] !== r[d] && !Ti(u, d)) return !0;
        }
      }
    } else
      return (o || a) && (!a || !a.$stable) ? !0 : r === s ? !1 : r ? (s ? Ol(r, s, u) : !0) : !!s;
    return !1;
  }
  function Ol(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      if (t[i] !== e[i] && !Ti(n, i)) return !0;
    }
    return !1;
  }
  function $g({ vnode: e, parent: t }, n) {
    for (; t; ) {
      const r = t.subTree;
      if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
        (((e = t.vnode).el = n), (t = t.parent));
      else break;
    }
  }
  const Wf = (e) => e.__isSuspense;
  function jg(e, t) {
    t && t.pendingBranch ? (ue(e) ? t.effects.push(...e) : t.effects.push(e)) : Kp(e);
  }
  const he = Symbol.for('v-fgt'),
    Oi = Symbol.for('v-txt'),
    nn = Symbol.for('v-cmt'),
    ns = Symbol.for('v-stc'),
    Jr = [];
  let At = null;
  function N(e = !1) {
    Jr.push((At = e ? null : []));
  }
  function zg() {
    (Jr.pop(), (At = Jr[Jr.length - 1] || null));
  }
  let io = 1;
  function ti(e, t = !1) {
    ((io += e), e < 0 && At && t && (At.hasOnce = !0));
  }
  function Kf(e) {
    return ((e.dynamicChildren = io > 0 ? At || gr : null), zg(), io > 0 && At && At.push(e), e);
  }
  function K(e, t, n, r, o, i) {
    return Kf(ie(e, t, n, r, o, i, !0));
  }
  function me(e, t, n, r, o) {
    return Kf(Te(e, t, n, r, o, !0));
  }
  function so(e) {
    return e ? e.__v_isVNode === !0 : !1;
  }
  function fr(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const qf = ({ key: e }) => e ?? null,
    jo = ({ ref: e, ref_key: t, ref_for: n }) => (
      typeof e == 'number' && (e = '' + e),
      e != null ? (Fe(e) || tt(e) || ge(e) ? { i: it, r: e, k: t, f: !!n } : e) : null
    );
  function ie(e, t = null, n = null, r = 0, o = null, i = e === he ? 0 : 1, s = !1, a = !1) {
    const l = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && qf(t),
      ref: t && jo(t),
      scopeId: gf,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: r,
      dynamicProps: o,
      dynamicChildren: null,
      appContext: null,
      ctx: it,
    };
    return (
      a ? (Aa(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= Fe(n) ? 8 : 16),
      io > 0 && !s && At && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && At.push(l),
      l
    );
  }
  const Te = Bg;
  function Bg(e, t = null, n = null, r = 0, o = null, i = !1) {
    if (((!e || e === Tf) && (e = nn), so(e))) {
      const a = Xn(e, t, !0);
      return (
        n && Aa(a, n),
        io > 0 && !i && At && (a.shapeFlag & 6 ? (At[At.indexOf(e)] = a) : At.push(a)),
        (a.patchFlag = -2),
        a
      );
    }
    if ((qg(e) && (e = e.__vccOpts), t)) {
      t = ni(t);
      let { class: a, style: l } = t;
      (a && !Fe(a) && (t.class = Be(a)),
        Le(l) && (wa(l) && !ue(l) && (l = Je({}, l)), (t.style = Ft(l))));
    }
    const s = Fe(e) ? 1 : Wf(e) ? 128 : qp(e) ? 64 : Le(e) ? 4 : ge(e) ? 2 : 0;
    return ie(e, t, n, r, o, s, i, !0);
  }
  function ni(e) {
    return e ? (wa(e) || Df(e) ? Je({}, e) : e) : null;
  }
  function Xn(e, t, n = !1, r = !1) {
    const { props: o, ref: i, patchFlag: s, children: a, transition: l } = e,
      u = t ? We(o || {}, t) : o,
      f = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: u,
        key: u && qf(u),
        ref: t && t.ref ? (n && i ? (ue(i) ? i.concat(jo(t)) : [i, jo(t)]) : jo(t)) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== he ? (s === -1 ? 16 : s | 16) : s,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: l,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Xn(e.ssContent),
        ssFallback: e.ssFallback && Xn(e.ssFallback),
        placeholder: e.placeholder,
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
      };
    return (l && r && oo(f, l.clone(f)), f);
  }
  function Gf(e = ' ', t = 0) {
    return Te(Oi, null, e, t);
  }
  function Xe(e = '', t = !1) {
    return t ? (N(), me(nn, null, e)) : Te(nn, null, e);
  }
  function Yt(e) {
    return e == null || typeof e == 'boolean'
      ? Te(nn)
      : ue(e)
        ? Te(he, null, e.slice())
        : so(e)
          ? Tn(e)
          : Te(Oi, null, String(e));
  }
  function Tn(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Xn(e);
  }
  function Aa(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (ue(t)) n = 16;
    else if (typeof t == 'object')
      if (r & 65) {
        const o = t.default;
        o && (o._c && (o._d = !1), Aa(e, o()), o._c && (o._d = !0));
        return;
      } else {
        n = 32;
        const o = t._;
        !o && !Df(t)
          ? (t._ctx = it)
          : o === 3 && it && (it.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
      }
    else
      ge(t)
        ? ((t = { default: t, _ctx: it }), (n = 32))
        : ((t = String(t)), r & 64 ? ((n = 16), (t = [Gf(t)])) : (n = 8));
    ((e.children = t), (e.shapeFlag |= n));
  }
  function We(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const o in r)
        if (o === 'class') t.class !== r.class && (t.class = Be([t.class, r.class]));
        else if (o === 'style') t.style = Ft([t.style, r.style]);
        else if (gi(o)) {
          const i = t[o],
            s = r[o];
          s && i !== s && !(ue(i) && i.includes(s)) && (t[o] = i ? [].concat(i, s) : s);
        } else o !== '' && (t[o] = r[o]);
    }
    return t;
  }
  function qt(e, t, n, r = null) {
    Zt(e, t, 7, [n, r]);
  }
  const Fg = Rf();
  let Ug = 0;
  function Hg(e, t, n) {
    const r = e.type,
      o = (t ? t.appContext : e.appContext) || Fg,
      i = {
        uid: Ug++,
        vnode: e,
        type: r,
        parent: t,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new fp(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(o.provides),
        ids: t ? t.ids : ['', 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: jf(r, o),
        emitsOptions: Zf(r, o),
        emit: null,
        emitted: null,
        propsDefaults: Ae,
        inheritAttrs: r.inheritAttrs,
        ctx: Ae,
        data: Ae,
        props: Ae,
        attrs: Ae,
        slots: Ae,
        refs: Ae,
        setupState: Ae,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null,
      };
    return (
      (i.ctx = { _: i }),
      (i.root = t ? t.root : i),
      (i.emit = kg.bind(null, i)),
      e.ce && e.ce(i),
      i
    );
  }
  let ht = null;
  const Pi = () => ht || it;
  let ri, zs;
  {
    const e = bi(),
      t = (n, r) => {
        let o;
        return (
          (o = e[n]) || (o = e[n] = []),
          o.push(r),
          (i) => {
            o.length > 1 ? o.forEach((s) => s(i)) : o[0](i);
          }
        );
      };
    ((ri = t('__VUE_INSTANCE_SETTERS__', (n) => (ht = n))),
      (zs = t('__VUE_SSR_SETTERS__', (n) => (ao = n))));
  }
  const yo = (e) => {
      const t = ht;
      return (
        ri(e),
        e.scope.on(),
        () => {
          (e.scope.off(), ri(t));
        }
      );
    },
    Pl = () => {
      (ht && ht.scope.off(), ri(null));
    };
  function Xf(e) {
    return e.vnode.shapeFlag & 4;
  }
  let ao = !1;
  function Vg(e, t = !1, n = !1) {
    t && zs(t);
    const { props: r, children: o } = e.vnode,
      i = Xf(e);
    (yg(e, r, i, t), Eg(e, o, n || t));
    const s = i ? Zg(e, t) : void 0;
    return (t && zs(!1), s);
  }
  function Zg(e, t) {
    const n = e.type;
    ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, cg)));
    const { setup: r } = n;
    if (r) {
      hn();
      const o = (e.setupContext = r.length > 1 ? Yf(e) : null),
        i = yo(e),
        s = vo(r, e, 0, [e.props, o]),
        a = Bu(s);
      if ((pn(), i(), (a || e.sp) && !yr(e) && wf(e), a)) {
        if ((s.then(Pl, Pl), t))
          return s
            .then((l) => {
              Al(e, l);
            })
            .catch((l) => {
              Ei(l, e, 0);
            });
        e.asyncDep = s;
      } else Al(e, s);
    } else Jf(e);
  }
  function Al(e, t, n) {
    (ge(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : Le(t) && (e.setupState = uf(t)),
      Jf(e));
  }
  function Jf(e, t, n) {
    const r = e.type;
    e.render || (e.render = r.render || tn);
    {
      const o = yo(e);
      hn();
      try {
        fg(e);
      } finally {
        (pn(), o());
      }
    }
  }
  const Wg = {
    get(e, t) {
      return (dt(e, 'get', ''), e[t]);
    },
  };
  function Yf(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, Wg), slots: e.slots, emit: e.emit, expose: t };
  }
  function Ai(e) {
    return e.exposed
      ? e.exposeProxy ||
          (e.exposeProxy = new Proxy(uf(kp(e.exposed)), {
            get(t, n) {
              if (n in t) return t[n];
              if (n in Xr) return Xr[n](e);
            },
            has(t, n) {
              return n in t || n in Xr;
            },
          }))
      : e.proxy;
  }
  function Kg(e, t = !0) {
    return ge(e) ? e.displayName || e.name : e.name || (t && e.__name);
  }
  function qg(e) {
    return ge(e) && '__vccOpts' in e;
  }
  const B = (e, t) => Up(e, t, ao);
  function Qf(e, t, n) {
    try {
      ti(-1);
      const r = arguments.length;
      return r === 2
        ? Le(t) && !ue(t)
          ? so(t)
            ? Te(e, null, [t])
            : Te(e, t)
          : Te(e, null, t)
        : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && so(n) && (n = [n]),
          Te(e, t, n));
    } finally {
      ti(1);
    }
  }
  const Gg = '3.5.24';
  let Bs;
  const Il = typeof window < 'u' && window.trustedTypes;
  if (Il)
    try {
      Bs = Il.createPolicy('vue', { createHTML: (e) => e });
    } catch {}
  const ed = Bs ? (e) => Bs.createHTML(e) : (e) => e,
    Xg = 'http://www.w3.org/2000/svg',
    Jg = 'http://www.w3.org/1998/Math/MathML',
    cn = typeof document < 'u' ? document : null,
    Ml = cn && cn.createElement('template'),
    Yg = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: (e) => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, r) => {
        const o =
          t === 'svg'
            ? cn.createElementNS(Xg, e)
            : t === 'mathml'
              ? cn.createElementNS(Jg, e)
              : n
                ? cn.createElement(e, { is: n })
                : cn.createElement(e);
        return (
          e === 'select' && r && r.multiple != null && o.setAttribute('multiple', r.multiple),
          o
        );
      },
      createText: (e) => cn.createTextNode(e),
      createComment: (e) => cn.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => cn.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, '');
      },
      insertStaticContent(e, t, n, r, o, i) {
        const s = n ? n.previousSibling : t.lastChild;
        if (o && (o === i || o.nextSibling))
          for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); );
        else {
          Ml.innerHTML = ed(
            r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e,
          );
          const a = Ml.content;
          if (r === 'svg' || r === 'mathml') {
            const l = a.firstChild;
            for (; l.firstChild; ) a.appendChild(l.firstChild);
            a.removeChild(l);
          }
          t.insertBefore(a, n);
        }
        return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
      },
    },
    wn = 'transition',
    Nr = 'animation',
    Sr = Symbol('_vtc'),
    td = {
      name: String,
      type: String,
      css: { type: Boolean, default: !0 },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String,
    },
    Qg = Je({}, Jp, td),
    Fn = (e, t = []) => {
      ue(e) ? e.forEach((n) => n(...t)) : e && e(...t);
    },
    kl = (e) => (e ? (ue(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
  function ev(e) {
    const t = {};
    for (const R in e) R in td || (t[R] = e[R]);
    if (e.css === !1) return t;
    const {
        name: n = 'v',
        type: r,
        duration: o,
        enterFromClass: i = `${n}-enter-from`,
        enterActiveClass: s = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: l = i,
        appearActiveClass: u = s,
        appearToClass: f = a,
        leaveFromClass: c = `${n}-leave-from`,
        leaveActiveClass: d = `${n}-leave-active`,
        leaveToClass: h = `${n}-leave-to`,
      } = e,
      p = tv(o),
      m = p && p[0],
      g = p && p[1],
      {
        onBeforeEnter: v,
        onEnter: b,
        onEnterCancelled: w,
        onLeave: y,
        onLeaveCancelled: x,
        onBeforeAppear: E = v,
        onAppear: C = b,
        onAppearCancelled: P = w,
      } = t,
      M = (R, V, re, ne) => {
        ((R._enterCancelled = ne), Sn(R, V ? f : a), Sn(R, V ? u : s), re && re());
      },
      A = (R, V) => {
        ((R._isLeaving = !1), Sn(R, c), Sn(R, h), Sn(R, d), V && V());
      },
      j = (R) => (V, re) => {
        const ne = R ? C : b,
          X = () => M(V, R, re);
        (Fn(ne, [V, X]),
          Rl(() => {
            (Sn(V, R ? l : i), Xt(V, R ? f : a), kl(ne) || Nl(V, r, m, X));
          }));
      };
    return Je(t, {
      onBeforeEnter(R) {
        (Fn(v, [R]), Xt(R, i), Xt(R, s));
      },
      onBeforeAppear(R) {
        (Fn(E, [R]), Xt(R, l), Xt(R, u));
      },
      onEnter: j(!1),
      onAppear: j(!0),
      onLeave(R, V) {
        R._isLeaving = !0;
        const re = () => A(R, V);
        (Xt(R, c),
          R._enterCancelled ? (Xt(R, d), Fs(R)) : (Fs(R), Xt(R, d)),
          Rl(() => {
            R._isLeaving && (Sn(R, c), Xt(R, h), kl(y) || Nl(R, r, g, re));
          }),
          Fn(y, [R, re]));
      },
      onEnterCancelled(R) {
        (M(R, !1, void 0, !0), Fn(w, [R]));
      },
      onAppearCancelled(R) {
        (M(R, !0, void 0, !0), Fn(P, [R]));
      },
      onLeaveCancelled(R) {
        (A(R), Fn(x, [R]));
      },
    });
  }
  function tv(e) {
    if (e == null) return null;
    if (Le(e)) return [rs(e.enter), rs(e.leave)];
    {
      const t = rs(e);
      return [t, t];
    }
  }
  function rs(e) {
    return op(e);
  }
  function Xt(e, t) {
    (t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Sr] || (e[Sr] = new Set())).add(t));
  }
  function Sn(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const n = e[Sr];
    n && (n.delete(t), n.size || (e[Sr] = void 0));
  }
  function Rl(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let nv = 0;
  function Nl(e, t, n, r) {
    const o = (e._endId = ++nv),
      i = () => {
        o === e._endId && r();
      };
    if (n != null) return setTimeout(i, n);
    const { type: s, timeout: a, propCount: l } = nd(e, t);
    if (!s) return r();
    const u = s + 'end';
    let f = 0;
    const c = () => {
        (e.removeEventListener(u, d), i());
      },
      d = (h) => {
        h.target === e && ++f >= l && c();
      };
    (setTimeout(() => {
      f < l && c();
    }, a + 1),
      e.addEventListener(u, d));
  }
  function nd(e, t) {
    const n = window.getComputedStyle(e),
      r = (p) => (n[p] || '').split(', '),
      o = r(`${wn}Delay`),
      i = r(`${wn}Duration`),
      s = Ll(o, i),
      a = r(`${Nr}Delay`),
      l = r(`${Nr}Duration`),
      u = Ll(a, l);
    let f = null,
      c = 0,
      d = 0;
    t === wn
      ? s > 0 && ((f = wn), (c = s), (d = i.length))
      : t === Nr
        ? u > 0 && ((f = Nr), (c = u), (d = l.length))
        : ((c = Math.max(s, u)),
          (f = c > 0 ? (s > u ? wn : Nr) : null),
          (d = f ? (f === wn ? i.length : l.length) : 0));
    const h = f === wn && /\b(?:transform|all)(?:,|$)/.test(r(`${wn}Property`).toString());
    return { type: f, timeout: c, propCount: d, hasTransform: h };
  }
  function Ll(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, r) => Dl(n) + Dl(e[r])));
  }
  function Dl(e) {
    return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
  }
  function Fs(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight;
  }
  function rv(e, t, n) {
    const r = e[Sr];
    (r && (t = (t ? [t, ...r] : [...r]).join(' ')),
      t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t));
  }
  const $l = Symbol('_vod'),
    ov = Symbol('_vsh'),
    iv = Symbol(''),
    sv = /(?:^|;)\s*display\s*:/;
  function av(e, t, n) {
    const r = e.style,
      o = Fe(n);
    let i = !1;
    if (n && !o) {
      if (t)
        if (Fe(t))
          for (const s of t.split(';')) {
            const a = s.slice(0, s.indexOf(':')).trim();
            n[a] == null && zo(r, a, '');
          }
        else for (const s in t) n[s] == null && zo(r, s, '');
      for (const s in n) (s === 'display' && (i = !0), zo(r, s, n[s]));
    } else if (o) {
      if (t !== n) {
        const s = r[iv];
        (s && (n += ';' + s), (r.cssText = n), (i = sv.test(n)));
      }
    } else t && e.removeAttribute('style');
    $l in e && ((e[$l] = i ? r.display : ''), e[ov] && (r.display = 'none'));
  }
  const jl = /\s*!important$/;
  function zo(e, t, n) {
    if (ue(n)) n.forEach((r) => zo(e, t, r));
    else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
    else {
      const r = lv(e, t);
      jl.test(n) ? e.setProperty($n(r), n.replace(jl, ''), 'important') : (e[r] = n);
    }
  }
  const zl = ['Webkit', 'Moz', 'ms'],
    os = {};
  function lv(e, t) {
    const n = os[t];
    if (n) return n;
    let r = kt(t);
    if (r !== 'filter' && r in e) return (os[t] = r);
    r = yi(r);
    for (let o = 0; o < zl.length; o++) {
      const i = zl[o] + r;
      if (i in e) return (os[t] = i);
    }
    return t;
  }
  const Bl = 'http://www.w3.org/1999/xlink';
  function Fl(e, t, n, r, o, i = up(t)) {
    r && t.startsWith('xlink:')
      ? n == null
        ? e.removeAttributeNS(Bl, t.slice(6, t.length))
        : e.setAttributeNS(Bl, t, n)
      : n == null || (i && !Vu(n))
        ? e.removeAttribute(t)
        : e.setAttribute(t, i ? '' : gn(n) ? String(n) : n);
  }
  function Ul(e, t, n, r, o) {
    if (t === 'innerHTML' || t === 'textContent') {
      n != null && (e[t] = t === 'innerHTML' ? ed(n) : n);
      return;
    }
    const i = e.tagName;
    if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
      const a = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
        l = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
      ((a !== l || !('_value' in e)) && (e.value = l),
        n == null && e.removeAttribute(t),
        (e._value = n));
      return;
    }
    let s = !1;
    if (n === '' || n == null) {
      const a = typeof e[t];
      a === 'boolean'
        ? (n = Vu(n))
        : n == null && a === 'string'
          ? ((n = ''), (s = !0))
          : a === 'number' && ((n = 0), (s = !0));
    }
    try {
      e[t] = n;
    } catch {}
    s && e.removeAttribute(o || t);
  }
  function dr(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function cv(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  const Hl = Symbol('_vei');
  function uv(e, t, n, r, o = null) {
    const i = e[Hl] || (e[Hl] = {}),
      s = i[t];
    if (r && s) s.value = r;
    else {
      const [a, l] = fv(t);
      if (r) {
        const u = (i[t] = pv(r, o));
        dr(e, a, u, l);
      } else s && (cv(e, a, s, l), (i[t] = void 0));
    }
  }
  const Vl = /(?:Once|Passive|Capture)$/;
  function fv(e) {
    let t;
    if (Vl.test(e)) {
      t = {};
      let r;
      for (; (r = e.match(Vl)); )
        ((e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0));
    }
    return [e[2] === ':' ? e.slice(3) : $n(e.slice(2)), t];
  }
  let is = 0;
  const dv = Promise.resolve(),
    hv = () => is || (dv.then(() => (is = 0)), (is = Date.now()));
  function pv(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      Zt(gv(r, n.value), t, 5, [r]);
    };
    return ((n.value = e), (n.attached = hv()), n);
  }
  function gv(e, t) {
    if (ue(t)) {
      const n = e.stopImmediatePropagation;
      return (
        (e.stopImmediatePropagation = () => {
          (n.call(e), (e._stopped = !0));
        }),
        t.map((r) => (o) => !o._stopped && r && r(o))
      );
    } else return t;
  }
  const Zl = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      e.charCodeAt(2) > 96 &&
      e.charCodeAt(2) < 123,
    vv = (e, t, n, r, o, i) => {
      const s = o === 'svg';
      t === 'class'
        ? rv(e, r, s)
        : t === 'style'
          ? av(e, n, r)
          : gi(t)
            ? fa(t) || uv(e, t, n, r, i)
            : (
                  t[0] === '.'
                    ? ((t = t.slice(1)), !0)
                    : t[0] === '^'
                      ? ((t = t.slice(1)), !1)
                      : mv(e, t, r, s)
                )
              ? (Ul(e, t, r),
                !e.tagName.includes('-') &&
                  (t === 'value' || t === 'checked' || t === 'selected') &&
                  Fl(e, t, r, s, i, t !== 'value'))
              : e._isVueCE && (/[A-Z]/.test(t) || !Fe(r))
                ? Ul(e, kt(t), r, i, t)
                : (t === 'true-value'
                    ? (e._trueValue = r)
                    : t === 'false-value' && (e._falseValue = r),
                  Fl(e, t, r, s));
    };
  function mv(e, t, n, r) {
    if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Zl(t) && ge(n)));
    if (
      t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'autocorrect' ||
      (t === 'sandbox' && e.tagName === 'IFRAME') ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA')
    )
      return !1;
    if (t === 'width' || t === 'height') {
      const o = e.tagName;
      if (o === 'IMG' || o === 'VIDEO' || o === 'CANVAS' || o === 'SOURCE') return !1;
    }
    return Zl(t) && Fe(n) ? !1 : t in e;
  }
  const rd = new WeakMap(),
    od = new WeakMap(),
    oi = Symbol('_moveCb'),
    Wl = Symbol('_enterCb'),
    yv = (e) => (delete e.props.mode, e),
    bv = yv({
      name: 'TransitionGroup',
      props: Je({}, Qg, { tag: String, moveClass: String }),
      setup(e, { slots: t }) {
        const n = Pi(),
          r = Xp();
        let o, i;
        return (
          Sf(() => {
            if (!o.length) return;
            const s = e.moveClass || `${e.name || 'v'}-move`;
            if (!_v(o[0].el, n.vnode.el, s)) {
              o = [];
              return;
            }
            (o.forEach(wv), o.forEach(xv));
            const a = o.filter(Ev);
            (Fs(n.vnode.el),
              a.forEach((l) => {
                const u = l.el,
                  f = u.style;
                (Xt(u, s), (f.transform = f.webkitTransform = f.transitionDuration = ''));
                const c = (u[oi] = (d) => {
                  (d && d.target !== u) ||
                    ((!d || d.propertyName.endsWith('transform')) &&
                      (u.removeEventListener('transitionend', c), (u[oi] = null), Sn(u, s)));
                });
                u.addEventListener('transitionend', c);
              }),
              (o = []));
          }),
          () => {
            const s = Ce(e),
              a = ev(s);
            let l = s.tag || he;
            if (((o = []), i))
              for (let u = 0; u < i.length; u++) {
                const f = i[u];
                f.el &&
                  f.el instanceof Element &&
                  (o.push(f),
                  oo(f, Ns(f, a, r, n)),
                  rd.set(f, { left: f.el.offsetLeft, top: f.el.offsetTop }));
              }
            i = t.default ? bf(t.default()) : [];
            for (let u = 0; u < i.length; u++) {
              const f = i[u];
              f.key != null && oo(f, Ns(f, a, r, n));
            }
            return Te(l, null, i);
          }
        );
      },
    }),
    lo = bv;
  function wv(e) {
    const t = e.el;
    (t[oi] && t[oi](), t[Wl] && t[Wl]());
  }
  function xv(e) {
    od.set(e, { left: e.el.offsetLeft, top: e.el.offsetTop });
  }
  function Ev(e) {
    const t = rd.get(e),
      n = od.get(e),
      r = t.left - n.left,
      o = t.top - n.top;
    if (r || o) {
      const i = e.el.style;
      return (
        (i.transform = i.webkitTransform = `translate(${r}px,${o}px)`),
        (i.transitionDuration = '0s'),
        e
      );
    }
  }
  function _v(e, t, n) {
    const r = e.cloneNode(),
      o = e[Sr];
    (o &&
      o.forEach((a) => {
        a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
      }),
      n.split(/\s+/).forEach((a) => a && r.classList.add(a)),
      (r.style.display = 'none'));
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(r);
    const { hasTransform: s } = nd(r);
    return (i.removeChild(r), s);
  }
  const Kl = (e) => {
    const t = e.props['onUpdate:modelValue'] || !1;
    return ue(t) ? (n) => Do(t, n) : t;
  };
  function Sv(e) {
    e.target.composing = !0;
  }
  function ql(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
  }
  const ss = Symbol('_assign');
  function Gl(e, t, n) {
    return (t && (e = e.trim()), n && (e = pa(e)), e);
  }
  const Ia = {
      created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
        e[ss] = Kl(o);
        const i = r || (o.props && o.props.type === 'number');
        (dr(e, t ? 'change' : 'input', (s) => {
          s.target.composing || e[ss](Gl(e.value, n, i));
        }),
          (n || i) &&
            dr(e, 'change', () => {
              e.value = Gl(e.value, n, i);
            }),
          t || (dr(e, 'compositionstart', Sv), dr(e, 'compositionend', ql), dr(e, 'change', ql)));
      },
      mounted(e, { value: t }) {
        e.value = t ?? '';
      },
      beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: o, number: i } }, s) {
        if (((e[ss] = Kl(s)), e.composing)) return;
        const a = (i || e.type === 'number') && !/^0\d/.test(e.value) ? pa(e.value) : e.value,
          l = t ?? '';
        a !== l &&
          ((document.activeElement === e &&
            e.type !== 'range' &&
            ((r && t === n) || (o && e.value.trim() === l))) ||
            (e.value = l));
      },
    },
    Cv = ['ctrl', 'shift', 'alt', 'meta'],
    Tv = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => 'button' in e && e.button !== 0,
      middle: (e) => 'button' in e && e.button !== 1,
      right: (e) => 'button' in e && e.button !== 2,
      exact: (e, t) => Cv.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    Vt = (e, t) => {
      const n = e._withMods || (e._withMods = {}),
        r = t.join('.');
      return (
        n[r] ||
        (n[r] = (o, ...i) => {
          for (let s = 0; s < t.length; s++) {
            const a = Tv[t[s]];
            if (a && a(o, t)) return;
          }
          return e(o, ...i);
        })
      );
    },
    Ov = Je({ patchProp: vv }, Yg);
  let Xl;
  function Pv() {
    return Xl || (Xl = Sg(Ov));
  }
  const Av = (...e) => {
    const t = Pv().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const o = Mv(r);
        if (!o) return;
        const i = t._component;
        (!ge(i) && !i.render && !i.template && (i.template = o.innerHTML),
          o.nodeType === 1 && (o.textContent = ''));
        const s = n(o, !1, Iv(o));
        return (
          o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')),
          s
        );
      }),
      t
    );
  };
  function Iv(e) {
    if (e instanceof SVGElement) return 'svg';
    if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
  }
  function Mv(e) {
    return Fe(e) ? document.querySelector(e) : e;
  }
  const id = Symbol('rpgAssistantApiBaseUrl');
  class sd {
    characterData;
    id;
    name;
    constructor(t) {
      ((this.characterData = t), (this.id = t.id), (this.name = t.name));
    }
    updateName(t) {
      ((this.characterData.name = t), (this.name = t));
    }
  }
  class Jl {
    source;
    target;
    constructor(t, n) {
      ((this.source = t), (this.target = n));
    }
  }
  var ad = typeof global == 'object' && global && global.Object === Object && global,
    kv = typeof self == 'object' && self && self.Object === Object && self,
    Ut = ad || kv || Function('return this')(),
    Ln = Ut.Symbol,
    ld = Object.prototype,
    Rv = ld.hasOwnProperty,
    Nv = ld.toString,
    Lr = Ln ? Ln.toStringTag : void 0;
  function Lv(e) {
    var t = Rv.call(e, Lr),
      n = e[Lr];
    try {
      e[Lr] = void 0;
      var r = !0;
    } catch {}
    var o = Nv.call(e);
    return (r && (t ? (e[Lr] = n) : delete e[Lr]), o);
  }
  var Dv = Object.prototype,
    $v = Dv.toString;
  function jv(e) {
    return $v.call(e);
  }
  var zv = '[object Null]',
    Bv = '[object Undefined]',
    Yl = Ln ? Ln.toStringTag : void 0;
  function nr(e) {
    return e == null ? (e === void 0 ? Bv : zv) : Yl && Yl in Object(e) ? Lv(e) : jv(e);
  }
  function Dn(e) {
    return e != null && typeof e == 'object';
  }
  var Fv = '[object Symbol]';
  function cd(e) {
    return typeof e == 'symbol' || (Dn(e) && nr(e) == Fv);
  }
  function Uv(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; ) o[n] = t(e[n], n, e);
    return o;
  }
  var Jn = Array.isArray,
    Ql = Ln ? Ln.prototype : void 0,
    ec = Ql ? Ql.toString : void 0;
  function ud(e) {
    if (typeof e == 'string') return e;
    if (Jn(e)) return Uv(e, ud) + '';
    if (cd(e)) return ec ? ec.call(e) : '';
    var t = e + '';
    return t == '0' && 1 / e == -1 / 0 ? '-0' : t;
  }
  var Hv = /\s/;
  function Vv(e) {
    for (var t = e.length; t-- && Hv.test(e.charAt(t)); );
    return t;
  }
  var Zv = /^\s+/;
  function Wv(e) {
    return e && e.slice(0, Vv(e) + 1).replace(Zv, '');
  }
  function rn(e) {
    var t = typeof e;
    return e != null && (t == 'object' || t == 'function');
  }
  var tc = NaN,
    Kv = /^[-+]0x[0-9a-f]+$/i,
    qv = /^0b[01]+$/i,
    Gv = /^0o[0-7]+$/i,
    Xv = parseInt;
  function ii(e) {
    if (typeof e == 'number') return e;
    if (cd(e)) return tc;
    if (rn(e)) {
      var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
      e = rn(t) ? t + '' : t;
    }
    if (typeof e != 'string') return e === 0 ? e : +e;
    e = Wv(e);
    var n = qv.test(e);
    return n || Gv.test(e) ? Xv(e.slice(2), n ? 2 : 8) : Kv.test(e) ? tc : +e;
  }
  var nc = 1 / 0,
    Jv = 17976931348623157e292;
  function Yv(e) {
    if (!e) return e === 0 ? e : 0;
    if (((e = ii(e)), e === nc || e === -nc)) {
      var t = e < 0 ? -1 : 1;
      return t * Jv;
    }
    return e === e ? e : 0;
  }
  function fd(e) {
    var t = Yv(e),
      n = t % 1;
    return t === t ? (n ? t - n : t) : 0;
  }
  function dd(e) {
    return e;
  }
  var Qv = '[object AsyncFunction]',
    em = '[object Function]',
    tm = '[object GeneratorFunction]',
    nm = '[object Proxy]';
  function Ma(e) {
    if (!rn(e)) return !1;
    var t = nr(e);
    return t == em || t == tm || t == Qv || t == nm;
  }
  var as = Ut['__core-js_shared__'],
    rc = (function () {
      var e = /[^.]+$/.exec((as && as.keys && as.keys.IE_PROTO) || '');
      return e ? 'Symbol(src)_1.' + e : '';
    })();
  function rm(e) {
    return !!rc && rc in e;
  }
  var om = Function.prototype,
    im = om.toString;
  function rr(e) {
    if (e != null) {
      try {
        return im.call(e);
      } catch {}
      try {
        return e + '';
      } catch {}
    }
    return '';
  }
  var sm = /[\\^$.*+?()[\]{}|]/g,
    am = /^\[object .+?Constructor\]$/,
    lm = Function.prototype,
    cm = Object.prototype,
    um = lm.toString,
    fm = cm.hasOwnProperty,
    dm = RegExp(
      '^' +
        um
          .call(fm)
          .replace(sm, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
        '$',
    );
  function hm(e) {
    if (!rn(e) || rm(e)) return !1;
    var t = Ma(e) ? dm : am;
    return t.test(rr(e));
  }
  function pm(e, t) {
    return e?.[t];
  }
  function or(e, t) {
    var n = pm(e, t);
    return hm(n) ? n : void 0;
  }
  var Us = or(Ut, 'WeakMap'),
    oc = Object.create,
    gm = (function () {
      function e() {}
      return function (t) {
        if (!rn(t)) return {};
        if (oc) return oc(t);
        e.prototype = t;
        var n = new e();
        return ((e.prototype = void 0), n);
      };
    })();
  function vm(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  function mm() {}
  function ym(e, t) {
    var n = -1,
      r = e.length;
    for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
    return t;
  }
  var bm = 800,
    wm = 16,
    xm = Date.now;
  function Em(e) {
    var t = 0,
      n = 0;
    return function () {
      var r = xm(),
        o = wm - (r - n);
      if (((n = r), o > 0)) {
        if (++t >= bm) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function _m(e) {
    return function () {
      return e;
    };
  }
  var si = (function () {
      try {
        var e = or(Object, 'defineProperty');
        return (e({}, '', {}), e);
      } catch {}
    })(),
    Sm = si
      ? function (e, t) {
          return si(e, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: _m(t),
            writable: !0,
          });
        }
      : dd,
    Cm = Em(Sm);
  function Tm(e, t, n, r) {
    for (var o = e.length, i = n + -1; ++i < o; ) if (t(e[i], i, e)) return i;
    return -1;
  }
  function Om(e) {
    return e !== e;
  }
  function Pm(e, t, n) {
    for (var r = n - 1, o = e.length; ++r < o; ) if (e[r] === t) return r;
    return -1;
  }
  function Am(e, t, n) {
    return t === t ? Pm(e, t, n) : Tm(e, Om, n);
  }
  function Im(e, t) {
    var n = e == null ? 0 : e.length;
    return !!n && Am(e, t, 0) > -1;
  }
  var Mm = 9007199254740991,
    km = /^(?:0|[1-9]\d*)$/;
  function hd(e, t) {
    var n = typeof e;
    return (
      (t = t ?? Mm),
      !!t && (n == 'number' || (n != 'symbol' && km.test(e))) && e > -1 && e % 1 == 0 && e < t
    );
  }
  function ka(e, t, n) {
    t == '__proto__' && si
      ? si(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (e[t] = n);
  }
  function bo(e, t) {
    return e === t || (e !== e && t !== t);
  }
  var Rm = Object.prototype,
    Nm = Rm.hasOwnProperty;
  function Lm(e, t, n) {
    var r = e[t];
    (!(Nm.call(e, t) && bo(r, n)) || (n === void 0 && !(t in e))) && ka(e, t, n);
  }
  function Dm(e, t, n, r) {
    var o = !n;
    n || (n = {});
    for (var i = -1, s = t.length; ++i < s; ) {
      var a = t[i],
        l = void 0;
      (l === void 0 && (l = e[a]), o ? ka(n, a, l) : Lm(n, a, l));
    }
    return n;
  }
  var ic = Math.max;
  function $m(e, t, n) {
    return (
      (t = ic(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (var r = arguments, o = -1, i = ic(r.length - t, 0), s = Array(i); ++o < i; )
          s[o] = r[t + o];
        o = -1;
        for (var a = Array(t + 1); ++o < t; ) a[o] = r[o];
        return ((a[t] = n(s)), vm(e, this, a));
      }
    );
  }
  function jm(e, t) {
    return Cm($m(e, t, dd), e + '');
  }
  var zm = 9007199254740991;
  function pd(e) {
    return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= zm;
  }
  function Ii(e) {
    return e != null && pd(e.length) && !Ma(e);
  }
  function Bm(e, t, n) {
    if (!rn(n)) return !1;
    var r = typeof t;
    return (r == 'number' ? Ii(n) && hd(t, n.length) : r == 'string' && t in n) ? bo(n[t], e) : !1;
  }
  function gd(e) {
    return jm(function (t, n) {
      var r = -1,
        o = n.length,
        i = o > 1 ? n[o - 1] : void 0,
        s = o > 2 ? n[2] : void 0;
      for (
        i = e.length > 3 && typeof i == 'function' ? (o--, i) : void 0,
          s && Bm(n[0], n[1], s) && ((i = o < 3 ? void 0 : i), (o = 1)),
          t = Object(t);
        ++r < o;
      ) {
        var a = n[r];
        a && e(t, a, r, i);
      }
      return t;
    });
  }
  var Fm = Object.prototype;
  function Ra(e) {
    var t = e && e.constructor,
      n = (typeof t == 'function' && t.prototype) || Fm;
    return e === n;
  }
  function Um(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  }
  var Hm = '[object Arguments]';
  function sc(e) {
    return Dn(e) && nr(e) == Hm;
  }
  var vd = Object.prototype,
    Vm = vd.hasOwnProperty,
    Zm = vd.propertyIsEnumerable,
    Hs = sc(
      (function () {
        return arguments;
      })(),
    )
      ? sc
      : function (e) {
          return Dn(e) && Vm.call(e, 'callee') && !Zm.call(e, 'callee');
        };
  function Wm() {
    return !1;
  }
  var md = typeof It == 'object' && It && !It.nodeType && It,
    ac = md && typeof Mt == 'object' && Mt && !Mt.nodeType && Mt,
    Km = ac && ac.exports === md,
    lc = Km ? Ut.Buffer : void 0,
    qm = lc ? lc.isBuffer : void 0,
    ai = qm || Wm,
    Gm = '[object Arguments]',
    Xm = '[object Array]',
    Jm = '[object Boolean]',
    Ym = '[object Date]',
    Qm = '[object Error]',
    ey = '[object Function]',
    ty = '[object Map]',
    ny = '[object Number]',
    ry = '[object Object]',
    oy = '[object RegExp]',
    iy = '[object Set]',
    sy = '[object String]',
    ay = '[object WeakMap]',
    ly = '[object ArrayBuffer]',
    cy = '[object DataView]',
    uy = '[object Float32Array]',
    fy = '[object Float64Array]',
    dy = '[object Int8Array]',
    hy = '[object Int16Array]',
    py = '[object Int32Array]',
    gy = '[object Uint8Array]',
    vy = '[object Uint8ClampedArray]',
    my = '[object Uint16Array]',
    yy = '[object Uint32Array]',
    $e = {};
  $e[uy] = $e[fy] = $e[dy] = $e[hy] = $e[py] = $e[gy] = $e[vy] = $e[my] = $e[yy] = !0;
  $e[Gm] =
    $e[Xm] =
    $e[ly] =
    $e[Jm] =
    $e[cy] =
    $e[Ym] =
    $e[Qm] =
    $e[ey] =
    $e[ty] =
    $e[ny] =
    $e[ry] =
    $e[oy] =
    $e[iy] =
    $e[sy] =
    $e[ay] =
      !1;
  function by(e) {
    return Dn(e) && pd(e.length) && !!$e[nr(e)];
  }
  function wy(e) {
    return function (t) {
      return e(t);
    };
  }
  var yd = typeof It == 'object' && It && !It.nodeType && It,
    Yr = yd && typeof Mt == 'object' && Mt && !Mt.nodeType && Mt,
    xy = Yr && Yr.exports === yd,
    ls = xy && ad.process,
    cc = (function () {
      try {
        var e = Yr && Yr.require && Yr.require('util').types;
        return e || (ls && ls.binding && ls.binding('util'));
      } catch {}
    })(),
    uc = cc && cc.isTypedArray,
    Na = uc ? wy(uc) : by,
    Ey = Object.prototype,
    _y = Ey.hasOwnProperty;
  function bd(e, t) {
    var n = Jn(e),
      r = !n && Hs(e),
      o = !n && !r && ai(e),
      i = !n && !r && !o && Na(e),
      s = n || r || o || i,
      a = s ? Um(e.length, String) : [],
      l = a.length;
    for (var u in e)
      (t || _y.call(e, u)) &&
        !(
          s &&
          (u == 'length' ||
            (o && (u == 'offset' || u == 'parent')) ||
            (i && (u == 'buffer' || u == 'byteLength' || u == 'byteOffset')) ||
            hd(u, l))
        ) &&
        a.push(u);
    return a;
  }
  function wd(e, t) {
    return function (n) {
      return e(t(n));
    };
  }
  var Sy = wd(Object.keys, Object),
    Cy = Object.prototype,
    Ty = Cy.hasOwnProperty;
  function Oy(e) {
    if (!Ra(e)) return Sy(e);
    var t = [];
    for (var n in Object(e)) Ty.call(e, n) && n != 'constructor' && t.push(n);
    return t;
  }
  function Py(e) {
    return Ii(e) ? bd(e) : Oy(e);
  }
  function Ay(e) {
    var t = [];
    if (e != null) for (var n in Object(e)) t.push(n);
    return t;
  }
  var Iy = Object.prototype,
    My = Iy.hasOwnProperty;
  function ky(e) {
    if (!rn(e)) return Ay(e);
    var t = Ra(e),
      n = [];
    for (var r in e) (r == 'constructor' && (t || !My.call(e, r))) || n.push(r);
    return n;
  }
  function xd(e) {
    return Ii(e) ? bd(e, !0) : ky(e);
  }
  var co = or(Object, 'create');
  function Ry() {
    ((this.__data__ = co ? co(null) : {}), (this.size = 0));
  }
  function Ny(e) {
    var t = this.has(e) && delete this.__data__[e];
    return ((this.size -= t ? 1 : 0), t);
  }
  var Ly = '__lodash_hash_undefined__',
    Dy = Object.prototype,
    $y = Dy.hasOwnProperty;
  function jy(e) {
    var t = this.__data__;
    if (co) {
      var n = t[e];
      return n === Ly ? void 0 : n;
    }
    return $y.call(t, e) ? t[e] : void 0;
  }
  var zy = Object.prototype,
    By = zy.hasOwnProperty;
  function Fy(e) {
    var t = this.__data__;
    return co ? t[e] !== void 0 : By.call(t, e);
  }
  var Uy = '__lodash_hash_undefined__';
  function Hy(e, t) {
    var n = this.__data__;
    return ((this.size += this.has(e) ? 0 : 1), (n[e] = co && t === void 0 ? Uy : t), this);
  }
  function Yn(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Yn.prototype.clear = Ry;
  Yn.prototype.delete = Ny;
  Yn.prototype.get = jy;
  Yn.prototype.has = Fy;
  Yn.prototype.set = Hy;
  function Vy() {
    ((this.__data__ = []), (this.size = 0));
  }
  function Mi(e, t) {
    for (var n = e.length; n--; ) if (bo(e[n][0], t)) return n;
    return -1;
  }
  var Zy = Array.prototype,
    Wy = Zy.splice;
  function Ky(e) {
    var t = this.__data__,
      n = Mi(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return (n == r ? t.pop() : Wy.call(t, n, 1), --this.size, !0);
  }
  function qy(e) {
    var t = this.__data__,
      n = Mi(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function Gy(e) {
    return Mi(this.__data__, e) > -1;
  }
  function Xy(e, t) {
    var n = this.__data__,
      r = Mi(n, e);
    return (r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this);
  }
  function yn(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  yn.prototype.clear = Vy;
  yn.prototype.delete = Ky;
  yn.prototype.get = qy;
  yn.prototype.has = Gy;
  yn.prototype.set = Xy;
  var uo = or(Ut, 'Map');
  function Jy() {
    ((this.size = 0),
      (this.__data__ = { hash: new Yn(), map: new (uo || yn)(), string: new Yn() }));
  }
  function Yy(e) {
    var t = typeof e;
    return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
      ? e !== '__proto__'
      : e === null;
  }
  function ki(e, t) {
    var n = e.__data__;
    return Yy(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map;
  }
  function Qy(e) {
    var t = ki(this, e).delete(e);
    return ((this.size -= t ? 1 : 0), t);
  }
  function eb(e) {
    return ki(this, e).get(e);
  }
  function tb(e) {
    return ki(this, e).has(e);
  }
  function nb(e, t) {
    var n = ki(this, e),
      r = n.size;
    return (n.set(e, t), (this.size += n.size == r ? 0 : 1), this);
  }
  function ir(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  ir.prototype.clear = Jy;
  ir.prototype.delete = Qy;
  ir.prototype.get = eb;
  ir.prototype.has = tb;
  ir.prototype.set = nb;
  function fc(e) {
    return e == null ? '' : ud(e);
  }
  function rb(e, t) {
    for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
    return e;
  }
  var Ed = wd(Object.getPrototypeOf, Object),
    ob = '[object Object]',
    ib = Function.prototype,
    sb = Object.prototype,
    _d = ib.toString,
    ab = sb.hasOwnProperty,
    lb = _d.call(Object);
  function Sd(e) {
    if (!Dn(e) || nr(e) != ob) return !1;
    var t = Ed(e);
    if (t === null) return !0;
    var n = ab.call(t, 'constructor') && t.constructor;
    return typeof n == 'function' && n instanceof n && _d.call(n) == lb;
  }
  function cb(e, t, n) {
    var r = -1,
      o = e.length;
    (t < 0 && (t = -t > o ? 0 : o + t),
      (n = n > o ? o : n),
      n < 0 && (n += o),
      (o = t > n ? 0 : (n - t) >>> 0),
      (t >>>= 0));
    for (var i = Array(o); ++r < o; ) i[r] = e[r + t];
    return i;
  }
  var ub = Ut.isFinite,
    fb = Math.min;
  function db(e) {
    var t = Math[e];
    return function (n, r) {
      if (((n = ii(n)), (r = r == null ? 0 : fb(fd(r), 292)), r && ub(n))) {
        var o = (fc(n) + 'e').split('e'),
          i = t(o[0] + 'e' + (+o[1] + r));
        return ((o = (fc(i) + 'e').split('e')), +(o[0] + 'e' + (+o[1] - r)));
      }
      return t(n);
    };
  }
  var hb = Math.ceil,
    pb = Math.max;
  function La(e, t, n) {
    t === void 0 ? (t = 1) : (t = pb(fd(t), 0));
    var r = e == null ? 0 : e.length;
    if (!r || t < 1) return [];
    for (var o = 0, i = 0, s = Array(hb(r / t)); o < r; ) s[i++] = cb(e, o, (o += t));
    return s;
  }
  function gb() {
    ((this.__data__ = new yn()), (this.size = 0));
  }
  function vb(e) {
    var t = this.__data__,
      n = t.delete(e);
    return ((this.size = t.size), n);
  }
  function mb(e) {
    return this.__data__.get(e);
  }
  function yb(e) {
    return this.__data__.has(e);
  }
  var bb = 200;
  function wb(e, t) {
    var n = this.__data__;
    if (n instanceof yn) {
      var r = n.__data__;
      if (!uo || r.length < bb - 1) return (r.push([e, t]), (this.size = ++n.size), this);
      n = this.__data__ = new ir(r);
    }
    return (n.set(e, t), (this.size = n.size), this);
  }
  function dn(e) {
    var t = (this.__data__ = new yn(e));
    this.size = t.size;
  }
  dn.prototype.clear = gb;
  dn.prototype.delete = vb;
  dn.prototype.get = mb;
  dn.prototype.has = yb;
  dn.prototype.set = wb;
  var Cd = typeof It == 'object' && It && !It.nodeType && It,
    dc = Cd && typeof Mt == 'object' && Mt && !Mt.nodeType && Mt,
    xb = dc && dc.exports === Cd,
    hc = xb ? Ut.Buffer : void 0;
  hc && hc.allocUnsafe;
  function Eb(e, t) {
    return e.slice();
  }
  function _b(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++n < r; ) {
      var s = e[n];
      t(s, n, e) && (i[o++] = s);
    }
    return i;
  }
  function Sb() {
    return [];
  }
  var Cb = Object.prototype,
    Tb = Cb.propertyIsEnumerable,
    pc = Object.getOwnPropertySymbols,
    Ob = pc
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              _b(pc(e), function (t) {
                return Tb.call(e, t);
              }));
        }
      : Sb;
  function Pb(e, t, n) {
    var r = t(e);
    return Jn(e) ? r : rb(r, n(e));
  }
  function gc(e) {
    return Pb(e, Py, Ob);
  }
  var Vs = or(Ut, 'DataView'),
    Zs = or(Ut, 'Promise'),
    wr = or(Ut, 'Set'),
    vc = '[object Map]',
    Ab = '[object Object]',
    mc = '[object Promise]',
    yc = '[object Set]',
    bc = '[object WeakMap]',
    wc = '[object DataView]',
    Ib = rr(Vs),
    Mb = rr(uo),
    kb = rr(Zs),
    Rb = rr(wr),
    Nb = rr(Us),
    On = nr;
  ((Vs && On(new Vs(new ArrayBuffer(1))) != wc) ||
    (uo && On(new uo()) != vc) ||
    (Zs && On(Zs.resolve()) != mc) ||
    (wr && On(new wr()) != yc) ||
    (Us && On(new Us()) != bc)) &&
    (On = function (e) {
      var t = nr(e),
        n = t == Ab ? e.constructor : void 0,
        r = n ? rr(n) : '';
      if (r)
        switch (r) {
          case Ib:
            return wc;
          case Mb:
            return vc;
          case kb:
            return mc;
          case Rb:
            return yc;
          case Nb:
            return bc;
        }
      return t;
    });
  var li = Ut.Uint8Array;
  function Lb(e) {
    var t = new e.constructor(e.byteLength);
    return (new li(t).set(new li(e)), t);
  }
  function Db(e, t) {
    var n = Lb(e.buffer);
    return new e.constructor(n, e.byteOffset, e.length);
  }
  function $b(e) {
    return typeof e.constructor == 'function' && !Ra(e) ? gm(Ed(e)) : {};
  }
  var jb = '__lodash_hash_undefined__';
  function zb(e) {
    return (this.__data__.set(e, jb), this);
  }
  function Bb(e) {
    return this.__data__.has(e);
  }
  function fo(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.__data__ = new ir(); ++t < n; ) this.add(e[t]);
  }
  fo.prototype.add = fo.prototype.push = zb;
  fo.prototype.has = Bb;
  function Fb(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length; ++n < r; ) if (t(e[n], n, e)) return !0;
    return !1;
  }
  function Td(e, t) {
    return e.has(t);
  }
  var Ub = 1,
    Hb = 2;
  function Od(e, t, n, r, o, i) {
    var s = n & Ub,
      a = e.length,
      l = t.length;
    if (a != l && !(s && l > a)) return !1;
    var u = i.get(e),
      f = i.get(t);
    if (u && f) return u == t && f == e;
    var c = -1,
      d = !0,
      h = n & Hb ? new fo() : void 0;
    for (i.set(e, t), i.set(t, e); ++c < a; ) {
      var p = e[c],
        m = t[c];
      if (r) var g = s ? r(m, p, c, t, e, i) : r(p, m, c, e, t, i);
      if (g !== void 0) {
        if (g) continue;
        d = !1;
        break;
      }
      if (h) {
        if (
          !Fb(t, function (v, b) {
            if (!Td(h, b) && (p === v || o(p, v, n, r, i))) return h.push(b);
          })
        ) {
          d = !1;
          break;
        }
      } else if (!(p === m || o(p, m, n, r, i))) {
        d = !1;
        break;
      }
    }
    return (i.delete(e), i.delete(t), d);
  }
  function Vb(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r, o) {
        n[++t] = [o, r];
      }),
      n
    );
  }
  function Da(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r) {
        n[++t] = r;
      }),
      n
    );
  }
  var Zb = 1,
    Wb = 2,
    Kb = '[object Boolean]',
    qb = '[object Date]',
    Gb = '[object Error]',
    Xb = '[object Map]',
    Jb = '[object Number]',
    Yb = '[object RegExp]',
    Qb = '[object Set]',
    e0 = '[object String]',
    t0 = '[object Symbol]',
    n0 = '[object ArrayBuffer]',
    r0 = '[object DataView]',
    xc = Ln ? Ln.prototype : void 0,
    cs = xc ? xc.valueOf : void 0;
  function o0(e, t, n, r, o, i, s) {
    switch (n) {
      case r0:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        ((e = e.buffer), (t = t.buffer));
      case n0:
        return !(e.byteLength != t.byteLength || !i(new li(e), new li(t)));
      case Kb:
      case qb:
      case Jb:
        return bo(+e, +t);
      case Gb:
        return e.name == t.name && e.message == t.message;
      case Yb:
      case e0:
        return e == t + '';
      case Xb:
        var a = Vb;
      case Qb:
        var l = r & Zb;
        if ((a || (a = Da), e.size != t.size && !l)) return !1;
        var u = s.get(e);
        if (u) return u == t;
        ((r |= Wb), s.set(e, t));
        var f = Od(a(e), a(t), r, o, i, s);
        return (s.delete(e), f);
      case t0:
        if (cs) return cs.call(e) == cs.call(t);
    }
    return !1;
  }
  var i0 = 1,
    s0 = Object.prototype,
    a0 = s0.hasOwnProperty;
  function l0(e, t, n, r, o, i) {
    var s = n & i0,
      a = gc(e),
      l = a.length,
      u = gc(t),
      f = u.length;
    if (l != f && !s) return !1;
    for (var c = l; c--; ) {
      var d = a[c];
      if (!(s ? d in t : a0.call(t, d))) return !1;
    }
    var h = i.get(e),
      p = i.get(t);
    if (h && p) return h == t && p == e;
    var m = !0;
    (i.set(e, t), i.set(t, e));
    for (var g = s; ++c < l; ) {
      d = a[c];
      var v = e[d],
        b = t[d];
      if (r) var w = s ? r(b, v, d, t, e, i) : r(v, b, d, e, t, i);
      if (!(w === void 0 ? v === b || o(v, b, n, r, i) : w)) {
        m = !1;
        break;
      }
      g || (g = d == 'constructor');
    }
    if (m && !g) {
      var y = e.constructor,
        x = t.constructor;
      y != x &&
        'constructor' in e &&
        'constructor' in t &&
        !(typeof y == 'function' && y instanceof y && typeof x == 'function' && x instanceof x) &&
        (m = !1);
    }
    return (i.delete(e), i.delete(t), m);
  }
  var c0 = 1,
    Ec = '[object Arguments]',
    _c = '[object Array]',
    Mo = '[object Object]',
    u0 = Object.prototype,
    Sc = u0.hasOwnProperty;
  function f0(e, t, n, r, o, i) {
    var s = Jn(e),
      a = Jn(t),
      l = s ? _c : On(e),
      u = a ? _c : On(t);
    ((l = l == Ec ? Mo : l), (u = u == Ec ? Mo : u));
    var f = l == Mo,
      c = u == Mo,
      d = l == u;
    if (d && ai(e)) {
      if (!ai(t)) return !1;
      ((s = !0), (f = !1));
    }
    if (d && !f)
      return (i || (i = new dn()), s || Na(e) ? Od(e, t, n, r, o, i) : o0(e, t, l, n, r, o, i));
    if (!(n & c0)) {
      var h = f && Sc.call(e, '__wrapped__'),
        p = c && Sc.call(t, '__wrapped__');
      if (h || p) {
        var m = h ? e.value() : e,
          g = p ? t.value() : t;
        return (i || (i = new dn()), o(m, g, n, r, i));
      }
    }
    return d ? (i || (i = new dn()), l0(e, t, n, r, o, i)) : !1;
  }
  function Pd(e, t, n, r, o) {
    return e === t
      ? !0
      : e == null || t == null || (!Dn(e) && !Dn(t))
        ? e !== e && t !== t
        : f0(e, t, n, r, Pd, o);
  }
  function d0(e) {
    return function (t, n, r) {
      for (var o = -1, i = Object(t), s = r(t), a = s.length; a--; ) {
        var l = s[++o];
        if (n(i[l], l, i) === !1) break;
      }
      return t;
    };
  }
  var h0 = d0(),
    us = function () {
      return Ut.Date.now();
    },
    p0 = 'Expected a function',
    g0 = Math.max,
    v0 = Math.min;
  function m0(e, t, n) {
    var r,
      o,
      i,
      s,
      a,
      l,
      u = 0,
      f = !1,
      c = !1,
      d = !0;
    if (typeof e != 'function') throw new TypeError(p0);
    ((t = ii(t) || 0),
      rn(n) &&
        ((f = !!n.leading),
        (c = 'maxWait' in n),
        (i = c ? g0(ii(n.maxWait) || 0, t) : i),
        (d = 'trailing' in n ? !!n.trailing : d)));
    function h(E) {
      var C = r,
        P = o;
      return ((r = o = void 0), (u = E), (s = e.apply(P, C)), s);
    }
    function p(E) {
      return ((u = E), (a = setTimeout(v, t)), f ? h(E) : s);
    }
    function m(E) {
      var C = E - l,
        P = E - u,
        M = t - C;
      return c ? v0(M, i - P) : M;
    }
    function g(E) {
      var C = E - l,
        P = E - u;
      return l === void 0 || C >= t || C < 0 || (c && P >= i);
    }
    function v() {
      var E = us();
      if (g(E)) return b(E);
      a = setTimeout(v, m(E));
    }
    function b(E) {
      return ((a = void 0), d && r ? h(E) : ((r = o = void 0), s));
    }
    function w() {
      (a !== void 0 && clearTimeout(a), (u = 0), (r = l = o = a = void 0));
    }
    function y() {
      return a === void 0 ? s : b(us());
    }
    function x() {
      var E = us(),
        C = g(E);
      if (((r = arguments), (o = this), (l = E), C)) {
        if (a === void 0) return p(l);
        if (c) return (clearTimeout(a), (a = setTimeout(v, t)), h(l));
      }
      return (a === void 0 && (a = setTimeout(v, t)), s);
    }
    return ((x.cancel = w), (x.flush = y), x);
  }
  function Ws(e, t, n) {
    ((n !== void 0 && !bo(e[t], n)) || (n === void 0 && !(t in e))) && ka(e, t, n);
  }
  function y0(e) {
    return Dn(e) && Ii(e);
  }
  function Ks(e, t) {
    if (!(t === 'constructor' && typeof e[t] == 'function') && t != '__proto__') return e[t];
  }
  function b0(e) {
    return Dm(e, xd(e));
  }
  function w0(e, t, n, r, o, i, s) {
    var a = Ks(e, n),
      l = Ks(t, n),
      u = s.get(l);
    if (u) {
      Ws(e, n, u);
      return;
    }
    var f = i ? i(a, l, n + '', e, t, s) : void 0,
      c = f === void 0;
    if (c) {
      var d = Jn(l),
        h = !d && ai(l),
        p = !d && !h && Na(l);
      ((f = l),
        d || h || p
          ? Jn(a)
            ? (f = a)
            : y0(a)
              ? (f = ym(a))
              : h
                ? ((c = !1), (f = Eb(l)))
                : p
                  ? ((c = !1), (f = Db(l)))
                  : (f = [])
          : Sd(l) || Hs(l)
            ? ((f = a), Hs(a) ? (f = b0(a)) : (!rn(a) || Ma(a)) && (f = $b(l)))
            : (c = !1));
    }
    (c && (s.set(l, f), o(f, l, r, i, s), s.delete(l)), Ws(e, n, f));
  }
  function $a(e, t, n, r, o) {
    e !== t &&
      h0(
        t,
        function (i, s) {
          if ((o || (o = new dn()), rn(i))) w0(e, t, s, n, $a, r, o);
          else {
            var a = r ? r(Ks(e, s), i, s + '', e, t, o) : void 0;
            (a === void 0 && (a = i), Ws(e, s, a));
          }
        },
        xd,
      );
  }
  var x0 = gd(function (e, t, n, r) {
    $a(e, t, n, r);
  });
  function Mn(e, t) {
    return Pd(e, t);
  }
  var E0 = gd(function (e, t, n) {
      $a(e, t, n);
    }),
    Cc = db('round'),
    _0 = 1 / 0,
    S0 =
      wr && 1 / Da(new wr([, -0]))[1] == _0
        ? function (e) {
            return new wr(e);
          }
        : mm,
    C0 = 200;
  function T0(e, t, n) {
    var r = -1,
      o = Im,
      i = e.length,
      s = !0,
      a = [],
      l = a;
    if (i >= C0) {
      var u = S0(e);
      if (u) return Da(u);
      ((s = !1), (o = Td), (l = new fo()));
    } else l = a;
    e: for (; ++r < i; ) {
      var f = e[r],
        c = f;
      if (((f = f !== 0 ? f : 0), s && c === c)) {
        for (var d = l.length; d--; ) if (l[d] === c) continue e;
        a.push(f);
      } else o(l, c, n) || (l !== a && l.push(c), a.push(f));
    }
    return a;
  }
  function O0(e) {
    return e && e.length ? T0(e) : [];
  }
  var P0 = Object.defineProperty,
    A0 = Object.defineProperties,
    I0 = Object.getOwnPropertyDescriptors,
    Tc = Object.getOwnPropertySymbols,
    M0 = Object.prototype.hasOwnProperty,
    k0 = Object.prototype.propertyIsEnumerable,
    bt = Math.pow,
    Oc = (e, t, n) =>
      t in e ? P0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n),
    st = (e, t) => {
      for (var n in t || (t = {})) M0.call(t, n) && Oc(e, n, t[n]);
      if (Tc) for (var n of Tc(t)) k0.call(t, n) && Oc(e, n, t[n]);
      return e;
    },
    Ri = (e, t) => A0(e, I0(t)),
    Qt = (e, t, n) =>
      new Promise((r, o) => {
        var i = (l) => {
            try {
              a(n.next(l));
            } catch (u) {
              o(u);
            }
          },
          s = (l) => {
            try {
              a(n.throw(l));
            } catch (u) {
              o(u);
            }
          },
          a = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(i, s));
        a((n = n.apply(e, t)).next());
      });
  const R0 = [
    'paths',
    'node-labels',
    'nodes',
    'focusring',
    'edge-labels',
    'edges',
    'base',
    'grid',
    'background',
    'root',
  ];
  function In(e) {
    return qn(e) ? e : Ot(e);
  }
  function Se(e, t = 'Parameter') {
    if (e == null) throw new Error(`${t} is null`);
    return e;
  }
  const Ad = Symbol('containers');
  function N0(e) {
    Bt(Ad, e);
  }
  function ja() {
    const e = Se(rt(Ad), 'containers');
    return { container: e.container, svg: e.svg, viewport: e.viewport, svgPanZoom: e.svgPanZoom };
  }
  class Q {
    static value(t, n) {
      return t instanceof Function ? t(n) : t;
    }
    static values(t, n) {
      return Object.values(t).filter((r) => r instanceof Function).length === 0
        ? t
        : Object.fromEntries(
            Object.entries(t).map(([r, o]) => [r, o instanceof Function ? o(n) : o]),
          );
    }
  }
  var fe = ((e) => (
    (e.CENTER = 'center'),
    (e.NORTH = 'north'),
    (e.NORTH_EAST = 'north-east'),
    (e.EAST = 'east'),
    (e.SOUTH_EAST = 'south-east'),
    (e.SOUTH = 'south'),
    (e.SOUTH_WEST = 'south-west'),
    (e.WEST = 'west'),
    (e.NORTH_WEST = 'north-west'),
    e
  ))(fe || {});
  function fs(e) {
    const t = {};
    return Object.assign(t, e(t));
  }
  function Pc(e, t, n) {
    const r = Q.values(t.normal, e);
    return r.type == 'circle'
      ? { width: r.radius * 2 * n, height: r.radius * 2 * n }
      : { width: r.width * n, height: r.height * n };
  }
  function L0(e, t, n, r) {
    const o = Math.abs(e.x - n.x) < t.width / 2 + r.width / 2,
      i = Math.abs(e.y - n.y) < t.height / 2 + r.height / 2;
    return o && i;
  }
  function wo(e, t) {
    let n = 0;
    return (
      t === 1 || e === void 0 || e === 'none'
        ? (n = e ?? 0)
        : typeof e == 'string'
          ? (n = e
              .split(/\s+/)
              .map((r) => parseInt(r) * t)
              .filter((r) => !isNaN(r))
              .join(' '))
          : (n = e * t),
      n && n !== '0' ? n : void 0
    );
  }
  function Ni(e) {
    let t = 0;
    if (e === void 0 || e === 'none') t = 0;
    else if (typeof e == 'string') {
      const n = e
        .split(/\s+/)
        .map((r) => parseInt(r))
        .filter((r) => !isNaN(r));
      n.length % 2 === 0
        ? (t = n.reduce((r, o) => r + o, 0))
        : (t = n.reduce((r, o) => r + o, 0) * 2);
    } else t = e * 2;
    return t;
  }
  const Ac = 20;
  class D0 {
    activate(t) {
      const { nodePositions: n, nodes: r, configs: o, emitter: i, scale: s, svgPanZoom: a } = t,
        l = (c) => {
          for (const [d, h] of Object.entries(c)) {
            const p = this.getOrCreateNodePosition(n, d);
            this.setNodePosition(p, h);
          }
        },
        u = (c) => {
          const d = c.filter((m) => !(m in n.value)),
            h = a.getViewArea(),
            p = s.value;
          for (const m of d) {
            const g = r.value[m],
              v = Pc(g, o.node, p),
              b = st({}, h.center);
            for (;;) {
              let y = !1;
              for (const [x, E] of Object.entries(n.value)) {
                if (m === x) continue;
                const C = r.value[x];
                if (!C) continue;
                const P = Pc(C, o.node, p);
                if (((y = L0(b, v, E, P)), y)) break;
              }
              if (y)
                ((b.x += v.width + Ac * p),
                  b.x + v.width / 2 > h.box.right &&
                    ((b.x = h.center.x), (b.y += v.height + Ac * p)));
              else break;
            }
            const w = this.getOrCreateNodePosition(n, m);
            this.setNodePosition(w, b);
          }
        };
      u(Object.keys(r.value));
      const f = be(
        () => Mn(new Set(Object.keys(r.value)), new Set(Object.keys(n.value))),
        (c) => {
          c || u(Object.keys(r.value));
        },
      );
      (i.on('node:dragstart', l),
        i.on('node:pointermove', l),
        i.on('node:dragend', l),
        (this.onDeactivate = () => {
          (f(), i.off('node:dragstart', l), i.off('node:pointermove', l), i.off('node:dragend', l));
        }));
    }
    deactivate() {
      this.onDeactivate && this.onDeactivate();
    }
    setNodePosition(t, n) {
      ((t.value.x = Cc(n.x, 3)), (t.value.y = Cc(n.y, 3)));
    }
    getOrCreateNodePosition(t, n) {
      const r = en(t.value, n);
      return (r.value || (r.value = { x: 0, y: 0 }), r);
    }
  }
  function Id() {
    return {
      view: {
        scalingObjects: !1,
        panEnabled: !0,
        zoomEnabled: !0,
        minZoomLevel: 0.1,
        maxZoomLevel: 64,
        doubleClickZoomEnabled: !0,
        mouseWheelZoomEnabled: !0,
        boxSelectionEnabled: !1,
        autoPanAndZoomOnLoad: 'center-content',
        fitContentMargin: '8%',
        autoPanOnResize: !0,
        layoutHandler: new D0(),
        onSvgPanZoomInitialized: void 0,
        grid: {
          visible: !1,
          interval: 10,
          thickIncrements: 5,
          line: { color: '#e0e0e0', width: 1, dasharray: 1 },
          thick: { color: '#cccccc', width: 1, dasharray: 0 },
        },
        selection: {
          box: { color: '#0000ff20', strokeWidth: 1, strokeColor: '#aaaaff', strokeDasharray: 0 },
          detector: (e) => {
            const t = /Mac OS/.test(navigator.userAgent) ? e.metaKey : e.ctrlKey;
            return e.type === 'keydown' ? t : !t;
          },
        },
        builtInLayerOrder: [],
        onBeforeInitialDisplay: void 0,
      },
      node: fs((e) => ({
        normal: {
          type: 'circle',
          radius: 16,
          width: 32,
          height: 32,
          borderRadius: 4,
          color: '#4466cc',
          strokeWidth: 0,
          strokeColor: '#000000',
          strokeDasharray: 0,
        },
        hover: {
          type: (t) => Q.value(e.normal.type, t),
          radius: (t) => {
            var n;
            return ((n = Q.value(e.normal.radius, t)) != null ? n : 0) + 2;
          },
          width: (t) => {
            var n;
            return ((n = Q.value(e.normal.width, t)) != null ? n : 0) + 2;
          },
          height: (t) => {
            var n;
            return ((n = Q.value(e.normal.height, t)) != null ? n : 0) + 2;
          },
          borderRadius: (t) => {
            var n;
            return (n = Q.value(e.normal.borderRadius, t)) != null ? n : 0;
          },
          strokeWidth: (t) => Q.value(e.normal.strokeWidth, t),
          strokeColor: (t) => Q.value(e.normal.strokeColor, t),
          strokeDasharray: (t) => Q.value(e.normal.strokeDasharray, t),
          color: '#3355bb',
        },
        selected: void 0,
        draggable: !0,
        selectable: !1,
        label: {
          visible: !0,
          fontFamily: void 0,
          fontSize: 11,
          lineHeight: 1.1,
          color: '#000000',
          background: void 0,
          margin: 4,
          direction: fe.SOUTH,
          directionAutoAdjustment: !1,
          text: 'name',
          handleNodeEvents: !0,
        },
        focusring: { visible: !0, width: 4, padding: 3, color: '#eebb00' },
        zOrder: { enabled: !1, zIndex: 0, bringToFrontOnHover: !0, bringToFrontOnSelected: !0 },
        transition: void 0,
      })),
      edge: fs((e) => ({
        normal: {
          width: 2,
          color: '#4466cc',
          dasharray: 0,
          linecap: 'butt',
          animate: !1,
          animationSpeed: 50,
        },
        hover: {
          width: (t) => Q.value(e.normal.width, t) + 1,
          color: '#3355bb',
          dasharray: (t) => Q.value(e.normal.dasharray, t),
          linecap: (t) => Q.value(e.normal.linecap, t),
          animate: (t) => Q.value(e.normal.animate, t),
          animationSpeed: (t) => Q.value(e.normal.animationSpeed, t),
        },
        selected: {
          width: (t) => Q.value(e.normal.width, t) + 1,
          color: '#dd8800',
          dasharray: (t) => {
            const n = Q.value(e.normal.width, t);
            return `${n * 1.5} ${n * 2}`;
          },
          linecap: (t) => Q.value(e.normal.linecap, t),
          animate: (t) => Q.value(e.normal.animate, t),
          animationSpeed: (t) => Q.value(e.normal.animationSpeed, t),
        },
        selectable: !1,
        gap: 3,
        type: 'straight',
        marker: {
          source: {
            type: 'none',
            width: 5,
            height: 5,
            margin: -1,
            offset: 0,
            units: 'strokeWidth',
            color: null,
          },
          target: {
            type: 'none',
            width: 5,
            height: 5,
            margin: -1,
            offset: 0,
            units: 'strokeWidth',
            color: null,
          },
        },
        margin: null,
        summarize: (t, n) => (n.edge.type == 'curve' ? !1 : null),
        summarized: {
          label: { fontSize: 10, lineHeight: 1, color: '#4466cc' },
          shape: {
            type: 'rect',
            radius: 6,
            width: 12,
            height: 12,
            borderRadius: 3,
            color: '#ffffff',
            strokeWidth: 1,
            strokeColor: '#4466cc',
            strokeDasharray: void 0,
          },
          stroke: {
            width: 5,
            color: '#4466cc',
            dasharray: void 0,
            linecap: void 0,
            animate: !1,
            animationSpeed: 50,
          },
        },
        selfLoop: { radius: 12, isClockwise: !0, offset: 10, angle: 270 },
        keepOrder: 'clock',
        label: {
          fontFamily: void 0,
          fontSize: 11,
          lineHeight: 1.1,
          color: '#000000',
          background: void 0,
          margin: 4,
          padding: 4,
        },
        zOrder: { enabled: !1, zIndex: 0, bringToFrontOnHover: !0, bringToFrontOnSelected: !0 },
      })),
      path: fs((e) => ({
        visible: !1,
        clickable: !1,
        hoverable: !1,
        curveInNode: !1,
        end: 'centerOfNode',
        margin: 0,
        path: Ot({
          width: 6,
          color: (t) => {
            const n = [
                '#d5000088',
                '#c5116288',
                '#aa00ff88',
                '#6200ea88',
                '#304ffe88',
                '#2962ff88',
                '#0091ea88',
                '#00b8d488',
                '#00bfa588',
                '#00c85388',
                '#64dd1788',
                '#aeea0088',
                '#ffd60088',
                '#ffab0088',
                '#ff6d0088',
                '#dd2c0088',
              ],
              r = t.edges
                .map((o) =>
                  o.split('').reduce((i, s) => ((i = (i << 5) - i + s.charCodeAt(0)), i & i), 0),
                )
                .reduce((o, i) => o + i, 0);
            return n[Math.abs(r) % n.length];
          },
          dasharray: void 0,
          linecap: 'round',
          linejoin: 'round',
          animate: !1,
          animationSpeed: 50,
        }),
        normal: {
          width: (t) => Q.value(e.path.width, t),
          color: (t) => Q.value(e.path.color, t),
          dasharray: (t) => Q.value(e.path.dasharray, t),
          linecap: (t) => Q.value(e.path.linecap, t),
          linejoin: (t) => Q.value(e.path.linejoin, t),
          animate: (t) => Q.value(e.path.animate, t),
          animationSpeed: (t) => Q.value(e.path.animationSpeed, t),
        },
        hover: {
          width: (t) => Q.value(e.normal.width, t) + 2,
          color: (t) => Q.value(e.normal.color, t),
          dasharray: (t) => Q.value(e.normal.dasharray, t),
          linecap: (t) => Q.value(e.normal.linecap, t),
          linejoin: (t) => Q.value(e.normal.linejoin, t),
          animate: (t) => Q.value(e.normal.animate, t),
          animationSpeed: (t) => Q.value(e.normal.animationSpeed, t),
        },
        selected: {
          width: (t) => Q.value(e.normal.width, t) + 2,
          color: (t) => Q.value(e.normal.color, t),
          dasharray: '6 12',
          linecap: (t) => Q.value(e.normal.linecap, t),
          linejoin: (t) => Q.value(e.normal.linejoin, t),
          animate: (t) => Q.value(e.normal.animate, t),
          animationSpeed: (t) => Q.value(e.normal.animationSpeed, t),
        },
        selectable: !1,
        zOrder: { enabled: !1, zIndex: 0, bringToFrontOnHover: !0, bringToFrontOnSelected: !0 },
        transition: void 0,
      })),
    };
  }
  function $0(e) {
    return Id();
  }
  const Md = Symbol('style');
  function j0(e, t) {
    return Sd(e) ? E0(e, t) : t;
  }
  function z0(e) {
    const t = Ot(Id()),
      n = Object.keys(t);
    for (const r of n)
      be(
        () => e.value[r],
        () => {
          x0(t[r], e.value[r] || {}, j0);
        },
        { immediate: !0, deep: !0 },
      );
    return (Bt(Md, t), t);
  }
  function Li(e) {
    return Se(rt(Md), `Configs(${e})`)[e];
  }
  function B0() {
    return Li('view');
  }
  function Di() {
    return Li('node');
  }
  function $i() {
    return Li('edge');
  }
  function kd() {
    return Li('path');
  }
  let F0 = 1;
  function U0() {
    return F0++;
  }
  function St(e) {
    return Object.entries(e);
  }
  function Bo(e, t) {
    const n = new Set(Object.keys(e));
    (St(t).forEach(([r, o]) => {
      (Mn(e[r], o) || (e[r] = o), n.delete(r));
    }),
      n.forEach((r) => delete e[r]));
  }
  function H0(e) {
    return e instanceof Promise || (e && typeof e.then == 'function');
  }
  function V0(e, t, n) {
    const r = In({ edgeLayoutPoints: {}, edgeGroups: {}, summarizedEdges: {} });
    return (
      Rt(() => {
        const { edgeLayoutPoints: o, edgeGroups: i } = W0(n, e.value, t.value);
        (Bo(r.edgeLayoutPoints, o), Bo(r.edgeGroups, i));
      }),
      Rt(() => {
        const o = {};
        for (const [i, { edges: s, groupWidth: a }] of Object.entries(r.edgeGroups)) {
          let l = !1;
          if (a == 0) l = !1;
          else if (n.edge.summarize instanceof Function) {
            const u = n.edge.summarize(s, n);
            u === null ? (l = Ic(e.value, s, n, a)) : (l = u);
          } else n.edge.summarize ? (l = Ic(e.value, s, n, a)) : (l = !1);
          ((r.edgeGroups[i].summarize = l), l && Object.keys(s).forEach((u) => (o[u] = !0)));
        }
        Bo(r.summarizedEdges, o);
      }),
      r
    );
  }
  function Z0(e, t, n, r, o, i) {
    return e
      ? t
        ? Mc(e.edge, n, r, o, 0, 0, i)
        : Mc(e.edge, n, r, o, e.groupWidth, e.pointInGroup, i)
      : { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } };
  }
  function W0(e, t, n) {
    const r = {},
      o = {},
      i = {};
    for (const [a, l] of Object.entries(n)) {
      if (!(l.source in t && l.target in t)) continue;
      const u = [l.source, l.target].sort().join('<=>'),
        f = i[u] || {};
      ((f[a] = l), (i[u] = f));
    }
    const s = e.edge.gap instanceof Function ? e.edge.gap : (a, l) => e.edge.gap;
    for (const [a, l] of Object.entries(i)) {
      const u = Object.keys(l).length;
      if (u == 0) continue;
      const f = s(l, e),
        [c, d] = Object.entries(l)[0];
      if (u === 1)
        ((r[c] = { edge: d, pointInGroup: 0, groupWidth: 0 }),
          (o[a] = { edges: l, groupWidth: 0, summarize: !1 }));
      else {
        let h = 0;
        const p = Object.entries(l).map(([v, b]) => {
            let w = Q.value(e.edge.normal.width, b);
            return (
              isNaN(+w) &&
                (console.warn(
                  '[v-network-graph] Edge width is invalid value. id=[%s] value=[%s]',
                  v,
                  w,
                ),
                (w = 1)),
              w / 2
            );
          }),
          m = Object.entries(l).map(
            ([v, b], w) => (w > 0 && (h += p[w - 1] + f + p[w]), [v, b, h]),
          ),
          g = h;
        (m.forEach(([v, b, w]) => {
          r[v] = { edge: b, pointInGroup: w, groupWidth: g };
        }),
          (o[a] = { edges: l, groupWidth: g, summarize: !1 }));
      }
    }
    return { edgeLayoutPoints: r, edgeGroups: o };
  }
  function Ic(e, t, n, r) {
    if (Object.entries(t).length === 1) return !1;
    const o = Math.min(
      ...Object.values(t)
        .flatMap((i) => [e[i.source], e[i.target]])
        .filter((i) => i)
        .map((i) => {
          const s = Q.values(n.node.normal, i);
          return s.type === 'circle' ? s.radius * 2 : Math.min(s.width, s.height);
        }),
    );
    return r > o;
  }
  function Mc(e, t, n, r, o, i, s) {
    var a, l, u, f, c, d, h, p;
    let m, g, v, b;
    return (
      e.source < e.target
        ? ([m, g, v, b] = kc(
            (a = t?.x) != null ? a : 0,
            (l = t?.y) != null ? l : 0,
            (u = n?.x) != null ? u : 0,
            (f = n?.y) != null ? f : 0,
            r,
            o,
            i,
            s,
          ))
        : ([v, b, m, g] = kc(
            (c = n?.x) != null ? c : 0,
            (d = n?.y) != null ? d : 0,
            (h = t?.x) != null ? h : 0,
            (p = t?.y) != null ? p : 0,
            r,
            o,
            i,
            s,
          )),
      { p1: { x: m, y: g }, p2: { x: v, y: b } }
    );
  }
  function kc(e, t, n, r, o, i, s, a) {
    const l = n - e,
      u = r - t;
    let f = (i / 2 - s) * o;
    if (f !== 0 && a !== 'clock') {
      const c = Math.atan2(r - t, n - e);
      if (a === 'vertical') {
        const d = Math.PI / 2;
        (c < -d || c >= d) && (f *= -1);
      } else a === 'horizontal' && c < 0 && (f *= -1);
    }
    if (l === 0) {
      const c = u < 0 ? -1 : 1;
      return [e + f * c, t, n + f * c, r];
    } else if (u === 0) {
      const c = l < 0 ? 1 : -1;
      return [e, t + f * c, n, r + f * c];
    } else {
      const c = -1 / (u / l);
      u < 0 && (f = -f);
      const d = f / Math.sqrt(1 + Math.pow(c, 2));
      return [e + d, t + d * c, n + d, r + d * c];
    }
  }
  function Rd(e, t, n) {
    return (n || (n = { x: 0, y: 0 }), (n.x = e.x + t.x), (n.y = e.y + t.y), n);
  }
  function za(e, t, n) {
    return (n || (n = { x: 0, y: 0 }), (n.x = e.x - t.x), (n.y = e.y - t.y), n);
  }
  function Nd(e, t, n) {
    return (n || (n = { x: 0, y: 0 }), (n.x = e.x * t.x), (n.y = e.y * t.y), n);
  }
  function Ld(e, t, n) {
    return (n || (n = { x: 0, y: 0 }), (n.x = e.x * t), (n.y = e.y * t), n);
  }
  function Ba(e, t, n) {
    return (n || (n = { x: 0, y: 0 }), (n.x = e.x / t.x), (n.y = e.y / t.y), n);
  }
  function Dd(e, t) {
    return e.x * t.x + e.y * t.y;
  }
  function $d(e, t) {
    return e.x * t.y - e.y * t.x;
  }
  function Fa(e) {
    return e.x * e.x + e.y * e.y;
  }
  function Ua(e) {
    return Math.sqrt(Fa(e));
  }
  function Ha(e, t) {
    const n = e.x - t.x,
      r = e.y - t.y;
    return n * n + r * r;
  }
  function jd(e, t) {
    return Math.sqrt(Ha(e, t));
  }
  function zd(e, t) {
    t || (t = { x: 0, y: 0 });
    const n = Ua(e);
    return (n === 0 ? ((t.x = 1), (t.y = 0)) : Ba(e, { x: n, y: n }, t), t);
  }
  function ci(e, t, n) {
    n || (n = { x: 0, y: 0 });
    const r = e.x * Math.cos(t) - e.y * Math.sin(t),
      o = e.x * Math.sin(t) + e.y * Math.cos(t);
    return ((n.x = r), (n.y = o), n);
  }
  const K0 = 180 / Math.PI;
  function q0(e) {
    return e * K0;
  }
  function Va(e) {
    return Math.atan2(e.y, e.x);
  }
  function Za(e) {
    return q0(Va(e));
  }
  const G0 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        add: Rd,
        angle: Va,
        angleDegree: Za,
        cross: $d,
        distance: jd,
        distanceSquared: Ha,
        divide: Ba,
        dot: Dd,
        length: Ua,
        lengthSquared: Fa,
        multiply: Nd,
        multiplyScalar: Ld,
        normalize: zd,
        rotate: ci,
        subtract: za,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
  class Ee {
    static fromArray(t) {
      return new Ee(t[0] || 0, t[1] || 0);
    }
    static fromObject(t) {
      return new Ee(t.x, t.y);
    }
    constructor(t, n) {
      ((this.x = t), (this.y = n));
    }
    add(t) {
      return Rd(this, t, this);
    }
    subtract(t) {
      return za(this, t, this);
    }
    multiply(t) {
      return Nd(this, t, this);
    }
    multiplyScalar(t) {
      return Ld(this, t, this);
    }
    divide(t) {
      return Ba(this, t, this);
    }
    dot(t) {
      return Dd(this, t);
    }
    cross(t) {
      return $d(this, t);
    }
    lengthSquared() {
      return Fa(this);
    }
    length() {
      return Ua(this);
    }
    distanceSquared(t) {
      return Ha(this, t);
    }
    distance(t) {
      return jd(this, t);
    }
    normalize() {
      return zd(this, this);
    }
    angle() {
      return Va(this);
    }
    angleDegree() {
      return Za(this);
    }
    rotate(t) {
      return ci(this, t, this);
    }
    isEqualTo(t) {
      return this.x === t.x && this.y === t.y;
    }
    clone() {
      return new Ee(this.x, this.y);
    }
    toObject() {
      return { x: this.x, y: this.y };
    }
    toArray() {
      return [this.x, this.y];
    }
  }
  const Ue = st({ Vector2D: Ee }, G0);
  class je {
    constructor(t, n, r) {
      ((this.source = t), (this.target = n), (this.v = r));
    }
    static fromLinePosition(t) {
      const n = Ee.fromObject(t.p1),
        r = Ee.fromObject(t.p2);
      return new je(n, r, xr(n, r));
    }
    static fromPositions(t, n) {
      const r = Ee.fromObject(t),
        o = Ee.fromObject(n);
      return new je(r, o, xr(r, o));
    }
    static fromVectors(t, n) {
      return new je(t, n, xr(t, n));
    }
  }
  function xr(e, t) {
    return t.clone().subtract(e);
  }
  function X0(e) {
    return [Ee.fromObject(e.p1), Ee.fromObject(e.p2)];
  }
  function J0(e) {
    return new Ee((e.p1.x + e.p2.x) / 2, (e.p1.y + e.p2.y) / 2);
  }
  function ui(e, t) {
    return { p1: e, p2: t };
  }
  function qs(e, t, n) {
    const r = je.fromLinePosition(e);
    return Y0(r, t, n);
  }
  function Y0(e, t, n) {
    const r = e.v.clone().normalize(),
      o = e.source.clone().add(r.clone().multiplyScalar(t)),
      i = e.target.clone().subtract(r.clone().multiplyScalar(n));
    let s = o.toObject(),
      a = i.toObject();
    const l = xr(o, i);
    if (e.v.angle() * l.angle() < 0) {
      const u = new Ee((s.x + a.x) / 2, (s.y + a.y) / 2),
        f = u.clone().add(r.multiplyScalar(0.5));
      ((s = u.toObject()), (a = f.toObject()));
    }
    return { p1: s, p2: a };
  }
  function Q0(e) {
    return { p1: e.p2, p2: e.p1 };
  }
  function Dr(e) {
    const t = e.v
      .clone()
      .normalize()
      .rotate(Math.PI / 2);
    return je.fromVectors(e.target, e.target.clone().add(t));
  }
  function Wa(e, t) {
    const n = t.v.clone().normalize(),
      r = t.source,
      o = Ue.subtract(e, r),
      i = n.dot(o);
    return r.clone().add(n.multiplyScalar(i));
  }
  function ji(e, t, n, r) {
    if (!(Ue.lengthSquared(Ue.subtract(t, n)) - r * r <= Math.pow(1, -10))) return null;
    const o = je.fromVectors(e, t),
      i = Wa(n, o),
      s = Ue.length(Ue.subtract(i, n));
    if (r < s) return null;
    if (r === s) return i;
    const a = Math.sqrt(bt(r, 2) - bt(s, 2)),
      l = o.v.normalize().multiplyScalar(a);
    return i.subtract(l);
  }
  function ew(e, t, n, r, o) {
    if (!(Ue.lengthSquared(Ue.subtract(t, n)) - r * r <= Math.pow(1, -10))) return null;
    const i = je.fromVectors(e, t),
      s = Wa(n, i),
      a = Ue.length(Ue.subtract(s, n));
    if (r < a) return null;
    if (r === a) return s;
    const l = Math.sqrt(bt(r, 2) - bt(a, 2)),
      u = i.v.normalize().multiplyScalar(l),
      f = s.clone().add(u),
      c = s.clone().subtract(u),
      d = o.distance(f),
      h = o.distance(c);
    return Math.abs(d - h) < 2 ? c : d < h ? f : c;
  }
  function Vn(e, t) {
    const n = Ue.subtract(t.source, e.source),
      r = e.v,
      o = t.v,
      i = Ue.cross(n, r) / Ue.cross(r, o);
    return t.source.clone().add(o.clone().multiplyScalar(i));
  }
  function ho(e, t, n, r, o) {
    const i = e,
      s = n.clone().subtract(i),
      a = s.length(),
      l = t + r;
    if (l < a) return null;
    const u = Math.abs(t - r);
    if (a < u) return null;
    if (a === l) {
      const x = s.clone().normalize(),
        E = e.clone().add(x.multiplyScalar(t));
      return o ? E : [E, E];
    }
    if (a === u) {
      const x = s.clone().normalize(),
        E = t > r,
        C = e.clone().add(x.multiplyScalar(E ? t : -t));
      return o ? C : [C, C];
    }
    const f = t,
      c = r,
      d = (bt(a, 2) + bt(f, 2) - bt(c, 2)) / (2 * a * f),
      h = f * d,
      p = Math.sqrt(bt(f, 2) - bt(h, 2)),
      m = s.clone().normalize(),
      g = new Ee(-m.y, m.x),
      v = m.clone().multiplyScalar(h),
      b = g.clone().multiplyScalar(p),
      w = e.clone().add(v).add(b),
      y = e.clone().add(v).subtract(b);
    if (o) {
      const x = w.distance(o),
        E = y.distance(o);
      return x < E ? w : y;
    } else return [w, y];
  }
  function Rc(e, t, n, r) {
    const o = je.fromPositions(e, t),
      i = ((n.width + n.strokeWidth) / 2) * r,
      s = ((n.height + n.strokeWidth) / 2) * r,
      a = n.borderRadius > 0 ? (n.borderRadius + n.strokeWidth / 2) * r : 0,
      l = (o.v.angle() - Math.PI / 2) % Math.PI,
      u = Math.PI / 2 - (l % Math.PI),
      f = s * Math.abs(Math.tan(l)),
      c = i * Math.abs(Math.tan(u)),
      d = f <= i - a,
      h = c <= s - a;
    if (d || h || a === 0) return Math.sqrt(d ? bt(s, 2) + bt(f, 2) : bt(i, 2) + bt(c, 2));
    {
      const p = t.x - i + a,
        m = t.y - s + a,
        g = t.x + i - a,
        v = t.y + s - a,
        b = [new Ee(p, m), new Ee(g, m), new Ee(g, v), new Ee(p, v)],
        w = Math.floor(((o.v.angleDegree() + 360) % 360) / 90),
        y = b[w],
        x = ji(o.source, Wa(y, o), y, a);
      return x ? xr(x, o.target).length() : xr(y, o.target).length() + a;
    }
  }
  function Bd(e, t, n, r, o) {
    const i = je.fromLinePosition(e),
      s = i.v.clone().normalize(),
      a = r === 0 ? i.source : i.source.clone().add(s.clone().multiplyScalar(r * o)),
      l = r === 0 ? i.target : i.target.clone().subtract(s.clone().multiplyScalar(r * o)),
      u = (t.width / 2 + n) * o,
      f = new Ee(-s.y, s.x).multiplyScalar(u);
    let c = Ue.subtract(a, f),
      d = Ue.add(a, f),
      h = Ue.subtract(l, f),
      p = Ue.add(l, f);
    const m = i.v.angleDegree();
    return (
      (m < -90 || m >= 90) && (([c, d] = [d, c]), ([h, p] = [p, h])),
      { source: { above: c, below: d }, target: { above: h, below: p } }
    );
  }
  function tw(e, t, n, r) {
    let o;
    n.type === 'circle' ? (o = n.radius + n.strokeWidth / 2) : (o = Rc(t, e, n, 1));
    let i;
    return (
      r.type === 'circle' ? (i = r.radius + r.strokeWidth / 2) : (i = Rc(e, t, r, 1)),
      [o, i]
    );
  }
  function Rn(e, t, n) {
    const { x: r, y: o } = e,
      i = r - t.x,
      s = o - t.y;
    return {
      x: i * Math.cos(n) - s * Math.sin(n) + t.x,
      y: i * Math.sin(n) + s * Math.cos(n) + t.y,
    };
  }
  function Gs(e) {
    return e > 0 ? -(Math.PI * 2 - e) : Math.PI * 2 + e;
  }
  function Xs(e, t, n, r) {
    const o = [],
      i = je.fromVectors(t, e),
      s = je.fromVectors(t, n);
    let a = Er(i, s);
    r * a < 0 && (a = Gs(a));
    const l = Ee.fromObject(Rn(e, t, -a / 2)),
      u = je.fromVectors(t, l),
      f = Dr(u),
      c = Er(i, u);
    let d = Dr(i);
    if (Math.abs(c) < Math.PI / 2) {
      const p = Vn(d, f);
      o.push(p);
    } else {
      const p = Ee.fromObject(Rn(l, t, c / 2)),
        m = Dr(je.fromVectors(t, Ee.fromObject(p))),
        g = Vn(d, m),
        v = Vn(m, f);
      o.push(g, p, v);
    }
    o.push(l);
    const h = Er(s, u);
    if (((d = Dr(s)), Math.abs(h) < Math.PI / 2)) {
      const p = Vn(d, f);
      o.push(p);
    } else {
      const p = Ee.fromObject(Rn(l, t, h / 2)),
        m = Dr(je.fromVectors(t, Ee.fromObject(p))),
        g = Vn(f, m),
        v = Vn(m, d);
      o.push(g, p, v);
    }
    return o;
  }
  function Er(e, t) {
    return Math.atan2(e.v.y * t.v.x - e.v.x * t.v.y, e.v.x * t.v.x + e.v.y * t.v.y);
  }
  function nw(e, t, n) {
    const r = e.x,
      o = e.y,
      i = t.x,
      s = t.y,
      a = n.x,
      l = n.y,
      u = r - i,
      f = o - s,
      c = a - i,
      d = l - s;
    if ((u === 0 && f === 0) || (c === 0 && d === 0)) return [e, 0];
    const h =
        (d * (u * (r + i) + f * (o + s)) - f * (c * (a + i) + d * (l + s))) /
        (2 * u * d - 2 * f * c),
      p =
        (-c * (u * (r + i) + f * (o + s)) + u * (c * (a + i) + d * (l + s))) /
        (2 * u * d - 2 * f * c),
      m = Math.sqrt(Math.pow(r - h, 2) + Math.pow(o - p, 2));
    return [new Ee(h, p), m];
  }
  function hr(e) {
    return e.type == 'circle' ? e.radius : Math.min(e.width, e.height) / 2;
  }
  function rw(e) {
    const t = Object.values(e);
    if (t.length === 0) return { top: 0, bottom: 0, left: 0, right: 0 };
    const n = { top: t[0].y, bottom: t[0].y, left: t[0].x, right: t[0].x };
    return (
      t.forEach((r) => {
        ((n.top = Math.min(r.y, n.top)),
          (n.bottom = Math.max(r.y, n.bottom)),
          (n.left = Math.min(r.x, n.left)),
          (n.right = Math.max(r.x, n.right)));
      }),
      n
    );
  }
  function ko(...e) {
    return e.find((t) => !!t);
  }
  const ow = Number.EPSILON * 100;
  function iw(e, t, n, r, o, i, s, a) {
    var l, u;
    const f = e.edges,
      c = e.directions,
      d = f.map((v, b) => aw(v, c[b], r[v.edgeId])),
      h = [];
    let p = !1,
      m = !1;
    {
      const v = d[0];
      let b = hr(t[v.source].shape) * o;
      const w = a + (s === 'edgeOfNode' ? b : 0),
        y = w <= 0 ? v.line.source : Lc(v, w, n, !0);
      (h.push(y),
        (b = hr(t[v.target].shape) * o),
        a > 0 && Ue.distance(v.line.source, v.line.target) <= w + b && (p = !0));
    }
    const g = f.length;
    for (let v = 1; v < g; v++) {
      const b = d[v - 1],
        w = d[v],
        y = w.source,
        x = Ee.fromObject((l = n[y]) != null ? l : { x: 0, y: 0 }),
        E = sw(b, w, x),
        C = hr(t[y].shape) * o,
        P = Math.max(C * (2 / 3), C - 4 * o),
        M = Js(b),
        A = Js(w),
        j = Ro(b, x, P, M),
        R = Ro(w, x, P, !A),
        V = Ro(b, x, C, M),
        re = Ro(w, x, C, !A);
      let ne;
      if (E) {
        const X = Ue.distance(E, x);
        if (X < P) ne = [ko(j, V, b.line.target), E, ko(R, re, w.line.source)];
        else if (X <= C) {
          let le, te;
          (V && j
            ? (le = Ue.distance(E, j) < Ue.distance(E, V) ? j : V)
            : (le = V || b.line.target),
            re && R
              ? (te = Ue.distance(E, R) < Ue.distance(E, re) ? R : re)
              : (te = re || w.line.source),
            (ne = [le, E, te]));
        } else
          j && R
            ? (ne = [j, x, R])
            : V && re
              ? (ne = [V, x, re])
              : (ne = [ko(j, V, b.line.target), x, ko(R, re, w.line.source)]);
      } else
        j && R
          ? (ne = [j, x, R])
          : V && re
            ? (ne = [V, x, re])
            : (ne = [b.line.target, x, w.line.source]);
      if (b.curve) {
        const X = h[h.length - 1];
        if (X) {
          const le = X instanceof Array ? X[X.length - 1] : X;
          let te;
          ne instanceof Array ? (te = i ? ne[0] : ne[1]) : (te = ne);
          const Oe = Xs(le, b.curve.circle.center, te, b.curve.theta);
          ne instanceof Array && i ? h.push([...Oe, ...ne]) : h.push([...Oe, te]);
        }
      } else if (b.loop) {
        const [X, le, te] = $c(x, b, C);
        (h.push(X),
          h.push(te),
          ne instanceof Array && i ? h.push([le, ne[1], ne[2]]) : h.push(ne[2]));
      } else
        i || !(ne instanceof Array)
          ? h.push(ne)
          : w.curve
            ? h.push(ne[1])
            : w.loop
              ? h.push(ne[0])
              : h.push(ne[0], ne[2]);
    }
    {
      const v = d[d.length - 1];
      let b = hr(t[v.target].shape) * o;
      const w = a + (s === 'edgeOfNode' ? b : 0),
        y = w <= 0 ? v.line.target : Lc(v, w, n, !1);
      if (((b = hr(t[v.source].shape) * o), v.loop)) {
        const x = Ee.fromObject((u = n[v.target]) != null ? u : { x: 0, y: 0 }),
          [E, C, P] = $c(x, v, b);
        (h.push(E), h.push(P));
      } else if (v.curve) {
        const x = h[h.length - 1],
          E = x instanceof Array ? x[x.length - 1] : x,
          C = Xs(E, v.curve.circle.center, y, v.curve.theta);
        h.push([...C, y]);
      } else h.push(y);
      a > 0 && Ue.distance(v.line.source, v.line.target) <= w + b && (m = !0);
    }
    return (p && (h.shift(), h[0] instanceof Array && h.unshift(h[0][0])), m && h.pop(), h);
  }
  function Nc(e) {
    const t = e.length;
    if (t === 0) return [];
    if (t <= 1) return [!0];
    const n = [];
    let r = null,
      o = !0;
    for (let i = 0; i < t; i++) {
      const s = e[i].edge.source,
        a = e[i].edge.target;
      if (i === 0)
        if (t > 2) {
          const l = Fd(e, 0);
          l === null ? (o = !0) : (o = l === a);
        } else o = [e[1].edge.source, e[1].edge.target].includes(a);
      else s === a ? (o = !0) : (o = r === s);
      (n.push(o), (r = o ? a : s));
    }
    return n;
  }
  function Fd(e, t) {
    const n = e[t],
      r = e[t + 1],
      o = [n.edge.source, n.edge.target].sort(),
      i = [r.edge.source, r.edge.target].sort();
    if (o[0] === o[1]) return o[0];
    if (i[0] === i[1]) return i[0];
    if (n.edgeId === r.edgeId || (o[0] === i[0] && o[1] === i[1])) {
      if (t >= e.length - 2) return null;
      {
        const s = Fd(e, t + 1);
        return s === null ? null : s === o[1] ? o[0] : o[1];
      }
    } else return i.includes(o[1]) ? o[1] : o[0];
  }
  function Lc(e, t, n, r) {
    const o = r ? e.source : e.target,
      i = e.curve;
    if (i) {
      let s = t / i.circle.radius;
      return (
        i.theta > 0 && (s *= -1),
        r || (s *= -1),
        Ee.fromObject(Rn(r ? e.line.source : e.line.target, i.circle.center, s))
      );
    } else {
      let s, a;
      if (
        (r
          ? ((s = e.line.target), (a = e.line.source))
          : ((s = e.line.source), (a = e.line.target)),
        n[o])
      ) {
        const l = ji(s, a, Ee.fromObject(n[o]), t);
        return l === null ? s : l;
      } else return s;
    }
  }
  function sw(e, t, n) {
    let r = null;
    if (e.loop || t.loop) r = null;
    else if (e.curve)
      if (t.curve) {
        if (e.line.target.isEqualTo(t.line.source)) return e.line.target.clone();
        r = ho(
          e.curve.circle.center,
          e.curve.circle.radius,
          t.curve.circle.center,
          t.curve.circle.radius,
          e.curve.center,
        );
      } else r = ew(t.line.target, t.line.source, e.curve.circle.center, e.curve.circle.radius, n);
    else if (t.curve)
      r = ji(e.line.source, e.line.target, t.curve.circle.center, t.curve.circle.radius);
    else {
      const o = Dc(e.line),
        i = Dc(t.line);
      (!isFinite(o) && !isFinite(i)) || Math.abs(o - i) < ow
        ? (r = null)
        : (r = Vn(e.line, t.line));
    }
    return r;
  }
  function Ro(e, t, n, r) {
    if (e.loop) {
      const o = ho(t, n, e.loop.center, e.loop.radius[0]);
      return o ? (r ? o[0] : o[1]) : null;
    } else
      return e.curve
        ? ho(t, n, e.curve.circle.center, e.curve.circle.radius, Ee.fromObject(e.curve.center))
        : ji(r ? e.line.source : e.line.target, r ? e.line.target : e.line.source, t, n);
  }
  function aw(e, t, n) {
    let r = n.origin,
      o = e.edge.source,
      i = e.edge.target,
      s = n.curve;
    const a = n.loop;
    a
      ? (r = n.position)
      : t ||
        ((r = Q0(r)),
        (o = e.edge.target),
        (i = e.edge.source),
        s && (s = Ri(st({}, s), { theta: -s.theta })));
    const l = je.fromLinePosition(r);
    return { edgeId: e.edgeId, source: o, target: i, line: l, direction: t, curve: s, loop: a };
  }
  function Dc(e) {
    return (e.target.y - e.source.y) / (e.target.x - e.source.x);
  }
  function $c(e, t, n) {
    const { radius: r, center: o } = Se(t.loop, 'Loop of edge parameter'),
      [i, s] = r,
      a = ho(e, n, o, r[0]);
    let [l, u] = a ? a.reverse() : [t.line.source, t.line.target];
    const f = Js(t);
    f || ([l, u] = [u, l]);
    const c = l,
      d = u,
      h = Ee.fromObject(c).subtract(o).angleDegree();
    let p = (Ee.fromObject(d).subtract(o).angleDegree() + 360 - h) % 360 >= 180;
    return ((p = f ? p : !p), [c, d, `A ${i} ${s} 0 ${p ? 1 : 0} ${f ? 1 : 0} ${d.x} ${d.y}`]);
  }
  function Js(e) {
    return e.loop ? (e.direction ? e.loop.isClockwise : !e.loop.isClockwise) : !0;
  }
  function ds(e, t, n, r, o, i, s) {
    const a = Ot({});
    (be(
      () => new Set(Object.keys(e.value)),
      (u, f) => {
        f || (f = new Set([]));
        for (const c of u) f.has(c) || lw(e, a, c, !1, t, o);
        for (const c of f) u.has(c) || (n.delete(c), r.delete(c), i?.(c, a[c]), delete a[c]);
      },
      { immediate: !0 },
    ),
      be(
        () => [...n],
        (u, f) => {
          const c = f ? u.filter((h) => !f.includes(h)) : u,
            d = f ? f.filter((h) => !u.includes(h)) : [];
          (c.forEach((h) => {
            const p = a[h];
            p && !p.selected && (p.selected = !0);
          }),
            d.forEach((h) => {
              const p = a[h];
              p && p.selected && (p.selected = !1);
            }));
        },
        { immediate: !0 },
      ),
      be(
        () => [...r],
        (u, f) => {
          const c = u.filter((h) => !f.includes(h)),
            d = f.filter((h) => !u.includes(h));
          (c.forEach((h) => {
            const p = a[h];
            p && !p.hovered && (p.hovered = !0);
          }),
            d.forEach((h) => {
              const p = a[h];
              p && p.hovered && (p.hovered = !1);
            }));
        },
      ));
    const l = B(() => {
      const u = s ? s() : Object.values(a);
      return t.zOrder.enabled ? cw(u, t.zOrder, r, n) : u;
    });
    return { states: a, zOrderedList: l };
  }
  function lw(e, t, n, r, o, i) {
    const s = {
      id: n,
      selected: r,
      hovered: !1,
      selectable: B(() => (e.value[n] ? Q.value(o.selectable, e.value[n]) : L(s.selectable))),
      zIndex: B(() => (e.value[n] ? Q.value(o.zOrder.zIndex, e.value[n]) : L(s.zIndex))),
    };
    ((t[n] = s), i(e, n, t[n]));
  }
  function cw(e, t, n, r) {
    return t.bringToFrontOnHover && t.bringToFrontOnSelected
      ? e.sort((o, i) => {
          const s = n.has(o.id),
            a = n.has(i.id);
          if (s != a) return s ? 1 : -1;
          const l = r.has(o.id),
            u = r.has(i.id);
          return l != u ? (l ? 1 : -1) : o.zIndex - i.zIndex;
        })
      : t.bringToFrontOnHover
        ? e.sort((o, i) => {
            const s = n.has(o.id),
              a = n.has(i.id);
            return s != a ? (s ? 1 : -1) : o.zIndex - i.zIndex;
          })
        : t.bringToFrontOnSelected
          ? e.sort((o, i) => {
              const s = r.has(o.id),
                a = r.has(i.id);
              return s != a ? (s ? 1 : -1) : o.zIndex - i.zIndex;
            })
          : e.sort((o, i) => o.zIndex - i.zIndex);
  }
  function uw(e) {
    return typeof btoa === void 0
      ? Buffer.from(e).toString('base64').replaceAll('=', '')
      : btoa(e).replaceAll('=', '');
  }
  function fw() {
    return { markers: Ot({}), referenceCount: {} };
  }
  function dw(e) {
    const { markers: t, referenceCount: n } = e;
    function r(a, l) {
      var u;
      const f = (u = n[a]) != null ? u : 0;
      ((n[a] = f + 1), f || (t[a] = l));
    }
    function o(a) {
      var l;
      const u = (l = n[a]) != null ? l : 0;
      u && (u - 1 === 0 ? (delete t[a], delete n[a]) : (n[a] = u - 1));
    }
    function i(a) {
      a && o(a);
    }
    function s(a, l, u, f, c) {
      if (a.type === 'none') {
        i(u);
        return;
      }
      if (a.type === 'custom') return (i(u), a.customId);
      const d = hw(a, l, f),
        h = pw(d, c);
      return (h === u || (i(u), r(h, d)), h);
    }
    return { makeMarker: s, clearMarker: i };
  }
  function hw(e, t, n) {
    var r;
    return Ri(st({}, e), { color: (r = e.color) != null ? r : n, isSource: t });
  }
  function pw(e, t) {
    const n = uw(e.color),
      r = e.isSource ? 'L' : 'R',
      o = e.units === 'strokeWidth' ? 'rel' : 'abs';
    return `marker_${t}_${e.type}_${e.width}_${e.height}_${e.margin}_${e.offset}_${n}_${r}_${o}`;
  }
  function hs(e, t, n) {
    return { objects: e, selected: t, hovered: n };
  }
  const Ud = Symbol('states'),
    gw = {
      type: 'none',
      width: 0,
      height: 0,
      margin: 0,
      offset: 0,
      units: 'strokeWidth',
      color: null,
    };
  function vw(e, t, n, r, o, i, s, a) {
    const l = Ot({}),
      u = In({});
    Rt(() => {
      const y = Object.fromEntries(Object.keys(e.objects.value).map((x) => [x, {}]));
      (Object.entries(t.objects.value).forEach(([x, E]) => {
        ((y != null && y[E.source]) || (y[E.source] = {}),
          (y != null && y[E.target]) || (y[E.target] = {}),
          (y[E.source][x] = E.target),
          (y[E.target][x] = E.source));
      }),
        Bo(u, y));
    });
    const { states: f, zOrderedList: c } = ds(
        e.objects,
        r.node,
        e.selected,
        e.hovered,
        (y, x, E) => {
          bw(y, x, E, r.node, u, o, i);
        },
        (y, x) => {
          const E = o.nodes;
          delete E[y];
        },
      ),
      d = U0(),
      h = V0(e.objects, t.objects, r),
      p = J([]),
      { states: m, zOrderedList: g } = ds(
        t.objects,
        r.edge,
        t.selected,
        t.hovered,
        (y, x, E) => {
          xw(y, x, E, r.edge, s, f, h, o, a, d);
        },
        (y, x) => {
          var E;
          (E = x.stopWatchHandle) == null || E.call(x);
        },
        () => p.value,
      );
    (Rt(() => {
      p.value = Ew(h.edgeGroups, m);
    }),
      be(h.edgeGroups, (y) => Cw(l, h, r), { immediate: !0 }));
    const { states: v, zOrderedList: b } = ds(
        n.objects,
        r.path,
        n.selected,
        n.hovered,
        (y, x, E) => {
          const C = E;
          ((C.clickable = B(() => (y.value[x] ? Q.value(r.path.clickable, y.value[x]) : !1))),
            (C.hoverable = B(() => (y.value[x] ? Q.value(r.path.hoverable, y.value[x]) : !1))),
            (C.path = y.value[x]),
            (C.edges = zc(C.path, t)),
            (C.directions = Nc(C.edges)),
            (C.stopWatchHandle = be(
              () => y.value[x].edges,
              () => {
                ((C.path = y.value[x]), (C.edges = zc(C.path, t)), (C.directions = Nc(C.edges)));
              },
            )));
        },
        (y, x) => {
          var E;
          (E = x.stopWatchHandle) == null || E.call(x);
        },
      ),
      w = {
        nodeStates: f,
        edgeStates: m,
        edgeGroupStates: h,
        summarizedEdgeStates: l,
        pathStates: v,
        layouts: o,
        nodeZOrderedList: c,
        edgeZOrderedList: g,
        pathZOrderedList: b,
      };
    return (Bt(Ud, w), w);
  }
  function mw(e) {
    return e.summarized;
  }
  function on() {
    return Se(rt(Ud), 'states');
  }
  function yw(e, t, n, r) {
    return n && r.hover ? Q.values(r.hover, e) : Hd(e, t, r);
  }
  function Hd(e, t, n) {
    return t && n.selected ? Q.values(n.selected, e) : Q.values(n.normal, e);
  }
  function bw(e, t, n, r, o, i, s) {
    var a, l;
    (!i.nodes[t] &&
      (a = s.nodes) != null &&
      a[t] &&
      (i.nodes[t] = st({}, (l = s.nodes) == null ? void 0 : l[t])),
      (n.shape = B(() => (e.value[t] ? yw(e.value[t], n.selected, n.hovered, r) : L(n.shape)))),
      (n.staticShape = B(() => (e.value[t] ? Hd(e.value[t], n.selected, r) : L(n.staticShape)))),
      (n.label = B(() => (e.value[t] ? Q.values(r.label, e.value[t]) : L(n.label)))),
      (n.labelText = B(() => {
        var u, f;
        return r.label.text instanceof Function
          ? L(n.label).text
          : e.value[t]
            ? (f = (u = e.value[t]) == null ? void 0 : u[L(n.label).text]) != null
              ? f
              : ''
            : L(n.labelText);
      })),
      (n.draggable = B(() => (e.value[t] ? Q.value(r.draggable, e.value[t]) : L(n.draggable)))),
      (n.oppositeNodeIds = en(o, t)),
      (n.oppositeNodes = B(() =>
        Object.entries(n.oppositeNodeIds).reduce((u, f) => {
          const [c, d] = f,
            h = i.nodes[d];
          return (h && (u[c] = { nodeId: d, pos: st({}, h) }), u);
        }, {}),
      )));
  }
  function ww(e, t, n, r) {
    return t
      ? Q.values(r.selected, e)
      : n && r.hover
        ? Q.values(r.hover, e)
        : Q.values(r.normal, e);
  }
  function jc(e) {
    return e.type === 'none' ? gw : e;
  }
  function xw(e, t, n, r, o, i, s, a, l, u) {
    const { makeMarker: f, clearMarker: c } = dw(o);
    (Object.assign(n, {
      origin: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } },
      labelPosition: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } },
      position: { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } },
    }),
      (n.label = B(() => (e.value[t] ? Q.values(r.label, e.value[t]) : L(n.label)))));
    const d = B(() => {
      const v = e.value[t],
        b = ww(v, n.selected, n.hovered, r);
      (isNaN(+b.width) &&
        (console.warn(
          '[v-network-graph] Edge width is invalid value. id=[%s] value=[%s]',
          t,
          b.width,
        ),
        (b.width = 1)),
        (b.color === void 0 || b.color === null) &&
          (console.warn(
            '[v-network-graph] Edge color is invalid value. id=[%s] value=[%s]',
            t,
            b.color,
          ),
          (b.color = '#000000')));
      let w = Q.value(r.normal.width, v);
      isNaN(+w) && (w = 1);
      const y = jc(Q.values(r.marker.source, [v, b])),
        x = jc(Q.values(r.marker.target, [v, b]));
      return { stroke: b, normalWidth: w, source: y, target: x };
    });
    n.line = d;
    const h = en(s.edgeLayoutPoints, t),
      p = en(s.summarizedEdges, t),
      m = Rt(() => {
        var v, b, w, y, x, E, C;
        const P = e.value[t];
        if (!P) return;
        const M = (v = i[P.source]) == null ? void 0 : v.staticShape,
          A = (b = i[P.target]) == null ? void 0 : b.staticShape;
        if (!M || !A) return;
        const j = (w = a.nodes[P?.source]) != null ? w : { x: 0, y: 0 },
          R = (y = a.nodes[P?.target]) != null ? y : { x: 0, y: 0 },
          V = Z0(h.value, (x = p.value) != null ? x : !1, j, R, l.value, r.keepOrder),
          [re, ne] = tw(j, R, M, A),
          X = l.value;
        n.labelPosition = qs(V, re * X, ne * X);
        let le = 0,
          te = 0;
        const Oe = d.value;
        if (Oe.source.type !== 'none') {
          const we = Oe.source;
          ((le = we.margin + we.width), we.units === 'strokeWidth' && (le *= Oe.normalWidth));
        }
        if (Oe.target.type !== 'none') {
          const we = Oe.target;
          ((te = we.margin + we.width), we.units === 'strokeWidth' && (te *= Oe.normalWidth));
        }
        r.margin && ((le += r.margin), (te += r.margin));
        const qe = !!r.margin || Oe.source.type !== 'none' || Oe.target.type !== 'none';
        if (P.source === P.target) {
          n.origin = ui(j, R);
          const we = Q.values(r.selfLoop, P),
            [Ie, Ye] = Sw(
              j,
              M,
              we,
              qe,
              le,
              te,
              (C = (E = h.value) == null ? void 0 : E.pointInGroup) != null ? C : 0,
              X,
            );
          ((n.position = Ie), (n.loop = Ye), (n.curve = void 0));
          return;
        } else n.loop = void 0;
        if ((qe && ((le += re), (te += ne)), r.type === 'straight' || p.value))
          ((n.origin = V),
            (n.curve = void 0),
            le === 0 && te === 0
              ? (n.position = n.origin)
              : (n.position = qs(n.origin, le * X, te * X)));
        else {
          n.origin = ui(j, R);
          const we = h.value ? h.value.groupWidth / 2 - h.value.pointInGroup : 0,
            [Ie, Ye] = _w(n.origin, V, we, le * X, te * X);
          ((n.position = Ie), (n.curve = Ye));
        }
      }),
      g = Rt(() => {
        e.value[t] &&
          ((n.sourceMarkerId = f(d.value.source, !0, n.sourceMarkerId, d.value.stroke.color, u)),
          (n.targetMarkerId = f(d.value.target, !1, n.targetMarkerId, d.value.stroke.color, u)));
      });
    n.stopWatchHandle = () => {
      (m(), g(), c(n.sourceMarkerId), c(n.targetMarkerId));
    };
  }
  function Ew(e, t) {
    return Object.entries(e)
      .map(([n, r]) => {
        var o;
        return r.summarize
          ? {
              id: (o = Object.keys(r.edges)[0]) != null ? o : n,
              summarized: !0,
              key: n,
              group: r,
              zIndex: Object.keys(r.edges)
                .map((i) => {
                  var s, a;
                  return (a = (s = t[i]) == null ? void 0 : s.zIndex) != null ? a : 0;
                })
                .reduce((i, s) => Math.max(i, s)),
            }
          : Object.entries(r.edges).map(([i, s]) => {
              var a, l;
              return {
                id: i,
                summarized: !1,
                key: i,
                edge: s,
                zIndex: (l = (a = t[i]) == null ? void 0 : a.zIndex) != null ? l : 0,
              };
            });
      })
      .flat();
  }
  function _w(e, t, n, r, o) {
    const i = je.fromLinePosition(e),
      s = je.fromLinePosition(t),
      a = J0(t),
      [l, u] = nw(i.source, i.target, a);
    let f, c;
    if (u === 0) return [e, c];
    if (n === 0) return (r === 0 && o === 0 ? (f = e) : (f = qs(e, r, o)), [f, c]);
    const d = je.fromVectors(l, a),
      h = Er(je.fromVectors(l, i.source), d);
    if (r === 0 && o === 0) f = e;
    else {
      let v = r / u,
        b = o / u;
      (h > 0 && ((v *= -1), (b *= -1)), (f = ui(Rn(i.source, l, v), Rn(i.target, l, -b))));
      let w = Er(je.fromVectors(l, i.source), je.fromVectors(l, i.target)),
        y = Er(je.fromPositions(l, f.p1), je.fromPositions(l, f.p2));
      if ((h * w < 0 && ((w = Gs(w)), h * y < 0 && (y = Gs(y))), w * y < 0)) {
        const x = a.clone().add(s.v.normalize().multiplyScalar(0.5));
        return ((f = ui(a, x)), [f, c]);
      }
    }
    const [p, m] = X0(f),
      g = Xs(p, l, m, h).map((v) => v.toObject());
    return ((c = { center: a, theta: h, circle: { center: l, radius: u }, control: g }), [f, c]);
  }
  function Sw(e, t, n, r, o, i, s, a) {
    const l = a,
      u = (n.radius + s / 2) * l,
      f = n.offset * l + u,
      c = (n.angle - 90) * (Math.PI / 180),
      d = Ee.fromObject({ x: e.x + f * Math.cos(c), y: e.y + f * Math.sin(c) }),
      h = n.isClockwise;
    let p, m;
    if (r) {
      const b = ho(d, u, Ee.fromObject(e), hr(t) * l);
      if (b) {
        [p, m] = b;
        let w = 1;
        if ((h || (([p, m] = [m, p]), (w = -1)), o !== 0 || i !== 0)) {
          const y = ((o * l) / u) * w,
            x = ((i * l) / u) * w;
          ((p = Rn(p, d, y)), (m = Rn(m, d, -x)));
        }
      }
    }
    if (p === void 0 || m === void 0) {
      const b = Ee.fromObject(e).subtract(d).normalize().multiplyScalar(u);
      let w = 1 * (Math.PI / 180);
      (h || (w *= -1), (p = d.clone().add(ci(b, w))), (m = d.clone().add(ci(b, -w))));
    }
    const g = Ee.fromObject(p).subtract(d).angleDegree(),
      v = (Ee.fromObject(m).subtract(d).angleDegree() + 360 - g) % 360 >= 180;
    return [
      { p1: p, p2: m },
      { center: d, radius: [u, u], isLargeArc: h ? v : !v, isClockwise: h },
    ];
  }
  function Cw(e, t, n) {
    const r = t.edgeGroups;
    (Object.entries(r)
      .filter(([o, i]) => i.summarize && !(o in e))
      .forEach(([o, i]) => {
        const s = { stroke: void 0 };
        ((s.stroke = B(() => Q.values(n.edge.summarized.stroke, i.edges))), (e[o] = s));
      }),
      Object.keys(e).forEach((o) => {
        var i;
        ((i = t.edgeGroups[o]) != null && i.summarize) || delete e[o];
      }));
  }
  function zc(e, t) {
    return e.edges.map((n) => ({ edgeId: n, edge: t.objects.value[n] })).filter((n) => n.edge);
  }
  class Qr {
    static valueOf(t) {
      return Array.from(t.values());
    }
  }
  const Tw = 3,
    Ow = 6,
    Vd = 500;
  function Fo(e) {
    return e === 'touch' ? Ow : Tw;
  }
  function Ka(e, t, n, r) {
    let o = e.get(t);
    if (o) o.id !== n && (o = void 0);
    else {
      const a = Array.from(e.entries()).find(([l, u]) => u.id === n);
      if (a) {
        const [l, u] = a;
        (e.delete(l), (o = u));
      }
    }
    let i, s;
    return (([o, i, s] = Zd(o, r, n)), e.set(t, o), [i, s]);
  }
  function Zd(e, t, n) {
    const r = Date.now();
    e && r - e.lastTime <= Vd
      ? (e.count++, (e.lastTime = r))
      : (e = { count: 1, lastTime: r, id: n });
    const o = {
      view: window,
      screenX: t.screenX,
      screenY: t.screenY,
      clientX: t.clientX,
      clientY: t.clientY,
      ctrlKey: t.ctrlKey,
      shiftKey: t.shiftKey,
      altKey: t.altKey,
      metaKey: t.metaKey,
      button: t.button,
      buttons: t.buttons,
      detail: e.count,
    };
    let i, s;
    return (
      t instanceof PointerEvent
        ? (Object.assign(o, {
            pointerId: t.pointerId,
            width: t.width,
            height: t.height,
            pressure: t.pressure,
            tangentialPressure: t.tangentialPressure,
            tiltX: t.tiltX,
            tiltY: t.tiltY,
            twist: t.twist,
            pointerType: t.pointerType,
            isPrimary: t.isPrimary,
          }),
          (i = new PointerEvent('click', o)),
          e.count === 2 && (s = new PointerEvent('dblclick', o)))
        : ((i = new MouseEvent('click', o)), e.count === 2 && (s = new MouseEvent('dblclick', o))),
      [e, i, s]
    );
  }
  function qa(e) {
    const t = Date.now();
    Array.from(e.entries())
      .filter(([n, r]) => t - r.lastTime > Vd)
      .map(([n, r]) => e.delete(n));
  }
  function Pw(e, t, n, r, o, i, s) {
    const a = {
        pointers: new Map(),
        follow: { followedPointerId: -1, nodeBasePositions: {} },
        hoveredNodesPre: new Set(),
        clicks: new Map(),
      },
      l = { pointermove: h, pointerup: m, pointercancel: p };
    function u(y) {
      const x = a.follow.followedPointerId === y.pointerId,
        E = o.has(y.nodeId),
        C = !(y.pointerId in a.pointers);
      if ((x && C) || (x && !E)) {
        const P = Qr.valueOf(a.pointers).find((M) => o.has(M.nodeId));
        if (!P) {
          a.follow = { followedPointerId: -1, nodeBasePositions: {} };
          return;
        }
        ((y = P), (a.follow.followedPointerId = y.pointerId));
      } else {
        const P = a.pointers.get(a.follow.followedPointerId);
        if (!P) {
          a.follow = { followedPointerId: -1, nodeBasePositions: {} };
          return;
        }
        y = P;
      }
      if (x || E) {
        const P = Qr.valueOf(a.pointers).map((M) => M.nodeId);
        ((a.follow.nodeBasePositions = Object.fromEntries(
          Array.from(o)
            .filter((M) => !P.includes(M))
            .filter((M) => {
              var A;
              return (A = e[M]) == null ? void 0 : A.draggable;
            })
            .map((M) => [M, ps(t.nodes, M)]),
        )),
          (y.dragBasePosition = st({}, y.latestPosition)),
          (y.nodeBasePosition = ps(t.nodes, y.nodeId)));
      }
    }
    (be(o, (y) => {
      const x = a.pointers.get(a.follow.followedPointerId);
      (x && u(x),
        y.size > 0 && n.selectionMode.value !== 'node'
          ? (n.selectionMode.value = 'node')
          : y.size === 0 &&
            n.selectionMode.value === 'node' &&
            (n.selectionMode.value = 'container'));
    }),
      be(n.selectionMode, (y) => {
        y !== 'node' && o.clear();
      }));
    function f(y, x) {
      const E = y.dragBasePosition.x - x.pageX,
        C = y.dragBasePosition.y - x.pageY,
        P =
          a.follow.followedPointerId == y.pointerId
            ? st({ [y.nodeId]: y.nodeBasePosition }, a.follow.nodeBasePositions)
            : { [y.nodeId]: y.nodeBasePosition },
        M = i.value;
      return Object.fromEntries(
        Object.entries(P).map(([A, j]) => [A, { x: j.x - E / M, y: j.y - C / M }]),
      );
    }
    function c(y, x) {
      var E, C;
      if (x.isTrusted || (x.shiftKey && !['container', 'node'].includes(n.selectionMode.value)))
        return;
      n.selectionMode.value = 'node';
      const P = (C = (E = e[y]) == null ? void 0 : E.selectable) != null ? C : !1;
      if (P) {
        const M = Qr.valueOf(a.pointers).filter((A) => o.has(A.nodeId)).length > 0;
        x.shiftKey || M
          ? o.has(y)
            ? o.delete(y)
            : (typeof P == 'number' && o.size >= P) || o.add(y)
          : o.has(y) || (o.clear(), o.add(y));
      }
      s.emit('node:click', { node: y, event: x });
    }
    function d(y, x) {
      x.isTrusted || s.emit('node:dblclick', { node: y, event: x });
    }
    function h(y) {
      var x;
      y.stopPropagation();
      const E = a.pointers.get(y.pointerId);
      if (!E) return;
      ((E.latestPosition = { x: y.pageX, y: y.pageY }), E.moveCounter++);
      const C = Fo(y.pointerType);
      if (E.moveCounter <= C || !((x = e[E.nodeId]) != null && x.draggable)) return;
      if (E.moveCounter === C + 1) {
        const M = f(E, {
          pointerId: E.pointerId,
          pageX: E.dragBasePosition.x,
          pageY: E.dragBasePosition.y,
        });
        s.emit('node:dragstart', M);
      }
      const P = f(E, y);
      s.emit('node:pointermove', P);
    }
    function p(y) {
      y.stopPropagation();
      let x = a.pointers.get(y.pointerId);
      if (x) {
        for (x of a.pointers.values()) {
          const E = x.nodeId,
            C = Fo(y.pointerType);
          if (x.moveCounter > C) {
            const P = f(x, {
              pointerId: x.pointerId,
              pageX: x.latestPosition.x,
              pageY: x.latestPosition.y,
            });
            s.emit('node:dragend', P);
          }
          s.emit('node:pointerup', { node: E, event: y });
        }
        (a.pointers.clear(),
          (a.follow = { followedPointerId: -1, nodeBasePositions: {} }),
          St(l).forEach(([E, C]) => {
            document.removeEventListener(E, C);
          }),
          (n.viewMode.value = 'default'));
      }
    }
    function m(y) {
      var x, E, C;
      y.stopPropagation();
      const P = a.pointers.get(y.pointerId);
      if (!P) return;
      a.pointers.delete(y.pointerId);
      const M = P.nodeId,
        A = Fo(y.pointerType),
        j = P.moveCounter > A;
      if (j) {
        if ((x = e[P.nodeId]) != null && x.draggable) {
          const R = f(P, y);
          (s.emit('node:dragend', R), s.emit('node:pointerup', { node: M, event: y }));
        }
      } else s.emit('node:pointerup', { node: M, event: y });
      if (!j) {
        const [R, V] = Ka(a.clicks, P.pointerId, M, y);
        ((E = P.eventTarget) == null || E.dispatchEvent(R),
          V && ((C = P.eventTarget) == null || C.dispatchEvent(V)));
      }
      (a.pointers.size === 0
        ? ((a.follow = { followedPointerId: -1, nodeBasePositions: {} }),
          St(l).forEach(([R, V]) => {
            document.removeEventListener(R, V);
          }),
          qa(a.clicks),
          (n.viewMode.value = 'default'))
        : u(P),
        r.clear(),
        a.hoveredNodesPre.forEach(r.add, r));
    }
    function g(y, x) {
      if (x.button == 2 || (x.stopPropagation(), !['default', 'node'].includes(n.viewMode.value)))
        return;
      a.pointers.size == 0 &&
        ((n.viewMode.value = 'node'),
        St(l).forEach(([C, P]) => {
          document.addEventListener(C, P);
        }));
      const E = {
        pointerId: x.pointerId,
        nodeId: y,
        moveCounter: 0,
        nodeBasePosition: ps(t.nodes, y),
        dragBasePosition: { x: x.pageX, y: x.pageY },
        latestPosition: { x: x.pageX, y: x.pageY },
        eventTarget: x.currentTarget,
      };
      (a.pointers.set(x.pointerId, E),
        o.has(y) &&
          (a.follow.followedPointerId < 0
            ? ((a.follow.followedPointerId = x.pointerId), u(E))
            : delete a.follow.nodeBasePositions[E.nodeId]),
        s.emit('node:pointerdown', { node: y, event: x }));
    }
    function v(y, x) {
      (a.hoveredNodesPre.add(y),
        !(a.pointers.size > 0) && (r.add(y), s.emit('node:pointerover', { node: y, event: x })));
    }
    function b(y, x) {
      (a.hoveredNodesPre.delete(y),
        !(a.pointers.size > 0) && (r.delete(y), s.emit('node:pointerout', { node: y, event: x })));
    }
    function w(y, x) {
      (x.stopPropagation(), s.emit('node:contextmenu', { node: y, event: x }));
    }
    return {
      handleNodePointerDownEvent: g,
      handleNodePointerOverEvent: v,
      handleNodePointerOutEvent: b,
      handleNodeClickEvent: c,
      handleNodeDoubleClickEvent: d,
      handleNodeContextMenu: w,
    };
  }
  function ps(e, t) {
    var n;
    const r = (n = e[t]) != null ? n : { x: 0, y: 0 };
    return st({}, r);
  }
  function Aw(e, t, n, r, o) {
    const i = { pointers: new Map(), pointerPeekCount: 0, clicks: new Map() },
      s = { pointerup: l, pointercancel: u };
    (be(r, (x) => {
      x.size > 0 && t.selectionMode.value !== 'edge'
        ? (t.selectionMode.value = 'edge')
        : x.size === 0 && t.selectionMode.value === 'edge' && (t.selectionMode.value = 'container');
    }),
      be(t.selectionMode, (x) => {
        x !== 'edge' && r.clear();
      }));
    function a(x, E) {
      if (E.button == 2 || (E.stopPropagation(), !['default', 'edge'].includes(t.viewMode.value)))
        return;
      (i.pointers.size == 0 &&
        ((t.viewMode.value = 'edge'),
        St(s).forEach(([P, M]) => {
          document.addEventListener(P, M);
        }),
        (i.pointerPeekCount = 0)),
        i.pointerPeekCount++);
      const C = { pointerId: E.pointerId, id: x, eventTarget: E.currentTarget };
      (i.pointers.set(E.pointerId, C), o.emit('edge:pointerdown', $t(x, E)));
    }
    function l(x) {
      var E, C;
      x.stopPropagation();
      const P = i.pointers.get(x.pointerId);
      if (!P) return;
      i.pointers.delete(x.pointerId);
      const M = P.id;
      o.emit('edge:pointerup', $t(M, x));
      const [A, j] = Ka(i.clicks, P.pointerId, M instanceof Array ? M.join(',') : M, x);
      ((E = P.eventTarget) == null || E.dispatchEvent(A),
        j && ((C = P.eventTarget) == null || C.dispatchEvent(j)),
        i.pointers.size === 0 &&
          ((i.pointerPeekCount = 0),
          St(s).forEach(([R, V]) => {
            document.removeEventListener(R, V);
          }),
          qa(i.clicks),
          (t.viewMode.value = 'default')));
    }
    function u(x) {
      if ((x.stopPropagation(), !!i.pointers.get(x.pointerId))) {
        for (const E of i.pointers.values()) {
          const C = E.id;
          o.emit('edge:pointerup', $t(C, x));
        }
        (i.pointers.clear(),
          (i.pointerPeekCount = 0),
          St(s).forEach(([E, C]) => {
            document.removeEventListener(E, C);
          }),
          o.emit('view:mode', 'default'));
      }
    }
    function f(x, E) {
      var C;
      if (E.isTrusted || (E.shiftKey && !['container', 'edge'].includes(t.selectionMode.value)))
        return;
      t.selectionMode.value = 'edge';
      const P = x instanceof Array ? x : [x],
        M =
          Qr.valueOf(i.pointers).filter((A) =>
            (A.id instanceof Array ? A.id : [A.id]).every((j) => r.has(j)),
          ).length > 0;
      if (x instanceof Array)
        P.find((A) => {
          var j;
          return (j = e[A]) == null ? void 0 : j.selectable;
        }) &&
          (E.shiftKey || M
            ? P.some((A) => r.has(A))
              ? P.forEach((A) => r.delete(A))
              : P.forEach((A) => {
                  var j;
                  const R = (j = e[A]) == null ? void 0 : j.selectable;
                  (typeof R == 'number' && r.size >= R) || r.add(A);
                })
            : (r.clear(), P.forEach((A) => r.add(A))));
      else {
        const A = (C = e[x]) == null ? void 0 : C.selectable;
        A &&
          (E.shiftKey || M
            ? r.has(x)
              ? r.delete(x)
              : (typeof A == 'number' && r.size >= A) || r.add(x)
            : r.has(x) || (r.clear(), r.add(x)));
      }
      o.emit('edge:click', $t(x, E));
    }
    function c(x, E) {
      E.isTrusted || o.emit('edge:dblclick', $t(x, E));
    }
    function d(x, E) {
      (n.add(x), o.emit('edge:pointerover', $t(x, E)));
    }
    function h(x, E) {
      (n.delete(x), o.emit('edge:pointerout', $t(x, E)));
    }
    function p(x, E) {
      (E.stopPropagation(), o.emit('edge:contextmenu', $t(x, E)));
    }
    function m(x, E) {
      if (E.button == 2 || (E.stopPropagation(), !['default', 'edge'].includes(t.viewMode.value)))
        return;
      (i.pointers.size == 0 &&
        ((t.viewMode.value = 'edge'),
        St(s).forEach(([P, M]) => {
          document.addEventListener(P, M);
        }),
        (i.pointerPeekCount = 0)),
        i.pointerPeekCount++);
      const C = { pointerId: E.pointerId, id: x, eventTarget: E.currentTarget };
      (i.pointers.set(E.pointerId, C), o.emit('edge:pointerdown', $t(x, E)));
    }
    function g(x, E) {
      (x.forEach((C) => n.add(C)), o.emit('edge:pointerover', $t(x, E)));
    }
    function v(x, E) {
      (x.forEach((C) => n.delete(C)), o.emit('edge:pointerout', $t(x, E)));
    }
    function b(x, E) {
      f(x, E);
    }
    function w(x, E) {
      c(x, E);
    }
    function y(x, E) {
      (E.stopPropagation(), o.emit('edge:contextmenu', $t(x, E)));
    }
    return {
      handleEdgePointerDownEvent: a,
      handleEdgePointerOverEvent: d,
      handleEdgePointerOutEvent: h,
      handleEdgeClickEvent: f,
      handleEdgeDoubleClickEvent: c,
      handleEdgeContextMenu: p,
      handleEdgesPointerDownEvent: m,
      handleEdgesPointerOverEvent: g,
      handleEdgesPointerOutEvent: v,
      handleEdgesClickEvent: b,
      handleEdgesDoubleClickEvent: w,
      handleEdgesContextMenu: y,
    };
  }
  function $t(e, t) {
    return e instanceof Array
      ? { edges: e, event: t, summarized: !0 }
      : { edge: e, edges: [e], event: t, summarized: !1 };
  }
  function Iw(e, t, n, r) {
    const o = { moveCounter: 0, pointerCounter: 0, clickState: void 0 },
      i = { pointermove: a, pointerup: l, pointercancel: l };
    function s(h) {
      ((o.moveCounter = 0),
        o.pointerCounter === 0 &&
          St(i).forEach(([p, m]) => {
            document.addEventListener(p, m, { passive: !0 });
          }),
        o.pointerCounter++);
    }
    function a(h) {
      o.moveCounter++;
    }
    function l(h) {
      if ((o.pointerCounter--, o.pointerCounter <= 0)) {
        ((o.pointerCounter = 0),
          St(i).forEach(([m, g]) => {
            document.removeEventListener(m, g);
          }));
        const p = Fo(h.pointerType);
        if (o.moveCounter <= p) {
          if (h.shiftKey && t.selectionMode.value !== 'container') return;
          t.selectionMode.value = 'container';
          const [m, g, v] = Zd(o.clickState, h, 'view');
          ((o.clickState = m), e.value.dispatchEvent(g), v && e.value.dispatchEvent(v));
        }
      }
    }
    function u(h) {
      h.isTrusted || (h.stopPropagation(), r.emit('view:click', { event: h }));
    }
    function f(h) {
      h.isTrusted || (h.stopPropagation(), r.emit('view:dblclick', { event: h }));
    }
    function c(h) {
      (r.emit('view:contextmenu', { event: h }),
        o.pointerCounter > 0 &&
          ((o.pointerCounter = 0),
          St(i).forEach(([p, m]) => {
            var g;
            (g = e.value) == null || g.removeEventListener(p, m);
          })));
    }
    const d = (h) => {
      h.preventDefault();
    };
    (mn(() => {
      const h = e.value;
      h &&
        (h.addEventListener('pointerdown', s, { passive: !0 }),
        h.addEventListener('click', u, { passive: !1 }),
        h.addEventListener('dblclick', f, { passive: !1 }),
        h.addEventListener('contextmenu', c, { passive: !1 }),
        n.value && h.addEventListener('wheel', d, { passive: !1 }));
    }),
      tr(() => {
        const h = e.value;
        h &&
          (h.removeEventListener('pointerdown', s),
          h.removeEventListener('click', u),
          h.removeEventListener('dblclick', f),
          h.removeEventListener('contextmenu', c),
          n.value && h.removeEventListener('wheel', d));
      }),
      be(n, (h, p) => {
        const m = e.value;
        !m ||
          h === p ||
          (h ? m.addEventListener('wheel', d, { passive: !1 }) : m.removeEventListener('wheel', d));
      }));
  }
  function Mw(e, t, n, r, o, i) {
    const s = { pointers: new Map(), pointerPeekCount: 0, clicks: new Map() };
    function a(v, b) {
      var w, y;
      return o.value
        ? { path: (y = (w = e[v]) == null ? void 0 : w.path) != null ? y : v, event: b }
        : { path: v, event: b };
    }
    const l = { pointerup: f, pointercancel: c };
    (be(r, (v) => {
      v.size > 0 && t.selectionMode.value !== 'path'
        ? (t.selectionMode.value = 'path')
        : v.size === 0 && t.selectionMode.value === 'path' && (t.selectionMode.value = 'container');
    }),
      be(t.selectionMode, (v) => {
        v !== 'path' && r.clear();
      }));
    function u(v, b) {
      var w;
      if (
        !((w = e[v]) != null && w.clickable) ||
        b.button == 2 ||
        (b.stopPropagation(), !['default', 'path'].includes(t.viewMode.value))
      )
        return;
      (s.pointers.size == 0 &&
        ((t.viewMode.value = 'path'),
        St(l).forEach(([x, E]) => {
          document.addEventListener(x, E);
        }),
        (s.pointerPeekCount = 0)),
        s.pointerPeekCount++);
      const y = { pointerId: b.pointerId, id: v, eventTarget: b.currentTarget };
      (s.pointers.set(b.pointerId, y), i.emit('path:pointerdown', a(v, b)));
    }
    function f(v) {
      var b, w;
      const y = s.pointers.get(v.pointerId);
      if (!y) return;
      (v.stopPropagation(), s.pointers.delete(v.pointerId));
      const x = y.id;
      i.emit('path:pointerup', a(x, v));
      const [E, C] = Ka(s.clicks, y.pointerId, x, v);
      ((b = y.eventTarget) == null || b.dispatchEvent(E),
        C && ((w = y.eventTarget) == null || w.dispatchEvent(C)),
        s.pointers.size === 0 &&
          ((s.pointerPeekCount = 0),
          St(l).forEach(([P, M]) => {
            document.removeEventListener(P, M);
          }),
          qa(s.clicks),
          (t.viewMode.value = 'default')));
    }
    function c(v) {
      if (s.pointers.get(v.pointerId)) {
        v.stopPropagation();
        for (const b of s.pointers.values()) {
          const w = b.id;
          i.emit('path:pointerup', a(w, v));
        }
        (s.pointers.clear(),
          (s.pointerPeekCount = 0),
          St(l).forEach(([b, w]) => {
            document.removeEventListener(b, w);
          }),
          i.emit('view:mode', 'default'));
      }
    }
    function d(v, b) {
      var w;
      (w = e[v]) != null && w.hoverable && (n.add(v), i.emit('path:pointerover', a(v, b)));
    }
    function h(v, b) {
      var w;
      (w = e[v]) != null && w.hoverable && (n.delete(v), i.emit('path:pointerout', a(v, b)));
    }
    function p(v, b) {
      var w, y, x;
      if (
        b.isTrusted ||
        !((w = e[v]) != null && w.clickable) ||
        (b.shiftKey && !['container', 'path'].includes(t.selectionMode.value))
      )
        return;
      t.selectionMode.value = 'path';
      const E = (x = (y = e[v]) == null ? void 0 : y.selectable) != null ? x : !1;
      if (E) {
        const C = Qr.valueOf(s.pointers).filter((P) => r.has(P.id)).length > 0;
        b.shiftKey || C
          ? r.has(v)
            ? r.delete(v)
            : (typeof E == 'number' && r.size >= E) || r.add(v)
          : r.has(v) || (r.clear(), r.add(v));
      }
      i.emit('path:click', a(v, b));
    }
    function m(v, b) {
      var w;
      b.isTrusted || ((w = e[v]) != null && w.clickable && i.emit('path:dblclick', a(v, b)));
    }
    function g(v, b) {
      var w;
      (w = e[v]) != null &&
        w.clickable &&
        (b.stopPropagation(), i.emit('path:contextmenu', a(v, b)));
    }
    return {
      handlePathPointerDownEvent: u,
      handlePathPointerOverEvent: d,
      handlePathPointerOutEvent: h,
      handlePathClickEvent: p,
      handlePathDoubleClickEvent: m,
      handlePathContextMenu: g,
    };
  }
  function kw(e) {
    return Qt(this, null, function* () {
      const t = yield (yield fetch(e)).blob();
      return new Promise((n, r) => {
        try {
          const o = new FileReader();
          ((o.onload = function () {
            n(this.result);
          }),
            o.readAsDataURL(t));
        } catch (o) {
          r(o);
        }
      });
    });
  }
  function Ys(e, t, n) {
    var r;
    const o = e.createSVGPoint();
    ((o.x = n.x), (o.y = n.y));
    const i = o.matrixTransform((r = t.getCTM()) == null ? void 0 : r.inverse());
    return { x: i.x, y: i.y };
  }
  function Rw(e, t, n) {
    const r = e.createSVGPoint();
    ((r.x = n.x), (r.y = n.y));
    const o = r.matrixTransform(t.getCTM());
    return { x: o.x, y: o.y };
  }
  function Wd(e, t, n) {
    var r;
    const o = e.cloneNode(!0),
      i = t.getBBox(),
      s = 1 / n,
      a = {
        x: Math.floor((i.x - 10) * s),
        y: Math.floor((i.y - 10) * s),
        width: Math.ceil((i.width + 20) * s),
        height: Math.ceil((i.height + 20) * s),
      };
    (o.setAttribute('width', a.width.toString()), o.setAttribute('height', a.height.toString()));
    const l = o.querySelector('.v-ng-viewport');
    (l.setAttribute('transform', `translate(${-a.x} ${-a.y}), scale(${s})`),
      l.removeAttribute('style'),
      o.setAttribute('viewBox', `0 0 ${a.width} ${a.height}`),
      o.removeAttribute('style'));
    const u = document.createNodeIterator(o, NodeFilter.SHOW_COMMENT);
    for (; u.nextNode(); ) {
      const f = u.referenceNode;
      (r = f.parentNode) == null || r.removeChild(f);
    }
    return o;
  }
  function Nw(e) {
    return Qt(this, null, function* () {
      let t = !1,
        n = e.getAttribute('href');
      if ((n || ((t = !0), (n = e.getAttribute('xlink:href'))), !(!n || n.startsWith('data:'))))
        try {
          const r = yield kw(n);
          e.setAttribute(t ? 'xlink:href' : 'href', r);
        } catch {
          console.warn('Image download failed.', n);
          return;
        }
    });
  }
  function Lw(e, t, n) {
    return Qt(this, arguments, function* (r, o, i, s = {}) {
      const a = Wd(r, o, i);
      if (s.embedImages) {
        const l = Array.from(a.querySelectorAll('image')).map((u) => Nw(u));
        yield Promise.all(l);
      }
      return a;
    });
  }
  function Dw(e, t, n, r, o, i) {
    const s = B(() => !!i.node.selectable && i.view.boxSelectionEnabled),
      a = B(() => t.viewMode.value === 'box-selection'),
      l = J(),
      u = J(),
      f = {
        pointers: new Set(),
        points: new Map(),
        startPoint: null,
        selectedNodesAtSelectStarted: new Set(),
        selectionType: 'append',
        options: {
          stopTrigger: 'pointerup',
          selectionType: 'append',
          selectionTypeWithShiftKey: 'same',
        },
      },
      c = m0(
        () => {
          $w(
            Se(e.value, 'container'),
            Se(l.value, 'viewport'),
            u,
            n.nodes,
            r,
            o,
            f.selectedNodesAtSelectStarted,
            f.selectionType,
          );
        },
        50,
        { maxWait: 100 },
      ),
      d = new jw(e, p, m, g, h, v);
    function h(E) {
      if (f.options.stopTrigger !== 'click' || f.pointers.size > 0) return;
      const C = { x: E.offsetX, y: E.offsetY };
      (f.startPoint && Ee.fromObject(f.startPoint).distance(C) > 10) || x();
    }
    function p(E) {
      E.stopPropagation();
      const C = { x: E.offsetX, y: E.offsetY };
      (f.pointers.size === 0 &&
        ((f.startPoint = C),
        d.activate(),
        f.selectedNodesAtSelectStarted.clear(),
        o.forEach((P) => f.selectedNodesAtSelectStarted.add(P)),
        f.options.selectionTypeWithShiftKey === 'same'
          ? (f.selectionType = f.options.selectionType)
          : (f.selectionType = E.shiftKey
              ? f.options.selectionTypeWithShiftKey
              : f.options.selectionType)),
        f.pointers.has(E.pointerId) || f.pointers.add(E.pointerId),
        f.points.set(E.pointerId, C),
        b());
    }
    function m(E) {
      if ((f.pointers.delete(E.pointerId), f.pointers.size === 1)) {
        const C = Se(e.value).getBoundingClientRect(),
          P = { x: E.x - C.x, y: E.y - C.y };
        f.startPoint = P;
      } else
        f.pointers.size === 0 &&
          (d.deactivate(),
          f.options.stopTrigger === 'pointerup' && x(),
          f.selectedNodesAtSelectStarted.clear());
      b();
    }
    function g(E) {
      const C = Se(e.value).getBoundingClientRect(),
        P = { x: E.x - C.x, y: E.y - C.y };
      (f.points.set(E.pointerId, P), b(), c());
    }
    function v(E) {
      E.key === 'Escape' && f.options.stopTrigger !== 'manual' && (E.stopPropagation(), x());
    }
    function b() {
      let E, C;
      const P = Array.from(f.pointers);
      if (P.length >= 2) {
        const M = P[0],
          A = P[P.length - 1];
        ((E = f.points.get(M)), (C = f.points.get(A)));
      } else if (f.startPoint && P.length === 1) {
        const M = P[0];
        ((E = f.startPoint), (C = f.points.get(M)));
      } else ((E = void 0), (C = void 0));
      E && C
        ? ((u.value = {
            pos: { x: Math.min(E.x, C.x), y: Math.min(E.y, C.y) },
            size: { width: Math.abs(C.x - E.x), height: Math.abs(C.y - E.y) },
          }),
          u.value.size.width === 0 && (u.value.size.width = 1),
          u.value.size.height === 0 && (u.value.size.height = 1))
        : u.value && (u.value = void 0);
    }
    const w = new zw(
      e,
      (E) => {
        s.value &&
          i.view.selection.detector(E) &&
          (y({ stop: 'manual', type: 'append', withShiftKey: 'invert' }), w.activate());
      },
      (E) => {
        s.value &&
          i.view.selection.detector(E) &&
          (f.pointers.size === 0 ? x() : (f.options.stopTrigger = 'pointerup'), w.deactivate());
      },
    );
    (be(s, (E) => {
      E ? w.register() : w.unregister();
    }),
      mn(() => {
        var E;
        ((l.value = (E = e.value) == null ? void 0 : E.querySelector('.v-ng-viewport')),
          s.value && w.register());
      }),
      tr(() => {
        (x(), s.value && w.unregister());
      }));
    function y(E = {}) {
      var C, P, M;
      ((f.options = {
        stopTrigger: (C = E.stop) != null ? C : 'pointerup',
        selectionType: (P = E.type) != null ? P : 'append',
        selectionTypeWithShiftKey: (M = E.withShiftKey) != null ? M : 'same',
      }),
        t.viewMode.value !== 'box-selection' &&
          ((t.viewMode.value = 'box-selection'), f.pointers.clear(), d.register()));
    }
    function x() {
      t.viewMode.value === 'box-selection' && ((t.viewMode.value = 'default'), d.unregister());
    }
    return { isBoxSelectionMode: a, selectionBox: u, startBoxSelection: y, stopBoxSelection: x };
  }
  function $w(e, t, n, r, o, i, s, a) {
    if (!n.value) return;
    const l = n.value,
      u = Ys(e, t, l.pos),
      f = Ys(e, t, { x: l.pos.x + l.size.width, y: l.pos.y + l.size.height }),
      c = new Set(
        Object.entries(r)
          .filter(([d, h]) => u.x <= h.x && h.x <= f.x && u.y <= h.y && h.y <= f.y)
          .map(([d, h]) => d),
      );
    if (a === 'append')
      (i.forEach((d) => {
        c.has(d) || i.delete(d);
      }),
        c.forEach((d) => {
          var h, p;
          const m = (p = (h = o[d]) == null ? void 0 : h.selectable) != null ? p : !1;
          (m === !0 || (typeof m == 'number' && i.size < m)) && i.add(d);
        }));
    else {
      const d = new Set(s);
      (d.forEach((h) => {
        c.has(h) && d.delete(h);
      }),
        c.forEach((h) => {
          var p, m;
          if (!s.has(h)) {
            const g = (m = (p = o[h]) == null ? void 0 : p.selectable) != null ? m : !1;
            (g === !0 || (typeof g == 'number' && d.size < g)) && d.add(h);
          }
        }),
        i.clear(),
        d.forEach((h) => i.add(h)));
    }
  }
  class jw {
    constructor(t, n, r, o, i, s) {
      ((this._container = t),
        (this._handlePointerDownEvent = n),
        (this._handlePointerUpEvent = r),
        (this._handlePointerMoveEvent = o),
        (this._handleClickEvent = i),
        (this._handleKeyDownEvent = s),
        (this._ignoreEvent = (a) => a.stopPropagation()));
    }
    register() {
      const t = { capture: !0, passive: !1 },
        n = Se(this._container.value, 'container');
      (n.addEventListener('pointerdown', this._handlePointerDownEvent, t),
        n.addEventListener('click', this._handleClickEvent, t),
        n.addEventListener('pointerenter', this._ignoreEvent, t),
        n.addEventListener('pointerleave', this._ignoreEvent, t),
        document.addEventListener('keydown', this._handleKeyDownEvent, t));
    }
    activate() {
      const t = { capture: !0, passive: !1 };
      (document.addEventListener('pointermove', this._handlePointerMoveEvent, t),
        document.addEventListener('pointerup', this._handlePointerUpEvent, t));
    }
    deactivate() {
      const t = { capture: !0 };
      (document.removeEventListener('pointermove', this._handlePointerMoveEvent, t),
        document.removeEventListener('pointerup', this._handlePointerUpEvent, t));
    }
    unregister() {
      this.deactivate();
      const t = { capture: !0 };
      if (this._container.value) {
        const n = this._container.value;
        (n.removeEventListener('pointerdown', this._handlePointerDownEvent, t),
          n.removeEventListener('click', this._handleClickEvent, t),
          n.removeEventListener('pointerenter', this._ignoreEvent, t),
          n.removeEventListener('pointerleave', this._ignoreEvent, t),
          document.removeEventListener('keydown', this._handleKeyDownEvent, t));
      }
    }
  }
  class zw {
    constructor(t, n, r) {
      ((this._container = t),
        (this._handleKeyDownEvent = n),
        (this._handleKeyUpEvent = r),
        (this._preventDefault = (o) => {
          (o.stopPropagation(), o.preventDefault());
        }));
    }
    register() {
      document.addEventListener('keydown', this._handleKeyDownEvent, { capture: !0, passive: !0 });
    }
    activate() {
      (document.addEventListener('keyup', this._handleKeyUpEvent, { capture: !0, passive: !0 }),
        Se(this._container.value, 'container').addEventListener(
          'contextmenu',
          this._preventDefault,
          { passive: !1 },
        ));
    }
    deactivate() {
      (document.removeEventListener('keyup', this._handleKeyUpEvent, { capture: !0 }),
        this._container.value &&
          this._container.value.removeEventListener('contextmenu', this._preventDefault));
    }
    unregister() {
      (this.deactivate(),
        document.removeEventListener('keydown', this._handleKeyDownEvent, { capture: !0 }));
    }
  }
  const Kd = Symbol('mouseEventHandlers');
  function Bw(e, t, n, r, o, i, s, a, l, u, f, c, d, h, p, m) {
    const g = { selectionMode: J('container'), viewMode: J('default') };
    (s.size > 0
      ? (g.selectionMode.value = 'node')
      : a.size > 0
        ? (g.selectionMode.value = 'edge')
        : l.size > 0 && (g.selectionMode.value = 'path'),
      be(g.viewMode, (b) => {
        m.emit('view:mode', b);
      }),
      Iw(e, g, h, m));
    const v = st(
      st(
        st(
          st(
            {
              selectedNodes: s,
              hoveredNodes: u,
              selectedEdges: a,
              hoveredEdges: f,
              selectedPaths: l,
              hoveredPaths: c,
            },
            Pw(r, t, g, u, s, n, m),
          ),
          Aw(o, g, f, a, m),
        ),
        Mw(i, g, c, l, d, m),
      ),
      Dw(e, g, t, r, s, p),
    );
    return (Bt(Kd, v), v);
  }
  function xo() {
    return Se(rt(Kd), 'mouseEventHandlers');
  }
  function Fw(e) {
    return {
      all: (e = e || new Map()),
      on: function (t, n) {
        var r = e.get(t);
        r ? r.push(n) : e.set(t, [n]);
      },
      off: function (t, n) {
        var r = e.get(t);
        r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : e.set(t, []));
      },
      emit: function (t, n) {
        var r = e.get(t);
        (r &&
          r.slice().map(function (o) {
            o(n);
          }),
          (r = e.get('*')) &&
            r.slice().map(function (o) {
              o(t, n);
            }));
      },
    };
  }
  const qd = Symbol('emitter');
  function Uw() {
    const e = Fw();
    return (Bt(qd, e), e);
  }
  function Hw() {
    return Se(rt(qd), 'event emitter');
  }
  var Bc =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {};
  function Vw(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
  }
  var gs, Fc;
  function zi() {
    if (Fc) return gs;
    ((Fc = 1),
      (gs = {
        getGlobalThis: function () {
          if (typeof globalThis < 'u') return globalThis;
          if (typeof self < 'u') return self;
          if (typeof window < 'u') return window;
          if (typeof Bc < 'u') return Bc;
          if (typeof this < 'u') return this;
          throw new Error('Unable to locate global `this`');
        },
        extend: function (t, n) {
          t = t || {};
          for (var r in n) this.isObject(n[r]) ? (t[r] = this.extend(t[r], n[r])) : (t[r] = n[r]);
          return t;
        },
        isElement: function (t) {
          return (
            t instanceof HTMLElement ||
            t instanceof SVGElement ||
            t instanceof SVGSVGElement ||
            (t &&
              typeof t == 'object' &&
              t !== null &&
              t.nodeType === 1 &&
              typeof t.nodeName == 'string')
          );
        },
        isObject: function (t) {
          return Object.prototype.toString.call(t) === '[object Object]';
        },
        isNumber: function (t) {
          return !isNaN(parseFloat(t)) && isFinite(t);
        },
        getSvg: function (t) {
          var n, r;
          if (this.isElement(t)) n = t;
          else if (typeof t == 'string' || t instanceof String) {
            if (((n = document.querySelector(t)), !n))
              throw new Error('Provided selector did not find any elements. Selector: ' + t);
          } else throw new Error('Provided selector is not an HTML object nor String');
          if (n.tagName.toLowerCase() === 'svg') r = n;
          else if (n.tagName.toLowerCase() === 'object') r = n.contentDocument.documentElement;
          else if (n.tagName.toLowerCase() === 'embed') r = n.getSVGDocument().documentElement;
          else
            throw n.tagName.toLowerCase() === 'img'
              ? new Error(
                  'Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.',
                )
              : new Error('Cannot get SVG.');
          return r;
        },
        proxy: function (t, n) {
          return function () {
            return t.apply(n, arguments);
          };
        },
        getType: function (t) {
          return Object.prototype.toString
            .apply(t)
            .replace(/^\[object\s/, '')
            .replace(/\]$/, '');
        },
        mouseAndTouchNormalize: function (t, n) {
          if (t.clientX === void 0 || t.clientX === null)
            if (((t.clientX = 0), (t.clientY = 0), t.touches !== void 0 && t.touches.length)) {
              if (t.touches[0].clientX !== void 0)
                ((t.clientX = t.touches[0].clientX), (t.clientY = t.touches[0].clientY));
              else if (t.touches[0].pageX !== void 0) {
                var r = n.getBoundingClientRect();
                ((t.clientX = t.touches[0].pageX - r.left),
                  (t.clientY = t.touches[0].pageY - r.top));
              }
            } else
              t.originalEvent !== void 0 &&
                t.originalEvent.clientX !== void 0 &&
                ((t.clientX = t.originalEvent.clientX), (t.clientY = t.originalEvent.clientY));
        },
        touchNormalize: function (t, n, r) {
          if (t.touches !== void 0 && t.touches.length) {
            if (t.touches[r].clientX !== void 0)
              ((t.clientX = t.touches[r].clientX), (t.clientY = t.touches[r].clientY));
            else if (t.touches[r].pageX !== void 0) {
              var o = n.getBoundingClientRect();
              ((t.clientX = t.touches[r].pageX - o.left), (t.clientY = t.touches[r].pageY - o.top));
            }
          } else
            (t.clientX === void 0 || t.clientX === null) &&
              ((t.clientX = 0),
              (t.clientY = 0),
              t.originalEvent !== void 0 &&
                t.originalEvent.clientX !== void 0 &&
                ((t.clientX = t.originalEvent.clientX), (t.clientY = t.originalEvent.clientY)));
        },
        isDblClick: function (t, n) {
          if (t.detail === 2) return !0;
          if (n != null) {
            var r = t.timeStamp - n.timeStamp,
              o = Math.sqrt(
                Math.pow(t.clientX - n.clientX, 2) + Math.pow(t.clientY - n.clientY, 2),
              );
            return r < 250 && o < 10;
          }
          return !1;
        },
        now:
          Date.now ||
          function () {
            return new Date().getTime();
          },
        throttle: function (t, n, r) {
          var o = this,
            i,
            s,
            a,
            l = null,
            u = 0;
          r || (r = {});
          var f = function () {
            ((u = r.leading === !1 ? 0 : o.now()),
              (l = null),
              (a = t.apply(i, s)),
              l || (i = s = null));
          };
          return function () {
            var c = o.now();
            !u && r.leading === !1 && (u = c);
            var d = n - (c - u);
            return (
              (i = this),
              (s = arguments),
              d <= 0 || d > n
                ? (clearTimeout(l), (l = null), (u = c), (a = t.apply(i, s)), l || (i = s = null))
                : !l && r.trailing !== !1 && (l = setTimeout(f, d)),
              a
            );
          };
        },
        createRequestAnimationFrame: function (t) {
          var n = null;
          return (
            t !== 'auto' && t < 60 && t > 1 && (n = Math.floor(1e3 / t)),
            n === null ? window.requestAnimationFrame || e(33) : e(n)
          );
        },
        calculateDistance: function (t, n) {
          var r = t.x - n.x,
            o = t.y - n.y;
          return Math.sqrt(r * r + o * o);
        },
      }));
    function e(t) {
      return function (n) {
        window.setTimeout(n, t);
      };
    }
    return gs;
  }
  var vs, Uc;
  function Zw() {
    if (Uc) return vs;
    Uc = 1;
    var e = zi();
    return (
      (vs = (function () {
        var t = '',
          n,
          r,
          o,
          i = [],
          s = { passive: !0 },
          a = { passive: !1 };
        e.getGlobalThis().addEventListener
          ? ((n = 'addEventListener'), (r = 'removeEventListener'))
          : ((n = 'attachEvent'), (r = 'detachEvent'), (t = 'on'));
        function l() {
          return (
            o ||
              (o =
                'onwheel' in document.createElement('div')
                  ? 'wheel'
                  : document.onmousewheel !== void 0
                    ? 'mousewheel'
                    : 'DOMMouseScroll'),
            o
          );
        }
        function u(g, v) {
          var b = function (w) {
            !w && (w = window.event);
            var y = {
              originalEvent: w,
              target: w.target || w.srcElement,
              type: 'wheel',
              deltaMode: w.type == 'MozMousePixelScroll' ? 0 : 1,
              deltaX: 0,
              delatZ: 0,
              preventDefault: function () {
                w.preventDefault ? w.preventDefault() : (w.returnValue = !1);
              },
            };
            return (
              l() == 'mousewheel'
                ? ((y.deltaY = -0.025 * w.wheelDelta),
                  w.wheelDeltaX && (y.deltaX = -0.025 * w.wheelDeltaX))
                : (y.deltaY = w.detail),
              v(y)
            );
          };
          return (i.push({ element: g, fn: b }), b);
        }
        function f(g) {
          for (var v = 0; v < i.length; v++) if (i[v].element === g) return i[v].fn;
          return function () {};
        }
        function c(g) {
          for (var v = 0; v < i.length; v++) if (i[v].element === g) return i.splice(v, 1);
        }
        function d(g, v, b, w) {
          var y;
          (l() === 'wheel' ? (y = b) : (y = u(g, b)), g[n](t + v, y, w ? s : a));
        }
        function h(g, v, b, w) {
          var y;
          (l() === 'wheel' ? (y = b) : (y = f(g)), g[r](t + v, y, w ? s : a), c(g));
        }
        function p(g, v, b) {
          (d(g, l(), v, b), l() == 'DOMMouseScroll' && d(g, 'MozMousePixelScroll', v, b));
        }
        function m(g, v, b) {
          (h(g, l(), v, b), l() == 'DOMMouseScroll' && h(g, 'MozMousePixelScroll', v, b));
        }
        return { on: p, off: m };
      })()),
      vs
    );
  }
  var $r, Hc;
  function Ga() {
    if (Hc) return $r;
    Hc = 1;
    var e = zi(),
      t = 'unknown';
    return (
      typeof document < 'u' && document.documentMode && (t = 'ie'),
      ($r = {
        svgNS: 'http://www.w3.org/2000/svg',
        xmlNS: 'http://www.w3.org/XML/1998/namespace',
        xmlnsNS: 'http://www.w3.org/2000/xmlns/',
        xlinkNS: 'http://www.w3.org/1999/xlink',
        evNS: 'http://www.w3.org/2001/xml-events',
        getBoundingClientRectNormalized: function (n) {
          if (n.clientWidth && n.clientHeight)
            return { width: n.clientWidth, height: n.clientHeight };
          if (n.getBoundingClientRect()) return n.getBoundingClientRect();
          throw new Error('Cannot get BoundingClientRect for SVG.');
        },
        getOrCreateViewport: function (n, r) {
          var o = null;
          if ((e.isElement(r) ? (o = r) : (o = n.querySelector(r)), !o)) {
            var i = Array.prototype.slice.call(n.childNodes || n.children).filter(function (f) {
              return f.nodeName !== 'defs' && f.nodeName !== '#text';
            });
            i.length === 1 &&
              i[0].nodeName === 'g' &&
              i[0].getAttribute('transform') === null &&
              (o = i[0]);
          }
          if (!o) {
            var s = 'viewport-' + new Date().toISOString().replace(/\D/g, '');
            ((o = document.createElementNS(this.svgNS, 'g')), o.setAttribute('id', s));
            var a = n.childNodes || n.children;
            if (a && a.length > 0)
              for (var l = a.length; l > 0; l--)
                a[a.length - l].nodeName !== 'defs' && o.appendChild(a[a.length - l]);
            n.appendChild(o);
          }
          var u = [];
          return (
            o.getAttribute('class') && (u = o.getAttribute('class').split(' ')),
            ~u.indexOf('svg-pan-zoom_viewport') ||
              (u.push('svg-pan-zoom_viewport'), o.setAttribute('class', u.join(' '))),
            o
          );
        },
        setupSvgAttributes: function (n) {
          if (
            (n.setAttribute('xmlns', this.svgNS),
            n.setAttributeNS(this.xmlnsNS, 'xmlns:xlink', this.xlinkNS),
            n.setAttributeNS(this.xmlnsNS, 'xmlns:ev', this.evNS),
            n.parentNode !== null)
          ) {
            var r = n.getAttribute('style') || '';
            r.toLowerCase().indexOf('overflow') === -1 &&
              n.setAttribute('style', 'overflow: hidden; ' + r);
          }
        },
        internetExplorerRedisplayInterval: 300,
        refreshDefsGlobal: e.throttle(
          function () {
            for (var n = document.querySelectorAll('defs'), r = n.length, o = 0; o < r; o++) {
              var i = n[o];
              i.parentNode.insertBefore(i, i);
            }
          },
          $r ? $r.internetExplorerRedisplayInterval : null,
        ),
        setCTM: function (n, r, o) {
          var i = this,
            s = 'matrix(' + r.a + ',' + r.b + ',' + r.c + ',' + r.d + ',' + r.e + ',' + r.f + ')';
          (n.setAttributeNS(null, 'transform', s),
            'transform' in n.style
              ? (n.style.transform = s)
              : '-ms-transform' in n.style
                ? (n.style['-ms-transform'] = s)
                : '-webkit-transform' in n.style && (n.style['-webkit-transform'] = s),
            t === 'ie' &&
              o &&
              (o.parentNode.insertBefore(o, o),
              window.setTimeout(function () {
                i.refreshDefsGlobal();
              }, i.internetExplorerRedisplayInterval)));
        },
        getEventPoint: function (n, r) {
          var o = r.createSVGPoint();
          return (e.mouseAndTouchNormalize(n, r), (o.x = n.clientX), (o.y = n.clientY), o);
        },
        getTouchPoint: function (n, r, o) {
          var i = r.createSVGPoint();
          return (e.touchNormalize(n, r, o), (i.x = n.clientX), (i.y = n.clientY), i);
        },
        getSvgCenterPoint: function (n, r, o) {
          return this.createSVGPoint(n, r / 2, o / 2);
        },
        createSVGPoint: function (n, r, o) {
          var i = n.createSVGPoint();
          return ((i.x = r), (i.y = o), i);
        },
      }),
      $r
    );
  }
  var ms, Vc;
  function Ww() {
    if (Vc) return ms;
    Vc = 1;
    var e = Ga();
    return (
      (ms = {
        enable: function (t) {
          var n = t.svg.querySelector('defs');
          n || ((n = document.createElementNS(e.svgNS, 'defs')), t.svg.appendChild(n));
          var r = n.querySelector('style#svg-pan-zoom-controls-styles');
          if (!r) {
            var o = document.createElementNS(e.svgNS, 'style');
            (o.setAttribute('id', 'svg-pan-zoom-controls-styles'),
              o.setAttribute('type', 'text/css'),
              (o.textContent =
                '.svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }'),
              n.appendChild(o));
          }
          var i = document.createElementNS(e.svgNS, 'g');
          (i.setAttribute('id', 'svg-pan-zoom-controls'),
            i.setAttribute(
              'transform',
              'translate(' + (t.width - 70) + ' ' + (t.height - 76) + ') scale(0.75)',
            ),
            i.setAttribute('class', 'svg-pan-zoom-control'),
            i.appendChild(this._createZoomIn(t)),
            i.appendChild(this._createZoomReset(t)),
            i.appendChild(this._createZoomOut(t)),
            t.svg.appendChild(i),
            (t.controlIcons = i));
        },
        _createZoomIn: function (t) {
          var n = document.createElementNS(e.svgNS, 'g');
          (n.setAttribute('id', 'svg-pan-zoom-zoom-in'),
            n.setAttribute('transform', 'translate(30.5 5) scale(0.015)'),
            n.setAttribute('class', 'svg-pan-zoom-control'),
            n.addEventListener(
              'click',
              function () {
                t.getPublicInstance().zoomIn();
              },
              !1,
            ),
            n.addEventListener(
              'touchstart',
              function () {
                t.getPublicInstance().zoomIn();
              },
              !1,
            ));
          var r = document.createElementNS(e.svgNS, 'rect');
          (r.setAttribute('x', '0'),
            r.setAttribute('y', '0'),
            r.setAttribute('width', '1500'),
            r.setAttribute('height', '1400'),
            r.setAttribute('class', 'svg-pan-zoom-control-background'),
            n.appendChild(r));
          var o = document.createElementNS(e.svgNS, 'path');
          return (
            o.setAttribute(
              'd',
              'M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z',
            ),
            o.setAttribute('class', 'svg-pan-zoom-control-element'),
            n.appendChild(o),
            n
          );
        },
        _createZoomReset: function (t) {
          var n = document.createElementNS(e.svgNS, 'g');
          (n.setAttribute('id', 'svg-pan-zoom-reset-pan-zoom'),
            n.setAttribute('transform', 'translate(5 35) scale(0.4)'),
            n.setAttribute('class', 'svg-pan-zoom-control'),
            n.addEventListener(
              'click',
              function () {
                t.getPublicInstance().reset();
              },
              !1,
            ),
            n.addEventListener(
              'touchstart',
              function () {
                t.getPublicInstance().reset();
              },
              !1,
            ));
          var r = document.createElementNS(e.svgNS, 'rect');
          (r.setAttribute('x', '2'),
            r.setAttribute('y', '2'),
            r.setAttribute('width', '182'),
            r.setAttribute('height', '58'),
            r.setAttribute('class', 'svg-pan-zoom-control-background'),
            n.appendChild(r));
          var o = document.createElementNS(e.svgNS, 'path');
          (o.setAttribute(
            'd',
            'M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z',
          ),
            o.setAttribute('class', 'svg-pan-zoom-control-element'),
            n.appendChild(o));
          var i = document.createElementNS(e.svgNS, 'path');
          return (
            i.setAttribute(
              'd',
              'M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z',
            ),
            i.setAttribute('class', 'svg-pan-zoom-control-element'),
            n.appendChild(i),
            n
          );
        },
        _createZoomOut: function (t) {
          var n = document.createElementNS(e.svgNS, 'g');
          (n.setAttribute('id', 'svg-pan-zoom-zoom-out'),
            n.setAttribute('transform', 'translate(30.5 70) scale(0.015)'),
            n.setAttribute('class', 'svg-pan-zoom-control'),
            n.addEventListener(
              'click',
              function () {
                t.getPublicInstance().zoomOut();
              },
              !1,
            ),
            n.addEventListener(
              'touchstart',
              function () {
                t.getPublicInstance().zoomOut();
              },
              !1,
            ));
          var r = document.createElementNS(e.svgNS, 'rect');
          (r.setAttribute('x', '0'),
            r.setAttribute('y', '0'),
            r.setAttribute('width', '1500'),
            r.setAttribute('height', '1400'),
            r.setAttribute('class', 'svg-pan-zoom-control-background'),
            n.appendChild(r));
          var o = document.createElementNS(e.svgNS, 'path');
          return (
            o.setAttribute(
              'd',
              'M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z',
            ),
            o.setAttribute('class', 'svg-pan-zoom-control-element'),
            n.appendChild(o),
            n
          );
        },
        disable: function (t) {
          t.controlIcons &&
            (t.controlIcons.parentNode.removeChild(t.controlIcons), (t.controlIcons = null));
        },
      }),
      ms
    );
  }
  var ys, Zc;
  function Kw() {
    if (Zc) return ys;
    Zc = 1;
    var e = Ga(),
      t = zi(),
      n = function (r, o) {
        this.init(r, o);
      };
    return (
      (n.prototype.init = function (r, o) {
        ((this.viewport = r),
          (this.options = o),
          (this.originalState = { zoom: 1, x: 0, y: 0 }),
          (this.activeState = { zoom: 1, x: 0, y: 0 }),
          (this.updateCTMCached = t.proxy(this.updateCTM, this)),
          (this.requestAnimationFrame = t.createRequestAnimationFrame(this.options.refreshRate)),
          (this.viewBox = { x: 0, y: 0, width: 0, height: 0 }),
          this.cacheViewBox());
        var i = this.processCTM();
        (this.setCTM(i), this.updateCTM());
      }),
      (n.prototype.cacheViewBox = function () {
        var r = this.options.svg.getAttribute('viewBox');
        if (r) {
          var o = r
            .split(/[\s\,]/)
            .filter(function (s) {
              return s;
            })
            .map(parseFloat);
          ((this.viewBox.x = o[0]),
            (this.viewBox.y = o[1]),
            (this.viewBox.width = o[2]),
            (this.viewBox.height = o[3]));
          var i = Math.min(
            this.options.width / this.viewBox.width,
            this.options.height / this.viewBox.height,
          );
          ((this.activeState.zoom = isFinite(i) ? i : 1),
            (this.activeState.x = (this.options.width - this.viewBox.width * i) / 2),
            (this.activeState.y = (this.options.height - this.viewBox.height * i) / 2),
            this.updateCTMOnNextFrame(),
            this.options.svg.removeAttribute('viewBox'));
        } else this.simpleViewBoxCache();
      }),
      (n.prototype.simpleViewBoxCache = function () {
        var r = this.viewport.getBBox();
        ((this.viewBox.x = r.x),
          (this.viewBox.y = r.y),
          (this.viewBox.width = r.width),
          (this.viewBox.height = r.height));
      }),
      (n.prototype.getViewBox = function () {
        return t.extend({}, this.viewBox);
      }),
      (n.prototype.processCTM = function () {
        var r = this.getCTM();
        if (this.options.fit || this.options.contain) {
          var o;
          (this.options.fit
            ? (o = Math.min(
                this.options.width / this.viewBox.width,
                this.options.height / this.viewBox.height,
              ))
            : (o = Math.max(
                this.options.width / this.viewBox.width,
                this.options.height / this.viewBox.height,
              )),
            (o = isFinite(o) ? o : 1),
            (r.a = o),
            (r.d = o),
            (r.e = -this.viewBox.x * o),
            (r.f = -this.viewBox.y * o));
        }
        if (this.options.center) {
          var i = (this.options.width - (this.viewBox.width + this.viewBox.x * 2) * r.a) * 0.5,
            s = (this.options.height - (this.viewBox.height + this.viewBox.y * 2) * r.a) * 0.5;
          ((r.e = i), (r.f = s));
        }
        return (
          (this.originalState.zoom = r.a),
          (this.originalState.x = r.e),
          (this.originalState.y = r.f),
          r
        );
      }),
      (n.prototype.getOriginalState = function () {
        return t.extend({}, this.originalState);
      }),
      (n.prototype.getState = function () {
        return t.extend({}, this.activeState);
      }),
      (n.prototype.getZoom = function () {
        return this.activeState.zoom;
      }),
      (n.prototype.getRelativeZoom = function () {
        return this.activeState.zoom / this.originalState.zoom;
      }),
      (n.prototype.computeRelativeZoom = function (r) {
        return r / this.originalState.zoom;
      }),
      (n.prototype.getPan = function () {
        return { x: this.activeState.x, y: this.activeState.y };
      }),
      (n.prototype.getCTM = function () {
        var r = this.options.svg.createSVGMatrix();
        return (
          (r.a = this.activeState.zoom),
          (r.b = 0),
          (r.c = 0),
          (r.d = this.activeState.zoom),
          (r.e = this.activeState.x),
          (r.f = this.activeState.y),
          r
        );
      }),
      (n.prototype.setCTM = function (r) {
        var o = this.isZoomDifferent(r),
          i = this.isPanDifferent(r);
        if (o || i) {
          if (
            (o &&
              (this.options.beforeZoom(this.getRelativeZoom(), this.computeRelativeZoom(r.a)) === !1
                ? ((r.a = r.d = this.activeState.zoom), (o = !1))
                : (this.updateCache(r), this.options.onZoom(this.getRelativeZoom()))),
            i)
          ) {
            var s = this.options.beforePan(this.getPan(), { x: r.e, y: r.f }),
              a = !1,
              l = !1;
            (s === !1
              ? ((r.e = this.getPan().x), (r.f = this.getPan().y), (a = l = !0))
              : t.isObject(s) &&
                (s.x === !1 ? ((r.e = this.getPan().x), (a = !0)) : t.isNumber(s.x) && (r.e = s.x),
                s.y === !1 ? ((r.f = this.getPan().y), (l = !0)) : t.isNumber(s.y) && (r.f = s.y)),
              (a && l) || !this.isPanDifferent(r)
                ? (i = !1)
                : (this.updateCache(r), this.options.onPan(this.getPan())));
          }
          (o || i) && this.updateCTMOnNextFrame();
        }
      }),
      (n.prototype.isZoomDifferent = function (r) {
        return this.activeState.zoom !== r.a;
      }),
      (n.prototype.isPanDifferent = function (r) {
        return this.activeState.x !== r.e || this.activeState.y !== r.f;
      }),
      (n.prototype.updateCache = function (r) {
        ((this.activeState.zoom = r.a), (this.activeState.x = r.e), (this.activeState.y = r.f));
      }),
      (n.prototype.pendingUpdate = !1),
      (n.prototype.updateCTMOnNextFrame = function () {
        this.pendingUpdate ||
          ((this.pendingUpdate = !0),
          this.requestAnimationFrame.call(window, this.updateCTMCached));
      }),
      (n.prototype.updateCTM = function () {
        var r = this.getCTM();
        (e.setCTM(this.viewport, r, this.defs),
          (this.pendingUpdate = !1),
          this.options.onUpdatedCTM && this.options.onUpdatedCTM(r));
      }),
      (ys = function (r, o) {
        return new n(r, o);
      }),
      ys
    );
  }
  var bs, Wc;
  function qw() {
    if (Wc) return bs;
    Wc = 1;
    var e = Zw(),
      t = Ww(),
      n = zi(),
      r = Ga(),
      o = Kw(),
      i = function (c, d) {
        this.init(c, d);
      },
      s = {
        viewportSelector: '.svg-pan-zoom_viewport',
        panEnabled: !0,
        controlIconsEnabled: !1,
        zoomEnabled: !0,
        dblClickZoomEnabled: !0,
        mouseWheelZoomEnabled: !0,
        preventMouseEventsDefault: !0,
        zoomScaleSensitivity: 0.1,
        minZoom: 0.5,
        maxZoom: 10,
        fit: !0,
        contain: !1,
        center: !0,
        refreshRate: 'auto',
        beforeZoom: null,
        onZoom: null,
        beforePan: null,
        onPan: null,
        customEventsHandler: null,
        eventsListenerElement: null,
        onUpdatedCTM: null,
      },
      a = { passive: !0 },
      l = { passive: !1 };
    ((i.prototype.init = function (c, d) {
      var h = this;
      ((this.svg = c),
        (this.defs = c.querySelector('defs')),
        r.setupSvgAttributes(this.svg),
        (this.options = n.extend(n.extend({}, s), d)),
        (this.state = 'none'));
      var p = r.getBoundingClientRectNormalized(c);
      ((this.width = p.width),
        (this.height = p.height),
        (this.viewport = o(r.getOrCreateViewport(this.svg, this.options.viewportSelector), {
          svg: this.svg,
          width: this.width,
          height: this.height,
          fit: this.options.fit,
          contain: this.options.contain,
          center: this.options.center,
          refreshRate: this.options.refreshRate,
          beforeZoom: function (g, v) {
            if (h.viewport && h.options.beforeZoom) return h.options.beforeZoom(g, v);
          },
          onZoom: function (g) {
            if (h.viewport && h.options.onZoom) return h.options.onZoom(g);
          },
          beforePan: function (g, v) {
            if (h.viewport && h.options.beforePan) return h.options.beforePan(g, v);
          },
          onPan: function (g) {
            if (h.viewport && h.options.onPan) return h.options.onPan(g);
          },
          onUpdatedCTM: function (g) {
            if (h.viewport && h.options.onUpdatedCTM) return h.options.onUpdatedCTM(g);
          },
        })));
      var m = this.getPublicInstance();
      (m.setBeforeZoom(this.options.beforeZoom),
        m.setOnZoom(this.options.onZoom),
        m.setBeforePan(this.options.beforePan),
        m.setOnPan(this.options.onPan),
        m.setOnUpdatedCTM(this.options.onUpdatedCTM),
        this.options.controlIconsEnabled && t.enable(this),
        (this.lastMouseWheelEventTime = Date.now()),
        this.setupHandlers());
    }),
      (i.prototype.setupHandlers = function () {
        var c = this,
          d = null;
        if (
          ((this.eventListeners = {
            pointerdown: function (g) {
              if (g.pointerType !== 'touch') {
                var v = c.handleMouseDown(g, d);
                return ((d = g), v);
              }
            },
            touchstart: function (g) {
              var v = c.handleTouchStart(g, d);
              return ((d = g), v);
            },
            pointerup: function (g) {
              if (g.pointerType !== 'touch') return c.handleMouseUp(g);
            },
            touchend: function (g) {
              return c.handleTouchEnd(g);
            },
            pointermove: function (g) {
              if (g.pointerType !== 'touch') return c.handleMouseMove(g);
            },
            touchmove: function (g) {
              return c.handleTouchMove(g);
            },
            pointerleave: function (g) {
              if (g.pointerType !== 'touch') return c.handleMouseUp(g);
            },
            pointercancel: function (g) {
              if (g.pointerType !== 'touch') return c.handleMouseUp(g);
            },
            touchleave: function (g) {
              return c.handleTouchEnd(g);
            },
            touchcancel: function (g) {
              return c.handleTouchEnd(g);
            },
          }),
          this.options.customEventsHandler != null)
        ) {
          this.options.customEventsHandler.init({
            svgElement: this.svg,
            eventsListenerElement: this.options.eventsListenerElement,
            instance: this.getPublicInstance(),
          });
          var h = this.options.customEventsHandler.haltEventListeners;
          if (h && h.length)
            for (var p = h.length - 1; p >= 0; p--)
              this.eventListeners.hasOwnProperty(h[p]) && delete this.eventListeners[h[p]];
        }
        for (var m in this.eventListeners)
          (this.options.eventsListenerElement || this.svg).addEventListener(
            m,
            this.eventListeners[m],
            this.options.preventMouseEventsDefault ? l : a,
          );
        this.options.mouseWheelZoomEnabled &&
          ((this.options.mouseWheelZoomEnabled = !1), this.enableMouseWheelZoom());
      }),
      (i.prototype.enableMouseWheelZoom = function () {
        if (!this.options.mouseWheelZoomEnabled) {
          var c = this;
          this.wheelListener = function (h) {
            return c.handleMouseWheel(h);
          };
          var d = !this.options.preventMouseEventsDefault;
          (e.on(this.options.eventsListenerElement || this.svg, this.wheelListener, d),
            (this.options.mouseWheelZoomEnabled = !0));
        }
      }),
      (i.prototype.disableMouseWheelZoom = function () {
        if (this.options.mouseWheelZoomEnabled) {
          var c = !this.options.preventMouseEventsDefault;
          (e.off(this.options.eventsListenerElement || this.svg, this.wheelListener, c),
            (this.options.mouseWheelZoomEnabled = !1));
        }
      }),
      (i.prototype.handleMouseWheel = function (c) {
        if (!(!this.options.zoomEnabled || this.state !== 'none')) {
          this.options.preventMouseEventsDefault &&
            (c.preventDefault ? c.preventDefault() : (c.returnValue = !1));
          var d = c.deltaY || 1,
            h = Date.now() - this.lastMouseWheelEventTime,
            p = 3 + Math.max(0, 30 - h);
          ((this.lastMouseWheelEventTime = Date.now()),
            'deltaMode' in c &&
              c.deltaMode === 0 &&
              c.wheelDelta &&
              (d = c.deltaY === 0 ? 0 : Math.abs(c.wheelDelta) / c.deltaY),
            (d = -0.3 < d && d < 0.3 ? d : ((d > 0 ? 1 : -1) * Math.log(Math.abs(d) + 10)) / p));
          var m = this.svg.getScreenCTM().inverse(),
            g = r.getEventPoint(c, this.svg).matrixTransform(m),
            v = Math.pow(1 + this.options.zoomScaleSensitivity, -1 * d);
          this.zoomAtPoint(v, g);
        }
      }),
      (i.prototype.zoomAtPoint = function (c, d, h) {
        var p = this.viewport.getOriginalState();
        h
          ? ((c = Math.max(
              this.options.minZoom * p.zoom,
              Math.min(this.options.maxZoom * p.zoom, c),
            )),
            (c = c / this.getZoom()))
          : this.getZoom() * c < this.options.minZoom * p.zoom
            ? (c = (this.options.minZoom * p.zoom) / this.getZoom())
            : this.getZoom() * c > this.options.maxZoom * p.zoom &&
              (c = (this.options.maxZoom * p.zoom) / this.getZoom());
        var m = this.viewport.getCTM(),
          g = d.matrixTransform(m.inverse()),
          v = this.svg.createSVGMatrix().translate(g.x, g.y).scale(c).translate(-g.x, -g.y),
          b = m.multiply(v);
        b.a !== m.a && this.viewport.setCTM(b);
      }),
      (i.prototype.zoom = function (c, d) {
        this.zoomAtPoint(c, r.getSvgCenterPoint(this.svg, this.width, this.height), d);
      }),
      (i.prototype.publicZoom = function (c, d) {
        (d && (c = this.computeFromRelativeZoom(c)), this.zoom(c, d));
      }),
      (i.prototype.publicZoomAtPoint = function (c, d, h) {
        if ((h && (c = this.computeFromRelativeZoom(c)), n.getType(d) !== 'SVGPoint'))
          if ('x' in d && 'y' in d) d = r.createSVGPoint(this.svg, d.x, d.y);
          else throw new Error('Given point is invalid');
        this.zoomAtPoint(c, d, h);
      }),
      (i.prototype.getZoom = function () {
        return this.viewport.getZoom();
      }),
      (i.prototype.getRelativeZoom = function () {
        return this.viewport.getRelativeZoom();
      }),
      (i.prototype.computeFromRelativeZoom = function (c) {
        return c * this.viewport.getOriginalState().zoom;
      }),
      (i.prototype.resetZoom = function () {
        var c = this.viewport.getOriginalState();
        this.zoom(c.zoom, !0);
      }),
      (i.prototype.resetPan = function () {
        this.pan(this.viewport.getOriginalState());
      }),
      (i.prototype.reset = function () {
        (this.resetZoom(), this.resetPan());
      }),
      (i.prototype.handleDblClick = function (c) {
        if (
          (this.options.preventMouseEventsDefault &&
            (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
          this.options.controlIconsEnabled)
        ) {
          var d = c.target.getAttribute('class') || '';
          if (d.indexOf('svg-pan-zoom-control') > -1) return !1;
        }
        var h;
        c.shiftKey
          ? (h = 1 / ((1 + this.options.zoomScaleSensitivity) * 2))
          : (h = (1 + this.options.zoomScaleSensitivity) * 2);
        var p = r.getEventPoint(c, this.svg).matrixTransform(this.svg.getScreenCTM().inverse());
        this.zoomAtPoint(h, p);
      }),
      (i.prototype.handleMouseDown = function (c, d) {
        (this.options.preventMouseEventsDefault &&
          (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
          n.mouseAndTouchNormalize(c, this.svg),
          this.options.dblClickZoomEnabled && n.isDblClick(c, d)
            ? this.handleDblClick(c)
            : ((this.state = 'pan'),
              (this.firstEventCTM = this.viewport.getCTM()),
              (this.stateOrigin = r
                .getEventPoint(c, this.svg)
                .matrixTransform(this.firstEventCTM.inverse()))));
      }),
      (i.prototype.handleMouseMove = function (c) {
        if (
          (this.options.preventMouseEventsDefault &&
            (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
          this.state === 'pan' && this.options.panEnabled)
        ) {
          var d = r.getEventPoint(c, this.svg).matrixTransform(this.firstEventCTM.inverse()),
            h = this.firstEventCTM.translate(d.x - this.stateOrigin.x, d.y - this.stateOrigin.y);
          this.viewport.setCTM(h);
        }
      }),
      (i.prototype.handleMouseUp = function (c) {
        (this.options.preventMouseEventsDefault &&
          (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
          this.state === 'pan' && (this.state = 'none'));
      }),
      (i.prototype.handleTouchStart = function (c, d) {
        if (c.touches.length == 1) this.handleMouseDown(c, d);
        else {
          (this.options.preventMouseEventsDefault &&
            (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
            (this.firstEventCTM = this.viewport.getCTM()));
          var h = r.getTouchPoint(c, this.svg, 0),
            p = r.getTouchPoint(c, this.svg, 1);
          ((this.firstDistance = n.calculateDistance(h, p)),
            (h.x = (h.x + p.x) / 2),
            (h.y = (h.y + p.y) / 2),
            (this.stateOrigin = h.matrixTransform(this.firstEventCTM.inverse())),
            (this.firstZoomLevel = this.getZoom()));
        }
      }),
      (i.prototype.handleTouchMove = function (c) {
        if (c.touches.length == 1) this.handleMouseMove(c);
        else {
          if (
            (this.options.preventMouseEventsDefault &&
              (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
            !this.options.panEnabled && !this.options.zoomEnabled)
          )
            return;
          var d = r.getTouchPoint(c, this.svg, 0),
            h = r.getTouchPoint(c, this.svg, 1),
            p = this.svg.createSVGPoint();
          if (
            ((p.x = (d.x + h.x) / 2),
            (p.y = (d.y + h.y) / 2),
            this.state === 'pan' && this.options.panEnabled)
          ) {
            var m = p.matrixTransform(this.firstEventCTM.inverse()),
              g = this.firstEventCTM.translate(m.x - this.stateOrigin.x, m.y - this.stateOrigin.y);
            this.viewport.setCTM(g);
          }
          if (this.options.zoomEnabled) {
            var v = n.calculateDistance(d, h),
              b = v / this.firstDistance,
              w = this.svg.getScreenCTM().inverse(),
              y = p.matrixTransform(w);
            this.zoomAtPoint(this.firstZoomLevel * b, y, !0);
          }
        }
      }),
      (i.prototype.handleTouchEnd = function (c) {
        if (c.touches.length == 0) this.handleMouseUp(c);
        else if (
          (this.options.preventMouseEventsDefault &&
            (c.preventDefault ? c.preventDefault() : (c.returnValue = !1)),
          (this.firstEventCTM = this.viewport.getCTM()),
          c.touches.length == 1)
        )
          this.stateOrigin = r
            .getEventPoint(c, this.svg)
            .matrixTransform(this.firstEventCTM.inverse());
        else {
          var d = r.getTouchPoint(c, this.svg, 0),
            h = r.getTouchPoint(c, this.svg, 1);
          ((this.firstDistance = n.calculateDistance(d, h)),
            (d.x = (d.x + h.x) / 2),
            (d.y = (d.y + h.y) / 2),
            (this.stateOrigin = d.matrixTransform(this.firstEventCTM.inverse())));
        }
      }),
      (i.prototype.fit = function () {
        var c = this.viewport.getViewBox(),
          d = Math.min(this.width / c.width, this.height / c.height);
        this.zoom(d, !0);
      }),
      (i.prototype.contain = function () {
        var c = this.viewport.getViewBox(),
          d = Math.max(this.width / c.width, this.height / c.height);
        this.zoom(d, !0);
      }),
      (i.prototype.center = function () {
        var c = this.viewport.getViewBox(),
          d = (this.width - (c.width + c.x * 2) * this.getZoom()) * 0.5,
          h = (this.height - (c.height + c.y * 2) * this.getZoom()) * 0.5;
        this.getPublicInstance().pan({ x: d, y: h });
      }),
      (i.prototype.updateBBox = function () {
        this.viewport.simpleViewBoxCache();
      }),
      (i.prototype.pan = function (c) {
        var d = this.viewport.getCTM();
        ((d.e = c.x), (d.f = c.y), this.viewport.setCTM(d));
      }),
      (i.prototype.panBy = function (c) {
        var d = this.viewport.getCTM();
        ((d.e += c.x), (d.f += c.y), this.viewport.setCTM(d));
      }),
      (i.prototype.getPan = function () {
        var c = this.viewport.getState();
        return { x: c.x, y: c.y };
      }),
      (i.prototype.resize = function () {
        var c = r.getBoundingClientRectNormalized(this.svg);
        ((this.width = c.width), (this.height = c.height));
        var d = this.viewport;
        ((d.options.width = this.width),
          (d.options.height = this.height),
          d.processCTM(),
          this.options.controlIconsEnabled &&
            (this.getPublicInstance().disableControlIcons(),
            this.getPublicInstance().enableControlIcons()));
      }),
      (i.prototype.destroy = function () {
        var c = this;
        ((this.beforeZoom = null),
          (this.onZoom = null),
          (this.beforePan = null),
          (this.onPan = null),
          (this.onUpdatedCTM = null),
          this.options.customEventsHandler != null &&
            this.options.customEventsHandler.destroy({
              svgElement: this.svg,
              eventsListenerElement: this.options.eventsListenerElement,
              instance: this.getPublicInstance(),
            }));
        for (var d in this.eventListeners)
          (this.options.eventsListenerElement || this.svg).removeEventListener(
            d,
            this.eventListeners[d],
            this.options.preventMouseEventsDefault ? l : a,
          );
        (this.disableMouseWheelZoom(),
          this.getPublicInstance().disableControlIcons(),
          (u = u.filter(function (h) {
            return h.svg !== c.svg;
          })),
          delete this.options,
          delete this.viewport,
          delete this.publicInstance,
          delete this.pi,
          (this.getPublicInstance = function () {
            return null;
          }));
      }),
      (i.prototype.getPublicInstance = function () {
        var c = this;
        return (
          this.publicInstance ||
            (this.publicInstance = this.pi =
              {
                enablePan: function () {
                  return ((c.options.panEnabled = !0), c.pi);
                },
                disablePan: function () {
                  return ((c.options.panEnabled = !1), c.pi);
                },
                isPanEnabled: function () {
                  return !!c.options.panEnabled;
                },
                pan: function (d) {
                  return (c.pan(d), c.pi);
                },
                panBy: function (d) {
                  return (c.panBy(d), c.pi);
                },
                getPan: function () {
                  return c.getPan();
                },
                setBeforePan: function (d) {
                  return (
                    (c.options.beforePan = d === null ? null : n.proxy(d, c.publicInstance)),
                    c.pi
                  );
                },
                setOnPan: function (d) {
                  return (
                    (c.options.onPan = d === null ? null : n.proxy(d, c.publicInstance)),
                    c.pi
                  );
                },
                enableZoom: function () {
                  return ((c.options.zoomEnabled = !0), c.pi);
                },
                disableZoom: function () {
                  return ((c.options.zoomEnabled = !1), c.pi);
                },
                isZoomEnabled: function () {
                  return !!c.options.zoomEnabled;
                },
                enableControlIcons: function () {
                  return (
                    c.options.controlIconsEnabled ||
                      ((c.options.controlIconsEnabled = !0), t.enable(c)),
                    c.pi
                  );
                },
                disableControlIcons: function () {
                  return (
                    c.options.controlIconsEnabled &&
                      ((c.options.controlIconsEnabled = !1), t.disable(c)),
                    c.pi
                  );
                },
                isControlIconsEnabled: function () {
                  return !!c.options.controlIconsEnabled;
                },
                enableDblClickZoom: function () {
                  return ((c.options.dblClickZoomEnabled = !0), c.pi);
                },
                disableDblClickZoom: function () {
                  return ((c.options.dblClickZoomEnabled = !1), c.pi);
                },
                isDblClickZoomEnabled: function () {
                  return !!c.options.dblClickZoomEnabled;
                },
                enableMouseWheelZoom: function () {
                  return (c.enableMouseWheelZoom(), c.pi);
                },
                disableMouseWheelZoom: function () {
                  return (c.disableMouseWheelZoom(), c.pi);
                },
                isMouseWheelZoomEnabled: function () {
                  return !!c.options.mouseWheelZoomEnabled;
                },
                setZoomScaleSensitivity: function (d) {
                  return ((c.options.zoomScaleSensitivity = d), c.pi);
                },
                setMinZoom: function (d) {
                  return ((c.options.minZoom = d), c.pi);
                },
                setMaxZoom: function (d) {
                  return ((c.options.maxZoom = d), c.pi);
                },
                setBeforeZoom: function (d) {
                  return (
                    (c.options.beforeZoom = d === null ? null : n.proxy(d, c.publicInstance)),
                    c.pi
                  );
                },
                setOnZoom: function (d) {
                  return (
                    (c.options.onZoom = d === null ? null : n.proxy(d, c.publicInstance)),
                    c.pi
                  );
                },
                zoom: function (d) {
                  return (c.publicZoom(d, !0), c.pi);
                },
                zoomBy: function (d) {
                  return (c.publicZoom(d, !1), c.pi);
                },
                zoomAtPoint: function (d, h) {
                  return (c.publicZoomAtPoint(d, h, !0), c.pi);
                },
                zoomAtPointBy: function (d, h) {
                  return (c.publicZoomAtPoint(d, h, !1), c.pi);
                },
                zoomIn: function () {
                  return (this.zoomBy(1 + c.options.zoomScaleSensitivity), c.pi);
                },
                zoomOut: function () {
                  return (this.zoomBy(1 / (1 + c.options.zoomScaleSensitivity)), c.pi);
                },
                getZoom: function () {
                  return c.getRelativeZoom();
                },
                setOnUpdatedCTM: function (d) {
                  return (
                    (c.options.onUpdatedCTM = d === null ? null : n.proxy(d, c.publicInstance)),
                    c.pi
                  );
                },
                resetZoom: function () {
                  return (c.resetZoom(), c.pi);
                },
                resetPan: function () {
                  return (c.resetPan(), c.pi);
                },
                reset: function () {
                  return (c.reset(), c.pi);
                },
                fit: function () {
                  return (c.fit(), c.pi);
                },
                contain: function () {
                  return (c.contain(), c.pi);
                },
                center: function () {
                  return (c.center(), c.pi);
                },
                updateBBox: function () {
                  return (c.updateBBox(), c.pi);
                },
                resize: function () {
                  return (c.resize(), c.pi);
                },
                getSizes: function () {
                  return {
                    width: c.width,
                    height: c.height,
                    realZoom: c.getZoom(),
                    viewBox: c.viewport.getViewBox(),
                  };
                },
                destroy: function () {
                  return (c.destroy(), c.pi);
                },
              }),
          this.publicInstance
        );
      }));
    var u = [],
      f = function (c, d) {
        var h = n.getSvg(c);
        if (h === null) return null;
        for (var p = u.length - 1; p >= 0; p--)
          if (u[p].svg === h) return u[p].instance.getPublicInstance();
        return (
          u.push({ svg: h, instance: new i(h, d) }),
          u[u.length - 1].instance.getPublicInstance()
        );
      };
    return ((bs = f), bs);
  }
  var Gw = qw();
  const Xw = Vw(Gw),
    Jw = {
      getViewArea() {
        const e = this.getSizes(),
          t = this.getPan(),
          n = e.realZoom;
        ((t.x /= n), (t.y /= n));
        const r = { width: e.width / n, height: e.height / n };
        return {
          box: { top: -t.y, bottom: r.height - t.y, left: -t.x, right: r.width - t.x },
          center: { x: r.width / 2 - t.x, y: r.height / 2 - t.y },
        };
      },
      getViewBox() {
        return this.getViewArea().box;
      },
      setViewBox(e) {
        const t = e.right - e.left,
          n = e.bottom - e.top,
          { width: r, height: o } = this.getSizes(),
          i = t / n,
          s = r / o,
          a = i < s ? n * s : t,
          l = i > s ? t / s : n,
          u = Math.min(r / a, o / l),
          f = this.getRealZoom(),
          c = this.getZoom(),
          d = f / c;
        this.zoom(u / d);
        const h = { x: (e.left + t / 2) * u, y: (e.top + n / 2) * u };
        this.pan({ x: -h.x + (a / 2) * u, y: -h.y + (l / 2) * u });
      },
      getRealZoom() {
        return this.getSizes().realZoom;
      },
      applyAbsoluteZoomLevel(e, t, n) {
        const r = Math.max(1e-4, t),
          o = Math.max(r, n),
          i = Math.max(Math.min(o, e), r),
          s = this.getRealZoom(),
          a = this.getZoom(),
          l = s / a;
        this.setMinZoom(r / l)
          .setMaxZoom(o / l)
          .zoom(i / l);
      },
      isPanEnabled() {
        return this._isPanEnabled;
      },
      enablePan() {
        return ((this._isPanEnabled = !0), this._internalEnablePan(), this);
      },
      disablePan() {
        return ((this._isPanEnabled = !1), this._internalDisablePan(), this);
      },
      isZoomEnabled() {
        return this._isZoomEnabled;
      },
      enableZoom() {
        return ((this._isZoomEnabled = !0), this._internalEnableZoom(), this);
      },
      disableZoom() {
        return ((this._isZoomEnabled = !1), this._internalDisableZoom(), this);
      },
      setPanEnabled(e) {
        return (e ? this.enablePan() : this.disablePan(), this);
      },
      setZoomEnabled(e) {
        return (
          e
            ? (this.enableZoom(), this.enableDblClickZoom())
            : (this.disableZoom(), this.disableDblClickZoom()),
          this
        );
      },
    };
  function Yw(e, t) {
    var n, r;
    const o = e;
    return (
      (o._isPanEnabled = (n = t.panEnabled) != null ? n : !0),
      (o._isZoomEnabled = (r = t?.zoomEnabled) != null ? r : !0),
      (o._internalIsPanEnabled = o.isPanEnabled),
      (o._internalEnablePan = o.enablePan),
      (o._internalDisablePan = o.disablePan),
      (o._internalIsZoomEnabled = o.isZoomEnabled),
      (o._internalEnableZoom = o.enableZoom),
      (o._internalDisableZoom = o.disableZoom),
      Object.assign(e, Jw),
      o
    );
  }
  function Qw(e, t) {
    var n, r, o, i, s, a;
    const l = (r = (n = t.customEventsHandler) == null ? void 0 : n.init) != null ? r : (c) => {},
      u = (i = (o = t.customEventsHandler) == null ? void 0 : o.destroy) != null ? i : (c) => {},
      f =
        (a = (s = t.customEventsHandler) == null ? void 0 : s.haltEventListeners) != null ? a : [];
    return (
      t.mouseWheelZoomEnabled === void 0 && (t.mouseWheelZoomEnabled = t.zoomEnabled),
      (t.customEventsHandler = {
        init: (c) => {
          (Yw(c.instance, t), l(c));
        },
        destroy: (c) => u(c),
        haltEventListeners: f,
      }),
      Xw(e, t)
    );
  }
  function ex(e, t) {
    const n = J();
    let r = 0;
    const o = [],
      i = [],
      s = () => {
        ((r = 1), o.forEach((l) => l()), (o.length = 0));
      },
      a = () => {
        ((r = 2), i.forEach((l) => l()), (i.length = 0));
      };
    return (
      mn(() => {
        var l, u, f, c, d, h;
        const p = Se(e.value, '<svg>'),
          m = (u = (l = t.customEventsHandler) == null ? void 0 : l.init) != null ? u : (w) => {},
          g =
            (c = (f = t.customEventsHandler) == null ? void 0 : f.destroy) != null ? c : (w) => {},
          v =
            (h = (d = t.customEventsHandler) == null ? void 0 : d.haltEventListeners) != null
              ? h
              : [];
        t.customEventsHandler = {
          init: (w) => {
            ((n.value = w.instance), m(w), s());
          },
          destroy: (w) => {
            (a(), g(w));
          },
          haltEventListeners: v,
        };
        const b = () => {
          const w = p.getBoundingClientRect();
          w.width !== 0 && w.height !== 0 ? Qw(p, t) : setTimeout(b, 200);
        };
        b();
      }),
      tr(() => {
        var l;
        ((l = n.value) == null || l.destroy(), (n.value = void 0));
      }),
      {
        svgPanZoom: n,
        onSvgPanZoomMounted: (l) => {
          r === 0 ? o.push(l) : r === 1 && l();
        },
        onSvgPanZoomUnmounted: (l) => {
          r === 0 || r === 1 ? i.push(l) : l();
        },
      }
    );
  }
  const Gd = Symbol('zoomLevel');
  function tx(e, t) {
    const n = B(() => (t.scalingObjects ? 1 : 1 / e.value));
    return (Bt(Gd, { zoomLevel: e, scale: n }), { scale: n });
  }
  function Nt() {
    return Se(rt(Gd), 'zoomLevel');
  }
  function nx(e) {
    return e instanceof Promise || (e && typeof e.then == 'function');
  }
  function rx() {
    let e = null;
    const t = J({ enabled: !1, duration: 300, timingFunction: 'linear' });
    function n(r, o = 300, i = 'linear') {
      (e && (clearTimeout(e), (e = null)),
        (t.value = { enabled: !0, duration: o, timingFunction: i }),
        mo(() =>
          Qt(this, null, function* () {
            const s = r();
            (nx(s) && (yield s),
              e && clearTimeout(e),
              (e = window?.setTimeout(() => {
                ((t.value.enabled = !1), (e = null));
              }, o)));
          }),
        ));
    }
    return { transitionWhile: n, transitionOption: t };
  }
  function ox(e) {
    const t = J({}),
      n = J(!1);
    let r = 1;
    const o = new Map();
    return (
      Rt(() => {
        if (e.value instanceof Array) {
          const i = new Set([]);
          if (
            ((t.value = Object.fromEntries(
              e.value.map((s) => {
                let a = s.id;
                return (
                  a ||
                    (n.value ||
                      ((n.value = !0),
                      console.warn(
                        '[v-network-graph] Please specify the `id` field for the `Path` object. Currently, this works for compatibility, but in the future, the id field will be required.',
                      )),
                    (a = o.get(s)),
                    a || ((a = 'path-' + r++), o.set(s, a))),
                  i.add(a),
                  [a, s]
                );
              }),
            )),
            n.value)
          )
            for (const [s, a] of Array.from(o.entries())) i.has(a) || o.delete(s);
        } else t.value = e.value;
      }),
      { objects: t, isInCompatibilityModeForPath: n }
    );
  }
  function ix(e, t, n, r) {
    if (r) {
      const i = J(r(e[t])),
        s = (a) => {
          (Mn(a, i.value) || (i.value = a), Mn(a, e[t]) || n(`update:${t}`, a));
        };
      return (
        be(() => r(i.value), s),
        be(
          () => e[t],
          (a) => s(r(a)),
        ),
        i.value !== e[t] && n(`update:${t}`, i.value),
        i
      );
    }
    const o = J(e[t]);
    return (
      be(
        () => e[t],
        (i) => {
          Mn(i, o.value) || (o.value = i);
        },
      ),
      be(o, (i) => {
        Mn(i, e[t]) || n(`update:${t}`, i);
      }),
      o
    );
  }
  function ws(e, t, n, r) {
    const o = Ot(new Set());
    return (
      be(
        () => e[t],
        () => {
          const i = e[t].filter((s) => s in n.value);
          Mn(i, Array.from(o)) || (o.clear(), i.forEach(o.add, o));
        },
        { deep: !0, immediate: !0 },
      ),
      be(o, () => {
        const i = Array.from(o);
        Mn(e[t], i) || r(`update:${t}`, i);
      }),
      In(o)
    );
  }
  const Xd = Symbol('selection');
  function sx(e, t, n) {
    Bt(Xd, { selectedNodes: e, selectedEdges: t, selectedPaths: n });
  }
  function ax() {
    return Se(rt(Xd), 'Selections');
  }
  const Jd = Symbol('layouts');
  function lx(e) {
    Bt(Jd, e);
  }
  function Xa() {
    return Se(rt(Jd), 'Layouts');
  }
  function cx(e, t) {
    for (let n = 0; n < e.length - 1; n++) t(e[n], e[n + 1]);
  }
  function jr(e, t) {
    const n = e.indexOf(t);
    n >= 0 && e.splice(n, 1);
  }
  function ux(e, t, n) {
    const r = e.indexOf(t);
    r < 0 || e.splice(r + 1, 0, n);
  }
  function fx(e, t) {
    const n = ['edges', 'edge-labels', 'focusring', 'nodes', 'node-labels', 'paths'];
    return B(() => {
      const r = O0(e.view.builtInLayerOrder)
          .filter((i) => {
            const s = n.includes(i);
            return (s || console.warn(`Layer ${i} is not a built-in layer.`), s);
          })
          .reverse(),
        o = [...n];
      return (
        cx(r, (i, s) => {
          (jr(o, s), ux(o, i, s));
        }),
        'edge-label' in t || 'edges-label' in t || jr(o, 'edge-labels'),
        e.node.focusring.visible || jr(o, 'focusring'),
        e.node.label.visible === !1 && jr(o, 'node-labels'),
        e.path.visible || jr(o, 'paths'),
        o
      );
    });
  }
  const Kc = () => new Promise((e) => mo(e));
  function dx(e, t) {
    const n = Math.max(e.width, e.height, t.width, t.height) / 1e4;
    return (
      Math.abs(e.x - t.x) < n &&
      Math.abs(e.y - t.y) < n &&
      Math.abs(e.width - t.width) < n &&
      Math.abs(e.height - t.height) < n
    );
  }
  function hx(e, t) {
    return {
      top: e.top + t.top,
      left: e.left + t.left,
      right: e.right + t.right,
      bottom: e.bottom + t.bottom,
    };
  }
  function px(e, t) {
    return { top: e.top * t, left: e.left * t, right: e.right * t, bottom: e.bottom * t };
  }
  function gx(e, t) {
    return { top: e.top / t, left: e.left / t, right: e.right / t, bottom: e.bottom / t };
  }
  function Yd(e) {
    return { top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
  }
  function Qd(e) {
    return { x: e.left, y: e.top, width: e.right - e.left, height: e.bottom - e.top };
  }
  function vx(e, t) {
    return {
      top: Math.min(e.top, t.top),
      left: Math.min(e.left, t.left),
      right: Math.max(e.right, t.right),
      bottom: Math.max(e.bottom, t.bottom),
    };
  }
  const mx = new RegExp('^\\d+$');
  function yx(e, t) {
    let n = { top: 0, left: 0, right: 0, bottom: 0 };
    if (typeof e == 'string') {
      const r = lr(e, t.width),
        o = lr(e, t.height);
      r === void 0 || o === void 0
        ? console.warn('Invalid `fitContentMargin` value.', e)
        : (n = { top: o, left: r, right: r, bottom: o });
    } else if (typeof e == 'number') {
      const r = e;
      n = { top: r, left: r, right: r, bottom: r };
    } else {
      if (e.top) {
        const r = lr(e.top, t.height);
        r === void 0 ? console.warn('Invalid `fitContentMargin` value.', e.top) : (n.top = r);
      }
      if (e.left) {
        const r = lr(e.left, t.width);
        r === void 0 ? console.warn('Invalid `fitContentMargin` value.', e.left) : (n.left = r);
      }
      if (e.right) {
        const r = lr(e.right, t.width);
        r === void 0 ? console.warn('Invalid `fitContentMargin` value.', e.right) : (n.right = r);
      }
      if (e.bottom) {
        const r = lr(e.bottom, t.height);
        r === void 0 ? console.warn('Invalid `fitContentMargin` value.', e.bottom) : (n.bottom = r);
      }
    }
    return n;
  }
  function bx(e, t, n, r, o, i) {
    const s = e.getBBox();
    if (i) return xx(s, t, n, o);
    {
      const a = wx(e);
      return Ex(s, a, t, n, r, o);
    }
  }
  function lr(e, t) {
    if (typeof e == 'string') {
      if (e.endsWith('%')) {
        const n = parseInt(e.toString());
        if (Number.isFinite(n)) return t * (n / 100);
      } else if (e.endsWith('px') || mx.test(e)) {
        const n = parseInt(e.toString());
        if (Number.isFinite(n)) return n;
      }
    } else if (typeof e == 'number') return e;
  }
  function wx(e) {
    return Array.from(e.querySelectorAll('.v-ng-graph-objects'))
      .map((t) => t.getBBox())
      .reduce(
        (t, n, r) => {
          if (r === 0) return n;
          const o = Math.min(t.x, n.x),
            i = Math.min(t.y, n.y);
          return {
            x: o,
            y: i,
            width: Math.max(t.x + t.width - o, n.x + n.width - o),
            height: Math.max(t.y + t.height - i, n.y + n.height - i),
          };
        },
        { x: 0, y: 0, width: 0, height: 0 },
      );
  }
  function xx(e, t, n, r) {
    if (Object.keys(n).length <= 1) return;
    const o = eh(e, t, r);
    if (o > 0) {
      const i = Yd(e);
      return { zoom: o, pos: th(i, o, t, r) };
    } else return;
  }
  function Ex(e, t, n, r, o, i) {
    if (Object.keys(r).length <= 1) return;
    const s = rw(r),
      a = {
        top: (s.top - t.y) * o,
        left: (s.left - t.x) * o,
        right: (t.x + t.width - s.right) * o,
        bottom: (t.y + t.height - s.bottom) * o,
      };
    let l = eh(e, n, i);
    if (l === 0) return;
    const u = fi(n, hx(i, a));
    if (u.width <= 0 || u.height <= 0) return;
    const f = Yd(e),
      c = fi(n, i),
      d = dx(e, t);
    let h = 0,
      p = 0,
      m = { top: 0, left: 0, right: 0, bottom: 0 };
    do {
      p = l;
      const g = gx(a, l),
        v = {
          top: s.top - g.top,
          left: s.left - g.left,
          right: s.right + g.right,
          bottom: s.bottom + g.bottom,
        };
      m = d ? v : vx(f, v);
      const b = Qd(m),
        w = [c.width / b.width, c.height / b.height].filter((y) => y > 0);
      if (w.length === 0) return;
      ((l = Math.min(...w)), h++);
    } while (Math.abs(p - l) > 1e-6 && h < 10);
    return { zoom: l, pos: th(m, l, n, i) };
  }
  function eh(e, t, n) {
    if (e.width === 0 || e.height === 0) return 0;
    const r = fi(t, n);
    if (r.width <= 0 || r.height <= 0) return 0;
    const o = [r.width / e.width, r.height / e.height];
    return Math.min(...o);
  }
  function th(e, t, n, r) {
    const o = fi(n, r),
      i = Qd(px(e, t)),
      s = (o.width - i.width) / 2,
      a = (o.height - i.height) / 2,
      l = i.x - r.left,
      u = i.y - r.top;
    return { x: -l + s, y: -u + a };
  }
  function fi(e, t) {
    const n = t.left + t.right,
      r = t.top + t.bottom;
    return { width: e.width - n, height: e.height - r };
  }
  const _x = ['x', 'y', 'width', 'height', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray'],
    Sx = pe({
      __name: 'VSelectionBox',
      props: { box: {}, config: {} },
      setup(e) {
        return (t, n) => (
          N(),
          K(
            'rect',
            {
              class: 'v-ng-selection-box',
              x: Math.round(t.box.pos.x),
              y: Math.round(t.box.pos.y),
              width: Math.ceil(t.box.size.width),
              height: Math.ceil(t.box.size.height),
              fill: t.config.color,
              stroke: t.config.strokeColor,
              'stroke-width': t.config.strokeWidth,
              'stroke-dasharray': t.config.strokeDasharray,
            },
            null,
            8,
            _x,
          )
        );
      },
    }),
    Cx = ['points', 'fill'],
    Tx = pe({
      __name: 'VMarkerHeadArrow',
      props: { width: {}, height: {}, refX: {}, color: {}, isSource: { type: Boolean }, units: {} },
      setup(e) {
        const t = e,
          n = B(() => {
            const r = t.width,
              o = t.height;
            return t.isSource ? `${r} ${o}, 0 ${o / 2}, ${r} 0` : `0 0, ${r} ${o / 2}, 0 ${o}`;
          });
        return (r, o) => (N(), K('polygon', { points: n.value, fill: r.color }, null, 8, Cx));
      },
    }),
    Ox = ['points', 'stroke-width', 'stroke'],
    Px = pe({
      __name: 'VMarkerHeadAngle',
      props: { width: {}, height: {}, refX: {}, color: {}, isSource: { type: Boolean }, units: {} },
      setup(e) {
        const t = e,
          n = B(() => (t.units === 'strokeWidth' ? 1 : Math.min(t.width, t.height) / 5)),
          r = B(() => {
            const o = n.value / 2,
              i = t.width,
              s = t.height;
            return t.isSource
              ? `${i - o} ${s - o}, ${o} ${s / 2}, ${i - o} ${o}`
              : `${o} ${o}, ${i - o} ${s / 2}, ${o} ${s - o}`;
          });
        return (o, i) => (
          N(),
          K(
            'polyline',
            {
              points: r.value,
              fill: 'none',
              'stroke-width': n.value,
              stroke: o.color,
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
            },
            null,
            8,
            Ox,
          )
        );
      },
    }),
    Ax = ['fill', 'cx', 'cy', 'rx', 'ry'],
    Ix = pe({
      __name: 'VMarkerHeadCircle',
      props: { width: {}, height: {}, refX: {}, color: {}, isSource: { type: Boolean }, units: {} },
      setup(e) {
        return (t, n) => (
          N(),
          K(
            'ellipse',
            { fill: t.color, cx: t.width / 2, cy: t.height / 2, rx: t.width / 2, ry: t.height / 2 },
            null,
            8,
            Ax,
          )
        );
      },
    }),
    Mx = ['id', 'markerWidth', 'markerHeight', 'refX', 'refY', 'markerUnits'],
    kx = pe({
      __name: 'VMarkerHead',
      props: { id: {}, marker: {}, scale: {} },
      setup(e) {
        const t = { arrow: Tx, angle: Px, circle: Ix },
          n = e,
          r = B(() => n.marker.width * (n.marker.units === 'strokeWidth' ? 1 : n.scale)),
          o = B(() => n.marker.height * (n.marker.units === 'strokeWidth' ? 1 : n.scale)),
          i = B(() => {
            const a = n.marker.margin * (n.marker.units === 'strokeWidth' ? 1 : n.scale);
            return n.marker.isSource ? r.value + a : -a;
          }),
          s = B(() => {
            const a = n.marker.offset * (n.marker.units === 'strokeWidth' ? 1 : n.scale);
            return n.marker.isSource ? a : -a;
          });
        return (a, l) =>
          a.marker.type !== 'none' && a.marker.type !== 'custom'
            ? (N(),
              K(
                'marker',
                {
                  key: 0,
                  id: a.id,
                  markerWidth: r.value,
                  markerHeight: o.value,
                  refX: i.value,
                  refY: o.value / 2 + s.value,
                  orient: 'auto',
                  markerUnits: a.marker.units,
                  class: 'v-ng-marker',
                },
                [
                  (N(),
                  me(
                    Of(t[a.marker.type]),
                    {
                      width: r.value,
                      height: o.value,
                      refX: i.value,
                      color: a.marker.color,
                      'is-source': a.marker.isSource,
                      units: a.marker.units,
                    },
                    null,
                    8,
                    ['width', 'height', 'refX', 'color', 'is-source', 'units'],
                  )),
                ],
                8,
                Mx,
              ))
            : Xe('', !0);
      },
    }),
    Rx = { class: 'v-ng-background-grid', 'shape-rendering': 'crispEdges' },
    Nx = ['d'],
    Lx = ['d'],
    Dx = ['d'],
    $x = ['d'],
    jx = pe({
      __name: 'VBackgroundGrid',
      setup(e) {
        const { container: t, svgPanZoom: n } = ja(),
          { zoomLevel: r } = Nt(),
          o = Hw(),
          i = B0(),
          s = J({ x: 0, y: 0 }),
          a = J({ width: 500, height: 500 });
        (mn(() => {
          var d;
          const h = (d = n.value) == null ? void 0 : d.getPan();
          h && (s.value = { x: -h.x, y: -h.y });
          const p = t.value.getBoundingClientRect();
          a.value = { width: p.width, height: p.height };
        }),
          o.on('view:resize', (d) => {
            a.value = { width: d.width, height: d.height };
          }),
          o.on('view:pan', (d) => {
            s.value = { x: -d.x, y: -d.y };
          }),
          o.on('view:zoom', () => {
            var d;
            const h = (d = n.value) == null ? void 0 : d.getPan();
            h && (s.value = { x: -h.x, y: -h.y });
          }));
        const l = J([]),
          u = J([]),
          f = J([]),
          c = J([]);
        return (
          Rt(() => {
            const d = [],
              h = [],
              p = [],
              m = [],
              g = 1 / r.value,
              v = i.grid.interval,
              b = s.value.x * g,
              w = s.value.y * g,
              y = Math.floor(a.value.width / v + 1) * v,
              x = Math.floor(a.value.height / v + 1) * v,
              E = (s.value.x + y) * g,
              C = (s.value.y + x) * g,
              P = i.grid.thickIncrements,
              M = i.grid.line.dasharray,
              A = i.grid.thick.dasharray;
            let j = {
                stroke: i.grid.thick.color,
                'stroke-width': i.grid.thick.width,
                'stroke-dasharray': A,
                'stroke-dashoffset': A ? b / g : void 0,
              },
              R = {
                stroke: i.grid.line.color,
                'stroke-width': i.grid.line.width,
                'stroke-dasharray': M,
                'stroke-dashoffset': M ? b / g : void 0,
              };
            const V = (s.value.x + y) * g;
            for (let ne = w; ne <= C; ne += v) {
              const X = Math.floor(ne / v);
              P && X % P === 0 ? d.push([X, X * v, b, V, j]) : p.push([X, X * v, b, V, R]);
            }
            ((j = st({}, j)),
              (j['stroke-dashoffset'] = A ? w / g : void 0),
              (R = st({}, R)),
              (R['stroke-dashoffset'] = M ? w / g : void 0));
            const re = (s.value.y + x) * g;
            for (let ne = b; ne <= E; ne += v) {
              const X = Math.floor(ne / v);
              P && X % P === 0 ? h.push([X, X * v, w, re, j]) : m.push([X, X * v, w, re, R]);
            }
            ((u.value = d), (l.value = h), (c.value = p), (f.value = m));
          }),
          (d, h) => (
            N(),
            K('g', Rx, [
              (N(!0),
              K(
                he,
                null,
                ze(
                  c.value,
                  ([p, m, g, v, b]) => (
                    N(),
                    K(
                      'path',
                      We({ key: `nv${p}`, d: `M ${g} ${m} L ${v} ${m}`, ref_for: !0 }, b, {
                        style: { 'vector-effect': 'non-scaling-stroke' },
                      }),
                      null,
                      16,
                      Nx,
                    )
                  ),
                ),
                128,
              )),
              (N(!0),
              K(
                he,
                null,
                ze(
                  f.value,
                  ([p, m, g, v, b]) => (
                    N(),
                    K(
                      'path',
                      We({ key: `nh${p}`, d: `M ${m} ${g} L ${m} ${v}`, ref_for: !0 }, b, {
                        style: { 'vector-effect': 'non-scaling-stroke' },
                      }),
                      null,
                      16,
                      Lx,
                    )
                  ),
                ),
                128,
              )),
              (N(!0),
              K(
                he,
                null,
                ze(
                  u.value,
                  ([p, m, g, v, b]) => (
                    N(),
                    K(
                      'path',
                      We({ key: `tv${p}`, d: `M ${g} ${m} L ${v} ${m}`, ref_for: !0 }, b, {
                        style: { 'vector-effect': 'non-scaling-stroke' },
                      }),
                      null,
                      16,
                      Dx,
                    )
                  ),
                ),
                128,
              )),
              (N(!0),
              K(
                he,
                null,
                ze(
                  l.value,
                  ([p, m, g, v, b]) => (
                    N(),
                    K(
                      'path',
                      We({ key: `th${p}`, d: `M ${m} ${g} L ${m} ${v}`, ref_for: !0 }, b, {
                        style: { 'vector-effect': 'non-scaling-stroke' },
                      }),
                      null,
                      16,
                      $x,
                    )
                  ),
                ),
                128,
              )),
            ])
          )
        );
      },
    }),
    zx = pe({
      __name: 'VBackgroundViewport',
      setup(e) {
        const { viewport: t } = ja(),
          n = J(),
          r = (i, s, a) => {
            i.forEach((l) => {
              var u;
              return s.setAttribute(l, (u = a.getAttribute(l)) != null ? u : '');
            });
          },
          o = new MutationObserver((i) => {
            if (!n.value) return;
            const s = i
              .map((a) => {
                var l;
                return (l = a.attributeName) != null ? l : '';
              })
              .filter(Boolean);
            r(s, n.value, t.value);
          });
        return (
          mn(() => {
            const i = ['transform', 'style'];
            (o.observe(t.value, { attributes: !0, attributeFilter: i }),
              n.value && r(i, n.value, t.value));
          }),
          tr(() => {
            o.disconnect();
          }),
          (i, s) => (
            N(),
            K(
              'g',
              { ref_key: 'background', ref: n, class: 'v-ng-background-viewport' },
              [Ne(i.$slots, 'default')],
              512,
            )
          )
        );
      },
    }),
    Bx = ['d', 'stroke-width'],
    Fx = pe({
      __name: 'VEdgeBackground',
      props: { id: {}, state: {}, sourcePos: { default: void 0 }, targetPos: { default: void 0 } },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = $i(),
          {
            handleEdgePointerDownEvent: o,
            handleEdgePointerOverEvent: i,
            handleEdgePointerOutEvent: s,
            handleEdgeClickEvent: a,
            handleEdgeDoubleClickEvent: l,
            handleEdgeContextMenu: u,
          } = xo(),
          f = B(() => {
            const d = t.state.position;
            if (t.state.loop) {
              const { radius: h, isLargeArc: p, isClockwise: m } = t.state.loop,
                [g, v] = h,
                b = p ? 1 : 0,
                w = m ? 1 : 0;
              return `M ${d.p1.x} ${d.p1.y} A ${g} ${v} 0 ${b} ${w} ${d.p2.x} ${d.p2.y}`;
            } else {
              if (r.type === 'straight' || !t.state.curve)
                return `M ${d.p1.x} ${d.p1.y} L ${d.p2.x} ${d.p2.y}`;
              {
                const h = [...t.state.curve.control, { x: d.p2.x, y: d.p2.y }],
                  p = [];
                return (
                  p.push(`M ${d.p1.x} ${d.p1.y}`),
                  La(h, 2).forEach(([m, g]) => p.push(`Q ${m.x} ${m.y} ${g.x} ${g.y}`)),
                  p.join(' ')
                );
              }
            }
          }),
          c = B(() => (t.state.line.stroke.width + 10) * n.value);
        return (d, h) => (
          N(),
          K(
            'path',
            {
              class: Be({ 'v-ng-line-background': !0, selectable: d.state.selectable }),
              d: f.value,
              stroke: 'transparent',
              'stroke-width': c.value,
              fill: 'none',
              onPointerdown: h[0] || (h[0] = Vt((p) => L(o)(d.id, p), ['stop'])),
              onPointerenterPassive: h[1] || (h[1] = (p) => L(i)(d.id, p)),
              onPointerleavePassive: h[2] || (h[2] = (p) => L(s)(d.id, p)),
              onClick: h[3] || (h[3] = Vt((p) => L(a)(d.id, p), ['stop'])),
              onDblclick: h[4] || (h[4] = Vt((p) => L(l)(d.id, p), ['stop'])),
              onContextmenu: h[5] || (h[5] = (p) => L(u)(d.id, p)),
            },
            null,
            42,
            Bx,
          )
        );
      },
    }),
    Ux = pe({
      __name: 'VEdgeBackgrounds',
      setup(e) {
        const { edgeStates: t, edgeGroupStates: n, layouts: r } = on();
        return (o, i) => (
          N(!0),
          K(
            he,
            null,
            ze(
              L(n).edgeGroups,
              ({ summarize: s, edges: a }) => (
                N(),
                K(
                  he,
                  null,
                  [
                    s
                      ? Xe('', !0)
                      : (N(!0),
                        K(
                          he,
                          { key: 0 },
                          ze(
                            a,
                            (l, u) => (
                              N(),
                              me(
                                Fx,
                                {
                                  key: u,
                                  id: u,
                                  state: L(t)[u],
                                  'source-pos': L(r).nodes[l.source],
                                  'target-pos': L(r).nodes[l.target],
                                },
                                null,
                                8,
                                ['id', 'state', 'source-pos', 'target-pos'],
                              )
                            ),
                          ),
                          128,
                        )),
                  ],
                  64,
                )
              ),
            ),
            256,
          )
        );
      },
    }),
    Hx = ['d', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap'],
    nh = pe({
      __name: 'VLine',
      props: { p1: {}, p2: {}, config: {} },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = B(() => t.config.width * n.value),
          o = B(() => wo(t.config.dasharray, n.value)),
          i = B(() => {
            const s = t.config.animate
              ? Ni(t.config.dasharray) * t.config.animationSpeed * n.value
              : !1;
            return s ? { '--animation-speed': s } : void 0;
          });
        return (s, a) => (
          N(),
          K(
            'path',
            {
              class: Be({ 'v-ng-line': !0, animate: s.config.animate }),
              d: `M ${s.p1.x} ${s.p1.y} L ${s.p2.x} ${s.p2.y}`,
              stroke: s.config.color,
              'stroke-width': r.value,
              'stroke-dasharray': o.value,
              'stroke-linecap': s.config.linecap,
              style: Ft(i.value),
            },
            null,
            14,
            Hx,
          )
        );
      },
    }),
    Vx = ['d', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap'],
    Zx = pe({
      __name: 'VArc',
      props: {
        p1: {},
        p2: {},
        radius: {},
        isLargeArc: { type: Boolean },
        isClockwise: { type: Boolean },
        config: {},
      },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = B(() => t.config.width * n.value),
          o = B(() => wo(t.config.dasharray, n.value)),
          i = B(() => {
            const a = t.config.animate
              ? Ni(t.config.dasharray) * t.config.animationSpeed * n.value
              : !1;
            return a ? { '--animation-speed': a } : void 0;
          }),
          s = B(() => {
            const { p1: a, p2: l, radius: u, isLargeArc: f, isClockwise: c } = t,
              [d, h] = u,
              p = f ? 1 : 0,
              m = c ? 1 : 0;
            return `M ${a.x} ${a.y} A ${d} ${h} 0 ${p} ${m} ${l.x} ${l.y}`;
          });
        return (a, l) => (
          N(),
          K(
            'path',
            {
              class: Be({ 'v-ng-line': !0, animate: a.config.animate }),
              d: s.value,
              stroke: a.config.color,
              'stroke-width': r.value,
              'stroke-dasharray': o.value,
              'stroke-linecap': a.config.linecap,
              style: Ft(i.value),
              fill: 'none',
            },
            null,
            14,
            Vx,
          )
        );
      },
    }),
    Wx = [
      'd',
      'stroke',
      'stroke-width',
      'stroke-dasharray',
      'stroke-linecap',
      'marker-start',
      'marker-end',
    ],
    Kx = pe({
      __name: 'VEdgeCurved',
      props: {
        state: {},
        config: {},
        markerStart: { default: void 0 },
        markerEnd: { default: void 0 },
      },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = B(() => {
            var a, l;
            const u = t.state.position,
              f = [
                ...((l = (a = t.state.curve) == null ? void 0 : a.control) != null ? l : []),
                { x: u.p2.x, y: u.p2.y },
              ],
              c = [];
            return (
              c.push(`M ${u.p1.x} ${u.p1.y}`),
              La(f, 2).forEach(([d, h]) => c.push(`Q ${d.x} ${d.y} ${h.x} ${h.y}`)),
              c.join(' ')
            );
          }),
          o = B(() => t.config.width * n.value),
          i = B(() => wo(t.config.dasharray, n.value)),
          s = B(() => {
            const a = t.config.animate
              ? Ni(t.config.dasharray) * t.config.animationSpeed * n.value
              : !1;
            return a ? { '--animation-speed': a } : void 0;
          });
        return (a, l) => (
          N(),
          K(
            'path',
            {
              class: Be({ 'v-ng-line': !0, animate: a.config.animate }),
              d: r.value,
              fill: 'none',
              stroke: a.config.color,
              'stroke-width': o.value,
              'stroke-dasharray': i.value,
              'stroke-linecap': a.config.linecap,
              style: Ft(s.value),
              'marker-start': a.markerStart,
              'marker-end': a.markerEnd,
            },
            null,
            14,
            Wx,
          )
        );
      },
    }),
    qx = pe({
      __name: 'VEdge',
      props: { id: {}, state: {}, sourcePos: { default: void 0 }, targetPos: { default: void 0 } },
      setup(e) {
        const t = $i();
        return (n, r) =>
          n.state.loop
            ? (N(),
              me(
                Zx,
                We({ key: 0 }, n.state.position, {
                  radius: n.state.loop.radius,
                  'is-large-arc': n.state.loop.isLargeArc,
                  'is-clockwise': n.state.loop.isClockwise,
                  class: [
                    {
                      selectable: n.state.selectable,
                      hover: n.state.hovered,
                      selected: n.state.selected,
                    },
                    'v-ng-edge',
                  ],
                  config: n.state.line.stroke,
                  'marker-start': n.state.sourceMarkerId
                    ? `url('#${n.state.sourceMarkerId}')`
                    : void 0,
                  'marker-end': n.state.targetMarkerId
                    ? `url('#${n.state.targetMarkerId}')`
                    : void 0,
                }),
                null,
                16,
                [
                  'radius',
                  'is-large-arc',
                  'is-clockwise',
                  'class',
                  'config',
                  'marker-start',
                  'marker-end',
                ],
              ))
            : L(t).type == 'straight' || !n.state.curve
              ? (N(),
                me(
                  nh,
                  We({ key: 1, 'data-edge-id': n.id }, n.state.position, {
                    class: [
                      {
                        selectable: n.state.selectable,
                        hover: n.state.hovered,
                        selected: n.state.selected,
                      },
                      'v-ng-edge',
                    ],
                    config: n.state.line.stroke,
                    'marker-start': n.state.sourceMarkerId
                      ? `url('#${n.state.sourceMarkerId}')`
                      : void 0,
                    'marker-end': n.state.targetMarkerId
                      ? `url('#${n.state.targetMarkerId}')`
                      : void 0,
                  }),
                  null,
                  16,
                  ['data-edge-id', 'class', 'config', 'marker-start', 'marker-end'],
                ))
              : (N(),
                me(
                  Kx,
                  {
                    key: 2,
                    'data-edge-id': n.id,
                    class: Be([
                      {
                        selectable: n.state.selectable,
                        hover: n.state.hovered,
                        selected: n.state.selected,
                      },
                      'v-ng-edge',
                    ]),
                    state: n.state,
                    config: n.state.line.stroke,
                    'marker-start': n.state.sourceMarkerId
                      ? `url('#${n.state.sourceMarkerId}')`
                      : void 0,
                    'marker-end': n.state.targetMarkerId
                      ? `url('#${n.state.targetMarkerId}')`
                      : void 0,
                  },
                  null,
                  8,
                  ['data-edge-id', 'class', 'state', 'config', 'marker-start', 'marker-end'],
                ));
      },
    }),
    Gx = ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray'],
    Xx = [
      'x',
      'y',
      'width',
      'height',
      'rx',
      'ry',
      'fill',
      'stroke',
      'stroke-width',
      'stroke-dasharray',
    ],
    Bi = pe({
      __name: 'VShape',
      props: { baseX: { default: 0 }, baseY: { default: 0 }, config: {} },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = J(t.baseX),
          o = J(t.baseY),
          i = J(0),
          s = J('#000000'),
          a = J(void 0),
          l = J(0),
          u = J(0),
          f = J(0),
          c = J(0);
        return (
          Rt(() => {
            var d;
            const h = n.value;
            ((i.value = t.config.strokeWidth * h),
              (s.value = (d = t.config.strokeColor) != null ? d : 'none'),
              (a.value = wo(t.config.strokeDasharray, h)),
              t.config.type === 'circle'
                ? ((r.value = t.baseX), (o.value = t.baseY), (l.value = t.config.radius * h))
                : ((u.value = t.config.width * h),
                  (f.value = t.config.height * h),
                  (c.value = t.config.borderRadius * h),
                  (r.value = t.baseX - u.value / 2),
                  (o.value = t.baseY - f.value / 2)));
          }),
          (d, h) =>
            d.config.type === 'circle'
              ? (N(),
                K(
                  'circle',
                  {
                    key: 0,
                    class: 'v-ng-shape-circle',
                    cx: r.value,
                    cy: o.value,
                    r: l.value,
                    fill: d.config.color,
                    stroke: s.value,
                    'stroke-width': i.value,
                    'stroke-dasharray': a.value,
                  },
                  null,
                  8,
                  Gx,
                ))
              : (N(),
                K(
                  'rect',
                  {
                    key: 1,
                    class: 'v-ng-shape-rect',
                    x: r.value,
                    y: o.value,
                    width: u.value,
                    height: f.value,
                    rx: c.value,
                    ry: c.value,
                    fill: d.config.color,
                    stroke: s.value,
                    'stroke-width': i.value,
                    'stroke-dasharray': a.value,
                  },
                  null,
                  8,
                  Xx,
                ))
        );
      },
    }),
    Jx = ['rx', 'ry', 'fill', 'transform'],
    Yx = ['x', 'y', 'dominant-baseline', 'font-family', 'font-size', 'fill'],
    Qx = ['x', 'dy', 'dominant-baseline'],
    Fi = pe({
      __name: 'VLabelText',
      props: {
        text: {},
        x: { default: 0 },
        y: { default: 0 },
        dominantBaseline: { default: 'central' },
        config: {},
      },
      setup(e) {
        const t = e,
          n = ug(),
          { scale: r } = Nt(),
          o = B(() => {
            var g, v;
            return (v = (g = t.text) == null ? void 0 : g.toString().split(/\r?\n/)) != null
              ? v
              : '';
          }),
          i = B(() => {
            var g;
            return (g = n['font-size']) != null ? g : t.config.fontSize * r.value;
          }),
          s = B(() => i.value * t.config.lineHeight),
          a = B(() => {
            const g = t.dominantBaseline;
            return g === 'hanging'
              ? 0
              : g === 'central'
                ? -(s.value * (o.value.length - 1)) / 2
                : -s.value * (o.value.length - 1);
          }),
          l = J(),
          u = J(''),
          f = Ot({ x: 0, y: 0, width: 0, height: 0 }),
          c = B(() => {
            var g, v;
            const b = t.config.background;
            if (!b) return f;
            let w, y;
            b.padding instanceof Object
              ? ((w = b.padding.vertical), (y = b.padding.horizontal))
              : ((w = (g = b.padding) != null ? g : 0), (y = (v = b.padding) != null ? v : 0));
            const x = s.value - i.value;
            return {
              x: f.x - y * r.value,
              y: f.y - w * r.value - x / 2,
              width: f.width + y * 2 * r.value,
              height: f.height + w * 2 * r.value + x,
            };
          });
        let d;
        const h = () => {
          t.config.background && t.config.background.visible
            ? !d && l.value && (d = m(l.value, f, u))
            : (d?.disconnect(), (d = void 0));
        };
        (mn(() => h()),
          be(
            () => t.config.background && t.config.background.visible,
            (g, v) => {
              g != v && h();
            },
          ),
          tr(() => {
            (d?.disconnect(), (d = void 0));
          }));
        function p(g, v, b) {
          var w;
          const y = g.getBBox();
          ((v.x = y.x),
            (v.y = y.y),
            (v.width = y.width),
            (v.height = y.height),
            (b.value = (w = g.getAttribute('transform')) != null ? w : void 0));
        }
        function m(g, v, b) {
          const w = new MutationObserver(() => {
            p(g, v, b);
          });
          return (
            w.observe(g, { attributes: !0, attributeFilter: ['x', 'y', 'transform', 'font-size'] }),
            p(g, v, b),
            w
          );
        }
        return (g, v) => {
          var b, w, y, x, E, C;
          return (
            N(),
            K(
              he,
              null,
              [
                g.config.background && g.config.background.visible
                  ? (N(),
                    K(
                      'rect',
                      We({ key: 0, class: 'v-ng-text-background' }, c.value, {
                        rx:
                          ((w = (b = g.config.background) == null ? void 0 : b.borderRadius) != null
                            ? w
                            : 0) * L(r),
                        ry:
                          ((x = (y = g.config.background) == null ? void 0 : y.borderRadius) != null
                            ? x
                            : 0) * L(r),
                        fill:
                          (C = (E = g.config.background) == null ? void 0 : E.color) != null
                            ? C
                            : '#ffffff',
                        transform: u.value,
                      }),
                      null,
                      16,
                      Jx,
                    ))
                  : Xe('', !0),
                ie(
                  'text',
                  We({ ref_key: 'element', ref: l, class: 'v-ng-text' }, g.$attrs, {
                    x: g.x,
                    y: g.y,
                    'dominant-baseline': g.dominantBaseline,
                    'font-family': g.$attrs['font-family']
                      ? `${g.$attrs['font-family']}`
                      : g.config.fontFamily,
                    'font-size': i.value,
                    fill: g.$attrs.fill ? `${g.$attrs.fill}` : g.config.color,
                  }),
                  [
                    o.value.length <= 1
                      ? (N(), K(he, { key: 0 }, [Gf(Wo(g.text), 1)], 64))
                      : (N(!0),
                        K(
                          he,
                          { key: 1 },
                          ze(
                            o.value,
                            (P, M) => (
                              N(),
                              K(
                                'tspan',
                                {
                                  key: M,
                                  x: g.x,
                                  dy: M == 0 ? a.value : s.value,
                                  'dominant-baseline': g.dominantBaseline,
                                },
                                Wo(P),
                                9,
                                Qx,
                              )
                            ),
                          ),
                          128,
                        )),
                  ],
                  16,
                  Yx,
                ),
              ],
              64,
            )
          );
        };
      },
    }),
    eE = pe({
      __name: 'VEdgeSummarized',
      props: { edges: {}, layouts: {} },
      setup(e) {
        const t = e,
          n = $i(),
          {
            handleEdgesPointerDownEvent: r,
            handleEdgesPointerOverEvent: o,
            handleEdgesPointerOutEvent: i,
            handleEdgesClickEvent: s,
            handleEdgesDoubleClickEvent: a,
            handleEdgesContextMenu: l,
          } = xo(),
          { edgeStates: u } = on(),
          f = J({ p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } }),
          c = J({ x: 0, y: 0 });
        Rt(() => {
          const w = Object.keys(t.edges).find((y) => y in u);
          w &&
            ((f.value = u[w].position),
            (c.value = {
              x: (f.value.p1.x + f.value.p2.x) / 2,
              y: (f.value.p1.y + f.value.p2.y) / 2,
            }));
        });
        const d = B(() => Object.keys(t.edges)),
          h = B(() => Q.values(n.summarized.label, t.edges)),
          p = B(() => Q.values(n.summarized.shape, t.edges)),
          m = B(() => Q.values(n.summarized.stroke, t.edges)),
          g = B(() => d.value.some((w) => u[w].hovered)),
          v = B(() => d.value.some((w) => u[w].selectable)),
          b = B(() => d.value.some((w) => u[w].selected));
        return (w, y) => (
          N(),
          K(
            'g',
            {
              class: Be({
                'v-ng-line-summarized': !0,
                hovered: g.value,
                selectable: v.value,
                selected: b.value,
              }),
              onPointerdown: y[0] || (y[0] = Vt((x) => L(r)(d.value, x), ['stop'])),
              onPointerenterPassive: y[1] || (y[1] = (x) => L(o)(d.value, x)),
              onPointerleavePassive: y[2] || (y[2] = (x) => L(i)(d.value, x)),
              onClick: y[3] || (y[3] = Vt((x) => L(s)(d.value, x), ['stop'])),
              onDblclick: y[4] || (y[4] = Vt((x) => L(a)(d.value, x), ['stop'])),
              onContextmenu: y[5] || (y[5] = (x) => L(l)(d.value, x)),
            },
            [
              Te(nh, We(f.value, { config: m.value, 'data-edge-id': d.value[0] }), null, 16, [
                'config',
                'data-edge-id',
              ]),
              Te(Bi, { 'base-x': c.value.x, 'base-y': c.value.y, config: p.value }, null, 8, [
                'base-x',
                'base-y',
                'config',
              ]),
              Te(
                Fi,
                {
                  text: Object.keys(w.edges).length.toString(),
                  x: c.value.x,
                  y: c.value.y,
                  config: h.value,
                  'text-anchor': 'middle',
                  'dominant-baseline': 'central',
                },
                null,
                8,
                ['text', 'x', 'y', 'config'],
              ),
            ],
            34,
          )
        );
      },
    }),
    tE = { class: 'v-ng-edge-overlay' },
    qc = pe({
      __name: 'VEdgeOverlay',
      props: {
        edgeId: { default: void 0 },
        edge: { default: void 0 },
        edges: { default: () => ({}) },
        state: {},
        isSummarized: { type: Boolean },
      },
      setup(e) {
        const t = e,
          { svg: n } = ja(),
          { scale: r } = Nt(),
          o = $i();
        function i() {
          return t.isSummarized ? Q.values(o.summarized.stroke, t.edges) : t.state.line.stroke;
        }
        function s(f) {
          return { source: f.p1, target: f.p2 };
        }
        function a(f) {
          if (f.curve) return f.curve.center;
          {
            const c = f.origin.p1,
              d = f.origin.p2;
            return { x: (c.x + d.x) / 2, y: (c.y + d.y) / 2 };
          }
        }
        function l() {
          var f;
          if (!n.value) return 0;
          const c = (f = t.edgeId) != null ? f : Object.keys(t.edges)[0],
            d = n.value.querySelector(`path[data-edge-id="${c}"]`);
          return d ? d.getTotalLength() : 0;
        }
        function u(f) {
          var c;
          if (!n.value || !isFinite(f)) return t.state.position.p1;
          t.state;
          const d = (c = t.edgeId) != null ? c : Object.keys(t.edges)[0],
            h = n.value.querySelector(`path[data-edge-id="${d}"]`);
          if (!h) return t.state.position.p1;
          const p = h.getPointAtLength(f);
          return { x: p.x, y: p.y };
        }
        return (f, c) => (
          N(),
          K('g', tE, [
            f.isSummarized
              ? Ne(f.$slots, 'default', {
                  key: 0,
                  edges: f.edges,
                  isSummarized: f.isSummarized,
                  stroke: i(),
                  position: s(f.state.origin),
                  center: a(f.state),
                  hovered: f.state.hovered,
                  selected: f.state.selected,
                  scale: L(r),
                  length: l(),
                  pointAtLength: u,
                })
              : Ne(f.$slots, 'default', {
                  key: 1,
                  edgeId: f.edgeId,
                  edge: f.edge,
                  edges: { [f.edgeId]: f.edge },
                  isSummarized: f.isSummarized,
                  stroke: i(),
                  position: s(f.state.origin),
                  center: a(f.state),
                  hovered: f.state.hovered,
                  selected: f.state.selected,
                  scale: L(r),
                  length: l(),
                  pointAtLength: u,
                }),
          ])
        );
      },
    }),
    nE = pe({
      __name: 'VEdgeGroups',
      props: { hasEdgeOverlaySlot: { type: Boolean } },
      setup(e) {
        const { edgeStates: t, edgeZOrderedList: n, layouts: r } = on();
        return (o, i) => (
          N(!0),
          K(
            he,
            null,
            ze(
              L(n),
              (s) => (
                N(),
                K(
                  he,
                  null,
                  [
                    L(mw)(s)
                      ? (N(),
                        K(
                          he,
                          { key: 0 },
                          [
                            (N(),
                            me(
                              eE,
                              { key: s.key, edges: s.group.edges, layouts: L(r).nodes },
                              null,
                              8,
                              ['edges', 'layouts'],
                            )),
                            o.hasEdgeOverlaySlot
                              ? (N(),
                                me(
                                  qc,
                                  {
                                    key: s.key,
                                    edges: s.group.edges,
                                    state: L(t)[Object.keys(s.group.edges)[0]],
                                    'is-summarized': !0,
                                  },
                                  {
                                    default: Ze((a) => [
                                      Ne(o.$slots, 'default', We({ ref_for: !0 }, a)),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['edges', 'state'],
                                ))
                              : Xe('', !0),
                          ],
                          64,
                        ))
                      : (N(),
                        K(
                          he,
                          { key: 1 },
                          [
                            (N(),
                            me(
                              qx,
                              {
                                id: s.key,
                                key: s.key,
                                state: L(t)[s.key],
                                'source-pos': L(r).nodes[s.edge.source],
                                'target-pos': L(r).nodes[s.edge.target],
                              },
                              null,
                              8,
                              ['id', 'state', 'source-pos', 'target-pos'],
                            )),
                            o.hasEdgeOverlaySlot
                              ? (N(),
                                me(
                                  qc,
                                  {
                                    key: s.key,
                                    'edge-id': s.key,
                                    edge: s.edge,
                                    state: L(t)[s.key],
                                    'is-summarized': !1,
                                  },
                                  {
                                    default: Ze((a) => [
                                      Ne(o.$slots, 'default', We({ ref_for: !0 }, a)),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['edge-id', 'edge', 'state'],
                                ))
                              : Xe('', !0),
                          ],
                          64,
                        )),
                  ],
                  64,
                )
              ),
            ),
            256,
          )
        );
      },
    }),
    rE = { class: 'v-ng-layer-edges v-ng-graph-objects' },
    oE = pe({
      __name: 'VEdgesLayer',
      setup(e) {
        const t = Si(),
          n = B(() => 'edge-overlay' in t);
        return (r, o) => (
          N(),
          K('g', rE, [
            Te(Ux),
            Te(
              nE,
              { 'has-edge-overlay-slot': n.value },
              Sa({ _: 2 }, [
                n.value
                  ? {
                      name: 'default',
                      fn: Ze((i) => [Ne(r.$slots, 'edge-overlay', As(ni(i)))]),
                      key: '0',
                    }
                  : void 0,
              ]),
              1032,
              ['has-edge-overlay-slot'],
            ),
          ])
        );
      },
    }),
    iE = pe({
      __name: 'VEdgeLabelPlace',
      props: { edgeId: {}, edge: {}, state: {} },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = B(() =>
            Bd(
              t.state.labelPosition,
              t.state.line.stroke,
              t.state.label.margin,
              t.state.label.padding,
              n.value,
            ),
          );
        return (o, i) =>
          o.state.loop
            ? Xe('', !0)
            : Ne(o.$slots, 'default', {
                key: 0,
                edgeId: o.edgeId,
                edge: o.edge,
                config: o.state.label,
                area: r.value,
                hovered: o.state.hovered,
                selected: o.state.selected,
                scale: L(n),
              });
      },
    }),
    sE = pe({
      __name: 'VEdgeLabelsPlace',
      props: { edges: {}, state: {}, summarizeState: {} },
      setup(e) {
        const t = e,
          { scale: n } = Nt(),
          r = B(() => {
            var o, i;
            return Bd(
              t.state.labelPosition,
              (i = (o = t.summarizeState) == null ? void 0 : o.stroke) != null
                ? i
                : t.state.line.stroke,
              t.state.label.margin,
              t.state.label.padding,
              n.value,
            );
          });
        return (o, i) =>
          o.state.loop
            ? Xe('', !0)
            : Ne(o.$slots, 'default', {
                key: 0,
                edges: o.edges,
                config: o.state.label,
                area: r.value,
                hovered: o.state.hovered,
                selected: o.state.selected,
                scale: L(n),
              });
      },
    }),
    aE = { class: 'v-ng-edge-labels' },
    lE = pe({
      __name: 'VEdgeLabels',
      props: {
        enableEdgeLabel: { type: Boolean, default: !1 },
        enableEdgesLabel: { type: Boolean, default: !1 },
      },
      setup(e) {
        const { edgeStates: t, edgeGroupStates: n, summarizedEdgeStates: r } = on(),
          o = B(() => {
            const s = {},
              a = {};
            return (
              Object.entries(n.edgeGroups).forEach(([l, u]) => {
                Object.keys(u.edges).length > 0 && (u.summarize ? (a[l] = u) : (s[l] = u));
              }),
              { individual: s, summarized: a }
            );
          });
        function i(s) {
          return Object.keys(s.edges)[0];
        }
        return (s, a) => (
          N(),
          K('g', aE, [
            s.enableEdgeLabel
              ? (N(!0),
                K(
                  he,
                  { key: 0 },
                  ze(
                    o.value.individual,
                    (l, u) => (
                      N(),
                      K(
                        he,
                        { key: u },
                        [
                          (N(!0),
                          K(
                            he,
                            null,
                            ze(
                              l.edges,
                              (f, c) => (
                                N(),
                                me(
                                  iE,
                                  { key: c, 'edge-id': c, edge: f, state: L(t)[c] },
                                  {
                                    default: Ze((d) => [
                                      Ne(s.$slots, 'edge-label', We({ ref_for: !0 }, d)),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['edge-id', 'edge', 'state'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        64,
                      )
                    ),
                  ),
                  128,
                ))
              : Xe('', !0),
            s.enableEdgesLabel
              ? (N(!0),
                K(
                  he,
                  { key: 1 },
                  ze(
                    o.value.summarized,
                    (l, u) => (
                      N(),
                      me(
                        sE,
                        {
                          key: u,
                          edges: l.edges,
                          state: L(t)[i(l)],
                          'summarize-state': L(r)[i(l)],
                        },
                        {
                          default: Ze((f) => [Ne(s.$slots, 'edges-label', We({ ref_for: !0 }, f))]),
                          _: 2,
                        },
                        1032,
                        ['edges', 'state', 'summarize-state'],
                      )
                    ),
                  ),
                  128,
                ))
              : Xe('', !0),
          ])
        );
      },
    }),
    cE = pe({
      __name: 'VEdgeLabelsLayer',
      props: {
        enableEdgeLabel: { type: Boolean, default: !1 },
        enableEdgesLabel: { type: Boolean, default: !1 },
      },
      setup(e) {
        return (t, n) => (
          N(),
          me(
            lE,
            {
              'enable-edge-label': t.enableEdgeLabel,
              'enable-edges-label': t.enableEdgesLabel,
              class: 'v-ng-layer-edge-labels v-ng-graph-objects',
            },
            Sa({ _: 2 }, [
              t.enableEdgeLabel
                ? {
                    name: 'edge-label',
                    fn: Ze((r) => [Ne(t.$slots, 'edge-label', As(ni(r)))]),
                    key: '0',
                  }
                : void 0,
              t.enableEdgesLabel
                ? {
                    name: 'edges-label',
                    fn: Ze((r) => [Ne(t.$slots, 'edges-label', As(ni(r)))]),
                    key: '1',
                  }
                : void 0,
            ]),
            1032,
            ['enable-edge-label', 'enable-edges-label'],
          )
        );
      },
    }),
    uE = pe({
      __name: 'VNodeFocusRing',
      props: { id: {}, state: {}, pos: { default: void 0 } },
      setup(e) {
        const t = e,
          n = B(() => {
            var s;
            return ((s = t.pos) == null ? void 0 : s.x) || 0;
          }),
          r = B(() => {
            var s;
            return ((s = t.pos) == null ? void 0 : s.y) || 0;
          }),
          o = Di(),
          i = Ot({});
        return (
          Rt(() => {
            var s, a, l;
            const u = t.state.shape;
            if (u.type === 'circle') {
              const f = {
                type: 'circle',
                radius:
                  u.radius +
                  ((s = u.strokeWidth) != null ? s : 0) / 2 +
                  o.focusring.padding +
                  o.focusring.width / 2,
                color: 'none',
                strokeWidth: o.focusring.width,
                strokeColor: o.focusring.color,
                strokeDasharray: o.focusring.dasharray,
              };
              Object.assign(i, f);
            } else {
              const f = {
                type: 'rect',
                width:
                  u.width +
                  ((a = u.strokeWidth) != null ? a : 0) +
                  o.focusring.padding * 2 +
                  o.focusring.width,
                height:
                  u.height +
                  ((l = u.strokeWidth) != null ? l : 0) +
                  o.focusring.padding * 2 +
                  o.focusring.width,
                borderRadius: u.borderRadius > 0 ? u.borderRadius + o.focusring.padding : 0,
                color: 'none',
                strokeWidth: o.focusring.width,
                strokeColor: o.focusring.color,
                strokeDasharray: o.focusring.dasharray,
              };
              Object.assign(i, f);
            }
          }),
          (s, a) => (
            N(),
            me(
              Bi,
              { class: 'v-ng-node-focusring', 'base-x': n.value, 'base-y': r.value, config: i },
              null,
              8,
              ['base-x', 'base-y', 'config'],
            )
          )
        );
      },
    }),
    fE = { class: 'v-ng-layer-nodes-selections' },
    dE = pe({
      __name: 'VFocusringLayer',
      setup(e) {
        const { nodeStates: t } = on(),
          { selectedNodes: n } = ax(),
          r = Xa();
        return (o, i) => (
          N(),
          K('g', fE, [
            (N(!0),
            K(
              he,
              null,
              ze(
                L(n),
                (s) => (
                  N(),
                  me(uE, { id: s, key: s, state: L(t)[s], pos: L(r).nodes[s] }, null, 8, [
                    'id',
                    'state',
                    'pos',
                  ])
                ),
              ),
              128,
            )),
          ])
        );
      },
    }),
    hE = ['transform'],
    Gc = pe({
      __name: 'VNode',
      props: { id: {}, state: {}, pos: { default: void 0 } },
      setup(e) {
        const t = e,
          n = B(() => {
            var c;
            return ((c = t.pos) == null ? void 0 : c.x) || 0;
          }),
          r = B(() => {
            var c;
            return ((c = t.pos) == null ? void 0 : c.y) || 0;
          }),
          { scale: o } = Nt(),
          {
            handleNodePointerDownEvent: i,
            handleNodePointerOverEvent: s,
            handleNodePointerOutEvent: a,
            handleNodeClickEvent: l,
            handleNodeDoubleClickEvent: u,
            handleNodeContextMenu: f,
          } = xo();
        return (c, d) => (
          N(),
          K(
            'g',
            {
              class: Be({ 'v-ng-node': !0, hover: c.state.hovered, selected: c.state.selected }),
              transform: `translate(${n.value} ${r.value})`,
              onPointerdown: d[0] || (d[0] = Vt((h) => L(i)(c.id, h), ['stop'])),
              onPointerenterPassive: d[1] || (d[1] = (h) => L(s)(c.id, h)),
              onPointerleavePassive: d[2] || (d[2] = (h) => L(a)(c.id, h)),
              onClick: d[3] || (d[3] = Vt((h) => L(l)(c.id, h), ['stop'])),
              onDblclick: d[4] || (d[4] = Vt((h) => L(u)(c.id, h), ['stop'])),
              onContextmenu: d[5] || (d[5] = (h) => L(f)(c.id, h)),
            },
            [
              Ne(
                c.$slots,
                'override-node',
                {
                  nodeId: c.id,
                  scale: L(o),
                  config: c.state.shape,
                  class: Be({ draggable: c.state.draggable, selectable: c.state.selectable }),
                },
                () => [
                  Te(
                    Bi,
                    {
                      config: c.state.shape,
                      class: Be({
                        'v-ng-node-default': !0,
                        draggable: c.state.draggable,
                        selectable: c.state.selectable,
                      }),
                    },
                    null,
                    8,
                    ['config', 'class'],
                  ),
                ],
              ),
            ],
            42,
            hE,
          )
        );
      },
    }),
    pE = pe({
      __name: 'VNodesLayer',
      setup(e) {
        const t = Si(),
          n = B(() => 'override-node' in t),
          { nodeZOrderedList: r } = on(),
          o = Di(),
          i = Xa();
        return (s, a) =>
          n.value
            ? (N(),
              me(
                lo,
                {
                  key: 0,
                  name: L(o).transition,
                  css: !!L(o).transition,
                  tag: 'g',
                  class: 'v-ng-layer-nodes v-ng-graph-objects',
                },
                {
                  default: Ze(() => [
                    (N(!0),
                    K(
                      he,
                      null,
                      ze(
                        L(r),
                        (l) => (
                          N(),
                          me(
                            Gc,
                            { id: l.id, key: l.id, state: l, pos: L(i).nodes[l.id] },
                            {
                              'override-node': Ze((u) => [
                                Ne(s.$slots, 'override-node', We({ ref_for: !0 }, u)),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['id', 'state', 'pos'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 3,
                },
                8,
                ['name', 'css'],
              ))
            : (N(),
              me(
                lo,
                {
                  key: 1,
                  name: L(o).transition,
                  css: !!L(o).transition,
                  tag: 'g',
                  class: 'v-ng-layer-nodes v-ng-graph-objects',
                },
                {
                  default: Ze(() => [
                    (N(!0),
                    K(
                      he,
                      null,
                      ze(
                        L(r),
                        (l) => (
                          N(),
                          me(
                            Gc,
                            { id: l.id, key: l.id, state: l, pos: L(i).nodes[l.id] },
                            null,
                            8,
                            ['id', 'state', 'pos'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 1,
                },
                8,
                ['name', 'css'],
              ));
      },
    }),
    rh = {
      [fe.NORTH]: 0,
      [fe.NORTH_EAST]: 1,
      [fe.EAST]: 2,
      [fe.SOUTH_EAST]: 3,
      [fe.SOUTH]: 4,
      [fe.SOUTH_WEST]: 5,
      [fe.WEST]: 6,
      [fe.NORTH_WEST]: 7,
      [fe.CENTER]: -1,
    },
    gE = [
      (e, t) => xn(e, 0, t ? 90 : 60),
      (e, t) => xn(e, 45, t ? 90 : 45),
      (e, t) => xn(e, 90, t ? 60 : 30),
      (e, t) => xn(e, 135, t ? 90 : 45),
      (e, t) => xn(e, 180, t ? 90 : 60),
      (e, t) => xn(e, 225, t ? 90 : 45),
      (e, t) => xn(e, 270, t ? 60 : 30),
      (e, t) => xn(e, 315, t ? 90 : 45),
    ];
  function vE(e, t, n, r, o) {
    if (o === fe.CENTER) return fe.CENTER;
    const i = [];
    Object.entries(n).forEach(([l, u]) => {
      let f = !1;
      if (u.nodeId === e) {
        const d = r(l);
        d && ((f = !0), (u = Ri(st({}, u), { pos: { x: d.x, y: d.y } })));
      }
      const c = (Za(za(u.pos, t)) + 360 + 90) % 360;
      i.push([c, f]);
    });
    const s = mE(o),
      a = [
        s,
        (s + 4) % 8,
        (s + 2) % 8,
        (s - 2 + 8) % 8,
        (s + 1) % 8,
        (s - 1 + 8) % 8,
        (s + 3) % 8,
        (s - 3 + 8) % 8,
      ].find((l) => i.every((u) => !gE[l](...u)));
    return a === void 0 ? o : yE(a, o);
  }
  function xn(e, t, n) {
    e %= 360;
    const r = (t - n + 360) % 360,
      o = (t + n) % 360;
    return r <= o ? r < e && e < o : r < e || e < o;
  }
  function mE(e) {
    var t;
    return (t = rh[e]) != null ? t : 0;
  }
  function yE(e, t) {
    var n, r;
    return (r = (n = Object.entries(rh)[e]) == null ? void 0 : n[0]) != null ? r : t;
  }
  const bE = ['transform'],
    Xc = pe({
      __name: 'VNodeLabel',
      props: { id: {}, state: {}, pos: { default: void 0 } },
      setup(e) {
        const t = e,
          n = Di(),
          { edgeStates: r } = on(),
          { scale: o } = Nt(),
          {
            handleNodePointerDownEvent: i,
            handleNodePointerOverEvent: s,
            handleNodePointerOutEvent: a,
            handleNodeClickEvent: l,
            handleNodeDoubleClickEvent: u,
            handleNodeContextMenu: f,
          } = xo(),
          c = B(() => {
            var A;
            return ((A = t.pos) == null ? void 0 : A.x) || 0;
          }),
          d = B(() => {
            var A;
            return ((A = t.pos) == null ? void 0 : A.y) || 0;
          }),
          h = B(() => (t.state.label.direction === fe.CENTER ? 0 : t.state.label.margin * o.value)),
          p = J(0),
          m = J(0),
          g = J(0),
          v = J(0),
          b = B(() => {
            var A;
            const j = t.state.label.direction,
              R = t.state.label.directionAutoAdjustment;
            if (R === !1) return j;
            const V = { x: c.value, y: d.value };
            return R === !0
              ? vE(
                  t.state.id,
                  V,
                  t.state.oppositeNodes,
                  (re) => {
                    var ne, X;
                    return (X = (ne = r[re]) == null ? void 0 : ne.loop) == null
                      ? void 0
                      : X.center;
                  },
                  j,
                )
              : (A = R({ nodeId: t.state.id, pos: V, oppositeNodes: t.state.oppositeNodes })) !=
                  null
                ? A
                : j;
          }),
          w = B(() => {
            switch (b.value) {
              case fe.CENTER:
              case fe.NORTH:
              case fe.SOUTH:
                return 'middle';
              case fe.EAST:
              case fe.NORTH_EAST:
              case fe.SOUTH_EAST:
                return 'start';
              case fe.WEST:
              case fe.NORTH_WEST:
              case fe.SOUTH_WEST:
              default:
                return 'end';
            }
          }),
          y = B(() => {
            switch (b.value) {
              case fe.NORTH:
              case fe.NORTH_EAST:
              case fe.NORTH_WEST:
                return 'text-top';
              case fe.SOUTH:
              case fe.SOUTH_EAST:
              case fe.SOUTH_WEST:
                return 'hanging';
              case fe.CENTER:
              case fe.EAST:
              case fe.WEST:
              default:
                return 'central';
            }
          }),
          x = B(() => {
            switch (b.value) {
              case fe.CENTER:
              case fe.NORTH:
              case fe.SOUTH:
                return 0;
              case fe.EAST:
                return m.value;
              case fe.WEST:
                return -m.value;
              case fe.NORTH_EAST:
              case fe.SOUTH_EAST:
                return v.value;
              case fe.NORTH_WEST:
              case fe.SOUTH_WEST:
              default:
                return -v.value;
            }
          }),
          E = B(() => {
            switch (b.value) {
              case fe.NORTH:
                return -p.value;
              case fe.SOUTH:
                return p.value;
              case fe.CENTER:
              case fe.EAST:
              case fe.WEST:
                return 0;
              case fe.NORTH_EAST:
              case fe.NORTH_WEST:
                return -g.value;
              case fe.SOUTH_EAST:
              case fe.SOUTH_WEST:
              default:
                return g.value;
            }
          });
        Rt(() => {
          const A = o.value,
            j = t.state.shape;
          if (j.type == 'circle') {
            const R = j.radius * A,
              V = R + h.value,
              re = Math.sqrt(bt(V, 2) / 2);
            ((p.value = R + h.value), (m.value = R + h.value), (g.value = re), (v.value = re));
          } else {
            const R = j.borderRadius * A,
              V = j.width * A,
              re = j.height * A,
              ne = R + h.value,
              X = Math.sqrt(bt(ne, 2) / 2);
            ((p.value = re / 2 + h.value),
              (m.value = V / 2 + h.value),
              (g.value = re / 2 - R + X),
              (v.value = V / 2 - R + X));
          }
        });
        const C = B(
            () => (A) =>
              n.label.handleNodeEvents
                ? {
                    pointerdown: (j) => {
                      (j.stopPropagation(), i(A, j));
                    },
                    pointerenter: (j) => s(A, j),
                    pointerleave: (j) => a(A, j),
                    click: (j) => {
                      (j.stopPropagation(), l(A, j));
                    },
                    dblclick: (j) => {
                      (j.stopPropagation(), u(A, j));
                    },
                    contextmenu: (j) => {
                      f(A, j);
                    },
                  }
                : {},
          ),
          P = B(() => {
            const A = n.label.handleNodeEvents;
            return {
              'v-ng-node-label': !0,
              hover: A && t.state.hovered,
              selected: A && t.state.selected,
            };
          }),
          M = B(() => {
            const A = n.label.handleNodeEvents;
            return { draggable: A && t.state.draggable, selectable: A && t.state.selectable };
          });
        return (A, j) => (
          N(),
          K(
            'g',
            We(
              { class: P.value, transform: `translate(${c.value} ${d.value})` },
              lg(C.value(A.id)),
            ),
            [
              Ne(
                A.$slots,
                'override-node-label',
                {
                  nodeId: A.id,
                  scale: L(o),
                  text: A.state.labelText,
                  x: x.value,
                  y: E.value,
                  config: A.state.label,
                  shape: A.state.shape,
                  textAnchor: w.value,
                  dominantBaseline: y.value,
                  class: Be(M.value),
                },
                () => [
                  Te(
                    Fi,
                    {
                      text: A.state.labelText,
                      x: 0,
                      y: 0,
                      config: A.state.label,
                      'text-anchor': w.value,
                      'dominant-baseline': y.value,
                      class: Be(M.value),
                      transform: `translate(${x.value} ${E.value})`,
                    },
                    null,
                    8,
                    ['text', 'config', 'text-anchor', 'dominant-baseline', 'class', 'transform'],
                  ),
                ],
              ),
            ],
            16,
            bE,
          )
        );
      },
    }),
    wE = pe({
      __name: 'VNodeLabelsLayer',
      setup(e) {
        const t = Si(),
          n = B(() => 'override-node-label' in t),
          { nodeZOrderedList: r } = on(),
          o = Di(),
          i = Xa(),
          s = B(() => a(r.value));
        function a(l) {
          return l.filter((u) => {
            var f;
            return u.label.visible && ((f = u.labelText) != null ? f : !1);
          });
        }
        return (l, u) =>
          n.value
            ? (N(),
              me(
                lo,
                {
                  key: 0,
                  name: L(o).transition,
                  css: !!L(o).transition,
                  tag: 'g',
                  class: 'v-ng-layer-node-labels v-ng-graph-objects',
                },
                {
                  default: Ze(() => [
                    (N(!0),
                    K(
                      he,
                      null,
                      ze(
                        s.value,
                        (f) => (
                          N(),
                          me(
                            Xc,
                            { id: f.id, key: f.id, state: f, pos: L(i).nodes[f.id] },
                            {
                              'override-node-label': Ze((c) => [
                                Ne(l.$slots, 'override-node-label', We({ ref_for: !0 }, c)),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['id', 'state', 'pos'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 3,
                },
                8,
                ['name', 'css'],
              ))
            : (N(),
              me(
                lo,
                {
                  key: 1,
                  name: L(o).transition,
                  css: !!L(o).transition,
                  tag: 'g',
                  class: 'v-ng-layer-node-labels v-ng-graph-objects',
                },
                {
                  default: Ze(() => [
                    (N(!0),
                    K(
                      he,
                      null,
                      ze(
                        s.value,
                        (f) => (
                          N(),
                          me(
                            Xc,
                            { id: f.id, key: f.id, state: f, pos: L(i).nodes[f.id] },
                            null,
                            8,
                            ['id', 'state', 'pos'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 1,
                },
                8,
                ['name', 'css'],
              ));
      },
    }),
    xE = ['d', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin'],
    EE = pe({
      __name: 'VPath',
      props: { path: {} },
      setup(e) {
        const t = e,
          { nodeStates: n, edgeStates: r, layouts: o } = on(),
          { scale: i } = Nt(),
          s = kd();
        function a(d) {
          if (d.edges.length === 0) return [];
          const h = Q.value(s.margin, d.path) * i.value;
          return iw(d, n, o.nodes, r, i.value, s.curveInNode, s.end, h);
        }
        function l(d) {
          const h = a(d);
          let p = !0;
          return h
            .map((m) => {
              if (m === null) p = !0;
              else {
                if (typeof m == 'string') return m;
                if (m instanceof Array) {
                  m = [...m];
                  const g = [];
                  if (m.length % 2 === 1) {
                    const v = m[0];
                    ((m = m.slice(1)), g.push(`L ${v.x} ${v.y}`));
                  }
                  return (
                    La(m, 2).map(([v, b]) => g.push(`Q ${v.x} ${v.y} ${b.x} ${b.y}`)),
                    g.join(' ')
                  );
                } else {
                  const g = p;
                  return ((p = !1), `${g ? 'M ' : 'L '}${m.x} ${m.y}`);
                }
              }
            })
            .join(' ');
        }
        const u = B(() => {
            const d = t.path;
            return d.selected
              ? Q.values(s.selected, d.path)
              : d.hovered && s.hover
                ? Q.values(s.hover, d.path)
                : Q.values(s.normal, d.path);
          }),
          f = B(() => wo(u.value.dasharray, i.value)),
          c = B(() => {
            const d = u.value.animate
              ? Ni(u.value.dasharray) * u.value.animationSpeed * i.value
              : !1;
            return d ? { '--animation-speed': d } : void 0;
          });
        return (d, h) => (
          N(),
          K(
            'path',
            {
              class: Be({
                'v-ng-path': !0,
                animate: u.value.animate,
                clickable: d.path.clickable,
                hoverable: d.path.hoverable,
              }),
              d: l(d.path),
              fill: 'none',
              stroke: u.value.color,
              'stroke-width': u.value.width * L(i),
              'stroke-dasharray': f.value,
              'stroke-linecap': u.value.linecap,
              'stroke-linejoin': u.value.linejoin,
              style: Ft(c.value),
            },
            null,
            14,
            xE,
          )
        );
      },
    }),
    _E = pe({
      __name: 'VPaths',
      setup(e) {
        const { pathZOrderedList: t } = on(),
          n = kd(),
          {
            handlePathPointerDownEvent: r,
            handlePathPointerOverEvent: o,
            handlePathPointerOutEvent: i,
            handlePathClickEvent: s,
            handlePathDoubleClickEvent: a,
            handlePathContextMenu: l,
          } = xo();
        return (u, f) => (
          N(),
          me(
            lo,
            {
              name: L(n).transition,
              css: !!L(n).transition,
              tag: 'g',
              class: 'v-ng-paths v-ng-layer-paths v-ng-graph-objects',
            },
            {
              default: Ze(() => [
                (N(!0),
                K(
                  he,
                  null,
                  ze(
                    L(t),
                    (c) => (
                      N(),
                      me(
                        EE,
                        {
                          key: c.id,
                          path: c,
                          onPointerdown: (d) => L(r)(c.id, d),
                          onPointerenterPassive: (d) => L(o)(c.id, d),
                          onPointerleavePassive: (d) => L(i)(c.id, d),
                          onClick: Vt((d) => L(s)(c.id, d), ['stop']),
                          onDblclick: Vt((d) => L(a)(c.id, d), ['stop']),
                          onContextmenu: (d) => L(l)(c.id, d),
                        },
                        null,
                        8,
                        [
                          'path',
                          'onPointerdown',
                          'onPointerenterPassive',
                          'onPointerleavePassive',
                          'onClick',
                          'onDblclick',
                          'onContextmenu',
                        ],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
              _: 1,
            },
            8,
            ['name', 'css'],
          )
        );
      },
    }),
    SE = pe({
      __name: 'VPathsLayer',
      setup(e) {
        return (t, n) => (N(), me(_E));
      },
    }),
    CE = { key: 0 },
    TE = pe({
      __name: 'VNetworkGraph',
      props: {
        nodes: { default: () => ({}) },
        edges: { default: () => ({}) },
        paths: { default: () => ({}) },
        layouts: { default: () => ({}) },
        zoomLevel: { default: 1 },
        selectedNodes: { default: () => [] },
        selectedEdges: { default: () => [] },
        selectedPaths: { default: () => [] },
        configs: { default: () => ({}) },
        layers: { default: () => ({}) },
        eventHandlers: { default: () => ({}) },
      },
      emits: [
        'update:zoomLevel',
        'update:selectedNodes',
        'update:selectedEdges',
        'update:selectedPaths',
        'update:layouts',
      ],
      setup(e, { expose: t, emit: n }) {
        const r = [
            'override-node',
            'override-node-label',
            'edge-overlay',
            'edge-label',
            'edges-label',
          ],
          o = e,
          i = n,
          s = Si(),
          a = en(o, 'nodes'),
          l = en(o, 'edges'),
          { objects: u, isInCompatibilityModeForPath: f } = ox(en(o, 'paths')),
          c = Uw();
        Object.entries(o.eventHandlers).forEach(([k, ae]) => {
          c.on(k, ae);
        });
        const d = z0(en(o, 'configs')),
          h = B(() => {
            const k = new Set(Object.keys(s));
            r.forEach((oe) => k.delete(oe));
            const ae = Object.fromEntries(R0.map((oe) => [oe, []]));
            return (
              Object.assign(
                ae,
                Object.entries(o.layers).reduce(
                  (oe, [ve, Ge]) => (
                    k.delete(ve),
                    Ge in oe ? oe[Ge].push(ve) : (oe[Ge] = [ve]),
                    oe
                  ),
                  {},
                ),
              ),
              ae.root.push(...k),
              ae
            );
          }),
          p = B(() => d.view.grid.visible),
          m = B(() => {
            const k = h.value;
            return p.value || k.background.length > 0 || k.grid.length > 0;
          }),
          g = fx(d, s),
          v = J(),
          b = J(),
          w = J(),
          y = J(0),
          x = B(() => y.value !== 0),
          E = ix(
            o,
            'zoomLevel',
            i,
            (k) => (
              (k = Math.max(k, d.view.minZoomLevel)),
              (k = Math.min(k, d.view.maxZoomLevel)),
              k
            ),
          ),
          {
            svgPanZoom: C,
            onSvgPanZoomMounted: P,
            onSvgPanZoomUnmounted: M,
          } = ex(b, {
            viewportSelector: '.v-ng-viewport',
            minZoom: d.view.minZoomLevel,
            maxZoom: d.view.maxZoomLevel,
            dblClickZoomEnabled: bn(d.view),
            mouseWheelZoomEnabled: sr(d.view),
            fit: d.view.autoPanAndZoomOnLoad === 'fit-content',
            center: d.view.autoPanAndZoomOnLoad !== !1,
            zoomEnabled: d.view.zoomEnabled,
            preventMouseEventsDefault: !1,
            onZoom: (k) => {
              var ae, oe;
              if (y.value === 2) return;
              const ve = (oe = (ae = C.value) == null ? void 0 : ae.getRealZoom()) != null ? oe : 1;
              Math.abs(E.value - ve) >= 1e-6 && ((E.value = ve), c.emit('view:zoom', ve));
            },
            panEnabled: d.view.panEnabled,
            onPan: (k) => {
              y.value !== 2 && c.emit('view:pan', k);
            },
          });
        N0({ container: v, svg: b, viewport: w, svgPanZoom: C });
        const A = { width: 0, height: 0 },
          j = globalThis.ResizeObserver
            ? new ResizeObserver(() => {
                var k, ae, oe;
                if (((k = C.value) == null || k.resize(), !d.view.autoPanOnResize)) return;
                const ve = (ae = v.value) == null ? void 0 : ae.getBoundingClientRect();
                if (ve) {
                  const Ge = -(A.width - ve.width) / 2,
                    kr = -(A.height - ve.height) / 2;
                  (oe = C.value) == null || oe.panBy({ x: Ge, y: kr });
                  const { width: sn, height: Gi } = ve;
                  (A.width !== sn || A.height !== Gi) &&
                    (Object.assign(A, { width: sn, height: Gi }),
                    c.emit('view:resize', { x: ve.x, y: ve.y, width: sn, height: Gi }));
                }
              })
            : void 0;
        (P(() => {
          var k, ae, oe;
          const ve = Se(v.value, 'svg-pan-zoom container');
          (j?.observe(ve),
            (ae = (k = d.view).onSvgPanZoomInitialized) == null ||
              ae.call(k, Se(C.value, 'svg-pan-zoom instance')));
          const Ge = ve.getBoundingClientRect(),
            { width: kr, height: sn } = Ge;
          (Object.assign(A, { width: kr, height: sn }),
            (oe = w.value) == null || oe.addEventListener('touchstart', ut, { passive: !1 }));
        }),
          M(() => {
            var k;
            (j?.disconnect(), (k = w.value) == null || k.removeEventListener('touchstart', ut));
          }));
        const R = (k) => {
          var ae;
          (ae = C.value) == null ||
            ae.applyAbsoluteZoomLevel(k, d.view.minZoomLevel, d.view.maxZoomLevel);
        };
        (be(
          () => d.view.panEnabled,
          (k) => {
            var ae;
            (ae = C.value) == null || ae.setPanEnabled(k);
          },
        ),
          be(
            () => [d.view.zoomEnabled, bn(d.view), sr(d.view)],
            () => {
              const k = C.value;
              k &&
                Lt(
                  k,
                  d.view.zoomEnabled,
                  d.view.doubleClickZoomEnabled,
                  d.view.mouseWheelZoomEnabled,
                );
            },
          ),
          be(E, (k) => R(k)),
          be(
            () => [d.view.minZoomLevel, d.view.maxZoomLevel],
            (k) => {
              R(E.value);
            },
          ));
        const { scale: V } = tx(E, d.view);
        P(() => {
          const k = o.zoomLevel;
          R(k);
        });
        const re = () =>
            Qt(this, null, function* () {
              var k;
              Object.keys(o.nodes).length > 0 &&
                ((k = C.value) == null || k.updateBBox(), yield Kc());
            }),
          ne = (k) =>
            Qt(this, null, function* () {
              var ae, oe;
              const ve = !k || k.margin === void 0 ? d.view.fitContentMargin : k.margin;
              yield re();
              const Ge = Se(b.value).getBoundingClientRect(),
                kr = yx(ve, Ge),
                sn = bx(Se(w.value), Ge, He.nodes, E.value, kr, d.view.scalingObjects);
              (sn
                ? (R(sn.zoom), (ae = C.value) == null || ae.pan(sn.pos))
                : (oe = C.value) == null || oe.center(),
                c.emit('view:fit', void 0));
            }),
          X = () =>
            Qt(this, null, function* () {
              var k;
              (yield re(), (k = C.value) == null || k.center());
            }),
          le = () => {
            var k, ae;
            return (ae = (k = C.value) == null ? void 0 : k.getViewBox()) != null
              ? ae
              : { top: 0, bottom: 0, left: 0, right: 0 };
          },
          te = (k) => {
            var ae;
            return (ae = C.value) == null ? void 0 : ae.setViewBox(k);
          },
          Oe = ws(o, 'selectedNodes', a, i);
        be(Oe, (k) => c.emit('node:select', Array.from(k)));
        const qe = ws(o, 'selectedEdges', l, i);
        be(qe, (k) => c.emit('edge:select', Array.from(k)));
        const we = ws(o, 'selectedPaths', u, i);
        (be(we, (k) => c.emit('path:select', Array.from(k))), sx(Oe, qe, we));
        const Ie = In(new Set()),
          Ye = In(new Set()),
          at = In(new Set()),
          He = In({ nodes: {} });
        (lx(He),
          be(
            () => o.layouts,
            () => {
              var k;
              return Object.assign(He.nodes, (k = o.layouts.nodes) != null ? k : {});
            },
            { deep: !0, immediate: !0 },
          ),
          be(He, () => i('update:layouts', He), { deep: !0 }));
        const H = fw(),
          O = J(!1);
        (c.on('node:dragstart', (k) => (O.value = !0)),
          c.on('node:dragend', (k) => (O.value = !1)),
          c.on('view:mode', (k) => {
            var ae, oe, ve, Ge;
            (d.view.panEnabled &&
              (k === 'default'
                ? (ae = C.value) == null || ae.enablePan()
                : (oe = C.value) == null || oe.disablePan()),
              d.view.zoomEnabled &&
                (k === 'default'
                  ? (ve = C.value) == null || ve.enableZoom()
                  : (Ge = C.value) == null || Ge.disableZoom()));
          }));
        const Z = B(() => d.view.panEnabled || d.view.zoomEnabled || d.node.draggable),
          {
            nodeStates: U,
            edgeStates: ee,
            pathStates: xe,
          } = vw(hs(a, Oe, Ie), hs(l, qe, Ye), hs(u, we, at), An(d), He, o.layouts, H, V),
          _ = B(() => sr(d.view)),
          {
            isBoxSelectionMode: S,
            selectionBox: T,
            startBoxSelection: D,
            stopBoxSelection: z,
          } = Bw(b, An(He), An(E), U, ee, xe, Oe, qe, we, Ie, Ye, at, f, _, d, c),
          $ = () => ({
            layouts: In(He.nodes),
            nodePositions: en(He, 'nodes'),
            nodes: a,
            edges: l,
            configs: An(d),
            scale: An(V),
            emitter: c,
            svgPanZoom: Se(C.value),
          });
        be(
          () => d.view.layoutHandler,
          (k, ae) => {
            (ae.deactivate(), k.activate($()));
          },
        );
        const { transitionWhile: G, transitionOption: q } = rx(),
          W = B(() => {
            const k = q.value;
            return k.enabled
              ? {
                  '--transition-duration': k.duration + 'ms',
                  '--transition-function': k.timingFunction,
                }
              : {};
          });
        (P(() =>
          Qt(this, null, function* () {
            if (d.view.onBeforeInitialDisplay) {
              const oe = d.view.onBeforeInitialDisplay();
              H0(oe) && (yield oe);
            }
            const k = Se(C.value, 'svg-pan-zoom');
            (d.view.layoutHandler.activate($()), yield Kc());
            const ae = d.view.autoPanAndZoomOnLoad;
            if (d.view.fit || ae !== !1) {
              const oe = Object.keys(o.nodes).length == 0,
                ve = k.getPan();
              if (oe || ae === 'center-zero') {
                yield re();
                const Ge = k.getSizes();
                k.pan({ x: Ge.width / 2, y: Ge.height / 2 });
              } else
                ae === 'fit-content' || d.view.fit
                  ? yield ne()
                  : ae === 'center-content'
                    ? yield X()
                    : yield re();
              mo(() => {
                const Ge = k.getPan();
                ve.x === Ge.x && ve.y === Ge.y && c.emit('view:pan', Ge);
              });
            } else yield re();
            (c.emit('view:load'), (y.value = 1));
          }),
        ),
          M(() => {
            ((y.value = 2), c.emit('view:unload'), d.view.layoutHandler.deactivate());
          }));
        function F() {
          var k;
          (k = C.value) == null || k.zoomIn();
        }
        function ce() {
          var k;
          (k = C.value) == null || k.zoomOut();
        }
        function Y(k) {
          var ae;
          (ae = C.value) == null || ae.pan(k);
        }
        function se(k) {
          var ae;
          (ae = C.value) == null || ae.panBy(k);
        }
        function de() {
          return Se(C.value).getPan();
        }
        function _e() {
          const k = Se(C.value).getSizes();
          return { width: k.width, height: k.height, viewBox: k.viewBox };
        }
        function Re(k) {
          return Ys(Se(b.value, 'svg'), Se(w.value, 'viewport'), k);
        }
        function Pe(k) {
          return Rw(Se(b.value, 'svg'), Se(w.value, 'viewport'), k);
        }
        function lt() {
          return Wd(Se(b.value, 'svg'), Se(w.value, 'viewport'), V.value).outerHTML;
        }
        function ct() {
          return Qt(this, arguments, function* (k = {}) {
            return (yield Pt(k)).outerHTML;
          });
        }
        function Pt() {
          return Qt(this, arguments, function* (k = {}) {
            return Lw(Se(b.value, 'svg'), Se(w.value, 'viewport'), V.value, k);
          });
        }
        t({
          fitToContents: ne,
          panToCenter: X,
          getViewBox: le,
          setViewBox: te,
          transitionWhile: G,
          startBoxSelection: D,
          stopBoxSelection: z,
          zoomIn: F,
          zoomOut: ce,
          panTo: Y,
          panBy: se,
          getPan: de,
          getSizes: _e,
          translateFromDomToSvgCoordinates: Re,
          translateFromSvgToDomCoordinates: Pe,
          getAsSvg: lt,
          exportAsSvgText: ct,
          exportAsSvgElement: Pt,
        });
        function Lt(k, ae, oe, ve) {
          (k.setZoomEnabled(ae),
            ae && oe ? k.enableDblClickZoom() : k.disableDblClickZoom(),
            ae && ve ? k.enableMouseWheelZoom() : k.disableMouseWheelZoom());
        }
        function bn(k) {
          return k.zoomEnabled && k.doubleClickZoomEnabled;
        }
        function sr(k) {
          return k.zoomEnabled && k.mouseWheelZoomEnabled;
        }
        function ut(k) {
          k.stopPropagation();
        }
        return (k, ae) => (
          N(),
          K(
            'div',
            { ref_key: 'container', ref: v, class: 'v-network-graph v-ng-container' },
            [
              (N(),
              K(
                'svg',
                {
                  ref_key: 'svg',
                  ref: b,
                  class: Be([
                    'v-ng-canvas',
                    {
                      show: x.value,
                      dragging: O.value,
                      touches: Z.value,
                      'box-selection-mode': L(S),
                    },
                  ]),
                  width: '100%',
                  height: '100%',
                },
                [
                  (N(!0),
                  K(
                    he,
                    null,
                    ze(h.value.root, (oe) => Ne(k.$slots, oe, { key: oe, scale: L(V) })),
                    128,
                  )),
                  Object.keys(L(H).markers).length > 0
                    ? (N(),
                      K('defs', CE, [
                        (N(!0),
                        K(
                          he,
                          null,
                          ze(
                            L(H).markers,
                            (oe, ve) => (
                              N(),
                              me(kx, { id: ve, key: ve, marker: oe, scale: L(V) }, null, 8, [
                                'id',
                                'marker',
                                'scale',
                              ])
                            ),
                          ),
                          128,
                        )),
                      ]))
                    : Xe('', !0),
                  m.value
                    ? (N(),
                      me(
                        zx,
                        { key: 1 },
                        {
                          default: Ze(() => [
                            (N(!0),
                            K(
                              he,
                              null,
                              ze(
                                h.value.background,
                                (oe) => (
                                  N(),
                                  K('g', { key: oe, class: 'v-ng-layer' }, [
                                    Ne(k.$slots, oe, { scale: L(V) }),
                                  ])
                                ),
                              ),
                              128,
                            )),
                            p.value ? (N(), me(jx, { key: 0 })) : Xe('', !0),
                            (N(!0),
                            K(
                              he,
                              null,
                              ze(
                                h.value.grid,
                                (oe) => (
                                  N(),
                                  K('g', { key: oe, class: 'v-ng-layer' }, [
                                    Ne(k.$slots, oe, { scale: L(V) }),
                                  ])
                                ),
                              ),
                              128,
                            )),
                          ]),
                          _: 3,
                        },
                      ))
                    : Xe('', !0),
                  ie(
                    'g',
                    {
                      ref_key: 'viewport',
                      ref: w,
                      class: Be(['v-ng-viewport', { 'v-ng-transition': L(q).enabled }]),
                      style: Ft(W.value),
                    },
                    [
                      (N(!0),
                      K(
                        he,
                        null,
                        ze(
                          h.value.base,
                          (oe) => (
                            N(),
                            K('g', { key: oe, class: 'v-ng-layer' }, [
                              Ne(k.$slots, oe, { scale: L(V) }),
                            ])
                          ),
                        ),
                        128,
                      )),
                      (N(!0),
                      K(
                        he,
                        null,
                        ze(
                          L(g),
                          (oe) => (
                            N(),
                            K(
                              he,
                              { key: oe },
                              [
                                oe === 'edges'
                                  ? (N(),
                                    me(
                                      oE,
                                      { key: 0 },
                                      Sa({ _: 2 }, [
                                        'edge-overlay' in s
                                          ? {
                                              name: 'edge-overlay',
                                              fn: Ze((ve) => [
                                                Ne(
                                                  k.$slots,
                                                  'edge-overlay',
                                                  We({ ref_for: !0 }, ve),
                                                ),
                                              ]),
                                              key: '0',
                                            }
                                          : void 0,
                                      ]),
                                      1024,
                                    ))
                                  : oe === 'edge-labels'
                                    ? (N(),
                                      me(
                                        cE,
                                        {
                                          key: 1,
                                          'enable-edge-label': 'edge-label' in s,
                                          'enable-edges-label': 'edges-label' in s,
                                        },
                                        {
                                          'edge-label': Ze((ve) => [
                                            Ne(k.$slots, 'edge-label', We({ ref_for: !0 }, ve)),
                                          ]),
                                          'edges-label': Ze((ve) => [
                                            Ne(k.$slots, 'edges-label', We({ ref_for: !0 }, ve)),
                                          ]),
                                          _: 3,
                                        },
                                        8,
                                        ['enable-edge-label', 'enable-edges-label'],
                                      ))
                                    : oe === 'focusring'
                                      ? (N(), me(dE, { key: 2 }))
                                      : oe === 'nodes'
                                        ? (N(),
                                          me(
                                            pE,
                                            { key: 3 },
                                            {
                                              'override-node': Ze((ve) => [
                                                Ne(
                                                  k.$slots,
                                                  'override-node',
                                                  We({ ref_for: !0 }, ve),
                                                ),
                                              ]),
                                              _: 3,
                                            },
                                          ))
                                        : oe === 'node-labels'
                                          ? (N(),
                                            me(
                                              wE,
                                              { key: 4 },
                                              {
                                                'override-node-label': Ze((ve) => [
                                                  Ne(
                                                    k.$slots,
                                                    'override-node-label',
                                                    We({ ref_for: !0 }, ve),
                                                  ),
                                                ]),
                                                _: 3,
                                              },
                                            ))
                                          : oe === 'paths'
                                            ? (N(), me(SE, { key: 5 }))
                                            : Xe('', !0),
                                (N(!0),
                                K(
                                  he,
                                  null,
                                  ze(
                                    h.value[oe],
                                    (ve) => (
                                      N(),
                                      K('g', { key: ve, class: 'v-ng-layer' }, [
                                        Ne(k.$slots, ve, { scale: L(V) }),
                                      ])
                                    ),
                                  ),
                                  128,
                                )),
                              ],
                              64,
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    6,
                  ),
                  L(T)
                    ? (N(),
                      me(Sx, { key: 2, box: L(T), config: L(d).view.selection.box }, null, 8, [
                        'box',
                        'config',
                      ]))
                    : Xe('', !0),
                ],
                2,
              )),
            ],
            512,
          )
        );
      },
    }),
    OE = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, o] of t) n[r] = o;
      return n;
    },
    PE = {};
  function AE(e, t) {
    return (
      N(),
      K('defs', null, [
        (N(), me(Of('style'), null, { default: Ze(() => [Ne(e.$slots, 'default')]), _: 3 })),
      ])
    );
  }
  const IE = OE(PE, [['render', AE]]),
    ME = pe({
      __name: 'VEdgeLabel',
      props: {
        area: {},
        config: {},
        text: { default: '' },
        align: { default: 'center' },
        verticalAlign: { default: 'center' },
        edge: { default: void 0 },
        hovered: { type: Boolean, default: void 0 },
        selected: { type: Boolean, default: void 0 },
        scale: { default: void 0 },
      },
      setup(e) {
        const t = e,
          n = J(0),
          r = J(0),
          o = J('middle'),
          i = J('central'),
          s = J(0);
        Rt(() => {
          const l = t.area.source,
            u = t.area.target;
          t.align === 'source'
            ? (l.above.x == u.above.x
                ? (o.value = l.above.y > u.above.y ? 'start' : 'end')
                : (o.value = l.above.x < u.above.x ? 'start' : 'end'),
              t.verticalAlign === 'above'
                ? ((n.value = l.above.x), (r.value = l.above.y), (i.value = 'text-top'))
                : t.verticalAlign === 'below'
                  ? ((n.value = l.below.x), (r.value = l.below.y), (i.value = 'hanging'))
                  : ((n.value = (l.above.x + l.below.x) / 2),
                    (r.value = (l.above.y + l.below.y) / 2),
                    (i.value = 'central')))
            : t.align === 'target'
              ? (l.above.x == u.above.x
                  ? (o.value = l.above.y < u.above.y ? 'start' : 'end')
                  : (o.value = l.above.x > u.above.x ? 'start' : 'end'),
                t.verticalAlign === 'above'
                  ? ((n.value = u.above.x), (r.value = u.above.y), (i.value = 'text-top'))
                  : t.verticalAlign === 'below'
                    ? ((n.value = u.below.x), (r.value = u.below.y), (i.value = 'hanging'))
                    : ((n.value = (u.above.x + u.below.x) / 2),
                      (r.value = (u.above.y + u.below.y) / 2),
                      (i.value = 'central')))
              : ((o.value = 'middle'),
                t.verticalAlign === 'above'
                  ? ((n.value = (l.above.x + u.above.x) / 2),
                    (r.value = (l.above.y + u.above.y) / 2),
                    (i.value = 'text-top'))
                  : t.verticalAlign === 'below'
                    ? ((n.value = (l.below.x + u.below.x) / 2),
                      (r.value = (l.below.y + u.below.y) / 2),
                      (i.value = 'hanging'))
                    : ((n.value = (l.above.x + u.below.x) / 2),
                      (r.value = (l.above.y + u.below.y) / 2),
                      (i.value = 'central')));
          let f = je.fromPositions(l.above, u.above).v.angleDegree();
          ((f < -90 || f >= 90) && ((f = f + 180), f > 180 && (f -= 360)), (s.value = f));
        });
        const a = B(() =>
          i.value === 'central' && !t.config.background
            ? Ri(st({}, t.config), {
                background: {
                  visible: !0,
                  color: '#ffffff',
                  padding: { vertical: 1, horizontal: 4 },
                  borderRadius: 2,
                },
              })
            : t.config,
        );
        return (l, u) => (
          N(),
          me(
            Fi,
            {
              class: 'v-ng-edge-label',
              text: l.text,
              x: n.value,
              y: r.value,
              config: a.value,
              'text-anchor': o.value,
              'dominant-baseline': i.value,
              transform: `rotate(${s.value} ${n.value} ${r.value})`,
            },
            null,
            8,
            ['text', 'x', 'y', 'config', 'text-anchor', 'dominant-baseline', 'transform'],
          )
        );
      },
    }),
    kE = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          VEdgeLabel: ME,
          VLabelText: Fi,
          VNetworkGraph: TE,
          VShape: Bi,
          VStyle: IE,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    RE = function (e) {
      Object.entries(kE).forEach(([t, n]) => {
        e.component(t, n);
      });
    };
  function oh(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  const { toString: NE } = Object.prototype,
    { getPrototypeOf: Ja } = Object,
    { iterator: Ui, toStringTag: ih } = Symbol,
    Hi = ((e) => (t) => {
      const n = NE.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    Kt = (e) => ((e = e.toLowerCase()), (t) => Hi(t) === e),
    Vi = (e) => (t) => typeof t === e,
    { isArray: Ar } = Array,
    Cr = Vi('undefined');
  function Eo(e) {
    return (
      e !== null &&
      !Cr(e) &&
      e.constructor !== null &&
      !Cr(e.constructor) &&
      Ct(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
    );
  }
  const sh = Kt('ArrayBuffer');
  function LE(e) {
    let t;
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (t = ArrayBuffer.isView(e))
        : (t = e && e.buffer && sh(e.buffer)),
      t
    );
  }
  const DE = Vi('string'),
    Ct = Vi('function'),
    ah = Vi('number'),
    _o = (e) => e !== null && typeof e == 'object',
    $E = (e) => e === !0 || e === !1,
    Uo = (e) => {
      if (Hi(e) !== 'object') return !1;
      const t = Ja(e);
      return (
        (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
        !(ih in e) &&
        !(Ui in e)
      );
    },
    jE = (e) => {
      if (!_o(e) || Eo(e)) return !1;
      try {
        return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
      } catch {
        return !1;
      }
    },
    zE = Kt('Date'),
    BE = Kt('File'),
    FE = Kt('Blob'),
    UE = Kt('FileList'),
    HE = (e) => _o(e) && Ct(e.pipe),
    VE = (e) => {
      let t;
      return (
        e &&
        ((typeof FormData == 'function' && e instanceof FormData) ||
          (Ct(e.append) &&
            ((t = Hi(e)) === 'formdata' ||
              (t === 'object' && Ct(e.toString) && e.toString() === '[object FormData]'))))
      );
    },
    ZE = Kt('URLSearchParams'),
    [WE, KE, qE, GE] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(Kt),
    XE = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
  function So(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > 'u') return;
    let r, o;
    if ((typeof e != 'object' && (e = [e]), Ar(e)))
      for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
    else {
      if (Eo(e)) return;
      const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
        s = i.length;
      let a;
      for (r = 0; r < s; r++) ((a = i[r]), t.call(null, e[a], a, e));
    }
  }
  function lh(e, t) {
    if (Eo(e)) return null;
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
      o;
    for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
    return null;
  }
  const Zn =
      typeof globalThis < 'u'
        ? globalThis
        : typeof self < 'u'
          ? self
          : typeof window < 'u'
            ? window
            : global,
    ch = (e) => !Cr(e) && e !== Zn;
  function Qs() {
    const { caseless: e, skipUndefined: t } = (ch(this) && this) || {},
      n = {},
      r = (o, i) => {
        const s = (e && lh(n, i)) || i;
        Uo(n[s]) && Uo(o)
          ? (n[s] = Qs(n[s], o))
          : Uo(o)
            ? (n[s] = Qs({}, o))
            : Ar(o)
              ? (n[s] = o.slice())
              : (!t || !Cr(o)) && (n[s] = o);
      };
    for (let o = 0, i = arguments.length; o < i; o++) arguments[o] && So(arguments[o], r);
    return n;
  }
  const JE = (e, t, n, { allOwnKeys: r } = {}) => (
      So(
        t,
        (o, i) => {
          n && Ct(o) ? (e[i] = oh(o, n)) : (e[i] = o);
        },
        { allOwnKeys: r },
      ),
      e
    ),
    YE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    QE = (e, t, n, r) => {
      ((e.prototype = Object.create(t.prototype, r)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, 'super', { value: t.prototype }),
        n && Object.assign(e.prototype, n));
    },
    e_ = (e, t, n, r) => {
      let o, i, s;
      const a = {};
      if (((t = t || {}), e == null)) return t;
      do {
        for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
          ((s = o[i]), (!r || r(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0)));
        e = n !== !1 && Ja(e);
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t;
    },
    t_ = (e, t, n) => {
      ((e = String(e)), (n === void 0 || n > e.length) && (n = e.length), (n -= t.length));
      const r = e.indexOf(t, n);
      return r !== -1 && r === n;
    },
    n_ = (e) => {
      if (!e) return null;
      if (Ar(e)) return e;
      let t = e.length;
      if (!ah(t)) return null;
      const n = new Array(t);
      for (; t-- > 0; ) n[t] = e[t];
      return n;
    },
    r_ = (
      (e) => (t) =>
        e && t instanceof e
    )(typeof Uint8Array < 'u' && Ja(Uint8Array)),
    o_ = (e, t) => {
      const r = (e && e[Ui]).call(e);
      let o;
      for (; (o = r.next()) && !o.done; ) {
        const i = o.value;
        t.call(e, i[0], i[1]);
      }
    },
    i_ = (e, t) => {
      let n;
      const r = [];
      for (; (n = e.exec(t)) !== null; ) r.push(n);
      return r;
    },
    s_ = Kt('HTMLFormElement'),
    a_ = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
        return r.toUpperCase() + o;
      }),
    Jc = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
        e.call(t, n)
    )(Object.prototype),
    l_ = Kt('RegExp'),
    uh = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
        r = {};
      (So(n, (o, i) => {
        let s;
        (s = t(o, i, e)) !== !1 && (r[i] = s || o);
      }),
        Object.defineProperties(e, r));
    },
    c_ = (e) => {
      uh(e, (t, n) => {
        if (Ct(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1) return !1;
        const r = e[n];
        if (Ct(r)) {
          if (((t.enumerable = !1), 'writable' in t)) {
            t.writable = !1;
            return;
          }
          t.set ||
            (t.set = () => {
              throw Error("Can not rewrite read-only method '" + n + "'");
            });
        }
      });
    },
    u_ = (e, t) => {
      const n = {},
        r = (o) => {
          o.forEach((i) => {
            n[i] = !0;
          });
        };
      return (Ar(e) ? r(e) : r(String(e).split(t)), n);
    },
    f_ = () => {},
    d_ = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
  function h_(e) {
    return !!(e && Ct(e.append) && e[ih] === 'FormData' && e[Ui]);
  }
  const p_ = (e) => {
      const t = new Array(10),
        n = (r, o) => {
          if (_o(r)) {
            if (t.indexOf(r) >= 0) return;
            if (Eo(r)) return r;
            if (!('toJSON' in r)) {
              t[o] = r;
              const i = Ar(r) ? [] : {};
              return (
                So(r, (s, a) => {
                  const l = n(s, o + 1);
                  !Cr(l) && (i[a] = l);
                }),
                (t[o] = void 0),
                i
              );
            }
          }
          return r;
        };
      return n(e, 0);
    },
    g_ = Kt('AsyncFunction'),
    v_ = (e) => e && (_o(e) || Ct(e)) && Ct(e.then) && Ct(e.catch),
    fh = ((e, t) =>
      e
        ? setImmediate
        : t
          ? ((n, r) => (
              Zn.addEventListener(
                'message',
                ({ source: o, data: i }) => {
                  o === Zn && i === n && r.length && r.shift()();
                },
                !1,
              ),
              (o) => {
                (r.push(o), Zn.postMessage(n, '*'));
              }
            ))(`axios@${Math.random()}`, [])
          : (n) => setTimeout(n))(typeof setImmediate == 'function', Ct(Zn.postMessage)),
    m_ =
      typeof queueMicrotask < 'u'
        ? queueMicrotask.bind(Zn)
        : (typeof process < 'u' && process.nextTick) || fh,
    y_ = (e) => e != null && Ct(e[Ui]),
    I = {
      isArray: Ar,
      isArrayBuffer: sh,
      isBuffer: Eo,
      isFormData: VE,
      isArrayBufferView: LE,
      isString: DE,
      isNumber: ah,
      isBoolean: $E,
      isObject: _o,
      isPlainObject: Uo,
      isEmptyObject: jE,
      isReadableStream: WE,
      isRequest: KE,
      isResponse: qE,
      isHeaders: GE,
      isUndefined: Cr,
      isDate: zE,
      isFile: BE,
      isBlob: FE,
      isRegExp: l_,
      isFunction: Ct,
      isStream: HE,
      isURLSearchParams: ZE,
      isTypedArray: r_,
      isFileList: UE,
      forEach: So,
      merge: Qs,
      extend: JE,
      trim: XE,
      stripBOM: YE,
      inherits: QE,
      toFlatObject: e_,
      kindOf: Hi,
      kindOfTest: Kt,
      endsWith: t_,
      toArray: n_,
      forEachEntry: o_,
      matchAll: i_,
      isHTMLForm: s_,
      hasOwnProperty: Jc,
      hasOwnProp: Jc,
      reduceDescriptors: uh,
      freezeMethods: c_,
      toObjectSet: u_,
      toCamelCase: a_,
      noop: f_,
      toFiniteNumber: d_,
      findKey: lh,
      global: Zn,
      isContextDefined: ch,
      isSpecCompliantForm: h_,
      toJSONObject: p_,
      isAsyncFn: g_,
      isThenable: v_,
      setImmediate: fh,
      asap: m_,
      isIterable: y_,
    };
  function ye(e, t, n, r, o) {
    (Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = 'AxiosError'),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      o && ((this.response = o), (this.status = o.status ? o.status : null)));
  }
  I.inherits(ye, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: I.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      };
    },
  });
  const dh = ye.prototype,
    hh = {};
  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
  ].forEach((e) => {
    hh[e] = { value: e };
  });
  Object.defineProperties(ye, hh);
  Object.defineProperty(dh, 'isAxiosError', { value: !0 });
  ye.from = (e, t, n, r, o, i) => {
    const s = Object.create(dh);
    I.toFlatObject(
      e,
      s,
      function (f) {
        return f !== Error.prototype;
      },
      (u) => u !== 'isAxiosError',
    );
    const a = e && e.message ? e.message : 'Error',
      l = t == null && e ? e.code : t;
    return (
      ye.call(s, a, l, n, r, o),
      e && s.cause == null && Object.defineProperty(s, 'cause', { value: e, configurable: !0 }),
      (s.name = (e && e.name) || 'Error'),
      i && Object.assign(s, i),
      s
    );
  };
  const b_ = null;
  function ea(e) {
    return I.isPlainObject(e) || I.isArray(e);
  }
  function ph(e) {
    return I.endsWith(e, '[]') ? e.slice(0, -2) : e;
  }
  function Yc(e, t, n) {
    return e
      ? e
          .concat(t)
          .map(function (o, i) {
            return ((o = ph(o)), !n && i ? '[' + o + ']' : o);
          })
          .join(n ? '.' : '')
      : t;
  }
  function w_(e) {
    return I.isArray(e) && !e.some(ea);
  }
  const x_ = I.toFlatObject(I, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  function Zi(e, t, n) {
    if (!I.isObject(e)) throw new TypeError('target must be an object');
    ((t = t || new FormData()),
      (n = I.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (m, g) {
        return !I.isUndefined(g[m]);
      })));
    const r = n.metaTokens,
      o = n.visitor || f,
      i = n.dots,
      s = n.indexes,
      l = (n.Blob || (typeof Blob < 'u' && Blob)) && I.isSpecCompliantForm(t);
    if (!I.isFunction(o)) throw new TypeError('visitor must be a function');
    function u(p) {
      if (p === null) return '';
      if (I.isDate(p)) return p.toISOString();
      if (I.isBoolean(p)) return p.toString();
      if (!l && I.isBlob(p)) throw new ye('Blob is not supported. Use a Buffer instead.');
      return I.isArrayBuffer(p) || I.isTypedArray(p)
        ? l && typeof Blob == 'function'
          ? new Blob([p])
          : Buffer.from(p)
        : p;
    }
    function f(p, m, g) {
      let v = p;
      if (p && !g && typeof p == 'object') {
        if (I.endsWith(m, '{}')) ((m = r ? m : m.slice(0, -2)), (p = JSON.stringify(p)));
        else if (
          (I.isArray(p) && w_(p)) ||
          ((I.isFileList(p) || I.endsWith(m, '[]')) && (v = I.toArray(p)))
        )
          return (
            (m = ph(m)),
            v.forEach(function (w, y) {
              !(I.isUndefined(w) || w === null) &&
                t.append(s === !0 ? Yc([m], y, i) : s === null ? m : m + '[]', u(w));
            }),
            !1
          );
      }
      return ea(p) ? !0 : (t.append(Yc(g, m, i), u(p)), !1);
    }
    const c = [],
      d = Object.assign(x_, { defaultVisitor: f, convertValue: u, isVisitable: ea });
    function h(p, m) {
      if (!I.isUndefined(p)) {
        if (c.indexOf(p) !== -1) throw Error('Circular reference detected in ' + m.join('.'));
        (c.push(p),
          I.forEach(p, function (v, b) {
            (!(I.isUndefined(v) || v === null) &&
              o.call(t, v, I.isString(b) ? b.trim() : b, m, d)) === !0 &&
              h(v, m ? m.concat(b) : [b]);
          }),
          c.pop());
      }
    }
    if (!I.isObject(e)) throw new TypeError('data must be an object');
    return (h(e), t);
  }
  function Qc(e) {
    const t = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
      return t[r];
    });
  }
  function Ya(e, t) {
    ((this._pairs = []), e && Zi(e, this, t));
  }
  const gh = Ya.prototype;
  gh.append = function (t, n) {
    this._pairs.push([t, n]);
  };
  gh.toString = function (t) {
    const n = t
      ? function (r) {
          return t.call(this, r, Qc);
        }
      : Qc;
    return this._pairs
      .map(function (o) {
        return n(o[0]) + '=' + n(o[1]);
      }, '')
      .join('&');
  };
  function E_(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+');
  }
  function vh(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || E_;
    I.isFunction(n) && (n = { serialize: n });
    const o = n && n.serialize;
    let i;
    if (
      (o ? (i = o(t, n)) : (i = I.isURLSearchParams(t) ? t.toString() : new Ya(t, n).toString(r)),
      i)
    ) {
      const s = e.indexOf('#');
      (s !== -1 && (e = e.slice(0, s)), (e += (e.indexOf('?') === -1 ? '?' : '&') + i));
    }
    return e;
  }
  class eu {
    constructor() {
      this.handlers = [];
    }
    use(t, n, r) {
      return (
        this.handlers.push({
          fulfilled: t,
          rejected: n,
          synchronous: r ? r.synchronous : !1,
          runWhen: r ? r.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(t) {
      this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(t) {
      I.forEach(this.handlers, function (r) {
        r !== null && t(r);
      });
    }
  }
  const mh = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    __ = typeof URLSearchParams < 'u' ? URLSearchParams : Ya,
    S_ = typeof FormData < 'u' ? FormData : null,
    C_ = typeof Blob < 'u' ? Blob : null,
    T_ = {
      isBrowser: !0,
      classes: { URLSearchParams: __, FormData: S_, Blob: C_ },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    },
    Qa = typeof window < 'u' && typeof document < 'u',
    ta = (typeof navigator == 'object' && navigator) || void 0,
    O_ = Qa && (!ta || ['ReactNative', 'NativeScript', 'NS'].indexOf(ta.product) < 0),
    P_ =
      typeof WorkerGlobalScope < 'u' &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == 'function',
    A_ = (Qa && window.location.href) || 'http://localhost',
    I_ = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          hasBrowserEnv: Qa,
          hasStandardBrowserEnv: O_,
          hasStandardBrowserWebWorkerEnv: P_,
          navigator: ta,
          origin: A_,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    pt = { ...I_, ...T_ };
  function M_(e, t) {
    return Zi(e, new pt.classes.URLSearchParams(), {
      visitor: function (n, r, o, i) {
        return pt.isNode && I.isBuffer(n)
          ? (this.append(r, n.toString('base64')), !1)
          : i.defaultVisitor.apply(this, arguments);
      },
      ...t,
    });
  }
  function k_(e) {
    return I.matchAll(/\w+|\[(\w*)]/g, e).map((t) => (t[0] === '[]' ? '' : t[1] || t[0]));
  }
  function R_(e) {
    const t = {},
      n = Object.keys(e);
    let r;
    const o = n.length;
    let i;
    for (r = 0; r < o; r++) ((i = n[r]), (t[i] = e[i]));
    return t;
  }
  function yh(e) {
    function t(n, r, o, i) {
      let s = n[i++];
      if (s === '__proto__') return !0;
      const a = Number.isFinite(+s),
        l = i >= n.length;
      return (
        (s = !s && I.isArray(o) ? o.length : s),
        l
          ? (I.hasOwnProp(o, s) ? (o[s] = [o[s], r]) : (o[s] = r), !a)
          : ((!o[s] || !I.isObject(o[s])) && (o[s] = []),
            t(n, r, o[s], i) && I.isArray(o[s]) && (o[s] = R_(o[s])),
            !a)
      );
    }
    if (I.isFormData(e) && I.isFunction(e.entries)) {
      const n = {};
      return (
        I.forEachEntry(e, (r, o) => {
          t(k_(r), o, n, 0);
        }),
        n
      );
    }
    return null;
  }
  function N_(e, t, n) {
    if (I.isString(e))
      try {
        return ((t || JSON.parse)(e), I.trim(e));
      } catch (r) {
        if (r.name !== 'SyntaxError') throw r;
      }
    return (n || JSON.stringify)(e);
  }
  const Co = {
    transitional: mh,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [
      function (t, n) {
        const r = n.getContentType() || '',
          o = r.indexOf('application/json') > -1,
          i = I.isObject(t);
        if ((i && I.isHTMLForm(t) && (t = new FormData(t)), I.isFormData(t)))
          return o ? JSON.stringify(yh(t)) : t;
        if (
          I.isArrayBuffer(t) ||
          I.isBuffer(t) ||
          I.isStream(t) ||
          I.isFile(t) ||
          I.isBlob(t) ||
          I.isReadableStream(t)
        )
          return t;
        if (I.isArrayBufferView(t)) return t.buffer;
        if (I.isURLSearchParams(t))
          return (
            n.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1),
            t.toString()
          );
        let a;
        if (i) {
          if (r.indexOf('application/x-www-form-urlencoded') > -1)
            return M_(t, this.formSerializer).toString();
          if ((a = I.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
            const l = this.env && this.env.FormData;
            return Zi(a ? { 'files[]': t } : t, l && new l(), this.formSerializer);
          }
        }
        return i || o ? (n.setContentType('application/json', !1), N_(t)) : t;
      },
    ],
    transformResponse: [
      function (t) {
        const n = this.transitional || Co.transitional,
          r = n && n.forcedJSONParsing,
          o = this.responseType === 'json';
        if (I.isResponse(t) || I.isReadableStream(t)) return t;
        if (t && I.isString(t) && ((r && !this.responseType) || o)) {
          const s = !(n && n.silentJSONParsing) && o;
          try {
            return JSON.parse(t, this.parseReviver);
          } catch (a) {
            if (s)
              throw a.name === 'SyntaxError'
                ? ye.from(a, ye.ERR_BAD_RESPONSE, this, null, this.response)
                : a;
          }
        }
        return t;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: pt.classes.FormData, Blob: pt.classes.Blob },
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
  };
  I.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
    Co.headers[e] = {};
  });
  const L_ = I.toObjectSet([
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ]),
    D_ = (e) => {
      const t = {};
      let n, r, o;
      return (
        e &&
          e
            .split(
              `
`,
            )
            .forEach(function (s) {
              ((o = s.indexOf(':')),
                (n = s.substring(0, o).trim().toLowerCase()),
                (r = s.substring(o + 1).trim()),
                !(!n || (t[n] && L_[n])) &&
                  (n === 'set-cookie'
                    ? t[n]
                      ? t[n].push(r)
                      : (t[n] = [r])
                    : (t[n] = t[n] ? t[n] + ', ' + r : r)));
            }),
        t
      );
    },
    tu = Symbol('internals');
  function zr(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Ho(e) {
    return e === !1 || e == null ? e : I.isArray(e) ? e.map(Ho) : String(e);
  }
  function $_(e) {
    const t = Object.create(null),
      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
  }
  const j_ = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
  function xs(e, t, n, r, o) {
    if (I.isFunction(r)) return r.call(this, t, n);
    if ((o && (t = n), !!I.isString(t))) {
      if (I.isString(r)) return t.indexOf(r) !== -1;
      if (I.isRegExp(r)) return r.test(t);
    }
  }
  function z_(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
  }
  function B_(e, t) {
    const n = I.toCamelCase(' ' + t);
    ['get', 'set', 'has'].forEach((r) => {
      Object.defineProperty(e, r + n, {
        value: function (o, i, s) {
          return this[r].call(this, t, o, i, s);
        },
        configurable: !0,
      });
    });
  }
  let Tt = class {
    constructor(t) {
      t && this.set(t);
    }
    set(t, n, r) {
      const o = this;
      function i(a, l, u) {
        const f = zr(l);
        if (!f) throw new Error('header name must be a non-empty string');
        const c = I.findKey(o, f);
        (!c || o[c] === void 0 || u === !0 || (u === void 0 && o[c] !== !1)) && (o[c || l] = Ho(a));
      }
      const s = (a, l) => I.forEach(a, (u, f) => i(u, f, l));
      if (I.isPlainObject(t) || t instanceof this.constructor) s(t, n);
      else if (I.isString(t) && (t = t.trim()) && !j_(t)) s(D_(t), n);
      else if (I.isObject(t) && I.isIterable(t)) {
        let a = {},
          l,
          u;
        for (const f of t) {
          if (!I.isArray(f)) throw TypeError('Object iterator must return a key-value pair');
          a[(u = f[0])] = (l = a[u]) ? (I.isArray(l) ? [...l, f[1]] : [l, f[1]]) : f[1];
        }
        s(a, n);
      } else t != null && i(n, t, r);
      return this;
    }
    get(t, n) {
      if (((t = zr(t)), t)) {
        const r = I.findKey(this, t);
        if (r) {
          const o = this[r];
          if (!n) return o;
          if (n === !0) return $_(o);
          if (I.isFunction(n)) return n.call(this, o, r);
          if (I.isRegExp(n)) return n.exec(o);
          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(t, n) {
      if (((t = zr(t)), t)) {
        const r = I.findKey(this, t);
        return !!(r && this[r] !== void 0 && (!n || xs(this, this[r], r, n)));
      }
      return !1;
    }
    delete(t, n) {
      const r = this;
      let o = !1;
      function i(s) {
        if (((s = zr(s)), s)) {
          const a = I.findKey(r, s);
          a && (!n || xs(r, r[a], a, n)) && (delete r[a], (o = !0));
        }
      }
      return (I.isArray(t) ? t.forEach(i) : i(t), o);
    }
    clear(t) {
      const n = Object.keys(this);
      let r = n.length,
        o = !1;
      for (; r--; ) {
        const i = n[r];
        (!t || xs(this, this[i], i, t, !0)) && (delete this[i], (o = !0));
      }
      return o;
    }
    normalize(t) {
      const n = this,
        r = {};
      return (
        I.forEach(this, (o, i) => {
          const s = I.findKey(r, i);
          if (s) {
            ((n[s] = Ho(o)), delete n[i]);
            return;
          }
          const a = t ? z_(i) : String(i).trim();
          (a !== i && delete n[i], (n[a] = Ho(o)), (r[a] = !0));
        }),
        this
      );
    }
    concat(...t) {
      return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
      const n = Object.create(null);
      return (
        I.forEach(this, (r, o) => {
          r != null && r !== !1 && (n[o] = t && I.isArray(r) ? r.join(', ') : r);
        }),
        n
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
    }
    getSetCookie() {
      return this.get('set-cookie') || [];
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(t) {
      return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
      const r = new this(t);
      return (n.forEach((o) => r.set(o)), r);
    }
    static accessor(t) {
      const r = (this[tu] = this[tu] = { accessors: {} }).accessors,
        o = this.prototype;
      function i(s) {
        const a = zr(s);
        r[a] || (B_(o, s), (r[a] = !0));
      }
      return (I.isArray(t) ? t.forEach(i) : i(t), this);
    }
  };
  Tt.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
  ]);
  I.reduceDescriptors(Tt.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
      get: () => e,
      set(r) {
        this[n] = r;
      },
    };
  });
  I.freezeMethods(Tt);
  function Es(e, t) {
    const n = this || Co,
      r = t || n,
      o = Tt.from(r.headers);
    let i = r.data;
    return (
      I.forEach(e, function (a) {
        i = a.call(n, i, o.normalize(), t ? t.status : void 0);
      }),
      o.normalize(),
      i
    );
  }
  function bh(e) {
    return !!(e && e.__CANCEL__);
  }
  function Ir(e, t, n) {
    (ye.call(this, e ?? 'canceled', ye.ERR_CANCELED, t, n), (this.name = 'CanceledError'));
  }
  I.inherits(Ir, ye, { __CANCEL__: !0 });
  function wh(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
      ? e(n)
      : t(
          new ye(
            'Request failed with status code ' + n.status,
            [ye.ERR_BAD_REQUEST, ye.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
            n.config,
            n.request,
            n,
          ),
        );
  }
  function F_(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || '';
  }
  function U_(e, t) {
    e = e || 10;
    const n = new Array(e),
      r = new Array(e);
    let o = 0,
      i = 0,
      s;
    return (
      (t = t !== void 0 ? t : 1e3),
      function (l) {
        const u = Date.now(),
          f = r[i];
        (s || (s = u), (n[o] = l), (r[o] = u));
        let c = i,
          d = 0;
        for (; c !== o; ) ((d += n[c++]), (c = c % e));
        if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), u - s < t)) return;
        const h = f && u - f;
        return h ? Math.round((d * 1e3) / h) : void 0;
      }
    );
  }
  function H_(e, t) {
    let n = 0,
      r = 1e3 / t,
      o,
      i;
    const s = (u, f = Date.now()) => {
      ((n = f), (o = null), i && (clearTimeout(i), (i = null)), e(...u));
    };
    return [
      (...u) => {
        const f = Date.now(),
          c = f - n;
        c >= r
          ? s(u, f)
          : ((o = u),
            i ||
              (i = setTimeout(() => {
                ((i = null), s(o));
              }, r - c)));
      },
      () => o && s(o),
    ];
  }
  const di = (e, t, n = 3) => {
      let r = 0;
      const o = U_(50, 250);
      return H_((i) => {
        const s = i.loaded,
          a = i.lengthComputable ? i.total : void 0,
          l = s - r,
          u = o(l),
          f = s <= a;
        r = s;
        const c = {
          loaded: s,
          total: a,
          progress: a ? s / a : void 0,
          bytes: l,
          rate: u || void 0,
          estimated: u && a && f ? (a - s) / u : void 0,
          event: i,
          lengthComputable: a != null,
          [t ? 'download' : 'upload']: !0,
        };
        e(c);
      }, n);
    },
    nu = (e, t) => {
      const n = e != null;
      return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
    },
    ru =
      (e) =>
      (...t) =>
        I.asap(() => e(...t)),
    V_ = pt.hasStandardBrowserEnv
      ? ((e, t) => (n) => (
          (n = new URL(n, pt.origin)),
          e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)
        ))(new URL(pt.origin), pt.navigator && /(msie|trident)/i.test(pt.navigator.userAgent))
      : () => !0,
    Z_ = pt.hasStandardBrowserEnv
      ? {
          write(e, t, n, r, o, i, s) {
            if (typeof document > 'u') return;
            const a = [`${e}=${encodeURIComponent(t)}`];
            (I.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`),
              I.isString(r) && a.push(`path=${r}`),
              I.isString(o) && a.push(`domain=${o}`),
              i === !0 && a.push('secure'),
              I.isString(s) && a.push(`SameSite=${s}`),
              (document.cookie = a.join('; ')));
          },
          read(e) {
            if (typeof document > 'u') return null;
            const t = document.cookie.match(new RegExp('(?:^|; )' + e + '=([^;]*)'));
            return t ? decodeURIComponent(t[1]) : null;
          },
          remove(e) {
            this.write(e, '', Date.now() - 864e5, '/');
          },
        }
      : {
          write() {},
          read() {
            return null;
          },
          remove() {},
        };
  function W_(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function K_(e, t) {
    return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
  }
  function xh(e, t, n) {
    let r = !W_(t);
    return e && (r || n == !1) ? K_(e, t) : t;
  }
  const ou = (e) => (e instanceof Tt ? { ...e } : e);
  function Qn(e, t) {
    t = t || {};
    const n = {};
    function r(u, f, c, d) {
      return I.isPlainObject(u) && I.isPlainObject(f)
        ? I.merge.call({ caseless: d }, u, f)
        : I.isPlainObject(f)
          ? I.merge({}, f)
          : I.isArray(f)
            ? f.slice()
            : f;
    }
    function o(u, f, c, d) {
      if (I.isUndefined(f)) {
        if (!I.isUndefined(u)) return r(void 0, u, c, d);
      } else return r(u, f, c, d);
    }
    function i(u, f) {
      if (!I.isUndefined(f)) return r(void 0, f);
    }
    function s(u, f) {
      if (I.isUndefined(f)) {
        if (!I.isUndefined(u)) return r(void 0, u);
      } else return r(void 0, f);
    }
    function a(u, f, c) {
      if (c in t) return r(u, f);
      if (c in e) return r(void 0, u);
    }
    const l = {
      url: i,
      method: i,
      data: i,
      baseURL: s,
      transformRequest: s,
      transformResponse: s,
      paramsSerializer: s,
      timeout: s,
      timeoutMessage: s,
      withCredentials: s,
      withXSRFToken: s,
      adapter: s,
      responseType: s,
      xsrfCookieName: s,
      xsrfHeaderName: s,
      onUploadProgress: s,
      onDownloadProgress: s,
      decompress: s,
      maxContentLength: s,
      maxBodyLength: s,
      beforeRedirect: s,
      transport: s,
      httpAgent: s,
      httpsAgent: s,
      cancelToken: s,
      socketPath: s,
      responseEncoding: s,
      validateStatus: a,
      headers: (u, f, c) => o(ou(u), ou(f), c, !0),
    };
    return (
      I.forEach(Object.keys({ ...e, ...t }), function (f) {
        const c = l[f] || o,
          d = c(e[f], t[f], f);
        (I.isUndefined(d) && c !== a) || (n[f] = d);
      }),
      n
    );
  }
  const Eh = (e) => {
      const t = Qn({}, e);
      let {
        data: n,
        withXSRFToken: r,
        xsrfHeaderName: o,
        xsrfCookieName: i,
        headers: s,
        auth: a,
      } = t;
      if (
        ((t.headers = s = Tt.from(s)),
        (t.url = vh(xh(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer)),
        a &&
          s.set(
            'Authorization',
            'Basic ' +
              btoa(
                (a.username || '') +
                  ':' +
                  (a.password ? unescape(encodeURIComponent(a.password)) : ''),
              ),
          ),
        I.isFormData(n))
      ) {
        if (pt.hasStandardBrowserEnv || pt.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);
        else if (I.isFunction(n.getHeaders)) {
          const l = n.getHeaders(),
            u = ['content-type', 'content-length'];
          Object.entries(l).forEach(([f, c]) => {
            u.includes(f.toLowerCase()) && s.set(f, c);
          });
        }
      }
      if (
        pt.hasStandardBrowserEnv &&
        (r && I.isFunction(r) && (r = r(t)), r || (r !== !1 && V_(t.url)))
      ) {
        const l = o && i && Z_.read(i);
        l && s.set(o, l);
      }
      return t;
    },
    q_ = typeof XMLHttpRequest < 'u',
    G_ =
      q_ &&
      function (e) {
        return new Promise(function (n, r) {
          const o = Eh(e);
          let i = o.data;
          const s = Tt.from(o.headers).normalize();
          let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = o,
            f,
            c,
            d,
            h,
            p;
          function m() {
            (h && h(),
              p && p(),
              o.cancelToken && o.cancelToken.unsubscribe(f),
              o.signal && o.signal.removeEventListener('abort', f));
          }
          let g = new XMLHttpRequest();
          (g.open(o.method.toUpperCase(), o.url, !0), (g.timeout = o.timeout));
          function v() {
            if (!g) return;
            const w = Tt.from('getAllResponseHeaders' in g && g.getAllResponseHeaders()),
              x = {
                data: !a || a === 'text' || a === 'json' ? g.responseText : g.response,
                status: g.status,
                statusText: g.statusText,
                headers: w,
                config: e,
                request: g,
              };
            (wh(
              function (C) {
                (n(C), m());
              },
              function (C) {
                (r(C), m());
              },
              x,
            ),
              (g = null));
          }
          ('onloadend' in g
            ? (g.onloadend = v)
            : (g.onreadystatechange = function () {
                !g ||
                  g.readyState !== 4 ||
                  (g.status === 0 && !(g.responseURL && g.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(v);
              }),
            (g.onabort = function () {
              g && (r(new ye('Request aborted', ye.ECONNABORTED, e, g)), (g = null));
            }),
            (g.onerror = function (y) {
              const x = y && y.message ? y.message : 'Network Error',
                E = new ye(x, ye.ERR_NETWORK, e, g);
              ((E.event = y || null), r(E), (g = null));
            }),
            (g.ontimeout = function () {
              let y = o.timeout ? 'timeout of ' + o.timeout + 'ms exceeded' : 'timeout exceeded';
              const x = o.transitional || mh;
              (o.timeoutErrorMessage && (y = o.timeoutErrorMessage),
                r(new ye(y, x.clarifyTimeoutError ? ye.ETIMEDOUT : ye.ECONNABORTED, e, g)),
                (g = null));
            }),
            i === void 0 && s.setContentType(null),
            'setRequestHeader' in g &&
              I.forEach(s.toJSON(), function (y, x) {
                g.setRequestHeader(x, y);
              }),
            I.isUndefined(o.withCredentials) || (g.withCredentials = !!o.withCredentials),
            a && a !== 'json' && (g.responseType = o.responseType),
            u && (([d, p] = di(u, !0)), g.addEventListener('progress', d)),
            l &&
              g.upload &&
              (([c, h] = di(l)),
              g.upload.addEventListener('progress', c),
              g.upload.addEventListener('loadend', h)),
            (o.cancelToken || o.signal) &&
              ((f = (w) => {
                g && (r(!w || w.type ? new Ir(null, e, g) : w), g.abort(), (g = null));
              }),
              o.cancelToken && o.cancelToken.subscribe(f),
              o.signal && (o.signal.aborted ? f() : o.signal.addEventListener('abort', f))));
          const b = F_(o.url);
          if (b && pt.protocols.indexOf(b) === -1) {
            r(new ye('Unsupported protocol ' + b + ':', ye.ERR_BAD_REQUEST, e));
            return;
          }
          g.send(i || null);
        });
      },
    X_ = (e, t) => {
      const { length: n } = (e = e ? e.filter(Boolean) : []);
      if (t || n) {
        let r = new AbortController(),
          o;
        const i = function (u) {
          if (!o) {
            ((o = !0), a());
            const f = u instanceof Error ? u : this.reason;
            r.abort(f instanceof ye ? f : new Ir(f instanceof Error ? f.message : f));
          }
        };
        let s =
          t &&
          setTimeout(() => {
            ((s = null), i(new ye(`timeout ${t} of ms exceeded`, ye.ETIMEDOUT)));
          }, t);
        const a = () => {
          e &&
            (s && clearTimeout(s),
            (s = null),
            e.forEach((u) => {
              u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener('abort', i);
            }),
            (e = null));
        };
        e.forEach((u) => u.addEventListener('abort', i));
        const { signal: l } = r;
        return ((l.unsubscribe = () => I.asap(a)), l);
      }
    },
    J_ = function* (e, t) {
      let n = e.byteLength;
      if (n < t) {
        yield e;
        return;
      }
      let r = 0,
        o;
      for (; r < n; ) ((o = r + t), yield e.slice(r, o), (r = o));
    },
    Y_ = async function* (e, t) {
      for await (const n of Q_(e)) yield* J_(n, t);
    },
    Q_ = async function* (e) {
      if (e[Symbol.asyncIterator]) {
        yield* e;
        return;
      }
      const t = e.getReader();
      try {
        for (;;) {
          const { done: n, value: r } = await t.read();
          if (n) break;
          yield r;
        }
      } finally {
        await t.cancel();
      }
    },
    iu = (e, t, n, r) => {
      const o = Y_(e, t);
      let i = 0,
        s,
        a = (l) => {
          s || ((s = !0), r && r(l));
        };
      return new ReadableStream(
        {
          async pull(l) {
            try {
              const { done: u, value: f } = await o.next();
              if (u) {
                (a(), l.close());
                return;
              }
              let c = f.byteLength;
              if (n) {
                let d = (i += c);
                n(d);
              }
              l.enqueue(new Uint8Array(f));
            } catch (u) {
              throw (a(u), u);
            }
          },
          cancel(l) {
            return (a(l), o.return());
          },
        },
        { highWaterMark: 2 },
      );
    },
    su = 64 * 1024,
    { isFunction: No } = I,
    e1 = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(I.global),
    { ReadableStream: au, TextEncoder: lu } = I.global,
    cu = (e, ...t) => {
      try {
        return !!e(...t);
      } catch {
        return !1;
      }
    },
    t1 = (e) => {
      e = I.merge.call({ skipUndefined: !0 }, e1, e);
      const { fetch: t, Request: n, Response: r } = e,
        o = t ? No(t) : typeof fetch == 'function',
        i = No(n),
        s = No(r);
      if (!o) return !1;
      const a = o && No(au),
        l =
          o &&
          (typeof lu == 'function'
            ? (
                (p) => (m) =>
                  p.encode(m)
              )(new lu())
            : async (p) => new Uint8Array(await new n(p).arrayBuffer())),
        u =
          i &&
          a &&
          cu(() => {
            let p = !1;
            const m = new n(pt.origin, {
              body: new au(),
              method: 'POST',
              get duplex() {
                return ((p = !0), 'half');
              },
            }).headers.has('Content-Type');
            return p && !m;
          }),
        f = s && a && cu(() => I.isReadableStream(new r('').body)),
        c = { stream: f && ((p) => p.body) };
      o &&
        ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((p) => {
          !c[p] &&
            (c[p] = (m, g) => {
              let v = m && m[p];
              if (v) return v.call(m);
              throw new ye(`Response type '${p}' is not supported`, ye.ERR_NOT_SUPPORT, g);
            });
        });
      const d = async (p) => {
          if (p == null) return 0;
          if (I.isBlob(p)) return p.size;
          if (I.isSpecCompliantForm(p))
            return (await new n(pt.origin, { method: 'POST', body: p }).arrayBuffer()).byteLength;
          if (I.isArrayBufferView(p) || I.isArrayBuffer(p)) return p.byteLength;
          if ((I.isURLSearchParams(p) && (p = p + ''), I.isString(p)))
            return (await l(p)).byteLength;
        },
        h = async (p, m) => {
          const g = I.toFiniteNumber(p.getContentLength());
          return g ?? d(m);
        };
      return async (p) => {
        let {
            url: m,
            method: g,
            data: v,
            signal: b,
            cancelToken: w,
            timeout: y,
            onDownloadProgress: x,
            onUploadProgress: E,
            responseType: C,
            headers: P,
            withCredentials: M = 'same-origin',
            fetchOptions: A,
          } = Eh(p),
          j = t || fetch;
        C = C ? (C + '').toLowerCase() : 'text';
        let R = X_([b, w && w.toAbortSignal()], y),
          V = null;
        const re =
          R &&
          R.unsubscribe &&
          (() => {
            R.unsubscribe();
          });
        let ne;
        try {
          if (E && u && g !== 'get' && g !== 'head' && (ne = await h(P, v)) !== 0) {
            let we = new n(m, { method: 'POST', body: v, duplex: 'half' }),
              Ie;
            if (
              (I.isFormData(v) && (Ie = we.headers.get('content-type')) && P.setContentType(Ie),
              we.body)
            ) {
              const [Ye, at] = nu(ne, di(ru(E)));
              v = iu(we.body, su, Ye, at);
            }
          }
          I.isString(M) || (M = M ? 'include' : 'omit');
          const X = i && 'credentials' in n.prototype,
            le = {
              ...A,
              signal: R,
              method: g.toUpperCase(),
              headers: P.normalize().toJSON(),
              body: v,
              duplex: 'half',
              credentials: X ? M : void 0,
            };
          V = i && new n(m, le);
          let te = await (i ? j(V, A) : j(m, le));
          const Oe = f && (C === 'stream' || C === 'response');
          if (f && (x || (Oe && re))) {
            const we = {};
            ['status', 'statusText', 'headers'].forEach((He) => {
              we[He] = te[He];
            });
            const Ie = I.toFiniteNumber(te.headers.get('content-length')),
              [Ye, at] = (x && nu(Ie, di(ru(x), !0))) || [];
            te = new r(
              iu(te.body, su, Ye, () => {
                (at && at(), re && re());
              }),
              we,
            );
          }
          C = C || 'text';
          let qe = await c[I.findKey(c, C) || 'text'](te, p);
          return (
            !Oe && re && re(),
            await new Promise((we, Ie) => {
              wh(we, Ie, {
                data: qe,
                headers: Tt.from(te.headers),
                status: te.status,
                statusText: te.statusText,
                config: p,
                request: V,
              });
            })
          );
        } catch (X) {
          throw (
            re && re(),
            X && X.name === 'TypeError' && /Load failed|fetch/i.test(X.message)
              ? Object.assign(new ye('Network Error', ye.ERR_NETWORK, p, V), {
                  cause: X.cause || X,
                })
              : ye.from(X, X && X.code, p, V)
          );
        }
      };
    },
    n1 = new Map(),
    _h = (e) => {
      let t = (e && e.env) || {};
      const { fetch: n, Request: r, Response: o } = t,
        i = [r, o, n];
      let s = i.length,
        a = s,
        l,
        u,
        f = n1;
      for (; a--; )
        ((l = i[a]),
          (u = f.get(l)),
          u === void 0 && f.set(l, (u = a ? new Map() : t1(t))),
          (f = u));
      return u;
    };
  _h();
  const el = { http: b_, xhr: G_, fetch: { get: _h } };
  I.forEach(el, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, 'name', { value: t });
      } catch {}
      Object.defineProperty(e, 'adapterName', { value: t });
    }
  });
  const uu = (e) => `- ${e}`,
    r1 = (e) => I.isFunction(e) || e === null || e === !1;
  function o1(e, t) {
    e = I.isArray(e) ? e : [e];
    const { length: n } = e;
    let r, o;
    const i = {};
    for (let s = 0; s < n; s++) {
      r = e[s];
      let a;
      if (((o = r), !r1(r) && ((o = el[(a = String(r)).toLowerCase()]), o === void 0)))
        throw new ye(`Unknown adapter '${a}'`);
      if (o && (I.isFunction(o) || (o = o.get(t)))) break;
      i[a || '#' + s] = o;
    }
    if (!o) {
      const s = Object.entries(i).map(
        ([l, u]) =>
          `adapter ${l} ` +
          (u === !1 ? 'is not supported by the environment' : 'is not available in the build'),
      );
      let a = n
        ? s.length > 1
          ? `since :
` +
            s.map(uu).join(`
`)
          : ' ' + uu(s[0])
        : 'as no adapter specified';
      throw new ye('There is no suitable adapter to dispatch the request ' + a, 'ERR_NOT_SUPPORT');
    }
    return o;
  }
  const Sh = { getAdapter: o1, adapters: el };
  function _s(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
      throw new Ir(null, e);
  }
  function fu(e) {
    return (
      _s(e),
      (e.headers = Tt.from(e.headers)),
      (e.data = Es.call(e, e.transformRequest)),
      ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
        e.headers.setContentType('application/x-www-form-urlencoded', !1),
      Sh.getAdapter(
        e.adapter || Co.adapter,
        e,
      )(e).then(
        function (r) {
          return (
            _s(e),
            (r.data = Es.call(e, e.transformResponse, r)),
            (r.headers = Tt.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            bh(r) ||
              (_s(e),
              r &&
                r.response &&
                ((r.response.data = Es.call(e, e.transformResponse, r.response)),
                (r.response.headers = Tt.from(r.response.headers)))),
            Promise.reject(r)
          );
        },
      )
    );
  }
  const Ch = '1.13.2',
    Wi = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
    Wi[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
  });
  const du = {};
  Wi.transitional = function (t, n, r) {
    function o(i, s) {
      return '[Axios v' + Ch + "] Transitional option '" + i + "'" + s + (r ? '. ' + r : '');
    }
    return (i, s, a) => {
      if (t === !1)
        throw new ye(o(s, ' has been removed' + (n ? ' in ' + n : '')), ye.ERR_DEPRECATED);
      return (
        n &&
          !du[s] &&
          ((du[s] = !0),
          console.warn(
            o(s, ' has been deprecated since v' + n + ' and will be removed in the near future'),
          )),
        t ? t(i, s, a) : !0
      );
    };
  };
  Wi.spelling = function (t) {
    return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
  };
  function i1(e, t, n) {
    if (typeof e != 'object') throw new ye('options must be an object', ye.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let o = r.length;
    for (; o-- > 0; ) {
      const i = r[o],
        s = t[i];
      if (s) {
        const a = e[i],
          l = a === void 0 || s(a, i, e);
        if (l !== !0) throw new ye('option ' + i + ' must be ' + l, ye.ERR_BAD_OPTION_VALUE);
        continue;
      }
      if (n !== !0) throw new ye('Unknown option ' + i, ye.ERR_BAD_OPTION);
    }
  }
  const Vo = { assertOptions: i1, validators: Wi },
    Gt = Vo.validators;
  let Gn = class {
    constructor(t) {
      ((this.defaults = t || {}), (this.interceptors = { request: new eu(), response: new eu() }));
    }
    async request(t, n) {
      try {
        return await this._request(t, n);
      } catch (r) {
        if (r instanceof Error) {
          let o = {};
          Error.captureStackTrace ? Error.captureStackTrace(o) : (o = new Error());
          const i = o.stack ? o.stack.replace(/^.+\n/, '') : '';
          try {
            r.stack
              ? i &&
                !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, '')) &&
                (r.stack +=
                  `
` + i)
              : (r.stack = i);
          } catch {}
        }
        throw r;
      }
    }
    _request(t, n) {
      (typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
        (n = Qn(this.defaults, n)));
      const { transitional: r, paramsSerializer: o, headers: i } = n;
      (r !== void 0 &&
        Vo.assertOptions(
          r,
          {
            silentJSONParsing: Gt.transitional(Gt.boolean),
            forcedJSONParsing: Gt.transitional(Gt.boolean),
            clarifyTimeoutError: Gt.transitional(Gt.boolean),
          },
          !1,
        ),
        o != null &&
          (I.isFunction(o)
            ? (n.paramsSerializer = { serialize: o })
            : Vo.assertOptions(o, { encode: Gt.function, serialize: Gt.function }, !0)),
        n.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls !== void 0
            ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
            : (n.allowAbsoluteUrls = !0)),
        Vo.assertOptions(
          n,
          { baseUrl: Gt.spelling('baseURL'), withXsrfToken: Gt.spelling('withXSRFToken') },
          !0,
        ),
        (n.method = (n.method || this.defaults.method || 'get').toLowerCase()));
      let s = i && I.merge(i.common, i[n.method]);
      (i &&
        I.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (p) => {
          delete i[p];
        }),
        (n.headers = Tt.concat(s, i)));
      const a = [];
      let l = !0;
      this.interceptors.request.forEach(function (m) {
        (typeof m.runWhen == 'function' && m.runWhen(n) === !1) ||
          ((l = l && m.synchronous), a.unshift(m.fulfilled, m.rejected));
      });
      const u = [];
      this.interceptors.response.forEach(function (m) {
        u.push(m.fulfilled, m.rejected);
      });
      let f,
        c = 0,
        d;
      if (!l) {
        const p = [fu.bind(this), void 0];
        for (p.unshift(...a), p.push(...u), d = p.length, f = Promise.resolve(n); c < d; )
          f = f.then(p[c++], p[c++]);
        return f;
      }
      d = a.length;
      let h = n;
      for (; c < d; ) {
        const p = a[c++],
          m = a[c++];
        try {
          h = p(h);
        } catch (g) {
          m.call(this, g);
          break;
        }
      }
      try {
        f = fu.call(this, h);
      } catch (p) {
        return Promise.reject(p);
      }
      for (c = 0, d = u.length; c < d; ) f = f.then(u[c++], u[c++]);
      return f;
    }
    getUri(t) {
      t = Qn(this.defaults, t);
      const n = xh(t.baseURL, t.url, t.allowAbsoluteUrls);
      return vh(n, t.params, t.paramsSerializer);
    }
  };
  I.forEach(['delete', 'get', 'head', 'options'], function (t) {
    Gn.prototype[t] = function (n, r) {
      return this.request(Qn(r || {}, { method: t, url: n, data: (r || {}).data }));
    };
  });
  I.forEach(['post', 'put', 'patch'], function (t) {
    function n(r) {
      return function (i, s, a) {
        return this.request(
          Qn(a || {}, {
            method: t,
            headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
            url: i,
            data: s,
          }),
        );
      };
    }
    ((Gn.prototype[t] = n()), (Gn.prototype[t + 'Form'] = n(!0)));
  });
  let s1 = class Th {
    constructor(t) {
      if (typeof t != 'function') throw new TypeError('executor must be a function.');
      let n;
      this.promise = new Promise(function (i) {
        n = i;
      });
      const r = this;
      (this.promise.then((o) => {
        if (!r._listeners) return;
        let i = r._listeners.length;
        for (; i-- > 0; ) r._listeners[i](o);
        r._listeners = null;
      }),
        (this.promise.then = (o) => {
          let i;
          const s = new Promise((a) => {
            (r.subscribe(a), (i = a));
          }).then(o);
          return (
            (s.cancel = function () {
              r.unsubscribe(i);
            }),
            s
          );
        }),
        t(function (i, s, a) {
          r.reason || ((r.reason = new Ir(i, s, a)), n(r.reason));
        }));
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(t) {
      if (this.reason) {
        t(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
      if (!this._listeners) return;
      const n = this._listeners.indexOf(t);
      n !== -1 && this._listeners.splice(n, 1);
    }
    toAbortSignal() {
      const t = new AbortController(),
        n = (r) => {
          t.abort(r);
        };
      return (this.subscribe(n), (t.signal.unsubscribe = () => this.unsubscribe(n)), t.signal);
    }
    static source() {
      let t;
      return {
        token: new Th(function (o) {
          t = o;
        }),
        cancel: t,
      };
    }
  };
  function a1(e) {
    return function (n) {
      return e.apply(null, n);
    };
  }
  function l1(e) {
    return I.isObject(e) && e.isAxiosError === !0;
  }
  const na = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526,
  };
  Object.entries(na).forEach(([e, t]) => {
    na[t] = e;
  });
  function Oh(e) {
    const t = new Gn(e),
      n = oh(Gn.prototype.request, t);
    return (
      I.extend(n, Gn.prototype, t, { allOwnKeys: !0 }),
      I.extend(n, t, null, { allOwnKeys: !0 }),
      (n.create = function (o) {
        return Oh(Qn(e, o));
      }),
      n
    );
  }
  const Ke = Oh(Co);
  Ke.Axios = Gn;
  Ke.CanceledError = Ir;
  Ke.CancelToken = s1;
  Ke.isCancel = bh;
  Ke.VERSION = Ch;
  Ke.toFormData = Zi;
  Ke.AxiosError = ye;
  Ke.Cancel = Ke.CanceledError;
  Ke.all = function (t) {
    return Promise.all(t);
  };
  Ke.spread = a1;
  Ke.isAxiosError = l1;
  Ke.mergeConfig = Qn;
  Ke.AxiosHeaders = Tt;
  Ke.formToJSON = (e) => yh(I.isHTMLForm(e) ? new FormData(e) : e);
  Ke.getAdapter = Sh.getAdapter;
  Ke.HttpStatusCode = na;
  Ke.default = Ke;
  const {
    Axios: vT,
    AxiosError: mT,
    CanceledError: yT,
    isCancel: bT,
    CancelToken: wT,
    VERSION: xT,
    all: ET,
    Cancel: _T,
    isAxiosError: ST,
    spread: CT,
    toFormData: TT,
    AxiosHeaders: OT,
    HttpStatusCode: PT,
    formToJSON: AT,
    getAdapter: IT,
    mergeConfig: MT,
  } = Ke;
  class c1 {
    instance;
    baseUrl;
    jsonParseReviver = void 0;
    constructor(t, n) {
      ((this.instance = n || Ke.create()), (this.baseUrl = t ?? 'https://localhost:7048'));
    }
    getPagedCharacters(t, n, r, o, i, s) {
      let a = this.baseUrl + '/v1/characters?';
      if (t == null)
        throw new globalThis.Error(
          "The parameter 'pageNumber' must be defined and cannot be null.",
        );
      if (((a += 'pageNumber=' + encodeURIComponent('' + t) + '&'), n == null))
        throw new globalThis.Error("The parameter 'pageSize' must be defined and cannot be null.");
      if (((a += 'pageSize=' + encodeURIComponent('' + n) + '&'), r == null))
        throw new globalThis.Error("The parameter 'sortType' must be defined and cannot be null.");
      if (((a += 'sortType=' + encodeURIComponent('' + r) + '&'), o == null))
        throw new globalThis.Error("The parameter 'sortOrder' must be defined and cannot be null.");
      if (((a += 'sortOrder=' + encodeURIComponent('' + o) + '&'), i === null))
        throw new globalThis.Error("The parameter 'nameFilter' cannot be null.");
      (i !== void 0 && (a += 'nameFilter=' + encodeURIComponent('' + i) + '&'),
        (a = a.replace(/[?&]$/, '')));
      let l = { method: 'GET', url: a, headers: { Accept: 'application/json' }, signal: s };
      return this.instance
        .request(l)
        .catch((u) => {
          if (En(u) && u.response) return u.response;
          throw u;
        })
        .then((u) => this.processGetPagedCharacters(u));
    }
    processGetPagedCharacters(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 200) {
        const o = t.data;
        let i = null,
          s = o;
        if (Array.isArray(s)) {
          i = [];
          for (let a of s) i.push(nl.fromJS(a));
        } else i = null;
        return Promise.resolve(new ft(n, r, i));
      } else if (n === 400) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('Bad Request', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    createCharacter(t, n) {
      let r = this.baseUrl + '/v1/characters';
      r = r.replace(/[?&]$/, '');
      let i = {
        data: JSON.stringify(t),
        method: 'POST',
        url: r,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: n,
      };
      return this.instance
        .request(i)
        .catch((s) => {
          if (En(s) && s.response) return s.response;
          throw s;
        })
        .then((s) => this.processCreateCharacter(s));
    }
    processCreateCharacter(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 201) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = s !== void 0 ? s : null), Promise.resolve(new ft(n, r, i)));
      } else if (n === 400) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('Bad Request', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    getCharacterById(t, n) {
      let r = this.baseUrl + '/v1/characters/{id}';
      if (t == null) throw new globalThis.Error("The parameter 'id' must be defined.");
      ((r = r.replace('{id}', encodeURIComponent('' + t))), (r = r.replace(/[?&]$/, '')));
      let o = { method: 'GET', url: r, headers: { Accept: 'application/json' }, signal: n };
      return this.instance
        .request(o)
        .catch((i) => {
          if (En(i) && i.response) return i.response;
          throw i;
        })
        .then((i) => this.processGetCharacterById(i));
    }
    processGetCharacterById(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 200) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = tl.fromJS(s)), Promise.resolve(new ft(n, r, i)));
      } else if (n === 404) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('The specified resource was not found', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    updateCharacter(t, n, r, o) {
      let i = this.baseUrl + '/v1/characters/{id}';
      if (t == null) throw new globalThis.Error("The parameter 'id' must be defined.");
      ((i = i.replace('{id}', encodeURIComponent('' + t))), (i = i.replace(/[?&]$/, '')));
      let a = {
        data: JSON.stringify(r),
        method: 'PUT',
        url: i,
        headers: { 'If-Match': n != null ? '' + n : '', 'Content-Type': 'application/json' },
        signal: o,
      };
      return this.instance
        .request(a)
        .catch((l) => {
          if (En(l) && l.response) return l.response;
          throw l;
        })
        .then((l) => this.processUpdateCharacter(l));
    }
    processUpdateCharacter(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 204) return (t.data, Promise.resolve(new ft(n, r, null)));
      if (n === 400) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('Bad Request', n, o, r, i));
      } else if (n === 404) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('The specified resource was not found', n, o, r, i));
      } else if (n === 412) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('Precondition Failed', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    deleteCharacter(t, n) {
      let r = this.baseUrl + '/v1/characters/{id}';
      if (t == null) throw new globalThis.Error("The parameter 'id' must be defined.");
      ((r = r.replace('{id}', encodeURIComponent('' + t))), (r = r.replace(/[?&]$/, '')));
      let o = { method: 'DELETE', url: r, headers: {}, signal: n };
      return this.instance
        .request(o)
        .catch((i) => {
          if (En(i) && i.response) return i.response;
          throw i;
        })
        .then((i) => this.processDeleteCharacter(i));
    }
    processDeleteCharacter(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 204) return (t.data, Promise.resolve(new ft(n, r, null)));
      if (n === 404) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('The specified resource was not found', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    createKnowRelationship(t, n) {
      let r = this.baseUrl + '/v1/characters/knows';
      r = r.replace(/[?&]$/, '');
      let i = {
        data: JSON.stringify(t),
        method: 'POST',
        url: r,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: n,
      };
      return this.instance
        .request(i)
        .catch((s) => {
          if (En(s) && s.response) return s.response;
          throw s;
        })
        .then((s) => this.processCreateKnowRelationship(s));
    }
    processCreateKnowRelationship(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 201) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = s !== void 0 ? s : null), Promise.resolve(new ft(n, r, i)));
      } else if (n === 400) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('Bad Request', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    findRelationBetweenCharacters(t, n, r, o) {
      let i = this.baseUrl + '/v1/characters/path/{from}/to/{to}?';
      if (t == null) throw new globalThis.Error("The parameter 'from' must be defined.");
      if (((i = i.replace('{from}', encodeURIComponent('' + t))), n == null))
        throw new globalThis.Error("The parameter 'to' must be defined.");
      if (((i = i.replace('{to}', encodeURIComponent('' + n))), r === null))
        throw new globalThis.Error("The parameter 'maxHops' cannot be null.");
      (r !== void 0 && (i += 'maxHops=' + encodeURIComponent('' + r) + '&'),
        (i = i.replace(/[?&]$/, '')));
      let s = { method: 'GET', url: i, headers: { Accept: 'application/json' }, signal: o };
      return this.instance
        .request(s)
        .catch((a) => {
          if (En(a) && a.response) return a.response;
          throw a;
        })
        .then((a) => this.processFindRelationBetweenCharacters(a));
    }
    processFindRelationBetweenCharacters(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 200) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = rl.fromJS(s)), Promise.resolve(new ft(n, r, i)));
      } else if (n === 404) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('The specified resource was not found', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
    deleteKnowRelationship(t, n, r) {
      let o = this.baseUrl + '/v1/characters/knows/{from}/to/{to}';
      if (t == null) throw new globalThis.Error("The parameter 'from' must be defined.");
      if (((o = o.replace('{from}', encodeURIComponent('' + t))), n == null))
        throw new globalThis.Error("The parameter 'to' must be defined.");
      ((o = o.replace('{to}', encodeURIComponent('' + n))), (o = o.replace(/[?&]$/, '')));
      let i = { method: 'DELETE', url: o, headers: {}, signal: r };
      return this.instance
        .request(i)
        .catch((s) => {
          if (En(s) && s.response) return s.response;
          throw s;
        })
        .then((s) => this.processDeleteKnowRelationship(s));
    }
    processDeleteKnowRelationship(t) {
      const n = t.status;
      let r = {};
      if (t.headers && typeof t.headers == 'object')
        for (const o in t.headers) t.headers.hasOwnProperty(o) && (r[o] = t.headers[o]);
      if (n === 204) return (t.data, Promise.resolve(new ft(n, r, null)));
      if (n === 404) {
        const o = t.data;
        let i = null,
          s = o;
        return ((i = jt.fromJS(s)), nt('The specified resource was not found', n, o, r, i));
      } else if (n !== 200 && n !== 204) {
        const o = t.data;
        return nt('An unexpected server error occurred.', n, o, r);
      }
      return Promise.resolve(new ft(n, r, null));
    }
  }
  class jt {
    type;
    title;
    status;
    detail;
    instance;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        ((this.type = t.type),
          (this.title = t.title),
          (this.status = t.status),
          (this.detail = t.detail),
          (this.instance = t.instance));
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new jt();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      return (
        (t.type = this.type),
        (t.title = this.title),
        (t.status = this.status),
        (t.detail = this.detail),
        (t.instance = this.instance),
        t
      );
    }
  }
  class tl {
    id;
    name;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        ((this.id = t.id), (this.name = t.name));
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new tl();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      return ((t.id = this.id), (t.name = this.name), t);
    }
  }
  class nl {
    id;
    name;
    knowCharacterIds;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
      t || (this.knowCharacterIds = []);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        if (((this.id = t.id), (this.name = t.name), Array.isArray(t.knowCharacterIds))) {
          this.knowCharacterIds = [];
          for (let r of t.knowCharacterIds) this.knowCharacterIds.push(r);
        }
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new nl();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      if (((t.id = this.id), (t.name = this.name), Array.isArray(this.knowCharacterIds))) {
        t.knowCharacterIds = [];
        for (let r of this.knowCharacterIds) t.knowCharacterIds.push(r);
      }
      return t;
    }
  }
  class rl {
    characterIds;
    hops;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
      t || (this.characterIds = []);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        if (Array.isArray(t.characterIds)) {
          this.characterIds = [];
          for (let r of t.characterIds) this.characterIds.push(r);
        }
        this.hops = t.hops;
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new rl();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      if (Array.isArray(this.characterIds)) {
        t.characterIds = [];
        for (let r of this.characterIds) t.characterIds.push(r);
      }
      return ((t.hops = this.hops), t);
    }
  }
  class ol {
    name;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        this.name = t.name;
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new ol();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      return ((t.name = this.name), t);
    }
  }
  class il {
    name;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        this.name = t.name;
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new il();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      return ((t.name = this.name), t);
    }
  }
  class sl {
    fromCharacterId;
    toCharacterId;
    description;
    constructor(t) {
      if (t) for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    }
    init(t) {
      if (t) {
        for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
        ((this.fromCharacterId = t.fromCharacterId),
          (this.toCharacterId = t.toCharacterId),
          (this.description = t.description));
      }
    }
    static fromJS(t) {
      t = typeof t == 'object' ? t : {};
      let n = new sl();
      return (n.init(t), n);
    }
    toJSON(t) {
      t = typeof t == 'object' ? t : {};
      for (var n in this) this.hasOwnProperty(n) && (t[n] = this[n]);
      return (
        (t.fromCharacterId = this.fromCharacterId),
        (t.toCharacterId = this.toCharacterId),
        (t.description = this.description),
        t
      );
    }
  }
  class ft {
    status;
    headers;
    result;
    constructor(t, n, r) {
      ((this.status = t), (this.headers = n), (this.result = r));
    }
  }
  class u1 extends Error {
    message;
    status;
    response;
    headers;
    result;
    constructor(t, n, r, o, i) {
      (super(),
        (this.message = t),
        (this.status = n),
        (this.response = r),
        (this.headers = o),
        (this.result = i));
    }
    isApiException = !0;
    static isApiException(t) {
      return t.isApiException === !0;
    }
  }
  function nt(e, t, n, r, o) {
    throw o ?? new u1(e, t, n, r, null);
  }
  function En(e) {
    return e && e.isAxiosError === !0;
  }
  class Ph {
    id;
    name;
    version;
    constructor(t, n, r) {
      ((this.id = t), (this.name = n), (this.version = r));
    }
  }
  class ra {
    id;
    name;
    knowCharacterIds;
    constructor(t, n, r = []) {
      ((this.id = t), (this.name = n), (this.knowCharacterIds = r));
    }
  }
  class f1 {
    characterIds;
    hops;
    constructor(t = [], n = 0) {
      ((this.characterIds = t), (this.hops = n));
    }
    get isEmpty() {
      return this.characterIds.length === 0;
    }
  }
  class d1 {
    _rpgAssistantClient;
    constructor(t) {
      this._rpgAssistantClient = new c1(t);
    }
    async createCharacterAsync(t, n) {
      const r = new ol({ name: t });
      return (await this._rpgAssistantClient.createCharacter(r, n)).result;
    }
    async getCharacterAsync(t, n) {
      const r = await this._rpgAssistantClient.getCharacterById(t, n);
      return new Ph(r.result.id, r.result.name, r.headers.etag);
    }
    async updateCharacterAsync(t, n) {
      const r = new il({ name: t.name });
      await this._rpgAssistantClient.updateCharacter(t.id, t.version, r, n);
    }
    async deleteCharacterAsync(t, n) {
      await this._rpgAssistantClient.deleteCharacter(t, n);
    }
    async getCharactersAsync(t, n) {
      return (
        await this._rpgAssistantClient.getPagedCharacters(
          t.pageNumber,
          t.pageSize,
          t.sortType,
          t.sortOrder,
          void 0,
          n,
        )
      ).result.map((o) => new ra(o.id, o.name, o.knowCharacterIds));
    }
    async createKnowRelationBetweenCharacters(t, n, r, o) {
      const i = new sl({ fromCharacterId: t, toCharacterId: n, description: r });
      return (await this._rpgAssistantClient.createKnowRelationship(i, o)).result;
    }
    async deleteKnowRelationBetweenCharacters(t, n, r) {
      return (await this._rpgAssistantClient.deleteKnowRelationship(t, n, r)).result;
    }
    async searchCharactersByNameAsync(t, n, r, o) {
      return (
        await this._rpgAssistantClient.getPagedCharacters(n, r, 'name', 'Asc', t, o)
      ).result.map((s) => new ra(s.id, s.name, s.knowCharacterIds));
    }
    async findRelationBetweenCharactersAsync(t, n, r) {
      const o = await this._rpgAssistantClient.findRelationBetweenCharacters(t, n, void 0, r);
      return new f1(o.result.characterIds ?? [], o.result.hops ?? 0);
    }
  }
  class h1 {
    pageNumber;
    pageSize;
    sortType;
    sortOrder;
    constructor(t, n, r, o) {
      ((this.pageNumber = t), (this.pageSize = n), (this.sortType = r), (this.sortOrder = o));
    }
  }
  const p1 = { class: 'delete-character-form' },
    g1 = ['disabled'],
    v1 = pe({
      __name: 'DeleteCharacterComponent',
      props: { rpgAssistantService: {}, characterId: {} },
      emits: ['deletedCharacter'],
      setup(e, { emit: t }) {
        const n = e;
        let r = null;
        const o = t;
        async function i() {
          if ((r?.abort(), !n.characterId)) return;
          r = new AbortController();
          const s = r.signal;
          (await n.rpgAssistantService.deleteCharacterAsync(n.characterId, s),
            o('deletedCharacter', n.characterId));
        }
        return (
          jn(() => {
            r?.abort();
          }),
          (s, a) => (
            N(),
            K('div', p1, [
              ie(
                'button',
                { id: 'delete-character-button', onClick: i, disabled: !e.characterId },
                ' Delete character ',
                8,
                g1,
              ),
            ])
          )
        );
      },
    }),
    m1 = { class: 'create-know-edge-form' },
    y1 = ['disabled'],
    b1 = pe({
      __name: 'CreateCharacterKnowEdgeComponent',
      props: { rpgAssistantService: {}, fromNodeId: {}, targetNodeId: {}, edgeIdSeparator: {} },
      emits: ['createKnowEdge'],
      setup(e, { emit: t }) {
        const n = e;
        let r = null;
        const o = t;
        async function i() {
          if ((r?.abort(), !n.fromNodeId || !n.targetNodeId)) return;
          r = new AbortController();
          const s = r.signal;
          await n.rpgAssistantService.createKnowRelationBetweenCharacters(
            n.fromNodeId,
            n.targetNodeId,
            '',
            s,
          );
          const a = n.fromNodeId + n.edgeIdSeparator + n.targetNodeId;
          o('createKnowEdge', a);
        }
        return (
          jn(() => {
            r?.abort();
          }),
          (s, a) => (
            N(),
            K('div', m1, [
              ie(
                'button',
                {
                  id: 'create-know-edge-button',
                  onClick: i,
                  disabled: !e.fromNodeId || !e.targetNodeId,
                },
                ' Create know edge ',
                8,
                y1,
              ),
            ])
          )
        );
      },
    }),
    Mr = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, o] of t) n[r] = o;
      return n;
    },
    w1 = Mr(b1, [['__scopeId', 'data-v-40807360']]);
  function al() {
    const e = J(),
      t = J(!1),
      n = J({ x: 0, y: 0 });
    let r = null;
    function o() {
      ((t.value = !1),
        r && (document.removeEventListener('pointerdown', r, { capture: !0 }), (r = null)));
    }
    function i(s) {
      ((n.value = { x: s.clientX, y: s.clientY }),
        (t.value = !0),
        r && document.removeEventListener('pointerdown', r, { capture: !0 }),
        (r = (a) => {
          const l = e.value;
          l && (!a.target || !l.contains(a.target)) && o();
        }),
        document.addEventListener('pointerdown', r, { passive: !0, capture: !0 }));
    }
    return { menuEl: e, isOpen: t, pos: n, showContextMenu: i, hideMenu: o };
  }
  const x1 = { class: 'rpg-assistant' },
    E1 = { class: 'dropdown-menu', role: 'menu' },
    _1 = { class: 'dropdown-content' },
    S1 = ['disabled'],
    C1 = ['disabled'],
    T1 = { class: 'dropdown-item dropdown-item--embedded' },
    O1 = { class: 'dropdown-item dropdown-item--embedded' },
    P1 = pe({
      __name: 'NodeContextMenuComponent',
      props: {
        rpgAssistantService: {},
        firstSelectedCharacterId: {},
        secondSelectedCharacterId: {},
        edgeIdSeparator: {},
      },
      emits: [
        'openUpdateCharacterDialog',
        'openFindPathDialog',
        'deletedCharacterFromMenu',
        'createKnowEdgeFromMenu',
      ],
      setup(e, { expose: t, emit: n }) {
        const { menuEl: r, isOpen: o, pos: i, showContextMenu: s, hideMenu: a } = al(),
          l = e,
          u = n;
        function f() {
          l.firstSelectedCharacterId && (u('openUpdateCharacterDialog'), a());
        }
        function c() {
          l.firstSelectedCharacterId && (u('openFindPathDialog'), a());
        }
        function d(m) {
          (u('deletedCharacterFromMenu', m), a());
        }
        function h(m) {
          (u('createKnowEdgeFromMenu', m), a());
        }
        function p(m) {
          const { event: g } = m;
          (g.stopPropagation(), g.preventDefault(), s(g));
        }
        return (
          t({ showNodeContextMenu: p, hideMenu: a }),
          (m, g) => (
            N(),
            me(_a, { to: 'body' }, [
              ie('div', x1, [
                ie(
                  'div',
                  {
                    ref_key: 'menuEl',
                    ref: r,
                    class: Be(['dropdown node-context-dropdown', { 'is-active': L(o) }]),
                    style: Ft({ left: `${L(i).x}px`, top: `${L(i).y}px` }),
                  },
                  [
                    ie('div', E1, [
                      ie('div', _1, [
                        ie(
                          'button',
                          {
                            class: 'dropdown-item',
                            type: 'button',
                            onClick: f,
                            disabled: !e.firstSelectedCharacterId,
                          },
                          ' Update character ',
                          8,
                          S1,
                        ),
                        ie(
                          'button',
                          {
                            id: 'node-context-find-path-button',
                            class: 'dropdown-item',
                            type: 'button',
                            onClick: c,
                            disabled: !e.firstSelectedCharacterId,
                          },
                          ' Search path to ',
                          8,
                          C1,
                        ),
                        ie('div', T1, [
                          Te(
                            v1,
                            {
                              disabled: !e.firstSelectedCharacterId,
                              rpgAssistantService: e.rpgAssistantService,
                              characterId: e.firstSelectedCharacterId,
                              onDeletedCharacter: d,
                            },
                            null,
                            8,
                            ['disabled', 'rpgAssistantService', 'characterId'],
                          ),
                        ]),
                        ie('div', O1, [
                          Te(
                            w1,
                            {
                              rpgAssistantService: e.rpgAssistantService,
                              fromNodeId: e.firstSelectedCharacterId,
                              targetNodeId: e.secondSelectedCharacterId,
                              edgeIdSeparator: e.edgeIdSeparator,
                              onCreateKnowEdge: h,
                            },
                            null,
                            8,
                            [
                              'rpgAssistantService',
                              'fromNodeId',
                              'targetNodeId',
                              'edgeIdSeparator',
                            ],
                          ),
                        ]),
                      ]),
                    ]),
                  ],
                  6,
                ),
              ]),
            ])
          )
        );
      },
    }),
    A1 = Mr(P1, [['__scopeId', 'data-v-03655493']]),
    I1 = { class: 'delete-know-edge-form' },
    M1 = pe({
      __name: 'DeleteKnowCharacterEdgeComponent',
      props: { rpgAssistantService: {}, edgeId: {}, edgeIdSeparator: {} },
      emits: ['deletedKnowEdge'],
      setup(e, { emit: t }) {
        const n = e;
        let r = null;
        const o = t;
        async function i() {
          if ((r?.abort(), !n.edgeId)) return;
          r = new AbortController();
          const s = r.signal,
            [a, l] = n.edgeId.split(n.edgeIdSeparator);
          (await n.rpgAssistantService.deleteKnowRelationBetweenCharacters(a, l, s),
            o('deletedKnowEdge', n.edgeId));
        }
        return (
          jn(() => {
            r?.abort();
          }),
          (s, a) => (
            N(),
            K('div', I1, [
              ie('button', { id: 'delete-know-edge-button', onClick: i }, 'Delete know edge'),
            ])
          )
        );
      },
    }),
    k1 = { class: 'rpg-assistant' },
    R1 = { class: 'dropdown-menu', role: 'menu' },
    N1 = { class: 'dropdown-content' },
    L1 = { class: 'dropdown-item' },
    D1 = pe({
      __name: 'EdgeContextMenuComponent',
      props: { rpgAssistantService: {}, selectedEdgeId: {}, edgeIdSeparator: {} },
      emits: ['deleteKnowEdgeFromMenu'],
      setup(e, { expose: t, emit: n }) {
        const { menuEl: r, isOpen: o, pos: i, showContextMenu: s, hideMenu: a } = al(),
          l = n;
        function u(c) {
          (l('deleteKnowEdgeFromMenu', c), a());
        }
        function f(c) {
          const { event: d } = c;
          (d.stopPropagation(), d.preventDefault(), s(d));
        }
        return (
          t({ showEdgeContextMenu: f, hideMenu: a }),
          (c, d) => (
            N(),
            me(_a, { to: 'body' }, [
              ie('div', k1, [
                ie(
                  'div',
                  {
                    ref_key: 'menuEl',
                    ref: r,
                    class: Be(['dropdown context-dropdown', { 'is-active': L(o) }]),
                    style: Ft({ left: `${L(i).x}px`, top: `${L(i).y}px` }),
                  },
                  [
                    ie('div', R1, [
                      ie('div', N1, [
                        ie('div', L1, [
                          Te(
                            M1,
                            {
                              rpgAssistantService: e.rpgAssistantService,
                              edgeId: e.selectedEdgeId,
                              edgeIdSeparator: e.edgeIdSeparator,
                              onDeletedKnowEdge: u,
                            },
                            null,
                            8,
                            ['rpgAssistantService', 'edgeId', 'edgeIdSeparator'],
                          ),
                        ]),
                      ]),
                    ]),
                  ],
                  6,
                ),
              ]),
            ])
          )
        );
      },
    }),
    $1 = Mr(D1, [['__scopeId', 'data-v-76bc6679']]),
    j1 = { class: 'rpg-assistant' },
    z1 = pe({
      __name: 'ViewContextMenuComponent',
      emits: ['openCreateCharacterDialog'],
      setup(e, { expose: t, emit: n }) {
        const { menuEl: r, isOpen: o, pos: i, showContextMenu: s, hideMenu: a } = al(),
          l = n;
        function u() {
          (l('openCreateCharacterDialog'), a());
        }
        function f(c) {
          const { event: d } = c;
          (d.stopPropagation(), d.preventDefault(), s(d));
        }
        return (
          t({ showViewContextMenu: f, hideMenu: a }),
          (c, d) => (
            N(),
            me(_a, { to: 'body' }, [
              ie('div', j1, [
                ie(
                  'div',
                  {
                    ref_key: 'menuEl',
                    ref: r,
                    class: Be(['dropdown context-dropdown', { 'is-active': L(o) }]),
                    style: Ft({ left: `${L(i).x}px`, top: `${L(i).y}px` }),
                  },
                  [
                    ie('div', { class: 'dropdown-menu', role: 'menu' }, [
                      ie('div', { class: 'dropdown-content' }, [
                        ie(
                          'button',
                          { class: 'dropdown-item', type: 'button', onClick: u },
                          ' Create character ',
                        ),
                      ]),
                    ]),
                  ],
                  6,
                ),
              ]),
            ])
          )
        );
      },
    }),
    B1 = Mr(z1, [['__scopeId', 'data-v-795a00d3']]),
    F1 = { class: 'modal-card' },
    U1 = { class: 'modal-card-body' },
    H1 = pe({
      __name: 'CreateCharacterComponent',
      props: _r(
        { rpgAssistantService: {} },
        { open: { type: Boolean, required: !0 }, openModifiers: {} },
      ),
      emits: _r(['characterCreated'], ['update:open']),
      setup(e, { emit: t }) {
        const n = e,
          r = Pa(e, 'open'),
          o = t;
        let i = null;
        const s = J('');
        async function a() {
          (i?.abort(), (i = new AbortController()));
          const u = i.signal,
            f = await n.rpgAssistantService.createCharacterAsync(s.value, u),
            c = new sd(new ra(f, s.value));
          (o('characterCreated', c), (r.value = !1), (s.value = ''));
        }
        function l() {
          ((s.value = ''), (r.value = !1));
        }
        return (
          jn(() => {
            i?.abort();
          }),
          (u, f) => (
            N(),
            K(
              'div',
              { class: Be(['modal', { 'is-active': r.value }]) },
              [
                f[2] || (f[2] = ie('div', { class: 'modal-background' }, null, -1)),
                ie('div', F1, [
                  f[1] ||
                    (f[1] = ie(
                      'header',
                      { class: 'modal-card-head' },
                      [ie('p', { class: 'modal-card-title' }, 'Create character node')],
                      -1,
                    )),
                  ie('section', U1, [
                    Ea(
                      ie(
                        'input',
                        {
                          class: 'input',
                          id: 'create-character-node-name-input',
                          type: 'text',
                          placeholder: 'Enter new name',
                          'onUpdate:modelValue': f[0] || (f[0] = (c) => (s.value = c)),
                        },
                        null,
                        512,
                      ),
                      [[Ia, s.value]],
                    ),
                  ]),
                  ie('footer', { class: 'modal-card-foot' }, [
                    ie('div', { class: 'buttons' }, [
                      ie(
                        'button',
                        {
                          id: 'create-character-node-submit-button',
                          class: 'button is-light',
                          onClick: a,
                        },
                        ' Create ',
                      ),
                      ie('button', { class: 'button is-ghost', onClick: l }, 'Cancel'),
                    ]),
                  ]),
                ]),
              ],
              2,
            )
          )
        );
      },
    });
  class V1 {
    id;
    name;
    version;
    constructor(t, n, r) {
      ((this.id = t), (this.name = n), (this.version = r));
    }
  }
  const Z1 = { class: 'modal-card' },
    W1 = { class: 'modal-card-body' },
    K1 = pe({
      __name: 'UpdateCharacterComponent',
      props: _r(
        { rpgAssistantService: {}, characterId: {} },
        { open: { type: Boolean, required: !0 }, openModifiers: {} },
      ),
      emits: _r(['updatedCharacter'], ['update:open']),
      setup(e, { emit: t }) {
        const n = e,
          r = Pa(e, 'open'),
          o = t,
          i = J(new Ph('', '', ''));
        let s = null;
        async function a() {
          (s?.abort(), (s = new AbortController()));
          const f = s.signal;
          (await n.rpgAssistantService.updateCharacterAsync(
            new V1(i.value.id, i.value.name, i.value.version),
            f,
          ),
            o('updatedCharacter', i.value),
            (r.value = !1));
        }
        function l() {
          r.value = !1;
        }
        async function u(f) {
          (s?.abort(), (s = new AbortController()));
          const c = await n.rpgAssistantService.getCharacterAsync(f, s.signal);
          ((i.value.id = c.id), (i.value.name = c.name), (i.value.version = c.version));
        }
        return (
          be(
            () => n.characterId,
            async (f) => {
              f && (await u(f));
            },
            { immediate: !0 },
          ),
          jn(() => {
            s?.abort();
          }),
          (f, c) => (
            N(),
            K(
              'div',
              { class: Be(['modal', { 'is-active': r.value }]) },
              [
                c[2] || (c[2] = ie('div', { class: 'modal-background' }, null, -1)),
                ie('div', Z1, [
                  c[1] ||
                    (c[1] = ie(
                      'header',
                      { class: 'modal-card-head' },
                      [ie('p', { class: 'modal-card-title' }, 'Update character node')],
                      -1,
                    )),
                  ie('section', W1, [
                    Ea(
                      ie(
                        'input',
                        {
                          class: 'input',
                          id: 'update-character-node-name-input',
                          type: 'text',
                          placeholder: 'Enter new name',
                          'onUpdate:modelValue': c[0] || (c[0] = (d) => (i.value.name = d)),
                        },
                        null,
                        512,
                      ),
                      [[Ia, i.value.name]],
                    ),
                  ]),
                  ie('footer', { class: 'modal-card-foot' }, [
                    ie('div', { class: 'buttons' }, [
                      ie(
                        'button',
                        {
                          class: 'button is-light',
                          id: 'update-character-node-submit-button',
                          onClick: a,
                        },
                        ' Update ',
                      ),
                      ie('button', { class: 'button is-ghost', onClick: l }, 'Cancel'),
                    ]),
                  ]),
                ]),
              ],
              2,
            )
          )
        );
      },
    });
  function q1(e, t = {}) {
    const n = t.pageSize ?? 10,
      r = t.debounceMs ?? 250,
      o = J(''),
      i = J([]),
      s = J(!1),
      a = J(!1),
      l = J(1);
    let u = null,
      f = null;
    const c = B(() => {
      const g = t.excludeId?.();
      return g ? i.value.filter((v) => v.id !== g) : i.value;
    });
    function d() {
      (u?.abort(), (u = null), (i.value = []), (l.value = 1), (a.value = !1), (s.value = !1));
    }
    async function h(g) {
      (u?.abort(), (u = new AbortController()), (s.value = !0));
      try {
        const v = await e.searchCharactersByNameAsync(o.value, g, n, u.signal);
        (g === 1 ? (i.value = v) : (i.value = [...i.value, ...v]),
          (a.value = v.length === n),
          (l.value = g));
      } catch (v) {
        if (v.name === 'CanceledError' || v.name === 'AbortError') return;
        throw v;
      } finally {
        s.value = !1;
      }
    }
    async function p() {
      s.value || !a.value || (await h(l.value + 1));
    }
    be(o, (g) => {
      if ((f && clearTimeout(f), !g || g.trim().length === 0)) {
        d();
        return;
      }
      f = setTimeout(() => {
        (d(), h(1));
      }, r);
    });
    function m() {
      (f && clearTimeout(f), u?.abort());
    }
    return {
      query: o,
      items: c,
      loading: s,
      hasMore: a,
      pageNumber: l,
      loadMore: p,
      reset: d,
      cancel: m,
    };
  }
  const G1 = { class: 'modal-card' },
    X1 = { class: 'modal-card-body' },
    J1 = { key: 0, id: 'find-path-no-path-message', class: 'help is-danger mt-2' },
    Y1 = { key: 0, class: 'results-empty' },
    Q1 = ['onClick'],
    eS = { key: 1, class: 'results-empty' },
    tS = { key: 2, class: 'results-empty' },
    nS = { key: 3, class: 'results-empty results-end' },
    rS = 24,
    oS = pe({
      __name: 'FindPathToCharacterComponent',
      props: _r(
        { rpgAssistantService: {}, fromCharacterId: {} },
        { open: { type: Boolean, required: !0 }, openModifiers: {} },
      ),
      emits: _r(['pathFound'], ['update:open']),
      setup(e, { emit: t }) {
        const n = e,
          r = Pa(e, 'open'),
          o = t,
          {
            query: i,
            items: s,
            loading: a,
            hasMore: l,
            loadMore: u,
            reset: f,
            cancel: c,
          } = q1(n.rpgAssistantService, {
            pageSize: 10,
            debounceMs: 250,
            excludeId: () => n.fromCharacterId,
          }),
          d = J(!1),
          h = J(!1);
        let p = null;
        function m(w) {
          const y = w.currentTarget;
          y.scrollTop + y.clientHeight >= y.scrollHeight - rS && u();
        }
        async function g(w) {
          if (n.fromCharacterId) {
            (p?.abort(), (p = new AbortController()), (h.value = !0), (d.value = !1));
            try {
              const y = await n.rpgAssistantService.findRelationBetweenCharactersAsync(
                n.fromCharacterId,
                w,
                p.signal,
              );
              if (y.isEmpty) {
                d.value = !0;
                return;
              }
              (o('pathFound', y.characterIds), b());
            } finally {
              h.value = !1;
            }
          }
        }
        function v() {
          b();
        }
        function b() {
          ((r.value = !1), (i.value = ''), (d.value = !1), f());
        }
        return (
          be(r, (w) => {
            w || ((i.value = ''), (d.value = !1), f());
          }),
          jn(() => {
            (c(), p?.abort());
          }),
          (w, y) => (
            N(),
            K(
              'div',
              { class: Be(['modal', { 'is-active': r.value }]) },
              [
                y[2] || (y[2] = ie('div', { class: 'modal-background' }, null, -1)),
                ie('div', G1, [
                  y[1] ||
                    (y[1] = ie(
                      'header',
                      { class: 'modal-card-head' },
                      [ie('p', { class: 'modal-card-title' }, 'Search path to character')],
                      -1,
                    )),
                  ie('section', X1, [
                    Ea(
                      ie(
                        'input',
                        {
                          id: 'find-path-name-input',
                          class: 'input',
                          type: 'text',
                          placeholder: 'Type character name',
                          'onUpdate:modelValue':
                            y[0] || (y[0] = (x) => (tt(i) ? (i.value = x) : null)),
                        },
                        null,
                        512,
                      ),
                      [[Ia, L(i)]],
                    ),
                    d.value
                      ? (N(), K('p', J1, ' No path exists between selected characters. '))
                      : Xe('', !0),
                    ie(
                      'ul',
                      { id: 'find-path-results-list', class: 'results-list mt-3', onScroll: m },
                      [
                        L(a) && L(s).length === 0 ? (N(), K('li', Y1, 'Loading…')) : Xe('', !0),
                        (N(!0),
                        K(
                          he,
                          null,
                          ze(
                            L(s),
                            (x) => (
                              N(),
                              K(
                                'li',
                                {
                                  key: x.id,
                                  class: Be(['result-item', { 'is-disabled': h.value }]),
                                  onClick: (E) => g(x.id),
                                },
                                Wo(x.name),
                                11,
                                Q1,
                              )
                            ),
                          ),
                          128,
                        )),
                        L(a) && L(s).length > 0 ? (N(), K('li', eS, 'Loading more…')) : Xe('', !0),
                        !L(a) && L(s).length === 0 && L(i).length > 0
                          ? (N(), K('li', tS, ' No matching characters. '))
                          : Xe('', !0),
                        !L(a) && !L(l) && L(s).length > 0
                          ? (N(), K('li', nS, ' End of results. '))
                          : Xe('', !0),
                      ],
                      32,
                    ),
                  ]),
                  ie('footer', { class: 'modal-card-foot' }, [
                    ie('div', { class: 'buttons' }, [
                      ie(
                        'button',
                        { id: 'find-path-cancel-button', class: 'button is-ghost', onClick: v },
                        ' Cancel ',
                      ),
                    ]),
                  ]),
                ]),
              ],
              2,
            )
          )
        );
      },
    }),
    iS = Mr(oS, [['__scopeId', 'data-v-a5c3a527']]);
  function Ah(e, t) {
    var n,
      r = 1;
    (e == null && (e = 0), t == null && (t = 0));
    function o() {
      var i,
        s = n.length,
        a,
        l = 0,
        u = 0;
      for (i = 0; i < s; ++i) ((a = n[i]), (l += a.x), (u += a.y));
      for (l = (l / s - e) * r, u = (u / s - t) * r, i = 0; i < s; ++i)
        ((a = n[i]), (a.x -= l), (a.y -= u));
    }
    return (
      (o.initialize = function (i) {
        n = i;
      }),
      (o.x = function (i) {
        return arguments.length ? ((e = +i), o) : e;
      }),
      (o.y = function (i) {
        return arguments.length ? ((t = +i), o) : t;
      }),
      (o.strength = function (i) {
        return arguments.length ? ((r = +i), o) : r;
      }),
      o
    );
  }
  function sS(e) {
    const t = +this._x.call(null, e),
      n = +this._y.call(null, e);
    return Ih(this.cover(t, n), t, n, e);
  }
  function Ih(e, t, n, r) {
    if (isNaN(t) || isNaN(n)) return e;
    var o,
      i = e._root,
      s = { data: r },
      a = e._x0,
      l = e._y0,
      u = e._x1,
      f = e._y1,
      c,
      d,
      h,
      p,
      m,
      g,
      v,
      b;
    if (!i) return ((e._root = s), e);
    for (; i.length; )
      if (
        ((m = t >= (c = (a + u) / 2)) ? (a = c) : (u = c),
        (g = n >= (d = (l + f) / 2)) ? (l = d) : (f = d),
        (o = i),
        !(i = i[(v = (g << 1) | m)]))
      )
        return ((o[v] = s), e);
    if (((h = +e._x.call(null, i.data)), (p = +e._y.call(null, i.data)), t === h && n === p))
      return ((s.next = i), o ? (o[v] = s) : (e._root = s), e);
    do
      ((o = o ? (o[v] = new Array(4)) : (e._root = new Array(4))),
        (m = t >= (c = (a + u) / 2)) ? (a = c) : (u = c),
        (g = n >= (d = (l + f) / 2)) ? (l = d) : (f = d));
    while ((v = (g << 1) | m) === (b = ((p >= d) << 1) | (h >= c)));
    return ((o[b] = i), (o[v] = s), e);
  }
  function aS(e) {
    var t,
      n,
      r = e.length,
      o,
      i,
      s = new Array(r),
      a = new Array(r),
      l = 1 / 0,
      u = 1 / 0,
      f = -1 / 0,
      c = -1 / 0;
    for (n = 0; n < r; ++n)
      isNaN((o = +this._x.call(null, (t = e[n])))) ||
        isNaN((i = +this._y.call(null, t))) ||
        ((s[n] = o),
        (a[n] = i),
        o < l && (l = o),
        o > f && (f = o),
        i < u && (u = i),
        i > c && (c = i));
    if (l > f || u > c) return this;
    for (this.cover(l, u).cover(f, c), n = 0; n < r; ++n) Ih(this, s[n], a[n], e[n]);
    return this;
  }
  function lS(e, t) {
    if (isNaN((e = +e)) || isNaN((t = +t))) return this;
    var n = this._x0,
      r = this._y0,
      o = this._x1,
      i = this._y1;
    if (isNaN(n)) ((o = (n = Math.floor(e)) + 1), (i = (r = Math.floor(t)) + 1));
    else {
      for (var s = o - n || 1, a = this._root, l, u; n > e || e >= o || r > t || t >= i; )
        switch (
          ((u = ((t < r) << 1) | (e < n)), (l = new Array(4)), (l[u] = a), (a = l), (s *= 2), u)
        ) {
          case 0:
            ((o = n + s), (i = r + s));
            break;
          case 1:
            ((n = o - s), (i = r + s));
            break;
          case 2:
            ((o = n + s), (r = i - s));
            break;
          case 3:
            ((n = o - s), (r = i - s));
            break;
        }
      this._root && this._root.length && (this._root = a);
    }
    return ((this._x0 = n), (this._y0 = r), (this._x1 = o), (this._y1 = i), this);
  }
  function cS() {
    var e = [];
    return (
      this.visit(function (t) {
        if (!t.length)
          do e.push(t.data);
          while ((t = t.next));
      }),
      e
    );
  }
  function uS(e) {
    return arguments.length
      ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1])
      : isNaN(this._x0)
        ? void 0
        : [
            [this._x0, this._y0],
            [this._x1, this._y1],
          ];
  }
  function wt(e, t, n, r, o) {
    ((this.node = e), (this.x0 = t), (this.y0 = n), (this.x1 = r), (this.y1 = o));
  }
  function fS(e, t, n) {
    var r,
      o = this._x0,
      i = this._y0,
      s,
      a,
      l,
      u,
      f = this._x1,
      c = this._y1,
      d = [],
      h = this._root,
      p,
      m;
    for (
      h && d.push(new wt(h, o, i, f, c)),
        n == null ? (n = 1 / 0) : ((o = e - n), (i = t - n), (f = e + n), (c = t + n), (n *= n));
      (p = d.pop());
    )
      if (!(!(h = p.node) || (s = p.x0) > f || (a = p.y0) > c || (l = p.x1) < o || (u = p.y1) < i))
        if (h.length) {
          var g = (s + l) / 2,
            v = (a + u) / 2;
          (d.push(
            new wt(h[3], g, v, l, u),
            new wt(h[2], s, v, g, u),
            new wt(h[1], g, a, l, v),
            new wt(h[0], s, a, g, v),
          ),
            (m = ((t >= v) << 1) | (e >= g)) &&
              ((p = d[d.length - 1]),
              (d[d.length - 1] = d[d.length - 1 - m]),
              (d[d.length - 1 - m] = p)));
        } else {
          var b = e - +this._x.call(null, h.data),
            w = t - +this._y.call(null, h.data),
            y = b * b + w * w;
          if (y < n) {
            var x = Math.sqrt((n = y));
            ((o = e - x), (i = t - x), (f = e + x), (c = t + x), (r = h.data));
          }
        }
    return r;
  }
  function dS(e) {
    if (isNaN((f = +this._x.call(null, e))) || isNaN((c = +this._y.call(null, e)))) return this;
    var t,
      n = this._root,
      r,
      o,
      i,
      s = this._x0,
      a = this._y0,
      l = this._x1,
      u = this._y1,
      f,
      c,
      d,
      h,
      p,
      m,
      g,
      v;
    if (!n) return this;
    if (n.length)
      for (;;) {
        if (
          ((p = f >= (d = (s + l) / 2)) ? (s = d) : (l = d),
          (m = c >= (h = (a + u) / 2)) ? (a = h) : (u = h),
          (t = n),
          !(n = n[(g = (m << 1) | p)]))
        )
          return this;
        if (!n.length) break;
        (t[(g + 1) & 3] || t[(g + 2) & 3] || t[(g + 3) & 3]) && ((r = t), (v = g));
      }
    for (; n.data !== e; ) if (((o = n), !(n = n.next))) return this;
    return (
      (i = n.next) && delete n.next,
      o
        ? (i ? (o.next = i) : delete o.next, this)
        : t
          ? (i ? (t[g] = i) : delete t[g],
            (n = t[0] || t[1] || t[2] || t[3]) &&
              n === (t[3] || t[2] || t[1] || t[0]) &&
              !n.length &&
              (r ? (r[v] = n) : (this._root = n)),
            this)
          : ((this._root = i), this)
    );
  }
  function hS(e) {
    for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
    return this;
  }
  function pS() {
    return this._root;
  }
  function gS() {
    var e = 0;
    return (
      this.visit(function (t) {
        if (!t.length)
          do ++e;
          while ((t = t.next));
      }),
      e
    );
  }
  function vS(e) {
    var t = [],
      n,
      r = this._root,
      o,
      i,
      s,
      a,
      l;
    for (r && t.push(new wt(r, this._x0, this._y0, this._x1, this._y1)); (n = t.pop()); )
      if (!e((r = n.node), (i = n.x0), (s = n.y0), (a = n.x1), (l = n.y1)) && r.length) {
        var u = (i + a) / 2,
          f = (s + l) / 2;
        ((o = r[3]) && t.push(new wt(o, u, f, a, l)),
          (o = r[2]) && t.push(new wt(o, i, f, u, l)),
          (o = r[1]) && t.push(new wt(o, u, s, a, f)),
          (o = r[0]) && t.push(new wt(o, i, s, u, f)));
      }
    return this;
  }
  function mS(e) {
    var t = [],
      n = [],
      r;
    for (
      this._root && t.push(new wt(this._root, this._x0, this._y0, this._x1, this._y1));
      (r = t.pop());
    ) {
      var o = r.node;
      if (o.length) {
        var i,
          s = r.x0,
          a = r.y0,
          l = r.x1,
          u = r.y1,
          f = (s + l) / 2,
          c = (a + u) / 2;
        ((i = o[0]) && t.push(new wt(i, s, a, f, c)),
          (i = o[1]) && t.push(new wt(i, f, a, l, c)),
          (i = o[2]) && t.push(new wt(i, s, c, f, u)),
          (i = o[3]) && t.push(new wt(i, f, c, l, u)));
      }
      n.push(r);
    }
    for (; (r = n.pop()); ) e(r.node, r.x0, r.y0, r.x1, r.y1);
    return this;
  }
  function yS(e) {
    return e[0];
  }
  function bS(e) {
    return arguments.length ? ((this._x = e), this) : this._x;
  }
  function wS(e) {
    return e[1];
  }
  function xS(e) {
    return arguments.length ? ((this._y = e), this) : this._y;
  }
  function ll(e, t, n) {
    var r = new cl(t ?? yS, n ?? wS, NaN, NaN, NaN, NaN);
    return e == null ? r : r.addAll(e);
  }
  function cl(e, t, n, r, o, i) {
    ((this._x = e),
      (this._y = t),
      (this._x0 = n),
      (this._y0 = r),
      (this._x1 = o),
      (this._y1 = i),
      (this._root = void 0));
  }
  function hu(e) {
    for (var t = { data: e.data }, n = t; (e = e.next); ) n = n.next = { data: e.data };
    return t;
  }
  var xt = (ll.prototype = cl.prototype);
  xt.copy = function () {
    var e = new cl(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      t = this._root,
      n,
      r;
    if (!t) return e;
    if (!t.length) return ((e._root = hu(t)), e);
    for (n = [{ source: t, target: (e._root = new Array(4)) }]; (t = n.pop()); )
      for (var o = 0; o < 4; ++o)
        (r = t.source[o]) &&
          (r.length
            ? n.push({ source: r, target: (t.target[o] = new Array(4)) })
            : (t.target[o] = hu(r)));
    return e;
  };
  xt.add = sS;
  xt.addAll = aS;
  xt.cover = lS;
  xt.data = cS;
  xt.extent = uS;
  xt.find = fS;
  xt.remove = dS;
  xt.removeAll = hS;
  xt.root = pS;
  xt.size = gS;
  xt.visit = vS;
  xt.visitAfter = mS;
  xt.x = bS;
  xt.y = xS;
  function et(e) {
    return function () {
      return e;
    };
  }
  function kn(e) {
    return (e() - 0.5) * 1e-6;
  }
  function ES(e) {
    return e.x + e.vx;
  }
  function _S(e) {
    return e.y + e.vy;
  }
  function Mh(e) {
    var t,
      n,
      r,
      o = 1,
      i = 1;
    typeof e != 'function' && (e = et(e == null ? 1 : +e));
    function s() {
      for (var u, f = t.length, c, d, h, p, m, g, v = 0; v < i; ++v)
        for (c = ll(t, ES, _S).visitAfter(a), u = 0; u < f; ++u)
          ((d = t[u]),
            (m = n[d.index]),
            (g = m * m),
            (h = d.x + d.vx),
            (p = d.y + d.vy),
            c.visit(b));
      function b(w, y, x, E, C) {
        var P = w.data,
          M = w.r,
          A = m + M;
        if (P) {
          if (P.index > d.index) {
            var j = h - P.x - P.vx,
              R = p - P.y - P.vy,
              V = j * j + R * R;
            V < A * A &&
              (j === 0 && ((j = kn(r)), (V += j * j)),
              R === 0 && ((R = kn(r)), (V += R * R)),
              (V = ((A - (V = Math.sqrt(V))) / V) * o),
              (d.vx += (j *= V) * (A = (M *= M) / (g + M))),
              (d.vy += (R *= V) * A),
              (P.vx -= j * (A = 1 - A)),
              (P.vy -= R * A));
          }
          return;
        }
        return y > h + A || E < h - A || x > p + A || C < p - A;
      }
    }
    function a(u) {
      if (u.data) return (u.r = n[u.data.index]);
      for (var f = (u.r = 0); f < 4; ++f) u[f] && u[f].r > u.r && (u.r = u[f].r);
    }
    function l() {
      if (t) {
        var u,
          f = t.length,
          c;
        for (n = new Array(f), u = 0; u < f; ++u) ((c = t[u]), (n[c.index] = +e(c, u, t)));
      }
    }
    return (
      (s.initialize = function (u, f) {
        ((t = u), (r = f), l());
      }),
      (s.iterations = function (u) {
        return arguments.length ? ((i = +u), s) : i;
      }),
      (s.strength = function (u) {
        return arguments.length ? ((o = +u), s) : o;
      }),
      (s.radius = function (u) {
        return arguments.length ? ((e = typeof u == 'function' ? u : et(+u)), l(), s) : e;
      }),
      s
    );
  }
  function SS(e) {
    return e.index;
  }
  function pu(e, t) {
    var n = e.get(t);
    if (!n) throw new Error('node not found: ' + t);
    return n;
  }
  function kh(e) {
    var t = SS,
      n = c,
      r,
      o = et(30),
      i,
      s,
      a,
      l,
      u,
      f = 1;
    e == null && (e = []);
    function c(g) {
      return 1 / Math.min(a[g.source.index], a[g.target.index]);
    }
    function d(g) {
      for (var v = 0, b = e.length; v < f; ++v)
        for (var w = 0, y, x, E, C, P, M, A; w < b; ++w)
          ((y = e[w]),
            (x = y.source),
            (E = y.target),
            (C = E.x + E.vx - x.x - x.vx || kn(u)),
            (P = E.y + E.vy - x.y - x.vy || kn(u)),
            (M = Math.sqrt(C * C + P * P)),
            (M = ((M - i[w]) / M) * g * r[w]),
            (C *= M),
            (P *= M),
            (E.vx -= C * (A = l[w])),
            (E.vy -= P * A),
            (x.vx += C * (A = 1 - A)),
            (x.vy += P * A));
    }
    function h() {
      if (s) {
        var g,
          v = s.length,
          b = e.length,
          w = new Map(s.map((x, E) => [t(x, E, s), x])),
          y;
        for (g = 0, a = new Array(v); g < b; ++g)
          ((y = e[g]),
            (y.index = g),
            typeof y.source != 'object' && (y.source = pu(w, y.source)),
            typeof y.target != 'object' && (y.target = pu(w, y.target)),
            (a[y.source.index] = (a[y.source.index] || 0) + 1),
            (a[y.target.index] = (a[y.target.index] || 0) + 1));
        for (g = 0, l = new Array(b); g < b; ++g)
          ((y = e[g]), (l[g] = a[y.source.index] / (a[y.source.index] + a[y.target.index])));
        ((r = new Array(b)), p(), (i = new Array(b)), m());
      }
    }
    function p() {
      if (s) for (var g = 0, v = e.length; g < v; ++g) r[g] = +n(e[g], g, e);
    }
    function m() {
      if (s) for (var g = 0, v = e.length; g < v; ++g) i[g] = +o(e[g], g, e);
    }
    return (
      (d.initialize = function (g, v) {
        ((s = g), (u = v), h());
      }),
      (d.links = function (g) {
        return arguments.length ? ((e = g), h(), d) : e;
      }),
      (d.id = function (g) {
        return arguments.length ? ((t = g), d) : t;
      }),
      (d.iterations = function (g) {
        return arguments.length ? ((f = +g), d) : f;
      }),
      (d.strength = function (g) {
        return arguments.length ? ((n = typeof g == 'function' ? g : et(+g)), p(), d) : n;
      }),
      (d.distance = function (g) {
        return arguments.length ? ((o = typeof g == 'function' ? g : et(+g)), m(), d) : o;
      }),
      d
    );
  }
  var CS = { value: () => {} };
  function Rh() {
    for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
      if (!(r = arguments[e] + '') || r in n || /[\s.]/.test(r))
        throw new Error('illegal type: ' + r);
      n[r] = [];
    }
    return new Zo(n);
  }
  function Zo(e) {
    this._ = e;
  }
  function TS(e, t) {
    return e
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var r = '',
          o = n.indexOf('.');
        if ((o >= 0 && ((r = n.slice(o + 1)), (n = n.slice(0, o))), n && !t.hasOwnProperty(n)))
          throw new Error('unknown type: ' + n);
        return { type: n, name: r };
      });
  }
  Zo.prototype = Rh.prototype = {
    constructor: Zo,
    on: function (e, t) {
      var n = this._,
        r = TS(e + '', n),
        o,
        i = -1,
        s = r.length;
      if (arguments.length < 2) {
        for (; ++i < s; ) if ((o = (e = r[i]).type) && (o = OS(n[o], e.name))) return o;
        return;
      }
      if (t != null && typeof t != 'function') throw new Error('invalid callback: ' + t);
      for (; ++i < s; )
        if ((o = (e = r[i]).type)) n[o] = gu(n[o], e.name, t);
        else if (t == null) for (o in n) n[o] = gu(n[o], e.name, null);
      return this;
    },
    copy: function () {
      var e = {},
        t = this._;
      for (var n in t) e[n] = t[n].slice();
      return new Zo(e);
    },
    call: function (e, t) {
      if ((o = arguments.length - 2) > 0)
        for (var n = new Array(o), r = 0, o, i; r < o; ++r) n[r] = arguments[r + 2];
      if (!this._.hasOwnProperty(e)) throw new Error('unknown type: ' + e);
      for (i = this._[e], r = 0, o = i.length; r < o; ++r) i[r].value.apply(t, n);
    },
    apply: function (e, t, n) {
      if (!this._.hasOwnProperty(e)) throw new Error('unknown type: ' + e);
      for (var r = this._[e], o = 0, i = r.length; o < i; ++o) r[o].value.apply(t, n);
    },
  };
  function OS(e, t) {
    for (var n = 0, r = e.length, o; n < r; ++n) if ((o = e[n]).name === t) return o.value;
  }
  function gu(e, t, n) {
    for (var r = 0, o = e.length; r < o; ++r)
      if (e[r].name === t) {
        ((e[r] = CS), (e = e.slice(0, r).concat(e.slice(r + 1))));
        break;
      }
    return (n != null && e.push({ name: t, value: n }), e);
  }
  var Tr = 0,
    Hr = 0,
    Br = 0,
    Nh = 1e3,
    hi,
    Vr,
    pi = 0,
    er = 0,
    Ki = 0,
    po = typeof performance == 'object' && performance.now ? performance : Date,
    Lh =
      typeof window == 'object' && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : function (e) {
            setTimeout(e, 17);
          };
  function Dh() {
    return er || (Lh(PS), (er = po.now() + Ki));
  }
  function PS() {
    er = 0;
  }
  function oa() {
    this._call = this._time = this._next = null;
  }
  oa.prototype = $h.prototype = {
    constructor: oa,
    restart: function (e, t, n) {
      if (typeof e != 'function') throw new TypeError('callback is not a function');
      ((n = (n == null ? Dh() : +n) + (t == null ? 0 : +t)),
        !this._next && Vr !== this && (Vr ? (Vr._next = this) : (hi = this), (Vr = this)),
        (this._call = e),
        (this._time = n),
        ia());
    },
    stop: function () {
      this._call && ((this._call = null), (this._time = 1 / 0), ia());
    },
  };
  function $h(e, t, n) {
    var r = new oa();
    return (r.restart(e, t, n), r);
  }
  function AS() {
    (Dh(), ++Tr);
    for (var e = hi, t; e; ) ((t = er - e._time) >= 0 && e._call.call(void 0, t), (e = e._next));
    --Tr;
  }
  function vu() {
    ((er = (pi = po.now()) + Ki), (Tr = Hr = 0));
    try {
      AS();
    } finally {
      ((Tr = 0), MS(), (er = 0));
    }
  }
  function IS() {
    var e = po.now(),
      t = e - pi;
    t > Nh && ((Ki -= t), (pi = e));
  }
  function MS() {
    for (var e, t = hi, n, r = 1 / 0; t; )
      t._call
        ? (r > t._time && (r = t._time), (e = t), (t = t._next))
        : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (hi = n)));
    ((Vr = e), ia(r));
  }
  function ia(e) {
    if (!Tr) {
      Hr && (Hr = clearTimeout(Hr));
      var t = e - er;
      t > 24
        ? (e < 1 / 0 && (Hr = setTimeout(vu, e - po.now() - Ki)), Br && (Br = clearInterval(Br)))
        : (Br || ((pi = po.now()), (Br = setInterval(IS, Nh))), (Tr = 1), Lh(vu));
    }
  }
  const kS = 1664525,
    RS = 1013904223,
    mu = 4294967296;
  function NS() {
    let e = 1;
    return () => (e = (kS * e + RS) % mu) / mu;
  }
  function LS(e) {
    return e.x;
  }
  function DS(e) {
    return e.y;
  }
  var $S = 10,
    jS = Math.PI * (3 - Math.sqrt(5));
  function jh(e) {
    var t,
      n = 1,
      r = 0.001,
      o = 1 - Math.pow(r, 1 / 300),
      i = 0,
      s = 0.6,
      a = new Map(),
      l = $h(c),
      u = Rh('tick', 'end'),
      f = NS();
    e == null && (e = []);
    function c() {
      (d(), u.call('tick', t), n < r && (l.stop(), u.call('end', t)));
    }
    function d(m) {
      var g,
        v = e.length,
        b;
      m === void 0 && (m = 1);
      for (var w = 0; w < m; ++w)
        for (
          n += (i - n) * o,
            a.forEach(function (y) {
              y(n);
            }),
            g = 0;
          g < v;
          ++g
        )
          ((b = e[g]),
            b.fx == null ? (b.x += b.vx *= s) : ((b.x = b.fx), (b.vx = 0)),
            b.fy == null ? (b.y += b.vy *= s) : ((b.y = b.fy), (b.vy = 0)));
      return t;
    }
    function h() {
      for (var m = 0, g = e.length, v; m < g; ++m) {
        if (
          ((v = e[m]),
          (v.index = m),
          v.fx != null && (v.x = v.fx),
          v.fy != null && (v.y = v.fy),
          isNaN(v.x) || isNaN(v.y))
        ) {
          var b = $S * Math.sqrt(0.5 + m),
            w = m * jS;
          ((v.x = b * Math.cos(w)), (v.y = b * Math.sin(w)));
        }
        (isNaN(v.vx) || isNaN(v.vy)) && (v.vx = v.vy = 0);
      }
    }
    function p(m) {
      return (m.initialize && m.initialize(e, f), m);
    }
    return (
      h(),
      (t = {
        tick: d,
        restart: function () {
          return (l.restart(c), t);
        },
        stop: function () {
          return (l.stop(), t);
        },
        nodes: function (m) {
          return arguments.length ? ((e = m), h(), a.forEach(p), t) : e;
        },
        alpha: function (m) {
          return arguments.length ? ((n = +m), t) : n;
        },
        alphaMin: function (m) {
          return arguments.length ? ((r = +m), t) : r;
        },
        alphaDecay: function (m) {
          return arguments.length ? ((o = +m), t) : +o;
        },
        alphaTarget: function (m) {
          return arguments.length ? ((i = +m), t) : i;
        },
        velocityDecay: function (m) {
          return arguments.length ? ((s = 1 - m), t) : 1 - s;
        },
        randomSource: function (m) {
          return arguments.length ? ((f = m), a.forEach(p), t) : f;
        },
        force: function (m, g) {
          return arguments.length > 1 ? (g == null ? a.delete(m) : a.set(m, p(g)), t) : a.get(m);
        },
        find: function (m, g, v) {
          var b = 0,
            w = e.length,
            y,
            x,
            E,
            C,
            P;
          for (v == null ? (v = 1 / 0) : (v *= v), b = 0; b < w; ++b)
            ((C = e[b]),
              (y = m - C.x),
              (x = g - C.y),
              (E = y * y + x * x),
              E < v && ((P = C), (v = E)));
          return P;
        },
        on: function (m, g) {
          return arguments.length > 1 ? (u.on(m, g), t) : u.on(m);
        },
      })
    );
  }
  function zh() {
    var e,
      t,
      n,
      r,
      o = et(-30),
      i,
      s = 1,
      a = 1 / 0,
      l = 0.81;
    function u(h) {
      var p,
        m = e.length,
        g = ll(e, LS, DS).visitAfter(c);
      for (r = h, p = 0; p < m; ++p) ((t = e[p]), g.visit(d));
    }
    function f() {
      if (e) {
        var h,
          p = e.length,
          m;
        for (i = new Array(p), h = 0; h < p; ++h) ((m = e[h]), (i[m.index] = +o(m, h, e)));
      }
    }
    function c(h) {
      var p = 0,
        m,
        g,
        v = 0,
        b,
        w,
        y;
      if (h.length) {
        for (b = w = y = 0; y < 4; ++y)
          (m = h[y]) &&
            (g = Math.abs(m.value)) &&
            ((p += m.value), (v += g), (b += g * m.x), (w += g * m.y));
        ((h.x = b / v), (h.y = w / v));
      } else {
        ((m = h), (m.x = m.data.x), (m.y = m.data.y));
        do p += i[m.data.index];
        while ((m = m.next));
      }
      h.value = p;
    }
    function d(h, p, m, g) {
      if (!h.value) return !0;
      var v = h.x - t.x,
        b = h.y - t.y,
        w = g - p,
        y = v * v + b * b;
      if ((w * w) / l < y)
        return (
          y < a &&
            (v === 0 && ((v = kn(n)), (y += v * v)),
            b === 0 && ((b = kn(n)), (y += b * b)),
            y < s && (y = Math.sqrt(s * y)),
            (t.vx += (v * h.value * r) / y),
            (t.vy += (b * h.value * r) / y)),
          !0
        );
      if (h.length || y >= a) return;
      (h.data !== t || h.next) &&
        (v === 0 && ((v = kn(n)), (y += v * v)),
        b === 0 && ((b = kn(n)), (y += b * b)),
        y < s && (y = Math.sqrt(s * y)));
      do h.data !== t && ((w = (i[h.data.index] * r) / y), (t.vx += v * w), (t.vy += b * w));
      while ((h = h.next));
    }
    return (
      (u.initialize = function (h, p) {
        ((e = h), (n = p), f());
      }),
      (u.strength = function (h) {
        return arguments.length ? ((o = typeof h == 'function' ? h : et(+h)), f(), u) : o;
      }),
      (u.distanceMin = function (h) {
        return arguments.length ? ((s = h * h), u) : Math.sqrt(s);
      }),
      (u.distanceMax = function (h) {
        return arguments.length ? ((a = h * h), u) : Math.sqrt(a);
      }),
      (u.theta = function (h) {
        return arguments.length ? ((l = h * h), u) : Math.sqrt(l);
      }),
      u
    );
  }
  function zS(e, t, n) {
    var r,
      o = et(0.1),
      i,
      s;
    (typeof e != 'function' && (e = et(+e)), t == null && (t = 0), n == null && (n = 0));
    function a(u) {
      for (var f = 0, c = r.length; f < c; ++f) {
        var d = r[f],
          h = d.x - t || 1e-6,
          p = d.y - n || 1e-6,
          m = Math.sqrt(h * h + p * p),
          g = ((s[f] - m) * i[f] * u) / m;
        ((d.vx += h * g), (d.vy += p * g));
      }
    }
    function l() {
      if (r) {
        var u,
          f = r.length;
        for (i = new Array(f), s = new Array(f), u = 0; u < f; ++u)
          ((s[u] = +e(r[u], u, r)), (i[u] = isNaN(s[u]) ? 0 : +o(r[u], u, r)));
      }
    }
    return (
      (a.initialize = function (u) {
        ((r = u), l());
      }),
      (a.strength = function (u) {
        return arguments.length ? ((o = typeof u == 'function' ? u : et(+u)), l(), a) : o;
      }),
      (a.radius = function (u) {
        return arguments.length ? ((e = typeof u == 'function' ? u : et(+u)), l(), a) : e;
      }),
      (a.x = function (u) {
        return arguments.length ? ((t = +u), a) : t;
      }),
      (a.y = function (u) {
        return arguments.length ? ((n = +u), a) : n;
      }),
      a
    );
  }
  function BS(e) {
    var t = et(0.1),
      n,
      r,
      o;
    typeof e != 'function' && (e = et(e == null ? 0 : +e));
    function i(a) {
      for (var l = 0, u = n.length, f; l < u; ++l) ((f = n[l]), (f.vx += (o[l] - f.x) * r[l] * a));
    }
    function s() {
      if (n) {
        var a,
          l = n.length;
        for (r = new Array(l), o = new Array(l), a = 0; a < l; ++a)
          r[a] = isNaN((o[a] = +e(n[a], a, n))) ? 0 : +t(n[a], a, n);
      }
    }
    return (
      (i.initialize = function (a) {
        ((n = a), s());
      }),
      (i.strength = function (a) {
        return arguments.length ? ((t = typeof a == 'function' ? a : et(+a)), s(), i) : t;
      }),
      (i.x = function (a) {
        return arguments.length ? ((e = typeof a == 'function' ? a : et(+a)), s(), i) : e;
      }),
      i
    );
  }
  function FS(e) {
    var t = et(0.1),
      n,
      r,
      o;
    typeof e != 'function' && (e = et(e == null ? 0 : +e));
    function i(a) {
      for (var l = 0, u = n.length, f; l < u; ++l) ((f = n[l]), (f.vy += (o[l] - f.y) * r[l] * a));
    }
    function s() {
      if (n) {
        var a,
          l = n.length;
        for (r = new Array(l), o = new Array(l), a = 0; a < l; ++a)
          r[a] = isNaN((o[a] = +e(n[a], a, n))) ? 0 : +t(n[a], a, n);
      }
    }
    return (
      (i.initialize = function (a) {
        ((n = a), s());
      }),
      (i.strength = function (a) {
        return arguments.length ? ((t = typeof a == 'function' ? a : et(+a)), s(), i) : t;
      }),
      (i.y = function (a) {
        return arguments.length ? ((e = typeof a == 'function' ? a : et(+a)), s(), i) : e;
      }),
      i
    );
  }
  const US = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        forceCenter: Ah,
        forceCollide: Mh,
        forceLink: kh,
        forceManyBody: zh,
        forceRadial: zS,
        forceSimulation: jh,
        forceX: BS,
        forceY: FS,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
  var HS = Object.defineProperty,
    VS = Object.defineProperties,
    ZS = Object.getOwnPropertyDescriptors,
    yu = Object.getOwnPropertySymbols,
    WS = Object.prototype.hasOwnProperty,
    KS = Object.prototype.propertyIsEnumerable,
    bu = (e, t, n) =>
      t in e ? HS(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n),
    wu = (e, t) => {
      for (var n in t || (t = {})) WS.call(t, n) && bu(e, n, t[n]);
      if (yu) for (var n of yu(t)) KS.call(t, n) && bu(e, n, t[n]);
      return e;
    },
    qS = (e, t) => VS(e, ZS(t));
  class GS {
    constructor(t = {}) {
      this.options = t;
    }
    activate(t) {
      const { nodePositions: n, nodes: r, edges: o, emitter: i } = t;
      let { nodeLayouts: s, nodeLayoutMap: a } = this.buildNodeLayouts(r.value, n);
      const l = this.createSimulation(s, this.forceLayoutEdges(o.value, r.value));
      ((this.onTick = () => {
        var p, m, g, v, b;
        for (const w of s) {
          const y = (p = n.value) == null ? void 0 : p[w.id];
          if (y) {
            const x = (m = w.x) != null ? m : 0,
              E = (g = w.y) != null ? g : 0;
            (y.x !== x || y.y !== E) && Object.assign(y, { x, y: E });
          } else n.value[w.id] = { x: (v = w.x) != null ? v : 0, y: (b = w.y) != null ? b : 0 };
        }
      }),
        l.on('tick', this.onTick),
        this.onTick());
      const u = () => {
          this.options.noAutoRestartSimulation || l.alpha(0.1).restart();
        },
        f = (p) => {
          var m;
          if (this.options.noAutoRestartSimulation)
            for (const [g, v] of Object.entries(p)) {
              const b = (m = n.value) == null ? void 0 : m[g];
              ((b.x = v.x), (b.y = v.y));
            }
          else {
            for (const [g, v] of Object.entries(p)) {
              const b = a[g];
              ((b.fx = v.x), (b.fy = v.y));
            }
            u();
          }
        },
        c = (p) => {
          var m;
          for (const [g, v] of Object.entries(p)) {
            const b = this.getNodeLayout(n, g),
              w = (m = a?.[g]) != null ? m : { x: 0, y: 0 };
            b.value.fixed || this.options.positionFixedByDrag
              ? ((w.fx = v.x), (w.fy = v.y), (b.value.fixed = !0))
              : ((w.x = v.x), (w.y = v.y), delete w.fx, delete w.fy);
          }
          u();
        },
        d = ({ node: p, event: m }) => {
          if (this.options.positionFixedByClickWithAltKey && m.altKey) {
            const g = this.getNodeLayout(n, p);
            let v = a?.[p];
            (v || ((v = { id: p, x: 0, y: 0 }), (a[p] = v)),
              g.value.fixed
                ? (delete g.value.fixed,
                  (v.x = v.fx || v.x),
                  (v.y = v.fy || v.y),
                  delete v.fx,
                  delete v.fy)
                : ((g.value.fixed = !0), (v.fx = v.x), (v.fy = v.y)),
              u());
          }
        },
        h = be(
          () => [
            Object.keys(r.value),
            Object.keys(n.value),
            Object.values(o.value).map((p) => `${p.source}=${p.target}`),
            Object.values(n.value).map((p) => p.fixed),
          ],
          () => {
            (({ nodeLayouts: s, nodeLayoutMap: a } = this.buildNodeLayouts(r.value, n)),
              l.nodes(s));
            const p = l.force('edge');
            (p && p.links(this.forceLayoutEdges(o.value, r.value)), u());
          },
        );
      (i.on('node:dragstart', f),
        i.on('node:pointermove', f),
        i.on('node:dragend', c),
        i.on('node:click', d),
        (this.onDeactivate = () => {
          (l.stop(),
            h(),
            i.off('node:dragstart', f),
            i.off('node:pointermove', f),
            i.off('node:dragend', c),
            i.off('node:click', d));
        }));
    }
    deactivate() {
      (this.onDeactivate && this.onDeactivate(), (this.onTick = void 0));
    }
    ticked() {
      var t;
      (t = this.onTick) == null || t.call(this);
    }
    createSimulation(t, n) {
      if (this.options.createSimulation) return this.options.createSimulation(US, t, n);
      {
        const r = kh(n).id((o) => o.id);
        return jh(t)
          .force('edge', r.distance(100))
          .force('charge', zh())
          .force('collide', Mh(50).strength(0.2))
          .force('center', Ah().strength(0.05))
          .alphaMin(0.001);
      }
    }
    buildNodeLayouts(t, n) {
      const r = Object.keys(t).filter((s) => !(s in n.value)),
        o = this.forceNodeLayouts(n.value, r),
        i = Object.fromEntries(o.map((s) => [s.id, s]));
      return { nodeLayouts: o, nodeLayoutMap: i };
    }
    forceNodeLayouts(t, n) {
      const r = Object.entries(t).map(([o, i]) =>
        i.fixed ? qS(wu({ id: o }, i), { fx: i.x, fy: i.y }) : wu({ id: o }, i),
      );
      return (n.map((o) => ({ id: o })).forEach((o) => r.push(o)), r);
    }
    forceLayoutEdges(t, n) {
      return Object.values(t)
        .filter((r) => r.source in n && r.target in n)
        .map((r) => ({ source: r.source, target: r.target }));
    }
    getNodeLayout(t, n) {
      const r = en(t.value, n);
      return (r.value || (r.value = { x: 0, y: 0 }), r);
    }
  }
  const XS = { class: 'app' },
    cr = '_',
    xu = '#a855f7',
    JS = '#4466cc',
    YS = '#aaaaaa',
    QS = '#16a34a',
    eC = '#14532d',
    tC = '#22c55e',
    nC = 4,
    rC = pe({
      __name: 'App',
      setup(e) {
        let t;
        const n = J(null),
          r = J(null),
          o = J(null),
          i = Ot($0()),
          s = J(null),
          a = J(null),
          l = J(void 0),
          u = J(!1),
          f = B({
            get() {
              const H = [];
              return (s.value && H.push(s.value), a.value && H.push(a.value), H);
            },
            set(H) {
              const O = H?.[0],
                Z = H?.[1];
              (O && (s.value = O), Z && (a.value = Z));
            },
          }),
          c = B({
            get() {
              return l.value ? [l.value] : [];
            },
            set(H) {
              const O = H?.[0];
              O && (l.value = O);
            },
          }),
          d = J([]),
          h = B(() => new Set(d.value)),
          p = B(() => {
            const H = new Set();
            for (let O = 0; O < d.value.length - 1; O++) H.add(d.value[O] + cr + d.value[O + 1]);
            return H;
          }),
          m = J([]),
          g = B(() =>
            Object.fromEntries(
              m.value.map((H) => [
                H.id,
                {
                  name: H.name,
                  highlighted: h.value.has(H.id),
                  isFirstSelected: s.value === H.id,
                  isSecondSelected: a.value === H.id,
                },
              ]),
            ),
          ),
          v = J([]),
          b = B(() =>
            Object.fromEntries(
              v.value.map((H) => {
                const O = H.source + cr + H.target,
                  Z = s.value,
                  U = a.value,
                  ee =
                    !!Z &&
                    !!U &&
                    ((H.source === Z && H.target === U) || (H.source === U && H.target === Z));
                return [
                  O,
                  {
                    source: H.source,
                    target: H.target,
                    highlighted: p.value.has(O),
                    connectsSelected: ee,
                  },
                ];
              }),
            ),
          ),
          w = rt(id, '');
        _f(() => {
          ((t = new d1(w)), x());
        });
        function y(H) {
          ((m.value = H.map((O) => new sd(O))),
            m.value.forEach((O) => {
              O.characterData.knowCharacterIds.forEach((Z) => {
                v.value.push(new Jl(O.id, Z));
              });
            }));
        }
        mn(async () => {
          const O = new AbortController().signal,
            Z = new h1(1, 10, 'name', 'Asc'),
            U = await t.getCharactersAsync(Z, O);
          y(U);
        });
        function x() {
          ((i.node.selectable = 2),
            (i.node.focusring.visible = !1),
            (i.node.normal.color = (H) => (H.highlighted ? xu : JS)),
            (i.node.normal.strokeWidth = (H) => (H.isFirstSelected || H.isSecondSelected ? nC : 0)),
            (i.node.normal.strokeColor = (H) => {
              if (H.isSecondSelected) return eC;
              if (H.isFirstSelected) return QS;
            }),
            (i.edge.selectable = 1),
            (i.edge.normal.color = (H) => (H.connectsSelected ? tC : H.highlighted ? xu : YS)),
            (i.edge.normal.width = (H) => (H.connectsSelected || H.highlighted ? 3 : 1)),
            (i.edge.type = 'straight'),
            (i.edge.marker.source.type = 'none'),
            (i.edge.marker.target.type = 'arrow'),
            (i.view.grid.visible = !0),
            (i.view.grid.interval = 10),
            (i.view.grid.thickIncrements = 5),
            (i.view.grid.line.color = '#e0e0e0'),
            (i.view.grid.line.width = 1),
            (i.view.grid.line.dasharray = 1),
            (i.view.grid.thick.color = '#cccccc'),
            (i.view.grid.thick.width = 1),
            (i.view.grid.thick.dasharray = 0),
            (i.view.layoutHandler = new GS({
              positionFixedByDrag: !0,
              positionFixedByClickWithAltKey: !0,
              createSimulation: (H, O, Z) => {
                const U = H.forceLink(Z).id((T) => T.id),
                  ee = (T, D) => U.distance(T).strength(D),
                  xe = (T) => H.forceManyBody().strength(T),
                  _ = (T) => H.forceCenter().strength(T),
                  S = (T) => H.forceCollide(T);
                return H.forceSimulation(O)
                  .force('edge', ee(120, 0.5))
                  .force('charge', xe(-200))
                  .force('center', _(0.05))
                  .force('collide', S(60))
                  .alphaMin(0.001);
              },
            })),
            (i.edge.keepOrder = 'clock'));
        }
        const E = J(!1);
        function C() {
          E.value = !0;
        }
        const P = J(!1);
        function M() {
          s.value && (P.value = !0);
        }
        const A = J(!1);
        function j() {
          s.value && (A.value = !0);
        }
        function R(H) {
          d.value = H;
        }
        function V() {
          d.value = [];
        }
        function re(H) {
          (m.value.push(H), (s.value = H.id));
        }
        function ne(H) {
          const O = m.value.findIndex((Z) => Z.id === H);
          O !== -1 && m.value.splice(O, 1);
        }
        function X(H) {
          const O = m.value.findIndex((Z) => Z.id === H.id);
          O !== -1 && ((m.value[O].characterData.id = H.id), m.value[O].updateName(H.name));
        }
        function le(H) {
          const [O, Z] = H.split(cr),
            U = v.value.findIndex((ee) => ee.source === O && ee.target === Z);
          U !== -1 && v.value.splice(U, 1);
        }
        function te(H) {
          const [O, Z] = H.split(cr),
            U = m.value.findIndex((ee) => ee.id === O);
          U !== -1 &&
            (m.value[U].characterData.knowCharacterIds.push(Z), v.value.push(new Jl(O, Z)));
        }
        function Oe(H) {
          ((u.value = !0), (s.value = H.node));
        }
        function qe(H) {
          ((u.value = !0), (l.value = H.edge));
        }
        function we() {
          if (u.value) {
            u.value = !1;
            return;
          }
          ((l.value = void 0), (s.value = null), (a.value = null));
        }
        function Ie(H) {
          u.value = !0;
          const O = H.node;
          (s.value ? s.value === O || (a.value && a.value === O) || (a.value = O) : (s.value = O),
            r.value?.showNodeContextMenu(H));
        }
        function Ye(H) {
          u.value = !0;
          const O = H.edge;
          O && ((l.value = O), o.value?.showEdgeContextMenu(H));
        }
        function at(H) {
          ((u.value = !0), n.value?.showViewContextMenu(H));
        }
        const He = {
          'node:click': Oe,
          'edge:click': qe,
          'view:click': we,
          'node:contextmenu': Ie,
          'edge:contextmenu': Ye,
          'view:contextmenu': at,
        };
        return (H, O) => {
          const Z = ag('v-network-graph');
          return (
            N(),
            K('div', XS, [
              Te(
                Z,
                {
                  class: 'graph-host',
                  nodes: g.value,
                  edges: b.value,
                  configs: i,
                  'event-handlers': He,
                  'selected-nodes': f.value,
                  'onUpdate:selectedNodes': O[0] || (O[0] = (U) => (f.value = U)),
                  'selected-edges': c.value,
                  'onUpdate:selectedEdges': O[1] || (O[1] = (U) => (c.value = U)),
                },
                null,
                8,
                ['nodes', 'edges', 'configs', 'selected-nodes', 'selected-edges'],
              ),
              Te(
                A1,
                {
                  ref_key: 'nodeMenuRef',
                  ref: r,
                  rpgAssistantService: L(t),
                  firstSelectedCharacterId: s.value,
                  secondSelectedCharacterId: a.value,
                  edgeIdSeparator: cr,
                  onOpenUpdateCharacterDialog: M,
                  onOpenFindPathDialog: j,
                  onDeletedCharacterFromMenu: ne,
                  onCreateKnowEdgeFromMenu: te,
                },
                null,
                8,
                ['rpgAssistantService', 'firstSelectedCharacterId', 'secondSelectedCharacterId'],
              ),
              Te(
                $1,
                {
                  ref_key: 'edgeMenuRef',
                  ref: o,
                  rpgAssistantService: L(t),
                  selectedEdgeId: l.value,
                  edgeIdSeparator: cr,
                  onDeleteKnowEdgeFromMenu: le,
                },
                null,
                8,
                ['rpgAssistantService', 'selectedEdgeId'],
              ),
              Te(B1, { ref_key: 'viewMenuRef', ref: n, onOpenCreateCharacterDialog: C }, null, 512),
              Te(
                H1,
                {
                  open: E.value,
                  'onUpdate:open': O[2] || (O[2] = (U) => (E.value = U)),
                  rpgAssistantService: L(t),
                  onCharacterCreated: re,
                },
                null,
                8,
                ['open', 'rpgAssistantService'],
              ),
              Te(
                K1,
                {
                  open: P.value,
                  'onUpdate:open': O[3] || (O[3] = (U) => (P.value = U)),
                  rpgAssistantService: L(t),
                  characterId: s.value,
                  onUpdatedCharacter: X,
                },
                null,
                8,
                ['open', 'rpgAssistantService', 'characterId'],
              ),
              Te(
                iS,
                {
                  open: A.value,
                  'onUpdate:open': O[4] || (O[4] = (U) => (A.value = U)),
                  rpgAssistantService: L(t),
                  fromCharacterId: s.value,
                  onPathFound: R,
                },
                null,
                8,
                ['open', 'rpgAssistantService', 'fromCharacterId'],
              ),
              d.value.length > 0
                ? (N(),
                  K(
                    'button',
                    {
                      key: 0,
                      id: 'clear-highlighted-path-button',
                      class: 'button is-warning clear-path-button',
                      type: 'button',
                      onClick: V,
                    },
                    ' Clear path ',
                  ))
                : Xe('', !0),
            ])
          );
        };
      },
    }),
    oC = Mr(rC, [['__scopeId', 'data-v-ec053b6f']]);
  const pr = typeof document < 'u';
  function Bh(e) {
    return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e;
  }
  function iC(e) {
    return e.__esModule || e[Symbol.toStringTag] === 'Module' || (e.default && Bh(e.default));
  }
  const Me = Object.assign;
  function Ss(e, t) {
    const n = {};
    for (const r in t) {
      const o = t[r];
      n[r] = Wt(o) ? o.map(e) : e(o);
    }
    return n;
  }
  const eo = () => {},
    Wt = Array.isArray;
  function Eu(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
  }
  const Fh = /#/g,
    sC = /&/g,
    aC = /\//g,
    lC = /=/g,
    cC = /\?/g,
    Uh = /\+/g,
    uC = /%5B/g,
    fC = /%5D/g,
    Hh = /%5E/g,
    dC = /%60/g,
    Vh = /%7B/g,
    hC = /%7C/g,
    Zh = /%7D/g,
    pC = /%20/g;
  function ul(e) {
    return e == null
      ? ''
      : encodeURI('' + e)
          .replace(hC, '|')
          .replace(uC, '[')
          .replace(fC, ']');
  }
  function gC(e) {
    return ul(e).replace(Vh, '{').replace(Zh, '}').replace(Hh, '^');
  }
  function sa(e) {
    return ul(e)
      .replace(Uh, '%2B')
      .replace(pC, '+')
      .replace(Fh, '%23')
      .replace(sC, '%26')
      .replace(dC, '`')
      .replace(Vh, '{')
      .replace(Zh, '}')
      .replace(Hh, '^');
  }
  function vC(e) {
    return sa(e).replace(lC, '%3D');
  }
  function mC(e) {
    return ul(e).replace(Fh, '%23').replace(cC, '%3F');
  }
  function yC(e) {
    return mC(e).replace(aC, '%2F');
  }
  function go(e) {
    if (e == null) return null;
    try {
      return decodeURIComponent('' + e);
    } catch {}
    return '' + e;
  }
  const bC = /\/$/,
    wC = (e) => e.replace(bC, '');
  function Cs(e, t, n = '/') {
    let r,
      o = {},
      i = '',
      s = '';
    const a = t.indexOf('#');
    let l = t.indexOf('?');
    return (
      (l = a >= 0 && l > a ? -1 : l),
      l >= 0 && ((r = t.slice(0, l)), (i = t.slice(l, a > 0 ? a : t.length)), (o = e(i.slice(1)))),
      a >= 0 && ((r = r || t.slice(0, a)), (s = t.slice(a, t.length))),
      (r = SC(r ?? t, n)),
      { fullPath: r + i + s, path: r, query: o, hash: go(s) }
    );
  }
  function xC(e, t) {
    const n = t.query ? e(t.query) : '';
    return t.path + (n && '?') + n + (t.hash || '');
  }
  function _u(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/';
  }
  function EC(e, t, n) {
    const r = t.matched.length - 1,
      o = n.matched.length - 1;
    return (
      r > -1 &&
      r === o &&
      Or(t.matched[r], n.matched[o]) &&
      Wh(t.params, n.params) &&
      e(t.query) === e(n.query) &&
      t.hash === n.hash
    );
  }
  function Or(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function Wh(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!_C(e[n], t[n])) return !1;
    return !0;
  }
  function _C(e, t) {
    return Wt(e) ? Su(e, t) : Wt(t) ? Su(t, e) : e === t;
  }
  function Su(e, t) {
    return Wt(t)
      ? e.length === t.length && e.every((n, r) => n === t[r])
      : e.length === 1 && e[0] === t;
  }
  function SC(e, t) {
    if (e.startsWith('/')) return e;
    if (!e) return t;
    const n = t.split('/'),
      r = e.split('/'),
      o = r[r.length - 1];
    (o === '..' || o === '.') && r.push('');
    let i = n.length - 1,
      s,
      a;
    for (s = 0; s < r.length; s++)
      if (((a = r[s]), a !== '.'))
        if (a === '..') i > 1 && i--;
        else break;
    return n.slice(0, i).join('/') + '/' + r.slice(s).join('/');
  }
  const _n = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  };
  let aa = (function (e) {
      return ((e.pop = 'pop'), (e.push = 'push'), e);
    })({}),
    Ts = (function (e) {
      return ((e.back = 'back'), (e.forward = 'forward'), (e.unknown = ''), e);
    })({});
  function CC(e) {
    if (!e)
      if (pr) {
        const t = document.querySelector('base');
        ((e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, '')));
      } else e = '/';
    return (e[0] !== '/' && e[0] !== '#' && (e = '/' + e), wC(e));
  }
  const TC = /^[^#]+#/;
  function OC(e, t) {
    return e.replace(TC, '#') + t;
  }
  function PC(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
      r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - n.left - (t.left || 0),
      top: r.top - n.top - (t.top || 0),
    };
  }
  const qi = () => ({ left: window.scrollX, top: window.scrollY });
  function AC(e) {
    let t;
    if ('el' in e) {
      const n = e.el,
        r = typeof n == 'string' && n.startsWith('#'),
        o =
          typeof n == 'string'
            ? r
              ? document.getElementById(n.slice(1))
              : document.querySelector(n)
            : n;
      if (!o) return;
      t = PC(o, e);
    } else t = e;
    'scrollBehavior' in document.documentElement.style
      ? window.scrollTo(t)
      : window.scrollTo(
          t.left != null ? t.left : window.scrollX,
          t.top != null ? t.top : window.scrollY,
        );
  }
  function Cu(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const la = new Map();
  function IC(e, t) {
    la.set(e, t);
  }
  function MC(e) {
    const t = la.get(e);
    return (la.delete(e), t);
  }
  function kC(e) {
    return typeof e == 'string' || (e && typeof e == 'object');
  }
  function Kh(e) {
    return typeof e == 'string' || typeof e == 'symbol';
  }
  let Ve = (function (e) {
    return (
      (e[(e.MATCHER_NOT_FOUND = 1)] = 'MATCHER_NOT_FOUND'),
      (e[(e.NAVIGATION_GUARD_REDIRECT = 2)] = 'NAVIGATION_GUARD_REDIRECT'),
      (e[(e.NAVIGATION_ABORTED = 4)] = 'NAVIGATION_ABORTED'),
      (e[(e.NAVIGATION_CANCELLED = 8)] = 'NAVIGATION_CANCELLED'),
      (e[(e.NAVIGATION_DUPLICATED = 16)] = 'NAVIGATION_DUPLICATED'),
      e
    );
  })({});
  const qh = Symbol('');
  (Ve.MATCHER_NOT_FOUND + '',
    Ve.NAVIGATION_GUARD_REDIRECT + '',
    Ve.NAVIGATION_ABORTED + '',
    Ve.NAVIGATION_CANCELLED + '',
    Ve.NAVIGATION_DUPLICATED + '');
  function Pr(e, t) {
    return Me(new Error(), { type: e, [qh]: !0 }, t);
  }
  function ln(e, t) {
    return e instanceof Error && qh in e && (t == null || !!(e.type & t));
  }
  const RC = ['params', 'query', 'hash'];
  function NC(e) {
    if (typeof e == 'string') return e;
    if (e.path != null) return e.path;
    const t = {};
    for (const n of RC) n in e && (t[n] = e[n]);
    return JSON.stringify(t, null, 2);
  }
  function LC(e) {
    const t = {};
    if (e === '' || e === '?') return t;
    const n = (e[0] === '?' ? e.slice(1) : e).split('&');
    for (let r = 0; r < n.length; ++r) {
      const o = n[r].replace(Uh, ' '),
        i = o.indexOf('='),
        s = go(i < 0 ? o : o.slice(0, i)),
        a = i < 0 ? null : go(o.slice(i + 1));
      if (s in t) {
        let l = t[s];
        (Wt(l) || (l = t[s] = [l]), l.push(a));
      } else t[s] = a;
    }
    return t;
  }
  function Tu(e) {
    let t = '';
    for (let n in e) {
      const r = e[n];
      if (((n = vC(n)), r == null)) {
        r !== void 0 && (t += (t.length ? '&' : '') + n);
        continue;
      }
      (Wt(r) ? r.map((o) => o && sa(o)) : [r && sa(r)]).forEach((o) => {
        o !== void 0 && ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o));
      });
    }
    return t;
  }
  function DC(e) {
    const t = {};
    for (const n in e) {
      const r = e[n];
      r !== void 0 &&
        (t[n] = Wt(r) ? r.map((o) => (o == null ? null : '' + o)) : r == null ? r : '' + r);
    }
    return t;
  }
  const $C = Symbol(''),
    Ou = Symbol(''),
    fl = Symbol(''),
    Gh = Symbol(''),
    ca = Symbol('');
  function Fr() {
    let e = [];
    function t(r) {
      return (
        e.push(r),
        () => {
          const o = e.indexOf(r);
          o > -1 && e.splice(o, 1);
        }
      );
    }
    function n() {
      e = [];
    }
    return { add: t, list: () => e.slice(), reset: n };
  }
  function Pn(e, t, n, r, o, i = (s) => s()) {
    const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () =>
      new Promise((a, l) => {
        const u = (d) => {
            d === !1
              ? l(Pr(Ve.NAVIGATION_ABORTED, { from: n, to: t }))
              : d instanceof Error
                ? l(d)
                : kC(d)
                  ? l(Pr(Ve.NAVIGATION_GUARD_REDIRECT, { from: t, to: d }))
                  : (s && r.enterCallbacks[o] === s && typeof d == 'function' && s.push(d), a());
          },
          f = i(() => e.call(r && r.instances[o], t, n, u));
        let c = Promise.resolve(f);
        (e.length < 3 && (c = c.then(u)), c.catch((d) => l(d)));
      });
  }
  function Os(e, t, n, r, o = (i) => i()) {
    const i = [];
    for (const s of e)
      for (const a in s.components) {
        let l = s.components[a];
        if (!(t !== 'beforeRouteEnter' && !s.instances[a]))
          if (Bh(l)) {
            const u = (l.__vccOpts || l)[t];
            u && i.push(Pn(u, n, r, s, a, o));
          } else {
            let u = l();
            i.push(() =>
              u.then((f) => {
                if (!f) throw new Error(`Couldn't resolve component "${a}" at "${s.path}"`);
                const c = iC(f) ? f.default : f;
                ((s.mods[a] = f), (s.components[a] = c));
                const d = (c.__vccOpts || c)[t];
                return d && Pn(d, n, r, s, a, o)();
              }),
            );
          }
      }
    return i;
  }
  function jC(e, t) {
    const n = [],
      r = [],
      o = [],
      i = Math.max(t.matched.length, e.matched.length);
    for (let s = 0; s < i; s++) {
      const a = t.matched[s];
      a && (e.matched.find((u) => Or(u, a)) ? r.push(a) : n.push(a));
      const l = e.matched[s];
      l && (t.matched.find((u) => Or(u, l)) || o.push(l));
    }
    return [n, r, o];
  }
  let zC = () => location.protocol + '//' + location.host;
  function Xh(e, t) {
    const { pathname: n, search: r, hash: o } = t,
      i = e.indexOf('#');
    if (i > -1) {
      let s = o.includes(e.slice(i)) ? e.slice(i).length : 1,
        a = o.slice(s);
      return (a[0] !== '/' && (a = '/' + a), _u(a, ''));
    }
    return _u(n, e) + r + o;
  }
  function BC(e, t, n, r) {
    let o = [],
      i = [],
      s = null;
    const a = ({ state: d }) => {
      const h = Xh(e, location),
        p = n.value,
        m = t.value;
      let g = 0;
      if (d) {
        if (((n.value = h), (t.value = d), s && s === p)) {
          s = null;
          return;
        }
        g = m ? d.position - m.position : 0;
      } else r(h);
      o.forEach((v) => {
        v(n.value, p, {
          delta: g,
          type: aa.pop,
          direction: g ? (g > 0 ? Ts.forward : Ts.back) : Ts.unknown,
        });
      });
    };
    function l() {
      s = n.value;
    }
    function u(d) {
      o.push(d);
      const h = () => {
        const p = o.indexOf(d);
        p > -1 && o.splice(p, 1);
      };
      return (i.push(h), h);
    }
    function f() {
      if (document.visibilityState === 'hidden') {
        const { history: d } = window;
        if (!d.state) return;
        d.replaceState(Me({}, d.state, { scroll: qi() }), '');
      }
    }
    function c() {
      for (const d of i) d();
      ((i = []),
        window.removeEventListener('popstate', a),
        window.removeEventListener('pagehide', f),
        document.removeEventListener('visibilitychange', f));
    }
    return (
      window.addEventListener('popstate', a),
      window.addEventListener('pagehide', f),
      document.addEventListener('visibilitychange', f),
      { pauseListeners: l, listen: u, destroy: c }
    );
  }
  function Pu(e, t, n, r = !1, o = !1) {
    return {
      back: e,
      current: t,
      forward: n,
      replaced: r,
      position: window.history.length,
      scroll: o ? qi() : null,
    };
  }
  function FC(e) {
    const { history: t, location: n } = window,
      r = { value: Xh(e, n) },
      o = { value: t.state };
    o.value ||
      i(
        r.value,
        {
          back: null,
          current: r.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0,
      );
    function i(l, u, f) {
      const c = e.indexOf('#'),
        d = c > -1 ? (n.host && document.querySelector('base') ? e : e.slice(c)) + l : zC() + e + l;
      try {
        (t[f ? 'replaceState' : 'pushState'](u, '', d), (o.value = u));
      } catch (h) {
        (console.error(h), n[f ? 'replace' : 'assign'](d));
      }
    }
    function s(l, u) {
      (i(
        l,
        Me({}, t.state, Pu(o.value.back, l, o.value.forward, !0), u, {
          position: o.value.position,
        }),
        !0,
      ),
        (r.value = l));
    }
    function a(l, u) {
      const f = Me({}, o.value, t.state, { forward: l, scroll: qi() });
      (i(f.current, f, !0),
        i(l, Me({}, Pu(r.value, l, null), { position: f.position + 1 }, u), !1),
        (r.value = l));
    }
    return { location: r, state: o, push: a, replace: s };
  }
  function UC(e) {
    e = CC(e);
    const t = FC(e),
      n = BC(e, t.state, t.location, t.replace);
    function r(i, s = !0) {
      (s || n.pauseListeners(), history.go(i));
    }
    const o = Me({ location: '', base: e, go: r, createHref: OC.bind(null, e) }, t, n);
    return (
      Object.defineProperty(o, 'location', { enumerable: !0, get: () => t.location.value }),
      Object.defineProperty(o, 'state', { enumerable: !0, get: () => t.state.value }),
      o
    );
  }
  let Wn = (function (e) {
    return (
      (e[(e.Static = 0)] = 'Static'),
      (e[(e.Param = 1)] = 'Param'),
      (e[(e.Group = 2)] = 'Group'),
      e
    );
  })({});
  var Qe = (function (e) {
    return (
      (e[(e.Static = 0)] = 'Static'),
      (e[(e.Param = 1)] = 'Param'),
      (e[(e.ParamRegExp = 2)] = 'ParamRegExp'),
      (e[(e.ParamRegExpEnd = 3)] = 'ParamRegExpEnd'),
      (e[(e.EscapeNext = 4)] = 'EscapeNext'),
      e
    );
  })(Qe || {});
  const HC = { type: Wn.Static, value: '' },
    VC = /[a-zA-Z0-9_]/;
  function ZC(e) {
    if (!e) return [[]];
    if (e === '/') return [[HC]];
    if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
    function t(h) {
      throw new Error(`ERR (${n})/"${u}": ${h}`);
    }
    let n = Qe.Static,
      r = n;
    const o = [];
    let i;
    function s() {
      (i && o.push(i), (i = []));
    }
    let a = 0,
      l,
      u = '',
      f = '';
    function c() {
      u &&
        (n === Qe.Static
          ? i.push({ type: Wn.Static, value: u })
          : n === Qe.Param || n === Qe.ParamRegExp || n === Qe.ParamRegExpEnd
            ? (i.length > 1 &&
                (l === '*' || l === '+') &&
                t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),
              i.push({
                type: Wn.Param,
                value: u,
                regexp: f,
                repeatable: l === '*' || l === '+',
                optional: l === '*' || l === '?',
              }))
            : t('Invalid state to consume buffer'),
        (u = ''));
    }
    function d() {
      u += l;
    }
    for (; a < e.length; ) {
      if (((l = e[a++]), l === '\\' && n !== Qe.ParamRegExp)) {
        ((r = n), (n = Qe.EscapeNext));
        continue;
      }
      switch (n) {
        case Qe.Static:
          l === '/' ? (u && c(), s()) : l === ':' ? (c(), (n = Qe.Param)) : d();
          break;
        case Qe.EscapeNext:
          (d(), (n = r));
          break;
        case Qe.Param:
          l === '('
            ? (n = Qe.ParamRegExp)
            : VC.test(l)
              ? d()
              : (c(), (n = Qe.Static), l !== '*' && l !== '?' && l !== '+' && a--);
          break;
        case Qe.ParamRegExp:
          l === ')'
            ? f[f.length - 1] == '\\'
              ? (f = f.slice(0, -1) + l)
              : (n = Qe.ParamRegExpEnd)
            : (f += l);
          break;
        case Qe.ParamRegExpEnd:
          (c(), (n = Qe.Static), l !== '*' && l !== '?' && l !== '+' && a--, (f = ''));
          break;
        default:
          t('Unknown state');
          break;
      }
    }
    return (n === Qe.ParamRegExp && t(`Unfinished custom RegExp for param "${u}"`), c(), s(), o);
  }
  const Au = '[^/]+?',
    WC = { sensitive: !1, strict: !1, start: !0, end: !0 };
  var mt = (function (e) {
    return (
      (e[(e._multiplier = 10)] = '_multiplier'),
      (e[(e.Root = 90)] = 'Root'),
      (e[(e.Segment = 40)] = 'Segment'),
      (e[(e.SubSegment = 30)] = 'SubSegment'),
      (e[(e.Static = 40)] = 'Static'),
      (e[(e.Dynamic = 20)] = 'Dynamic'),
      (e[(e.BonusCustomRegExp = 10)] = 'BonusCustomRegExp'),
      (e[(e.BonusWildcard = -50)] = 'BonusWildcard'),
      (e[(e.BonusRepeatable = -20)] = 'BonusRepeatable'),
      (e[(e.BonusOptional = -8)] = 'BonusOptional'),
      (e[(e.BonusStrict = 0.7000000000000001)] = 'BonusStrict'),
      (e[(e.BonusCaseSensitive = 0.25)] = 'BonusCaseSensitive'),
      e
    );
  })(mt || {});
  const KC = /[.+*?^${}()[\]/\\]/g;
  function qC(e, t) {
    const n = Me({}, WC, t),
      r = [];
    let o = n.start ? '^' : '';
    const i = [];
    for (const u of e) {
      const f = u.length ? [] : [mt.Root];
      n.strict && !u.length && (o += '/');
      for (let c = 0; c < u.length; c++) {
        const d = u[c];
        let h = mt.Segment + (n.sensitive ? mt.BonusCaseSensitive : 0);
        if (d.type === Wn.Static)
          (c || (o += '/'), (o += d.value.replace(KC, '\\$&')), (h += mt.Static));
        else if (d.type === Wn.Param) {
          const { value: p, repeatable: m, optional: g, regexp: v } = d;
          i.push({ name: p, repeatable: m, optional: g });
          const b = v || Au;
          if (b !== Au) {
            h += mt.BonusCustomRegExp;
            try {
              `${b}`;
            } catch (y) {
              throw new Error(`Invalid custom RegExp for param "${p}" (${b}): ` + y.message);
            }
          }
          let w = m ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
          (c || (w = g && u.length < 2 ? `(?:/${w})` : '/' + w),
            g && (w += '?'),
            (o += w),
            (h += mt.Dynamic),
            g && (h += mt.BonusOptional),
            m && (h += mt.BonusRepeatable),
            b === '.*' && (h += mt.BonusWildcard));
        }
        f.push(h);
      }
      r.push(f);
    }
    if (n.strict && n.end) {
      const u = r.length - 1;
      r[u][r[u].length - 1] += mt.BonusStrict;
    }
    (n.strict || (o += '/?'),
      n.end ? (o += '$') : n.strict && !o.endsWith('/') && (o += '(?:/|$)'));
    const s = new RegExp(o, n.sensitive ? '' : 'i');
    function a(u) {
      const f = u.match(s),
        c = {};
      if (!f) return null;
      for (let d = 1; d < f.length; d++) {
        const h = f[d] || '',
          p = i[d - 1];
        c[p.name] = h && p.repeatable ? h.split('/') : h;
      }
      return c;
    }
    function l(u) {
      let f = '',
        c = !1;
      for (const d of e) {
        ((!c || !f.endsWith('/')) && (f += '/'), (c = !1));
        for (const h of d)
          if (h.type === Wn.Static) f += h.value;
          else if (h.type === Wn.Param) {
            const { value: p, repeatable: m, optional: g } = h,
              v = p in u ? u[p] : '';
            if (Wt(v) && !m)
              throw new Error(
                `Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`,
              );
            const b = Wt(v) ? v.join('/') : v;
            if (!b)
              if (g) d.length < 2 && (f.endsWith('/') ? (f = f.slice(0, -1)) : (c = !0));
              else throw new Error(`Missing required param "${p}"`);
            f += b;
          }
      }
      return f || '/';
    }
    return { re: s, score: r, keys: i, parse: a, stringify: l };
  }
  function GC(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const r = t[n] - e[n];
      if (r) return r;
      n++;
    }
    return e.length < t.length
      ? e.length === 1 && e[0] === mt.Static + mt.Segment
        ? -1
        : 1
      : e.length > t.length
        ? t.length === 1 && t[0] === mt.Static + mt.Segment
          ? 1
          : -1
        : 0;
  }
  function Jh(e, t) {
    let n = 0;
    const r = e.score,
      o = t.score;
    for (; n < r.length && n < o.length; ) {
      const i = GC(r[n], o[n]);
      if (i) return i;
      n++;
    }
    if (Math.abs(o.length - r.length) === 1) {
      if (Iu(r)) return 1;
      if (Iu(o)) return -1;
    }
    return o.length - r.length;
  }
  function Iu(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const XC = { strict: !1, end: !0, sensitive: !1 };
  function JC(e, t, n) {
    const r = qC(ZC(e.path), n),
      o = Me(r, { record: e, parent: t, children: [], alias: [] });
    return (t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o);
  }
  function YC(e, t) {
    const n = [],
      r = new Map();
    t = Eu(XC, t);
    function o(c) {
      return r.get(c);
    }
    function i(c, d, h) {
      const p = !h,
        m = ku(c);
      m.aliasOf = h && h.record;
      const g = Eu(t, c),
        v = [m];
      if ('alias' in c) {
        const y = typeof c.alias == 'string' ? [c.alias] : c.alias;
        for (const x of y)
          v.push(
            ku(
              Me({}, m, {
                components: h ? h.record.components : m.components,
                path: x,
                aliasOf: h ? h.record : m,
              }),
            ),
          );
      }
      let b, w;
      for (const y of v) {
        const { path: x } = y;
        if (d && x[0] !== '/') {
          const E = d.record.path,
            C = E[E.length - 1] === '/' ? '' : '/';
          y.path = d.record.path + (x && C + x);
        }
        if (
          ((b = JC(y, d, g)),
          h
            ? h.alias.push(b)
            : ((w = w || b), w !== b && w.alias.push(b), p && c.name && !Ru(b) && s(c.name)),
          Yh(b) && l(b),
          m.children)
        ) {
          const E = m.children;
          for (let C = 0; C < E.length; C++) i(E[C], b, h && h.children[C]);
        }
        h = h || b;
      }
      return w
        ? () => {
            s(w);
          }
        : eo;
    }
    function s(c) {
      if (Kh(c)) {
        const d = r.get(c);
        d && (r.delete(c), n.splice(n.indexOf(d), 1), d.children.forEach(s), d.alias.forEach(s));
      } else {
        const d = n.indexOf(c);
        d > -1 &&
          (n.splice(d, 1),
          c.record.name && r.delete(c.record.name),
          c.children.forEach(s),
          c.alias.forEach(s));
      }
    }
    function a() {
      return n;
    }
    function l(c) {
      const d = tT(c, n);
      (n.splice(d, 0, c), c.record.name && !Ru(c) && r.set(c.record.name, c));
    }
    function u(c, d) {
      let h,
        p = {},
        m,
        g;
      if ('name' in c && c.name) {
        if (((h = r.get(c.name)), !h)) throw Pr(Ve.MATCHER_NOT_FOUND, { location: c });
        ((g = h.record.name),
          (p = Me(
            Mu(
              d.params,
              h.keys
                .filter((w) => !w.optional)
                .concat(h.parent ? h.parent.keys.filter((w) => w.optional) : [])
                .map((w) => w.name),
            ),
            c.params &&
              Mu(
                c.params,
                h.keys.map((w) => w.name),
              ),
          )),
          (m = h.stringify(p)));
      } else if (c.path != null)
        ((m = c.path),
          (h = n.find((w) => w.re.test(m))),
          h && ((p = h.parse(m)), (g = h.record.name)));
      else {
        if (((h = d.name ? r.get(d.name) : n.find((w) => w.re.test(d.path))), !h))
          throw Pr(Ve.MATCHER_NOT_FOUND, { location: c, currentLocation: d });
        ((g = h.record.name), (p = Me({}, d.params, c.params)), (m = h.stringify(p)));
      }
      const v = [];
      let b = h;
      for (; b; ) (v.unshift(b.record), (b = b.parent));
      return { name: g, path: m, params: p, matched: v, meta: eT(v) };
    }
    e.forEach((c) => i(c));
    function f() {
      ((n.length = 0), r.clear());
    }
    return {
      addRoute: i,
      resolve: u,
      removeRoute: s,
      clearRoutes: f,
      getRoutes: a,
      getRecordMatcher: o,
    };
  }
  function Mu(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
  }
  function ku(e) {
    const t = {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: e.aliasOf,
      beforeEnter: e.beforeEnter,
      props: QC(e),
      children: e.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components:
        'components' in e ? e.components || null : e.component && { default: e.component },
    };
    return (Object.defineProperty(t, 'mods', { value: {} }), t);
  }
  function QC(e) {
    const t = {},
      n = e.props || !1;
    if ('component' in e) t.default = n;
    else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n;
    return t;
  }
  function Ru(e) {
    for (; e; ) {
      if (e.record.aliasOf) return !0;
      e = e.parent;
    }
    return !1;
  }
  function eT(e) {
    return e.reduce((t, n) => Me(t, n.meta), {});
  }
  function tT(e, t) {
    let n = 0,
      r = t.length;
    for (; n !== r; ) {
      const i = (n + r) >> 1;
      Jh(e, t[i]) < 0 ? (r = i) : (n = i + 1);
    }
    const o = nT(e);
    return (o && (r = t.lastIndexOf(o, r - 1)), r);
  }
  function nT(e) {
    let t = e;
    for (; (t = t.parent); ) if (Yh(t) && Jh(e, t) === 0) return t;
  }
  function Yh({ record: e }) {
    return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect);
  }
  function Nu(e) {
    const t = rt(fl),
      n = rt(Gh),
      r = B(() => {
        const l = L(e.to);
        return t.resolve(l);
      }),
      o = B(() => {
        const { matched: l } = r.value,
          { length: u } = l,
          f = l[u - 1],
          c = n.matched;
        if (!f || !c.length) return -1;
        const d = c.findIndex(Or.bind(null, f));
        if (d > -1) return d;
        const h = Lu(l[u - 2]);
        return u > 1 && Lu(f) === h && c[c.length - 1].path !== h
          ? c.findIndex(Or.bind(null, l[u - 2]))
          : d;
      }),
      i = B(() => o.value > -1 && aT(n.params, r.value.params)),
      s = B(() => o.value > -1 && o.value === n.matched.length - 1 && Wh(n.params, r.value.params));
    function a(l = {}) {
      if (sT(l)) {
        const u = t[L(e.replace) ? 'replace' : 'push'](L(e.to)).catch(eo);
        return (
          e.viewTransition &&
            typeof document < 'u' &&
            'startViewTransition' in document &&
            document.startViewTransition(() => u),
          u
        );
      }
      return Promise.resolve();
    }
    return { route: r, href: B(() => r.value.href), isActive: i, isExactActive: s, navigate: a };
  }
  function rT(e) {
    return e.length === 1 ? e[0] : e;
  }
  const oT = pe({
      name: 'RouterLink',
      compatConfig: { MODE: 3 },
      props: {
        to: { type: [String, Object], required: !0 },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: { type: String, default: 'page' },
        viewTransition: Boolean,
      },
      useLink: Nu,
      setup(e, { slots: t }) {
        const n = Ot(Nu(e)),
          { options: r } = rt(fl),
          o = B(() => ({
            [Du(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
            [Du(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]:
              n.isExactActive,
          }));
        return () => {
          const i = t.default && rT(t.default(n));
          return e.custom
            ? i
            : Qf(
                'a',
                {
                  'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                  href: n.href,
                  onClick: n.navigate,
                  class: o.value,
                },
                i,
              );
        };
      },
    }),
    iT = oT;
  function sT(e) {
    if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
      !e.defaultPrevented &&
      !(e.button !== void 0 && e.button !== 0)
    ) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute('target');
        if (/\b_blank\b/i.test(t)) return;
      }
      return (e.preventDefault && e.preventDefault(), !0);
    }
  }
  function aT(e, t) {
    for (const n in t) {
      const r = t[n],
        o = e[n];
      if (typeof r == 'string') {
        if (r !== o) return !1;
      } else if (!Wt(o) || o.length !== r.length || r.some((i, s) => i !== o[s])) return !1;
    }
    return !0;
  }
  function Lu(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
  }
  const Du = (e, t, n) => e ?? t ?? n,
    lT = pe({
      name: 'RouterView',
      inheritAttrs: !1,
      props: { name: { type: String, default: 'default' }, route: Object },
      compatConfig: { MODE: 3 },
      setup(e, { attrs: t, slots: n }) {
        const r = rt(ca),
          o = B(() => e.route || r.value),
          i = rt(Ou, 0),
          s = B(() => {
            let u = L(i);
            const { matched: f } = o.value;
            let c;
            for (; (c = f[u]) && !c.components; ) u++;
            return u;
          }),
          a = B(() => o.value.matched[s.value]);
        (Bt(
          Ou,
          B(() => s.value + 1),
        ),
          Bt($C, a),
          Bt(ca, o));
        const l = J();
        return (
          be(
            () => [l.value, a.value, e.name],
            ([u, f, c], [d, h, p]) => {
              (f &&
                ((f.instances[c] = u),
                h &&
                  h !== f &&
                  u &&
                  u === d &&
                  (f.leaveGuards.size || (f.leaveGuards = h.leaveGuards),
                  f.updateGuards.size || (f.updateGuards = h.updateGuards))),
                u &&
                  f &&
                  (!h || !Or(f, h) || !d) &&
                  (f.enterCallbacks[c] || []).forEach((m) => m(u)));
            },
            { flush: 'post' },
          ),
          () => {
            const u = o.value,
              f = e.name,
              c = a.value,
              d = c && c.components[f];
            if (!d) return $u(n.default, { Component: d, route: u });
            const h = c.props[f],
              p = h ? (h === !0 ? u.params : typeof h == 'function' ? h(u) : h) : null,
              g = Qf(
                d,
                Me({}, p, t, {
                  onVnodeUnmounted: (v) => {
                    v.component.isUnmounted && (c.instances[f] = null);
                  },
                  ref: l,
                }),
              );
            return $u(n.default, { Component: g, route: u }) || g;
          }
        );
      },
    });
  function $u(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
  }
  const cT = lT;
  function uT(e) {
    const t = YC(e.routes, e),
      n = e.parseQuery || LC,
      r = e.stringifyQuery || Tu,
      o = e.history,
      i = Fr(),
      s = Fr(),
      a = Fr(),
      l = Rp(_n);
    let u = _n;
    pr &&
      e.scrollBehavior &&
      'scrollRestoration' in history &&
      (history.scrollRestoration = 'manual');
    const f = Ss.bind(null, (O) => '' + O),
      c = Ss.bind(null, yC),
      d = Ss.bind(null, go);
    function h(O, Z) {
      let U, ee;
      return (Kh(O) ? ((U = t.getRecordMatcher(O)), (ee = Z)) : (ee = O), t.addRoute(ee, U));
    }
    function p(O) {
      const Z = t.getRecordMatcher(O);
      Z && t.removeRoute(Z);
    }
    function m() {
      return t.getRoutes().map((O) => O.record);
    }
    function g(O) {
      return !!t.getRecordMatcher(O);
    }
    function v(O, Z) {
      if (((Z = Me({}, Z || l.value)), typeof O == 'string')) {
        const T = Cs(n, O, Z.path),
          D = t.resolve({ path: T.path }, Z),
          z = o.createHref(T.fullPath);
        return Me(T, D, { params: d(D.params), hash: go(T.hash), redirectedFrom: void 0, href: z });
      }
      let U;
      if (O.path != null) U = Me({}, O, { path: Cs(n, O.path, Z.path).path });
      else {
        const T = Me({}, O.params);
        for (const D in T) T[D] == null && delete T[D];
        ((U = Me({}, O, { params: c(T) })), (Z.params = c(Z.params)));
      }
      const ee = t.resolve(U, Z),
        xe = O.hash || '';
      ee.params = f(d(ee.params));
      const _ = xC(r, Me({}, O, { hash: gC(xe), path: ee.path })),
        S = o.createHref(_);
      return Me({ fullPath: _, hash: xe, query: r === Tu ? DC(O.query) : O.query || {} }, ee, {
        redirectedFrom: void 0,
        href: S,
      });
    }
    function b(O) {
      return typeof O == 'string' ? Cs(n, O, l.value.path) : Me({}, O);
    }
    function w(O, Z) {
      if (u !== O) return Pr(Ve.NAVIGATION_CANCELLED, { from: Z, to: O });
    }
    function y(O) {
      return C(O);
    }
    function x(O) {
      return y(Me(b(O), { replace: !0 }));
    }
    function E(O, Z) {
      const U = O.matched[O.matched.length - 1];
      if (U && U.redirect) {
        const { redirect: ee } = U;
        let xe = typeof ee == 'function' ? ee(O, Z) : ee;
        return (
          typeof xe == 'string' &&
            ((xe = xe.includes('?') || xe.includes('#') ? (xe = b(xe)) : { path: xe }),
            (xe.params = {})),
          Me({ query: O.query, hash: O.hash, params: xe.path != null ? {} : O.params }, xe)
        );
      }
    }
    function C(O, Z) {
      const U = (u = v(O)),
        ee = l.value,
        xe = O.state,
        _ = O.force,
        S = O.replace === !0,
        T = E(U, ee);
      if (T)
        return C(
          Me(b(T), {
            state: typeof T == 'object' ? Me({}, xe, T.state) : xe,
            force: _,
            replace: S,
          }),
          Z || U,
        );
      const D = U;
      D.redirectedFrom = Z;
      let z;
      return (
        !_ &&
          EC(r, ee, U) &&
          ((z = Pr(Ve.NAVIGATION_DUPLICATED, { to: D, from: ee })), we(ee, ee, !0, !1)),
        (z ? Promise.resolve(z) : A(D, ee))
          .catch(($) => (ln($) ? (ln($, Ve.NAVIGATION_GUARD_REDIRECT) ? $ : qe($)) : te($, D, ee)))
          .then(($) => {
            if ($) {
              if (ln($, Ve.NAVIGATION_GUARD_REDIRECT))
                return C(
                  Me({ replace: S }, b($.to), {
                    state: typeof $.to == 'object' ? Me({}, xe, $.to.state) : xe,
                    force: _,
                  }),
                  Z || D,
                );
            } else $ = R(D, ee, !0, S, xe);
            return (j(D, ee, $), $);
          })
      );
    }
    function P(O, Z) {
      const U = w(O, Z);
      return U ? Promise.reject(U) : Promise.resolve();
    }
    function M(O) {
      const Z = at.values().next().value;
      return Z && typeof Z.runWithContext == 'function' ? Z.runWithContext(O) : O();
    }
    function A(O, Z) {
      let U;
      const [ee, xe, _] = jC(O, Z);
      U = Os(ee.reverse(), 'beforeRouteLeave', O, Z);
      for (const T of ee)
        T.leaveGuards.forEach((D) => {
          U.push(Pn(D, O, Z));
        });
      const S = P.bind(null, O, Z);
      return (
        U.push(S),
        H(U)
          .then(() => {
            U = [];
            for (const T of i.list()) U.push(Pn(T, O, Z));
            return (U.push(S), H(U));
          })
          .then(() => {
            U = Os(xe, 'beforeRouteUpdate', O, Z);
            for (const T of xe)
              T.updateGuards.forEach((D) => {
                U.push(Pn(D, O, Z));
              });
            return (U.push(S), H(U));
          })
          .then(() => {
            U = [];
            for (const T of _)
              if (T.beforeEnter)
                if (Wt(T.beforeEnter)) for (const D of T.beforeEnter) U.push(Pn(D, O, Z));
                else U.push(Pn(T.beforeEnter, O, Z));
            return (U.push(S), H(U));
          })
          .then(
            () => (
              O.matched.forEach((T) => (T.enterCallbacks = {})),
              (U = Os(_, 'beforeRouteEnter', O, Z, M)),
              U.push(S),
              H(U)
            ),
          )
          .then(() => {
            U = [];
            for (const T of s.list()) U.push(Pn(T, O, Z));
            return (U.push(S), H(U));
          })
          .catch((T) => (ln(T, Ve.NAVIGATION_CANCELLED) ? T : Promise.reject(T)))
      );
    }
    function j(O, Z, U) {
      a.list().forEach((ee) => M(() => ee(O, Z, U)));
    }
    function R(O, Z, U, ee, xe) {
      const _ = w(O, Z);
      if (_) return _;
      const S = Z === _n,
        T = pr ? history.state : {};
      (U &&
        (ee || S
          ? o.replace(O.fullPath, Me({ scroll: S && T && T.scroll }, xe))
          : o.push(O.fullPath, xe)),
        (l.value = O),
        we(O, Z, U, S),
        qe());
    }
    let V;
    function re() {
      V ||
        (V = o.listen((O, Z, U) => {
          if (!He.listening) return;
          const ee = v(O),
            xe = E(ee, He.currentRoute.value);
          if (xe) {
            C(Me(xe, { replace: !0, force: !0 }), ee).catch(eo);
            return;
          }
          u = ee;
          const _ = l.value;
          (pr && IC(Cu(_.fullPath, U.delta), qi()),
            A(ee, _)
              .catch((S) =>
                ln(S, Ve.NAVIGATION_ABORTED | Ve.NAVIGATION_CANCELLED)
                  ? S
                  : ln(S, Ve.NAVIGATION_GUARD_REDIRECT)
                    ? (C(Me(b(S.to), { force: !0 }), ee)
                        .then((T) => {
                          ln(T, Ve.NAVIGATION_ABORTED | Ve.NAVIGATION_DUPLICATED) &&
                            !U.delta &&
                            U.type === aa.pop &&
                            o.go(-1, !1);
                        })
                        .catch(eo),
                      Promise.reject())
                    : (U.delta && o.go(-U.delta, !1), te(S, ee, _)),
              )
              .then((S) => {
                ((S = S || R(ee, _, !1)),
                  S &&
                    (U.delta && !ln(S, Ve.NAVIGATION_CANCELLED)
                      ? o.go(-U.delta, !1)
                      : U.type === aa.pop &&
                        ln(S, Ve.NAVIGATION_ABORTED | Ve.NAVIGATION_DUPLICATED) &&
                        o.go(-1, !1)),
                  j(ee, _, S));
              })
              .catch(eo));
        }));
    }
    let ne = Fr(),
      X = Fr(),
      le;
    function te(O, Z, U) {
      qe(O);
      const ee = X.list();
      return (ee.length ? ee.forEach((xe) => xe(O, Z, U)) : console.error(O), Promise.reject(O));
    }
    function Oe() {
      return le && l.value !== _n
        ? Promise.resolve()
        : new Promise((O, Z) => {
            ne.add([O, Z]);
          });
    }
    function qe(O) {
      return (
        le || ((le = !O), re(), ne.list().forEach(([Z, U]) => (O ? U(O) : Z())), ne.reset()),
        O
      );
    }
    function we(O, Z, U, ee) {
      const { scrollBehavior: xe } = e;
      if (!pr || !xe) return Promise.resolve();
      const _ =
        (!U && MC(Cu(O.fullPath, 0))) ||
        ((ee || !U) && history.state && history.state.scroll) ||
        null;
      return mo()
        .then(() => xe(O, Z, _))
        .then((S) => S && AC(S))
        .catch((S) => te(S, O, Z));
    }
    const Ie = (O) => o.go(O);
    let Ye;
    const at = new Set(),
      He = {
        currentRoute: l,
        listening: !0,
        addRoute: h,
        removeRoute: p,
        clearRoutes: t.clearRoutes,
        hasRoute: g,
        getRoutes: m,
        resolve: v,
        options: e,
        push: y,
        replace: x,
        go: Ie,
        back: () => Ie(-1),
        forward: () => Ie(1),
        beforeEach: i.add,
        beforeResolve: s.add,
        afterEach: a.add,
        onError: X.add,
        isReady: Oe,
        install(O) {
          (O.component('RouterLink', iT),
            O.component('RouterView', cT),
            (O.config.globalProperties.$router = He),
            Object.defineProperty(O.config.globalProperties, '$route', {
              enumerable: !0,
              get: () => L(l),
            }),
            pr && !Ye && l.value === _n && ((Ye = !0), y(o.location).catch((ee) => {})));
          const Z = {};
          for (const ee in _n)
            Object.defineProperty(Z, ee, { get: () => l.value[ee], enumerable: !0 });
          (O.provide(fl, He), O.provide(Gh, lf(Z)), O.provide(ca, l));
          const U = O.unmount;
          (at.add(O),
            (O.unmount = function () {
              (at.delete(O),
                at.size < 1 &&
                  ((u = _n), V && V(), (V = null), (l.value = _n), (Ye = !1), (le = !1)),
                U());
            }));
        },
      };
    function H(O) {
      return O.reduce((Z, U) => Z.then(() => M(U)), Promise.resolve());
    }
    return He;
  }
  const fT = uT({ history: UC('/'), routes: [] }),
    Ps = document.getElementById('app');
  if (Ps) {
    ((document.documentElement.style.height = '100%'),
      (document.body.style.height = '100%'),
      (document.body.style.margin = '0'),
      (Ps.style.height = '100%'));
    const e = Av(oC);
    (e.use(fT).use(RE), e.provide(id, ''), e.mount(Ps));
  }
});
export default dT();
