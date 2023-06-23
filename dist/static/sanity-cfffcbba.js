import{c as Ye,r as p,C as ee,s as M,j as m,R as sd,a as K,F as Ge,U as go,S as qs,b as tt,d as ld,e as cd,f as ri,g as Ks,O as Ys,E as Xs,h as Zs,P as dd,i as Js,u as Qs,k as ud,l as el,m as tl,T as fd,Z as pd,n as nl,o as gd,w as xt,p as wt,q as $,t as vd,_ as hd,v as pe,x as qn,y as q,z as oi,A as md,B as rl,D as bd,G as yd,H as xd,I as ii,J as ol,K as wd,L as Sd,M as Ed,N as Cd,Q as Id,V as Dd,W as Rd,X as Od,Y as Pd,$ as Ad,a0 as Td,a1 as Bd}from"./desk-257f76bb-bca7b027.js";var st={},il={},Zt={},hn={},_t={},rr={};Object.defineProperty(rr,"__esModule",{value:!0});rr.lexoHelper=void 0;rr.lexoHelper={arrayCopy:Md};function Md(t,e,n,r,o){let i=r;const a=e+o;for(let s=e;s<a;s++)n[i]=t[s],++i}var mn={};Object.defineProperty(mn,"__esModule",{value:!0});class kd{constructor(e=""){this.str=e}get length(){return this.str.length}set length(e){this.str=this.str.substring(0,e)}append(e){return this.str=this.str+e,this}remove(e,n){return this.str=this.str.substr(0,e)+this.str.substr(e+n),this}insert(e,n){return this.str=this.str.substr(0,e)+n+this.str.substr(e),this}toString(){return this.str}}mn.default=kd;Object.defineProperty(_t,"__esModule",{value:!0});_t.LexoInteger=void 0;const kn=rr,Nd=mn;class Q{constructor(e,n,r){this.sys=e,this.sign=n,this.mag=r}static parse(e,n){let r=e,o=1;e.indexOf(n.getPositiveChar())===0?r=e.substring(1):e.indexOf(n.getNegativeChar())===0&&(r=e.substring(1),o=-1);const i=new Array(r.length);let a=i.length-1;for(let s=0;a>=0;++s)i[s]=n.toDigit(r.charAt(a)),--a;return Q.make(n,o,i)}static zero(e){return new Q(e,0,Q.ZERO_MAG)}static one(e){return Q.make(e,1,Q.ONE_MAG)}static make(e,n,r){let o;for(o=r.length;o>0&&r[o-1]===0;--o);if(o===0)return Q.zero(e);if(o===r.length)return new Q(e,n,r);const i=new Array(o).fill(0);return kn.lexoHelper.arrayCopy(r,0,i,0,o),new Q(e,n,i)}static add(e,n,r){const o=Math.max(n.length,r.length),i=new Array(o).fill(0);let a=0;for(let s=0;s<o;++s){const l=s<n.length?n[s]:0,c=s<r.length?r[s]:0;let u=l+c+a;for(a=0;u>=e.getBase();u-=e.getBase())++a;i[s]=u}return Q.extendWithCarry(i,a)}static extendWithCarry(e,n){if(n>0){const r=new Array(e.length+1).fill(0);return kn.lexoHelper.arrayCopy(e,0,r,0,e.length),r[r.length-1]=n,r}return e}static subtract(e,n,r){const o=Q.complement(e,r,n.length),i=Q.add(e,n,o);return i[i.length-1]=0,Q.add(e,i,Q.ONE_MAG)}static multiply(e,n,r){const o=new Array(n.length+r.length).fill(0);for(let i=0;i<n.length;++i)for(let a=0;a<r.length;++a){const s=i+a;for(o[s]+=n[i]*r[a];o[s]>=e.getBase();o[s]-=e.getBase())++o[s+1]}return o}static complement(e,n,r){if(r<=0)throw new Error("Expected at least 1 digit");const o=new Array(r).fill(e.getBase()-1);for(let i=0;i<n.length;++i)o[i]=e.getBase()-1-n[i];return o}static compare(e,n){if(e.length<n.length)return-1;if(e.length>n.length)return 1;for(let r=e.length-1;r>=0;--r){if(e[r]<n[r])return-1;if(e[r]>n[r])return 1}return 0}add(e){if(this.checkSystem(e),this.isZero())return e;if(e.isZero())return this;if(this.sign!==e.sign){let r;return this.sign===-1?(r=this.negate(),r.subtract(e).negate()):(r=e.negate(),this.subtract(r))}const n=Q.add(this.sys,this.mag,e.mag);return Q.make(this.sys,this.sign,n)}subtract(e){if(this.checkSystem(e),this.isZero())return e.negate();if(e.isZero())return this;if(this.sign!==e.sign){let r;return this.sign===-1?(r=this.negate(),r.add(e).negate()):(r=e.negate(),this.add(r))}const n=Q.compare(this.mag,e.mag);return n===0?Q.zero(this.sys):n<0?Q.make(this.sys,this.sign===-1?1:-1,Q.subtract(this.sys,e.mag,this.mag)):Q.make(this.sys,this.sign===-1?-1:1,Q.subtract(this.sys,this.mag,e.mag))}multiply(e){if(this.checkSystem(e),this.isZero())return this;if(e.isZero())return e;if(this.isOneish())return this.sign===e.sign?Q.make(this.sys,1,e.mag):Q.make(this.sys,-1,e.mag);if(e.isOneish())return this.sign===e.sign?Q.make(this.sys,1,this.mag):Q.make(this.sys,-1,this.mag);const n=Q.multiply(this.sys,this.mag,e.mag);return this.sign===e.sign?Q.make(this.sys,1,n):Q.make(this.sys,-1,n)}negate(){return this.isZero()?this:Q.make(this.sys,this.sign===1?-1:1,this.mag)}shiftLeft(e=1){if(e===0)return this;if(e<0)return this.shiftRight(Math.abs(e));const n=new Array(this.mag.length+e).fill(0);return kn.lexoHelper.arrayCopy(this.mag,0,n,e,this.mag.length),Q.make(this.sys,this.sign,n)}shiftRight(e=1){if(this.mag.length-e<=0)return Q.zero(this.sys);const n=new Array(this.mag.length-e).fill(0);return kn.lexoHelper.arrayCopy(this.mag,e,n,0,n.length),Q.make(this.sys,this.sign,n)}complement(){return this.complementDigits(this.mag.length)}complementDigits(e){return Q.make(this.sys,this.sign,Q.complement(this.sys,this.mag,e))}isZero(){return this.sign===0&&this.mag.length===1&&this.mag[0]===0}isOne(){return this.sign===1&&this.mag.length===1&&this.mag[0]===1}getMag(e){return this.mag[e]}compareTo(e){if(this===e)return 0;if(!e)return 1;if(this.sign===-1){if(e.sign===-1){const n=Q.compare(this.mag,e.mag);return n===-1?1:n===1?-1:0}return-1}return this.sign===1?e.sign===1?Q.compare(this.mag,e.mag):1:e.sign===-1?1:e.sign===1?-1:0}getSystem(){return this.sys}format(){if(this.isZero())return""+this.sys.toChar(0);const e=new Nd.default,n=this.mag,r=n.length;for(let o=0;o<r;++o){const i=n[o];e.insert(0,this.sys.toChar(i))}return this.sign===-1&&e.insert(0,this.sys.getNegativeChar()),e.toString()}equals(e){return this===e?!0:e?this.sys.getBase()===e.sys.getBase()&&this.compareTo(e)===0:!1}toString(){return this.format()}isOneish(){return this.mag.length===1&&this.mag[0]===1}checkSystem(e){if(this.sys.getBase()!==e.sys.getBase())throw new Error("Expected numbers of same numeral sys")}}_t.LexoInteger=Q;Q.ZERO_MAG=[0];Q.ONE_MAG=[1];Q.NEGATIVE_SIGN=-1;Q.ZERO_SIGN=0;Q.POSITIVE_SIGN=1;Object.defineProperty(hn,"__esModule",{value:!0});hn.LexoDecimal=void 0;const Jt=_t,Ld=mn;class Ke{constructor(e,n){this.mag=e,this.sig=n}static half(e){const n=e.getBase()/2|0;return Ke.make(Jt.LexoInteger.make(e,1,[n]),1)}static parse(e,n){const r=e.indexOf(n.getRadixPointChar());if(e.lastIndexOf(n.getRadixPointChar())!==r)throw new Error("More than one "+n.getRadixPointChar());if(r<0)return Ke.make(Jt.LexoInteger.parse(e,n),0);const o=e.substring(0,r)+e.substring(r+1);return Ke.make(Jt.LexoInteger.parse(o,n),e.length-1-r)}static from(e){return Ke.make(e,0)}static make(e,n){if(e.isZero())return new Ke(e,0);let r=0;for(let a=0;a<n&&e.getMag(a)===0;++a)++r;const o=e.shiftRight(r),i=n-r;return new Ke(o,i)}getSystem(){return this.mag.getSystem()}add(e){let n=this.mag,r=this.sig,o=e.mag,i;for(i=e.sig;r<i;++r)n=n.shiftLeft();for(;r>i;)o=o.shiftLeft(),++i;return Ke.make(n.add(o),r)}subtract(e){let n=this.mag,r=this.sig,o=e.mag,i;for(i=e.sig;r<i;++r)n=n.shiftLeft();for(;r>i;)o=o.shiftLeft(),++i;return Ke.make(n.subtract(o),r)}multiply(e){return Ke.make(this.mag.multiply(e.mag),this.sig+e.sig)}floor(){return this.mag.shiftRight(this.sig)}ceil(){if(this.isExact())return this.mag;const e=this.floor();return e.add(Jt.LexoInteger.one(e.getSystem()))}isExact(){if(this.sig===0)return!0;for(let e=0;e<this.sig;++e)if(this.mag.getMag(e)!==0)return!1;return!0}getScale(){return this.sig}setScale(e,n=!1){if(e>=this.sig)return this;e<0&&(e=0);const r=this.sig-e;let o=this.mag.shiftRight(r);return n&&(o=o.add(Jt.LexoInteger.one(o.getSystem()))),Ke.make(o,e)}compareTo(e){if(this===e)return 0;if(!e)return 1;let n=this.mag,r=e.mag;return this.sig>e.sig?r=r.shiftLeft(this.sig-e.sig):this.sig<e.sig&&(n=n.shiftLeft(e.sig-this.sig)),n.compareTo(r)}format(){const e=this.mag.format();if(this.sig===0)return e;const n=new Ld.default(e),r=n[0],o=r===this.mag.getSystem().getPositiveChar()||r===this.mag.getSystem().getNegativeChar();for(o&&n.remove(0,1);n.length<this.sig+1;)n.insert(0,this.mag.getSystem().toChar(0));return n.insert(n.length-this.sig,this.mag.getSystem().getRadixPointChar()),n.length-this.sig===0&&n.insert(0,this.mag.getSystem().toChar(0)),o&&n.insert(0,r),n.toString()}equals(e){return this===e?!0:e?this.mag.equals(e.mag)&&this.sig===e.sig:!1}toString(){return this.format()}}hn.LexoDecimal=Ke;var Nn={},ai;function al(){if(ai)return Nn;ai=1,Object.defineProperty(Nn,"__esModule",{value:!0});const t=_t,e=ll();class n{constructor(o){this.value=t.LexoInteger.parse(o,e.LexoRank.NUMERAL_SYSTEM)}static get BUCKET_0(){return this._BUCKET_0||(this._BUCKET_0=new n("0")),this._BUCKET_0}static get BUCKET_1(){return this._BUCKET_1||(this._BUCKET_1=new n("1")),this._BUCKET_1}static get BUCKET_2(){return this._BUCKET_2||(this._BUCKET_2=new n("2")),this._BUCKET_2}static get VALUES(){return this._VALUES||(this._VALUES=[n.BUCKET_0,n.BUCKET_1,n.BUCKET_2]),this._VALUES}static max(){return n.VALUES[n.VALUES.length-1]}static from(o){const i=t.LexoInteger.parse(o,e.LexoRank.NUMERAL_SYSTEM),a=n.VALUES,s=a.length;for(let l=0;l<s;++l){const c=a[l];if(c.value.equals(i))return c}throw new Error("Unknown bucket: "+o)}static resolve(o){const i=n.VALUES,a=i.length;for(let s=0;s<a;++s){const l=i[s];if(l.equals(n.from(o.toString())))return l}throw new Error("No bucket found with id "+o)}format(){return this.value.format()}next(){return this.equals(n.BUCKET_0)?n.BUCKET_1:this.equals(n.BUCKET_1)?n.BUCKET_2:this.equals(n.BUCKET_2)?n.BUCKET_0:n.BUCKET_2}prev(){return this.equals(n.BUCKET_0)?n.BUCKET_2:this.equals(n.BUCKET_1)?n.BUCKET_0:this.equals(n.BUCKET_2)?n.BUCKET_1:n.BUCKET_0}equals(o){return this===o?!0:o?this.value.equals(o.value):!1}}return Nn.default=n,Nn}var vo={},sl={};Object.defineProperty(sl,"__esModule",{value:!0});var or={};Object.defineProperty(or,"__esModule",{value:!0});or.LexoNumeralSystem10=void 0;class $d{getBase(){return 10}getPositiveChar(){return"+"}getNegativeChar(){return"-"}getRadixPointChar(){return"."}toDigit(e){if(e>="0"&&e<="9")return e.charCodeAt(0)-48;throw new Error("Not valid digit: "+e)}toChar(e){return String.fromCharCode(e+48)}}or.LexoNumeralSystem10=$d;var ir={};Object.defineProperty(ir,"__esModule",{value:!0});ir.LexoNumeralSystem36=void 0;class Fd{constructor(){this.DIGITS="0123456789abcdefghijklmnopqrstuvwxyz".split("")}getBase(){return 36}getPositiveChar(){return"+"}getNegativeChar(){return"-"}getRadixPointChar(){return":"}toDigit(e){if(e>="0"&&e<="9")return e.charCodeAt(0)-48;if(e>="a"&&e<="z")return e.charCodeAt(0)-97+10;throw new Error("Not valid digit: "+e)}toChar(e){return this.DIGITS[e]}}ir.LexoNumeralSystem36=Fd;var ar={};Object.defineProperty(ar,"__esModule",{value:!0});ar.LexoNumeralSystem64=void 0;class zd{constructor(){this.DIGITS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_abcdefghijklmnopqrstuvwxyz".split("")}getBase(){return 64}getPositiveChar(){return"+"}getNegativeChar(){return"-"}getRadixPointChar(){return":"}toDigit(e){if(e>="0"&&e<="9")return e.charCodeAt(0)-48;if(e>="A"&&e<="Z")return e.charCodeAt(0)-65+10;if(e==="^")return 36;if(e==="_")return 37;if(e>="a"&&e<="z")return e.charCodeAt(0)-97+38;throw new Error("Not valid digit: "+e)}toChar(e){return this.DIGITS[e]}}ar.LexoNumeralSystem64=zd;(function(t){var e=Ye&&Ye.__createBinding||(Object.create?function(r,o,i,a){a===void 0&&(a=i);var s=Object.getOwnPropertyDescriptor(o,i);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[i]}}),Object.defineProperty(r,a,s)}:function(r,o,i,a){a===void 0&&(a=i),r[a]=o[i]}),n=Ye&&Ye.__exportStar||function(r,o){for(var i in r)i!=="default"&&!Object.prototype.hasOwnProperty.call(o,i)&&e(o,r,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(sl,t),n(or,t),n(ir,t),n(ar,t)})(vo);var si;function ll(){if(si)return Zt;si=1,Object.defineProperty(Zt,"__esModule",{value:!0}),Zt.LexoRank=void 0;const t=hn,e=al(),n=mn,r=vo;class o{constructor(a,s){this.value=a.format()+"|"+o.formatDecimal(s),this.bucket=a,this.decimal=s}static get NUMERAL_SYSTEM(){return this._NUMERAL_SYSTEM||(this._NUMERAL_SYSTEM=new r.LexoNumeralSystem36),this._NUMERAL_SYSTEM}static get ZERO_DECIMAL(){return this._ZERO_DECIMAL||(this._ZERO_DECIMAL=t.LexoDecimal.parse("0",o.NUMERAL_SYSTEM)),this._ZERO_DECIMAL}static get ONE_DECIMAL(){return this._ONE_DECIMAL||(this._ONE_DECIMAL=t.LexoDecimal.parse("1",o.NUMERAL_SYSTEM)),this._ONE_DECIMAL}static get EIGHT_DECIMAL(){return this._EIGHT_DECIMAL||(this._EIGHT_DECIMAL=t.LexoDecimal.parse("8",o.NUMERAL_SYSTEM)),this._EIGHT_DECIMAL}static get MIN_DECIMAL(){return this._MIN_DECIMAL||(this._MIN_DECIMAL=o.ZERO_DECIMAL),this._MIN_DECIMAL}static get MAX_DECIMAL(){return this._MAX_DECIMAL||(this._MAX_DECIMAL=t.LexoDecimal.parse("1000000",o.NUMERAL_SYSTEM).subtract(o.ONE_DECIMAL)),this._MAX_DECIMAL}static get MID_DECIMAL(){return this._MID_DECIMAL||(this._MID_DECIMAL=o.between(o.MIN_DECIMAL,o.MAX_DECIMAL)),this._MID_DECIMAL}static get INITIAL_MIN_DECIMAL(){return this._INITIAL_MIN_DECIMAL||(this._INITIAL_MIN_DECIMAL=t.LexoDecimal.parse("100000",o.NUMERAL_SYSTEM)),this._INITIAL_MIN_DECIMAL}static get INITIAL_MAX_DECIMAL(){return this._INITIAL_MAX_DECIMAL||(this._INITIAL_MAX_DECIMAL=t.LexoDecimal.parse(o.NUMERAL_SYSTEM.toChar(o.NUMERAL_SYSTEM.getBase()-2)+"00000",o.NUMERAL_SYSTEM)),this._INITIAL_MAX_DECIMAL}static min(){return o.from(e.default.BUCKET_0,o.MIN_DECIMAL)}static middle(){const a=o.min();return a.between(o.max(a.bucket))}static max(a=e.default.BUCKET_0){return o.from(a,o.MAX_DECIMAL)}static initial(a){return a===e.default.BUCKET_0?o.from(a,o.INITIAL_MIN_DECIMAL):o.from(a,o.INITIAL_MAX_DECIMAL)}static between(a,s){if(a.getSystem().getBase()!==s.getSystem().getBase())throw new Error("Expected same system");let l=a,c=s,u;if(a.getScale()<s.getScale()){if(u=s.setScale(a.getScale(),!1),a.compareTo(u)>=0)return o.mid(a,s);c=u}if(a.getScale()>c.getScale()){if(u=a.setScale(c.getScale(),!0),u.compareTo(c)>=0)return o.mid(a,s);l=u}let d;for(let v=l.getScale();v>0;c=d){const h=v-1,y=l.setScale(h,!0);if(d=c.setScale(h,!1),y.compareTo(d)===0)return o.checkMid(a,s,y);if(y.compareTo(d)>0)break;v=h,l=y}let f=o.middleInternal(a,s,l,c),g;for(let v=f.getScale();v>0;v=g){g=v-1;const h=f.setScale(g);if(a.compareTo(h)>=0||h.compareTo(s)>=0)break;f=h}return f}static parse(a){const s=a.split("|"),l=e.default.from(s[0]),c=t.LexoDecimal.parse(s[1],o.NUMERAL_SYSTEM);return new o(l,c)}static from(a,s){if(s.getSystem().getBase()!==o.NUMERAL_SYSTEM.getBase())throw new Error("Expected different system");return new o(a,s)}static middleInternal(a,s,l,c){const u=o.mid(l,c);return o.checkMid(a,s,u)}static checkMid(a,s,l){return a.compareTo(l)>=0||l.compareTo(s)>=0?o.mid(a,s):l}static mid(a,s){const c=a.add(s).multiply(t.LexoDecimal.half(a.getSystem())),u=a.getScale()>s.getScale()?a.getScale():s.getScale();if(c.getScale()>u){const d=c.setScale(u,!1);if(d.compareTo(a)>0)return d;const f=c.setScale(u,!0);if(f.compareTo(s)<0)return f}return c}static formatDecimal(a){const s=a.format(),l=new n.default(s);let c=s.indexOf(o.NUMERAL_SYSTEM.getRadixPointChar());const u=o.NUMERAL_SYSTEM.toChar(0);for(c<0&&(c=s.length,l.append(o.NUMERAL_SYSTEM.getRadixPointChar()));c<6;)l.insert(0,u),++c;for(;l[l.length-1]===u;)l.length=l.length-1;return l.toString()}genPrev(){if(this.isMax())return new o(this.bucket,o.INITIAL_MAX_DECIMAL);const a=this.decimal.floor();let l=t.LexoDecimal.from(a).subtract(o.EIGHT_DECIMAL);return l.compareTo(o.MIN_DECIMAL)<=0&&(l=o.between(o.MIN_DECIMAL,this.decimal)),new o(this.bucket,l)}genNext(){if(this.isMin())return new o(this.bucket,o.INITIAL_MIN_DECIMAL);const a=this.decimal.ceil();let l=t.LexoDecimal.from(a).add(o.EIGHT_DECIMAL);return l.compareTo(o.MAX_DECIMAL)>=0&&(l=o.between(this.decimal,o.MAX_DECIMAL)),new o(this.bucket,l)}between(a){if(!this.bucket.equals(a.bucket))throw new Error("Between works only within the same bucket");const s=this.decimal.compareTo(a.decimal);if(s>0)return new o(this.bucket,o.between(a.decimal,this.decimal));if(s===0)throw new Error("Try to rank between issues with same rank this="+this+" other="+a+" this.decimal="+this.decimal+" other.decimal="+a.decimal);return new o(this.bucket,o.between(this.decimal,a.decimal))}getBucket(){return this.bucket}getDecimal(){return this.decimal}inNextBucket(){return o.from(this.bucket.next(),this.decimal)}inPrevBucket(){return o.from(this.bucket.prev(),this.decimal)}isMin(){return this.decimal.equals(o.MIN_DECIMAL)}isMax(){return this.decimal.equals(o.MAX_DECIMAL)}format(){return this.value}equals(a){return this===a?!0:a?this.value===a.value:!1}toString(){return this.value}compareTo(a){return this===a?0:a?this.value.localeCompare(a.value):1}}return Zt.LexoRank=o,Zt}(function(t){var e=Ye&&Ye.__createBinding||(Object.create?function(r,o,i,a){a===void 0&&(a=i);var s=Object.getOwnPropertyDescriptor(o,i);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[i]}}),Object.defineProperty(r,a,s)}:function(r,o,i,a){a===void 0&&(a=i),r[a]=o[i]}),n=Ye&&Ye.__exportStar||function(r,o){for(var i in r)i!=="default"&&!Object.prototype.hasOwnProperty.call(o,i)&&e(o,r,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(ll(),t),n(al(),t),n(hn,t),n(_t,t)})(il);(function(t){var e=Ye&&Ye.__createBinding||(Object.create?function(r,o,i,a){a===void 0&&(a=i);var s=Object.getOwnPropertyDescriptor(o,i);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[i]}}),Object.defineProperty(r,a,s)}:function(r,o,i,a){a===void 0&&(a=i),r[a]=o[i]}),n=Ye&&Ye.__exportStar||function(r,o){for(var i in r)i!=="default"&&!Object.prototype.hasOwnProperty.call(o,i)&&e(o,r,i)};Object.defineProperty(t,"__esModule",{value:!0}),n(il,t),n(vo,t)})(st);var li,ci,di,ui,fi,pi,gi,vi,hi,mi,bi,yi,xi,wi,Si,Ei,Ci,Ii,Di,Ri,Oi,Pi,Ai,Ti,Bi,Mi,ki,Ni,Li,$i,Fi,zi,_i,Gi,Hi,ji,Ui,Wi,Vi,qi,Ki,Yi,Xi,Zi,Ji,Qi,ea,ta,na,ra,oa,ia,aa,sa,la,ca,da,ua,fa,pa,ga,va,ha,ma,ba,ya,xa,wa,Sa,Ea,Ca,Ia,Da,Ra,Oa,Pa,Aa,Ta,Ba,Ma,ka,Na,La,$a,Fa,za,_a,Ga,Ha;function k(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}const bn=[],ut={},cl={top:"bottom",right:"left",bottom:"top",left:"right"};function _d(t,e){return t.reduce((n,r)=>(n[r]=e,n),{})}function _(t){return t===0?0:"".concat(t/16,"rem")}function J(t,e,n){return((e==null?void 0:e.map(n))||[]).map((o,i)=>i===0?o:{["@media screen and (min-width: ".concat(t[i-1],"px)")]:o})}function Gd(t,e){return t===void 0?e||bn:Array.isArray(t)?t:[t]}function Fe(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:bn;if(!Array.isArray(n))throw new Error("the property must be array of numbers");return n.length===0?null:J(t.sanity.media,n,r=>_d(e,_(t.sanity.space[r])))}function Lt(t,e){const{$size:n,$weight:r,theme:o}=e,{fonts:i,media:a}=o.sanity,{family:s,sizes:l,weights:c}=i[t],u=r&&c[r]||c.regular,d=l[2],f={position:"relative",fontFamily:s,fontWeight:u,padding:"1px 0",margin:0,"&:before":{content:'""',display:"block",height:0},"&:after":{content:'""',display:"block",height:0},"& > code, & > span":{display:"block"},"&:not([hidden])":{display:"block"}};if(!n)return Lt.warned||(console.warn("No size specified for responsive font",{fontKey:t,$size:n,props:e,base:f}),Lt.warned=!0),[f];const g=J(a,n,v=>Hd(l[v]||d));return[f,...g]}function Hd(t){const{ascenderHeight:e,descenderHeight:n,fontSize:r,iconSize:o,letterSpacing:i,lineHeight:a}=t,s=e+n,l=a-s,c=(l-o)/2,u=Math.floor(r*1.125/2)*2+1,d=(l-u)/2;return{fontSize:_(r),lineHeight:"calc(".concat(a," / ").concat(r,")"),letterSpacing:_(i),transform:"translateY(".concat(_(n),")"),"&:before":{marginTop:"calc(".concat(_(0-s)," - 1px)")},"&:after":{marginBottom:"-1px"},"& svg:not([data-sanity-icon])":{fontSize:"calc(".concat(u," / 16 * 1rem)"),margin:_(d)},"& [data-sanity-icon]":{fontSize:"calc(".concat(o," / 16 * 1rem)"),margin:_(c)}}}function jd(t){return Lt("code",t)}function Ud(t){return Lt("heading",t)}function Wd(t){return Lt("label",t)}function ho(t){const{theme:e}=t;return J(e.sanity.media,t.$align,n=>({textAlign:n}))}function Vd(t){return Lt("text",t)}function R(t,e){const n=p.useMemo(()=>JSON.stringify(t??e),[e,t]);return p.useMemo(()=>Gd(t,e),[n])}function ja(t,e){const n=[t];for(const r of e)Array.isArray(r)?n.push(...r):n.push(r);return n.filter(Boolean)}function mo(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:bn,n=arguments.length>2?arguments[2]:void 0;const[r,o]=p.useState(null),[i,a]=p.useState(()=>ja(r,e)),s=p.useRef(i);return p.useEffect(()=>{const l=s.current,c=ja(r,e);if(l.length!==c.length){a(c),s.current=c;return}for(const u of l)if(!c.includes(u)){a(c),s.current=c;return}for(const u of c)if(!l.includes(u)){a(c),s.current=c;return}},[r,e]),p.useEffect(()=>{if(!t)return;const l=c=>{const u=c.target;if(u instanceof Node&&!(n&&!n.contains(u))){for(const d of i)if(u===d||d.contains(u))return;t(c)}};return window.addEventListener("mousedown",l),()=>{window.removeEventListener("mousedown",l)}},[n,t,i]),o}var Rt=[],qd=function(){return Rt.some(function(t){return t.activeTargets.length>0})},Kd=function(){return Rt.some(function(t){return t.skippedTargets.length>0})},Ua="ResizeObserver loop completed with undelivered notifications.",Yd=function(){var t;typeof ErrorEvent=="function"?t=new ErrorEvent("error",{message:Ua}):(t=document.createEvent("Event"),t.initEvent("error",!1,!1),t.message=Ua),window.dispatchEvent(t)},ln;(function(t){t.BORDER_BOX="border-box",t.CONTENT_BOX="content-box",t.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"})(ln||(ln={}));var Ot=function(t){return Object.freeze(t)},Xd=function(){function t(e,n){this.inlineSize=e,this.blockSize=n,Ot(this)}return t}(),dl=function(){function t(e,n,r,o){return this.x=e,this.y=n,this.width=r,this.height=o,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Ot(this)}return t.prototype.toJSON=function(){var e=this,n=e.x,r=e.y,o=e.top,i=e.right,a=e.bottom,s=e.left,l=e.width,c=e.height;return{x:n,y:r,top:o,right:i,bottom:a,left:s,width:l,height:c}},t.fromRect=function(e){return new t(e.x,e.y,e.width,e.height)},t}(),bo=function(t){return t instanceof SVGElement&&"getBBox"in t},ul=function(t){if(bo(t)){var e=t.getBBox(),n=e.width,r=e.height;return!n&&!r}var o=t,i=o.offsetWidth,a=o.offsetHeight;return!(i||a||t.getClientRects().length)},Wa=function(t){var e;if(t instanceof Element)return!0;var n=(e=t==null?void 0:t.ownerDocument)===null||e===void 0?void 0:e.defaultView;return!!(n&&t instanceof n.Element)},Zd=function(t){switch(t.tagName){case"INPUT":if(t.type!=="image")break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},on=typeof window<"u"?window:{},Ln=new WeakMap,Va=/auto|scroll/,Jd=/^tb|vertical/,Qd=/msie|trident/i.test(on.navigator&&on.navigator.userAgent),rt=function(t){return parseFloat(t||"0")},Nt=function(t,e,n){return t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=!1),new Xd((n?e:t)||0,(n?t:e)||0)},qa=Ot({devicePixelContentBoxSize:Nt(),borderBoxSize:Nt(),contentBoxSize:Nt(),contentRect:new dl(0,0,0,0)}),fl=function(t,e){if(e===void 0&&(e=!1),Ln.has(t)&&!e)return Ln.get(t);if(ul(t))return Ln.set(t,qa),qa;var n=getComputedStyle(t),r=bo(t)&&t.ownerSVGElement&&t.getBBox(),o=!Qd&&n.boxSizing==="border-box",i=Jd.test(n.writingMode||""),a=!r&&Va.test(n.overflowY||""),s=!r&&Va.test(n.overflowX||""),l=r?0:rt(n.paddingTop),c=r?0:rt(n.paddingRight),u=r?0:rt(n.paddingBottom),d=r?0:rt(n.paddingLeft),f=r?0:rt(n.borderTopWidth),g=r?0:rt(n.borderRightWidth),v=r?0:rt(n.borderBottomWidth),h=r?0:rt(n.borderLeftWidth),y=d+c,b=l+u,S=h+g,x=f+v,w=s?t.offsetHeight-x-t.clientHeight:0,C=a?t.offsetWidth-S-t.clientWidth:0,E=o?y+S:0,T=o?b+x:0,D=r?r.width:rt(n.width)-E-C,I=r?r.height:rt(n.height)-T-w,O=D+y+C+S,P=I+b+w+x,F=Ot({devicePixelContentBoxSize:Nt(Math.round(D*devicePixelRatio),Math.round(I*devicePixelRatio),i),borderBoxSize:Nt(O,P,i),contentBoxSize:Nt(D,I,i),contentRect:new dl(d,l,D,I)});return Ln.set(t,F),F},pl=function(t,e,n){var r=fl(t,n),o=r.borderBoxSize,i=r.contentBoxSize,a=r.devicePixelContentBoxSize;switch(e){case ln.DEVICE_PIXEL_CONTENT_BOX:return a;case ln.BORDER_BOX:return o;default:return i}},eu=function(){function t(e){var n=fl(e);this.target=e,this.contentRect=n.contentRect,this.borderBoxSize=Ot([n.borderBoxSize]),this.contentBoxSize=Ot([n.contentBoxSize]),this.devicePixelContentBoxSize=Ot([n.devicePixelContentBoxSize])}return t}(),gl=function(t){if(ul(t))return 1/0;for(var e=0,n=t.parentNode;n;)e+=1,n=n.parentNode;return e},tu=function(){var t=1/0,e=[];Rt.forEach(function(a){if(a.activeTargets.length!==0){var s=[];a.activeTargets.forEach(function(c){var u=new eu(c.target),d=gl(c.target);s.push(u),c.lastReportedSize=pl(c.target,c.observedBox),d<t&&(t=d)}),e.push(function(){a.callback.call(a.observer,s,a.observer)}),a.activeTargets.splice(0,a.activeTargets.length)}});for(var n=0,r=e;n<r.length;n++){var o=r[n];o()}return t},Ka=function(t){Rt.forEach(function(n){n.activeTargets.splice(0,n.activeTargets.length),n.skippedTargets.splice(0,n.skippedTargets.length),n.observationTargets.forEach(function(o){o.isActive()&&(gl(o.target)>t?n.activeTargets.push(o):n.skippedTargets.push(o))})})},nu=function(){var t=0;for(Ka(t);qd();)t=tu(),Ka(t);return Kd()&&Yd(),t>0},Rr,vl=[],ru=function(){return vl.splice(0).forEach(function(t){return t()})},ou=function(t){if(!Rr){var e=0,n=document.createTextNode(""),r={characterData:!0};new MutationObserver(function(){return ru()}).observe(n,r),Rr=function(){n.textContent="".concat(e?e--:e++)}}vl.push(t),Rr()},iu=function(t){ou(function(){requestAnimationFrame(t)})},Wn=0,au=function(){return!!Wn},su=250,lu={attributes:!0,characterData:!0,childList:!0,subtree:!0},Ya=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],Xa=function(t){return t===void 0&&(t=0),Date.now()+t},Or=!1,cu=function(){function t(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return t.prototype.run=function(e){var n=this;if(e===void 0&&(e=su),!Or){Or=!0;var r=Xa(e);iu(function(){var o=!1;try{o=nu()}finally{if(Or=!1,e=r-Xa(),!au())return;o?n.run(1e3):e>0?n.run(e):n.start()}})}},t.prototype.schedule=function(){this.stop(),this.run()},t.prototype.observe=function(){var e=this,n=function(){return e.observer&&e.observer.observe(document.body,lu)};document.body?n():on.addEventListener("DOMContentLoaded",n)},t.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Ya.forEach(function(n){return on.addEventListener(n,e.listener,!0)}))},t.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),Ya.forEach(function(n){return on.removeEventListener(n,e.listener,!0)}),this.stopped=!0)},t}(),qr=new cu,Za=function(t){!Wn&&t>0&&qr.start(),Wn+=t,!Wn&&qr.stop()},du=function(t){return!bo(t)&&!Zd(t)&&getComputedStyle(t).display==="inline"},uu=function(){function t(e,n){this.target=e,this.observedBox=n||ln.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return t.prototype.isActive=function(){var e=pl(this.target,this.observedBox,!0);return du(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},t}(),fu=function(){function t(e,n){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=n}return t}(),$n=new WeakMap,Ja=function(t,e){for(var n=0;n<t.length;n+=1)if(t[n].target===e)return n;return-1},Fn=function(){function t(){}return t.connect=function(e,n){var r=new fu(e,n);$n.set(e,r)},t.observe=function(e,n,r){var o=$n.get(e),i=o.observationTargets.length===0;Ja(o.observationTargets,n)<0&&(i&&Rt.push(o),o.observationTargets.push(new uu(n,r&&r.box)),Za(1),qr.schedule())},t.unobserve=function(e,n){var r=$n.get(e),o=Ja(r.observationTargets,n),i=r.observationTargets.length===1;o>=0&&(i&&Rt.splice(Rt.indexOf(r),1),r.observationTargets.splice(o,1),Za(-1))},t.disconnect=function(e){var n=this,r=$n.get(e);r.observationTargets.slice().forEach(function(o){return n.unobserve(e,o.target)}),r.activeTargets.splice(0,r.activeTargets.length)},t}(),pu=function(){function t(e){if(arguments.length===0)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if(typeof e!="function")throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");Fn.connect(this,e)}return t.prototype.observe=function(e,n){if(arguments.length===0)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Wa(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");Fn.observe(this,e,n)},t.prototype.unobserve=function(e){if(arguments.length===0)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Wa(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");Fn.unobserve(this,e)},t.prototype.disconnect=function(){Fn.disconnect(this)},t.toString=function(){return"function ResizeObserver () { [polyfill code] }"},t}();const hl=typeof document<"u"&&window.ResizeObserver?window.ResizeObserver:pu,gu=hu();function vu(){return{subscribe(t,e){const n=new hl(r=>{let[o]=r;e({_contentRect:o.contentRect,border:{width:o.borderBoxSize[0].inlineSize,height:o.borderBoxSize[0].blockSize},content:{width:o.contentRect.width,height:o.contentRect.height}})});return n.observe(t),()=>{n.unobserve(t),n.disconnect()}}}}function hu(){const t=new WeakMap,e=new WeakMap;return{subscribe(n,r){const o=e.get(n)||[];let i=t.get(n);return e.has(n)||(e.set(n,o),i=vu().subscribe(n,s=>{for(const l of o)l(s)})),o.push(r),()=>{const a=o.indexOf(r);a>-1&&o.splice(a,1),o.length===0&&i&&i()}}}}function ml(t){const[e,n]=p.useState(null);return p.useEffect(()=>{if(t)return gu.subscribe(t,n)},[t]),e}function bl(t){return p.useEffect(()=>(addEventListener("keydown",t),()=>removeEventListener("keydown",t)),[t])}function Pr(t,e){return t*e}function mu(t,e){return{r:Math.round(Ar(Pr(t.r/255,e.r/255)*255)),g:Math.round(Ar(Pr(t.g/255,e.g/255)*255)),b:Math.round(Ar(Pr(t.b/255,e.b/255)*255))}}function Ar(t){return Math.max(Math.min(t,255),0)}function Tr(t,e){return t+e-t*e}function bu(t,e){return{r:Math.round(Br(Tr(t.r/255,e.r/255)*255)),g:Math.round(Br(Tr(t.g/255,e.g/255)*255)),b:Math.round(Br(Tr(t.b/255,e.b/255)*255))}}function Br(t){return Math.max(Math.min(t,255),0)}function yu(t){if(t.length===4){const e=t.slice(1,2),n=t.slice(2,3),r=t.slice(3,4);return{r:parseInt(e+e,16),g:parseInt(n+n,16),b:parseInt(r+r,16)}}return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16)}}function yl(t){let{r:e,g:n,b:r}=t;return"#"+((1<<24)+(e<<16)+(n<<8)+r).toString(16).slice(1)}function xu(t){const e=t.s/100,n=t.l/100,r=(1-Math.abs(2*n-1))*e,o=r*(1-Math.abs(t.h/60%2-1)),i=n-r/2;let a=0,s=0,l=0;return 0<=t.h&&t.h<60?(a=r,s=o,l=0):60<=t.h&&t.h<120?(a=o,s=r,l=0):120<=t.h&&t.h<180?(a=0,s=r,l=o):180<=t.h&&t.h<240?(a=0,s=o,l=r):240<=t.h&&t.h<300?(a=o,s=0,l=r):300<=t.h&&t.h<360&&(a=r,s=0,l=o),{r:Math.round((a+i)*255),g:Math.round((s+i)*255),b:Math.round((l+i)*255)}}const wu="0123456789ABCDEFabcdef",Su=/hsl\(\s*(\d+)\s*,\s*((\d+(?:\.\d+)?)%)\s*,\s*((\d+(?:\.\d+)?)%)\s*\)/i;function Eu(t){for(const e of t)if(wu.indexOf(e)===-1)return!1;return!0}function Cu(t){return t[0]!=="#"||!(t.length===4||t.length===7)?!1:Eu(t.slice(1))}function Iu(t){const e=Su.exec(t);if(!e)throw new Error('parseHsl: string is not a HSL color: "'.concat(t,'"'));return{h:parseInt(e[1]),s:parseFloat(e[3]),l:parseFloat(e[5])}}function cn(t){if(!t)return{r:0,g:0,b:0};if(typeof t!="string")throw new Error("parseColor: expected a string");if(Cu(t))return yu(t);if(t.startsWith("hsl("))return xu(Iu(t));throw new Error('parseColor: unexpected color format: "'.concat(t,'"'))}function ae(t,e){const n=cn(t);return"rgba(".concat(n.r,",").concat(n.g,",").concat(n.b,",").concat(e,")")}function Mr(t,e,n,r,o,i){return{default:t.button({base:e,dark:n,solid:r.default,muted:o.default,mode:i}),primary:t.button({base:e,dark:n,solid:r.primary,muted:o.primary,mode:i}),positive:t.button({base:e,dark:n,solid:r.positive,muted:o.positive,mode:i}),caution:t.button({base:e,dark:n,solid:r.caution,muted:o.caution,mode:i}),critical:t.button({base:e,dark:n,solid:r.critical,muted:o.critical,mode:i})}}function Du(t,e,n,r,o){return{default:Mr(t,e,n,r,o,"default"),ghost:Mr(t,e,n,r,o,"ghost"),bleed:Mr(t,e,n,r,o,"bleed")}}function Ru(t,e,n,r,o,i){return{enabled:t.card({base:e,dark:n,name:r,state:"enabled",solid:o,muted:i}),disabled:t.card({base:e,dark:n,name:r,state:"disabled",solid:o,muted:i}),hovered:t.card({base:e,dark:n,name:r,state:"hovered",solid:o,muted:i}),pressed:t.card({base:e,dark:n,name:r,state:"pressed",solid:o,muted:i}),selected:t.card({base:e,dark:n,name:r,state:"selected",solid:o,muted:i})}}const B="hsl(0, 0%, 0%)",At="hsl(0, 0%, 100%)",Z={default:{lightest:"hsl(0, 0%, 95%)",lighter:"hsl(0, 0%, 70%)",light:"hsl(0, 0%, 65%)",base:"hsl(0, 0%, 50%)",dark:"hsl(0, 0%, 35%)",darker:"hsl(0, 0%, 20%)",darkest:"hsl(0, 0%, 5%)"},transparent:{lightest:"hsl(240, 100%, 95%)",lighter:"hsl(240, 100%, 70%)",light:"hsl(240, 100%, 65%)",base:"hsl(240, 100%, 50%)",dark:"hsl(240, 100%, 35%)",darker:"hsl(240, 100%, 20%)",darkest:"hsl(240, 100%, 5%)"},primary:{lightest:"hsl(240, 100%, 95%)",lighter:"hsl(240, 100%, 70%)",light:"hsl(240, 100%, 65%)",base:"hsl(240, 100%, 50%)",dark:"hsl(240, 100%, 35%)",darker:"hsl(240, 100%, 20%)",darkest:"hsl(240, 100%, 5%)"},positive:{lightest:"hsl(120, 100%, 95%)",lighter:"hsl(120, 100%, 70%)",light:"hsl(120, 100%, 65%)",base:"hsl(120, 100%, 50%)",dark:"hsl(120, 100%, 35%)",darker:"hsl(120, 100%, 20%)",darkest:"hsl(120, 100%, 5%)"},caution:{lightest:"hsl(60, 100%, 95%)",lighter:"hsl(60, 100%, 70%)",light:"hsl(60, 100%, 65%)",base:"hsl(60, 100%, 50%)",dark:"hsl(60, 100%, 35%)",darker:"hsl(60, 100%, 20%)",darkest:"hsl(60, 100%, 5%)"},critical:{lightest:"hsl(0, 100%, 95%)",lighter:"hsl(0, 100%, 70%)",light:"hsl(0, 100%, 65%)",base:"hsl(0, 100%, 50%)",dark:"hsl(0, 100%, 35%)",darker:"hsl(0, 100%, 20%)",darkest:"hsl(0, 100%, 5%)"}},Ou={gray:"hsl(0, 0%, 50%)",red:"hsl(0, 100%, 50%)",orange:"hsl(30, 100%, 50%)",yellow:"hsl(60, 100%, 50%)",green:"hsl(120, 100%, 50%)",cyan:"hsl(180, 100%, 50%)",blue:"hsl(240, 100%, 50%)",purple:"hsl(270, 100%, 50%)",magenta:"hsl(300, 100%, 50%)"},zn={transparent:{bg:[Z.transparent.darkest,Z.transparent.lightest],fg:[Z.transparent.lightest,Z.transparent.darkest],border:[Z.transparent.darker,Z.transparent.lighter],focusRing:[Z.transparent.base,Z.transparent.base]},primary:{bg:[Z.primary.darkest,Z.primary.lightest],fg:[Z.primary.lightest,Z.primary.darkest],border:[Z.primary.darker,Z.primary.lighter],focusRing:[Z.primary.base,Z.primary.base]},positive:{bg:[Z.positive.darkest,Z.positive.lightest],fg:[Z.positive.lightest,Z.positive.darkest],border:[Z.positive.darker,Z.positive.lighter],focusRing:[Z.positive.base,Z.positive.base]},caution:{bg:[Z.caution.darkest,Z.caution.lightest],fg:[Z.caution.lightest,Z.caution.darkest],border:[Z.caution.darker,Z.caution.lighter],focusRing:[Z.caution.base,Z.caution.base]},critical:{bg:[Z.critical.darkest,Z.critical.lightest],fg:[Z.critical.lightest,Z.critical.darkest],border:[Z.critical.darker,Z.critical.lighter],focusRing:[Z.critical.base,Z.critical.base]}},Pu={base:t=>{let{dark:e,name:n}=t;return n==="default"?{bg:e?B:At,fg:e?At:B,border:e?Z.default.darkest:Z.default.lightest,focusRing:Z.primary.base,shadow:{outline:B,umbra:B,penumbra:B,ambient:B},skeleton:{from:e?At:B,to:e?At:B}}:{bg:zn[n].bg[e?0:1],fg:zn[n].fg[e?0:1],border:zn[n].border[e?0:1],focusRing:zn[n].focusRing[e?0:1],shadow:{outline:B,umbra:B,penumbra:B,ambient:B},skeleton:{from:e?At:B,to:e?At:B}}},solid:t=>{let{base:e,dark:n,state:r,tone:o}=t;const i=Z[o];return r==="hovered"?{bg:n?i.light:i.dark,bg2:n?i.light:i.dark,border:n?i.lighter:i.darker,fg:n?i.darkest:i.lightest,muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}:{bg:i.base,bg2:i.base,border:n?i.light:i.dark,fg:n?i.darkest:i.lightest,muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}},muted:t=>{let{base:e,dark:n,state:r,tone:o}=t;const i=Z[o];return r==="hovered"?{bg:n?i.darker:i.lighter,bg2:n?i.darker:i.lighter,border:n?i.lighter:i.darker,fg:n?i.lightest:i.darkest,muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}:{bg:n?i.darkest:i.lightest,bg2:n?i.darkest:i.lightest,border:n?i.darker:i.lighter,fg:n?i.lighter:i.darker,muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}},button:t=>{let{base:e,mode:n,muted:r,solid:o}=t;return n==="bleed"?{...r,enabled:{bg:"transparent",bg2:"transparent",fg:r.enabled.fg,border:"transparent",muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton},hovered:{bg:r.enabled.bg,bg2:r.enabled.bg,fg:r.hovered.fg,border:"transparent",muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}}:n==="ghost"?{...o,enabled:r.enabled}:o},card:t=>{let{base:e}=t;return{bg:B,bg2:B,fg:B,border:B,muted:{fg:B},accent:{fg:B},link:{fg:B},code:{bg:B,fg:B},skeleton:e.skeleton}},input:()=>({bg:B,fg:B,border:B,placeholder:B}),selectable:t=>{let{muted:e,state:n,tone:r}=t;return e[r][n]},spot:t=>{let{key:e}=t;return Ou[e]},syntax:()=>({atrule:B,attrName:B,attrValue:B,attribute:B,boolean:B,builtin:B,cdata:B,char:B,class:B,className:B,comment:B,constant:B,deleted:B,doctype:B,entity:B,function:B,hexcode:B,id:B,important:B,inserted:B,keyword:B,number:B,operator:B,prolog:B,property:B,pseudoClass:B,pseudoElement:B,punctuation:B,regex:B,selector:B,string:B,symbol:B,tag:B,unit:B,url:B,variable:B})};function Au(t,e,n,r,o){return{default:{enabled:t.input({base:e,dark:n,mode:"default",state:"enabled",solid:r.default,muted:o.default}),disabled:t.input({base:e,dark:n,mode:"default",state:"disabled",solid:r.default,muted:o.default}),hovered:t.input({base:e,dark:n,mode:"default",state:"hovered",solid:r.default,muted:o.default}),readOnly:t.input({base:e,dark:n,mode:"default",state:"readOnly",solid:r.default,muted:o.default})},invalid:{enabled:t.input({base:e,dark:n,mode:"invalid",state:"enabled",solid:r.default,muted:o.default}),disabled:t.input({base:e,dark:n,mode:"invalid",state:"disabled",solid:r.default,muted:o.default}),hovered:t.input({base:e,dark:n,mode:"invalid",state:"hovered",solid:r.default,muted:o.default}),readOnly:t.input({base:e,dark:n,mode:"invalid",state:"readOnly",solid:r.default,muted:o.default})}}}function Tu(t,e,n,r){return{default:{enabled:t.muted({base:e,dark:n,tone:"default",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"default",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"default",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"default",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"default",name:r,state:"selected"})},transparent:{enabled:t.muted({base:e,dark:n,tone:"transparent",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"transparent",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"transparent",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"transparent",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"transparent",name:r,state:"selected"})},primary:{enabled:t.muted({base:e,dark:n,tone:"primary",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"primary",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"primary",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"primary",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"primary",name:r,state:"selected"})},positive:{enabled:t.muted({base:e,dark:n,tone:"positive",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"positive",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"positive",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"positive",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"positive",name:r,state:"selected"})},caution:{enabled:t.muted({base:e,dark:n,tone:"caution",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"caution",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"caution",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"caution",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"caution",name:r,state:"selected"})},critical:{enabled:t.muted({base:e,dark:n,tone:"critical",name:r,state:"enabled"}),disabled:t.muted({base:e,dark:n,tone:"critical",name:r,state:"disabled"}),hovered:t.muted({base:e,dark:n,tone:"critical",name:r,state:"hovered"}),pressed:t.muted({base:e,dark:n,tone:"critical",name:r,state:"pressed"}),selected:t.muted({base:e,dark:n,tone:"critical",name:r,state:"selected"})}}}function Bu(t,e,n,r,o){return{default:Qt(t,e,n,r,o,"default"),primary:Qt(t,e,n,r,o,"primary"),positive:Qt(t,e,n,r,o,"positive"),caution:Qt(t,e,n,r,o,"caution"),critical:Qt(t,e,n,r,o,"critical")}}function Qt(t,e,n,r,o,i){return{enabled:t.selectable({base:e,dark:n,solid:r,muted:o,state:"enabled",tone:i}),hovered:t.selectable({base:e,dark:n,solid:r,muted:o,state:"hovered",tone:i}),pressed:t.selectable({base:e,dark:n,solid:r,muted:o,state:"pressed",tone:i}),selected:t.selectable({base:e,dark:n,solid:r,muted:o,state:"selected",tone:i}),disabled:t.selectable({base:e,dark:n,solid:r,muted:o,state:"disabled",tone:i})}}function Mu(t,e,n,r){return{default:{enabled:t.solid({base:e,dark:n,tone:"default",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"default",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"default",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"default",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"default",name:r,state:"selected"})},transparent:{enabled:t.solid({base:e,dark:n,tone:"transparent",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"transparent",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"transparent",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"transparent",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"transparent",name:r,state:"selected"})},primary:{enabled:t.solid({base:e,dark:n,tone:"primary",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"primary",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"primary",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"primary",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"primary",name:r,state:"selected"})},positive:{enabled:t.solid({base:e,dark:n,tone:"positive",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"positive",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"positive",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"positive",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"positive",name:r,state:"selected"})},caution:{enabled:t.solid({base:e,dark:n,tone:"caution",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"caution",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"caution",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"caution",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"caution",name:r,state:"selected"})},critical:{enabled:t.solid({base:e,dark:n,tone:"critical",name:r,state:"enabled"}),disabled:t.solid({base:e,dark:n,tone:"critical",name:r,state:"disabled"}),hovered:t.solid({base:e,dark:n,tone:"critical",name:r,state:"hovered"}),pressed:t.solid({base:e,dark:n,tone:"critical",name:r,state:"pressed"}),selected:t.solid({base:e,dark:n,tone:"critical",name:r,state:"selected"})}}}function ku(t,e,n){return{gray:t.spot({base:e,dark:n,key:"gray"}),blue:t.spot({base:e,dark:n,key:"blue"}),purple:t.spot({base:e,dark:n,key:"purple"}),magenta:t.spot({base:e,dark:n,key:"magenta"}),red:t.spot({base:e,dark:n,key:"red"}),orange:t.spot({base:e,dark:n,key:"orange"}),yellow:t.spot({base:e,dark:n,key:"yellow"}),green:t.spot({base:e,dark:n,key:"green"}),cyan:t.spot({base:e,dark:n,key:"cyan"})}}function Nu(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const e={...Pu,...t};return{light:Qa(e,!1),dark:Qa(e,!0)}}function Qa(t,e){return{default:Tt(t,e,"default"),transparent:Tt(t,e,"transparent"),primary:Tt(t,e,"primary"),positive:Tt(t,e,"positive"),caution:Tt(t,e,"caution"),critical:Tt(t,e,"critical")}}function Tt(t,e,n){const r=t.base({dark:e,name:n}),o=Mu(t,r,e,n),i=Tu(t,r,e,n);return{base:r,button:Du(t,r,e,o,i),card:Ru(t,r,e,n,o,i),dark:e,input:Au(t,r,e,o,i),selectable:Bu(t,r,e,o,i),spot:ku(t,r,e),syntax:t.syntax({base:r,dark:e}),solid:o,muted:i}}function St(t,e){const n=cn(t),r=cn(e);return yl(mu(n,r))}function Et(t,e){const n=cn(t),r=cn(e);return yl(bu(n,r))}const Ne={default:$.gray,transparent:$.gray,primary:$.blue,positive:$.green,caution:$.yellow,critical:$.red},en=["default","transparent"];Nu({base:t=>{let{dark:e,name:n}=t;if(n==="default"){const i=$.gray,a=e?i[900].hex:i[100].hex;return{fg:e?xt.hex:wt.hex,bg:e?wt.hex:xt.hex,border:i[e?800:200].hex,focusRing:$.blue[500].hex,shadow:{outline:ae(i[500].hex,.4),umbra:e?ae(i[950].hex,.4):ae(i[500].hex,.2),penumbra:e?ae(i[950].hex,.28):ae(i[500].hex,.14),ambient:e?ae(i[950].hex,.24):ae(i[500].hex,.12)},skeleton:{from:a,to:ae(a,.5)}}}if(n==="transparent"){const i=Ne.default,a=i[e?800:200].hex;return{fg:i[e?100:900].hex,bg:i[e?950:50].hex,border:i[e?800:300].hex,focusRing:$.blue[500].hex,shadow:{outline:ae(i[500].hex,.4),umbra:e?ae(i[900].hex,.4):ae(i[500].hex,.2),penumbra:e?ae(i[900].hex,.28):ae(i[500].hex,.14),ambient:e?ae(i[900].hex,.24):ae(i[500].hex,.12)},skeleton:{from:a,to:ae(a,.5)}}}const r=Ne[n]||Ne.default,o=r[e?800:200].hex;return{fg:r[e?100:900].hex,bg:r[e?950:50].hex,border:r[e?800:200].hex,focusRing:r[500].hex,shadow:{outline:ae(r[500].hex,.4),umbra:e?ae(r[900].hex,.4):ae(r[500].hex,.2),penumbra:e?ae(r[900].hex,.28):ae(r[500].hex,.14),ambient:e?ae(r[900].hex,.24):ae(r[500].hex,.12)},skeleton:{from:o,to:ae(o,.5)}}},solid:t=>{let{base:e,dark:n,name:r,state:o,tone:i}=t;const a=n?Et:St,s=n?St:Et,l=Ne[r]||Ne.default,c=en.includes(r)&&en.includes(i);let u=Ne[i==="default"?r:i]||l;if(o==="disabled"){u=l;const g=a(e.bg,u[n?800:200].hex),v=s(g,u[n?200:800].hex);return{bg:g,bg2:s(g,u[n?50:950].hex),border:a(e.bg,u[n?800:200].hex),fg:a(e.bg,n?wt.hex:xt.hex),muted:{fg:a(e.bg,u[n?950:50].hex)},accent:{fg:a(e.bg,u[n?950:50].hex)},link:{fg:a(e.bg,u[n?950:50].hex)},code:{bg:g,fg:a(e.bg,u[n?950:50].hex)},skeleton:{from:v,to:ae(v,.5)}}}if(o==="hovered"){const g=a(e.bg,u[n?300:600].hex),v=s(g,u[n?200:800].hex);return{bg:g,bg2:s(g,u[n?50:950].hex),border:a(e.bg,u[n?300:600].hex),fg:a(e.bg,n?wt.hex:xt.hex),muted:{fg:a(e.bg,u[n?800:200].hex)},accent:{fg:s(g,$.red[n?800:200].hex)},link:{fg:s(g,$.blue[n?800:200].hex)},code:{bg:a(g,u[n?950:50].hex),fg:a(e.bg,u[n?800:200].hex)},skeleton:{from:v,to:ae(v,.5)}}}if(o==="pressed"){const g=a(e.bg,u[n?200:800].hex),v=s(g,u[n?200:800].hex);return{bg:a(e.bg,u[n?200:800].hex),bg2:s(g,u[n?50:950].hex),border:a(e.bg,u[n?200:800].hex),fg:a(e.bg,n?wt.hex:xt.hex),muted:{fg:a(e.bg,u[n?800:200].hex)},accent:{fg:s(g,$.red[n?800:200].hex)},link:{fg:s(g,$.blue[n?800:200].hex)},code:{bg:a(g,u[n?950:50].hex),fg:a(e.bg,u[n?800:200].hex)},skeleton:{from:v,to:ae(v,.5)}}}if(o==="selected"){c&&(u=Ne.primary);const g=a(e.bg,u[n?200:800].hex),v=s(g,u[n?200:800].hex);return{bg:g,bg2:s(g,u[n?50:950].hex),border:a(e.bg,u[n?200:800].hex),fg:a(e.bg,n?wt.hex:xt.hex),muted:{fg:a(e.bg,u[n?800:200].hex)},accent:{fg:s(g,$.red[n?800:200].hex)},link:{fg:s(g,$.blue[n?800:200].hex)},code:{bg:a(g,u[n?950:50].hex),fg:a(e.bg,u[n?800:200].hex)},skeleton:{from:v,to:ae(v,.5)}}}const d=a(e.bg,u[n?400:500].hex),f=s(d,u[n?200:800].hex);return{bg:d,bg2:s(d,u[n?50:950].hex),border:a(e.bg,u[n?400:500].hex),fg:a(e.bg,n?wt.hex:xt.hex),muted:{fg:a(e.bg,u[n?900:100].hex)},accent:{fg:s(d,$.red[n?900:100].hex)},link:{fg:s(d,$.blue[n?900:100].hex)},code:{bg:a(d,u[n?950:50].hex),fg:a(e.bg,u[n?900:100].hex)},skeleton:{from:f,to:ae(f,.5)}}},muted:t=>{let{base:e,dark:n,name:r,state:o,tone:i}=t;const a=n?Et:St,s=Ne[r]||Ne.default,l=en.includes(r)&&en.includes(i);let c=Ne[i==="default"?r:i]||s;if(o==="disabled"){c=s;const f=e.bg,g=a(f,c[n?900:100].hex);return{bg:f,bg2:a(f,c[n?950:50].hex),border:a(f,c[n?950:50].hex),fg:a(f,c[n?800:200].hex),muted:{fg:a(f,c[n?900:100].hex)},accent:{fg:a(f,c[n?900:100].hex)},link:{fg:a(f,c[n?900:100].hex)},code:{bg:f,fg:a(f,c[n?900:100].hex)},skeleton:{from:ae(g,.5),to:ae(g,.25)}}}if(o==="hovered"){const f=a(e.bg,c[n?950:50].hex),g=a(f,c[n?900:100].hex);return{bg:f,bg2:a(f,c[n?950:50].hex),border:a(f,c[n?900:100].hex),fg:a(e.bg,c[n?200:800].hex),muted:{fg:a(e.bg,c[n?400:600].hex)},accent:{fg:a(e.bg,$.red[n?400:500].hex)},link:{fg:a(e.bg,$.blue[n?400:600].hex)},code:{bg:a(f,c[n?950:50].hex),fg:a(e.bg,c[n?400:600].hex)},skeleton:{from:g,to:ae(g,.5)}}}if(o==="pressed"){l&&(c=Ne.primary);const f=a(e.bg,c[n?900:100].hex),g=a(f,c[n?900:100].hex);return{bg:f,bg2:a(f,c[n?950:50].hex),border:a(f,c[n?900:100].hex),fg:a(e.bg,c[n?200:800].hex),muted:{fg:a(e.bg,c[n?400:600].hex)},accent:{fg:a(f,$.red[n?400:500].hex)},link:{fg:a(f,$.blue[n?400:600].hex)},code:{bg:a(f,c[n?950:50].hex),fg:a(e.bg,c[n?400:600].hex)},skeleton:{from:g,to:ae(g,.5)}}}if(o==="selected"){l&&(c=Ne.primary);const f=a(e.bg,c[n?900:100].hex),g=a(f,c[n?900:100].hex);return{bg:f,bg2:a(f,c[n?950:50].hex),border:a(f,c[n?900:100].hex),fg:a(e.bg,c[n?200:800].hex),muted:{fg:a(e.bg,c[n?400:600].hex)},accent:{fg:a(f,$.red[n?400:500].hex)},link:{fg:a(f,$.blue[n?400:600].hex)},code:{bg:a(f,c[n?950:50].hex),fg:a(e.bg,c[n?400:600].hex)},skeleton:{from:g,to:ae(g,.5)}}}const u=e.bg,d=a(u,c[n?900:100].hex);return{bg:u,bg2:a(u,c[n?950:50].hex),border:a(u,c[n?900:100].hex),fg:a(e.bg,c[n?300:700].hex),muted:{fg:a(e.bg,c[n?400:600].hex)},accent:{fg:a(e.bg,$.red[n?400:500].hex)},link:{fg:a(e.bg,$.blue[n?400:600].hex)},code:{bg:a(e.bg,c[n?950:50].hex),fg:a(e.bg,c[n?400:600].hex)},skeleton:{from:d,to:ae(d,.5)}}},button:t=>{let{base:e,mode:n,muted:r,solid:o}=t;return n==="bleed"?{enabled:{...r.enabled,border:r.enabled.bg},hovered:{...r.hovered,border:r.hovered.bg},pressed:{...r.pressed,border:r.pressed.bg},selected:{...r.selected,border:r.selected.bg},disabled:{...r.disabled,border:r.disabled.bg}}:n==="ghost"?{...o,enabled:{...r.enabled,border:e.border},disabled:r.disabled}:o},card:t=>{let{base:e,dark:n,muted:r,name:o,solid:i,state:a}=t;if(a==="hovered")return r[o].hovered;if(a==="disabled")return r[o].disabled;const s=en.includes(o),l=Ne[o]||Ne.default,c=n?Et:St;if(a==="pressed")return s?r.primary.pressed:r[o].pressed;if(a==="selected")return s?i.primary.enabled:i[o].enabled;const u=e.bg,d=c(e.bg,l[n?900:100].hex);return{bg:u,bg2:c(u,l[n?950:50].hex),fg:e.fg,border:e.border,muted:{fg:c(e.bg,l[n?400:600].hex)},accent:{fg:c(e.bg,$.red[n?400:500].hex)},link:{fg:c(e.bg,$.blue[n?400:600].hex)},code:{bg:c(e.bg,l[n?950:50].hex),fg:l[n?400:600].hex},skeleton:{from:d,to:ae(d,.5)}}},input:t=>{let{base:e,dark:n,mode:r,state:o}=t;const i=n?Et:St;if(r==="invalid"){const a=Ne.critical;return{bg:i(e.bg,a[n?950:50].hex),fg:i(e.bg,a[n?400:600].hex),border:i(e.bg,a[n?800:200].hex),placeholder:i(e.bg,a[n?600:400].hex)}}return o==="hovered"?{bg:e.bg,fg:e.fg,border:i(e.bg,$.gray[n?700:300].hex),placeholder:i(e.bg,$.gray[n?600:400].hex)}:o==="disabled"?{bg:i(e.bg,$.gray[n?950:50].hex),fg:i(e.bg,$.gray[n?700:300].hex),border:i(e.bg,$.gray[n?900:100].hex),placeholder:i(e.bg,$.gray[n?800:200].hex)}:o==="readOnly"?{bg:i(e.bg,$.gray[n?950:50].hex),fg:i(e.bg,$.gray[n?200:800].hex),border:i(e.bg,$.gray[n?800:200].hex),placeholder:i(e.bg,$.gray[n?600:400].hex)}:{bg:e.bg,fg:e.fg,border:e.border,placeholder:i(e.bg,$.gray[n?600:400].hex)}},selectable:t=>{let{base:e,muted:n,tone:r,solid:o,state:i}=t;return i==="enabled"?{...n[r].enabled,bg:e.bg}:i==="pressed"?r==="default"?n.primary.pressed:n[r].pressed:i==="selected"?r==="default"?o.primary.enabled:o[r].enabled:i==="disabled"?{...n[r].disabled,bg:e.bg}:n[r][i]},spot:t=>{let{base:e,dark:n,key:r}=t;return(n?Et:St)(e.bg,$[r][n?400:500].hex)},syntax:t=>{let{base:e,dark:n}=t;const r=n?Et:St,o=n?400:600,i=n?600:400;return{atrule:r(e.bg,$.purple[o].hex),attrName:r(e.bg,$.green[o].hex),attrValue:r(e.bg,$.yellow[o].hex),attribute:r(e.bg,$.yellow[o].hex),boolean:r(e.bg,$.purple[o].hex),builtin:r(e.bg,$.purple[o].hex),cdata:r(e.bg,$.yellow[o].hex),char:r(e.bg,$.yellow[o].hex),class:r(e.bg,$.orange[o].hex),className:r(e.bg,$.cyan[o].hex),comment:r(e.bg,$.gray[i].hex),constant:r(e.bg,$.purple[o].hex),deleted:r(e.bg,$.red[o].hex),doctype:r(e.bg,$.gray[i].hex),entity:r(e.bg,$.red[o].hex),function:r(e.bg,$.green[o].hex),hexcode:r(e.bg,$.blue[o].hex),id:r(e.bg,$.purple[o].hex),important:r(e.bg,$.purple[o].hex),inserted:r(e.bg,$.yellow[o].hex),keyword:r(e.bg,$.magenta[o].hex),number:r(e.bg,$.purple[o].hex),operator:r(e.bg,$.magenta[o].hex),prolog:r(e.bg,$.gray[i].hex),property:r(e.bg,$.blue[o].hex),pseudoClass:r(e.bg,$.yellow[o].hex),pseudoElement:r(e.bg,$.yellow[o].hex),punctuation:r(e.bg,$.gray[o].hex),regex:r(e.bg,$.blue[o].hex),selector:r(e.bg,$.red[o].hex),string:r(e.bg,$.yellow[o].hex),symbol:r(e.bg,$.purple[o].hex),tag:r(e.bg,$.red[o].hex),unit:r(e.bg,$.orange[o].hex),url:r(e.bg,$.red[o].hex),variable:r(e.bg,$.red[o].hex)}}});const Lu={dialog:{zOffset:600},popover:{zOffset:400},tooltip:{zOffset:200}};function $u(){if(typeof globalThis<"u")return globalThis;if(typeof window<"u")return window;if(typeof self<"u")return self;if(typeof global<"u")return global;throw new Error("@sanity/ui: could not locate global scope")}const ce=$u(),Kr=Symbol.for("@sanity/ui/context/theme");ce[Kr]=ce[Kr]||p.createContext(null);const Yr=ce[Kr];function Fu(t){const e=p.useContext(Yr),{children:n,scheme:r=(e==null?void 0:e.scheme)||"light",theme:o=(e==null?void 0:e.theme)||null,tone:i=(e==null?void 0:e.tone)||"default"}=t,a=p.useMemo(()=>{if(!o)return null;const{color:l,layer:c,...u}=o,d=l[r]||l.light,f=d[i]||d.default;return{sanity:{...u,color:f,layer:c||Lu}}},[r,o,i]),s=p.useMemo(()=>o&&{version:0,theme:o,scheme:r,tone:i},[o,r,i]);return a?m(Yr.Provider,{value:s,children:m(vd,{theme:a,children:n})}):m("pre",{children:'ThemeProvider: no "theme" property provided'})}function Gt(t){return Boolean(t&&typeof t=="object")}function sr(){const t=p.useContext(Yr);if(!t)throw new Error("useRootTheme(): missing context value");if(!Gt(t)||t.version!==0)throw new Error("useRootTheme(): the context value is not compatible");return t}function zu(t){const{children:e,scheme:n,tone:r}=t,o=sr();return m(Fu,{scheme:n||o.scheme,theme:o.theme,tone:r,children:e})}function mt(){return pd()}const es=new WeakMap;function _u(t,e){return e===0?"screen and (max-width: ".concat(t[e]-1,"px)"):e===t.length?"screen and (min-width: ".concat(t[e-1],"px)"):"screen and (min-width: ".concat(t[e-1],"px) and (max-width: ").concat(t[e]-1,"px)")}function Gu(t){const e=t.length;let n;const r=()=>{if(!n){n=[];for(let a=e;a>-1;a-=1){const s=_u(t,a);n.push({index:a,mq:window.matchMedia(s)})}}return n};return{getSnapshot:()=>{for(const{index:a,mq:s}of r())if(s.matches)return a;return 0},subscribe:a=>{const s=[];for(const{mq:l}of r()){const c=()=>{l.matches&&a()};l.addEventListener("change",c),s.push(()=>l.removeEventListener("change",c))}return()=>{for(const l of s)l()}}}}function Hu(){return 0}function ju(){const t=mt(),{media:e}=t.sanity;let n=es.get(e);return n||(n=Gu(e),es.set(e,n)),p.useSyncExternalStore(n.subscribe,n.getSnapshot,Hu)}const Uu=typeof window<"u"?p.useLayoutEffect:p.useEffect;function Me(t){const e=p.useRef(null);return Uu(()=>{t&&(typeof t=="function"?t(e.current):t.current=e.current)}),e}function yn(t,e){p.useEffect(()=>{t.current&&t.current.setCustomValidity(e||"")},[e,t])}const xn="1px solid var(--card-border-color)";function Wu(){return[Vu,qu,Ku,Yu,Xu]}function Vu(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$border,r=>r?{"&&":{border:xn}}:{"&&":{border:0}})}function qu(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$borderTop,r=>r?{"&&":{borderTop:xn}}:{"&&":{borderTop:0}})}function Ku(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$borderRight,r=>r?{"&&":{borderRight:xn}}:{"&&":{borderRight:0}})}function Yu(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$borderBottom,r=>r?{"&&":{borderBottom:xn}}:{"&&":{borderBottom:0}})}function Xu(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$borderLeft,r=>r?{"&&":{borderLeft:xn}}:{"&&":{borderLeft:0}})}const Zu={'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"}},Ju={content:"content-box",border:"border-box"},Qu={stretch:"stretch",fill:"100%"};function ef(){return Zu}function tf(){return[rf,of,af,nf]}function nf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$display,r=>({"&:not([hidden])":{display:r}}))}function rf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$sizing,r=>({boxSizing:Ju[r]}))}function of(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$height,r=>({height:Qu[r]}))}function af(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$overflow,r=>({overflow:r}))}const sf={"&&:not([hidden])":{display:"flex"}};function lf(){return[sf,cf,df,uf,ff,pf]}function cf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$align,r=>({alignItems:r}))}function df(t){const{theme:e}=t,{media:n,space:r}=e.sanity;return J(n,t.$gap,o=>({gap:o?_(r[o]):void 0}))}function uf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$wrap,r=>({flexWrap:r}))}function ff(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$justify,r=>({justifyContent:r}))}function pf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$direction,r=>({flexDirection:r}))}const gf={minWidth:0,minHeight:0};function xl(){return[gf,vf]}function vf(t){const{theme:e}=t,{media:n}=e.sanity;return t.$flex?J(n,t.$flex,r=>({flex:r})):bn}function De(t){return"inset 0 0 0 ".concat(t.width,"px ").concat(t.color)}function at(t){const{base:e,border:n,focusRing:r}=t,o=r.offset+r.width,i=0-r.offset,a=e?e.bg:"var(--card-bg-color)";return[i>0&&"inset 0 0 0 ".concat(i,"px var(--card-focus-ring-color)"),n&&De(n),i<0&&"0 0 0 ".concat(0-i,"px ").concat(a),o>0&&"0 0 0 ".concat(o,"px var(--card-focus-ring-color)")].filter(Boolean).join(",")}const hf={"&&:not([hidden])":{display:"grid"},'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"}},mf={auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},bf={auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"};function yf(){return[hf,xf,wf,Sf,Ef,Cf,If,Df,Rf]}function xf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$autoFlow,r=>({gridAutoFlow:r}))}function wf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$autoRows,r=>({gridAutoRows:r&&bf[r]}))}function Sf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$autoCols,r=>({gridAutoColumns:r&&mf[r]}))}function Ef(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$columns,r=>({gridTemplateColumns:r&&"repeat(".concat(r,",minmax(0,1fr));")}))}function Cf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$rows,r=>({gridTemplateRows:r&&"repeat(".concat(r,",minmax(0,1fr));")}))}function If(t){const{theme:e}=t,{media:n,space:r}=e.sanity;return J(n,t.$gap,o=>({gridGap:o?_(r[o]):void 0}))}function Df(t){const{theme:e}=t,{media:n,space:r}=e.sanity;return J(n,t.$gapX,o=>({columnGap:o?_(r[o]):void 0}))}function Rf(t){const{theme:e}=t,{media:n,space:r}=e.sanity;return J(n,t.$gapY,o=>({rowGap:o?_(r[o]):void 0}))}function Of(){return[Tf,Bf,Mf,kf,Nf,Lf]}const Pf={auto:"auto",full:"1 / -1"},Af={auto:"auto",full:"1 / -1"};function Tf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$row,r=>typeof r=="number"?{gridRow:"span ".concat(r," / span ").concat(r)}:{gridRow:Pf[r]})}function Bf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$rowStart,r=>({gridRowStart:r}))}function Mf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$rowEnd,r=>({gridRowEnd:r}))}function kf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$column,r=>typeof r=="number"?{gridColumn:"span ".concat(r," / span ").concat(r)}:{gridColumn:Af[r]})}function Nf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$columnStart,r=>({gridColumnStart:r}))}function Lf(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$columnEnd,r=>({gridColumnEnd:r}))}function yo(t){const{$fontSize:e,$iconLeft:n,$iconRight:r,$padding:o,$space:i,theme:a}=t,{fonts:s,media:l,space:c}=a.sanity,u=Math.max(o.length,i.length,e.length),d=[],f=[],g=[];for(let v=0;v<u;v+=1)g[v]=e[v]===void 0?g[v-1]:e[v],d[v]=o[v]===void 0?d[v-1]:o[v],f[v]=i[v]===void 0?f[v-1]:i[v];return J(l,d,(v,h)=>{const y=s.text.sizes[g[h]]||s.text.sizes[2],b=y.lineHeight-y.ascenderHeight-y.descenderHeight,S=c[d[h]],x=c[f[h]],w={paddingTop:_(S-y.ascenderHeight),paddingRight:_(S),paddingBottom:_(S-y.descenderHeight),paddingLeft:_(S)};return r&&(w.paddingRight=_(S+b+x)),n&&(w.paddingLeft=_(S+b+x)),w})}function $f(t){return yo({...t,$iconRight:!0})}const Ff=ee(li||(li=k([`
  &:not([hidden]) {
    display: flex;
  }

  align-items: center;
`])));function wl(){return Ff}function Sl(t){const{theme:e,$scheme:n,$tone:r,$weight:o}=t,i=e.sanity.fonts.text,a=e.sanity.color.input;return ee(ci||(ci=k([`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: `,`;
    font-weight: `,`;
    margin: 0;
    position: relative;
    z-index: 1;
    display: block;

    /* NOTE: This is a hack to disable Chrome’s autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--input-fg-color) !important;
      transition: background-color 5000s;
      transition-delay: 86400s /* 24h */;
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    color: var(--input-fg-color);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &[data-scheme='`,"'][data-tone='",`'] {
      --input-fg-color: `,`;
      --input-placeholder-color: `,`;

      /* enabled */
      &:not(:invalid):not(:disabled):not(:read-only) {
        --input-fg-color: `,`;
        --input-placeholder-color: `,`;
      }

      /* disabled */
      &:not(:invalid):disabled {
        --input-fg-color: `,`;
        --input-placeholder-color: `,`;
      }

      /* invalid */
      &:invalid {
        --input-fg-color: `,`;
        --input-placeholder-color: `,`;
      }

      /* readOnly */
      &:read-only {
        --input-fg-color: `,`;
        --input-placeholder-color: `,`;
      }
    }
  `])),i.family,o&&i.weights[o]||i.weights.regular,n,r,a.default.enabled.fg,a.default.enabled.placeholder,a.default.enabled.fg,a.default.enabled.placeholder,a.default.disabled.fg,a.default.disabled.placeholder,a.invalid.enabled.fg,a.invalid.enabled.placeholder,a.default.readOnly.fg,a.default.readOnly.placeholder)}function El(t){const{theme:e}=t,{fonts:n,media:r}=e.sanity;return J(r,t.$fontSize,o=>{const i=n.text.sizes[o]||n.text.sizes[2];return{fontSize:_(i.fontSize),lineHeight:i.lineHeight/i.fontSize}})}function Cl(t){const{$hasPrefix:e,$hasSuffix:n,$scheme:r,$tone:o,theme:i}=t,{focusRing:a,input:s}=i.sanity,l=i.sanity.color.input;return ee(di||(di=k([`
    --input-box-shadow: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;

    background-color: var(--card-bg-color);
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: `,`;
    border-bottom-left-radius: `,`;
    border-top-right-radius: `,`;
    border-bottom-right-radius: `,`;

    &[data-scheme='`,"'][data-tone='",`'] {
      --card-bg-color: `,`;
      --card-fg-color: `,`;

      /* enabled */
      *:not(:disabled) + &[data-border] {
        --input-box-shadow: `,`;
      }

      /* invalid */
      *:not(:disabled):invalid + & {
        --card-bg-color: `,`;
        --card-fg-color: `,`;

        &[data-border] {
          --input-box-shadow: `,`;
        }
      }

      /* focused */
      *:not(:disabled):focus + & {
        &[data-border] {
          --input-box-shadow: `,`;
        }

        &:not([data-border]) {
          --input-box-shadow: `,`;
        }
      }

      /* disabled */
      *:disabled + & {
        --card-bg-color: `,` !important;
        --card-fg-color: `,` !important;

        &[data-border] {
          --input-box-shadow: `,`;
        }
      }

      /* readOnly */
      *:read-only + & {
        --card-bg-color: `,` !important;
        --card-fg-color: `,` !important;
      }

      /* hovered */
      @media (hover: hover) {
        *:not(:disabled):not(:read-only):not(:invalid):hover + & {
          --card-bg-color: `,`;
          --card-fg-color: `,`;
        }

        *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
          --input-box-shadow: `,`;
        }
      }
    }
  `])),e?0:void 0,e?0:void 0,n?0:void 0,n?0:void 0,r,o,l.default.enabled.bg,l.default.enabled.fg,De({color:l.default.enabled.border,width:s.border.width}),l.invalid.enabled.bg,l.invalid.enabled.fg,De({color:l.invalid.enabled.border,width:s.border.width}),at({border:{color:l.default.enabled.border,width:s.border.width},focusRing:a}),at({focusRing:a}),l.default.disabled.bg,l.default.disabled.fg,De({color:l.default.disabled.border,width:s.border.width}),l.default.readOnly.bg,l.default.readOnly.fg,l.default.hovered.bg,l.default.hovered.fg,De({color:l.default.hovered.border,width:s.border.width}))}function zf(t){const{theme:e}=t;return[Fe(e,["margin"],t.$margin),Fe(e,["marginLeft","marginRight"],t.$marginX),Fe(e,["marginTop","marginBottom"],t.$marginY),Fe(e,["marginTop"],t.$marginTop),Fe(e,["marginRight"],t.$marginRight),Fe(e,["marginBottom"],t.$marginBottom),Fe(e,["marginLeft"],t.$marginLeft)].filter(Boolean)}function Il(t){const{theme:e}=t;return[Fe(e,["padding"],t.$padding),Fe(e,["paddingLeft","paddingRight"],t.$paddingX),Fe(e,["paddingTop","paddingBottom"],t.$paddingY),Fe(e,["paddingTop"],t.$paddingTop),Fe(e,["paddingRight"],t.$paddingRight),Fe(e,["paddingBottom"],t.$paddingBottom),Fe(e,["paddingLeft"],t.$paddingLeft)].filter(Boolean)}function lt(t){const{theme:e}=t,{media:n,radius:r}=e.sanity;return J(n,t.$radius,o=>({borderRadius:_(r[o])}))}function kr(t,e){return"".concat(t.map(_).join(" ")," ").concat(e)}function _f(t){if(!t)return ut;const e="0 0 0 ".concat(_(1)," var(--card-shadow-outline-color)"),n=kr(t.umbra,"var(--card-shadow-umbra-color)"),r=kr(t.penumbra,"var(--card-shadow-penumbra-color)"),o=kr(t.ambient,"var(--card-shadow-ambient-color)");return{boxShadow:"".concat(e,", ").concat(n,", ").concat(r,", ").concat(o)}}function Gf(t){const{theme:e}=t,{media:n,shadows:r}=e.sanity;return J(n,t.$shadow,o=>_f(r[o]))}function Hf(t){const{$accent:e,$muted:n,theme:r}=t,{weights:o}=r.sanity.fonts.text;return ee(ui||(ui=k([`
    color: var(--card-fg-color);

    `,`

    `,`

    & code {
      font-family: `,`;
      border-radius: 1px;
      background-color: var(--card-code-bg-color);
      color: var(--card-code-fg-color);
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: `,`;
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `])),e&&ee(fi||(fi=k([`
      color: var(--card-accent-fg-color);
    `]))),n&&ee(pi||(pi=k([`
      color: var(--card-muted-fg-color);
    `]))),r.sanity.fonts.code.family,o.bold)}const jf=M.div(Vd,ho,Hf),Uf=M.span(gi||(gi=k([`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`]))),Ee=p.forwardRef(function(e,n){const{accent:r=!1,align:o,children:i,muted:a=!1,size:s=2,textOverflow:l,weight:c,...u}=e;let d=i;return l==="ellipsis"&&(d=m(Uf,{children:d})),m(jf,{"data-ui":"Text",...u,$accent:r,$align:R(o),$muted:a,ref:n,$size:R(s),$weight:c,children:m("span",{children:d})})}),wn={root:Vf,arrow:Wf,bgStroke:Yf,stroke:Xf,initials:Kf};function Wf(){return{position:"absolute",boxSizing:"border-box",zIndex:0,opacity:0,transition:"all 0.2s linear",transform:"rotate(-90deg) translate3d(0, 6px, 0)",left:0,right:0,top:0,bottom:0,"& > svg":{width:"11px",height:"7px",position:"absolute",top:"-5px",left:"50%",transform:"translateX(-6px)","&:not([hidden])":{display:"block"}},"[data-arrow-position='inside'] > &":{transform:"rotate(-90deg) translate3d(0, 6px, 0)",opacity:0},"[data-arrow-position='top'] > &":{opacity:1,transform:"rotate(0deg)"},"[data-arrow-position='bottom'] > &":{opacity:1,transform:"rotate(-180deg)"}}}function Vf(t){const{$color:e,theme:n}=t,{focusRing:r}=n.sanity;return{backgroundColor:e,position:"relative",boxSizing:"border-box",userSelect:"none",boxShadow:"0 0 0 1px var(--card-bg-color)",'&[data-status="inactive"]':{opacity:.5},"&>svg":{"&:not([hidden])":{display:"block"}},'&[data-as="button"]':{"-webkit-font-smoothing":"inherit",appearance:"none",margin:0,padding:0,border:0,font:"inherit",color:"inherit",outline:"none","&:focus":{boxShadow:at({focusRing:r})},"&:focus:not(:focus-visible)":{boxShadow:"none"}}}}function qf(t){const{theme:e}=t,{avatar:n,media:r}=e.sanity;return J(r,t.$size,o=>{const i=n.sizes[o]||n.sizes[0];return{width:_(i.size),height:_(i.size),borderRadius:_(i.size/2),"&>svg":{width:_(i.size),height:_(i.size),borderRadius:_(i.size/2)}}})}function Kf(t){const{theme:e}=t,{base:n}=e.sanity.color;return{width:"100%",height:"100%",color:n.fg,alignItems:"center",justifyContent:"center",textTransform:"uppercase",textAlign:"center",borderRadius:"50%","&:not([hidden])":{display:"flex"}}}function Yf(){return{strokeWidth:"4px",stroke:"var(--card-bg-color)"}}function Xf(){return{strokeWidth:"3px",'[data-status="editing"] &':{strokeSasharray:"2 4",strokeLinecap:"round"}}}const Zf=M.div(qf,wn.root),Jf=M.div(wn.arrow),Qf=M.ellipse(wn.bgStroke),ep=M.ellipse(wn.stroke),tp=M.div(wn.initials);p.forwardRef(function(e,n){const{as:r,color:o="gray",src:i,title:a,initials:s,onImageLoadError:l,arrowPosition:c,animateArrowFrom:u,status:d="online",size:f=0,...g}=e,v=sd.isValidElementType(r)?r:"div",h=R(f),y=mt(),b=y.sanity.color.spot[o]||y.sanity.color.spot.gray,x=(y.sanity.avatar.sizes[h[0]]||y.sanity.avatar.sizes[0]).size,w=x/2,C=p.useId(),[E,T]=p.useState(u||c||"inside"),[D,I]=p.useState(!1),O="avatar-image-".concat(C);p.useEffect(()=>{if(E===c)return;const A=requestAnimationFrame(()=>T(c));return()=>cancelAnimationFrame(A)},[E,c]),p.useEffect(()=>{i&&I(!1)},[i]);const P=p.useCallback(()=>{I(!0),l&&l(new Error("Avatar: the image failed to load"))},[l]),F=p.useMemo(()=>h.map(A=>A===0?0:A+1),[h]);return K(Zf,{as:v,"data-as":typeof v=="string"?v:void 0,"data-ui":"Avatar",...g,$size:h,$color:b,"aria-label":a,"data-arrow-position":E,"data-status":d,ref:n,title:a,children:[m(Jf,{children:m("svg",{width:"11",height:"7",viewBox:"0 0 11 7",fill:"none",children:m("path",{d:"M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z",fill:b})})}),!D&&i&&K("svg",{viewBox:"0 0 ".concat(x," ").concat(x),fill:"none",children:[m("defs",{children:m("pattern",{id:O,patternContentUnits:"objectBoundingBox",width:"1",height:"1",children:m("image",{href:i,width:"1",height:"1",onError:P})})}),m("circle",{cx:w,cy:w,r:w,fill:"url(#".concat(O,")")}),m(Qf,{cx:w,cy:w,rx:w,ry:w,vectorEffect:"non-scaling-stroke"}),m(ep,{cx:w,cy:w,rx:w,ry:w,stroke:b,vectorEffect:"non-scaling-stroke"})]}),(D||!i)&&s&&m(Ge,{children:m(tp,{children:m(Ee,{as:"span",size:F,children:m("strong",{children:s})})})})]})});function np(t){const{theme:e}=t,{avatar:n,media:r}=e.sanity;return J(r,t.$size,o=>{const i=n.sizes[o];return i?{borderRadius:_(i.size/2),minWidth:_(i.size),height:_(i.size)}:ut})}function rp(t){const{theme:e}=t;return ee(vi||(vi=k([`
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    box-shadow: 0 0 0 1px var(--card-bg-color), inset 0 0 0 1.5px var(--card-hairline-hard-color);
    padding: 0 `,`;

    &:not([hidden]) {
      display: flex;
    }
  `])),_(e.sanity.space[2]))}const op=M.div(np,rp),ts=p.forwardRef(function(e,n){const{count:r,size:o=0}=e,i=R(o),a=p.useMemo(()=>i.map(s=>s===0?0:s+1),[i]);return m(op,{$size:i,"data-ui":"AvatarCounter",ref:n,children:m(Ee,{as:"span",size:a,children:m("strong",{children:r})})})});function Dl(t){return(Array.isArray(t)?t:[t]).filter(n=>tt.isElement(n)||tt.isFragment(n)||typeof n=="string")}const ip=ee(hi||(hi=k([`
  white-space: nowrap;

  & > div {
    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  }
`])));function ap(){return ip}function sp(t){const{theme:e}=t,{avatar:n,media:r}=e.sanity;return J(r,t.$size,o=>{const i=n.sizes[o];return i?{"& > div + div":{marginLeft:_(i.distance)}}:ut})}const lp=M.div(sp,ap);p.forwardRef(function(e,n){const{children:r,maxLength:o=4,size:i=0,...a}=e,s=Dl(r).filter(v=>typeof v!="string"),l=Math.max(o,0),c=R(i),u=s.length,d=l-1,f=u-d,g=f>1?s.slice(f,u):s;return K(lp,{"data-ui":"AvatarStack",...a,ref:n,$size:c,children:[u===0&&m("div",{children:m(ts,{count:u})}),u!==0&&f>1&&m("div",{children:m(ts,{count:f,size:c})}),g.map((v,h)=>m("div",{children:p.cloneElement(v,{size:c})},String(h)))]})});const cp=M.div(ef,xl,tf,Of,zf,Il),re=p.forwardRef(function(e,n){const{as:r="div",column:o,columnStart:i,columnEnd:a,display:s="block",flex:l,height:c,margin:u=0,marginX:d,marginY:f,marginTop:g,marginRight:v,marginBottom:h,marginLeft:y,overflow:b,padding:S=0,paddingX:x,paddingY:w,paddingTop:C,paddingRight:E,paddingBottom:T,paddingLeft:D,row:I,rowStart:O,rowEnd:P,sizing:F,...A}=e;return m(cp,{"data-as":typeof r=="string"?r:void 0,"data-ui":"Box",...A,$column:R(o),$columnStart:R(i),$columnEnd:R(a),$display:R(s),$flex:R(l),$height:R(c),$margin:R(u),$marginX:R(d),$marginY:R(f),$marginTop:R(g),$marginRight:R(v),$marginBottom:R(h),$marginLeft:R(y),$overflow:R(b),$padding:R(S),$paddingX:R(x),$paddingY:R(w),$paddingTop:R(C),$paddingRight:R(E),$paddingBottom:R(T),$paddingLeft:R(D),$row:R(I),$rowStart:R(O),$rowEnd:R(P),$sizing:R(F),as:r,ref:n,children:e.children})});function dp(t){const{$accent:e,$muted:n,theme:r}=t,{fonts:o}=r.sanity;return ee(mi||(mi=k([`
    text-transform: uppercase;

    `,`

    `,`

    & code {
      font-family: `,`;
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `])),e&&ee(bi||(bi=k([`
      color: var(--card-accent-fg-color);
    `]))),n&&ee(yi||(yi=k([`
      color: var(--card-muted-fg-color);
    `]))),o.code.family)}const up=M.div(Wd,ho,dp),fp=M.span(xi||(xi=k([`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`]))),pp=p.forwardRef(function(e,n){const{accent:r,align:o,children:i,muted:a=!1,size:s=2,textOverflow:l,weight:c,...u}=e;let d=i;return l==="ellipsis"?d=m(fp,{children:d}):d=m("span",{children:d}),m(up,{"data-ui":"Label",...u,$accent:r,$align:R(o),$muted:a,$size:R(s),$weight:c,ref:n,children:d})});function gp(t){const{$mode:e,$tone:n,theme:r}=t,o=r.sanity.color[e==="outline"?"muted":"solid"],i=o[n]||o.default;return{backgroundColor:i.enabled.bg,color:i.enabled.fg,boxShadow:"inset 0 0 0 1px ".concat(i.enabled.border),cursor:"default","&:not([hidden])":{display:"inline-block"}}}const vp=M(re)(lt,gp);p.forwardRef(function(e,n){const{children:r,fontSize:o,mode:i="default",padding:a=1,radius:s=2,tone:l="default",...c}=e;return m(vp,{"data-ui":"Badge",...c,$mode:i,$tone:l,$radius:R(s),padding:R(a),ref:n,children:m(pp,{size:o,children:r})})});const hp=M(re)(xl,lf),it=p.forwardRef(function(e,n){const{align:r,as:o,direction:i="row",gap:a,justify:s,wrap:l,...c}=e;return m(hp,{"data-ui":"Flex",...c,$align:R(r),$direction:R(i),$gap:R(a),$justify:R(s),$wrap:R(l),forwardedAs:o,ref:n})}),mp=go(wi||(wi=k([`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`]))),bp=M(Ee)(Si||(Si=k([`
  & > span > svg {
    animation: `,` 500ms linear infinite;
  }
`])),mp),Rl=p.forwardRef(function(e,n){return m(bp,{"data-ui":"Spinner",...e,ref:n,children:m(qs,{})})});function se(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;var r,o,i,a,s,l,c,u;return{"--card-shadow-outline-color":t.shadow.outline,"--card-shadow-umbra-color":t.shadow.umbra,"--card-shadow-penumbra-color":t.shadow.penumbra,"--card-shadow-ambient-color":t.shadow.ambient,"--card-focus-ring-color":t.focusRing,"--card-bg-color":e.bg,"--card-bg-image":n?"repeating-conic-gradient(".concat(e.bg," 0% 25%, ").concat(e.bg2||e.bg," 0% 50%)"):void 0,"--card-fg-color":e.fg,"--card-border-color":e.border,"--card-muted-fg-color":(r=e.muted)==null?void 0:r.fg,"--card-accent-fg-color":(o=e.accent)==null?void 0:o.fg,"--card-link-fg-color":(i=e.link)==null?void 0:i.fg,"--card-code-bg-color":(a=e.code)==null?void 0:a.bg,"--card-code-fg-color":(s=e.code)==null?void 0:s.fg,"--card-skeleton-color-from":(l=e.skeleton)==null?void 0:l.from,"--card-skeleton-color-to":(c=e.skeleton)==null?void 0:c.to,"--card-link-color":(u=e.link)==null?void 0:u.fg,"--card-hairline-soft-color":e.border,"--card-hairline-hard-color":e.border}}function yp(){return ee(Ei||(Ei=k([`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    position: relative;

    & > span {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `])))}const xp={border:{width:1}};function wp(t){var e,n;const{$mode:r,theme:o}=t,{focusRing:i}=o.sanity,a=o.sanity.color.base,s=o.sanity.color.button[r]||o.sanity.color.button.default,l=s[t.$tone]||s.default,c={width:xp.border.width,color:"var(--card-border-color)"};return[se(a,l.enabled),{backgroundColor:"var(--card-bg-color)",color:"var(--card-fg-color)",boxShadow:De(c),'&:disabled, &[data-disabled="true"]':se(a,l.disabled),"&:not([data-disabled='true'])":{"&:focus":{boxShadow:at({base:a,border:c,focusRing:i})},"&:focus:not(:focus-visible)":{boxShadow:De(c)},"@media (hover: hover)":{"&:hover":se(a,l.hovered),"&:active":se(a,l.pressed)},"&[data-selected]":se(a,l.pressed)}},(n=(e=o.sanity.styles)==null?void 0:e.button)==null?void 0:n.root].filter(Boolean)}const Sp=M.button(lt,yp,wp),Ep=M.div(Ci||(Ci=k([`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg-color);
  border-radius: inherit;
  z-index: 1;
  box-shadow: inherit;
`]))),ft=p.forwardRef(function(e,n){const{children:r,disabled:o,fontSize:i,icon:a,iconRight:s,justify:l="center",loading:c,mode:u="default",padding:d=3,paddingX:f,paddingY:g,paddingTop:v,paddingBottom:h,paddingLeft:y,paddingRight:b,radius:S=2,selected:x,space:w=3,text:C,textAlign:E,tone:T="default",type:D="button",...I}=e,O=R(l),P=R(d),F=R(f),A=R(g),z=R(v),V=R(h),H=R(y),X=R(b),Y=R(S),U=R(w),L=mt(),G=p.useMemo(()=>({padding:P,paddingX:F,paddingY:A,paddingTop:z,paddingBottom:V,paddingLeft:H,paddingRight:X}),[P,F,A,z,V,H,X]);return K(Sp,{"data-ui":"Button",...I,$mode:u,$radius:Y,$tone:T,"data-disabled":Boolean(c||o),"data-selected":x?"":void 0,disabled:Boolean(c||o),ref:n,type:D,children:[Boolean(c)&&m(Ep,{children:m(Rl,{})}),(a||C||s)&&m(re,{as:"span",...G,children:K(it,{as:"span",justify:O,children:[a&&K(Ee,{size:i,children:[p.isValidElement(a)&&a,tt.isValidElementType(a)&&p.createElement(a)]}),C&&m(re,{flex:s?1:void 0,marginLeft:a?U:void 0,marginRight:s?U:void 0,children:m(Ee,{align:E,size:i,textOverflow:"ellipsis",weight:L.sanity.button.textWeight,children:C})}),s&&K(Ee,{size:i,children:[p.isValidElement(s)&&s,tt.isValidElementType(s)&&p.createElement(s)]})]})}),r&&m(re,{as:"span",...G,children:r})]})});function Cp(t){return[Ip(t),Dp(t)]}function Ip(t){const{$checkered:e,theme:n}=t,r=n.sanity.space;return ee(Ii||(Ii=k([`
    `,`

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      outline: none;
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `])),e&&ee(Di||(Di=k([`
      background-size: `,"px ",`px;
      background-position: 50% 50%;
      background-image: var(--card-bg-image);
    `])),r[3],r[3]))}function Dp(t){var e,n;const{$checkered:r,$focusRing:o,theme:i}=t,{focusRing:a}=i.sanity,{base:s,card:l,dark:c}=i.sanity.color,u={width:0,color:"var(--card-border-color)"};return ee(Ri||(Ri=k([`
    color-scheme: `,`;

    `,`

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);

      &:disabled {
        `,`
      }

      &:not(:disabled) {
        &[data-pressed] {
          `,`
        }

        &[data-selected] {
          `,`
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              `,`
            }

            &:active {
              `,`
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: `,`;
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: `,`;
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);

      &[data-disabled] {
        `,`
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          `,`
        }

        &[data-selected] {
          `,`
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              `,`
            }

            &:active {
              `,`
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: `,`;
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: `,`;
        }
      }
    }

    `,`
  `])),c?"dark":"light",se(s,l.enabled,r),se(s,l.disabled,r),se(s,l.pressed,r),se(s,l.selected,r),se(s,l.hovered,r),se(s,l.pressed,r),o?at({base:s,border:u,focusRing:a}):void 0,o?De(u):void 0,se(s,l.disabled,r),se(s,l.pressed,r),se(s,l.selected,r),se(s,l.hovered,r),se(s,l.pressed,r),o?at({base:s,border:u,focusRing:a}):void 0,o?De(u):void 0,(n=(e=i.sanity.styles)==null?void 0:e.card)==null?void 0:n.root)}const Rp=M(re)(Wu,lt,Gf,Cp),Je=p.forwardRef(function(e,n){const{__unstable_checkered:r=!1,__unstable_focusRing:o=!1,as:i,border:a,borderTop:s,borderRight:l,borderBottom:c,borderLeft:u,pressed:d,radius:f=0,scheme:g,selected:v,shadow:h,tone:y="default",...b}=e,S=tt.isValidElementType(i)?i:"div",x=sr(),w=y==="inherit"?x.tone:y;return m(zu,{scheme:g,tone:w,children:m(Rp,{"data-as":typeof S=="string"?S:void 0,"data-scheme":x.scheme,"data-ui":"Card","data-tone":w,...b,$border:R(a),$borderTop:R(s),$borderRight:R(l),$borderBottom:R(c),$borderLeft:R(u),$checkered:r,$focusRing:o,$radius:R(f),$shadow:R(h),$tone:w,"data-checkered":r?"":void 0,"data-pressed":d?"":void 0,"data-selected":v?"":void 0,forwardedAs:S,ref:n,selected:v})})});function Op(){return ee(Oi||(Oi=k([`
    position: relative;
    display: inline-block;
  `])))}function Pp(t){const{theme:e}=t,n=e.sanity.color.input,{focusRing:r,input:o,radius:i}=e.sanity;return ee(Pi||(Pi=k([`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    z-index: 1;
    padding: 0;
    margin: 0;

    & + span {
      position: relative;
      display: block;
      height: `,`;
      width: `,`;
      box-sizing: border-box;
      box-shadow: `,`;
      border-radius: `,`;
      line-height: 1;
      background-color: `,`;

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2 !important;
        }
      }
    }

    &:not(:disabled):focus + span {
      box-shadow: `,`;
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: `,`;
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }

    &[data-read-only] + span {
      background-color: `,`;
      box-shadow: `,`;
      color: `,`;
    }

    &:not([data-read-only]):disabled + span {
      background-color: `,`;
      box-shadow: `,`;
      color: `,`;
    }

    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `])),_(o.checkbox.size),_(o.checkbox.size),De({color:n.default.enabled.border,width:o.border.width}),_(i[2]),n.default.enabled.bg,at({border:{width:o.border.width,color:n.default.enabled.border},focusRing:r}),De({color:n.default.enabled.border,width:o.border.width}),n.default.readOnly.bg,De({width:o.border.width,color:n.default.readOnly.border}),n.default.readOnly.fg,n.default.disabled.bg,De({width:o.border.width,color:n.default.disabled.border}),n.default.disabled.fg)}const Ap=M.div(Op),Tp=M.input(Pp);p.forwardRef(function(e,n){const{checked:r,className:o,disabled:i,indeterminate:a,customValidity:s,readOnly:l,style:c,...u}=e,d=Me(n);return yn(d,s),p.useEffect(()=>{d.current&&(d.current.indeterminate=a||!1)},[a,d]),K(Ap,{className:o,"data-ui":"Checkbox",style:c,children:[m(Tp,{"data-read-only":!i&&l?"":void 0,...u,checked:r,disabled:i||l,type:"checkbox",readOnly:l,ref:d}),K("span",{children:[m(ld,{}),m(cd,{})]})]})});function Bp(t){let{theme:e}=t;const n=e.sanity.color.syntax;return{"&.atrule":{color:n.atrule},"&.attr-name":{color:n.attrName},"&.attr-value":{color:n.attrValue},"&.attribute":{color:n.attribute},"&.boolean":{color:n.boolean},"&.builtin":{color:n.builtin},"&.cdata":{color:n.cdata},"&.char":{color:n.char},"&.class":{color:n.class},"&.class-name":{color:n.className},"&.comment":{color:n.comment},"&.constant":{color:n.constant},"&.deleted":{color:n.deleted},"&.doctype":{color:n.doctype},"&.entity":{color:n.entity},"&.function":{color:n.function},"&.hexcode":{color:n.hexcode},"&.id":{color:n.id},"&.important":{color:n.important},"&.inserted":{color:n.inserted},"&.keyword":{color:n.keyword},"&.number":{color:n.number},"&.operator":{color:n.operator},"&.prolog":{color:n.prolog},"&.property":{color:n.property},"&.pseudo-class":{color:n.pseudoClass},"&.pseudo-element":{color:n.pseudoElement},"&.punctuation":{color:n.punctuation},"&.regex":{color:n.regex},"&.selector":{color:n.selector},"&.string":{color:n.string},"&.symbol":{color:n.symbol},"&.tag":{color:n.tag},"&.unit":{color:n.unit},"&.url":{color:n.url},"&.variable":{color:n.variable}}}function Mp(){return ee(Ai||(Ai=k([`
    color: var(--card-code-fg-color);

    & code {
      font-family: inherit;

      &.refractor .token {
        `,`
      }
    }

    & a {
      color: inherit;
      text-decoration: underline;
      border-radius: 1px;
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `])),Bp)}const kp=M.pre(Mp,jd),Np=p.forwardRef(function(e,n){const{children:r,language:o,size:i=2,weight:a,...s}=e,l=typeof o=="string"?o:void 0,c=l?ri.hasLanguage(l):!1;return K(kp,{"data-ui":"Code",...s,$size:R(i),$weight:a,ref:n,children:[!(l&&c)&&m("code",{children:r}),l&&c&&m(ri,{inline:!0,language:l,value:String(r)})]})}),Lp={width:"100%",margin:"0 auto"};function $p(){return Lp}function Fp(t){const{theme:e}=t,{container:n,media:r}=e.sanity;return J(r,t.$width,o=>({maxWidth:o==="auto"?"none":_(n[o])}))}const zp=M(re)($p,Fp),Ol=p.forwardRef(function(e,n){const{as:r,width:o=2,...i}=e;return m(zp,{"data-ui":"Container",...i,$width:R(o),forwardedAs:r,ref:n})}),_p=M(re)(yf),iw=p.forwardRef(function(e,n){const{as:r,autoRows:o,autoCols:i,autoFlow:a,columns:s,gap:l,gapX:c,gapY:u,rows:d,children:f,...g}=e;return m(_p,{"data-as":typeof r=="string"?r:void 0,"data-ui":"Grid",...g,$autoRows:R(o),$autoCols:R(i),$autoFlow:R(a),$columns:R(s),$gap:R(l),$gapX:R(c),$gapY:R(u),$rows:R(d),forwardedAs:r,ref:n,children:f})});function Gp(t){const{$accent:e,$muted:n,theme:r}=t;return ee(Ti||(Ti=k([`
    `,`

    `,`

    & code {
      font-family: `,`;
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `])),e&&ee(Bi||(Bi=k([`
      color: var(--card-accent-fg-color);
    `]))),n&&ee(Mi||(Mi=k([`
      color: var(--card-muted-fg-color);
    `]))),r.sanity.fonts.code.family)}const Hp=M.div(Gp,ho,Ud),jp=M.span(ki||(ki=k([`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`])));p.forwardRef(function(e,n){const{accent:r=!1,align:o,children:i,muted:a=!1,size:s=2,textOverflow:l,weight:c,...u}=e;let d=i;return l==="ellipsis"&&(d=m(jp,{children:d})),m(Hp,{"data-ui":"Heading",...u,$accent:r,$align:R(o),$muted:a,$size:R(s),$weight:c,ref:n,children:m("span",{children:d})})});function Up(){return{lineHeight:0,"&&:not([hidden])":{display:"block"},"& > div":{display:"inline-block",verticalAlign:"middle"}}}function Wp(t){const{theme:e}=t;return J(e.sanity.media,t.$space,n=>{const r=_(e.sanity.space[n]);return{margin:"-".concat(r," 0 0 -").concat(r),"& > div":{padding:"".concat(r," 0 0 ").concat(r)}}})}const Vp=M(re)(Up,Wp),Pl=p.forwardRef(function(e,n){const{as:r,children:o,space:i,...a}=e,s=p.useMemo(()=>Dl(o).filter(Boolean).map((l,c)=>m("div",{children:l},c)),[o]);return m(Vp,{"data-ui":"Inline",...a,$space:R(i),forwardedAs:r,ref:n,children:s})});function qp(){return ee(Ni||(Ni=k([`
    background: var(--card-bg-color);
    font: inherit;
    box-shadow: inset 0 0 0 1px var(--card-hairline-hard-color);

    &:not([hidden]) {
      display: inline-block;
    }
  `])))}const Kp=M.kbd(lt,qp),Yp=p.forwardRef(function(e,n){const{children:r,fontSize:o=1,padding:i=1,radius:a=2,...s}=e;return m(Kp,{"data-ui":"KBD",...s,$radius:R(a),ref:n,children:m(re,{as:"span",padding:i,children:m(Np,{as:"span",muted:!0,size:o,children:r})})})}),Xr=Symbol.for("@sanity/ui/context/boundaryElement");ce[Xr]=ce[Xr]||p.createContext(null);const Xp=ce[Xr],Zp={version:0,element:null};function lr(){const t=p.useContext(Xp);if(t&&(!Gt(t)||t.version!==0))throw new Error("useBoundaryElement(): the context value is not compatible");return t||Zp}function Jp(t,e){const n=[];for(let r=0;r<t.length;r+=1)t[r]>e&&n.push(r);return n}function Qp(t,e){const n=[];for(let r=0;r<t.length;r+=1)t[r]<=e&&n.push(r);return n}p.forwardRef(function(e,n){const r=mt(),{children:o,media:i=r.sanity.media,...a}=e,s=Me(n),[l,c]=p.useState(null),u=ml(l),d=p.useMemo(()=>{var h;return(h=u==null?void 0:u.border.width)!=null?h:window.innerWidth},[u]),f=p.useMemo(()=>Jp(i,d),[i,d]),g=p.useMemo(()=>Qp(i,d),[i,d]),v=p.useCallback(h=>{s.current=h,c(h)},[s]);return m("div",{"data-ui":"ElementQuery",...a,"data-eq-max":f.length?f.join(" "):void 0,"data-eq-min":g.length?g.join(" "):void 0,ref:v,children:o})});function Al(t){if(!Gt(t)||t.version!==0)throw new Error("the context value is not compatible");if(!t)throw new Error("components using `useLayer()` should be wrapped in a <LayerProvider>.");if(t.version===0)return t;throw new Error("could not get layer context")}const Zr=Symbol.for("@sanity/ui/context/layer");ce[Zr]=ce[Zr]||p.createContext(null);const Jr=ce[Zr];function cr(){const t=p.useContext(Jr);if(!t)throw new Error("useLayer(): missing context value");try{return Al(t)}catch(e){throw e instanceof Error?new Error("useLayer(): ".concat(e.message)):new Error("useLayer(): ".concat(e))}}function eg(t){const e=requestAnimationFrame(t);return()=>{cancelAnimationFrame(e)}}function tg(t){return xo(t)||wo(t)}function ct(t){return t instanceof Node&&t.nodeType===Node.ELEMENT_NODE}function xo(t){return ct(t)&&t.nodeName==="A"}function ng(t){return ct(t)&&t.nodeName==="INPUT"}function wo(t){return ct(t)&&t.nodeName==="BUTTON"}function rg(t){return ct(t)&&t.nodeName==="SELECT"}function og(t){return ct(t)&&t.nodeName==="TEXTAREA"}function Qr(t,e){return t.contains(e)||t===e}function ig(t){return Boolean(document.activeElement)&&t.contains(document.activeElement)}function ag(t){return t.tabIndex>0||t.tabIndex===0&&t.getAttribute("tabIndex")!==null?!0:xo(t)?Boolean(t.href)&&t.rel!=="ignore":ng(t)?t.type!=="hidden"&&t.type!=="file"&&!t.disabled:wo(t)||rg(t)||og(t)?!t.disabled:!1}function Tl(t){if(!ag(t))return!1;try{t.focus()}catch{}return document.activeElement===t}function dn(t){for(let e=0;e<t.childNodes.length;e++){const n=t.childNodes[e];if(ct(n)&&(Tl(n)||dn(n)))return!0}return!1}function Bl(t){for(let e=t.childNodes.length-1;e>=0;e--){const n=t.childNodes[e];if(ct(n)&&(Tl(n)||Bl(n)))return!0}return!1}function sg(t){if(!(t instanceof Element))return!1;const e=window.getComputedStyle(t);return e.overflowX.includes("auto")||e.overflowX.includes("scroll")||e.overflowY.includes("auto")||e.overflowY.includes("scroll")}function Ml(t){var e;const{children:n,zOffset:r=0}=t,o=p.useContext(Jr),i=o&&Al(o),a=i==null?void 0:i.registerChild,l=((e=i==null?void 0:i.level)!=null?e:0)+1,c=R(r),u=c.length-1,d=Math.min(ju(),u),f=i?i.zIndex+c[d]:c[d],[,g]=p.useState({}),[v,h]=p.useState(0),y=v===0,b=p.useCallback(x=>{const w=a==null?void 0:a(x);return x!==void 0?g(C=>{var E;const T=(E=C[x])!=null?E:0,D={...C,[x]:T+1};return h(Object.keys(D).length),D}):h(C=>C+1),()=>{x!==void 0?g(C=>{const E={...C};return E[x]===1?(delete E[x],h(Object.keys(E).length)):E[x]-=1,E}):h(C=>C-1),w==null||w()}},[a]);p.useEffect(()=>a==null?void 0:a(l),[l,a]);const S=p.useMemo(()=>({version:0,isTopLayer:y,level:l,registerChild:b,size:v,zIndex:f}),[y,l,b,v,f]);return m(Jr.Provider,{value:S,children:n})}const lg=M.div({position:"relative"}),cg=p.forwardRef(function(e,n){const{children:r,onActivate:o,onFocus:i,style:a=ut,...s}=e,{zIndex:l,isTopLayer:c}=cr(),u=p.useRef(null),d=Me(n),f=p.useRef(c);p.useEffect(()=>{f.current!==c&&c&&(o==null||o({activeElement:u.current})),f.current=c},[c,o]);const g=p.useCallback(v=>{i==null||i(v);const h=d.current,y=document.activeElement;!c||!h||!y||ct(y)&&Qr(h,y)&&(u.current=y)},[d,c,i]);return m(lg,{...s,"data-ui":"Layer",onFocus:g,ref:d,style:{...a,zIndex:l},children:r})}),So=p.forwardRef(function(e,n){const{children:r,zOffset:o=1,...i}=e;return m(Ml,{zOffset:o,children:m(cg,{...i,ref:n,children:r})})}),eo=Symbol.for("@sanity/ui/context/portal"),It=Symbol.for("@sanity/ui/context/portal/element");ce[It]=null;const dg={version:0,boundaryElement:null,get element(){return typeof document>"u"?null:(ce[It]||(ce[It]=document.createElement("div"),ce[It].setAttribute("data-portal",""),document.body.appendChild(ce[It])),ce[It])}};ce[eo]=ce[eo]||p.createContext(dg);const ug=ce[eo];function Eo(){const t=p.useContext(ug);if(!t)throw new Error("usePortal(): missing context value");if(!Gt(t)||t.version!==0)throw new Error("usePortal(): the context value is not compatible");return t}function Co(t){var e;const{children:n,__unstable_name:r}=t,o=Eo(),i=(r?o.elements&&o.elements[r]:o.element)||((e=o.elements)==null?void 0:e.default);return i?nl.createPortal(n,i):null}const fg=M.div(Li||(Li=k([`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
`])));p.forwardRef(function(e,n){const{as:r,children:o}=e;return m(fg,{"aria-hidden":!0,as:r,"data-ui":"SrOnly",ref:n,children:o})});const pg=M.div($i||($i=k([`
  position: relative;
`]))),ns=M.div(Fi||(Fi=k([`
  position: absolute;
  left: 0;
  right: 0;
`])));p.forwardRef(function(e,n){const{as:r="div",gap:o=0,getItemKey:i,items:a=[],onChange:s,renderItem:l,...c}=e,{space:u}=mt().sanity,d=Me(n),f=p.useRef(null),[g,v]=p.useState(0),[h,y]=p.useState(0),[b,S]=p.useState(-1);p.useEffect(()=>{if(!f.current)return;const I=f.current.firstChild;I instanceof HTMLElement&&S(I.offsetHeight)},[l]),p.useEffect(()=>{if(!d.current)return;let I=d.current.parentNode;for(;I&&!sg(I);)I=I.parentNode;if(I){const F=I;if(!(F instanceof HTMLElement))return;const A=()=>{v(F.scrollTop)};F.addEventListener("scroll",A,{passive:!0});const z=new hl(V=>{y(V[0].contentRect.height)});return z.observe(F),A(),()=>{F.removeEventListener("scroll",A),z.unobserve(F),z.disconnect()}}const O=()=>{v(window.scrollY)},P=()=>{y(window.innerHeight)};return window.addEventListener("scroll",O,{passive:!0}),window.addEventListener("resize",P),y(window.innerHeight),O(),()=>{window.removeEventListener("scroll",O),window.removeEventListener("resize",P)}},[d]);const x=a.length,w=b?x*(b+u[o])-u[o]:0,C=w?Math.max(Math.floor(g/w*x)-2,0):0,E=w?Math.ceil((g+h)/w*x)+1:0;p.useEffect(()=>{s&&s({fromIndex:C,gap:u[o],itemHeight:b,scrollHeight:h,scrollTop:g,toIndex:E})},[C,o,b,s,h,g,u,E]);const T=p.useMemo(()=>!l||a.length===0?null:b===-1?[m(ns,{children:l(a[0])},0)]:a.slice(C,E).map((I,O)=>{const P=C+O,F=l(I),A=i?i(I,P):P;return m(ns,{style:{top:P*(b+u[o])},children:F},A)}),[C,o,i,b,a,l,u,E]),D=p.useMemo(()=>({height:w}),[w]);return m(pg,{as:r,"data-ui":"VirtualList",...c,ref:d,children:m("div",{ref:f,style:D,children:T})})});const gg=4,kt=4,ot=27,vg=11,kl=[0,0,0,0];function hg(t){const{apply:e,margins:n,padding:r=0}=t;return{name:"@sanity/ui/size",async fn(o){const{elements:i,placement:a,platform:s,rects:l}=o,{floating:c,reference:u}=l,d=await gd(o,{altBoundary:!0,boundary:t.boundaryElement||void 0,elementContext:"floating",padding:r,rootBoundary:"viewport"});let f=1/0,g=1/0;const v=c.width,h=c.height;a.includes("top")&&(f=v-(d.left+d.right),g=h-d.top),a.includes("right")&&(f=v-d.right,g=h-(d.top+d.bottom)),a.includes("bottom")&&(f=v-(d.left+d.right),g=h-d.bottom),a.includes("left")&&(f=v-d.left,g=h-(d.top+d.bottom)),e({availableWidth:f-n[1]-n[3],availableHeight:g-n[0]-n[2],elements:i,referenceWidth:u.width-n[1]-n[3]});const y=await s.getDimensions(i.floating),b=y.height,S=y.width;return v!==S||h!==b?{reset:{rects:!0}}:{}}}}const mg=M.div(zi||(zi=k([`
  position: absolute;
  pointer-events: none;
  width: `,`px;
  height: `,`px;
  fill: none;

  :empty + & {
    display: none;
  }

  & > svg {
    display: block;
    transform-origin: `,"px ",`px;
  }

  [data-placement^='top'] > & {
    bottom: -`,`px;
  }

  [data-placement^='right'] > & {
    left: -`,`px;

    & > svg {
      transform: rotate(90deg);
    }
  }

  [data-placement^='left'] > & {
    right: -`,`px;

    & > svg {
      transform: rotate(-90deg);
    }
  }

  [data-placement^='bottom'] > & {
    top: -`,`px;

    & > svg {
      transform: rotate(180deg);
    }
  }
`])),ot,ot,ot/2,ot/2,ot,ot,ot,ot),bg=M.path(_i||(_i=k([`
  fill: var(--card-shadow-outline-color);
`]))),yg=M.path(Gi||(Gi=k([`
  fill: var(--card-bg-color);
`]))),xg=p.forwardRef(function(e,n){return m(mg,{"data-ui":"Popover__arrow",...e,ref:n,children:K("svg",{width:ot,height:vg,viewBox:"0 0 27 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[m(bg,{d:"M1.18708 1C3.29803 1.0011 5.29585 1.95479 6.62414 3.59561L11.1683 9.20895C12.369 10.6922 14.631 10.6922 15.8317 9.20894L20.3759 3.59561C21.7042 1.95478 23.702 1.0011 25.8129 1H21.9436C21.0533 1.49255 20.2545 2.15618 19.5986 2.96641L15.0545 8.57975C14.254 9.56855 12.746 9.56855 11.9455 8.57975L7.40139 2.96642C6.74548 2.15618 5.94673 1.49255 5.05643 1H1.18708Z"}),m(yg,{d:"M1.18342 0C3.59749 0 5.88246 1.0901 7.40138 2.96642L11.9455 8.57975C12.746 9.56855 14.254 9.56855 15.0545 8.57975L19.5986 2.96641C21.1175 1.0901 23.4025 0 25.8166 0H27H0H1.18342Z"})]})})});function wg(t){const{$boundaryWidth:e}=t;return{"&:not([hidden])":{display:"flex"},flexDirection:"column",width:"max-content",minWidth:"min-content",maxWidth:typeof e=="number"?"".concat(e-kt*2,"px"):void 0}}const Sg=p.memo(M(Je)(wg)),Eg=p.memo(M(Ol)(Hi||(Hi=k([`
  max-height: inherit;
  max-width: inherit;
`])))),Nl=p.memo(p.forwardRef(function(e,n){const{__unstable_margins:r,arrow:o,arrowRef:i,arrowX:a,arrowY:s,boundaryWidth:l,children:c,padding:u,placement:d,overflow:f,radius:g,scheme:v,shadow:h,strategy:y,style:b,tone:S,width:x="auto",x:w,y:C,...E}=e,{zIndex:T}=cr(),D=p.useMemo(()=>r||kl,[r]),I=(w??0)+D[3],O=(C??0)+D[0],P=p.useMemo(()=>({position:y,top:O,left:I,zIndex:T,...b}),[y,b,I,O,T]),F=d&&cl[d.split("-")[0]],A=p.useMemo(()=>{const z={left:a!==null?a:void 0,top:s!==null?s:void 0,right:void 0,bottom:void 0};return F&&(z[F]=0-ot),z},[a,s,F]);return K(Sg,{...E,$boundaryWidth:l,"data-placement":d,"data-ui":"Popover",radius:g,ref:n,scheme:v,shadow:h,sizing:"border",style:P,tone:S,children:[m(Eg,{"data-ui":"Popover__wrapper",flex:1,overflow:f,padding:u,sizing:"border",width:x,children:c}),o&&m(xg,{ref:i,style:A})]})}));Nl.displayName="PopoverCard";const dr=p.memo(p.forwardRef(function(e,n){var r,o,i,a,s;const l=mt(),c=lr(),{__unstable_margins:u=kl,arrow:d=!0,boundaryElement:f=c.element,children:g,constrainSize:v=!1,content:h,disabled:y,fallbackPlacements:b,matchReferenceWidth:S,open:x,overflow:w="hidden",padding:C,placement:E="bottom",portal:T,preventOverflow:D=!0,radius:I=3,referenceElement:O,scheme:P,shadow:F=3,tone:A="inherit",width:z="auto",zOffset:V=(r=l.sanity.layer)==null?void 0:r.popover.zOffset,...H}=e,X=(o=ml(f))==null?void 0:o.border,Y=R(C),U=R(I),L=R(F),G=R(z),te=R(V),ye=Me(n),ne=p.useRef(null),oe="viewport",ge=p.useMemo(()=>{const be=[];return(v||D)&&be.push(Ks({boundary:f||void 0,fallbackPlacements:b,padding:kt,rootBoundary:oe})),be.push(Ys({mainAxis:d?gg:0})),(v||S)&&be.push(hg({apply(ze){let{availableWidth:wr,availableHeight:Sr,elements:Vt,referenceWidth:qt}=ze;S&&(Vt.floating.style.width="".concat(qt,"px")),v&&(Vt.floating.style.maxWidth="".concat(wr,"px"),Vt.floating.style.maxHeight="".concat(Sr,"px"))},boundaryElement:f,constrainSize:v,margins:u,matchReferenceWidth:S,padding:kt})),D&&be.push(Xs({boundary:f||void 0,rootBoundary:oe,padding:kt})),d&&be.push(Zs({element:ne,padding:kt})),be.push(dd({boundary:f||void 0,padding:kt,strategy:"referenceHidden"})),be},[d,f,v,b,u,S,D]),de=p.useMemo(()=>({middleware:ge,placement:E,whileElementsMounted:Js}),[ge,E]),{x:he,y:we,placement:Se,reference:ve,floating:me,middlewareData:Re,strategy:Ae}=Qs(de),ke=(i=Re.hide)==null?void 0:i.referenceHidden,ie=(a=Re.arrow)==null?void 0:a.x,Ce=(s=Re.arrow)==null?void 0:s.y,xe=p.useCallback(be=>{ne.current=be},[]),Ie=p.useCallback(be=>{ye.current=be,me(be)},[me,ye]),We=p.useCallback(be=>{ve(be);const ze=g==null?void 0:g.ref;typeof ze=="function"?ze(be):ze&&(ze.current=be)},[g,ve]),Ve=p.useMemo(()=>!g||O?null:p.cloneElement(g,{ref:We}),[g,O,We]);if(p.useEffect(()=>{ve(O||null)},[ve,O]),y)return g||m(Ge,{});const yt=m(Ml,{zOffset:te,children:m(Nl,{...H,__unstable_margins:u,arrow:d,arrowRef:xe,arrowX:ie,arrowY:Ce,boundaryWidth:D?X==null?void 0:X.width:void 0,hidden:ke,overflow:w,padding:Y,placement:Se,radius:U,ref:Ie,scheme:P,shadow:L,strategy:Ae,tone:A,x:he,y:we,width:G,children:h})});return K(Ge,{children:[x&&m(Ge,{children:T?m(Co,{__unstable_name:typeof T=="string"?T:void 0,children:yt}):yt}),Ve]})}));dr.displayName="Popover";function Cg(){return ee(ji||(ji=k([`
    position: relative;

    &:not([hidden]) {
      display: inline-block;
    }

    &[data-read-only] {
      outline: 1px solid red;
    }
  `])))}function Ig(t){const{theme:e}=t,{focusRing:n,input:r}=e.sanity,o=e.sanity.color.input,i=(r.radio.size-r.radio.markSize)/2;return ee(Ui||(Ui=k([`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    border-radius: `,`;
    border: none;

    /* enabled */
    & + span {
      display: block;
      position: relative;
      height: `,`;
      width: `,`;
      border-radius: `,`;
      background: `,`;
      box-shadow: `,`;

      &::after {
        content: '';
        position: absolute;
        top: `,`;
        left: `,`;
        height: `,`;
        width: `,`;
        border-radius: `,`;
        background: `,`;
        opacity: 0;
      }
    }

    /* focused */
    &:not(:disabled):focus + span {
      box-shadow: `,`;
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: `,`;
    }

    &:checked + span::after {
      opacity: 1;
    }

    /* read only */
    &[data-read-only] + span {
      box-shadow: 0 0 0 1px `,`;
      background: `,`;

      &::after {
        background: `,`;
      }
    }

    /* disabled */
    &:not([data-read-only]):disabled + span {
      box-shadow: 0 0 0 1px `,`;
      background: `,`;

      &::after {
        background: `,`;
      }
    }
  `])),_(r.radio.size/2),_(r.radio.size),_(r.radio.size),_(r.radio.size/2),o.default.enabled.bg,De({color:o.default.enabled.border,width:r.border.width}),_(i),_(i),_(r.radio.markSize),_(r.radio.markSize),_(r.radio.markSize/2),o.default.enabled.fg,at({border:{width:r.border.width,color:o.default.enabled.border},focusRing:n}),De({color:o.default.enabled.border,width:r.border.width}),o.default.readOnly.border,o.default.readOnly.bg,o.default.readOnly.fg,o.default.disabled.border,o.default.disabled.bg,o.default.disabled.fg)}const Dg=M.div(Cg),Rg=M.input(Ig);p.forwardRef(function(e,n){const{className:r,disabled:o,style:i,customValidity:a,readOnly:s,...l}=e,c=Me(n);return yn(c,a),K(Dg,{className:r,"data-ui":"Radio",style:i,children:[m(Rg,{"data-read-only":!o&&s?"":void 0,...l,disabled:o||s,readOnly:s,ref:c,type:"radio"}),m("span",{})]})});function Og(){return ee(Wi||(Wi=k([`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `])))}function Pg(t){const{theme:e}=t,n=e.sanity.fonts.text;return ee(Vi||(Vi=k([`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: `,`;
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;

    &:disabled {
      opacity: 1;
    }
  `])),n.family)}function Ag(t){const{theme:e}=t,{focusRing:n,input:r}=e.sanity,o=e.sanity.color.input;return ee(qi||(qi=k([`
    /* enabled */
    background-color: `,`;
    color: `,`;
    box-shadow: `,`;

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: `,`;
        color: `,`;
        box-shadow: `,`;
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: `,`;
    }

    /* read-only */
    &[data-read-only] {
      background-color: `,`;
      color: `,`;
      box-shadow: `,`;
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: `,`;
      color: `,`;
      box-shadow: `,`;
    }
  `])),o.default.enabled.bg,o.default.enabled.fg,De({color:o.default.enabled.border,width:r.border.width}),o.default.hovered.bg,o.default.hovered.fg,De({color:o.default.hovered.border,width:r.border.width}),at({border:{width:r.border.width,color:o.default.enabled.border},focusRing:n}),o.default.readOnly.bg,o.default.readOnly.fg,De({color:o.default.readOnly.border,width:r.border.width}),o.default.disabled.bg,o.default.disabled.fg,De({color:o.default.disabled.border,width:r.border.width}))}function Tg(t){return{fontSize:_(t.fontSize),lineHeight:_(t.lineHeight)}}function Bg(t){const{theme:e,$fontSize:n}=t,{sizes:r}=e.sanity.fonts.text;return J(e.sanity.media,n,o=>Tg(r[o]||r[2]))}function Mg(){return[lt,Pg,Ag,Bg,$f]}function kg(t){const{theme:e}=t,n=e.sanity.color.input;return ee(Ki||(Ki=k([`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    --card-fg-color: `,`;

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + && {
        --card-fg-color: `,`;
      }
    }

    /* disabled */
    select:disabled + && {
      --card-fg-color: `,`;
    }

    /* read-only */
    select[data-read-only] + && {
      --card-fg-color: `,`;
    }
  `])),n.default.enabled.fg,n.default.hovered.fg,n.default.disabled.fg,n.default.readOnly.fg)}const Io={root:Og,input:Mg,iconBox:kg},Ng=M.div(Io.root),Lg=M.select(Io.input),$g=M(re)(Io.iconBox),aw=p.forwardRef(function(e,n){const{children:r,customValidity:o,disabled:i,fontSize:a=2,padding:s=3,radius:l=1,readOnly:c,space:u=3,...d}=e,f=Me(n);return yn(f,o),K(Ng,{"data-ui":"Select",children:[m(Lg,{"data-read-only":!i&&c?"":void 0,"data-ui":"Select",...d,$fontSize:R(a),$padding:R(s),$radius:R(l),$space:R(u),disabled:i||c,ref:f,children:r}),m($g,{padding:s,children:m(Ee,{size:a,children:m(ud,{})})})]})}),Fg={"&&:not([hidden])":{display:"grid"},'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"},gridTemplateColumns:"minmax(0, 1fr)",gridAutoRows:"min-content"};function zg(){return Fg}function _g(t){const{theme:e}=t,{media:n,space:r}=e.sanity;return J(n,t.$space,o=>({gridGap:_(r[o])}))}const Gg=M(re)(zg,_g),Ht=p.forwardRef(function(e,n){const{as:r,space:o,...i}=e;return m(Gg,{"data-as":typeof r=="string"?r:void 0,"data-ui":"Stack",...i,$space:R(o),forwardedAs:r,ref:n})});function Hg(){return ee(Yi||(Yi=k([`
    position: relative;
    &:not([hidden]) {
      display: inline-block;
    }
  `])))}function jg(){return ee(Xi||(Xi=k([`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    padding: 0;
    margin: 0;

    /* Place the input element above the representation element */
    z-index: 1;
  `])))}function Ug(t){const{theme:e}=t,{focusRing:n,input:r}=e.sanity,o=e.sanity.color.button.default;return ee(Zi||(Zi=k([`
    --switch-bg-color: `,`;
    --switch-fg-color: `,`;
    --switch-box-shadow: none;

    &:not([hidden]) {
      display: block;
    }
    position: relative;
    width: `,`;
    height: `,`;
    border-radius: `,`;

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      box-shadow: var(--switch-box-shadow);
      border-radius: inherit;
    }

    /* Focus styles */
    input:focus + && {
      --switch-box-shadow: `,`;
    }

    input:focus:not(:focus-visible) + && {
      --switch-box-shadow: none;
    }

    input:checked + && {
      --switch-bg-color: `,`;
      --switch-fg-color: `,`;
    }

    @media (hover: hover) {
      input:not(:disabled):hover + && {
        --switch-bg-color: `,`;
        --switch-fg-color: `,`;
      }

      input:not(:disabled):checked:hover + && {
        --switch-bg-color: `,`;
        --switch-fg-color: `,`;
      }
    }

    input:not([data-read-only]):disabled + && {
      --switch-bg-color: `,`;
      --switch-fg-color: `,`;
    }
  `])),o.default.enabled.bg,o.default.enabled.fg,_(r.switch.width),_(r.switch.height),_(r.switch.height/2),at({focusRing:n}),o.positive.enabled.bg,o.positive.enabled.fg,o.default.hovered.bg,o.default.hovered.fg,o.positive.hovered.bg,o.positive.hovered.fg,o.default.disabled.bg,o.default.disabled.fg)}function Wg(t){const{theme:e}=t,{input:n}=e.sanity;return ee(Ji||(Ji=k([`
    &:not([hidden]) {
      display: block;
    }
    background-color: var(--switch-bg-color);
    position: absolute;
    left: 0;
    top: 0;
    width: `,`;
    height: `,`;
    border-radius: `,`;
  `])),_(n.switch.width),_(n.switch.height),_(n.switch.height/2))}function Vg(t){const{$indeterminate:e,theme:n}=t,{input:r}=n.sanity,o=r.switch.width,i=r.switch.height,a=r.switch.padding,s=i-r.switch.padding*2,l=o-a*2-s,c=o/2-s/2-a,u=e!==!0&&t.$checked===!0;return ee(Qi||(Qi=k([`
    &:not([hidden]) {
      display: block;
    }
    position: absolute;
    left: `,`;
    top: `,`;
    height: `,`;
    width: `,`;
    border-radius: `,`;
    transition-property: transform;
    transition-duration: `,`ms;
    transition-timing-function: `,`;
    background: var(--switch-fg-color);
    transform: translate3d(0, 0, 0);

    `,`

    `,`
  `])),_(a),_(a),_(s),_(s),_(s/2),r.switch.transitionDurationMs,r.switch.transitionTimingFunction,u&&ee(ea||(ea=k([`
      transform: translate3d(`,`px, 0, 0);
    `])),l),e&&ee(ta||(ta=k([`
      transform: translate3d(`,`px, 0, 0);
    `])),c))}const qg=M.span(Hg),Kg=M.input(jg),Yg=M.span(Ug),Xg=M.span(Wg),Zg=M.span(Vg);p.forwardRef(function(e,n){const{checked:r,className:o,disabled:i,indeterminate:a,readOnly:s,style:l,...c}=e,u=Me(n);return p.useEffect(()=>{u.current&&(u.current.indeterminate=a||!1)},[a,u]),K(qg,{className:o,"data-ui":"Switch",style:l,children:[m(Kg,{"data-read-only":!i&&s?"":void 0,...c,checked:a!==!0&&r,disabled:i||s,type:"checkbox",ref:u}),K(Yg,{"aria-hidden":!0,"data-name":"representation",children:[m(Xg,{}),m(Zg,{$checked:r,$indeterminate:a})]})]})});const Jg=M.span(wl),Qg=M.span(na||(na=k([`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`]))),ev=M.textarea(yo,Sl,El),tv=M.div(lt,Cl);p.forwardRef(function(e,n){const{border:r=!0,customValidity:o,disabled:i=!1,fontSize:a=2,padding:s=3,radius:l=1,weight:c,...u}=e,d=Me(n),f=sr();return yn(d,o),m(Jg,{"data-ui":"TextArea",children:K(Qg,{children:[m(ev,{"data-as":"textarea","data-scheme":f.scheme,"data-tone":f.tone,...u,$fontSize:R(a),$padding:R(s),$scheme:f.scheme,$space:R(0),$tone:f.tone,$weight:c,disabled:i,ref:d}),m(tv,{$radius:R(l),$scheme:f.scheme,$tone:f.tone,"data-border":r?"":void 0,"data-scheme":f.scheme,"data-tone":f.tone})]})})});const nv={zIndex:2},rv=M(Je).attrs({forwardedAs:"span"})(wl),ov=M.span(ra||(ra=k([`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`]))),iv=M(Je).attrs({forwardedAs:"span"})(oa||(oa=k([`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`]))),av=M(Je).attrs({forwardedAs:"span"})(ia||(ia=k([`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & > span {
    display: block;
    margin: -1px;
  }
`]))),sv=M.input(yo,Sl,El),lv=M.span(lt,Cl),cv=M(re)(aa||(aa=k([`
  position: absolute;
  top: 0;
  left: 0;
`]))),dv=M(re)(sa||(sa=k([`
  position: absolute;
  top: 0;
  right: 0;
`]))),uv=M(Je)(la||(la=k([`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`]))),fv=p.forwardRef(function(e,n){const{border:r=!0,clearButton:o,disabled:i=!1,fontSize:a=2,icon:s,iconRight:l,onClear:c,padding:u=3,prefix:d,radius:f=1,readOnly:g,space:v=3,suffix:h,customValidity:y,type:b="text",weight:S,...x}=e,w=Me(n),C=sr(),E=R(a),T=R(u),D=R(f),I=R(v),O=Boolean(o),P=Boolean(s),F=Boolean(l),A=Boolean(h),z=Boolean(d);yn(w,y);const V=p.useCallback(ne=>{ne.preventDefault(),ne.stopPropagation()},[]),H=p.useCallback(ne=>{var oe;ne.preventDefault(),ne.stopPropagation(),c&&c(),(oe=w.current)==null||oe.focus()},[c,w]),X=p.useMemo(()=>d&&m(iv,{borderTop:!0,borderLeft:!0,borderBottom:!0,radius:D,sizing:"border",tone:"inherit",children:m("span",{children:d})}),[d,D]),Y=p.useMemo(()=>K(lv,{$hasPrefix:z,$hasSuffix:A,$radius:D,$scheme:C.scheme,$tone:C.tone,"data-border":r?"":void 0,"data-scheme":C.scheme,"data-tone":C.tone,children:[s&&m(cv,{padding:T,children:K(Ee,{size:E,children:[p.isValidElement(s)&&s,tt.isValidElementType(s)&&p.createElement(s)]})}),!O&&l&&m(dv,{padding:T,children:K(Ee,{size:E,children:[p.isValidElement(l)&&l,tt.isValidElementType(l)&&p.createElement(l)]})})]}),[r,E,s,l,T,D,C,O,z,A]),U=p.useMemo(()=>T.map(ne=>ne===0?0:ne===1||ne===2?1:ne-2),[T]),L=p.useMemo(()=>T.map(ne=>ne===0||ne===1?0:ne===2?1:ne-1),[T]),G=p.useMemo(()=>typeof o=="object"?o:ut,[o]),te=p.useMemo(()=>!i&&!g&&o&&m(uv,{forwardedAs:"span",padding:U,style:nv,tone:y?"critical":"inherit",children:m(ft,{"aria-label":"Clear","data-qa":"clear-button",fontSize:E,icon:el,mode:"bleed",padding:L,radius:D,...G,onClick:H,onMouseDown:V})}),[o,U,L,G,y,i,E,H,V,D,g]),ye=p.useMemo(()=>h&&m(av,{borderTop:!0,borderRight:!0,borderBottom:!0,radius:D,sizing:"border",tone:"inherit",children:m("span",{children:h})}),[D,h]);return K(rv,{"data-ui":"TextInput",tone:C.tone,children:[X,K(ov,{children:[m(sv,{"data-as":"input","data-scheme":C.scheme,"data-tone":C.tone,...x,$fontSize:E,$iconLeft:P,$iconRight:F||O,$padding:T,$scheme:C.scheme,$space:I,$tone:C.tone,$weight:S,disabled:i,readOnly:g,ref:w,type:b}),Y,te]}),ye]})}),pv=M.div(ca||(ca=k([`
  position: absolute;
  pointer-events: none;
  width: 15px;
  height: 15px;
  fill: none;

  :empty + & {
    display: none;
  }

  & > svg {
    display: block;
    transform-origin: 7.5px 7.5px;
  }

  /* position: absolute;
  width: 15px;
  height: 15px;
  fill: none;

  :empty + & {
    display: none;
  }

  & > svg {
    &:not([hidden]) {
      display: block;
    }
    transform-origin: 7.5px 7.5px;
  } */

  [data-placement^='top'] > & {
    bottom: -27px;
  }

  [data-placement^='right'] > & {
    left: -27px;

    & > svg {
      transform: rotate(90deg);
    }
  }

  [data-placement^='left'] > & {
    right: -27px;

    & > svg {
      transform: rotate(-90deg);
    }
  }

  [data-placement^='bottom'] > & {
    top: -27px;

    & > svg {
      transform: rotate(180deg);
    }
  }
`]))),gv=M.path(da||(da=k([`
  fill: var(--card-shadow-outline-color);
`]))),vv=M.path(ua||(ua=k([`
  fill: var(--card-bg-color);
`]))),hv=p.forwardRef(function(e,n){const{...r}=e;return m(pv,{"data-ui":"Tooltip__arrow",...r,ref:n,children:K("svg",{width:"15",height:"15",viewBox:"0 0 15 15",children:[m(gv,{d:"M11.5266 1C11.032 1.32802 10.5837 1.73105 10.1995 2.20057L9.04792 3.6081C8.24771 4.58614 6.7523 4.58614 5.95209 3.6081L4.80047 2.20057C4.41632 1.73105 3.96796 1.32802 3.47341 1H0.156727C1.65639 1 3.07687 1.67313 4.02651 2.83381L5.17813 4.24134C6.37844 5.70839 8.62156 5.70839 9.82187 4.24134L10.9735 2.83381C11.9231 1.67313 13.3436 1 14.8433 1H11.5266Z"}),m(vv,{d:"M0.156725 0C1.95632 0 3.66089 0.80776 4.80047 2.20057L5.95209 3.6081C6.75229 4.58614 8.24771 4.58614 9.04791 3.6081L10.1995 2.20057C11.3391 0.80776 13.0437 0 14.8433 0H15H0H0.156725Z"})]})})}),mv=M(So)(fa||(fa=k([`
  pointer-events: none;
`]))),sw=p.forwardRef(function(e,n){var r,o,i;const a=lr(),s=mt(),{boundaryElement:l=a==null?void 0:a.element,children:c,content:u,disabled:d,fallbackPlacements:f,padding:g,placement:v="bottom",portal:h,scheme:y,shadow:b=2,zOffset:S=(r=s.sanity.layer)==null?void 0:r.tooltip.zOffset,...x}=e,w=R(f),C=Me(n),[E,T]=p.useState(null),D=p.useRef(null),I="viewport",O=p.useMemo(()=>{const ie=[];return ie.push(Ks({boundary:l||void 0,fallbackPlacements:w,padding:4,rootBoundary:I})),ie.push(Ys({mainAxis:3})),ie.push(Xs({boundary:l||void 0,rootBoundary:I,padding:4})),ie.push(Zs({element:D,padding:2})),ie},[l,w]),{x:P,y:F,placement:A,reference:z,floating:V,middlewareData:H,update:X,strategy:Y}=Qs({middleware:O,placement:v,whileElementsMounted:Js}),U=p.useMemo(()=>({position:Y,top:F??0,left:P??0}),[Y,P,F]),L=A&&cl[A.split("-")[0]],G=(o=H.arrow)==null?void 0:o.x,te=(i=H.arrow)==null?void 0:i.y,ye=p.useMemo(()=>{const ie={left:G!==null?G:void 0,top:te!==null?te:void 0,right:void 0,bottom:void 0};return L&&(ie[L]=-15),ie},[G,te,L]),[ne,oe]=p.useState(!1),ge=p.useCallback(()=>oe(!1),[]),de=p.useCallback(()=>oe(!0),[]),he=p.useCallback(()=>oe(!0),[]),we=p.useCallback(()=>oe(!1),[]);p.useEffect(()=>{if(!ne)return;function ie(Ce){if(!E)return;E===Ce.target||Ce.target instanceof Node&&E.contains(Ce.target)||(oe(!1),window.removeEventListener("mousemove",ie))}return window.addEventListener("mousemove",ie),()=>{window.removeEventListener("mousemove",ie)}},[ne,E]),p.useEffect(()=>{d&&oe(!1)},[d]),p.useEffect(()=>{u||oe(!1)},[u]),p.useEffect(()=>z(E),[z,E]);const Se=p.useCallback(ie=>{D.current=ie,X()},[X]),ve=p.useCallback(ie=>{C.current=ie,V(ie)},[V,C]),me=c==null?void 0:c.ref,Re=p.useCallback(ie=>{typeof me=="function"?me(ie):me&&(me.current=ie),T(ie)},[me]),Ae=p.useMemo(()=>c?p.cloneElement(c,{onBlur:ge,onFocus:de,onMouseEnter:he,onMouseLeave:we,ref:Re}):null,[c,ge,de,he,we,Re]);if(!Ae)return m(Ge,{});if(d)return Ae;const ke=m(mv,{"data-ui":"Tooltip",...x,ref:ve,style:U,zOffset:S,children:K(Je,{"data-ui":"Tooltip__card","data-placement":A,padding:g,radius:2,scheme:y,shadow:b,children:[u,m(hv,{ref:Se,style:ye})]})});return K(Ge,{children:[Ae,ne&&m(Ge,{children:h?m(Co,{__unstable_name:typeof h=="string"?h:void 0,children:ke}):ke})]})}),bv=M.div(pa||(pa=k([`
  line-height: 0;
`]))),yv=M(re)(ga||(ga=k([`
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`]))),xv=go(va||(va=k([`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`]))),wv=M(qs)(ha||(ha=k([`
  animation: `,` 500ms linear infinite;
`])),xv);function Sv(t){const{children:e,id:n,onSelect:r,selected:o,value:i}=t,a=p.useCallback(()=>{setTimeout(()=>{r(i)},0)},[r,i]),s=p.useCallback(l=>{l.key==="Enter"&&!tg(l.currentTarget)&&a()},[a]);return m("li",{"aria-selected":o,"data-ui":"AutocompleteOption",id:n,role:"option",onClick:a,onKeyDown:s,children:e})}function Ev(t,e){return e.type==="input/change"?{...t,activeValue:null,focused:!0,query:e.query}:e.type==="input/focus"?{...t,focused:!0}:e.type==="root/blur"?{...t,focused:!1,query:null}:e.type==="root/clear"?{...t,activeValue:null,query:null,value:null}:e.type==="root/escape"?{...t,focused:!1,query:null}:e.type==="root/open"?{...t,query:t.query||e.query}:e.type==="root/setActiveValue"?{...t,activeValue:e.value,listFocused:e.listFocused||t.listFocused}:e.type==="root/setListFocused"?{...t,listFocused:e.listFocused}:e.type==="value/change"?{...t,activeValue:e.value,query:null,value:e.value}:t}const Cv=["Control","Shift","Alt","Enter","Home","End","PageUp","PageDown","Meta","Tab","CapsLock"],Iv="bottom-start",Dv=["bottom-start","top-start"],Rv=(t,e)=>e?e.value:t,Ov=(t,e)=>e.value.toLowerCase().indexOf(t.toLowerCase())>-1;p.forwardRef(function(e,n){const{border:r=!0,customValidity:o,disabled:i,filterOption:a,fontSize:s=2,icon:l,id:c,listBox:u=ut,loading:d,onBlur:f,onChange:g,onFocus:v,onQueryChange:h,onSelect:y,openButton:b,options:S,padding:x=3,popover:w=ut,prefix:C,radius:E=3,readOnly:T,relatedElements:D,renderOption:I,renderPopover:O,renderValue:P=Rv,suffix:F,value:A,...z}=e,[V,H]=p.useReducer(Ev,{activeValue:A||null,focused:!1,listFocused:!1,query:null,value:A||null}),{activeValue:X,focused:Y,listFocused:U,query:L,value:G}=V,te=p.useCallback(W=>{let{value:ue}=W;return m(Je,{"data-as":"button",padding:x,radius:2,tone:"inherit",children:m(Ee,{size:s,textOverflow:"ellipsis",children:ue})})},[s,x]),ye=typeof I=="function"?I:te,ne=typeof a=="function"?a:Ov,oe=p.useRef(null),ge=p.useRef(null),de=p.useRef(null),he=p.useRef(null),we=p.useRef(!1),Se=p.useRef(G),ve=p.useRef(A),me=p.useRef(!1),Re=Me(n),Ae="".concat(c,"-listbox"),ke=Array.isArray(S)?S:bn,ie=R(x),Ce=p.useMemo(()=>G!==null?ke.find(W=>W.value===G):void 0,[ke,G]),xe=p.useMemo(()=>ke.filter(W=>L?ne(L,W):!0),[ne,ke,L]),Ie=xe.length,We=X?"".concat(c,"-option-").concat(X):void 0,Ve=L!==null&&d||Y&&L!==null,yt=p.useCallback(W=>{setTimeout(()=>{if(me.current)return;const ue=(D||[]).concat(oe.current?[oe.current]:[],ge.current?[ge.current]:[]);let Qe=!1;if(document.activeElement){for(const _e of ue)if(_e===document.activeElement||_e.contains(document.activeElement)){Qe=!0;break}}Qe===!1&&(H({type:"root/blur"}),me.current=!1,h&&h(null),f&&f(W))},0)},[f,h,D]),be=p.useCallback(W=>{const ue=he.current,Qe=W.target instanceof HTMLElement?W.target:null,_e=(ue==null?void 0:ue.contains(Qe))||!1;_e!==we.current&&(we.current=_e,H({type:"root/setListFocused",listFocused:_e}))},[]),ze=p.useCallback(W=>{var ue;H({type:"value/change",value:W}),me.current=!1,y&&y(W),Se.current=W,g&&g(W),h&&h(null),(ue=de.current)==null||ue.focus()},[g,y,h]),wr=p.useCallback(W=>{var ue,Qe;if(W.key==="ArrowDown"){if(W.preventDefault(),!Ie)return;const Yt=xe.find(Dr=>Dr.value===X),Mn=Yt?xe.indexOf(Yt):-1,Xt=xe[(Mn+1)%Ie];Xt&&H({type:"root/setActiveValue",value:Xt.value,listFocused:!0});return}if(W.key==="ArrowUp"){if(W.preventDefault(),!Ie)return;const Yt=xe.find(Dr=>Dr.value===X),Mn=Yt?xe.indexOf(Yt):-1,Xt=xe[Mn===-1?Ie-1:(Ie+Mn-1)%Ie];Xt&&H({type:"root/setActiveValue",value:Xt.value,listFocused:!0});return}if(W.key==="Escape"){H({type:"root/escape"}),me.current=!1,h&&h(null),(ue=de.current)==null||ue.focus();return}const _e=W.target,Ir=he.current;if((Ir===_e||Ir!=null&&Ir.contains(_e))&&!Cv.includes(W.key)){(Qe=de.current)==null||Qe.focus();return}},[X,xe,Ie,h]),Sr=p.useCallback(W=>{const ue=W.currentTarget.value;H({type:"input/change",query:ue}),h&&h(ue)},[h]),Vt=p.useCallback(W=>{Y||(H({type:"input/focus"}),v&&v(W))},[Y,v]),qt=p.useCallback(()=>{me.current=!0},[]),Er=p.useCallback(()=>{me.current=!1},[]),ed=p.useCallback(()=>{var W;H({type:"root/clear"}),Se.current="",g&&g(""),h&&h(null),(W=de.current)==null||W.focus()},[g,h]),Jo=p.useCallback(()=>{H({type:"input/focus"})},[]);p.useEffect(()=>{if(A!==ve.current){ve.current=A,A!==void 0&&(H({type:"value/change",value:A}),Se.current=A);return}A!==Se.current&&(Se.current=A||null,H({type:"value/change",value:A||null}))},[A]),p.useEffect(()=>{!Y&&Se.current&&H({type:"root/setActiveValue",value:Se.current})},[Y]),p.useEffect(()=>{const W=he.current;if(!W)return;const ue=xe.find(Qe=>Qe.value===X);if(ue){const Qe=xe.indexOf(ue),_e=W.childNodes[Qe];if(_e){if(ig(_e))return;dn(_e)}}},[X,xe]);const td=p.useCallback(W=>{de.current=W,Re.current=W},[Re]),nd=p.useMemo(()=>{if(!d&&!i&&G)return{"aria-label":"Clear",onFocus:Jo}},[i,Jo,d,G]),Qo=p.useMemo(()=>ie.map(W=>W===0?0:W===1||W===2?1:W-2),[ie]),ei=p.useMemo(()=>ie.map(W=>Math.max(W-1,0)),[ie]),Kt=p.useMemo(()=>typeof b=="object"?b:ut,[b]),ti=p.useCallback(W=>{H({type:"root/open",query:G?P(G,Ce):""}),Kt.onClick&&Kt.onClick(W),eg(()=>{var ue;return(ue=de.current)==null?void 0:ue.focus()})},[Ce,Kt,P,G]),rd=p.useMemo(()=>!i&&!T&&b?m(re,{"aria-hidden":Ve,padding:Qo,children:m(ft,{"aria-label":"Open",disabled:Ve,fontSize:s,icon:tl,mode:"bleed",padding:ei,...Kt,onClick:ti})}):void 0,[i,Ve,s,ti,b,Qo,ei,Kt,T]),od=p.useMemo(()=>L===null?G!==null?P(G,Ce):"":L,[Ce,L,P,G]),id=m(fv,{...z,"aria-activedescendant":We,"aria-autocomplete":"list","aria-expanded":Ve,"aria-owns":Ae,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",border:r,clearButton:nd,customValidity:o,disabled:i,fontSize:s,icon:l,iconRight:d&&wv,id:c,inputMode:"search",onChange:Sr,onClear:ed,onFocus:Vt,padding:ie,prefix:C,radius:E,readOnly:T,ref:td,role:"combobox",spellCheck:!1,suffix:F||rd,value:od}),ni=p.useCallback(W=>{var ue;W.key==="Tab"&&U&&((ue=de.current)==null||ue.focus())},[U]),Cr=p.useMemo(()=>xe.length===0?null:m(yv,{"data-ui":"AutoComplete__results",onKeyDown:ni,padding:1,...u,tabIndex:-1,children:m(Ht,{as:"ul","aria-multiselectable":!1,"data-ui":"AutoComplete__resultsList",id:Ae,ref:he,role:"listbox",space:1,children:xe.map(W=>{const ue=X!==null?W.value===X:Ce===W;return m(Sv,{id:"".concat(c,"-option-").concat(W.value),onSelect:ze,selected:ue,value:W.value,children:p.cloneElement(ye(W),{disabled:d,selected:ue,tabIndex:U&&ue?0:-1})},W.value)})})}),[X,Ce,xe,ze,ni,c,u,Ae,U,d,ye]),ad=p.useMemo(()=>O?O({content:Cr,hidden:!Ve,inputElement:de.current,onMouseEnter:qt,onMouseLeave:Er},ge):Ie===0?null:m(dr,{arrow:!1,constrainSize:!0,content:Cr,fallbackPlacements:Dv,matchReferenceWidth:!0,onMouseEnter:qt,onMouseLeave:Er,open:Ve,overflow:"auto",placement:Iv,portal:!0,radius:E,ref:ge,referenceElement:de.current,...w}),[Cr,Ve,Ie,qt,Er,w,E,O]);return K(bv,{"data-ui":"Autocomplete",onBlur:yt,onFocus:be,onKeyDown:wr,ref:oe,children:[id,ad]})});const Pv=M.ol(ma||(ma=k([`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
  white-space: nowrap;
  line-height: 0;
`]))),Av=M(ft)(ba||(ba=k([`
  appearance: none;
  margin: -4px;
`])));p.forwardRef(function(e,n){const{children:r,maxLength:o,separator:i,space:a=2,...s}=e,l=R(a),[c,u]=p.useState(!1),[d,f]=p.useState(null),[g,v]=p.useState(null),h=p.useCallback(()=>u(!1),[]),y=p.useCallback(()=>u(!0),[]);mo(h,[d,g]);const b=p.useMemo(()=>p.Children.toArray(r).filter(x=>p.isValidElement(x)),[r]),S=p.useMemo(()=>{const x=b.length;if(o&&x>o){const w=Math.ceil(o/2),C=Math.floor(o/2);return[...b.slice(0,w-1),m(dr,{constrainSize:!0,content:m(Ht,{as:"ol",overflow:"auto",padding:l,space:l,children:b.slice(w-1,x-C)}),open:c,placement:"top",portal:!0,ref:v,children:m(Av,{fontSize:1,mode:"bleed",onClick:c?h:y,padding:1,ref:f,selected:c,text:"…"})},"button"),...b.slice(x-C)]}return b},[h,y,o,c,b,l]);return m(Pv,{"data-ui":"Breadcrumbs",...s,ref:n,children:S.map((x,w)=>K(p.Fragment,{children:[w>0&&m(re,{"aria-hidden":!0,as:"li",paddingX:l,children:i||m(Ee,{muted:!0,children:"/"})}),m(re,{as:"li",children:x})]},w))})});function Tv(t){let{theme:e}=t;const n=e.sanity.color.base;return{"&:not([hidden])":{display:"flex"},top:0,left:0,right:0,bottom:0,alignItems:"center",justifyContent:"center",outline:"none",background:n.shadow.umbra}}function Bv(t){const{theme:e}=t,{media:n}=e.sanity;return J(n,t.$position,r=>({"&&":{position:r}}))}const to=Symbol.for("@sanity/ui/context/dialog");ce[to]=ce[to]||p.createContext({version:0});const Mv=ce[to];function kv(){return p.useContext(Mv)}function no(t,e,n){return!t||!e?!0:Qr(t,n)||Qr(e,n)}const Nv=M(So)(Il,Tv,Bv),Lv=M(Ol)(ya||(ya=k([`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`]))),$v=M(Je)(xa||(xa=k([`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
`]))),Fv=M(it)(wa||(wa=k([`
  flex: 1;
  min-height: 0;
  width: 100%;
`]))),zv=M(Je)(Sa||(Sa=k([`
  position: relative;
  z-index: 2;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom: 1px solid var(--card-hairline-soft-color);
  }
`]))),_v=M(re)(Ea||(Ea=k([`
  position: relative;
  z-index: 1;
  overflow: auto;
  outline: none;
`]))),Gv=M(re)(Ca||(Ca=k([`
  position: relative;
  z-index: 3;
  border-top: 1px solid var(--card-hairline-soft-color);
`]))),Hv=p.forwardRef(function(e,n){var r;const{__unstable_autoFocus:o,__unstable_hideCloseButton:i,children:a,contentRef:s,footer:l,header:c,id:u,onClickOutside:d,onClose:f,portal:g,radius:v,scheme:h,shadow:y,width:b}=e,S=Eo(),x=g?((r=S.elements)==null?void 0:r[g])||null:S.element,w=lr().element,C=R(v),E=R(y),T=R(b),D=Me(n),[I,O]=p.useState(null),P=p.useRef(null),F=cr(),{isTopLayer:A}=F,z="".concat(u,"_label"),V=Boolean(f)&&i===!1,H=Boolean(c)||V;p.useEffect(()=>{o&&D.current&&dn(D.current)},[o,D]),bl(p.useCallback(U=>{if(!A||!f)return;const L=document.activeElement;L&&!no(w,x,L)||U.key==="Escape"&&(U.preventDefault(),U.stopPropagation(),f())},[w,A,f,x])),mo(p.useCallback(U=>{if(!A||!d)return;const L=U.target;L&&!no(w,x,L)||d()},[w,A,d,x]),[I]);const X=p.useCallback(U=>{O(U),D.current=U},[D]),Y=p.useCallback(U=>{P.current=U,typeof s=="function"?s(U):s&&(s.current=U)},[s]);return m(Lv,{"data-ui":"DialogCard",width:T,children:m($v,{radius:C,ref:X,scheme:h,shadow:E,children:K(Fv,{direction:"column",children:[H&&m(zv,{children:K(it,{children:[m(re,{flex:1,padding:4,children:c&&m(Ee,{id:z,weight:"semibold",children:c})}),V&&m(re,{padding:2,children:m(ft,{"aria-label":"Close dialog",disabled:!f,icon:el,mode:"bleed",onClick:f,padding:3})})]})}),m(_v,{flex:1,ref:Y,tabIndex:-1,children:a}),l&&m(Gv,{children:l})]})})})});p.forwardRef(function(e,n){var r,o;const i=kv(),a=mt(),{__unstable_autoFocus:s=!0,__unstable_hideCloseButton:l=!1,cardRadius:c=3,cardShadow:u=4,children:d,contentRef:f,footer:g,header:v,id:h,onActivate:y,onClickOutside:b,onClose:S,onFocus:x,padding:w=4,portal:C,position:E=i.position||"fixed",scheme:T,width:D=0,zOffset:I=i.zOffset||((r=a.sanity.layer)==null?void 0:r.dialog.zOffset),...O}=e,P=Eo(),F=C?((o=P.elements)==null?void 0:o[C])||null:P.element,A=lr().element,z=R(c),V=R(w),H=R(E),X=R(D),Y=R(I),U=p.useRef(null),L=p.useRef(null),G=p.useRef(null),te=p.useRef(null),ye=p.useCallback(de=>{x==null||x(de);const he=de.target,we=G.current;if(we&&he===U.current){Bl(we);return}if(we&&he===L.current){dn(we);return}ct(de.target)&&(te.current=de.target)},[x]),ne="".concat(h,"_label"),oe=p.useRef(),ge=p.useCallback(()=>{oe.current&&clearTimeout(oe.current),oe.current=setTimeout(()=>{const de=document.activeElement;if(de&&!no(A,F,de)){const he=te.current;if(!he||!document.body.contains(he)){const we=G.current;we&&dn(we);return}he.focus()}},0)},[A,F]);return m(Co,{__unstable_name:C,children:K(Nv,{...O,$padding:V,$position:H,"aria-labelledby":ne,"aria-modal":!0,"data-ui":"Dialog",id:h,onActivate:y,onClick:ge,onFocus:ye,ref:n,role:"dialog",zOffset:Y,children:[m("div",{ref:U,tabIndex:0}),m(Hv,{__unstable_autoFocus:s,__unstable_hideCloseButton:l,contentRef:f,footer:g,header:v,id:h,onClickOutside:b,onClose:S,portal:C,radius:z,ref:G,scheme:T,shadow:u,width:X,children:d}),m("div",{ref:L,tabIndex:0})]})})});const jv=M.kbd(Ia||(Ia=k([`
  &:not([hidden]) {
    display: block;
  }
  font: inherit;
`]))),Uv=M(Yp)(Da||(Da=k([`
  &:not([hidden]) {
    display: block;
  }
`]))),Wv=p.forwardRef(function(e,n){const{fontSize:r,keys:o,padding:i,radius:a,space:s=1,...l}=e,c=R(s);return!o||o.length===0?m(Ge,{}):m(jv,{"data-ui":"Hotkeys",...l,ref:n,children:m(Pl,{as:"span",space:c,children:o.map((u,d)=>m(Uv,{fontSize:r,padding:i,radius:a,children:u},d))})})}),ro=Symbol.for("@sanity/ui/context/menu");ce[ro]=ce[ro]||p.createContext(null);const Ll=ce[ro];function Vv(t){return xo(t)&&t.getAttribute("data-disabled")!=="true"||wo(t)&&!t.disabled}function Bt(t){return t.filter(Vv)}function qv(t,e){const n=[];let r=e;for(;r!==t;){const o=r.parentElement;if(!o)return n;const a=Array.from(o.childNodes).indexOf(r);if(n.unshift(a),o===t)return n;r=o}return n}const rs=[];function Kv(t,e){if(!t)return;const n=new WeakMap;for(const o of e)n.set(o,qv(t,o));const r=(o,i)=>{const a=n.get(o)||rs,s=n.get(i)||rs,l=Math.max(a.length,s.length);for(let c=0;c<l;c+=1){const u=a[c]||-1,d=s[c]||-1;if(u!==d)return u-d}return 0};e.sort(r)}function Yv(t){const{onKeyDown:e,originElement:n,shouldFocus:r}=t,o=p.useRef([]),[i,a]=p.useState(null),[s,l]=p.useState(-1),c=p.useRef(s),u=o.current[s]||null,d=Boolean(i),f=p.useCallback(b=>{l(b),c.current=b},[]),g=p.useCallback((b,S)=>{if(!b)return()=>{};if(o.current.indexOf(b)===-1&&(o.current.push(b),Kv(i,o.current)),S){const x=o.current.indexOf(b);f(x)}return()=>{const x=o.current.indexOf(b);x>-1&&o.current.splice(x,1)}},[i,f]),v=p.useCallback(b=>{if(b.key==="Tab"){n&&n.focus();return}if(b.key==="Home"){b.preventDefault(),b.stopPropagation();const x=Bt(o.current)[0];if(!x)return;const w=o.current.indexOf(x);f(w);return}if(b.key==="End"){b.preventDefault(),b.stopPropagation();const S=Bt(o.current),x=S[S.length-1];if(!x)return;const w=o.current.indexOf(x);f(w);return}if(b.key==="ArrowUp"){b.preventDefault(),b.stopPropagation();const S=Bt(o.current),x=S.length;if(x===0)return;const w=o.current[c.current];let C=S.indexOf(w);C=(C-1+x)%x;const E=S[C],T=o.current.indexOf(E);f(T);return}if(b.key==="ArrowDown"){b.preventDefault(),b.stopPropagation();const S=Bt(o.current),x=S.length;if(x===0)return;const w=o.current[c.current];let C=S.indexOf(w);C=(C+1)%x;const E=S[C],T=o.current.indexOf(E);f(T);return}e&&e(b)},[e,n,f]),h=p.useCallback(b=>{const S=b.currentTarget,x=o.current.indexOf(S);f(x)},[f]),y=p.useCallback(()=>{i==null||i.focus(),f(-1)},[i,f]);return p.useEffect(()=>{if(!d)return;const b=window.requestAnimationFrame(()=>{const S=c.current;if(S===-1){if(r==="first"){const C=Bt(o.current)[0];if(C){const E=o.current.indexOf(C);f(E),c.current=E}}if(r==="last"){const w=Bt(o.current),C=w[w.length-1];if(C){const E=o.current.indexOf(C);f(E),c.current=E}}return}const x=o.current[S]||null;x==null||x.focus()});return()=>{window.cancelAnimationFrame(b)}},[s,d,f,r]),{activeElement:u,activeIndex:s,handleItemMouseEnter:h,handleItemMouseLeave:y,handleKeyDown:v,mount:g,rootElement:i,setRootElement:a}}const Xv=M(re)(Ra||(Ra=k([`
  outline: none;
  overflow: auto;
`])));p.forwardRef(function(e,n){const{children:r,focusFirst:o,focusLast:i,onClickOutside:a,onEscape:s,onItemClick:l,onItemSelect:c,onKeyDown:u,originElement:d,padding:f=1,registerElement:g,shouldFocus:v=e.focusFirst&&"first"||e.focusLast&&"last"||null,space:h=1,...y}=e,b=Me(n),{isTopLayer:S}=cr(),{activeElement:x,activeIndex:w,handleItemMouseEnter:C,handleItemMouseLeave:E,handleKeyDown:T,mount:D,rootElement:I,setRootElement:O}=Yv({onKeyDown:u,originElement:d,shouldFocus:v}),P=p.useCallback(A=>{O(A),b.current=A},[b,O]);p.useEffect(()=>{c&&c(w)},[w,c]),mo(p.useCallback(A=>S&&a&&a(A),[S,a]),[I]),bl(p.useCallback(A=>{S&&A.key==="Escape"&&(A.stopPropagation(),s&&s())},[S,s])),p.useEffect(()=>{if(!(!I||!g))return g(I)},[g,I]);const F=p.useMemo(()=>({version:0,activeElement:x,activeIndex:w,mount:D,onClickOutside:a,onEscape:s,onItemClick:l,onItemMouseEnter:C,onItemMouseLeave:E,registerElement:g,onMouseEnter:C,onMouseLeave:E}),[x,w,D,C,E,a,s,l,g]);return m(Ll.Provider,{value:F,children:m(Xv,{"data-ui":"Menu",...y,onKeyDown:T,padding:f,ref:P,role:"menu",tabIndex:-1,children:m(Ht,{space:h,children:r})})})});p.forwardRef(function(e,n){const{__unstable_disableRestoreFocusOnClose:r=!1,boundaryElement:o,button:i,id:a,menu:s,onClose:l,placement:c,popoverScheme:u,portal:d=!0,popover:f,popoverRadius:g,preventOverflow:v}=e,[h,y]=p.useState(!1),[b,S]=p.useState(null),[x,w]=p.useState(null),[C,E]=p.useState([]),T=p.useRef(h);p.useEffect(()=>{l&&!h&&T.current&&l()},[l,h]),p.useEffect(()=>{T.current=h},[h]);const D=p.useCallback(()=>{y(L=>!L),S(null)},[]),I=p.useCallback(L=>{if(L.key==="ArrowDown"||L.key==="Enter"||L.key===" "){L.preventDefault(),y(!0),S("first");return}if(L.key==="ArrowUp"){L.preventDefault(),y(!0),S("last");return}},[]),O=p.useCallback(L=>{const G=L.target;if(G instanceof Node&&!(x&&(G===x||x.contains(G)))){for(const te of C)if(G===te||te.contains(G))return;y(!1)}},[x,C]),P=p.useCallback(()=>{y(!1),!r&&x&&x.focus()},[x,r]),F=p.useCallback(L=>{const G=L.relatedTarget;if(G instanceof Node){for(const te of C)if(te===G||te.contains(G))return;y(!1)}},[C]),A=p.useCallback(()=>{y(!1),!r&&x&&x.focus()},[x,r]),z=p.useCallback(L=>(E(G=>G.concat([L])),()=>{E(G=>G.filter(te=>te!==L))}),[]),V=p.useMemo(()=>({"aria-labelledby":a,onBlurCapture:F,onClickOutside:O,onEscape:P,onItemClick:A,originElement:x,registerElement:z,shouldFocus:b}),[x,O,P,A,a,F,z,b]),H=tt.isElement(s)?p.cloneElement(s,V):null,X=p.useCallback(L=>{typeof n=="function"?n(L):n&&(n.current=L),w(L)},[n]),Y=p.useMemo(()=>tt.isElement(i)?p.cloneElement(i,{"data-ui":"MenuButton",id:a,onClick:D,onKeyDown:I,"aria-haspopup":!0,"aria-expanded":h,ref:X,selected:h}):null,[i,D,I,a,h,X]),U=p.useMemo(()=>({boundaryElement:o,overflow:"auto",placement:c,portal:d,preventOverflow:v,radius:g,scheme:u,...f||{}}),[o,c,g,u,d,v,f]);return m(dr,{"data-ui":"MenuButton__popover",...U,content:H,open:h,children:Y||m(Ge,{})})});M.hr(Oa||(Oa=k([`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`])));function Zv(){return ee(Pa||(Pa=k([`
    background-color: inherit;
    color: inherit;

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      text-decoration: none;
    }
  `])))}function Jv(t){var e,n;const{$tone:r,theme:o}=t,{base:i,muted:a,selectable:s}=o.sanity.color,l=s?s[r]||s.default:a[r]||a.default;return ee(Aa||(Aa=k([`
    `,`

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);
    outline: none;

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        `,`
      }

      &:not(:disabled) {
        &[aria-pressed='true'] {
          `,`
        }

        &[data-selected],
        &[aria-selected='true'] > & {
          `,`
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &:hover {
              `,`
            }

            &:active {
              `,`
            }
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        `,`
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          `,`
        }

        &[data-selected] {
          `,`
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &:hover {
              `,`
            }

            &:active {
              `,`
            }
          }
        }
      }
    }

    `,`
  `])),se(i,l.enabled),se(i,l.disabled),se(i,l.pressed),se(i,l.selected),se(i,l.hovered),se(i,l.pressed),se(i,l.disabled),se(i,l.pressed),se(i,l.selected),se(i,l.hovered),se(i,l.pressed),(n=(e=o.sanity.styles)==null?void 0:e.card)==null?void 0:n.root)}const Qv=M(re)(lt,Zv,Jv);function eh(){const t=p.useContext(Ll);if(!t)throw new Error("useMenu(): missing context value");if(!Gt(t)||t.version!==0)throw new Error("useMenu(): the context value is not compatible");return t}p.forwardRef(function(e,n){const{as:r="button",children:o,disabled:i,fontSize:a=2,hotkeys:s,icon:l,iconRight:c,onClick:u,padding:d=3,paddingX:f,paddingY:g,paddingTop:v,paddingRight:h,paddingBottom:y,paddingLeft:b,pressed:S,radius:x=2,selected:w,space:C=3,text:E,tone:T="default",...D}=e,I=eh(),{activeElement:O,mount:P,onItemClick:F,onItemMouseEnter:A=I.onMouseEnter,onItemMouseLeave:z=I.onMouseLeave}=I,[V,H]=p.useState(null),X=Boolean(O)&&O===V;p.useEffect(()=>P(V,w),[P,V,w]);const Y=Me(n),U=p.useCallback(te=>{i||(u&&u(te),F&&F())},[i,u,F]),L=p.useMemo(()=>({padding:d,paddingX:f,paddingY:g,paddingTop:v,paddingRight:h,paddingBottom:y,paddingLeft:b}),[d,f,g,v,h,y,b]),G=p.useCallback(te=>{Y.current=te,H(te)},[Y]);return K(Qv,{"data-ui":"MenuItem",...D,"aria-pressed":r==="button"&&S,"data-pressed":r!=="button"&&S?"":void 0,"data-selected":X?"":void 0,"data-disabled":i?"":void 0,forwardedAs:r,$radius:R(x),$padding:R(0),$tone:T,disabled:i,onClick:U,onMouseEnter:A,onMouseLeave:z,ref:G,role:"menuitem",tabIndex:-1,type:r==="button"?"button":void 0,children:[(l||E||c)&&m(re,{as:"span",...L,children:K(it,{as:"span",children:[l&&K(Ee,{size:a,children:[p.isValidElement(l)&&l,tt.isValidElementType(l)&&p.createElement(l)]}),E&&m(re,{flex:1,marginLeft:l?C:void 0,marginRight:c?C:void 0,children:m(Ee,{size:a,textOverflow:"ellipsis",children:E})}),s&&m(re,{marginLeft:C,style:{marginTop:-4,marginBottom:-4},children:m(Wv,{fontSize:a,keys:s})}),c&&K(Ee,{size:a,children:[p.isValidElement(c)&&c,tt.isValidElementType(c)&&p.createElement(c)]})]})}),o&&m(re,{as:"span",...L,children:o})]})});const th=go(Ta||(Ta=k([`
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
`]))),nh=ee(Ba||(Ba=k([`
  background-image: linear-gradient(
    to right,
    var(--card-skeleton-color-from),
    var(--card-skeleton-color-to),
    var(--card-skeleton-color-from),
    var(--card-skeleton-color-from),
    var(--card-skeleton-color-from)
  );
  background-position: 100%;
  background-size: 200% 100%;
  background-attachment: fixed;
  animation-name: `,`;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 2000ms;
`])),th),rh=ee(Ma||(Ma=k([`
  opacity: `,`;
  transition: opacity 200ms ease-in;

  @media screen and (prefers-reduced-motion: no-preference) {
    `,`
  }

  @media screen and (prefers-reduced-motion: reduce) {
    background-color: var(--card-skeleton-color-from);
  }
`])),t=>{let{$visible:e}=t;return e?1:0},t=>{let{$animated:e}=t;return e?nh:ee(ka||(ka=k([`
            background-color: var(--card-skeleton-color-from);
          `])))}),oh=M(re)(lt,rh),ih=p.forwardRef(function(e,n){const{animated:r=!1,delay:o,radius:i,...a}=e,[s,l]=p.useState(!o);return p.useEffect(()=>{if(!o)return l(!0);const c=setTimeout(()=>{l(!0)},o);return()=>{clearTimeout(c)}},[o]),m(oh,{...a,$animated:r,$radius:R(i),$visible:s,ref:n})}),ur=M(ih)(t=>{let{$size:e,$style:n,theme:r}=t;const{media:o}=r.sanity,i=r.sanity.fonts[n];return J(o,e,s=>{const l=i.sizes[s];return{height:l.lineHeight-l.ascenderHeight-l.descenderHeight}})});p.forwardRef(function(e,n){const{size:r=2,...o}=e,i=R(r);return m(ur,{...o,$size:i,ref:n,$style:"text"})});p.forwardRef(function(e,n){const{size:r=2,...o}=e,i=R(r);return m(ur,{...o,$size:i,ref:n,$style:"label"})});p.forwardRef(function(e,n){const{size:r=2,...o}=e,i=R(r);return m(ur,{...o,$size:i,ref:n,$style:"heading"})});p.forwardRef(function(e,n){const{size:r=2,...o}=e,i=R(r);return m(ur,{...o,$size:i,ref:n,$style:"code"})});p.forwardRef(function(e,n){const{icon:r,id:o,focused:i,fontSize:a,label:s,onClick:l,onFocus:c,padding:u=2,selected:d,...f}=e,g=p.useRef(null),v=p.useRef(!1),h=p.useCallback(()=>{v.current=!1},[]),y=p.useCallback(x=>{v.current=!0,c&&c(x)},[c]),b=Me(n);return p.useEffect(()=>{i&&!v.current&&(g.current&&g.current.focus(),v.current=!0)},[i]),m(ft,{"data-ui":"Tab",...f,"aria-selected":d?"true":"false",fontSize:a,icon:r,id:o,mode:"bleed",onClick:l,onBlur:h,onFocus:y,padding:u,ref:x=>{g.current=x,b.current=x},role:"tab",selected:d,tabIndex:d?0:-1,text:s,type:"button"})});function ah(t){return Boolean(t)}p.forwardRef(function(e,n){const{children:r,...o}=e,[i,a]=p.useState(-1),l=p.useMemo(()=>r.filter(ah),[r]).map((f,g)=>p.cloneElement(f,{focused:i===g,key:g,onFocus:()=>u(g)})),c=l.length,u=p.useCallback(f=>{a(f)},[]),d=p.useCallback(f=>{f.key==="ArrowLeft"&&a(g=>(g+c-1)%c),f.key==="ArrowRight"&&a(g=>(g+1)%c)},[c]);return m(Pl,{"data-ui":"TabList",...o,onKeyDown:d,ref:n,role:"tablist",children:l})});p.forwardRef(function(e,n){const{flex:r,...o}=e;return m(re,{"data-ui":"TabPanel",...o,flex:r,ref:n,role:"tabpanel",tabIndex:e.tabIndex===void 0?0:e.tabIndex,children:e.children})});M(Je)(Na||(Na=k([`
  pointer-events: all;
`])));M(it)(La||(La=k([`
  overflow-x: auto;
`])));const oo=Symbol.for("@sanity/ui/context/toast");ce[oo]=ce[oo]||p.createContext(null);const sh=ce[oo];M(So)($a||($a=k([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`])));M.div(Fa||(Fa=k([`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: 420px;
  width: 100%;
`])));function $l(){const t=p.useContext(sh);if(!t)throw new Error("useToast(): missing context value");if(!Gt(t)||t.version!==0)throw new Error("useToast(): the context value is not compatible");return t}function lh(t,e,n){var r;const o=e.indexOf(n),i=e.slice(0,o),a=i.length;for(let s=a-1;s>=0;s-=1){const l=i[s].getAttribute("data-tree-key");if(!l)continue;const c=l.split("/");c.pop();const u=[];let d=!0;for(let f=0;f<c.length;f+=1){u.push(c[f]);const g=u.join("/");if(!((r=t[g])!=null&&r.expanded)){d=!1;break}}if(d)return i[s]}return null}function ch(t,e,n){var r;const o=e.indexOf(n),i=e.slice(o),a=e.length;for(let s=1;s<a;s+=1){if(!i[s])continue;const l=i[s].getAttribute("data-tree-key");if(!l)continue;const c=l.split("/");c.pop();const u=[];let d=!0;for(let f=0;f<c.length;f+=1){u.push(c[f]);const g=u.join("/");if(!((r=t[g])!=null&&r.expanded)){d=!1;break}}if(d)return i[s]}return null}function os(t){if(t.getAttribute("role")==="treeitem"&&t.focus(),t.getAttribute("role")==="none"){const e=t.firstChild;e&&e instanceof HTMLElement&&e.focus()}}const io=Symbol.for("@sanity/ui/context/tree");ce[io]=ce[io]||p.createContext(null);const Kn=ce[io],dh=p.memo(p.forwardRef(function(e,n){const{children:r,space:o=1,...i}=e,a=Me(n),[s,l]=p.useState(null),c=p.useRef(s),u=p.useMemo(()=>[],[]),[d,f]=p.useState([]),[g,v]=p.useState({}),h=p.useRef(g);p.useEffect(()=>{c.current=s},[s]),p.useEffect(()=>{h.current=g},[g]);const y=p.useCallback((w,C,E,T)=>(v(D=>({...D,[C]:{element:w,expanded:E}})),T&&l(w),()=>{v(D=>{const I={...D};return delete I[C],I})}),[]),b=p.useCallback((w,C)=>{v(E=>{const T=E[w];return T?{...E,[w]:{...T,expanded:C}}:E})},[]),S=p.useMemo(()=>({version:0,focusedElement:s||d[0]||null,level:0,path:u,registerItem:y,setExpanded:b,setFocusedElement:l,space:o,state:g}),[s,d,u,y,b,o,g]),x=p.useCallback(w=>{var C;if(c.current){if(w.key==="ArrowDown"){w.preventDefault();const E=ch(h.current,d,c.current);E&&(os(E),l(E));return}if(w.key==="ArrowUp"){w.preventDefault();const E=lh(h.current,d,c.current);E&&(os(E),l(E));return}if(w.key==="ArrowLeft"){w.preventDefault();const E=c.current.getAttribute("data-tree-key");if(!E)return;const T=h.current[E];if(!T)return;if(T.expanded)v(D=>{const I=D[E];return I?{...D,[E]:{...I,expanded:!1}}:D});else{const D=E.split("/");D.pop();const I=D.join("/"),O=I&&h.current[I];O&&(O.element.focus(),l(O.element))}return}if(w.key==="ArrowRight"){w.preventDefault();const E=c.current.getAttribute("data-tree-key");if(!E)return;(C=h.current[E])!=null&&C.expanded||v(T=>{const D=T[E];return D?{...T,[E]:{...D,expanded:!0}}:T});return}}},[d]);return p.useEffect(()=>{if(!a.current)return;const w=Array.from(a.current.querySelectorAll('[data-ui="TreeItem"]'));f(w)},[r,a]),m(Kn.Provider,{value:S,children:m(Ht,{as:"ul","data-ui":"Tree",...i,onKeyDown:x,ref:a,role:"tree",space:o,children:r})})}));dh.displayName="Tree";function uh(){return ee(za||(za=k([`
    &[role='none'] > [role='treeitem'] {
      outline: none;
      cursor: default;
      border-radius: 3px;

      &:focus {
        position: relative;
      }
    }

    &[role='treeitem'] {
      outline: none;

      & > div {
        cursor: default;
        border-radius: 3px;
      }

      &:focus > div {
        position: relative;
      }
    }
  `])))}function fh(t){const{theme:e}=t,n="default",{base:r,muted:o,selectable:i}=e.sanity.color,a=i?i[n]||i.default:o[n]||o.default;return ee(_a||(_a=k([`
    /* <div role="none"><a data-ui="TreeItem__box" role="treeitem" tabIndex="0"></div> */
    &[role='none'] {
      & > [role='treeitem'] {
        `,`

        background-color: var(--card-bg-color);
        color: var(--treeitem-fg-color);
      }

      &[data-selected] > [role='treeitem'] {
        `,`
      }

      @media (hover: hover) {
        &:not([data-selected]) > [role='treeitem']:not(:focus):hover {
          `,`
        }

        & > [role='treeitem']:focus {
          `,`
        }
      }
    }

    /* <div role="treeitem" tabIndex="0"><div data-ui="TreeItem__box"></div> */
    &[role='treeitem'] {
      & > [data-ui='TreeItem__box'] {
        `,`

        background-color: var(--card-bg-color);
        color: var(--card-fg-color);
      }

      &[data-selected] > [data-ui='TreeItem__box'] {
        `,`
      }

      @media (hover: hover) {
        &:not([data-selected]):not(:focus) > [data-ui='TreeItem__box']:hover {
          `,`
        }

        &:focus > [data-ui='TreeItem__box'] {
          `,`
        }
      }
    }
  `])),se(r,a.enabled),se(r,a.pressed),se(r,a.hovered),se(r,a.selected),se(r,a.enabled),se(r,a.pressed),se(r,a.hovered),se(r,a.selected))}function ph(t){const{$level:e,theme:n}=t,{space:r}=n.sanity;return ee(Ga||(Ga=k([`
    padding-left: `,`;

    &[data-as='a'] {
      text-decoration: none;
    }
  `])),_(r[2]*e))}function Fl(){const t=p.useContext(Kn);if(!t)throw new Error("Tree: missing context value");return t}const is=p.memo(function(e){const{children:n,expanded:r=!1,...o}=e,i=Fl();return m(Ht,{as:"ul","data-ui":"TreeGroup",...o,hidden:!r,marginTop:i.space,role:"group",space:i.space,children:n})}),as=p.memo(M.li(uh,fh)),ss=M(re).attrs({forwardedAs:"a"})(ph),gh=M(Ee)(Ha||(Ha=k([`
  & > svg {
    transition: transform 100ms;
  }
`])));p.memo(function(e){const{children:n,expanded:r=!1,fontSize:o,href:i,icon:a,id:s,muted:l,onClick:c,padding:u=3,selected:d=!1,space:f=2,text:g,weight:v,...h}=e,y=p.useRef(null),b=p.useRef(null),S=Fl(),{path:x,registerItem:w,setExpanded:C,setFocusedElement:E}=S,T=p.useId(),D=s||T,I=p.useMemo(()=>x.concat([D||""]),[D,x]),O=I.join("/"),P=S.state[O],F=S.focusedElement===y.current,A=(P==null?void 0:P.expanded)===void 0?r:(P==null?void 0:P.expanded)||!1,z=S.focusedElement&&S.focusedElement===y.current?0:-1,V=p.useMemo(()=>({...S,level:S.level+1,path:I}),[I,S]),H=p.useCallback(U=>{c&&c(U);const L=U.target;L instanceof HTMLElement&&(L.getAttribute("data-ui")==="TreeItem__box"||L.closest('[data-ui="TreeItem__box"]'))&&(U.stopPropagation(),C(O,!A),E(y.current))},[A,O,c,C,E]),X=p.useCallback(U=>{if(F&&U.key==="Enter"){const L=b.current||y.current;L==null||L.click()}},[F]);p.useEffect(()=>{if(y.current)return w(y.current,I.join("/"),A,d)},[A,I,w,d]);const Y=K(it,{padding:u,children:[K(re,{marginRight:f,style:{visibility:a||n?"visible":"hidden",pointerEvents:"none"},children:[a&&m(Ee,{muted:l,size:o,weight:v,children:p.createElement(a)}),!a&&m(gh,{muted:l,size:o,weight:v,children:m(fd,{style:{transform:A?"rotate(90deg)":void 0}})})]}),m(re,{flex:1,children:m(Ee,{muted:l,size:o,textOverflow:"ellipsis",weight:v,children:g})})]});return i?K(as,{"data-selected":d?"":void 0,"data-tree-id":D,"data-tree-key":O,"data-ui":"TreeItem",...h,onClick:H,ref:y,role:"none",children:[m(ss,{$level:S.level,"aria-expanded":A,"data-ui":"TreeItem__box",href:i,ref:b,role:"treeitem",tabIndex:z,children:Y}),m(Kn.Provider,{value:V,children:n&&m(is,{hidden:!A,children:n})})]}):K(as,{"data-selected":d?"":void 0,"data-ui":"TreeItem","data-tree-id":D,"data-tree-key":O,...h,"aria-expanded":A,onClick:H,onKeyDown:X,ref:y,role:"treeitem",tabIndex:z,children:[m(ss,{$level:S.level,as:"div","data-ui":"TreeItem__box",children:Y}),m(Kn.Provider,{value:V,children:n&&m(is,{expanded:A,children:n})})]})});function ls(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,r)}return n}function cs(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ls(Object(n),!0).forEach(function(r){hd(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ls(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function $e(t){return"Minified Redux error #"+t+"; visit https://redux.js.org/Errors?code="+t+" for the full message or use the non-minified dev environment for full errors. "}var ds=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}(),Nr=function(){return Math.random().toString(36).substring(7).split("").join(".")},us={INIT:"@@redux/INIT"+Nr(),REPLACE:"@@redux/REPLACE"+Nr(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+Nr()}};function vh(t){if(typeof t!="object"||t===null)return!1;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function zl(t,e,n){var r;if(typeof e=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error($e(0));if(typeof e=="function"&&typeof n>"u"&&(n=e,e=void 0),typeof n<"u"){if(typeof n!="function")throw new Error($e(1));return n(zl)(t,e)}if(typeof t!="function")throw new Error($e(2));var o=t,i=e,a=[],s=a,l=!1;function c(){s===a&&(s=a.slice())}function u(){if(l)throw new Error($e(3));return i}function d(h){if(typeof h!="function")throw new Error($e(4));if(l)throw new Error($e(5));var y=!0;return c(),s.push(h),function(){if(y){if(l)throw new Error($e(6));y=!1,c();var S=s.indexOf(h);s.splice(S,1),a=null}}}function f(h){if(!vh(h))throw new Error($e(7));if(typeof h.type>"u")throw new Error($e(8));if(l)throw new Error($e(9));try{l=!0,i=o(i,h)}finally{l=!1}for(var y=a=s,b=0;b<y.length;b++){var S=y[b];S()}return h}function g(h){if(typeof h!="function")throw new Error($e(10));o=h,f({type:us.REPLACE})}function v(){var h,y=d;return h={subscribe:function(S){if(typeof S!="object"||S===null)throw new Error($e(11));function x(){S.next&&S.next(u())}x();var w=y(x);return{unsubscribe:w}}},h[ds]=function(){return this},h}return f({type:us.INIT}),r={dispatch:f,subscribe:d,getState:u,replaceReducer:g},r[ds]=v,r}function fs(t,e){return function(){return e(t.apply(this,arguments))}}function ps(t,e){if(typeof t=="function")return fs(t,e);if(typeof t!="object"||t===null)throw new Error($e(16));var n={};for(var r in t){var o=t[r];typeof o=="function"&&(n[r]=fs(o,e))}return n}function _l(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.length===0?function(r){return r}:e.length===1?e[0]:e.reduce(function(r,o){return function(){return r(o.apply(void 0,arguments))}})}function hh(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return function(){var o=r.apply(void 0,arguments),i=function(){throw new Error($e(15))},a={getState:o.getState,dispatch:function(){return i.apply(void 0,arguments)}},s=e.map(function(l){return l(a)});return i=_l.apply(void 0,s)(o.dispatch),cs(cs({},o),{},{dispatch:i})}}}var Gl=pe.createContext(null);function mh(t){t()}var Hl=mh,bh=function(e){return Hl=e},yh=function(){return Hl};function xh(){var t=yh(),e=null,n=null;return{clear:function(){e=null,n=null},notify:function(){t(function(){for(var o=e;o;)o.callback(),o=o.next})},get:function(){for(var o=[],i=e;i;)o.push(i),i=i.next;return o},subscribe:function(o){var i=!0,a=n={callback:o,next:null,prev:n};return a.prev?a.prev.next=a:e=a,function(){!i||e===null||(i=!1,a.next?a.next.prev=a.prev:n=a.prev,a.prev?a.prev.next=a.next:e=a.next)}}}}var gs={notify:function(){},get:function(){return[]}};function jl(t,e){var n,r=gs;function o(d){return l(),r.subscribe(d)}function i(){r.notify()}function a(){u.onStateChange&&u.onStateChange()}function s(){return Boolean(n)}function l(){n||(n=e?e.addNestedSub(a):t.subscribe(a),r=xh())}function c(){n&&(n(),n=void 0,r.clear(),r=gs)}var u={addNestedSub:o,notifyNestedSubs:i,handleChangeWrapper:a,isSubscribed:s,trySubscribe:l,tryUnsubscribe:c,getListeners:function(){return r}};return u}var Ul=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?p.useLayoutEffect:p.useEffect;function wh(t){var e=t.store,n=t.context,r=t.children,o=p.useMemo(function(){var s=jl(e);return{store:e,subscription:s}},[e]),i=p.useMemo(function(){return e.getState()},[e]);Ul(function(){var s=o.subscription;return s.onStateChange=s.notifyNestedSubs,s.trySubscribe(),i!==e.getState()&&s.notifyNestedSubs(),function(){s.tryUnsubscribe(),s.onStateChange=null}},[o,i]);var a=n||Gl;return pe.createElement(a.Provider,{value:o},r)}var ao={},Sh={get exports(){return ao},set exports(t){ao=t}},fe={};/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fr=60103,pr=60106,Sn=60107,En=60108,Cn=60114,In=60109,Dn=60110,Rn=60112,On=60113,Do=60120,Pn=60115,An=60116,Wl=60121,Vl=60122,ql=60117,Kl=60129,Yl=60131;if(typeof Symbol=="function"&&Symbol.for){var Te=Symbol.for;fr=Te("react.element"),pr=Te("react.portal"),Sn=Te("react.fragment"),En=Te("react.strict_mode"),Cn=Te("react.profiler"),In=Te("react.provider"),Dn=Te("react.context"),Rn=Te("react.forward_ref"),On=Te("react.suspense"),Do=Te("react.suspense_list"),Pn=Te("react.memo"),An=Te("react.lazy"),Wl=Te("react.block"),Vl=Te("react.server.block"),ql=Te("react.fundamental"),Kl=Te("react.debug_trace_mode"),Yl=Te("react.legacy_hidden")}function nt(t){if(typeof t=="object"&&t!==null){var e=t.$$typeof;switch(e){case fr:switch(t=t.type,t){case Sn:case Cn:case En:case On:case Do:return t;default:switch(t=t&&t.$$typeof,t){case Dn:case Rn:case An:case Pn:case In:return t;default:return e}}case pr:return e}}}var Eh=In,Ch=fr,Ih=Rn,Dh=Sn,Rh=An,Oh=Pn,Ph=pr,Ah=Cn,Th=En,Bh=On;fe.ContextConsumer=Dn;fe.ContextProvider=Eh;fe.Element=Ch;fe.ForwardRef=Ih;fe.Fragment=Dh;fe.Lazy=Rh;fe.Memo=Oh;fe.Portal=Ph;fe.Profiler=Ah;fe.StrictMode=Th;fe.Suspense=Bh;fe.isAsyncMode=function(){return!1};fe.isConcurrentMode=function(){return!1};fe.isContextConsumer=function(t){return nt(t)===Dn};fe.isContextProvider=function(t){return nt(t)===In};fe.isElement=function(t){return typeof t=="object"&&t!==null&&t.$$typeof===fr};fe.isForwardRef=function(t){return nt(t)===Rn};fe.isFragment=function(t){return nt(t)===Sn};fe.isLazy=function(t){return nt(t)===An};fe.isMemo=function(t){return nt(t)===Pn};fe.isPortal=function(t){return nt(t)===pr};fe.isProfiler=function(t){return nt(t)===Cn};fe.isStrictMode=function(t){return nt(t)===En};fe.isSuspense=function(t){return nt(t)===On};fe.isValidElementType=function(t){return typeof t=="string"||typeof t=="function"||t===Sn||t===Cn||t===Kl||t===En||t===On||t===Do||t===Yl||typeof t=="object"&&t!==null&&(t.$$typeof===An||t.$$typeof===Pn||t.$$typeof===In||t.$$typeof===Dn||t.$$typeof===Rn||t.$$typeof===ql||t.$$typeof===Wl||t[0]===Vl)};fe.typeOf=nt;(function(t){t.exports=fe})(Sh);var Mh=["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef","forwardRef","context"],kh=["reactReduxForwardedRef"],Nh=[],Lh=[null,null];function $h(t,e){var n=t[1];return[e.payload,n+1]}function vs(t,e,n){Ul(function(){return t.apply(void 0,e)},n)}function Fh(t,e,n,r,o,i,a){t.current=r,e.current=o,n.current=!1,i.current&&(i.current=null,a())}function zh(t,e,n,r,o,i,a,s,l,c){if(t){var u=!1,d=null,f=function(){if(!u){var h=e.getState(),y,b;try{y=r(h,o.current)}catch(S){b=S,d=S}b||(d=null),y===i.current?a.current||l():(i.current=y,s.current=y,a.current=!0,c({type:"STORE_UPDATED",payload:{error:b}}))}};n.onStateChange=f,n.trySubscribe(),f();var g=function(){if(u=!0,n.tryUnsubscribe(),n.onStateChange=null,d)throw d};return g}}var _h=function(){return[null,0]};function Gh(t,e){e===void 0&&(e={});var n=e,r=n.getDisplayName,o=r===void 0?function(x){return"ConnectAdvanced("+x+")"}:r,i=n.methodName,a=i===void 0?"connectAdvanced":i,s=n.renderCountProp,l=s===void 0?void 0:s,c=n.shouldHandleStateChanges,u=c===void 0?!0:c,d=n.storeKey,f=d===void 0?"store":d;n.withRef;var g=n.forwardRef,v=g===void 0?!1:g,h=n.context,y=h===void 0?Gl:h,b=qn(n,Mh),S=y;return function(w){var C=w.displayName||w.name||"Component",E=o(C),T=q({},b,{getDisplayName:o,methodName:a,renderCountProp:l,shouldHandleStateChanges:u,storeKey:f,displayName:E,wrappedComponentName:C,WrappedComponent:w}),D=b.pure;function I(z){return t(z.dispatch,T)}var O=D?p.useMemo:function(z){return z()};function P(z){var V=p.useMemo(function(){var Ie=z.reactReduxForwardedRef,We=qn(z,kh);return[z.context,Ie,We]},[z]),H=V[0],X=V[1],Y=V[2],U=p.useMemo(function(){return H&&H.Consumer&&ao.isContextConsumer(pe.createElement(H.Consumer,null))?H:S},[H,S]),L=p.useContext(U),G=Boolean(z.store)&&Boolean(z.store.getState)&&Boolean(z.store.dispatch);Boolean(L)&&Boolean(L.store);var te=G?z.store:L.store,ye=p.useMemo(function(){return I(te)},[te]),ne=p.useMemo(function(){if(!u)return Lh;var Ie=jl(te,G?null:L.subscription),We=Ie.notifyNestedSubs.bind(Ie);return[Ie,We]},[te,G,L]),oe=ne[0],ge=ne[1],de=p.useMemo(function(){return G?L:q({},L,{subscription:oe})},[G,L,oe]),he=p.useReducer($h,Nh,_h),we=he[0],Se=we[0],ve=he[1];if(Se&&Se.error)throw Se.error;var me=p.useRef(),Re=p.useRef(Y),Ae=p.useRef(),ke=p.useRef(!1),ie=O(function(){return Ae.current&&Y===Re.current?Ae.current:ye(te.getState(),Y)},[te,Se,Y]);vs(Fh,[Re,me,ke,Y,ie,Ae,ge]),vs(zh,[u,te,oe,ye,Re,me,ke,Ae,ge,ve],[te,oe,ye]);var Ce=p.useMemo(function(){return pe.createElement(w,q({},ie,{ref:X}))},[X,w,ie]),xe=p.useMemo(function(){return u?pe.createElement(U.Provider,{value:de},Ce):Ce},[U,Ce,de]);return xe}var F=D?pe.memo(P):P;if(F.WrappedComponent=w,F.displayName=P.displayName=E,v){var A=pe.forwardRef(function(V,H){return pe.createElement(F,q({},V,{reactReduxForwardedRef:H}))});return A.displayName=E,A.WrappedComponent=w,oi(A,w)}return oi(F,w)}}function hs(t,e){return t===e?t!==0||e!==0||1/t===1/e:t!==t&&e!==e}function Lr(t,e){if(hs(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(var o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(e,n[o])||!hs(t[n[o]],e[n[o]]))return!1;return!0}function Hh(t,e){var n={},r=function(a){var s=t[a];typeof s=="function"&&(n[a]=function(){return e(s.apply(void 0,arguments))})};for(var o in t)r(o);return n}function Ro(t){return function(n,r){var o=t(n,r);function i(){return o}return i.dependsOnOwnProps=!1,i}}function ms(t){return t.dependsOnOwnProps!==null&&t.dependsOnOwnProps!==void 0?Boolean(t.dependsOnOwnProps):t.length!==1}function Xl(t,e){return function(r,o){o.displayName;var i=function(s,l){return i.dependsOnOwnProps?i.mapToProps(s,l):i.mapToProps(s)};return i.dependsOnOwnProps=!0,i.mapToProps=function(s,l){i.mapToProps=t,i.dependsOnOwnProps=ms(t);var c=i(s,l);return typeof c=="function"&&(i.mapToProps=c,i.dependsOnOwnProps=ms(c),c=i(s,l)),c},i}}function jh(t){return typeof t=="function"?Xl(t):void 0}function Uh(t){return t?void 0:Ro(function(e){return{dispatch:e}})}function Wh(t){return t&&typeof t=="object"?Ro(function(e){return Hh(t,e)}):void 0}const Vh=[jh,Uh,Wh];function qh(t){return typeof t=="function"?Xl(t):void 0}function Kh(t){return t?void 0:Ro(function(){return{}})}const Yh=[qh,Kh];function Xh(t,e,n){return q({},n,t,e)}function Zh(t){return function(n,r){r.displayName;var o=r.pure,i=r.areMergedPropsEqual,a=!1,s;return function(c,u,d){var f=t(c,u,d);return a?(!o||!i(f,s))&&(s=f):(a=!0,s=f),s}}}function Jh(t){return typeof t=="function"?Zh(t):void 0}function Qh(t){return t?void 0:function(){return Xh}}const em=[Jh,Qh];var tm=["initMapStateToProps","initMapDispatchToProps","initMergeProps"];function nm(t,e,n,r){return function(i,a){return n(t(i,a),e(r,a),a)}}function rm(t,e,n,r,o){var i=o.areStatesEqual,a=o.areOwnPropsEqual,s=o.areStatePropsEqual,l=!1,c,u,d,f,g;function v(x,w){return c=x,u=w,d=t(c,u),f=e(r,u),g=n(d,f,u),l=!0,g}function h(){return d=t(c,u),e.dependsOnOwnProps&&(f=e(r,u)),g=n(d,f,u),g}function y(){return t.dependsOnOwnProps&&(d=t(c,u)),e.dependsOnOwnProps&&(f=e(r,u)),g=n(d,f,u),g}function b(){var x=t(c,u),w=!s(x,d);return d=x,w&&(g=n(d,f,u)),g}function S(x,w){var C=!a(w,u),E=!i(x,c,w,u);return c=x,u=w,C&&E?h():C?y():E?b():g}return function(w,C){return l?S(w,C):v(w,C)}}function om(t,e){var n=e.initMapStateToProps,r=e.initMapDispatchToProps,o=e.initMergeProps,i=qn(e,tm),a=n(t,i),s=r(t,i),l=o(t,i),c=i.pure?rm:nm;return c(a,s,l,t,i)}var im=["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"];function $r(t,e,n){for(var r=e.length-1;r>=0;r--){var o=e[r](t);if(o)return o}return function(i,a){throw new Error("Invalid value of type "+typeof t+" for "+n+" argument when connecting component "+a.wrappedComponentName+".")}}function am(t,e){return t===e}function sm(t){var e=t===void 0?{}:t,n=e.connectHOC,r=n===void 0?Gh:n,o=e.mapStateToPropsFactories,i=o===void 0?Yh:o,a=e.mapDispatchToPropsFactories,s=a===void 0?Vh:a,l=e.mergePropsFactories,c=l===void 0?em:l,u=e.selectorFactory,d=u===void 0?om:u;return function(g,v,h,y){y===void 0&&(y={});var b=y,S=b.pure,x=S===void 0?!0:S,w=b.areStatesEqual,C=w===void 0?am:w,E=b.areOwnPropsEqual,T=E===void 0?Lr:E,D=b.areStatePropsEqual,I=D===void 0?Lr:D,O=b.areMergedPropsEqual,P=O===void 0?Lr:O,F=qn(b,im),A=$r(g,i,"mapStateToProps"),z=$r(v,s,"mapDispatchToProps"),V=$r(h,c,"mergeProps");return r(d,q({methodName:"connect",getDisplayName:function(X){return"Connect("+X+")"},shouldHandleStateChanges:Boolean(g),initMapStateToProps:A,initMapDispatchToProps:z,initMergeProps:V,pure:x,areStatesEqual:C,areOwnPropsEqual:T,areStatePropsEqual:I,areMergedPropsEqual:P},F))}}const Zl=sm();bh(nl.unstable_batchedUpdates);function lm(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function Jl(t,e){var n=p.useState(function(){return{inputs:e,result:t()}})[0],r=p.useRef(!0),o=p.useRef(n),i=r.current||Boolean(e&&o.current.inputs&&lm(e,o.current.inputs)),a=i?o.current:{inputs:e,result:t()};return p.useEffect(function(){r.current=!1,o.current=a},[a]),a.result}function cm(t,e){return Jl(function(){return t},e)}var le=Jl,j=cm,et=function(e){var n=e.top,r=e.right,o=e.bottom,i=e.left,a=r-i,s=o-n,l={top:n,right:r,bottom:o,left:i,width:a,height:s,x:i,y:n,center:{x:(r+i)/2,y:(o+n)/2}};return l},Oo=function(e,n){return{top:e.top-n.top,left:e.left-n.left,bottom:e.bottom+n.bottom,right:e.right+n.right}},bs=function(e,n){return{top:e.top+n.top,left:e.left+n.left,bottom:e.bottom-n.bottom,right:e.right-n.right}},dm=function(e,n){return{top:e.top+n.y,left:e.left+n.x,bottom:e.bottom+n.y,right:e.right+n.x}},Fr={top:0,right:0,bottom:0,left:0},Po=function(e){var n=e.borderBox,r=e.margin,o=r===void 0?Fr:r,i=e.border,a=i===void 0?Fr:i,s=e.padding,l=s===void 0?Fr:s,c=et(Oo(n,o)),u=et(bs(n,a)),d=et(bs(u,l));return{marginBox:c,borderBox:et(n),paddingBox:u,contentBox:d,margin:o,border:a,padding:l}},qe=function(e){var n=e.slice(0,-2),r=e.slice(-2);if(r!=="px")return 0;var o=Number(n);return isNaN(o)&&md(!1),o},um=function(){return{x:window.pageXOffset,y:window.pageYOffset}},Yn=function(e,n){var r=e.borderBox,o=e.border,i=e.margin,a=e.padding,s=dm(r,n);return Po({borderBox:s,border:o,margin:i,padding:a})},Xn=function(e,n){return n===void 0&&(n=um()),Yn(e,n)},Ql=function(e,n){var r={top:qe(n.marginTop),right:qe(n.marginRight),bottom:qe(n.marginBottom),left:qe(n.marginLeft)},o={top:qe(n.paddingTop),right:qe(n.paddingRight),bottom:qe(n.paddingBottom),left:qe(n.paddingLeft)},i={top:qe(n.borderTopWidth),right:qe(n.borderRightWidth),bottom:qe(n.borderBottomWidth),left:qe(n.borderLeftWidth)};return Po({borderBox:e,margin:r,padding:o,border:i})},ec=function(e){var n=e.getBoundingClientRect(),r=window.getComputedStyle(e);return Ql(n,r)},ys=Number.isNaN||function(e){return typeof e=="number"&&e!==e};function fm(t,e){return!!(t===e||ys(t)&&ys(e))}function pm(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(!fm(t[n],e[n]))return!1;return!0}function Oe(t,e){e===void 0&&(e=pm);var n,r=[],o,i=!1;function a(){for(var s=[],l=0;l<arguments.length;l++)s[l]=arguments[l];return i&&n===this&&e(s,r)||(o=t.apply(this,s),i=!0,n=this,r=s),o}return a}var gm=function(e){var n=[],r=null,o=function(){for(var a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];n=s,!r&&(r=requestAnimationFrame(function(){r=null,e.apply(void 0,n)}))};return o.cancel=function(){r&&(cancelAnimationFrame(r),r=null)},o};const un=gm;function tc(t,e){}tc.bind(null,"warn");tc.bind(null,"error");function pt(){}function vm(t,e){return q({},t,{},e)}function Xe(t,e,n){var r=e.map(function(o){var i=vm(n,o.options);return t.addEventListener(o.eventName,o.fn,i),function(){t.removeEventListener(o.eventName,o.fn,i)}});return function(){r.forEach(function(i){i()})}}var hm="Invariant failed";function Zn(t){this.message=t}Zn.prototype.toString=function(){return this.message};function N(t,e){if(!t)throw new Zn(hm)}var mm=function(t){rl(e,t);function e(){for(var r,o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=t.call.apply(t,[this].concat(i))||this,r.callbacks=null,r.unbind=pt,r.onWindowError=function(s){var l=r.getCallbacks();l.isDragging()&&l.tryAbort();var c=s.error;c instanceof Zn&&s.preventDefault()},r.getCallbacks=function(){if(!r.callbacks)throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");return r.callbacks},r.setCallbacks=function(s){r.callbacks=s},r}var n=e.prototype;return n.componentDidMount=function(){this.unbind=Xe(window,[{eventName:"error",fn:this.onWindowError}])},n.componentDidCatch=function(o){if(o instanceof Zn){this.setState({});return}throw o},n.componentWillUnmount=function(){this.unbind()},n.render=function(){return this.props.children(this.setCallbacks)},e}(pe.Component),bm=`
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`,Jn=function(e){return e+1},ym=function(e){return`
  You have lifted an item in position `+Jn(e.source.index)+`
`},nc=function(e,n){var r=e.droppableId===n.droppableId,o=Jn(e.index),i=Jn(n.index);return r?`
      You have moved the item from position `+o+`
      to position `+i+`
    `:`
    You have moved the item from position `+o+`
    in list `+e.droppableId+`
    to list `+n.droppableId+`
    in position `+i+`
  `},rc=function(e,n,r){var o=n.droppableId===r.droppableId;return o?`
      The item `+e+`
      has been combined with `+r.draggableId:`
      The item `+e+`
      in list `+n.droppableId+`
      has been combined with `+r.draggableId+`
      in list `+r.droppableId+`
    `},xm=function(e){var n=e.destination;if(n)return nc(e.source,n);var r=e.combine;return r?rc(e.draggableId,e.source,r):"You are over an area that cannot be dropped on"},xs=function(e){return`
  The item has returned to its starting position
  of `+Jn(e.index)+`
`},wm=function(e){if(e.reason==="CANCEL")return`
      Movement cancelled.
      `+xs(e.source)+`
    `;var n=e.destination,r=e.combine;return n?`
      You have dropped the item.
      `+nc(e.source,n)+`
    `:r?`
      You have dropped the item.
      `+rc(e.draggableId,e.source,r)+`
    `:`
    The item has been dropped while not over a drop area.
    `+xs(e.source)+`
  `},Vn={dragHandleUsageInstructions:bm,onDragStart:ym,onDragUpdate:xm,onDragEnd:wm},Pe={x:0,y:0},Be=function(e,n){return{x:e.x+n.x,y:e.y+n.y}},He=function(e,n){return{x:e.x-n.x,y:e.y-n.y}},gt=function(e,n){return e.x===n.x&&e.y===n.y},jt=function(e){return{x:e.x!==0?-e.x:0,y:e.y!==0?-e.y:0}},Pt=function(e,n,r){var o;return r===void 0&&(r=0),o={},o[e]=n,o[e==="x"?"y":"x"]=r,o},fn=function(e,n){return Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2))},ws=function(e,n){return Math.min.apply(Math,n.map(function(r){return fn(e,r)}))},oc=function(e){return function(n){return{x:e(n.x),y:e(n.y)}}},Sm=function(t,e){var n=et({top:Math.max(e.top,t.top),right:Math.min(e.right,t.right),bottom:Math.min(e.bottom,t.bottom),left:Math.max(e.left,t.left)});return n.width<=0||n.height<=0?null:n},Tn=function(e,n){return{top:e.top+n.y,left:e.left+n.x,bottom:e.bottom+n.y,right:e.right+n.x}},Ss=function(e){return[{x:e.left,y:e.top},{x:e.right,y:e.top},{x:e.left,y:e.bottom},{x:e.right,y:e.bottom}]},Em={top:0,right:0,bottom:0,left:0},Cm=function(e,n){return n?Tn(e,n.scroll.diff.displacement):e},Im=function(e,n,r){if(r&&r.increasedBy){var o;return q({},e,(o={},o[n.end]=e[n.end]+r.increasedBy[n.line],o))}return e},Dm=function(e,n){return n&&n.shouldClipSubject?Sm(n.pageMarginBox,e):et(e)},$t=function(t){var e=t.page,n=t.withPlaceholder,r=t.axis,o=t.frame,i=Cm(e.marginBox,o),a=Im(i,r,n),s=Dm(a,o);return{page:e,withPlaceholder:n,active:s}},Ao=function(t,e){t.frame||N(!1);var n=t.frame,r=He(e,n.scroll.initial),o=jt(r),i=q({},n,{scroll:{initial:n.scroll.initial,current:e,diff:{value:r,displacement:o},max:n.scroll.max}}),a=$t({page:t.subject.page,withPlaceholder:t.subject.withPlaceholder,axis:t.axis,frame:i}),s=q({},t,{frame:i,subject:a});return s};function Qn(t){return Object.values?Object.values(t):Object.keys(t).map(function(e){return t[e]})}function To(t,e){if(t.findIndex)return t.findIndex(e);for(var n=0;n<t.length;n++)if(e(t[n]))return n;return-1}function bt(t,e){if(t.find)return t.find(e);var n=To(t,e);if(n!==-1)return t[n]}function ic(t){return Array.prototype.slice.call(t)}var ac=Oe(function(t){return t.reduce(function(e,n){return e[n.descriptor.id]=n,e},{})}),sc=Oe(function(t){return t.reduce(function(e,n){return e[n.descriptor.id]=n,e},{})}),gr=Oe(function(t){return Qn(t)}),Rm=Oe(function(t){return Qn(t)}),Ut=Oe(function(t,e){var n=Rm(e).filter(function(r){return t===r.descriptor.droppableId}).sort(function(r,o){return r.descriptor.index-o.descriptor.index});return n});function Bo(t){return t.at&&t.at.type==="REORDER"?t.at.destination:null}function vr(t){return t.at&&t.at.type==="COMBINE"?t.at.combine:null}var hr=Oe(function(t,e){return e.filter(function(n){return n.descriptor.id!==t.descriptor.id})}),Om=function(t){var e=t.isMovingForward,n=t.draggable,r=t.destination,o=t.insideDestination,i=t.previousImpact;if(!r.isCombineEnabled)return null;var a=Bo(i);if(!a)return null;function s(h){var y={type:"COMBINE",combine:{draggableId:h,droppableId:r.descriptor.id}};return q({},i,{at:y})}var l=i.displaced.all,c=l.length?l[0]:null;if(e)return c?s(c):null;var u=hr(n,o);if(!c){if(!u.length)return null;var d=u[u.length-1];return s(d.descriptor.id)}var f=To(u,function(h){return h.descriptor.id===c});f===-1&&N(!1);var g=f-1;if(g<0)return null;var v=u[g];return s(v.descriptor.id)},Wt=function(t,e){return t.descriptor.droppableId===e.descriptor.id},lc={point:Pe,value:0},pn={invisible:{},visible:{},all:[]},Pm={displaced:pn,displacedBy:lc,at:null},Ze=function(t,e){return function(n){return t<=n&&n<=e}},cc=function(t){var e=Ze(t.top,t.bottom),n=Ze(t.left,t.right);return function(r){var o=e(r.top)&&e(r.bottom)&&n(r.left)&&n(r.right);if(o)return!0;var i=e(r.top)||e(r.bottom),a=n(r.left)||n(r.right),s=i&&a;if(s)return!0;var l=r.top<t.top&&r.bottom>t.bottom,c=r.left<t.left&&r.right>t.right,u=l&&c;if(u)return!0;var d=l&&a||c&&i;return d}},Am=function(t){var e=Ze(t.top,t.bottom),n=Ze(t.left,t.right);return function(r){var o=e(r.top)&&e(r.bottom)&&n(r.left)&&n(r.right);return o}},Mo={direction:"vertical",line:"y",crossAxisLine:"x",start:"top",end:"bottom",size:"height",crossAxisStart:"left",crossAxisEnd:"right",crossAxisSize:"width"},dc={direction:"horizontal",line:"x",crossAxisLine:"y",start:"left",end:"right",size:"width",crossAxisStart:"top",crossAxisEnd:"bottom",crossAxisSize:"height"},Tm=function(t){return function(e){var n=Ze(e.top,e.bottom),r=Ze(e.left,e.right);return function(o){return t===Mo?n(o.top)&&n(o.bottom):r(o.left)&&r(o.right)}}},Bm=function(e,n){var r=n.frame?n.frame.scroll.diff.displacement:Pe;return Tn(e,r)},Mm=function(e,n,r){return n.subject.active?r(n.subject.active)(e):!1},km=function(e,n,r){return r(n)(e)},ko=function(e){var n=e.target,r=e.destination,o=e.viewport,i=e.withDroppableDisplacement,a=e.isVisibleThroughFrameFn,s=i?Bm(n,r):n;return Mm(s,r,a)&&km(s,o,a)},Nm=function(e){return ko(q({},e,{isVisibleThroughFrameFn:cc}))},uc=function(e){return ko(q({},e,{isVisibleThroughFrameFn:Am}))},Lm=function(e){return ko(q({},e,{isVisibleThroughFrameFn:Tm(e.destination.axis)}))},$m=function(e,n,r){if(typeof r=="boolean")return r;if(!n)return!0;var o=n.invisible,i=n.visible;if(o[e])return!1;var a=i[e];return a?a.shouldAnimate:!0};function Fm(t,e){var n=t.page.marginBox,r={top:e.point.y,right:0,bottom:0,left:e.point.x};return et(Oo(n,r))}function gn(t){var e=t.afterDragging,n=t.destination,r=t.displacedBy,o=t.viewport,i=t.forceShouldAnimate,a=t.last;return e.reduce(function(l,c){var u=Fm(c,r),d=c.descriptor.id;l.all.push(d);var f=Nm({target:u,destination:n,viewport:o,withDroppableDisplacement:!0});if(!f)return l.invisible[c.descriptor.id]=!0,l;var g=$m(d,a,i),v={draggableId:d,shouldAnimate:g};return l.visible[d]=v,l},{all:[],visible:{},invisible:{}})}function zm(t,e){if(!t.length)return 0;var n=t[t.length-1].descriptor.index;return e.inHomeList?n:n+1}function Es(t){var e=t.insideDestination,n=t.inHomeList,r=t.displacedBy,o=t.destination,i=zm(e,{inHomeList:n});return{displaced:pn,displacedBy:r,at:{type:"REORDER",destination:{droppableId:o.descriptor.id,index:i}}}}function er(t){var e=t.draggable,n=t.insideDestination,r=t.destination,o=t.viewport,i=t.displacedBy,a=t.last,s=t.index,l=t.forceShouldAnimate,c=Wt(e,r);if(s==null)return Es({insideDestination:n,inHomeList:c,displacedBy:i,destination:r});var u=bt(n,function(h){return h.descriptor.index===s});if(!u)return Es({insideDestination:n,inHomeList:c,displacedBy:i,destination:r});var d=hr(e,n),f=n.indexOf(u),g=d.slice(f),v=gn({afterDragging:g,destination:r,displacedBy:i,last:a,viewport:o.frame,forceShouldAnimate:l});return{displaced:v,displacedBy:i,at:{type:"REORDER",destination:{droppableId:r.descriptor.id,index:s}}}}function ht(t,e){return Boolean(e.effected[t])}var _m=function(t){var e=t.isMovingForward,n=t.destination,r=t.draggables,o=t.combine,i=t.afterCritical;if(!n.isCombineEnabled)return null;var a=o.draggableId,s=r[a],l=s.descriptor.index,c=ht(a,i);return c?e?l:l-1:e?l+1:l},Gm=function(t){var e=t.isMovingForward,n=t.isInHomeList,r=t.insideDestination,o=t.location;if(!r.length)return null;var i=o.index,a=e?i+1:i-1,s=r[0].descriptor.index,l=r[r.length-1].descriptor.index,c=n?l:l+1;return a<s||a>c?null:a},Hm=function(t){var e=t.isMovingForward,n=t.isInHomeList,r=t.draggable,o=t.draggables,i=t.destination,a=t.insideDestination,s=t.previousImpact,l=t.viewport,c=t.afterCritical,u=s.at;if(u||N(!1),u.type==="REORDER"){var d=Gm({isMovingForward:e,isInHomeList:n,location:u.destination,insideDestination:a});return d==null?null:er({draggable:r,insideDestination:a,destination:i,viewport:l,last:s.displaced,displacedBy:s.displacedBy,index:d})}var f=_m({isMovingForward:e,destination:i,displaced:s.displaced,draggables:o,combine:u.combine,afterCritical:c});return f==null?null:er({draggable:r,insideDestination:a,destination:i,viewport:l,last:s.displaced,displacedBy:s.displacedBy,index:f})},jm=function(t){var e=t.displaced,n=t.afterCritical,r=t.combineWith,o=t.displacedBy,i=Boolean(e.visible[r]||e.invisible[r]);return ht(r,n)?i?Pe:jt(o.point):i?o.point:Pe},Um=function(t){var e=t.afterCritical,n=t.impact,r=t.draggables,o=vr(n);o||N(!1);var i=o.draggableId,a=r[i].page.borderBox.center,s=jm({displaced:n.displaced,afterCritical:e,combineWith:i,displacedBy:n.displacedBy});return Be(a,s)},fc=function(e,n){return n.margin[e.start]+n.borderBox[e.size]/2},Wm=function(e,n){return n.margin[e.end]+n.borderBox[e.size]/2},No=function(e,n,r){return n[e.crossAxisStart]+r.margin[e.crossAxisStart]+r.borderBox[e.crossAxisSize]/2},Cs=function(e){var n=e.axis,r=e.moveRelativeTo,o=e.isMoving;return Pt(n.line,r.marginBox[n.end]+fc(n,o),No(n,r.marginBox,o))},Is=function(e){var n=e.axis,r=e.moveRelativeTo,o=e.isMoving;return Pt(n.line,r.marginBox[n.start]-Wm(n,o),No(n,r.marginBox,o))},Vm=function(e){var n=e.axis,r=e.moveInto,o=e.isMoving;return Pt(n.line,r.contentBox[n.start]+fc(n,o),No(n,r.contentBox,o))},qm=function(t){var e=t.impact,n=t.draggable,r=t.draggables,o=t.droppable,i=t.afterCritical,a=Ut(o.descriptor.id,r),s=n.page,l=o.axis;if(!a.length)return Vm({axis:l,moveInto:o.page,isMoving:s});var c=e.displaced,u=e.displacedBy,d=c.all[0];if(d){var f=r[d];if(ht(d,i))return Is({axis:l,moveRelativeTo:f.page,isMoving:s});var g=Yn(f.page,u.point);return Is({axis:l,moveRelativeTo:g,isMoving:s})}var v=a[a.length-1];if(v.descriptor.id===n.descriptor.id)return s.borderBox.center;if(ht(v.descriptor.id,i)){var h=Yn(v.page,jt(i.displacedBy.point));return Cs({axis:l,moveRelativeTo:h,isMoving:s})}return Cs({axis:l,moveRelativeTo:v.page,isMoving:s})},so=function(t,e){var n=t.frame;return n?Be(e,n.scroll.diff.displacement):e},Km=function(e){var n=e.impact,r=e.draggable,o=e.droppable,i=e.draggables,a=e.afterCritical,s=r.page.borderBox.center,l=n.at;return!o||!l?s:l.type==="REORDER"?qm({impact:n,draggable:r,draggables:i,droppable:o,afterCritical:a}):Um({impact:n,draggables:i,afterCritical:a})},mr=function(t){var e=Km(t),n=t.droppable,r=n?so(n,e):e;return r},pc=function(t,e){var n=He(e,t.scroll.initial),r=jt(n),o=et({top:e.y,bottom:e.y+t.frame.height,left:e.x,right:e.x+t.frame.width}),i={frame:o,scroll:{initial:t.scroll.initial,max:t.scroll.max,current:e,diff:{value:n,displacement:r}}};return i};function Ds(t,e){return t.map(function(n){return e[n]})}function Ym(t,e){for(var n=0;n<e.length;n++){var r=e[n].visible[t];if(r)return r}return null}var Xm=function(t){var e=t.impact,n=t.viewport,r=t.destination,o=t.draggables,i=t.maxScrollChange,a=pc(n,Be(n.scroll.current,i)),s=r.frame?Ao(r,Be(r.frame.scroll.current,i)):r,l=e.displaced,c=gn({afterDragging:Ds(l.all,o),destination:r,displacedBy:e.displacedBy,viewport:a.frame,last:l,forceShouldAnimate:!1}),u=gn({afterDragging:Ds(l.all,o),destination:s,displacedBy:e.displacedBy,viewport:n.frame,last:l,forceShouldAnimate:!1}),d={},f={},g=[l,c,u];l.all.forEach(function(h){var y=Ym(h,g);if(y){f[h]=y;return}d[h]=!0});var v=q({},e,{displaced:{all:l.all,invisible:d,visible:f}});return v},Zm=function(t,e){return Be(t.scroll.diff.displacement,e)},Lo=function(t){var e=t.pageBorderBoxCenter,n=t.draggable,r=t.viewport,o=Zm(r,e),i=He(o,n.page.borderBox.center);return Be(n.client.borderBox.center,i)},gc=function(t){var e=t.draggable,n=t.destination,r=t.newPageBorderBoxCenter,o=t.viewport,i=t.withDroppableDisplacement,a=t.onlyOnMainAxis,s=a===void 0?!1:a,l=He(r,e.page.borderBox.center),c=Tn(e.page.borderBox,l),u={target:c,destination:n,withDroppableDisplacement:i,viewport:o};return s?Lm(u):uc(u)},Jm=function(t){var e=t.isMovingForward,n=t.draggable,r=t.destination,o=t.draggables,i=t.previousImpact,a=t.viewport,s=t.previousPageBorderBoxCenter,l=t.previousClientSelection,c=t.afterCritical;if(!r.isEnabled)return null;var u=Ut(r.descriptor.id,o),d=Wt(n,r),f=Om({isMovingForward:e,draggable:n,destination:r,insideDestination:u,previousImpact:i})||Hm({isMovingForward:e,isInHomeList:d,draggable:n,draggables:o,destination:r,insideDestination:u,previousImpact:i,viewport:a,afterCritical:c});if(!f)return null;var g=mr({impact:f,draggable:n,droppable:r,draggables:o,afterCritical:c}),v=gc({draggable:n,destination:r,newPageBorderBoxCenter:g,viewport:a.frame,withDroppableDisplacement:!1,onlyOnMainAxis:!0});if(v){var h=Lo({pageBorderBoxCenter:g,draggable:n,viewport:a});return{clientSelection:h,impact:f,scrollJumpRequest:null}}var y=He(g,s),b=Xm({impact:f,viewport:a,destination:r,draggables:o,maxScrollChange:y});return{clientSelection:l,impact:b,scrollJumpRequest:y}},Le=function(e){var n=e.subject.active;return n||N(!1),n},Qm=function(t){var e=t.isMovingForward,n=t.pageBorderBoxCenter,r=t.source,o=t.droppables,i=t.viewport,a=r.subject.active;if(!a)return null;var s=r.axis,l=Ze(a[s.start],a[s.end]),c=gr(o).filter(function(d){return d!==r}).filter(function(d){return d.isEnabled}).filter(function(d){return Boolean(d.subject.active)}).filter(function(d){return cc(i.frame)(Le(d))}).filter(function(d){var f=Le(d);return e?a[s.crossAxisEnd]<f[s.crossAxisEnd]:f[s.crossAxisStart]<a[s.crossAxisStart]}).filter(function(d){var f=Le(d),g=Ze(f[s.start],f[s.end]);return l(f[s.start])||l(f[s.end])||g(a[s.start])||g(a[s.end])}).sort(function(d,f){var g=Le(d)[s.crossAxisStart],v=Le(f)[s.crossAxisStart];return e?g-v:v-g}).filter(function(d,f,g){return Le(d)[s.crossAxisStart]===Le(g[0])[s.crossAxisStart]});if(!c.length)return null;if(c.length===1)return c[0];var u=c.filter(function(d){var f=Ze(Le(d)[s.start],Le(d)[s.end]);return f(n[s.line])});return u.length===1?u[0]:u.length>1?u.sort(function(d,f){return Le(d)[s.start]-Le(f)[s.start]})[0]:c.sort(function(d,f){var g=ws(n,Ss(Le(d))),v=ws(n,Ss(Le(f)));return g!==v?g-v:Le(d)[s.start]-Le(f)[s.start]})[0]},Rs=function(e,n){var r=e.page.borderBox.center;return ht(e.descriptor.id,n)?He(r,n.displacedBy.point):r},eb=function(e,n){var r=e.page.borderBox;return ht(e.descriptor.id,n)?Tn(r,jt(n.displacedBy.point)):r},tb=function(t){var e=t.pageBorderBoxCenter,n=t.viewport,r=t.destination,o=t.insideDestination,i=t.afterCritical,a=o.filter(function(s){return uc({target:eb(s,i),destination:r,viewport:n.frame,withDroppableDisplacement:!0})}).sort(function(s,l){var c=fn(e,so(r,Rs(s,i))),u=fn(e,so(r,Rs(l,i)));return c<u?-1:u<c?1:s.descriptor.index-l.descriptor.index});return a[0]||null},Bn=Oe(function(e,n){var r=n[e.line];return{value:r,point:Pt(e.line,r)}}),nb=function(e,n,r){var o=e.axis;if(e.descriptor.mode==="virtual")return Pt(o.line,n[o.line]);var i=e.subject.page.contentBox[o.size],a=Ut(e.descriptor.id,r),s=a.reduce(function(u,d){return u+d.client.marginBox[o.size]},0),l=s+n[o.line],c=l-i;return c<=0?null:Pt(o.line,c)},vc=function(e,n){return q({},e,{scroll:q({},e.scroll,{max:n})})},hc=function(e,n,r){var o=e.frame;Wt(n,e)&&N(!1),e.subject.withPlaceholder&&N(!1);var i=Bn(e.axis,n.displaceBy).point,a=nb(e,i,r),s={placeholderSize:i,increasedBy:a,oldFrameMaxScroll:e.frame?e.frame.scroll.max:null};if(!o){var l=$t({page:e.subject.page,withPlaceholder:s,axis:e.axis,frame:e.frame});return q({},e,{subject:l})}var c=a?Be(o.scroll.max,a):o.scroll.max,u=vc(o,c),d=$t({page:e.subject.page,withPlaceholder:s,axis:e.axis,frame:u});return q({},e,{subject:d,frame:u})},rb=function(e){var n=e.subject.withPlaceholder;n||N(!1);var r=e.frame;if(!r){var o=$t({page:e.subject.page,axis:e.axis,frame:null,withPlaceholder:null});return q({},e,{subject:o})}var i=n.oldFrameMaxScroll;i||N(!1);var a=vc(r,i),s=$t({page:e.subject.page,axis:e.axis,frame:a,withPlaceholder:null});return q({},e,{subject:s,frame:a})},ob=function(t){var e=t.previousPageBorderBoxCenter,n=t.moveRelativeTo,r=t.insideDestination,o=t.draggable,i=t.draggables,a=t.destination,s=t.viewport,l=t.afterCritical;if(!n){if(r.length)return null;var c={displaced:pn,displacedBy:lc,at:{type:"REORDER",destination:{droppableId:a.descriptor.id,index:0}}},u=mr({impact:c,draggable:o,droppable:a,draggables:i,afterCritical:l}),d=Wt(o,a)?a:hc(a,o,i),f=gc({draggable:o,destination:d,newPageBorderBoxCenter:u,viewport:s.frame,withDroppableDisplacement:!1,onlyOnMainAxis:!0});return f?c:null}var g=Boolean(e[a.axis.line]<=n.page.borderBox.center[a.axis.line]),v=function(){var y=n.descriptor.index;return n.descriptor.id===o.descriptor.id||g?y:y+1}(),h=Bn(a.axis,o.displaceBy);return er({draggable:o,insideDestination:r,destination:a,viewport:s,displacedBy:h,last:pn,index:v})},ib=function(t){var e=t.isMovingForward,n=t.previousPageBorderBoxCenter,r=t.draggable,o=t.isOver,i=t.draggables,a=t.droppables,s=t.viewport,l=t.afterCritical,c=Qm({isMovingForward:e,pageBorderBoxCenter:n,source:o,droppables:a,viewport:s});if(!c)return null;var u=Ut(c.descriptor.id,i),d=tb({pageBorderBoxCenter:n,viewport:s,destination:c,insideDestination:u,afterCritical:l}),f=ob({previousPageBorderBoxCenter:n,destination:c,draggable:r,draggables:i,moveRelativeTo:d,insideDestination:u,viewport:s,afterCritical:l});if(!f)return null;var g=mr({impact:f,draggable:r,droppable:c,draggables:i,afterCritical:l}),v=Lo({pageBorderBoxCenter:g,draggable:r,viewport:s});return{clientSelection:v,impact:f,scrollJumpRequest:null}},je=function(t){var e=t.at;return e?e.type==="REORDER"?e.destination.droppableId:e.combine.droppableId:null},ab=function(e,n){var r=je(e);return r?n[r]:null},sb=function(t){var e=t.state,n=t.type,r=ab(e.impact,e.dimensions.droppables),o=Boolean(r),i=e.dimensions.droppables[e.critical.droppable.id],a=r||i,s=a.axis.direction,l=s==="vertical"&&(n==="MOVE_UP"||n==="MOVE_DOWN")||s==="horizontal"&&(n==="MOVE_LEFT"||n==="MOVE_RIGHT");if(l&&!o)return null;var c=n==="MOVE_DOWN"||n==="MOVE_RIGHT",u=e.dimensions.draggables[e.critical.draggable.id],d=e.current.page.borderBoxCenter,f=e.dimensions,g=f.draggables,v=f.droppables;return l?Jm({isMovingForward:c,previousPageBorderBoxCenter:d,draggable:u,destination:a,draggables:g,viewport:e.viewport,previousClientSelection:e.current.client.selection,previousImpact:e.impact,afterCritical:e.afterCritical}):ib({isMovingForward:c,previousPageBorderBoxCenter:d,draggable:u,isOver:a,draggables:g,droppables:v,viewport:e.viewport,afterCritical:e.afterCritical})};function Dt(t){return t.phase==="DRAGGING"||t.phase==="COLLECTING"}function mc(t){var e=Ze(t.top,t.bottom),n=Ze(t.left,t.right);return function(o){return e(o.y)&&n(o.x)}}function lb(t,e){return t.left<e.right&&t.right>e.left&&t.top<e.bottom&&t.bottom>e.top}function cb(t){var e=t.pageBorderBox,n=t.draggable,r=t.candidates,o=n.page.borderBox.center,i=r.map(function(a){var s=a.axis,l=Pt(a.axis.line,e.center[s.line],a.page.borderBox.center[s.crossAxisLine]);return{id:a.descriptor.id,distance:fn(o,l)}}).sort(function(a,s){return s.distance-a.distance});return i[0]?i[0].id:null}function db(t){var e=t.pageBorderBox,n=t.draggable,r=t.droppables,o=gr(r).filter(function(i){if(!i.isEnabled)return!1;var a=i.subject.active;if(!a||!lb(e,a))return!1;if(mc(a)(e.center))return!0;var s=i.axis,l=a.center[s.crossAxisLine],c=e[s.crossAxisStart],u=e[s.crossAxisEnd],d=Ze(a[s.crossAxisStart],a[s.crossAxisEnd]),f=d(c),g=d(u);return!f&&!g?!0:f?c<l:u>l});return o.length?o.length===1?o[0].descriptor.id:cb({pageBorderBox:e,draggable:n,candidates:o}):null}var bc=function(e,n){return et(Tn(e,n))},ub=function(t,e){var n=t.frame;return n?bc(e,n.scroll.diff.value):e};function yc(t){var e=t.displaced,n=t.id;return Boolean(e.visible[n]||e.invisible[n])}function fb(t){var e=t.draggable,n=t.closest,r=t.inHomeList;return n?r&&n.descriptor.index>e.descriptor.index?n.descriptor.index-1:n.descriptor.index:null}var pb=function(t){var e=t.pageBorderBoxWithDroppableScroll,n=t.draggable,r=t.destination,o=t.insideDestination,i=t.last,a=t.viewport,s=t.afterCritical,l=r.axis,c=Bn(r.axis,n.displaceBy),u=c.value,d=e[l.start],f=e[l.end],g=hr(n,o),v=bt(g,function(y){var b=y.descriptor.id,S=y.page.borderBox.center[l.line],x=ht(b,s),w=yc({displaced:i,id:b});return x?w?f<=S:d<S-u:w?f<=S+u:d<S}),h=fb({draggable:n,closest:v,inHomeList:Wt(n,r)});return er({draggable:n,insideDestination:o,destination:r,viewport:a,last:i,displacedBy:c,index:h})},gb=4,vb=function(t){var e=t.draggable,n=t.pageBorderBoxWithDroppableScroll,r=t.previousImpact,o=t.destination,i=t.insideDestination,a=t.afterCritical;if(!o.isCombineEnabled)return null;var s=o.axis,l=Bn(o.axis,e.displaceBy),c=l.value,u=n[s.start],d=n[s.end],f=hr(e,i),g=bt(f,function(h){var y=h.descriptor.id,b=h.page.borderBox,S=b[s.size],x=S/gb,w=ht(y,a),C=yc({displaced:r.displaced,id:y});return w?C?d>b[s.start]+x&&d<b[s.end]-x:u>b[s.start]-c+x&&u<b[s.end]-c-x:C?d>b[s.start]+c+x&&d<b[s.end]+c-x:u>b[s.start]+x&&u<b[s.end]-x});if(!g)return null;var v={displacedBy:l,displaced:r.displaced,at:{type:"COMBINE",combine:{draggableId:g.descriptor.id,droppableId:o.descriptor.id}}};return v},xc=function(t){var e=t.pageOffset,n=t.draggable,r=t.draggables,o=t.droppables,i=t.previousImpact,a=t.viewport,s=t.afterCritical,l=bc(n.page.borderBox,e),c=db({pageBorderBox:l,draggable:n,droppables:o});if(!c)return Pm;var u=o[c],d=Ut(u.descriptor.id,r),f=ub(u,l);return vb({pageBorderBoxWithDroppableScroll:f,draggable:n,previousImpact:i,destination:u,insideDestination:d,afterCritical:s})||pb({pageBorderBoxWithDroppableScroll:f,draggable:n,destination:u,insideDestination:d,last:i.displaced,viewport:a,afterCritical:s})},$o=function(t,e){var n;return q({},t,(n={},n[e.descriptor.id]=e,n))},hb=function(e){var n=e.previousImpact,r=e.impact,o=e.droppables,i=je(n),a=je(r);if(!i||i===a)return o;var s=o[i];if(!s.subject.withPlaceholder)return o;var l=rb(s);return $o(o,l)},mb=function(t){var e=t.draggable,n=t.draggables,r=t.droppables,o=t.previousImpact,i=t.impact,a=hb({previousImpact:o,impact:i,droppables:r}),s=je(i);if(!s)return a;var l=r[s];if(Wt(e,l)||l.subject.withPlaceholder)return a;var c=hc(l,e,n);return $o(a,c)},an=function(t){var e=t.state,n=t.clientSelection,r=t.dimensions,o=t.viewport,i=t.impact,a=t.scrollJumpRequest,s=o||e.viewport,l=r||e.dimensions,c=n||e.current.client.selection,u=He(c,e.initial.client.selection),d={offset:u,selection:c,borderBoxCenter:Be(e.initial.client.borderBoxCenter,u)},f={selection:Be(d.selection,s.scroll.current),borderBoxCenter:Be(d.borderBoxCenter,s.scroll.current),offset:Be(d.offset,s.scroll.diff.value)},g={client:d,page:f};if(e.phase==="COLLECTING")return q({phase:"COLLECTING"},e,{dimensions:l,viewport:s,current:g});var v=l.draggables[e.critical.draggable.id],h=i||xc({pageOffset:f.offset,draggable:v,draggables:l.draggables,droppables:l.droppables,previousImpact:e.impact,viewport:s,afterCritical:e.afterCritical}),y=mb({draggable:v,impact:h,previousImpact:e.impact,draggables:l.draggables,droppables:l.droppables}),b=q({},e,{current:g,dimensions:{draggables:l.draggables,droppables:y},impact:h,viewport:s,scrollJumpRequest:a||null,forceShouldAnimate:a?!1:null});return b};function bb(t,e){return t.map(function(n){return e[n]})}var wc=function(t){var e=t.impact,n=t.viewport,r=t.draggables,o=t.destination,i=t.forceShouldAnimate,a=e.displaced,s=bb(a.all,r),l=gn({afterDragging:s,destination:o,displacedBy:e.displacedBy,viewport:n.frame,forceShouldAnimate:i,last:a});return q({},e,{displaced:l})},Sc=function(t){var e=t.impact,n=t.draggable,r=t.droppable,o=t.draggables,i=t.viewport,a=t.afterCritical,s=mr({impact:e,draggable:n,draggables:o,droppable:r,afterCritical:a});return Lo({pageBorderBoxCenter:s,draggable:n,viewport:i})},Ec=function(t){var e=t.state,n=t.dimensions,r=t.viewport;e.movementMode!=="SNAP"&&N(!1);var o=e.impact,i=r||e.viewport,a=n||e.dimensions,s=a.draggables,l=a.droppables,c=s[e.critical.draggable.id],u=je(o);u||N(!1);var d=l[u],f=wc({impact:o,viewport:i,destination:d,draggables:s}),g=Sc({impact:f,draggable:c,droppable:d,draggables:s,viewport:i,afterCritical:e.afterCritical});return an({impact:f,clientSelection:g,state:e,dimensions:a,viewport:i})},yb=function(t){return{index:t.index,droppableId:t.droppableId}},Cc=function(t){var e=t.draggable,n=t.home,r=t.draggables,o=t.viewport,i=Bn(n.axis,e.displaceBy),a=Ut(n.descriptor.id,r),s=a.indexOf(e);s===-1&&N(!1);var l=a.slice(s+1),c=l.reduce(function(g,v){return g[v.descriptor.id]=!0,g},{}),u={inVirtualList:n.descriptor.mode==="virtual",displacedBy:i,effected:c},d=gn({afterDragging:l,destination:n,displacedBy:i,last:null,viewport:o.frame,forceShouldAnimate:!1}),f={displaced:d,displacedBy:i,at:{type:"REORDER",destination:yb(e.descriptor)}};return{impact:f,afterCritical:u}},xb=function(t,e){return{draggables:t.draggables,droppables:$o(t.droppables,e)}},wb=function(t){var e=t.draggable,n=t.offset,r=t.initialWindowScroll,o=Yn(e.client,n),i=Xn(o,r),a=q({},e,{placeholder:q({},e.placeholder,{client:o}),client:o,page:i});return a},Sb=function(t){var e=t.frame;return e||N(!1),e},Eb=function(t){var e=t.additions,n=t.updatedDroppables,r=t.viewport,o=r.scroll.diff.value;return e.map(function(i){var a=i.descriptor.droppableId,s=n[a],l=Sb(s),c=l.scroll.diff.value,u=Be(o,c),d=wb({draggable:i,offset:u,initialWindowScroll:r.scroll.initial});return d})},Cb=function(t){var e=t.state,n=t.published,r=n.modified.map(function(x){var w=e.dimensions.droppables[x.droppableId],C=Ao(w,x.scroll);return C}),o=q({},e.dimensions.droppables,{},ac(r)),i=sc(Eb({additions:n.additions,updatedDroppables:o,viewport:e.viewport})),a=q({},e.dimensions.draggables,{},i);n.removals.forEach(function(x){delete a[x]});var s={droppables:o,draggables:a},l=je(e.impact),c=l?s.droppables[l]:null,u=s.draggables[e.critical.draggable.id],d=s.droppables[e.critical.droppable.id],f=Cc({draggable:u,home:d,draggables:a,viewport:e.viewport}),g=f.impact,v=f.afterCritical,h=c&&c.isCombineEnabled?e.impact:g,y=xc({pageOffset:e.current.page.offset,draggable:s.draggables[e.critical.draggable.id],draggables:s.draggables,droppables:s.droppables,previousImpact:h,viewport:e.viewport,afterCritical:v}),b=q({phase:"DRAGGING"},e,{phase:"DRAGGING",impact:y,onLiftImpact:g,dimensions:s,afterCritical:v,forceShouldAnimate:!1});if(e.phase==="COLLECTING")return b;var S=q({phase:"DROP_PENDING"},b,{phase:"DROP_PENDING",reason:e.reason,isWaiting:!1});return S},lo=function(e){return e.movementMode==="SNAP"},zr=function(e,n,r){var o=xb(e.dimensions,n);return!lo(e)||r?an({state:e,dimensions:o}):Ec({state:e,dimensions:o})};function _r(t){return t.isDragging&&t.movementMode==="SNAP"?q({phase:"DRAGGING"},t,{scrollJumpRequest:null}):t}var Os={phase:"IDLE",completed:null,shouldFlush:!1},Ib=function(t,e){if(t===void 0&&(t=Os),e.type==="FLUSH")return q({},Os,{shouldFlush:!0});if(e.type==="INITIAL_PUBLISH"){t.phase!=="IDLE"&&N(!1);var n=e.payload,r=n.critical,o=n.clientSelection,i=n.viewport,a=n.dimensions,s=n.movementMode,l=a.draggables[r.draggable.id],c=a.droppables[r.droppable.id],u={selection:o,borderBoxCenter:l.client.borderBox.center,offset:Pe},d={client:u,page:{selection:Be(u.selection,i.scroll.initial),borderBoxCenter:Be(u.selection,i.scroll.initial),offset:Be(u.selection,i.scroll.diff.value)}},f=gr(a.droppables).every(function(ve){return!ve.isFixedOnPage}),g=Cc({draggable:l,home:c,draggables:a.draggables,viewport:i}),v=g.impact,h=g.afterCritical,y={phase:"DRAGGING",isDragging:!0,critical:r,movementMode:s,dimensions:a,initial:d,current:d,isWindowScrollAllowed:f,impact:v,afterCritical:h,onLiftImpact:v,viewport:i,scrollJumpRequest:null,forceShouldAnimate:null};return y}if(e.type==="COLLECTION_STARTING"){if(t.phase==="COLLECTING"||t.phase==="DROP_PENDING")return t;t.phase!=="DRAGGING"&&N(!1);var b=q({phase:"COLLECTING"},t,{phase:"COLLECTING"});return b}if(e.type==="PUBLISH_WHILE_DRAGGING")return t.phase==="COLLECTING"||t.phase==="DROP_PENDING"||N(!1),Cb({state:t,published:e.payload});if(e.type==="MOVE"){if(t.phase==="DROP_PENDING")return t;Dt(t)||N(!1);var S=e.payload.client;return gt(S,t.current.client.selection)?t:an({state:t,clientSelection:S,impact:lo(t)?t.impact:null})}if(e.type==="UPDATE_DROPPABLE_SCROLL"){if(t.phase==="DROP_PENDING"||t.phase==="COLLECTING")return _r(t);Dt(t)||N(!1);var x=e.payload,w=x.id,C=x.newScroll,E=t.dimensions.droppables[w];if(!E)return t;var T=Ao(E,C);return zr(t,T,!1)}if(e.type==="UPDATE_DROPPABLE_IS_ENABLED"){if(t.phase==="DROP_PENDING")return t;Dt(t)||N(!1);var D=e.payload,I=D.id,O=D.isEnabled,P=t.dimensions.droppables[I];P||N(!1),P.isEnabled===O&&N(!1);var F=q({},P,{isEnabled:O});return zr(t,F,!0)}if(e.type==="UPDATE_DROPPABLE_IS_COMBINE_ENABLED"){if(t.phase==="DROP_PENDING")return t;Dt(t)||N(!1);var A=e.payload,z=A.id,V=A.isCombineEnabled,H=t.dimensions.droppables[z];H||N(!1),H.isCombineEnabled===V&&N(!1);var X=q({},H,{isCombineEnabled:V});return zr(t,X,!0)}if(e.type==="MOVE_BY_WINDOW_SCROLL"){if(t.phase==="DROP_PENDING"||t.phase==="DROP_ANIMATING")return t;Dt(t)||N(!1),t.isWindowScrollAllowed||N(!1);var Y=e.payload.newScroll;if(gt(t.viewport.scroll.current,Y))return _r(t);var U=pc(t.viewport,Y);return lo(t)?Ec({state:t,viewport:U}):an({state:t,viewport:U})}if(e.type==="UPDATE_VIEWPORT_MAX_SCROLL"){if(!Dt(t))return t;var L=e.payload.maxScroll;if(gt(L,t.viewport.scroll.max))return t;var G=q({},t.viewport,{scroll:q({},t.viewport.scroll,{max:L})});return q({phase:"DRAGGING"},t,{viewport:G})}if(e.type==="MOVE_UP"||e.type==="MOVE_DOWN"||e.type==="MOVE_LEFT"||e.type==="MOVE_RIGHT"){if(t.phase==="COLLECTING"||t.phase==="DROP_PENDING")return t;t.phase!=="DRAGGING"&&N(!1);var te=sb({state:t,type:e.type});return te?an({state:t,impact:te.impact,clientSelection:te.clientSelection,scrollJumpRequest:te.scrollJumpRequest}):t}if(e.type==="DROP_PENDING"){var ye=e.payload.reason;t.phase!=="COLLECTING"&&N(!1);var ne=q({phase:"DROP_PENDING"},t,{phase:"DROP_PENDING",isWaiting:!0,reason:ye});return ne}if(e.type==="DROP_ANIMATE"){var oe=e.payload,ge=oe.completed,de=oe.dropDuration,he=oe.newHomeClientOffset;t.phase==="DRAGGING"||t.phase==="DROP_PENDING"||N(!1);var we={phase:"DROP_ANIMATING",completed:ge,dropDuration:de,newHomeClientOffset:he,dimensions:t.dimensions};return we}if(e.type==="DROP_COMPLETE"){var Se=e.payload.completed;return{phase:"IDLE",completed:Se,shouldFlush:!1}}return t},Db=function(e){return{type:"BEFORE_INITIAL_CAPTURE",payload:e}},Rb=function(e){return{type:"LIFT",payload:e}},Ob=function(e){return{type:"INITIAL_PUBLISH",payload:e}},Pb=function(e){return{type:"PUBLISH_WHILE_DRAGGING",payload:e}},Ab=function(){return{type:"COLLECTION_STARTING",payload:null}},Tb=function(e){return{type:"UPDATE_DROPPABLE_SCROLL",payload:e}},Bb=function(e){return{type:"UPDATE_DROPPABLE_IS_ENABLED",payload:e}},Mb=function(e){return{type:"UPDATE_DROPPABLE_IS_COMBINE_ENABLED",payload:e}},Ic=function(e){return{type:"MOVE",payload:e}},kb=function(e){return{type:"MOVE_BY_WINDOW_SCROLL",payload:e}},Nb=function(e){return{type:"UPDATE_VIEWPORT_MAX_SCROLL",payload:e}},Lb=function(){return{type:"MOVE_UP",payload:null}},$b=function(){return{type:"MOVE_DOWN",payload:null}},Fb=function(){return{type:"MOVE_RIGHT",payload:null}},zb=function(){return{type:"MOVE_LEFT",payload:null}},Fo=function(){return{type:"FLUSH",payload:null}},_b=function(e){return{type:"DROP_ANIMATE",payload:e}},zo=function(e){return{type:"DROP_COMPLETE",payload:e}},Dc=function(e){return{type:"DROP",payload:e}},Gb=function(e){return{type:"DROP_PENDING",payload:e}},Rc=function(){return{type:"DROP_ANIMATION_FINISHED",payload:null}},Hb=function(t){return function(e){var n=e.getState,r=e.dispatch;return function(o){return function(i){if(i.type!=="LIFT"){o(i);return}var a=i.payload,s=a.id,l=a.clientSelection,c=a.movementMode,u=n();u.phase==="DROP_ANIMATING"&&r(zo({completed:u.completed})),n().phase!=="IDLE"&&N(!1),r(Fo()),r(Db({draggableId:s,movementMode:c}));var d={shouldPublishImmediately:c==="SNAP"},f={draggableId:s,scrollOptions:d},g=t.startPublishing(f),v=g.critical,h=g.dimensions,y=g.viewport;r(Ob({critical:v,dimensions:h,clientSelection:l,movementMode:c,viewport:y}))}}}},jb=function(t){return function(){return function(e){return function(n){n.type==="INITIAL_PUBLISH"&&t.dragging(),n.type==="DROP_ANIMATE"&&t.dropping(n.payload.completed.result.reason),(n.type==="FLUSH"||n.type==="DROP_COMPLETE")&&t.resting(),e(n)}}}},_o={outOfTheWay:"cubic-bezier(0.2, 0, 0, 1)",drop:"cubic-bezier(.2,1,.1,1)"},vn={opacity:{drop:0,combining:.7},scale:{drop:.75}},Go={outOfTheWay:.2,minDropTime:.33,maxDropTime:.55},Ct=Go.outOfTheWay+"s "+_o.outOfTheWay,sn={fluid:"opacity "+Ct,snap:"transform "+Ct+", opacity "+Ct,drop:function(e){var n=e+"s "+_o.drop;return"transform "+n+", opacity "+n},outOfTheWay:"transform "+Ct,placeholder:"height "+Ct+", width "+Ct+", margin "+Ct},Ps=function(e){return gt(e,Pe)?null:"translate("+e.x+"px, "+e.y+"px)"},co={moveTo:Ps,drop:function(e,n){var r=Ps(e);return r?n?r+" scale("+vn.scale.drop+")":r:null}},uo=Go.minDropTime,Oc=Go.maxDropTime,Ub=Oc-uo,As=1500,Wb=.6,Vb=function(t){var e=t.current,n=t.destination,r=t.reason,o=fn(e,n);if(o<=0)return uo;if(o>=As)return Oc;var i=o/As,a=uo+Ub*i,s=r==="CANCEL"?a*Wb:a;return Number(s.toFixed(2))},qb=function(t){var e=t.impact,n=t.draggable,r=t.dimensions,o=t.viewport,i=t.afterCritical,a=r.draggables,s=r.droppables,l=je(e),c=l?s[l]:null,u=s[n.descriptor.droppableId],d=Sc({impact:e,draggable:n,draggables:a,afterCritical:i,droppable:c||u,viewport:o}),f=He(d,n.client.borderBox.center);return f},Kb=function(t){var e=t.draggables,n=t.reason,r=t.lastImpact,o=t.home,i=t.viewport,a=t.onLiftImpact;if(!r.at||n!=="DROP"){var s=wc({draggables:e,impact:a,destination:o,viewport:i,forceShouldAnimate:!0});return{impact:s,didDropInsideDroppable:!1}}if(r.at.type==="REORDER")return{impact:r,didDropInsideDroppable:!0};var l=q({},r,{displaced:pn});return{impact:l,didDropInsideDroppable:!0}},Yb=function(t){var e=t.getState,n=t.dispatch;return function(r){return function(o){if(o.type!=="DROP"){r(o);return}var i=e(),a=o.payload.reason;if(i.phase==="COLLECTING"){n(Gb({reason:a}));return}if(i.phase!=="IDLE"){var s=i.phase==="DROP_PENDING"&&i.isWaiting;s&&N(!1),i.phase==="DRAGGING"||i.phase==="DROP_PENDING"||N(!1);var l=i.critical,c=i.dimensions,u=c.draggables[i.critical.draggable.id],d=Kb({reason:a,lastImpact:i.impact,afterCritical:i.afterCritical,onLiftImpact:i.onLiftImpact,home:i.dimensions.droppables[i.critical.droppable.id],viewport:i.viewport,draggables:i.dimensions.draggables}),f=d.impact,g=d.didDropInsideDroppable,v=g?Bo(f):null,h=g?vr(f):null,y={index:l.draggable.index,droppableId:l.droppable.id},b={draggableId:u.descriptor.id,type:u.descriptor.type,source:y,reason:a,mode:i.movementMode,destination:v,combine:h},S=qb({impact:f,draggable:u,dimensions:c,viewport:i.viewport,afterCritical:i.afterCritical}),x={critical:i.critical,afterCritical:i.afterCritical,result:b,impact:f},w=!gt(i.current.client.offset,S)||Boolean(b.combine);if(!w){n(zo({completed:x}));return}var C=Vb({current:i.current.client.offset,destination:S,reason:a}),E={newHomeClientOffset:S,dropDuration:C,completed:x};n(_b(E))}}}},Pc=function(){return{x:window.pageXOffset,y:window.pageYOffset}};function Xb(t){return{eventName:"scroll",options:{passive:!0,capture:!1},fn:function(n){n.target!==window&&n.target!==window.document||t()}}}function Zb(t){var e=t.onWindowScroll;function n(){e(Pc())}var r=un(n),o=Xb(r),i=pt;function a(){return i!==pt}function s(){a()&&N(!1),i=Xe(window,[o])}function l(){a()||N(!1),r.cancel(),i(),i=pt}return{start:s,stop:l,isActive:a}}var Jb=function(e){return e.type==="DROP_COMPLETE"||e.type==="DROP_ANIMATE"||e.type==="FLUSH"},Qb=function(t){var e=Zb({onWindowScroll:function(r){t.dispatch(kb({newScroll:r}))}});return function(n){return function(r){!e.isActive()&&r.type==="INITIAL_PUBLISH"&&e.start(),e.isActive()&&Jb(r)&&e.stop(),n(r)}}},e0=function(t){var e=!1,n=!1,r=setTimeout(function(){n=!0}),o=function(a){e||n||(e=!0,t(a),clearTimeout(r))};return o.wasCalled=function(){return e},o},t0=function(){var t=[],e=function(i){var a=To(t,function(c){return c.timerId===i});a===-1&&N(!1);var s=t.splice(a,1),l=s[0];l.callback()},n=function(i){var a=setTimeout(function(){return e(a)}),s={timerId:a,callback:i};t.push(s)},r=function(){if(t.length){var i=[].concat(t);t.length=0,i.forEach(function(a){clearTimeout(a.timerId),a.callback()})}};return{add:n,flush:r}},n0=function(e,n){return e==null&&n==null?!0:e==null||n==null?!1:e.droppableId===n.droppableId&&e.index===n.index},r0=function(e,n){return e==null&&n==null?!0:e==null||n==null?!1:e.draggableId===n.draggableId&&e.droppableId===n.droppableId},o0=function(e,n){if(e===n)return!0;var r=e.draggable.id===n.draggable.id&&e.draggable.droppableId===n.draggable.droppableId&&e.draggable.type===n.draggable.type&&e.draggable.index===n.draggable.index,o=e.droppable.id===n.droppable.id&&e.droppable.type===n.droppable.type;return r&&o},tn=function(e,n){n()},_n=function(e,n){return{draggableId:e.draggable.id,type:e.droppable.type,source:{droppableId:e.droppable.id,index:e.draggable.index},mode:n}},Gr=function(e,n,r,o){if(!e){r(o(n));return}var i=e0(r),a={announce:i};e(n,a),i.wasCalled()||r(o(n))},i0=function(t,e){var n=t0(),r=null,o=function(f,g){r&&N(!1),tn("onBeforeCapture",function(){var v=t().onBeforeCapture;if(v){var h={draggableId:f,mode:g};v(h)}})},i=function(f,g){r&&N(!1),tn("onBeforeDragStart",function(){var v=t().onBeforeDragStart;v&&v(_n(f,g))})},a=function(f,g){r&&N(!1);var v=_n(f,g);r={mode:g,lastCritical:f,lastLocation:v.source,lastCombine:null},n.add(function(){tn("onDragStart",function(){return Gr(t().onDragStart,v,e,Vn.onDragStart)})})},s=function(f,g){var v=Bo(g),h=vr(g);r||N(!1);var y=!o0(f,r.lastCritical);y&&(r.lastCritical=f);var b=!n0(r.lastLocation,v);b&&(r.lastLocation=v);var S=!r0(r.lastCombine,h);if(S&&(r.lastCombine=h),!(!y&&!b&&!S)){var x=q({},_n(f,r.mode),{combine:h,destination:v});n.add(function(){tn("onDragUpdate",function(){return Gr(t().onDragUpdate,x,e,Vn.onDragUpdate)})})}},l=function(){r||N(!1),n.flush()},c=function(f){r||N(!1),r=null,tn("onDragEnd",function(){return Gr(t().onDragEnd,f,e,Vn.onDragEnd)})},u=function(){if(r){var f=q({},_n(r.lastCritical,r.mode),{combine:null,destination:null,reason:"CANCEL"});c(f)}};return{beforeCapture:o,beforeStart:i,start:a,update:s,flush:l,drop:c,abort:u}},a0=function(t,e){var n=i0(t,e);return function(r){return function(o){return function(i){if(i.type==="BEFORE_INITIAL_CAPTURE"){n.beforeCapture(i.payload.draggableId,i.payload.movementMode);return}if(i.type==="INITIAL_PUBLISH"){var a=i.payload.critical;n.beforeStart(a,i.payload.movementMode),o(i),n.start(a,i.payload.movementMode);return}if(i.type==="DROP_COMPLETE"){var s=i.payload.completed.result;n.flush(),o(i),n.drop(s);return}if(o(i),i.type==="FLUSH"){n.abort();return}var l=r.getState();l.phase==="DRAGGING"&&n.update(l.critical,l.impact)}}}},s0=function(t){return function(e){return function(n){if(n.type!=="DROP_ANIMATION_FINISHED"){e(n);return}var r=t.getState();r.phase!=="DROP_ANIMATING"&&N(!1),t.dispatch(zo({completed:r.completed}))}}},l0=function(t){var e=null,n=null;function r(){n&&(cancelAnimationFrame(n),n=null),e&&(e(),e=null)}return function(o){return function(i){if((i.type==="FLUSH"||i.type==="DROP_COMPLETE"||i.type==="DROP_ANIMATION_FINISHED")&&r(),o(i),i.type==="DROP_ANIMATE"){var a={eventName:"scroll",options:{capture:!0,passive:!1,once:!0},fn:function(){var l=t.getState();l.phase==="DROP_ANIMATING"&&t.dispatch(Rc())}};n=requestAnimationFrame(function(){n=null,e=Xe(window,[a])})}}}},c0=function(t){return function(){return function(e){return function(n){(n.type==="DROP_COMPLETE"||n.type==="FLUSH"||n.type==="DROP_ANIMATE")&&t.stopPublishing(),e(n)}}}},d0=function(t){var e=!1;return function(){return function(n){return function(r){if(r.type==="INITIAL_PUBLISH"){e=!0,t.tryRecordFocus(r.payload.critical.draggable.id),n(r),t.tryRestoreFocusRecorded();return}if(n(r),!!e){if(r.type==="FLUSH"){e=!1,t.tryRestoreFocusRecorded();return}if(r.type==="DROP_COMPLETE"){e=!1;var o=r.payload.completed.result;o.combine&&t.tryShiftRecord(o.draggableId,o.combine.draggableId),t.tryRestoreFocusRecorded()}}}}}},u0=function(e){return e.type==="DROP_COMPLETE"||e.type==="DROP_ANIMATE"||e.type==="FLUSH"},f0=function(t){return function(e){return function(n){return function(r){if(u0(r)){t.stop(),n(r);return}if(r.type==="INITIAL_PUBLISH"){n(r);var o=e.getState();o.phase!=="DRAGGING"&&N(!1),t.start(o);return}n(r),t.scroll(e.getState())}}}},p0=function(t){return function(e){return function(n){if(e(n),n.type==="PUBLISH_WHILE_DRAGGING"){var r=t.getState();r.phase==="DROP_PENDING"&&(r.isWaiting||t.dispatch(Dc({reason:r.reason})))}}}},g0=_l,v0=function(t){var e=t.dimensionMarshal,n=t.focusMarshal,r=t.styleMarshal,o=t.getResponders,i=t.announce,a=t.autoScroller;return zl(Ib,g0(hh(jb(r),c0(e),Hb(e),Yb,s0,l0,p0,f0(a),Qb,d0(n),a0(o,i))))},Hr=function(){return{additions:{},removals:{},modified:{}}};function h0(t){var e=t.registry,n=t.callbacks,r=Hr(),o=null,i=function(){o||(n.collectionStarting(),o=requestAnimationFrame(function(){o=null;var u=r,d=u.additions,f=u.removals,g=u.modified,v=Object.keys(d).map(function(b){return e.draggable.getById(b).getDimension(Pe)}).sort(function(b,S){return b.descriptor.index-S.descriptor.index}),h=Object.keys(g).map(function(b){var S=e.droppable.getById(b),x=S.callbacks.getScrollWhileDragging();return{droppableId:b,scroll:x}}),y={additions:v,removals:Object.keys(f),modified:h};r=Hr(),n.publish(y)}))},a=function(u){var d=u.descriptor.id;r.additions[d]=u,r.modified[u.descriptor.droppableId]=!0,r.removals[d]&&delete r.removals[d],i()},s=function(u){var d=u.descriptor;r.removals[d.id]=!0,r.modified[d.droppableId]=!0,r.additions[d.id]&&delete r.additions[d.id],i()},l=function(){o&&(cancelAnimationFrame(o),o=null,r=Hr())};return{add:a,remove:s,stop:l}}var Ac=function(t){var e=t.scrollHeight,n=t.scrollWidth,r=t.height,o=t.width,i=He({x:n,y:e},{x:o,y:r}),a={x:Math.max(0,i.x),y:Math.max(0,i.y)};return a},Tc=function(){var t=document.documentElement;return t||N(!1),t},Bc=function(){var t=Tc(),e=Ac({scrollHeight:t.scrollHeight,scrollWidth:t.scrollWidth,width:t.clientWidth,height:t.clientHeight});return e},m0=function(){var t=Pc(),e=Bc(),n=t.y,r=t.x,o=Tc(),i=o.clientWidth,a=o.clientHeight,s=r+i,l=n+a,c=et({top:n,left:r,right:s,bottom:l}),u={frame:c,scroll:{initial:t,current:t,max:e,diff:{value:Pe,displacement:Pe}}};return u},b0=function(t){var e=t.critical,n=t.scrollOptions,r=t.registry,o=m0(),i=o.scroll.current,a=e.droppable,s=r.droppable.getAllByType(a.type).map(function(d){return d.callbacks.getDimensionAndWatchScroll(i,n)}),l=r.draggable.getAllByType(e.draggable.type).map(function(d){return d.getDimension(i)}),c={draggables:sc(l),droppables:ac(s)},u={dimensions:c,critical:e,viewport:o};return u};function Ts(t,e,n){if(n.descriptor.id===e.id||n.descriptor.type!==e.type)return!1;var r=t.droppable.getById(n.descriptor.droppableId);return r.descriptor.mode==="virtual"}var y0=function(t,e){var n=null,r=h0({callbacks:{publish:e.publishWhileDragging,collectionStarting:e.collectionStarting},registry:t}),o=function(g,v){t.droppable.exists(g)||N(!1),n&&e.updateDroppableIsEnabled({id:g,isEnabled:v})},i=function(g,v){n&&(t.droppable.exists(g)||N(!1),e.updateDroppableIsCombineEnabled({id:g,isCombineEnabled:v}))},a=function(g,v){n&&(t.droppable.exists(g)||N(!1),e.updateDroppableScroll({id:g,newScroll:v}))},s=function(g,v){n&&t.droppable.getById(g).callbacks.scroll(v)},l=function(){if(n){r.stop();var g=n.critical.droppable;t.droppable.getAllByType(g.type).forEach(function(v){return v.callbacks.dragStopped()}),n.unsubscribe(),n=null}},c=function(g){n||N(!1);var v=n.critical.draggable;g.type==="ADDITION"&&Ts(t,v,g.value)&&r.add(g.value),g.type==="REMOVAL"&&Ts(t,v,g.value)&&r.remove(g.value)},u=function(g){n&&N(!1);var v=t.draggable.getById(g.draggableId),h=t.droppable.getById(v.descriptor.droppableId),y={draggable:v.descriptor,droppable:h.descriptor},b=t.subscribe(c);return n={critical:y,unsubscribe:b},b0({critical:y,registry:t,scrollOptions:g.scrollOptions})},d={updateDroppableIsEnabled:o,updateDroppableIsCombineEnabled:i,scrollDroppable:s,updateDroppableScroll:a,startPublishing:u,stopPublishing:l};return d},Mc=function(t,e){return t.phase==="IDLE"?!0:t.phase!=="DROP_ANIMATING"||t.completed.result.draggableId===e?!1:t.completed.result.reason==="DROP"},x0=function(t){window.scrollBy(t.x,t.y)},w0=Oe(function(t){return gr(t).filter(function(e){return!(!e.isEnabled||!e.frame)})}),S0=function(e,n){var r=bt(w0(n),function(o){return o.frame||N(!1),mc(o.frame.pageMarginBox)(e)});return r},E0=function(t){var e=t.center,n=t.destination,r=t.droppables;if(n){var o=r[n];return o.frame?o:null}var i=S0(e,r);return i},vt={startFromPercentage:.25,maxScrollAtPercentage:.05,maxPixelScroll:28,ease:function(e){return Math.pow(e,2)},durationDampening:{stopDampeningAt:1200,accelerateAt:360}},C0=function(t,e){var n=t[e.size]*vt.startFromPercentage,r=t[e.size]*vt.maxScrollAtPercentage,o={startScrollingFrom:n,maxScrollValueAt:r};return o},kc=function(t){var e=t.startOfRange,n=t.endOfRange,r=t.current,o=n-e;if(o===0)return 0;var i=r-e,a=i/o;return a},Ho=1,I0=function(t,e){if(t>e.startScrollingFrom)return 0;if(t<=e.maxScrollValueAt)return vt.maxPixelScroll;if(t===e.startScrollingFrom)return Ho;var n=kc({startOfRange:e.maxScrollValueAt,endOfRange:e.startScrollingFrom,current:t}),r=1-n,o=vt.maxPixelScroll*vt.ease(r);return Math.ceil(o)},Bs=vt.durationDampening.accelerateAt,Ms=vt.durationDampening.stopDampeningAt,D0=function(t,e){var n=e,r=Ms,o=Date.now(),i=o-n;if(i>=Ms)return t;if(i<Bs)return Ho;var a=kc({startOfRange:Bs,endOfRange:r,current:i}),s=t*vt.ease(a);return Math.ceil(s)},ks=function(t){var e=t.distanceToEdge,n=t.thresholds,r=t.dragStartTime,o=t.shouldUseTimeDampening,i=I0(e,n);return i===0?0:o?Math.max(D0(i,r),Ho):i},Ns=function(t){var e=t.container,n=t.distanceToEdges,r=t.dragStartTime,o=t.axis,i=t.shouldUseTimeDampening,a=C0(e,o),s=n[o.end]<n[o.start];return s?ks({distanceToEdge:n[o.end],thresholds:a,dragStartTime:r,shouldUseTimeDampening:i}):-1*ks({distanceToEdge:n[o.start],thresholds:a,dragStartTime:r,shouldUseTimeDampening:i})},R0=function(t){var e=t.container,n=t.subject,r=t.proposedScroll,o=n.height>e.height,i=n.width>e.width;return!i&&!o?r:i&&o?null:{x:i?0:r.x,y:o?0:r.y}},O0=oc(function(t){return t===0?0:t}),Nc=function(t){var e=t.dragStartTime,n=t.container,r=t.subject,o=t.center,i=t.shouldUseTimeDampening,a={top:o.y-n.top,right:n.right-o.x,bottom:n.bottom-o.y,left:o.x-n.left},s=Ns({container:n,distanceToEdges:a,dragStartTime:e,axis:Mo,shouldUseTimeDampening:i}),l=Ns({container:n,distanceToEdges:a,dragStartTime:e,axis:dc,shouldUseTimeDampening:i}),c=O0({x:l,y:s});if(gt(c,Pe))return null;var u=R0({container:n,subject:r,proposedScroll:c});return u?gt(u,Pe)?null:u:null},P0=oc(function(t){return t===0?0:t>0?1:-1}),jo=function(){var t=function(n,r){return n<0?n:n>r?n-r:0};return function(e){var n=e.current,r=e.max,o=e.change,i=Be(n,o),a={x:t(i.x,r.x),y:t(i.y,r.y)};return gt(a,Pe)?null:a}}(),Lc=function(e){var n=e.max,r=e.current,o=e.change,i={x:Math.max(r.x,n.x),y:Math.max(r.y,n.y)},a=P0(o),s=jo({max:i,current:r,change:a});return!s||a.x!==0&&s.x===0||a.y!==0&&s.y===0},Uo=function(e,n){return Lc({current:e.scroll.current,max:e.scroll.max,change:n})},A0=function(e,n){if(!Uo(e,n))return null;var r=e.scroll.max,o=e.scroll.current;return jo({current:o,max:r,change:n})},Wo=function(e,n){var r=e.frame;return r?Lc({current:r.scroll.current,max:r.scroll.max,change:n}):!1},T0=function(e,n){var r=e.frame;return!r||!Wo(e,n)?null:jo({current:r.scroll.current,max:r.scroll.max,change:n})},B0=function(t){var e=t.viewport,n=t.subject,r=t.center,o=t.dragStartTime,i=t.shouldUseTimeDampening,a=Nc({dragStartTime:o,container:e.frame,subject:n,center:r,shouldUseTimeDampening:i});return a&&Uo(e,a)?a:null},M0=function(t){var e=t.droppable,n=t.subject,r=t.center,o=t.dragStartTime,i=t.shouldUseTimeDampening,a=e.frame;if(!a)return null;var s=Nc({dragStartTime:o,container:a.pageMarginBox,subject:n,center:r,shouldUseTimeDampening:i});return s&&Wo(e,s)?s:null},Ls=function(t){var e=t.state,n=t.dragStartTime,r=t.shouldUseTimeDampening,o=t.scrollWindow,i=t.scrollDroppable,a=e.current.page.borderBoxCenter,s=e.dimensions.draggables[e.critical.draggable.id],l=s.page.marginBox;if(e.isWindowScrollAllowed){var c=e.viewport,u=B0({dragStartTime:n,viewport:c,subject:l,center:a,shouldUseTimeDampening:r});if(u){o(u);return}}var d=E0({center:a,destination:je(e.impact),droppables:e.dimensions.droppables});if(d){var f=M0({dragStartTime:n,droppable:d,subject:l,center:a,shouldUseTimeDampening:r});f&&i(d.descriptor.id,f)}},k0=function(t){var e=t.scrollWindow,n=t.scrollDroppable,r=un(e),o=un(n),i=null,a=function(u){i||N(!1);var d=i,f=d.shouldUseTimeDampening,g=d.dragStartTime;Ls({state:u,scrollWindow:r,scrollDroppable:o,dragStartTime:g,shouldUseTimeDampening:f})},s=function(u){i&&N(!1);var d=Date.now(),f=!1,g=function(){f=!0};Ls({state:u,dragStartTime:0,shouldUseTimeDampening:!1,scrollWindow:g,scrollDroppable:g}),i={dragStartTime:d,shouldUseTimeDampening:f},f&&a(u)},l=function(){i&&(r.cancel(),o.cancel(),i=null)};return{start:s,stop:l,scroll:a}},N0=function(t){var e=t.move,n=t.scrollDroppable,r=t.scrollWindow,o=function(c,u){var d=Be(c.current.client.selection,u);e({client:d})},i=function(c,u){if(!Wo(c,u))return u;var d=T0(c,u);if(!d)return n(c.descriptor.id,u),null;var f=He(u,d);n(c.descriptor.id,f);var g=He(u,f);return g},a=function(c,u,d){if(!c||!Uo(u,d))return d;var f=A0(u,d);if(!f)return r(d),null;var g=He(d,f);r(g);var v=He(d,g);return v},s=function(c){var u=c.scrollJumpRequest;if(u){var d=je(c.impact);d||N(!1);var f=i(c.dimensions.droppables[d],u);if(f){var g=c.viewport,v=a(c.isWindowScrollAllowed,g,f);v&&o(c,v)}}};return s},L0=function(t){var e=t.scrollDroppable,n=t.scrollWindow,r=t.move,o=k0({scrollWindow:n,scrollDroppable:e}),i=N0({move:r,scrollWindow:n,scrollDroppable:e}),a=function(c){if(c.phase==="DRAGGING"){if(c.movementMode==="FLUID"){o.scroll(c);return}c.scrollJumpRequest&&i(c)}},s={scroll:a,start:o.start,stop:o.stop};return s},Ft="data-rbd",zt=function(){var t=Ft+"-drag-handle";return{base:t,draggableId:t+"-draggable-id",contextId:t+"-context-id"}}(),fo=function(){var t=Ft+"-draggable";return{base:t,contextId:t+"-context-id",id:t+"-id"}}(),$0=function(){var t=Ft+"-droppable";return{base:t,contextId:t+"-context-id",id:t+"-id"}}(),$s={contextId:Ft+"-scroll-container-context-id"},F0=function(e){return function(n){return"["+n+'="'+e+'"]'}},nn=function(e,n){return e.map(function(r){var o=r.styles[n];return o?r.selector+" { "+o+" }":""}).join(" ")},z0="pointer-events: none;",_0=function(t){var e=F0(t),n=function(){var s=`
      cursor: -webkit-grab;
      cursor: grab;
    `;return{selector:e(zt.contextId),styles:{always:`
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,resting:s,dragging:z0,dropAnimating:s}}}(),r=function(){var s=`
      transition: `+sn.outOfTheWay+`;
    `;return{selector:e(fo.contextId),styles:{dragging:s,dropAnimating:s,userCancel:s}}}(),o={selector:e($0.contextId),styles:{always:"overflow-anchor: none;"}},i={selector:"body",styles:{dragging:`
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-anchor: none;
      `}},a=[r,n,o,i];return{always:nn(a,"always"),resting:nn(a,"resting"),dragging:nn(a,"dragging"),dropAnimating:nn(a,"dropAnimating"),userCancel:nn(a,"userCancel")}},Ue=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?p.useLayoutEffect:p.useEffect,jr=function(){var e=document.querySelector("head");return e||N(!1),e},Fs=function(e){var n=document.createElement("style");return e&&n.setAttribute("nonce",e),n.type="text/css",n};function G0(t,e){var n=le(function(){return _0(t)},[t]),r=p.useRef(null),o=p.useRef(null),i=j(Oe(function(d){var f=o.current;f||N(!1),f.textContent=d}),[]),a=j(function(d){var f=r.current;f||N(!1),f.textContent=d},[]);Ue(function(){!r.current&&!o.current||N(!1);var d=Fs(e),f=Fs(e);return r.current=d,o.current=f,d.setAttribute(Ft+"-always",t),f.setAttribute(Ft+"-dynamic",t),jr().appendChild(d),jr().appendChild(f),a(n.always),i(n.resting),function(){var g=function(h){var y=h.current;y||N(!1),jr().removeChild(y),h.current=null};g(r),g(o)}},[e,a,i,n.always,n.resting,t]);var s=j(function(){return i(n.dragging)},[i,n.dragging]),l=j(function(d){if(d==="DROP"){i(n.dropAnimating);return}i(n.userCancel)},[i,n.dropAnimating,n.userCancel]),c=j(function(){o.current&&i(n.resting)},[i,n.resting]),u=le(function(){return{dragging:s,dropping:l,resting:c}},[s,l,c]);return u}var $c=function(t){return t&&t.ownerDocument?t.ownerDocument.defaultView:window};function br(t){return t instanceof $c(t).HTMLElement}function H0(t,e){var n="["+zt.contextId+'="'+t+'"]',r=ic(document.querySelectorAll(n));if(!r.length)return null;var o=bt(r,function(i){return i.getAttribute(zt.draggableId)===e});return!o||!br(o)?null:o}function j0(t){var e=p.useRef({}),n=p.useRef(null),r=p.useRef(null),o=p.useRef(!1),i=j(function(f,g){var v={id:f,focus:g};return e.current[f]=v,function(){var y=e.current,b=y[f];b!==v&&delete y[f]}},[]),a=j(function(f){var g=H0(t,f);g&&g!==document.activeElement&&g.focus()},[t]),s=j(function(f,g){n.current===f&&(n.current=g)},[]),l=j(function(){r.current||o.current&&(r.current=requestAnimationFrame(function(){r.current=null;var f=n.current;f&&a(f)}))},[a]),c=j(function(f){n.current=null;var g=document.activeElement;g&&g.getAttribute(zt.draggableId)===f&&(n.current=f)},[]);Ue(function(){return o.current=!0,function(){o.current=!1;var f=r.current;f&&cancelAnimationFrame(f)}},[]);var u=le(function(){return{register:i,tryRecordFocus:c,tryRestoreFocusRecorded:l,tryShiftRecord:s}},[i,c,l,s]);return u}function U0(){var t={draggables:{},droppables:{}},e=[];function n(d){return e.push(d),function(){var g=e.indexOf(d);g!==-1&&e.splice(g,1)}}function r(d){e.length&&e.forEach(function(f){return f(d)})}function o(d){return t.draggables[d]||null}function i(d){var f=o(d);return f||N(!1),f}var a={register:function(f){t.draggables[f.descriptor.id]=f,r({type:"ADDITION",value:f})},update:function(f,g){var v=t.draggables[g.descriptor.id];v&&v.uniqueId===f.uniqueId&&(delete t.draggables[g.descriptor.id],t.draggables[f.descriptor.id]=f)},unregister:function(f){var g=f.descriptor.id,v=o(g);v&&f.uniqueId===v.uniqueId&&(delete t.draggables[g],r({type:"REMOVAL",value:f}))},getById:i,findById:o,exists:function(f){return Boolean(o(f))},getAllByType:function(f){return Qn(t.draggables).filter(function(g){return g.descriptor.type===f})}};function s(d){return t.droppables[d]||null}function l(d){var f=s(d);return f||N(!1),f}var c={register:function(f){t.droppables[f.descriptor.id]=f},unregister:function(f){var g=s(f.descriptor.id);g&&f.uniqueId===g.uniqueId&&delete t.droppables[f.descriptor.id]},getById:l,findById:s,exists:function(f){return Boolean(s(f))},getAllByType:function(f){return Qn(t.droppables).filter(function(g){return g.descriptor.type===f})}};function u(){t.draggables={},t.droppables={},e.length=0}return{draggable:a,droppable:c,subscribe:n,clean:u}}function W0(){var t=le(U0,[]);return p.useEffect(function(){return function(){requestAnimationFrame(t.clean)}},[t]),t}var Vo=pe.createContext(null),tr=function(){var t=document.body;return t||N(!1),t},V0={position:"absolute",width:"1px",height:"1px",margin:"-1px",border:"0",padding:"0",overflow:"hidden",clip:"rect(0 0 0 0)","clip-path":"inset(100%)"},q0=function(e){return"rbd-announcement-"+e};function K0(t){var e=le(function(){return q0(t)},[t]),n=p.useRef(null);p.useEffect(function(){var i=document.createElement("div");return n.current=i,i.id=e,i.setAttribute("aria-live","assertive"),i.setAttribute("aria-atomic","true"),q(i.style,V0),tr().appendChild(i),function(){setTimeout(function(){var l=tr();l.contains(i)&&l.removeChild(i),i===n.current&&(n.current=null)})}},[e]);var r=j(function(o){var i=n.current;if(i){i.textContent=o;return}},[]);return r}var Y0=0,X0={separator:"::"};function qo(t,e){return e===void 0&&(e=X0),le(function(){return""+t+e.separator+Y0++},[e.separator,t])}function Z0(t){var e=t.contextId,n=t.uniqueId;return"rbd-hidden-text-"+e+"-"+n}function J0(t){var e=t.contextId,n=t.text,r=qo("hidden-text",{separator:"-"}),o=le(function(){return Z0({contextId:e,uniqueId:r})},[r,e]);return p.useEffect(function(){var a=document.createElement("div");return a.id=o,a.textContent=n,a.style.display="none",tr().appendChild(a),function(){var l=tr();l.contains(a)&&l.removeChild(a)}},[o,n]),o}var yr=pe.createContext(null);function Fc(t){var e=p.useRef(t);return p.useEffect(function(){e.current=t}),e}function Q0(){var t=null;function e(){return Boolean(t)}function n(a){return a===t}function r(a){t&&N(!1);var s={abandon:a};return t=s,s}function o(){t||N(!1),t=null}function i(){t&&(t.abandon(),o())}return{isClaimed:e,isActive:n,claim:r,release:o,tryAbandon:i}}var ey=9,ty=13,Ko=27,zc=32,ny=33,ry=34,oy=35,iy=36,ay=37,sy=38,ly=39,cy=40,Gn,dy=(Gn={},Gn[ty]=!0,Gn[ey]=!0,Gn),_c=function(t){dy[t.keyCode]&&t.preventDefault()},xr=function(){var t="visibilitychange";if(typeof document>"u")return t;var e=[t,"ms"+t,"webkit"+t,"moz"+t,"o"+t],n=bt(e,function(r){return"on"+r in document});return n||t}(),Gc=0,zs=5;function uy(t,e){return Math.abs(e.x-t.x)>=zs||Math.abs(e.y-t.y)>=zs}var _s={type:"IDLE"};function fy(t){var e=t.cancel,n=t.completed,r=t.getPhase,o=t.setPhase;return[{eventName:"mousemove",fn:function(a){var s=a.button,l=a.clientX,c=a.clientY;if(s===Gc){var u={x:l,y:c},d=r();if(d.type==="DRAGGING"){a.preventDefault(),d.actions.move(u);return}d.type!=="PENDING"&&N(!1);var f=d.point;if(uy(f,u)){a.preventDefault();var g=d.actions.fluidLift(u);o({type:"DRAGGING",actions:g})}}}},{eventName:"mouseup",fn:function(a){var s=r();if(s.type!=="DRAGGING"){e();return}a.preventDefault(),s.actions.drop({shouldBlockNextClick:!0}),n()}},{eventName:"mousedown",fn:function(a){r().type==="DRAGGING"&&a.preventDefault(),e()}},{eventName:"keydown",fn:function(a){var s=r();if(s.type==="PENDING"){e();return}if(a.keyCode===Ko){a.preventDefault(),e();return}_c(a)}},{eventName:"resize",fn:e},{eventName:"scroll",options:{passive:!0,capture:!1},fn:function(){r().type==="PENDING"&&e()}},{eventName:"webkitmouseforcedown",fn:function(a){var s=r();if(s.type==="IDLE"&&N(!1),s.actions.shouldRespectForcePress()){e();return}a.preventDefault()}},{eventName:xr,fn:e}]}function py(t){var e=p.useRef(_s),n=p.useRef(pt),r=le(function(){return{eventName:"mousedown",fn:function(d){if(!d.defaultPrevented&&d.button===Gc&&!(d.ctrlKey||d.metaKey||d.shiftKey||d.altKey)){var f=t.findClosestDraggableId(d);if(f){var g=t.tryGetLock(f,a,{sourceEvent:d});if(g){d.preventDefault();var v={x:d.clientX,y:d.clientY};n.current(),c(g,v)}}}}}},[t]),o=le(function(){return{eventName:"webkitmouseforcewillbegin",fn:function(d){if(!d.defaultPrevented){var f=t.findClosestDraggableId(d);if(f){var g=t.findOptionsForDraggable(f);g&&(g.shouldRespectForcePress||t.canGetLock(f)&&d.preventDefault())}}}}},[t]),i=j(function(){var d={passive:!1,capture:!0};n.current=Xe(window,[o,r],d)},[o,r]),a=j(function(){var u=e.current;u.type!=="IDLE"&&(e.current=_s,n.current(),i())},[i]),s=j(function(){var u=e.current;a(),u.type==="DRAGGING"&&u.actions.cancel({shouldBlockNextClick:!0}),u.type==="PENDING"&&u.actions.abort()},[a]),l=j(function(){var d={capture:!0,passive:!1},f=fy({cancel:s,completed:a,getPhase:function(){return e.current},setPhase:function(v){e.current=v}});n.current=Xe(window,f,d)},[s,a]),c=j(function(d,f){e.current.type!=="IDLE"&&N(!1),e.current={type:"PENDING",point:f,actions:d},l()},[l]);Ue(function(){return i(),function(){n.current()}},[i])}var Mt;function gy(){}var vy=(Mt={},Mt[ry]=!0,Mt[ny]=!0,Mt[iy]=!0,Mt[oy]=!0,Mt);function hy(t,e){function n(){e(),t.cancel()}function r(){e(),t.drop()}return[{eventName:"keydown",fn:function(i){if(i.keyCode===Ko){i.preventDefault(),n();return}if(i.keyCode===zc){i.preventDefault(),r();return}if(i.keyCode===cy){i.preventDefault(),t.moveDown();return}if(i.keyCode===sy){i.preventDefault(),t.moveUp();return}if(i.keyCode===ly){i.preventDefault(),t.moveRight();return}if(i.keyCode===ay){i.preventDefault(),t.moveLeft();return}if(vy[i.keyCode]){i.preventDefault();return}_c(i)}},{eventName:"mousedown",fn:n},{eventName:"mouseup",fn:n},{eventName:"click",fn:n},{eventName:"touchstart",fn:n},{eventName:"resize",fn:n},{eventName:"wheel",fn:n,options:{passive:!0}},{eventName:xr,fn:n}]}function my(t){var e=p.useRef(gy),n=le(function(){return{eventName:"keydown",fn:function(i){if(i.defaultPrevented||i.keyCode!==zc)return;var a=t.findClosestDraggableId(i);if(!a)return;var s=t.tryGetLock(a,u,{sourceEvent:i});if(!s)return;i.preventDefault();var l=!0,c=s.snapLift();e.current();function u(){l||N(!1),l=!1,e.current(),r()}e.current=Xe(window,hy(c,u),{capture:!0,passive:!1})}}},[t]),r=j(function(){var i={passive:!1,capture:!0};e.current=Xe(window,[n],i)},[n]);Ue(function(){return r(),function(){e.current()}},[r])}var Ur={type:"IDLE"},by=120,yy=.15;function xy(t){var e=t.cancel,n=t.getPhase;return[{eventName:"orientationchange",fn:e},{eventName:"resize",fn:e},{eventName:"contextmenu",fn:function(o){o.preventDefault()}},{eventName:"keydown",fn:function(o){if(n().type!=="DRAGGING"){e();return}o.keyCode===Ko&&o.preventDefault(),e()}},{eventName:xr,fn:e}]}function wy(t){var e=t.cancel,n=t.completed,r=t.getPhase;return[{eventName:"touchmove",options:{capture:!1},fn:function(i){var a=r();if(a.type!=="DRAGGING"){e();return}a.hasMoved=!0;var s=i.touches[0],l=s.clientX,c=s.clientY,u={x:l,y:c};i.preventDefault(),a.actions.move(u)}},{eventName:"touchend",fn:function(i){var a=r();if(a.type!=="DRAGGING"){e();return}i.preventDefault(),a.actions.drop({shouldBlockNextClick:!0}),n()}},{eventName:"touchcancel",fn:function(i){if(r().type!=="DRAGGING"){e();return}i.preventDefault(),e()}},{eventName:"touchforcechange",fn:function(i){var a=r();a.type==="IDLE"&&N(!1);var s=i.touches[0];if(s){var l=s.force>=yy;if(l){var c=a.actions.shouldRespectForcePress();if(a.type==="PENDING"){c&&e();return}if(c){if(a.hasMoved){i.preventDefault();return}e();return}i.preventDefault()}}}},{eventName:xr,fn:e}]}function Sy(t){var e=p.useRef(Ur),n=p.useRef(pt),r=j(function(){return e.current},[]),o=j(function(g){e.current=g},[]),i=le(function(){return{eventName:"touchstart",fn:function(g){if(!g.defaultPrevented){var v=t.findClosestDraggableId(g);if(v){var h=t.tryGetLock(v,s,{sourceEvent:g});if(h){var y=g.touches[0],b=y.clientX,S=y.clientY,x={x:b,y:S};n.current(),d(h,x)}}}}}},[t]),a=j(function(){var g={capture:!0,passive:!1};n.current=Xe(window,[i],g)},[i]),s=j(function(){var f=e.current;f.type!=="IDLE"&&(f.type==="PENDING"&&clearTimeout(f.longPressTimerId),o(Ur),n.current(),a())},[a,o]),l=j(function(){var f=e.current;s(),f.type==="DRAGGING"&&f.actions.cancel({shouldBlockNextClick:!0}),f.type==="PENDING"&&f.actions.abort()},[s]),c=j(function(){var g={capture:!0,passive:!1},v={cancel:l,completed:s,getPhase:r},h=Xe(window,wy(v),g),y=Xe(window,xy(v),g);n.current=function(){h(),y()}},[l,r,s]),u=j(function(){var g=r();g.type!=="PENDING"&&N(!1);var v=g.actions.fluidLift(g.point);o({type:"DRAGGING",actions:v,hasMoved:!1})},[r,o]),d=j(function(g,v){r().type!=="IDLE"&&N(!1);var h=setTimeout(u,by);o({type:"PENDING",point:v,actions:g,longPressTimerId:h}),c()},[c,r,o,u]);Ue(function(){return a(),function(){n.current();var v=r();v.type==="PENDING"&&(clearTimeout(v.longPressTimerId),o(Ur))}},[r,a,o]),Ue(function(){var g=Xe(window,[{eventName:"touchmove",fn:function(){},options:{capture:!1,passive:!1}}]);return g},[])}var Ey={input:!0,button:!0,textarea:!0,select:!0,option:!0,optgroup:!0,video:!0,audio:!0};function Hc(t,e){if(e==null)return!1;var n=Boolean(Ey[e.tagName.toLowerCase()]);if(n)return!0;var r=e.getAttribute("contenteditable");return r==="true"||r===""?!0:e===t?!1:Hc(t,e.parentElement)}function Cy(t,e){var n=e.target;return br(n)?Hc(t,n):!1}var Iy=function(t){return et(t.getBoundingClientRect()).center};function Dy(t){return t instanceof $c(t).Element}var Ry=function(){var t="matches";if(typeof document>"u")return t;var e=[t,"msMatchesSelector","webkitMatchesSelector"],n=bt(e,function(r){return r in Element.prototype});return n||t}();function jc(t,e){return t==null?null:t[Ry](e)?t:jc(t.parentElement,e)}function Oy(t,e){return t.closest?t.closest(e):jc(t,e)}function Py(t){return"["+zt.contextId+'="'+t+'"]'}function Ay(t,e){var n=e.target;if(!Dy(n))return null;var r=Py(t),o=Oy(n,r);return!o||!br(o)?null:o}function Ty(t,e){var n=Ay(t,e);return n?n.getAttribute(zt.draggableId):null}function By(t,e){var n="["+fo.contextId+'="'+t+'"]',r=ic(document.querySelectorAll(n)),o=bt(r,function(i){return i.getAttribute(fo.id)===e});return!o||!br(o)?null:o}function My(t){t.preventDefault()}function Hn(t){var e=t.expected,n=t.phase,r=t.isLockActive;return t.shouldWarn,!(!r()||e!==n)}function Uc(t){var e=t.lockAPI,n=t.store,r=t.registry,o=t.draggableId;if(e.isClaimed())return!1;var i=r.draggable.findById(o);return!(!i||!i.options.isEnabled||!Mc(n.getState(),o))}function ky(t){var e=t.lockAPI,n=t.contextId,r=t.store,o=t.registry,i=t.draggableId,a=t.forceSensorStop,s=t.sourceEvent,l=Uc({lockAPI:e,store:r,registry:o,draggableId:i});if(!l)return null;var c=o.draggable.getById(i),u=By(n,c.descriptor.id);if(!u||s&&!c.options.canDragInteractiveElements&&Cy(u,s))return null;var d=e.claim(a||pt),f="PRE_DRAG";function g(){return c.options.shouldRespectForcePress}function v(){return e.isActive(d)}function h(E,T){Hn({expected:E,phase:f,isLockActive:v,shouldWarn:!0})&&r.dispatch(T())}var y=h.bind(null,"DRAGGING");function b(E){function T(){e.release(),f="COMPLETED"}f!=="PRE_DRAG"&&(T(),f!=="PRE_DRAG"&&N(!1)),r.dispatch(Rb(E.liftActionArgs)),f="DRAGGING";function D(I,O){if(O===void 0&&(O={shouldBlockNextClick:!1}),E.cleanup(),O.shouldBlockNextClick){var P=Xe(window,[{eventName:"click",fn:My,options:{once:!0,passive:!1,capture:!0}}]);setTimeout(P)}T(),r.dispatch(Dc({reason:I}))}return q({isActive:function(){return Hn({expected:"DRAGGING",phase:f,isLockActive:v,shouldWarn:!1})},shouldRespectForcePress:g,drop:function(O){return D("DROP",O)},cancel:function(O){return D("CANCEL",O)}},E.actions)}function S(E){var T=un(function(I){y(function(){return Ic({client:I})})}),D=b({liftActionArgs:{id:i,clientSelection:E,movementMode:"FLUID"},cleanup:function(){return T.cancel()},actions:{move:T}});return q({},D,{move:T})}function x(){var E={moveUp:function(){return y(Lb)},moveRight:function(){return y(Fb)},moveDown:function(){return y($b)},moveLeft:function(){return y(zb)}};return b({liftActionArgs:{id:i,clientSelection:Iy(u),movementMode:"SNAP"},cleanup:pt,actions:E})}function w(){var E=Hn({expected:"PRE_DRAG",phase:f,isLockActive:v,shouldWarn:!0});E&&e.release()}var C={isActive:function(){return Hn({expected:"PRE_DRAG",phase:f,isLockActive:v,shouldWarn:!1})},shouldRespectForcePress:g,fluidLift:S,snapLift:x,abort:w};return C}var Ny=[py,my,Sy];function Ly(t){var e=t.contextId,n=t.store,r=t.registry,o=t.customSensors,i=t.enableDefaultSensors,a=[].concat(i?Ny:[],o||[]),s=p.useState(function(){return Q0()})[0],l=j(function(S,x){S.isDragging&&!x.isDragging&&s.tryAbandon()},[s]);Ue(function(){var S=n.getState(),x=n.subscribe(function(){var w=n.getState();l(S,w),S=w});return x},[s,n,l]),Ue(function(){return s.tryAbandon},[s.tryAbandon]);for(var c=j(function(b){return Uc({lockAPI:s,registry:r,store:n,draggableId:b})},[s,r,n]),u=j(function(b,S,x){return ky({lockAPI:s,registry:r,contextId:e,store:n,draggableId:b,forceSensorStop:S,sourceEvent:x&&x.sourceEvent?x.sourceEvent:null})},[e,s,r,n]),d=j(function(b){return Ty(e,b)},[e]),f=j(function(b){var S=r.draggable.findById(b);return S?S.options:null},[r.draggable]),g=j(function(){s.isClaimed()&&(s.tryAbandon(),n.getState().phase!=="IDLE"&&n.dispatch(Fo()))},[s,n]),v=j(s.isClaimed,[s]),h=le(function(){return{canGetLock:c,tryGetLock:u,findClosestDraggableId:d,findOptionsForDraggable:f,tryReleaseLock:g,isLockClaimed:v}},[c,u,d,f,g,v]),y=0;y<a.length;y++)a[y](h)}var $y=function(e){return{onBeforeCapture:e.onBeforeCapture,onBeforeDragStart:e.onBeforeDragStart,onDragStart:e.onDragStart,onDragEnd:e.onDragEnd,onDragUpdate:e.onDragUpdate}};function rn(t){return t.current||N(!1),t.current}function Fy(t){var e=t.contextId,n=t.setCallbacks,r=t.sensors,o=t.nonce,i=t.dragHandleUsageInstructions,a=p.useRef(null),s=Fc(t),l=j(function(){return $y(s.current)},[s]),c=K0(e),u=J0({contextId:e,text:i}),d=G0(e,o),f=j(function(I){rn(a).dispatch(I)},[]),g=le(function(){return ps({publishWhileDragging:Pb,updateDroppableScroll:Tb,updateDroppableIsEnabled:Bb,updateDroppableIsCombineEnabled:Mb,collectionStarting:Ab},f)},[f]),v=W0(),h=le(function(){return y0(v,g)},[v,g]),y=le(function(){return L0(q({scrollWindow:x0,scrollDroppable:h.scrollDroppable},ps({move:Ic},f)))},[h.scrollDroppable,f]),b=j0(e),S=le(function(){return v0({announce:c,autoScroller:y,dimensionMarshal:h,focusMarshal:b,getResponders:l,styleMarshal:d})},[c,y,h,b,l,d]);a.current=S;var x=j(function(){var I=rn(a),O=I.getState();O.phase!=="IDLE"&&I.dispatch(Fo())},[]),w=j(function(){var I=rn(a).getState();return I.isDragging||I.phase==="DROP_ANIMATING"},[]),C=le(function(){return{isDragging:w,tryAbort:x}},[w,x]);n(C);var E=j(function(I){return Mc(rn(a).getState(),I)},[]),T=j(function(){return Dt(rn(a).getState())},[]),D=le(function(){return{marshal:h,focus:b,contextId:e,canLift:E,isMovementAllowed:T,dragHandleUsageInstructionsId:u,registry:v}},[e,h,u,b,E,T,v]);return Ly({contextId:e,store:S,registry:v,customSensors:r,enableDefaultSensors:t.enableDefaultSensors!==!1}),p.useEffect(function(){return x},[x]),pe.createElement(yr.Provider,{value:D},pe.createElement(wh,{context:Vo,store:S},t.children))}var zy=0;function _y(){return le(function(){return""+zy++},[])}function Gy(t){var e=_y(),n=t.dragHandleUsageInstructions||Vn.dragHandleUsageInstructions;return pe.createElement(mm,null,function(r){return pe.createElement(Fy,{nonce:t.nonce,contextId:e,setCallbacks:r,dragHandleUsageInstructions:n,enableDefaultSensors:t.enableDefaultSensors,sensors:t.sensors,onBeforeCapture:t.onBeforeCapture,onBeforeDragStart:t.onBeforeDragStart,onDragStart:t.onDragStart,onDragUpdate:t.onDragUpdate,onDragEnd:t.onDragEnd},t.children)})}var Wc=function(e){return function(n){return e===n}},Hy=Wc("scroll"),jy=Wc("auto"),Gs=function(e,n){return n(e.overflowX)||n(e.overflowY)},Uy=function(e){var n=window.getComputedStyle(e),r={overflowX:n.overflowX,overflowY:n.overflowY};return Gs(r,Hy)||Gs(r,jy)},Wy=function(){return!1},Vy=function t(e){return e==null?null:e===document.body?Wy()?e:null:e===document.documentElement?null:Uy(e)?e:t(e.parentElement)},po=function(t){return{x:t.scrollLeft,y:t.scrollTop}},qy=function t(e){if(!e)return!1;var n=window.getComputedStyle(e);return n.position==="fixed"?!0:t(e.parentElement)},Ky=function(t){var e=Vy(t),n=qy(t);return{closestScrollable:e,isFixedOnPage:n}},Yy=function(t){var e=t.descriptor,n=t.isEnabled,r=t.isCombineEnabled,o=t.isFixedOnPage,i=t.direction,a=t.client,s=t.page,l=t.closest,c=function(){if(!l)return null;var g=l.scrollSize,v=l.client,h=Ac({scrollHeight:g.scrollHeight,scrollWidth:g.scrollWidth,height:v.paddingBox.height,width:v.paddingBox.width});return{pageMarginBox:l.page.marginBox,frameClient:v,scrollSize:g,shouldClipSubject:l.shouldClipSubject,scroll:{initial:l.scroll,current:l.scroll,max:h,diff:{value:Pe,displacement:Pe}}}}(),u=i==="vertical"?Mo:dc,d=$t({page:s,withPlaceholder:null,axis:u,frame:c}),f={descriptor:e,isCombineEnabled:r,isFixedOnPage:o,axis:u,isEnabled:n,client:a,page:s,frame:c,subject:d};return f},Xy=function(e,n){var r=ec(e);if(!n||e!==n)return r;var o=r.paddingBox.top-n.scrollTop,i=r.paddingBox.left-n.scrollLeft,a=o+n.scrollHeight,s=i+n.scrollWidth,l={top:o,right:s,bottom:a,left:i},c=Oo(l,r.border),u=Po({borderBox:c,margin:r.margin,border:r.border,padding:r.padding});return u},Zy=function(t){var e=t.ref,n=t.descriptor,r=t.env,o=t.windowScroll,i=t.direction,a=t.isDropDisabled,s=t.isCombineEnabled,l=t.shouldClipSubject,c=r.closestScrollable,u=Xy(e,c),d=Xn(u,o),f=function(){if(!c)return null;var v=ec(c),h={scrollHeight:c.scrollHeight,scrollWidth:c.scrollWidth};return{client:v,page:Xn(v,o),scroll:po(c),scrollSize:h,shouldClipSubject:l}}(),g=Yy({descriptor:n,isEnabled:!a,isCombineEnabled:s,isFixedOnPage:r.isFixedOnPage,direction:i,client:u,page:d,closest:f});return g},Jy={passive:!1},Qy={passive:!0},Hs=function(t){return t.shouldPublishImmediately?Jy:Qy};function nr(t){var e=p.useContext(t);return e||N(!1),e}var jn=function(e){return e&&e.env.closestScrollable||null};function ex(t){var e=p.useRef(null),n=nr(yr),r=qo("droppable"),o=n.registry,i=n.marshal,a=Fc(t),s=le(function(){return{id:t.droppableId,type:t.type,mode:t.mode}},[t.droppableId,t.mode,t.type]),l=p.useRef(s),c=le(function(){return Oe(function(w,C){e.current||N(!1);var E={x:w,y:C};i.updateDroppableScroll(s.id,E)})},[s.id,i]),u=j(function(){var w=e.current;return!w||!w.env.closestScrollable?Pe:po(w.env.closestScrollable)},[]),d=j(function(){var w=u();c(w.x,w.y)},[u,c]),f=le(function(){return un(d)},[d]),g=j(function(){var w=e.current,C=jn(w);w&&C||N(!1);var E=w.scrollOptions;if(E.shouldPublishImmediately){d();return}f()},[f,d]),v=j(function(w,C){e.current&&N(!1);var E=a.current,T=E.getDroppableRef();T||N(!1);var D=Ky(T),I={ref:T,descriptor:s,env:D,scrollOptions:C};e.current=I;var O=Zy({ref:T,descriptor:s,env:D,windowScroll:w,direction:E.direction,isDropDisabled:E.isDropDisabled,isCombineEnabled:E.isCombineEnabled,shouldClipSubject:!E.ignoreContainerClipping}),P=D.closestScrollable;return P&&(P.setAttribute($s.contextId,n.contextId),P.addEventListener("scroll",g,Hs(I.scrollOptions))),O},[n.contextId,s,g,a]),h=j(function(){var w=e.current,C=jn(w);return w&&C||N(!1),po(C)},[]),y=j(function(){var w=e.current;w||N(!1);var C=jn(w);e.current=null,C&&(f.cancel(),C.removeAttribute($s.contextId),C.removeEventListener("scroll",g,Hs(w.scrollOptions)))},[g,f]),b=j(function(w){var C=e.current;C||N(!1);var E=jn(C);E||N(!1),E.scrollTop+=w.y,E.scrollLeft+=w.x},[]),S=le(function(){return{getDimensionAndWatchScroll:v,getScrollWhileDragging:h,dragStopped:y,scroll:b}},[y,v,h,b]),x=le(function(){return{uniqueId:r,descriptor:s,callbacks:S}},[S,s,r]);Ue(function(){return l.current=x.descriptor,o.droppable.register(x),function(){e.current&&y(),o.droppable.unregister(x)}},[S,s,y,x,i,o.droppable]),Ue(function(){e.current&&i.updateDroppableIsEnabled(l.current.id,!t.isDropDisabled)},[t.isDropDisabled,i]),Ue(function(){e.current&&i.updateDroppableIsCombineEnabled(l.current.id,t.isCombineEnabled)},[t.isCombineEnabled,i])}function Wr(){}var js={width:0,height:0,margin:Em},tx=function(e){var n=e.isAnimatingOpenOnMount,r=e.placeholder,o=e.animate;return n||o==="close"?js:{height:r.client.borderBox.height,width:r.client.borderBox.width,margin:r.client.margin}},nx=function(e){var n=e.isAnimatingOpenOnMount,r=e.placeholder,o=e.animate,i=tx({isAnimatingOpenOnMount:n,placeholder:r,animate:o});return{display:r.display,boxSizing:"border-box",width:i.width,height:i.height,marginTop:i.margin.top,marginRight:i.margin.right,marginBottom:i.margin.bottom,marginLeft:i.margin.left,flexShrink:"0",flexGrow:"0",pointerEvents:"none",transition:o!=="none"?sn.placeholder:null}};function rx(t){var e=p.useRef(null),n=j(function(){e.current&&(clearTimeout(e.current),e.current=null)},[]),r=t.animate,o=t.onTransitionEnd,i=t.onClose,a=t.contextId,s=p.useState(t.animate==="open"),l=s[0],c=s[1];p.useEffect(function(){return l?r!=="open"?(n(),c(!1),Wr):e.current?Wr:(e.current=setTimeout(function(){e.current=null,c(!1)}),n):Wr},[r,l,n]);var u=j(function(f){f.propertyName==="height"&&(o(),r==="close"&&i())},[r,i,o]),d=nx({isAnimatingOpenOnMount:l,animate:t.animate,placeholder:t.placeholder});return pe.createElement(t.placeholder.tagName,{style:d,"data-rbd-placeholder-context-id":a,onTransitionEnd:u,ref:t.innerRef})}var ox=pe.memo(rx),Yo=pe.createContext(null),ix=function(t){rl(e,t);function e(){for(var r,o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=t.call.apply(t,[this].concat(i))||this,r.state={isVisible:Boolean(r.props.on),data:r.props.on,animate:r.props.shouldAnimate&&r.props.on?"open":"none"},r.onClose=function(){r.state.animate==="close"&&r.setState({isVisible:!1})},r}e.getDerivedStateFromProps=function(o,i){return o.shouldAnimate?o.on?{isVisible:!0,data:o.on,animate:"open"}:i.isVisible?{isVisible:!0,data:i.data,animate:"close"}:{isVisible:!1,animate:"close",data:null}:{isVisible:Boolean(o.on),data:o.on,animate:"none"}};var n=e.prototype;return n.render=function(){if(!this.state.isVisible)return null;var o={onClose:this.onClose,data:this.state.data,animate:this.state.animate};return this.props.children(o)},e}(pe.PureComponent),Us={dragging:5e3,dropAnimating:4500},ax=function(e,n){return n?sn.drop(n.duration):e?sn.snap:sn.fluid},sx=function(e,n){return e?n?vn.opacity.drop:vn.opacity.combining:null},lx=function(e){return e.forceShouldAnimate!=null?e.forceShouldAnimate:e.mode==="SNAP"};function cx(t){var e=t.dimension,n=e.client,r=t.offset,o=t.combineWith,i=t.dropping,a=Boolean(o),s=lx(t),l=Boolean(i),c=l?co.drop(r,a):co.moveTo(r),u={position:"fixed",top:n.marginBox.top,left:n.marginBox.left,boxSizing:"border-box",width:n.borderBox.width,height:n.borderBox.height,transition:ax(s,i),transform:c,opacity:sx(a,l),zIndex:l?Us.dropAnimating:Us.dragging,pointerEvents:"none"};return u}function dx(t){return{transform:co.moveTo(t.offset),transition:t.shouldAnimateDisplacement?null:"none"}}function ux(t){return t.type==="DRAGGING"?cx(t):dx(t)}function fx(t,e,n){n===void 0&&(n=Pe);var r=window.getComputedStyle(e),o=e.getBoundingClientRect(),i=Ql(o,r),a=Xn(i,n),s={client:i,tagName:e.tagName.toLowerCase(),display:r.display},l={x:i.marginBox.width,y:i.marginBox.height},c={descriptor:t,placeholder:s,displaceBy:l,client:i,page:a};return c}function px(t){var e=qo("draggable"),n=t.descriptor,r=t.registry,o=t.getDraggableRef,i=t.canDragInteractiveElements,a=t.shouldRespectForcePress,s=t.isEnabled,l=le(function(){return{canDragInteractiveElements:i,shouldRespectForcePress:a,isEnabled:s}},[i,s,a]),c=j(function(g){var v=o();return v||N(!1),fx(n,v,g)},[n,o]),u=le(function(){return{uniqueId:e,descriptor:n,options:l,getDimension:c}},[n,c,l,e]),d=p.useRef(u),f=p.useRef(!0);Ue(function(){return r.draggable.register(d.current),function(){return r.draggable.unregister(d.current)}},[r.draggable]),Ue(function(){if(f.current){f.current=!1;return}var g=d.current;d.current=u,r.draggable.update(u,g)},[u,r.draggable])}function gx(t){t.preventDefault()}function vx(t){var e=p.useRef(null),n=j(function(I){e.current=I},[]),r=j(function(){return e.current},[]),o=nr(yr),i=o.contextId,a=o.dragHandleUsageInstructionsId,s=o.registry,l=nr(Yo),c=l.type,u=l.droppableId,d=le(function(){return{id:t.draggableId,index:t.index,type:c,droppableId:u}},[t.draggableId,t.index,c,u]),f=t.children,g=t.draggableId,v=t.isEnabled,h=t.shouldRespectForcePress,y=t.canDragInteractiveElements,b=t.isClone,S=t.mapped,x=t.dropAnimationFinished;if(!b){var w=le(function(){return{descriptor:d,registry:s,getDraggableRef:r,canDragInteractiveElements:y,shouldRespectForcePress:h,isEnabled:v}},[d,s,r,y,h,v]);px(w)}var C=le(function(){return v?{tabIndex:0,role:"button","aria-describedby":a,"data-rbd-drag-handle-draggable-id":g,"data-rbd-drag-handle-context-id":i,draggable:!1,onDragStart:gx}:null},[i,a,g,v]),E=j(function(I){S.type==="DRAGGING"&&S.dropping&&I.propertyName==="transform"&&x()},[x,S]),T=le(function(){var I=ux(S),O=S.type==="DRAGGING"&&S.dropping?E:null,P={innerRef:n,draggableProps:{"data-rbd-draggable-context-id":i,"data-rbd-draggable-id":g,style:I,onTransitionEnd:O},dragHandleProps:C};return P},[i,C,g,S,E,n]),D=le(function(){return{draggableId:d.id,type:d.type,source:{index:d.index,droppableId:d.droppableId}}},[d.droppableId,d.id,d.index,d.type]);return f(T,S.snapshot,D)}var Vc=function(t,e){return t===e},qc=function(t){var e=t.combine,n=t.destination;return n?n.droppableId:e?e.droppableId:null},hx=function(e){return e.combine?e.combine.draggableId:null},mx=function(e){return e.at&&e.at.type==="COMBINE"?e.at.combine.draggableId:null};function bx(){var t=Oe(function(o,i){return{x:o,y:i}}),e=Oe(function(o,i,a,s,l){return{isDragging:!0,isClone:i,isDropAnimating:Boolean(l),dropAnimation:l,mode:o,draggingOver:a,combineWith:s,combineTargetFor:null}}),n=Oe(function(o,i,a,s,l,c,u){return{mapped:{type:"DRAGGING",dropping:null,draggingOver:l,combineWith:c,mode:i,offset:o,dimension:a,forceShouldAnimate:u,snapshot:e(i,s,l,c,null)}}}),r=function(i,a){if(i.isDragging){if(i.critical.draggable.id!==a.draggableId)return null;var s=i.current.client.offset,l=i.dimensions.draggables[a.draggableId],c=je(i.impact),u=mx(i.impact),d=i.forceShouldAnimate;return n(t(s.x,s.y),i.movementMode,l,a.isClone,c,u,d)}if(i.phase==="DROP_ANIMATING"){var f=i.completed;if(f.result.draggableId!==a.draggableId)return null;var g=a.isClone,v=i.dimensions.draggables[a.draggableId],h=f.result,y=h.mode,b=qc(h),S=hx(h),x=i.dropDuration,w={duration:x,curve:_o.drop,moveTo:i.newHomeClientOffset,opacity:S?vn.opacity.drop:null,scale:S?vn.scale.drop:null};return{mapped:{type:"DRAGGING",offset:i.newHomeClientOffset,dimension:v,dropping:w,draggingOver:b,combineWith:S,mode:y,forceShouldAnimate:null,snapshot:e(y,g,b,S,w)}}}return null};return r}function Kc(t){return{isDragging:!1,isDropAnimating:!1,isClone:!1,dropAnimation:null,mode:null,draggingOver:null,combineTargetFor:t,combineWith:null}}var yx={mapped:{type:"SECONDARY",offset:Pe,combineTargetFor:null,shouldAnimateDisplacement:!0,snapshot:Kc(null)}};function xx(){var t=Oe(function(a,s){return{x:a,y:s}}),e=Oe(Kc),n=Oe(function(a,s,l){return s===void 0&&(s=null),{mapped:{type:"SECONDARY",offset:a,combineTargetFor:s,shouldAnimateDisplacement:l,snapshot:e(s)}}}),r=function(s){return s?n(Pe,s,!0):null},o=function(s,l,c,u){var d=c.displaced.visible[s],f=Boolean(u.inVirtualList&&u.effected[s]),g=vr(c),v=g&&g.draggableId===s?l:null;if(!d){if(!f)return r(v);if(c.displaced.invisible[s])return null;var h=jt(u.displacedBy.point),y=t(h.x,h.y);return n(y,v,!0)}if(f)return r(v);var b=c.displacedBy.point,S=t(b.x,b.y);return n(S,v,d.shouldAnimate)},i=function(s,l){if(s.isDragging)return s.critical.draggable.id===l.draggableId?null:o(l.draggableId,s.critical.draggable.id,s.impact,s.afterCritical);if(s.phase==="DROP_ANIMATING"){var c=s.completed;return c.result.draggableId===l.draggableId?null:o(l.draggableId,c.result.draggableId,c.impact,c.afterCritical)}return null};return i}var wx=function(){var e=bx(),n=xx(),r=function(i,a){return e(i,a)||n(i,a)||yx};return r},Sx={dropAnimationFinished:Rc},Ex=Zl(wx,Sx,null,{context:Vo,pure:!0,areStatePropsEqual:Vc})(vx);function Yc(t){var e=nr(Yo),n=e.isUsingCloneFor;return n===t.draggableId&&!t.isClone?null:pe.createElement(Ex,t)}function Cx(t){var e=typeof t.isDragDisabled=="boolean"?!t.isDragDisabled:!0,n=Boolean(t.disableInteractiveElementBlocking),r=Boolean(t.shouldRespectForcePress);return pe.createElement(Yc,q({},t,{isClone:!1,isEnabled:e,canDragInteractiveElements:n,shouldRespectForcePress:r}))}function Ix(t){var e=p.useContext(yr);e||N(!1);var n=e.contextId,r=e.isMovementAllowed,o=p.useRef(null),i=p.useRef(null),a=t.children,s=t.droppableId,l=t.type,c=t.mode,u=t.direction,d=t.ignoreContainerClipping,f=t.isDropDisabled,g=t.isCombineEnabled,v=t.snapshot,h=t.useClone,y=t.updateViewportMaxScroll,b=t.getContainerForClone,S=j(function(){return o.current},[]),x=j(function(P){o.current=P},[]);j(function(){return i.current},[]);var w=j(function(P){i.current=P},[]),C=j(function(){r()&&y({maxScroll:Bc()})},[r,y]);ex({droppableId:s,type:l,mode:c,direction:u,isDropDisabled:f,isCombineEnabled:g,ignoreContainerClipping:d,getDroppableRef:S});var E=pe.createElement(ix,{on:t.placeholder,shouldAnimate:t.shouldAnimatePlaceholder},function(P){var F=P.onClose,A=P.data,z=P.animate;return pe.createElement(ox,{placeholder:A,onClose:F,innerRef:w,animate:z,contextId:n,onTransitionEnd:C})}),T=le(function(){return{innerRef:x,placeholder:E,droppableProps:{"data-rbd-droppable-id":s,"data-rbd-droppable-context-id":n}}},[n,s,E,x]),D=h?h.dragging.draggableId:null,I=le(function(){return{droppableId:s,type:l,isUsingCloneFor:D}},[s,D,l]);function O(){if(!h)return null;var P=h.dragging,F=h.render,A=pe.createElement(Yc,{draggableId:P.draggableId,index:P.source.index,isClone:!0,isEnabled:!0,shouldRespectForcePress:!1,canDragInteractiveElements:!0},function(z,V){return F(z,V,P)});return bd.createPortal(A,b())}return pe.createElement(Yo.Provider,{value:I},a(T,v),O())}var Vr=function(e,n){return e===n.droppable.type},Ws=function(e,n){return n.draggables[e.draggable.id]},Dx=function(){var e={placeholder:null,shouldAnimatePlaceholder:!0,snapshot:{isDraggingOver:!1,draggingOverWith:null,draggingFromThisWith:null,isUsingPlaceholder:!1},useClone:null},n=q({},e,{shouldAnimatePlaceholder:!1}),r=Oe(function(a){return{draggableId:a.id,type:a.type,source:{index:a.index,droppableId:a.droppableId}}}),o=Oe(function(a,s,l,c,u,d){var f=u.descriptor.id,g=u.descriptor.droppableId===a;if(g){var v=d?{render:d,dragging:r(u.descriptor)}:null,h={isDraggingOver:l,draggingOverWith:l?f:null,draggingFromThisWith:f,isUsingPlaceholder:!0};return{placeholder:u.placeholder,shouldAnimatePlaceholder:!1,snapshot:h,useClone:v}}if(!s)return n;if(!c)return e;var y={isDraggingOver:l,draggingOverWith:f,draggingFromThisWith:null,isUsingPlaceholder:!0};return{placeholder:u.placeholder,shouldAnimatePlaceholder:!0,snapshot:y,useClone:null}}),i=function(s,l){var c=l.droppableId,u=l.type,d=!l.isDropDisabled,f=l.renderClone;if(s.isDragging){var g=s.critical;if(!Vr(u,g))return n;var v=Ws(g,s.dimensions),h=je(s.impact)===c;return o(c,d,h,h,v,f)}if(s.phase==="DROP_ANIMATING"){var y=s.completed;if(!Vr(u,y.critical))return n;var b=Ws(y.critical,s.dimensions);return o(c,d,qc(y.result)===c,je(y.impact)===c,b,f)}if(s.phase==="IDLE"&&s.completed&&!s.shouldFlush){var S=s.completed;if(!Vr(u,S.critical))return n;var x=je(S.impact)===c,w=Boolean(S.impact.at&&S.impact.at.type==="COMBINE"),C=S.critical.droppable.id===c;return x?w?e:n:C?e:n}return n};return i},Rx={updateViewportMaxScroll:Nb};function Ox(){return document.body||N(!1),document.body}var Px={mode:"standard",type:"DEFAULT",direction:"vertical",isDropDisabled:!1,isCombineEnabled:!1,ignoreContainerClipping:!1,renderClone:null,getContainerForClone:Ox},Xc=Zl(Dx,Rx,null,{context:Vo,pure:!0,areStatePropsEqual:Vc})(Ix);Xc.defaultProps=Px;function Vs(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,r)}return n}function dt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Vs(Object(n),!0).forEach(function(r){Ax(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Vs(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Ax(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const Xo=t=>{if(!(t!=null&&t.type))throw new Error(`
      type must be provided.
      Example: orderRankField({type: 'category'})
      `);const{type:e}=t;return yd(dt(dt({title:"Order Rank",readOnly:!0,hidden:!0},t),{},{name:"orderRank",type:"string",initialValue:async(n,r)=>{let{getClient:o}=r;return function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return(i?st.LexoRank.parse(i):st.LexoRank.min()).genNext().genNext().value}(await o({apiVersion:"2021-09-01"}).fetch("*[_type == $type]|order(@[$order] desc)[0][$order]",{type:e,order:"orderRank"}))}}))},Zo={title:"Ordered",name:"ordered",by:[{field:"orderRank",direction:"asc"}]},Zc=pe.createContext({});function Tx(t){let{doc:e,increment:n,entities:r,handleSelect:o,index:i,isFirst:a,isLast:s}=t;const{showIncrements:l}=p.useContext(Zc),c=ol();return K(it,{align:"center",children:[m(re,{paddingX:3,style:{flexShrink:0},children:m(Ee,{size:4,children:m(Ed,{})})}),l&&K(it,{style:{flexShrink:0},align:"center",gap:1,paddingRight:1,children:[m(ft,{padding:2,mode:"ghost",onClick:()=>n(i,i+-1,e._id,r),disabled:a,icon:Cd}),m(ft,{padding:2,mode:"ghost",disabled:s,onClick:()=>n(i,i+1,e._id,r),icon:tl})]}),m(ft,{style:{width:"100%"},padding:2,mode:"bleed",onClick:u=>o(e._id,i,u.nativeEvent),children:m(it,{flex:1,align:"center",children:m(re,{flex:1,children:m(Id,{layout:"default",value:e,schemaType:c.get(e._type)})})})})]})}function Bx(t,e){return t.orderRank<e.orderRank?-1:t.orderRank>e.orderRank?1:0}function Jc(){return wd({apiVersion:"2021-09-01"})}function Mx(t){let{data:e,type:n,listIsUpdating:r,setListIsUpdating:o}=t;const i=$l(),a=Sd(),{navigateIntent:s}=a,[l,c]=p.useState(e);p.useEffect(()=>{r||c(e)},[e]);const[u,d]=p.useState(""),[f,g]=p.useState([]),v=p.useCallback(()=>g([]),[g]),h=p.useCallback((D,I,O)=>{const P=f.includes(D),F=O.shiftKey,A=navigator.appVersion.indexOf("Win")!==-1?O.ctrlKey:O.metaKey;let z=[];if(!F&&!A)return s("edit",{id:D,type:n}),g([D]);if(F&&!P){const V=f[f.length-1],H=l.findIndex(L=>L._id===V),X=I<H?I:H,Y=I>H?I:H,U=l.filter((L,G)=>G>X&&G<Y).map(L=>L._id);z=[...f,...U,D]}else z=P?f.filter(V=>V!==D):[...f,D];return g(z)},[g,s,l,f,n]),y=Jc(),b=p.useCallback(async(D,I)=>{const O=y.transaction();D.forEach(P=>{let[F,A]=P;return O.patch(F,A)}),await O.commit().then(P=>{v(),d(""),o(!1),i.push({title:"".concat(P.results.length===1?"1 Document":"".concat(P.results.length," Documents")," Reordered"),status:"success",description:I})}).catch(()=>{d(""),o(!1),i.push({title:"Reordering failed",status:"error"})})},[y,d,v,o,i]),S=p.useCallback((D,I)=>{d("");const{source:O,destination:P,draggableId:F}=D??{};if((O==null?void 0:O.index)===(P==null?void 0:P.index)||!(I!=null&&I.length)||!F)return;const A=f!=null&&f.length?f:[F];if(!(A!=null&&A.length))return;o(!0),g(A);const{newOrder:z,patches:V,message:H}=(X=>{let{entities:Y,selectedIds:U,source:L,destination:G,debug:te=!1}=X;const ye=L.index,ne=G.index,oe=ye>ne,ge=Y.filter(ve=>U.includes(ve._id)),de=["Moved",ge.length===1?"1 Document":"".concat(ge.length," Documents"),oe?"up":"down","from position","".concat(ye+1," to ").concat(ne+1)].join(" "),{all:he,selected:we}=Y.reduce((ve,me,Re)=>{var Ae,ke,ie,Ce;if(U.includes(me._id))return{all:ve.all,selected:ve.selected};if(Re===ne){const xe=Re-1,Ie=(Ae=Y[xe])!=null&&Ae.orderRank?st.LexoRank.parse((ke=Y[xe])==null?void 0:ke.orderRank):st.LexoRank.min(),We=st.LexoRank.parse(Y[Re].orderRank),Ve=Re+1,yt=(ie=Y[Ve])!=null&&ie.orderRank?st.LexoRank.parse((Ce=Y[Ve])==null?void 0:Ce.orderRank):st.LexoRank.max();let be=oe?Ie.between(We):We.between(yt);for(let ze=0;ze<ge.length;ze+=1)ge[ze].orderRank=be.value,be=oe?be.between(We):be.between(yt);return{all:oe?[...ve.all,...ge,me]:[...ve.all,me,...ge],selected:ge}}return{all:[...ve.all,me],selected:ve.selected}},{all:[],selected:[]}),Se=we.map(ve=>[ve._id,{set:{orderRank:ve.orderRank}}]);return{newOrder:he.sort(Bx),patches:Se,message:de}})({entities:I,selectedIds:A,source:O,destination:P});z!=null&&z.length&&c(z),V!=null&&V.length&&b(V,H)},[f,d,g,b,o]),x=p.useCallback(D=>{const I=D.draggableId;f.includes(I)||v(),d(I)},[f,v,d]),w=p.useCallback((D,I,O,P)=>S({draggableId:O,source:{index:D},destination:{index:I}},P),[S]),C=p.useCallback(D=>{D.key==="Escape"&&v()},[v]);p.useEffect(()=>(window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}),[C]);const E=p.useMemo(()=>{if(!l.length)return[];const D=l.map(I=>I.orderRank);return D.filter((I,O)=>D.indexOf(I)!==O)},[l]),T=p.useCallback(D=>S(D,l),[l,S]);return m(Gy,{onDragStart:x,onDragEnd:T,children:m(Xc,{droppableId:"documentSortZone",children:D=>K("div",dt(dt({},D.droppableProps),{},{ref:D.innerRef,children:[l.map((I,O)=>m(Cx,{draggableId:I._id,index:O,children:(P,F)=>{const A=f.includes(I._id),z=F.isDragging,V=Boolean(!z&&u&&A),H=r&&A,X=Boolean(!I.orderRank),Y=(G=>{const{isDuplicate:te,isGhosting:ye,isDragging:ne,isSelected:oe}=G;return ye?"transparent":ne||oe?"primary":te?"caution":void 0})({isDuplicate:E.includes(I.orderRank),isGhosting:V,isDragging:z,isSelected:A});return m("div",dt(dt(dt({ref:P.innerRef},P.draggableProps),P.dragHandleProps),{},{style:X?{opacity:.2,pointerEvents:"none"}:(U=P.draggableProps.style,L=H,dt({userSelect:"none",transition:"opacity 500ms ease-in-out",opacity:L?.2:1,pointerEvents:L?"none":void 0},U)),children:m(re,{paddingBottom:1,children:m(Je,{tone:Y,shadow:z?2:void 0,radius:2,children:m(Tx,{doc:I,entities:l,handleSelect:h,increment:w,index:O,isFirst:O===0,isLast:O===l.length-1})})})}));var U,L}},"".concat(I._id,"-").concat(I.orderRank))),D.placeholder]}))})})}function Qc(t){let{children:e}=t;return m(re,{padding:3,children:m(Je,{padding:4,radius:2,shadow:1,tone:"caution",children:m(Ee,{children:e})})})}const kx={};function Nx(t){let{type:e,filter:n,params:r=kx}=t;const[o,i]=p.useState(!0),[a,s]=p.useState(!1),[l,c]=p.useState([]),u=Jc();p.useEffect(()=>{const f="*[_type == $type ".concat(n?"&& ".concat(n):"",`]|order(@[$order] asc){
      _id, _type, `).concat("orderRank",`
    }`),g=Object.assign(r,{type:e,order:"orderRank"});let v;const h=async()=>{u.fetch(f,g).then(y=>{const b=y.reduce((S,x)=>x._id.startsWith("drafts.")?[...S,x]:y.some(w=>w._id==="drafts.".concat(x._id))?S:[...S,x],[]);c(b),o&&i(!1)})};return a||l.length||(async()=>(i(!0),await h(),v||(v=u.listen(f,g).subscribe(()=>h()))))(),()=>v==null?void 0:v.unsubscribe()},[e]);const d=p.useMemo(()=>l.length?l.filter(f=>!f.orderRank).length:0,[l]);return o?m(it,{style:{width:"100%",height:"100%"},align:"center",justify:"center",children:m(Rl,{})}):K(Ht,{space:1,style:{overflow:"scroll",height:"100%"},children:[d>0&&K(Qc,{children:[d,"/",l.length," Documents have no Order. Select"," ",m("strong",{children:"Reset Order"})," from the Menu above to fix."]}),m(re,{padding:1,children:m(Mx,{data:l,type:e,listIsUpdating:a,setListIsUpdating:s})})]})}function Lx(t){let{type:e,showIncrements:n,resetOrderTransaction:r,filter:o,params:i}=t;const a=$l(),s=ol();p.useEffect(()=>{r!=null&&r.title&&(r!=null&&r.status)&&a.push(r)},[r,a]);const l=p.useMemo(()=>{if(!e)return K(Ge,{children:["No ",m("code",{children:"type"})," was configured"]});const c=s.get(e);return c?"fields"in c&&c.fields.some(u=>(u==null?void 0:u.name)==="orderRank")?"fields"in c&&c.fields.some(u=>{var d;return(u==null?void 0:u.name)==="orderRank"&&((d=u==null?void 0:u.type)==null?void 0:d.name)!=="string"})?K(Ge,{children:[m("code",{children:"orderRank"})," field on Schema ",m("code",{children:e})," must be"," ",m("code",{children:"string"})," type"]}):"":K(Ge,{children:["Schema ",m("code",{children:e})," must have an ",m("code",{children:"orderRank"})," field of type"," ",m("code",{children:"string"})]}):K(Ge,{children:["Schema ",m("code",{children:e})," not found"]})},[e,s]);return l?m(Qc,{children:l}):m(Zc.Provider,{value:{showIncrements:n},children:m(Nx,{type:e,filter:o,params:i})})}class $x extends p.Component{constructor(e){super(e),this.actionHandlers={showIncrements:()=>{this.setState(n=>({showIncrements:!n.showIncrements}))},resetOrder:async()=>{var n;this.setState(()=>({resetOrderTransaction:{status:"info",title:"Reordering started...",closable:!0}}));const r=await async function(){let i=arguments.length>1?arguments[1]:void 0;const a="*[_type == $type]|order(@[$order] asc)._id",s={type:arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",order:"orderRank"},l=await i.fetch(a,s);if(!l.length)return null;const c=i.transaction();let u=st.LexoRank.min();for(let d=0;d<l.length;d+=1)u=u.genNext().genNext(),c.patch(l[d],{set:{orderRank:u.value}});return c.commit().then(d=>d).catch(d=>d)}(this.props.options.type,this.props.options.client),o=(n=r==null?void 0:r.results)==null?void 0:n.length;this.setState(()=>({resetOrderTransaction:{status:o?"success":"info",title:o?"Reordered ".concat(r.results.length===1?"Document":"Documents"):"Reordering failed",closable:!0}}))}},this.state={showIncrements:!1,resetOrderTransaction:{}}}render(){var e,n,r,o,i,a;const s=(n=(e=this==null?void 0:this.props)==null?void 0:e.options)==null?void 0:n.type;return s?m(Lx,{filter:(o=(r=this==null?void 0:this.props)==null?void 0:r.options)==null?void 0:o.filter,params:(a=(i=this==null?void 0:this.props)==null?void 0:i.options)==null?void 0:a.params,type:s,showIncrements:this.state.showIncrements,resetOrderTransaction:this.state.resetOrderTransaction}):null}}function Un(t){var e,n;if(!(t!=null&&t.type)||!t.context||!t.S)throw new Error(`
    type, context and S (StructureBuilder) must be provided.
    context and S are available when configuring structure.
    Example: orderableDocumentListDeskItem({type: 'category'})
    `);const{type:r,filter:o,params:i,title:a,icon:s,id:l,context:c,S:u}=t,{schema:d,getClient:f}=c,g=f({apiVersion:"2021-09-01"}),v=a??"Orderable ".concat(r),h=l??"orderable-".concat(r),y=s??ii,b=(n=(e=d.get(r))==null?void 0:e.title)!=null?n:r;return u.listItem().title(v).id(h).icon(y).child(Object.assign(u.documentTypeList(r).serialize(),{__preserveInstance:!0,key:h,type:"component",component:$x,options:{type:r,filter:o,params:i,client:g},menuItems:[u.menuItem().title("Create new ".concat(b)).intent({type:"create",params:{type:r}}).serialize(),u.menuItem().title("Reset Order").icon(xd).action("resetOrder").serialize(),u.menuItem().title("Show Increments").icon(ii).action("showIncrements").serialize()]})).serialize()}const Fx=Dd(t=>{const{name:e,title:n,icon:r,...o}=t||{};return{name:"@sanity/vision",tools:[{name:e||"vision",title:n||"Vision",icon:r||Rd,component:p.lazy(()=>Od(()=>import("./SanityVision-8a519187-bb3b2aac.js"),["static/SanityVision-8a519187-bb3b2aac.js","static/desk-257f76bb-bca7b027.js","static/index-5d24cd7c.js"])),options:o,router:Pd.create("/*")}]}}),zx={name:"careers",type:"document",title:"Careers",fields:[{name:"position",title:"Position",type:"string"},{name:"slug",title:"Slug",type:"string"},{name:"listed",title:"Listed",type:"boolean"},{name:"description",title:"Description",type:"array",of:[{type:"block",lists:[{title:"Bullet",value:"bullet"}]}]}]},_x={name:"_descriptions",title:"Descriptions",type:"object",fields:[{name:"title",title:"Title",type:"string"},{name:"copy",title:"Copy",type:"text"},{name:"image",title:"Image",type:"file"}]},Gx={name:"_leadership",title:"Leadership",type:"object",fields:[{name:"name",title:"Name",type:"string"},{name:"position",title:"Position",type:"string"},{name:"image",title:"Image",type:"file"}]},Hx={name:"about",title:"About",type:"document",fields:[{name:"version",title:"Version",description:"Name of this version of about page data",type:"string"},{name:"descriptions",title:"Descriptions",type:"array",of:[{type:"_descriptions"}]},{name:"leadership",title:"Leadership",type:"array",of:[{type:"_leadership"}]}]},jx={name:"_fileSet",title:"File Set",type:"object",fields:[{name:"linkName",title:"Link Name",type:"string"},{name:"link",title:"Link",type:"string"},{name:"file",title:"File",type:"file"}]},Ux={name:"downloads",title:"Downloads",type:"document",fields:[{name:"category",title:"Category",type:"string"},{name:"files",title:"Files",type:"array",of:[{type:"_fileSet"}]}]},Wx={name:"_featureSet",title:"Set",type:"object",fields:[{name:"featureImage",title:"Image",type:"file"},{name:"featureText",title:"Description",type:"text"}]},Vx={name:"products",type:"document",title:"Products",fields:[{name:"name",title:"Name",type:"string"},{name:"link",title:"Link",type:"string",description:"link to child company page to learn more"},{name:"description",title:"Description",type:"array",of:[{type:"block",lists:[{title:"Bullet",value:"bullet"}]}]},{name:"image",title:"Image",type:"file"}]},qx={name:"faq",type:"document",title:"FAQs",orderings:[Zo],fields:[{name:"question",title:"Question",type:"string"},{name:"answer",title:"Answer",type:"array",of:[{type:"block"}]},Xo({type:"faq"})]},Kx={name:"socials",title:"Socials",type:"document",fields:[{name:"name",title:"Name",type:"string"},{name:"url",title:"URL",type:"string"}]},Yx={name:"caseStudies",title:"Case Studies",type:"document",fields:[{name:"title",title:"Title",type:"string"},{name:"slug",title:"Slug",type:"string"},{name:"published",title:"Published",type:"boolean"},{name:"body",title:"Body",type:"array",of:[{type:"block"},{type:"image"}]}]},Xx={name:"locations",title:"Locations",type:"document",fields:[{name:"city",title:"City",type:"string"},{name:"country",title:"Country",type:"string"},{name:"company",title:"Company",type:"string"},{name:"address",title:"Address",type:"string"}]},Zx={name:"brands",title:"Brands",type:"document",fields:[{name:"name",title:"Name",type:"string"},{name:"link",title:"Link",type:"string",description:"link to external site"},{name:"regularLogo",title:"Regular Logo",type:"file"},{name:"whiteLogo",title:"White Logo",type:"file"}]},Jx={name:"markets",title:"Markets",type:"document",orderings:[Zo],fields:[Xo({type:"markets"}),{name:"title",title:"Title",type:"string"},{name:"slug",title:"Slug",type:"string",description:"url of market article"},{name:"image",title:"Image",type:"file",description:"Thumbnail image for markets page"},{name:"bgTone",title:"Thumbnail Image Tone",type:"string",description:"Affects button and text color",options:{list:["dark","medium","light"]}},{name:"copyAlignment",title:"Copy Alignment",type:"string",description:"Alignment of copy",options:{list:["left","center","right"]}},{name:"copy",title:"Copy",type:"text",description:"Brief description of market category"},{name:"body",title:"body",description:"Individual article about the market Lithion is in. ",type:"array",of:[{type:"block",lists:[{title:"Bullet",value:"bullet"}]},{type:"image"}]}]},Qx={name:"hero",title:"Hero",type:"document",fields:[{name:"name",title:"Name",type:"string"},{name:"slogan",title:"Slogan",type:"string"},{name:"sloganLine2",title:"Slogan Line 2",type:"string"},{name:"image",title:"Image",type:"file",validation:t=>t.required()},{name:"link",title:"Link",type:"string"},{name:"live",title:"Live",type:"boolean",validation:t=>t.required()}]},ew={name:"sections",title:"Sections",type:"document",orderings:[Zo],fields:[{name:"live",title:"Live",type:"boolean",validation:t=>t.required()},{name:"title",title:"Title",type:"string"},{name:"copy",title:"Copy",type:"text"},{name:"link",title:"Link",type:"string",description:"Links to external or internal pages"},{name:"image",title:"Image",type:"file"},Xo({type:"sections"})]},tw={name:"articles",title:"Articles",type:"document",fields:[{name:"title",title:"Title",type:"string"},{name:"slug",title:"Slug",type:"string"},{name:"published",title:"Published",type:"boolean"},{name:"body",title:"Body",type:"array",of:[{type:"block",lists:[{title:"Bullet",value:"bullet"}]},{type:"image"}]}]},nw={types:[Qx,ew,Hx,_x,Gx,Zx,Jx,Vx,Wx,qx,Ux,Yx,jx,Xx,zx,Kx,tw]},rw=Ad({name:"lithionStudio",title:"Lithion Content Manager",basePath:"/studio",projectId:"fqhnt977",dataset:"staging",schema:nw,plugins:[Td({structure:(t,e)=>t.list().title("Content").items([Un({type:"faq",S:t,context:e}),Un({type:"sections",S:t,context:e}),Un({type:"brands",S:t,context:e}),Un({type:"markets",S:t,context:e}),...t.documentTypeListItems()])}),Fx({defaultApiVersion:"02-14-2023"})]});Bd(document.getElementById("sanity"),rw,{reactStrictMode:!1,basePath:"/"});export{re as B,Np as C,it as F,iw as G,Wv as H,pp as L,Ht as S,fv as T,Je as a,ft as b,aw as c,sw as d,Ee as e,Rl as f,$l as g,_ as r,mt as u};
