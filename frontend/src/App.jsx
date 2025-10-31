import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { isLoggedIn } from './utils/localStorage';
import './App.css';

function App() {
  const userLoggedIn = isLoggedIn();

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={userLoggedIn ? <Navigate to="/dashboard" /> : <Home />} 
            />
            <Route 
              path="/login" 
              element={userLoggedIn ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={userLoggedIn ? <Navigate to="/dashboard" /> : <Register />} 
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
