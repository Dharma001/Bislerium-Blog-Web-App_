import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Post from '../components/Post';

const Home = () => {

  const posts = [
    { title: 'Example Post 1', author: 'user1', subreddit: 'example', upvotes: 100, comments: 20 },
    { title: 'Example Post 2', author: 'user2', subreddit: 'example', upvotes: 50, comments: 10 },
    // Add more posts as needed
  ];

  return (
    <div class="flex flex-col justify-center items-center space-y-2 animate-fade-in-right bg-slate-800 min-h-screen mx-auto">
      <Navbar />
      <SearchBar />
      <h1 className="text-4xl font-extrabold text-center text-gray-50">Welcome to Our Blog Platform</h1>
      <p className="text-gray-50 text-lg text-center">
        Explore a world of diverse perspectives, insightful stories, and thought-provoking content.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-lg p-1 shadow-lg">          
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold text-blue-600">Read the Latest</h2>

          <p className="text-gray-700">
            Dive into our newest blog posts covering a wide range of topics from technology to travel.
          </p>
          <a href="/blogs" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Explore Blogs</a>
        </div>

        <div className="bg-white rounded-lg p-1 shadow-lg">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg " />
          <h2 className="text-2xl font-bold text-blue-600">Become a Blogger</h2>
          <p className="text-gray-700">
            Share your thoughts, experiences, and expertise with our community. Start blogging today!
          </p>
          <a href="/signup" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Sign Up to Blog</a>
        </div>

        <div className="bg-white rounded-lg p-1 shadow-lg">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg " />
          <h2 className="text-2xl font-bold text-blue-600">Engage with the Community</h2>
          <p className="text-gray-700">
            Join the conversation by commenting on blog posts and interacting with other members.
          </p>
          <a href="/blogs" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Start Engaging</a>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;