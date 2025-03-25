// App.js
import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import EditArticle from './pages/EditArticle';
import { AuthProvider, AuthContext } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import { getAuth, signOut } from 'firebase/auth';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles/:urlId" element={<Article />} />
            <Route path="/edit/:id" element={<EditArticle />} />
            <Route path="/new" element={<FormArticle />} />
          </Route>

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </div>
);

const Header = () => (
  <header>
    <Navbar />
  </header>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Dropdown example for Contact
  const handleNavigate = (name) => {
    navigate(`/contact?name=${name}`);
  };

  const handleLogoutLink = async (e) => {
    e.preventDefault(); // so the link doesn't immediately navigate
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <nav className="navbar">
      <h1>My Articles</h1>

      {/* Always show these links, whether user is logged in or not. 
          If the user isn't logged in, trying to access them triggers RequireAuth => redirect to /login */}
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          About
        </NavLink>

        <div className="dropdown">
          <button className="dropbtn">Contact</button>
          <div className="dropdown-content">
            <button onClick={() => handleNavigate('Mario')}>Mario</button>
            <button onClick={() => handleNavigate('Luigi')}>Luigi</button>
          </div>
        </div>

        <NavLink to="/new" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          New Article
        </NavLink>
      </div>

      {/* Auth-based links on the far right */}
      <div className="auth-links">
        {!user && (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Sign Up
            </NavLink>
          </>
        )}

        {user && (
          // Looks like a link, but calls handleLogoutLink
          <NavLink
            to="/login"
            onClick={handleLogoutLink}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Log Out
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default App;
