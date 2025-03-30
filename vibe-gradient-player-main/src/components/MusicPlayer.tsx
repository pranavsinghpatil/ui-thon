import React, { useState, useRef, useEffect } from 'react';
import { Track } from '@/data/sampleTracks';
import AlbumCover from './AlbumCover';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { Music, ListMusic, Shuffle, Repeat, RepeatOne } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface MusicPlayerProps {
  tracks: Track[];
}

const MusicPlayer = ({ tracks }: MusicPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  
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
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        if (repeatMode === 'one') {
          audio.currentTime = 0;
          audio.play();
        } else if (repeatMode === 'all') {
          handleNext();
        } else if (isShuffling) {
          handleShuffle();
        } else {
          handleNext();
        }
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrackIndex, isShuffling, repeatMode]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShuffle = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } while (nextIndex === currentTrackIndex && tracks.length > 1);
    
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleRepeat = () => {
    setRepeatMode(current => {
      switch (current) {
        case 'none': return 'all';
        case 'all': return 'one';
        case 'one': return 'none';
      }
    });
  };

  const handleNext = () => {
    if (isShuffling) {
      handleShuffle();
    } else {
      setCurrentTrackIndex(current => 
        current === tracks.length - 1 ? (repeatMode === 'all' ? 0 : current) : current + 1
      );
      setCurrentTime(0);
    }
  };

  const handlePrevious = () => {
    if (isShuffling) {
      handleShuffle();
    } else {
      setCurrentTrackIndex(current => current === 0 ? tracks.length - 1 : current - 1);
      setCurrentTime(0);
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
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsShuffling(prev => !prev)}
                    className={`p-2 rounded-full transition-all ${
                      isShuffling ? 'text-purple-400 hover:text-purple-300' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Shuffle size={20} />
                  </button>
                  
                  <PlaybackControls 
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                  />
                  
                  <button 
                    onClick={handleRepeat}
                    className={`p-2 rounded-full transition-all ${
                      repeatMode !== 'none' ? 'text-purple-400 hover:text-purple-300' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {repeatMode === 'one' ? <RepeatOne size={20} /> : <Repeat size={20} />}
                  </button>
                </div>

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
