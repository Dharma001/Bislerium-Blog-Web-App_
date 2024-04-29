
const Navbar = () => {


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Bislerium Blog</div>
        {/* Hide on smaller screens, show on larger screens */}
        <div className="hidden lg:flex space-x-4">
          <a href="#" className="text-white">Login</a>
          <a href="#" className="text-white">Sign Up</a>
          <div />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
