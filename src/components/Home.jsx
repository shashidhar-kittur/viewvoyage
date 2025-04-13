import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import { FaUpload, FaPlayCircle } from 'react-icons/fa';

function Home({ videos, onUpload }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (title && videoFile) {
      const newVideo = {
        title,
        description,
        url: URL.createObjectURL(videoFile),
        timestamp: new Date().toISOString(),
      };
      onUpload(newVideo);
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setShowUploadModal(false);
    }
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Discover Videos</h2>
        <Form.Control
          type="search"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="video-grid">
        {filteredVideos.map((video) => (
          <Link 
            key={video.id} 
            to={`/video/${video.id}`} 
            className="text-decoration-none"
          >
            <div className="video-card">
              <div className="video-thumbnail-wrapper position-relative">
                <video src={video.url} />
                <div className="video-duration">3:45</div>
                <div className="play-overlay">
                  <FaPlayCircle />
                </div>
              </div>
              <div className="video-info">
                <h5 className="video-title">{video.title}</h5>
                <div className="video-meta">
                  <span>{new Date(video.timestamp).toLocaleDateString()}</span>
                  <span className="mx-1">•</span>
                  <span>1.2K views</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Button
        className="upload-btn"
        onClick={() => setShowUploadModal(true)}
      >
        <FaUpload />
      </Button>

      <Modal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        centered
        className="upload-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                className="video-description-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Video File</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Home;