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
`],...formatTraceEntry(n))}),t}function formatTraceEntry({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",r=e.component?e.component.parent==null:!1,s=` at <${formatComponentName(e.component,e.type,r)}`,o=">"+n;return e.props?[s,...formatProps(e.props),o]:[s+o]}function formatProps(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(r=>{t.push(...formatProp(r,e[r]))}),n.length>3&&t.push(" ..."),t}function formatProp(e,t,n){return isString(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:isRef(t)?(t=formatProp(e,toRaw(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):isFunction(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=toRaw(t),n?t:[`${e}=`,t])}function callWithErrorHandling(e,t,n,r){let s;try{s=r?e(...r):e()}catch(o){handleError(o,t,n)}return s}function callWithAsyncErrorHandling(e,t,n,r){if(isFunction(e)){const o=callWithErrorHandling(e,t,n,r);return o&&isPromise(o)&&o.catch(i=>{handleError(i,t,n)}),o}const s=[];for(let o=0;o<e.length;o++)s.push(callWithAsyncErrorHandling(e[o],t,n,r));return s}function handleError(e,t,n,r=!0){const s=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;for(;o;){const d=o.ec;if(d){for(let u=0;u<d.length;u++)if(d[u](e,i,a)===!1)return}o=o.parent}const c=t.appContext.config.errorHandler;if(c){callWithErrorHandling(c,null,10,[e,i,a]);return}}logError(e,n,s,r)}function logError(e,t,n,r=!0){console.error(e)}let isFlushing=!1,isFlushPending=!1;const queue=[];let flushIndex=0;const pendingPostFlushCbs=[];let activePostFlushCbs=null,postFlushIndex=0;const resolvedPromise=Promise.resolve();let currentFlushPromise=null;function nextTick(e){const t=currentFlushPromise||resolvedPromise;return e?t.then(this?e.bind(this):e):t}function findInsertionIndex(e){let t=flushIndex+1,n=queue.length;for(;t<n;){const r=t+n>>>1,s=queue[r],o=getId(s);o<e||o===e&&s.pre?t=r+1:n=r}return t}function queueJob(e){(!queue.length||!queue.includes(e,isFlushing&&e.allowRecurse?flushIndex+1:flushIndex))&&(e.id==null?queue.push(e):queue.splice(findInsertionIndex(e.id),0,e),queueFlush())}function queueFlush(){!isFlushing&&!isFlushPending&&(isFlushPending=!0,currentFlushPromise=resolvedPromise.then(flushJobs))}function invalidateJob(e){const t=queue.indexOf(e);t>flushIndex&&queue.splice(t,1)}function queuePostFlushCb(e){isArray$1(e)?pendingPostFlushCbs.push(...e):(!activePostFlushCbs||!activePostFlushCbs.includes(e,e.allowRecurse?postFlushIndex+1:postFlushIndex))&&pendingPostFlushCbs.push(e),queueFlush()}function flushPreFlushCbs(e,t,n=isFlushing?flushIndex+1:0){for(;n<queue.length;n++){const r=queue[n];if(r&&r.pre){if(e&&r.id!==e.uid)continue;queue.splice(n,1),n--,r()}}}function flushPostFlushCbs(e){if(pendingPostFlushCbs.length){const t=[...new Set(pendingPostFlushCbs)].sort((n,r)=>getId(n)-getId(r));if(pendingPostFlushCbs.length=0,activePostFlushCbs){activePostFlushCbs.push(...t);return}for(activePostFlushCbs=t,postFlushIndex=0;postFlushIndex<activePostFlushCbs.length;postFlushIndex++)activePostFlushCbs[postFlushIndex]();activePostFlushCbs=null,postFlushIndex=0}}const getId=e=>e.id==null?1/0:e.id,comparator=(e,t)=>{const n=getId(e)-getId(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function flushJobs(e){isFlushPending=!1,isFlushing=!0,queue.sort(comparator);try{for(flushIndex=0;flushIndex<queue.length;flushIndex++){const t=queue[flushIndex];t&&t.active!==!1&&callWithErrorHandling(t,null,14)}}finally{flushIndex=0,queue.length=0,flushPostFlushCbs(),isFlushing=!1,currentFlushPromise=null,(queue.length||pendingPostFlushCbs.length)&&flushJobs()}}function emit(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||EMPTY_OBJ;let s=n;const o=t.startsWith("update:"),i=o&&t.slice(7);if(i&&i in r){const u=`${i==="modelValue"?"model":i}Modifiers`,{number:_,trim:m}=r[u]||EMPTY_OBJ;m&&(s=n.map(x=>isString(x)?x.trim():x)),_&&(s=n.map(looseToNumber))}let a,c=r[a=toHandlerKey(t)]||r[a=toHandlerKey(camelize(t))];!c&&o&&(c=r[a=toHandlerKey(hyphenate(t))]),c&&callWithAsyncErrorHandling(c,e,6,s);const d=r[a+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,callWithAsyncErrorHandling(d,e,6,s)}}function normalizeEmitsOptions(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(s!==void 0)return s;const o=e.emits;let i={},a=!1;if(!isFunction(e)){const c=d=>{const u=normalizeEmitsOptions(d,t,!0);u&&(a=!0,extend(i,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!o&&!a?(isObject(e)&&r.set(e,null),null):(isArray$1(o)?o.forEach(c=>i[c]=null):extend(i,o),isObject(e)&&r.set(e,i),i)}function isEmitListener(e,t){return!e||!isOn(t)?!1:(t=t.slice(2).replace(/Once$/,""),hasOwn(e,t[0].toLowerCase()+t.slice(1))||hasOwn(e,hyphenate(t))||hasOwn(e,t))}let currentRenderingInstance=null,currentScopeId=null;function setCurrentRenderingInstance(e){const t=currentRenderingInstance;return currentRenderingInstance=e,currentScopeId=e&&e.type.__scopeId||null,t}function pushScopeId(e){currentScopeId=e}function popScopeId(){currentScopeId=null}function withCtx(e,t=currentRenderingInstance,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&setBlockTracking(-1);const o=setCurrentRenderingInstance(t);let i;try{i=e(...s)}finally{setCurrentRenderingInstance(o),r._d&&setBlockTracking(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function markAttrsAccessed(){}function renderComponentRoot(e){const{type:t,vnode:n,proxy:r,withProxy:s,props:o,propsOptions:[i],slots:a,attrs:c,emit:d,render:u,renderCache:_,data:m,setupState:x,ctx:C,inheritAttrs:N}=e;let M,$;const F=setCurrentRenderingInstance(e);try{if(n.shapeFlag&4){const H=s||r,Y=H;M=normalizeVNode(u.call(Y,H,_,o,x,m,C)),$=c}else{const H=t;M=normalizeVNode(H.length>1?H(o,{attrs:c,slots:a,emit:d}):H(o,null)),$=t.props?c:getFunctionalFallthrough(c)}}catch(H){blockStack.length=0,handleError(H,e,1),M=createVNode(Comment)}let V=M;if($&&N!==!1){const H=Object.keys($),{shapeFlag:Y}=V;H.length&&Y&7&&(i&&H.some(isModelListener)&&($=filterModelListeners($,i)),V=cloneVNode(V,$))}return n.dirs&&(V=cloneVNode(V),V.dirs=V.dirs?V.dirs.concat(n.dirs):n.dirs),n.transition&&(V.transition=n.transition),M=V,setCurrentRenderingInstance(F),M}const getFunctionalFallthrough=e=>{let t;for(const n in e)(n==="class"||n==="style"||isOn(n))&&((t||(t={}))[n]=e[n]);return t},filterModelListeners=(e,t)=>{const n={};for(const r in e)(!isModelListener(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function shouldUpdateComponent(e,t,n){const{props:r,children:s,component:o}=e,{props:i,children:a,patchFlag:c}=t,d=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?hasPropsChanged(r,i,d):!!i;if(c&8){const u=t.dynamicProps;for(let _=0;_<u.length;_++){const m=u[_];if(i[m]!==r[m]&&!isEmitListener(d,m))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===i?!1:r?i?hasPropsChanged(r,i,d):!0:!!i;return!1}function hasPropsChanged(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const o=r[s];if(t[o]!==e[o]&&!isEmitListener(n,o))return!0}return!1}function updateHOCHostEl({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const COMPONENTS="components",DIRECTIVES="directives";function resolveComponent(e,t){return resolveAsset(COMPONENTS,e,!0,t)||e}const NULL_DYNAMIC_COMPONENT=Symbol.for("v-ndc");function resolveDirective(e){return resolveAsset(DIRECTIVES,e)}function resolveAsset(e,t,n=!0,r=!1){const s=currentRenderingInstance||currentInstance;if(s){const o=s.type;if(e===COMPONENTS){const a=getComponentName(o,!1);if(a&&(a===t||a===camelize(t)||a===capitalize(camelize(t))))return o}const i=resolve(s[e]||o[e],t)||resolve(s.appContext[e],t);return!i&&r?o:i}}function resolve(e,t){return e&&(e[t]||e[camelize(t)]||e[capitalize(camelize(t))])}const isSuspense=e=>e.__isSuspense;function queueEffectWithSuspense(e,t){t&&t.pendingBranch?isArray$1(e)?t.effects.push(...e):t.effects.push(e):queuePostFlushCb(e)}const ssrContextKey=Symbol.for("v-scx"),useSSRContext=()=>inject(ssrContextKey),INITIAL_WATCHER_VALUE={};function watch(e,t,n){return doWatch(e,t,n)}function doWatch(e,t,{immediate:n,deep:r,flush:s,once:o,onTrack:i,onTrigger:a}=EMPTY_OBJ){if(t&&o){const U=t;t=(...Z)=>{U(...Z),Y()}}const c=currentInstance,d=U=>r===!0?U:traverse(U,r===!1?1:void 0);let u,_=!1,m=!1;if(isRef(e)?(u=()=>e.value,_=isShallow(e)):isReactive(e)?(u=()=>d(e),_=!0):isArray$1(e)?(m=!0,_=e.some(U=>isReactive(U)||isShallow(U)),u=()=>e.map(U=>{if(isRef(U))return U.value;if(isReactive(U))return d(U);if(isFunction(U))return callWithErrorHandling(U,c,2)})):isFunction(e)?t?u=()=>callWithErrorHandling(e,c,2):u=()=>(x&&x(),callWithAsyncErrorHandling(e,c,3,[C])):u=NOOP,t&&r){const U=u;u=()=>traverse(U())}let x,C=U=>{x=V.onStop=()=>{callWithErrorHandling(U,c,4),x=V.onStop=void 0}},N;if(isInSSRComponentSetup)if(C=NOOP,t?n&&callWithAsyncErrorHandling(t,c,3,[u(),m?[]:void 0,C]):u(),s==="sync"){const U=useSSRContext();N=U.__watcherHandles||(U.__watcherHandles=[])}else return NOOP;let M=m?new Array(e.length).fill(INITIAL_WATCHER_VALUE):INITIAL_WATCHER_VALUE;const $=()=>{if(!(!V.active||!V.dirty))if(t){const U=V.run();(r||_||(m?U.some((Z,n0)=>hasChanged(Z,M[n0])):hasChanged(U,M)))&&(x&&x(),callWithAsyncErrorHandling(t,c,3,[U,M===INITIAL_WATCHER_VALUE?void 0:m&&M[0]===INITIAL_WATCHER_VALUE?[]:M,C]),M=U)}else V.run()};$.allowRecurse=!!t;let F;s==="sync"?F=$:s==="post"?F=()=>queuePostRenderEffect($,c&&c.suspense):($.pre=!0,c&&($.id=c.uid),F=()=>queueJob($));const V=new ReactiveEffect(u,NOOP,F),H=getCurrentScope(),Y=()=>{V.stop(),H&&remove$1(H.effects,V)};return t?n?$():M=V.run():s==="post"?queuePostRenderEffect(V.run.bind(V),c&&c.suspense):V.run(),N&&N.push(Y),Y}function instanceWatch(e,t,n){const r=this.proxy,s=isString(e)?e.includes(".")?createPathGetter(r,e):()=>r[e]:e.bind(r,r);let o;isFunction(t)?o=t:(o=t.handler,n=t);const i=setCurrentInstance(this),a=doWatch(s,o.bind(r),n);return i(),a}function createPathGetter(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function traverse(e,t,n=0,r){if(!isObject(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++}if(r=r||new Set,r.has(e))return e;if(r.add(e),isRef(e))traverse(e.value,t,n,r);else if(isArray$1(e))for(let s=0;s<e.length;s++)traverse(e[s],t,n,r);else if(isSet(e)||isMap(e))e.forEach(s=>{traverse(s,t,n,r)});else if(isPlainObject(e))for(const s in e)traverse(e[s],t,n,r);return e}function withDirectives(e,t){if(currentRenderingInstance===null)return e;const n=getExposeProxy(currentRenderingInstance)||currentRenderingInstance.proxy,r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[o,i,a,c=EMPTY_OBJ]=t[s];o&&(isFunction(o)&&(o={mounted:o,updated:o}),o.deep&&traverse(i),r.push({dir:o,instance:n,value:i,oldValue:void 0,arg:a,modifiers:c}))}return e}function invokeDirectiveHook(e,t,n,r){const s=e.dirs,o=t&&t.dirs;for(let i=0;i<s.length;i++){const a=s[i];o&&(a.oldValue=o[i].value);let c=a.dir[r];c&&(pauseTracking(),callWithAsyncErrorHandling(c,n,8,[e.el,a,e,t]),resetTracking())}}/*! #__NO_SIDE_EFFECTS__ */function defineComponent(e,t){return isFunction(e)?extend({name:e.name},t,{setup:e}):e}const isAsyncWrapper=e=>!!e.type.__asyncLoader,isKeepAlive=e=>e.type.__isKeepAlive;function onActivated(e,t){registerKeepAliveHook(e,"a",t)}function onDeactivated(e,t){registerKeepAliveHook(e,"da",t)}function registerKeepAliveHook(e,t,n=currentInstance){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(injectHook(t,r,n),n){let s=n.parent;for(;s&&s.parent;)isKeepAlive(s.parent.vnode)&&injectToKeepAliveRoot(r,t,n,s),s=s.parent}}function injectToKeepAliveRoot(e,t,n,r){const s=injectHook(t,e,r,!0);onUnmounted(()=>{remove$1(r[t],s)},n)}function injectHook(e,t,n=currentInstance,r=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...i)=>{if(n.isUnmounted)return;pauseTracking();const a=setCurrentInstance(n),c=callWithAsyncErrorHandling(t,n,e,i);return a(),resetTracking(),c});return r?s.unshift(o):s.push(o),o}}const createHook=e=>(t,n=currentInstance)=>(!isInSSRComponentSetup||e==="sp")&&injectHook(e,(...r)=>t(...r),n),onBeforeMount=createHook("bm"),onMounted=createHook("m"),onBeforeUpdate=createHook("bu"),onUpdated=createHook("u"),onBeforeUnmount=createHook("bum"),onUnmounted=createHook("um"),onServerPrefetch=createHook("sp"),onRenderTriggered=createHook("rtg"),onRenderTracked=createHook("rtc");function onErrorCaptured(e,t=currentInstance){injectHook("ec",e,t)}function renderList(e,t,n,r){let s;const o=n&&n[r];if(isArray$1(e)||isString(e)){s=new Array(e.length);for(let i=0,a=e.length;i<a;i++)s[i]=t(e[i],i,void 0,o&&o[i])}else if(typeof e=="number"){s=new Array(e);for(let i=0;i<e;i++)s[i]=t(i+1,i,void 0,o&&o[i])}else if(isObject(e))if(e[Symbol.iterator])s=Array.from(e,(i,a)=>t(i,a,void 0,o&&o[a]));else{const i=Object.keys(e);s=new Array(i.length);for(let a=0,c=i.length;a<c;a++){const d=i[a];s[a]=t(e[d],d,a,o&&o[a])}}else s=[];return n&&(n[r]=s),s}const getPublicInstance=e=>e?isStatefulComponent(e)?getExposeProxy(e)||e.proxy:getPublicInstance(e.parent):null,publicPropertiesMap=extend(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>getPublicInstance(e.parent),$root:e=>getPublicInstance(e.root),$emit:e=>e.emit,$options:e=>resolveMergedOptions(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,queueJob(e.update)}),$nextTick:e=>e.n||(e.n=nextTick.bind(e.proxy)),$watch:e=>instanceWatch.bind(e)}),hasSetupBinding=(e,t)=>e!==EMPTY_OBJ&&!e.__isScriptSetup&&hasOwn(e,t),PublicInstanceProxyHandlers={get({_:e},t){const{ctx:n,setupState:r,data:s,props:o,accessCache:i,type:a,appContext:c}=e;let d;if(t[0]!=="$"){const x=i[t];if(x!==void 0)switch(x){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(hasSetupBinding(r,t))return i[t]=1,r[t];if(s!==EMPTY_OBJ&&hasOwn(s,t))return i[t]=2,s[t];if((d=e.propsOptions[0])&&hasOwn(d,t))return i[t]=3,o[t];if(n!==EMPTY_OBJ&&hasOwn(n,t))return i[t]=4,n[t];shouldCacheAccess&&(i[t]=0)}}const u=publicPropertiesMap[t];let _,m;if(u)return t==="$attrs"&&track(e,"get",t),u(e);if((_=a.__cssModules)&&(_=_[t]))return _;if(n!==EMPTY_OBJ&&hasOwn(n,t))return i[t]=4,n[t];if(m=c.config.globalProperties,hasOwn(m,t))return m[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return hasSetupBinding(s,t)?(s[t]=n,!0):r!==EMPTY_OBJ&&hasOwn(r,t)?(r[t]=n,!0):hasOwn(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},i){let a;return!!n[i]||e!==EMPTY_OBJ&&hasOwn(e,i)||hasSetupBinding(t,i)||(a=o[0])&&hasOwn(a,i)||hasOwn(r,i)||hasOwn(publicPropertiesMap,i)||hasOwn(s.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:hasOwn(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function normalizePropsOrEmits(e){return isArray$1(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let shouldCacheAccess=!0;function applyOptions(e){const t=resolveMergedOptions(e),n=e.proxy,r=e.ctx;shouldCacheAccess=!1,t.beforeCreate&&callHook(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:i,watch:a,provide:c,inject:d,created:u,beforeMount:_,mounted:m,beforeUpdate:x,updated:C,activated:N,deactivated:M,beforeDestroy:$,beforeUnmount:F,destroyed:V,unmounted:H,render:Y,renderTracked:U,renderTriggered:Z,errorCaptured:n0,serverPrefetch:d0,expose:s0,inheritAttrs:l0,components:f0,directives:o0,filters:g0}=t;if(d&&resolveInjections(d,r,null),i)for(const K in i){const q=i[K];isFunction(q)&&(r[K]=q.bind(n))}if(s){const K=s.call(n,n);isObject(K)&&(e.data=reactive(K))}if(shouldCacheAccess=!0,o)for(const K in o){const q=o[K],c0=isFunction(q)?q.bind(n,n):isFunction(q.get)?q.get.bind(n,n):NOOP,u0=!isFunction(q)&&isFunction(q.set)?q.set.bind(n):NOOP,i0=computed({get:c0,set:u0});Object.defineProperty(r,K,{enumerable:!0,configurable:!0,get:()=>i0.value,set:e0=>i0.value=e0})}if(a)for(const K in a)createWatcher(a[K],r,n,K);if(c){const K=isFunction(c)?c.call(n):c;Reflect.ownKeys(K).forEach(q=>{provide(q,K[q])})}u&&callHook(u,e,"c");function J(K,q){isArray$1(q)?q.forEach(c0=>K(c0.bind(n))):q&&K(q.bind(n))}if(J(onBeforeMount,_),J(onMounted,m),J(onBeforeUpdate,x),J(onUpdated,C),J(onActivated,N),J(onDeactivated,M),J(onErrorCaptured,n0),J(onRenderTracked,U),J(onRenderTriggered,Z),J(onBeforeUnmount,F),J(onUnmounted,H),J(onServerPrefetch,d0),isArray$1(s0))if(s0.length){const K=e.exposed||(e.exposed={});s0.forEach(q=>{Object.defineProperty(K,q,{get:()=>n[q],set:c0=>n[q]=c0})})}else e.exposed||(e.exposed={});Y&&e.render===NOOP&&(e.render=Y),l0!=null&&(e.inheritAttrs=l0),f0&&(e.components=f0),o0&&(e.directives=o0)}function resolveInjections(e,t,n=NOOP){isArray$1(e)&&(e=normalizeInject(e));for(const r in e){const s=e[r];let o;isObject(s)?"default"in s?o=inject(s.from||r,s.default,!0):o=inject(s.from||r):o=inject(s),isRef(o)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>o.value,set:i=>o.value=i}):t[r]=o}}function callHook(e,t,n){callWithAsyncErrorHandling(isArray$1(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function createWatcher(e,t,n,r){const s=r.includes(".")?createPathGetter(n,r):()=>n[r];if(isString(e)){const o=t[e];isFunction(o)&&watch(s,o)}else if(isFunction(e))watch(s,e.bind(n));else if(isObject(e))if(isArray$1(e))e.forEach(o=>createWatcher(o,t,n,r));else{const o=isFunction(e.handler)?e.handler.bind(n):t[e.handler];isFunction(o)&&watch(s,o,e)}}function resolveMergedOptions(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,a=o.get(t);let c;return a?c=a:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(d=>mergeOptions$1(c,d,i,!0)),mergeOptions$1(c,t,i)),isObject(t)&&o.set(t,c),c}function mergeOptions$1(e,t,n,r=!1){const{mixins:s,extends:o}=t;o&&mergeOptions$1(e,o,n,!0),s&&s.forEach(i=>mergeOptions$1(e,i,n,!0));for(const i in t)if(!(r&&i==="expose")){const a=internalOptionMergeStrats[i]||n&&n[i];e[i]=a?a(e[i],t[i]):t[i]}return e}const internalOptionMergeStrats={data:mergeDataFn,props:mergeEmitsOrPropsOptions,emits:mergeEmitsOrPropsOptions,methods:mergeObjectOptions,computed:mergeObjectOptions,beforeCreate:mergeAsArray,created:mergeAsArray,beforeMount:mergeAsArray,mounted:mergeAsArray,beforeUpdate:mergeAsArray,updated:mergeAsArray,beforeDestroy:mergeAsArray,beforeUnmount:mergeAsArray,destroyed:mergeAsArray,unmounted:mergeAsArray,activated:mergeAsArray,deactivated:mergeAsArray,errorCaptured:mergeAsArray,serverPrefetch:mergeAsArray,components:mergeObjectOptions,directives:mergeObjectOptions,watch:mergeWatchOptions,provide:mergeDataFn,inject:mergeInject};function mergeDataFn(e,t){return t?e?function(){return extend(isFunction(e)?e.call(this,this):e,isFunction(t)?t.call(this,this):t)}:t:e}function mergeInject(e,t){return mergeObjectOptions(normalizeInject(e),normalizeInject(t))}function normalizeInject(e){if(isArray$1(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function mergeAsArray(e,t){return e?[...new Set([].concat(e,t))]:t}function mergeObjectOptions(e,t){return e?extend(Object.create(null),e,t):t}function mergeEmitsOrPropsOptions(e,t){return e?isArray$1(e)&&isArray$1(t)?[...new Set([...e,...t])]:extend(Object.create(null),normalizePropsOrEmits(e),normalizePropsOrEmits(t??{})):t}function mergeWatchOptions(e,t){if(!e)return t;if(!t)return e;const n=extend(Object.create(null),e);for(const r in t)n[r]=mergeAsArray(e[r],t[r]);return n}function createAppContext(){return{app:null,config:{isNativeTag:NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let uid$1=0;function createAppAPI(e,t){return function(r,s=null){isFunction(r)||(r=extend({},r)),s!=null&&!isObject(s)&&(s=null);const o=createAppContext(),i=new WeakSet;let a=!1;const c=o.app={_uid:uid$1++,_component:r,_props:s,_container:null,_context:o,_instance:null,version,get config(){return o.config},set config(d){},use(d,...u){return i.has(d)||(d&&isFunction(d.install)?(i.add(d),d.install(c,...u)):isFunction(d)&&(i.add(d),d(c,...u))),c},mixin(d){return o.mixins.includes(d)||o.mixins.push(d),c},component(d,u){return u?(o.components[d]=u,c):o.components[d]},directive(d,u){return u?(o.directives[d]=u,c):o.directives[d]},mount(d,u,_){if(!a){const m=createVNode(r,s);return m.appContext=o,_===!0?_="svg":_===!1&&(_=void 0),u&&t?t(m,d):e(m,d,_),a=!0,c._container=d,d.__vue_app__=c,getExposeProxy(m.component)||m.component.proxy}},unmount(){a&&(e(null,c._container),delete c._container.__vue_app__)},provide(d,u){return o.provides[d]=u,c},runWithContext(d){currentApp=c;try{return d()}finally{currentApp=null}}};return c}}let currentApp=null;function provide(e,t){if(currentInstance){let n=currentInstance.provides;const r=currentInstance.parent&&currentInstance.parent.provides;r===n&&(n=currentInstance.provides=Object.create(r)),n[e]=t}}function inject(e,t,n=!1){const r=currentInstance||currentRenderingInstance;if(r||currentApp){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:currentApp._context.provides;if(s&&e in s)return s[e];if(arguments.length>1)return n&&isFunction(t)?t.call(r&&r.proxy):t}}function initProps(e,t,n,r=!1){const s={},o={};def(o,InternalObjectKey,1),e.propsDefaults=Object.create(null),setFullProps(e,t,s,o);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);n?e.props=r?s:shallowReactive(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function updateProps(e,t,n,r){const{props:s,attrs:o,vnode:{patchFlag:i}}=e,a=toRaw(s),[c]=e.propsOptions;let d=!1;if((r||i>0)&&!(i&16)){if(i&8){const u=e.vnode.dynamicProps;for(let _=0;_<u.length;_++){let m=u[_];if(isEmitListener(e.emitsOptions,m))continue;const x=t[m];if(c)if(hasOwn(o,m))x!==o[m]&&(o[m]=x,d=!0);else{const C=camelize(m);s[C]=resolvePropValue(c,a,C,x,e,!1)}else x!==o[m]&&(o[m]=x,d=!0)}}}else{setFullProps(e,t,s,o)&&(d=!0);let u;for(const _ in a)(!t||!hasOwn(t,_)&&((u=hyphenate(_))===_||!hasOwn(t,u)))&&(c?n&&(n[_]!==void 0||n[u]!==void 0)&&(s[_]=resolvePropValue(c,a,_,void 0,e,!0)):delete s[_]);if(o!==a)for(const _ in o)(!t||!hasOwn(t,_))&&(delete o[_],d=!0)}d&&trigger(e,"set","$attrs")}function setFullProps(e,t,n,r){const[s,o]=e.propsOptions;let i=!1,a;if(t)for(let c in t){if(isReservedProp(c))continue;const d=t[c];let u;s&&hasOwn(s,u=camelize(c))?!o||!o.includes(u)?n[u]=d:(a||(a={}))[u]=d:isEmitListener(e.emitsOptions,c)||(!(c in r)||d!==r[c])&&(r[c]=d,i=!0)}if(o){const c=toRaw(n),d=a||EMPTY_OBJ;for(let u=0;u<o.length;u++){const _=o[u];n[_]=resolvePropValue(s,c,_,d[_],e,!hasOwn(d,_))}}return i}function resolvePropValue(e,t,n,r,s,o){const i=e[n];if(i!=null){const a=hasOwn(i,"default");if(a&&r===void 0){const c=i.default;if(i.type!==Function&&!i.skipFactory&&isFunction(c)){const{propsDefaults:d}=s;if(n in d)r=d[n];else{const u=setCurrentInstance(s);r=d[n]=c.call(null,t),u()}}else r=c}i[0]&&(o&&!a?r=!1:i[1]&&(r===""||r===hyphenate(n))&&(r=!0))}return r}function normalizePropsOptions(e,t,n=!1){const r=t.propsCache,s=r.get(e);if(s)return s;const o=e.props,i={},a=[];let c=!1;if(!isFunction(e)){const u=_=>{c=!0;const[m,x]=normalizePropsOptions(_,t,!0);extend(i,m),x&&a.push(...x)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!o&&!c)return isObject(e)&&r.set(e,EMPTY_ARR),EMPTY_ARR;if(isArray$1(o))for(let u=0;u<o.length;u++){const _=camelize(o[u]);validatePropName(_)&&(i[_]=EMPTY_OBJ)}else if(o)for(const u in o){const _=camelize(u);if(validatePropName(_)){const m=o[u],x=i[_]=isArray$1(m)||isFunction(m)?{type:m}:extend({},m);if(x){const C=getTypeIndex(Boolean,x.type),N=getTypeIndex(String,x.type);x[0]=C>-1,x[1]=N<0||C<N,(C>-1||hasOwn(x,"default"))&&a.push(_)}}}const d=[i,a];return isObject(e)&&r.set(e,d),d}function validatePropName(e){return e[0]!=="$"}function getType(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function isSameType(e,t){return getType(e)===getType(t)}function getTypeIndex(e,t){return isArray$1(t)?t.findIndex(n=>isSameType(n,e)):isFunction(t)&&isSameType(t,e)?0:-1}const isInternalKey=e=>e[0]==="_"||e==="$stable",normalizeSlotValue=e=>isArray$1(e)?e.map(normalizeVNode):[normalizeVNode(e)],normalizeSlot$1=(e,t,n)=>{if(t._n)return t;const r=withCtx((...s)=>normalizeSlotValue(t(...s)),n);return r._c=!1,r},normalizeObjectSlots=(e,t,n)=>{const r=e._ctx;for(const s in e){if(isInternalKey(s))continue;const o=e[s];if(isFunction(o))t[s]=normalizeSlot$1(s,o,r);else if(o!=null){const i=normalizeSlotValue(o);t[s]=()=>i}}},normalizeVNodeSlots=(e,t)=>{const n=normalizeSlotValue(t);e.slots.default=()=>n},initSlots=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=toRaw(t),def(t,"_",n)):normalizeObjectSlots(t,e.slots={})}else e.slots={},t&&normalizeVNodeSlots(e,t);def(e.slots,InternalObjectKey,1)},updateSlots=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,i=EMPTY_OBJ;if(r.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:(extend(s,t),!n&&a===1&&delete s._):(o=!t.$stable,normalizeObjectSlots(t,s)),i=t}else t&&(normalizeVNodeSlots(e,t),i={default:1});if(o)for(const a in s)!isInternalKey(a)&&i[a]==null&&delete s[a]};function setRef(e,t,n,r,s=!1){if(isArray$1(e)){e.forEach((m,x)=>setRef(m,t&&(isArray$1(t)?t[x]:t),n,r,s));return}if(isAsyncWrapper(r)&&!s)return;const o=r.shapeFlag&4?getExposeProxy(r.component)||r.component.proxy:r.el,i=s?null:o,{i:a,r:c}=e,d=t&&t.r,u=a.refs===EMPTY_OBJ?a.refs={}:a.refs,_=a.setupState;if(d!=null&&d!==c&&(isString(d)?(u[d]=null,hasOwn(_,d)&&(_[d]=null)):isRef(d)&&(d.value=null)),isFunction(c))callWithErrorHandling(c,a,12,[i,u]);else{const m=isString(c),x=isRef(c),C=e.f;if(m||x){const N=()=>{if(C){const M=m?hasOwn(_,c)?_[c]:u[c]:c.value;s?isArray$1(M)&&remove$1(M,o):isArray$1(M)?M.includes(o)||M.push(o):m?(u[c]=[o],hasOwn(_,c)&&(_[c]=u[c])):(c.value=[o],e.k&&(u[e.k]=c.value))}else m?(u[c]=i,hasOwn(_,c)&&(_[c]=i)):x&&(c.value=i,e.k&&(u[e.k]=i))};s||C?N():(N.id=-1,queuePostRenderEffect(N,n))}}}const queuePostRenderEffect=queueEffectWithSuspense;function createRenderer(e){return baseCreateRenderer(e)}function baseCreateRenderer(e,t){const n=getGlobalThis();n.__VUE__=!0;const{insert:r,remove:s,patchProp:o,createElement:i,createText:a,createComment:c,setText:d,setElementText:u,parentNode:_,nextSibling:m,setScopeId:x=NOOP,insertStaticContent:C}=e,N=(l,f,g,b=null,v=null,k=null,P=void 0,E=null,R=!!f.dynamicChildren)=>{if(l===f)return;l&&!isSameVNodeType(l,f)&&(b=y(l),e0(l,v,k,!0),l=null),f.patchFlag===-2&&(R=!1,f.dynamicChildren=null);const{type:w,ref:A,shapeFlag:I}=f;switch(w){case Text:M(l,f,g,b);break;case Comment:$(l,f,g,b);break;case Static:l==null&&F(f,g,b,P);break;case Fragment:f0(l,f,g,b,v,k,P,E,R);break;default:I&1?Y(l,f,g,b,v,k,P,E,R):I&6?o0(l,f,g,b,v,k,P,E,R):(I&64||I&128)&&w.process(l,f,g,b,v,k,P,E,R,O)}A!=null&&v&&setRef(A,l&&l.ref,k,f||l,!f)},M=(l,f,g,b)=>{if(l==null)r(f.el=a(f.children),g,b);else{const v=f.el=l.el;f.children!==l.children&&d(v,f.children)}},$=(l,f,g,b)=>{l==null?r(f.el=c(f.children||""),g,b):f.el=l.el},F=(l,f,g,b)=>{[l.el,l.anchor]=C(l.children,f,g,b,l.el,l.anchor)},V=({el:l,anchor:f},g,b)=>{let v;for(;l&&l!==f;)v=m(l),r(l,g,b),l=v;r(f,g,b)},H=({el:l,anchor:f})=>{let g;for(;l&&l!==f;)g=m(l),s(l),l=g;s(f)},Y=(l,f,g,b,v,k,P,E,R)=>{f.type==="svg"?P="svg":f.type==="math"&&(P="mathml"),l==null?U(f,g,b,v,k,P,E,R):d0(l,f,v,k,P,E,R)},U=(l,f,g,b,v,k,P,E)=>{let R,w;const{props:A,shapeFlag:I,transition:B,dirs:L}=l;if(R=l.el=i(l.type,k,A&&A.is,A),I&8?u(R,l.children):I&16&&n0(l.children,R,null,b,v,resolveChildrenNamespace(l,k),P,E),L&&invokeDirectiveHook(l,null,b,"created"),Z(R,l,l.scopeId,P,b),A){for(const W in A)W!=="value"&&!isReservedProp(W)&&o(R,W,null,A[W],k,l.children,b,v,Q);"value"in A&&o(R,"value",null,A.value,k),(w=A.onVnodeBeforeMount)&&invokeVNodeHook(w,b,l)}L&&invokeDirectiveHook(l,null,b,"beforeMount");const j=needTransition(v,B);j&&B.beforeEnter(R),r(R,f,g),((w=A&&A.onVnodeMounted)||j||L)&&queuePostRenderEffect(()=>{w&&invokeVNodeHook(w,b,l),j&&B.enter(R),L&&invokeDirectiveHook(l,null,b,"mounted")},v)},Z=(l,f,g,b,v)=>{if(g&&x(l,g),b)for(let k=0;k<b.length;k++)x(l,b[k]);if(v){let k=v.subTree;if(f===k){const P=v.vnode;Z(l,P,P.scopeId,P.slotScopeIds,v.parent)}}},n0=(l,f,g,b,v,k,P,E,R=0)=>{for(let w=R;w<l.length;w++){const A=l[w]=E?cloneIfMounted(l[w]):normalizeVNode(l[w]);N(null,A,f,g,b,v,k,P,E)}},d0=(l,f,g,b,v,k,P)=>{const E=f.el=l.el;let{patchFlag:R,dynamicChildren:w,dirs:A}=f;R|=l.patchFlag&16;const I=l.props||EMPTY_OBJ,B=f.props||EMPTY_OBJ;let L;if(g&&toggleRecurse(g,!1),(L=B.onVnodeBeforeUpdate)&&invokeVNodeHook(L,g,f,l),A&&invokeDirectiveHook(f,l,g,"beforeUpdate"),g&&toggleRecurse(g,!0),w?s0(l.dynamicChildren,w,E,g,b,resolveChildrenNamespace(f,v),k):P||q(l,f,E,null,g,b,resolveChildrenNamespace(f,v),k,!1),R>0){if(R&16)l0(E,f,I,B,g,b,v);else if(R&2&&I.class!==B.class&&o(E,"class",null,B.class,v),R&4&&o(E,"style",I.style,B.style,v),R&8){const j=f.dynamicProps;for(let W=0;W<j.length;W++){const z=j[W],X=I[z],r0=B[z];(r0!==X||z==="value")&&o(E,z,X,r0,v,l.children,g,b,Q)}}R&1&&l.children!==f.children&&u(E,f.children)}else!P&&w==null&&l0(E,f,I,B,g,b,v);((L=B.onVnodeUpdated)||A)&&queuePostRenderEffect(()=>{L&&invokeVNodeHook(L,g,f,l),A&&invokeDirectiveHook(f,l,g,"updated")},b)},s0=(l,f,g,b,v,k,P)=>{for(let E=0;E<f.length;E++){const R=l[E],w=f[E],A=R.el&&(R.type===Fragment||!isSameVNodeType(R,w)||R.shapeFlag&70)?_(R.el):g;N(R,w,A,null,b,v,k,P,!0)}},l0=(l,f,g,b,v,k,P)=>{if(g!==b){if(g!==EMPTY_OBJ)for(const E in g)!isReservedProp(E)&&!(E in b)&&o(l,E,g[E],null,P,f.children,v,k,Q);for(const E in b){if(isReservedProp(E))continue;const R=b[E],w=g[E];R!==w&&E!=="value"&&o(l,E,w,R,P,f.children,v,k,Q)}"value"in b&&o(l,"value",g.value,b.value,P)}},f0=(l,f,g,b,v,k,P,E,R)=>{const w=f.el=l?l.el:a(""),A=f.anchor=l?l.anchor:a("");let{patchFlag:I,dynamicChildren:B,slotScopeIds:L}=f;L&&(E=E?E.concat(L):L),l==null?(r(w,g,b),r(A,g,b),n0(f.children||[],g,A,v,k,P,E,R)):I>0&&I&64&&B&&l.dynamicChildren?(s0(l.dynamicChildren,B,g,v,k,P,E),(f.key!=null||v&&f===v.subTree)&&traverseStaticChildren(l,f,!0)):q(l,f,g,A,v,k,P,E,R)},o0=(l,f,g,b,v,k,P,E,R)=>{f.slotScopeIds=E,l==null?f.shapeFlag&512?v.ctx.activate(f,g,b,P,R):g0(f,g,b,v,k,P,R):p0(l,f,R)},g0=(l,f,g,b,v,k,P)=>{const E=l.component=createComponentInstance(l,b,v);if(isKeepAlive(l)&&(E.ctx.renderer=O),setupComponent(E),E.asyncDep){if(v&&v.registerDep(E,J),!l.el){const R=E.subTree=createVNode(Comment);$(null,R,f,g)}}else J(E,l,f,g,v,k,P)},p0=(l,f,g)=>{const b=f.component=l.component;if(shouldUpdateComponent(l,f,g))if(b.asyncDep&&!b.asyncResolved){K(b,f,g);return}else b.next=f,invalidateJob(b.update),b.effect.dirty=!0,b.update();else f.el=l.el,b.vnode=f},J=(l,f,g,b,v,k,P)=>{const E=()=>{if(l.isMounted){let{next:A,bu:I,u:B,parent:L,vnode:j}=l;{const m0=locateNonHydratedAsyncRoot(l);if(m0){A&&(A.el=j.el,K(l,A,P)),m0.asyncDep.then(()=>{l.isUnmounted||E()});return}}let W=A,z;toggleRecurse(l,!1),A?(A.el=j.el,K(l,A,P)):A=j,I&&invokeArrayFns(I),(z=A.props&&A.props.onVnodeBeforeUpdate)&&invokeVNodeHook(z,L,A,j),toggleRecurse(l,!0);const X=renderComponentRoot(l),r0=l.subTree;l.subTree=X,N(r0,X,_(r0.el),y(r0),l,v,k),A.el=X.el,W===null&&updateHOCHostEl(l,X.el),B&&queuePostRenderEffect(B,v),(z=A.props&&A.props.onVnodeUpdated)&&queuePostRenderEffect(()=>invokeVNodeHook(z,L,A,j),v)}else{let A;const{el:I,props:B}=f,{bm:L,m:j,parent:W}=l,z=isAsyncWrapper(f);if(toggleRecurse(l,!1),L&&invokeArrayFns(L),!z&&(A=B&&B.onVnodeBeforeMount)&&invokeVNodeHook(A,W,f),toggleRecurse(l,!0),I&&G){const X=()=>{l.subTree=renderComponentRoot(l),G(I,l.subTree,l,v,null)};z?f.type.__asyncLoader().then(()=>!l.isUnmounted&&X()):X()}else{const X=l.subTree=renderComponentRoot(l);N(null,X,g,b,l,v,k),f.el=X.el}if(j&&queuePostRenderEffect(j,v),!z&&(A=B&&B.onVnodeMounted)){const X=f;queuePostRenderEffect(()=>invokeVNodeHook(A,W,X),v)}(f.shapeFlag&256||W&&isAsyncWrapper(W.vnode)&&W.vnode.shapeFlag&256)&&l.a&&queuePostRenderEffect(l.a,v),l.isMounted=!0,f=g=b=null}},R=l.effect=new ReactiveEffect(E,NOOP,()=>queueJob(w),l.scope),w=l.update=()=>{R.dirty&&R.run()};w.id=l.uid,toggleRecurse(l,!0),w()},K=(l,f,g)=>{f.component=l;const b=l.vnode.props;l.vnode=f,l.next=null,updateProps(l,f.props,b,g),updateSlots(l,f.children,g),pauseTracking(),flushPreFlushCbs(l),resetTracking()},q=(l,f,g,b,v,k,P,E,R=!1)=>{const w=l&&l.children,A=l?l.shapeFlag:0,I=f.children,{patchFlag:B,shapeFlag:L}=f;if(B>0){if(B&128){u0(w,I,g,b,v,k,P,E,R);return}else if(B&256){c0(w,I,g,b,v,k,P,E,R);return}}L&8?(A&16&&Q(w,v,k),I!==w&&u(g,I)):A&16?L&16?u0(w,I,g,b,v,k,P,E,R):Q(w,v,k,!0):(A&8&&u(g,""),L&16&&n0(I,g,b,v,k,P,E,R))},c0=(l,f,g,b,v,k,P,E,R)=>{l=l||EMPTY_ARR,f=f||EMPTY_ARR;const w=l.length,A=f.length,I=Math.min(w,A);let B;for(B=0;B<I;B++){const L=f[B]=R?cloneIfMounted(f[B]):normalizeVNode(f[B]);N(l[B],L,g,null,v,k,P,E,R)}w>A?Q(l,v,k,!0,!1,I):n0(f,g,b,v,k,P,E,R,I)},u0=(l,f,g,b,v,k,P,E,R)=>{let w=0;const A=f.length;let I=l.length-1,B=A-1;for(;w<=I&&w<=B;){const L=l[w],j=f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]);if(isSameVNodeType(L,j))N(L,j,g,null,v,k,P,E,R);else break;w++}for(;w<=I&&w<=B;){const L=l[I],j=f[B]=R?cloneIfMounted(f[B]):normalizeVNode(f[B]);if(isSameVNodeType(L,j))N(L,j,g,null,v,k,P,E,R);else break;I--,B--}if(w>I){if(w<=B){const L=B+1,j=L<A?f[L].el:b;for(;w<=B;)N(null,f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]),g,j,v,k,P,E,R),w++}}else if(w>B)for(;w<=I;)e0(l[w],v,k,!0),w++;else{const L=w,j=w,W=new Map;for(w=j;w<=B;w++){const t0=f[w]=R?cloneIfMounted(f[w]):normalizeVNode(f[w]);t0.key!=null&&W.set(t0.key,w)}let z,X=0;const r0=B-j+1;let m0=!1,b0=0;const v0=new Array(r0);for(w=0;w<r0;w++)v0[w]=0;for(w=L;w<=I;w++){const t0=l[w];if(X>=r0){e0(t0,v,k,!0);continue}let a0;if(t0.key!=null)a0=W.get(t0.key);else for(z=j;z<=B;z++)if(v0[z-j]===0&&isSameVNodeType(t0,f[z])){a0=z;break}a0===void 0?e0(t0,v,k,!0):(v0[a0-j]=w+1,a0>=b0?b0=a0:m0=!0,N(t0,f[a0],g,null,v,k,P,E,R),X++)}const x0=m0?getSequence(v0):EMPTY_ARR;for(z=x0.length-1,w=r0-1;w>=0;w--){const t0=j+w,a0=f[t0],w0=t0+1<A?f[t0+1].el:b;v0[w]===0?N(null,a0,g,w0,v,k,P,E,R):m0&&(z<0||w!==x0[z]?i0(a0,g,w0,2):z--)}}},i0=(l,f,g,b,v=null)=>{const{el:k,type:P,transition:E,children:R,shapeFlag:w}=l;if(w&6){i0(l.component.subTree,f,g,b);return}if(w&128){l.suspense.move(f,g,b);return}if(w&64){P.move(l,f,g,O);return}if(P===Fragment){r(k,f,g);for(let I=0;I<R.length;I++)i0(R[I],f,g,b);r(l.anchor,f,g);return}if(P===Static){V(l,f,g);return}if(b!==2&&w&1&&E)if(b===0)E.beforeEnter(k),r(k,f,g),queuePostRenderEffect(()=>E.enter(k),v);else{const{leave:I,delayLeave:B,afterLeave:L}=E,j=()=>r(k,f,g),W=()=>{I(k,()=>{j(),L&&L()})};B?B(k,j,W):W()}else r(k,f,g)},e0=(l,f,g,b=!1,v=!1)=>{const{type:k,props:P,ref:E,children:R,dynamicChildren:w,shapeFlag:A,patchFlag:I,dirs:B}=l;if(E!=null&&setRef(E,null,g,l,!0),A&256){f.ctx.deactivate(l);return}const L=A&1&&B,j=!isAsyncWrapper(l);let W;if(j&&(W=P&&P.onVnodeBeforeUnmount)&&invokeVNodeHook(W,f,l),A&6)y0(l.component,g,b);else{if(A&128){l.suspense.unmount(g,b);return}L&&invokeDirectiveHook(l,null,f,"beforeUnmount"),A&64?l.type.remove(l,f,g,v,O,b):w&&(k!==Fragment||I>0&&I&64)?Q(w,f,g,!1,!0):(k===Fragment&&I&384||!v&&A&16)&&Q(R,f,g),b&&h0(l)}(j&&(W=P&&P.onVnodeUnmounted)||L)&&queuePostRenderEffect(()=>{W&&invokeVNodeHook(W,f,l),L&&invokeDirectiveHook(l,null,f,"unmounted")},g)},h0=l=>{const{type:f,el:g,anchor:b,transition:v}=l;if(f===Fragment){_0(g,b);return}if(f===Static){H(l);return}const k=()=>{s(g),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(l.shapeFlag&1&&v&&!v.persisted){const{leave:P,delayLeave:E}=v,R=()=>P(g,k);E?E(l.el,k,R):R()}else k()},_0=(l,f)=>{let g;for(;l!==f;)g=m(l),s(l),l=g;s(f)},y0=(l,f,g)=>{const{bum:b,scope:v,update:k,subTree:P,um:E}=l;b&&invokeArrayFns(b),v.stop(),k&&(k.active=!1,e0(P,l,f,g)),E&&queuePostRenderEffect(E,f),queuePostRenderEffect(()=>{l.isUnmounted=!0},f),f&&f.pendingBranch&&!f.isUnmounted&&l.asyncDep&&!l.asyncResolved&&l.suspenseId===f.pendingId&&(f.deps--,f.deps===0&&f.resolve())},Q=(l,f,g,b=!1,v=!1,k=0)=>{for(let P=k;P<l.length;P++)e0(l[P],f,g,b,v)},y=l=>l.shapeFlag&6?y(l.component.subTree):l.shapeFlag&128?l.suspense.next():m(l.anchor||l.el);let T=!1;const S=(l,f,g)=>{l==null?f._vnode&&e0(f._vnode,null,null,!0):N(f._vnode||null,l,f,null,null,null,g),T||(T=!0,flushPreFlushCbs(),flushPostFlushCbs(),T=!1),f._vnode=l},O={p:N,um:e0,m:i0,r:h0,mt:g0,mc:n0,pc:q,pbc:s0,n:y,o:e};let D,G;return t&&([D,G]=t(O)),{render:S,hydrate:D,createApp:createAppAPI(S,D)}}function resolveChildrenNamespace({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function toggleRecurse({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function needTransition(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function traverseStaticChildren(e,t,n=!1){const r=e.children,s=t.children;if(isArray$1(r)&&isArray$1(s))for(let o=0;o<r.length;o++){const i=r[o];let a=s[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[o]=cloneIfMounted(s[o]),a.el=i.el),n||traverseStaticChildren(i,a)),a.type===Text&&(a.el=i.el)}}function getSequence(e){const t=e.slice(),n=[0];let r,s,o,i,a;const c=e.length;for(r=0;r<c;r++){const d=e[r];if(d!==0){if(s=n[n.length-1],e[s]<d){t[r]=s,n.push(r);continue}for(o=0,i=n.length-1;o<i;)a=o+i>>1,e[n[a]]<d?o=a+1:i=a;d<e[n[o]]&&(o>0&&(t[r]=n[o-1]),n[o]=r)}}for(o=n.length,i=n[o-1];o-- >0;)n[o]=i,i=t[i];return n}function locateNonHydratedAsyncRoot(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:locateNonHydratedAsyncRoot(t)}const isTeleport=e=>e.__isTeleport,Fragment=Symbol.for("v-fgt"),Text=Symbol.for("v-txt"),Comment=Symbol.for("v-cmt"),Static=Symbol.for("v-stc"),blockStack=[];let currentBlock=null;function openBlock(e=!1){blockStack.push(currentBlock=e?null:[])}function closeBlock(){blockStack.pop(),currentBlock=blockStack[blockStack.length-1]||null}let isBlockTreeEnabled=1;function setBlockTracking(e){isBlockTreeEnabled+=e}function setupBlock(e){return e.dynamicChildren=isBlockTreeEnabled>0?currentBlock||EMPTY_ARR:null,closeBlock(),isBlockTreeEnabled>0&&currentBlock&&currentBlock.push(e),e}function createElementBlock(e,t,n,r,s,o){return setupBlock(createBaseVNode(e,t,n,r,s,o,!0))}function createBlock(e,t,n,r,s){return setupBlock(createVNode(e,t,n,r,s,!0))}function isVNode(e){return e?e.__v_isVNode===!0:!1}function isSameVNodeType(e,t){return e.type===t.type&&e.key===t.key}const InternalObjectKey="__vInternal",normalizeKey=({key:e})=>e??null,normalizeRef=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?isString(e)||isRef(e)||isFunction(e)?{i:currentRenderingInstance,r:e,k:t,f:!!n}:e:null);function createBaseVNode(e,t=null,n=null,r=0,s=null,o=e===Fragment?0:1,i=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&normalizeKey(t),ref:t&&normalizeRef(t),scopeId:currentScopeId,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:currentRenderingInstance};return a?(normalizeChildren(c,n),o&128&&e.normalize(c)):n&&(c.shapeFlag|=isString(n)?8:16),isBlockTreeEnabled>0&&!i&&currentBlock&&(c.patchFlag>0||o&6)&&c.patchFlag!==32&&currentBlock.push(c),c}const createVNode=_createVNode;function _createVNode(e,t=null,n=null,r=0,s=null,o=!1){if((!e||e===NULL_DYNAMIC_COMPONENT)&&(e=Comment),isVNode(e)){const a=cloneVNode(e,t,!0);return n&&normalizeChildren(a,n),isBlockTreeEnabled>0&&!o&&currentBlock&&(a.shapeFlag&6?currentBlock[currentBlock.indexOf(e)]=a:currentBlock.push(a)),a.patchFlag|=-2,a}if(isClassComponent(e)&&(e=e.__vccOpts),t){t=guardReactiveProps(t);let{class:a,style:c}=t;a&&!isString(a)&&(t.class=normalizeClass(a)),isObject(c)&&(isProxy(c)&&!isArray$1(c)&&(c=extend({},c)),t.style=normalizeStyle(c))}const i=isString(e)?1:isSuspense(e)?128:isTeleport(e)?64:isObject(e)?4:isFunction(e)?2:0;return createBaseVNode(e,t,n,r,s,i,o,!0)}function guardReactiveProps(e){return e?isProxy(e)||InternalObjectKey in e?extend({},e):e:null}function cloneVNode(e,t,n=!1){const{props:r,ref:s,patchFlag:o,children:i}=e,a=t?mergeProps(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&normalizeKey(a),ref:t&&t.ref?n&&s?isArray$1(s)?s.concat(normalizeRef(t)):[s,normalizeRef(t)]:normalizeRef(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fragment?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&cloneVNode(e.ssContent),ssFallback:e.ssFallback&&cloneVNode(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function createTextVNode(e=" ",t=0){return createVNode(Text,null,e,t)}function createStaticVNode(e,t){const n=createVNode(Static,null,e);return n.staticCount=t,n}function normalizeVNode(e){return e==null||typeof e=="boolean"?createVNode(Comment):isArray$1(e)?createVNode(Fragment,null,e.slice()):typeof e=="object"?cloneIfMounted(e):createVNode(Text,null,String(e))}function cloneIfMounted(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:cloneVNode(e)}function normalizeChildren(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(isArray$1(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),normalizeChildren(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!(InternalObjectKey in t)?t._ctx=currentRenderingInstance:s===3&&currentRenderingInstance&&(currentRenderingInstance.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else isFunction(t)?(t={default:t,_ctx:currentRenderingInstance},n=32):(t=String(t),r&64?(n=16,t=[createTextVNode(t)]):n=8);e.children=t,e.shapeFlag|=n}function mergeProps(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=normalizeClass([t.class,r.class]));else if(s==="style")t.style=normalizeStyle([t.style,r.style]);else if(isOn(s)){const o=t[s],i=r[s];i&&o!==i&&!(isArray$1(o)&&o.includes(i))&&(t[s]=o?[].concat(o,i):i)}else s!==""&&(t[s]=r[s])}return t}function invokeVNodeHook(e,t,n,r=null){callWithAsyncErrorHandling(e,t,7,[n,r])}const emptyAppContext=createAppContext();let uid=0;function createComponentInstance(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||emptyAppContext,o={uid:uid++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new EffectScope(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:normalizePropsOptions(r,s),emitsOptions:normalizeEmitsOptions(r,s),emit:null,emitted:null,propsDefaults:EMPTY_OBJ,inheritAttrs:r.inheritAttrs,ctx:EMPTY_OBJ,data:EMPTY_OBJ,props:EMPTY_OBJ,attrs:EMPTY_OBJ,slots:EMPTY_OBJ,refs:EMPTY_OBJ,setupState:EMPTY_OBJ,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=emit.bind(null,o),e.ce&&e.ce(o),o}let currentInstance=null,internalSetCurrentInstance,setInSSRSetupState;{const e=getGlobalThis(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),o=>{s.length>1?s.forEach(i=>i(o)):s[0](o)}};internalSetCurrentInstance=t("__VUE_INSTANCE_SETTERS__",n=>currentInstance=n),setInSSRSetupState=t("__VUE_SSR_SETTERS__",n=>isInSSRComponentSetup=n)}const setCurrentInstance=e=>{const t=currentInstance;return internalSetCurrentInstance(e),e.scope.on(),()=>{e.scope.off(),internalSetCurrentInstance(t)}},unsetCurrentInstance=()=>{currentInstance&&currentInstance.scope.off(),internalSetCurrentInstance(null)};function isStatefulComponent(e){return e.vnode.shapeFlag&4}let isInSSRComponentSetup=!1;function setupComponent(e,t=!1){t&&setInSSRSetupState(t);const{props:n,children:r}=e.vnode,s=isStatefulComponent(e);initProps(e,n,s,t),initSlots(e,r);const o=s?setupStatefulComponent(e,t):void 0;return t&&setInSSRSetupState(!1),o}function setupStatefulComponent(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=markRaw(new Proxy(e.ctx,PublicInstanceProxyHandlers));const{setup:r}=n;if(r){const s=e.setupContext=r.length>1?createSetupContext(e):null,o=setCurrentInstance(e);pauseTracking();const i=callWithErrorHandling(r,e,0,[e.props,s]);if(resetTracking(),o(),isPromise(i)){if(i.then(unsetCurrentInstance,unsetCurrentInstance),t)return i.then(a=>{handleSetupResult(e,a,t)}).catch(a=>{handleError(a,e,0)});e.asyncDep=i}else handleSetupResult(e,i,t)}else finishComponentSetup(e,t)}function handleSetupResult(e,t,n){isFunction(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:isObject(t)&&(e.setupState=proxyRefs(t)),finishComponentSetup(e,n)}let compile;function finishComponentSetup(e,t,n){const r=e.type;if(!e.render){if(!t&&compile&&!r.render){const s=r.template||resolveMergedOptions(e).template;if(s){const{isCustomElement:o,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:c}=r,d=extend(extend({isCustomElement:o,delimiters:a},i),c);r.render=compile(s,d)}}e.render=r.render||NOOP}{const s=setCurrentInstance(e);pauseTracking();try{applyOptions(e)}finally{resetTracking(),s()}}}function getAttrsProxy(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return track(e,"get","$attrs"),t[n]}}))}function createSetupContext(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return getAttrsProxy(e)},slots:e.slots,emit:e.emit,expose:t}}function getExposeProxy(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(proxyRefs(markRaw(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in publicPropertiesMap)return publicPropertiesMap[n](e)},has(t,n){return n in t||n in publicPropertiesMap}}))}const classifyRE=/(?:^|[-_])(\w)/g,classify=e=>e.replace(classifyRE,t=>t.toUpperCase()).replace(/[-_]/g,"");function getComponentName(e,t=!0){return isFunction(e)?e.displayName||e.name:e.name||t&&e.__name}function formatComponentName(e,t,n=!1){let r=getComponentName(t);if(!r&&t.__file){const s=t.__file.match(/([^/\\]+)\.\w+$/);s&&(r=s[1])}if(!r&&e&&e.parent){const s=o=>{for(const i in o)if(o[i]===t)return i};r=s(e.components||e.parent.type.components)||s(e.appContext.components)}return r?classify(r):n?"App":"Anonymous"}function isClassComponent(e){return isFunction(e)&&"__vccOpts"in e}const computed=(e,t)=>computed$1(e,t,isInSSRComponentSetup);function h(e,t,n){const r=arguments.length;return r===2?isObject(t)&&!isArray$1(t)?isVNode(t)?createVNode(e,null,[t]):createVNode(e,t):createVNode(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&isVNode(n)&&(n=[n]),createVNode(e,t,n))}const version="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const svgNS="http://www.w3.org/2000/svg",mathmlNS="http://www.w3.org/1998/Math/MathML",doc=typeof document<"u"?document:null,templateContainer=doc&&doc.createElement("template"),nodeOps={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?doc.createElementNS(svgNS,e):t==="mathml"?doc.createElementNS(mathmlNS,e):doc.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>doc.createTextNode(e),createComment:e=>doc.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>doc.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,o){const i=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{templateContainer.innerHTML=r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e;const a=templateContainer.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},vtcKey=Symbol("_vtc");function patchClass(e,t,n){const r=e[vtcKey];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const vShowOldKey=Symbol("_vod"),CSS_VAR_TEXT=Symbol("");function patchStyle(e,t,n){const r=e.style,s=r.display,o=isString(n);if(n&&!o){if(t&&!isString(t))for(const i in t)n[i]==null&&setStyle(r,i,"");for(const i in n)setStyle(r,i,n[i])}else if(o){if(t!==n){const i=r[CSS_VAR_TEXT];i&&(n+=";"+i),r.cssText=n}}else t&&e.removeAttribute("style");vShowOldKey in e&&(r.display=s)}const importantRE=/\s*!important$/;function setStyle(e,t,n){if(isArray$1(n))n.forEach(r=>setStyle(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=autoPrefix(e,t);importantRE.test(n)?e.setProperty(hyphenate(r),n.replace(importantRE,""),"important"):e[r]=n}}const prefixes=["Webkit","Moz","ms"],prefixCache={};function autoPrefix(e,t){const n=prefixCache[t];if(n)return n;let r=camelize(t);if(r!=="filter"&&r in e)return prefixCache[t]=r;r=capitalize(r);for(let s=0;s<prefixes.length;s++){const o=prefixes[s]+r;if(o in e)return prefixCache[t]=o}return t}const xlinkNS="http://www.w3.org/1999/xlink";function patchAttr(e,t,n,r,s){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(xlinkNS,t.slice(6,t.length)):e.setAttributeNS(xlinkNS,t,n);else{const o=isSpecialBooleanAttr(t);n==null||o&&!includeBooleanAttr(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n)}}function patchDOMProp(e,t,n,r,s,o,i){if(t==="innerHTML"||t==="textContent"){r&&i(r,s,o),e[t]=n??"";return}const a=e.tagName;if(t==="value"&&a!=="PROGRESS"&&!a.includes("-")){e._value=n;const d=a==="OPTION"?e.getAttribute("value"):e.value,u=n??"";d!==u&&(e.value=u),n==null&&e.removeAttribute(t);return}let c=!1;if(n===""||n==null){const d=typeof e[t];d==="boolean"?n=includeBooleanAttr(n):n==null&&d==="string"?(n="",c=!0):d==="number"&&(n=0,c=!0)}try{e[t]=n}catch{}c&&e.removeAttribute(t)}function addEventListener(e,t,n,r){e.addEventListener(t,n,r)}function removeEventListener(e,t,n,r){e.removeEventListener(t,n,r)}const veiKey=Symbol("_vei");function patchEvent(e,t,n,r,s=null){const o=e[veiKey]||(e[veiKey]={}),i=o[t];if(r&&i)i.value=r;else{const[a,c]=parseName(t);if(r){const d=o[t]=createInvoker(r,s);addEventListener(e,a,d,c)}else i&&(removeEventListener(e,a,i,c),o[t]=void 0)}}const optionsModifierRE=/(?:Once|Passive|Capture)$/;function parseName(e){let t;if(optionsModifierRE.test(e)){t={};let r;for(;r=e.match(optionsModifierRE);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):hyphenate(e.slice(2)),t]}let cachedNow=0;const p=Promise.resolve(),getNow=()=>cachedNow||(p.then(()=>cachedNow=0),cachedNow=Date.now());function createInvoker(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;callWithAsyncErrorHandling(patchStopImmediatePropagation(r,n.value),t,5,[r])};return n.value=e,n.attached=getNow(),n}function patchStopImmediatePropagation(e,t){if(isArray$1(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const isNativeOn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,patchProp=(e,t,n,r,s,o,i,a,c)=>{const d=s==="svg";t==="class"?patchClass(e,r,d):t==="style"?patchStyle(e,n,r):isOn(t)?isModelListener(t)||patchEvent(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):shouldSetAsProp(e,t,r,d))?patchDOMProp(e,t,r,o,i,a,c):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),patchAttr(e,t,r,d))};function shouldSetAsProp(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&isNativeOn(t)&&isFunction(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return isNativeOn(t)&&isString(n)?!1:t in e}const getModelAssigner=e=>{const t=e.props["onUpdate:modelValue"]||!1;return isArray$1(t)?n=>invokeArrayFns(t,n):t};function onCompositionStart(e){e.target.composing=!0}function onCompositionEnd(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const assignKey=Symbol("_assign"),vModelText={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[assignKey]=getModelAssigner(s);const o=r||s.props&&s.props.type==="number";addEventListener(e,t?"change":"input",i=>{if(i.target.composing)return;let a=e.value;n&&(a=a.trim()),o&&(a=looseToNumber(a)),e[assignKey](a)}),n&&addEventListener(e,"change",()=>{e.value=e.value.trim()}),t||(addEventListener(e,"compositionstart",onCompositionStart),addEventListener(e,"compositionend",onCompositionEnd),addEventListener(e,"change",onCompositionEnd))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:r,number:s}},o){if(e[assignKey]=getModelAssigner(o),e.composing)return;const i=s||e.type==="number"?looseToNumber(e.value):e.value,a=t??"";i!==a&&(document.activeElement===e&&e.type!=="range"&&(n||r&&e.value.trim()===a)||(e.value=a))}},systemModifiers=["ctrl","shift","alt","meta"],modifierGuards={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>systemModifiers.some(n=>e[`${n}Key`]&&!t.includes(n))},withModifiers=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(s,...o)=>{for(let i=0;i<t.length;i++){const a=modifierGuards[t[i]];if(a&&a(s,t))return}return e(s,...o)})},rendererOptions=extend({patchProp},nodeOps);let renderer;function ensureRenderer(){return renderer||(renderer=createRenderer(rendererOptions))}const createApp=(...e)=>{const t=ensureRenderer().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=normalizeContainer(r);if(!s)return;const o=t._component;!isFunction(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.innerHTML="";const i=n(s,!1,resolveRootNamespace(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t};function resolveRootNamespace(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function normalizeContainer(e){return isString(e)?document.querySelector(e):e}const parents=new Set,coords=new WeakMap,siblings=new WeakMap,animations=new WeakMap,intersections=new WeakMap,intervals=new WeakMap,options=new WeakMap,debounces=new WeakMap,enabled=new WeakSet;let root,scrollX=0,scrollY=0;const TGT="__aa_tgt",DEL="__aa_del",NEW="__aa_new",handleMutations=e=>{const t=getElements(e);t&&t.forEach(n=>animate(n))},handleResizes=e=>{e.forEach(t=>{t.target===root&&updateAllPos(),coords.has(t.target)&&updatePos(t.target)})};function observePosition(e){const t=intersections.get(e);t==null||t.disconnect();let n=coords.get(e),r=0;const s=5;n||(n=getCoords(e),coords.set(e,n));const{offsetWidth:o,offsetHeight:i}=root,c=[n.top-s,o-(n.left+s+n.width),i-(n.top+s+n.height),n.left-s].map(u=>`${-1*Math.floor(u)}px`).join(" "),d=new IntersectionObserver(()=>{++r>1&&updatePos(e)},{root,threshold:1,rootMargin:c});d.observe(e),intersections.set(e,d)}function updatePos(e){clearTimeout(debounces.get(e));const t=getOptions(e),n=isPlugin(t)?500:t.duration;debounces.set(e,setTimeout(async()=>{const r=animations.get(e);try{await(r==null?void 0:r.finished),coords.set(e,getCoords(e)),observePosition(e)}catch{}},n))}function updateAllPos(){clearTimeout(debounces.get(root)),debounces.set(root,setTimeout(()=>{parents.forEach(e=>forEach(e,t=>lowPriority(()=>updatePos(t))))},100))}function poll(e){setTimeout(()=>{intervals.set(e,setInterval(()=>lowPriority(updatePos.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function lowPriority(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}let mutations,resize;typeof window<"u"&&(root=document.documentElement,mutations=new MutationObserver(handleMutations),resize=new ResizeObserver(handleResizes),window.addEventListener("scroll",()=>{scrollY=window.scrollY,scrollX=window.scrollX}),resize.observe(root));function getElements(e){return e.reduce((r,s)=>[...r,...Array.from(s.addedNodes),...Array.from(s.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,s)=>{if(r===!1)return!1;if(s.target instanceof Element){if(target(s.target),!r.has(s.target)){r.add(s.target);for(let o=0;o<s.target.children.length;o++){const i=s.target.children.item(o);if(i){if(DEL in i)return!1;target(s.target,i),r.add(i)}}}if(s.removedNodes.length)for(let o=0;o<s.removedNodes.length;o++){const i=s.removedNodes[o];if(DEL in i)return!1;i instanceof Element&&(r.add(i),target(s.target,i),siblings.set(i,[s.previousSibling,s.nextSibling]))}}return r},new Set)}function target(e,t){!t&&!(TGT in e)?Object.defineProperty(e,TGT,{value:e}):t&&!(TGT in t)&&Object.defineProperty(t,TGT,{value:e})}function animate(e){var t;const n=e.isConnected,r=coords.has(e);n&&siblings.has(e)&&siblings.delete(e),animations.has(e)&&((t=animations.get(e))===null||t===void 0||t.cancel()),NEW in e?add(e):r&&n?remain(e):r&&!n?remove(e):add(e)}function raw(e){return Number(e.replace(/[^0-9.\-]/g,""))}function getScrollOffset(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function getCoords(e){const t=e.getBoundingClientRect(),{x:n,y:r}=getScrollOffset(e);return{top:t.top+r,left:t.left+n,width:t.width,height:t.height}}function getTransitionSizes(e,t,n){let r=t.width,s=t.height,o=n.width,i=n.height;const a=getComputedStyle(e);if(a.getPropertyValue("box-sizing")==="content-box"){const d=raw(a.paddingTop)+raw(a.paddingBottom)+raw(a.borderTopWidth)+raw(a.borderBottomWidth),u=raw(a.paddingLeft)+raw(a.paddingRight)+raw(a.borderRightWidth)+raw(a.borderLeftWidth);r-=u,o-=u,s-=d,i-=d}return[r,o,s,i].map(Math.round)}function getOptions(e){return TGT in e&&options.has(e[TGT])?options.get(e[TGT]):{duration:250,easing:"ease-in-out"}}function getTarget(e){if(TGT in e)return e[TGT]}function isEnabled(e){const t=getTarget(e);return t?enabled.has(t):!1}function forEach(e,...t){t.forEach(n=>n(e,options.has(e)));for(let n=0;n<e.children.length;n++){const r=e.children.item(n);r&&t.forEach(s=>s(r,options.has(r)))}}function getPluginTuple(e){return Array.isArray(e)?e:[e]}function isPlugin(e){return typeof e=="function"}function remain(e){const t=coords.get(e),n=getCoords(e);if(!isEnabled(e))return coords.set(e,n);let r;if(!t)return;const s=getOptions(e);if(typeof s!="function"){const o=t.left-n.left,i=t.top-n.top,[a,c,d,u]=getTransitionSizes(e,t,n),_={transform:`translate(${o}px, ${i}px)`},m={transform:"translate(0, 0)"};a!==c&&(_.width=`${a}px`,m.width=`${c}px`),d!==u&&(_.height=`${d}px`,m.height=`${u}px`),r=e.animate([_,m],{duration:s.duration,easing:s.easing})}else{const[o]=getPluginTuple(s(e,"remain",t,n));r=new Animation(o),r.play()}animations.set(e,r),coords.set(e,n),r.addEventListener("finish",updatePos.bind(null,e))}function add(e){NEW in e&&delete e[NEW];const t=getCoords(e);coords.set(e,t);const n=getOptions(e);if(!isEnabled(e))return;let r;if(typeof n!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:n.duration*1.5,easing:"ease-in"});else{const[s]=getPluginTuple(n(e,"add",t));r=new Animation(s),r.play()}animations.set(e,r),r.addEventListener("finish",updatePos.bind(null,e))}function cleanUp(e,t){var n;e.remove(),coords.delete(e),siblings.delete(e),animations.delete(e),(n=intersections.get(e))===null||n===void 0||n.disconnect(),setTimeout(()=>{if(DEL in e&&delete e[DEL],Object.defineProperty(e,NEW,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(const r in t)e.style[r]=""},0)}function remove(e){var t;if(!siblings.has(e)||!coords.has(e))return;const[n,r]=siblings.get(e);Object.defineProperty(e,DEL,{value:!0,configurable:!0});const s=window.scrollX,o=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):n&&n.parentNode?n.parentNode.appendChild(e):(t=getTarget(e))===null||t===void 0||t.appendChild(e),!isEnabled(e))return cleanUp(e);const[i,a,c,d]=deletePosition(e),u=getOptions(e),_=coords.get(e);(s!==scrollX||o!==scrollY)&&adjustScroll(e,s,o,u);let m,x={position:"absolute",top:`${i}px`,left:`${a}px`,width:`${c}px`,height:`${d}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!isPlugin(u))Object.assign(e.style,x),m=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"});else{const[C,N]=getPluginTuple(u(e,"remove",_));(N==null?void 0:N.styleReset)!==!1&&(x=(N==null?void 0:N.styleReset)||x,Object.assign(e.style,x)),m=new Animation(C),m.play()}animations.set(e,m),m.addEventListener("finish",cleanUp.bind(null,e,x))}function adjustScroll(e,t,n,r){const s=scrollX-t,o=scrollY-n,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(root).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+s,window.scrollY+o),!e.parentElement)return;const c=e.parentElement;let d=c.clientHeight,u=c.clientWidth;const _=performance.now();function m(){requestAnimationFrame(()=>{if(!isPlugin(r)){const x=d-c.clientHeight,C=u-c.clientWidth;_+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-C,top:window.scrollY-x}),d=c.clientHeight,u=c.clientWidth,m()):document.documentElement.style.scrollBehavior=i}})}m()}function deletePosition(e){const t=coords.get(e),[n,,r]=getTransitionSizes(e,t,getCoords(e));let s=e.parentElement;for(;s&&(getComputedStyle(s).position==="static"||s instanceof HTMLBodyElement);)s=s.parentElement;s||(s=document.body);const o=getComputedStyle(s),i=coords.get(s)||getCoords(s),a=Math.round(t.top-i.top)-raw(o.borderTopWidth),c=Math.round(t.left-i.left)-raw(o.borderLeftWidth);return[a,c,n,r]}function autoAnimate(e,t={}){return mutations&&resize&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!isPlugin(t)&&!t.disrespectUserMotionPreference||(enabled.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),forEach(e,updatePos,poll,s=>resize==null?void 0:resize.observe(s)),isPlugin(t)?options.set(e,t):options.set(e,{duration:250,easing:"ease-in-out",...t}),mutations.observe(e,{childList:!0}),parents.add(e))),Object.freeze({parent:e,enable:()=>{enabled.add(e)},disable:()=>{enabled.delete(e)},isEnabled:()=>enabled.has(e)})}const vAutoAnimate$1={mounted:(e,t)=>{autoAnimate(e,t.value||{})},getSSRProps:()=>({})},vAutoAnimate=vAutoAnimate$1,autoAnimatePlugin={install(e){e.directive("auto-animate",vAutoAnimate)}},initAutoAnimate=e=>e.use(autoAnimatePlugin);/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const isBrowser=typeof window<"u";function isESModule(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const assign=Object.assign;function applyToParams(e,t){const n={};for(const r in t){const s=t[r];n[r]=isArray(s)?s.map(e):e(s)}return n}const noop=()=>{},isArray=Array.isArray,TRAILING_SLASH_RE=/\/$/,removeTrailingSlash=e=>e.replace(TRAILING_SLASH_RE,"");function parseURL(e,t,n="/"){let r,s={},o="",i="";const a=t.indexOf("#");let c=t.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=t.slice(0,c),o=t.slice(c+1,a>-1?a:t.length),s=e(o)),a>-1&&(r=r||t.slice(0,a),i=t.slice(a,t.length)),r=resolveRelativePath(r??t,n),{fullPath:r+(o&&"?")+o+i,path:r,query:s,hash:i}}function stringifyURL(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function stripBase(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function isSameRouteLocation(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&isSameRouteRecord(t.matched[r],n.matched[s])&&isSameRouteLocationParams(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function isSameRouteRecord(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function isSameRouteLocationParams(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!isSameRouteLocationParamsValue(e[n],t[n]))return!1;return!0}function isSameRouteLocationParamsValue(e,t){return isArray(e)?isEquivalentArray(e,t):isArray(t)?isEquivalentArray(t,e):e===t}function isEquivalentArray(e,t){return isArray(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function resolveRelativePath(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let o=n.length-1,i,a;for(i=0;i<r.length;i++)if(a=r[i],a!==".")if(a==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+r.slice(i-(i===r.length?1:0)).join("/")}var NavigationType;(function(e){e.pop="pop",e.push="push"})(NavigationType||(NavigationType={}));var NavigationDirection;(function(e){e.back="back",e.forward="forward",e.unknown=""})(NavigationDirection||(NavigationDirection={}));function normalizeBase(e){if(!e)if(isBrowser){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),removeTrailingSlash(e)}const BEFORE_HASH_RE=/^[^#]+#/;function createHref(e,t){return e.replace(BEFORE_HASH_RE,"#")+t}function getElementPosition(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=getElementPosition(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function getScrollKey(e,t){return(history.state?history.state.position-t:-1)+e}const scrollPositions=new Map;function saveScrollPosition(e,t){scrollPositions.set(e,t)}function getSavedScrollPosition(e){const t=scrollPositions.get(e);return scrollPositions.delete(e),t}let createBaseLocation=()=>location.protocol+"//"+location.host;function createCurrentLocation(e,t){const{pathname:n,search:r,hash:s}=t,o=e.indexOf("#");if(o>-1){let a=s.includes(e.slice(o))?e.slice(o).length:1,c=s.slice(a);return c[0]!=="/"&&(c="/"+c),stripBase(c,"")}return stripBase(n,e)+r+s}function useHistoryListeners(e,t,n,r){let s=[],o=[],i=null;const a=({state:m})=>{const x=createCurrentLocation(e,location),C=n.value,N=t.value;let M=0;if(m){if(n.value=x,t.value=m,i&&i===C){i=null;return}M=N?m.position-N.position:0}else r(x);s.forEach($=>{$(n.value,C,{delta:M,type:NavigationType.pop,direction:M?M>0?NavigationDirection.forward:NavigationDirection.back:NavigationDirection.unknown})})};function c(){i=n.value}function d(m){s.push(m);const x=()=>{const C=s.indexOf(m);C>-1&&s.splice(C,1)};return o.push(x),x}function u(){const{history:m}=window;m.state&&m.replaceState(assign({},m.state,{scroll:computeScrollPosition()}),"")}function _(){for(const m of o)m();o=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:c,listen:d,destroy:_}}function buildState(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?computeScrollPosition():null}}function useHistoryStateNavigation(e){const{history:t,location:n}=window,r={value:createCurrentLocation(e,n)},s={value:t.state};s.value||o(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function o(c,d,u){const _=e.indexOf("#"),m=_>-1?(n.host&&document.querySelector("base")?e:e.slice(_))+c:createBaseLocation()+e+c;try{t[u?"replaceState":"pushState"](d,"",m),s.value=d}catch(x){console.error(x),n[u?"replace":"assign"](m)}}function i(c,d){const u=assign({},t.state,buildState(s.value.back,c,s.value.forward,!0),d,{position:s.value.position});o(c,u,!0),r.value=c}function a(c,d){const u=assign({},s.value,t.state,{forward:c,scroll:computeScrollPosition()});o(u.current,u,!0);const _=assign({},buildState(r.value,c,null),{position:u.position+1},d);o(c,_,!1),r.value=c}return{location:r,state:s,push:a,replace:i}}function createWebHistory(e){e=normalizeBase(e);const t=useHistoryStateNavigation(e),n=useHistoryListeners(e,t.state,t.location,t.replace);function r(o,i=!0){i||n.pauseListeners(),history.go(o)}const s=assign({location:"",base:e,go:r,createHref:createHref.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function isRouteLocation(e){return typeof e=="string"||e&&typeof e=="object"}function isRouteName(e){return typeof e=="string"||typeof e=="symbol"}const START_LOCATION_NORMALIZED={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},NavigationFailureSymbol=Symbol("");var NavigationFailureType;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(NavigationFailureType||(NavigationFailureType={}));function createRouterError(e,t){return assign(new Error,{type:e,[NavigationFailureSymbol]:!0},t)}function isNavigationFailure(e,t){return e instanceof Error&&NavigationFailureSymbol in e&&(t==null||!!(e.type&t))}const BASE_PARAM_PATTERN="[^/]+?",BASE_PATH_PARSER_OPTIONS={sensitive:!1,strict:!1,start:!0,end:!0},REGEX_CHARS_RE=/[.+*?^${}()[\]/\\]/g;function tokensToParser(e,t){const n=assign({},BASE_PATH_PARSER_OPTIONS,t),r=[];let s=n.start?"^":"";const o=[];for(const d of e){const u=d.length?[]:[90];n.strict&&!d.length&&(s+="/");for(let _=0;_<d.length;_++){const m=d[_];let x=40+(n.sensitive?.25:0);if(m.type===0)_||(s+="/"),s+=m.value.replace(REGEX_CHARS_RE,"\\$&"),x+=40;else if(m.type===1){const{value:C,repeatable:N,optional:M,regexp:$}=m;o.push({name:C,repeatable:N,optional:M});const F=$||BASE_PARAM_PATTERN;if(F!==BASE_PARAM_PATTERN){x+=10;try{new RegExp(`(${F})`)}catch(H){throw new Error(`Invalid custom RegExp for param "${C}" (${F}): `+H.message)}}let V=N?`((?:${F})(?:/(?:${F}))*)`:`(${F})`;_||(V=M&&d.length<2?`(?:/${V})`:"/"+V),M&&(V+="?"),s+=V,x+=20,M&&(x+=-8),N&&(x+=-20),F===".*"&&(x+=-50)}u.push(x)}r.push(u)}if(n.strict&&n.end){const d=r.length-1;r[d][r[d].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const i=new RegExp(s,n.sensitive?"":"i");function a(d){const u=d.match(i),_={};if(!u)return null;for(let m=1;m<u.length;m++){const x=u[m]||"",C=o[m-1];_[C.name]=x&&C.repeatable?x.split("/"):x}return _}function c(d){let u="",_=!1;for(const m of e){(!_||!u.endsWith("/"))&&(u+="/"),_=!1;for(const x of m)if(x.type===0)u+=x.value;else if(x.type===1){const{value:C,repeatable:N,optional:M}=x,$=C in d?d[C]:"";if(isArray($)&&!N)throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);const F=isArray($)?$.join("/"):$;if(!F)if(M)m.length<2&&(u.endsWith("/")?u=u.slice(0,-1):_=!0);else throw new Error(`Missing required param "${C}"`);u+=F}}return u||"/"}return{re:i,score:r,keys:o,parse:a,stringify:c}}function compareScoreArray(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function comparePathParserScore(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const o=compareScoreArray(r[n],s[n]);if(o)return o;n++}if(Math.abs(s.length-r.length)===1){if(isLastScoreNegative(r))return 1;if(isLastScoreNegative(s))return-1}return s.length-r.length}function isLastScoreNegative(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ROOT_TOKEN={type:0,value:""},VALID_PARAM_RE=/[a-zA-Z0-9_]/;function tokenizePath(e){if(!e)return[[]];if(e==="/")return[[ROOT_TOKEN]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(x){throw new Error(`ERR (${n})/"${d}": ${x}`)}let n=0,r=n;const s=[];let o;function i(){o&&s.push(o),o=[]}let a=0,c,d="",u="";function _(){d&&(n===0?o.push({type:0,value:d}):n===1||n===2||n===3?(o.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:d,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),d="")}function m(){d+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(d&&_(),i()):c===":"?(_(),n=1):m();break;case 4:m(),n=r;break;case 1:c==="("?n=2:VALID_PARAM_RE.test(c)?m():(_(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:_(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${d}"`),_(),i(),s}function createRouteRecordMatcher(e,t,n){const r=tokensToParser(tokenizePath(e.path),n),s=assign(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function createRouterMatcher(e,t){const n=[],r=new Map;t=mergeOptions({strict:!1,end:!0,sensitive:!1},t);function s(u){return r.get(u)}function o(u,_,m){const x=!m,C=normalizeRouteRecord(u);C.aliasOf=m&&m.record;const N=mergeOptions(t,u),M=[C];if("alias"in u){const V=typeof u.alias=="string"?[u.alias]:u.alias;for(const H of V)M.push(assign({},C,{components:m?m.record.components:C.components,path:H,aliasOf:m?m.record:C}))}let $,F;for(const V of M){const{path:H}=V;if(_&&H[0]!=="/"){const Y=_.record.path,U=Y[Y.length-1]==="/"?"":"/";V.path=_.record.path+(H&&U+H)}if($=createRouteRecordMatcher(V,_,N),m?m.alias.push($):(F=F||$,F!==$&&F.alias.push($),x&&u.name&&!isAliasRecord($)&&i(u.name)),C.children){const Y=C.children;for(let U=0;U<Y.length;U++)o(Y[U],$,m&&m.children[U])}m=m||$,($.record.components&&Object.keys($.record.components).length||$.record.name||$.record.redirect)&&c($)}return F?()=>{i(F)}:noop}function i(u){if(isRouteName(u)){const _=r.get(u);_&&(r.delete(u),n.splice(n.indexOf(_),1),_.children.forEach(i),_.alias.forEach(i))}else{const _=n.indexOf(u);_>-1&&(n.splice(_,1),u.record.name&&r.delete(u.record.name),u.children.forEach(i),u.alias.forEach(i))}}function a(){return n}function c(u){let _=0;for(;_<n.length&&comparePathParserScore(u,n[_])>=0&&(u.record.path!==n[_].record.path||!isRecordChildOf(u,n[_]));)_++;n.splice(_,0,u),u.record.name&&!isAliasRecord(u)&&r.set(u.record.name,u)}function d(u,_){let m,x={},C,N;if("name"in u&&u.name){if(m=r.get(u.name),!m)throw createRouterError(1,{location:u});N=m.record.name,x=assign(paramsFromLocation(_.params,m.keys.filter(F=>!F.optional).map(F=>F.name)),u.params&&paramsFromLocation(u.params,m.keys.map(F=>F.name))),C=m.stringify(x)}else if("path"in u)C=u.path,m=n.find(F=>F.re.test(C)),m&&(x=m.parse(C),N=m.record.name);else{if(m=_.name?r.get(_.name):n.find(F=>F.re.test(_.path)),!m)throw createRouterError(1,{location:u,currentLocation:_});N=m.record.name,x=assign({},_.params,u.params),C=m.stringify(x)}const M=[];let $=m;for(;$;)M.unshift($.record),$=$.parent;return{name:N,path:C,params:x,matched:M,meta:mergeMetaFields(M)}}return e.forEach(u=>o(u)),{addRoute:o,resolve:d,removeRoute:i,getRoutes:a,getRecordMatcher:s}}function paramsFromLocation(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function normalizeRouteRecord(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:normalizeRecordProps(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function normalizeRecordProps(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function isAliasRecord(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function mergeMetaFields(e){return e.reduce((t,n)=>assign(t,n.meta),{})}function mergeOptions(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function isRecordChildOf(e,t){return t.children.some(n=>n===e||isRecordChildOf(e,n))}const HASH_RE=/#/g,AMPERSAND_RE=/&/g,SLASH_RE=/\//g,EQUAL_RE=/=/g,IM_RE=/\?/g,PLUS_RE=/\+/g,ENC_BRACKET_OPEN_RE=/%5B/g,ENC_BRACKET_CLOSE_RE=/%5D/g,ENC_CARET_RE=/%5E/g,ENC_BACKTICK_RE=/%60/g,ENC_CURLY_OPEN_RE=/%7B/g,ENC_PIPE_RE=/%7C/g,ENC_CURLY_CLOSE_RE=/%7D/g,ENC_SPACE_RE=/%20/g;function commonEncode(e){return encodeURI(""+e).replace(ENC_PIPE_RE,"|").replace(ENC_BRACKET_OPEN_RE,"[").replace(ENC_BRACKET_CLOSE_RE,"]")}function encodeHash(e){return commonEncode(e).replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryValue(e){return commonEncode(e).replace(PLUS_RE,"%2B").replace(ENC_SPACE_RE,"+").replace(HASH_RE,"%23").replace(AMPERSAND_RE,"%26").replace(ENC_BACKTICK_RE,"`").replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryKey(e){return encodeQueryValue(e).replace(EQUAL_RE,"%3D")}function encodePath(e){return commonEncode(e).replace(HASH_RE,"%23").replace(IM_RE,"%3F")}function encodeParam(e){return e==null?"":encodePath(e).replace(SLASH_RE,"%2F")}function decode(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function parseQuery(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<r.length;++s){const o=r[s].replace(PLUS_RE," "),i=o.indexOf("="),a=decode(i<0?o:o.slice(0,i)),c=i<0?null:decode(o.slice(i+1));if(a in t){let d=t[a];isArray(d)||(d=t[a]=[d]),d.push(c)}else t[a]=c}return t}function stringifyQuery(e){let t="";for(let n in e){const r=e[n];if(n=encodeQueryKey(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(isArray(r)?r.map(o=>o&&encodeQueryValue(o)):[r&&encodeQueryValue(r)]).forEach(o=>{o!==void 0&&(t+=(t.length?"&":"")+n,o!=null&&(t+="="+o))})}return t}function normalizeQuery(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=isArray(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const matchedRouteKey=Symbol(""),viewDepthKey=Symbol(""),routerKey=Symbol(""),routeLocationKey=Symbol(""),routerViewLocationKey=Symbol("");function useCallbacks(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function guardToPromiseFn(e,t,n,r,s){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((i,a)=>{const c=_=>{_===!1?a(createRouterError(4,{from:n,to:t})):_ instanceof Error?a(_):isRouteLocation(_)?a(createRouterError(2,{from:t,to:_})):(o&&r.enterCallbacks[s]===o&&typeof _=="function"&&o.push(_),i())},d=e.call(r&&r.instances[s],t,n,c);let u=Promise.resolve(d);e.length<3&&(u=u.then(c)),u.catch(_=>a(_))})}function extractComponentsGuards(e,t,n,r){const s=[];for(const o of e)for(const i in o.components){let a=o.components[i];if(!(t!=="beforeRouteEnter"&&!o.instances[i]))if(isRouteComponent(a)){const d=(a.__vccOpts||a)[t];d&&s.push(guardToPromiseFn(d,n,r,o,i))}else{let c=a();s.push(()=>c.then(d=>{if(!d)return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));const u=isESModule(d)?d.default:d;o.components[i]=u;const m=(u.__vccOpts||u)[t];return m&&guardToPromiseFn(m,n,r,o,i)()}))}}return s}function isRouteComponent(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function useLink(e){const t=inject(routerKey),n=inject(routeLocationKey),r=computed(()=>t.resolve(unref(e.to))),s=computed(()=>{const{matched:c}=r.value,{length:d}=c,u=c[d-1],_=n.matched;if(!u||!_.length)return-1;const m=_.findIndex(isSameRouteRecord.bind(null,u));if(m>-1)return m;const x=getOriginalPath(c[d-2]);return d>1&&getOriginalPath(u)===x&&_[_.length-1].path!==x?_.findIndex(isSameRouteRecord.bind(null,c[d-2])):m}),o=computed(()=>s.value>-1&&includesParams(n.params,r.value.params)),i=computed(()=>s.value>-1&&s.value===n.matched.length-1&&isSameRouteLocationParams(n.params,r.value.params));function a(c={}){return guardEvent(c)?t[unref(e.replace)?"replace":"push"](unref(e.to)).catch(noop):Promise.resolve()}return{route:r,href:computed(()=>r.value.href),isActive:o,isExactActive:i,navigate:a}}const RouterLinkImpl=defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink,setup(e,{slots:t}){const n=reactive(useLink(e)),{options:r}=inject(routerKey),s=computed(()=>({[getLinkClass(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[getLinkClass(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const o=t.default&&t.default(n);return e.custom?o:h("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},o)}}}),RouterLink=RouterLinkImpl;function guardEvent(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function includesParams(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!isArray(s)||s.length!==r.length||r.some((o,i)=>o!==s[i]))return!1}return!0}function getOriginalPath(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const getLinkClass=(e,t,n)=>e??t??n,RouterViewImpl=defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=inject(routerViewLocationKey),s=computed(()=>e.route||r.value),o=inject(viewDepthKey,0),i=computed(()=>{let d=unref(o);const{matched:u}=s.value;let _;for(;(_=u[d])&&!_.components;)d++;return d}),a=computed(()=>s.value.matched[i.value]);provide(viewDepthKey,computed(()=>i.value+1)),provide(matchedRouteKey,a),provide(routerViewLocationKey,s);const c=ref();return watch(()=>[c.value,a.value,e.name],([d,u,_],[m,x,C])=>{u&&(u.instances[_]=d,x&&x!==u&&d&&d===m&&(u.leaveGuards.size||(u.leaveGuards=x.leaveGuards),u.updateGuards.size||(u.updateGuards=x.updateGuards))),d&&u&&(!x||!isSameRouteRecord(u,x)||!m)&&(u.enterCallbacks[_]||[]).forEach(N=>N(d))},{flush:"post"}),()=>{const d=s.value,u=e.name,_=a.value,m=_&&_.components[u];if(!m)return normalizeSlot(n.default,{Component:m,route:d});const x=_.props[u],C=x?x===!0?d.params:typeof x=="function"?x(d):x:null,M=h(m,assign({},C,t,{onVnodeUnmounted:$=>{$.component.isUnmounted&&(_.instances[u]=null)},ref:c}));return normalizeSlot(n.default,{Component:M,route:d})||M}}});function normalizeSlot(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const RouterView=RouterViewImpl;function createRouter(e){const t=createRouterMatcher(e.routes,e),n=e.parseQuery||parseQuery,r=e.stringifyQuery||stringifyQuery,s=e.history,o=useCallbacks(),i=useCallbacks(),a=useCallbacks(),c=shallowRef(START_LOCATION_NORMALIZED);let d=START_LOCATION_NORMALIZED;isBrowser&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=applyToParams.bind(null,y=>""+y),_=applyToParams.bind(null,encodeParam),m=applyToParams.bind(null,decode);function x(y,T){let S,O;return isRouteName(y)?(S=t.getRecordMatcher(y),O=T):O=y,t.addRoute(O,S)}function C(y){const T=t.getRecordMatcher(y);T&&t.removeRoute(T)}function N(){return t.getRoutes().map(y=>y.record)}function M(y){return!!t.getRecordMatcher(y)}function $(y,T){if(T=assign({},T||c.value),typeof y=="string"){const f=parseURL(n,y,T.path),g=t.resolve({path:f.path},T),b=s.createHref(f.fullPath);return assign(f,g,{params:m(g.params),hash:decode(f.hash),redirectedFrom:void 0,href:b})}let S;if("path"in y)S=assign({},y,{path:parseURL(n,y.path,T.path).path});else{const f=assign({},y.params);for(const g in f)f[g]==null&&delete f[g];S=assign({},y,{params:_(f)}),T.params=_(T.params)}const O=t.resolve(S,T),D=y.hash||"";O.params=u(m(O.params));const G=stringifyURL(r,assign({},y,{hash:encodeHash(D),path:O.path})),l=s.createHref(G);return assign({fullPath:G,hash:D,query:r===stringifyQuery?normalizeQuery(y.query):y.query||{}},O,{redirectedFrom:void 0,href:l})}function F(y){return typeof y=="string"?parseURL(n,y,c.value.path):assign({},y)}function V(y,T){if(d!==y)return createRouterError(8,{from:T,to:y})}function H(y){return Z(y)}function Y(y){return H(assign(F(y),{replace:!0}))}function U(y){const T=y.matched[y.matched.length-1];if(T&&T.redirect){const{redirect:S}=T;let O=typeof S=="function"?S(y):S;return typeof O=="string"&&(O=O.includes("?")||O.includes("#")?O=F(O):{path:O},O.params={}),assign({query:y.query,hash:y.hash,params:"path"in O?{}:y.params},O)}}function Z(y,T){const S=d=$(y),O=c.value,D=y.state,G=y.force,l=y.replace===!0,f=U(S);if(f)return Z(assign(F(f),{state:typeof f=="object"?assign({},D,f.state):D,force:G,replace:l}),T||S);const g=S;g.redirectedFrom=T;let b;return!G&&isSameRouteLocation(r,O,S)&&(b=createRouterError(16,{to:g,from:O}),i0(O,O,!0,!1)),(b?Promise.resolve(b):s0(g,O)).catch(v=>isNavigationFailure(v)?isNavigationFailure(v,2)?v:u0(v):q(v,g,O)).then(v=>{if(v){if(isNavigationFailure(v,2))return Z(assign({replace:l},F(v.to),{state:typeof v.to=="object"?assign({},D,v.to.state):D,force:G}),T||g)}else v=f0(g,O,!0,l,D);return l0(g,O,v),v})}function n0(y,T){const S=V(y,T);return S?Promise.reject(S):Promise.resolve()}function d0(y){const T=_0.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(y):y()}function s0(y,T){let S;const[O,D,G]=extractChangingRecords(y,T);S=extractComponentsGuards(O.reverse(),"beforeRouteLeave",y,T);for(const f of O)f.leaveGuards.forEach(g=>{S.push(guardToPromiseFn(g,y,T))});const l=n0.bind(null,y,T);return S.push(l),Q(S).then(()=>{S=[];for(const f of o.list())S.push(guardToPromiseFn(f,y,T));return S.push(l),Q(S)}).then(()=>{S=extractComponentsGuards(D,"beforeRouteUpdate",y,T);for(const f of D)f.updateGuards.forEach(g=>{S.push(guardToPromiseFn(g,y,T))});return S.push(l),Q(S)}).then(()=>{S=[];for(const f of G)if(f.beforeEnter)if(isArray(f.beforeEnter))for(const g of f.beforeEnter)S.push(guardToPromiseFn(g,y,T));else S.push(guardToPromiseFn(f.beforeEnter,y,T));return S.push(l),Q(S)}).then(()=>(y.matched.forEach(f=>f.enterCallbacks={}),S=extractComponentsGuards(G,"beforeRouteEnter",y,T),S.push(l),Q(S))).then(()=>{S=[];for(const f of i.list())S.push(guardToPromiseFn(f,y,T));return S.push(l),Q(S)}).catch(f=>isNavigationFailure(f,8)?f:Promise.reject(f))}function l0(y,T,S){a.list().forEach(O=>d0(()=>O(y,T,S)))}function f0(y,T,S,O,D){const G=V(y,T);if(G)return G;const l=T===START_LOCATION_NORMALIZED,f=isBrowser?history.state:{};S&&(O||l?s.replace(y.fullPath,assign({scroll:l&&f&&f.scroll},D)):s.push(y.fullPath,D)),c.value=y,i0(y,T,S,l),u0()}let o0;function g0(){o0||(o0=s.listen((y,T,S)=>{if(!y0.listening)return;const O=$(y),D=U(O);if(D){Z(assign(D,{replace:!0}),O).catch(noop);return}d=O;const G=c.value;isBrowser&&saveScrollPosition(getScrollKey(G.fullPath,S.delta),computeScrollPosition()),s0(O,G).catch(l=>isNavigationFailure(l,12)?l:isNavigationFailure(l,2)?(Z(l.to,O).then(f=>{isNavigationFailure(f,20)&&!S.delta&&S.type===NavigationType.pop&&s.go(-1,!1)}).catch(noop),Promise.reject()):(S.delta&&s.go(-S.delta,!1),q(l,O,G))).then(l=>{l=l||f0(O,G,!1),l&&(S.delta&&!isNavigationFailure(l,8)?s.go(-S.delta,!1):S.type===NavigationType.pop&&isNavigationFailure(l,20)&&s.go(-1,!1)),l0(O,G,l)}).catch(noop)}))}let p0=useCallbacks(),J=useCallbacks(),K;function q(y,T,S){u0(y);const O=J.list();return O.length?O.forEach(D=>D(y,T,S)):console.error(y),Promise.reject(y)}function c0(){return K&&c.value!==START_LOCATION_NORMALIZED?Promise.resolve():new Promise((y,T)=>{p0.add([y,T])})}function u0(y){return K||(K=!y,g0(),p0.list().forEach(([T,S])=>y?S(y):T()),p0.reset()),y}function i0(y,T,S,O){const{scrollBehavior:D}=e;if(!isBrowser||!D)return Promise.resolve();const G=!S&&getSavedScrollPosition(getScrollKey(y.fullPath,0))||(O||!S)&&history.state&&history.state.scroll||null;return nextTick().then(()=>D(y,T,G)).then(l=>l&&scrollToPosition(l)).catch(l=>q(l,y,T))}const e0=y=>s.go(y);let h0;const _0=new Set,y0={currentRoute:c,listening:!0,addRoute:x,removeRoute:C,hasRoute:M,getRoutes:N,resolve:$,options:e,push:H,replace:Y,go:e0,back:()=>e0(-1),forward:()=>e0(1),beforeEach:o.add,beforeResolve:i.add,afterEach:a.add,onError:J.add,isReady:c0,install(y){const T=this;y.component("RouterLink",RouterLink),y.component("RouterView",RouterView),y.config.globalProperties.$router=T,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>unref(c)}),isBrowser&&!h0&&c.value===START_LOCATION_NORMALIZED&&(h0=!0,H(s.location).catch(D=>{}));const S={};for(const D in START_LOCATION_NORMALIZED)Object.defineProperty(S,D,{get:()=>c.value[D],enumerable:!0});y.provide(routerKey,T),y.provide(routeLocationKey,shallowReactive(S)),y.provide(routerViewLocationKey,c);const O=y.unmount;_0.add(y),y.unmount=function(){_0.delete(y),_0.size<1&&(d=START_LOCATION_NORMALIZED,o0&&o0(),o0=null,c.value=START_LOCATION_NORMALIZED,h0=!1,K=!1),O()}}};function Q(y){return y.reduce((T,S)=>T.then(()=>d0(S)),Promise.resolve())}return y0}function extractChangingRecords(e,t){const n=[],r=[],s=[],o=Math.max(t.matched.length,e.matched.length);for(let i=0;i<o;i++){const a=t.matched[i];a&&(e.matched.find(d=>isSameRouteRecord(d,a))?r.push(a):n.push(a));const c=e.matched[i];c&&(t.matched.find(d=>isSameRouteRecord(d,c))||s.push(c))}return[n,r,s]}function useRoute(){return inject(routeLocationKey)}function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var websr={exports:{}};(function(module,exports){(function(t,n){module.exports=n()})(self,()=>(()=>{var __webpack_modules__={"./src/context.ts":function(__unused_webpack_module,exports){eval(`
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


