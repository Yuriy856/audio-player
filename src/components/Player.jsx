import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  playIcon,
  pauseIcon,
  noCameraIcon,
  nextIcon,
  previousIcon,
} from "./Icons.jsx";

import { motion } from "motion/react";

import { InfoContext } from "./InfoContext.jsx";

// SVG ATRIBUTE
// stroke="current" fill="none"

// IMPORT ICONS SVG ========================================================
import VolumeMore from "/src/assets/img/volume-more.svg?react";
import VolumeMiddle from "/src/assets/img/volume-middle.svg?react";
import VolumeLess from "/src/assets/img/volume-less.svg?react";
import MuteVolume from "/src/assets/img/volume-mute.svg?react";
import RepeatSimple from "/src/assets/img/repeat-simple.svg?react";
import RepeatOne from "/src/assets/img/repeat-one.svg?react";
import RepeatOne1 from "/src/assets/img/repeat-one1.svg?react";
import Like from "/src/assets/img/like.svg?react";
// =========================================================================

export default function Player() {
  const {
    playing,
    setPlaying,
    currentTrack,
    setCurrentTrack,
    tracks,
    currentIndexTrack,
    setCurrentIndexTrack,
  } = useContext(InfoContext);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [liked, setLiked] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const prevVolumeRef = useRef(0.5);
  const [mute, setMute] = useState(false);

  const audioRef = useRef(null);
  const progressVolumeRef = useRef(null);

  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const sliderRef = useRef(null);
  const durationRef = useRef(null);
  const currentTimeRef = useRef(null);
  const musicVideoRef = useRef(null);

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  // PLAY / PAUSE BUTTON
  function togglePlayPause() {
    const audio = audioRef.current;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }

    setPlaying(!playing);
  }

  useEffect(() => {
    const audio = audioRef.current;

    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (audio.currentTime >= audio.duration) {
      handleNextButton();
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    let animationFrameId;
    let lastUpdateTime = 0;

    let updatesPerSecond = 0;
    let startTime = performance.now();

    function updateProgress(timestamp) {
      if (audio && !audio.paused) {
        if (timestamp - lastUpdateTime >= 45) {
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration || 0);
          updateProgressBar();

          lastUpdateTime = timestamp;
          updatesPerSecond++;
        }
        animationFrameId = requestAnimationFrame(updateProgress);

        if (timestamp - startTime >= 1000) {
          // console.log(`Updates per second: ${updatesPerSecond}`);
          updatesPerSecond = 0;
          startTime = timestamp;
        }
      }
    }

    if (playing) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [playing, currentTrack]);

  useEffect(() => {
    // console.log(`Current Time: ${formatDuration(currentTime)}`);
  }, [currentTime]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audioRef.current) {
      setDuration(0);
      setCurrentTime(audio.currentTime);
      audio.play();
    }
    // currentTimeRef.current.innerText = `${formatDuration(currentTime)}`;
    // durationRef.current.innerText = `${formatDuration(duration)}`;
  }, [currentTrack]);

  function handleLoadedData() {
    const audioDuration = audioRef.current.duration;

    if (!isNaN(audioDuration)) {
      setDuration(audioDuration);
    }
  }

  function handlePreviousButton() {
    const newIndexTrack =
      currentIndexTrack > 0 ? currentIndexTrack - 1 : currentIndexTrack;

    setCurrentIndexTrack(newIndexTrack);
    setCurrentTrack(tracks[newIndexTrack]);

    setProgress(0);
    setPlaying(true);
    updateProgressBar();
  }

  function handleNextButton() {
    const newIndexTrack =
      currentIndexTrack < tracks.length - 1 ? currentIndexTrack + 1 : 0;

    setCurrentIndexTrack(newIndexTrack);
    setCurrentTrack(tracks[newIndexTrack]);

    setProgress(0);
    updateProgressBar();
    setPlaying(true);
  }

  function handleRepeat() {
    setIsRepeat(!isRepeat);
  }
  useEffect(() => {
    console.log(`IsRepeat: ${isRepeat}`);
  }, [isRepeat]);

  // useEffect(() => {
  //   console.log(`Current Track: ${currentIndexTrack}`);
  // }, [currentIndexTrack]);

  function handleLikeButton() {
    setLiked(!liked);
  }

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  // VOLUME CHANGE ==================================================================================
  function handleVolumeClick(event) {
    const volumeBox = event.currentTarget;

    const rectObj = volumeBox.getBoundingClientRect();
    const clickX = event.clientX - rectObj.left;
    let newVolumeValue = clickX / 100;

    newVolumeValue = newVolumeValue < 0 ? 0 : newVolumeValue;
    newVolumeValue = newVolumeValue > 1 ? 1 : newVolumeValue;

    setVolume(newVolumeValue);

    if (newVolumeValue === 0) {
      setMute(true);
    } else {
      setMute(false);
    }

    if (newVolumeValue !== 0) {
      prevVolumeRef.current = newVolumeValue;
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    progressVolumeRef.current.style.width = `${volume * 100}%`;
    console.log(`State Volume Change: ${volume}`);
  }, [volume]);

  function handleMuteChange() {
    setMute(!mute);
  }

  useEffect(() => {
    if (mute) {
      if (volume !== 0) {
        prevVolumeRef.current = volume;
      }
      setVolume(0);
    } else {
      setVolume(prevVolumeRef.current);
    }

    console.log(`Mute: ${mute}`);
  }, [mute]);

  // PROGRESS BAR FUNCTIONS =====================================================================
  function handleProgressBarClick(event) {
    const audio = audioRef.current;
    const video = musicVideoRef.current;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
    video.currentTime = newTime;
    setCurrentTime(newTime);

    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
  }

  function updateProgressBar() {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;

    progressRef.current.style.width = `${progress}%`;
  }

  function handleSliderMove(event) {
    // event.preventDefault();
    // if (!isDragging) return;
    // const rect = progressBarRef.current.getBoundingClientRect();
    // let newProgress = ((event.clientX - rect.left) / rect.width) * 100;
    // newProgress = Math.max(0, Math.min(newProgress, 100));
    // setProgress(newProgress);
    // const newTime = (newProgress / 100) * audioRef.current.duration;
    // audioRef.current.currentTime = newTime;
  }

  function handleSliderStart(event) {
    // setIsDragging(true);
    // handleSliderMove(event);
    // document.addEventListener("mousemove", handleSliderMove);
    // document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseUp() {
    // if (isDragging) {
    //   setIsDragging(false);
    //   document.removeEventListener("mousemove", handleSliderMove);
    //   document.removeEventListener("mouseup", handleMouseUp);
    // }
  }

  return (
    <div className="player-container">
      <motion.div
        className="player-container-background"
        style={{ backgroundImage: `url("${currentTrack.img}")` }}
        key={currentIndexTrack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      ></motion.div>
      <div className="music-info">
        {/* <div className="music-img-container">{noCameraIcon}</div> */}
        <motion.div
          key={currentIndexTrack}
          className="music-img-container"
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{
            scale: [0.9, 1.02, 1],
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <img src={currentTrack.img} />
        </motion.div>

        <motion.div
          className="track-title-container"
          key={currentTrack.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="track-title">{currentTrack.title}</h2>
          <p>-</p>
          <p className="track-actist">{currentTrack.artist}</p>
        </motion.div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        muted={mute}
        loop={isRepeat}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <div className="audio-controls">
        <div className="controls-container-one">
          <button className="button-like" onClick={handleLikeButton}>
            <Like
              className="button-like-icon"
              style={{ fill: liked ? "#f25555" : "grey" }}
            />
          </button>
          <button className="button-previous" onClick={handlePreviousButton}>
            {previousIcon}
          </button>
          <button className="button-play" onClick={togglePlayPause}>
            {playing ? pauseIcon : playIcon}
          </button>
          <button className="button-next" onClick={handleNextButton}>
            {nextIcon}
          </button>
          <button className="button-repeat" onClick={handleRepeat}>
            {isRepeat ? (
              <RepeatOne1 className="button-repeat-icon repeat-icon-active" />
            ) : (
              <RepeatSimple className="button-repeat-icon" />
            )}
          </button>
        </div>
        <div className="controls-container-two">
          <div className="progress-bar-container">
            <p className="current-time" ref={currentTimeRef}>
              {formatDuration(currentTime)}
            </p>
            <div
              className="progress-bar"
              onMouseDown={handleProgressBarClick}
              onMouseMove={isDragging ? handleSliderMove : null}
              onMouseUp={handleMouseUp}
              ref={progressBarRef}
            >
              <div
                className="progress"
                ref={progressRef}
                style={{ width: `${progress}%` }}
              >
                <button
                  className="slider"
                  onMouseDown={handleSliderStart}
                  ref={sliderRef}
                ></button>
              </div>
            </div>
            <p className="total-time" ref={durationRef}>
              {formatDuration(duration)}
            </p>
          </div>
          <div className="volume-container">
            <button className="volume-buttom" onClick={handleMuteChange}>
              {mute || volume === 0 ? (
                <MuteVolume className="volume-mute-icon" />
              ) : volume >= 0.7 ? (
                <VolumeMore className="volume-more-icon" />
              ) : volume >= 0.3 ? (
                <VolumeMiddle className="volume-middle-icon" />
              ) : (
                <VolumeLess className="volume-less-icon" />
              )}
            </button>
            <div
              className="progress-volume-container"
              onClick={handleVolumeClick}
            >
              <div className="progress-volume" ref={progressVolumeRef}>
                <div className="volume-slider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PROPTYPES
Player.propTypes = {
  currentTrack: PropTypes.object.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
  currentIndexTrack: PropTypes.number.isRequired,
  setCurrentIndexTrack: PropTypes.func.isRequired,
};
