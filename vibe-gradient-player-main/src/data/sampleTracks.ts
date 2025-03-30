export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
}

const getAudioUrl = (fileName: string): string => {
  return `/audio/${fileName}`;
};
// Culture Code - Make Me Move (feat. Karra) _ Dance Pop _ NCS - Copyright Free Music 4
export const sampleTracks: Track[] = [
  {
    id: "3",
    title: "Make Me Move",
    artist: "Culture Code",
    album: "NCS",
    coverUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: getAudioUrl("Make Me Move.mp3"),
    duration: 196
  },
  {
    id: "2",
    title: "Flute Music",
    artist: "Nature Recordings",
    album: "Serene Landscapes",
    coverUrl: "https://images.unsplash.com/photo-1439902315629-cd882022cea0",
    audioUrl: getAudioUrl("Flute Music.mp3"),
    duration: 151
  },
  {
    id: "3",
    title: "Hang Drums",
    artist: "Synth Wave",
    album: "Synth Vibes",
    coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: getAudioUrl("H-D.mp3"),
    duration: 139
  },
  {
    id: "4",
    title: "On & On",
    artist: "Cartoon, jeja",
    album: "NoCopyrightSounds",
    coverUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: getAudioUrl("On & On.mp3"),
    duration: 208
  },
  {
    id: "5",
    title: "Liquid Time",
    artist: "Akash Gandhi",
    album: "Free Chill out",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    audioUrl: getAudioUrl("Liquid Time.mp3"),
    duration: 171
  },
  {
    id: "6",
    title: "Feel Good",
    artist: "Syn Cole",
    album: "NoCopyrightSounds",
    coverUrl: "https://images.unsplash.com/photo-1723924995430-b74c76bbcdfd",
    audioUrl: getAudioUrl("Syn Cole - Feel Good.mp3"),
    duration: 182
  },
  {
    id: "7",
    title: "Glitch Hop",
    artist: "Tech Beats",
    album: "Future Sounds",
    coverUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: getAudioUrl("Glitch Hop.mp3"),
    duration: 273
  },
  
];
