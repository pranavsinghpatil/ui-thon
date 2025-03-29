
import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Animated gradient background - darker and more nostalgic feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0524] via-[#1a0933] to-[#190c3a] animated-gradient"></div>
      
      {/* Floating elements with more creative colors */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full blur-3xl opacity-20 animate-float"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#9b87f5' : 
                i % 3 === 1 ? '#4158D0' : '#9333ea'
              } 0%, transparent 70%)`,
              width: `${Math.random() * 30 + 10}rem`,
              height: `${Math.random() * 30 + 10}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Creative grid overlay with reduced opacity */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      {/* Subtle glowing accents */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-700/10 blur-3xl"></div>
    </div>
  );
};

export default BackgroundAnimation;
