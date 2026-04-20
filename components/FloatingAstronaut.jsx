import React from 'react';

export default function FloatingAstronaut() {
  return (
    <>
      <style>{`
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
      `}</style>

      <div className="astronaut-container">
        <div className="tether-cable">
          <div className="cable-segment"></div>
          <div className="cable-segment"></div>
          <div className="cable-segment"></div>
          <div className="cable-segment"></div>
          <div className="cable-segment"></div>
          <div className="cable-end"></div>
          <div className="cable-sparks">
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
          </div>
        </div>

        <div className="astronaut-helmet">
          <div className="helmet-visor">
            <div className="helmet-reflection-1"></div>
            <div className="helmet-reflection-2"></div>
            <div className="astronaut-face">
              <div className="face-features">
                <div className="face-skin"></div>
                <div className="eye eye-left"></div>
                <div className="eye eye-right"></div>
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="astronaut-body">
          <div className="chest-control-panel">
            <div className="control-lights">
              <div className="control-light"></div>
              <div className="control-light"></div>
              <div className="control-light"></div>
            </div>
          </div>

          <div className="arm arm-left">
            <div className="glove"></div>
          </div>
          <div className="arm arm-right">
            <div className="glove"></div>
          </div>

          <div className="leg leg-left">
            <div className="space-boot"></div>
          </div>
          <div className="leg leg-right">
            <div className="space-boot"></div>
          </div>
        </div>

        <div className="jetpack">
          <div className="jetpack-nozzle"></div>
          <div className="jetpack-flame"></div>
        </div>
      </div>
    </>
  );
}