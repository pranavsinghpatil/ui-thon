import React, { useState, useEffect } from 'react';
import { Music, Headphones, Play, Volume2, Disc } from 'lucide-react';

interface IconPosition {
  id: number;
  x: number;
  y: number;
  icon: React.ReactNode;
  opacity: number;
  scale: number;
  rotation: number;
  color: string; // Added color property
}

const MusicIconsAnimation = () => {
  const [icons, setIcons] = useState<IconPosition[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  // Define the icons we'll use
  const iconComponents = [
    <Music size={12} />,
    <Headphones size={12} />,
    <Play size={12} />,
    <Volume2 size={12} />,
    <Disc size={12} />
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear the timeout if it exists
      clearTimeout((window as any).mouseMoveTimeout);

      // Set a timeout to detect when mouse stops moving
      (window as any).mouseMoveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout((window as any).mouseMoveTimeout);
    };
  }, []);

  useEffect(() => {
    if (isMoving) {
      // Create a new icon when the mouse moves
      const randomIcon = iconComponents[Math.floor(Math.random() * iconComponents.length)];
      const newIcon = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
        icon: randomIcon,
        opacity: 1,
        scale: 1 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        color: getRandomColor() // Generate a random color
      };

      setIcons((prev) => [...prev, newIcon]);

      // Clean up old icons
      setTimeout(() => {
        setIcons((prev) => prev.filter((icon) => icon.id !== newIcon.id));
      }, 2000);
    }
  }, [mousePosition, isMoving]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute text-white transition-all duration-2000 ease-out"
          style={{
            left: icon.x - 12,
            top: icon.y - 12,
            opacity: icon.opacity,
            transform: `scale(${icon.scale}) rotate(${icon.rotation}deg)`,
            animation: 'float-up 2s ease-out forwards',
            color: icon.color // Apply the random color
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  );
};

export default MusicIconsAnimation;
