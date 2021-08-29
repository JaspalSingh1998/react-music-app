import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon size="2x" icon={faPlay} />
        <FontAwesomeIcon size="2x" icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Player;
