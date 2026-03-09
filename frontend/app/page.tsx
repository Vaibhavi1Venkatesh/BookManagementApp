"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [books, setBooks] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editYear, setEditYear] = useState("");

  // fetch books
  const fetchBooks = () => {
    axios.get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // add book
  const addBook = async () => {

    await axios.post("http://localhost:5000/books", {
      title: title,
      author: author,
      genre: genre,
      publication_year: Number(year)
    });

    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");

    fetchBooks();
  };
  const deleteBook = async (id: number) => {
  await axios.delete(`http://localhost:5000/books/${id}`);
  fetchBooks();
};
  const startEdit = (book: any) => {
  setEditingId(book.id);
  setEditTitle(book.title);
  setEditAuthor(book.author);
  setEditGenre(book.genre);
  setEditYear(book.publication_year);
};

const updateBook = async () => {

  await axios.put(`http://localhost:5000/books/${editingId}`, {
    title: editTitle,
    author: editAuthor,
    genre: editGenre,
    publication_year: Number(editYear)
  });

  setEditingId(null);
  fetchBooks();
};


  return (
    <div style={{ padding: "30px" }}>

      <h1>Book Management</h1>

      <h2>Add Book</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <br /><br />

      <button onClick={addBook}>Add Book</button>

      <hr />

      <h2>Book List</h2>

      {books.map((book) => (
  <div key={book.id} style={{marginBottom:"20px"}}>

    {editingId === book.id ? (

      <div>
        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
        <input value={editGenre} onChange={(e) => setEditGenre(e.target.value)} />
        <input value={editYear} onChange={(e) => setEditYear(e.target.value)} />

        <button onClick={updateBook}>Save</button>
      </div>

    ) : (

      <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.genre}</p>
        <p>{book.publication_year}</p>

        <button onClick={() => startEdit(book)}>Edit</button>
        <button onClick={() => deleteBook(book.id)}>Delete</button>
      </div>

    )}

  </div>
))}

    </div>
  );
}
