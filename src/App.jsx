import { useState, useEffect } from "react";
import Player from "./components/Player";
import TrackList from "./components/TrackList/TrackList";

import { InfoContext } from "./components/InfoContext";

import { tracks } from "./utils/tracks";

function App() {
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
