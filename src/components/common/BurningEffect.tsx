export default function BurningEffect() {
  return (
    <div className="burning-container">
      <div className="fire-container">
        <div className="fire-base">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
        
        {/* Flames */}
        <div className="flames">
          <div className="flame flame-1"></div>
          <div className="flame flame-2"></div>
          <div className="flame flame-3"></div>
        </div>
        
        {/* Glow */}
        <div className="glow"></div>
      </div>

      <style jsx>{`
        .burning-container {
          position: relative;
          width: 100%;
          height: 120px;
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
        
        .fire-container {
          position: relative;
          width: 60px;
          height: 60px;
        }
        
        .fire-base {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 15px;
          background: rgba(255, 80, 0, 0.3);
          border-radius: 50%;
          z-index: 1;
        }
        
        .flames {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
        }
        
        .flame {
          position: absolute;
          bottom: 0;
          background: linear-gradient(to top, #ff6600, #ffcc00);
          border-radius: 50% 50% 20% 20% / 50% 50% 30% 30%;
          transform-origin: center bottom;
          opacity: 0.9;
        }
        
        .flame-1 {
          left: 15px;
          width: 25px;
          height: 55px;
          animation: flicker1 1.5s infinite alternate;
        }
        
        .flame-2 {
          left: 5px;
          width: 20px;
          height: 45px;
          animation: flicker2 1.7s infinite alternate 0.3s;
        }
        
        .flame-3 {
          left: 25px;
          width: 20px;
          height: 40px;
          animation: flicker3 1.9s infinite alternate 0.5s;
        }
        
        .glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(255, 160, 0, 0.5) 0%, rgba(255, 160, 0, 0) 70%);
          border-radius: 50%;
          z-index: 0;
          animation: glow 1.5s infinite alternate;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ffaa00;
          border-radius: 50%;
          opacity: 0;
        }
        
        .particle-1 {
          left: 30%;
          animation: particle1 2s infinite 0.2s;
        }
        
        .particle-2 {
          left: 50%;
          animation: particle2 2.2s infinite 0.7s;
        }
        
        .particle-3 {
          left: 70%;
          animation: particle3 2.1s infinite 0.4s;
        }
        
        .particle-4 {
          left: 40%;
          animation: particle4 1.9s infinite 0.1s;
        }
        
        .particle-5 {
          left: 60%;
          animation: particle5 2.3s infinite 0.5s;
        }
        
        @keyframes flicker1 {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.9; }
          25% { transform: scaleY(1.1) scaleX(0.9); opacity: 1; }
          50% { transform: scaleY(0.95) scaleX(1.05); opacity: 0.8; }
          75% { transform: scaleY(1.05) scaleX(0.95); opacity: 0.9; }
        }
        
        @keyframes flicker2 {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.85; }
          25% { transform: scaleY(1.05) scaleX(0.95); opacity: 0.95; }
          50% { transform: scaleY(0.9) scaleX(1.1); opacity: 0.75; }
          75% { transform: scaleY(1.1) scaleX(0.9); opacity: 0.85; }
        }
        
        @keyframes flicker3 {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.8; }
          25% { transform: scaleY(1.15) scaleX(0.85); opacity: 0.9; }
          50% { transform: scaleY(0.85) scaleX(1.15); opacity: 0.7; }
          75% { transform: scaleY(1.05) scaleX(0.95); opacity: 0.8; }
        }
        
        @keyframes glow {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.5; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.7; }
        }
        
        @keyframes particle1 {
          0% { bottom: 0; opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.3; transform: translateX(5px); }
          75% { opacity: 0.1; }
          100% { bottom: 80px; opacity: 0; transform: translateX(10px); }
        }
        
        @keyframes particle2 {
          0% { bottom: 0; opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.3; transform: translateX(-8px); }
          75% { opacity: 0.1; }
          100% { bottom: 90px; opacity: 0; transform: translateX(-15px); }
        }
        
        @keyframes particle3 {
          0% { bottom: 0; opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.3; transform: translateX(7px); }
          75% { opacity: 0.1; }
          100% { bottom: 85px; opacity: 0; transform: translateX(12px); }
        }
        
        @keyframes particle4 {
          0% { bottom: 0; opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.3; transform: translateX(-5px); }
          75% { opacity: 0.1; }
          100% { bottom: 75px; opacity: 0; transform: translateX(-10px); }
        }
        
        @keyframes particle5 {
          0% { bottom: 0; opacity: 0; }
          25% { opacity: 0.5; }
          50% { opacity: 0.3; transform: translateX(10px); }
          75% { opacity: 0.1; }
          100% { bottom: 95px; opacity: 0; transform: translateX(18px); }
        }
      `}</style>
    </div>
  );
}