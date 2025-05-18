import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoDetails from './components/VideoDetails';
import CommentsSection from './components/CommentSection';
import NotesSection from './components/NoteSection';

function App() {
  const [videoId, setVideoId] = useState('BqH6ZRjeBUg');
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet,statistics',
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY
        }
      });
      setVideoData(res.data.items[0]);
    };
    fetchVideoData();
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