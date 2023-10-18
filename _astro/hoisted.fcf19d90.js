const L=t=>history.state&&history.replaceState(t,""),g=!!document.startViewTransition,b=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),S=t=>location.pathname===t.pathname&&location.search===t.search,v=t=>document.dispatchEvent(new Event(t)),x=()=>v("astro:page-load"),M=()=>{let t=document.createElement("div");t.setAttribute("aria-live","assertive"),t.setAttribute("aria-atomic","true"),t.setAttribute("style","position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px"),document.body.append(t),setTimeout(()=>{let e=document.title||document.querySelector("h1")?.textContent||location.pathname;t.textContent=e},60)},h="data-astro-transition-persist";let A,p=0;history.state?(p=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):b()&&history.replaceState({index:p,scrollX,scrollY,intraPage:!1},"");const R=(t,e)=>{let r=!1,s=!1;return(...a)=>{if(r){s=!0;return}t(...a),r=!0,setTimeout(()=>{s&&(s=!1,t(...a)),r=!1},e)}};async function $(t){try{const e=await fetch(t),r=e.headers.get("content-type")?.replace(/;.*$/,"");return r!=="text/html"&&r!=="application/xhtml+xml"?null:{html:await e.text(),redirected:e.redirected?e.url:void 0,mediaType:r}}catch{return null}}function k(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function P(){for(const t of document.scripts)t.dataset.astroExec=""}function F(){let t=Promise.resolve();for(const e of Array.from(document.scripts)){if(e.dataset.astroExec==="")continue;const r=document.createElement("script");r.innerHTML=e.innerHTML;for(const s of e.attributes){if(s.name==="src"){const a=new Promise(f=>{r.onload=f});t=t.then(()=>a)}r.setAttribute(s.name,s.value)}r.dataset.astroExec="",e.replaceWith(r)}return t}function I(t){const e=t.effect;return!e||!(e instanceof KeyframeEffect)||!e.target?!1:window.getComputedStyle(e.target,e.pseudoElement).animationIterationCount==="infinite"}const q=(t,e,r)=>{const s=!S(t);let a=!1;t.href!==location.href&&(e?history.replaceState({...history.state},"",t.href):(history.replaceState({...history.state,intraPage:r},""),history.pushState({index:++p,scrollX:0,scrollY:0},"",t.href)),s&&(scrollTo({left:0,top:0,behavior:"instant"}),a=!0)),t.hash?location.href=t.href:a||scrollTo({left:0,top:0,behavior:"instant"})};async function T(t,e,r,s,a){const f=n=>{const i=n.getAttribute(h),l=i&&t.head.querySelector(`[${h}="${i}"]`);if(l)return l;if(n.matches("link[rel=stylesheet]")){const d=n.getAttribute("href");return t.head.querySelector(`link[rel=stylesheet][href="${d}"]`)}return null},u=()=>{const n=document.activeElement;if(n?.closest("[data-astro-transition-persist]")){if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){const i=n.selectionStart,l=n.selectionEnd;return{activeElement:n,start:i,end:l}}return{activeElement:n}}else return{activeElement:null}},m=({activeElement:n,start:i,end:l})=>{n&&(n.focus(),(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement)&&(n.selectionStart=i,n.selectionEnd=l))},y=()=>{const n=document.documentElement,i=[...n.attributes].filter(({name:o})=>(n.removeAttribute(o),o.startsWith("data-astro-")));[...t.documentElement.attributes,...i].forEach(({name:o,value:c})=>n.setAttribute(o,c));for(const o of document.scripts)for(const c of t.scripts)if(!o.src&&o.textContent===c.textContent||o.src&&o.type===c.type&&o.src===c.src){c.dataset.astroExec="";break}for(const o of Array.from(document.head.children)){const c=f(o);c?c.remove():o.remove()}document.head.append(...t.head.children);const l=document.body,d=u();document.body.replaceWith(t.body);for(const o of l.querySelectorAll(`[${h}]`)){const c=o.getAttribute(h),w=document.querySelector(`[${h}="${c}"]`);w&&w.replaceWith(o)}m(d),s?scrollTo(s.scrollX,s.scrollY):q(e,r.history==="replace",!1),v("astro:after-swap")},E=[];for(const n of t.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${h}="${n.getAttribute(h)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)){const i=document.createElement("link");i.setAttribute("rel","preload"),i.setAttribute("as","style"),i.setAttribute("href",n.getAttribute("href")),E.push(new Promise(l=>{["load","error"].forEach(d=>i.addEventListener(d,l)),document.head.append(i)}))}if(E.length&&await Promise.all(E),a==="animate"){const n=document.getAnimations();document.documentElement.dataset.astroTransitionFallback="old";const i=document.getAnimations().filter(o=>!n.includes(o)&&!I(o)),l=Promise.all(i.map(o=>o.finished)),d=()=>{y(),document.documentElement.dataset.astroTransitionFallback="new"};await l,d()}else y()}async function H(t,e,r,s){let a;const f=e.href,u=await $(f);if(u===null){location.href=f;return}u.redirected&&(e=new URL(u.redirected)),A??=new DOMParser;const m=A.parseFromString(u.html,u.mediaType);if(m.querySelectorAll("noscript").forEach(y=>y.remove()),!m.querySelector('[name="astro-view-transitions-enabled"]')){location.href=f;return}s||history.replaceState({...history.state,scrollX,scrollY},""),document.documentElement.dataset.astroTransition=t,g?a=document.startViewTransition(()=>T(m,e,r,s)).finished:a=T(m,e,r,s,k());try{await a}finally{await F(),P(),x(),M()}}function X(t,e){if(!b()){location.href=t;return}const r=new URL(t,location.href);location.origin===r.origin&&S(r)?q(r,e?.history==="replace",!0):H("forward",r,e??{})}function Y(t){if(!b()&&t.state){history.scrollRestoration&&(history.scrollRestoration="manual"),location.reload();return}if(t.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}history.scrollRestoration&&(history.scrollRestoration="manual");const e=history.state;if(e.intraPage)scrollTo(e.scrollX,e.scrollY);else{const r=e.index,s=r>p?"forward":"back";p=r,H(s,new URL(location.href),{},e)}}if(g||k()!=="none"){addEventListener("popstate",Y),addEventListener("load",x);const t=()=>{L({...history.state,scrollX,scrollY})};"onscrollend"in window?addEventListener("scrollend",t):addEventListener("scroll",R(t,300)),P()}function C(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function K(t){if(document.querySelector(`link[rel=prefetch][href="${t}"]`))return;if(navigator.connection){let r=navigator.connection;if(r.saveData||/(2|3)g/.test(r.effectiveType||""))return}let e=document.createElement("link");e.setAttribute("rel","prefetch"),e.setAttribute("href",t),document.head.append(e)}(g||C()!=="none")&&(document.addEventListener("click",t=>{let e=t.target;e instanceof Element&&e.tagName!=="A"&&(e=e.closest("a")),!(!e||!(e instanceof HTMLAnchorElement)||e.dataset.astroReload!==void 0||e.hasAttribute("download")||!e.href||e.target&&e.target!=="_self"||e.origin!==location.origin||t.button!==0||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey||t.defaultPrevented)&&(t.preventDefault(),X(e.href,{history:e.dataset.astroHistory==="replace"?"replace":"auto"}))}),["mouseenter","touchstart","focus"].forEach(t=>{document.addEventListener(t,e=>{if(e.target instanceof HTMLAnchorElement){let r=e.target;r.origin===location.origin&&r.pathname!==location.pathname&&b()&&K(r.pathname)}},{passive:!0,capture:!0})}));
