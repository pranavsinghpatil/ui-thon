
import React from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import MusicIconsAnimation from '@/components/MusicIconsAnimation';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { sampleTracks } from '@/data/sampleTracks';

const Index = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-4">
      <BackgroundAnimation />
      <MusicIconsAnimation />
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center relative z-10 tracking-tight">
        <span className="font-gradient">Gradient Vibe Player</span>
      </h1>
      
      <MusicPlayer tracks={sampleTracks} />
      
      <div className="mt-10 text-white/50 text-sm text-center">
        <p>This is a demo music player. Audio playback is simulated.</p>
      </div>
    </div>
  );
};

export default Index;
