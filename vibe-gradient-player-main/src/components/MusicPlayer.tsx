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
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // 'none', 'all', 'one'
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentTrackIndex];

  const getNextTrackIndex = () => {
    if (repeat === 'one') return currentTrackIndex;
    if (shuffle) {
      const nextIndex = Math.floor(Math.random() * tracks.length);
      return nextIndex === currentTrackIndex ? (nextIndex + 1) % tracks.length : nextIndex;
    }
    return (currentTrackIndex + 1) % tracks.length;
  };

  const getPreviousTrackIndex = () => {
    if (repeat === 'one') return currentTrackIndex;
    if (shuffle) {
      const prevIndex = Math.floor(Math.random() * tracks.length);
      return prevIndex === currentTrackIndex ? (prevIndex - 1 + tracks.length) % tracks.length : prevIndex;
    }
    return (currentTrackIndex - 1 + tracks.length) % tracks.length;
  };

  const handleNext = () => {
    const nextIndex = getNextTrackIndex();
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const handlePrevious = () => {
    const prevIndex = getPreviousTrackIndex();
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const toggleShuffle = () => {
    setShuffle(prev => !prev);
  };

  const toggleRepeat = () => {
    setRepeat(current => {
      switch (current) {
        case 'none': return 'all';
        case 'all': return 'one';
        default: return 'none';
      }
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleLoadedMetadata = () => {
        if (!isNaN(audio.duration)) {
          setCurrentTime(0);
        }
      };

      const handleEnded = () => {
        if (repeat === 'one') {
          audio.currentTime = 0;
          audio.play();
        } else if (repeat === 'all' || shuffle) {
          handleNext();
        } else {
          if (currentTrackIndex === tracks.length - 1) {
            setIsPlaying(false);
            setCurrentTime(0);
          } else {
            handleNext();
          }
        }
      };

      const handleError = (error: Event) => {
        console.error('Audio error:', (error.target as HTMLAudioElement).error);
        setIsPlaying(false);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setIsPlaying(false);
          });
        }
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentTrackIndex, isPlaying, volume, repeat, shuffle]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setIsPlaying(false);
          });
        }
      }
      setIsPlaying(!isPlaying);
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
      setIsPlaying(true);
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
              <div className="flex items-center justify-center gap-8 mb-6">
                <button 
                  onClick={toggleShuffle}
                  className={`text-2xl transition-colors ${shuffle ? 'text-purple-500' : 'text-white/70 hover:text-white'}`}
                >
                  <i className="fas fa-random"></i>
                </button>
                <PlaybackControls 
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
                <button 
                  onClick={toggleRepeat}
                  className={`text-2xl transition-colors ${
                    repeat !== 'none' ? 'text-purple-500' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {repeat === 'one' ? (
                    <i className="fas fa-repeat-1"></i>
                  ) : (
                    <i className="fas fa-repeat"></i>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="volume-control">
                  <button
                    onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
                    className="volume-icon"
                  >
                    {volume === 0 ? (
                      <i className="fas fa-volume-mute"></i>
                    ) : volume < 0.5 ? (
                      <i className="fas fa-volume-down"></i>
                    ) : (
                      <i className="fas fa-volume-up"></i>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="volume-slider"
                    style={{ '--volume-percentage': `${volume * 100}%` } as React.CSSProperties}
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
    </div>
  );
};

export default MusicPlayer;
