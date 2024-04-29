import PropTypes from 'prop-types';

const Post = ({ title, author, subreddit, upvotes, comments }) => {
  return (
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
      {/* Image Placeholder */}
      <div className="mt-4">
        <img src="https://via.placeholder.com/150" alt="Post Image" className="w-full h-64 object-cover rounded-md" />
      </div>
      {/* Icons for Upvote, Downvote, and Comment */}
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
