import React, { useEffect, useRef, useState } from "react";
import { useRadio } from "../context/RadioContext";

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
      audioElement.play().then(() => {
        console.log("Audio is playing");
      }).catch(error => {
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
    <div className={`fixed-player ${isExpanded ? 'expanded' : ''}`}>
      <div className="player-content">
        <h2 className="station-name">{currentStation ? currentStation.name : "No Station Selected"}</h2>
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
      <style jsx>{`
        .fixed-player {
          position: fixed;
          top: 20px; /* Abstand vom oberen Rand */
          right: 20px; /* Abstand vom rechten Rand */
          width: 300px;
          background-color: #121212;
          z-index: 1000;
          padding: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          color: #ffffff;
          font-family: 'Fira Sans', sans-serif;
          transition: max-height 0.3s ease-in-out;
          overflow: hidden;
          max-height: 60px; /* Anfangsgröße des Players */
        }
        .fixed-player.expanded {
          max-height: 200px; /* Größe des Players, wenn erweitert */
        }
        .player-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .station-name {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #ec6525; /* Orange */
        }
        .mute-button {
          margin-top: 10px;
          background-color: #af368c; /* Lila */
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .mute-button:hover {
          background-color: #cf1820; /* Rot */
        }
        .mute-button:focus {
          outline: none;
        }
        .expand-button {
          background-color: #ec6525; /* Orange */
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          position: absolute;
          bottom: 5px;
          right: 10px;
        }
        .expand-button:hover {
          background-color: #af368c; /* Lila */
        }
        .expand-button:focus {
          outline: none;
        }
        .expanded-content {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default RadioPlayer;
