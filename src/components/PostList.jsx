import { useState, useEffect } from 'react';
import Post from '../models/Post';
import User from '../models/User';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts and populate author information
        const fetchedPosts = await Post.find()
          .populate('author', 'username')
          .sort({ createdAt: -1 });
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (title, content) => {
    try {
      // In a real app, you'd get the current user from your auth context
      const currentUser = await User.findOne({ username: 'exampleUser' });
      
      const newPost = new Post({
        title,
        content,
        author: currentUser._id
      });

      await newPost.save();
      
      // Refresh the posts list
      const updatedPosts = await Post.find()
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      <div className="row">
        {posts.map(post => (
          <div key={post._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Posted by {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList; 