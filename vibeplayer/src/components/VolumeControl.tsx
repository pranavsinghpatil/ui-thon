
import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

const VolumeControl = ({ volume, onVolumeChange, className }: VolumeControlProps) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button 
        className="text-white/80 hover:text-white" 
        onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        <VolumeIcon />
      </button>
      <div className="w-24 relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1.5 appearance-none bg-white/20 rounded-full overflow-hidden cursor-pointer"
          aria-label="Volume"
          style={{
            backgroundImage: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
          }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
