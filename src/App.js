// App.js
import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import Login from './pages/login/Login';
import EditArticle from './pages/EditArticle';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles/:urlId" element={<Article />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/new" element={<FormArticle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
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

  // Navigate to Contact with the selected name as query parameter.
  const handleNavigate = (name) => {
    navigate(`/contact?name=${name}`);
  };

  return (
    <nav className="navbar">
      <h1>My Articles</h1>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
          About
        </NavLink>
        {/* Dropdown for Contact */}
        <div className="dropdown">
          <button className="dropbtn">Contact</button>
          <div className="dropdown-content">
            <button onClick={() => handleNavigate("Mario")}>Mario</button>
            <button onClick={() => handleNavigate("Luigi")}>Luigi</button>
          </div>
        </div>
        <NavLink to="/new" className={({ isActive }) => isActive ? "active-link" : ""}>
          New Article
        </NavLink>
      </div>
    </nav>
  );
};

export default App;
