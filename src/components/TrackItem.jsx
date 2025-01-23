import { useContext } from "react";
import { playIcon, pauseIcon } from "./Icons";
import PropTypes from "prop-types";

import { motion } from "motion/react";

import { InfoContext } from "./InfoContext";

export default function TrackItem(props) {
  const { track, index } = props;

  const {
    playing,
    setPlaying,
    tracks,
    currentIndexTrack,
    setCurrentTrack,
    setCurrentIndexTrack,
  } = useContext(InfoContext);

  function handlePlayButton() {
    if (index === currentIndexTrack) {
      setPlaying(!playing);
    } else {
      setCurrentIndexTrack(index);
      setCurrentTrack(tracks[index]);
      setPlaying(true);
    }
  }

  return (
    <li
      className="track-item"
      key={index}
      style={
        currentIndexTrack === index ? { backgroundColor: "#313248" } : null
      }
    >
      <p className="track-number">{index + 1}</p>
      <div className="track-img">
        <img src={track.img} alt="" className="track-img" />
        <button
          className="play-song-button"
          onClick={handlePlayButton}
          style={currentIndexTrack === index ? { opacity: 1 } : null}
        >
          {currentIndexTrack === index && playing ? pauseIcon : playIcon}
        </button>
      </div>
      <div className="track-info">
        <p className="track-title">{track.title}</p>
        <p className="track-artist">{track.artist}</p>
      </div>

      <div
        className="audiowave"
        style={
          currentIndexTrack === index && playing
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
      >
        <motion.div
          className="audiowave-item"
          initial={{ height: 0 }}
          animate={{ height: 10 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="audiowave-item"
          initial={{ height: 5 }}
          animate={{ height: 15 }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="audiowave-item"
          initial={{ height: 2 }}
          animate={{ height: 20 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="audiowave-item"
          initial={{ height: 2 }}
          animate={{ height: 12 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="audiowave-item"
          initial={{ height: 1 }}
          animate={{ height: 5 }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>
    </li>
  );
}

// PROPTYPES
TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
