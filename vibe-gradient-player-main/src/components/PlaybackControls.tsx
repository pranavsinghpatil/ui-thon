import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  isShuffleOn?: boolean;
  repeatMode?: 'none' | 'all' | 'one';
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  isShuffleOn,
  repeatMode = 'none'
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onShuffle}
        className={`p-2 rounded-full hover:bg-white/10 transition-all ${
          isShuffleOn ? 'text-purple-500' : 'text-white/70'
        }`}
      >
        <Shuffle size={20} />
      </button>
      <button
        onClick={onPrevious}
        className="p-2 rounded-full hover:bg-white/10 transition-all text-white/70"
      >
        <SkipBack size={24} />
      </button>
      <button
        onClick={onPlayPause}
        className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 transition-all text-white"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-white/10 transition-all text-white/70"
      >
        <SkipForward size={24} />
      </button>
      <button
        onClick={onRepeat}
        className={`p-2 rounded-full hover:bg-white/10 transition-all ${
          repeatMode !== 'none' ? 'text-purple-500' : 'text-white/70'
        }`}
      >
        <Repeat size={20} className={repeatMode === 'one' ? 'relative after:content-["1"] after:absolute after:text-[10px] after:font-bold after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2' : ''} />
      </button>
    </div>
  );
};

export default PlaybackControls;
