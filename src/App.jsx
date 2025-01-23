import { useState, useEffect } from "react";
import Player from "./components/Player";
import TrackList from "./components/TrackList/TrackList";

import { InfoContext } from "./components/InfoContext";

function App() {
  const tracks = [
    {
      id: 0,
      title: "Her Eyes",
      artist: "Narvent",
      src: "src/assets/audio/Narvent - Her Eyes.mp3",
      img: "src/assets/song-imgs/Narvent - Her Eyes.jpg",
    },
    {
      id: 1,
      title: "distorted memories",
      artist: "øneheart x reidenshi",
      src: "src/assets/audio/øneheart x reidenshi - distorted memories.mp3",
      img: "src/assets/song-imgs/øneheart x reidenshi - distorted memories.jpg",
    },
    {
      id: 2,
      title: "Pure Imagination",
      artist: "VXLLAIN, Kenny Gray",
      src: "src/assets/audio/VXLLAIN, Kenny Gray - Pure Imagination.mp3",
      img: "src/assets/song-imgs/VXLLAIN, Kenny Gray - Pure Imagination.jpg",
    },
    {
      id: 3,
      title: "FUNK INFERNAL (SUPER SLOWED)",
      artist: "DYGO, Mxng0",
      src: "src/assets/audio/DYGO, Mxng0 - FUNK INFERNAL (SUPER SLOWED).mp3",
      img: "src/assets/song-imgs/DYGO, Mxng0 - FUNK INFERNAL (SUPER SLOWED).jpg",
    },
    {
      id: 4,
      title: "2 hands (Don Diablo remix)",
      artist: "Tate McRae, Don Diablo",
      src: "src/assets/audio/Tate McRae, Don Diablo - 2 hands (Don Diablo remix).mp3",
      img: "src/assets/song-imgs/Tate McRae, Don Diablo - 2 hands (Don Diablo remix).jpg",
    },
    {
      id: 5,
      title: "DEFEATED",
      artist: "MAXPVNK, DJ RITMO DIVINO",
      src: "src/assets/audio/MAXPVNK, DJ RITMO DIVINO - DEFEATED.mp3",
      img: "src/assets/song-imgs/MAXPVNK, DJ RITMO DIVINO - DEFEATED.jpg",
    },
    {
      id: 6,
      title: "Bam Bam",
      artist: "Misha Miller, Alex Velea",
      src: "src/assets/audio/Misha Miller, Alex Velea - Bam Bam.mp3",
      img: "src/assets/song-imgs/Misha Miller, Alex Velea - Bam Bam.jpg",
    },
    {
      id: 7,
      title: "Congratulations",
      artist: "Don Diablo, Brando",
      src: "src/assets/audio/Don Diablo, Brando - Congratulations.mp3",
      img: "src/assets/song-imgs/Don Diablo, Brando - Congratulations.jpg",
    },
    {
      id: 8,
      title: "Strange Memory",
      artist: "Narvent",
      src: "src/assets/audio/Narvent - Strange Memory.mp3",
      img: "src/assets/song-imgs/Narvent - Strange Memory.jpg",
    },
    {
      id: 9,
      title: "Shimmering",
      artist: "Navjaxx",
      src: "src/assets/audio/Navjaxx - Shimmering.mp3",
      img: "src/assets/song-imgs/Navjaxx - Shimmering.jpg",
    },
    {
      id: 10,
      title: "INTERWORLD",
      artist: "DXSTINY",
      src: "src/assets/audio/DXSTINY - INTERWORLD.mp3",
      img: "src/assets/song-imgs/DXSTINY - INTERWORLD.jpg",
    },
    {
      id: 10,
      title: "INTERWORLD",
      artist: "DXSTINY",
      src: "src/assets/audio/DXSTINY - INTERWORLD.mp3",
      img: "src/assets/song-imgs/DXSTINY - INTERWORLD.jpg",
    },
  ];

  const [currentIndexTrack, setCurrentIndexTrack] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[currentIndexTrack]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    console.log(`Playing: ${playing}`);
  }, [playing]);

  return (
    <div className="player-app">
      <InfoContext.Provider
        value={{
          playing,
          setPlaying,
          tracks,
          currentTrack,
          setCurrentTrack,
          currentIndexTrack,
          setCurrentIndexTrack,
        }}
      >
        <Player />
        <TrackList tracks={tracks} />
      </InfoContext.Provider>
    </div>
  );
}

export default App;
