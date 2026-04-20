(()=>{var e={};e.id=64,e.ids=[64],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5463:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d}),a(9044),a(8286),a(5866),a(7764);var t=a(3191),i=a(8716),s=a(7922),o=a.n(s),l=a(5231),n={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>l[e]);a.d(r,n);let d=["",{children:["(main)",{children:["Profile",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,9044)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\Profile\\page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8286)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\layout.js"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,7764)),"D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\RAKSHIT\\PROJECTS\\MAIN PROJECT\\WORKING MODEL\\app\\(main)\\Profile\\page.js"],m="/(main)/Profile/page",p={require:a,loadChunk:()=>Promise.resolve()},u=new t.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(main)/Profile/page",pathname:"/Profile",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},9477:(e,r,a)=>{Promise.resolve().then(a.bind(a,5114))},5114:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>u});var t=a(326),i=a(7577),s=a(2147),o=a(2881);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,o.Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]),n=(0,o.Z)("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]),d=(0,o.Z)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);var c=a(2714);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let m=(0,o.Z)("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);var p=a(7358);function u(){let[e,r]=(0,i.useState)(null),[a,o]=(0,i.useState)(!0),[u,g]=(0,i.useState)(!1),[x,h]=(0,i.useState)({}),f=async()=>{try{let e=await s.n.updateMyUserData(x);r(e),g(!1)}catch(e){console.error("Error updating profile:",e)}};return a?t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"50vh"},children:t.jsx("div",{style:{width:"60px",height:"60px",background:"var(--shimmer)",borderRadius:"50%"}})}):(0,t.jsxs)(t.Fragment,{children:[t.jsx("style",{children:`
        .profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-white) 0%, var(--secondary-white) 100%);
          padding: 2rem;
        }
        .profile-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .profile-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .profile-content {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }
        .profile-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px var(--shadow-medium);
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--silver) 0%, var(--silver-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary-white);
          box-shadow: 0 15px 30px var(--shadow-light);
        }
        .profile-info { text-align: center; }
        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          color: var(--grey-800);
          margin-bottom: 0.5rem;
        }
        .profile-email {
          color: var(--grey-600);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .profile-bio {
          color: var(--grey-700);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .stat-item {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow-light);
        }
        .stat-icon {
          width: 32px;
          height: 32px;
          color: var(--silver);
          margin: 0 auto 0.75rem;
        }
        .stat-number {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--grey-800);
          margin-bottom: 0.25rem;
        }
        .stat-label {
          color: var(--grey-600);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .edit-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0 auto;
        }
        .edit-button:hover {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
        .edit-form { display: grid; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-label { font-weight: 600; color: var(--grey-700); }
        .form-input {
          padding: 0.75rem 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-800);
          outline: none;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: var(--silver);
          box-shadow: 0 0 0 3px var(--glass-bg);
        }
        .form-textarea { min-height: 100px; resize: vertical; }
        .form-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .save-button {
          padding: 0.75rem 2rem;
          background: var(--silver);
          border: none;
          border-radius: 12px;
          color: var(--primary-white);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .save-button:hover {
          background: var(--silver-dark);
          transform: translateY(-2px);
        }
        .cancel-button {
          padding: 0.75rem 2rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cancel-button:hover { background: var(--glass-bg); }
        @media (max-width: 768px) {
          .profile-title { font-size: 2rem; }
          .profile-stats { grid-template-columns: 1fr; }
          .form-buttons { flex-direction: column; }
        }
      `}),(0,t.jsxs)("div",{className:"profile-container",children:[t.jsx("div",{className:"profile-header",children:t.jsx("h1",{className:"profile-title",children:"Your Profile"})}),(0,t.jsxs)("div",{className:"profile-content",children:[(0,t.jsxs)("div",{className:"profile-card",children:[t.jsx("div",{className:"profile-avatar",children:e?.full_name?.[0]?.toUpperCase()||"U"}),t.jsx("div",{className:"profile-info",children:u?(0,t.jsxs)("div",{className:"edit-form",children:[(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Full Name"}),t.jsx("input",{className:"form-input",value:x.full_name,onChange:e=>h({...x,full_name:e.target.value}),placeholder:"Enter your full name"})]}),(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Bio"}),t.jsx("textarea",{className:"form-input form-textarea",value:x.bio,onChange:e=>h({...x,bio:e.target.value}),placeholder:"Tell us about yourself..."})]}),(0,t.jsxs)("div",{className:"form-buttons",children:[t.jsx("button",{className:"save-button",onClick:f,children:"Save Changes"}),t.jsx("button",{className:"cancel-button",onClick:()=>g(!1),children:"Cancel"})]})]}):(0,t.jsxs)(t.Fragment,{children:[t.jsx("h2",{className:"profile-name",children:e?.full_name||"User"}),(0,t.jsxs)("p",{className:"profile-email",children:[t.jsx(l,{size:16,style:{display:"inline",marginRight:"0.5rem"}}),e?.email]}),e?.bio&&t.jsx("p",{className:"profile-bio",children:e.bio}),(0,t.jsxs)("button",{className:"edit-button",onClick:()=>g(!0),children:[t.jsx(n,{size:16})," Edit Profile"]})]})})]}),(0,t.jsxs)("div",{className:"profile-stats",children:[(0,t.jsxs)("div",{className:"stat-item",children:[t.jsx(d,{className:"stat-icon"}),t.jsx("div",{className:"stat-number",children:"42"}),t.jsx("div",{className:"stat-label",children:"Favorites"})]}),(0,t.jsxs)("div",{className:"stat-item",children:[t.jsx(c.Z,{className:"stat-icon"}),t.jsx("div",{className:"stat-number",children:"128"}),t.jsx("div",{className:"stat-label",children:"Watched"})]}),(0,t.jsxs)("div",{className:"stat-item",children:[t.jsx(m,{className:"stat-icon"}),t.jsx("div",{className:"stat-number",children:"5"}),t.jsx("div",{className:"stat-label",children:"Reviews"})]}),(0,t.jsxs)("div",{className:"stat-item",children:[t.jsx(p.Z,{className:"stat-icon"}),t.jsx("div",{className:"stat-number",children:e?.created_date?new Date(e.created_date).getFullYear():"2024"}),t.jsx("div",{className:"stat-label",children:"Member Since"})]})]})]})]})]})}},2147:(e,r,a)=>{"use strict";a.d(r,{n:()=>i});let t={id:"user123",full_name:"Rakshit",email:"rakshitawati@gmail.com",created_date:"2023-10-26T10:00:00Z",bio:"Just a cinephile exploring different worlds, one movie at a time.",notifications:!0,autoplay:!0,quality:"hd",privacy:"friends"},i={me:async()=>(console.log("Fetching mock user data..."),Promise.resolve(t)),updateMyUserData:async e=>(console.log("Updating mock user data with:",e),Object.assign(t,e),Promise.resolve(t)),logout:async()=>(console.log("Logging out..."),window.location.href="/",Promise.resolve())}},7358:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,a(2881).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},9044:(e,r,a)=>{"use strict";a.r(r),a.d(r,{$$typeof:()=>o,__esModule:()=>s,default:()=>l});var t=a(8570);let i=(0,t.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\Profile\page.js`),{__esModule:s,$$typeof:o}=i;i.default;let l=(0,t.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\Profile\page.js#default`)}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[948,471,939,387],()=>a(5463));module.exports=t})();