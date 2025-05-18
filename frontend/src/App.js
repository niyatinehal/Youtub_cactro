import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoDetails from './components/VideoDetails';
import CommentsSection from './components/CommentSection';
import NotesSection from './components/NoteSection';

function App() {
  const [videoId, setVideoId] = useState('BqH6ZRjeBUg');
  const [videoData, setVideoData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        // Simulate or implement authentication
        const authRes = await axios.get('http://localhost:5000/auth/google'); 
        if (authRes.status === 200) {
          setIsAuthenticated(true);

          // Proceed to fetch video data after auth
          const videoRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
              part: 'snippet,statistics',
              id: videoId,
              key: process.env.REACT_APP_YOUTUBE_API_KEY
            }
          });
          setVideoData(videoRes.data.items[0]);
        }
      } catch (error) {
        console.error('Authentication or data fetch failed:', error);
      }
    };

    authenticateAndFetchData();
  }, [videoId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">YouTube Companion Dashboard</h1>
      {videoData && <VideoDetails video={videoData} />}
      <CommentsSection videoId={videoId} />
      <NotesSection videoId={videoId} />
    </div>
  );
}

export default App;