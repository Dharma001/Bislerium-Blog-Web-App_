import SearchBar from '../components/SearchBar';


const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold w-full">Bislerium Blog</div>
        <SearchBar />
        <div className="lg:flex space-x-4">
          <button className="w-20 rounded-3xl bg-gray-600 px-2 py-2">
            <a href="/create" className="text-gray-50">+ Create</a>
          </button>
          <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
            <a href="/login" className="text-gray-50">Login</a>
          </button>
          <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
            <a href="/register" className="text-gray-50 first-letter:">Sign Up</a>
          </button>
          <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
            <a href="/Notif" className="text-gray-50">Notif</a>
          </button>
          {/* icon hala yeta */}
          <button className="w-20 rounded-3xl bg-orange-600 px-2 py-2">
            <a href="/Profile" className="text-gray-50">Profile</a>
          </button>
          <div />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
