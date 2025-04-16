import { useState, useEffect } from 'react';

const DatabaseStatus = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/db-status');
        const data = await response.json();
        
        if (response.ok) {
          setStatus(data.status);
          setError(null);
        } else {
          setStatus('Error');
          setError(data.error);
        }
      } catch (err) {
        setStatus('Error');
        setError('Failed to connect to server. Make sure the server is running.');
        console.error('Database status check error:', err);
      }
    };

    checkDatabaseConnection();
    
    // Hide the status card after 10 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body" style={{ color: 'white' }}>
          <h5 className="card-title">Database Status</h5>
          <div className="d-flex align-items-center">
            <div 
              className={`status-indicator me-2 ${
                status === 'Connected' ? 'bg-success' : 
                status === 'Checking...' ? 'bg-warning' : 'bg-danger'
              }`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                display: 'inline-block'
              }}
            />
            <p className="mb-0">Status: {status}</p>
          </div>
          {error && (
            <div className="mt-2">
              <p className="text-danger mb-0">Error: {error}</p>
              <p className="text-muted small mt-1">
                Server: http://localhost:3001
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus; 