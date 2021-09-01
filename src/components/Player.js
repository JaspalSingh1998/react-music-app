import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "../util";

const Player = ({
  currentSong,
  setCurrentSong,
  songInfo,
  setSongInfo,
  audioRef,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
}) => {
  useEffect(() => {
    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
  function playSongHandler() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  }

  function skipTrackHandler(direction) {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);

        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef);
  }
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          class="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          size="2x"
          onClick={() => skipTrackHandler("skip-back")}
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
