import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange, className }) => {
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeClick = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(prevVolume);
    }
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div 
      className={cn("flex items-center gap-2 group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleVolumeClick}
        className="p-2 rounded-full hover:bg-white/10 transition-all text-white/70 hover:text-white group-hover:text-white"
      >
        <VolumeIcon />
      </button>
      <div 
        className={`relative w-20 overflow-hidden transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <div className="h-1.5 bg-white/20 rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-1.5"
            style={{ width: `${volume * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: '12px' }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
