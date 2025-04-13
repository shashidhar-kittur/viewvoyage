import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function SignIn({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser({ name: username });
      navigate('/');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2 className="sign-in-title">Welcome Back</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
            />
          </Form.Group>

          <Button className="sign-in-btn" type="submit">
            Sign In
          </Button>

          <div className="form-footer">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;