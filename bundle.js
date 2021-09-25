var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,l;function a(t,e){return s||(s=document.createElement("a")),s.href=e,t===s.href}function f(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(t){let e;return f(t,(t=>e=t))(),e}function $(t,e,n){t.$$.on_destroy.push(f(e,n))}function p(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function d(t,e,n){return t.set(n),e}function m(t,e){t.appendChild(e)}function g(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function w(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function b(t){return document.createTextNode(t)}function y(){return b(" ")}function x(){return b("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function j(t){return function(e){return e.preventDefault(),t.call(this,e)}}function M(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function N(t,e,n){t.classList[n?"add":"remove"](e)}function _(t){l=t}function S(){const t=function(){if(!l)throw new Error("Function called outside component initialization");return l}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function T(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const A=[],C=[],L=[],O=[],B=Promise.resolve();let Y=!1;function z(t){L.push(t)}let D=!1;const R=new Set;function q(){if(!D){D=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];_(e),P(e.$$)}for(_(null),A.length=0;C.length;)C.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];R.has(e)||(R.add(e),e())}L.length=0}while(A.length);for(;O.length;)O.pop()();Y=!1,D=!1,R.clear()}}function P(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}const W=new Set;let X;function F(){X={r:0,c:[],p:X}}function H(){X.r||r(X.c),X=X.p}function I(t,e){t&&t.i&&(W.delete(t),t.i(e))}function J(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),X.c.push((()=>{W.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const U="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function V(t,e){const n={},o={},r={$$scope:1};let c=t.length;for(;c--;){const i=t[c],s=e[c];if(s){for(const t in i)t in s||(o[t]=1);for(const t in s)r[t]||(n[t]=s[t],r[t]=1);t[c]=s}else for(const t in i)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function G(t){return"object"==typeof t&&null!==t?t:{}}function K(t){t&&t.c()}function Q(t,e,o,i){const{fragment:s,on_mount:l,on_destroy:a,after_update:f}=t.$$;s&&s.m(e,o),i||z((()=>{const e=l.map(n).filter(c);a?a.push(...e):r(e),t.$$.on_mount=[]})),f.forEach(z)}function Z(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function tt(t,e){-1===t.$$.dirty[0]&&(A.push(t),Y||(Y=!0,B.then(q)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function et(e,n,c,i,s,a,f,u=[-1]){const $=l;_(e);const p=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map($?$.$$.context:n.context||[]),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||$.$$.root};f&&f(p.root);let d=!1;if(p.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&s(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),d&&tt(e,t)),n})):[],p.update(),d=!0,r(p.before_update),p.fragment=!!i&&i(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(h)}else p.fragment&&p.fragment.c();n.intro&&I(e.$$.fragment),Q(e,n.target,n.anchor,n.customElement),q()}_($)}class nt{$destroy(){Z(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ot(t){let e,n;const o=t[1].default,r=function(t,e,n,o){if(t){const r=p(t,e,n,o);return t[0](r)}}(o,t,t[0],null);return{c(){e=v("section"),r&&r.c(),M(e,"class","desk svelte-cywknu")},m(t,o){g(t,e,o),r&&r.m(e,null),n=!0},p(t,[e]){r&&r.p&&(!n||1&e)&&function(t,e,n,o,r,c){if(r){const i=p(e,n,o,c);t.p(i,r)}}(r,o,t,t[0],n?function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(o,t[0],e,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[0]),null)},i(t){n||(I(r,t),n=!0)},o(t){J(r,t),n=!1},d(t){t&&h(e),r&&r.d(t)}}}function rt(t,e,n){let{$$slots:o={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,o]}class ct extends nt{constructor(t){super(),et(this,t,rt,ot,i,{})}}const it=[];function st(e,n=t){let o;const r=new Set;function c(t){if(i(e,t)&&(e=t,o)){const t=!it.length;for(const t of r)t[1](),it.push(t,e);if(t){for(let t=0;t<it.length;t+=2)it[t][0](it[t+1]);it.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(i,s=t){const l=[i,s];return r.add(l),1===r.size&&(o=n(c)||t),i(e),()=>{r.delete(l),0===r.size&&(o(),o=null)}}}}var lt={};const at=function(t,e){const n="undefined"!=typeof localStorage;function o(t,e){n&&localStorage.setItem(t,JSON.stringify(e))}if(!lt[t]){const r=st(e,(e=>{const o=n?localStorage.getItem(t):null;if(o&&e(JSON.parse(o)),n){const n=n=>{n.key===t&&e(n.newValue?JSON.parse(n.newValue):null)};return window.addEventListener("storage",n),()=>window.removeEventListener("storage",n)}})),{subscribe:c,set:i}=r;lt[t]={set(e){o(t,e),i(e)},update(e){const n=e(u(r));o(t,n),i(n)},subscribe:c}}return lt[t]}("positions",{"g10.jpg":{left:13.316485225505442,top:9.281740837696335,r:-18},"g07.jpg":{left:14.717389191290826,top:79.60078534031413,r:-34},"g09.jpg":{left:84.6605268273717,top:44.013416230366495,r:-1},"g08.jpg":{left:14.427002332814931,top:47.8321335078534,r:14},"g06.jpg":{left:9.503790824261275,top:65.48920157068063,r:-15},"g05.jpg":{left:12.887587480559876,top:26.618128272251308,r:24},"g04.jpg":{left:86.45873833592535,top:15.62009162303665,r:18},"g03.jpg":{left:85.15503499222396,top:39.90674083769633,r:2},"g02.jpg":{left:84.50743584758943,top:65.92277486910994,r:20},"g01.jpg":{left:85.59365279937792,top:83.4407722513089,r:-15}});function ft(e){let n,o,c,i,s;return{c(){n=v("img"),M(n,"role","button"),M(n,"class","button svelte-1hrgsci"),a(n.src,o=ut)||M(n,"src",o),M(n,"width",e[2]),M(n,"style",c=`left: ${e[0]}; top: ${e[1]}`),M(n,"alt",""),N(n,"pressed",e[5]||e[3]),N(n,"hit",e[4])},m(t,o){g(t,n,o),i||(s=[k(n,"click",e[8]),k(n,"touchstart",e[9]),k(n,"mousedown",e[6]),k(n,"mouseup",e[7]),k(n,"mouseout",e[7]),k(n,"blur",e[7]),k(n,"touchstart",e[6],{passive:!0}),k(n,"touchend",e[7],{passive:!0}),k(n,"dragstart",$t)],i=!0)},p(t,[e]){4&e&&M(n,"width",t[2]),3&e&&c!==(c=`left: ${t[0]}; top: ${t[1]}`)&&M(n,"style",c),40&e&&N(n,"pressed",t[5]||t[3]),16&e&&N(n,"hit",t[4])},i:t,o:t,d(t){t&&h(n),i=!1,r(s)}}}const ut="/nintenday/bp.png",$t=t=>t.preventDefault();function pt(t,e,n){const o=S();let{left:r}=e,{top:c}=e,{width:i="7.52%"}=e,{active:s=!1}=e,{hit:l=!1}=e,a=!1;return t.$$set=t=>{"left"in t&&n(0,r=t.left),"top"in t&&n(1,c=t.top),"width"in t&&n(2,i=t.width),"active"in t&&n(3,s=t.active),"hit"in t&&n(4,l=t.hit)},[r,c,i,s,l,a,()=>{n(5,a=!0),o("activate")},()=>{n(5,a=!1),o("deactivate")},function(e){T.call(this,t,e)},function(e){T.call(this,t,e)}]}class dt extends nt{constructor(t){super(),et(this,t,pt,ft,i,{left:0,top:1,width:2,active:3,hit:4})}}function mt(t){return new Promise(((e,n)=>{Object.assign(new Image,{src:t,onload:e,onerror:n})}))}const gt=Promise.all(["bp.png","c1.png","c2.png","c3.png","cl1.png","cl2.png","cl3.png","cl4.png","cr1.png","cr2.png","cr3.png","cr4.png","e.png","ebl.png","ebr.png","game.jpg","wbl.png","wbr.png","whlb.png","whlt.png","whrb.png","whrt.png"].map((t=>`/nintenday/${t}`)).map(mt)),ht=!0,wt=!1,vt=!0,bt=!1,yt=st(!1),xt=st(!1),kt=st([]),jt=st([]),Mt=st(vt),Et=st(ht),Nt=st(0),_t=st(0),St="g03.jpg",Tt=".game",At=document.createElement("style");document.head.appendChild(At);let Ct=!1;function Lt(t){let e,n,o,r,c,i,s,l,a,f,u;return n=new dt({props:{width:"31px",top:"29px",left:"-178px",active:t[0]>0}}),n.$on("touchstart",t[2]),n.$on("click",t[2]),r=new dt({props:{width:"31px",top:"28px",left:"146px",active:t[0]>3}}),r.$on("touchstart",t[5]),r.$on("click",t[5]),i=new dt({props:{width:"31px",top:"71px",left:"146px",active:t[0]>1}}),i.$on("touchstart",t[3]),i.$on("click",t[3]),l=new dt({props:{width:"31px",top:"73px",left:"-178px",active:t[0]>2}}),l.$on("touchstart",t[4]),l.$on("click",t[4]),{c(){e=y(),K(n.$$.fragment),o=y(),K(r.$$.fragment),c=y(),K(i.$$.fragment),s=y(),K(l.$$.fragment)},m($,p){g($,e,p),Q(n,$,p),g($,o,p),Q(r,$,p),g($,c,p),Q(i,$,p),g($,s,p),Q(l,$,p),a=!0,f||(u=k(document.body,"keydown",t[6]),f=!0)},p(t,[e]){const o={};1&e&&(o.active=t[0]>0),n.$set(o);const c={};1&e&&(c.active=t[0]>3),r.$set(c);const s={};1&e&&(s.active=t[0]>1),i.$set(s);const a={};1&e&&(a.active=t[0]>2),l.$set(a)},i(t){a||(I(n.$$.fragment,t),I(r.$$.fragment,t),I(i.$$.fragment,t),I(l.$$.fragment,t),a=!0)},o(t){J(n.$$.fragment,t),J(r.$$.fragment,t),J(i.$$.fragment,t),J(l.$$.fragment,t),a=!1},d(t){t&&h(e),Z(n,t),t&&h(o),Z(r,t),t&&h(c),Z(i,t),t&&h(s),Z(l,t),f=!1,u()}}}function Ot(t,e,n){let o;$(t,yt,(t=>n(1,o=t)));let r=0;return[r,o,()=>n(0,r=0===r||1===r?1:0),()=>n(0,r=1===r||2===r?2:0),()=>n(0,r=2===r||3===r?3:0),()=>{const t=r;n(0,r=3===r||4===r?4:0),4===r&&r!==t&&(gt.then((()=>{(()=>{if(Ct)return;Ct=!0;const t=document.querySelector(Tt),e=document.querySelector('[src="/nintenday/g03.jpg"]'),n=u(at)[St]?.r||0;e.style=`transform: translate(-50%, -50%) rotate(${-n}deg); transform-origin: center center`;const o=e.getBoundingClientRect();e.style=void 0;const r=t.getBoundingClientRect(),c=o.width/r.width,i=o.height/r.height,s=o.x-(r.x+(r.width-o.width)/2),l=o.y-(r.y+(r.height-o.height)/2),a=`@keyframes expand {\n  from { \n    transform: matrix(${c}, 0, 0, ${i}, ${s}, ${l}) rotate(${n}deg); transform-origin: center center; visibility: visible; z-index: 1;\n  }\n  to {\n    visibility: visible; z-index: 1;\n  }\n}`;At.innerHTML=`${a} .game {animation: expand 400ms ease-in; animation-fill-mode: forwards}`,new Promise((t=>{setTimeout((()=>{At.innerHTML="",Ct=!1,t()}),400)}))})(),d(yt,o=!0,o)})),setTimeout((()=>n(0,r=0)),500))},({key:t})=>{"Escape"===t&&d(yt,o=!1,o)}]}class Bt extends nt{constructor(t){super(),et(this,t,Ot,Lt,i,{})}}const{window:Yt}=U;function zt(t){let e,n,o,c,i,s,l,f=t[5]&&function(t){let e,n;return e=new Bt({}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}();return{c(){e=v("div"),n=v("img"),c=y(),f&&f.c(),a(n.src,o=t[6])||M(n,"src",o),M(n,"alt",""),M(n,"class","svelte-1krkwd9"),M(e,"class","console svelte-1krkwd9"),M(e,"data-type",t[0]),E(e,"left",(t[2][t[0]]?.left||0)+"%"),E(e,"top",(t[2][t[0]]?.top||0)+"%"),E(e,"transform","rotate("+(t[2][t[0]]?.r||0)+"deg) scale("+t[1]+")"),N(e,"hidden",t[3]&&t[5])},m(o,r){g(o,e,r),m(e,n),m(e,c),f&&f.m(e,null),i=!0,s||(l=[k(Yt,"resize",t[4]),k(e,"mousewheel",t[13]),k(e,"mousedown",j(t[10])),k(e,"mousemove",t[11]),k(e,"mouseup",t[12]),k(e,"mouseout",t[12]),k(e,"blur",t[12]),k(e,"touchstart",j(t[7])),k(e,"touchmove",j(t[9])),k(e,"touchend",t[8])],s=!0)},p(t,[n]){(!i||1&n)&&M(e,"data-type",t[0]),(!i||5&n)&&E(e,"left",(t[2][t[0]]?.left||0)+"%"),(!i||5&n)&&E(e,"top",(t[2][t[0]]?.top||0)+"%"),(!i||7&n)&&E(e,"transform","rotate("+(t[2][t[0]]?.r||0)+"deg) scale("+t[1]+")"),40&n&&N(e,"hidden",t[3]&&t[5])},i(t){i||(I(f),i=!0)},o(t){J(f),i=!1},d(t){t&&h(e),f&&f.d(),s=!1,r(l)}}}function Dt(t,e,n){let o,r;$(t,at,(t=>n(2,o=t))),$(t,yt,(t=>n(3,r=t)));let c,{filename:i}=e;const s=()=>{window.innerWidth>=768?n(1,c=1):n(1,c=window.innerWidth/768)};s();const l="g03.jpg"===i,a=`/nintenday/${i}`,f=t=>Math.max(0,Math.min(100,t)),u=(t,e,n)=>{if(r)return;const c={};if(void 0!==t&&void 0!==e){const{clientWidth:n,clientHeight:o}=document.body;Object.assign(c,{left:f(t/n*100),top:f(e/o*100)})}void 0!==n&&(c.r=((Object(o[i]).r||0)+n)%360),d(at,o={...o,[i]:{...Object(o[i]),...c}},o)},{onTouchStart:p,onTouchEnd:m,onTouchMove:g}=(t=>{let e=null,n=null,o=null,r=null;return{onTouchStart:({currentTarget:t,touches:[{clientX:c,clientY:i},s]})=>{const{x:l,y:a}=t.getBoundingClientRect();e=c-l,n=i-a,o=i,r=s?.clientY},onTouchMove:({target:c,touches:[{clientX:i,clientY:s,target:l},a]})=>{if(c===l){if(o&&r&&a&&l===a.target){const e=o-s,n=r-a.clientY;t(void 0,void 0,Math.ceil(Math.abs(e-n)/2)*Math.sign(a.clientX>i?e:n))}else t(i-e,s-n);o=s,r=a?.clientY}},onTouchEnd:()=>{e=null,n=null,o=null,r=null}}})(u),{onMouseDown:h,onMouseMove:w,onMouseUp:v,onMouseWheel:b}=(t=>{let e=null,n=null;return{onMouseDown:({currentTarget:t,clientX:o,clientY:r})=>{const{x:c,y:i}=t.getBoundingClientRect();e=o-c,n=r-i},onMouseMove:({clientX:o,clientY:r})=>{null!==e&&null!==n&&t(o-e,r-n)},onMouseUp:()=>{e=null,n=null},onMouseWheel:({deltaY:e})=>{t(void 0,void 0,Math.sign(e))}}})(u);return t.$$set=t=>{"filename"in t&&n(0,i=t.filename)},[i,c,o,r,s,l,a,p,m,g,h,w,v,b]}class Rt extends nt{constructor(t){super(),et(this,t,Dt,zt,i,{filename:0})}}function qt(t){let e,n,o,c,i,s,l,a,f,u,$;return n=new dt({props:{left:"7.67%",top:"61.98%",active:t[0],hit:!0}}),n.$on("activate",t[8]),c=new dt({props:{left:"84.65%",top:"61.59%",active:t[1],hit:!0}}),c.$on("activate",t[9]),s=new dt({props:{left:"84.51%",top:"78.95%",active:t[2],hit:!0}}),s.$on("activate",t[10]),a=new dt({props:{left:"7.68%",top:"79.65%",active:t[3],hit:!0}}),a.$on("activate",t[11]),{c(){e=y(),K(n.$$.fragment),o=y(),K(c.$$.fragment),i=y(),K(s.$$.fragment),l=y(),K(a.$$.fragment)},m(r,p){g(r,e,p),Q(n,r,p),g(r,o,p),Q(c,r,p),g(r,i,p),Q(s,r,p),g(r,l,p),Q(a,r,p),f=!0,u||($=[k(document.body,"keydown",t[6]),k(document.body,"keydown",t[7])],u=!0)},p(t,[e]){const o={};1&e&&(o.active=t[0]),n.$set(o);const r={};2&e&&(r.active=t[1]),c.$set(r);const i={};4&e&&(i.active=t[2]),s.$set(i);const l={};8&e&&(l.active=t[3]),a.$set(l)},i(t){f||(I(n.$$.fragment,t),I(c.$$.fragment,t),I(s.$$.fragment,t),I(a.$$.fragment,t),f=!0)},o(t){J(n.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),J(a.$$.fragment,t),f=!1},d(t){t&&h(e),Z(n,t),t&&h(o),Z(c,t),t&&h(i),Z(s,t),t&&h(l),Z(a,t),u=!1,r($)}}}function Pt(t,e,n){let o,r;$(t,Mt,(t=>n(4,o=t))),$(t,Et,(t=>n(5,r=t)));let c=!1,i=!1,s=!1,l=!1;return[c,i,s,l,o,r,({key:t,code:e})=>{switch(t){case"ArrowUp":case"w":case"ц":d(Et,r=ht,r),o===vt&&n(0,c=!0),o===bt&&n(1,i=!0);break;case"ArrowRight":case"d":case"в":d(Mt,o=bt,o),r===ht&&n(1,i=!0),r===wt&&n(2,s=!0);break;case"ArrowDown":case"s":case"ы":d(Et,r=wt,r),o===vt&&n(3,l=!0),o===bt&&n(2,s=!0);break;case"ArrowLeft":case"a":case"ф":d(Mt,o=vt,o),r===ht&&n(0,c=!0),r===wt&&n(3,l=!0);break;case"Control":case"Shift":switch(e){case"ShiftLeft":d(Et,r=ht,r),d(Mt,o=vt,o),n(0,c=!0);break;case"ShiftRight":d(Et,r=ht,r),d(Mt,o=bt,o),n(1,i=!0);break;case"ControlRight":d(Et,r=wt,r),d(Mt,o=bt,o),n(2,s=!0);break;case"ControlLeft":d(Et,r=wt,r),d(Mt,o=vt,o),n(3,l=!0)}}},()=>{n(0,c=!1),n(1,i=!1),n(2,s=!1),n(3,l=!1)},()=>{d(Mt,o=vt,o),d(Et,r=ht,r)},()=>{d(Mt,o=bt,o),d(Et,r=ht,r)},()=>{d(Mt,o=bt,o),d(Et,r=wt,r)},()=>{d(Mt,o=vt,o),d(Et,r=wt,r)}]}class Wt extends nt{constructor(t){super(),et(this,t,Pt,qt,i,{})}}function Xt(e){let n,o,r;return{c(){n=v("img"),M(n,"class","sprite svelte-4gxohw"),a(n.src,o=e[5])||M(n,"src",o),M(n,"width",e[0]),M(n,"style",r=`left: ${e[1]}; top: ${e[2]}${e[4]?`; transform: rotate(${e[4]}deg)`:""}`),M(n,"alt",""),N(n,"active",e[3])},m(t,e){g(t,n,e)},p(t,[e]){1&e&&M(n,"width",t[0]),22&e&&r!==(r=`left: ${t[1]}; top: ${t[2]}${t[4]?`; transform: rotate(${t[4]}deg)`:""}`)&&M(n,"style",r),8&e&&N(n,"active",t[3])},i:t,o:t,d(t){t&&h(n)}}}function Ft(t,e,n){let{name:o}=e,{width:r}=e,{left:c}=e,{top:i}=e,{active:s=!1}=e,{rotate:l=0}=e;const a=`/nintenday/${o}.png`;return t.$$set=t=>{"name"in t&&n(6,o=t.name),"width"in t&&n(0,r=t.width),"left"in t&&n(1,c=t.left),"top"in t&&n(2,i=t.top),"active"in t&&n(3,s=t.active),"rotate"in t&&n(4,l=t.rotate)},[r,c,i,s,l,a,o]}class Ht extends nt{constructor(t){super(),et(this,t,Ft,Xt,i,{name:6,width:0,left:1,top:2,active:3,rotate:4})}}function It(t){let n,o;const r=[{name:"e"},t[2][t[0]][t[1]],{active:!0}];let c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return n=new Ht({props:c}),{c(){K(n.$$.fragment)},m(t,e){Q(n,t,e),o=!0},p(t,[e]){const o=7&e?V(r,[r[0],G(t[2][t[0]][t[1]]),r[2]]):{};n.$set(o)},i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){J(n.$$.fragment,t),o=!1},d(t){Z(n,t)}}}function Jt(t,e,n){let{d:o}=e,{s:r}=e;return t.$$set=t=>{"d"in t&&n(0,o=t.d),"s"in t&&n(1,r=t.s)},[o,r,[[{width:"1.7%",left:"29.7%",top:"40.0%",rotate:"33"},{width:"1.7%",left:"31.3%",top:"41.6%",rotate:"95"},{width:"1.5%",left:"33.0%",top:"43.8%"},{width:"1.6%",left:"34.5%",top:"44.8%",rotate:"-124"},{width:"1.7%",left:"35.9%",top:"47.2%",rotate:"-53"}],[{width:"1.6%",left:"69.5%",top:"39.6%",rotate:"21"},{width:"1.6%",left:"67.8%",top:"41.0%",rotate:"5"},{width:"1.5%",left:"66.0%",top:"43.1%",rotate:"-40"},{width:"1.8%",left:"64.1%",top:"44.5%",rotate:"-105"},{width:"1.6%",left:"62.7%",top:"47.3%",rotate:"-169"}],[{width:"1.7%",left:"69.2%",top:"51.4%",rotate:"-144"},{width:"1.5%",left:"67.6%",top:"53.7%",rotate:"-185"},{width:"1.7%",left:"65.9%",top:"54.9%",rotate:"110"},{width:"1.6%",left:"64.1%",top:"56.7%",rotate:"48"},{width:"1.6%",left:"62.5%",top:"59.2%",rotate:"-32"}],[{width:"1.7%",left:"29.3%",top:"51.6%",rotate:"-15"},{width:"1.6%",left:"31.0%",top:"53.3%",rotate:"36"},{width:"1.7%",left:"32.8%",top:"54.8%",rotate:"66"},{width:"1.6%",left:"34.5%",top:"56.6%",rotate:"171"},{width:"1.7%",left:"35.9%",top:"58.6%",rotate:"-123"}]]]}class Ut extends nt{constructor(t){super(),et(this,t,Jt,It,i,{d:0,s:1})}}function Vt(t){let e,n,o,r,c,i,s,l;return e=new Ht({props:{name:"whlt",width:"7.7%",left:"36.8%",top:"44.9%",active:t[0]===vt&&t[1]===ht}}),o=new Ht({props:{name:"whrt",width:"6.7%",left:"57.0%",top:"46.8%",active:t[0]===bt&&t[1]===ht}}),c=new Ht({props:{name:"whrb",width:"7.4%",left:"56.1%",top:"58.1%",active:t[0]===bt&&t[1]===wt}}),s=new Ht({props:{name:"whlb",width:"8.6%",left:"36.1%",top:"57%",active:t[0]===vt&&t[1]===wt}}),{c(){K(e.$$.fragment),n=y(),K(o.$$.fragment),r=y(),K(c.$$.fragment),i=y(),K(s.$$.fragment)},m(t,a){Q(e,t,a),g(t,n,a),Q(o,t,a),g(t,r,a),Q(c,t,a),g(t,i,a),Q(s,t,a),l=!0},p(t,[n]){const r={};3&n&&(r.active=t[0]===vt&&t[1]===ht),e.$set(r);const i={};3&n&&(i.active=t[0]===bt&&t[1]===ht),o.$set(i);const l={};3&n&&(l.active=t[0]===bt&&t[1]===wt),c.$set(l);const a={};3&n&&(a.active=t[0]===vt&&t[1]===wt),s.$set(a)},i(t){l||(I(e.$$.fragment,t),I(o.$$.fragment,t),I(c.$$.fragment,t),I(s.$$.fragment,t),l=!0)},o(t){J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),l=!1},d(t){Z(e,t),t&&h(n),Z(o,t),t&&h(r),Z(c,t),t&&h(i),Z(s,t)}}}function Gt(t,e,n){let o,r;return $(t,Mt,(t=>n(0,o=t))),$(t,Et,(t=>n(1,r=t))),[o,r]}class Kt extends nt{constructor(t){super(),et(this,t,Gt,Vt,i,{})}}function Qt(t){let e,n,o,r;return e=new Ht({props:{name:"wbl",width:"9.3%",left:"41.8%",top:"45.2%",active:t[0]===vt}}),o=new Ht({props:{name:"wbr",width:"8.5%",left:"49.8%",top:"45.5%",active:t[0]===bt}}),{c(){K(e.$$.fragment),n=y(),K(o.$$.fragment)},m(t,c){Q(e,t,c),g(t,n,c),Q(o,t,c),r=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]===vt),e.$set(r);const c={};1&n&&(c.active=t[0]===bt),o.$set(c)},i(t){r||(I(e.$$.fragment,t),I(o.$$.fragment,t),r=!0)},o(t){J(e.$$.fragment,t),J(o.$$.fragment,t),r=!1},d(t){Z(e,t),t&&h(n),Z(o,t)}}}function Zt(t,e,n){let o;return $(t,Mt,(t=>n(0,o=t))),[o]}class te extends nt{constructor(t){super(),et(this,t,Zt,Qt,i,{})}}function ee(e){let n,o;return{c(){n=v("div"),o=b(e[0]),M(n,"class","score svelte-1mzujw4")},m(t,e){g(t,n,e),m(n,o)},p(t,[e]){1&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,t[0])},i:t,o:t,d(t){t&&h(n)}}}function ne(t,e,n){let o;return $(t,Nt,(t=>n(0,o=t))),[o]}class oe extends nt{constructor(t){super(),et(this,t,ne,ee,i,{})}}function re(t){let e,n,o,r,c,i;return e=new Ht({props:{name:"c1",width:"3.6%",left:"51.5%",top:"38.2%",active:t[0]>0}}),o=new Ht({props:{name:"c2",width:"3.5%",left:"55.4%",top:"38.1%",active:t[0]>1}}),c=new Ht({props:{name:"c3",width:"3.3%",left:"59.1%",top:"38.0%",active:t[0]>2}}),{c(){K(e.$$.fragment),n=y(),K(o.$$.fragment),r=y(),K(c.$$.fragment)},m(t,s){Q(e,t,s),g(t,n,s),Q(o,t,s),g(t,r,s),Q(c,t,s),i=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]>0),e.$set(r);const i={};1&n&&(i.active=t[0]>1),o.$set(i);const s={};1&n&&(s.active=t[0]>2),c.$set(s)},i(t){i||(I(e.$$.fragment,t),I(o.$$.fragment,t),I(c.$$.fragment,t),i=!0)},o(t){J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),i=!1},d(t){Z(e,t),t&&h(n),Z(o,t),t&&h(r),Z(c,t)}}}function ce(t,e,n){let o;return $(t,_t,(t=>n(0,o=t))),[o]}class ie extends nt{constructor(t){super(),et(this,t,ce,re,i,{})}}function se(t){let e,n,o,r,c,i,s=0===t[1]&&ae(),l=1===t[1]&&fe(),a=2===t[1]&&ue(),f=3===t[1]&&$e(),u=4===t[1]&&pe();return{c(){s&&s.c(),e=y(),l&&l.c(),n=y(),a&&a.c(),o=y(),f&&f.c(),r=y(),u&&u.c(),c=x()},m(t,$){s&&s.m(t,$),g(t,e,$),l&&l.m(t,$),g(t,n,$),a&&a.m(t,$),g(t,o,$),f&&f.m(t,$),g(t,r,$),u&&u.m(t,$),g(t,c,$),i=!0},p(t,i){0===t[1]?s?2&i&&I(s,1):(s=ae(),s.c(),I(s,1),s.m(e.parentNode,e)):s&&(F(),J(s,1,1,(()=>{s=null})),H()),1===t[1]?l?2&i&&I(l,1):(l=fe(),l.c(),I(l,1),l.m(n.parentNode,n)):l&&(F(),J(l,1,1,(()=>{l=null})),H()),2===t[1]?a?2&i&&I(a,1):(a=ue(),a.c(),I(a,1),a.m(o.parentNode,o)):a&&(F(),J(a,1,1,(()=>{a=null})),H()),3===t[1]?f?2&i&&I(f,1):(f=$e(),f.c(),I(f,1),f.m(r.parentNode,r)):f&&(F(),J(f,1,1,(()=>{f=null})),H()),4===t[1]?u?2&i&&I(u,1):(u=pe(),u.c(),I(u,1),u.m(c.parentNode,c)):u&&(F(),J(u,1,1,(()=>{u=null})),H())},i(t){i||(I(s),I(l),I(a),I(f),I(u),i=!0)},o(t){J(s),J(l),J(a),J(f),J(u),i=!1},d(t){s&&s.d(t),t&&h(e),l&&l.d(t),t&&h(n),a&&a.d(t),t&&h(o),f&&f.d(t),t&&h(r),u&&u.d(t),t&&h(c)}}}function le(t){let e,n,o,r,c,i,s=0===t[1]&&de(),l=1===t[1]&&me(),a=2===t[1]&&ge(),f=3===t[1]&&he(),u=4===t[1]&&we();return{c(){s&&s.c(),e=y(),l&&l.c(),n=y(),a&&a.c(),o=y(),f&&f.c(),r=y(),u&&u.c(),c=x()},m(t,$){s&&s.m(t,$),g(t,e,$),l&&l.m(t,$),g(t,n,$),a&&a.m(t,$),g(t,o,$),f&&f.m(t,$),g(t,r,$),u&&u.m(t,$),g(t,c,$),i=!0},p(t,i){0===t[1]?s?2&i&&I(s,1):(s=de(),s.c(),I(s,1),s.m(e.parentNode,e)):s&&(F(),J(s,1,1,(()=>{s=null})),H()),1===t[1]?l?2&i&&I(l,1):(l=me(),l.c(),I(l,1),l.m(n.parentNode,n)):l&&(F(),J(l,1,1,(()=>{l=null})),H()),2===t[1]?a?2&i&&I(a,1):(a=ge(),a.c(),I(a,1),a.m(o.parentNode,o)):a&&(F(),J(a,1,1,(()=>{a=null})),H()),3===t[1]?f?2&i&&I(f,1):(f=he(),f.c(),I(f,1),f.m(r.parentNode,r)):f&&(F(),J(f,1,1,(()=>{f=null})),H()),4===t[1]?u?2&i&&I(u,1):(u=we(),u.c(),I(u,1),u.m(c.parentNode,c)):u&&(F(),J(u,1,1,(()=>{u=null})),H())},i(t){i||(I(s),I(l),I(a),I(f),I(u),i=!0)},o(t){J(s),J(l),J(a),J(f),J(u),i=!1},d(t){s&&s.d(t),t&&h(e),l&&l.d(t),t&&h(n),a&&a.d(t),t&&h(o),f&&f.d(t),t&&h(r),u&&u.d(t),t&&h(c)}}}function ae(t){let e,n;return e=new Ht({props:{name:"ebr",width:"7.7%",left:"57.3%",top:"69.2%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function fe(t){let e,n;return e=new Ht({props:{name:"cr1",width:"3.7%",left:"63.2%",top:"62.3%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function ue(t){let e,n;return e=new Ht({props:{name:"cr2",width:"2.3%",left:"66.3%",top:"66.0%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function $e(t){let e,n;return e=new Ht({props:{name:"cr3",width:"2.4%",left:"68.7%",top:"66.3%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function pe(t){let e,n;return e=new Ht({props:{name:"cr4",width:"2.4%",left:"71.5%",top:"66.2%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function de(t){let e,n;return e=new Ht({props:{name:"ebl",width:"7.4%",left:"34.6%",top:"68.9%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function me(t){let e,n;return e=new Ht({props:{name:"cl1",width:"3.4%",left:"33.4%",top:"62.0%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function ge(t){let e,n;return e=new Ht({props:{name:"cl2",width:"2.4%",left:"31.6%",top:"65.8%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function he(t){let e,n;return e=new Ht({props:{name:"cl3",width:"2.6%",left:"29.0%",top:"66.1%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function we(t){let e,n;return e=new Ht({props:{name:"cl4",width:"2.9%",left:"26.2%",top:"66.4%",active:!0}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function ve(t){let e,n,o,r,c;const i=[le,se],s=[];function l(t,e){return 0===t[0]?0:1}return e=l(t),n=s[e]=i[e](t),r=new Ht({props:{name:"cr1",width:"3.7%",left:"63.2%",top:"62.3%"}}),{c(){n.c(),o=y(),K(r.$$.fragment)},m(t,n){s[e].m(t,n),g(t,o,n),Q(r,t,n),c=!0},p(t,[r]){let c=e;e=l(t),e===c?s[e].p(t,r):(F(),J(s[c],1,1,(()=>{s[c]=null})),H(),n=s[e],n?n.p(t,r):(n=s[e]=i[e](t),n.c()),I(n,1),n.m(o.parentNode,o))},i(t){c||(I(n),I(r.$$.fragment,t),c=!0)},o(t){J(n),J(r.$$.fragment,t),c=!1},d(t){s[e].d(t),t&&h(o),Z(r,t)}}}function be(t,e,n){let{d:o}=e,{s:r}=e;return t.$$set=t=>{"d"in t&&n(0,o=t.d),"s"in t&&n(1,r=t.s)},[o,r]}class ye extends nt{constructor(t){super(),et(this,t,be,ve,i,{d:0,s:1})}}function xe(e){let n,o,r;return{c(){n=v("button"),M(n,"class","start svelte-1qwrnam")},m(t,c){g(t,n,c),o||(r=k(n,"click",e[0]),o=!0)},p:t,i:t,o:t,d(t){t&&h(n),o=!1,r()}}}function ke(t){return[function(e){T.call(this,t,e)}]}class je extends nt{constructor(t){super(),et(this,t,ke,xe,i,{})}}function Me(t=0,e){return t+Math.floor(Math.random()*Math.floor(e))}const Ee=600;class Ne{constructor(){this.d=Me(0,4),this.s=0,this.timeout=Ee,this.done=!1,this.success=null}tick(t){if(!this.done&&(this.timeout-=t,this.timeout<0&&(this.s+=1,this.timeout=Ee),this.s>4)){this.done=!0;const t=u(Et),e=u(Mt);this.success=(0===this.d||1===this.d?t===ht:t===wt)&&(0===this.d||3===this.d?e===vt:e===bt)}}}class _e{constructor(t){this.d=t,this.s=0,this.timeout=Ee,this.done=!1}tick(t){this.done||(this.timeout-=t,this.timeout<0&&(this.s+=1,this.timeout=Ee),this.s>4&&(this.done=!0))}}let Se,Te,Ae,Ce,Le,Oe=1;const Be=()=>Ee*Me(1,3)+Me(0,Ee),Ye=()=>{ze(),Se=Date.now(),Te=Se,Ce=Be(),Le=300,kt.set([]),Nt.set(0),_t.set(0),Oe=1,Ae=requestAnimationFrame(De),xt.set(!0)},ze=()=>{cancelAnimationFrame(Ae),xt.set(!1)},De=()=>{const t=Date.now(),e=t-Te;if(Le<0){let t=u(Nt),n=u(_t),o=[];const r=u(jt).filter((t=>(t.tick(e),!t.done)));for(const c of u(kt))if(c.tick(e),c.done){if(!c.success){n+=1,r.push(new _e(0===c.d||3===c.d?0:1)),Le=300,o=[];break}t+=1}else o.push(c);Oe=t<5?1:t<15?2:3,Ce-=e,Ce<=0&&(Ce=Be(),n<3&&o.length<Oe&&o.push(new Ne)),kt.set(o),jt.set(r),Nt.set(t),_t.set(n)}else Le-=e;Te=t,Ae=requestAnimationFrame(De)};function Re(t,e,n){const o=t.slice();return o[4]=e[n],o}function qe(t,e,n){const o=t.slice();return o[7]=e[n],o}function Pe(t){let e,n,o,r,c,i,s,l,a,f,u,$,p;e=new oe({}),o=new Wt({}),c=new ie({}),s=new Kt({}),a=new te({});let d=t[2],m=[];for(let e=0;e<d.length;e+=1)m[e]=We(qe(t,d,e));const v=t=>J(m[t],1,1,(()=>{m[t]=null}));let b=t[3],k=[];for(let e=0;e<b.length;e+=1)k[e]=Xe(Re(t,b,e));const j=t=>J(k[t],1,1,(()=>{k[t]=null}));return{c(){K(e.$$.fragment),n=y(),K(o.$$.fragment),r=y(),K(c.$$.fragment),i=y(),K(s.$$.fragment),l=y(),K(a.$$.fragment),f=y();for(let t=0;t<m.length;t+=1)m[t].c();u=y();for(let t=0;t<k.length;t+=1)k[t].c();$=x()},m(t,d){Q(e,t,d),g(t,n,d),Q(o,t,d),g(t,r,d),Q(c,t,d),g(t,i,d),Q(s,t,d),g(t,l,d),Q(a,t,d),g(t,f,d);for(let e=0;e<m.length;e+=1)m[e].m(t,d);g(t,u,d);for(let e=0;e<k.length;e+=1)k[e].m(t,d);g(t,$,d),p=!0},p(t,e){if(4&e){let n;for(d=t[2],n=0;n<d.length;n+=1){const o=qe(t,d,n);m[n]?(m[n].p(o,e),I(m[n],1)):(m[n]=We(o),m[n].c(),I(m[n],1),m[n].m(u.parentNode,u))}for(F(),n=d.length;n<m.length;n+=1)v(n);H()}if(8&e){let n;for(b=t[3],n=0;n<b.length;n+=1){const o=Re(t,b,n);k[n]?(k[n].p(o,e),I(k[n],1)):(k[n]=Xe(o),k[n].c(),I(k[n],1),k[n].m($.parentNode,$))}for(F(),n=b.length;n<k.length;n+=1)j(n);H()}},i(t){if(!p){I(e.$$.fragment,t),I(o.$$.fragment,t),I(c.$$.fragment,t),I(s.$$.fragment,t),I(a.$$.fragment,t);for(let t=0;t<d.length;t+=1)I(m[t]);for(let t=0;t<b.length;t+=1)I(k[t]);p=!0}},o(t){J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),J(a.$$.fragment,t),m=m.filter(Boolean);for(let t=0;t<m.length;t+=1)J(m[t]);k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)J(k[t]);p=!1},d(t){Z(e,t),t&&h(n),Z(o,t),t&&h(r),Z(c,t),t&&h(i),Z(s,t),t&&h(l),Z(a,t),t&&h(f),w(m,t),t&&h(u),w(k,t),t&&h($)}}}function We(t){let e,n;return e=new Ut({props:{d:t[7].d,s:t[7].s}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.d=t[7].d),4&n&&(o.s=t[7].s),e.$set(o)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function Xe(t){let e,n;return e=new ye({props:{d:t[4].d,s:t[4].s}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};8&n&&(o.d=t[4].d),8&n&&(o.s=t[4].s),e.$set(o)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function Fe(t){let e,n,o,r;n=new je({}),n.$on("click",Ye);let c=t[1]&&Pe(t);return{c(){e=v("div"),K(n.$$.fragment),o=y(),c&&c.c(),M(e,"class","game svelte-1r8ll9h"),N(e,"open",t[0])},m(t,i){g(t,e,i),Q(n,e,null),m(e,o),c&&c.m(e,null),r=!0},p(t,[n]){t[1]?c?(c.p(t,n),2&n&&I(c,1)):(c=Pe(t),c.c(),I(c,1),c.m(e,null)):c&&(F(),J(c,1,1,(()=>{c=null})),H()),1&n&&N(e,"open",t[0])},i(t){r||(I(n.$$.fragment,t),I(c),r=!0)},o(t){J(n.$$.fragment,t),J(c),r=!1},d(t){t&&h(e),Z(n),c&&c.d()}}}function He(t,e,n){let o,r,c,i;return $(t,yt,(t=>n(0,o=t))),$(t,xt,(t=>n(1,r=t))),$(t,kt,(t=>n(2,c=t))),$(t,jt,(t=>n(3,i=t))),yt.subscribe((t=>{t||ze()})),mt("/nintenday/game.jpg"),[o,r,c,i]}class Ie extends nt{constructor(t){super(),et(this,t,He,Fe,i,{})}}function Je(e){let n;return{c(){n=v("div"),M(n,"class","paranja svelte-1idg5py"),N(n,"open",e[0])},m(t,e){g(t,n,e)},p(t,[e]){1&e&&N(n,"open",t[0])},i:t,o:t,d(t){t&&h(n)}}}function Ue(t,e,n){let o;return $(t,yt,(t=>n(0,o=t))),[o]}class Ve extends nt{constructor(t){super(),et(this,t,Ue,Je,i,{})}}function Ge(t,e,n){const o=t.slice();return o[1]=e[n],o}function Ke(t){let n,o;const r=[t[1]];let c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return n=new Rt({props:c}),{c(){K(n.$$.fragment)},m(t,e){Q(n,t,e),o=!0},p(t,e){const o=1&e?V(r,[G(t[1])]):{};n.$set(o)},i(t){o||(I(n.$$.fragment,t),o=!0)},o(t){J(n.$$.fragment,t),o=!1},d(t){Z(n,t)}}}function Qe(t){let e,n,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=Ke(Ge(t,o,e));const c=t=>J(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=x()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);g(t,e,o),n=!0},p(t,n){if(1&n){let i;for(o=t[0],i=0;i<o.length;i+=1){const c=Ge(t,o,i);r[i]?(r[i].p(c,n),I(r[i],1)):(r[i]=Ke(c),r[i].c(),I(r[i],1),r[i].m(e.parentNode,e))}for(F(),i=o.length;i<r.length;i+=1)c(i);H()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)I(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)J(r[t]);n=!1},d(t){w(r,t),t&&h(e)}}}function Ze(t){let e,n,o,r,c,i,s;return n=new ct({props:{$$slots:{default:[Qe]},$$scope:{ctx:t}}}),r=new Ve({}),i=new Ie({}),{c(){e=v("main"),K(n.$$.fragment),o=y(),K(r.$$.fragment),c=y(),K(i.$$.fragment)},m(t,l){g(t,e,l),Q(n,e,null),m(e,o),Q(r,e,null),m(e,c),Q(i,e,null),s=!0},p(t,[e]){const o={};16&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){s||(I(n.$$.fragment,t),I(r.$$.fragment,t),I(i.$$.fragment,t),s=!0)},o(t){J(n.$$.fragment,t),J(r.$$.fragment,t),J(i.$$.fragment,t),s=!1},d(t){t&&h(e),Z(n),Z(r),Z(i)}}}function tn(t){return[new Array(10).fill({}).map(((t,e)=>({...t,filename:`g${`0${e+1}`.slice(-2)}.jpg`})))]}return new class extends nt{constructor(t){super(),et(this,t,tn,Ze,i,{})}}({target:document.body})}();
