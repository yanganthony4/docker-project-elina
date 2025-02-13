"use client";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/notes";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Fetch Notes
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingNote ? "PUT" : "POST";
    const endpoint = editingNote ? `${API_URL}/${editingNote._id}` : API_URL;

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await response.json();
    if (editingNote) {
      setNotes(notes.map((note) => (note._id === newNote._id ? newNote : note)));
    } else {
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
    setEditingNote(null);
  };

  // Handle Edit
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Simple Notes App</h1>

      {/* Note Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingNote ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes List */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Notes:</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note._id} className="border p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div>
                <button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
