(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Xr(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ae={},Cn=[],ht=()=>{},Ha=()=>!1,Ei=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Jr=t=>t.startsWith("onUpdate:"),Ue=Object.assign,Zr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Lh=Object.prototype.hasOwnProperty,re=(t,e)=>Lh.call(t,e),z=Array.isArray,En=t=>wi(t)==="[object Map]",Wa=t=>wi(t)==="[object Set]",q=t=>typeof t=="function",be=t=>typeof t=="string",qt=t=>typeof t=="symbol",ge=t=>t!==null&&typeof t=="object",Va=t=>(ge(t)||q(t))&&q(t.then)&&q(t.catch),ja=Object.prototype.toString,wi=t=>ja.call(t),Fh=t=>wi(t).slice(8,-1),Ka=t=>wi(t)==="[object Object]",eo=t=>be(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Jn=Xr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Si=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},$h=/-\w/g,Wt=Si(t=>t.replace($h,e=>e.slice(1).toUpperCase())),Uh=/\B([A-Z])/g,Yt=Si(t=>t.replace(Uh,"-$1").toLowerCase()),Ga=Si(t=>t.charAt(0).toUpperCase()+t.slice(1)),Yi=Si(t=>t?`on${Ga(t)}`:""),Lt=(t,e)=>!Object.is(t,e),Gs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},za=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},to=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ul;const Ti=()=>ul||(ul=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function no(t){if(z(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=be(s)?Vh(s):no(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(be(t)||ge(t))return t}const Bh=/;(?![^(]*\))/g,Hh=/:([^]+)/,Wh=/\/\*[^]*?\*\//g;function Vh(t){const e={};return t.replace(Wh,"").split(Bh).forEach(n=>{if(n){const s=n.split(Hh);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function rn(t){let e="";if(be(t))e=t;else if(z(t))for(let n=0;n<t.length;n++){const s=rn(t[n]);s&&(e+=s+" ")}else if(ge(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const jh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Kh=Xr(jh);function qa(t){return!!t||t===""}const Ya=t=>!!(t&&t.__v_isRef===!0),se=t=>be(t)?t:t==null?"":z(t)||ge(t)&&(t.toString===ja||!q(t.toString))?Ya(t)?se(t.value):JSON.stringify(t,Qa,2):String(t),Qa=(t,e)=>Ya(e)?Qa(t,e.value):En(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[Qi(s,r)+" =>"]=i,n),{})}:Wa(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Qi(n))}:qt(e)?Qi(e):ge(e)&&!z(e)&&!Ka(e)?String(e):e,Qi=(t,e="")=>{var n;return qt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let We;class Gh{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=We,!e&&We&&(this.index=(We.scopes||(We.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=We;try{return We=this,e()}finally{We=n}}}on(){++this._on===1&&(this.prevScope=We,We=this)}off(){this._on>0&&--this._on===0&&(We=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function zh(){return We}let he;const Xi=new WeakSet;class Xa{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,We&&We.active&&We.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Xi.has(this)&&(Xi.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Za(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,hl(this),ec(this);const e=he,n=et;he=this,et=!0;try{return this.fn()}finally{tc(this),he=e,et=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)ro(e);this.deps=this.depsTail=void 0,hl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Xi.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){vr(this)&&this.run()}get dirty(){return vr(this)}}let Ja=0,Zn,es;function Za(t,e=!1){if(t.flags|=8,e){t.next=es,es=t;return}t.next=Zn,Zn=t}function so(){Ja++}function io(){if(--Ja>0)return;if(es){let e=es;for(es=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Zn;){let e=Zn;for(Zn=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function ec(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function tc(t){let e,n=t.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),ro(s),qh(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}t.deps=e,t.depsTail=n}function vr(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(nc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function nc(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===us)||(t.globalVersion=us,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!vr(t))))return;t.flags|=2;const e=t.dep,n=he,s=et;he=t,et=!0;try{ec(t);const i=t.fn(t._value);(e.version===0||Lt(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{he=n,et=s,tc(t),t.flags&=-3}}function ro(t,e=!1){const{dep:n,prevSub:s,nextSub:i}=t;if(s&&(s.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)ro(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function qh(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let et=!0;const sc=[];function St(){sc.push(et),et=!1}function Tt(){const t=sc.pop();et=t===void 0?!0:t}function hl(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=he;he=void 0;try{e()}finally{he=n}}}let us=0;class Yh{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class oo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!he||!et||he===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==he)n=this.activeLink=new Yh(he,this),he.deps?(n.prevDep=he.depsTail,he.depsTail.nextDep=n,he.depsTail=n):he.deps=he.depsTail=n,ic(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=he.depsTail,n.nextDep=void 0,he.depsTail.nextDep=n,he.depsTail=n,he.deps===n&&(he.deps=s)}return n}trigger(e){this.version++,us++,this.notify(e)}notify(e){so();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{io()}}}function ic(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)ic(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const yr=new WeakMap,on=Symbol(""),br=Symbol(""),hs=Symbol("");function Pe(t,e,n){if(et&&he){let s=yr.get(t);s||yr.set(t,s=new Map);let i=s.get(n);i||(s.set(n,i=new oo),i.map=s,i.key=n),i.track()}}function yt(t,e,n,s,i,r){const o=yr.get(t);if(!o){us++;return}const l=a=>{a&&a.trigger()};if(so(),e==="clear")o.forEach(l);else{const a=z(t),c=a&&eo(n);if(a&&n==="length"){const u=Number(s);o.forEach((h,d)=>{(d==="length"||d===hs||!qt(d)&&d>=u)&&l(h)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(hs)),e){case"add":a?c&&l(o.get("length")):(l(o.get(on)),En(t)&&l(o.get(br)));break;case"delete":a||(l(o.get(on)),En(t)&&l(o.get(br)));break;case"set":En(t)&&l(o.get(on));break}}io()}function gn(t){const e=ie(t);return e===t?e:(Pe(e,"iterate",hs),Ye(t)?e:e.map(xe))}function Ii(t){return Pe(t=ie(t),"iterate",hs),t}const Qh={__proto__:null,[Symbol.iterator](){return Ji(this,Symbol.iterator,xe)},concat(...t){return gn(this).concat(...t.map(e=>z(e)?gn(e):e))},entries(){return Ji(this,"entries",t=>(t[1]=xe(t[1]),t))},every(t,e){return mt(this,"every",t,e,void 0,arguments)},filter(t,e){return mt(this,"filter",t,e,n=>n.map(xe),arguments)},find(t,e){return mt(this,"find",t,e,xe,arguments)},findIndex(t,e){return mt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return mt(this,"findLast",t,e,xe,arguments)},findLastIndex(t,e){return mt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return mt(this,"forEach",t,e,void 0,arguments)},includes(...t){return Zi(this,"includes",t)},indexOf(...t){return Zi(this,"indexOf",t)},join(t){return gn(this).join(t)},lastIndexOf(...t){return Zi(this,"lastIndexOf",t)},map(t,e){return mt(this,"map",t,e,void 0,arguments)},pop(){return jn(this,"pop")},push(...t){return jn(this,"push",t)},reduce(t,...e){return dl(this,"reduce",t,e)},reduceRight(t,...e){return dl(this,"reduceRight",t,e)},shift(){return jn(this,"shift")},some(t,e){return mt(this,"some",t,e,void 0,arguments)},splice(...t){return jn(this,"splice",t)},toReversed(){return gn(this).toReversed()},toSorted(t){return gn(this).toSorted(t)},toSpliced(...t){return gn(this).toSpliced(...t)},unshift(...t){return jn(this,"unshift",t)},values(){return Ji(this,"values",xe)}};function Ji(t,e,n){const s=Ii(t),i=s[e]();return s!==t&&!Ye(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=n(r.value)),r}),i}const Xh=Array.prototype;function mt(t,e,n,s,i,r){const o=Ii(t),l=o!==t&&!Ye(t),a=o[e];if(a!==Xh[e]){const h=a.apply(t,r);return l?xe(h):h}let c=n;o!==t&&(l?c=function(h,d){return n.call(this,xe(h),d,t)}:n.length>2&&(c=function(h,d){return n.call(this,h,d,t)}));const u=a.call(o,c,s);return l&&i?i(u):u}function dl(t,e,n,s){const i=Ii(t);let r=n;return i!==t&&(Ye(t)?n.length>3&&(r=function(o,l,a){return n.call(this,o,l,a,t)}):r=function(o,l,a){return n.call(this,o,xe(l),a,t)}),i[e](r,...s)}function Zi(t,e,n){const s=ie(t);Pe(s,"iterate",hs);const i=s[e](...n);return(i===-1||i===!1)&&uo(n[0])?(n[0]=ie(n[0]),s[e](...n)):i}function jn(t,e,n=[]){St(),so();const s=ie(t)[e].apply(t,n);return io(),Tt(),s}const Jh=Xr("__proto__,__v_isRef,__isVue"),rc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(qt));function Zh(t){qt(t)||(t=String(t));const e=ie(this);return Pe(e,"has",t),e.hasOwnProperty(t)}class oc{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?cd:uc:r?cc:ac).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=z(e);if(!i){let a;if(o&&(a=Qh[n]))return a;if(n==="hasOwnProperty")return Zh}const l=Reflect.get(e,n,Oe(e)?e:s);if((qt(n)?rc.has(n):Jh(n))||(i||Pe(e,"get",n),r))return l;if(Oe(l)){const a=o&&eo(n)?l:l.value;return i&&ge(a)?Er(a):a}return ge(l)?i?Er(l):ao(l):l}}class lc extends oc{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];if(!this._isShallow){const a=Vt(r);if(!Ye(s)&&!Vt(s)&&(r=ie(r),s=ie(s)),!z(e)&&Oe(r)&&!Oe(s))return a||(r.value=s),!0}const o=z(e)&&eo(n)?Number(n)<e.length:re(e,n),l=Reflect.set(e,n,s,Oe(e)?e:i);return e===ie(i)&&(o?Lt(s,r)&&yt(e,"set",n,s):yt(e,"add",n,s)),l}deleteProperty(e,n){const s=re(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&yt(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!qt(n)||!rc.has(n))&&Pe(e,"has",n),s}ownKeys(e){return Pe(e,"iterate",z(e)?"length":on),Reflect.ownKeys(e)}}class ed extends oc{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const td=new lc,nd=new ed,sd=new lc(!0);const Cr=t=>t,Bs=t=>Reflect.getPrototypeOf(t);function id(t,e,n){return function(...s){const i=this.__v_raw,r=ie(i),o=En(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),u=n?Cr:e?Xs:xe;return!e&&Pe(r,"iterate",a?br:on),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:l?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function Hs(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function rd(t,e){const n={get(i){const r=this.__v_raw,o=ie(r),l=ie(i);t||(Lt(i,l)&&Pe(o,"get",i),Pe(o,"get",l));const{has:a}=Bs(o),c=e?Cr:t?Xs:xe;if(a.call(o,i))return c(r.get(i));if(a.call(o,l))return c(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!t&&Pe(ie(i),"iterate",on),i.size},has(i){const r=this.__v_raw,o=ie(r),l=ie(i);return t||(Lt(i,l)&&Pe(o,"has",i),Pe(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=ie(l),c=e?Cr:t?Xs:xe;return!t&&Pe(a,"iterate",on),l.forEach((u,h)=>i.call(r,c(u),c(h),o))}};return Ue(n,t?{add:Hs("add"),set:Hs("set"),delete:Hs("delete"),clear:Hs("clear")}:{add(i){!e&&!Ye(i)&&!Vt(i)&&(i=ie(i));const r=ie(this);return Bs(r).has.call(r,i)||(r.add(i),yt(r,"add",i,i)),this},set(i,r){!e&&!Ye(r)&&!Vt(r)&&(r=ie(r));const o=ie(this),{has:l,get:a}=Bs(o);let c=l.call(o,i);c||(i=ie(i),c=l.call(o,i));const u=a.call(o,i);return o.set(i,r),c?Lt(r,u)&&yt(o,"set",i,r):yt(o,"add",i,r),this},delete(i){const r=ie(this),{has:o,get:l}=Bs(r);let a=o.call(r,i);a||(i=ie(i),a=o.call(r,i)),l&&l.call(r,i);const c=r.delete(i);return a&&yt(r,"delete",i,void 0),c},clear(){const i=ie(this),r=i.size!==0,o=i.clear();return r&&yt(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=id(i,t,e)}),n}function lo(t,e){const n=rd(t,e);return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(re(n,i)&&i in s?n:s,i,r)}const od={get:lo(!1,!1)},ld={get:lo(!1,!0)},ad={get:lo(!0,!1)};const ac=new WeakMap,cc=new WeakMap,uc=new WeakMap,cd=new WeakMap;function ud(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function hd(t){return t.__v_skip||!Object.isExtensible(t)?0:ud(Fh(t))}function ao(t){return Vt(t)?t:co(t,!1,td,od,ac)}function dd(t){return co(t,!1,sd,ld,cc)}function Er(t){return co(t,!0,nd,ad,uc)}function co(t,e,n,s,i){if(!ge(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=hd(t);if(r===0)return t;const o=i.get(t);if(o)return o;const l=new Proxy(t,r===2?s:n);return i.set(t,l),l}function wn(t){return Vt(t)?wn(t.__v_raw):!!(t&&t.__v_isReactive)}function Vt(t){return!!(t&&t.__v_isReadonly)}function Ye(t){return!!(t&&t.__v_isShallow)}function uo(t){return t?!!t.__v_raw:!1}function ie(t){const e=t&&t.__v_raw;return e?ie(e):t}function fd(t){return!re(t,"__v_skip")&&Object.isExtensible(t)&&za(t,"__v_skip",!0),t}const xe=t=>ge(t)?ao(t):t,Xs=t=>ge(t)?Er(t):t;function Oe(t){return t?t.__v_isRef===!0:!1}function te(t){return pd(t,!1)}function pd(t,e){return Oe(t)?t:new _d(t,e)}class _d{constructor(e,n){this.dep=new oo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ie(e),this._value=n?e:xe(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Ye(e)||Vt(e);e=s?e:ie(e),Lt(e,n)&&(this._rawValue=e,this._value=s?e:xe(e),this.dep.trigger())}}function ho(t){return Oe(t)?t.value:t}const gd={get:(t,e,n)=>e==="__v_raw"?t:ho(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Oe(i)&&!Oe(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function hc(t){return wn(t)?t:new Proxy(t,gd)}class md{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new oo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=us-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&he!==this)return Za(this,!0),!0}get value(){const e=this.dep.track();return nc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function vd(t,e,n=!1){let s,i;return q(t)?s=t:(s=t.get,i=t.set),new md(s,i,n)}const Ws={},Js=new WeakMap;let en;function yd(t,e=!1,n=en){if(n){let s=Js.get(n);s||Js.set(n,s=[]),s.push(t)}}function bd(t,e,n=ae){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=n,c=O=>i?O:Ye(O)||i===!1||i===0?bt(O,1):bt(O);let u,h,d,_,v=!1,I=!1;if(Oe(t)?(h=()=>t.value,v=Ye(t)):wn(t)?(h=()=>c(t),v=!0):z(t)?(I=!0,v=t.some(O=>wn(O)||Ye(O)),h=()=>t.map(O=>{if(Oe(O))return O.value;if(wn(O))return c(O);if(q(O))return a?a(O,2):O()})):q(t)?e?h=a?()=>a(t,2):t:h=()=>{if(d){St();try{d()}finally{Tt()}}const O=en;en=u;try{return a?a(t,3,[_]):t(_)}finally{en=O}}:h=ht,e&&i){const O=h,A=i===!0?1/0:i;h=()=>bt(O(),A)}const H=zh(),$=()=>{u.stop(),H&&H.active&&Zr(H.effects,u)};if(r&&e){const O=e;e=(...A)=>{O(...A),$()}}let J=I?new Array(t.length).fill(Ws):Ws;const Y=O=>{if(!(!(u.flags&1)||!u.dirty&&!O))if(e){const A=u.run();if(i||v||(I?A.some((L,D)=>Lt(L,J[D])):Lt(A,J))){d&&d();const L=en;en=u;try{const D=[A,J===Ws?void 0:I&&J[0]===Ws?[]:J,_];J=A,a?a(e,3,D):e(...D)}finally{en=L}}}else u.run()};return l&&l(Y),u=new Xa(h),u.scheduler=o?()=>o(Y,!1):Y,_=O=>yd(O,!1,u),d=u.onStop=()=>{const O=Js.get(u);if(O){if(a)a(O,4);else for(const A of O)A();Js.delete(u)}},e?s?Y(!0):J=u.run():o?o(Y.bind(null,!0),!0):u.run(),$.pause=u.pause.bind(u),$.resume=u.resume.bind(u),$.stop=$,$}function bt(t,e=1/0,n){if(e<=0||!ge(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Oe(t))bt(t.value,e,n);else if(z(t))for(let s=0;s<t.length;s++)bt(t[s],e,n);else if(Wa(t)||En(t))t.forEach(s=>{bt(s,e,n)});else if(Ka(t)){for(const s in t)bt(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&bt(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ns(t,e,n,s){try{return s?t(...s):t()}catch(i){Ri(i,e,n)}}function dt(t,e,n,s){if(q(t)){const i=Ns(t,e,n,s);return i&&Va(i)&&i.catch(r=>{Ri(r,e,n)}),i}if(z(t)){const i=[];for(let r=0;r<t.length;r++)i.push(dt(t[r],e,n,s));return i}}function Ri(t,e,n,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ae;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,a,c)===!1)return}l=l.parent}if(r){St(),Ns(r,null,10,[t,a,c]),Tt();return}}Cd(t,n,i,s,o)}function Cd(t,e,n,s=!0,i=!1){if(i)throw t;console.error(t)}const Me=[];let at=-1;const Sn=[];let Pt=null,vn=0;const dc=Promise.resolve();let Zs=null;function Ed(t){const e=Zs||dc;return t?e.then(this?t.bind(this):t):e}function wd(t){let e=at+1,n=Me.length;for(;e<n;){const s=e+n>>>1,i=Me[s],r=ds(i);r<t||r===t&&i.flags&2?e=s+1:n=s}return e}function fo(t){if(!(t.flags&1)){const e=ds(t),n=Me[Me.length-1];!n||!(t.flags&2)&&e>=ds(n)?Me.push(t):Me.splice(wd(e),0,t),t.flags|=1,fc()}}function fc(){Zs||(Zs=dc.then(_c))}function Sd(t){z(t)?Sn.push(...t):Pt&&t.id===-1?Pt.splice(vn+1,0,t):t.flags&1||(Sn.push(t),t.flags|=1),fc()}function fl(t,e,n=at+1){for(;n<Me.length;n++){const s=Me[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Me.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function pc(t){if(Sn.length){const e=[...new Set(Sn)].sort((n,s)=>ds(n)-ds(s));if(Sn.length=0,Pt){Pt.push(...e);return}for(Pt=e,vn=0;vn<Pt.length;vn++){const n=Pt[vn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Pt=null,vn=0}}const ds=t=>t.id==null?t.flags&2?-1:1/0:t.id;function _c(t){try{for(at=0;at<Me.length;at++){const e=Me[at];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ns(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;at<Me.length;at++){const e=Me[at];e&&(e.flags&=-2)}at=-1,Me.length=0,pc(),Zs=null,(Me.length||Sn.length)&&_c()}}let ze=null,gc=null;function ei(t){const e=ze;return ze=t,gc=t&&t.type.__scopeId||null,e}function Td(t,e=ze,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&wl(-1);const r=ei(e);let o;try{o=t(...i)}finally{ei(r),s._d&&wl(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function ln(t,e){if(ze===null)return t;const n=Oi(ze),s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=ae]=e[i];r&&(q(r)&&(r={mounted:r,updated:r}),r.deep&&bt(o),s.push({dir:r,instance:n,value:o,oldValue:void 0,arg:l,modifiers:a}))}return t}function Jt(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(St(),dt(a,n,8,[t.el,l,t,e]),Tt())}}const Id=Symbol("_vte"),Rd=t=>t.__isTeleport,xd=Symbol("_leaveCb");function po(t,e){t.shapeFlag&6&&t.component?(t.transition=e,po(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function mc(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const ti=new WeakMap;function ts(t,e,n,s,i=!1){if(z(t)){t.forEach((v,I)=>ts(v,e&&(z(e)?e[I]:e),n,s,i));return}if(ns(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ts(t,e,n,s.component.subTree);return}const r=s.shapeFlag&4?Oi(s.component):s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,u=l.refs===ae?l.refs={}:l.refs,h=l.setupState,d=ie(h),_=h===ae?Ha:v=>re(d,v);if(c!=null&&c!==a){if(pl(e),be(c))u[c]=null,_(c)&&(h[c]=null);else if(Oe(c)){c.value=null;const v=e;v.k&&(u[v.k]=null)}}if(q(a))Ns(a,l,12,[o,u]);else{const v=be(a),I=Oe(a);if(v||I){const H=()=>{if(t.f){const $=v?_(a)?h[a]:u[a]:a.value;if(i)z($)&&Zr($,r);else if(z($))$.includes(r)||$.push(r);else if(v)u[a]=[r],_(a)&&(h[a]=u[a]);else{const J=[r];a.value=J,t.k&&(u[t.k]=J)}}else v?(u[a]=o,_(a)&&(h[a]=o)):I&&(a.value=o,t.k&&(u[t.k]=o))};if(o){const $=()=>{H(),ti.delete(t)};$.id=-1,ti.set(t,$),Ke($,n)}else pl(t),H()}}}function pl(t){const e=ti.get(t);e&&(e.flags|=8,ti.delete(t))}Ti().requestIdleCallback;Ti().cancelIdleCallback;const ns=t=>!!t.type.__asyncLoader,vc=t=>t.type.__isKeepAlive;function Nd(t,e){yc(t,"a",e)}function Ad(t,e){yc(t,"da",e)}function yc(t,e,n=Le){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(xi(e,s,n),n){let i=n.parent;for(;i&&i.parent;)vc(i.parent.vnode)&&kd(s,e,n,i),i=i.parent}}function kd(t,e,n,s){const i=xi(e,t,s,!0);Ai(()=>{Zr(s[e],i)},n)}function xi(t,e,n=Le,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{St();const l=As(n),a=dt(e,n,t,o);return l(),Tt(),a});return s?i.unshift(r):i.push(r),r}}const xt=t=>(e,n=Le)=>{(!ps||t==="sp")&&xi(t,(...s)=>e(...s),n)},Pd=xt("bm"),Ni=xt("m"),Od=xt("bu"),Dd=xt("u"),Md=xt("bum"),Ai=xt("um"),Ld=xt("sp"),Fd=xt("rtg"),$d=xt("rtc");function Ud(t,e=Le){xi("ec",t,e)}const Bd=Symbol.for("v-ndc");function Dt(t,e,n,s){let i;const r=n,o=z(t);if(o||be(t)){const l=o&&wn(t);let a=!1,c=!1;l&&(a=!Ye(t),c=Vt(t),t=Ii(t)),i=new Array(t.length);for(let u=0,h=t.length;u<h;u++)i[u]=e(a?c?Xs(xe(t[u])):xe(t[u]):t[u],u,void 0,r)}else if(typeof t=="number"){i=new Array(t);for(let l=0;l<t;l++)i[l]=e(l+1,l,void 0,r)}else if(ge(t))if(t[Symbol.iterator])i=Array.from(t,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(t);i=new Array(l.length);for(let a=0,c=l.length;a<c;a++){const u=l[a];i[a]=e(t[u],u,a,r)}}else i=[];return i}const wr=t=>t?Bc(t)?Oi(t):wr(t.parent):null,ss=Ue(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>wr(t.parent),$root:t=>wr(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Cc(t),$forceUpdate:t=>t.f||(t.f=()=>{fo(t.update)}),$nextTick:t=>t.n||(t.n=Ed.bind(t.proxy)),$watch:t=>cf.bind(t)}),er=(t,e)=>t!==ae&&!t.__isScriptSetup&&re(t,e),Hd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(er(s,e))return o[e]=1,s[e];if(i!==ae&&re(i,e))return o[e]=2,i[e];if((c=t.propsOptions[0])&&re(c,e))return o[e]=3,r[e];if(n!==ae&&re(n,e))return o[e]=4,n[e];Sr&&(o[e]=0)}}const u=ss[e];let h,d;if(u)return e==="$attrs"&&Pe(t.attrs,"get",""),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==ae&&re(n,e))return o[e]=4,n[e];if(d=a.config.globalProperties,re(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return er(i,e)?(i[e]=n,!0):s!==ae&&re(s,e)?(s[e]=n,!0):re(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,propsOptions:r,type:o}},l){let a,c;return!!(n[l]||t!==ae&&l[0]!=="$"&&re(t,l)||er(e,l)||(a=r[0])&&re(a,l)||re(s,l)||re(ss,l)||re(i.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:re(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function _l(t){return z(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Sr=!0;function Wd(t){const e=Cc(t),n=t.proxy,s=t.ctx;Sr=!1,e.beforeCreate&&gl(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:_,updated:v,activated:I,deactivated:H,beforeDestroy:$,beforeUnmount:J,destroyed:Y,unmounted:O,render:A,renderTracked:L,renderTriggered:D,errorCaptured:M,serverPrefetch:_e,expose:ce,inheritAttrs:Ce,components:Re,directives:Se,filters:F}=e;if(c&&Vd(c,s,null),o)for(const P in o){const U=o[P];q(U)&&(s[P]=U.bind(n))}if(i){const P=i.call(n,n);ge(P)&&(t.data=ao(P))}if(Sr=!0,r)for(const P in r){const U=r[P],ye=q(U)?U.bind(n,n):q(U.get)?U.get.bind(n,n):ht,gt=!q(U)&&q(U.set)?U.set.bind(n):ht,Xt=_s({get:ye,set:gt});Object.defineProperty(s,P,{enumerable:!0,configurable:!0,get:()=>Xt.value,set:nt=>Xt.value=nt})}if(l)for(const P in l)bc(l[P],s,n,P);if(a){const P=q(a)?a.call(n):a;Reflect.ownKeys(P).forEach(U=>{Yd(U,P[U])})}u&&gl(u,t,"c");function S(P,U){z(U)?U.forEach(ye=>P(ye.bind(n))):U&&P(U.bind(n))}if(S(Pd,h),S(Ni,d),S(Od,_),S(Dd,v),S(Nd,I),S(Ad,H),S(Ud,M),S($d,L),S(Fd,D),S(Md,J),S(Ai,O),S(Ld,_e),z(ce))if(ce.length){const P=t.exposed||(t.exposed={});ce.forEach(U=>{Object.defineProperty(P,U,{get:()=>n[U],set:ye=>n[U]=ye,enumerable:!0})})}else t.exposed||(t.exposed={});A&&t.render===ht&&(t.render=A),Ce!=null&&(t.inheritAttrs=Ce),Re&&(t.components=Re),Se&&(t.directives=Se),_e&&mc(t)}function Vd(t,e,n=ht){z(t)&&(t=Tr(t));for(const s in t){const i=t[s];let r;ge(i)?"default"in i?r=zs(i.from||s,i.default,!0):r=zs(i.from||s):r=zs(i),Oe(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function gl(t,e,n){dt(z(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function bc(t,e,n,s){let i=s.includes(".")?Dc(n,s):()=>n[s];if(be(t)){const r=e[t];q(r)&&an(i,r)}else if(q(t))an(i,t.bind(n));else if(ge(t))if(z(t))t.forEach(r=>bc(r,e,n,s));else{const r=q(t.handler)?t.handler.bind(n):e[t.handler];q(r)&&an(i,r,t)}}function Cc(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>ni(a,c,o,!0)),ni(a,e,o)),ge(e)&&r.set(e,a),a}function ni(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&ni(t,r,n,!0),i&&i.forEach(o=>ni(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=jd[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const jd={data:ml,props:vl,emits:vl,methods:Qn,computed:Qn,beforeCreate:De,created:De,beforeMount:De,mounted:De,beforeUpdate:De,updated:De,beforeDestroy:De,beforeUnmount:De,destroyed:De,unmounted:De,activated:De,deactivated:De,errorCaptured:De,serverPrefetch:De,components:Qn,directives:Qn,watch:Gd,provide:ml,inject:Kd};function ml(t,e){return e?t?function(){return Ue(q(t)?t.call(this,this):t,q(e)?e.call(this,this):e)}:e:t}function Kd(t,e){return Qn(Tr(t),Tr(e))}function Tr(t){if(z(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function De(t,e){return t?[...new Set([].concat(t,e))]:e}function Qn(t,e){return t?Ue(Object.create(null),t,e):e}function vl(t,e){return t?z(t)&&z(e)?[...new Set([...t,...e])]:Ue(Object.create(null),_l(t),_l(e??{})):e}function Gd(t,e){if(!t)return e;if(!e)return t;const n=Ue(Object.create(null),t);for(const s in e)n[s]=De(t[s],e[s]);return n}function Ec(){return{app:null,config:{isNativeTag:Ha,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zd=0;function qd(t,e){return function(s,i=null){q(s)||(s=Ue({},s)),i!=null&&!ge(i)&&(i=null);const r=Ec(),o=new WeakSet,l=[];let a=!1;const c=r.app={_uid:zd++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:kf,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&q(u.install)?(o.add(u),u.install(c,...h)):q(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,d){if(!a){const _=c._ceVNode||Et(s,i);return _.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),t(_,u,d),a=!0,c._container=u,u.__vue_app__=c,Oi(_.component)}},onUnmount(u){l.push(u)},unmount(){a&&(dt(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Tn;Tn=c;try{return u()}finally{Tn=h}}};return c}}let Tn=null;function Yd(t,e){if(Le){let n=Le.provides;const s=Le.parent&&Le.parent.provides;s===n&&(n=Le.provides=Object.create(s)),n[t]=e}}function zs(t,e,n=!1){const s=Tf();if(s||Tn){let i=Tn?Tn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&q(e)?e.call(s&&s.proxy):e}}const wc={},Sc=()=>Object.create(wc),Tc=t=>Object.getPrototypeOf(t)===wc;function Qd(t,e,n,s=!1){const i={},r=Sc();t.propsDefaults=Object.create(null),Ic(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:dd(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function Xd(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=ie(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(ki(t.emitsOptions,d))continue;const _=e[d];if(a)if(re(r,d))_!==r[d]&&(r[d]=_,c=!0);else{const v=Wt(d);i[v]=Ir(a,l,v,_,t,!1)}else _!==r[d]&&(r[d]=_,c=!0)}}}else{Ic(t,e,i,r)&&(c=!0);let u;for(const h in l)(!e||!re(e,h)&&((u=Yt(h))===h||!re(e,u)))&&(a?n&&(n[h]!==void 0||n[u]!==void 0)&&(i[h]=Ir(a,l,h,void 0,t,!0)):delete i[h]);if(r!==l)for(const h in r)(!e||!re(e,h))&&(delete r[h],c=!0)}c&&yt(t.attrs,"set","")}function Ic(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(Jn(a))continue;const c=e[a];let u;i&&re(i,u=Wt(a))?!r||!r.includes(u)?n[u]=c:(l||(l={}))[u]=c:ki(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=ie(n),c=l||ae;for(let u=0;u<r.length;u++){const h=r[u];n[h]=Ir(i,a,h,c[h],t,!re(c,h))}}return o}function Ir(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=re(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&q(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const u=As(i);s=c[n]=a.call(null,e),u()}}else s=a;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===Yt(n))&&(s=!0))}return s}const Jd=new WeakMap;function Rc(t,e,n=!1){const s=n?Jd:e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!q(t)){const u=h=>{a=!0;const[d,_]=Rc(h,e,!0);Ue(o,d),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!r&&!a)return ge(t)&&s.set(t,Cn),Cn;if(z(r))for(let u=0;u<r.length;u++){const h=Wt(r[u]);yl(h)&&(o[h]=ae)}else if(r)for(const u in r){const h=Wt(u);if(yl(h)){const d=r[u],_=o[h]=z(d)||q(d)?{type:d}:Ue({},d),v=_.type;let I=!1,H=!0;if(z(v))for(let $=0;$<v.length;++$){const J=v[$],Y=q(J)&&J.name;if(Y==="Boolean"){I=!0;break}else Y==="String"&&(H=!1)}else I=q(v)&&v.name==="Boolean";_[0]=I,_[1]=H,(I||re(_,"default"))&&l.push(h)}}const c=[o,l];return ge(t)&&s.set(t,c),c}function yl(t){return t[0]!=="$"&&!Jn(t)}const _o=t=>t==="_"||t==="_ctx"||t==="$stable",go=t=>z(t)?t.map(ct):[ct(t)],Zd=(t,e,n)=>{if(e._n)return e;const s=Td((...i)=>go(e(...i)),n);return s._c=!1,s},xc=(t,e,n)=>{const s=t._ctx;for(const i in t){if(_o(i))continue;const r=t[i];if(q(r))e[i]=Zd(i,r,s);else if(r!=null){const o=go(r);e[i]=()=>o}}},Nc=(t,e)=>{const n=go(e);t.slots.default=()=>n},Ac=(t,e,n)=>{for(const s in e)(n||!_o(s))&&(t[s]=e[s])},ef=(t,e,n)=>{const s=t.slots=Sc();if(t.vnode.shapeFlag&32){const i=e._;i?(Ac(s,e,n),n&&za(s,"_",i,!0)):xc(e,s)}else e&&Nc(t,e)},tf=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=ae;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:Ac(i,e,n):(r=!e.$stable,xc(e,i)),o=e}else e&&(Nc(t,e),o={default:1});if(r)for(const l in i)!_o(l)&&o[l]==null&&delete i[l]},Ke=mf;function nf(t){return sf(t)}function sf(t,e){const n=Ti();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:_=ht,insertStaticContent:v}=t,I=(f,p,g,E=null,y=null,b=null,x=void 0,R=null,T=!!p.dynamicChildren)=>{if(f===p)return;f&&!Kn(f,p)&&(E=Us(f),nt(f,y,b,!0),f=null),p.patchFlag===-2&&(T=!1,p.dynamicChildren=null);const{type:C,ref:V,shapeFlag:k}=p;switch(C){case Pi:H(f,p,g,E);break;case jt:$(f,p,g,E);break;case nr:f==null&&J(p,g,E,x);break;case Ne:Re(f,p,g,E,y,b,x,R,T);break;default:k&1?A(f,p,g,E,y,b,x,R,T):k&6?Se(f,p,g,E,y,b,x,R,T):(k&64||k&128)&&C.process(f,p,g,E,y,b,x,R,T,Wn)}V!=null&&y?ts(V,f&&f.ref,b,p||f,!p):V==null&&f&&f.ref!=null&&ts(f.ref,null,b,f,!0)},H=(f,p,g,E)=>{if(f==null)s(p.el=l(p.children),g,E);else{const y=p.el=f.el;p.children!==f.children&&c(y,p.children)}},$=(f,p,g,E)=>{f==null?s(p.el=a(p.children||""),g,E):p.el=f.el},J=(f,p,g,E)=>{[f.el,f.anchor]=v(f.children,p,g,E,f.el,f.anchor)},Y=({el:f,anchor:p},g,E)=>{let y;for(;f&&f!==p;)y=d(f),s(f,g,E),f=y;s(p,g,E)},O=({el:f,anchor:p})=>{let g;for(;f&&f!==p;)g=d(f),i(f),f=g;i(p)},A=(f,p,g,E,y,b,x,R,T)=>{if(p.type==="svg"?x="svg":p.type==="math"&&(x="mathml"),f==null)L(p,g,E,y,b,x,R,T);else{const C=f.el&&f.el._isVueCE?f.el:null;try{C&&C._beginPatch(),_e(f,p,y,b,x,R,T)}finally{C&&C._endPatch()}}},L=(f,p,g,E,y,b,x,R)=>{let T,C;const{props:V,shapeFlag:k,transition:W,dirs:G}=f;if(T=f.el=o(f.type,b,V&&V.is,V),k&8?u(T,f.children):k&16&&M(f.children,T,null,E,y,tr(f,b),x,R),G&&Jt(f,null,E,"created"),D(T,f,f.scopeId,x,E),V){for(const ue in V)ue!=="value"&&!Jn(ue)&&r(T,ue,null,V[ue],b,E);"value"in V&&r(T,"value",null,V.value,b),(C=V.onVnodeBeforeMount)&&ot(C,E,f)}G&&Jt(f,null,E,"beforeMount");const ee=rf(y,W);ee&&W.beforeEnter(T),s(T,p,g),((C=V&&V.onVnodeMounted)||ee||G)&&Ke(()=>{C&&ot(C,E,f),ee&&W.enter(T),G&&Jt(f,null,E,"mounted")},y)},D=(f,p,g,E,y)=>{if(g&&_(f,g),E)for(let b=0;b<E.length;b++)_(f,E[b]);if(y){let b=y.subTree;if(p===b||Lc(b.type)&&(b.ssContent===p||b.ssFallback===p)){const x=y.vnode;D(f,x,x.scopeId,x.slotScopeIds,y.parent)}}},M=(f,p,g,E,y,b,x,R,T=0)=>{for(let C=T;C<f.length;C++){const V=f[C]=R?Ot(f[C]):ct(f[C]);I(null,V,p,g,E,y,b,x,R)}},_e=(f,p,g,E,y,b,x)=>{const R=p.el=f.el;let{patchFlag:T,dynamicChildren:C,dirs:V}=p;T|=f.patchFlag&16;const k=f.props||ae,W=p.props||ae;let G;if(g&&Zt(g,!1),(G=W.onVnodeBeforeUpdate)&&ot(G,g,p,f),V&&Jt(p,f,g,"beforeUpdate"),g&&Zt(g,!0),(k.innerHTML&&W.innerHTML==null||k.textContent&&W.textContent==null)&&u(R,""),C?ce(f.dynamicChildren,C,R,g,E,tr(p,y),b):x||U(f,p,R,null,g,E,tr(p,y),b,!1),T>0){if(T&16)Ce(R,k,W,g,y);else if(T&2&&k.class!==W.class&&r(R,"class",null,W.class,y),T&4&&r(R,"style",k.style,W.style,y),T&8){const ee=p.dynamicProps;for(let ue=0;ue<ee.length;ue++){const oe=ee[ue],Be=k[oe],He=W[oe];(He!==Be||oe==="value")&&r(R,oe,Be,He,y,g)}}T&1&&f.children!==p.children&&u(R,p.children)}else!x&&C==null&&Ce(R,k,W,g,y);((G=W.onVnodeUpdated)||V)&&Ke(()=>{G&&ot(G,g,p,f),V&&Jt(p,f,g,"updated")},E)},ce=(f,p,g,E,y,b,x)=>{for(let R=0;R<p.length;R++){const T=f[R],C=p[R],V=T.el&&(T.type===Ne||!Kn(T,C)||T.shapeFlag&198)?h(T.el):g;I(T,C,V,null,E,y,b,x,!0)}},Ce=(f,p,g,E,y)=>{if(p!==g){if(p!==ae)for(const b in p)!Jn(b)&&!(b in g)&&r(f,b,p[b],null,y,E);for(const b in g){if(Jn(b))continue;const x=g[b],R=p[b];x!==R&&b!=="value"&&r(f,b,R,x,y,E)}"value"in g&&r(f,"value",p.value,g.value,y)}},Re=(f,p,g,E,y,b,x,R,T)=>{const C=p.el=f?f.el:l(""),V=p.anchor=f?f.anchor:l("");let{patchFlag:k,dynamicChildren:W,slotScopeIds:G}=p;G&&(R=R?R.concat(G):G),f==null?(s(C,g,E),s(V,g,E),M(p.children||[],g,V,y,b,x,R,T)):k>0&&k&64&&W&&f.dynamicChildren?(ce(f.dynamicChildren,W,g,y,b,x,R),(p.key!=null||y&&p===y.subTree)&&kc(f,p,!0)):U(f,p,g,V,y,b,x,R,T)},Se=(f,p,g,E,y,b,x,R,T)=>{p.slotScopeIds=R,f==null?p.shapeFlag&512?y.ctx.activate(p,g,E,x,T):F(p,g,E,y,b,x,T):N(f,p,T)},F=(f,p,g,E,y,b,x)=>{const R=f.component=Sf(f,E,y);if(vc(f)&&(R.ctx.renderer=Wn),If(R,!1,x),R.asyncDep){if(y&&y.registerDep(R,S,x),!f.el){const T=R.subTree=Et(jt);$(null,T,p,g),f.placeholder=T.el}}else S(R,f,p,g,y,b,x)},N=(f,p,g)=>{const E=p.component=f.component;if(_f(f,p,g))if(E.asyncDep&&!E.asyncResolved){P(E,p,g);return}else E.next=p,E.update();else p.el=f.el,E.vnode=p},S=(f,p,g,E,y,b,x)=>{const R=()=>{if(f.isMounted){let{next:k,bu:W,u:G,parent:ee,vnode:ue}=f;{const it=Pc(f);if(it){k&&(k.el=ue.el,P(f,k,x)),it.asyncDep.then(()=>{f.isUnmounted||R()});return}}let oe=k,Be;Zt(f,!1),k?(k.el=ue.el,P(f,k,x)):k=ue,W&&Gs(W),(Be=k.props&&k.props.onVnodeBeforeUpdate)&&ot(Be,ee,k,ue),Zt(f,!0);const He=Cl(f),st=f.subTree;f.subTree=He,I(st,He,h(st.el),Us(st),f,y,b),k.el=He.el,oe===null&&gf(f,He.el),G&&Ke(G,y),(Be=k.props&&k.props.onVnodeUpdated)&&Ke(()=>ot(Be,ee,k,ue),y)}else{let k;const{el:W,props:G}=p,{bm:ee,m:ue,parent:oe,root:Be,type:He}=f,st=ns(p);Zt(f,!1),ee&&Gs(ee),!st&&(k=G&&G.onVnodeBeforeMount)&&ot(k,oe,p),Zt(f,!0);{Be.ce&&Be.ce._def.shadowRoot!==!1&&Be.ce._injectChildStyle(He);const it=f.subTree=Cl(f);I(null,it,g,E,f,y,b),p.el=it.el}if(ue&&Ke(ue,y),!st&&(k=G&&G.onVnodeMounted)){const it=p;Ke(()=>ot(k,oe,it),y)}(p.shapeFlag&256||oe&&ns(oe.vnode)&&oe.vnode.shapeFlag&256)&&f.a&&Ke(f.a,y),f.isMounted=!0,p=g=E=null}};f.scope.on();const T=f.effect=new Xa(R);f.scope.off();const C=f.update=T.run.bind(T),V=f.job=T.runIfDirty.bind(T);V.i=f,V.id=f.uid,T.scheduler=()=>fo(V),Zt(f,!0),C()},P=(f,p,g)=>{p.component=f;const E=f.vnode.props;f.vnode=p,f.next=null,Xd(f,p.props,E,g),tf(f,p.children,g),St(),fl(f),Tt()},U=(f,p,g,E,y,b,x,R,T=!1)=>{const C=f&&f.children,V=f?f.shapeFlag:0,k=p.children,{patchFlag:W,shapeFlag:G}=p;if(W>0){if(W&128){gt(C,k,g,E,y,b,x,R,T);return}else if(W&256){ye(C,k,g,E,y,b,x,R,T);return}}G&8?(V&16&&Hn(C,y,b),k!==C&&u(g,k)):V&16?G&16?gt(C,k,g,E,y,b,x,R,T):Hn(C,y,b,!0):(V&8&&u(g,""),G&16&&M(k,g,E,y,b,x,R,T))},ye=(f,p,g,E,y,b,x,R,T)=>{f=f||Cn,p=p||Cn;const C=f.length,V=p.length,k=Math.min(C,V);let W;for(W=0;W<k;W++){const G=p[W]=T?Ot(p[W]):ct(p[W]);I(f[W],G,g,null,y,b,x,R,T)}C>V?Hn(f,y,b,!0,!1,k):M(p,g,E,y,b,x,R,T,k)},gt=(f,p,g,E,y,b,x,R,T)=>{let C=0;const V=p.length;let k=f.length-1,W=V-1;for(;C<=k&&C<=W;){const G=f[C],ee=p[C]=T?Ot(p[C]):ct(p[C]);if(Kn(G,ee))I(G,ee,g,null,y,b,x,R,T);else break;C++}for(;C<=k&&C<=W;){const G=f[k],ee=p[W]=T?Ot(p[W]):ct(p[W]);if(Kn(G,ee))I(G,ee,g,null,y,b,x,R,T);else break;k--,W--}if(C>k){if(C<=W){const G=W+1,ee=G<V?p[G].el:E;for(;C<=W;)I(null,p[C]=T?Ot(p[C]):ct(p[C]),g,ee,y,b,x,R,T),C++}}else if(C>W)for(;C<=k;)nt(f[C],y,b,!0),C++;else{const G=C,ee=C,ue=new Map;for(C=ee;C<=W;C++){const je=p[C]=T?Ot(p[C]):ct(p[C]);je.key!=null&&ue.set(je.key,C)}let oe,Be=0;const He=W-ee+1;let st=!1,it=0;const Vn=new Array(He);for(C=0;C<He;C++)Vn[C]=0;for(C=G;C<=k;C++){const je=f[C];if(Be>=He){nt(je,y,b,!0);continue}let rt;if(je.key!=null)rt=ue.get(je.key);else for(oe=ee;oe<=W;oe++)if(Vn[oe-ee]===0&&Kn(je,p[oe])){rt=oe;break}rt===void 0?nt(je,y,b,!0):(Vn[rt-ee]=C+1,rt>=it?it=rt:st=!0,I(je,p[rt],g,null,y,b,x,R,T),Be++)}const ll=st?of(Vn):Cn;for(oe=ll.length-1,C=He-1;C>=0;C--){const je=ee+C,rt=p[je],al=p[je+1],cl=je+1<V?al.el||al.placeholder:E;Vn[C]===0?I(null,rt,g,cl,y,b,x,R,T):st&&(oe<0||C!==ll[oe]?Xt(rt,g,cl,2):oe--)}}},Xt=(f,p,g,E,y=null)=>{const{el:b,type:x,transition:R,children:T,shapeFlag:C}=f;if(C&6){Xt(f.component.subTree,p,g,E);return}if(C&128){f.suspense.move(p,g,E);return}if(C&64){x.move(f,p,g,Wn);return}if(x===Ne){s(b,p,g);for(let k=0;k<T.length;k++)Xt(T[k],p,g,E);s(f.anchor,p,g);return}if(x===nr){Y(f,p,g);return}if(E!==2&&C&1&&R)if(E===0)R.beforeEnter(b),s(b,p,g),Ke(()=>R.enter(b),y);else{const{leave:k,delayLeave:W,afterLeave:G}=R,ee=()=>{f.ctx.isUnmounted?i(b):s(b,p,g)},ue=()=>{b._isLeaving&&b[xd](!0),k(b,()=>{ee(),G&&G()})};W?W(b,ee,ue):ue()}else s(b,p,g)},nt=(f,p,g,E=!1,y=!1)=>{const{type:b,props:x,ref:R,children:T,dynamicChildren:C,shapeFlag:V,patchFlag:k,dirs:W,cacheIndex:G}=f;if(k===-2&&(y=!1),R!=null&&(St(),ts(R,null,g,f,!0),Tt()),G!=null&&(p.renderCache[G]=void 0),V&256){p.ctx.deactivate(f);return}const ee=V&1&&W,ue=!ns(f);let oe;if(ue&&(oe=x&&x.onVnodeBeforeUnmount)&&ot(oe,p,f),V&6)Mh(f.component,g,E);else{if(V&128){f.suspense.unmount(g,E);return}ee&&Jt(f,null,p,"beforeUnmount"),V&64?f.type.remove(f,p,g,Wn,E):C&&!C.hasOnce&&(b!==Ne||k>0&&k&64)?Hn(C,p,g,!1,!0):(b===Ne&&k&384||!y&&V&16)&&Hn(T,p,g),E&&rl(f)}(ue&&(oe=x&&x.onVnodeUnmounted)||ee)&&Ke(()=>{oe&&ot(oe,p,f),ee&&Jt(f,null,p,"unmounted")},g)},rl=f=>{const{type:p,el:g,anchor:E,transition:y}=f;if(p===Ne){Dh(g,E);return}if(p===nr){O(f);return}const b=()=>{i(g),y&&!y.persisted&&y.afterLeave&&y.afterLeave()};if(f.shapeFlag&1&&y&&!y.persisted){const{leave:x,delayLeave:R}=y,T=()=>x(g,b);R?R(f.el,b,T):T()}else b()},Dh=(f,p)=>{let g;for(;f!==p;)g=d(f),i(f),f=g;i(p)},Mh=(f,p,g)=>{const{bum:E,scope:y,job:b,subTree:x,um:R,m:T,a:C}=f;bl(T),bl(C),E&&Gs(E),y.stop(),b&&(b.flags|=8,nt(x,f,p,g)),R&&Ke(R,p),Ke(()=>{f.isUnmounted=!0},p)},Hn=(f,p,g,E=!1,y=!1,b=0)=>{for(let x=b;x<f.length;x++)nt(f[x],p,g,E,y)},Us=f=>{if(f.shapeFlag&6)return Us(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const p=d(f.anchor||f.el),g=p&&p[Id];return g?d(g):p};let qi=!1;const ol=(f,p,g)=>{f==null?p._vnode&&nt(p._vnode,null,null,!0):I(p._vnode||null,f,p,null,null,null,g),p._vnode=f,qi||(qi=!0,fl(),pc(),qi=!1)},Wn={p:I,um:nt,m:Xt,r:rl,mt:F,mc:M,pc:U,pbc:ce,n:Us,o:t};return{render:ol,hydrate:void 0,createApp:qd(ol)}}function tr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Zt({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function rf(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function kc(t,e,n=!1){const s=t.children,i=e.children;if(z(s)&&z(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Ot(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&kc(o,l)),l.type===Pi&&l.patchFlag!==-1&&(l.el=o.el),l.type===jt&&!l.el&&(l.el=o.el)}}function of(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function Pc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Pc(e)}function bl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const lf=Symbol.for("v-scx"),af=()=>zs(lf);function an(t,e,n){return Oc(t,e,n)}function Oc(t,e,n=ae){const{immediate:s,deep:i,flush:r,once:o}=n,l=Ue({},n),a=e&&s||!e&&r!=="post";let c;if(ps){if(r==="sync"){const _=af();c=_.__watcherHandles||(_.__watcherHandles=[])}else if(!a){const _=()=>{};return _.stop=ht,_.resume=ht,_.pause=ht,_}}const u=Le;l.call=(_,v,I)=>dt(_,u,v,I);let h=!1;r==="post"?l.scheduler=_=>{Ke(_,u&&u.suspense)}:r!=="sync"&&(h=!0,l.scheduler=(_,v)=>{v?_():fo(_)}),l.augmentJob=_=>{e&&(_.flags|=4),h&&(_.flags|=2,u&&(_.id=u.uid,_.i=u))};const d=bd(t,e,l);return ps&&(c?c.push(d):a&&d()),d}function cf(t,e,n){const s=this.proxy,i=be(t)?t.includes(".")?Dc(s,t):()=>s[t]:t.bind(s,s);let r;q(e)?r=e:(r=e.handler,n=e);const o=As(this),l=Oc(i,r.bind(s),n);return o(),l}function Dc(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const uf=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Wt(e)}Modifiers`]||t[`${Yt(e)}Modifiers`];function hf(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||ae;let i=n;const r=e.startsWith("update:"),o=r&&uf(s,e.slice(7));o&&(o.trim&&(i=n.map(u=>be(u)?u.trim():u)),o.number&&(i=n.map(to)));let l,a=s[l=Yi(e)]||s[l=Yi(Wt(e))];!a&&r&&(a=s[l=Yi(Yt(e))]),a&&dt(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,dt(c,t,6,i)}}const df=new WeakMap;function Mc(t,e,n=!1){const s=n?df:e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!q(t)){const a=c=>{const u=Mc(c,e,!0);u&&(l=!0,Ue(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(ge(t)&&s.set(t,null),null):(z(r)?r.forEach(a=>o[a]=null):Ue(o,r),ge(t)&&s.set(t,o),o)}function ki(t,e){return!t||!Ei(e)?!1:(e=e.slice(2).replace(/Once$/,""),re(t,e[0].toLowerCase()+e.slice(1))||re(t,Yt(e))||re(t,e))}function Cl(t){const{type:e,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:h,data:d,setupState:_,ctx:v,inheritAttrs:I}=t,H=ei(t);let $,J;try{if(n.shapeFlag&4){const O=i||s,A=O;$=ct(c.call(A,O,u,h,_,d,v)),J=l}else{const O=e;$=ct(O.length>1?O(h,{attrs:l,slots:o,emit:a}):O(h,null)),J=e.props?l:ff(l)}}catch(O){is.length=0,Ri(O,t,1),$=Et(jt)}let Y=$;if(J&&I!==!1){const O=Object.keys(J),{shapeFlag:A}=Y;O.length&&A&7&&(r&&O.some(Jr)&&(J=pf(J,r)),Y=xn(Y,J,!1,!0))}return n.dirs&&(Y=xn(Y,null,!1,!0),Y.dirs=Y.dirs?Y.dirs.concat(n.dirs):n.dirs),n.transition&&po(Y,n.transition),$=Y,ei(H),$}const ff=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ei(n))&&((e||(e={}))[n]=t[n]);return e},pf=(t,e)=>{const n={};for(const s in t)(!Jr(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function _f(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?El(s,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==s[d]&&!ki(c,d))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?El(s,o,c):!0:!!o;return!1}function El(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!ki(n,r))return!0}return!1}function gf({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const Lc=t=>t.__isSuspense;function mf(t,e){e&&e.pendingBranch?z(t)?e.effects.push(...t):e.effects.push(t):Sd(t)}const Ne=Symbol.for("v-fgt"),Pi=Symbol.for("v-txt"),jt=Symbol.for("v-cmt"),nr=Symbol.for("v-stc"),is=[];let Ge=null;function B(t=!1){is.push(Ge=t?null:[])}function vf(){is.pop(),Ge=is[is.length-1]||null}let fs=1;function wl(t,e=!1){fs+=t,t<0&&Ge&&e&&(Ge.hasOnce=!0)}function Fc(t){return t.dynamicChildren=fs>0?Ge||Cn:null,vf(),fs>0&&Ge&&Ge.push(t),t}function j(t,e,n,s,i,r){return Fc(m(t,e,n,s,i,r,!0))}function Xn(t,e,n,s,i){return Fc(Et(t,e,n,s,i,!0))}function $c(t){return t?t.__v_isVNode===!0:!1}function Kn(t,e){return t.type===e.type&&t.key===e.key}const Uc=({key:t})=>t??null,qs=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?be(t)||Oe(t)||q(t)?{i:ze,r:t,k:e,f:!!n}:t:null);function m(t,e=null,n=null,s=0,i=null,r=t===Ne?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Uc(e),ref:e&&qs(e),scopeId:gc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:ze};return l?(vo(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=be(n)?8:16),fs>0&&!o&&Ge&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&Ge.push(a),a}const Et=yf;function yf(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===Bd)&&(t=jt),$c(t)){const l=xn(t,e,!0);return n&&vo(l,n),fs>0&&!r&&Ge&&(l.shapeFlag&6?Ge[Ge.indexOf(t)]=l:Ge.push(l)),l.patchFlag=-2,l}if(Af(t)&&(t=t.__vccOpts),e){e=bf(e);let{class:l,style:a}=e;l&&!be(l)&&(e.class=rn(l)),ge(a)&&(uo(a)&&!z(a)&&(a=Ue({},a)),e.style=no(a))}const o=be(t)?1:Lc(t)?128:Rd(t)?64:ge(t)?4:q(t)?2:0;return m(t,e,n,s,i,o,r,!0)}function bf(t){return t?uo(t)||Tc(t)?Ue({},t):t:null}function xn(t,e,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=t,c=e?Cf(i||{},e):i,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Uc(c),ref:e&&e.ref?n&&r?z(r)?r.concat(qs(e)):[r,qs(e)]:qs(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ne?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&xn(t.ssContent),ssFallback:t.ssFallback&&xn(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&po(u,a.clone(u)),u}function mo(t=" ",e=0){return Et(Pi,null,t,e)}function ut(t="",e=!1){return e?(B(),Xn(jt,null,t)):Et(jt,null,t)}function ct(t){return t==null||typeof t=="boolean"?Et(jt):z(t)?Et(Ne,null,t.slice()):$c(t)?Ot(t):Et(Pi,null,String(t))}function Ot(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:xn(t)}function vo(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(z(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),vo(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!Tc(e)?e._ctx=ze:i===3&&ze&&(ze.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else q(e)?(e={default:e,_ctx:ze},n=32):(e=String(e),s&64?(n=16,e=[mo(e)]):n=8);t.children=e,t.shapeFlag|=n}function Cf(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=rn([e.class,s.class]));else if(i==="style")e.style=no([e.style,s.style]);else if(Ei(i)){const r=e[i],o=s[i];o&&r!==o&&!(z(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function ot(t,e,n,s=null){dt(t,e,7,[n,s])}const Ef=Ec();let wf=0;function Sf(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Ef,r={uid:wf++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Gh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Rc(s,i),emitsOptions:Mc(s,i),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:s.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=hf.bind(null,r),t.ce&&t.ce(r),r}let Le=null;const Tf=()=>Le||ze;let si,Rr;{const t=Ti(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};si=e("__VUE_INSTANCE_SETTERS__",n=>Le=n),Rr=e("__VUE_SSR_SETTERS__",n=>ps=n)}const As=t=>{const e=Le;return si(t),t.scope.on(),()=>{t.scope.off(),si(e)}},Sl=()=>{Le&&Le.scope.off(),si(null)};function Bc(t){return t.vnode.shapeFlag&4}let ps=!1;function If(t,e=!1,n=!1){e&&Rr(e);const{props:s,children:i}=t.vnode,r=Bc(t);Qd(t,s,r,e),ef(t,i,n||e);const o=r?Rf(t,e):void 0;return e&&Rr(!1),o}function Rf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Hd);const{setup:s}=n;if(s){St();const i=t.setupContext=s.length>1?Nf(t):null,r=As(t),o=Ns(s,t,0,[t.props,i]),l=Va(o);if(Tt(),r(),(l||t.sp)&&!ns(t)&&mc(t),l){if(o.then(Sl,Sl),e)return o.then(a=>{Tl(t,a)}).catch(a=>{Ri(a,t,0)});t.asyncDep=o}else Tl(t,o)}else Hc(t)}function Tl(t,e,n){q(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ge(e)&&(t.setupState=hc(e)),Hc(t)}function Hc(t,e,n){const s=t.type;t.render||(t.render=s.render||ht);{const i=As(t);St();try{Wd(t)}finally{Tt(),i()}}}const xf={get(t,e){return Pe(t,"get",""),t[e]}};function Nf(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,xf),slots:t.slots,emit:t.emit,expose:e}}function Oi(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(hc(fd(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in ss)return ss[n](t)},has(e,n){return n in e||n in ss}})):t.proxy}function Af(t){return q(t)&&"__vccOpts"in t}const _s=(t,e)=>vd(t,e,ps),kf="3.5.24";/**
* @vue/runtime-dom v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xr;const Il=typeof window<"u"&&window.trustedTypes;if(Il)try{xr=Il.createPolicy("vue",{createHTML:t=>t})}catch{}const Wc=xr?t=>xr.createHTML(t):t=>t,Pf="http://www.w3.org/2000/svg",Of="http://www.w3.org/1998/Math/MathML",vt=typeof document<"u"?document:null,Rl=vt&&vt.createElement("template"),Df={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?vt.createElementNS(Pf,t):e==="mathml"?vt.createElementNS(Of,t):n?vt.createElement(t,{is:n}):vt.createElement(t);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>vt.createTextNode(t),createComment:t=>vt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>vt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Rl.innerHTML=Wc(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=Rl.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Mf=Symbol("_vtc");function Lf(t,e,n){const s=t[Mf];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const xl=Symbol("_vod"),Ff=Symbol("_vsh"),$f=Symbol(""),Uf=/(?:^|;)\s*display\s*:/;function Bf(t,e,n){const s=t.style,i=be(n);let r=!1;if(n&&!i){if(e)if(be(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Ys(s,l,"")}else for(const o in e)n[o]==null&&Ys(s,o,"");for(const o in n)o==="display"&&(r=!0),Ys(s,o,n[o])}else if(i){if(e!==n){const o=s[$f];o&&(n+=";"+o),s.cssText=n,r=Uf.test(n)}}else e&&t.removeAttribute("style");xl in t&&(t[xl]=r?s.display:"",t[Ff]&&(s.display="none"))}const Nl=/\s*!important$/;function Ys(t,e,n){if(z(n))n.forEach(s=>Ys(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=Hf(t,e);Nl.test(n)?t.setProperty(Yt(s),n.replace(Nl,""),"important"):t[s]=n}}const Al=["Webkit","Moz","ms"],sr={};function Hf(t,e){const n=sr[e];if(n)return n;let s=Wt(e);if(s!=="filter"&&s in t)return sr[e]=s;s=Ga(s);for(let i=0;i<Al.length;i++){const r=Al[i]+s;if(r in t)return sr[e]=r}return e}const kl="http://www.w3.org/1999/xlink";function Pl(t,e,n,s,i,r=Kh(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(kl,e.slice(6,e.length)):t.setAttributeNS(kl,e,n):n==null||r&&!qa(n)?t.removeAttribute(e):t.setAttribute(e,r?"":qt(n)?String(n):n)}function Ol(t,e,n,s,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Wc(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=qa(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function yn(t,e,n,s){t.addEventListener(e,n,s)}function Wf(t,e,n,s){t.removeEventListener(e,n,s)}const Dl=Symbol("_vei");function Vf(t,e,n,s,i=null){const r=t[Dl]||(t[Dl]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=jf(e);if(s){const c=r[e]=zf(s,i);yn(t,l,c,a)}else o&&(Wf(t,l,o,a),r[e]=void 0)}}const Ml=/(?:Once|Passive|Capture)$/;function jf(t){let e;if(Ml.test(t)){e={};let s;for(;s=t.match(Ml);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Yt(t.slice(2)),e]}let ir=0;const Kf=Promise.resolve(),Gf=()=>ir||(Kf.then(()=>ir=0),ir=Date.now());function zf(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;dt(qf(s,n.value),e,5,[s])};return n.value=t,n.attached=Gf(),n}function qf(t,e){if(z(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Ll=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Yf=(t,e,n,s,i,r)=>{const o=i==="svg";e==="class"?Lf(t,s,o):e==="style"?Bf(t,n,s):Ei(e)?Jr(e)||Vf(t,e,n,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Qf(t,e,s,o))?(Ol(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Pl(t,e,s,o,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!be(s))?Ol(t,Wt(e),s,r,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Pl(t,e,s,o))};function Qf(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Ll(e)&&q(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Ll(e)&&be(n)?!1:e in t}const Fl=t=>{const e=t.props["onUpdate:modelValue"]||!1;return z(e)?n=>Gs(e,n):e};function Xf(t){t.target.composing=!0}function $l(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const rr=Symbol("_assign");function Ul(t,e,n){return e&&(t=t.trim()),n&&(t=to(t)),t}const cn={created(t,{modifiers:{lazy:e,trim:n,number:s}},i){t[rr]=Fl(i);const r=s||i.props&&i.props.type==="number";yn(t,e?"change":"input",o=>{o.target.composing||t[rr](Ul(t.value,n,r))}),(n||r)&&yn(t,"change",()=>{t.value=Ul(t.value,n,r)}),e||(yn(t,"compositionstart",Xf),yn(t,"compositionend",$l),yn(t,"change",$l))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:i,number:r}},o){if(t[rr]=Fl(o),t.composing)return;const l=(r||t.type==="number")&&!/^0\d/.test(t.value)?to(t.value):t.value,a=e??"";l!==a&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||i&&t.value.trim()===a)||(t.value=a))}},Jf=["ctrl","shift","alt","meta"],Zf={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Jf.some(n=>t[`${n}Key`]&&!e.includes(n))},ep=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(i,...r)=>{for(let o=0;o<e.length;o++){const l=Zf[e[o]];if(l&&l(i,e))return}return t(i,...r)})},tp={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},np=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=i=>{if(!("key"in i))return;const r=Yt(i.key);if(e.some(o=>o===r||tp[o]===r))return t(i)})},sp=Ue({patchProp:Yf},Df);let Bl;function ip(){return Bl||(Bl=nf(sp))}const rp=(...t)=>{const e=ip().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=lp(s);if(!i)return;const r=e._component;!q(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,op(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function op(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function lp(t){return be(t)?document.querySelector(t):t}var Hl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=function(t,e){if(!t)throw Ln(e)},Ln=function(t){return new Error("Firebase Database ("+Vc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},ap=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},yo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=r>>2,h=(r&3)<<4|l>>4;let d=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(d=64)),s.push(n[u],n[h],n[d],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(jc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ap(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||h==null)throw new cp;const d=r<<2|l>>4;if(s.push(d),c!==64){const _=l<<4&240|c>>2;if(s.push(_),h!==64){const v=c<<6&192|h;s.push(v)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class cp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kc=function(t){const e=jc(t);return yo.encodeByteArray(e,!0)},ii=function(t){return Kc(t).replace(/\./g,"")},Nr=function(t){try{return yo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(t){return Gc(void 0,t)}function Gc(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!hp(n)||(t[n]=Gc(t[n],e[n]));return t}function hp(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp=()=>dp().__FIREBASE_DEFAULTS__,pp=()=>{if(typeof process>"u"||typeof Hl>"u")return;const t=Hl.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_p=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Nr(t[1]);return e&&JSON.parse(e)},zc=()=>{try{return fp()||pp()||_p()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},gp=t=>{var e,n;return(n=(e=zc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},qc=t=>{const e=gp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Yc=()=>{var t;return(t=zc())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[ii(JSON.stringify(n)),ii(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(mp())}function vp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yp(){return Vc.NODE_ADMIN===!0}function bp(){try{return typeof indexedDB=="object"}catch{return!1}}function Cp(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep="FirebaseError";class Fn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ep,Object.setPrototypeOf(this,Fn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jc.prototype.create)}}class Jc{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?wp(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Fn(i,l,s)}}function wp(t,e){return t.replace(Sp,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Sp=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(t){return JSON.parse(t)}function we(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=gs(Nr(r[0])||""),n=gs(Nr(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Tp=function(t){const e=Zc(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Ip=function(t){const e=Zc(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Nn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Wl(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ri(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function Ar(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Vl(r)&&Vl(o)){if(!Ar(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Vl(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^r&(o^l),u=1518500249):(c=r^o^l,u=1859775393):h<60?(c=r&o|l&(r|o),u=2400959708):(c=r^o^l,u=3395469782);const d=(i<<5|i>>>27)+c+a+u+s[h]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Di(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,w(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Mi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(t){return t&&t._delegate?t._delegate:t}class An{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new ks;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Pp(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:kp(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kp(t){return t===tn?void 0:t}function Pp(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ap(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(fe||(fe={}));const Dp={debug:fe.DEBUG,verbose:fe.VERBOSE,info:fe.INFO,warn:fe.WARN,error:fe.ERROR,silent:fe.SILENT},Mp=fe.INFO,Lp={[fe.DEBUG]:"log",[fe.VERBOSE]:"log",[fe.INFO]:"info",[fe.WARN]:"warn",[fe.ERROR]:"error"},Fp=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=Lp[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class eu{constructor(e){this.name=e,this._logLevel=Mp,this._logHandler=Fp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in fe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Dp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,fe.DEBUG,...e),this._logHandler(this,fe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,fe.VERBOSE,...e),this._logHandler(this,fe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,fe.INFO,...e),this._logHandler(this,fe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,fe.WARN,...e),this._logHandler(this,fe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,fe.ERROR,...e),this._logHandler(this,fe.ERROR,...e)}}const $p=(t,e)=>e.some(n=>t instanceof n);let jl,Kl;function Up(){return jl||(jl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bp(){return Kl||(Kl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const tu=new WeakMap,kr=new WeakMap,nu=new WeakMap,or=new WeakMap,bo=new WeakMap;function Hp(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ft(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&tu.set(n,t)}).catch(()=>{}),bo.set(e,t),e}function Wp(t){if(kr.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});kr.set(t,e)}let Pr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return kr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||nu.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ft(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Vp(t){Pr=t(Pr)}function jp(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(lr(this),e,...n);return nu.set(s,e.sort?e.sort():[e]),Ft(s)}:Bp().includes(t)?function(...e){return t.apply(lr(this),e),Ft(tu.get(this))}:function(...e){return Ft(t.apply(lr(this),e))}}function Kp(t){return typeof t=="function"?jp(t):(t instanceof IDBTransaction&&Wp(t),$p(t,Up())?new Proxy(t,Pr):t)}function Ft(t){if(t instanceof IDBRequest)return Hp(t);if(or.has(t))return or.get(t);const e=Kp(t);return e!==t&&(or.set(t,e),bo.set(e,t)),e}const lr=t=>bo.get(t);function Gp(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=Ft(o);return s&&o.addEventListener("upgradeneeded",a=>{s(Ft(o.result),a.oldVersion,a.newVersion,Ft(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const zp=["get","getKey","getAll","getAllKeys","count"],qp=["put","add","delete","clear"],ar=new Map;function Gl(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ar.get(e))return ar.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=qp.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||zp.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return ar.set(e,r),r}Vp(t=>({...t,get:(e,n,s)=>Gl(e,n)||t.get(e,n,s),has:(e,n)=>!!Gl(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Qp(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Qp(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Or="@firebase/app",zl="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=new eu("@firebase/app"),Xp="@firebase/app-compat",Jp="@firebase/analytics-compat",Zp="@firebase/analytics",e_="@firebase/app-check-compat",t_="@firebase/app-check",n_="@firebase/auth",s_="@firebase/auth-compat",i_="@firebase/database",r_="@firebase/data-connect",o_="@firebase/database-compat",l_="@firebase/functions",a_="@firebase/functions-compat",c_="@firebase/installations",u_="@firebase/installations-compat",h_="@firebase/messaging",d_="@firebase/messaging-compat",f_="@firebase/performance",p_="@firebase/performance-compat",__="@firebase/remote-config",g_="@firebase/remote-config-compat",m_="@firebase/storage",v_="@firebase/storage-compat",y_="@firebase/firestore",b_="@firebase/vertexai-preview",C_="@firebase/firestore-compat",E_="firebase",w_="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr="[DEFAULT]",S_={[Or]:"fire-core",[Xp]:"fire-core-compat",[Zp]:"fire-analytics",[Jp]:"fire-analytics-compat",[t_]:"fire-app-check",[e_]:"fire-app-check-compat",[n_]:"fire-auth",[s_]:"fire-auth-compat",[i_]:"fire-rtdb",[r_]:"fire-data-connect",[o_]:"fire-rtdb-compat",[l_]:"fire-fn",[a_]:"fire-fn-compat",[c_]:"fire-iid",[u_]:"fire-iid-compat",[h_]:"fire-fcm",[d_]:"fire-fcm-compat",[f_]:"fire-perf",[p_]:"fire-perf-compat",[__]:"fire-rc",[g_]:"fire-rc-compat",[m_]:"fire-gcs",[v_]:"fire-gcs-compat",[y_]:"fire-fst",[C_]:"fire-fst-compat",[b_]:"fire-vertex","fire-js":"fire-js",[E_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=new Map,T_=new Map,Mr=new Map;function ql(t,e){try{t.container.addComponent(e)}catch(n){It.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ms(t){const e=t.name;if(Mr.has(e))return It.debug(`There were multiple attempts to register component ${e}.`),!1;Mr.set(e,t);for(const n of oi.values())ql(n,t);for(const n of T_.values())ql(n,t);return!0}function su(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Jc("app","Firebase",I_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new An("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu=w_;function ru(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Dr,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw $t.create("bad-app-name",{appName:String(i)});if(n||(n=Yc()),!n)throw $t.create("no-options");const r=oi.get(i);if(r){if(Ar(n,r.options)&&Ar(s,r.config))return r;throw $t.create("duplicate-app",{appName:i})}const o=new Op(i);for(const a of Mr.values())o.addComponent(a);const l=new R_(n,s,o);return oi.set(i,l),l}function ou(t=Dr){const e=oi.get(t);if(!e&&t===Dr&&Yc())return ru();if(!e)throw $t.create("no-app",{appName:t});return e}function Ut(t,e,n){var s;let i=(s=S_[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${i}" with version "${e}":`];r&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),It.warn(l.join(" "));return}ms(new An(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_="firebase-heartbeat-database",N_=1,vs="firebase-heartbeat-store";let cr=null;function lu(){return cr||(cr=Gp(x_,N_,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(vs)}catch(n){console.warn(n)}}}}).catch(t=>{throw $t.create("idb-open",{originalErrorMessage:t.message})})),cr}async function A_(t){try{const n=(await lu()).transaction(vs),s=await n.objectStore(vs).get(au(t));return await n.done,s}catch(e){if(e instanceof Fn)It.warn(e.message);else{const n=$t.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});It.warn(n.message)}}}async function Yl(t,e){try{const s=(await lu()).transaction(vs,"readwrite");await s.objectStore(vs).put(e,au(t)),await s.done}catch(n){if(n instanceof Fn)It.warn(n.message);else{const s=$t.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});It.warn(s.message)}}}function au(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_=1024,P_=30*24*60*60*1e3;class O_{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new M_(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ql();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=P_}),this._storage.overwrite(this._heartbeatsCache))}catch(s){It.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ql(),{heartbeatsToSend:s,unsentEntries:i}=D_(this._heartbeatsCache.heartbeats),r=ii(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return It.warn(n),""}}}function Ql(){return new Date().toISOString().substring(0,10)}function D_(t,e=k_){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Xl(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Xl(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class M_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bp()?Cp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await A_(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Yl(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Yl(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Xl(t){return ii(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(t){ms(new An("platform-logger",e=>new Yp(e),"PRIVATE")),ms(new An("heartbeat",e=>new O_(e),"PRIVATE")),Ut(Or,zl,t),Ut(Or,zl,"esm2017"),Ut("fire-js","")}L_("");var F_="firebase",$_="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(F_,$_,"app");var Jl={};const Zl="@firebase/database",ea="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cu="";function U_(t){cu=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),we(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:gs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return pt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new B_(e)}}catch{}return new H_},sn=uu("localStorage"),W_=uu("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new eu("@firebase/database"),V_=function(){let t=1;return function(){return t++}}(),hu=function(t){const e=Np(t),n=new xp;n.update(e);const s=n.digest();return yo.encodeByteArray(s)},Ps=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ps.apply(null,s):typeof s=="object"?e+=we(s):e+=s,e+=" "}return e};let rs=null,ta=!0;const j_=function(t,e){w(!0,"Can't turn on custom loggers persistently."),In.logLevel=fe.VERBOSE,rs=In.log.bind(In)},Ae=function(...t){if(ta===!0&&(ta=!1,rs===null&&W_.get("logging_enabled")===!0&&j_()),rs){const e=Ps.apply(null,t);rs(e)}},Os=function(t){return function(...e){Ae(t,...e)}},Lr=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ps(...t);In.error(e)},Rt=function(...t){const e=`FIREBASE FATAL ERROR: ${Ps(...t)}`;throw In.error(e),new Error(e)},$e=function(...t){const e="FIREBASE WARNING: "+Ps(...t);In.warn(e)},K_=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&$e("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Co=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},G_=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},kn="[MIN_NAME]",un="[MAX_NAME]",fn=function(t,e){if(t===e)return 0;if(t===kn||e===un)return-1;if(e===kn||t===un)return 1;{const n=na(t),s=na(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},z_=function(t,e){return t===e?0:t<e?-1:1},Gn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+we(e))},Eo=function(t){if(typeof t!="object"||t===null)return we(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=we(e[s]),n+=":",n+=Eo(t[e[s]]);return n+="}",n},du=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function ke(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const fu=function(t){w(!Co(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let d=parseInt(u.substr(a,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},q_=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Y_=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Q_(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const X_=new RegExp("^-?(0*)\\d{1,10}$"),J_=-2147483648,Z_=2147483647,na=function(t){if(X_.test(t)){const e=Number(t);if(e>=J_&&e<=Z_)return e}return null},$n=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw $e("Exception was thrown by user callback.",n),e},Math.floor(0))}},eg=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},os=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){$e(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ae("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',$e(e)}}class Qs{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Qs.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo="5",pu="v",_u="s",gu="r",mu="f",vu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,yu="ls",bu="p",Fr="ac",Cu="websocket",Eu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=sn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&sn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function sg(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Su(t,e,n){w(typeof e=="string","typeof type must == string"),w(typeof n=="object","typeof params must == object");let s;if(e===Cu)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Eu)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);sg(t)&&(n.ns=t.namespace);const i=[];return ke(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.counters_={}}incrementCounter(e,n=1){pt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return up(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur={},hr={};function So(t){const e=t.toString();return ur[e]||(ur[e]=new ig),ur[e]}function rg(t,e){const n=t.toString();return hr[n]||(hr[n]=e()),hr[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&$n(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="start",lg="close",ag="pLPCommand",cg="pRTLPCB",Tu="id",Iu="pw",Ru="ser",ug="cb",hg="seg",dg="ts",fg="d",pg="dframe",xu=1870,Nu=30,_g=xu-Nu,gg=25e3,mg=3e4;class bn{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Os(e),this.stats_=So(n),this.urlFn=a=>(this.appCheckToken&&(a[Fr]=this.appCheckToken),Su(n,Eu,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new og(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(mg)),G_(()=>{if(this.isClosed_)return;this.scriptTagHolder=new To((...r)=>{const[o,l,a,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===sa)this.id=l,this.password=a;else if(o===lg)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[sa]="t",s[Ru]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[ug]=this.scriptTagHolder.uniqueCallbackIdentifier),s[pu]=wo,this.transportSessionId&&(s[_u]=this.transportSessionId),this.lastSessionId&&(s[yu]=this.lastSessionId),this.applicationId&&(s[bu]=this.applicationId),this.appCheckToken&&(s[Fr]=this.appCheckToken),typeof location<"u"&&location.hostname&&vu.test(location.hostname)&&(s[gu]=mu);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){bn.forceAllow_=!0}static forceDisallow(){bn.forceDisallow_=!0}static isAvailable(){return bn.forceAllow_?!0:!bn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!q_()&&!Y_()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=we(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Kc(n),i=du(s,_g);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[pg]="t",s[Tu]=e,s[Iu]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=we(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class To{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=V_(),window[ag+this.uniqueCallbackIdentifier]=e,window[cg+this.uniqueCallbackIdentifier]=n,this.myIFrame=To.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ae("frame writing exception"),l.stack&&Ae(l.stack),Ae(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ae("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Tu]=this.myID,e[Iu]=this.myPW,e[Ru]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Nu+s.length<=xu;){const o=this.pendingSegs.shift();s=s+"&"+hg+i+"="+o.seg+"&"+dg+i+"="+o.ts+"&"+fg+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(gg)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Ae("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg=16384,yg=45e3;let li=null;typeof MozWebSocket<"u"?li=MozWebSocket:typeof WebSocket<"u"&&(li=WebSocket);class Xe{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Os(this.connId),this.stats_=So(n),this.connURL=Xe.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[pu]=wo,typeof location<"u"&&location.hostname&&vu.test(location.hostname)&&(o[gu]=mu),n&&(o[_u]=n),s&&(o[yu]=s),i&&(o[Fr]=i),r&&(o[bu]=r),Su(e,Cu,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,sn.set("previous_websocket_failure",!0);try{let s;yp(),this.mySock=new li(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Xe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&li!==null&&!Xe.forceDisallow_}static previouslyFailed(){return sn.isInMemoryStorage||sn.get("previous_websocket_failure")===!0}markConnectionHealthy(){sn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=gs(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(w(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=we(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=du(n,vg);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(yg))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Xe.responsesRequiredToBeHealthy=2;Xe.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[bn,Xe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Xe&&Xe.isAvailable();let s=n&&!Xe.previouslyFailed();if(e.webSocketOnly&&(n||$e("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Xe];else{const i=this.transports_=[];for(const r of ys.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);ys.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ys.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=6e4,Cg=5e3,Eg=10*1024,wg=100*1024,dr="t",ia="d",Sg="s",ra="r",Tg="e",oa="o",la="a",aa="n",ca="p",Ig="h";class Rg{constructor(e,n,s,i,r,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Os("c:"+this.id+":"),this.transportManager_=new ys(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=os(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wg?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Eg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(dr in e){const n=e[dr];n===la?this.upgradeIfSecondaryHealthy_():n===ra?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===oa&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Gn("t",e),s=Gn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ca,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:la,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:aa,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Gn("t",e),s=Gn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Gn(dr,e);if(ia in e){const s=e[ia];if(n===Ig){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===aa){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Sg?this.onConnectionShutdown_(s):n===ra?this.onReset_(s):n===Tg?Lr("Server Error: "+s):n===oa?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Lr("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),wo!==s&&$e("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),os(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(bg))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):os(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Cg))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ca,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(sn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e){this.allowedEvents_=e,this.listeners_={},w(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){w(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai extends ku{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Xc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ai}getInitialEvent(e){return w(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=32,ha=768;class le{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ne(){return new le("")}function Q(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Kt(t){return t.pieces_.length-t.pieceNum_}function pe(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new le(t.pieces_,e)}function Io(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function xg(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function bs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Pu(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new le(e,0)}function me(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof le)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new le(n,0)}function Z(t){return t.pieceNum_>=t.pieces_.length}function Fe(t,e){const n=Q(t),s=Q(e);if(n===null)return e;if(n===s)return Fe(pe(t),pe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Ng(t,e){const n=bs(t,0),s=bs(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=fn(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function Ro(t,e){if(Kt(t)!==Kt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function qe(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Kt(t)>Kt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Ag{constructor(e,n){this.errorPrefix_=n,this.parts_=bs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Mi(this.parts_[s]);Ou(this)}}function kg(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Mi(e),Ou(t)}function Pg(t){const e=t.parts_.pop();t.byteLength_-=Mi(e),t.parts_.length>0&&(t.byteLength_-=1)}function Ou(t){if(t.byteLength_>ha)throw new Error(t.errorPrefix_+"has a key path longer than "+ha+" bytes ("+t.byteLength_+").");if(t.parts_.length>ua)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ua+") or object contains a cycle "+nn(t))}function nn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo extends ku{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new xo}getInitialEvent(e){return w(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn=1e3,Og=60*5*1e3,da=30*1e3,Dg=1.3,Mg=3e4,Lg="server_kill",fa=3;class wt extends Au{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=wt.nextPersistentConnectionId_++,this.log_=Os("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=zn,this.maxReconnectDelay_=Og,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");xo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ai.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(we(r)),w(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new ks,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),w(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;wt.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&pt(e,"w")){const s=Nn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();$e(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ip(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=da)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Tp(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+we(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Lr("Unrecognized action received from server: "+we(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){w(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=zn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=zn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Mg&&(this.reconnectDelay_=zn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Dg)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+wt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(h){w(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Ae("getToken() completed but was canceled"):(Ae("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,l=new Rg(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{$e(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Lg)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&$e(h),a())}}}interrupt(e){Ae("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ae("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Wl(this.interruptReasons_)&&(this.reconnectDelay_=zn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Eo(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new le(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Ae("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=fa&&(this.reconnectDelay_=da,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ae("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=fa&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+cu.replace(/\./g,"-")]=1,Xc()?e["framework.cordova"]=1:vp()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ai.getInstance().currentlyOnline();return Wl(this.interruptReasons_)&&e}}wt.nextPersistentConnectionId_=0;wt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new X(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new X(kn,e),i=new X(kn,n);return this.compare(s,i)!==0}minPost(){return X.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs;class Du extends Li{static get __EMPTY_NODE(){return Vs}static set __EMPTY_NODE(e){Vs=e}compare(e,n){return fn(e.name,n.name)}isDefinedOn(e){throw Ln("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return X.MIN}maxPost(){return new X(un,Vs)}makePost(e,n){return w(typeof e=="string","KeyIndex indexValue must always be a string."),new X(e,Vs)}toString(){return".key"}}const Rn=new Du;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ie{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Ie.RED,this.left=i??Ve.EMPTY_NODE,this.right=r??Ve.EMPTY_NODE}copy(e,n,s,i,r){return new Ie(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ve.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Ve.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ie.RED=!0;Ie.BLACK=!1;class Fg{copy(e,n,s,i,r){return this}insert(e,n,s){return new Ie(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ve{constructor(e,n=Ve.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ve(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ie.BLACK,null,null))}remove(e){return new Ve(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ie.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new js(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new js(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new js(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new js(this.root_,null,this.comparator_,!0,e)}}Ve.EMPTY_NODE=new Fg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(t,e){return fn(t.name,e.name)}function No(t,e){return fn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $r;function Ug(t){$r=t}const Mu=function(t){return typeof t=="number"?"number:"+fu(t):"string:"+t},Lu=function(t){if(t.isLeafNode()){const e=t.val();w(typeof e=="string"||typeof e=="number"||typeof e=="object"&&pt(e,".sv"),"Priority must be a string or number.")}else w(t===$r||t.isEmpty(),"priority of unexpected type.");w(t===$r||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pa;class Te{constructor(e,n=Te.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,w(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lu(this.priorityNode_)}static set __childrenNodeConstructor(e){pa=e}static get __childrenNodeConstructor(){return pa}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Te(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Z(e)?this:Q(e)===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Te.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=Q(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(w(s!==".priority"||Kt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Te.__childrenNodeConstructor.EMPTY_NODE.updateChild(pe(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Mu(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=fu(this.value_):e+=this.value_,this.lazyHash_=hu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Te.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Te.__childrenNodeConstructor?-1:(w(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=Te.VALUE_TYPE_ORDER.indexOf(n),r=Te.VALUE_TYPE_ORDER.indexOf(s);return w(i>=0,"Unknown leaf type: "+n),w(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Te.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fu,$u;function Bg(t){Fu=t}function Hg(t){$u=t}class Wg extends Li{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return X.MIN}maxPost(){return new X(un,new Te("[PRIORITY-POST]",$u))}makePost(e,n){const s=Fu(e);return new X(n,new Te("[PRIORITY-POST]",s))}toString(){return".priority"}}const ve=new Wg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vg=Math.log(2);class jg{constructor(e){const n=r=>parseInt(Math.log(r)/Vg,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ci=function(t,e,n,s){t.sort(e);const i=function(a,c){const u=c-a;let h,d;if(u===0)return null;if(u===1)return h=t[a],d=n?n(h):h,new Ie(d,h.node,Ie.BLACK,null,null);{const _=parseInt(u/2,10)+a,v=i(a,_),I=i(_+1,c);return h=t[_],d=n?n(h):h,new Ie(d,h.node,Ie.BLACK,v,I)}},r=function(a){let c=null,u=null,h=t.length;const d=function(v,I){const H=h-v,$=h;h-=v;const J=i(H+1,$),Y=t[H],O=n?n(Y):Y;_(new Ie(O,Y.node,I,null,J))},_=function(v){c?(c.left=v,c=v):(u=v,c=v)};for(let v=0;v<a.count;++v){const I=a.nextBitIsOne(),H=Math.pow(2,a.count-(v+1));I?d(H,Ie.BLACK):(d(H,Ie.BLACK),d(H,Ie.RED))}return u},o=new jg(t.length),l=r(o);return new Ve(s||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fr;const mn={};class Ct{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return w(mn&&ve,"ChildrenNode.ts has not been loaded"),fr=fr||new Ct({".priority":mn},{".priority":ve}),fr}get(e){const n=Nn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ve?n:null}hasIndex(e){return pt(this.indexSet_,e.toString())}addIndex(e,n){w(e!==Rn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(X.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=ci(s,e.getCompare()):l=mn;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const u=Object.assign({},this.indexes_);return u[a]=l,new Ct(u,c)}addToIndexes(e,n){const s=ri(this.indexes_,(i,r)=>{const o=Nn(this.indexSet_,r);if(w(o,"Missing index implementation for "+r),i===mn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(X.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),ci(l,o.getCompare())}else return mn;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new X(e.name,l))),a.insert(e,e.node)}});return new Ct(s,this.indexSet_)}removeFromIndexes(e,n){const s=ri(this.indexes_,i=>{if(i===mn)return i;{const r=n.get(e.name);return r?i.remove(new X(e.name,r)):i}});return new Ct(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qn;class K{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Lu(this.priorityNode_),this.children_.isEmpty()&&w(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return qn||(qn=new K(new Ve(No),null,Ct.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||qn}updatePriority(e){return this.children_.isEmpty()?this:new K(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?qn:n}}getChild(e){const n=Q(e);return n===null?this:this.getImmediateChild(n).getChild(pe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(w(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new X(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?qn:this.priorityNode_;return new K(i,o,r)}}updateChild(e,n){const s=Q(e);if(s===null)return n;{w(Q(e)!==".priority"||Kt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(pe(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(ve,(o,l)=>{n[o]=l.val(e),s++,r&&K.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Mu(this.getPriority().val())+":"),this.forEachChild(ve,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":hu(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new X(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new X(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new X(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,X.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,X.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ds?-1:0}withIndex(e){if(e===Rn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new K(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Rn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(ve),i=n.getIterator(ve);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Rn?null:this.indexMap_.get(e.toString())}}K.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Kg extends K{constructor(){super(new Ve(No),K.EMPTY_NODE,Ct.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return K.EMPTY_NODE}isEmpty(){return!1}}const Ds=new Kg;Object.defineProperties(X,{MIN:{value:new X(kn,K.EMPTY_NODE)},MAX:{value:new X(un,Ds)}});Du.__EMPTY_NODE=K.EMPTY_NODE;Te.__childrenNodeConstructor=K;Ug(Ds);Hg(Ds);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg=!0;function Ee(t,e=null){if(t===null)return K.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),w(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Te(n,Ee(e))}if(!(t instanceof Array)&&Gg){const n=[];let s=!1;if(ke(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=Ee(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new X(o,a)))}}),n.length===0)return K.EMPTY_NODE;const r=ci(n,$g,o=>o.name,No);if(s){const o=ci(n,ve.getCompare());return new K(r,Ee(e),new Ct({".priority":o},{".priority":ve}))}else return new K(r,Ee(e),Ct.Default)}else{let n=K.EMPTY_NODE;return ke(t,(s,i)=>{if(pt(t,s)&&s.substring(0,1)!=="."){const r=Ee(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(Ee(e))}}Bg(Ee);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg extends Li{constructor(e){super(),this.indexPath_=e,w(!Z(e)&&Q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}makePost(e,n){const s=Ee(e),i=K.EMPTY_NODE.updateChild(this.indexPath_,s);return new X(n,i)}maxPost(){const e=K.EMPTY_NODE.updateChild(this.indexPath_,Ds);return new X(un,e)}toString(){return bs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg extends Li{compare(e,n){const s=e.node.compareTo(n.node);return s===0?fn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return X.MIN}maxPost(){return X.MAX}makePost(e,n){const s=Ee(e);return new X(n,s)}toString(){return".value"}}const Yg=new qg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(t){return{type:"value",snapshotNode:t}}function Pn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Cs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Es(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Qg(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){w(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Cs(n,l)):w(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Pn(n,s)):o.trackChildChange(Es(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(ve,(i,r)=>{n.hasChild(i)||s.trackChildChange(Cs(i,r))}),n.isLeafNode()||n.forEachChild(ve,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Es(i,r,o))}else s.trackChildChange(Pn(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?K.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this.indexedFilter_=new Ao(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ws.getStartPost_(e),this.endPost_=ws.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new X(n,s))||(s=K.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=K.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(K.EMPTY_NODE);const r=this;return n.forEachChild(ve,(o,l)=>{r.matches(new X(o,l))||(i=i.updateImmediateChild(o,K.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new ws(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new X(n,s))||(s=K.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=K.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=K.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(K.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,K.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,_)=>h(_,d)}else o=this.index_.getCompare();const l=e;w(l.numChildren()===this.limit_,"");const a=new X(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||l.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const _=d==null?1:o(d,a);if(u&&!s.isEmpty()&&_>=0)return r!=null&&r.trackChildChange(Es(n,s,h)),l.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(Cs(n,h));const I=l.updateImmediateChild(n,K.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(Pn(d.name,d.node)),I.updateImmediateChild(d.name,d.node)):I}}else return s.isEmpty()?e:u&&o(c,a)>=0?(r!=null&&(r.trackChildChange(Cs(c.name,c.node)),r.trackChildChange(Pn(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,K.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ve}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return w(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return w(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:kn}hasEnd(){return this.endSet_}getIndexEndValue(){return w(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return w(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:un}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return w(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ve}copy(){const e=new ko;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Jg(t){return t.loadsAllData()?new Ao(t.getIndex()):t.hasLimit()?new Xg(t):new ws(t)}function _a(t){const e={};if(t.isDefault())return e;let n;if(t.index_===ve?n="$priority":t.index_===Yg?n="$value":t.index_===Rn?n="$key":(w(t.index_ instanceof zg,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=we(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=we(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+we(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=we(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+we(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function ga(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==ve&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends Au{constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Os("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(w(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=ui.getListenId_(e,s),l={};this.listens_[o]=l;const a=_a(e._queryParams);this.restRequest_(r+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Nn(this.listens_,o)===l){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,n){const s=ui.getListenId_(e,n);delete this.listens_[s]}get(e){const n=_a(e._queryParams),s=e._path.toString(),i=new ks;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Rp(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=gs(l.responseText)}catch{$e("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&$e("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(){this.rootNode_=K.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(){return{value:null,children:new Map}}function Bu(t,e,n){if(Z(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=Q(e);t.children.has(s)||t.children.set(s,hi());const i=t.children.get(s);e=pe(e),Bu(i,e,n)}}function Ur(t,e,n){t.value!==null?n(e,t.value):em(t,(s,i)=>{const r=new le(e.toString()+"/"+s);Ur(i,r,n)})}function em(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&ke(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=10*1e3,nm=30*1e3,sm=5*60*1e3;class im{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new tm(e);const s=ma+(nm-ma)*Math.random();os(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;ke(e,(i,r)=>{r>0&&pt(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),os(this.reportStats_.bind(this),Math.floor(Math.random()*2*sm))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function Po(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Oo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Do(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Je.ACK_USER_WRITE,this.source=Po()}operationForChild(e){if(Z(this.path)){if(this.affectedTree.value!=null)return w(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new le(e));return new di(ne(),n,this.revert)}}else return w(Q(this.path)===e,"operationForChild called for unrelated child."),new di(pe(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,n){this.source=e,this.path=n,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return Z(this.path)?new Ss(this.source,ne()):new Ss(this.source,pe(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Je.OVERWRITE}operationForChild(e){return Z(this.path)?new hn(this.source,ne(),this.snap.getImmediateChild(e)):new hn(this.source,pe(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Je.MERGE}operationForChild(e){if(Z(this.path)){const n=this.children.subtree(new le(e));return n.isEmpty()?null:n.value?new hn(this.source,ne(),n.value):new On(this.source,ne(),n)}else return w(Q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new On(this.source,pe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Z(e))return this.isFullyInitialized()&&!this.filtered_;const n=Q(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function om(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Qg(o.childName,o.snapshotNode))}),Yn(t,i,"child_removed",e,s,n),Yn(t,i,"child_added",e,s,n),Yn(t,i,"child_moved",r,s,n),Yn(t,i,"child_changed",e,s,n),Yn(t,i,"value",e,s,n),i}function Yn(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>am(t,l,a)),o.forEach(l=>{const a=lm(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function lm(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function am(t,e,n){if(e.childName==null||n.childName==null)throw Ln("Should only compare child_ events.");const s=new X(e.childName,e.snapshotNode),i=new X(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(t,e){return{eventCache:t,serverCache:e}}function ls(t,e,n,s){return Fi(new Gt(e,n,s),t.serverCache)}function Hu(t,e,n,s){return Fi(t.eventCache,new Gt(e,n,s))}function fi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function dn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pr;const cm=()=>(pr||(pr=new Ve(z_)),pr);class de{constructor(e,n=cm()){this.value=e,this.children=n}static fromObject(e){let n=new de(null);return ke(e,(s,i)=>{n=n.set(new le(s),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ne(),value:this.value};if(Z(e))return null;{const s=Q(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(pe(e),n);return r!=null?{path:me(new le(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Z(e))return this;{const n=Q(e),s=this.children.get(n);return s!==null?s.subtree(pe(e)):new de(null)}}set(e,n){if(Z(e))return new de(n,this.children);{const s=Q(e),r=(this.children.get(s)||new de(null)).set(pe(e),n),o=this.children.insert(s,r);return new de(this.value,o)}}remove(e){if(Z(e))return this.children.isEmpty()?new de(null):new de(null,this.children);{const n=Q(e),s=this.children.get(n);if(s){const i=s.remove(pe(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new de(null):new de(this.value,r)}else return this}}get(e){if(Z(e))return this.value;{const n=Q(e),s=this.children.get(n);return s?s.get(pe(e)):null}}setTree(e,n){if(Z(e))return n;{const s=Q(e),r=(this.children.get(s)||new de(null)).setTree(pe(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new de(this.value,o)}}fold(e){return this.fold_(ne(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(me(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,ne(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(Z(e))return null;{const r=Q(e),o=this.children.get(r);return o?o.findOnPath_(pe(e),me(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ne(),n)}foreachOnPath_(e,n,s){if(Z(e))return this;{this.value&&s(n,this.value);const i=Q(e),r=this.children.get(i);return r?r.foreachOnPath_(pe(e),me(n,i),s):new de(null)}}foreach(e){this.foreach_(ne(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(me(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.writeTree_=e}static empty(){return new tt(new de(null))}}function as(t,e,n){if(Z(e))return new tt(new de(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Fe(i,e);return r=r.updateChild(o,n),new tt(t.writeTree_.set(i,r))}else{const i=new de(n),r=t.writeTree_.setTree(e,i);return new tt(r)}}}function Br(t,e,n){let s=t;return ke(n,(i,r)=>{s=as(s,me(e,i),r)}),s}function va(t,e){if(Z(e))return tt.empty();{const n=t.writeTree_.setTree(e,new de(null));return new tt(n)}}function Hr(t,e){return pn(t,e)!=null}function pn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Fe(n.path,e)):null}function ya(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(ve,(s,i)=>{e.push(new X(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new X(s,i.value))}),e}function Bt(t,e){if(Z(e))return t;{const n=pn(t,e);return n!=null?new tt(new de(n)):new tt(t.writeTree_.subtree(e))}}function Wr(t){return t.writeTree_.isEmpty()}function Dn(t,e){return Wu(ne(),t.writeTree_,e)}function Wu(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(w(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Wu(me(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(me(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(t,e){return Gu(e,t)}function um(t,e,n,s,i){w(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=as(t.visibleWrites,e,n)),t.lastWriteId=s}function hm(t,e,n,s){w(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Br(t.visibleWrites,e,n),t.lastWriteId=s}function dm(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function fm(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);w(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&pm(l,s.path)?i=!1:qe(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return _m(t),!0;if(s.snap)t.visibleWrites=va(t.visibleWrites,s.path);else{const l=s.children;ke(l,a=>{t.visibleWrites=va(t.visibleWrites,me(s.path,a))})}return!0}else return!1}function pm(t,e){if(t.snap)return qe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&qe(me(t.path,n),e))return!0;return!1}function _m(t){t.visibleWrites=Vu(t.allWrites,gm,ne()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function gm(t){return t.visible}function Vu(t,e,n){let s=tt.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)qe(n,o)?(l=Fe(n,o),s=as(s,l,r.snap)):qe(o,n)&&(l=Fe(o,n),s=as(s,ne(),r.snap.getChild(l)));else if(r.children){if(qe(n,o))l=Fe(n,o),s=Br(s,l,r.children);else if(qe(o,n))if(l=Fe(o,n),Z(l))s=Br(s,ne(),r.children);else{const a=Nn(r.children,Q(l));if(a){const c=a.getChild(pe(l));s=as(s,ne(),c)}}}else throw Ln("WriteRecord should have .snap or .children")}}return s}function ju(t,e,n,s,i){if(!s&&!i){const r=pn(t.visibleWrites,e);if(r!=null)return r;{const o=Bt(t.visibleWrites,e);if(Wr(o))return n;if(n==null&&!Hr(o,ne()))return null;{const l=n||K.EMPTY_NODE;return Dn(o,l)}}}else{const r=Bt(t.visibleWrites,e);if(!i&&Wr(r))return n;if(!i&&n==null&&!Hr(r,ne()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(qe(c.path,e)||qe(e,c.path))},l=Vu(t.allWrites,o,e),a=n||K.EMPTY_NODE;return Dn(l,a)}}}function mm(t,e,n){let s=K.EMPTY_NODE;const i=pn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ve,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Bt(t.visibleWrites,e);return n.forEachChild(ve,(o,l)=>{const a=Dn(Bt(r,new le(o)),l);s=s.updateImmediateChild(o,a)}),ya(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Bt(t.visibleWrites,e);return ya(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function vm(t,e,n,s,i){w(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=me(e,n);if(Hr(t.visibleWrites,r))return null;{const o=Bt(t.visibleWrites,r);return Wr(o)?i.getChild(n):Dn(o,i.getChild(n))}}function ym(t,e,n,s){const i=me(e,n),r=pn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Bt(t.visibleWrites,i);return Dn(o,s.getNode().getImmediateChild(n))}else return null}function bm(t,e){return pn(t.visibleWrites,e)}function Cm(t,e,n,s,i,r,o){let l;const a=Bt(t.visibleWrites,e),c=pn(a,ne());if(c!=null)l=c;else if(n!=null)l=Dn(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),d=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=d.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=d.getNext();return u}else return[]}function Em(){return{visibleWrites:tt.empty(),allWrites:[],lastWriteId:-1}}function pi(t,e,n,s){return ju(t.writeTree,t.treePath,e,n,s)}function Mo(t,e){return mm(t.writeTree,t.treePath,e)}function ba(t,e,n,s){return vm(t.writeTree,t.treePath,e,n,s)}function _i(t,e){return bm(t.writeTree,me(t.treePath,e))}function wm(t,e,n,s,i,r){return Cm(t.writeTree,t.treePath,e,n,s,i,r)}function Lo(t,e,n){return ym(t.writeTree,t.treePath,e,n)}function Ku(t,e){return Gu(me(t.treePath,e),t.writeTree)}function Gu(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;w(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),w(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,Es(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Cs(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Pn(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,Es(s,e.snapshotNode,i.oldSnap));else throw Ln("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const zu=new Tm;class Fo{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Gt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Lo(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:dn(this.viewCache_),r=wm(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im(t){return{filter:t}}function Rm(t,e){w(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),w(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function xm(t,e,n,s,i){const r=new Sm;let o,l;if(n.type===Je.OVERWRITE){const c=n;c.source.fromUser?o=Vr(t,e,c.path,c.snap,s,i,r):(w(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!Z(c.path),o=gi(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===Je.MERGE){const c=n;c.source.fromUser?o=Am(t,e,c.path,c.children,s,i,r):(w(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=jr(t,e,c.path,c.children,s,i,l,r))}else if(n.type===Je.ACK_USER_WRITE){const c=n;c.revert?o=Om(t,e,c.path,s,i,r):o=km(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===Je.LISTEN_COMPLETE)o=Pm(t,e,n.path,s,r);else throw Ln("Unknown operation type: "+n.type);const a=r.getChanges();return Nm(e,o,a),{viewCache:o,changes:a}}function Nm(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=fi(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(Uu(fi(e)))}}function qu(t,e,n,s,i,r){const o=e.eventCache;if(_i(s,n)!=null)return e;{let l,a;if(Z(n))if(w(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=dn(e),u=c instanceof K?c:K.EMPTY_NODE,h=Mo(s,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=pi(s,dn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=Q(n);if(c===".priority"){w(Kt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=ba(s,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=pe(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const d=ba(s,n,o.getNode(),a);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=Lo(s,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,r):l=o.getNode()}}return ls(e,l,o.isFullyInitialized()||Z(n),t.filter.filtersNodes())}}function gi(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(Z(n))c=u.updateFullNode(a.getNode(),s,null);else if(u.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=u.updateFullNode(a.getNode(),_,null)}else{const _=Q(n);if(!a.isCompleteForPath(n)&&Kt(n)>1)return e;const v=pe(n),H=a.getNode().getImmediateChild(_).updateChild(v,s);_===".priority"?c=u.updatePriority(a.getNode(),H):c=u.updateChild(a.getNode(),_,H,v,zu,null)}const h=Hu(e,c,a.isFullyInitialized()||Z(n),u.filtersNodes()),d=new Fo(i,h,r);return qu(t,h,n,i,d,l)}function Vr(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const u=new Fo(i,e,r);if(Z(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=ls(e,c,!0,t.filter.filtersNodes());else{const h=Q(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=ls(e,c,l.isFullyInitialized(),l.isFiltered());else{const d=pe(n),_=l.getNode().getImmediateChild(h);let v;if(Z(d))v=s;else{const I=u.getCompleteChild(h);I!=null?Io(d)===".priority"&&I.getChild(Pu(d)).isEmpty()?v=I:v=I.updateChild(d,s):v=K.EMPTY_NODE}if(_.equals(v))a=e;else{const I=t.filter.updateChild(l.getNode(),h,v,d,u,o);a=ls(e,I,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function Ca(t,e){return t.eventCache.isCompleteForChild(e)}function Am(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const u=me(n,a);Ca(e,Q(u))&&(l=Vr(t,l,u,c,i,r,o))}),s.foreach((a,c)=>{const u=me(n,a);Ca(e,Q(u))||(l=Vr(t,l,u,c,i,r,o))}),l}function Ea(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function jr(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;Z(n)?c=s:c=new de(null).setTree(n,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),v=Ea(t,_,d);a=gi(t,a,new le(h),v,i,r,o,l)}}),c.children.inorderTraversal((h,d)=>{const _=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!_){const v=e.serverCache.getNode().getImmediateChild(h),I=Ea(t,v,d);a=gi(t,a,new le(h),I,i,r,o,l)}}),a}function km(t,e,n,s,i,r,o){if(_i(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(Z(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return gi(t,e,n,a.getNode().getChild(n),i,r,l,o);if(Z(n)){let c=new de(null);return a.getNode().forEachChild(Rn,(u,h)=>{c=c.set(new le(u),h)}),jr(t,e,n,c,i,r,l,o)}else return e}else{let c=new de(null);return s.foreach((u,h)=>{const d=me(n,u);a.isCompleteForPath(d)&&(c=c.set(u,a.getNode().getChild(d)))}),jr(t,e,n,c,i,r,l,o)}}function Pm(t,e,n,s,i){const r=e.serverCache,o=Hu(e,r.getNode(),r.isFullyInitialized()||Z(n),r.isFiltered());return qu(t,o,n,s,zu,i)}function Om(t,e,n,s,i,r){let o;if(_i(s,n)!=null)return e;{const l=new Fo(s,e,i),a=e.eventCache.getNode();let c;if(Z(n)||Q(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=pi(s,dn(e));else{const h=e.serverCache.getNode();w(h instanceof K,"serverChildren would be complete if leaf node"),u=Mo(s,h)}u=u,c=t.filter.updateFullNode(a,u,r)}else{const u=Q(n);let h=Lo(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,pe(n),l,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,K.EMPTY_NODE,pe(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=pi(s,dn(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||_i(s,ne())!=null,ls(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Ao(s.getIndex()),r=Jg(s);this.processor_=Im(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(K.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(K.EMPTY_NODE,l.getNode(),null),u=new Gt(a,o.isFullyInitialized(),i.filtersNodes()),h=new Gt(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Fi(h,u),this.eventGenerator_=new rm(this.query_)}get query(){return this.query_}}function Mm(t){return t.viewCache_.serverCache.getNode()}function Lm(t){return fi(t.viewCache_)}function Fm(t,e){const n=dn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!Z(e)&&!n.getImmediateChild(Q(e)).isEmpty())?n.getChild(e):null}function wa(t){return t.eventRegistrations_.length===0}function $m(t,e){t.eventRegistrations_.push(e)}function Sa(t,e,n){const s=[];if(n){w(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Ta(t,e,n,s){e.type===Je.MERGE&&e.source.queryId!==null&&(w(dn(t.viewCache_),"We should always have a full cache before handling merges"),w(fi(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=xm(t.processor_,i,e,n,s);return Rm(t.processor_,r.viewCache),w(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Yu(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Um(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(ve,(r,o)=>{s.push(Pn(r,o))}),n.isFullyInitialized()&&s.push(Uu(n.getNode())),Yu(t,s,n.getNode(),e)}function Yu(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return om(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mi;class Qu{constructor(){this.views=new Map}}function Bm(t){w(!mi,"__referenceConstructor has already been defined"),mi=t}function Hm(){return w(mi,"Reference.ts has not been loaded"),mi}function Wm(t){return t.views.size===0}function $o(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return w(r!=null,"SyncTree gave us an op for an invalid query."),Ta(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Ta(o,e,n,s));return r}}function Xu(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=pi(n,i?s:null),a=!1;l?a=!0:s instanceof K?(l=Mo(n,s),a=!1):(l=K.EMPTY_NODE,a=!1);const c=Fi(new Gt(l,a,!1),new Gt(s,i,!1));return new Dm(e,c)}return o}function Vm(t,e,n,s,i,r){const o=Xu(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),$m(o,n),Um(o,n)}function jm(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=zt(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(Sa(c,n,s)),wa(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(Sa(a,n,s)),wa(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!zt(t)&&r.push(new(Hm())(e._repo,e._path)),{removed:r,events:o}}function Ju(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ht(t,e){let n=null;for(const s of t.views.values())n=n||Fm(s,e);return n}function Zu(t,e){if(e._queryParams.loadsAllData())return Ui(t);{const s=e._queryIdentifier;return t.views.get(s)}}function eh(t,e){return Zu(t,e)!=null}function zt(t){return Ui(t)!=null}function Ui(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi;function Km(t){w(!vi,"__referenceConstructor has already been defined"),vi=t}function Gm(){return w(vi,"Reference.ts has not been loaded"),vi}let zm=1;class Ia{constructor(e){this.listenProvider_=e,this.syncPointTree_=new de(null),this.pendingWriteTree_=Em(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function th(t,e,n,s,i){return um(t.pendingWriteTree_,e,n,s,i),i?Un(t,new hn(Po(),e,n)):[]}function qm(t,e,n,s){hm(t.pendingWriteTree_,e,n,s);const i=de.fromObject(n);return Un(t,new On(Po(),e,i))}function Mt(t,e,n=!1){const s=dm(t.pendingWriteTree_,e);if(fm(t.pendingWriteTree_,e)){let r=new de(null);return s.snap!=null?r=r.set(ne(),!0):ke(s.children,o=>{r=r.set(new le(o),!0)}),Un(t,new di(s.path,r,n))}else return[]}function Ms(t,e,n){return Un(t,new hn(Oo(),e,n))}function Ym(t,e,n){const s=de.fromObject(n);return Un(t,new On(Oo(),e,s))}function Qm(t,e){return Un(t,new Ss(Oo(),e))}function Xm(t,e,n){const s=Bo(t,n);if(s){const i=Ho(s),r=i.path,o=i.queryId,l=Fe(r,e),a=new Ss(Do(o),l);return Wo(t,r,a)}else return[]}function yi(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||eh(o,e))){const a=jm(o,e,n,s);Wm(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(d,_)=>zt(_));if(u&&!h){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const _=ev(d);for(let v=0;v<_.length;++v){const I=_[v],H=I.query,$=rh(t,I);t.listenProvider_.startListening(cs(H),Ts(t,H),$.hashFn,$.onComplete)}}}!h&&c.length>0&&!s&&(u?t.listenProvider_.stopListening(cs(e),null):c.forEach(d=>{const _=t.queryToTagMap.get(Bi(d));t.listenProvider_.stopListening(cs(d),_)}))}tv(t,c)}return l}function nh(t,e,n,s){const i=Bo(t,s);if(i!=null){const r=Ho(i),o=r.path,l=r.queryId,a=Fe(o,e),c=new hn(Do(l),a,n);return Wo(t,o,c)}else return[]}function Jm(t,e,n,s){const i=Bo(t,s);if(i){const r=Ho(i),o=r.path,l=r.queryId,a=Fe(o,e),c=de.fromObject(n),u=new On(Do(l),a,c);return Wo(t,o,u)}else return[]}function Kr(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(d,_)=>{const v=Fe(d,i);r=r||Ht(_,v),o=o||zt(_)});let l=t.syncPointTree_.get(i);l?(o=o||zt(l),r=r||Ht(l,ne())):(l=new Qu,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=K.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,v)=>{const I=Ht(v,ne());I&&(r=r.updateImmediateChild(_,I))}));const c=eh(l,e);if(!c&&!e._queryParams.loadsAllData()){const d=Bi(e);w(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const _=nv();t.queryToTagMap.set(d,_),t.tagToQueryMap.set(_,d)}const u=$i(t.pendingWriteTree_,i);let h=Vm(l,e,n,u,r,a);if(!c&&!o&&!s){const d=Zu(l,e);h=h.concat(sv(t,e,d))}return h}function Uo(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Fe(o,e),c=Ht(l,a);if(c)return c});return ju(i,e,r,n,!0)}function Zm(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=Fe(c,n);s=s||Ht(u,h)});let i=t.syncPointTree_.get(n);i?s=s||Ht(i,ne()):(i=new Qu,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new Gt(s,!0,!1):null,l=$i(t.pendingWriteTree_,e._path),a=Xu(i,e,l,r?o.getNode():K.EMPTY_NODE,r);return Lm(a)}function Un(t,e){return sh(e,t.syncPointTree_,null,$i(t.pendingWriteTree_,ne()))}function sh(t,e,n,s){if(Z(t.path))return ih(t,e,n,s);{const i=e.get(ne());n==null&&i!=null&&(n=Ht(i,ne()));let r=[];const o=Q(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=Ku(s,o);r=r.concat(sh(l,a,c,u))}return i&&(r=r.concat($o(i,t,s,n))),r}}function ih(t,e,n,s){const i=e.get(ne());n==null&&i!=null&&(n=Ht(i,ne()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=Ku(s,o),u=t.operationForChild(o);u&&(r=r.concat(ih(u,l,a,c)))}),i&&(r=r.concat($o(i,t,s,n))),r}function rh(t,e){const n=e.query,s=Ts(t,n);return{hashFn:()=>(Mm(e)||K.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Xm(t,n._path,s):Qm(t,n._path);{const r=Q_(i,n);return yi(t,n,null,r)}}}}function Ts(t,e){const n=Bi(e);return t.queryToTagMap.get(n)}function Bi(t){return t._path.toString()+"$"+t._queryIdentifier}function Bo(t,e){return t.tagToQueryMap.get(e)}function Ho(t){const e=t.indexOf("$");return w(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new le(t.substr(0,e))}}function Wo(t,e,n){const s=t.syncPointTree_.get(e);w(s,"Missing sync point for query tag that we're tracking");const i=$i(t.pendingWriteTree_,e);return $o(s,n,i,null)}function ev(t){return t.fold((e,n,s)=>{if(n&&zt(n))return[Ui(n)];{let i=[];return n&&(i=Ju(n)),ke(s,(r,o)=>{i=i.concat(o)}),i}})}function cs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Gm())(t._repo,t._path):t}function tv(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Bi(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function nv(){return zm++}function sv(t,e,n){const s=e._path,i=Ts(t,e),r=rh(t,n),o=t.listenProvider_.startListening(cs(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)w(!zt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!Z(c)&&u&&zt(u))return[Ui(u).query];{let d=[];return u&&(d=d.concat(Ju(u).map(_=>_.query))),ke(h,(_,v)=>{d=d.concat(v)}),d}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(cs(u),Ts(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Vo(n)}node(){return this.node_}}class jo{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=me(this.path_,e);return new jo(this.syncTree_,n)}node(){return Uo(this.syncTree_,this.path_)}}const iv=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ra=function(t,e,n){if(!t||typeof t!="object")return t;if(w(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return rv(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ov(t[".sv"],e);w(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},rv=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:w(!1,"Unexpected server value: "+t)}},ov=function(t,e,n){t.hasOwnProperty("increment")||w(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&w(!1,"Unexpected increment value: "+s);const i=e.node();if(w(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},oh=function(t,e,n,s){return Ko(e,new jo(n,t),s)},lh=function(t,e,n){return Ko(t,new Vo(e),n)};function Ko(t,e,n){const s=t.getPriority().val(),i=Ra(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=Ra(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new Te(l,Ee(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Te(i))),o.forEachChild(ve,(l,a)=>{const c=Ko(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function zo(t,e){let n=e instanceof le?e:new le(e),s=t,i=Q(n);for(;i!==null;){const r=Nn(s.node.children,i)||{children:{},childCount:0};s=new Go(i,s,r),n=pe(n),i=Q(n)}return s}function Bn(t){return t.node.value}function ah(t,e){t.node.value=e,Gr(t)}function ch(t){return t.node.childCount>0}function lv(t){return Bn(t)===void 0&&!ch(t)}function Hi(t,e){ke(t.node.children,(n,s)=>{e(new Go(n,t,s))})}function uh(t,e,n,s){n&&e(t),Hi(t,i=>{uh(i,e,!0)})}function av(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Ls(t){return new le(t.parent===null?t.name:Ls(t.parent)+"/"+t.name)}function Gr(t){t.parent!==null&&cv(t.parent,t.name,t)}function cv(t,e,n){const s=lv(n),i=pt(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,Gr(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Gr(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv=/[\[\].#$\/\u0000-\u001F\u007F]/,hv=/[\[\].#$\u0000-\u001F\u007F]/,_r=10*1024*1024,qo=function(t){return typeof t=="string"&&t.length!==0&&!uv.test(t)},hh=function(t){return typeof t=="string"&&t.length!==0&&!hv.test(t)},dv=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),hh(t)},fv=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Co(t)||t&&typeof t=="object"&&pt(t,".sv")},dh=function(t,e,n,s){s&&e===void 0||Wi(Di(t,"value"),e,n)},Wi=function(t,e,n){const s=n instanceof le?new Ag(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+nn(s));if(typeof e=="function")throw new Error(t+"contains a function "+nn(s)+" with contents = "+e.toString());if(Co(e))throw new Error(t+"contains "+e.toString()+" "+nn(s));if(typeof e=="string"&&e.length>_r/3&&Mi(e)>_r)throw new Error(t+"contains a string greater than "+_r+" utf8 bytes "+nn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(ke(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!qo(o)))throw new Error(t+" contains an invalid key ("+o+") "+nn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);kg(s,o),Wi(t,l,s),Pg(s)}),i&&r)throw new Error(t+' contains ".value" child '+nn(s)+" in addition to actual children.")}},pv=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=bs(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!qo(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ng);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&qe(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},_v=function(t,e,n,s){const i=Di(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];ke(e,(o,l)=>{const a=new le(o);if(Wi(i,l,me(n,a)),Io(a)===".priority"&&!fv(l))throw new Error(i+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(a)}),pv(i,r)},fh=function(t,e,n,s){if(!hh(n))throw new Error(Di(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},gv=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),fh(t,e,n)},Yo=function(t,e){if(Q(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},mv=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!qo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!dv(n))throw new Error(Di(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Vi(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Ro(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function ph(t,e,n){Vi(t,n),_h(t,s=>Ro(s,e))}function Qe(t,e,n){Vi(t,n),_h(t,s=>qe(s,e)||qe(e,s))}function _h(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(yv(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function yv(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();rs&&Ae("event: "+n.toString()),$n(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv="repo_interrupt",Cv=25;class Ev{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new vv,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=hi(),this.transactionQueueTree_=new Go,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function wv(t,e,n){if(t.stats_=So(t.repoInfo_),t.forceRestClient_||eg())t.server_=new ui(t.repoInfo_,(s,i,r,o)=>{xa(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Na(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{we(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new wt(t.repoInfo_,e,(s,i,r,o)=>{xa(t,s,i,r,o)},s=>{Na(t,s)},s=>{Sv(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=rg(t.repoInfo_,()=>new im(t.stats_,t.server_)),t.infoData_=new Zg,t.infoSyncTree_=new Ia({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=Ms(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),Qo(t,"connected",!1),t.serverSyncTree_=new Ia({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);Qe(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function gh(t){const n=t.infoData_.getNode(new le(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ji(t){return iv({timestamp:gh(t)})}function xa(t,e,n,s,i){t.dataUpdateCount++;const r=new le(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=ri(n,c=>Ee(c));o=Jm(t.serverSyncTree_,r,a,i)}else{const a=Ee(n);o=nh(t.serverSyncTree_,r,a,i)}else if(s){const a=ri(n,c=>Ee(c));o=Ym(t.serverSyncTree_,r,a)}else{const a=Ee(n);o=Ms(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=Mn(t,r)),Qe(t.eventQueue_,l,o)}function Na(t,e){Qo(t,"connected",e),e===!1&&xv(t)}function Sv(t,e){ke(e,(n,s)=>{Qo(t,n,s)})}function Qo(t,e,n){const s=new le("/.info/"+e),i=Ee(n);t.infoData_.updateSnapshot(s,i);const r=Ms(t.infoSyncTree_,s,i);Qe(t.eventQueue_,s,r)}function Xo(t){return t.nextWriteId_++}function Tv(t,e,n){const s=Zm(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=Ee(i).withIndex(e._queryParams.getIndex());Kr(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ms(t.serverSyncTree_,e._path,r);else{const l=Ts(t.serverSyncTree_,e);o=nh(t.serverSyncTree_,e._path,r,l)}return Qe(t.eventQueue_,e._path,o),yi(t.serverSyncTree_,e,n,null,!0),r},i=>(Fs(t,"get for query "+we(e)+" failed: "+i),Promise.reject(new Error(i))))}function Iv(t,e,n,s,i){Fs(t,"set",{path:e.toString(),value:n,priority:s});const r=ji(t),o=Ee(n,s),l=Uo(t.serverSyncTree_,e),a=lh(o,l,r),c=Xo(t),u=th(t.serverSyncTree_,e,a,c,!0);Vi(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(d,_)=>{const v=d==="ok";v||$e("set at "+e+" failed: "+d);const I=Mt(t.serverSyncTree_,c,!v);Qe(t.eventQueue_,e,I),zr(t,i,d,_)});const h=Zo(t,e);Mn(t,h),Qe(t.eventQueue_,h,[])}function Rv(t,e,n,s){Fs(t,"update",{path:e.toString(),value:n});let i=!0;const r=ji(t),o={};if(ke(n,(l,a)=>{i=!1,o[l]=oh(me(e,l),Ee(a),t.serverSyncTree_,r)}),i)Ae("update() called with empty data.  Don't do anything."),zr(t,s,"ok",void 0);else{const l=Xo(t),a=qm(t.serverSyncTree_,e,o,l);Vi(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||$e("update at "+e+" failed: "+c);const d=Mt(t.serverSyncTree_,l,!h),_=d.length>0?Mn(t,e):e;Qe(t.eventQueue_,_,d),zr(t,s,c,u)}),ke(n,c=>{const u=Zo(t,me(e,c));Mn(t,u)}),Qe(t.eventQueue_,e,[])}}function xv(t){Fs(t,"onDisconnectEvents");const e=ji(t),n=hi();Ur(t.onDisconnect_,ne(),(i,r)=>{const o=oh(i,r,t.serverSyncTree_,e);Bu(n,i,o)});let s=[];Ur(n,ne(),(i,r)=>{s=s.concat(Ms(t.serverSyncTree_,i,r));const o=Zo(t,i);Mn(t,o)}),t.onDisconnect_=hi(),Qe(t.eventQueue_,ne(),s)}function Nv(t,e,n){let s;Q(e._path)===".info"?s=Kr(t.infoSyncTree_,e,n):s=Kr(t.serverSyncTree_,e,n),ph(t.eventQueue_,e._path,s)}function mh(t,e,n){let s;Q(e._path)===".info"?s=yi(t.infoSyncTree_,e,n):s=yi(t.serverSyncTree_,e,n),ph(t.eventQueue_,e._path,s)}function Av(t){t.persistentConnection_&&t.persistentConnection_.interrupt(bv)}function Fs(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ae(n,...e)}function zr(t,e,n,s){e&&$n(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function vh(t,e,n){return Uo(t.serverSyncTree_,e,n)||K.EMPTY_NODE}function Jo(t,e=t.transactionQueueTree_){if(e||Ki(t,e),Bn(e)){const n=bh(t,e);w(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&kv(t,Ls(e),n)}else ch(e)&&Hi(e,n=>{Jo(t,n)})}function kv(t,e,n){const s=n.map(c=>c.currentWriteId),i=vh(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];w(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Fe(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{Fs(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<n.length;d++)n[d].status=2,u=u.concat(Mt(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&h.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();Ki(t,zo(t.transactionQueueTree_,e)),Jo(t,t.transactionQueueTree_),Qe(t.eventQueue_,e,u);for(let d=0;d<h.length;d++)$n(h[d])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{$e("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Mn(t,e)}},o)}function Mn(t,e){const n=yh(t,e),s=Ls(n),i=bh(t,n);return Pv(t,i,s),s}function Pv(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Fe(n,a.path);let u=!1,h;if(w(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=Cv)u=!0,h="maxretry",i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0));else{const d=vh(t,a.path,o);a.currentInputSnapshot=d;const _=e[l].update(d.val());if(_!==void 0){Wi("transaction failed: Data returned ",_,a.path);let v=Ee(_);typeof _=="object"&&_!=null&&pt(_,".priority")||(v=v.updatePriority(d.getPriority()));const H=a.currentWriteId,$=ji(t),J=lh(v,d,$);a.currentOutputSnapshotRaw=v,a.currentOutputSnapshotResolved=J,a.currentWriteId=Xo(t),o.splice(o.indexOf(H),1),i=i.concat(th(t.serverSyncTree_,a.path,J,a.currentWriteId,a.applyLocally)),i=i.concat(Mt(t.serverSyncTree_,H,!0))}else u=!0,h="nodata",i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0))}Qe(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,function(d){setTimeout(d,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(h),!1,null))))}Ki(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)$n(s[l]);Jo(t,t.transactionQueueTree_)}function yh(t,e){let n,s=t.transactionQueueTree_;for(n=Q(e);n!==null&&Bn(s)===void 0;)s=zo(s,n),e=pe(e),n=Q(e);return s}function bh(t,e){const n=[];return Ch(t,e,n),n.sort((s,i)=>s.order-i.order),n}function Ch(t,e,n){const s=Bn(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Hi(e,i=>{Ch(t,i,n)})}function Ki(t,e){const n=Bn(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,ah(e,n.length>0?n:void 0)}Hi(e,s=>{Ki(t,s)})}function Zo(t,e){const n=Ls(yh(t,e)),s=zo(t.transactionQueueTree_,e);return av(s,i=>{gr(t,i)}),gr(t,s),uh(s,i=>{gr(t,i)}),n}function gr(t,e){const n=Bn(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(w(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(w(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Mt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ah(e,void 0):n.length=r+1,Qe(t.eventQueue_,Ls(e),i);for(let o=0;o<s.length;o++)$n(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Dv(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):$e(`Invalid query segment '${n}' in query '${t}'`)}return e}const Aa=function(t,e){const n=Mv(t),s=n.namespace;n.domain==="firebase.com"&&Rt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Rt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||K_();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new wu(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new le(n.pathString)}},Mv=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=Ov(t.substring(u,h)));const d=Dv(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const v=e.indexOf(".");s=e.substring(0,v).toLowerCase(),n=e.substring(v+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Lv=function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=ka.charAt(n%64),n=Math.floor(n/64);w(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=ka.charAt(e[i]);return w(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+we(this.snapshot.exportVal())}}class $v{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return w(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return Z(this._path)?null:Io(this._path)}get ref(){return new Nt(this._repo,this._path)}get _queryIdentifier(){const e=ga(this._queryParams),n=Eo(e);return n==="{}"?"default":n}get _queryObject(){return ga(this._queryParams)}isEqual(e){if(e=Qt(e),!(e instanceof tl))return!1;const n=this._repo===e._repo,s=Ro(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+xg(this._path)}}class Nt extends tl{constructor(e,n){super(e,n,new ko,!1)}get parent(){const e=Pu(this._path);return e===null?null:new Nt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Is{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new le(e),s=Rs(this.ref,e);return new Is(this._node.getChild(n),s,ve)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Is(i,Rs(this.ref,s),ve)))}hasChild(e){const n=new le(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function At(t,e){return t=Qt(t),t._checkNotDeleted("ref"),e!==void 0?Rs(t._root,e):t._root}function Rs(t,e){return t=Qt(t),Q(t._path)===null?gv("child","path",e):fh("child","path",e),new Nt(t._repo,me(t._path,e))}function Uv(t,e){t=Qt(t),Yo("push",t._path),dh("push",e,t._path,!0);const n=gh(t._repo),s=Lv(n),i=Rs(t,s),r=Rs(t,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function Eh(t){return Yo("remove",t._path),_n(t,null)}function _n(t,e){t=Qt(t),Yo("set",t._path),dh("set",e,t._path,!1);const n=new ks;return Iv(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function nl(t,e){_v("update",e,t._path);const n=new ks;return Rv(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function sl(t){t=Qt(t);const e=new el(()=>{}),n=new $s(e);return Tv(t._repo,t,n).then(s=>new Is(s,new Nt(t._repo,t._path),t._queryParams.getIndex()))}class $s{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new Fv("value",this,new Is(e.snapshotNode,new Nt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new $v(this,e,n):null}matches(e){return e instanceof $s?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Bv(t,e,n,s,i){const r=new el(n,void 0),o=new $s(r);return Nv(t._repo,t,o),()=>mh(t._repo,t,o)}function Gi(t,e,n,s){return Bv(t,"value",e)}function zi(t,e,n){let s=null;const i=n?new el(n):null;s=new $s(i),mh(t._repo,t,s)}Bm(Nt);Km(Nt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hv="FIREBASE_DATABASE_EMULATOR_HOST",qr={};let Wv=!1;function Vv(t,e,n,s){t.repoInfo_=new wu(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),s&&(t.authTokenProvider_=s)}function jv(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Rt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ae("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Aa(r,i),l=o.repoInfo,a;typeof process<"u"&&Jl&&(a=Jl[Hv]),a?(r=`http://${a}?ns=${l.namespace}`,o=Aa(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new ng(t.name,t.options,e);mv("Invalid Firebase Database URL",o),Z(o.path)||Rt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Gv(l,t,c,new tg(t.name,n));return new zv(u,t)}function Kv(t,e){const n=qr[e];(!n||n[t.key]!==t)&&Rt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Av(t),delete n[t.key]}function Gv(t,e,n,s){let i=qr[e.name];i||(i={},qr[e.name]=i);let r=i[t.toURLString()];return r&&Rt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ev(t,Wv,n,s),i[t.toURLString()]=r,r}class zv{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(wv(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Nt(this._repo,ne())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Kv(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rt("Cannot call "+e+" on a deleted database.")}}function qv(t=ou(),e){const n=su(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=qc("database");s&&Yv(n,...s)}return n}function Yv(t,e,n,s={}){t=Qt(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Rt("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Rt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Qs(Qs.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:Qc(s.mockUserToken,t.app.options.projectId);r=new Qs(o)}Vv(i,e,n,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qv(t){U_(iu),ms(new An("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return jv(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Ut(Zl,ea,t),Ut(Zl,ea,"esm2017")}wt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};wt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Qv();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh="firebasestorage.googleapis.com",Xv="storageBucket",Jv=2*60*1e3,Zv=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Fn{constructor(e,n,s=0){super(mr(e),`Firebase Storage: ${n} (${mr(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,_t.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return mr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ft;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ft||(ft={}));function mr(t){return"storage/"+t}function ey(){const t="An unknown error occurred, please check the error payload for server response.";return new _t(ft.UNKNOWN,t)}function ty(){return new _t(ft.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ny(){return new _t(ft.CANCELED,"User canceled the upload/download.")}function sy(t){return new _t(ft.INVALID_URL,"Invalid URL '"+t+"'.")}function iy(t){return new _t(ft.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Pa(t){return new _t(ft.INVALID_ARGUMENT,t)}function Sh(){return new _t(ft.APP_DELETED,"The Firebase app was deleted.")}function ry(t){return new _t(ft.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=Ze.makeFromUrl(e,n)}catch{return new Ze(e,"")}if(s.path==="")return s;throw iy(e)}static makeFromUrl(e,n){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(O){O.path.charAt(O.path.length-1)==="/"&&(O.path_=O.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),a={bucket:1,path:3};function c(O){O.path_=decodeURIComponent(O.path)}const u="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",_=new RegExp(`^https?://${h}/${u}/b/${i}/o${d}`,"i"),v={bucket:1,path:3},I=n===wh?"(?:storage.googleapis.com|storage.cloud.google.com)":n,H="([^?#]*)",$=new RegExp(`^https?://${I}/${i}/${H}`,"i"),Y=[{regex:l,indices:a,postModify:r},{regex:_,indices:v,postModify:c},{regex:$,indices:{bucket:1,path:2},postModify:c}];for(let O=0;O<Y.length;O++){const A=Y[O],L=A.regex.exec(e);if(L){const D=L[A.indices.bucket];let M=L[A.indices.path];M||(M=""),s=new Ze(D,M),A.postModify(s);break}}if(s==null)throw sy(e);return s}}class oy{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ly(t,e,n){let s=1,i=null,r=null,o=!1,l=0;function a(){return l===2}let c=!1;function u(...H){c||(c=!0,e.apply(null,H))}function h(H){i=setTimeout(()=>{i=null,t(_,a())},H)}function d(){r&&clearTimeout(r)}function _(H,...$){if(c){d();return}if(H){d(),u.call(null,H,...$);return}if(a()||o){d(),u.call(null,H,...$);return}s<64&&(s*=2);let Y;l===1?(l=2,Y=0):Y=(s+Math.random())*1e3,h(Y)}let v=!1;function I(H){v||(v=!0,d(),!c&&(i!==null?(H||(l=2),clearTimeout(i),h(0)):H||(l=1)))}return h(0),r=setTimeout(()=>{o=!0,I(!0)},n),I}function ay(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cy(t){return t!==void 0}function Oa(t,e,n,s){if(s<e)throw Pa(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw Pa(`Invalid value for '${t}'. Expected ${n} or less.`)}function uy(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const i=e(s)+"="+e(t[s]);n=n+i+"&"}return n=n.slice(0,-1),n}var bi;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(bi||(bi={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hy(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||i||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(e,n,s,i,r,o,l,a,c,u,h,d=!0){this.url_=e,this.method_=n,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,v)=>{this.resolve_=_,this.reject_=v,this.start_()})}start_(){const e=(s,i)=>{if(i){s(!1,new Ks(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=l=>{const a=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(a,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const l=r.getErrorCode()===bi.NO_ERROR,a=r.getStatus();if(!l||hy(a,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===bi.ABORT;s(!1,new Ks(!1,null,u));return}const c=this.successCodes_.indexOf(a)!==-1;s(!0,new Ks(c,r))})},n=(s,i)=>{const r=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const a=this.callback_(l,l.getResponse());cy(a)?r(a):r()}catch(a){o(a)}else if(l!==null){const a=ey();a.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,a)):o(a)}else if(i.canceled){const a=this.appDelete_?Sh():ny();o(a)}else{const a=ty();o(a)}};this.canceled_?n(!1,new Ks(!1,null,!0)):this.backoffId_=ly(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&ay(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ks{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function fy(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function py(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function _y(t,e){e&&(t["X-Firebase-GMPID"]=e)}function gy(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function my(t,e,n,s,i,r,o=!0){const l=uy(t.urlParams),a=t.url+l,c=Object.assign({},t.headers);return _y(c,e),fy(c,n),py(c,r),gy(c,s),new dy(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vy(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function yy(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,n){this._service=e,n instanceof Ze?this._location=n:this._location=Ze.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Ci(e,n)}get root(){const e=new Ze(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return yy(this._location.path)}get storage(){return this._service}get parent(){const e=vy(this._location.path);if(e===null)return null;const n=new Ze(this._location.bucket,e);return new Ci(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw ry(e)}}function Da(t,e){const n=e==null?void 0:e[Xv];return n==null?null:Ze.makeFromBucketSpec(n,t)}function by(t,e,n,s={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=s;i&&(t._overrideAuthToken=typeof i=="string"?i:Qc(i,t.app.options.projectId))}class Cy{constructor(e,n,s,i,r){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._bucket=null,this._host=wh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Jv,this._maxUploadRetryTime=Zv,this._requests=new Set,i!=null?this._bucket=Ze.makeFromBucketSpec(i,this._host):this._bucket=Da(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ze.makeFromBucketSpec(this._url,e):this._bucket=Da(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Oa("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Oa("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ci(this,e)}_makeRequest(e,n,s,i,r=!0){if(this._deleted)return new oy(Sh());{const o=my(e,this._appId,s,i,n,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,i).getPromise()}}const Ma="@firebase/storage",La="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="storage";function Ey(t=ou(),e){t=Qt(t);const s=su(t,Th).getImmediate({identifier:e}),i=qc("storage");return i&&wy(s,...i),s}function wy(t,e,n,s={}){by(t,e,n,s)}function Sy(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new Cy(n,s,i,e,iu)}function Ty(){ms(new An(Th,Sy,"PUBLIC").setMultipleInstances(!0)),Ut(Ma,La,""),Ut(Ma,La,"esm2017")}Ty();const Iy={apiKey:"AIzaSyCezkC1UDda81W81BoZEtdLeIRGVzFVmyw",authDomain:"crossword-bac37.firebaseapp.com",databaseURL:"https://crossword-bac37-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"crossword-bac37",storageBucket:"crossword-bac37.firebasestorage.app",messagingSenderId:"782981029418",appId:"1:782981029418:web:89ce31a3fa4869466cad53"},Ih=ru(Iy),kt=qv(Ih);Ey(Ih);const Yr=()=>At(kt,"batches"),il=t=>At(kt,`batches/${t}`),Ry=async t=>{const e=Uv(Yr());return await _n(e,t),e.key},xy=async(t,e)=>{await nl(il(t),e)},Ny=async t=>{await Eh(il(t))},Rh=async t=>{const e=await sl(il(t));return e.exists()?e.val():null},Ay=t=>{const e=Gi(Yr(),n=>{const s=n.val()||{};t(s)});return()=>zi(Yr(),"value",e)},xs=t=>At(kt,`rooms/${t}`),ky=async(t,e)=>{await _n(xs(t),e)},Py=async(t,e)=>{await nl(xs(t),e)},Qr=async t=>{const e=await sl(xs(t));return e.exists()?e.val():null},Oy=(t,e)=>{const n=Gi(xs(t),s=>{const i=s.exists()?s.val():null;e(i)});return()=>zi(xs(t),"value",n)},xh=(t,e)=>At(kt,`rooms/${t}/players/${e}`),Nh=async(t,e,n)=>{await _n(xh(t,e),n)},Fa=async(t,e,n)=>{await nl(xh(t,e),n)},Dy=(t,e)=>At(kt,`rooms/${t}/answers/${e}`),My=async(t,e,n)=>{await _n(Dy(t,e),n)},Ly=()=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",e="0123456789";let n="";for(let s=0;s<3;s++)n+=t[Math.floor(Math.random()*t.length)];for(let s=0;s<2;s++)n+=e[Math.floor(Math.random()*e.length)];return n},$a=()=>At(kt,"rankings"),Ah=t=>At(kt,`rankings/${t}`),Fy=t=>t?t.trim().toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"").replace(/_+/g,"_").replace(/^_|_$/g,""):"",$y=async(t,e)=>{const n=Ah(t),s=await Uy(t),i={...(s==null?void 0:s.players)||{}};Object.entries(e).forEach(([r,o])=>{const l=(o.name||"").trim();if(!l)return;const a=Fy(l);if(!a)return;const c=Number(o.score)||0,u=i[a];if(u){const h=Number(u.totalScore)||0,d=Number(u.gamesPlayed)||0,_=Number(u.bestScore)||0;i[a]={...u,name:l,totalScore:h+c,gamesPlayed:d+1,bestScore:Math.max(_,c),lastScore:c,lastPlayed:Date.now()}}else i[a]={name:l,totalScore:c,gamesPlayed:1,bestScore:c,lastScore:c,lastPlayed:Date.now()}}),await _n(n,{players:i,lastUpdated:Date.now()})},Uy=async t=>{const e=await sl(Ah(t));return e.exists()?e.val():null},By=t=>{const e=Gi($a(),n=>{const s=n.val()||{};t(s)});return()=>zi($a(),"value",e)},Ua=t=>At(kt,`leaderboards/${t}`),kh=(t,e)=>At(kt,`leaderboards/${t}/${e}`),Hy=()=>{const t=new Date,e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),i=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`session_${e}${n}${s}_${i}${r}${o}`},Wy=async(t,e,n)=>{await _n(kh(t,e),n)},Vy=(t,e)=>{const n=Gi(Ua(t),s=>{const i=s.exists()?s.val():{};e(i)});return()=>zi(Ua(t),"value",n)},jy=async(t,e)=>{await Eh(kh(t,e))},lt={token:"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",repo:"hoabinhgroup/crossword-game",branch:"main"};function Ky(t){return new Promise((e,n)=>{const s=new FileReader;s.onloadend=()=>e(s.result),s.onerror=n,s.readAsDataURL(t)})}const Gy=async(t,e="images/")=>{var n;try{if(lt.token,t.size>10*1024*1024)throw new Error("Hình ảnh quá lớn! Vui lòng chọn file nhỏ hơn 10MB");const s=Date.now(),i=Math.random().toString(36).substring(2,15),r=`${s}_${i}_${t.name}`,o=`${e}${r}`,a=(await Ky(t)).split(",")[1],c=`https://api.github.com/repos/${lt.repo}/contents/${o}`,u=await fetch(c,{method:"PUT",headers:{Authorization:`token ${lt.token}`,"Content-Type":"application/json",Accept:"application/vnd.github.v3+json"},body:JSON.stringify({message:`Upload image: ${t.name}`,content:a,branch:lt.branch})});if(!u.ok){const d=await u.json().catch(()=>({}));if(u.status===422&&((n=d.message)!=null&&n.includes("already exists"))){const _=await fetch(`https://api.github.com/repos/${lt.repo}/contents/${o}`,{headers:{Authorization:`token ${lt.token}`,Accept:"application/vnd.github.v3+json"}});if(_.ok){const v=await _.json(),I=await fetch(c,{method:"PUT",headers:{Authorization:`token ${lt.token}`,"Content-Type":"application/json",Accept:"application/vnd.github.v3+json"},body:JSON.stringify({message:`Update image: ${t.name}`,content:a,sha:v.sha,branch:lt.branch})});if(!I.ok){const H=await I.json().catch(()=>({}));throw new Error(H.message||"Không thể cập nhật hình ảnh")}}else throw new Error(d.message||"Không thể upload hình ảnh")}else throw new Error(d.message||"Không thể upload hình ảnh")}return`https://cdn.jsdelivr.net/gh/${lt.repo}@${lt.branch}/${o}`}catch(s){throw console.error("Error uploading image to GitHub:",s),new Error("Không thể upload hình ảnh: "+s.message)}},Ph=()=>"player_"+Date.now()+"_"+Math.random().toString(36).substr(2,9),Ba=(t=10)=>t,Oh=t=>{const e=Math.floor(t/60),n=t%60;return`${e}:${n.toString().padStart(2,"0")}`},zy={class:"container"},qy={key:0,class:"form-group"},Yy=["onUpdate:modelValue","placeholder"],Qy=["onUpdate:modelValue","placeholder"],Xy={class:"image-upload-section"},Jy={class:"image-upload-label"},Zy=["onChange","id"],eb={key:0,class:"image-preview"},tb=["src"],nb=["onClick"],sb={key:1,class:"upload-status"},ib=["onClick"],rb={class:"btn-group"},ob={key:1},lb={key:2,class:"loading"},ab={key:3,class:"empty-state"},cb={key:4,class:"batch-list"},ub={style:{color:"#666","font-size":"14px"}},hb={key:0,style:{"margin-left":"12px",color:"#667eea"}},db={class:"batch-actions"},fb=["onClick"],pb=["onClick"],_b=["onClick"],gb=["onClick"],mb={style:{display:"flex","justify-content":"space-between","align-items":"center","margin-bottom":"20px"}},vb={class:"sessions-list"},yb={key:0,class:"empty-state"},bb={key:1},Cb={style:{display:"flex","justify-content":"space-between","align-items":"start","margin-bottom":"12px"}},Eb={style:{margin:"0 0 4px 0",color:"#333"}},wb={style:{margin:"0",color:"#666","font-size":"14px"}},Sb=["onClick"],Tb={class:"leaderboard",style:{margin:"0"}},Ib={style:{display:"flex","align-items":"center",gap:"12px"}},Rb={class:"rank"},xb={class:"player-name"},Nb={style:{"text-align":"right"}},Ab={class:"player-score"},kb={style:{"font-size":"12px",color:"#666"}},Pb={class:"btn-group",style:{"margin-top":"20px"}},Ob={__name:"Dashboard",emits:["create-room","join-room"],setup(t,{emit:e}){const n=e,s=te({}),i=te({}),r=te(!0),o=te(!1),l=te(null),a=te(!1),c=te(null),u=te(""),h=te({});let d=null;const _=te({title:"",words:[{clue:"",answer:"",imageUrl:"",imagePreview:"",uploading:!1}]});let v=null,I=null;Ni(()=>{v=Ay(F=>{s.value=F,r.value=!1}),I=By(F=>{i.value=F})}),Ai(()=>{v&&v(),I&&I(),d&&d()});const H=()=>{_.value={title:"",words:[{clue:"",answer:"",imageUrl:"",imagePreview:"",uploading:!1}]},l.value=null,o.value=!0},$=()=>{o.value=!1,l.value=null,_.value={title:"",words:[{clue:"",answer:"",imageUrl:"",imagePreview:"",uploading:!1}]}},J=()=>{_.value.words.push({clue:"",answer:"",imageUrl:"",imagePreview:"",uploading:!1})},Y=F=>{_.value.words.splice(F,1)},O=async(F,N)=>{const S=F.target.files[0];if(!S)return;if(S.size>5*1024*1024){alert("Hình ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB");return}if(!S.type.startsWith("image/")){alert("Vui lòng chọn file hình ảnh");return}const P=_.value.words[N];P.uploading=!0;try{const U=new FileReader;U.onload=gt=>{P.imagePreview=gt.target.result},U.readAsDataURL(S);const ye=await Gy(S,"word-images/");P.imageUrl=ye,P.uploading=!1}catch(U){alert("Lỗi upload hình ảnh: "+U.message),P.uploading=!1,P.imagePreview="",P.imageUrl="";const ye=document.getElementById(`image-input-${N}`);ye&&(ye.value="")}},A=F=>{const N=_.value.words[F];N.imageUrl="",N.imagePreview="";const S=document.getElementById(`image-input-${F}`);S&&(S.value="")},L=async()=>{if(!_.value.title.trim()){alert("Vui lòng nhập tên đợt học");return}const F=_.value.words.filter(N=>N.clue.trim()&&N.answer.trim()).reduce((N,S,P)=>(N[`w${P+1}`]={clue:S.clue.trim(),answer:S.answer.trim().toLowerCase(),...S.imageUrl&&{imageUrl:S.imageUrl}},N),{});if(Object.keys(F).length===0){alert("Vui lòng thêm ít nhất một từ vựng");return}try{const N={title:_.value.title.trim(),words:F};l.value?await xy(l.value,N):await Ry(N),$()}catch(N){alert("Lỗi: "+N.message)}},D=(F,N)=>{l.value=F,_.value={title:N.title,words:Object.values(N.words||{}).map(S=>({clue:S.clue,answer:S.answer,imageUrl:S.imageUrl||"",imagePreview:S.imageUrl||"",uploading:!1}))},_.value.words.length===0&&(_.value.words=[{clue:"",answer:"",imageUrl:"",imagePreview:"",uploading:!1}]),o.value=!0},M=async F=>{if(confirm("Bạn có chắc muốn xóa đợt học này?"))try{await Ny(F)}catch(N){alert("Lỗi: "+N.message)}},_e=F=>{n("create-room",F)},ce=async F=>{var N;c.value=F,u.value=((N=s.value[F])==null?void 0:N.title)||"",a.value=!0,d&&d(),d=Vy(F,S=>{h.value=S||{}})},Ce=_s(()=>Object.entries(h.value).sort(([,F],[,N])=>{const S=F.createdAt||"";return(N.createdAt||"").localeCompare(S)}).reduce((F,[N,S])=>(F[N]=S,F),{})),Re=F=>F?Object.entries(F).sort(([,N],[,S])=>S.score-N.score).reduce((N,[S,P])=>(N[S]=P,N),{}):[],Se=async F=>{if(c.value&&confirm("Bạn có chắc muốn xóa session này?"))try{await jy(c.value,F)}catch(N){alert("Lỗi: "+N.message)}};return an(()=>a.value,F=>{!F&&d&&(d(),d=null)}),(F,N)=>(B(),j("div",zy,[N[11]||(N[11]=m("h1",null,"📚 Quản Lý Bài Học",-1)),o.value?(B(),j("div",qy,[m("h2",null,se(l.value?"Sửa Đợt Học":"Thêm Bài Học Mới"),1),N[7]||(N[7]=m("label",null,"Tên đợt học:",-1)),ln(m("input",{"onUpdate:modelValue":N[0]||(N[0]=S=>_.value.title=S),placeholder:"VD: Unit 1 - School Things"},null,512),[[cn,_.value.title]]),N[8]||(N[8]=m("label",null,"Từ vựng:",-1)),(B(!0),j(Ne,null,Dt(_.value.words,(S,P)=>(B(),j("div",{key:P,class:"word-item"},[ln(m("input",{"onUpdate:modelValue":U=>S.clue=U,placeholder:`Gợi ý ${P+1}`},null,8,Yy),[[cn,S.clue]]),ln(m("input",{"onUpdate:modelValue":U=>S.answer=U,placeholder:`Đáp án ${P+1}`,style:{"text-transform":"uppercase"}},null,8,Qy),[[cn,S.answer]]),m("div",Xy,[m("label",Jy,[m("input",{type:"file",accept:"image/*",onChange:U=>O(U,P),style:{display:"none"},id:`image-input-${P}`},null,40,Zy),N[6]||(N[6]=m("span",{class:"image-upload-btn"},"📷 Chọn hình ảnh",-1))]),S.imagePreview?(B(),j("div",eb,[m("img",{src:S.imagePreview,alt:"Preview"},null,8,tb),m("button",{type:"button",class:"btn-small danger",onClick:U=>A(P),style:{"margin-top":"8px"}}," Xóa ảnh ",8,nb)])):ut("",!0),S.uploading?(B(),j("div",sb," ⏳ Đang upload... ")):ut("",!0)]),m("button",{class:"btn-small danger",onClick:U=>Y(P)},"Xóa từ",8,ib)]))),128)),m("button",{class:"secondary",onClick:J},"+ Thêm từ"),m("div",rb,[m("button",{onClick:L},se(l.value?"Cập nhật":"Lưu"),1),m("button",{class:"secondary",onClick:$},"Hủy")])])):(B(),j("div",ob,[m("button",{onClick:H},"+ Thêm Bài Học Mới"),m("button",{class:"secondary",onClick:N[1]||(N[1]=S=>F.$emit("join-room")),style:{"margin-top":"10px"}}," 🎮 Tham Gia Phòng ")])),r.value?(B(),j("div",lb,"Đang tải...")):Object.keys(s.value).length===0?(B(),j("div",ab,[...N[9]||(N[9]=[m("div",{class:"empty-state-icon"},"📝",-1),m("p",null,"Chưa có đợt học nào. Hãy thêm đợt học đầu tiên!",-1)])])):(B(),j("ul",cb,[(B(!0),j(Ne,null,Dt(s.value,(S,P)=>(B(),j("li",{key:P,class:"batch-item"},[m("div",null,[m("h3",null,se(S.title),1),m("p",ub,[mo(se(Object.keys(S.words||{}).length)+" từ vựng ",1),i.value[P]?(B(),j("span",hb," • "+se(Object.keys(i.value[P].players||{}).length)+" người chơi ",1)):ut("",!0)])]),m("div",db,[i.value[P]?(B(),j("button",{key:0,class:"btn-small",onClick:U=>ce(P)}," 🏆 Xếp hạng ",8,fb)):ut("",!0),m("button",{class:"btn-small success",onClick:U=>_e(P)},"Tạo phòng",8,pb),m("button",{class:"btn-small",onClick:U=>D(P,S)},"Sửa",8,_b),m("button",{class:"btn-small danger",onClick:U=>M(P)},"Xóa",8,gb)])]))),128))])),a.value?(B(),j("div",{key:5,class:"modal-overlay",onClick:N[5]||(N[5]=S=>a.value=!1)},[m("div",{class:"modal-content",onClick:N[4]||(N[4]=ep(()=>{},["stop"]))},[m("div",mb,[m("h2",null,"🏆 Xếp Hạng: "+se(u.value),1),m("button",{class:"btn-small secondary",onClick:N[2]||(N[2]=S=>a.value=!1)},"✕")]),m("div",vb,[Object.keys(h.value).length===0?(B(),j("div",yb,[...N[10]||(N[10]=[m("p",null,"Chưa có session nào",-1)])])):(B(),j("div",bb,[(B(!0),j(Ne,null,Dt(Ce.value,(S,P)=>(B(),j("div",{key:P,class:"session-item",style:{background:"#f8f9fa",padding:"16px","border-radius":"8px","margin-bottom":"12px","border-left":"4px solid #667eea"}},[m("div",Cb,[m("div",null,[m("h4",Eb,se(S.createdAt),1),m("p",wb," Thời gian: "+se(ho(Oh)(S.duration||0)),1)]),m("button",{class:"btn-small danger",onClick:U=>Se(P),style:{margin:"0"}}," Xóa ",8,Sb)]),m("ul",Tb,[(B(!0),j(Ne,null,Dt(Re(S.players),(U,ye,gt)=>(B(),j("li",{key:ye,class:rn(["leaderboard-item",`rank-${Math.min(gt+1,3)}`]),style:{"margin-bottom":"8px"}},[m("div",Ib,[m("span",Rb,"#"+se(gt+1),1),m("span",xb,se(U.name),1)]),m("div",Nb,[m("span",Ab,se(U.score)+" điểm",1),m("div",kb,se(U.correct)+" câu đúng",1)])],2))),128))])]))),128))])),m("div",Pb,[m("button",{class:"secondary",onClick:N[3]||(N[3]=S=>a.value=!1)},"Đóng")])])])])):ut("",!0)]))}},Db={class:"container"},Mb={key:0,class:"loading"},Lb={key:1},Fb={class:"room-code"},$b={class:"form-group"},Ub=["disabled"],Bb={key:2},Hb={__name:"CreateRoom",props:{batchId:{type:String,required:!0}},emits:["back","room-created"],setup(t,{emit:e}){const n=t,s=e,i=te(!1),r=te(null),o=te(null),l=te(""),a=te(null);Ni(async()=>{try{o.value=await Rh(n.batchId),o.value||(alert("Không tìm thấy đợt học"),s("back"))}catch(h){alert("Lỗi: "+h.message),s("back")}});const c=async()=>{if(o.value){i.value=!0;try{const h=Ly(),d=Ph();a.value=d;const _=Hy(),v={batchId:n.batchId,hostId:d,sessionId:_,players:{},answers:{},createdAt:Date.now(),sessionStartTime:Date.now()};Object.keys(o.value.words).forEach(I=>{v.answers[I]=null}),await ky(h,v),r.value=h,i.value=!1}catch(h){alert("Lỗi: "+h.message),i.value=!1}}},u=async()=>{if(!(!r.value||!l.value.trim()||!a.value))try{await Nh(r.value,a.value,{name:l.value.trim(),score:0}),s("room-created",r.value,a.value)}catch(h){alert("Lỗi: "+h.message)}};return(h,d)=>(B(),j("div",Db,[d[5]||(d[5]=m("h1",null,"🎮 Tạo Phòng Chơi",-1)),i.value?(B(),j("div",Mb,"Đang tạo phòng...")):r.value?(B(),j("div",Lb,[m("div",Fb,se(r.value),1),d[4]||(d[4]=m("p",{style:{"text-align":"center","margin-bottom":"20px"}}," Chia sẻ mã phòng này với người chơi! ",-1)),m("div",$b,[d[3]||(d[3]=m("label",null,"Tên của bạn (Host):",-1)),ln(m("input",{"onUpdate:modelValue":d[0]||(d[0]=_=>l.value=_),placeholder:"Nhập tên của bạn",maxlength:"20"},null,512),[[cn,l.value]])]),m("button",{onClick:u,disabled:!l.value.trim()},"Vào phòng",8,Ub),m("button",{class:"secondary",onClick:d[1]||(d[1]=_=>h.$emit("back"))},"Quay lại")])):(B(),j("div",Bb,[m("button",{onClick:c},"Tạo phòng mới"),m("button",{class:"secondary",onClick:d[2]||(d[2]=_=>h.$emit("back"))},"Quay lại")]))]))}},Wb={class:"container"},Vb={class:"form-group"},jb={class:"form-group"},Kb=["disabled"],Gb={key:0,class:"error"},zb={__name:"JoinRoom",emits:["back","joined"],setup(t,{emit:e}){const n=e,s=te(""),i=te(""),r=te(""),o=_s(()=>s.value.length===5&&i.value.trim().length>0),l=async()=>{if(!o.value)return;r.value="";const a=s.value.toUpperCase();try{if(!await Qr(a)){r.value="Không tìm thấy phòng với mã này";return}const u=Ph();await Nh(a,u,{name:i.value.trim(),score:0}),n("joined",a,u)}catch(c){r.value="Lỗi: "+c.message}};return(a,c)=>(B(),j("div",Wb,[c[5]||(c[5]=m("h1",null,"🎮 Tham Gia Phòng",-1)),m("div",Vb,[c[3]||(c[3]=m("label",null,"Mã phòng:",-1)),ln(m("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>s.value=u),placeholder:"Nhập mã phòng (VD: ABC12)",style:{"text-transform":"uppercase","text-align":"center","font-size":"24px","letter-spacing":"4px"},maxlength:"5"},null,512),[[cn,s.value]])]),m("div",jb,[c[4]||(c[4]=m("label",null,"Tên của bạn:",-1)),ln(m("input",{"onUpdate:modelValue":c[1]||(c[1]=u=>i.value=u),placeholder:"Nhập tên của bạn",maxlength:"20"},null,512),[[cn,i.value]])]),m("button",{onClick:l,disabled:!o.value},"Tham gia",8,Kb),m("button",{class:"secondary",onClick:c[2]||(c[2]=u=>a.$emit("back"))},"Quay lại"),r.value?(B(),j("div",Gb,se(r.value),1)):ut("",!0)]))}},qb={class:"container"},Yb={key:0,class:"loading"},Qb={key:1,class:"error"},Xb={key:2},Jb={style:{display:"flex","justify-content":"space-between","align-items":"center","margin-bottom":"16px"}},Zb={class:"room-code",style:{"font-size":"20px",padding:"8px 16px",margin:"0"}},eC={class:"container",style:{"margin-bottom":"20px"}},tC={class:"leaderboard"},nC={style:{display:"flex","align-items":"center",gap:"12px"}},sC={class:"rank"},iC={class:"player-name"},rC={class:"player-score"},oC={key:0,class:"container"},lC={class:"summary-table"},aC={key:0},cC={key:1,style:{color:"#999"}},uC={style:{"text-align":"center","margin-top":"16px",color:"#666"}},hC={key:1},dC={class:"question-list"},fC={class:"question-clue"},pC={key:0,class:"question-image"},_C=["src","alt"],gC={key:0,class:"answer-status correct"},mC={class:"answered-by"},vC={key:1},yC={class:"answer-input"},bC=["onUpdate:modelValue","placeholder","maxlength","onKeyup","disabled"],CC=["onClick"],EC={class:"container",style:{"margin-top":"20px"}},wC={class:"player-list"},SC={class:"player-name"},TC={class:"player-score"},IC={__name:"GameRoom",props:{roomCode:{type:String,required:!0},playerId:{type:String,required:!0},isHost:{type:Boolean,default:!1}},emits:["back"],setup(t,{emit:e}){const n=t,s=te(!0),i=te(null),r=te(null),o=te({}),l=te({}),a=te(0),c=te(null),u=te(null);let h=null,d=null;const _=_s(()=>{var A;return(A=i.value)!=null&&A.players?Object.entries(i.value.players).sort(([,L],[,D])=>D.score-L.score).reduce((L,[D,M])=>(L[D]=M,L),{}):[]}),v=_s(()=>{if(!i.value||!r.value||!r.value.words||!i.value.answers)return!1;const A=Object.keys(r.value.words);return A.length===0?!1:A.every(L=>{var D,M;return(M=(D=i.value.answers)==null?void 0:D[L])==null?void 0:M.correct})}),I=te(!1),H=te(null);an(()=>v.value,async A=>{if(A&&i.value&&i.value.batchId){const L=`${i.value.batchId}_${n.roomCode}`;if(I.value&&H.value===L)return;try{if(await $y(i.value.batchId,i.value.players||{}),c.value&&u.value){const D=Math.floor((Date.now()-u.value)/1e3),M=new Date,_e=`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}-${String(M.getDate()).padStart(2,"0")} ${String(M.getHours()).padStart(2,"0")}:${String(M.getMinutes()).padStart(2,"0")}:${String(M.getSeconds()).padStart(2,"0")}`,ce={};Object.entries(i.value.players||{}).forEach(([Ce,Re])=>{let Se=0;Object.values(i.value.answers||{}).forEach(F=>{F!=null&&F.correct&&(F==null?void 0:F.answeredBy)===Ce&&Se++}),ce[Ce]={name:Re.name,score:Re.score||0,correct:Se}}),await Wy(i.value.batchId,c.value,{createdAt:_e,players:ce,duration:D})}I.value=!0,H.value=L}catch(D){console.error("Error saving ranking:",D)}}}),an(()=>n.roomCode,()=>{I.value=!1,H.value=null,$.value.clear(),c.value=null,u.value=null});const $=te(new Set);an(()=>{var A;return(A=i.value)==null?void 0:A.answers},async(A,L)=>{!A||!i.value||Object.entries(A).forEach(async([D,M])=>{var Se,F,N;if(!(M!=null&&M.correct)||!(M!=null&&M.answeredBy))return;const _e=`${D}_${M.answeredBy}`;if($.value.has(_e))return;$.value.add(_e);const ce=M.answeredBy;let Ce=((F=(Se=i.value.players)==null?void 0:Se[ce])==null?void 0:F.score)||0;try{const S=await Qr(n.roomCode);(N=S==null?void 0:S.players)!=null&&N[ce]&&(Ce=S.players[ce].score||0)}catch(S){console.warn("Could not fetch latest room data for score update:",S)}const Re=Ba(10);try{await Fa(n.roomCode,ce,{score:Ce+Re})}catch(S){console.error("Error updating score for answered player:",S),$.value.delete(_e)}})},{deep:!0}),Ni(async()=>{d=Oy(n.roomCode,async A=>{if(i.value=A,A&&!r.value)try{r.value=await Rh(A.batchId),s.value=!1,r.value&&r.value.words&&Object.keys(r.value.words).forEach(L=>{o.value[L]=""}),A.answers&&Object.entries(A.answers).forEach(([L,D])=>{if(D!=null&&D.correct&&(D!=null&&D.answeredBy)){const M=`${L}_${D.answeredBy}`;$.value.add(M)}}),!c.value&&A.sessionId&&(c.value=A.sessionId,u.value=A.sessionStartTime||Date.now()),h&&clearInterval(h),h=setInterval(()=>{a.value++},1e3)}catch(L){console.error("Error loading batch:",L)}else A||(s.value=!1)})}),Ai(()=>{d&&d(),h&&clearInterval(h)});const J=async(A,L)=>{var _e,ce,Ce,Re,Se,F,N;const D=(_e=o.value[A])==null?void 0:_e.trim().toLowerCase();if(!D){l.value[A]={correct:!1,message:"Vui lòng nhập đáp án"};return}if((Ce=(ce=i.value.answers)==null?void 0:ce[A])!=null&&Ce.correct)return;if(D===L.toLowerCase())try{const S=`${A}_${n.playerId}`;$.value.add(S),await My(n.roomCode,A,{answeredBy:n.playerId,correct:!0,timestamp:Date.now()});let P=0;try{const ye=await Qr(n.roomCode);(Re=ye==null?void 0:ye.players)!=null&&Re[n.playerId]&&(P=ye.players[n.playerId].score||0)}catch(ye){P=((N=(F=(Se=i.value)==null?void 0:Se.players)==null?void 0:F[n.playerId])==null?void 0:N.score)||0,console.warn("Could not fetch latest room data, using cached value:",ye)}const U=Ba(10);await Fa(n.roomCode,n.playerId,{score:P+U}),l.value[A]=null,o.value[A]=""}catch(S){const P=`${A}_${n.playerId}`;$.value.delete(P),l.value[A]={correct:!1,message:"Lỗi: "+S.message}}else l.value[A]={correct:!1,message:"❌ Sai rồi! Hãy thử lại."},setTimeout(()=>{l.value[A]=null},2e3)},Y=A=>{var L,D;return((D=(L=i.value)==null?void 0:L.players[A])==null?void 0:D.name)||"Unknown"},O=async()=>{if(!confirm("Bắt đầu vòng chơi mới? Điểm số sẽ được reset."))return;const A={answers:{},players:{}};Object.keys(i.value.players).forEach(L=>{A.players[L]={...i.value.players[L],score:0}}),r.value&&r.value.words&&Object.keys(r.value.words).forEach(L=>{A.answers[L]=null});try{await Py(n.roomCode,A),a.value=0,o.value={},l.value={},$.value.clear()}catch(L){alert("Lỗi: "+L.message)}};return(A,L)=>(B(),j("div",qb,[s.value?(B(),j("div",Yb,"Đang tải...")):!i.value||!r.value||!r.value.words?(B(),j("div",Qb,"Không tìm thấy phòng hoặc đợt học")):(B(),j("div",Xb,[m("div",Jb,[m("h1",null,se(r.value.title),1),m("div",Zb,se(t.roomCode),1)]),m("div",eC,[L[2]||(L[2]=m("h2",null,"🏆 Bảng Xếp Hạng",-1)),m("ul",tC,[(B(!0),j(Ne,null,Dt(_.value,(D,M,_e)=>(B(),j("li",{key:M,class:rn(["leaderboard-item",`rank-${_e+1}`])},[m("div",nC,[m("span",sC,"#"+se(_e+1),1),m("span",iC,se(D.name),1)]),m("span",rC,se(D.score)+" điểm",1)],2))),128))])]),v.value?(B(),j("div",oC,[L[4]||(L[4]=m("h2",null,"🎉 Kết Thúc Trò Chơi!",-1)),L[5]||(L[5]=m("div",{class:"success-message"}," Tất cả câu hỏi đã được giải! ",-1)),m("table",lC,[L[3]||(L[3]=m("thead",null,[m("tr",null,[m("th",null,"Câu hỏi"),m("th",null,"Người trả lời")])],-1)),m("tbody",null,[(B(!0),j(Ne,null,Dt(r.value.words,(D,M)=>{var _e,ce;return B(),j("tr",{key:M},[m("td",null,se(D.clue),1),m("td",null,[(_e=i.value.answers)!=null&&_e[M]?(B(),j("span",aC,se(Y((ce=i.value.answers[M])==null?void 0:ce.answeredBy)),1)):(B(),j("span",cC,"Chưa có"))])])}),128))])]),m("p",uC," Thời gian: "+se(ho(Oh)(a.value)),1),t.isHost?(B(),j("button",{key:0,onClick:O},"Bắt đầu vòng mới")):ut("",!0),m("button",{class:"secondary",onClick:L[0]||(L[0]=D=>A.$emit("back"))},"Quay lại")])):(B(),j("div",hC,[L[6]||(L[6]=m("h2",null,"📝 Câu Hỏi",-1)),m("ul",dC,[(B(!0),j(Ne,null,Dt(r.value.words,(D,M)=>{var _e,ce,Ce,Re,Se,F,N,S,P;return B(),j("li",{key:M,class:rn(["question-item",{solved:(ce=(_e=i.value.answers)==null?void 0:_e[M])==null?void 0:ce.correct,locked:(Re=(Ce=i.value.answers)==null?void 0:Ce[M])==null?void 0:Re.correct}])},[m("div",fC,[D.imageUrl?(B(),j("div",pC,[m("img",{src:D.imageUrl,alt:D.clue},null,8,_C)])):ut("",!0),m("div",null,se(D.clue),1)]),(F=(Se=i.value.answers)==null?void 0:Se[M])!=null&&F.correct?(B(),j("div",gC,[mo(" ✅ Đã giải! Đáp án: "+se(D.answer.toUpperCase())+" ",1),m("div",mC," Trả lời bởi: "+se(Y((N=i.value.answers[M])==null?void 0:N.answeredBy)),1)])):(B(),j("div",vC,[m("div",yC,[ln(m("input",{"onUpdate:modelValue":U=>o.value[M]=U,placeholder:"_".repeat(D.answer.length),maxlength:D.answer.length,onKeyup:np(U=>J(M,D.answer),["enter"]),disabled:(P=(S=i.value.answers)==null?void 0:S[M])==null?void 0:P.correct},null,40,bC),[[cn,o.value[M]]]),m("button",{onClick:U=>J(M,D.answer)},"Gửi",8,CC)]),l.value[M]?(B(),j("div",{key:0,class:rn(["answer-status",l.value[M].correct?"correct":"incorrect"])},se(l.value[M].message),3)):ut("",!0)]))],2)}),128))])])),m("div",EC,[m("h3",null,"👥 Người Chơi ("+se(Object.keys(i.value.players||{}).length)+")",1),m("ul",wC,[(B(!0),j(Ne,null,Dt(i.value.players,(D,M)=>(B(),j("li",{key:M,class:"player-item"},[m("span",SC,se(D.name),1),m("span",TC,se(D.score)+" điểm",1)]))),128))])]),m("button",{class:"secondary",onClick:L[1]||(L[1]=D=>A.$emit("back")),style:{"margin-top":"20px"}}," Rời phòng ")]))]))}},RC={id:"app"},xC={__name:"App",setup(t){const e=te("dashboard"),n=te(null),s=te(null),i=te(null),r=te(!1),o=u=>{n.value=u,e.value="create-room"},l=(u,h)=>{s.value=u,i.value=h,r.value=!0,e.value="game-room"},a=(u,h)=>{s.value=u,i.value=h,r.value=!1,e.value="game-room"},c=()=>{s.value=null,i.value=null,r.value=!1,e.value="dashboard"};return(u,h)=>(B(),j("div",RC,[e.value==="dashboard"?(B(),Xn(Ob,{key:0,onCreateRoom:o,onJoinRoom:h[0]||(h[0]=d=>e.value="join-room")})):e.value==="create-room"?(B(),Xn(Hb,{key:1,"batch-id":n.value,onBack:h[1]||(h[1]=d=>e.value="dashboard"),onRoomCreated:l},null,8,["batch-id"])):e.value==="join-room"?(B(),Xn(zb,{key:2,onBack:h[2]||(h[2]=d=>e.value="dashboard"),onJoined:a})):e.value==="game-room"?(B(),Xn(IC,{key:3,"room-code":s.value,"player-id":i.value,"is-host":r.value,onBack:c},null,8,["room-code","player-id","is-host"])):ut("",!0)]))}};rp(xC).mount("#app");
