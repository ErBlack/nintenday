var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,a;function l(t,e){return s||(s=document.createElement("a")),s.href=e,t===s.href}function f(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(t){let e;return f(t,(t=>e=t))(),e}function $(t,e,n){t.$$.on_destroy.push(f(e,n))}function p(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function m(t,e,n){return t.set(n),e}function d(t,e){t.appendChild(e)}function g(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function w(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function b(t){return document.createTextNode(t)}function y(){return b(" ")}function x(){return b("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function j(t){return function(e){return e.preventDefault(),t.call(this,e)}}function E(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function M(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function N(t,e,n){t.classList[n?"add":"remove"](e)}function _(t){a=t}function S(){const t=function(){if(!a)throw new Error("Function called outside component initialization");return a}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}function T(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const A=[],C=[],O=[],L=[],B=Promise.resolve();let D=!1;function R(t){O.push(t)}let q=!1;const z=new Set;function P(){if(!q){q=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];_(e),Y(e.$$)}for(_(null),A.length=0;C.length;)C.pop()();for(let t=0;t<O.length;t+=1){const e=O[t];z.has(e)||(z.add(e),e())}O.length=0}while(A.length);for(;L.length;)L.pop()();D=!1,q=!1,z.clear()}}function Y(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}const F=new Set;let X;function H(){X={r:0,c:[],p:X}}function I(){X.r||r(X.c),X=X.p}function J(t,e){t&&t.i&&(F.delete(t),t.i(e))}function U(t,e,n,o){if(t&&t.o){if(F.has(t))return;F.add(t),X.c.push((()=>{F.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function W(t,e){const n={},o={},r={$$scope:1};let c=t.length;for(;c--;){const i=t[c],s=e[c];if(s){for(const t in i)t in s||(o[t]=1);for(const t in s)r[t]||(n[t]=s[t],r[t]=1);t[c]=s}else for(const t in i)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function V(t){return"object"==typeof t&&null!==t?t:{}}function G(t){t&&t.c()}function K(t,e,o,i){const{fragment:s,on_mount:a,on_destroy:l,after_update:f}=t.$$;s&&s.m(e,o),i||R((()=>{const e=a.map(n).filter(c);l?l.push(...e):r(e),t.$$.on_mount=[]})),f.forEach(R)}function Q(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(t,e){-1===t.$$.dirty[0]&&(A.push(t),D||(D=!0,B.then(P)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function tt(e,n,c,i,s,l,f,u=[-1]){const $=a;_(e);const p=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map($?$.$$.context:n.context||[]),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||$.$$.root};f&&f(p.root);let m=!1;if(p.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&s(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&Z(e,t)),n})):[],p.update(),m=!0,r(p.before_update),p.fragment=!!i&&i(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(h)}else p.fragment&&p.fragment.c();n.intro&&J(e.$$.fragment),K(e,n.target,n.anchor,n.customElement),P()}_($)}class et{$destroy(){Q(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function nt(t){let e,n;const o=t[1].default,r=function(t,e,n,o){if(t){const r=p(t,e,n,o);return t[0](r)}}(o,t,t[0],null);return{c(){e=v("section"),r&&r.c(),E(e,"class","desk svelte-cywknu")},m(t,o){g(t,e,o),r&&r.m(e,null),n=!0},p(t,[e]){r&&r.p&&(!n||1&e)&&function(t,e,n,o,r,c){if(r){const i=p(e,n,o,c);t.p(i,r)}}(r,o,t,t[0],n?function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(o,t[0],e,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[0]),null)},i(t){n||(J(r,t),n=!0)},o(t){U(r,t),n=!1},d(t){t&&h(e),r&&r.d(t)}}}function ot(t,e,n){let{$$slots:o={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,o]}class rt extends et{constructor(t){super(),tt(this,t,ot,nt,i,{})}}function ct(t=0,e){return t+Math.floor(Math.random()*Math.floor(e))}const it=[];function st(e,n=t){let o;const r=new Set;function c(t){if(i(e,t)&&(e=t,o)){const t=!it.length;for(const t of r)t[1](),it.push(t,e);if(t){for(let t=0;t<it.length;t+=2)it[t][0](it[t+1]);it.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(i,s=t){const a=[i,s];return r.add(a),1===r.size&&(o=n(c)||t),i(e),()=>{r.delete(a),0===r.size&&(o(),o=null)}}}}var at={};const lt=function(t,e){const n="undefined"!=typeof localStorage;function o(t,e){n&&localStorage.setItem(t,JSON.stringify(e))}if(!at[t]){const r=st(e,(e=>{const o=n?localStorage.getItem(t):null;if(o&&e(JSON.parse(o)),n){const n=n=>{n.key===t&&e(n.newValue?JSON.parse(n.newValue):null)};return window.addEventListener("storage",n),()=>window.removeEventListener("storage",n)}})),{subscribe:c,set:i}=r;at[t]={set(e){o(t,e),i(e)},update(e){const n=e(u(r));o(t,n),i(n)},subscribe:c}}return at[t]}("positions",{"g10.jpg":{left:13.316485225505442,top:9.281740837696335,r:-18},"g07.jpg":{left:14.717389191290826,top:79.60078534031413,r:-34},"g09.jpg":{left:84.6605268273717,top:44.013416230366495,r:-1},"g08.jpg":{left:14.427002332814931,top:47.8321335078534,r:14},"g06.jpg":{left:9.503790824261275,top:65.48920157068063,r:-15},"g05.jpg":{left:12.887587480559876,top:26.618128272251308,r:24},"g04.jpg":{left:86.45873833592535,top:15.62009162303665,r:18},"g03.jpg":{left:85.15503499222396,top:39.90674083769633,r:2},"g02.jpg":{left:84.50743584758943,top:65.92277486910994,r:20},"g01.jpg":{left:85.59365279937792,top:83.4407722513089,r:-15}});function ft(e){let n,o,c,i,s;return{c(){n=v("img"),E(n,"role","button"),E(n,"class","button svelte-1fddbjo"),l(n.src,o=ut)||E(n,"src",o),E(n,"width",e[2]),E(n,"style",c=`left: ${e[0]}; top: ${e[1]}`),E(n,"alt",""),N(n,"pressed",e[5]||e[3]),N(n,"hit",e[4])},m(t,o){g(t,n,o),i||(s=[k(n,"mousedown",e[6]),k(n,"mouseup",e[7]),k(n,"mouseout",e[7]),k(n,"blur",e[7]),k(n,"touchstart",e[6],{passive:!0}),k(n,"touchend",e[7],{passive:!0}),k(n,"dragstart",$t)],i=!0)},p(t,[e]){4&e&&E(n,"width",t[2]),3&e&&c!==(c=`left: ${t[0]}; top: ${t[1]}`)&&E(n,"style",c),40&e&&N(n,"pressed",t[5]||t[3]),16&e&&N(n,"hit",t[4])},i:t,o:t,d(t){t&&h(n),i=!1,r(s)}}}const ut="/nintenday/bp.png",$t=t=>t.preventDefault();function pt(t,e,n){const o=S();let{left:r}=e,{top:c}=e,{width:i="7.52%"}=e,{active:s=!1}=e,{hit:a=!1}=e,l=!1;return t.$$set=t=>{"left"in t&&n(0,r=t.left),"top"in t&&n(1,c=t.top),"width"in t&&n(2,i=t.width),"active"in t&&n(3,s=t.active),"hit"in t&&n(4,a=t.hit)},[r,c,i,s,a,l,()=>{n(5,l=!0),o("activate")},()=>{n(5,l=!1),o("deactivate")}]}class mt extends et{constructor(t){super(),tt(this,t,pt,ft,i,{left:0,top:1,width:2,active:3,hit:4})}}function dt(t){return new Promise(((e,n)=>{Object.assign(new Image,{src:t,onload:e,onerror:n})}))}const gt=Promise.all(["bp.png","c1.png","c2.png","c3.png","cl1.png","cl2.png","cl3.png","cl4.png","cr1.png","cr2.png","cr3.png","cr4.png","e.png","ebl.png","ebr.png","game.jpg","wbl.png","wbr.png","whlb.png","whlt.png","whrb.png","whrt.png"].map((t=>`/nintenday/${t}`)).map(dt)),ht=!0,wt=!1,vt=!0,bt=!1,yt=st(!1),xt=st(!1),kt=st([]),jt=st([]),Et=st(vt),Mt=st(ht),Nt=st(0),_t=st(0),St="g03.jpg",Tt=".game",At=document.createElement("style");document.head.appendChild(At);let Ct=!1;function Ot(t){let e,n,o,r,c,i,s,a;return e=new mt({props:{width:"31px",top:"29px",left:"-178px",active:t[0]>0}}),e.$on("activate",t[2]),o=new mt({props:{width:"31px",top:"28px",left:"146px",active:t[0]>3}}),o.$on("activate",t[3]),c=new mt({props:{width:"31px",top:"71px",left:"146px",active:t[0]>1}}),c.$on("activate",t[4]),s=new mt({props:{width:"31px",top:"73px",left:"-178px",active:t[0]>2}}),s.$on("activate",t[5]),{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment),r=y(),G(c.$$.fragment),i=y(),G(s.$$.fragment)},m(t,l){K(e,t,l),g(t,n,l),K(o,t,l),g(t,r,l),K(c,t,l),g(t,i,l),K(s,t,l),a=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]>0),e.$set(r);const i={};1&n&&(i.active=t[0]>3),o.$set(i);const a={};1&n&&(a.active=t[0]>1),c.$set(a);const l={};1&n&&(l.active=t[0]>2),s.$set(l)},i(t){a||(J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),a=!0)},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),U(c.$$.fragment,t),U(s.$$.fragment,t),a=!1},d(t){Q(e,t),t&&h(n),Q(o,t),t&&h(r),Q(c,t),t&&h(i),Q(s,t)}}}function Lt(t,e,n){let o;$(t,yt,(t=>n(1,o=t)));let r=0;return[r,o,()=>n(0,r=0===r?1:0),()=>{n(0,r=3===r?4:0),4===r&&gt.then((()=>(()=>{if(Ct)return;Ct=!0;const t=document.querySelector(Tt),e=document.querySelector('[src="/nintenday/g03.jpg"]'),n=u(lt)[St]?.r||0;e.style=`transform: translate(-50%, -50%) rotate(${-n}deg); transform-origin: center center`;const o=e.getBoundingClientRect();e.style=void 0;const r=t.getBoundingClientRect(),c=o.width/r.width,i=o.height/r.height,s=o.x-(r.x+(r.width-o.width)/2),a=o.y-(r.y+(r.height-o.height)/2),l=`@keyframes expand {\n  from { \n    transform: matrix(${c}, 0, 0, ${i}, ${s}, ${a}) rotate(${n}deg); transform-origin: center center; visibility: visible; z-index: 1;\n  }\n  to {\n    visibility: visible; z-index: 1;\n  }\n}`;return At.innerHTML=`${l} .game {animation: expand 500ms ease-in; animation-fill-mode: forwards}`,new Promise((t=>{setTimeout((()=>{At.innerHTML="",Ct=!1,t()}),500)}))})())).then((()=>{m(yt,o=!0,o)})),setTimeout((()=>n(0,r=0)),500)},()=>n(0,r=1===r?2:0),()=>n(0,r=2===r?3:0)]}class Bt extends et{constructor(t){super(),tt(this,t,Lt,Ot,i,{})}}function Dt(t){let e,n,o,c,i,s,a,f=t[2]&&function(t){let e,n;return e=new Bt({}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}();return{c(){e=v("div"),n=v("img"),c=y(),f&&f.c(),l(n.src,o=t[3])||E(n,"src",o),E(n,"alt",""),E(n,"class","svelte-bprd0g"),E(e,"class","console svelte-bprd0g"),E(e,"data-type",t[0]),M(e,"left",(t[1][t[0]]?.left||0)+"%"),M(e,"top",(t[1][t[0]]?.top||0)+"%"),M(e,"transform","rotate("+(t[1][t[0]]?.r||0)+"deg)")},m(o,r){g(o,e,r),d(e,n),d(e,c),f&&f.m(e,null),i=!0,s||(a=[k(e,"mousewheel",t[10]),k(e,"mousedown",j(t[7])),k(e,"mousemove",t[8]),k(e,"mouseup",t[9]),k(e,"mouseout",t[9]),k(e,"blur",t[9]),k(e,"touchstart",t[4]),k(e,"touchmove",j(t[6])),k(e,"touchend",t[5])],s=!0)},p(t,[n]){(!i||1&n)&&E(e,"data-type",t[0]),(!i||3&n)&&M(e,"left",(t[1][t[0]]?.left||0)+"%"),(!i||3&n)&&M(e,"top",(t[1][t[0]]?.top||0)+"%"),(!i||3&n)&&M(e,"transform","rotate("+(t[1][t[0]]?.r||0)+"deg)")},i(t){i||(J(f),i=!0)},o(t){U(f),i=!1},d(t){t&&h(e),f&&f.d(),s=!1,r(a)}}}function Rt(t,e,n){let o;$(t,lt,(t=>n(1,o=t)));let{filename:r}=e;const c="g03.jpg"===r,i=`/nintenday/${r}`,s=(t,e,n)=>{const c={};if(void 0!==t&&void 0!==e){const{clientWidth:n,clientHeight:o}=document.body;Object.assign(c,{left:t/n*100,top:e/o*100})}void 0!==n&&(c.r=((Object(o[r]).r||0)+n)%360),m(lt,o={...o,[r]:{...Object(o[r]),...c}},o)},{onTouchStart:a,onTouchEnd:l,onTouchMove:f}=(t=>{let e=null,n=null;return{onTouchStart:({currentTarget:t,touches:[{clientX:o,clientY:r}]})=>{const{x:c,y:i}=t.getBoundingClientRect();e=o-c,n=r-i},onTouchMove:({touches:[{clientX:o,clientY:r}]})=>{t(o-e,r-n)},onTouchEnd:()=>{e=null,n=null}}})(s),{onMouseDown:u,onMouseMove:p,onMouseUp:d,onMouseWheel:g}=(t=>{let e=null,n=null;return{onMouseDown:({currentTarget:t,clientX:o,clientY:r})=>{const{x:c,y:i}=t.getBoundingClientRect();e=o-c,n=r-i},onMouseMove:({clientX:o,clientY:r})=>{null!==e&&null!==n&&t(o-e,r-n)},onMouseUp:()=>{e=null,n=null},onMouseWheel:({deltaY:e})=>{t(void 0,void 0,Math.sign(e))}}})(s);return t.$$set=t=>{"filename"in t&&n(0,r=t.filename)},[r,o,c,i,a,l,f,u,p,d,g]}class qt extends et{constructor(t){super(),tt(this,t,Rt,Dt,i,{filename:0})}}function zt(t){let e,n,o,r,c,i,s,a;return e=new mt({props:{left:"7.67%",top:"61.98%",active:t[0],hit:!0}}),e.$on("activate",t[6]),o=new mt({props:{left:"84.65%",top:"61.59%",active:t[1],hit:!0}}),o.$on("activate",t[7]),c=new mt({props:{left:"84.51%",top:"78.95%",active:t[2],hit:!0}}),c.$on("activate",t[8]),s=new mt({props:{left:"7.68%",top:"79.65%",active:t[3],hit:!0}}),s.$on("activate",t[9]),{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment),r=y(),G(c.$$.fragment),i=y(),G(s.$$.fragment)},m(t,l){K(e,t,l),g(t,n,l),K(o,t,l),g(t,r,l),K(c,t,l),g(t,i,l),K(s,t,l),a=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]),e.$set(r);const i={};2&n&&(i.active=t[1]),o.$set(i);const a={};4&n&&(a.active=t[2]),c.$set(a);const l={};8&n&&(l.active=t[3]),s.$set(l)},i(t){a||(J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),a=!0)},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),U(c.$$.fragment,t),U(s.$$.fragment,t),a=!1},d(t){Q(e,t),t&&h(n),Q(o,t),t&&h(r),Q(c,t),t&&h(i),Q(s,t)}}}function Pt(t,e,n){let o,r;$(t,Et,(t=>n(4,o=t))),$(t,Mt,(t=>n(5,r=t)));let c=!1,i=!1,s=!1,a=!1;Object.assign(document.body,{onkeyup:({key:t,code:e})=>{n(0,c=!1),n(1,i=!1),n(2,s=!1),n(3,a=!1)},onkeydown:({key:t,code:e})=>{switch(t){case"ArrowUp":case"w":case"ц":m(Mt,r=ht,r),o===vt&&n(0,c=!0),o===bt&&n(1,i=!0);break;case"ArrowRight":case"d":case"в":m(Et,o=bt,o),r===ht&&n(1,i=!0),r===wt&&n(2,s=!0);break;case"ArrowDown":case"s":case"ы":m(Mt,r=wt,r),o===vt&&n(3,a=!0),o===bt&&n(2,s=!0);break;case"ArrowLeft":case"a":case"ф":m(Et,o=vt,o),r===ht&&n(0,c=!0),r===wt&&n(3,a=!0);break;case"Control":case"Shift":switch(e){case"ShiftLeft":m(Mt,r=ht,r),m(Et,o=vt,o),n(0,c=!0);break;case"ShiftRight":m(Mt,r=ht,r),m(Et,o=bt,o),n(1,i=!0);break;case"ControlRight":m(Mt,r=wt,r),m(Et,o=bt,o),n(2,s=!0);break;case"ControlLeft":m(Mt,r=wt,r),m(Et,o=vt,o),n(3,a=!0)}}}});return[c,i,s,a,o,r,()=>{m(Et,o=vt,o),m(Mt,r=ht,r)},()=>{m(Et,o=bt,o),m(Mt,r=ht,r)},()=>{m(Et,o=bt,o),m(Mt,r=wt,r)},()=>{m(Et,o=vt,o),m(Mt,r=wt,r)}]}class Yt extends et{constructor(t){super(),tt(this,t,Pt,zt,i,{})}}function Ft(e){let n,o,r;return{c(){n=v("img"),E(n,"class","sprite svelte-4gxohw"),l(n.src,o=e[5])||E(n,"src",o),E(n,"width",e[0]),E(n,"style",r=`left: ${e[1]}; top: ${e[2]}${e[4]?`; transform: rotate(${e[4]}deg)`:""}`),E(n,"alt",""),N(n,"active",e[3])},m(t,e){g(t,n,e)},p(t,[e]){1&e&&E(n,"width",t[0]),22&e&&r!==(r=`left: ${t[1]}; top: ${t[2]}${t[4]?`; transform: rotate(${t[4]}deg)`:""}`)&&E(n,"style",r),8&e&&N(n,"active",t[3])},i:t,o:t,d(t){t&&h(n)}}}function Xt(t,e,n){let{name:o}=e,{width:r}=e,{left:c}=e,{top:i}=e,{active:s=!1}=e,{rotate:a=0}=e;const l=`/nintenday/${o}.png`;return t.$$set=t=>{"name"in t&&n(6,o=t.name),"width"in t&&n(0,r=t.width),"left"in t&&n(1,c=t.left),"top"in t&&n(2,i=t.top),"active"in t&&n(3,s=t.active),"rotate"in t&&n(4,a=t.rotate)},[r,c,i,s,a,l,o]}class Ht extends et{constructor(t){super(),tt(this,t,Xt,Ft,i,{name:6,width:0,left:1,top:2,active:3,rotate:4})}}function It(t){let n,o;const r=[{name:"e"},t[2][t[0]][t[1]],{active:!0}];let c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return n=new Ht({props:c}),{c(){G(n.$$.fragment)},m(t,e){K(n,t,e),o=!0},p(t,[e]){const o=7&e?W(r,[r[0],V(t[2][t[0]][t[1]]),r[2]]):{};n.$set(o)},i(t){o||(J(n.$$.fragment,t),o=!0)},o(t){U(n.$$.fragment,t),o=!1},d(t){Q(n,t)}}}function Jt(t,e,n){let{d:o}=e,{s:r}=e;return t.$$set=t=>{"d"in t&&n(0,o=t.d),"s"in t&&n(1,r=t.s)},[o,r,[[{width:"1.7%",left:"29.7%",top:"40.0%",rotate:"33"},{width:"1.7%",left:"31.3%",top:"41.6%",rotate:"95"},{width:"1.5%",left:"33.0%",top:"43.8%"},{width:"1.6%",left:"34.5%",top:"44.8%",rotate:"-124"},{width:"1.7%",left:"35.9%",top:"47.2%",rotate:"-53"}],[{width:"1.6%",left:"69.5%",top:"39.6%",rotate:"21"},{width:"1.6%",left:"67.8%",top:"41.0%",rotate:"5"},{width:"1.5%",left:"66.0%",top:"43.1%",rotate:"-40"},{width:"1.8%",left:"64.1%",top:"44.5%",rotate:"-105"},{width:"1.6%",left:"62.7%",top:"47.3%",rotate:"-169"}],[{width:"1.7%",left:"69.2%",top:"51.4%",rotate:"-144"},{width:"1.5%",left:"67.6%",top:"53.7%",rotate:"-185"},{width:"1.7%",left:"65.9%",top:"54.9%",rotate:"110"},{width:"1.6%",left:"64.1%",top:"56.7%",rotate:"48"},{width:"1.6%",left:"62.5%",top:"59.2%",rotate:"-32"}],[{width:"1.7%",left:"29.3%",top:"51.6%",rotate:"-15"},{width:"1.6%",left:"31.0%",top:"53.3%",rotate:"36"},{width:"1.7%",left:"32.8%",top:"54.8%",rotate:"66"},{width:"1.6%",left:"34.5%",top:"56.6%",rotate:"171"},{width:"1.7%",left:"35.9%",top:"58.6%",rotate:"-123"}]]]}class Ut extends et{constructor(t){super(),tt(this,t,Jt,It,i,{d:0,s:1})}}function Wt(t){let e,n,o,r,c,i,s,a;return e=new Ht({props:{name:"whlt",width:"7.7%",left:"36.8%",top:"44.9%",active:t[0]===vt&&t[1]===ht}}),o=new Ht({props:{name:"whrt",width:"6.7%",left:"57.0%",top:"46.8%",active:t[0]===bt&&t[1]===ht}}),c=new Ht({props:{name:"whrb",width:"7.4%",left:"56.1%",top:"58.1%",active:t[0]===bt&&t[1]===wt}}),s=new Ht({props:{name:"whlb",width:"8.6%",left:"36.1%",top:"57%",active:t[0]===vt&&t[1]===wt}}),{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment),r=y(),G(c.$$.fragment),i=y(),G(s.$$.fragment)},m(t,l){K(e,t,l),g(t,n,l),K(o,t,l),g(t,r,l),K(c,t,l),g(t,i,l),K(s,t,l),a=!0},p(t,[n]){const r={};3&n&&(r.active=t[0]===vt&&t[1]===ht),e.$set(r);const i={};3&n&&(i.active=t[0]===bt&&t[1]===ht),o.$set(i);const a={};3&n&&(a.active=t[0]===bt&&t[1]===wt),c.$set(a);const l={};3&n&&(l.active=t[0]===vt&&t[1]===wt),s.$set(l)},i(t){a||(J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),a=!0)},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),U(c.$$.fragment,t),U(s.$$.fragment,t),a=!1},d(t){Q(e,t),t&&h(n),Q(o,t),t&&h(r),Q(c,t),t&&h(i),Q(s,t)}}}function Vt(t,e,n){let o,r;return $(t,Et,(t=>n(0,o=t))),$(t,Mt,(t=>n(1,r=t))),[o,r]}class Gt extends et{constructor(t){super(),tt(this,t,Vt,Wt,i,{})}}function Kt(t){let e,n,o,r;return e=new Ht({props:{name:"wbl",width:"9.3%",left:"41.8%",top:"45.2%",active:t[0]===vt}}),o=new Ht({props:{name:"wbr",width:"8.5%",left:"49.8%",top:"45.5%",active:t[0]===bt}}),{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment)},m(t,c){K(e,t,c),g(t,n,c),K(o,t,c),r=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]===vt),e.$set(r);const c={};1&n&&(c.active=t[0]===bt),o.$set(c)},i(t){r||(J(e.$$.fragment,t),J(o.$$.fragment,t),r=!0)},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),r=!1},d(t){Q(e,t),t&&h(n),Q(o,t)}}}function Qt(t,e,n){let o;return $(t,Et,(t=>n(0,o=t))),[o]}class Zt extends et{constructor(t){super(),tt(this,t,Qt,Kt,i,{})}}function te(e){let n,o;return{c(){n=v("div"),o=b(e[0]),E(n,"class","score svelte-1mzujw4")},m(t,e){g(t,n,e),d(n,o)},p(t,[e]){1&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,t[0])},i:t,o:t,d(t){t&&h(n)}}}function ee(t,e,n){let o;return $(t,Nt,(t=>n(0,o=t))),[o]}class ne extends et{constructor(t){super(),tt(this,t,ee,te,i,{})}}function oe(t){let e,n,o,r,c,i;return e=new Ht({props:{name:"c1",width:"3.6%",left:"51.5%",top:"38.2%",active:t[0]>0}}),o=new Ht({props:{name:"c2",width:"3.5%",left:"55.4%",top:"38.1%",active:t[0]>1}}),c=new Ht({props:{name:"c3",width:"3.3%",left:"59.1%",top:"38.0%",active:t[0]>2}}),{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment),r=y(),G(c.$$.fragment)},m(t,s){K(e,t,s),g(t,n,s),K(o,t,s),g(t,r,s),K(c,t,s),i=!0},p(t,[n]){const r={};1&n&&(r.active=t[0]>0),e.$set(r);const i={};1&n&&(i.active=t[0]>1),o.$set(i);const s={};1&n&&(s.active=t[0]>2),c.$set(s)},i(t){i||(J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),i=!0)},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),U(c.$$.fragment,t),i=!1},d(t){Q(e,t),t&&h(n),Q(o,t),t&&h(r),Q(c,t)}}}function re(t,e,n){let o;return $(t,_t,(t=>n(0,o=t))),[o]}class ce extends et{constructor(t){super(),tt(this,t,re,oe,i,{})}}function ie(t){let e,n,o,r,c,i,s=0===t[1]&&ae(),a=1===t[1]&&le(),l=2===t[1]&&fe(),f=3===t[1]&&ue(),u=4===t[1]&&$e();return{c(){s&&s.c(),e=y(),a&&a.c(),n=y(),l&&l.c(),o=y(),f&&f.c(),r=y(),u&&u.c(),c=x()},m(t,$){s&&s.m(t,$),g(t,e,$),a&&a.m(t,$),g(t,n,$),l&&l.m(t,$),g(t,o,$),f&&f.m(t,$),g(t,r,$),u&&u.m(t,$),g(t,c,$),i=!0},p(t,i){0===t[1]?s?2&i&&J(s,1):(s=ae(),s.c(),J(s,1),s.m(e.parentNode,e)):s&&(H(),U(s,1,1,(()=>{s=null})),I()),1===t[1]?a?2&i&&J(a,1):(a=le(),a.c(),J(a,1),a.m(n.parentNode,n)):a&&(H(),U(a,1,1,(()=>{a=null})),I()),2===t[1]?l?2&i&&J(l,1):(l=fe(),l.c(),J(l,1),l.m(o.parentNode,o)):l&&(H(),U(l,1,1,(()=>{l=null})),I()),3===t[1]?f?2&i&&J(f,1):(f=ue(),f.c(),J(f,1),f.m(r.parentNode,r)):f&&(H(),U(f,1,1,(()=>{f=null})),I()),4===t[1]?u?2&i&&J(u,1):(u=$e(),u.c(),J(u,1),u.m(c.parentNode,c)):u&&(H(),U(u,1,1,(()=>{u=null})),I())},i(t){i||(J(s),J(a),J(l),J(f),J(u),i=!0)},o(t){U(s),U(a),U(l),U(f),U(u),i=!1},d(t){s&&s.d(t),t&&h(e),a&&a.d(t),t&&h(n),l&&l.d(t),t&&h(o),f&&f.d(t),t&&h(r),u&&u.d(t),t&&h(c)}}}function se(t){let e,n,o,r,c,i,s=0===t[1]&&pe(),a=1===t[1]&&me(),l=2===t[1]&&de(),f=3===t[1]&&ge(),u=4===t[1]&&he();return{c(){s&&s.c(),e=y(),a&&a.c(),n=y(),l&&l.c(),o=y(),f&&f.c(),r=y(),u&&u.c(),c=x()},m(t,$){s&&s.m(t,$),g(t,e,$),a&&a.m(t,$),g(t,n,$),l&&l.m(t,$),g(t,o,$),f&&f.m(t,$),g(t,r,$),u&&u.m(t,$),g(t,c,$),i=!0},p(t,i){0===t[1]?s?2&i&&J(s,1):(s=pe(),s.c(),J(s,1),s.m(e.parentNode,e)):s&&(H(),U(s,1,1,(()=>{s=null})),I()),1===t[1]?a?2&i&&J(a,1):(a=me(),a.c(),J(a,1),a.m(n.parentNode,n)):a&&(H(),U(a,1,1,(()=>{a=null})),I()),2===t[1]?l?2&i&&J(l,1):(l=de(),l.c(),J(l,1),l.m(o.parentNode,o)):l&&(H(),U(l,1,1,(()=>{l=null})),I()),3===t[1]?f?2&i&&J(f,1):(f=ge(),f.c(),J(f,1),f.m(r.parentNode,r)):f&&(H(),U(f,1,1,(()=>{f=null})),I()),4===t[1]?u?2&i&&J(u,1):(u=he(),u.c(),J(u,1),u.m(c.parentNode,c)):u&&(H(),U(u,1,1,(()=>{u=null})),I())},i(t){i||(J(s),J(a),J(l),J(f),J(u),i=!0)},o(t){U(s),U(a),U(l),U(f),U(u),i=!1},d(t){s&&s.d(t),t&&h(e),a&&a.d(t),t&&h(n),l&&l.d(t),t&&h(o),f&&f.d(t),t&&h(r),u&&u.d(t),t&&h(c)}}}function ae(t){let e,n;return e=new Ht({props:{name:"ebr",width:"7.7%",left:"57.3%",top:"69.2%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function le(t){let e,n;return e=new Ht({props:{name:"cr1",width:"3.7%",left:"63.2%",top:"62.3%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function fe(t){let e,n;return e=new Ht({props:{name:"cr2",width:"2.3%",left:"66.3%",top:"66.0%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function ue(t){let e,n;return e=new Ht({props:{name:"cr3",width:"2.4%",left:"68.7%",top:"66.3%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function $e(t){let e,n;return e=new Ht({props:{name:"cr4",width:"2.4%",left:"71.5%",top:"66.2%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function pe(t){let e,n;return e=new Ht({props:{name:"ebl",width:"7.4%",left:"34.6%",top:"68.9%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function me(t){let e,n;return e=new Ht({props:{name:"cl1",width:"3.4%",left:"33.4%",top:"62.0%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function de(t){let e,n;return e=new Ht({props:{name:"cl2",width:"2.4%",left:"31.6%",top:"65.8%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function ge(t){let e,n;return e=new Ht({props:{name:"cl3",width:"2.6%",left:"29.0%",top:"66.1%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function he(t){let e,n;return e=new Ht({props:{name:"cl4",width:"2.9%",left:"26.2%",top:"66.4%",active:!0}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function we(t){let e,n,o,r,c;const i=[se,ie],s=[];function a(t,e){return 0===t[0]?0:1}return e=a(t),n=s[e]=i[e](t),r=new Ht({props:{name:"cr1",width:"3.7%",left:"63.2%",top:"62.3%"}}),{c(){n.c(),o=y(),G(r.$$.fragment)},m(t,n){s[e].m(t,n),g(t,o,n),K(r,t,n),c=!0},p(t,[r]){let c=e;e=a(t),e===c?s[e].p(t,r):(H(),U(s[c],1,1,(()=>{s[c]=null})),I(),n=s[e],n?n.p(t,r):(n=s[e]=i[e](t),n.c()),J(n,1),n.m(o.parentNode,o))},i(t){c||(J(n),J(r.$$.fragment,t),c=!0)},o(t){U(n),U(r.$$.fragment,t),c=!1},d(t){s[e].d(t),t&&h(o),Q(r,t)}}}function ve(t,e,n){let{d:o}=e,{s:r}=e;return t.$$set=t=>{"d"in t&&n(0,o=t.d),"s"in t&&n(1,r=t.s)},[o,r]}class be extends et{constructor(t){super(),tt(this,t,ve,we,i,{d:0,s:1})}}function ye(e){let n,o,r;return{c(){n=v("button"),E(n,"class","start svelte-1qwrnam")},m(t,c){g(t,n,c),o||(r=k(n,"click",e[0]),o=!0)},p:t,i:t,o:t,d(t){t&&h(n),o=!1,r()}}}function xe(t){return[function(e){T.call(this,t,e)}]}class ke extends et{constructor(t){super(),tt(this,t,xe,ye,i,{})}}const je=600;class Ee{constructor(){this.d=ct(0,4),this.s=0,this.timeout=je,this.done=!1,this.success=null}tick(t){if(!this.done&&(this.timeout-=t,this.timeout<0&&(this.s+=1,this.timeout=je),this.s>4)){this.done=!0;const t=u(Mt),e=u(Et);this.success=(0===this.d||1===this.d?t===ht:t===wt)&&(0===this.d||3===this.d?e===vt:e===bt)}}}class Me{constructor(t){this.d=t,this.s=0,this.timeout=je,this.done=!1}tick(t){this.done||(this.timeout-=t,this.timeout<0&&(this.s+=1,this.timeout=je),this.s>4&&(this.done=!0))}}let Ne,_e,Se,Te,Ae,Ce=1;const Oe=()=>je*ct(1,3)+ct(0,je),Le=()=>{Be(),Ne=Date.now(),_e=Ne,Te=Oe(),Ae=300,kt.set([]),Nt.set(0),_t.set(0),Ce=1,Se=requestAnimationFrame(De),xt.set(!0)},Be=()=>{cancelAnimationFrame(Se),xt.set(!1)},De=()=>{const t=Date.now(),e=t-_e;if(Ae<0){let t=u(Nt),n=u(_t),o=[];const r=u(jt).filter((t=>(t.tick(e),!t.done)));for(const c of u(kt))if(c.tick(e),c.done){if(!c.success){n+=1,r.push(new Me(0===c.d||3===c.d?0:1)),Ae=300,o=[];break}t+=1}else o.push(c);Ce=t<5?1:t<15?2:3,Te-=e,Te<=0&&(Te=Oe(),n<3&&o.length<Ce&&o.push(new Ee)),kt.set(o),jt.set(r),Nt.set(t),_t.set(n)}else Ae-=e;_e=t,Se=requestAnimationFrame(De)};function Re(t,e,n){const o=t.slice();return o[4]=e[n],o}function qe(t,e,n){const o=t.slice();return o[7]=e[n],o}function ze(t){let e,n,o,r,c,i,s,a,l,f,u,$,p;e=new ne({}),o=new Yt({}),c=new ce({}),s=new Gt({}),l=new Zt({});let m=t[2],d=[];for(let e=0;e<m.length;e+=1)d[e]=Pe(qe(t,m,e));const v=t=>U(d[t],1,1,(()=>{d[t]=null}));let b=t[3],k=[];for(let e=0;e<b.length;e+=1)k[e]=Ye(Re(t,b,e));const j=t=>U(k[t],1,1,(()=>{k[t]=null}));return{c(){G(e.$$.fragment),n=y(),G(o.$$.fragment),r=y(),G(c.$$.fragment),i=y(),G(s.$$.fragment),a=y(),G(l.$$.fragment),f=y();for(let t=0;t<d.length;t+=1)d[t].c();u=y();for(let t=0;t<k.length;t+=1)k[t].c();$=x()},m(t,m){K(e,t,m),g(t,n,m),K(o,t,m),g(t,r,m),K(c,t,m),g(t,i,m),K(s,t,m),g(t,a,m),K(l,t,m),g(t,f,m);for(let e=0;e<d.length;e+=1)d[e].m(t,m);g(t,u,m);for(let e=0;e<k.length;e+=1)k[e].m(t,m);g(t,$,m),p=!0},p(t,e){if(4&e){let n;for(m=t[2],n=0;n<m.length;n+=1){const o=qe(t,m,n);d[n]?(d[n].p(o,e),J(d[n],1)):(d[n]=Pe(o),d[n].c(),J(d[n],1),d[n].m(u.parentNode,u))}for(H(),n=m.length;n<d.length;n+=1)v(n);I()}if(8&e){let n;for(b=t[3],n=0;n<b.length;n+=1){const o=Re(t,b,n);k[n]?(k[n].p(o,e),J(k[n],1)):(k[n]=Ye(o),k[n].c(),J(k[n],1),k[n].m($.parentNode,$))}for(H(),n=b.length;n<k.length;n+=1)j(n);I()}},i(t){if(!p){J(e.$$.fragment,t),J(o.$$.fragment,t),J(c.$$.fragment,t),J(s.$$.fragment,t),J(l.$$.fragment,t);for(let t=0;t<m.length;t+=1)J(d[t]);for(let t=0;t<b.length;t+=1)J(k[t]);p=!0}},o(t){U(e.$$.fragment,t),U(o.$$.fragment,t),U(c.$$.fragment,t),U(s.$$.fragment,t),U(l.$$.fragment,t),d=d.filter(Boolean);for(let t=0;t<d.length;t+=1)U(d[t]);k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)U(k[t]);p=!1},d(t){Q(e,t),t&&h(n),Q(o,t),t&&h(r),Q(c,t),t&&h(i),Q(s,t),t&&h(a),Q(l,t),t&&h(f),w(d,t),t&&h(u),w(k,t),t&&h($)}}}function Pe(t){let e,n;return e=new Ut({props:{d:t[7].d,s:t[7].s}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.d=t[7].d),4&n&&(o.s=t[7].s),e.$set(o)},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function Ye(t){let e,n;return e=new be({props:{d:t[4].d,s:t[4].s}}),{c(){G(e.$$.fragment)},m(t,o){K(e,t,o),n=!0},p(t,n){const o={};8&n&&(o.d=t[4].d),8&n&&(o.s=t[4].s),e.$set(o)},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){U(e.$$.fragment,t),n=!1},d(t){Q(e,t)}}}function Fe(t){let e,n,o,r;n=new ke({}),n.$on("click",Le);let c=t[1]&&ze(t);return{c(){e=v("div"),G(n.$$.fragment),o=y(),c&&c.c(),E(e,"class","game svelte-r1t3ki"),N(e,"open",t[0])},m(t,i){g(t,e,i),K(n,e,null),d(e,o),c&&c.m(e,null),r=!0},p(t,[n]){t[1]?c?(c.p(t,n),2&n&&J(c,1)):(c=ze(t),c.c(),J(c,1),c.m(e,null)):c&&(H(),U(c,1,1,(()=>{c=null})),I()),1&n&&N(e,"open",t[0])},i(t){r||(J(n.$$.fragment,t),J(c),r=!0)},o(t){U(n.$$.fragment,t),U(c),r=!1},d(t){t&&h(e),Q(n),c&&c.d()}}}function Xe(t,e,n){let o,r,c,i;return $(t,yt,(t=>n(0,o=t))),$(t,xt,(t=>n(1,r=t))),$(t,kt,(t=>n(2,c=t))),$(t,jt,(t=>n(3,i=t))),dt("/nintenday/game.jpg"),[o,r,c,i]}class He extends et{constructor(t){super(),tt(this,t,Xe,Fe,i,{})}}function Ie(t,e,n){const o=t.slice();return o[1]=e[n],o}function Je(t){let n,o;const r=[t[1]];let c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return n=new qt({props:c}),{c(){G(n.$$.fragment)},m(t,e){K(n,t,e),o=!0},p(t,e){const o=1&e?W(r,[V(t[1])]):{};n.$set(o)},i(t){o||(J(n.$$.fragment,t),o=!0)},o(t){U(n.$$.fragment,t),o=!1},d(t){Q(n,t)}}}function Ue(t){let e,n,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=Je(Ie(t,o,e));const c=t=>U(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=x()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);g(t,e,o),n=!0},p(t,n){if(1&n){let i;for(o=t[0],i=0;i<o.length;i+=1){const c=Ie(t,o,i);r[i]?(r[i].p(c,n),J(r[i],1)):(r[i]=Je(c),r[i].c(),J(r[i],1),r[i].m(e.parentNode,e))}for(H(),i=o.length;i<r.length;i+=1)c(i);I()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)J(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)U(r[t]);n=!1},d(t){w(r,t),t&&h(e)}}}function We(t){let e,n,o,r,c;return n=new rt({props:{$$slots:{default:[Ue]},$$scope:{ctx:t}}}),r=new He({}),{c(){e=v("main"),G(n.$$.fragment),o=y(),G(r.$$.fragment)},m(t,i){g(t,e,i),K(n,e,null),d(e,o),K(r,e,null),c=!0},p(t,[e]){const o={};16&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){c||(J(n.$$.fragment,t),J(r.$$.fragment,t),c=!0)},o(t){U(n.$$.fragment,t),U(r.$$.fragment,t),c=!1},d(t){t&&h(e),Q(n),Q(r)}}}function Ve(t){return[new Array(10).fill({}).map(((t,e)=>({...t,filename:`g${`0${e+1}`.slice(-2)}.jpg`})))]}return new class extends et{constructor(t){super(),tt(this,t,Ve,We,i,{})}}({target:document.body})}();
