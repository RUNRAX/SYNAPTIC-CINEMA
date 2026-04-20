exports.id=387,exports.ids=[387],exports.modules={4203:(a,e,t)=>{Promise.resolve().then(t.bind(t,7807))},16:()=>{},2620:(a,e,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},7807:(a,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>k});var r=t(326),i=t(7626),s=t.n(i),n=t(7577),o=t(434),d=t(5047),l=t(2881);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let p=(0,l.Z)("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);var c=t(2714),x=t(8307);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let b=(0,l.Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var g=t(8378),h=t(2302),m=t(4412),f=t(1810);function u(){return(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{children:`
        .persistent-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1; /* Place it behind all other content */
        }
      `}),(0,r.jsxs)("div",{className:"persistent-background",children:[r.jsx(f.Z,{}),r.jsx(h.Z,{}),r.jsx(m.Z,{})]})]})}let v=[{title:"Home",href:"/Home",icon:p},{title:"Synaptic",href:"/Synaptic",icon:c.Z},{title:"Search",href:"/Search",icon:x.Z},{title:"Profile",href:"/Profile",icon:b},{title:"Settings",href:"/Settings",icon:g.Z}];function k({children:a}){let e=(0,d.usePathname)(),[t,i]=(0,n.useState)(!1),[l,p]=(0,n.useState)(!1),c=!e?.includes("Synaptic");return t?(0,r.jsxs)("div",{className:"jsx-b2d9febb386b78de app-container",children:[c&&r.jsx(u,{}),(0,r.jsxs)("nav",{className:"jsx-b2d9febb386b78de sidebar",children:[r.jsx("div",{className:"jsx-b2d9febb386b78de sidebar-brand",children:r.jsx("h1",{className:"jsx-b2d9febb386b78de brand-text",children:"Synaptic"})}),r.jsx("div",{className:"jsx-b2d9febb386b78de nav-menu",children:v.map(a=>r.jsx("div",{className:"jsx-b2d9febb386b78de nav-item",children:(0,r.jsxs)(o.default,{href:a.href,className:`nav-link ${e===a.href?"active":""}`,children:[r.jsx(a.icon,{className:"nav-icon"}),a.title]})},a.title))})]}),r.jsx("main",{className:`jsx-b2d9febb386b78de main-content ${l?"transitioning":""}`,children:r.jsx("div",{className:"jsx-b2d9febb386b78de page-container",children:a})}),r.jsx(s(),{id:"b2d9febb386b78de",children:'.app-container.jsx-b2d9febb386b78de{min-height:100vh;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;background:-webkit-linear-gradient(315deg,var(--primary-white)0%,var(--secondary-white)100%);background:-moz-linear-gradient(315deg,var(--primary-white)0%,var(--secondary-white)100%);background:-o-linear-gradient(315deg,var(--primary-white)0%,var(--secondary-white)100%);background:linear-gradient(135deg,var(--primary-white)0%,var(--secondary-white)100%);position:relative}.app-container.jsx-b2d9febb386b78de::before{content:"";position:fixed;top:0;left:0;right:0;bottom:0;background:-webkit-radial-gradient(20%80%,circle,var(--glass-bg)0%,transparent 50%),-webkit-radial-gradient(80%20%,circle,var(--glass-bg)0%,transparent 50%);background:-moz-radial-gradient(20%80%,circle,var(--glass-bg)0%,transparent 50%),-moz-radial-gradient(80%20%,circle,var(--glass-bg)0%,transparent 50%);background:-o-radial-gradient(20%80%,circle,var(--glass-bg)0%,transparent 50%),-o-radial-gradient(80%20%,circle,var(--glass-bg)0%,transparent 50%);background:radial-gradient(circle at 20%80%,var(--glass-bg)0%,transparent 50%),radial-gradient(circle at 80%20%,var(--glass-bg)0%,transparent 50%);pointer-events:none;z-index:0}.sidebar.jsx-b2d9febb386b78de{width:280px;background:var(--glass-bg);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-right:1px solid var(--glass-border);padding:2rem 0;position:fixed;height:100vh;z-index:100;-webkit-transition:all.4s cubic-bezier(.4,0,.2,1);-moz-transition:all.4s cubic-bezier(.4,0,.2,1);-o-transition:all.4s cubic-bezier(.4,0,.2,1);transition:all.4s cubic-bezier(.4,0,.2,1)}.sidebar-brand.jsx-b2d9febb386b78de{padding:0 2rem 3rem;border-bottom:1px solid var(--glass-border);margin-bottom:2rem}.brand-text.jsx-b2d9febb386b78de{font-size:1.75rem;font-weight:700;background:-webkit-linear-gradient(315deg,var(--grey-800)0%,var(--silver)100%);background:-moz-linear-gradient(315deg,var(--grey-800)0%,var(--silver)100%);background:-o-linear-gradient(315deg,var(--grey-800)0%,var(--silver)100%);background:linear-gradient(135deg,var(--grey-800)0%,var(--silver)100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-.02em}.nav-menu.jsx-b2d9febb386b78de{padding:0 1rem}.nav-item.jsx-b2d9febb386b78de{margin-bottom:.5rem}.nav-link.jsx-b2d9febb386b78de{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;padding:1rem 1.5rem;color:var(--grey-600);text-decoration:none;-webkit-border-radius:16px;-moz-border-radius:16px;border-radius:16px;-webkit-transition:all.3s cubic-bezier(.4,0,.2,1);-moz-transition:all.3s cubic-bezier(.4,0,.2,1);-o-transition:all.3s cubic-bezier(.4,0,.2,1);transition:all.3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;font-weight:500}.nav-link.jsx-b2d9febb386b78de::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:-webkit-linear-gradient(left,transparent,var(--glass-bg),transparent);background:-moz-linear-gradient(left,transparent,var(--glass-bg),transparent);background:-o-linear-gradient(left,transparent,var(--glass-bg),transparent);background:linear-gradient(90deg,transparent,var(--glass-bg),transparent);-webkit-transition:left.5s ease;-moz-transition:left.5s ease;-o-transition:left.5s ease;transition:left.5s ease}.nav-link.jsx-b2d9febb386b78de:hover::before{left:100%}.nav-link.jsx-b2d9febb386b78de:hover,.nav-link.active.jsx-b2d9febb386b78de{color:var(--grey-800);background:var(--glass-bg);-webkit-transform:translatey(-2px);-moz-transform:translatey(-2px);-ms-transform:translatey(-2px);-o-transform:translatey(-2px);transform:translatey(-2px);-webkit-box-shadow:0 10px 25px var(--shadow-light);-moz-box-shadow:0 10px 25px var(--shadow-light);box-shadow:0 10px 25px var(--shadow-light)}.nav-icon.jsx-b2d9febb386b78de{width:24px;height:24px;margin-right:1rem}.main-content.jsx-b2d9febb386b78de{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1;margin-left:280px;min-height:100vh;position:relative;z-index:1}.main-content.transitioning.jsx-b2d9febb386b78de{-webkit-animation:page-transition.8s cubic-bezier(.4,0,.2,1);-moz-animation:page-transition.8s cubic-bezier(.4,0,.2,1);-o-animation:page-transition.8s cubic-bezier(.4,0,.2,1);animation:page-transition.8s cubic-bezier(.4,0,.2,1)}@-webkit-keyframes page-transition{0%{-webkit-clip-path:circle(0%at 50%50%);clip-path:circle(0%at 50%50%);opacity:.8;-webkit-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-clip-path:circle(150%at 50%50%);clip-path:circle(150%at 50%50%);opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@-moz-keyframes page-transition{0%{clip-path:circle(0%at 50%50%);opacity:.8;-moz-transform:scale(1.05);transform:scale(1.05)}100%{clip-path:circle(150%at 50%50%);opacity:1;-moz-transform:scale(1);transform:scale(1)}}@-o-keyframes page-transition{0%{clip-path:circle(0%at 50%50%);opacity:.8;-o-transform:scale(1.05);transform:scale(1.05)}100%{clip-path:circle(150%at 50%50%);opacity:1;-o-transform:scale(1);transform:scale(1)}}@keyframes page-transition{0%{-webkit-clip-path:circle(0%at 50%50%);clip-path:circle(0%at 50%50%);opacity:.8;-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-o-transform:scale(1.05);transform:scale(1.05)}100%{-webkit-clip-path:circle(150%at 50%50%);clip-path:circle(150%at 50%50%);opacity:1;-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.page-container.jsx-b2d9febb386b78de{padding:2rem;max-width:1400px;margin:0 auto}@media(max-width:1024px){.sidebar.jsx-b2d9febb386b78de{-webkit-transform:translatex(-100%);-moz-transform:translatex(-100%);-ms-transform:translatex(-100%);-o-transform:translatex(-100%);transform:translatex(-100%)}.main-content.jsx-b2d9febb386b78de{margin-left:0}.page-container.jsx-b2d9febb386b78de{padding:1rem}}'})]}):null}},4412:(a,e,t)=>{"use strict";t.d(e,{Z:()=>i});var r=t(326);function i(){return(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{children:`
        .astronaut-container {
          position: fixed;
          bottom: 20%;
          right: 12%;
          width: 140px;
          height: 180px;
          z-index: 0;
          pointer-events: none;
          animation: astronaut-fall 30s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes astronaut-fall {
          0% { 
            transform: translateY(-20px) translateX(10px) rotate(-8deg);
          }
          25% { 
            transform: translateY(15px) translateX(-15px) rotate(12deg);
          }
          50% { 
            transform: translateY(35px) translateX(20px) rotate(-15deg);
          }
          75% { 
            transform: translateY(10px) translateX(-25px) rotate(18deg);
          }
          100% { 
            transform: translateY(-20px) translateX(10px) rotate(-8deg);
          }
        }

        .astronaut-body {
          position: relative;
          width: 70px;
          height: 100px;
          background: linear-gradient(145deg, #f8f8f8 0%, #e0e0e0 50%, #d0d0d0 100%);
          border-radius: 35px 35px 25px 25px;
          margin: 0 auto;
          border: 4px solid #b0b0b0;
          box-shadow: 
            inset 5px 10px 20px rgba(255,255,255,0.4),
            inset -5px -10px 20px rgba(0,0,0,0.1),
            0 8px 25px rgba(0,0,0,0.15);
          animation: body-sway 8s ease-in-out infinite;
        }

        .dark .astronaut-body {
          background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-color: #404040;
        }

        @keyframes body-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        .chest-control-panel {
          position: absolute;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 30px;
          background: linear-gradient(145deg, #2a2a2a, #404040);
          border-radius: 8px;
          border: 2px solid #606060;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }

        .control-lights {
          position: absolute;
          top: 4px;
          left: 4px;
          display: flex;
          gap: 4px;
        }

        .control-light {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: blink-light 2s ease-in-out infinite;
        }

        .control-light:nth-child(1) {
          background: #00ff00;
          box-shadow: 0 0 8px #00ff00;
          animation-delay: 0s;
        }

        .control-light:nth-child(2) {
          background: #ffff00;
          box-shadow: 0 0 8px #ffff00;
          animation-delay: 0.5s;
        }

        .control-light:nth-child(3) {
          background: #ff0000;
          box-shadow: 0 0 8px #ff0000;
          animation-delay: 1s;
        }

        @keyframes blink-light {
          0%, 70%, 100% { opacity: 1; }
          35% { opacity: 0.3; }
        }

        .astronaut-helmet {
          width: 95px;
          height: 95px;
          background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 30%, #e8e8e8 100%);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: -30px;
          transform: translateX(-50%);
          border: 5px solid #c0c0c0;
          overflow: hidden;
          box-shadow: 
            0 0 30px rgba(255,255,255,0.8),
            inset 5px 10px 20px rgba(255,255,255,0.5),
            inset -5px -10px 20px rgba(0,0,0,0.1);
        }

        .dark .astronaut-helmet {
          background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #0a0a0a 100%);
          border-color: #404040;
          box-shadow: 
            0 0 30px rgba(0,0,0,0.8),
            inset 5px 10px 20px rgba(0,0,0,0.5),
            inset -5px -10px 20px rgba(255,255,255,0.1);
        }

        .helmet-visor {
          width: 80%;
          height: 80%;
          background: linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 
            inset 0 0 30px rgba(0,0,0,0.8),
            inset 10px 10px 20px rgba(0,0,0,0.9);
          border: 2px solid #404040;
        }

        .helmet-reflection-1 {
          position: absolute;
          top: 20%;
          left: 25%;
          width: 30px;
          height: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%);
          border-radius: 60%;
          transform: rotate(-25deg);
        }

        .helmet-reflection-2 {
          position: absolute;
          top: 40%;
          right: 30%;
          width: 15px;
          height: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
          border-radius: 50%;
          transform: rotate(15deg);
        }

        .astronaut-face {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
        }

        .face-features {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .face-skin {
          position: absolute;
          width: 35px;
          height: 35px;
          background: radial-gradient(circle at 30% 30%, #ffdbac 0%, #f4c2a1 60%, #e8a87c 100%);
          border-radius: 50%;
          top: 2px;
          left: 2px;
        }

        .eye {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #2a2a2a;
          border-radius: 50%;
          top: 12px;
        }

        .eye-left { left: 10px; }
        .eye-right { right: 10px; }

        .nose {
          position: absolute;
          width: 3px;
          height: 4px;
          background: rgba(212, 175, 141, 0.6);
          border-radius: 50%;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
        }

        .mouth {
          position: absolute;
          width: 8px;
          height: 2px;
          background: rgba(180, 140, 120, 0.7);
          border-radius: 2px;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
        }

        .arm {
          position: absolute;
          width: 40px;
          height: 75px;
          background: linear-gradient(145deg, #f8f8f8 0%, #e0e0e0 50%, #d0d0d0 100%);
          border-radius: 20px;
          border: 3px solid #b0b0b0;
          top: 20px;
          box-shadow: 
            inset 2px 5px 10px rgba(255,255,255,0.4),
            inset -2px -5px 10px rgba(0,0,0,0.1);
        }

        .dark .arm {
          background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-color: #404040;
        }

        .arm-left {
          left: -35px;
          transform: rotate(-25deg);
          animation: arm-drift-left 12s ease-in-out infinite;
        }

        .arm-right {
          right: -35px;
          transform: rotate(25deg);
          animation: arm-drift-right 12s ease-in-out infinite;
        }

        @keyframes arm-drift-left {
          0%, 100% { transform: rotate(-25deg) translateY(0px); }
          50% { transform: rotate(-35deg) translateY(-8px); }
        }

        @keyframes arm-drift-right {
          0%, 100% { transform: rotate(25deg) translateY(0px); }
          50% { transform: rotate(35deg) translateY(-8px); }
        }

        .glove {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 25px;
          background: linear-gradient(145deg, #f0f0f0, #c0c0c0);
          border-radius: 50%;
          border: 2px solid #a0a0a0;
          box-shadow: inset 2px 2px 5px rgba(255,255,255,0.3);
        }

        .dark .glove {
          background: linear-gradient(145deg, #2a2a2a, #404040);
          border-color: #606060;
        }

        .leg {
          position: absolute;
          width: 30px;
          height: 55px;
          background: linear-gradient(145deg, #f8f8f8 0%, #e0e0e0 50%, #d0d0d0 100%);
          border-radius: 15px;
          border: 3px solid #b0b0b0;
          bottom: -50px;
          box-shadow: 
            inset 2px 3px 8px rgba(255,255,255,0.4),
            inset -2px -3px 8px rgba(0,0,0,0.1);
        }

        .dark .leg {
          background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-color: #404040;
        }

        .leg-left {
          left: 15px;
          animation: leg-drift-left 10s ease-in-out infinite;
        }

        .leg-right {
          right: 15px;
          animation: leg-drift-right 10s ease-in-out infinite;
        }

        @keyframes leg-drift-left {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(-12deg); }
        }

        @keyframes leg-drift-right {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(12deg); }
        }

        .space-boot {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 20px;
          background: linear-gradient(145deg, #d0d0d0, #a0a0a0);
          border-radius: 15px 15px 8px 8px;
          border: 2px solid #808080;
          box-shadow: inset 1px 2px 4px rgba(255,255,255,0.3);
        }

        .dark .space-boot {
          background: linear-gradient(145deg, #404040, #606060);
          border-color: #808080;
        }

        .jetpack {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 70px;
          background: linear-gradient(145deg, #606060 0%, #808080 50%, #505050 100%);
          border-radius: 15px;
          z-index: -1;
          border: 3px solid #404040;
          box-shadow: 
            inset 3px 5px 10px rgba(255,255,255,0.2),
            inset -3px -5px 10px rgba(0,0,0,0.3);
        }

        .jetpack-nozzle {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 15px;
          background: linear-gradient(145deg, #404040, #606060);
          border-radius: 0 0 10px 10px;
        }

        .jetpack-flame {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 28px;
          background: linear-gradient(to top, 
            #ff4500 0%, 
            #ff6500 30%, 
            #ff8500 60%, 
            #ffaa00 80%, 
            transparent 100%);
          border-radius: 50%;
          animation: intense-flame 0.3s ease-in-out infinite alternate;
          filter: blur(1px);
        }

        @keyframes intense-flame {
          0% { 
            height: 28px;
            opacity: 0.9;
            transform: translateX(-50%) scaleX(0.8);
          }
          100% { 
            height: 35px;
            opacity: 1;
            transform: translateX(-50%) scaleX(1.2);
          }
        }

        .tether-cable {
          position: absolute;
          top: -20px;
          right: -80px;
          width: 150px;
          height: 3px;
          transform-origin: left center;
          animation: cable-sway 15s ease-in-out infinite;
        }

        .cable-segment {
          position: absolute;
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, #606060, #404040, #606060);
          border-radius: 2px;
        }

        .dark .cable-segment {
          background: linear-gradient(90deg, #2a2a2a, #1a1a1a, #2a2a2a);
        }

        .cable-segment:nth-child(1) {
          left: 0;
          transform: rotate(-2deg);
        }

        .cable-segment:nth-child(2) {
          left: 25px;
          transform: rotate(1deg);
        }

        .cable-segment:nth-child(3) {
          left: 50px;
          transform: rotate(-3deg);
        }

        .cable-segment:nth-child(4) {
          left: 75px;
          transform: rotate(2deg);
        }

        .cable-segment:nth-child(5) {
          left: 100px;
          transform: rotate(-1deg);
        }

        @keyframes cable-sway {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(-25deg); }
        }

        .cable-end {
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 8px;
          background: linear-gradient(145deg, #808080, #505050);
          border-radius: 4px;
          border: 1px solid #404040;
        }

        .cable-sparks {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .spark {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #00ffff;
          border-radius: 50%;
          animation: spark-fly 1.5s ease-out infinite;
        }

        .spark:nth-child(1) {
          animation-delay: 0s;
          top: -5px;
          right: 0px;
        }

        .spark:nth-child(2) {
          animation-delay: 0.3s;
          top: 2px;
          right: -3px;
        }

        .spark:nth-child(3) {
          animation-delay: 0.6s;
          top: -2px;
          right: 2px;
        }

        @keyframes spark-fly {
          0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translate(15px, -10px) scale(0.3);
          }
        }

        @media (max-width: 768px) {
          .astronaut-container {
            width: 100px;
            height: 130px;
            bottom: 15%;
            right: 8%;
          }
          
          .astronaut-body {
            width: 50px;
            height: 70px;
          }
          
          .astronaut-helmet {
            width: 65px;
            height: 65px;
            top: -20px;
          }
          
          .tether-cable {
            width: 100px;
            right: -60px;
          }
        }
      `}),(0,r.jsxs)("div",{className:"astronaut-container",children:[(0,r.jsxs)("div",{className:"tether-cable",children:[r.jsx("div",{className:"cable-segment"}),r.jsx("div",{className:"cable-segment"}),r.jsx("div",{className:"cable-segment"}),r.jsx("div",{className:"cable-segment"}),r.jsx("div",{className:"cable-segment"}),r.jsx("div",{className:"cable-end"}),(0,r.jsxs)("div",{className:"cable-sparks",children:[r.jsx("div",{className:"spark"}),r.jsx("div",{className:"spark"}),r.jsx("div",{className:"spark"})]})]}),r.jsx("div",{className:"astronaut-helmet",children:(0,r.jsxs)("div",{className:"helmet-visor",children:[r.jsx("div",{className:"helmet-reflection-1"}),r.jsx("div",{className:"helmet-reflection-2"}),r.jsx("div",{className:"astronaut-face",children:(0,r.jsxs)("div",{className:"face-features",children:[r.jsx("div",{className:"face-skin"}),r.jsx("div",{className:"eye eye-left"}),r.jsx("div",{className:"eye eye-right"}),r.jsx("div",{className:"nose"}),r.jsx("div",{className:"mouth"})]})})]})}),(0,r.jsxs)("div",{className:"astronaut-body",children:[r.jsx("div",{className:"chest-control-panel",children:(0,r.jsxs)("div",{className:"control-lights",children:[r.jsx("div",{className:"control-light"}),r.jsx("div",{className:"control-light"}),r.jsx("div",{className:"control-light"})]})}),r.jsx("div",{className:"arm arm-left",children:r.jsx("div",{className:"glove"})}),r.jsx("div",{className:"arm arm-right",children:r.jsx("div",{className:"glove"})}),r.jsx("div",{className:"leg leg-left",children:r.jsx("div",{className:"space-boot"})}),r.jsx("div",{className:"leg leg-right",children:r.jsx("div",{className:"space-boot"})})]}),(0,r.jsxs)("div",{className:"jetpack",children:[r.jsx("div",{className:"jetpack-nozzle"}),r.jsx("div",{className:"jetpack-flame"})]})]})]})}t(7577)},2302:(a,e,t)=>{"use strict";t.d(e,{Z:()=>s});var r=t(326),i=t(7577);function s(){let a=(0,i.useRef)(null);return(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{children:`
        .galaxy-system {
          position: fixed;
          top: 8%;
          right: 8%;
          width: 450px;
          height: 450px;
          z-index: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .galaxy-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .particle-field {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          pointer-events: none;
        }

        .space-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #ffffff 0%, #e8e8e8 40%, transparent 70%);
          border-radius: 50%;
          animation: float-particle linear infinite;
          box-shadow: 0 0 6px rgba(255,255,255,0.6);
        }

        .dark .space-particle {
          background: radial-gradient(circle, #2a2a2a 0%, #1a1a1a 40%, transparent 70%);
          box-shadow: 0 0 6px rgba(0,0,0,0.6);
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) translateX(30px) scale(1.2);
            opacity: 0;
          }
        }

        .galaxy-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            #ffffff 0%,
            #f0f0f0 15%,
            #e8e8e8 25%,
            #c0c0c0 40%,
            rgba(192, 192, 192, 0.8) 60%,
            rgba(192, 192, 192, 0.4) 80%,
            transparent 100%
          );
          border-radius: 50%;
          animation: galaxy-pulse 8s ease-in-out infinite;
          box-shadow: 
            0 0 60px rgba(255, 255, 255, 0.9),
            0 0 120px rgba(255, 255, 255, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.4);
        }

        .dark .galaxy-core {
          background: radial-gradient(
            circle,
            #2a2a2a 0%,
            #1f1f1f 15%,
            #1a1a1a 25%,
            #404040 40%,
            rgba(64, 64, 64, 0.8) 60%,
            rgba(64, 64, 64, 0.4) 80%,
            transparent 100%
          );
          box-shadow: 
            0 0 60px rgba(0, 0, 0, 0.9),
            0 0 120px rgba(0, 0, 0, 0.5),
            inset 0 0 40px rgba(0, 0, 0, 0.4);
        }

        @keyframes galaxy-pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .galaxy-arms {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          animation: rotate-galaxy 60s linear infinite;
        }

        .galaxy-arm {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 220px;
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(220, 220, 220, 0.2) 15%,
            rgba(200, 200, 200, 0.6) 25%,
            rgba(192, 192, 192, 0.9) 40%,
            rgba(180, 180, 180, 0.7) 60%,
            rgba(160, 160, 160, 0.4) 80%,
            transparent 100%
          );
          transform-origin: bottom center;
          border-radius: 3px;
          filter: blur(2px);
        }

        .dark .galaxy-arm {
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(40, 40, 40, 0.2) 15%,
            rgba(30, 30, 30, 0.6) 25%,
            rgba(20, 20, 20, 0.9) 40%,
            rgba(35, 35, 35, 0.7) 60%,
            rgba(50, 50, 50, 0.4) 80%,
            transparent 100%
          );
        }

        .galaxy-arm:nth-child(1) { 
          transform: translate(-50%, 0) rotate(0deg);
          animation: arm-shimmer 12s ease-in-out infinite;
        }
        .galaxy-arm:nth-child(2) { 
          transform: translate(-50%, 0) rotate(60deg);
          animation: arm-shimmer 12s ease-in-out infinite 1s;
        }
        .galaxy-arm:nth-child(3) { 
          transform: translate(-50%, 0) rotate(120deg);
          animation: arm-shimmer 12s ease-in-out infinite 2s;
        }
        .galaxy-arm:nth-child(4) { 
          transform: translate(-50%, 0) rotate(180deg);
          animation: arm-shimmer 12s ease-in-out infinite 3s;
        }
        .galaxy-arm:nth-child(5) { 
          transform: translate(-50%, 0) rotate(240deg);
          animation: arm-shimmer 12s ease-in-out infinite 4s;
        }
        .galaxy-arm:nth-child(6) { 
          transform: translate(-50%, 0) rotate(300deg);
          animation: arm-shimmer 12s ease-in-out infinite 5s;
        }

        @keynames arm-shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .rock-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 3px solid rgba(180, 180, 180, 0.3);
          transform: translate(-50%, -50%);
          animation: rotate-ring linear infinite;
        }

        .dark .rock-ring {
          border-color: rgba(40, 40, 40, 0.3);
        }

        .rock-ring-1 {
          width: 280px;
          height: 280px;
          animation-duration: 40s;
          border-style: dashed;
          border-width: 2px;
        }

        .rock-ring-2 {
          width: 350px;
          height: 350px;
          animation-duration: 60s;
          animation-direction: reverse;
          border-style: dotted;
          border-width: 1px;
        }

        .rock-ring-3 {
          width: 200px;
          height: 200px;
          animation-duration: 25s;
          border-style: solid;
          border-width: 1px;
        }

        @keyframes rotate-ring {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .planet {
          position: absolute;
          border-radius: 50%;
          box-shadow: inset -6px -6px 12px rgba(0,0,0,0.3);
          animation: orbit-planet linear infinite;
        }

        .planet-1 {
          width: 18px;
          height: 18px;
          background: radial-gradient(circle at 30% 30%, #f8f8f8, #e0e0e0, #c0c0c0);
          top: 22%;
          left: 78%;
          animation-duration: 30s;
          box-shadow: 
            inset -4px -4px 8px rgba(0,0,0,0.3),
            0 0 20px rgba(248, 248, 248, 0.6);
        }

        .dark .planet-1 {
          background: radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a, #0a0a0a);
          box-shadow: 
            inset -4px -4px 8px rgba(255,255,255,0.3),
            0 0 20px rgba(40, 40, 40, 0.6);
        }

        .planet-2 {
          width: 14px;
          height: 14px;
          background: radial-gradient(circle at 40% 30%, #f0f0f0, #d0d0d0, #a0a0a0);
          top: 68%;
          left: 12%;
          animation-duration: 45s;
          animation-direction: reverse;
          box-shadow: 
            inset -3px -3px 6px rgba(0,0,0,0.3),
            0 0 15px rgba(240, 240, 240, 0.5);
        }

        .dark .planet-2 {
          background: radial-gradient(circle at 40% 30%, #1f1f1f, #0f0f0f, #050505);
          box-shadow: 
            inset -3px -3px 6px rgba(255,255,255,0.3),
            0 0 15px rgba(30, 30, 30, 0.5);
        }

        .planet-3 {
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 35% 25%, #e8e8e8, #c8c8c8, #888888);
          top: 88%;
          left: 88%;
          animation-duration: 65s;
          box-shadow: 
            inset -2px -2px 4px rgba(0,0,0,0.3),
            0 0 12px rgba(232, 232, 232, 0.4);
        }

        .dark .planet-3 {
          background: radial-gradient(circle at 35% 25%, #1a1a1a, #101010, #050505);
          box-shadow: 
            inset -2px -2px 4px rgba(255,255,255,0.3),
            0 0 12px rgba(25, 25, 25, 0.4);
        }

        @keyframes orbit-planet {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        .spaceship {
          position: absolute;
          animation: spaceship-orbit linear infinite;
        }

        .spaceship-body {
          position: relative;
          width: 28px;
          height: 12px;
          background: linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 50%, #a0a0a0 100%);
          border-radius: 14px 4px 4px 14px;
          border: 1px solid #808080;
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.3),
            inset -2px -2px 4px rgba(0,0,0,0.2);
        }

        .dark .spaceship-body {
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-color: #404040;
        }

        .spaceship-nose {
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid #c0c0c0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .dark .spaceship-nose {
          border-left-color: #1a1a1a;
        }

        .spaceship-window {
          position: absolute;
          left: 6px;
          top: 2px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #87CEEB 0%, #4682B4 70%, #2F4F4F 100%);
          border-radius: 50%;
          border: 1px solid #606060;
        }

        .spaceship-engine {
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00ffff, #0080ff);
          border-radius: 2px;
          animation: engine-glow 1.2s ease-in-out infinite alternate;
          filter: blur(1px);
        }

        @keyframes engine-glow {
          0% { 
            opacity: 0.6; 
            transform: translateY(-50%) scaleX(0.8);
            box-shadow: 0 0 4px #00ffff;
          }
          100% { 
            opacity: 1; 
            transform: translateY(-50%) scaleX(1.3);
            box-shadow: 0 0 8px #00ffff;
          }
        }

        .spaceship-1 {
          top: 35%;
          left: 65%;
          animation-duration: 35s;
        }

        .spaceship-2 {
          top: 75%;
          left: 25%;
          animation-duration: 50s;
          animation-direction: reverse;
        }

        .spaceship-3 {
          top: 15%;
          left: 15%;
          animation-duration: 42s;
        }

        @keyframes spaceship-orbit {
          from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }

        .stars {
          position: absolute;
          width: 250%;
          height: 250%;
          top: -75%;
          left: -75%;
        }

        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
          animation: twinkle 4s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(255,255,255,0.8);
        }

        .dark .star {
          background: #2a2a2a;
          box-shadow: 0 0 6px rgba(0,0,0,0.8);
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .galaxy-system {
            width: 300px;
            height: 300px;
            top: 5%;
            right: 5%;
          }
          
          .galaxy-core {
            width: 100px;
            height: 100px;
          }
          
          .galaxy-arm {
            height: 150px;
          }
          
          .rock-ring-1 {
            width: 180px;
            height: 180px;
          }
          
          .rock-ring-2 {
            width: 220px;
            height: 220px;
          }
        }
      `}),r.jsx("div",{className:"galaxy-system",ref:a,children:(0,r.jsxs)("div",{className:"galaxy-container",children:[r.jsx("div",{className:"particle-field"}),r.jsx("div",{className:"stars",children:Array.from({length:50},(a,e)=>r.jsx("div",{className:"star",style:{left:`${100*Math.random()}%`,top:`${100*Math.random()}%`,animationDelay:`${4*Math.random()}s`}},e))}),r.jsx("div",{className:"rock-ring rock-ring-1"}),r.jsx("div",{className:"rock-ring rock-ring-2"}),r.jsx("div",{className:"rock-ring rock-ring-3"}),r.jsx("div",{className:"galaxy-core"}),(0,r.jsxs)("div",{className:"galaxy-arms",children:[r.jsx("div",{className:"galaxy-arm"}),r.jsx("div",{className:"galaxy-arm"}),r.jsx("div",{className:"galaxy-arm"}),r.jsx("div",{className:"galaxy-arm"}),r.jsx("div",{className:"galaxy-arm"}),r.jsx("div",{className:"galaxy-arm"})]}),r.jsx("div",{className:"planet planet-1"}),r.jsx("div",{className:"planet planet-2"}),r.jsx("div",{className:"planet planet-3"}),r.jsx("div",{className:"spaceship spaceship-1",children:(0,r.jsxs)("div",{className:"spaceship-body",children:[r.jsx("div",{className:"spaceship-nose"}),r.jsx("div",{className:"spaceship-window"}),r.jsx("div",{className:"spaceship-engine"})]})}),r.jsx("div",{className:"spaceship spaceship-2",children:(0,r.jsxs)("div",{className:"spaceship-body",children:[r.jsx("div",{className:"spaceship-nose"}),r.jsx("div",{className:"spaceship-window"}),r.jsx("div",{className:"spaceship-engine"})]})}),r.jsx("div",{className:"spaceship spaceship-3",children:(0,r.jsxs)("div",{className:"spaceship-body",children:[r.jsx("div",{className:"spaceship-nose"}),r.jsx("div",{className:"spaceship-window"}),r.jsx("div",{className:"spaceship-engine"})]})})]})})]})}},1810:(a,e,t)=>{"use strict";t.d(e,{Z:()=>s});var r=t(326),i=t(7577);function s(){let a=(0,i.useRef)(null);return(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{children:`
        .shooting-stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          /* MODIFIED: Set z-index to -1 to render behind all other content */
          z-index: -1;
          overflow: hidden;
        }

        .shooting-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
          /* MODIFIED: Added a more prominent, multi-layered box-shadow for a flare effect */
          box-shadow: 
            0 0 8px 2px rgba(255, 255, 255, 0.8),
            0 0 16px 4px rgba(255, 255, 255, 0.6),
            0 0 24px 6px rgba(255, 192, 203, 0.4); /* Pinkish outer glow */
          animation: 
            shoot var(--duration, 4s) linear forwards,
            flare var(--duration, 4s) ease-in-out infinite alternate;
        }

        /* MODIFIED: Added a new animation for the shiny flare effect */
        @keyframes flare {
          0% {
            transform: scale(1);
            box-shadow: 
              0 0 8px 2px rgba(255, 255, 255, 0.8),
              0 0 16px 4px rgba(255, 255, 255, 0.6),
              0 0 24px 6px rgba(255, 192, 203, 0.4);
          }
          100% {
            transform: scale(1.5);
            box-shadow: 
              0 0 12px 3px rgba(255, 255, 255, 1),
              0 0 24px 6px rgba(255, 255, 255, 0.8),
              0 0 36px 9px rgba(255, 192, 203, 0.6);
          }
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 3px; /* Start the tail from the edge of the star */
          width: 150px;
          height: 1px;
          /* MODIFIED: Made the tail brighter and more defined */
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
        }

        @keyframes shoot {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--endX), var(--endY));
            opacity: 0;
          }
        }
      `}),r.jsx("div",{className:"shooting-stars-container",ref:a})]})}},2714:(a,e,t)=>{"use strict";t.d(e,{Z:()=>r});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(2881).Z)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},8307:(a,e,t)=>{"use strict";t.d(e,{Z:()=>r});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(2881).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},8378:(a,e,t)=>{"use strict";t.d(e,{Z:()=>r});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,t(2881).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},8286:(a,e,t)=>{"use strict";t.r(e),t.d(e,{$$typeof:()=>n,__esModule:()=>s,default:()=>o});var r=t(8570);let i=(0,r.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\layout.js`),{__esModule:s,$$typeof:n}=i;i.default;let o=(0,r.createProxy)(String.raw`D:\RAKSHIT\PROJECTS\MAIN PROJECT\WORKING MODEL\app\(main)\layout.js#default`)},7764:(a,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>s,metadata:()=>i});var r=t(9510);t(7272);let i={title:"Synaptic - Movie Discovery",description:"Discover movies and series with immersive experiences"};function s({children:a}){return r.jsx("html",{lang:"en",children:r.jsx("body",{children:a})})}},7272:()=>{}};