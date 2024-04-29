import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

const Post = ({ title, author, subreddit, upvotes, comments }) => {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden w-4/5 mx-auto">
      <SearchBar />
      <h1 className="text-4xl font-extrabold text-center text-gray-50 my-5">Welcome to Our Blog Platform</h1>
      <p className="text-gray-50 text-lg text-center mb-5">
        Explore a world of diverse perspectives, insightful stories, and thought-provoking content.
      </p>
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-lg p-1 shadow-lg flex flex-col items-center "> {/* Centered content */}
            <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold text-blue-600">Read the Latest</h2>
            <p className="text-gray-700">
              Dive into our newest blog posts covering a wide range of topics from technology to travel.
            </p>
            <a href="/blogs" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Explore Blogs</a>
          </div>

          <div className="bg-white rounded-lg p-1 shadow-lg flex flex-col items-center "> {/* Centered content */}
            <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold text-blue-600">Become a Blogger</h2>
            <p className="text-gray-700">
              Share your thoughts, experiences, and expertise with our community. Start blogging today!
            </p>
            <a href="/signup" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Sign Up to Blog</a>
          </div>

          <div className="bg-white rounded-lg p-1 shadow-lg flex flex-col items-center "> {/* Centered content */}
            <img src="https://via.placeholder.com/300x200" alt="Placeholder Image" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold text-blue-600">Engage with the Community</h2>
            <p className="text-gray-700">
              Join the conversation by commenting on blog posts and interacting with other members.
            </p>
            <a href="/blogs" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Start Engaging</a>
          </div>
        </div>


        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          <div className="flex justify-between items-center">
            <div>

              <h2 className="text-xl font-bold">{title}</h2>
              <img src="https://via.placeholder.com/50" alt="Profile Image" className="w-10 h-10 rounded-full" />
              <p className="text-gray-600">Posted by {author} in {subreddit}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{upvotes} upvotes</span>
              <span className="text-gray-600">{comments} comments</span>
            </div>
          </div>

          <div className="mt-4">
            <img src="https://via.placeholder.com/150" alt="Post Image" className="w-full h-64 object-cover rounded-md" />
          </div>

          <div className="flex justify-start items-center mt-4">
            <button className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>Upvote</span>
            </button>
            <button className="flex items-center space-x-2 ml-4">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span>Downvote</span>
            </button>
            <button className="flex items-center space-x-2 ml-4">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  subreddit: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

export default Post;
