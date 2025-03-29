
import React, { useState, useEffect, useRef } from 'react';
import { Track } from '@/data/sampleTracks';
import AlbumCover from './AlbumCover';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { Music, ListMusic } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface MusicPlayerProps {
  tracks: Track[];
}

const MusicPlayer = ({ tracks }: MusicPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const currentTrack = tracks[currentTrackIndex];
  
  // In a real implementation, we would have an audio element
  // Since we don't have real audio files, we'll simulate playback
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentTrackIndex]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setCurrentTime(0);
  };
  
  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentTime(0);
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleTrackSelect = (index: number) => {
    if (currentTrackIndex === index) {
      handlePlayPause();
    } else {
      setCurrentTrackIndex(index);
      setCurrentTime(0);
      if (!isPlaying) setIsPlaying(true);
    }
  };
  
  return (
    <div className={`w-full max-w-5xl mx-auto music-player-bg rounded-xl shadow-2xl backdrop-blur-lg relative z-10 ${isPlaying ? 'border-flow-animation' : ''}`}>
      <div className="flex flex-col md:flex-row">
        {/* Left side - Player */}
        <div className="md:w-2/3 p-6">
          {/* Album cover and track info */}
          <div className="flex flex-col items-center">
            <AlbumCover track={currentTrack} size="lg" className="mb-6" />
            
            <div className="text-center text-white w-full mb-6">
              <h2 className="text-2xl font-bold mb-1 truncate font-gradient">{currentTrack.title}</h2>
              <p className="text-white/70 text-lg">{currentTrack.artist}</p>
            </div>
          
            {/* Controls */}
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
                />
                
                <VolumeControl 
                  volume={volume} 
                  onVolumeChange={handleVolumeChange} 
                />
              </div>
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
                    onClick={() => handleTrackSelect(index)}
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
  );
};

export default MusicPlayer;
