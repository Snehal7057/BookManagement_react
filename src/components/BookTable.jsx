import axios from "axios";
import { useEffect, useState } from "react";

function BookTable({

refresh,

triggerRefresh,

search,

genre,

sort,

currentPage,

setCurrentPage

}){ 
  const [books, setBooks] = useState([]);

  const [editingBook, setEditingBook] = useState(null);

  const booksPerPage = 5;

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  async function fetchBooks() {
    try {
      const response = await axios.get("http://localhost:3000/books");

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBook(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/books/${id}`);

      fetchBooks();

      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  }



  function startEdit(book) {
    setEditingBook(book);
  }

  async function updateBook() {
    try {
      await axios.put(
        `http://localhost:3000/books/${editingBook.id}`,

        editingBook,
      );

      setEditingBook(null);

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredBooks = books

    .filter((book) => {
      const title = book.title?.toLowerCase() || "";

      const author = book.author?.toLowerCase() || "";

      const searchText = search?.toLowerCase() || "";

      return title.includes(searchText) || author.includes(searchText);
    })

    .filter((book) => {
      if (genre === "All" || !genre) {
        return true;
      }

      return book.genre === genre;
    })
    .sort((a, b) => {
      if (sort === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "Oldest") {
        return a.year - b.year;
      }

      return b.year - a.year;
    });

  const last = currentPage * booksPerPage;

  const first = last - booksPerPage;

  const currentBooks = filteredBooks.slice(
    first,

    last,
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>Title</th>

            <th>Author</th>

            <th>Genre</th>

            <th>Year</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>

              <td>{book.author}</td>

              <td>{book.genre}</td>

              <td>{book.year}</td>

              <td>
                <span
                  className={book.status === "Available" ? "green" : "orange"}
                >
                  {book.status}
                </span>
              </td>

              <td>
                <button className="edit-btn" onClick={() => startEdit(book)}>
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({
          length: totalPages,
        }).map((_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {editingBook && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Edit Book</h2>

            <input
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,

                  title: e.target.value,
                })
              }
            />

            <input
              value={editingBook.author}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,

                  author: e.target.value,
                })
              }
            />

            <input
              value={editingBook.genre}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,

                  genre: e.target.value,
                })
              }
            />

            <input
              value={editingBook.year}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,

                  year: e.target.value,
                })
              }
            />

            <select
              value={editingBook.status}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,

                  status: e.target.value,
                })
              }
            >
              <option>Available</option>

              <option>Issued</option>
            </select>

            <div className="buttons">
              <button onClick={() => setEditingBook(null)}>Cancel</button>

              <button onClick={updateBook}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookTable;
