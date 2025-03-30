import React, { useState, useRef, useEffect } from 'react';
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.src = currentTrack.audioUrl;
      audio.load(); // Explicitly load the audio
      
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [currentTrackIndex, isPlaying, volume, currentTrack.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set up event listeners
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener('ended', () => {
        handleNext();
      });

      audio.addEventListener('error', (error) => {
        console.error('Audio playback error:', error);
      });

      // Clean up event listeners
      return () => {
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
        audio.removeEventListener('error', () => {});
      };
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
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
    <div className="relative w-full max-w-5xl mx-auto">
      <div className={`relative w-full rounded-2xl shadow-2xl overflow-hidden ${
        isPlaying ? 'border-flow-animation' : ''
      }`}>
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
            </div>
            <audio
              ref={audioRef}
              src={currentTrack.audioUrl}
              preload="metadata"
              onLoadedMetadata={(e) => {
                const audio = e.currentTarget;
                if (audio && !isNaN(audio.duration)) {
                  setCurrentTime(0);
                }
              }}
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
    </div>
  );
};

export default MusicPlayer;
