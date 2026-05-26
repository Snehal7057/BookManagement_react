import axios from "axios";
import { useEffect, useState } from "react";

function DashboardCards({ refresh }) {
  const [stats, setStats] = useState({
    totalBooks: 0,

    availableBooks: 0,

    pendingReturns: 0,
  });

  useEffect(() => {
    fetchStats();
  }, [refresh]);

  async function fetchStats() {
    try {
      const response = await axios.get("http://localhost:3000/books");

      const books = response.data;

      const available = books.filter(
        (book) => book.status === "Available",
      ).length;

      const issued = books.filter((book) => book.status === "Issued").length;

      setStats({
        totalBooks: books.length,

      
        availableBooks: available,

        pendingReturns: issued,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cards">
      <div className="card">
        <h4>📚 Total Books</h4>

        <h2>{stats.totalBooks}</h2>
      </div>

     

      <div className="card">
        <h4>✅ Available Books</h4>

        <h2>{stats.availableBooks}</h2>
      </div>

      <div className="card">
        <h4>⏳ Pending Returns</h4>

        <h2>{stats.pendingReturns}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;
