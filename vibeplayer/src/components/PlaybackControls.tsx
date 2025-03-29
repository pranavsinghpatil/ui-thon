
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const PlaybackControls = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext 
}: PlaybackControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button 
        className="control-btn text-white/80 hover:text-white" 
        onClick={onPrevious}
        aria-label="Previous track"
      >
        <SkipBack size={22} />
      </button>
      
      <button 
        className="control-btn bg-white/10 hover:bg-white/20 p-3 rounded-full text-white"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </button>
      
      <button 
        className="control-btn text-white/80 hover:text-white"
        onClick={onNext}
        aria-label="Next track"
      >
        <SkipForward size={22} />
      </button>
    </div>
  );
};

export default PlaybackControls;
