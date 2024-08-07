import React, { useEffect, useRef, useState } from "react";
import { useRadio } from "../context/RadioContext";
import "./RadioPlayer.css";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import * as Io5Icons from "react-icons/io5";

const RadioPlayer = () => {
  const { currentStation, addFavorite, removeFavorite, isFavorite } =
    useRadio();
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (currentStation) {
      console.log("Loading current station:", currentStation.url);
      audioElement.src = currentStation.url;
      audioElement
        .play()
        .then(() => {
          console.log("Audio is playing");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } else {
      audioElement.pause();
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [currentStation]);

  const toggleMute = () => {
    const audioElement = audioRef.current;
    setMuted(!muted);
    audioElement.muted = !muted;
    console.log("Toggling mute:", !muted);
  };

  const toggleExpand = () => {
    if (currentStation) {
      setIsExpanded(!isExpanded);
      console.log("Toggling expand:", !isExpanded);
    }
  };

  return (
    <div className={`fixed-player ${isExpanded ? "expanded" : ""}`}>
      <div className="player-content">
        <div className="favorite">
          <h2 className="station-name">
            {currentStation ? currentStation.name : "No Station Selected"}
          </h2>
          {currentStation && (
            <button
              className="favoriteToggle-button"
              onClick={() =>
                isFavorite(currentStation)
                  ? removeFavorite(currentStation)
                  : addFavorite(currentStation)
              }
            >
              <HeartIcon
                className={isFavorite(currentStation) ? "filled" : "unfilled"}
              />
            </button>
          )}
        </div>
        <button className="mute-button" onClick={toggleMute}>
          {muted ? <Io5Icons.IoVolumeMuteSharp /> : <Io5Icons.IoVolumeHigh />}
        </button>
        <audio ref={audioRef} controls autoPlay hidden />
        {isExpanded && (
          <div className="expanded-content">
            <p>Country: {currentStation.country}</p>
            <p>State: {currentStation.state}</p>
            <div className="tags-container">
              <p>Tags: {currentStation.tags} </p>
            </div>
          </div>
        )}
      </div>

      <button className="expand-button" onClick={toggleExpand}>
        {isExpanded ? "▲" : "▼"}
      </button>
    </div>
  );
};

export default RadioPlayer;
