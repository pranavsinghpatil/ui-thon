
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
}

export const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Electric Dreams",
    artist: "Synth Wave",
    album: "Neon Nights",
    coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: "",
    duration: 241
  },
  {
    id: "2",
    title: "Ocean Breeze",
    artist: "Ambient Collective",
    album: "Natural Sounds Vol. 2",
    coverUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: "",
    duration: 183
  },
  {
    id: "3",
    title: "Mountain High",
    artist: "Nature Recordings",
    album: "Serene Landscapes",
    coverUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: "",
    duration: 275
  },
  {
    id: "4",
    title: "Digital Horizon",
    artist: "Tech Beats",
    album: "Future Sounds",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: "",
    duration: 198
  }
];