//# sourceURL=webpack://WebSR/./src/renderer.ts?`)}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(t!==void 0)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}var __webpack_exports__=__webpack_require__("./src/main.ts");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})())})(websr);var websrExports=websr.exports;const WebSR=getDefaultExportFromCjs(websrExports),vid1="/OffTheFloor/assets/vid1-j3ADFmph.mp4",vid2="/OffTheFloor/assets/vid2-0mVR51Z7.mp4",vid3="/OffTheFloor/assets/vid3-kkgjLHO5.mp4",name="anime4k/cnn-2x-l",layers={conv2d_tf:{name:"conv2d_tf",type:"conv",inputs:["input_image"],output:"conv2d_tf",weights:[.3053028,-.037464816,.113983095,.12537485,-.18630321,.084269725,-.01351514,-.20190673,-.12298384,-.037622184,-.070214555,-.19367279,0,0,0,0,-.41849324,.099702746,-.04276645,-.047299717,.20074473,.14217933,.15571699,.19553481,.21868695,-.053848714,.016413521,.14117444,0,0,0,0,.030540446,-.052293833,.0715466,-.31160545,.07808315,-.16860045,.032828577,-.2955024,-.110374965,.04043687,-.014024628,.058699366,0,0,0,0,-.10727635,.054200135,.20853694,.21086875,.122690216,-.091823794,.310609,-.01738923,-.0013488946,.10835534,-.077265196,.086751856,0,0,0,0,-.77150255,.40530515,-.41257596,-.14367618,.46888494,.2650122,-.934199,.40476102,.32293493,.20251967,.19891106,-.29698747,0,0,0,0,-.12505147,-.41904053,-.065798186,.34075752,.026240354,-.2977496,.032647505,-.003566783,.10290523,-.23417123,-.06014203,.094735645,0,0,0,0,.11207838,-.04062474,.023897955,.08605987,-.020888371,.045541205,-.07231824,-.25884083,-.11796847,-.002691391,.0050435597,.02756291,0,0,0,0,.4615728,.041790638,.08971143,.20213957,-.38537467,.19938901,.08594364,-.08621994,-.08163473,-.133266,-.09561729,-.014209637,0,0,0,0,.0787417,-.0483673,.07621572,-.060169693,-.013465177,-.17152289,.02515561,.17675288,-.05173998,.10768042,-.029858522,-.013957215,0,0,0,0],bias:[.0072128535,-.05658625,.052939568,-.1760861]},conv2d_tf1:{name:"conv2d_tf1",type:"conv",inputs:["input_image"],output:"conv2d_tf1",weights:[-.112743355,.0422517,.21350034,-.0967133,.16265953,.0022497,.015078242,.08204187,.035236806,-.0468228,-.09464228,-.001864949,0,0,0,0,.25631642,-.41485596,-.16662048,.13201024,.057921384,.2240005,-.30038536,-.08305622,.2228756,.32263795,.10608189,-.18616734,0,0,0,0,.08997524,.11516871,.19212262,-.035154644,.11612274,-.04056247,.14974374,.029173585,-.07629641,-.14353512,.041081246,.20230265,0,0,0,0,.2262286,.055954933,-.14499907,.17314723,.16590612,-.06688698,-.11118816,-.012938116,-.043101817,.026133137,.2958395,.06543993,0,0,0,0,-.07311521,-.3041244,-.47978505,-.6350967,-.17432262,.34965977,.25399777,-.16590433,-.49957857,.0549526,-.40869385,-.08780993,0,0,0,0,-.3014447,-.00021343959,-.14953177,.028001398,-.14931908,-.14910097,-.13287953,-.45026535,.17378895,.024704922,-.027308129,-.10292025,0,0,0,0,-.06732655,-.13119644,.066014715,.081011154,-.15154321,.2407805,.07733481,.12312706,.1741804,.008495716,-.14125362,-.043644864,0,0,0,0,.11465958,.42001364,.011069392,.3203028,-.058801666,-.37830314,-.030540617,.2245139,-.11310525,-.14845212,.19957744,.25789997,0,0,0,0,-.16037206,.21326372,.020099448,.018666709,.122083254,-.16033986,-.10725163,.2556128,.1650688,-.10475823,.048623525,-.103755645,0,0,0,0],bias:[.007717166,-.027800834,.0795002,.0053199283]},conv2d_1_tf:{name:"conv2d_1_tf",type:"conv",inputs:["conv2d_tf","conv2d_tf1"],output:"conv2d_1_tf",weights:[-.0056740534,-.21186607,-.18014967,.118979976,-.0015611284,-.07708486,.060131397,.11653345,.027150517,.10837246,.08583816,-.14032431,.017552888,.0035846964,.03980114,.064649396,-.03289318,-.12004539,.26514888,-.15079662,.04214227,-.027273783,-.027950313,.19614808,.18510003,-.10346252,-.029836183,.09174428,-.0088710375,-.18273513,.06601674,.009983851,.08476211,.043996535,.056711517,.009976895,.07039107,-.024862664,-.059921104,.046850603,.04983447,.04863198,.21777405,-.0576961,.045321796,-.0060038245,.096396215,-.10842004,-.15746164,.041757874,.035169285,-.1734288,-.24219254,-.13318908,.2272079,-.02902605,.07750601,-.1467191,-.12296749,-.07533314,-.07073083,.17909113,.04789308,.17245363,.057547905,.1464685,-.33115456,-.26956198,-.26298407,-.059824817,.022509675,-.09251868,.36277944,-.2072429,.21095088,-.45492023,.07428653,.1593302,-.2945834,.12825087,-.1318458,.27804148,.037600737,.12047866,.0065036337,.0017241207,.060497303,-.14786585,-.15149063,.02731698,.048886403,-.0025970868,-.026979815,.07348884,.015636757,-.107966796,-.079988025,-.01626299,.06517438,.086406484,-.1484504,.070595,.20620634,.09713373,-.13620836,.012067949,-.00068703433,-.038030174,.22300471,-.0012400965,-.014827909,-.08927486,.15634936,.052028038,.038081627,.12720168,.07342066,-.04318368,-.0065998454,.12109317,-.45398173,.03666754,-.17773737,.038516667,-.13009632,-.007457001,-.013938809,.09776142,.029636936,.12864171,.11347291,-.11812842,-.0870342,.035678383,.050338242,.045754932,-.07072752,.010447726,.039642975,-.08795004,-.1191525,.00967509,.13485421,-.053204738,-.011072695,-.09613245,-.09094804,.028029291,-.04031162,.15690295,.25094184,-.21776834,.06524669,.06412185,-.052852992,-.08097702,-.039127756,.036357917,.104585476,.25095442,-.08328618,-.006246033,.099708706,-.014916097,.17727195,.4369228,.14760216,.06707674,.025167737,-.022487842,-.038962565,.15380669,.08125089,.09844594,.33538374,-.003161368,-.0128195705,-.05475118,-.037705053,-.0012077648,-.17425515,.091487505,-.12909423,.0074876705,.13438368,5778033e-11,.04563314,-.12185897,-.053612474,-.049824294,-.12851205,.12856449,-.025741795,.01867236,-.00027440622,.10502768,.27042285,-.14947751,.11143123,.2575913,-.07414089,-.33919522,-.13194235,-.20088726,.23121537,-.08197353,.06693911,.015411386,.09143717,.22842278,.06501074,-.20009698,-.042117566,-.23452093,-.074082755,-.10612558,.077631965,.08343657,-.07657599,-.43297377,.7092466,-.16272525,.17222248,-.056038965,.081200436,.046752565,.028254949,.18820632,.096592255,.05896745,.14845169,.034777895,.07195204,-.1908046,-.015341971,.02606145,-.010377239,.0755547,-.15285216,.047916733,-.06825636,-.049540907,-.024328846,.03506251,.2060094,.054119263,-.06671269,.052428722,.055792283,-.14336903,-.03180757,.013760968,-.037398104,-.06880077,-.023608573,.0360965,-.16937497,-.30156836,.0021435453,.025772978,-.17990975,.046133514,-.32447076,-.083382785,-.081322014,-.022132374,-.05319431,.11794733,.08943906,.12927428,.105764806,-.051034793,-.011012306,.047636557,.050260928,.051847618,.010985655,-.13752967,.023869954,.07011459,-.18244945,.07239806,-.013638856,-.026982805,.11395993,-.031304818,-.08714153,.077115685,.08707592,.2265186,.13363098,-.039588258,-.029561255,.019238092,.024606103,-.0019022018,-.062285982,-.0629511,-.03753033,.109805316,.016018672,-.08284564,-.04092752,-.030386891,.0016500859,.01616536,-.099148355,.24161765,.028064307,-.028680569,.054400917,-.1978921,-.08584302,-.096797146,-.06546965,-.09342837,.030265866,.07057579,-.02080932,.053178705,-.030304352,.047440585,-.04248429,.08568772,-.051317703,.036739342,.00865767,-.018183297,-.07335176,.025001721,-.068509035,.1814819,-.09756565,-.024179723,-.05959287,.0352454,.023015196,-.022870664,-.12028372,-.111095205,.11065281,-.19900022,-.24012049,-.017028643,-.13484617,.050107025,.10741765,.037951697,.013090438,-.0010045726,-.029447839,-.1859787,.17922719,-.24138594,-.44595388,-.032014426,.06897096,.07125395,.1944457,-.035794795,-.24022278,-.13230884,-.1277025,.21229011,-.12249393,.06141907,.2687936,-.26896995,.0397242,-.30710965,.28815824,-.06642567,-.07588877,-.019552408,.0057806037,.11465521,.03560534,-.10640553,.023589289,-.16667193,.02066607,-.01026633,-.02655378,.082493655,-.007902949,-.08501038,-.029395591,-.07072227,-.01800967,-.14564751,-.08372804,-.049974415,.1756957,-.02042449,-.04413007,-.016873527,-.2385717,-.001741017,.08298281,-.019873247,-.01803727,.0642893,.21513617,.066888265,-.042107955,-.123470366,.045296013,-.11958806,.48208967,-.027188249,.12136116,.05246265,.13522038,-.016297493,.028486907,-.059840377,-.1373251,-.11281026,-.06418318,.08444032,.062874556,-.009133875,-.049571835,-.042995855,.12483249,-.025967957,-.11202483,.09862257,.099986054,.009230306,-.09042664,.046612263,.03203309,.106030256,.045741174,-.020529225,-.028610658,-.055219248,-.21404657,.07746393,-.059359375,.0033258004,-.0054513607,.06856653,.18043655,-.119936846,-.05639265,-.10240379,-.0004331875,.10426754,-.008130048,.012795991,-.14372933,-.40797862,.105197415,-.0041354536,-.079792455,.0914027,.012418237,-.11449173,.020261409,-.14681602,-.13355242,.18290488,.052306626,.010864275,-.072627716,-.009773121,.09484167,-.09631301,.14896165,-.21220942,-.11994051,-.002957136,-.118194886,.08661347,.10005298,-.029620873,.101668894,.0242806,-.055188183,-.06322889,.12994595,.03140751,-.092755616,.04239107,.18460171,.08471877,.014203371,.13608724,.035351243,-.07883493,-.10067456,.14417742,.0054235114,.100745104,-.043811034,-.16055201,-.11927185,.20517266,.16734722,.27720267,.1205665,.045803893,-.07874647,.06764307,-.11157022,.080770165,-.044105835,-.03276538,-.10945451,.100562036,-.044731796,-.12854387,-.061937924,-.21604767,-.036132332,-.024353411,-.16718283,.14903957,-.11620588,.14563644,.23363836,.08400659,.15248756,-.1424437,.112882614,-.04096889,-.0486021,-.05714939,.042517707,-.06106919,-.12970918,-.071898215,-.044727243,-.026308542,.05687118,-.0394057,-.109454155,-.0021216893,.018588595,.08061093,.0500373,-.0034918839,.11269324,-.17924047,-.12965205,-.07287767,-.015830642,-.044497102,.20014328,-.14054494,.1232692,.2395109,.14093149,.03518561,-.14088139,-.09045081,-.07283352,.053434785,.020512339,.026349569,-.06666101,.05554806,-.03044066,.26656216,.019155584,-.12118906,.087923005,-.1716557,.050843164,.037432503,-.030232614,.030457936,.04232163,-.066400655],bias:[-.0216415,.09015036,-.030761974,-.26541537]},conv2d_1_tf1:{name:"conv2d_1_tf1",type:"conv",inputs:["conv2d_tf","conv2d_tf1"],output:"conv2d_1_tf1",weights:[.04688368,.13853125,.1714716,-.03034447,-.08090605,.1225867,.17535992,.012508419,-.0010665918,-.07481546,-.15541986,.0671128,-.029307734,-.076674186,.03925896,-.07140553,-.13273083,.062933214,.04200143,-.0080243945,-.120439716,-.090192355,-.022639645,.00020024918,-.11211478,-.12949537,.025783822,.009155746,.01004339,-.0661901,.10630156,.053137038,.07113487,-.16011865,-.10838903,-.0034704183,.110606894,-.14915739,.036511585,-.003103608,-.0551775,-.13140677,.05270299,.12139221,.02226174,.008415268,-.06647426,.118130066,-.045172617,-.0020388453,-.27287582,.002428232,-.2833772,.13788106,.073339015,.10666715,.08455194,.16499293,.089058325,.008815447,.034657538,-.109856166,-.11499077,-.02918854,.07910854,-.26334837,-.3246593,-.08246522,.09211476,.40793833,-.09658794,-.14430091,-.50632644,.087234974,.26298127,.3687086,.06492316,.23082961,.18233871,-.09283792,-.022744032,.21690565,.2694824,-.12230013,-.07969618,.21595429,-.034979805,.008938489,.21289209,-.446482,-.042927746,-.13587558,-.032581557,-.07182814,-.054092336,-.009542036,-.0034912943,-.080354184,-.08577375,-.1521193,.09809233,.034529503,-.100664355,.008191219,-.014303411,-.02862216,-.18669915,-.12384598,.046499267,.093707144,.10661308,.15079576,-.031025652,-.0384342,.14258307,.25531343,.0075049917,-.03966595,.062381975,.19593526,-.2868182,.03162008,-.4391041,-.524017,-.034463473,-.0066741486,-.24586639,.10521736,-.07452321,-.0227877,-.025402244,.115727395,-.039511252,-.07785703,-.013689458,.0066024344,-.052957747,.011206241,-.0021671024,.077190824,-.11709912,.046635598,.123751156,-.03712064,.055411004,-.0020031065,.06685547,-.018829947,-.06378933,-.18389674,-.0023551763,.0670314,.13038594,.0601923,-.03035789,-.019537423,-.014483204,-.056800704,.08663347,-.106859975,-.06603686,.07360526,-.0072026253,-.06778907,-.039178446,.012397263,-.13482279,.05745685,-.055182382,-.10545766,.003857615,.041947857,-.15239377,.041826613,.058879383,-.0042669442,-.0697229,-.010702144,-.032265816,.013317131,.105028264,.21032134,.06845646,-.018358687,.064568676,.08437135,-723181e-9,.1324007,.05527932,-.049871888,-.10125047,-.005040889,-.006467578,-.05120533,-.011780779,-.011742203,-.34242442,-.020819988,.17381702,-.059836414,-.028882682,.23210457,.16579404,-.03708216,-.23541835,-.03290251,.029319672,.26189178,-.30955994,-.06408282,-.16872866,.10767772,-.041430887,.051697977,.12523535,-.060389146,.026289431,.06359533,.13526368,.2479901,-.3263977,.10216362,-.0030894123,.046437826,.10061438,-.17047118,-.21593021,-.023389054,-.17507865,-.30822313,-.22044766,.16078933,.07099252,-.11573018,.24712858,-.0659458,-.037504572,-.12297423,.03342632,-.058119852,-.020957774,-.0224927,.04069268,-.07911167,.074009344,.065916434,.008222278,.11625076,-.25299504,.03357169,-.021988,.015821831,-.0021187372,-.030700417,-.004374924,.027358979,.06549052,-.048067164,.05489091,-.28851983,.13378961,.026875904,-.09877994,-.19947459,-.1274035,-.022928834,-.26344195,-.025870804,.022505255,.0070861108,.121051334,-.025964163,.059426542,-.0327433,.2313695,-.07046268,.20479666,.027021704,.2564928,-.11689885,-.07407976,-.019611249,.093463086,-.121553615,.035009407,-.008135333,-.075931996,.047803063,-.059434246,-.1652242,-.124611154,.04743711,.10530296,-.13869187,-.036534663,-.035206333,.06067593,.06126907,.120151915,-.06722673,.008103894,.037225723,-.007520425,.065720856,-36759695e-12,-.036789574,.013370567,-.037871476,-.013454664,.15086569,.10164699,.057703357,-.12871023,.12827681,-.055057358,-.040753044,-.0142621,.08563361,-.04615499,-.03130452,-.117965914,.09056485,.07272314,.009695964,-.11331058,.07467256,-.08291521,.00937355,-.04097737,.07752905,-.017335521,-.12539999,.039462104,-.0007037007,.06034812,-.09497377,.20828065,.0400099,.047638226,-.046423353,-.026133502,.098207295,.056742374,.017029466,-.058164768,-.046973787,-.17328712,-.0012984811,.050085854,.11296557,.12639083,.058543045,-.098907426,.22031747,.101559944,.06616554,.026110496,.56487054,.23754556,-.07540935,.31768414,-.47653618,.015073956,-.33731326,.087285936,-.24593173,-.26141426,.15003823,.046026446,-.13767281,.064847544,.07717139,.08544123,-.11092969,.072325274,.010849038,-.3055905,.66436774,.1434729,.0494463,.07115603,.083811216,.020431712,.06537088,-.15532711,.030139687,.040853374,.11089222,-.08150315,-.015851755,-.06787692,.096075505,-.011956207,-.0017758606,.1277494,.16156575,-.038588695,-.0626418,-.041797023,-.19467135,.12917455,.017410474,-.20125067,-.08040003,-.13494664,.17789102,-.19909395,.08441434,.078570575,-.06330619,.23767303,.5442659,-.009227878,-.021818208,.14318731,-.09042824,.097801,.09345441,.17846581,-.14773296,.06536365,.07642184,-.011880635,.02086135,.013336972,-.053295113,-.13410404,.027241753,.087728985,-.044033397,-.13098569,.009423933,-.02488427,.0134966355,-.0075000813,.07272353,.015842725,.13765687,.028079558,-.08384948,-.06666623,-.023220664,.025091043,-.055167805,-.18826278,.04423603,.13499942,.059128854,.01935146,-.030980906,-.031569187,-.0036869382,.036753897,.118464164,.15871695,-.09842428,.023324292,.071796335,-.07869346,-.10751301,-.2588698,.064011686,.17386378,-.039197855,.08590827,.005497696,-.026512025,.015661815,.1102415,-.08268483,-.0032903247,.10049029,-.008157236,-.035823178,-.017570151,-.081716835,-.3531045,.010005245,.017141227,-.016376914,-.16617337,-.007689783,.00954665,.07117733,-.001669262,-.012331606,.051613946,.062780835,.06123557,-.20243123,-.19181818,.032895602,.19760677,.004464939,.12754539,-.27360034,.15006685,-.083587274,-.03215495,-.16992462,-.011944293,.058361508,-.088097006,.023880545,-.04168166,-.06960282,-.092672385,-.057278465,.23540072,-.1721208,-.018213503,-.23494521,-.124885194,.1905868,.11108704,.03163991,.11383064,.101223364,.069428995,-.14298953,-.07609092,.13704266,-.07749446,-.0005389336,-.04617235,.18011934,.08350316,.09416366,.073356606,.067966126,-.21285574,.0782625,-.0034364646,-.032581426,-.05538558,-.1317288,.14552782,-.1132393,.13063973,-.00833602,.0026844777,.028135289,-.02536825,-.028372496,-.318728,.07862527,-.12176221,.35010242,-.029198067,.016302662,.17667587,.12605923,.1556697,-.06061443,.05843511,.10891248,.01267106,-.018492714,-.15945031,-.050723754,-.21555941,-.016813517,-.084676236,-.07545412,-.14518794,-.014592766,-.2446481,.0530632,.0847341,.12342537,-.028644923,.083479315,-.04179012,.0025225023,.16006976,-.026940256],bias:[-.060742114,-.037577342,.055704296,.03134311]},conv2d_2_tf:{name:"conv2d_2_tf",type:"conv",inputs:["conv2d_1_tf","conv2d_1_tf1"],output:"conv2d_2_tf",weights:[.13129333,-.022117995,-.009753253,.020439912,.044090994,-.0916335,.0036765633,-.11719207,-.06413809,.04079378,-.00085516454,-.06306388,-.12660664,-.054126263,-.005513979,.06364538,-.028422508,.23270117,-.28674677,-.10820166,.024321957,-.0811145,-.07290707,-.02125165,-.064260505,.052076746,-.009654081,.08363882,-.02037171,.15006389,.121593125,-.011237004,-.14672333,.015381624,.1028172,-.041823238,.0072677187,-.042953942,.06426537,-.0938381,-.05990813,-.04599802,-.11264726,-.027826328,-.058160868,.10747306,-.07327458,.07998872,-.08702181,-.03750975,-.045659006,.04488332,.09102003,.066556975,-.04353586,.08994567,-.13561495,-.10653702,.006989605,.028230097,.07177144,.2938447,-.00943923,.022120917,-.1801194,-.11119162,.1977298,-.247902,-.16654298,-.07423158,.114130594,.0014401592,.006954727,-.09810646,-.051310766,.19487657,.2545855,-.06328558,-.04617056,.09444692,.011378825,.16044368,.017211074,.14472178,.032992378,-.008925819,.035120245,-.012409223,.074333005,.1178002,-.128956,-.13624239,-.2791275,.21457297,-.1476131,.04874687,-.03491764,-.061763793,.05779039,.0054837577,-.023937583,.08281698,.032306053,-.014566218,.12738499,-.0132100545,-.051833414,.0057818824,.012158851,-.20231532,-.0043795826,.10285843,-.22269921,-.15135509,-.039143335,.033390045,.06770212,-.14538582,-.08011057,.03796648,-.025913516,.13925864,.18309896,.012709204,-.24912506,.3217706,.0394195,.017977878,.00080196525,.059145816,.05720508,.0056548906,.005168018,.09938438,.0200503,-.05516137,.061309986,-.019621318,-.1541441,.019540716,.030571707,-.09054893,.032851614,-.27210873,.27061436,-.114008114,-.0020118617,-.1656827,.09770587,.029897455,-.03307522,-.04661818,.033011347,.18498488,-.05162084,.087471776,-.24665618,-.12538423,-.08123797,-.010210389,.075188264,.0020608555,.18558815,.041179713,.11232638,.05507779,-.19599183,.027942855,.06199144,.22141005,-.06121163,.014993597,.24105869,-.019737717,-.112485714,.0157406,.09425698,.0207658,.12074599,.009430481,.11889248,-.025782838,.0034711843,.05113582,.012531833,-.0018606635,-.09137569,.018120576,.4051155,.02222076,-.16001017,.10981527,-.03582557,.014994796,-64688604e-12,.24618183,-.11697727,.24388117,.038502026,-.3511993,.101741396,-.10748137,.035059888,-.017535849,.09450039,.06541661,.12149035,.28798738,-.27143848,.017990451,-.69144464,.037944376,-.04551905,.09263134,.4259611,-.14107811,-.10641847,.23065196,.040813655,-.07789163,.3087666,.08190437,.16409059,-.06455426,-.08290655,-.35286915,-.18082355,-.32229406,.1608227,.030915622,.09207708,.02655054,.039464593,.026095424,.052584656,.033881903,-.01751319,-.0011676399,.04002607,.1630013,-.012021132,.12163766,-.07410629,-.06879096,.017859738,-.039261997,-.028677614,-.23610398,-.15963873,-.0006119958,.11275506,.0082659265,.05677582,.08676638,-.08669759,-.10475464,.12792721,.06888765,.31803077,.26002547,-.067599155,-.011822328,-.2589909,-.30024147,.11076704,.15200609,-.018180368,-.19146141,.22298847,.059484895,.034478076,.15610938,.0870121,-.016420847,-.011579898,.097182855,-.120095566,-.06843338,-.043460473,-.060684606,-.027540063,-.008499213,.033570655,-.06866259,.01429712,-.07424434,.0009466247,.09142678,-.03781424,.04587032,.03744051,.02712279,-.051038064,.0669144,-.02640278,.12384894,-.0022533627,-.010022036,.07536463,-.030489929,.09418577,.155089,-.011290433,-.02102941,-.0053278613,-.07160643,.039028414,.04123311,-.10693177,-.1170874,.07230816,-.033255517,-.119176835,.0786526,-.11880206,-.11354601,-.037539184,.14404313,.069760695,.024738638,.03413808,-.006487654,.10006853,.22228058,-.13796462,-.14042488,.04017443,-.031790894,-.06673143,.009888688,.08831443,-.0045771743,-.028375361,-.04704813,.07128581,-.07012518,-.06954315,-.23728988,-.14192343,-.08236467,-.2552115,.04102959,-.06355397,-.08340241,.17617856,.20281969,-.16249381,.10843737,-.04392261,-.08587206,.053069845,-.15482199,.124981806,.12828638,-.061472785,-.20108232,-.14905351,-.40766275,-.35427195,-.13183996,.09307428,-.07697028,.06702549,-.22656697,.019868268,-.19361132,.08784669,.20249842,-.004661343,-.09333453,-.24876262,-.07906779,.110697776,-.37069768,-.042212646,-.0046135853,-.2254257,-.023392014,.031476703,-.045574382,-.12675518,-.076056994,-.08228006,-.040303517,.16182694,.0512523,.051189836,.048962783,-.05156489,-.17987493,-.012037288,.06953726,-.09458492,.1610021,-.004063283,-.032922342,.08995396,.1939926,-.018710036,-.08153231,-.064830944,.06121252,-.18886387,-.12976822,-.031117212,.12219633,.19070715,.12495262,-.11994464,-.24687837,-.08425294,-.016920334,-.13286817,-.3260188,-.11776061,.1651019,-.17652592,.002499805,-.030541016,-.01393431,.031418208,.08209422,.12430871,.4387016,-.108871914,-.09041422,.031226631,-.1638517,.20756467,.014476537,-.012701195,-.03440563,.005320072,-.0032291536,-.017209187,.031944863,-.2479921,-.24433962,-.13832912,.07835928,-.17707248,.028202811,-.19121435,.164587,.123152815,.0050288937,.084104605,-.0380019,.16008669,-.018608516,-.013778938,.033447385,-.01242472,-.070916265,.026909694,-.07318777,.15158044,.12047607,-.1709358,.2031767,.0025611701,-.21457459,.2791286,.10159932,.14320926,.020023825,-.0484187,.011563084,-.2640472,-.013056275,.004234292,-.095376395,.28363484,-.0058227647,-.0777649,.05238444,.41757923,-.07081097,.012567031,-.13029522,.07266207,.042793367,-.08212271,-.23401663,-.19457819,.4191269,-.03095442,.15339781,-.28451788,.09316364,.10231693,-.22844811,.111623526,.120017685,.18777381,.014420896,.15037206,-.29763284,.2601235,.0193363,.13686465,.009907918,-.37781665,.04916627,.14114739,.5043813,.0447959,-.029427614,.041768756,.27211213,.14163221,.086162075,.19159287,.21363218,.15053211,.08992885,.100828275,.09379921,.030783929,.11664482,-.059145752,-.19400764,-.09351283,-.016430443,-.12910964,-.067078374,.11760082,.121194765,-.055059325,.09299572,.06848913,.06334532,-.1476285,.111801244,-.033960916,.06474366,-.04952303,.27885208,-.052447475,.09226763,-.15024844,-.0033919013,.013498364,.09135676,-.017010042,-.122343406,-.19097193,-.27957183,-.18206005,.102321096,.22794476,.0439245,-.23710132,-.08070259,.17377135,.23811814,.17799385,.049567625,.1470908,.07329385,.0038071256,.19454515,-.01222965,-.07390379,-.0532754,.03942833,.123840906,.023459576,-.0658742,-.023957543,-.14682837,.1221027,-.010986398,-.066184506,.03026491,-.0638446],bias:[-.06427697,-.00039365015,.011889719,.060232002]},conv2d_2_tf1:{name:"conv2d_2_tf1",type:"conv",inputs:["conv2d_1_tf","conv2d_1_tf1"],output:"conv2d_2_tf1",weights:[-.012110923,.07818654,.07964548,.11885079,-.07694473,-.01378252,.006632789,-.12876098,.0069211307,.022278586,.069553085,.16569804,-.11123615,.06125189,-.11232848,.1559266,-.3261174,-.25586754,.21129315,.3135101,.1509055,.0044283345,.024674175,-.08000473,.01213029,.09093019,.04942677,.09806723,-.16454464,-.14433062,-.058094524,-.060819894,.023174008,.02858724,.07685972,.036857616,-.10415571,.10241035,-.01893166,.02065923,.058356714,.096426114,-.03772327,-.1529002,.13740575,-.048291504,-.06152548,-.15199897,.029300174,-.13222043,.0139825605,-.02274408,.062944874,.028447356,.05960515,.034447193,.03133432,-.019283533,-.024591971,-.0043914663,.15245225,.006851478,-.051783554,.17453748,-.09125915,.081739366,.01196335,.23130219,-.22557035,-.13537665,.0022028848,-.043430023,.22759882,.07920754,-.027986467,-.14051494,-.19557038,-.03585936,-.4258294,-.03856216,.18511422,-.09368415,.1551229,.04322566,-.023400841,-.02261204,.15129441,-.007954805,-.10739125,.019459398,.013128325,.018073296,.20886365,-.20662378,-.03814699,-.09272838,-.027352437,-.039882626,.12598103,-.093930446,.030846786,-.09325075,-.009084744,-.024584265,.07159868,.14162529,.19019091,.058855128,-.09880401,-.01843218,.14753596,-.2449532,.06565521,.09150168,-.08654865,.0829788,-.07596146,-.01815166,-.08786775,-.03477514,.20538878,-.012766377,.020719538,.088188395,-.034300096,.29972988,-.20005241,.018425167,.11713916,.024167519,.05167596,-.0027117804,-.016994188,.048177514,-.012556207,.010979094,.09098878,.028514355,.06063336,-.06624107,.012754856,.013208708,-.061374772,-.0025992664,-.09053513,.03183455,.017340872,.12934409,-.022161964,-.0015361432,-.049972344,-.12763855,.12779881,-.04697911,.018968226,-.119873665,.05462772,-.13919477,-.10226718,-.2540179,-.29912186,-.09291771,.050926663,.49361777,.21372582,.076717265,-.058968987,-.1572678,.3194591,-.120582424,.03942037,.023128232,.24321598,.07046334,-.21204855,-.648296,.05366883,-.020366706,.020979457,-.06893884,.04837168,.017253762,.008874203,-.020785445,-.20425391,.060179923,.046167206,.09863377,-.14381303,.038928367,-.06590863,-.18408588,.07099762,.2029403,-.033945918,.15202214,.0901113,-.27336198,-.17693861,-.16206753,-.17642029,.09400492,-.11165698,-.07863893,-.16306102,-.056210615,.22173557,.013508989,.08541511,-.27093616,-.35273993,-.48919773,.038383547,-.16013749,.012996215,-.03434873,.07024113,-.28971404,.10623425,-.0019642068,-.062374946,.3291145,.22468035,-.42971882,.020427933,.15062793,.08308975,-.025095072,.030093266,-.09649862,-.03382388,-.0016017791,.105402954,.020693144,-.051065,.07704679,.02864139,-.00135146,.03762216,.029277142,.01700994,.12214317,.06749582,.07354159,-.093085855,-.065021954,.010773045,-.00095128635,-.045384295,-.072611265,-.043900184,.049471326,.029131187,.03180158,-.13313527,.05280797,.14751251,-.15087761,.09932281,-.099232934,-.062390897,.112391844,-.09159478,.15856399,.034708973,.01819943,-.02730164,-.13562973,-.05687333,-.0114601655,.07025971,.02496533,-.0117268525,-.026162883,.07481553,.13420302,.029870516,.07405776,-.06379041,.09631234,-.07754842,.035888605,.0034764851,-.040771756,-.092022054,-.034230903,-.02281844,-.0028173258,-.059846643,.016772347,-.02287152,.07036337,-.024946844,.09826078,-.068491876,.20852126,.073890835,-.058288682,.013093785,-.05776076,.0516503,.052794468,.10837015,.038539834,-.16391893,-.008062687,-.35022175,.2510062,-.15820411,.048403125,.024878092,.037888516,-.035924178,-.068953894,-.025386479,.24405715,-.018495679,-.051277515,.14754932,-.031538483,-.038429607,-.047140498,-.018157095,-.029318782,-.04094171,-.11870087,.11214255,.07142628,.021007229,-.005681072,.1662777,.10829575,.112268396,.03567479,-.06738845,.0032037434,-.032217573,.2102397,-.20617546,-.07920811,.12918773,.054486286,-.13656865,.05806265,.01963165,.049910642,.15538268,.10724465,-.09697837,-.03070673,-.0071386313,-.11899626,.130827,.0051715383,-.07212691,.45726067,.2773031,.2973666,.3951691,.01333662,-.14561643,.04508669,.121690124,.13326228,-.22579186,.058161184,.09281702,-.00079749606,-.00771113,.09912341,-.41895548,-.06705759,.029148718,.052991726,.18665347,-.031787418,.23053595,.09444956,.10691037,-.06325714,-.05335701,.1917427,-.0065284846,.032622546,-.056801565,-.019131258,-.0939022,-.08130343,-.11051993,.0035269214,-.047361933,-.0543875,.10854369,.06445185,.016828364,-.022595318,.1450623,.033027507,-.020425137,.16169788,-.08747717,.07770065,.018155783,.07160794,.09860347,-.04329888,-.0043579484,-.2014418,-.060260013,.0036374568,-.17566042,-.2268221,.001273691,-.2609373,-.19417606,-.04102927,-.086845055,-.114253804,-.13433142,-.025941795,-.0155711295,-.13578776,.12059696,-.08760523,-.0057348222,.12164273,.07270617,-.06352636,.08894258,.04140841,.1230304,-.030357126,.03320213,.015911903,-.06288296,-.121976145,.2713457,.13913193,-.092420585,.105714336,.10294281,-.04591945,-.11767934,.032249406,-.06506192,-.04639334,.08137017,-.031746846,.13717805,.0071242675,-.077256985,-.14974317,-.08467893,-.20126395,-.06240603,.09554399,-.075844854,.28380412,.046030026,.053188596,.50943077,.1179795,.32203588,-.06712207,-.18528835,.0016975187,-.0041140947,.11234392,-.34049067,-.056880493,-.04325441,.09905571,.10978758,.009608353,-.10801905,-.04071131,-.09096832,-.12350487,.011801418,.22521795,.040283076,-.034117915,-.026142653,-.06058959,.12511659,.4131219,.59190845,.39758852,.16032091,-.5975032,-.14516282,.115154505,.03874097,.18462797,.22934213,.05285643,-.17804009,.33769128,-.14572927,-.029545018,.3897,-.055615567,.15232995,.48788264,-.21422523,.03397293,.0337794,-.19830915,-.022457365,-.35096076,.42616987,-.19268763,-.13191561,-.18337126,.017879983,-.070472844,-.09409196,-.025770849,-.060219247,.10869267,-.17341033,-.09199785,-.0667796,-.093538545,-.21300837,.030474098,-.04540468,.041321553,-.0998177,-.08669185,-.0090886615,.0021083376,.08900095,.5062186,.45537788,.029077586,-.1001008,-.0077697043,-.0096318,.11706454,.07401959,-.00650215,.06092762,.037442297,-.18500404,.0024998419,-.11761331,-.026825588,.27255726,.093010515,.3281413,-.051473666,-.050259475,-.17258662,-.23394547,.104795866,.035074063,-.061560635,.05975411,-.094255395,-.023440497,-.021479638,.0036277648,.004972212,.02416659,-.09856867,-.03971455,-.27094853,.026615402,-.0047890246,-.13755885,.16591635,-.0016293586,.133207,.047790572,.029041538],bias:[-.0063728676,-.029053684,-.052831043,.006475641]},conv2d_3_tf:{name:"conv2d_3_tf",type:"conv",inputs:["conv2d_2_tf","conv2d_2_tf1"],output:"conv2d_3_tf",weights:[-.0431447,.047972627,.09522898,.19048582,.0015511789,.1182684,-.065335006,.061233886,-.02451869,.065670215,-.015341636,.06836347,.10215459,.17516296,.0857072,.072732896,.10117189,.049022958,-.016017418,-.12119866,.089112304,.016286526,-.025251161,.03239003,-.0783818,-.086096615,-.13673106,-.15934734,-.51308054,-.061430074,-.16208844,.2227776,-.011567444,.025550444,-.018439503,-.015003767,.11606929,-.11613111,-.040906087,-.015202219,.03932618,-.1106059,.03703376,.018548314,-.12761284,-.038109995,-.23577367,.20272344,.025444161,-.075270735,.10999789,.16305386,.016178958,-.074034974,.1177035,-.077481024,-.047774278,-.029782977,.23137823,-.2389453,.033015423,-.10381626,-.16437943,.20906886,-.098473966,.11013442,-.18486807,.1907086,-.17564997,-.08509439,-.42472756,-.17446618,.3440862,.12719585,-.12213955,-.02246555,.18982963,.20809166,-.36067408,.51116616,-.019805575,.07812505,.061653323,-.08379226,.026396899,.009063019,-.10845824,.0827647,.045301896,-.07748021,-.07435832,.14860612,-.077515624,.010588131,-.22704287,.26849246,-.02884339,-.09512523,-.038564682,.08862835,.041666254,-.10532901,.040582962,-.10063983,-.15736029,-.03644334,-.005061672,.04302295,-.046482194,-.05262547,.05110866,.03204655,-.005932702,.033263832,.0044865874,-.02328917,.056534443,-.14084046,.022353357,.015087431,-.2734596,-.026544483,.06297078,.11277746,.06127936,.02466357,-.04970561,.02098484,.013603583,.036264602,.10985147,.01532773,-.09012781,.1132652,-.17016481,.025332611,-.077462606,.02990799,-.10627784,-.006231141,-.089164406,-.051507175,-.043900985,.09049239,-.15391691,.1915742,.014101639,-.022153432,.06291936,-.017871676,-.016763045,-.14741553,-.011252563,-.20720159,-.030648025,-.0142307645,.010291614,-.09243969,-.052940153,.0061574522,.032283742,.030768922,.1070225,-.027818602,.10032608,.0061178426,-.03561339,-.26687133,.14369439,-.11362691,-.08980895,.066520914,.33414948,.006998835,.09193012,-.2857383,-.059588976,-.02046844,-.042585023,.031939838,.12796514,-.06155685,.03540324,.009929082,-.0039611827,.10790477,.049435645,-.083034374,.23874004,-.07460337,-.020173345,-.2006587,-.13217632,.052319963,-.026713084,-.0051368694,-.10380872,-.28659084,.0044393227,.005174543,-.05092618,-.07092548,-.027397033,-.01609789,.13699281,-.14706929,.17737861,-.23746766,.19268502,.14133929,-.1305119,-.4034132,.057504695,-.24550998,-.081932545,.45489246,-.29331785,.19625074,.063166246,.15158689,.6715147,-.4610189,.08921431,.17761138,.044718128,-.011809122,.024131307,-.30093196,-.05607289,.047759805,.004210022,.098192796,.030430846,.008207501,.12266905,-.10549182,.11584339,-.091016166,-.08635591,-.13889709,-.19226642,.07147627,-.14759602,.4041079,.0744628,-.19612685,.1498252,-.06273549,.017959936,.10858338,-.14985329,.062042814,-.13240446,-.24362786,.113626175,-.15332204,.08383099,-.13935047,-.25981048,.16491203,.07513876,-.28346774,.19722275,-.044425573,.020889329,-.22140723,.025403097,-.09183192,.014202567,-.18666178,.062913105,-.047674105,-.1862771,.25878942,-.043018065,.22144824,.016088247,.12113542,-.11965952,-.01587184,.07830932,-.16069177,.13421321,.018718706,.09548377,.018543294,.013614677,-.1054485,-.2121733,-.015635416,.027564054,-.085904464,.064805664,-.070543915,.08966146,-.06359783,.01131311,.046913184,-.09809833,-.092063695,-.087217696,.012411829,.0045399712,.027389864,-.19307798,.09449126,.084036835,.30262446,.011706106,.029800637,.04612629,.006186647,.11228541,.055147965,.17659879,-.023410015,.19965266,-.06684007,-.081968054,-.052410994,-.058564443,.08252549,.058217794,.0864448,-.25663558,.080260284,-.0010294432,.05830051,-.07684524,.1820709,.04438993,.019178499,-.12425012,-.04596089,-.010032888,-.0012803525,-.43352658,.15262963,.25620222,.22428556,.09667152,.0037820593,-.07951691,-.11553085,.12982155,.17988266,-.14283511,.074744284,.03604327,.00452661,-.12865154,-.020020623,.06850602,-.18057181,.2093389,-.07333886,.28406742,-.048766967,.18114483,.47292945,-.2340266,-.06862712,.28263155,.3150323,-.054724697,-.16958356,.27928987,-.19666018,.03281329,.0038649621,-.07108877,.10791149,.15235375,-.3083721,.168294,.10379698,.029038485,.16282903,.04483725,-.018684763,.108186625,.027885616,-.019351846,.1623065,-.110499054,.31347123,.030852,.01631416,-.1466389,.080429435,-.18689284,.10667815,.20645237,-.18004708,-.10570413,-.15435064,-.019000605,-3126077e-12,.037761535,-.015040956,-.023364332,-.023399066,.2712722,.049637552,-.10222765,-.2698945,.20991959,.04921932,.21510898,-.0751939,-.19781734,-.28162366,-.041881047,.0065111094,-.04102195,.0982682,-.032176614,.019144032,-.08985387,.091637276,.1012352,.0003583357,.07897295,-.09531175,-.001155058,.074372366,-.026186578,.07283374,.06052053,.009307753,-.03874333,-.06228009,-.022224072,-.15717922,-.1406057,-.05941157,-.028769474,-.21226564,-.036570027,.22266355,.14120889,.014577123,.10216447,.018429281,.056729726,-.055834044,.058146577,-.11999068,.009995364,-.020045493,-.0057422677,.0643022,.016475432,-.030856136,.042140726,.15077904,-.32955253,.0694449,.17931722,.3439302,-.12484157,-.10958869,-.15755124,-.09755644,-.008314924,.07704758,.043228816,-.08110893,.099286236,-.053224478,.22877018,-.189486,-.00798416,.018341504,.10734141,.0752633,-.042524844,-.086395286,.14299925,.026488977,-.052531082,.19139186,.12205995,-.2573172,.15157184,.0073150825,.089774385,.06604469,-.16528498,-.002511137,.14287429,-.07819732,.025014274,.15338829,.0761692,-.02803716,-.21000335,.15277153,.08546171,.2816124,-.16559112,-.11068559,.47053605,-.009787771,-.0013089112,-.06985127,.44743782,.25142467,-.32670796,.044035822,-.12545367,-.2996084,-.11526387,.15654811,.099616654,.15473685,.21278231,.046207245,.117993094,-.26825273,-.12539764,.14013724,.17357737,-.05387817,.076738276,-.13339446,.15005626,-.2108176,-.0008846504,-.05998622,-.028892396,.04784136,.0104263965,.10899508,-.073364735,.077516064,-.074248806,-.21749993,-.26203,.041161157,.09366407,-.026498007,.0122177545,.03892727,.04349908,.13671173,.2242545,-.028021423,-.03802222,.0052366396,-.010709643,.031290106,.06291333,-.024909683,-.15439379,-.04502091,.2062182,-.5983536,-.09670497,-.38446042,-.008962513,.13044207,.04964221,.012250417,.012129821,.019985713,-.06421885,.009168735,-.044516414,.071368866,-.006634213,.06497366,.08578495,-.10586125,.06628038,-.14006054],bias:[.056541316,.041788545,-.036094554,-.021763096]},conv2d_3_tf1:{name:"conv2d_3_tf1",type:"conv",inputs:["conv2d_2_tf","conv2d_2_tf1"],output:"conv2d_3_tf1",weights:[.0647927,.053666476,-.14723225,.027874574,-.0003166473,.07337155,-.061972085,-.012667777,-.17071614,.091927536,-.051160213,.21336353,.13854574,.09582817,.032316446,.13838023,-.0398984,.108049214,.093780346,-.022015186,-.15188989,-.1381083,.2998843,.21623154,-.08862326,.025862623,.06895634,.13529755,.06957801,-.0011681129,.105972745,-.04722446,-.026321493,-.04828038,-.012545767,-.005490858,-.054038163,.075943105,-.11526662,.022242405,-.03543104,-.12451852,-.14911178,.013503498,.08773292,.09695139,-.013498657,-.27424073,.018575635,-.11321618,-.07853153,.04104883,.0018416744,.11579002,.03685964,-.031546146,-.1755398,.23517849,-.08095411,.031999595,-.18542038,-.26171613,-.20567231,-.05683613,.1538556,.21723682,.12131733,-.15308167,.103326,-.006956118,.043583486,-.23811384,-.103285454,.05543916,-.37894246,.32072112,.22651967,.03516268,.34612176,.23688535,.040021293,.0029912095,.04885362,.061496444,.016926387,-.118446946,.038948335,-.0934512,-.25194243,-.054018084,-.07149527,.017903058,.0845516,.33802906,.11953944,-.081294954,-.09558082,-.36974236,-.07524102,.11131445,.047626104,.12854609,-.10264962,-.044669047,-.05572307,.34475142,-.16806377,-.0037204176,.03400533,-.04047774,.024379745,.09056291,-.039392482,.2553437,.11705501,.03219211,.073977776,-.16610906,-.032796364,-.054669864,-.07123178,.00079619256,-.36920992,-.029054813,.12830003,.004987549,.08724278,-.029499404,.021272454,-.063295126,.011779576,.103093,-.011095461,.027948728,-.014605259,-.04723974,-.05334346,-.044831257,-.07296399,-.03314197,-.01687865,-.09261895,-.06128567,.092708185,.0077418387,.00871427,.060824487,.1093608,-.021077013,-.057341542,-.04769576,-.08144089,.0212823,-.06731425,-.04134463,-.0016761447,-.03402026,.036424547,.11689576,-.14946719,.18536687,.020073935,.17041959,.024790209,.08397728,-.13884324,.013950321,-.055075396,-.09317963,-.05723721,-.060491834,.0017911601,-.109154835,.010338362,-.1982491,-.21752335,.031852514,.031424347,.07817056,.07770759,.019805199,-.091223724,.11914662,.1673029,-.018734453,.16275099,.23245652,.36139074,-.1396047,-.14774057,.13756078,-.123794965,-.034937833,.20777488,.10104809,-.035140667,.2536575,.010970045,.16896339,-.081219964,-.062478427,-.0010431948,-.027980985,.11446318,-.127309,.21002083,.044436257,-.16986957,.06309646,-.042341243,.36642808,.18653205,.06973023,.06315932,-.323688,.25672218,.042820994,.13792914,-.12892757,-.09220378,-.18939693,.03862022,-.17376114,-.24673308,-.02130602,-.35428852,-.011634983,-39823462e-12,.110818714,-.2981158,.060209107,.012538829,-.0744833,-.050204318,-.12676497,-.031484153,-.28799182,.22338839,-.070876874,-.02102363,-.07929991,.014598492,.23034762,.024872296,.07480494,-.17139243,-.014421178,.056448363,-.028626937,-.022152562,.044871796,-.048653606,.009350802,.019022083,-.08554845,-.0922645,-.027405115,.1831188,.28516722,.19882526,.27299204,-.06910511,.03244419,-.0031333128,.061055277,-.114398144,.03729459,-.07840815,-.37776002,-.24129418,-.54815483,-.2702045,.053723935,.13472083,.09563273,.19009806,-.18722993,-.25939655,-.016197463,-.067061596,.1647598,.061905228,.06191816,-.018582113,-.07218153,.11278394,.05478068,-.104871586,.0036616288,-.045782693,-.226954,-.05043515,-.078096785,-.036197383,.09269631,.016823346,-.0060579977,-.041455746,.09032774,-.09217121,.058089796,.060311552,.033079024,.022586476,.0436363,-.079482526,.0027447809,.039558932,.13275702,6898711e-11,-.21961488,-.11315821,.0076181027,-.025279062,-.15829584,-.063141204,.062049046,.13117202,-.02435016,.109555416,-.010148116,.056620967,-.015910713,-.07370375,.1529919,.005792597,.02771225,-.17027487,.096740395,.063347995,.17823112,.054105148,.04995114,-.28613812,.06369567,.15978208,-.13688345,.16967694,-.061759472,.013682004,-.1290496,.07167547,-.065592445,-.17897636,.057080988,.035630587,.09140394,-.08695068,.16807681,.014749346,.07875138,.034913708,-.098915346,-.31459075,-.10892429,.1557498,-.19764107,-.26881596,-.03589311,.45288458,-.34171388,.12675741,.18415868,-.19770056,.29025507,-.15812592,.09685835,.0027761247,.06425249,-.01169722,.06379363,.053835012,-.07356561,-.06367294,.108630784,-.14137438,.08536725,-.03209748,.07250959,-.014214082,.07170588,-.25647813,.1092683,.18791042,-.023783233,.14261739,.102011986,-.03633555,-.05032627,.09378387,.11764051,.1353335,.032817088,-.1352964,-.00667997,-.13388929,.022861317,.0037358075,.018605746,-.0009892831,.22419162,-.23105696,-.09900454,-.15831396,.12398773,.097933106,-.13189293,.1330756,-.19673057,-.037342317,-.13462654,-.08974021,.030326528,-.0815862,-.118352115,.009187904,-.012130391,-.06408448,.13710785,-.06678414,-.09970725,-.14895032,-.02366641,.029581001,-.07101809,.09414698,.018300869,.009139046,-.0027311493,-.2359952,-.011602826,-.007582444,-.15473361,-.06868751,-.030721204,-.08650113,.071349874,-.08177769,.1611948,.18305337,-.0144878505,.10975452,-.026968453,-.04909913,-.059665974,.056036238,-.11623168,-.10584912,-.096973225,.054132458,-.010600018,.089397885,-.0031138035,.037452973,.041115325,.1924831,.14759748,.032560788,-.082884625,.0324635,-.083511285,-.050381303,.025589975,-.0981257,-.09183111,.034952193,-.048511654,.020719057,.1863456,.01902738,.14455654,-.008500172,.16385981,-.07806569,-.031216217,-.17002788,-.08882952,.07335293,-.2223089,.01706056,-.08361569,.046698716,-.016646344,.09351987,.0054158634,-.13641126,-.12396605,.011380122,.040951792,-.11222528,-.0031548145,-.0022303525,.0350846,-.03280425,-.09972476,-.113325305,-.19961461,-.27561286,-.12783135,-.062596925,.005870981,-.24796526,.18717633,-.16945636,-.076396205,-.08411448,.13751988,.21014418,-.008655945,-.09848541,-.14536901,-.2132181,.14118621,.20831147,-.020545695,.008340737,.016840864,-.16912372,-.121718146,.15108089,-.19803092,-.07827729,-.047639225,-.12277847,.04974115,-.09349339,-.2756667,-.19581003,-.0036992705,.16539848,.022026122,.07740234,-.035687633,-.004568715,.017408118,-.09757294,-.094941914,-.3381112,-.12724453,.025583982,-.18571027,.047607586,-.0704089,-.055323426,.13821335,.028168043,.09990671,-.032266147,-.067236245,.11512147,-.112986445,-.10818019,-.10062181,.21276556,.01681818,.069806606,.09628121,.06456379,.10394843,-.02343886,.041937463,.072631165,.045366894,-.0046993676,.03946691,.121010706,-.030089365,-.007266469,.0092267515,.14853416,-.033248078,-.027284347,-.10031526,.15864117,-.16782752,-.18466589],bias:[.07722432,-.025165567,.034291282,-.09902708]},conv2d_4_tf:{name:"conv2d_4_tf",type:"conv",inputs:["conv2d_3_tf","conv2d_3_tf1"],output:"conv2d_4_tf",weights:[-.004729794,-.0124398535,-.08538641,-.058604605,.008671952,.25604513,.020800482,.24144122,-.028920606,-.04705229,.030192787,.0010597534,.017666103,.0041322373,.20027764,.08919112,.0001626656,.05816014,-.0060765734,.08811165,.35835367,-.016291425,-.56892496,.083845764,.15026698,-.15916558,.08069463,-.3931291,-.0123534845,-.111639686,-.14637001,-.08171439,-.114976816,.023376396,.13855027,.07438716,-.069991484,.20377779,.23929878,-.040769435,.018832395,.005638609,-.091848075,.027843866,.023744943,-.06620523,-.11678267,.0844119,.0035854098,-.08432094,-.17799544,-.10041983,.25605857,.021009786,.030499447,-.09928291,.052178737,-.08286175,-.057888374,.024606042,.046342995,.13875343,.11279266,.19826262,-.016232021,-.21539623,.0936961,.021143785,.094262615,.049040064,.40978724,.15347758,.08884813,-.24887115,-.14756748,-.5020875,.112477,.1466549,-.33418837,.5769466,-.16832942,-.07354198,-.12081261,-.055348314,.39716053,.25583258,.09870877,.2151021,-.025700683,-.1801462,-.04616654,-.02782245,-.054461803,-.00042802413,-.00163228,-.004240747,-.05193433,-.0018198475,-.17647028,-.19462106,.1538165,.054894235,.12183955,.07340974,-.0019901982,.0357373,-.07597063,-.06681543,-.00090057997,-.053894397,-.010301875,-.16553953,-.30873474,-.2836045,.057037193,-.5016378,.11952749,.102353275,.2351629,-.14635189,-.019398788,-.08776502,.021669978,-.089918956,-.2187901,-.1180891,-.049789533,-.16109149,-.078335494,-.08867304,.03349591,-.1000293,-.20235832,.22917585,-.09905303,.08381748,.014350217,-.14478815,-.027479894,-.026432173,-.10309177,-.09860884,-.019177807,-.06963025,.008169383,.12532842,-.23369955,.077973194,.09076616,-.021277165,.1721421,-.26914293,-.014729218,-.023279984,-.057670787,.003598546,-.015225789,-.0115396585,-.26196182,-.10724508,.16542235,.06589374,.07410237,.26753154,-.3356288,.3096256,.07112498,-.0992165,.15020338,-.11021673,.18803611,.12918204,.109007336,-.031968266,.057093572,.035949256,.065006174,.031055925,.0390232,-.01678507,-.21553491,.14171642,-.19541772,-.033691674,-.06241631,.07497651,.024557155,.056778047,-.060191352,-.0261998,.07493729,-.0699132,-.008541382,.020270415,-.027760057,-.040962905,-.26732433,.34379438,-.23012447,.0051356517,-.04059567,.0972959,.039965224,-.14796777,-.0016924662,-.116963714,-.026353523,-.29799464,.03329303,-.12663862,-.0004959157,-.11162377,.26238343,.43260252,-.16504994,.10727678,-.22505566,.43474057,.43304008,.05143919,.40494493,.08689636,-.035733614,.25727916,.12175736,-.014467151,-.17461288,-.18480565,-.26439998,.307935,-.058916792,-.014292711,-.0569471,.10751278,-.04134206,.1847734,-.07519831,-.033909313,-.05001451,-.136606,.1424893,-.026820501,.19645774,-.0011315406,-.14680974,.07662838,.21108222,.13260938,.17923595,-.085527614,.08217639,.06579479,.05985784,-.09016323,.11172888,.111903176,.19842595,.0093640275,.10433465,.13341904,-.082806975,.22555825,-.1315717,.11907785,.24012424,.47776055,.1835734,.17483878,.079803735,.01155073,-.21146573,-.16484722,.15064004,.021381427,.18301587,.21225913,.054995645,.03212186,.052798916,-.048424408,.03609021,.0964704,-.059469886,-.05133066,-.08157349,.051145166,-.09107608,-.1362262,.090521574,-.014747857,-.081675015,-.118686825,.04848682,-.033071827,.008534588,.023765508,.16849907,-.21797262,-.17049783,-.07824179,-.033794608,.052612655,.095820345,-.07262317,.22816367,-.13772108,-.036353834,-.47638395,-.0530902,.14089061,.076203234,.18006112,.121814854,-.20750527,.08266107,-.28634354,.14301859,-.13458411,.00501663,-.039783802,-.103384845,-.14389835,.08275834,-.068423435,.22643796,-.02966374,-.2847584,.037081387,.02349005,-.19353923,-.00095957273,-.13623689,-.073120415,.03941467,.21864155,-.014019576,-.082576886,.17085212,.08971252,-.04213377,-.032548156,.022137715,.08399252,-.0011743539,-.09410863,-.41728264,-.20709297,-.18933547,.027059928,.09743364,.2504647,-.041173562,-.20924084,.291118,.029851688,.16953468,.02936709,.12213576,.22944322,.108747594,.0001881129,-.27398208,-.009702691,.15449248,-.9472944,-.26114875,-.28161275,-.3495961,-.12994622,-.2758638,-.1091727,-.0968308,-.14323105,.035175014,-.08023811,.006023802,-.031529594,-.1486306,-.3398172,-.23240276,-.29163983,.173475,.18809283,.22197202,.048254848,-.083444916,-.014334202,.060992356,-.023099286,-.09492961,.05592045,.0026059286,.08998117,-.108810075,-.053304546,.045926623,.068255246,.099023566,.01595483,.1336309,.21916585,.2837387,.14624594,.18843961,-.06747584,.054924384,-.082568415,.05011459,.014297759,-.3884833,-.054417178,-.18970548,.088336475,-.030646667,-.2980552,-.030035203,-.02748568,-.011897529,-.2370837,-.016740574,-.0282112,.050353892,-.10761107,-.00036999505,.037646662,-.17742962,.06489219,-.158852,-.08016933,.07808515,-.105895035,.079869986,-.0058994526,-.037170693,.2574696,.06199102,-.04497728,-.10667442,-.15183865,.0212881,-.030842574,.073473394,.010764398,-.00084518327,-.03893014,-.009649613,.07443129,.15108284,.11325495,-.096435815,-.097331434,-.049700152,-.17231967,.047090057,-.019111065,.104790315,-.15004838,.13950798,.055996202,-.070548095,.047154237,-.007650949,-.053611025,-.012242293,.12787002,-.04958212,.053988468,.0017896162,.049493514,-.009475431,-.0022641935,.03933694,-.005174597,.043754533,-.1432976,.037084177,-.04601288,-.032077815,-.059897035,.12584484,.019409029,.10492923,.268368,.12597778,-.17733063,-.0085961,-.27136415,-.049664587,.012515404,-.21444482,-.39275557,-.12297177,.06800057,.19228315,.06245887,.35772634,-.16317715,.2288402,-.23235172,.22230752,-.1646375,.13366091,.16681044,-.17399235,.33997267,-.3179832,-.34756508,.39843196,-.10748536,.322923,.23339489,.08684083,.02835275,.12314228,.24030593,.30856124,.055735108,-.044914473,.0031432225,.07469899,.1778018,.107083894,-.023706734,-.15501897,.0943098,-.034707237,-.18622099,.05257965,.042839274,.12597966,.08979042,-.0647561,-.050434645,.049438696,-.20008127,-.05572608,.046238814,.12622325,-.019017145,-.13960391,-.040050175,.14298008,-.20270552,.13391526,-.0073277587,.10606624,-.08940439,-.09656414,.12387374,-.0013147948,.23607181,-.00037969893,.050353236,-.17266603,.27796733,-.09877832,.02711225,.096394345,.07457944,.21541388,-.18612787,-.00027517386,-.17136407,-.06413671,.025629476,-.04570916,.0008431566,-.03419168,.08123608,.09465922,.11975521,.1269741,.08413221,.12125001,.04727287,.072378494],bias:[.04244928,-.014280219,.017129054,-.08807801]},conv2d_4_tf1:{name:"conv2d_4_tf1",type:"conv",inputs:["conv2d_3_tf","conv2d_3_tf1"],output:"conv2d_4_tf1",weights:[.01973856,-.05053795,.015545361,.10867395,.33441806,.14731607,.6793983,-.21394718,-.00846322,.09146322,-.07427475,-.078477465,-.090998545,.133366,.105515696,-.13784988,-.05404873,.09784018,-.1337389,-.18082313,.13461179,-.3816801,.12209786,.08176651,.10461896,-.43315184,.017470734,.20423968,-.03941875,-.101959296,-.09440259,.09154717,.17229515,-.06907825,-.008382803,-.16671611,-.01576541,.03985307,.08209482,-.11707446,-.11793074,.13702396,-.02013158,.07302033,-.022301994,-.11464677,.036753565,-.093276784,-.017650167,.009475923,-.17856382,.15925962,.06434641,-.15568036,.038135886,.18855911,-.04427734,.1878215,.10856261,.0041275816,-.12046199,.13610138,.3741596,-.12934728,-.24631616,.0169485,-.035534818,.37795424,-.08546174,.07817259,.42897213,-.47965595,-.0146556785,-.20510523,-.18889453,.06476019,.1021008,-.35398817,-.031071864,-.21416448,.32810766,.050585747,-.17658374,-.13881154,.16417882,-.21286008,-.106835455,-.1722344,-.14151084,.08962986,.057395387,-.01623662,.02570415,.15626897,-.12687978,.080729105,-.050597478,-.018753758,-.036346875,-.017908493,.058593344,.008303028,.05254987,-.06635018,-.022532012,.029511122,.026682215,-.054647952,.069466785,-.08892492,.025351115,-.023130694,.2412473,-.16138165,-.15117447,.11851003,-.096868426,.082690425,.27923304,.11590443,.19363573,-.15770023,-.066793665,.011681678,.14037277,-.112065665,-.048159517,.009453693,.1580054,-.0060506654,.05267837,-.09178131,-.09107123,.23191126,.21108283,-.070422985,.024321035,.06131459,.066626504,.032481454,.044402298,.1390604,-.14432502,.040869843,.10264861,.013504324,.012482852,-.1781206,-.12799414,-.27026084,-.123830505,.098105,-.039127555,.09367889,.122323096,.1416734,.044763107,-.21801683,-.14018978,.17646866,.017453065,.11498537,-.10998983,-.3116098,-.3099762,.5024706,.051817298,.03170681,-.18937826,.07946567,-.11978771,-.09523745,-.0033551592,-.11768945,.08932359,-.06689581,.1507582,-.013266159,-.073085934,-.07252967,-.06301927,-.13218755,.12984878,-.13678701,.023422396,.082123175,.006906731,-.004018426,-.15813835,.13711788,.016018609,.13443229,-.06960673,.16156524,-.1374069,-.05803206,-.077960715,-.10676749,.26282015,.03521529,.058099385,-.014738148,.0011174522,.24279532,-.023991548,-.108812414,-.08886019,.20584475,-.08043308,.063343,.055290066,-.15991378,-.08096304,-.23888679,.019161629,.38381267,.3672934,-.119608454,-.43623593,-.46014485,-.5323366,.1318621,.087373205,-.05535459,.20640239,-.1369444,-.21677823,.08202178,.10515278,.06810837,.073207974,.23623931,.102422275,-.05016664,-.0039228587,-.1810343,-.2235563,-.1246854,.1428113,-.10609135,-.031941894,-.08905056,.21501167,.11244667,-.011811734,.21630247,.07589472,-.040489636,-.11824066,-.11520391,-.10075633,-.035642453,.062144946,.0073282206,.14119269,-.060479023,-.29382935,-.056808118,.051812876,-.061358813,-.08344258,.124203674,.037964176,-.01961274,-951725e-9,.50005037,-.24176972,.06487161,-.15469861,.04336187,.17826353,.040010225,.02044482,-.0879271,-.01053958,-.31148303,.07497373,-.11548258,-.1666126,.02369657,-.058044076,.010801491,-.005933901,-.08910467,.007953008,.03761974,-.029501524,.16816042,.1779597,-.10213089,.29942423,-.016642543,-.015537001,-.04676146,.09585872,-.0055750017,-.014361908,-.20667697,-.11348746,.13081487,-.10437329,.14328459,.11648822,-.09163837,.019033967,-.12420627,-.07748253,.43203858,-.109799065,.07605535,.060791396,-.24517195,-.15674245,.21267459,.10665515,-.073150024,-.1358355,.0054066703,-.16434059,-.06031853,-.18834068,.26840356,-.12937617,.16103932,-.0062331813,-.13630053,-.013911821,.022389365,-.044232946,-.056454606,.022426741,.18010215,.041900013,.03375041,-.11376866,-.010313381,.12497669,-.31161824,.097568035,.19443443,-.05056519,-.0031457904,.1055554,-.083650924,.07630523,-.34177595,-.093093194,.20701368,-.030962149,-.054470222,-.23853977,.004326528,.34370202,.085750066,-.16071722,-.54335934,-.35595295,-.050744478,-.17405547,.008628697,-.007086256,.23164117,.340156,.5475976,-.15292351,.28019544,.038059216,.0044727,-.08231968,-.0052294536,.07451547,.22278999,-.3305531,.0017458396,.10818422,-.21325395,-.08807993,-.110342845,.10082142,-.051594347,.24192205,-.18042035,-.0095462985,-.08757798,.096379586,.021887815,-.05097233,-.06797989,-.026171045,.022944937,-.015915364,.037667938,.17216732,-.014889412,.07343887,.028236505,.0015047621,.1355103,-.09918284,-.07673695,-.25385055,.15163356,.0030003798,.18464413,.05611221,.099498056,-.07128191,.042955168,.027493173,.07440157,.07814497,.096160784,.13571084,.056412842,-.031997006,-.16073681,-.21634746,.025153082,-.064477116,.0005679147,-.0029436245,.12794618,.024849026,.03018052,.11723976,.059955597,-.013594654,.09091745,.04775348,.21260159,-.07463213,-.06727042,-.12166018,.024545137,.08611618,-.17627168,.09042604,-.14157623,-.22147785,.09100581,.11078359,.031410985,-.17170976,.09532806,-.059569277,.09392676,.11784347,-.21471368,.1483187,-.2217563,.12032977,.14932398,.27428308,-.04568031,.12670338,.09586169,.06700745,.005126449,.0027694793,-.033667028,.06447861,-.08585174,-.05509812,-.11358761,-.22750492,.032906335,-.029479047,.11580199,-.05812372,-.032269973,.05219915,.041658226,.010897959,.065550454,.0076911976,-.045743827,.11614996,-.10393113,-.0012606392,-.034367524,.09350742,.09561609,.3735968,.031685118,-.042026598,.17006761,-.3910107,.16984761,.25679177,.036610503,-.13772772,.11101589,-.1137049,.07211461,.18065079,-.12324793,-.020749722,.14413361,-.061903823,-.21550268,.31306142,-.11532895,.029482557,.03282164,-.09800627,-.20765196,.33030233,.075725295,.49252015,.042455837,-.07264194,-.10401895,-.22697076,-.15738785,.09740376,-.072098814,-.06638972,.12336611,.0073687397,.048267826,.06717852,-.027047804,-.123397194,.17829034,.04215185,.066311836,-.061742183,-.046373066,.041311592,.2813485,.055084586,-.01823069,.08105147,-.087944716,-.10135052,-.02653456,.063169874,-.1351186,.06722432,-.016406318,.08666922,.0555909,.12086502,-.17224412,.26026788,-.18303715,.029279215,-.12858874,.027197823,.0919464,.00849638,.10547888,-.12952055,-.14414985,.1903315,.05004528,-.12657289,.038008716,-.036606666,-.054025438,.069167465,.2699947,-.11137602,-.05888806,-.107324794,-.07598601,.06042177,.0064530694,-.039780665,-.076666445,-.00846108,-.06165907,-.06978219,-.19108103,-.040026028,-.120319635],bias:[-.14375664,-.0056876075,.052177623,.07152566]},conv2d_5_tf:{name:"conv2d_5_tf",type:"conv",inputs:["conv2d_4_tf","conv2d_4_tf1"],output:"conv2d_5_tf",weights:[-.15667982,-.31441393,.29112124,-.15737213,.022372838,.10690639,-.12019085,-.051941186,-.30367845,.02612279,.2372532,.2021648,-.20481086,-.003770439,.14981231,.066780254,.03270688,-.42270073,.044317324,.15907793,.14681059,-.2934784,.24933252,-.067273855,.07752533,-.23194817,.0686707,.08999225,.121678345,-.12916678,.012397381,.012315053,-.10090412,-.20792678,.11076032,-.02938975,-.1944187,-.2003259,.04438032,.36946484,-.019868722,-.15830222,.042811528,.015641417,.113098525,.080257006,.011135628,-.2877629,.15482685,.06579119,.28301102,.23729764,.15990537,.4529694,.107880585,.10668121,-.42430598,-.2631025,.10513542,-.036242936,-.09827965,-.0069260495,-.11689201,-.041436482,.08472191,-.13051608,.047930017,.36831668,.1164478,.21384816,.22062506,.2094167,.48668453,.32302913,.36268055,-.091801375,-.079141125,-.26613805,-.16608004,.03810683,-.13474251,-.04824603,.23303726,-.116136365,.0056330245,.15829784,.0012259148,.12648389,.038680512,.05131116,.024099711,.4555406,.0035716395,.11633299,.094744846,-.2457627,-.0576871,-.04037522,.16857862,.0031084458,-.027274646,-.18154246,.13337846,.035422433,-.0030749738,-.17288287,.019983152,-.31871706,-.03280405,.06825421,-.1563798,.05031885,-.066631876,.012560506,.1690693,-.018248236,.0450104,.016296914,-.14910112,-.16191053,.5078224,-.017615631,.15226597,-.13373777,.20148668,.060258996,.13215344,.18430072,.12976126,-.072738245,.053067926,.09752956,-.04716214,.04136464,.014162617,-.06621296,-.09617736,.057469178,.01280261,-.042976785,-.12570308,.006027807,.031038594,.06569918,-.12655424,-.41563693,-.030971345,-.06357555,-.14121394,-.15667427,.14398985,.05995984,.0821605,.12462943,.007492498,-.0030187522,-.22804567,-.10487421,.13180672,-.13978589,-.075991526,.12352044,-.17844258,.010614991,-.18293494,.25009897,-.080779895,.21548378,.22215544,.048670914,-.057372037,.078176,.17490411,.004919551,.059619516,.12660357,-.06282951,.10929357,.026720649,-.15939257,.17107709,-.04334904,-.03047162,-.101681694,.03118431,.19994627,.025729552,.035035726,-.0012207883,-.08618888,.061205562,.009940555,-.23581573,.08002133,-.15170844,.08872338,-.25767094,-.09273545,.18153891,.2544269,-.084598936,-.089766875,-.14610913,.002247754,.1802837,-.019625561,.30239686,-.032793984,.5223286,.10347663,.4000593,.25440502,-.07646958,-.31940606,.053407036,-.09356492,.2738851,.23945184,-.2907089,-.45822915,.13415676,.17187089,.08731114,-.27670014,.059273496,-.107137166,.12087539,.179237,-.021209063,-.02548005,.061256204,.033822674,.54491127,-.2475085,.08055858,-.4071213,-.045093834,.07161349,.08219979,-.31735933,-.29527053,.021469543,.07202354,-.07103959,.03990857,.2490762,-.19419849,-.13916986,-.05325315,.12922864,-.041463424,-.031249814,.073991664,-.09723187,.35132217,.024760868,.09606787,-.0951808,-.0059865676,-.052033573,-.3118038,.4432636,-.12943317,.09484738,.10621756,-.10550469,.11264014,.1402276,-.012679125,-.08809835,.029994955,-.15121669,.123397775,.048338536,-.00975707,-.103767075,-.041053303,-.07228534,.046792876,.0668788,.29554394,.012451002,.19568972,.112091154,.10882395,-.0995439,.051324263,.24967718,.2699648,.17300771,-.16056584,.1099392,.11674778,-.19811755,.111880325,-.06075038,-.095849104,-.04510651,-.04180761,-.0052786698,.11037549,-.24115366,.018509468,-.07819484,.10981622,.044488225,.050722387,-.3146652,-.0013019707,-.24084032,-.10475088,.026944289,.1592903,.33087498,.061839584,-.043863457,-.06904603,-.08635262,.088630445,-.15485142,-.06810522,.19927117,-.08130387,.11612667,-.015104349,-7738651e-11,-.06419643,-.14813533,.026650215,.015038833,.08161237,.058321163,.015005185,-.16189656,.024501886,.1927279,.31858218,.11962043,-.20560326,-.13190113,.02138715,-.057066392,-.085771754,-.124566585,.044749223,.13687828,.1195792,.14021616,.26204133,.05119197,-.13980037,.050747477,-.21238558,-.0734057,-.2036023,-.34308743,-.29370925,.2393742,-.37877437,.036869828,-.17053255,-.26900926,-.23330869,.32902205,-.4882585,.27430108,-.033711653,.15501487,.23487025,.085289046,-.14281847,.12543266,.15871634,-.13858907,.14810285,-.0239261,.1286852,.07754033,.01072327,-.14313328,.05480442,-.12195059,.11341822,.08224607,.19490337,.023521842,-.24548791,.0035114093,-.07937166,-.07674376,.08365873,-.003286068,.023862893,.009626835,.032829892,.0078141205,.053484406,-.08297165,.09303188,.004273738,-.0032906602,.13636959,.027821168,.06270053,.024775786,-.077529594,.03799126,.030000908,.031749167,.04360487,.004448846,-.17835903,-.30834544,.013150946,-.13758293,-.03296242,-.14166978,.034131095,.049779188,.09453289,-.011406557,-.07020709,-.0031981543,-.03443845,-.00010218944,.0855161,-.10951453,.042758763,.1718446,-.1577923,.0410027,-.04992991,.1219178,.105126485,-.041097324,-.08110963,-.04857337,-.11544925,-.14572923,.092435546,.091857366,.15425235,-.020324683,-.05764375,-.020458939,-.10527823,-.085554086,.16358297,-.12372687,-.009976829,.14252265,-.1321053,-.05965866,-.1393898,-.017603246,-.02714342,-.16824952,-.23083204,-.012299022,-.06689838,-.015830487,.21299921,-.11637202,.0074968333,-.01979935,-.182785,-.015397454,.14175794,-.011465284,.11285164,-.036115747,.07150463,-.083641894,-.10221778,-.13871445,.099696055,.04603662,-.06463785,-.007984529,-.0032940735,.072830334,-.057334073,.09086239,.13039105,.06350303,.17130788,-.2181585,-.09137403,-.31397742,-.019071499,-.017274613,.13762084,.10195637,-.021455176,.04011394,-.08029658,-.26982597,-.40265098,-.4151411,.038557775,-.095602125,.3503172,-.029988842,-.03484708,.095536314,-.0030311556,.31589827,.52763534,-.12629713,-.24356791,.0059487303,.42298427,.054166105,.18827972,-.081673265,-.06720384,.09375001,.22173035,-.14050071,.108400136,-.15553835,-.08716729,-.037366748,.10971073,-.02560103,-.26702073,-.05201882,.2432563,.16196893,.0889265,-.09887943,-.042956755,-.054403376,-.123823255,.045847844,.017027669,.00539936,-.112265736,.050549984,-.104931094,-.06883012,-.25745714,.11155538,-.15363649,-.22157209,.18200903,-.13290548,.026721261,-.06066069,-.18150693,.08768983,.037362453,-.1073367,-.070236765,-.41223463,-.168915,-.15517351,-.13949952,-.13307643,-.15935421,-.026589906,.0930502,.05195435,.06301585,-.01107014,-.019382332,.027223695,-.004045145,-.15238355,-.0345132,.06355168,.0011230056,.16690113,.0017829507,-.0023939044,-.09471834],bias:[.024455175,.01669877,-.066231176,.036848705]},conv2d_5_tf1:{name:"conv2d_5_tf1",type:"conv",inputs:["conv2d_4_tf","conv2d_4_tf1"],output:"conv2d_5_tf1",weights:[.01763509,-.17156707,-.06841296,-.026132878,-.10600523,.11245994,.121395074,-.09331501,.12764473,.0428028,-.11837395,.2092563,-.04357652,-.0490096,.024701532,.10518723,-.17130826,-.31987694,-.07639005,.21362033,.058639023,.066175915,-.25344703,-.07923442,-.14766373,.040518284,-.031103026,-.040075514,-.051108997,-.28214613,-.18504949,.27544948,.030991005,-.011353306,.15237464,.15458584,.1250524,.19959912,.14049476,.38410887,.07378578,-.017728366,.0963528,-.043756213,-.039577194,-.11800575,-.08392266,-.07599512,.022089608,-.027317125,.051330008,-.0075439885,.021650828,-.0009390209,-.12043464,.049332134,-.055557396,-.053297505,-.0918705,-.13089466,-.10994107,.072746456,.11496739,-.05225977,.29730305,.26317745,.052159555,-.32006654,.48288685,-.049926184,-.08091092,-.13825637,-.1485706,-.288657,-.41443697,.06856032,-.23809211,-.12953928,.4783034,-.47557938,.026139118,-.23031352,.04861487,.033556074,.2702056,.22802536,-.15385233,.1664119,.18749923,.36927548,-.011473684,-.11771165,-.16859052,-.4513202,.12863952,.02482837,.0073229345,-.061915245,.06710329,.0062416573,-.00555983,.14592186,.11201052,-.123630054,.32611257,-.11279885,-.059449438,.2891043,-.10519016,.040108994,-.012468261,.02083298,-.057483062,.08454755,-.15529329,-.12572923,.2600099,-.02319978,-.04037675,.11496361,.07728194,-.12908956,-.025529336,.112581626,.02971823,.11659056,-.01298622,.017061908,.22417091,-.00222947,.04980858,.12260437,-.025507605,.042577885,.120813504,-.048522256,-.038494784,-.0072195013,-.23012944,-.020850847,-.078296244,-.014830018,.19759563,-.10000253,-.032090195,.023757193,-.08989734,.14419042,.0112194475,-.093776144,-.020197887,.29295877,.06872183,.09511462,-.03245769,-.06504889,.05132126,.00399527,.075911656,.250893,-.3418496,.25525784,.0018161442,.028484365,-.17573346,-.12457501,.18466166,.20209278,.10282706,.16353399,.025052028,-.059714165,-.055806916,-.28651386,.112798095,.11624314,-.018793896,.07500149,-.01728254,-.1726998,-.13333,.09590344,-.036537904,-.11522523,.19445558,.22680458,.12061006,-.06225618,.1127748,.28380096,-.07099846,-.007440302,-.43887648,-.10018577,-.29267642,.12149727,-.14333835,.04161915,.19442867,.16506511,.09655387,-.0014398015,.13189743,-.14068556,.049408,.0829072,.2950336,.36965907,.41486958,-.023498302,-.37900022,-.31752598,.13758768,-.18782206,-.31358528,.3330786,-.4039293,-.06539036,.032599606,.10663507,-.26369813,-.17365438,.20723309,.1801556,.004117444,-.14894462,.14915143,-.047375835,-.2609916,-.10172324,-.14925237,-.33830285,.12131607,-.18156646,-.42382464,-.052582145,.2329045,-.4576963,.13756892,.055571318,-.31689477,.017058033,-.01904924,-.016893756,-.011479519,.07316262,-.07086077,.08923511,-.08190091,-.025866933,-.06909204,-.028601022,.023224542,.03082087,.2230426,-.16713654,.13457374,.110913865,-.1130815,-.031438913,-.55201167,.04831016,.25107765,-.014003224,.19532952,.02062346,.04839241,.088673405,.30325848,-.20222804,-.085780576,.22512968,.076354,.021940092,-.16170324,.0025543426,-.0032400405,-.0046705627,.06241069,-.031247333,.098353796,.03723474,.22971998,-.017877292,.119858086,.008041448,.2140585,.10343376,.08627595,.04532834,.027579082,-.16222088,.15583228,-.14371829,-.07243855,-.111895435,-.14438897,-.10250594,.0034202964,-.066547595,-.034390844,-.021545287,.014540157,-.10215731,.19720152,.21534947,.1130938,-.011730973,.013247983,-.10344174,-.1906514,-.015767017,-.020093633,-.26487067,-.005960781,-.057149183,.030110173,.047692046,-.19308545,-.25292158,.039498243,.053682897,-.01844695,-.017540915,.039454967,-.27696076,.09503274,-.038958035,.17321438,-.036311295,.03123055,.02310311,.040591653,.0054627894,-.03520426,-.026101988,.055991564,.06512919,-.12532505,.024075158,-.04926237,-.11701171,.026792146,.013033238,-.052847516,-.01550091,-.008442071,-.077945165,-.033220004,-.13678443,-.07040586,.121846326,-.19537796,-.016634773,.10707109,-.024361614,-.16002733,-.44066608,.16488662,.013152995,.22407806,.12854017,.19028598,-.08379244,-.05594235,-.15909895,.511962,.39027596,-.032652248,.06004893,.011166194,.102761306,-.035113614,-.29961765,-.013817978,.20938557,.08488225,-.1118558,-.0375328,-.035511103,.0046933405,.20203683,-.13552529,-.12685429,.03054923,.08224908,-.059128158,-.02583655,-.02133876,.0048713544,.10848829,.06324404,.028332822,-.011002306,-.027557913,-.06072362,.1019048,-.02587316,.08563405,-.08119947,-.10568117,.1075248,.19379964,-.14337265,.019374132,-.0907804,-.13827625,-.03628561,.014735499,-.026882607,-.25948793,.034926686,-.05988073,-.22735636,.053511668,.04765336,-.029848114,.09183966,.084713496,.09422864,.069713995,-.10584984,-.020899031,.059645247,-.075805016,-.01828552,.06689195,-.13804196,-.023465823,-.034038994,-.12946706,.058709413,.061918218,.038984764,.013660938,-.19340219,-.014949839,.12946278,.12725051,.13429146,.05993008,-.015394284,.011232483,.0344157,.022161875,-.023923954,.061736204,.025963215,.048136763,.03162042,-.01967249,.06374493,.034645267,.22403605,.036197048,-.06903216,-.1024706,-.0005459356,.049185563,.16309108,.07394778,.10351343,.28430694,-.13531347,-.14705071,-.09458433,.03063114,.07901115,-.11911086,-.06428132,-.013549552,-.041342866,-.20770676,-.15104479,.054365363,-.11652907,.05639815,.070518605,.0017846811,-.00056205114,.27148908,.07358356,.13644488,-.13824654,.0112991175,-.021521023,-.10197379,.007816017,-.13314332,.12318473,-.043214846,-.15759036,-.19744353,-.10267182,-.28249928,.11233295,-.096474804,.17893109,.014679829,-.21218887,-.24170275,.10603527,.05375366,-.059315052,.17087384,.13633691,-.37958893,.43264794,.17829923,.06485103,-.37551817,-.22082718,-.30536333,-.033212308,-.25232,.11730442,-.11176368,.26223183,-.049025323,-.01375941,-.29028055,.16842811,-.035684332,-.4180911,-.1611732,.07683385,-.14263596,.17508087,.23580009,.025621435,-.15757325,.008123166,-.021905439,-.02162503,-.059497356,-.01636353,.047654126,-.084423855,-.033733923,.0127116265,-.059593942,-.053935718,-.050729543,.013887048,-.19232626,.07915767,-.05909752,.007695347,.058876406,.057521783,-.080253534,.2011056,-.27965516,-.08033169,-.13025513,.12854645,.053400308,-.18445957,-.18463044,.27920377,-.061806213,-.020037206,.003183183,-.029844081,-.039553937,.028905323,-.11367984,-.097321615,-.10112643,.0039709485,-.06020118,-.23871279,-.077974856,.05806996,-.21440302,.11898043],bias:[-.023832673,.03702965,-.04749135,-.10982549]},conv2d_6_tf:{name:"conv2d_6_tf",type:"conv",inputs:["conv2d_5_tf","conv2d_5_tf1"],output:"conv2d_6_tf",weights:[.030931145,.013683292,-.0650242,-.028732346,.120067924,-.029404473,.0038229884,-.14631765,.041900825,-.076596744,-.11096378,-.27100095,.0052598766,-.05929686,-.06816563,-.086864315,-.043620087,-.16360405,.006527374,.15706524,.08338088,-.19027525,.22595987,-.054963548,.01825031,-.03149212,.025471251,.06429379,-.011633275,-.079389006,-.0030728737,.17345747,-.011275288,-.10668036,.05718997,.010336089,.33393976,-.2029354,.075444475,-.092244044,.07605498,.20125951,.10493973,-.12306946,.03658231,.08233366,-.12205888,-.116969004,-.0070305974,.105127215,.006041873,.26743913,.028119443,.14823505,-.28344348,.12362866,-.1215781,.08104382,.102011785,.085380934,.061244503,-.06230063,-.05353345,.1166729,.08945733,.4101902,-.06404005,.040728435,.13076581,-.20805469,-.10897316,-.14924604,.10090762,.015475414,.26346552,.12096677,-.20199244,.2780031,.18515368,.35105625,.07463155,.26932517,-.06768551,.10470878,-.1423996,.013550665,-.06167201,-.1022994,-.3107166,-.15609552,.1695213,-.1277181,.12582655,-.1596128,.015612055,-.19826376,.011745468,.006471601,.008110513,.025831396,.1272883,-.221959,.11993834,-.007903633,.009993582,-.10170755,.026594637,-.027883623,.030666083,-.036415886,.007469573,.0674783,-.022760388,-.10911659,-.012589904,-.046462692,.36987287,.71668935,-.04466556,.12082762,.0026539841,.07070946,-.00020439121,-.13925348,.08672072,.20075354,-.066352285,.14655356,-.081081845,-.21956222,.06781787,-.106362104,-.03016425,-.010460211,-.009725996,-.009805538,.07037355,.19254607,.038890257,.29580075,-.10355764,.12613009,.02485986,-.031927988,-.13882205,.21770848,.015392157,.010310204,.008225721,.07457836,.09984027,-.25452816,.2193511,-.22262146,-.12950355,.026151875,.022114651,-.030566849,.034688126,.03047327,.0363441,.19290726,-.1143055,.30871987,-.05780708,.082128406,-.115280904,.07636388,.48947453,-.29715258,.146737,-.3275992,-.055972476,-.09991753,.17435446,.10917291,.026389305,.054523308,-.028950177,.06913328,-.18626037,.08829993,.10407121,.001246911,.103938825,-.3117343,-.045564886,.07316613,.0027089121,.099437356,-.046500806,-.0927284,.051037624,-.2068234,.061572235,-.3345198,.16960172,-.30289862,-.002583443,.39312238,.08246557,.16374862,-.31902805,-.13205275,-.032050006,.01670186,.13852347,.120012194,-.67096996,-.06274476,.18575665,.80282855,.23201196,-.0054729837,.050396994,-.42014772,.34904522,.26281372,.24697208,.55475426,.49850988,-.06581312,-.0068906257,-.15741143,-.04252036,-.28224963,.009723064,.116357096,.2992567,-.26702902,-.05648925,.12729199,-.37574205,.54211813,-.25248805,-.13023548,.18903324,-.5182459,.0141203115,-.19444294,-.0017735233,-.010132458,-.040924776,-.13767008,.20757031,-.06509882,-.09756446,.018974079,.090851985,-.010158765,-.03999607,-.12055641,.03629025,-.018645551,-.05506811,-.014202848,.16203491,.011118734,-.18486023,-.024290733,-.3673846,-.20295864,.23055002,-.1555852,-.02706522,.03262891,.008724611,-.03760652,-.20946771,-.01951837,.16955496,.11690098,.0783421,.22656651,-.15715368,-.024174158,.020260733,.032390315,-.029133298,.086601086,.13871798,-.12525433,.16097449,.058946393,.029865682,.08508385,.040569812,-.09402932,-.05063873,.11269313,-.057484943,-.13579641,.047973365,-.07103839,-.07838756,-.0028928046,-.019466015,.018428024,.010016324,-.057396665,-.19495595,.034307264,-.022888038,.08112259,-.09790086,.10613111,.06611674,.19356097,-.00073371036,-.019078335,.076719105,-.016212497,-.3283475,-.07547389,-.08140701,.3185625,-.25060275,.16820994,-.123497784,.43272668,-.06365342,.11186735,-.17493224,-.04207358,.0003117533,.034089327,-3067692e-11,-.03422754,.16267666,.054771993,.048384454,-.041866794,.0036008756,.0021496525,.20258942,-.06297619,.03578836,.08763908,-.22370125,-.32465744,.019142643,.011316954,.17920344,.031633645,.03766343,-.116487674,-.05281752,-.018965483,.049297336,-.34511214,.42598158,.051361635,.26638633,-.33628765,.04437907,.09616201,-.020049393,.2560829,-.027108455,.255752,.3666511,.052277412,-.46667686,.48482272,.51302284,-.06941614,-.17967525,-.07889891,.18503937,.088710256,.2083147,-.20758459,-.036416974,.018303726,.03729963,-.035969947,-.2685231,-.42169708,-.039593916,-.02642618,.29050872,-.25723743,-.111259766,.15001127,-.026473878,-.07241443,.022400148,-.03214132,.0859297,-.0036677981,-.07039137,.03703108,.042322673,-.01222808,-.08151938,.033109214,-.048737407,.25929528,-.40535828,-.123594694,.10233285,.22455986,-.13368733,.033236265,-.052114893,-.11709317,.009709581,.19201641,-.02973698,.032114245,-.09771862,.085680574,.15827927,-.15042172,.21833214,-.13262676,-.08460587,-.09473209,.019323658,-.057233352,.0019434267,-.14437936,.034232683,.0030602294,-.023598112,.10692026,-.09960999,.005887181,.014738836,-.32473162,-.10886747,-.08365826,.10900178,.00080280803,-.14009437,-.053074867,-.07811151,-.03456029,-.104943685,.016918905,-.11335709,.079421654,.13481963,.037818357,-.027339859,.05856774,-.044562265,.03908084,.07628258,-.23815769,.2840278,-.3541637,-.044292126,-.09310441,-.1335055,-.031899665,-.11981227,.24012394,-.041896038,-.10168982,.20248915,-.10036763,-.044115108,.08520525,.07234102,-.119480744,-.01401321,-.025182616,-.031284854,-.050089385,.014808948,.038662236,-.18539418,.017342187,.023812262,.13428104,.020824855,-.07433546,.054307282,.08511016,-.11046813,-.04663274,.33497185,.023273284,-.24681108,.116665915,.12045893,.13306482,-.039098527,.04747061,.042796664,.053514794,.011861975,-.048702,.008408589,-.09497112,.34634927,.37973458,-.79267627,-.7362719,.35489878,-.07635863,.24082923,-.27480397,-.3236968,-.25523046,.05118527,-.040529836,-.6000509,.39020586,.27632973,.5141453,.16761221,-.033125393,.00561569,.083019435,-.101278506,.07810264,.12060661,.16048536,.14257826,-.15996903,.018831912,-.094429865,-.22227801,.426937,-.054677445,.05067348,.02233958,.02608942,-.045318656,.06509929,.035911568,.025316885,.0840986,.08326237,.048455603,-.13630742,.07230253,-.047261715,-.092630014,.04786565,.10354939,-.07094341,-.1463382,-.14900577,.2835977,-.106733374,-.11554754,-.168429,-.1411373,-.20654152,-.06388508,.039648015,.08543832,-.13253337,.017264463,-.06346233,-.10823598,.067361064,.04419582,.039152585,.06222691,.05757103,.012084537,.051425997,-.061130576,.16752882,.07497411,.13495837,-.15585983,-.02050144,-.08555421,-.09147339,.025115604,.05948922],bias:[.00590038,.03082865,.002111702,-.03330112]},conv2d_6_tf1:{name:"conv2d_6_tf1",type:"conv",inputs:["conv2d_5_tf","conv2d_5_tf1"],output:"conv2d_6_tf1",weights:[.009029573,.029218858,.029705316,-.019268971,-.0023235187,-.072589695,.1424836,.09049359,.04342995,.18134294,.018145641,.14789368,.050923645,.06524081,.036812488,.11108108,-.026506428,.016968496,.015961196,.010030791,-.3141888,-.06769598,-.23920257,-.031002127,-.07351358,-.19290134,-.24282931,-.18831016,-.0928966,.075177215,-.19699521,-.05810917,-.017991852,-.079427645,.035970494,-.017095685,-.27197137,-.20046075,.2616644,.021876303,-.077394076,-.04978692,.20363241,-.013741705,-.032103598,.14403099,.01442474,.048115995,-.16939245,-.001777,.026244136,-.14122388,-.056853324,.54357284,-.19769607,-.03187079,.04559263,-.16048127,.12830622,.1442168,.006611398,-.01618195,.012860053,-.16539487,.13116026,-.006161343,.7209969,.18338475,.3099777,.6500026,.3883795,-.021434233,.31667513,.008917659,.14124091,-.22335114,.12198921,-.16449445,.08773425,.30054978,-.10413989,-.10316161,.04342709,-.021252686,.120892406,.37798002,-.35963747,.021069285,.37587845,-.08159587,.011139747,.2501104,-.094568014,.037900843,-.025109999,-.030106556,.09680291,-.040868275,.051731605,.089064725,-.56098557,-.38148618,-.017037416,.08508287,-.019247344,.019857002,-.03512887,.031057188,-.09648583,-.04474188,.028748507,-.11880965,-.010236943,.04257042,-.08202597,-.004203426,-.26801527,-.11716526,-.017402772,-.05819106,-.13394608,.0234606,-.15404865,-.06801164,-.0047627664,-.1975249,.09420144,.23249897,.107361935,.07373787,.06242962,.05236332,-.028867323,.025924044,-.042526353,-.0015729597,-.1323144,-.4040712,.023919407,-.09535502,.049100045,.081110805,.08946112,.058505684,.13236825,-.04468476,-.04426802,.031087106,-.09093992,-.07470971,-.01591504,.05924266,-.21910913,.065537,-.18358919,-.02533145,-.1512009,-.04953928,.015540006,-.0043442883,-.14016777,-.1086958,.16316028,.050777458,.23148167,.04944809,-.10599886,-.10447021,-.40729257,-.10926556,.069055155,.110635415,.108922414,-.1716362,.10743909,-.102534756,.017795928,-.066930935,.09396082,.092585504,.14223933,.059458215,.072033696,-.04507726,-.19956456,.1251282,-.31733638,-.10465904,.08546377,.048638333,.031372465,-.08720661,.108719654,-.092161916,-.014724377,.20068261,-.24350016,.2113636,-.07483714,-.45665312,-.25134233,.2753893,-.11324696,-.04472,.1576102,-.045395147,.06013951,-.12507361,.546225,-.281897,.19477816,-.116612464,-.3145171,-.41660902,.333625,.35902345,.48333502,.4662005,.10222491,-.15314859,-.3036888,.22849742,.20740797,.41399437,.007284074,.0393942,-.31192186,-.15687793,-.289214,-.015956698,-.24718472,-.1637855,-.00765037,.26677555,.20215511,.37790874,-.22096673,.25287116,-.2446764,-.13610223,-.16734968,.16721225,-.053508647,-.041097626,.062356673,.07812319,-.263546,-.39739034,.003389846,.12676363,-.13175991,-.19019242,-.011847587,-.007580052,-.023946386,.046034034,-.17047611,.13298693,-.07506747,-.045542978,.33571973,.20192616,.30674616,.25668672,-.24134545,.031693842,-.009647641,.040534843,.03159419,-.1100516,.11371316,.06098735,-.05518961,.19402988,-.09646874,-.059196774,-.0073436056,-.1381309,.06868669,.061328378,-.1480867,-.15774113,-.022572191,.122521356,-.04067007,-.10145177,.13006335,-.099452734,.06962972,.07768411,.021085173,.108355984,-.03132525,.10220273,-.11626593,-.14104277,.018778645,-.024237925,.048783034,.09074447,.4120426,-.01948466,.073218934,.055681944,-.22553118,-.12923603,-.22068842,-.35037905,.005709937,-.09528472,.08718399,.13200706,.17220478,.096844435,-.30439013,-.14122063,.15733318,-.1014675,.33836862,.042193163,.15826897,-.034870047,.09295099,-.17674965,-.042326324,.06680338,-.074267656,-.0631393,-.11267909,-.19795708,.22005288,.35703793,.033995766,-.12663686,-.02449896,-.123250045,.021434195,.058398597,.04828315,-.0016824572,-.04291545,-.0744907,-.07698706,-.15937585,-.18852457,-.17966963,.023800725,.025979731,-.51412296,-.018316887,-.23076254,-.12298674,.16054317,-.0002730893,-.54173076,-.62443435,.04300197,-.08529622,.15392275,.15742144,.025834514,-.2800517,-.17600477,.0020806703,-.3010582,.45233512,.25595665,.103661336,-.024034392,-.43800178,.28606912,-.20908915,.078471914,-.030501373,-.059055753,.050494444,.063274644,-.025071034,.17561312,-.100698635,-.25631955,.039981876,-.18506624,.08366402,-.1413656,.03589635,-.020917566,.017598262,.020156413,-.018854238,.027228508,-.03806087,-.021715842,.071974196,-.040065665,.08459291,-.23530225,.16599682,-.2772327,.10041177,-.055056706,.1286236,-.11890451,-.1790546,.16517544,-.040448934,.12548013,.017075695,.07185459,-.13236302,.19354409,.12767012,.31120765,.16378082,-.036915366,-.19724306,-.02225051,.033263147,.003279449,.08826271,-.047833472,6574577e-11,.13721916,.04801998,-.014958419,.08791209,-.08076282,.024002168,-.18028922,.23835851,-.23309888,-.119310364,.044960875,.18821983,.027640678,.013462449,.19011214,.21559924,-.03329638,.07234414,.030880248,-.11273214,.102028474,.12203351,.035855662,.008828778,.007218363,-.012421797,-.09450626,.025191775,-.10738468,.16237053,.073676676,.12488881,-.048748355,.007877263,.3572506,-.07911043,.14684045,.0015310893,-.33411503,-.1151223,.004201752,.017775744,-.10607509,-.008143826,-.08448629,-.27557802,.0046665915,.008158659,.030826218,.020516023,.2333065,-.017463414,-.041772116,-.03027809,-.028166672,-.080471426,.048199337,.08341059,-.14640257,-.18334304,-.061674733,.0008892598,-.2374775,-.2721524,-.040371176,.26362613,.19872928,-.11246391,.0842288,.11188515,.0045209546,-.04250933,-.0738212,-.069005966,-.08760266,.4816288,-.21241407,.22734411,-.1783721,-.26842996,.099888,-.2867675,.085521065,-.3780281,-.018543908,-.039699722,.75688565,-.5333645,.47567275,.09518891,-.04072665,.05998423,-.48314768,-.29495844,.10358383,-.09816629,.028586809,-.047708735,.008320228,.04089551,-.18359782,-.27615002,.12414414,-.072417594,.25932562,.30268723,.14481631,.06484443,-.09898657,-.06553556,.25750044,-.07265585,.12903488,-.022347894,-.04693863,-.000107379274,.030295763,-.0325354,.086214684,-.021326948,.039682828,-.034843277,-.031971477,-.25145087,.03931631,.14262606,-.06044626,.22820354,-.10506207,.18064679,.0069641788,.01477993,-.003626875,.118767865,.109416224,-.002998205,.035680585,.07843882,.03375426,-.059815384,.11632834,-.12411481,.022583738,.02544465,-.054889992,-.07031964,-.10140042,.16750422,-.1448294,-.09316004,.035582513,-.026138382,-.031955894,.040148776],bias:[-.03573331,.032919675,.011109369,.008329268]},conv2d_last_tf:{name:"conv2d_last_tf",type:"conv",inputs:["conv2d_tf","conv2d_tf1","conv2d_1_tf","conv2d_1_tf1","conv2d_2_tf","conv2d_2_tf1","conv2d_3_tf","conv2d_3_tf1","conv2d_4_tf","conv2d_4_tf1","conv2d_5_tf","conv2d_5_tf1","conv2d_6_tf","conv2d_6_tf1"],output:"conv2d_last_tf",weights:[-.11498094,-.053904895,-.11520678,-.05479549,.028396055,.032767884,.052479446,.05257866,-.25706592,-.3454966,-.24713765,-.2854201,-.10287636,.0023146886,-.09190338,-.011193905,-.05461422,.008780496,-.07738697,-.032230727,-.047554165,-.025061952,-.051897213,-.009545297,-.14548294,-.15184018,-.01313442,-.015299784,-.0007883845,-.12866738,-.15260352,-.27081275,.11007706,.035344437,.11020841,.0425353,.1613199,.18417408,.09274313,.11943135,.106862,.079875536,.0937752,.068030775,.029093558,-.06441164,.06467169,-.021989612,.049548414,-.012455486,.07185561,.021865537,.020969186,-.03374196,-.024260623,-.07739141,.07164591,.12741035,.0379913,.076403245,.07049977,.0744538,.0062989634,.01818882,-.12511204,-.010836819,.13709816,.22472954,.21280868,-.006484726,.17554289,-.009977173,.078398876,.20698707,.13432744,.29740283,-.24750128,-.32757792,-.19807857,-.2537023,-.27207088,-.1385644,-.2166476,-.07687419,-.20300622,-.29678395,-.13135734,-.20851587,.0361364,.011243289,-.06845459,-.11796941,.11575868,.070215136,-.10295678,-.12281369,.13619795,-.0019436983,-.12701888,-.25933513,-.20134166,.00062823144,-.076756015,.11002947,.0059049693,-.18756741,-.0718802,-.2589954,.23413423,.30107784,.14445266,.18920745,.1494216,.0587532,.05478662,-.039123338,.23322394,.29950607,.24384268,.27843767,-.16094431,-.04705998,-.016345032,.028868208,-.102872886,-.04659664,.104105346,.14305067,-.001037014,.010001526,-.0052278573,.024779709,.06857274,.067640975,.085439384,.09242789,-.066597246,-.055928994,.0015658981,.016131008,-.03524695,-.018364554,-.047754433,-.014295886,-.042207,.02835915,-.1404656,-.08563323,-.030979915,-.0673764,.10733943,.057902794,.00022424995,-.0023634837,-.10778953,-.10202357,-.020368295,-.019088887,-.06875738,-.08504131,-.00043458896,.00045652856,-.02016843,-.020062413,-.08740103,-.042085808,-.10644177,-.09226477,.11212161,-.00048174805,.021872435,-.05868698,.0333954,.058184672,.05532576,.07621587,.054245148,.001020329,.09106849,.05303779,.009889632,.01309413,-.09187347,-.08618193,-.011621187,.016222361,.061095525,.060885344,.078050986,.0111776795,.08829944,.032022282,.01643529,.02285545,-.03498564,.00769657,-.0042474116,.015836312,-.025771018,-.0016368,-.008897948,-.012588166,-.01416411,-.003578984,.025991246,.021237152,.017450012,.025172485,.014568868,.017796224,-.036679734,-.03138748,.019457601,-.027607411,-.004529679,-.038048342,-.054055385,-.03876025,.041948095,.005869784,.02439633,.05177997,.016000897,.0057169925,-.03021866,.017678728,-.01371109,.013548159,-.0038099394,-.014066414,.028093752,.0027308422,-.010615999,.012673458,-.03028171,-.016818244,-.06530097,-.018845048,-.0072947564,-.0038243714,-.019006258,-.007847591,.03690709,.06714211,.0073993434,-.009766907,-.0021441753,-.01308625,.06658726,.06701995,-.027305668,-.016032105,-.028976806,-.0036668575,-.0027825525,.0105632655,.028945107,-.0014701135,.048950657,-.01923516,-.0014054152,.002650635,-.005300331,.004860559,.011158468,.005940625,-.012095051,.0041518128,-.020433836,-.025870577,-.0007547932,-.026509356,-.004545374,.04264545,.021741537,.029115127,.04225599,-.0055392785,.026570829,-.031795148,-.008307126,.020176455,.010904648,.017765503,-.10806103,-.01776947,.00070428237,-.06356262,-.05663172,.05908046,-.03837452,.06636983,-.007960516,-.06384041,.023125881,-.030108837,.0038054318,-.023263922,.020264054,-.0062937695,.031630237,.020909082,.03594235,.035879835,-.0050448794,.033650696,-.002830413,.035174295,-.024521282,.013054315,-.020833842,.037953895,.08249671,.024239466,-.012758333,-.027316988,.051040914,.0005025873,.039778862,.0024668393,.017232442,.022482058,.020233413,.024337437,.07986929,.06234036,.12662584,-.05271183,-.009718745,-.0046989853,-.0030333172,-.04034237,-.0113442,.022746231,-.035293855,-.009433693,.015766997,.013647276,-.029327558,.039106004,-.010398323,-.032851525,.02908329,-.003789618,.12963496,.010851003,.1126276,-.049255487,.06867432,.07970792,.017840397,-.026481882,-.058729574,-.07886952,.033267397,.02755372,-.0172006,.012404398,-.0230168,-.015059758,-.09239916,-.029533267,-.043251917,.0035152994,.022931995,.101714484,-.044946067,.094993,-.04708704,-.032475296,-.03228093,-.08810475,.013745045,.027828002,-.031922746,.022986397,-.061620213,-.03694645,-.055026993,.0031291894,-.028799903,-.0025357977,-.03441407,.0028600092,.058981724,-.10447273,-.088705614,.16546178,-.023549391,-.008831522,-.018411588,.029640056,-.068086684,-.05414636,-.029401174,.036180343,-.031988926,-.047249753,.008162177,.00548062,.05287462,-.030657746,.02821435,.037005343,.03534311,-.15614955,.07085459,-.11997641,-.009156166,-.021968868,-.054147746,-.07307657,-.006428544,-.017528288,.012614676,.037840024,-.021977803,.047799855,.02660416,-.07292106,.045195807,-.0056674764,.10824326,-.112114795,.1447127,-.0119616175,.0011661504,-.04553905,.13048342,.14574122,-.105522245,-.102792375,-.16397473,.15785863,-.06666504,-.01682913,.06070918,.070222184,.037701584,.026657054,-.0835267,-.009457008,.13232987,.13508691,-.056414206,-.06818828,.079076104,.032249212],bias:[-.10795144,-.09953324,-.055413827,-.03875493]},conv2d_last_tf1:{name:"conv2d_last_tf1",type:"conv",inputs:["conv2d_tf","conv2d_tf1","conv2d_1_tf","conv2d_1_tf1","conv2d_2_tf","conv2d_2_tf1","conv2d_3_tf","conv2d_3_tf1","conv2d_4_tf","conv2d_4_tf1","conv2d_5_tf","conv2d_5_tf1","conv2d_6_tf","conv2d_6_tf1"],output:"conv2d_last_tf1",weights:[.024905335,-.0020974763,.02695263,.00016802056,-.024053082,-.02133723,-.031614035,-.031826317,.120421864,.10555479,.08609448,.116875134,.046175968,.04224941,.059216674,.035143953,.059397914,.016519934,.07189327,.047407165,.04808963,.02792908,.057017103,.034324065,.14228246,.11275426,.088058695,.059600517,.02063494,.052596953,.047207687,.08789091,-.013453174,.008474715,-.017593835,.009218917,.070580654,.040542338,.08812338,.074653216,-.016356857,.015809007,-.008739107,.0097674895,-.018381525,-.007775341,-.040571664,-.011188163,-.026196122,-.034825727,-.042998232,-.033436514,-.01678153,-.004592797,-.010311677,.0008815291,-.08899181,-.10274026,-.066960976,-.082430154,-.057137426,-.07554528,-.030993424,-.050372377,.022921838,-.010479244,-.050794605,-.073633075,-.053708922,.009594084,-.071259,-.01054356,.005165821,-.08024963,-.049251772,-.09581235,.17995799,.09743011,.13533138,.11643848,.09727046,.07292666,.06820908,.041535784,-.0049705,.0048759184,-.035702795,-.015944308,-.010730028,.018847652,.06466244,.086318985,-.05661574,-.040698618,.010839972,.0027009705,-.04628466,.010060396,.02609333,.08664702,.057045907,.033591177,.02186063,-.024303377,.006569828,.08025825,.016128821,.10180713,-.12228169,-.112990454,-.078443415,-.09126021,-.12733299,-.087755,-.07374111,-.044979006,-.025347412,-.004083168,.023782173,.02900392,-.017815407,-.041119996,-.057978686,-.13521095,.08364004,.06950181,.023554614,.008043734,.009062775,-.003570175,-.007378757,-.0018487388,.01145638,.05217187,-.008250244,.008433307,-.056756936,-.044681005,-.08096105,-.08033185,-.023784965,-.01859799,.013042476,.021188647,-.0071619656,-.012498299,-.05144986,-.078112476,-.034992415,-.017038302,-.04464615,-.044504963,.024249,-.004297534,.03674578,.03090718,.04698553,.008344952,.057619847,-.0338724,-.011845145,-.0045043705,-16646482e-13,-.0038495932,-.01992515,.004827126,.019493148,.00862289,.10151322,.0021909082,.09940764,.03728846,.027824005,.04358071,.014909185,.036326095,.022513246,.028257169,.0102195935,.03301329,.052253865,-.0021944977,.08247392,.03256867,-.040685873,-.0052207555,-.0451257,-.054165114,.01647699,.0028809097,-.015233776,-.0008741886,.017371105,.01597189,-.052552313,-.008554715,-.0023150423,.006076517,-.012868931,.0039361073,-.007524978,-.004284313,-.021520883,-.010327569,.02543678,.008725823,-.0073885336,.005528395,.019192757,.016561812,.0027538154,.0013078215,.007916496,-.042525183,-.013173432,-.05265476,-.062195376,-.011255499,.020898128,.021532273,-.001524097,.034835674,-.004051403,-.0292426,-.049191684,-943322e-11,-.009106849,.012845289,-.019482708,-.011163468,.0034011535,-.007062845,-.006469714,.03177786,-.033006195,-.0006813464,-.053963087,.00085209147,.02734121,.034086403,-.03232248,-.004037002,-.010319106,.030889064,.019604538,.0020888883,.010277864,661223e-9,.057915937,.030683514,.00042533095,-.013019287,-.015896408,.0038484468,-.0042103594,.02174542,.032975145,.0011456647,.04913679,-.017063798,.0117176045,.007440557,.0020480808,.009415731,.027573857,.015140836,-.01679426,-.006124731,-.03206279,-.029842237,-.010428016,-.028513178,-.00506859,.055869613,.010164368,.027031485,.042289548,-.0054258504,.032214936,-.029970925,-.0058315448,.022889478,.01681123,.02985076,-.111186065,-.02202099,.0030994313,-.062343158,-.060951103,.06079555,-.0396464,.070911355,-.011480358,-.06803282,.01637355,-.043100975,-.00423709,-.028337711,.021635853,.0014857082,.030084312,.018155476,.043694943,.038795974,-.0060662925,.029721662,-.008117774,.034551267,-.024477571,.018841071,-.027095588,.034495078,.082398005,.008998768,-.016399248,-.043801688,.05936684,.006066549,.045399766,35319943e-12,.019259382,.02494012,.029301709,.028329274,.09122267,.06900443,.1412115,-.043169618,-.01627418,-.004989528,-.0042651827,-.04556752,-.023623291,.013007996,-.04483056,-.015727345,.016332543,.016384754,-.030676385,.045312885,-.0100853555,-.032632045,.031514473,-.0070776115,.13642761,.0023589598,.12214136,-.062155515,.08240989,.08894205,.03325406,-.016589595,-.06494277,-.08158925,.030425413,.019835634,-.012624623,.013942616,-.030527417,-.021668324,-.09444672,-.033064254,-.044167448,.0011024752,.03210801,.12662941,-.03912534,.1112649,-.04716062,-.03751481,-.031030515,-.09067383,.0077815712,.02169541,-.035285182,.02290573,-.0704085,-.03916127,-.058103334,.004915147,-.0333844,-.011548617,-.031151932,-.00043817286,.05976319,-.107285,-.097245865,.17706421,-.021453341,-.0047738464,-.017621001,.033400454,-.07225561,-.05599672,-.027600193,.038664024,-.03762786,-.052429967,.0104017975,.007116869,.06014114,-.029824806,.03209269,.04392036,.031300627,-.16249833,.06878509,-.12658615,-.012383169,-.025043553,-.06527381,-.08149099,-.014006842,-.018669648,.014510818,.042045828,-.023342922,.047104675,.029629575,-.082307704,.04035797,-.0013049254,.11085582,-.11031226,.14778149,-.016699014,-.00634342,-.055320874,.14306462,.15896587,-.110229075,-.1069649,-.17449625,.15787153,-.06711028,-.023110518,.06862914,.074063435,.042682912,.029800726,-.08768606,-.009814701,.14180017,.14780663,-.05672417,-.074305914,.07873489,.028458012],bias:[.06026231,.040204916,.037672628,.023496555]},conv2d_last_tf2:{name:"conv2d_last_tf2",type:"conv",inputs:["conv2d_tf","conv2d_tf1","conv2d_1_tf","conv2d_1_tf1","conv2d_2_tf","conv2d_2_tf1","conv2d_3_tf","conv2d_3_tf1","conv2d_4_tf","conv2d_4_tf1","conv2d_5_tf","conv2d_5_tf1","conv2d_6_tf","conv2d_6_tf1"],output:"conv2d_last_tf2",weights:[.1765669,.14268716,.19186598,.15799578,.016374417,.018578433,.0039475,.0046772263,.39840183,.36909792,.35409746,.37422222,-.108508386,-.1331279,-.10336035,-.14776541,-.057757027,-.14071062,-.025283009,-.09397916,-.09031894,-.14219165,-.08299535,-.13970287,-.12259208,-.14382727,-.22002274,-.25016093,-.048906635,.06620249,.016965045,.1295978,-.16748372,-.13718611,-.18565705,-.15029612,-.080749065,-.09955825,.032431383,.023855643,-.2748885,-.23232168,-.29121292,-.26405892,.16556135,.18657646,.1424068,.18855052,.10960496,.10851629,.095003806,.11053746,.09885307,.14437789,.13191165,.17365928,.16558935,.15473324,.21136154,.19976667,-.07267957,-.11469687,-.029134216,-.06817615,.10202856,.04216857,-.03959349,-.09849683,-.1576996,-.049997438,-.1579918,-.058789205,.029792828,-.07311781,-.045432188,-.11312683,.24257647,.16204113,.17869382,.16024388,.17193612,.12692013,.13177487,.0796725,.0797928,.08952722,-.012468046,.011071511,-.068559825,-.024852324,.0526428,.07917346,-.085534215,-.09591339,.04615827,.024577664,-.14653449,-.067267366,-.002524394,.086243175,.13660401,.08039592,.09179008,.022573143,-.024744196,.09120211,.017654825,.14114714,-.16093308,-.14538004,-.09950235,-.111152865,-.188637,-.12968326,-.1200479,-.06537649,-.12589337,-.106242515,-.02788782,-.025949068,.04948153,.02222735,-.025291357,-.12379292,.11074645,.11902375,-.00056989543,-.0024386419,.018286629,.0072215167,.00037828335,.0047001047,.011478272,.041745186,-.015742473,-.002282524,-.03440817,-.02196847,-.07838253,-.07993771,-.010155526,-.017590692,.027141469,.029741213,.016512005,.004950637,-.0238836,-.05587327,-.03164328,-.009499985,-.059880238,-.061794154,.023154303,-.013266373,.04701534,.0415862,.06357814,.033057794,.08389772,.00035060212,-.016403968,-.012538788,-.0015746636,-.004771009,-.021361275,-.009695242,.020548422,-.0024130535,.07796766,-.01516671,.09961382,.042754963,.017363647,.03729065,-.004795824,.01550197,-.0028093113,.011869523,-.02216933,.011177349,.033342455,-.021146454,.07830085,.032490104,-.03281833,.0060484232,-.04081057,-.04945058,-.0056189033,-.010636801,-.041949317,-.025739705,.012979897,.016758928,-.049062215,-.0035748442,.0085972,.0036381132,-.0055621094,.0041307937,-.0008907763,-.0034079372,-.025680453,-.015531803,.012816766,.009977763,-.016416566,.0034859509,.021753248,.016452711,.009833835,.0065052663,.0014061348,-.046160888,-.0132271005,-.05051269,-.05746351,-.0012690664,.017191738,.018192926,-.008879476,.026354216,-.012801991,-.029587373,-.04220692,-.0015560482,-.0019648245,.013402305,-.018259782,-.0036008905,.0035650074,-.0019178417,.00051580026,.027355857,-.017914988,.004937948,-.046335887,.00013612259,.030293299,.030688645,-.036683388,-.0031274238,-.026074665,.021684237,.022639066,.0022493738,.011508554,-.0006385944,.04890418,.020119468,.004167364,-.008356099,-.008598796,.0089028,-.0029575853,.016687104,.027207986,.0011099194,.042383645,-.015179333,.014744431,.006148344,.005165422,.0070196544,.030286826,.016620956,-.01611366,-.00667594,-.029524863,-.024751091,-.013321004,-.025199674,.0027477827,.054622147,.010154094,.025437292,.031773083,-.01055473,.022864206,-.029010754,-.0029999653,.025018329,.015316208,.027188798,-.10096525,-.017268656,.0012529213,-.062078856,-.053670805,.057336535,-.037418038,.06443577,-.016027879,-.058168363,.007034215,-.03390141,-.0019346164,-.027947908,.021723913,-.0018286633,.030507812,.018293543,.042917266,.033528328,-.004559579,.029667616,-.001870353,.0378995,-.017147437,.020192018,-.021574946,.031568103,.07487145,.0032376775,-.018893708,-.041981626,.054478757,.0061423797,.041280247,878061e-9,.017076394,.023647636,.029403262,.029923365,.08866472,.060613394,.1314274,-.04490231,-.016304834,-.0062647443,-.0031828512,-.03989252,-.024330825,.00741213,-.04075287,-.01615817,.017866978,.017720113,-.02846163,.040761847,-.0063438355,-.02347501,.029564403,-.0029562064,.12505588,-.0073986333,.11250363,-.06179967,.07854423,.08546533,.034743227,-.010757377,-.06416677,-.08344284,.030138884,.017635904,-.012087523,.014205202,-.03221233,-.023834767,-.091186255,-.028958676,-.04724334,.00013161585,.027391518,.1249978,-.045047652,.10737729,-.04326348,-.03543181,-.029558217,-.08582413,.007812453,.014296562,-.028779754,.018517692,-.063755795,-.036619596,-.050809663,.005431336,-.029205568,-.011827915,-.031110523,-.005648626,.05499293,-.10000709,-.0943537,.16143042,-.019952895,-.0039807972,-.014841254,.0320363,-.065173544,-.049425576,-.023904482,.03759679,-.03207411,-.047782745,.01352581,.008140566,.055923894,-.025134467,.029583648,.04096879,.027551858,-.14995384,.06467113,-.11633077,-.01563784,-.026909819,-.06292879,-.078409635,-.009081105,-.015533088,.019585673,.04334208,-.021717606,.042464726,.02743202,-.07388838,.03460472,.0038285658,.099842004,-.098247,.13276267,-.020793032,-.008603039,-.051913783,.12959045,.14735717,-.10888226,-.10263746,-.16819532,.141579,-.062480718,-.021918943,.06348125,.06849444,.03888676,.027375204,-.08194279,-.012574497,.13523251,.13739482,-.047547445,-.058767617,.07009549,.028136581],bias:[.069033325,.040207114,.027286075,.0065334598]},pixel_shuffle:{name:"pixel_shuffle",type:"pixel_shuffle",inputs:["conv2d_last_tf","conv2d_last_tf1","conv2d_last_tf2"],output:"canvas"}},cnn2xWeights={name,layers},_withScopeId$2=e=>(pushScopeId("data-v-a98a9be4"),e=e(),popScopeId(),e),_hoisted_1$a={class:"hero"},_hoisted_2$a={class:"video-container"},_hoisted_3$8=_withScopeId$2(()=>createBaseVNode("h2",{class:"hero-heading"},"Join the fun",-1)),_hoisted_4$7=_withScopeId$2(()=>createBaseVNode("p",{class:"hero-subheading"},"Jump in and jump jump test tetstsetstetstest.",-1)),_hoisted_5$6=_withScopeId$2(()=>createBaseVNode("button",{class:"btn btn-primary"},"Learn More",-1)),_sfc_main$c=defineComponent({__name:"Hero",setup(e){const t=ref(null),n=[vid1,vid2,vid3];let r=0,s=null;async function o(){const i=await WebSR.initWebGPU();if(!i)return console.log("Browser/device doesn't support WebGPU");s=document.createElement("video"),s.muted=!0,s.loop=!0,s.autoplay=!0,s.src=n[r];const a=t.value;a&&s&&(a.width=s.videoWidth*2,a.height=s.videoHeight*2,await new WebSR({source:s,network_name:"anime4k/cnn-2x-l",weights:cnn2xWeights,gpu:i,canvas:a}).start()),s.addEventListener("ended",async()=>{r=(r+1)%n.length,s.src=n[r],s.play()})}return onMounted(async()=>{await nextTick(),o()}),(i,a)=>(openBlock(),createElementBlock("div",_hoisted_1$a,[createBaseVNode("div",_hoisted_2$a,[createBaseVNode("canvas",{ref_key:"upscaledCanvas",ref:t,class:"upscaled-video"},null,512)]),_hoisted_3$8,_hoisted_4$7,_hoisted_5$6]))}}),_export_sfc=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Hero=_export_sfc(_sfc_main$c,[["__scopeId","data-v-a98a9be4"]]),_sfc_main$b={},_withScopeId$1=e=>(pushScopeId("data-v-c50ad380"),e=e(),popScopeId(),e),_hoisted_1$9={class:"header d-flex justify-space-between"},_hoisted_2$9=_withScopeId$1(()=>createBaseVNode("h1",null,"Welcome ",-1)),_hoisted_3$7=[_hoisted_2$9];function _sfc_render$1(e,t){return openBlock(),createElementBlock("header",_hoisted_1$9,_hoisted_3$7)}const Header=_export_sfc(_sfc_main$b,[["render",_sfc_render$1],["__scopeId","data-v-c50ad380"]]),_hoisted_1$8={class:"testimonials my-5"},_hoisted_2$8={class:"container"},_hoisted_3$6=createBaseVNode("h2",{class:"h3 mb-4 text-center"},"What Our Clients Say",-1),_hoisted_4$6={class:"row"},_hoisted_5$5={class:"card mb-3"},_hoisted_6$4={class:"card-body"},_hoisted_7$3={class:"blockquote mb-0"},_hoisted_8$2={class:"blockquote-footer"},_sfc_main$a=defineComponent({__name:"Testimonials",setup(e){const t=ref([{id:1,author:"John Doe",quote:"This company is amazing! They transformed our business."},{id:2,author:"Jane Smith",quote:"Highly professional team and outstanding service."}]);return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$8,[createBaseVNode("div",_hoisted_2$8,[_hoisted_3$6,createBaseVNode("div",_hoisted_4$6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,s=>(openBlock(),createElementBlock("div",{class:"col-md-6",key:s.id},[createBaseVNode("div",_hoisted_5$5,[createBaseVNode("div",_hoisted_6$4,[createBaseVNode("blockquote",_hoisted_7$3,[createBaseVNode("p",null,toDisplayString(s.quote),1),createBaseVNode("footer",_hoisted_8$2,toDisplayString(s.author),1)])])])]))),128))])])]))}}),_hoisted_1$7={class:"mb-3"},_hoisted_2$7=createBaseVNode("label",{for:"name",class:"form-label"},"Name",-1),_sfc_main$9=defineComponent({__name:"Services",setup(e){const t=ref({name:"",email:"",message:""});return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$7,[_hoisted_2$7,withDirectives(createBaseVNode("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":r[0]||(r[0]=s=>t.value.name=s),required:""},null,512),[[vModelText,t.value.name]])]))}}),_hoisted_1$6={class:"faq my-5"},_hoisted_2$6={class:"container"},_hoisted_3$5=createBaseVNode("h2",{class:"h3 mb-4 text-center"},"Frequently Asked Questions",-1),_hoisted_4$5={class:"accordion",id:"faqAccordion"},_hoisted_5$4=["id"],_hoisted_6$3=["data-bs-target","aria-expanded","aria-controls"],_hoisted_7$2=["id","aria-labelledby"],_hoisted_8$1={class:"accordion-body"},_sfc_main$8=defineComponent({__name:"FAQ",setup(e){const t=ref([{id:1,question:"How do I get started?",answer:"Simply contact us through our form, and we will guide you through the process."},{id:2,question:"What is the turnaround time for a project?",answer:"The timeline varies based on the project scope, but we always aim to deliver promptly."}]);return(n,r)=>(openBlock(),createElementBlock("div",_hoisted_1$6,[createBaseVNode("div",_hoisted_2$6,[_hoisted_3$5,createBaseVNode("div",_hoisted_4$5,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,(s,o)=>(openBlock(),createElementBlock("div",{class:"accordion-item",key:s.id},[createBaseVNode("h2",{class:"accordion-header",id:"heading"+s.id},[createBaseVNode("button",{class:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapse"+s.id,"aria-expanded":o===0?"true":"false","aria-controls":"collapse"+s.id},toDisplayString(s.question),9,_hoisted_6$3)],8,_hoisted_5$4),createBaseVNode("div",{id:"collapse"+s.id,class:normalizeClass(["accordion-collapse collapse",{show:o===0}]),"aria-labelledby":"heading"+s.id,"data-bs-parent":"#faqAccordion"},[createBaseVNode("div",_hoisted_8$1,toDisplayString(s.answer),1)],10,_hoisted_7$2)]))),128))])])]))}}),_sfc_main$7=defineComponent({__name:"Home",setup(e){return(t,n)=>(openBlock(),createElementBlock(Fragment,null,[createVNode(Header),createVNode(Hero),createVNode(_sfc_main$9),createVNode(_sfc_main$a),createVNode(_sfc_main$8)],64))}}),_sfc_main$6={},_hoisted_1$5={class:"container py-5"},_hoisted_2$5=createBaseVNode("h1",{class:"display-4"},"About Us",-1),_hoisted_3$4=createBaseVNode("p",{class:"lead"},"Learn more about our company.",-1),_hoisted_4$4=[_hoisted_2$5,_hoisted_3$4];function _sfc_render(e,t){return openBlock(),createElementBlock("div",_hoisted_1$5,_hoisted_4$4)}const Booking=_export_sfc(_sfc_main$6,[["render",_sfc_render]]),_hoisted_1$4=createBaseVNode("h2",{class:"h3 text-center mb-4"},"Our Services",-1),_hoisted_2$4={class:"row g-4"},_hoisted_3$3={class:"card h-100"},_hoisted_4$3={class:"card-body"},_hoisted_5$3={class:"card-title"},_hoisted_6$2={class:"card-text"},_sfc_main$5=defineComponent({__name:"Classes",setup(e){const t=ref([{id:1,title:"Web Design",description:"Creating stunning and responsive websites."},{id:2,title:"Digital Marketing",description:"Promoting your business online."},{id:3,title:"Branding",description:"Building your brand identity."}]);return(n,r)=>(openBlock(),createElementBlock("section",null,[_hoisted_1$4,createBaseVNode("div",_hoisted_2$4,[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,s=>(openBlock(),createElementBlock("div",{class:"col-md-4",key:s.id},[createBaseVNode("div",_hoisted_3$3,[createBaseVNode("div",_hoisted_4$3,[createBaseVNode("h5",_hoisted_5$3,toDisplayString(s.title),1),createBaseVNode("p",_hoisted_6$2,toDisplayString(s.description),1)])])]))),128))])]))}}),_hoisted_1$3={class:"mb-3"},_hoisted_2$3=createBaseVNode("label",{for:"name",class:"form-label"},"Name",-1),_hoisted_3$2={class:"mb-3"},_hoisted_4$2=createBaseVNode("label",{for:"email",class:"form-label"},"Email",-1),_hoisted_5$2={class:"mb-3"},_hoisted_6$1=createBaseVNode("label",{for:"message",class:"form-label"},"Message",-1),_hoisted_7$1=createBaseVNode("div",{class:"text-center"},[createBaseVNode("button",{type:"submit",class:"btn btn-primary"},"Send Message")],-1),_sfc_main$4=defineComponent({__name:"ContactForm",setup(e){const t=ref({name:"",email:"",message:""}),n=()=>{alert(`Message sent by: ${t.value.name}`),t.value={name:"",email:"",message:""}};return(r,s)=>(openBlock(),createElementBlock("form",{onSubmit:withModifiers(n,["prevent"]),class:"g-3"},[createBaseVNode("div",_hoisted_1$3,[_hoisted_2$3,withDirectives(createBaseVNode("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":s[0]||(s[0]=o=>t.value.name=o),required:""},null,512),[[vModelText,t.value.name]])]),createBaseVNode("div",_hoisted_3$2,[_hoisted_4$2,withDirectives(createBaseVNode("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":s[1]||(s[1]=o=>t.value.email=o),required:""},null,512),[[vModelText,t.value.email]])]),createBaseVNode("div",_hoisted_5$2,[_hoisted_6$1,withDirectives(createBaseVNode("textarea",{class:"form-control",id:"message",rows:"4","onUpdate:modelValue":s[2]||(s[2]=o=>t.value.message=o),required:""},null,512),[[vModelText,t.value.message]])]),_hoisted_7$1],32))}}),_hoisted_1$2={class:"container py-5"},_hoisted_2$2=createBaseVNode("h1",{class:"display-4"},"Contact Us",-1),_hoisted_3$1=createBaseVNode("p",{class:"lead"},"Get in touch with us for any inquiries or support.",-1),_hoisted_4$1={class:"row"},_hoisted_5$1={class:"col-lg-8 mx-auto"},_sfc_main$3=defineComponent({__name:"Contact",setup(e){return(t,n)=>(openBlock(),createElementBlock("div",_hoisted_1$2,[_hoisted_2$2,_hoisted_3$1,createBaseVNode("div",_hoisted_4$1,[createBaseVNode("div",_hoisted_5$1,[createVNode(_sfc_main$4)])])]))}}),routes=[{path:"/",component:_sfc_main$7,name:"home"},{path:"/booking",component:Booking,name:"booking"},{path:"/classes",component:_sfc_main$5,name:"classes"},{path:"/contact-us",component:_sfc_main$3,name:"contact"}],router=createRouter({history:createWebHistory("/OffTheFloor/"),routes}),_imports_0="/OffTheFloor/assets/transparent-logo-YF9JrUWX.png",_withScopeId=e=>(pushScopeId("data-v-16ef6944"),e=e(),popScopeId(),e),_hoisted_1$1={class:"navbar navbar-expand-lg navbar-dark bg-smoke border-bottom"},_hoisted_2$1={class:"container"},_hoisted_3=_withScopeId(()=>createBaseVNode("a",{class:"navbar-brand",href:"/"},[createBaseVNode("img",{src:_imports_0,class:"logo-img"})],-1)),_hoisted_4=_withScopeId(()=>createBaseVNode("span",{class:"navbar-toggler-icon"},null,-1)),_hoisted_5=[_hoisted_4],_hoisted_6={class:"navbar-nav mb-2 mb-lg-0"},_hoisted_7={class:"nav-item"},_hoisted_8={class:"nav-item"},_hoisted_9={class:"nav-item"},_hoisted_10={class:"nav-item"},_hoisted_11={class:"nav-item"},_hoisted_12=createStaticVNode('<div class="d-flex justify-content-center" data-v-16ef6944><div class="" data-v-16ef6944><button class="btn btn-outline-secondary d-lg-flex mb-2 mb-lg-0" data-v-16ef6944> BOOK YOUR SESSION </button><div class="icon-container d-flex" data-v-16ef6944><i class="fab fa-facebook-f me-2 fa-2x" data-v-16ef6944></i><i class="fab fa-instagram me-2 fa-2x" data-v-16ef6944></i><i class="fab fa-twitter fa-2x" data-v-16ef6944></i></div></div></div>',1),_sfc_main$2=defineComponent({__name:"Navbar",setup(e){const t=ref(!1),n=()=>{t.value=!t.value};return(r,s)=>{const o=resolveComponent("router-link"),i=resolveDirective("auto-animate");return openBlock(),createElementBlock("nav",_hoisted_1$1,[withDirectives((openBlock(),createElementBlock("div",_hoisted_2$1,[_hoisted_3,createBaseVNode("button",{class:"navbar-toggler",type:"button",onClick:n},_hoisted_5),createBaseVNode("div",{class:normalizeClass(["collapse navbar-collapse justify-content-center",{show:t.value}])},[withDirectives((openBlock(),createElementBlock("ul",_hoisted_6,[createBaseVNode("li",_hoisted_7,[createVNode(o,{class:"nav-link",to:"/"},{default:withCtx(()=>[createTextVNode("Home")]),_:1})]),createBaseVNode("li",_hoisted_8,[createVNode(o,{class:"nav-link",to:"/schedule"},{default:withCtx(()=>[createTextVNode("Schedule")]),_:1})]),createBaseVNode("li",_hoisted_9,[createVNode(o,{class:"nav-link",to:"/classes"},{default:withCtx(()=>[createTextVNode("Classes")]),_:1})]),createBaseVNode("li",_hoisted_10,[createVNode(o,{class:"nav-link",to:"/contact-us"},{default:withCtx(()=>[createTextVNode("Contact & Location")]),_:1})]),createBaseVNode("li",_hoisted_11,[createVNode(o,{class:"nav-link",to:"/contact"},{default:withCtx(()=>[createTextVNode("Updates")]),_:1})])])),[[i]]),_hoisted_12],2)])),[[i]])])}}}),Navbar=_export_sfc(_sfc_main$2,[["__scopeId","data-v-16ef6944"]]),_hoisted_1={class:"bg-primary text-white text-center py-3"},_hoisted_2={class:"container"},_sfc_main$1=defineComponent({__name:"Footer",setup(e){const t=new Date().getFullYear();return(n,r)=>(openBlock(),createElementBlock("footer",_hoisted_1,[createBaseVNode("div",_hoisted_2," © "+toDisplayString(unref(t))+" Name. All rights reserved. ",1)]))}}),_sfc_main=defineComponent({__name:"App",setup(e){const t=useRoute(),n=crypto.randomUUID();return onMounted(()=>{const{fullPath:r}=toRefs(t);console.log(r)}),(r,s)=>{const o=resolveComponent("router-view");return openBlock(),createElementBlock(Fragment,null,[createVNode(Navbar),(openBlock(),createBlock(o,{key:unref(n)})),createVNode(_sfc_main$1)],64)}}}),app=createApp(_sfc_main);app.use(router);initAutoAnimate(app);app.mount("#app");
