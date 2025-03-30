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
        <p>&copy; {new Date().getFullYear()} PranavSingh. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          {/* GitHub Icon */}
          <a
            href="https://github.com/pranavsinghpatil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 text-2xl"
          >
            <i className="fab fa-github"></i>
          </a>

          {/* Twitter Icon */}
          <a
            href="https://twitter.com/pranavenv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 text-2xl"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
