import React, { useState } from 'react';
import axios from 'axios';

function VideoDetails({ video }) {
  const [title, setTitle] = useState(video.snippet.title);
  const [description, setDescription] = useState(video.snippet.description);

  const handleUpdate = async () => {
    await axios.put(`https://youtub-api.onrender.com/api/video/${video.id}`, { title, description });
    alert('Update simulated (OAuth required for real update).');
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Video Details</h2>
      <div className="aspect-video w-full mb-4">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${video.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p><strong>Title:</strong> {video.snippet.title}</p>
      <p><strong>Description:</strong> {video.snippet.description}</p>
      <p><strong>Views:</strong> {video.statistics.viewCount}</p>
      <input value={title} onChange={e => setTitle(e.target.value)} className="block mt-2 p-1 border" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} className="block mt-2 p-1 border" />
      <button onClick={handleUpdate} className="mt-2 px-4 py-1 bg-blue-500 text-white">Update</button>
    </div>
  );
}

export default VideoDetails;