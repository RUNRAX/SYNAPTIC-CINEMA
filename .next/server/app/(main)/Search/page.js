(()=>{var e={};e.id=35,e.ids=[35],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7607:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c}),a(4843),a(8286),a(5866),a(7764);var t=a(3191),s=a(8716),i=a(7922),l=a.n(i),n=a(5231),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);a.d(r,o);let c=["",{children:["(main)",{children:["Search",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,4843)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\Search\\page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8286)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\layout.js"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,7764)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\Search\\page.js"],p="/(main)/Search/page",m={require:a,loadChunk:()=>Promise.resolve()},u=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(main)/Search/page",pathname:"/Search",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2533:(e,r,a)=>{Promise.resolve().then(a.bind(a,1116))},1116:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>d});var t=a(326),s=a(7577),i=a(8307),l=a(4019);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,a(2881).Z)("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);var o=a(9039),c=a(5047);function d(){let e=(0,c.useRouter)(),[r,a]=(0,s.useState)(""),[d,p]=(0,s.useState)([]),[m,u]=(0,s.useState)(!1),[h,g]=(0,s.useState)({type:"all",genre:"all",year:"all",rating:"all"}),[x,v]=(0,s.useState)(!1),[f,y]=(0,s.useState)("relevance");(0,s.useMemo)(()=>[...new Set(d.map(e=>e.genre).filter(Boolean))],[d]),(0,s.useMemo)(()=>[...new Set(d.map(e=>e.year).filter(Boolean))].sort((e,r)=>r-e),[d]);let b=async()=>{a(""),u(!0);let e=new URLSearchParams;if(Object.entries(h).forEach(([r,a])=>{"all"!==a&&e.append(r,a)}),0===Array.from(e.keys()).length){p([]),u(!1);return}try{let r=await fetch(`http://127.0.0.1:5000/search?${e.toString()}`);if(!r.ok)throw Error(`HTTP error! status: ${r.status}`);let a=await r.json();p([...a.movies||[],...a.series||[]])}catch(e){console.error("Error performing filter search:",e),p([])}finally{u(!1)}},j=(0,s.useMemo)(()=>{let e=[...d];return e.sort((e,r)=>{switch(f){case"year":return(r.year||0)-(e.year||0);case"rating":return(r.vote_average||0)-(e.vote_average||0);case"title":return(e.title||"").localeCompare(r.title||"");default:return 0}}),e},[d,f]);return(0,t.jsxs)(t.Fragment,{children:[t.jsx("style",{children:`
        /* Styles remain unchanged */
        .search-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-white) 0%, var(--secondary-white) 100%);
          padding: 2rem;
        }
        .search-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: header-appear 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes header-appear {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .search-subtitle {
          font-size: 1.1rem;
          color: var(--grey-600);
          line-height: 1.6;
        }
        .search-controls {
          max-width: 900px;
          margin: 0 auto 3rem;
          animation: controls-appear 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }
        @keyframes controls-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-input-container {
          position: relative;
          margin-bottom: 2rem;
        }
        .search-input {
          width: 100%;
          padding: 1.5rem 4.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 25px;
          font-size: 1.1rem;
          color: var(--grey-800);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .search-input:focus {
          border-color: var(--silver);
          box-shadow: 0 20px 40px var(--shadow-light);
          transform: translateY(-4px);
        }
        .search-input::placeholder { color: var(--grey-500); }
        .search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--grey-500);
          transition: all 0.3s ease;
        }
        .search-input:focus + .search-icon {
          color: var(--silver);
          transform: translateY(-50%) scale(1.1);
        }
        .clear-button {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--grey-500);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .clear-button:hover {
          background: var(--glass-bg);
          color: var(--grey-700);
          transform: translateY(-50%) scale(1.1);
        }
        .filter-section {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-section.collapsed { padding: 1rem 2rem; }
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .filter-section.collapsed .filter-header { margin-bottom: 0; }
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-toggle:hover, .filter-toggle.active {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow-light);
        }
        .filter-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          animation: filter-expand 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .filter-section.collapsed .filter-controls { display: none; }
        @keyframes filter-expand {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-label {
          font-weight: 600;
          color: var(--grey-700);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-select {
          padding: 0.75rem 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-800);
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-select:hover, .filter-select:focus {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
          border-color: var(--silver);
        }
        .filter-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        .filter-section.collapsed .filter-actions { display: none; }
        .reset-button {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reset-button:hover {
          background: var(--glass-bg);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
        .results-info {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          color: var(--grey-600);
          animation: results-appear 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes results-appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--grey-500);
          animation: no-results-appear 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes no-results-appear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .no-results-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: var(--grey-400);
        }
        @media (max-width: 768px) {
          .search-title { font-size: 2rem; }
          .filter-controls { grid-template-columns: 1fr; gap: 1rem; }
          .search-input { padding: 1.25rem 4rem; font-size: 1rem; }
          .filter-actions { flex-direction: column; }
        }
          /* Add these styles for the new button */
        .apply-button {
          padding: 0.75rem 1.5rem;
          background: var(--silver);
          border: none;
          border-radius: 12px;
          color: var(--primary-white);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .apply-button:hover {
          background: var(--silver-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
      `}),(0,t.jsxs)("div",{className:"search-container",children:[(0,t.jsxs)("div",{className:"search-header",children:[t.jsx("h1",{className:"search-title",children:"Manual Search"}),t.jsx("p",{className:"search-subtitle",children:"Find exactly what you're looking for with our advanced search and filtering system"})]}),(0,t.jsxs)("div",{className:"search-controls",children:[(0,t.jsxs)("div",{className:"search-input-container",children:[t.jsx("input",{type:"text",className:"search-input",placeholder:"Search movies, series, genres...",value:r,onChange:e=>a(e.target.value)}),t.jsx(i.Z,{className:"search-icon",size:24}),r&&t.jsx("button",{className:"clear-button",onClick:()=>{a(""),p([])},children:t.jsx(l.Z,{size:20})})]}),(0,t.jsxs)("div",{className:`filter-section ${x?"":"collapsed"}`,children:[t.jsx("div",{className:"filter-header",children:(0,t.jsxs)("button",{className:`filter-toggle ${x?"active":""}`,onClick:()=>v(!x),children:[t.jsx(n,{size:16})," Advanced Filters"]})}),(0,t.jsxs)("div",{className:"filter-controls",children:[(0,t.jsxs)("div",{className:"filter-group",children:[t.jsx("label",{className:"filter-label",children:"Content Type"}),(0,t.jsxs)("select",{className:"filter-select",value:h.type,onChange:e=>g({...h,type:e.target.value}),children:[t.jsx("option",{value:"all",children:"All Types"}),t.jsx("option",{value:"movie",children:"Movies Only"}),t.jsx("option",{value:"tv",children:"Series Only"})]})]}),(0,t.jsxs)("div",{className:"filter-group",children:[t.jsx("label",{className:"filter-label",children:"Genre"}),(0,t.jsxs)("select",{className:"filter-select",value:h.genre,onChange:e=>g({...h,genre:e.target.value}),children:[t.jsx("option",{value:"all",children:"All Genres"}),["Action","Adventure","Comedy","Drama","Fantasy","Horror","Mystery","Romance","Sci-Fi","Thriller"].map(e=>t.jsx("option",{value:e,children:e},e))]})]}),(0,t.jsxs)("div",{className:"filter-group",children:[t.jsx("label",{className:"filter-label",children:"Release Year"}),(0,t.jsxs)("select",{className:"filter-select",value:h.year,onChange:e=>g({...h,year:e.target.value}),children:[t.jsx("option",{value:"all",children:"All Years"}),Array.from({length:30},(e,r)=>new Date().getFullYear()-r).map(e=>t.jsx("option",{value:e,children:e},e))]})]}),(0,t.jsxs)("div",{className:"filter-group",children:[t.jsx("label",{className:"filter-label",children:"Min Rating"}),(0,t.jsxs)("select",{className:"filter-select",value:h.rating,onChange:e=>g({...h,rating:e.target.value}),children:[t.jsx("option",{value:"all",children:"Any Rating"}),t.jsx("option",{value:"8",children:"8.0+ Excellent"}),t.jsx("option",{value:"7",children:"7.0+ Good"}),t.jsx("option",{value:"6",children:"6.0+ Decent"})]})]}),(0,t.jsxs)("div",{className:"filter-group",children:[t.jsx("label",{className:"filter-label",children:"Sort By"}),(0,t.jsxs)("select",{className:"filter-select",value:f,onChange:e=>y(e.target.value),children:[t.jsx("option",{value:"relevance",children:"Relevance"}),t.jsx("option",{value:"title",children:"Title (A-Z)"}),t.jsx("option",{value:"year",children:"Newest First"}),t.jsx("option",{value:"rating",children:"Highest Rated"})]})]})]}),(0,t.jsxs)("div",{className:"filter-actions",children:[t.jsx("button",{className:"reset-button",onClick:()=>{g({type:"all",genre:"all",year:"all",rating:"all"}),y("relevance")},children:"Reset Filters"}),t.jsx("button",{className:"apply-button",onClick:b,children:"Apply Filters"})]})]})]}),r&&!m&&(0,t.jsxs)("div",{className:"results-info",children:["Found ",j.length,' results for "',r,'"']}),r&&!m&&0===j.length?(0,t.jsxs)("div",{className:"no-results",children:[t.jsx(i.Z,{className:"no-results-icon"}),t.jsx("h3",{style:{marginBottom:"1rem",fontSize:"1.5rem",fontWeight:"600"},children:"No results found"}),t.jsx("p",{children:"Try adjusting your search terms or filters to find what you're looking for"})]}):t.jsx(o.Z,{movies:j,loading:m,onMovieClick:r=>{r&&r.id&&e.push(`/MovieDetails?id=${r.id}&type=${r.type}`)}})]})]})}},1114:(e,r,a)=>{"use strict";a.d(r,{Z:()=>n});var t=a(326),s=a(7577),i=a(4893),l=a(3734);a(3150);let n=(0,s.memo)(function({movie:e,onClick:r,onHover:a}){let[n,o]=(0,s.useState)(!1),[c,d]=(0,s.useState)(!1);return(0,t.jsxs)("div",{className:`movie-card ${n?"is-hovered":""}`,onMouseEnter:()=>{o(!0),a&&a(e)},onMouseLeave:()=>o(!1),onClick:()=>r(e),children:[t.jsx("div",{className:"movie-card-shimmer"}),e.poster?t.jsx("img",{src:e.poster,alt:e.title,className:"movie-poster",loading:"lazy",onLoad:()=>d(!0),style:{opacity:c?1:0}}):t.jsx("div",{className:"poster-placeholder",children:"No Image"}),t.jsx("div",{className:"play-overlay",children:t.jsx(i.Z,{size:28,color:"var(--grey-700)",fill:"var(--grey-700)"})}),(0,t.jsxs)("div",{className:"movie-info",children:[t.jsx("h3",{className:"movie-title",children:e.title}),(0,t.jsxs)("div",{className:"movie-meta",children:[t.jsx("span",{className:"movie-year",children:e.year}),e.rating&&(0,t.jsxs)("div",{className:"movie-rating",children:[t.jsx(l.Z,{size:14,fill:"var(--silver)",color:"var(--silver)"}),e.rating]})]}),e.genre&&t.jsx("div",{className:"movie-genre",children:e.genre})]})]})})},9979:(e,r,a)=>{"use strict";a.d(r,{Z:()=>s});var t=a(326);function s(){return(0,t.jsxs)("div",{className:"movie-card-skeleton",children:[t.jsx("div",{className:"skeleton-image"}),(0,t.jsxs)("div",{className:"skeleton-text-container",children:[t.jsx("div",{className:"skeleton-text"}),t.jsx("div",{className:"skeleton-text short"})]}),t.jsx("div",{className:"shimmer-wrapper"})]})}a(7577)},9039:(e,r,a)=>{"use strict";a.d(r,{Z:()=>l});var t=a(326);a(7577);var s=a(1114),i=a(9979);function l({movies:e,onMovieClick:r,loading:a=!1}){return t.jsx("div",{className:"movie-grid",children:a?Array.from({length:12}).map((e,r)=>t.jsx(i.Z,{},r)):e.map((e,a)=>t.jsx("div",{className:"movie-grid-item",style:{animationDelay:`${.05*a}s`},children:t.jsx(s.Z,{movie:e,onClick:r})},e.id))})}a(5004)},4893:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,a(2881).Z)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]])},3734:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,a(2881).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},4019:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,a(2881).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},4843:(e,r,a)=>{"use strict";a.r(r),a.d(r,{$$typeof:()=>l,__esModule:()=>i,default:()=>n});var t=a(8570);let s=(0,t.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\Search\page.js`),{__esModule:i,$$typeof:l}=s;s.default;let n=(0,t.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\Search\page.js#default`)},3150:()=>{},5004:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[948,471,939,387],()=>a(7607));module.exports=t})();