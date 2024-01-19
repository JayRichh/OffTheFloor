(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function makeMap(e,t){const n=new Set(e.split(","));return t?r=>n.has(r.toLowerCase()):r=>n.has(r)}const EMPTY_OBJ={},EMPTY_ARR=[],NOOP=()=>{},NO=()=>!1,isOn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),isModelListener=e=>e.startsWith("onUpdate:"),extend=Object.assign,remove$1=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},hasOwnProperty$1=Object.prototype.hasOwnProperty,hasOwn=(e,t)=>hasOwnProperty$1.call(e,t),isArray$1=Array.isArray,isMap=e=>toTypeString(e)==="[object Map]",isSet=e=>toTypeString(e)==="[object Set]",isFunction=e=>typeof e=="function",isString=e=>typeof e=="string",isSymbol=e=>typeof e=="symbol",isObject=e=>e!==null&&typeof e=="object",isPromise=e=>(isObject(e)||isFunction(e))&&isFunction(e.then)&&isFunction(e.catch),objectToString=Object.prototype.toString,toTypeString=e=>objectToString.call(e),toRawType=e=>toTypeString(e).slice(8,-1),isPlainObject=e=>toTypeString(e)==="[object Object]",isIntegerKey=e=>isString(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,isReservedProp=makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),cacheStringFunction=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},camelizeRE=/-(\w)/g,camelize=cacheStringFunction(e=>e.replace(camelizeRE,(t,n)=>n?n.toUpperCase():"")),hyphenateRE=/\B([A-Z])/g,hyphenate=cacheStringFunction(e=>e.replace(hyphenateRE,"-$1").toLowerCase()),capitalize=cacheStringFunction(e=>e.charAt(0).toUpperCase()+e.slice(1)),toHandlerKey=cacheStringFunction(e=>e?`on${capitalize(e)}`:""),hasChanged=(e,t)=>!Object.is(e,t),invokeArrayFns=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},def=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},looseToNumber=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let _globalThis;const getGlobalThis=()=>_globalThis||(_globalThis=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function normalizeStyle(e){if(isArray$1(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=isString(r)?parseStringStyle(r):normalizeStyle(r);if(s)for(const o in s)t[o]=s[o]}return t}else if(isString(e)||isObject(e))return e}const listDelimiterRE=/;(?![^(]*\))/g,propertyDelimiterRE=/:([^]+)/,styleCommentRE=/\/\*[^]*?\*\//g;function parseStringStyle(e){const t={};return e.replace(styleCommentRE,"").split(listDelimiterRE).forEach(n=>{if(n){const r=n.split(propertyDelimiterRE);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function normalizeClass(e){let t="";if(isString(e))t=e;else if(isArray$1(e))for(let n=0;n<e.length;n++){const r=normalizeClass(e[n]);r&&(t+=r+" ")}else if(isObject(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const specialBooleanAttrs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",isSpecialBooleanAttr=makeMap(specialBooleanAttrs);function includeBooleanAttr(e){return!!e||e===""}const toDisplayString=e=>isString(e)?e:e==null?"":isArray$1(e)||isObject(e)&&(e.toString===objectToString||!isFunction(e.toString))?JSON.stringify(e,replacer,2):String(e),replacer=(e,t)=>t&&t.__v_isRef?replacer(e,t.value):isMap(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],o)=>(n[stringifySymbol(r,o)+" =>"]=s,n),{})}:isSet(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>stringifySymbol(n))}:isSymbol(t)?stringifySymbol(t):isObject(t)&&!isArray$1(t)&&!isPlainObject(t)?String(t):t,stringifySymbol=(e,t="")=>{var n;return isSymbol(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let activeEffectScope;class EffectScope{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=activeEffectScope,!t&&activeEffectScope&&(this.index=(activeEffectScope.scopes||(activeEffectScope.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=activeEffectScope;try{return activeEffectScope=this,t()}finally{activeEffectScope=n}}}on(){activeEffectScope=this}off(){activeEffectScope=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function recordEffectScope(e,t=activeEffectScope){t&&t.active&&t.effects.push(e)}function getCurrentScope(){return activeEffectScope}let activeEffect;class ReactiveEffect{constructor(t,n,r,s){this.fn=t,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,recordEffectScope(this,s)}get dirty(){if(this._dirtyLevel===1){pauseTracking();for(let t=0;t<this._depsLength;t++){const n=this.deps[t];if(n.computed&&(triggerComputed(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),resetTracking()}return this._dirtyLevel>=2}set dirty(t){this._dirtyLevel=t?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=shouldTrack,n=activeEffect;try{return shouldTrack=!0,activeEffect=this,this._runnings++,preCleanupEffect(this),this.fn()}finally{postCleanupEffect(this),this._runnings--,activeEffect=n,shouldTrack=t}}stop(){var t;this.active&&(preCleanupEffect(this),postCleanupEffect(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function triggerComputed(e){return e.value}function preCleanupEffect(e){e._trackId++,e._depsLength=0}function postCleanupEffect(e){if(e.deps&&e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)cleanupDepEffect(e.deps[t],e);e.deps.length=e._depsLength}}function cleanupDepEffect(e,t){const n=e.get(t);n!==void 0&&t._trackId!==n&&(e.delete(t),e.size===0&&e.cleanup())}let shouldTrack=!0,pauseScheduleStack=0;const trackStack=[];function pauseTracking(){trackStack.push(shouldTrack),shouldTrack=!1}function resetTracking(){const e=trackStack.pop();shouldTrack=e===void 0?!0:e}function pauseScheduling(){pauseScheduleStack++}function resetScheduling(){for(pauseScheduleStack--;!pauseScheduleStack&&queueEffectSchedulers.length;)queueEffectSchedulers.shift()()}function trackEffect(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const r=e.deps[e._depsLength];r!==t?(r&&cleanupDepEffect(r,e),e.deps[e._depsLength++]=t):e._depsLength++}}const queueEffectSchedulers=[];function triggerEffects(e,t,n){pauseScheduling();for(const r of e.keys())if(r._dirtyLevel<t&&e.get(r)===r._trackId){const s=r._dirtyLevel;r._dirtyLevel=t,s===0&&(r._shouldSchedule=!0,r.trigger())}scheduleEffects(e),resetScheduling()}function scheduleEffects(e){for(const t of e.keys())t.scheduler&&t._shouldSchedule&&(!t._runnings||t.allowRecurse)&&e.get(t)===t._trackId&&(t._shouldSchedule=!1,queueEffectSchedulers.push(t.scheduler))}const createDep=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},targetMap=new WeakMap,ITERATE_KEY=Symbol(""),MAP_KEY_ITERATE_KEY=Symbol("");function track(e,t,n){if(shouldTrack&&activeEffect){let r=targetMap.get(e);r||targetMap.set(e,r=new Map);let s=r.get(n);s||r.set(n,s=createDep(()=>r.delete(n))),trackEffect(activeEffect,s)}}function trigger(e,t,n,r,s,o){const i=targetMap.get(e);if(!i)return;let a=[];if(t==="clear")a=[...i.values()];else if(n==="length"&&isArray$1(e)){const c=Number(r);i.forEach((d,u)=>{(u==="length"||!isSymbol(u)&&u>=c)&&a.push(d)})}else switch(n!==void 0&&a.push(i.get(n)),t){case"add":isArray$1(e)?isIntegerKey(n)&&a.push(i.get("length")):(a.push(i.get(ITERATE_KEY)),isMap(e)&&a.push(i.get(MAP_KEY_ITERATE_KEY)));break;case"delete":isArray$1(e)||(a.push(i.get(ITERATE_KEY)),isMap(e)&&a.push(i.get(MAP_KEY_ITERATE_KEY)));break;case"set":isMap(e)&&a.push(i.get(ITERATE_KEY));break}pauseScheduling();for(const c of a)c&&triggerEffects(c,2);resetScheduling()}function getDepFromReactive(e,t){var n;return(n=targetMap.get(e))==null?void 0:n.get(t)}const isNonTrackableKeys=makeMap("__proto__,__v_isRef,__isVue"),builtInSymbols=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(isSymbol)),arrayInstrumentations=createArrayInstrumentations();function createArrayInstrumentations(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=toRaw(this);for(let o=0,i=this.length;o<i;o++)track(r,"get",o+"");const s=r[t](...n);return s===-1||s===!1?r[t](...n.map(toRaw)):s}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){pauseTracking(),pauseScheduling();const r=toRaw(this)[t].apply(this,n);return resetScheduling(),resetTracking(),r}}),e}function hasOwnProperty(e){const t=toRaw(this);return track(t,"has",e),t.hasOwnProperty(e)}class BaseReactiveHandler{constructor(t=!1,n=!1){this._isReadonly=t,this._shallow=n}get(t,n,r){const s=this._isReadonly,o=this._shallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return o;if(n==="__v_raw")return r===(s?o?shallowReadonlyMap:readonlyMap:o?shallowReactiveMap:reactiveMap).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const i=isArray$1(t);if(!s){if(i&&hasOwn(arrayInstrumentations,n))return Reflect.get(arrayInstrumentations,n,r);if(n==="hasOwnProperty")return hasOwnProperty}const a=Reflect.get(t,n,r);return(isSymbol(n)?builtInSymbols.has(n):isNonTrackableKeys(n))||(s||track(t,"get",n),o)?a:isRef(a)?i&&isIntegerKey(n)?a:a.value:isObject(a)?s?readonly(a):reactive(a):a}}class MutableReactiveHandler extends BaseReactiveHandler{constructor(t=!1){super(!1,t)}set(t,n,r,s){let o=t[n];if(!this._shallow){const c=isReadonly(o);if(!isShallow(r)&&!isReadonly(r)&&(o=toRaw(o),r=toRaw(r)),!isArray$1(t)&&isRef(o)&&!isRef(r))return c?!1:(o.value=r,!0)}const i=isArray$1(t)&&isIntegerKey(n)?Number(n)<t.length:hasOwn(t,n),a=Reflect.set(t,n,r,s);return t===toRaw(s)&&(i?hasChanged(r,o)&&trigger(t,"set",n,r):trigger(t,"add",n,r)),a}deleteProperty(t,n){const r=hasOwn(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&trigger(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!isSymbol(n)||!builtInSymbols.has(n))&&track(t,"has",n),r}ownKeys(t){return track(t,"iterate",isArray$1(t)?"length":ITERATE_KEY),Reflect.ownKeys(t)}}class ReadonlyReactiveHandler extends BaseReactiveHandler{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const mutableHandlers=new MutableReactiveHandler,readonlyHandlers=new ReadonlyReactiveHandler,shallowReactiveHandlers=new MutableReactiveHandler(!0),toShallow=e=>e,getProto=e=>Reflect.getPrototypeOf(e);function get(e,t,n=!1,r=!1){e=e.__v_raw;const s=toRaw(e),o=toRaw(t);n||(hasChanged(t,o)&&track(s,"get",t),track(s,"get",o));const{has:i}=getProto(s),a=r?toShallow:n?toReadonly:toReactive;if(i.call(s,t))return a(e.get(t));if(i.call(s,o))return a(e.get(o));e!==s&&e.get(t)}function has(e,t=!1){const n=this.__v_raw,r=toRaw(n),s=toRaw(e);return t||(hasChanged(e,s)&&track(r,"has",e),track(r,"has",s)),e===s?n.has(e):n.has(e)||n.has(s)}function size(e,t=!1){return e=e.__v_raw,!t&&track(toRaw(e),"iterate",ITERATE_KEY),Reflect.get(e,"size",e)}function add$1(e){e=toRaw(e);const t=toRaw(this);return getProto(t).has.call(t,e)||(t.add(e),trigger(t,"add",e,e)),this}function set(e,t){t=toRaw(t);const n=toRaw(this),{has:r,get:s}=getProto(n);let o=r.call(n,e);o||(e=toRaw(e),o=r.call(n,e));const i=s.call(n,e);return n.set(e,t),o?hasChanged(t,i)&&trigger(n,"set",e,t):trigger(n,"add",e,t),this}function deleteEntry(e){const t=toRaw(this),{has:n,get:r}=getProto(t);let s=n.call(t,e);s||(e=toRaw(e),s=n.call(t,e)),r&&r.call(t,e);const o=t.delete(e);return s&&trigger(t,"delete",e,void 0),o}function clear(){const e=toRaw(this),t=e.size!==0,n=e.clear();return t&&trigger(e,"clear",void 0,void 0),n}function createForEach(e,t){return function(r,s){const o=this,i=o.__v_raw,a=toRaw(i),c=t?toShallow:e?toReadonly:toReactive;return!e&&track(a,"iterate",ITERATE_KEY),i.forEach((d,u)=>r.call(s,c(d),c(u),o))}}function createIterableMethod(e,t,n){return function(...r){const s=this.__v_raw,o=toRaw(s),i=isMap(o),a=e==="entries"||e===Symbol.iterator&&i,c=e==="keys"&&i,d=s[e](...r),u=n?toShallow:t?toReadonly:toReactive;return!t&&track(o,"iterate",c?MAP_KEY_ITERATE_KEY:ITERATE_KEY),{next(){const{value:_,done:m}=d.next();return m?{value:_,done:m}:{value:a?[u(_[0]),u(_[1])]:u(_),done:m}},[Symbol.iterator](){return this}}}}function createReadonlyMethod(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function createInstrumentations(){const e={get(o){return get(this,o)},get size(){return size(this)},has,add:add$1,set,delete:deleteEntry,clear,forEach:createForEach(!1,!1)},t={get(o){return get(this,o,!1,!0)},get size(){return size(this)},has,add:add$1,set,delete:deleteEntry,clear,forEach:createForEach(!1,!0)},n={get(o){return get(this,o,!0)},get size(){return size(this,!0)},has(o){return has.call(this,o,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!1)},r={get(o){return get(this,o,!0,!0)},get size(){return size(this,!0)},has(o){return has.call(this,o,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=createIterableMethod(o,!1,!1),n[o]=createIterableMethod(o,!0,!1),t[o]=createIterableMethod(o,!1,!0),r[o]=createIterableMethod(o,!0,!0)}),[e,n,t,r]}const[mutableInstrumentations,readonlyInstrumentations,shallowInstrumentations,shallowReadonlyInstrumentations]=createInstrumentations();function createInstrumentationGetter(e,t){const n=t?e?shallowReadonlyInstrumentations:shallowInstrumentations:e?readonlyInstrumentations:mutableInstrumentations;return(r,s,o)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(hasOwn(n,s)&&s in r?n:r,s,o)}const mutableCollectionHandlers={get:createInstrumentationGetter(!1,!1)},shallowCollectionHandlers={get:createInstrumentationGetter(!1,!0)},readonlyCollectionHandlers={get:createInstrumentationGetter(!0,!1)},reactiveMap=new WeakMap,shallowReactiveMap=new WeakMap,readonlyMap=new WeakMap,shallowReadonlyMap=new WeakMap;function targetTypeMap(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function getTargetType(e){return e.__v_skip||!Object.isExtensible(e)?0:targetTypeMap(toRawType(e))}function reactive(e){return isReadonly(e)?e:createReactiveObject(e,!1,mutableHandlers,mutableCollectionHandlers,reactiveMap)}function shallowReactive(e){return createReactiveObject(e,!1,shallowReactiveHandlers,shallowCollectionHandlers,shallowReactiveMap)}function readonly(e){return createReactiveObject(e,!0,readonlyHandlers,readonlyCollectionHandlers,readonlyMap)}function createReactiveObject(e,t,n,r,s){if(!isObject(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=s.get(e);if(o)return o;const i=getTargetType(e);if(i===0)return e;const a=new Proxy(e,i===2?r:n);return s.set(e,a),a}function isReactive(e){return isReadonly(e)?isReactive(e.__v_raw):!!(e&&e.__v_isReactive)}function isReadonly(e){return!!(e&&e.__v_isReadonly)}function isShallow(e){return!!(e&&e.__v_isShallow)}function isProxy(e){return isReactive(e)||isReadonly(e)}function toRaw(e){const t=e&&e.__v_raw;return t?toRaw(t):e}function markRaw(e){return def(e,"__v_skip",!0),e}const toReactive=e=>isObject(e)?reactive(e):e,toReadonly=e=>isObject(e)?readonly(e):e;class ComputedRefImpl{constructor(t,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new ReactiveEffect(()=>t(this._value),()=>triggerRefValue(this,1),()=>this.dep&&scheduleEffects(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const t=toRaw(this);return(!t._cacheable||t.effect.dirty)&&hasChanged(t._value,t._value=t.effect.run())&&triggerRefValue(t,2),trackRefValue(t),t.effect._dirtyLevel>=1&&triggerRefValue(t,1),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function computed$1(e,t,n=!1){let r,s;const o=isFunction(e);return o?(r=e,s=NOOP):(r=e.get,s=e.set),new ComputedRefImpl(r,s,o||!s,n)}function trackRefValue(e){shouldTrack&&activeEffect&&(e=toRaw(e),trackEffect(activeEffect,e.dep||(e.dep=createDep(()=>e.dep=void 0,e instanceof ComputedRefImpl?e:void 0))))}function triggerRefValue(e,t=2,n){e=toRaw(e);const r=e.dep;r&&triggerEffects(r,t)}function isRef(e){return!!(e&&e.__v_isRef===!0)}function ref(e){return createRef(e,!1)}function shallowRef(e){return createRef(e,!0)}function createRef(e,t){return isRef(e)?e:new RefImpl(e,t)}class RefImpl{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:toRaw(t),this._value=n?t:toReactive(t)}get value(){return trackRefValue(this),this._value}set value(t){const n=this.__v_isShallow||isShallow(t)||isReadonly(t);t=n?t:toRaw(t),hasChanged(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:toReactive(t),triggerRefValue(this,2))}}function unref(e){return isRef(e)?e.value:e}const shallowUnwrapHandlers={get:(e,t,n)=>unref(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return isRef(s)&&!isRef(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function proxyRefs(e){return isReactive(e)?e:new Proxy(e,shallowUnwrapHandlers)}function toRefs(e){const t=isArray$1(e)?new Array(e.length):{};for(const n in e)t[n]=propertyToRef(e,n);return t}class ObjectRefImpl{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return getDepFromReactive(toRaw(this._object),this._key)}}function propertyToRef(e,t,n){const r=e[t];return isRef(r)?r:new ObjectRefImpl(e,t,n)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const stack=[];function warn$1(e,...t){pauseTracking();const n=stack.length?stack[stack.length-1].component:null,r=n&&n.appContext.config.warnHandler,s=getComponentTrace();if(r)callWithErrorHandling(r,n,11,[e+t.join(""),n&&n.proxy,s.map(({vnode:o})=>`at <${formatComponentName(n,o.type)}>`).join(`
`),s]);else{const o=[`[Vue warn]: ${e}`,...t];s.length&&o.push(`
`,...formatTrace(s)),console.warn(...o)}resetTracking()}function getComponentTrace(){let e=stack[stack.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const r=e.component&&e.component.parent;e=r&&r.vnode}return t}function formatTrace(e){const t=[];return e.forEach((n,r)=>{t.push(...r===0?[]:[`
`],...formatTraceEntry(n))}),t}function formatTraceEntry({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",r=e.component?e.component.parent==null:!1,s=` at <${formatComponentName(e.component,e.type,r)}`,o=">"+n;return e.props?[s,...formatProps(e.props),o]:[s+o]}function formatProps(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(r=>{t.push(...formatProp(r,e[r]))}),n.length>3&&t.push(" ..."),t}function formatProp(e,t,n){return isString(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:isRef(t)?(t=formatProp(e,toRaw(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):isFunction(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=toRaw(t),n?t:[`${e}=`,t])}function callWithErrorHandling(e,t,n,r){let s;try{s=r?e(...r):e()}catch(o){handleError(o,t,n)}return s}function callWithAsyncErrorHandling(e,t,n,r){if(isFunction(e)){const o=callWithErrorHandling(e,t,n,r);return o&&isPromise(o)&&o.catch(i=>{handleError(i,t,n)}),o}const s=[];for(let o=0;o<e.length;o++)s.push(callWithAsyncErrorHandling(e[o],t,n,r));return s}function handleError(e,t,n,r=!0){const s=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;for(;o;){const d=o.ec;if(d){for(let u=0;u<d.length;u++)if(d[u](e,i,a)===!1)return}o=o.parent}const c=t.appContext.config.errorHandler;if(c){callWithErrorHandling(c,null,10,[e,i,a]);return}}logError(e,n,s,r)}function logError(e,t,n,r=!0){console.error(e)}let isFlushing=!1,isFlushPending=!1;const queue=[];let flushIndex=0;const pendingPostFlushCbs=[];let activePostFlushCbs=null,postFlushIndex=0;const resolvedPromise=Promise.resolve();let currentFlushPromise=null;function nextTick(e){const t=currentFlushPromise||resolvedPromise;return e?t.then(this?e.bind(this):e):t}function findInsertionIndex(e){let t=flushIndex+1,n=queue.length;for(;t<n;){const r=t+n>>>1,s=queue[r],o=getId(s);o<e||o===e&&s.pre?t=r+1:n=r}return t}function queueJob(e){(!queue.length||!queue.includes(e,isFlushing&&e.allowRecurse?flushIndex+1:flushIndex))&&(e.id==null?queue.push(e):queue.splice(findInsertionIndex(e.id),0,e),queueFlush())}function queueFlush(){!isFlushing&&!isFlushPending&&(isFlushPending=!0,currentFlushPromise=resolvedPromise.then(flushJobs))}function invalidateJob(e){const t=queue.indexOf(e);t>flushIndex&&queue.splice(t,1)}function queuePostFlushCb(e){isArray$1(e)?pendingPostFlushCbs.push(...e):(!activePostFlushCbs||!activePostFlushCbs.includes(e,e.allowRecurse?postFlushIndex+1:postFlushIndex))&&pendingPostFlushCbs.push(e),queueFlush()}function flushPreFlushCbs(e,t,n=isFlushing?flushIndex+1:0){for(;n<queue.length;n++){const r=queue[n];if(r&&r.pre){if(e&&r.id!==e.uid)continue;queue.splice(n,1),n--,r()}}}function flushPostFlushCbs(e){if(pendingPostFlushCbs.length){const t=[...new Set(pendingPostFlushCbs)].sort((n,r)=>getId(n)-getId(r));if(pendingPostFlushCbs.length=0,activePostFlushCbs){activePostFlushCbs.push(...t);return}for(activePostFlushCbs=t,postFlushIndex=0;postFlushIndex<activePostFlushCbs.length;postFlushIndex++)activePostFlushCbs[postFlushIndex]();activePostFlushCbs=null,postFlushIndex=0}}const getId=e=>e.id==null?1/0:e.id,comparator=(e,t)=>{const n=getId(e)-getId(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function flushJobs(e){isFlushPending=!1,isFlushing=!0,queue.sort(comparator);try{for(flushIndex=0;flushIndex<queue.length;flushIndex++){const t=queue[flushIndex];t&&t.active!==!1&&callWithErrorHandling(t,null,14)}}finally{flushIndex=0,queue.length=0,flushPostFlushCbs(),isFlushing=!1,currentFlushPromise=null,(queue.length||pendingPostFlushCbs.length)&&flushJobs()}}function emit(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||EMPTY_OBJ;let s=n;const o=t.startsWith("update:"),i=o&&t.slice(7);if(i&&i in r){const u=`${i==="modelValue"?"model":i}Modifiers`,{number:_,trim:m}=r[u]||EMPTY_OBJ;m&&(s=n.map(x=>isString(x)?x.trim():x)),_&&(s=n.map(looseToNumber))}let a,c=r[a=toHandlerKey(t)]||r[a=toHandlerKey(camelize(t))];!c&&o&&(c=r[a=toHandlerKey(hyphenate(t))]),c&&callWithAsyncErrorHandling(c,e,6,s);const d=r[a+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,callWithAsyncErrorHandling(d,e,6,s)}}function normalizeEmitsOptions(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(s!==void 0)return s;const o=e.emits;let i={},a=!1;if(!isFunction(e)){const c=d=>{const u=normalizeEmitsOptions(d,t,!0);u&&(a=!0,extend(i,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!o&&!a?(isObject(e)&&r.set(e,null),null):(isArray$1(o)?o.forEach(c=>i[c]=null):extend(i,o),isObject(e)&&r.set(e,i),i)}function isEmitListener(e,t){return!e||!isOn(t)?!1:(t=t.slice(2).replace(/Once$/,""),hasOwn(e,t[0].toLowerCase()+t.slice(1))||hasOwn(e,hyphenate(t))||hasOwn(e,t))}let currentRenderingInstance=null,currentScopeId=null;function setCurrentRenderingInstance(e){const t=currentRenderingInstance;return currentRenderingInstance=e,currentScopeId=e&&e.type.__scopeId||null,t}function pushScopeId(e){currentScopeId=e}function popScopeId(){currentScopeId=null}function withCtx(e,t=currentRenderingInstance,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&setBlockTracking(-1);const o=setCurrentRenderingInstance(t);let i;try{i=e(...s)}finally{setCurrentRenderingInstance(o),r._d&&setBlockTracking(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function markAttrsAccessed(){}function renderComponentRoot(e){const{type:t,vnode:n,proxy:r,withProxy:s,props:o,propsOptions:[i],slots:a,attrs:c,emit:d,render:u,renderCache:_,data:m,setupState:x,ctx:C,inheritAttrs:N}=e;let M,$;const F=setCurrentRenderingInstance(e);try{if(n.shapeFlag&4){const H=s||r,Y=H;M=normalizeVNode(u.call(Y,H,_,o,x,m,C)),$=c}else{const H=t;M=normalizeVNode(H.length>1?H(o,{attrs:c,slots:a,emit:d}):H(o,null)),$=t.props?c:getFunctionalFallthrough(c)}}catch(H){blockStack.length=0,handleError(H,e,1),M=createVNode(Comment)}let V=M;if($&&N!==!1){const H=Object.keys($),{shapeFlag:Y}=V;H.length&&Y&7&&(i&&H.some(isModelListener)&&($=filterModelListeners($,i)),V=cloneVNode(V,$))}return n.dirs&&(V=cloneVNode(V),V.dirs=V.dirs?V.dirs.concat(n.dirs):n.dirs),n.transition&&(V.transition=n.transition),M=V,setCurrentRenderingInstance(F),M}const getFunctionalFallthrough=e=>{let t;for(const n in e)(n==="class"||n==="style"||isOn(n))&&((t||(t={}))[n]=e[n]);return t},filterModelListeners=(e,t)=>{const n={};for(const r in e)(!isModelListener(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function shouldUpdateComponent(e,t,n){const{props:r,children:s,component:o}=e,{props:i,children:a,patchFlag:c}=t,d=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?hasPropsChanged(r,i,d):!!i;if(c&8){const u=t.dynamicProps;for(let _=0;_<u.length;_++){const m=u[_];if(i[m]!==r[m]&&!isEmitListener(d,m))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===i?!1:r?i?hasPropsChanged(r,i,d):!0:!!i;return!1}function hasPropsChanged(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const o=r[s];if(t[o]!==e[o]&&!isEmitListener(n,o))return!0}return!1}function updateHOCHostEl({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const COMPONENTS="components",DIRECTIVES="directives";function resolveComponent(e,t){return resolveAsset(COMPONENTS,e,!0,t)||e}const NULL_DYNAMIC_COMPONENT=Symbol.for("v-ndc");function resolveDirective(e){return resolveAsset(DIRECTIVES,e)}function resolveAsset(e,t,n=!0,r=!1){const s=currentRenderingInstance||currentInstance;if(s){const o=s.type;if(e===COMPONENTS){const a=getComponentName(o,!1);if(a&&(a===t||a===camelize(t)||a===capitalize(camelize(t))))return o}const i=resolve(s[e]||o[e],t)||resolve(s.appContext[e],t);return!i&&r?o:i}}function resolve(e,t){return e&&(e[t]||e[camelize(t)]||e[capitalize(camelize(t))])}const isSuspense=e=>e.__isSuspense;function queueEffectWithSuspense(e,t){t&&t.pendingBranch?isArray$1(e)?t.effects.push(...e):t.effects.push(e):queuePostFlushCb(e)}const ssrContextKey=Symbol.for("v-scx"),useSSRContext=()=>inject(ssrContextKey),INITIAL_WATCHER_VALUE={};function watch(e,t,n){return doWatch(e,t,n)}function doWatch(e,t,{immediate:n,deep:r,flush:s,once:o,onTrack:i,onTrigger:a}=EMPTY_OBJ){if(t&&o){const U=t;t=(...Z)=>{U(...Z),Y()}}const c=currentInstance,d=U=>r===!0?U:traverse(U,r===!1?1:void 0);let u,_=!1,m=!1;if(isRef(e)?(u=()=>e.value,_=isShallow(e)):isReactive(e)?(u=()=>d(e),_=!0):isArray$1(e)?(m=!0,_=e.some(U=>isReactive(U)||isShallow(U)),u=()=>e.map(U=>{if(isRef(U))return U.value;if(isReactive(U))return d(U);if(isFunction(U))return callWithErrorHandling(U,c,2)})):isFunction(e)?t?u=()=>callWithErrorHandling(e,c,2):u=()=>(x&&x(),callWithAsyncErrorHandling(e,c,3,[C])):u=NOOP,t&&r){const U=u;u=()=>traverse(U())}let x,C=U=>{x=V.onStop=()=>{callWithErrorHandling(U,c,4),x=V.onStop=void 0}},N;if(isInSSRComponentSetup)if(C=NOOP,t?n&&callWithAsyncErrorHandling(t,c,3,[u(),m?[]:void 0,C]):u(),s==="sync"){const U=useSSRContext();N=U.__watcherHandles||(U.__watcherHandles=[])}else return NOOP;let M=m?new Array(e.length).fill(INITIAL_WATCHER_VALUE):INITIAL_WATCHER_VALUE;const $=()=>{if(!(!V.active||!V.dirty))if(t){const U=V.run();(r||_||(m?U.some((Z,ne)=>hasChanged(Z,M[ne])):hasChanged(U,M)))&&(x&&x(),callWithAsyncErrorHandling(t,c,3,[U,M===INITIAL_WATCHER_VALUE?void 0:m&&M[0]===INITIAL_WATCHER_VALUE?[]:M,C]),M=U)}else V.run()};$.allowRecurse=!!t;let F;s==="sync"?F=$:s==="post"?F=()=>queuePostRenderEffect($,c&&c.suspense):($.pre=!0,c&&($.id=c.uid),F=()=>queueJob($));const V=new ReactiveEffect(u,NOOP,F),H=getCurrentScope(),Y=()=>{V.stop(),H&&remove$1(H.effects,V)};return t?n?$():M=V.run():s==="post"?queuePostRenderEffect(V.run.bind(V),c&&c.suspense):V.run(),N&&N.push(Y),Y}function instanceWatch(e,t,n){const r=this.proxy,s=isString(e)?e.includes(".")?createPathGetter(r,e):()=>r[e]:e.bind(r,r);let o;isFunction(t)?o=t:(o=t.handler,n=t);const i=setCurrentInstance(this),a=doWatch(s,o.bind(r),n);return i(),a}function createPathGetter(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function traverse(e,t,n=0,r){if(!isObject(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++}if(r=r||new Set,r.has(e))return e;if(r.add(e),isRef(e))traverse(e.value,t,n,r);else if(isArray$1(e))for(let s=0;s<e.length;s++)traverse(e[s],t,n,r);else if(isSet(e)||isMap(e))e.forEach(s=>{traverse(s,t,n,r)});else if(isPlainObject(e))for(const s in e)traverse(e[s],t,n,r);return e}function withDirectives(e,t){if(currentRenderingInstance===null)return e;const n=getExposeProxy(currentRenderingInstance)||currentRenderingInstance.proxy,r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[o,i,a,c=EMPTY_OBJ]=t[s];o&&(isFunction(o)&&(o={mounted:o,updated:o}),o.deep&&traverse(i),r.push({dir:o,instance:n,value:i,oldValue:void 0,arg:a,modifiers:c}))}return e}function invokeDirectiveHook(e,t,n,r){const s=e.dirs,o=t&&t.dirs;for(let i=0;i<s.length;i++){const a=s[i];o&&(a.oldValue=o[i].value);let c=a.dir[r];c&&(pauseTracking(),callWithAsyncErrorHandling(c,n,8,[e.el,a,e,t]),resetTracking())}}/*! #__NO_SIDE_EFFECTS__ */function defineComponent(e,t){return isFunction(e)?extend({name:e.name},t,{setup:e}):e}const isAsyncWrapper=e=>!!e.type.__asyncLoader,isKeepAlive=e=>e.type.__isKeepAlive;function onActivated(e,t){registerKeepAliveHook(e,"a",t)}function onDeactivated(e,t){registerKeepAliveHook(e,"da",t)}function registerKeepAliveHook(e,t,n=currentInstance){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(injectHook(t,r,n),n){let s=n.parent;for(;s&&s.parent;)isKeepAlive(s.parent.vnode)&&injectToKeepAliveRoot(r,t,n,s),s=s.parent}}function injectToKeepAliveRoot(e,t,n,r){const s=injectHook(t,e,r,!0);onUnmounted(()=>{remove$1(r[t],s)},n)}function injectHook(e,t,n=currentInstance,r=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...i)=>{if(n.isUnmounted)return;pauseTracking();const a=setCurrentInstance(n),c=callWithAsyncErrorHandling(t,n,e,i);return a(),resetTracking(),c});return r?s.unshift(o):s.push(o),o}}const createHook=e=>(t,n=currentInstance)=>(!isInSSRComponentSetup||e==="sp")&&injectHook(e,(...r)=>t(...r),n),onBeforeMount=createHook("bm"),onMounted=createHook("m"),onBeforeUpdate=createHook("bu"),onUpdated=createHook("u"),onBeforeUnmount=createHook("bum"),onUnmounted=createHook("um"),onServerPrefetch=createHook("sp"),onRenderTriggered=createHook("rtg"),onRenderTracked=createHook("rtc");function onErrorCaptured(e,t=currentInstance){injectHook("ec",e,t)}function renderList(e,t,n,r){let s;const o=n&&n[r];if(isArray$1(e)||isString(e)){s=new Array(e.length);for(let i=0,a=e.length;i<a;i++)s[i]=t(e[i],i,void 0,o&&o[i])}else if(typeof e=="number"){s=new Array(e);for(let i=0;i<e;i++)s[i]=t(i+1,i,void 0,o&&o[i])}else if(isObject(e))if(e[Symbol.iterator])s=Array.from(e,(i,a)=>t(i,a,void 0,o&&o[a]));else{const i=Object.keys(e);s=new Array(i.length);for(let a=0,c=i.length;a<c;a++){const d=i[a];s[a]=t(e[d],d,a,o&&o[a])}}else s=[];return n&&(n[r]=s),s}const getPublicInstance=e=>e?isStatefulComponent(e)?getExposeProxy(e)||e.proxy:getPublicInstance(e.parent):null,publicPropertiesMap=extend(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>getPublicInstance(e.parent),$root:e=>getPublicInstance(e.root),$emit:e=>e.emit,$options:e=>resolveMergedOptions(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,queueJob(e.update)}),$nextTick:e=>e.n||(e.n=nextTick.bind(e.proxy)),$watch:e=>instanceWatch.bind(e)}),hasSetupBinding=(e,t)=>e!==EMPTY_OBJ&&!e.__isScriptSetup&&hasOwn(e,t),PublicInstanceProxyHandlers={get({_:e},t){const{ctx:n,setupState:r,data:s,props:o,accessCache:i,type:a,appContext:c}=e;let d;if(t[0]!=="$"){const x=i[t];if(x!==void 0)switch(x){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(hasSetupBinding(r,t))return i[t]=1,r[t];if(s!==EMPTY_OBJ&&hasOwn(s,t))return i[t]=2,s[t];if((d=e.propsOptions[0])&&hasOwn(d,t))return i[t]=3,o[t];if(n!==EMPTY_OBJ&&hasOwn(n,t))return i[t]=4,n[t];shouldCacheAccess&&(i[t]=0)}}const u=publicPropertiesMap[t];let _,m;if(u)return t==="$attrs"&&track(e,"get",t),u(e);if((_=a.__cssModules)&&(_=_[t]))return _;if(n!==EMPTY_OBJ&&hasOwn(n,t))return i[t]=4,n[t];if(m=c.config.globalProperties,hasOwn(m,t))return m[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return hasSetupBinding(s,t)?(s[t]=n,!0):r!==EMPTY_OBJ&&hasOwn(r,t)?(r[t]=n,!0):hasOwn(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},i){let a;return!!n[i]||e!==EMPTY_OBJ&&hasOwn(e,i)||hasSetupBinding(t,i)||(a=o[0])&&hasOwn(a,i)||hasOwn(r,i)||hasOwn(publicPropertiesMap,i)||hasOwn(s.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:hasOwn(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function normalizePropsOrEmits(e){return isArray$1(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let shouldCacheAccess=!0;function applyOptions(e){const t=resolveMergedOptions(e),n=e.proxy,r=e.ctx;shouldCacheAccess=!1,t.beforeCreate&&callHook(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:i,watch:a,provide:c,inject:d,created:u,beforeMount:_,mounted:m,beforeUpdate:x,updated:C,activated:N,deactivated:M,beforeDestroy:$,beforeUnmount:F,destroyed:V,unmounted:H,render:Y,renderTracked:U,renderTriggered:Z,errorCaptured:ne,serverPrefetch:de,expose:se,inheritAttrs:le,components:fe,directives:oe,filters:ge}=t;if(d&&resolveInjections(d,r,null),i)for(const K in i){const q=i[K];isFunction(q)&&(r[K]=q.bind(n))}if(s){const K=s.call(n,n);isObject(K)&&(e.data=reactive(K))}if(shouldCacheAccess=!0,o)for(const K in o){const q=o[K],ce=isFunction(q)?q.bind(n,n):isFunction(q.get)?q.get.bind(n,n):NOOP,ue=!isFunction(q)&&isFunction(q.set)?q.set.bind(n):NOOP,ie=computed({get:ce,set:ue});Object.defineProperty(r,K,{enumerable:!0,configurable:!0,get:()=>ie.value,set:ee=>ie.value=ee})}if(a)for(const K in a)createWatcher(a[K],r,n,K);if(c){const K=isFunction(c)?c.call(n):c;Reflect.ownKeys(K).forEach(q=>{provide(q,K[q])})}u&&callHook(u,e,"c");function J(K,q){isArray$1(q)?q.forEach(ce=>K(ce.bind(n))):q&&K(q.bind(n))}if(J(onBeforeMount,_),J(onMounted,m),J(onBeforeUpdate,x),J(onUpdated,C),J(onActivated,N),J(onDeactivated,M),J(onErrorCaptured,ne),J(onRenderTracked,U),J(onRenderTriggered,Z),J(onBeforeUnmount,F),J(onUnmounted,H),J(onServerPrefetch,de),isArray$1(se))if(se.length){const K=e.exposed||(e.exposed={});se.forEach(q=>{Object.defineProperty(K,q,{get:()=>n[q],set:ce=>n[q]=ce})})}else e.exposed||(e.exposed={});Y&&e.render===NOOP&&(e.render=Y),le!=null&&(e.inheritAttrs=le),fe&&(e.components=fe),oe&&(e.directives=oe)}function resolveInjections(e,t,n=NOOP){isArray$1(e)&&(e=normalizeInject(e));for(const r in e){const s=e[r];let o;isObject(s)?"default"in s?o=inject(s.from||r,s.default,!0):o=inject(s.from||r):o=inject(s),isRef(o)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>o.value,set:i=>o.value=i}):t[r]=o}}function callHook(e,t,n){callWithAsyncErrorHandling(isArray$1(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function createWatcher(e,t,n,r){const s=r.includes(".")?createPathGetter(n,r):()=>n[r];if(isString(e)){const o=t[e];isFunction(o)&&watch(s,o)}else if(isFunction(e))watch(s,e.bind(n));else if(isObject(e))if(isArray$1(e))e.forEach(o=>createWatcher(o,t,n,r));else{const o=isFunction(e.handler)?e.handler.bind(n):t[e.handler];isFunction(o)&&watch(s,o,e)}}function resolveMergedOptions(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,a=o.get(t);let c;return a?c=a:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(d=>mergeOptions$1(c,d,i,!0)),mergeOptions$1(c,t,i)),isObject(t)&&o.set(t,c),c}function mergeOptions$1(e,t,n,r=!1){const{mixins:s,extends:o}=t;o&&mergeOptions$1(e,o,n,!0),s&&s.forEach(i=>mergeOptions$1(e,i,n,!0));for(const i in t)if(!(r&&i==="expose")){const a=internalOptionMergeStrats[i]||n&&n[i];e[i]=a?a(e[i],t[i]):t[i]}return e}const internalOptionMergeStrats={data:mergeDataFn,props:mergeEmitsOrPropsOptions,emits:mergeEmitsOrPropsOptions,methods:mergeObjectOptions,computed:mergeObjectOptions,beforeCreate:mergeAsArray,created:mergeAsArray,beforeMount:mergeAsArray,mounted:mergeAsArray,beforeUpdate:mergeAsArray,updated:mergeAsArray,beforeDestroy:mergeAsArray,beforeUnmount:mergeAsArray,destroyed:mergeAsArray,unmounted:mergeAsArray,activated:mergeAsArray,deactivated:mergeAsArray,errorCaptured:mergeAsArray,serverPrefetch:mergeAsArray,components:mergeObjectOptions,directives:mergeObjectOptions,watch:mergeWatchOptions,provide:mergeDataFn,inject:mergeInject};function mergeDataFn(e,t){return t?e?function(){return extend(isFunction(e)?e.call(this,this):e,isFunction(t)?t.call(this,this):t)}:t:e}function mergeInject(e,t){return mergeObjectOptions(normalizeInject(e),normalizeInject(t))}function normalizeInject(e){if(isArray$1(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function mergeAsArray(e,t){return e?[...new Set([].concat(e,t))]:t}function mergeObjectOptions(e,t){return e?extend(Object.create(null),e,t):t}function mergeEmitsOrPropsOptions(e,t){return e?isArray$1(e)&&isArray$1(t)?[...new Set([...e,...t])]:extend(Object.create(null),normalizePropsOrEmits(e),normalizePropsOrEmits(t??{})):t}function mergeWatchOptions(e,t){if(!e)return t;if(!t)return e;const n=extend(Object.create(null),e);for(const r in t)n[r]=mergeAsArray(e[r],t[r]);return n}function createAppContext(){return{app:null,config:{isNativeTag:NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let uid$1=0;function createAppAPI(e,t){return function(r,s=null){isFunction(r)||(r=extend({},r)),s!=null&&!isObject(s)&&(s=null);const o=createAppContext(),i=new WeakSet;let a=!1;const c=o.app={_uid:uid$1++,_component:r,_props:s,_container:null,_context:o,_instance:null,version,get config(){return o.config},set config(d){},use(d,...u){return i.has(d)||(d&&isFunction(d.install)?(i.add(d),d.install(c,...u)):isFunction(d)&&(i.add(d),d(c,...u))),c},mixin(d){return o.mixins.includes(d)||o.mixins.push(d),c},component(d,u){return u?(o.components[d]=u,c):o.components[d]},directive(d,u){return u?(o.directives[d]=u,c):o.directives[d]},mount(d,u,_){if(!a){const m=createVNode(r,s);return m.appContext=o,_===!0?_="svg":_===!1&&(_=void 0),u&&t?t(m,d):e(m,d,_),a=!0,c._container=d,d.__vue_app__=c,getExposeProxy(m.component)||m.component.proxy}},unmount(){a&&(e(null,c._container),delete c._container.__vue_app__)},provide(d,u){return o.provides[d]=u,c},runWithContext(d){currentApp=c;try{return d()}finally{currentApp=null}}};return c}}let currentApp=null;function provide(e,t){if(currentInstance){let n=currentInstance.provides;const r=currentInstance.parent&&currentInstance.parent.provides;r===n&&(n=currentInstance.provides=Object.create(r)),n[e]=t}}function inject(e,t,n=!1){const r=currentInstance||currentRenderingInstance;if(r||currentApp){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:currentApp._context.provides;if(s&&e in s)return s[e];if(arguments.length>1)return n&&isFunction(t)?t.call(r&&r.proxy):t}}function initProps(e,t,n,r=!1){const s={},o={};def(o,InternalObjectKey,1),e.propsDefaults=Object.create(null),setFullProps(e,t,s,o);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);n?e.props=r?s:shallowReactive(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function updateProps(e,t,n,r){const{props:s,attrs:o,vnode:{patchFlag:i}}=e,a=toRaw(s),[c]=e.propsOptions;let d=!1;if((r||i>0)&&!(i&16)){if(i&8){const u=e.vnode.dynamicProps;for(let _=0;_<u.length;_++){let m=u[_];if(isEmitListener(e.emitsOptions,m))continue;const x=t[m];if(c)if(hasOwn(o,m))x!==o[m]&&(o[m]=x,d=!0);else{const C=camelize(m);s[C]=resolvePropValue(c,a,C,x,e,!1)}else x!==o[m]&&(o[m]=x,d=!0)}}}else{setFullProps(e,t,s,o)&&(d=!0);let u;for(const _ in a)(!t||!hasOwn(t,_)&&((u=hyphenate(_))===_||!hasOwn(t,u)))&&(c?n&&(n[_]!==void 0||n[u]!==void 0)&&(s[_]=resolvePropValue(c,a,_,void 0,e,!0)):delete s[_]);if(o!==a)for(const _ in o)(!t||!hasOwn(t,_))&&(delete o[_],d=!0)}d&&trigger(e,"set","$attrs")}function setFullProps(e,t,n,r){const[s,o]=e.propsOptions;let i=!1,a;if(t)for(let c in t){if(isReservedProp(c))continue;const d=t[c];let u;s&&hasOwn(s,u=camelize(c))?!o||!o.includes(u)?n[u]=d:(a||(a={}))[u]=d:isEmitListener(e.emitsOptions,c)||(!(c in r)||d!==r[c])&&(r[c]=d,i=!0)}if(o){const c=toRaw(n),d=a||EMPTY_OBJ;for(let u=0;u<o.length;u++){const _=o[u];n[_]=resolvePropValue(s,c,_,d[_],e,!hasOwn(d,_))}}return i}function resolvePropValue(e,t,n,r,s,o){const i=e[n];if(i!=null){const a=hasOwn(i,"default");if(a&&r===void 0){const c=i.default;if(i.type!==Function&&!i.skipFactory&&isFunction(c)){const{propsDefaults:d}=s;if(n in d)r=d[n];else{const u=setCurrentInstance(s);r=d[n]=c.call(null,t),u()}}else r=c}i[0]&&(o&&!a?r=!1:i[1]&&(r===""||r===hyphenate(n))&&(r=!0))}return r}function normalizePropsOptions(e,t,n=!1){const r=t.propsCache,s=r.get(e);if(s)return s;const o=e.props,i={},a=[];let c=!1;if(!isFunction(e)){const u=_=>{c=!0;const[m,x]=normalizePropsOptions(_,t,!0);extend(i,m),x&&a.push(...x)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!o&&!c)return isObject(e)&&r.set(e,EMPTY_ARR),EMPTY_ARR;if(isArray$1(o))for(let u=0;u<o.length;u++){const _=camelize(o[u]);validatePropName(_)&&(i[_]=EMPTY_OBJ)}else if(o)for(const u in o){const _=camelize(u);if(validatePropName(_)){const m=o[u],x=i[_]=isArray$1(m)||isFunction(m)?{type:m}:extend({},m);if(x){const C=getTypeIndex(Boolean,x.type),N=getTypeIndex(String,x.type);x[0]=C>-1,x[1]=N<0||C<N,(C>-1||hasOwn(x,"default"))&&a.push(_)}}}const d=[i,a];return isObject(e)&&r.set(e,d),d}function validatePropName(e){return e[0]!=="$"}function getType(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function isSameType(e,t){return getType(e)===getType(t)}function getTypeIndex(e,t){return isArray$1(t)?t.findIndex(n=>isSameType(n,e)):isFunction(t)&&isSameType(t,e)?0:-1}const isInternalKey=e=>e[0]==="_"||e==="$stable",normalizeSlotValue=e=>isArray$1(e)?e.map(normalizeVNode):[normalizeVNode(e)],normalizeSlot$1=(e,t,n)=>{if(t._n)return t;const r=withCtx((...s)=>normalizeSlotValue(t(...s)),n);return r._c=!1,r},normalizeObjectSlots=(e,t,n)=>{const r=e._ctx;for(const s in e){if(isInternalKey(s))continue;const o=e[s];if(isFunction(o))t[s]=normalizeSlot$1(s,o,r);else if(o!=null){const i=normalizeSlotValue(o);t[s]=()=>i}}},normalizeVNodeSlots=(e,t)=>{const n=normalizeSlotValue(t);e.slots.default=()=>n},initSlots=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=toRaw(t),def(t,"_",n)):normalizeObjectSlots(t,e.slots={})}else e.slots={},t&&normalizeVNodeSlots(e,t);def(e.slots,InternalObjectKey,1)},updateSlots=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,i=EMPTY_OBJ;if(r.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:(extend(s,t),!n&&a===1&&delete s._):(o=!t.$stable,normalizeObjectSlots(t,s)),i=t}else t&&(normalizeVNodeSlots(e,t),i={default:1});if(o)for(const a in s)!isInternalKey(a)&&i[a]==null&&delete s[a]};function setRef(e,t,n,r,s=!1){if(isArray$1(e)){e.forEach((m,x)=>setRef(m,t&&(isArray$1(t)?t[x]:t),n,r,s));return}if(isAsyncWrapper(r)&&!s)return;const o=r.shapeFlag&4?getExposeProxy(r.component)||r.component.proxy:r.el,i=s?null:o,{i:a,r:c}=e,d=t&&t.r,u=a.refs===EMPTY_OBJ?a.refs={}:a.refs,_=a.setupState;if(d!=null&&d!==c&&(isString(d)?(u[d]=null,hasOwn(_,d)&&(_[d]=null)):isRef(d)&&(d.value=null)),isFunction(c))callWithErrorHandling(c,a,12,[i,u]);else{const m=isString(c),x=isRef(c),C=e.f;if(m||x){const N=()=>{if(C){const M=m?hasOwn(_,c)?_[c]:u[c]:c.value;s?isArray$1(M)&&remove$1(M,o):isArray$1(M)?M.includes(o)||M.push(o):m?(u[c]=[o],hasOwn(_,c)&&(_[c]=u[c])):(c.value=[o],e.k&&(u[e.k]=c.value))}else m?(u[c]=i,hasOwn(_,c)&&(_[c]=i)):x&&(c.value=i,e.k&&(u[e.k]=i))};s||C?N():(N.id=-1,queuePostRenderEffect(N,n))}}}const queuePostRenderEffect=queueEffectWithSuspense;function createRenderer(e){return baseCreateRenderer(e)}function baseCreateRenderer(e,t){const n=getGlobalThis();n.__VUE__=!0;const{insert:r,remove:s,patchProp:o,createElement:i,createText:a,createComment:c,setText:d,setElementText:u,parentNode:_,nextSibling:m,setScopeId:x=NOOP,insertStaticContent:C}=e,N=(l,f,g,b=null,v=null,k=null,S=void 0,E=null,R=!!f.dynamicChildren)=>{if(l===f)return;l&&!isSameVNodeType(l,f)&&(b=y(l),ee(l,v,k,!0),l=null),f.patchFlag===-2&&(R=!1,f.dynamicChildren=null);const{type:w,ref:A,shapeFlag:I}=f;switch(w){case Text:M(l,f,g,b);break;case Comment:$(l,f,g,b);break;case Static:l==null&&F(f,g,b,S);break;case Fragment:fe(l,f,g,b,v,k,S,E,R);break;default:I&1?Y(l,f,g,b,v,k,S,E,R):I&6?oe(l,f,g,b,v,k,S,E,R):(I&64||I&128)&&w.process(l,f,g,b,v,k,S,E,R,O)}A!=null&&v&&setRef(A,l&&l.ref,k,f||l,!f)},M=(l,f,g,b)=>{if(l==null)r(f.el=a(f.children),g,b);else{const v=f.el=l.el;f.children!==l.children&&d(v,f.children)}},$=(l,f,g,b)=>{l==null?r(f.el=c(f.children||""),g,b):f.el=l.el},F=(l,f,g,b)=>{[l.el,l.anchor]=C(l.children,f,g,b,l.el,l.anchor)},V=({el:l,anchor:f},g,b)=>{let v;for(;l&&l!==f;)v=m(l),r(l,g,b),l=v;r(f,g,b)},H=({el:l,anchor:f})=>{let g;for(;l&&l!==f;)g=m(l),s(l),l=g;s(f)},Y=(l,f,g,b,v,k,S,E,R)=>{f.type==="svg"?S="svg":f.type==="math"&&(S="mathml"),l==null?U(f,g,b,v,k,S,E,R):de(l,f,v,k,S,E,R)},U=(l,f,g,b,v,k,S,E)=>{let R,w;const{props:A,shapeFlag:I,transition:B,dirs:L}=l;if(R=l.el=i(l.type,k,A&&A.is,A),I&8?u(R,l.children):I&16&&ne(l.children,R,null,b,v,resolveChildrenNamespace(l,k),S,E),L&&invokeDirectiveHook(l,null,b,"created"),Z(R,l,l.scopeId,S,b),A){for(const W in A)W!=="value"&&!isReservedProp(W)&&o(R,W,null,A[W],k,l.children,b,v,Q);"value"in A&&o(R,"value",null,A.value,k),(w=A.onVnodeBeforeMount)&&invokeVNodeHook(w,b,l)}L&&invokeDirectiveHook(l,null,b,"beforeMount");const j=needTransition(v,B);j&&B.beforeEnter(R),r(R,f,g),((w=A&&A.onVnodeMounted)||j||L)&&queuePostRenderEffect(()=>{w&&invokeVNodeHook(w,b,l),j&&B.enter(R),L&&invokeDirectiveHook(l,null,b,"mounted")},v)},Z=(l,f,g,b,v)=>{if(g&&x(l,g),b)for(let k=0;k<b.length;k++)x(l,b[k]);if(v){let k=v.subTree;if(f===k){const S=v.vnode;Z(l,S,S.scopeId,S.slotScopeIds,v.parent)}}},ne=(l,f,g,b,v,k,S,E,R=0)=>{for(let w=R;w<l.length;w++){const A=l[w]=E?cloneIfMounted(l[w]):normalizeVNode(l[w]);N(null,A,f,g,b,v,k,S,E)}},de=(l,f,g,b,v,k,S)=>{const E=f.el=l.el;let{patchFlag:R,dynamicChildren:w,dirs:A}=f;R|=l.patchFlag&16;const I=l.props||EMPTY_OBJ,B=f.props||EMPTY_OBJ;let L;if(g&&toggleRecurse(g,!1),(L=B.onVnodeBeforeUpdate)&&invokeVNodeHook(L,g,f,l),A&&invokeDirectiveHook(f,l,g,"beforeUpdate"),g&&toggleRecurse(g,!0),w?se(l.dynamicChildren,w,E,g,b,resolveChildrenNamespace(f,v),k):S||q(l,f,E,null,g,b,resolveChildrenNamespace(f,v),k,!1),R>0){if(R&16)le(E,f,I,B,g,b,v);else if(R&2&&I.class!==B.class&&o(E,"class",null,B.class,v),R&4&&o(E,"style",I.style,B.style,v),R&8){const j=f.dynamicProps;for(let W=0;W<j.length;W++){const z=j[W],X=I[z],re=B[z];(re!==X||z==="value")&&o(E,z,X,re,v,l.children,g,b,Q)}}R&1&&l.children!==f.children&&u(E,f.children)}else!S&&w==null&&le(E,f,I,B,g,b,v);((L=B.onVnodeUpdated)||A)&&queuePostRenderEffect(()=>{L&&invokeVNodeHook(L,g,f,l),A&&invokeDirectiveHook(f,l,g,"updated")},b)},se=(l,f,g,b,v,k,S)=>{for(let E=0;E<f.length;E++){const R=l[E],w=f[E],A=R.el&&(R.type===Fragment||!isSameVNodeType(R,w)||R.shapeFlag&70)?_(R.el):g;N(R,w,A,null,b,v,k,S,!0)}},le=(l,f,g,b,v,k,S)=>{if(g!==b){if(g!==EMPTY_OBJ)for(const E in g)!isReservedProp(E)&&!(E in b)&&o(l,E,g[E],null,S,f.children,v,k,Q);for(const E in b){if(isReservedProp(E))continue;const R=b[E],w=g[E];R!==w&&E!=="value"&&o(l,E,w,R,S,f.children,v,k,Q)}"value"in b&&o(l,"value",g.value,b.value,S)}},fe=(l,f,g,b,v,k,S,E,R)=>{const w=f.el=l?l.el:a(""),A=f.anchor=l?l.anchor:a("");let{patchFlag:I,dynamicChildren:B,slotScopeIds:L}=f;L&&(E=E?E.concat(L):L),l==null?(r(w,g,b),r(A,g,b),ne(f.children||[],g,A,v,k,S,E,R)):I>0&&I&64&&B&&l.dynamicChildren?(se(l.dynamicChildren,B,g,v,k,S,E),(f.key!=null||v&&f===v.subTree)&&traverseStaticChildren(l,f,!0)):q(l,f,g,A,v,k,S,E,R)},oe=(l,f,g,b,v,k,S,E,R)=>{f.slotScopeIds=E,l==null?f.shapeFlag&512?v.ctx.activate(f,g,b,S,R):ge(f,g,b,v,k,S,R):pe(l,f,R)},ge=(l,f,g,b,v,k,S)=>{const E=l.component=createComponentInstance(l,b,v);if(isKeepAlive(l)&&(E.ctx.renderer=O),setupComponent(E),E.asyncDep){if(v&&v.registerDep(E,J),!l.el){const R=E.subTree=createVNode(Comment);$(null,R,f,g)}}else J(E,l,f,g,v,k,S)},pe=(l,f,g)=>{const b=f.component=l.component;if(shouldUpdateComponent(l,f,g))if(b.asyncDep&&!b.asyncResolved){K(b,f,g);return}else b.next=f,invalidateJob(b.update),b.effect.dirty=!0,b.update();else f.el=l.el,b.vnode=f},J=(l,f,g,b,v,k,S)=>{const E=()=>{if(l.isMounted){let{next:A,bu:I,u:B,parent:L,vnode:j}=l;{const me=locateNonHydratedAsyncRoot(l);if(me){A&&(A.el=j.el,K(l,A,S)),me.asyncDep.then(()=>{l.isUnmounted||E()});return}}let W=A,z;toggleRecurse(l,!1),A?(A.el=j.el,K(l,A,S)):A=j,I&&invokeArrayFns(I),(z=A.props&&A.props.onVnodeBeforeUpdate)&&invokeVNodeHook(z,L,A,j),toggleRecurse(l,!0);const X=renderComponentRoot(l),re=l.subTree;l.subTree=X,N(re,X,_(re.el),y(re),l,v,k),A.el=X.el,W===null&&updateHOCHostEl(l,X.el),B&&queuePostRenderEffect(B,v),(z=A.props&&A.props.onVnodeUpdated)&&queuePostRenderEffect(()=>invokeVNodeHook(z,L,A,j),v)}else{let A;const{el:I,props:B}=f,{bm:L,m:j,parent:W}=l,z=isAsyncWrapper(f);if(toggleRecurse(l,!1),L&&invokeArrayFns(L),!z&&(A=B&&B.onVnodeBeforeMount)&&invokeVNodeHook(A,W,f),toggleRecurse(l,!0),I&&G){const X=()=>{l.subTree=renderComponentRoot(l),G(I,l.subTree,l,v,null)};z?f.type.__asyncLoader().then(()=>!l.isUnmounted&&X()):X()}else{const X=l.subTree=renderComponentRoot(l);N(null,X,g,b,l,v,k),f.el=X.el}if(j&&queuePostRenderEffect(j,v),!z&&(A=B&&B.onVnodeMounted)){const X=f;queuePostRenderEffect(()=>invokeVNodeHook(A,W,X),v)}(f.shapeFlag&256||W&&isAsyncWrapper(W.vnode)&&W.vnode.shapeFlag&256)&&l.a&&queuePostRenderEffect(l.a,v),l.isMounted=!0,f=g=b=null}},R=l.effect=new ReactiveEffect(E,NOOP,()=>queueJob(w),l.scope),w=l.update=()=>{R.dirty&&R.run()};w.id=l.uid,toggleRecurse(l,!0),w()},K=(l,f,g)=>{f.component=l;const b=l.vnode.props;l.vnode=f,l.next=null,updateProps(l,f.props,b,g),updateSlots(l,f.children,g),pauseTracking(),flushPreFlushCbs(l),resetTracking()},q=(l,f,g,b,v,k,S,E,R=!1)=>{const w=l&&l.children,A=l?l.shapeFlag:0,I=f.children,{patchFlag:B,shapeFlag:L}=f;if(B>0){if(B&128){ue(w,I,g,b,v,k,S,E,R);return}else if(B&256){ce(w,I,g,b,v,k,S,E,R);return}}L&8?(A&16&&Q(w,v,k),I!==w&&u(g,I)):A&16?L&16?ue(w,I,g,b,v,k,S,E,R):Q(w,v,k,!0):(A&8&&u(g,""),L&16&&ne(I,g,b,v,k,S,E,R))},ce=(l,f,g,b,v,k,S,E,R)=>{l=l||EMPTY_ARR,f=f||EMPTY_ARR;const w=l.length,A=f.length,I=Math.min(w,A);let B;for(B=0;B<I;B++){const L=f[B]=R?cloneIfMounted(f[B]):normalizeVNode(f[B]);N(l[B],L,g,null,v,k,S,E,R)}w>A?Q(l,v,k,!0,!1,I):ne(f,g,b,v,k,S,E,R,I)},ue=(l,f,g,b,v,k,S,E,R)=>{let w=0;const A=f.length;let I=l.length-1,B=A-1;for(;w<=I&&w<=B;){const L=l[w],j=f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]);if(isSameVNodeType(L,j))N(L,j,g,null,v,k,S,E,R);else break;w++}for(;w<=I&&w<=B;){const L=l[I],j=f[B]=R?cloneIfMounted(f[B]):normalizeVNode(f[B]);if(isSameVNodeType(L,j))N(L,j,g,null,v,k,S,E,R);else break;I--,B--}if(w>I){if(w<=B){const L=B+1,j=L<A?f[L].el:b;for(;w<=B;)N(null,f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]),g,j,v,k,S,E,R),w++}}else if(w>B)for(;w<=I;)ee(l[w],v,k,!0),w++;else{const L=w,j=w,W=new Map;for(w=j;w<=B;w++){const te=f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]);te.key!=null&&W.set(te.key,w)}let z,X=0;const re=B-j+1;let me=!1,be=0;const ve=new Array(re);for(w=0;w<re;w++)ve[w]=0;for(w=L;w<=I;w++){const te=l[w];if(X>=re){ee(te,v,k,!0);continue}let ae;if(te.key!=null)ae=W.get(te.key);else for(z=j;z<=B;z++)if(ve[z-j]===0&&isSameVNodeType(te,f[z])){ae=z;break}ae===void 0?ee(te,v,k,!0):(ve[ae-j]=w+1,ae>=be?be=ae:me=!0,N(te,f[ae],g,null,v,k,S,E,R),X++)}const xe=me?getSequence(ve):EMPTY_ARR;for(z=xe.length-1,w=re-1;w>=0;w--){const te=j+w,ae=f[te],we=te+1<A?f[te+1].el:b;ve[w]===0?N(null,ae,g,we,v,k,S,E,R):me&&(z<0||w!==xe[z]?ie(ae,g,we,2):z--)}}},ie=(l,f,g,b,v=null)=>{const{el:k,type:S,transition:E,children:R,shapeFlag:w}=l;if(w&6){ie(l.component.subTree,f,g,b);return}if(w&128){l.suspense.move(f,g,b);return}if(w&64){S.move(l,f,g,O);return}if(S===Fragment){r(k,f,g);for(let I=0;I<R.length;I++)ie(R[I],f,g,b);r(l.anchor,f,g);return}if(S===Static){V(l,f,g);return}if(b!==2&&w&1&&E)if(b===0)E.beforeEnter(k),r(k,f,g),queuePostRenderEffect(()=>E.enter(k),v);else{const{leave:I,delayLeave:B,afterLeave:L}=E,j=()=>r(k,f,g),W=()=>{I(k,()=>{j(),L&&L()})};B?B(k,j,W):W()}else r(k,f,g)},ee=(l,f,g,b=!1,v=!1)=>{const{type:k,props:S,ref:E,children:R,dynamicChildren:w,shapeFlag:A,patchFlag:I,dirs:B}=l;if(E!=null&&setRef(E,null,g,l,!0),A&256){f.ctx.deactivate(l);return}const L=A&1&&B,j=!isAsyncWrapper(l);let W;if(j&&(W=S&&S.onVnodeBeforeUnmount)&&invokeVNodeHook(W,f,l),A&6)ye(l.component,g,b);else{if(A&128){l.suspense.unmount(g,b);return}L&&invokeDirectiveHook(l,null,f,"beforeUnmount"),A&64?l.type.remove(l,f,g,v,O,b):w&&(k!==Fragment||I>0&&I&64)?Q(w,f,g,!1,!0):(k===Fragment&&I&384||!v&&A&16)&&Q(R,f,g),b&&he(l)}(j&&(W=S&&S.onVnodeUnmounted)||L)&&queuePostRenderEffect(()=>{W&&invokeVNodeHook(W,f,l),L&&invokeDirectiveHook(l,null,f,"unmounted")},g)},he=l=>{const{type:f,el:g,anchor:b,transition:v}=l;if(f===Fragment){_e(g,b);return}if(f===Static){H(l);return}const k=()=>{s(g),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(l.shapeFlag&1&&v&&!v.persisted){const{leave:S,delayLeave:E}=v,R=()=>S(g,k);E?E(l.el,k,R):R()}else k()},_e=(l,f)=>{let g;for(;l!==f;)g=m(l),s(l),l=g;s(f)},ye=(l,f,g)=>{const{bum:b,scope:v,update:k,subTree:S,um:E}=l;b&&invokeArrayFns(b),v.stop(),k&&(k.active=!1,ee(S,l,f,g)),E&&queuePostRenderEffect(E,f),queuePostRenderEffect(()=>{l.isUnmounted=!0},f),f&&f.pendingBranch&&!f.isUnmounted&&l.asyncDep&&!l.asyncResolved&&l.suspenseId===f.pendingId&&(f.deps--,f.deps===0&&f.resolve())},Q=(l,f,g,b=!1,v=!1,k=0)=>{for(let S=k;S<l.length;S++)ee(l[S],f,g,b,v)},y=l=>l.shapeFlag&6?y(l.component.subTree):l.shapeFlag&128?l.suspense.next():m(l.anchor||l.el);let T=!1;const P=(l,f,g)=>{l==null?f._vnode&&ee(f._vnode,null,null,!0):N(f._vnode||null,l,f,null,null,null,g),T||(T=!0,flushPreFlushCbs(),flushPostFlushCbs(),T=!1),f._vnode=l},O={p:N,um:ee,m:ie,r:he,mt:ge,mc:ne,pc:q,pbc:se,n:y,o:e};let D,G;return t&&([D,G]=t(O)),{render:P,hydrate:D,createApp:createAppAPI(P,D)}}function resolveChildrenNamespace({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function toggleRecurse({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function needTransition(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function traverseStaticChildren(e,t,n=!1){const r=e.children,s=t.children;if(isArray$1(r)&&isArray$1(s))for(let o=0;o<r.length;o++){const i=r[o];let a=s[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[o]=cloneIfMounted(s[o]),a.el=i.el),n||traverseStaticChildren(i,a)),a.type===Text&&(a.el=i.el)}}function getSequence(e){const t=e.slice(),n=[0];let r,s,o,i,a;const c=e.length;for(r=0;r<c;r++){const d=e[r];if(d!==0){if(s=n[n.length-1],e[s]<d){t[r]=s,n.push(r);continue}for(o=0,i=n.length-1;o<i;)a=o+i>>1,e[n[a]]<d?o=a+1:i=a;d<e[n[o]]&&(o>0&&(t[r]=n[o-1]),n[o]=r)}}for(o=n.length,i=n[o-1];o-- >0;)n[o]=i,i=t[i];return n}function locateNonHydratedAsyncRoot(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:locateNonHydratedAsyncRoot(t)}const isTeleport=e=>e.__isTeleport,Fragment=Symbol.for("v-fgt"),Text=Symbol.for("v-txt"),Comment=Symbol.for("v-cmt"),Static=Symbol.for("v-stc"),blockStack=[];let currentBlock=null;function openBlock(e=!1){blockStack.push(currentBlock=e?null:[])}function closeBlock(){blockStack.pop(),currentBlock=blockStack[blockStack.length-1]||null}let isBlockTreeEnabled=1;function setBlockTracking(e){isBlockTreeEnabled+=e}function setupBlock(e){return e.dynamicChildren=isBlockTreeEnabled>0?currentBlock||EMPTY_ARR:null,closeBlock(),isBlockTreeEnabled>0&&currentBlock&&currentBlock.push(e),e}function createElementBlock(e,t,n,r,s,o){return setupBlock(createBaseVNode(e,t,n,r,s,o,!0))}function createBlock(e,t,n,r,s){return setupBlock(createVNode(e,t,n,r,s,!0))}function isVNode(e){return e?e.__v_isVNode===!0:!1}function isSameVNodeType(e,t){return e.type===t.type&&e.key===t.key}const InternalObjectKey="__vInternal",normalizeKey=({key:e})=>e??null,normalizeRef=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?isString(e)||isRef(e)||isFunction(e)?{i:currentRenderingInstance,r:e,k:t,f:!!n}:e:null);function createBaseVNode(e,t=null,n=null,r=0,s=null,o=e===Fragment?0:1,i=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&normalizeKey(t),ref:t&&normalizeRef(t),scopeId:currentScopeId,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:currentRenderingInstance};return a?(normalizeChildren(c,n),o&128&&e.normalize(c)):n&&(c.shapeFlag|=isString(n)?8:16),isBlockTreeEnabled>0&&!i&&currentBlock&&(c.patchFlag>0||o&6)&&c.patchFlag!==32&&currentBlock.push(c),c}const createVNode=_createVNode;function _createVNode(e,t=null,n=null,r=0,s=null,o=!1){if((!e||e===NULL_DYNAMIC_COMPONENT)&&(e=Comment),isVNode(e)){const a=cloneVNode(e,t,!0);return n&&normalizeChildren(a,n),isBlockTreeEnabled>0&&!o&&currentBlock&&(a.shapeFlag&6?currentBlock[currentBlock.indexOf(e)]=a:currentBlock.push(a)),a.patchFlag|=-2,a}if(isClassComponent(e)&&(e=e.__vccOpts),t){t=guardReactiveProps(t);let{class:a,style:c}=t;a&&!isString(a)&&(t.class=normalizeClass(a)),isObject(c)&&(isProxy(c)&&!isArray$1(c)&&(c=extend({},c)),t.style=normalizeStyle(c))}const i=isString(e)?1:isSuspense(e)?128:isTeleport(e)?64:isObject(e)?4:isFunction(e)?2:0;return createBaseVNode(e,t,n,r,s,i,o,!0)}function guardReactiveProps(e){return e?isProxy(e)||InternalObjectKey in e?extend({},e):e:null}function cloneVNode(e,t,n=!1){const{props:r,ref:s,patchFlag:o,children:i}=e,a=t?mergeProps(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&normalizeKey(a),ref:t&&t.ref?n&&s?isArray$1(s)?s.concat(normalizeRef(t)):[s,normalizeRef(t)]:normalizeRef(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fragment?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&cloneVNode(e.ssContent),ssFallback:e.ssFallback&&cloneVNode(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function createTextVNode(e=" ",t=0){return createVNode(Text,null,e,t)}function createStaticVNode(e,t){const n=createVNode(Static,null,e);return n.staticCount=t,n}function normalizeVNode(e){return e==null||typeof e=="boolean"?createVNode(Comment):isArray$1(e)?createVNode(Fragment,null,e.slice()):typeof e=="object"?cloneIfMounted(e):createVNode(Text,null,String(e))}function cloneIfMounted(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:cloneVNode(e)}function normalizeChildren(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(isArray$1(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),normalizeChildren(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!(InternalObjectKey in t)?t._ctx=currentRenderingInstance:s===3&&currentRenderingInstance&&(currentRenderingInstance.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else isFunction(t)?(t={default:t,_ctx:currentRenderingInstance},n=32):(t=String(t),r&64?(n=16,t=[createTextVNode(t)]):n=8);e.children=t,e.shapeFlag|=n}function mergeProps(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=normalizeClass([t.class,r.class]));else if(s==="style")t.style=normalizeStyle([t.style,r.style]);else if(isOn(s)){const o=t[s],i=r[s];i&&o!==i&&!(isArray$1(o)&&o.includes(i))&&(t[s]=o?[].concat(o,i):i)}else s!==""&&(t[s]=r[s])}return t}function invokeVNodeHook(e,t,n,r=null){callWithAsyncErrorHandling(e,t,7,[n,r])}const emptyAppContext=createAppContext();let uid=0;function createComponentInstance(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||emptyAppContext,o={uid:uid++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new EffectScope(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:normalizePropsOptions(r,s),emitsOptions:normalizeEmitsOptions(r,s),emit:null,emitted:null,propsDefaults:EMPTY_OBJ,inheritAttrs:r.inheritAttrs,ctx:EMPTY_OBJ,data:EMPTY_OBJ,props:EMPTY_OBJ,attrs:EMPTY_OBJ,slots:EMPTY_OBJ,refs:EMPTY_OBJ,setupState:EMPTY_OBJ,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=emit.bind(null,o),e.ce&&e.ce(o),o}let currentInstance=null,internalSetCurrentInstance,setInSSRSetupState;{const e=getGlobalThis(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),o=>{s.length>1?s.forEach(i=>i(o)):s[0](o)}};internalSetCurrentInstance=t("__VUE_INSTANCE_SETTERS__",n=>currentInstance=n),setInSSRSetupState=t("__VUE_SSR_SETTERS__",n=>isInSSRComponentSetup=n)}const setCurrentInstance=e=>{const t=currentInstance;return internalSetCurrentInstance(e),e.scope.on(),()=>{e.scope.off(),internalSetCurrentInstance(t)}},unsetCurrentInstance=()=>{currentInstance&&currentInstance.scope.off(),internalSetCurrentInstance(null)};function isStatefulComponent(e){return e.vnode.shapeFlag&4}let isInSSRComponentSetup=!1;function setupComponent(e,t=!1){t&&setInSSRSetupState(t);const{props:n,children:r}=e.vnode,s=isStatefulComponent(e);initProps(e,n,s,t),initSlots(e,r);const o=s?setupStatefulComponent(e,t):void 0;return t&&setInSSRSetupState(!1),o}function setupStatefulComponent(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=markRaw(new Proxy(e.ctx,PublicInstanceProxyHandlers));const{setup:r}=n;if(r){const s=e.setupContext=r.length>1?createSetupContext(e):null,o=setCurrentInstance(e);pauseTracking();const i=callWithErrorHandling(r,e,0,[e.props,s]);if(resetTracking(),o(),isPromise(i)){if(i.then(unsetCurrentInstance,unsetCurrentInstance),t)return i.then(a=>{handleSetupResult(e,a,t)}).catch(a=>{handleError(a,e,0)});e.asyncDep=i}else handleSetupResult(e,i,t)}else finishComponentSetup(e,t)}function handleSetupResult(e,t,n){isFunction(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:isObject(t)&&(e.setupState=proxyRefs(t)),finishComponentSetup(e,n)}let compile;function finishComponentSetup(e,t,n){const r=e.type;if(!e.render){if(!t&&compile&&!r.render){const s=r.template||resolveMergedOptions(e).template;if(s){const{isCustomElement:o,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:c}=r,d=extend(extend({isCustomElement:o,delimiters:a},i),c);r.render=compile(s,d)}}e.render=r.render||NOOP}{const s=setCurrentInstance(e);pauseTracking();try{applyOptions(e)}finally{resetTracking(),s()}}}function getAttrsProxy(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return track(e,"get","$attrs"),t[n]}}))}function createSetupContext(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return getAttrsProxy(e)},slots:e.slots,emit:e.emit,expose:t}}function getExposeProxy(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(proxyRefs(markRaw(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in publicPropertiesMap)return publicPropertiesMap[n](e)},has(t,n){return n in t||n in publicPropertiesMap}}))}const classifyRE=/(?:^|[-_])(\w)/g,classify=e=>e.replace(classifyRE,t=>t.toUpperCase()).replace(/[-_]/g,"");function getComponentName(e,t=!0){return isFunction(e)?e.displayName||e.name:e.name||t&&e.__name}function formatComponentName(e,t,n=!1){let r=getComponentName(t);if(!r&&t.__file){const s=t.__file.match(/([^/\\]+)\.\w+$/);s&&(r=s[1])}if(!r&&e&&e.parent){const s=o=>{for(const i in o)if(o[i]===t)return i};r=s(e.components||e.parent.type.components)||s(e.appContext.components)}return r?classify(r):n?"App":"Anonymous"}function isClassComponent(e){return isFunction(e)&&"__vccOpts"in e}const computed=(e,t)=>computed$1(e,t,isInSSRComponentSetup);function h(e,t,n){const r=arguments.length;return r===2?isObject(t)&&!isArray$1(t)?isVNode(t)?createVNode(e,null,[t]):createVNode(e,t):createVNode(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&isVNode(n)&&(n=[n]),createVNode(e,t,n))}const version="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const svgNS="http://www.w3.org/2000/svg",mathmlNS="http://www.w3.org/1998/Math/MathML",doc=typeof document<"u"?document:null,templateContainer=doc&&doc.createElement("template"),nodeOps={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?doc.createElementNS(svgNS,e):t==="mathml"?doc.createElementNS(mathmlNS,e):doc.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>doc.createTextNode(e),createComment:e=>doc.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>doc.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,o){const i=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{templateContainer.innerHTML=r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e;const a=templateContainer.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},vtcKey=Symbol("_vtc");function patchClass(e,t,n){const r=e[vtcKey];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const vShowOldKey=Symbol("_vod"),CSS_VAR_TEXT=Symbol("");function patchStyle(e,t,n){const r=e.style,s=r.display,o=isString(n);if(n&&!o){if(t&&!isString(t))for(const i in t)n[i]==null&&setStyle(r,i,"");for(const i in n)setStyle(r,i,n[i])}else if(o){if(t!==n){const i=r[CSS_VAR_TEXT];i&&(n+=";"+i),r.cssText=n}}else t&&e.removeAttribute("style");vShowOldKey in e&&(r.display=s)}const importantRE=/\s*!important$/;function setStyle(e,t,n){if(isArray$1(n))n.forEach(r=>setStyle(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=autoPrefix(e,t);importantRE.test(n)?e.setProperty(hyphenate(r),n.replace(importantRE,""),"important"):e[r]=n}}const prefixes=["Webkit","Moz","ms"],prefixCache={};function autoPrefix(e,t){const n=prefixCache[t];if(n)return n;let r=camelize(t);if(r!=="filter"&&r in e)return prefixCache[t]=r;r=capitalize(r);for(let s=0;s<prefixes.length;s++){const o=prefixes[s]+r;if(o in e)return prefixCache[t]=o}return t}const xlinkNS="http://www.w3.org/1999/xlink";function patchAttr(e,t,n,r,s){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(xlinkNS,t.slice(6,t.length)):e.setAttributeNS(xlinkNS,t,n);else{const o=isSpecialBooleanAttr(t);n==null||o&&!includeBooleanAttr(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n)}}function patchDOMProp(e,t,n,r,s,o,i){if(t==="innerHTML"||t==="textContent"){r&&i(r,s,o),e[t]=n??"";return}const a=e.tagName;if(t==="value"&&a!=="PROGRESS"&&!a.includes("-")){e._value=n;const d=a==="OPTION"?e.getAttribute("value"):e.value,u=n??"";d!==u&&(e.value=u),n==null&&e.removeAttribute(t);return}let c=!1;if(n===""||n==null){const d=typeof e[t];d==="boolean"?n=includeBooleanAttr(n):n==null&&d==="string"?(n="",c=!0):d==="number"&&(n=0,c=!0)}try{e[t]=n}catch{}c&&e.removeAttribute(t)}function addEventListener(e,t,n,r){e.addEventListener(t,n,r)}function removeEventListener(e,t,n,r){e.removeEventListener(t,n,r)}const veiKey=Symbol("_vei");function patchEvent(e,t,n,r,s=null){const o=e[veiKey]||(e[veiKey]={}),i=o[t];if(r&&i)i.value=r;else{const[a,c]=parseName(t);if(r){const d=o[t]=createInvoker(r,s);addEventListener(e,a,d,c)}else i&&(removeEventListener(e,a,i,c),o[t]=void 0)}}const optionsModifierRE=/(?:Once|Passive|Capture)$/;function parseName(e){let t;if(optionsModifierRE.test(e)){t={};let r;for(;r=e.match(optionsModifierRE);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):hyphenate(e.slice(2)),t]}let cachedNow=0;const p=Promise.resolve(),getNow=()=>cachedNow||(p.then(()=>cachedNow=0),cachedNow=Date.now());function createInvoker(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;callWithAsyncErrorHandling(patchStopImmediatePropagation(r,n.value),t,5,[r])};return n.value=e,n.attached=getNow(),n}function patchStopImmediatePropagation(e,t){if(isArray$1(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const isNativeOn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,patchProp=(e,t,n,r,s,o,i,a,c)=>{const d=s==="svg";t==="class"?patchClass(e,r,d):t==="style"?patchStyle(e,n,r):isOn(t)?isModelListener(t)||patchEvent(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):shouldSetAsProp(e,t,r,d))?patchDOMProp(e,t,r,o,i,a,c):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),patchAttr(e,t,r,d))};function shouldSetAsProp(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&isNativeOn(t)&&isFunction(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return isNativeOn(t)&&isString(n)?!1:t in e}const getModelAssigner=e=>{const t=e.props["onUpdate:modelValue"]||!1;return isArray$1(t)?n=>invokeArrayFns(t,n):t};function onCompositionStart(e){e.target.composing=!0}function onCompositionEnd(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const assignKey=Symbol("_assign"),vModelText={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[assignKey]=getModelAssigner(s);const o=r||s.props&&s.props.type==="number";addEventListener(e,t?"change":"input",i=>{if(i.target.composing)return;let a=e.value;n&&(a=a.trim()),o&&(a=looseToNumber(a)),e[assignKey](a)}),n&&addEventListener(e,"change",()=>{e.value=e.value.trim()}),t||(addEventListener(e,"compositionstart",onCompositionStart),addEventListener(e,"compositionend",onCompositionEnd),addEventListener(e,"change",onCompositionEnd))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:r,number:s}},o){if(e[assignKey]=getModelAssigner(o),e.composing)return;const i=s||e.type==="number"?looseToNumber(e.value):e.value,a=t??"";i!==a&&(document.activeElement===e&&e.type!=="range"&&(n||r&&e.value.trim()===a)||(e.value=a))}},systemModifiers=["ctrl","shift","alt","meta"],modifierGuards={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>systemModifiers.some(n=>e[`${n}Key`]&&!t.includes(n))},withModifiers=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(s,...o)=>{for(let i=0;i<t.length;i++){const a=modifierGuards[t[i]];if(a&&a(s,t))return}return e(s,...o)})},rendererOptions=extend({patchProp},nodeOps);let renderer;function ensureRenderer(){return renderer||(renderer=createRenderer(rendererOptions))}const createApp=(...e)=>{const t=ensureRenderer().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=normalizeContainer(r);if(!s)return;const o=t._component;!isFunction(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.innerHTML="";const i=n(s,!1,resolveRootNamespace(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t};function resolveRootNamespace(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function normalizeContainer(e){return isString(e)?document.querySelector(e):e}const parents=new Set,coords=new WeakMap,siblings=new WeakMap,animations=new WeakMap,intersections=new WeakMap,intervals=new WeakMap,options=new WeakMap,debounces=new WeakMap,enabled=new WeakSet;let root,scrollX=0,scrollY=0;const TGT="__aa_tgt",DEL="__aa_del",NEW="__aa_new",handleMutations=e=>{const t=getElements(e);t&&t.forEach(n=>animate(n))},handleResizes=e=>{e.forEach(t=>{t.target===root&&updateAllPos(),coords.has(t.target)&&updatePos(t.target)})};function observePosition(e){const t=intersections.get(e);t==null||t.disconnect();let n=coords.get(e),r=0;const s=5;n||(n=getCoords(e),coords.set(e,n));const{offsetWidth:o,offsetHeight:i}=root,c=[n.top-s,o-(n.left+s+n.width),i-(n.top+s+n.height),n.left-s].map(u=>`${-1*Math.floor(u)}px`).join(" "),d=new IntersectionObserver(()=>{++r>1&&updatePos(e)},{root,threshold:1,rootMargin:c});d.observe(e),intersections.set(e,d)}function updatePos(e){clearTimeout(debounces.get(e));const t=getOptions(e),n=isPlugin(t)?500:t.duration;debounces.set(e,setTimeout(async()=>{const r=animations.get(e);try{await(r==null?void 0:r.finished),coords.set(e,getCoords(e)),observePosition(e)}catch{}},n))}function updateAllPos(){clearTimeout(debounces.get(root)),debounces.set(root,setTimeout(()=>{parents.forEach(e=>forEach(e,t=>lowPriority(()=>updatePos(t))))},100))}function poll(e){setTimeout(()=>{intervals.set(e,setInterval(()=>lowPriority(updatePos.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function lowPriority(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}let mutations,resize;typeof window<"u"&&(root=document.documentElement,mutations=new MutationObserver(handleMutations),resize=new ResizeObserver(handleResizes),window.addEventListener("scroll",()=>{scrollY=window.scrollY,scrollX=window.scrollX}),resize.observe(root));function getElements(e){return e.reduce((r,s)=>[...r,...Array.from(s.addedNodes),...Array.from(s.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,s)=>{if(r===!1)return!1;if(s.target instanceof Element){if(target(s.target),!r.has(s.target)){r.add(s.target);for(let o=0;o<s.target.children.length;o++){const i=s.target.children.item(o);if(i){if(DEL in i)return!1;target(s.target,i),r.add(i)}}}if(s.removedNodes.length)for(let o=0;o<s.removedNodes.length;o++){const i=s.removedNodes[o];if(DEL in i)return!1;i instanceof Element&&(r.add(i),target(s.target,i),siblings.set(i,[s.previousSibling,s.nextSibling]))}}return r},new Set)}function target(e,t){!t&&!(TGT in e)?Object.defineProperty(e,TGT,{value:e}):t&&!(TGT in t)&&Object.defineProperty(t,TGT,{value:e})}function animate(e){var t;const n=e.isConnected,r=coords.has(e);n&&siblings.has(e)&&siblings.delete(e),animations.has(e)&&((t=animations.get(e))===null||t===void 0||t.cancel()),NEW in e?add(e):r&&n?remain(e):r&&!n?remove(e):add(e)}function raw(e){return Number(e.replace(/[^0-9.\-]/g,""))}function getScrollOffset(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function getCoords(e){const t=e.getBoundingClientRect(),{x:n,y:r}=getScrollOffset(e);return{top:t.top+r,left:t.left+n,width:t.width,height:t.height}}function getTransitionSizes(e,t,n){let r=t.width,s=t.height,o=n.width,i=n.height;const a=getComputedStyle(e);if(a.getPropertyValue("box-sizing")==="content-box"){const d=raw(a.paddingTop)+raw(a.paddingBottom)+raw(a.borderTopWidth)+raw(a.borderBottomWidth),u=raw(a.paddingLeft)+raw(a.paddingRight)+raw(a.borderRightWidth)+raw(a.borderLeftWidth);r-=u,o-=u,s-=d,i-=d}return[r,o,s,i].map(Math.round)}function getOptions(e){return TGT in e&&options.has(e[TGT])?options.get(e[TGT]):{duration:250,easing:"ease-in-out"}}function getTarget(e){if(TGT in e)return e[TGT]}function isEnabled(e){const t=getTarget(e);return t?enabled.has(t):!1}function forEach(e,...t){t.forEach(n=>n(e,options.has(e)));for(let n=0;n<e.children.length;n++){const r=e.children.item(n);r&&t.forEach(s=>s(r,options.has(r)))}}function getPluginTuple(e){return Array.isArray(e)?e:[e]}function isPlugin(e){return typeof e=="function"}function remain(e){const t=coords.get(e),n=getCoords(e);if(!isEnabled(e))return coords.set(e,n);let r;if(!t)return;const s=getOptions(e);if(typeof s!="function"){const o=t.left-n.left,i=t.top-n.top,[a,c,d,u]=getTransitionSizes(e,t,n),_={transform:`translate(${o}px, ${i}px)`},m={transform:"translate(0, 0)"};a!==c&&(_.width=`${a}px`,m.width=`${c}px`),d!==u&&(_.height=`${d}px`,m.height=`${u}px`),r=e.animate([_,m],{duration:s.duration,easing:s.easing})}else{const[o]=getPluginTuple(s(e,"remain",t,n));r=new Animation(o),r.play()}animations.set(e,r),coords.set(e,n),r.addEventListener("finish",updatePos.bind(null,e))}function add(e){NEW in e&&delete e[NEW];const t=getCoords(e);coords.set(e,t);const n=getOptions(e);if(!isEnabled(e))return;let r;if(typeof n!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:n.duration*1.5,easing:"ease-in"});else{const[s]=getPluginTuple(n(e,"add",t));r=new Animation(s),r.play()}animations.set(e,r),r.addEventListener("finish",updatePos.bind(null,e))}function cleanUp(e,t){var n;e.remove(),coords.delete(e),siblings.delete(e),animations.delete(e),(n=intersections.get(e))===null||n===void 0||n.disconnect(),setTimeout(()=>{if(DEL in e&&delete e[DEL],Object.defineProperty(e,NEW,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(const r in t)e.style[r]=""},0)}function remove(e){var t;if(!siblings.has(e)||!coords.has(e))return;const[n,r]=siblings.get(e);Object.defineProperty(e,DEL,{value:!0,configurable:!0});const s=window.scrollX,o=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):n&&n.parentNode?n.parentNode.appendChild(e):(t=getTarget(e))===null||t===void 0||t.appendChild(e),!isEnabled(e))return cleanUp(e);const[i,a,c,d]=deletePosition(e),u=getOptions(e),_=coords.get(e);(s!==scrollX||o!==scrollY)&&adjustScroll(e,s,o,u);let m,x={position:"absolute",top:`${i}px`,left:`${a}px`,width:`${c}px`,height:`${d}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!isPlugin(u))Object.assign(e.style,x),m=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"});else{const[C,N]=getPluginTuple(u(e,"remove",_));(N==null?void 0:N.styleReset)!==!1&&(x=(N==null?void 0:N.styleReset)||x,Object.assign(e.style,x)),m=new Animation(C),m.play()}animations.set(e,m),m.addEventListener("finish",cleanUp.bind(null,e,x))}function adjustScroll(e,t,n,r){const s=scrollX-t,o=scrollY-n,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(root).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+s,window.scrollY+o),!e.parentElement)return;const c=e.parentElement;let d=c.clientHeight,u=c.clientWidth;const _=performance.now();function m(){requestAnimationFrame(()=>{if(!isPlugin(r)){const x=d-c.clientHeight,C=u-c.clientWidth;_+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-C,top:window.scrollY-x}),d=c.clientHeight,u=c.clientWidth,m()):document.documentElement.style.scrollBehavior=i}})}m()}function deletePosition(e){const t=coords.get(e),[n,,r]=getTransitionSizes(e,t,getCoords(e));let s=e.parentElement;for(;s&&(getComputedStyle(s).position==="static"||s instanceof HTMLBodyElement);)s=s.parentElement;s||(s=document.body);const o=getComputedStyle(s),i=coords.get(s)||getCoords(s),a=Math.round(t.top-i.top)-raw(o.borderTopWidth),c=Math.round(t.left-i.left)-raw(o.borderLeftWidth);return[a,c,n,r]}function autoAnimate(e,t={}){return mutations&&resize&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!isPlugin(t)&&!t.disrespectUserMotionPreference||(enabled.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),forEach(e,updatePos,poll,s=>resize==null?void 0:resize.observe(s)),isPlugin(t)?options.set(e,t):options.set(e,{duration:250,easing:"ease-in-out",...t}),mutations.observe(e,{childList:!0}),parents.add(e))),Object.freeze({parent:e,enable:()=>{enabled.add(e)},disable:()=>{enabled.delete(e)},isEnabled:()=>enabled.has(e)})}const vAutoAnimate$1={mounted:(e,t)=>{autoAnimate(e,t.value||{})},getSSRProps:()=>({})},vAutoAnimate=vAutoAnimate$1,autoAnimatePlugin={install(e){e.directive("auto-animate",vAutoAnimate)}},initAutoAnimate=e=>e.use(autoAnimatePlugin);/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const isBrowser=typeof window<"u";function isESModule(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const assign=Object.assign;function applyToParams(e,t){const n={};for(const r in t){const s=t[r];n[r]=isArray(s)?s.map(e):e(s)}return n}const noop=()=>{},isArray=Array.isArray,TRAILING_SLASH_RE=/\/$/,removeTrailingSlash=e=>e.replace(TRAILING_SLASH_RE,"");function parseURL(e,t,n="/"){let r,s={},o="",i="";const a=t.indexOf("#");let c=t.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=t.slice(0,c),o=t.slice(c+1,a>-1?a:t.length),s=e(o)),a>-1&&(r=r||t.slice(0,a),i=t.slice(a,t.length)),r=resolveRelativePath(r??t,n),{fullPath:r+(o&&"?")+o+i,path:r,query:s,hash:i}}function stringifyURL(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function stripBase(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function isSameRouteLocation(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&isSameRouteRecord(t.matched[r],n.matched[s])&&isSameRouteLocationParams(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function isSameRouteRecord(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function isSameRouteLocationParams(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!isSameRouteLocationParamsValue(e[n],t[n]))return!1;return!0}function isSameRouteLocationParamsValue(e,t){return isArray(e)?isEquivalentArray(e,t):isArray(t)?isEquivalentArray(t,e):e===t}function isEquivalentArray(e,t){return isArray(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function resolveRelativePath(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let o=n.length-1,i,a;for(i=0;i<r.length;i++)if(a=r[i],a!==".")if(a==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(i-(i===r.length?1:0)).join("/")}var NavigationType;(function(e){e.pop="pop",e.push="push"})(NavigationType||(NavigationType={}));var NavigationDirection;(function(e){e.back="back",e.forward="forward",e.unknown=""})(NavigationDirection||(NavigationDirection={}));function normalizeBase(e){if(!e)if(isBrowser){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),removeTrailingSlash(e)}const BEFORE_HASH_RE=/^[^#]+#/;function createHref(e,t){return e.replace(BEFORE_HASH_RE,"#")+t}function getElementPosition(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=getElementPosition(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function getScrollKey(e,t){return(history.state?history.state.position-t:-1)+e}const scrollPositions=new Map;function saveScrollPosition(e,t){scrollPositions.set(e,t)}function getSavedScrollPosition(e){const t=scrollPositions.get(e);return scrollPositions.delete(e),t}let createBaseLocation=()=>location.protocol+"//"+location.host;function createCurrentLocation(e,t){const{pathname:n,search:r,hash:s}=t,o=e.indexOf("#");if(o>-1){let a=s.includes(e.slice(o))?e.slice(o).length:1,c=s.slice(a);return c[0]!=="/"&&(c="/"+c),stripBase(c,"")}return stripBase(n,e)+r+s}function useHistoryListeners(e,t,n,r){let s=[],o=[],i=null;const a=({state:m})=>{const x=createCurrentLocation(e,location),C=n.value,N=t.value;let M=0;if(m){if(n.value=x,t.value=m,i&&i===C){i=null;return}M=N?m.position-N.position:0}else r(x);s.forEach($=>{$(n.value,C,{delta:M,type:NavigationType.pop,direction:M?M>0?NavigationDirection.forward:NavigationDirection.back:NavigationDirection.unknown})})};function c(){i=n.value}function d(m){s.push(m);const x=()=>{const C=s.indexOf(m);C>-1&&s.splice(C,1)};return o.push(x),x}function u(){const{history:m}=window;m.state&&m.replaceState(assign({},m.state,{scroll:computeScrollPosition()}),"")}function _(){for(const m of o)m();o=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:c,listen:d,destroy:_}}function buildState(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?computeScrollPosition():null}}function useHistoryStateNavigation(e){const{history:t,location:n}=window,r={value:createCurrentLocation(e,n)},s={value:t.state};s.value||o(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function o(c,d,u){const _=e.indexOf("#"),m=_>-1?(n.host&&document.querySelector("base")?e:e.slice(_))+c:createBaseLocation()+e+c;try{t[u?"replaceState":"pushState"](d,"",m),s.value=d}catch(x){console.error(x),n[u?"replace":"assign"](m)}}function i(c,d){const u=assign({},t.state,buildState(s.value.back,c,s.value.forward,!0),d,{position:s.value.position});o(c,u,!0),r.value=c}function a(c,d){const u=assign({},s.value,t.state,{forward:c,scroll:computeScrollPosition()});o(u.current,u,!0);const _=assign({},buildState(r.value,c,null),{position:u.position+1},d);o(c,_,!1),r.value=c}return{location:r,state:s,push:a,replace:i}}function createWebHistory(e){e=normalizeBase(e);const t=useHistoryStateNavigation(e),n=useHistoryListeners(e,t.state,t.location,t.replace);function r(o,i=!0){i||n.pauseListeners(),history.go(o)}const s=assign({location:"",base:e,go:r,createHref:createHref.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function isRouteLocation(e){return typeof e=="string"||e&&typeof e=="object"}function isRouteName(e){return typeof e=="string"||typeof e=="symbol"}const START_LOCATION_NORMALIZED={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},NavigationFailureSymbol=Symbol("");var NavigationFailureType;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(NavigationFailureType||(NavigationFailureType={}));function createRouterError(e,t){return assign(new Error,{type:e,[NavigationFailureSymbol]:!0},t)}function isNavigationFailure(e,t){return e instanceof Error&&NavigationFailureSymbol in e&&(t==null||!!(e.type&t))}const BASE_PARAM_PATTERN="[^/]+?",BASE_PATH_PARSER_OPTIONS={sensitive:!1,strict:!1,start:!0,end:!0},REGEX_CHARS_RE=/[.+*?^${}()[\]/\\]/g;function tokensToParser(e,t){const n=assign({},BASE_PATH_PARSER_OPTIONS,t),r=[];let s=n.start?"^":"";const o=[];for(const d of e){const u=d.length?[]:[90];n.strict&&!d.length&&(s+="/");for(let _=0;_<d.length;_++){const m=d[_];let x=40+(n.sensitive?.25:0);if(m.type===0)_||(s+="/"),s+=m.value.replace(REGEX_CHARS_RE,"\\$&"),x+=40;else if(m.type===1){const{value:C,repeatable:N,optional:M,regexp:$}=m;o.push({name:C,repeatable:N,optional:M});const F=$||BASE_PARAM_PATTERN;if(F!==BASE_PARAM_PATTERN){x+=10;try{new RegExp(`(${F})`)}catch(H){throw new Error(`Invalid custom RegExp for param "${C}" (${F}): `+H.message)}}let V=N?`((?:${F})(?:/(?:${F}))*)`:`(${F})`;_||(V=M&&d.length<2?`(?:/${V})`:"/"+V),M&&(V+="?"),s+=V,x+=20,M&&(x+=-8),N&&(x+=-20),F===".*"&&(x+=-50)}u.push(x)}r.push(u)}if(n.strict&&n.end){const d=r.length-1;r[d][r[d].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const i=new RegExp(s,n.sensitive?"":"i");function a(d){const u=d.match(i),_={};if(!u)return null;for(let m=1;m<u.length;m++){const x=u[m]||"",C=o[m-1];_[C.name]=x&&C.repeatable?x.split("/"):x}return _}function c(d){let u="",_=!1;for(const m of e){(!_||!u.endsWith("/"))&&(u+="/"),_=!1;for(const x of m)if(x.type===0)u+=x.value;else if(x.type===1){const{value:C,repeatable:N,optional:M}=x,$=C in d?d[C]:"";if(isArray($)&&!N)throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);const F=isArray($)?$.join("/"):$;if(!F)if(M)m.length<2&&(u.endsWith("/")?u=u.slice(0,-1):_=!0);else throw new Error(`Missing required param "${C}"`);u+=F}}return u||"/"}return{re:i,score:r,keys:o,parse:a,stringify:c}}function compareScoreArray(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function comparePathParserScore(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const o=compareScoreArray(r[n],s[n]);if(o)return o;n++}if(Math.abs(s.length-r.length)===1){if(isLastScoreNegative(r))return 1;if(isLastScoreNegative(s))return-1}return s.length-r.length}function isLastScoreNegative(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ROOT_TOKEN={type:0,value:""},VALID_PARAM_RE=/[a-zA-Z0-9_]/;function tokenizePath(e){if(!e)return[[]];if(e==="/")return[[ROOT_TOKEN]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(x){throw new Error(`ERR (${n})/"${d}": ${x}`)}let n=0,r=n;const s=[];let o;function i(){o&&s.push(o),o=[]}let a=0,c,d="",u="";function _(){d&&(n===0?o.push({type:0,value:d}):n===1||n===2||n===3?(o.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:d,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),d="")}function m(){d+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(d&&_(),i()):c===":"?(_(),n=1):m();break;case 4:m(),n=r;break;case 1:c==="("?n=2:VALID_PARAM_RE.test(c)?m():(_(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:_(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${d}"`),_(),i(),s}function createRouteRecordMatcher(e,t,n){const r=tokensToParser(tokenizePath(e.path),n),s=assign(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function createRouterMatcher(e,t){const n=[],r=new Map;t=mergeOptions({strict:!1,end:!0,sensitive:!1},t);function s(u){return r.get(u)}function o(u,_,m){const x=!m,C=normalizeRouteRecord(u);C.aliasOf=m&&m.record;const N=mergeOptions(t,u),M=[C];if("alias"in u){const V=typeof u.alias=="string"?[u.alias]:u.alias;for(const H of V)M.push(assign({},C,{components:m?m.record.components:C.components,path:H,aliasOf:m?m.record:C}))}let $,F;for(const V of M){const{path:H}=V;if(_&&H[0]!=="/"){const Y=_.record.path,U=Y[Y.length-1]==="/"?"":"/";V.path=_.record.path+(H&&U+H)}if($=createRouteRecordMatcher(V,_,N),m?m.alias.push($):(F=F||$,F!==$&&F.alias.push($),x&&u.name&&!isAliasRecord($)&&i(u.name)),C.children){const Y=C.children;for(let U=0;U<Y.length;U++)o(Y[U],$,m&&m.children[U])}m=m||$,($.record.components&&Object.keys($.record.components).length||$.record.name||$.record.redirect)&&c($)}return F?()=>{i(F)}:noop}function i(u){if(isRouteName(u)){const _=r.get(u);_&&(r.delete(u),n.splice(n.indexOf(_),1),_.children.forEach(i),_.alias.forEach(i))}else{const _=n.indexOf(u);_>-1&&(n.splice(_,1),u.record.name&&r.delete(u.record.name),u.children.forEach(i),u.alias.forEach(i))}}function a(){return n}function c(u){let _=0;for(;_<n.length&&comparePathParserScore(u,n[_])>=0&&(u.record.path!==n[_].record.path||!isRecordChildOf(u,n[_]));)_++;n.splice(_,0,u),u.record.name&&!isAliasRecord(u)&&r.set(u.record.name,u)}function d(u,_){let m,x={},C,N;if("name"in u&&u.name){if(m=r.get(u.name),!m)throw createRouterError(1,{location:u});N=m.record.name,x=assign(paramsFromLocation(_.params,m.keys.filter(F=>!F.optional).map(F=>F.name)),u.params&&paramsFromLocation(u.params,m.keys.map(F=>F.name))),C=m.stringify(x)}else if("path"in u)C=u.path,m=n.find(F=>F.re.test(C)),m&&(x=m.parse(C),N=m.record.name);else{if(m=_.name?r.get(_.name):n.find(F=>F.re.test(_.path)),!m)throw createRouterError(1,{location:u,currentLocation:_});N=m.record.name,x=assign({},_.params,u.params),C=m.stringify(x)}const M=[];let $=m;for(;$;)M.unshift($.record),$=$.parent;return{name:N,path:C,params:x,matched:M,meta:mergeMetaFields(M)}}return e.forEach(u=>o(u)),{addRoute:o,resolve:d,removeRoute:i,getRoutes:a,getRecordMatcher:s}}function paramsFromLocation(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function normalizeRouteRecord(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:normalizeRecordProps(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function normalizeRecordProps(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function isAliasRecord(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function mergeMetaFields(e){return e.reduce((t,n)=>assign(t,n.meta),{})}function mergeOptions(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function isRecordChildOf(e,t){return t.children.some(n=>n===e||isRecordChildOf(e,n))}const HASH_RE=/#/g,AMPERSAND_RE=/&/g,SLASH_RE=/\//g,EQUAL_RE=/=/g,IM_RE=/\?/g,PLUS_RE=/\+/g,ENC_BRACKET_OPEN_RE=/%5B/g,ENC_BRACKET_CLOSE_RE=/%5D/g,ENC_CARET_RE=/%5E/g,ENC_BACKTICK_RE=/%60/g,ENC_CURLY_OPEN_RE=/%7B/g,ENC_PIPE_RE=/%7C/g,ENC_CURLY_CLOSE_RE=/%7D/g,ENC_SPACE_RE=/%20/g;function commonEncode(e){return encodeURI(""+e).replace(ENC_PIPE_RE,"|").replace(ENC_BRACKET_OPEN_RE,"[").replace(ENC_BRACKET_CLOSE_RE,"]")}function encodeHash(e){return commonEncode(e).replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryValue(e){return commonEncode(e).replace(PLUS_RE,"%2B").replace(ENC_SPACE_RE,"+").replace(HASH_RE,"%23").replace(AMPERSAND_RE,"%26").replace(ENC_BACKTICK_RE,"`").replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryKey(e){return encodeQueryValue(e).replace(EQUAL_RE,"%3D")}function encodePath(e){return commonEncode(e).replace(HASH_RE,"%23").replace(IM_RE,"%3F")}function encodeParam(e){return e==null?"":encodePath(e).replace(SLASH_RE,"%2F")}function decode(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function parseQuery(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<r.length;++s){const o=r[s].replace(PLUS_RE," "),i=o.indexOf("="),a=decode(i<0?o:o.slice(0,i)),c=i<0?null:decode(o.slice(i+1));if(a in t){let d=t[a];isArray(d)||(d=t[a]=[d]),d.push(c)}else t[a]=c}return t}function stringifyQuery(e){let t="";for(let n in e){const r=e[n];if(n=encodeQueryKey(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(isArray(r)?r.map(o=>o&&encodeQueryValue(o)):[r&&encodeQueryValue(r)]).forEach(o=>{o!==void 0&&(t+=(t.length?"&":"")+n,o!=null&&(t+="="+o))})}return t}function normalizeQuery(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=isArray(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const matchedRouteKey=Symbol(""),viewDepthKey=Symbol(""),routerKey=Symbol(""),routeLocationKey=Symbol(""),routerViewLocationKey=Symbol("");function useCallbacks(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function guardToPromiseFn(e,t,n,r,s){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((i,a)=>{const c=_=>{_===!1?a(createRouterError(4,{from:n,to:t})):_ instanceof Error?a(_):isRouteLocation(_)?a(createRouterError(2,{from:t,to:_})):(o&&r.enterCallbacks[s]===o&&typeof _=="function"&&o.push(_),i())},d=e.call(r&&r.instances[s],t,n,c);let u=Promise.resolve(d);e.length<3&&(u=u.then(c)),u.catch(_=>a(_))})}function extractComponentsGuards(e,t,n,r){const s=[];for(const o of e)for(const i in o.components){let a=o.components[i];if(!(t!=="beforeRouteEnter"&&!o.instances[i]))if(isRouteComponent(a)){const d=(a.__vccOpts||a)[t];d&&s.push(guardToPromiseFn(d,n,r,o,i))}else{let c=a();s.push(()=>c.then(d=>{if(!d)return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));const u=isESModule(d)?d.default:d;o.components[i]=u;const m=(u.__vccOpts||u)[t];return m&&guardToPromiseFn(m,n,r,o,i)()}))}}return s}function isRouteComponent(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function useLink(e){const t=inject(routerKey),n=inject(routeLocationKey),r=computed(()=>t.resolve(unref(e.to))),s=computed(()=>{const{matched:c}=r.value,{length:d}=c,u=c[d-1],_=n.matched;if(!u||!_.length)return-1;const m=_.findIndex(isSameRouteRecord.bind(null,u));if(m>-1)return m;const x=getOriginalPath(c[d-2]);return d>1&&getOriginalPath(u)===x&&_[_.length-1].path!==x?_.findIndex(isSameRouteRecord.bind(null,c[d-2])):m}),o=computed(()=>s.value>-1&&includesParams(n.params,r.value.params)),i=computed(()=>s.value>-1&&s.value===n.matched.length-1&&isSameRouteLocationParams(n.params,r.value.params));function a(c={}){return guardEvent(c)?t[unref(e.replace)?"replace":"push"](unref(e.to)).catch(noop):Promise.resolve()}return{route:r,href:computed(()=>r.value.href),isActive:o,isExactActive:i,navigate:a}}const RouterLinkImpl=defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink,setup(e,{slots:t}){const n=reactive(useLink(e)),{options:r}=inject(routerKey),s=computed(()=>({[getLinkClass(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[getLinkClass(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const o=t.default&&t.default(n);return e.custom?o:h("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},o)}}}),RouterLink=RouterLinkImpl;function guardEvent(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function includesParams(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!isArray(s)||s.length!==r.length||r.some((o,i)=>o!==s[i]))return!1}return!0}function getOriginalPath(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const getLinkClass=(e,t,n)=>e??t??n,RouterViewImpl=defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=inject(routerViewLocationKey),s=computed(()=>e.route||r.value),o=inject(viewDepthKey,0),i=computed(()=>{let d=unref(o);const{matched:u}=s.value;let _;for(;(_=u[d])&&!_.components;)d++;return d}),a=computed(()=>s.value.matched[i.value]);provide(viewDepthKey,computed(()=>i.value+1)),provide(matchedRouteKey,a),provide(routerViewLocationKey,s);const c=ref();return watch(()=>[c.value,a.value,e.name],([d,u,_],[m,x,C])=>{u&&(u.instances[_]=d,x&&x!==u&&d&&d===m&&(u.leaveGuards.size||(u.leaveGuards=x.leaveGuards),u.updateGuards.size||(u.updateGuards=x.updateGuards))),d&&u&&(!x||!isSameRouteRecord(u,x)||!m)&&(u.enterCallbacks[_]||[]).forEach(N=>N(d))},{flush:"post"}),()=>{const d=s.value,u=e.name,_=a.value,m=_&&_.components[u];if(!m)return normalizeSlot(n.default,{Component:m,route:d});const x=_.props[u],C=x?x===!0?d.params:typeof x=="function"?x(d):x:null,M=h(m,assign({},C,t,{onVnodeUnmounted:$=>{$.component.isUnmounted&&(_.instances[u]=null)},ref:c}));return normalizeSlot(n.default,{Component:M,route:d})||M}}});function normalizeSlot(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const RouterView=RouterViewImpl;function createRouter(e){const t=createRouterMatcher(e.routes,e),n=e.parseQuery||parseQuery,r=e.stringifyQuery||stringifyQuery,s=e.history,o=useCallbacks(),i=useCallbacks(),a=useCallbacks(),c=shallowRef(START_LOCATION_NORMALIZED);let d=START_LOCATION_NORMALIZED;isBrowser&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=applyToParams.bind(null,y=>""+y),_=applyToParams.bind(null,encodeParam),m=applyToParams.bind(null,decode);function x(y,T){let P,O;return isRouteName(y)?(P=t.getRecordMatcher(y),O=T):O=y,t.addRoute(O,P)}function C(y){const T=t.getRecordMatcher(y);T&&t.removeRoute(T)}function N(){return t.getRoutes().map(y=>y.record)}function M(y){return!!t.getRecordMatcher(y)}function $(y,T){if(T=assign({},T||c.value),typeof y=="string"){const f=parseURL(n,y,T.path),g=t.resolve({path:f.path},T),b=s.createHref(f.fullPath);return assign(f,g,{params:m(g.params),hash:decode(f.hash),redirectedFrom:void 0,href:b})}let P;if("path"in y)P=assign({},y,{path:parseURL(n,y.path,T.path).path});else{const f=assign({},y.params);for(const g in f)f[g]==null&&delete f[g];P=assign({},y,{params:_(f)}),T.params=_(T.params)}const O=t.resolve(P,T),D=y.hash||"";O.params=u(m(O.params));const G=stringifyURL(r,assign({},y,{hash:encodeHash(D),path:O.path})),l=s.createHref(G);return assign({fullPath:G,hash:D,query:r===stringifyQuery?normalizeQuery(y.query):y.query||{}},O,{redirectedFrom:void 0,href:l})}function F(y){return typeof y=="string"?parseURL(n,y,c.value.path):assign({},y)}function V(y,T){if(d!==y)return createRouterError(8,{from:T,to:y})}function H(y){return Z(y)}function Y(y){return H(assign(F(y),{replace:!0}))}function U(y){const T=y.matched[y.matched.length-1];if(T&&T.redirect){const{redirect:P}=T;let O=typeof P=="function"?P(y):P;return typeof O=="string"&&(O=O.includes("?")||O.includes("#")?O=F(O):{path:O},O.params={}),assign({query:y.query,hash:y.hash,params:"path"in O?{}:y.params},O)}}function Z(y,T){const P=d=$(y),O=c.value,D=y.state,G=y.force,l=y.replace===!0,f=U(P);if(f)return Z(assign(F(f),{state:typeof f=="object"?assign({},D,f.state):D,force:G,replace:l}),T||P);const g=P;g.redirectedFrom=T;let b;return!G&&isSameRouteLocation(r,O,P)&&(b=createRouterError(16,{to:g,from:O}),ie(O,O,!0,!1)),(b?Promise.resolve(b):se(g,O)).catch(v=>isNavigationFailure(v)?isNavigationFailure(v,2)?v:ue(v):q(v,g,O)).then(v=>{if(v){if(isNavigationFailure(v,2))return Z(assign({replace:l},F(v.to),{state:typeof v.to=="object"?assign({},D,v.to.state):D,force:G}),T||g)}else v=fe(g,O,!0,l,D);return le(g,O,v),v})}function ne(y,T){const P=V(y,T);return P?Promise.reject(P):Promise.resolve()}function de(y){const T=_e.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(y):y()}function se(y,T){let P;const[O,D,G]=extractChangingRecords(y,T);P=extractComponentsGuards(O.reverse(),"beforeRouteLeave",y,T);for(const f of O)f.leaveGuards.forEach(g=>{P.push(guardToPromiseFn(g,y,T))});const l=ne.bind(null,y,T);return P.push(l),Q(P).then(()=>{P=[];for(const f of o.list())P.push(guardToPromiseFn(f,y,T));return P.push(l),Q(P)}).then(()=>{P=extractComponentsGuards(D,"beforeRouteUpdate",y,T);for(const f of D)f.updateGuards.forEach(g=>{P.push(guardToPromiseFn(g,y,T))});return P.push(l),Q(P)}).then(()=>{P=[];for(const f of G)if(f.beforeEnter)if(isArray(f.beforeEnter))for(const g of f.beforeEnter)P.push(guardToPromiseFn(g,y,T));else P.push(guardToPromiseFn(f.beforeEnter,y,T));return P.push(l),Q(P)}).then(()=>(y.matched.forEach(f=>f.enterCallbacks={}),P=extractComponentsGuards(G,"beforeRouteEnter",y,T),P.push(l),Q(P))).then(()=>{P=[];for(const f of i.list())P.push(guardToPromiseFn(f,y,T));return P.push(l),Q(P)}).catch(f=>isNavigationFailure(f,8)?f:Promise.reject(f))}function le(y,T,P){a.list().forEach(O=>de(()=>O(y,T,P)))}function fe(y,T,P,O,D){const G=V(y,T);if(G)return G;const l=T===START_LOCATION_NORMALIZED,f=isBrowser?history.state:{};P&&(O||l?s.replace(y.fullPath,assign({scroll:l&&f&&f.scroll},D)):s.push(y.fullPath,D)),c.value=y,ie(y,T,P,l),ue()}let oe;function ge(){oe||(oe=s.listen((y,T,P)=>{if(!ye.listening)return;const O=$(y),D=U(O);if(D){Z(assign(D,{replace:!0}),O).catch(noop);return}d=O;const G=c.value;isBrowser&&saveScrollPosition(getScrollKey(G.fullPath,P.delta),computeScrollPosition()),se(O,G).catch(l=>isNavigationFailure(l,12)?l:isNavigationFailure(l,2)?(Z(l.to,O).then(f=>{isNavigationFailure(f,20)&&!P.delta&&P.type===NavigationType.pop&&s.go(-1,!1)}).catch(noop),Promise.reject()):(P.delta&&s.go(-P.delta,!1),q(l,O,G))).then(l=>{l=l||fe(O,G,!1),l&&(P.delta&&!isNavigationFailure(l,8)?s.go(-P.delta,!1):P.type===NavigationType.pop&&isNavigationFailure(l,20)&&s.go(-1,!1)),le(O,G,l)}).catch(noop)}))}let pe=useCallbacks(),J=useCallbacks(),K;function q(y,T,P){ue(y);const O=J.list();return O.length?O.forEach(D=>D(y,T,P)):console.error(y),Promise.reject(y)}function ce(){return K&&c.value!==START_LOCATION_NORMALIZED?Promise.resolve():new Promise((y,T)=>{pe.add([y,T])})}function ue(y){return K||(K=!y,ge(),pe.list().forEach(([T,P])=>y?P(y):T()),pe.reset()),y}function ie(y,T,P,O){const{scrollBehavior:D}=e;if(!isBrowser||!D)return Promise.resolve();const G=!P&&getSavedScrollPosition(getScrollKey(y.fullPath,0))||(O||!P)&&history.state&&history.state.scroll||null;return nextTick().then(()=>D(y,T,G)).then(l=>l&&scrollToPosition(l)).catch(l=>q(l,y,T))}const ee=y=>s.go(y);let he;const _e=new Set,ye={currentRoute:c,listening:!0,addRoute:x,removeRoute:C,hasRoute:M,getRoutes:N,resolve:$,options:e,push:H,replace:Y,go:ee,back:()=>ee(-1),forward:()=>ee(1),beforeEach:o.add,beforeResolve:i.add,afterEach:a.add,onError:J.add,isReady:ce,install(y){const T=this;y.component("RouterLink",RouterLink),y.component("RouterView",RouterView),y.config.globalProperties.$router=T,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>unref(c)}),isBrowser&&!he&&c.value===START_LOCATION_NORMALIZED&&(he=!0,H(s.location).catch(D=>{}));const P={};for(const D in START_LOCATION_NORMALIZED)Object.defineProperty(P,D,{get:()=>c.value[D],enumerable:!0});y.provide(routerKey,T),y.provide(routeLocationKey,shallowReactive(P)),y.provide(routerViewLocationKey,c);const O=y.unmount;_e.add(y),y.unmount=function(){_e.delete(y),_e.size<1&&(d=START_LOCATION_NORMALIZED,oe&&oe(),oe=null,c.value=START_LOCATION_NORMALIZED,he=!1,K=!1),O()}}};function Q(y){return y.reduce((T,P)=>T.then(()=>de(P)),Promise.resolve())}return ye}function extractChangingRecords(e,t){const n=[],r=[],s=[],o=Math.max(t.matched.length,e.matched.length);for(let i=0;i<o;i++){const a=t.matched[i];a&&(e.matched.find(d=>isSameRouteRecord(d,a))?r.push(a):n.push(a));const c=e.matched[i];c&&(t.matched.find(d=>isSameRouteRecord(d,c))||s.push(c))}return[n,r,s]}function useRouter(){return inject(routerKey)}function useRoute(){return inject(routeLocationKey)}const scriptRel="modulepreload",assetsURL=function(e){return"/OffTheFloor/"+e},seen={},__vitePreload=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link");s=Promise.all(n.map(i=>{if(i=assetsURL(i),i in seen)return;seen[i]=!0;const a=i.endsWith(".css"),c=a?'[rel="stylesheet"]':"";if(!!r)for(let _=o.length-1;_>=0;_--){const m=o[_];if(m.href===i&&(!a||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":scriptRel,a||(u.as="script",u.crossOrigin=""),u.href=i,document.head.appendChild(u),a)return new Promise((_,m)=>{u.addEventListener("load",_),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${i}`)))})}))}return s.then(()=>t()).catch(o=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o})};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var websr={exports:{}};(function(module,exports){(function(t,n){module.exports=n()})(self,()=>(()=>{var __webpack_modules__={"./src/context.ts":function(__unused_webpack_module,exports){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class WebGPUContext {
    constructor(device, resolution, canvas, debug) {
        this.device = device;
        this.canvas = canvas;
        this.resolution = resolution;
        this.textures = {};
        this.buffers = {};
        this.destroyed = false;
        this.debug = debug;
        let context = this.canvas.getContext('webgpu');
        if (context instanceof GPUCanvasContext) {
            this.context = context;
        }
        else {
            throw new Error("Unable to load WebGPU context");
        }
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
        this.textureUsage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT;
        this.bufferUsage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST;
        if (this.debug) {
            // Read output pixel value
            this.textureUsage = this.textureUsage | GPUTextureUsage.COPY_SRC;
            this.bufferUsage = this.bufferUsage | GPUBufferUsage.COPY_SRC;
        }
        this.textures['output'] = this.context.getCurrentTexture();
    }
    readBuffer(bufferName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.buffers[bufferName])
                throw new Error(\`No buffer with name \${bufferName}\`);
            const readEncoder = this.device.createCommandEncoder({
                label: \`Read \${bufferName} buffer encoder\`,
            });
            const buffer = this.buffers[bufferName];
            const resultBuffer = this.device.createBuffer({
                label: 'result buffer',
                size: buffer.size,
                usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
            });
            readEncoder.copyBufferToBuffer(buffer, 0, resultBuffer, 0, resultBuffer.size);
            this.device.queue.submit([readEncoder.finish()]);
            yield resultBuffer.mapAsync(GPUMapMode.READ);
            let range = resultBuffer.getMappedRange();
            return new Float32Array(range);
        });
    }
    readTexture(textureName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.textures[textureName])
                throw new Error(\`No texture with name \${textureName}\`);
            const readEncoder = this.device.createCommandEncoder({
                label: \`Read \${textureName} texture encoder\`,
            });
            const texture = this.textures[textureName];
            let bitsPerPixel = 16;
            if (texture.format === 'rgba8unorm')
                bitsPerPixel = 4;
            if (texture.format === 'r32float')
                bitsPerPixel = 4;
            const resultBuffer = this.device.createBuffer({
                label: 'result buffer',
                size: texture.width * texture.height * bitsPerPixel,
                usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
            });
            readEncoder.copyTextureToBuffer({
                texture: this.textures[textureName],
            }, {
                buffer: resultBuffer,
                bytesPerRow: texture.width * bitsPerPixel
            }, {
                width: texture.width,
                height: texture.height,
                depthOrArrayLayers: 1,
            });
            this.device.queue.submit([readEncoder.finish()]);
            yield resultBuffer.mapAsync(GPUMapMode.READ);
            if (texture.format === 'r32float')
                return new Float32Array(resultBuffer.getMappedRange());
            else if (texture.format === 'rgba32float')
                return new Float32Array(resultBuffer.getMappedRange());
            else if (texture.format === 'rgba8unorm')
                return new Uint8ClampedArray(resultBuffer.getMappedRange());
            return new Float32Array(0);
        });
    }
    destroy() {
        this.device.destroy();
        this.destroyed = true;
    }
    buffer(key, options) {
        if (!this.buffers[key]) {
            options = options || {};
            const width = options.width || this.resolution.width;
            const height = options.height || this.resolution.height;
            const channels = options.channels || 4;
            const bitdepth = options.bitdepth || 4;
            this.buffers[key] = this.device.createBuffer({
                label: key,
                size: width * height * channels * bitdepth,
                usage: this.bufferUsage
            });
        }
        return this.buffers[key];
    }
    texture(key, options) {
        if (!this.textures[key]) {
            options = options || {};
            this.textures[key] = this.device.createTexture({
                label: key,
                size: [options.width || this.resolution.width, options.height || this.resolution.height],
                format: options.format || 'rgba32float',
                usage: this.textureUsage
            });
        }
        return this.textures[key];
    }
}
exports["default"] = WebGPUContext;


//# sourceURL=webpack://WebSR/./src/context.ts?`)},"./src/layers/anime4k/conv2d-112x4.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConv112x4 extends base_compute_layer_1.default {
    constructor(inputs, outputBuffer, weights, first) {
        super(inputs, outputBuffer, weights);
        this.label = "Anime4KConv112x4";
        const kernels = weights.weights;
        this.createUniform("kernels", "array<mat4x4f, 28>");
        let read_buffers = '';
        for (let i = 0; i < 7; i++) {
            if (first) {
                read_buffers += \`
                let pixel_val\${i} = inputBuffer\${i}[buff_ind];
                result += kernels[\${4 * i}]*max(pixel_val\${i}, vec4f(0.0));
                result += kernels[\${4 * i + 2}]*max(-1.0*pixel_val\${i}, vec4f(0.0));
            \`;
            }
            else {
                read_buffers += \`
                let pixel_val\${i} = inputBuffer\${i}[buff_ind];
                result += kernels[\${4 * i + 1}]*max(pixel_val\${i}, vec4f(0.0));
                result += kernels[\${4 * i + 3}]*max(-1.0*pixel_val\${i}, vec4f(0.0));\`;
            }
        }
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
               
                let buff_ind = coord.y*\${this.resolution.width} + coord.x;
                \${read_buffers}
                
                outputBuffer[i] = result;
          }
        \`);
        this.setUniform("kernels", new Float32Array(kernels));
        this.defaultSetup();
    }
    defaultPipelineConfig() {
        return {
            label: \`\${this.label}-pipeline\`,
            layout: 'auto',
            compute: {
                module: this.shader,
                entryPoint: 'main',
            },
        };
    }
    defaultBindGroup() {
        const entries = [];
        this.inputs.forEach(function (input, i) {
            if (input instanceof GPUExternalTexture) {
                entries.push({ binding: i, resource: input });
            }
            else if (input instanceof GPUTexture) {
                entries.push({ binding: i, resource: input.createView() });
            }
            else if (input instanceof GPUBuffer) {
                entries.push({ binding: i, resource: { buffer: input } });
            }
        });
        this.uniforms.forEach((uniform, i) => {
            entries.push({
                binding: i + this.inputs.length,
                resource: {
                    buffer: this.buffers[uniform.name]
                }
            });
        });
        if (this.output instanceof GPUBuffer) {
            entries.push({
                binding: this.inputs.length + this.uniforms.length,
                resource: {
                    buffer: this.output
                }
            });
        }
        if (entries.length === 0)
            return null;
        return this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries
        });
    }
}
exports["default"] = Anime4KConv112x4;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-112x4.ts?`)},"./src/layers/anime4k/conv2d-16x4.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConv16x4 extends base_compute_layer_1.default {
    constructor(inputs, outputBuffer, weights) {
        super(inputs, outputBuffer, weights);
        this.label = "Anime4KConv16x4";
        const kernels = weights.weights;
        const bias = weights.bias;
        this.createUniform("kernel_offsets", "array<vec4f, 9>");
        this.createUniform("kernels", "array<mat4x4f, 36>");
        this.createUniform("bias", "vec4f");
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
                      
                 for(var i = 0u; i < 9; i++){
                   let pixel_loc = coord + vec2<i32>(kernel_offsets[i].xy);
                   let buff_ind = pixel_loc.y*\${this.resolution.width} + pixel_loc.x;
                   
                   let pix_val0 = inputBuffer0[buff_ind];
                   let pix_val1 = inputBuffer1[buff_ind];
                  
                   result += kernels[i]*max(pix_val0, vec4f(0.0));
                   result += kernels[i+9]*max(pix_val1, vec4f(0.0));
                   result += kernels[i+18]*max(-1.0*pix_val0, vec4f(0.0));
                   result += kernels[i+27]*max(-1.0*pix_val1, vec4f(0.0));
                 } 
                 

                    
                result += bias;
                
                outputBuffer[i] = result;
          }
        \`);
        this.setUniform("kernel_offsets", new Float32Array([
            -1, -1, 0, 0,
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, -1, 0, 0,
            0, 0, 0, 0,
            0, 1, 0, 0,
            1, -1, 0, 0,
            1, 0, 0, 0,
            1, 1, 0, 0,
        ]));
        this.setUniform("kernels", new Float32Array(kernels));
        this.setUniform("bias", new Float32Array(bias));
        this.defaultSetup();
    }
}
exports["default"] = Anime4KConv16x4;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-16x4.ts?`)},"./src/layers/anime4k/conv2d-3x4.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConv3x4 extends base_compute_layer_1.default {
    constructor(inputTextures, outputBuffer, weights) {
        super(inputTextures, outputBuffer, weights);
        this.label = "Anime4KConv3x4";
        const kernels = weights.weights;
        const bias = weights.bias;
        this.createUniform("kernel_offsets", "array<vec4f, 9>");
        this.createUniform("kernels", "array<mat4x4f, 9>");
        this.createUniform("bias", "vec4f");
        // Set up pipeline in Lazy Load
        this.setUniform("kernel_offsets", new Float32Array([
            -1, -1, 0, 0,
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, -1, 0, 0,
            0, 0, 0, 0,
            0, 1, 0, 0,
            1, -1, 0, 0,
            1, 0, 0, 0,
            1, 1, 0, 0,
        ]));
        this.setUniform("kernels", new Float32Array(kernels));
        this.setUniform("bias", new Float32Array(bias));
    }
    lazyLoadSetup() {
        const externalTexture = this.inputs[0] instanceof GPUExternalTexture;
        const textureLoad = externalTexture ? 'textureLoad(inputTexture0, coord + offset)' :
            'textureLoad(inputTexture0, coord + offset, 0)';
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
                      
                 for(var i = 0u; i < 9; i++){
                   let offset = vec2<i32>(kernel_offsets[i].xy);
                   result += kernels[i]*\${textureLoad};
                 } 
                    
                result += bias;
                
                outputBuffer[i] = result;
          }
        \`);
        this.pipeline = this.device.createComputePipeline(this.defaultPipelineConfig());
        this.bindGroup = this.defaultBindGroup();
    }
}
exports["default"] = Anime4KConv3x4;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-3x4.ts?`)},"./src/layers/anime4k/conv2d-56x4.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConv56x4 extends base_compute_layer_1.default {
    constructor(inputs, outputBuffer, weights) {
        super(inputs, outputBuffer, weights);
        this.label = "Anime4KConv56x4";
        const kernels = weights.weights;
        const bias = weights.bias;
        this.createUniform("kernels", "array<mat4x4f, 14>");
        this.createUniform("bias", "vec4f");
        let read_buffers = '';
        for (let i = 0; i < 7; i++) {
            read_buffers += \`
            let pixel_val\${i} = inputBuffer\${i}[buff_ind];
            result += kernels[\${2 * i}]*max(pixel_val\${i}, vec4f(0.0));
            result += kernels[\${2 * i + 1}]*max(-1.0*pixel_val\${i}, vec4f(0.0));
            \`;
        }
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
               
                let buff_ind = coord.y*\${this.resolution.width} + coord.x;
                \${read_buffers}
                      
                result += bias;
                
                outputBuffer[buff_ind] = result;
          }
        \`);
        this.setUniform("kernels", new Float32Array(kernels));
        this.setUniform("bias", new Float32Array(bias));
        this.defaultSetup();
    }
    defaultPipelineConfig() {
        return {
            label: \`\${this.label}-pipeline\`,
            layout: 'auto',
            compute: {
                module: this.shader,
                entryPoint: 'main',
            },
        };
    }
    defaultBindGroup() {
        const entries = [];
        this.inputs.forEach(function (input, i) {
            if (input instanceof GPUExternalTexture) {
                entries.push({ binding: i, resource: input });
            }
            else if (input instanceof GPUTexture) {
                entries.push({ binding: i, resource: input.createView() });
            }
            else if (input instanceof GPUBuffer) {
                entries.push({ binding: i, resource: { buffer: input } });
            }
        });
        this.uniforms.forEach((uniform, i) => {
            entries.push({
                binding: i + this.inputs.length,
                resource: {
                    buffer: this.buffers[uniform.name]
                }
            });
        });
        if (this.output instanceof GPUBuffer) {
            entries.push({
                binding: this.inputs.length + this.uniforms.length,
                resource: {
                    buffer: this.output
                }
            });
        }
        if (entries.length === 0)
            return null;
        return this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries
        });
    }
}
exports["default"] = Anime4KConv56x4;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-56x4.ts?`)},"./src/layers/anime4k/conv2d-8x4.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConv8x4 extends base_compute_layer_1.default {
    constructor(inputs, outputBuffer, weights) {
        super(inputs, outputBuffer, weights);
        this.label = "Anime4KConv8x4";
        const kernels = weights.weights;
        const bias = weights.bias;
        this.createUniform("kernel_offsets", "array<vec4f, 9>");
        this.createUniform("kernels", "array<mat4x4f, 18>");
        this.createUniform("bias", "vec4f");
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
                      
                 for(var i = 0u; i < 9; i++){
                   let pixel_loc = coord + vec2<i32>(kernel_offsets[i].xy);
                   let buff_ind = pixel_loc.y*\${this.resolution.width} + pixel_loc.x;
                   
                   let pix_val = inputBuffer0[buff_ind];
                  
                   result += kernels[i]*max(pix_val, vec4f(0.0));
                   result += kernels[i+9]*max(-1.0*pix_val, vec4f(0.0));
                 } 
                    
                result += bias;
                
                outputBuffer[i] = result;
          }
        \`);
        this.setUniform("kernel_offsets", new Float32Array([
            -1, -1, 0, 0,
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, -1, 0, 0,
            0, 0, 0, 0,
            0, 1, 0, 0,
            1, -1, 0, 0,
            1, 0, 0, 0,
            1, 1, 0, 0,
        ]));
        this.setUniform("kernels", new Float32Array(kernels));
        this.setUniform("bias", new Float32Array(bias));
        this.defaultSetup();
    }
}
exports["default"] = Anime4KConv8x4;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-8x4.ts?`)},"./src/layers/anime4k/conv2d-concat2.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_compute_layer_1 = __webpack_require__(/*! ../base_compute_layer */ "./src/layers/base_compute_layer.ts");
class Anime4KConcat2 extends base_compute_layer_1.default {
    constructor(inputs, outputBuffer, weights) {
        super(inputs, outputBuffer, weights);
        this.label = "Anime4KConcat2";
        this.createUniform("bias", "vec4f");
        const bias = weights.bias;
        this.shader = this.createStandardShader(\`
        
          @compute @workgroup_size(\${this.num_work_groups}, \${this.num_work_groups}) fn main( @builtin(global_invocation_id) id: vec3<u32>) {
          
                let x = id.x;
                let y = id.y;
                
                let i = id.y*\${this.resolution.width} + x;
                var result  = vec4f(0.0, 0.0, 0.0, 0.0);
                
                let coord = vec2<i32>( i32(x), i32(y));
               
                let buff_ind = coord.y*\${this.resolution.width} + coord.x;
               
                outputBuffer[buff_ind] = inputBuffer0[buff_ind] + inputBuffer1[buff_ind] + bias;
          }
        \`);
        this.setUniform("bias", new Float32Array(bias));
        this.defaultSetup();
    }
}
exports["default"] = Anime4KConcat2;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/conv2d-concat2.ts?`)},"./src/layers/anime4k/display.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_render_layer_1 = __webpack_require__(/*! ../base_render_layer */ "./src/layers/base_render_layer.ts");
class DisplayLayer extends base_render_layer_1.default {
    constructor(inputs, output) {
        super(inputs, output);
        this.label = "DisplayLayer";
        this.vertexScale = {
            width: 1,
            height: 1
        };
        this.sampler = this.device.createSampler({
            addressModeU: "repeat",
            addressModeV: "repeat",
            magFilter: "linear",
            minFilter: "linear",
            mipmapFilter: "linear",
        });
    }
    lazyLoadSetup() {
        const externalTexture = this.inputs[1] instanceof GPUExternalTexture;
        const textureLoad = externalTexture ? 'textureSampleBaseClampToEdge(inputTexture, ourSampler, input.tex_coord)' :
            'textureSample(inputTexture, ourSampler, input.tex_coord)';
        this.shader = this.device.createShaderModule({
            label: \`\${this.label}-shader\`,
            code: \`
                
                   \${this.defaultVertexShader()}
                   @group(0) @binding(0) var<storage, read_write> inputBuffer0: array<vec4f>;
                   @group(0) @binding(1) var inputTexture: \${externalTexture ? 'texture_external' : 'texture_2d<f32>'};
                   @group(0) @binding(2) var ourSampler: sampler;
                  
                   @fragment fn fragmentMain(input: VertexShaderOutput) -> @location(0) vec4f {
                      
                        let x = \${this.resolution.width}.0*(input.tex_coord.x);
                        let y = \${this.resolution.height}.0*(input.tex_coord.y);
                        
                        let y2 = u32(floor(y));
                        let x2 = u32(floor(x));
                        
                        let i = y2*\${Math.floor(this.resolution.width)} +  x2;
                       
                        let x_floor  = u32(fract(x)*2.0);
                        let y_floor  = u32(fract(y)*2.0);
                        
                        //I don t know, I think this is right? I found this by trial and error
                        let c_index: u32 = x_floor + y_floor*2;  
        
                        let value = inputBuffer0[i][c_index];
                        
                        let bicubic = \${textureLoad};
                        
                        return bicubic + vec4f(value);
                    
                      }            
            \`
        });
        this.pipeline = this.device.createRenderPipeline(this.defaultPipelineConfig());
        this.bindGroup = this.defaultBindGroup();
        this.renderPassDescriptor = this.defaultRenderPassDescriptor();
    }
    defaultBindGroup() {
        const entries = [];
        this.inputs.forEach(function (input, i) {
            if (input instanceof GPUExternalTexture) {
                entries.push({ binding: i, resource: input });
            }
            else if (input instanceof GPUTexture) {
                entries.push({ binding: i, resource: input.createView() });
            }
            else if (input instanceof GPUBuffer) {
                entries.push({ binding: i, resource: { buffer: input } });
            }
        });
        entries.push({ binding: this.inputs.length, resource: this.sampler });
        return this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries
        });
    }
}
exports["default"] = DisplayLayer;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/display.ts?`)},"./src/layers/anime4k/display_3c.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_render_layer_1 = __webpack_require__(/*! ../base_render_layer */ "./src/layers/base_render_layer.ts");
class DisplayLayer3C extends base_render_layer_1.default {
    constructor(inputs, output) {
        super(inputs, output);
        this.label = "DisplayLayer3C";
        this.vertexScale = {
            width: 1,
            height: 1
        };
        this.sampler = this.device.createSampler({
            addressModeU: "repeat",
            addressModeV: "repeat",
            magFilter: "linear",
            minFilter: "linear",
            mipmapFilter: "linear",
        });
    }
    lazyLoadSetup() {
        const externalTexture = this.inputs[3] instanceof GPUExternalTexture;
        const textureLoad = externalTexture ? 'textureSampleBaseClampToEdge(inputTexture, ourSampler, input.tex_coord)' :
            'textureSample(inputTexture, ourSampler, input.tex_coord)';
        this.shader = this.device.createShaderModule({
            label: \`\${this.label}-shader\`,
            code: \`
                
                   \${this.defaultVertexShader()}
                   @group(0) @binding(0) var<storage, read_write> inputBuffer0: array<vec4f>;
                   @group(0) @binding(1) var<storage, read_write> inputBuffer1: array<vec4f>;
                   @group(0) @binding(2) var<storage, read_write> inputBuffer2: array<vec4f>;
                   @group(0) @binding(3) var inputTexture: \${externalTexture ? 'texture_external' : 'texture_2d<f32>'};
                   @group(0) @binding(4) var ourSampler: sampler;
                  
                   @fragment fn fragmentMain(input: VertexShaderOutput) -> @location(0) vec4f {
                      
                        let x = \${this.resolution.width}.0*(input.tex_coord.x);
                        let y = \${this.resolution.height}.0*(input.tex_coord.y);
                        
                        let y2 = u32(floor(y));
                        let x2 = u32(floor(x));
                        
                        let i = y2*\${Math.floor(this.resolution.width)} +  x2;
                       
                        let x_floor  = u32(fract(x)*2.0);
                        let y_floor  = u32(fract(y)*2.0);
                        
                        //I don t know, I think this is right? I found this by trial and error
                        let c_index: u32 = x_floor + y_floor*2;  
        
                        let value = inputBuffer0[i][c_index];
                        let value1 = inputBuffer1[i][c_index];
                        let value2 = inputBuffer2[i][c_index];
                        
                        let bicubic = \${textureLoad};
                        
                        return bicubic + vec4f(value, value1, value2, value2);
                    
                      }            
            \`
        });
        this.pipeline = this.device.createRenderPipeline(this.defaultPipelineConfig());
        this.bindGroup = this.defaultBindGroup();
        this.renderPassDescriptor = this.defaultRenderPassDescriptor();
    }
    defaultPipelineConfig() {
        return {
            label: \`\${this.label}-pipeline\`,
            layout: 'auto',
            vertex: {
                module: this.shader,
                entryPoint: 'vertexMain',
            },
            fragment: {
                module: this.shader,
                entryPoint: 'fragmentMain',
                targets: [{ format: this.output.format }],
            },
        };
    }
    defaultBindGroup() {
        const entries = [];
        this.inputs.forEach(function (input, i) {
            if (input instanceof GPUExternalTexture) {
                entries.push({ binding: i, resource: input });
            }
            else if (input instanceof GPUTexture) {
                entries.push({ binding: i, resource: input.createView() });
            }
            else if (input instanceof GPUBuffer) {
                entries.push({ binding: i, resource: { buffer: input } });
            }
        });
        entries.push({ binding: this.inputs.length, resource: this.sampler });
        return this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries
        });
    }
}
exports["default"] = DisplayLayer3C;


//# sourceURL=webpack://WebSR/./src/layers/anime4k/display_3c.ts?`)},"./src/layers/base_compute_layer.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_layer_1 = __webpack_require__(/*! ./base_layer */ "./src/layers/base_layer.ts");
class ComputeLayer extends base_layer_1.default {
    constructor(inputTextures, outputBuffer, weights) {
        super(inputTextures, outputBuffer, weights);
        this.num_work_groups = 8;
    }
    createStandardShader(computeShader) {
        return this.device.createShaderModule({
            label: \`\${this.label}-shader\`,
            code: \`
              
              \${this.computeShaderInputs()}
              
              \${computeShader}
        \`
        });
    }
    computeShaderInputs() {
        const inputs = [];
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] instanceof GPUTexture) {
                inputs.push(\`@group(0) @binding(\${i}) var inputTexture\${i}: texture_2d<f32>;\`);
            }
            else if (this.inputs[i] instanceof GPUExternalTexture) {
                inputs.push(\`@group(0) @binding(\${i}) var inputTexture\${i}: texture_external;\`);
            }
            else if (this.inputs[i] instanceof GPUBuffer) {
                inputs.push(\`@group(0) @binding(\${i}) var<storage, read_write> inputBuffer\${i}: array<vec4f>;\`);
            }
            else {
                console.log(this.inputs[i]);
                throw new Error("Input is undefined or non of the correct input type");
            }
        }
        //  console.log("This layer", this.label);
        // console.log(this.inputs.length);
        this.uniforms.forEach((uniform, i) => {
            inputs.push(\`@group(0) @binding(\${i + this.inputs.length}) var <uniform> \${uniform.name}: \${uniform.type};\`);
        });
        inputs.push(\`@group(0) @binding(\${this.inputs.length + this.uniforms.length}) var <storage, read_write> outputBuffer: array<vec4f>;\`);
        return inputs.join('\\n');
    }
    defaultPipelineConfig() {
        return {
            label: \`\${this.label}-pipeline\`,
            layout: 'auto',
            compute: {
                module: this.shader,
                entryPoint: 'main',
            },
        };
    }
    defaultSetup() {
        this.pipeline = this.device.createComputePipeline(this.defaultPipelineConfig());
        this.bindGroup = this.defaultBindGroup();
    }
    lazyLoadSetup() {
    }
    run() {
        const encoder = this.device.createCommandEncoder({ label: this.label });
        if (!this.pipeline)
            this.lazyLoadSetup();
        const pass = encoder.beginComputePass({ label: this.label });
        pass.setPipeline(this.pipeline);
        if (this.hasExternalTexture()) {
            this.bindGroup = this.defaultBindGroup();
        }
        if (this.bindGroup) {
            pass.setBindGroup(0, this.bindGroup);
        }
        // Dividing into work groups speeds up inference. If width or height aren't cleandly divided by work groups, we round to the nearest multiple of work-groups
        // Physically, this means shaving a few pixels (up to num_work_groups-1) off the bottom and right edges of the canvas but users shouldn't notice?
        pass.dispatchWorkgroups(Math.floor(this.resolution.width / this.num_work_groups), Math.floor(this.resolution.height / this.num_work_groups));
        pass.end();
        this.device.queue.submit([encoder.finish()]);
    }
}
exports["default"] = ComputeLayer;


//# sourceURL=webpack://WebSR/./src/layers/base_compute_layer.ts?`)},"./src/layers/base_layer.ts":(__unused_webpack_module,exports)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
class Layer {
    constructor(inputs, output, weights) {
        this.context = globalThis.context;
        this.device = this.context.device;
        this.resolution = this.context.resolution;
        this.inputs = inputs;
        this.output = output;
        this.uniforms = [];
        this.buffers = {};
        this.weights = weights;
    }
    createUniform(name, type) {
        this.uniforms.push({ name, type });
    }
    setUniform(name, value) {
        const buffer = this.device.createBuffer({
            label: \`layer-\${this.label}-buffer-\${name}\`,
            size: value.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        this.device.queue.writeBuffer(buffer, /*bufferOffset=*/ 0, value);
        this.buffers[name] = buffer;
    }
    defaultBindGroup() {
        const entries = [];
        this.inputs.forEach(function (input, i) {
            if (input instanceof GPUExternalTexture) {
                entries.push({ binding: i, resource: input });
            }
            else if (input instanceof GPUTexture) {
                entries.push({ binding: i, resource: input.createView() });
            }
            else if (input instanceof GPUBuffer) {
                entries.push({ binding: i, resource: { buffer: input } });
            }
        });
        this.uniforms.forEach((uniform, i) => {
            entries.push({
                binding: i + this.inputs.length,
                resource: {
                    buffer: this.buffers[uniform.name]
                }
            });
        });
        if (this.output instanceof GPUBuffer) {
            entries.push({
                binding: this.inputs.length + this.uniforms.length,
                resource: {
                    buffer: this.output
                }
            });
        }
        if (entries.length === 0)
            return null;
        return this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries
        });
    }
    hasExternalTexture() {
        for (const input of this.inputs) {
            if (input instanceof GPUExternalTexture)
                return true;
        }
        return false;
    }
    lazyLoadSetup() { }
    run() { }
}
exports["default"] = Layer;


//# sourceURL=webpack://WebSR/./src/layers/base_layer.ts?`)},"./src/layers/base_render_layer.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_layer_1 = __webpack_require__(/*! ./base_layer */ "./src/layers/base_layer.ts");
class RenderLayer extends base_layer_1.default {
    constructor(inputs, output, weights) {
        super(inputs, output, weights);
        this.vertexScale = this.context.resolution;
    }
    defaultVertexShader() {
        return \`
        
             struct VertexShaderOutput {
                @builtin(position) position: vec4f,
                @location(0) tex_coord: vec2f,
              };

            @vertex
            fn vertexMain( @builtin(vertex_index) vertexIndex : u32) ->  VertexShaderOutput{
                let pos = array(
                // 1st triangle
                vec2f( -1.0,  -1.0),  // center
                vec2f( 1.0,  -1.0),  // right, center
                vec2f( -1.0,  1.0),  // center, top
             
                // 2st triangle
                vec2f( -1.0,  1.0),  // center, top
                vec2f( 1.0,  -1.0),  // right, center
                vec2f( 1.0,  1.0),  // right, top
              );
             
              var vsOutput: VertexShaderOutput;
              let xy = pos[vertexIndex];
              vsOutput.position = vec4f(xy, 0.0, 1.0);
              vsOutput.tex_coord = xy*0.5 + 0.5;
              vsOutput.tex_coord.y = - 1.0* vsOutput.tex_coord.y  + 1.0;
               vsOutput.tex_coord.x =  vsOutput.tex_coord.x*\${this.vertexScale.width};
               vsOutput.tex_coord.y =  vsOutput.tex_coord.y*\${this.vertexScale.height};
              return vsOutput;
            }
        \`;
    }
    defaultPipelineConfig() {
        return {
            label: \`\${this.label}-pipeline\`,
            layout: 'auto',
            vertex: {
                module: this.shader,
                entryPoint: 'vertexMain',
            },
            fragment: {
                module: this.shader,
                entryPoint: 'fragmentMain',
                targets: [{ format: this.output.format }],
            },
        };
    }
    defaultSetup() {
        this.pipeline = this.device.createRenderPipeline(this.defaultPipelineConfig());
        this.bindGroup = this.defaultBindGroup();
        this.renderPassDescriptor = this.defaultRenderPassDescriptor();
    }
    defaultRenderPassDescriptor() {
        return {
            label: \`\${this.label}-render-pass\`,
            colorAttachments: [
                {
                    view: this.output.createView(),
                    clearValue: [0, 0, 0, 1],
                    loadOp: 'clear',
                    storeOp: 'store',
                },
            ],
        };
    }
    createStandardShader(fragmentShader) {
        return this.device.createShaderModule({
            label: \`\${this.label}-shader\`,
            code: \`
          
              \${this.defaultVertexShader()}
              
              \${this.fragmentShaderInputs()}
              
              \${fragmentShader}
        \`
        });
    }
    fragmentShaderInputs() {
        const inputs = [];
        for (let i = 0; i < this.inputs.length; i++) {
            let type = (this.inputs[i] instanceof GPUTexture) ? 'texture_2d<f32>' : 'texture_external';
            inputs.push(\`@group(0) @binding(0) var inputTexture\${i}: \${type};\`);
        }
        this.uniforms.forEach((uniform, i) => {
            inputs.push(\`@group(0) @binding(\${i + this.inputs.length}) var <uniform> \${uniform.name}: \${uniform.type};\`);
        });
        return inputs.join('\\n');
    }
    run() {
        const encoder = this.device.createCommandEncoder({ label: this.label });
        if (!this.pipeline)
            this.lazyLoadSetup();
        const pass = encoder.beginRenderPass(this.renderPassDescriptor);
        pass.setPipeline(this.pipeline);
        if (this.hasExternalTexture()) {
            this.bindGroup = this.defaultBindGroup();
        }
        if (this.bindGroup) {
            pass.setBindGroup(0, this.bindGroup);
        }
        pass.draw(6); // call our vertex shader 6 times
        pass.end();
        this.device.queue.submit([encoder.finish()]);
    }
    setOutput(outputTexture) {
        this.output = outputTexture;
        this.renderPassDescriptor = this.defaultRenderPassDescriptor();
    }
}
exports["default"] = RenderLayer;


//# sourceURL=webpack://WebSR/./src/layers/base_render_layer.ts?`)},"./src/layers/utils/gaussian.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_render_layer_1 = __webpack_require__(/*! ../base_render_layer */ "./src/layers/base_render_layer.ts");
class GuassianLayer extends base_render_layer_1.default {
    constructor(inputTextures, outputTexture) {
        super(inputTextures, outputTexture);
        this.label = "Gaussian";
        this.createUniform("gaussian", "array<vec3f, 3>");
        this.createUniform("kernel_offsets", "array<vec4f, 9>");
        this.shader = this.createStandardShader(\`
        
                  @fragment fn fragmentMain(input: VertexShaderOutput) -> @location(0) vec4f {
                  
                     var val  = 0.0;
                      
                     for(var i = 0u; i < 3; i++){
                     
                        let a = vec3f(
                            textureLoad(inputTexture0, vec2<i32>(input.tex_coord + kernel_offsets[i*3].xy), 0).x,
                            textureLoad(inputTexture0, vec2<i32>(input.tex_coord + kernel_offsets[i*3].xy), 0).x,
                            textureLoad(inputTexture0, vec2<i32>(input.tex_coord + kernel_offsets[i*3].xy), 0).x
                        );
                        
                        val += dot(a, gaussian[i]);
                      
                    } 
                  
                    
                    return vec4f(val, val, val, 1.0);
                  }                 
        \`);
        this.setUniform("gaussian", new Float32Array([
            0.0675, 0.125, 0.0675, 0.0,
            0.125, 0.250, 0.1250, 0.0,
            0.0675, 0.125, 0.0675, 0.0
        ]));
        this.setUniform("kernel_offsets", new Float32Array([
            -1, -1, 0, 0,
            0, -1, 0, 0,
            1, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 0, 0,
            1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 1, 0, 0,
            1, 1, 0, 0,
        ]));
        this.defaultSetup();
    }
}
exports["default"] = GuassianLayer;


//# sourceURL=webpack://WebSR/./src/layers/utils/gaussian.ts?`)},"./src/layers/utils/rgb_2_yuv.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_render_layer_1 = __webpack_require__(/*! ../base_render_layer */ "./src/layers/base_render_layer.ts");
class RGB2YUV extends base_render_layer_1.default {
    constructor(inputTextures, outputTexture) {
        super(inputTextures, outputTexture);
        this.createUniform("rgb2yuv", "mat3x3f");
        this.shader = this.createStandardShader(\`
        
               @fragment fn fragmentMain(input: VertexShaderOutput) -> @location(0) vec4f {
              
                    let color = textureLoad(inputTexture0, vec2<i32>(input.tex_coord), 0);       
                    let yuv = rgb2yuv*color.xyz;
          
                return vec4f(yuv, 1.0);
              }     
        \`);
        this.setUniform("rgb2yuv", new Float32Array([
            0.299, -0.1473, 0.615, 1.0,
            0.587, -.2886, -.51499, 1.0,
            0.114, 0.436, -.1001, 1.0
        ]));
        this.defaultSetup();
    }
}
exports["default"] = RGB2YUV;


//# sourceURL=webpack://WebSR/./src/layers/utils/rgb_2_yuv.ts?`)},"./src/main.ts":function(__unused_webpack_module,exports,__webpack_require__){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const context_1 = __webpack_require__(/*! ./context */ "./src/context.ts");
const renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
const network_list_1 = __webpack_require__(/*! ./networks/network_list */ "./src/networks/network_list.ts");
class WebSR {
    constructor(params) {
        this.source = params.source;
        const source = this.source;
        this.resolution = params.resolution ? params.resolution : {
            width: (source instanceof HTMLVideoElement) ? source.videoWidth : (source instanceof HTMLImageElement) ? source.naturalWidth : source.width,
            height: (source instanceof HTMLVideoElement) ? source.videoHeight : (source instanceof HTMLImageElement) ? source.naturalHeight : source.height
        };
        if (params.canvas)
            this.canvas = params.canvas;
        else {
            this.canvas = new HTMLCanvasElement();
            this.canvas.width = this.resolution.width * 2;
            this.canvas.height = this.resolution.height * 2;
        }
        this.context = new context_1.default(params.gpu, this.resolution, this.canvas, this.debug);
        globalThis.context = this.context;
        if (!network_list_1.NetworkList[params.network_name])
            throw Error(\`Network \${params.network_name} is not defined or implemented\`);
        this.network = new network_list_1.NetworkList[params.network_name](params.weights);
        this.renderer = new renderer_1.default(this.network, this.source);
    }
    switchNetwork(network, weights) {
        if (!network_list_1.NetworkList[network])
            throw Error(\`Network \${network} is not defined or implemented\`);
        this.network = new network_list_1.NetworkList[network](weights);
        this.renderer.switchNetwork(this.network);
    }
    static initWebGPU() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!navigator.gpu)
                return false;
            const adapter = yield navigator.gpu.requestAdapter();
            if (!adapter)
                return false;
            const device = yield adapter.requestDevice();
            if (!device)
                return false;
            return device;
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderer.start();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderer.stop();
        });
    }
    render(source) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderer.render(source);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderer.stop();
            this.context.destroy();
        });
    }
}
exports["default"] = WebSR;


//# sourceURL=webpack://WebSR/./src/main.ts?`)},"./src/networks/anime4k/cnn-2x-l.ts":function(__unused_webpack_module,exports,__webpack_require__){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_network_1 = __webpack_require__(/*! ../base_network */ "./src/networks/base_network.ts");
const conv2d_3x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-3x4 */ "./src/layers/anime4k/conv2d-3x4.ts");
const display_3c_1 = __webpack_require__(/*! ../../layers/anime4k/display_3c */ "./src/layers/anime4k/display_3c.ts");
const conv2d_16x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-16x4 */ "./src/layers/anime4k/conv2d-16x4.ts");
const conv2d_112x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-112x4 */ "./src/layers/anime4k/conv2d-112x4.ts");
const conv2d_concat2_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-concat2 */ "./src/layers/anime4k/conv2d-concat2.ts");
class Anime4KCNN2XL extends base_network_1.default {
    constructor(weights) {
        super(weights);
    }
    model() {
        const layers = [];
        const weights = this.weights.layers;
        const context = this.context;
        layers.push(new conv2d_3x4_1.default([context.input], context.buffer('conv2d_tf'), weights['conv2d_tf']));
        layers.push(new conv2d_3x4_1.default([context.input], context.buffer('conv2d_tf1'), weights['conv2d_tf1']));
        for (let i = 1; i < 7; i++) {
            let source = (i == 1) ? \`conv2d_tf\` : \`conv2d_\${i - 1}_tf\`;
            layers.push(new conv2d_16x4_1.default([context.buffer(source), context.buffer(source + "1")], context.buffer(\`conv2d_\${i}_tf\`), weights[\`conv2d_\${i}_tf\`]));
            layers.push(new conv2d_16x4_1.default([context.buffer(source), context.buffer(source + "1")], context.buffer(\`conv2d_\${i}_tf1\`), weights[\`conv2d_\${i}_tf1\`]));
        }
        for (let c = 0; c < 3; c++) {
            const sources_0 = [];
            const sources_1 = [];
            for (let i = 0; i < 7; i++) {
                let source = (i == 0) ? \`conv2d_tf\` : \`conv2d_\${i}_tf\`;
                sources_0.push(context.buffer(source));
                sources_1.push(context.buffer(source + "1"));
            }
            const dest = (c == 0) ? \`conv2d_last_tf\` : \`conv2d_last_tf\${c}\`;
            layers.push(new conv2d_112x4_1.default(sources_0, context.buffer(\`conv2d_last_\${c}_pt1\`), weights[dest], true));
            layers.push(new conv2d_112x4_1.default(sources_1, context.buffer(\`conv2d_last_\${c}_pt2\`), weights[dest], false));
            layers.push(new conv2d_concat2_1.default([context.buffer(\`conv2d_last_\${c}_pt1\`), context.buffer(\`conv2d_last_\${c}_pt2\`)], context.buffer(dest), weights[dest]));
        }
        const paint = new display_3c_1.default([context.buffer('conv2d_last_tf'), context.buffer('conv2d_last_tf1'), context.buffer('conv2d_last_tf2'), context.input], context.texture('output'));
        layers.push(paint);
        return layers;
    }
    feedForward(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (source instanceof HTMLVideoElement) {
                this.context.input = this.context.device.importExternalTexture({ source });
            }
            else {
                const bitmap = source instanceof ImageBitmap ? source : yield createImageBitmap(source);
                const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
                const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
                this.context.device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: this.context.texture('input', { format: "rgba8unorm" }) }, [width, height]);
                this.context.input = this.context.texture('input');
            }
            this.layers[0].inputs[0] = this.context.input;
            this.layers[1].inputs[0] = this.context.input;
            this.layers[this.layers.length - 1].inputs[3] = this.context.input;
            this.layers.forEach(function (layer) {
                layer.run();
            });
        });
    }
}
exports["default"] = Anime4KCNN2XL;


//# sourceURL=webpack://WebSR/./src/networks/anime4k/cnn-2x-l.ts?`)},"./src/networks/anime4k/cnn-2x-m.ts":function(__unused_webpack_module,exports,__webpack_require__){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_network_1 = __webpack_require__(/*! ../base_network */ "./src/networks/base_network.ts");
const conv2d_3x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-3x4 */ "./src/layers/anime4k/conv2d-3x4.ts");
const conv2d_8x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-8x4 */ "./src/layers/anime4k/conv2d-8x4.ts");
const conv2d_56x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-56x4 */ "./src/layers/anime4k/conv2d-56x4.ts");
const display_3c_1 = __webpack_require__(/*! ../../layers/anime4k/display_3c */ "./src/layers/anime4k/display_3c.ts");
class Anime4KCNN2XM extends base_network_1.default {
    constructor(weights) {
        super(weights);
    }
    model() {
        const layers = [];
        const weights = this.weights.layers;
        const context = this.context;
        const conv2d_tf = new conv2d_3x4_1.default([context.input], context.buffer('conv2d_tf'), weights['conv2d_tf']);
        const conv2d_1_tf = new conv2d_8x4_1.default([context.buffer('conv2d_tf')], context.buffer('conv2d_1_tf'), weights['conv2d_1_tf']);
        const conv2d_2_tf = new conv2d_8x4_1.default([context.buffer('conv2d_1_tf')], context.buffer('conv2d_2_tf'), weights['conv2d_2_tf']);
        const conv2d_3_tf = new conv2d_8x4_1.default([context.buffer('conv2d_2_tf')], context.buffer('conv2d_3_tf'), weights['conv2d_3_tf']);
        const conv2d_4_tf = new conv2d_8x4_1.default([context.buffer('conv2d_3_tf')], context.buffer('conv2d_4_tf'), weights['conv2d_4_tf']);
        const conv2d_5_tf = new conv2d_8x4_1.default([context.buffer('conv2d_4_tf')], context.buffer('conv2d_5_tf'), weights['conv2d_5_tf']);
        const conv2d_6_tf = new conv2d_8x4_1.default([context.buffer('conv2d_5_tf')], context.buffer('conv2d_6_tf'), weights['conv2d_6_tf']);
        const conv2d_7_tf = new conv2d_56x4_1.default([context.buffer('conv2d_tf'), context.buffer('conv2d_1_tf'), context.buffer('conv2d_2_tf'), context.buffer('conv2d_3_tf'), context.buffer('conv2d_4_tf'), context.buffer('conv2d_5_tf'), context.buffer('conv2d_6_tf')], context.buffer('conv2d_7_tf'), weights['conv2d_7_tf']);
        const conv2d_7_tf1 = new conv2d_56x4_1.default([context.buffer('conv2d_tf'), context.buffer('conv2d_1_tf'), context.buffer('conv2d_2_tf'), context.buffer('conv2d_3_tf'), context.buffer('conv2d_4_tf'), context.buffer('conv2d_5_tf'), context.buffer('conv2d_6_tf')], context.buffer('conv2d_7_tf1'), weights['conv2d_7_tf1']);
        const conv2d_7_tf2 = new conv2d_56x4_1.default([context.buffer('conv2d_tf'), context.buffer('conv2d_1_tf'), context.buffer('conv2d_2_tf'), context.buffer('conv2d_3_tf'), context.buffer('conv2d_4_tf'), context.buffer('conv2d_5_tf'), context.buffer('conv2d_6_tf')], context.buffer('conv2d_7_tf2'), weights['conv2d_7_tf2']);
        const paint = new display_3c_1.default([context.buffer('conv2d_7_tf'), context.buffer('conv2d_7_tf1'), context.buffer('conv2d_7_tf2'), context.input], context.texture('output'));
        layers.push(conv2d_tf, conv2d_1_tf, conv2d_2_tf, conv2d_3_tf, conv2d_4_tf, conv2d_5_tf, conv2d_6_tf, conv2d_7_tf, conv2d_7_tf1, conv2d_7_tf2, paint);
        return layers;
    }
    feedForward(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (source instanceof HTMLVideoElement) {
                this.context.input = this.context.device.importExternalTexture({ source });
            }
            else {
                const bitmap = source instanceof ImageBitmap ? source : yield createImageBitmap(source);
                const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
                const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
                this.context.device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: this.context.texture('input', { format: "rgba8unorm" }) }, [width, height]);
                this.context.input = this.context.texture('input');
            }
            this.layers[0].inputs[0] = this.context.input;
            this.layers[this.layers.length - 1].inputs[3] = this.context.input;
            this.layers.forEach(function (layer) {
                layer.run();
            });
        });
    }
}
exports["default"] = Anime4KCNN2XM;


//# sourceURL=webpack://WebSR/./src/networks/anime4k/cnn-2x-m.ts?`)},"./src/networks/anime4k/cnn-2x-s.ts":function(__unused_webpack_module,exports,__webpack_require__){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_network_1 = __webpack_require__(/*! ../base_network */ "./src/networks/base_network.ts");
const conv2d_3x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-3x4 */ "./src/layers/anime4k/conv2d-3x4.ts");
const conv2d_8x4_1 = __webpack_require__(/*! ../../layers/anime4k/conv2d-8x4 */ "./src/layers/anime4k/conv2d-8x4.ts");
const display_1 = __webpack_require__(/*! ../../layers/anime4k/display */ "./src/layers/anime4k/display.ts");
class Anime4KCNN2XS extends base_network_1.default {
    constructor(weights) {
        super(weights);
    }
    model() {
        const layers = [];
        const weights = this.weights.layers;
        const context = this.context;
        const conv2d_tf = new conv2d_3x4_1.default([context.input], context.buffer('conv2d_tf'), weights['conv2d_tf']);
        const conv2d_1_tf = new conv2d_8x4_1.default([context.buffer('conv2d_tf')], context.buffer('conv2d_1_tf'), weights['conv2d_1_tf']);
        const conv2d_2_tf = new conv2d_8x4_1.default([context.buffer('conv2d_1_tf')], context.buffer('conv2d_2_tf'), weights['conv2d_2_tf']);
        const conv2d_last_tf = new conv2d_8x4_1.default([context.buffer('conv2d_2_tf')], context.buffer('conv2d_last_tf'), weights['conv2d_last_tf']);
        const paint = new display_1.default([context.buffer('conv2d_last_tf'), context.input], context.texture('output'));
        layers.push(conv2d_tf, conv2d_1_tf, conv2d_2_tf, conv2d_last_tf, paint);
        return layers;
    }
    feedForward(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (source instanceof HTMLVideoElement) {
                this.context.input = this.context.device.importExternalTexture({ source });
            }
            else {
                const bitmap = source instanceof ImageBitmap ? source : yield createImageBitmap(source);
                const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
                const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
                this.context.device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: this.context.texture('input', { format: "rgba8unorm" }) }, [width, height]);
                this.context.input = this.context.texture('input');
            }
            this.layers[0].inputs[0] = this.context.input;
            this.layers[this.layers.length - 1].inputs[1] = this.context.input;
            this.layers.forEach(function (layer) {
                layer.run();
            });
        });
    }
}
exports["default"] = Anime4KCNN2XS;


