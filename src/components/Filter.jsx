function Filter({ onFilter }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <label>Filter by Date:</label>
      <input
        type="date"
        onChange={(e) => onFilter(e.target.value)}
      />
      <button onClick={() => onFilter("")}>Clear Filter</button>
    </div>
  );
}

export default Filter;
