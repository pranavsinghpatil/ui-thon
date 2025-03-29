
import React, { useState, useEffect, useRef } from 'react';
import { Track } from '@/data/sampleTracks';
import AlbumCover from './AlbumCover';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { Music } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto music-player-bg p-6 rounded-xl shadow-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Album cover and track info */}
        <div className="flex flex-col items-center md:w-1/2">
          <AlbumCover track={currentTrack} size="lg" className="mb-6" />
          <div className="text-center text-white w-full">
            <h2 className="text-2xl font-bold mb-1 truncate">{currentTrack.title}</h2>
            <p className="text-white/70 text-lg mb-6 truncate">{currentTrack.artist}</p>
          </div>
        </div>
        
        {/* Playlist and controls */}
        <div className="flex flex-col md:w-1/2">
          <div className="glass p-4 rounded-lg mb-6 flex-1 overflow-hidden">
            <h3 className="text-white/90 text-lg font-medium mb-3 flex items-center gap-2">
              <Music size={18} /> Playlist
            </h3>
            <div className="space-y-1 overflow-y-auto max-h-64">
              {tracks.map((track, index) => (
                <div 
                  key={track.id}
                  className={`playlist-item flex items-center gap-3 p-2 rounded cursor-pointer ${index === currentTrackIndex ? 'active' : ''}`}
                  onClick={() => handleTrackSelect(index)}
                >
                  <AlbumCover track={track} size="sm" />
                  <div className="overflow-hidden">
                    <p className="text-white text-sm font-medium truncate">{track.title}</p>
                    <p className="text-white/60 text-xs truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls */}
          <div className="glass rounded-lg p-5 space-y-5">
            <ProgressBar 
              currentTime={currentTime} 
              duration={currentTrack.duration}
              onSeek={handleSeek}
            />
            <PlaybackControls 
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
            <div className="flex justify-end">
              <VolumeControl 
                volume={volume} 
                onVolumeChange={handleVolumeChange} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
