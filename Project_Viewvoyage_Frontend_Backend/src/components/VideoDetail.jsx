import { useParams, Link } from 'react-router-dom';
import { Container, Button, Form, Toast } from 'react-bootstrap';
import { useState } from 'react';
import { FaHeart, FaList, FaDownload, FaShare, FaComment, FaPlayCircle } from 'react-icons/fa';

function VideoDetail({ videos, onLike, onSave, user }) {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const video = videos.find(v => v.id === parseInt(id));

  // Get recommended videos (excluding current video)
  const recommendedVideos = videos
    .filter(v => v.id !== parseInt(id))
    .slice(0, 5); // Show top 5 recommended videos

  if (!video) return <div>Video not found</div>;

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim() && user) {
      setComments([...comments, { text: comment, user: user.name, timestamp: new Date() }]);
      setComment('');
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = video.url;
    a.download = `${video.title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: video.title,
          text: video.description || 'Check out this video!',
          url: shareUrl,
        });
        setToastMessage('Shared successfully!');
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setToastMessage('Link copied to clipboard!');
      }
    } catch (error) {
      setToastMessage('Failed to share. Please try again.');
    }
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="video-detail-page">
      <div className="video-content-layout">
        <div className="main-content">
          <div className="video-section">
            <div className="video-player-wrapper">
              <video 
                controls 
                className="video-player" 
                src={video.url}
                poster={video.thumbnail}
              />
            </div>
          </div>

          <Container className="content-section">
            <div className="video-info">
              <h1 className="video-title">{video.title}</h1>
              
              <div className="video-stats">
                <div className="stats-left">
                  <span className="upload-date">{new Date(video.timestamp).toLocaleDateString()}</span>
                  <span className="dot">•</span>
                  <span className="views-count">1.2K views</span>
                </div>
                <div className="action-buttons">
                  <Button 
                    className="action-btn like-btn" 
                    onClick={() => onLike(video.id)} 
                    disabled={!user}
                  >
                    <FaHeart className="action-icon" />
                    <span>Like</span>
                  </Button>
                  <Button 
                    className="action-btn save-btn" 
                    onClick={() => onSave(video.id)} 
                    disabled={!user}
                  >
                    <FaList className="action-icon" />
                    <span>Save</span>
                  </Button>
                  <Button 
                    className="action-btn download-btn" 
                    onClick={handleDownload}
                  >
                    <FaDownload className="action-icon" />
                    <span>Download</span>
                  </Button>
                  <Button 
                    className="action-btn share-btn"
                    onClick={handleShare}
                  >
                    <FaShare className="action-icon" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>

              <div className="video-description-section">
                <h3 className="description-title">Description</h3>
                <div className="video-description">
                  {video.description || 'No description available'}
                </div>
              </div>
            </div>

            <div className="comments-section">
              <h3 className="comments-title">
                <FaComment className="comments-icon" /> Comments
              </h3>
              
              {user ? (
                <Form onSubmit={handleComment} className="comment-form">
                  <Form.Control
                    as="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="comment-input"
                    rows={3}
                  />
                  <Button type="submit" className="comment-submit">
                    Post Comment
                  </Button>
                </Form>
              ) : (
                <p className="sign-in-prompt">Please sign in to comment</p>
              )}

              <div className="comments-list">
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      <span className="comment-time">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <div className="recommended-videos">
          <h3 className="recommended-title">Recommended Videos</h3>
          <div className="recommended-list">
            {recommendedVideos.map((recommendedVideo) => (
              <Link 
                key={recommendedVideo.id} 
                to={`/video/${recommendedVideo.id}`}
                className="recommended-video-card"
              >
                <div className="recommended-thumbnail">
                  <video src={recommendedVideo.url} />
                  <div className="play-icon">
                    <FaPlayCircle />
                  </div>
                </div>
                <div className="recommended-info">
                  <h4 className="recommended-video-title">
                    {recommendedVideo.title}
                  </h4>
                  <div className="recommended-meta">
                    <span>{new Date(recommendedVideo.timestamp).toLocaleDateString()}</span>
                    <span className="dot">•</span>
                    <span>1.2K views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <div className="toast-container">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          className="share-toast"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default VideoDetail;