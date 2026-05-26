import "../css/sidebar.css";

function Sidebar({ openModal, setPage }) {
  return (
    <div className="sidebar">
      <h2> Book Manager</h2>

      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>

        <li onClick={() => setPage("books")}>All Books</li>

        <li onClick={openModal}>Add Book</li>

        <li>Genres</li>

        <li>Settings</li>
      </ul>

      <div className="quick">
        <h4>Quick Actions</h4>

        <button className="add-btn" onClick={openModal}>
          + Add New Book
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
