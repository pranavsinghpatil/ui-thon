import React, { useRef, useState, useEffect } from 'react';
import type { Track } from '../types/track';
import AlbumCover from './AlbumCover';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { ListMusic } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface MusicPlayerProps {
  tracks: Track[];
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    } else {
      handleNext();
    }
  };

  const getNextTrackIndex = () => {
    if (isShuffleOn) {
      if (shuffledIndices.length === 0) {
        const indices = Array.from({ length: tracks.length }, (_, i) => i)
          .filter(i => i !== currentTrackIndex);
        const shuffled = indices.sort(() => Math.random() - 0.5);
        setShuffledIndices(shuffled);
        return shuffled[0];
      }
      const nextIndex = shuffledIndices[0];
      setShuffledIndices(shuffledIndices.slice(1));
      return nextIndex;
    }

    if (currentTrackIndex === tracks.length - 1) {
      return repeatMode === 'all' ? 0 : currentTrackIndex;
    }
    return currentTrackIndex + 1;
  };

  const handleNext = () => {
    const nextIndex = getNextTrackIndex();
    if (nextIndex !== currentTrackIndex) {
      setCurrentTrackIndex(nextIndex);
      setCurrentTime(0);
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
    setShuffledIndices([]);
  };

  const toggleRepeat = () => {
    const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-1">
      <div className={`w-full shadow-2xl rounded-2xl ${isPlaying ? 'border-flow-animation' : ''}`}>
        <div className="flex flex-col md:flex-row">
          {/* Left side - Player */}
          <div className="md:w-2/3 p-8">
            {/* Album cover and track info */}
            <div className="flex flex-col items-center">
              <AlbumCover track={currentTrack} size="lg" className="mb-6" />
              
              <div className="text-center text-white w-full mb-6">
                <h2 className="text-2xl font-bold mb-1 truncate font-gradient">{currentTrack.title}</h2>
                <p className="text-white/70 text-lg">{currentTrack.artist}</p>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={currentTrack.audioUrl}
              preload="metadata"
              onEnded={handleEnded}
              onError={(e) => {
                console.error('Audio error:', e.currentTarget.error);
              }}
              className="hidden"
            />
            <div className="w-full space-y-5">
              <ProgressBar 
                currentTime={currentTime} 
                duration={currentTrack.duration}
                onSeek={handleSeek}
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <PlaybackControls 
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onShuffle={toggleShuffle}
                  onRepeat={toggleRepeat}
                  isShuffleOn={isShuffleOn}
                  repeatMode={repeatMode}
                />
                <VolumeControl 
                  volume={volume} 
                  onVolumeChange={handleVolumeChange} 
                />
              </div>
            </div>
          </div>
          {/* Right side - Playlist */}
          <div className="md:w-1/3 p-6 border-l border-white/10">
            <div className="mb-4">
              <h3 className="text-white/90 text-lg font-medium mb-3 flex items-center gap-2">
                <ListMusic size={18} /> <span className="font-gradient">Playlist</span>
              </h3>
              <ScrollArea className="h-[410px] pr-4 playlist-scroll">
                <div className="space-y-2">
                  {tracks.map((track, index) => (
                    <div 
                      key={track.id}
                      onClick={() => {
                        if (currentTrackIndex === index) {
                          handlePlayPause();
                        } else {
                          setCurrentTrackIndex(index);
                          setCurrentTime(0);
                          if (!isPlaying) setIsPlaying(true);
                        }
                      }}
                      className={`playlist-item flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${index === currentTrackIndex ? 'active' : ''}`}
                    >
                      <AlbumCover track={track} size="sm" />
                      <div className="overflow-hidden">
                        <p className="text-white text-sm font-medium truncate">{track.title}</p>
                        <p className="text-white/60 text-xs truncate">{track.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
