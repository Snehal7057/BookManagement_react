import { useState } from "react";
import axios from "axios";

function AddBookModal({ show, closeModal, fetchBooks }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    status: "Available",
  });

  function handleChange(e) {
    setBook({
      ...book,

      [e.target.name]: e.target.value,
    });
  }

  async function saveBook() {
    try {
      await axios.post(
        "https://6a19a86b489e4715751a52ad.mockapi.io/api/v1/book",

        book,
      );

      fetchBooks();

      closeModal();

      setBook({
        title: "",
        author: "",
        genre: "",
        year: "",
        status: "Available",
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Add New Book</h2>

        <input
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Publication Year"
          value={book.year}
          onChange={handleChange}
        />

        <select name="status" value={book.status} onChange={handleChange}>
          <option>Available</option>

          <option>Issued</option>
        </select>

        <div className="buttons">
          <button onClick={closeModal}>Cancel</button>

          <button onClick={saveBook}>Save Book</button>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
