'use client';

import React, { useEffect, useState } from 'react';

export default function BurningEffect() {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => {
      const randomDelay = Math.random() * 2;
      const randomOffset = Math.random() * 60 - 30;
      
      return (
        <div 
          key={i}
          className="absolute w-[3px] h-[3px] bg-amber-400 rounded-full opacity-0"
          style={{
            animation: `rise 2s infinite ${randomDelay}s`,
            left: `calc(50% + ${randomOffset}px)`,
          }}
        />
      );
    });
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="relative w-full h-[150px] flex justify-center mb-8">
      <div className="relative w-[80px] h-[80px]">
        {/* Fire base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-orange-500/30 rounded-full z-10">
          {particles}
        </div>
        
        {/* Flames */}
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[60px]">
          <div 
            className="absolute bottom-0 left-[15px] w-[30px] h-[65px] bg-gradient-to-t from-orange-600 to-amber-300 rounded-[50%_50%_20%_20%/50%_50%_30%_30%] opacity-90 origin-bottom"
            style={{ animation: 'flicker 1.5s infinite alternate 0.1s' }}
          />
          <div 
            className="absolute bottom-0 left-[5px] w-[25px] h-[50px] bg-gradient-to-t from-orange-600 to-amber-300 rounded-[50%_50%_20%_20%/50%_50%_30%_30%] opacity-90 origin-bottom"
            style={{ animation: 'flicker 1.5s infinite alternate 0.3s' }}
          />
          <div 
            className="absolute bottom-0 left-[30px] w-[25px] h-[55px] bg-gradient-to-t from-orange-600 to-amber-300 rounded-[50%_50%_20%_20%/50%_50%_30%_30%] opacity-90 origin-bottom"
            style={{ animation: 'flicker 1.5s infinite alternate 0.5s' }}
          />
          <div 
            className="absolute bottom-0 left-[20px] w-[20px] h-[45px] bg-gradient-to-t from-orange-600 to-amber-300 rounded-[50%_50%_20%_20%/50%_50%_30%_30%] opacity-90 origin-bottom"
            style={{ animation: 'flicker 1.5s infinite alternate 0.7s' }}
          />
        </div>
        
        {/* Glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[30px] bg-[radial-gradient(ellipse_at_center,rgba(255,160,0,0.5)_0%,rgba(255,160,0,0)_70%)] rounded-full z-0"
          style={{ animation: 'glow 1.5s infinite alternate' }}
        />
      </div>
      
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes flicker {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
            opacity: 0.9;
          }
          25% {
            transform: scaleY(1.1) scaleX(0.9);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.95) scaleX(1.05);
            opacity: 0.8;
          }
          75% {
            transform: scaleY(1.05) scaleX(0.95);
            opacity: 0.9;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 0.7;
          }
        }
        
        @keyframes rise {
          0% {
            bottom: 0;
            opacity: 0;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
            transform: translateX(${Math.random() * 20 - 10}px);
          }
          75% {
            opacity: 0.1;
          }
          100% {
            bottom: 100px;
            opacity: 0;
            transform: translateX(${Math.random() * 40 - 20}px);
          }
        }
      `}</style>
    </div>
  );
}