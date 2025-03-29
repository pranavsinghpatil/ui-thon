
import React from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import MusicIconsAnimation from '@/components/MusicIconsAnimation';
import { sampleTracks } from '@/data/sampleTracks';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <MusicIconsAnimation />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Vibe Gradient Player
        </span>
      </h1>
      
      <MusicPlayer tracks={sampleTracks} />
      
      <div className="mt-10 text-white/50 text-sm text-center">
        <p>This is a demo music player. Audio playback is simulated.</p>
      </div>
    </div>
  );
};

export default Index;
