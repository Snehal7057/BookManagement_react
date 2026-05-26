import AddBookModal from "../components/AddBookModal";
import BookTable from "../components/BookTable";
import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

import "../css/dashboard.css";

import { useState } from "react";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  const [showModal, setShowModal] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All");

  const [sort, setSort] = useState("Latest");

  const [currentPage, setCurrentPage] = useState(1);

  function fetchBooks() {
    setRefresh(!refresh);
  }

  return (
    <div className="dashboard">
      <Sidebar setPage={setPage} openModal={() => setShowModal(true)} />

      <div className="main-content">
        <SearchBar
          openModal={() => setShowModal(true)}
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
        />

        {page === "dashboard" && <DashboardCards refresh={refresh} />}

        <BookTable
          refresh={refresh}
          triggerRefresh={fetchBooks}
          search={search}
          genre={genre}
          sort={sort}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <AddBookModal
          show={showModal}
          closeModal={() => setShowModal(false)}
          fetchBooks={fetchBooks}
        />
      </div>
    </div>
  );
}

export default Dashboard;
