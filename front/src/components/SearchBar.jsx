// SearchBar.js
const SearchBar = () => {
  return (
    <div className="container mx-auto mt-4">
      <input
        type="text"
        placeholder="Search Blogs"
        className="w-full p-2 border border-gray-300 rounded-3xl"
      />
    </div>
  );
};

export default SearchBar;
