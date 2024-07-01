import React, { useEffect, useRef, useState } from "react";
import { useRadio } from "../context/RadioContext";
import "./RadioPlayer.css";

const RadioPlayer = () => {
  const { currentStation } = useRadio();
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
    setIsExpanded(!isExpanded);
    console.log("Toggling expand:", !isExpanded);
  };

  return (
    <div className={`fixed-player ${isExpanded ? "expanded" : ""}`}>
      <div className="player-content">
        <h2 className="station-name">
          {currentStation ? currentStation.name : "No Station Selected"}
        </h2>
        <button className="mute-button" onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <audio ref={audioRef} controls autoPlay hidden />
        {isExpanded && (
          <div className="expanded-content">
            <p>Country: {currentStation.country}</p>
            <p>State: {currentStation.state}</p>
            <p>Tags: {currentStation.tags}</p>
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
