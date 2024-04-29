// SearchBar.js
const SearchBar = () => {
  return (
    <div className="container mx-auto mt-2">
      <input
        type="text"
        placeholder="Search Blogs"
        className=" p-2 border border-gray-300 rounded-3xl justify-center "
      />
    </div>
  );
};

export default SearchBar;
