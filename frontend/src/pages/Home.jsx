import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to NotesApp</h1>
        <p>A simple and secure note-taking application</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