//# sourceURL=webpack://WebSR/./src/networks/anime4k/cnn-2x-s.ts?`)},"./src/networks/base_network.ts":function(__unused_webpack_module,exports){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class NeuralNetwork {
    constructor(weights) {
        this.weights = weights;
        this.context = globalThis.context;
        this.layers = this.model();
    }
    model() {
        return [];
    }
    lastLayer() {
        return this.layers[this.layers.length - 1];
    }
    feedForward(source) {
        return __awaiter(this, void 0, void 0, function* () {
            this.layers.forEach(layer => {
                layer.run();
            });
        });
    }
}
exports["default"] = NeuralNetwork;


//# sourceURL=webpack://WebSR/./src/networks/base_network.ts?`)},"./src/networks/network_list.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetworkList = void 0;
const cnn_2x_s_1 = __webpack_require__(/*! ./anime4k/cnn-2x-s */ "./src/networks/anime4k/cnn-2x-s.ts");
const cnn_2x_m_1 = __webpack_require__(/*! ./anime4k/cnn-2x-m */ "./src/networks/anime4k/cnn-2x-m.ts");
const cnn_2x_l_1 = __webpack_require__(/*! ./anime4k/cnn-2x-l */ "./src/networks/anime4k/cnn-2x-l.ts");
const poc_network_1 = __webpack_require__(/*! ./poc_network */ "./src/networks/poc_network.ts");
exports.NetworkList = {
    "anime4k/cnn-2x-s": cnn_2x_s_1.default,
    "anime4k/cnn-2x-m": cnn_2x_m_1.default,
    "anime4k/cnn-2x-l": cnn_2x_l_1.default,
    "sb2702/blur-poc": poc_network_1.default
};


