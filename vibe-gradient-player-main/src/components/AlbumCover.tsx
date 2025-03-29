
import React from 'react';
import { cn } from '@/lib/utils';
import { Track } from '@/data/sampleTracks';

interface AlbumCoverProps {
  track: Track;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AlbumCover = ({ track, size = 'md', className }: AlbumCoverProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  return (
    <div className={cn(
      'relative rounded-lg overflow-hidden album-hover shadow-lg', 
      sizeClasses[size],
      className
    )}>
      <img 
        src={track.coverUrl} 
        alt={`${track.album} by ${track.artist}`} 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-2 left-2 text-white">
          <p className="font-bold text-sm truncate">{track.album}</p>
          <p className="text-xs opacity-80 truncate">{track.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCover;
