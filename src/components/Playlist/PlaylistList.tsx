import React from "react";
import "./PlaylistList.css";

interface PlaylistListProps {
  playlists: string[];
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlists }) => {
  return (
    <div className="playlist-list-container">
      {playlists.map((playlist, index) => (
        <div key={index} className="single-playlist-container">
          <div>
            {playlist.length > 40 ? playlist.slice(0, 36) + "..." : playlist}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
