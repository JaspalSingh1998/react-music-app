import { useState } from "react";

import Song from "./components/song.js";
import Player from "./components/Player.js";

import "./styles/app.scss";

import data from "./util.js";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
}

export default App;
