import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotesSection({ videoId }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get(`/api/notes?videoId=${videoId}&search=${search}`);
    setNotes(res.data);
  };

  const postNote = async () => {
    await axios.post('/api/notes', { videoId, content });
    setContent('');
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, [videoId, search]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Notes</h2>
      <input value={content} onChange={e => setContent(e.target.value)} className="block p-1 border" placeholder="Note" />
      <button onClick={postNote} className="mt-1 px-4 py-1 bg-purple-500 text-white">Add Note</button>

      <input value={search} onChange={e => setSearch(e.target.value)} className="block mt-2 p-1 border" placeholder="Search notes" />

      <ul className="mt-2">
        {notes.map(n => (
          <li key={n._id} className="border p-2 my-1">{n.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotesSection;