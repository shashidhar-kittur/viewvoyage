import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaHeart, FaList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ user, setUser }) {
  return (
    <BootstrapNavbar bg="dark" variant="dark" className="navbar-custom">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-text">
          ViewVoyage
        </BootstrapNavbar.Brand>
        
        <Nav className="ms-auto nav-links">
          <Nav.Link as={Link} to="/" className="nav-item">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Nav.Link>
          
          {user ? (
            <>
              <Nav.Link as={Link} to="/your-list" className="nav-item">
                <FaList className="nav-icon" />
                <span>Your List</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/liked-videos" className="nav-item">
                <FaHeart className="nav-icon" />
                <span>Liked Videos</span>
              </Nav.Link>
              <Nav.Link onClick={() => setUser(null)} className="nav-item">
                <FaSignOutAlt className="nav-icon" />
                <span>Sign Out</span>
              </Nav.Link>
              <div className="user-profile">
                <FaUser className="nav-icon" />
                <span>{user.name}</span>
              </div>
            </>
          ) : (
            <Nav.Link as={Link} to="/signin" className="nav-item">
              <FaUser className="nav-icon" />
              <span>Sign In</span>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;