import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    const res = await axios.get(`/api/comments?videoId=${videoId}`);
    setComments(res.data);
  };

  const postComment = async () => {
    await axios.post('/api/comments', { videoId, text });
    setText('');
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(`/api/comments/${id}`);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Comments</h2>
      <input value={text} onChange={e => setText(e.target.value)} className="block p-1 border" />
      <button onClick={postComment} className="mt-1 px-4 py-1 bg-green-500 text-white">Add Comment</button>
      <ul className="mt-2">
        {comments.map(c => (
          <li key={c._id} className="border p-2 my-1">
            {c.text}
            <button onClick={() => deleteComment(c._id)} className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsSection;