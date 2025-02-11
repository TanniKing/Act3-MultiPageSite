import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import './Home.css'
import '../App.css'

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); // slug names for each Article!
};

export default function Home({ articles }) {
  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${generateSlug(article.title)}`}>Read More...</Link>
        </div>
      ))}
    </div>
  )
}
