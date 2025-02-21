import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import './youtubeSearch.css';

const YoutubeSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get(`${server}/api/youtube/search`, {
        params: { query },
        headers: {
          token,
        },
      });
      setVideos(data.videos);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="youtube-search">
      <h2 className="youtube-title">Search YouTube Videos</h2>
      <form onSubmit={handleSearch} className="youtube-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos"
          required
          className="youtube-input"
        />
        <button type="submit" className="youtube-button">Search</button>
      </form>
      <div className="youtube-video-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="youtube-video-card">
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="youtube-thumbnail" />
            <h3 className="youtube-video-title">{video.snippet.title}</h3>
            <p className="youtube-video-description">{video.snippet.description}</p>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-link"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSearch;