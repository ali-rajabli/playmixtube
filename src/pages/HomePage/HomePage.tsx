import React, { useEffect, useState } from "react";
import PlaylistList from "../../components/Playlist/PlaylistList";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  const [playlists, setPlaylists] = useState<string[]>([]);

  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const storedPlaylists = JSON.parse(
      localStorage.getItem("playlists") || "[]"
    );
    setPlaylists(storedPlaylists);
  }, []);

  const handleOnValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue === "") {
      return;
    }

    setNewPlaylistName(trimmedValue);
  };

  const handleCreatePlaylist = (e: any) => {
    e.preventDefault();

    console.log(1);
    if (newPlaylistName === "") {
      return;
    }

    console.log(2);
    const isPlaylistExist = playlists.some(
      (playlist) => playlist.toLowerCase() === newPlaylistName.toLowerCase()
    );

    console.log(3);
    if (isPlaylistExist) {
      console.log(4);
      setErrorMessage("Playlist already exists");
      return;
    }

    console.log(5);

    setErrorMessage("");

    console.log(6);
    const newPlaylists = [...playlists, newPlaylistName?.trim()];
    console.log(7);
    setPlaylists(newPlaylists);
    console.log(8);
    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    console.log(9);
    setNewPlaylistName("");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Your Playlists</h1>
      <FontAwesomeIcon icon={faPlay} />
      <hr className="home-hr"></hr>
      {playlists.length === 0 ? (
        <div className="no-playlist-section">
          <p>No playlists yet...</p>
        </div>
      ) : (
        <PlaylistList playlists={playlists} />
      )}
      <hr className="home-hr"></hr>
      <form className="new-plaaylist-form" onSubmit={handleCreatePlaylist}>
        <input
          className="new-playlist-input"
          type="text"
          name="new-playlist-name"
          placeholder="Name"
          onChange={handleOnValueInput}
          value={newPlaylistName}
          autoComplete="off"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="create-pl-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default HomePage;
