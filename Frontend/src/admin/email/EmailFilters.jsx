export default function EmailFilters({ filter, setFilter }) {
  return (
    <input
      type="text"
      placeholder="Filter by subject..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-2 w-full mb-4"
    />
  );
}