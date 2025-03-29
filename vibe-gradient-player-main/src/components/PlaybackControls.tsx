
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';

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
    <div className="flex items-center gap-6">
      <button 
        className="control-btn text-white/60 hover:text-white" 
        onClick={() => {}}
        aria-label="Shuffle"
      >
        <Shuffle size={16} />
      </button>
      
      <button 
        className="control-btn text-white/80 hover:text-white" 
        onClick={onPrevious}
        aria-label="Previous track"
      >
        <SkipBack size={22} />
      </button>
      
      <button 
        className="control-btn bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
      </button>
      
      <button 
        className="control-btn text-white/80 hover:text-white"
        onClick={onNext}
        aria-label="Next track"
      >
        <SkipForward size={22} />
      </button>
      
      <button 
        className="control-btn text-white/60 hover:text-white"
        onClick={() => {}}
        aria-label="Repeat"
      >
        <Repeat size={16} />
      </button>
    </div>
  );
};

export default PlaybackControls;