//# sourceURL=webpack://WebSR/./src/networks/network_list.ts?`)},"./src/networks/poc_network.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval(`
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_network_1 = __webpack_require__(/*! ./base_network */ "./src/networks/base_network.ts");
const rgb_2_yuv_1 = __webpack_require__(/*! ../layers/utils/rgb_2_yuv */ "./src/layers/utils/rgb_2_yuv.ts");
const gaussian_1 = __webpack_require__(/*! ../layers/utils/gaussian */ "./src/layers/utils/gaussian.ts");
class PoCNetwork extends base_network_1.default {
    constructor() {
        super();
    }
    model() {
        const layers = [];
        const context = this.context;
        layers.push(new rgb_2_yuv_1.default([context.texture('input')], context.texture('yuv')));
        layers.push(new gaussian_1.default([context.texture('yuv')], context.texture('output')));
        return layers;
    }
}
exports["default"] = PoCNetwork;


//# sourceURL=webpack://WebSR/./src/networks/poc_network.ts?`)},"./src/renderer.ts":function(__unused_webpack_module,exports,__webpack_require__){eval(`
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const display_1 = __webpack_require__(/*! ./layers/anime4k/display */ "./src/layers/anime4k/display.ts");
const base_render_layer_1 = __webpack_require__(/*! ./layers/base_render_layer */ "./src/layers/base_render_layer.ts");
class WebSRRenderer {
    constructor(network, source) {
        this.context = globalThis.context;
        this.network = network;
        this.source = source;
        this.active = false;
    }
    switchNetwork(network) {
        this.network = network;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.context.destroyed) {
                throw new Error("WebSR instance was destroyed");
            }
            this.active = true;
            yield this.renderStep();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.active = false;
            if (this.vfc && this.source && this.source instanceof HTMLVideoElement)
                this.source.cancelVideoFrameCallback(this.vfc);
        });
    }
    renderStep() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastLayer = this.network.lastLayer();
            if (lastLayer instanceof display_1.default)
                lastLayer.setOutput(this.context.context.getCurrentTexture());
            yield this.render();
            if (this.active && this.source && this.source instanceof HTMLVideoElement) {
                this.vfc = this.source.requestVideoFrameCallback(this.renderStep.bind(this));
            }
        });
    }
    render(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastLayer = this.network.lastLayer();
            if (lastLayer instanceof base_render_layer_1.default)
                lastLayer.setOutput(this.context.context.getCurrentTexture());
            yield this.network.feedForward(source ? source : this.source);
            yield this.context.device.queue.onSubmittedWorkDone();
        });
    }
}
exports["default"] = WebSRRenderer;


