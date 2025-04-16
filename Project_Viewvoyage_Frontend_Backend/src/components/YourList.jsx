import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function YourList({ videos, user }) {
  if (!user) {
    return <Container className="py-4">Please sign in to view your list</Container>;
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your List</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {videos.map((video) => (
          <Col key={video.id}>
            <Card>
              <video className="card-img-top" src={video.url} />
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Link to={`/video/${video.id}`} className="btn btn-primary">
                  Watch
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {videos.length === 0 && (
        <p>No videos in your list yet</p>
      )}
    </Container>
  );
}

export default YourList;