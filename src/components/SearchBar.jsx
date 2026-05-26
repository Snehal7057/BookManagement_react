function SearchBar({
  openModal,

  search,

  setSearch,

  genre,

  setGenre,

  sort,

  setSort,
}) {
  return (
    <div className="top-bar">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books..."
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option>All</option>

        <option>Programming</option>

        <option>Finance</option>

        <option>Novel</option>

        <option>Self Help</option>

        <option>Emotional</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option>Latest</option>

        <option>Oldest</option>

        <option>A-Z</option>
      </select>

      <button className="add-btn" onClick={openModal}>
        + Add Book
      </button>
    </div>
  );
}

export default SearchBar;