//# sourceURL=webpack://WebSR/./src/renderer.ts?`)}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(t!==void 0)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}var __webpack_exports__=__webpack_require__("./src/main.ts");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})())})(websr);var websrExports=websr.exports;const WebSR=getDefaultExportFromCjs(websrExports),_withScopeId$2=e=>(pushScopeId("data-v-81e9b185"),e=e(),popScopeId(),e),_hoisted_1$a={class:"hero"},_hoisted_2$a={class:"video-container"},_hoisted_3$8=_withScopeId$2(()=>createBaseVNode("h2",{class:"hero-heading"},"Join the fun",-1)),_hoisted_4$7=_withScopeId$2(()=>createBaseVNode("p",{class:"hero-subheading"},"Jump in and jump jump test tetstsetstetstest.",-1)),_hoisted_5$6=_withScopeId$2(()=>createBaseVNode("button",{class:"btn btn-primary"},"Learn More",-1)),_sfc_main$c=defineComponent({__name:"Hero",setup(e){const t=ref(null),n=[__vitePreload(()=>import("./vid1-4pro2ipg.js"),__vite__mapDeps([])),__vitePreload(()=>import("./vid2-jFH9QM0d.js"),__vite__mapDeps([])),__vitePreload(()=>import("./vid3-9rbE9Ipy.js"),__vite__mapDeps([]))];let r=0,s=null;async function o(){const i=await WebSR.initWebGPU();if(!i)return console.log("Browser/device doesn't support WebGPU");s=document.createElement("video"),s.muted=!0,s.loop=!0,s.autoplay=!0,s.src=(await n[r]).default;const a=t.value;a&&s&&(a.width=s.videoWidth*2,a.height=s.videoHeight*2,await new WebSR({source:s,network_name:"anime4k/cnn-2x-s",weights:await(await fetch("@/assets/cnn-2x-s.json")).json(),gpu:i,canvas:a}).start()),s.addEventListener("ended",async()=>{r=(r+1)%n.length,s.src=(await n[r]).default,s.play()})}return onMounted(async()=>{await nextTick(),o()}),(i,a)=>(openBlock(),createElementBlock("div",_hoisted_1$a,[createBaseVNode("div",_hoisted_2$a,[createBaseVNode("canvas",{ref_key:"upscaledCanvas",ref:t,class:"upscaled-video"},null,512)]),_hoisted_3$8,_hoisted_4$7,_hoisted_5$6]))}}),_export_sfc=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Hero=_export_sfc(_sfc_main$c,[["__scopeId","data-v-81e9b185"]]),_sfc_main$b={},_withScopeId$1=e=>(pushScopeId("data-v-c50ad380"),e=e(),popScopeId(),e),_hoisted_1$9={class:"header d-flex justify-space-between"},_hoisted_2$9=_withScopeId$1(()=>createBaseVNode("h1",null,"Welcome ",-1)),_hoisted_3$7=[_hoisted_2$9];function _sfc_render$1(e,t){return openBlock(),createElementBlock("header",_hoisted_1$9,_hoisted_3$7)}const Header=_export_sfc(_sfc_main$b,[["render",_sfc_render$1],["__scopeId","data-v-c50ad380"]]),_hoisted_1$8={class:"testimonials my-5"},_hoisted_2$8={class:"container"},_hoisted_3$6=createBaseVNode("h2",{class:"h3 mb-4 text-center"},"What Our Clients Say",-1),_hoisted_4$6={class:"row"},_hoisted_5$5={class:"card mb-3"},_hoisted_6$4={class:"card-body"},_hoisted_7$3={class:"blockquote mb-0"},_hoisted_8$2={class:"blockquote-footer"},_sfc_main$a=defineComponent({__name:"Testimonials",setup(e){const t=ref([{id:1,author:"John Doe",quote:"This company is amazing! They transformed our business."},{id:2,author:"Jane Smith",quote:"Highly professional team and outstanding service."}]);return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$8,[createBaseVNode("div",_hoisted_2$8,[_hoisted_3$6,createBaseVNode("div",_hoisted_4$6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,s=>(openBlock(),createElementBlock("div",{class:"col-md-6",key:s.id},[createBaseVNode("div",_hoisted_5$5,[createBaseVNode("div",_hoisted_6$4,[createBaseVNode("blockquote",_hoisted_7$3,[createBaseVNode("p",null,toDisplayString(s.quote),1),createBaseVNode("footer",_hoisted_8$2,toDisplayString(s.author),1)])])])]))),128))])])]))}}),_hoisted_1$7={class:"mb-3"},_hoisted_2$7=createBaseVNode("label",{for:"name",class:"form-label"},"Name",-1),_sfc_main$9=defineComponent({__name:"Services",setup(e){const t=ref({name:"",email:"",message:""});return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$7,[_hoisted_2$7,withDirectives(createBaseVNode("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":r[0]||(r[0]=s=>t.value.name=s),required:""},null,512),[[vModelText,t.value.name]])]))}}),_hoisted_1$6={class:"faq my-5"},_hoisted_2$6={class:"container"},_hoisted_3$5=createBaseVNode("h2",{class:"h3 mb-4 text-center"},"Frequently Asked Questions",-1),_hoisted_4$5={class:"accordion",id:"faqAccordion"},_hoisted_5$4=["id"],_hoisted_6$3=["data-bs-target","aria-expanded","aria-controls"],_hoisted_7$2=["id","aria-labelledby"],_hoisted_8$1={class:"accordion-body"},_sfc_main$8=defineComponent({__name:"FAQ",setup(e){const t=ref([{id:1,question:"How do I get started?",answer:"Simply contact us through our form, and we will guide you through the process."},{id:2,question:"What is the turnaround time for a project?",answer:"The timeline varies based on the project scope, but we always aim to deliver promptly."}]);return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$6,[createBaseVNode("div",_hoisted_2$6,[_hoisted_3$5,createBaseVNode("div",_hoisted_4$5,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,(s,o)=>(openBlock(),createElementBlock("div",{class:"accordion-item",key:s.id},[createBaseVNode("h2",{class:"accordion-header",id:"heading"+s.id},[createBaseVNode("button",{class:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapse"+s.id,"aria-expanded":o===0?"true":"false","aria-controls":"collapse"+s.id},toDisplayString(s.question),9,_hoisted_6$3)],8,_hoisted_5$4),createBaseVNode("div",{id:"collapse"+s.id,class:normalizeClass(["accordion-collapse collapse",{show:o===0}]),"aria-labelledby":"heading"+s.id,"data-bs-parent":"#faqAccordion"},[createBaseVNode("div",_hoisted_8$1,toDisplayString(s.answer),1)],10,_hoisted_7$2)]))),128))])])]))}}),_sfc_main$7=defineComponent({__name:"Home",setup(e){return(t,n)=>(openBlock(),createElementBlock(Fragment,null,[createVNode(Header),createVNode(Hero),createVNode(_sfc_main$9),createVNode(_sfc_main$a),createVNode(_sfc_main$8)],64))}}),_sfc_main$6={},_hoisted_1$5={class:"container py-5"},_hoisted_2$5=createBaseVNode("h1",{class:"display-4"},"About Us",-1),_hoisted_3$4=createBaseVNode("p",{class:"lead"},"Learn more about our company.",-1),_hoisted_4$4=[_hoisted_2$5,_hoisted_3$4];function _sfc_render(e,t){return openBlock(),createElementBlock("div",_hoisted_1$5,_hoisted_4$4)}const Booking=_export_sfc(_sfc_main$6,[["render",_sfc_render]]),_hoisted_1$4=createBaseVNode("h2",{class:"h3 text-center mb-4"},"Our Services",-1),_hoisted_2$4={class:"row g-4"},_hoisted_3$3={class:"card h-100"},_hoisted_4$3={class:"card-body"},_hoisted_5$3={class:"card-title"},_hoisted_6$2={class:"card-text"},_sfc_main$5=defineComponent({__name:"Classes",setup(e){const t=ref([{id:1,title:"Web Design",description:"Creating stunning and responsive websites."},{id:2,title:"Digital Marketing",description:"Promoting your business online."},{id:3,title:"Branding",description:"Building your brand identity."}]);return(n,r)=>(openBlock(),createElementBlock("section",null,[_hoisted_1$4,createBaseVNode("div",_hoisted_2$4,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,s=>(openBlock(),createElementBlock("div",{class:"col-md-4",key:s.id},[createBaseVNode("div",_hoisted_3$3,[createBaseVNode("div",_hoisted_4$3,[createBaseVNode("h5",_hoisted_5$3,toDisplayString(s.title),1),createBaseVNode("p",_hoisted_6$2,toDisplayString(s.description),1)])])]))),128))])]))}}),_hoisted_1$3={class:"mb-3"},_hoisted_2$3=createBaseVNode("label",{for:"name",class:"form-label"},"Name",-1),_hoisted_3$2={class:"mb-3"},_hoisted_4$2=createBaseVNode("label",{for:"email",class:"form-label"},"Email",-1),_hoisted_5$2={class:"mb-3"},_hoisted_6$1=createBaseVNode("label",{for:"message",class:"form-label"},"Message",-1),_hoisted_7$1=createBaseVNode("div",{class:"text-center"},[createBaseVNode("button",{type:"submit",class:"btn btn-primary"},"Send Message")],-1),_sfc_main$4=defineComponent({__name:"ContactForm",setup(e){const t=ref({name:"",email:"",message:""}),n=()=>{alert(`Message sent by: ${t.value.name}`),t.value={name:"",email:"",message:""}};return(r,s)=>(openBlock(),createElementBlock("form",{onSubmit:withModifiers(n,["prevent"]),class:"g-3"},[createBaseVNode("div",_hoisted_1$3,[_hoisted_2$3,withDirectives(createBaseVNode("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":s[0]||(s[0]=o=>t.value.name=o),required:""},null,512),[[vModelText,t.value.name]])]),createBaseVNode("div",_hoisted_3$2,[_hoisted_4$2,withDirectives(createBaseVNode("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":s[1]||(s[1]=o=>t.value.email=o),required:""},null,512),[[vModelText,t.value.email]])]),createBaseVNode("div",_hoisted_5$2,[_hoisted_6$1,withDirectives(createBaseVNode("textarea",{class:"form-control",id:"message",rows:"4","onUpdate:modelValue":s[2]||(s[2]=o=>t.value.message=o),required:""},null,512),[[vModelText,t.value.message]])]),_hoisted_7$1],32))}}),_hoisted_1$2={class:"container py-5"},_hoisted_2$2=createBaseVNode("h1",{class:"display-4"},"Contact Us",-1),_hoisted_3$1=createBaseVNode("p",{class:"lead"},"Get in touch with us for any inquiries or support.",-1),_hoisted_4$1={class:"row"},_hoisted_5$1={class:"col-lg-8 mx-auto"},_sfc_main$3=defineComponent({__name:"Contact",setup(e){return(t,n)=>(openBlock(),createElementBlock("div",_hoisted_1$2,[_hoisted_2$2,_hoisted_3$1,createBaseVNode("div",_hoisted_4$1,[createBaseVNode("div",_hoisted_5$1,[createVNode(_sfc_main$4)])])]))}}),routes=[{path:"/",component:_sfc_main$7,name:"home"},{path:"/booking",component:Booking,name:"booking"},{path:"/classes",component:_sfc_main$5,name:"classes"},{path:"/contact-us",component:_sfc_main$3,name:"contact"}],router=createRouter({history:createWebHistory("/OffTheFloor/"),routes}),_imports_0="/OffTheFloor/assets/transparent-logo-YF9JrUWX.png",_withScopeId=e=>(pushScopeId("data-v-c437a2e6"),e=e(),popScopeId(),e),_hoisted_1$1={class:"navbar navbar-expand-lg navbar-dark bg-smoke border-bottom"},_hoisted_2$1={class:"container"},_hoisted_3=_withScopeId(()=>createBaseVNode("img",{src:_imports_0,class:"logo-img"},null,-1)),_hoisted_4=[_hoisted_3],_hoisted_5=_withScopeId(()=>createBaseVNode("span",{class:"navbar-toggler-icon"},null,-1)),_hoisted_6=[_hoisted_5],_hoisted_7={class:"navbar-nav mb-2 mb-lg-0"},_hoisted_8={class:"nav-item"},_hoisted_9={class:"nav-item"},_hoisted_10={class:"nav-item"},_hoisted_11={class:"nav-item"},_hoisted_12={class:"nav-item"},_hoisted_13=createStaticVNode('<div class="d-flex justify-content-center" data-v-c437a2e6><div class="" data-v-c437a2e6><button class="btn btn-outline-secondary d-lg-flex mb-2 mb-lg-0" data-v-c437a2e6> BOOK YOUR SESSION </button><div class="icon-container d-flex" data-v-c437a2e6><i class="fab fa-facebook-f me-2 fa-2x" data-v-c437a2e6></i><i class="fab fa-instagram me-2 fa-2x" data-v-c437a2e6></i><i class="fab fa-twitter fa-2x" data-v-c437a2e6></i></div></div></div>',1),_sfc_main$2=defineComponent({__name:"Navbar",setup(e){const t=ref(!1),n=()=>{t.value=!t.value},r=()=>{useRouter().push("/")};return(s,o)=>{const i=resolveComponent("router-link"),a=resolveDirective("auto-animate");return openBlock(),createElementBlock("nav",_hoisted_1$1,[withDirectives((openBlock(),createElementBlock("div",_hoisted_2$1,[createBaseVNode("a",{class:"navbar-brand",onClick:r},_hoisted_4),createBaseVNode("button",{class:"navbar-toggler",type:"button",onClick:n},_hoisted_6),createBaseVNode("div",{class:normalizeClass(["collapse navbar-collapse justify-content-center",{show:t.value}])},[withDirectives((openBlock(),createElementBlock("ul",_hoisted_7,[createBaseVNode("li",_hoisted_8,[createVNode(i,{class:"nav-link",to:"/"},{default:withCtx(()=>[createTextVNode("Home")]),_:1})]),createBaseVNode("li",_hoisted_9,[createVNode(i,{class:"nav-link",to:"/schedule"},{default:withCtx(()=>[createTextVNode("Schedule")]),_:1})]),createBaseVNode("li",_hoisted_10,[createVNode(i,{class:"nav-link",to:"/classes"},{default:withCtx(()=>[createTextVNode("Classes")]),_:1})]),createBaseVNode("li",_hoisted_11,[createVNode(i,{class:"nav-link",to:"/contact-us"},{default:withCtx(()=>[createTextVNode("Contact & Location")]),_:1})]),createBaseVNode("li",_hoisted_12,[createVNode(i,{class:"nav-link",to:"/contact"},{default:withCtx(()=>[createTextVNode("Updates")]),_:1})])])),[[a]]),_hoisted_13],2)])),[[a]])])}}}),Navbar=_export_sfc(_sfc_main$2,[["__scopeId","data-v-c437a2e6"]]),_hoisted_1={class:"bg-primary text-white text-center py-3"},_hoisted_2={class:"container"},_sfc_main$1=defineComponent({__name:"Footer",setup(e){const t=new Date().getFullYear();return(n,r)=>(openBlock(),createElementBlock("footer",_hoisted_1,[createBaseVNode("div",_hoisted_2," © "+toDisplayString(unref(t))+" Name. All rights reserved. ",1)]))}}),_sfc_main=defineComponent({__name:"App",setup(e){const t=useRoute(),n=crypto.randomUUID();return onMounted(()=>{const{fullPath:r}=toRefs(t);console.log(r)}),(r,s)=>{const o=resolveComponent("router-view");return openBlock(),createElementBlock(Fragment,null,[createVNode(Navbar),(openBlock(),createBlock(o,{key:unref(n)})),createVNode(_sfc_main$1)],64)}}}),app=createApp(_sfc_main);app.use(router);initAutoAnimate(app);app.mount("#app");
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
