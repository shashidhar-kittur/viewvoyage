import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import YourList from './components/YourList';
import LikedVideos from './components/LikedVideos';
import VideoDetail from './components/VideoDetail';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);

  const handleUpload = (newVideo) => {
    setVideos([...videos, { ...newVideo, id: Date.now() }]);
  };

  const handleLike = (videoId) => {
    const video = videos.find(v => v.id === videoId);
    if (video && !likedVideos.find(v => v.id === videoId)) {
      setLikedVideos([...likedVideos, video]);
    }
  };

  const handleSave = (videoId) => {
    const video = videos.find(v => v.id === videoId);
    if (video && !savedVideos.find(v => v.id === videoId)) {
      setSavedVideos([...savedVideos, video]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home videos={videos} onUpload={handleUpload} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/your-list" element={
            <YourList videos={savedVideos} user={user} />
          } />
          <Route path="/liked-videos" element={
            <LikedVideos videos={likedVideos} user={user} />
          } />
          <Route path="/video/:id" element={
            <VideoDetail 
              videos={videos}
              onLike={handleLike}
              onSave={handleSave}
              user={user}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;