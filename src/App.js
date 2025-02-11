import './App.css';
import { BrowserRouter, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Article from './pages/Article';

function App() {
  const articles = [
    {
      "id": "1",
      "title": "Welcome to the Site",
      "author": "Mario",
      "body": "Welcome to our new blog! This platform is dedicated to sharing valuable insights on web development, programming, and best practices for developers of all skill levels. Whether you're a beginner or an experienced coder, you'll find useful tips, tutorials, and discussions here. Stay tuned for more content, and feel free to explore our articles!"
    },
    {
      "id": "2",
      "title": "5 React Tips for Beginners",
      "author": "Luigi",
      "body": "React is a powerful library for building modern web applications, but it can be overwhelming for beginners. Here are five essential tips to help you get started: <br/><br/>1. Break your UI into reusable components. <br/>2. Use state and props effectively. <br/>3. Learn the useEffect hook for handling side effects. <br/>4. Optimize performance with React.memo and useCallback. <br/>5. Practice by building small projects. <br/><br/>With these tips, you'll be on your way to mastering React in no time!"
    },
    {
      "id": "3",
      "title": "VS Code Best Packages",
      "author": "Mario",
      "body": "Visual Studio Code is one of the most popular code editors, and its extensions make development even better. Here are some must-have VS Code extensions: <br/><br/>- <strong>ESLint</strong>: Helps you catch errors and enforce coding standards. <br/>- <strong>Prettier</strong>: Automatically formats your code for consistency. <br/>- <strong>Live Server</strong>: Instantly refreshes your browser when you save files. <br/>- <strong>GitLens</strong>: Enhances Git capabilities within VS Code. <br/>- <strong>Material Icon Theme</strong>: Makes file navigation visually appealing. <br/><br/>Install these extensions to boost your productivity and streamline your workflow!"
    }
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />  {/* Navigation bar with hoverable Contact dropdown */}
        <Routes>
          <Route path="/" element={<Home articles={articles} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles/:urlId" element={<Article articles={articles} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Updated Navbar Component with hoverable dropdown for Contact
function Navbar() {
  const navigate = useNavigate();

  // Navigate to the Contact page with the chosen name
  const handleNavigate = (name) => {
    navigate(`/contact?name=${name}`);
  };

  return (
    <nav className="navbar">
      <h1>My Articles</h1>
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>

      {/* Hoverable dropdown for Contact */}
      <div className="dropdown">
        <button className="dropbtn">Contact</button>
        <div className="dropdown-content">
          <button onClick={() => handleNavigate("Mario")}>Mario</button>
          <button onClick={() => handleNavigate("Luigi")}>Luigi</button>
        </div>
      </div>
    </nav>
  );
}

export default App;
